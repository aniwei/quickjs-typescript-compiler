# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/test_loop.ts
**生成时间**: 2026-01-06T17:03:07.468Z

## 大小对比

- TypeScript编译器: 4650 字节
- WASM编译器: 4645 字节
- 差异: 5 字节 (0.11%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 67,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_while",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "test_while_break",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_do_while",
      "offset": 39
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "test_for",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_for_in",
      "offset": 62
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_for_in2",
      "offset": 74
    },
    {
      "index": 8,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "test_for_in_proxy",
      "offset": 87
    },
    {
      "index": 9,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_for_break",
      "offset": 105
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_switch1",
      "offset": 120
    },
    {
      "index": 11,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_switch2",
      "offset": 133
    },
    {
      "index": 12,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch1",
      "offset": 146
    },
    {
      "index": 13,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch2",
      "offset": 162
    },
    {
      "index": 14,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch3",
      "offset": 178
    },
    {
      "index": 15,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch4",
      "offset": 194
    },
    {
      "index": 16,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch5",
      "offset": 210
    },
    {
      "index": 17,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch6",
      "offset": 226
    },
    {
      "index": 18,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch7",
      "offset": 242
    },
    {
      "index": 19,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch8",
      "offset": 258
    },
    {
      "index": 20,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_cyclic_labels",
      "offset": 274
    },
    {
      "index": 21,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 293
    },
    {
      "index": 22,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 306
    },
    {
      "index": 23,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_loop.js",
      "offset": 321
    },
    {
      "index": 24,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 361
    },
    {
      "index": 25,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 368
    },
    {
      "index": 26,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 377
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 401
    },
    {
      "index": 28,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 403
    },
    {
      "index": 29,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 416
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 419
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 421
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 423
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 425
    },
    {
      "index": 34,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 427
    },
    {
      "index": 35,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 431
    },
    {
      "index": 36,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 433
    },
    {
      "index": 37,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 435
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 437
    },
    {
      "index": 39,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 439
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 441
    },
    {
      "index": 41,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,y",
      "offset": 446
    },
    {
      "index": 42,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "for_in",
      "offset": 450
    },
    {
      "index": 43,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1,x,y,4",
      "offset": 457
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "1,y",
      "offset": 465
    },
    {
      "index": 45,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "0,1,2,3,4,5,6,7,8,9",
      "offset": 469
    },
    {
      "index": 46,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 489
    },
    {
      "index": 47,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,z",
      "offset": 491
    },
    {
      "index": 48,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "removed_key",
      "offset": 495
    },
    {
      "index": 49,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 507
    },
    {
      "index": 50,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 511
    },
    {
      "index": 51,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 513
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " a c",
      "offset": 515
    },
    {
      "index": 53,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 520
    },
    {
      "index": 54,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 524
    },
    {
      "index": 55,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "?",
      "offset": 526
    },
    {
      "index": 56,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abc",
      "offset": 528
    },
    {
      "index": 57,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ab3",
      "offset": 532
    },
    {
      "index": 58,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 536
    },
    {
      "index": 59,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 542
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 544
    },
    {
      "index": 61,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "tf",
      "offset": 546
    },
    {
      "index": 62,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tcf",
      "offset": 549
    },
    {
      "index": 63,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "catch6",
      "offset": 553
    },
    {
      "index": 64,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 560
    },
    {
      "index": 65,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tfag",
      "offset": 562
    },
    {
      "index": 66,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "xafyaf",
      "offset": 567
    }
  ],
  "functionHeader": {
    "offset": 574,
    "tag": "0xc",
    "remaining": 4076
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 67,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_while",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "test_while_break",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_do_while",
      "offset": 39
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "test_for",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_for_in",
      "offset": 62
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_for_in2",
      "offset": 74
    },
    {
      "index": 8,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "test_for_in_proxy",
      "offset": 87
    },
    {
      "index": 9,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_for_break",
      "offset": 105
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_switch1",
      "offset": 120
    },
    {
      "index": 11,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_switch2",
      "offset": 133
    },
    {
      "index": 12,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch1",
      "offset": 146
    },
    {
      "index": 13,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch2",
      "offset": 162
    },
    {
      "index": 14,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch3",
      "offset": 178
    },
    {
      "index": 15,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch4",
      "offset": 194
    },
    {
      "index": 16,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch5",
      "offset": 210
    },
    {
      "index": 17,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch6",
      "offset": 226
    },
    {
      "index": 18,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch7",
      "offset": 242
    },
    {
      "index": 19,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch8",
      "offset": 258
    },
    {
      "index": 20,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_cyclic_labels",
      "offset": 274
    },
    {
      "index": 21,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 293
    },
    {
      "index": 22,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 306
    },
    {
      "index": 23,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_loop.js",
      "offset": 321
    },
    {
      "index": 24,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 361
    },
    {
      "index": 25,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 368
    },
    {
      "index": 26,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 377
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 401
    },
    {
      "index": 28,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 403
    },
    {
      "index": 29,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 416
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 419
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 421
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 423
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 425
    },
    {
      "index": 34,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 427
    },
    {
      "index": 35,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 431
    },
    {
      "index": 36,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 433
    },
    {
      "index": 37,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 435
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 437
    },
    {
      "index": 39,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 439
    },
    {
      "index": 40,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 441
    },
    {
      "index": 41,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,y",
      "offset": 446
    },
    {
      "index": 42,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "for_in",
      "offset": 450
    },
    {
      "index": 43,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1,x,y,4",
      "offset": 457
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "1,y",
      "offset": 465
    },
    {
      "index": 45,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "0,1,2,3,4,5,6,7,8,9",
      "offset": 469
    },
    {
      "index": 46,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 489
    },
    {
      "index": 47,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,z",
      "offset": 491
    },
    {
      "index": 48,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "removed_key",
      "offset": 495
    },
    {
      "index": 49,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 507
    },
    {
      "index": 50,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 511
    },
    {
      "index": 51,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 513
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " a c",
      "offset": 515
    },
    {
      "index": 53,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 520
    },
    {
      "index": 54,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 524
    },
    {
      "index": 55,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "?",
      "offset": 526
    },
    {
      "index": 56,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abc",
      "offset": 528
    },
    {
      "index": 57,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ab3",
      "offset": 532
    },
    {
      "index": 58,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 536
    },
    {
      "index": 59,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 542
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 544
    },
    {
      "index": 61,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "tf",
      "offset": 546
    },
    {
      "index": 62,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tcf",
      "offset": 549
    },
    {
      "index": 63,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "catch6",
      "offset": 553
    },
    {
      "index": 64,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 560
    },
    {
      "index": 65,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tfag",
      "offset": 562
    },
    {
      "index": 66,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "xafyaf",
      "offset": 567
    }
  ],
  "functionHeader": {
    "offset": 574,
    "tag": "0xc",
    "remaining": 4071
  }
}
```

## 字节级差异

共发现 460 个字节差异:

- 偏移量 0x1008: TS=0x3a vs WASM=0x38
- 偏移量 0x1026: TS=0x11 vs WASM=0x0f
- 偏移量 0x1035: TS=0xee vs WASM=0x39
- 偏移量 0x1036: TS=0xdb vs WASM=0xe5
- 偏移量 0x1037: TS=0x39 vs WASM=0x00
- 偏移量 0x1038: TS=0xe5 vs WASM=0x00
- 偏移量 0x103a: TS=0x00 vs WASM=0xc7
- 偏移量 0x103b: TS=0x00 vs WASM=0x04
- 偏移量 0x103c: TS=0xc7 vs WASM=0x21
- 偏移量 0x103d: TS=0x04 vs WASM=0x01
- 偏移量 0x103e: TS=0x21 vs WASM=0x00
- 偏移量 0x103f: TS=0x01 vs WASM=0x00
- 偏移量 0x1040: TS=0x00 vs WASM=0x04
- 偏移量 0x1041: TS=0x00 vs WASM=0x19
- 偏移量 0x1042: TS=0x04 vs WASM=0x00
- 偏移量 0x1043: TS=0x19 vs WASM=0x00
- 偏移量 0x1045: TS=0x00 vs WASM=0xf3
- 偏移量 0x1046: TS=0x00 vs WASM=0x29
- 偏移量 0x1047: TS=0xf3 vs WASM=0xf6
- 偏移量 0x1048: TS=0x29 vs WASM=0x03
- ... (显示前20个差异，总共460个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 43 02 65 0c 61 73 73 65 72 74 14 74 65 73 74 |.C.e.assert.test|
00000010: 5f 77 68 69 6c 65 20 74 65 73 74 5f 77 68 69 6c |_while test_whil|
00000020: 65 5f 62 72 65 61 6b 1a 74 65 73 74 5f 64 6f 5f |e_break.test_do_|
00000030: 77 68 69 6c 65 10 74 65 73 74 5f 66 6f 72 16 74 |while.test_for.t|
00000040: 65 73 74 5f 66 6f 72 5f 69 6e 18 74 65 73 74 5f |est_for_in.test_|
00000050: 66 6f 72 5f 69 6e 32 22 74 65 73 74 5f 66 6f 72 |for_in2"test_for|
00000060: 5f 69 6e 5f 70 72 6f 78 79 1c 74 65 73 74 5f 66 |_in_proxy.test_f|
00000070: 6f 72 5f 62 72 65 61 6b 18 74 65 73 74 5f 73 77 |or_break.test_sw|
00000080: 69 74 63 68 31 18 74 65 73 74 5f 73 77 69 74 63 |itch1.test_switc|
00000090: 68 32 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h2.test_try_catc|
000000a0: 68 31 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h1.test_try_catc|
000000b0: 68 32 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h2.test_try_catc|
000000c0: 68 33 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h3.test_try_catc|
000000d0: 68 34 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h4.test_try_catc|
000000e0: 68 35 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h5.test_try_catc|
000000f0: 68 36 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h6.test_try_catc|
00000100: 68 37 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h7.test_try_catc|
00000110: 68 38 24 74 65 73 74 5f 63 79 63 6c 69 63 5f 6c |h8$test_cyclic_l|
00000120: 61 62 65 6c 73 18 5f 5f 6c 6f 61 64 53 63 72 69 |abels.__loadScri|
00000130: 70 74 1c 74 65 73 74 5f 61 73 73 65 72 74 2e 6a |pt.test_assert.j|
00000140: 73 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |sN__tests__/fixt|
00000150: 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 73 |ures_quickjs/tes|
00000160: 74 5f 6c 6f 6f 70 2e 6a 73 0c 61 63 74 75 61 6c |t_loop.js.actual|
00000170: 10 65 78 70 65 63 74 65 64 2e 61 73 73 65 72 74 |.expected.assert|
00000180: 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 |ion failed: got |
00000190: 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c ||.|., expected ||
000001a0: 04 20 28 02 29 02 69 02 63 02 6a 06 74 61 62 02 |. (.).i.c.j.tab.|
000001b0: 61 02 62 02 6b 02 78 02 79 08 70 75 73 68 06 78 |a.b.k.x.y.push.x|
000001c0: 2c 79 0c 66 6f 72 5f 69 6e 0e 31 2c 78 2c 79 2c |,y.for_in.1,x,y,|
000001d0: 34 06 31 2c 79 26 30 2c 31 2c 32 2c 33 2c 34 2c |4.1,y&0,1,2,3,4,|
000001e0: 35 2c 36 2c 37 2c 38 2c 39 02 7a 06 78 2c 7a 16 |5,6,7,8,9.z.x,z.|
000001f0: 72 65 6d 6f 76 65 64 5f 6b 65 79 06 73 74 72 02 |removed_key.str.|
00000200: 6f 02 20 08 20 61 20 63 06 6b 65 79 02 73 02 3f |o. . a c.key.s.?|
00000210: 06 61 62 63 06 61 62 33 0a 68 65 6c 6c 6f 02 74 |.abc.ab3.hello.t|
00000220: 02 66 04 74 66 06 74 63 66 0c 63 61 74 63 68 36 |.f.tf.tcf.catch6|
00000230: 02 67 08 74 66 61 67 0c 78 61 66 79 61 66 0c 00 |.g.tfag.xafyaf..|
00000240: 06 00 a4 01 00 02 00 03 00 14 b7 03 02 a6 01 00 |................|
00000250: 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 00 |.......@....@@..|
00000260: 00 00 40 40 e7 00 00 00 40 40 e8 00 00 00 40 40 |..@@....@@....@@|
00000270: e9 00 00 00 40 40 ea 00 00 00 40 40 eb 00 00 00 |....@@....@@....|
00000280: 40 40 ec 00 00 00 40 40 ed 00 00 00 40 40 ee 00 |@@....@@....@@..|
00000290: 00 00 40 40 ef 00 00 00 40 40 f0 00 00 00 40 40 |..@@....@@....@@|
000002a0: f1 00 00 00 40 40 f2 00 00 00 40 40 f3 00 00 00 |....@@....@@....|
000002b0: 40 40 f4 00 00 00 40 40 f5 00 00 00 40 40 f6 00 |@@....@@....@@..|
000002c0: 00 00 40 40 f7 00 00 00 40 40 f8 00 00 00 40 c2 |..@@....@@....@.|
000002d0: 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 c2 |.A.......A......|
000002e0: 02 41 e7 00 00 00 00 c2 03 41 e8 00 00 00 00 c2 |.A.......A......|
000002f0: 04 41 e9 00 00 00 00 c2 05 41 ea 00 00 00 00 c2 |.A.......A......|
00000300: 06 41 eb 00 00 00 00 c2 07 41 ec 00 00 00 00 c2 |.A.......A......|
00000310: 08 41 ed 00 00 00 00 c2 09 41 ee 00 00 00 00 c2 |.A.......A......|
00000320: 0a 41 ef 00 00 00 00 c2 0b 41 f0 00 00 00 00 c2 |.A.......A......|
00000330: 0c 41 f1 00 00 00 00 c2 0d 41 f2 00 00 00 00 c2 |.A.......A......|
00000340: 0e 41 f3 00 00 00 00 c2 0f 41 f4 00 00 00 00 c2 |.A.......A......|
00000350: 10 41 f5 00 00 00 00 c2 11 41 f6 00 00 00 00 c2 |.A.......A......|
00000360: 12 41 f7 00 00 00 00 c2 13 41 f8 00 00 00 00 06 |.A.......A......|
00000370: cb 6f 13 00 00 00 39 f9 00 00 00 04 fa 00 00 00 |.o....9.........|
00000380: f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 39 |......o.......09|
00000390: e6 00 00 00 f0 cb 39 e7 00 00 00 f0 cb 39 e8 00 |......9......9..|
000003a0: 00 00 f0 cb 39 e9 00 00 00 f0 cb 39 ed 00 00 00 |....9......9....|
000003b0: f0 cb 39 ee 00 00 00 f0 cb 39 ef 00 00 00 f0 cb |..9......9......|
000003c0: 39 ea 00 00 00 f0 cb 39 eb 00 00 00 f0 cb 39 ec |9......9......9.|
000003d0: 00 00 00 f0 cb 39 f0 00 00 00 f0 cb 39 f1 00 00 |.....9......9...|
000003e0: 00 f0 cb 39 f2 00 00 00 f0 cb 39 f3 00 00 00 f0 |...9......9.....|
000003f0: cb 39 f4 00 00 00 f0 cb 39 f5 00 00 00 f0 cb 39 |.9......9......9|
00000400: f6 00 00 00 f0 cb 39 f7 00 00 00 f0 cf 28 f6 03 |......9......(..|
00000410: 54 00 00 00 9f 02 1e 08 34 18 00 0f 92 05 1f 1b |T.......4.......|
00000420: 14 0d 13 1b 20 0d 1f 1b 1a 0d 19 1b 10 0d 0f 1b |.... ...........|
00000430: 1c 0d 1b 1b 18 0d 17 1b 18 0d 17 1b 16 0d 15 1b |................|
00000440: 18 0d 17 1b 22 0d 21 1b 1e 0d 1d 1b 1e 0d 1d 1b |....".!.........|
00000450: 1e 0d 1d 1b 1e 0d 1d 1b 1e 0d 1d 1b 1e 0d 1d 1b |................|
00000460: 1e 0d 1d 1b 1e 00 0c 43 06 00 ca 03 03 01 03 04 |.......C........|
00000470: 00 00 79 04 f8 03 00 01 00 fa 03 00 01 00 68 00 |..y...........h.|
00000480: 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 ab ec 03 |................|
00000490: 0a d8 d3 d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b |.......).../...+|
000004a0: d3 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 |...K.....!...K..|
000004b0: 00 ab ec 17 d3 43 39 00 00 00 24 00 00 d4 43 39 |.....C9...$...C9|
000004c0: 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 |...$.....)9.....|
000004d0: fe 00 00 00 d3 9f 04 ff 00 00 00 9f 04 00 01 00 |................|
000004e0: 00 9f d4 9f 04 ff 00 00 00 9f d5 ec 10 04 01 01 |................|
000004f0: 00 00 d5 9f 04 02 01 00 00 9f ee 02 c3 9f f1 30 |...............0|
00000500: f6 03 50 00 00 12 10 07 12 0c 10 12 21 0d 00 07 |..P.........!...|
00000510: 16 07 07 12 0d 08 00 07 0e 11 18 07 12 12 23 07 |..............#.|
00000520: 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b |./,..0Y.........|
00000530: 12 11 29 12 29 08 04 34 44 07 03 20 12 20 0c 08 |..).)..4D.. . ..|
00000540: 3f 07 03 20 16 08 31 2a 22 07 03 20 14 15 0c 06 |?.. ..1*".. ....|
00000550: 31 07 15 00 0c 43 06 00 cc 03 00 02 00 03 00 00 |1....C..........|
00000560: 19 02 86 04 00 00 00 88 04 00 01 00 b7 cb b7 cc |................|
00000570: c7 ba a5 ec 07 95 01 95 00 ee f6 39 e5 00 00 00 |...........9....|
00000580: c8 ba ad f1 29 f6 03 16 13 00 04 08 0d 00 0d 0e |....)...........|
00000590: 0c 04 12 07 0d 00 18 09 1b 0e 0c 04 07 05 00 0c |................|
000005a0: 43 06 00 ce 03 00 02 00 03 00 00 25 02 86 04 00 |C..........%....|
000005b0: 00 00 88 04 00 01 00 b7 cb b7 cc c7 ba a5 ec 0c |................|
000005c0: 95 01 c7 b8 ab ed 05 95 00 ee f1 39 e5 00 00 00 |...........9....|
000005d0: c8 b9 ad 11 ec 05 0e c7 b8 ad f1 29 f6 03 1e 1d |...........)....|
000005e0: 00 04 08 0d 00 0d 0e 0c 04 12 07 0d 06 0c 04 13 |................|
000005f0: 09 18 09 1b 0e 0c 04 1b 12 0c 04 07 1b 00 0c 43 |...............C|
00000600: 06 00 d0 03 00 02 00 03 00 00 1e 02 86 04 00 00 |................|
00000610: 00 88 04 00 01 00 b7 cb b7 cc 95 01 95 00 c7 ba |................|
00000620: a5 ed f8 39 e5 00 00 00 c8 ba ad 11 ec 05 0e c7 |...9............|
00000630: ba ad f1 29 f6 03 1a 29 00 04 08 0d 00 0e 0a 0d |...)...)........|
00000640: 00 0d 08 0c 04 12 15 1b 0e 0c 04 1b 12 0c 04 07 |................|
00000650: 1b 00 0c 43 06 00 d2 03 00 03 00 03 00 00 40 03 |...C..........@.|
00000660: 86 04 00 00 00 88 04 00 01 00 8a 04 00 02 00 b7 |................|
00000670: cc b7 cb c7 ba a5 ec 07 95 01 95 00 ee f6 39 e5 |..............9.|
00000680: 00 00 00 c8 ba ad 11 ec 05 0e c7 ba ad f1 0e b7 |................|
00000690: cc b7 cd c9 ba a5 ec 07 95 01 95 02 ee f6 39 e5 |..............9.|
000006a0: 00 00 00 c8 ba ad 11 ec 05 0e c9 ba ad f1 29 f6 |..............).|
000006b0: 03 30 33 00 04 08 0d 0a 0c 0e 0c 04 12 11 0b 1e |.03.............|
000006c0: 19 27 1b 0e 0c 04 1b 12 0c 04 07 1b 0d 0b 17 20 |.'............. |
000006d0: 0c 04 12 19 0b 26 19 2f 1b 0e 0c 04 1b 12 0c 04 |.....&./........|
000006e0: 07 1b 00 0c 43 06 00 d4 03 00 06 00 06 00 00 80 |....C...........|
000006f0: 05 06 86 04 00 00 00 8c 04 00 01 00 8e 04 00 02 |................|
00000700: 00 90 04 00 03 00 8a 04 00 04 00 92 04 00 05 00 |................|
00000710: 26 00 00 cc 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 |&.....N.....N...|
00000720: 00 7e ee 0d cb c8 43 0c 01 00 00 c7 24 01 00 0e |.~....C.....$...|
00000730: 81 ec f2 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 |.....9.....C9...|
00000740: 24 00 00 04 0d 01 00 00 04 0e 01 00 00 f3 0e 0b |$...............|
00000750: b9 4e 0a 01 00 00 b9 4e 0b 01 00 00 ba 4e 01 00 |.N.....N.....N..|
00000760: 00 80 cd 0b ba 4e 04 00 00 80 ce 39 9d 00 00 00 |.....N.....9....|
00000770: 43 62 00 00 00 c9 ca 24 02 00 0e 26 00 00 cc c9 |Cb.....$...&....|
00000780: 7e ee 0d cb c8 43 0c 01 00 00 c7 24 01 00 0e 81 |~....C.....$....|
00000790: ec f2 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 |....9.....C9...$|
000007a0: 00 00 04 0f 01 00 00 04 0e 01 00 00 f3 0e 0b b9 |................|
000007b0: 4e 0b 01 00 00 ba 4e 01 00 00 80 cd 39 9d 00 00 |N.....N.....9...|
000007c0: 00 43 67 00 00 00 c9 04 0a 01 00 00 0b b8 4e 42 |.Cg...........NB|
000007d0: 00 00 00 24 03 00 0e 0b ba 4e 0a 01 00 00 ce 39 |...$.....N.....9|
000007e0: 9d 00 00 00 43 62 00 00 00 c9 ca 24 02 00 0e 26 |....Cb.....$...&|
000007f0: 00 00 cc c9 7e ee 0d cb c8 43 0c 01 00 00 c7 24 |....~....C.....$|
00000800: 01 00 0e 81 ec f2 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
00000810: 00 00 00 24 00 00 04 10 01 00 00 04 0e 01 00 00 |...$............|
00000820: f3 0e 26 00 00 cd b7 cb c7 bf 0a a5 ec 10 c9 43 |..&............C|
00000830: 0c 01 00 00 c7 24 01 00 0e 95 00 ee ec 26 00 00 |.....$.......&..|
00000840: cc c9 7e ee 0d cb c8 43 0c 01 00 00 c7 24 01 00 |..~....C.....$..|
00000850: 0e 81 ec f2 0e 0e 39 e5 00 00 00 c8 43 39 00 00 |......9.....C9..|
00000860: 00 24 00 00 04 11 01 00 00 04 0e 01 00 00 f3 0e |.$..............|
00000870: 0b b7 4e 0a 01 00 00 cd 26 00 00 cc 0b b8 4e 0a |..N.....&.....N.|
00000880: 01 00 00 b9 4e 0b 01 00 00 7e ee 18 c9 1b 44 0a |....N....~....D.|
00000890: 01 00 00 c8 43 0c 01 00 00 c9 42 0a 01 00 00 24 |....C.....B....$|
000008a0: 01 00 0e 81 ec e7 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
000008b0: 00 00 00 24 00 00 04 0d 01 00 00 04 0e 01 00 00 |...$............|
000008c0: f3 0e b7 26 01 00 cd 26 00 00 cc 0b b8 4e 0a 01 |...&...&.....N..|
000008d0: 00 00 b9 4e 0b 01 00 00 7e ee 12 c9 b7 1d 4b c8 |...N....~.....K.|
000008e0: 43 0c 01 00 00 c9 b7 48 24 01 00 0e 81 ec ed 0e |C......H$.......|
000008f0: 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 04 |.9.....C9...$...|
00000900: 0d 01 00 00 04 0e 01 00 00 f3 0e 26 00 00 cc 0b |...........&....|
00000910: b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 7e ee 0f c5 |.N.....N....~...|
00000920: 04 c8 43 0c 01 00 00 c4 04 24 01 00 0e 81 ec f0 |..C......$......|
00000930: 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 |..9.....C9...$..|
00000940: 04 0d 01 00 00 04 0e 01 00 00 f3 0e 26 00 00 cc |............&...|
00000950: b9 c5 05 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 |.....N.....N....|
00000960: 7e ee 0f c5 05 c8 43 0c 01 00 00 c4 05 24 01 00 |~.....C......$..|
00000970: 0e 81 ec f0 0e 0e 39 e5 00 00 00 c8 43 39 00 00 |......9.....C9..|
00000980: 00 24 00 00 04 0d 01 00 00 04 0e 01 00 00 f3 29 |.$.............)|
00000990: f6 03 f6 01 40 00 04 08 67 0a 08 01 07 06 1b 0c |....@...g.......|
000009a0: 07 01 31 17 1b 0e 07 06 1b 12 43 19 0e 0b 67 00 |..1.......C...g.|
000009b0: 2b 00 1b 0c 1b 20 07 06 07 07 17 29 17 14 16 09 |+.... .....)....|
000009c0: 08 01 07 06 1b 0c 07 01 31 17 1b 0e 07 06 1b 12 |........1.......|
000009d0: 43 19 0f 0b 49 00 1b 0c 1b 20 43 01 17 29 2b 00 |C...I.... C..)+.|
000009e0: 1b 0c 1b 20 07 06 07 07 17 29 17 14 16 09 08 01 |... .....)......|
000009f0: 07 06 1b 0c 07 01 31 17 1b 0e 07 06 1b 12 43 19 |......1.......C.|
00000a00: 0e 0b 17 0a 0c 0e 11 04 12 13 07 02 1b 0c 07 01 |................|
00000a10: 15 16 18 29 17 14 16 09 08 01 07 06 1b 0c 07 01 |...)............|
00000a20: 31 17 1b 0e 07 06 1b 12 43 19 0e 0b 2b 00 67 0a |1.......C...+.g.|
00000a30: 07 02 21 03 07 06 1b 0c 07 02 1b 03 31 17 1b 0e |..!.........1...|
00000a40: 07 06 1b 12 43 19 0e 0b 1c 00 67 0a 0c 02 0d 03 |....C.....g.....|
00000a50: 07 06 1b 0c 0c 02 07 03 31 17 1b 0e 07 06 1b 12 |........1.......|
00000a60: 43 19 0e 0b 72 08 07 06 1b 0c 0c 01 31 17 1b 0e |C...r.......1...|
00000a70: 07 06 1b 12 43 19 0e 0b 81 08 07 06 1b 0c 0c 01 |....C...........|
00000a80: 31 17 1b 0e 07 06 1b 12 43 19 00 0c 43 06 00 d6 |1.......C...C...|
00000a90: 03 00 02 00 04 00 00 94 01 02 86 04 00 00 00 8c |................|
00000aa0: 04 00 01 00 26 00 00 cc 0b b8 4e 0a 01 00 00 b9 |....&.....N.....|
00000ab0: 4e 0b 01 00 00 ba 4e 12 01 00 00 7e ee 16 cb c7 |N.....N....~....|
00000ac0: 04 0b 01 00 00 ad ed 0c c8 43 0c 01 00 00 c7 24 |.........C.....$|
00000ad0: 01 00 0e 81 ec e9 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
00000ae0: 00 00 00 24 00 00 04 13 01 00 00 ab f1 0e 26 00 |...$..........&.|
00000af0: 00 cc 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 ba |....N.....N.....|
00000b00: 4e 12 01 00 00 7e ee 16 cb c7 04 12 01 00 00 ad |N....~..........|
00000b10: ed 10 c8 43 0c 01 00 00 c7 24 01 00 0e 81 ec e9 |...C.....$......|
00000b20: 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 |..9.....C9...$..|
00000b30: 04 0d 01 00 00 ab f1 29 f6 03 3a 7f 00 04 08 85 |.......)..:.....|
00000b40: 0a 08 06 20 04 13 0b 07 06 1b 0c 07 01 31 17 1b |... .........1..|
00000b50: 0e 07 06 1b 12 2a 06 07 1f 0d 0b 85 0a 08 06 20 |.....*......... |
00000b60: 04 13 0b 07 06 1b 0c 07 01 31 17 1b 0e 07 06 1b |.........1......|
00000b70: 12 2a 06 07 1f 00 0c 43 06 00 d8 03 00 05 00 05 |.*.....C........|
00000b80: 00 02 7f 05 a8 04 01 00 60 b0 01 01 01 20 8a 02 |........`.... ..|
00000b90: 01 02 20 aa 04 01 03 20 ac 04 02 04 20 63 03 00 |.. .... .... c..|
00000ba0: 63 02 00 63 01 00 63 00 00 c3 cb 0b cc 39 c6 00 |c..c..c......9..|
00000bb0: 00 00 11 64 01 00 0b c2 00 4f 69 00 00 00 4e 69 |...d.....Oi...Ni|
00000bc0: 00 00 00 c2 01 4f 68 00 00 00 4e 68 00 00 00 21 |.....Oh...Nh...!|
00000bd0: 02 00 cd c3 ce 63 04 00 64 02 00 7e ee 2a c5 04 |.....c..d..~.*..|
00000be0: 64 03 00 04 17 01 00 00 64 04 00 9f 9f 11 65 03 |d.......d.....e.|
00000bf0: 00 0e 64 04 00 04 07 01 00 00 ab ec 0b 04 08 01 |..d.............|
00000c00: 00 00 11 65 00 00 0e 81 ec d5 0e 0e 39 e5 00 00 |...e........9...|
00000c10: 00 64 03 00 04 18 01 00 00 ab f1 29 f6 03 23 90 |.d.........)..#.|
00000c20: 01 00 55 28 20 0c 8e 01 00 09 18 0d 2b 13 2a 1a |..U( .......+.*.|
00000c30: 11 03 07 0d 21 00 2a 04 12 03 4f 0f 1b 0e 2a 08 |....!.*...O...*.|
00000c40: 07 09 00 0c 43 06 00 00 00 00 00 03 00 00 13 00 |....C...........|
00000c50: 04 07 01 00 00 04 08 01 00 00 04 04 01 00 00 26 |...............&|
00000c60: 03 00 28 f6 03 05 94 01 11 5d 09 00 0c 43 06 00 |..(......]...C..|
00000c70: 00 02 01 02 03 01 00 2c 03 b0 01 00 01 00 b2 04 |.......,........|
00000c80: 00 01 00 10 00 01 00 a8 04 00 09 08 cb 68 00 00 |.............h..|
00000c90: c3 ac ec 0e d4 68 00 00 ab ec 07 39 47 00 00 00 |.....h.....9G...|
00000ca0: 28 0b 0a 4e 41 00 00 00 0a 4e 3f 00 00 00 c7 d4 |(..NA....N?.....|
00000cb0: 48 4e 42 00 00 00 28 f6 03 17 97 01 22 0d 23 16 |HNB...(.....".#.|
00000cc0: 18 11 12 07 0e 11 05 12 23 1b 0d 4f 76 07 01 20 |........#..Ov.. |
00000cd0: 73 00 0c 43 06 00 da 03 00 02 00 03 00 00 27 02 |s..C..........'.|
00000ce0: 86 04 00 00 00 88 04 00 01 00 b7 cc b7 cb c7 ba |................|
00000cf0: a5 ec 0e 95 01 c7 b7 ab ed 03 ee 05 95 00 ee ef |................|
00000d00: 39 e5 00 00 00 c8 b9 ad 11 ec 05 0e c7 b8 ad f1 |9...............|
00000d10: 29 f6 03 23 a6 01 00 04 08 0d 12 0c 0e 0c 04 12 |)..#............|
00000d20: 19 0d 06 0c 04 00 05 03 1c 00 04 10 2f 1b 0e 0c |............/...|
00000d30: 04 1b 12 0c 04 07 1b 00 0c 43 06 00 dc 03 00 03 |.........C......|
00000d40: 00 03 00 00 4d 03 86 04 00 00 00 8e 04 00 01 00 |....M...........|
00000d50: b4 04 00 02 00 c3 cd b7 cb c7 ba a5 ec 30 04 1b |.............0..|
00000d60: 01 00 00 cc c7 11 b7 ad ec 09 04 07 01 00 00 cc |................|
00000d70: ee 14 11 b8 ad ec 09 04 08 01 00 00 cc ee 07 04 |................|
00000d80: 04 01 00 00 cc 0e c8 96 02 95 00 ee cd 39 e5 00 |.............9..|
00000d90: 00 00 c9 04 1c 01 00 00 ad 11 ec 05 0e c7 ba ad |................|
00000da0: f1 29 f6 03 29 b3 01 00 04 08 0d 0a 0c 0e 0c 04 |.)..)...........|
00000db0: 12 13 21 10 22 00 46 00 2d 00 28 0b 00 03 19 1c |..!.".F.-.(.....|
00000dc0: 00 04 1e 27 1b 0e 20 04 1b 1a 0c 04 07 23 00 0c |...'.. ......#..|
00000dd0: 43 06 00 de 03 00 03 00 03 00 00 53 03 86 04 00 |C..........S....|
00000de0: 00 00 8e 04 00 01 00 b4 04 00 02 00 c3 cd b7 cb |................|
00000df0: c7 bb a5 ec 36 04 1b 01 00 00 cc c7 11 b7 ad ec |....6...........|
00000e00: 09 04 07 01 00 00 cc ee 1a 11 b8 ad ec 09 04 08 |................|
00000e10: 01 00 00 cc ee 0d 11 b9 ad ec 04 0e ee 09 c3 c7 |................|
00000e20: 9f cc 0e c8 96 02 95 00 ee c7 39 e5 00 00 00 c9 |..........9.....|
00000e30: 04 1d 01 00 00 ad 11 ec 05 0e c7 bb ad f1 29 f6 |..............).|
00000e40: 03 2f c7 01 00 04 08 0d 0a 0c 0e 0c 04 12 13 21 |./.............!|
00000e50: 10 22 00 46 00 00 10 0a 00 07 12 07 03 14 19 00 |.".F............|
00000e60: 03 1d 1c 00 04 22 27 1b 0e 20 04 1b 1a 0c 04 07 |....."'.. ......|
00000e70: 23 00 0c 43 06 00 e0 03 00 01 00 05 00 00 27 01 |#..C..........'.|
00000e80: c8 03 03 00 03 6f 0a 00 00 00 04 1e 01 00 00 30 |.....o.........0|
00000e90: cb 6f 19 00 00 00 39 e5 00 00 00 c7 04 1e 01 00 |.o....9.........|
00000ea0: 00 04 19 00 00 00 f3 0e 06 72 28 30 f6 03 0d dd |.........r(0....|
00000eb0: 01 00 36 10 28 00 1b 0e 39 01 0d 0b 00 0c 43 06 |..6.(...9.....C.|
00000ec0: 00 e2 03 00 02 00 04 00 00 24 02 8e 04 00 00 00 |.........$......|
00000ed0: c8 03 03 00 03 6f 09 00 00 00 b8 cb 0e ee 0d cc |.....o..........|
00000ee0: 6f 09 00 00 00 b9 cb 0e ee 02 30 39 e5 00 00 00 |o.........09....|
00000ef0: c7 b8 04 19 00 00 00 f3 29 f6 03 0d e7 01 00 1e |........).......|
00000f00: 10 3c 00 22 07 1b 0e 25 01 00 0c 43 06 00 e4 03 |.<."...%...C....|
00000f10: 00 02 00 04 00 00 4f 02 b4 04 00 00 00 c8 03 03 |......O.........|
00000f20: 00 03 c3 cb 6f 15 00 00 00 04 1f 01 00 00 96 00 |....o...........|
00000f30: 0e 06 70 24 00 00 00 0e ee 26 cc 6f 15 00 00 00 |..p$.....&.o....|
00000f40: 04 04 01 00 00 96 00 0e 06 70 0d 00 00 00 0e ee |.........p......|
00000f50: 0f 70 05 00 00 00 30 04 20 01 00 00 96 00 71 39 |.p....0. .....q9|
00000f60: e5 00 00 00 c7 04 21 01 00 00 04 19 00 00 00 f3 |......!.........|
00000f70: 29 f6 03 11 f1 01 00 04 08 27 0c 78 00 78 00 2c |)........'.x.x.,|
00000f80: 0b 1b 0e 39 01 00 0c 43 06 00 e6 03 00 02 00 04 |...9...C........|
00000f90: 00 00 47 02 b4 04 00 00 00 c8 03 03 00 03 c3 cb |..G.............|
00000fa0: 6f 11 00 00 00 04 1f 01 00 00 96 00 04 04 01 00 |o...............|
00000fb0: 00 30 cc 6f 11 00 00 00 c8 96 00 0e 06 70 0d 00 |.0.o.........p..|
00000fc0: 00 00 0e ee 0f 70 05 00 00 00 30 04 20 01 00 00 |.....p....0. ...|
00000fd0: 96 00 71 39 e5 00 00 00 c7 04 22 01 00 00 04 19 |..q9......".....|
00000fe0: 00 00 00 f3 29 f6 03 13 ff 01 00 04 08 27 0c 3f |....)........'.?|
00000ff0: 03 28 04 64 00 2c 0b 1b 0e 39 01 00 0c 43 06 00 |.(.d.,...9...C..|
00001000: e8 03 00 01 00 04 00 00 3a 01 b4 04 00 00 00 c3 |........:.......|
00001010: cb 6f 15 00 00 00 04 1f 01 00 00 96 00 0e 06 70 |.o.............p|
00001020: 0d 00 00 00 0e ee 11 70 05 00 00 00 30 04 20 01 |.......p....0. .|
00001030: 00 00 96 00 71 ee db 39 e5 00 00 00 c7 04 21 01 |....q..9......!.|
00001040: 00 00 04 19 00 00 00 f3 29 f6 03 11 8e 02 00 04 |........).......|
00001050: 08 28 14 00 17 0a 00 37 13 1b 0e 39 01 00 0c 43 |.(.....7...9...C|
00001060: 06 00 ea 03 00 02 00 04 00 01 22 02 c0 04 00 00 |..........".....|
00001070: 00 b4 04 00 01 40 c2 00 cb c3 cc 39 e5 00 00 00 |.....@.....9....|
00001080: c7 f0 b8 ad f1 0e 39 e5 00 00 00 c8 04 21 01 00 |......9......!..|
00001090: 00 04 23 01 00 00 f3 29 f6 03 15 9d 02 00 00 05 |..#....)........|
000010a0: 16 08 1b 0e 07 02 0c 06 07 09 0d 0b 1b 0e 39 01 |..............9.|
000010b0: 00 0c 43 06 00 c0 04 00 00 00 04 01 00 24 00 b4 |..C..........$..|
000010c0: 04 01 01 6f 14 00 00 00 df 04 1f 01 00 00 9f e3 |...o............|
000010d0: b8 72 70 0b 00 00 00 28 70 05 00 00 00 30 df 04 |.rp....(p....0..|
000010e0: 20 01 00 00 9f e3 71 f6 03 0d 9e 02 04 1d 10 20 | .....q........ |
000010f0: 04 12 03 46 00 20 04 00 0c 43 06 00 ec 03 00 02 |...F. ...C......|
00001100: 00 04 00 00 5d 02 b4 04 00 00 00 c8 03 05 00 03 |....]...........|
00001110: c3 cb 6f 27 00 00 00 6f 11 00 00 00 04 1f 01 00 |..o'...o........|
00001120: 00 96 00 04 07 01 00 00 30 70 05 00 00 00 30 04 |........0p....0.|
00001130: 20 01 00 00 96 00 71 63 01 00 cc 6f 11 00 00 00 | .....qc...o....|
00001140: c8 96 00 0e 06 70 0d 00 00 00 0e ee 0f 70 05 00 |.....p.......p..|
00001150: 00 00 30 04 24 01 00 00 96 00 71 39 e5 00 00 00 |..0.$.....q9....|
00001160: c7 04 25 01 00 00 04 19 00 00 00 f3 29 f6 03 17 |..%.........)...|
00001170: ab 02 00 04 08 41 14 3f 03 28 04 00 11 08 07 64 |.....A.?.(.....d|
00001180: 00 2c 0b 1b 0e 39 01 00 0c 43 06 00 ee 03 00 03 |.,...9...C......|
00001190: 00 04 00 00 55 03 86 04 00 00 00 b4 04 00 01 00 |....U...........|
000011a0: c8 03 05 00 03 c3 cc 0b b8 4e 0a 01 00 00 b9 4e |.........N.....N|
000011b0: 0b 01 00 00 7e ee 31 cb 6f 0d 00 00 00 c7 96 01 |....~.1.o.......|
000011c0: 04 07 01 00 00 30 cd 6f 11 00 00 00 c9 96 01 0e |.....0.o........|
000011d0: 06 70 0d 00 00 00 0e ee 0f 70 05 00 00 00 30 04 |.p.......p....0.|
000011e0: 20 01 00 00 96 01 71 81 ec ce 0e 0e 39 e5 00 00 | .....q.....9...|
000011f0: 00 c8 04 26 01 00 00 ad f1 29 f6 03 15 bf 02 00 |...&.....)......|
00001200: 04 08 7d 14 2b 03 28 04 64 00 46 13 1b 0e 20 04 |..}.+.(.d.F... .|
00001210: 07 05 00 0c 43 06 00 f0 03 00 00 00 00 00 00 02 |....C...........|
00001220: 00 ee ff f6 03 03 d0 02 00 00                   |..........|
```

### WASM
```
00000000: 05 43 02 65 0c 61 73 73 65 72 74 14 74 65 73 74 |.C.e.assert.test|
00000010: 5f 77 68 69 6c 65 20 74 65 73 74 5f 77 68 69 6c |_while test_whil|
00000020: 65 5f 62 72 65 61 6b 1a 74 65 73 74 5f 64 6f 5f |e_break.test_do_|
00000030: 77 68 69 6c 65 10 74 65 73 74 5f 66 6f 72 16 74 |while.test_for.t|
00000040: 65 73 74 5f 66 6f 72 5f 69 6e 18 74 65 73 74 5f |est_for_in.test_|
00000050: 66 6f 72 5f 69 6e 32 22 74 65 73 74 5f 66 6f 72 |for_in2"test_for|
00000060: 5f 69 6e 5f 70 72 6f 78 79 1c 74 65 73 74 5f 66 |_in_proxy.test_f|
00000070: 6f 72 5f 62 72 65 61 6b 18 74 65 73 74 5f 73 77 |or_break.test_sw|
00000080: 69 74 63 68 31 18 74 65 73 74 5f 73 77 69 74 63 |itch1.test_switc|
00000090: 68 32 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h2.test_try_catc|
000000a0: 68 31 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h1.test_try_catc|
000000b0: 68 32 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h2.test_try_catc|
000000c0: 68 33 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h3.test_try_catc|
000000d0: 68 34 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h4.test_try_catc|
000000e0: 68 35 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h5.test_try_catc|
000000f0: 68 36 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h6.test_try_catc|
00000100: 68 37 1e 74 65 73 74 5f 74 72 79 5f 63 61 74 63 |h7.test_try_catc|
00000110: 68 38 24 74 65 73 74 5f 63 79 63 6c 69 63 5f 6c |h8$test_cyclic_l|
00000120: 61 62 65 6c 73 18 5f 5f 6c 6f 61 64 53 63 72 69 |abels.__loadScri|
00000130: 70 74 1c 74 65 73 74 5f 61 73 73 65 72 74 2e 6a |pt.test_assert.j|
00000140: 73 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |sN__tests__/fixt|
00000150: 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 73 |ures_quickjs/tes|
00000160: 74 5f 6c 6f 6f 70 2e 6a 73 0c 61 63 74 75 61 6c |t_loop.js.actual|
00000170: 10 65 78 70 65 63 74 65 64 2e 61 73 73 65 72 74 |.expected.assert|
00000180: 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 |ion failed: got |
00000190: 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c ||.|., expected ||
000001a0: 04 20 28 02 29 02 69 02 63 02 6a 06 74 61 62 02 |. (.).i.c.j.tab.|
000001b0: 61 02 62 02 6b 02 78 02 79 08 70 75 73 68 06 78 |a.b.k.x.y.push.x|
000001c0: 2c 79 0c 66 6f 72 5f 69 6e 0e 31 2c 78 2c 79 2c |,y.for_in.1,x,y,|
000001d0: 34 06 31 2c 79 26 30 2c 31 2c 32 2c 33 2c 34 2c |4.1,y&0,1,2,3,4,|
000001e0: 35 2c 36 2c 37 2c 38 2c 39 02 7a 06 78 2c 7a 16 |5,6,7,8,9.z.x,z.|
000001f0: 72 65 6d 6f 76 65 64 5f 6b 65 79 06 73 74 72 02 |removed_key.str.|
00000200: 6f 02 20 08 20 61 20 63 06 6b 65 79 02 73 02 3f |o. . a c.key.s.?|
00000210: 06 61 62 63 06 61 62 33 0a 68 65 6c 6c 6f 02 74 |.abc.ab3.hello.t|
00000220: 02 66 04 74 66 06 74 63 66 0c 63 61 74 63 68 36 |.f.tf.tcf.catch6|
00000230: 02 67 08 74 66 61 67 0c 78 61 66 79 61 66 0c 00 |.g.tfag.xafyaf..|
00000240: 06 00 a4 01 00 02 00 03 00 14 b7 03 02 a6 01 00 |................|
00000250: 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 00 |.......@....@@..|
00000260: 00 00 40 40 e7 00 00 00 40 40 e8 00 00 00 40 40 |..@@....@@....@@|
00000270: e9 00 00 00 40 40 ea 00 00 00 40 40 eb 00 00 00 |....@@....@@....|
00000280: 40 40 ec 00 00 00 40 40 ed 00 00 00 40 40 ee 00 |@@....@@....@@..|
00000290: 00 00 40 40 ef 00 00 00 40 40 f0 00 00 00 40 40 |..@@....@@....@@|
000002a0: f1 00 00 00 40 40 f2 00 00 00 40 40 f3 00 00 00 |....@@....@@....|
000002b0: 40 40 f4 00 00 00 40 40 f5 00 00 00 40 40 f6 00 |@@....@@....@@..|
000002c0: 00 00 40 40 f7 00 00 00 40 40 f8 00 00 00 40 c2 |..@@....@@....@.|
000002d0: 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 c2 |.A.......A......|
000002e0: 02 41 e7 00 00 00 00 c2 03 41 e8 00 00 00 00 c2 |.A.......A......|
000002f0: 04 41 e9 00 00 00 00 c2 05 41 ea 00 00 00 00 c2 |.A.......A......|
00000300: 06 41 eb 00 00 00 00 c2 07 41 ec 00 00 00 00 c2 |.A.......A......|
00000310: 08 41 ed 00 00 00 00 c2 09 41 ee 00 00 00 00 c2 |.A.......A......|
00000320: 0a 41 ef 00 00 00 00 c2 0b 41 f0 00 00 00 00 c2 |.A.......A......|
00000330: 0c 41 f1 00 00 00 00 c2 0d 41 f2 00 00 00 00 c2 |.A.......A......|
00000340: 0e 41 f3 00 00 00 00 c2 0f 41 f4 00 00 00 00 c2 |.A.......A......|
00000350: 10 41 f5 00 00 00 00 c2 11 41 f6 00 00 00 00 c2 |.A.......A......|
00000360: 12 41 f7 00 00 00 00 c2 13 41 f8 00 00 00 00 06 |.A.......A......|
00000370: cb 6f 13 00 00 00 39 f9 00 00 00 04 fa 00 00 00 |.o....9.........|
00000380: f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 39 |......o.......09|
00000390: e6 00 00 00 f0 cb 39 e7 00 00 00 f0 cb 39 e8 00 |......9......9..|
000003a0: 00 00 f0 cb 39 e9 00 00 00 f0 cb 39 ed 00 00 00 |....9......9....|
000003b0: f0 cb 39 ee 00 00 00 f0 cb 39 ef 00 00 00 f0 cb |..9......9......|
000003c0: 39 ea 00 00 00 f0 cb 39 eb 00 00 00 f0 cb 39 ec |9......9......9.|
000003d0: 00 00 00 f0 cb 39 f0 00 00 00 f0 cb 39 f1 00 00 |.....9......9...|
000003e0: 00 f0 cb 39 f2 00 00 00 f0 cb 39 f3 00 00 00 f0 |...9......9.....|
000003f0: cb 39 f4 00 00 00 f0 cb 39 f5 00 00 00 f0 cb 39 |.9......9......9|
00000400: f6 00 00 00 f0 cb 39 f7 00 00 00 f0 cf 28 f6 03 |......9......(..|
00000410: 54 00 00 00 9f 02 1e 08 34 18 00 0f 92 05 1f 1b |T.......4.......|
00000420: 14 0d 13 1b 20 0d 1f 1b 1a 0d 19 1b 10 0d 0f 1b |.... ...........|
00000430: 1c 0d 1b 1b 18 0d 17 1b 18 0d 17 1b 16 0d 15 1b |................|
00000440: 18 0d 17 1b 22 0d 21 1b 1e 0d 1d 1b 1e 0d 1d 1b |....".!.........|
00000450: 1e 0d 1d 1b 1e 0d 1d 1b 1e 0d 1d 1b 1e 0d 1d 1b |................|
00000460: 1e 0d 1d 1b 1e 00 0c 43 06 00 ca 03 03 01 03 04 |.......C........|
00000470: 00 00 79 04 f8 03 00 01 00 fa 03 00 01 00 68 00 |..y...........h.|
00000480: 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 ab ec 03 |................|
00000490: 0a d8 d3 d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b |.......).../...+|
000004a0: d3 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 |...K.....!...K..|
000004b0: 00 ab ec 17 d3 43 39 00 00 00 24 00 00 d4 43 39 |.....C9...$...C9|
000004c0: 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 |...$.....)9.....|
000004d0: fe 00 00 00 d3 9f 04 ff 00 00 00 9f 04 00 01 00 |................|
000004e0: 00 9f d4 9f 04 ff 00 00 00 9f d5 ec 10 04 01 01 |................|
000004f0: 00 00 d5 9f 04 02 01 00 00 9f ee 02 c3 9f f1 30 |...............0|
00000500: f6 03 50 00 00 12 10 07 12 0c 10 12 21 0d 00 07 |..P.........!...|
00000510: 16 07 07 12 0d 08 00 07 0e 11 18 07 12 12 23 07 |..............#.|
00000520: 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b |./,..0Y.........|
00000530: 12 11 29 12 29 08 04 34 44 07 03 20 12 20 0c 08 |..).)..4D.. . ..|
00000540: 3f 07 03 20 16 08 31 2a 22 07 03 20 14 15 0c 06 |?.. ..1*".. ....|
00000550: 31 07 15 00 0c 43 06 00 cc 03 00 02 00 03 00 00 |1....C..........|
00000560: 19 02 86 04 00 00 00 88 04 00 01 00 b7 cb b7 cc |................|
00000570: c7 ba a5 ec 07 95 01 95 00 ee f6 39 e5 00 00 00 |...........9....|
00000580: c8 ba ad f1 29 f6 03 16 13 00 04 08 0d 00 0d 0e |....)...........|
00000590: 0c 04 12 07 0d 00 18 09 1b 0e 0c 04 07 05 00 0c |................|
000005a0: 43 06 00 ce 03 00 02 00 03 00 00 25 02 86 04 00 |C..........%....|
000005b0: 00 00 88 04 00 01 00 b7 cb b7 cc c7 ba a5 ec 0c |................|
000005c0: 95 01 c7 b8 ab ed 05 95 00 ee f1 39 e5 00 00 00 |...........9....|
000005d0: c8 b9 ad 11 ec 05 0e c7 b8 ad f1 29 f6 03 1e 1d |...........)....|
000005e0: 00 04 08 0d 00 0d 0e 0c 04 12 07 0d 06 0c 04 13 |................|
000005f0: 09 18 09 1b 0e 0c 04 1b 12 0c 04 07 1b 00 0c 43 |...............C|
00000600: 06 00 d0 03 00 02 00 03 00 00 1e 02 86 04 00 00 |................|
00000610: 00 88 04 00 01 00 b7 cb b7 cc 95 01 95 00 c7 ba |................|
00000620: a5 ed f8 39 e5 00 00 00 c8 ba ad 11 ec 05 0e c7 |...9............|
00000630: ba ad f1 29 f6 03 1a 29 00 04 08 0d 00 0e 0a 0d |...)...)........|
00000640: 00 0d 08 0c 04 12 15 1b 0e 0c 04 1b 12 0c 04 07 |................|
00000650: 1b 00 0c 43 06 00 d2 03 00 03 00 03 00 00 40 03 |...C..........@.|
00000660: 86 04 00 00 00 88 04 00 01 00 8a 04 00 02 00 b7 |................|
00000670: cc b7 cb c7 ba a5 ec 07 95 01 95 00 ee f6 39 e5 |..............9.|
00000680: 00 00 00 c8 ba ad 11 ec 05 0e c7 ba ad f1 0e b7 |................|
00000690: cc b7 cd c9 ba a5 ec 07 95 01 95 02 ee f6 39 e5 |..............9.|
000006a0: 00 00 00 c8 ba ad 11 ec 05 0e c9 ba ad f1 29 f6 |..............).|
000006b0: 03 30 33 00 04 08 0d 0a 0c 0e 0c 04 12 11 0b 1e |.03.............|
000006c0: 19 27 1b 0e 0c 04 1b 12 0c 04 07 1b 0d 0b 17 20 |.'............. |
000006d0: 0c 04 12 19 0b 26 19 2f 1b 0e 0c 04 1b 12 0c 04 |.....&./........|
000006e0: 07 1b 00 0c 43 06 00 d4 03 00 06 00 06 00 00 80 |....C...........|
000006f0: 05 06 86 04 00 00 00 8c 04 00 01 00 8e 04 00 02 |................|
00000700: 00 90 04 00 03 00 8a 04 00 04 00 92 04 00 05 00 |................|
00000710: 26 00 00 cc 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 |&.....N.....N...|
00000720: 00 7e ee 0d cb c8 43 0c 01 00 00 c7 24 01 00 0e |.~....C.....$...|
00000730: 81 ec f2 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 |.....9.....C9...|
00000740: 24 00 00 04 0d 01 00 00 04 0e 01 00 00 f3 0e 0b |$...............|
00000750: b9 4e 0a 01 00 00 b9 4e 0b 01 00 00 ba 4e 01 00 |.N.....N.....N..|
00000760: 00 80 cd 0b ba 4e 04 00 00 80 ce 39 9d 00 00 00 |.....N.....9....|
00000770: 43 62 00 00 00 c9 ca 24 02 00 0e 26 00 00 cc c9 |Cb.....$...&....|
00000780: 7e ee 0d cb c8 43 0c 01 00 00 c7 24 01 00 0e 81 |~....C.....$....|
00000790: ec f2 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 |....9.....C9...$|
000007a0: 00 00 04 0f 01 00 00 04 0e 01 00 00 f3 0e 0b b9 |................|
000007b0: 4e 0b 01 00 00 ba 4e 01 00 00 80 cd 39 9d 00 00 |N.....N.....9...|
000007c0: 00 43 67 00 00 00 c9 04 0a 01 00 00 0b b8 4e 42 |.Cg...........NB|
000007d0: 00 00 00 24 03 00 0e 0b ba 4e 0a 01 00 00 ce 39 |...$.....N.....9|
000007e0: 9d 00 00 00 43 62 00 00 00 c9 ca 24 02 00 0e 26 |....Cb.....$...&|
000007f0: 00 00 cc c9 7e ee 0d cb c8 43 0c 01 00 00 c7 24 |....~....C.....$|
00000800: 01 00 0e 81 ec f2 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
00000810: 00 00 00 24 00 00 04 10 01 00 00 04 0e 01 00 00 |...$............|
00000820: f3 0e 26 00 00 cd b7 cb c7 bf 0a a5 ec 10 c9 43 |..&............C|
00000830: 0c 01 00 00 c7 24 01 00 0e 95 00 ee ec 26 00 00 |.....$.......&..|
00000840: cc c9 7e ee 0d cb c8 43 0c 01 00 00 c7 24 01 00 |..~....C.....$..|
00000850: 0e 81 ec f2 0e 0e 39 e5 00 00 00 c8 43 39 00 00 |......9.....C9..|
00000860: 00 24 00 00 04 11 01 00 00 04 0e 01 00 00 f3 0e |.$..............|
00000870: 0b b7 4e 0a 01 00 00 cd 26 00 00 cc 0b b8 4e 0a |..N.....&.....N.|
00000880: 01 00 00 b9 4e 0b 01 00 00 7e ee 18 c9 1b 44 0a |....N....~....D.|
00000890: 01 00 00 c8 43 0c 01 00 00 c9 42 0a 01 00 00 24 |....C.....B....$|
000008a0: 01 00 0e 81 ec e7 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
000008b0: 00 00 00 24 00 00 04 0d 01 00 00 04 0e 01 00 00 |...$............|
000008c0: f3 0e b7 26 01 00 cd 26 00 00 cc 0b b8 4e 0a 01 |...&...&.....N..|
000008d0: 00 00 b9 4e 0b 01 00 00 7e ee 12 c9 b7 1d 4b c8 |...N....~.....K.|
000008e0: 43 0c 01 00 00 c9 b7 48 24 01 00 0e 81 ec ed 0e |C......H$.......|
000008f0: 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 04 |.9.....C9...$...|
00000900: 0d 01 00 00 04 0e 01 00 00 f3 0e 26 00 00 cc 0b |...........&....|
00000910: b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 7e ee 0f c5 |.N.....N....~...|
00000920: 04 c8 43 0c 01 00 00 c4 04 24 01 00 0e 81 ec f0 |..C......$......|
00000930: 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 |..9.....C9...$..|
00000940: 04 0d 01 00 00 04 0e 01 00 00 f3 0e 26 00 00 cc |............&...|
00000950: b9 c5 05 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 |.....N.....N....|
00000960: 7e ee 0f c5 05 c8 43 0c 01 00 00 c4 05 24 01 00 |~.....C......$..|
00000970: 0e 81 ec f0 0e 0e 39 e5 00 00 00 c8 43 39 00 00 |......9.....C9..|
00000980: 00 24 00 00 04 0d 01 00 00 04 0e 01 00 00 f3 29 |.$.............)|
00000990: f6 03 f6 01 40 00 04 08 67 0a 08 01 07 06 1b 0c |....@...g.......|
000009a0: 07 01 31 17 1b 0e 07 06 1b 12 43 19 0e 0b 67 00 |..1.......C...g.|
000009b0: 2b 00 1b 0c 1b 20 07 06 07 07 17 29 17 14 16 09 |+.... .....)....|
000009c0: 08 01 07 06 1b 0c 07 01 31 17 1b 0e 07 06 1b 12 |........1.......|
000009d0: 43 19 0f 0b 49 00 1b 0c 1b 20 43 01 17 29 2b 00 |C...I.... C..)+.|
000009e0: 1b 0c 1b 20 07 06 07 07 17 29 17 14 16 09 08 01 |... .....)......|
000009f0: 07 06 1b 0c 07 01 31 17 1b 0e 07 06 1b 12 43 19 |......1.......C.|
00000a00: 0e 0b 17 0a 0c 0e 11 04 12 13 07 02 1b 0c 07 01 |................|
00000a10: 15 16 18 29 17 14 16 09 08 01 07 06 1b 0c 07 01 |...)............|
00000a20: 31 17 1b 0e 07 06 1b 12 43 19 0e 0b 2b 00 67 0a |1.......C...+.g.|
00000a30: 07 02 21 03 07 06 1b 0c 07 02 1b 03 31 17 1b 0e |..!.........1...|
00000a40: 07 06 1b 12 43 19 0e 0b 1c 00 67 0a 0c 02 0d 03 |....C.....g.....|
00000a50: 07 06 1b 0c 0c 02 07 03 31 17 1b 0e 07 06 1b 12 |........1.......|
00000a60: 43 19 0e 0b 72 08 07 06 1b 0c 0c 01 31 17 1b 0e |C...r.......1...|
00000a70: 07 06 1b 12 43 19 0e 0b 81 08 07 06 1b 0c 0c 01 |....C...........|
00000a80: 31 17 1b 0e 07 06 1b 12 43 19 00 0c 43 06 00 d6 |1.......C...C...|
00000a90: 03 00 02 00 04 00 00 94 01 02 86 04 00 00 00 8c |................|
00000aa0: 04 00 01 00 26 00 00 cc 0b b8 4e 0a 01 00 00 b9 |....&.....N.....|
00000ab0: 4e 0b 01 00 00 ba 4e 12 01 00 00 7e ee 16 cb c7 |N.....N....~....|
00000ac0: 04 0b 01 00 00 ad ed 0c c8 43 0c 01 00 00 c7 24 |.........C.....$|
00000ad0: 01 00 0e 81 ec e9 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
00000ae0: 00 00 00 24 00 00 04 13 01 00 00 ab f1 0e 26 00 |...$..........&.|
00000af0: 00 cc 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 ba |....N.....N.....|
00000b00: 4e 12 01 00 00 7e ee 16 cb c7 04 12 01 00 00 ad |N....~..........|
00000b10: ed 10 c8 43 0c 01 00 00 c7 24 01 00 0e 81 ec e9 |...C.....$......|
00000b20: 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 |..9.....C9...$..|
00000b30: 04 0d 01 00 00 ab f1 29 f6 03 3a 7f 00 04 08 85 |.......)..:.....|
00000b40: 0a 08 06 20 04 13 0b 07 06 1b 0c 07 01 31 17 1b |... .........1..|
00000b50: 0e 07 06 1b 12 2a 06 07 1f 0d 0b 85 0a 08 06 20 |.....*......... |
00000b60: 04 13 0b 07 06 1b 0c 07 01 31 17 1b 0e 07 06 1b |.........1......|
00000b70: 12 2a 06 07 1f 00 0c 43 06 00 d8 03 00 05 00 05 |.*.....C........|
00000b80: 00 02 7f 05 a8 04 01 00 60 b0 01 01 01 20 8a 02 |........`.... ..|
00000b90: 01 02 20 aa 04 01 03 20 ac 04 02 04 20 63 03 00 |.. .... .... c..|
00000ba0: 63 02 00 63 01 00 63 00 00 c3 cb 0b cc 39 c6 00 |c..c..c......9..|
00000bb0: 00 00 11 64 01 00 0b c2 00 4f 69 00 00 00 4e 69 |...d.....Oi...Ni|
00000bc0: 00 00 00 c2 01 4f 68 00 00 00 4e 68 00 00 00 21 |.....Oh...Nh...!|
00000bd0: 02 00 cd c3 ce 63 04 00 64 02 00 7e ee 2a c5 04 |.....c..d..~.*..|
00000be0: 64 03 00 04 17 01 00 00 64 04 00 9f 9f 11 65 03 |d.......d.....e.|
00000bf0: 00 0e 64 04 00 04 07 01 00 00 ab ec 0b 04 08 01 |..d.............|
00000c00: 00 00 11 65 00 00 0e 81 ec d5 0e 0e 39 e5 00 00 |...e........9...|
00000c10: 00 64 03 00 04 18 01 00 00 ab f1 29 f6 03 23 90 |.d.........)..#.|
00000c20: 01 00 55 28 20 0c 8e 01 00 09 18 0d 2b 13 2a 1a |..U( .......+.*.|
00000c30: 11 03 07 0d 21 00 2a 04 12 03 4f 0f 1b 0e 2a 08 |....!.*...O...*.|
00000c40: 07 09 00 0c 43 06 00 00 00 00 00 03 00 00 13 00 |....C...........|
00000c50: 04 07 01 00 00 04 08 01 00 00 04 04 01 00 00 26 |...............&|
00000c60: 03 00 28 f6 03 05 94 01 11 5d 09 00 0c 43 06 00 |..(......]...C..|
00000c70: 00 02 01 02 03 01 00 2c 03 b0 01 00 01 00 b2 04 |.......,........|
00000c80: 00 01 00 10 00 01 00 a8 04 00 09 08 cb 68 00 00 |.............h..|
00000c90: c3 ac ec 0e d4 68 00 00 ab ec 07 39 47 00 00 00 |.....h.....9G...|
00000ca0: 28 0b 0a 4e 41 00 00 00 0a 4e 3f 00 00 00 c7 d4 |(..NA....N?.....|
00000cb0: 48 4e 42 00 00 00 28 f6 03 17 97 01 22 0d 23 16 |HNB...(.....".#.|
00000cc0: 18 11 12 07 0e 11 05 12 23 1b 0d 4f 76 07 01 20 |........#..Ov.. |
00000cd0: 73 00 0c 43 06 00 da 03 00 02 00 03 00 00 27 02 |s..C..........'.|
00000ce0: 86 04 00 00 00 88 04 00 01 00 b7 cc b7 cb c7 ba |................|
00000cf0: a5 ec 0e 95 01 c7 b7 ab ed 03 ee 05 95 00 ee ef |................|
00000d00: 39 e5 00 00 00 c8 b9 ad 11 ec 05 0e c7 b8 ad f1 |9...............|
00000d10: 29 f6 03 23 a6 01 00 04 08 0d 12 0c 0e 0c 04 12 |)..#............|
00000d20: 19 0d 06 0c 04 00 05 03 1c 00 04 10 2f 1b 0e 0c |............/...|
00000d30: 04 1b 12 0c 04 07 1b 00 0c 43 06 00 dc 03 00 03 |.........C......|
00000d40: 00 03 00 00 4d 03 86 04 00 00 00 8e 04 00 01 00 |....M...........|
00000d50: b4 04 00 02 00 c3 cd b7 cb c7 ba a5 ec 30 04 1b |.............0..|
00000d60: 01 00 00 cc c7 11 b7 ad ec 09 04 07 01 00 00 cc |................|
00000d70: ee 14 11 b8 ad ec 09 04 08 01 00 00 cc ee 07 04 |................|
00000d80: 04 01 00 00 cc 0e c8 96 02 95 00 ee cd 39 e5 00 |.............9..|
00000d90: 00 00 c9 04 1c 01 00 00 ad 11 ec 05 0e c7 ba ad |................|
00000da0: f1 29 f6 03 29 b3 01 00 04 08 0d 0a 0c 0e 0c 04 |.)..)...........|
00000db0: 12 13 21 10 22 00 46 00 2d 00 28 0b 00 03 19 1c |..!.".F.-.(.....|
00000dc0: 00 04 1e 27 1b 0e 20 04 1b 1a 0c 04 07 23 00 0c |...'.. ......#..|
00000dd0: 43 06 00 de 03 00 03 00 03 00 00 53 03 86 04 00 |C..........S....|
00000de0: 00 00 8e 04 00 01 00 b4 04 00 02 00 c3 cd b7 cb |................|
00000df0: c7 bb a5 ec 36 04 1b 01 00 00 cc c7 11 b7 ad ec |....6...........|
00000e00: 09 04 07 01 00 00 cc ee 1a 11 b8 ad ec 09 04 08 |................|
00000e10: 01 00 00 cc ee 0d 11 b9 ad ec 04 0e ee 09 c3 c7 |................|
00000e20: 9f cc 0e c8 96 02 95 00 ee c7 39 e5 00 00 00 c9 |..........9.....|
00000e30: 04 1d 01 00 00 ad 11 ec 05 0e c7 bb ad f1 29 f6 |..............).|
00000e40: 03 2f c7 01 00 04 08 0d 0a 0c 0e 0c 04 12 13 21 |./.............!|
00000e50: 10 22 00 46 00 00 10 0a 00 07 12 07 03 14 19 00 |.".F............|
00000e60: 03 1d 1c 00 04 22 27 1b 0e 20 04 1b 1a 0c 04 07 |....."'.. ......|
00000e70: 23 00 0c 43 06 00 e0 03 00 01 00 05 00 00 27 01 |#..C..........'.|
00000e80: c8 03 03 00 03 6f 0a 00 00 00 04 1e 01 00 00 30 |.....o.........0|
00000e90: cb 6f 19 00 00 00 39 e5 00 00 00 c7 04 1e 01 00 |.o....9.........|
00000ea0: 00 04 19 00 00 00 f3 0e 06 72 28 30 f6 03 0d dd |.........r(0....|
00000eb0: 01 00 36 10 28 00 1b 0e 39 01 0d 0b 00 0c 43 06 |..6.(...9.....C.|
00000ec0: 00 e2 03 00 02 00 04 00 00 24 02 8e 04 00 00 00 |.........$......|
00000ed0: c8 03 03 00 03 6f 09 00 00 00 b8 cb 0e ee 0d cc |.....o..........|
00000ee0: 6f 09 00 00 00 b9 cb 0e ee 02 30 39 e5 00 00 00 |o.........09....|
00000ef0: c7 b8 04 19 00 00 00 f3 29 f6 03 0d e7 01 00 1e |........).......|
00000f00: 10 3c 00 22 07 1b 0e 25 01 00 0c 43 06 00 e4 03 |.<."...%...C....|
00000f10: 00 02 00 04 00 00 4f 02 b4 04 00 00 00 c8 03 03 |......O.........|
00000f20: 00 03 c3 cb 6f 15 00 00 00 04 1f 01 00 00 96 00 |....o...........|
00000f30: 0e 06 70 24 00 00 00 0e ee 26 cc 6f 15 00 00 00 |..p$.....&.o....|
00000f40: 04 04 01 00 00 96 00 0e 06 70 0d 00 00 00 0e ee |.........p......|
00000f50: 0f 70 05 00 00 00 30 04 20 01 00 00 96 00 71 39 |.p....0. .....q9|
00000f60: e5 00 00 00 c7 04 21 01 00 00 04 19 00 00 00 f3 |......!.........|
00000f70: 29 f6 03 11 f1 01 00 04 08 27 0c 78 00 78 00 2c |)........'.x.x.,|
00000f80: 0b 1b 0e 39 01 00 0c 43 06 00 e6 03 00 02 00 04 |...9...C........|
00000f90: 00 00 47 02 b4 04 00 00 00 c8 03 03 00 03 c3 cb |..G.............|
00000fa0: 6f 11 00 00 00 04 1f 01 00 00 96 00 04 04 01 00 |o...............|
00000fb0: 00 30 cc 6f 11 00 00 00 c8 96 00 0e 06 70 0d 00 |.0.o.........p..|
00000fc0: 00 00 0e ee 0f 70 05 00 00 00 30 04 20 01 00 00 |.....p....0. ...|
00000fd0: 96 00 71 39 e5 00 00 00 c7 04 22 01 00 00 04 19 |..q9......".....|
00000fe0: 00 00 00 f3 29 f6 03 13 ff 01 00 04 08 27 0c 3f |....)........'.?|
00000ff0: 03 28 04 64 00 2c 0b 1b 0e 39 01 00 0c 43 06 00 |.(.d.,...9...C..|
00001000: e8 03 00 01 00 04 00 00 38 01 b4 04 00 00 00 c3 |........8.......|
00001010: cb 6f 15 00 00 00 04 1f 01 00 00 96 00 0e 06 70 |.o.............p|
00001020: 0d 00 00 00 0e ee 0f 70 05 00 00 00 30 04 20 01 |.......p....0. .|
00001030: 00 00 96 00 71 39 e5 00 00 00 c7 04 21 01 00 00 |....q9......!...|
00001040: 04 19 00 00 00 f3 29 f6 03 11 8e 02 00 04 08 28 |......)........(|
00001050: 14 59 00 23 00 2d 13 1b 0e 39 01 00 0c 43 06 00 |.Y.#.-...9...C..|
00001060: ea 03 00 02 00 04 00 01 22 02 c0 04 00 00 00 b4 |........".......|
00001070: 04 00 01 40 c2 00 cb c3 cc 39 e5 00 00 00 c7 f0 |...@.....9......|
00001080: b8 ad f1 0e 39 e5 00 00 00 c8 04 21 01 00 00 04 |....9......!....|
00001090: 23 01 00 00 f3 29 f6 03 15 9d 02 00 00 05 16 08 |#....)..........|
000010a0: 1b 0e 07 02 0c 06 07 09 0d 0b 1b 0e 39 01 00 0c |............9...|
000010b0: 43 06 00 c0 04 00 00 00 04 01 00 24 00 b4 04 01 |C..........$....|
000010c0: 01 6f 14 00 00 00 df 04 1f 01 00 00 9f e3 b8 72 |.o.............r|
000010d0: 70 0b 00 00 00 28 70 05 00 00 00 30 df 04 20 01 |p....(p....0.. .|
000010e0: 00 00 9f e3 71 f6 03 0d 9e 02 04 1d 10 20 04 12 |....q........ ..|
000010f0: 03 46 00 20 04 00 0c 43 06 00 ec 03 00 02 00 04 |.F. ...C........|
00001100: 00 00 5a 02 b4 04 00 00 00 c8 03 05 00 03 c3 cb |..Z.............|
00001110: 6f 24 00 00 00 6f 11 00 00 00 04 1f 01 00 00 96 |o$...o..........|
00001120: 00 04 07 01 00 00 30 70 05 00 00 00 30 04 20 01 |......0p....0. .|
00001130: 00 00 96 00 71 cc 6f 11 00 00 00 c8 96 00 0e 06 |....q.o.........|
00001140: 70 0d 00 00 00 0e ee 0f 70 05 00 00 00 30 04 24 |p.......p....0.$|
00001150: 01 00 00 96 00 71 39 e5 00 00 00 c7 04 25 01 00 |.....q9......%..|
00001160: 00 04 19 00 00 00 f3 29 f6 03 17 ab 02 00 04 08 |.......)........|
00001170: 41 14 3f 03 28 04 00 0e 08 07 64 00 2c 0b 1b 0e |A.?.(.....d.,...|
00001180: 39 01 00 0c 43 06 00 ee 03 00 03 00 04 00 00 55 |9...C..........U|
00001190: 03 86 04 00 00 00 b4 04 00 01 00 c8 03 05 00 03 |................|
000011a0: c3 cc 0b b8 4e 0a 01 00 00 b9 4e 0b 01 00 00 7e |....N.....N....~|
000011b0: ee 31 cb 6f 0d 00 00 00 c7 96 01 04 07 01 00 00 |.1.o............|
000011c0: 30 cd 6f 11 00 00 00 c9 96 01 0e 06 70 0d 00 00 |0.o.........p...|
000011d0: 00 0e ee 0f 70 05 00 00 00 30 04 20 01 00 00 96 |....p....0. ....|
000011e0: 01 71 81 ec ce 0e 0e 39 e5 00 00 00 c8 04 26 01 |.q.....9......&.|
000011f0: 00 00 ad f1 29 f6 03 15 bf 02 00 04 08 7d 14 2b |....)........}.+|
00001200: 03 28 04 64 00 46 13 1b 0e 20 04 07 05 00 0c 43 |.(.d.F... .....C|
00001210: 06 00 f0 03 00 00 00 00 00 00 02 00 ee ff f6 03 |................|
00001220: 03 d0 02 00 00                                  |.....|
```