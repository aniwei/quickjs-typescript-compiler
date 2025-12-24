function Plain() {
  return new.target
}

function Ctor() {
  return new.target === Ctor
}

console.log(Plain() === undefined)
console.log(new (Plain as any)() === Plain)
console.log(new (Ctor as any)() === true)
