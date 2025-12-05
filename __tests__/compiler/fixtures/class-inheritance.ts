class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    speak() {
        console.log(this.name);
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    bark() {
        console.log("Woof! " + this.breed);
    }
}

const d = new Dog("Rex", "German Shepherd");
d.speak();
d.bark();
