// 组合：generator + yield*
function* g10() {
    yield 10;
    yield* [1, 2, 3];
    return 10 + 1;
}
let t = 0;
for (const v of g10())
    t += v;
console.log(t);
