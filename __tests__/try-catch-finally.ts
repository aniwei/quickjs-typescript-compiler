'use strict'

export function tcf(a: number) {
  try {
    if (a > 0) throw new Error('x')
  } catch (e) {
    a = a + 1
  } finally {
    a = a + 2
  }
  return a
}
