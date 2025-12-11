import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'

export class StatementVisitor extends VisitorContext {
  constructor(context: CompilerContext) {
    super(context)
  }

  visitBlock(node: ts.Block) {
   
  }

  visitIfStatement(node: ts.IfStatement) {
    
  }

  visitWhileStatement(node: ts.WhileStatement) {
    
  }

  visitDoStatement(node: ts.DoStatement) {
    
  }

  visitForStatement(node: ts.ForStatement) {
    
  }

  visitForOfStatement(node: ts.ForOfStatement) {
    
  }

  visitForInStatement(node: ts.ForInStatement) {
    
  }

  visitSwitchStatement(node: ts.SwitchStatement) {
    
  }

  visitBreakStatement(node: ts.BreakStatement) {
    
  }

  visitContinueStatement(node: ts.ContinueStatement) {
    
  }

  visitReturnStatement(node: ts.ReturnStatement) {
    
  }

  visitThrowStatement(node: ts.ThrowStatement) {
    
  }

  visitTryStatement(node: ts.TryStatement) {
    
  }

  visitVariableStatement(node: ts.VariableStatement) {
    
  }

  visitLabeledStatement(node: ts.LabeledStatement) {
    
  }
}
