// 组合：try/catch/finally + throw + instanceof + new
function C22() { this.v = 22; }
let out = 0;
try {
    const x = new C22();
    if (!(x instanceof C22))
        throw 'bad';
    out = x.v;
    if (22 % 7 === 0)
        throw 22;
}
catch (e) {
    out = (typeof e === 'number') ? e + 1 : -1;
}
finally {
    out += 10;
}
console.log(out);
