import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, FunctionKind, JSMode } from '../../env'
import { FunctionDef, JSVarKind } from '../FunctionDef'

export class FunctionVisitor extends VisitorContext {
  private hoisted: Map<ts.FunctionDeclaration, { fd: FunctionDef, childIdx: number, cpoolIdx: number }> = new Map()

  constructor(context: CompilerContext) {
    super(context)
  }

  visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    
  }

  visitArrowFunction(node: ts.ArrowFunction) {
    
  }

  visitFunctionExpression(node: ts.FunctionExpression) {
    
  }

  visitMethodDefinition(node: ts.MethodDeclaration) {
    
  }
}
