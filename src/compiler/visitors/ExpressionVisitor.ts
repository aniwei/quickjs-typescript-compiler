import * as ts from 'typescript'
import { Compiler, Label } from '../Compiler'
import { FunctionDef, JSVarKind } from '../FunctionDef'
import { Opcode } from '../../env'
import { ScopeManager, VarInfo } from '../ScopeManager'
import { LabelManager } from '../LabelManager'
import { CompilerContext } from '../CompilerContext'
import { DefineMethodFlag } from '../../env'

interface OptionalChainContext {
  exitLabel: Label
}

export class ExpressionVisitor {
  constructor(private context: CompilerContext) {}

  private optionalChainMap = new WeakMap<ts.Expression, OptionalChainContext>()

  private get compiler(): Compiler {
    return this.context.compiler
  }

  private get funcDef(): FunctionDef {
    return this.context.funcDef!
  }

  private get scopeManager(): ScopeManager {
    return this.context.scopeManager
  }

  private get labelManager(): LabelManager {
    return this.context.labelManager
  }

  private hasQuestionDot(node: ts.Node): boolean {
    return Boolean((node as any).questionDotToken)
  }

  private isOptionalChainNode(node: ts.Expression): boolean {
    if (!node) {
      return false
    }

    if (this.hasQuestionDot(node)) {
      return true
    }

    return (node.flags & ts.NodeFlags.OptionalChain) !== 0
  }

  private registerOptionalChild(
    node: ts.Expression,
    ctx: OptionalChainContext | null,
  ) {
    if (!ctx) {
      return
    }
    if (this.isOptionalChainNode(node)) {
      this.optionalChainMap.set(node, ctx)
    }
  }

  private withOptionalChain(
    node: ts.Expression,
    emit: (ctx: OptionalChainContext | null) => void,
  ) {
    const [ctx, created] = this.enterOptionalChain(node)
    emit(ctx)
    this.leaveOptionalChain(ctx, created)
  }

  private enterOptionalChain(
    node: ts.Expression,
  ): [OptionalChainContext | null, boolean] {
    if (!this.funcDef || !this.isOptionalChainNode(node)) {
      return [null, false]
    }

    let ctx = this.optionalChainMap.get(node) ?? null
    let created = false

    if (!ctx) {
      ctx = { exitLabel: this.compiler.createLabel(this.funcDef) }
      this.optionalChainMap.set(node, ctx)
      created = true
    }

    return [ctx, created]
  }

  private leaveOptionalChain(
    ctx: OptionalChainContext | null,
    created: boolean,
  ) {
    if (!this.funcDef || !ctx || !created) {
      return
    }

    this.compiler.markLabel(this.funcDef, ctx.exitLabel)
  }

  private emitOptionalChainGuard(
    ctx: OptionalChainContext | null,
    dropCount: number,
  ) {
    if (!this.funcDef || !ctx) {
      return
    }

    const nextLabel = this.compiler.createLabel(this.funcDef)
    this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
    this.compiler.emitOp(this.funcDef, Opcode.OP_is_undefined_or_null)
    this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, nextLabel)
    
    for (let i = 0; i < dropCount; i++) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
    }

    this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
    this.compiler.emitJump(this.funcDef, Opcode.OP_goto, ctx.exitLabel)
    this.compiler.markLabel(this.funcDef, nextLabel)
  }

  private emitLoadIdentifier(node: ts.Identifier, varInfo: VarInfo | null) {
    if (!this.funcDef) {
      return
    }

    const pos = node.getStart()
    const name = node.text

    if (!varInfo) {
      const atomId = this.compiler.addAtom(name)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_var, atomId, pos)
      return
    }

    if (varInfo.type === 'closure') {
      const idx = varInfo.idx
      if (varInfo.isLexical) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, pos)
        this.compiler.emitU16(this.funcDef, idx)
      } else {
        if (idx === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, pos)
        } else if (idx === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, pos)
        } else if (idx === 2) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, pos)
        } else if (idx === 3) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, pos)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref, pos)
          this.compiler.emitU16(this.funcDef, idx)
        }
      }
      return
    }

    const varIdx = varInfo.idx
    const localIdx =
      typeof varInfo.localIdx === 'number'
        ? varInfo.localIdx
        : this.funcDef.vars[varIdx]?.localIdx ?? -1

    if (varInfo.isArg) {
      const idx = localIdx >= 0 ? localIdx : varIdx
      if (idx === 0) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg0, pos)
      } else if (idx === 1) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg1, pos)
      } else if (idx === 2) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg2, pos)
      } else if (idx === 3) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg3, pos)
      } else {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_arg, pos)
        this.compiler.emitU16(this.funcDef, idx)
      }
      return
    }

    if (varInfo.isLexical && !varInfo.isCatchVar) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check, pos)
      this.compiler.emitU16(this.funcDef, localIdx)
    } else {
      if (localIdx === 0) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0, pos)
      } else if (localIdx === 1) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1, pos)
      } else if (localIdx === 2) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc2, pos)
      } else if (localIdx === 3) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc3, pos)
      } else if (localIdx >= 0 && localIdx < 256) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc8, pos)
        this.compiler.emitU8(this.funcDef, localIdx)
      } else {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc, pos)
        this.compiler.emitU16(this.funcDef, localIdx)
      }
    }
  }

  private emitStoreIdentifier(
    node: ts.Identifier,
    varInfo: VarInfo | null,
    keepValue: boolean,
  ) {
    if (!this.funcDef) {
      return
    }

    const pos = node.getStart()
    const name = node.text

    if (!varInfo) {
      if (keepValue) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      }
      const atomId = this.compiler.addAtom(name)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_var, atomId, pos)
      return
    }

    if (varInfo.type === 'closure') {
      const idx = varInfo.idx
      if (keepValue) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      }
      if (varInfo.isLexical) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref_check, pos)
        this.compiler.emitU16(this.funcDef, idx)
      } else {
        if (idx === 0) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0, pos)
        } else if (idx === 1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1, pos)
        } else if (idx === 2) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2, pos)
        } else if (idx === 3) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3, pos)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref, pos)
          this.compiler.emitU16(this.funcDef, idx)
        }
      }
      return
    }

    const varIdx = varInfo.idx
    const localIdx =
      typeof varInfo.localIdx === 'number'
        ? varInfo.localIdx
        : this.funcDef.vars[varIdx]?.localIdx ?? -1

    if (varInfo.isArg) {
      const idx = localIdx >= 0 ? localIdx : varIdx
      if (keepValue) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      }
      if (idx === 0) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_arg0, pos)
      } else if (idx === 1) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_arg1, pos)
      } else if (idx === 2) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_arg2, pos)
      } else if (idx === 3) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_arg3, pos)
      } else {
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_arg, pos)
        this.compiler.emitU16(this.funcDef, idx)
      }
      return
    }

    if (keepValue) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
    }

    if (localIdx === 0) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc0, pos)
    } else if (localIdx === 1) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc1, pos)
    } else if (localIdx === 2) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc2, pos)
    } else if (localIdx === 3) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc3, pos)
    } else if (localIdx >= 0 && localIdx < 256) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc8, pos)
      this.compiler.emitU8(this.funcDef, localIdx)
    } else {
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc, pos)
      this.compiler.emitU16(this.funcDef, localIdx)
    }
  }

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

  private isLogicalAssignment(kind: ts.SyntaxKind): boolean {
    return (
      kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken ||
      kind === ts.SyntaxKind.BarBarEqualsToken ||
      kind === ts.SyntaxKind.QuestionQuestionEqualsToken
    )
  }

  private emitCompoundAssignment(
    node: ts.BinaryExpression,
    opcode: Opcode,
  ) {
    if (!this.funcDef) {
      return
    }

    const opPos = node.operatorToken.getStart()

    if (ts.isIdentifier(node.left)) {
      const varInfo = this.scopeManager.findVar(node.left.text, this.funcDef)
      this.emitLoadIdentifier(node.left, varInfo)
      this.context.visit(node.right)
      this.compiler.emitOp(this.funcDef, opcode, opPos)
      this.emitStoreIdentifier(node.left, varInfo, true)
      return
    }

    if (ts.isPropertyAccessExpression(node.left)) {
      this.emitCompoundPropertyAssignment(node.left, node.right, opcode, opPos)
      return
    }

    if (ts.isElementAccessExpression(node.left)) {
      this.emitCompoundElementAssignment(node.left, node.right, opcode, opPos)
      return
    }

    throw new Error('Unsupported compound assignment target')
  }

  private emitCompoundPropertyAssignment(
    target: ts.PropertyAccessExpression,
    rhs: ts.Expression,
    opcode: Opcode,
    opPos: number,
  ) {
    if (!this.funcDef) {
      return
    }

    if ((target as ts.PropertyAccessChain).questionDotToken) {
      throw new Error('Optional chaining cannot be used on assignment target')
    }

    const atom = this.compiler.addAtom(target.name.text)

    this.context.visit(target.expression) // obj
    this.compiler.emitAtomOp(
      this.funcDef,
      Opcode.OP_get_field2,
      atom,
      target.expression.getEnd(),
    )
    this.context.visit(rhs)
    this.compiler.emitOp(this.funcDef, opcode, opPos)
    this.compiler.emitOp(this.funcDef, Opcode.OP_insert2)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_field, atom, opPos)
  }

  private emitCompoundElementAssignment(
    target: ts.ElementAccessExpression,
    rhs: ts.Expression,
    opcode: Opcode,
    opPos: number,
  ) {
    if (!this.funcDef) {
      return
    }

    if (!target.argumentExpression) {
      throw new Error('Element access requires an argument expression')
    }

    this.context.visit(target.expression) // obj
    this.context.visit(target.argumentExpression) // prop
    this.compiler.emitOp(
      this.funcDef,
      Opcode.OP_get_array_el3,
      target.expression.getEnd(),
    )
    this.context.visit(rhs)
    this.compiler.emitOp(this.funcDef, opcode, opPos)
    this.compiler.emitOp(this.funcDef, Opcode.OP_insert3)
    this.compiler.emitOp(this.funcDef, Opcode.OP_put_array_el, opPos)
  }

  private emitLogicalAssignment(node: ts.BinaryExpression) {
    if (!this.funcDef) {
      return
    }

    const opKind = node.operatorToken.kind
    const skipLabel = this.compiler.createLabel(this.funcDef)
    const endLabel = this.compiler.createLabel(this.funcDef)

    const emitConditionJump = () => {
      if (opKind === ts.SyntaxKind.QuestionQuestionEqualsToken) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_is_undefined_or_null)
        this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, skipLabel)
      } else {
        const branchOp =
          opKind === ts.SyntaxKind.BarBarEqualsToken
            ? Opcode.OP_if_true
            : Opcode.OP_if_false
        this.compiler.emitJump(this.funcDef, branchOp, skipLabel)
      }
    }

    if (ts.isIdentifier(node.left)) {
      const varInfo = this.scopeManager.findVar(node.left.text, this.funcDef)
      this.emitLoadIdentifier(node.left, varInfo)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      emitConditionJump()
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.emitStoreIdentifier(node.left, varInfo, true)
      this.compiler.emitJump(this.funcDef, Opcode.OP_goto, endLabel)
      this.compiler.markLabel(this.funcDef, skipLabel)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }

    if (ts.isPropertyAccessExpression(node.left)) {
      if ((node.left as ts.PropertyAccessChain).questionDotToken) {
        throw new Error('Optional chaining cannot be used on assignment target')
      }
      const atom = this.compiler.addAtom(node.left.name.text)
      this.context.visit(node.left.expression) // obj
      this.compiler.emitAtomOp(
        this.funcDef,
        Opcode.OP_get_field2,
        atom,
        node.left.expression.getEnd(),
      )
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      emitConditionJump()
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.emitOp(this.funcDef, Opcode.OP_insert2)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_field, atom)
      this.compiler.emitJump(this.funcDef, Opcode.OP_goto, endLabel)
      this.compiler.markLabel(this.funcDef, skipLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_nip)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }

    if (ts.isElementAccessExpression(node.left)) {
      if (!node.left.argumentExpression) {
        throw new Error('Element access requires an argument expression')
      }
      if ((node.left as ts.ElementAccessChain).questionDotToken) {
        throw new Error('Optional chaining cannot be used on assignment target')
      }
      this.context.visit(node.left.expression) // obj
      this.context.visit(node.left.argumentExpression) // prop
      this.compiler.emitOp(
        this.funcDef,
        Opcode.OP_get_array_el3,
        node.left.expression.getEnd(),
      )
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      emitConditionJump()
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.emitOp(this.funcDef, Opcode.OP_insert3)
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_array_el)
      this.compiler.emitJump(this.funcDef, Opcode.OP_goto, endLabel)
      this.compiler.markLabel(this.funcDef, skipLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_nip)
      this.compiler.emitOp(this.funcDef, Opcode.OP_nip)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }

    throw new Error('Unsupported logical assignment target')
  }

  visitBigIntLiteral(node: ts.BigIntLiteral) {
    if (!this.funcDef) {
      return
    }

    const text = node.text.replace('n', '')

    try {
      const val = BigInt(text)

      // Check if it fits in int32
      if (val >= -2147483648n && val <= 2147483647n) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_push_bigint_i32, node.getStart())
        this.compiler.emitU32(this.funcDef, Number(val))
      } else {
        // Large BigInts: add to cpool and push const
        let idx = -1
        // Check if already in cpool
        for (let i = 0; i < this.funcDef.cpool.length; i++) {
          if (this.funcDef.cpool[i] === val) {
            idx = i
            break
          }
        }
        if (idx === -1) {
          idx = this.funcDef.cpool.length
          this.funcDef.cpool.push(val)
        }

        if (idx < 256) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_push_const8, node.getStart())
          this.compiler.emitU8(this.funcDef, idx)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_push_const, node.getStart())
          this.compiler.emitU32(this.funcDef, idx)
        }
      }
    } catch (e) {
      throw new Error(`Invalid BigInt literal: ${text}`)
    }
  }

  visitBinaryExpression(node: ts.BinaryExpression) {
    if (!this.funcDef) {
      return
    }

    // Assignment: a = b
    if (node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      if (ts.isIdentifier(node.left)) {
        const varInfo = this.scopeManager.findVar(node.left.text, this.funcDef)

        this.context.visit(node.right)

        if (
          ts.isArrowFunction(node.right) ||
          ts.isFunctionExpression(node.right) ||
          ts.isClassExpression(node.right)
        ) {
          const atomId = this.compiler.addAtom(node.left.text)
          this.compiler.emitOp(this.funcDef, Opcode.OP_set_name)
          this.compiler.emitU32(this.funcDef, atomId)
        }

        this.emitStoreIdentifier(node.left, varInfo, true)
      } else if (ts.isPropertyAccessExpression(node.left)) {
        if ((node.left as ts.PropertyAccessChain).questionDotToken) {
          throw new Error('Optional chaining cannot be used on assignment target')
        }
        const atom = this.compiler.addAtom(node.left.name.text)
        this.context.visit(node.left.expression)
        this.context.visit(node.right)
        this.compiler.emitOp(this.funcDef, Opcode.OP_insert2)
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_field, atom)
      } else if (ts.isElementAccessExpression(node.left)) {
        if (!node.left.argumentExpression) {
          throw new Error('Element access requires an argument expression')
        }
        if ((node.left as ts.ElementAccessChain).questionDotToken) {
          throw new Error('Optional chaining cannot be used on assignment target')
        }

        this.context.visit(node.left.expression)
        this.context.visit(node.left.argumentExpression)
        this.context.visit(node.right)
        this.compiler.emitOp(this.funcDef, Opcode.OP_insert3)
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_array_el)
      }

      return
    }
    const compoundOpcode = this.getCompoundOpcode(node.operatorToken.kind)
    if (compoundOpcode) {
      this.emitCompoundAssignment(node, compoundOpcode)
      return
    }

    if (this.isLogicalAssignment(node.operatorToken.kind)) {
      this.emitLogicalAssignment(node)
      return
    }

    // Handle Logical Operators (&&, ||, ??)
    if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) { // &&
      const endLabel = this.compiler.createLabel(this.funcDef)
      this.context.visit(node.left)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, endLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }
    
    if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) { // ||
      const endLabel = this.compiler.createLabel(this.funcDef)
      this.context.visit(node.left)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitJump(this.funcDef, Opcode.OP_if_true, endLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }

    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) { // ??
      const endLabel = this.compiler.createLabel(this.funcDef)
      this.context.visit(node.left)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitOp(this.funcDef, Opcode.OP_is_undefined_or_null)
      this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, endLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }

    // Standard Binary Operators
    this.context.visit(node.left)
    this.context.visit(node.right)

    const opPos = node.operatorToken.getStart()

    switch (node.operatorToken.kind) {
      case ts.SyntaxKind.PlusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_add, opPos)
        break
      case ts.SyntaxKind.MinusToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_sub, opPos)
        break
      case ts.SyntaxKind.AsteriskToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_mul, opPos)
        break
      case ts.SyntaxKind.SlashToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_div, opPos)
        break
      case ts.SyntaxKind.PercentToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_mod, opPos)
        break
      case ts.SyntaxKind.LessThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_lt, opPos)
        break
      case ts.SyntaxKind.GreaterThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_gt, opPos)
        break
      case ts.SyntaxKind.LessThanEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_lte, opPos)
        break
      case ts.SyntaxKind.GreaterThanEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_gte, opPos)
        break
      case ts.SyntaxKind.EqualsEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_eq, opPos)
        break
      case ts.SyntaxKind.ExclamationEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_neq, opPos)
        break
      case ts.SyntaxKind.EqualsEqualsEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_strict_eq, opPos)
        break
      case ts.SyntaxKind.ExclamationEqualsEqualsToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_strict_neq, opPos)
        break
      case ts.SyntaxKind.AmpersandToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_and, opPos)
        break
      case ts.SyntaxKind.BarToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_or, opPos)
        break
      case ts.SyntaxKind.CaretToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_xor, opPos)
        break
      case ts.SyntaxKind.LessThanLessThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_shl, opPos)
        break
      case ts.SyntaxKind.GreaterThanGreaterThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_sar, opPos)
        break
      case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
        this.compiler.emitOp(this.funcDef, Opcode.OP_shr, opPos)
        break
      case ts.SyntaxKind.InKeyword:
        this.compiler.emitOp(this.funcDef, Opcode.OP_in, opPos)
        break
      case ts.SyntaxKind.InstanceOfKeyword:
        this.compiler.emitOp(this.funcDef, Opcode.OP_instanceof, opPos)
        break
      default:
        // throw new Error(`Unsupported binary operator: ${ts.tokenToString(node.operatorToken.kind)}`)
    }
  }

  visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
    if (!this.funcDef) {
      return
    }

    const operandPos = node.operand.getStart()
    const opPos = node.getStart()

    // Handle update expressions (++i, --i)
    if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken) {
      if (ts.isIdentifier(node.operand)) {
        const name = node.operand.text
        const varInfo = this.scopeManager.findVar(name, this.funcDef)
        
        if (varInfo) {
          if (varInfo.type === 'closure') {
            // Closure var
            const idx = varInfo.idx
            // Get value
            if (varInfo.isLexical) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, operandPos)
              this.compiler.emitU16(this.funcDef, idx)
            } else {
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, operandPos)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, operandPos)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, operandPos)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, operandPos)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref, operandPos)
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
            
            // Inc/Dec (the only op that should carry the source position)
            if (node.operator === ts.SyntaxKind.PlusPlusToken) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_inc, opPos)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_dec, opPos)
            }
            
            // Put value
            // Result is new value (already on stack from inc/dec)
            // put_var_ref consumes it.
            // So we need to dup before put if we want to return it.
            this.compiler.emitOp(this.funcDef, Opcode.OP_dup)

            if (varInfo.isLexical) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref_check)
              this.compiler.emitU16(this.funcDef, idx)
            } else {
              if (idx === 0) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
              } else if (idx === 1) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
              } else if (idx === 2) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
              } else if (idx === 3) {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
              } else {
                this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref)
                this.compiler.emitU16(this.funcDef, idx)
              }
            }
          } else {
            // Local
            const varIdx = varInfo.idx
            const idx = this.funcDef.vars[varIdx].localIdx
            
            this.compiler.pendingSourcePos = operandPos
            this.compiler.emitGetLoc(this.funcDef, idx)
            
            if (node.operator === ts.SyntaxKind.PlusPlusToken) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_inc, opPos)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_dec, opPos)
            }
            
            this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
            this.compiler.emitPutLoc(this.funcDef, idx)
          }
        }
      }
      
      return
    }

    // Optimization for -1
    if (node.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(node.operand) && node.operand.text === '1') {
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_minus1, opPos)
      return
    }

    this.context.visit(node.operand)

    if (node.operator === ts.SyntaxKind.ExclamationToken) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_lnot)
    } else if (node.operator === ts.SyntaxKind.TildeToken) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_not, opPos)
    } else if (node.operator === ts.SyntaxKind.PlusToken) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_plus, opPos)
    } else if (node.operator === ts.SyntaxKind.MinusToken) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_neg, opPos)
    } else if (node.operator === ts.SyntaxKind.TypeOfKeyword) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_typeof)
    } else if (node.operator === ts.SyntaxKind.VoidKeyword) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
    }
  }

  visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
    if (!this.funcDef) {
      return
    }

    const operatorLength = node.operator === ts.SyntaxKind.PlusPlusToken || node.operator === ts.SyntaxKind.MinusMinusToken ? 2 : 1
    const opPos = node.getEnd() - operatorLength
    const operandPos = node.operand.getStart()

    if (ts.isIdentifier(node.operand)) {
      const name = node.operand.text
      const varInfo = this.scopeManager.findVar(name, this.funcDef)
      
      if (varInfo) {
        if (varInfo.type === 'closure') {
          const idx = varInfo.idx
          // Get value
          if (varInfo.isLexical) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check, operandPos)
            this.compiler.emitU16(this.funcDef, idx)
          } else {
            if (idx === 0) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref0, operandPos)
            } else if (idx === 1) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref1, operandPos)
            } else if (idx === 2) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref2, operandPos)
            } else if (idx === 3) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref3, operandPos)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref, operandPos)
              this.compiler.emitU16(this.funcDef, idx)
            }
          }
          
          // Postfix: return OLD value
          if (node.operator === ts.SyntaxKind.PlusPlusToken) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_post_inc, opPos)
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_post_dec, opPos)
          }
          
          // Put new value
          if (varInfo.isLexical) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref_check)
            this.compiler.emitU16(this.funcDef, idx)
          } else {
            if (idx === 0) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref0)
            } else if (idx === 1) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref1)
            } else if (idx === 2) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref2)
            } else if (idx === 3) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref3)
            } else {
              this.compiler.emitOp(this.funcDef, Opcode.OP_put_var_ref)
              this.compiler.emitU16(this.funcDef, idx)
            }
          }
        } else {
          // Local
          const varIdx = varInfo.idx
          const idx = this.funcDef.vars[varIdx].localIdx
          
          this.compiler.pendingSourcePos = operandPos
          this.compiler.emitGetLoc(this.funcDef, idx)
          
          if (node.operator === ts.SyntaxKind.PlusPlusToken) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_post_inc, opPos)
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_post_dec, opPos)
          }
          
          this.compiler.emitPutLoc(this.funcDef, idx)
        }
      }
    }
  }

  visitConditionalExpression(node: ts.ConditionalExpression) {
    if (!this.funcDef) {
      return
    }

    const falseLabel = this.compiler.createLabel(this.funcDef)
    const endLabel = this.compiler.createLabel(this.funcDef)

    this.context.visit(node.condition)
    this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, falseLabel)

    this.context.visit(node.whenTrue)
    this.compiler.emitJump(this.funcDef, Opcode.OP_goto, endLabel)

    this.compiler.markLabel(this.funcDef, falseLabel)
    this.context.visit(node.whenFalse)
    this.compiler.markLabel(this.funcDef, endLabel)
  }

  visitCallExpression(node: ts.CallExpression, isTailCall: boolean = false, tailCallPos: number = -1) {
    if (!this.funcDef) {
      return
    }

    const optionalContexts: Array<[OptionalChainContext | null, boolean]> = []
    const trackContext = (
      info: [OptionalChainContext | null, boolean],
    ): [OptionalChainContext | null, boolean] => {
      if (info[1]) {
        optionalContexts.push(info)
      }
      return info
    }
    const [callCtx] = trackContext(this.enterOptionalChain(node))

    const finalizeOptionalContexts = () => {
      for (const [ctx, created] of optionalContexts) {
        this.leaveOptionalChain(ctx, created)
      }
    }

    try {
      // Handle super() call
      if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
        // 1. Get constructor
        // In derived constructor, var 0 is 'this.active_func'
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_super) // super proto
        
        // 2. Push new.target
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check)
        this.compiler.emitU16(this.funcDef, 1) // var 1 is new.target
        
        // 3. Push args
        for (const arg of node.arguments) {
          this.context.visit(arg)
        }
        
        // 4. Call constructor
        this.compiler.emitOp(this.funcDef, Opcode.OP_call_constructor)
        this.compiler.emitU16(this.funcDef, node.arguments.length)
        
        // 5. Store result in 'this'
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
        
        const thisVar = this.context.scopeManager.findVar('this', this.funcDef)
        const thisIdx = thisVar && thisVar.localIdx !== undefined ? thisVar.localIdx : 0
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc_check_init)
        this.compiler.emitU16(this.funcDef, thisIdx)
        
        // 6. Initialize fields
        if (this.funcDef.fieldsInitClosureIdx !== -1) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check)
          this.compiler.emitU16(this.funcDef, this.funcDef.fieldsInitClosureIdx)
          
          const skipInitLabel = this.compiler.createLabel(this.funcDef)
          this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
          this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, skipInitLabel)
          
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check) // get 'this' (checked)
          this.compiler.emitU16(this.funcDef, 2) // var 2
          
          this.compiler.emitOp(this.funcDef, Opcode.OP_swap)
          this.compiler.emitOp(this.funcDef, Opcode.OP_call_method)
          this.compiler.emitU16(this.funcDef, 0)
          
          this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
          
          this.compiler.markLabel(this.funcDef, skipInitLabel)
          this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
        }
          
        return
      }

      let isMethodCall = false
      const argCount = node.arguments.length

      this.registerOptionalChild(node.expression as ts.Expression, callCtx)

      if (ts.isPropertyAccessExpression(node.expression)) {
        const propExpr = node.expression
        // Method call: obj.method(...)
        if (propExpr.expression.kind === ts.SyntaxKind.SuperKeyword) {
            // super.method(...)
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0) // this
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1) // <home_object>
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_super)
          
          const propName = propExpr.name.text
          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, this.compiler.addAtom(propName))
          
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_array_el)
          
          for (const arg of node.arguments) {
            this.context.visit(arg)
          }
          
          this.compiler.emitOp(this.funcDef, Opcode.OP_call_method)
          this.compiler.emitU16(this.funcDef, argCount)
          this.compiler.adjustStack(this.funcDef, -(argCount + 1)) // TODO: Verify stack adjustment
          
          return
        }

        const [propCtx] = trackContext(
          this.enterOptionalChain(propExpr as ts.Expression),
        )
        this.registerOptionalChild(propExpr.expression as ts.Expression, propCtx)

        // 1. Visit object
        this.context.visit(propExpr.expression)

        // Optional guard for obj?.method
        if (this.hasQuestionDot(propExpr)) {
          this.emitOptionalChainGuard(propCtx, 1)
        }
        
        // 2. Emit get_field2 (pushes this + func)
        const propName = propExpr.name.text
        const atom = this.compiler.addAtom(propName)
        // Use end of object expression (position of dot)
        this.compiler.emitAtomOp(
          this.funcDef,
          Opcode.OP_get_field2,
          atom,
          propExpr.expression.getEnd(),
        )
        
        isMethodCall = true

        // Guard for obj.method?.()
        if (callCtx && this.hasQuestionDot(node)) {
          this.emitOptionalChainGuard(callCtx, 2)
        }
      } else if (ts.isElementAccessExpression(node.expression)) {
        const elementExpr = node.expression
        if (!elementExpr.argumentExpression) {
          throw new Error('Element access requires an argument expression')
        }

        if (elementExpr.expression.kind === ts.SyntaxKind.SuperKeyword) {
          // super[expr](...)
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0)
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1)
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_super)

          this.context.visit(elementExpr.argumentExpression)
          this.compiler.emitOp(this.funcDef, Opcode.OP_get_array_el)

          for (const arg of node.arguments) {
            this.context.visit(arg)
          }

          this.compiler.emitOp(this.funcDef, Opcode.OP_call_method)
          this.compiler.emitU16(this.funcDef, argCount)
          this.compiler.adjustStack(this.funcDef, -(argCount + 1))

          return
        }

        const [elementCtx] = trackContext(
          this.enterOptionalChain(elementExpr as ts.Expression),
        )
        this.registerOptionalChild(
          elementExpr.expression as ts.Expression,
          elementCtx,
        )

        this.context.visit(elementExpr.expression)

        if (this.hasQuestionDot(elementExpr)) {
          this.emitOptionalChainGuard(elementCtx, 1)
        }

        this.context.visit(elementExpr.argumentExpression)
        this.compiler.emitOp(
          this.funcDef,
          Opcode.OP_get_array_el2,
          elementExpr.expression.getEnd(),
        )

        isMethodCall = true

        if (callCtx && this.hasQuestionDot(node)) {
          this.emitOptionalChainGuard(callCtx, 2)
        }
      } else {
        // Regular call: func(...)
        this.context.visit(node.expression)

        if (callCtx && this.hasQuestionDot(node)) {
          this.emitOptionalChainGuard(callCtx, 1)
        }
      }

      // 3. Visit arguments
      for (const arg of node.arguments) {
        this.context.visit(arg)
      }

      // 4. Emit call
      if (isMethodCall) {
        // Use end of property access (position of open parenthesis)
        if (isTailCall) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_tail_call_method, tailCallPos !== -1 ? tailCallPos : node.expression.getEnd())
          this.compiler.emitU16(this.funcDef, argCount)
          this.compiler.adjustStack(this.funcDef, -argCount)
        } else {
          this.compiler.emitOp(this.funcDef, Opcode.OP_call_method, node.expression.getEnd())
          this.compiler.emitU16(this.funcDef, argCount)
          this.compiler.adjustStack(this.funcDef, -argCount)
        }
      } else {
        if (isTailCall) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_tail_call, tailCallPos !== -1 ? tailCallPos : node.expression.getEnd())
          this.compiler.emitU16(this.funcDef, argCount)
          this.compiler.adjustStack(this.funcDef, -(argCount + 1))
        } else {
          if (argCount === 0) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_call0, node.expression.getEnd())
          } else if (argCount === 1) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_call1, node.expression.getEnd())
            this.compiler.adjustStack(this.funcDef, -1)
          } else if (argCount === 2) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_call2, node.expression.getEnd())
            this.compiler.adjustStack(this.funcDef, -2)
          } else if (argCount === 3) {
            this.compiler.emitOp(this.funcDef, Opcode.OP_call3, node.expression.getEnd())
            this.compiler.adjustStack(this.funcDef, -3)
          } else {
            this.compiler.emitOp(this.funcDef, Opcode.OP_call, node.expression.getEnd())
            this.compiler.emitU16(this.funcDef, argCount)
            this.compiler.adjustStack(this.funcDef, -(argCount + 1))
          }
        }
      }
    } finally {
      finalizeOptionalContexts()
    }
  }

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    if (!this.funcDef) {
      return
    }

    this.withOptionalChain(node, ctx => {
      this.registerOptionalChild(node.expression as ts.Expression, ctx)
      this.context.visit(node.expression)
      if (this.hasQuestionDot(node)) {
        this.emitOptionalChainGuard(ctx, 1)
      }
      const propName = node.name.text
      const atom = this.compiler.addAtom(propName)
      this.compiler.emitAtomOp(
        this.funcDef!,
        Opcode.OP_get_field,
        atom,
        node.expression.getEnd(),
      )
    })
  }

  visitElementAccessExpression(node: ts.ElementAccessExpression) {
    if (!this.funcDef) {
      return
    }

    this.withOptionalChain(node, ctx => {
      this.registerOptionalChild(node.expression as ts.Expression, ctx)
      this.context.visit(node.expression)
      if (this.hasQuestionDot(node)) {
        this.emitOptionalChainGuard(ctx, 1)
      }
      if (!node.argumentExpression) {
        throw new Error('Element access requires an argument expression')
      }
      this.context.visit(node.argumentExpression)
      this.compiler.emitOp(
        this.funcDef!,
        Opcode.OP_get_array_el,
        node.expression.getEnd(),
      )
    })
  }

  visitArrayLiteralExpression(node: ts.ArrayLiteralExpression) {
    if (!this.funcDef) {
      return
    }

    const hasSpread = node.elements.some(e => ts.isSpreadElement(e))

    if (hasSpread) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_array_from)
      this.compiler.emitU16(this.funcDef, 0)
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_0) // Index counter

      for (const element of node.elements) {
        if (ts.isSpreadElement(element)) {
          this.context.visit(element.expression)
          this.compiler.emitOp(this.funcDef, Opcode.OP_append)
        } else {
          this.context.visit(element)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_array_el)
          this.compiler.emitOp(this.funcDef, Opcode.OP_inc)
          // Note: OP_define_array_el seems to keep the index on stack (or peek it)
          // and OP_inc increments it for the next element.
        }
      }
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // Drop index counter
    } else {
      for (const element of node.elements) {
        this.context.visit(element)
      }
      this.compiler.emitOp(this.funcDef, Opcode.OP_array_from)
      this.compiler.emitU16(this.funcDef, node.elements.length)
      this.compiler.adjustStack(this.funcDef, -node.elements.length)
    }
  }

  visitObjectLiteralExpression(node: ts.ObjectLiteralExpression) {
    if (!this.funcDef) {
      return
    }

    this.compiler.emitOp(this.funcDef, Opcode.OP_object)
    
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
          this.context.visit(prop.initializer)
          const name = prop.name.text
          const atom = this.compiler.addAtom(name)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_field)
          this.compiler.emitU32(this.funcDef, atom)
        } else if (ts.isComputedPropertyName(prop.name)) {
          this.context.visit(prop.name.expression)
          this.compiler.emitOp(this.funcDef, Opcode.OP_to_propkey)
          this.context.visit(prop.initializer)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_array_el)
          this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
        }
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        const name = prop.name.text
        // Visit identifier to get value
        this.context.visit(prop.name)
        const atom = this.compiler.addAtom(name)
        this.compiler.emitOp(this.funcDef, Opcode.OP_define_field)
        this.compiler.emitU32(this.funcDef, atom)
      } else if (ts.isSpreadAssignment(prop)) {
        this.context.visit(prop.expression)
        this.compiler.emitOp(this.funcDef, Opcode.OP_null)

        const targetSlot = 2 // target object sits two entries below TOS
        const sourceSlot = 1
        const excludeSlot = 0
        const copyMask = (targetSlot & 0b11) | ((sourceSlot & 0b111) << 2) | ((excludeSlot & 0b111) << 5)

        this.compiler.emitOp(this.funcDef, Opcode.OP_copy_data_properties)
        this.compiler.emitU8(this.funcDef, copyMask)

        this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // drop exclude list
        this.compiler.emitOp(this.funcDef, Opcode.OP_drop) // drop spread source
      } else if (
        ts.isMethodDeclaration(prop) ||
        ts.isGetAccessorDeclaration(prop) ||
        ts.isSetAccessorDeclaration(prop)
      ) {
        // 方法/访问器：先编译名称（若计算属性），再编译闭包，最后按 QuickJS 规则发射 define_method

        if (ts.isComputedPropertyName(prop.name)) {
          this.context.visit(prop.name.expression)
          this.compiler.emitOp(this.funcDef, Opcode.OP_to_propkey)
        }

        this.context.visit(prop)

        let flags = DefineMethodFlag.Method | DefineMethodFlag.Enumerable
        if (ts.isGetAccessorDeclaration(prop)) {
          flags = DefineMethodFlag.Getter | DefineMethodFlag.Enumerable
        } else if (ts.isSetAccessorDeclaration(prop)) {
          flags = DefineMethodFlag.Setter | DefineMethodFlag.Enumerable
        }

        if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
          const name = prop.name.text
          const atom = this.compiler.addAtom(name)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_method)
          this.compiler.emitU32(this.funcDef, atom)
          this.compiler.emitU8(this.funcDef, flags)
        } else if (ts.isComputedPropertyName(prop.name)) {
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_method_computed)
          this.compiler.emitU8(this.funcDef, flags)
        }
      }
    }
  }

  visitNewExpression(node: ts.NewExpression) {
    if (!this.funcDef) {
      return
    }

    this.context.visit(node.expression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
    
    if (node.arguments) {
      for (const arg of node.arguments) {
        this.context.visit(arg)
      }
    }
    
    this.compiler.emitOp(this.funcDef, Opcode.OP_call_constructor)
    this.compiler.emitU16(this.funcDef, node.arguments ? node.arguments.length : 0)
  }

  visitVoidExpression(node: ts.VoidExpression) {
    if (!this.funcDef) {
      return
    }

    // Optimization: void literal -> undefined (skip evaluation and drop)
    if (
      ts.isNumericLiteral(node.expression) || 
      ts.isStringLiteral(node.expression) ||
      node.expression.kind === ts.SyntaxKind.NullKeyword ||
      node.expression.kind === ts.SyntaxKind.TrueKeyword ||
      node.expression.kind === ts.SyntaxKind.FalseKeyword
    ) {
      this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
      return
    }

    this.context.visit(node.expression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
    this.compiler.emitOp(this.funcDef, Opcode.OP_undefined)
  }

  visitDeleteExpression(node: ts.DeleteExpression) {
    if (!this.funcDef) {
      return
    }
    
    if (ts.isPropertyAccessExpression(node.expression)) {
      this.context.visit(node.expression.expression) // obj
      const propName = node.expression.name.text
      const atom = this.compiler.addAtom(propName)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, atom, node.expression.expression.getEnd())
      this.compiler.emitOp(this.funcDef, Opcode.OP_delete, node.expression.expression.getEnd())
    } else if (ts.isElementAccessExpression(node.expression)) {
      this.context.visit(node.expression.expression) // obj
      this.context.visit(node.expression.argumentExpression) // prop
      // OP_delete expects value, key. No need for to_propkey if it's already a value?
      // QuickJS emits to_propkey usually?
      // Let's assume yes for safety or check WASM later.
      // this.compiler.emitOp(this.funcDef, Opcode.OP_to_propkey) 
      this.compiler.emitOp(this.funcDef, Opcode.OP_delete, node.expression.expression.getEnd())
    } else if (ts.isIdentifier(node.expression)) {
      // delete var
      const name = node.expression.text
      const atom = this.compiler.addAtom(name)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_delete_var, atom, node.getStart())
    } else {
      // delete expr -> true (if not a reference)
      this.context.visit(node.expression)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.compiler.emitOp(this.funcDef, Opcode.OP_push_true)
    }
  }

  visitTypeOfExpression(node: ts.TypeOfExpression) {
    if (!this.funcDef) {
      return
    }

    this.context.visit(node.expression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_typeof)
  }
}
