import * as ts from 'typescript'
import type { StatementVisitor, StatementVisitorRegistrar } from '../../visitors/statementVisitors'
import { compileClassDeclaration } from './classes'
import { compileExportAssignment, compileExportDeclaration } from './exports'
import { compileFunctionDeclaration } from './functions'
import { compileVariableStatement } from './variables'

const declarationVisitors = new Map<ts.SyntaxKind, StatementVisitor>([
  [ts.SyntaxKind.FunctionDeclaration, (compiler, node) => compileFunctionDeclaration(compiler, node as ts.FunctionDeclaration)],
  [ts.SyntaxKind.VariableStatement, (compiler, node) => compileVariableStatement(compiler, node as ts.VariableStatement)],
  [ts.SyntaxKind.ExportDeclaration, (compiler, node) => compileExportDeclaration(compiler, node as ts.ExportDeclaration)],
  [ts.SyntaxKind.ExportAssignment, (compiler, node) => compileExportAssignment(compiler, node as ts.ExportAssignment)],
  [ts.SyntaxKind.ClassDeclaration, (compiler, node) => compileClassDeclaration(compiler, node as ts.ClassDeclaration)],
])

export function registerDeclarationStatements(register: StatementVisitorRegistrar) {
  for (const [kind, visitor] of declarationVisitors) {
    register(kind, visitor)
  }
}

export {
  compileClassDeclaration,
  compileExportAssignment,
  compileExportDeclaration,
  compileFunctionDeclaration,
  compileVariableStatement,
}
