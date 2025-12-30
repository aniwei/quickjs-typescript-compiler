try {
  throw new Error('boom')
} catch {
  console.log('caught without binding')
}
