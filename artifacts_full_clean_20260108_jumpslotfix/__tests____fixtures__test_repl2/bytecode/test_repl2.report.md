# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_repl2.ts
**生成时间**: 2026-01-07T17:57:48.065Z

## 大小对比

- TypeScript编译器: 1402 字节
- WASM编译器: 1402 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 78,
  "atoms": [
    {
      "index": 0,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_repl2.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "std",
      "offset": 35
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 39
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 42
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 44
    },
    {
      "index": 5,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "colors",
      "offset": 64
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "history",
      "offset": 71
    },
    {
      "index": 8,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "clip_board",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 90
    },
    {
      "index": 10,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "expBits",
      "offset": 95
    },
    {
      "index": 11,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "log2_10",
      "offset": 103
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "pstate",
      "offset": 111
    },
    {
      "index": 13,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "prompt",
      "offset": 118
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "plen",
      "offset": 125
    },
    {
      "index": 15,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps1",
      "offset": 130
    },
    {
      "index": 16,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps2",
      "offset": 134
    },
    {
      "index": 17,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "utf8",
      "offset": 138
    },
    {
      "index": 18,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "show_time",
      "offset": 143
    },
    {
      "index": 19,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "show_colors",
      "offset": 153
    },
    {
      "index": 20,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "eval_start_time",
      "offset": 165
    },
    {
      "index": 21,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "eval_time",
      "offset": 181
    },
    {
      "index": 22,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mexpr",
      "offset": 191
    },
    {
      "index": 23,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "level",
      "offset": 197
    },
    {
      "index": 24,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cmd",
      "offset": 203
    },
    {
      "index": 25,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "cursor_pos",
      "offset": 207
    },
    {
      "index": 26,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_cmd",
      "offset": 218
    },
    {
      "index": 27,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "last_cursor_pos",
      "offset": 227
    },
    {
      "index": 28,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "history_index",
      "offset": 243
    },
    {
      "index": 29,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "this_fun",
      "offset": 257
    },
    {
      "index": 30,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_fun",
      "offset": 266
    },
    {
      "index": 31,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "quote_flag",
      "offset": 275
    },
    {
      "index": 32,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "utf8_state",
      "offset": 286
    },
    {
      "index": 33,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "utf8_val",
      "offset": 297
    },
    {
      "index": 34,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "term_fd",
      "offset": 306
    },
    {
      "index": 35,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_read_buf",
      "offset": 314
    },
    {
      "index": 36,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "term_width",
      "offset": 328
    },
    {
      "index": 37,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_cursor_x",
      "offset": 339
    },
    {
      "index": 38,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "termInit",
      "offset": 353
    },
    {
      "index": 39,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "\u001b[0m",
      "offset": 362
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "none",
      "offset": 367
    },
    {
      "index": 41,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[30m",
      "offset": 372
    },
    {
      "index": 42,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "black",
      "offset": 378
    },
    {
      "index": 43,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[31m",
      "offset": 384
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "red",
      "offset": 390
    },
    {
      "index": 45,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[32m",
      "offset": 394
    },
    {
      "index": 46,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "green",
      "offset": 400
    },
    {
      "index": 47,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[33m",
      "offset": 406
    },
    {
      "index": 48,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "yellow",
      "offset": 412
    },
    {
      "index": 49,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[34m",
      "offset": 419
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "blue",
      "offset": 425
    },
    {
      "index": 51,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[35m",
      "offset": 430
    },
    {
      "index": 52,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "magenta",
      "offset": 436
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[36m",
      "offset": 444
    },
    {
      "index": 54,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cyan",
      "offset": 450
    },
    {
      "index": 55,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[37m",
      "offset": 455
    },
    {
      "index": 56,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "white",
      "offset": 461
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[30;1m",
      "offset": 467
    },
    {
      "index": 58,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "gray",
      "offset": 475
    },
    {
      "index": 59,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "grey",
      "offset": 480
    },
    {
      "index": 60,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[31;1m",
      "offset": 485
    },
    {
      "index": 61,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bright_red",
      "offset": 493
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[32;1m",
      "offset": 504
    },
    {
      "index": 63,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_green",
      "offset": 512
    },
    {
      "index": 64,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[33;1m",
      "offset": 525
    },
    {
      "index": 65,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "bright_yellow",
      "offset": 533
    },
    {
      "index": 66,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[34;1m",
      "offset": 547
    },
    {
      "index": 67,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_blue",
      "offset": 555
    },
    {
      "index": 68,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[35;1m",
      "offset": 567
    },
    {
      "index": 69,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "bright_magenta",
      "offset": 575
    },
    {
      "index": 70,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[36;1m",
      "offset": 590
    },
    {
      "index": 71,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_cyan",
      "offset": 598
    },
    {
      "index": 72,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[37;1m",
      "offset": 610
    },
    {
      "index": 73,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_white",
      "offset": 618
    },
    {
      "index": 74,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "qjs > ",
      "offset": 631
    },
    {
      "index": 75,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "  ... ",
      "offset": 638
    },
    {
      "index": 76,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 645
    },
    {
      "index": 77,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fileno",
      "offset": 649
    }
  ],
  "functionHeader": {
    "offset": 656,
    "tag": "0xd",
    "remaining": 746
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 78,
  "atoms": [
    {
      "index": 0,
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_repl2.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "std",
      "offset": 35
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 39
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 42
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 44
    },
    {
      "index": 5,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "colors",
      "offset": 64
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "history",
      "offset": 71
    },
    {
      "index": 8,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "clip_board",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 90
    },
    {
      "index": 10,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "expBits",
      "offset": 95
    },
    {
      "index": 11,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "log2_10",
      "offset": 103
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "pstate",
      "offset": 111
    },
    {
      "index": 13,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "prompt",
      "offset": 118
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "plen",
      "offset": 125
    },
    {
      "index": 15,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps1",
      "offset": 130
    },
    {
      "index": 16,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps2",
      "offset": 134
    },
    {
      "index": 17,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "utf8",
      "offset": 138
    },
    {
      "index": 18,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "show_time",
      "offset": 143
    },
    {
      "index": 19,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "show_colors",
      "offset": 153
    },
    {
      "index": 20,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "eval_start_time",
      "offset": 165
    },
    {
      "index": 21,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "eval_time",
      "offset": 181
    },
    {
      "index": 22,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mexpr",
      "offset": 191
    },
    {
      "index": 23,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "level",
      "offset": 197
    },
    {
      "index": 24,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cmd",
      "offset": 203
    },
    {
      "index": 25,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "cursor_pos",
      "offset": 207
    },
    {
      "index": 26,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_cmd",
      "offset": 218
    },
    {
      "index": 27,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "last_cursor_pos",
      "offset": 227
    },
    {
      "index": 28,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "history_index",
      "offset": 243
    },
    {
      "index": 29,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "this_fun",
      "offset": 257
    },
    {
      "index": 30,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_fun",
      "offset": 266
    },
    {
      "index": 31,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "quote_flag",
      "offset": 275
    },
    {
      "index": 32,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "utf8_state",
      "offset": 286
    },
    {
      "index": 33,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "utf8_val",
      "offset": 297
    },
    {
      "index": 34,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "term_fd",
      "offset": 306
    },
    {
      "index": 35,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_read_buf",
      "offset": 314
    },
    {
      "index": 36,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "term_width",
      "offset": 328
    },
    {
      "index": 37,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_cursor_x",
      "offset": 339
    },
    {
      "index": 38,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "termInit",
      "offset": 353
    },
    {
      "index": 39,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "\u001b[0m",
      "offset": 362
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "none",
      "offset": 367
    },
    {
      "index": 41,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[30m",
      "offset": 372
    },
    {
      "index": 42,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "black",
      "offset": 378
    },
    {
      "index": 43,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[31m",
      "offset": 384
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "red",
      "offset": 390
    },
    {
      "index": 45,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[32m",
      "offset": 394
    },
    {
      "index": 46,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "green",
      "offset": 400
    },
    {
      "index": 47,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[33m",
      "offset": 406
    },
    {
      "index": 48,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "yellow",
      "offset": 412
    },
    {
      "index": 49,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[34m",
      "offset": 419
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "blue",
      "offset": 425
    },
    {
      "index": 51,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[35m",
      "offset": 430
    },
    {
      "index": 52,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "magenta",
      "offset": 436
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[36m",
      "offset": 444
    },
    {
      "index": 54,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cyan",
      "offset": 450
    },
    {
      "index": 55,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[37m",
      "offset": 455
    },
    {
      "index": 56,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "white",
      "offset": 461
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[30;1m",
      "offset": 467
    },
    {
      "index": 58,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "gray",
      "offset": 475
    },
    {
      "index": 59,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "grey",
      "offset": 480
    },
    {
      "index": 60,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[31;1m",
      "offset": 485
    },
    {
      "index": 61,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bright_red",
      "offset": 493
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[32;1m",
      "offset": 504
    },
    {
      "index": 63,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_green",
      "offset": 512
    },
    {
      "index": 64,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[33;1m",
      "offset": 525
    },
    {
      "index": 65,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "bright_yellow",
      "offset": 533
    },
    {
      "index": 66,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[34;1m",
      "offset": 547
    },
    {
      "index": 67,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_blue",
      "offset": 555
    },
    {
      "index": 68,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[35;1m",
      "offset": 567
    },
    {
      "index": 69,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "bright_magenta",
      "offset": 575
    },
    {
      "index": 70,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[36;1m",
      "offset": 590
    },
    {
      "index": 71,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_cyan",
      "offset": 598
    },
    {
      "index": 72,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[37;1m",
      "offset": 610
    },
    {
      "index": 73,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_white",
      "offset": 618
    },
    {
      "index": 74,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "qjs > ",
      "offset": 631
    },
    {
      "index": 75,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "  ... ",
      "offset": 638
    },
    {
      "index": 76,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 645
    },
    {
      "index": 77,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fileno",
      "offset": 649
    }
  ],
  "functionHeader": {
    "offset": 656,
    "tag": "0xd",
    "remaining": 746
  }
}
```

## 字节级差异

共发现 10 个字节差异:

- 偏移量 0x549: TS=0xca vs WASM=0x8c
- 偏移量 0x54a: TS=0x03 vs WASM=0x04
- 偏移量 0x54b: TS=0x00 vs WASM=0x23
- 偏移量 0x54c: TS=0x0c vs WASM=0x01
- 偏移量 0x54d: TS=0x8c vs WASM=0xca
- 偏移量 0x54e: TS=0x04 vs WASM=0x03
- 偏移量 0x54f: TS=0x23 vs WASM=0x00
- 偏移量 0x550: TS=0x01 vs WASM=0x0c
- 偏移量 0x556: TS=0x00 vs WASM=0x01
- 偏移量 0x565: TS=0xe4 vs WASM=0xe3

## 十六进制转储对比

### TypeScript
```
00000000: 05 4e 40 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.N@__tests__/fix|
00000010: 74 75 72 65 73 2f 74 65 73 74 5f 72 65 70 6c 32 |tures/test_repl2|
00000020: 2e 6a 73 06 73 74 64 04 6f 73 02 67 10 69 73 46 |.js.std.os.g.isF|
00000030: 69 6e 69 74 65 14 70 61 72 73 65 46 6c 6f 61 74 |inite.parseFloat|
00000040: 0c 63 6f 6c 6f 72 73 0e 68 69 73 74 6f 72 79 14 |.colors.history.|
00000050: 63 6c 69 70 5f 62 6f 61 72 64 08 70 72 65 63 0e |clip_board.prec.|
00000060: 65 78 70 42 69 74 73 0e 6c 6f 67 32 5f 31 30 0c |expBits.log2_10.|
00000070: 70 73 74 61 74 65 0c 70 72 6f 6d 70 74 08 70 6c |pstate.prompt.pl|
00000080: 65 6e 06 70 73 31 06 70 73 32 08 75 74 66 38 12 |en.ps1.ps2.utf8.|
00000090: 73 68 6f 77 5f 74 69 6d 65 16 73 68 6f 77 5f 63 |show_time.show_c|
000000a0: 6f 6c 6f 72 73 1e 65 76 61 6c 5f 73 74 61 72 74 |olors.eval_start|
000000b0: 5f 74 69 6d 65 12 65 76 61 6c 5f 74 69 6d 65 0a |_time.eval_time.|
000000c0: 6d 65 78 70 72 0a 6c 65 76 65 6c 06 63 6d 64 14 |mexpr.level.cmd.|
000000d0: 63 75 72 73 6f 72 5f 70 6f 73 10 6c 61 73 74 5f |cursor_pos.last_|
000000e0: 63 6d 64 1e 6c 61 73 74 5f 63 75 72 73 6f 72 5f |cmd.last_cursor_|
000000f0: 70 6f 73 1a 68 69 73 74 6f 72 79 5f 69 6e 64 65 |pos.history_inde|
00000100: 78 10 74 68 69 73 5f 66 75 6e 10 6c 61 73 74 5f |x.this_fun.last_|
00000110: 66 75 6e 14 71 75 6f 74 65 5f 66 6c 61 67 14 75 |fun.quote_flag.u|
00000120: 74 66 38 5f 73 74 61 74 65 10 75 74 66 38 5f 76 |tf8_state.utf8_v|
00000130: 61 6c 0e 74 65 72 6d 5f 66 64 1a 74 65 72 6d 5f |al.term_fd.term_|
00000140: 72 65 61 64 5f 62 75 66 14 74 65 72 6d 5f 77 69 |read_buf.term_wi|
00000150: 64 74 68 1a 74 65 72 6d 5f 63 75 72 73 6f 72 5f |dth.term_cursor_|
00000160: 78 10 74 65 72 6d 49 6e 69 74 08 1b 5b 30 6d 08 |x.termInit..[0m.|
00000170: 6e 6f 6e 65 0a 1b 5b 33 30 6d 0a 62 6c 61 63 6b |none..[30m.black|
00000180: 0a 1b 5b 33 31 6d 06 72 65 64 0a 1b 5b 33 32 6d |..[31m.red..[32m|
00000190: 0a 67 72 65 65 6e 0a 1b 5b 33 33 6d 0c 79 65 6c |.green..[33m.yel|
000001a0: 6c 6f 77 0a 1b 5b 33 34 6d 08 62 6c 75 65 0a 1b |low..[34m.blue..|
000001b0: 5b 33 35 6d 0e 6d 61 67 65 6e 74 61 0a 1b 5b 33 |[35m.magenta..[3|
000001c0: 36 6d 08 63 79 61 6e 0a 1b 5b 33 37 6d 0a 77 68 |6m.cyan..[37m.wh|
000001d0: 69 74 65 0e 1b 5b 33 30 3b 31 6d 08 67 72 61 79 |ite..[30;1m.gray|
000001e0: 08 67 72 65 79 0e 1b 5b 33 31 3b 31 6d 14 62 72 |.grey..[31;1m.br|
000001f0: 69 67 68 74 5f 72 65 64 0e 1b 5b 33 32 3b 31 6d |ight_red..[32;1m|
00000200: 18 62 72 69 67 68 74 5f 67 72 65 65 6e 0e 1b 5b |.bright_green..[|
00000210: 33 33 3b 31 6d 1a 62 72 69 67 68 74 5f 79 65 6c |33;1m.bright_yel|
00000220: 6c 6f 77 0e 1b 5b 33 34 3b 31 6d 16 62 72 69 67 |low..[34;1m.brig|
00000230: 68 74 5f 62 6c 75 65 0e 1b 5b 33 35 3b 31 6d 1c |ht_blue..[35;1m.|
00000240: 62 72 69 67 68 74 5f 6d 61 67 65 6e 74 61 0e 1b |bright_magenta..|
00000250: 5b 33 36 3b 31 6d 16 62 72 69 67 68 74 5f 63 79 |[36;1m.bright_cy|
00000260: 61 6e 0e 1b 5b 33 37 3b 31 6d 18 62 72 69 67 68 |an..[37;1m.brigh|
00000270: 74 5f 77 68 69 74 65 0c 71 6a 73 20 3e 20 0c 20 |t_white.qjs > . |
00000280: 20 2e 2e 2e 20 06 74 61 62 0c 66 69 6c 65 6e 6f | ... .tab.fileno|
00000290: 0d c8 03 02 ca 03 02 cc 03 02 00 00 02 00 01 fe |................|
000002a0: 01 00 01 01 fe 01 01 00 0c 20 06 01 a4 01 00 00 |......... ......|
000002b0: 00 02 02 01 0f 00 ca 03 00 0d cc 03 01 0d 08 ec |................|
000002c0: 02 29 c2 00 39 8d 00 00 00 f1 0e 06 2f c8 03 0d |.)..9......./...|
000002d0: 00 00 00 04 3a 00 00 02 88 01 06 1b 01 00 0c 43 |....:..........C|
000002e0: 06 01 00 01 28 01 02 02 01 cb 02 29 ce 03 00 01 |....(......)....|
000002f0: 00 ba 02 00 00 00 c2 02 00 01 00 bc 02 00 02 00 |................|
00000300: ce 02 00 03 00 ca 02 00 04 00 d0 03 00 05 00 d2 |................|
00000310: 03 00 06 00 d4 03 00 07 00 d6 03 00 08 00 d8 03 |................|
00000320: 00 09 00 da 03 00 0a 00 dc 03 00 0b 00 de 03 00 |................|
00000330: 0c 00 e0 03 00 0d 00 e2 03 00 0e 00 e4 03 00 0f |................|
00000340: 00 e6 03 00 10 00 e8 03 00 11 00 ea 03 00 12 00 |................|
00000350: ec 03 00 13 00 ee 03 00 14 00 f0 03 00 15 00 f2 |................|
00000360: 03 00 16 00 f4 03 00 17 00 f6 03 00 18 00 f8 03 |................|
00000370: 00 19 00 fa 03 00 1a 00 fc 03 00 1b 00 fe 03 00 |................|
00000380: 1c 00 80 04 00 1d 00 82 04 00 1e 00 84 04 00 1f |................|
00000390: 00 86 04 00 20 00 88 04 00 21 00 8a 04 00 22 00 |.... ....!....".|
000003a0: 8c 04 00 23 40 8e 04 00 24 00 90 04 00 25 40 92 |...#@...$....%@.|
000003b0: 04 00 26 00 94 04 00 27 00 ca 03 00 0c cc 03 01 |..&....'........|
000003c0: 0c c2 00 c5 27 d3 68 01 00 44 e6 00 00 00 d3 68 |....'.h..D.....h|
000003d0: 00 00 44 e5 00 00 00 d3 42 9d 00 00 00 cb d3 42 |..D.....B......B|
000003e0: a1 00 00 00 cc d3 42 9e 00 00 00 cd d3 42 a7 00 |......B......B..|
000003f0: 00 00 ce d3 42 a5 00 00 00 c5 04 d3 42 e8 00 00 |....B.......B...|
00000400: 00 c5 05 d3 42 e9 00 00 00 c5 06 0b 04 0b 01 00 |....B...........|
00000410: 00 4e 0c 01 00 00 04 0d 01 00 00 4e 0e 01 00 00 |.N.........N....|
00000420: 04 0f 01 00 00 4e 10 01 00 00 04 11 01 00 00 4e |.....N.........N|
00000430: 12 01 00 00 04 13 01 00 00 4e 14 01 00 00 04 15 |.........N......|
00000440: 01 00 00 4e 16 01 00 00 04 17 01 00 00 4e 18 01 |...N.........N..|
00000450: 00 00 04 19 01 00 00 4e 1a 01 00 00 04 1b 01 00 |.......N........|
00000460: 00 4e 1c 01 00 00 04 1d 01 00 00 4e 1e 01 00 00 |.N.........N....|
00000470: 04 1d 01 00 00 4e 1f 01 00 00 04 20 01 00 00 4e |.....N..... ...N|
00000480: 21 01 00 00 04 22 01 00 00 4e 23 01 00 00 04 24 |!...."...N#....$|
00000490: 01 00 00 4e 25 01 00 00 04 26 01 00 00 4e 27 01 |...N%....&...N'.|
000004a0: 00 00 04 28 01 00 00 4e 29 01 00 00 04 2a 01 00 |...(...N)....*..|
000004b0: 00 4e 2b 01 00 00 04 2c 01 00 00 4e 2d 01 00 00 |.N+....,...N-...|
000004c0: c5 07 26 00 00 c5 08 c3 c5 09 c3 c5 0d c3 c5 0e |..&.............|
000004d0: b7 c5 0f 04 2e 01 00 00 c5 10 04 2f 01 00 00 c5 |.........../....|
000004e0: 11 0a c5 12 09 c5 13 0a c5 14 b7 c5 16 c3 c5 17 |................|
000004f0: b7 c5 18 c3 c5 19 b7 c5 1a c3 c5 1b b7 c5 1c 09 |................|
00000500: c5 20 b7 c5 21 b7 c5 22 b7 c5 26 29 c8 03 26 1d |. ..!.."..&)..&.|
00000510: 01 18 06 07 0e 2b 0d 07 10 2c 0a 07 02 21 01 07 |.....+...,...!..|
00000520: 02 21 03 07 02 21 03 07 02 21 01 07 02 26 06 07 |.!...!...!...&..|
00000530: 02 26 02 07 02 00 0c 43 06 01 94 04 00 01 00 02 |.&.....C........|
00000540: 03 00 15 01 e0 04 00 00 00 ca 03 00 0c 8c 04 23 |...............#|
00000550: 01 90 04 25 01 68 00 00 42 0d 00 00 00 43 31 01 |...%.h..B....C1.|
00000560: 00 00 24 00 00 e4 bf 50 e5 29 c8 03 0c 5c 04 04 |..$....P.)...\..|
00000570: 1c 11 06 1b 06 1b 0e 17 2d 00                   |........-.|
```

### WASM
```
00000000: 05 4e 40 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.N@__tests__/fix|
00000010: 74 75 72 65 73 2f 74 65 73 74 5f 72 65 70 6c 32 |tures/test_repl2|
00000020: 2e 6a 73 06 73 74 64 04 6f 73 02 67 10 69 73 46 |.js.std.os.g.isF|
00000030: 69 6e 69 74 65 14 70 61 72 73 65 46 6c 6f 61 74 |inite.parseFloat|
00000040: 0c 63 6f 6c 6f 72 73 0e 68 69 73 74 6f 72 79 14 |.colors.history.|
00000050: 63 6c 69 70 5f 62 6f 61 72 64 08 70 72 65 63 0e |clip_board.prec.|
00000060: 65 78 70 42 69 74 73 0e 6c 6f 67 32 5f 31 30 0c |expBits.log2_10.|
00000070: 70 73 74 61 74 65 0c 70 72 6f 6d 70 74 08 70 6c |pstate.prompt.pl|
00000080: 65 6e 06 70 73 31 06 70 73 32 08 75 74 66 38 12 |en.ps1.ps2.utf8.|
00000090: 73 68 6f 77 5f 74 69 6d 65 16 73 68 6f 77 5f 63 |show_time.show_c|
000000a0: 6f 6c 6f 72 73 1e 65 76 61 6c 5f 73 74 61 72 74 |olors.eval_start|
000000b0: 5f 74 69 6d 65 12 65 76 61 6c 5f 74 69 6d 65 0a |_time.eval_time.|
000000c0: 6d 65 78 70 72 0a 6c 65 76 65 6c 06 63 6d 64 14 |mexpr.level.cmd.|
000000d0: 63 75 72 73 6f 72 5f 70 6f 73 10 6c 61 73 74 5f |cursor_pos.last_|
000000e0: 63 6d 64 1e 6c 61 73 74 5f 63 75 72 73 6f 72 5f |cmd.last_cursor_|
000000f0: 70 6f 73 1a 68 69 73 74 6f 72 79 5f 69 6e 64 65 |pos.history_inde|
00000100: 78 10 74 68 69 73 5f 66 75 6e 10 6c 61 73 74 5f |x.this_fun.last_|
00000110: 66 75 6e 14 71 75 6f 74 65 5f 66 6c 61 67 14 75 |fun.quote_flag.u|
00000120: 74 66 38 5f 73 74 61 74 65 10 75 74 66 38 5f 76 |tf8_state.utf8_v|
00000130: 61 6c 0e 74 65 72 6d 5f 66 64 1a 74 65 72 6d 5f |al.term_fd.term_|
00000140: 72 65 61 64 5f 62 75 66 14 74 65 72 6d 5f 77 69 |read_buf.term_wi|
00000150: 64 74 68 1a 74 65 72 6d 5f 63 75 72 73 6f 72 5f |dth.term_cursor_|
00000160: 78 10 74 65 72 6d 49 6e 69 74 08 1b 5b 30 6d 08 |x.termInit..[0m.|
00000170: 6e 6f 6e 65 0a 1b 5b 33 30 6d 0a 62 6c 61 63 6b |none..[30m.black|
00000180: 0a 1b 5b 33 31 6d 06 72 65 64 0a 1b 5b 33 32 6d |..[31m.red..[32m|
00000190: 0a 67 72 65 65 6e 0a 1b 5b 33 33 6d 0c 79 65 6c |.green..[33m.yel|
000001a0: 6c 6f 77 0a 1b 5b 33 34 6d 08 62 6c 75 65 0a 1b |low..[34m.blue..|
000001b0: 5b 33 35 6d 0e 6d 61 67 65 6e 74 61 0a 1b 5b 33 |[35m.magenta..[3|
000001c0: 36 6d 08 63 79 61 6e 0a 1b 5b 33 37 6d 0a 77 68 |6m.cyan..[37m.wh|
000001d0: 69 74 65 0e 1b 5b 33 30 3b 31 6d 08 67 72 61 79 |ite..[30;1m.gray|
000001e0: 08 67 72 65 79 0e 1b 5b 33 31 3b 31 6d 14 62 72 |.grey..[31;1m.br|
000001f0: 69 67 68 74 5f 72 65 64 0e 1b 5b 33 32 3b 31 6d |ight_red..[32;1m|
00000200: 18 62 72 69 67 68 74 5f 67 72 65 65 6e 0e 1b 5b |.bright_green..[|
00000210: 33 33 3b 31 6d 1a 62 72 69 67 68 74 5f 79 65 6c |33;1m.bright_yel|
00000220: 6c 6f 77 0e 1b 5b 33 34 3b 31 6d 16 62 72 69 67 |low..[34;1m.brig|
00000230: 68 74 5f 62 6c 75 65 0e 1b 5b 33 35 3b 31 6d 1c |ht_blue..[35;1m.|
00000240: 62 72 69 67 68 74 5f 6d 61 67 65 6e 74 61 0e 1b |bright_magenta..|
00000250: 5b 33 36 3b 31 6d 16 62 72 69 67 68 74 5f 63 79 |[36;1m.bright_cy|
00000260: 61 6e 0e 1b 5b 33 37 3b 31 6d 18 62 72 69 67 68 |an..[37;1m.brigh|
00000270: 74 5f 77 68 69 74 65 0c 71 6a 73 20 3e 20 0c 20 |t_white.qjs > . |
00000280: 20 2e 2e 2e 20 06 74 61 62 0c 66 69 6c 65 6e 6f | ... .tab.fileno|
00000290: 0d c8 03 02 ca 03 02 cc 03 02 00 00 02 00 01 fe |................|
000002a0: 01 00 01 01 fe 01 01 00 0c 20 06 01 a4 01 00 00 |......... ......|
000002b0: 00 02 02 01 0f 00 ca 03 00 0d cc 03 01 0d 08 ec |................|
000002c0: 02 29 c2 00 39 8d 00 00 00 f1 0e 06 2f c8 03 0d |.)..9......./...|
000002d0: 00 00 00 04 3a 00 00 02 88 01 06 1b 01 00 0c 43 |....:..........C|
000002e0: 06 01 00 01 28 01 02 02 01 cb 02 29 ce 03 00 01 |....(......)....|
000002f0: 00 ba 02 00 00 00 c2 02 00 01 00 bc 02 00 02 00 |................|
00000300: ce 02 00 03 00 ca 02 00 04 00 d0 03 00 05 00 d2 |................|
00000310: 03 00 06 00 d4 03 00 07 00 d6 03 00 08 00 d8 03 |................|
00000320: 00 09 00 da 03 00 0a 00 dc 03 00 0b 00 de 03 00 |................|
00000330: 0c 00 e0 03 00 0d 00 e2 03 00 0e 00 e4 03 00 0f |................|
00000340: 00 e6 03 00 10 00 e8 03 00 11 00 ea 03 00 12 00 |................|
00000350: ec 03 00 13 00 ee 03 00 14 00 f0 03 00 15 00 f2 |................|
00000360: 03 00 16 00 f4 03 00 17 00 f6 03 00 18 00 f8 03 |................|
00000370: 00 19 00 fa 03 00 1a 00 fc 03 00 1b 00 fe 03 00 |................|
00000380: 1c 00 80 04 00 1d 00 82 04 00 1e 00 84 04 00 1f |................|
00000390: 00 86 04 00 20 00 88 04 00 21 00 8a 04 00 22 00 |.... ....!....".|
000003a0: 8c 04 00 23 40 8e 04 00 24 00 90 04 00 25 40 92 |...#@...$....%@.|
000003b0: 04 00 26 00 94 04 00 27 00 ca 03 00 0c cc 03 01 |..&....'........|
000003c0: 0c c2 00 c5 27 d3 68 01 00 44 e6 00 00 00 d3 68 |....'.h..D.....h|
000003d0: 00 00 44 e5 00 00 00 d3 42 9d 00 00 00 cb d3 42 |..D.....B......B|
000003e0: a1 00 00 00 cc d3 42 9e 00 00 00 cd d3 42 a7 00 |......B......B..|
000003f0: 00 00 ce d3 42 a5 00 00 00 c5 04 d3 42 e8 00 00 |....B.......B...|
00000400: 00 c5 05 d3 42 e9 00 00 00 c5 06 0b 04 0b 01 00 |....B...........|
00000410: 00 4e 0c 01 00 00 04 0d 01 00 00 4e 0e 01 00 00 |.N.........N....|
00000420: 04 0f 01 00 00 4e 10 01 00 00 04 11 01 00 00 4e |.....N.........N|
00000430: 12 01 00 00 04 13 01 00 00 4e 14 01 00 00 04 15 |.........N......|
00000440: 01 00 00 4e 16 01 00 00 04 17 01 00 00 4e 18 01 |...N.........N..|
00000450: 00 00 04 19 01 00 00 4e 1a 01 00 00 04 1b 01 00 |.......N........|
00000460: 00 4e 1c 01 00 00 04 1d 01 00 00 4e 1e 01 00 00 |.N.........N....|
00000470: 04 1d 01 00 00 4e 1f 01 00 00 04 20 01 00 00 4e |.....N..... ...N|
00000480: 21 01 00 00 04 22 01 00 00 4e 23 01 00 00 04 24 |!...."...N#....$|
00000490: 01 00 00 4e 25 01 00 00 04 26 01 00 00 4e 27 01 |...N%....&...N'.|
000004a0: 00 00 04 28 01 00 00 4e 29 01 00 00 04 2a 01 00 |...(...N)....*..|
000004b0: 00 4e 2b 01 00 00 04 2c 01 00 00 4e 2d 01 00 00 |.N+....,...N-...|
000004c0: c5 07 26 00 00 c5 08 c3 c5 09 c3 c5 0d c3 c5 0e |..&.............|
000004d0: b7 c5 0f 04 2e 01 00 00 c5 10 04 2f 01 00 00 c5 |.........../....|
000004e0: 11 0a c5 12 09 c5 13 0a c5 14 b7 c5 16 c3 c5 17 |................|
000004f0: b7 c5 18 c3 c5 19 b7 c5 1a c3 c5 1b b7 c5 1c 09 |................|
00000500: c5 20 b7 c5 21 b7 c5 22 b7 c5 26 29 c8 03 26 1d |. ..!.."..&)..&.|
00000510: 01 18 06 07 0e 2b 0d 07 10 2c 0a 07 02 21 01 07 |.....+...,...!..|
00000520: 02 21 03 07 02 21 03 07 02 21 01 07 02 26 06 07 |.!...!...!...&..|
00000530: 02 26 02 07 02 00 0c 43 06 01 94 04 00 01 00 02 |.&.....C........|
00000540: 03 00 15 01 e0 04 00 00 00 8c 04 23 01 ca 03 00 |...........#....|
00000550: 0c 90 04 25 01 68 01 00 42 0d 00 00 00 43 31 01 |...%.h..B....C1.|
00000560: 00 00 24 00 00 e3 bf 50 e5 29 c8 03 0c 5c 04 04 |..$....P.)...\..|
00000570: 1c 11 06 1b 06 1b 0e 17 2d 00                   |........-.|
```