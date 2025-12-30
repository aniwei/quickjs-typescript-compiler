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


function test_arrow_function()
{
    "use strict";

    function f1() {
        return (() => arguments)();
    }
    function f2() {
        return (() => this)();
    }
    function f3() {
        return (() => eval("this"))();
    }
    function f4() {
        return (() => eval("new.target"))();
    }
    var a;

    a = f1(1, 2);
    assert(a.length, 2);
    assert(a[0] === 1 && a[1] === 2);

    assert(f2.call("this_val") === "this_val");
    assert(f3.call("this_val") === "this_val");
    assert(new f4() === f4);

    var o1 = { f() { return this; } };
    var o2 = { f() {
        return (() => eval("super.f()"))();
    } };
    o2.__proto__ = o1;

    assert(o2.f() === o2);
}