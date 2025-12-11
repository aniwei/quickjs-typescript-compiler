import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, JSAtom } from '../../env'
import { FunctionDef } from '../FunctionDef'

export class LiteralVisitor extends VisitorContext {

  constructor(context: CompilerContext) {
    super(context)
  }

  visitNullKeyword(node: ts.Node) {
   
  }

  visitTrueKeyword(node: ts.Node) {
   
   
  }

  visitFalseKeyword(node: ts.Node) {
   
  }

  visitNumericLiteral(node: ts.NumericLiteral) {
    
  }

  visitStringLiteral(node: ts.StringLiteral) {
    
  }
}
