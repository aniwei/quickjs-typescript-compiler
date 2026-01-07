# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/test_std.ts
**生成时间**: 2026-01-07T15:57:02.852Z

## 大小对比

- TypeScript编译器: 7264 字节
- WASM编译器: 7264 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 156,
  "atoms": [
    {
      "index": 0,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_std.js",
      "offset": 3
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "std",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 49
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 51
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_printf",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_file1",
      "offset": 70
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_file2",
      "offset": 81
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_getline",
      "offset": 92
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_popen",
      "offset": 105
    },
    {
      "index": 10,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_ext_json",
      "offset": 116
    },
    {
      "index": 11,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_os",
      "offset": 130
    },
    {
      "index": 12,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_os_exec",
      "offset": 138
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_timer",
      "offset": 151
    },
    {
      "index": 14,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_async_gc",
      "offset": 162
    },
    {
      "index": 15,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "test_async_promise_rejection",
      "offset": 176
    },
    {
      "index": 16,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "loadScript",
      "offset": 205
    },
    {
      "index": 17,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 216
    },
    {
      "index": 18,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 231
    },
    {
      "index": 19,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 238
    },
    {
      "index": 20,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 247
    },
    {
      "index": 21,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 250
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 274
    },
    {
      "index": 23,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 276
    },
    {
      "index": 24,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 289
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 292
    },
    {
      "index": 26,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sprintf",
      "offset": 294
    },
    {
      "index": 27,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "a=%d s=%s",
      "offset": 302
    },
    {
      "index": 28,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abc",
      "offset": 312
    },
    {
      "index": 29,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "a=123 s=abc",
      "offset": 316
    },
    {
      "index": 30,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "%010d",
      "offset": 328
    },
    {
      "index": 31,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "0000000123",
      "offset": 334
    },
    {
      "index": 32,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "%x",
      "offset": 345
    },
    {
      "index": 33,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fffffffe",
      "offset": 348
    },
    {
      "index": 34,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "%lx",
      "offset": 357
    },
    {
      "index": 35,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "fffffffffffffffe",
      "offset": 361
    },
    {
      "index": 36,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "%10.1f",
      "offset": 378
    },
    {
      "index": 37,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "       2.1",
      "offset": 385
    },
    {
      "index": 38,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "%*.*f",
      "offset": 396
    },
    {
      "index": 39,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "     -2.13",
      "offset": 402
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "%#lx",
      "offset": 413
    },
    {
      "index": 41,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "0x7fffffffffffffff",
      "offset": 418
    },
    {
      "index": 42,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 437
    },
    {
      "index": 43,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "len",
      "offset": 439
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 443
    },
    {
      "index": 45,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "size",
      "offset": 447
    },
    {
      "index": 46,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 452
    },
    {
      "index": 47,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ret",
      "offset": 456
    },
    {
      "index": 48,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 460
    },
    {
      "index": 49,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "str1",
      "offset": 462
    },
    {
      "index": 50,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "tmpfile",
      "offset": 467
    },
    {
      "index": 51,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "hello world\n",
      "offset": 475
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "puts",
      "offset": 488
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "seek",
      "offset": 493
    },
    {
      "index": 54,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SEEK_SET",
      "offset": 498
    },
    {
      "index": 55,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "readAsString",
      "offset": 507
    },
    {
      "index": 56,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SEEK_END",
      "offset": 520
    },
    {
      "index": 57,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tell",
      "offset": 529
    },
    {
      "index": 58,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "read",
      "offset": 534
    },
    {
      "index": 59,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "buffer",
      "offset": 539
    },
    {
      "index": 60,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "charCodeAt",
      "offset": 546
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "close",
      "offset": 557
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "putByte",
      "offset": 563
    },
    {
      "index": 63,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getByte",
      "offset": 571
    },
    {
      "index": 64,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "line",
      "offset": 579
    },
    {
      "index": 65,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "line_count",
      "offset": 584
    },
    {
      "index": 66,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lines",
      "offset": 595
    },
    {
      "index": 67,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hello world",
      "offset": 601
    },
    {
      "index": 68,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "line 1",
      "offset": 613
    },
    {
      "index": 69,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "line 2",
      "offset": 620
    },
    {
      "index": 70,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "\n",
      "offset": 627
    },
    {
      "index": 71,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "eof",
      "offset": 629
    },
    {
      "index": 72,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getline",
      "offset": 633
    },
    {
      "index": 73,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "fname",
      "offset": 641
    },
    {
      "index": 74,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "content",
      "offset": 647
    },
    {
      "index": 75,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "tmp_file.txt",
      "offset": 655
    },
    {
      "index": 76,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "open",
      "offset": 668
    },
    {
      "index": 77,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "w",
      "offset": 673
    },
    {
      "index": 78,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "loadFile",
      "offset": 675
    },
    {
      "index": 79,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "popen",
      "offset": 684
    },
    {
      "index": 80,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cat ",
      "offset": 690
    },
    {
      "index": 81,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 695
    },
    {
      "index": 82,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "remove",
      "offset": 697
    },
    {
      "index": 83,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 704
    },
    {
      "index": 84,
      "rawLength": 142,
      "actualLength": 71,
      "isWideChar": 0,
      "string": "{\"x\":false,\"y\":true,\"z2\":null,\"a\":[1,8,160],\"b\":\"abc\\u000bd\",\"s\":\"str\"}",
      "offset": 708
    },
    {
      "index": 85,
      "rawLength": 740,
      "actualLength": 370,
      "isWideChar": 0,
      "string": "{ \"x\":false, /*comments are allowed */\n               \"y\":true,  // also a comment\n               z2:null, // unquoted property names\n               \"a\":[+1,0o10,0xa0,], // plus prefix, octal, hexadecimal\n               \"b\": \"abc\\vd\", // multi-line strings, '\u000b' escape\n               \"s\":'str',} // trailing comma in objects and arrays, single quoted string\n            ",
      "offset": 781
    },
    {
      "index": 86,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "parseExtJSON",
      "offset": 1153
    },
    {
      "index": 87,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "stringify",
      "offset": 1166
    },
    {
      "index": 88,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "[Infinity, +Infinity, -Infinity, NaN, +NaN, -NaN, .1, -.2]",
      "offset": 1176
    },
    {
      "index": 89,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fd",
      "offset": 1235
    },
    {
      "index": 90,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "fpath",
      "offset": 1238
    },
    {
      "index": 91,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdir",
      "offset": 1244
    },
    {
      "index": 92,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "buf2",
      "offset": 1249
    },
    {
      "index": 93,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "files",
      "offset": 1254
    },
    {
      "index": 94,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 1260
    },
    {
      "index": 95,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "fdate",
      "offset": 1264
    },
    {
      "index": 96,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "st",
      "offset": 1270
    },
    {
      "index": 97,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "link_path",
      "offset": 1273
    },
    {
      "index": 98,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "stdinIsTTY",
      "offset": 1283
    },
    {
      "index": 99,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "/bin/sh",
      "offset": 1294
    },
    {
      "index": 100,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "-c",
      "offset": 1302
    },
    {
      "index": 101,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test -t 0",
      "offset": 1305
    },
    {
      "index": 102,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "usePath",
      "offset": 1315
    },
    {
      "index": 103,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "isatty",
      "offset": 1323
    },
    {
      "index": 104,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "isatty(STDIN)",
      "offset": 1330
    },
    {
      "index": 105,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_tmp_dir",
      "offset": 1344
    },
    {
      "index": 106,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "/",
      "offset": 1357
    },
    {
      "index": 107,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "/test_link",
      "offset": 1359
    },
    {
      "index": 108,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mkdir",
      "offset": 1370
    },
    {
      "index": 109,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "O_RDWR",
      "offset": 1376
    },
    {
      "index": 110,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "O_CREAT",
      "offset": 1383
    },
    {
      "index": 111,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "O_TRUNC",
      "offset": 1391
    },
    {
      "index": 112,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "write",
      "offset": 1399
    },
    {
      "index": 113,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "readdir",
      "offset": 1405
    },
    {
      "index": 114,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 1413
    },
    {
      "index": 115,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "utimes",
      "offset": 1421
    },
    {
      "index": 116,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "stat",
      "offset": 1428
    },
    {
      "index": 117,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mode",
      "offset": 1433
    },
    {
      "index": 118,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "S_IFMT",
      "offset": 1438
    },
    {
      "index": 119,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "S_IFREG",
      "offset": 1445
    },
    {
      "index": 120,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mtime",
      "offset": 1453
    },
    {
      "index": 121,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "symlink",
      "offset": 1459
    },
    {
      "index": 122,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lstat",
      "offset": 1467
    },
    {
      "index": 123,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "S_IFLNK",
      "offset": 1473
    },
    {
      "index": 124,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "readlink",
      "offset": 1481
    },
    {
      "index": 125,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "getcwd",
      "offset": 1490
    },
    {
      "index": 126,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "realpath",
      "offset": 1497
    },
    {
      "index": 127,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ".",
      "offset": 1506
    },
    {
      "index": 128,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "O_RDONLY",
      "offset": 1508
    },
    {
      "index": 129,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "fds",
      "offset": 1517
    },
    {
      "index": 130,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pid",
      "offset": 1521
    },
    {
      "index": 131,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "exit 1",
      "offset": 1525
    },
    {
      "index": 132,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "pipe",
      "offset": 1532
    },
    {
      "index": 133,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "sh",
      "offset": 1537
    },
    {
      "index": 134,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "echo $FOO",
      "offset": 1540
    },
    {
      "index": 135,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "stdout",
      "offset": 1550
    },
    {
      "index": 136,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "block",
      "offset": 1557
    },
    {
      "index": 137,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 1563
    },
    {
      "index": 138,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "FOO",
      "offset": 1569
    },
    {
      "index": 139,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "env",
      "offset": 1573
    },
    {
      "index": 140,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fdopen",
      "offset": 1577
    },
    {
      "index": 141,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "waitpid",
      "offset": 1584
    },
    {
      "index": 142,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cat",
      "offset": 1592
    },
    {
      "index": 143,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "kill",
      "offset": 1596
    },
    {
      "index": 144,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "SIGTERM",
      "offset": 1601
    },
    {
      "index": 145,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "expect nonzero exit code (got ",
      "offset": 1609
    },
    {
      "index": 146,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "th",
      "offset": 1640
    },
    {
      "index": 147,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "setTimeout",
      "offset": 1643
    },
    {
      "index": 148,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "clearTimeout",
      "offset": 1654
    },
    {
      "index": 149,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 1667
    },
    {
      "index": 150,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 1671
    },
    {
      "index": 151,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "gc",
      "offset": 1673
    },
    {
      "index": 152,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 1676
    },
    {
      "index": 153,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p1",
      "offset": 1684
    },
    {
      "index": 154,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p2",
      "offset": 1687
    },
    {
      "index": 155,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p3",
      "offset": 1690
    }
  ],
  "functionHeader": {
    "offset": 1693,
    "tag": "0xd",
    "remaining": 5571
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 156,
  "atoms": [
    {
      "index": 0,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_std.js",
      "offset": 3
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "std",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 49
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 51
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_printf",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_file1",
      "offset": 70
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_file2",
      "offset": 81
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_getline",
      "offset": 92
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_popen",
      "offset": 105
    },
    {
      "index": 10,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_ext_json",
      "offset": 116
    },
    {
      "index": 11,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_os",
      "offset": 130
    },
    {
      "index": 12,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_os_exec",
      "offset": 138
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_timer",
      "offset": 151
    },
    {
      "index": 14,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_async_gc",
      "offset": 162
    },
    {
      "index": 15,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "test_async_promise_rejection",
      "offset": 176
    },
    {
      "index": 16,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "loadScript",
      "offset": 205
    },
    {
      "index": 17,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 216
    },
    {
      "index": 18,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 231
    },
    {
      "index": 19,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 238
    },
    {
      "index": 20,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 247
    },
    {
      "index": 21,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 250
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 274
    },
    {
      "index": 23,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 276
    },
    {
      "index": 24,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 289
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 292
    },
    {
      "index": 26,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sprintf",
      "offset": 294
    },
    {
      "index": 27,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "a=%d s=%s",
      "offset": 302
    },
    {
      "index": 28,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abc",
      "offset": 312
    },
    {
      "index": 29,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "a=123 s=abc",
      "offset": 316
    },
    {
      "index": 30,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "%010d",
      "offset": 328
    },
    {
      "index": 31,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "0000000123",
      "offset": 334
    },
    {
      "index": 32,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "%x",
      "offset": 345
    },
    {
      "index": 33,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fffffffe",
      "offset": 348
    },
    {
      "index": 34,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "%lx",
      "offset": 357
    },
    {
      "index": 35,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "fffffffffffffffe",
      "offset": 361
    },
    {
      "index": 36,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "%10.1f",
      "offset": 378
    },
    {
      "index": 37,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "       2.1",
      "offset": 385
    },
    {
      "index": 38,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "%*.*f",
      "offset": 396
    },
    {
      "index": 39,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "     -2.13",
      "offset": 402
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "%#lx",
      "offset": 413
    },
    {
      "index": 41,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "0x7fffffffffffffff",
      "offset": 418
    },
    {
      "index": 42,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 437
    },
    {
      "index": 43,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "len",
      "offset": 439
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 443
    },
    {
      "index": 45,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "size",
      "offset": 447
    },
    {
      "index": 46,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 452
    },
    {
      "index": 47,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ret",
      "offset": 456
    },
    {
      "index": 48,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 460
    },
    {
      "index": 49,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "str1",
      "offset": 462
    },
    {
      "index": 50,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "tmpfile",
      "offset": 467
    },
    {
      "index": 51,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "hello world\n",
      "offset": 475
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "puts",
      "offset": 488
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "seek",
      "offset": 493
    },
    {
      "index": 54,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SEEK_SET",
      "offset": 498
    },
    {
      "index": 55,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "readAsString",
      "offset": 507
    },
    {
      "index": 56,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SEEK_END",
      "offset": 520
    },
    {
      "index": 57,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tell",
      "offset": 529
    },
    {
      "index": 58,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "read",
      "offset": 534
    },
    {
      "index": 59,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "buffer",
      "offset": 539
    },
    {
      "index": 60,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "charCodeAt",
      "offset": 546
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "close",
      "offset": 557
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "putByte",
      "offset": 563
    },
    {
      "index": 63,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getByte",
      "offset": 571
    },
    {
      "index": 64,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "line",
      "offset": 579
    },
    {
      "index": 65,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "line_count",
      "offset": 584
    },
    {
      "index": 66,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lines",
      "offset": 595
    },
    {
      "index": 67,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hello world",
      "offset": 601
    },
    {
      "index": 68,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "line 1",
      "offset": 613
    },
    {
      "index": 69,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "line 2",
      "offset": 620
    },
    {
      "index": 70,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "\n",
      "offset": 627
    },
    {
      "index": 71,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "eof",
      "offset": 629
    },
    {
      "index": 72,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getline",
      "offset": 633
    },
    {
      "index": 73,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "fname",
      "offset": 641
    },
    {
      "index": 74,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "content",
      "offset": 647
    },
    {
      "index": 75,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "tmp_file.txt",
      "offset": 655
    },
    {
      "index": 76,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "open",
      "offset": 668
    },
    {
      "index": 77,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "w",
      "offset": 673
    },
    {
      "index": 78,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "loadFile",
      "offset": 675
    },
    {
      "index": 79,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "popen",
      "offset": 684
    },
    {
      "index": 80,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cat ",
      "offset": 690
    },
    {
      "index": 81,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 695
    },
    {
      "index": 82,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "remove",
      "offset": 697
    },
    {
      "index": 83,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 704
    },
    {
      "index": 84,
      "rawLength": 142,
      "actualLength": 71,
      "isWideChar": 0,
      "string": "{\"x\":false,\"y\":true,\"z2\":null,\"a\":[1,8,160],\"b\":\"abc\\u000bd\",\"s\":\"str\"}",
      "offset": 708
    },
    {
      "index": 85,
      "rawLength": 740,
      "actualLength": 370,
      "isWideChar": 0,
      "string": "{ \"x\":false, /*comments are allowed */\n               \"y\":true,  // also a comment\n               z2:null, // unquoted property names\n               \"a\":[+1,0o10,0xa0,], // plus prefix, octal, hexadecimal\n               \"b\": \"abc\\vd\", // multi-line strings, '\u000b' escape\n               \"s\":'str',} // trailing comma in objects and arrays, single quoted string\n            ",
      "offset": 781
    },
    {
      "index": 86,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "parseExtJSON",
      "offset": 1153
    },
    {
      "index": 87,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "stringify",
      "offset": 1166
    },
    {
      "index": 88,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "[Infinity, +Infinity, -Infinity, NaN, +NaN, -NaN, .1, -.2]",
      "offset": 1176
    },
    {
      "index": 89,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fd",
      "offset": 1235
    },
    {
      "index": 90,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "fpath",
      "offset": 1238
    },
    {
      "index": 91,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdir",
      "offset": 1244
    },
    {
      "index": 92,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "buf2",
      "offset": 1249
    },
    {
      "index": 93,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "files",
      "offset": 1254
    },
    {
      "index": 94,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 1260
    },
    {
      "index": 95,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "fdate",
      "offset": 1264
    },
    {
      "index": 96,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "st",
      "offset": 1270
    },
    {
      "index": 97,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "link_path",
      "offset": 1273
    },
    {
      "index": 98,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "stdinIsTTY",
      "offset": 1283
    },
    {
      "index": 99,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "/bin/sh",
      "offset": 1294
    },
    {
      "index": 100,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "-c",
      "offset": 1302
    },
    {
      "index": 101,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test -t 0",
      "offset": 1305
    },
    {
      "index": 102,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "usePath",
      "offset": 1315
    },
    {
      "index": 103,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "isatty",
      "offset": 1323
    },
    {
      "index": 104,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "isatty(STDIN)",
      "offset": 1330
    },
    {
      "index": 105,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_tmp_dir",
      "offset": 1344
    },
    {
      "index": 106,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "/",
      "offset": 1357
    },
    {
      "index": 107,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "/test_link",
      "offset": 1359
    },
    {
      "index": 108,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mkdir",
      "offset": 1370
    },
    {
      "index": 109,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "O_RDWR",
      "offset": 1376
    },
    {
      "index": 110,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "O_CREAT",
      "offset": 1383
    },
    {
      "index": 111,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "O_TRUNC",
      "offset": 1391
    },
    {
      "index": 112,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "write",
      "offset": 1399
    },
    {
      "index": 113,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "readdir",
      "offset": 1405
    },
    {
      "index": 114,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 1413
    },
    {
      "index": 115,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "utimes",
      "offset": 1421
    },
    {
      "index": 116,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "stat",
      "offset": 1428
    },
    {
      "index": 117,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mode",
      "offset": 1433
    },
    {
      "index": 118,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "S_IFMT",
      "offset": 1438
    },
    {
      "index": 119,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "S_IFREG",
      "offset": 1445
    },
    {
      "index": 120,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "mtime",
      "offset": 1453
    },
    {
      "index": 121,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "symlink",
      "offset": 1459
    },
    {
      "index": 122,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "lstat",
      "offset": 1467
    },
    {
      "index": 123,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "S_IFLNK",
      "offset": 1473
    },
    {
      "index": 124,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "readlink",
      "offset": 1481
    },
    {
      "index": 125,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "getcwd",
      "offset": 1490
    },
    {
      "index": 126,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "realpath",
      "offset": 1497
    },
    {
      "index": 127,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ".",
      "offset": 1506
    },
    {
      "index": 128,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "O_RDONLY",
      "offset": 1508
    },
    {
      "index": 129,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "fds",
      "offset": 1517
    },
    {
      "index": 130,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pid",
      "offset": 1521
    },
    {
      "index": 131,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "exit 1",
      "offset": 1525
    },
    {
      "index": 132,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "pipe",
      "offset": 1532
    },
    {
      "index": 133,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "sh",
      "offset": 1537
    },
    {
      "index": 134,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "echo $FOO",
      "offset": 1540
    },
    {
      "index": 135,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "stdout",
      "offset": 1550
    },
    {
      "index": 136,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "block",
      "offset": 1557
    },
    {
      "index": 137,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 1563
    },
    {
      "index": 138,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "FOO",
      "offset": 1569
    },
    {
      "index": 139,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "env",
      "offset": 1573
    },
    {
      "index": 140,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fdopen",
      "offset": 1577
    },
    {
      "index": 141,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "waitpid",
      "offset": 1584
    },
    {
      "index": 142,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cat",
      "offset": 1592
    },
    {
      "index": 143,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "kill",
      "offset": 1596
    },
    {
      "index": 144,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "SIGTERM",
      "offset": 1601
    },
    {
      "index": 145,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "expect nonzero exit code (got ",
      "offset": 1609
    },
    {
      "index": 146,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "th",
      "offset": 1640
    },
    {
      "index": 147,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "setTimeout",
      "offset": 1643
    },
    {
      "index": 148,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "clearTimeout",
      "offset": 1654
    },
    {
      "index": 149,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 1667
    },
    {
      "index": 150,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 1671
    },
    {
      "index": 151,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "gc",
      "offset": 1673
    },
    {
      "index": 152,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 1676
    },
    {
      "index": 153,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p1",
      "offset": 1684
    },
    {
      "index": 154,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p2",
      "offset": 1687
    },
    {
      "index": 155,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "p3",
      "offset": 1690
    }
  ],
  "functionHeader": {
    "offset": 1693,
    "tag": "0xd",
    "remaining": 5571
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 9c 01 4c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |...L__tests__/fi|
00000010: 78 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 |xtures_quickjs/t|
00000020: 65 73 74 5f 73 74 64 2e 6a 73 06 73 74 64 04 6f |est_std.js.std.o|
00000030: 73 02 65 0c 61 73 73 65 72 74 16 74 65 73 74 5f |s.e.assert.test_|
00000040: 70 72 69 6e 74 66 14 74 65 73 74 5f 66 69 6c 65 |printf.test_file|
00000050: 31 14 74 65 73 74 5f 66 69 6c 65 32 18 74 65 73 |1.test_file2.tes|
00000060: 74 5f 67 65 74 6c 69 6e 65 14 74 65 73 74 5f 70 |t_getline.test_p|
00000070: 6f 70 65 6e 1a 74 65 73 74 5f 65 78 74 5f 6a 73 |open.test_ext_js|
00000080: 6f 6e 0e 74 65 73 74 5f 6f 73 18 74 65 73 74 5f |on.test_os.test_|
00000090: 6f 73 5f 65 78 65 63 14 74 65 73 74 5f 74 69 6d |os_exec.test_tim|
000000a0: 65 72 1a 74 65 73 74 5f 61 73 79 6e 63 5f 67 63 |er.test_async_gc|
000000b0: 38 74 65 73 74 5f 61 73 79 6e 63 5f 70 72 6f 6d |8test_async_prom|
000000c0: 69 73 65 5f 72 65 6a 65 63 74 69 6f 6e 14 6c 6f |ise_rejection.lo|
000000d0: 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f 61 73 |adScript.test_as|
000000e0: 73 65 72 74 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |sert.js.actual.e|
000000f0: 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 |xpected.is.asser|
00000100: 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 |tion failed: got|
00000110: 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 | |.|., expected |
00000120: 7c 04 20 28 02 29 0e 73 70 72 69 6e 74 66 12 61 ||. (.).sprintf.a|
00000130: 3d 25 64 20 73 3d 25 73 06 61 62 63 16 61 3d 31 |=%d s=%s.abc.a=1|
00000140: 32 33 20 73 3d 61 62 63 0a 25 30 31 30 64 14 30 |23 s=abc.%010d.0|
00000150: 30 30 30 30 30 30 31 32 33 04 25 78 10 66 66 66 |000000123.%x.fff|
00000160: 66 66 66 66 65 06 25 6c 78 20 66 66 66 66 66 66 |ffffe.%lx ffffff|
00000170: 66 66 66 66 66 66 66 66 66 65 0c 25 31 30 2e 31 |fffffffffe.%10.1|
00000180: 66 14 20 20 20 20 20 20 20 32 2e 31 0a 25 2a 2e |f.       2.1.%*.|
00000190: 2a 66 14 20 20 20 20 20 2d 32 2e 31 33 08 25 23 |*f.     -2.13.%#|
000001a0: 6c 78 24 30 78 37 66 66 66 66 66 66 66 66 66 66 |lx$0x7ffffffffff|
000001b0: 66 66 66 66 66 02 66 06 6c 65 6e 06 73 74 72 08 |fffff.f.len.str.|
000001c0: 73 69 7a 65 06 62 75 66 06 72 65 74 02 69 08 73 |size.buf.ret.i.s|
000001d0: 74 72 31 0e 74 6d 70 66 69 6c 65 18 68 65 6c 6c |tr1.tmpfile.hell|
000001e0: 6f 20 77 6f 72 6c 64 0a 08 70 75 74 73 08 73 65 |o world..puts.se|
000001f0: 65 6b 10 53 45 45 4b 5f 53 45 54 18 72 65 61 64 |ek.SEEK_SET.read|
00000200: 41 73 53 74 72 69 6e 67 10 53 45 45 4b 5f 45 4e |AsString.SEEK_EN|
00000210: 44 08 74 65 6c 6c 08 72 65 61 64 0c 62 75 66 66 |D.tell.read.buff|
00000220: 65 72 14 63 68 61 72 43 6f 64 65 41 74 0a 63 6c |er.charCodeAt.cl|
00000230: 6f 73 65 0e 70 75 74 42 79 74 65 0e 67 65 74 42 |ose.putByte.getB|
00000240: 79 74 65 08 6c 69 6e 65 14 6c 69 6e 65 5f 63 6f |yte.line.line_co|
00000250: 75 6e 74 0a 6c 69 6e 65 73 16 68 65 6c 6c 6f 20 |unt.lines.hello |
00000260: 77 6f 72 6c 64 0c 6c 69 6e 65 20 31 0c 6c 69 6e |world.line 1.lin|
00000270: 65 20 32 02 0a 06 65 6f 66 0e 67 65 74 6c 69 6e |e 2...eof.getlin|
00000280: 65 0a 66 6e 61 6d 65 0e 63 6f 6e 74 65 6e 74 18 |e.fname.content.|
00000290: 74 6d 70 5f 66 69 6c 65 2e 74 78 74 08 6f 70 65 |tmp_file.txt.ope|
000002a0: 6e 02 77 10 6c 6f 61 64 46 69 6c 65 0a 70 6f 70 |n.w.loadFile.pop|
000002b0: 65 6e 08 63 61 74 20 02 72 0c 72 65 6d 6f 76 65 |en.cat .r.remove|
000002c0: 06 6f 62 6a 8e 01 7b 22 78 22 3a 66 61 6c 73 65 |.obj..{"x":false|
000002d0: 2c 22 79 22 3a 74 72 75 65 2c 22 7a 32 22 3a 6e |,"y":true,"z2":n|
000002e0: 75 6c 6c 2c 22 61 22 3a 5b 31 2c 38 2c 31 36 30 |ull,"a":[1,8,160|
000002f0: 5d 2c 22 62 22 3a 22 61 62 63 5c 75 30 30 30 62 |],"b":"abc\u000b|
00000300: 64 22 2c 22 73 22 3a 22 73 74 72 22 7d e4 05 7b |d","s":"str"}..{|
00000310: 20 22 78 22 3a 66 61 6c 73 65 2c 20 2f 2a 63 6f | "x":false, /*co|
00000320: 6d 6d 65 6e 74 73 20 61 72 65 20 61 6c 6c 6f 77 |mments are allow|
00000330: 65 64 20 2a 2f 0a 20 20 20 20 20 20 20 20 20 20 |ed */.          |
00000340: 20 20 20 20 20 22 79 22 3a 74 72 75 65 2c 20 20 |     "y":true,  |
00000350: 2f 2f 20 61 6c 73 6f 20 61 20 63 6f 6d 6d 65 6e |// also a commen|
00000360: 74 0a 20 20 20 20 20 20 20 20 20 20 20 20 20 20 |t.              |
00000370: 20 7a 32 3a 6e 75 6c 6c 2c 20 2f 2f 20 75 6e 71 | z2:null, // unq|
00000380: 75 6f 74 65 64 20 70 72 6f 70 65 72 74 79 20 6e |uoted property n|
00000390: 61 6d 65 73 0a 20 20 20 20 20 20 20 20 20 20 20 |ames.           |
000003a0: 20 20 20 20 22 61 22 3a 5b 2b 31 2c 30 6f 31 30 |    "a":[+1,0o10|
000003b0: 2c 30 78 61 30 2c 5d 2c 20 2f 2f 20 70 6c 75 73 |,0xa0,], // plus|
000003c0: 20 70 72 65 66 69 78 2c 20 6f 63 74 61 6c 2c 20 | prefix, octal, |
000003d0: 68 65 78 61 64 65 63 69 6d 61 6c 0a 20 20 20 20 |hexadecimal.    |
000003e0: 20 20 20 20 20 20 20 20 20 20 20 22 62 22 3a 20 |           "b": |
000003f0: 22 61 62 63 5c 76 64 22 2c 20 2f 2f 20 6d 75 6c |"abc\vd", // mul|
00000400: 74 69 2d 6c 69 6e 65 20 73 74 72 69 6e 67 73 2c |ti-line strings,|
00000410: 20 27 0b 27 20 65 73 63 61 70 65 0a 20 20 20 20 | '.' escape.    |
00000420: 20 20 20 20 20 20 20 20 20 20 20 22 73 22 3a 27 |           "s":'|
00000430: 73 74 72 27 2c 7d 20 2f 2f 20 74 72 61 69 6c 69 |str',} // traili|
00000440: 6e 67 20 63 6f 6d 6d 61 20 69 6e 20 6f 62 6a 65 |ng comma in obje|
00000450: 63 74 73 20 61 6e 64 20 61 72 72 61 79 73 2c 20 |cts and arrays, |
00000460: 73 69 6e 67 6c 65 20 71 75 6f 74 65 64 20 73 74 |single quoted st|
00000470: 72 69 6e 67 0a 20 20 20 20 20 20 20 20 20 20 20 |ring.           |
00000480: 20 18 70 61 72 73 65 45 78 74 4a 53 4f 4e 12 73 | .parseExtJSON.s|
00000490: 74 72 69 6e 67 69 66 79 74 5b 49 6e 66 69 6e 69 |tringifyt[Infini|
000004a0: 74 79 2c 20 2b 49 6e 66 69 6e 69 74 79 2c 20 2d |ty, +Infinity, -|
000004b0: 49 6e 66 69 6e 69 74 79 2c 20 4e 61 4e 2c 20 2b |Infinity, NaN, +|
000004c0: 4e 61 4e 2c 20 2d 4e 61 4e 2c 20 2e 31 2c 20 2d |NaN, -NaN, .1, -|
000004d0: 2e 32 5d 04 66 64 0a 66 70 61 74 68 08 66 64 69 |.2].fd.fpath.fdi|
000004e0: 72 08 62 75 66 32 0a 66 69 6c 65 73 06 65 72 72 |r.buf2.files.err|
000004f0: 0a 66 64 61 74 65 04 73 74 12 6c 69 6e 6b 5f 70 |.fdate.st.link_p|
00000500: 61 74 68 14 73 74 64 69 6e 49 73 54 54 59 0e 2f |ath.stdinIsTTY./|
00000510: 62 69 6e 2f 73 68 04 2d 63 12 74 65 73 74 20 2d |bin/sh.-c.test -|
00000520: 74 20 30 0e 75 73 65 50 61 74 68 0c 69 73 61 74 |t 0.usePath.isat|
00000530: 74 79 1a 69 73 61 74 74 79 28 53 54 44 49 4e 29 |ty.isatty(STDIN)|
00000540: 18 74 65 73 74 5f 74 6d 70 5f 64 69 72 02 2f 14 |.test_tmp_dir./.|
00000550: 2f 74 65 73 74 5f 6c 69 6e 6b 0a 6d 6b 64 69 72 |/test_link.mkdir|
00000560: 0c 4f 5f 52 44 57 52 0e 4f 5f 43 52 45 41 54 0e |.O_RDWR.O_CREAT.|
00000570: 4f 5f 54 52 55 4e 43 0a 77 72 69 74 65 0e 72 65 |O_TRUNC.write.re|
00000580: 61 64 64 69 72 0e 69 6e 64 65 78 4f 66 0c 75 74 |addir.indexOf.ut|
00000590: 69 6d 65 73 08 73 74 61 74 08 6d 6f 64 65 0c 53 |imes.stat.mode.S|
000005a0: 5f 49 46 4d 54 0e 53 5f 49 46 52 45 47 0a 6d 74 |_IFMT.S_IFREG.mt|
000005b0: 69 6d 65 0e 73 79 6d 6c 69 6e 6b 0a 6c 73 74 61 |ime.symlink.lsta|
000005c0: 74 0e 53 5f 49 46 4c 4e 4b 10 72 65 61 64 6c 69 |t.S_IFLNK.readli|
000005d0: 6e 6b 0c 67 65 74 63 77 64 10 72 65 61 6c 70 61 |nk.getcwd.realpa|
000005e0: 74 68 02 2e 10 4f 5f 52 44 4f 4e 4c 59 06 66 64 |th...O_RDONLY.fd|
000005f0: 73 06 70 69 64 0c 65 78 69 74 20 31 08 70 69 70 |s.pid.exit 1.pip|
00000600: 65 04 73 68 12 65 63 68 6f 20 24 46 4f 4f 0c 73 |e.sh.echo $FOO.s|
00000610: 74 64 6f 75 74 0a 62 6c 6f 63 6b 0a 68 65 6c 6c |tdout.block.hell|
00000620: 6f 06 46 4f 4f 06 65 6e 76 0c 66 64 6f 70 65 6e |o.FOO.env.fdopen|
00000630: 0e 77 61 69 74 70 69 64 06 63 61 74 08 6b 69 6c |.waitpid.cat.kil|
00000640: 6c 0e 53 49 47 54 45 52 4d 3c 65 78 70 65 63 74 |l.SIGTERM<expect|
00000650: 20 6e 6f 6e 7a 65 72 6f 20 65 78 69 74 20 63 6f | nonzero exit co|
00000660: 64 65 20 28 67 6f 74 20 04 74 68 14 73 65 74 54 |de (got .th.setT|
00000670: 69 6d 65 6f 75 74 18 63 6c 65 61 72 54 69 6d 65 |imeout.clearTime|
00000680: 6f 75 74 06 72 75 6e 02 70 04 67 63 0e 63 6f 75 |out.run.p.gc.cou|
00000690: 6e 74 65 72 04 70 31 04 70 32 04 70 33 0d c8 03 |nter.p1.p2.p3...|
000006a0: 02 ca 03 02 cc 03 02 00 00 02 00 01 fe 01 00 01 |................|
000006b0: 01 fe 01 01 00 0c 20 06 01 a4 01 00 01 00 04 0e |...... .........|
000006c0: 0c 96 01 01 ce 03 03 00 03 ca 03 00 0d cc 03 01 |................|
000006d0: 0d d0 03 00 01 d2 03 01 01 d4 03 02 01 d6 03 03 |................|
000006e0: 01 d8 03 04 01 da 03 05 01 dc 03 06 01 de 03 07 |................|
000006f0: 01 e0 03 08 01 e2 03 09 01 e4 03 0a 01 e6 03 0b |................|
00000700: 01 08 ec 3a c2 00 e5 c2 01 e6 c2 02 61 04 00 c2 |...:........a...|
00000710: 03 61 05 00 c2 04 61 06 00 c2 05 61 07 00 c2 06 |.a....a....a....|
00000720: 61 08 00 c2 07 61 09 00 c2 08 61 0a 00 c2 09 61 |a....a....a....a|
00000730: 0b 00 c2 0a 61 0c 00 c2 0b 61 0d 00 29 6f 18 00 |....a....a..)o..|
00000740: 00 00 68 00 00 43 f4 00 00 00 04 f5 00 00 00 24 |..h..C.........$|
00000750: 01 00 0e 0e ee 0b cb 6f 07 00 00 00 0e ee 02 30 |.......o.......0|
00000760: e2 f0 0e 60 04 00 f0 0e 60 05 00 f0 0e 60 06 00 |...`....`....`..|
00000770: f0 0e 60 07 00 f0 0e 60 09 00 f0 0e 60 0a 00 f0 |..`....`....`...|
00000780: 0e 60 0b 00 f0 0e 60 08 00 f0 0e 60 0c 00 f0 0e |.`....`....`....|
00000790: 60 0d 00 f0 0e 06 2f c8 03 39 00 00 00 41 24 08 |`...../..9...A$.|
000007a0: 11 06 34 16 00 11 ce 03 23 07 16 0d 15 11 14 0d |..4.....#.......|
000007b0: 13 11 14 0d 13 11 18 0d 17 11 14 0d 13 11 0e 0d |................|
000007c0: 0d 11 18 0d 17 11 14 0d 13 11 1a 0d 19 11 1a 0d |................|
000007d0: 19 11 38 00 0c 43 06 01 d0 03 03 01 03 04 00 00 |..8..C..........|
000007e0: 85 01 04 ec 03 00 01 00 ee 03 00 01 00 68 00 01 |.............h..|
000007f0: 00 9e 01 00 01 00 0c 00 cb c7 eb b8 ab ec 03 0a |................|
00000800: d8 39 9d 00 00 00 43 f8 00 00 00 d3 d4 24 02 00 |.9....C......$..|
00000810: ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 |..).../...+...K.|
00000820: 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 |....!...K.......|
00000830: 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 |C9...$...C9...$.|
00000840: 00 ad ec 02 29 39 9f 00 00 00 04 f9 00 00 00 d3 |....)9..........|
00000850: 9f 04 fa 00 00 00 9f 04 fb 00 00 00 9f d4 9f 04 |................|
00000860: fa 00 00 00 9f d5 ec 10 04 fc 00 00 00 d5 9f 04 |................|
00000870: fd 00 00 00 9f ee 02 c3 9f f1 30 c8 03 54 03 00 |..........0..T..|
00000880: 12 10 07 12 0c 10 12 21 0d 00 1b 0c 1b 08 07 10 |.......!........|
00000890: 07 11 1c 11 08 00 07 0e 11 18 07 12 12 23 07 0e |.............#..|
000008a0: 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 |/,..0Y..........|
000008b0: 11 29 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f |.).)..4D.. . ..?|
000008c0: 07 03 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 |.. ..1*".. ....1|
000008d0: 07 15 00 0c 43 06 01 d2 03 00 00 00 07 02 03 bf |....C...........|
000008e0: 01 00 d0 03 02 00 ca 03 00 0c df 68 01 00 43 fe |...........h..C.|
000008f0: 00 00 00 04 ff 00 00 00 bf 7b 04 00 01 00 00 24 |.........{.....$|
00000900: 03 00 04 01 01 00 00 f2 0e df 68 01 00 43 fe 00 |..........h..C..|
00000910: 00 00 04 02 01 00 00 bf 7b 24 02 00 04 03 01 00 |........{$......|
00000920: 00 f2 0e df 68 01 00 43 fe 00 00 00 04 04 01 00 |....h..C........|
00000930: 00 bf fe 24 02 00 04 05 01 00 00 f2 0e df 68 01 |...$..........h.|
00000940: 00 43 fe 00 00 00 04 06 01 00 00 bf fe 24 02 00 |.C...........$..|
00000950: 04 07 01 00 00 f2 0e df 68 01 00 43 fe 00 00 00 |........h..C....|
00000960: 04 08 01 00 00 c1 00 24 02 00 04 09 01 00 00 f2 |.......$........|
00000970: 0e df 68 01 00 43 fe 00 00 00 04 0a 01 00 00 bf |..h..C..........|
00000980: 0a b9 c1 01 8e 24 04 00 04 0b 01 00 00 f2 0e df |.....$..........|
00000990: 68 01 00 43 fe 00 00 00 04 0c 01 00 00 c1 02 24 |h..C...........$|
000009a0: 02 00 04 0d 01 00 00 f2 29 c8 03 4e 16 00 03 08 |........)..N....|
000009b0: 07 0e 11 06 57 10 2a 17 0d 0b 07 0e 11 06 3e 10 |....W.*.......>.|
000009c0: 2a 17 0d 0b 07 0e 11 06 34 1e 0c 0d 2a 17 0d 0b |*.......4...*...|
000009d0: 07 0e 11 06 34 20 0c 0f 2a 17 0d 0b 07 0e 11 06 |....4 ..*.......|
000009e0: 3e 10 2a 17 0d 0b 07 0e 11 06 4d 32 07 21 2a 17 |>.*.......M2.!*.|
000009f0: 0d 0b 07 0e 11 06 3e 10 2a 17 00 06 cd cc cc cc |......>.*.......|
00000a00: cc cc 00 40 06 0a d7 a3 70 3d 0a 01 40 0a 08 ff |...@....p=..@...|
00000a10: ff ff ff ff ff ff 7f 0c 43 06 01 d4 03 00 08 00 |........C.......|
00000a20: 05 02 00 cb 01 08 9c 04 00 00 00 9e 04 00 01 00 |................|
00000a30: a0 04 00 02 00 a2 04 00 03 00 a4 04 00 04 00 a6 |................|
00000a40: 04 00 05 00 a8 04 00 06 00 aa 04 00 07 00 ca 03 |................|
00000a50: 00 0c d0 03 02 00 68 00 00 43 16 01 00 00 24 00 |......h..C....$.|
00000a60: 00 cb 04 17 01 00 00 cd c7 43 18 01 00 00 c9 24 |.........C.....$|
00000a70: 01 00 0e c7 43 19 01 00 00 b7 68 00 00 42 1a 01 |....C.....h..B..|
00000a80: 00 00 24 02 00 0e c7 43 1b 01 00 00 24 00 00 c5 |..$....C....$...|
00000a90: 07 e0 c4 07 c9 ad f1 0e c7 43 19 01 00 00 b7 68 |.........C.....h|
00000aa0: 00 00 42 1c 01 00 00 24 02 00 0e c7 43 1d 01 00 |..B....$....C...|
00000ab0: 00 24 00 00 ce e0 ca c9 eb ad f1 0e c7 43 19 01 |.$...........C..|
00000ac0: 00 00 b7 68 00 00 42 1a 01 00 00 24 02 00 0e 39 |...h..B....$...9|
00000ad0: b0 00 00 00 11 ca 21 01 00 c5 04 c7 43 1e 01 00 |......!.....C...|
00000ae0: 00 c4 04 42 1f 01 00 00 b7 ca 24 03 00 c5 05 e0 |...B......$.....|
00000af0: c4 05 ca ad f1 0e b7 c5 06 c4 06 ca a5 ec 19 e0 |................|
00000b00: c4 04 c4 06 48 c9 43 20 01 00 00 c4 06 24 01 00 |....H.C .....$..|
00000b10: ad f1 0e 95 06 ee e3 c7 43 21 01 00 00 24 00 00 |........C!...$..|
00000b20: 29 c8 03 92 01 1f 00 04 10 11 06 1b 10 17 1d 21 |)..............!|
00000b30: 00 07 02 1b 0c 07 01 17 0b 07 02 20 12 11 06 1b |........... ....|
00000b40: 0d 17 02 07 02 1b 1a 1c 29 07 0e 0c 12 07 07 07 |........).......|
00000b50: 0b 0d 0b 07 02 20 12 11 06 1b 0d 17 02 07 02 1b |..... ..........|
00000b60: 0a 17 19 07 0e 07 12 07 06 07 0d 07 0b 0d 0b 07 |................|
00000b70: 02 20 12 11 06 1b 0d 17 08 20 16 07 01 1c 1b 07 |. ....... ......|
00000b80: 02 1b 0c 0c 06 20 18 07 1f 1c 17 07 0e 0c 10 07 |..... ..........|
00000b90: 07 07 09 0d 01 11 0e 0c 08 07 03 12 13 07 0e 0c |................|
00000ba0: 08 0c 01 07 10 07 06 1b 18 0c 01 11 23 07 0f 0b |............#...|
00000bb0: 1a 18 2d 07 02 1b 0c 00 0c 43 06 01 d6 03 00 04 |..-......C......|
00000bc0: 00 05 02 00 80 01 04 9c 04 00 00 00 a0 04 00 01 |................|
00000bd0: 00 a8 04 00 02 00 a2 04 00 03 00 ca 03 00 0c d0 |................|
00000be0: 03 02 00 68 00 00 43 16 01 00 00 24 00 00 cb 04 |...h..C....$....|
00000bf0: 17 01 00 00 d0 eb ce b7 cd c9 ca a5 ec 19 c7 43 |...............C|
00000c00: 22 01 00 00 c8 43 20 01 00 00 c9 24 01 00 24 01 |"....C ....$..$.|
00000c10: 00 0e 95 02 ee e4 c7 43 19 01 00 00 b7 68 00 00 |.......C.....h..|
00000c20: 42 1a 01 00 00 24 02 00 0e b7 cd c9 ca a5 ec 1c |B....$..........|
00000c30: e0 c8 43 20 01 00 00 c9 24 01 00 c7 43 23 01 00 |..C ....$...C#..|
00000c40: 00 24 00 00 ad f1 0e 95 02 ee e1 e0 c7 43 23 01 |.$...........C#.|
00000c50: 00 00 24 00 00 b6 ad f1 0e c7 43 21 01 00 00 24 |..$.......C!...$|
00000c60: 00 00 29 c8 03 60 32 00 04 10 11 06 1b 10 17 1d |..)..`2.........|
00000c70: 21 14 0d 09 0c 0e 07 08 07 03 12 13 07 02 1b 12 |!...............|
00000c80: 07 06 1b 18 07 01 11 1d 15 14 18 2d 07 02 20 12 |...........-.. .|
00000c90: 11 06 1b 0d 17 01 0c 0e 07 08 07 03 12 13 07 0e |................|
00000ca0: 07 06 1b 18 07 01 11 10 07 02 1b 10 11 19 07 25 |...............%|
00000cb0: 0b 1a 19 2d 07 0e 07 02 1b 10 11 0e 07 07 07 19 |...-............|
00000cc0: 0d 0b 07 02 1b 0c 00 0c 43 06 01 d8 03 00 05 00 |........C.......|
00000cd0: 04 02 00 98 01 05 9c 04 00 00 00 c8 04 00 01 00 |................|
00000ce0: ca 04 00 02 00 cc 04 00 03 00 a8 04 00 04 00 ca |................|
00000cf0: 03 00 0c d0 03 02 00 04 27 01 00 00 04 28 01 00 |........'....(..|
00000d00: 00 04 29 01 00 00 26 03 00 ce 68 00 00 43 16 01 |..)...&...h..C..|
00000d10: 00 00 24 00 00 cb b7 c5 04 c4 04 ca eb a5 ec 18 |..$.............|
00000d20: c7 43 18 01 00 00 ca c4 04 48 04 2a 01 00 00 24 |.C.......H.*...$|
00000d30: 02 00 0e 95 04 ee e3 c7 43 19 01 00 00 b7 68 00 |........C.....h.|
00000d40: 00 42 1a 01 00 00 24 02 00 0e e0 c7 43 2b 01 00 |.B....$.....C+..|
00000d50: 00 24 00 00 98 f1 0e b7 cd c7 43 2c 01 00 00 24 |.$........C,...$|
00000d60: 00 00 d0 f5 ed 0d e0 c8 ca c9 48 ab f1 0e 95 02 |..........H.....|
00000d70: ee e8 e0 c7 43 2b 01 00 00 24 00 00 f1 0e e0 c9 |....C+...$......|
00000d80: ca eb ad f1 0e c7 43 21 01 00 00 24 00 00 29 c8 |......C!...$..).|
00000d90: 03 6c 40 00 04 08 62 08 11 06 1b 10 17 13 11 0e |.l@...b.........|
00000da0: 0c 08 07 0a 07 0d 12 13 07 02 1b 0c 07 0c 0c 01 |................|
00000db0: 20 0b 15 2a 19 3d 07 02 20 12 11 06 1b 0d 17 0b | ..*.=.. .......|
00000dc0: 07 10 07 02 1b 08 16 0d 0d 0b 0e 16 07 02 1b 10 |................|
00000dd0: 17 0d 13 11 07 0e 07 10 07 0c 07 01 07 0f 07 0b |................|
00000de0: 0d 08 18 1b 07 0e 07 02 1b 08 11 0b 0d 0b 07 0e |................|
00000df0: 07 1e 07 0a 07 11 07 17 0d 0b 07 02 1b 0c 00 0c |................|
00000e00: 43 06 01 da 03 00 04 00 04 03 00 7f 04 a0 04 00 |C...............|
00000e10: 00 00 9c 04 00 01 00 da 04 00 02 00 dc 04 00 03 |................|
00000e20: 00 ca 03 00 0c d0 03 02 00 cc 03 01 0c 04 2f 01 |............../.|
00000e30: 00 00 cd 04 27 01 00 00 ce 68 00 00 43 30 01 00 |....'....h..C0..|
00000e40: 00 c9 04 31 01 00 00 24 02 00 d0 43 18 01 00 00 |...1...$...C....|
00000e50: ca 24 01 00 0e c8 43 21 01 00 00 24 00 00 0e e0 |.$....C!...$....|
00000e60: 68 00 00 43 32 01 00 00 c9 24 01 00 ca f2 0e 68 |h..C2....$.....h|
00000e70: 00 00 43 33 01 00 00 04 34 01 00 00 c9 9f 04 35 |..C3....4......5|
00000e80: 01 00 00 24 02 00 d0 43 1b 01 00 00 24 00 00 cb |...$...C....$...|
00000e90: c8 43 21 01 00 00 24 00 00 0e e0 c7 ca f2 0e 68 |.C!...$........h|
00000ea0: 02 00 43 36 01 00 00 c9 24 01 00 29 c8 03 48 55 |..C6....$..)..HU|
00000eb0: 00 41 10 11 06 1b 0c 20 01 17 15 1b 0c 07 01 17 |.A..... ........|
00000ec0: 0b 07 02 1b 0c 18 0d 07 0e 11 06 1b 14 07 01 11 |................|
00000ed0: 12 07 2b 0e 03 11 06 34 20 07 03 20 0f 17 0b 1b |..+....4 .. ....|
00000ee0: 1a 17 27 07 02 1b 0c 17 0d 07 0e 07 0a 07 0b 0d |..'.............|
00000ef0: 0b 11 04 1b 10 07 01 00 0c 43 06 01 dc 03 00 03 |.........C......|
00000f00: 00 04 02 02 90 01 03 ee 03 00 00 00 b4 01 00 01 |................|
00000f10: 00 ee 04 00 02 00 ca 03 00 0c d0 03 02 00 04 38 |...............8|
00000f20: 01 00 00 cb 04 39 01 00 00 cc 68 00 00 43 3a 01 |.....9....h..C:.|
00000f30: 00 00 c8 24 01 00 cd e0 39 a6 00 00 00 43 3b 01 |...$....9....C;.|
00000f40: 00 00 c9 24 01 00 c7 f2 0e 68 00 00 43 3a 01 00 |...$.....h..C:..|
00000f50: 00 04 3c 01 00 00 24 01 00 cd e0 c9 b7 48 39 90 |..<...$......H9.|
00000f60: 00 00 00 f2 0e e0 c9 b8 48 39 90 00 00 00 f2 0e |........H9......|
00000f70: e0 c9 b9 48 39 90 00 00 00 8e f2 0e e0 c9 ba 48 |...H9..........H|
00000f80: 39 92 00 00 00 f2 0e e0 c9 bb 48 39 92 00 00 00 |9.........H9....|
00000f90: f2 0e e0 c9 bc 48 39 92 00 00 00 f2 0e e0 c9 bd |.....H9.........|
00000fa0: 48 c1 00 f2 0e e0 c9 be 48 c1 01 8e f2 29 c8 03 |H.......H....)..|
00000fb0: 74 64 00 04 08 21 00 00 06 10 0c 11 06 1b 1c 07 |td...!..........|
00000fc0: 01 17 2b 07 0e 1b 08 1b 16 07 01 11 0e 07 2b 0d |..+...........+.|
00000fd0: 00 11 06 34 1a 17 2b 07 0e 0c 06 07 0a 1b 11 0d |...4..+.........|
00000fe0: 0b 07 0e 0c 06 07 0a 1b 11 0d 0b 07 0e 0c 06 07 |................|
00000ff0: 0c 1b 01 07 11 0d 0b 07 0e 0c 06 07 0a 1b 11 0d |................|
00001000: 0b 07 0e 0c 06 07 0a 1b 11 0d 0b 07 0e 0c 06 07 |................|
00001010: 0a 1b 11 0d 0b 07 0e 0c 06 11 07 0d 0b 07 0e 0c |................|
00001020: 06 11 0a 07 11 00 06 9a 99 99 99 99 99 b9 3f 06 |..............?.|
00001030: 9a 99 99 99 99 99 c9 3f 0c 43 06 01 de 03 00 0d |.......?.C......|
00001040: 00 08 03 00 e8 07 0d fa 04 00 00 00 fc 04 00 01 |................|
00001050: 00 da 04 00 02 00 fe 04 00 03 00 a4 04 00 04 00 |................|
00001060: 80 05 00 05 00 a8 04 00 06 00 82 05 00 07 00 84 |................|
00001070: 05 00 08 00 86 05 00 09 00 88 05 00 0a 00 8a 05 |................|
00001080: 00 0b 00 8c 05 01 00 30 cc 03 01 0c d0 03 02 00 |.......0........|
00001090: ca 03 00 0c 63 0c 00 68 00 00 43 88 00 00 00 04 |....c..h..C.....|
000010a0: 47 01 00 00 04 48 01 00 00 04 49 01 00 00 26 03 |G....H....I...&.|
000010b0: 00 0b 09 4e 4a 01 00 00 24 02 00 98 c5 0c e0 68 |...NJ...$......h|
000010c0: 00 00 43 4b 01 00 00 b7 24 01 00 64 0c 00 04 4c |..CK....$..d...L|
000010d0: 01 00 00 f3 0e 04 4d 01 00 00 ce 04 2f 01 00 00 |......M...../...|
000010e0: cd ca 04 4e 01 00 00 9f c9 9f cc ca 04 4f 01 00 |...N.........O..|
000010f0: 00 9f c5 0b 68 00 00 43 36 01 00 00 c4 0b 24 01 |....h..C6.....$.|
00001100: 00 0e 68 00 00 43 36 01 00 00 c8 24 01 00 0e 68 |..h..C6....$...h|
00001110: 00 00 43 36 01 00 00 ca 24 01 00 0e 68 00 00 43 |..C6....$...h..C|
00001120: 50 01 00 00 ca c0 ed 01 24 02 00 c5 08 e0 c4 08 |P.......$.......|
00001130: b7 ad f1 0e 68 00 00 43 30 01 00 00 c8 68 00 00 |....h..C0....h..|
00001140: 42 51 01 00 00 68 00 00 42 52 01 00 00 b1 68 00 |BQ...h..BR....h.|
00001150: 00 42 53 01 00 00 b1 24 02 00 cb e0 c7 b7 a8 f1 |.BS....$........|
00001160: 0e 39 b0 00 00 00 11 bf 0a 21 01 00 c5 04 b7 c5 |.9.......!......|
00001170: 06 c4 06 c4 04 eb a5 ec 0c c4 04 c4 06 c4 06 4b |...............K|
00001180: 95 06 ee ee e0 68 00 00 43 54 01 00 00 c7 c4 04 |.....h..CT......|
00001190: 42 1f 01 00 00 b7 c4 04 eb 24 04 00 c4 04 eb ad |B........$......|
000011a0: f1 0e e0 68 00 00 43 19 01 00 00 c7 b7 68 02 00 |...h..C......h..|
000011b0: 42 1a 01 00 00 24 03 00 b7 ad f1 0e 39 b0 00 00 |B....$......9...|
000011c0: 00 11 c4 04 eb 21 01 00 c5 05 e0 68 00 00 43 1e |.....!.....h..C.|
000011d0: 01 00 00 c7 c4 05 42 1f 01 00 00 b7 c4 05 eb 24 |......B........$|
000011e0: 04 00 c4 05 eb ad f1 0e b7 c5 06 c4 06 c4 04 eb |................|
000011f0: a5 ec 13 e0 c4 04 c4 06 48 c4 05 c4 06 48 ab f1 |........H....H..|
00001200: 0e 95 06 ee e7 38 b9 00 00 00 f6 ed 4c e0 68 00 |.....8......L.h.|
00001210: 00 43 19 01 00 00 c7 39 b9 00 00 00 bd f1 68 02 |.C.....9......h.|
00001220: 00 42 1a 01 00 00 24 03 00 39 b9 00 00 00 bd f1 |.B....$..9......|
00001230: f2 0e e0 68 00 00 43 1e 01 00 00 c7 c4 05 42 1f |...h..C.......B.|
00001240: 01 00 00 b7 b8 24 04 00 b8 ad f1 0e e0 c4 04 bd |.....$..........|
00001250: 48 c4 05 b7 48 ab f1 0e e0 68 00 00 43 21 01 00 |H...H....h..C!..|
00001260: 00 c7 24 01 00 b7 ad f1 0e ee 1c 11 7f 7a 41 01 |..$..........zA.|
00001270: 00 00 07 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 |.......>zB......|
00001280: 02 0e 3e 86 ee 0f 68 00 00 43 55 01 00 00 ca 24 |..>...h..CU....$|
00001290: 01 00 ee d8 0e e0 c4 08 b7 f2 0e e0 c4 07 43 56 |..............CV|
000012a0: 01 00 00 c9 24 01 00 b7 a8 f1 0e c0 10 27 c5 09 |....$........'..|
000012b0: 68 00 00 43 57 01 00 00 c8 c4 09 c4 09 24 03 00 |h..CW........$..|
000012c0: c5 08 e0 c4 08 b7 f2 0e ee 1c 11 7f 7a 44 01 00 |............zD..|
000012d0: 00 0a 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 02 |......>zB.......|
000012e0: 0e 3e 86 ee 0f 68 00 00 43 58 01 00 00 c8 24 01 |.>...h..CX....$.|
000012f0: 00 ee d8 0e e0 c4 08 b7 f2 0e e0 c4 0a 42 59 01 |.............BY.|
00001300: 00 00 68 00 00 42 5a 01 00 00 af 68 00 00 42 5b |..h..BZ....h..B[|
00001310: 01 00 00 f2 0e e0 c4 0a 42 5c 01 00 00 c4 09 f2 |........B\......|
00001320: 0e 68 00 00 43 5d 01 00 00 c9 c4 0b 24 02 00 c5 |.h..C]......$...|
00001330: 08 e0 c4 08 b7 ad f1 0e ee 1c 11 7f 7a 44 01 00 |............zD..|
00001340: 00 0a 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 02 |......>zB.......|
00001350: 0e 3e 86 ee 10 68 00 00 43 5e 01 00 00 c4 0b 24 |.>...h..C^.....$|
00001360: 01 00 ee d7 0e e0 c4 08 b7 f2 0e e0 c4 0a 42 59 |..............BY|
00001370: 01 00 00 68 00 00 42 5a 01 00 00 af 68 00 00 42 |...h..BZ....h..B|
00001380: 5f 01 00 00 f2 0e ee 1c 11 7f 7a 12 01 00 00 04 |_.........z.....|
00001390: 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 02 0e 3e |....>zB........>|
000013a0: 86 ee 10 68 00 00 43 60 01 00 00 c4 0b 24 01 00 |...h..C`.....$..|
000013b0: ee d7 0e e0 c4 08 b7 f2 0e e0 c4 04 c9 f2 0e e0 |................|
000013c0: 68 00 00 43 36 01 00 00 c4 0b 24 01 00 b7 ad f1 |h..C6.....$.....|
000013d0: 0e ee 1c 11 7f 7a 12 01 00 00 04 00 82 02 0e 3e |.....z.........>|
000013e0: 7a 42 01 00 00 08 00 82 02 0e 3e 86 ee 0e 68 00 |zB........>...h.|
000013f0: 00 43 61 01 00 00 24 00 00 ee d9 0e e0 c4 08 b7 |.Ca...$.........|
00001400: f2 0e ee 1c 11 7f 7a 40 01 00 00 05 00 82 02 0e |......z@........|
00001410: 3e 7a 42 01 00 00 08 00 82 02 0e 3e 86 ee 13 68 |>zB........>...h|
00001420: 00 00 43 62 01 00 00 04 63 01 00 00 24 01 00 ee |..Cb....c...$...|
00001430: d4 0e e0 c4 08 b7 f2 0e e0 c4 04 c4 05 f2 0e e0 |................|
00001440: 68 00 00 43 36 01 00 00 c8 24 01 00 b7 ad f1 0e |h..C6....$......|
00001450: 68 00 00 43 30 01 00 00 c8 68 00 00 42 64 01 00 |h..C0....h..Bd..|
00001460: 00 24 02 00 cb e0 c7 b7 a5 f1 0e e0 68 00 00 43 |.$..........h..C|
00001470: 36 01 00 00 ca 24 01 00 b7 ad f1 29 c8 03 dc 04 |6....$.....)....|
00001480: 7b 00 13 30 11 04 98 0a 21 35 07 0e 11 04 20 0e |{..0....!5.... .|
00001490: 11 0a 2a 1d 0d 0b 21 00 21 10 20 0a 07 10 07 03 |..*...!.!. .....|
000014a0: 0d 0d 20 0a 12 21 11 04 1b 10 0c 01 17 11 11 04 |.. ..!..........|
000014b0: 1b 10 07 01 17 11 11 04 1b 10 07 01 17 05 11 04 |................|
000014c0: 1b 0e 16 01 1c 1b 07 0e 11 08 07 09 0d 01 11 04 |................|
000014d0: 1b 0c 07 0e 11 04 1b 14 11 04 1b 07 07 1e 11 04 |................|
000014e0: 1b 07 07 3d 17 17 07 0e 0c 06 07 07 0d 08 2a 14 |...=..........*.|
000014f0: 1c 1d 11 0e 0c 08 0c 06 07 09 12 13 0c 08 0c 0a |................|
00001500: 10 20 18 39 07 0e 11 04 1b 0e 07 08 0c 06 20 18 |. .9.......... .|
00001510: 0c 06 07 2d 11 48 0c 06 07 0d 07 51 0d 0b 07 0e |...-.H.....Q....|
00001520: 11 04 1b 0c 0c 0e 11 06 1b 15 16 2c 07 3b 0d 0a |...........,.;..|
00001530: 20 16 0c 06 07 07 1c 29 07 0e 11 04 1b 0c 07 08 | ......)........|
00001540: 0c 08 20 18 0c 08 07 31 11 4c 0c 08 07 0f 07 53 |.. ....1.L.....S|
00001550: 0d 01 11 0e 0c 08 0c 06 07 09 12 13 07 0e 0c 08 |................|
00001560: 0c 01 07 0e 0c 0a 0c 01 07 0d 07 0f 0b 26 18 23 |.............&.#|
00001570: 1b 0e 12 1b 07 0e 11 04 1b 0c 07 08 20 0c 07 0a |............ ...|
00001580: 11 06 1b 25 11 3e 20 0c 07 59 0d 0b 07 0e 11 04 |...%.> ..Y......|
00001590: 1b 0c 07 08 0c 08 25 11 16 30 07 3f 0d 0b 07 0e |......%..0.?....|
000015a0: 11 06 07 0e 11 08 07 0d 07 0f 0e 13 07 0e 11 04 |................|
000015b0: 1b 0e 07 01 16 0a 07 1b 0d 0b 16 02 39 0e 48 0e |............9.H.|
000015c0: 11 04 1b 12 07 01 21 31 07 0e 11 01 0d 0b 07 0e |......!1........|
000015d0: 0c 0a 1b 12 07 01 16 10 07 2b 0d 0b 1c 0c 11 04 |.........+......|
000015e0: 1b 10 07 0e 0c 0e 0c 1d 1c 1d 07 0e 11 01 0d 0b |................|
000015f0: 16 02 39 08 48 0e 11 04 1b 0c 07 01 21 25 07 0e |..9.H.......!%..|
00001600: 11 01 0d 0b 07 0e 0c 04 1b 10 11 04 1b 07 07 1a |................|
00001610: 11 04 1b 2f 0d 0b 07 0e 0c 04 1b 10 0c 15 0d 00 |.../............|
00001620: 11 04 1b 12 07 0e 0c 0f 1c 1f 07 0e 11 08 07 09 |................|
00001630: 0d 0b 16 02 39 08 48 0e 11 04 1b 0e 0c 01 21 27 |....9.H.......!'|
00001640: 07 0e 11 01 0d 0b 07 0e 0c 04 1b 10 11 04 1b 07 |................|
00001650: 07 1a 11 04 1b 2f 0d 0b 16 02 39 0a 48 0e 11 04 |...../....9.H...|
00001660: 1b 14 0c 01 21 2f 07 0e 11 01 0d 0b 07 0e 0c 0a |....!/..........|
00001670: 07 0b 0d 0b 07 0e 11 04 1b 10 0c 01 16 18 07 2b |...............+|
00001680: 0d 0b 16 02 39 0a 48 0e 11 04 1b 0e 21 2b 07 0e |....9.H.....!+..|
00001690: 11 01 0d 0b 16 02 39 0c 48 0e 11 04 34 12 21 31 |......9.H...4.!1|
000016a0: 07 0e 11 01 0d 0b 07 0e 0c 0a 0c 0b 0d 0b 07 0e |................|
000016b0: 11 04 1b 10 07 01 16 10 07 23 0d 01 11 04 1b 0c |.........#......|
000016c0: 07 0e 11 04 1b 13 17 17 07 0e 0c 06 07 07 0d 0b |................|
000016d0: 07 0e 11 04 1b 10 07 01 16 0e 07 21 00 0c 43 06 |...........!..C.|
000016e0: 01 e0 03 00 05 00 08 03 00 b5 03 05 a6 04 00 00 |................|
000016f0: 00 ca 05 00 01 00 cc 05 00 02 00 9c 04 00 03 00 |................|
00001700: 96 02 00 04 00 cc 03 01 0c d0 03 02 00 ca 03 00 |................|
00001710: 0c 68 00 00 43 88 00 00 00 04 03 00 00 00 26 01 |.h..C.........&.|
00001720: 00 24 01 00 cb e0 c7 b7 f2 0e 68 00 00 43 88 00 |.$........h..C..|
00001730: 00 00 04 47 01 00 00 04 48 01 00 00 04 67 01 00 |...G....H....g..|
00001740: 00 26 03 00 0b 09 4e 4a 01 00 00 24 02 00 cb e0 |.&....NJ...$....|
00001750: c7 b8 f2 0e 68 00 00 43 68 01 00 00 24 00 00 cc |....h..Ch...$...|
00001760: 68 00 00 43 88 00 00 00 04 69 01 00 00 04 48 01 |h..C.....i....H.|
00001770: 00 00 04 6a 01 00 00 26 03 00 0b c8 b8 48 4e 6b |...j...&.....HNk|
00001780: 01 00 00 09 4e 6c 01 00 00 0b 04 6d 01 00 00 4e |....Nl.....m...N|
00001790: 6e 01 00 00 4e 6f 01 00 00 24 02 00 cd e0 c9 b7 |n...No...$......|
000017a0: a8 f1 0e 68 00 00 43 21 01 00 00 c8 b8 48 24 01 |...h..C!.....H$.|
000017b0: 00 0e 68 02 00 43 70 01 00 00 c8 b7 48 04 35 01 |..h..Cp.....H.5.|
000017c0: 00 00 24 02 00 ce e0 ca 43 2c 01 00 00 24 00 00 |..$.....C,...$..|
000017d0: 04 6d 01 00 00 f2 0e e0 ca 43 2c 01 00 00 24 00 |.m.......C,...$.|
000017e0: 00 07 f2 0e ca 43 21 01 00 00 24 00 00 0e ee 1c |.....C!...$.....|
000017f0: 11 7f 7a 13 01 00 00 00 00 82 02 0e 3e 7a 8b 00 |..z.........>z..|
00001800: 00 00 04 00 82 02 0e 3e 86 ee 10 68 00 00 43 71 |.......>...h..Cq|
00001810: 01 00 00 c9 b7 24 02 00 ee d7 0e e0 c7 c9 f2 0e |.....$..........|
00001820: e0 c4 04 bf 7f af b7 f2 0e e0 c4 04 bf 08 a3 b7 |................|
00001830: f2 0e 68 00 00 43 88 00 00 00 04 72 01 00 00 26 |..h..C.....r...&|
00001840: 01 00 0b 09 4e 6c 01 00 00 24 02 00 cd e0 c9 b7 |....Nl...$......|
00001850: a8 f1 0e 68 00 00 43 73 01 00 00 c9 68 00 00 42 |...h..Cs....h..B|
00001860: 74 01 00 00 24 02 00 0e ee 1c 11 7f 7a 13 01 00 |t...$.......z...|
00001870: 00 00 00 82 02 0e 3e 7a 8b 00 00 00 04 00 82 02 |......>z........|
00001880: 0e 3e 86 ee 10 68 00 00 43 71 01 00 00 c9 b7 24 |.>...h..Cq.....$|
00001890: 02 00 ee d7 0e e0 c7 c9 f2 0e e0 c4 04 b7 ae 0a |................|
000018a0: 04 75 01 00 00 43 5e 00 00 00 c4 04 04 fd 00 00 |.u...C^.........|
000018b0: 00 24 02 00 f3 0e e0 c4 04 bf 7f af 68 00 00 42 |.$..........h..B|
000018c0: 74 01 00 00 f2 29 c8 03 cf 01 b6 01 00 04 14 11 |t....)..........|
000018d0: 04 43 0a 17 19 07 0e 0c 01 0d 00 11 04 98 0a 17 |.C..............|
000018e0: 19 07 0e 0c 01 0d 00 11 04 1b 0a 17 0d 11 04 7b |...............{|
000018f0: 08 0c 06 8d 03 00 04 0a 19 07 0e 0c 08 07 09 0d |................|
00001900: 0b 11 04 1b 0e 0c 06 07 07 17 07 11 06 1b 10 0c |................|
00001910: 06 20 07 17 1b 07 0e 07 02 1b 10 2a 13 0d 0b 07 |. .........*....|
00001920: 0e 07 02 1b 10 16 13 0d 0b 07 02 1b 0c 17 0d 16 |................|
00001930: 02 39 0a 48 14 11 04 1b 12 0c 01 21 33 07 0e 07 |.9.H.......!3...|
00001940: 0a 07 0b 0d 0b 07 0e 16 0e 0c 0f 0d 0b 07 0e 16 |................|
00001950: 0e 0c 0f 0d 00 11 04 66 0a 17 19 07 0e 0c 08 07 |.......f........|
00001960: 09 0d 0b 11 04 1b 0c 07 0a 11 04 1b 0f 17 0d 16 |................|
00001970: 02 39 0a 48 14 11 04 1b 12 0c 01 21 33 07 0e 07 |.9.H.......!3...|
00001980: 0a 07 0b 0d 0b 07 0e 11 0e 3e 5c 34 6b 0d 0b 07 |.........>\4k...|
00001990: 0e 16 0e 07 10 11 04 1b 23 00 0c 43 06 01 e2 03 |........#..C....|
000019a0: 00 02 00 06 01 01 3d 02 ec 05 00 00 00 a8 04 00 |......=.........|
000019b0: 01 00 cc 03 01 0c 26 00 00 cb b7 cc c8 ba a5 ec |......&.........|
000019c0: 18 c7 c8 68 00 00 43 77 01 00 00 c2 00 c0 e8 03 |...h..Cw........|
000019d0: 24 02 00 4b 95 01 ee e5 b7 cc c8 ba a5 ec 14 68 |$..K...........h|
000019e0: 00 00 43 78 01 00 00 c7 c8 48 24 01 00 0e 95 01 |..Cx.....H$.....|
000019f0: ee e9 29 c8 03 2b d4 01 00 05 08 17 0a 0c 0e 0c |..)..+..........|
00001a00: 04 12 13 07 06 07 0a 11 04 34 16 15 09 18 1d 0c |.........4......|
00001a10: 0e 0c 04 12 13 11 04 1b 1c 07 06 07 01 07 05 15 |................|
00001a20: 02 00 0c 43 06 01 00 00 00 00 00 00 00 01 00 29 |...C...........)|
00001a30: c8 03 03 d9 01 1e 00 0c 43 06 01 e4 03 00 00 00 |........C.......|
00001a40: 01 01 01 04 00 ca 03 00 0c c2 00 f0 29 c8 03 09 |............)...|
00001a50: df 01 00 03 08 00 02 12 04 00 0c 62 06 01 f2 05 |...........b....|
00001a60: 00 03 00 03 01 02 3f 03 ee 04 01 00 60 d6 01 01 |......?.....`...|
00001a70: 01 20 f4 05 01 02 30 ca 03 00 0c 63 02 00 63 01 |. ....0....c..c.|
00001a80: 00 63 00 00 0b cb c2 00 4f 6b 00 00 00 cc 39 c7 |.c......Ok....9.|
00001a90: 00 00 00 43 82 00 00 00 24 00 00 43 81 00 00 00 |...C....$..C....|
00001aa0: 64 01 00 24 01 00 0e 39 c7 00 00 00 11 c2 01 21 |d..$...9.......!|
00001ab0: 01 00 cd 64 02 00 8d 0e 06 2f c8 03 17 e0 01 05 |...d...../......|
00001ac0: 00 13 0c 06 1b 0e 1b 10 11 04 1b 0c 11 01 17 0f |................|
00001ad0: 2a 0e 17 1d 00 0c 42 06 01 00 00 00 00 02 02 00 |*.....B.........|
00001ae0: 10 00 ee 04 00 09 ca 03 00 0c 68 00 00 0e 68 01 |..........h...h.|
00001af0: 00 43 7b 01 00 00 24 00 00 29 c8 03 0b e2 01 13 |.C{...$..)......|
00001b00: 03 0d 17 00 11 06 1b 06 00 0c 42 06 01 00 00 00 |..........B.....|
00001b10: 00 00 00 00 01 00 29 c8 03 03 e7 01 1e 00 0c 43 |......)........C|
00001b20: 06 01 e6 03 00 04 00 04 02 04 60 04 f8 05 00 00 |..........`.....|
00001b30: 40 fa 05 00 01 00 fc 05 00 02 00 fe 05 00 03 00 |@...............|
00001b40: d0 03 02 00 cc 03 01 0c b7 cb 39 c7 00 00 00 43 |..........9....C|
00001b50: 83 00 00 00 24 00 00 cc 39 c7 00 00 00 43 83 00 |....$...9....C..|
00001b60: 00 00 24 00 00 cd 39 c7 00 00 00 43 82 00 00 00 |..$...9....C....|
00001b70: 24 00 00 ce c8 43 19 00 00 00 c2 00 24 01 00 0e |$....C......$...|
00001b80: c9 43 19 00 00 00 c2 01 24 01 00 0e ca 43 81 00 |.C......$....C..|
00001b90: 00 00 c2 02 24 01 00 0e 68 01 00 43 77 01 00 00 |....$...h..Cw...|
00001ba0: c2 03 bf 0a 24 02 00 29 c8 03 2d ee 01 00 0f 12 |....$..)..-.....|
00001bb0: 1b 0e 1b 0e 17 1b 1b 0e 1b 0e 17 1b 1b 0e 1b 10 |................|
00001bc0: 17 27 07 04 25 0c 17 0f 07 04 25 0c 17 0f 07 04 |.'..%.....%.....|
00001bd0: 25 0a 17 0d 11 04 2f 16 00 0c 42 06 01 00 00 00 |%...../...B.....|
00001be0: 00 02 01 00 04 00 f8 05 00 01 df 93 e3 28 c8 03 |.............(..|
00001bf0: 07 f4 01 0d 02 0c 07 0e 00 0c 42 06 01 00 00 00 |..........B.....|
00001c00: 00 02 01 00 04 00 f8 05 00 01 df 93 e3 28 c8 03 |.............(..|
00001c10: 07 f5 01 0d 02 0c 07 0e 00 0c 42 06 01 00 00 00 |..........B.....|
00001c20: 00 02 01 00 04 00 f8 05 00 01 df 93 e3 28 c8 03 |.............(..|
00001c30: 07 f6 01 0c 02 0c 07 0e 00 0c 42 06 01 00 00 00 |..........B.....|
00001c40: 00 03 02 00 05 00 d0 03 00 00 f8 05 00 01 df e0 |................|
00001c50: ba f2 29 c8 03 09 f7 01 12 02 10 07 0e 0c 01 00 |..).............|
```

### WASM
```
00000000: 05 9c 01 4c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |...L__tests__/fi|
00000010: 78 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 |xtures_quickjs/t|
00000020: 65 73 74 5f 73 74 64 2e 6a 73 06 73 74 64 04 6f |est_std.js.std.o|
00000030: 73 02 65 0c 61 73 73 65 72 74 16 74 65 73 74 5f |s.e.assert.test_|
00000040: 70 72 69 6e 74 66 14 74 65 73 74 5f 66 69 6c 65 |printf.test_file|
00000050: 31 14 74 65 73 74 5f 66 69 6c 65 32 18 74 65 73 |1.test_file2.tes|
00000060: 74 5f 67 65 74 6c 69 6e 65 14 74 65 73 74 5f 70 |t_getline.test_p|
00000070: 6f 70 65 6e 1a 74 65 73 74 5f 65 78 74 5f 6a 73 |open.test_ext_js|
00000080: 6f 6e 0e 74 65 73 74 5f 6f 73 18 74 65 73 74 5f |on.test_os.test_|
00000090: 6f 73 5f 65 78 65 63 14 74 65 73 74 5f 74 69 6d |os_exec.test_tim|
000000a0: 65 72 1a 74 65 73 74 5f 61 73 79 6e 63 5f 67 63 |er.test_async_gc|
000000b0: 38 74 65 73 74 5f 61 73 79 6e 63 5f 70 72 6f 6d |8test_async_prom|
000000c0: 69 73 65 5f 72 65 6a 65 63 74 69 6f 6e 14 6c 6f |ise_rejection.lo|
000000d0: 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f 61 73 |adScript.test_as|
000000e0: 73 65 72 74 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |sert.js.actual.e|
000000f0: 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 |xpected.is.asser|
00000100: 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 |tion failed: got|
00000110: 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 | |.|., expected |
00000120: 7c 04 20 28 02 29 0e 73 70 72 69 6e 74 66 12 61 ||. (.).sprintf.a|
00000130: 3d 25 64 20 73 3d 25 73 06 61 62 63 16 61 3d 31 |=%d s=%s.abc.a=1|
00000140: 32 33 20 73 3d 61 62 63 0a 25 30 31 30 64 14 30 |23 s=abc.%010d.0|
00000150: 30 30 30 30 30 30 31 32 33 04 25 78 10 66 66 66 |000000123.%x.fff|
00000160: 66 66 66 66 65 06 25 6c 78 20 66 66 66 66 66 66 |ffffe.%lx ffffff|
00000170: 66 66 66 66 66 66 66 66 66 65 0c 25 31 30 2e 31 |fffffffffe.%10.1|
00000180: 66 14 20 20 20 20 20 20 20 32 2e 31 0a 25 2a 2e |f.       2.1.%*.|
00000190: 2a 66 14 20 20 20 20 20 2d 32 2e 31 33 08 25 23 |*f.     -2.13.%#|
000001a0: 6c 78 24 30 78 37 66 66 66 66 66 66 66 66 66 66 |lx$0x7ffffffffff|
000001b0: 66 66 66 66 66 02 66 06 6c 65 6e 06 73 74 72 08 |fffff.f.len.str.|
000001c0: 73 69 7a 65 06 62 75 66 06 72 65 74 02 69 08 73 |size.buf.ret.i.s|
000001d0: 74 72 31 0e 74 6d 70 66 69 6c 65 18 68 65 6c 6c |tr1.tmpfile.hell|
000001e0: 6f 20 77 6f 72 6c 64 0a 08 70 75 74 73 08 73 65 |o world..puts.se|
000001f0: 65 6b 10 53 45 45 4b 5f 53 45 54 18 72 65 61 64 |ek.SEEK_SET.read|
00000200: 41 73 53 74 72 69 6e 67 10 53 45 45 4b 5f 45 4e |AsString.SEEK_EN|
00000210: 44 08 74 65 6c 6c 08 72 65 61 64 0c 62 75 66 66 |D.tell.read.buff|
00000220: 65 72 14 63 68 61 72 43 6f 64 65 41 74 0a 63 6c |er.charCodeAt.cl|
00000230: 6f 73 65 0e 70 75 74 42 79 74 65 0e 67 65 74 42 |ose.putByte.getB|
00000240: 79 74 65 08 6c 69 6e 65 14 6c 69 6e 65 5f 63 6f |yte.line.line_co|
00000250: 75 6e 74 0a 6c 69 6e 65 73 16 68 65 6c 6c 6f 20 |unt.lines.hello |
00000260: 77 6f 72 6c 64 0c 6c 69 6e 65 20 31 0c 6c 69 6e |world.line 1.lin|
00000270: 65 20 32 02 0a 06 65 6f 66 0e 67 65 74 6c 69 6e |e 2...eof.getlin|
00000280: 65 0a 66 6e 61 6d 65 0e 63 6f 6e 74 65 6e 74 18 |e.fname.content.|
00000290: 74 6d 70 5f 66 69 6c 65 2e 74 78 74 08 6f 70 65 |tmp_file.txt.ope|
000002a0: 6e 02 77 10 6c 6f 61 64 46 69 6c 65 0a 70 6f 70 |n.w.loadFile.pop|
000002b0: 65 6e 08 63 61 74 20 02 72 0c 72 65 6d 6f 76 65 |en.cat .r.remove|
000002c0: 06 6f 62 6a 8e 01 7b 22 78 22 3a 66 61 6c 73 65 |.obj..{"x":false|
000002d0: 2c 22 79 22 3a 74 72 75 65 2c 22 7a 32 22 3a 6e |,"y":true,"z2":n|
000002e0: 75 6c 6c 2c 22 61 22 3a 5b 31 2c 38 2c 31 36 30 |ull,"a":[1,8,160|
000002f0: 5d 2c 22 62 22 3a 22 61 62 63 5c 75 30 30 30 62 |],"b":"abc\u000b|
00000300: 64 22 2c 22 73 22 3a 22 73 74 72 22 7d e4 05 7b |d","s":"str"}..{|
00000310: 20 22 78 22 3a 66 61 6c 73 65 2c 20 2f 2a 63 6f | "x":false, /*co|
00000320: 6d 6d 65 6e 74 73 20 61 72 65 20 61 6c 6c 6f 77 |mments are allow|
00000330: 65 64 20 2a 2f 0a 20 20 20 20 20 20 20 20 20 20 |ed */.          |
00000340: 20 20 20 20 20 22 79 22 3a 74 72 75 65 2c 20 20 |     "y":true,  |
00000350: 2f 2f 20 61 6c 73 6f 20 61 20 63 6f 6d 6d 65 6e |// also a commen|
00000360: 74 0a 20 20 20 20 20 20 20 20 20 20 20 20 20 20 |t.              |
00000370: 20 7a 32 3a 6e 75 6c 6c 2c 20 2f 2f 20 75 6e 71 | z2:null, // unq|
00000380: 75 6f 74 65 64 20 70 72 6f 70 65 72 74 79 20 6e |uoted property n|
00000390: 61 6d 65 73 0a 20 20 20 20 20 20 20 20 20 20 20 |ames.           |
000003a0: 20 20 20 20 22 61 22 3a 5b 2b 31 2c 30 6f 31 30 |    "a":[+1,0o10|
000003b0: 2c 30 78 61 30 2c 5d 2c 20 2f 2f 20 70 6c 75 73 |,0xa0,], // plus|
000003c0: 20 70 72 65 66 69 78 2c 20 6f 63 74 61 6c 2c 20 | prefix, octal, |
000003d0: 68 65 78 61 64 65 63 69 6d 61 6c 0a 20 20 20 20 |hexadecimal.    |
000003e0: 20 20 20 20 20 20 20 20 20 20 20 22 62 22 3a 20 |           "b": |
000003f0: 22 61 62 63 5c 76 64 22 2c 20 2f 2f 20 6d 75 6c |"abc\vd", // mul|
00000400: 74 69 2d 6c 69 6e 65 20 73 74 72 69 6e 67 73 2c |ti-line strings,|
00000410: 20 27 0b 27 20 65 73 63 61 70 65 0a 20 20 20 20 | '.' escape.    |
00000420: 20 20 20 20 20 20 20 20 20 20 20 22 73 22 3a 27 |           "s":'|
00000430: 73 74 72 27 2c 7d 20 2f 2f 20 74 72 61 69 6c 69 |str',} // traili|
00000440: 6e 67 20 63 6f 6d 6d 61 20 69 6e 20 6f 62 6a 65 |ng comma in obje|
00000450: 63 74 73 20 61 6e 64 20 61 72 72 61 79 73 2c 20 |cts and arrays, |
00000460: 73 69 6e 67 6c 65 20 71 75 6f 74 65 64 20 73 74 |single quoted st|
00000470: 72 69 6e 67 0a 20 20 20 20 20 20 20 20 20 20 20 |ring.           |
00000480: 20 18 70 61 72 73 65 45 78 74 4a 53 4f 4e 12 73 | .parseExtJSON.s|
00000490: 74 72 69 6e 67 69 66 79 74 5b 49 6e 66 69 6e 69 |tringifyt[Infini|
000004a0: 74 79 2c 20 2b 49 6e 66 69 6e 69 74 79 2c 20 2d |ty, +Infinity, -|
000004b0: 49 6e 66 69 6e 69 74 79 2c 20 4e 61 4e 2c 20 2b |Infinity, NaN, +|
000004c0: 4e 61 4e 2c 20 2d 4e 61 4e 2c 20 2e 31 2c 20 2d |NaN, -NaN, .1, -|
000004d0: 2e 32 5d 04 66 64 0a 66 70 61 74 68 08 66 64 69 |.2].fd.fpath.fdi|
000004e0: 72 08 62 75 66 32 0a 66 69 6c 65 73 06 65 72 72 |r.buf2.files.err|
000004f0: 0a 66 64 61 74 65 04 73 74 12 6c 69 6e 6b 5f 70 |.fdate.st.link_p|
00000500: 61 74 68 14 73 74 64 69 6e 49 73 54 54 59 0e 2f |ath.stdinIsTTY./|
00000510: 62 69 6e 2f 73 68 04 2d 63 12 74 65 73 74 20 2d |bin/sh.-c.test -|
00000520: 74 20 30 0e 75 73 65 50 61 74 68 0c 69 73 61 74 |t 0.usePath.isat|
00000530: 74 79 1a 69 73 61 74 74 79 28 53 54 44 49 4e 29 |ty.isatty(STDIN)|
00000540: 18 74 65 73 74 5f 74 6d 70 5f 64 69 72 02 2f 14 |.test_tmp_dir./.|
00000550: 2f 74 65 73 74 5f 6c 69 6e 6b 0a 6d 6b 64 69 72 |/test_link.mkdir|
00000560: 0c 4f 5f 52 44 57 52 0e 4f 5f 43 52 45 41 54 0e |.O_RDWR.O_CREAT.|
00000570: 4f 5f 54 52 55 4e 43 0a 77 72 69 74 65 0e 72 65 |O_TRUNC.write.re|
00000580: 61 64 64 69 72 0e 69 6e 64 65 78 4f 66 0c 75 74 |addir.indexOf.ut|
00000590: 69 6d 65 73 08 73 74 61 74 08 6d 6f 64 65 0c 53 |imes.stat.mode.S|
000005a0: 5f 49 46 4d 54 0e 53 5f 49 46 52 45 47 0a 6d 74 |_IFMT.S_IFREG.mt|
000005b0: 69 6d 65 0e 73 79 6d 6c 69 6e 6b 0a 6c 73 74 61 |ime.symlink.lsta|
000005c0: 74 0e 53 5f 49 46 4c 4e 4b 10 72 65 61 64 6c 69 |t.S_IFLNK.readli|
000005d0: 6e 6b 0c 67 65 74 63 77 64 10 72 65 61 6c 70 61 |nk.getcwd.realpa|
000005e0: 74 68 02 2e 10 4f 5f 52 44 4f 4e 4c 59 06 66 64 |th...O_RDONLY.fd|
000005f0: 73 06 70 69 64 0c 65 78 69 74 20 31 08 70 69 70 |s.pid.exit 1.pip|
00000600: 65 04 73 68 12 65 63 68 6f 20 24 46 4f 4f 0c 73 |e.sh.echo $FOO.s|
00000610: 74 64 6f 75 74 0a 62 6c 6f 63 6b 0a 68 65 6c 6c |tdout.block.hell|
00000620: 6f 06 46 4f 4f 06 65 6e 76 0c 66 64 6f 70 65 6e |o.FOO.env.fdopen|
00000630: 0e 77 61 69 74 70 69 64 06 63 61 74 08 6b 69 6c |.waitpid.cat.kil|
00000640: 6c 0e 53 49 47 54 45 52 4d 3c 65 78 70 65 63 74 |l.SIGTERM<expect|
00000650: 20 6e 6f 6e 7a 65 72 6f 20 65 78 69 74 20 63 6f | nonzero exit co|
00000660: 64 65 20 28 67 6f 74 20 04 74 68 14 73 65 74 54 |de (got .th.setT|
00000670: 69 6d 65 6f 75 74 18 63 6c 65 61 72 54 69 6d 65 |imeout.clearTime|
00000680: 6f 75 74 06 72 75 6e 02 70 04 67 63 0e 63 6f 75 |out.run.p.gc.cou|
00000690: 6e 74 65 72 04 70 31 04 70 32 04 70 33 0d c8 03 |nter.p1.p2.p3...|
000006a0: 02 ca 03 02 cc 03 02 00 00 02 00 01 fe 01 00 01 |................|
000006b0: 01 fe 01 01 00 0c 20 06 01 a4 01 00 01 00 04 0e |...... .........|
000006c0: 0c 96 01 01 ce 03 03 00 03 ca 03 00 0d cc 03 01 |................|
000006d0: 0d d0 03 00 01 d2 03 01 01 d4 03 02 01 d6 03 03 |................|
000006e0: 01 d8 03 04 01 da 03 05 01 dc 03 06 01 de 03 07 |................|
000006f0: 01 e0 03 08 01 e2 03 09 01 e4 03 0a 01 e6 03 0b |................|
00000700: 01 08 ec 3a c2 00 e5 c2 01 e6 c2 02 61 04 00 c2 |...:........a...|
00000710: 03 61 05 00 c2 04 61 06 00 c2 05 61 07 00 c2 06 |.a....a....a....|
00000720: 61 08 00 c2 07 61 09 00 c2 08 61 0a 00 c2 09 61 |a....a....a....a|
00000730: 0b 00 c2 0a 61 0c 00 c2 0b 61 0d 00 29 6f 18 00 |....a....a..)o..|
00000740: 00 00 68 00 00 43 f4 00 00 00 04 f5 00 00 00 24 |..h..C.........$|
00000750: 01 00 0e 0e ee 0b cb 6f 07 00 00 00 0e ee 02 30 |.......o.......0|
00000760: e2 f0 0e 60 04 00 f0 0e 60 05 00 f0 0e 60 06 00 |...`....`....`..|
00000770: f0 0e 60 07 00 f0 0e 60 09 00 f0 0e 60 0a 00 f0 |..`....`....`...|
00000780: 0e 60 0b 00 f0 0e 60 08 00 f0 0e 60 0c 00 f0 0e |.`....`....`....|
00000790: 60 0d 00 f0 0e 06 2f c8 03 39 00 00 00 41 24 08 |`...../..9...A$.|
000007a0: 11 06 34 16 00 11 ce 03 23 07 16 0d 15 11 14 0d |..4.....#.......|
000007b0: 13 11 14 0d 13 11 18 0d 17 11 14 0d 13 11 0e 0d |................|
000007c0: 0d 11 18 0d 17 11 14 0d 13 11 1a 0d 19 11 1a 0d |................|
000007d0: 19 11 38 00 0c 43 06 01 d0 03 03 01 03 04 00 00 |..8..C..........|
000007e0: 85 01 04 ec 03 00 01 00 ee 03 00 01 00 68 00 01 |.............h..|
000007f0: 00 9e 01 00 01 00 0c 00 cb c7 eb b8 ab ec 03 0a |................|
00000800: d8 39 9d 00 00 00 43 f8 00 00 00 d3 d4 24 02 00 |.9....C......$..|
00000810: ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 |..).../...+...K.|
00000820: 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 |....!...K.......|
00000830: 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 |C9...$...C9...$.|
00000840: 00 ad ec 02 29 39 9f 00 00 00 04 f9 00 00 00 d3 |....)9..........|
00000850: 9f 04 fa 00 00 00 9f 04 fb 00 00 00 9f d4 9f 04 |................|
00000860: fa 00 00 00 9f d5 ec 10 04 fc 00 00 00 d5 9f 04 |................|
00000870: fd 00 00 00 9f ee 02 c3 9f f1 30 c8 03 54 03 00 |..........0..T..|
00000880: 12 10 07 12 0c 10 12 21 0d 00 1b 0c 1b 08 07 10 |.......!........|
00000890: 07 11 1c 11 08 00 07 0e 11 18 07 12 12 23 07 0e |.............#..|
000008a0: 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 |/,..0Y..........|
000008b0: 11 29 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f |.).)..4D.. . ..?|
000008c0: 07 03 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 |.. ..1*".. ....1|
000008d0: 07 15 00 0c 43 06 01 d2 03 00 00 00 07 02 03 bf |....C...........|
000008e0: 01 00 d0 03 02 00 ca 03 00 0c df 68 01 00 43 fe |...........h..C.|
000008f0: 00 00 00 04 ff 00 00 00 bf 7b 04 00 01 00 00 24 |.........{.....$|
00000900: 03 00 04 01 01 00 00 f2 0e df 68 01 00 43 fe 00 |..........h..C..|
00000910: 00 00 04 02 01 00 00 bf 7b 24 02 00 04 03 01 00 |........{$......|
00000920: 00 f2 0e df 68 01 00 43 fe 00 00 00 04 04 01 00 |....h..C........|
00000930: 00 bf fe 24 02 00 04 05 01 00 00 f2 0e df 68 01 |...$..........h.|
00000940: 00 43 fe 00 00 00 04 06 01 00 00 bf fe 24 02 00 |.C...........$..|
00000950: 04 07 01 00 00 f2 0e df 68 01 00 43 fe 00 00 00 |........h..C....|
00000960: 04 08 01 00 00 c1 00 24 02 00 04 09 01 00 00 f2 |.......$........|
00000970: 0e df 68 01 00 43 fe 00 00 00 04 0a 01 00 00 bf |..h..C..........|
00000980: 0a b9 c1 01 8e 24 04 00 04 0b 01 00 00 f2 0e df |.....$..........|
00000990: 68 01 00 43 fe 00 00 00 04 0c 01 00 00 c1 02 24 |h..C...........$|
000009a0: 02 00 04 0d 01 00 00 f2 29 c8 03 4e 16 00 03 08 |........)..N....|
000009b0: 07 0e 11 06 57 10 2a 17 0d 0b 07 0e 11 06 3e 10 |....W.*.......>.|
000009c0: 2a 17 0d 0b 07 0e 11 06 34 1e 0c 0d 2a 17 0d 0b |*.......4...*...|
000009d0: 07 0e 11 06 34 20 0c 0f 2a 17 0d 0b 07 0e 11 06 |....4 ..*.......|
000009e0: 3e 10 2a 17 0d 0b 07 0e 11 06 4d 32 07 21 2a 17 |>.*.......M2.!*.|
000009f0: 0d 0b 07 0e 11 06 3e 10 2a 17 00 06 cd cc cc cc |......>.*.......|
00000a00: cc cc 00 40 06 0a d7 a3 70 3d 0a 01 40 0a 08 ff |...@....p=..@...|
00000a10: ff ff ff ff ff ff 7f 0c 43 06 01 d4 03 00 08 00 |........C.......|
00000a20: 05 02 00 cb 01 08 9c 04 00 00 00 9e 04 00 01 00 |................|
00000a30: a0 04 00 02 00 a2 04 00 03 00 a4 04 00 04 00 a6 |................|
00000a40: 04 00 05 00 a8 04 00 06 00 aa 04 00 07 00 ca 03 |................|
00000a50: 00 0c d0 03 02 00 68 00 00 43 16 01 00 00 24 00 |......h..C....$.|
00000a60: 00 cb 04 17 01 00 00 cd c7 43 18 01 00 00 c9 24 |.........C.....$|
00000a70: 01 00 0e c7 43 19 01 00 00 b7 68 00 00 42 1a 01 |....C.....h..B..|
00000a80: 00 00 24 02 00 0e c7 43 1b 01 00 00 24 00 00 c5 |..$....C....$...|
00000a90: 07 e0 c4 07 c9 ad f1 0e c7 43 19 01 00 00 b7 68 |.........C.....h|
00000aa0: 00 00 42 1c 01 00 00 24 02 00 0e c7 43 1d 01 00 |..B....$....C...|
00000ab0: 00 24 00 00 ce e0 ca c9 eb ad f1 0e c7 43 19 01 |.$...........C..|
00000ac0: 00 00 b7 68 00 00 42 1a 01 00 00 24 02 00 0e 39 |...h..B....$...9|
00000ad0: b0 00 00 00 11 ca 21 01 00 c5 04 c7 43 1e 01 00 |......!.....C...|
00000ae0: 00 c4 04 42 1f 01 00 00 b7 ca 24 03 00 c5 05 e0 |...B......$.....|
00000af0: c4 05 ca ad f1 0e b7 c5 06 c4 06 ca a5 ec 19 e0 |................|
00000b00: c4 04 c4 06 48 c9 43 20 01 00 00 c4 06 24 01 00 |....H.C .....$..|
00000b10: ad f1 0e 95 06 ee e3 c7 43 21 01 00 00 24 00 00 |........C!...$..|
00000b20: 29 c8 03 92 01 1f 00 04 10 11 06 1b 10 17 1d 21 |)..............!|
00000b30: 00 07 02 1b 0c 07 01 17 0b 07 02 20 12 11 06 1b |........... ....|
00000b40: 0d 17 02 07 02 1b 1a 1c 29 07 0e 0c 12 07 07 07 |........).......|
00000b50: 0b 0d 0b 07 02 20 12 11 06 1b 0d 17 02 07 02 1b |..... ..........|
00000b60: 0a 17 19 07 0e 07 12 07 06 07 0d 07 0b 0d 0b 07 |................|
00000b70: 02 20 12 11 06 1b 0d 17 08 20 16 07 01 1c 1b 07 |. ....... ......|
00000b80: 02 1b 0c 0c 06 20 18 07 1f 1c 17 07 0e 0c 10 07 |..... ..........|
00000b90: 07 07 09 0d 01 11 0e 0c 08 07 03 12 13 07 0e 0c |................|
00000ba0: 08 0c 01 07 10 07 06 1b 18 0c 01 11 23 07 0f 0b |............#...|
00000bb0: 1a 18 2d 07 02 1b 0c 00 0c 43 06 01 d6 03 00 04 |..-......C......|
00000bc0: 00 05 02 00 80 01 04 9c 04 00 00 00 a0 04 00 01 |................|
00000bd0: 00 a8 04 00 02 00 a2 04 00 03 00 ca 03 00 0c d0 |................|
00000be0: 03 02 00 68 00 00 43 16 01 00 00 24 00 00 cb 04 |...h..C....$....|
00000bf0: 17 01 00 00 d0 eb ce b7 cd c9 ca a5 ec 19 c7 43 |...............C|
00000c00: 22 01 00 00 c8 43 20 01 00 00 c9 24 01 00 24 01 |"....C ....$..$.|
00000c10: 00 0e 95 02 ee e4 c7 43 19 01 00 00 b7 68 00 00 |.......C.....h..|
00000c20: 42 1a 01 00 00 24 02 00 0e b7 cd c9 ca a5 ec 1c |B....$..........|
00000c30: e0 c8 43 20 01 00 00 c9 24 01 00 c7 43 23 01 00 |..C ....$...C#..|
00000c40: 00 24 00 00 ad f1 0e 95 02 ee e1 e0 c7 43 23 01 |.$...........C#.|
00000c50: 00 00 24 00 00 b6 ad f1 0e c7 43 21 01 00 00 24 |..$.......C!...$|
00000c60: 00 00 29 c8 03 60 32 00 04 10 11 06 1b 10 17 1d |..)..`2.........|
00000c70: 21 14 0d 09 0c 0e 07 08 07 03 12 13 07 02 1b 12 |!...............|
00000c80: 07 06 1b 18 07 01 11 1d 15 14 18 2d 07 02 20 12 |...........-.. .|
00000c90: 11 06 1b 0d 17 01 0c 0e 07 08 07 03 12 13 07 0e |................|
00000ca0: 07 06 1b 18 07 01 11 10 07 02 1b 10 11 19 07 25 |...............%|
00000cb0: 0b 1a 19 2d 07 0e 07 02 1b 10 11 0e 07 07 07 19 |...-............|
00000cc0: 0d 0b 07 02 1b 0c 00 0c 43 06 01 d8 03 00 05 00 |........C.......|
00000cd0: 04 02 00 98 01 05 9c 04 00 00 00 c8 04 00 01 00 |................|
00000ce0: ca 04 00 02 00 cc 04 00 03 00 a8 04 00 04 00 ca |................|
00000cf0: 03 00 0c d0 03 02 00 04 27 01 00 00 04 28 01 00 |........'....(..|
00000d00: 00 04 29 01 00 00 26 03 00 ce 68 00 00 43 16 01 |..)...&...h..C..|
00000d10: 00 00 24 00 00 cb b7 c5 04 c4 04 ca eb a5 ec 18 |..$.............|
00000d20: c7 43 18 01 00 00 ca c4 04 48 04 2a 01 00 00 24 |.C.......H.*...$|
00000d30: 02 00 0e 95 04 ee e3 c7 43 19 01 00 00 b7 68 00 |........C.....h.|
00000d40: 00 42 1a 01 00 00 24 02 00 0e e0 c7 43 2b 01 00 |.B....$.....C+..|
00000d50: 00 24 00 00 98 f1 0e b7 cd c7 43 2c 01 00 00 24 |.$........C,...$|
00000d60: 00 00 d0 f5 ed 0d e0 c8 ca c9 48 ab f1 0e 95 02 |..........H.....|
00000d70: ee e8 e0 c7 43 2b 01 00 00 24 00 00 f1 0e e0 c9 |....C+...$......|
00000d80: ca eb ad f1 0e c7 43 21 01 00 00 24 00 00 29 c8 |......C!...$..).|
00000d90: 03 6c 40 00 04 08 62 08 11 06 1b 10 17 13 11 0e |.l@...b.........|
00000da0: 0c 08 07 0a 07 0d 12 13 07 02 1b 0c 07 0c 0c 01 |................|
00000db0: 20 0b 15 2a 19 3d 07 02 20 12 11 06 1b 0d 17 0b | ..*.=.. .......|
00000dc0: 07 10 07 02 1b 08 16 0d 0d 0b 0e 16 07 02 1b 10 |................|
00000dd0: 17 0d 13 11 07 0e 07 10 07 0c 07 01 07 0f 07 0b |................|
00000de0: 0d 08 18 1b 07 0e 07 02 1b 08 11 0b 0d 0b 07 0e |................|
00000df0: 07 1e 07 0a 07 11 07 17 0d 0b 07 02 1b 0c 00 0c |................|
00000e00: 43 06 01 da 03 00 04 00 04 03 00 7f 04 a0 04 00 |C...............|
00000e10: 00 00 9c 04 00 01 00 da 04 00 02 00 dc 04 00 03 |................|
00000e20: 00 ca 03 00 0c d0 03 02 00 cc 03 01 0c 04 2f 01 |............../.|
00000e30: 00 00 cd 04 27 01 00 00 ce 68 00 00 43 30 01 00 |....'....h..C0..|
00000e40: 00 c9 04 31 01 00 00 24 02 00 d0 43 18 01 00 00 |...1...$...C....|
00000e50: ca 24 01 00 0e c8 43 21 01 00 00 24 00 00 0e e0 |.$....C!...$....|
00000e60: 68 00 00 43 32 01 00 00 c9 24 01 00 ca f2 0e 68 |h..C2....$.....h|
00000e70: 00 00 43 33 01 00 00 04 34 01 00 00 c9 9f 04 35 |..C3....4......5|
00000e80: 01 00 00 24 02 00 d0 43 1b 01 00 00 24 00 00 cb |...$...C....$...|
00000e90: c8 43 21 01 00 00 24 00 00 0e e0 c7 ca f2 0e 68 |.C!...$........h|
00000ea0: 02 00 43 36 01 00 00 c9 24 01 00 29 c8 03 48 55 |..C6....$..)..HU|
00000eb0: 00 41 10 11 06 1b 0c 20 01 17 15 1b 0c 07 01 17 |.A..... ........|
00000ec0: 0b 07 02 1b 0c 18 0d 07 0e 11 06 1b 14 07 01 11 |................|
00000ed0: 12 07 2b 0e 03 11 06 34 20 07 03 20 0f 17 0b 1b |..+....4 .. ....|
00000ee0: 1a 17 27 07 02 1b 0c 17 0d 07 0e 07 0a 07 0b 0d |..'.............|
00000ef0: 0b 11 04 1b 10 07 01 00 0c 43 06 01 dc 03 00 03 |.........C......|
00000f00: 00 04 02 02 90 01 03 ee 03 00 00 00 b4 01 00 01 |................|
00000f10: 00 ee 04 00 02 00 ca 03 00 0c d0 03 02 00 04 38 |...............8|
00000f20: 01 00 00 cb 04 39 01 00 00 cc 68 00 00 43 3a 01 |.....9....h..C:.|
00000f30: 00 00 c8 24 01 00 cd e0 39 a6 00 00 00 43 3b 01 |...$....9....C;.|
00000f40: 00 00 c9 24 01 00 c7 f2 0e 68 00 00 43 3a 01 00 |...$.....h..C:..|
00000f50: 00 04 3c 01 00 00 24 01 00 cd e0 c9 b7 48 39 90 |..<...$......H9.|
00000f60: 00 00 00 f2 0e e0 c9 b8 48 39 90 00 00 00 f2 0e |........H9......|
00000f70: e0 c9 b9 48 39 90 00 00 00 8e f2 0e e0 c9 ba 48 |...H9..........H|
00000f80: 39 92 00 00 00 f2 0e e0 c9 bb 48 39 92 00 00 00 |9.........H9....|
00000f90: f2 0e e0 c9 bc 48 39 92 00 00 00 f2 0e e0 c9 bd |.....H9.........|
00000fa0: 48 c1 00 f2 0e e0 c9 be 48 c1 01 8e f2 29 c8 03 |H.......H....)..|
00000fb0: 74 64 00 04 08 21 00 00 06 10 0c 11 06 1b 1c 07 |td...!..........|
00000fc0: 01 17 2b 07 0e 1b 08 1b 16 07 01 11 0e 07 2b 0d |..+...........+.|
00000fd0: 00 11 06 34 1a 17 2b 07 0e 0c 06 07 0a 1b 11 0d |...4..+.........|
00000fe0: 0b 07 0e 0c 06 07 0a 1b 11 0d 0b 07 0e 0c 06 07 |................|
00000ff0: 0c 1b 01 07 11 0d 0b 07 0e 0c 06 07 0a 1b 11 0d |................|
00001000: 0b 07 0e 0c 06 07 0a 1b 11 0d 0b 07 0e 0c 06 07 |................|
00001010: 0a 1b 11 0d 0b 07 0e 0c 06 11 07 0d 0b 07 0e 0c |................|
00001020: 06 11 0a 07 11 00 06 9a 99 99 99 99 99 b9 3f 06 |..............?.|
00001030: 9a 99 99 99 99 99 c9 3f 0c 43 06 01 de 03 00 0d |.......?.C......|
00001040: 00 08 03 00 e8 07 0d fa 04 00 00 00 fc 04 00 01 |................|
00001050: 00 da 04 00 02 00 fe 04 00 03 00 a4 04 00 04 00 |................|
00001060: 80 05 00 05 00 a8 04 00 06 00 82 05 00 07 00 84 |................|
00001070: 05 00 08 00 86 05 00 09 00 88 05 00 0a 00 8a 05 |................|
00001080: 00 0b 00 8c 05 01 00 30 cc 03 01 0c d0 03 02 00 |.......0........|
00001090: ca 03 00 0c 63 0c 00 68 00 00 43 88 00 00 00 04 |....c..h..C.....|
000010a0: 47 01 00 00 04 48 01 00 00 04 49 01 00 00 26 03 |G....H....I...&.|
000010b0: 00 0b 09 4e 4a 01 00 00 24 02 00 98 c5 0c e0 68 |...NJ...$......h|
000010c0: 00 00 43 4b 01 00 00 b7 24 01 00 64 0c 00 04 4c |..CK....$..d...L|
000010d0: 01 00 00 f3 0e 04 4d 01 00 00 ce 04 2f 01 00 00 |......M...../...|
000010e0: cd ca 04 4e 01 00 00 9f c9 9f cc ca 04 4f 01 00 |...N.........O..|
000010f0: 00 9f c5 0b 68 00 00 43 36 01 00 00 c4 0b 24 01 |....h..C6.....$.|
00001100: 00 0e 68 00 00 43 36 01 00 00 c8 24 01 00 0e 68 |..h..C6....$...h|
00001110: 00 00 43 36 01 00 00 ca 24 01 00 0e 68 00 00 43 |..C6....$...h..C|
00001120: 50 01 00 00 ca c0 ed 01 24 02 00 c5 08 e0 c4 08 |P.......$.......|
00001130: b7 ad f1 0e 68 00 00 43 30 01 00 00 c8 68 00 00 |....h..C0....h..|
00001140: 42 51 01 00 00 68 00 00 42 52 01 00 00 b1 68 00 |BQ...h..BR....h.|
00001150: 00 42 53 01 00 00 b1 24 02 00 cb e0 c7 b7 a8 f1 |.BS....$........|
00001160: 0e 39 b0 00 00 00 11 bf 0a 21 01 00 c5 04 b7 c5 |.9.......!......|
00001170: 06 c4 06 c4 04 eb a5 ec 0c c4 04 c4 06 c4 06 4b |...............K|
00001180: 95 06 ee ee e0 68 00 00 43 54 01 00 00 c7 c4 04 |.....h..CT......|
00001190: 42 1f 01 00 00 b7 c4 04 eb 24 04 00 c4 04 eb ad |B........$......|
000011a0: f1 0e e0 68 00 00 43 19 01 00 00 c7 b7 68 02 00 |...h..C......h..|
000011b0: 42 1a 01 00 00 24 03 00 b7 ad f1 0e 39 b0 00 00 |B....$......9...|
000011c0: 00 11 c4 04 eb 21 01 00 c5 05 e0 68 00 00 43 1e |.....!.....h..C.|
000011d0: 01 00 00 c7 c4 05 42 1f 01 00 00 b7 c4 05 eb 24 |......B........$|
000011e0: 04 00 c4 05 eb ad f1 0e b7 c5 06 c4 06 c4 04 eb |................|
000011f0: a5 ec 13 e0 c4 04 c4 06 48 c4 05 c4 06 48 ab f1 |........H....H..|
00001200: 0e 95 06 ee e7 38 b9 00 00 00 f6 ed 4c e0 68 00 |.....8......L.h.|
00001210: 00 43 19 01 00 00 c7 39 b9 00 00 00 bd f1 68 02 |.C.....9......h.|
00001220: 00 42 1a 01 00 00 24 03 00 39 b9 00 00 00 bd f1 |.B....$..9......|
00001230: f2 0e e0 68 00 00 43 1e 01 00 00 c7 c4 05 42 1f |...h..C.......B.|
00001240: 01 00 00 b7 b8 24 04 00 b8 ad f1 0e e0 c4 04 bd |.....$..........|
00001250: 48 c4 05 b7 48 ab f1 0e e0 68 00 00 43 21 01 00 |H...H....h..C!..|
00001260: 00 c7 24 01 00 b7 ad f1 0e ee 1c 11 7f 7a 41 01 |..$..........zA.|
00001270: 00 00 07 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 |.......>zB......|
00001280: 02 0e 3e 86 ee 0f 68 00 00 43 55 01 00 00 ca 24 |..>...h..CU....$|
00001290: 01 00 ee d8 0e e0 c4 08 b7 f2 0e e0 c4 07 43 56 |..............CV|
000012a0: 01 00 00 c9 24 01 00 b7 a8 f1 0e c0 10 27 c5 09 |....$........'..|
000012b0: 68 00 00 43 57 01 00 00 c8 c4 09 c4 09 24 03 00 |h..CW........$..|
000012c0: c5 08 e0 c4 08 b7 f2 0e ee 1c 11 7f 7a 44 01 00 |............zD..|
000012d0: 00 0a 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 02 |......>zB.......|
000012e0: 0e 3e 86 ee 0f 68 00 00 43 58 01 00 00 c8 24 01 |.>...h..CX....$.|
000012f0: 00 ee d8 0e e0 c4 08 b7 f2 0e e0 c4 0a 42 59 01 |.............BY.|
00001300: 00 00 68 00 00 42 5a 01 00 00 af 68 00 00 42 5b |..h..BZ....h..B[|
00001310: 01 00 00 f2 0e e0 c4 0a 42 5c 01 00 00 c4 09 f2 |........B\......|
00001320: 0e 68 00 00 43 5d 01 00 00 c9 c4 0b 24 02 00 c5 |.h..C]......$...|
00001330: 08 e0 c4 08 b7 ad f1 0e ee 1c 11 7f 7a 44 01 00 |............zD..|
00001340: 00 0a 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 02 |......>zB.......|
00001350: 0e 3e 86 ee 10 68 00 00 43 5e 01 00 00 c4 0b 24 |.>...h..C^.....$|
00001360: 01 00 ee d7 0e e0 c4 08 b7 f2 0e e0 c4 0a 42 59 |..............BY|
00001370: 01 00 00 68 00 00 42 5a 01 00 00 af 68 00 00 42 |...h..BZ....h..B|
00001380: 5f 01 00 00 f2 0e ee 1c 11 7f 7a 12 01 00 00 04 |_.........z.....|
00001390: 00 82 02 0e 3e 7a 42 01 00 00 08 00 82 02 0e 3e |....>zB........>|
000013a0: 86 ee 10 68 00 00 43 60 01 00 00 c4 0b 24 01 00 |...h..C`.....$..|
000013b0: ee d7 0e e0 c4 08 b7 f2 0e e0 c4 04 c9 f2 0e e0 |................|
000013c0: 68 00 00 43 36 01 00 00 c4 0b 24 01 00 b7 ad f1 |h..C6.....$.....|
000013d0: 0e ee 1c 11 7f 7a 12 01 00 00 04 00 82 02 0e 3e |.....z.........>|
000013e0: 7a 42 01 00 00 08 00 82 02 0e 3e 86 ee 0e 68 00 |zB........>...h.|
000013f0: 00 43 61 01 00 00 24 00 00 ee d9 0e e0 c4 08 b7 |.Ca...$.........|
00001400: f2 0e ee 1c 11 7f 7a 40 01 00 00 05 00 82 02 0e |......z@........|
00001410: 3e 7a 42 01 00 00 08 00 82 02 0e 3e 86 ee 13 68 |>zB........>...h|
00001420: 00 00 43 62 01 00 00 04 63 01 00 00 24 01 00 ee |..Cb....c...$...|
00001430: d4 0e e0 c4 08 b7 f2 0e e0 c4 04 c4 05 f2 0e e0 |................|
00001440: 68 00 00 43 36 01 00 00 c8 24 01 00 b7 ad f1 0e |h..C6....$......|
00001450: 68 00 00 43 30 01 00 00 c8 68 00 00 42 64 01 00 |h..C0....h..Bd..|
00001460: 00 24 02 00 cb e0 c7 b7 a5 f1 0e e0 68 00 00 43 |.$..........h..C|
00001470: 36 01 00 00 ca 24 01 00 b7 ad f1 29 c8 03 dc 04 |6....$.....)....|
00001480: 7b 00 13 30 11 04 98 0a 21 35 07 0e 11 04 20 0e |{..0....!5.... .|
00001490: 11 0a 2a 1d 0d 0b 21 00 21 10 20 0a 07 10 07 03 |..*...!.!. .....|
000014a0: 0d 0d 20 0a 12 21 11 04 1b 10 0c 01 17 11 11 04 |.. ..!..........|
000014b0: 1b 10 07 01 17 11 11 04 1b 10 07 01 17 05 11 04 |................|
000014c0: 1b 0e 16 01 1c 1b 07 0e 11 08 07 09 0d 01 11 04 |................|
000014d0: 1b 0c 07 0e 11 04 1b 14 11 04 1b 07 07 1e 11 04 |................|
000014e0: 1b 07 07 3d 17 17 07 0e 0c 06 07 07 0d 08 2a 14 |...=..........*.|
000014f0: 1c 1d 11 0e 0c 08 0c 06 07 09 12 13 0c 08 0c 0a |................|
00001500: 10 20 18 39 07 0e 11 04 1b 0e 07 08 0c 06 20 18 |. .9.......... .|
00001510: 0c 06 07 2d 11 48 0c 06 07 0d 07 51 0d 0b 07 0e |...-.H.....Q....|
00001520: 11 04 1b 0c 0c 0e 11 06 1b 15 16 2c 07 3b 0d 0a |...........,.;..|
00001530: 20 16 0c 06 07 07 1c 29 07 0e 11 04 1b 0c 07 08 | ......)........|
00001540: 0c 08 20 18 0c 08 07 31 11 4c 0c 08 07 0f 07 53 |.. ....1.L.....S|
00001550: 0d 01 11 0e 0c 08 0c 06 07 09 12 13 07 0e 0c 08 |................|
00001560: 0c 01 07 0e 0c 0a 0c 01 07 0d 07 0f 0b 26 18 23 |.............&.#|
00001570: 1b 0e 12 1b 07 0e 11 04 1b 0c 07 08 20 0c 07 0a |............ ...|
00001580: 11 06 1b 25 11 3e 20 0c 07 59 0d 0b 07 0e 11 04 |...%.> ..Y......|
00001590: 1b 0c 07 08 0c 08 25 11 16 30 07 3f 0d 0b 07 0e |......%..0.?....|
000015a0: 11 06 07 0e 11 08 07 0d 07 0f 0e 13 07 0e 11 04 |................|
000015b0: 1b 0e 07 01 16 0a 07 1b 0d 0b 16 02 39 0e 48 0e |............9.H.|
000015c0: 11 04 1b 12 07 01 21 31 07 0e 11 01 0d 0b 07 0e |......!1........|
000015d0: 0c 0a 1b 12 07 01 16 10 07 2b 0d 0b 1c 0c 11 04 |.........+......|
000015e0: 1b 10 07 0e 0c 0e 0c 1d 1c 1d 07 0e 11 01 0d 0b |................|
000015f0: 16 02 39 08 48 0e 11 04 1b 0c 07 01 21 25 07 0e |..9.H.......!%..|
00001600: 11 01 0d 0b 07 0e 0c 04 1b 10 11 04 1b 07 07 1a |................|
00001610: 11 04 1b 2f 0d 0b 07 0e 0c 04 1b 10 0c 15 0d 00 |.../............|
00001620: 11 04 1b 12 07 0e 0c 0f 1c 1f 07 0e 11 08 07 09 |................|
00001630: 0d 0b 16 02 39 08 48 0e 11 04 1b 0e 0c 01 21 27 |....9.H.......!'|
00001640: 07 0e 11 01 0d 0b 07 0e 0c 04 1b 10 11 04 1b 07 |................|
00001650: 07 1a 11 04 1b 2f 0d 0b 16 02 39 0a 48 0e 11 04 |...../....9.H...|
00001660: 1b 14 0c 01 21 2f 07 0e 11 01 0d 0b 07 0e 0c 0a |....!/..........|
00001670: 07 0b 0d 0b 07 0e 11 04 1b 10 0c 01 16 18 07 2b |...............+|
00001680: 0d 0b 16 02 39 0a 48 0e 11 04 1b 0e 21 2b 07 0e |....9.H.....!+..|
00001690: 11 01 0d 0b 16 02 39 0c 48 0e 11 04 34 12 21 31 |......9.H...4.!1|
000016a0: 07 0e 11 01 0d 0b 07 0e 0c 0a 0c 0b 0d 0b 07 0e |................|
000016b0: 11 04 1b 10 07 01 16 10 07 23 0d 01 11 04 1b 0c |.........#......|
000016c0: 07 0e 11 04 1b 13 17 17 07 0e 0c 06 07 07 0d 0b |................|
000016d0: 07 0e 11 04 1b 10 07 01 16 0e 07 21 00 0c 43 06 |...........!..C.|
000016e0: 01 e0 03 00 05 00 08 03 00 b5 03 05 a6 04 00 00 |................|
000016f0: 00 ca 05 00 01 00 cc 05 00 02 00 9c 04 00 03 00 |................|
00001700: 96 02 00 04 00 cc 03 01 0c d0 03 02 00 ca 03 00 |................|
00001710: 0c 68 00 00 43 88 00 00 00 04 03 00 00 00 26 01 |.h..C.........&.|
00001720: 00 24 01 00 cb e0 c7 b7 f2 0e 68 00 00 43 88 00 |.$........h..C..|
00001730: 00 00 04 47 01 00 00 04 48 01 00 00 04 67 01 00 |...G....H....g..|
00001740: 00 26 03 00 0b 09 4e 4a 01 00 00 24 02 00 cb e0 |.&....NJ...$....|
00001750: c7 b8 f2 0e 68 00 00 43 68 01 00 00 24 00 00 cc |....h..Ch...$...|
00001760: 68 00 00 43 88 00 00 00 04 69 01 00 00 04 48 01 |h..C.....i....H.|
00001770: 00 00 04 6a 01 00 00 26 03 00 0b c8 b8 48 4e 6b |...j...&.....HNk|
00001780: 01 00 00 09 4e 6c 01 00 00 0b 04 6d 01 00 00 4e |....Nl.....m...N|
00001790: 6e 01 00 00 4e 6f 01 00 00 24 02 00 cd e0 c9 b7 |n...No...$......|
000017a0: a8 f1 0e 68 00 00 43 21 01 00 00 c8 b8 48 24 01 |...h..C!.....H$.|
000017b0: 00 0e 68 02 00 43 70 01 00 00 c8 b7 48 04 35 01 |..h..Cp.....H.5.|
000017c0: 00 00 24 02 00 ce e0 ca 43 2c 01 00 00 24 00 00 |..$.....C,...$..|
000017d0: 04 6d 01 00 00 f2 0e e0 ca 43 2c 01 00 00 24 00 |.m.......C,...$.|
000017e0: 00 07 f2 0e ca 43 21 01 00 00 24 00 00 0e ee 1c |.....C!...$.....|
000017f0: 11 7f 7a 13 01 00 00 00 00 82 02 0e 3e 7a 8b 00 |..z.........>z..|
00001800: 00 00 04 00 82 02 0e 3e 86 ee 10 68 00 00 43 71 |.......>...h..Cq|
00001810: 01 00 00 c9 b7 24 02 00 ee d7 0e e0 c7 c9 f2 0e |.....$..........|
00001820: e0 c4 04 bf 7f af b7 f2 0e e0 c4 04 bf 08 a3 b7 |................|
00001830: f2 0e 68 00 00 43 88 00 00 00 04 72 01 00 00 26 |..h..C.....r...&|
00001840: 01 00 0b 09 4e 6c 01 00 00 24 02 00 cd e0 c9 b7 |....Nl...$......|
00001850: a8 f1 0e 68 00 00 43 73 01 00 00 c9 68 00 00 42 |...h..Cs....h..B|
00001860: 74 01 00 00 24 02 00 0e ee 1c 11 7f 7a 13 01 00 |t...$.......z...|
00001870: 00 00 00 82 02 0e 3e 7a 8b 00 00 00 04 00 82 02 |......>z........|
00001880: 0e 3e 86 ee 10 68 00 00 43 71 01 00 00 c9 b7 24 |.>...h..Cq.....$|
00001890: 02 00 ee d7 0e e0 c7 c9 f2 0e e0 c4 04 b7 ae 0a |................|
000018a0: 04 75 01 00 00 43 5e 00 00 00 c4 04 04 fd 00 00 |.u...C^.........|
000018b0: 00 24 02 00 f3 0e e0 c4 04 bf 7f af 68 00 00 42 |.$..........h..B|
000018c0: 74 01 00 00 f2 29 c8 03 cf 01 b6 01 00 04 14 11 |t....)..........|
000018d0: 04 43 0a 17 19 07 0e 0c 01 0d 00 11 04 98 0a 17 |.C..............|
000018e0: 19 07 0e 0c 01 0d 00 11 04 1b 0a 17 0d 11 04 7b |...............{|
000018f0: 08 0c 06 8d 03 00 04 0a 19 07 0e 0c 08 07 09 0d |................|
00001900: 0b 11 04 1b 0e 0c 06 07 07 17 07 11 06 1b 10 0c |................|
00001910: 06 20 07 17 1b 07 0e 07 02 1b 10 2a 13 0d 0b 07 |. .........*....|
00001920: 0e 07 02 1b 10 16 13 0d 0b 07 02 1b 0c 17 0d 16 |................|
00001930: 02 39 0a 48 14 11 04 1b 12 0c 01 21 33 07 0e 07 |.9.H.......!3...|
00001940: 0a 07 0b 0d 0b 07 0e 16 0e 0c 0f 0d 0b 07 0e 16 |................|
00001950: 0e 0c 0f 0d 00 11 04 66 0a 17 19 07 0e 0c 08 07 |.......f........|
00001960: 09 0d 0b 11 04 1b 0c 07 0a 11 04 1b 0f 17 0d 16 |................|
00001970: 02 39 0a 48 14 11 04 1b 12 0c 01 21 33 07 0e 07 |.9.H.......!3...|
00001980: 0a 07 0b 0d 0b 07 0e 11 0e 3e 5c 34 6b 0d 0b 07 |.........>\4k...|
00001990: 0e 16 0e 07 10 11 04 1b 23 00 0c 43 06 01 e2 03 |........#..C....|
000019a0: 00 02 00 06 01 01 3d 02 ec 05 00 00 00 a8 04 00 |......=.........|
000019b0: 01 00 cc 03 01 0c 26 00 00 cb b7 cc c8 ba a5 ec |......&.........|
000019c0: 18 c7 c8 68 00 00 43 77 01 00 00 c2 00 c0 e8 03 |...h..Cw........|
000019d0: 24 02 00 4b 95 01 ee e5 b7 cc c8 ba a5 ec 14 68 |$..K...........h|
000019e0: 00 00 43 78 01 00 00 c7 c8 48 24 01 00 0e 95 01 |..Cx.....H$.....|
000019f0: ee e9 29 c8 03 2b d4 01 00 05 08 17 0a 0c 0e 0c |..)..+..........|
00001a00: 04 12 13 07 06 07 0a 11 04 34 16 15 09 18 1d 0c |.........4......|
00001a10: 0e 0c 04 12 13 11 04 1b 1c 07 06 07 01 07 05 15 |................|
00001a20: 02 00 0c 43 06 01 00 00 00 00 00 00 00 01 00 29 |...C...........)|
00001a30: c8 03 03 d9 01 1e 00 0c 43 06 01 e4 03 00 00 00 |........C.......|
00001a40: 01 01 01 04 00 ca 03 00 0c c2 00 f0 29 c8 03 09 |............)...|
00001a50: df 01 00 03 08 00 02 12 04 00 0c 62 06 01 f2 05 |...........b....|
00001a60: 00 03 00 03 01 02 3f 03 ee 04 01 00 60 d6 01 01 |......?.....`...|
00001a70: 01 20 f4 05 01 02 30 ca 03 00 0c 63 02 00 63 01 |. ....0....c..c.|
00001a80: 00 63 00 00 0b cb c2 00 4f 6b 00 00 00 cc 39 c7 |.c......Ok....9.|
00001a90: 00 00 00 43 82 00 00 00 24 00 00 43 81 00 00 00 |...C....$..C....|
00001aa0: 64 01 00 24 01 00 0e 39 c7 00 00 00 11 c2 01 21 |d..$...9.......!|
00001ab0: 01 00 cd 64 02 00 8d 0e 06 2f c8 03 17 e0 01 05 |...d...../......|
00001ac0: 00 13 0c 06 1b 0e 1b 10 11 04 1b 0c 11 01 17 0f |................|
00001ad0: 2a 0e 17 1d 00 0c 42 06 01 00 00 00 00 02 02 00 |*.....B.........|
00001ae0: 10 00 ee 04 00 09 ca 03 00 0c 68 00 00 0e 68 01 |..........h...h.|
00001af0: 00 43 7b 01 00 00 24 00 00 29 c8 03 0b e2 01 13 |.C{...$..)......|
00001b00: 03 0d 17 00 11 06 1b 06 00 0c 42 06 01 00 00 00 |..........B.....|
00001b10: 00 00 00 00 01 00 29 c8 03 03 e7 01 1e 00 0c 43 |......)........C|
00001b20: 06 01 e6 03 00 04 00 04 02 04 60 04 f8 05 00 00 |..........`.....|
00001b30: 40 fa 05 00 01 00 fc 05 00 02 00 fe 05 00 03 00 |@...............|
00001b40: d0 03 02 00 cc 03 01 0c b7 cb 39 c7 00 00 00 43 |..........9....C|
00001b50: 83 00 00 00 24 00 00 cc 39 c7 00 00 00 43 83 00 |....$...9....C..|
00001b60: 00 00 24 00 00 cd 39 c7 00 00 00 43 82 00 00 00 |..$...9....C....|
00001b70: 24 00 00 ce c8 43 19 00 00 00 c2 00 24 01 00 0e |$....C......$...|
00001b80: c9 43 19 00 00 00 c2 01 24 01 00 0e ca 43 81 00 |.C......$....C..|
00001b90: 00 00 c2 02 24 01 00 0e 68 01 00 43 77 01 00 00 |....$...h..Cw...|
00001ba0: c2 03 bf 0a 24 02 00 29 c8 03 2d ee 01 00 0f 12 |....$..)..-.....|
00001bb0: 1b 0e 1b 0e 17 1b 1b 0e 1b 0e 17 1b 1b 0e 1b 10 |................|
00001bc0: 17 27 07 04 25 0c 17 0f 07 04 25 0c 17 0f 07 04 |.'..%.....%.....|
00001bd0: 25 0a 17 0d 11 04 2f 16 00 0c 42 06 01 00 00 00 |%...../...B.....|
00001be0: 00 02 01 00 04 00 f8 05 00 01 df 93 e3 28 c8 03 |.............(..|
00001bf0: 07 f4 01 0d 02 0c 07 0e 00 0c 42 06 01 00 00 00 |..........B.....|
00001c00: 00 02 01 00 04 00 f8 05 00 01 df 93 e3 28 c8 03 |.............(..|
00001c10: 07 f5 01 0d 02 0c 07 0e 00 0c 42 06 01 00 00 00 |..........B.....|
00001c20: 00 02 01 00 04 00 f8 05 00 01 df 93 e3 28 c8 03 |.............(..|
00001c30: 07 f6 01 0c 02 0c 07 0e 00 0c 42 06 01 00 00 00 |..........B.....|
00001c40: 00 03 02 00 05 00 d0 03 00 00 f8 05 00 01 df e0 |................|
00001c50: ba f2 29 c8 03 09 f7 01 12 02 10 07 0e 0c 01 00 |..).............|
```