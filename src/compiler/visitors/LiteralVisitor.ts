import ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { CompilerContext } from '../CompilerContext'
import { Opcode, JSAtom } from '../../env'
import { FunctionDef } from '../FunctionDef'

export class LiteralVisitor extends VisitorContext {

  constructor(context: CompilerContext) {
    super(context)
  }

  /**
   * 访问 null 字面量
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4744
   */
  visitNullKeyword(node: ts.Node) {
    const fd = this.funcDef
    if (!fd) return
    
    this.compiler.emitOp(fd, Opcode.OP_null, node.getStart())
  }

  /**
   * 访问 true 字面量
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4745
   */
  visitTrueKeyword(node: ts.Node) {
    const fd = this.funcDef
    if (!fd) return
    
    this.compiler.emitOp(fd, Opcode.OP_push_true, node.getStart())
  }

  /**
   * 访问 false 字面量
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4746
   */
  visitFalseKeyword(node: ts.Node) {
    const fd = this.funcDef
    if (!fd) return
    
    this.compiler.emitOp(fd, Opcode.OP_push_false, node.getStart())
  }

  /**
   * 访问数字字面量
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4747-4780
   */
  visitNumericLiteral(node: ts.NumericLiteral) {
    const fd = this.funcDef
    if (!fd) return
    
    const sourcePos = node.getStart()
    const value = parseFloat(node.text)
    
    // 检查是否为整数
    if (Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) {
      const intVal = value | 0
      
      // 使用短操作码
      if (intVal >= -1 && intVal <= 7) {
        // OP_push_minus1 到 OP_push_7
        this.compiler.emitOp(fd, Opcode.OP_push_minus1 + intVal + 1, sourcePos)
      } else if (intVal >= -128 && intVal <= 127) {
        // OP_push_i8
        this.compiler.emitOp(fd, Opcode.OP_push_i8, sourcePos)
        this.compiler.emitU8(fd, intVal & 0xff)
      } else if (intVal >= -32768 && intVal <= 32767) {
        // OP_push_i16
        this.compiler.emitOp(fd, Opcode.OP_push_i16, sourcePos)
        this.compiler.emitU16(fd, intVal & 0xffff)
      } else {
        // OP_push_i32
        this.compiler.emitOp(fd, Opcode.OP_push_i32, sourcePos)
        this.compiler.emitU32(fd, intVal >>> 0)
      }
    } else {
      // 浮点数: 添加到常量池
      const idx = this.compiler.cpoolAdd(fd, value)
      this.compiler.emitOp(fd, Opcode.OP_push_const, sourcePos)
      this.compiler.emitU32(fd, idx)
    }
  }

  /**
   * 访问字符串字面量
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4782-4800
   */
  visitStringLiteral(node: ts.StringLiteral) {
    const fd = this.funcDef
    if (!fd) return
    
    const sourcePos = node.getStart()
    const text = node.text
    
    // 空字符串使用短操作码
    if (text === '') {
      this.compiler.emitOp(fd, Opcode.OP_push_empty_string, sourcePos)
      return
    }
    
    // 使用 atom 来表示字符串
    const atom = this.compiler.addAtom(text)
    this.compiler.emitOp(fd, Opcode.OP_push_atom_value, sourcePos)
    this.compiler.emitAtom(fd, atom)
  }
}
