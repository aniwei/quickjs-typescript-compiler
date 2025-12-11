import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { Opcode, FunctionKind, JSMode } from '../../env'
import { FunctionDef, JSVarKind } from '../FunctionDef'

export class  ClassVisitor extends VisitorContext {
  visitClassDeclaration(node: ts.ClassDeclaration) {
    
  }

  visitMethodDefinition(node: ts.MethodDeclaration) {
    
  }
}
