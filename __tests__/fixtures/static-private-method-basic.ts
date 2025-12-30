// ES2022: static private methods / fields
class Counter {
  static #count = 0

  static #bump() {
    this.#count += 1
  }

  static inc() {
    this.#bump()
    return this.#count
  }
}

console.log(Counter.inc())
console.log(Counter.inc())
