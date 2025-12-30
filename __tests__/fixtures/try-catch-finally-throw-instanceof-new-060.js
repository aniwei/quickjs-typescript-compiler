// 组合：try/catch/finally + throw + instanceof + new
function C60() { this.v = 60; }
let out = 0;
try {
    const x = new C60();
    if (!(x instanceof C60))
        throw 'bad';
    out = x.v;
    if (60 % 7 === 0)
        throw 60;
}
catch (e) {
    out = (typeof e === 'number') ? e + 1 : -1;
}
finally {
    out += 10;
}
console.log(out);
