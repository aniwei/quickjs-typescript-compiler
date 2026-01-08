# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/repl.ts
**生成时间**: 2026-01-08T02:49:38.152Z

## 大小对比

- TypeScript编译器: 3555 字节
- WASM编译器: 3551 字节
- 差异: 4 字节 (0.11%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 135,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/repl.js",
      "offset": 3
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "std",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 62
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "colors",
      "offset": 73
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "styles",
      "offset": 80
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "history",
      "offset": 87
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "clip_board",
      "offset": 95
    },
    {
      "index": 10,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 106
    },
    {
      "index": 11,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "expBits",
      "offset": 111
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "log2_10",
      "offset": 119
    },
    {
      "index": 13,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "pstate",
      "offset": 127
    },
    {
      "index": 14,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "prompt",
      "offset": 134
    },
    {
      "index": 15,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "plen",
      "offset": 141
    },
    {
      "index": 16,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps1",
      "offset": 146
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps2",
      "offset": 150
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "utf8",
      "offset": 154
    },
    {
      "index": 19,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "show_time",
      "offset": 159
    },
    {
      "index": 20,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "show_colors",
      "offset": 169
    },
    {
      "index": 21,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "eval_start_time",
      "offset": 181
    },
    {
      "index": 22,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "eval_time",
      "offset": 197
    },
    {
      "index": 23,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mexpr",
      "offset": 207
    },
    {
      "index": 24,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "level",
      "offset": 213
    },
    {
      "index": 25,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cmd",
      "offset": 219
    },
    {
      "index": 26,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "cursor_pos",
      "offset": 223
    },
    {
      "index": 27,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_cmd",
      "offset": 234
    },
    {
      "index": 28,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "last_cursor_pos",
      "offset": 243
    },
    {
      "index": 29,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "history_index",
      "offset": 259
    },
    {
      "index": 30,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "this_fun",
      "offset": 273
    },
    {
      "index": 31,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_fun",
      "offset": 282
    },
    {
      "index": 32,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "quote_flag",
      "offset": 291
    },
    {
      "index": 33,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "utf8_state",
      "offset": 302
    },
    {
      "index": 34,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "utf8_val",
      "offset": 313
    },
    {
      "index": 35,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "term_fd",
      "offset": 322
    },
    {
      "index": 36,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_read_buf",
      "offset": 330
    },
    {
      "index": 37,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "term_width",
      "offset": 344
    },
    {
      "index": 38,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_cursor_x",
      "offset": 355
    },
    {
      "index": 39,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "termInit",
      "offset": 369
    },
    {
      "index": 40,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "sigint_handler",
      "offset": 378
    },
    {
      "index": 41,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "term_read_handler",
      "offset": 393
    },
    {
      "index": 42,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "handle_byte",
      "offset": 411
    },
    {
      "index": 43,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "is_alpha",
      "offset": 423
    },
    {
      "index": 44,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "is_digit",
      "offset": 432
    },
    {
      "index": 45,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "is_word",
      "offset": 441
    },
    {
      "index": 46,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "ucs_length",
      "offset": 449
    },
    {
      "index": 47,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "is_trailing_surrogate",
      "offset": 460
    },
    {
      "index": 48,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "is_balanced",
      "offset": 482
    },
    {
      "index": 49,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "print_color_text",
      "offset": 494
    },
    {
      "index": 50,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "print_csi",
      "offset": 511
    },
    {
      "index": 51,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "\u001b[0m",
      "offset": 521
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "none",
      "offset": 526
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[30m",
      "offset": 531
    },
    {
      "index": 54,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "black",
      "offset": 537
    },
    {
      "index": 55,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[31m",
      "offset": 543
    },
    {
      "index": 56,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "red",
      "offset": 549
    },
    {
      "index": 57,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[32m",
      "offset": 553
    },
    {
      "index": 58,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "green",
      "offset": 559
    },
    {
      "index": 59,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[33m",
      "offset": 565
    },
    {
      "index": 60,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "yellow",
      "offset": 571
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[34m",
      "offset": 578
    },
    {
      "index": 62,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "blue",
      "offset": 584
    },
    {
      "index": 63,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[35m",
      "offset": 589
    },
    {
      "index": 64,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "magenta",
      "offset": 595
    },
    {
      "index": 65,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[36m",
      "offset": 603
    },
    {
      "index": 66,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cyan",
      "offset": 609
    },
    {
      "index": 67,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[37m",
      "offset": 614
    },
    {
      "index": 68,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "white",
      "offset": 620
    },
    {
      "index": 69,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[30;1m",
      "offset": 626
    },
    {
      "index": 70,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "gray",
      "offset": 634
    },
    {
      "index": 71,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "grey",
      "offset": 639
    },
    {
      "index": 72,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[31;1m",
      "offset": 644
    },
    {
      "index": 73,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bright_red",
      "offset": 652
    },
    {
      "index": 74,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[32;1m",
      "offset": 663
    },
    {
      "index": 75,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_green",
      "offset": 671
    },
    {
      "index": 76,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[33;1m",
      "offset": 684
    },
    {
      "index": 77,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "bright_yellow",
      "offset": 692
    },
    {
      "index": 78,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[34;1m",
      "offset": 706
    },
    {
      "index": 79,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_blue",
      "offset": 714
    },
    {
      "index": 80,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[35;1m",
      "offset": 726
    },
    {
      "index": 81,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "bright_magenta",
      "offset": 734
    },
    {
      "index": 82,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[36;1m",
      "offset": 749
    },
    {
      "index": 83,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_cyan",
      "offset": 757
    },
    {
      "index": 84,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[37;1m",
      "offset": 769
    },
    {
      "index": 85,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_white",
      "offset": 777
    },
    {
      "index": 86,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "comment",
      "offset": 790
    },
    {
      "index": 87,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "regex",
      "offset": 798
    },
    {
      "index": 88,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "keyword",
      "offset": 804
    },
    {
      "index": 89,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 812
    },
    {
      "index": 90,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "identifier",
      "offset": 817
    },
    {
      "index": 91,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 828
    },
    {
      "index": 92,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 834
    },
    {
      "index": 93,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "error_msg",
      "offset": 841
    },
    {
      "index": 94,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "qjs > ",
      "offset": 851
    },
    {
      "index": 95,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "  ... ",
      "offset": 858
    },
    {
      "index": 96,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 865
    },
    {
      "index": 97,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fileno",
      "offset": 869
    },
    {
      "index": 98,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "isatty",
      "offset": 876
    },
    {
      "index": 99,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "ttyGetWinSize",
      "offset": 883
    },
    {
      "index": 100,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "ttySetRaw",
      "offset": 897
    },
    {
      "index": 101,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "signal",
      "offset": 907
    },
    {
      "index": 102,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "SIGINT",
      "offset": 914
    },
    {
      "index": 103,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "setReadHandler",
      "offset": 921
    },
    {
      "index": 104,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 936
    },
    {
      "index": 105,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 938
    },
    {
      "index": 106,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "read",
      "offset": 940
    },
    {
      "index": 107,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "buffer",
      "offset": 945
    },
    {
      "index": 108,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 952
    },
    {
      "index": 109,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "handle_char",
      "offset": 954
    },
    {
      "index": 110,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "A",
      "offset": 966
    },
    {
      "index": 111,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "Z",
      "offset": 968
    },
    {
      "index": 112,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 970
    },
    {
      "index": 113,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 972
    },
    {
      "index": 114,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "_",
      "offset": 974
    },
    {
      "index": 115,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "$",
      "offset": 976
    },
    {
      "index": 116,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 978
    },
    {
      "index": 117,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "len",
      "offset": 982
    },
    {
      "index": 118,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "str_len",
      "offset": 986
    },
    {
      "index": 119,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "charCodeAt",
      "offset": 994
    },
    {
      "index": 120,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 1005
    },
    {
      "index": 121,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "codePointAt",
      "offset": 1007
    },
    {
      "index": 122,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 1019
    },
    {
      "index": 123,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "()",
      "offset": 1021
    },
    {
      "index": 124,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "[]",
      "offset": 1024
    },
    {
      "index": 125,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "{}",
      "offset": 1027
    },
    {
      "index": 126,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "start",
      "offset": 1030
    },
    {
      "index": 127,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "style_names",
      "offset": 1036
    },
    {
      "index": 128,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 1048
    },
    {
      "index": 129,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "style",
      "offset": 1050
    },
    {
      "index": 130,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "puts",
      "offset": 1056
    },
    {
      "index": 131,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "substring",
      "offset": 1061
    },
    {
      "index": 132,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 1071
    },
    {
      "index": 133,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "code",
      "offset": 1073
    },
    {
      "index": 134,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u001b[",
      "offset": 1078
    }
  ],
  "functionHeader": {
    "offset": 1081,
    "tag": "0xd",
    "remaining": 2474
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 135,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/repl.js",
      "offset": 3
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "std",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 62
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "colors",
      "offset": 73
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "styles",
      "offset": 80
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "history",
      "offset": 87
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "clip_board",
      "offset": 95
    },
    {
      "index": 10,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 106
    },
    {
      "index": 11,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "expBits",
      "offset": 111
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "log2_10",
      "offset": 119
    },
    {
      "index": 13,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "pstate",
      "offset": 127
    },
    {
      "index": 14,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "prompt",
      "offset": 134
    },
    {
      "index": 15,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "plen",
      "offset": 141
    },
    {
      "index": 16,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps1",
      "offset": 146
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ps2",
      "offset": 150
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "utf8",
      "offset": 154
    },
    {
      "index": 19,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "show_time",
      "offset": 159
    },
    {
      "index": 20,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "show_colors",
      "offset": 169
    },
    {
      "index": 21,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "eval_start_time",
      "offset": 181
    },
    {
      "index": 22,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "eval_time",
      "offset": 197
    },
    {
      "index": 23,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mexpr",
      "offset": 207
    },
    {
      "index": 24,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "level",
      "offset": 213
    },
    {
      "index": 25,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cmd",
      "offset": 219
    },
    {
      "index": 26,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "cursor_pos",
      "offset": 223
    },
    {
      "index": 27,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_cmd",
      "offset": 234
    },
    {
      "index": 28,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "last_cursor_pos",
      "offset": 243
    },
    {
      "index": 29,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "history_index",
      "offset": 259
    },
    {
      "index": 30,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "this_fun",
      "offset": 273
    },
    {
      "index": 31,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "last_fun",
      "offset": 282
    },
    {
      "index": 32,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "quote_flag",
      "offset": 291
    },
    {
      "index": 33,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "utf8_state",
      "offset": 302
    },
    {
      "index": 34,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "utf8_val",
      "offset": 313
    },
    {
      "index": 35,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "term_fd",
      "offset": 322
    },
    {
      "index": 36,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_read_buf",
      "offset": 330
    },
    {
      "index": 37,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "term_width",
      "offset": 344
    },
    {
      "index": 38,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "term_cursor_x",
      "offset": 355
    },
    {
      "index": 39,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "termInit",
      "offset": 369
    },
    {
      "index": 40,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "sigint_handler",
      "offset": 378
    },
    {
      "index": 41,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "term_read_handler",
      "offset": 393
    },
    {
      "index": 42,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "handle_byte",
      "offset": 411
    },
    {
      "index": 43,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "is_alpha",
      "offset": 423
    },
    {
      "index": 44,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "is_digit",
      "offset": 432
    },
    {
      "index": 45,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "is_word",
      "offset": 441
    },
    {
      "index": 46,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "ucs_length",
      "offset": 449
    },
    {
      "index": 47,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "is_trailing_surrogate",
      "offset": 460
    },
    {
      "index": 48,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "is_balanced",
      "offset": 482
    },
    {
      "index": 49,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "print_color_text",
      "offset": 494
    },
    {
      "index": 50,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "print_csi",
      "offset": 511
    },
    {
      "index": 51,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "\u001b[0m",
      "offset": 521
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "none",
      "offset": 526
    },
    {
      "index": 53,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[30m",
      "offset": 531
    },
    {
      "index": 54,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "black",
      "offset": 537
    },
    {
      "index": 55,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[31m",
      "offset": 543
    },
    {
      "index": 56,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "red",
      "offset": 549
    },
    {
      "index": 57,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[32m",
      "offset": 553
    },
    {
      "index": 58,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "green",
      "offset": 559
    },
    {
      "index": 59,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[33m",
      "offset": 565
    },
    {
      "index": 60,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "yellow",
      "offset": 571
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[34m",
      "offset": 578
    },
    {
      "index": 62,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "blue",
      "offset": 584
    },
    {
      "index": 63,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[35m",
      "offset": 589
    },
    {
      "index": 64,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "magenta",
      "offset": 595
    },
    {
      "index": 65,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[36m",
      "offset": 603
    },
    {
      "index": 66,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cyan",
      "offset": 609
    },
    {
      "index": 67,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "\u001b[37m",
      "offset": 614
    },
    {
      "index": 68,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "white",
      "offset": 620
    },
    {
      "index": 69,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[30;1m",
      "offset": 626
    },
    {
      "index": 70,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "gray",
      "offset": 634
    },
    {
      "index": 71,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "grey",
      "offset": 639
    },
    {
      "index": 72,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[31;1m",
      "offset": 644
    },
    {
      "index": 73,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bright_red",
      "offset": 652
    },
    {
      "index": 74,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[32;1m",
      "offset": 663
    },
    {
      "index": 75,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_green",
      "offset": 671
    },
    {
      "index": 76,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[33;1m",
      "offset": 684
    },
    {
      "index": 77,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "bright_yellow",
      "offset": 692
    },
    {
      "index": 78,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[34;1m",
      "offset": 706
    },
    {
      "index": 79,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_blue",
      "offset": 714
    },
    {
      "index": 80,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[35;1m",
      "offset": 726
    },
    {
      "index": 81,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "bright_magenta",
      "offset": 734
    },
    {
      "index": 82,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[36;1m",
      "offset": 749
    },
    {
      "index": 83,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "bright_cyan",
      "offset": 757
    },
    {
      "index": 84,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "\u001b[37;1m",
      "offset": 769
    },
    {
      "index": 85,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "bright_white",
      "offset": 777
    },
    {
      "index": 86,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "comment",
      "offset": 790
    },
    {
      "index": 87,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "regex",
      "offset": 798
    },
    {
      "index": 88,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "keyword",
      "offset": 804
    },
    {
      "index": 89,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 812
    },
    {
      "index": 90,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "identifier",
      "offset": 817
    },
    {
      "index": 91,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 828
    },
    {
      "index": 92,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 834
    },
    {
      "index": 93,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "error_msg",
      "offset": 841
    },
    {
      "index": 94,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "qjs > ",
      "offset": 851
    },
    {
      "index": 95,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "  ... ",
      "offset": 858
    },
    {
      "index": 96,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 865
    },
    {
      "index": 97,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fileno",
      "offset": 869
    },
    {
      "index": 98,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "isatty",
      "offset": 876
    },
    {
      "index": 99,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "ttyGetWinSize",
      "offset": 883
    },
    {
      "index": 100,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "ttySetRaw",
      "offset": 897
    },
    {
      "index": 101,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "signal",
      "offset": 907
    },
    {
      "index": 102,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "SIGINT",
      "offset": 914
    },
    {
      "index": 103,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "setReadHandler",
      "offset": 921
    },
    {
      "index": 104,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 936
    },
    {
      "index": 105,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 938
    },
    {
      "index": 106,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "read",
      "offset": 940
    },
    {
      "index": 107,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "buffer",
      "offset": 945
    },
    {
      "index": 108,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 952
    },
    {
      "index": 109,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "handle_char",
      "offset": 954
    },
    {
      "index": 110,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "A",
      "offset": 966
    },
    {
      "index": 111,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "Z",
      "offset": 968
    },
    {
      "index": 112,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 970
    },
    {
      "index": 113,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 972
    },
    {
      "index": 114,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "_",
      "offset": 974
    },
    {
      "index": 115,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "$",
      "offset": 976
    },
    {
      "index": 116,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 978
    },
    {
      "index": 117,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "len",
      "offset": 982
    },
    {
      "index": 118,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "str_len",
      "offset": 986
    },
    {
      "index": 119,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "charCodeAt",
      "offset": 994
    },
    {
      "index": 120,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 1005
    },
    {
      "index": 121,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "codePointAt",
      "offset": 1007
    },
    {
      "index": 122,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 1019
    },
    {
      "index": 123,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "()",
      "offset": 1021
    },
    {
      "index": 124,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "[]",
      "offset": 1024
    },
    {
      "index": 125,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "{}",
      "offset": 1027
    },
    {
      "index": 126,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "start",
      "offset": 1030
    },
    {
      "index": 127,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "style_names",
      "offset": 1036
    },
    {
      "index": 128,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 1048
    },
    {
      "index": 129,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "style",
      "offset": 1050
    },
    {
      "index": 130,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "puts",
      "offset": 1056
    },
    {
      "index": 131,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "substring",
      "offset": 1061
    },
    {
      "index": 132,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 1071
    },
    {
      "index": 133,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "code",
      "offset": 1073
    },
    {
      "index": 134,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u001b[",
      "offset": 1078
    }
  ],
  "functionHeader": {
    "offset": 1081,
    "tag": "0xd",
    "remaining": 2470
  }
}
```

## 字节级差异

共发现 342 个字节差异:

- 偏移量 0x7d6: TS=0xca vs WASM=0x8e
- 偏移量 0x7d7: TS=0x03 vs WASM=0x04
- 偏移量 0x7d8: TS=0x00 vs WASM=0x24
- 偏移量 0x7d9: TS=0x0c vs WASM=0x01
- 偏移量 0x7da: TS=0x8e vs WASM=0xca
- 偏移量 0x7db: TS=0x04 vs WASM=0x03
- 偏移量 0x7dc: TS=0x24 vs WASM=0x00
- 偏移量 0x7dd: TS=0x01 vs WASM=0x0c
- 偏移量 0x7f3: TS=0x00 vs WASM=0x01
- 偏移量 0x802: TS=0xe4 vs WASM=0xe3
- 偏移量 0x80e: TS=0xe0 vs WASM=0xdf
- 偏移量 0x826: TS=0xe0 vs WASM=0xdf
- 偏移量 0x843: TS=0xe0 vs WASM=0xdf
- 偏移量 0x875: TS=0xe0 vs WASM=0xdf
- 偏移量 0xc5b: TS=0x25 vs WASM=0x23
- 偏移量 0xc72: TS=0x0a vs WASM=0x13
- 偏移量 0xc7a: TS=0xec vs WASM=0xed
- 偏移量 0xc7b: TS=0x03 vs WASM=0x0a
- 偏移量 0xc7c: TS=0xee vs WASM=0x11
- 偏移量 0xc7d: TS=0x0a vs WASM=0x04
- ... (显示前20个差异，总共342个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 87 01 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |...P__tests__/fi|
00000010: 78 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 |xtures/quickjs-t|
00000020: 65 73 74 73 2f 72 65 70 6c 2e 6a 73 06 73 74 64 |ests/repl.js.std|
00000030: 04 6f 73 02 67 10 69 73 46 69 6e 69 74 65 14 70 |.os.g.isFinite.p|
00000040: 61 72 73 65 46 6c 6f 61 74 0c 63 6f 6c 6f 72 73 |arseFloat.colors|
00000050: 0c 73 74 79 6c 65 73 0e 68 69 73 74 6f 72 79 14 |.styles.history.|
00000060: 63 6c 69 70 5f 62 6f 61 72 64 08 70 72 65 63 0e |clip_board.prec.|
00000070: 65 78 70 42 69 74 73 0e 6c 6f 67 32 5f 31 30 0c |expBits.log2_10.|
00000080: 70 73 74 61 74 65 0c 70 72 6f 6d 70 74 08 70 6c |pstate.prompt.pl|
00000090: 65 6e 06 70 73 31 06 70 73 32 08 75 74 66 38 12 |en.ps1.ps2.utf8.|
000000a0: 73 68 6f 77 5f 74 69 6d 65 16 73 68 6f 77 5f 63 |show_time.show_c|
000000b0: 6f 6c 6f 72 73 1e 65 76 61 6c 5f 73 74 61 72 74 |olors.eval_start|
000000c0: 5f 74 69 6d 65 12 65 76 61 6c 5f 74 69 6d 65 0a |_time.eval_time.|
000000d0: 6d 65 78 70 72 0a 6c 65 76 65 6c 06 63 6d 64 14 |mexpr.level.cmd.|
000000e0: 63 75 72 73 6f 72 5f 70 6f 73 10 6c 61 73 74 5f |cursor_pos.last_|
000000f0: 63 6d 64 1e 6c 61 73 74 5f 63 75 72 73 6f 72 5f |cmd.last_cursor_|
00000100: 70 6f 73 1a 68 69 73 74 6f 72 79 5f 69 6e 64 65 |pos.history_inde|
00000110: 78 10 74 68 69 73 5f 66 75 6e 10 6c 61 73 74 5f |x.this_fun.last_|
00000120: 66 75 6e 14 71 75 6f 74 65 5f 66 6c 61 67 14 75 |fun.quote_flag.u|
00000130: 74 66 38 5f 73 74 61 74 65 10 75 74 66 38 5f 76 |tf8_state.utf8_v|
00000140: 61 6c 0e 74 65 72 6d 5f 66 64 1a 74 65 72 6d 5f |al.term_fd.term_|
00000150: 72 65 61 64 5f 62 75 66 14 74 65 72 6d 5f 77 69 |read_buf.term_wi|
00000160: 64 74 68 1a 74 65 72 6d 5f 63 75 72 73 6f 72 5f |dth.term_cursor_|
00000170: 78 10 74 65 72 6d 49 6e 69 74 1c 73 69 67 69 6e |x.termInit.sigin|
00000180: 74 5f 68 61 6e 64 6c 65 72 22 74 65 72 6d 5f 72 |t_handler"term_r|
00000190: 65 61 64 5f 68 61 6e 64 6c 65 72 16 68 61 6e 64 |ead_handler.hand|
000001a0: 6c 65 5f 62 79 74 65 10 69 73 5f 61 6c 70 68 61 |le_byte.is_alpha|
000001b0: 10 69 73 5f 64 69 67 69 74 0e 69 73 5f 77 6f 72 |.is_digit.is_wor|
000001c0: 64 14 75 63 73 5f 6c 65 6e 67 74 68 2a 69 73 5f |d.ucs_length*is_|
000001d0: 74 72 61 69 6c 69 6e 67 5f 73 75 72 72 6f 67 61 |trailing_surroga|
000001e0: 74 65 16 69 73 5f 62 61 6c 61 6e 63 65 64 20 70 |te.is_balanced p|
000001f0: 72 69 6e 74 5f 63 6f 6c 6f 72 5f 74 65 78 74 12 |rint_color_text.|
00000200: 70 72 69 6e 74 5f 63 73 69 08 1b 5b 30 6d 08 6e |print_csi..[0m.n|
00000210: 6f 6e 65 0a 1b 5b 33 30 6d 0a 62 6c 61 63 6b 0a |one..[30m.black.|
00000220: 1b 5b 33 31 6d 06 72 65 64 0a 1b 5b 33 32 6d 0a |.[31m.red..[32m.|
00000230: 67 72 65 65 6e 0a 1b 5b 33 33 6d 0c 79 65 6c 6c |green..[33m.yell|
00000240: 6f 77 0a 1b 5b 33 34 6d 08 62 6c 75 65 0a 1b 5b |ow..[34m.blue..[|
00000250: 33 35 6d 0e 6d 61 67 65 6e 74 61 0a 1b 5b 33 36 |35m.magenta..[36|
00000260: 6d 08 63 79 61 6e 0a 1b 5b 33 37 6d 0a 77 68 69 |m.cyan..[37m.whi|
00000270: 74 65 0e 1b 5b 33 30 3b 31 6d 08 67 72 61 79 08 |te..[30;1m.gray.|
00000280: 67 72 65 79 0e 1b 5b 33 31 3b 31 6d 14 62 72 69 |grey..[31;1m.bri|
00000290: 67 68 74 5f 72 65 64 0e 1b 5b 33 32 3b 31 6d 18 |ght_red..[32;1m.|
000002a0: 62 72 69 67 68 74 5f 67 72 65 65 6e 0e 1b 5b 33 |bright_green..[3|
000002b0: 33 3b 31 6d 1a 62 72 69 67 68 74 5f 79 65 6c 6c |3;1m.bright_yell|
000002c0: 6f 77 0e 1b 5b 33 34 3b 31 6d 16 62 72 69 67 68 |ow..[34;1m.brigh|
000002d0: 74 5f 62 6c 75 65 0e 1b 5b 33 35 3b 31 6d 1c 62 |t_blue..[35;1m.b|
000002e0: 72 69 67 68 74 5f 6d 61 67 65 6e 74 61 0e 1b 5b |right_magenta..[|
000002f0: 33 36 3b 31 6d 16 62 72 69 67 68 74 5f 63 79 61 |36;1m.bright_cya|
00000300: 6e 0e 1b 5b 33 37 3b 31 6d 18 62 72 69 67 68 74 |n..[37;1m.bright|
00000310: 5f 77 68 69 74 65 0e 63 6f 6d 6d 65 6e 74 0a 72 |_white.comment.r|
00000320: 65 67 65 78 0e 6b 65 79 77 6f 72 64 08 74 79 70 |egex.keyword.typ|
00000330: 65 14 69 64 65 6e 74 69 66 69 65 72 0a 65 72 72 |e.identifier.err|
00000340: 6f 72 0c 72 65 73 75 6c 74 12 65 72 72 6f 72 5f |or.result.error_|
00000350: 6d 73 67 0c 71 6a 73 20 3e 20 0c 20 20 2e 2e 2e |msg.qjs > .  ...|
00000360: 20 06 74 61 62 0c 66 69 6c 65 6e 6f 0c 69 73 61 | .tab.fileno.isa|
00000370: 74 74 79 1a 74 74 79 47 65 74 57 69 6e 53 69 7a |tty.ttyGetWinSiz|
00000380: 65 12 74 74 79 53 65 74 52 61 77 0c 73 69 67 6e |e.ttySetRaw.sign|
00000390: 61 6c 0c 53 49 47 49 4e 54 1c 73 65 74 52 65 61 |al.SIGINT.setRea|
000003a0: 64 48 61 6e 64 6c 65 72 02 6c 02 69 08 72 65 61 |dHandler.l.i.rea|
000003b0: 64 0c 62 75 66 66 65 72 02 63 16 68 61 6e 64 6c |d.buffer.c.handl|
000003c0: 65 5f 63 68 61 72 02 41 02 5a 02 61 02 7a 02 5f |e_char.A.Z.a.z._|
000003d0: 02 24 06 73 74 72 06 6c 65 6e 0e 73 74 72 5f 6c |.$.str.len.str_l|
000003e0: 65 6e 14 63 68 61 72 43 6f 64 65 41 74 02 64 16 |en.charCodeAt.d.|
000003f0: 63 6f 64 65 50 6f 69 6e 74 41 74 02 62 04 28 29 |codePointAt.b.()|
00000400: 04 5b 5d 04 7b 7d 0a 73 74 61 72 74 16 73 74 79 |.[].{}.start.sty|
00000410: 6c 65 5f 6e 61 6d 65 73 02 6a 0a 73 74 79 6c 65 |le_names.j.style|
00000420: 08 70 75 74 73 12 73 75 62 73 74 72 69 6e 67 02 |.puts.substring.|
00000430: 6e 08 63 6f 64 65 04 1b 5b 0d c8 03 02 ca 03 02 |n.code..[.......|
00000440: cc 03 02 00 00 02 00 01 fe 01 00 01 01 fe 01 01 |................|
00000450: 00 0c 20 06 01 a4 01 00 00 00 02 02 01 0f 00 ca |.. .............|
00000460: 03 00 0d cc 03 01 0d 08 ec 02 29 c2 00 39 8d 00 |..........)..9..|
00000470: 00 00 f1 0e 06 2f c8 03 0d 00 00 00 04 3a 00 00 |...../.......:..|
00000480: 02 f0 02 06 1b 01 00 0c 43 06 01 00 01 34 01 02 |........C....4..|
00000490: 02 0c f2 03 35 ce 03 00 01 00 ba 02 00 00 00 c2 |....5...........|
000004a0: 02 00 01 00 bc 02 00 02 00 ce 02 00 03 00 ca 02 |................|
000004b0: 00 04 00 d0 03 00 05 00 d2 03 00 06 00 d4 03 00 |................|
000004c0: 07 40 d6 03 00 08 40 d8 03 00 09 00 da 03 00 0a |.@....@.........|
000004d0: 00 dc 03 00 0b 00 de 03 00 0c 00 e0 03 00 0d 00 |................|
000004e0: e2 03 00 0e 00 e4 03 00 0f 00 e6 03 00 10 00 e8 |................|
000004f0: 03 00 11 00 ea 03 00 12 00 ec 03 00 13 40 ee 03 |.............@..|
00000500: 00 14 00 f0 03 00 15 00 f2 03 00 16 00 f4 03 00 |................|
00000510: 17 00 f6 03 00 18 00 f8 03 00 19 00 fa 03 00 1a |................|
00000520: 00 fc 03 00 1b 00 fe 03 00 1c 00 80 04 00 1d 00 |................|
00000530: 82 04 00 1e 00 84 04 00 1f 00 86 04 00 20 00 88 |............. ..|
00000540: 04 00 21 00 8a 04 00 22 40 8c 04 00 23 40 8e 04 |..!...."@...#@..|
00000550: 00 24 40 90 04 00 25 40 92 04 00 26 40 94 04 00 |.$@...%@...&@...|
00000560: 27 00 96 04 00 28 00 98 04 00 29 40 9a 04 00 2a |'....(....)@...*|
00000570: 40 9c 04 00 2b 40 9e 04 00 2c 40 a0 04 00 2d 40 |@...+@...,@...-@|
00000580: a2 04 00 2e 00 a4 04 00 2f 00 a6 04 00 30 00 a8 |......../....0..|
00000590: 04 00 31 00 aa 04 00 32 00 ac 04 00 33 00 ca 03 |..1....2....3...|
000005a0: 00 0c cc 03 01 0c c2 00 c5 28 c2 01 c5 29 c2 02 |.........(...)..|
000005b0: c5 2a c2 03 c5 2b c2 04 c5 2c c2 05 c5 2d c2 06 |.*...+...,...-..|
000005c0: c5 2e c2 07 c5 2f c2 08 c5 30 c2 09 c5 31 c2 0a |...../...0...1..|
000005d0: c5 32 c2 0b c5 33 d3 68 01 00 44 e6 00 00 00 d3 |.2...3.h..D.....|
000005e0: 68 00 00 44 e5 00 00 00 d3 42 9d 00 00 00 cb d3 |h..D.....B......|
000005f0: 42 a1 00 00 00 cc d3 42 9e 00 00 00 cd d3 42 a7 |B......B......B.|
00000600: 00 00 00 ce d3 42 a5 00 00 00 c5 04 d3 42 e8 00 |.....B.......B..|
00000610: 00 00 c5 05 d3 42 e9 00 00 00 c5 06 0b 04 17 01 |.....B..........|
00000620: 00 00 4e 18 01 00 00 04 19 01 00 00 4e 1a 01 00 |..N.........N...|
00000630: 00 04 1b 01 00 00 4e 1c 01 00 00 04 1d 01 00 00 |......N.........|
00000640: 4e 1e 01 00 00 04 1f 01 00 00 4e 20 01 00 00 04 |N.........N ....|
00000650: 21 01 00 00 4e 22 01 00 00 04 23 01 00 00 4e 24 |!...N"....#...N$|
00000660: 01 00 00 04 25 01 00 00 4e 26 01 00 00 04 27 01 |....%...N&....'.|
00000670: 00 00 4e 28 01 00 00 04 29 01 00 00 4e 2a 01 00 |..N(....)...N*..|
00000680: 00 04 29 01 00 00 4e 2b 01 00 00 04 2c 01 00 00 |..)...N+....,...|
00000690: 4e 2d 01 00 00 04 2e 01 00 00 4e 2f 01 00 00 04 |N-........N/....|
000006a0: 30 01 00 00 4e 31 01 00 00 04 32 01 00 00 4e 33 |0...N1....2...N3|
000006b0: 01 00 00 04 34 01 00 00 4e 35 01 00 00 04 36 01 |....4...N5....6.|
000006c0: 00 00 4e 37 01 00 00 04 38 01 00 00 4e 39 01 00 |..N7....8...N9..|
000006d0: 00 c5 07 0b 04 2f 01 00 00 4e 16 00 00 00 04 28 |...../...N.....(|
000006e0: 01 00 00 4e 3a 01 00 00 04 37 01 00 00 4e 4a 00 |...N:....7...NJ.|
000006f0: 00 00 04 26 01 00 00 4e 3b 01 00 00 04 1e 01 00 |...&...N;.......|
00000700: 00 4e 48 00 00 00 04 39 01 00 00 4e 3c 01 00 00 |.NH....9...N<...|
00000710: 04 31 01 00 00 4e 1b 00 00 00 04 35 01 00 00 4e |.1...N.....5...N|
00000720: 3d 01 00 00 04 2f 01 00 00 4e 3e 01 00 00 04 1c |=..../...N>.....|
00000730: 01 00 00 4e 3f 01 00 00 04 39 01 00 00 4e 40 01 |...N?....9...N@.|
00000740: 00 00 04 2d 01 00 00 4e 41 01 00 00 c5 08 26 00 |...-...NA.....&.|
00000750: 00 c5 09 c3 c5 0a c3 c5 0e c3 c5 0f b7 c5 10 04 |................|
00000760: 42 01 00 00 c5 11 04 43 01 00 00 c5 12 0a c5 13 |B......C........|
00000770: 09 c5 14 0a c5 15 b7 c5 17 c3 c5 18 b7 c5 19 c3 |................|
00000780: c5 1a b7 c5 1b c3 c5 1c b7 c5 1d 09 c5 21 b7 c5 |.............!..|
00000790: 22 b7 c5 23 b7 c5 27 29 c8 03 26 1d 01 f4 06 07 |"..#..')..&.....|
000007a0: 0e 2b 0d 07 10 2c 0a 07 02 21 01 07 02 21 03 07 |.+...,...!...!..|
000007b0: 02 21 03 07 02 21 01 07 02 26 06 07 02 26 02 07 |.!...!...&...&..|
000007c0: 02 00 0c 43 06 01 96 04 00 01 00 04 07 00 8b 01 |...C............|
000007d0: 01 88 05 00 00 00 ca 03 00 0c 8e 04 24 01 92 04 |............$...|
000007e0: 26 01 cc 03 01 0c 98 04 29 01 90 04 25 01 9a 04 |&.......)...%...|
000007f0: 2a 01 68 00 00 42 0d 00 00 00 43 45 01 00 00 24 |*.h..B....CE...$|
00000800: 00 00 e4 bf 50 e5 68 03 00 43 46 01 00 00 e0 24 |....P.h..CF....$|
00000810: 01 00 ec 35 68 03 00 42 47 01 00 00 ec 14 68 03 |...5h..BG.....h.|
00000820: 00 43 47 01 00 00 e0 24 01 00 cf ec 05 c7 b7 48 |.CG....$.......H|
00000830: e5 68 03 00 42 48 01 00 00 ec 0e 68 03 00 43 48 |.h..BH.....h..CH|
00000840: 01 00 00 e0 24 01 00 0e 68 03 00 43 49 01 00 00 |....$...h..CI...|
00000850: 68 03 00 42 4a 01 00 00 60 04 00 24 02 00 0e 39 |h..BJ...`..$...9|
00000860: b0 00 00 00 11 bf 40 21 01 00 61 05 00 68 03 00 |......@!..a..h..|
00000870: 43 4b 01 00 00 e0 60 06 00 24 02 00 29 c8 03 4e |CK....`..$..)..N|
00000880: 6a 04 04 1c 11 06 1b 06 1b 0e 18 2d 12 08 11 04 |j..........-....|
00000890: 1b 10 07 01 1c 09 11 04 26 08 11 04 1b 1e 07 01 |........&.......|
000008a0: 17 23 0d 1a 0c 06 0e 27 11 04 27 03 11 04 1b 16 |.#.....'..'.....|
000008b0: 07 01 00 04 08 27 11 04 1b 10 11 04 1b 12 11 17 |.....'..........|
000008c0: 18 16 2a 14 21 3b 11 04 1b 20 07 12 11 13 00 0c |..*.!;... ......|
000008d0: 43 06 01 98 04 00 00 00 02 01 00 04 00 9c 04 2b |C..............+|
000008e0: 01 df ba f1 29 c8 03 07 80 01 04 04 08 0c 16 00 |....)...........|
000008f0: 0c 43 06 01 9a 04 00 02 00 06 04 00 28 02 98 05 |.C..........(...|
00000900: 00 00 00 9a 05 00 01 00 cc 03 01 0c 8e 04 24 01 |..............$.|
00000910: 90 04 25 01 9c 04 2b 01 68 00 00 43 4e 01 00 00 |..%...+.h..CN...|
00000920: e0 e1 42 4f 01 00 00 b7 e1 eb 24 04 00 cb b7 cc |..BO......$.....|
00000930: c8 c7 a5 ec 0b e2 e1 c8 48 f1 0e 95 01 ee f2 29 |........H......)|
00000940: c8 03 27 84 01 04 04 10 11 04 1b 0c 07 12 07 1a |..'.............|
00000950: 20 18 07 1a 07 5f 17 0b 0c 0e 07 08 07 03 12 13 | ...._..........|
00000960: 07 18 07 1c 07 01 07 1b 0b 0a 00 0c 43 06 01 9c |............C...|
00000970: 04 01 00 01 04 03 00 6b 01 a0 05 00 01 00 ec 03 |.......k........|
00000980: 13 01 8a 04 22 01 8c 04 23 01 df 98 ec 0a 39 51 |...."...#.....9Q|
00000990: 01 00 00 d3 f1 0e 29 e0 b7 ae ec 28 d3 c0 80 00 |......)....(....|
000009a0: a8 ec 21 d3 c0 c0 00 a5 ec 1a e1 bd a2 d3 bf 3f |..!............?|
000009b0: af b1 e5 e0 90 e8 b7 ad ec 3b 39 51 01 00 00 e1 |.........;9Q....|
000009c0: f1 0e 29 d3 c0 c0 00 a8 ec 21 d3 c0 f8 00 a5 ec |..)......!......|
000009d0: 1a b8 d3 c0 e0 00 a8 9f d3 c0 f0 00 a8 9f e4 d3 |................|
000009e0: b8 bd e0 a0 a2 b8 a0 af e5 29 b7 e4 39 51 01 00 |.........)..9Q..|
000009f0: 00 d3 f1 0e 29 c8 03 57 8a 01 04 03 12 17 01 1b |....)..W........|
00000a00: 18 07 01 13 0b 0c 16 11 14 16 04 11 16 16 04 12 |................|
00000a10: 39 0c 12 07 12 11 04 07 09 0d 35 08 08 11 16 12 |9.........5.....|
00000a20: 15 1b 18 07 01 14 13 16 04 11 16 16 04 12 27 07 |..............'.|
00000a30: 24 16 04 07 09 07 22 16 04 07 09 0d 23 11 20 07 |$.....".....#. .|
00000a40: 03 07 0b 0c 2a 07 35 14 19 0d 00 1b 18 07 01 00 |....*.5.........|
00000a50: 0c 43 06 01 9e 04 01 00 01 02 00 00 35 01 a0 05 |.C..........5...|
00000a60: 00 01 00 d3 99 04 4a 00 00 00 ad 11 ec 2a 0e d3 |......J......*..|
00000a70: 04 52 01 00 00 a8 11 ec 09 0e d3 04 53 01 00 00 |.R..........S...|
00000a80: a6 11 ed 14 0e d3 04 54 01 00 00 a8 11 ec 09 0e |.......T........|
00000a90: d3 04 55 01 00 00 a6 28 c8 03 19 9e 01 04 03 24 |..U....(.......$|
00000aa0: 07 04 3a 13 20 04 1b 14 20 04 1b 18 20 04 1b 14 |..:. ... ... ...|
00000ab0: 20 04 06 5b 00 0c 43 06 01 a0 04 01 00 01 02 00 | ..[..C.........|
00000ac0: 02 19 01 a0 05 00 01 00 d3 99 04 4a 00 00 00 ad |...........J....|
00000ad0: 11 ec 0e 0e d3 c1 00 a8 11 ec 06 0e d3 c1 01 a6 |................|
00000ae0: 28 c8 03 11 a2 01 04 03 24 07 04 39 22 11 04 1b |(.......$..9"...|
00000af0: 14 11 04 07 5d 00 07 02 30 07 02 39 0c 43 06 01 |....]...0..9.C..|
00000b00: a2 04 01 00 01 02 02 00 2d 01 a0 05 00 01 00 9e |........-.......|
00000b10: 04 2c 01 a0 04 2d 01 d3 99 04 4a 00 00 00 ad 11 |.,...-....J.....|
00000b20: ec 22 0e df d3 f1 11 ed 1b 0e e0 d3 f1 11 ed 14 |."..............|
00000b30: 0e d3 04 56 01 00 00 ab 11 ed 09 0e d3 04 57 01 |...V..........W.|
00000b40: 00 00 ab 28 c8 03 1d a5 01 04 03 24 07 04 3a 15 |...(.......$..:.|
00000b50: 07 12 07 01 1b 0e 07 12 07 01 1b 0e 20 04 1b 14 |............ ...|
00000b60: 20 04 06 61 00 0c 43 06 01 a4 04 01 04 01 03 00 | ..a..C.........|
00000b70: 00 32 05 b0 05 00 01 00 b2 05 00 00 00 a0 05 00 |.2..............|
00000b80: 01 00 9a 05 00 02 00 b4 05 00 03 00 d3 eb ce b7 |................|
00000b90: cb b7 cd c9 ca a5 ec 25 d3 43 5b 01 00 00 c9 24 |.......%.C[....$|
00000ba0: 01 00 d0 01 00 dc 00 00 a5 11 ed 09 0e c8 01 00 |................|
00000bb0: e0 00 00 a8 ec 03 95 00 95 02 ee d8 c7 28 c8 03 |.............(..|
00000bc0: 2f a9 01 04 03 3a 07 06 0d 37 00 02 0a 0a 0c 0e |/....:...7......|
00000bd0: 07 08 07 03 12 0b 07 06 1b 18 07 01 17 1b 1b 04 |................|
00000be0: 1b 18 20 04 12 19 00 02 05 1e 00 04 0a 25 07 0d |.. ..........%..|
00000bf0: 00 0c 43 06 01 a6 04 01 01 01 03 00 00 29 02 a0 |..C..........)..|
00000c00: 05 00 01 00 b8 05 00 00 00 d3 99 04 4a 00 00 00 |............J...|
00000c10: ae ec 03 09 28 d3 43 5d 01 00 00 b7 24 01 00 cf |....(.C]....$...|
00000c20: 01 00 dc 00 00 a8 11 ec 09 0e c7 01 00 e0 00 00 |................|
00000c30: a5 28 c8 03 19 b7 01 04 04 1e 07 04 35 11 08 00 |.(..........5...|
00000c40: 07 02 20 18 17 13 1b 04 1b 1a 20 04 07 2f 00 0c |.. ....... ../..|
00000c50: 43 06 01 a8 04 02 00 02 03 00 00 25 02 a8 05 00 |C..........%....|
00000c60: 01 00 bc 05 00 01 00 d3 d4 9f 11 04 5f 01 00 00 |............_...|
00000c70: ad ed 0a 11 04 60 01 00 00 ad ec 03 ee 0a 11 04 |.....`..........|
00000c80: 61 01 00 00 ad ec 03 0a 28 0e 09 28 c8 03 0f be |a.......(..(....|
00000c90: 01 04 03 18 07 08 07 03 00 1f 08 03 13 0f 00 0c |................|
00000ca0: 43 06 01 aa 04 03 03 03 06 03 00 65 06 b0 05 00 |C..........e....|
00000cb0: 01 00 c4 05 00 01 00 c6 05 00 01 00 9a 05 00 00 |................|
00000cc0: 00 c8 05 00 01 00 ca 05 00 02 00 ca 03 00 0c d4 |................|
00000cd0: 03 07 01 d6 03 08 01 d4 cc c8 d3 eb a5 ec 5d d5 |..............].|
00000ce0: c8 cf 48 cd c8 91 d0 d3 eb a5 11 ec 07 0e d5 c8 |..H.............|
00000cf0: 48 c9 ab ed f0 68 00 00 43 66 01 00 00 e0 e1 c9 |H....h..Cf......|
00000d00: 48 11 ed 07 0e 04 16 00 00 00 48 24 01 00 0e 68 |H.........H$...h|
00000d10: 00 00 43 66 01 00 00 d3 43 67 01 00 00 c7 c8 24 |..Cf....Cg.....$|
00000d20: 02 00 24 01 00 0e 68 00 00 43 66 01 00 00 e0 04 |..$...h..Cf.....|
00000d30: 18 01 00 00 48 24 01 00 0e ee 9f 29 c8 03 51 c7 |....H$.....)..Q.|
00000d40: 01 04 04 1a 0c 0e 07 08 07 06 07 09 12 03 07 20 |............... |
00000d50: 0c 09 0d 1b 07 03 0c 0c 07 06 07 09 1b 20 07 18 |............. ..|
00000d60: 07 01 07 0e 07 05 13 53 11 06 1b 0c 07 0e 07 0e |.......S........|
00000d70: 07 01 34 0d 07 0d 17 0f 11 06 1b 0c 07 06 1b 16 |..4.............|
00000d80: 07 06 07 07 11 1b 17 0f 11 06 1b 0c 20 0c 07 0d |............ ...|
00000d90: 00 0c 43 06 01 ac 04 02 00 02 05 01 00 1d 02 d0 |..C.............|
00000da0: 05 00 01 00 d2 05 00 01 00 ca 03 00 0c 68 00 00 |.............h..|
00000db0: 43 66 01 00 00 04 6a 01 00 00 d3 b8 ac ec 04 d3 |Cf....j.........|
00000dc0: ee 02 c3 9f d4 9f 24 01 00 29 c8 03 15 d2 01 04 |......$..)......|
00000dd0: 03 08 11 06 34 24 0c 04 11 10 16 1b 07 30 07 03 |....4$.......0..|
00000de0: 07 3d 00                                        |.=.|
```

### WASM
```
00000000: 05 87 01 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |...P__tests__/fi|
00000010: 78 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 |xtures/quickjs-t|
00000020: 65 73 74 73 2f 72 65 70 6c 2e 6a 73 06 73 74 64 |ests/repl.js.std|
00000030: 04 6f 73 02 67 10 69 73 46 69 6e 69 74 65 14 70 |.os.g.isFinite.p|
00000040: 61 72 73 65 46 6c 6f 61 74 0c 63 6f 6c 6f 72 73 |arseFloat.colors|
00000050: 0c 73 74 79 6c 65 73 0e 68 69 73 74 6f 72 79 14 |.styles.history.|
00000060: 63 6c 69 70 5f 62 6f 61 72 64 08 70 72 65 63 0e |clip_board.prec.|
00000070: 65 78 70 42 69 74 73 0e 6c 6f 67 32 5f 31 30 0c |expBits.log2_10.|
00000080: 70 73 74 61 74 65 0c 70 72 6f 6d 70 74 08 70 6c |pstate.prompt.pl|
00000090: 65 6e 06 70 73 31 06 70 73 32 08 75 74 66 38 12 |en.ps1.ps2.utf8.|
000000a0: 73 68 6f 77 5f 74 69 6d 65 16 73 68 6f 77 5f 63 |show_time.show_c|
000000b0: 6f 6c 6f 72 73 1e 65 76 61 6c 5f 73 74 61 72 74 |olors.eval_start|
000000c0: 5f 74 69 6d 65 12 65 76 61 6c 5f 74 69 6d 65 0a |_time.eval_time.|
000000d0: 6d 65 78 70 72 0a 6c 65 76 65 6c 06 63 6d 64 14 |mexpr.level.cmd.|
000000e0: 63 75 72 73 6f 72 5f 70 6f 73 10 6c 61 73 74 5f |cursor_pos.last_|
000000f0: 63 6d 64 1e 6c 61 73 74 5f 63 75 72 73 6f 72 5f |cmd.last_cursor_|
00000100: 70 6f 73 1a 68 69 73 74 6f 72 79 5f 69 6e 64 65 |pos.history_inde|
00000110: 78 10 74 68 69 73 5f 66 75 6e 10 6c 61 73 74 5f |x.this_fun.last_|
00000120: 66 75 6e 14 71 75 6f 74 65 5f 66 6c 61 67 14 75 |fun.quote_flag.u|
00000130: 74 66 38 5f 73 74 61 74 65 10 75 74 66 38 5f 76 |tf8_state.utf8_v|
00000140: 61 6c 0e 74 65 72 6d 5f 66 64 1a 74 65 72 6d 5f |al.term_fd.term_|
00000150: 72 65 61 64 5f 62 75 66 14 74 65 72 6d 5f 77 69 |read_buf.term_wi|
00000160: 64 74 68 1a 74 65 72 6d 5f 63 75 72 73 6f 72 5f |dth.term_cursor_|
00000170: 78 10 74 65 72 6d 49 6e 69 74 1c 73 69 67 69 6e |x.termInit.sigin|
00000180: 74 5f 68 61 6e 64 6c 65 72 22 74 65 72 6d 5f 72 |t_handler"term_r|
00000190: 65 61 64 5f 68 61 6e 64 6c 65 72 16 68 61 6e 64 |ead_handler.hand|
000001a0: 6c 65 5f 62 79 74 65 10 69 73 5f 61 6c 70 68 61 |le_byte.is_alpha|
000001b0: 10 69 73 5f 64 69 67 69 74 0e 69 73 5f 77 6f 72 |.is_digit.is_wor|
000001c0: 64 14 75 63 73 5f 6c 65 6e 67 74 68 2a 69 73 5f |d.ucs_length*is_|
000001d0: 74 72 61 69 6c 69 6e 67 5f 73 75 72 72 6f 67 61 |trailing_surroga|
000001e0: 74 65 16 69 73 5f 62 61 6c 61 6e 63 65 64 20 70 |te.is_balanced p|
000001f0: 72 69 6e 74 5f 63 6f 6c 6f 72 5f 74 65 78 74 12 |rint_color_text.|
00000200: 70 72 69 6e 74 5f 63 73 69 08 1b 5b 30 6d 08 6e |print_csi..[0m.n|
00000210: 6f 6e 65 0a 1b 5b 33 30 6d 0a 62 6c 61 63 6b 0a |one..[30m.black.|
00000220: 1b 5b 33 31 6d 06 72 65 64 0a 1b 5b 33 32 6d 0a |.[31m.red..[32m.|
00000230: 67 72 65 65 6e 0a 1b 5b 33 33 6d 0c 79 65 6c 6c |green..[33m.yell|
00000240: 6f 77 0a 1b 5b 33 34 6d 08 62 6c 75 65 0a 1b 5b |ow..[34m.blue..[|
00000250: 33 35 6d 0e 6d 61 67 65 6e 74 61 0a 1b 5b 33 36 |35m.magenta..[36|
00000260: 6d 08 63 79 61 6e 0a 1b 5b 33 37 6d 0a 77 68 69 |m.cyan..[37m.whi|
00000270: 74 65 0e 1b 5b 33 30 3b 31 6d 08 67 72 61 79 08 |te..[30;1m.gray.|
00000280: 67 72 65 79 0e 1b 5b 33 31 3b 31 6d 14 62 72 69 |grey..[31;1m.bri|
00000290: 67 68 74 5f 72 65 64 0e 1b 5b 33 32 3b 31 6d 18 |ght_red..[32;1m.|
000002a0: 62 72 69 67 68 74 5f 67 72 65 65 6e 0e 1b 5b 33 |bright_green..[3|
000002b0: 33 3b 31 6d 1a 62 72 69 67 68 74 5f 79 65 6c 6c |3;1m.bright_yell|
000002c0: 6f 77 0e 1b 5b 33 34 3b 31 6d 16 62 72 69 67 68 |ow..[34;1m.brigh|
000002d0: 74 5f 62 6c 75 65 0e 1b 5b 33 35 3b 31 6d 1c 62 |t_blue..[35;1m.b|
000002e0: 72 69 67 68 74 5f 6d 61 67 65 6e 74 61 0e 1b 5b |right_magenta..[|
000002f0: 33 36 3b 31 6d 16 62 72 69 67 68 74 5f 63 79 61 |36;1m.bright_cya|
00000300: 6e 0e 1b 5b 33 37 3b 31 6d 18 62 72 69 67 68 74 |n..[37;1m.bright|
00000310: 5f 77 68 69 74 65 0e 63 6f 6d 6d 65 6e 74 0a 72 |_white.comment.r|
00000320: 65 67 65 78 0e 6b 65 79 77 6f 72 64 08 74 79 70 |egex.keyword.typ|
00000330: 65 14 69 64 65 6e 74 69 66 69 65 72 0a 65 72 72 |e.identifier.err|
00000340: 6f 72 0c 72 65 73 75 6c 74 12 65 72 72 6f 72 5f |or.result.error_|
00000350: 6d 73 67 0c 71 6a 73 20 3e 20 0c 20 20 2e 2e 2e |msg.qjs > .  ...|
00000360: 20 06 74 61 62 0c 66 69 6c 65 6e 6f 0c 69 73 61 | .tab.fileno.isa|
00000370: 74 74 79 1a 74 74 79 47 65 74 57 69 6e 53 69 7a |tty.ttyGetWinSiz|
00000380: 65 12 74 74 79 53 65 74 52 61 77 0c 73 69 67 6e |e.ttySetRaw.sign|
00000390: 61 6c 0c 53 49 47 49 4e 54 1c 73 65 74 52 65 61 |al.SIGINT.setRea|
000003a0: 64 48 61 6e 64 6c 65 72 02 6c 02 69 08 72 65 61 |dHandler.l.i.rea|
000003b0: 64 0c 62 75 66 66 65 72 02 63 16 68 61 6e 64 6c |d.buffer.c.handl|
000003c0: 65 5f 63 68 61 72 02 41 02 5a 02 61 02 7a 02 5f |e_char.A.Z.a.z._|
000003d0: 02 24 06 73 74 72 06 6c 65 6e 0e 73 74 72 5f 6c |.$.str.len.str_l|
000003e0: 65 6e 14 63 68 61 72 43 6f 64 65 41 74 02 64 16 |en.charCodeAt.d.|
000003f0: 63 6f 64 65 50 6f 69 6e 74 41 74 02 62 04 28 29 |codePointAt.b.()|
00000400: 04 5b 5d 04 7b 7d 0a 73 74 61 72 74 16 73 74 79 |.[].{}.start.sty|
00000410: 6c 65 5f 6e 61 6d 65 73 02 6a 0a 73 74 79 6c 65 |le_names.j.style|
00000420: 08 70 75 74 73 12 73 75 62 73 74 72 69 6e 67 02 |.puts.substring.|
00000430: 6e 08 63 6f 64 65 04 1b 5b 0d c8 03 02 ca 03 02 |n.code..[.......|
00000440: cc 03 02 00 00 02 00 01 fe 01 00 01 01 fe 01 01 |................|
00000450: 00 0c 20 06 01 a4 01 00 00 00 02 02 01 0f 00 ca |.. .............|
00000460: 03 00 0d cc 03 01 0d 08 ec 02 29 c2 00 39 8d 00 |..........)..9..|
00000470: 00 00 f1 0e 06 2f c8 03 0d 00 00 00 04 3a 00 00 |...../.......:..|
00000480: 02 f0 02 06 1b 01 00 0c 43 06 01 00 01 34 01 02 |........C....4..|
00000490: 02 0c f2 03 35 ce 03 00 01 00 ba 02 00 00 00 c2 |....5...........|
000004a0: 02 00 01 00 bc 02 00 02 00 ce 02 00 03 00 ca 02 |................|
000004b0: 00 04 00 d0 03 00 05 00 d2 03 00 06 00 d4 03 00 |................|
000004c0: 07 40 d6 03 00 08 40 d8 03 00 09 00 da 03 00 0a |.@....@.........|
000004d0: 00 dc 03 00 0b 00 de 03 00 0c 00 e0 03 00 0d 00 |................|
000004e0: e2 03 00 0e 00 e4 03 00 0f 00 e6 03 00 10 00 e8 |................|
000004f0: 03 00 11 00 ea 03 00 12 00 ec 03 00 13 40 ee 03 |.............@..|
00000500: 00 14 00 f0 03 00 15 00 f2 03 00 16 00 f4 03 00 |................|
00000510: 17 00 f6 03 00 18 00 f8 03 00 19 00 fa 03 00 1a |................|
00000520: 00 fc 03 00 1b 00 fe 03 00 1c 00 80 04 00 1d 00 |................|
00000530: 82 04 00 1e 00 84 04 00 1f 00 86 04 00 20 00 88 |............. ..|
00000540: 04 00 21 00 8a 04 00 22 40 8c 04 00 23 40 8e 04 |..!...."@...#@..|
00000550: 00 24 40 90 04 00 25 40 92 04 00 26 40 94 04 00 |.$@...%@...&@...|
00000560: 27 00 96 04 00 28 00 98 04 00 29 40 9a 04 00 2a |'....(....)@...*|
00000570: 40 9c 04 00 2b 40 9e 04 00 2c 40 a0 04 00 2d 40 |@...+@...,@...-@|
00000580: a2 04 00 2e 00 a4 04 00 2f 00 a6 04 00 30 00 a8 |......../....0..|
00000590: 04 00 31 00 aa 04 00 32 00 ac 04 00 33 00 ca 03 |..1....2....3...|
000005a0: 00 0c cc 03 01 0c c2 00 c5 28 c2 01 c5 29 c2 02 |.........(...)..|
000005b0: c5 2a c2 03 c5 2b c2 04 c5 2c c2 05 c5 2d c2 06 |.*...+...,...-..|
000005c0: c5 2e c2 07 c5 2f c2 08 c5 30 c2 09 c5 31 c2 0a |...../...0...1..|
000005d0: c5 32 c2 0b c5 33 d3 68 01 00 44 e6 00 00 00 d3 |.2...3.h..D.....|
000005e0: 68 00 00 44 e5 00 00 00 d3 42 9d 00 00 00 cb d3 |h..D.....B......|
000005f0: 42 a1 00 00 00 cc d3 42 9e 00 00 00 cd d3 42 a7 |B......B......B.|
00000600: 00 00 00 ce d3 42 a5 00 00 00 c5 04 d3 42 e8 00 |.....B.......B..|
00000610: 00 00 c5 05 d3 42 e9 00 00 00 c5 06 0b 04 17 01 |.....B..........|
00000620: 00 00 4e 18 01 00 00 04 19 01 00 00 4e 1a 01 00 |..N.........N...|
00000630: 00 04 1b 01 00 00 4e 1c 01 00 00 04 1d 01 00 00 |......N.........|
00000640: 4e 1e 01 00 00 04 1f 01 00 00 4e 20 01 00 00 04 |N.........N ....|
00000650: 21 01 00 00 4e 22 01 00 00 04 23 01 00 00 4e 24 |!...N"....#...N$|
00000660: 01 00 00 04 25 01 00 00 4e 26 01 00 00 04 27 01 |....%...N&....'.|
00000670: 00 00 4e 28 01 00 00 04 29 01 00 00 4e 2a 01 00 |..N(....)...N*..|
00000680: 00 04 29 01 00 00 4e 2b 01 00 00 04 2c 01 00 00 |..)...N+....,...|
00000690: 4e 2d 01 00 00 04 2e 01 00 00 4e 2f 01 00 00 04 |N-........N/....|
000006a0: 30 01 00 00 4e 31 01 00 00 04 32 01 00 00 4e 33 |0...N1....2...N3|
000006b0: 01 00 00 04 34 01 00 00 4e 35 01 00 00 04 36 01 |....4...N5....6.|
000006c0: 00 00 4e 37 01 00 00 04 38 01 00 00 4e 39 01 00 |..N7....8...N9..|
000006d0: 00 c5 07 0b 04 2f 01 00 00 4e 16 00 00 00 04 28 |...../...N.....(|
000006e0: 01 00 00 4e 3a 01 00 00 04 37 01 00 00 4e 4a 00 |...N:....7...NJ.|
000006f0: 00 00 04 26 01 00 00 4e 3b 01 00 00 04 1e 01 00 |...&...N;.......|
00000700: 00 4e 48 00 00 00 04 39 01 00 00 4e 3c 01 00 00 |.NH....9...N<...|
00000710: 04 31 01 00 00 4e 1b 00 00 00 04 35 01 00 00 4e |.1...N.....5...N|
00000720: 3d 01 00 00 04 2f 01 00 00 4e 3e 01 00 00 04 1c |=..../...N>.....|
00000730: 01 00 00 4e 3f 01 00 00 04 39 01 00 00 4e 40 01 |...N?....9...N@.|
00000740: 00 00 04 2d 01 00 00 4e 41 01 00 00 c5 08 26 00 |...-...NA.....&.|
00000750: 00 c5 09 c3 c5 0a c3 c5 0e c3 c5 0f b7 c5 10 04 |................|
00000760: 42 01 00 00 c5 11 04 43 01 00 00 c5 12 0a c5 13 |B......C........|
00000770: 09 c5 14 0a c5 15 b7 c5 17 c3 c5 18 b7 c5 19 c3 |................|
00000780: c5 1a b7 c5 1b c3 c5 1c b7 c5 1d 09 c5 21 b7 c5 |.............!..|
00000790: 22 b7 c5 23 b7 c5 27 29 c8 03 26 1d 01 f4 06 07 |"..#..')..&.....|
000007a0: 0e 2b 0d 07 10 2c 0a 07 02 21 01 07 02 21 03 07 |.+...,...!...!..|
000007b0: 02 21 03 07 02 21 01 07 02 26 06 07 02 26 02 07 |.!...!...&...&..|
000007c0: 02 00 0c 43 06 01 96 04 00 01 00 04 07 00 8b 01 |...C............|
000007d0: 01 88 05 00 00 00 8e 04 24 01 ca 03 00 0c 92 04 |........$.......|
000007e0: 26 01 cc 03 01 0c 98 04 29 01 90 04 25 01 9a 04 |&.......)...%...|
000007f0: 2a 01 68 01 00 42 0d 00 00 00 43 45 01 00 00 24 |*.h..B....CE...$|
00000800: 00 00 e3 bf 50 e5 68 03 00 43 46 01 00 00 df 24 |....P.h..CF....$|
00000810: 01 00 ec 35 68 03 00 42 47 01 00 00 ec 14 68 03 |...5h..BG.....h.|
00000820: 00 43 47 01 00 00 df 24 01 00 cf ec 05 c7 b7 48 |.CG....$.......H|
00000830: e5 68 03 00 42 48 01 00 00 ec 0e 68 03 00 43 48 |.h..BH.....h..CH|
00000840: 01 00 00 df 24 01 00 0e 68 03 00 43 49 01 00 00 |....$...h..CI...|
00000850: 68 03 00 42 4a 01 00 00 60 04 00 24 02 00 0e 39 |h..BJ...`..$...9|
00000860: b0 00 00 00 11 bf 40 21 01 00 61 05 00 68 03 00 |......@!..a..h..|
00000870: 43 4b 01 00 00 df 60 06 00 24 02 00 29 c8 03 4e |CK....`..$..)..N|
00000880: 6a 04 04 1c 11 06 1b 06 1b 0e 18 2d 12 08 11 04 |j..........-....|
00000890: 1b 10 07 01 1c 09 11 04 26 08 11 04 1b 1e 07 01 |........&.......|
000008a0: 17 23 0d 1a 0c 06 0e 27 11 04 27 03 11 04 1b 16 |.#.....'..'.....|
000008b0: 07 01 00 04 08 27 11 04 1b 10 11 04 1b 12 11 17 |.....'..........|
000008c0: 18 16 2a 14 21 3b 11 04 1b 20 07 12 11 13 00 0c |..*.!;... ......|
000008d0: 43 06 01 98 04 00 00 00 02 01 00 04 00 9c 04 2b |C..............+|
000008e0: 01 df ba f1 29 c8 03 07 80 01 04 04 08 0c 16 00 |....)...........|
000008f0: 0c 43 06 01 9a 04 00 02 00 06 04 00 28 02 98 05 |.C..........(...|
00000900: 00 00 00 9a 05 00 01 00 cc 03 01 0c 8e 04 24 01 |..............$.|
00000910: 90 04 25 01 9c 04 2b 01 68 00 00 43 4e 01 00 00 |..%...+.h..CN...|
00000920: e0 e1 42 4f 01 00 00 b7 e1 eb 24 04 00 cb b7 cc |..BO......$.....|
00000930: c8 c7 a5 ec 0b e2 e1 c8 48 f1 0e 95 01 ee f2 29 |........H......)|
00000940: c8 03 27 84 01 04 04 10 11 04 1b 0c 07 12 07 1a |..'.............|
00000950: 20 18 07 1a 07 5f 17 0b 0c 0e 07 08 07 03 12 13 | ...._..........|
00000960: 07 18 07 1c 07 01 07 1b 0b 0a 00 0c 43 06 01 9c |............C...|
00000970: 04 01 00 01 04 03 00 6b 01 a0 05 00 01 00 ec 03 |.......k........|
00000980: 13 01 8a 04 22 01 8c 04 23 01 df 98 ec 0a 39 51 |...."...#.....9Q|
00000990: 01 00 00 d3 f1 0e 29 e0 b7 ae ec 28 d3 c0 80 00 |......)....(....|
000009a0: a8 ec 21 d3 c0 c0 00 a5 ec 1a e1 bd a2 d3 bf 3f |..!............?|
000009b0: af b1 e5 e0 90 e8 b7 ad ec 3b 39 51 01 00 00 e1 |.........;9Q....|
000009c0: f1 0e 29 d3 c0 c0 00 a8 ec 21 d3 c0 f8 00 a5 ec |..)......!......|
000009d0: 1a b8 d3 c0 e0 00 a8 9f d3 c0 f0 00 a8 9f e4 d3 |................|
000009e0: b8 bd e0 a0 a2 b8 a0 af e5 29 b7 e4 39 51 01 00 |.........)..9Q..|
000009f0: 00 d3 f1 0e 29 c8 03 57 8a 01 04 03 12 17 01 1b |....)..W........|
00000a00: 18 07 01 13 0b 0c 16 11 14 16 04 11 16 16 04 12 |................|
00000a10: 39 0c 12 07 12 11 04 07 09 0d 35 08 08 11 16 12 |9.........5.....|
00000a20: 15 1b 18 07 01 14 13 16 04 11 16 16 04 12 27 07 |..............'.|
00000a30: 24 16 04 07 09 07 22 16 04 07 09 0d 23 11 20 07 |$.....".....#. .|
00000a40: 03 07 0b 0c 2a 07 35 14 19 0d 00 1b 18 07 01 00 |....*.5.........|
00000a50: 0c 43 06 01 9e 04 01 00 01 02 00 00 35 01 a0 05 |.C..........5...|
00000a60: 00 01 00 d3 99 04 4a 00 00 00 ad 11 ec 2a 0e d3 |......J......*..|
00000a70: 04 52 01 00 00 a8 11 ec 09 0e d3 04 53 01 00 00 |.R..........S...|
00000a80: a6 11 ed 14 0e d3 04 54 01 00 00 a8 11 ec 09 0e |.......T........|
00000a90: d3 04 55 01 00 00 a6 28 c8 03 19 9e 01 04 03 24 |..U....(.......$|
00000aa0: 07 04 3a 13 20 04 1b 14 20 04 1b 18 20 04 1b 14 |..:. ... ... ...|
00000ab0: 20 04 06 5b 00 0c 43 06 01 a0 04 01 00 01 02 00 | ..[..C.........|
00000ac0: 02 19 01 a0 05 00 01 00 d3 99 04 4a 00 00 00 ad |...........J....|
00000ad0: 11 ec 0e 0e d3 c1 00 a8 11 ec 06 0e d3 c1 01 a6 |................|
00000ae0: 28 c8 03 11 a2 01 04 03 24 07 04 39 22 11 04 1b |(.......$..9"...|
00000af0: 14 11 04 07 5d 00 07 02 30 07 02 39 0c 43 06 01 |....]...0..9.C..|
00000b00: a2 04 01 00 01 02 02 00 2d 01 a0 05 00 01 00 9e |........-.......|
00000b10: 04 2c 01 a0 04 2d 01 d3 99 04 4a 00 00 00 ad 11 |.,...-....J.....|
00000b20: ec 22 0e df d3 f1 11 ed 1b 0e e0 d3 f1 11 ed 14 |."..............|
00000b30: 0e d3 04 56 01 00 00 ab 11 ed 09 0e d3 04 57 01 |...V..........W.|
00000b40: 00 00 ab 28 c8 03 1d a5 01 04 03 24 07 04 3a 15 |...(.......$..:.|
00000b50: 07 12 07 01 1b 0e 07 12 07 01 1b 0e 20 04 1b 14 |............ ...|
00000b60: 20 04 06 61 00 0c 43 06 01 a4 04 01 04 01 03 00 | ..a..C.........|
00000b70: 00 32 05 b0 05 00 01 00 b2 05 00 00 00 a0 05 00 |.2..............|
00000b80: 01 00 9a 05 00 02 00 b4 05 00 03 00 d3 eb ce b7 |................|
00000b90: cb b7 cd c9 ca a5 ec 25 d3 43 5b 01 00 00 c9 24 |.......%.C[....$|
00000ba0: 01 00 d0 01 00 dc 00 00 a5 11 ed 09 0e c8 01 00 |................|
00000bb0: e0 00 00 a8 ec 03 95 00 95 02 ee d8 c7 28 c8 03 |.............(..|
00000bc0: 2f a9 01 04 03 3a 07 06 0d 37 00 02 0a 0a 0c 0e |/....:...7......|
00000bd0: 07 08 07 03 12 0b 07 06 1b 18 07 01 17 1b 1b 04 |................|
00000be0: 1b 18 20 04 12 19 00 02 05 1e 00 04 0a 25 07 0d |.. ..........%..|
00000bf0: 00 0c 43 06 01 a6 04 01 01 01 03 00 00 29 02 a0 |..C..........)..|
00000c00: 05 00 01 00 b8 05 00 00 00 d3 99 04 4a 00 00 00 |............J...|
00000c10: ae ec 03 09 28 d3 43 5d 01 00 00 b7 24 01 00 cf |....(.C]....$...|
00000c20: 01 00 dc 00 00 a8 11 ec 09 0e c7 01 00 e0 00 00 |................|
00000c30: a5 28 c8 03 19 b7 01 04 04 1e 07 04 35 11 08 00 |.(..........5...|
00000c40: 07 02 20 18 17 13 1b 04 1b 1a 20 04 07 2f 00 0c |.. ....... ../..|
00000c50: 43 06 01 a8 04 02 00 02 03 00 00 23 02 a8 05 00 |C..........#....|
00000c60: 01 00 bc 05 00 01 00 d3 d4 9f 11 04 5f 01 00 00 |............_...|
00000c70: ad ed 13 11 04 60 01 00 00 ad ed 0a 11 04 61 01 |.....`........a.|
00000c80: 00 00 ad ec 03 0a 28 0e 09 28 c8 03 0f be 01 04 |......(..(......|
00000c90: 03 18 07 08 07 03 00 1d 08 03 13 0f 00 0c 43 06 |..............C.|
00000ca0: 01 aa 04 03 03 03 06 03 00 63 06 b0 05 00 01 00 |.........c......|
00000cb0: c4 05 00 01 00 c6 05 00 01 00 9a 05 00 00 00 c8 |................|
00000cc0: 05 00 01 00 ca 05 00 02 00 ca 03 00 0c d4 03 07 |................|
00000cd0: 01 d6 03 08 01 d4 cc c8 d3 eb a5 ec 5b d5 c8 cf |............[...|
00000ce0: 48 cd c8 91 d0 d3 eb a5 ec 08 d5 c8 48 c9 ab ed |H...........H...|
00000cf0: f2 68 00 00 43 66 01 00 00 e0 e1 c9 48 11 ed 07 |.h..Cf......H...|
00000d00: 0e 04 16 00 00 00 48 24 01 00 0e 68 00 00 43 66 |......H$...h..Cf|
00000d10: 01 00 00 d3 43 67 01 00 00 c7 c8 24 02 00 24 01 |....Cg.....$..$.|
00000d20: 00 0e 68 00 00 43 66 01 00 00 e0 04 18 01 00 00 |..h..Cf.........|
00000d30: 48 24 01 00 0e ee a1 29 c8 03 51 c7 01 04 04 1a |H$.....)..Q.....|
00000d40: 0c 0e 07 08 07 06 07 09 12 03 07 20 0c 09 0d 1b |........... ....|
00000d50: 07 03 0c 0c 07 06 07 09 11 20 07 18 07 01 07 0e |......... ......|
00000d60: 07 05 13 53 11 06 1b 0c 07 0e 07 0e 07 01 34 0d |...S..........4.|
00000d70: 07 0d 17 0f 11 06 1b 0c 07 06 1b 16 07 06 07 07 |................|
00000d80: 11 1b 17 0f 11 06 1b 0c 20 0c 07 0d 00 0c 43 06 |........ .....C.|
00000d90: 01 ac 04 02 00 02 05 01 00 1d 02 d0 05 00 01 00 |................|
00000da0: d2 05 00 01 00 ca 03 00 0c 68 00 00 43 66 01 00 |.........h..Cf..|
00000db0: 00 04 6a 01 00 00 d3 b8 ac ec 04 d3 ee 02 c3 9f |..j.............|
00000dc0: d4 9f 24 01 00 29 c8 03 15 d2 01 04 03 08 11 06 |..$..)..........|
00000dd0: 34 24 0c 04 11 10 16 1b 07 30 07 03 07 3d 00    |4$.......0...=.|
```