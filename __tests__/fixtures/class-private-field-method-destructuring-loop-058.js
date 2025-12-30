// 组合：class + private field + method + destructuring + loop
class Acc58 {
    #x = 58;
    add(v) { this.#x += v; return this.#x; }
    getX() { return this.#x; }
}
const a = new Acc58();
let sum = 0;
for (let i = 0; i < 3; i++) {
    sum += a.add(i);
}
const { add } = { add: (x, y) => x + y };
console.log(a.getX(), sum, add(1, 2));
