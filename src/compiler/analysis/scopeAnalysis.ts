import * as ts from 'typescript'
import { AtomTable, Atom } from '../../atoms'
import { FunctionDef } from '../../functionDef'
import { ScopeManager } from '../../scopeManager'
import { ScopeKind } from '../../scopes'
import { VarDeclarationKind, Var, ClosureVar } from '../../vars'

export class ScopeAnalyzer {
  private functionStack: FunctionDef[] = []
  public readonly scopeManagers: Map<FunctionDef, ScopeManager> = new Map()
  public readonly nodeToFunctionDef = new Map<ts.Node, FunctionDef>()
  public readonly nodeToScope = new Map<ts.Node, number>()
  public readonly identifierToVar = new Map<ts.Node, { varIndex: number, isLocal: boolean, isGlobal: boolean, functionDef: FunctionDef, declarationKind: VarDeclarationKind }>()

  constructor(
    private readonly sourceFile: ts.SourceFile,
    private readonly atomTable: AtomTable,
    private readonly rootFunction: FunctionDef
  ) {
    this.functionStack.push(rootFunction)
    this.scopeManagers.set(rootFunction, new ScopeManager(rootFunction))
    this.nodeToFunctionDef.set(sourceFile, rootFunction)
  }

  public analyze() {
    this.visit(this.sourceFile)
    this.assignSlots(this.rootFunction)
  }

  private visit(node: ts.Node) {
    const currentFunction = this.functionStack[this.functionStack.length - 1]
    const scopeManager = this.scopeManagers.get(currentFunction)!

    switch (node.kind) {
      case ts.SyntaxKind.FunctionDeclaration:
      case ts.SyntaxKind.FunctionExpression:
      case ts.SyntaxKind.ArrowFunction:
        this.handleFunction(node as ts.FunctionLikeDeclaration, currentFunction)
        break
      case ts.SyntaxKind.Block:
        const scopeIndex = scopeManager.enterScope(ScopeKind.Block)
        this.nodeToScope.set(node, scopeIndex)
        ts.forEachChild(node, n => this.visit(n))
        scopeManager.leaveScope()
        break
      case ts.SyntaxKind.VariableDeclarationList:
        this.handleVariableDeclarationList(node as ts.VariableDeclarationList, scopeManager)
        break
      case ts.SyntaxKind.CatchClause:
        this.handleCatchClause(node as ts.CatchClause, scopeManager)
        break
      case ts.SyntaxKind.ClassDeclaration:
        this.handleClassDeclaration(node as ts.ClassDeclaration, scopeManager)
        break
      case ts.SyntaxKind.Constructor:
      case ts.SyntaxKind.MethodDeclaration:
      case ts.SyntaxKind.GetAccessor:
      case ts.SyntaxKind.SetAccessor:
        this.handleFunction(node as ts.FunctionLikeDeclaration, currentFunction)
        break
      case ts.SyntaxKind.Identifier:
        this.resolveReference(node as ts.Identifier)
        break
      default:
        ts.forEachChild(node, n => this.visit(n))
    }
  }

  private handleFunction(node: ts.FunctionLikeDeclaration, parentFunction: FunctionDef) {
    let nameAtom = this.atomTable.getAtomId('<anonymous>')
    if (node.name && ts.isIdentifier(node.name)) {
      nameAtom = this.atomTable.getAtomId(node.name.text)
    }

    // Handle FunctionDeclaration name binding in parent scope
    if (ts.isFunctionDeclaration(node) && node.name && ts.isIdentifier(node.name)) {
      const atom = this.atomTable.getAtomId(node.name.text)
      const parentScopeManager = this.scopeManagers.get(parentFunction)!
      const variable = new Var(atom, { declarationKind: VarDeclarationKind.Function })
      const varIndex = parentFunction.addVar(variable)
      parentScopeManager.bindVariable(varIndex, atom, VarDeclarationKind.Function)
    }

    const newFunc = new FunctionDef(nameAtom, this.sourceFile.text, this.sourceFile.fileName)
    parentFunction.appendChild(newFunc)
    this.nodeToFunctionDef.set(node, newFunc)

    const scopeManager = new ScopeManager(newFunc)
    this.scopeManagers.set(newFunc, scopeManager)
    this.functionStack.push(newFunc)

    // Handle derived constructor variables
    if (ts.isConstructorDeclaration(node)) {
      const classDecl = node.parent as ts.ClassDeclaration
      const isDerived = classDecl.heritageClauses && classDecl.heritageClauses.length > 0
      
      if (isDerived) {
        const thisAtom = this.atomTable.getAtomId('this')
        const thisVar = new Var(thisAtom, { declarationKind: VarDeclarationKind.Let })
        const thisIndex = newFunc.addVar(thisVar)
        scopeManager.bindVariable(thisIndex, thisAtom, VarDeclarationKind.Let)
        
        const newTargetAtom = this.atomTable.getAtomId('new_target')
        const newTargetVar = new Var(newTargetAtom, { declarationKind: VarDeclarationKind.Var })
        const newTargetIndex = newFunc.addVar(newTargetVar)
        scopeManager.bindVariable(newTargetIndex, newTargetAtom, VarDeclarationKind.Var)

        const thisActiveAtom = this.atomTable.getAtomId('this_active_func')
        const thisActiveVar = new Var(thisActiveAtom, { declarationKind: VarDeclarationKind.Var })
        const thisActiveIndex = newFunc.addVar(thisActiveVar)
        scopeManager.bindVariable(thisActiveIndex, thisActiveAtom, VarDeclarationKind.Var)

        const hasFields = classDecl.members.some(m => ts.isPropertyDeclaration(m))
        if (hasFields) {
             const classFieldsAtom = this.atomTable.getAtomId('class_fields_init')
             this.resolveUpvalue(node, classFieldsAtom, this.functionStack.length - 2)
        }
      }
    }

    // Parameters
    node.parameters.forEach(param => {
      if (ts.isIdentifier(param.name)) {
        const atom = this.atomTable.getAtomId(param.name.text)
        const variable = new Var(atom, { declarationKind: VarDeclarationKind.Parameter })
        const varIndex = newFunc.addArg(variable)
        scopeManager.bindArgumentToCurrentScope(atom, varIndex)
      }
    })

    // Body
    if (node.body) {
      this.visit(node.body)
    }

    this.assignSlots(newFunc)

    this.functionStack.pop()
  }

  private assignSlots(func: FunctionDef) {
    let nextLocalSlot = 0
    for (const variable of func.vars) {
      variable.localSlot = nextLocalSlot++
    }
  }

  private handleVariableDeclarationList(node: ts.VariableDeclarationList, scopeManager: ScopeManager) {
    const isLet = (node.flags & ts.NodeFlags.Let) !== 0
    const isConst = (node.flags & ts.NodeFlags.Const) !== 0
    const kind = isConst ? VarDeclarationKind.Const : (isLet ? VarDeclarationKind.Let : VarDeclarationKind.Var)

    node.declarations.forEach(decl => {
      this.handleVariableDeclaration(decl, scopeManager, kind)
    })
  }

  private handleCatchClause(node: ts.CatchClause, scopeManager: ScopeManager) {
    const scopeIndex = scopeManager.enterScope(ScopeKind.Block)
    this.nodeToScope.set(node, scopeIndex)
    
    if (node.variableDeclaration) {
      this.handleVariableDeclaration(node.variableDeclaration, scopeManager, VarDeclarationKind.Let)
    }
    
    this.visit(node.block)
    scopeManager.leaveScope()
  }

  private handleClassDeclaration(node: ts.ClassDeclaration, scopeManager: ScopeManager) {
    if (node.name) {
      const atom = this.atomTable.getAtomId(node.name.text)
      const currentFunction = this.functionStack[this.functionStack.length - 1]
      const variable = new Var(atom, { declarationKind: VarDeclarationKind.Let })
      const varIndex = currentFunction.addVar(variable)
      scopeManager.bindVariable(varIndex, atom, VarDeclarationKind.Let)
      
      this.identifierToVar.set(node.name, {
        varIndex,
        isLocal: true,
        isGlobal: currentFunction.isGlobalVar,
        functionDef: currentFunction,
        declarationKind: VarDeclarationKind.Let
      })
    }

    const hasFields = node.members.some(m => ts.isPropertyDeclaration(m))
    if (hasFields) {
       const atom = this.atomTable.getAtomId('class_fields_init')
       const currentFunction = this.functionStack[this.functionStack.length - 1]
       const variable = new Var(atom, { declarationKind: VarDeclarationKind.Const })
       const varIndex = currentFunction.addVar(variable)
       scopeManager.bindVariable(varIndex, atom, VarDeclarationKind.Const)
    }

    node.members.forEach(member => {
        this.visit(member)
    })
  }

  private handleVariableDeclaration(node: ts.VariableDeclaration, scopeManager: ScopeManager, kind: VarDeclarationKind) {
    if (ts.isIdentifier(node.name)) {
      const atom = this.atomTable.getAtomId(node.name.text)
      const currentFunction = this.functionStack[this.functionStack.length - 1]
      const variable = new Var(atom, { declarationKind: kind })
      const varIndex = currentFunction.addVar(variable)
      scopeManager.bindVariable(varIndex, atom, kind)
      
      this.identifierToVar.set(node.name, {
        varIndex,
        isLocal: true,
        isGlobal: currentFunction.isGlobalVar,
        functionDef: currentFunction,
        declarationKind: kind
      })
    }
    if (node.initializer) {
      this.visit(node.initializer)
    }
  }

  private resolveReference(node: ts.Identifier) {
    if (this.isNonVariableReference(node)) return

    const atom = this.atomTable.getAtomId(node.text)
    const currentFunction = this.functionStack[this.functionStack.length - 1]
    const currentScopeManager = this.scopeManagers.get(currentFunction)!

    const localBinding = currentScopeManager.lookup(atom)
    if (localBinding) {
      this.identifierToVar.set(node, {
        varIndex: localBinding.binding.index,
        isLocal: true,
        isGlobal: currentFunction.isGlobalVar,
        functionDef: currentFunction,
        declarationKind: localBinding.binding.kind
      })
      return // Found local
    }

    // Look in parent functions
    this.resolveUpvalue(node, atom, this.functionStack.length - 2)
  }

  private resolveUpvalue(node: ts.Node, atom: Atom, functionIndex: number) {
    if (functionIndex < 0) return // Global or not found

    const func = this.functionStack[functionIndex]
    const scopeManager = this.scopeManagers.get(func)!
    const binding = scopeManager.lookup(atom)

    if (binding) {
      // Found in parent!
      const variable = func.vars[binding.binding.index]
      variable.isCaptured = true

      // Propagate capture
      let lastClosureIndex = binding.binding.index
      let isLocal = true

      for (let i = functionIndex + 1; i < this.functionStack.length; i++) {
        const childFunc = this.functionStack[i]
        
        // Check if already captured
        let existingIndex = -1
        for(let k=0; k<childFunc.closureVars.length; k++) {
            const cv = childFunc.closureVars[k]
            if (cv.name === atom) { // Assuming atom equality implies same variable for now
                existingIndex = k
                break
            }
        }

        if (existingIndex !== -1) {
            lastClosureIndex = existingIndex
            isLocal = false
            continue
        }

        const closureVar = new ClosureVar(atom, {
          isLocal: isLocal,
          varIndex: lastClosureIndex,
          isConst: variable.isConst,
          isLexical: variable.isLexical,
          kind: variable.kind
        })
        
        lastClosureIndex = childFunc.addClosureVar(closureVar)
        isLocal = false
      }
      
      // Record mapping for the node in the current function (which is the last childFunc)
      const currentFunction = this.functionStack[this.functionStack.length - 1]
      this.identifierToVar.set(node, {
          varIndex: lastClosureIndex,
          isLocal: false, // It's a closure capture in the current function
          isGlobal: false,
          functionDef: currentFunction,
          declarationKind: variable.declarationKind
      })

    } else {
      this.resolveUpvalue(node, atom, functionIndex - 1)
    }
  }

  private isNonVariableReference(node: ts.Identifier): boolean {
    const parent = node.parent
    if (ts.isPropertyAccessExpression(parent) && parent.name === node) return true
    if (ts.isPropertyAssignment(parent) && parent.name === node) return true
    if (ts.isMethodDeclaration(parent) && parent.name === node) return true
    if ((ts.isFunctionDeclaration(parent) || ts.isFunctionExpression(parent)) && parent.name === node) return true
    if (ts.isParameter(parent) && parent.name === node) return true
    return false
  }
}
