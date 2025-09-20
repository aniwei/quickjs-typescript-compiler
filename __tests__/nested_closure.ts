"use strict";
function outer(a: number) {
  return function mid(b: number) {
    return function inner(c: number) {
      return a + b + c
    }
  }
}
const f_nested = outer(1)(2)
