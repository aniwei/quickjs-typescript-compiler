// class-extends-static.ts
export class Base {
  foo() { return 1 }
  static sf() { return 'B' }
}

export class Derived extends Base {
  bar() { return 2 }
  static sd() { return 'D' }
}
