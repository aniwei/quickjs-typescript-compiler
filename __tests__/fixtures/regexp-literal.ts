// NOTE: QuickJS RegExp literals embed precompiled regexp bytecode blobs.
// We don't emit that yet, so this fixture intentionally avoids /.../.

// `in` operator
const obj: any = { x: 1 }
console.log('x' in obj)
console.log('y' in obj)

// `instanceof` operator + `new`
function C(this: any) {
	this.v = 1
}
const inst = new (C as any)()
console.log(inst instanceof C)
console.log(inst instanceof Object)
