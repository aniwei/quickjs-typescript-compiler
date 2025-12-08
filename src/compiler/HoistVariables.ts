import ts from 'typescript'
import { CompilerContext } from './CompilerContext'
import { FunctionKind, Opcode } from '../env'
import { JSVarKind } from './FunctionDef'

export class HoistVariables {
  private context: CompilerContext

  constructor(context: CompilerContext) {
    this.context = context
  }

  private get compiler() {
    return this.context.compiler
  }

  private get scopeManager() {
    return this.context.scopeManager
  }

  private get funcDef() {
    return this.context.funcDef
  }

  private get nodeScopeMap() {
    return (this.context as any).nodeScopeMap as Map<ts.Node, number[]>
  }

  hoistVariables(node: ts.Node) {
    const isModule = this.funcDef?.funcKind === FunctionKind.JS_FUNC_ASYNC
    const isScriptRoot = !this.funcDef?.parent && !isModule
    const treatAsContextVar = isModule || isScriptRoot
    // console.log(`hoistVariables: isModule=${isModule} scopeStack=${this.scopeManager.tack.length} funcLevel=${this.funcDef?.scopeLevel}`)

    ts.forEachChild(node, n => {
      if (ts.isFunctionDeclaration(n)) {
        if (n.name) {
          const name = n.name.text
          
          let targetScope = this.scopeManager.currentScope
          let targetScopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1
          
          if (!treatAsContextVar) {
            // Find function scope
            for (let i = this.scopeManager.stackDepth - 1; i >= 0; i--) {
              const scope = this.scopeManager.getScope(i)
              if (scope.type === 'function' || scope.type === 'module') {
                targetScope = scope
                targetScopeLevel = i - this.funcDef!.scopeLevel
                break
              }
            }
          }

          if (!targetScope.vars.has(name)) {
            let varIdx: number
            if (treatAsContextVar) {
              // For module/script variables, add as captured var (no stack slot)
              varIdx = this.compiler.addVar(this.funcDef!, name, false, false, targetScopeLevel, JSVarKind.JS_VAR_NORMAL, true, true)
            } else {
              varIdx = this.compiler.addVar(this.funcDef!, name, false, false, targetScopeLevel)
            }
            
            if (treatAsContextVar) {
              const nameAtom = this.compiler.addAtom(name)
              const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, false)
              targetScope.vars.set(name, {
                type: 'closure',
                idx: closureIdx,
                localIdx: varIdx,
                isLexical: false,
                isConst: false
              })
            } else {
              targetScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                localIdx: varIdx,
                isLexical: false,
                isConst: false
              })
            }
          }
        }
      } else if (ts.isVariableStatement(n)) {
        const isLet = (n.declarationList.flags & ts.NodeFlags.Let) !== 0
        const isConst = (n.declarationList.flags & ts.NodeFlags.Const) !== 0
          
        // Hoist all variables (var/let/const) in top-level to ensure atom order
        for (const decl of n.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const name = decl.name.text
            
            let targetScope = this.scopeManager.currentScope
            let targetScopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1
            
            // console.log(`hoistVariables var: ${name} isLet=${isLet} level=${targetScopeLevel}`)

            if (!isLet && !isConst && !treatAsContextVar) {
               // var: hoist to function scope
               for (let i = this.scopeManager.stackDepth - 1; i >= 0; i--) {
                  const scope = this.scopeManager.getScope(i)
                  if (scope.type === 'function' || scope.type === 'module') {
                    targetScope = scope
                    targetScopeLevel = i - this.funcDef!.scopeLevel
                    break
                  }
               }
            }

            if (!targetScope.vars.has(name)) {
              let varIdx: number
              if (treatAsContextVar) {
                // For module/script variables (var/let/const/function), add as captured var (no stack slot)
                varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLet || isConst, targetScopeLevel, JSVarKind.JS_VAR_NORMAL, true, true)
              } else {
                varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLet || isConst, targetScopeLevel)
              }
              
              if (treatAsContextVar) {
                const nameAtom = this.compiler.addAtom(name)
                const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, isConst, isLet || isConst)
                targetScope.vars.set(name, {
                  type: 'closure',
                  idx: closureIdx,
                  localIdx: varIdx,
                  isLexical: isLet || isConst,
                  isConst: isConst
                })
              } else {
                targetScope.vars.set(name, {
                  type: 'local',
                  idx: varIdx,
                  localIdx: varIdx,
                  isLexical: isLet || isConst,
                  isConst: isConst
                })
              }
              
              // Emit set_loc_uninitialized for let/const
              // QuickJS WASM does not emit this for top-level eval variables?
              // if (isLet || isConst) {
              //    this.compiler.emitOp(this.funcDef!, Opcode.OP_set_loc_uninitialized)
              //    this.compiler.emitU16(this.funcDef!, varIdx)
              // }
            }
          }
        }
      } else if (ts.isClassDeclaration(n)) {
        if (n.name) {
          const name = n.name.text
          console.log(`hoistVariables class: ${name} isModule=${isModule}`)
          
          const currentScope = this.scopeManager.currentScope

          if (!currentScope.vars.has(name)) {
            const isConst = true
            const isLexical = true
            const scopeLevel = currentScope.scopeIndex
            console.log(`hoistVariables: adding ${name} to scopeLevel=${scopeLevel}`)
            
            let varIdx: number
            if (isModule && false) { // Class is const, so always add
              varIdx = -1
            } else {
              // Class name is a normal const variable in the block scope
              varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLexical, scopeLevel, JSVarKind.JS_VAR_NORMAL)
            }
             
            if (isModule) {
              console.log(`Adding closure var for class ${name} (module)`)
              const nameAtom = this.compiler.addAtom(name)
              // QuickJS seems to mark class name closure var as not const (mutable binding?)
              const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, JSVarKind.JS_VAR_NORMAL, false, isLexical)
              currentScope.vars.set(name, {
                type: 'closure',
                idx: closureIdx,
                localIdx: varIdx,
                isLexical: isLexical,
                isConst: isConst
              })
            } else {
              currentScope.vars.set(name, {
                type: 'local',
                idx: varIdx,
                localIdx: varIdx,
                isLexical: isLexical,
                isConst: isConst
              })
            }
          }

          const parentScopeIdx = currentScope.scopeIndex
          console.log(`hoistVariables: parentScopeIdx=${parentScopeIdx} first=${this.funcDef!.scopes[parentScopeIdx]?.first}`)

          // Allocate scopes
          // QuickJS WASM only allocates one extra scope for class body?
          // const nameScopeIndex = this.funcDef!.scopeCount++
          const nameScopeIndex = -1
          
          const bodyScopeIndex = this.funcDef!.scopeCount++
          // Link bodyScope to parentScope
          // Always initialize because scopes are pre-allocated in constructor
          const parentFirst = this.funcDef!.scopes[parentScopeIdx] ? this.funcDef!.scopes[parentScopeIdx].first : -1
          this.funcDef!.scopes[bodyScopeIndex] = { first: parentFirst, parent: parentScopeIdx }

          this.nodeScopeMap.set(n, [nameScopeIndex, bodyScopeIndex])

          // 1. Add Inner Variable (Animal) to Name Scope
          // QuickJS WASM seems to skip adding inner variable for class declarations?
          // It uses the outer variable instead.
          // const innerVarIdx = this.compiler.addVar(this.funcDef!, name, true, true, nameScopeIndex, JSVarKind.JS_VAR_NORMAL)
          const innerVarIdx = -1
          
          // if (nameScopeIndex !== -1 && !this.scopeManager.ars.has(nameScopeIndex)) {
          //   this.scopeManager.ars.set(nameScopeIndex, [])
          // }
          /*
          this.scopeManager.ars.get(nameScopeIndex)!.push({
            name: name,
            info: {
                type: 'local',
                idx: innerVarIdx,
                localIdx: innerVarIdx,
                isLexical: true,
                isConst: true
            }
          })
          */

          // 2. Add <class_fields_init> to Body Scope
          const fieldsInitName = '<class_fields_init>'
          const fieldsInitIdx = this.compiler.addVar(this.funcDef!, fieldsInitName, true, true, bodyScopeIndex, JSVarKind.JS_VAR_NORMAL)
          
          this.scopeManager.addPreHoistedVar(bodyScopeIndex, fieldsInitName, {
            type: 'local',
            idx: fieldsInitIdx,
            localIdx: fieldsInitIdx,
            isLexical: true,
            isConst: true
          })
          console.log('DEBUG: End of ClassDeclaration handling in hoistVariables')
        }
      }
    })
  }
}
