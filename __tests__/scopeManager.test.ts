import { AtomTable } from '../src/atoms'
import { FunctionDef } from '../src/functionDef'
import { ScopeManager } from '../src/scopeManager'
import { ScopeKind } from '../src/scopes'
import { Var, VarDeclarationKind, VarKind } from '../src/vars'

describe('ScopeManager', () => {
  const atomTable = new AtomTable()
  const moduleFunc = new FunctionDef(atomTable.getAtomId('_module_'), '', 'module.ts')

  const createFunctionScopeManager = () => {
    const func = new FunctionDef(atomTable.getAtomId('fn'), '', 'fn.ts', { parent: moduleFunc })
    const scopeManager = new ScopeManager(func)
    return { func, scopeManager }
  }

  it('binds function-scoped var declarations to the function scope', () => {
    const { func, scopeManager } = createFunctionScopeManager()
    const fooAtom = atomTable.getAtomId('foo')
    const fooVar = new Var(fooAtom, { kind: VarKind.NORMAL })
    const fooIndex = func.addVar(fooVar)

    scopeManager.bindVariable(fooIndex, fooAtom, VarDeclarationKind.Var)

    const info = scopeManager.getBindingInfo(fooAtom)
    expect(info).not.toBeNull()
    expect(info?.scope.kind).toBe(ScopeKind.Function)
  })

  it('hoists var declarations out of block scopes', () => {
    const { func, scopeManager } = createFunctionScopeManager()
    const blockAtom = atomTable.getAtomId('blockVar')
    const blockVar = new Var(blockAtom, { kind: VarKind.NORMAL })
    const blockIndex = scopeManager.enterScope(ScopeKind.Block)
    const varIndex = func.addVar(blockVar)

    scopeManager.bindVariable(varIndex, blockAtom, VarDeclarationKind.Var)
    scopeManager.leaveScope()

    const info = scopeManager.getBindingInfo(blockAtom)
    expect(info).not.toBeNull()
    expect(info?.scope.kind).toBe(ScopeKind.Function)
    expect(info?.scopeIndex).not.toBe(blockIndex)
  })

  it('keeps let/const declarations within their lexical block scope', () => {
    const { func, scopeManager } = createFunctionScopeManager()
    const lexicalAtom = atomTable.getAtomId('lexical')
    const lexicalVar = new Var(lexicalAtom, { isConst: false, isLexical: true })
    const blockIndex = scopeManager.enterScope(ScopeKind.Block)
    const letIndex = func.addVar(lexicalVar)

    scopeManager.bindVariable(letIndex, lexicalAtom, VarDeclarationKind.Let)

    const info = scopeManager.getBindingInfo(lexicalAtom)
    expect(info).not.toBeNull()
    expect(info?.scope.kind).toBe(ScopeKind.Block)

    scopeManager.leaveScope()
  })

  it('binds parameters inside a dedicated parameter scope', () => {
    const { func, scopeManager } = createFunctionScopeManager()
    const paramAtom = atomTable.getAtomId('param')
    const paramVar = new Var(paramAtom, { kind: VarKind.NORMAL })
    const argIndex = func.addArg(paramVar)

    scopeManager.bindArgumentToCurrentScope(paramAtom, argIndex)

    const info = scopeManager.getBindingInfo(paramAtom)
    expect(info).not.toBeNull()
    expect(info?.scope.kind).toBe(ScopeKind.Parameter)
  })
})
