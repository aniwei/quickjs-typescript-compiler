// 组合：try/catch/finally + throw + instanceof + new
function C3() { this.v = 3; }
let out = 0;
try {
    const x = new C3();
    if (!(x instanceof C3))
        throw 'bad';
    out = x.v;
    if (3 % 7 === 0)
        throw 3;
}
catch (e) {
    out = (typeof e === 'number') ? e + 1 : -1;
}
finally {
    out += 10;
}
console.log(out);
