// 组合：async/await + promise chain (no top-level await)
async function run63() {
    const p = Promise.resolve(63);
    const a = await p;
    const b = await Promise.resolve(a + 1);
    return b * 2;
}
run63().then(v => console.log(v));
