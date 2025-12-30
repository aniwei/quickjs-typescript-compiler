// ES2022: static block + static private field
class Counter {
	static #x = 1
	static y = 0

	static {
		this.y = this.#x + 10
	}

	static getY() {
		return this.y
	}
}

console.log(Counter.getY())
