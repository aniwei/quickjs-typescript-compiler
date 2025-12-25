// 组合：try/catch/finally + throw + instanceof + new
function C98() { this.v = 98; }
let out = 0;
try {
  const x = new C98();
  if (!(x instanceof C98)) throw 'bad';
  out = x.v;
  if (98%7===0) throw 98;
} catch (e) {
  out = (typeof e === 'number') ? e + 1 : -1;
} finally {
  out += 10;
}
console.log(out);
