import { Atom, AtomTable } from './atoms';
import { BytecodeWriter } from './bytecodeWriter';
import { FunctionBytecode } from './functionBytecode';
import { Opcode } from './opcodes';
import { VarScope } from './scopes';
import { ClosureVar, VarDef } from './var';

interface Relocation {
  offset: number; // position in bytecode of the jump offset to patch
  label: number;  // the label id to jump to
}

export type JSFunctionKind = 0 | 1 | 2 | 3; // JS_FUNC_NORMAL, JS_FUNC_GENERATOR, JS_FUNC_ASYNC, JS_FUNC_ASYNC_GENERATOR

export enum JSParseFunctionEnum {
  JS_PARSE_FUNC_STATEMENT,
  JS_PARSE_FUNC_VAR,
  JS_PARSE_FUNC_EXPR,
  JS_PARSE_FUNC_ARROW,

  JS_PARSE_FUNC_GETTER,
  JS_PARSE_FUNC_SETTER,
  JS_PARSE_FUNC_METHOD,
  JS_PARSE_FUNC_CLASS_STATIC_INIT,
  JS_PARSE_FUNC_CLASS_CONSTRUCTOR,
  JS_PARSE_FUNC_DERIVED_CLASS_CONSTRUCTOR,
}

export class FunctionDef {
  parent: FunctionDef | null = null;
  parentCpoolIdx = 0;
  parentScopeLevel = 0;

  isEval = false;
  evalType = 0;
  isGlobalVar = false;
  isFuncExpr = false;
  hasHomeObject = false;
  hasPrototype = false;
  hasSimpleParameterList = true;
  hasParameterExpressions = false;
  hasUseStrict = false;
  hasEvalCall = false;
  hasArgumentsBinding = false;
  hasThisBinding = false;
  newTargetAllowed = false;
  superCallAllowed = false;
  superAllowed = false;
  argumentsAllowed = false;
  isDerivedClassConstructor = false;
  inFunctionBody = false;
  funcKind: JSFunctionKind = 0;
  funcType: JSParseFunctionEnum = JSParseFunctionEnum.JS_PARSE_FUNC_STATEMENT;
  jsMode = 0;
  funcName: Atom = 0;

  constants: (string | number | boolean | null | undefined)[] = [];
  vars: VarDef[] = [];
  args: VarDef[] = [];
  argCount = 0;
  definedArgCount = 0;
  varObjectIdx = -1;
  argVarObjectIdx = -1;
  argumentsVarIdx = -1;
  argumentsArgIdx = -1;
  funcVarIdx = -1;
  evalRetIdx = -1;
  thisVarIdx = -1;
  newTargetVarIdx = -1;
  thisActiveFuncVarIdx = -1;
  homeObjectVarIdx = -1;
  needHomeObject = false;

  scopeLevel = 0;
  scopeFirst = 0;
  scopes: VarScope[] = [];
  bodyScope = 0;

  globalVars: any[] = [];

  private writer = new BytecodeWriter();
  private labels: number[] = [];
  private relocations: Relocation[] = [];

  constructor(public parentFd: FunctionDef | null, public atomTable: AtomTable) {
    this.parent = parentFd;
  }

  emitOp(op: number) {
    this.writer.putU8(op);
  }

  emitU8(val: number) {
    this.writer.putU8(val & 0xff);
  }

  emitU16(val: number) {
    this.writer.putU16(val);
  }

  emitU32(val: number) {
    this.writer.putU32(val);
  }

  createNewLabel(): number {
    // -1 indicates the label is not yet bound to an address.
    return this.labels.push(-1) - 1;
  }

  bindLabel(label: number) {
    const currentOffset = this.writer.length;
    if (this.labels[label] !== -1) {
      throw new Error(`Label ${label} is already bound`);
    }
    this.labels[label] = currentOffset;

    // Patch all relocations that were waiting for this label.
    this.relocations = this.relocations.filter(reloc => {
      if (reloc.label === label) {
        // offset of the jump instruction from the byte after the jump opcode
        const jumpOffset = currentOffset - (reloc.offset - 1);
        this.writer.patchU16(reloc.offset, jumpOffset);
        return false; // Remove this relocation from the list
      }
      return true; // Keep this relocation
    });
  }

  emitJump(opcode: Opcode, label: number): number {
    this.emitOp(opcode);
    const offset = this.writer.length;
    this.writer.putU16(0); // placeholder
    this.relocations.push({ offset, label });
    return offset;
  }

  patchJump(offset: number, targetLabel: number) {
    const targetOffset = this.labels[targetLabel];
    if (targetOffset === -1) {
      // If the target label is not yet bound, add a relocation.
      this.relocations.push({ offset: offset + 1, label: targetLabel });
    } else {
      const jumpOffset = targetOffset - offset;
      this.writer.patchU16(offset + 1, jumpOffset);
    }
  }

  addConst(value: string | number | boolean | null | undefined): number {
    const existingIndex = this.constants.indexOf(value);
    if (existingIndex !== -1) {
      return existingIndex;
    }
    this.constants.push(value);
    return this.constants.length - 1;
  }

  toBytecode(): FunctionBytecode {
    const bc = new FunctionBytecode();
    bc.buffer = Array.from(this.writer.toUint8Array());
    bc.cpool = this.constants;
    bc.vardefs = this.vars;
    bc.argCount = this.argCount;
    bc.varCount = this.vars.length;
    bc.definedArgCount = this.definedArgCount;
    bc.stackSize = 0; // TODO: calculate stack size
    bc.functionName = this.funcName;
    return bc;
  }
}
