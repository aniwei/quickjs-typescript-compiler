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

(function(g) {
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
        none:    "\x1b[0m",
        black:   "\x1b[30m",
        red:     "\x1b[31m",
        green:   "\x1b[32m",
        yellow:  "\x1b[33m",
        blue:    "\x1b[34m",
        magenta: "\x1b[35m",
        cyan:    "\x1b[36m",
        white:   "\x1b[37m",
        gray:    "\x1b[30;1m",
        grey:    "\x1b[30;1m",
        bright_red:     "\x1b[31;1m",
        bright_green:   "\x1b[32;1m",
        bright_yellow:  "\x1b[33;1m",
        bright_blue:    "\x1b[34;1m",
        bright_magenta: "\x1b[35;1m",
        bright_cyan:    "\x1b[36;1m",
        bright_white:   "\x1b[37;1m",
    };

    var styles = {
        'default':    'bright_green',
        'comment':    'white',
        'string':     'bright_cyan',
        'regex':      'cyan',
        'number':     'green',
        'keyword':    'bright_white',
        'function':   'bright_yellow',
        'type':       'bright_magenta',
        'identifier': 'bright_green',
        'error':      'red',
        'result':     'bright_white',
        'error_msg':  'bright_red',
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

        /* get the terminal size */
        term_width = 80;
        if (os.isatty(term_fd)) {
            if (os.ttyGetWinSize) {
                tab = os.ttyGetWinSize(term_fd);
                if (tab)
                    term_width = tab[0];
            }
            if (os.ttySetRaw) {
                /* set the TTY to raw mode */
                os.ttySetRaw(term_fd);
            }
        }

        /* install a Ctrl-C signal handler */
        os.signal(os.SIGINT, sigint_handler);

        /* install a handler to read stdin */
        term_read_buf = new Uint8Array(64);
        os.setReadHandler(term_fd, term_read_handler);
    }

    function sigint_handler() {
        /* send Ctrl-C to readline */
        handle_byte(3);
    }

    function term_read_handler() {
        var l, i;
        l = os.read(term_fd, term_read_buf.buffer, 0, term_read_buf.length);
        for(i = 0; i < l; i++)
            handle_byte(term_read_buf[i]);
    }

    function handle_byte(c) {
        if (!utf8) {
            handle_char(c);
        } else if (utf8_state !== 0 && (c >= 0x80 && c < 0xc0)) {
            utf8_val = (utf8_val << 6) | (c & 0x3F);
            utf8_state--;
            if (utf8_state === 0) {
                handle_char(utf8_val);
            }
        } else if (c >= 0xc0 && c < 0xf8) {
            utf8_state = 1 + (c >= 0xe0) + (c >= 0xf0);
            utf8_val = c & ((1 << (6 - utf8_state)) - 1);
        } else {
            utf8_state = 0;
            handle_char(c);
        }
    }

    function is_alpha(c) {
        return typeof c === "string" &&
            ((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z'));
    }

    function is_digit(c) {
        return typeof c === "string" && (c >= '0' && c <= '9');
    }

    function is_word(c) {
        return typeof c === "string" &&
            (is_alpha(c) || is_digit(c) || c == '_' || c == '$');
    }

    function ucs_length(str) {
        var len, c, i, str_len = str.length;
        len = 0;
        /* we never count the trailing surrogate to have the
         following property: ucs_length(str) =
         ucs_length(str.substring(0, a)) + ucs_length(str.substring(a,
         str.length)) for 0 <= a <= str.length */
        for(i = 0; i < str_len; i++) {
            c = str.charCodeAt(i);
            if (c < 0xdc00 || c >= 0xe000)
                len++;
        }
        return len;
    }

    function is_trailing_surrogate(c)  {
        var d;
        if (typeof c !== "string")
            return false;
        d = c.codePointAt(0); /* can be NaN if empty string */
        return d >= 0xdc00 && d < 0xe000;
    }

    function is_balanced(a, b) {
        switch (a + b) {
        case "()":
        case "[]":
        case "{}":
            return true;
        }
        return false;
    }

    function print_color_text(str, start, style_names) {
        var i, j;
        for (j = start; j < str.length;) {
            var style = style_names[i = j];
            while (++j < str.length && style_names[j] == style)
                continue;
            std.puts(colors[styles[style] || 'default']);
            std.puts(str.substring(i, j));
            std.puts(colors['none']);
        }
    }

    function print_csi(n, code) {
        std.puts("\x1b[" + ((n != 1) ? n : "") + code);
    }

    

})(globalThis);

