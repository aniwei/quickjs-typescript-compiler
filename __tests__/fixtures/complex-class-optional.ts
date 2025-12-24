class Box {
  #v = 0

  constructor(v: any) {
    this.#v = v
  }

  inc() {
    this.#v++
    return this
  }

  get value() {
    return this.#v
  }

  static #seed = 1

  static {
    this.#seed = this.#seed + 1
  }

  static make(n: any) {
    return new Box(n)
  }
}

const b = Box.make(1).inc().inc()

const obj = {
  box: b,
  maybe: null,
}

let v = obj.maybe?.value ?? obj.box?.value

v ||= 0
v &&= 7

v
