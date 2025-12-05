class A {
    #x = 1;
    #y;
    
    constructor() {
        this.#y = 2;
    }
    
    getX() {
        return this.#x;
    }
    
    setX(v) {
        this.#x = v;
    }

    #privateMethod() {
        return 42;
    }

    callPrivate() {
        return this.#privateMethod();
    }
}

const a = new A();
const x = a.getX();
a.setX(10);
const p = a.callPrivate();
