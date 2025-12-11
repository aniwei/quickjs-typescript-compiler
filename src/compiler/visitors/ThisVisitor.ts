import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'

export class ThisVisitor extends VisitorContext {
  constructor(context: CompilerContext) {
    super(context)
  }

  visitThisKeyword(node: ts.ThisExpression) {
    
  }
}
