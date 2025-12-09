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

    const varStmts: ts.VariableStatement[] = []
    const fnDecls: ts.FunctionDeclaration[] = []
    const classDecls: ts.ClassDeclaration[] = []

    ts.forEachChild(node, n => {
      if (ts.isVariableStatement(n)) {
        varStmts.push(n)
      } else if (ts.isFunctionDeclaration(n)) {
        fnDecls.push(n)
      } else if (ts.isClassDeclaration(n)) {
        classDecls.push(n)
      }
    })

    // 1) 变量先处理，保证 let/var 在函数声明之前（匹配 QuickJS 原始顺序）
    for (const n of varStmts) {
      const isLet = (n.declarationList.flags & ts.NodeFlags.Let) !== 0
      const isConst = (n.declarationList.flags & ts.NodeFlags.Const) !== 0

      for (const decl of n.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name)) continue
        const name = decl.name.text

        let targetScope = this.scopeManager.currentScope
        let targetScopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1

        if (!isLet && !isConst && !treatAsContextVar) {
          for (let i = this.scopeManager.stackDepth - 1; i >= 0; i--) {
            const scope = this.scopeManager.getScope(i)
            if (scope.type === 'function' || scope.type === 'module') {
              targetScope = scope
              targetScopeLevel = i - this.funcDef!.scopeLevel
              break
            }
          }
        }

        if (targetScope.vars.has(name)) continue

        let varIdx: number
        if (treatAsContextVar) {
          // 顶层脚本/模块：仍然分配 local，以便子函数可捕获
          varIdx = this.compiler.addVar(this.funcDef!, name, isConst, isLet || isConst, targetScopeLevel, JSVarKind.JS_VAR_NORMAL, false, true)
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
            isConst
          })
        } else {
          targetScope.vars.set(name, {
            type: 'local',
            idx: varIdx,
            localIdx: varIdx,
            isLexical: isLet || isConst,
            isConst
          })
        }
      }
    }

    // 2) 函数声明
    for (const n of fnDecls) {
      if (ts.isFunctionDeclaration(n) && n.name) {
        const name = n.name.text

        let targetScope = this.scopeManager.currentScope
        let targetScopeLevel = this.scopeManager.stackDepth - this.funcDef!.scopeLevel - 1

        if (!treatAsContextVar) {
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
          // 模块/脚本顶层函数声明：QuickJS 视为 var 绑定，使用 JS_VAR_NORMAL + 非 lexical；非顶层保持 JS_VAR_FUNCTION_DECL
          const isLexical = treatAsContextVar ? false : true
          const varKind = treatAsContextVar ? JSVarKind.JS_VAR_NORMAL : JSVarKind.JS_VAR_FUNCTION_DECL

          let varIdx: number
          if (treatAsContextVar) {
            varIdx = this.compiler.addVar(this.funcDef!, name, false, isLexical, targetScopeLevel, varKind, false, true)
          } else {
            varIdx = this.compiler.addVar(this.funcDef!, name, false, isLexical, targetScopeLevel, varKind)
          }

          if (treatAsContextVar) {
            const nameAtom = this.compiler.addAtom(name)
            const closureIdx = this.compiler.addClosureVarWithAtom(this.funcDef!, nameAtom, true, false, varIdx, varKind, false, isLexical)
            targetScope.vars.set(name, {
              type: 'closure',
              idx: closureIdx,
              localIdx: varIdx,
              isLexical,
              isConst: false
            })
          } else {
            targetScope.vars.set(name, {
              type: 'local',
              idx: varIdx,
              localIdx: varIdx,
              isLexical,
              isConst: false
            })
          }
        }
      }
    }

    // 3) 类声明
    for (const n of classDecls) {
      if (ts.isClassDeclaration(n) && n.name) {
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
              isLexical,
              isConst
            })
          } else {
            currentScope.vars.set(name, {
              type: 'local',
              idx: varIdx,
              localIdx: varIdx,
              isLexical,
              isConst
            })
          }
        }

        const parentScopeIdx = currentScope.scopeIndex
        console.log(`hoistVariables: parentScopeIdx=${parentScopeIdx} first=${this.funcDef!.scopes[parentScopeIdx]?.first}`)

        const nameScopeIndex = -1
        const bodyScopeIndex = this.funcDef!.scopeCount++
        const parentFirst = this.funcDef!.scopes[parentScopeIdx] ? this.funcDef!.scopes[parentScopeIdx].first : -1
        this.funcDef!.scopes[bodyScopeIndex] = { first: parentFirst, parent: parentScopeIdx }

        this.nodeScopeMap.set(n, [nameScopeIndex, bodyScopeIndex])

        const hasInstanceFields = n.members.some(m => 
          ts.isPropertyDeclaration(m) && 
          !m.modifiers?.some(mod => mod.kind === ts.SyntaxKind.StaticKeyword)
        )

        if (hasInstanceFields) {
          const fieldsInitName = '<class_fields_init>'
          const fieldsInitIdx = this.compiler.addVar(this.funcDef!, fieldsInitName, true, true, bodyScopeIndex, JSVarKind.JS_VAR_NORMAL)
          
          this.scopeManager.addPreHoistedVar(bodyScopeIndex, fieldsInitName, {
            type: 'local',
            idx: fieldsInitIdx,
            localIdx: fieldsInitIdx,
            isLexical: true,
            isConst: true
          })
        }
      }
    }
  }
}
