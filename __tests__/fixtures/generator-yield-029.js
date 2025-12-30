// 组合：generator + yield*
function* g29() {
    yield 29;
    yield* [1, 2, 3];
    return 29 + 1;
}
let t = 0;
for (const v of g29())
    t += v;
console.log(t);
