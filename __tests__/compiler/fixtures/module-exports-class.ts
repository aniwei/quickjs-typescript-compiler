export class Counter {
  private value

  constructor(initial = 0) {
    this.value = initial
  }

  increment(step = 1) {
    this.value += step
    return this.value
  }

  get current() {
    return this.value
  }
}

export function createCounter(initial = 0) {
  return new Counter(initial)
}

export const sharedCounter = new Counter(42)

export default class DefaultCounter extends Counter {
  constructor() {
    super(0)
  }
}
