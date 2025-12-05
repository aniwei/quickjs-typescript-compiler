import * as ts from 'typescript';
import { ParseState } from './parseState';
import { JSFunctionDef, JSFunctionKind } from './jsFunctionDef';
import { Opcode, JSAtom } from '../env';
import { BytecodeSerializer } from './serializer';

interface ClassFieldsDef {
  fields_init_fd: JSFunctionDef | null;
  computed_fields_count: number;
  need_brand: boolean;
  is_static: boolean;
  brand_push_pos: number;
  private_methods: ts.MethodDeclaration[];
}

export interface CompilerOptions {
  firstAtomId?: number;
  referenceJsSource?: string;
  bigInt?: boolean;
  dump?: boolean;
  shortCode?: boolean;
  debug?: boolean;
  strictMode?: boolean;
  module?: boolean;
}

export class TypeScriptCompiler {
  state: ParseState;
  sourceFile!: ts.SourceFile;
  optionalChainLabels: number[] = [];
  isModule: boolean;

  constructor(options: CompilerOptions = {}) {
    this.state = new ParseState(options.firstAtomId);
    this.isModule = options.module !== false; // Default to true
  }

  async compileFileWithArtifacts(filename: string): Promise<{ bytecode: Uint8Array, functionDef: JSFunctionDef }> {
    const fs = require('fs').promises;
    const content = await fs.readFile(filename, 'utf-8');
    return this.compileInternal(content, filename);
  }

  compile(input: ts.SourceFile | string, filename?: string): Uint8Array {
    return this.compileInternal(input, filename).bytecode;
  }

  private compileInternal(input: ts.SourceFile | string, filename?: string): { bytecode: Uint8Array, functionDef: JSFunctionDef } {
    let sourceFile: ts.SourceFile;
    if (typeof input === 'string') {
      sourceFile = ts.createSourceFile(filename || 'dummy.ts', input, ts.ScriptTarget.ES2020, true);
    } else {
      sourceFile = input;
    }
    this.sourceFile = sourceFile;

    const filenameAtom = this.state.atomManager.getAtom(sourceFile.fileName);
    const fd = JSFunctionDef.create(null, false, false, filenameAtom, 0, 0);
    this.state.cur_func = fd;
    this.state.filename = sourceFile.fileName;

    // js_parse_program logic
    fd.is_global_var = true;
    
    console.log(`Compiler: isModule=${this.isModule}`);

    // Always treat as module for internal structure (vars as closure vars, no locals in serialization)
    // This matches QuickJS WASM output for strict scripts.
    fd.is_module = true; 
    fd.func_kind = JSFunctionKind.JS_FUNC_ASYNC; // Match WASM module behavior
    fd.js_mode = 1; // JS_MODE_STRICT
    fd.func_name = JSAtom.JS_ATOM__eval_; // Match WASM module behavior
    
    console.log(`Compiler: func_kind=${fd.func_kind}`);

    fd.arguments_allowed = true; // Match WASM

    // Add hidden variable for return value
    // fd.eval_ret_idx = fd.add_var(JSAtom.JS_ATOM__ret_);
    
    // Push body scope
    fd.push_scope();
    fd.body_scope = fd.scope_level;

    let labelAsync: number = -1;

    if (this.isModule) {
        // Emit boilerplate for async module ONLY if explicitly requested
        this.emitOp(Opcode.OP_push_this);
        labelAsync = this.newLabel();
        this.emitJump8(Opcode.OP_if_false8, labelAsync);
        this.emitOp(Opcode.OP_return_undef);
        this.emitLabel(labelAsync);
    }

    // Visit statements
    for (const statement of sourceFile.statements) {
      this.visitStatement(statement);
    }

    this.emitOp(Opcode.OP_undefined);
    this.emitOp(Opcode.OP_return_async);
    
    // Serialize
    const serializer = new BytecodeSerializer(this.state.atomManager);
    const bytecode = serializer.serialize(fd);
    return { bytecode, functionDef: fd };
  }

  updateLineNumber(pos: number) {
    if (pos < 0 || !this.state.cur_func) return;
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(pos);
    // Pass 0-based line and column
    this.state.cur_func.update_line_num(line, character);
  }

  hasThisUsage(node: ts.Node): boolean {
    let hasThis = false;
    
    const visit = (n: ts.Node) => {
        if (hasThis) return;
        
        if (n.kind === ts.SyntaxKind.ThisKeyword) {
            hasThis = true;
            return;
        }
        
        // Stop recursion at function boundaries, unless it's an arrow function
        if ((ts.isFunctionDeclaration(n) || ts.isFunctionExpression(n)) && n !== node) {
            return;
        }
        
        ts.forEachChild(n, visit);
    };
    
    ts.forEachChild(node, visit);
    return hasThis;
  }

  addExportEntry(module_name: number, local_name: number, export_name: number) {
      if (!this.state.cur_func?.is_module) return;
      this.state.cur_func.export_entries.push({ module_name, local_name, export_name });
  }
  
  addReqModule(module_name: number) {
      if (!this.state.cur_func?.is_module) return;
      if (!this.state.cur_func.req_module_entries.some(e => e.module_name === module_name)) {
          this.state.cur_func.req_module_entries.push({ module_name, local_name: 0, export_name: 0 });
      }
  }
  
  addStarExportEntry(module_name: number) {
      if (!this.state.cur_func?.is_module) return;
      this.state.cur_func.star_export_entries.push({ module_name, local_name: 0, export_name: 0 });
  }

  addImportEntry(module_name: number, local_name: number, export_name: number) {
      if (!this.state.cur_func?.is_module) return;
      this.state.cur_func.import_entries.push({ module_name, local_name, export_name });
  }
  
  addImportVar(name: number) {
      if (!this.state.cur_func) return;
      this.state.cur_func.add_var(name);
  }

  visitImportDeclaration(node: ts.ImportDeclaration): void {
    if (node.importClause && node.importClause.isTypeOnly) return;
    
    if (!ts.isStringLiteral(node.moduleSpecifier)) return;
    const moduleName = node.moduleSpecifier.text;
    const moduleNameAtom = this.state.atomManager.getAtom(moduleName);
    
    this.addReqModule(moduleNameAtom);
    
    if (node.importClause) {
        if (node.importClause.name) {
            const localName = node.importClause.name.text;
            const localAtom = this.state.atomManager.getAtom(localName);
            const defaultAtom = this.state.atomManager.getAtom("default");
            
            this.addImportEntry(moduleNameAtom, localAtom, defaultAtom);
            this.addImportVar(localAtom);
        }
        
        if (node.importClause.namedBindings) {
            if (ts.isNamedImports(node.importClause.namedBindings)) {
                for (const el of node.importClause.namedBindings.elements) {
                    if (el.isTypeOnly) continue;
                    const localName = el.name.text;
                    const exportName = el.propertyName ? el.propertyName.text : el.name.text;
                    
                    const localAtom = this.state.atomManager.getAtom(localName);
                    const exportAtom = this.state.atomManager.getAtom(exportName);
                    
                    this.addImportEntry(moduleNameAtom, localAtom, exportAtom);
                    this.addImportVar(localAtom);
                }
            } else if (ts.isNamespaceImport(node.importClause.namedBindings)) {
                const localName = node.importClause.namedBindings.name.text;
                const localAtom = this.state.atomManager.getAtom(localName);
                const starAtom = this.state.atomManager.getAtom("*");
                
                this.addImportEntry(moduleNameAtom, localAtom, starAtom);
                this.addImportVar(localAtom);
            }
        }
    }
  }

  visitExportDeclaration(node: ts.ExportDeclaration): void {
    if (node.isTypeOnly) return;

    let moduleNameAtom = 0;
    if (node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const moduleName = node.moduleSpecifier.text;
        moduleNameAtom = this.state.atomManager.getAtom(moduleName);
        this.addReqModule(moduleNameAtom);
    }

    if (node.exportClause) {
        if (ts.isNamedExports(node.exportClause)) {
            for (const el of node.exportClause.elements) {
                if (el.isTypeOnly) continue;
                const localName = el.propertyName ? el.propertyName.text : el.name.text;
                const exportName = el.name.text;
                
                const localAtom = this.state.atomManager.getAtom(localName);
                const exportAtom = this.state.atomManager.getAtom(exportName);
                
                this.addExportEntry(moduleNameAtom, localAtom, exportAtom);
            }
        } else if (ts.isNamespaceExport(node.exportClause)) {
             const exportName = node.exportClause.name.text;
             const exportAtom = this.state.atomManager.getAtom(exportName);
             const starAtom = this.state.atomManager.getAtom("*");
             this.addExportEntry(moduleNameAtom, starAtom, exportAtom);
        }
    } else {
        if (moduleNameAtom) {
            this.addStarExportEntry(moduleNameAtom);
        }
    }
  }

  visitExportAssignment(node: ts.ExportAssignment): void {
      this.visitExpression(node.expression);
      
      const defaultAtom = this.state.atomManager.getAtom("*default*");
      const exportAtom = this.state.atomManager.getAtom("default");
      
      this.addExportEntry(0, defaultAtom, exportAtom);
      
      if (this.state.cur_func) {
          const idx = this.state.cur_func.add_var(defaultAtom);
          if (this.state.cur_func.is_module) {
             if (idx === 0) this.emitOp(Opcode.OP_put_var_ref0);
             else if (idx === 1) this.emitOp(Opcode.OP_put_var_ref1);
             else if (idx === 2) this.emitOp(Opcode.OP_put_var_ref2);
             else if (idx === 3) this.emitOp(Opcode.OP_put_var_ref3);
             else {
                 this.emitOp(Opcode.OP_put_var_ref);
                 this.emitU16(idx);
             }
          } else {
              this.emitOp(Opcode.OP_put_loc);
              this.emitU16(idx);
          }
      }
  }

  enterOptionalChain(node: ts.Node): { label: number, isNew: boolean } {
    if (!ts.isOptionalChain(node)) {
      return { label: -1, isNew: false };
    }
    
    // If we are already inside an optional chain, reuse the existing label
    if (this.optionalChainLabels.length > 0) {
      return { label: this.optionalChainLabels[this.optionalChainLabels.length - 1], isNew: false };
    }
    
    // Start a new optional chain
    const label = this.newLabel();
    this.optionalChainLabels.push(label);
    return { label, isNew: true };
  }

  exitOptionalChain(info: { label: number, isNew: boolean }) {
    if (info.isNew) {
      this.emitLabel(info.label);
      this.optionalChainLabels.pop();
    }
  }

  visitStatement(node: ts.Statement): void {
    this.updateLineNumber(node.getStart(this.sourceFile));
    switch (node.kind) {
      case ts.SyntaxKind.ExpressionStatement:
        this.visitExpression((node as ts.ExpressionStatement).expression, false);
        break;
      case ts.SyntaxKind.VariableStatement:
        this.visitVariableStatement(node as ts.VariableStatement);
        break;
      case ts.SyntaxKind.Block:
        this.visitBlock(node as ts.Block);
        break;
      case ts.SyntaxKind.IfStatement:
        this.visitIfStatement(node as ts.IfStatement);
        break;
      case ts.SyntaxKind.WhileStatement:
        this.visitWhileStatement(node as ts.WhileStatement);
        break;
      case ts.SyntaxKind.DoStatement:
        this.visitDoStatement(node as ts.DoStatement);
        break;
      case ts.SyntaxKind.BreakStatement:
        this.visitBreakStatement(node as ts.BreakStatement);
        break;
      case ts.SyntaxKind.ContinueStatement:
        this.visitContinueStatement(node as ts.ContinueStatement);
        break;
      case ts.SyntaxKind.ForStatement:
        this.visitForStatement(node as ts.ForStatement);
        break;
      case ts.SyntaxKind.ThrowStatement:
        this.visitThrowStatement(node as ts.ThrowStatement);
        break;
      case ts.SyntaxKind.TryStatement:
        this.visitTryStatement(node as ts.TryStatement);
        break;
      case ts.SyntaxKind.SwitchStatement:
        this.visitSwitchStatement(node as ts.SwitchStatement);
        break;
      case ts.SyntaxKind.ReturnStatement:
        this.visitReturnStatement(node as ts.ReturnStatement);
        break;
      case ts.SyntaxKind.FunctionDeclaration:
        this.visitFunctionDeclaration(node as ts.FunctionDeclaration);
        break;
      case ts.SyntaxKind.ClassDeclaration:
        this.visitClassDeclaration(node as ts.ClassDeclaration);
        break;
      case ts.SyntaxKind.ForInStatement:
        this.visitForInStatement(node as ts.ForInStatement);
        break;
      case ts.SyntaxKind.ForOfStatement:
        this.visitForOfStatement(node as ts.ForOfStatement);
        break;
      case ts.SyntaxKind.ImportDeclaration:
        this.visitImportDeclaration(node as ts.ImportDeclaration);
        break;
      case ts.SyntaxKind.ExportDeclaration:
        this.visitExportDeclaration(node as ts.ExportDeclaration);
        break;
      case ts.SyntaxKind.ExportAssignment:
        this.visitExportAssignment(node as ts.ExportAssignment);
        break;
      // TODO: Other statements
    }
  }

  visitBlock(node: ts.Block): void {
    if (!this.state.cur_func) {
        for (const stmt of node.statements) {
            this.visitStatement(stmt);
        }
        return;
    }

    this.state.cur_func.push_scope();
    
    for (const stmt of node.statements) {
      this.visitStatement(stmt);
    }
    
    const vars = this.state.cur_func.pop_scope();
    for (const v of vars) {
        if (v.def.is_captured) {
            this.emitOp(Opcode.OP_close_loc);
            this.emitU16(v.idx);
        }
    }
  }

  visitIfStatement(node: ts.IfStatement): void {
    this.visitExpression(node.expression);
    const labelElse = this.newLabel();
    const labelEnd = this.newLabel();
    
    this.emitJump(Opcode.OP_if_false, labelElse);
    
    this.visitStatement(node.thenStatement);
    this.emitJump(Opcode.OP_goto, labelEnd);
    
    this.emitLabel(labelElse);
    if (node.elseStatement) {
      this.visitStatement(node.elseStatement);
    }
    
    this.emitLabel(labelEnd);
  }

  visitWhileStatement(node: ts.WhileStatement): void {
    const labelCont = this.newLabel();
    const labelBreak = this.newLabel();
    
    this.state.cur_func!.pushBreakEntry(0, labelBreak, labelCont, -1, this.state.cur_func!.scope_level);
    
    this.emitLabel(labelCont);
    this.visitExpression(node.expression);
    this.emitJump(Opcode.OP_if_false, labelBreak);
    
    this.visitStatement(node.statement);
    
    this.emitJump(Opcode.OP_goto, labelCont);
    this.emitLabel(labelBreak);
    
    this.state.cur_func!.popBreakEntry();
  }

  visitDoStatement(node: ts.DoStatement): void {
    const labelCont = this.newLabel();
    const labelBreak = this.newLabel();
    const labelStart = this.newLabel();

    this.state.cur_func!.pushBreakEntry(0, labelBreak, labelCont, -1, this.state.cur_func!.scope_level);
    
    this.emitLabel(labelStart);
    this.visitStatement(node.statement);
    
    this.emitLabel(labelCont);
    this.visitExpression(node.expression);
    this.emitJump(Opcode.OP_if_true, labelStart);
    
    this.emitLabel(labelBreak);
    this.state.cur_func!.popBreakEntry();
  }

  visitBreakStatement(node: ts.BreakStatement): void {
    let labelName = 0;
    if (node.label) {
        labelName = this.state.atomManager.getAtom(node.label.text);
    }
    
    let env = this.state.cur_func!.top_break;
    
    while (env) {
        if (labelName) {
            if (env.label_name === labelName) {
                break;
            }
        } else {
            if (env.label_break !== -1) {
                break;
            }
        }
        
        if (env.has_iterator) {
            this.emitOp(Opcode.OP_iterator_close);
        } else {
            for (let i = 0; i < env.drop_count; i++) {
                this.emitOp(Opcode.OP_drop);
            }
        }
        
        env = env.prev;
    }
    
    if (env && env.label_break !== -1) {
        if (env.has_iterator) {
            this.emitOp(Opcode.OP_iterator_close);
        } else {
            for (let i = 0; i < env.drop_count; i++) {
                this.emitOp(Opcode.OP_drop);
            }
        }
        this.emitJump(Opcode.OP_goto, env.label_break);
    } else {
        // Error
    }
  }

  visitContinueStatement(node: ts.ContinueStatement): void {
    let labelName = 0;
    if (node.label) {
        labelName = this.state.atomManager.getAtom(node.label.text);
    }
    
    let env = this.state.cur_func!.top_break;
    
    while (env) {
        if (labelName) {
            if (env.label_name === labelName) {
                break;
            }
        } else {
            if (env.label_cont !== -1) {
                break;
            }
        }
        
        if (env.has_iterator) {
            this.emitOp(Opcode.OP_iterator_close);
        } else {
            for (let i = 0; i < env.drop_count; i++) {
                this.emitOp(Opcode.OP_drop);
            }
        }
        
        env = env.prev;
    }
    
    if (env && env.label_cont !== -1) {
        this.emitJump(Opcode.OP_goto, env.label_cont);
    } else {
        // Error
    }
  }

  visitVariableStatement(node: ts.VariableStatement): void {
    const isExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword) || false;
    this.visitVariableDeclarationList(node.declarationList, isExport);
  }

  visitVariableDeclarationList(node: ts.VariableDeclarationList, isExport: boolean = false): void {
    const isConst = (node.flags & ts.NodeFlags.Const) !== 0;
    const isLet = (node.flags & ts.NodeFlags.Let) !== 0;

    for (const decl of node.declarations) {
      if (decl.initializer) {
        this.visitExpression(decl.initializer);
        
        if (ts.isIdentifier(decl.name) && 
            (ts.isFunctionExpression(decl.initializer) || 
             ts.isArrowFunction(decl.initializer) || 
             ts.isClassExpression(decl.initializer))) {
             const name = decl.name.text;
             const atom = this.state.atomManager.getAtom(name);
             this.emitOp(Opcode.OP_set_name);
             this.emitAtom(atom);
        }
      } else {
        this.emitOp(Opcode.OP_undefined);
      }

      if (ts.isIdentifier(decl.name)) {
        const name = decl.name.text;
        const atom = this.state.atomManager.getAtom(name);
        
        if (isExport) {
            this.addExportEntry(0, atom, atom);
        }
        
        // Add to current function scope
        if (!this.state.cur_func) throw new Error("No function");
        const idx = this.state.cur_func.add_var(atom);
        
        if (isConst) {
            this.state.cur_func.set_var_const(idx, true);
            this.state.cur_func.set_var_lexical(idx, true);
        } else if (isLet) {
            this.state.cur_func.set_var_lexical(idx, true);
        }
        
        this.emitPutVar(idx);
      } else {
        this.visitBindingPattern(decl.name);
      }
    }
  }

  visitBindingPattern(node: ts.BindingPattern): void {
    if (ts.isObjectBindingPattern(node)) {
        this.emitOp(Opcode.OP_to_object);
        for (const el of node.elements) {
            let propName = "";
            if (el.propertyName) {
                if (ts.isIdentifier(el.propertyName)) {
                    propName = el.propertyName.text;
                }
            } else {
                if (ts.isIdentifier(el.name)) {
                    propName = el.name.text;
                }
            }
            
            const atom = this.state.atomManager.getAtom(propName);
            this.emitOp(Opcode.OP_get_field2);
            this.emitAtom(atom);
            
            if (el.initializer) {
                this.emitOp(Opcode.OP_dup);
                this.emitOp(Opcode.OP_undefined);
                this.emitOp(Opcode.OP_strict_eq);
                const labelSkip = this.newLabel();
                this.emitJump(Opcode.OP_if_false, labelSkip);
                this.emitOp(Opcode.OP_drop);
                this.visitExpression(el.initializer);
                this.emitLabel(labelSkip);
            }
            
            if (ts.isIdentifier(el.name)) {
                const name = el.name.text;
                const atom = this.state.atomManager.getAtom(name);
                const idx = this.state.cur_func!.add_var(atom);
                this.emitPutVar(idx);
            } else {
                this.visitBindingPattern(el.name);
            }
        }
        this.emitOp(Opcode.OP_drop);
    } else if (ts.isArrayBindingPattern(node)) {
        this.emitOp(Opcode.OP_for_of_start);
        for (const el of node.elements) {
            if (ts.isOmittedExpression(el)) {
                this.emitOp(Opcode.OP_for_of_next);
                this.emitU8(0);
                this.emitOp(Opcode.OP_drop);
                this.emitOp(Opcode.OP_drop);
                continue;
            }
            
            this.emitOp(Opcode.OP_for_of_next);
            this.emitU8(0);
            this.emitOp(Opcode.OP_drop);
            
            if (el.initializer) {
                this.emitOp(Opcode.OP_dup);
                this.emitOp(Opcode.OP_undefined);
                this.emitOp(Opcode.OP_strict_eq);
                const labelSkip = this.newLabel();
                this.emitJump(Opcode.OP_if_false, labelSkip);
                this.emitOp(Opcode.OP_drop);
                this.visitExpression(el.initializer);
                this.emitLabel(labelSkip);
            }
            
            if (ts.isIdentifier(el.name)) {
                const name = el.name.text;
                const atom = this.state.atomManager.getAtom(name);
                const idx = this.state.cur_func!.add_var(atom);
                this.emitPutVar(idx);
            } else {
                this.visitBindingPattern(el.name);
            }
        }
        this.emitOp(Opcode.OP_iterator_close);
    }
  }

  visitForStatement(node: ts.ForStatement): void {
    const labelStart = this.newLabel();
    const labelCont = this.newLabel();
    const labelBreak = this.newLabel();
    
    this.state.cur_func!.pushBreakEntry(0, labelBreak, labelCont, -1, this.state.cur_func!.scope_level);
    
    if (node.initializer) {
        if (ts.isVariableDeclarationList(node.initializer)) {
             this.visitVariableDeclarationList(node.initializer);
        } else {
             this.visitExpression(node.initializer);
             this.emitOp(Opcode.OP_drop);
        }
    }
    
    this.emitLabel(labelStart);
    
    if (node.condition) {
        this.visitExpression(node.condition);
        this.emitJump(Opcode.OP_if_false, labelBreak);
    }
    
    this.visitStatement(node.statement);
    
    this.emitLabel(labelCont);
    if (node.incrementor) {
        this.visitExpression(node.incrementor);
        this.emitOp(Opcode.OP_drop);
    }
    
    this.emitJump(Opcode.OP_goto, labelStart);
    
    this.emitLabel(labelBreak);
    this.state.cur_func!.popBreakEntry();
  }

  visitThrowStatement(node: ts.ThrowStatement): void {
    this.visitExpression(node.expression);
    this.emitOp(Opcode.OP_throw);
  }

  visitTryStatement(node: ts.TryStatement): void {
    const labelCatch = this.newLabel();
    const labelEnd = this.newLabel();
    
    this.emitJump(Opcode.OP_catch, labelCatch);
    
    this.visitBlock(node.tryBlock);
    
    this.emitOp(Opcode.OP_drop); // Drop catch handler
    this.emitJump(Opcode.OP_goto, labelEnd);
    
    this.emitLabel(labelCatch);
    if (node.catchClause) {
        if (node.catchClause.variableDeclaration) {
            const decl = node.catchClause.variableDeclaration;
            if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text;
                const atom = this.state.atomManager.getAtom(name);
                const idx = this.state.cur_func!.add_var(atom);
                this.emitPutVar(idx);
            } else {
                this.visitBindingPattern(decl.name);
            }
        } else {
            this.emitOp(Opcode.OP_drop);
        }
        
        this.visitBlock(node.catchClause.block);
    } else {
        this.emitOp(Opcode.OP_drop);
    }
    
    this.emitLabel(labelEnd);
    
    if (node.finallyBlock) {
        this.visitBlock(node.finallyBlock);
    }
  }

  visitForInStatement(node: ts.ForInStatement): void {
    const labelBreak = this.newLabel();
    const labelNext = this.newLabel();
    const labelBody = this.newLabel();
    
    this.visitExpression(node.expression);
    this.emitOp(Opcode.OP_for_in_start);
    
    this.state.cur_func!.pushBreakEntry(0, labelBreak, labelNext, -1, this.state.cur_func!.scope_level);
    this.state.cur_func!.top_break!.drop_count = 1;
    
    this.emitJump(Opcode.OP_goto, labelNext);
    
    this.emitLabel(labelBody);
    
    if (ts.isVariableDeclarationList(node.initializer)) {
        for (const decl of node.initializer.declarations) {
            if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text;
                const atom = this.state.atomManager.getAtom(name);
                const idx = this.state.cur_func!.add_var(atom);
                this.emitPutVar(idx);
            } else {
                this.visitBindingPattern(decl.name);
            }
        }
    } else if (ts.isIdentifier(node.initializer)) {
        const name = node.initializer.text;
        const atom = this.state.atomManager.getAtom(name);
        // TODO: Check if local
        this.emitOp(Opcode.OP_put_var);
        this.emitAtom(atom);
    } else {
        this.emitOp(Opcode.OP_drop);
    }
    
    this.visitStatement(node.statement);
    
    this.emitLabel(labelNext);
    this.emitOp(Opcode.OP_for_in_next);
    this.emitJump(Opcode.OP_if_false, labelBody);
    
    this.emitOp(Opcode.OP_drop);
    this.emitOp(Opcode.OP_drop);
    
    this.emitLabel(labelBreak);
    this.state.cur_func!.popBreakEntry();
  }

  visitForOfStatement(node: ts.ForOfStatement): void {
    const labelBreak = this.newLabel();
    const labelNext = this.newLabel();
    const labelBody = this.newLabel();
    
    this.visitExpression(node.expression);
    this.emitOp(Opcode.OP_for_of_start);
    
    this.state.cur_func!.pushBreakEntry(0, labelBreak, labelNext, -1, this.state.cur_func!.scope_level);
    this.state.cur_func!.top_break!.has_iterator = true;
    
    this.emitJump(Opcode.OP_goto, labelNext);
    
    this.emitLabel(labelBody);
    
    if (ts.isVariableDeclarationList(node.initializer)) {
        for (const decl of node.initializer.declarations) {
            if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text;
                const atom = this.state.atomManager.getAtom(name);
                const idx = this.state.cur_func!.add_var(atom);
                this.emitPutVar(idx);
            } else {
                this.visitBindingPattern(decl.name);
            }
        }
    } else if (ts.isIdentifier(node.initializer)) {
        const name = node.initializer.text;
        const atom = this.state.atomManager.getAtom(name);
        this.emitOp(Opcode.OP_put_var);
        this.emitAtom(atom);
    } else {
        this.emitOp(Opcode.OP_drop);
    }
    
    this.visitStatement(node.statement);
    
    this.emitLabel(labelNext);
    this.emitOp(Opcode.OP_for_of_next);
    this.emitU8(0);
    this.emitJump(Opcode.OP_if_false, labelBody);
    
    this.emitOp(Opcode.OP_drop); // value
    this.emitOp(Opcode.OP_iterator_close);
    
    this.emitLabel(labelBreak);
    this.state.cur_func!.popBreakEntry();
  }

  visitSwitchStatement(node: ts.SwitchStatement): void {
    const labelBreak = this.newLabel();
    
    this.state.cur_func!.pushBreakEntry(0, labelBreak, -1, -1, this.state.cur_func!.scope_level);
    
    this.visitExpression(node.expression);
    
    const caseLabels: number[] = [];
    let defaultIndex = -1;
    
    for (let i = 0; i < node.caseBlock.clauses.length; i++) {
        const clause = node.caseBlock.clauses[i];
        const labelCase = this.newLabel();
        caseLabels.push(labelCase);
        
        if (ts.isCaseClause(clause)) {
            this.emitOp(Opcode.OP_dup);
            this.visitExpression(clause.expression);
            this.emitOp(Opcode.OP_strict_eq);
            this.emitJump(Opcode.OP_if_true, labelCase);
        } else {
            defaultIndex = i;
        }
    }
    
    if (defaultIndex !== -1) {
        this.emitJump(Opcode.OP_goto, caseLabels[defaultIndex]);
    } else {
        this.emitJump(Opcode.OP_goto, labelBreak);
    }
    
    for (let i = 0; i < node.caseBlock.clauses.length; i++) {
        const clause = node.caseBlock.clauses[i];
        this.emitLabel(caseLabels[i]);
        
        for (const stmt of clause.statements) {
            this.visitStatement(stmt);
        }
    }
    
    this.emitLabel(labelBreak);
    this.emitOp(Opcode.OP_drop);
    
    this.state.cur_func!.popBreakEntry();
  }

  visitReturnStatement(node: ts.ReturnStatement): void {
    let hasValue = false;
    if (node.expression) {
        this.visitExpression(node.expression);
        hasValue = true;
    }
    
    const isAsync = this.state.cur_func?.func_kind === JSFunctionKind.JS_FUNC_ASYNC ||
                    this.state.cur_func?.func_kind === JSFunctionKind.JS_FUNC_GENERATOR ||
                    this.state.cur_func?.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR;
    
    let env = this.state.cur_func!.top_break;
    if (env) {
        if (hasValue) {
            let retIdx = this.state.cur_func!.eval_ret_idx;
            if (retIdx === -1) {
                const atom = this.state.atomManager.getAtom("_ret_");
                retIdx = this.state.cur_func!.add_var(atom);
                this.state.cur_func!.eval_ret_idx = retIdx;
            }
            this.emitOp(Opcode.OP_put_loc);
            this.emitU16(retIdx);
        }
        
        while (env) {
            if (env.has_iterator) {
                this.emitOp(Opcode.OP_iterator_close);
            } else {
                for (let i = 0; i < env.drop_count; i++) {
                    this.emitOp(Opcode.OP_drop);
                }
            }
            env = env.prev;
        }
        
        if (hasValue) {
            const retIdx = this.state.cur_func!.eval_ret_idx;
            this.emitOp(Opcode.OP_get_loc);
            this.emitU16(retIdx);
            if (isAsync) this.emitOp(Opcode.OP_return_async);
            else this.emitOp(Opcode.OP_return);
        } else {
            if (isAsync) {
                this.emitOp(Opcode.OP_undefined);
                this.emitOp(Opcode.OP_return_async);
            } else {
                this.emitOp(Opcode.OP_return_undef);
            }
        }
    } else {
        if (hasValue) {
            if (isAsync) this.emitOp(Opcode.OP_return_async);
            else this.emitOp(Opcode.OP_return);
        } else {
            if (isAsync) {
                this.emitOp(Opcode.OP_undefined);
                this.emitOp(Opcode.OP_return_async);
            } else {
                this.emitOp(Opcode.OP_return_undef);
            }
        }
    }
  }

  visitClassDeclaration(node: ts.ClassDeclaration): void {
    if (!this.state.cur_func) return;

    let className = 'default';
    if (node.name) {
        className = node.name.text;
    } else {
        const isDefault = node.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword);
        if (isDefault) {
            className = "*default*";
        }
    }
    const classNameAtom = this.state.atomManager.getAtom(className);

    const isExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    const isDefault = node.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword);
    
    if (isExport) {
        if (isDefault) {
            const exportAtom = this.state.atomManager.getAtom("default");
            this.addExportEntry(0, classNameAtom, exportAtom);
        } else {
            this.addExportEntry(0, classNameAtom, classNameAtom);
        }
    }

    // 1. Push scope for class name
    this.state.cur_func.push_scope();

    // 2. Define class name variable (const)
    const classNameVarIdx = this.state.cur_func.add_var(classNameAtom);

    // 3. Handle extends
    let classFlags = 0;
    if (node.heritageClauses && node.heritageClauses.length > 0) {
        const extendsClause = node.heritageClauses[0];
        if (extendsClause.token === ts.SyntaxKind.ExtendsKeyword && extendsClause.types.length > 0) {
            classFlags = 1; // JS_DEFINE_CLASS_HAS_HERITAGE
            this.visitExpression(extendsClause.types[0].expression);
        } else {
            this.emitOp(Opcode.OP_undefined);
        }
    } else {
        this.emitOp(Opcode.OP_undefined);
    }

    // 4. Push scope for private fields (and class body?)
    this.state.cur_func.push_scope();

    // 5. Placeholder for constructor
    this.emitOp(Opcode.OP_push_const);
    const ctorPlaceholderOffset = this.state.cur_func.byte_code.getOffset();
    this.emitU32(0); // Will be patched

    // 6. Define class
    this.emitOp(Opcode.OP_define_class);
    this.emitAtom(classNameAtom);
    this.emitU8(classFlags);

    // 6.5 Define private symbols
    for (const member of node.members) {
        if (member.name && ts.isPrivateIdentifier(member.name)) {
            const name = member.name.text;
            const atom = this.state.atomManager.getAtom(name);
            this.emitOp(Opcode.OP_private_symbol);
            this.emitAtom(atom);
            this.state.cur_func.add_var(atom); // JS_VAR_DEF_CONST
            this.emitOp(Opcode.OP_put_var_init);
            this.emitAtom(atom);
        }
    }

    // Initialize ClassFieldsDef
    const classFields: ClassFieldsDef[] = [
        { fields_init_fd: null, computed_fields_count: 0, need_brand: false, is_static: false, brand_push_pos: -1, private_methods: [] },
        { fields_init_fd: null, computed_fields_count: 0, need_brand: false, is_static: true, brand_push_pos: -1, private_methods: [] }
    ];

    // 7. Process members
    let ctorFuncDef: JSFunctionDef | null = null;

    for (const member of node.members) {
        if (ts.isConstructorDeclaration(member)) {
            ctorFuncDef = this.compileClassConstructor(member, classNameAtom, classFlags);
        } else if (ts.isMethodDeclaration(member)) {
            const isStatic = member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) || false;
            if (member.name && ts.isPrivateIdentifier(member.name)) {
                 classFields[isStatic ? 1 : 0].private_methods.push(member);
            } else {
                 this.compileClassMethod(member, isStatic);
            }
        } else if (ts.isPropertyDeclaration(member)) {
            const isStatic = member.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) || false;
            const cf = classFields[isStatic ? 1 : 0];
            this.compileClassField(member, cf, isStatic);
        }
    }

    // If no constructor, create default
    if (!ctorFuncDef) {
        ctorFuncDef = this.createDefaultConstructor(classNameAtom, classFlags);
    }

    // Patch constructor placeholder
    const ctorIdx = this.state.cur_func.cpool.length;
    this.state.cur_func.cpool.push(ctorFuncDef);
    
    this.state.cur_func.byte_code.buf.writeU32At(ctorPlaceholderOffset, ctorIdx);

    // 8. Finalize fields init
    // Instance fields
    const instanceCf = classFields[0];
    
    // Compile private instance methods if any
    if (instanceCf.private_methods.length > 0) {
        if (!instanceCf.fields_init_fd) {
            this.emitClassInitStart(instanceCf);
        }
        const prevFunc = this.state.cur_func;
        this.state.cur_func = instanceCf.fields_init_fd!;
        
        for (const method of instanceCf.private_methods) {
             this.compileClassMethod(method, false); 
        }
        this.state.cur_func = prevFunc;
    }

    const classFieldsInitAtom = JSAtom.JS_ATOM_class_fields_init;
    const classFieldsInitVarIdx = this.state.cur_func.add_var(classFieldsInitAtom); // JS_VAR_DEF_CONST
    
    if (instanceCf.fields_init_fd) {
        this.emitClassInitEnd(instanceCf);
    } else {
        this.emitOp(Opcode.OP_undefined);
    }
    this.emitOp(Opcode.OP_put_loc);
    this.emitU16(classFieldsInitVarIdx);

    // Drop prototype (pushed by define_class)
    this.emitOp(Opcode.OP_drop);

    // Static fields
    const staticCf = classFields[1];
    
    // Compile private static methods if any
    if (staticCf.private_methods.length > 0) {
        if (!staticCf.fields_init_fd) {
            this.emitClassInitStart(staticCf);
        }
        const prevFunc = this.state.cur_func;
        this.state.cur_func = staticCf.fields_init_fd!;
        
        for (const method of staticCf.private_methods) {
             this.compileClassMethod(method, true); 
        }
        this.state.cur_func = prevFunc;
    }

    if (staticCf.fields_init_fd) {
        this.emitOp(Opcode.OP_dup); // Duplicate class constructor
        this.emitClassInitEnd(staticCf);
        this.emitOp(Opcode.OP_call_method);
        this.emitU16(0);
        this.emitOp(Opcode.OP_drop);
    }

    // 9. Pop scopes
    this.state.cur_func.pop_scope(); // Private scope
    this.state.cur_func.pop_scope(); // Class name scope
    
    // 10. Store class in variable
    this.emitOp(Opcode.OP_dup); // Duplicate ctor
    this.emitPutVar(classNameVarIdx);
    
    this.emitOp(Opcode.OP_set_proto);
  }

  emitClassInitStart(cf: ClassFieldsDef): void {
    const fd = JSFunctionDef.create(this.state.cur_func, false, false, this.state.cur_func!.filename);
    fd.func_kind = JSFunctionKind.JS_FUNC_NORMAL;
    fd.has_home_object = true;
    fd.has_this_binding = true;
    // TODO: Set JS_PARSE_FUNC_CLASS_FIELDS_INIT type if needed
    
    cf.fields_init_fd = fd;
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    // Setup 'this'
    // In QuickJS, it seems it doesn't explicitly add 'this' var here?
    // But emit_class_init_start emits OP_scope_get_var this.
    // Wait, if it's a new function, it has its own scope.
    // If it uses OP_scope_get_var this, it means it captures 'this' from parent?
    // But 'this' is usually a local variable (var 0).
    // If fields_init_fd is a separate function, it should have its own 'this'.
    // Ah, emit_class_init_end emits OP_set_home_object.
    // And it's called with OP_call_method.
    // So 'this' should be available as argument/this binding.
    
    // Let's add 'this' var.
    const thisAtom = this.state.atomManager.getAtom("this");
    const thisVarIdx = fd.add_var(thisAtom);
    fd.this_var_idx = thisVarIdx;
    
    this.state.cur_func = prevFunc;
  }

  emitClassInitEnd(cf: ClassFieldsDef): void {
    if (!cf.fields_init_fd) return;
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = cf.fields_init_fd;
    this.emitOp(Opcode.OP_return_undef);
    cf.fields_init_fd.finalizeBody();
    this.state.cur_func = prevFunc;
    
    const funcIdx = this.state.cur_func!.cpool.length;
    this.state.cur_func!.cpool.push(cf.fields_init_fd);
    
    this.emitOp(Opcode.OP_fclosure);
    this.emitU32(funcIdx);
    this.emitOp(Opcode.OP_set_home_object);
  }

  compileClassField(node: ts.PropertyDeclaration, cf: ClassFieldsDef, isStatic: boolean): void {
    let name = "";
    let isPrivate = false;
    
    if (ts.isIdentifier(node.name)) {
        name = node.name.text;
    } else if (ts.isPrivateIdentifier(node.name)) {
        name = node.name.text;
        isPrivate = true;
    } else {
        // TODO: Computed names
        return;
    }
    
    const atom = this.state.atomManager.getAtom(name);

    if (!cf.fields_init_fd) {
        this.emitClassInitStart(cf);
    }

    const prevFunc = this.state.cur_func;
    this.state.cur_func = cf.fields_init_fd!;

    // Get 'this'
    this.emitGetVar(this.state.atomManager.getAtom("this"));
    
    if (isPrivate) {
        // Get private symbol
        this.emitGetVar(atom);
    }

    if (node.initializer) {
        this.visitExpression(node.initializer);
    } else {
        this.emitOp(Opcode.OP_undefined);
    }

    if (isPrivate) {
        this.emitOp(Opcode.OP_swap);
        this.emitOp(Opcode.OP_define_private_field);
    } else {
        this.emitOp(Opcode.OP_define_field);
        this.emitAtom(atom);
    }

    this.state.cur_func = prevFunc;
  }

  emitClassFieldInit(): void {
    const classFieldsInitAtom = JSAtom.JS_ATOM_class_fields_init;
    
    this.emitGetVar(classFieldsInitAtom);
    
    this.emitOp(Opcode.OP_dup);
    const labelNext = this.newLabel();
    this.emitJump(Opcode.OP_if_false, labelNext);
    
    this.emitGetVar(this.state.atomManager.getAtom("this"));
    
    this.emitOp(Opcode.OP_swap);
    this.emitOp(Opcode.OP_call_method);
    this.emitU16(0);
    this.emitOp(Opcode.OP_drop);
    
    this.emitLabel(labelNext);
    this.emitOp(Opcode.OP_drop); // Drop the duplicated class_fields_init (which was false)
  }

  compileClassConstructor(node: ts.ConstructorDeclaration, className: JSAtom, classFlags: number): JSFunctionDef {
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(node.pos);
    const fd = JSFunctionDef.create(this.state.cur_func, false, false, this.state.cur_func!.filename, line, character);
    fd.func_name = className;
    fd.is_derived_class_constructor = (classFlags & 1) !== 0;
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    if (fd.is_derived_class_constructor) {
        // Derived constructor setup
        // 0: this.active_func
        // 1: new.target
        // 2: this
        const activeFuncAtom = this.state.atomManager.getAtom("this.active_func");
        fd.add_var(activeFuncAtom); // 0
        
        const newTargetAtom = this.state.atomManager.getAtom("new.target");
        fd.add_var(newTargetAtom); // 1
        
        const thisAtom = this.state.atomManager.getAtom("this");
        const thisVarIdx = fd.add_var(thisAtom); // 2
        fd.this_var_idx = thisVarIdx;
        
        // Initialization code
        this.emitOp(Opcode.OP_special_object);
        this.emitU8(2); // OP_SPECIAL_OBJECT_THIS_FUNC
        this.emitOp(Opcode.OP_put_loc0);
        
        this.emitOp(Opcode.OP_special_object);
        this.emitU8(3); // OP_SPECIAL_OBJECT_NEW_TARGET
        this.emitOp(Opcode.OP_put_loc1);
        
        this.emitOp(Opcode.OP_set_loc_uninitialized);
        this.emitU16(thisVarIdx);
        
        this.emitOp(Opcode.OP_check_ctor);
    } else {
        // Base constructor setup
        const thisAtom = this.state.atomManager.getAtom("this");
        const thisVarIdx = fd.add_var(thisAtom);
        fd.this_var_idx = thisVarIdx;
        
        this.emitOp(Opcode.OP_push_this);
        this.emitOp(Opcode.OP_put_loc0);
        
        this.emitOp(Opcode.OP_check_ctor);
        this.emitClassFieldInit();
    }
    
    for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
            const paramName = param.name.text;
            const paramAtom = this.state.atomManager.getAtom(paramName);
            fd.add_arg(paramAtom);
        }
    }
    
    if (node.body) {
        this.visitBlock(node.body);
    }
    
    // Implicit return for derived constructor
    if (fd.is_derived_class_constructor) {
        this.emitOp(Opcode.OP_get_loc_checkthis);
        this.emitU16(fd.this_var_idx);
        this.emitOp(Opcode.OP_return);
    } else {
        this.emitOp(Opcode.OP_return_undef);
    }
    
    fd.finalizeBody();
    this.state.cur_func = prevFunc;
    return fd;
  }

  createDefaultConstructor(className: JSAtom, classFlags: number): JSFunctionDef {
    const fd = JSFunctionDef.create(this.state.cur_func, false, false, this.state.cur_func!.filename);
    fd.func_name = className;
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    if (classFlags & 1) {
        // Derived
        this.emitOp(Opcode.OP_return_undef);
    } else {
        // Base
        this.emitOp(Opcode.OP_check_ctor);
        this.emitClassFieldInit();
        this.emitOp(Opcode.OP_return_undef);
    }
    
    fd.finalizeBody();
    this.state.cur_func = prevFunc;
    return fd;
  }

  compileClassMethod(node: ts.MethodDeclaration, isStatic: boolean): void {
    let methodName = "";
    let isPrivate = false;
    
    if (ts.isIdentifier(node.name)) {
        methodName = node.name.text;
    } else if (ts.isPrivateIdentifier(node.name)) {
        methodName = node.name.text;
        isPrivate = true;
    } else {
        return;
    }
    
    const methodAtom = this.state.atomManager.getAtom(methodName);
    
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(node.pos);
    const fd = JSFunctionDef.create(this.state.cur_func, false, false, this.state.cur_func!.filename, line, character);
    fd.func_name = methodAtom;
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    const thisAtom = this.state.atomManager.getAtom("this");
    const thisVarIdx = fd.add_var(thisAtom);
    fd.this_var_idx = thisVarIdx;
    
    for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
            const paramName = param.name.text;
            const paramAtom = this.state.atomManager.getAtom(paramName);
            fd.add_arg(paramAtom);
        }
    }
    
    if (node.body) {
        this.visitBlock(node.body);
    }
    
    this.emitOp(Opcode.OP_return_undef);
    
    fd.finalizeBody();
    this.state.cur_func = prevFunc;
    
    if (!this.state.cur_func) return; // Should not happen

    const methodIdx = this.state.cur_func.cpool.length;
    this.state.cur_func.cpool.push(fd);
    
    if (methodIdx < 256) {
        this.emitOp(Opcode.OP_fclosure8);
        this.emitU8(methodIdx);
    } else {
        this.emitOp(Opcode.OP_fclosure);
        this.emitU32(methodIdx);
    }
    
    if (isStatic) {
        this.emitOp(Opcode.OP_swap);
    }

    if (isPrivate) {
        // Private methods are stored as private fields with function value
        // Stack: [func]
        // We need: [this, func, symbol]
        this.emitGetVar(this.state.atomManager.getAtom("this")); // [func, this]
        this.emitOp(Opcode.OP_swap); // [this, func]
        this.emitGetVar(methodAtom); // [this, func, symbol]
        this.emitOp(Opcode.OP_define_private_field);
    } else {
        this.emitOp(Opcode.OP_define_method);
        this.emitAtom(methodAtom);
        this.emitU8(0); // OP_DEFINE_METHOD_METHOD
    }

    if (isStatic && !isPrivate) {
        // define_method consumes the class object if it's static?
        // No, define_method(obj, atom, flags)
        // It takes obj from stack.
        // If static, obj is the class constructor.
        // We swapped it to top.
        // After define_method, obj is still there?
        // QuickJS define_method:
        //   obj = stack[-2]
        //   val = stack[-1]
        //   ...
        //   stack[-1] = obj (if keep_obj?) No, it usually consumes val and keeps obj?
        //   Wait, define_method usually consumes the function value.
        //   Does it consume the object?
        //   OP_define_method:
        //     obj = stack[-2]
        //     val = stack[-1]
        //     ...
        //     pop val
        //     (obj remains)
        
        // So if static, we swapped: [class, func] -> [func, class]
        // Wait, define_method expects [obj, func] on stack?
        // Let's check OP_define_method implementation in QuickJS.
        // case OP_define_method:
        //   obj = sp[-2];
        //   val = sp[-1];
        //   ...
        //   sp--; // Pop val
        
        // So stack should be [obj, val].
        // If static, we have [class, func].
        // So we DON'T need swap if we want [class, func].
        // Why did I have swap before?
        // "if (isStatic) this.emitOp(Opcode.OP_swap);"
        // Maybe I thought stack was [func, class]?
        // Let's trace:
        //   define_class pushes class constructor (and prototype).
        //   Stack: [ctor, proto]
        //   We are inside visitClassDeclaration loop.
        //   Wait, define_class pushes [ctor, proto].
        //   If static, we want to define on ctor.
        //   If instance, we want to define on proto.
        
        // In visitClassDeclaration:
        //   emitOp(Opcode.OP_define_class);
        //   Stack: [ctor, proto]
        
        //   compileClassMethod is called.
        //   It emits fclosure (pushes func).
        //   Stack: [ctor, proto, func]
        
        //   If instance method:
        //     We want define_method(proto, func).
        //     Stack is [ctor, proto, func].
        //     This matches [obj, val] for the top 2 elements.
        //     So define_method works on proto. Correct.
        
        //   If static method:
        //     We want define_method(ctor, func).
        //     Stack is [ctor, proto, func].
        //     We need [proto, ctor, func] ? No.
        //     We need [..., ctor, func].
        //     But proto is in the way.
        //     We need to swap proto and func? No.
        //     We need to bring ctor to below func.
        //     Stack: [ctor, proto, func]
        //     OP_swap (top 2): [ctor, func, proto] -> Wrong.
        //     OP_rot3l: [proto, func, ctor] -> Wrong.
        //     OP_rot3r: [func, ctor, proto] -> Wrong.
        
        //     Actually, for static methods, we usually define them after dropping proto?
        //     In visitClassDeclaration:
        //       // 7. Process members
        //       ...
        //       // Drop prototype (pushed by define_class)
        //       this.emitOp(Opcode.OP_drop);
        
        //     So static methods should be compiled AFTER dropping proto?
        //     But my code compiles them inside the loop.
        
        //     If I compile static methods inside the loop, I need to access ctor.
        //     Stack: [ctor, proto]
        //     Push func: [ctor, proto, func]
        //     I need [ctor, func] at top? No, I need to reach ctor.
        
        //     Maybe I should separate instance and static methods?
        //     Or use OP_perm3?
        
        //     Let's look at how I handle fields.
        //     Fields are handled by class_fields_init function, which is called later.
        
        //     Methods are defined immediately.
        
        //     If I want to define static method on ctor while proto is on stack:
        //     Stack: [ctor, proto]
        //     Push func: [ctor, proto, func]
        //     I want to call define_method on ctor.
        //     I can use OP_swap2? (swap top with 3rd?) No such opcode.
        //     OP_perm3: rotate top 3.
        //     [ctor, proto, func] -> rot3l -> [proto, func, ctor] -> rot3l -> [func, ctor, proto]
        //     This is getting complicated.
        
        //     Alternative:
        //     Collect static methods and emit them after dropping proto.
        //     Collect instance methods and emit them while proto is on stack.
        
        //     Let's check visitClassDeclaration again.
        
        this.emitOp(Opcode.OP_swap);
    }
  }

  visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
    let name = "";
    if (node.name) {
        name = node.name.text;
    } else {
        const isDefault = node.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword);
        if (isDefault) {
            name = "*default*";
        } else {
            return;
        }
    }
    
    const atom = this.state.atomManager.getAtom(name);
    
    const isExport = node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);
    const isDefault = node.modifiers?.some(m => m.kind === ts.SyntaxKind.DefaultKeyword);
    
    if (isExport) {
        if (isDefault) {
            const exportAtom = this.state.atomManager.getAtom("default");
            this.addExportEntry(0, atom, exportAtom);
        } else {
            this.addExportEntry(0, atom, atom);
        }
    }
    
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(node.pos);
    const fd = JSFunctionDef.create(this.state.cur_func, false, false, this.state.cur_func!.filename, line, character);
    fd.func_name = atom;
    
    const isAsync = node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
    if (isAsync) {
        fd.func_kind = node.asteriskToken ? JSFunctionKind.JS_FUNC_ASYNC_GENERATOR : JSFunctionKind.JS_FUNC_ASYNC;
    } else if (node.asteriskToken) {
        fd.func_kind = JSFunctionKind.JS_FUNC_GENERATOR;
    }

    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    if (fd.func_kind === JSFunctionKind.JS_FUNC_GENERATOR || fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR) {
        this.emitOp(Opcode.OP_initial_yield);
    }
    
    if (this.hasThisUsage(node)) {
        const thisAtom = this.state.atomManager.getAtom("this");
        const thisVarIdx = fd.add_var(thisAtom);
        fd.this_var_idx = thisVarIdx;
        this.emitOp(Opcode.OP_push_this);
        if (thisVarIdx === 0) this.emitOp(Opcode.OP_put_loc0);
        else if (thisVarIdx === 1) this.emitOp(Opcode.OP_put_loc1);
        else if (thisVarIdx === 2) this.emitOp(Opcode.OP_put_loc2);
        else if (thisVarIdx === 3) this.emitOp(Opcode.OP_put_loc3);
        else {
            this.emitOp(Opcode.OP_put_loc);
            this.emitU16(thisVarIdx);
        }
    }
    
    for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
            const paramName = param.name.text;
            const paramAtom = this.state.atomManager.getAtom(paramName);
            fd.add_arg(paramAtom);
        }
    }
    
    this.handleRestParameters(node.parameters);
    this.handleDefaultParameters(node.parameters);

    if (node.body) {
        this.visitBlock(node.body);
    }
    
    if (fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC) {
        this.emitOp(Opcode.OP_undefined);
        this.emitOp(Opcode.OP_return_async);
    } else if (fd.func_kind === JSFunctionKind.JS_FUNC_GENERATOR || fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR) {
        this.emitOp(Opcode.OP_return_undef);
    } else {
        this.emitOp(Opcode.OP_return_undef);
    }
    
    fd.finalizeBody();
    
    this.state.cur_func = prevFunc;
    
    const funcIdx = this.state.cur_func!.cpool.length;
    this.state.cur_func!.cpool.push(fd);
    
    if (funcIdx < 256) {
        this.emitOp(Opcode.OP_fclosure8);
        this.emitU8(funcIdx);
    } else {
        this.emitOp(Opcode.OP_fclosure);
        this.emitU32(funcIdx);
    }
    
    const varIdx = this.state.cur_func!.add_var(atom);
    if (this.state.cur_func!.is_module) {
        if (varIdx === 0) this.emitOp(Opcode.OP_put_var_ref0);
        else if (varIdx === 1) this.emitOp(Opcode.OP_put_var_ref1);
        else if (varIdx === 2) this.emitOp(Opcode.OP_put_var_ref2);
        else if (varIdx === 3) this.emitOp(Opcode.OP_put_var_ref3);
        else {
            this.emitOp(Opcode.OP_put_var_ref);
            this.emitU16(varIdx);
        }
    } else {
        this.emitOp(Opcode.OP_put_loc);
        this.emitU16(varIdx);
    }
  }

  handleRestParameters(parameters: ts.NodeArray<ts.ParameterDeclaration>): void {
    for (let i = 0; i < parameters.length; i++) {
        const param = parameters[i];
        if (param.dotDotDotToken) {
             this.emitOp(Opcode.OP_rest);
             this.emitU16(i);
             
             if (i === 0) this.emitOp(Opcode.OP_set_arg0);
             else if (i === 1) this.emitOp(Opcode.OP_set_arg1);
             else if (i === 2) this.emitOp(Opcode.OP_set_arg2);
             else if (i === 3) this.emitOp(Opcode.OP_set_arg3);
             else {
                 this.emitOp(Opcode.OP_set_arg);
                 this.emitU16(i);
             }
             this.emitOp(Opcode.OP_drop);
        }
    }
  }

  handleDefaultParameters(parameters: ts.NodeArray<ts.ParameterDeclaration>): void {
    for (let i = 0; i < parameters.length; i++) {
        const param = parameters[i];
        if (param.initializer) {
            if (i === 0) this.emitOp(Opcode.OP_get_arg0);
            else if (i === 1) this.emitOp(Opcode.OP_get_arg1);
            else if (i === 2) this.emitOp(Opcode.OP_get_arg2);
            else if (i === 3) this.emitOp(Opcode.OP_get_arg3);
            else {
                this.emitOp(Opcode.OP_get_arg);
                this.emitU16(i);
            }
            
            this.emitOp(Opcode.OP_dup);
            this.emitOp(Opcode.OP_is_undefined);
            const labelSkip = this.newLabel();
            this.emitJump(Opcode.OP_if_false, labelSkip);
            
            this.emitOp(Opcode.OP_drop);
            this.visitExpression(param.initializer);
            
            if (i === 0) this.emitOp(Opcode.OP_set_arg0);
            else if (i === 1) this.emitOp(Opcode.OP_set_arg1);
            else if (i === 2) this.emitOp(Opcode.OP_set_arg2);
            else if (i === 3) this.emitOp(Opcode.OP_set_arg3);
            else {
                this.emitOp(Opcode.OP_set_arg);
                this.emitU16(i);
            }
            
            this.emitLabel(labelSkip);
            this.emitOp(Opcode.OP_drop);
        }
    }
  }

  visitAwaitExpression(node: ts.AwaitExpression): void {
    this.visitExpression(node.expression);
    this.emitOp(Opcode.OP_await);
  }

  visitYieldExpression(node: ts.YieldExpression): void {
    if (node.expression) {
        this.visitExpression(node.expression);
    } else {
        this.emitOp(Opcode.OP_undefined);
    }
    
    if (node.asteriskToken) {
        const isAsync = this.state.cur_func?.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR;
        
        const labelLoop = this.newLabel();
        const labelYield = this.newLabel();
        const labelReturn = this.newLabel();
        const labelReturn1 = this.newLabel();
        const labelThrow = this.newLabel();
        const labelThrow1 = this.newLabel();
        const labelThrow2 = this.newLabel();
        const labelNext = this.newLabel();

        this.emitOp(isAsync ? Opcode.OP_for_await_of_start : Opcode.OP_for_of_start);
        
        // remove the catch offset
        this.emitOp(Opcode.OP_drop);
        this.emitOp(Opcode.OP_undefined);
        this.emitOp(Opcode.OP_undefined); // initial value

        this.emitLabel(labelLoop);
        this.emitOp(Opcode.OP_iterator_next);
        if (isAsync) this.emitOp(Opcode.OP_await);
        this.emitOp(Opcode.OP_iterator_check_object);
        this.emitOp(Opcode.OP_get_field2);
        this.emitAtom(this.state.atomManager.getAtom("done"));
        
        this.emitJump8(Opcode.OP_if_true8, labelNext); // Exit loop if done
        
        this.emitLabel(labelYield);
        if (isAsync) {
            this.emitOp(Opcode.OP_get_field);
            this.emitAtom(this.state.atomManager.getAtom("value"));
            this.emitOp(Opcode.OP_await);
            this.emitOp(Opcode.OP_async_yield_star);
        } else {
            this.emitOp(Opcode.OP_yield_star);
        }
        
        this.emitOp(Opcode.OP_dup);
        this.emitJump8(Opcode.OP_if_true8, labelReturn);
        this.emitOp(Opcode.OP_drop);
        this.emitJump8(Opcode.OP_goto8, labelLoop);

        this.emitLabel(labelReturn);
        this.emitOp(Opcode.OP_push_2);
        this.emitOp(Opcode.OP_strict_eq);
        this.emitJump8(Opcode.OP_if_true8, labelThrow);

        /* return handling */
        if (isAsync) this.emitOp(Opcode.OP_await);
        this.emitOp(Opcode.OP_iterator_call);
        this.emitU8(0);
        this.emitJump8(Opcode.OP_if_true8, labelReturn1);
        
        if (isAsync) this.emitOp(Opcode.OP_await);
        this.emitOp(Opcode.OP_iterator_check_object);
        this.emitOp(Opcode.OP_get_field2);
        this.emitAtom(this.state.atomManager.getAtom("done"));
        this.emitJump8(Opcode.OP_if_false8, labelYield);

        this.emitOp(Opcode.OP_get_field);
        this.emitAtom(this.state.atomManager.getAtom("value"));

        this.emitLabel(labelReturn1);
        this.emitOp(Opcode.OP_nip);
        this.emitOp(Opcode.OP_nip);
        this.emitOp(Opcode.OP_nip);
        
        // emit_return(s, TRUE)
        if (isAsync) this.emitOp(Opcode.OP_await);
        this.emitOp(Opcode.OP_return_async);

        /* throw handling */
        this.emitLabel(labelThrow);
        this.emitOp(Opcode.OP_iterator_call);
        this.emitU8(1);
        this.emitJump8(Opcode.OP_if_true8, labelThrow1);
        
        if (isAsync) this.emitOp(Opcode.OP_await);
        this.emitOp(Opcode.OP_iterator_check_object);
        this.emitOp(Opcode.OP_get_field2);
        this.emitAtom(this.state.atomManager.getAtom("done"));
        this.emitJump8(Opcode.OP_if_false8, labelYield);
        this.emitJump8(Opcode.OP_goto8, labelNext);
        
        this.emitLabel(labelThrow1);
        this.emitOp(Opcode.OP_iterator_call);
        this.emitU8(2);
        
        if (isAsync) {
            this.emitJump8(Opcode.OP_if_true8, labelThrow2);
            this.emitOp(Opcode.OP_await);
            this.emitLabel(labelThrow2);
        } else {
            this.emitOp(Opcode.OP_drop);
        }

        this.emitOp(Opcode.OP_throw_error);
        this.emitU32(0); // JS_ATOM_NULL = 0
        this.emitU8(4); // JS_THROW_ERROR_ITERATOR_THROW

        this.emitLabel(labelNext);
        this.emitOp(Opcode.OP_get_field);
        this.emitAtom(this.state.atomManager.getAtom("value"));
        this.emitOp(Opcode.OP_nip);
        this.emitOp(Opcode.OP_nip);
        this.emitOp(Opcode.OP_nip);
    } else {
        this.emitOp(Opcode.OP_yield);
        const labelNext = this.newLabel();
        // Use short jump optimization since we know the block is small
        this.emitJump8(Opcode.OP_if_false8, labelNext);
        
        // Handle return()
        if (this.state.cur_func?.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR) {
            this.emitOp(Opcode.OP_await);
        }
        this.emitOp(Opcode.OP_return_async);
        
        this.emitLabel(labelNext);
    }
  }

  visitTemplateExpression(node: ts.TemplateExpression): void {
    const head = node.head.text;
    const headAtom = this.state.atomManager.getAtom(head);
    this.emitOp(Opcode.OP_push_atom_value);
    this.emitAtom(headAtom);
    
    const concatAtom = this.state.atomManager.getAtom("concat");
    this.emitOp(Opcode.OP_get_field2);
    this.emitAtom(concatAtom);
    
    let argCount = 0;
    for (const span of node.templateSpans) {
        this.visitExpression(span.expression);
        argCount++;
        
        const literal = span.literal.text;
        if (literal.length > 0) {
            const atom = this.state.atomManager.getAtom(literal);
            this.emitOp(Opcode.OP_push_atom_value);
            this.emitAtom(atom);
            argCount++;
        }
    }
    
    this.emitOp(Opcode.OP_call_method);
    this.emitU16(argCount);
  }

  visitExpression(node: ts.Expression, keepValue: boolean = true): void {
    this.updateLineNumber(node.getStart(this.sourceFile));
    switch (node.kind) {
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral: {
        const str = (node as ts.NoSubstitutionTemplateLiteral).text;
        const atom = this.state.atomManager.getAtom(str);
        this.emitOp(Opcode.OP_push_atom_value);
        this.emitAtom(atom);
        break;
      }
      case ts.SyntaxKind.TemplateExpression: {
        this.visitTemplateExpression(node as ts.TemplateExpression);
        break;
      }
      case ts.SyntaxKind.TaggedTemplateExpression: {
        this.visitTaggedTemplateExpression(node as ts.TaggedTemplateExpression);
        break;
      }
      case ts.SyntaxKind.StringLiteral: {
        const str = (node as ts.StringLiteral).text;
        const atom = this.state.atomManager.getAtom(str);
        this.emitOp(Opcode.OP_push_atom_value);
        this.emitAtom(atom);
        break;
      }
      case ts.SyntaxKind.ThisKeyword: {
          if (!this.state.cur_func) return;
          const atom = this.state.atomManager.getAtom("this");
          const res = this.state.cur_func.get_var_ref(atom);
          if (res) {
              if (res.is_local) {
                  if (res.idx === 0) this.emitOp(Opcode.OP_get_loc0);
                  else if (res.idx === 1) this.emitOp(Opcode.OP_get_loc1);
                  else if (res.idx === 2) this.emitOp(Opcode.OP_get_loc2);
                  else if (res.idx === 3) this.emitOp(Opcode.OP_get_loc3);
                  else {
                      this.emitOp(Opcode.OP_get_loc);
                      this.emitU16(res.idx);
                  }
              } else {
                  if (res.idx === 0) this.emitOp(Opcode.OP_get_var_ref0);
                  else if (res.idx === 1) this.emitOp(Opcode.OP_get_var_ref1);
                  else if (res.idx === 2) this.emitOp(Opcode.OP_get_var_ref2);
                  else if (res.idx === 3) this.emitOp(Opcode.OP_get_var_ref3);
                  else {
                      this.emitOp(Opcode.OP_get_var_ref);
                      this.emitU16(res.idx);
                  }
              }
          } else {
              this.emitOp(Opcode.OP_push_this);
          }
          break;
      }
      case ts.SyntaxKind.NullKeyword:
        this.emitOp(Opcode.OP_null);
        break;
      case ts.SyntaxKind.TrueKeyword:
        this.emitOp(Opcode.OP_push_true);
        break;
      case ts.SyntaxKind.FalseKeyword:
        this.emitOp(Opcode.OP_push_false);
        break;
      case ts.SyntaxKind.NumericLiteral: {
        const text = (node as ts.NumericLiteral).text;
        const val = parseFloat(text);
        if (Number.isInteger(val)) {
             if (val === 0) {
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
             } else {
               this.emitOp(Opcode.OP_push_i32);
               this.emitU32(val);
             }
        } else {
             const idx = this.cpool_add(val);
             this.emitOp(Opcode.OP_push_const);
             this.emitU32(idx);
        }
        break;
      }
      case ts.SyntaxKind.CallExpression:
        this.visitCallExpression(node as ts.CallExpression);
        break;
      case ts.SyntaxKind.PropertyAccessExpression:
        this.visitPropertyAccessExpression(node as ts.PropertyAccessExpression);
        break;
      case ts.SyntaxKind.Identifier:
        this.visitIdentifier(node as ts.Identifier);
        break;
      case ts.SyntaxKind.PrefixUnaryExpression:
        this.visitPrefixUnaryExpression(node as ts.PrefixUnaryExpression);
        break;
      case ts.SyntaxKind.TypeOfExpression:
        this.visitTypeOfExpression(node as ts.TypeOfExpression);
        break;
      case ts.SyntaxKind.VoidExpression:
        this.visitVoidExpression(node as ts.VoidExpression, keepValue);
        return;
      case ts.SyntaxKind.BinaryExpression:
        this.visitBinaryExpression(node as ts.BinaryExpression, keepValue);
        return;
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.visitArrayLiteralExpression(node as ts.ArrayLiteralExpression);
        break;
      case ts.SyntaxKind.ObjectLiteralExpression:
        this.visitObjectLiteralExpression(node as ts.ObjectLiteralExpression);
        break;
      case ts.SyntaxKind.ElementAccessExpression:
        this.visitElementAccessExpression(node as ts.ElementAccessExpression);
        break;
      case ts.SyntaxKind.ConditionalExpression:
        this.visitConditionalExpression(node as ts.ConditionalExpression);
        break;
      case ts.SyntaxKind.NewExpression:
        this.visitNewExpression(node as ts.NewExpression);
        break;
      case ts.SyntaxKind.ParenthesizedExpression:
        this.visitExpression((node as ts.ParenthesizedExpression).expression, keepValue);
        return;
      case ts.SyntaxKind.DeleteExpression:
        this.visitDeleteExpression(node as ts.DeleteExpression);
        break;
      case ts.SyntaxKind.ArrowFunction:
        this.visitArrowFunction(node as ts.ArrowFunction);
        break;
      case ts.SyntaxKind.FunctionExpression:
        this.visitFunctionExpression(node as ts.FunctionExpression);
        break;
      case ts.SyntaxKind.AwaitExpression:
        this.visitAwaitExpression(node as ts.AwaitExpression);
        break;
      case ts.SyntaxKind.YieldExpression:
        this.visitYieldExpression(node as ts.YieldExpression);
        break;
      // TODO: Other expressions
    }
    
    if (!keepValue) {
        this.emitOp(Opcode.OP_drop);
    }
  }

  visitArrowFunction(node: ts.ArrowFunction): void {
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(node.pos);
    const fd = JSFunctionDef.create(this.state.cur_func, false, true, this.state.cur_func!.filename, line, character);
    fd.has_this_binding = false;
    
    const isAsync = node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
    fd.func_kind = isAsync ? JSFunctionKind.JS_FUNC_ASYNC : JSFunctionKind.JS_FUNC_NORMAL;
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    // Parameters
    for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
            const paramName = param.name.text;
            const paramAtom = this.state.atomManager.getAtom(paramName);
            fd.add_arg(paramAtom);
        } else {
            // TODO: Binding pattern
        }
    }
    
    this.handleRestParameters(node.parameters);
    this.handleDefaultParameters(node.parameters);
    
    // Body
    if (ts.isBlock(node.body)) {
        this.visitBlock(node.body);
        if (fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC) {
            this.emitOp(Opcode.OP_undefined);
            this.emitOp(Opcode.OP_return_async);
        } else {
            this.emitOp(Opcode.OP_return_undef);
        }
    } else {
        this.visitExpression(node.body);
        if (fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC) {
            this.emitOp(Opcode.OP_return_async);
        } else {
            this.emitOp(Opcode.OP_return);
        }
    }
    
    this.state.cur_func = prevFunc;
    
    const funcIdx = this.state.cur_func!.cpool.length;
    this.state.cur_func!.cpool.push(fd);
    
    if (funcIdx < 256) {
        this.emitOp(Opcode.OP_fclosure8);
        this.emitU8(funcIdx);
    } else {
        this.emitOp(Opcode.OP_fclosure);
        this.emitU32(funcIdx);
    }
  }

  visitFunctionExpression(node: ts.FunctionExpression): void {
    const { line, character } = this.sourceFile.getLineAndCharacterOfPosition(node.pos);
    const fd = JSFunctionDef.create(this.state.cur_func, false, true, this.state.cur_func!.filename, line, character);
    fd.has_this_binding = true;
    
    const isAsync = node.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword);
    if (isAsync) {
        fd.func_kind = node.asteriskToken ? JSFunctionKind.JS_FUNC_ASYNC_GENERATOR : JSFunctionKind.JS_FUNC_ASYNC;
    } else if (node.asteriskToken) {
        fd.func_kind = JSFunctionKind.JS_FUNC_GENERATOR;
    }
    
    if (node.name) {
        const name = node.name.text;
        fd.func_name = this.state.atomManager.getAtom(name);
    }
    
    const prevFunc = this.state.cur_func;
    this.state.cur_func = fd;
    
    if (fd.func_kind === JSFunctionKind.JS_FUNC_GENERATOR || fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR) {
        this.emitOp(Opcode.OP_initial_yield);
    }
    
    if (this.hasThisUsage(node)) {
        const thisAtom = this.state.atomManager.getAtom("this");
        const thisVarIdx = fd.add_var(thisAtom);
        fd.this_var_idx = thisVarIdx;
        this.emitOp(Opcode.OP_push_this);
        if (thisVarIdx === 0) this.emitOp(Opcode.OP_put_loc0);
        else if (thisVarIdx === 1) this.emitOp(Opcode.OP_put_loc1);
        else if (thisVarIdx === 2) this.emitOp(Opcode.OP_put_loc2);
        else if (thisVarIdx === 3) this.emitOp(Opcode.OP_put_loc3);
        else {
            this.emitOp(Opcode.OP_put_loc);
            this.emitU16(thisVarIdx);
        }
    }
    
    for (const param of node.parameters) {
        if (ts.isIdentifier(param.name)) {
            const paramName = param.name.text;
            const paramAtom = this.state.atomManager.getAtom(paramName);
            fd.add_arg(paramAtom);
        }
    }
    
    this.handleRestParameters(node.parameters);
    this.handleDefaultParameters(node.parameters);
    
    if (node.body) {
        this.visitBlock(node.body);
    }
    
    if (fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC) {
        this.emitOp(Opcode.OP_undefined);
        this.emitOp(Opcode.OP_return_async);
    } else if (fd.func_kind === JSFunctionKind.JS_FUNC_GENERATOR || fd.func_kind === JSFunctionKind.JS_FUNC_ASYNC_GENERATOR) {
        this.emitOp(Opcode.OP_return_undef);
    } else {
        this.emitOp(Opcode.OP_return_undef);
    }
    
    fd.finalizeBody();
    
    this.state.cur_func = prevFunc;
    
    const funcIdx = this.state.cur_func!.cpool.length;
    this.state.cur_func!.cpool.push(fd);
    
    if (funcIdx < 256) {
        this.emitOp(Opcode.OP_fclosure8);
        this.emitU8(funcIdx);
    } else {
        this.emitOp(Opcode.OP_fclosure);
        this.emitU32(funcIdx);
    }
  }

  visitDeleteExpression(node: ts.DeleteExpression): void {
    if (ts.isPropertyAccessExpression(node.expression)) {
      this.visitExpression(node.expression.expression);
      const atom = this.state.atomManager.getAtom(node.expression.name.text);
      this.emitOp(Opcode.OP_push_atom_value);
      this.emitAtom(atom);
      this.emitOp(Opcode.OP_delete);
    } else if (ts.isElementAccessExpression(node.expression)) {
      this.visitExpression(node.expression.expression);
      this.visitExpression(node.expression.argumentExpression);
      this.emitOp(Opcode.OP_delete);
    } else if (ts.isIdentifier(node.expression)) {
      // delete x
      const atom = this.state.atomManager.getAtom(node.expression.text);
      this.emitOp(Opcode.OP_delete_var);
      this.emitAtom(atom);
    } else {
      this.visitExpression(node.expression);
      this.emitOp(Opcode.OP_drop);
      this.emitOp(Opcode.OP_push_true);
    }
  }

  visitConditionalExpression(node: ts.ConditionalExpression): void {
    this.visitExpression(node.condition);
    const labelElse = this.newLabel();
    const labelEnd = this.newLabel();
    
    this.emitJump(Opcode.OP_if_false, labelElse);
    
    this.visitExpression(node.whenTrue);
    this.emitJump(Opcode.OP_goto, labelEnd);
    
    this.emitLabel(labelElse);
    this.visitExpression(node.whenFalse);
    
    this.emitLabel(labelEnd);
  }

  visitNewExpression(node: ts.NewExpression): void {
    this.visitExpression(node.expression);
    const args = node.arguments || [];
    for (const arg of args) {
      this.visitExpression(arg);
    }
    this.emitOp(Opcode.OP_call_constructor);
    this.emitU16(args.length);
  }

  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression): void {
    for (const element of node.elements) {
      this.visitExpression(element);
    }
    this.emitOp(Opcode.OP_array_from);
    this.emitU16(node.elements.length);
  }

  visitObjectLiteralExpression(node: ts.ObjectLiteralExpression): void {
    this.emitOp(Opcode.OP_object);
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        this.visitExpression(prop.initializer);
        
        let name = "";
        if (ts.isIdentifier(prop.name)) {
          name = prop.name.text;
        } else if (ts.isStringLiteral(prop.name)) {
          name = prop.name.text;
        }
        // TODO: Computed property name
        
        const atom = this.state.atomManager.getAtom(name);
        this.emitOp(Opcode.OP_define_field);
        this.emitAtom(atom);
      }
      // TODO: Shorthand property assignment, Spread assignment
    }
  }

  visitElementAccessExpression(node: ts.ElementAccessExpression): void {
    const chainInfo = this.enterOptionalChain(node);

    this.visitExpression(node.expression);

    if (node.questionDotToken) {
        this.emitOp(Opcode.OP_dup);
        this.emitOp(Opcode.OP_is_undefined_or_null);
        const labelContinue = this.newLabel();
        this.emitJump8(Opcode.OP_if_false8, labelContinue);
        
        this.emitOp(Opcode.OP_drop);
        this.emitOp(Opcode.OP_undefined);
        this.emitJump(Opcode.OP_goto, chainInfo.label);
        
        this.emitLabel(labelContinue);
    }

    this.visitExpression(node.argumentExpression);
    this.emitOp(Opcode.OP_get_array_el);

    this.exitOptionalChain(chainInfo);
  }

  visitBinaryExpression(node: ts.BinaryExpression, keepValue: boolean = true): void {
    // Handle assignment
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      this.visitExpression(node.right);
      if (ts.isIdentifier(node.left)) {
        const name = node.left.text;
        const atom = this.state.atomManager.getAtom(name);
        if (this.state.cur_func) {
          const argIdx = this.state.cur_func.args.findIndex(v => v.var_name === atom);
          if (argIdx !== -1) {
            if (keepValue) this.emitOp(Opcode.OP_dup);
            if (argIdx === 0) this.emitOp(Opcode.OP_put_arg0);
            else if (argIdx === 1) this.emitOp(Opcode.OP_put_arg1);
            else if (argIdx === 2) this.emitOp(Opcode.OP_put_arg2);
            else if (argIdx === 3) this.emitOp(Opcode.OP_put_arg3);
            else {
                this.emitOp(Opcode.OP_put_arg);
                this.emitU16(argIdx);
            }
            return;
          }

          const idx = this.state.cur_func.find_var(atom);
          if (idx !== -1) {
            if (keepValue) this.emitOp(Opcode.OP_dup);
            if (idx === 0) this.emitOp(Opcode.OP_put_loc0);
            else if (idx === 1) this.emitOp(Opcode.OP_put_loc1);
            else if (idx === 2) this.emitOp(Opcode.OP_put_loc2);
            else if (idx === 3) this.emitOp(Opcode.OP_put_loc3);
            else {
                this.emitOp(Opcode.OP_put_loc);
                this.emitU16(idx);
            }
            return;
          }
        }
        if (keepValue) this.emitOp(Opcode.OP_dup);
        this.emitOp(Opcode.OP_put_var);
        this.emitAtom(atom);
        return;
      }
      // Property assignment
      if (ts.isPropertyAccessExpression(node.left)) {
          this.visitExpression(node.right); // val
          this.visitExpression(node.left.expression); // val, obj
          this.emitOp(Opcode.OP_swap); // obj, val
          
          if (keepValue) {
              this.emitOp(Opcode.OP_dup); // obj, val, val
              this.emitOp(Opcode.OP_rot3r); // val, obj, val
          }
          
          const propName = node.left.name.text;
          const atom = this.state.atomManager.getAtom(propName);
          
          if (ts.isPrivateIdentifier(node.left.name)) {
              this.emitGetVar(atom);
              this.emitOp(Opcode.OP_put_private_field);
          } else {
              this.emitOp(Opcode.OP_put_field);
              this.emitAtom(atom);
          }
          return;
      }
    }

    // Handle compound assignment
    if (node.operatorToken.kind >= ts.SyntaxKind.FirstCompoundAssignment && 
        node.operatorToken.kind <= ts.SyntaxKind.LastCompoundAssignment) {
       if (ts.isIdentifier(node.left)) {
         this.visitIdentifier(node.left); // get x
         this.visitExpression(node.right); // evaluate right
         
         switch (node.operatorToken.kind) {
           case ts.SyntaxKind.PlusEqualsToken: this.emitOp(Opcode.OP_add); break;
           case ts.SyntaxKind.MinusEqualsToken: this.emitOp(Opcode.OP_sub); break;
           case ts.SyntaxKind.AsteriskEqualsToken: this.emitOp(Opcode.OP_mul); break;
           case ts.SyntaxKind.SlashEqualsToken: this.emitOp(Opcode.OP_div); break;
           case ts.SyntaxKind.PercentEqualsToken: this.emitOp(Opcode.OP_mod); break;
           case ts.SyntaxKind.AsteriskAsteriskEqualsToken: this.emitOp(Opcode.OP_pow); break;
           case ts.SyntaxKind.LessThanLessThanEqualsToken: this.emitOp(Opcode.OP_shl); break;
           case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken: this.emitOp(Opcode.OP_sar); break;
           case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken: this.emitOp(Opcode.OP_shr); break;
           case ts.SyntaxKind.AmpersandEqualsToken: this.emitOp(Opcode.OP_and); break;
           case ts.SyntaxKind.BarEqualsToken: this.emitOp(Opcode.OP_or); break;
           case ts.SyntaxKind.CaretEqualsToken: this.emitOp(Opcode.OP_xor); break;
         }
         
         const name = node.left.text;
         const atom = this.state.atomManager.getAtom(name);
         if (this.state.cur_func) {
            const idx = this.state.cur_func.find_var(atom);
            if (idx !== -1) {
              if (keepValue) this.emitOp(Opcode.OP_dup);
              this.emitOp(Opcode.OP_put_loc);
              this.emitU16(idx);
              return;
            }
         }
         if (keepValue) this.emitOp(Opcode.OP_dup);
         this.emitOp(Opcode.OP_put_var);
         this.emitAtom(atom);
         return;
       }
       // TODO: Property compound assignment
    }

    // Handle logical operators (&&, ||, ??) separately as they require short-circuiting
    if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      // a && b
      this.visitExpression(node.left);
      this.emitOp(Opcode.OP_dup);
      const labelEnd = this.newLabel();
      this.emitJump(Opcode.OP_if_false, labelEnd);
      this.emitOp(Opcode.OP_drop);
      this.visitExpression(node.right);
      this.emitLabel(labelEnd);
      if (!keepValue) this.emitOp(Opcode.OP_drop);
      return;
    }
    
    if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      // a || b
      this.visitExpression(node.left);
      this.emitOp(Opcode.OP_dup);
      const labelEnd = this.newLabel();
      this.emitJump(Opcode.OP_if_true, labelEnd);
      this.emitOp(Opcode.OP_drop);
      this.visitExpression(node.right);
      this.emitLabel(labelEnd);
      if (!keepValue) this.emitOp(Opcode.OP_drop);
      return;
    }

    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      // a ?? b
      this.visitExpression(node.left);
      this.emitOp(Opcode.OP_dup);
      this.emitOp(Opcode.OP_is_undefined_or_null);
      const labelEnd = this.newLabel();
      this.emitJump(Opcode.OP_if_false, labelEnd); // If NOT null/undefined, jump to end (keep a)
      this.emitOp(Opcode.OP_drop); // It IS null/undefined, drop a
      this.visitExpression(node.right);
      this.emitLabel(labelEnd);
      if (!keepValue) this.emitOp(Opcode.OP_drop);
      return;
    }

    if (node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
      this.visitExpression(node.left, false); // Left side of comma is always dropped
      this.visitExpression(node.right, keepValue);
      return;
    }

    this.visitExpression(node.left);
    this.visitExpression(node.right);

    switch (node.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken: this.emitOp(Opcode.OP_add); break;
      case ts.SyntaxKind.MinusToken: this.emitOp(Opcode.OP_sub); break;
      case ts.SyntaxKind.AsteriskToken: this.emitOp(Opcode.OP_mul); break;
      case ts.SyntaxKind.SlashToken: this.emitOp(Opcode.OP_div); break;
      case ts.SyntaxKind.PercentToken: this.emitOp(Opcode.OP_mod); break;
      case ts.SyntaxKind.AsteriskAsteriskToken: this.emitOp(Opcode.OP_pow); break;
      
      case ts.SyntaxKind.LessThanToken: this.emitOp(Opcode.OP_lt); break;
      case ts.SyntaxKind.GreaterThanToken: this.emitOp(Opcode.OP_gt); break;
      case ts.SyntaxKind.LessThanEqualsToken: this.emitOp(Opcode.OP_lte); break;
      case ts.SyntaxKind.GreaterThanEqualsToken: this.emitOp(Opcode.OP_gte); break;
      case ts.SyntaxKind.EqualsEqualsToken: this.emitOp(Opcode.OP_eq); break;
      case ts.SyntaxKind.ExclamationEqualsToken: this.emitOp(Opcode.OP_neq); break;
      case ts.SyntaxKind.EqualsEqualsEqualsToken: this.emitOp(Opcode.OP_strict_eq); break;
      case ts.SyntaxKind.ExclamationEqualsEqualsToken: this.emitOp(Opcode.OP_strict_neq); break;
      
      case ts.SyntaxKind.AmpersandToken: this.emitOp(Opcode.OP_and); break;
      case ts.SyntaxKind.BarToken: this.emitOp(Opcode.OP_or); break;
      case ts.SyntaxKind.CaretToken: this.emitOp(Opcode.OP_xor); break;
      case ts.SyntaxKind.LessThanLessThanToken: this.emitOp(Opcode.OP_shl); break;
      case ts.SyntaxKind.GreaterThanGreaterThanToken: this.emitOp(Opcode.OP_sar); break;
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken: this.emitOp(Opcode.OP_shr); break;
      
      case ts.SyntaxKind.InKeyword: this.emitOp(Opcode.OP_in); break;
      case ts.SyntaxKind.InstanceOfKeyword: this.emitOp(Opcode.OP_instanceof); break;
      
      default:
        console.warn(`Unsupported binary operator: ${ts.SyntaxKind[node.operatorToken.kind]}`);
    }
    
    if (!keepValue) {
        this.emitOp(Opcode.OP_drop);
    }
  }

  visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression): void {
    // Constant folding optimizations
    if (node.operator === ts.SyntaxKind.MinusToken) {
      if (ts.isNumericLiteral(node.operand)) {
        const val = parseFloat(node.operand.text);
        if (val === 1) {
          this.emitOp(Opcode.OP_push_minus1);
          return;
        }
        // TODO: Other negative numbers optimization if needed
      }
    }
    
    this.visitExpression(node.operand);
    switch (node.operator) {
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
      // TODO: ++ and -- (Update expressions)
    }
  }

  visitTypeOfExpression(node: ts.TypeOfExpression): void {
    this.visitExpression(node.expression);
    this.emitOp(Opcode.OP_typeof);
  }

  visitVoidExpression(node: ts.VoidExpression, keepValue: boolean = true): void {
    // Optimization: if operand is literal, don't emit it
    if (ts.isNumericLiteral(node.expression) || 
        node.expression.kind === ts.SyntaxKind.StringLiteral ||
        node.expression.kind === ts.SyntaxKind.TrueKeyword ||
        node.expression.kind === ts.SyntaxKind.FalseKeyword ||
        node.expression.kind === ts.SyntaxKind.NullKeyword) {
        if (keepValue) {
            this.emitOp(Opcode.OP_undefined);
        }
        return;
    }

    this.visitExpression(node.expression);
    this.emitOp(Opcode.OP_drop);
    if (keepValue) {
        this.emitOp(Opcode.OP_undefined);
    }
  }

  visitTaggedTemplateExpression(node: ts.TaggedTemplateExpression): void {
    // 1. Push tag function
    this.visitExpression(node.tag);
    
    // 2. Create template object (array of strings)
    // QuickJS creates this object and caches it?
    // For now, let's just create a new array each time like a simple implementation
    // But wait, the spec says the same template object should be passed for the same call site.
    // QuickJS uses OP_get_template_object? No, it seems to build it manually or use a constant pool entry?
    // Looking at parser.c, it seems to build it.
    
    // Let's implement a simplified version first: create array on the fly.
    // [raw strings]
    // [cooked strings]
    
    // Actually, let's look at how we can construct the arguments.
    // tag(templateObj, ...substitutions)
    
    // Construct template object
    // It's an array of cooked strings, with a .raw property which is an array of raw strings.
    
    let template: ts.TemplateLiteral = node.template;
    let spans: ts.TemplateSpan[] = [];
    let head: string;
    
    if (ts.isNoSubstitutionTemplateLiteral(template)) {
        head = template.text;
    } else {
        head = template.head.text;
        spans = Array.from(template.templateSpans);
    }
    
    // We need to create the template object.
    // Since we don't have a "create template object" opcode, we have to build it.
    // Array of cooked strings.
    
    // Push cooked strings
    this.emitOp(Opcode.OP_push_atom_value);
    this.emitAtom(this.state.atomManager.getAtom(head));
    
    for (const span of spans) {
        this.emitOp(Opcode.OP_push_atom_value);
        this.emitAtom(this.state.atomManager.getAtom(span.literal.text));
    }
    
    // Create array
    this.emitOp(Opcode.OP_array_from);
    this.emitU16(spans.length + 1);
    
    // Add 'raw' property
    // 1. Create raw array
    this.emitOp(Opcode.OP_push_atom_value);
    if (ts.isNoSubstitutionTemplateLiteral(template)) {
        this.emitAtom(this.state.atomManager.getAtom(template.rawText || template.text));
    } else {
        this.emitAtom(this.state.atomManager.getAtom(template.head.rawText || template.head.text));
    }
    
    for (const span of spans) {
        this.emitOp(Opcode.OP_push_atom_value);
        this.emitAtom(this.state.atomManager.getAtom(span.literal.rawText || span.literal.text));
    }
    
    this.emitOp(Opcode.OP_array_from);
    this.emitU16(spans.length + 1);
    
    // 2. Define 'raw' property on template object
    // Stack: tag, templateObj, rawArray
    this.emitOp(Opcode.OP_define_field);
    this.emitAtom(this.state.atomManager.getAtom("raw"));
    
    // 3. Push substitutions
    for (const span of spans) {
        this.visitExpression(span.expression);
    }
    
    // 4. Call tag function
    this.emitOp(Opcode.OP_call);
    this.emitU16(1 + spans.length); // templateObj + substitutions
  }

  visitCallExpression(node: ts.CallExpression): void {
    const chainInfo = this.enterOptionalChain(node);

    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
        // super(...) call
        if (!this.state.cur_func || !this.state.cur_func.is_derived_class_constructor) {
            throw new Error("super() call outside derived constructor");
        }
        
        // 1. Get this.active_func (loc 0)
        this.emitOp(Opcode.OP_get_loc0);
        
        // 2. Get super (parent constructor)
        this.emitOp(Opcode.OP_get_super);
        
        // 3. Get new.target (loc 1)
        this.emitOp(Opcode.OP_get_loc1);
        
        // 4. Push arguments
        for (const arg of node.arguments) {
            this.visitExpression(arg);
        }
        
        // 5. Call constructor
        this.emitOp(Opcode.OP_call_constructor);
        this.emitU16(node.arguments.length);
        
        // 6. Store result in 'this' (loc 2)
        this.emitOp(Opcode.OP_dup);
        this.emitOp(Opcode.OP_put_loc_check_init);
        this.emitU16(this.state.cur_func.this_var_idx);
        
        // 7. Initialize fields
        this.emitClassFieldInit();
        
        // 8. Drop result (we stored it in 'this')
        this.emitOp(Opcode.OP_drop);
        
        this.exitOptionalChain(chainInfo);
        return;
    }

    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(args)
      const propAccess = node.expression;
      this.visitExpression(propAccess.expression); // Push obj
      
      if (propAccess.questionDotToken) {
          // obj?.method()
          this.emitOp(Opcode.OP_dup);
          this.emitOp(Opcode.OP_is_undefined_or_null);
          const labelContinue = this.newLabel();
          this.emitJump8(Opcode.OP_if_false8, labelContinue);
          
          this.emitOp(Opcode.OP_drop); // drop obj
          this.emitOp(Opcode.OP_undefined);
          this.emitJump(Opcode.OP_goto, chainInfo.label);
          
          this.emitLabel(labelContinue);
      }
      
      const propName = propAccess.name.text;
      const atom = this.state.atomManager.getAtom(propName);
      
      if (ts.isPrivateIdentifier(propAccess.name)) {
          this.emitOp(Opcode.OP_dup); // obj, obj
          this.emitGetVar(atom); // obj, obj, symbol
          this.emitOp(Opcode.OP_get_private_field); // obj, func
      } else {
          this.emitOp(Opcode.OP_get_field2); // Push method, keep obj (this)
          this.emitAtom(atom);
      }
      
      if (node.questionDotToken) {
          // obj.method?.()
          // Stack: obj, method
          this.emitOp(Opcode.OP_dup); // obj, method, method
          this.emitOp(Opcode.OP_is_undefined_or_null);
          const labelContinue = this.newLabel();
          this.emitJump8(Opcode.OP_if_false8, labelContinue);
          
          this.emitOp(Opcode.OP_drop); // drop method
          this.emitOp(Opcode.OP_drop); // drop obj
          this.emitOp(Opcode.OP_undefined);
          this.emitJump(Opcode.OP_goto, chainInfo.label);
          
          this.emitLabel(labelContinue);
      }
      
      // Evaluate arguments
      for (const arg of node.arguments) {
        this.visitExpression(arg);
      }
      
      // Call method
      this.emitOp(Opcode.OP_call_method);
      this.emitU16(node.arguments.length);
    } else {
      // Regular call: func(args)
      this.visitExpression(node.expression);
      
      if (node.questionDotToken) {
          // func?.()
          this.emitOp(Opcode.OP_dup);
          this.emitOp(Opcode.OP_is_undefined_or_null);
          const labelContinue = this.newLabel();
          this.emitJump8(Opcode.OP_if_false8, labelContinue);
          
          this.emitOp(Opcode.OP_drop);
          this.emitOp(Opcode.OP_undefined);
          this.emitJump(Opcode.OP_goto, chainInfo.label);
          
          this.emitLabel(labelContinue);
      }

      // Evaluate arguments
      for (const arg of node.arguments) {
        this.visitExpression(arg);
      }
      // Call
      const argCount = node.arguments.length;
      if (argCount === 0) {
          this.emitOp(Opcode.OP_call0);
      } else if (argCount === 1) {
          this.emitOp(Opcode.OP_call1);
      } else if (argCount === 2) {
          this.emitOp(Opcode.OP_call2);
      } else if (argCount === 3) {
          this.emitOp(Opcode.OP_call3);
      } else {
          this.emitOp(Opcode.OP_call);
          this.emitU16(argCount);
      }
    }
    
    this.exitOptionalChain(chainInfo);
  }

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression): void {
    const chainInfo = this.enterOptionalChain(node);

    this.visitExpression(node.expression);

    if (node.questionDotToken) {
        // Optional access: check if null/undefined
        this.emitOp(Opcode.OP_dup);
        this.emitOp(Opcode.OP_is_undefined_or_null);
        const labelContinue = this.newLabel();
        this.emitJump8(Opcode.OP_if_false8, labelContinue);
        
        // It is null/undefined
        this.emitOp(Opcode.OP_drop); // Drop the null/undefined value
        this.emitOp(Opcode.OP_undefined); // Push undefined
        this.emitJump(Opcode.OP_goto, chainInfo.label);
        
        this.emitLabel(labelContinue);
    }

    const propName = node.name.text;
    const atom = this.state.atomManager.getAtom(propName);
    
    if (ts.isPrivateIdentifier(node.name)) {
        this.emitGetVar(atom);
        this.emitOp(Opcode.OP_get_private_field);
    } else {
        this.emitOp(Opcode.OP_get_field);
        this.emitAtom(atom);
    }

    this.exitOptionalChain(chainInfo);
  }

  emitPutVar(idx: number): void {
      if (this.state.cur_func!.is_module) {
          if (idx === 0) this.emitOp(Opcode.OP_put_var_ref0);
          else if (idx === 1) this.emitOp(Opcode.OP_put_var_ref1);
          else if (idx === 2) this.emitOp(Opcode.OP_put_var_ref2);
          else if (idx === 3) this.emitOp(Opcode.OP_put_var_ref3);
          else {
              this.emitOp(Opcode.OP_put_var_ref);
              this.emitU16(idx);
          }
      } else {
          this.emitOp(Opcode.OP_put_loc);
          this.emitU16(idx);
      }
  }

  emitGetVar(atom: JSAtom): void {
    if (this.state.cur_func) {
      const res = this.state.cur_func.get_var_ref(atom);
      if (res) {
          if (res.is_local) {
              if (res.is_arg) {
                  if (res.idx === 0) this.emitOp(Opcode.OP_get_arg0);
                  else if (res.idx === 1) this.emitOp(Opcode.OP_get_arg1);
                  else if (res.idx === 2) this.emitOp(Opcode.OP_get_arg2);
                  else if (res.idx === 3) this.emitOp(Opcode.OP_get_arg3);
                  else {
                      this.emitOp(Opcode.OP_get_arg);
                      this.emitU16(res.idx);
                  }
              } else {
                  if (res.idx === 0) this.emitOp(Opcode.OP_get_loc0);
                  else if (res.idx === 1) this.emitOp(Opcode.OP_get_loc1);
                  else if (res.idx === 2) this.emitOp(Opcode.OP_get_loc2);
                  else if (res.idx === 3) this.emitOp(Opcode.OP_get_loc3);
                  else {
                      this.emitOp(Opcode.OP_get_loc);
                      this.emitU16(res.idx);
                  }
              }
          } else {
              // Closure variable
              if (res.is_lexical) {
                  this.emitOp(Opcode.OP_get_var_ref_check);
                  this.emitU16(res.idx);
              } else {
                  if (res.idx === 0) this.emitOp(Opcode.OP_get_var_ref0);
                  else if (res.idx === 1) this.emitOp(Opcode.OP_get_var_ref1);
                  else if (res.idx === 2) this.emitOp(Opcode.OP_get_var_ref2);
                  else if (res.idx === 3) this.emitOp(Opcode.OP_get_var_ref3);
                  else {
                      this.emitOp(Opcode.OP_get_var_ref);
                      this.emitU16(res.idx);
                  }
              }
          }
          return;
      }
    }

    // For now assume global variable get
    this.emitOp(Opcode.OP_get_var);
    this.emitAtom(atom);
  }

  visitIdentifier(node: ts.Identifier): void {
    const name = node.text;
    const atom = this.state.atomManager.getAtom(name);

    // Handle implicit 'arguments'
    if (name === "arguments") {
        let fd: JSFunctionDef | null = this.state.cur_func;
        while (fd && !fd.has_this_binding) {
            fd = fd.parent;
        }
        
        if (fd) {
            fd.has_arguments_binding = true;
            if (fd.arguments_var_idx === -1) {
                fd.add_arguments_var(atom);
            }
            
            // Force resolution to find the arguments var we just added/ensured
            // This part is a bit tricky because get_var_ref might not find it if we just added it 
            // but didn't update scope info? add_var updates vars.
        }
    }
    
    this.emitGetVar(atom);
  }


  emitOp(op: Opcode): void {
    if (this.state.cur_func) {
      this.state.cur_func.byte_code.emitOp(op);
    }
  }

  emitU32(val: number): void {
    if (this.state.cur_func) {
      this.state.cur_func.byte_code.emitU32(val);
    }
  }

  emitU16(val: number): void {
    if (this.state.cur_func) {
      this.state.cur_func.byte_code.emitU16(val);
    }
  }

  emitU8(val: number): void {
    if (this.state.cur_func) {
      this.state.cur_func.byte_code.emitU8(val);
    }
  }

  emitAtom(atom: number): void {
    this.emitU32(atom);
  }

  cpool_add(val: any): number {
    if (!this.state.cur_func) return -1;
    // Check if already exists
    const idx = this.state.cur_func.cpool.findIndex(v => v === val);
    if (idx !== -1) return idx;
    this.state.cur_func.cpool.push(val);
    return this.state.cur_func.cpool.length - 1;
  }

  newLabel(): number {
    if (!this.state.cur_func) throw new Error("No function");
    return this.state.cur_func.newLabel();
  }

  emitLabel(label: number): void {
    if (!this.state.cur_func) throw new Error("No function");
    this.state.cur_func.emitLabel(label);
  }

  emitJump(op: Opcode, label: number): void {
    if (!this.state.cur_func) throw new Error("No function");
    this.state.cur_func.emitJump(op, label);
  }

  emitJump8(op: Opcode, label: number): void {
    if (!this.state.cur_func) throw new Error("No function");
    this.state.cur_func.emitJump8(op, label);
  }
}
