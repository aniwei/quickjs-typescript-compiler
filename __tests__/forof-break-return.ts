'use strict'

export function sumFirst(arr: number[]) {
  let total = 0
  for (const v of arr) {
    total += v
    break
  }
  return total
}

export function earlyReturn(arr: number[]) {
  for (const v of arr) {
    if (v > 10) return v
  }
  return -1
}
