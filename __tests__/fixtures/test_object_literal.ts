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
function test_object_literal()
{
    var x = 0, get = 1, set = 2; async = 3;
    a = { get: 2, set: 3, async: 4, get a(){ return this.get} };
    assert(JSON.stringify(a), '{"get":2,"set":3,"async":4,"a":2}');
    assert(a.a === 2);

    a = { x, get, set, async };
    assert(JSON.stringify(a), '{"x":0,"get":1,"set":2,"async":3}');
}