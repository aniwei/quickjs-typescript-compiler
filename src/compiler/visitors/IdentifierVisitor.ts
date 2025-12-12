import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, JSAtom } from '../../env'

export class IdentifierVisitor extends VisitorContext {
  

  constructor(context: CompilerContext) {
    super(context)
  }

  /**
   * 访问标识符 - 对应 parser.c 中的标识符处理
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2940-2950
   * 
   * 发射 OP_scope_get_var 获取变量值
   */
  visitIdentifier(node: ts.Identifier) {
    const fd = this.funcDef
    if (!fd) return
    
    const name = node.text
    const sourcePos = node.getStart()
    
    // 处理特殊值
    if (name === 'undefined') {
      this.compiler.emitOp(fd, Opcode.OP_undefined, sourcePos)
      return
    }
    
    // 发射 OP_scope_get_var 指令获取变量
    // 格式: OP_scope_get_var atom:u32 scope:u16
    const atom = this.compiler.addAtom(name)
    this.compiler.emitOp(fd, Opcode.OP_scope_get_var, sourcePos)
    this.compiler.emitAtom(fd, atom)
    this.compiler.emitU16(fd, fd.scopeLevel)
  }
}
