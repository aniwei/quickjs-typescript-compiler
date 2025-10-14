import * as ts from 'typescript';

export type OperandKind =
  | 'value'
  | 'temp'
  | 'local'
  | 'closure'
  | 'const'
  | 'void'
  | 'label';

export interface OperandRef {
  readonly kind: OperandKind;
  readonly id: number;
  readonly hintedType?: ts.Type;
}

export interface BindingInfo {
  readonly name: ts.Identifier;
  readonly kind: BindingKind;
  readonly atom: number;
  readonly slot: number;
  readonly scopeDepth: number;
}

export interface AnnexBRebind {
  readonly binding: BindingInfo;
  readonly value: OperandRef;
}

export interface InstructionIR {
  readonly op: string;
  readonly operands: readonly OperandRef[];
  readonly node?: ts.Node;
  readonly result?: OperandRef;
}

export interface BlockIR {
  readonly label: number;
  readonly kind: 'basic' | 'loop' | 'handler' | 'finally' | 'suspend';
  readonly instructions: InstructionIR[];
}

export type FunctionKind =
  | 'normal'
  | 'async'
  | 'generator'
  | 'async-generator'
  | 'class-static-init';

export interface FunctionIR {
  readonly id: number;
  readonly funcKind: FunctionKind;
  readonly blocks: BlockIR[];
  readonly scopeDepth: number;
  readonly nestedFunctions: FunctionIR[];
  readonly parameters: ParameterIR[];
  createTemporary(node: ts.Node, hintedType?: ts.Type): OperandRef;
  currentBlock(): BlockIR;
  addInstruction(instruction: InstructionIR): void;
  addNestedFunction(func: FunctionIR): number;
  addParameter(parameter: ParameterIR): number;
}

export interface ParameterIR {
  readonly name: string;
  readonly slot: number;
  readonly atom: number;
  readonly isRest: boolean;
  readonly hasInitializer: boolean;
  readonly initializer?: ts.Expression;
  readonly node: ts.ParameterDeclaration;
}

export type BindingKind =
  | 'var'
  | 'let'
  | 'const'
  | 'function'
  | 'param'
  | 'catch'
  | 'class'
  | 'module';

export interface ScopeManager {
  enter(node: ts.Node): void;
  leave(node: ts.Node): AnnexBRebind[];
  declare(name: ts.Identifier, kind: BindingKind): BindingInfo;
  declarePattern(pattern: ts.BindingName, kind: BindingKind): BindingInfo[];
  resolve(name: ts.Identifier): OperandRef;
  closeUntil(targetDepth: number): void;
  requiresReference(name: ts.Identifier): boolean;
  getStoreMode(binding: BindingInfo): 'init' | 'assign';
  markInitialized(binding: BindingInfo): void;
  registerAnnexB(binding: BindingInfo, value: OperandRef): void;
}

export interface LabelRef {
  readonly id: number;
}

export interface LabelManager {
  createLabel(): LabelRef;
  mark(label: LabelRef): void;
  emitJump(opcode: string, label: LabelRef, node?: ts.Node): void;
  patchDeferred(label: LabelRef): void;
}

export interface BytecodeEmitter {
  emitOp(opcode: string, operands?: readonly OperandRef[], node?: ts.Node): void;
  emitOpWithResult(opcode: string, operands?: readonly OperandRef[], node?: ts.Node): OperandRef;
  pushConst(value: unknown, node?: ts.Node): OperandRef;
  emitPushUndefined(node?: ts.Node): OperandRef;
  storeBinding(binding: BindingInfo, mode: 'init' | 'assign', value: OperandRef, node?: ts.Node): void;
  labelOperand(label: LabelRef): OperandRef;
  noteSource(node: ts.Node): void;
  emitAtom(name: ts.__String | string, node?: ts.Node): void;
}

export interface TypeFact {
  readonly description: string;
  readonly narrowedTypes?: readonly ts.Type[];
}

export interface TypeFactsTable {
  narrow(node: ts.Node, fact: TypeFact): void;
  lookup(node: ts.Node): TypeFact | undefined;
  clear(node: ts.Node): void;
}

export interface LoweringServices {
  readonly bytecode: BytecodeEmitter;
  readonly scope: ScopeManager;
  readonly labels: LabelManager;
  readonly facts: TypeFactsTable;
  readonly functionIR: FunctionIR;
  readonly checker: ts.TypeChecker;
  readonly mode: CompilationMode;
}

export interface LoweringContext extends LoweringServices {}

export type CompilationMode = 'strict' | 'non-strict';
