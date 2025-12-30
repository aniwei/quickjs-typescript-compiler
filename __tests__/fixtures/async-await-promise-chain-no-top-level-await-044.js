// 组合：async/await + promise chain (no top-level await)
async function run44() {
    const p = Promise.resolve(44);
    const a = await p;
    const b = await Promise.resolve(a + 1);
    return b * 2;
}
run44().then(v => console.log(v));
