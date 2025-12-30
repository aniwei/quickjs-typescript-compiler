const obj = {
  x: 1,
  add(y) {
    return this.x + y;
  }
};
console.log(obj.add(2));
