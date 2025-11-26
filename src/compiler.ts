import * as ts from 'typescript';
import * as fs from 'fs/promises';
import { AtomManager, JSAtom, JS_ATOM_NULL } from './atom';
import { JSFunctionDef, JSValue, JSVarKind } from './functionDef';
import { BytecodeWriter } from './bytecode';
import { Opcode, JSMode, PC2Line, FunctionKind } from './env';

import { BytecodeSerializer } from './serializer';

export interface CompilerOptions {
  bigInt?: boolean;
  dump?: boolean;
  shortCode?: boolean;
  debug?: boolean;
  strictMode?: boolean;
  referenceJsSource?: string;
}

interface Label {
  addr: number;
  jumps: number[];
  jumps8: number[];
}

interface LoopContext {
  breakLabel: Label;
  continueLabel: Label;
  labelName?: string;
}

export class TypeScriptCompiler {
  ctx: any; // Placeholder for JSContext
  atomManager: AtomManager;
  cur_func: JSFunctionDef | null = null;
  sourceFile: ts.SourceFile | null = null;
  options: CompilerOptions;
  loopStack: LoopContext[] = [];
  scopeLevel: number = 1;

  suppressLineInfo: boolean = false;
  inArgument: boolean = false;

  constructor(options: CompilerOptions = {}) {
    console.log('Compiler ID:', Math.random());
    this.atomManager = new AtomManager();
    this.ctx = { atomManager: this.atomManager };
    this.options = options;
  }

  async compileFile(filePath: string): Promise<Uint8Array> {
    const source = await fs.readFile(filePath, 'utf-8');
    return this.compile(source, filePath);
  }

  async compileFileWithArtifacts(filePath: string): Promise<{ bytecode: Uint8Array, functionDef: JSFunctionDef }> {
    const source = await fs.readFile(filePath, 'utf-8');
    const bytecode = this.compile(source, filePath);
    return { bytecode, functionDef: this.cur_func! };
  }

  compile(source: string, filename: string = 'input.ts'): Uint8Array {
    this.sourceFile = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
    
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
    globalFunc.filename = this.atomManager.add(filename);
    this.cur_func = globalFunc;

    // Pre-pass to register atoms in correct order (locals then closures)
    this.prePass(this.sourceFile);

    // Compile program
    this.compileProgram(this.sourceFile);

    // Serialize
    const serializer = new BytecodeSerializer();
    return serializer.serialize(this.cur_func!);
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

  compileProgram(node: ts.SourceFile) {
    // Module boilerplate (simplified)
    if (this.cur_func?.isGlobalVar) {
      this.emitLineCol(0);
      this.emitOp(Opcode.OP_push_this);
      const label = this.newLabel();
      this.emitJump8(Opcode.OP_if_false8, label);
      
      // Script Path: Function Declarations
      ts.forEachChild(node, n => {
        if (ts.isFunctionDeclaration(n)) {
          this.compileStatement(n);
        }
      });

      this.emitOp(Opcode.OP_return_undef);
      this.emitLabel(label);

      // Module Path: Statements
      ts.forEachChild(node, n => {
        if (!ts.isFunctionDeclaration(n) && n.kind !== ts.SyntaxKind.EndOfFileToken) {
          this.compileStatement(n);
        }
      });

      this.emitOp(Opcode.OP_undefined);
      this.emitOp(Opcode.OP_return_async);
    } else {
      ts.forEachChild(node, n => this.compileStatement(n));
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
      case ts.SyntaxKind.ForOfStatement:
        this.compileForOfStatement(node as ts.ForOfStatement);
        break;
      case ts.SyntaxKind.VariableStatement:
        this.compileVariableStatement(node as ts.VariableStatement);
        break;
      case ts.SyntaxKind.ExpressionStatement:
        this.compileExpression((node as ts.ExpressionStatement).expression);
        this.emitOp(Opcode.OP_drop);
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
      default:
        console.warn(`Unsupported statement kind: ${ts.SyntaxKind[node.kind]}`);
    }
  }

  compileFunctionDeclaration(node: ts.FunctionDeclaration) {
    if (!node.name) return;
    const name = node.name.text;
    
    // 1. Define variable in current scope (if global)
    let varIdx = -1;
    if (this.cur_func?.isGlobalVar) {
      // Function declarations in global scope are not lexical (var-like)
      varIdx = this.addClosureVar(name, false, false);
    }

    // 2. Create new function definition
    const parentFunc = this.cur_func;
    const funcDef = new JSFunctionDef(this.ctx, parentFunc);
    funcDef.funcName = this.atomManager.add(name);
    funcDef.filename = parentFunc!.filename;
    funcDef.jsMode = JSMode.JS_MODE_STRICT;
    funcDef.hasPrototype = true;
    funcDef.hasSimpleParameterList = true;
    funcDef.newTargetAllowed = true;
    funcDef.argumentsAllowed = true;
    
    // Set args
    node.parameters.forEach(param => {
      if (ts.isIdentifier(param.name)) {
          const paramName = param.name.text;
          const paramAtom = this.atomManager.add(paramName);
          funcDef.args.push({
              varName: paramAtom,
              scopeLevel: 0,
              scopeNext: 1, // Match QuickJS behavior (1 seems to be default for args?)
              isConst: false,
              isLexical: false,
              isCaptured: false,
              varKind: JSVarKind.JS_VAR_NORMAL,
              funcPoolIdx: -1
          });
      }
    });
    
    // Switch context
    this.cur_func = funcDef;
    // this.emitLineCol(0); // Removed to avoid redundant pc2line entry at pc=0
    
    // Compile body
    if (node.body) {
        this.compileBlock(node.body);
    }
    
    // Add implicit return if needed
    const lastOp = this.cur_func.byteCode.lastByte;
    if (lastOp !== Opcode.OP_return && lastOp !== Opcode.OP_return_undef && lastOp !== Opcode.OP_return_async) {
        this.emitOp(Opcode.OP_return_undef);
    }
    
    // Restore context
    this.cur_func = parentFunc;
    
    // 3. Emit fclosure
    const funcIdx = this.cur_func!.cpool.length;
    this.cur_func!.cpool.push({
        type: 'function',
        value: funcDef
    });
    
    this.emitOp(Opcode.OP_fclosure8);
    this.cur_func!.byteCode.putU8(funcIdx);
    
    // 4. Assign to variable
    if (this.cur_func?.isGlobalVar) {
         this.emitPutVarRef(varIdx);
    } else {
         console.warn('Local function declaration not implemented');
         this.emitOp(Opcode.OP_drop);
    }
  }

  compileVariableStatement(node: ts.VariableStatement) {
    const isConst = (node.declarationList.flags & ts.NodeFlags.Const) !== 0;
    
    node.declarationList.declarations.forEach(decl => {
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text;
        
        // Register variable first to ensure atom order matches QuickJS
        let varIdx = -1;
        if (this.cur_func?.isGlobalVar) {
             varIdx = this.addClosureVar(name, isConst);
        } else {
             varIdx = this.addLocalVar(name, isConst);
        }

        if (decl.initializer) {
           this.compileExpression(decl.initializer);
        } else {
           if (this.cur_func?.isGlobalVar) {
               this.emitOp(Opcode.OP_undefined);
           } else {
               this.emitOp(Opcode.OP_set_loc_uninitialized);
               this.cur_func!.byteCode.putU16(varIdx);
               return; // Skip put_var_ref/put_loc
           }
        }

        if (this.cur_func?.isGlobalVar) {
             this.emitPutVarRef(varIdx);
        } else {
             this.emitPutLoc(varIdx);
        }
      }
    });
  }

  addClosureVar(name: string, isConst: boolean, isLexical: boolean = true): number {
    const atom = this.atomManager.add(name);
    // Check if already exists
    let idx = this.cur_func!.closureVar.findIndex(v => v.varName === atom);
    if (idx !== -1) return idx;

    idx = this.cur_func!.closureVar.length;
    // TODO: Correctly resolve variable in parent scope
    let isLocal = false;
    if (this.cur_func?.isGlobalVar) {
        isLocal = true;
    }
    
    this.cur_func!.closureVar.push({
      isLocal: isLocal, 
      isArg: false,
      isConst: isConst,
      isLexical: isLexical,
      varKind: JSVarKind.JS_VAR_NORMAL,
      varIdx: idx, 
      varName: atom
    });
    return idx;
  }

  addLocalVar(name: string, isConst: boolean = false): number {
    if (!this.cur_func) return -1;
    const atom = this.atomManager.add(name);
    const idx = this.cur_func.vars.push({
      varName: atom,
      scopeLevel: this.scopeLevel,
      scopeNext: -1,
      isConst: isConst,
      isLexical: true,
      isCaptured: false,
      varKind: JSVarKind.JS_VAR_NORMAL,
      funcPoolIdx: -1
    }) - 1;
    return idx;
  }

  emitPutVarRef(idx: number, check: boolean = false) {
    if (!this.cur_func) return;
    if (check) {
        this.emitOp(Opcode.OP_put_var_ref_check);
        this.cur_func.byteCode.putU16(idx);
        return;
    }

    if (idx === 0) {
      this.emitOp(Opcode.OP_put_var_ref0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_put_var_ref1);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_put_var_ref2);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_put_var_ref3);
    } else {
      this.emitOp(Opcode.OP_put_var_ref);
      this.cur_func.byteCode.putU16(idx);
    }
  }

  emitPutArg(idx: number) {
    if (!this.cur_func) return;
    if (idx === 0) {
      this.emitOp(Opcode.OP_put_arg0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_put_arg1);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_put_arg2);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_put_arg3);
    } else {
      this.emitOp(Opcode.OP_put_arg);
      this.cur_func.byteCode.putU16(idx);
    }
  }

  emitGetLoc(idx: number, check: boolean = false) {
    if (!this.cur_func) return;
    if (check) {
        this.emitOp(Opcode.OP_get_loc_check);
        this.cur_func.byteCode.putU16(idx);
    } else {
        if (idx === 0) {
            this.emitOp(Opcode.OP_get_loc0);
        } else if (idx === 1) {
            this.emitOp(Opcode.OP_get_loc1);
        } else if (idx === 2) {
            this.emitOp(Opcode.OP_get_loc2);
        } else if (idx === 3) {
            this.emitOp(Opcode.OP_get_loc3);
        } else {
            this.emitOp(Opcode.OP_get_loc);
            this.cur_func.byteCode.putU16(idx);
        }
    }
  }

  emitPutLoc(idx: number) {
    if (!this.cur_func) return;
    if (idx === 0) {
      this.emitOp(Opcode.OP_put_loc0);
    } else if (idx === 1) {
      this.emitOp(Opcode.OP_put_loc1);
    } else if (idx === 2) {
      this.emitOp(Opcode.OP_put_loc2);
    } else if (idx === 3) {
      this.emitOp(Opcode.OP_put_loc3);
    } else {
      this.emitOp(Opcode.OP_put_loc);
      this.cur_func.byteCode.putU16(idx);
    }
  }

  compileBlock(node: ts.Block) {
    this.scopeLevel++;
    node.statements.forEach(stmt => this.compileStatement(stmt));
    this.scopeLevel--;
  }

  compileReturnStatement(node: ts.ReturnStatement) {
    if (node.expression) {
      this.compileExpression(node.expression);
      this.emitLineCol(node.getStart());
      this.emitOp(Opcode.OP_return);
    } else {
      this.emitLineCol(node.getStart());
      this.emitOp(Opcode.OP_return_undef);
    }
  }

  compileIfStatement(node: ts.IfStatement) {
    // Optimization: if (cond) break/continue;
    if (!node.elseStatement) {
      let stmt = node.thenStatement;
      if (ts.isBlock(stmt)) {
        if (stmt.statements.length === 1) {
          stmt = stmt.statements[0];
        }
      }
        
      if (ts.isBreakStatement(stmt) || ts.isContinueStatement(stmt)) {
        this.compileExpression(node.expression);
        
        let targetLabel: Label | undefined;
        if (ts.isBreakStatement(stmt)) {
          if (this.loopStack.length > 0) {
            targetLabel = this.loopStack[this.loopStack.length - 1].breakLabel;
          }
        } else {
          if (this.loopStack.length > 0) {
            targetLabel = this.loopStack[this.loopStack.length - 1].continueLabel;
          }
        }
        
        if (targetLabel) {
          this.emitJump8(Opcode.OP_if_true8, targetLabel);
          return;
        }
      }
    }

    // if (expr) stmt else stmt
    // expr
    // if_false else_label
    // stmt
    // goto end_label
    // else_label:
    // else_stmt
    // end_label:

    const elseLabel = this.newLabel();
    const endLabel = this.newLabel();

    this.compileExpression(node.expression);
    // Optimistically use short jump
    this.emitJump8(Opcode.OP_if_false8, elseLabel);

    this.compileStatement(node.thenStatement);
    
    if (node.elseStatement) {
      this.emitJump8(Opcode.OP_goto8, endLabel);
    }

    this.emitLabel(elseLabel);

    if (node.elseStatement) {
      this.compileStatement(node.elseStatement);
      this.emitLabel(endLabel);
    }
  }

  compileWhileStatement(node: ts.WhileStatement) {
    const startLabel = this.newLabel();
    const endLabel = this.newLabel();

    this.loopStack.push({ breakLabel: endLabel, continueLabel: startLabel });

    this.emitLabel(startLabel);
    this.compileExpression(node.expression);
    this.emitJump8(Opcode.OP_if_false8, endLabel);

    this.compileStatement(node.statement);

    this.emitJump8(Opcode.OP_goto8, startLabel);
    this.emitLabel(endLabel);

    this.loopStack.pop();
  }

  compileBreakStatement(node: ts.BreakStatement) {
    if (this.loopStack.length === 0) {
      // TODO: Error handling
      return;
    }
    // TODO: Handle labels
    const ctx = this.loopStack[this.loopStack.length - 1];
    this.emitJump8(Opcode.OP_goto8, ctx.breakLabel);
  }

  compileContinueStatement(node: ts.ContinueStatement) {
    if (this.loopStack.length === 0) {
      // TODO: Error handling
      return;
    }
    // TODO: Handle labels
    const ctx = this.loopStack[this.loopStack.length - 1];
    this.emitJump8(Opcode.OP_goto8, ctx.continueLabel);
  }

  private isReturnOp(op: number): boolean {
    return op === Opcode.OP_return || 
           op === Opcode.OP_return_undef || 
           op === Opcode.OP_return_async || 
           op === Opcode.OP_throw ||
           op === Opcode.OP_tail_call;
  }

  compileSwitchStatement(node: ts.SwitchStatement) {
    this.compileExpression(node.expression);
    
    const endLabel = this.newLabel();
    // this.breakTargets.push(endLabel); // TODO: Implement break support
    
    const clauses = node.caseBlock.clauses;
    const bodyLabels: Label[] = clauses.map(() => this.newLabel());
    const checkLabels: Label[] = clauses.map(() => this.newLabel());
    
    let defaultIndex = -1;
    for (let i = 0; i < clauses.length; i++) {
      if (clauses[i].kind === ts.SyntaxKind.DefaultClause) {
        defaultIndex = i;
      }
    }
    
    // Interleaved compilation
    for (let i = 0; i < clauses.length; i++) {
      const clause = clauses[i];
        
      if (clause.kind === ts.SyntaxKind.CaseClause) {
        const caseClause = clause as ts.CaseClause;
        
        // Check label
        this.emitLabel(checkLabels[i]);
          
        // Comparison
        this.emitOp(Opcode.OP_dup);
        this.compileExpression(caseClause.expression);
        this.emitOp(Opcode.OP_strict_eq);
          
        // Jump to next check if false
        let nextCheckLabel = endLabel; // Default fallback
        if (defaultIndex !== -1) {
            nextCheckLabel = bodyLabels[defaultIndex]; // Fallback to default body
        }
          
        // Find next case check
        for (let j = i + 1; j < clauses.length; j++) {
          if (clauses[j].kind === ts.SyntaxKind.CaseClause) {
            nextCheckLabel = checkLabels[j];
            break;
          }
        }
          
        this.emitJump8(Opcode.OP_if_false8, nextCheckLabel);
          
        // Body
        this.emitLabel(bodyLabels[i]);
        clause.statements.forEach(stmt => this.compileStatement(stmt));
          
        // Fallthrough to next body
        if (!this.isReturnOp(this.cur_func!.byteCode.lastByte ?? 0)) {
          if (i + 1 < clauses.length) {
            if (clauses[i+1].kind === ts.SyntaxKind.CaseClause) {
              this.emitJump8(Opcode.OP_goto8, bodyLabels[i+1]);
            }
            // If next is Default, fall through (no check to skip)
          } else {
            this.emitJump8(Opcode.OP_goto8, endLabel);
          }
        }
        
      } else {
        // Default clause
        // Body
        this.emitLabel(bodyLabels[i]);
        clause.statements.forEach(stmt => this.compileStatement(stmt));
        
        // Fallthrough
        if (!this.isReturnOp(this.cur_func!.byteCode.lastByte ?? 0)) {
          if (i + 1 < clauses.length) {
            if (clauses[i+1].kind === ts.SyntaxKind.CaseClause) {
              this.emitJump8(Opcode.OP_goto8, bodyLabels[i+1]);
            }
          } else {
            this.emitJump8(Opcode.OP_goto8, endLabel);
          }
        }
      }
    }
    
    const lastClauseReturns = this.isReturnOp(this.cur_func!.byteCode.lastByte ?? 0);
    const endLabelTargeted = endLabel.jumps.length > 0 || endLabel.jumps8.length > 0;

    this.emitLabel(endLabel);
    if (!lastClauseReturns || endLabelTargeted) {
      this.emitOp(Opcode.OP_drop); // Drop the switch value
    }
    // this.breakTargets.pop();
  }

  compileExpression(node: ts.Expression) {
    // this.emitLineCol(node.getStart()); // Removed to match QuickJS behavior (only specific expressions emit line info)
    switch (node.kind) {
      case ts.SyntaxKind.BinaryExpression:
        this.compileBinaryExpression(node as ts.BinaryExpression);
        break;
      case ts.SyntaxKind.CallExpression:
        this.compileCallExpression(node as ts.CallExpression);
        break;
      case ts.SyntaxKind.Identifier:
        this.compileIdentifier(node as ts.Identifier);
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
      case ts.SyntaxKind.NumericLiteral:
        this.compileNumericLiteral(node as ts.NumericLiteral);
        break;
      case ts.SyntaxKind.StringLiteral:
        this.compileStringLiteral(node as ts.StringLiteral);
        break;
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        this.compileStringLiteral(node as ts.StringLiteral);
        break;
      default:
        console.warn(`Unsupported expression kind: ${ts.SyntaxKind[node.kind]}`);
    }
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
    this.cur_func!.byteCode.putU32(atom);
  }

  compileArrayLiteral(node: ts.ArrayLiteralExpression) {
    node.elements.forEach(element => {
      this.compileExpression(element);
    });
    this.emitOp(Opcode.OP_array_from);
    this.cur_func!.byteCode.putU16(node.elements.length);
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
        this.cur_func!.byteCode.putU32(atom);
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        // Shorthand: { a } -> { a: a }
        // Value (identifier)
        // QuickJS seems to skip line info for shorthand property value access
        this.compileIdentifier(prop.name, false);
        
        // Key
        const name = prop.name.text;
        const atom = this.atomManager.add(name);
        this.emitOp(Opcode.OP_define_field);
        this.cur_func!.byteCode.putU32(atom);
      } else {
        console.warn('Unsupported object literal property kind');
      }
    });
  }

  compilePropertyAccessExpression(node: ts.PropertyAccessExpression) {
    this.compileExpression(node.expression);
    const name = node.name.text;
    const atom = this.atomManager.add(name);
    this.emitLineCol(node.expression.end);
    this.emitOp(Opcode.OP_get_field);
    this.cur_func!.byteCode.putU32(atom);
  }

  compileCallExpression(node: ts.CallExpression) {
    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(args)
      const propAccess = node.expression;
      this.compileExpression(propAccess.expression); // obj
      const name = propAccess.name.text;
      const atom = this.atomManager.add(name);
      this.emitLineCol(propAccess.expression.end, 2);
      this.emitOp(Opcode.OP_get_field2);
      this.cur_func!.byteCode.putU32(atom);
      
      node.arguments.forEach(arg => {
        const oldInArg = this.inArgument;
        this.inArgument = true;
        this.compileExpression(arg);
        this.inArgument = oldInArg;
      });
      this.emitLineCol(propAccess.end, 2);
      this.emitOp(Opcode.OP_call_method);
      this.cur_func!.byteCode.putU16(node.arguments.length);
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
      if (argc === 0) {
        this.emitOp(Opcode.OP_call0);
      } else if (argc === 1) {
        this.emitOp(Opcode.OP_call1);
      } else if (argc === 2) {
        this.emitOp(Opcode.OP_call2);
      } else if (argc === 3) {
        this.emitOp(Opcode.OP_call3);
      } else {
        this.emitOp(Opcode.OP_call);
        if (this.cur_func) {
          this.cur_func.byteCode.putU16(argc);
        }
      }
    }
  }

  compileAssignment(left: ts.Expression, right: ts.Expression) {
    if (ts.isIdentifier(left)) {
        this.compileExpression(right);
      this.emitOp(Opcode.OP_dup);
      const name = left.text;
        
      if (this.cur_func) {
        // Check args
        const atom = this.atomManager.get(name);
        if (atom !== JS_ATOM_NULL) {
          const argIdx = this.cur_func.args.findIndex(arg => arg.varName === atom);
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
        const cv = this.cur_func!.closureVar[idx];
        this.emitPutVarRef(idx, cv.isLexical);
      } else {
        // Global
        const atom = this.atomManager.add(name);
        this.emitOp(Opcode.OP_put_var);
        this.cur_func!.byteCode.putU32(atom);
      }
    } else if (ts.isPropertyAccessExpression(left)) {
      this.compileExpression(left.expression);
      this.compileExpression(right);
      this.emitOp(Opcode.OP_dup);
      this.emitOp(Opcode.OP_perm3);
      const name = left.name.text;
      const atom = this.atomManager.add(name);
      this.emitOp(Opcode.OP_put_field);
      this.cur_func!.byteCode.putU32(atom);
    } else {
      console.warn("Unsupported assignment target");
    }
  }

  compileBinaryExpression(node: ts.BinaryExpression) {
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      this.compileAssignment(node.left, node.right);
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
      this.emitLineCol(node.operatorToken.getStart());
      const oldSuppress = this.suppressLineInfo;
      this.suppressLineInfo = true;
      this.compileExpression(node.left);
      this.suppressLineInfo = oldSuppress;
      
      this.compileExpression(node.right);
      // console.log('Right start:', node.right.getStart(), 'Text:', node.right.getText());
      this.emitLineCol(node.right.getStart());
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
      default:
        console.warn(`Unsupported operator: ${ts.SyntaxKind[node.operatorToken.kind]}`);
    }
  }

  compileIdentifier(node: ts.Identifier, emitLineInfo: boolean = true) {
    const name = node.text;
    
    if (this.cur_func) {
      // Check args
      const atom = this.atomManager.get(name);
      if (atom !== JS_ATOM_NULL) {
        const argIdx = this.cur_func.args.findIndex(arg => arg.varName === atom);
        if (argIdx !== -1) {
          if (emitLineInfo && !this.suppressLineInfo) {
            this.emitLineCol(node.getStart(), this.inArgument ? 2 : 0);
          }
          this.emitGetArg(argIdx);
          return;
        }
      }

      // Check locals
      const localIdx = this.findLocalVar(name);
      if (localIdx !== -1) {
        if (emitLineInfo && !this.suppressLineInfo) {
          this.emitLineCol(node.getStart(), this.inArgument ? 2 : 0);
        }
        const v = this.cur_func.vars[localIdx];
        this.emitGetLoc(localIdx, v.isConst);
        return;
      }
    }

    const idx = this.findClosureVar(name);
    console.log(`compileIdentifier: ${name} idx=${idx} inArg=${this.inArgument}`);
    if (idx !== -1) {
      if (emitLineInfo && !this.suppressLineInfo) {
        this.emitLineCol(node.getStart(), this.inArgument ? 2 : 0);
      }
      const cv = this.cur_func!.closureVar[idx];
      this.emitGetVarRef(idx, cv.isLexical);
    } else {
      // Assume global variable
      if (emitLineInfo && !this.suppressLineInfo) {
        // QuickJS seems to add 2 to the column for global variables?
        this.emitLineCol(node.getStart(), 2);
      }
      const atom = this.atomManager.add(name);
      this.emitOp(Opcode.OP_get_var);
      if (this.cur_func) {
        this.cur_func.byteCode.putU32(atom);
      }
    }
  }

  emitGetArg(idx: number) {
    if (!this.cur_func) return;
    
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
      this.cur_func.byteCode.putU16(idx);
    }
  }

  findClosureVar(name: string): number {
    if (!this.cur_func) return -1;
    const atom = this.atomManager.get(name);
    if (atom === JS_ATOM_NULL) return -1;
    return this.cur_func.closureVar.findIndex(cv => cv.varName === atom);
  }

  findLocalVar(name: string): number {
    if (!this.cur_func) return -1;
    const atom = this.atomManager.get(name);
    if (atom === JS_ATOM_NULL) return -1;
    return this.cur_func.vars.findIndex(v => v.varName === atom);
  }

  emitGetVarRef(idx: number, check: boolean = false) {
    if (!this.cur_func) return;
    console.log(`emitGetVarRef: idx=${idx} check=${check}`);
    if (check) {
      this.emitOp(Opcode.OP_get_var_ref_check);
      this.cur_func.byteCode.putU16(idx);
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
      this.cur_func.byteCode.putU16(idx);
    }
  }

  newLabel(): Label {
    return { addr: -1, jumps: [], jumps8: [] };
  }

  emitLabel(label: Label) {
    if (!this.cur_func) return;
    label.addr = this.cur_func.byteCode.size;
    for (const pos of label.jumps) {
      this.cur_func.byteCode.patchU32(pos, label.addr - pos);
    }
    for (const pos of label.jumps8) {
      const diff = label.addr - pos;
      if (diff < -128 || diff > 127) throw new Error("Jump8 out of range");
      this.cur_func.byteCode.patchU8(pos, diff);
    }
    label.jumps = [];
    label.jumps8 = [];
  }

  emitJump(op: Opcode, label: Label) {
    if (!this.cur_func) return;
    this.emitOp(op);
    if (label.addr !== -1) {
      const diff = label.addr - this.cur_func.byteCode.size;
      this.cur_func.byteCode.putU32(diff);
    } else {
      label.jumps.push(this.cur_func.byteCode.size);
      this.cur_func.byteCode.putU32(0);
    }
  }

  emitJump8(op: Opcode, label: Label) {
    if (!this.cur_func) return;
    this.emitOp(op);
    if (label.addr !== -1) {
      const diff = label.addr - this.cur_func.byteCode.size;
      if (diff < -128 || diff > 127) throw new Error("Jump8 out of range");
      this.cur_func.byteCode.putU8(diff);
    } else {
      label.jumps8.push(this.cur_func.byteCode.size);
      this.cur_func.byteCode.putU8(0);
    }
  }

  emitPushConst(val: JSValue) {
    if (!this.cur_func) return;
    const idx = this.cur_func.cpool.length;
    this.cur_func.cpool.push(val);
    if (idx < 256) {
      this.emitOp(Opcode.OP_push_const8);
      this.cur_func.byteCode.putU8(idx);
    } else {
      this.emitOp(Opcode.OP_push_const);
      this.cur_func.byteCode.putU32(idx);
    }
  }

  // Emit helpers
  emitOp(op: Opcode) {
    if (this.cur_func) {
      if (this.cur_func.hasPendingLineInfo) {
        this.flushLineCol();
      }
      this.cur_func.byteCode.emitOp(op);
    }
  }

  emitPushI32(val: number) {
    if (!this.cur_func) return;
    
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
      this.cur_func.byteCode.putU8(val);
    } else {
      this.emitOp(Opcode.OP_push_i32);
      this.cur_func.byteCode.putU32(val);
    }
  }

  private emitLineCol(pos: number, colOffset: number = 0) {
    if (!this.cur_func || !this.sourceFile) return;
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(pos);
    // QuickJS uses 0-based line and column numbers in the binary
    this.cur_func.pendingLineNum = line;
    this.cur_func.pendingColumnNum = character + colOffset;
    this.cur_func.hasPendingLineInfo = true;
  }

  private flushLineCol() {
    const func = this.cur_func;
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

    if (lineNum !== func.lastLineNum || pc !== func.pc2lineLastPc) {
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
      console.log(`flushLineCol: diffPc=${diffPc} diffLine=${diffLine} diffCol=${diffCol} op=${op}`);
        
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

  compileForOfStatement(node: ts.ForOfStatement) {
    this.scopeLevel++;
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
        this.cur_func!.byteCode.putU16(idx);
      }
    }

    // 1. Compile expression
    this.compileExpression(node.expression);
    
    // 2. Start
    this.emitOp(Opcode.OP_for_of_start);
    
    const labelNext = this.newLabel();
    const labelBody = this.newLabel();
    const labelBreak = this.newLabel();
    
    this.emitJump8(Opcode.OP_goto8, labelNext);
    
    // 3. Body
    this.emitLabel(labelBody);
    
    // Assign to variable
    if (ts.isVariableDeclarationList(node.initializer)) {
      const decl = node.initializer.declarations[0];
      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text;
        const idx = this.findLocalVar(name);
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
    this.emitOp(Opcode.OP_for_of_next);
    this.cur_func!.byteCode.putU8(0);
    
    this.emitJump8(Opcode.OP_if_false8, labelBody);
    
    // 5. Exit
    this.emitOp(Opcode.OP_drop);
    this.emitOp(Opcode.OP_iterator_close);
    
    this.emitLabel(labelBreak);
    this.scopeLevel--;
  }
}

