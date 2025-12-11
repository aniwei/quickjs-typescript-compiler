import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, JSAtom } from '../../env'

export class IdentifierVisitor extends VisitorContext {
  

  constructor(context: CompilerContext) {
    super(context)
  }

  visitIdentifier(node: ts.Identifier) {
    
  }
}
