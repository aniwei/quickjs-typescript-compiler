// ES2022: private methods (#m)
class Counter {
  #count = 0

  #bump(delta: number) {
    this.#count += delta
    return this.#count
  }

  inc() {
    return this.#bump(1)
  }
}

const c = new Counter()
console.log(c.inc())
console.log(c.inc())
