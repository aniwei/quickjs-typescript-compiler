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
  visitThisKeyword(_node: ts.ThisExpression): void {
    const fd = this.funcDef!

    // QuickJS: TOK_THIS 分支只 emit_op(OP_scope_get_var)，不调用 emit_source_pos。
    // 参见: third_party/QuickJS/src/core/parser.c:4939-4946
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(fd, 0)
  }
}
