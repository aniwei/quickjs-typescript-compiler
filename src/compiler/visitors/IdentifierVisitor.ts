import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, TempOpcode, JSAtom } from '../../env'
import { FunctionDef } from '../FunctionDef'

export class IdentifierVisitor extends VisitorContext {
  

  constructor(context: CompilerContext) {
    super(context)
  }

  /**
   * 发射获取变量（文档对照用）
   * 对应 QuickJS resolve_scope_var 路径最终生成的 scope_get_var。
   */
  emitScopeGetVar(fd: FunctionDef, atom: number, scopeLevel: number, sourcePos?: number) {
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var, sourcePos)
    this.compiler.emitAtom(fd, atom)
    this.compiler.emitU16(fd, scopeLevel)
  }

  /**
   * 发射设置变量（文档对照用）
   * 注意：最终 opcode 会在 VariableResolver 阶段被降解为 put_loc/put_var 等。
   */
  emitScopePutVar(fd: FunctionDef, atom: number, scopeLevel: number, sourcePos?: number) {
    this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var, sourcePos)
    this.compiler.emitAtom(fd, atom)
    this.compiler.emitU16(fd, scopeLevel)
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

    // 发射 OP_scope_get_var 指令获取变量
    // 格式: OP_scope_get_var atom:u32 scope:u16
    const atom = this.compiler.addAtom(name)
    this.emitScopeGetVar(fd, atom, fd.scopeLevel, sourcePos)
  }
}
