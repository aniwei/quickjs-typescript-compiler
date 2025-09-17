// tdz-basic.ts
// Accessing a let before initialization should throw (simplified TDZ)
export function tdz() {
  let a: number
  // @ts-ignore intentional TDZ access for bytecode test
  return a
}
