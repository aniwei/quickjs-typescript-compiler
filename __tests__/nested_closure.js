"use strict";
function outer(a) {
  return function mid(b) {
    return function inner(c) {
      return a + b + c
    }
  }
}
const f_nested = outer(1)(2)
