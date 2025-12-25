// 组合：template literal + tagged template
function tag9(s, ...v) { return s[0].length + v.length; }
const x = 9%10;
const r1 = tag9`a${x}b`;
const r2 = tag9`no_subs`;
console.log(r1, r2);
