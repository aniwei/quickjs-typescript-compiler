# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_bignum.ts
**生成时间**: 2026-01-06T16:09:47.505Z

## 大小对比

- TypeScript编译器: 9232 字节
- WASM编译器: 5 字节
- 差异: 9227 字节 (184540.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 120,
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
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "assertThrows",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bigint_pow",
      "offset": 24
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_eq",
      "offset": 35
    },
    {
      "index": 5,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint1",
      "offset": 43
    },
    {
      "index": 6,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_divrem",
      "offset": 56
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_idiv1",
      "offset": 68
    },
    {
      "index": 8,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_bigint_ext",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_bigfloat",
      "offset": 95
    },
    {
      "index": 10,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_bigdecimal",
      "offset": 109
    },
    {
      "index": 11,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "use strict",
      "offset": 125
    },
    {
      "index": 12,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 136
    },
    {
      "index": 13,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 149
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint2",
      "offset": 164
    },
    {
      "index": 15,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_bignum.js",
      "offset": 177
    },
    {
      "index": 16,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 225
    },
    {
      "index": 17,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 232
    },
    {
      "index": 18,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "assertion failed, expected |",
      "offset": 241
    },
    {
      "index": 19,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 270
    },
    {
      "index": 20,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 272
    },
    {
      "index": 21,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 275
    },
    {
      "index": 22,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 277
    },
    {
      "index": 23,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 281
    },
    {
      "index": 24,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 286
    },
    {
      "index": 25,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 289
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 308
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 310
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 312
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 314
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 316
    },
    {
      "index": 31,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 318
    },
    {
      "index": 32,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 328
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 333
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 335
    },
    {
      "index": 35,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 337
    },
    {
      "index": 36,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 340
    },
    {
      "index": 37,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "div1",
      "offset": 349
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "q",
      "offset": 354
    },
    {
      "index": 39,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 356
    },
    {
      "index": 40,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "divrem",
      "offset": 360
    },
    {
      "index": 41,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 367
    },
    {
      "index": 42,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rem",
      "offset": 369
    },
    {
      "index": 43,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "floorLog2",
      "offset": 373
    },
    {
      "index": 44,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sqrtrem",
      "offset": 383
    },
    {
      "index": 45,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tdiv",
      "offset": 391
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdiv",
      "offset": 396
    },
    {
      "index": 47,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cdiv",
      "offset": 401
    },
    {
      "index": 48,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ediv",
      "offset": 406
    },
    {
      "index": 49,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "sqrt2",
      "offset": 411
    },
    {
      "index": 50,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 417
    },
    {
      "index": 51,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "bigfloat",
      "offset": 419
    },
    {
      "index": 52,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "BigFloatEnv",
      "offset": 428
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 440
    },
    {
      "index": 54,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "BigFloat",
      "offset": 445
    },
    {
      "index": 55,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 454
    },
    {
      "index": 56,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "0x1.6a09e667f3bcc908b2fb1366ea957d3e",
      "offset": 465
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "inexact",
      "offset": 502
    },
    {
      "index": 58,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "fpRound",
      "offset": 510
    },
    {
      "index": 59,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "a09e667f3bcc908b2fb1366ea95l",
      "offset": 518
    },
    {
      "index": 60,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "setPrec",
      "offset": 547
    },
    {
      "index": 61,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bind",
      "offset": 555
    },
    {
      "index": 62,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 560
    },
    {
      "index": 63,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 566
    },
    {
      "index": 64,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 575
    },
    {
      "index": 65,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sign",
      "offset": 579
    },
    {
      "index": 66,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "exp",
      "offset": 584
    },
    {
      "index": 67,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 588
    },
    {
      "index": 68,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 592
    },
    {
      "index": 69,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sin",
      "offset": 596
    },
    {
      "index": 70,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cos",
      "offset": 600
    },
    {
      "index": 71,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tan",
      "offset": 604
    },
    {
      "index": 72,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "asin",
      "offset": 608
    },
    {
      "index": 73,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "acos",
      "offset": 613
    },
    {
      "index": 74,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "atan",
      "offset": 618
    },
    {
      "index": 75,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "atan2",
      "offset": 623
    },
    {
      "index": 76,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 629
    },
    {
      "index": 77,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 635
    },
    {
      "index": 78,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "trunc",
      "offset": 640
    },
    {
      "index": 79,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 646
    },
    {
      "index": 80,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fmod",
      "offset": 652
    },
    {
      "index": 81,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "remainder",
      "offset": 657
    },
    {
      "index": 82,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "1234.125",
      "offset": 667
    },
    {
      "index": 83,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 676
    },
    {
      "index": 84,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.13",
      "offset": 684
    },
    {
      "index": 85,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "down",
      "offset": 692
    },
    {
      "index": 86,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.12",
      "offset": 697
    },
    {
      "index": 87,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "toExponential",
      "offset": 705
    },
    {
      "index": 88,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "1.234125e+3",
      "offset": 719
    },
    {
      "index": 89,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23413e+3",
      "offset": 731
    },
    {
      "index": 90,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDZ",
      "offset": 742
    },
    {
      "index": 91,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23412e+3",
      "offset": 747
    },
    {
      "index": 92,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 758
    },
    {
      "index": 93,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "123.438",
      "offset": 770
    },
    {
      "index": 94,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "323.438",
      "offset": 778
    },
    {
      "index": 95,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "723.438",
      "offset": 786
    },
    {
      "index": 96,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "f23.438",
      "offset": 794
    },
    {
      "index": 97,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "RNDNA",
      "offset": 802
    },
    {
      "index": 98,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.44",
      "offset": 808
    },
    {
      "index": 99,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "323.44",
      "offset": 815
    },
    {
      "index": 100,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "723.44",
      "offset": 822
    },
    {
      "index": 101,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "f23.44",
      "offset": 829
    },
    {
      "index": 102,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "0.000044",
      "offset": 836
    },
    {
      "index": 103,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "1230000000.0",
      "offset": 845
    },
    {
      "index": 104,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.43",
      "offset": 858
    },
    {
      "index": 105,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDD",
      "offset": 865
    },
    {
      "index": 106,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "-f23.44",
      "offset": 870
    },
    {
      "index": 107,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "1.2344p+8",
      "offset": 878
    },
    {
      "index": 108,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 888
    },
    {
      "index": 109,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BigDecimal",
      "offset": 890
    },
    {
      "index": 110,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "1234.1",
      "offset": 901
    },
    {
      "index": 111,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "    1234.1",
      "offset": 908
    },
    {
      "index": 112,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "    1234.1  ",
      "offset": 919
    },
    {
      "index": 113,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "roundingMode",
      "offset": 932
    },
    {
      "index": 114,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "maximumSignificantDigits",
      "offset": 945
    },
    {
      "index": 115,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "maximumFractionDigits",
      "offset": 970
    },
    {
      "index": 116,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 992
    },
    {
      "index": 117,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mul",
      "offset": 996
    },
    {
      "index": 118,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mod",
      "offset": 1000
    },
    {
      "index": 119,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "-1234.13",
      "offset": 1004
    }
  ],
  "functionHeader": {
    "offset": 1013,
    "tag": "0xc",
    "remaining": 8219
  }
}
```

### WASM编译器输出
```json
{
  "error": "Bytecode too short for analysis"
}
```

## 字节级差异

共发现 9232 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x78 vs WASM=0x02
- 偏移量 0x2: TS=0x02 vs WASM=0x03
- 偏移量 0x3: TS=0x65 vs WASM=0x04
- 偏移量 0x4: TS=0x0c vs WASM=0x05
- 偏移量 0x5: TS=0x61 vs WASM=EOF
- 偏移量 0x6: TS=0x73 vs WASM=EOF
- 偏移量 0x7: TS=0x73 vs WASM=EOF
- 偏移量 0x8: TS=0x65 vs WASM=EOF
- 偏移量 0x9: TS=0x72 vs WASM=EOF
- 偏移量 0xa: TS=0x74 vs WASM=EOF
- 偏移量 0xb: TS=0x18 vs WASM=EOF
- 偏移量 0xc: TS=0x61 vs WASM=EOF
- 偏移量 0xd: TS=0x73 vs WASM=EOF
- 偏移量 0xe: TS=0x73 vs WASM=EOF
- 偏移量 0xf: TS=0x65 vs WASM=EOF
- 偏移量 0x10: TS=0x72 vs WASM=EOF
- 偏移量 0x11: TS=0x74 vs WASM=EOF
- 偏移量 0x12: TS=0x54 vs WASM=EOF
- 偏移量 0x13: TS=0x68 vs WASM=EOF
- ... (显示前20个差异，总共9232个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 78 02 65 0c 61 73 73 65 72 74 18 61 73 73 65 |.x.e.assert.asse|
00000010: 72 74 54 68 72 6f 77 73 14 62 69 67 69 6e 74 5f |rtThrows.bigint_|
00000020: 70 6f 77 0e 74 65 73 74 5f 65 71 18 74 65 73 74 |pow.test_eq.test|
00000030: 5f 62 69 67 69 6e 74 31 16 74 65 73 74 5f 64 69 |_bigint1.test_di|
00000040: 76 72 65 6d 14 74 65 73 74 5f 69 64 69 76 31 1e |vrem.test_idiv1.|
00000050: 74 65 73 74 5f 62 69 67 69 6e 74 5f 65 78 74 1a |test_bigint_ext.|
00000060: 74 65 73 74 5f 62 69 67 66 6c 6f 61 74 1e 74 65 |test_bigfloat.te|
00000070: 73 74 5f 62 69 67 64 65 63 69 6d 61 6c 14 75 73 |st_bigdecimal.us|
00000080: 65 20 73 74 72 69 63 74 18 5f 5f 6c 6f 61 64 53 |e strict.__loadS|
00000090: 63 72 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 |cript.test_asser|
000000a0: 74 2e 6a 73 18 74 65 73 74 5f 62 69 67 69 6e 74 |t.js.test_bigint|
000000b0: 32 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |2^__tests__/fixt|
000000c0: 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 73 |ures/quickjs-tes|
000000d0: 74 73 2f 74 65 73 74 5f 62 69 67 6e 75 6d 2e 6a |ts/test_bignum.j|
000000e0: 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 |s.actual.expecte|
000000f0: 64 38 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c |d8assertion fail|
00000100: 65 64 2c 20 65 78 70 65 63 74 65 64 20 7c 02 7c |ed, expected |.||
00000110: 04 20 28 02 29 06 65 72 72 08 66 75 6e 63 04 65 |. (.).err.func.e|
00000120: 78 24 65 78 63 65 70 74 69 6f 6e 20 65 78 70 65 |x$exception expe|
00000130: 63 74 65 64 02 61 02 6e 02 72 02 69 02 62 12 74 |cted.a.n.r.i.b.t|
00000140: 65 73 74 5f 6c 65 73 73 08 73 71 72 74 02 2b 02 |est_less.sqrt.+.|
00000150: 2d 04 00 61 10 20 20 31 32 33 20 20 72 08 64 69 |-..a.  123  r.di|
00000160: 76 31 02 71 06 64 69 76 0c 64 69 76 72 65 6d 02 |v1.q.div.divrem.|
00000170: 74 06 72 65 6d 12 66 6c 6f 6f 72 4c 6f 67 32 0e |t.rem.floorLog2.|
00000180: 73 71 72 74 72 65 6d 08 74 64 69 76 08 66 64 69 |sqrtrem.tdiv.fdi|
00000190: 76 08 63 64 69 76 08 65 64 69 76 0a 73 71 72 74 |v.cdiv.ediv.sqrt|
000001a0: 32 02 6c 10 62 69 67 66 6c 6f 61 74 16 42 69 67 |2.l.bigfloat.Big|
000001b0: 46 6c 6f 61 74 45 6e 76 08 70 72 65 63 10 42 69 |FloatEnv.prec.Bi|
000001c0: 67 46 6c 6f 61 74 14 70 61 72 73 65 46 6c 6f 61 |gFloat.parseFloa|
000001d0: 74 48 30 78 31 2e 36 61 30 39 65 36 36 37 66 33 |tH0x1.6a09e667f3|
000001e0: 62 63 63 39 30 38 62 32 66 62 31 33 36 36 65 61 |bcc908b2fb1366ea|
000001f0: 39 35 37 64 33 65 0e 69 6e 65 78 61 63 74 0e 66 |957d3e.inexact.f|
00000200: 70 52 6f 75 6e 64 38 61 30 39 65 36 36 37 66 33 |pRound8a09e667f3|
00000210: 62 63 63 39 30 38 62 32 66 62 31 33 36 36 65 61 |bcc908b2fb1366ea|
00000220: 39 35 6c 0e 73 65 74 50 72 65 63 08 62 69 6e 64 |95l.setPrec.bind|
00000230: 0a 69 73 4e 61 4e 10 69 73 46 69 6e 69 74 65 06 |.isNaN.isFinite.|
00000240: 61 62 73 08 73 69 67 6e 06 65 78 70 06 6c 6f 67 |abs.sign.exp.log|
00000250: 06 70 6f 77 06 73 69 6e 06 63 6f 73 06 74 61 6e |.pow.sin.cos.tan|
00000260: 08 61 73 69 6e 08 61 63 6f 73 08 61 74 61 6e 0a |.asin.acos.atan.|
00000270: 61 74 61 6e 32 0a 66 6c 6f 6f 72 08 63 65 69 6c |atan2.floor.ceil|
00000280: 0a 74 72 75 6e 63 0a 72 6f 75 6e 64 08 66 6d 6f |.trunc.round.fmo|
00000290: 64 12 72 65 6d 61 69 6e 64 65 72 10 31 32 33 34 |d.remainder.1234|
000002a0: 2e 31 32 35 0e 74 6f 46 69 78 65 64 0e 31 32 33 |.125.toFixed.123|
000002b0: 34 2e 31 33 08 64 6f 77 6e 0e 31 32 33 34 2e 31 |4.13.down.1234.1|
000002c0: 32 1a 74 6f 45 78 70 6f 6e 65 6e 74 69 61 6c 16 |2.toExponential.|
000002d0: 31 2e 32 33 34 31 32 35 65 2b 33 14 31 2e 32 33 |1.234125e+3.1.23|
000002e0: 34 31 33 65 2b 33 08 52 4e 44 5a 14 31 2e 32 33 |413e+3.RNDZ.1.23|
000002f0: 34 31 32 65 2b 33 16 74 6f 50 72 65 63 69 73 69 |412e+3.toPrecisi|
00000300: 6f 6e 0e 31 32 33 2e 34 33 38 0e 33 32 33 2e 34 |on.123.438.323.4|
00000310: 33 38 0e 37 32 33 2e 34 33 38 0e 66 32 33 2e 34 |38.723.438.f23.4|
00000320: 33 38 0a 52 4e 44 4e 41 0c 31 32 33 2e 34 34 0c |38.RNDNA.123.44.|
00000330: 33 32 33 2e 34 34 0c 37 32 33 2e 34 34 0c 66 32 |323.44.723.44.f2|
00000340: 33 2e 34 34 10 30 2e 30 30 30 30 34 34 18 31 32 |3.44.0.000044.12|
00000350: 33 30 30 30 30 30 30 30 2e 30 0c 31 32 33 2e 34 |30000000.0.123.4|
00000360: 33 08 52 4e 44 44 0e 2d 66 32 33 2e 34 34 12 31 |3.RNDD.-f23.44.1|
00000370: 2e 32 33 34 34 70 2b 38 02 6d 14 42 69 67 44 65 |.2344p+8.m.BigDe|
00000380: 63 69 6d 61 6c 0c 31 32 33 34 2e 31 14 20 20 20 |cimal.1234.1.   |
00000390: 20 31 32 33 34 2e 31 18 20 20 20 20 31 32 33 34 | 1234.1.    1234|
000003a0: 2e 31 20 20 18 72 6f 75 6e 64 69 6e 67 4d 6f 64 |.1  .roundingMod|
000003b0: 65 30 6d 61 78 69 6d 75 6d 53 69 67 6e 69 66 69 |e0maximumSignifi|
000003c0: 63 61 6e 74 44 69 67 69 74 73 2a 6d 61 78 69 6d |cantDigits*maxim|
000003d0: 75 6d 46 72 61 63 74 69 6f 6e 44 69 67 69 74 73 |umFractionDigits|
000003e0: 06 73 75 62 06 6d 75 6c 06 6d 6f 64 10 2d 31 32 |.sub.mul.mod.-12|
000003f0: 33 34 2e 31 33 0c 00 06 01 a4 01 00 02 00 03 00 |34.13...........|
00000400: 0a d6 01 02 a6 01 00 00 00 c8 03 03 00 03 40 e5 |..............@.|
00000410: 00 00 00 40 40 e6 00 00 00 40 40 e7 00 00 00 40 |...@@....@@....@|
00000420: 40 e8 00 00 00 40 40 e9 00 00 00 40 40 ea 00 00 |@....@@....@@...|
00000430: 00 40 40 eb 00 00 00 40 40 ec 00 00 00 40 40 ed |.@@....@@....@@.|
00000440: 00 00 00 40 40 ee 00 00 00 40 c2 00 41 e5 00 00 |...@@....@..A...|
00000450: 00 00 c2 01 41 e6 00 00 00 00 c2 02 41 e7 00 00 |....A.......A...|
00000460: 00 00 c2 03 41 e8 00 00 00 00 c2 04 41 e9 00 00 |....A.......A...|
00000470: 00 00 c2 05 41 ea 00 00 00 00 c2 06 41 eb 00 00 |....A.......A...|
00000480: 00 00 c2 07 41 ec 00 00 00 00 c2 08 41 ed 00 00 |....A.......A...|
00000490: 00 00 c2 09 41 ee 00 00 00 00 04 ef 00 00 00 cb |....A...........|
000004a0: 06 cb 6f 13 00 00 00 39 f0 00 00 00 04 f1 00 00 |..o....9........|
000004b0: 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 |.......o.......0|
000004c0: 39 e9 00 00 00 f0 cb 39 f2 00 00 00 f0 cb 39 ec |9......9......9.|
000004d0: 00 00 00 f0 cb 39 ed 00 00 00 f0 cb 39 ee 00 00 |.....9......9...|
000004e0: 00 f0 cf 28 e6 03 24 00 00 00 8c 01 06 00 00 0d |...(..$.........|
000004f0: 40 0c 34 18 00 0f 8a 04 23 1b 18 0d 17 1b 18 0d |@.4.....#.......|
00000500: 17 1b 1e 0d 1d 1b 1a 0d 19 1b 1e 00 0c 43 06 01 |.............C..|
00000510: ca 03 03 01 03 04 00 00 6f 04 e8 03 00 01 00 ea |........o.......|
00000520: 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 00 cb |....h...........|
00000530: c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 |.............)..|
00000540: ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 |./...+...K.....!|
00000550: d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 |...K.......C9...|
00000560: 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 |$...C9...$.....)|
00000570: 39 9f 00 00 00 04 f6 00 00 00 d4 9f 04 f7 00 00 |9...............|
00000580: 00 9f d5 ec 10 04 f8 00 00 00 d5 9f 04 f9 00 00 |................|
00000590: 00 9f ee 06 39 2f 00 00 00 9f f1 30 e6 03 4a 05 |....9/.....0..J.|
000005a0: 00 12 10 07 12 0c 10 12 21 0e 00 07 16 07 07 12 |........!.......|
000005b0: 0d 09 00 07 0e 11 18 07 12 12 29 07 0e 2f 2c 07 |..........)../,.|
000005c0: 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 |.0Y...........).|
000005d0: 23 09 04 34 4e 07 03 20 16 08 51 2a 22 07 03 20 |#..4N.. ..Q*".. |
000005e0: 14 11 0a 1a 22 07 61 07 15 00 0c 43 06 01 cc 03 |....".a....C....|
000005f0: 02 02 02 04 00 00 31 04 f4 03 00 01 00 f6 03 00 |......1.........|
00000600: 01 00 f8 03 00 00 00 c8 03 03 00 03 09 cb 6f 0a |..............o.|
00000610: 00 00 00 d4 f0 0e 0e ee 17 cc 6f 13 00 00 00 0a |..........o.....|
00000620: cb 39 e5 00 00 00 c8 d3 a9 f1 0e 0e ee 02 30 39 |.9............09|
00000630: e5 00 00 00 c7 0a 04 fd 00 00 00 f3 29 e6 03 1a |............)...|
00000640: 15 00 05 08 27 08 07 08 3b 07 0d 00 1b 0e 07 1a |....'...;.......|
00000650: 07 15 07 05 22 13 1b 0e 25 01 00 0c 43 06 01 ce |...."...%...C...|
00000660: 03 02 02 02 03 00 00 5c 04 fc 03 00 01 00 fe 03 |.......\........|
00000670: 00 01 00 80 04 00 00 00 82 04 00 01 00 b4 01 00 |................|
00000680: 00 00 cb b4 00 00 00 00 cc c8 ec 05 d3 0e ee fa |................|
00000690: 39 e5 00 00 00 d3 39 02 01 00 00 a7 98 f1 0e 39 |9.....9........9|
000006a0: e5 00 00 00 39 02 01 00 00 d3 a8 f1 0e 39 e5 00 |....9........9..|
000006b0: 00 00 d3 39 02 01 00 00 a8 98 f1 0e 39 e5 00 00 |...9........9...|
000006c0: 00 d3 39 02 01 00 00 ac f1 0e 39 e5 00 00 00 d3 |..9.......9.....|
000006d0: 39 02 01 00 00 ab 98 f1 29 e6 03 3c 27 00 05 08 |9.......)..<'...|
000006e0: 21 08 20 10 11 06 17 1d 1b 12 07 08 1b 03 0c 09 |!. .............|
000006f0: 0d 0b 1b 0e 1b 0a 07 05 07 05 0d 0b 1b 12 07 0a |................|
00000700: 1b 05 0c 09 0d 0b 1b 0e 07 0a 1b 05 07 05 0d 0b |................|
00000710: 1b 12 07 0a 1b 05 0c 09 00 0c 43 06 01 d0 03 02 |..........C.....|
00000720: 00 02 03 00 00 48 02 fc 03 00 01 00 84 04 00 01 |.....H..........|
00000730: 00 39 e5 00 00 00 d3 d4 ab f1 0e 39 e5 00 00 00 |.9.........9....|
00000740: d4 d3 ab f1 0e 39 e5 00 00 00 d3 d4 ac 98 f1 0e |.....9..........|
00000750: 39 e5 00 00 00 d4 d3 ac 98 f1 0e 39 e5 00 00 00 |9..........9....|
00000760: d4 db f1 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 |....9.........9.|
00000770: 00 00 00 d3 d4 a7 98 f1 29 e6 03 44 34 00 04 08 |........)..D4...|
00000780: 1b 0e 07 0a 07 05 07 05 0d 0b 1b 0e 07 0a 07 05 |................|
00000790: 07 05 0d 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 12 |................|
000007a0: 07 0a 07 05 0c 09 0d 0b 1b 16 0c 09 0d 0b 1b 0e |................|
000007b0: 07 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c 09 |................|
000007c0: 00 0c 43 06 01 d2 03 00 02 00 04 00 06 d7 01 02 |..C.............|
000007d0: fc 03 00 00 00 80 04 00 01 00 39 03 01 00 00 b4 |..........9.....|
000007e0: 02 00 00 00 b4 03 00 00 00 f2 0e 39 e8 00 00 00 |...........9....|
000007f0: b4 03 00 00 00 b4 03 00 00 00 f2 0e 39 03 01 00 |............9...|
00000800: 00 b9 b4 03 00 00 00 f2 0e 39 e8 00 00 00 ba b4 |.........9......|
00000810: 03 00 00 00 f2 0e 39 03 01 00 00 c1 00 b4 03 00 |......9.........|
00000820: 00 00 f2 0e 39 e8 00 00 00 39 a5 00 00 00 43 04 |....9....9....C.|
00000830: 01 00 00 bb 24 01 00 b4 02 00 00 00 f2 0e 39 e7 |....$.........9.|
00000840: 00 00 00 b4 03 00 00 00 b4 64 00 00 00 f2 cb 39 |.........d.....9|
00000850: e5 00 00 00 c7 b4 01 00 00 00 a0 c7 ac f1 0e 39 |...............9|
00000860: e5 00 00 00 c7 c1 01 ab f1 0e 39 e5 00 00 00 c7 |..........9.....|
00000870: c1 02 ab f1 0e b4 01 00 00 00 cc 39 b9 00 00 00 |...........9....|
00000880: 04 05 01 00 00 f1 0e 39 e6 00 00 00 39 d2 00 00 |.......9....9...|
00000890: 00 c2 03 f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 |.....9....9.....|
000008a0: 04 f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 05 f2 |...9....9.......|
000008b0: 29 e6 03 5a 3f 00 00 00 08 08 4d 12 0d 11 4d 0e |)..Z?.....M...M.|
000008c0: 0e 0d 39 12 0d 11 39 0e 0e 0d 3e 12 0d 11 1b 10 |..9...9...>.....|
000008d0: 1b 08 20 0a 2a 13 0e 05 4d 14 0d 1b 1b 10 20 04 |.. .*...M..... .|
000008e0: 07 12 07 05 07 13 0d 0b 1b 0e 11 04 07 05 0d 0b |................|
000008f0: 1b 0e 11 04 07 05 0e 0b 20 14 34 0c 0d 1f 1b 1a |........ .4.....|
00000900: 25 01 0d 17 1b 1a 25 01 0d 17 1b 1a 25 01 00 06 |%.....%.....%...|
00000910: cd cc cc cc cc cc 00 40 0a 14 d1 13 38 cf 55 7d |.......@....8.U}|
00000920: 94 d6 75 f7 41 5b 56 68 37 67 ca 53 46 5a 0a 14 |..u.A[Vh7g.SFZ..|
00000930: d1 13 38 cf 55 7d 94 d6 75 f7 41 5b 56 68 37 67 |..8.U}..u.A[Vh7g|
00000940: ca 53 46 5a 0c 42 06 01 00 00 00 00 02 00 00 0c |.SFZ.B..........|
00000950: 00 39 b9 00 00 00 04 06 01 00 00 f1 29 e6 03 06 |.9..........)...|
00000960: 52 1e 02 10 34 0c 00 0c 42 06 01 00 00 00 00 02 |R...4...B.......|
00000970: 00 00 0c 00 39 b9 00 00 00 04 07 01 00 00 f1 29 |....9..........)|
00000980: e6 03 06 53 1e 02 10 34 0c 00 0c 42 06 01 00 00 |...S...4...B....|
00000990: 00 00 02 00 00 0c 00 39 b9 00 00 00 04 08 01 00 |.......9........|
000009a0: 00 f1 29 e6 03 06 54 1e 02 10 34 0c 00 0c 43 06 |..)...T...4...C.|
000009b0: 01 d4 03 04 03 04 05 00 00 44 07 92 04 00 01 00 |.........D......|
000009c0: fc 03 00 01 00 84 04 00 01 00 94 04 00 01 00 96 |................|
000009d0: 04 00 00 00 98 04 00 01 00 9a 04 00 02 00 39 b9 |..............9.|
000009e0: 00 00 00 d3 48 cb 39 b9 00 00 00 d3 04 0e 01 00 |....H.9.........|
000009f0: 00 9f 48 cc 39 e5 00 00 00 c7 d4 d5 f2 d6 ab f1 |..H.9...........|
00000a00: 0e c8 d4 d5 f2 cd 39 e5 00 00 00 c9 b7 48 d6 ab |......9......H..|
00000a10: f1 0e 39 e5 00 00 00 d4 d5 d6 9c c9 b8 48 9f ab |..9..........H..|
00000a20: f1 29 e6 03 48 57 00 05 14 1b 0e 07 01 0d 05 1b |.)..HW..........|
00000a30: 0e 20 0a 07 0b 0d 1d 1b 0e 07 08 07 06 07 07 07 |. ..............|
00000a40: 14 07 05 07 15 0d 03 07 0e 07 06 07 07 0d 13 1b |................|
00000a50: 0e 0c 02 07 0e 07 05 07 0b 0d 0b 1b 0e 07 0a 07 |................|
00000a60: 08 07 03 07 0c 0c 02 07 05 07 11 07 05 00 0c 43 |...............C|
00000a70: 06 01 d6 03 04 00 04 06 00 00 40 04 96 04 00 01 |..........@.....|
00000a80: 00 fc 03 00 01 00 84 04 00 01 00 80 04 00 01 00 |................|
00000a90: 39 ea 00 00 00 d3 d4 d5 d6 b7 48 22 04 00 0e 39 |9.........H"...9|
00000aa0: ea 00 00 00 d3 d4 8e d5 d6 b8 48 22 04 00 0e 39 |..........H"...9|
00000ab0: ea 00 00 00 d3 d4 d5 8e d6 b9 48 22 04 00 0e 39 |..........H"...9|
00000ac0: ea 00 00 00 d3 d4 8e d5 8e d6 ba 48 22 04 00 29 |...........H"..)|
00000ad0: e6 03 42 62 00 04 08 1b 18 07 0a 07 06 07 06 0c |..Bb............|
00000ae0: 02 07 19 17 15 1b 18 07 0c 07 01 07 08 07 06 0c |................|
00000af0: 02 07 1b 17 15 1b 18 07 0a 07 08 07 01 07 08 0c |................|
00000b00: 02 07 1b 17 15 1b 18 07 0c 07 01 07 0a 07 01 07 |................|
00000b10: 08 0c 02 07 1d 00 0c 43 06 01 d8 03 00 01 00 08 |.......C........|
00000b20: 00 05 c6 02 01 80 04 00 00 00 39 e5 00 00 00 39 |..........9....9|
00000b30: b9 00 00 00 43 0f 01 00 00 b4 00 00 00 00 24 01 |....C.........$.|
00000b40: 00 b4 01 00 00 00 8e ad f1 0e 39 e5 00 00 00 39 |..........9....9|
00000b50: b9 00 00 00 43 0f 01 00 00 b4 07 00 00 00 24 01 |....C.........$.|
00000b60: 00 b4 02 00 00 00 ad f1 0e 39 e5 00 00 00 39 b9 |.........9....9.|
00000b70: 00 00 00 43 04 01 00 00 c1 00 24 01 00 c1 01 ad |...C......$.....|
00000b80: f1 0e 39 b9 00 00 00 43 10 01 00 00 c1 02 24 01 |..9....C......$.|
00000b90: 00 cb 39 e5 00 00 00 c7 b7 48 c1 03 ad f1 0e 39 |..9......H.....9|
00000ba0: e5 00 00 00 c7 b8 48 c1 04 ad f1 0e 39 eb 00 00 |......H.....9...|
00000bb0: 00 04 11 01 00 00 b4 03 00 00 00 b4 02 00 00 00 |................|
00000bc0: b4 01 00 00 00 b4 01 00 00 00 8e b4 01 00 00 00 |................|
00000bd0: 8e b4 01 00 00 00 26 04 00 22 04 00 0e 39 eb 00 |......&.."...9..|
00000be0: 00 00 04 12 01 00 00 b4 03 00 00 00 b4 02 00 00 |................|
00000bf0: 00 b4 01 00 00 00 b4 02 00 00 00 8e b4 02 00 00 |................|
00000c00: 00 8e b4 01 00 00 00 26 04 00 22 04 00 0e 39 eb |.......&.."...9.|
00000c10: 00 00 00 04 13 01 00 00 b4 03 00 00 00 b4 02 00 |................|
00000c20: 00 00 b4 02 00 00 00 b4 01 00 00 00 8e b4 01 00 |................|
00000c30: 00 00 8e b4 02 00 00 00 26 04 00 22 04 00 0e 39 |........&.."...9|
00000c40: eb 00 00 00 04 14 01 00 00 b4 03 00 00 00 b4 02 |................|
00000c50: 00 00 00 b4 01 00 00 00 b4 02 00 00 00 8e b4 01 |................|
00000c60: 00 00 00 8e b4 02 00 00 00 26 04 00 22 04 00 29 |.........&.."..)|
00000c70: e6 03 62 6b 00 05 08 1b 0e 1b 0c 34 14 2a 12 07 |..bk.......4.*..|
00000c80: 07 07 2b 0d 0b 1b 0e 1b 0c 34 14 2a 0a 07 2b 0e |..+......4.*..+.|
00000c90: 0b 1b 0e 1b 0c 25 0a 1b 38 07 4f 0d 03 1b 0c 25 |.....%..8.O....%|
00000ca0: 10 17 23 1b 0e 0c 02 11 08 07 0b 0d 0b 1b 0e 0c |..#.............|
00000cb0: 02 11 08 07 0b 0e 0b 98 40 20 0a 2f 35 17 13 98 |........@ ./5...|
00000cc0: 40 20 0a 2f 35 17 13 98 40 20 0a 2f 35 17 13 98 |@ ./5...@ ./5...|
00000cd0: 40 20 0a 2f 35 00 0a 0c 00 00 00 00 00 00 00 c0 |@ ./5...........|
00000ce0: ff ff ff 00 0a 06 ff ff fd ff ff 0f 0a 0c 00 00 |................|
00000cf0: 00 00 00 00 00 c0 ff ff ff 00 0a 06 ff ff fd ff |................|
00000d00: ff 0f 0a 06 ff ff fb ff fb 1f 0c 43 06 01 da 03 |...........C....|
00000d10: 00 04 00 07 00 31 f6 0f 04 c8 03 00 00 00 fc 03 |.....1..........|
00000d20: 00 01 00 84 04 00 02 00 aa 04 00 03 00 39 e5 00 |.............9..|
00000d30: 00 00 b4 01 00 00 00 99 04 8e 00 00 00 ad f1 0e |................|
00000d40: 39 e5 00 00 00 b8 99 39 16 01 00 00 04 17 01 00 |9......9........|
00000d50: 00 ad f2 0e 39 e5 00 00 00 b8 b8 ab 39 16 01 00 |....9.......9...|
00000d60: 00 f2 0e 39 e5 00 00 00 b8 b8 ae 39 16 01 00 00 |...9.......9....|
00000d70: f2 0e 39 03 01 00 00 b9 39 16 01 00 00 ba 39 16 |..9.....9.....9.|
00000d80: 01 00 00 22 04 00 0e 39 e8 00 00 00 ba 39 16 01 |..."...9.....9..|
00000d90: 00 00 ba 39 16 01 00 00 22 04 00 0e 39 03 01 00 |...9...."...9...|
00000da0: 00 b9 ba 39 16 01 00 00 f3 0e 39 e8 00 00 00 ba |...9......9.....|
00000db0: ba 39 16 01 00 00 f3 0e 39 03 01 00 00 c1 00 ba |.9......9.......|
00000dc0: 39 16 01 00 00 f3 0e 39 e8 00 00 00 39 a5 00 00 |9......9....9...|
00000dd0: 00 43 04 01 00 00 bf 09 24 01 00 ba 39 16 01 00 |.C......$...9...|
00000de0: 00 f3 0e 39 03 01 00 00 b4 02 00 00 00 ba 39 16 |...9..........9.|
00000df0: 01 00 00 f3 0e 39 e8 00 00 00 b4 03 00 00 00 ba |.....9..........|
00000e00: 39 16 01 00 00 f3 0e 39 18 01 00 00 11 c0 80 00 |9......9........|
00000e10: 21 01 00 cb 39 e5 00 00 00 c7 42 19 01 00 00 c0 |!...9.....B.....|
00000e20: 80 00 ab f1 0e 39 1a 01 00 00 43 04 01 00 00 b9 |.....9....C.....|
00000e30: 39 16 01 00 00 c7 24 03 00 cc 39 e5 00 00 00 c8 |9.....$...9.....|
00000e40: 39 1a 01 00 00 43 1b 01 00 00 04 1c 01 00 00 b7 |9....C..........|
00000e50: c7 24 03 00 ad f1 0e 39 e5 00 00 00 c7 42 1d 01 |.$.....9.....B..|
00000e60: 00 00 0a ad f1 0e 39 e5 00 00 00 39 1a 01 00 00 |......9....9....|
00000e70: 43 1e 01 00 00 c8 24 01 00 b8 ab c1 01 39 1f 01 |C.....$......9..|
00000e80: 00 00 f3 0e 39 18 01 00 00 43 20 01 00 00 39 1a |....9....C ...9.|
00000e90: 01 00 00 42 04 01 00 00 43 21 01 00 00 07 b9 24 |...B....C!.....$|
00000ea0: 02 00 c0 80 00 24 02 00 cd 39 e5 00 00 00 c8 c9 |.....$...9......|
00000eb0: ad f1 0e 39 e5 00 00 00 39 1a 01 00 00 43 22 01 |...9....9....C".|
00000ec0: 00 00 39 1a 01 00 00 39 92 00 00 00 f1 24 01 00 |..9....9.....$..|
00000ed0: f1 0e 39 e5 00 00 00 39 1a 01 00 00 43 23 01 00 |..9....9....C#..|
00000ee0: 00 b8 39 16 01 00 00 24 02 00 f1 0e 39 e5 00 00 |..9....$....9...|
00000ef0: 00 39 1a 01 00 00 43 23 01 00 00 b8 39 16 01 00 |.9....C#....9...|
00000f00: 00 b7 9d 39 16 01 00 00 24 03 00 98 f1 0e 39 e5 |...9....$.....9.|
00000f10: 00 00 00 39 1a 01 00 00 43 24 01 00 00 bf fd 39 |...9....C$.....9|
00000f20: 16 01 00 00 24 02 00 ba ad 39 16 01 00 00 f2 0e |....$....9......|
00000f30: 39 e5 00 00 00 39 1a 01 00 00 43 25 01 00 00 bf |9....9....C%....|
00000f40: fd 39 16 01 00 00 24 02 00 b6 ad 39 16 01 00 00 |.9....$....9....|
00000f50: f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 26 01 00 |..9....9....C&..|
00000f60: 00 c1 02 39 16 01 00 00 24 02 00 c1 03 ad 39 16 |...9....$.....9.|
00000f70: 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 |.....9....9....C|
00000f80: 27 01 00 00 ba 39 16 01 00 00 24 02 00 c1 04 ad |'....9....$.....|
00000f90: 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 |9......9....9...|
00000fa0: 00 43 28 01 00 00 c1 05 39 16 01 00 00 c1 06 39 |.C(.....9......9|
00000fb0: 16 01 00 00 24 04 00 c1 07 ad 39 16 01 00 00 f2 |....$.....9.....|
00000fc0: 0e 39 e5 00 00 00 39 1a 01 00 00 43 29 01 00 00 |.9....9....C)...|
00000fd0: b6 39 16 01 00 00 24 02 00 c1 08 8e ad 39 16 01 |.9....$......9..|
00000fe0: 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 2a |....9....9....C*|
00000ff0: 01 00 00 b8 39 16 01 00 00 24 02 00 c1 09 ad 39 |....9....$.....9|
00001000: 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 |......9....9....|
00001010: 43 2b 01 00 00 c1 0a 39 16 01 00 00 24 02 00 c1 |C+.....9....$...|
00001020: 0b ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a |..9......9....9.|
00001030: 01 00 00 43 2c 01 00 00 c1 0c 39 16 01 00 00 24 |...C,.....9....$|
00001040: 02 00 c1 0d ad 39 16 01 00 00 f2 0e 39 e5 00 00 |.....9......9...|
00001050: 00 39 1a 01 00 00 43 2d 01 00 00 c1 0e 39 16 01 |.9....C-.....9..|
00001060: 00 00 24 02 00 c1 0f ad 39 16 01 00 00 f2 0e 39 |..$.....9......9|
00001070: e5 00 00 00 39 1a 01 00 00 43 2e 01 00 00 c1 10 |....9....C......|
00001080: 39 16 01 00 00 24 02 00 c1 11 ad 39 16 01 00 00 |9....$.....9....|
00001090: f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 2f 01 00 |..9....9....C/..|
000010a0: 00 c1 12 39 16 01 00 00 c1 13 8e 39 16 01 00 00 |...9.......9....|
000010b0: 24 04 00 c1 14 ad 39 16 01 00 00 f2 0e 39 e5 00 |$.....9......9..|
000010c0: 00 00 39 1a 01 00 00 43 30 01 00 00 c1 15 39 16 |..9....C0.....9.|
000010d0: 01 00 00 24 02 00 b9 ad 39 16 01 00 00 f2 0e 39 |...$....9......9|
000010e0: e5 00 00 00 39 1a 01 00 00 43 31 01 00 00 c1 16 |....9....C1.....|
000010f0: 39 16 01 00 00 24 02 00 ba ad 39 16 01 00 00 f2 |9....$....9.....|
00001100: 0e 39 e5 00 00 00 39 1a 01 00 00 43 32 01 00 00 |.9....9....C2...|
00001110: c1 17 8e 39 16 01 00 00 24 02 00 bf fe ad 39 16 |...9....$.....9.|
00001120: 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 |.....9....9....C|
00001130: 33 01 00 00 c1 18 39 16 01 00 00 24 02 00 ba ad |3.....9....$....|
00001140: 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 |9......9....9...|
00001150: 00 43 34 01 00 00 ba 39 16 01 00 00 b9 39 16 01 |.C4....9.....9..|
00001160: 00 00 24 04 00 b8 ad 39 16 01 00 00 f2 0e 39 e5 |..$....9......9.|
00001170: 00 00 00 39 1a 01 00 00 43 35 01 00 00 ba 39 16 |...9....C5....9.|
00001180: 01 00 00 b9 39 16 01 00 00 24 04 00 b6 ad 39 16 |....9....$....9.|
00001190: 01 00 00 f2 0e 39 e5 00 00 00 c1 19 39 16 01 00 |.....9......9...|
000011a0: 00 f2 43 39 00 00 00 24 00 00 0e 04 36 01 00 00 |..C9...$....6...|
000011b0: 0e 39 e5 00 00 00 c1 1a 39 16 01 00 00 f2 43 37 |.9......9.....C7|
000011c0: 01 00 00 b9 24 01 00 0e 04 38 01 00 00 0e 39 e5 |....$....8....9.|
000011d0: 00 00 00 c1 1b 39 16 01 00 00 f2 43 37 01 00 00 |.....9.....C7...|
000011e0: b9 04 39 01 00 00 24 02 00 0e 04 3a 01 00 00 0e |..9...$....:....|
000011f0: 39 e5 00 00 00 c1 1c 39 16 01 00 00 f2 43 3b 01 |9......9.....C;.|
00001200: 00 00 24 00 00 0e 04 3c 01 00 00 0e 39 e5 00 00 |..$....<....9...|
00001210: 00 c1 1d 39 16 01 00 00 f2 43 3b 01 00 00 bc 24 |...9.....C;....$|
00001220: 01 00 0e 04 3d 01 00 00 0e 39 e5 00 00 00 c1 1e |....=....9......|
00001230: 39 16 01 00 00 f2 43 3b 01 00 00 bc 39 18 01 00 |9.....C;....9...|
00001240: 00 42 3e 01 00 00 24 02 00 0e 04 3f 01 00 00 0e |.B>...$....?....|
00001250: 39 e5 00 00 00 c1 1f 39 16 01 00 00 f2 43 40 01 |9......9.....C@.|
00001260: 00 00 bd 24 01 00 0e 04 38 01 00 00 0e 39 e5 00 |...$....8....9..|
00001270: 00 00 c1 20 39 16 01 00 00 f2 43 40 01 00 00 bd |... 9.....C@....|
00001280: 39 18 01 00 00 42 3e 01 00 00 24 02 00 0e 04 3a |9....B>...$....:|
00001290: 01 00 00 0e 39 e5 00 00 00 c0 23 01 c1 21 39 16 |....9.....#..!9.|
000012a0: 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 0e 04 |....C9.....$....|
000012b0: 41 01 00 00 0e 39 e5 00 00 00 c0 23 03 c1 22 39 |A....9.....#.."9|
000012c0: 16 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 0e |.....C9.....$...|
000012d0: 04 42 01 00 00 0e 39 e5 00 00 00 c0 23 07 c1 23 |.B....9.....#..#|
000012e0: 39 16 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 |9.....C9.....$..|
000012f0: 0e 04 43 01 00 00 0e 39 e5 00 00 00 c0 23 0f c1 |..C....9.....#..|
00001300: 24 39 16 01 00 00 f3 43 39 00 00 00 bf 10 24 01 |$9.....C9.....$.|
00001310: 00 0e 04 44 01 00 00 0e 39 e5 00 00 00 c0 23 01 |...D....9.....#.|
00001320: c1 25 39 16 01 00 00 f3 43 37 01 00 00 b9 39 18 |.%9.....C7....9.|
00001330: 01 00 00 42 45 01 00 00 bf 10 24 03 00 0e 04 46 |...BE.....$....F|
00001340: 01 00 00 0e 39 e5 00 00 00 c0 23 03 c1 26 39 16 |....9.....#..&9.|
00001350: 01 00 00 f3 43 37 01 00 00 b9 39 18 01 00 00 42 |....C7....9....B|
00001360: 45 01 00 00 bf 10 24 03 00 0e 04 47 01 00 00 0e |E.....$....G....|
00001370: 39 e5 00 00 00 c0 23 07 c1 27 39 16 01 00 00 f3 |9.....#..'9.....|
00001380: 43 37 01 00 00 b9 39 18 01 00 00 42 45 01 00 00 |C7....9....BE...|
00001390: bf 10 24 03 00 0e 04 48 01 00 00 0e 39 e5 00 00 |..$....H....9...|
000013a0: 00 c0 23 0f c1 28 39 16 01 00 00 f3 43 37 01 00 |..#..(9.....C7..|
000013b0: 00 b9 39 18 01 00 00 42 45 01 00 00 bf 10 24 03 |..9....BE.....$.|
000013c0: 00 0e 04 49 01 00 00 0e 39 e5 00 00 00 b7 c1 29 |...I....9......)|
000013d0: 39 16 01 00 00 f3 43 37 01 00 00 bd 39 18 01 00 |9.....C7....9...|
000013e0: 00 42 45 01 00 00 bf 10 24 03 00 0e 04 4a 01 00 |.BE.....$....J..|
000013f0: 00 0e 39 e5 00 00 00 c1 2a 39 16 01 00 00 f2 43 |..9.....*9.....C|
00001400: 37 01 00 00 b8 39 18 01 00 00 42 45 01 00 00 bf |7....9....BE....|
00001410: 10 24 03 00 0e 04 4b 01 00 00 0e 39 e5 00 00 00 |.$....K....9....|
00001420: c0 23 01 c1 2b 39 16 01 00 00 f3 43 40 01 00 00 |.#..+9.....C@...|
00001430: bc 39 18 01 00 00 42 45 01 00 00 bf 10 24 03 00 |.9....BE.....$..|
00001440: 0e 04 46 01 00 00 0e 39 e5 00 00 00 c0 23 01 c1 |..F....9.....#..|
00001450: 2c 39 16 01 00 00 f3 43 40 01 00 00 bc 39 18 01 |,9.....C@....9..|
00001460: 00 00 42 3e 01 00 00 bf 10 24 03 00 0e 04 4c 01 |..B>.....$....L.|
00001470: 00 00 0e 39 e5 00 00 00 c0 23 03 c1 2d 39 16 01 |...9.....#..-9..|
00001480: 00 00 f3 43 40 01 00 00 bc 39 18 01 00 00 42 45 |...C@....9....BE|
00001490: 01 00 00 bf 10 24 03 00 0e 04 47 01 00 00 0e 39 |.....$....G....9|
000014a0: e5 00 00 00 c0 23 07 c1 2e 39 16 01 00 00 f3 43 |.....#...9.....C|
000014b0: 40 01 00 00 bc 39 18 01 00 00 42 45 01 00 00 bf |@....9....BE....|
000014c0: 10 24 03 00 0e 04 48 01 00 00 0e 39 e5 00 00 00 |.$....H....9....|
000014d0: c0 dd f0 c1 2f 39 16 01 00 00 f3 43 40 01 00 00 |..../9.....C@...|
000014e0: bc 39 18 01 00 00 42 4d 01 00 00 bf 10 24 03 00 |.9....BM.....$..|
000014f0: 0e 04 4e 01 00 00 0e 39 e5 00 00 00 c0 23 01 c1 |..N....9.....#..|
00001500: 30 39 16 01 00 00 f3 43 3b 01 00 00 bb 39 18 01 |09.....C;....9..|
00001510: 00 00 42 45 01 00 00 bf 10 24 03 00 0e 04 4f 01 |..BE.....$....O.|
00001520: 00 00 29 e6 03 c8 06 7c 00 00 00 08 08 34 22 25 |..)....|.....4"%|
00001530: 15 0d 0b 25 1e 34 04 07 15 0d 0b 25 12 07 0c 1b |...%.4.....%....|
00001540: 11 0d 0b 25 12 07 0e 1b 13 0e 0b 20 16 20 08 1b |...%....... . ..|
00001550: 0b 17 11 20 12 20 08 1b 0b 18 0d 25 1c 1b 09 0d |... . .....%....|
00001560: 11 25 18 1b 09 0e 0d 2a 20 1b 0d 0d 11 1b 10 1b |.%.....* .......|
00001570: 08 25 0a 16 0c 1b 1f 0e 0d 39 1e 1b 0b 0d 11 39 |.%.......9.....9|
00001580: 1a 1b 0b 0e 02 2f 16 17 25 1b 0e 07 02 2a 0c 07 |...../..%....*..|
00001590: 0f 0d 03 1b 10 20 0e 1b 06 07 09 17 21 1b 0e 07 |..... ......!...|
000015a0: 0c 1b 10 39 6e 07 57 11 2d 07 05 0d 0b 1b 0e 07 |...9n.W.-.......|
000015b0: 02 20 12 07 15 0d 0b 1b 0e 1b 10 1b 12 07 01 16 |. ..............|
000015c0: 08 11 10 1b 39 0e 03 1b 16 1b 12 1b 10 1b 0a 25 |....9..........%|
000015d0: 0a 20 25 17 2d 1b 0e 07 0c 07 07 07 05 0e 0b 1b |. %.-...........|
000015e0: 0e 1b 10 1b 0e 1b 12 1b 01 07 11 11 1d 0d 0b 1b |................|
000015f0: 0e 1b 10 20 16 1b 03 11 23 0d 0b 1b 10 1b 10 20 |... ....#...... |
00001600: 16 20 02 07 04 1b 09 16 25 0e 0b 1b 0e 1b 10 1b |. ......%.......|
00001610: 0a 0c 04 1b 05 16 0c 07 0a 1b 2f 0d 0b 1b 0e 1b |........../.....|
00001620: 10 1b 0c 0c 04 1b 05 11 14 07 07 07 0c 1b 33 0e |..............3.|
00001630: 0b 1b 0e 1b 10 25 10 1b 07 1b 0e 07 50 1b 77 0d |.....%......P.w.|
00001640: 0b 1b 0e 1b 10 20 0c 1b 03 1b 0a 07 50 1b 73 0d |..... ......P.s.|
00001650: 0b 1b 0e 1b 10 25 10 25 0c 1b 13 1b 1a 07 4e 1b |.....%.%......N.|
00001660: 81 01 0e 0b 1b 0e 1b 10 1b 0a 07 04 1b 05 1b 14 |................|
00001670: 07 07 07 50 1b 75 0d 0b 1b 0e 1b 10 20 0c 1b 03 |...P.u...... ...|
00001680: 1b 0a 07 50 1b 73 0d 0b 1b 0e 1b 10 25 10 1b 07 |...P.s......%...|
00001690: 1b 0e 07 52 1b 79 0e 0b 1b 0e 1b 10 25 12 1b 07 |...R.y......%...|
000016a0: 1b 0e 07 52 1b 7b 0d 0b 1b 0e 1b 10 25 12 1b 07 |...R.{......%...|
000016b0: 1b 0e 07 50 1b 79 0d 0b 1b 0e 1b 10 25 12 1b 07 |...P.y......%...|
000016c0: 1b 0e 07 4e 1b 77 0d 0b 1b 0e 1b 10 25 14 25 06 |...N.w......%.%.|
000016d0: 07 08 1b 15 1b 1c 07 50 1b 89 01 0e 0b 1b 0e 1b |.......P........|
000016e0: 10 25 14 1b 07 16 0e 07 0a 1b 35 0d 0b 1b 0e 1b |.%........5.....|
000016f0: 10 25 12 1b 07 16 0e 07 0a 1b 33 0d 0b 1b 0e 1b |.%........3.....|
00001700: 10 25 0e 07 08 1b 09 11 18 0c 07 07 0c 1b 39 0d |.%............9.|
00001710: 0b 1b 0e 1b 10 25 14 1b 07 16 0e 07 0a 1b 35 0e |.....%........5.|
00001720: 0b 1b 0e 1b 10 20 0e 20 06 1b 09 16 10 07 0a 1b |..... . ........|
00001730: 35 0d 0b 1b 0e 1b 10 20 18 20 06 1b 09 11 18 07 |5...... . ......|
00001740: 07 07 0c 1b 41 0f 0b 25 20 1b 13 07 18 1b 12 35 |....A..% ......5|
00001750: 35 25 20 1b 13 07 18 20 10 35 33 25 20 1b 13 07 |5% .... .53% ...|
00001760: 18 39 10 35 33 25 20 1b 13 07 18 1b 1c 35 3f 25 |.9.53% ......5?%|
00001770: 20 1b 13 07 18 20 1c 35 3f 25 20 1b 13 07 18 20 | .... .5?% .... |
00001780: 24 1b 16 1b 1d 35 3f 25 20 1b 13 07 18 20 18 35 |$....5?% .... .5|
00001790: 3b 25 20 1b 13 07 18 20 20 1b 16 1b 1d 37 3b 34 |;% ....  ....7;4|
000017a0: 22 1b 15 07 1a 25 12 35 37 34 22 1b 15 07 1a 25 |"....%.574"....%|
000017b0: 12 35 37 34 22 1b 15 07 1a 25 12 35 37 34 22 1b |.574"....%.574".|
000017c0: 15 07 1a 25 12 35 37 34 22 1b 15 07 1a 20 18 1b |...%.574".... ..|
000017d0: 16 25 1d 35 35 34 22 1b 15 07 1a 20 18 1b 16 25 |.%.554".... ...%|
000017e0: 1d 35 35 34 22 1b 15 07 1a 20 18 1b 16 25 1d 35 |.554".... ...%.5|
000017f0: 35 34 22 1b 15 07 1a 20 18 1b 16 25 1d 35 35 2a |54".... ...%.55*|
00001800: 26 1b 19 07 1e 20 18 1b 16 25 1d 35 39 25 28 1b |&.... ...%.59%(.|
00001810: 1b 07 20 20 18 1b 16 25 1d 35 3b 34 22 1b 15 07 |..  ...%.5;4"...|
00001820: 1a 20 20 1b 16 25 1d 35 3d 34 22 1b 15 07 1a 20 |.  ..%.5=4".... |
00001830: 20 1b 16 25 1d 35 3d 34 22 1b 15 07 1a 20 20 1b | ..%.5=4"....  .|
00001840: 16 25 1d 35 3d 34 22 1b 15 07 1a 20 20 1b 16 25 |.%.5=4"....  ..%|
00001850: 1d 35 3d 1b 10 1b 14 1b 17 07 1c 20 20 1b 16 25 |.5=........  ..%|
00001860: 1d 35 3f 34 22 1b 15 07 1a 20 24 1b 16 25 1d 00 |.5?4".... $..%..|
00001870: 06 cd cc cc cc cc cc 00 40 06 33 33 33 33 33 33 |........@.333333|
00001880: e3 3f 06 9a 99 99 99 99 99 c9 3f 06 8d ac 58 9e |.?........?...X.|
00001890: dd 8a f3 3f 06 0b 03 ad 7a ea 93 f1 3f 06 cd cc |...?....z...?...|
000018a0: cc cc cc cc 00 40 06 9a 99 99 99 99 99 f9 3f 06 |.....@........?.|
000018b0: a6 45 40 40 72 38 0a 40 06 ee 0c 09 8f 54 ed ea |.E@@r8.@.....T..|
000018c0: 3f 06 8c 06 b5 0f 28 4a e1 3f 06 9a 99 99 99 99 |?.....(J.?......|
000018d0: 99 b9 3f 06 80 0b 43 77 88 af b9 3f 06 33 33 33 |..?...Cw...?.333|
000018e0: 33 33 33 d3 3f 06 ff f6 14 9e 15 80 d3 3f 06 9a |333.?........?..|
000018f0: 99 99 99 99 99 d9 3f 06 8b 5e 0a a4 68 8c f2 3f |......?..^..h..?|
00001900: 06 66 66 66 66 66 66 e6 3f 06 ad d4 7b 2d 11 8b |.ffffff.?...{-..|
00001910: e3 3f 06 66 66 66 66 66 66 1c 40 06 66 66 66 66 |.?.ffffff.@.ffff|
00001920: 66 66 14 40 06 96 c7 22 68 b5 8c 01 40 06 00 00 |ff.@..."h...@...|
00001930: 00 00 00 00 04 40 06 00 00 00 00 00 00 04 40 06 |.....@........@.|
00001940: 00 00 00 00 00 00 04 40 06 00 00 00 00 00 00 04 |.......@........|
00001950: 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 |@......H.@......|
00001960: 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 |H.@......H.@....|
00001970: 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 |..H.@......H.@..|
00001980: 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 |....H.@......H.@|
00001990: 06 00 00 00 00 80 48 93 40 06 d5 78 e9 26 31 08 |......H.@..x.&1.|
000019a0: dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 |.?..x.&1..?..x.&|
000019b0: 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 |1..?..x.&1..?..x|
000019c0: e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 |.&1..?..x.&1..?.|
000019d0: d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc |.x.&1..?..x.&1..|
000019e0: 3f 06 f3 69 5f 8a bc f6 06 3f 06 00 00 00 00 00 |?..i_....?......|
000019f0: 30 32 42 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 |02B..x.&1..?..x.|
00001a00: 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 |&1..?..x.&1..?..|
00001a10: 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f |x.&1..?..x.&1..?|
00001a20: 06 d5 78 e9 26 31 08 dc 3f 0c 43 06 01 dc 03 00 |..x.&1..?.C.....|
00001a30: 00 00 09 00 2a bc 0b 00 39 e5 00 00 00 b8 39 50 |....*...9.....9P|
00001a40: 01 00 00 b8 ad 39 50 01 00 00 f3 0e 39 e5 00 00 |.....9P.....9...|
00001a50: 00 b8 39 50 01 00 00 b9 ae 39 50 01 00 00 f3 0e |..9P.....9P.....|
00001a60: 39 03 01 00 00 b8 39 50 01 00 00 b9 39 50 01 00 |9.....9P....9P..|
00001a70: 00 22 04 00 0e 39 e8 00 00 00 b9 39 50 01 00 00 |."...9.....9P...|
00001a80: b9 39 50 01 00 00 22 04 00 0e 39 03 01 00 00 b8 |.9P..."...9.....|
00001a90: b9 39 50 01 00 00 f3 0e 39 e8 00 00 00 b9 b9 39 |.9P.....9......9|
00001aa0: 50 01 00 00 f3 0e 39 03 01 00 00 c1 00 b9 39 50 |P.....9.......9P|
00001ab0: 01 00 00 f3 0e 39 e8 00 00 00 39 a5 00 00 00 43 |.....9....9....C|
00001ac0: 04 01 00 00 bb 24 01 00 b9 39 50 01 00 00 f3 0e |.....$...9P.....|
00001ad0: 39 03 01 00 00 b4 02 00 00 00 ba 39 50 01 00 00 |9..........9P...|
00001ae0: f3 0e 39 e8 00 00 00 b4 03 00 00 00 ba 39 50 01 |..9..........9P.|
00001af0: 00 00 f3 0e 39 e5 00 00 00 39 51 01 00 00 04 52 |....9....9Q....R|
00001b00: 01 00 00 f1 c1 01 ad 39 50 01 00 00 f2 0e 39 e5 |.......9P.....9.|
00001b10: 00 00 00 39 51 01 00 00 04 53 01 00 00 f1 c1 02 |...9Q....S......|
00001b20: ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 01 |.9P.....9....9Q.|
00001b30: 00 00 04 54 01 00 00 f1 c1 03 ad 39 50 01 00 00 |...T.......9P...|
00001b40: f2 0e 39 e5 00 00 00 39 51 01 00 00 c1 04 f1 c1 |..9....9Q.......|
00001b50: 05 ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 |..9P.....9....9Q|
00001b60: 01 00 00 bf 7b f1 bf 7b ad 39 50 01 00 00 f2 0e |....{..{.9P.....|
00001b70: 39 e5 00 00 00 39 51 01 00 00 0a f1 b8 ad 39 50 |9....9Q.......9P|
00001b80: 01 00 00 f2 0e 39 e5 00 00 00 bf 7b 39 50 01 00 |.....9.....{9P..|
00001b90: 00 b8 9f 39 50 01 00 00 bf 7c ad 39 50 01 00 00 |...9P....|.9P...|
00001ba0: 22 04 00 0e 39 e5 00 00 00 bf 7b 39 50 01 00 00 |"...9.....{9P...|
00001bb0: b8 a0 39 50 01 00 00 bf 7a ad 39 50 01 00 00 22 |..9P....z.9P..."|
00001bc0: 04 00 0e 39 e5 00 00 00 c1 06 39 50 01 00 00 ba |...9......9P....|
00001bd0: 9c 39 50 01 00 00 c1 07 ad 39 50 01 00 00 22 04 |.9P......9P...".|
00001be0: 00 0e 39 e5 00 00 00 bf 0a 39 50 01 00 00 b9 9d |..9......9P.....|
00001bf0: 39 50 01 00 00 bc ad 39 50 01 00 00 22 04 00 0e |9P.....9P..."...|
00001c00: 39 e6 00 00 00 39 d0 00 00 00 c2 08 f2 0e 39 e5 |9....9........9.|
00001c10: 00 00 00 bf 0a 39 50 01 00 00 ba 9e 39 50 01 00 |.....9P.....9P..|
00001c20: 00 b8 ad 39 50 01 00 00 22 04 00 0e 39 e5 00 00 |...9P..."...9...|
00001c30: 00 bf f6 39 50 01 00 00 ba 9e 39 50 01 00 00 b6 |...9P.....9P....|
00001c40: ad 39 50 01 00 00 22 04 00 0e 39 e5 00 00 00 c1 |.9P..."...9.....|
00001c50: 09 39 50 01 00 00 ba a1 39 50 01 00 00 c1 0a ad |.9P.....9P......|
00001c60: 39 50 01 00 00 22 04 00 0e 39 e6 00 00 00 39 d0 |9P..."...9....9.|
00001c70: 00 00 00 c2 0b f2 0e 39 e6 00 00 00 39 d0 00 00 |.......9....9...|
00001c80: 00 c2 0c f2 0e 39 e5 00 00 00 39 51 01 00 00 43 |.....9....9Q...C|
00001c90: 04 01 00 00 b9 39 50 01 00 00 0b 39 55 01 00 00 |.....9P....9U...|
00001ca0: 4e 55 01 00 00 39 56 01 00 00 4e 56 01 00 00 24 |NU...9V...NV...$|
00001cb0: 03 00 c1 0d ad 39 50 01 00 00 f2 0e 39 e5 00 00 |.....9P.....9...|
00001cc0: 00 39 51 01 00 00 43 04 01 00 00 bf 65 39 50 01 |.9Q...C.....e9P.|
00001cd0: 00 00 0b 39 55 01 00 00 4e 55 01 00 00 39 57 01 |...9U...NU...9W.|
00001ce0: 00 00 4e 57 01 00 00 24 03 00 c1 0e ad 39 50 01 |..NW...$.....9P.|
00001cf0: 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 43 04 |....9....9Q...C.|
00001d00: 01 00 00 c1 0f 39 50 01 00 00 0b 39 55 01 00 00 |.....9P....9U...|
00001d10: 4e 55 01 00 00 39 57 01 00 00 4e 57 01 00 00 24 |NU...9W...NW...$|
00001d20: 03 00 c1 10 ad 39 50 01 00 00 f2 0e 39 e5 00 00 |.....9P.....9...|
00001d30: 00 39 51 01 00 00 43 33 01 00 00 c1 11 39 50 01 |.9Q...C3.....9P.|
00001d40: 00 00 0b 39 55 01 00 00 4e 55 01 00 00 39 57 01 |...9U...NU...9W.|
00001d50: 00 00 4e 57 01 00 00 24 03 00 c1 12 ad 39 50 01 |..NW...$.....9P.|
00001d60: 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 43 6a |....9....9Q...Cj|
00001d70: 00 00 00 c1 13 39 50 01 00 00 c1 14 39 50 01 00 |.....9P.....9P..|
00001d80: 00 0b 39 55 01 00 00 4e 55 01 00 00 39 57 01 00 |..9U...NU...9W..|
00001d90: 00 4e 57 01 00 00 24 05 00 c1 15 ad 39 50 01 00 |.NW...$.....9P..|
00001da0: 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 43 58 01 |...9....9Q...CX.|
00001db0: 00 00 c1 16 39 50 01 00 00 c1 17 39 50 01 00 00 |....9P.....9P...|
00001dc0: 0b 39 55 01 00 00 4e 55 01 00 00 39 57 01 00 00 |.9U...NU...9W...|
00001dd0: 4e 57 01 00 00 24 05 00 c1 18 ad 39 50 01 00 00 |NW...$.....9P...|
00001de0: f2 0e 39 e5 00 00 00 39 51 01 00 00 43 59 01 00 |..9....9Q...CY..|
00001df0: 00 c1 19 39 50 01 00 00 c1 1a 39 50 01 00 00 0b |...9P.....9P....|
00001e00: 39 55 01 00 00 4e 55 01 00 00 39 57 01 00 00 4e |9U...NU...9W...N|
00001e10: 57 01 00 00 24 05 00 c1 1b ad 39 50 01 00 00 f2 |W...$.....9P....|
00001e20: 0e 39 e5 00 00 00 39 51 01 00 00 43 5a 01 00 00 |.9....9Q...CZ...|
00001e30: c1 1c 39 50 01 00 00 c1 1d 39 50 01 00 00 0b 39 |..9P.....9P....9|
00001e40: 55 01 00 00 4e 55 01 00 00 39 57 01 00 00 4e 57 |U...NU...9W...NW|
00001e50: 01 00 00 24 05 00 c1 1e ad 39 50 01 00 00 f2 0e |...$.....9P.....|
00001e60: 39 e5 00 00 00 39 51 01 00 00 43 0b 01 00 00 bf |9....9Q...C.....|
00001e70: 14 39 50 01 00 00 ba 39 50 01 00 00 0b 39 55 01 |.9P....9P....9U.|
00001e80: 00 00 4e 55 01 00 00 39 56 01 00 00 4e 56 01 00 |..NU...9V...NV..|
00001e90: 00 24 05 00 c1 1f ad 39 50 01 00 00 f2 0e 39 e5 |.$.....9P.....9.|
00001ea0: 00 00 00 39 51 01 00 00 43 0b 01 00 00 bf 14 39 |...9Q...C......9|
00001eb0: 50 01 00 00 ba 39 50 01 00 00 0b 39 55 01 00 00 |P....9P....9U...|
00001ec0: 4e 55 01 00 00 39 57 01 00 00 4e 57 01 00 00 24 |NU...9W...NW...$|
00001ed0: 05 00 c1 20 ad 39 50 01 00 00 f2 0e 39 e5 00 00 |... .9P.....9...|
00001ee0: 00 c1 21 39 50 01 00 00 f2 43 39 00 00 00 24 00 |..!9P....C9...$.|
00001ef0: 00 0e 04 36 01 00 00 0e 39 e5 00 00 00 c1 22 39 |...6....9....."9|
00001f00: 50 01 00 00 f2 43 37 01 00 00 b9 24 01 00 0e 04 |P....C7....$....|
00001f10: 38 01 00 00 0e 39 e5 00 00 00 c1 23 39 50 01 00 |8....9.....#9P..|
00001f20: 00 f2 43 37 01 00 00 b9 04 39 01 00 00 24 02 00 |..C7.....9...$..|
00001f30: 0e 04 3a 01 00 00 0e 39 e5 00 00 00 c1 24 39 50 |..:....9.....$9P|
00001f40: 01 00 00 f2 43 3b 01 00 00 24 00 00 0e 04 3c 01 |....C;...$....<.|
00001f50: 00 00 0e 39 e5 00 00 00 c1 25 39 50 01 00 00 f2 |...9.....%9P....|
00001f60: 43 3b 01 00 00 bc 24 01 00 0e 04 3d 01 00 00 0e |C;....$....=....|
00001f70: 39 e5 00 00 00 c1 26 39 50 01 00 00 f2 43 3b 01 |9.....&9P....C;.|
00001f80: 00 00 bc 04 39 01 00 00 24 02 00 0e 04 3f 01 00 |....9...$....?..|
00001f90: 00 0e 39 e5 00 00 00 c1 27 39 50 01 00 00 f2 43 |..9.....'9P....C|
00001fa0: 40 01 00 00 bd 24 01 00 0e 04 38 01 00 00 0e 39 |@....$....8....9|
00001fb0: e5 00 00 00 c1 28 39 50 01 00 00 f2 43 40 01 00 |.....(9P....C@..|
00001fc0: 00 bd 04 39 01 00 00 24 02 00 0e 04 3a 01 00 00 |...9...$....:...|
00001fd0: 0e 39 e5 00 00 00 c1 29 8e 39 50 01 00 00 f2 43 |.9.....).9P....C|
00001fe0: 40 01 00 00 bd 04 30 01 00 00 24 02 00 0e 04 5b |@.....0...$....[|
00001ff0: 01 00 00 29 e6 03 b3 04 d4 01 00 04 08 20 10 20 |...)......... . |
00002000: 04 07 0a 1b 11 0d 0b 20 10 20 04 07 0a 1b 11 0d |....... . ......|
00002010: 0b 20 16 20 08 1b 0b 17 11 20 12 20 08 1b 0b 18 |. . ..... . ....|
00002020: 0d 25 1c 1b 09 0d 11 25 18 1b 09 0e 0d 2a 20 1b |.%.....%.....* .|
00002030: 0d 0d 11 1b 10 1b 08 20 0a 16 0c 1b 1f 0e 0d 39 |....... .......9|
00002040: 1e 1b 0b 0d 11 39 1a 1b 0b 0e 0d 1b 0e 34 14 11 |.....9.......4..|
00002050: 16 07 14 1b 3f 0d 0b 1b 0e 34 14 11 1e 07 14 1b |....?....4......|
00002060: 47 0d 0b 1b 0e 34 14 11 22 07 14 1b 4b 0e 0b 1b |G....4.."...K...|
00002070: 0e 25 14 11 0c 07 0e 1b 2f 0d 0b 1b 0e 25 14 11 |.%....../....%..|
00002080: 0c 07 0e 1b 2f 0d 0b 1b 0e 20 14 0c 0e 07 0a 1b |..../.... ......|
00002090: 2d 0e 0b 25 14 20 04 07 06 25 04 07 0e 1b 23 17 |-..%. ...%....#.|
000020a0: 0b 25 14 20 04 07 06 25 04 07 0e 1b 23 18 0b 25 |.%. ...%....#..%|
000020b0: 14 20 04 07 06 25 04 07 0e 1b 23 17 0b 25 12 20 |. ...%....#..%. |
000020c0: 04 07 06 20 04 07 0a 1b 1d 17 0b 1b 1a 25 01 0e |... .........%..|
000020d0: 17 25 12 20 04 07 06 20 04 07 0a 1b 1d 17 0b 1b |.%. ... ........|
000020e0: 0e 0c 06 20 04 07 06 1b 0c 07 07 07 0c 1b 21 18 |... ..........!.|
000020f0: 0b 25 1a 20 04 07 08 25 04 07 24 1b 41 17 0b 1b |.%. ...%..$.A...|
00002100: 1a 25 01 0d 17 1b 1a 25 01 0e 17 1b 0e 1b 14 20 |.%.....%....... |
00002110: 0e 84 03 1d 34 07 12 00 05 03 65 0f 0b 1b 0e 1b |....4.....e.....|
00002120: 14 25 12 84 07 1d 2e 07 14 00 05 03 61 0f 0b 1b |.%..........a...|
00002130: 0e 1b 14 25 16 84 0b 1d 2e 07 12 00 05 03 5f 00 |...%.........._.|
00002140: 02 08 0b 1b 0e 1b 14 25 1c 84 0f 1d 2c 07 12 00 |.......%....,...|
00002150: 05 03 5f 00 02 08 0b 1b 0e 1b 14 25 18 25 14 84 |.._........%.%..|
00002160: 23 1d 36 07 10 00 05 03 63 0f 0b 1b 0e 1b 14 25 |#.6.....c......%|
00002170: 18 25 14 84 23 1d 36 07 10 00 05 03 63 0f 0b 1b |.%..#.6.....c...|
00002180: 0e 1b 14 25 18 25 14 84 23 1d 36 07 12 00 05 03 |...%.%..#.6.....|
00002190: 65 0f 0b 1b 0e 1b 14 25 18 25 14 84 23 1d 36 07 |e......%.%..#.6.|
000021a0: 14 00 05 03 67 0f 0b 1b 0e 1b 14 25 0e 20 08 84 |....g......%. ..|
000021b0: 0d 1d 36 07 10 00 05 03 63 0f 0b 1b 0e 1b 14 25 |..6.....c......%|
000021c0: 0e 20 08 84 0d 1d 30 08 1c 00 05 05 69 00 02 0c |. ....0.....i...|
000021d0: 0b 25 20 1b 13 07 18 1b 12 35 35 25 20 1b 13 07 |.% ......55% ...|
000021e0: 18 20 10 35 33 25 20 1b 13 07 18 39 10 35 33 25 |. .53% ....9.53%|
000021f0: 20 1b 13 07 18 1b 1c 35 3f 25 20 1b 13 07 18 20 | ......5?% .... |
00002200: 1c 35 3f 25 20 1b 13 07 18 39 1c 35 3f 25 20 1b |.5?% ....9.5?% .|
00002210: 13 07 18 20 18 35 3b 25 20 1b 13 07 18 39 18 35 |... .5;% ....9.5|
00002220: 3b 25 10 07 12 1b 15 07 1a 39 18 00 06 9a 99 99 |;%.......9......|
00002230: 99 99 99 f1 3f 06 66 66 66 66 66 48 93 40 06 66 |....?.fffffH.@.f|
00002240: 66 66 66 66 48 93 40 06 66 66 66 66 66 48 93 40 |ffffH.@.fffffH.@|
00002250: 06 9a 99 99 99 99 99 b9 3f 06 9a 99 99 99 99 99 |........?.......|
00002260: b9 3f 06 9a 99 99 99 99 99 09 40 06 33 33 33 33 |.?........@.3333|
00002270: 33 33 23 40 0c 42 06 01 00 00 00 00 02 00 00 0e |33#@.B..........|
00002280: 00 39 50 01 00 00 ba 9d 0e 39 50 01 00 00 29 e6 |.9P......9P...).|
00002290: 03 09 f1 01 1d 02 14 20 04 0c 06 00 06 00 00 00 |....... ........|
000022a0: 00 00 4a 93 40 06 00 00 e8 72 d7 08 dc 41 0c 42 |..J.@....r...A.B|
000022b0: 06 01 00 00 00 00 02 00 01 0f 00 39 50 01 00 00 |...........9P...|
000022c0: c1 00 a1 0e 39 50 01 00 00 29 e6 03 09 f7 01 1d |....9P...)......|
000022d0: 02 12 25 04 0c 0c 00 06 cd cc cc cc cc cc 08 40 |..%............@|
000022e0: 0c 42 06 01 00 00 00 00 02 00 00 0f 00 39 50 01 |.B...........9P.|
000022f0: 00 00 bf fd a1 0e 39 50 01 00 00 29 e6 03 0b f8 |......9P...)....|
00002300: 01 1d 02 12 1b 0a 0c 05 0c 0a 00 06 39 b4 c8 76 |............9..v|
00002310: be 9f f6 3f 06 9a 99 99 99 99 19 24 40 06 fc a9 |...?.......$@...|
00002320: f1 d2 4d 62 60 3f 06 0a d7 a3 70 3d 0a a7 3f 06 |..Mb`?....p=..?.|
00002330: 6e 86 1b f0 f9 21 09 40 06 89 41 60 e5 d0 22 09 |n....!.@..A`..".|
00002340: 40 06 6e 86 1b f0 f9 21 09 40 06 7d 5c 1b 2a c6 |@.n....!.@.}\.*.|
00002350: f9 d3 3f 06 9a 99 99 99 99 99 0b 40 06 6e 86 1b |..?........@.n..|
00002360: f0 f9 21 09 40 06 7d 5c 1b 2a c6 f9 d3 3f 06 8f |..!.@.}\.*...?..|
00002370: c2 f5 28 5c 8f 06 40 06 6e 86 1b f0 f9 21 09 40 |..(\..@.n....!.@|
00002380: 06 7d 5c 1b 2a c6 f9 d3 3f 06 31 08 ac 1c 5a 64 |.}\.*...?.1...Zd|
00002390: ef 3f 06 6e 86 1b f0 f9 21 09 40 06 b6 4a b0 38 |.?.n....!.@..J.8|
000023a0: 9c f9 d3 3f 06 cb a1 45 b6 f3 fd 94 3f 06 ae 47 |...?...E....?..G|
000023b0: e1 7a 14 ae 1a 40 06 ab aa aa aa aa aa 1a 40 06 |.z...@........@.|
000023c0: 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 |.....H.@......H.|
000023d0: 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 |@......H.@......|
000023e0: 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 |H.@......H.@....|
000023f0: 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 |..H.@......H.@..|
00002400: 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 |....H.@......H.@|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```