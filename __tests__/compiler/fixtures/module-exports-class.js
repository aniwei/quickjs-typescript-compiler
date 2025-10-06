function CounterImpl(initial = 0) {
  this.value = initial
}

CounterImpl.prototype.increment = function (step = 1) {
  this.value += step
  return this.value
}

export const Counter = CounterImpl

const sharedCounter = new Counter(10)
sharedCounter.value = sharedCounter.increment(2)

export function createCounter(initial = 0) {
  const counter = new Counter(initial)
  counter.value *= 2
  return counter
}

export { sharedCounter }
export default sharedCounter
