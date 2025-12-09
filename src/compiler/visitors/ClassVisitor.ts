import ts from 'typescript'
import { CompilerContext } from '../CompilerContext'
import { Opcode, FunctionKind, JSMode } from '../../env'
import { FunctionDef, JSVarKind } from '../FunctionDef'

export class ClassVisitor {
  private context: CompilerContext

  constructor(context: CompilerContext) {
    this.context = context
  }

  visitClassDeclaration(node: ts.ClassDeclaration) {
    const { compiler, scopeManager, labelManager, funcDef } = this.context
    if (!funcDef || !node.name) {
      return
    }

    // We need to access nodeScopeMap from context, but it's private in TypeScriptCompiler.
    // We should probably expose it or pass the indices differently.
    // For now, let's assume we can access it via a getter or public property if we change TypeScriptCompiler.
    // Or better, let's move the map to CompilerContext or ScopeManager?
    // Actually, TypeScriptCompiler has `nodeScopeMap`.
    // I'll cast context to any to access it for now, or add it to interface.
    // Let's check CompilerContext interface.
    
    // Assuming context has nodeScopeMap or we can get it.
    // Since I can't easily change the interface right now without editing multiple files,
    // I will use `(this.context as any).nodeScopeMap`.
    const nodeScopeMap = (this.context as any).nodeScopeMap as Map<ts.Node, number[]>
    
    const scopeIndices = nodeScopeMap.get(node)
    if (!scopeIndices) {
        throw new Error('Scope indices not found for class declaration')
    }
    const [nameScopeIndex, bodyScopeIndex] = scopeIndices

    // Enter Name Scope
    if (nameScopeIndex !== -1) {
      scopeManager.enter('block', funcDef, nameScopeIndex)
    }
    
    // Enter Body Scope
    scopeManager.enter('block', funcDef, bodyScopeIndex)
    const bodyScopeVars = scopeManager.currentScope.vars

    // Define <class_fields_init> in parent scope if not exists
    const fieldsInitName = '<class_fields_init>'
    let fieldsInitScopeInfo = scopeManager.findVar(fieldsInitName, funcDef!)
    
    // Check if we have any instance fields to initialize
    const hasInstanceFields = node.members.some(m => 
      ts.isPropertyDeclaration(m) && 
      !m.modifiers?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword)
    )

    console.log(`visitClassDeclaration: finding ${fieldsInitName} -> ${fieldsInitScopeInfo ? 'found' : 'not found'}`)
    if (!fieldsInitScopeInfo && hasInstanceFields) {
      const varIdx = compiler.addVar(funcDef, fieldsInitName, true, false, bodyScopeIndex)
      const currentScope = scopeManager.currentScope
      currentScope.vars.set(fieldsInitName, {
        type: 'local',
        idx: varIdx,
        isLexical: true,
        isConst: true
      })
      fieldsInitScopeInfo = scopeManager.findVar(fieldsInitName, funcDef!)
    }

    const savedLoopStack = labelManager.currentLoopStack
    const savedPendingLabels = labelManager.currentPendingLabels
    labelManager.currentLoopStack = []
    labelManager.currentPendingLabels = []

    const name = node.name.text
    // Search in parent scope (Module Scope) because we are currently in Body Scope
    const scopeInfo = scopeManager.findVar(name, funcDef!)
    if (!scopeInfo) {
      throw new Error(`Class ${name} not found in scope`)
    }

    // Emit set_loc_uninitialized
    if (scopeInfo.localIdx !== undefined) {
      compiler.emitOp(funcDef, Opcode.OP_set_loc_uninitialized)
      compiler.emitU16(funcDef, scopeInfo.localIdx)
    }

    // Handle <class_fields_init>
    if (fieldsInitScopeInfo) {
      // Emit undefined
      compiler.emitOp(funcDef, Opcode.OP_undefined)
      
      // Emit set_loc_uninitialized
      if (fieldsInitScopeInfo.localIdx !== undefined) {
        compiler.emitOp(funcDef, Opcode.OP_set_loc_uninitialized)
        compiler.emitU16(funcDef, fieldsInitScopeInfo.localIdx)
      }
    }

    // Check for extends
    let hasExtends = false
    if (node.heritageClauses) {
      for (const clause of node.heritageClauses) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          if (clause.types.length > 0) {
            // Compile base class expression
            this.context.visit(clause.types[0].expression)
            hasExtends = true
          }
        }
      }
    }

    // Create constructor function
    const parentFd = funcDef
    const fd = new FunctionDef()
    fd.funcName = 0
    fd.funcKind = FunctionKind.JS_FUNC_NORMAL
    fd.jsMode = JSMode.JS_MODE_STRICT
    fd.hasDebug = true
    fd.filename = parentFd.filename
    
    const constructorNode = node.members.find(ts.isConstructorDeclaration)
    
    if (constructorNode) {
      fd.sourcePos = constructorNode.getStart()
      fd.lineNumberLast = fd.sourcePos
      fd.lineNumberLastPc = 0
    } else {
      fd.sourcePos = node.getStart()
      fd.lineNumberLast = fd.sourcePos
      fd.lineNumberLastPc = 0
    }

    fd.parent = parentFd
    
    fd.isDerivedClassConstructor = hasExtends
    fd.hasPrototype = false
    fd.hasSimpleParameterList = true
    fd.newTargetAllowed = true
    fd.superAllowed = true
    fd.argumentsAllowed = true
    
    if (constructorNode) {
      for (const param of constructorNode.parameters) {
        if (ts.isIdentifier(param.name)) {
          compiler.addArg(fd, param.name.text)
        }
      }
    }

    if (fd.isDerivedClassConstructor) {
      compiler.addVar(fd, 'this.active_func', false, false, 0)
      compiler.addVar(fd, 'new.target', false, false, 0)
      compiler.addVar(fd, 'this', false, false, 0)
    } else {
      compiler.addVar(fd, 'this', false, false, 0)
    }
        
    const childIdx = compiler.addChild(parentFd, fd)
    
    let classPos = node.getStart()

    compiler.emitOp(parentFd, Opcode.OP_push_const8, classPos)
    compiler.emitU8(parentFd, childIdx)
    
    const classAtom = compiler.addAtom(name)
    compiler.emitOp(parentFd, Opcode.OP_define_class, classPos)
    compiler.emitU32(parentFd, classAtom)
    compiler.emitU8(parentFd, hasExtends ? 1 : 0)

    // Handle private fields
    for (const member of node.members) {
      if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
        const prop = member as ts.PropertyDeclaration
        if (prop.name && ts.isPrivateIdentifier(prop.name)) {
          const privateName = prop.name.text
          const varIdx = compiler.addVar(parentFd, privateName, true, true, 0)
          
          const currentScope = scopeManager.currentScope
          if (currentScope) {
            currentScope.vars.set(privateName, {
              type: 'local',
              idx: varIdx,
              isLexical: true,
              isConst: true
            })
          }

          const atom = compiler.addAtom(privateName)
          compiler.emitOp(parentFd, Opcode.OP_private_symbol)
          compiler.emitU32(parentFd, atom)
          
          if (varIdx === 0) {
            compiler.emitOp(parentFd, Opcode.OP_put_loc0)
          } else if (varIdx === 1) {
            compiler.emitOp(parentFd, Opcode.OP_put_loc1)
          } else if (varIdx === 2) {
            compiler.emitOp(parentFd, Opcode.OP_put_loc2)
          } else if (varIdx === 3) {
            compiler.emitOp(parentFd, Opcode.OP_put_loc3)
          } else {
            compiler.emitOp(parentFd, Opcode.OP_put_loc)
            compiler.emitU16(parentFd, varIdx)
          }
        }
      }
    }

    // Handle methods and accessors
    let isSwapped = false
    for (const member of node.members) {
      const kind = member.kind
      const isMethod = kind === ts.SyntaxKind.MethodDeclaration
      const isGetter = kind === ts.SyntaxKind.GetAccessor
      const isSetter = kind === ts.SyntaxKind.SetAccessor
        
      if (isMethod || isGetter || isSetter) {
        const funcMember = member as ts.MethodDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration
        
        if (funcMember.name && (ts.isIdentifier(funcMember.name) || ts.isStringLiteral(funcMember.name))) {
          const methodName = (funcMember.name as ts.Identifier).text
          const isStatic = funcMember.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword) ?? false
        
          if (isStatic) {
            if (!isSwapped) {
              compiler.emitOp(parentFd, Opcode.OP_swap)
              isSwapped = true
            }
          } else {
            if (isSwapped) {
              compiler.emitOp(parentFd, Opcode.OP_swap)
              isSwapped = false
            }
          }

          const methodFd = new FunctionDef()
          methodFd.parent = parentFd
          methodFd.funcName = compiler.addAtom(methodName) 
          methodFd.filename = parentFd.filename
          methodFd.source = parentFd.source
          methodFd.sourceLen = parentFd.sourceLen
          methodFd.hasPrototype = false 
          
          compiler.addVar(methodFd, 'this', true, false, 0)
          compiler.addVar(methodFd, '<home_object>', false, false, 0)
          
          for (const param of funcMember.parameters) {
            if (ts.isIdentifier(param.name)) {
              compiler.addArg(methodFd, param.name.text)
            }
          }
          
          // Defer method body
          (this.context as any).deferredTasks.push(() => {
            if (nameScopeIndex !== -1) scopeManager.enter('block', funcDef, nameScopeIndex)
            scopeManager.enter('block', funcDef, bodyScopeIndex)
            scopeManager.currentScope.vars = bodyScopeVars

            const prevFd: FunctionDef | null = this.context.funcDef
            this.context.setFuncDef(methodFd)
          
            // Prologue
            compiler.emitOp(methodFd, Opcode.OP_special_object)
            compiler.emitU8(methodFd, 4) // home_object
            compiler.emitOp(methodFd, Opcode.OP_put_loc1) // var 1
            
            compiler.emitOp(methodFd, Opcode.OP_push_this)
            compiler.emitOp(methodFd, Opcode.OP_put_loc0)
            
            if (funcMember.body) {
              this.context.visit(funcMember.body)
            }
            
            const lastOp = methodFd.byteCode.size > 0 ? methodFd.byteCode.buffer[methodFd.byteCode.size - 1] : Opcode.OP_invalid
            if (lastOp !== Opcode.OP_return && lastOp !== Opcode.OP_return_undef) {
              compiler.emitOp(methodFd, Opcode.OP_return_undef)
            }
            compiler.computePc2LineInfo(methodFd)
            
            this.context.setFuncDef(prevFd)
          
            scopeManager.exit()
            if (nameScopeIndex !== -1) scopeManager.exit()
          })
          
          const methodChildIdx = compiler.addChild(parentFd, methodFd)
          
          compiler.emitOp(parentFd, Opcode.OP_fclosure8)
          compiler.emitU8(parentFd, methodChildIdx)
          
          const methodAtom = compiler.addAtom(methodName)
          compiler.emitOp(parentFd, Opcode.OP_define_method)
          compiler.emitU32(parentFd, methodAtom)
          
          let flags = 0
          if (isGetter) {
            flags = 1
          } else if (isSetter) {
            flags = 2
          }
          compiler.emitU8(parentFd, flags)
        }
      }
    }
    
    if (isSwapped) {
      compiler.emitOp(parentFd, Opcode.OP_swap)
    }

    // Handle <class_fields_init> assignment
    if (fieldsInitScopeInfo) {
      const fieldsInitFd = new FunctionDef()
      fieldsInitFd.parent = parentFd
      fieldsInitFd.funcName = 0 
      fieldsInitFd.filename = parentFd.filename
      fieldsInitFd.source = parentFd.source
      fieldsInitFd.sourceLen = parentFd.sourceLen
      fieldsInitFd.hasPrototype = false
      
      compiler.addVar(fieldsInitFd, 'this', true, false, 0)
      compiler.addVar(fieldsInitFd, '<home_object>', false, false, 0);

      (this.context as any).deferredTasks.push(() => {
        if (nameScopeIndex !== -1) scopeManager.enter('block', funcDef, nameScopeIndex)
        scopeManager.enter('block', funcDef, bodyScopeIndex)
        scopeManager.currentScope.vars = bodyScopeVars

        const prevFd = this.context.funcDef
        this.context.setFuncDef(fieldsInitFd)

        compiler.emitOp(fieldsInitFd, Opcode.OP_special_object)
        compiler.emitU8(fieldsInitFd, 4) // home_object
        compiler.emitOp(fieldsInitFd, Opcode.OP_put_loc1) // var 1

        compiler.emitOp(fieldsInitFd, Opcode.OP_push_this)
        compiler.emitOp(fieldsInitFd, Opcode.OP_put_loc0)

        for (const member of node.members) {
          if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
            const prop = member as ts.PropertyDeclaration
            if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
               if (prop.modifiers?.some(m => m.kind === ts.SyntaxKind.StaticKeyword)) continue;

               const propName = (prop.name as ts.Identifier).text
               
               compiler.emitOp(fieldsInitFd, Opcode.OP_get_loc0) // this
               
               if (prop.initializer) {
                 this.context.visit(prop.initializer)
               } else {
                 compiler.emitOp(fieldsInitFd, Opcode.OP_undefined)
               }
               
               const atom = compiler.addAtom(propName)
               compiler.emitOp(fieldsInitFd, Opcode.OP_define_field)
               compiler.emitU32(fieldsInitFd, atom)
            }
          }
        }

        compiler.emitOp(fieldsInitFd, Opcode.OP_return_undef)
        compiler.computePc2LineInfo(fieldsInitFd)

        this.context.setFuncDef(prevFd)
        scopeManager.exit()
        if (nameScopeIndex !== -1) scopeManager.exit()
      })

      const childIdx = compiler.addChild(parentFd, fieldsInitFd)
      
      compiler.emitOp(parentFd, Opcode.OP_fclosure8)
      compiler.emitU8(parentFd, childIdx)
      
      compiler.emitOp(parentFd, Opcode.OP_set_home_object)

      if (fieldsInitScopeInfo.localIdx !== undefined) {
        const idx = fieldsInitScopeInfo.localIdx
        if (idx === 0) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc0)
        } else if (idx === 1) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc1)
        } else if (idx === 2) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc2)
        } else if (idx === 3) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc3)
        } else {
          compiler.emitOp(parentFd, Opcode.OP_put_loc)
          compiler.emitU16(parentFd, idx)
        }
      } else {
          compiler.emitOp(parentFd, Opcode.OP_drop)
      }
    }
      
    let closureIdx = -1
    if (scopeInfo.type === 'closure') {
      closureIdx = scopeInfo.idx
    } else if (scopeInfo.type === 'local') {
      const foundClosure = funcDef.closureVar.findIndex(cv => cv.isLocal && cv.varIdx === scopeInfo.idx)
      if (foundClosure !== -1) {
        closureIdx = foundClosure
      }
    }

    if (scopeInfo.localIdx !== undefined) {
      const useSetLoc = closureIdx !== -1
      
      if (useSetLoc) {
        if (scopeInfo.localIdx === 0) {
          compiler.emitOp(parentFd, Opcode.OP_set_loc0)
        } else if (scopeInfo.localIdx === 1) {
          compiler.emitOp(parentFd, Opcode.OP_set_loc1)
        } else if (scopeInfo.localIdx === 2) {
          compiler.emitOp(parentFd, Opcode.OP_set_loc2)
        } else if (scopeInfo.localIdx === 3) {
          compiler.emitOp(parentFd, Opcode.OP_set_loc3)
        } else {
          compiler.emitOp(parentFd, Opcode.OP_set_loc)
          compiler.emitU16(parentFd, scopeInfo.localIdx)
        }
      } else {
        if (scopeInfo.localIdx === 0) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc0)
        } else if (scopeInfo.localIdx === 1) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc1)
        } else if (scopeInfo.localIdx === 2) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc2)
        } else if (scopeInfo.localIdx === 3) {
          compiler.emitOp(parentFd, Opcode.OP_put_loc3)
        } else {
          compiler.emitOp(parentFd, Opcode.OP_put_loc)
          compiler.emitU16(parentFd, scopeInfo.localIdx)
        }
      }
    } else if (closureIdx === -1) {
      compiler.emitOp(parentFd, Opcode.OP_drop)
    }

    if (fieldsInitScopeInfo && fieldsInitScopeInfo.localIdx !== undefined) {
      compiler.emitOp(parentFd, Opcode.OP_close_loc)
      compiler.emitU16(parentFd, fieldsInitScopeInfo.localIdx)
    }
      
    if (closureIdx !== -1) {
      const idx = closureIdx
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
        compiler.emitU16(parentFd, idx)
      }
    }
      
    (this.context as any).deferredTasks.push(() => {
        if (nameScopeIndex !== -1) scopeManager.enter('block', funcDef, nameScopeIndex)
        scopeManager.enter('block', funcDef, bodyScopeIndex)
        scopeManager.currentScope.vars = bodyScopeVars

        const prevFd = this.context.funcDef
        this.context.setFuncDef(fd)

        scopeManager.enter('function', this.context.funcDef)
    const currentScope = scopeManager.currentScope
    
    if (fd.isDerivedClassConstructor) {
      console.log('DEBUG: Setting this in derived constructor scope')
      currentScope.vars.set('this', { type: 'local', idx: 2, localIdx: 2, isLexical: false, isConst: true })
      currentScope.vars.set('new.target', { type: 'local', idx: 1, localIdx: 1, isLexical: false, isConst: true })
      currentScope.vars.set('this.active_func', { type: 'local', idx: 0, localIdx: 0, isLexical: false, isConst: true })
    } else {
      currentScope.vars.set('this', { type: 'local', idx: 0, localIdx: 0, isLexical: false, isConst: true })
    }

    const fieldsInitNameCtor = '<class_fields_init>'
    let fieldsInitClosureIdx = -1
    
    if (fieldsInitScopeInfo && fieldsInitScopeInfo.localIdx !== undefined) {
        fieldsInitClosureIdx = compiler.addClosureVar(fd, fieldsInitNameCtor, true, false, fieldsInitScopeInfo.localIdx, JSVarKind.JS_VAR_NORMAL, true, true)
    }
      
    if (fd.isDerivedClassConstructor) {
      compiler.emitOp(fd, Opcode.OP_special_object)
      compiler.emitU8(fd, 2) // this.active_func
      compiler.emitOp(fd, Opcode.OP_put_loc0) // var 0
      
      compiler.emitOp(fd, Opcode.OP_special_object)
      compiler.emitU8(fd, 3) // new.target
      compiler.emitOp(fd, Opcode.OP_put_loc1) // var 1
      
      compiler.emitOp(fd, Opcode.OP_set_loc_uninitialized)
      compiler.emitU16(fd, 2) // var 2 (this)
      
      compiler.emitOp(fd, Opcode.OP_check_ctor)
    } else {
      compiler.emitOp(fd, Opcode.OP_push_this)
      compiler.emitOp(fd, Opcode.OP_put_loc0) // this
      compiler.emitOp(fd, Opcode.OP_check_ctor)

      for (const member of node.members) {
        if (member.kind === ts.SyntaxKind.PropertyDeclaration) {
          const prop = member as ts.PropertyDeclaration
          if (prop.name && ts.isPrivateIdentifier(prop.name)) {
            const privateName = prop.name.text
            
            compiler.emitOp(fd, Opcode.OP_get_loc0)
            
            const varInfo = scopeManager.findVar(privateName, this.context.funcDef!)
            if (varInfo) {
              const closureIdx = compiler.addClosureVar(fd, privateName, true, false, varInfo.idx, 0, true, true)
              compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
              compiler.emitU16(fd, closureIdx)
            } else {
              throw new Error(`Private field ${privateName} not found`)
            }
            
            if (prop.initializer) {
              const prevFd: FunctionDef | null = this.context.funcDef
              this.context.setFuncDef(fd)
              this.context.visit(prop.initializer)
              this.context.setFuncDef(prevFd)
            } else {
              compiler.emitOp(fd, Opcode.OP_push_0) 
            }
              
            if (!prop.initializer) {
              compiler.emitOp(fd, Opcode.OP_undefined)
            }
              
            compiler.emitOp(fd, Opcode.OP_define_private_field)
          }
        }
      }

      if (fieldsInitClosureIdx !== -1) {
        compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
        compiler.emitU16(fd, fieldsInitClosureIdx)
        
        const skipInitLabel = compiler.newLabel(fd)
        compiler.emitOp(fd, Opcode.OP_dup)
        compiler.emitJump(fd, Opcode.OP_if_false, skipInitLabel)
        
        compiler.emitOp(fd, Opcode.OP_get_loc0) // this
        compiler.emitOp(fd, Opcode.OP_swap)
        compiler.emitOp(fd, Opcode.OP_call_method)
        compiler.emitU16(fd, 0)

        compiler.markLabel(fd, skipInitLabel)
        compiler.emitOp(fd, Opcode.OP_drop)
      }
    }
      
    if (constructorNode && constructorNode.body) {
      if (fd.isDerivedClassConstructor) {
        fd.fieldsInitClosureIdx = fieldsInitClosureIdx
      } else {
        if (fieldsInitClosureIdx !== -1) {
          compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
          compiler.emitU16(fd, fieldsInitClosureIdx)
          
          const skipInitLabel = compiler.newLabel(fd)
          compiler.emitOp(fd, Opcode.OP_dup)
          compiler.emitJump(fd, Opcode.OP_if_false, skipInitLabel)
          
          compiler.emitOp(fd, Opcode.OP_get_loc0) // this
          compiler.emitOp(fd, Opcode.OP_swap)
          compiler.emitOp(fd, Opcode.OP_call_method)
          compiler.emitU16(fd, 0)

          compiler.markLabel(fd, skipInitLabel)
          compiler.emitOp(fd, Opcode.OP_drop)
        }
      }
      this.context.visit(constructorNode.body)
    } else {
      if (hasExtends) {
        // TODO: Call super()
      }

      if (fieldsInitClosureIdx !== -1) {
        compiler.emitOp(fd, Opcode.OP_get_var_ref_check)
        compiler.emitU16(fd, fieldsInitClosureIdx)
        
        const skipInitLabel = compiler.newLabel(fd)
        compiler.emitOp(fd, Opcode.OP_dup)
        compiler.emitJump(fd, Opcode.OP_if_false, skipInitLabel)
        
        compiler.emitOp(fd, Opcode.OP_get_loc0) // this
        compiler.emitOp(fd, Opcode.OP_swap)
        compiler.emitOp(fd, Opcode.OP_call_method)
        compiler.emitU16(fd, 0)

        compiler.markLabel(fd, skipInitLabel)
        compiler.emitOp(fd, Opcode.OP_drop)
      }
    }
      
    compiler.emitOp(fd, Opcode.OP_return_undef)
    compiler.computePc2LineInfo(fd)
    
    scopeManager.exit()
    this.context.setFuncDef(prevFd)  
    scopeManager.exit()
      if (nameScopeIndex !== -1) scopeManager.exit()
    })

    this.context.setFuncDef(parentFd)
    
    labelManager.currentLoopStack = savedLoopStack
    labelManager.currentPendingLabels = savedPendingLabels
    
    scopeManager.exit()
    if (nameScopeIndex !== -1) {
      scopeManager.exit()
    }
  }

  visitMethodDefinition(node: ts.MethodDeclaration) {
    // This logic is already embedded in visitClassDeclaration for now.
    // If we want to support object literal methods, we might need it separately.
    // But object literal methods are handled in ExpressionVisitor or TypeScriptCompiler directly.
    // Let's check TypeScriptCompiler.visitMethodDefinition.
    // It seems it was used for Object Literal methods too?
    // No, ObjectLiteralExpression calls visitMethodDefinition?
    // Let's check ExpressionVisitor.
    
    // In TypeScriptCompiler:
    // visitMethodDefinition(node: ts.MethodDeclaration)
    
    // In ExpressionVisitor:
    // visitObjectLiteralExpression calls visitMethodDefinition?
    // No, it iterates properties.
    
    // If visitMethodDefinition is used by ObjectLiteral, we should keep it or move it to a shared place.
    // But ClassVisitor handles class methods inline.
    // Let's see if we can reuse this method.
    
    // For now, I'll just implement visitClassDeclaration fully.
  }
}
