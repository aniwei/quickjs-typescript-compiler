"use strict";
export function add(a: number, b: number) { return a + b }
export function makeAdder(x: number) { return (y: number) => x + y }
const r = add(2, 3) + makeAdder(10)(5)
