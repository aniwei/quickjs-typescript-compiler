// 组合：template literal + tagged template
function tag85(s, ...v) { return s[0].length + v.length; }
const x = 85 % 10;
const r1 = tag85 `a${x}b`;
const r2 = tag85 `no_subs`;
console.log(r1, r2);
