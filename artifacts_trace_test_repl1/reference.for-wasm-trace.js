// Generated from QuickJS __tests__/*.js by scripts/syncQuickJsTestsToFixtures.ts
// @ts-nocheck
// Source: third_party/QuickJS/__tests__/repl.js
/*
 * QuickJS Read Eval Print Loop
 *
 * Copyright (c) 2017-2020 Fabrice Bellard
 * Copyright (c) 2017-2020 Charlie Gordon
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
import * as std from "std";
import * as os from "os";
(function (g) {
    /* add 'os' and 'std' bindings */
    g.os = os;
    g.std = std;
    /* close global objects */
    var Object = g.Object;
    var String = g.String;
    var Array = g.Array;
    var Date = g.Date;
    var Math = g.Math;
    var isFinite = g.isFinite;
    var parseFloat = g.parseFloat;
    var colors = {
        none: "\x1b[0m",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[30;1m",
        grey: "\x1b[30;1m",
        bright_red: "\x1b[31;1m",
        bright_green: "\x1b[32;1m",
        bright_yellow: "\x1b[33;1m",
        bright_blue: "\x1b[34;1m",
        bright_magenta: "\x1b[35;1m",
        bright_cyan: "\x1b[36;1m",
        bright_white: "\x1b[37;1m",
    };
    var history = [];
    var clip_board = "";
    var prec;
    var expBits;
    var log2_10;
    var pstate = "";
    var prompt = "";
    var plen = 0;
    var ps1 = "qjs > ";
    var ps2 = "  ... ";
    var utf8 = true;
    var show_time = false;
    var show_colors = true;
    var eval_start_time;
    var eval_time = 0;
    var mexpr = "";
    var level = 0;
    var cmd = "";
    var cursor_pos = 0;
    var last_cmd = "";
    var last_cursor_pos = 0;
    var history_index;
    var this_fun, last_fun;
    var quote_flag = false;
    var utf8_state = 0;
    var utf8_val = 0;
    var term_fd;
    var term_read_buf;
    var term_width;
    /* current X position of the cursor in the terminal */
    var term_cursor_x = 0;
    function termInit() {
        var tab;
        term_fd = std.in.fileno();
    }
})(globalThis);
