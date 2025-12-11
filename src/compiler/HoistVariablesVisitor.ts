import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from './CompilerContext'
import { FunctionKind } from '../env'
import { JSVarKind } from './FunctionDef'

export class HoistVariablesVisitor extends VisitorContext  {
  constructor(context: CompilerContext) {
    super(context)
  }

  hoist(node: ts.Node) {
    
  }
}
