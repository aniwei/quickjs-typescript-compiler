import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { TempOpcode, JSAtom } from '../../env'

export class ThisVisitor extends VisitorContext {
  constructor(context: CompilerContext) {
    super(context)
  }

  /**
   * 访问 this 关键字 - 对应 parser.c:4923-4928
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4923-4928
   */
  visitThisKeyword(node: ts.ThisExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var, sourcePos)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(fd, 0)
  }
}
