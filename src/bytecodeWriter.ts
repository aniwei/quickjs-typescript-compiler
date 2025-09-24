import { Atom, AtomTable } from './atoms'
import { FunctionDef } from './functionDef'
import { FunctionBytecode, Instruction, ConstantEntry } from './functionBytecode'
import { BytecodeTag, env, OpFormat, Opcode, OPCODE_DEFS, type OpcodeDefinition } from './env'
import { ClosureVar } from './vars'

class ByteBuffer {
	private readonly chunks: number[] = []

	writeU8(value: number) {
		this.chunks.push(value & 0xff)
	}

	writeInt8(value: number) {
		const v = (value << 24) >> 24
		this.writeU8(v)
	}

	writeU16(value: number) {
		this.writeU8(value & 0xff)
		this.writeU8((value >>> 8) & 0xff)
	}

	writeU32(value: number) {
		this.writeU8(value & 0xff)
		this.writeU8((value >>> 8) & 0xff)
		this.writeU8((value >>> 16) & 0xff)
		this.writeU8((value >>> 24) & 0xff)
	}

	writeLEB128(value: number) {
		let v = value >>> 0
		do {
			let byte = v & 0x7f
			v >>>= 7
			if (v !== 0) {
				byte |= 0x80
			}
			this.writeU8(byte)
		} while (v !== 0)
	}

	writeBytes(bytes: Iterable<number> | Uint8Array) {
		for (const b of bytes) {
			this.writeU8(b)
		}
	}

	toUint8Array(): Uint8Array {
		return Uint8Array.from(this.chunks)
	}

	get length(): number {
		return this.chunks.length
	}
}

export class BytecodeWriter {
	private readonly opcodeInfoByCode = new Map<number, OpcodeDefinition>()
	private body = new ByteBuffer()
	private readonly customAtomIndex = new Map<Atom, number>()
	private customAtomStrings: string[] = []
	private readonly textEncoder = new TextEncoder()

	constructor(private readonly atomTable: AtomTable) {
		const opcodeEnum = Opcode as unknown as Record<string, number>
		for (const [key, def] of Object.entries(OPCODE_DEFS)) {
			const opcodeValue = opcodeEnum[key]
			if (typeof opcodeValue === 'number') {
				this.opcodeInfoByCode.set(opcodeValue, def)
			}
		}
	}

	writeModule(mainFunction: FunctionDef): Uint8Array {
		this.reset()
		const moduleAtom = mainFunction.bytecode.filename ?? this.atomTable.getAtomId(mainFunction.bytecode.sourceFile)
		this.writeModuleObject(mainFunction.bytecode, moduleAtom)
		const atomsSection = this.buildAtomsSection()
		const bodyBytes = this.body.toUint8Array()
		const result = new Uint8Array(atomsSection.length + bodyBytes.length)
		result.set(atomsSection, 0)
		result.set(bodyBytes, atomsSection.length)
		return result
	}

	private reset() {
		this.body = new ByteBuffer()
		this.customAtomIndex.clear()
		this.customAtomStrings = []
	}

	private buildAtomsSection(): Uint8Array {
		const header = new ByteBuffer()
		header.writeU8(env.bytecodeVersion)
		header.writeLEB128(this.customAtomStrings.length)
		for (const str of this.customAtomStrings) {
			const bytes = this.textEncoder.encode(str)
			header.writeLEB128((bytes.length << 1) | 0)
			header.writeBytes(bytes)
		}
		return header.toUint8Array()
	}

	private writeModuleObject(bytecode: FunctionBytecode, moduleAtom: Atom) {
		this.body.writeU8(BytecodeTag.TC_TAG_MODULE)
		this.writeAtom(this.body, moduleAtom)
		this.body.writeLEB128(0) // req_module_entries_count
		this.body.writeLEB128(0) // export_entries_count
		this.body.writeLEB128(0) // star_export_entries_count
		this.body.writeLEB128(0) // import_entries_count
		this.body.writeU8(0) // has_tla
		this.writeFunction(bytecode, moduleAtom)
	}

	private writeFunction(bytecode: FunctionBytecode, moduleAtom: Atom) {
		const instructions = this.encodeInstructions(bytecode.instructions)
		const flags = this.computeFunctionFlags(bytecode)

		this.body.writeU8(BytecodeTag.TC_TAG_FUNCTION_BYTECODE)
		this.body.writeU16(flags)
		this.body.writeU8(bytecode.jsMode)
		this.writeAtom(this.body, bytecode.name)

		this.body.writeLEB128(bytecode.argCount)
		this.body.writeLEB128(bytecode.varCount)
		this.body.writeLEB128(bytecode.definedArgCount)
		this.body.writeLEB128(bytecode.stackSize)
		this.body.writeLEB128(bytecode.closureVars.length)
		this.body.writeLEB128(bytecode.constantPool.length)
		this.body.writeLEB128(instructions.length)

		this.body.writeLEB128(0) // vardef count

		for (const closureVar of bytecode.closureVars) {
			this.writeClosureVar(closureVar)
		}

		this.body.writeBytes(instructions)

		if (bytecode.hasDebug) {
			const filenameAtom = bytecode.filename ?? moduleAtom
			this.writeAtom(this.body, filenameAtom)
			const pc2line = bytecode.pc2line.length > 0 ? bytecode.pc2line : [0, 0]
			this.body.writeLEB128(pc2line.length)
			this.body.writeBytes(pc2line)
			this.body.writeLEB128(0) // source length
		}

			for (const entry of bytecode.constantPool) {
				this.writeConstant(entry)
			}
	}

	private computeFunctionFlags(bytecode: FunctionBytecode): number {
		let flags = 0
		if (bytecode.hasPrototype) flags |= 1 << 0
		if (bytecode.hasSimpleParameterList) flags |= 1 << 1
		if (bytecode.isDerivedClassConstructor) flags |= 1 << 2
		if (bytecode.needHomeObject) flags |= 1 << 3
		flags |= (bytecode.funcKind & 0x3) << 4
		if (bytecode.newTargetAllowed) flags |= 1 << 6
		if (bytecode.superCallAllowed) flags |= 1 << 7
		if (bytecode.superAllowed) flags |= 1 << 8
		if (bytecode.argumentsAllowed) flags |= 1 << 9
		if (bytecode.hasDebug) flags |= 1 << 10
		if (bytecode.isDirectOrIndirectEval) flags |= 1 << 11
		return flags
	}

	private writeClosureVar(cv: ClosureVar) {
		this.writeAtom(this.body, cv.name)
		this.body.writeLEB128(cv.varIndex)
		let flags = 0
		if (cv.isLocal) flags |= 1 << 0
		if (cv.isArgument) flags |= 1 << 1
		if (cv.isConst) flags |= 1 << 2
		if (cv.isLexical) flags |= 1 << 3
		flags |= (cv.kind & 0x0f) << 4
		this.body.writeU8(flags)
	}

	private writeConstant(_entry: ConstantEntry): void {
		throw new Error('Constant pool serialization is not implemented yet')
	}

	private encodeInstructions(instructions: Instruction[]): Uint8Array {
		const buf = new ByteBuffer()
		for (const instruction of instructions) {
			buf.writeU8(instruction.opcode)
			const def = this.opcodeInfoByCode.get(instruction.opcode)
			if (!def) {
				throw new Error(`Unknown opcode: ${instruction.opcode}`)
			}
			const operands = instruction.operands ?? []
			switch (def.format) {
				case OpFormat.none:
				case OpFormat.none_var_ref:
				case OpFormat.none_int:
				case OpFormat.none_loc:
				case OpFormat.none_arg:
					break
				case OpFormat.loc8:
				case OpFormat.const8:
				case OpFormat.u8:
					buf.writeU8(operands[0] ?? 0)
					break
				case OpFormat.i8:
				case OpFormat.label8:
					buf.writeInt8(operands[0] ?? 0)
					break
				case OpFormat.u16:
				case OpFormat.i16:
				case OpFormat.label16:
				case OpFormat.npop_u16:
				case OpFormat.loc:
				case OpFormat.arg:
				case OpFormat.var_ref:
					buf.writeU16(operands[0] ?? 0)
					break
				case OpFormat.u32:
				case OpFormat.i32:
				case OpFormat.npop:
				case OpFormat.npopx:
				case OpFormat.label:
				case OpFormat.label_u16:
				case OpFormat.const:
					buf.writeU32(operands[0] ?? 0)
					break
				case OpFormat.atom:
					this.writeAtomValue(buf, operands[0] as Atom)
					break
				case OpFormat.atom_u8:
					this.writeAtomValue(buf, operands[0] as Atom)
					buf.writeU8(operands[1] ?? 0)
					break
				case OpFormat.atom_u16:
					this.writeAtomValue(buf, operands[0] as Atom)
					buf.writeU16(operands[1] ?? 0)
					break
				case OpFormat.atom_label_u8:
					this.writeAtomValue(buf, operands[0] as Atom)
					buf.writeU32(operands[1] ?? 0)
					buf.writeInt8(operands[2] ?? 0)
					break
				case OpFormat.atom_label_u16:
					this.writeAtomValue(buf, operands[0] as Atom)
					buf.writeU32(operands[1] ?? 0)
					buf.writeU16(operands[2] ?? 0)
					break
				default:
					throw new Error(`Unsupported opcode format: ${def.format}`)
			}
		}
		return buf.toUint8Array()
	}

	private writeAtom(buffer: ByteBuffer, atom: Atom) {
		const encoded = this.encodeAtom(atom)
		buffer.writeLEB128(encoded)
	}

	private writeAtomValue(buffer: ByteBuffer, atom: Atom) {
		const encoded = this.encodeAtom(atom)
		buffer.writeLEB128(encoded)
	}

	private encodeAtom(atom: Atom): number {
		const firstAtomId = env.firstAtomId
		if (atom < firstAtomId) {
			return atom << 1
		}

		let index = this.customAtomIndex.get(atom)
		if (index === undefined) {
			const str = this.atomTable.getAtomString(atom)
			if (str === undefined) {
				throw new Error(`Unknown atom ${atom}`)
			}
			index = this.customAtomStrings.length
			this.customAtomStrings.push(str)
			this.customAtomIndex.set(atom, index)
		}
		const value = firstAtomId + index
		return value << 1
	}
}