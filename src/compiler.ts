import * as ts from 'typescript';
import { FunctionDef } from './functionDef';
import { Atom } from './atoms';
import { Var } from './vars';
import { OPCODES } from './opcodes';

export class Compiler {
  private sf: ts.SourceFile;
  private program: ts.Program;
  private checker: ts.TypeChecker;
  private currentFunctionDef: FunctionDef | null = null;

  constructor(private fileName: string, private sourceCode: string) {
    this.sf = ts.createSourceFile(
      this.fileName,
      this.sourceCode,
      ts.ScriptTarget.ES2020,
      true
    );

    const options: ts.CompilerOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
    };
    const host = ts.createCompilerHost(options);
    host.getSourceFile = (fileName, languageVersion) => {
      if (fileName === this.fileName) {
        return this.sf;
      }
      return undefined;
    };
    this.program = ts.createProgram([this.fileName], options, host);
    this.checker = this.program.getTypeChecker();
  }

  compile(): FunctionDef {
    const rootFuncDef = new FunctionDef('<main>', this.sourceCode, this.fileName);
    this.currentFunctionDef = rootFuncDef;

    ts.forEachChild(this.sf, this.visitNode.bind(this));

    return rootFuncDef;
  }

  private visitNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.FunctionDeclaration:
        this.compileFunctionDeclaration(node as ts.FunctionDeclaration);
        break;
      
      case ts.SyntaxKind.NumericLiteral:
        this.compileNumericLiteral(node as ts.NumericLiteral);
        break;

      case ts.SyntaxKind.VariableStatement:
        this.compileVariableStatement(node as ts.VariableStatement);
        break;

      // TODO: Add more cases for other syntax kinds
      
      default:
        // For other nodes, we might need to visit their children
        ts.forEachChild(node, this.visitNode.bind(this));
        break;
    }
  }

  private compileFunctionDeclaration(node: ts.FunctionDeclaration) {
    // TODO: Implement function declaration compilation
  }

  private compileVariableStatement(node: ts.VariableStatement) {
    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name)) {
        const varName = decl.name.text;
        const isConst = (node.declarationList.flags & ts.NodeFlags.Const) !== 0;
        
        if (this.currentFunctionDef) {
          this.currentFunctionDef.vars.push(new Var(varName, isConst));
          this.currentFunctionDef.bytecode.varCount++;

          if (decl.initializer) {
            this.visitNode(decl.initializer);
            this.emitOp('set_var', this.currentFunctionDef.vars.length - 1);
          }
        }
      }
    }
  }

  private compileNumericLiteral(node: ts.NumericLiteral) {
    const value = Number(node.text);
    this.emitOp('push_i32', value);
  }

  private emitOp(name: string, ...args: number[]) {
    if (this.currentFunctionDef) {
      const opcode = OPCODES[name];
      if (opcode) {
        this.currentFunctionDef.bytecode.opcodes.push(opcode.op, ...args);
      } else {
        throw new Error(`Unknown opcode: ${name}`);
      }
    }
  }
}

export function createNewCompiler(
  fileName: string,
  sourceCode: string
) {
  return new Compiler(fileName, sourceCode);
}