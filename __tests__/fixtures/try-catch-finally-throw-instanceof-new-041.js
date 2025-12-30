// 组合：try/catch/finally + throw + instanceof + new
function C41() { this.v = 41; }
let out = 0;
try {
    const x = new C41();
    if (!(x instanceof C41))
        throw 'bad';
    out = x.v;
    if (41 % 7 === 0)
        throw 41;
}
catch (e) {
    out = (typeof e === 'number') ? e + 1 : -1;
}
finally {
    out += 10;
}
console.log(out);
