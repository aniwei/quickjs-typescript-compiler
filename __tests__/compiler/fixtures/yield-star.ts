function* gen(x) {
    yield x;
    yield* gen(x - 1);
}
const g = gen(2);
g.next();
g.next();
