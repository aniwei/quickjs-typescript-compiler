'use strict'

export function breakClose(arr: number[]) {
  for (const v of arr) {
    break
  }
}

export function returnClose(arr: number[]) {
  for (const v of arr) {
    return v
  }
  return -1
}
