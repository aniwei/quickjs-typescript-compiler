import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
import { Opcode, FunctionKind, JSMode } from '../../env'
import { FunctionDef, JSVarKind } from '../FunctionDef'

export class FunctionVisitor {
  private context: CompilerContext
  private hoisted: Map<ts.FunctionDeclaration, { fd: FunctionDef, childIdx: number }> = new Map()

  constructor(context: CompilerContext) {
    this.context = context
  }

  visitFunctionDeclaration(node: ts.FunctionDeclaration) {
    const { compiler, scopeManager, labelManager, funcDef } = this.context
    if (!funcDef) {
      return
    }
    
    const savedLoopStack = labelManager.currentLoopStack
    const savedPendingLabels = labelManager.currentPendingLabels
    labelManager.currentLoopStack = []
    labelManager.currentPendingLabels = []

    const parentFd = funcDef
    const name = node.name?.text
    if (!name) {
      throw new Error('Function declaration must have a name')
    }

    // 若已在 hoist 阶段创建，直接复用
    let hoisted = this.hoisted.get(node)

    if (!hoisted) {
      // 定义 lexical 变量（对应 QuickJS define_var）
      let varInfo = scopeManager.findVar(name, parentFd)
      if (!varInfo) {
        const currentScope = scopeManager.currentScope
        const scopeLevel = scopeManager.stackDepth - parentFd.scopeLevel - 1
        const varIdx = compiler.addVar(parentFd, name, false, true, scopeLevel, JSVarKind.JS_VAR_FUNCTION_DECL)
        currentScope.vars.set(name, {
          type: 'local',
          idx: varIdx,
          isLexical: true,
          isConst: false
        })
        varInfo = currentScope.vars.get(name)!
      }

      const fd = new FunctionDef(parentFd)
      fd.scopeLevel = scopeManager.stackDepth
      fd.funcName = compiler.addAtom(name)
      fd.jsMode = JSMode.JS_MODE_STRICT
      fd.funcKind = FunctionKind.JS_FUNC_NORMAL
      fd.filename = parentFd.filename
      fd.hasDebug = true
      fd.sourcePos = node.getStart()
      fd.lineNumberLast = fd.sourcePos
      fd.lineNumberLastPc = 0
      fd.argumentsAllowed = true
      fd.hasPrototype = true
      fd.hasSimpleParameterList = true
      fd.newTargetAllowed = true

      for (let i = 0; i < node.parameters.length; i++) {
        const param = node.parameters[i]
        if (ts.isIdentifier(param.name)) {
          compiler.addArg(fd, param.name.text)
        }
      }

      const childIdx = compiler.addChild(parentFd, fd)
      // 记录 func_pool_idx 供后续丢弃 fclosure 或赋值
      const latestVar = scopeManager.findVar(name, parentFd)
      if (latestVar && latestVar.type === 'local') {
        parentFd.vars[latestVar.idx].funcPoolIdx = childIdx
      }
      hoisted = { fd, childIdx }
      this.hoisted.set(node, hoisted)
    }

    const childIdx = hoisted.childIdx
    const fd = hoisted.fd

    // 发出 fclosure（8/32 根据索引选择）
    if (childIdx < 256) {
      compiler.emitOp(parentFd, Opcode.OP_fclosure8)
      compiler.emitU8(parentFd, childIdx)
    } else {
      compiler.emitOp(parentFd, Opcode.OP_fclosure)
      compiler.emitU32(parentFd, childIdx)
    }

    // 写入目标：lexical/global -> drop；否则 put_loc / put_var_ref
    const targetInfo = scopeManager.findVar(name, parentFd)
    if (targetInfo && targetInfo.type === 'local') {
      const jsVar = parentFd.vars[targetInfo.idx]
      jsVar.funcPoolIdx = childIdx
      if (jsVar.isLexical || parentFd.isGlobalVar) {
        compiler.emitOp(parentFd, Opcode.OP_drop)
      } else {
        compiler.emitPutLoc(parentFd, targetInfo.idx)
      }
    } else if (targetInfo && targetInfo.type === 'closure') {
      const atomId = compiler.addAtom(name)
      const idx = targetInfo.idx
      if (idx === 0) {
        compiler.emitOp(parentFd, Opcode.OP_put_var_ref0)
      } else if (idx === 1) {
        compiler.emitOp(parentFd, Opcode.OP_put_var_ref1)
      } else if (idx === 2) {
        compiler.emitOp(parentFd, Opcode.OP_put_var_ref2)
      } else if (idx === 3) {
        compiler.emitOp(parentFd, Opcode.OP_put_var_ref3)
      } else {
        compiler.emitOp(parentFd, Opcode.OP_put_var_ref)
        compiler.emitU32(parentFd, atomId)
        compiler.emitU16(parentFd, idx)
      }
    } else {
      // 兜底：按 var_ref 处理
      const atomId = compiler.addAtom(name)
      compiler.emitOp(parentFd, Opcode.OP_put_var_ref)
      compiler.emitU32(parentFd, atomId)
      compiler.emitU16(parentFd, 0)
    }
    
    // Switch context to child function
    this.context.setFuncDef(fd)
    scopeManager.enter('function', fd)

    // Check for default parameters and setup variables
    let hasDefaultParams = false
    let definedArgCount = 0
    
    for (let i = 0; i < node.parameters.length; i++) {
      const param = node.parameters[i]
      if (param.initializer) {
        hasDefaultParams = true
      }
      if (!hasDefaultParams) {
        definedArgCount++
      }
      
      if (ts.isIdentifier(param.name)) {
        const name = param.name.text
        const currentScope = scopeManager.currentScope
        
        if (param.initializer) {
          // Create local variable for parameter with default
          const scopeLevel = 1 // Match QuickJS WASM
          
          // Initialize argument scope (level 1) with -2 to match QuickJS behavior
          if (fd.scopes[scopeLevel].first === -1) {
             fd.scopes[scopeLevel].first = -2
          }

          const varIdx = compiler.addVar(fd, name, false, true, scopeLevel)
          
          currentScope.vars.set(name, {
            type: 'local',
            idx: i,
            isLexical: false,
            isConst: false,
            isArg: true
          })
        } else {
          // Normal argument
          currentScope.vars.set(name, {
            type: 'local',
            idx: i,
            isLexical: false,
            isConst: false,
            isArg: true
          })
        }
      }
    }
    
    if (hasDefaultParams) {
      fd.hasSimpleParameterList = false
      fd.definedArgCount = definedArgCount
    }
    
    // Generate default parameter prologue
    for (let i = 0; i < node.parameters.length; i++) {
      const param = node.parameters[i]
      if (param.initializer && ts.isIdentifier(param.name)) {
        // Find the local var index
        let varIdx = -1
        const atomId = compiler.addAtom(param.name.text)
        for(let v=0; v<fd.vars.length; v++) {
          if (fd.vars[v].varName === atomId) {
            varIdx = v
            break
          }
        }
        
        if (varIdx !== -1) {
          // set_loc_uninitialized varIdx
          compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
          compiler.emitU16(fd, varIdx)
          
          // get_arg i
          if (i === 0) {
            compiler.emitOp(fd, Opcode.OP_get_arg0)
          } else if (i === 1) {
            compiler.emitOp(fd, Opcode.OP_get_arg1)
          } else if (i === 2) {
            compiler.emitOp(fd, Opcode.OP_get_arg2)
          } else if (i === 3) {
            compiler.emitOp(fd, Opcode.OP_get_arg3)
          } else {
            compiler.emitOp(fd, Opcode.OP_get_arg)
            compiler.emitU16(fd, i)
          }
          
          const skipInitLabel = compiler.createLabel(fd)

          // dup
          compiler.emitOp(fd, Opcode.OP_dup)
          
          // is_undefined
          compiler.emitOp(fd, Opcode.OP_is_undefined)
          
          compiler.emitJump(fd, Opcode.OP_if_false, skipInitLabel)
          
          // drop
          compiler.emitOp(fd, Opcode.OP_drop)
          
          // Evaluate initializer
          this.context.visit(param.initializer)
          
          // set_arg i
          if (i === 0) {
            compiler.emitOp(fd, Opcode.OP_set_arg0)
          } else if (i === 1) {
            compiler.emitOp(fd, Opcode.OP_set_arg1)
          } else if (i === 2) {
            compiler.emitOp(fd, Opcode.OP_set_arg2)
          } else if (i === 3) {
            compiler.emitOp(fd, Opcode.OP_set_arg3)
          } else {
            compiler.emitOp(fd, Opcode.OP_set_arg)
            compiler.emitU16(fd, i)
          }
          
          // put_loc varIdx
          if (varIdx === 0) {
            compiler.emitOp(fd, Opcode.OP_put_loc0)
          } else if (varIdx === 1) {
            compiler.emitOp(fd, Opcode.OP_put_loc1)
          } else if (varIdx === 2) {
            compiler.emitOp(fd, Opcode.OP_put_loc2)
          } else if (varIdx === 3) {
            compiler.emitOp(fd, Opcode.OP_put_loc3)
          } else {
            compiler.emitOp(fd, Opcode.OP_put_loc)
            compiler.emitU16(fd, varIdx)
          }
          
          compiler.markLabel(fd, skipInitLabel)
        }
      }
    }
    
    // Visit body
    if (node.body) {
      scopeManager.enter('block', fd)
      // Note: hoistVariables is handled by the caller (visitBlock) or not needed here?
      // In TypeScriptCompiler, hoistVariables was called on the body.
      // But here we are inside visitFunctionDeclaration.
      // The original code called hoistVariables(node.body) inside visitFunctionDeclaration.
      // I need to replicate that logic or call a method on context.
      // Since hoistVariables is a method on TypeScriptCompiler, I might need to expose it or duplicate it.
      // For now, I'll assume I can't call it easily and skip it or implement it here.
      // Wait, hoistVariables is crucial.
      // I should check if I can access it via context.compiler (if it's TypeScriptCompiler) or context itself.
      // context.compiler is the Compiler class (low level).
      // context is CompilerContext.
      
      // I'll implement a simple hoistVariables here or assume it's done.
      // Actually, the original code did:
      // this.hoistVariables(node.body)
      
      // I'll implement a local hoistVariables helper.
      this.hoistVariables(node.body)
      
      // 1. Visit function declarations (hoisted)
      for (const stmt of node.body.statements) {
        if (ts.isFunctionDeclaration(stmt)) {
          this.context.visit(stmt)
        }
      }
      
      // 2. Emit set_loc_uninitialized for let/const
      const currentScope = scopeManager.currentScope
      for (const stmt of node.body.statements) {
        if (ts.isVariableStatement(stmt)) {
          const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
          const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
          if (isLet || isConst) {
            for (const decl of stmt.declarationList.declarations) {
              if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text
                const varInfo = currentScope.vars.get(name)
                if (varInfo && varInfo.type === 'local') {
                  compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(fd, varInfo.idx)
                }
              }
            }
          }
        }
      }

      // 3. Visit other statements
      for (const stmt of node.body.statements) {
        if (!ts.isFunctionDeclaration(stmt)) {
          this.context.visit(stmt)
        }
      }

      // Implicit return
      let lastOp = 0
      if (fd.lastOpcodePos !== -1) {
        lastOp = fd.byteCode.buffer[fd.lastOpcodePos]
      }
      
      // Optimization: Remove trailing drop before return_undef
      if (lastOp === Opcode.OP_drop) {
        fd.byteCode.size--
        lastOp = 0 // Force return_undef
      }
  
      if (fd.byteCode.size === 0 || (lastOp !== Opcode.OP_return && lastOp !== Opcode.OP_return_undef && lastOp !== Opcode.OP_throw && lastOp !== Opcode.OP_return_async && lastOp !== Opcode.OP_tail_call)) {
        compiler.emitOp(fd, Opcode.OP_return_undef)
      }
      
      scopeManager.exit()
    }
    
    scopeManager.exit()

    compiler.computePc2LineInfo(fd)

    // Restore context
    this.context.setFuncDef(parentFd)
    
    // Update stack size
    // (Handled by Compiler)
    
    labelManager.currentLoopStack = savedLoopStack
    labelManager.currentPendingLabels = savedPendingLabels
  }

  visitArrowFunction(node: ts.ArrowFunction) {
    const { compiler, scopeManager, funcDef } = this.context
    if (!funcDef) {
      return
    }
    const parentFd = funcDef
    
    // Create child function def
    const fd = new FunctionDef(parentFd)
    fd.scopeLevel = scopeManager.stackDepth - 1
    fd.funcName = 0 // Anonymous (JS_ATOM_NULL)
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.sourcePos = node.getStart()
    fd.lineNumberLast = fd.sourcePos
    fd.lineNumberLastPc = 0

    fd.hasPrototype = false
    fd.hasArgumentsBinding = false
    fd.hasThisBinding = false
    fd.newTargetAllowed = false
    fd.hasSimpleParameterList = true
    fd.argumentsAllowed = true
    
    // Add arguments
    for (const param of node.parameters) {
      if (ts.isIdentifier(param.name)) {
        compiler.addArg(fd, param.name.text)
      }
    }
    
    // Add child to parent cpool
    const childIdx = compiler.addChild(parentFd, fd)
    
    // Emit fclosure
    compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    compiler.emitU8(parentFd, childIdx)
    
    // Switch context
    this.context.setFuncDef(fd)
    
    // Visit body
    if (ts.isBlock(node.body)) {
      scopeManager.enter('block', fd)
      
      // Hoist block-scoped variables (let/const)
      for (const stmt of node.body.statements) {
        if (ts.isVariableStatement(stmt)) {
          const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
          const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
          if (isLet || isConst) {
            for (const decl of stmt.declarationList.declarations) {
              if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text
                const currentScope = scopeManager.currentScope
                if (!currentScope.vars.has(name)) {
                  const scopeLevel = scopeManager.stackDepth - fd.scopeLevel - 1
                  const varIdx = compiler.addVar(fd, name, isConst, true, scopeLevel)
                  currentScope.vars.set(name, {
                    type: 'local',
                    idx: varIdx,
                    isLexical: true,
                    isConst
                  })
                  
                  compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(fd, varIdx)
                }
              }
            }
          }
        }
      }
      
      // Visit statements
      for (const stmt of node.body.statements) {
        this.context.visit(stmt)
      }
      
      scopeManager.exit()
    } else {
      // Expression body
      this.context.visit(node.body)
      // Implicit return
      compiler.emitReturn(fd, true)
    }
    
    // Epilogue
    if (fd.byteCode.size === 0 || (fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return && fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return_undef && fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return_async)) {
      compiler.emitOp(fd, Opcode.OP_undefined)
      compiler.emitOp(fd, Opcode.OP_return)
    }
    
    compiler.computePc2LineInfo(fd)
    this.context.setFuncDef(parentFd)
  }

  visitFunctionExpression(node: ts.FunctionExpression) {
    const { compiler, scopeManager, funcDef } = this.context
    if (!funcDef) return

    const parentFd = funcDef
    const name = node.name?.text

    // Create child function def
    const fd = new FunctionDef(parentFd)
    fd.scopeLevel = scopeManager.stackDepth
    fd.funcName = name ? compiler.addAtom(name) : 0
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.sourcePos = node.getStart()
    fd.lineNumberLast = fd.sourcePos
    fd.lineNumberLastPc = 0
    fd.argumentsAllowed = true
    fd.hasPrototype = true
    fd.hasSimpleParameterList = true
    fd.newTargetAllowed = true

    // Add arguments
    for (let i = 0; i < node.parameters.length; i++) {
      const param = node.parameters[i]
      if (ts.isIdentifier(param.name)) {
        compiler.addArg(fd, param.name.text)
      }
    }

    // Add child to parent cpool
    const childIdx = compiler.addChild(parentFd, fd)

    // Emit fclosure
    compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    compiler.emitU8(parentFd, childIdx)

    // Switch context
    this.context.setFuncDef(fd)
    scopeManager.enter('function', fd)

    // TODO: Handle named function expression binding (recursive name)

    // Visit body
    if (node.body) {
      scopeManager.enter('block', fd)
      this.hoistVariables(node.body)
      
      // 1. Visit function declarations (hoisted)
      for (const stmt of node.body.statements) {
        if (ts.isFunctionDeclaration(stmt)) {
          this.context.visit(stmt)
        }
      }
      
      // 2. Emit set_loc_uninitialized for let/const
      const currentScope = scopeManager.currentScope
      for (const stmt of node.body.statements) {
        if (ts.isVariableStatement(stmt)) {
          const isLet = (stmt.declarationList.flags & ts.NodeFlags.Let) !== 0
          const isConst = (stmt.declarationList.flags & ts.NodeFlags.Const) !== 0
          if (isLet || isConst) {
            for (const decl of stmt.declarationList.declarations) {
              if (ts.isIdentifier(decl.name)) {
                const name = decl.name.text
                const varInfo = currentScope.vars.get(name)
                if (varInfo && varInfo.type === 'local') {
                  compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
                  compiler.emitU16(fd, varInfo.idx)
                }
              }
            }
          }
        }
      }

      // 3. Visit other statements
      for (const stmt of node.body.statements) {
        if (!ts.isFunctionDeclaration(stmt)) {
          this.context.visit(stmt)
        }
      }

      // Implicit return
      let lastOp = 0
      if (fd.lastOpcodePos !== -1) {
        lastOp = fd.byteCode.buffer[fd.lastOpcodePos]
      }
      
      if (lastOp === Opcode.OP_drop) {
        fd.byteCode.size--
        lastOp = 0
      }
  
      if (fd.byteCode.size === 0 || (lastOp !== Opcode.OP_return && lastOp !== Opcode.OP_return_undef && lastOp !== Opcode.OP_throw && lastOp !== Opcode.OP_return_async && lastOp !== Opcode.OP_tail_call)) {
        compiler.emitOp(fd, Opcode.OP_return_undef)
      }
      
      scopeManager.exit()
    }
    
    scopeManager.exit()
    this.context.setFuncDef(parentFd)
  }

  visitMethodDefinition(node: ts.MethodDeclaration) {
    const { compiler, scopeManager, funcDef } = this.context
    if (!funcDef) {
      return
    }
    const parentFd = funcDef
    
    const fd = new FunctionDef(parentFd)
    fd.scopeLevel = scopeManager.stackDepth
    // fd.funcName = compiler.addAtom(node.name.getText())
    fd.funcName = 0
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.filename = parentFd.filename
    fd.hasDebug = true
    fd.hasHomeObject = true // Methods have home object
    fd.sourcePos = node.getStart()
    fd.lineNumberLast = fd.sourcePos
    fd.lineNumberLastPc = 0

    // Add flags to match WASM
    fd.hasSimpleParameterList = true
    fd.newTargetAllowed = true
    fd.superAllowed = true
    fd.argumentsAllowed = true
    
    // Add arguments
    for (const param of node.parameters) {
      if (ts.isIdentifier(param.name)) {
        compiler.addArg(fd, param.name.text)
      }
    }
    
    const childIdx = compiler.addChild(parentFd, fd)
    
    compiler.emitOp(parentFd, Opcode.OP_fclosure8)
    compiler.emitU8(parentFd, childIdx)
    
    this.context.setFuncDef(fd)

    // Push scope
    scopeManager.enter('function', fd, 0)

    if (node.body) {
      this.context.visit(node.body)
    }
    
    scopeManager.exit()
    
    // Epilogue
    // console.log('fd.byteCode:', fd.byteCode)
    if (fd.byteCode.size === 0 || (fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return && fd.byteCode.buffer[fd.byteCode.size - 1] !== Opcode.OP_return_undef)) {
      compiler.emitOp(fd, Opcode.OP_undefined)
      compiler.emitOp(fd, Opcode.OP_return)
    }
    
    compiler.computePc2LineInfo(fd)
    this.context.setFuncDef(parentFd)
  }

  private hoistVariables(node: ts.Block) {
    const { compiler, scopeManager, funcDef } = this.context
    if (!funcDef) return

    for (const stmt of node.statements) {
      if (ts.isFunctionDeclaration(stmt)) {
        if (stmt.name) {
          const name = stmt.name.text
          // Add to function scope (var)
          // Note: In QuickJS, function declarations in blocks are block-scoped in strict mode?
          // But here we are treating them as var-scoped (hoisted) for now or following QuickJS logic.
          // QuickJS treats them as block scoped in strict mode but hoisted to block top.
          // But `visitFunctionDeclaration` adds them to `parentFd` (which is `funcDef`).
          // So they are added to the function scope.
          
          // We need to add them to the scope manager so `visitFunctionDeclaration` can find them.
          // `visitFunctionDeclaration` calls `scopeManager.findVar`.
          
          // Actually, `visitFunctionDeclaration` expects the variable to be already added?
          // No, `visitFunctionDeclaration` adds the variable to the parent scope?
          // Let's check `visitFunctionDeclaration` again.
          // It says: `let varInfo = this.scopeManager.findVar(name, this.funcDef!)`
          // So it expects it to be there.
          
          // So `hoistVariables` MUST add the variable.
          
          const varIdx = compiler.addVar(funcDef, name, false, false, 0) // Scope level 0 (function)
          scopeManager.currentScope.vars.set(name, {
            type: 'local',
            idx: varIdx,
            isLexical: false,
            isConst: false
          })
        }
      } else if (ts.isVariableStatement(stmt)) {
        if ((stmt.declarationList.flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) === 0) {
          // var declaration
          for (const decl of stmt.declarationList.declarations) {
            if (ts.isIdentifier(decl.name)) {
              const name = decl.name.text
              const varIdx = compiler.addVar(funcDef, name, false, false, 0)
              scopeManager.currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                isLexical: false,
                isConst: false
              })
            }
          }
        }
      }
    }
  }
}
