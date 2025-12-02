function greet() {
  return 'trace-smoke'
}

if (greet() !== 'trace-smoke') {
  throw new Error('trace guardrail failed')
}
