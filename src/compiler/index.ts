import * as ts from 'typescript';
import * as fs from 'fs/promises';
import { AtomManager, JSAtom, JS_ATOM_NULL } from '../atom';
import { JSFunctionDef, JSValue, JSVarKind } from '../functionDef';
import { BytecodeWriter } from '../bytecode';
import { Opcode, JSMode, PC2Line, FunctionKind } from '../env';
import { ParseState } from './parseState';
import { ProgramBuilder, SourceElementRecord } from './programBuilder';
import { LabelManager, PendingLabel } from './labelManager';
import { ScopeManager, BlockKind, BlockEnv } from './scopeManager';
import { StatementEmitter } from './statementEmitter';
import { ExpressionEmitter } from './expressionEmitter';

import { BytecodeSerializer } from '../serializer';

export interface CompilerOptions {
  bigInt?: boolean;
  dump?: boolean;
  shortCode?: boolean;
  debug?: boolean;
  strictMode?: boolean;
  referenceJsSource?: string;
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

  suppressLineInfo: boolean = false;
  inArgument: boolean = false;

  constructor(options: CompilerOptions = {}) {
    // console.log('Compiler ID:', Math.random());
    this.atomManager = new AtomManager();
    this.ctx = { atomManager: this.atomManager };
    this.options = options;
    this.labelManager = new LabelManager(() => this.currentFunc);
    this.scopeManager = new ScopeManager(() => this.currentFunc);
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

  private syncScopeLevel() {
    if (this.currentFunc) {
      this.scopeLevel = this.currentFunc.scopeLevel;
    }
  }

  enterScope(): number {
    const newLevel = this.scopeManager.enterScope();
    if (newLevel >= 0) {
      this.scopeLevel = newLevel;
      this.emitEnterScopeOpcode(newLevel);
      return newLevel;
    }
    this.scopeLevel++;
    return this.scopeLevel;
  }

  leaveScope(): number {
    const previousScope = this.scopeLevel;
    const newLevel = this.scopeManager.leaveScope();
    if (this.currentFunc && previousScope >= 0) {
      this.emitLeaveScopeOpcode(previousScope);
    }
    if (newLevel >= 0) {
      this.scopeLevel = newLevel;
      return newLevel;
    }
    this.scopeLevel = Math.max(-1, this.scopeLevel - 1);
    return this.scopeLevel;
  }

  private emitEnterScopeOpcode(scopeIndex: number) {
    if (!this.currentFunc || scopeIndex < 0)
      return;
    this.emitOp(Opcode.OP_enter_scope);
    this.currentFunc.byteCode.putU16(scopeIndex);
  }

  private emitLeaveScopeOpcode(scopeIndex: number) {
    if (!this.currentFunc || scopeIndex < 0)
      return;
    this.emitOp(Opcode.OP_leave_scope);
    this.currentFunc.byteCode.putU16(scopeIndex);
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
    if (!this.currentFunc)
      return currentScope;
    const func = this.currentFunc;
    let scope = currentScope;
    const target = stopScope ?? -1;
    while (scope >= 0 && (target < 0 || scope > target)) {
      this.emitLeaveScopeOpcode(scope);
      const parent = func.scopes[scope]?.parent ?? -1;
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
    const source = await fs.readFile(filePath, 'utf-8');
    return this.compile(source, filePath);
  }

  async compileFileWithArtifacts(filePath: string): Promise<{ bytecode: Uint8Array, functionDef: JSFunctionDef }> {
    const source = await fs.readFile(filePath, 'utf-8');
    const bytecode = this.compile(source, filePath);
    return { bytecode, functionDef: this.currentFunc! };
  }

  compile(source: string, filename: string = 'input.ts'): Uint8Array {
    this.sourceFile = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
    this.parseState = new ParseState(this.ctx, source, filename, this.sourceFile);
    this.programBuilder = null;
    this.programPlan = null;
    
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
    globalFunc.filename = this.atomManager.add(filename);
    
    // Initialize line info
    globalFunc.lastLineNum = 1;
    globalFunc.lastColumnNum = 1;
    globalFunc.pc2line.writeULEB128(0);
    globalFunc.pc2line.writeULEB128(0);

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

    // Serialize
    const serializer = new BytecodeSerializer();
    return serializer.serialize(this.currentFunc!);
  }

  private prePass(sourceFile: ts.SourceFile) {
    const locals: string[] = [];
    const closures: string[] = [];

    const visit = (node: ts.Node, isTopLevel: boolean) => {
      if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach(decl => {
          if (ts.isIdentifier(decl.name)) {
            if (isTopLevel) closures.push(decl.name.text);
            else locals.push(decl.name.text);
          }
        });
      } else if (ts.isForOfStatement(node)) {
        if (ts.isVariableDeclarationList(node.initializer)) {
          node.initializer.declarations.forEach(decl => {
            if (ts.isIdentifier(decl.name)) {
              locals.push(decl.name.text);
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
    [...new Set(closures)].forEach(name => this.atomManager.add(name));
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

  compileProgram(node: ts.SourceFile) {
    const programPlan = this.currentFunc?.isGlobalVar ? this.getProgramPlan() : null;
    // Module boilerplate (simplified)
    if (this.currentFunc?.isGlobalVar) {
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

      // Register and uninitialize top-level block-scoped variables
      const blockScopedVars: { name: string, isConst: boolean }[] = [];
      ts.forEachChild(node, n => {
        if (ts.isVariableStatement(n)) {
           const isConst = (n.declarationList.flags & ts.NodeFlags.Const) !== 0;
           // console.log(`Variable statement: isConst=${isConst}`);
           const isLet = (n.declarationList.flags & ts.NodeFlags.Let) !== 0;
           if (isConst || isLet) {
             n.declarationList.declarations.forEach(decl => {
               if (ts.isIdentifier(decl.name)) {
                 blockScopedVars.push({ name: decl.name.text, isConst });
               }
             });
           }
        }
      });

      // Register them
      let globalVarIdx = 0;
      blockScopedVars.forEach(v => {
        if (this.currentFunc?.isGlobalVar) {
          let localIdx = globalVarIdx++;
          this.addClosureVar(v.name, v.isConst, true, localIdx);
        } else {
          if (this.findLocalVar(v.name) === -1) {
            this.addLocalVar(v.name, v.isConst);
          }
        }
      });
      if (this.currentFunc?.isGlobalVar) {
        this.currentFunc.anonymousLocalsCount = globalVarIdx;
      }

      // Emit uninitialization (reverse order to match WASM)
      if (!this.currentFunc?.isGlobalVar) {
        for (let i = blockScopedVars.length - 1; i >= 0; i--) {
           const v = blockScopedVars[i];
           const idx = this.findLocalVar(v.name);
           this.emitOp(Opcode.OP_set_loc_uninitialized);
           this.currentFunc!.byteCode.putU16(idx);
        }
      }

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
  }

  private compileStatementFromRecord(record: SourceElementRecord) {
    const handled = this.getStatementEmitter().emit(record);
    if (!handled) {
      this.compileStatement(record.node);
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
      case ts.SyntaxKind.ExpressionStatement:
        const expr = (node as ts.ExpressionStatement).expression;
        if (ts.isVoidExpression(expr)) {
          this.compileExpression(expr);
        } else {
          this.compileExpression(expr, false, undefined, true);
        }
        break;
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
    
    // 1. Define variable in current scope (if global)
    let varIdx = -1;
    if (this.currentFunc?.isGlobalVar) {
      // Function declarations in global scope are not lexical (var-like)
      varIdx = this.addClosureVar(name, false, false);
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
    
    // Switch context
    this.currentFunc = funcDef;
    this.syncScopeLevel();

    // Set args
    node.parameters.forEach(param => {
      if (ts.isIdentifier(param.name)) {
        this.addArg(param.name.text);
      }
    });
    
    // Initialize line info from node start
    const { line, character } = this.sourceFile!.getLineAndCharacterOfPosition(node.getStart());
    funcDef.lastLineNum = line;
    funcDef.lastColumnNum = character;
    funcDef.pc2line.writeULEB128(line);
    funcDef.pc2line.writeULEB128(character);
    // this.emitLineCol(0); // Removed to avoid redundant pc2line entry at pc=0
    
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
    if (this.currentFunc?.isGlobalVar) {
      this.emitPutVarRef(varIdx);
    } else {
      console.warn('Local function declaration not implemented');
      this.emitOp(Opcode.OP_drop);
    }
  }

  addArg(name: string): number {
    if (!this.currentFunc) return -1;
    const atom = this.atomManager.add(name);
    let prevIdx = -1;
    if (this.currentFunc.args.length > 0) {
        prevIdx = this.currentFunc.args.length - 1;
    }
    const varIdx = this.currentFunc.args.length;
    const idx = this.currentFunc.args.push({
      varName: atom,
      scopeLevel: 0,
      scopeNext: prevIdx,
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
    if (idx === 0) this.emitOp(Opcode.OP_put_var_ref0);
    else if (idx === 1) this.emitOp(Opcode.OP_put_var_ref1);
    else if (idx === 2) this.emitOp(Opcode.OP_put_var_ref2);
    else if (idx === 3) this.emitOp(Opcode.OP_put_var_ref3);
    else {
      this.emitOp(Opcode.OP_put_var_ref);
      this.currentFunc.byteCode.putU16(idx);
    }
    this.currentFunc.lastOpArgs = [idx];
  }

  emitPutArg(idx: number) {
    if (!this.currentFunc) return;
    if (idx === 0) this.emitOp(Opcode.OP_put_arg0);
    else if (idx === 1) this.emitOp(Opcode.OP_put_arg1);
    else if (idx === 2) this.emitOp(Opcode.OP_put_arg2);
    else if (idx === 3) this.emitOp(Opcode.OP_put_arg3);
    else {
      this.emitOp(Opcode.OP_put_arg);
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
    if (idx === 0) this.emitOp(Opcode.OP_put_loc0);
    else if (idx === 1) this.emitOp(Opcode.OP_put_loc1);
    else if (idx === 2) this.emitOp(Opcode.OP_put_loc2);
    else if (idx === 3) this.emitOp(Opcode.OP_put_loc3);
    else if (idx < 256) {
      this.emitOp(Opcode.OP_put_loc8);
      this.currentFunc.byteCode.putU8(idx);
    } else {
      this.emitOp(Opcode.OP_put_loc);
      this.currentFunc.byteCode.putU16(idx);
    }
  }

  compileBlock(node: ts.Block) {
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
    node.statements.forEach(stmt => this.compileStatement(stmt));
    this.leaveScope();
  }

  compileVariableDeclarationList(node: ts.VariableDeclarationList) {
    const isConst = (node.flags & ts.NodeFlags.Const) !== 0;
    const isLet = (node.flags & ts.NodeFlags.Let) !== 0;
    const isBlockScoped = isConst || isLet;
    
    node.declarations.forEach(decl => {
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text;
        
        // Register variable first to ensure atom order matches QuickJS
        let varIdx = -1;
        if (this.currentFunc?.isGlobalVar) {
          varIdx = this.addClosureVar(name, isConst, isBlockScoped);
        } else {
          varIdx = this.findLocalVar(name);
          if (varIdx === -1) {
            varIdx = this.addLocalVar(name, isConst);
          }
        }

        if (decl.initializer) {
          this.compileExpression(decl.initializer, false, name);
        } else {
          if (this.currentFunc?.isGlobalVar) {
            this.emitOp(Opcode.OP_undefined);
          } else {
            if (!isConst) {
               this.emitOp(Opcode.OP_undefined);
            } else {
               // Const without initializer is error, but we skip emission
               return;
            }
          }
        }

        if (this.currentFunc?.isGlobalVar) {
          this.emitPutVarRef(varIdx);
        } else {
          this.emitPutLoc(varIdx);
        }
      }
    });
  }

  compileVariableStatement(node: ts.VariableStatement) {
    this.compileVariableDeclarationList(node.declarationList);
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


  private isReturnOp(op: number): boolean {
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
    if (this.getExpressionEmitter().emit(node, { isTail, nameHint, dropResult })) {
      if (dropResult) {
        this.emitOp(Opcode.OP_drop);
      }
      return;
    }

    if (dropResult) {
        if (ts.isPrefixUnaryExpression(node) || ts.isPostfixUnaryExpression(node)) {
             if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
                 this.compileUpdateExpression(node, true);
                 return;
             }
        }
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

    if (dropResult) {
        this.emitOp(Opcode.OP_drop);
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
      case ts.SyntaxKind.DeleteKeyword:
        console.warn('Delete operator not fully implemented');
        this.emitOp(Opcode.OP_drop);
        this.emitOp(Opcode.OP_push_true);
        break;
      default:
        console.warn(`Unsupported prefix unary operator: ${ts.SyntaxKind[node.operator]}`);
    }
  }

  compilePostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
    if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
      this.compileUpdateExpression(node);
    } else {
      console.warn(`Unsupported postfix unary operator: ${ts.SyntaxKind[node.operator]}`);
    }
  }

  compileUpdateExpression(node: ts.PrefixUnaryExpression | ts.PostfixUnaryExpression, dropResult: boolean = false) {
    const operand = node.operand;
    const operator = node.operator;
    const isPrefix = ts.isPrefixUnaryExpression(node);

    if (ts.isIdentifier(operand)) {
      const name = operand.text;
      
      let idx = this.findLocalVar(name);
      let isClosure = false;
      let isLexical = false;

      if (idx === -1) {
          idx = this.findClosureVar(name);
          if (idx !== -1) {
              isClosure = true;
              isLexical = this.currentFunc!.closureVar[idx].isLexical;
          } else {
              // Global
              idx = -1;
          }
      }

      // Emit Get
      this.emitLineCol(operand.getStart());
      if (idx === -1) { // Global
         const atom = this.atomManager.add(name);
         this.emitOp(Opcode.OP_get_var);
         this.currentFunc!.byteCode.putU32(atom);
      } else if (isClosure) {
         this.emitGetVarRef(idx, isLexical);
      } else {
         this.emitGetLoc(idx);
      }

      // Emit Update
      // Calculate operator position
      let operatorPos = -1;
      if (isPrefix) {
          operatorPos = node.getStart();
      } else {
          operatorPos = node.getEnd() - 2; // Assumes ++ or -- is 2 chars
      }
      if (operatorPos !== -1) {
          this.emitLineCol(operatorPos);
      }

      if (operator === ts.SyntaxKind.PlusPlusToken) {
          if (!isPrefix && !dropResult) this.emitOp(Opcode.OP_dup);
          this.emitOp(Opcode.OP_inc);
          if (isPrefix && !dropResult) this.emitOp(Opcode.OP_dup);
      } else {
          if (!isPrefix && !dropResult) this.emitOp(Opcode.OP_dup);
          this.emitOp(Opcode.OP_dec);
          if (isPrefix && !dropResult) this.emitOp(Opcode.OP_dup);
      }

      // Emit Put
      if (idx === -1) { // Global
         const atom = this.atomManager.add(name);
         this.emitOp(Opcode.OP_put_var);
         this.currentFunc!.byteCode.putU32(atom);
      } else if (isClosure) {
         this.emitPutVarRef(idx, isLexical);
      } else {
         this.emitPutLoc(idx);
      }
      return;
    }
    console.warn('Update expression only supported for variables');
    this.emitOp(Opcode.OP_push_0);
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
    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(args)
      const propAccess = node.expression;
      this.compileExpression(propAccess.expression); // obj
      const name = propAccess.name.text;
      const atom = this.atomManager.add(name);
      this.emitLineCol(propAccess.expression.end);
      this.emitOp(Opcode.OP_get_field2);
      this.currentFunc!.byteCode.putU32(atom);
      
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

  compileAssignment(left: ts.Expression, right: ts.Expression) {
    if (ts.isIdentifier(left)) {
      const name = left.text;
      this.compileExpression(right, false, name);
      this.emitOp(Opcode.OP_dup);
        
      if (this.currentFunc) {
        // Check args
        const atom = this.atomManager.get(name);
        if (atom !== JS_ATOM_NULL) {
          const argIdx = this.currentFunc.args.findIndex(arg => arg.varName === atom);
          if (argIdx !== -1) {
            this.emitPutArg(argIdx);
            return;
          }
        }
        // Check locals
        const localIdx = this.findLocalVar(name);
        if (localIdx !== -1) {
          this.emitPutLoc(localIdx);
          return;
        }
      }
        
      const idx = this.findClosureVar(name);
      if (idx !== -1) {
        const cv = this.currentFunc!.closureVar[idx];
        this.emitPutVarRef(idx, cv.isLexical);
      } else {
        // Global
        const atom = this.atomManager.add(name);
        this.emitOp(Opcode.OP_put_var);
        this.currentFunc!.byteCode.putU32(atom);
      }
    } else if (ts.isPropertyAccessExpression(left)) {
      this.compileExpression(left.expression);
      this.compileExpression(right);
      this.emitOp(Opcode.OP_dup);
      this.emitOp(Opcode.OP_perm3);
      const name = left.name.text;
      const atom = this.atomManager.add(name);
      this.emitOp(Opcode.OP_put_field);
      this.currentFunc!.byteCode.putU32(atom);
    } else {
      console.warn("Unsupported assignment target");
    }
  }

  compileBinaryExpression(node: ts.BinaryExpression) {
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      this.compileAssignment(node.left, node.right);
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
        if (emitLineInfo && !this.suppressLineInfo) {
          this.emitLineCol(node.getStart());
        }
        const v = this.currentFunc.vars[localIdx];
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
      if (emitLineInfo && !this.suppressLineInfo) {
        this.emitLineCol(node.getStart());
      }
      const cv = this.currentFunc!.closureVar[idx];
      this.emitGetVarRef(idx, cv.isLexical);
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
    
    // Peephole optimization: put_var_ref X + get_var_ref X -> set_var_ref X
    if (!check && this.currentFunc.lastOpArgs.length > 0 && this.currentFunc.lastOpArgs[0] === idx) {
      let isPut = false;
      
      if (idx === 0 && this.currentFunc.lastOp === Opcode.OP_put_var_ref0) isPut = true;
      else if (idx === 1 && this.currentFunc.lastOp === Opcode.OP_put_var_ref1) isPut = true;
      else if (idx === 2 && this.currentFunc.lastOp === Opcode.OP_put_var_ref2) isPut = true;
      else if (idx === 3 && this.currentFunc.lastOp === Opcode.OP_put_var_ref3) isPut = true;
      else if (this.currentFunc.lastOp === Opcode.OP_put_var_ref) isPut = true;
      
      if (isPut) {
        // Rollback
        this.currentFunc.byteCode.setSize(this.currentFunc.lastOpPos);
        
        // Emit set_var_ref
        if (idx === 0) this.emitOp(Opcode.OP_set_var_ref0);
        else if (idx === 1) this.emitOp(Opcode.OP_set_var_ref1);
        else if (idx === 2) this.emitOp(Opcode.OP_set_var_ref2);
        else if (idx === 3) this.emitOp(Opcode.OP_set_var_ref3);
        else {
          this.emitOp(Opcode.OP_set_var_ref);
          this.currentFunc.byteCode.putU16(idx);
        }
        
        // Update lastOpArgs because set_var_ref also uses idx
        this.currentFunc.lastOpArgs = [idx];
        return;
      }
    }

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
    if (this.currentFunc.hasPendingLineInfo) {
      this.flushLineCol();
    }
    this.currentFunc.byteCode.putU8(op);
    this.currentFunc.lastOp = op;
    this.currentFunc.lastOpArgs = [];
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

  emitLineCol(pos: number, colOffset: number = 0) {
    if (this.suppressLineInfo) return;
    if (this.sourceFile && this.currentFunc) {
      const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(pos);
      // console.log(`emitLineCol: pos=${pos} -> ${line + 1}:${character + 1}`);
      this.currentFunc.pendingLineNum = line + 1;
      this.currentFunc.pendingColumnNum = character + 1;
      this.currentFunc.hasPendingLineInfo = true;
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
    
    const pc = func.byteCode.size;
    const lineNum = func.pendingLineNum;
    const columnNum = func.pendingColumnNum;
    
    func.hasPendingLineInfo = false;

    if (func.pc2line.size === 0) {
      func.pc2line.writeULEB128(0);
      func.pc2line.writeULEB128(0);
      func.pc2lineLastPc = 0;
      func.lastLineNum = 0;
      func.lastColumnNum = 0;
    }

    if (lineNum !== func.lastLineNum || pc !== func.pc2lineLastPc || columnNum !== func.lastColumnNum) {
      let diffPc = pc - func.pc2lineLastPc;
      let diffLine = lineNum - func.lastLineNum;
      let diffCol = columnNum - func.lastColumnNum;

      if (diffLine === 0 && diffCol === 0) {
        func.hasPendingLineInfo = false;
        return;
      }
        
      let op = 0;
      const BASE = PC2Line.PC2LINE_BASE;
      if (diffLine >= BASE && 
        diffLine < BASE + PC2Line.PC2LINE_RANGE &&
        diffPc <= PC2Line.PC2LINE_DIFF_PC_MAX) {
        op = PC2Line.PC2LINE_OP_FIRST + diffPc * PC2Line.PC2LINE_RANGE + (diffLine - BASE);
        if (op > 255) op = 0; 
      }
        
      if (op !== 0) {
        func.pc2line.putU8(op);
        func.pc2line.writeZigZag(diffCol);
      } else {
        // Long encoding
        func.pc2line.putU8(0);
        func.pc2line.writeULEB128(diffPc);
        func.pc2line.writeZigZag(diffLine);
        func.pc2line.writeZigZag(diffCol);
      }
      
      func.lastLineNum = lineNum;
      func.lastColumnNum = columnNum;
      func.pc2lineLastPc = pc;
    }
    func.hasPendingLineInfo = false;
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
    
    // Switch context
    this.currentFunc = funcDef;
    this.syncScopeLevel();

    // Set args
    node.parameters.forEach((param, index) => {
      if (ts.isIdentifier(param.name)) {
        this.addArg(param.name.text);
      }
    });
    
    // Initialize line info from node start
    const { line, character } = this.sourceFile!.getLineAndCharacterOfPosition(node.getStart());
    funcDef.lastLineNum = line;
    funcDef.lastColumnNum = character;
    funcDef.pc2line.writeULEB128(line);
    funcDef.pc2line.writeULEB128(character);
    
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
    
    // Switch context
    this.currentFunc = funcDef;
    this.syncScopeLevel();
    
    // Set args
    node.parameters.forEach((param, index) => {
      if (ts.isIdentifier(param.name)) {
        this.addArg(param.name.text);
      }
    });
    
    // Initialize line info from node
    const { line, character } = this.sourceFile!.getLineAndCharacterOfPosition(node.getStart());
    funcDef.lastLineNum = line;
    funcDef.lastColumnNum = character;
    funcDef.pc2line.writeULEB128(line);
    funcDef.pc2line.writeULEB128(character);
    
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
    
    const args = node.arguments || [];
    args.forEach(arg => this.compileExpression(arg));
    
    this.emitOp(Opcode.OP_call_constructor);
    this.currentFunc!.byteCode.putU16(args.length);
  }
}

