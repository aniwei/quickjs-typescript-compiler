import * as ts from 'typescript'
import { AtomTable } from '../../src/atoms'
import { FunctionDef } from '../../src/functionDef'
import { ScopeAnalyzer } from '../../src/compiler/analysis/scopeAnalysis'
import { VarDeclarationKind } from '../../src/vars'

describe('ScopeAnalyzer', () => {
  function analyze(code: string) {
    const atomTable = new AtomTable()
    const sourceFile = ts.createSourceFile('test.ts', code, ts.ScriptTarget.ES2020, true)
    const rootFunction = new FunctionDef(atomTable.getAtomId('<global>'), code, 'test.ts')
    rootFunction.isGlobalVar = true
    
    const analyzer = new ScopeAnalyzer(sourceFile, atomTable, rootFunction)
    analyzer.analyze()
    
    return { rootFunction, atomTable }
  }

  it('should detect global variables', () => {
    const { rootFunction, atomTable } = analyze(`
      var a = 1;
      let b = 2;
    `)

    expect(rootFunction.vars).toHaveLength(2)
    expect(atomTable.getAtomString(rootFunction.vars[0].name)).toBe('a')
    expect(rootFunction.vars[0].declarationKind).toBe(VarDeclarationKind.Var)
    expect(atomTable.getAtomString(rootFunction.vars[1].name)).toBe('b')
    expect(rootFunction.vars[1].declarationKind).toBe(VarDeclarationKind.Let)
  })

  it('should detect function declarations and their variables', () => {
    const { rootFunction, atomTable } = analyze(`
      function foo() {
        var a = 1;
      }
    `)

    // foo is hoisted to root
    expect(rootFunction.vars).toHaveLength(1) 
    expect(atomTable.getAtomString(rootFunction.vars[0].name)).toBe('foo')
    expect(rootFunction.vars[0].declarationKind).toBe(VarDeclarationKind.Function)

    expect(rootFunction.children).toHaveLength(1)
    const fooFunc = rootFunction.children[0]
    expect(atomTable.getAtomString(fooFunc.funcName)).toBe('foo')
    
    expect(fooFunc.vars).toHaveLength(1)
    expect(atomTable.getAtomString(fooFunc.vars[0].name)).toBe('a')
  })

  it('should detect closure captures', () => {
    const { rootFunction, atomTable } = analyze(`
      function outer() {
        var a = 1;
        function inner() {
          return a;
        }
      }
    `)

    const outerFunc = rootFunction.children[0]
    expect(outerFunc).toBeDefined()
    expect(atomTable.getAtomString(outerFunc.funcName)).toBe('outer')

    // outer has 'a' and 'inner' (hoisted)
    const aVar = outerFunc.vars.find(v => atomTable.getAtomString(v.name) === 'a')
    expect(aVar).toBeDefined()
    
    const innerFunc = outerFunc.children[0]
    expect(innerFunc).toBeDefined()
    expect(atomTable.getAtomString(innerFunc.funcName)).toBe('inner')

    // inner should have a closure var for 'a'
    expect(innerFunc.closureVars).toHaveLength(1)
    expect(atomTable.getAtomString(innerFunc.closureVars[0].name)).toBe('a')
    
    // 'a' in outer should be marked as captured
    expect(aVar?.isCaptured).toBe(true)
  })

  it('should handle parameters', () => {
    const { rootFunction, atomTable } = analyze(`
      function foo(a, b) {}
    `)

    const fooFunc = rootFunction.children[0]
    expect(fooFunc.args).toHaveLength(2)
    expect(atomTable.getAtomString(fooFunc.args[0].name)).toBe('a')
    expect(atomTable.getAtomString(fooFunc.args[1].name)).toBe('b')
  })
})
