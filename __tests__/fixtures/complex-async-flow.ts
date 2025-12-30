async function* gen() {
  yield 1
  yield 2
}

async function run() {
  let sum = 0
  try {
    for await (const x of gen()) {
      sum += x
      if (x === 1) continue
      sum += 10
    }
  } finally {
    sum += 100
  }
  return sum
}

run()
