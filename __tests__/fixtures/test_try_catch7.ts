// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts
// @ts-nocheck
// Source: third_party/QuickJS/__tests__/test_loop.js

declare function __loadScript(path: string): void;
function assert(actual, expected, message) {
    if (arguments.length == 1)
        expected = true;

    if (actual === expected)
        return;

    if (actual !== null && expected !== null
    &&  typeof actual == 'object' && typeof expected == 'object'
    &&  actual.toString() === expected.toString())
        return;

    throw Error("assertion failed: got |" + actual + "|" +
                ", expected |" + expected + "|" +
                (message ? " (" + message + ")" : ""));
}

// load more elaborate version of assert if available
try { __loadScript("test_assert.js"); } catch(e) {}

/*----------------*/

function test_try_catch7()
{
    var s;
    s = "";

    try {
        try {
            s += "t";
            throw "a";
        } finally {
            s += "f";
        }
    } catch(e) {
        s += e;
    } finally {
        s += "g";
    }
    assert(s, "tfag", "catch");
}