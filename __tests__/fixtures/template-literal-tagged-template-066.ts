// 组合：template literal + tagged template
function tag66(s, ...v) { return s[0].length + v.length; }
const x = 66%10;
const r1 = tag66`a${x}b`;
const r2 = tag66`no_subs`;
console.log(r1, r2);
