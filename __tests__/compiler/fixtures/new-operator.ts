function MyClass(this) {
  this.x = 10;
}
var n_obj = new (MyClass)();
console.log(n_obj.x);
