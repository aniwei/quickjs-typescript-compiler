class Base {
  baseField = 1;
  constructor() {
    console.log('Base constructor');
  }
}

class Derived extends Base {
  #privateField = 2;
  publicField = 3;
  static staticField = 4;

  static {
    console.log('Static block');
  }

  constructor() {
    super();
    console.log(this.#privateField);
  }

  get prop() {
    return this.publicField;
  }

  set prop(v) {
    this.publicField = v;
  }
}

const d = new Derived();
console.log(d.prop);
