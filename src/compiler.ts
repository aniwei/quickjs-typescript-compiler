import * as ts from 'typescript';
import { FunctionDef } from './functionDef';
import { Atom } from './atoms';

export class Compiler {
  private sourceFile: ts.SourceFile;
  private program: ts.Program;
  private checker: ts.TypeChecker;
  private currentFunc: FunctionDef | null = null;

  constructor(private fileName: string, private sourceCode: string) {
    this.sourceFile = ts.createSourceFile(
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
        return this.sourceFile;
      }
      return undefined;
    };
    this.program = ts.createProgram([this.fileName], options, host);
    this.checker = this.program.getTypeChecker();
  }

  compile(): FunctionDef {
    const rootFuncDef = new FunctionDef('<main>', this.sourceCode, this.fileName);
    this.currentFunc = rootFuncDef;

    ts.forEachChild(this.sourceFile, this.visitNode.bind(this));

    return rootFuncDef;
  }

  private visitNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.FunctionDeclaration:
        this.compileFunctionDeclaration(node as ts.FunctionDeclaration);
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
    // TODO: Implement variable statement compilation
  }
}

export function createNewCompiler(
  fileName: string,
  sourceCode: string
) {
  return new Compiler(fileName, sourceCode);
}