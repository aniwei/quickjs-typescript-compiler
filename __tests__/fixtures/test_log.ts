// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts
// @ts-nocheck
// Source: third_party/QuickJS/__tests__/microbench.js
/*
 * Javascript Micro benchmark
 *
 * Copyright (c) 2017-2019 Fabrice Bellard
 * Copyright (c) 2017-2019 Charlie Gordon
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

if (typeof require !== 'undefined') {
    var fs = require('fs');
}

function pad(str, n) {
    str += "";
    while (str.length < n)
        str += " ";
    return str;
}

function pad_left(str, n) {
    str += "";
    while (str.length < n)
        str = " " + str;
    return str;
}

function pad_center(str, n) {
    str += "";
    while (str.length < n) {
        if ((n - str.length) & 1)
            str = str + " ";
        else
            str = " " + str;
    }
    return str;
}

var ref_data;
var log_data;

var heads  = [ "TEST", "N", "TIME (ns)", "REF (ns)", "SCORE (1000)" ];
var widths = [    22,   10,          9,     9,       9 ];
var precs  = [     0,   0,           2,     2,       0 ];
var total  = [     0,   0,           0,     0,       0 ];
var total_score = 0;
var total_scale = 0;

function log_line() {
    var i, n, s, a;
    s = "";
    for (i = 0, n = arguments.length; i < n; i++) {
        if (i > 0)
            s += " ";
        a = arguments[i];
        if (typeof a === "number") {
            total[i] += a;
            a = a.toFixed(precs[i]);
            s += pad_left(a, widths[i]);
        } else {
            s += pad_left(a, widths[i]);
        }
    }
    console.log(s);
}

var clocks_per_sec = 1000;
var max_iterations = 100;
var clock_threshold = 2;  /* favoring short measuring spans */
var min_n_argument = 1;
var get_clock;
if (typeof performance !== "undefined") {
    // use more precise clock on NodeJS
    // need a method call on performance object
    get_clock = () => performance.now();
} else
if (typeof os !== "undefined") {
    // use more precise clock on QuickJS
    get_clock = os.now;
} else {
    // use Date.now and round up to the next millisecond
    get_clock = () => {
        var t0 = Date.now();
        var t;
        while ((t = Date.now()) == t0)
            continue;
        return t;
    }
}