// 组合：async/await + promise chain (no top-level await)
async function run82() {
    const p = Promise.resolve(82);
    const a = await p;
    const b = await Promise.resolve(a + 1);
    return b * 2;
}
run82().then(v => console.log(v));
