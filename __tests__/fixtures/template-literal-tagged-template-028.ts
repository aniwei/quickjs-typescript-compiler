// 组合：template literal + tagged template
function tag28(s, ...v) { return s[0].length + v.length; }
const x = 28%10;
const r1 = tag28`a${x}b`;
const r2 = tag28`no_subs`;
console.log(r1, r2);
