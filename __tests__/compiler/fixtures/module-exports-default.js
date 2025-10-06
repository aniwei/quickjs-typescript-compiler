export default function namedDefault(value) {
  return value + 1
}

export function multiply(value, factor = 2) {
  return value * factor
}

const answer = 42
export { answer as ultimateAnswer }
