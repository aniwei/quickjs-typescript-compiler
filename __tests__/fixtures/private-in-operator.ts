// ES2022: private brand check (#x in obj)
// NOTE: This is supported only if the underlying QuickJS build supports the syntax.
class Box {
  #value = 1

  hasValue(obj: any) {
    return #value in obj
  }
}

const b = new Box()
console.log(b.hasValue(b))
console.log(b.hasValue({}))
