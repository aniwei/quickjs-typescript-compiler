          }
        }
      }
    })
  }

  hasSideEffects(node: ts.Node): boolean {
    if (ts.isNumericLiteral(node) || ts.isStringLiteral(node) || node.kind === ts.SyntaxKind.NullKeyword || node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) {
      return false
    }
    return true
  }

  visit(node: ts.Node) {
    // console.log('VISIT:', node.kind)
    // if (node.kind === 11) console.log('visit called with StringLiteral')
    switch (node.kind) {
      case ts.SyntaxKind.SourceFile:
        this.visitSourceFile(node as ts.SourceFile)
        break
      case ts.SyntaxKind.FunctionDeclaration:
        this.visitFunctionDeclaration(node as ts.FunctionDeclaration)
        break
      case ts.SyntaxKind.LabeledStatement:
        this.visitLabeledStatement(node as ts.LabeledStatement)
        break
      case ts.SyntaxKind.Block:
        this.visitBlock(node as ts.Block)
        break
      case ts.SyntaxKind.IfStatement:
        this.visitIfStatement(node as ts.IfStatement)
        break
      case ts.SyntaxKind.WhileStatement:
        this.visitWhileStatement(node as ts.WhileStatement)
        break
      case ts.SyntaxKind.DoStatement:
        this.visitDoStatement(node as ts.DoStatement)
        break
      case ts.SyntaxKind.ForStatement:
        this.visitForStatement(node as ts.ForStatement)
        break
      case ts.SyntaxKind.ForOfStatement:
        this.visitForOfStatement(node as ts.ForOfStatement)
        break
      case ts.SyntaxKind.ForInStatement:
        this.visitForInStatement(node as ts.ForInStatement)
        break
      case ts.SyntaxKind.SwitchStatement:
        this.visitSwitchStatement(node as ts.SwitchStatement)
        break
      case ts.SyntaxKind.BreakStatement:
        this.visitBreakStatement(node as ts.BreakStatement)
        break
      case ts.SyntaxKind.ContinueStatement:
        this.visitContinueStatement(node as ts.ContinueStatement)
        break
      case ts.SyntaxKind.ReturnStatement:
        this.visitReturnStatement(node as ts.ReturnStatement)
        break
      case ts.SyntaxKind.ThrowStatement:
        this.visitThrowStatement(node as ts.ThrowStatement)
        break
      case ts.SyntaxKind.TryStatement:
        this.visitTryStatement(node as ts.TryStatement)
        break
      case ts.SyntaxKind.VariableStatement:
        this.visitVariableStatement(node as ts.VariableStatement)
        break
      case ts.SyntaxKind.ClassDeclaration:
        this.visitClassDeclaration(node as ts.ClassDeclaration)
        break
      case ts.SyntaxKind.BinaryExpression:
        this.visitBinaryExpression(node as ts.BinaryExpression)
        break
      case ts.SyntaxKind.ArrowFunction:
        this.visitArrowFunction(node as ts.ArrowFunction)
        break
      case ts.SyntaxKind.Identifier:
        this.visitIdentifier(node as ts.Identifier)
        break
      case ts.SyntaxKind.ThisKeyword:
        this.visitThisKeyword(node as ts.ThisExpression)
        break
      case ts.SyntaxKind.ThisKeyword:
        this.visitThisKeyword(node as ts.ThisExpression)
        break
      case ts.SyntaxKind.DeleteExpression:
        this.visitDeleteExpression(node as ts.DeleteExpression)
        break
      case ts.SyntaxKind.ExpressionStatement:
        const expr = (node as ts.ExpressionStatement).expression
        if (this.hasSideEffects(expr)) {
          this.compiler.pendingSourcePos = node.getStart()
          this.visit(expr)
          
          if (this.funcDef) {
            // Check if last op was tail_call
            let lastOp = 0
            if (this.funcDef.byteCode.size > 0) {
               if (this.funcDef.lastOpcodePos !== -1 && this.funcDef.lastOpcodePos < this.funcDef.byteCode.size) {
                  lastOp = this.funcDef.byteCode.buffer[this.funcDef.lastOpcodePos]
               } else {
                  lastOp = this.funcDef.byteCode.buffer[this.funcDef.byteCode.size - 1]
               }
            }
            
            let shouldDrop = true
            if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
               if (ts.isPropertyAccessExpression(expr.left)) {
                  shouldDrop = false
               }
            }

            if (shouldDrop && lastOp !== Opcode.OP_tail_call) {
              this.compiler.emitOp(this.funcDef, Opcode.OP_drop)
            }
          }
        }
        break
      case ts.SyntaxKind.StringLiteral:
        this.visitStringLiteral(node as ts.StringLiteral)
        break
      case ts.SyntaxKind.CallExpression:
        this.visitCallExpression(node as ts.CallExpression)
        break
      case ts.SyntaxKind.ObjectLiteralExpression:
        this.visitObjectLiteralExpression(node as ts.ObjectLiteralExpression)
        break
      case ts.SyntaxKind.ArrayLiteralExpression:
        this.visitArrayLiteralExpression(node as ts.ArrayLiteralExpression)
        break
      case ts.SyntaxKind.PropertyAccessExpression:
        this.visitPropertyAccessExpression(node as ts.PropertyAccessExpression)
        break
      case ts.SyntaxKind.ElementAccessExpression:
        this.visitElementAccessExpression(node as ts.ElementAccessExpression)
        break
      case ts.SyntaxKind.NullKeyword:
        this.visitNullKeyword(node)
        break
      case ts.SyntaxKind.TrueKeyword:
        this.visitTrueKeyword(node)
        break
      case ts.SyntaxKind.FalseKeyword:
        this.visitFalseKeyword(node)
        break
      case ts.SyntaxKind.NumericLiteral:
        this.visitNumericLiteral(node as ts.NumericLiteral)
        break
      case ts.SyntaxKind.ConditionalExpression:
        this.visitConditionalExpression(node as ts.ConditionalExpression)
        break
      case ts.SyntaxKind.PostfixUnaryExpression:
        this.visitPostfixUnaryExpression(node as ts.PostfixUnaryExpression)
        break
      case ts.SyntaxKind.PrefixUnaryExpression:
        this.visitPrefixUnaryExpression(node as ts.PrefixUnaryExpression)
        break
      case ts.SyntaxKind.TypeOfExpression:
        this.visitTypeOfExpression(node as ts.TypeOfExpression)
        break
      case ts.SyntaxKind.VoidExpression:
        this.visitVoidExpression(node as ts.VoidExpression)
        break
      default:
        console.warn('Unhandled node kind:', node.kind)
        break
    }
  }

  visitStringLiteral(node: ts.StringLiteral) {
    // console.log('Visiting StringLiteral:', node.text)
    if (!this.funcDef) {
      // console.log('funcDef is null!')
      return
    }
    const atom = this.compiler.addAtom(node.text)
    this.compiler.emitAtomOp(this.funcDef, Opcode.OP_push_atom_value, atom)
  }

  visitCallExpression(node: ts.CallExpression, isTailCall: boolean = false, tailCallPos: number = -1) {
    const prevNode = this.currentNode
    this.currentNode = node
    if (!this.funcDef) {
      this.currentNode = prevNode
      return
    }
    
    // Handle super() call
    if (node.expression.kind === ts.SyntaxKind.SuperKeyword) {
      // ... (rest of super handling)
      // Super call cannot be tail call (it's a constructor call)
      // ...

      // 1. Push this.active_func (var 0)
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc0)
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_super)
      
      // 2. Push new.target (var 1)
      this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc1)
      
      // 3. Visit arguments
      for (const arg of node.arguments) {
        this.visit(arg)
      }
      
      // 4. Emit call_constructor
      this.compiler.emitOp(this.funcDef, Opcode.OP_call_constructor)
      this.compiler.emitU16(this.funcDef, node.arguments.length)
      
      // 5. Store result to 'this' (var 2)
      this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
      this.compiler.emitOp(this.funcDef, Opcode.OP_put_loc_check_init)
      this.compiler.emitU16(this.funcDef, 2) // this
      
      // 6. Initialize fields
      const fieldsInitNameCtor = '<class_fields_init>'
      const fieldsInitAtom = this.compiler.addAtom(fieldsInitNameCtor)
      const closureIdx = this.funcDef.closureVar.findIndex(cv => cv.varName === fieldsInitAtom)
        
      if (closureIdx !== -1) {
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_var_ref_check)
        this.compiler.emitU16(this.funcDef, closureIdx)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_dup)
        this.compiler.emitOp(this.funcDef, Opcode.OP_if_false8)
        const jumpPos = this.funcDef.byteCode.size
        this.compiler.emitU8(this.funcDef, 0)
        
        this.compiler.emitOp(this.funcDef, Opcode.OP_get_loc_check) // get 'this' (checked)
        this.compiler.emitU16(this.funcDef, 2) // var 2
