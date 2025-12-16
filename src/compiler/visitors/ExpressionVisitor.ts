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
    const sourcePos = node.getStart()

    // 整数优化路径
    if (Number.isInteger(value)) {
      const intVal = value | 0

      // 使用 push_i32 指令
      this.compiler.emitOp(fd, Opcode.OP_push_i32, sourcePos)
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
    const sourcePos = node.getStart()

    // 检查是否可以使用 push_bigint_i32
    if (value >= BigInt(-2147483648) && value <= BigInt(2147483647)) {
      this.compiler.emitOp(fd, Opcode.OP_push_bigint_i32, sourcePos)
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
    this.compiler.emitOp(fd, Opcode.OP_null, node.getStart())
  }

  /**
   * 访问 true/false 字面量 - 对应 parser.c:4929-4936
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:4929-4936
   */
  visitBooleanLiteral(node: ts.BooleanLiteral): void {
    const fd = this.funcDef!
    const sourcePos = node.getStart()

    if (node.kind === ts.SyntaxKind.TrueKeyword) {
      this.compiler.emitOp(fd, Opcode.OP_push_true, sourcePos)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_push_false, sourcePos)
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
    const operandSourcePos = node.operand.getStart()

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
        this.compiler.emitOp(fd, Opcode.OP_lnot, sourcePos)
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
    const sourcePos = node.getStart()

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
      this.compiler.emitOp(fd, Opcode.OP_put_field, node.left.getStart())
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
      this.compiler.emitOp(fd, Opcode.OP_put_array_el, node.left.getStart())
      return
    }

    throw new Error('Invalid assignment target')
  }

  /**
   * 发射复合赋值 - 对应 parser.c:6195-6218
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6195-6218
   */
  private emitCompoundAssignment(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const sourcePos = node.operatorToken.getStart()

    // 获取复合运算的操作码
    const opcode = this.getCompoundOpcode(node.operatorToken.kind)
    if (opcode === null) {
      throw new Error('Invalid compound assignment operator')
    }

    // 计算 lvalue 并获取当前值
    this.context.visit(node.left)

    // 获取 lvalue 信息
    const lvalue = this.getLValue(node.left, true)
    if (!lvalue) {
      throw new Error('Invalid compound assignment target')
    }

    // 计算右值
    this.context.visit(node.right)

    // 执行运算
    this.compiler.emitOp(fd, opcode, sourcePos)

    // 存回并保留结果
    this.putLValue(lvalue, PutLValueEnum.PUT_LVALUE_KEEP_TOP, false)
  }

  /**
   * 发射逻辑赋值 (&&=, ||=, ??=) - 对应 parser.c:6220-6275
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:6220-6275
   */
  private emitLogicalAssignment(node: ts.BinaryExpression): void {
    const fd = this.funcDef!
    const op = node.operatorToken.kind

    // 计算 lvalue 并获取当前值
    this.context.visit(node.left)

    // 获取 lvalue 信息
    const lvalue = this.getLValue(node.left, true)
    if (!lvalue) {
      throw new Error('Invalid logical assignment target')
    }

    // 创建标签
    const labelSkip = this.compiler.newLabelInt(fd)

    // dup 值用于短路判断
    this.compiler.emitOp(fd, Opcode.OP_dup)

    // 根据运算符选择条件
    if (op === ts.SyntaxKind.QuestionQuestionEqualsToken) {
      this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
    }

    // 发射条件跳转
    if (op === ts.SyntaxKind.BarBarEqualsToken) {
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelSkip)
    } else {
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelSkip)
    }

    // 丢弃旧值
    this.compiler.emitOp(fd, Opcode.OP_drop)

    // 计算新值
    this.context.visit(node.right)

    // 存回 (需要处理栈调整)
    // 注意: 需要在 lvalue 栈元素下面插入值
    this.emitInsertForDepth(lvalue.depth)

    // 存回
    this.putLValue(lvalue, PutLValueEnum.PUT_LVALUE_NOKEEP_DEPTH, false)

    // 跳转到结束
    const labelEnd = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelEnd)

    // 跳过标签 - 删除 lvalue 栈元素
    this.compiler.emitLabelInt(fd, labelSkip)
    this.emitNipForDepth(lvalue.depth)

    // 结束标签
    this.compiler.emitLabelInt(fd, labelEnd)
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
    const sourcePos = node.getStart()
    let isMethodCall = false

    // 处理被调用表达式
    if (ts.isPropertyAccessExpression(node.expression)) {
      // 方法调用: obj.method()
      this.context.visit(node.expression.expression) // 计算对象

      // 使用 get_field2 获取方法并保留对象
      const methodName = this.compiler.addAtom(node.expression.name.text)
      this.compiler.emitOp(fd, Opcode.OP_get_field2, node.expression.getStart())
      this.compiler.emitAtom(fd, methodName)
      this.compiler.emitIc(fd, methodName)
      isMethodCall = true
    } else if (ts.isElementAccessExpression(node.expression)) {
      // 方法调用: obj[key]()
      this.context.visit(node.expression.expression) // 计算对象
      this.context.visit(node.expression.argumentExpression) // 计算索引

      // 使用 get_array_el2 获取方法并保留对象
      this.compiler.emitOp(fd, Opcode.OP_get_array_el2, node.expression.getStart())
      isMethodCall = true
    } else {
      // 普通函数调用
      this.context.visit(node.expression)
    }

    // 处理参数
    const argCount = node.arguments.length
    for (const arg of node.arguments) {
      if (ts.isSpreadElement(arg)) {
        // TODO: 处理展开参数
        this.context.visit(arg.expression)
      } else {
        this.context.visit(arg)
      }
    }

    // 发射调用指令
    this.compiler.emitOp(fd, TempOpcode.OP_line_num, sourcePos)
    this.compiler.emitU32(fd, sourcePos)

    if (isMethodCall) {
      this.compiler.emitOp(fd, Opcode.OP_call_method, sourcePos)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_call, sourcePos)
    }
    this.compiler.emitU16(fd, argCount)
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
    const sourcePos = node.getStart()

    // 计算对象
    this.context.visit(node.expression)

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
    const sourcePos = node.getStart()

    // 计算对象
    this.context.visit(node.expression)

    // 计算索引
    this.context.visit(node.argumentExpression)

    // 发射 get_array_el 指令
    this.compiler.emitOp(fd, Opcode.OP_get_array_el, sourcePos)
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
      this.compiler.emitOp(fd, Opcode.OP_array_from, sourcePos)
      this.compiler.emitU16(fd, elements.length)
    } else {
      // 有展开元素的数组
      // 创建空数组
      this.compiler.emitOp(fd, Opcode.OP_array_from, sourcePos)
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
    this.compiler.emitOp(fd, Opcode.OP_object, sourcePos)

    // 处理每个属性
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        // 普通属性: key: value
        if (ts.isIdentifier(prop.name)) {
          // 标识符键
          this.context.visit(prop.initializer)
          const name = this.compiler.addAtom(prop.name.text)
          this.compiler.emitOp(fd, Opcode.OP_define_field, prop.getStart())
          this.compiler.emitAtom(fd, name)
        } else if (ts.isStringLiteral(prop.name)) {
          // 字符串键
          this.context.visit(prop.initializer)
          const name = this.compiler.addAtom(prop.name.text)
          this.compiler.emitOp(fd, Opcode.OP_define_field, prop.getStart())
          this.compiler.emitAtom(fd, name)
        } else if (ts.isNumericLiteral(prop.name)) {
          // 数字键
          this.context.visit(prop.initializer)
          const name = this.compiler.addAtom(prop.name.text)
          this.compiler.emitOp(fd, Opcode.OP_define_field, prop.getStart())
          this.compiler.emitAtom(fd, name)
        } else if (ts.isComputedPropertyName(prop.name)) {
          // 计算属性键
          this.context.visit(prop.name.expression)
          this.context.visit(prop.initializer)
          this.compiler.emitOp(fd, Opcode.OP_define_array_el, prop.getStart())
        }
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        // 简写属性: { x } 等价于 { x: x }
        const name = prop.name.text
        const atom = this.compiler.addAtom(name)
        
        // 获取变量值
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var, prop.getStart())
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU16(fd, fd.scopeLevel)
        
        // 定义属性
        this.compiler.emitOp(fd, Opcode.OP_define_field, prop.getStart())
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
        this.compiler.emitOp(fd, Opcode.OP_copy_data_properties, prop.getStart())
        this.compiler.emitU8(fd, 2 | (1 << 2) | (0 << 5))
        
        // 弹出 excludeList
        this.compiler.emitOp(fd, Opcode.OP_drop)
        // 弹出 src
        this.compiler.emitOp(fd, Opcode.OP_drop)
      } else if (ts.isMethodDeclaration(prop)) {
        // 方法声明
        // TODO: 实现方法声明
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

    // 发射 call_constructor 指令
    this.compiler.emitOp(fd, Opcode.OP_call_constructor, sourcePos)
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
      // delete obj.prop
      this.context.visit(expr.expression)
      
      // 推送属性名
      const name = this.compiler.addAtom(expr.name.text)
      this.compiler.emitOp(fd, Opcode.OP_push_atom_value)
      this.compiler.emitU32(fd, name)
      
      // 发射 delete
      this.compiler.emitOp(fd, Opcode.OP_delete, node.getStart())
    } else if (ts.isElementAccessExpression(expr)) {
      // delete obj[key]
      this.context.visit(expr.expression)
      this.context.visit(expr.argumentExpression)
      
      // 发射 delete
      this.compiler.emitOp(fd, Opcode.OP_delete, node.getStart())
    } else if (ts.isIdentifier(expr)) {
      // delete variable - 在严格模式下是错误的
      // 非严格模式下使用 scope_delete_var
      const name = this.compiler.addAtom(expr.text)
      this.compiler.emitOp(fd, TempOpcode.OP_scope_delete_var, node.getStart())
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
    this.compiler.emitOp(fd, Opcode.OP_typeof, node.getStart())
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
}
