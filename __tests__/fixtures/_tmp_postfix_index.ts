// Repro for postfix ++ used as array index
function f(this: any) {
  this.__values__ = [1, 2, 3]
  this.__index__ = 0
  const t = this.__index__ >= this.__values__.length
  return { done: t, value: t ? undefined : this.__values__[this.__index__++] }
}
