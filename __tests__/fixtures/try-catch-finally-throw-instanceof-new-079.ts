// 组合：try/catch/finally + throw + instanceof + new
function C79() { this.v = 79; }
let out = 0;
try {
  const x = new C79();
  if (!(x instanceof C79)) throw 'bad';
  out = x.v;
  if (79%7===0) throw 79;
} catch (e) {
  out = (typeof e === 'number') ? e + 1 : -1;
} finally {
  out += 10;
}
console.log(out);
