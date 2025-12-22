import * as ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import { Opcode, TempOpcode, JSAtom, PutLValueEnum } from '../../env'
import { CompilerContext } from '../CompilerContext'
import { FunctionDef, ARGUMENT_VAR_OFFSET } from '../FunctionDef'
import { Label } from '../Compiler'

/**
 * LValue 信息结构
 */
export interface LValueInfo {
  opcode: number
  scope: number
  name: number
  label: number
  depth: number
}

/**
 * 表达式访问器 - 对应 parser.c 中的表达式解析函数
 * 
 * 主要对应:
 * - js_parse_postfix_expr (parser.c:4818-5100)
 * - js_parse_unary (parser.c:5584-5718)
 * - js_parse_expr_binary (parser.c:5720-5875)
 * - js_parse_cond_expr (parser.c:5954-5980)
 * - js_parse_assign_expr2 (parser.c:5982-6275)
 */
export class ExpressionVisitor extends VisitorContext {
  private optionalChainEndLabels: WeakMap<ts.Node, number> = new WeakMap()
  constructor(context: CompilerContext) {
    super(context)
  }

  // ============================================================================
  // 复合赋值操作码映射 - 对应 parser.c:6200-6212 assign_opcodes
  // ============================================================================

  /**
   * 获取复合赋值的操作码 - 对应 parser.c:6200-6212
   */
  private getCompoundOpcode(kind: ts.SyntaxKind): Opcode | null {
    switch (kind) {
      case ts.SyntaxKind.PlusEqualsToken:
        return Opcode.OP_add
      case ts.SyntaxKind.MinusEqualsToken:
        return Opcode.OP_sub
      case ts.SyntaxKind.AsteriskEqualsToken:
        return Opcode.OP_mul
      case ts.SyntaxKind.SlashEqualsToken:
        return Opcode.OP_div
      case ts.SyntaxKind.PercentEqualsToken:
        return Opcode.OP_mod
      case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
        return Opcode.OP_pow
      case ts.SyntaxKind.LessThanLessThanEqualsToken:
        return Opcode.OP_shl
      case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
        return Opcode.OP_sar
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
        return Opcode.OP_shr
      case ts.SyntaxKind.AmpersandEqualsToken:
        return Opcode.OP_and
      case ts.SyntaxKind.BarEqualsToken:
        return Opcode.OP_or
      case ts.SyntaxKind.CaretEqualsToken:
        return Opcode.OP_xor
      default:
        return null
    }
  }

  // ============================================================================
  // 字面量表达式 - 对应 parser.c:4818-4930 js_parse_postfix_expr
  // ============================================================================

  /**
   * 访问数字字面量 - 对应 parser.c:4826-4851
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4826-4851
   */
  visitNumericLiteral(node: ts.NumericLiteral): void {
    const fd = this.funcDef!
    const value = parseFloat(node.text)

    // 整数优化路径
    if (Number.isInteger(value)) {
      const intVal = value | 0

      // 使用 push_i32 指令
      // QuickJS 对常量 push 指令通常不会绑定更细粒度的 sourcePos，
      // 以避免在 pc2line 中产生“字面量覆盖”导致的额外列变化。
      this.compiler.emitOp(fd, Opcode.OP_push_i32)
      this.compiler.emitU32(fd, intVal >>> 0) // 转换为无符号
    } else {
      // 浮点数使用常量池
      this.compiler.emitPushConst(fd, value, false)
    }
  }

  /**
   * 访问字符串字面量 - 对应 parser.c:4857-4862
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4857-4862
   */
  visitStringLiteral(node: ts.StringLiteral): void {
    const fd = this.funcDef!
    const value = node.text
    
    // 使用常量池，asAtom=true 表示作为 atom 字符串
    this.compiler.emitPushConst(fd, value, true)
  }

  /**
   * 访问 BigInt 字面量 - 对应 parser.c:4833-4844
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4833-4844
   */
  visitBigIntLiteral(node: ts.BigIntLiteral): void {
    const fd = this.funcDef!
    const text = node.text.replace(/n$/, '') // 移除尾部的 'n'
    const value = BigInt(text)

    // 检查是否可以使用 push_bigint_i32
    if (value >= BigInt(-2147483648) && value <= BigInt(2147483647)) {
      this.compiler.emitOp(fd, Opcode.OP_push_bigint_i32)
      this.compiler.emitU32(fd, Number(value) >>> 0)
    } else {
      // 大的 BigInt 使用常量池
      this.compiler.emitPushConst(fd, value, false)
    }
  }

  /**
   * 访问 null 字面量 - 对应 parser.c:4919-4922
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4919-4922
   */
  visitNullKeyword(node: ts.NullLiteral): void {
    const fd = this.funcDef!
    this.compiler.emitOp(fd, Opcode.OP_null)
  }

  /**
   * 访问 true/false 字面量 - 对应 parser.c:4929-4936
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4929-4936
   */
  visitBooleanLiteral(node: ts.BooleanLiteral): void {
    const fd = this.funcDef!
    if (node.kind === ts.SyntaxKind.TrueKeyword) {
      this.compiler.emitOp(fd, Opcode.OP_push_true)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_push_false)
    }
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

  /**
   * 访问标识符 - 对应 parser.c:4937-4977
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4937-4977
   */
  visitIdentifier(node: ts.Identifier): void {
    const fd = this.funcDef!
    const name = node.text
    const sourcePos = node.getStart()

    // 获取或创建 atom
    const atom = this.compiler.addAtom(name)

    // 发射 scope_get_var 指令
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var, sourcePos)
    this.compiler.emitU32(fd, atom)
    this.compiler.emitU16(fd, fd.scopeLevel)
  }

  // ============================================================================
  // 一元表达式 - 对应 parser.c:5584-5718 js_parse_unary
  // ============================================================================

  /**
   * 访问前缀一元表达式 - 对应 parser.c:5588-5668
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5588-5668
   */
  visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    switch (node.operator) {
      case ts.SyntaxKind.PlusToken:
        // + 运算符: 先计算操作数，然后发射 OP_plus
        this.context.visit(node.operand)
        this.compiler.emitOp(fd, Opcode.OP_plus, sourcePos)
        break

      case ts.SyntaxKind.MinusToken:
        // - 运算符: 先计算操作数，然后发射 OP_neg
        this.context.visit(node.operand)
        this.compiler.emitOp(fd, Opcode.OP_neg, sourcePos)
        break

      case ts.SyntaxKind.ExclamationToken:
        // ! 运算符: 逻辑非
        this.context.visit(node.operand)
        // QuickJS: js_parse_unary() 对 '!' 分支不会 emit_source_pos，只 emit_op(OP_lnot)
        // third_party/QuickJS/src/core/parser.c: js_parse_unary() case '!': emit_op(s, OP_lnot);
        this.compiler.emitOp(fd, Opcode.OP_lnot)
        break

      case ts.SyntaxKind.TildeToken:
        // ~ 运算符: 位非
        this.context.visit(node.operand)
        this.compiler.emitOp(fd, Opcode.OP_not, sourcePos)
        break

      case ts.SyntaxKind.PlusPlusToken:
        // ++x: 前缀递增 - 对应 parser.c:5623-5643
        this.emitPrefixIncDec(node.operand, Opcode.OP_inc, sourcePos)
        break

      case ts.SyntaxKind.MinusMinusToken:
        // --x: 前缀递减 - 对应 parser.c:5623-5643
        this.emitPrefixIncDec(node.operand, Opcode.OP_dec, sourcePos)
        break
    }
  }

  /**
   * 访问后缀一元表达式 - 对应 parser.c:5678-5697
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5678-5697
   */
  visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression): void {
    const fd = this.funcDef!
    // QuickJS: postfix ++/-- 的 source position 绑定到运算符 token（op_token_ptr）
    // third_party/QuickJS/src/core/parser.c: js_parse_unary() default 分支 -> emit_source_pos(s, op_token_ptr); emit_op(s, OP_post_dec + ...)
    const sf = node.getSourceFile()
    const text = sf.text
    const operandEnd = node.operand.getEnd()
    const nodeEnd = node.getEnd()
    let opPos = -1
    for (let i = operandEnd; i + 1 < nodeEnd && i + 1 < text.length; i++) {
      const ch = text.charCodeAt(i)
      const ch2 = text.charCodeAt(i + 1)
      if (ch === 0x2b /* '+' */ && ch2 === 0x2b /* '+' */) {
        opPos = i
        break
      }
      if (ch === 0x2d /* '-' */ && ch2 === 0x2d /* '-' */) {
        opPos = i
        break
      }
    }
    const sourcePos = opPos >= 0 ? opPos : node.getStart(sf)

    switch (node.operator) {
      case ts.SyntaxKind.PlusPlusToken:
        // x++: 后缀递增
        this.emitPostfixIncDec(node.operand, Opcode.OP_post_inc, sourcePos)
        break

      case ts.SyntaxKind.MinusMinusToken:
        // x--: 后缀递减
        this.emitPostfixIncDec(node.operand, Opcode.OP_post_dec, sourcePos)
        break
    }
  }

  /**
   * 发射前缀递增/递减 - 对应 parser.c:5623-5643
   * 
   * 逻辑: 
   * 1. 获取 lvalue 并保持值在栈上
   * 2. 发射 OP_inc/OP_dec
   * 3. put_lvalue 保留栈顶值
   * 
   * QuickJS 源码: 
   * - parser.c:5626-5639 (prefix ++/--)
   * - parser.c:3888-4012 (get_lvalue)
   * - parser.c:4026-4135 (put_lvalue)
   */
  private emitPrefixIncDec(operand: ts.Expression, opcode: Opcode, sourcePos: number): void {
    const fd = this.funcDef!

    if (ts.isIdentifier(operand)) {
      // 变量: 使用 scope_make_ref + get_ref_value 模式
      // QuickJS: prefix ++/-- 会先解析 operand（从而在标识符位置产生一次 emit_source_pos），
      // 然后再对 ++/-- token 调用 emit_source_pos(op_token_ptr)。
      // 我们的实现跳过了 operand 的表达式解析，所以这里补齐一次“标识符位置”的采样点。
      this.compiler.emitSourcePos(fd, operand.getStart())
      const name = this.compiler.addAtom(operand.text)
      const label = this.compiler.newLabelInt(fd)
      
      // 发射 OP_scope_make_ref - parser.c:3953-3963
      // 栈效果: [] -> [ref_obj, ref_prop]
      this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU32(fd, label)
      this.compiler.emitU16(fd, fd.scopeLevel)
      this.compiler.updateLabel(fd, label, 1)
      
      // 发射 OP_get_ref_value - parser.c:3964
      // 栈效果: [ref_obj, ref_prop] -> [ref_obj, ref_prop, value]
      this.compiler.emitOp(fd, Opcode.OP_get_ref_value)
      
      // 发射递增/递减操作
      // 栈效果: [ref_obj, ref_prop, value] -> [ref_obj, ref_prop, value+1]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // put_lvalue 使用 PUT_LVALUE_KEEP_TOP - parser.c:4054-4078
      // 对于 OP_get_ref_value (depth=2)，先 emit_label
      this.compiler.emitLabelInt(fd, label)
      
      // insert3: [ref_obj, ref_prop, value+1] -> [value+1, ref_obj, ref_prop, value+1]
      this.compiler.emitOp(fd, Opcode.OP_insert3)
      
      // put_ref_value: [value+1, ref_obj, ref_prop, value+1] -> [value+1]
      this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      
    } else if (ts.isPropertyAccessExpression(operand)) {
      // 属性访问: obj.prop
      const name = this.compiler.addAtom(operand.name.text)
      
      // 访问对象
      this.context.visit(operand.expression)
      
      // 发射 OP_get_field2 - 获取值但保留对象在栈上
      // 栈效果: [obj] -> [obj, value]
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      
      // 发射递增/递减操作
      // 栈效果: [obj, value] -> [obj, value+1]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // put_lvalue 使用 PUT_LVALUE_KEEP_TOP (depth=1)
      // insert2: [obj, value+1] -> [value+1, obj, value+1]
      this.compiler.emitOp(fd, Opcode.OP_insert2)
      
      // put_field: [value+1, obj, value+1] -> [value+1]
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      
    } else if (ts.isElementAccessExpression(operand)) {
      // 数组元素访问: arr[idx]
      // 访问对象和索引
      this.context.visit(operand.expression)
      this.context.visit(operand.argumentExpression)
      
      // 发射 OP_get_array_el3 - 获取值但保留对象和索引在栈上
      // 栈效果: [obj, idx] -> [obj, idx, value]
      this.compiler.emitOp(fd, Opcode.OP_get_array_el3)
      
      // 发射递增/递减操作
      // 栈效果: [obj, idx, value] -> [obj, idx, value+1]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // put_lvalue 使用 PUT_LVALUE_KEEP_TOP (depth=2)
      // insert3: [obj, idx, value+1] -> [value+1, obj, idx, value+1]
      this.compiler.emitOp(fd, Opcode.OP_insert3)
      
      // put_array_el: [value+1, obj, idx, value+1] -> [value+1]
      this.compiler.emitOp(fd, Opcode.OP_put_array_el)
      
    } else {
      throw new Error('Invalid prefix increment/decrement operand')
    }
  }

  /**
   * 发射后缀递增/递减 - 对应 parser.c:5678-5697
   * 
   * 逻辑:
   * 1. 获取 lvalue 并保持值在栈上
   * 2. 发射 OP_post_inc/OP_post_dec (会在栈上产生两个值: 原值 和 新值)
   * 3. put_lvalue 保留原值 (第二个值)
   * 
   * OP_post_inc/OP_post_dec 的栈效果: [value] -> [new_value, old_value]
   * 注意: old_value 在栈顶，new_value 在下面
   * 
   * QuickJS 源码:
   * - parser.c:5678-5697
   */
  private emitPostfixIncDec(operand: ts.Expression, opcode: Opcode, sourcePos: number): void {
    const fd = this.funcDef!

    if (ts.isIdentifier(operand)) {
      // 变量: 使用 scope_make_ref + get_ref_value 模式
      // QuickJS: postfix ++/-- 同样先解析 operand，再对 ++/-- token emit_source_pos。
      // 我们跳过了 operand 解析，需补齐“标识符位置”的采样点以对齐 pc2line entry。
      this.compiler.emitSourcePos(fd, operand.getStart())
      const name = this.compiler.addAtom(operand.text)
      const label = this.compiler.newLabelInt(fd)
      
      // 发射 OP_scope_make_ref
      // 栈效果: [] -> [ref_obj, ref_prop]
      this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU32(fd, label)
      this.compiler.emitU16(fd, fd.scopeLevel)
      this.compiler.updateLabel(fd, label, 1)
      
      // 发射 OP_get_ref_value
      // 栈效果: [ref_obj, ref_prop] -> [ref_obj, ref_prop, value]
      this.compiler.emitOp(fd, Opcode.OP_get_ref_value)
      
      // 发射后缀递增/递减操作
      // 栈效果: [ref_obj, ref_prop, value] -> [ref_obj, ref_prop, new_value, old_value]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // put_lvalue 使用 PUT_LVALUE_KEEP_SECOND (depth=2)
      // 先 emit_label
      this.compiler.emitLabelInt(fd, label)
      
      // perm4: [ref_obj, ref_prop, new_value, old_value] -> [old_value, ref_obj, ref_prop, new_value]
      this.compiler.emitOp(fd, Opcode.OP_perm4)
      
      // put_ref_value: [old_value, ref_obj, ref_prop, new_value] -> [old_value]
      this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      
    } else if (ts.isPropertyAccessExpression(operand)) {
      // 属性访问: obj.prop
      const name = this.compiler.addAtom(operand.name.text)
      
      // 访问对象
      this.context.visit(operand.expression)
      
      // 发射 OP_get_field2
      // 栈效果: [obj] -> [obj, value]
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      
      // 发射后缀递增/递减操作
      // 栈效果: [obj, value] -> [obj, new_value, old_value]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // put_lvalue 使用 PUT_LVALUE_KEEP_SECOND (depth=1)
      // perm3: [obj, new_value, old_value] -> [old_value, obj, new_value]
      this.compiler.emitOp(fd, Opcode.OP_perm3)
      
      // put_field: [old_value, obj, new_value] -> [old_value]
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      
    } else if (ts.isElementAccessExpression(operand)) {
      // 数组元素访问: arr[idx]
      // 访问对象和索引
      this.context.visit(operand.expression)
      this.context.visit(operand.argumentExpression)
      
      // 发射 OP_get_array_el3
      // 栈效果: [obj, idx] -> [obj, idx, value]
      this.compiler.emitOp(fd, Opcode.OP_get_array_el3)
      
      // 发射后缀递增/递减操作
      // 栈效果: [obj, idx, value] -> [obj, idx, new_value, old_value]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // put_lvalue 使用 PUT_LVALUE_KEEP_SECOND (depth=2)
      // perm4: [obj, idx, new_value, old_value] -> [old_value, obj, idx, new_value]
      this.compiler.emitOp(fd, Opcode.OP_perm4)
      
      // put_array_el: [old_value, obj, idx, new_value] -> [old_value]
      this.compiler.emitOp(fd, Opcode.OP_put_array_el)
      
    } else {
      throw new Error('Invalid postfix increment/decrement operand')
    }
  }

  // ============================================================================
  // 二元表达式 - 对应 parser.c:5720-5875 js_parse_expr_binary
  // ============================================================================

  /**
   * 访问二元表达式 - 对应 parser.c:5720-5875
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5720-5875
   */
  visitBinaryExpression(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const op = node.operatorToken.kind
    const sourcePos = node.operatorToken.getStart()

    // 检查是否是赋值表达式
    if (this.isAssignmentOperator(op)) {
      this.visitAssignmentExpression(node)
      return
    }

    // 检查是否是逻辑运算符 (短路求值)
    if (op === ts.SyntaxKind.AmpersandAmpersandToken ||
        op === ts.SyntaxKind.BarBarToken ||
        op === ts.SyntaxKind.QuestionQuestionToken) {
      this.visitLogicalExpression(node)
      return
    }

    // 普通二元运算: 左操作数 -> 右操作数 -> 操作符
    this.context.visit(node.left)
    this.context.visit(node.right)

    // 发射对应的操作码
    this.emitBinaryOp(op, sourcePos)
  }

  /**
   * 检查是否是赋值运算符
   */
  private isAssignmentOperator(kind: ts.SyntaxKind): boolean {
    return kind === ts.SyntaxKind.EqualsToken ||
           (kind >= ts.SyntaxKind.PlusEqualsToken && kind <= ts.SyntaxKind.CaretEqualsToken) ||
           kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken ||
           kind === ts.SyntaxKind.BarBarEqualsToken ||
           kind === ts.SyntaxKind.QuestionQuestionEqualsToken
  }

  /**
   * 发射二元运算操作码 - 对应 parser.c:5753-5869
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5753-5869
   */
  private emitBinaryOp(kind: ts.SyntaxKind, sourcePos: number): void {
    const fd = this.funcDef!
    let opcode: Opcode

    switch (kind) {
      // 算术运算 - level 1-2
      case ts.SyntaxKind.AsteriskToken:
        opcode = Opcode.OP_mul
        break
      case ts.SyntaxKind.SlashToken:
        opcode = Opcode.OP_div
        break
      case ts.SyntaxKind.PercentToken:
        opcode = Opcode.OP_mod
        break
      case ts.SyntaxKind.PlusToken:
        opcode = Opcode.OP_add
        break
      case ts.SyntaxKind.MinusToken:
        opcode = Opcode.OP_sub
        break
      case ts.SyntaxKind.AsteriskAsteriskToken:
        opcode = Opcode.OP_pow
        break

      // 位移运算 - level 3
      case ts.SyntaxKind.LessThanLessThanToken:
        opcode = Opcode.OP_shl
        break
      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        opcode = Opcode.OP_sar
        break
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        opcode = Opcode.OP_shr
        break

      // 比较运算 - level 4
      case ts.SyntaxKind.LessThanToken:
        opcode = Opcode.OP_lt
        break
      case ts.SyntaxKind.GreaterThanToken:
        opcode = Opcode.OP_gt
        break
      case ts.SyntaxKind.LessThanEqualsToken:
        opcode = Opcode.OP_lte
        break
      case ts.SyntaxKind.GreaterThanEqualsToken:
        opcode = Opcode.OP_gte
        break
      case ts.SyntaxKind.InstanceOfKeyword:
        opcode = Opcode.OP_instanceof
        break
      case ts.SyntaxKind.InKeyword:
        opcode = Opcode.OP_in
        break

      // 相等运算 - level 5
      case ts.SyntaxKind.EqualsEqualsToken:
        opcode = Opcode.OP_eq
        break
      case ts.SyntaxKind.ExclamationEqualsToken:
        opcode = Opcode.OP_neq
        break
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        opcode = Opcode.OP_strict_eq
        break
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        opcode = Opcode.OP_strict_neq
        break

      // 位运算 - level 6-8
      case ts.SyntaxKind.AmpersandToken:
        opcode = Opcode.OP_and
        break
      case ts.SyntaxKind.CaretToken:
        opcode = Opcode.OP_xor
        break
      case ts.SyntaxKind.BarToken:
        opcode = Opcode.OP_or
        break

      // 逗号运算符
      case ts.SyntaxKind.CommaToken:
        // 逗号运算符: 左值已经计算，丢弃它，右值留在栈顶
        // 注意: 这里不需要发射额外指令，因为两边都已经计算
        return

      default:
        throw new Error(`Unsupported binary operator: ${ts.SyntaxKind[kind]}`)
    }

    this.compiler.emitOp(fd, opcode, sourcePos)
  }

  /**
   * 访问逻辑表达式 (短路求值) - 对应 parser.c:5876-5951
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5876-5951
   */
  private visitLogicalExpression(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const op = node.operatorToken.kind

    // 计算左操作数
    this.context.visit(node.left)

    // 创建跳转标签
    const label = this.compiler.newLabelInt(fd)

    // 发射 dup 以保留值用于短路判断
    this.compiler.emitOp(fd, Opcode.OP_dup)

    // 根据运算符类型选择条件跳转
    if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
      // &&: 如果左边为 false，跳过右边
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)
    } else if (op === ts.SyntaxKind.BarBarToken) {
      // ||: 如果左边为 true，跳过右边
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, label)
    } else {
      // ??: 如果左边不是 null/undefined，跳过右边
      this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)
    }

    // 丢弃左值 (因为需要用右值)
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 计算右操作数
    this.context.visit(node.right)

    // 发射标签
    this.compiler.emitLabelInt(fd, label)
  }

  // ============================================================================
  // 条件表达式 - 对应 parser.c:5954-5980 js_parse_cond_expr
  // ============================================================================

  /**
   * 访问条件表达式 (三元运算符) - 对应 parser.c:5954-5980
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5954-5980
   */
  visitConditionalExpression(node: ts.ConditionalExpression): void {
    const fd = this.funcDef!

    // 计算条件
    this.context.visit(node.condition)

    // 创建标签
    const labelFalse = this.compiler.newLabelInt(fd)
    const labelEnd = this.compiler.newLabelInt(fd)

    // 条件为假跳转到 labelFalse
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelFalse)

    // 计算 true 分支
    this.context.visit(node.whenTrue)

    // 跳转到结束
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

    // false 分支标签
    this.compiler.emitLabelInt(fd, labelFalse)

    // 计算 false 分支
    this.context.visit(node.whenFalse)

    // 结束标签
    this.compiler.emitLabelInt(fd, labelEnd)
  }

  // ============================================================================
  // 赋值表达式 - 对应 parser.c:5982-6275 js_parse_assign_expr2
  // ============================================================================

  /**
   * 访问赋值表达式 - 对应 parser.c:6177-6275
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6177-6275
   */
  private visitAssignmentExpression(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const op = node.operatorToken.kind
    const sourcePos = node.operatorToken.getStart()

    // 简单赋值 =
    if (op === ts.SyntaxKind.EqualsToken) {
      this.emitSimpleAssignment(node)
      return
    }

    // 逻辑赋值运算符 (&&=, ||=, ??=)
    if (op === ts.SyntaxKind.AmpersandAmpersandEqualsToken ||
        op === ts.SyntaxKind.BarBarEqualsToken ||
        op === ts.SyntaxKind.QuestionQuestionEqualsToken) {
      this.emitLogicalAssignment(node)
      return
    }

    // 复合赋值运算符 (+=, -=, etc.)
    this.emitCompoundAssignment(node)
  }

  /**
   * 发射简单赋值 - 对应 parser.c:6177-6195
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6177-6195
   */
  private emitSimpleAssignment(node: ts.BinaryExpression): void {
    const fd = this.funcDef!

    // 对于简单标识符赋值，直接使用 scope_put_var
    if (ts.isIdentifier(node.left)) {
      // 计算右值
      this.context.visit(node.right)

      // 发射 dup 以保留赋值结果
      this.compiler.emitOp(fd, Opcode.OP_dup)

      // 发射 scope_put_var
      const name = this.compiler.addAtom(node.left.text)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU16(fd, fd.scopeLevel)
      return
    }

    // 属性赋值
    if (ts.isPropertyAccessExpression(node.left)) {
      // 计算对象
      this.context.visit(node.left.expression)

      // 计算值
      this.context.visit(node.right)

      // 发射 dup 以保留赋值结果  
      this.compiler.emitOp(fd, Opcode.OP_insert2)

      // 发射 put_field
      const name = this.compiler.addAtom(node.left.name.text)
      // QuickJS: put_lvalue() 里的 OP_put_field 不会触发 emit_source_pos
      // third_party/QuickJS/src/core/parser.c: put_lvalue() -> emit_op(s, OP_put_field)
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      return
    }

    // 元素赋值
    if (ts.isElementAccessExpression(node.left)) {
      // 计算对象
      this.context.visit(node.left.expression)

      // 计算索引
      this.context.visit(node.left.argumentExpression)

      // 计算值
      this.context.visit(node.right)

      // 发射 dup 以保留赋值结果
      this.compiler.emitOp(fd, Opcode.OP_insert3)

      // 发射 put_array_el
      // QuickJS: put_lvalue() 里的 OP_put_array_el 不会触发 emit_source_pos
      // third_party/QuickJS/src/core/parser.c: put_lvalue() -> emit_op(s, OP_put_array_el)
      this.compiler.emitOp(fd, Opcode.OP_put_array_el)
      return
    }

    throw new Error('Invalid assignment target')
  }

  /**
   * 发射复合赋值 - 对应 parser.c:6195-6218
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6195-6218
   * 
   * 对于属性访问 (depth=1):
   *   1. 计算对象: 栈 [] -> [obj]
   *   2. OP_get_field2: 栈 [obj] -> [obj value]
   *   3. 计算右值: 栈 [obj value] -> [obj value rightVal]
   *   4. 运算: 栈 [obj value rightVal] -> [obj newValue]
   *   5. OP_insert2: 栈 [obj newValue] -> [newValue obj newValue]
   *   6. OP_put_field: 栈 [newValue obj newValue] -> [newValue]
   */
  private emitCompoundAssignment(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.operatorToken.getStart()

    // 获取复合运算的操作码
    const opcode = this.getCompoundOpcode(node.operatorToken.kind)
    if (opcode === null) {
      throw new Error('Invalid compound assignment operator')
    }

    // 根据左值类型处理
    if (ts.isIdentifier(node.left)) {
      // 简单变量: 使用 scope_make_ref / get_ref_value 模式
      const name = this.compiler.addAtom(node.left.text)
      const label = this.compiler.newLabelInt(fd)
      
      // OP_scope_make_ref: 栈 [] -> [ref ref]
      this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU32(fd, label)
      this.compiler.emitU16(fd, fd.scopeLevel)
      this.compiler.updateLabel(fd, label, 1)
      
      // OP_get_ref_value: 栈 [ref ref] -> [ref ref value]
      this.compiler.emitOp(fd, Opcode.OP_get_ref_value)
      
      // 计算右值: 栈 [ref ref value] -> [ref ref value rightVal]
      this.context.visit(node.right)
      
      // 执行运算: 栈 [ref ref value rightVal] -> [ref ref newValue]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // OP_insert3: 栈 [ref ref newValue] -> [newValue ref ref newValue]
      this.compiler.emitOp(fd, Opcode.OP_insert3)
      
      // OP_put_ref_value: 栈 [newValue ref ref newValue] -> [newValue]
      this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      return
    }

    if (ts.isPropertyAccessExpression(node.left)) {
      const name = this.compiler.addAtom(node.left.name.text)
      
      // 计算对象: 栈 [] -> [obj]
      this.context.visit(node.left.expression)
      
      // OP_get_field2: 栈 [obj] -> [obj value]
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      
      // 计算右值: 栈 [obj value] -> [obj value rightVal]
      this.context.visit(node.right)
      
      // 执行运算: 栈 [obj value rightVal] -> [obj newValue]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // OP_insert2: 栈 [obj newValue] -> [newValue obj newValue]
      this.compiler.emitOp(fd, Opcode.OP_insert2)
      
      // OP_put_field: 栈 [newValue obj newValue] -> [newValue]
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      return
    }

    if (ts.isElementAccessExpression(node.left)) {
      // 计算对象: 栈 [] -> [obj]
      this.context.visit(node.left.expression)
      
      // 计算索引: 栈 [obj] -> [obj idx]
      this.context.visit(node.left.argumentExpression)
      
      // OP_get_array_el2: 栈 [obj idx] -> [obj idx value]
      this.compiler.emitOp(fd, Opcode.OP_get_array_el2)
      
      // 计算右值: 栈 [obj idx value] -> [obj idx value rightVal]
      this.context.visit(node.right)
      
      // 执行运算: 栈 [obj idx value rightVal] -> [obj idx newValue]
      this.compiler.emitOp(fd, opcode, sourcePos)
      
      // OP_insert3: 栈 [obj idx newValue] -> [newValue obj idx newValue]
      this.compiler.emitOp(fd, Opcode.OP_insert3)
      
      // OP_put_array_el: 栈 [newValue obj idx newValue] -> [newValue]
      this.compiler.emitOp(fd, Opcode.OP_put_array_el)
      return
    }

    throw new Error('Invalid compound assignment target')
  }

  /**
   * 发射逻辑赋值 (&&=, ||=, ??=) - 对应 parser.c:6220-6275
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6220-6275
   * 
   * 对于变量 (depth=2):
   *   1. OP_scope_make_ref: 栈: [] -> [ref ref] (nPush=2)
   *   2. OP_get_ref_value:  栈: [ref ref] -> [ref ref value] (nPop=2, nPush=3)
   *   3. OP_dup: 栈: [ref ref value] -> [ref ref value value]
   *   4. 条件判断 + if_true/if_false labelSkip
   *   如果需要赋值:
   *     5. OP_drop: 栈: [ref ref value] -> [ref ref]
   *     6. 计算新值: 栈: [ref ref] -> [ref ref newValue]
   *     7. OP_insert3: 栈: [ref ref newValue] -> [newValue ref ref newValue] (nPop=3, nPush=4)
   *     8. OP_put_ref_value: 栈: [newValue ref ref newValue] -> [newValue] (nPop=3)
   *     9. goto labelEnd
   *   labelSkip:
   *     5. OP_nip: 栈: [ref ref value] -> [ref value]
   *     6. OP_nip: 栈: [ref value] -> [value]
   *   labelEnd:
   *     栈: [value] (1 个值)
   */
  private emitLogicalAssignment(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const op = node.operatorToken.kind

    // QuickJS: expression statements call emit_source_pos(s, s->token.ptr) before parsing the expression
    // (parser.c:7632-7649). For logical assignment we often avoid visiting the LHS node directly
    // (we lower to make_ref/get_ref_value or get_field2/get_array_el3), which would otherwise
    // naturally anchor the first pc2line sample. Ensure we still anchor to the LHS token.
    const sf = node.getSourceFile()

    // 对于简单变量 (depth=2)
    if (ts.isIdentifier(node.left)) {
      this.compiler.emitSourcePos(fd, node.left.getStart(sf))

      const name = this.compiler.addAtom(node.left.text)
      const labelSkip = this.compiler.newLabelInt(fd)
      const labelEnd = this.compiler.newLabelInt(fd)
      const labelRef = this.compiler.newLabelInt(fd)

      // 发射 OP_scope_make_ref + OP_get_ref_value
      // OP_scope_make_ref: nPush=2, 栈: [ref ref]
      this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU32(fd, labelRef)  // 标签偏移量
      this.compiler.emitU16(fd, fd.scopeLevel)
      this.compiler.updateLabel(fd, labelRef, 1)
      // OP_get_ref_value: nPop=2, nPush=3, 栈: [ref ref value]
      this.compiler.emitOp(fd, Opcode.OP_get_ref_value)

      // dup 值用于短路判断
      // 栈: [ref ref value] -> [ref ref value value]
      this.compiler.emitOp(fd, Opcode.OP_dup)

      // 根据运算符选择条件
      if (op === ts.SyntaxKind.QuestionQuestionEqualsToken) {
        this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
      }

      // 发射条件跳转
      // 栈: [ref ref value value] -> [ref ref value]
      if (op === ts.SyntaxKind.BarBarEqualsToken) {
        this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelSkip)
      } else {
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelSkip)
      }

      // 丢弃旧值
      // 栈: [ref ref value] -> [ref ref]
      this.compiler.emitOp(fd, Opcode.OP_drop)

      // 计算新值
      // 栈: [ref ref] -> [ref ref newValue]
      this.context.visit(node.right)

      // OP_insert3 把 newValue 插入到栈下面（复制栈顶到第3个位置下面）
      // 栈: [ref ref newValue] -> [newValue ref ref newValue]
      this.compiler.emitOp(fd, Opcode.OP_insert3)

      // OP_put_ref_value 消耗 3 个值
      // 栈: [newValue ref ref newValue] -> [newValue]
      this.compiler.emitOp(fd, Opcode.OP_put_ref_value)

      // 跳转到结束
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

      // 跳过标签 - 移除 2 个 ref 元素
      this.compiler.emitLabelInt(fd, labelSkip)
      // 栈: [ref ref value]
      this.compiler.emitOp(fd, Opcode.OP_nip)
      // 栈: [ref value]
      this.compiler.emitOp(fd, Opcode.OP_nip)
      // 栈: [value]

      // 结束标签
      this.compiler.emitLabelInt(fd, labelEnd)
      return
    }

    // 对于属性访问 (depth=1)
    if (ts.isPropertyAccessExpression(node.left)) {
      // Statement/LHS anchor (col 1)
      this.compiler.emitSourcePos(fd, node.left.getStart(sf))

      const name = this.compiler.addAtom(node.left.name.text)
      const labelSkip = this.compiler.newLabelInt(fd)
      const labelEnd = this.compiler.newLabelInt(fd)

      // 计算对象
      // 栈: [] -> [obj]
      this.context.visit(node.left.expression)

      // QuickJS member access records source position at the '.' token (op_token_ptr)
      // before emitting OP_get_field (then get_lvalue() truncates OP_get_field but keeps
      // the OP_line_num). Mirror that by anchoring to '.' before OP_get_field2.
      const text = sf.text
      const exprEnd = node.left.expression.getEnd()
      const nameStart = node.left.name.getStart(sf)
      let dotPos = -1
      for (let i = nameStart - 1; i >= exprEnd; i--) {
        const ch = text.charCodeAt(i)
        if (ch === 0x2e /* '.' */) {
          dotPos = i
          break
        }
      }
      if (dotPos >= 0) {
        this.compiler.emitSourcePos(fd, dotPos)
      }

      // OP_get_field2: nPop=1, nPush=2
      // 栈: [obj] -> [obj value]
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)

      // dup 值用于短路判断
      // 栈: [obj value] -> [obj value value]
      this.compiler.emitOp(fd, Opcode.OP_dup)

      // 根据运算符选择条件
      if (op === ts.SyntaxKind.QuestionQuestionEqualsToken) {
        this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
      }

      // 发射条件跳转
      // 栈: [obj value value] -> [obj value]
      if (op === ts.SyntaxKind.BarBarEqualsToken) {
        this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelSkip)
      } else {
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelSkip)
      }

      // 丢弃旧值
      // 栈: [obj value] -> [obj]
      this.compiler.emitOp(fd, Opcode.OP_drop)

      // 计算新值
      // 栈: [obj] -> [obj newValue]
      this.context.visit(node.right)

      // OP_insert2 把 newValue 插入到 obj 下面（复制栈顶到第2个位置下面）
      // 栈: [obj newValue] -> [newValue obj newValue]
      this.compiler.emitOp(fd, Opcode.OP_insert2)

      // OP_put_field 消耗 obj newValue
      // 栈: [newValue obj newValue] -> [newValue]
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)

      // 跳转到结束
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

      // 跳过标签 - 移除 1 个 obj 元素
      this.compiler.emitLabelInt(fd, labelSkip)
      // 栈: [obj value]
      this.compiler.emitOp(fd, Opcode.OP_nip)
      // 栈: [value]

      // 结束标签
      this.compiler.emitLabelInt(fd, labelEnd)
      return
    }

    // 对于元素访问 (depth=2)
    if (ts.isElementAccessExpression(node.left)) {
      this.compiler.emitSourcePos(fd, node.left.getStart(sf))

      const labelSkip = this.compiler.newLabelInt(fd)
      const labelEnd = this.compiler.newLabelInt(fd)

      // 计算对象
      // 栈: [] -> [obj]
      this.context.visit(node.left.expression)

      // 计算索引
      // 栈: [obj] -> [obj index]
      this.context.visit(node.left.argumentExpression)

      // OP_get_array_el3: nPop=2, nPush=3
      // 栈: [obj index] -> [obj index value]
      this.compiler.emitOp(fd, Opcode.OP_get_array_el3)

      // dup 值用于短路判断
      // 栈: [obj index value] -> [obj index value value]
      this.compiler.emitOp(fd, Opcode.OP_dup)

      // 根据运算符选择条件
      if (op === ts.SyntaxKind.QuestionQuestionEqualsToken) {
        this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
      }

      // 发射条件跳转
      // 栈: [obj index value value] -> [obj index value]
      if (op === ts.SyntaxKind.BarBarEqualsToken) {
        this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelSkip)
      } else {
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelSkip)
      }

      // 丢弃旧值
      // 栈: [obj index value] -> [obj index]
      this.compiler.emitOp(fd, Opcode.OP_drop)

      // 计算新值
      // 栈: [obj index] -> [obj index newValue]
      this.context.visit(node.right)

      // OP_insert3 把 newValue 插入到栈下面
      // 栈: [obj index newValue] -> [newValue obj index newValue]
      this.compiler.emitOp(fd, Opcode.OP_insert3)

      // OP_put_array_el 消耗 3 个值
      // 栈: [newValue obj index newValue] -> [newValue]
      this.compiler.emitOp(fd, Opcode.OP_put_array_el)

      // 跳转到结束
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

      // 跳过标签 - 移除 2 个元素 (obj, index)
      this.compiler.emitLabelInt(fd, labelSkip)
      // 栈: [obj index value]
      this.compiler.emitOp(fd, Opcode.OP_nip)
      // 栈: [obj value]
      this.compiler.emitOp(fd, Opcode.OP_nip)
      // 栈: [value]

      // 结束标签
      this.compiler.emitLabelInt(fd, labelEnd)
      return
    }

    throw new Error('Invalid logical assignment target')
  }

  /**
   * 根据深度发射 insert 指令
   */
  private emitInsertForDepth(depth: number): void {
    const fd = this.funcDef!
    switch (depth) {
      case 1:
        this.compiler.emitOp(fd, Opcode.OP_insert2)
        break
      case 2:
        this.compiler.emitOp(fd, Opcode.OP_insert3)
        break
      case 3:
        this.compiler.emitOp(fd, Opcode.OP_insert4)
        break
    }
  }

  /**
   * 根据深度发射 nip 指令移除 lvalue 栈元素
   */
  private emitNipForDepth(depth: number): void {
    const fd = this.funcDef!
    while (depth > 0) {
      this.compiler.emitOp(fd, Opcode.OP_nip)
      depth--
    }
  }

  // ============================================================================
  // 调用表达式 - 对应 parser.c:5128-5380
  // ============================================================================

  /**
   * 访问调用表达式 - 对应 parser.c:5128-5380
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5128-5380
   */
  visitCallExpression(node: ts.CallExpression, isTailCall: boolean = false, tailCallPos: number = -1): void {
    const fd = this.funcDef!
    // QuickJS: js_parse_call (parser.c:5128-5380)
    // 调用点的 source-pos 更接近 callee 结束处（通常是 '(' 位置）。
    const callSourcePos = node.expression.getEnd()
    let isMethodCall = false
    let isSuperCall = false

    // Optional call: callee?.(args)
    // QuickJS: optional_chain_test() around the call-site (parser.c: optional_chain_test + js_parse_postfix_expr)
    if ((node as any).questionDotToken != null) {
      const endLabel = this.getOptionalChainEndLabel(fd, node)
      let dropCount = 1

      const sf = node.getSourceFile()
      const sourceText = sf.text

      // QuickJS anchors the call opcode source position to the '(' token in parse_func_call.
      // TS's `node.expression.getEnd()` points to the end of the callee, so we try to find the
      // actual '(' for correct pc2line column alignment.
      let optionalCallParenPos = node.arguments.pos - 1
      if (
        optionalCallParenPos < 0 ||
        optionalCallParenPos >= sourceText.length ||
        sourceText.charCodeAt(optionalCallParenPos) !== 0x28 /* '(' */
      ) {
        optionalCallParenPos = callSourcePos
        const scanStart = Math.max(0, node.expression.getEnd())
        const scanEnd = Math.min(sourceText.length, node.end)
        for (let i = scanStart; i < scanEnd; i++) {
          if (sourceText.charCodeAt(i) === 0x28 /* '(' */) {
            optionalCallParenPos = i
            break
          }
        }
      }

      const qdotToken: any = (node as any).questionDotToken
      const callQDotPos = qdotToken ? qdotToken.getStart(sf) : -1
      let optionalCallTestSourcePos = callQDotPos

      const callee = node.expression as any
      if (ts.isPropertyAccessExpression(callee)) {
        // obj.method?.(args)
        this.context.visit(callee.expression)

        // Align member-access sourcePos to the '.' / '?.' token (QuickJS behavior).
        const sf2 = callee.getSourceFile()
        const text2 = sf2.text
        const exprEnd2 = callee.expression.getEnd()
        const nameStart2 = callee.name.getStart(sf2)
        let dotPos2 = -1
        for (let i = nameStart2 - 1; i >= exprEnd2; i--) {
          const ch = text2.charCodeAt(i)
          if (
            ch === 0x3f /* '?' */ &&
            i + 1 < text2.length &&
            text2.charCodeAt(i + 1) === 0x2e /* '.' */
          ) {
            dotPos2 = i
            break
          }
          if (ch === 0x2e /* '.' */) {
            dotPos2 = i
            break
          }
        }
        let memberSourcePos = dotPos2 >= 0 ? dotPos2 : callee.name.getStart(sf2)
        const qdotToken2: any = (callee as any).questionDotToken
        if (qdotToken2) {
          memberSourcePos = qdotToken2.getStart(sf2)
        }

        // If the property access itself is optional (obj?.method?.()), test before get_field2
        if (callee.questionDotToken != null) {
          this.emitOptionalChainTest(fd, endLabel, 1, memberSourcePos)
        }

        const methodName = this.compiler.addAtom(callee.name.text)
        this.compiler.emitOp(fd, Opcode.OP_get_field2, memberSourcePos)
        this.compiler.emitAtom(fd, methodName)
        this.compiler.emitIc(fd, methodName)
        isMethodCall = true
        dropCount = 2
        // QuickJS keeps the optional-call test anchored to the member-access token.
        optionalCallTestSourcePos = memberSourcePos
      } else if (ts.isElementAccessExpression(callee)) {
        // obj[key]?.(args)
        this.context.visit(callee.expression)

        // Align element-access sourcePos to the '[' token (QuickJS behavior).
        const sf2 = callee.getSourceFile()
        const text2 = sf2.text
        const exprEnd2 = callee.expression.getEnd()
        const argStart2 = callee.argumentExpression.getStart(sf2)
        let bracketPos2 = -1
        for (let i = argStart2 - 1; i >= exprEnd2; i--) {
          if (text2.charCodeAt(i) === 0x5b /* '[' */) {
            bracketPos2 = i
            break
          }
        }
        const elementSourcePos = bracketPos2 >= 0 ? bracketPos2 : callee.getStart(sf2)

        if (callee.questionDotToken != null) {
          const qdotToken2: any = (callee as any).questionDotToken
          const qdotPos2 = qdotToken2 ? qdotToken2.getStart(sf2) : -1
          this.emitOptionalChainTest(fd, endLabel, 1, qdotPos2 >= 0 ? qdotPos2 : elementSourcePos)
        }

        this.context.visit(callee.argumentExpression)
        this.compiler.emitOp(fd, Opcode.OP_get_array_el2, elementSourcePos)
        isMethodCall = true
        dropCount = 2
        // QuickJS keeps the optional-call test anchored to the element-access token.
        optionalCallTestSourcePos = elementSourcePos
      } else {
        // func?.(args)
        this.context.visit(callee)
        isMethodCall = false
        dropCount = 1
      }

      // Optional-call test (drop this+func for method calls, or func for plain calls)
      this.emitOptionalChainTest(fd, endLabel, dropCount, optionalCallTestSourcePos)

      // 处理参数（复用原有 suppressSourcePos 策略）
      const argCount = node.arguments.length
      const prevSuppressSourcePos = fd.suppressSourcePos
      try {
        for (const arg of node.arguments) {
          const expr = ts.isSpreadElement(arg) ? arg.expression : arg
          const isSimpleLiteralArg =
            ts.isNumericLiteral(expr) ||
            ts.isStringLiteral(expr) ||
            ts.isNoSubstitutionTemplateLiteral(expr) ||
            expr.kind === ts.SyntaxKind.TrueKeyword ||
            expr.kind === ts.SyntaxKind.FalseKeyword ||
            expr.kind === ts.SyntaxKind.NullKeyword ||
            ts.isBigIntLiteral(expr)

          fd.suppressSourcePos = prevSuppressSourcePos || isSimpleLiteralArg

          if (ts.isSpreadElement(arg)) {
            this.context.visit(arg.expression)
          } else {
            this.context.visit(arg)
          }
        }
      } finally {
        fd.suppressSourcePos = prevSuppressSourcePos
      }

      if (isMethodCall) {
        this.compiler.emitOp(fd, Opcode.OP_call_method, optionalCallParenPos)
        this.compiler.emitU16(fd, argCount)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_call, optionalCallParenPos)
        this.compiler.emitU16(fd, argCount)
      }

      if (node === this.getOptionalChainRoot(node)) {
        this.compiler.emitLabelInt(fd, endLabel)
      }
      return
    }

    // 检查是否是 super() 调用 - 对应 parser.c:5236-5245
    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
      // super() 调用: 派生类构造函数中调用父类构造函数
      // 发射: get_var(this_active_func), get_super, get_var(new_target)
      
      // OP_scope_get_var this_active_func
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this_active_func)
      this.compiler.emitU16(fd, 0)
      
      // OP_get_super
      this.compiler.emitOp(fd, Opcode.OP_get_super)
      
      // OP_scope_get_var new_target
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_new_target)
      this.compiler.emitU16(fd, 0)
      
      isSuperCall = true
    } else if (ts.isPropertyAccessExpression(node.expression)) {
      // 检查是否是 super.method() 调用
      if (node.expression.expression.kind === ts.SyntaxKind.SuperKeyword) {
        // super.method() 调用
        // 发射: get_var(this), get_var(home_object), get_super, get_field2
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
        this.compiler.emitU16(fd, 0)
        
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_home_object)
        this.compiler.emitU16(fd, 0)
        
        this.compiler.emitOp(fd, Opcode.OP_get_super)
        
        // 使用 get_field2 获取方法并保留 this
        const methodName = this.compiler.addAtom(node.expression.name.text)
        // QuickJS: 属性访问/方法调用的字节码发射在 js_parse_call/js_parse_postfix_expr
        // (parser.c:5128-5380 / 5393-5432)。
        // 成员访问的 source-pos 更接近 '.'；TS AST 没有 dot 节点，这里用 objExpr.getEnd() 近似。
        this.compiler.emitOp(fd, Opcode.OP_get_field2, node.expression.expression.getEnd())
        this.compiler.emitAtom(fd, methodName)
        this.compiler.emitIc(fd, methodName)
        isMethodCall = true
      } else {
        // 普通方法调用: obj.method()
        this.context.visit(node.expression.expression) // 计算对象

        // 使用 get_field2 获取方法并保留对象
        const methodName = this.compiler.addAtom(node.expression.name.text)
        this.compiler.emitOp(fd, Opcode.OP_get_field2, node.expression.expression.getEnd())
        this.compiler.emitAtom(fd, methodName)
        this.compiler.emitIc(fd, methodName)
        isMethodCall = true
      }
    } else if (ts.isElementAccessExpression(node.expression)) {
      // 方法调用: obj[key]()
      this.context.visit(node.expression.expression) // 计算对象
      this.context.visit(node.expression.argumentExpression) // 计算索引

      // 使用 get_array_el2 获取方法并保留对象
      this.compiler.emitOp(fd, Opcode.OP_get_array_el2, node.expression.getStart())
      isMethodCall = true
    } else if (!isSuperCall) {
      // 普通函数调用（非 super 调用）
      this.context.visit(node.expression)
    }

    // 处理参数
    // QuickJS 的 pc2line 采样点并不会“对所有实参一刀切抑制”。
    // 这里仅对“简单字面量实参”抑制 source-pos，避免把常量实参变成独立采样点；
    // 对标识符/调用/成员访问等非字面量仍保留 source-pos，以匹配 WASM 输出。
    const argCount = node.arguments.length
    const prevSuppressSourcePos = fd.suppressSourcePos
    try {
      for (const arg of node.arguments) {
        const expr = ts.isSpreadElement(arg) ? arg.expression : arg
        const isSimpleLiteralArg =
          ts.isNumericLiteral(expr) ||
          ts.isStringLiteral(expr) ||
          ts.isNoSubstitutionTemplateLiteral(expr) ||
          expr.kind === ts.SyntaxKind.TrueKeyword ||
          expr.kind === ts.SyntaxKind.FalseKeyword ||
          expr.kind === ts.SyntaxKind.NullKeyword ||
          ts.isBigIntLiteral(expr)

        fd.suppressSourcePos = prevSuppressSourcePos || isSimpleLiteralArg

        if (ts.isSpreadElement(arg)) {
          // TODO: 处理展开参数
          this.context.visit(arg.expression)
        } else {
          this.context.visit(arg)
        }
      }
    } finally {
      fd.suppressSourcePos = prevSuppressSourcePos
    }

    // 发射调用指令
    if (isSuperCall) {
      // super() 调用使用 OP_call_constructor
      this.compiler.emitOp(fd, Opcode.OP_call_constructor, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    } else if (isMethodCall) {
      this.compiler.emitOp(fd, Opcode.OP_call_method, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_call, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    }
  }

  // ============================================================================
  // 属性访问表达式 - 对应 parser.c:5393-5432
  // ============================================================================

  /**
   * 访问属性访问表达式 - 对应 parser.c:5393-5432
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5393-5432
   */
  visitPropertyAccessExpression(node: ts.PropertyAccessExpression): void {
    const fd = this.funcDef!
    // QuickJS: member access records source position at the '.' token (op_token_ptr),
    // not at the property identifier.
    // See third_party/QuickJS/src/core/parser.c: js_parse_postfix_expr(), branch `s->token.val == '.'`:
    //   op_token_ptr = s->token.ptr; ... emit_source_pos(s, op_token_ptr); emit_op(s, OP_get_field);
    const sf = node.getSourceFile()
    const text = sf.text
    const exprEnd = node.expression.getEnd()
    const nameStart = node.name.getStart(sf)
    let dotPos = -1
    for (let i = nameStart - 1; i >= exprEnd; i--) {
      const ch = text.charCodeAt(i)
      if (ch === 0x2e /* '.' */) {
        dotPos = i
        break
      }
      if (ch === 0x3f /* '?' */ && i + 1 < text.length && text.charCodeAt(i + 1) === 0x2e /* '.' */) {
        // optional chaining token `?.` — best-effort align to token start
        dotPos = i
        break
      }
    }
    // Default member-access sourcePos is the '.' token; for optional chaining we prefer the
    // AST token start to avoid edge-cases where exprEnd skips past `?.`.
    let sourcePos = dotPos >= 0 ? dotPos : nameStart
    const qdotToken: any = (node as any).questionDotToken
    if (qdotToken) {
      sourcePos = qdotToken.getStart(sf)
    }

    // 计算对象
    this.context.visit(node.expression)

    // Optional chaining: obj?.prop
    // QuickJS: js_parse_postfix_expr() `TOK_QUESTION_MARK_DOT` + optional_chain_test(drop_count=1)
    if ((node as any).questionDotToken != null) {
      const endLabel = this.getOptionalChainEndLabel(fd, node)
      // Bind optional-chain test to the `?.` token to match QuickJS pc2line sampling.
      this.emitOptionalChainTest(fd, endLabel, 1, sourcePos)

      const name = this.compiler.addAtom(node.name.text)
      this.compiler.emitOp(fd, Opcode.OP_get_field, sourcePos)
      this.compiler.emitAtom(fd, name)
      this.compiler.emitIc(fd, name)

      if (node === this.getOptionalChainRoot(node)) {
        this.compiler.emitLabelInt(fd, endLabel)
      }
      return
    }

    // 发射 get_field 指令
    const name = this.compiler.addAtom(node.name.text)
    this.compiler.emitOp(fd, Opcode.OP_get_field, sourcePos)
    this.compiler.emitAtom(fd, name)
    this.compiler.emitIc(fd, name)
  }

  // ============================================================================
  // 元素访问表达式 - 对应 parser.c:5433-5461
  // ============================================================================

  /**
   * 访问元素访问表达式 - 对应 parser.c:5433-5461
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5433-5461
   */
  visitElementAccessExpression(node: ts.ElementAccessExpression): void {
    const fd = this.funcDef!

    // QuickJS: element access records source position at the '[' token (op_token_ptr).
    // See third_party/QuickJS/src/core/parser.c: js_parse_postfix_expr(), branch `s->token.val == '['`:
    //   op_token_ptr = s->token.ptr; ... emit_source_pos(s, op_token_ptr); emit_op(s, OP_get_array_el);
    const sf = node.getSourceFile()
    const text = sf.text
    const exprEnd = node.expression.getEnd()
    const argStart = node.argumentExpression.getStart(sf)
    let bracketPos = -1
    for (let i = argStart - 1; i >= exprEnd; i--) {
      if (text.charCodeAt(i) === 0x5b /* '[' */) {
        bracketPos = i
        break
      }
    }
    const sourcePos = bracketPos >= 0 ? bracketPos : node.getStart(sf)

    // 计算对象
    this.context.visit(node.expression)

    // Optional chaining: obj?.[expr]
    // QuickJS: optional_chain_test(drop_count=1) before evaluating index + OP_get_array_el
    if ((node as any).questionDotToken != null) {
      const endLabel = this.getOptionalChainEndLabel(fd, node)
      const qdotToken: any = (node as any).questionDotToken
      const qdotPos = qdotToken ? qdotToken.getStart(sf) : -1

      // QuickJS does NOT call emit_source_pos() before optional_chain_test() for array access.
      // It only emits source pos at `op_token_ptr` right before OP_get_array_el.
      this.emitOptionalChainTest(fd, endLabel, 1)

      // 计算索引
      this.context.visit(node.argumentExpression)

      // 发射 get_array_el 指令
      this.compiler.emitOp(fd, Opcode.OP_get_array_el, qdotPos >= 0 ? qdotPos : sourcePos)

      if (node === this.getOptionalChainRoot(node)) {
        this.compiler.emitLabelInt(fd, endLabel)
      }
      return
    }

    // 计算索引
    this.context.visit(node.argumentExpression)

    // 发射 get_array_el 指令
    this.compiler.emitOp(fd, Opcode.OP_get_array_el, sourcePos)
  }

  // ============================================================================
  // Optional chaining (?.) - 对应 parser.c: js_parse_postfix_expr + optional_chain_test
  // ============================================================================

  private getOptionalChainRoot(node: ts.Node): ts.Node {
    let cur: ts.Node = node
    for (;;) {
      const p = cur.parent
      if (!p) break

      const anyP: any = p as any
      const isOptionalByToken = anyP.questionDotToken != null

      // Note: TypeScript AST in this workspace represents optional chaining using
      // the normal SyntaxKind.*Expression nodes plus `questionDotToken`.
      const isChainParent =
        p.kind === ts.SyntaxKind.PropertyAccessChain ||
        p.kind === ts.SyntaxKind.ElementAccessChain ||
        p.kind === ts.SyntaxKind.CallChain ||
        ((p.kind === ts.SyntaxKind.PropertyAccessExpression ||
          p.kind === ts.SyntaxKind.ElementAccessExpression ||
          p.kind === ts.SyntaxKind.CallExpression) &&
          isOptionalByToken)

      // In TS AST, chained nodes nest via `.expression`.
      if (isChainParent && (p as any).expression === cur) {
        cur = p
        continue
      }
      break
    }
    return cur
  }

  private getOptionalChainEndLabel(fd: FunctionDef, node: ts.Node): number {
    const root = this.getOptionalChainRoot(node)
    const existing = this.optionalChainEndLabels.get(root)
    if (existing != null) return existing
    const label = this.compiler.newLabelInt(fd)
    this.optionalChainEndLabels.set(root, label)
    return label
  }

  private emitOptionalChainTest(fd: FunctionDef, endLabel: number, dropCount: number, sourcePos: number = -1): void {
    // Mirror QuickJS optional_chain_test() in parser.c:
    //   dup; is_undefined_or_null; if_false label_next;
    //   drop xN; undefined; goto endLabel; label_next:
    const labelNext = this.compiler.newLabelInt(fd)
    // QuickJS calls emit_source_pos() at the `?.` token before emitting the optional-chain test.
    // To mirror that, we bind sourcePos only to the first opcode in the test (dup).
    this.compiler.emitOp(fd, Opcode.OP_dup, sourcePos)
    this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelNext)
    for (let i = 0; i < dropCount; i++) {
      this.compiler.emitOp(fd, Opcode.OP_drop)
    }
    this.compiler.emitOp(fd, Opcode.OP_undefined)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, endLabel)
    this.compiler.emitLabelInt(fd, labelNext)
  }

  visitPropertyAccessChain(node: any): void {
    const fd = this.funcDef!
    const endLabel = this.getOptionalChainEndLabel(fd, node)

    // Evaluate receiver (could itself be a chain)
    this.context.visit(node.expression)

    // QuickJS: optional_chain_test(..., drop_count=1) before OP_get_field
    this.emitOptionalChainTest(fd, endLabel, 1)

    // Emit get_field with source position aligned to `?.`/`.` token
    const sf = node.getSourceFile()
    const text = sf.text
    const exprEnd = node.expression.getEnd()
    const nameStart = node.name.getStart(sf)
    let dotPos = -1
    for (let i = nameStart - 1; i >= exprEnd; i--) {
      const ch = text.charCodeAt(i)
      if (ch === 0x2e /* '.' */) {
        dotPos = i
        break
      }
      if (ch === 0x3f /* '?' */ && i + 1 < text.length && text.charCodeAt(i + 1) === 0x2e /* '.' */) {
        dotPos = i
        break
      }
    }
    const sourcePos = dotPos >= 0 ? dotPos : nameStart

    const name = this.compiler.addAtom(node.name.text)
    this.compiler.emitOp(fd, Opcode.OP_get_field, sourcePos)
    this.compiler.emitAtom(fd, name)
    this.compiler.emitIc(fd, name)

    if (node === this.getOptionalChainRoot(node)) {
      this.compiler.emitLabelInt(fd, endLabel)
    }
  }

  visitElementAccessChain(node: any): void {
    const fd = this.funcDef!
    const endLabel = this.getOptionalChainEndLabel(fd, node)

    // Evaluate receiver
    this.context.visit(node.expression)

    // QuickJS: optional_chain_test(..., drop_count=1) before parsing index and OP_get_array_el
    this.emitOptionalChainTest(fd, endLabel, 1)

    // Evaluate index
    this.context.visit(node.argumentExpression)

    // Emit get_array_el with source position aligned to '['
    const sf = node.getSourceFile()
    const text = sf.text
    const exprEnd = node.expression.getEnd()
    const argStart = node.argumentExpression.getStart(sf)
    let bracketPos = -1
    for (let i = argStart - 1; i >= exprEnd; i--) {
      if (text.charCodeAt(i) === 0x5b /* '[' */) {
        bracketPos = i
        break
      }
    }
    const sourcePos = bracketPos >= 0 ? bracketPos : node.getStart(sf)

    this.compiler.emitOp(fd, Opcode.OP_get_array_el, sourcePos)

    if (node === this.getOptionalChainRoot(node)) {
      this.compiler.emitLabelInt(fd, endLabel)
    }
  }

  visitCallChain(node: any): void {
    const fd = this.funcDef!
    const endLabel = this.getOptionalChainEndLabel(fd, node)
    const callSourcePos = node.expression.getEnd()

    let isMethodCall = false
    let dropCount = 1

    const expr = node.expression

    // Mirror QuickJS js_parse_postfix_expr() call-site logic: determine how many stack values
    // must be dropped when the callee is nullish.
    if (expr.kind === ts.SyntaxKind.PropertyAccessExpression || expr.kind === ts.SyntaxKind.PropertyAccessChain) {
      // obj?.prop?.(args)
      this.context.visit(expr.expression)
      const methodName = this.compiler.addAtom(expr.name.text)
      this.compiler.emitOp(fd, Opcode.OP_get_field2, expr.expression.getEnd())
      this.compiler.emitAtom(fd, methodName)
      this.compiler.emitIc(fd, methodName)
      isMethodCall = true
      dropCount = 2
    } else if (expr.kind === ts.SyntaxKind.ElementAccessExpression || expr.kind === ts.SyntaxKind.ElementAccessChain) {
      // obj?.[key]?.(args)
      this.context.visit(expr.expression)
      this.context.visit(expr.argumentExpression)
      this.compiler.emitOp(fd, Opcode.OP_get_array_el2, expr.getStart())
      isMethodCall = true
      dropCount = 2
    } else {
      // func?.(args)
      this.context.visit(expr)
      isMethodCall = false
      dropCount = 1
    }

    // Optional call test (QuickJS: optional_chain_test(..., drop_count))
    this.emitOptionalChainTest(fd, endLabel, dropCount)

    // Arguments
    const argCount = node.arguments.length
    const prevSuppressSourcePos = fd.suppressSourcePos
    try {
      for (const arg of node.arguments) {
        const a = ts.isSpreadElement(arg) ? arg.expression : arg
        const isSimpleLiteralArg =
          ts.isNumericLiteral(a) ||
          ts.isStringLiteral(a) ||
          ts.isNoSubstitutionTemplateLiteral(a) ||
          a.kind === ts.SyntaxKind.TrueKeyword ||
          a.kind === ts.SyntaxKind.FalseKeyword ||
          a.kind === ts.SyntaxKind.NullKeyword ||
          ts.isBigIntLiteral(a)

        fd.suppressSourcePos = prevSuppressSourcePos || isSimpleLiteralArg

        if (ts.isSpreadElement(arg)) {
          this.context.visit(arg.expression)
        } else {
          this.context.visit(arg)
        }
      }
    } finally {
      fd.suppressSourcePos = prevSuppressSourcePos
    }

    if (isMethodCall) {
      this.compiler.emitOp(fd, Opcode.OP_call_method, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_call, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    }

    if (node === this.getOptionalChainRoot(node)) {
      this.compiler.emitLabelInt(fd, endLabel)
    }
  }

  // ============================================================================
  // 数组字面量 - 对应 parser.c:3743-4135
  // ============================================================================

  /**
   * 访问数组字面量 - 对应 parser.c:3743-4135
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:3743-4135
   */
  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()
    const elements = node.elements

    // 检查是否有展开元素
    const hasSpread = elements.some(e => ts.isSpreadElement(e))

    if (!hasSpread) {
      // 简单数组: 使用 array_from
      const nonEmptyCount = elements.filter(e => !ts.isOmittedExpression(e)).length
      
      // 计算所有元素
      for (const elem of elements) {
        if (ts.isOmittedExpression(elem)) {
          // 空洞元素
          this.compiler.emitOp(fd, Opcode.OP_undefined)
        } else {
          this.context.visit(elem)
        }
      }

      // 发射 array_from 指令
      // QuickJS: js_parse_array_literal() 里对 OP_array_from 使用 emit_op(s, OP_array_from)
      // 并不会为该结构性指令调用 emit_source_pos()。
      // 参见: third_party/QuickJS/src/core/parser.c: js_parse_array_literal (emit_op(s, OP_array_from)).
      // 为了对齐 pc2line 采样点，这里不绑定 sourcePos。
      this.compiler.emitOp(fd, Opcode.OP_array_from)
      this.compiler.emitU16(fd, elements.length)
    } else {
      // 有展开元素的数组
      // 创建空数组
      // QuickJS: js_parse_array_literal() 里同样不会为 OP_array_from 绑定 source 位置。
      // 参见: third_party/QuickJS/src/core/parser.c: js_parse_array_literal.
      this.compiler.emitOp(fd, Opcode.OP_array_from)
      this.compiler.emitU16(fd, 0)

      // 初始化索引
      this.compiler.emitOp(fd, Opcode.OP_push_i32)
      this.compiler.emitU32(fd, 0)

      for (const elem of elements) {
        if (ts.isSpreadElement(elem)) {
          // 展开元素
          this.context.visit(elem.expression)
          this.compiler.emitOp(fd, Opcode.OP_append)
        } else if (ts.isOmittedExpression(elem)) {
          // 空洞: 只增加索引
          this.compiler.emitOp(fd, Opcode.OP_inc)
        } else {
          // 普通元素
          this.context.visit(elem)
          this.compiler.emitOp(fd, Opcode.OP_define_array_el)
          this.compiler.emitOp(fd, Opcode.OP_inc)
        }
      }

      // 丢弃索引
      this.compiler.emitOp(fd, Opcode.OP_drop)
    }
  }

  // ============================================================================
  // 对象字面量 - 对应 parser.c:2912-3035
  // ============================================================================

  /**
   * 访问对象字面量 - 对应 parser.c:2912-3035
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:2912-3035
   */
  visitObjectLiteralExpression(node: ts.ObjectLiteralExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    // 创建空对象
    // QuickJS: js_parse_object_literal() 里对 OP_object 使用 emit_op(s, OP_object)
    // 并不会调用 emit_source_pos()。
    // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal (emit_op(s, OP_object)).
    // 为了对齐 pc2line 采样点，这里不绑定 sourcePos。
    this.compiler.emitOp(fd, Opcode.OP_object)

    // 处理每个属性
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        // 普通属性: key: value
        if (ts.isIdentifier(prop.name)) {
          // 标识符键
          this.context.visit(prop.initializer)
          const name = this.compiler.addAtom(prop.name.text)
          // QuickJS: js_parse_object_literal() 对 define_field 直接 emit_op，不绑定 source。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal (emit_op(s, OP_define_field)).
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, name)
        } else if (ts.isStringLiteral(prop.name)) {
          // 字符串键
          this.context.visit(prop.initializer)
          const name = this.compiler.addAtom(prop.name.text)
          // QuickJS: js_parse_object_literal() 对 define_field 直接 emit_op，不绑定 source。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, name)
        } else if (ts.isNumericLiteral(prop.name)) {
          // 数字键
          this.context.visit(prop.initializer)
          const name = this.compiler.addAtom(prop.name.text)
          // QuickJS: js_parse_object_literal() 对 define_field 直接 emit_op，不绑定 source。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, name)
        } else if (ts.isComputedPropertyName(prop.name)) {
          // 计算属性键
          this.context.visit(prop.name.expression)
          this.context.visit(prop.initializer)
          // QuickJS: computed key 路径会 emit_op(OP_to_propkey) / emit_op(OP_define_array_el)
          // 均不绑定 source 位置。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
          this.compiler.emitOp(fd, Opcode.OP_define_array_el)
        }
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        // 简写属性: { x } 等价于 { x: x }
        const name = prop.name.text
        const atom = this.compiler.addAtom(name)
        
        // 获取变量值
        // QuickJS: PROP_TYPE_VAR (shorthand) 路径里直接 emit_op(OP_scope_get_var)，不绑定 source。
        // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal (prop_type == PROP_TYPE_VAR).
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
        
        // 定义属性
        // QuickJS: shorthand 路径对 define_field 也是直接 emit_op，不绑定 source。
        // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
        this.compiler.emitOp(fd, Opcode.OP_define_field)
        this.compiler.emitAtom(fd, atom)
      } else if (ts.isSpreadAssignment(prop)) {
        // 展开属性: { ...obj }
        // QuickJS 源码: parser.c:2928-2937
        // 栈状态: [dest] -> 需要 [dest, src, excludeList]
        
        // 发射 OP_null 作为 excludeList
        this.compiler.emitOp(fd, Opcode.OP_null)
        
        // 访问 spread 表达式 (src)
        this.context.visit(prop.expression)
        
        // 发射 OP_copy_data_properties
        // 参数格式: (copy_flags) | (exclude_first_idx << 2) | (exclude_second_idx << 5)
        // copy_flags = 2: copy enumerable only
        // exclude_first_idx = 1: excludeList 在 src 下面
        // exclude_second_idx = 0: no second exclude
        // QuickJS: spread 路径 emit_op(OP_copy_data_properties) 不绑定 source。
        // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal (token == TOK_ELLIPSIS).
        this.compiler.emitOp(fd, Opcode.OP_copy_data_properties)
        this.compiler.emitU8(fd, 2 | (1 << 2) | (0 << 5))
        
        // 弹出 excludeList
        this.compiler.emitOp(fd, Opcode.OP_drop)
        // 弹出 src
        this.compiler.emitOp(fd, Opcode.OP_drop)
      } else if (ts.isMethodDeclaration(prop)) {
        // 方法声明: { foo() {} }
        // QuickJS: js_parse_object_literal() 对方法使用 fclosure + define_method，且方法是可枚举的。
        // WASM 参考: artifacts/optional-chaining (profile.greet) -> `fclosure8 ...` + `define_method greet,4`

        const isComputedName = ts.isComputedPropertyName(prop.name)

        if (isComputedName) {
          this.context.visit((prop.name as ts.ComputedPropertyName).expression)
        }

        // 生成闭包（由 FunctionVisitor.visitMethodDefinition 发射 OP_fclosure）
        this.context.visit(prop)

        if (isComputedName) {
          this.compiler.emitOp(fd, Opcode.OP_define_method_computed)
        } else {
          let methodNameText: string
          if (ts.isIdentifier(prop.name)) {
            methodNameText = prop.name.text
          } else if (ts.isStringLiteral(prop.name) || ts.isNumericLiteral(prop.name)) {
            methodNameText = prop.name.text
          } else {
            // Fallback (should be covered by computed)
            methodNameText = prop.name.getText(prop.getSourceFile())
          }
          const methodName = this.compiler.addAtom(methodNameText)
          this.compiler.emitOp(fd, Opcode.OP_define_method)
          this.compiler.emitAtom(fd, methodName)
        }

        // flags: enumerable(4) | method(0)
        this.compiler.emitU8(fd, 4)
      } else if (ts.isGetAccessorDeclaration(prop) || ts.isSetAccessorDeclaration(prop)) {
        // getter/setter
        // TODO: 实现 getter/setter
      }
    }
  }

  // ============================================================================
  // new 表达式 - 对应 parser.c:4984-5011
  // ============================================================================

  /**
   * 访问 new 表达式 - 对应 parser.c:4984-5011
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4984-5011
   */
  visitNewExpression(node: ts.NewExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    // 计算构造函数
    this.context.visit(node.expression)

    // dup 作为 new.target
    this.compiler.emitOp(fd, Opcode.OP_dup)

    // 处理参数
    const args = node.arguments || []
    const argCount = args.length
    for (const arg of args) {
      this.context.visit(arg)
    }

    // QuickJS 会把 call/construct 相关的 source pos 更贴近参数列表的 '(' 位置。
    // 对于 `new Foo(...)`，这里用 callee 表达式的 end 作为 '(' 的位置对齐列号。
    const callSourcePos = node.arguments ? node.expression.getEnd() : sourcePos

    // 发射 call_constructor 指令
    this.compiler.emitOp(fd, Opcode.OP_call_constructor, callSourcePos)
    this.compiler.emitU16(fd, argCount)
  }

  // ============================================================================
  // 特殊表达式 - void, delete, typeof
  // ============================================================================

  /**
   * 访问 void 表达式 - 对应 parser.c:5608-5611
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5608-5611
   */
  visitVoidExpression(node: ts.VoidExpression): void {
    const fd = this.funcDef!

    // 计算表达式 (为了副作用)
    this.context.visit(node.expression)

    // 丢弃结果
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 推送 undefined
    this.compiler.emitOp(fd, Opcode.OP_undefined)
  }

  /**
   * 访问 delete 表达式 - 对应 parser.c:5495-5580
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5495-5580
   */
  visitDeleteExpression(node: ts.DeleteExpression): void {
    const fd = this.funcDef!
    const expr = node.expression

    if (ts.isPropertyAccessExpression(expr)) {
      // QuickJS: js_parse_delete() 的实现策略是“先按普通 member access 生成 get_field，
      // 然后回看上一条 opcode，如果是 OP_get_field 就回退并改写成 delete 形式”。
      // third_party/QuickJS/src/core/parser.c: js_parse_delete(): case OP_get_field
      // 这样可以保留 member access 本身对 '.' token 的 emit_source_pos(op_token_ptr)。
      this.context.visit(expr)

      const lastPos = fd.lastOpcodePos
      const buf = fd.byteCode.buffer
      if (lastPos >= 0 && lastPos + 5 <= fd.byteCode.size && buf[lastPos] === Opcode.OP_get_field) {
        const name = (
          buf[lastPos + 1] |
          (buf[lastPos + 2] << 8) |
          (buf[lastPos + 3] << 16) |
          (buf[lastPos + 4] << 24)
        ) >>> 0

        // 截断掉最后一个 get_field（保留其之前已插入的 OP_line_num）
        fd.byteCode.size = lastPos
        fd.lastOpcodePos = -1

        // 推送属性名并发射 delete（delete 本身不绑定 sourcePos）
        this.compiler.emitOp(fd, Opcode.OP_push_atom_value)
        this.compiler.emitU32(fd, name)
        this.compiler.emitOp(fd, Opcode.OP_delete)
      } else {
        // fallback：如果不是预期的 get_field，退回到最小可用实现
        this.context.visit(expr.expression)
        const name = this.compiler.addAtom(expr.name.text)
        this.compiler.emitOp(fd, Opcode.OP_push_atom_value)
        this.compiler.emitU32(fd, name)
        this.compiler.emitOp(fd, Opcode.OP_delete)
      }
    } else if (ts.isElementAccessExpression(expr)) {
      // QuickJS: js_parse_delete(): case OP_get_array_el
      // 同样通过“先生成 get_array_el 再回退改写”为 delete，保留 '[' token 的采样点。
      this.context.visit(expr)

      const lastPos = fd.lastOpcodePos
      const buf = fd.byteCode.buffer
      if (lastPos >= 0 && lastPos + 1 <= fd.byteCode.size && buf[lastPos] === Opcode.OP_get_array_el) {
        fd.byteCode.size = lastPos
        fd.lastOpcodePos = -1
        this.compiler.emitOp(fd, Opcode.OP_delete)
      } else {
        // fallback
        this.context.visit(expr.expression)
        this.context.visit(expr.argumentExpression)
        this.compiler.emitOp(fd, Opcode.OP_delete)
      }
    } else if (ts.isIdentifier(expr)) {
      // delete variable - 在严格模式下是错误的
      // 非严格模式下使用 scope_delete_var
      const name = this.compiler.addAtom(expr.text)
      // QuickJS: js_parse_delete() 会把前一个 OP_scope_get_var 就地改写成 OP_scope_delete_var
      // 而不是发射一个带 sourcePos 的新 opcode。
      this.compiler.emitOp(fd, TempOpcode.OP_scope_delete_var)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU16(fd, fd.scopeLevel)
    } else {
      // delete 其他表达式: 计算并丢弃，返回 true
      this.context.visit(expr)
      this.compiler.emitOp(fd, Opcode.OP_drop)
      this.compiler.emitOp(fd, Opcode.OP_push_true)
    }
  }

  /**
   * 访问 typeof 表达式 - 对应 parser.c:5645-5662
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5645-5662
   */
  visitTypeOfExpression(node: ts.TypeOfExpression): void {
    const fd = this.funcDef!
    const expr = node.expression

    // 特殊处理标识符: 使用 scope_get_var_undef 避免 ReferenceError
    if (ts.isIdentifier(expr)) {
      const name = this.compiler.addAtom(expr.text)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var_undef, expr.getStart())
      this.compiler.emitU32(fd, name)
      this.compiler.emitU16(fd, fd.scopeLevel)
    } else {
      this.context.visit(expr)
    }

    // 发射 typeof
    // QuickJS: typeof 分支不会 emit_source_pos，只 emit_op(OP_typeof)
    // third_party/QuickJS/src/core/parser.c: js_parse_unary() TOK_TYPEOF -> emit_op(s, OP_typeof)
    this.compiler.emitOp(fd, Opcode.OP_typeof)
  }

  // ============================================================================
  // LValue 处理 - 对应 parser.c:3888-4135
  // ============================================================================

  /**
   * 获取 LValue 信息 - 对应 parser.c:3888-4012
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:3888-4012
   * 
   * 注意: 这是简化版本，完整版本需要检查最后一个操作码
   */
  private getLValue(node: ts.Expression, keep: boolean): LValueInfo | null {
    const fd = this.funcDef!

    if (ts.isIdentifier(node)) {
      const name = this.compiler.addAtom(node.text)
      const label = keep ? this.compiler.newLabelInt(fd) : -1
      return {
        opcode: TempOpcode.OP_scope_get_var,
        scope: fd.scopeLevel,
        name: name,
        label: label,
        depth: keep ? 2 : 0
      }
    }

    if (ts.isPropertyAccessExpression(node)) {
      const name = this.compiler.addAtom(node.name.text)
      return {
        opcode: Opcode.OP_get_field,
        scope: 0,
        name: name,
        label: -1,
        depth: 1
      }
    }

    if (ts.isElementAccessExpression(node)) {
      return {
        opcode: Opcode.OP_get_array_el,
        scope: 0,
        name: 0,
        label: -1,
        depth: 2
      }
    }

    return null
  }

  /**
   * 放置 LValue - 对应 parser.c:4026-4135
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4026-4135
   */
  private putLValue(lvalue: LValueInfo, special: PutLValueEnum, isLet: boolean): void {
    const fd = this.funcDef!

    // 根据 opcode 和 special 处理栈操作
    switch (lvalue.opcode) {
      case Opcode.OP_get_field:
        // depth = 1
        switch (special) {
          case PutLValueEnum.PUT_LVALUE_NOKEEP:
          case PutLValueEnum.PUT_LVALUE_NOKEEP_DEPTH:
            break
          case PutLValueEnum.PUT_LVALUE_KEEP_TOP:
            this.compiler.emitOp(fd, Opcode.OP_insert2)
            break
          case PutLValueEnum.PUT_LVALUE_KEEP_SECOND:
            this.compiler.emitOp(fd, Opcode.OP_perm3)
            break
          case PutLValueEnum.PUT_LVALUE_NOKEEP_BOTTOM:
            this.compiler.emitOp(fd, Opcode.OP_swap)
            break
        }
        this.compiler.emitOp(fd, Opcode.OP_put_field)
        this.compiler.emitU32(fd, lvalue.name)
        this.compiler.emitIc(fd, lvalue.name)
        break

      case Opcode.OP_get_array_el:
        // depth = 2
        switch (special) {
          case PutLValueEnum.PUT_LVALUE_NOKEEP:
            this.compiler.emitOp(fd, Opcode.OP_nop)
            break
          case PutLValueEnum.PUT_LVALUE_NOKEEP_DEPTH:
            break
          case PutLValueEnum.PUT_LVALUE_KEEP_TOP:
            this.compiler.emitOp(fd, Opcode.OP_insert3)
            break
          case PutLValueEnum.PUT_LVALUE_KEEP_SECOND:
            this.compiler.emitOp(fd, Opcode.OP_perm4)
            break
          case PutLValueEnum.PUT_LVALUE_NOKEEP_BOTTOM:
            this.compiler.emitOp(fd, Opcode.OP_rot3l)
            break
        }
        this.compiler.emitOp(fd, Opcode.OP_put_array_el)
        break

      case TempOpcode.OP_scope_get_var:
        // 简单变量赋值
        if (lvalue.label >= 0) {
          this.compiler.emitLabelInt(fd, lvalue.label)
        }
        this.compiler.emitOp(fd, isLet ? TempOpcode.OP_scope_put_var_init : TempOpcode.OP_scope_put_var)
        this.compiler.emitU32(fd, lvalue.name)
        this.compiler.emitU16(fd, lvalue.scope)
        break
    }
  }

  // ============================================================================
  // Await 和 Yield 表达式 - 对应 parser.c:5655-5700
  // ============================================================================

  /**
   * 访问 await 表达式 - 对应 parser.c:5655-5668
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5655-5668
   */
  visitAwaitExpression(node: ts.AwaitExpression): void {
    const fd = this.funcDef!

    // 计算 await 的表达式
    this.context.visit(node.expression)

    // 发射 await 指令
    this.compiler.emitOp(fd, Opcode.OP_await)
  }

  /**
   * 访问 yield 表达式 - 对应 parser.c:5670-5700
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5670-5700
   */
  visitYieldExpression(node: ts.YieldExpression): void {
    const fd = this.funcDef!

    if (node.expression) {
      // 计算 yield 的表达式
      this.context.visit(node.expression)
    } else {
      // yield 没有表达式时，yield undefined
      this.compiler.emitOp(fd, Opcode.OP_undefined)
    }

    if (node.asteriskToken) {
      // yield* 表达式
      this.compiler.emitOp(fd, Opcode.OP_yield_star)
    } else {
      // yield 表达式
      this.compiler.emitOp(fd, Opcode.OP_yield)
    }
  }
}
