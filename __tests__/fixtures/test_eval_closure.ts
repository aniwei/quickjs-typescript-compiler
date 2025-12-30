// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts
// @ts-nocheck
// Source: third_party/QuickJS/__tests__/test_closure.js

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

function test_eval_closure()
{
    var tab;

    tab = [];
    for(let i = 0; i < 3; i++) {
        eval("tab.push(function g1() { return i; })");
    }
    for(let i = 0; i < 3; i++) {
        assert(tab[i]() === i);
    }

    tab = [];
    for(let i = 0; i < 3; i++) {
        let f = function f() {
            eval("tab.push(function g2() { return i; })");
        };
        f();
    }
    for(let i = 0; i < 3; i++) {
        assert(tab[i]() === i);
    }
}
