import { BytecodeWriter } from './bytecode';
import { AtomManager, JSAtom, JS_ATOM_NULL } from './atom';
import { JSFunctionDef, JSVarDef, JSVarKind } from './functionDef';
import { Opcode, OPCODE_DEFS, SHORT_OPCODE_DEFS, type OpcodeDefinition } from './env';

enum SpecialObject {
	ARGUMENTS = 0,
	MAPPED_ARGUMENTS = 1,
	THIS_FUNC = 2,
	NEW_TARGET = 3,
	HOME_OBJECT = 4,
	VAR_OBJECT = 5,
	IMPORT_META = 6,
}

const JS_THROW_VAR_RO = 0;

interface ScopeVarResolution {
	kind: 'local' | 'arg' | 'closure' | 'pseudo' | 'global';
	index: number;
	isLexical: boolean;
	varKind?: JSVarKind;
	atom: JSAtom;
}

function buildOpcodeDefinitionTable(
	defs: Record<string, OpcodeDefinition>,
	skipNames?: Set<string>,
): Array<OpcodeDefinition | undefined> {
	const table: Array<OpcodeDefinition | undefined> = [];
	for (const [name, def] of Object.entries(defs)) {
		if (skipNames?.has(name))
			continue;
		const code = (Opcode as any)[name];
		if (typeof code === 'number')
			table[code] = def;
	}
	return table;
}

export class ScopeResolver {
	constructor(private atomManager: AtomManager) {}

	private static readonly TEMPORARY_SCOPE_OPCODES: ReadonlySet<Opcode> = new Set([
		Opcode.OP_enter_scope,
		Opcode.OP_leave_scope,
		Opcode.OP_scope_get_var_undef,
		Opcode.OP_scope_get_var,
		Opcode.OP_scope_put_var,
		Opcode.OP_scope_delete_var,
		Opcode.OP_scope_make_ref,
		Opcode.OP_scope_get_ref,
		Opcode.OP_scope_put_var_init,
		Opcode.OP_scope_get_var_checkthis,
		Opcode.OP_scope_get_private_field,
		Opcode.OP_scope_get_private_field2,
		Opcode.OP_scope_put_private_field,
		Opcode.OP_scope_in_private_field,
	]);

	private static readonly TEMPORARY_SCOPE_OPCODE_SIZES: Partial<Record<Opcode, number>> = {
		[Opcode.OP_enter_scope]: 3,
		[Opcode.OP_leave_scope]: 3,
		[Opcode.OP_scope_get_var_undef]: 7,
		[Opcode.OP_scope_get_var]: 7,
		[Opcode.OP_scope_put_var]: 7,
		[Opcode.OP_scope_delete_var]: 7,
		[Opcode.OP_scope_make_ref]: 11,
		[Opcode.OP_scope_get_ref]: 7,
		[Opcode.OP_scope_put_var_init]: 7,
		[Opcode.OP_scope_get_var_checkthis]: 7,
		[Opcode.OP_scope_get_private_field]: 7,
		[Opcode.OP_scope_get_private_field2]: 7,
		[Opcode.OP_scope_put_private_field]: 7,
		[Opcode.OP_scope_in_private_field]: 7,
	};

	private static readonly shortOpcodeNames = new Set(Object.keys(SHORT_OPCODE_DEFS));
	private static readonly opcodeDefsByCode = buildOpcodeDefinitionTable(OPCODE_DEFS, ScopeResolver.shortOpcodeNames);
	private static readonly shortOpcodeDefsByCode = buildOpcodeDefinitionTable(SHORT_OPCODE_DEFS);

	resolveAll(root: JSFunctionDef) {
		this.resolveFunction(root);
		for (const child of root.children) {
			this.resolveAll(child);
		}
	}

	private resolveFunction(func: JSFunctionDef) {
		const input = func.byteCode.buffer;
		if (!input.length)
			return;

		this.prepareSpecialBindings(func);

		const out = new BytecodeWriter('scope-resolved');
		this.emitFunctionPrelude(func, out);

		for (let pos = 0; pos < input.length;) {
			const opcode = input[pos] as Opcode;
			const isTempScopeOpcode = this.isTemporaryScopeOpcode(opcode)
				&& this.isLikelyTemporaryScopeOpcode(func, input, pos, opcode);

			if (isTempScopeOpcode) {
				const tempSize = this.getTemporaryOpcodeSize(opcode);
				switch (opcode) {
					case Opcode.OP_enter_scope:
					case Opcode.OP_leave_scope:
						// Drop enter/leave scope placeholders entirely.
						break;
					case Opcode.OP_scope_get_var:
					case Opcode.OP_scope_get_var_undef:
					case Opcode.OP_scope_get_var_checkthis:
					case Opcode.OP_scope_put_var:
					case Opcode.OP_scope_put_var_init:
					case Opcode.OP_scope_delete_var:
					case Opcode.OP_scope_get_ref:
					case Opcode.OP_scope_make_ref: {
						const atom = this.readU32(input, pos + 1);
						const scope = this.readU16(input, pos + 5);
						this.resolveScopeVar(func, atom, scope, opcode, out);
						break;
					}
					case Opcode.OP_scope_get_private_field:
					case Opcode.OP_scope_get_private_field2:
					case Opcode.OP_scope_put_private_field:
					case Opcode.OP_scope_in_private_field: {
						const atom = this.readU32(input, pos + 1);
						const scope = this.readU16(input, pos + 5);
						this.resolveScopePrivateField(func, atom, scope, opcode, out);
						break;
					}
					default:
						throw new Error(`ScopeResolver: unhandled temporary opcode ${opcode}`);
				}
				pos += tempSize;
				continue;
			}

			const size = this.getOpcodeSize(opcode);
			const sliceEnd = Math.min(pos + size, input.length);
			out.write(input.slice(pos, sliceEnd));
			pos += size;
		}

		func.byteCode.reset();
		func.byteCode.write(out.buffer);
	}

	private resolveScopeVar(
		func: JSFunctionDef,
		atom: JSAtom,
		scope: number,
		op: Opcode,
		out: BytecodeWriter,
	) {
		const resolution = this.lookupScopeVar(func, atom, scope);
		if (!resolution)
			throw new Error(`ScopeResolver: unresolved var atom=${atom}`);

			if (resolution.kind === 'global') {
				this.emitGlobalResolution(atom, op, out);
				return;
			}

			switch (op) {
				case Opcode.OP_scope_get_var:
				case Opcode.OP_scope_get_var_undef:
					this.emitRead(resolution, out, false);
					break;
				case Opcode.OP_scope_get_var_checkthis:
					this.emitRead(resolution, out, true);
					break;
				case Opcode.OP_scope_put_var:
				case Opcode.OP_scope_put_var_init:
					this.emitWrite(resolution, out, op === Opcode.OP_scope_put_var_init);
					break;
				case Opcode.OP_scope_delete_var:
					out.putU8(Opcode.OP_push_false);
					break;
				case Opcode.OP_scope_get_ref:
					out.putU8(Opcode.OP_undefined);
					this.emitRead(resolution, out, false);
					break;
				case Opcode.OP_scope_make_ref:
					this.emitMakeRef(resolution, atom, out);
					break;
				default:
					throw new Error(`ScopeResolver: unsupported scope op ${op}`);
			}
	}

	private resolveScopePrivateField(
		func: JSFunctionDef,
		atom: JSAtom,
		scope: number,
		op: Opcode,
		out: BytecodeWriter,
	) {
		const resolution = this.lookupScopeVar(func, atom, scope, { allowGlobal: false });
		if (!resolution)
			throw new Error(`ScopeResolver: unresolved private field atom=${atom}`);
		const varKind = resolution.varKind ?? JSVarKind.JS_VAR_PRIVATE_FIELD;

		const emitSymbol = () => this.emitPrivateSymbolValue(resolution, out);

		switch (op) {
			case Opcode.OP_scope_get_private_field:
			case Opcode.OP_scope_get_private_field2:
				switch (varKind) {
					case JSVarKind.JS_VAR_PRIVATE_FIELD:
						if (op === Opcode.OP_scope_get_private_field2)
							out.putU8(Opcode.OP_dup);
						emitSymbol();
						out.putU8(Opcode.OP_get_private_field);
						break;
					case JSVarKind.JS_VAR_PRIVATE_METHOD:
						emitSymbol();
						out.putU8(Opcode.OP_check_brand);
						if (op !== Opcode.OP_scope_get_private_field2)
							out.putU8(Opcode.OP_nip);
						break;
					case JSVarKind.JS_VAR_PRIVATE_GETTER:
					case JSVarKind.JS_VAR_PRIVATE_GETTER_SETTER:
						if (op === Opcode.OP_scope_get_private_field2)
							out.putU8(Opcode.OP_dup);
						emitSymbol();
						out.putU8(Opcode.OP_check_brand);
						out.putU8(Opcode.OP_call_method);
						out.putU16(0);
						break;
					case JSVarKind.JS_VAR_PRIVATE_SETTER:
						this.emitPrivateReadOnlyError(atom, out);
						break;
					default:
						throw new Error(`ScopeResolver: unsupported private get kind ${varKind}`);
				}
				break;
			case Opcode.OP_scope_put_private_field:
				switch (varKind) {
					case JSVarKind.JS_VAR_PRIVATE_FIELD:
						emitSymbol();
						out.putU8(Opcode.OP_put_private_field);
						break;
					case JSVarKind.JS_VAR_PRIVATE_SETTER:
					case JSVarKind.JS_VAR_PRIVATE_GETTER_SETTER: {
						const setterAtom = this.getPrivateSetterAtom(atom);
						const setterResolution = this.lookupScopeVar(func, setterAtom, scope, { allowGlobal: false });
						if (!setterResolution)
							throw new Error('ScopeResolver: missing private setter binding');
						this.emitPrivateSymbolValue(setterResolution, out);
						out.putU8(Opcode.OP_swap);
						out.putU8(Opcode.OP_rot3r);
						out.putU8(Opcode.OP_check_brand);
						out.putU8(Opcode.OP_rot3l);
						out.putU8(Opcode.OP_call_method);
						out.putU16(1);
						out.putU8(Opcode.OP_drop);
						break;
					}
					case JSVarKind.JS_VAR_PRIVATE_METHOD:
					case JSVarKind.JS_VAR_PRIVATE_GETTER:
						this.emitPrivateReadOnlyError(atom, out);
						break;
					default:
						throw new Error(`ScopeResolver: unsupported private set kind ${varKind}`);
				}
				break;
			case Opcode.OP_scope_in_private_field:
				emitSymbol();
				out.putU8(Opcode.OP_private_in);
				break;
			default:
				throw new Error(`ScopeResolver: unsupported private opcode ${op}`);
		}
	}

		private lookupScopeVar(
			func: JSFunctionDef,
			atom: JSAtom,
			scopeLevel: number,
			opts: { allowGlobal?: boolean } = {},
		): ScopeVarResolution | null {
			const pseudo = this.matchPseudoVar(atom);
			if (pseudo) {
				const index = this.ensurePseudoBinding(func, pseudo);
				const isLexical = pseudo === 'this' && func.isDerivedClassConstructor;
				return { kind: 'pseudo', index, isLexical, atom };
			}

			const varIdx = this.findVarInScopes(func, atom, scopeLevel);
			if (varIdx >= 0) {
				const def = func.vars[varIdx];
				return {
					kind: 'local',
					index: varIdx,
					isLexical: !!def.isLexical,
					varKind: def.varKind,
					atom,
				};
			}

			const argIdx = func.args.findIndex((arg) => arg.varName === atom);
			if (argIdx >= 0) {
				const def = func.args[argIdx];
				return {
					kind: 'arg',
					index: argIdx,
					isLexical: !!def.isLexical,
					atom,
				};
			}

			const closureIdx = func.closureVar.findIndex((cv) => cv.varName === atom);
			if (closureIdx >= 0) {
				const def = func.closureVar[closureIdx];
				return {
					kind: 'closure',
					index: closureIdx,
					isLexical: !!def.isLexical,
					varKind: def.varKind,
					atom,
				};
			}

			if (opts.allowGlobal !== false) {
				return {
					kind: 'global',
					index: -1,
					isLexical: false,
					atom,
				};
			}

			return null;
		}

	private findVarInScopes(func: JSFunctionDef, atom: JSAtom, scopeLevel: number): number {
		let level = scopeLevel;
		while (level >= 0) {
			const idx = func.findVarInScope(atom, level);
			if (idx >= 0)
				return idx;
			const parent = func.scopes[level]?.parent ?? -1;
			level = parent;
		}
		return -1;
	}

		private emitRead(resolution: ScopeVarResolution, out: BytecodeWriter, checkThis: boolean) {
			switch (resolution.kind) {
				case 'local':
				case 'pseudo':
					if (checkThis) {
						out.putU8(Opcode.OP_get_loc_checkthis);
						out.putU16(resolution.index);
					} else if (resolution.isLexical) {
						out.putU8(Opcode.OP_get_loc_check);
						out.putU16(resolution.index);
					} else {
						this.emitGetLoc(out, resolution.index);
					}
					break;
				case 'arg':
					this.emitGetArg(out, resolution.index);
					break;
				case 'closure':
					this.emitGetVarRef(out, resolution.index, resolution.isLexical);
					break;
				default:
					throw new Error('ScopeResolver: unsupported read kind');
			}
		}

		private emitWrite(resolution: ScopeVarResolution, out: BytecodeWriter, isInit: boolean) {
			switch (resolution.kind) {
				case 'local':
				case 'pseudo':
					if (resolution.isLexical) {
						if (isInit) {
							if (this.isThisAtom(resolution.atom)) {
								out.putU8(Opcode.OP_put_loc_check_init);
								out.putU16(resolution.index);
							} else {
								out.putU8(Opcode.OP_put_loc);
								out.putU16(resolution.index);
							}
						} else {
							out.putU8(Opcode.OP_put_loc_check);
							out.putU16(resolution.index);
						}
					} else {
						this.emitPutLoc(out, resolution.index);
					}
					break;
				case 'arg':
					this.emitPutArg(out, resolution.index);
					break;
				case 'closure':
					this.emitPutVarRef(out, resolution.index, resolution.isLexical, isInit);
					break;
				default:
					throw new Error('ScopeResolver: unsupported write kind');
			}
		}

	private emitFunctionPrelude(func: JSFunctionDef, out: BytecodeWriter) {
		if (func.homeObjectVarIdx >= 0) {
			this.emitSpecialObject(out, SpecialObject.HOME_OBJECT);
			this.emitPutLocRaw(out, func.homeObjectVarIdx);
		}
		if (func.thisActiveFuncVarIdx >= 0) {
			this.emitSpecialObject(out, SpecialObject.THIS_FUNC);
			this.emitPutLocRaw(out, func.thisActiveFuncVarIdx);
		}
		if (func.newTargetVarIdx >= 0) {
			this.emitSpecialObject(out, SpecialObject.NEW_TARGET);
			this.emitPutLocRaw(out, func.newTargetVarIdx);
		}
		if (func.thisVarIdx >= 0) {
			if (func.isDerivedClassConstructor) {
				out.putU8(Opcode.OP_set_loc_uninitialized);
				out.putU16(func.thisVarIdx);
			} else {
				out.putU8(Opcode.OP_push_this);
				this.emitPutLocRaw(out, func.thisVarIdx);
			}
		}
	}

	private isTemporaryScopeOpcode(opcode: Opcode): boolean {
		return ScopeResolver.TEMPORARY_SCOPE_OPCODES.has(opcode);
	}

	private getTemporaryOpcodeSize(opcode: Opcode): number {
		return ScopeResolver.opcodeDefsByCode[opcode]?.size
			?? ScopeResolver.TEMPORARY_SCOPE_OPCODE_SIZES[opcode]
			?? 1;
	}

	private getOpcodeSize(opcode: number): number {
		return ScopeResolver.shortOpcodeDefsByCode[opcode]?.size
			?? ScopeResolver.opcodeDefsByCode[opcode]?.size
			?? 1;
	}

	private hasAtom(atom: number): boolean {
		return this.atomManager.hasAtom(atom);
	}

	private scopeIsValid(func: JSFunctionDef, scopeIdx: number): boolean {
		const scopeLimit = Array.isArray(func.scopes) && func.scopes.length > 0
			? func.scopes.length
			: func.scopeCount > 0
				? func.scopeCount
				: Math.max(func.scopeLevel + 1, 0);
		return scopeIdx >= 0 && scopeIdx < scopeLimit;
	}

	private isLikelyTemporaryScopeOpcode(
		func: JSFunctionDef,
		buffer: Uint8Array,
		pc: number,
		opcode: Opcode,
	): boolean {
		switch (opcode) {
			case Opcode.OP_enter_scope:
			case Opcode.OP_leave_scope:
				if (pc + 3 > buffer.length)
					return false;
				return this.scopeIsValid(func, this.readU16(buffer, pc + 1));
			case Opcode.OP_scope_get_var_undef:
			case Opcode.OP_scope_get_var:
			case Opcode.OP_scope_put_var:
			case Opcode.OP_scope_delete_var:
			case Opcode.OP_scope_get_ref:
			case Opcode.OP_scope_put_var_init:
			case Opcode.OP_scope_get_var_checkthis:
			case Opcode.OP_scope_get_private_field:
			case Opcode.OP_scope_get_private_field2:
			case Opcode.OP_scope_put_private_field:
			case Opcode.OP_scope_in_private_field: {
				if (pc + 7 > buffer.length)
					return false;
				const atom = this.readU32(buffer, pc + 1);
				if (!this.hasAtom(atom))
					return false;
				const scope = this.readU16(buffer, pc + 5);
				return this.scopeIsValid(func, scope);
			}
			case Opcode.OP_scope_make_ref: {
				if (pc + 11 > buffer.length)
					return false;
				const atom = this.readU32(buffer, pc + 1);
				if (!this.hasAtom(atom))
					return false;
				const scope = this.readU16(buffer, pc + 5);
				return this.scopeIsValid(func, scope);
			}
			default:
				return false;
		}
	}

	private emitSpecialObject(out: BytecodeWriter, kind: SpecialObject) {
		out.putU8(Opcode.OP_special_object);
		out.putU8(kind);
	}

	private emitPutLocRaw(out: BytecodeWriter, idx: number) {
		out.putU8(Opcode.OP_put_loc);
		out.putU16(idx);
	}

	private emitGetLoc(out: BytecodeWriter, idx: number) {
		if (idx === 0)
			out.putU8(Opcode.OP_get_loc0);
		else if (idx === 1)
			out.putU8(Opcode.OP_get_loc1);
		else if (idx === 2)
			out.putU8(Opcode.OP_get_loc2);
		else if (idx === 3)
			out.putU8(Opcode.OP_get_loc3);
		else if (idx < 0x100) {
			out.putU8(Opcode.OP_get_loc8);
			out.putU8(idx);
		} else {
			out.putU8(Opcode.OP_get_loc);
			out.putU16(idx);
		}
	}

	private emitPutLoc(out: BytecodeWriter, idx: number) {
		if (idx === 0)
			out.putU8(Opcode.OP_put_loc0);
		else if (idx === 1)
			out.putU8(Opcode.OP_put_loc1);
		else if (idx === 2)
			out.putU8(Opcode.OP_put_loc2);
		else if (idx === 3)
			out.putU8(Opcode.OP_put_loc3);
		else if (idx < 0x100) {
			out.putU8(Opcode.OP_put_loc8);
			out.putU8(idx);
		} else {
			out.putU8(Opcode.OP_put_loc);
			out.putU16(idx);
		}
	}

	private emitGetArg(out: BytecodeWriter, idx: number) {
		if (idx === 0)
			out.putU8(Opcode.OP_get_arg0);
		else if (idx === 1)
			out.putU8(Opcode.OP_get_arg1);
		else if (idx === 2)
			out.putU8(Opcode.OP_get_arg2);
		else if (idx === 3)
			out.putU8(Opcode.OP_get_arg3);
		else {
			out.putU8(Opcode.OP_get_arg);
			out.putU16(idx);
		}
	}

	private emitPutArg(out: BytecodeWriter, idx: number) {
		if (idx === 0)
			out.putU8(Opcode.OP_put_arg0);
		else if (idx === 1)
			out.putU8(Opcode.OP_put_arg1);
		else if (idx === 2)
			out.putU8(Opcode.OP_put_arg2);
		else if (idx === 3)
			out.putU8(Opcode.OP_put_arg3);
		else {
			out.putU8(Opcode.OP_put_arg);
			out.putU16(idx);
		}
	}

	private emitGetVarRef(out: BytecodeWriter, idx: number, check: boolean) {
		if (check) {
			out.putU8(Opcode.OP_get_var_ref_check);
			out.putU16(idx);
			return;
		}
		if (idx === 0)
			out.putU8(Opcode.OP_get_var_ref0);
		else if (idx === 1)
			out.putU8(Opcode.OP_get_var_ref1);
		else if (idx === 2)
			out.putU8(Opcode.OP_get_var_ref2);
		else if (idx === 3)
			out.putU8(Opcode.OP_get_var_ref3);
		else {
			out.putU8(Opcode.OP_get_var_ref);
			out.putU16(idx);
		}
	}

	private emitPutVarRef(out: BytecodeWriter, idx: number, check: boolean, isInit: boolean) {
		if (check) {
			out.putU8(isInit ? Opcode.OP_put_var_ref_check_init : Opcode.OP_put_var_ref_check);
			out.putU16(idx);
			return;
		}
		if (idx === 0)
			out.putU8(Opcode.OP_put_var_ref0);
		else if (idx === 1)
			out.putU8(Opcode.OP_put_var_ref1);
		else if (idx === 2)
			out.putU8(Opcode.OP_put_var_ref2);
		else if (idx === 3)
			out.putU8(Opcode.OP_put_var_ref3);
		else {
			out.putU8(Opcode.OP_put_var_ref);
			out.putU16(idx);
		}
	}

	private emitPrivateSymbolValue(resolution: ScopeVarResolution, out: BytecodeWriter) {
		switch (resolution.kind) {
			case 'local':
			case 'pseudo':
				this.emitGetLoc(out, resolution.index);
				break;
			case 'arg':
				this.emitGetArg(out, resolution.index);
				break;
			case 'closure':
				this.emitGetVarRef(out, resolution.index, false);
				break;
			default:
				throw new Error('ScopeResolver: unsupported private symbol source');
		}
	}

	private emitPrivateReadOnlyError(atom: JSAtom, out: BytecodeWriter) {
		out.putU8(Opcode.OP_throw_error);
		out.putU32(atom);
		out.putU8(JS_THROW_VAR_RO);
	}

	private getPrivateSetterAtom(atom: JSAtom): JSAtom {
		const base = this.atomManager.getString(atom);
		return this.atomManager.add(`${base}<set>`);
	}

	private emitMakeRef(resolution: ScopeVarResolution, atom: JSAtom, out: BytecodeWriter) {
		switch (resolution.kind) {
			case 'local':
			case 'pseudo':
				out.putU8(Opcode.OP_make_loc_ref);
				out.putU32(atom);
				out.putU16(resolution.index);
				break;
			case 'arg':
				out.putU8(Opcode.OP_make_arg_ref);
				out.putU32(atom);
				out.putU16(resolution.index);
				break;
			case 'closure':
				out.putU8(Opcode.OP_make_var_ref_ref);
				out.putU32(atom);
				out.putU16(resolution.index);
				break;
			case 'global':
				out.putU8(Opcode.OP_make_var_ref);
				out.putU32(atom);
				break;
			default:
				throw new Error('ScopeResolver: unsupported make_ref target');
		}
	}

	private emitGlobalResolution(atom: JSAtom, op: Opcode, out: BytecodeWriter) {
		switch (op) {
			case Opcode.OP_scope_get_var_checkthis:
			case Opcode.OP_scope_get_var:
				out.putU8(Opcode.OP_get_var);
				out.putU32(atom);
				break;
			case Opcode.OP_scope_get_var_undef:
				out.putU8(Opcode.OP_get_var_undef);
				out.putU32(atom);
				break;
			case Opcode.OP_scope_put_var:
				out.putU8(Opcode.OP_put_var);
				out.putU32(atom);
				break;
			case Opcode.OP_scope_put_var_init:
				out.putU8(Opcode.OP_put_var_init);
				out.putU32(atom);
				break;
			case Opcode.OP_scope_delete_var:
				out.putU8(Opcode.OP_delete_var);
				out.putU32(atom);
				break;
			case Opcode.OP_scope_make_ref:
				out.putU8(Opcode.OP_make_var_ref);
				out.putU32(atom);
				break;
			case Opcode.OP_scope_get_ref:
				out.putU8(Opcode.OP_undefined);
				out.putU8(Opcode.OP_get_var);
				out.putU32(atom);
				break;
			default:
				throw new Error(`ScopeResolver: unsupported global op ${op}`);
		}
	}

		private prepareSpecialBindings(func: JSFunctionDef) {
			if (func.hasHomeObject && func.homeObjectVarIdx < 0) {
				func.homeObjectVarIdx = this.createSpecialVar(func, '<home_object>', {
					isLexical: false,
				});
			}
			if (func.needHomeObject && func.thisActiveFuncVarIdx < 0) {
				func.thisActiveFuncVarIdx = this.createSpecialVar(func, 'this.active_func');
			}
			if (func.newTargetAllowed && func.newTargetVarIdx < 0) {
				func.newTargetVarIdx = this.createSpecialVar(func, 'new.target');
			}
			if (func.hasThisBinding && func.thisVarIdx < 0) {
				func.thisVarIdx = this.createSpecialVar(func, 'this', {
					isLexical: func.isDerivedClassConstructor,
				});
			}
		}

		private matchPseudoVar(atom: JSAtom): 'this' | 'new.target' | 'this.active_func' | '<home_object>' | null {
			if (atom === JS_ATOM_NULL)
				return null;
			const name = this.atomManager.getString(atom);
			if (name === 'this')
				return 'this';
			if (name === 'new.target')
				return 'new.target';
			if (name === 'this.active_func')
				return 'this.active_func';
			if (name === '<home_object>')
				return '<home_object>';
			return null;
		}

		private ensurePseudoBinding(
			func: JSFunctionDef,
			name: 'this' | 'new.target' | 'this.active_func' | '<home_object>',
		): number {
			switch (name) {
				case 'this':
					if (func.thisVarIdx < 0) {
						func.thisVarIdx = this.createSpecialVar(func, 'this', {
							isLexical: func.isDerivedClassConstructor,
						});
					}
					return func.thisVarIdx;
				case 'new.target':
					if (func.newTargetVarIdx < 0)
						func.newTargetVarIdx = this.createSpecialVar(func, 'new.target');
					return func.newTargetVarIdx;
				case 'this.active_func':
					if (func.thisActiveFuncVarIdx < 0)
						func.thisActiveFuncVarIdx = this.createSpecialVar(func, 'this.active_func');
					return func.thisActiveFuncVarIdx;
				case '<home_object>':
					if (func.homeObjectVarIdx < 0)
						func.homeObjectVarIdx = this.createSpecialVar(func, '<home_object>');
					return func.homeObjectVarIdx;
			}
		}

		private createSpecialVar(
			func: JSFunctionDef,
			name: string,
			opts: { isLexical?: boolean } = {},
		): number {
			const atom = this.atomManager.add(name);
			return func.addVar(atom, {
				scopeLevel: 0,
				isLexical: opts.isLexical ?? false,
			});
		}

		private isThisAtom(atom: JSAtom): boolean {
			return this.atomManager.getString(atom) === 'this';
		}

	private readU32(buf: Uint8Array, offset: number): number {
		return (
			buf[offset] |
			(buf[offset + 1] << 8) |
			(buf[offset + 2] << 16) |
			(buf[offset + 3] << 24)
		);
	}

	private readU16(buf: Uint8Array, offset: number): number {
		return buf[offset] | (buf[offset + 1] << 8);
	}
}
