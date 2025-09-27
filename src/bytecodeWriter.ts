import { Atom, AtomTable } from './atoms'
import {
	FunctionDef,
	createEmptyModuleRecord,
	ModuleExportType,
	type ModuleRecord,
} from './functionDef'
import { FunctionBytecode, Instruction, ConstantEntry } from './functionBytecode'
import { BytecodeTag, env, OpFormat, Opcode } from './env'
import { getOpcodeDefinition } from './utils/opcode'
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

	writeSLEB128(value: number) {
		let v = value | 0
		let more = true
		while (more) {
			let byte = v & 0x7f
			v >>= 7
			const signBitSet = (byte & 0x40) !== 0
			if ((v === 0 && !signBitSet) || (v === -1 && signBitSet)) {
				more = false
			} else {
				byte |= 0x80
			}
			this.writeU8(byte)
		}
	}

	writeFloat64(value: number) {
		const buffer = new ArrayBuffer(8)
		new DataView(buffer).setFloat64(0, value, true)
		this.writeBytes(new Uint8Array(buffer))
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
	private body = new ByteBuffer()
	private readonly customAtomIndex = new Map<Atom, number>()
	private customAtomStrings: string[] = []
	private readonly textEncoder = new TextEncoder()

	constructor(private readonly atomTable: AtomTable) {}

		writeModule(mainFunction: FunctionDef): Uint8Array {
		this.reset()
			const moduleRecord = mainFunction.module ?? createEmptyModuleRecord()
			const resolvedModuleAtom =
				moduleRecord.moduleName ??
				mainFunction.bytecode.filename ??
				this.atomTable.getAtomId(mainFunction.bytecode.sourceFile)
			this.writeModuleObject(mainFunction.bytecode, moduleRecord, resolvedModuleAtom)
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

		private writeModuleObject(bytecode: FunctionBytecode, moduleRecord: ModuleRecord, moduleAtom: Atom) {
		this.body.writeU8(BytecodeTag.TC_TAG_MODULE)
		this.writeAtom(this.body, moduleAtom)
			this.writeModuleRequireEntries(moduleRecord, moduleAtom)
			this.writeModuleExportEntries(moduleRecord)
			this.writeModuleStarExportEntries(moduleRecord)
			this.writeModuleImportEntries(moduleRecord)
			this.body.writeU8(moduleRecord.hasTopLevelAwait ? 1 : 0)
			this.writeFunction(bytecode, moduleAtom)
		}

		private writeModuleRequireEntries(moduleRecord: ModuleRecord, moduleAtom: Atom) {
			const undefinedEntry: ConstantEntry = { tag: BytecodeTag.TC_TAG_UNDEFINED }
			this.body.writeLEB128(moduleRecord.requireEntries.length)
			for (const entry of moduleRecord.requireEntries) {
				this.writeAtom(this.body, entry.moduleName)
				const attributes = entry.attributes ?? undefinedEntry
				this.writeConstant(attributes, moduleAtom)
			}
		}

		private writeModuleExportEntries(moduleRecord: ModuleRecord) {
			this.body.writeLEB128(moduleRecord.exportEntries.length)
			for (const entry of moduleRecord.exportEntries) {
				this.body.writeU8(entry.type)
				if (entry.type === ModuleExportType.Local) {
					this.body.writeLEB128(entry.localVarIndex)
				} else {
					this.body.writeLEB128(entry.reqModuleIndex)
					this.writeAtom(this.body, entry.localName)
				}
				this.writeAtom(this.body, entry.exportedName)
			}
		}

		private writeModuleStarExportEntries(moduleRecord: ModuleRecord) {
			this.body.writeLEB128(moduleRecord.starExportEntries.length)
			for (const entry of moduleRecord.starExportEntries) {
				this.body.writeLEB128(entry.reqModuleIndex)
			}
		}

		private writeModuleImportEntries(moduleRecord: ModuleRecord) {
			this.body.writeLEB128(moduleRecord.importEntries.length)
			for (const entry of moduleRecord.importEntries) {
				this.body.writeLEB128(entry.varIndex)
				this.body.writeU8(entry.isStar ? 1 : 0)
				this.writeAtom(this.body, entry.importName)
				this.body.writeLEB128(entry.reqModuleIndex)
			}
	}

	private writeFunction(bytecode: FunctionBytecode, moduleAtom: Atom) {
		const varDefs = bytecode.getAllVarDefs()
		for (const vd of varDefs) {
			this.ensureAtom(vd.name)
		}
		for (const closureVar of bytecode.closureVars) {
			this.ensureAtom(closureVar.name)
		}
		if (bytecode.hasDebug) {
			this.ensureAtom(bytecode.filename ?? moduleAtom)
		}

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

		this.body.writeLEB128(varDefs.length)
		for (const vd of varDefs) {
			this.writeAtom(this.body, vd.name)
			this.body.writeLEB128(vd.scopeLevel)
			this.body.writeLEB128(vd.scopeNext + 1)
			let flags = 0
			flags |= (vd.kind & 0x0f)
			if (vd.isConst) flags |= 1 << 4
			if (vd.isLexical) flags |= 1 << 5
			if (vd.isCaptured) flags |= 1 << 6
			this.body.writeU8(flags)
		}

		for (const closureVar of bytecode.closureVars) {
			this.writeClosureVar(closureVar)
		}

		this.body.writeBytes(instructions)

		if (bytecode.hasDebug) {
			const filenameAtom = bytecode.filename ?? moduleAtom
			this.writeAtom(this.body, filenameAtom)
			const pc2line = bytecode.pc2line
			this.body.writeLEB128(pc2line.length)
			this.body.writeBytes(pc2line)
			const sourceText = bytecode.source ?? ''
			if (sourceText.length > 0) {
				const sourceBytes = this.textEncoder.encode(sourceText)
				this.body.writeLEB128(sourceBytes.length)
				this.body.writeBytes(sourceBytes)
			} else {
				this.body.writeLEB128(0)
			}
		}

			for (const entry of bytecode.constantPool) {
				this.writeConstant(entry, moduleAtom)
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

	private writeConstant(entry: ConstantEntry, moduleAtom: Atom): void {
		switch (entry.tag) {
			case BytecodeTag.TC_TAG_NULL:
			case BytecodeTag.TC_TAG_UNDEFINED:
			case BytecodeTag.TC_TAG_BOOL_FALSE:
			case BytecodeTag.TC_TAG_BOOL_TRUE:
				this.body.writeU8(entry.tag)
				return
			case BytecodeTag.TC_TAG_INT32:
				this.body.writeU8(BytecodeTag.TC_TAG_INT32)
				this.body.writeSLEB128(entry.value | 0)
				return
			case BytecodeTag.TC_TAG_FLOAT64:
				this.body.writeU8(BytecodeTag.TC_TAG_FLOAT64)
				this.body.writeFloat64(entry.value)
				return
			case BytecodeTag.TC_TAG_STRING:
				this.body.writeU8(BytecodeTag.TC_TAG_STRING)
				this.writeString(entry.value)
				return
			case BytecodeTag.TC_TAG_ARRAY:
				this.body.writeU8(BytecodeTag.TC_TAG_ARRAY)
				this.body.writeLEB128(entry.elements.length)
				for (const element of entry.elements) {
					this.writeConstant(element, moduleAtom)
				}
				return
			case BytecodeTag.TC_TAG_TEMPLATE_OBJECT:
				this.body.writeU8(BytecodeTag.TC_TAG_TEMPLATE_OBJECT)
				this.body.writeLEB128(entry.elements.length)
				for (const element of entry.elements) {
					this.writeConstant(element, moduleAtom)
				}
				this.writeConstant(entry.raw, moduleAtom)
				return
			case BytecodeTag.TC_TAG_OBJECT:
				this.body.writeU8(BytecodeTag.TC_TAG_OBJECT)
				this.body.writeLEB128(entry.properties.length)
				for (const property of entry.properties) {
					this.writeAtom(this.body, property.name)
					this.writeConstant(property.value, moduleAtom)
				}
				return
			case BytecodeTag.TC_TAG_FUNCTION_BYTECODE:
				this.writeFunction(entry.value, moduleAtom)
				return
			default: {
				const unreachable: never = entry
				throw new Error('Unsupported constant tag in constant pool')
			}
		}
	}

	private writeString(value: string) {
		let isWide = false
		for (let i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 0xff) {
				isWide = true
				break
			}
		}
		this.body.writeLEB128((value.length << 1) | (isWide ? 1 : 0))
		if (isWide) {
			for (let i = 0; i < value.length; i++) {
				this.body.writeU16(value.charCodeAt(i))
			}
		} else {
			for (let i = 0; i < value.length; i++) {
				this.body.writeU8(value.charCodeAt(i))
			}
		}
	}

	private encodeInstructions(instructions: Instruction[]): Uint8Array {
		const buf = new ByteBuffer()
		for (const instruction of instructions) {
			buf.writeU8(instruction.opcode)
			const def = getOpcodeDefinition(instruction.opcode)
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
				case OpFormat.npop:
					buf.writeU16(operands[0] ?? 0)
					break
				case OpFormat.u32:
				case OpFormat.i32:
				case OpFormat.label:
				case OpFormat.label_u16:
				case OpFormat.const:
					buf.writeU32(operands[0] ?? 0)
					break
				case OpFormat.npopx:
					break
				case OpFormat.atom:
					this.writeAtomOperand(buf, operands[0] as Atom)
					break
				case OpFormat.atom_u8:
					this.writeAtomOperand(buf, operands[0] as Atom)
					buf.writeU8(operands[1] ?? 0)
					break
				case OpFormat.atom_u16:
					this.writeAtomOperand(buf, operands[0] as Atom)
					buf.writeU16(operands[1] ?? 0)
					break
				case OpFormat.atom_label_u8:
					this.writeAtomOperand(buf, operands[0] as Atom)
					buf.writeU32(operands[1] ?? 0)
					buf.writeInt8(operands[2] ?? 0)
					break
				case OpFormat.atom_label_u16:
					this.writeAtomOperand(buf, operands[0] as Atom)
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

	private writeAtomOperand(buffer: ByteBuffer, atom: Atom) {
		const index = this.getAtomIndexValue(atom)
		buffer.writeU32(index >>> 0)
	}

	private writeAtomValue(buffer: ByteBuffer, atom: Atom) {
		const encoded = this.encodeAtom(atom)
		buffer.writeLEB128(encoded)
	}

	private ensureAtom(atom: Atom) {
		if (atom < env.firstAtomId) {
			return
		}
		this.getOrAddCustomAtomIndex(atom)
	}

	private encodeAtom(atom: Atom): number {
		const indexValue = this.getAtomIndexValue(atom)
		return indexValue << 1
	}

	private getAtomIndexValue(atom: Atom): number {
		if (atom < env.firstAtomId) {
			return atom
		}
		const index = this.getOrAddCustomAtomIndex(atom)
		return env.firstAtomId + index
	}

	private getOrAddCustomAtomIndex(atom: Atom): number {
		let index = this.customAtomIndex.get(atom)
		if (index !== undefined) {
			return index
		}
		const str = this.atomTable.getAtomString(atom)
		if (str === undefined) {
			throw new Error(`Unknown atom ${atom}`)
		}
		index = this.customAtomStrings.length
		this.customAtomStrings.push(str)
		this.customAtomIndex.set(atom, index)
		return index
	}
}