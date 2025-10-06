export default function namedDefault(value: number): number {
  return value + 1
}

export function multiply(value: number, factor: number = 2): number {
  return value * factor
}

const answer = 42
export { answer as ultimateAnswer }
