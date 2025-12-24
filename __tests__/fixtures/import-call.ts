// dynamic import() coverage
async function main() {
  const m1 = await import('./dep1.js')
  // with import assertions/options (2nd arg)
  const m2 = await import('./dep2.js', { assert: { type: 'json' } } as any)
  return [m1, m2]
}

void main()
