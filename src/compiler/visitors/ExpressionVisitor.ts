import * as ts from 'typescript'
import { Compiler } from '../Compiler'
import { FunctionDef, JSVarKind } from '../FunctionDef'
import { Opcode } from '../../env'
import { ScopeManager } from '../ScopeManager'
import { LabelManager } from '../LabelManager'
import { CompilerContext } from '../CompilerContext'

export class ExpressionVisitor {
  constructor(private context: CompilerContext) {}

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
      // 1. Evaluate RHS
      this.context.visit(node.right)

      // 2. Assign to LHS
      if (ts.isIdentifier(node.left)) {
        const name = node.left.text
        const varInfo = this.scopeManager.findVar(name, this.funcDef)
        
        if (varInfo) {
          // Emit OP_set_name for named function expressions/arrows assigned to variables
          if (
            ts.isArrowFunction(node.right) || 
            ts.isFunctionExpression(node.right) || 
            ts.isClassExpression(node.right)
          ) {
            const atomId = this.compiler.addAtom(name)
            this.compiler.emitOp(this.funcDef, Opcode.OP_set_name)
            this.compiler.emitU32(this.funcDef, atomId)
          }

          if (varInfo.type === 'closure') {
            const idx = varInfo.idx
            // Duplicate value for result of assignment expression
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
            
            // Duplicate value for result of assignment expression
            this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
            
            this.compiler.emitPutLoc(this.funcDef, idx)
          }
        } else {
          // Global
          const atomId = this.compiler.addAtom(name)
          this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
          this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_var, atomId)
        }
      } else if (ts.isPropertyAccessExpression(node.left)) {
        // obj.prop = val
        // Stack: [val] (RHS visited)
        
        // 1. Visit obj
        this.context.visit(node.left.expression)
        // Stack: [val, obj]
        
        // 2. Swap
        this.compiler.emitOp(this.funcDef, Opcode.OP_swap)
        // Stack: [obj, val]
        
        // 3. Duplicate val for result
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
        // Stack: [obj, val, val]
        
        // 4. Rotate to get [val, obj, val]
        // A B C -> C A B
        this.compiler.emitOp(this.funcDef, Opcode.OP_rot3r)
        // Stack: [val, obj, val]
        
        // 5. Put field
        const propName = node.left.name.text
        const atom = this.compiler.addAtom(propName)
        this.compiler.emitAtomOp(this.funcDef, Opcode.OP_put_field, atom)
        // Stack: [val]
      } else if (ts.isElementAccessExpression(node.left)) {
        // obj[key] = val
        // 1. Visit obj
        this.context.visit(node.left.expression)
        // 2. Visit key
        this.context.visit(node.left.argumentExpression)
        // 3. Visit val (RHS) - wait, we visited RHS at top!
      }

      return
    }
    
    // Handle Compound Assignment (+=, -=, etc.)
    // ... (Logic to be moved)

    // Handle Logical Operators (&&, ||, ??)
    if (node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) { // &&
      const endLabel = this.compiler.newLabel(this.funcDef)
      this.context.visit(node.left)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitJump(this.funcDef, Opcode.OP_if_false, endLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }
    
    if (node.operatorToken.kind === ts.SyntaxKind.BarBarToken) { // ||
      const endLabel = this.compiler.newLabel(this.funcDef)
      this.context.visit(node.left)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitJump(this.funcDef, Opcode.OP_if_true, endLabel)
      this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
      this.context.visit(node.right)
      this.compiler.markLabel(this.funcDef, endLabel)
      return
    }

    if (node.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) { // ??
      const endLabel = this.compiler.newLabel(this.funcDef)
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

    const falseLabel = this.compiler.newLabel(this.funcDef)
    const endLabel = this.compiler.newLabel(this.funcDef)

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
        
        const skipInitLabel = this.compiler.newLabel(this.funcDef)
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

    if (ts.isPropertyAccessExpression(node.expression)) {
      // Method call: obj.method(...)
      if (node.expression.expression.kind === ts.SyntaxKind.SuperKeyword) {
          // super.method(...)
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0) // this
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1) // <home_object>
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_super)
        
        const propName = node.expression.name.text
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

      // 1. Visit object
      this.context.visit(node.expression.expression)
      
      // 2. Emit get_field2 (pushes this + func)
      const propName = node.expression.name.text
      const atom = this.compiler.addAtom(propName)
      // Use end of object expression (position of dot)
      this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_field2, atom, node.expression.expression.getEnd())
      
      isMethodCall = true
    } else {
      // Regular call: func(...)
      this.context.visit(node.expression)
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
  }

  visitPropertyAccessExpression(node: ts.PropertyAccessExpression) {
    if (!this.funcDef) {
      return
    }
    
    this.context.visit(node.expression)
    const propName = node.name.text
    const atom = this.compiler.addAtom(propName)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_get_field, atom, node.expression.getEnd())
  }

  visitElementAccessExpression(node: ts.ElementAccessExpression) {
    if (!this.funcDef) {
      return
    }
    
    this.context.visit(node.expression)
    this.context.visit(node.argumentExpression)
    this.compiler.emitOp(this.funcDef, Opcode.OP_get_array_el, node.expression.getEnd())
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
      } else if (ts.isMethodDeclaration(prop)) {
        // Method definition
        this.context.visit(prop)
        
        if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
          const name = prop.name.text
          const atom = this.compiler.addAtom(name)
          this.compiler.emitOp(this.funcDef, Opcode.OP_define_method)
          this.compiler.emitU32(this.funcDef, atom)
          this.compiler.emitU8(this.funcDef, 0) // flags: 0=method
        } else {
           // Computed property name for method?
           // QuickJS supports OP_define_method with computed name?
           // OP_define_method takes atom.
           // If computed, we might need OP_define_array_el or similar, but that's for values.
           // For methods, maybe we need to define it as a property with value=closure.
           // But methods have home object set.
           
           // For now, only support non-computed names for methods in object literals
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
