import * as ts from 'typescript'
import { VisitorContext } from './VisitorContext'
import {
  Opcode,
  TempOpcode,
  JSAtom,
  JS_ATOM_NULL,
  COPY_DATA_PROPERTIES_OPERAND_SPREAD,
  OP_DEFINE_METHOD_METHOD,
  OP_DEFINE_METHOD_GETTER,
  OP_DEFINE_METHOD_SETTER,
  OP_DEFINE_METHOD_ENUMERABLE,
} from '../../env'
import { CompilerContext } from '../CompilerContext'
import { FunctionDef, JSFunctionKindEnum } from '../FunctionDef'
import { TemplateObjectConst } from '../TemplateObjectConst'

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
  // 模板字面量 - 对应 parser.c:2480-2565 js_parse_template (call=0)
  // ============================================================================

  /**
   * 无插值模板字面量: `foo` / `line1\nline2`
   *
   * QuickJS 走 js_parse_template(s, 0, NULL)，最终等价于 push cooked string。
   */
  visitNoSubstitutionTemplateLiteral(node: ts.NoSubstitutionTemplateLiteral): void {
    const fd = this.funcDef!
    this.emitCookedTemplateString(fd, node.text)
  }

  /**
   * 模板表达式: `a${b}c${d}`
   *
    * QuickJS 对齐（js_parse_template(call=0)）：
    * - push head
    * - 取 concat
    * - 依次 push 插值与非空尾片段
    * - call_method
   */
  visitTemplateExpression(node: ts.TemplateExpression): void {
    const fd = this.funcDef!

    // 第一个 cooked 片段即使为空也要 push（对齐 QuickJS depth==0 规则）。
    this.emitCookedTemplateString(fd, node.head.text)

    // 理论上一定有 span，这里做防御。
    if (node.templateSpans.length === 0) {
      return
    }

    // QuickJS：OP_get_field2 + atom('concat') + ic('concat')（不绑定 sourcePos）。
    this.compiler.emitOp(fd, Opcode.OP_get_field2)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_concat)
    this.compiler.emitIc(fd, JSAtom.JS_ATOM_concat)

    let argc = 0
    for (const span of node.templateSpans) {
      // 插值表达式
      this.context.visit(span.expression)
      argc++

      // 插值后的 cooked 片段（对齐 QuickJS：跳过空片段）。
      const tailText = span.literal.text
      if (tailText.length !== 0) {
        this.emitCookedTemplateString(fd, tailText)
        argc++
      }
    }

    this.compiler.emitOp(fd, Opcode.OP_call_method)
    this.compiler.emitU16(fd, argc)
  }

  private emitCookedTemplateString(fd: FunctionDef, text: string): void {
    // QuickJS 会把字符串常量当作 atom 常量写入（OP_push_atom_value）。
    if (text === '') {
      this.compiler.emitAtomOp(fd, Opcode.OP_push_atom_value, JSAtom.JS_ATOM_empty_string)
      return
    }
    const atom = this.compiler.addAtom(text)
    this.compiler.emitOp(fd, Opcode.OP_push_atom_value)
    this.compiler.emitAtom(fd, atom)
    this.compiler.emitIc(fd, atom)
  }

  // ============================================================================
  // Tagged template - 对应 parser.c: js_parse_postfix_expr + js_parse_template(call=1)
  // ============================================================================

  /**
   * Tagged template: tag`a${x}b`
   *
    * QuickJS 对齐（js_parse_template(call=1)）：
    * - 先准备 callee（普通调用 vs 方法调用）
    * - push_const(template_object)
    * - push 各插值
    * - call/call_method，argc = 1 + 插值数（sourcePos 锚定到反引号）
   */
  visitTaggedTemplateExpression(node: ts.TaggedTemplateExpression): void {
    const fd = this.funcDef!
    const sf = node.getSourceFile()
    const callSourcePos = node.template.getStart(sf)

    let isMethodCall = false

    // callee 的栈布局对齐普通 CallExpression。
    const tag = node.tag
    if (ts.isPropertyAccessExpression(tag)) {
      this.context.visit(tag.expression)
      const methodName = this.compiler.addAtom(tag.name.text)
      // sourcePos 对齐到 '.'。
      const text2 = sf.text
      const exprEnd2 = tag.expression.getEnd()
      const nameStart2 = tag.name.getStart(sf)
      let dotPos2 = -1
      for (let i = nameStart2 - 1; i >= exprEnd2; i--) {
        const ch = text2.charCodeAt(i)
        if (ch === '.'.charCodeAt(0)) {
          dotPos2 = i
          break
        }
      }
      const memberSourcePos = dotPos2 >= 0 ? dotPos2 : tag.name.getStart(sf)

      this.compiler.emitOp(fd, Opcode.OP_get_field2, memberSourcePos)
      this.compiler.emitAtom(fd, methodName)
      this.compiler.emitIc(fd, methodName)
      isMethodCall = true
    } else if (ts.isElementAccessExpression(tag)) {
      this.context.visit(tag.expression)
      // sourcePos 对齐到 '['。
      const text2 = sf.text
      const exprEnd2 = tag.expression.getEnd()
      const argStart2 = tag.argumentExpression.getStart(sf)
      let bracketPos2 = -1
      for (let i = argStart2 - 1; i >= exprEnd2; i--) {
        if (text2.charCodeAt(i) === '['.charCodeAt(0)) {
          bracketPos2 = i
          break
        }
      }
      const elementSourcePos = bracketPos2 >= 0 ? bracketPos2 : tag.getStart(sf)
      this.context.visit(tag.argumentExpression)
      this.compiler.emitOp(fd, Opcode.OP_get_array_el2, elementSourcePos)
      isMethodCall = true
    } else {
      this.context.visit(tag)
      isMethodCall = false
    }

    // 构造 template_object（含 raw 数组）。
    const cookedParts: Array<unknown> = []
    const rawParts: Array<unknown> = []
    const substitutions: ts.Expression[] = []

    if (ts.isNoSubstitutionTemplateLiteral(node.template)) {
      cookedParts.push(node.template.text)
      rawParts.push(((node.template as any).rawText ?? node.template.text) as string)
    } else if (ts.isTemplateExpression(node.template)) {
      cookedParts.push(node.template.head.text)
      rawParts.push((((node.template.head as any).rawText ?? node.template.head.text) as string))
      for (const span of node.template.templateSpans) {
        substitutions.push(span.expression)
        cookedParts.push(span.literal.text)
        rawParts.push((((span.literal as any).rawText ?? span.literal.text) as string))
      }
    } else {
      cookedParts.push('')
      rawParts.push('')
    }

    const rawArray = new TemplateObjectConst(rawParts, undefined)
    const templateObject = new TemplateObjectConst(cookedParts, rawArray)

    // push_const(template_object) 不绑定 sourcePos，避免影响 pc2line。
    const prevSuppressSourcePos = fd.suppressSourcePos
    try {
      fd.suppressSourcePos = true
      this.compiler.emitPushConst(fd, templateObject, false)
    } finally {
      fd.suppressSourcePos = prevSuppressSourcePos
    }

    // push 插值表达式。
    for (const expr of substitutions) {
      this.context.visit(expr)
    }

    const argc = 1 + substitutions.length
    if (isMethodCall) {
      this.compiler.emitOp(fd, Opcode.OP_call_method, callSourcePos)
      this.compiler.emitU16(fd, argc)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_call, callSourcePos)
      this.compiler.emitU16(fd, argc)
    }
  }

  /**
   * 派生类构造函数：`super()` 返回后，QuickJS 会初始化词法 this，并执行 `<class_fields_init>`。
   * 同时确保在需要时能把 `class_fields_init` 捕获为闭包变量。
   */
  private emitDerivedCtorPostSuperInit(fd: FunctionDef): void {
    // 保留 `super()` 的返回值作为表达式结果。
    this.compiler.emitOp(fd, Opcode.OP_dup)

    // 初始化 `this`（词法 this：第一次 super() 前为未初始化）。
    this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var_init)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(fd, 0)

    // 若存在 `<class_fields_init>`，则调用。
    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_class_fields_init)
    this.compiler.emitU16(fd, fd.scopeLevel)

    this.compiler.emitOp(fd, Opcode.OP_dup)
    const labelNext = this.compiler.newLabelInt(fd)
    this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelNext)

    this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
    this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
    this.compiler.emitU16(fd, 0)
    this.compiler.emitOp(fd, Opcode.OP_swap)
    this.compiler.emitOp(fd, Opcode.OP_call_method)
    this.compiler.emitU16(fd, 0)

    this.compiler.emitLabelInt(fd, labelNext)
    this.compiler.emitOp(fd, Opcode.OP_drop)
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
    this.emitBigIntConst(fd, value)
  }

  private emitBigIntConst(fd: FunctionDef, value: bigint, sourcePos?: number): void {
    // 检查是否可以使用 push_bigint_i32
    if (value >= BigInt(-2147483648) && value <= BigInt(2147483647)) {
      if (sourcePos != null) {
        this.compiler.emitOp(fd, Opcode.OP_push_bigint_i32, sourcePos)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_push_bigint_i32)
      }
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
  visitNullKeyword(_node: ts.NullLiteral): void {
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
        // - 运算符: 对 BigInt 字面量做常量折叠（QuickJS 会直接发射负 BigInt 常量，而不是 push + OP_neg）
        if (ts.isBigIntLiteral(node.operand)) {
          const text = node.operand.text.replace(/n$/, '')
          const value = -BigInt(text)
          // 仅在 i32 范围内折叠：对齐 QuickJS 的编码选择（大 BigInt 仍保留 OP_neg 路径）
          if (value >= BigInt(-2147483648) && value <= BigInt(2147483647)) {
            this.emitBigIntConst(fd, value, sourcePos)
          } else {
            this.context.visit(node.operand)
            this.compiler.emitOp(fd, Opcode.OP_neg, sourcePos)
          }
        } else {
          // 其他情况：先计算操作数，然后发射 OP_neg
          this.context.visit(node.operand)
          this.compiler.emitOp(fd, Opcode.OP_neg, sourcePos)
        }
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

      // QuickJS: member access emits source position at the '.' token before emitting
      // OP_get_field2 / OP_get_field. This affects pc2line column mapping for
      // statements like `a.x++` (the sample anchors at '.', not at 'a').
      const sf = operand.getSourceFile()
      const text = sf.text
      const exprEnd = operand.expression.getEnd()
      const nameStart = operand.name.getStart(sf)
      let dotPos = -1
      for (let i = nameStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x2e /* '.' */) {
          dotPos = i
          break
        }
      }
      if (dotPos >= 0) {
        this.compiler.emitSourcePos(fd, dotPos)
      }
      
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

      // QuickJS: for element access lvalues, emit sourcePos at the '[' token
      // right before emitting OP_get_array_el*. This affects pc2line mapping
      // for cases like `a[0]++` / `a[0]--`.
      const sf = operand.getSourceFile()
      const text = sf.text
      const exprEnd = operand.expression.getEnd()
      const argStart = operand.argumentExpression.getStart(sf)
      let bracketPos = -1
      for (let i = argStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x5b /* '[' */) {
          bracketPos = i
          break
        }
      }
      if (bracketPos >= 0) {
        this.compiler.emitSourcePos(fd, bracketPos)
      }
      
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
      // 属性访问: obj.prop / obj.#private
      const name = this.compiler.addAtom(operand.name.text)

      // 私有字段后缀 ++/--: obj.#name++
      // QuickJS (disasm) pattern:
      //   obj; dup; <resolve private>; get_private_field; post_inc; perm3; <resolve private>; put_private_field
      // This keeps stack layout consistent with OP_put_private_field semantics.
      if (ts.isPrivateIdentifier(operand.name)) {
        this.context.visit(operand.expression)
        // QuickJS records an intermediate pc2line sample before the synthetic stack ops.
        // Empirically (WASM parity), this sample aligns to the '.' boundary right after the
        // object expression in `obj.#name++`, not the start of `#name`.
        // Without this, we fold the column deltas into a single entry and pc2line differs.
        const privateSamplePos = operand.expression.getEnd()
        this.compiler.emitSourcePos(fd, privateSamplePos)
        this.compiler.emitOp(fd, Opcode.OP_dup)
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_private_field)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU16(fd, fd.scopeLevel)
        this.compiler.emitOp(fd, opcode, sourcePos)
        this.compiler.emitOp(fd, Opcode.OP_perm3)
        this.compiler.emitOp(fd, TempOpcode.OP_scope_put_private_field)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU16(fd, fd.scopeLevel)
        return
      }

      // 公有属性: obj.prop
      // 访问对象
      this.context.visit(operand.expression)

      // Align QuickJS: emit sourcePos at the '.' token before OP_get_field2.
      const sf = operand.getSourceFile()
      const text = sf.text
      const exprEnd = operand.expression.getEnd()
      const nameStart = operand.name.getStart(sf)
      let dotPos = -1
      for (let i = nameStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x2e /* '.' */) {
          dotPos = i
          break
        }
      }
      if (dotPos >= 0) {
        this.compiler.emitSourcePos(fd, dotPos)
      }

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

      // Align QuickJS: emit sourcePos at '[' token before OP_get_array_el3.
      const sf = operand.getSourceFile()
      const text = sf.text
      const exprEnd = operand.expression.getEnd()
      const argStart = operand.argumentExpression.getStart(sf)
      let bracketPos = -1
      for (let i = argStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x5b /* '[' */) {
          bracketPos = i
          break
        }
      }
      if (bracketPos >= 0) {
        this.compiler.emitSourcePos(fd, bracketPos)
      }
      
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

    // 逗号运算符（sequence）：先计算左边并丢弃结果，再计算右边并保留
    // 对应 QuickJS 中的 sequence expression 语义。
    if (op === ts.SyntaxKind.CommaToken) {
      // QuickJS sequence expression behavior:
      // - Most left-hand subexpressions are evaluated in value context then dropped.
      // - Property/element assignments use PUT_LVALUE_NOKEEP_* (no value left), so
      //   no trailing drop is emitted for that subexpression.

      const left = node.left
      const isAssignmentExpr = ts.isBinaryExpression(left) && this.isAssignmentOperator(left.operatorToken.kind)
      const isNonPrivatePropLValue =
        isAssignmentExpr &&
        ts.isPropertyAccessExpression(left.left) &&
        !ts.isPrivateIdentifier(left.left.name)
      const isElemLValue = isAssignmentExpr && ts.isElementAccessExpression(left.left)

      if (isNonPrivatePropLValue || isElemLValue) {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = false
        try {
          this.context.visit(left)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
      } else {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(left)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }

      this.context.visit(node.right)
      return
    }

    // 私有 brand 检查: #name in obj
    // QuickJS lowers this via OP_scope_in_private_field and resolves it in resolve_scope_private_field()
    // to get_var_ref*/get_private_in.
    if (op === ts.SyntaxKind.InKeyword && ts.isPrivateIdentifier(node.left)) {
      // `#name` is not a runtime-evaluated expression; only evaluate RHS.
      this.context.visit(node.right)

      const privateName = this.compiler.addAtom(node.left.text)
      // Align QuickJS: the operator itself does not introduce an extra pc2line sample here;
      // RHS evaluation already records a source position.
      this.compiler.emitOp(fd, TempOpcode.OP_scope_in_private_field)
      this.compiler.emitU32(fd, privateName)
      this.compiler.emitU16(fd, fd.scopeLevel)
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

    const keepResult = this.context.expressionValueUsed

    if (keepResult) {
      // value-form short-circuit (QuickJS-style):
      // QuickJS source reference:
      // - third_party/QuickJS/src/core/parser.c: js_parse_logical_and_or() (around L5906-L5965)
      //   QuickJS parses &&/|| recursively and emits short-circuit jumps that converge at shared labels.
      // flatten same-operator chains so all short-circuit jumps share one end label.
      // This matches QuickJS output for long ||/&& chains (early jumps may need 32-bit offsets).
      if (op === ts.SyntaxKind.AmpersandAmpersandToken || op === ts.SyntaxKind.BarBarToken) {
        const operands: ts.Expression[] = []
        const collect = (expr: ts.Expression): void => {
          if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === op) {
            collect(expr.left)
            collect(expr.right)
            return
          }
          operands.push(expr)
        }

        collect(node)

        const labelEnd = this.compiler.newLabelInt(fd)
        for (let i = 0; i < operands.length; i++) {
          const prevValueUsed = this.context.expressionValueUsed
          this.context.expressionValueUsed = true
          try {
            this.context.visit(operands[i])
          } finally {
            this.context.expressionValueUsed = prevValueUsed
          }

          if (i === operands.length - 1) break

          this.compiler.emitOp(fd, Opcode.OP_dup)
          if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
            this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelEnd)
          } else {
            this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelEnd)
          }
          this.compiler.emitOp(fd, Opcode.OP_drop)
        }

        this.compiler.emitLabelInt(fd, labelEnd)
      } else {
        // ?? (coalesce) keeps the selected operand value on the stack.
        const prevValueUsedLeft = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(node.left)
        } finally {
          this.context.expressionValueUsed = prevValueUsedLeft
        }

        const label = this.compiler.newLabelInt(fd)
        this.compiler.emitOp(fd, Opcode.OP_dup)
        this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)
        this.compiler.emitOp(fd, Opcode.OP_drop)

        const prevValueUsedRight = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(node.right)
        } finally {
          this.context.expressionValueUsed = prevValueUsedRight
        }

        this.compiler.emitLabelInt(fd, label)
      }
    } else {
      // control-flow / side-effect context:
      // do not preserve operand values; only evaluate what is needed.
      const prevValueUsedLeft = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.left)
      } finally {
        this.context.expressionValueUsed = prevValueUsedLeft
      }

      const label = this.compiler.newLabelInt(fd)
      if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
        // &&: if left is false -> skip right
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)
      } else if (op === ts.SyntaxKind.BarBarToken) {
        // ||: if left is true -> skip right
        this.compiler.emitGotoInt(fd, Opcode.OP_if_true, label)
      } else {
        // ??: skip right when left is not null/undefined
        this.compiler.emitOp(fd, Opcode.OP_is_undefined_or_null)
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, label)
      }

      // Right side is only evaluated when short-circuit did not trigger.
      this.context.visit(node.right)
      this.compiler.emitLabelInt(fd, label)
    }
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
    const prevValueUsedCond = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(node.condition)
    } finally {
      this.context.expressionValueUsed = prevValueUsedCond
    }

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
    const op = node.operatorToken.kind

    // 简单赋值 =
    if (op === ts.SyntaxKind.EqualsToken) {
      // QuickJS: for parenthesized object destructuring assignments like `({ a } = obj)`,
      // the left-hand side token stream includes the leading '(', and pc2line is anchored
      // to that '(' rather than the inner '{'. TypeScript AST represents the assignment
      // as a BinaryExpression whose parent is a ParenthesizedExpression, so we must
      // explicitly use the parent's start position to match QuickJS.
      let sourcePos = node.left.getStart()
      if (ts.isObjectLiteralExpression(node.left) && ts.isParenthesizedExpression(node.parent)) {
        sourcePos = node.parent.getStart(node.getSourceFile())
      }
      this.emitSimpleAssignment(node, sourcePos)
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
  private emitSimpleAssignment(node: ts.BinaryExpression, sourcePos?: number): void {
    const fd = this.funcDef!

    const keepResult = this.context.expressionValueUsed

    // NOTE: Even when the assignment expression result is not used (statement context),
    // the RHS must still produce a value because it is consumed by the store.
    // This is especially important for nested assignments like `a = (b = 0)`.
    const visitRhs = () => {
      const prevValueUsed = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.right)
      } finally {
        this.context.expressionValueUsed = prevValueUsed
      }
    }

    const hasWithScope = (func: any, scope: number): boolean => {
      // Align with QuickJS has_with_scope() (parser.c:3886-3916)
      let cur: any = func
      let s = scope
      while (cur) {
        for (let si = s; si >= 0; si = cur.scopes[si]?.parent ?? -1) {
          for (let idx = cur.scopes[si]?.first ?? -1; idx >= 0; idx = cur.vars[idx].scopeNext) {
            const vd = cur.vars[idx]
            if (vd?.varName === JSAtom.JS_ATOM__with_) return true
            if (vd?.scopeLevel !== si) break
          }
        }
        s = cur.parentScopeLevel
        cur = cur.parent
      }
      return false
    }

    // 对于简单标识符赋值，默认使用 scope_put_var。
    // 但如果存在 with-scope（含父作用域），QuickJS 会使用 ref-based store：
    // OP_scope_make_ref ... <rhs> ... OP_put_ref_value
    if (ts.isIdentifier(node.left)) {
      if (typeof sourcePos === 'number') {
        this.compiler.emitSourcePos(fd, sourcePos)
      }
      const name = this.compiler.addAtom(node.left.text)

      if (hasWithScope(fd, fd.scopeLevel)) {
        const labelPut = this.compiler.newLabelInt(fd)
        this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU32(fd, labelPut)
        this.compiler.emitU16(fd, fd.scopeLevel)
        this.compiler.updateLabel(fd, labelPut, 1)

        // rhs
        visitRhs()

        if (keepResult) {
          this.compiler.emitOp(fd, Opcode.OP_dup)
        }

        this.compiler.emitLabelInt(fd, labelPut)
        this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      } else {
        // 计算右值
        visitRhs()

        // 仅在需要表达式值时保留赋值结果
        if (keepResult) {
          this.compiler.emitOp(fd, Opcode.OP_dup)
        }

        // 发射 scope_put_var
        this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU16(fd, fd.scopeLevel)
      }
      return
    }

    // 属性赋值
    if (ts.isPropertyAccessExpression(node.left)) {
      // 私有字段赋值: obj.#name = rhs
      if (ts.isPrivateIdentifier(node.left.name)) {
        // 计算对象
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(node.left.expression)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }

        // QuickJS: member access source position anchors at '.' even for private names.
        const sf = node.left.getSourceFile()
        const text = sf.text
        const exprEnd = node.left.expression.getEnd()
        const nameStart = node.left.name.getStart(sf)
        let dotPos = -1
        for (let i = nameStart - 1; i >= exprEnd; i--) {
          if (text.charCodeAt(i) === 0x2e /* '.' */) {
            dotPos = i
            break
          }
        }
        if (dotPos >= 0) {
          this.compiler.emitSourcePos(fd, dotPos)
        }

        // 计算值
        visitRhs()

        // QuickJS private-field put path keeps the assigned value on stack;
        // it uses insert2 before putting the private field.
        this.compiler.emitOp(fd, Opcode.OP_insert2)

        const name = this.compiler.addAtom(node.left.name.text)
        this.compiler.emitOp(fd, TempOpcode.OP_scope_put_private_field)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU16(fd, fd.scopeLevel)
        return
      }

      // 计算对象
      const prevValueUsed = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.left.expression)
      } finally {
        this.context.expressionValueUsed = prevValueUsed
      }

      // QuickJS: for property lvalues, member access emits source position at the '.' token
      // (op_token_ptr) and then get_lvalue() can truncate OP_get_field while keeping the
      // OP_line_num. That OP_line_num ends up anchoring the first RHS opcode in pc2line.
      // Mirror that by emitting the '.' sourcePos between object evaluation and RHS.
      const sf = node.left.getSourceFile()
      const text = sf.text
      const exprEnd = node.left.expression.getEnd()
      const nameStart = node.left.name.getStart(sf)
      let dotPos = -1
      for (let i = nameStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x2e /* '.' */) {
          dotPos = i
          break
        }
      }
      if (dotPos >= 0) {
        this.compiler.emitSourcePos(fd, dotPos)
      }

      // 计算值
      visitRhs()

      // 仅在需要表达式值时保留赋值结果
      if (keepResult) {
        this.compiler.emitOp(fd, Opcode.OP_insert2)
      }

      // 发射 put_field
      const name = this.compiler.addAtom(node.left.name.text)
      // QuickJS: put_lvalue() 里的 OP_put_field 不会触发 emit_source_pos
      // third_party/QuickJS/src/core/parser.c: put_lvalue() -> emit_op(s, OP_put_field)
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      return
    }

    // Parentheses are allowed around destructuring assignment targets in expressions:
    //   ({ a } = obj)
    //   ([a] = arr)
    // Unwrap to match QuickJS parsing semantics.
    let assignmentTarget: ts.Expression = node.left
    while (ts.isParenthesizedExpression(assignmentTarget)) {
      assignmentTarget = assignmentTarget.expression
    }

    // 元素赋值
    if (ts.isElementAccessExpression(assignmentTarget)) {
      // 计算对象
      {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(assignmentTarget.expression)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
      }

      // 计算索引
      {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(assignmentTarget.argumentExpression)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
      }

      // QuickJS: for element lvalues, the parser emits source position at the '[' token
      // (op_token_ptr) right before emitting OP_get_array_el. get_lvalue() then truncates
      // OP_get_array_el but keeps the already-emitted OP_line_num, which ends up anchoring
      // the first RHS opcode in pc2line.
      // third_party/QuickJS/src/core/parser.c: js_parse_postfix_expr(): '[' branch
      const sf = assignmentTarget.getSourceFile()
      const text = sf.text
      const exprEnd = assignmentTarget.expression.getEnd()
      const argStart = assignmentTarget.argumentExpression.getStart(sf)
      let bracketPos = -1
      for (let i = argStart - 1; i >= exprEnd; i--) {
        if (text.charCodeAt(i) === 0x5b /* '[' */) {
          bracketPos = i
          break
        }
      }
      if (bracketPos >= 0) {
        this.compiler.emitSourcePos(fd, bracketPos)
      }

      // 计算值
      visitRhs()

      // 仅在需要表达式值时保留赋值结果
      if (keepResult) {
        this.compiler.emitOp(fd, Opcode.OP_insert3)
      }

      // 发射 put_array_el
      // QuickJS: put_lvalue() 里的 OP_put_array_el 不会触发 emit_source_pos
      // third_party/QuickJS/src/core/parser.c: put_lvalue() -> emit_op(s, OP_put_array_el)
      this.compiler.emitOp(fd, Opcode.OP_put_array_el)
      return
    }

    // 数组解构赋值: [a, b] = rhs
    // QuickJS: js_parse_destructuring_element() (hasval=TRUE) 的 array 分支会基于 iterator 展开。
    if (ts.isArrayLiteralExpression(assignmentTarget)) {
      if (typeof sourcePos === 'number') {
        this.compiler.emitSourcePos(fd, sourcePos)
      }

      // QuickJS emits destructuring assignment in two phases:
      // - First, it emits a goto to "label_parse" to parse/evaluate the RHS after seeing '='.
      // - Then it jumps back to "label_assign" where it duplicates the RHS value and performs
      //   the iterator-based destructuring.
      // This produces the observed goto8 / goto8-backedge pattern around `[a,b] = rhs`.
      // third_party/QuickJS/src/core/parser.c: js_parse_destructuring_element(): if (s->token.val == '=' && allow_initializer)
      const labelParse = this.compiler.newLabelInt(fd)
      const labelAssign = this.compiler.newLabelInt(fd)
      const labelDone = this.compiler.newLabelInt(fd)

      // Jump forward to parse RHS (after pattern is parsed and '=' is consumed)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelParse)

      // Assignment body: expects RHS value on stack.
      this.compiler.emitLabelInt(fd, labelAssign)

      // Destructuring assignment expression evaluates to RHS.
      // Keep a copy because OP_for_of_start consumes the value.
      this.compiler.emitOp(fd, Opcode.OP_dup)

      // value on stack -> start iterator
      this.compiler.emitOp(fd, Opcode.OP_for_of_start)

      // QuickJS reference:
      // third_party/QuickJS/src/core/parser.c: js_parse_destructuring_element() array branch
      const elements = assignmentTarget.elements
      let hasSpread = false

      const emitIdentifierLValueRef = (target: ts.Identifier): { atom: number; label: number; enumDepth: number } => {
        // QuickJS: get_lvalue() for an identifier lvalue transforms the previously-emitted
        // OP_scope_get_var into OP_scope_make_ref and returns depth=2 (obj + prop).
        // third_party/QuickJS/src/core/parser.c: get_lvalue(): OP_scope_get_var -> OP_scope_make_ref; depth=2
        // QuickJS also records a source position at the identifier token inside the pattern,
        // which ends up anchoring the upcoming make_loc_ref in pc2line.
        this.compiler.emitSourcePos(fd, target.getStart())
        const atom = this.compiler.addAtom(target.text)
        const label = this.compiler.newLabelInt(fd)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU32(fd, label)
        this.compiler.emitU16(fd, fd.scopeLevel)
        this.compiler.updateLabel(fd, label, 1)

        return { atom, label, enumDepth: 2 }
      }

      const emitSpreadCode = (depth: number) => {
        // QuickJS: js_emit_spread_code (parser.c:4205)
        const labelRestNext = this.compiler.newLabelInt(fd)
        const labelRestDone = this.compiler.newLabelInt(fd)

        // enum_rec xxx -- enum_rec xxx array 0
        this.compiler.emitOp(fd, Opcode.OP_array_from)
        this.compiler.emitU16(fd, 0)
        this.compiler.emitOp(fd, Opcode.OP_push_i32)
        this.compiler.emitU32(fd, 0)
        this.compiler.emitLabelInt(fd, labelRestNext)
        this.compiler.emitOp(fd, Opcode.OP_for_of_next)
        this.compiler.emitU8(fd, 2 + depth)
        this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelRestDone)
        // array idx val -- array idx
        this.compiler.emitOp(fd, Opcode.OP_define_array_el)
        this.compiler.emitOp(fd, Opcode.OP_inc)
        this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelRestNext)
        this.compiler.emitLabelInt(fd, labelRestDone)
        // enum_rec xxx array idx undef -- enum_rec xxx array
        this.compiler.emitOp(fd, Opcode.OP_drop)
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]

        if (ts.isOmittedExpression(element)) {
          this.compiler.emitOp(fd, Opcode.OP_for_of_next)
          this.compiler.emitU8(fd, 0)
          this.compiler.emitOp(fd, Opcode.OP_drop)
          this.compiler.emitOp(fd, Opcode.OP_drop)
          continue
        }

        if (ts.isSpreadElement(element)) {
          // QuickJS: rest element must be the last one
          if (i !== elements.length - 1) {
            throw new Error('Array destructuring assignment: rest element must be the last one')
          }
          hasSpread = true

          const target = element.expression
          if (!ts.isIdentifier(target)) {
            throw new Error('Array destructuring assignment currently supports only identifier elements')
          }

          // Assignment destructuring uses lvalue references, not direct puts.
          // QuickJS: js_parse_destructuring_element() array branch + get_lvalue()/put_lvalue()
          const { label, enumDepth } = emitIdentifierLValueRef(target)
          emitSpreadCode(enumDepth)

          // put_lvalue(opcode=OP_get_ref_value, special=PUT_LVALUE_NOKEEP_DEPTH)
          // third_party/QuickJS/src/core/parser.c: put_lvalue(): emit_label(label); OP_put_ref_value
          this.compiler.emitLabelInt(fd, label)
          this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
          continue
        }

        if (hasSpread) {
          throw new Error('Array destructuring assignment: rest element must be the last one')
        }

        // Support optional default value: [a, b = init] = rhs
        let target: ts.Expression = element
        let defaultValue: ts.Expression | undefined
        if (
          ts.isBinaryExpression(element) &&
          element.operatorToken.kind === ts.SyntaxKind.EqualsToken
        ) {
          target = element.left
          defaultValue = element.right
        }

        if (!ts.isIdentifier(target)) {
          throw new Error('Array destructuring assignment currently supports only identifier elements')
        }

        // Generate lvalue reference first so OP_for_of_next can access the iterator record under it.
        // QuickJS: enum_depth comes from get_lvalue() depth (identifier -> 2).
        const { label, enumDepth } = emitIdentifierLValueRef(target)

        this.compiler.emitOp(fd, Opcode.OP_for_of_next)
        this.compiler.emitU8(fd, enumDepth)
        // drop bool (leave value)
        this.compiler.emitOp(fd, Opcode.OP_drop)

        if (defaultValue) {
          // QuickJS: dup; undefined; strict_eq; if_false hasval; drop; <init>; label hasval
          const labelHasVal = this.compiler.newLabelInt(fd)
          this.compiler.emitOp(fd, Opcode.OP_dup)
          this.compiler.emitOp(fd, Opcode.OP_undefined)
          this.compiler.emitOp(fd, Opcode.OP_strict_eq)
          this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelHasVal)
          this.compiler.emitOp(fd, Opcode.OP_drop)
          this.context.visit(defaultValue)
          this.compiler.emitLabelInt(fd, labelHasVal)
        }

        // put_lvalue(opcode=OP_get_ref_value, special=PUT_LVALUE_NOKEEP_DEPTH)
        this.compiler.emitLabelInt(fd, label)
        this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      }

      // close iterator
      this.compiler.emitOp(fd, Opcode.OP_iterator_close)

      // Skip the RHS parsing code when executing assignment body.
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelDone)

      // RHS parsing code: executed first.
      this.compiler.emitLabelInt(fd, labelParse)
      this.context.visit(node.right)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelAssign)

      this.compiler.emitLabelInt(fd, labelDone)
      return
    }

    // 对象解构赋值: ({ a, b: x, c = init } = rhs)
    // QuickJS reference:
    // third_party/QuickJS/src/core/parser.c: js_parse_destructuring_element() object branch
    if (ts.isObjectLiteralExpression(assignmentTarget)) {
      if (typeof sourcePos === 'number') {
        this.compiler.emitSourcePos(fd, sourcePos)
      }

      // QuickJS emits destructuring assignments in two phases (same as array destructuring):
      //   1) goto labelParse (jump forward to evaluate RHS)
      //   2) labelAssign: duplicate RHS (to preserve expression value), to_object, then assign via put_lvalue
      //   3) labelParse: evaluate RHS, goto labelAssign
      // This produces the characteristic goto8/goto8-backedge pattern.
      // third_party/QuickJS/src/core/parser.c: js_parse_destructuring_element(): if (s->token.val == '=' && allow_initializer)
      const labelParse = this.compiler.newLabelInt(fd)
      const labelAssign = this.compiler.newLabelInt(fd)
      const labelDone = this.compiler.newLabelInt(fd)

      const emitIdentifierLValueRef = (target: ts.Identifier): { atom: number; label: number; enumDepth: number } => {
        // Same rationale as array destructuring assignment: identifier lvalues are handled via get_lvalue()/put_lvalue()
        // which becomes a ref pair + OP_put_ref_value.
        // third_party/QuickJS/src/core/parser.c: get_lvalue(): OP_scope_get_var -> OP_scope_make_ref; depth=2
        const atom = this.compiler.addAtom(target.text)
        const label = this.compiler.newLabelInt(fd)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_make_ref)
        this.compiler.emitU32(fd, atom)
        this.compiler.emitU32(fd, label)
        this.compiler.emitU16(fd, fd.scopeLevel)
        this.compiler.updateLabel(fd, label, 1)

        return { atom, label, enumDepth: 2 }
      }

      // Jump forward to parse RHS
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelParse)

      // Assignment body: expects RHS value on stack.
      this.compiler.emitLabelInt(fd, labelAssign)

      // Preserve the assignment-expression value (RHS) because OP_to_object consumes one copy.
      this.compiler.emitOp(fd, Opcode.OP_dup)

      // throw an exception if the value cannot be converted to an object
      this.compiler.emitOp(fd, Opcode.OP_to_object)

      for (const prop of assignmentTarget.properties) {
        if (ts.isSpreadAssignment(prop)) {
          throw new Error('Object destructuring assignment: rest property is not yet supported')
        }

        let propNameAtomText: string | undefined
        let targetExpr: ts.Expression | undefined
        let defaultValue: ts.Expression | undefined

        if (ts.isShorthandPropertyAssignment(prop)) {
          propNameAtomText = prop.name.text
          targetExpr = prop.name
        } else if (ts.isPropertyAssignment(prop)) {
          if (!ts.isIdentifier(prop.name)) {
            throw new Error('Object destructuring assignment currently supports only identifier property names')
          }
          propNameAtomText = prop.name.text
          // In destructuring patterns, `initializer` is the assignment target (or target with default).
          targetExpr = prop.initializer
        } else {
          throw new Error('Object destructuring assignment currently supports only shorthand/property assignments')
        }

        if (!propNameAtomText || !targetExpr) {
          throw new Error('Object destructuring assignment: invalid property')
        }

        // Optional default value: ({ a = init } = rhs) or ({ a: x = init } = rhs)
        if (ts.isBinaryExpression(targetExpr) && targetExpr.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
          defaultValue = targetExpr.right
          targetExpr = targetExpr.left
        }

        if (!ts.isIdentifier(targetExpr)) {
          throw new Error('Object destructuring assignment currently supports only identifier elements')
        }

        // Stack shape at this point: [rhs obj]
        // dup: [rhs obj obj]
        this.compiler.emitOp(fd, Opcode.OP_dup)

        // QuickJS pc2line: for renamed bindings like `{ a: a }`, it records the source position
        // at the target identifier (the second `a`, after ':'). The PC should align with the
        // upcoming make_ref/make_loc_ref, which comes *after* the per-property `dup`.
        if (ts.isPropertyAssignment(prop)) {
          this.compiler.emitSourcePos(fd, targetExpr.getStart())
        }

        // Create lvalue ref: [rhs obj obj] -> [rhs obj obj ref_obj ref_prop]
        const { label } = emitIdentifierLValueRef(targetExpr)

        // rot3l: [rhs obj obj ref_obj ref_prop] -> [rhs obj ref_obj ref_prop obj]
        this.compiler.emitOp(fd, Opcode.OP_rot3l)

        // get_field: [rhs obj ref_obj ref_prop obj] -> [rhs obj ref_obj ref_prop value]
        const propAtom = this.compiler.addAtom(propNameAtomText)
        this.compiler.emitOp(fd, Opcode.OP_get_field)
        this.compiler.emitU32(fd, propAtom)
        this.compiler.emitIc(fd, propAtom)

        if (defaultValue) {
          // QuickJS: dup; is_undefined; if_false keep; drop; <init>; label keep
          const labelKeep = this.compiler.newLabelInt(fd)
          this.compiler.emitOp(fd, Opcode.OP_dup)
          this.compiler.emitOp(fd, Opcode.OP_is_undefined)
          this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelKeep)
          this.compiler.emitOp(fd, Opcode.OP_drop)
          this.context.visit(defaultValue)
          this.compiler.emitLabelInt(fd, labelKeep)
        }

        // put_lvalue(opcode=OP_get_ref_value, special=PUT_LVALUE_NOKEEP_DEPTH)
        // third_party/QuickJS/src/core/parser.c: put_lvalue(): emit_label(label); OP_put_ref_value
        this.compiler.emitLabelInt(fd, label)
        this.compiler.emitOp(fd, Opcode.OP_put_ref_value)
      }

      // drop the source object, keep RHS value
      this.compiler.emitOp(fd, Opcode.OP_drop)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelDone)

      // RHS parsing code: executed first.
      this.compiler.emitLabelInt(fd, labelParse)
      this.context.visit(node.right)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelAssign)

      this.compiler.emitLabelInt(fd, labelDone)
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
    // QuickJS pc2line anchors compound assignments to the operator token.
    // For tokens like "+=", QuickJS uses the token start (the "+"), not the trailing "=".
    const sf = node.getSourceFile()
    const sourcePos = Math.max(0, node.operatorToken.getStart(sf))
    const lhsSourcePos = Math.max(0, node.left.getStart(sf))

    // QuickJS distinguishes whether the assignment expression value is used.
    // When the value is not used (expression statement), it does not preserve the
    // computed value on the stack (no insert2/insert3 pattern).
    const keepResult = this.context.expressionValueUsed

    // RHS must be compiled in a value-producing context because it is consumed
    // by the compound operator and/or store.
    const visitRhsValue = () => {
      const prevValueUsed = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.right)
      } finally {
        this.context.expressionValueUsed = prevValueUsed
      }
    }

    // 获取复合运算的操作码
    const opcode = this.getCompoundOpcode(node.operatorToken.kind)
    if (opcode === null) {
      throw new Error('Invalid compound assignment operator')
    }

    // 根据左值类型处理
    if (ts.isIdentifier(node.left)) {
      // 简单变量：
      // QuickJS 在 js_parse_assign_expr2() 针对“标识符左值”的复合赋值，会走
      // get_var/scope_get_var + <op> + (dup?) + put_var/scope_put_var 的直写路径。
      // 只有在某些需要引用语义的场景（with/eval/复杂左值）才会走 make_ref/put_ref_value。
      // 为了 byte-for-byte 对齐，这里对标识符直接生成直写字节码。
      const name = this.compiler.addAtom(node.left.text)

      // Always use scope_get_var/scope_put_var here and let VariableResolver
      // lower it to get_loc/put_loc (locals/args), get_var_ref/put_var_ref (closures),
      // or get_var/put_var (globals). This matches QuickJS behavior where the parser
      // emits the scope form and resolve_labels performs the final lowering.
      // Also align pc2line: emit LHS sourcePos for the load, then operator sourcePos.
      this.compiler.emitSourcePos(fd, lhsSourcePos)

      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU16(fd, fd.scopeLevel)

      visitRhsValue()
      this.compiler.emitOp(fd, opcode, sourcePos)

      if (keepResult) {
        this.compiler.emitOp(fd, Opcode.OP_dup)
      }

      this.compiler.emitOp(fd, TempOpcode.OP_scope_put_var)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU16(fd, fd.scopeLevel)
      return
    }

    if (ts.isPropertyAccessExpression(node.left)) {
      const name = this.compiler.addAtom(node.left.name.text)
      
      // 计算对象: 栈 [] -> [obj]
      {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(node.left.expression)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
      }

      // QuickJS member access records source position at the '.' token before
      // emitting OP_get_field2. This affects pc2line for compound assignments
      // like `obj.prop += x`.
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
      
      // 私有字段复合赋值: obj.#name += rhs
      if (ts.isPrivateIdentifier(node.left.name)) {
        // OP_scope_get_private_field2: keeps obj and loads private field value.
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_private_field2)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU16(fd, fd.scopeLevel)

        // 计算右值
        visitRhsValue()

        // 执行运算
        this.compiler.emitOp(fd, opcode, sourcePos)

        // QuickJS private-field put path uses insert2 before OP_put_private_field.
        this.compiler.emitOp(fd, Opcode.OP_insert2)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_put_private_field)
        this.compiler.emitU32(fd, name)
        this.compiler.emitU16(fd, fd.scopeLevel)
        return
      }

      // OP_get_field2: 栈 [obj] -> [obj value]
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      
      // 计算右值: 栈 [obj value] -> [obj value rightVal]
      visitRhsValue()
      
      // 执行运算: 栈 [obj value rightVal] -> [obj newValue]
      this.compiler.emitOp(fd, opcode, sourcePos)

      if (keepResult) {
        // OP_insert2: 栈 [obj newValue] -> [newValue obj newValue]
        this.compiler.emitOp(fd, Opcode.OP_insert2)
      }

      // OP_put_field:
      // - keepResult=true:  栈 [newValue obj newValue] -> [newValue]
      // - keepResult=false: 栈 [obj newValue] -> []
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitU32(fd, name)
      this.compiler.emitIc(fd, name)
      return
    }

    if (ts.isElementAccessExpression(node.left)) {
      // 计算对象: 栈 [] -> [obj]
      {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(node.left.expression)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
      }
      
      // 计算索引: 栈 [obj] -> [obj idx]
      {
        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true
        try {
          this.context.visit(node.left.argumentExpression)
        } finally {
          this.context.expressionValueUsed = prevValueUsed
        }
      }
      
      // QuickJS get_lvalue(..., keep=TRUE) upgrades OP_get_array_el -> OP_get_array_el3
      // to keep obj+idx on the stack for the later OP_put_array_el.
      // Stack: [obj idx] -> [obj idx value]
      // Align QuickJS: for element access, record source position at the '[' token
      // before emitting OP_get_array_el3. Using the operatorToken start (e.g. '+=' )
      // shifts columns and breaks pc2line parity.
      {
        const sf = node.getSourceFile()
        const text = sf.text
        const exprEnd = node.left.expression.getEnd()
        const argStart = node.left.argumentExpression.getStart(sf)
        let bracketPos = -1
        for (let i = argStart - 1; i >= exprEnd; i--) {
          if (text.charCodeAt(i) === 0x5b /* '[' */) {
            bracketPos = i
            break
          }
        }
        if (bracketPos >= 0) {
          this.compiler.emitSourcePos(fd, bracketPos)
          this.compiler.emitOp(fd, Opcode.OP_get_array_el3)
        } else {
          this.compiler.emitOp(fd, Opcode.OP_get_array_el3, sourcePos)
        }
      }
      
      // 计算右值: 栈 [obj idx value] -> [obj idx value rightVal]
      visitRhsValue()
      
      // 执行运算: 栈 [obj idx value rightVal] -> [obj idx newValue]
      this.compiler.emitOp(fd, opcode, sourcePos)

      if (keepResult) {
        // OP_insert3: 栈 [obj idx newValue] -> [newValue obj idx newValue]
        this.compiler.emitOp(fd, Opcode.OP_insert3)
      }

      // OP_put_array_el:
      // - keepResult=true:  栈 [newValue obj idx newValue] -> [newValue]
      // - keepResult=false: 栈 [obj idx newValue] -> []
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

  // ============================================================================
  // 调用表达式 - 对应 parser.c:5128-5380
  // ============================================================================

  /**
   * 访问调用表达式 - 对应 parser.c:5128-5380
   * 
   * QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:5128-5380
   */
  visitCallExpression(node: ts.CallExpression, _isTailCall: boolean = false, _tailCallPos: number = -1): void {
    const fd = this.funcDef!
    // QuickJS: js_parse_call (parser.c:5128-5380)
    // 调用点的 source-pos 更接近 callee 结束处（通常是 '(' 位置）。
    // TS AST 的 getEnd() 通常停在 callee token 末尾；为对齐 QuickJS，需要尽量指向实际的 '('。
    const sfForCall = node.getSourceFile()
    const textForCall = sfForCall.text
    let callSourcePos = node.arguments.pos - 1
    if (
      callSourcePos < 0 ||
      callSourcePos >= textForCall.length ||
      textForCall.charCodeAt(callSourcePos) !== 0x28 /* '(' */
    ) {
      callSourcePos = node.expression.getEnd()
      const scanStart = Math.max(0, node.expression.getEnd())
      const scanEnd = Math.min(textForCall.length, node.end)
      for (let i = scanStart; i < scanEnd; i++) {
        if (textForCall.charCodeAt(i) === 0x28 /* '(' */) {
          callSourcePos = i
          break
        }
      }
    }
    let isMethodCall = false
    let isSuperCall = false
    let isDirectEval = false

    const unwrapParenExpr = (expr: ts.Expression): ts.Expression => {
      let cur = expr
      while (ts.isParenthesizedExpression(cur)) {
        cur = cur.expression
      }
      return cur
    }
    const directEvalCallee = unwrapParenExpr(node.expression)

    const hasWithScope = (func: any, scope: number): boolean => {
      // Align with QuickJS has_with_scope() (parser.c:3886-3916)
      let cur = func as any
      let scopeLevel = scope
      while (cur) {
        let idx = cur.scopes?.[scopeLevel]?.first ?? -1
        while (idx >= 0) {
          const vd = cur.vars[idx]
          if (vd?.varName === JSAtom.JS_ATOM__with_) return true
          idx = vd?.scopeNext ?? -1
        }
        scopeLevel = cur.parentScopeLevel ?? 0
        cur = cur.parent
      }
      return false
    }

    // Dynamic import: import(specifier, [options])
    // QuickJS lowering (parser.c:5058-5099):
    //   parse specifier expr
    //   parse optional 2nd arg (or push undefined)
    //   OP_import
    if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const prevSuppressSourcePos = fd.suppressSourcePos
      try {
        // Align with QuickJS: OP_import is emitted without an explicit emit_source_pos.
        // Also suppress sourcePos for the implicit undefined to avoid extra pc2line churn.
        fd.suppressSourcePos = true

        const prevValueUsed = this.context.expressionValueUsed
        this.context.expressionValueUsed = true

        const args = node.arguments
        if (args.length >= 1) {
          this.context.visit(args[0])
        } else {
          // Invalid JS, but keep stack behavior deterministic.
          this.compiler.emitOp(fd, Opcode.OP_undefined)
        }

        if (args.length >= 2) {
          this.context.visit(args[1])
        } else {
          this.compiler.emitOp(fd, Opcode.OP_undefined)
        }

        this.context.expressionValueUsed = prevValueUsed

        this.compiler.emitOp(fd, Opcode.OP_import)
      } finally {
        fd.suppressSourcePos = prevSuppressSourcePos
      }
      return
    }

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
      const prevValueUsed = this.context.expressionValueUsed
      try {
        // 参数表达式的值一定会被 call 消费，必须强制保留。
        this.context.expressionValueUsed = true
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
        this.context.expressionValueUsed = prevValueUsed
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
        // QuickJS emits: get_var(this), get_var(home_object), get_super,
        // push_atom_value(name), get_array_el
        // leaving [this, func] on the stack for OP_call_method.
        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
        this.compiler.emitU16(fd, 0)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_home_object)
        this.compiler.emitU16(fd, 0)

        this.compiler.emitOp(fd, Opcode.OP_get_super)

        const methodName = this.compiler.addAtom(node.expression.name.text)

        // QuickJS emits a source position at the '.' token for `super.prop`.
        // In the reference bytecode, this anchors to the OP_push_atom_value
        // (pc=8 in `Dog.speak`). Mirror that by attaching the dot sourcePos
        // to OP_push_atom_value rather than OP_get_array_el.
        const sf = node.getSourceFile()
        const text = sf.text
        const exprEnd = node.expression.expression.getEnd()
        const nameStart = node.expression.name.getStart(sf)
        let dotPos = -1
        for (let i = nameStart - 1; i >= exprEnd; i--) {
          if (text.charCodeAt(i) === 0x2e /* '.' */) {
            dotPos = i
            break
          }
        }

        this.compiler.emitOp(fd, Opcode.OP_push_atom_value, dotPos)
        this.compiler.emitAtom(fd, methodName)

        // QuickJS does not anchor OP_get_array_el itself for `super.prop`.
        this.compiler.emitOp(fd, Opcode.OP_get_array_el)
        isMethodCall = true
      } else {
        // 普通方法调用: obj.method()
        this.context.visit(node.expression.expression) // 计算对象

        // 私有方法调用: obj.#m()
        if (ts.isPrivateIdentifier(node.expression.name)) {
          const privateName = this.compiler.addAtom(node.expression.name.text)
          this.compiler.emitOp(fd, TempOpcode.OP_scope_get_private_field2, node.expression.expression.getEnd())
          this.compiler.emitU32(fd, privateName)
          this.compiler.emitU16(fd, fd.scopeLevel)
          isMethodCall = true
        } else {
          // 使用 get_field2 获取方法并保留对象
          const methodName = this.compiler.addAtom(node.expression.name.text)
          // QuickJS: 对 `obj.prop(...)`，member-access 的 source-pos 锚定到 '.' token。
          // 这会影响 resolve_labels 中 line_num 的采样，从而影响 pc2line。
          const sf = node.getSourceFile()
          const text = sf.text
          const exprEnd = node.expression.expression.getEnd()
          const nameStart = node.expression.name.getStart(sf)
          let dotPos = -1
          for (let i = nameStart - 1; i >= exprEnd; i--) {
            if (text.charCodeAt(i) === 0x2e /* '.' */) {
              dotPos = i
              break
            }
          }
          this.compiler.emitOp(fd, Opcode.OP_get_field2, dotPos >= 0 ? dotPos : node.expression.expression.getEnd())
          this.compiler.emitAtom(fd, methodName)
          this.compiler.emitIc(fd, methodName)
          isMethodCall = true
        }
      }
    } else if (ts.isElementAccessExpression(node.expression)) {
      // 方法调用: obj[key]()
      // Special-case: super[key]()
      if (node.expression.expression.kind === ts.SyntaxKind.SuperKeyword) {
        // QuickJS emits a super base and then parses `[expr]` as OP_get_super_value,
        // but if immediately called, it rewrites the opcode to OP_get_array_el.
        // Source: third_party/QuickJS/src/core/parser.c:5205-5245 (case OP_get_super_value)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
        this.compiler.emitU16(fd, 0)

        this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_home_object)
        this.compiler.emitU16(fd, 0)

        this.compiler.emitOp(fd, Opcode.OP_get_super)

        this.context.visit(node.expression.argumentExpression)

        // Anchor to '[' token (best-effort scan like visitElementAccessExpression)
        const sf = node.getSourceFile()
        const text = sf.text
        const exprEnd = node.expression.expression.getEnd()
        const argStart = node.expression.argumentExpression.getStart(sf)
        let bracketPos = -1
        for (let i = argStart - 1; i >= exprEnd; i--) {
          if (text.charCodeAt(i) === 0x5b /* '[' */) {
            bracketPos = i
            break
          }
        }
        const bracketSourcePos = bracketPos >= 0 ? bracketPos : node.expression.getStart(sf)

        this.compiler.emitOp(fd, Opcode.OP_get_super_value, bracketSourcePos)
        // Patch to OP_get_array_el for method call (QuickJS behavior)
        if (fd.lastOpcodePos >= 0) {
          fd.byteCode.buffer[fd.lastOpcodePos] = Opcode.OP_get_array_el
        }

        isMethodCall = true
      } else {
        this.context.visit(node.expression.expression) // 计算对象
        this.context.visit(node.expression.argumentExpression) // 计算索引

        // 使用 get_array_el2 获取方法并保留对象
        // QuickJS: element-access source-pos is anchored to the '[' token.
        // This affects line_num sampling and thus pc2line.
        const sf = node.getSourceFile()
        const text = sf.text
        const exprEnd = node.expression.expression.getEnd()
        const argStart = node.expression.argumentExpression.getStart(sf)
        let bracketPos = -1
        for (let i = argStart - 1; i >= exprEnd; i--) {
          if (text.charCodeAt(i) === 0x5b /* '[' */) {
            bracketPos = i
            break
          }
        }
        const bracketSourcePos = bracketPos >= 0 ? bracketPos : node.expression.getStart(sf)

        this.compiler.emitOp(fd, Opcode.OP_get_array_el2, bracketSourcePos)
        isMethodCall = true
      }
    } else if (!isSuperCall) {
      // 普通函数调用（非 super 调用）
      this.context.visit(node.expression)

      // Align with QuickJS js_parse_call():
      // - direct eval() => OP_eval
      // - identifier call inside with-scope => rewrite OP_scope_get_var -> OP_scope_get_ref (method call)
      if (ts.isIdentifier(directEvalCallee) && directEvalCallee.text === 'eval') {
        // direct eval only applies to normal call (no optional chain)
        isDirectEval = true
      } else {
        const lastPos = fd.lastOpcodePos
        if (lastPos != null && lastPos >= 0 && fd.byteCode?.buffer) {
          const buf = fd.byteCode.buffer as Uint8Array
          if (buf[lastPos] === TempOpcode.OP_scope_get_var) {
            const atom = (buf[lastPos + 1] | (buf[lastPos + 2] << 8) | (buf[lastPos + 3] << 16) | (buf[lastPos + 4] << 24)) >>> 0
            const scope = buf[lastPos + 5] | (buf[lastPos + 6] << 8)

            // QuickJS: if has_with_scope(fd, scope) then use OP_scope_get_ref
            if (hasWithScope(fd, scope)) {
              buf[lastPos] = TempOpcode.OP_scope_get_ref
              isMethodCall = true
            }

            // NOTE:
            // QuickJS source reference:
            // - third_party/QuickJS/src/core/parser.c: when rewriting a normal call, if the callee resolves
            //   to OP_scope_get_var with name==JS_ATOM_eval and call_type==FUNC_CALL_NORMAL and no optional
            //   chain, it switches the opcode to OP_eval (see around L5200-L5230).
            // Direct eval is a *syntactic* concept (IdentifierReference 'eval', optionally parenthesized).
            // Do not treat other expressions (e.g. `(1, eval)(...)`) as direct eval even if the last
            // emitted opcode happens to reference the `eval` atom.
            void atom
          }
        }
      }
    }

    // 处理参数
    // QuickJS 的 pc2line 采样点并不会“对所有实参一刀切抑制”。
    // 这里仅对“简单字面量实参”抑制 source-pos，避免把常量实参变成独立采样点；
    // 对标识符/调用/成员访问等非字面量仍保留 source-pos，以匹配 WASM 输出。
    const argCount = node.arguments.length
    const prevSuppressSourcePos = fd.suppressSourcePos
    const prevValueUsed = this.context.expressionValueUsed
    try {
      // 参数表达式的值一定会被 call 消费，必须强制保留。
      this.context.expressionValueUsed = true
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
      this.context.expressionValueUsed = prevValueUsed
    }

    // 发射调用指令
    if (isDirectEval) {
      // QuickJS: OP_eval argc:u16 scope:u16; also marks has_eval_call.
      this.compiler.emitOp(fd, Opcode.OP_eval, callSourcePos)
      this.compiler.emitU16(fd, argCount)
      this.compiler.emitU16(fd, fd.scopeLevel)
      fd.hasEvalCall = true
    } else if (isSuperCall) {
      // super() 调用使用 OP_call_constructor
      this.compiler.emitOp(fd, Opcode.OP_call_constructor, callSourcePos)
      this.compiler.emitU16(fd, argCount)

      // QuickJS: in derived class constructors, `super()` initializes `this`
      // and triggers class field initialization right after the call.
      if (fd.isDerivedClassConstructor) {
        this.emitDerivedCtorPostSuperInit(fd)
      }
    } else if (isMethodCall) {
      this.compiler.emitOp(fd, Opcode.OP_call_method, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_call, callSourcePos)
      this.compiler.emitU16(fd, argCount)
    }
  }

  /**
   * 访问 new 表达式
   *
   * 语法: new Callee(...args)
   * 对齐 QuickJS：callee + args 后发射 OP_call_constructor。
   */
  visitNewExpression(node: ts.NewExpression): void {
    const fd = this.funcDef!
    const callSourcePos = node.expression.getEnd()

    // 计算构造函数表达式
    this.context.visit(node.expression)

    const args = node.arguments ?? []
    const argCount = args.length
    // QuickJS pc2line quirk: when `new` is written without parentheses
    // (e.g. `new Object;`), it anchors the call site source-pos on OP_dup.
    // When parentheses are present (e.g. `new F(2)` or `new F()`), it anchors
    // on OP_call_constructor.
    const hasParens = node.arguments != null

    // QuickJS: OP_call_constructor 需要 [ctor, new_target, ...args]
    // 对于普通 `new ctor(...)`，new_target == ctor。
    if (!hasParens) {
      this.compiler.emitOp(fd, Opcode.OP_dup, callSourcePos)
    } else {
      this.compiler.emitOp(fd, Opcode.OP_dup)
    }

    // 参数处理逻辑尽量与普通 call 保持一致：对简单字面量抑制 source-pos。
    const prevSuppressSourcePos = fd.suppressSourcePos
    try {
      for (const arg of args) {
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

    if (hasParens) {
      this.compiler.emitOp(fd, Opcode.OP_call_constructor, callSourcePos)
    } else {
      // Source position already emitted on OP_dup above.
      this.compiler.emitOp(fd, Opcode.OP_call_constructor)
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

    // super.prop
    // QuickJS: when previous opcode is OP_get_super, member access emits:
    //   emit_source_pos('.') ; push_atom_value(name) ; OP_get_super_value
    // Source: third_party/QuickJS/src/core/parser.c:5425-5489
    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
      this.compiler.emitU16(fd, 0)

      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_home_object)
      this.compiler.emitU16(fd, 0)

      // OP_get_super consumes home_object and leaves `this, super` on stack.
      this.compiler.emitOp(fd, Opcode.OP_get_super)

      const name = this.compiler.addAtom(node.name.text)
      // Anchor member access to '.' token (aligns pc2line to QuickJS)
      this.compiler.emitOp(fd, Opcode.OP_push_atom_value, sourcePos)
      this.compiler.emitAtom(fd, name)

      this.compiler.emitOp(fd, Opcode.OP_get_super_value)
      return
    }

    // 计算对象
    // The base expression's value is always required to perform the property access.
    // In particular, patterns like `(x = foo()).y` must compile the assignment in
    // value-producing mode (so it leaves the assigned value on the stack).
    const prevValueUsed = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(node.expression)
    } finally {
      this.context.expressionValueUsed = prevValueUsed
    }

    // 私有字段/方法访问: obj.#name
    // QuickJS lowers these via OP_scope_get_private_field and resolves them in
    // resolve_scope_private_field() to get_var_ref*/get_private_field/check_brand.
    if (ts.isPrivateIdentifier(node.name)) {
      const name = this.compiler.addAtom(node.name.text)
      // QuickJS records member-access source position at the '.' token (op_token_ptr)
      // even for private names (obj.#x). Align to that so pc2line matches WASM.
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_private_field, sourcePos)
      this.compiler.emitU32(fd, name)
      this.compiler.emitU16(fd, fd.scopeLevel)
      return
    }

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

    // super[expr]
    // QuickJS: `super` base emits OP_get_super, then `[...]` emits OP_get_super_value.
    // Source: third_party/QuickJS/src/core/parser.c:5482-5489
    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_this)
      this.compiler.emitU16(fd, 0)

      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_home_object)
      this.compiler.emitU16(fd, 0)

      this.compiler.emitOp(fd, Opcode.OP_get_super)

      const prevArgValueUsed = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.argumentExpression)
      } finally {
        this.context.expressionValueUsed = prevArgValueUsed
      }

      this.compiler.emitOp(fd, Opcode.OP_get_super_value, sourcePos)
      return
    }

    // 计算对象
    // Like property access, the base expression's value is always required.
    // This prevents stack underflow for cases like `(x = foo())[i]`.
    const prevValueUsed = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(node.expression)
    } finally {
      this.context.expressionValueUsed = prevValueUsed
    }

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
      const prevArgValueUsed = this.context.expressionValueUsed
      this.context.expressionValueUsed = true
      try {
        this.context.visit(node.argumentExpression)
      } finally {
        this.context.expressionValueUsed = prevArgValueUsed
      }

      // 发射 get_array_el 指令
      this.compiler.emitOp(fd, Opcode.OP_get_array_el, qdotPos >= 0 ? qdotPos : sourcePos)

      if (node === this.getOptionalChainRoot(node)) {
        this.compiler.emitLabelInt(fd, endLabel)
      }
      return
    }

    // 计算索引
    // The index expression's value is always required by OP_get_array_el.
    const prevArgValueUsed = this.context.expressionValueUsed
    this.context.expressionValueUsed = true
    try {
      this.context.visit(node.argumentExpression)
    } finally {
      this.context.expressionValueUsed = prevArgValueUsed
    }

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

      // Note: this repo targets a TypeScript build where optional chaining is
      // represented via normal *Expression nodes + `questionDotToken`.
      // Avoid relying on newer SyntaxKind.*Chain enums.
      const isChainParent =
        (ts.isPropertyAccessExpression(p) || ts.isElementAccessExpression(p) || ts.isCallExpression(p)) &&
        isOptionalByToken

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
    if (ts.isPropertyAccessExpression(expr)) {
      // obj?.prop?.(args)
      this.context.visit(expr.expression)
      const methodName = this.compiler.addAtom(expr.name.text)
      this.compiler.emitOp(fd, Opcode.OP_get_field2, expr.expression.getEnd())
      this.compiler.emitAtom(fd, methodName)
      this.compiler.emitIc(fd, methodName)
      isMethodCall = true
      dropCount = 2
    } else if (ts.isElementAccessExpression(expr)) {
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
    const elements = node.elements

    // 按 QuickJS js_parse_array_literal() 的三段式策略对齐：
    // 1) 前 32 个“连续普通元素”直接压栈 + OP_array_from(idx)
    // 2) 剩余普通元素/holes：用显式 index 的 OP_define_field
    // 3) 一旦出现 spread / huge：切换为 (array, index) 栈形态 + OP_append/OP_define_array_el
    // QuickJS 源码位置: third_party/QuickJS/src/core/parser.c:3743-3895 (js_parse_array_literal)

    // QuickJS: __JS_AtomFromUInt32(v) = v | JS_ATOM_TAG_INT
    // third_party/QuickJS/include/QuickJS/quickjs.h:238
    const atomFromUInt32 = (v: number): number => ((v | 0x80000000) >>> 0)

    let idx = 0
    while (idx < elements.length && idx < 32) {
      const elem = elements[idx]
      if (ts.isSpreadElement(elem) || ts.isOmittedExpression(elem)) {
        break
      }
      this.context.visit(elem)
      idx++
    }

    // QuickJS: js_parse_array_literal() 对 OP_array_from 不绑定 sourcePos。
    this.compiler.emitOp(fd, Opcode.OP_array_from)
    this.compiler.emitU16(fd, idx)

    let needLength = false

    // larger arrays and holes are handled with explicit indices (直到遇到 spread)
    while (idx < elements.length) {
      const elem = elements[idx]
      if (ts.isSpreadElement(elem)) {
        break
      }

      needLength = true
      if (!ts.isOmittedExpression(elem)) {
        this.context.visit(elem)
        this.compiler.emitOp(fd, Opcode.OP_define_field)
        this.compiler.emitU32(fd, atomFromUInt32(idx))
        needLength = false
      }
      idx++
    }

    // no spread/huge part: set length if last was a hole
    if (idx >= elements.length) {
      if (needLength) {
        // Set the length: cannot use OP_define_field because length is not configurable
        // QuickJS: parser.c:3804-3814
        this.compiler.emitOp(fd, Opcode.OP_dup)
        this.compiler.emitOp(fd, Opcode.OP_push_i32)
        this.compiler.emitU32(fd, idx)
        this.compiler.emitOp(fd, Opcode.OP_put_field)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_length)
        this.compiler.emitIc(fd, JSAtom.JS_ATOM_length)
      }
      return
    }

    // huge arrays and spread elements require a dynamic index on the stack
    // stack has array, index
    this.compiler.emitOp(fd, Opcode.OP_push_i32)
    this.compiler.emitU32(fd, idx)

    while (idx < elements.length) {
      const elem = elements[idx]
      if (ts.isSpreadElement(elem)) {
        this.context.visit(elem.expression)
        this.compiler.emitOp(fd, Opcode.OP_append)
      } else {
        needLength = true
        if (!ts.isOmittedExpression(elem)) {
          this.context.visit(elem)
          this.compiler.emitOp(fd, Opcode.OP_define_array_el)
          needLength = false
        }
        this.compiler.emitOp(fd, Opcode.OP_inc)
      }
      idx++
    }

    if (needLength) {
      // array length - array array length
      // QuickJS: parser.c:3872-3878
      this.compiler.emitOp(fd, Opcode.OP_dup1)
      this.compiler.emitOp(fd, Opcode.OP_put_field)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_length)
      this.compiler.emitIc(fd, JSAtom.JS_ATOM_length)
    } else {
      // drop length: array length - array
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

    // 创建空对象
    // QuickJS: js_parse_object_literal() 里对 OP_object 使用 emit_op(s, OP_object)
    // 并不会调用 emit_source_pos()。
    // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal (emit_op(s, OP_object)).
    // 为了对齐 pc2line 采样点，这里不绑定 sourcePos。
    this.compiler.emitOp(fd, Opcode.OP_object)

    // 处理每个属性
    for (const prop of node.properties) {
      if (ts.isMethodDeclaration(prop)) {
        // 对象字面量方法: { foo() {} }
        const flags = OP_DEFINE_METHOD_METHOD | OP_DEFINE_METHOD_ENUMERABLE

        if (ts.isComputedPropertyName(prop.name)) {
          // computed method: { [expr]() {} }
          this.context.visit(prop.name.expression)
          this.compiler.emitOp(fd, Opcode.OP_to_propkey)

          // push closure
          this.context.visit(prop)

          // define method
          this.compiler.emitOp(fd, Opcode.OP_define_method_computed)
          this.compiler.emitU8(fd, flags)
        } else {
          // non-computed method
          const nameText = ts.isIdentifier(prop.name)
            ? prop.name.text
            : ts.isStringLiteral(prop.name)
              ? prop.name.text
              : ts.isNumericLiteral(prop.name)
                ? prop.name.text
                : null

          if (nameText !== null) {
            const nameAtom = this.compiler.addAtom(nameText)

            // push closure
            this.context.visit(prop)

            this.compiler.emitOp(fd, Opcode.OP_define_method)
            this.compiler.emitAtom(fd, nameAtom)
            this.compiler.emitU8(fd, flags)
          }
        }
        continue
      }

      if (ts.isGetAccessorDeclaration(prop) || ts.isSetAccessorDeclaration(prop)) {
        const isSetter = ts.isSetAccessorDeclaration(prop)
        const accessorKind = isSetter ? OP_DEFINE_METHOD_SETTER : OP_DEFINE_METHOD_GETTER
        const flags = accessorKind | OP_DEFINE_METHOD_ENUMERABLE

        if (ts.isComputedPropertyName(prop.name)) {
          this.context.visit(prop.name.expression)
          this.compiler.emitOp(fd, Opcode.OP_to_propkey)

          // push closure
          this.context.visit(prop)

          this.compiler.emitOp(fd, Opcode.OP_define_method_computed)
          this.compiler.emitU8(fd, flags)
        } else {
          const nameText = ts.isIdentifier(prop.name)
            ? prop.name.text
            : ts.isStringLiteral(prop.name)
              ? prop.name.text
              : ts.isNumericLiteral(prop.name)
                ? prop.name.text
                : null

          if (nameText !== null) {
            const nameAtom = this.compiler.addAtom(nameText)

            // push closure
            this.context.visit(prop)

            this.compiler.emitOp(fd, Opcode.OP_define_method)
            this.compiler.emitAtom(fd, nameAtom)
            this.compiler.emitU8(fd, flags)
          }
        }
        continue
      }

      if (ts.isPropertyAssignment(prop)) {
        // 普通属性: key: value
        if (ts.isIdentifier(prop.name)) {
          // 标识符键
          // Object-literal property values are always consumed by define_field/define_array_el,
          // so the initializer must run in value-producing mode.
          const prevValueUsed = this.context.expressionValueUsed
          this.context.expressionValueUsed = true
          try {
            this.context.visit(prop.initializer)
          } finally {
            this.context.expressionValueUsed = prevValueUsed
          }
          const name = this.compiler.addAtom(prop.name.text)
          // QuickJS: js_parse_object_literal() 对 define_field 直接 emit_op，不绑定 source。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal (emit_op(s, OP_define_field)).
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, name)
        } else if (ts.isStringLiteral(prop.name)) {
          // 字符串键
          const prevValueUsed = this.context.expressionValueUsed
          this.context.expressionValueUsed = true
          try {
            this.context.visit(prop.initializer)
          } finally {
            this.context.expressionValueUsed = prevValueUsed
          }
          const name = this.compiler.addAtom(prop.name.text)
          // QuickJS: js_parse_object_literal() 对 define_field 直接 emit_op，不绑定 source。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, name)
        } else if (ts.isNumericLiteral(prop.name)) {
          // 数字键
          const prevValueUsed = this.context.expressionValueUsed
          this.context.expressionValueUsed = true
          try {
            this.context.visit(prop.initializer)
          } finally {
            this.context.expressionValueUsed = prevValueUsed
          }
          const name = this.compiler.addAtom(prop.name.text)
          // QuickJS: js_parse_object_literal() 对 define_field 直接 emit_op，不绑定 source。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
          this.compiler.emitOp(fd, Opcode.OP_define_field)
          this.compiler.emitAtom(fd, name)
        } else if (ts.isComputedPropertyName(prop.name)) {
          // 计算属性键
          // key expression must produce a value for OP_to_propkey
          const prevKeyValueUsed = this.context.expressionValueUsed
          this.context.expressionValueUsed = true
          try {
            this.context.visit(prop.name.expression)
          } finally {
            this.context.expressionValueUsed = prevKeyValueUsed
          }
          // QuickJS: name == JS_ATOM_NULL (computed) 时，在解析 ':' 之前必须先
          // emit_op(OP_to_propkey)。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal:
          //   if (name == JS_ATOM_NULL) emit_op(s, OP_to_propkey);
          this.compiler.emitOp(fd, Opcode.OP_to_propkey)
          const prevValueUsed = this.context.expressionValueUsed
          this.context.expressionValueUsed = true
          try {
            this.context.visit(prop.initializer)
          } finally {
            this.context.expressionValueUsed = prevValueUsed
          }
          // QuickJS: computed key 路径会 emit_op(OP_to_propkey) / emit_op(OP_define_array_el)
          // 均不绑定 source 位置。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal.
          this.compiler.emitOp(fd, Opcode.OP_define_array_el)
          // QuickJS: computed data property 使用 OP_define_array_el 后会 drop 掉 value
          // 以保持栈上只留下对象。
          // 参见: third_party/QuickJS/src/core/parser.c: js_parse_object_literal:
          //   emit_op(s, OP_define_array_el); emit_op(s, OP_drop);
          this.compiler.emitOp(fd, Opcode.OP_drop)
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

        // 访问 spread 表达式 (src)
        this.context.visit(prop.expression)

        // 发射 OP_null 作为 excludeList
        // QuickJS 输出顺序为: src -> null -> copy_data_properties
        this.compiler.emitOp(fd, Opcode.OP_null)

        // 发射 OP_copy_data_properties
        // 参数格式: (copy_flags) | (exclude_first_idx << 2) | (exclude_second_idx << 5)
        this.compiler.emitOp(fd, Opcode.OP_copy_data_properties)
        this.compiler.emitU8(fd, COPY_DATA_PROPERTIES_OPERAND_SPREAD)

        // QuickJS: copy_data_properties 之后会连续 drop 两次，确保只保留对象本身。
        // 参见 third_party/QuickJS/src/core/parser.c: js_parse_object_literal (spread 分支)
        this.compiler.emitOp(fd, Opcode.OP_drop)
        this.compiler.emitOp(fd, Opcode.OP_drop)
      }
    }
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
      // delete super.x -> throw_error(delete_super)
      // QuickJS: js_parse_delete(): case OP_get_super_value
      // third_party/QuickJS/src/core/parser.c:5585-5620
      if (lastPos >= 0 && lastPos + 1 <= fd.byteCode.size && buf[lastPos] === Opcode.OP_get_super_value) {
        fd.byteCode.size = lastPos
        fd.lastOpcodePos = -1
        // JS_THROW_ERROR_DELETE_SUPER
        // QuickJS 源码出处：third_party/QuickJS/src/core/function.h:45
        const JS_THROW_ERROR_DELETE_SUPER = 3
        this.compiler.emitOp(fd, Opcode.OP_throw_error)
        this.compiler.emitAtom(fd, JS_ATOM_NULL)
        this.compiler.emitU8(fd, JS_THROW_ERROR_DELETE_SUPER)
      } else if (lastPos >= 0 && lastPos + 5 <= fd.byteCode.size && buf[lastPos] === Opcode.OP_get_field) {
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
      // delete super[expr] -> throw_error(delete_super)
      if (lastPos >= 0 && lastPos + 1 <= fd.byteCode.size && buf[lastPos] === Opcode.OP_get_super_value) {
        fd.byteCode.size = lastPos
        fd.lastOpcodePos = -1
        const JS_THROW_ERROR_DELETE_SUPER = 3
        this.compiler.emitOp(fd, Opcode.OP_throw_error)
        this.compiler.emitAtom(fd, JS_ATOM_NULL)
        this.compiler.emitU8(fd, JS_THROW_ERROR_DELETE_SUPER)
      } else if (lastPos >= 0 && lastPos + 1 <= fd.byteCode.size && buf[lastPos] === Opcode.OP_get_array_el) {
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
    // QuickJS: js_parse_unary() 的 TOK_TYPEOF 分支是直接 emit_op(OP_typeof)
    // （无 emit_source_pos），因此这里不绑定 sourcePos，避免额外插入 OP_line_num。
    this.compiler.emitOp(fd, Opcode.OP_typeof)
  }

  /**
   * 访问 void 表达式
   *
   * 语义: 计算表达式并丢弃结果，返回 undefined。
   */
  visitVoidExpression(node: ts.VoidExpression): void {
    const fd = this.funcDef!
    this.context.visit(node.expression)
    this.compiler.emitOp(fd, Opcode.OP_drop)
    this.compiler.emitOp(fd, Opcode.OP_undefined)
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
    const sourcePos = node.getStart(node.getSourceFile())

    if (node.expression) {
      // 计算 yield 的表达式
      this.context.visit(node.expression)
    } else {
      // yield 没有表达式时，yield undefined
      this.compiler.emitOp(fd, Opcode.OP_undefined)
    }

    if (node.asteriskToken) {
      // yield* 表达式
      //
      // QuickJS 源码出处：third_party/QuickJS/src/core/parser.c
      // - js_parse_assign_expr2() 的 TOK_YIELD 分支 (is_star)
      //   大约位于 parser.c:6007-6150
      //
      // 关键点：QuickJS 不会直接对 iterable 做一次 OP_yield_star。
      // 它会生成 iterator loop，并实现 return/throw 协议以符合规范。

      const isAsync = (fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR)

      // JS_THROW_ERROR_ITERATOR_THROW
      // QuickJS 源码出处：third_party/QuickJS/src/core/function.h:44
      const JS_THROW_ERROR_ITERATOR_THROW = 4

      const labelLoop = this.compiler.newLabelInt(fd)
      const labelYield = this.compiler.newLabelInt(fd)

      this.compiler.emitOp(fd, isAsync ? Opcode.OP_for_await_of_start : Opcode.OP_for_of_start)

      // remove the catch offset (QuickJS emits OP_drop; OP_undefined)
      this.compiler.emitOp(fd, Opcode.OP_drop)
      this.compiler.emitOp(fd, Opcode.OP_undefined)

      // initial value
      this.compiler.emitOp(fd, Opcode.OP_undefined)

      this.compiler.emitLabelInt(fd, labelLoop)
      this.compiler.emitOp(fd, Opcode.OP_iterator_next)
      if (isAsync) {
        this.compiler.emitOp(fd, Opcode.OP_await)
      }
      this.compiler.emitOp(fd, Opcode.OP_iterator_check_object)
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_done)
      this.compiler.emitIc(fd, JSAtom.JS_ATOM_done)

      const labelNext = this.compiler.newLabelInt(fd)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelNext) // end of loop

      this.compiler.emitLabelInt(fd, labelYield)
      if (isAsync) {
        // OP_async_yield_star takes the value as parameter
        this.compiler.emitOp(fd, Opcode.OP_get_field)
        this.compiler.emitAtom(fd, JSAtom.JS_ATOM_value)
        this.compiler.emitIc(fd, JSAtom.JS_ATOM_value)
        this.compiler.emitOp(fd, Opcode.OP_await)
        this.compiler.emitOp(fd, Opcode.OP_async_yield_star)
      } else {
        // OP_yield_star takes (value, done) as parameter
        this.compiler.emitOp(fd, Opcode.OP_yield_star)
      }

      this.compiler.emitOp(fd, Opcode.OP_dup)
      const labelReturn = this.compiler.newLabelInt(fd)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelReturn)
      this.compiler.emitOp(fd, Opcode.OP_drop)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelLoop)

      // return handling
      this.compiler.emitLabelInt(fd, labelReturn)
      this.compiler.emitOp(fd, Opcode.OP_push_i32)
      this.compiler.emitU32(fd, 2)
      this.compiler.emitOp(fd, Opcode.OP_strict_eq)
      const labelThrow = this.compiler.newLabelInt(fd)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelThrow)

      if (isAsync) {
        this.compiler.emitOp(fd, Opcode.OP_await)
      }
      this.compiler.emitOp(fd, Opcode.OP_iterator_call)
      this.compiler.emitU8(fd, 0)
      const labelReturn1 = this.compiler.newLabelInt(fd)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelReturn1)
      if (isAsync) {
        this.compiler.emitOp(fd, Opcode.OP_await)
      }
      this.compiler.emitOp(fd, Opcode.OP_iterator_check_object)
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_done)
      this.compiler.emitIc(fd, JSAtom.JS_ATOM_done)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelYield)

      this.compiler.emitOp(fd, Opcode.OP_get_field)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_value)
      this.compiler.emitIc(fd, JSAtom.JS_ATOM_value)

      this.compiler.emitLabelInt(fd, labelReturn1)
      this.compiler.emitOp(fd, Opcode.OP_nip)
      this.compiler.emitOp(fd, Opcode.OP_nip)
      this.compiler.emitOp(fd, Opcode.OP_nip)
      this.compiler.emitReturn(fd, true)

      // throw handling
      this.compiler.emitLabelInt(fd, labelThrow)
      this.compiler.emitOp(fd, Opcode.OP_iterator_call)
      this.compiler.emitU8(fd, 1)
      const labelThrow1 = this.compiler.newLabelInt(fd)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelThrow1)
      if (isAsync) {
        this.compiler.emitOp(fd, Opcode.OP_await)
      }
      this.compiler.emitOp(fd, Opcode.OP_iterator_check_object)
      this.compiler.emitOp(fd, Opcode.OP_get_field2)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_done)
      this.compiler.emitIc(fd, JSAtom.JS_ATOM_done)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelYield)
      this.compiler.emitGotoInt(fd, Opcode.OP_goto, labelNext)

      // close the iterator and throw a type error exception
      this.compiler.emitLabelInt(fd, labelThrow1)
      this.compiler.emitOp(fd, Opcode.OP_iterator_call)
      this.compiler.emitU8(fd, 2)
      const labelThrow2 = this.compiler.newLabelInt(fd)
      this.compiler.emitGotoInt(fd, Opcode.OP_if_true, labelThrow2)
      if (isAsync) {
        this.compiler.emitOp(fd, Opcode.OP_await)
      }
      this.compiler.emitLabelInt(fd, labelThrow2)

      this.compiler.emitOp(fd, Opcode.OP_throw_error)
      this.compiler.emitAtom(fd, JS_ATOM_NULL)
      this.compiler.emitU8(fd, JS_THROW_ERROR_ITERATOR_THROW)

      // label_next: keep the value associated with done = true
      this.compiler.emitLabelInt(fd, labelNext)
      this.compiler.emitOp(fd, Opcode.OP_get_field)
      this.compiler.emitAtom(fd, JSAtom.JS_ATOM_value)
      this.compiler.emitIc(fd, JSAtom.JS_ATOM_value)
      this.compiler.emitOp(fd, Opcode.OP_nip)
      this.compiler.emitOp(fd, Opcode.OP_nip)
      this.compiler.emitOp(fd, Opcode.OP_nip)
    } else {
      // yield 表达式
      // QuickJS (parser.c: js_parse_assign_expr2 -> TOK_YIELD) emits:
      //   if (is_async) OP_await;
      //   OP_yield;
      //   if_false label_next;
      //   emit_return(TRUE);
      //   label_next:
      // This is crucial for (async) generators and for byte-perfect output.

      if (fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR) {
        this.compiler.emitOp(fd, Opcode.OP_await)
      }

      // QuickJS does not always introduce a new pc2line sampling point at `yield`
      // when the yielded value is produced by `await ...` in async generators.
      // Suppress the explicit source position in that specific shape to match WASM.
      const isYieldAwait = node.expression != null && ts.isAwaitExpression(node.expression)
      if (fd.funcKind === JSFunctionKindEnum.JS_FUNC_ASYNC_GENERATOR && isYieldAwait) {
        this.compiler.emitOp(fd, Opcode.OP_yield)
      } else {
        this.compiler.emitOp(fd, Opcode.OP_yield, sourcePos)
      }

      if (fd.funcKind !== JSFunctionKindEnum.JS_FUNC_NORMAL) {
        const labelNext = this.compiler.newLabelInt(fd)
        this.compiler.emitGotoInt(fd, Opcode.OP_if_false, labelNext)
        this.compiler.emitReturn(fd, true)
        this.compiler.emitLabelInt(fd, labelNext)
      }
    }
  }

  // ============================================================================
  // MetaProperty - new.target / import.meta
  // ============================================================================

  visitMetaProperty(node: ts.MetaProperty): void {
    const fd = this.funcDef!
    const sf = node.getSourceFile()
    const text = node.getText(sf)

    if (text === 'new.target') {
      // Treat `new.target` as a pseudo variable. VariableResolver will map it to
      // the dedicated new.target local slot when allowed.
      const atom = this.compiler.addAtom('new.target')
      // QuickJS does not add a dedicated pc2line entry for the pseudo-var load.
      this.compiler.emitOp(fd, TempOpcode.OP_scope_get_var)
      this.compiler.emitAtom(fd, atom)
      this.compiler.emitU16(fd, fd.scopeLevel)
      return
    }

    // Keep behavior explicit so missing support fails loudly in fixtures.
    throw new Error(`Unsupported meta property: ${text}`)
  }
}
