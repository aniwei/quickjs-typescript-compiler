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

function test_for_in_proxy() {
    let removed_key = "";
    let target = {}
    let proxy = new Proxy(target, {
        ownKeys: function() {
            return ["a", "b", "c"];
        },
        getOwnPropertyDescriptor: function(target, key) {
            if (removed_key != "" && key == removed_key)
                return undefined;
            else
                return { enumerable: true, configurable: true, value: this[key] };
        }
    });
    let str = "";
    for(let o in proxy) {
        str += " " + o;
        if (o == "a")
            removed_key = "b";
    }
    assert(str == " a c");
}