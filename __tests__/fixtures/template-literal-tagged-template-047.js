// 组合：template literal + tagged template
function tag47(s, ...v) { return s[0].length + v.length; }
const x = 47 % 10;
const r1 = tag47 `a${x}b`;
const r2 = tag47 `no_subs`;
console.log(r1, r2);
