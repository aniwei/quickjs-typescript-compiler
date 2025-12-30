// 组合：generator + yield*
function* g67() {
    yield 67;
    yield* [1, 2, 3];
    return 67 + 1;
}
let t = 0;
for (const v of g67())
    t += v;
console.log(t);
