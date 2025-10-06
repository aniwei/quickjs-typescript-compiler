export interface CounterInstance {
  value: number
  increment(step?: number): number
}

type CounterConstructor = new (initial?: number) => CounterInstance

function CounterImpl(this: CounterInstance, initial: number = 0) {
  this.value = initial
}

CounterImpl.prototype.increment = function (this: CounterInstance, step: number = 1): number {
  this.value += step
  return this.value
}

export const Counter: CounterConstructor = CounterImpl as unknown as CounterConstructor

const sharedCounter: CounterInstance = new Counter(10)
sharedCounter.value = sharedCounter.increment(2)

export function createCounter(initial: number = 0): CounterInstance {
  const counter = new Counter(initial)
  counter.value *= 2
  return counter
}

export { sharedCounter }
export default sharedCounter
