function assert(actual, expected, message) {
    if (arguments.length == 1)
        expected = true;

    if (Object.is(actual, expected))
        return;

    if (actual !== null && expected !== null
    &&  typeof actual == 'object' && typeof expected == 'object'
    &&  actual.toString() === expected.toString())
        return;

    throw Error("assertion failed: got |" + actual + "|" +
                ", expected |" + expected + "|" +
                (message ? " (" + message + ")" : ""));
}

function test_regexp_skip()
{
    var a, b;
    [a, b = /abc\(/] = [1];
    assert(a === 1);

    [a, b =/abc\(/] = [2];
    assert(a === 2);
}