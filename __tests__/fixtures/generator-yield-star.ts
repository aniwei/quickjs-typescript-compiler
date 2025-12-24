function* gen() {
  yield 1
  yield 2
  yield 3
  return 4
}

const it = gen()
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next().value)
