'use strict'

export const inc = (x: number) => x + 1

export const sum = (...args: number[]) => args.reduce((a,b)=>a+b, 0)

export const usesThis = function(this: { base: number }, y: number) {
  const f = (z: number) => this.base + z + y
  return f(1)
}
