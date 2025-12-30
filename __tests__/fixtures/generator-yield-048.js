// 组合：generator + yield*
function* g48() {
    yield 48;
    yield* [1, 2, 3];
    return 48 + 1;
}
let t = 0;
for (const v of g48())
    t += v;
console.log(t);
