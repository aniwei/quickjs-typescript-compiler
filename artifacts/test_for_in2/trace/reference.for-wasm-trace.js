// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts
// @ts-nocheck
// Source: third_party/QuickJS/__tests__/test_loop.js
function assert(actual, expected, message) {
    if (arguments.length == 1)
        expected = true;
    if (actual === expected)
        return;
    if (actual !== null && expected !== null
        && typeof actual == 'object' && typeof expected == 'object'
        && actual.toString() === expected.toString())
        return;
    throw Error("assertion failed: got |" + actual + "|" +
        ", expected |" + expected + "|" +
        (message ? " (" + message + ")" : ""));
}
// load more elaborate version of assert if available
try {
    __loadScript("test_assert.js");
}
catch (e) { }
function test_for_in2() {
    var i, tab;
    tab = [];
    for (i in { x: 1, y: 2, z: 3 }) {
        if (i === "y")
            continue;
        tab.push(i);
    }
    assert(tab.toString() == "x,z");
    tab = [];
    for (i in { x: 1, y: 2, z: 3 }) {
        if (i === "z")
            break;
        tab.push(i);
    }
    assert(tab.toString() == "x,y");
}
