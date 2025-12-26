import ts from 'typescript'

function inspect(code: string) {
  const sf = ts.createSourceFile('x.ts', code, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS)
  let found: ts.YieldExpression | null = null

  function walk(n: ts.Node) {
    if (ts.isYieldExpression(n)) found = n
    ts.forEachChild(n, walk)
  }

  walk(sf)

  console.log('\ncode:', JSON.stringify(code))
  if (!found) {
    console.log('no yield found')
    return
  }

  console.log('yieldText:', found.getText(sf))
  console.log('hasAsteriskToken:', Boolean((found as any).asteriskToken))
  console.log('asteriskTokenKind:', (found as any).asteriskToken?.kind)
  console.log('expressionKind:', found.expression?.kind)
}

inspect('function* g(){ yield* [1,2,3]; }')
inspect('function* g(){ yield * [1,2,3]; }')
inspect('function* g(){ yield /*c*/ * [1,2,3]; }')
inspect('function* g(){ yield\n* [1,2,3]; }')
