async function foo(x: number) {
    return await bar(x);
}

async function bar(y: number) {
    return y + 1;
}

const baz = async (z: number) => {
    return await foo(z);
};

(async function() {
    await baz(10);
})();
