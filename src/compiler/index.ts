import * as ts from 'typescript';
import * as fs from 'fs/promises';
import path from 'path';
import { AtomManager, JSAtom, JS_ATOM_NULL } from '../atom';
import { JSFunctionDef, JSValue, JSVarKind, ModuleExportType, ModuleRecord } from '../functionDef';
import { BytecodeWriter } from '../bytecode';
import { Opcode, JSMode, FunctionKind } from '../env';
import { ParseState } from './parseState';
import { ProgramBuilder, SourceElementRecord } from './programBuilder';
import { LabelManager, PendingLabel } from './labelManager';
import { ScopeManager, BlockKind, BlockEnv } from './scopeManager';
import { StatementEmitter } from './statementEmitter';
import { ExpressionEmitter } from './expressionEmitter';

import { BytecodeSerializer } from '../serializer';
import { ScopeResolver } from '../scopeResolver';
import { TraceRecorder, ModuleTraceEventName } from '../trace';

const JS_DEFINE_CLASS_HAS_HERITAGE = 1 << 0;
const CLASS_FIELDS_INIT_NAME = '<class_fields_init>';

enum DefineMethodKind {
  METHOD = 0,
  GETTER = 1,
  SETTER = 2,
}

interface InstanceFieldRecord {
  nameAtom: number;
  initializer: ts.Expression | null;
  isPrivate: boolean;
}

interface PrivateStorageEntry {
  atom: number;
  varIdx: number;
  kind: JSVarKind;
  isStatic: boolean;
}

type PrivateBaseKind = 'field' | 'method' | 'accessor';

interface PrivateBaseSlot {
  atom: number;
  storage: PrivateStorageEntry;
  type: PrivateBaseKind;
  hasGetter: boolean;
  hasSetter: boolean;
}

type PendingStoreKind = 'arg' | 'loc' | 'varRef';

interface PendingStoreRecord {
  kind: PendingStoreKind;
  index: number;
  opcodeOffset: number;
  setOpcode: Opcode;
}

interface PendingLineEntry {
  line: number;
  column: number;
  sourcePos: number;
  pcOverride: number | null;
  deferUntilStore: boolean;
}

type TopLevelLexicalEntry =
  | { kind: 'class'; name: string }
  | { kind: 'binding'; name: string; isConst: boolean }
  | { kind: 'function'; name: string };

const PUT_TO_SET_OPCODE: Partial<Record<Opcode, Opcode>> = {
  [Opcode.OP_put_arg0]: Opcode.OP_set_arg0,
  [Opcode.OP_put_arg1]: Opcode.OP_set_arg1,
  [Opcode.OP_put_arg2]: Opcode.OP_set_arg2,
  [Opcode.OP_put_arg3]: Opcode.OP_set_arg3,
  [Opcode.OP_put_arg]: Opcode.OP_set_arg,
  [Opcode.OP_put_loc0]: Opcode.OP_set_loc0,
  [Opcode.OP_put_loc1]: Opcode.OP_set_loc1,
  [Opcode.OP_put_loc2]: Opcode.OP_set_loc2,
  [Opcode.OP_put_loc3]: Opcode.OP_set_loc3,
  [Opcode.OP_put_loc8]: Opcode.OP_set_loc8,
  [Opcode.OP_put_loc]: Opcode.OP_set_loc,
  [Opcode.OP_put_var_ref0]: Opcode.OP_set_var_ref0,
  [Opcode.OP_put_var_ref1]: Opcode.OP_set_var_ref1,
  [Opcode.OP_put_var_ref2]: Opcode.OP_set_var_ref2,
  [Opcode.OP_put_var_ref3]: Opcode.OP_set_var_ref3,
  [Opcode.OP_put_var_ref]: Opcode.OP_set_var_ref,
};

interface ClassCompilationContext {
  hasHeritage: boolean;
  instanceFields: InstanceFieldRecord[];
  fieldsInitFuncIdx: number | null;
  fieldsInitVarName: string;
  fieldsInitVarIdx: number;
  fieldsInitVarAtom: number;
  fieldsInitScopeLevel: number;
  needsInstanceBrand: boolean;
  needsStaticBrand: boolean;
  privateScopeLevel: number;
  privateBases: Map<string, PrivateBaseSlot>;
  privateStorage: Map<string, PrivateStorageEntry>;
}

interface FieldsInitBinding {
  atom: number;
  scopeLevel: number;
  closure?: {
    index: number;
    isLexical: boolean;
  };
}

interface MethodFunctionOptions {
  kind: 'constructor' | 'method' | 'getter' | 'setter';
  nameHint?: string;
  isStatic?: boolean;
  hasHeritage?: boolean;
  fieldsInitBinding?: FieldsInitBinding;
}

export interface CompilerOptions {
  bigInt?: boolean;
  dump?: boolean;
  shortCode?: boolean;
  debug?: boolean;
  strictMode?: boolean;
  referenceJsSource?: string;
  traceRecorder?: TraceRecorder;
}

export class TypeScriptCompiler {
  ctx: any; // Placeholder for JSContext
  atomManager: AtomManager;
  currentFunc: JSFunctionDef | null = null;
  sourceFile: ts.SourceFile | null = null;
  parseState: ParseState | null = null;
  programBuilder: ProgramBuilder | null = null;
  programPlan: SourceElementRecord[] | null = null;
  labelManager: LabelManager;
  scopeManager: ScopeManager;
  options: CompilerOptions;
  scopeLevel: number = 1;
  private statementEmitter: StatementEmitter | null = null;
  private expressionEmitter: ExpressionEmitter | null = null;
  private traceRecorder?: TraceRecorder;
  private moduleTopLevelSlots: Map<string, number> | null = null;
  private moduleRecord: ModuleRecord | null = null;
  private expressionContextStack: { dropRequested: boolean; shouldDrop: boolean }[] = [];
  private pendingStore: PendingStoreRecord | null = null;
  private pendingLineQueues = new WeakMap<JSFunctionDef, PendingLineEntry[]>();

  suppressLineInfo: boolean = false;
  inArgument: boolean = false;

  constructor(options: CompilerOptions = {}) {
    // console.log('Compiler ID:', Math.random());
    this.atomManager = new AtomManager();
    this.ctx = { atomManager: this.atomManager };
    this.options = options;
    this.labelManager = new LabelManager(() => this.currentFunc);
    this.scopeManager = new ScopeManager(() => this.currentFunc);
    this.traceRecorder = options.traceRecorder;
  }

  private recordTrace(event: ModuleTraceEventName, payload: Record<string, unknown> = {}) {
    this.traceRecorder?.record(event, payload);
  }

  private getExpressionEmitter(): ExpressionEmitter {
    if (!this.expressionEmitter) {
      this.expressionEmitter = new ExpressionEmitter(this);
    }
    return this.expressionEmitter;
  }

  private getStatementEmitter(): StatementEmitter {
    if (!this.statementEmitter) {
      this.statementEmitter = new StatementEmitter(this);
    }
    return this.statementEmitter;
  }

  private getCurrentExpressionContext() {
    if (this.expressionContextStack.length === 0) {
      return null;
    }
    return this.expressionContextStack[this.expressionContextStack.length - 1];
  }

  private shouldPreserveExpressionResult(): boolean {
    const ctx = this.getCurrentExpressionContext();
    if (!ctx) return true;
    return !ctx.dropRequested;
  }

  private suppressCurrentExpressionDrop() {
    const ctx = this.getCurrentExpressionContext();
    if (ctx) {
      ctx.shouldDrop = false;
    }
  }

  private isModuleTopLevel(): boolean {
    if (!this.currentFunc)
      return false;
    return this.currentFunc.parent === null;
  }

  private isTopLevelStatement(node: ts.Node | undefined): boolean {
    if (!node)
      return false;
    if (!this.isModuleTopLevel())
      return false;
    return node.parent !== undefined && node.parent.kind === ts.SyntaxKind.SourceFile;
  }

  private isTopLevelVariableList(node: ts.VariableDeclarationList): boolean {
    return this.isTopLevelStatement(node.parent);
  }

  private ensureModuleTopLevelSlot(
    name: string,
    options: { isConst?: boolean } = {},
  ): number {
    if (!this.moduleTopLevelSlots) return -1;
    if (this.moduleTopLevelSlots.has(name)) {
      return this.moduleTopLevelSlots.get(name)!;
    }
    const existing = this.findLocalVar(name);
    if (existing !== -1) {
      this.moduleTopLevelSlots.set(name, existing);
      return existing;
    }
    const varIdx = this.addLocalVar(name, options.isConst ?? true);
    this.moduleTopLevelSlots.set(name, varIdx);
    if (this.currentFunc) {
      this.currentFunc.anonymousLocalsCount = Math.max(
        this.currentFunc.anonymousLocalsCount,
        varIdx + 1,
      );
    }
    return varIdx;
  }

  private getModuleTopLevelSlot(name: string): number {
    if (!this.moduleTopLevelSlots) return -1;
    const idx = this.moduleTopLevelSlots.get(name);
    return idx ?? -1;
  }

  private ensureModuleExportClosure(
    name: string,
    options: { localIdx?: number; isConst?: boolean; isLexical?: boolean } = {},
  ): number {
    if (!this.currentFunc)
      return -1;
    const existing = this.findClosureVar(name);
    if (existing !== -1) {
      return existing;
    }
    const { localIdx = -1, isConst = true, isLexical = true } = options;
    let captureIdx = localIdx;
    if (captureIdx === -1) {
      if (!this.moduleTopLevelSlots)
        return -1;
      captureIdx = this.ensureModuleTopLevelSlot(name, { isConst });
    }
    if (captureIdx === -1)
      return -1;
    return this.addClosureVar(name, isConst, isLexical, captureIdx);
  }

  private getModuleRecord(): ModuleRecord | null {
    return this.moduleRecord;
  }

  private registerModuleLocalExport(
    exportNameAtom: JSAtom,
    closureVarIndex: number,
    localNameAtom?: JSAtom,
    order?: number | undefined,
  ) {
    if (!this.moduleRecord)
      return;
    if (closureVarIndex < 0)
      return;
    this.moduleRecord.exportEntries.push({
      type: ModuleExportType.Local,
      exportedName: exportNameAtom,
      localVarIndex: closureVarIndex,
      localName: localNameAtom ?? exportNameAtom,
      order: order ?? undefined,
    });
  }

  private normalizeFilename(filename: string): string {
    const cwd = process.cwd();
    const absolute = path.isAbsolute(filename) ? filename : path.resolve(cwd, filename);
    const relativePath = path.relative(cwd, absolute);
    return relativePath || path.basename(absolute);
  }

  private initializeFunctionDebugInfo(func: JSFunctionDef, startPos: number) {
    const sourcePos = Math.max(0, startPos);
    func.initialSourcePos = sourcePos;
    if (this.sourceFile) {
      const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(sourcePos);
      func.initialLineNum = line + 1;
      func.initialColumnNum = character + 1;
    } else {
      func.initialLineNum = 1;
      func.initialColumnNum = 1;
    }
    func.lastLineNum = func.initialLineNum;
    func.lastColumnNum = func.initialColumnNum;
    func.pendingLineNum = func.initialLineNum;
    func.pendingColumnNum = func.initialColumnNum;
    func.pendingSourcePos = sourcePos;
    func.pc2lineLastPc = 0;
    func.lineNumberSlots = [];
    func.pc2lineFinalized = false;
  }

  private syncScopeLevel() {
    if (this.currentFunc) {
      this.scopeLevel = this.currentFunc.scopeLevel;
    }
  }


  enterScope(): number {
    const newLevel = this.scopeManager.enterScope();
    if (newLevel >= 0) {
      this.scopeLevel = newLevel;
      return newLevel;
    }
    this.scopeLevel++;
    return this.scopeLevel;
  }

  leaveScope(): number {
    const newLevel = this.scopeManager.leaveScope();
    if (newLevel >= 0) {
      this.scopeLevel = newLevel;
      return newLevel;
    }
    this.scopeLevel = Math.max(-1, this.scopeLevel - 1);
    return this.scopeLevel;
  }

  pushBreakableBlock(kind: BlockKind, options: {
    breakLabel?: PendingLabel;
    continueLabel?: PendingLabel;
    finallyLabel?: PendingLabel;
    labelName?: string;
    hasIterator?: boolean;
    dropCount?: number;
    isRegularStatement?: boolean;
  }) {
    const labelAtom = options.labelName ? this.atomManager.add(options.labelName) : JS_ATOM_NULL;
    this.scopeManager.pushBlock(kind, {
      labelName: labelAtom,
      breakLabel: options.breakLabel ?? null,
      continueLabel: options.continueLabel ?? null,
      finallyLabel: options.finallyLabel ?? null,
      dropCount: options.dropCount,
      hasIterator: options.hasIterator,
      isRegularStatement: options.isRegularStatement ?? false,
    });
  }

  private pushLoopBlock(options: {
    breakLabel: PendingLabel;
    continueLabel: PendingLabel;
    labelName?: string;
    hasIterator?: boolean;
    dropCount?: number;
  }) {
    this.pushBreakableBlock(BlockKind.LOOP, {
      ...options,
    });
  }

  popBlock() {
    this.scopeManager.popBlock();
  }

  private emitCleanupForBlock(block: BlockEnv) {
    if (!this.currentFunc)
      return;
    let dropped = 0;
    if (block.hasIterator) {
      this.emitOp(Opcode.OP_iterator_close);
      dropped += 3;
    }
    while (dropped < block.dropCount) {
      this.emitOp(Opcode.OP_drop);
      dropped++;
    }
    if (block.finallyLabel) {
      this.emitOp(Opcode.OP_undefined);
      this.emitJump(Opcode.OP_gosub, block.finallyLabel);
      this.emitOp(Opcode.OP_drop);
    }
  }

  private emitCloseScopes(currentScope: number, stopScope: number): number {
    let scope = currentScope;
    const target = stopScope ?? -1;
    while (scope >= 0 && (target < 0 || scope > target)) {
      if (!this.currentFunc)
        break;
      const parent = this.currentFunc.scopes[scope]?.parent ?? -1;
      scope = parent;
    }
    return scope;
  }

  emitControlTransfer(labelName: string | undefined, isContinue: boolean): boolean {
    let atom: JSAtom | null = null;
    if (labelName) {
      const lookup = this.atomManager.get(labelName);
      if (lookup === JS_ATOM_NULL) {
        console.error(`Label ${labelName} not found`);
        return false;
      }
      atom = lookup;
    }
    const blocks = this.scopeManager.getBlocks();
    let scopeLevel = this.currentFunc ? this.currentFunc.scopeLevel : this.scopeLevel;
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i];
      scopeLevel = this.emitCloseScopes(scopeLevel, block.scopeLevel);
      const matches = isContinue
        ? !!block.continueLabel && (!atom || block.labelName === atom)
        : !!block.breakLabel && ((!atom && !block.isRegularStatement) || block.labelName === atom);
      if (matches) {
        const target = isContinue ? block.continueLabel : block.breakLabel;
        if (target) {
          this.emitJump8(Opcode.OP_goto8, target);
          return true;
        }
        break;
      }
      this.emitCleanupForBlock(block);
    }
    console.error(isContinue ? 'Continue target not found' : 'Break target not found');
    return false;
  }

  assertLabelAvailable(labelName: string) {
    let labelAtom = this.atomManager.get(labelName);
    if (labelAtom === JS_ATOM_NULL) {
      labelAtom = this.atomManager.add(labelName);
    }
    this.ensureUniqueLabel(labelAtom, labelName);
  }

  isStrictMode(): boolean {
    if (!this.currentFunc)
      return true;
    return (this.currentFunc.jsMode & JSMode.JS_MODE_STRICT) !== 0;
  }

  getLastOpcode(): number | undefined {
    if (this.currentFunc?.lastOp !== undefined) {
      return this.currentFunc.lastOp;
    }
    return this.currentFunc?.byteCode.lastByte;
  }

  async compileFile(filePath: string): Promise<Uint8Array> {
    this.recordTrace('resolve-start', { reqCount: 0 });
    const source = await fs.readFile(filePath, 'utf-8');
    this.recordTrace('resolve-done');
    return this.compile(source, filePath);
  }

  async compileFileWithArtifacts(filePath: string): Promise<{ bytecode: Uint8Array, functionDef: JSFunctionDef }> {
    const bytecode = await this.compileFile(filePath);
    return { bytecode, functionDef: this.currentFunc! };
  }

  compile(source: string, filename: string = 'input.ts'): Uint8Array {
    const normalizedFilename = this.normalizeFilename(filename);
    this.recordTrace('link-start', { status: 0 });
    this.sourceFile = ts.createSourceFile(normalizedFilename, source, ts.ScriptTarget.Latest, true);
    this.parseState = new ParseState(this.ctx, source, normalizedFilename, this.sourceFile);
    this.programBuilder = null;
    this.programPlan = null;
    this.moduleRecord = null;
    
    // Create global function (module or script)
    const globalFunc = new JSFunctionDef(this.ctx, null);
    globalFunc.isGlobalVar = true;
    globalFunc.jsMode = JSMode.JS_MODE_STRICT;
    globalFunc.funcName = this.atomManager.add('<eval>');
    globalFunc.funcKind = FunctionKind.JS_FUNC_ASYNC;
    globalFunc.newTargetAllowed = false;
    globalFunc.hasPrototype = false;
    globalFunc.hasSimpleParameterList = false;
    globalFunc.argumentsAllowed = true;
    // globalFunc.stackSize = 1; // Manually set for now
    // globalFunc.argCount = 1; // <eval> receives 'this'
    globalFunc.filename = this.atomManager.add(normalizedFilename);
    
    this.initializeFunctionDebugInfo(globalFunc, 0);

  this.currentFunc = globalFunc;
  this.syncScopeLevel();
    if (this.parseState) {
      this.parseState.setCurrentFunction(globalFunc);
      this.parseState.nextToken();
    }

    // Pre-pass to register atoms in correct order (locals then closures)
    this.prePass(this.sourceFile);

    // Compile program
    this.compileProgram(this.sourceFile);
    this.recordTrace('link-done', { status: 2 });

  // Resolve scopes to eliminate temporary opcodes
  const scopeResolver = new ScopeResolver(this.atomManager);
  scopeResolver.resolveAll(this.currentFunc!);

  // Serialize
    this.recordTrace('eval-start', { status: 2, isAsync: false, hasTLA: false });
    const serializer = new BytecodeSerializer();
    const bytecode = serializer.serialize(this.currentFunc!);
    this.recordTrace('eval-done', { status: 5, bytecodeSize: bytecode.length });
    return bytecode;
  }

  private prePass(sourceFile: ts.SourceFile) {
    const locals: string[] = [];

    const visit = (node: ts.Node, isTopLevel: boolean) => {
      if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach(decl => {
          if (ts.isIdentifier(decl.name)) {
            if (!isTopLevel) {
              locals.push(decl.name.text);
            }
          }
        });
      } else if (ts.isForOfStatement(node)) {
        if (ts.isVariableDeclarationList(node.initializer)) {
          node.initializer.declarations.forEach(decl => {
            if (ts.isIdentifier(decl.name)) {
              if (!isTopLevel) {
                locals.push(decl.name.text);
              }
            }
          });
        }
      }

      if (!ts.isFunctionDeclaration(node) && !ts.isFunctionExpression(node) && !ts.isArrowFunction(node)) {
        node.forEachChild(child => visit(child, false));
      }
    };

    sourceFile.statements.forEach(stmt => visit(stmt, true));

    [...new Set(locals)].forEach(name => this.atomManager.add(name));
  }

  private preScanLocals(block: ts.Block) {
    const visit = (node: ts.Node) => {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
        this.atomManager.add(node.name.text);
      }
      if (!ts.isFunctionLike(node)) {
        node.forEachChild(visit);
      }
    };
    block.statements.forEach(stmt => visit(stmt));
  }

  private enterBodyScope(): number {
    const level = this.enterScope();
    if (this.currentFunc && this.currentFunc.bodyScope < 0 && level >= 0) {
      this.currentFunc.bodyScope = level;
    }
    return level;
  }

  private collectTopLevelLexicalEntries(node: ts.SourceFile): TopLevelLexicalEntry[] {
    const entries: TopLevelLexicalEntry[] = [];
    const seenBindings = new Set<string>();
    node.statements.forEach(stmt => {
      if (ts.isClassDeclaration(stmt) && stmt.name) {
        entries.push({ kind: 'class', name: stmt.name.text });
        return;
      }
      if (ts.isFunctionDeclaration(stmt) && stmt.name) {
        entries.push({ kind: 'function', name: stmt.name.text });
        return;
      }
      if (!ts.isVariableStatement(stmt))
        return;
      const declFlags = stmt.declarationList.flags;
      const isConst = (declFlags & ts.NodeFlags.Const) !== 0;
      const isLet = (declFlags & ts.NodeFlags.Let) !== 0;
      if (!isConst && !isLet)
        return;
      stmt.declarationList.declarations.forEach(decl => {
        if (!ts.isIdentifier(decl.name))
          return;
        if (seenBindings.has(decl.name.text))
          return;
        seenBindings.add(decl.name.text);
        entries.push({ kind: 'binding', name: decl.name.text, isConst });
      });
    });
    return entries;
  }

  private registerModuleTopLevelLexicals(entries: TopLevelLexicalEntry[]) {
    for (const entry of entries) {
      if (entry.kind === 'class') {
        this.atomManager.add(entry.name);
        const slotIdx = this.ensureModuleTopLevelSlot(entry.name, { isConst: true });
        this.addClosureVar(entry.name, true, true, slotIdx);
        continue;
      }
      if (entry.kind === 'function') {
        const slotIdx = this.ensureModuleTopLevelSlot(entry.name, { isConst: false });
        this.addClosureVar(entry.name, false, false, slotIdx);
        continue;
      }
      const slotIdx = this.ensureModuleTopLevelSlot(entry.name, { isConst: entry.isConst });
      this.addClosureVar(entry.name, entry.isConst, true, slotIdx);
    }
    if (this.currentFunc) {
      let maxIdx = -1;
      if (this.moduleTopLevelSlots) {
        for (const idx of this.moduleTopLevelSlots.values()) {
          maxIdx = Math.max(maxIdx, idx);
        }
      }
      if (maxIdx >= 0) {
        this.currentFunc.anonymousLocalsCount = Math.max(
          this.currentFunc.anonymousLocalsCount,
          maxIdx + 1,
        );
      }
    }
  }

  compileProgram(node: ts.SourceFile) {
    const bodyScopeLevel = this.currentFunc ? this.enterBodyScope() : -1;
    const moduleTopLevel = this.isModuleTopLevel();
    if (moduleTopLevel && this.currentFunc && !this.moduleRecord) {
      this.moduleRecord = {
        moduleName: this.currentFunc.filename,
        exportEntries: [],
        importEntries: [],
        starExportEntries: [],
        requireEntries: [],
        hasTopLevelAwait: false,
      };
      this.currentFunc.module = this.moduleRecord;
    }
    this.moduleTopLevelSlots = moduleTopLevel ? new Map<string, number>() : null;
    const programPlan = moduleTopLevel ? this.getProgramPlan() : null;
    const topLevelLexicals = moduleTopLevel ? this.collectTopLevelLexicalEntries(node) : [];
    if (moduleTopLevel) {
      this.registerModuleTopLevelLexicals(topLevelLexicals);
      this.preRegisterModuleAtomOrder(programPlan, node);
    }
    // Module boilerplate (simplified)
    if (moduleTopLevel) {
      // this.emitLineCol(0);
      this.emitOp(Opcode.OP_push_this);
      const label = this.newLabel();
      this.emitJump8(Opcode.OP_if_false8, label);
      
      // Script Path: Function Declarations
      if (programPlan) {
        for (const element of programPlan) {
          if (ts.isFunctionDeclaration(element.node)) {
            this.compileStatementFromRecord(element);
          }
        }
      } else {
        ts.forEachChild(node, n => {
          if (ts.isFunctionDeclaration(n)) {
            this.compileStatement(n);
          }
        });
      }

      this.emitOp(Opcode.OP_return_undef);
      this.emitLabel(label);

      // Module Path: Statements
      if (programPlan) {
        for (const element of programPlan) {
          const stmt = element.node;
          if (!ts.isFunctionDeclaration(stmt) && stmt.kind !== ts.SyntaxKind.EndOfFileToken) {
            this.compileStatementFromRecord(element);
          }
        }
      } else {
        ts.forEachChild(node, n => {
          if (!ts.isFunctionDeclaration(n) && n.kind !== ts.SyntaxKind.EndOfFileToken) {
            this.compileStatement(n);
          }
        });
      }

      this.emitOp(Opcode.OP_undefined);
      this.emitOp(Opcode.OP_return_async);
    } else {
      ts.forEachChild(node, n => this.compileStatement(n));
    }

    if (bodyScopeLevel >= 0) {
      this.leaveScope();
    }
  }

  private compileStatementFromRecord(record: SourceElementRecord) {
    const handled = this.getStatementEmitter().emit(record);
    if (!handled) {
      this.compileStatement(record.node);
    }
  }

  private preRegisterModuleAtomOrder(
    plan: SourceElementRecord[] | null,
    source: ts.SourceFile,
  ) {
    const collectClassDecls = (): ts.ClassDeclaration[] => {
      if (plan) {
        return plan
          .map(record => record.node)
          .filter((node): node is ts.ClassDeclaration => ts.isClassDeclaration(node));
      }
      return source.statements.filter((stmt): stmt is ts.ClassDeclaration => ts.isClassDeclaration(stmt));
    };
    const classes = collectClassDecls();
    for (const cls of classes) {
      if (cls.name) {
        this.atomManager.add(cls.name.text);
      }
    }
    for (const cls of classes) {
      this.registerClassMemberNameAtoms(cls);
    }
  }

  compileStatement(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.EndOfFileToken) return;
    // this.emitLineCol(node.getStart());
    switch (node.kind) {
      case ts.SyntaxKind.FunctionDeclaration:
        this.compileFunctionDeclaration(node as ts.FunctionDeclaration);
        break;
      case ts.SyntaxKind.Block:
        this.compileBlock(node as ts.Block);
        break;
      case ts.SyntaxKind.ReturnStatement:
        this.compileReturnStatement(node as ts.ReturnStatement);
        break;
      case ts.SyntaxKind.IfStatement:
        this.compileIfStatement(node as ts.IfStatement);
        break;
      case ts.SyntaxKind.ForStatement:
        this.compileForStatement(node as ts.ForStatement);
        break;
      case ts.SyntaxKind.ForOfStatement:
        this.compileForOfStatement(node as ts.ForOfStatement);
        break;
      case ts.SyntaxKind.LabeledStatement:
        this.getStatementEmitter().emitLabeledStatement(node as ts.LabeledStatement);
        break;
      case ts.SyntaxKind.WithStatement:
        this.getStatementEmitter().emitWithStatement(node as ts.WithStatement);
        break;
      case ts.SyntaxKind.VariableStatement:
        this.compileVariableStatement(node as ts.VariableStatement);
        break;
      case ts.SyntaxKind.ClassDeclaration:
        this.compileClassDeclaration(node as ts.ClassDeclaration);
        break;
      case ts.SyntaxKind.ExpressionStatement: {
        const expr = (node as ts.ExpressionStatement).expression;
        const startPos = node.getStart(this.sourceFile ?? undefined);
        if (!this.suppressLineInfo) {
          const shouldAlignToLastOp =
            this.pendingStore !== null && this.isAssignmentLikeExpression(expr);
          this.emitLineCol(
            startPos,
            0,
            shouldAlignToLastOp ? { alignToLastOp: true } : undefined,
          );
        }
        if (ts.isVoidExpression(expr)) {
          this.compileExpression(expr);
        } else {
          this.compileExpression(expr, false, undefined, true);
        }
        break;
      }
      case ts.SyntaxKind.SwitchStatement:
        this.compileSwitchStatement(node as ts.SwitchStatement);
        break;
      case ts.SyntaxKind.WhileStatement:
        this.compileWhileStatement(node as ts.WhileStatement);
        break;
      case ts.SyntaxKind.BreakStatement:
        this.compileBreakStatement(node as ts.BreakStatement);
        break;
      case ts.SyntaxKind.ContinueStatement:
        this.compileContinueStatement(node as ts.ContinueStatement);
        break;
      case ts.SyntaxKind.ThrowStatement:
        this.compileThrowStatement(node as ts.ThrowStatement);
        break;
      case ts.SyntaxKind.TryStatement:
        this.compileTryStatement(node as ts.TryStatement);
        break;
      case ts.SyntaxKind.DebuggerStatement:
        this.getStatementEmitter().emitDebuggerStatement();
        break;
      default:
        console.warn(`Unsupported statement kind: ${ts.SyntaxKind[node.kind]}`);
    }
  }

  private ensureUniqueLabel(labelAtom: JSAtom, labelName: string) {
    const blocks = this.scopeManager.getBlocks();
    for (let i = blocks.length - 1; i >= 0; i--) {
      if (blocks[i].labelName === labelAtom) {
        throw new Error(`Duplicate label '${labelName}' detected`);
      }
    }
  }

  compileFunctionDeclaration(node: ts.FunctionDeclaration) {
    if (!node.name) return;
    const name = node.name.text;
    const isTopLevel = this.isTopLevelStatement(node);
    const isExported = isTopLevel && this.hasExportModifier(node);
    const isDefaultExport = isExported && this.hasDefaultModifier(node);
    
    // 1. Define variable in current scope (if global)
    let varIdx = -1;
    let exportClosureIdx = -1;
    if (isTopLevel) {
      // Function declarations in global scope are not lexical (var-like)
      varIdx = this.addClosureVar(name, false, false);
      if (isExported) {
        exportClosureIdx = varIdx;
      }
    }

    // 2. Create new function definition
    const parentFunc = this.currentFunc;
    const funcDef = new JSFunctionDef(this.ctx, parentFunc);
    funcDef.funcName = this.atomManager.add(name);
    funcDef.filename = parentFunc!.filename;
    funcDef.jsMode = JSMode.JS_MODE_STRICT;
    funcDef.hasPrototype = true;
    funcDef.hasSimpleParameterList = true;
    funcDef.newTargetAllowed = true;
    funcDef.argumentsAllowed = true;
  this.initializeFunctionDebugInfo(funcDef, node.getStart(this.sourceFile ?? undefined));
    
    // Switch context
    this.currentFunc = funcDef;
    this.syncScopeLevel();

    // Set args
    node.parameters.forEach(param => {
      if (ts.isIdentifier(param.name)) {
        this.addArg(param.name.text);
      }
    });
    
    // Pre-scan for all variable declarations to ensure atoms are added in correct order
    if (node.body) {
      this.preScanLocals(node.body);
    }

    // Hoist top-level block-scoped variables (let/const)
    if (node.body) {
      const locals: { name: string, isConst: boolean }[] = [];
      node.body.statements.forEach(stmt => {
        if (ts.isVariableStatement(stmt)) {
           const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0;
           const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0;
           if (isConst || isLet) {
             stmt.declarationList.declarations.forEach(decl => {
               if (ts.isIdentifier(decl.name)) {
                 locals.push({ name: decl.name.text, isConst });
               }
             });
           }
        }
      });
      
      // Register
      locals.forEach(l => {
        if (this.findLocalVar(l.name) === -1) {
          this.addLocalVar(l.name, l.isConst);
        }
      });
      
      // Emit uninitialized (reverse)
      for (let i = locals.length - 1; i >= 0; i--) {
        const l = locals[i];
        const idx = this.findLocalVar(l.name);
        this.emitOp(Opcode.OP_set_loc_uninitialized);
        this.currentFunc.byteCode.putU16(idx);
      }
    }

    // Compile body
    if (node.body) {
      this.compileBlock(node.body);
    }
    
    // Add implicit return if needed
    const lastOp = this.currentFunc.byteCode.lastByte;
    if (lastOp !== Opcode.OP_return && lastOp !== Opcode.OP_return_undef && lastOp !== Opcode.OP_return_async) {
      this.emitOp(Opcode.OP_return_undef);
    }
    
    // Restore context
    this.currentFunc = parentFunc;
    this.syncScopeLevel();
    
    // 3. Emit fclosure
    const funcIdx = this.currentFunc!.cpool.length;
    this.currentFunc!.cpool.push({
      type: 'function',
      value: funcDef
    });
    
    this.emitOp(Opcode.OP_fclosure8);
    this.currentFunc!.byteCode.putU8(funcIdx);
    
    // 4. Assign to variable
    if (isTopLevel) {
      this.emitPutVarRef(varIdx);
    } else {
      console.warn('Local function declaration not implemented');
      this.emitOp(Opcode.OP_drop);
    }

    if (exportClosureIdx !== -1) {
      const exportAtom = this.atomManager.add(isDefaultExport ? 'default' : name);
      const localAtom = this.atomManager.add(name);
      const order = node.getStart(this.sourceFile ?? undefined);
      this.registerModuleLocalExport(exportAtom, exportClosureIdx, localAtom, order);
    }
  }

  addArg(name: string): number {
    if (!this.currentFunc) return -1;
    const atom = this.atomManager.add(name);
    const varIdx = this.currentFunc.args.length;
    const idx = this.currentFunc.args.push({
      varName: atom,
      scopeLevel: 0,
      // QuickJS leaves argument scope chains unused, so keep scopeNext at 0
      scopeNext: 0,
      varIdx: varIdx,
      isConst: false,
      isLexical: false,
      isCaptured: false,
      varKind: JSVarKind.JS_VAR_NORMAL,
      funcPoolIdx: -1
    }) - 1;
    return idx;
  }

  addLocalVar(name: string, isConst: boolean = false): number {
    if (!this.currentFunc) return -1;
    let prevIdx = -1;
    for (let i = this.currentFunc.vars.length - 1; i >= 0; i--) {
      if (this.currentFunc.vars[i].scopeLevel === this.scopeLevel) {
        prevIdx = i;
        break;
      }
    }
    const atom = this.atomManager.add(name);
    const varIdx = this.currentFunc.vars.length;
    const idx = this.currentFunc.vars.push({
      varName: atom,
      scopeLevel: this.scopeLevel,
      scopeNext: prevIdx,
      varIdx: varIdx,
      isConst: isConst,
      isLexical: true,
      isCaptured: false,
      varKind: JSVarKind.JS_VAR_NORMAL,
      funcPoolIdx: -1
    }) - 1;
    return idx;
  }

  addClosureVar(name: string, isConst: boolean, isLexical: boolean = true, localIdx: number = -1): number {
    const atom = this.atomManager.add(name);
    let idx = this.currentFunc!.closureVar.findIndex(v => v.varName === atom);
    if (idx !== -1) return idx;

    idx = this.currentFunc!.closureVar.length;
    let varIdx = localIdx;
    
    this.currentFunc!.closureVar.push({
      varName: atom,
      isConst: isConst,
      isLexical: isLexical,
      varKind: JSVarKind.JS_VAR_NORMAL,
      varIdx: varIdx,
      isLocal: localIdx !== -1,
      isArg: false
    });
    return idx;
  }

  emitPutVarRef(idx: number, check: boolean = false) {
    if (!this.currentFunc) return;
    if (check) {
      this.emitOp(Opcode.OP_put_var_ref_check);
      this.currentFunc.byteCode.putU16(idx);
      this.currentFunc.lastOpArgs = [idx];
      return;
    }
    if (idx === 0) {
      this.emitOp(Opcode.OP_put_var_ref0);
      this.recordPendingStore('varRef', idx, Opcode.OP_put_var_ref0, 0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_put_var_ref1);
      this.recordPendingStore('varRef', idx, Opcode.OP_put_var_ref1, 0);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_put_var_ref2);
      this.recordPendingStore('varRef', idx, Opcode.OP_put_var_ref2, 0);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_put_var_ref3);
      this.recordPendingStore('varRef', idx, Opcode.OP_put_var_ref3, 0);
    } else {
      this.emitOp(Opcode.OP_put_var_ref);
      this.currentFunc.byteCode.putU16(idx);
      this.recordPendingStore('varRef', idx, Opcode.OP_put_var_ref, 2);
    }
    this.currentFunc.lastOpArgs = [idx];
  }

  emitSetVarRef(idx: number) {
    if (!this.currentFunc) return;
    if (idx === 0) this.emitOp(Opcode.OP_set_var_ref0);
    else if (idx === 1) this.emitOp(Opcode.OP_set_var_ref1);
    else if (idx === 2) this.emitOp(Opcode.OP_set_var_ref2);
    else if (idx === 3) this.emitOp(Opcode.OP_set_var_ref3);
    else {
      this.emitOp(Opcode.OP_set_var_ref);
      this.currentFunc.byteCode.putU16(idx);
    }
    this.currentFunc.lastOpArgs = [idx];
  }

  emitPutArg(idx: number) {
    if (!this.currentFunc) return;
    if (idx === 0) {
      this.emitOp(Opcode.OP_put_arg0);
      this.recordPendingStore('arg', idx, Opcode.OP_put_arg0, 0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_put_arg1);
      this.recordPendingStore('arg', idx, Opcode.OP_put_arg1, 0);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_put_arg2);
      this.recordPendingStore('arg', idx, Opcode.OP_put_arg2, 0);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_put_arg3);
      this.recordPendingStore('arg', idx, Opcode.OP_put_arg3, 0);
    } else {
      this.emitOp(Opcode.OP_put_arg);
      this.currentFunc.byteCode.putU16(idx);
      this.recordPendingStore('arg', idx, Opcode.OP_put_arg, 2);
    }
  }

  emitSetArg(idx: number) {
    if (!this.currentFunc) return;
    if (idx === 0) this.emitOp(Opcode.OP_set_arg0);
    else if (idx === 1) this.emitOp(Opcode.OP_set_arg1);
    else if (idx === 2) this.emitOp(Opcode.OP_set_arg2);
    else if (idx === 3) this.emitOp(Opcode.OP_set_arg3);
    else {
      this.emitOp(Opcode.OP_set_arg);
      this.currentFunc.byteCode.putU16(idx);
    }
  }

  emitGetLoc(idx: number, check: boolean = false) {
    if (!this.currentFunc) return;
    if (check) {
      this.emitOp(Opcode.OP_get_loc_check);
      this.currentFunc.byteCode.putU16(idx);
      return;
    }
    if (this.options.shortCode === false) {
      this.emitOp(Opcode.OP_get_loc);
      this.currentFunc.byteCode.putU16(idx);
    } else {
      if (idx === 0) this.emitOp(Opcode.OP_get_loc0);
      else if (idx === 1) this.emitOp(Opcode.OP_get_loc1);
      else if (idx === 2) this.emitOp(Opcode.OP_get_loc2);
      else if (idx === 3) this.emitOp(Opcode.OP_get_loc3);
      else if (idx < 256) {
        this.emitOp(Opcode.OP_get_loc8);
        this.currentFunc.byteCode.putU8(idx);
      } else {
        this.emitOp(Opcode.OP_get_loc);
        this.currentFunc.byteCode.putU16(idx);
      }
    }
  }

  emitPutLoc(idx: number) {
    if (!this.currentFunc) return;
    if (idx === 0) {
      this.emitOp(Opcode.OP_put_loc0);
      this.recordPendingStore('loc', idx, Opcode.OP_put_loc0, 0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_put_loc1);
      this.recordPendingStore('loc', idx, Opcode.OP_put_loc1, 0);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_put_loc2);
      this.recordPendingStore('loc', idx, Opcode.OP_put_loc2, 0);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_put_loc3);
      this.recordPendingStore('loc', idx, Opcode.OP_put_loc3, 0);
    } else if (idx < 256) {
      this.emitOp(Opcode.OP_put_loc8);
      this.currentFunc.byteCode.putU8(idx);
      this.recordPendingStore('loc', idx, Opcode.OP_put_loc8, 1);
    } else {
      this.emitOp(Opcode.OP_put_loc);
      this.currentFunc.byteCode.putU16(idx);
      this.recordPendingStore('loc', idx, Opcode.OP_put_loc, 2);
    }
  }

  emitSetLoc(idx: number) {
    if (!this.currentFunc) return;
    if (idx === 0) this.emitOp(Opcode.OP_set_loc0);
    else if (idx === 1) this.emitOp(Opcode.OP_set_loc1);
    else if (idx === 2) this.emitOp(Opcode.OP_set_loc2);
    else if (idx === 3) this.emitOp(Opcode.OP_set_loc3);
    else if (idx < 256) {
      this.emitOp(Opcode.OP_set_loc8);
      this.currentFunc.byteCode.putU8(idx);
    } else {
      this.emitOp(Opcode.OP_set_loc);
      this.currentFunc.byteCode.putU16(idx);
    }
  }

  compileBlock(node: ts.Block, options?: { prelude?: () => void }) {
    this.enterScope();
    const blockScopedVars: { name: string, isConst: boolean }[] = [];
    node.statements.forEach(stmt => {
      if (ts.isVariableStatement(stmt)) {
         const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0;
         const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0;
         if (isConst || isLet) {
           stmt.declarationList.declarations.forEach(decl => {
             if (ts.isIdentifier(decl.name)) {
               blockScopedVars.push({ name: decl.name.text, isConst });
             }
           });
         }
      }
    });
    blockScopedVars.forEach(v => {
       if (this.findLocalVar(v.name) === -1) {
         this.addLocalVar(v.name, v.isConst);
       }
    });
    for (let i = blockScopedVars.length - 1; i >= 0; i--) {
       const v = blockScopedVars[i];
       const idx = this.findLocalVar(v.name);
       this.emitOp(Opcode.OP_set_loc_uninitialized);
       this.currentFunc!.byteCode.putU16(idx);
    }
    options?.prelude?.();
    node.statements.forEach(stmt => this.compileStatement(stmt));
    this.leaveScope();
  }

  compileVariableDeclarationList(
    node: ts.VariableDeclarationList,
    options: { isExport?: boolean } = {},
  ) {
    const isConst = (node.flags & ts.NodeFlags.Const) !== 0;
    const isLet = (node.flags & ts.NodeFlags.Let) !== 0;
    const isBlockScoped = isConst || isLet;
    const isTopLevel = this.isTopLevelVariableList(node);
    const hoistsToModuleScope = !isBlockScoped && this.isModuleTopLevel();
    const shouldUseModuleSlot = isTopLevel || hoistsToModuleScope;

    node.declarations.forEach(decl => {
      if (!ts.isIdentifier(decl.name)) {
        console.warn('Destructuring in variable declarations is not supported yet.');
        return;
      }

      const name = decl.name.text;
      let targetIdx = -1;
      if (shouldUseModuleSlot) {
        const slotIdx = this.ensureModuleTopLevelSlot(name, { isConst });
        targetIdx = this.addClosureVar(name, isConst, isBlockScoped, slotIdx);
      } else {
        targetIdx = this.findLocalVar(name);
        if (targetIdx === -1) {
          targetIdx = this.addLocalVar(name, isConst);
        }
      }

      if (decl.initializer) {
        this.compileExpression(decl.initializer, false, name);
      } else {
        if (!isConst) {
          this.emitOp(Opcode.OP_undefined);
        } else {
          throw new Error('Const declarations must have an initializer.');
        }
      }

      if (shouldUseModuleSlot) {
        this.emitPutVarRef(targetIdx);
        if (options.isExport) {
          const exportAtom = this.atomManager.add(name);
          const order = decl.getStart(this.sourceFile ?? undefined);
          this.registerModuleLocalExport(exportAtom, targetIdx, exportAtom, order);
        }
      } else {
        this.emitPutLoc(targetIdx);
      }
    });
  }

  compileVariableStatement(node: ts.VariableStatement) {
    const isTopLevel = this.isTopLevelStatement(node);
    const isExport = isTopLevel && this.hasExportModifier(node);
    this.compileVariableDeclarationList(node.declarationList, { isExport });
  }

  compileClassDeclaration(node: ts.ClassDeclaration) {
    const isTopLevel = this.isTopLevelStatement(node);
    const isExported = isTopLevel && this.hasExportModifier(node);
    const isDefaultExport = isExported && this.hasDefaultModifier(node);
    if (!node.name && !isDefaultExport) {
      throw new Error('Class declarations must have a name. Anonymous class declarations are not supported yet.');
    }
    const bindingName = node.name?.text ?? '*default*';
    const bindingIdx = this.ensureClassBinding(bindingName);
    const exportClosureIdx =
      isExported && bindingIdx >= 0
        ? this.ensureModuleExportClosure(bindingName, { localIdx: bindingIdx })
        : -1;

    this.compileClassExpression(node);

    if (exportClosureIdx !== -1) {
      this.emitSetLoc(bindingIdx);
      this.emitPutVarRef(exportClosureIdx);
      const exportAtom = this.atomManager.add(isDefaultExport ? 'default' : bindingName);
      const localAtom = this.atomManager.add(bindingName);
      const order = node.getStart(this.sourceFile ?? undefined);
      this.registerModuleLocalExport(exportAtom, exportClosureIdx, localAtom, order);
    } else {
      this.emitPutLoc(bindingIdx);
    }
  }

  private compileClassExpression(node: ts.ClassLikeDeclarationBase) {
    const heritageExpression = this.getHeritageExpression(node);
    const hasHeritage = !!heritageExpression;
    this.registerClassMemberNameAtoms(node);
    const classContext = this.collectClassContext(node, hasHeritage);

    this.enterScope();
    const privateScopeLevel = this.enterScope();
    classContext.privateScopeLevel = privateScopeLevel;
    if (this.currentFunc) {
      const atom = this.atomManager.add(classContext.fieldsInitVarName);
      const scopeLevel = this.currentFunc.scopeLevel;
      const idx = this.currentFunc.addScopeVar(atom, JSVarKind.JS_VAR_NORMAL, {
        isConst: true,
        isLexical: true,
        scopeLevel,
      });
      classContext.fieldsInitVarIdx = idx;
      classContext.fieldsInitVarAtom = atom;
      classContext.fieldsInitScopeLevel = scopeLevel;
      if (idx >= 0) {
        this.emitOp(Opcode.OP_set_loc_uninitialized);
        this.currentFunc.byteCode.putU16(idx);
      }
    }

    try {
      this.registerInstancePrivateFields(classContext);
      classContext.fieldsInitFuncIdx = this.createClassFieldsInitFunction(
        classContext.instanceFields,
        { needsInstanceBrand: classContext.needsInstanceBrand },
        classContext,
      );

      if (heritageExpression) {
        this.compileExpression(heritageExpression);
      } else {
        this.emitOp(Opcode.OP_undefined);
      }

      const ctorIdx = this.compileClassConstructor(node, hasHeritage, classContext);
      this.emitFClosure(ctorIdx);

      const classNameAtom = this.atomManager.add(node.name?.getText() ?? '<anonymous>');
      const classFlags = hasHeritage ? JS_DEFINE_CLASS_HAS_HERITAGE : 0;

      this.emitOp(Opcode.OP_define_class);
      this.currentFunc!.byteCode.putU32(classNameAtom);
      this.currentFunc!.byteCode.putU8(classFlags);

      this.compileClassMembers(node, classContext);
      this.emitPrototypeBrandingIfNeeded(classContext);
      this.storeClassFieldsInitBinding(classContext);

      // Drop prototype, leave class constructor on stack for caller.
      this.emitOp(Opcode.OP_drop);
      this.emitStaticBrandingIfNeeded(classContext);
    } finally {
      this.leaveScope();
      this.leaveScope();
    }
  }

  private collectClassContext(
    node: ts.ClassLikeDeclarationBase,
    hasHeritage: boolean,
  ): ClassCompilationContext {
    const context: ClassCompilationContext = {
      hasHeritage,
      instanceFields: [],
      fieldsInitFuncIdx: null,
      fieldsInitVarName: CLASS_FIELDS_INIT_NAME,
      fieldsInitVarIdx: -1,
      fieldsInitVarAtom: JS_ATOM_NULL,
      fieldsInitScopeLevel: -1,
      needsInstanceBrand: false,
      needsStaticBrand: false,
      privateScopeLevel: -1,
      privateBases: new Map(),
      privateStorage: new Map(),
    };

    for (const member of node.members) {
      this.recordPrivateMemberUsage(member, context);
      if (ts.isPropertyDeclaration(member) && !this.hasStaticModifier(member)) {
        if (this.shouldSkipInstanceField(member)) {
          continue;
        }
        if (hasHeritage) {
          throw new Error('Derived class instance fields are not supported yet.');
        }
        const nameAtom = this.getPropertyNameAtom(member.name);
        context.instanceFields.push({
          nameAtom,
          initializer: member.initializer ?? null,
          isPrivate: ts.isPrivateIdentifier(member.name),
        });
      }
    }

    return context;
  }

  private registerClassMemberNameAtoms(node: ts.ClassLikeDeclarationBase) {
    for (const member of node.members) {
      if (!(ts.isMethodDeclaration(member) || ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member))) {
        continue;
      }
      const name = member.name;
      if (!name)
        continue;
      if (!(ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name)))
        continue;
      this.getPropertyNameAtom(name);
    }
  }

  private recordPrivateMemberUsage(member: ts.ClassElement, context: ClassCompilationContext) {
    const named = member as ts.ClassElement & { name?: ts.PropertyName };
    const name = named.name;
    if (!name || !ts.isPrivateIdentifier(name))
      return;
    if (this.hasStaticModifier(member)) {
      context.needsStaticBrand = true;
    } else {
      context.needsInstanceBrand = true;
    }
  }

  private registerInstancePrivateFields(context: ClassCompilationContext) {
    for (const field of context.instanceFields) {
      if (field.isPrivate) {
        this.registerPrivateField(context, field.nameAtom, false);
      }
    }
  }

  private getPrivateIdentifierAtom(name: ts.PrivateIdentifier): number {
    return this.atomManager.add(`#${name.text}`);
  }

  private getPrivateSetterAtom(baseAtom: number): number {
    const baseName = this.atomManager.getString(baseAtom);
    return this.atomManager.add(`${baseName}<set>`);
  }

  private getPrivateStorageKey(atom: number, isStatic: boolean): string {
    return `${isStatic ? 'S' : 'I'}:${atom}`;
  }

  private ensurePrivateStorage(
    context: ClassCompilationContext,
    atom: number,
    kind: JSVarKind,
    isStatic: boolean,
  ): PrivateStorageEntry {
    const key = this.getPrivateStorageKey(atom, isStatic);
    const existing = context.privateStorage.get(key);
    if (existing) {
      if (existing.kind !== kind) {
        this.updatePrivateVarKind(existing.varIdx, kind);
        existing.kind = kind;
      }
      return existing;
    }
    const varIdx = this.currentFunc!.addScopeVar(atom, kind, {
      scopeLevel: context.privateScopeLevel,
      isConst: true,
      isLexical: true,
      isStaticPrivate: isStatic,
      varKind: kind,
    });
    const entry: PrivateStorageEntry = { atom, varIdx, kind, isStatic };
    context.privateStorage.set(key, entry);
    return entry;
  }

  private updatePrivateVarKind(varIdx: number, kind: JSVarKind) {
    if (!this.currentFunc)
      return;
    const def = this.currentFunc.vars[varIdx];
    if (def) {
      def.varKind = kind;
    }
  }

  private registerPrivateField(
    context: ClassCompilationContext,
    atom: number,
    isStatic: boolean,
  ) {
    const key = this.getPrivateStorageKey(atom, isStatic);
    if (context.privateBases.has(key)) {
      throw new Error(`Private member '${this.atomManager.getString(atom)}' already defined.`);
    }
    const storage = this.ensurePrivateStorage(
      context,
      atom,
      JSVarKind.JS_VAR_PRIVATE_FIELD,
      isStatic,
    );
    this.emitOp(Opcode.OP_private_symbol);
    this.currentFunc!.byteCode.putU32(atom);
    this.emitScopePutVarInit(atom, context.privateScopeLevel);
    context.privateBases.set(key, {
      atom,
      storage,
      type: 'field',
      hasGetter: false,
      hasSetter: false,
    });
  }

  private registerPrivateMethod(
    context: ClassCompilationContext,
    atom: number,
    isStatic: boolean,
  ) {
    const key = this.getPrivateStorageKey(atom, isStatic);
    if (context.privateBases.has(key)) {
      throw new Error(`Private member '${this.atomManager.getString(atom)}' already defined.`);
    }
    const storage = this.ensurePrivateStorage(
      context,
      atom,
      JSVarKind.JS_VAR_PRIVATE_METHOD,
      isStatic,
    );
    context.privateBases.set(key, {
      atom,
      storage,
      type: 'method',
      hasGetter: false,
      hasSetter: false,
    });
  }

  private registerPrivateAccessor(
    context: ClassCompilationContext,
    atom: number,
    isStatic: boolean,
    role: 'get' | 'set',
  ): number {
    const key = this.getPrivateStorageKey(atom, isStatic);
    let slot = context.privateBases.get(key);
    const initialKind =
      role === 'get' ? JSVarKind.JS_VAR_PRIVATE_GETTER : JSVarKind.JS_VAR_PRIVATE_SETTER;
    if (!slot) {
      const storage = this.ensurePrivateStorage(context, atom, initialKind, isStatic);
      slot = {
        atom,
        storage,
        type: 'accessor',
        hasGetter: role === 'get',
        hasSetter: role === 'set',
      };
      context.privateBases.set(key, slot);
    } else {
      if (slot.type !== 'accessor') {
        throw new Error(`Private member '${this.atomManager.getString(atom)}' already defined.`);
      }
      if (role === 'get') {
        if (slot.hasGetter)
          throw new Error(`Private member '${this.atomManager.getString(atom)}' already defined.`);
        slot.hasGetter = true;
      } else {
        if (slot.hasSetter)
          throw new Error(`Private member '${this.atomManager.getString(atom)}' already defined.`);
        slot.hasSetter = true;
      }
      const newKind =
        slot.hasGetter && slot.hasSetter
          ? JSVarKind.JS_VAR_PRIVATE_GETTER_SETTER
          : role === 'get'
            ? JSVarKind.JS_VAR_PRIVATE_GETTER
            : JSVarKind.JS_VAR_PRIVATE_SETTER;
      if (slot.storage.kind !== newKind) {
        this.updatePrivateVarKind(slot.storage.varIdx, newKind);
        slot.storage.kind = newKind;
      }
    }
    if (role === 'set') {
      const setterAtom = this.getPrivateSetterAtom(atom);
      this.ensurePrivateStorage(context, setterAtom, JSVarKind.JS_VAR_PRIVATE_SETTER, isStatic);
      return setterAtom;
    }
    return atom;
  }

  private emitScopeGetVar(atom: number, scopeLevel: number) {
    this.emitOp(Opcode.OP_scope_get_var);
    this.currentFunc!.byteCode.putU32(atom);
    this.currentFunc!.byteCode.putU16(scopeLevel);
  }

  private emitScopePutVarInit(atom: number, scopeLevel: number) {
    this.emitOp(Opcode.OP_scope_put_var_init);
    this.currentFunc!.byteCode.putU32(atom);
    this.currentFunc!.byteCode.putU16(scopeLevel);
  }

  private emitScopeDeleteVar(atom: number, scopeLevel: number) {
    this.emitOp(Opcode.OP_scope_delete_var);
    this.currentFunc!.byteCode.putU32(atom);
    this.currentFunc!.byteCode.putU16(scopeLevel);
  }

  private getFunctionDefFromPool(idx: number): JSFunctionDef | null {
    if (!this.currentFunc)
      return null;
    const entry = this.currentFunc.cpool[idx];
    if (!entry || entry.type !== 'function')
      return null;
    return entry.value as JSFunctionDef;
  }

  private compileClassMembers(node: ts.ClassLikeDeclarationBase, context: ClassCompilationContext) {
    for (const member of node.members) {
      if (ts.isConstructorDeclaration(member)) {
        continue;
      }
      if (ts.isMethodDeclaration(member)) {
        this.emitClassMethod(member, context);
        continue;
      }
      if (ts.isGetAccessor(member) || ts.isSetAccessor(member)) {
        this.emitClassAccessor(member as ts.GetAccessorDeclaration | ts.SetAccessorDeclaration, context);
        continue;
      }
      if (ts.isPropertyDeclaration(member)) {
        const isStatic = this.hasStaticModifier(member);
        if (isStatic) {
          if (ts.isPrivateIdentifier(member.name)) {
            this.emitClassPrivateStaticField(member, context);
          } else {
            this.emitClassStaticField(member);
          }
        }
        continue;
      }
      if (ts.isSemicolonClassElement(member)) {
        continue;
      }
      console.warn(`Unsupported class member: ${ts.SyntaxKind[member.kind]}`);
    }
  }

  private storeClassFieldsInitBinding(context: ClassCompilationContext) {
    if (!this.currentFunc)
      return;
    if (context.fieldsInitVarIdx < 0)
      return;
    if (context.fieldsInitVarAtom === JS_ATOM_NULL || context.fieldsInitScopeLevel < 0)
      return;
    const funcIdx = context.fieldsInitFuncIdx;
    if (funcIdx != null) {
      this.emitFClosure(funcIdx);
      this.emitOp(Opcode.OP_set_home_object);
    } else {
      this.emitOp(Opcode.OP_undefined);
    }
    this.emitScopePutVarInit(context.fieldsInitVarAtom, context.fieldsInitScopeLevel);
  }

  private prepareFieldsInitBinding(binding: FieldsInitBinding): FieldsInitBinding {
    if (!this.currentFunc)
      return binding;
    const name = this.atomManager.getString(binding.atom);
    if (!name)
      return binding;
    this.resolveVarInFunc(this.currentFunc, name);
    const closureIdx = this.findClosureVar(name);
    if (closureIdx < 0)
      return binding;
    const closure = this.currentFunc.closureVar[closureIdx];
    if (!closure)
      return binding;
    return {
      ...binding,
      closure: {
        index: closureIdx,
        isLexical: closure.isLexical,
      },
    };
  }

  private emitInstanceFieldInitializers(
    instanceFields: InstanceFieldRecord[],
    context: ClassCompilationContext,
  ) {
    if (instanceFields.length === 0)
      return;
    this.emitOp(Opcode.OP_push_this);
    for (const field of instanceFields) {
      if (field.initializer) {
        this.compileExpression(field.initializer);
      } else {
        this.emitOp(Opcode.OP_undefined);
      }
      if (field.isPrivate) {
        this.emitScopeGetVar(field.nameAtom, context.privateScopeLevel);
        this.emitOp(Opcode.OP_swap);
        this.emitOp(Opcode.OP_define_private_field);
      } else {
        this.emitOp(Opcode.OP_define_field);
        this.currentFunc!.byteCode.putU32(field.nameAtom);
      }
    }
    this.emitOp(Opcode.OP_drop);
  }

  private emitClassFieldsInitCall(binding: FieldsInitBinding) {
    if (!this.currentFunc)
      return;
    if (binding.closure) {
      this.emitGetVarRef(binding.closure.index, binding.closure.isLexical);
    } else {
      this.emitOp(Opcode.OP_scope_get_var);
      this.currentFunc.byteCode.putU32(binding.atom);
      this.currentFunc.byteCode.putU16(binding.scopeLevel);
    }
    this.emitOp(Opcode.OP_dup);
    const skipCall = this.newLabel();
    this.emitJump8(Opcode.OP_if_false8, skipCall);
    const thisAtom = this.atomManager.add('this');
    this.emitOp(Opcode.OP_scope_get_var);
    this.currentFunc.byteCode.putU32(thisAtom);
    this.currentFunc.byteCode.putU16(0);
    this.emitOp(Opcode.OP_swap);
    this.emitOp(Opcode.OP_call_method);
    this.currentFunc.byteCode.putU16(0);
    this.emitLabel(skipCall);
    this.emitOp(Opcode.OP_drop);
  }

  private emitInstanceBrandPrelude() {
    if (!this.currentFunc)
      return;
    const thisAtom = this.atomManager.add('this');
    this.emitOp(Opcode.OP_scope_get_var);
    this.currentFunc.byteCode.putU32(thisAtom);
    this.currentFunc.byteCode.putU16(0);

    const homeObjectAtom = this.atomManager.add('<home_object>');
    this.emitOp(Opcode.OP_scope_get_var);
    this.currentFunc.byteCode.putU32(homeObjectAtom);
    this.currentFunc.byteCode.putU16(0);

    this.emitOp(Opcode.OP_add_brand);
  }

  private emitPrototypeBrandingIfNeeded(context: ClassCompilationContext) {
    if (!this.currentFunc)
      return;
    if (!context.needsInstanceBrand)
      return;
    this.emitOp(Opcode.OP_dup);
    this.emitOp(Opcode.OP_null);
    this.emitOp(Opcode.OP_swap);
    this.emitOp(Opcode.OP_add_brand);
  }

  private emitStaticBrandingIfNeeded(context: ClassCompilationContext) {
    if (!this.currentFunc)
      return;
    if (!context.needsStaticBrand)
      return;
    this.emitOp(Opcode.OP_dup);
    this.emitOp(Opcode.OP_dup);
    this.emitOp(Opcode.OP_add_brand);
  }

  private emitClassMethod(member: ts.MethodDeclaration, context: ClassCompilationContext) {
    const isStatic = this.hasStaticModifier(member);
    if (ts.isPrivateIdentifier(member.name)) {
      this.emitClassPrivateMethod(member, context, isStatic);
      return;
    }
    const methodNameAtom = this.getPropertyNameAtom(member.name);
    const nameHint = ts.isIdentifier(member.name) ? member.name.text : undefined;
    const funcIdx = this.compileMethodFunction(member, {
      kind: 'method',
      nameHint,
      isStatic,
    });
    this.emitFClosure(funcIdx);
    if (isStatic)
      this.emitOp(Opcode.OP_swap);
    this.emitOp(Opcode.OP_define_method);
    this.currentFunc!.byteCode.putU32(methodNameAtom);
    this.currentFunc!.byteCode.putU8(DefineMethodKind.METHOD);
    if (isStatic)
      this.emitOp(Opcode.OP_swap);
  }

  private emitClassAccessor(
    member: ts.GetAccessorDeclaration | ts.SetAccessorDeclaration,
    context: ClassCompilationContext,
  ) {
    const isStatic = this.hasStaticModifier(member);
    if (ts.isPrivateIdentifier(member.name)) {
      this.emitClassPrivateAccessor(member, context, isStatic);
      return;
    }
    const methodNameAtom = this.getPropertyNameAtom(member.name);
    const kind = ts.isGetAccessorDeclaration(member) ? DefineMethodKind.GETTER : DefineMethodKind.SETTER;
    const nameHint = ts.isIdentifier(member.name) ? member.name.text : undefined;
    const funcIdx = this.compileMethodFunction(member, {
      kind: kind === DefineMethodKind.GETTER ? 'getter' : 'setter',
      nameHint,
      isStatic,
    });
    this.emitFClosure(funcIdx);
    if (isStatic)
      this.emitOp(Opcode.OP_swap);
    this.emitOp(Opcode.OP_define_method);
    this.currentFunc!.byteCode.putU32(methodNameAtom);
    this.currentFunc!.byteCode.putU8(kind);
    if (isStatic)
      this.emitOp(Opcode.OP_swap);
  }

  private emitClassStaticField(member: ts.PropertyDeclaration) {
    if (!this.hasStaticModifier(member)) {
      throw new Error('emitClassStaticField requires a static member.');
    }
    const fieldNameAtom = this.getPropertyNameAtom(member.name);
    this.emitOp(Opcode.OP_swap);
    if (member.initializer) {
      this.compileExpression(member.initializer);
    } else {
      this.emitOp(Opcode.OP_undefined);
    }
    this.emitOp(Opcode.OP_define_field);
    this.currentFunc!.byteCode.putU32(fieldNameAtom);
    this.emitOp(Opcode.OP_swap);
  }

  private emitClassPrivateMethod(
    member: ts.MethodDeclaration,
    context: ClassCompilationContext,
    isStatic: boolean,
  ) {
    if (!ts.isPrivateIdentifier(member.name))
      throw new Error('emitClassPrivateMethod requires a private identifier name.');
    const nameAtom = this.getPrivateIdentifierAtom(member.name);
    this.registerPrivateMethod(context, nameAtom, isStatic);
    const funcIdx = this.compileMethodFunction(member, {
      kind: 'method',
      isStatic,
    });
    this.emitFClosure(funcIdx);
    const funcDef = this.getFunctionDefFromPool(funcIdx);
    if (funcDef) {
      funcDef.needHomeObject = true;
    }
    this.emitOp(Opcode.OP_set_home_object);
    this.emitOp(Opcode.OP_set_name);
    this.currentFunc!.byteCode.putU32(nameAtom);
    this.emitScopePutVarInit(nameAtom, context.privateScopeLevel);
  }

  private emitClassPrivateAccessor(
    member: ts.GetAccessorDeclaration | ts.SetAccessorDeclaration,
    context: ClassCompilationContext,
    isStatic: boolean,
  ) {
    if (!ts.isPrivateIdentifier(member.name))
      throw new Error('emitClassPrivateAccessor requires a private identifier name.');
    const baseAtom = this.getPrivateIdentifierAtom(member.name);
    const role = ts.isSetAccessorDeclaration(member) ? 'set' : 'get';
    const targetAtom = this.registerPrivateAccessor(context, baseAtom, isStatic, role);
    const funcIdx = this.compileMethodFunction(member, {
      kind: role === 'set' ? 'setter' : 'getter',
      isStatic,
    });
    this.emitFClosure(funcIdx);
    const funcDef = this.getFunctionDefFromPool(funcIdx);
    if (funcDef) {
      funcDef.needHomeObject = true;
    }
    this.emitOp(Opcode.OP_set_home_object);
    this.emitScopePutVarInit(targetAtom, context.privateScopeLevel);
  }

  private emitClassPrivateStaticField(
    member: ts.PropertyDeclaration,
    context: ClassCompilationContext,
  ) {
    if (!this.hasStaticModifier(member) || !ts.isPrivateIdentifier(member.name)) {
      throw new Error('emitClassPrivateStaticField requires a static private member.');
    }
    const fieldNameAtom = this.getPrivateIdentifierAtom(member.name);
    this.registerPrivateField(context, fieldNameAtom, true);
    this.emitOp(Opcode.OP_swap);
    this.emitScopeGetVar(fieldNameAtom, context.privateScopeLevel);
    if (member.initializer) {
      this.compileExpression(member.initializer);
    } else {
      this.emitOp(Opcode.OP_undefined);
    }
    this.emitOp(Opcode.OP_define_private_field);
    this.emitOp(Opcode.OP_swap);
  }

  private createClassFieldsInitFunction(
    instanceFields: InstanceFieldRecord[],
    options: { needsInstanceBrand?: boolean } = {},
    context: ClassCompilationContext,
  ): number | null {
    const needsBrand = options.needsInstanceBrand ?? false;
    if (instanceFields.length === 0 && !needsBrand)
      return null;
    const parentFunc = this.currentFunc;
    if (!parentFunc)
      throw new Error('No active function context');

    const funcDef = new JSFunctionDef(this.ctx, parentFunc);
    funcDef.funcName = this.atomManager.add('<class_fields_init>');
    funcDef.filename = parentFunc.filename;
    funcDef.jsMode = JSMode.JS_MODE_STRICT;
    funcDef.hasPrototype = false;
    funcDef.hasSimpleParameterList = true;
    funcDef.hasThisBinding = true;
    funcDef.hasHomeObject = true;
    funcDef.needHomeObject = true;
    funcDef.newTargetAllowed = false;
    funcDef.argumentsAllowed = false;

  const startPos = parentFunc.initialSourcePos ?? parentFunc.sourcePos ?? 0;
  this.initializeFunctionDebugInfo(funcDef, startPos);

    this.currentFunc = funcDef;
    this.syncScopeLevel();

    if (needsBrand) {
      this.emitInstanceBrandPrelude();
    }

  this.emitInstanceFieldInitializers(instanceFields, context);
    this.emitOp(Opcode.OP_return_undef);

    const childFunc = this.currentFunc;
    this.currentFunc = parentFunc;
    this.syncScopeLevel();

    const idx = parentFunc.cpool.push({ type: 'function', value: childFunc! }) - 1;
    return idx;
  }

  private compileClassConstructor(
    node: ts.ClassLikeDeclarationBase,
    hasHeritage: boolean,
    context: ClassCompilationContext,
  ): number {
    const ctor = node.members.find((m): m is ts.ConstructorDeclaration => ts.isConstructorDeclaration(m));
    if (!ctor) {
      throw new Error('Classes without explicit constructor are not supported yet.');
    }
    if (hasHeritage) {
      this.ensureDerivedConstructorHasSuperCall(ctor);
    }
    const bindingInfo =
      context.fieldsInitVarIdx >= 0 &&
      context.fieldsInitScopeLevel >= 0 &&
      context.fieldsInitVarAtom !== JS_ATOM_NULL
        ? {
            atom: context.fieldsInitVarAtom,
            scopeLevel: context.fieldsInitScopeLevel,
          }
        : undefined;
    return this.compileMethodFunction(ctor, {
      kind: 'constructor',
      nameHint: node.name?.text,
      hasHeritage,
      fieldsInitBinding: bindingInfo,
    });
  }

  private ensureDerivedConstructorHasSuperCall(ctor: ts.ConstructorDeclaration) {
    if (!ctor.body) {
      throw new Error('Derived class constructors must call super().');
    }
    let found = false;
    const visit = (node: ts.Node) => {
      if (found)
        return;
      if (ts.isFunctionLike(node) && node !== ctor)
        return;
      if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.SuperKeyword) {
        found = true;
        return;
      }
      node.forEachChild(visit);
    };
    ctor.body.statements.forEach(stmt => stmt.forEachChild(visit));
    if (!found) {
      throw new Error('Derived class constructors must call super().');
    }
  }

  private compileMethodFunction(
    node: ts.SignatureDeclarationBase & { body?: ts.Block | ts.Expression },
    options: MethodFunctionOptions,
  ): number {
    const parentFunc = this.currentFunc;
    if (!parentFunc)
      throw new Error('No active function context');

    const funcDef = new JSFunctionDef(this.ctx, parentFunc);
    if (options.nameHint) {
      funcDef.funcName = this.atomManager.add(options.nameHint);
    }
    funcDef.filename = parentFunc.filename;
    funcDef.jsMode = JSMode.JS_MODE_STRICT;
    funcDef.hasPrototype = false;
    funcDef.hasSimpleParameterList = true;
    funcDef.hasThisBinding = true;
    funcDef.hasHomeObject = true;
    funcDef.needHomeObject = !options.isStatic;
    funcDef.newTargetAllowed = options.kind === 'constructor';
    funcDef.argumentsAllowed = true;

    if (options.kind === 'constructor') {
      funcDef.superCallAllowed = !!options.hasHeritage;
      funcDef.isDerivedClassConstructor = !!options.hasHeritage;
    } else {
      funcDef.superAllowed = true;
    }

    const sourceFile = this.sourceFile ?? undefined;
    const sourcePos = node.getStart(sourceFile);
    this.initializeFunctionDebugInfo(funcDef, sourcePos);

    this.currentFunc = funcDef;
    this.syncScopeLevel();

    node.parameters.forEach(param => {
      if (!ts.isIdentifier(param.name)) {
        throw new Error('Only simple identifier parameters are supported in class methods for now.');
      }
      this.addArg(param.name.text);
    });

    if (options.kind === 'constructor') {
      if (options.hasHeritage) {
        this.emitOp(Opcode.OP_init_ctor);
      } else {
        this.emitOp(Opcode.OP_check_ctor);
      }
    }

    let bindingInfo = options.fieldsInitBinding;
    if (bindingInfo && options.kind === 'constructor') {
      bindingInfo = this.prepareFieldsInitBinding(bindingInfo);
    }
    const needsClassFieldInitCall = options.kind === 'constructor' && !!bindingInfo;
    let emitFieldPrelude: (() => void) | undefined;
    if (needsClassFieldInitCall && bindingInfo) {
      emitFieldPrelude = () => this.emitClassFieldsInitCall(bindingInfo);
    }

    if (node.body) {
      if (ts.isBlock(node.body)) {
        this.compileBlock(node.body, emitFieldPrelude ? { prelude: emitFieldPrelude } : undefined);
      } else {
        emitFieldPrelude?.();
        this.compileExpression(node.body, true);
        if (!this.isReturnOp(this.currentFunc!.lastOp)) {
          this.emitOp(Opcode.OP_return);
        }
      }
    } else if (emitFieldPrelude) {
      emitFieldPrelude();
    }

    const lastOp = this.currentFunc!.byteCode.lastByte;
    if (!this.isReturnOp(lastOp)) {
      if (options.kind === 'constructor') {
        this.emitOp(Opcode.OP_undefined);
        this.emitOp(Opcode.OP_return);
      } else {
        this.emitOp(Opcode.OP_return_undef);
      }
    }

    const childFunc = this.currentFunc;
    this.currentFunc = parentFunc;
    this.syncScopeLevel();

    const idx = parentFunc.cpool.push({ type: 'function', value: childFunc! }) - 1;
    return idx;
  }

  private emitFClosure(idx: number) {
    if (idx < 256) {
      this.emitOp(Opcode.OP_fclosure8);
      this.currentFunc!.byteCode.putU8(idx);
    } else {
      this.emitOp(Opcode.OP_fclosure);
      this.currentFunc!.byteCode.putU32(idx);
    }
  }

  private hasModifier(node: ts.Node, kind: ts.SyntaxKind): boolean {
    const modifiers = (node as ts.Node & { modifiers?: ts.NodeArray<ts.Modifier> }).modifiers;
    return !!modifiers?.some(mod => mod.kind === kind);
  }

  private hasStaticModifier(node: ts.Node): boolean {
    return this.hasModifier(node, ts.SyntaxKind.StaticKeyword);
  }

  private hasExportModifier(node: ts.Node): boolean {
    return this.hasModifier(node, ts.SyntaxKind.ExportKeyword);
  }

  private hasDefaultModifier(node: ts.Node): boolean {
    return this.hasModifier(node, ts.SyntaxKind.DefaultKeyword);
  }

  private getModifierFlags(node: ts.Node): ts.ModifierFlags {
    if (!ts.canHaveModifiers(node))
      return ts.ModifierFlags.None;
    return ts.getCombinedModifierFlags(node as ts.Declaration);
  }

  private hasTsAccessibilityModifier(node: ts.Node): boolean {
    const flags = this.getModifierFlags(node);
    return (flags & (ts.ModifierFlags.Private | ts.ModifierFlags.Protected)) !== 0;
  }

  private hasDeclareModifier(node: ts.Node): boolean {
    const flags = this.getModifierFlags(node);
    return (flags & ts.ModifierFlags.Ambient) !== 0;
  }

  private shouldSkipInstanceField(member: ts.PropertyDeclaration): boolean {
    if (ts.isPrivateIdentifier(member.name))
      return false;
    if (this.hasDeclareModifier(member))
      return true;
    return this.hasTsAccessibilityModifier(member) && !member.initializer;
  }

  private getPropertyNameAtom(name: ts.PropertyName): number {
    if (ts.isIdentifier(name)) {
      return this.atomManager.add(name.text);
    }
    if (ts.isStringLiteral(name)) {
      return this.atomManager.add(name.text);
    }
    if (ts.isPrivateIdentifier(name)) {
      return this.getPrivateIdentifierAtom(name);
    }
    throw new Error('Only identifier and string literal property names are supported for class members.');
  }

  private getHeritageExpression(node: ts.ClassLikeDeclarationBase): ts.Expression | null {
    if (!node.heritageClauses)
      return null;
    for (const clause of node.heritageClauses) {
      if (clause.token === ts.SyntaxKind.ExtendsKeyword && clause.types.length > 0) {
        return clause.types[0].expression;
      }
    }
    return null;
  }

  private ensureClassBinding(name: string): number {
    const existing = this.findLocalVar(name);
    if (existing !== -1)
      return existing;
    const idx = this.addLocalVar(name, true);
    if (this.currentFunc) {
      this.emitOp(Opcode.OP_set_loc_uninitialized);
      this.currentFunc.byteCode.putU16(idx);
    }
    return idx;
  }

  compileForStatement(node: ts.ForStatement, labelName?: string) {
    this.enterScope();
    
    // Init
    if (node.initializer) {
      if (ts.isVariableDeclarationList(node.initializer)) {
        this.compileVariableDeclarationList(node.initializer);
      } else {
        this.compileExpression(node.initializer);
        this.emitOp(Opcode.OP_drop); // Expression statement result
      }
    }

    const startLabel = this.newLabel();
    const endLabel = this.newLabel();
    const continueLabel = this.newLabel();

  this.pushLoopBlock({ breakLabel: endLabel, continueLabel, labelName });

    this.emitLabel(startLabel);

    // Condition
    if (node.condition) {
      this.compileExpression(node.condition);
      this.emitJump8(Opcode.OP_if_false8, endLabel);
    }

    // Body
    this.compileStatement(node.statement);

    // Increment
    this.emitLabel(continueLabel);
    if (node.incrementor) {
      this.compileExpression(node.incrementor, false, undefined, true);
    }

    this.emitJump8(Opcode.OP_goto8, startLabel);
    this.emitLabel(endLabel);

    this.popBlock();
    this.leaveScope();
  }

  compileReturnStatement(node: ts.ReturnStatement) {
    this.getStatementEmitter().emitReturnStatement(node);
  }

  compileIfStatement(node: ts.IfStatement) {
    this.getStatementEmitter().emitIfStatement(node);
  }

  compileWhileStatement(node: ts.WhileStatement, labelName?: string) {
    const startLabel = this.newLabel();
    const endLabel = this.newLabel();

    this.pushLoopBlock({ breakLabel: endLabel, continueLabel: startLabel, labelName });

    this.emitLabel(startLabel);
    this.compileExpression(node.expression);
    this.emitJump8(Opcode.OP_if_false8, endLabel);

    this.compileStatement(node.statement);

    this.emitJump8(Opcode.OP_goto8, startLabel);
    this.emitLabel(endLabel);

    this.popBlock();
  }

  compileBreakStatement(node: ts.BreakStatement) {
    this.getStatementEmitter().emitBreakStatement(node);
  }


  private isReturnOp(op?: number): boolean {
    if (op === undefined)
      return false;
    return op === Opcode.OP_return ||
           op === Opcode.OP_return_undef ||
           op === Opcode.OP_return_async ||
           op === Opcode.OP_throw ||
           op === Opcode.OP_tail_call;
  }

  compileSwitchStatement(node: ts.SwitchStatement) {
    this.getStatementEmitter().emitSwitchStatement(node);
  }

  compileExpression(node: ts.Expression, isTail: boolean = false, nameHint?: string, dropResult: boolean = false) {
    this.expressionContextStack.push({ dropRequested: dropResult, shouldDrop: dropResult });
    const exprCtx = this.getCurrentExpressionContext();

    try {
    const isIncDecUpdate =
      (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) &&
      (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken);

      if (dropResult && isIncDecUpdate) {
        this.compileUpdateExpression(node as ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, true);
        if (exprCtx) exprCtx.shouldDrop = false;
        return;
      }

      if (this.getExpressionEmitter().emit(node, { isTail, nameHint, dropResult })) {
        return;
      }

      // this.emitLineCol(node.getStart()); // Removed to match QuickJS behavior (only specific expressions emit line info)
      switch (node.kind) {
        case ts.SyntaxKind.BinaryExpression:
          this.compileBinaryExpression(node as ts.BinaryExpression);
          break;
        case ts.SyntaxKind.CallExpression:
          this.compileCallExpression(node as ts.CallExpression, isTail);
          break;
        case ts.SyntaxKind.Identifier:
          this.compileIdentifier(node as ts.Identifier);
          break;
        case ts.SyntaxKind.NumericLiteral:
          this.compileNumericLiteral(node as ts.NumericLiteral);
          break;
        case ts.SyntaxKind.StringLiteral:
          this.compileStringLiteral(node as ts.StringLiteral);
          break;
        case ts.SyntaxKind.ParenthesizedExpression:
          this.compileParenthesizedExpression(node as ts.ParenthesizedExpression, isTail);
          break;
        case ts.SyntaxKind.ArrowFunction:
          this.compileArrowFunction(node as ts.ArrowFunction, nameHint);
          break;
        case ts.SyntaxKind.FunctionExpression:
          this.compileFunctionExpression(node as ts.FunctionExpression, nameHint);
          break;
        case ts.SyntaxKind.VoidExpression:
          this.compileVoidExpression(node as ts.VoidExpression);
          break;
        case ts.SyntaxKind.ArrayLiteralExpression:
          this.compileArrayLiteral(node as ts.ArrayLiteralExpression);
          break;
        case ts.SyntaxKind.ObjectLiteralExpression:
          this.compileObjectLiteral(node as ts.ObjectLiteralExpression);
          break;
        case ts.SyntaxKind.PropertyAccessExpression:
          this.compilePropertyAccessExpression(node as ts.PropertyAccessExpression);
          break;
        case ts.SyntaxKind.TypeOfExpression:
          this.compileTypeOfExpression(node as ts.TypeOfExpression);
          break;
        case ts.SyntaxKind.DeleteExpression:
          this.compileDeleteExpression(node as ts.DeleteExpression);
          break;
        case ts.SyntaxKind.RegularExpressionLiteral:
          this.compileRegularExpressionLiteral(node as ts.RegularExpressionLiteral);
          break;
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateExpression:
          this.emitTemplateExpression(node as (ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral));
          break;
        case ts.SyntaxKind.ConditionalExpression:
          this.emitConditionalExpression(node as ts.ConditionalExpression);
          break;
        case ts.SyntaxKind.TrueKeyword:
          this.emitOp(Opcode.OP_push_true);
          break;
        case ts.SyntaxKind.FalseKeyword:
          this.emitOp(Opcode.OP_push_false);
          break;
        case ts.SyntaxKind.NullKeyword:
          this.emitOp(Opcode.OP_null);
          break;
        case ts.SyntaxKind.ThisKeyword:
          this.emitOp(Opcode.OP_push_this);
          break;
        case ts.SyntaxKind.PrefixUnaryExpression:
          this.compilePrefixUnaryExpression(node as ts.PrefixUnaryExpression);
          break;
        case ts.SyntaxKind.PostfixUnaryExpression:
          this.compilePostfixUnaryExpression(node as ts.PostfixUnaryExpression);
          break;
        case ts.SyntaxKind.NewExpression:
          this.compileNewExpression(node as ts.NewExpression);
          break;
        default:
          console.warn(`Unsupported expression kind: ${ts.SyntaxKind[node.kind]}`);
      }
    } finally {
      if (exprCtx?.shouldDrop) {
        this.emitOp(Opcode.OP_drop);
      }
      this.expressionContextStack.pop();
    }
  }

  compileTypeOfExpression(node: ts.TypeOfExpression) {
    this.compileExpression(node.expression);
    this.emitOp(Opcode.OP_typeof);
  }

  compileRegularExpressionLiteral(node: ts.RegularExpressionLiteral) {
    const text = node.text;
    const lastSlash = text.lastIndexOf('/');
    const body = text.substring(1, lastSlash);
    const flags = text.substring(lastSlash + 1);
    
    // Emit: new RegExp(body, flags)
    // Since we cannot compile regex to bytecode at compile time without the QuickJS compiler,
    // we fallback to runtime compilation using the RegExp constructor.
    
    const regExpAtom = this.atomManager.add('RegExp');
    this.emitOp(Opcode.OP_get_var);
    this.currentFunc!.byteCode.putU32(regExpAtom);
    
    this.emitPushConst({ type: 'string', value: body });
    this.emitPushConst({ type: 'string', value: flags });
    
    this.emitOp(Opcode.OP_call_constructor);
    this.currentFunc!.byteCode.putU16(2);
  }

  private emitTemplateExpression(node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral) {
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      this.compileStringLiteral(node as unknown as ts.StringLiteral);
      return;
    }
    
    // Head
    this.compileStringLiteral(node.head as unknown as ts.StringLiteral);
    
    node.templateSpans.forEach(span => {
      this.compileExpression(span.expression);
      this.emitOp(Opcode.OP_add); // String concat
      this.compileStringLiteral(span.literal as unknown as ts.StringLiteral);
      this.emitOp(Opcode.OP_add); // String concat
    });
  }

  private emitConditionalExpression(node: ts.ConditionalExpression) {
    const labelElse = this.newLabel();
    const labelEnd = this.newLabel();
    
    this.compileExpression(node.condition);
    this.emitJump8(Opcode.OP_if_false8, labelElse);
    
    this.compileExpression(node.whenTrue);
    this.emitJump8(Opcode.OP_goto8, labelEnd);
    
    this.emitLabel(labelElse);
    this.compileExpression(node.whenFalse);
    
    this.emitLabel(labelEnd);
  }

  compilePrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
    if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
      this.compileUpdateExpression(node);
      return;
    }

    this.compileExpression(node.operand);
    switch (node.operator as ts.SyntaxKind) {
      case ts.SyntaxKind.PlusToken:
        this.emitOp(Opcode.OP_plus);
        break;
      case ts.SyntaxKind.MinusToken:
        this.emitOp(Opcode.OP_neg);
        break;
      case ts.SyntaxKind.ExclamationToken:
        this.emitOp(Opcode.OP_lnot);
        break;
      case ts.SyntaxKind.TildeToken:
        this.emitOp(Opcode.OP_not);
        break;
      case ts.SyntaxKind.TypeOfKeyword:
        this.emitOp(Opcode.OP_typeof);
        break;
      case ts.SyntaxKind.VoidKeyword:
        this.emitOp(Opcode.OP_drop);
        this.emitOp(Opcode.OP_undefined);
        break;
      default:
        console.warn(`Unsupported prefix unary operator: ${ts.SyntaxKind[node.operator]}`);
    }
  }

  compileDeleteExpression(node: ts.DeleteExpression) {
    const operand = node.expression;
    const operatorPos = node.getStart();

    if (ts.isPropertyAccessExpression(operand)) {
      if (ts.isPrivateIdentifier(operand.name)) {
        throw new Error('cannot delete a private class field');
      }
      this.compileExpression(operand.expression);
      this.emitPushConst({ type: 'string', value: operand.name.text });
      this.emitLineCol(operatorPos);
      this.emitOp(Opcode.OP_delete);
      return;
    }

    if (ts.isElementAccessExpression(operand)) {
      this.compileExpression(operand.expression);
      if (operand.argumentExpression) {
        this.compileExpression(operand.argumentExpression);
      } else {
        this.emitOp(Opcode.OP_undefined);
      }
      this.emitLineCol(operatorPos);
      this.emitOp(Opcode.OP_delete);
      return;
    }

    if (ts.isIdentifier(operand)) {
      this.compileDeleteIdentifier(operand, operatorPos);
      return;
    }

    this.compileExpression(operand);
    this.emitLineCol(operatorPos);
    this.emitOp(Opcode.OP_drop);
    this.emitOp(Opcode.OP_push_true);
  }

  private compileDeleteIdentifier(node: ts.Identifier, operatorPos: number) {
    if (this.isStrictMode()) {
      throw new Error('cannot delete a direct reference in strict mode');
    }
    const name = node.text;
    if (this.currentFunc) {
      this.resolveVarInFunc(this.currentFunc, name);
    }
    const atom = this.atomManager.add(name);
    this.emitLineCol(operatorPos);
    this.emitScopeDeleteVar(atom, this.scopeLevel);
  }

  compilePostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
    if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
      this.compileUpdateExpression(node);
    } else {
      console.warn(`Unsupported postfix unary operator: ${ts.SyntaxKind[node.operator]}`);
    }
  }

  compileUpdateExpression(
    node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression,
    dropResult: boolean = false,
  ) {
    const operand = node.operand;
    const operator = node.operator;
    const isPrefix = ts.isPrefixUnaryExpression(node);

    if (!ts.isIdentifier(operand)) {
      console.warn('Update expression only supported for simple identifiers.');
      this.emitOp(Opcode.OP_push_0);
      return;
    }

    const name = operand.text;
    let idx = this.findLocalVar(name);
    let isClosure = false;
    let isLexical = false;

    if (idx === -1) {
      idx = this.findClosureVar(name);
      if (idx !== -1) {
        isClosure = true;
        isLexical = this.currentFunc!.closureVar[idx].isLexical;
      }
    }

    const atom = idx === -1 ? this.atomManager.add(name) : null;
    this.emitLineCol(operand.getStart());
    if (idx === -1) {
      this.emitOp(Opcode.OP_get_var);
      this.currentFunc!.byteCode.putU32(atom!);
    } else if (isClosure) {
      this.emitGetVarRef(idx, isLexical);
    } else {
      this.emitGetLoc(idx);
    }

    const operatorPos = isPrefix ? node.getStart() : node.getEnd() - 2;
    if (operatorPos !== -1) {
      this.emitLineCol(operatorPos);
    }

    const isIncrement = operator === ts.SyntaxKind.PlusPlusToken;
    if (!isPrefix && !dropResult) {
      this.emitOp(Opcode.OP_dup);
    }
    this.emitOp(isIncrement ? Opcode.OP_inc : Opcode.OP_dec);
    if (isPrefix && !dropResult) {
      this.emitOp(Opcode.OP_dup);
    }

    if (idx === -1) {
      this.emitOp(Opcode.OP_put_var);
      this.currentFunc!.byteCode.putU32(atom!);
    } else if (isClosure) {
      this.emitPutVarRef(idx, isLexical);
    } else {
      this.emitPutLoc(idx);
    }
  }

  compileThrowStatement(node: ts.ThrowStatement) {
    this.getStatementEmitter().emitThrowStatement(node);
  }

  private isTerminal(node: ts.Node): boolean {
    if (ts.isThrowStatement(node) || ts.isReturnStatement(node) || ts.isBreakStatement(node) || ts.isContinueStatement(node)) {
      return true;
    }
    if (ts.isBlock(node)) {
      return node.statements.length > 0 && this.isTerminal(node.statements[node.statements.length - 1]);
    }
    if (ts.isIfStatement(node)) {
      return this.isTerminal(node.thenStatement) && (!!node.elseStatement && this.isTerminal(node.elseStatement));
    }
    return false;
  }

  compileTryStatement(node: ts.TryStatement) {
    this.getStatementEmitter().emitTryStatement(node);
  }

  compileContinueStatement(node: ts.ContinueStatement) {
    this.getStatementEmitter().emitContinueStatement(node);
  }

  compileNumericLiteral(node: ts.NumericLiteral) {
    const val = Number(node.text);
    if (Number.isInteger(val)) {
      this.emitPushI32(val);
    } else {
      this.emitPushConst({ type: 'number', value: val });
    }
  }

  compileStringLiteral(node: ts.StringLiteral) {
    // QuickJS prefers OP_push_atom_value for string literals
    const atom = this.atomManager.add(node.text);
    this.emitOp(Opcode.OP_push_atom_value);
    this.currentFunc!.byteCode.putU32(atom);
  }

  compileArrayLiteral(node: ts.ArrayLiteralExpression) {
    node.elements.forEach(element => {
      this.compileExpression(element);
    });
    this.emitOp(Opcode.OP_array_from);
    this.currentFunc!.byteCode.putU16(node.elements.length);
  }

  compileObjectLiteral(node: ts.ObjectLiteralExpression) {
    this.emitOp(Opcode.OP_object);
    node.properties.forEach(prop => {
      if (ts.isPropertyAssignment(prop)) {
        // Value
        this.compileExpression(prop.initializer);
        
        // Key
        let name = '';
        if (ts.isIdentifier(prop.name)) {
          name = prop.name.text;
        } else if (ts.isStringLiteral(prop.name)) {
          name = prop.name.text;
        } else {
          console.warn('Unsupported property name kind');
        }
        
        const atom = this.atomManager.add(name);
        this.emitOp(Opcode.OP_define_field);
        this.currentFunc!.byteCode.putU32(atom);
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        // Shorthand: { a } -> { a: a }
        // Value (identifier)
        // QuickJS seems to skip line info for shorthand property value access
        this.compileIdentifier(prop.name, false);
        
        // Key
        const name = prop.name.text;
        const atom = this.atomManager.add(name);
        this.emitOp(Opcode.OP_define_field);
        this.currentFunc!.byteCode.putU32(atom);
      } else {
        console.warn('Unsupported object literal property kind');
      }
    });
  }

  compileThisExpression(node: ts.ThisExpression) {
    this.emitOp(Opcode.OP_push_this);
  }

  compileNullLiteral(node: ts.NullLiteral) {
    this.emitOp(Opcode.OP_null);
  }

  compileBooleanLiteral(node: ts.BooleanLiteral) {
    if (node.kind === ts.SyntaxKind.TrueKeyword) {
      this.emitOp(Opcode.OP_push_true);
    } else {
      this.emitOp(Opcode.OP_push_false);
    }
  }

  compileTemplateExpression(node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral) {
    this.emitTemplateExpression(node);
  }

  compileConditionalExpression(node: ts.ConditionalExpression) {
    this.emitConditionalExpression(node);
  }

  compilePropertyAccessExpression(node: ts.PropertyAccessExpression) {
    this.compileExpression(node.expression);
    if (ts.isPrivateIdentifier(node.name)) {
      const atom = this.getPrivateIdentifierAtom(node.name);
      this.emitLineCol(node.expression.end);
      this.emitOp(Opcode.OP_scope_get_private_field);
      this.currentFunc!.byteCode.putU32(atom);
      this.currentFunc!.byteCode.putU16(this.scopeLevel);
      return;
    }
    const name = node.name.text;
    const atom = this.atomManager.add(name);
    this.emitLineCol(node.expression.end);
    this.emitOp(Opcode.OP_get_field);
    this.currentFunc!.byteCode.putU32(atom);
  }

  compileElementAccessExpression(node: ts.ElementAccessExpression) {
    this.compileExpression(node.expression);
    if (node.argumentExpression) {
      this.compileExpression(node.argumentExpression);
    } else {
      this.emitOp(Opcode.OP_undefined);
    }
    this.emitLineCol(node.expression.end);
    this.emitOp(Opcode.OP_get_array_el);
  }

  compileCallExpression(node: ts.CallExpression, isTail: boolean = false) {
    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
      this.compileSuperCall(node);
      return;
    }
    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(args)
      const propAccess = node.expression;
      this.compileExpression(propAccess.expression); // obj
      if (ts.isPrivateIdentifier(propAccess.name)) {
        const atom = this.getPrivateIdentifierAtom(propAccess.name);
        this.emitLineCol(propAccess.expression.end);
        this.emitOp(Opcode.OP_scope_get_private_field2);
        this.currentFunc!.byteCode.putU32(atom);
        this.currentFunc!.byteCode.putU16(this.scopeLevel);
      } else {
        const name = propAccess.name.text;
        const atom = this.atomManager.add(name);
        this.emitLineCol(propAccess.expression.end);
        this.emitOp(Opcode.OP_get_field2);
        this.currentFunc!.byteCode.putU32(atom);
      }
      
      node.arguments.forEach(arg => {
        const oldInArg = this.inArgument;
        this.inArgument = true;
        this.compileExpression(arg);
        this.inArgument = oldInArg;
      });
      this.emitLineCol(propAccess.end - 1, 1);
      if (isTail) {
        this.emitOp(Opcode.OP_tail_call_method);
      } else {
        this.emitOp(Opcode.OP_call_method);
      }
      this.currentFunc!.byteCode.putU16(node.arguments.length);
    } else {
      this.compileExpression(node.expression);
      node.arguments.forEach(arg => {
        const oldInArg = this.inArgument;
        this.inArgument = true;
        this.compileExpression(arg);
        this.inArgument = oldInArg;
      });
      this.emitLineCol(node.expression.end);
      
      const argc = node.arguments.length;
      if (isTail) {
        this.emitOp(Opcode.OP_tail_call);
        this.currentFunc!.byteCode.putU16(argc);
      } else if (argc === 0) {
        this.emitOp(Opcode.OP_call0);
      } else if (argc === 1) {
        this.emitOp(Opcode.OP_call1);
      } else if (argc === 2) {
        this.emitOp(Opcode.OP_call2);
      } else if (argc === 3) {
        this.emitOp(Opcode.OP_call3);
      } else {
        this.emitOp(Opcode.OP_call);
        if (this.currentFunc) {
          this.currentFunc.byteCode.putU16(argc);
        }
      }
    }
  }

  private compileSuperCall(node: ts.CallExpression) {
    const thisActiveAtom = this.atomManager.add('this.active_func');
    this.emitOp(Opcode.OP_scope_get_var);
    this.currentFunc!.byteCode.putU32(thisActiveAtom);
    this.currentFunc!.byteCode.putU16(0);

    this.emitOp(Opcode.OP_get_super);

    const newTargetAtom = this.atomManager.add('new.target');
    this.emitOp(Opcode.OP_scope_get_var);
    this.currentFunc!.byteCode.putU32(newTargetAtom);
    this.currentFunc!.byteCode.putU16(0);

    node.arguments.forEach(arg => this.compileExpression(arg));

    this.emitOp(Opcode.OP_call_constructor);
    this.currentFunc!.byteCode.putU16(node.arguments.length);

    const thisAtom = this.atomManager.add('this');
    this.emitOp(Opcode.OP_dup);
    this.emitOp(Opcode.OP_scope_put_var_init);
    this.currentFunc!.byteCode.putU32(thisAtom);
    this.currentFunc!.byteCode.putU16(0);
  }

  compileAssignment(left: ts.Expression, right: ts.Expression) {
    const keepValue = this.shouldPreserveExpressionResult();
    if (ts.isIdentifier(left)) {
      const name = left.text;
      this.compileExpression(right, false, name);
      this.storeIdentifierValue(name, keepValue);
      if (!keepValue) {
        this.suppressCurrentExpressionDrop();
      }
      return;
    } else if (ts.isPropertyAccessExpression(left)) {
      this.compileExpression(left.expression);
      this.compileExpression(right);
      this.emitOp(Opcode.OP_dup);
      this.emitOp(Opcode.OP_perm3);
      if (ts.isPrivateIdentifier(left.name)) {
        const atom = this.getPrivateIdentifierAtom(left.name);
        this.emitOp(Opcode.OP_scope_put_private_field);
        this.currentFunc!.byteCode.putU32(atom);
        this.currentFunc!.byteCode.putU16(this.scopeLevel);
      } else {
        const name = left.name.text;
        const atom = this.atomManager.add(name);
        this.emitOp(Opcode.OP_put_field);
        this.currentFunc!.byteCode.putU32(atom);
      }
    } else {
      console.warn("Unsupported assignment target");
    }
  }

  private compilePropertyCompoundAssignment(
    node: ts.BinaryExpression,
    left: ts.PropertyAccessExpression,
    opcode: Opcode,
    keepValue: boolean,
  ) {
    const debugCompound = process.env.DEBUG_COMPOUND === '1';
    if (debugCompound) {
      console.warn('[compound] property target:', ts.SyntaxKind[left.expression.kind]);
    }
    const operatorPos = node.operatorToken.getStart();
    const receiver = left.expression;
    const isPrivate = ts.isPrivateIdentifier(left.name);
    const atom = isPrivate
      ? this.getPrivateIdentifierAtom(left.name as ts.PrivateIdentifier)
      : this.atomManager.add(left.name.text);

    this.compileExpression(receiver);
    if (debugCompound) {
      console.warn('[compound] emitted receiver expression');
    }
    this.emitOp(Opcode.OP_dup);
    if (debugCompound) {
      console.warn('[compound] dup receiver');
    }

    this.emitLineCol(receiver.end);
    if (isPrivate) {
      this.emitOp(Opcode.OP_scope_get_private_field);
      this.currentFunc!.byteCode.putU32(atom);
      this.currentFunc!.byteCode.putU16(this.scopeLevel);
    } else {
      this.emitOp(Opcode.OP_get_field);
      this.currentFunc!.byteCode.putU32(atom);
    }
    if (debugCompound) {
      console.warn('[compound] loaded current property value');
    }

    this.compileExpression(node.right);
    if (debugCompound) {
      console.warn('[compound] compiled RHS expression');
    }
    this.emitLineCol(operatorPos);
    this.emitOp(opcode);
    if (debugCompound) {
      console.warn('[compound] applied opcode', Opcode[opcode]);
    }

    if (keepValue) {
      this.emitOp(Opcode.OP_dup);
      this.emitOp(Opcode.OP_perm3);
      if (debugCompound) {
        console.warn('[compound] preserved result for expression value');
      }
    } else {
      this.suppressCurrentExpressionDrop();
      if (debugCompound) {
        console.warn('[compound] result drop suppressed');
      }
    }

    if (isPrivate) {
      this.emitOp(Opcode.OP_scope_put_private_field);
      this.currentFunc!.byteCode.putU32(atom);
      this.currentFunc!.byteCode.putU16(this.scopeLevel);
    } else {
      this.emitOp(Opcode.OP_put_field);
      this.currentFunc!.byteCode.putU32(atom);
    }
    if (debugCompound) {
      console.warn('[compound] stored result back to property');
    }
  }

  private compileElementCompoundAssignment(
    node: ts.BinaryExpression,
    left: ts.ElementAccessExpression,
    opcode: Opcode,
    keepValue: boolean,
  ) {
    this.compileExpression(left.expression);
    if (left.argumentExpression) {
      this.compileExpression(left.argumentExpression);
    } else {
      this.emitOp(Opcode.OP_undefined);
    }

    this.emitOp(Opcode.OP_dup2);
    this.emitLineCol(left.expression.end);
    this.emitOp(Opcode.OP_get_array_el);

    this.compileExpression(node.right);
    this.emitLineCol(node.operatorToken.getStart());
    this.emitOp(opcode);

    if (keepValue) {
      this.emitOp(Opcode.OP_insert3);
    } else {
      this.suppressCurrentExpressionDrop();
    }

    this.emitOp(Opcode.OP_put_array_el);
  }

  private storeIdentifierValue(name: string, keepValue: boolean = true) {
    const duplicateIfNeeded = () => {
      if (keepValue) {
        this.emitOp(Opcode.OP_dup);
      }
    };

    if (this.currentFunc) {
      const atom = this.atomManager.get(name);
      if (atom !== JS_ATOM_NULL) {
        const argIdx = this.currentFunc.args.findIndex(arg => arg.varName === atom);
        if (argIdx !== -1) {
          if (keepValue) {
            this.emitSetArg(argIdx);
          } else {
            this.emitPutArg(argIdx);
          }
          return;
        }
      }

      const localIdx = this.findLocalVar(name);
      if (localIdx !== -1) {
        if (keepValue) {
          this.emitSetLoc(localIdx);
        } else {
          this.emitPutLoc(localIdx);
        }
        return;
      }
    }

    const closureIdx = this.findClosureVar(name);
    if (closureIdx !== -1) {
      const cv = this.currentFunc!.closureVar[closureIdx];
      if (!cv.isLexical) {
        if (keepValue) {
          this.emitSetVarRef(closureIdx);
        } else {
          this.emitPutVarRef(closureIdx);
        }
        return;
      }
      duplicateIfNeeded();
      this.emitPutVarRef(closureIdx, true);
      return;
    }

    duplicateIfNeeded();
    const atom = this.atomManager.add(name);
    this.emitOp(Opcode.OP_put_var);
    this.currentFunc!.byteCode.putU32(atom);
  }

  compileBinaryExpression(node: ts.BinaryExpression) {
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      this.compileAssignment(node.left, node.right);
      return;
    }

    const compoundOpcode = this.getCompoundAssignmentOpcode(node.operatorToken.kind);
    if (compoundOpcode !== null) {
      this.compileCompoundAssignment(node, compoundOpcode);
      return;
    }

    if (
      node.operatorToken.kind === ts.SyntaxKind.InKeyword &&
      ts.isPrivateIdentifier(node.left)
    ) {
      this.compileExpression(node.right);
      const atom = this.getPrivateIdentifierAtom(node.left as ts.PrivateIdentifier);
      this.emitLineCol(node.operatorToken.getStart());
      this.emitOp(Opcode.OP_scope_in_private_field);
      this.currentFunc!.byteCode.putU32(atom);
      this.currentFunc!.byteCode.putU16(this.scopeLevel);
      return;
    }

    if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      const endLabel = this.newLabel();
      this.compileExpression(node.left);
      this.emitOp(Opcode.OP_dup);
      this.emitJump8(Opcode.OP_if_false8, endLabel);
      this.emitOp(Opcode.OP_drop);
      this.compileExpression(node.right);
      this.emitLabel(endLabel);
      return;
    }

    if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      const endLabel = this.newLabel();
      this.compileExpression(node.left);
      this.emitOp(Opcode.OP_dup);
      this.emitJump8(Opcode.OP_if_true8, endLabel);
      this.emitOp(Opcode.OP_drop);
      this.compileExpression(node.right);
      this.emitLabel(endLabel);
      return;
    }

    const isArithmetic = [
      ts.SyntaxKind.PlusToken,
      ts.SyntaxKind.MinusToken,
      ts.SyntaxKind.AsteriskToken,
      ts.SyntaxKind.SlashToken,
      ts.SyntaxKind.PercentToken,
      ts.SyntaxKind.AsteriskAsteriskToken,
      ts.SyntaxKind.AmpersandToken,
      ts.SyntaxKind.BarToken,
      ts.SyntaxKind.CaretToken,
      ts.SyntaxKind.LessThanLessThanToken,
      ts.SyntaxKind.GreaterThanGreaterThanToken,
      ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken
    ].includes(node.operatorToken.kind);

    const isComparison = [
      ts.SyntaxKind.LessThanToken,
      ts.SyntaxKind.GreaterThanToken,
      ts.SyntaxKind.LessThanEqualsToken,
      ts.SyntaxKind.GreaterThanEqualsToken,
      ts.SyntaxKind.EqualsEqualsToken,
      ts.SyntaxKind.ExclamationEqualsToken,
      ts.SyntaxKind.EqualsEqualsEqualsToken,
      ts.SyntaxKind.ExclamationEqualsEqualsToken
    ].includes(node.operatorToken.kind);

    let useArithmeticLogic = isArithmetic;
    if (isComparison) {
       // QuickJS quirk: comparison in while/for loop condition behaves differently
       if (node.parent && (ts.isWhileStatement(node.parent) || ts.isForStatement(node.parent))) {
         useArithmeticLogic = false;
       } else {
         useArithmeticLogic = true;
       }
    }

    if (useArithmeticLogic) {
      // console.log('Arithmetic op:', ts.SyntaxKind[node.operatorToken.kind], 'suppress:', this.suppressLineInfo);
      this.compileExpression(node.left);
      this.compileExpression(node.right);
      this.emitLineCol(node.operatorToken.getStart());
    } else {
      this.compileExpression(node.left);
      this.compileExpression(node.right);
      this.emitLineCol(node.operatorToken.getStart());
    }

    switch (node.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        this.emitOp(Opcode.OP_add);
        break;
      case ts.SyntaxKind.MinusToken:
        this.emitOp(Opcode.OP_sub);
        break;
      case ts.SyntaxKind.AsteriskToken:
        this.emitOp(Opcode.OP_mul);
        break;
      case ts.SyntaxKind.SlashToken:
        this.emitOp(Opcode.OP_div);
        break;
      case ts.SyntaxKind.PercentToken:
        this.emitOp(Opcode.OP_mod);
        break;
      case ts.SyntaxKind.LessThanToken:
        this.emitOp(Opcode.OP_lt);
        break;
      case ts.SyntaxKind.GreaterThanToken:
        this.emitOp(Opcode.OP_gt);
        break;
      case ts.SyntaxKind.LessThanEqualsToken:
        this.emitOp(Opcode.OP_lte);
        break;
      case ts.SyntaxKind.GreaterThanEqualsToken:
        this.emitOp(Opcode.OP_gte);
        break;
      case ts.SyntaxKind.EqualsEqualsToken:
        this.emitOp(Opcode.OP_eq);
        break;
      case ts.SyntaxKind.ExclamationEqualsToken:
        this.emitOp(Opcode.OP_neq);
        break;
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        this.emitOp(Opcode.OP_strict_eq);
        break;
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        this.emitOp(Opcode.OP_strict_neq);
        break;
      // Bitwise
      case ts.SyntaxKind.AmpersandToken:
        this.emitOp(Opcode.OP_and);
        break;
      case ts.SyntaxKind.BarToken:
        this.emitOp(Opcode.OP_or);
        break;
      case ts.SyntaxKind.CaretToken:
        this.emitOp(Opcode.OP_xor);
        break;
      case ts.SyntaxKind.LessThanLessThanToken:
        this.emitOp(Opcode.OP_shl);
        break;
      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        this.emitOp(Opcode.OP_sar);
        break;
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        this.emitOp(Opcode.OP_shr);
        break;
      case ts.SyntaxKind.AsteriskAsteriskToken:
        this.emitOp(Opcode.OP_pow);
        break;
      case ts.SyntaxKind.InstanceOfKeyword:
        this.emitOp(Opcode.OP_instanceof);
        break;
      case ts.SyntaxKind.InKeyword:
        this.emitOp(Opcode.OP_in);
        break;
      default:
        console.warn(`Unsupported operator: ${ts.SyntaxKind[node.operatorToken.kind]}`);
    }
  }

  private getCompoundAssignmentOpcode(kind: ts.SyntaxKind): Opcode | null {
    switch (kind) {
      case ts.SyntaxKind.PlusEqualsToken:
        return Opcode.OP_add;
      case ts.SyntaxKind.MinusEqualsToken:
        return Opcode.OP_sub;
      case ts.SyntaxKind.AsteriskEqualsToken:
        return Opcode.OP_mul;
      case ts.SyntaxKind.SlashEqualsToken:
        return Opcode.OP_div;
      case ts.SyntaxKind.PercentEqualsToken:
        return Opcode.OP_mod;
      case ts.SyntaxKind.LessThanLessThanEqualsToken:
        return Opcode.OP_shl;
      case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
        return Opcode.OP_sar;
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
        return Opcode.OP_shr;
      case ts.SyntaxKind.AmpersandEqualsToken:
        return Opcode.OP_and;
      case ts.SyntaxKind.BarEqualsToken:
        return Opcode.OP_or;
      case ts.SyntaxKind.CaretEqualsToken:
        return Opcode.OP_xor;
      default:
        return null;
    }
  }

  private compileCompoundAssignment(node: ts.BinaryExpression, opcode: Opcode) {
    const keepValue = this.shouldPreserveExpressionResult();
    const left = node.left;
    if (ts.isIdentifier(left)) {
      this.compileIdentifier(left);
      this.compileExpression(node.right);
      this.emitLineCol(node.operatorToken.getStart());
      this.emitOp(opcode);
      this.storeIdentifierValue(left.text, keepValue);
      if (!keepValue) {
        this.suppressCurrentExpressionDrop();
      }
      return;
    }

    if (ts.isPropertyAccessExpression(left)) {
      this.compilePropertyCompoundAssignment(node, left, opcode, keepValue);
      return;
    }

    if (ts.isElementAccessExpression(left)) {
      this.compileElementCompoundAssignment(node, left, opcode, keepValue);
      return;
    }

    console.warn(`Unsupported compound assignment target: ${ts.SyntaxKind[left.kind]}`);
  }

  findVarInFunction(func: JSFunctionDef, name: string): { type: 'local' | 'arg' | 'closure', idx: number } | null {
    const atom = this.atomManager.get(name);
    if (atom === JS_ATOM_NULL) return null;

    // Check args
    let idx = func.args.findIndex(arg => arg.varName === atom);
    if (idx !== -1) return { type: 'arg', idx };

    // Check locals
    idx = func.vars.findIndex(v => v.varName === atom);
    if (idx !== -1) return { type: 'local', idx };

    // Check closures
    idx = func.closureVar.findIndex(cv => cv.varName === atom);
    if (idx !== -1) return { type: 'closure', idx };

    return null;
  }

  resolveVarInFunc(func: JSFunctionDef, name: string): boolean {
    if (this.findVarInFunction(func, name)) return true;

    if (func.parent) {
      if (this.resolveVarInFunc(func.parent, name)) {
        const found = this.findVarInFunction(func.parent, name)!;
        
        let isLocal = false;
        let isArg = false;
        let isConst = false;
        let isLexical = true;
        let varIdx = found.idx;

        if (found.type === 'local') {
          isLocal = true;
          const v = func.parent.vars[found.idx];
          isConst = v.isConst;
          isLexical = v.isLexical;
          v.isCaptured = true;
        } else if (found.type === 'arg') {
          isArg = true;
          isLocal = true;
          isLexical = false;
          func.parent.args[found.idx].isCaptured = true;
        } else if (found.type === 'closure') {
          const cv = func.parent.closureVar[found.idx];
          isConst = cv.isConst;
          isLexical = cv.isLexical;
          varIdx = found.idx;
        }

        // Add to current func closures
        const atom = this.atomManager.add(name);
        // Check if already exists (should not happen if findVarInFunction returned false)
        let idx = func.closureVar.findIndex(v => v.varName === atom);
        if (idx === -1) {
          idx = func.closureVar.length;
          func.closureVar.push({
            isLocal: isLocal,
            isArg: isArg,
            isConst: isConst,
            isLexical: isLexical,
            varKind: JSVarKind.JS_VAR_NORMAL,
            varIdx: varIdx,
            varName: atom
          });
        }
        return true;
      }
    }
    return false;
  }

  compileIdentifier(node: ts.Identifier, emitLineInfo: boolean = true) {
    const name = node.text;
    
    if (this.currentFunc) {
      // Check args
      const atom = this.atomManager.get(name);
      if (atom !== JS_ATOM_NULL) {
        const argIdx = this.currentFunc.args.findIndex(arg => arg.varName === atom);
        if (argIdx !== -1) {
          if (this.tryReusePendingStore('arg', argIdx)) {
            return;
          }
          if (emitLineInfo && !this.suppressLineInfo) {
            this.emitLineCol(node.getStart());
          }
          this.emitGetArg(argIdx);
          return;
        }
      }

      // Check locals
      const localIdx = this.findLocalVar(name);
      if (localIdx !== -1) {
        const moduleSlotIdx = this.moduleTopLevelSlots?.get(name);
        const existingClosureIdx = this.findClosureVar(name);
        const preferClosure =
          moduleSlotIdx !== undefined && moduleSlotIdx === localIdx && existingClosureIdx !== -1;
        if (preferClosure) {
          this.emitClosureLoad(existingClosureIdx, node, emitLineInfo);
          return;
        }
        const v = this.currentFunc.vars[localIdx];
        if (!v.isConst && this.tryReusePendingStore('loc', localIdx)) {
          return;
        }
        if (emitLineInfo && !this.suppressLineInfo) {
          this.emitLineCol(node.getStart());
        }
        this.emitGetLoc(localIdx, v.isConst);
        return;
      }
    }

    // Try to resolve in parent scopes
    if (this.currentFunc) {
      this.resolveVarInFunc(this.currentFunc, name);
    }

    const idx = this.findClosureVar(name);
    if (idx !== -1) {
      this.emitClosureLoad(idx, node, emitLineInfo);
    } else {
      // Assume global variable
      if (emitLineInfo && !this.suppressLineInfo) {
        this.emitLineCol(node.getStart());
      }
      const atom = this.atomManager.add(name);
      this.emitOp(Opcode.OP_get_var);
      if (this.currentFunc) {
        this.currentFunc.byteCode.putU32(atom);
      }
    }
  }

  private emitClosureLoad(idx: number, node: ts.Identifier, emitLineInfo: boolean) {
    if (!this.currentFunc)
      return;
    const cv = this.currentFunc.closureVar[idx];
    if (!cv.isLexical && this.tryReusePendingStore('varRef', idx)) {
      return;
    }
    if (emitLineInfo && !this.suppressLineInfo) {
      this.emitLineCol(node.getStart());
    }
    this.emitGetVarRef(idx, cv.isLexical);
  }

  emitGetArg(idx: number) {
    if (!this.currentFunc) return;
    
    if (idx === 0) {
      this.emitOp(Opcode.OP_get_arg0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_get_arg1);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_get_arg2);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_get_arg3);
    } else {
      this.emitOp(Opcode.OP_get_arg);
      this.currentFunc.byteCode.putU16(idx);
    }
  }

  findClosureVar(name: string): number {
    if (!this.currentFunc) return -1;
    const atom = this.atomManager.get(name);
    if (atom === JS_ATOM_NULL) return -1;
    const idx = this.currentFunc.closureVar.findIndex(cv => cv.varName === atom);
    return idx;
  }

  findLocalVar(name: string): number {
    if (!this.currentFunc) return -1;
    const atom = this.atomManager.get(name);
    if (atom === JS_ATOM_NULL) return -1;
    return this.currentFunc.vars.findIndex(v => v.varName === atom);
  }

  emitGetVarRef(idx: number, check: boolean = false) {
    if (!this.currentFunc) return;
    
    if (check) {
      this.emitOp(Opcode.OP_get_var_ref_check);
      this.currentFunc.byteCode.putU16(idx);
      this.currentFunc.lastOpArgs = [idx];
      return;
    }

    if (idx === 0) {
      this.emitOp(Opcode.OP_get_var_ref0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_get_var_ref1);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_get_var_ref2);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_get_var_ref3);
    } else {
      this.emitOp(Opcode.OP_get_var_ref);
      this.currentFunc.byteCode.putU16(idx);
    }
    this.currentFunc.lastOpArgs = [idx];
  }

  newLabel(): PendingLabel {
    return this.labelManager.createLabel();
  }

  emitLabel(label: PendingLabel) {
    this.labelManager.markLabel(label);
  }

  emitJump(op: Opcode, label: PendingLabel) {
    if (!this.currentFunc) return;
    this.emitOp(op);
    this.labelManager.emitJumpDisplacement(label, 'long');
  }

  emitJump8(op: Opcode, label: PendingLabel) {
    if (!this.currentFunc) return;
    this.emitOp(op);
    this.labelManager.emitJumpDisplacement(label, 'short');
  }

  emitPushConst(val: JSValue) {
    if (!this.currentFunc) return;

    if (typeof val === 'string') {
      if (val === '') {
        this.emitOp(Opcode.OP_push_empty_string);
        return;
      }
      const atom = this.atomManager.add(val);
      this.emitOp(Opcode.OP_push_atom_value);
      this.currentFunc.byteCode.putU32(atom);
      return;
    }

    const idx = this.currentFunc.cpool.length;
    this.currentFunc.cpool.push(val);
    if (idx < 256) {
      this.emitOp(Opcode.OP_push_const8);
      this.currentFunc.byteCode.putU8(idx);
    } else {
      this.emitOp(Opcode.OP_push_const);
      this.currentFunc.byteCode.putU32(idx);
    }
  }

  // Emit helpers
  emitOp(op: Opcode) {
    if (!this.currentFunc) return;
    this.pendingStore = null;
    const isStoreOpcode = this.isStoreLikeOpcode(op);
    const flushPendingLineInfo = () => {
      while (this.currentFunc && this.currentFunc.hasPendingLineInfo) {
        if (this.currentFunc.pendingLineNeedsStorePc && !isStoreOpcode) {
          // Defer until we see the matching store opcode.
          break;
        }
        if (this.currentFunc.pendingLineNeedsStorePc && isStoreOpcode) {
          this.currentFunc.pendingLinePcOverride = this.currentFunc.byteCode.size;
        }
        this.flushLineCol();
      }
    };

    flushPendingLineInfo();
    const nextPc = this.currentFunc.byteCode.size;
    this.currentFunc.lastOpPc = nextPc;
    this.currentFunc.byteCode.putU8(op);
    this.currentFunc.lastOp = op;
    this.currentFunc.lastOpArgs = [];
    if (isStoreOpcode) {
      this.currentFunc.lastStorePc = nextPc;
    }
  }

  private recordPendingStore(kind: PendingStoreKind, index: number, opcode: Opcode, operandSize: number) {
    if (!this.currentFunc) return;
    const setOpcode = PUT_TO_SET_OPCODE[opcode];
    if (!setOpcode) {
      this.pendingStore = null;
      return;
    }
    const writer = this.currentFunc.byteCode;
    const opcodeOffset = writer.size - (operandSize + 1);
    this.pendingStore = { kind, index, opcodeOffset, setOpcode };
  }

  private tryReusePendingStore(kind: PendingStoreKind, index: number): boolean {
    if (!this.currentFunc || !this.pendingStore) {
      return false;
    }
    const pending = this.pendingStore;
    if (pending.kind !== kind || pending.index !== index) {
      return false;
    }
    this.currentFunc.byteCode.patchU8(pending.opcodeOffset, pending.setOpcode);
    this.currentFunc.lastOp = pending.setOpcode;
    this.pendingStore = null;
    return true;
  }

  emitPushI32(val: number) {
    if (!this.currentFunc) return;
    
    if (val === -1) {
      this.emitOp(Opcode.OP_push_minus1);
    } else if (val === 0) {
      this.emitOp(Opcode.OP_push_0);
    } else if (val === 1) {
      this.emitOp(Opcode.OP_push_1);
    } else if (val === 2) {
      this.emitOp(Opcode.OP_push_2);
    } else if (val === 3) {
      this.emitOp(Opcode.OP_push_3);
    } else if (val === 4) {
      this.emitOp(Opcode.OP_push_4);
    } else if (val === 5) {
      this.emitOp(Opcode.OP_push_5);
    } else if (val === 6) {
      this.emitOp(Opcode.OP_push_6);
    } else if (val === 7) {
      this.emitOp(Opcode.OP_push_7);
    } else if (val >= -128 && val <= 127) {
      this.emitOp(Opcode.OP_push_i8);
      this.currentFunc.byteCode.putU8(val);
    } else {
      this.emitOp(Opcode.OP_push_i32);
      this.currentFunc.byteCode.putU32(val);
    }
  }

  private getPendingLineQueue(func: JSFunctionDef): PendingLineEntry[] {
    let queue = this.pendingLineQueues.get(func);
    if (!queue) {
      queue = [];
      this.pendingLineQueues.set(func, queue);
    }
    return queue;
  }

  private applyPendingLineEntry(func: JSFunctionDef, entry: PendingLineEntry) {
    func.pendingLineNum = entry.line;
    func.pendingColumnNum = entry.column;
    func.pendingSourcePos = entry.sourcePos;
    func.pendingLinePcOverride = entry.pcOverride;
    func.pendingLineNeedsStorePc = entry.deferUntilStore;
    func.hasPendingLineInfo = true;
  }

  private enqueuePendingLineInfo(func: JSFunctionDef, entry: PendingLineEntry) {
    if (!func.hasPendingLineInfo) {
      this.applyPendingLineEntry(func, entry);
    } else {
      this.getPendingLineQueue(func).push(entry);
    }
  }

  private promoteNextPendingLine(func: JSFunctionDef) {
    const queue = this.pendingLineQueues.get(func);
    if (!queue || queue.length === 0) {
      func.pendingLineNeedsStorePc = false;
      func.pendingLinePcOverride = null;
      func.hasPendingLineInfo = false;
      if (queue) {
        this.pendingLineQueues.delete(func);
      }
      return;
    }
    const next = queue.shift()!;
    if (queue.length === 0) {
      this.pendingLineQueues.delete(func);
    }
    this.applyPendingLineEntry(func, next);
  }

  emitLineCol(
    pos: number,
    colOffset: number = 0,
    options?: { alignToLastOp?: boolean; deferUntilStore?: boolean },
  ) {
    if (this.suppressLineInfo) return;
    if (this.sourceFile && this.currentFunc) {
      const info = this.getSourcePositionInfo(pos, colOffset);
      const pcOverride =
        options?.alignToLastOp && this.currentFunc.lastOpPc >= 0
          ? this.currentFunc.lastOpPc
          : null;
      const entry: PendingLineEntry = {
        line: info.line,
        column: info.column,
        sourcePos: info.sourcePos,
        pcOverride,
        deferUntilStore: options?.deferUntilStore ?? false,
      };
      this.enqueuePendingLineInfo(this.currentFunc, entry);
    }
  }

  private getSourcePositionInfo(pos: number, colOffset: number = 0) {
    if (this.sourceFile) {
      const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(pos);
      return {
        line: line + 1,
        column: Math.max(1, character + 1 + colOffset),
        sourcePos: pos,
      };
    }
    return {
      line: 1,
      column: Math.max(1, 1 + colOffset),
      sourcePos: pos,
    };
  }


  private isStoreLikeOpcode(op?: Opcode): boolean {
    switch (op) {
      case Opcode.OP_put_arg0:
      case Opcode.OP_put_arg1:
      case Opcode.OP_put_arg2:
      case Opcode.OP_put_arg3:
      case Opcode.OP_put_arg:
      case Opcode.OP_set_arg0:
      case Opcode.OP_set_arg1:
      case Opcode.OP_set_arg2:
      case Opcode.OP_set_arg3:
      case Opcode.OP_set_arg:
      case Opcode.OP_put_loc0:
      case Opcode.OP_put_loc1:
      case Opcode.OP_put_loc2:
      case Opcode.OP_put_loc3:
      case Opcode.OP_put_loc8:
      case Opcode.OP_put_loc:
      case Opcode.OP_set_loc0:
      case Opcode.OP_set_loc1:
      case Opcode.OP_set_loc2:
      case Opcode.OP_set_loc3:
      case Opcode.OP_set_loc8:
      case Opcode.OP_set_loc:
      case Opcode.OP_put_var_ref0:
      case Opcode.OP_put_var_ref1:
      case Opcode.OP_put_var_ref2:
      case Opcode.OP_put_var_ref3:
      case Opcode.OP_put_var_ref:
      case Opcode.OP_set_var_ref0:
      case Opcode.OP_set_var_ref1:
      case Opcode.OP_set_var_ref2:
      case Opcode.OP_set_var_ref3:
      case Opcode.OP_set_var_ref:
      case Opcode.OP_put_var:
      case Opcode.OP_put_field:
      case Opcode.OP_put_array_el:
        return true;
      default:
        return false;
    }
  }

  private isAssignmentLikeExpression(node: ts.Expression): boolean {
    if (ts.isBinaryExpression(node)) {
      return this.isAssignmentOperator(node.operatorToken.kind);
    }
    if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
      return (
        node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken
      );
    }
    return false;
  }

  private isAssignmentOperator(kind: ts.SyntaxKind): boolean {
    switch (kind) {
      case ts.SyntaxKind.EqualsToken:
      case ts.SyntaxKind.PlusEqualsToken:
      case ts.SyntaxKind.MinusEqualsToken:
      case ts.SyntaxKind.AsteriskEqualsToken:
      case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
      case ts.SyntaxKind.SlashEqualsToken:
      case ts.SyntaxKind.PercentEqualsToken:
      case ts.SyntaxKind.LessThanLessThanEqualsToken:
      case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
      case ts.SyntaxKind.AmpersandEqualsToken:
      case ts.SyntaxKind.BarEqualsToken:
      case ts.SyntaxKind.CaretEqualsToken:
      case ts.SyntaxKind.BarBarEqualsToken:
      case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
      case ts.SyntaxKind.QuestionQuestionEqualsToken:
        return true;
      default:
        return false;
    }
  }

  private getProgramPlan(): SourceElementRecord[] | null {
    if (!this.parseState || !this.sourceFile) return null;
    if (!this.programBuilder) {
      this.programBuilder = new ProgramBuilder(this.parseState, this.sourceFile);
    }
    if (!this.programPlan) {
      this.programPlan = this.programBuilder.buildProgramPlan();
    }
    return this.programPlan;
  }

  private flushLineCol() {
    const func = this.currentFunc;
    if (!func || !func.hasPendingLineInfo) return;
    const pc = func.pendingLinePcOverride ?? func.byteCode.size;
    const lineNum = func.pendingLineNum;
    const columnNum = func.pendingColumnNum;
    const sourcePos = func.pendingSourcePos;

    if (!func.lineNumberSlots) {
      func.lineNumberSlots = [];
    }

    const slots = func.lineNumberSlots;
    const lastSlot = slots[slots.length - 1];
    if (lastSlot && lastSlot.pc === pc) {
      lastSlot.sourcePos = sourcePos;
      lastSlot.line = lineNum;
      lastSlot.column = columnNum;
      this.promoteNextPendingLine(func);
      return;
    }

    slots.push({ pc, sourcePos, line: lineNum, column: columnNum });
    this.promoteNextPendingLine(func);
  }

  compileForOfStatement(node: ts.ForOfStatement, labelName?: string) {
    this.enterScope();
    // Declare variable if needed
    if (ts.isVariableDeclarationList(node.initializer)) {
        const decl = node.initializer.declarations[0];
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text;
        let idx = this.findLocalVar(name);
        if (idx === -1) {
          idx = this.addLocalVar(name, (node.initializer.flags & ts.NodeFlags.Const) !== 0);
        }
        this.emitOp(Opcode.OP_set_loc_uninitialized);
        this.currentFunc!.byteCode.putU16(idx);
      }
    }

    // 1. Compile expression
    this.compileExpression(node.expression);
    
    // 2. Start
    this.emitOp(Opcode.OP_for_of_start);
    
    const labelNext = this.newLabel();
    const labelBody = this.newLabel();
    const labelBreak = this.newLabel();
    
  this.pushLoopBlock({ breakLabel: labelBreak, continueLabel: labelNext, hasIterator: true, dropCount: 3, labelName });

    this.emitJump8(Opcode.OP_goto8, labelNext);
    
    // 3. Body
    this.emitLabel(labelBody);
    
    // Assign to variable
    if (ts.isVariableDeclarationList(node.initializer)) {
      const decl = node.initializer.declarations[0];
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text;
        const idx = this.findLocalVar(name);
        // Match QuickJS: Attribute put_loc to the iterable expression (e.g. 'arr')
        this.emitLineCol(node.expression.getStart());
        this.emitPutLoc(idx);
      }
    } else {
      // Expression assignment
      console.warn('ForOf expression assignment not implemented');
      this.emitOp(Opcode.OP_drop);
    }
    
    this.compileStatement(node.statement);
    
    // 4. Next
    this.emitLabel(labelNext);
    // this.emitLineCol(node.statement.end - 1);
    this.emitOp(Opcode.OP_for_of_next);
    this.currentFunc!.byteCode.putU8(0);
    
    this.emitJump8(Opcode.OP_if_false8, labelBody);
    // QuickJS drops the undefined value that remains on the stack when
    // for_of_next indicates completion before closing the iterator.
    this.emitOp(Opcode.OP_drop);
    
    // 5. Exit
  this.emitOp(Opcode.OP_iterator_close);
    
    this.emitLabel(labelBreak);
    this.popBlock();
    this.leaveScope();
  }

  compileParenthesizedExpression(node: ts.ParenthesizedExpression, isTail: boolean = false) {
    this.compileExpression(node.expression, isTail);
  }

  compileVoidExpression(node: ts.VoidExpression) {
    this.compileExpression(node.expression);
    this.emitOp(Opcode.OP_drop);
    if (!ts.isExpressionStatement(node.parent)) {
      this.emitOp(Opcode.OP_undefined);
    }
  }

  compileArrowFunction(node: ts.ArrowFunction, nameHint?: string) {
    const parentFunc = this.currentFunc;
    const funcDef = new JSFunctionDef(this.ctx, parentFunc);
    if (nameHint) {
      funcDef.funcName = this.atomManager.add(nameHint);
    }
    funcDef.filename = parentFunc!.filename;
    funcDef.jsMode = JSMode.JS_MODE_STRICT;
    funcDef.hasPrototype = false;
    funcDef.hasSimpleParameterList = true;
    funcDef.newTargetAllowed = false;
    funcDef.argumentsAllowed = true;
    
    const startPos = node.getStart(this.sourceFile ?? undefined);
    this.initializeFunctionDebugInfo(funcDef, startPos);

    // Switch context
    this.currentFunc = funcDef;
    this.syncScopeLevel();

    // Set args
    node.parameters.forEach((param) => {
      if (ts.isIdentifier(param.name)) {
        this.addArg(param.name.text);
      }
    });
    
    // Compile body
    if (ts.isBlock(node.body)) {
      this.compileBlock(node.body);
    } else {
        // Expression body: () => expr
      this.compileExpression(node.body, true);
      if (!this.isReturnOp(this.currentFunc!.lastOp)) {
        this.emitOp(Opcode.OP_return);
      }
    }
    
    // Add implicit return if needed
    const lastOp = this.currentFunc.lastOp;
    if (!this.isReturnOp(lastOp)) {
      this.emitOp(Opcode.OP_undefined);
      this.emitOp(Opcode.OP_return);
    }
    
    // Restore context
    this.currentFunc = parentFunc;
    this.syncScopeLevel();
    
    // Add to parent cpool
    const funcIdx = parentFunc!.cpool.push({
      type: 'function',
      value: funcDef
    }) - 1;
    
    this.emitOp(Opcode.OP_fclosure8);
    this.currentFunc!.byteCode.putU8(funcIdx);
  }

  compileFunctionExpression(node: ts.FunctionExpression, nameHint?: string) {
    const parentFunc = this.currentFunc;
    const funcDef = new JSFunctionDef(this.ctx, parentFunc);
    if (node.name) {
      funcDef.funcName = this.atomManager.add(node.name.text);
    } else if (nameHint) {
      funcDef.funcName = this.atomManager.add(nameHint);
    }
    funcDef.filename = parentFunc!.filename;
    funcDef.jsMode = JSMode.JS_MODE_STRICT;
    funcDef.hasPrototype = true;
    funcDef.hasSimpleParameterList = true;
    funcDef.newTargetAllowed = true;
    funcDef.argumentsAllowed = true;
    
    this.initializeFunctionDebugInfo(funcDef, node.getStart(this.sourceFile ?? undefined));

    // Switch context
    this.currentFunc = funcDef;
    this.syncScopeLevel();
    
    // Set args
    node.parameters.forEach((param) => {
      if (ts.isIdentifier(param.name)) {
        this.addArg(param.name.text);
      }
    });
    
    // Compile body
    this.compileBlock(node.body)
    
    // Add implicit return if needed
    const lastOp = this.currentFunc.lastOp
    if (!this.isReturnOp(lastOp)) {
      this.emitOp(Opcode.OP_undefined)
      this.emitOp(Opcode.OP_return)
    }
    
    // Restore context
    this.currentFunc = parentFunc;
    this.syncScopeLevel();
    
    // Add to parent cpool
    const funcIdx = parentFunc!.cpool.push({
      type: 'function',
      value: funcDef
    }) - 1
    
    this.emitOp(Opcode.OP_fclosure8)
    this.currentFunc!.byteCode.putU8(funcIdx)
  }

  compileNewExpression(node: ts.NewExpression) {
    this.compileExpression(node.expression);
    // QuickJS duplicates the constructor before evaluating arguments so the
    // duplicated value serves as new.target for OP_call_constructor.
    this.emitOp(Opcode.OP_dup);
    
    const args = node.arguments || [];
    args.forEach(arg => this.compileExpression(arg));
    
    this.emitOp(Opcode.OP_call_constructor);
    this.currentFunc!.byteCode.putU16(args.length);
  }
}

