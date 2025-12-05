function* gen(x) {
    yield x;
    yield x + 1;
    return x + 2;
}

const g = gen(10);
g.next();
g.next();
g.next();
