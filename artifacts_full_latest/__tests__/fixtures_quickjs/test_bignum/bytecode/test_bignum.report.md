# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/test_bignum.ts
**生成时间**: 2026-01-03T05:22:19.514Z

## 大小对比

- TypeScript编译器: 9222 字节
- WASM编译器: 5 字节
- 差异: 9217 字节 (184340.00%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_bignum.js",
      "offset": 177
    },
    {
      "index": 16,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 219
    },
    {
      "index": 17,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 226
    },
    {
      "index": 18,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "assertion failed, expected |",
      "offset": 235
    },
    {
      "index": 19,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 264
    },
    {
      "index": 20,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 266
    },
    {
      "index": 21,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 269
    },
    {
      "index": 22,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 271
    },
    {
      "index": 23,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 275
    },
    {
      "index": 24,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 280
    },
    {
      "index": 25,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 283
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 302
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 304
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 306
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 308
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 310
    },
    {
      "index": 31,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 312
    },
    {
      "index": 32,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 322
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 327
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 329
    },
    {
      "index": 35,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 331
    },
    {
      "index": 36,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 334
    },
    {
      "index": 37,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "div1",
      "offset": 343
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "q",
      "offset": 348
    },
    {
      "index": 39,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 350
    },
    {
      "index": 40,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "divrem",
      "offset": 354
    },
    {
      "index": 41,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 361
    },
    {
      "index": 42,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rem",
      "offset": 363
    },
    {
      "index": 43,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "floorLog2",
      "offset": 367
    },
    {
      "index": 44,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sqrtrem",
      "offset": 377
    },
    {
      "index": 45,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tdiv",
      "offset": 385
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdiv",
      "offset": 390
    },
    {
      "index": 47,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cdiv",
      "offset": 395
    },
    {
      "index": 48,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ediv",
      "offset": 400
    },
    {
      "index": 49,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "sqrt2",
      "offset": 405
    },
    {
      "index": 50,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 411
    },
    {
      "index": 51,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "bigfloat",
      "offset": 413
    },
    {
      "index": 52,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "BigFloatEnv",
      "offset": 422
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 434
    },
    {
      "index": 54,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "BigFloat",
      "offset": 439
    },
    {
      "index": 55,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 448
    },
    {
      "index": 56,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "0x1.6a09e667f3bcc908b2fb1366ea957d3e",
      "offset": 459
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "inexact",
      "offset": 496
    },
    {
      "index": 58,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "fpRound",
      "offset": 504
    },
    {
      "index": 59,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "a09e667f3bcc908b2fb1366ea95l",
      "offset": 512
    },
    {
      "index": 60,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "setPrec",
      "offset": 541
    },
    {
      "index": 61,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bind",
      "offset": 549
    },
    {
      "index": 62,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 554
    },
    {
      "index": 63,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 560
    },
    {
      "index": 64,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 569
    },
    {
      "index": 65,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sign",
      "offset": 573
    },
    {
      "index": 66,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "exp",
      "offset": 578
    },
    {
      "index": 67,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 582
    },
    {
      "index": 68,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 586
    },
    {
      "index": 69,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sin",
      "offset": 590
    },
    {
      "index": 70,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cos",
      "offset": 594
    },
    {
      "index": 71,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tan",
      "offset": 598
    },
    {
      "index": 72,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "asin",
      "offset": 602
    },
    {
      "index": 73,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "acos",
      "offset": 607
    },
    {
      "index": 74,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "atan",
      "offset": 612
    },
    {
      "index": 75,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "atan2",
      "offset": 617
    },
    {
      "index": 76,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 623
    },
    {
      "index": 77,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 629
    },
    {
      "index": 78,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "trunc",
      "offset": 634
    },
    {
      "index": 79,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 640
    },
    {
      "index": 80,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fmod",
      "offset": 646
    },
    {
      "index": 81,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "remainder",
      "offset": 651
    },
    {
      "index": 82,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "1234.125",
      "offset": 661
    },
    {
      "index": 83,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 670
    },
    {
      "index": 84,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.13",
      "offset": 678
    },
    {
      "index": 85,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "down",
      "offset": 686
    },
    {
      "index": 86,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.12",
      "offset": 691
    },
    {
      "index": 87,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "toExponential",
      "offset": 699
    },
    {
      "index": 88,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "1.234125e+3",
      "offset": 713
    },
    {
      "index": 89,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23413e+3",
      "offset": 725
    },
    {
      "index": 90,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDZ",
      "offset": 736
    },
    {
      "index": 91,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23412e+3",
      "offset": 741
    },
    {
      "index": 92,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 752
    },
    {
      "index": 93,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "123.438",
      "offset": 764
    },
    {
      "index": 94,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "323.438",
      "offset": 772
    },
    {
      "index": 95,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "723.438",
      "offset": 780
    },
    {
      "index": 96,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "f23.438",
      "offset": 788
    },
    {
      "index": 97,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "RNDNA",
      "offset": 796
    },
    {
      "index": 98,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.44",
      "offset": 802
    },
    {
      "index": 99,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "323.44",
      "offset": 809
    },
    {
      "index": 100,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "723.44",
      "offset": 816
    },
    {
      "index": 101,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "f23.44",
      "offset": 823
    },
    {
      "index": 102,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "0.000044",
      "offset": 830
    },
    {
      "index": 103,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "1230000000.0",
      "offset": 839
    },
    {
      "index": 104,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.43",
      "offset": 852
    },
    {
      "index": 105,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDD",
      "offset": 859
    },
    {
      "index": 106,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "-f23.44",
      "offset": 864
    },
    {
      "index": 107,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "1.2344p+8",
      "offset": 872
    },
    {
      "index": 108,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 882
    },
    {
      "index": 109,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BigDecimal",
      "offset": 884
    },
    {
      "index": 110,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "1234.1",
      "offset": 895
    },
    {
      "index": 111,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "    1234.1",
      "offset": 902
    },
    {
      "index": 112,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "    1234.1  ",
      "offset": 913
    },
    {
      "index": 113,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "roundingMode",
      "offset": 926
    },
    {
      "index": 114,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "maximumSignificantDigits",
      "offset": 939
    },
    {
      "index": 115,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "maximumFractionDigits",
      "offset": 964
    },
    {
      "index": 116,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 986
    },
    {
      "index": 117,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mul",
      "offset": 990
    },
    {
      "index": 118,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mod",
      "offset": 994
    },
    {
      "index": 119,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "-1234.13",
      "offset": 998
    }
  ],
  "functionHeader": {
    "offset": 1007,
    "tag": "0xc",
    "remaining": 8215
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

共发现 9222 个字节差异:

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
- ... (显示前20个差异，总共9222个)

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
000000b0: 32 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |2R__tests__/fixt|
000000c0: 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 73 |ures_quickjs/tes|
000000d0: 74 5f 62 69 67 6e 75 6d 2e 6a 73 0c 61 63 74 75 |t_bignum.js.actu|
000000e0: 61 6c 10 65 78 70 65 63 74 65 64 38 61 73 73 65 |al.expected8asse|
000000f0: 72 74 69 6f 6e 20 66 61 69 6c 65 64 2c 20 65 78 |rtion failed, ex|
00000100: 70 65 63 74 65 64 20 7c 02 7c 04 20 28 02 29 06 |pected |.|. (.).|
00000110: 65 72 72 08 66 75 6e 63 04 65 78 24 65 78 63 65 |err.func.ex$exce|
00000120: 70 74 69 6f 6e 20 65 78 70 65 63 74 65 64 02 61 |ption expected.a|
00000130: 02 6e 02 72 02 69 02 62 12 74 65 73 74 5f 6c 65 |.n.r.i.b.test_le|
00000140: 73 73 08 73 71 72 74 02 2b 02 2d 04 00 61 10 20 |ss.sqrt.+.-..a. |
00000150: 20 31 32 33 20 20 72 08 64 69 76 31 02 71 06 64 | 123  r.div1.q.d|
00000160: 69 76 0c 64 69 76 72 65 6d 02 74 06 72 65 6d 12 |iv.divrem.t.rem.|
00000170: 66 6c 6f 6f 72 4c 6f 67 32 0e 73 71 72 74 72 65 |floorLog2.sqrtre|
00000180: 6d 08 74 64 69 76 08 66 64 69 76 08 63 64 69 76 |m.tdiv.fdiv.cdiv|
00000190: 08 65 64 69 76 0a 73 71 72 74 32 02 6c 10 62 69 |.ediv.sqrt2.l.bi|
000001a0: 67 66 6c 6f 61 74 16 42 69 67 46 6c 6f 61 74 45 |gfloat.BigFloatE|
000001b0: 6e 76 08 70 72 65 63 10 42 69 67 46 6c 6f 61 74 |nv.prec.BigFloat|
000001c0: 14 70 61 72 73 65 46 6c 6f 61 74 48 30 78 31 2e |.parseFloatH0x1.|
000001d0: 36 61 30 39 65 36 36 37 66 33 62 63 63 39 30 38 |6a09e667f3bcc908|
000001e0: 62 32 66 62 31 33 36 36 65 61 39 35 37 64 33 65 |b2fb1366ea957d3e|
000001f0: 0e 69 6e 65 78 61 63 74 0e 66 70 52 6f 75 6e 64 |.inexact.fpRound|
00000200: 38 61 30 39 65 36 36 37 66 33 62 63 63 39 30 38 |8a09e667f3bcc908|
00000210: 62 32 66 62 31 33 36 36 65 61 39 35 6c 0e 73 65 |b2fb1366ea95l.se|
00000220: 74 50 72 65 63 08 62 69 6e 64 0a 69 73 4e 61 4e |tPrec.bind.isNaN|
00000230: 10 69 73 46 69 6e 69 74 65 06 61 62 73 08 73 69 |.isFinite.abs.si|
00000240: 67 6e 06 65 78 70 06 6c 6f 67 06 70 6f 77 06 73 |gn.exp.log.pow.s|
00000250: 69 6e 06 63 6f 73 06 74 61 6e 08 61 73 69 6e 08 |in.cos.tan.asin.|
00000260: 61 63 6f 73 08 61 74 61 6e 0a 61 74 61 6e 32 0a |acos.atan.atan2.|
00000270: 66 6c 6f 6f 72 08 63 65 69 6c 0a 74 72 75 6e 63 |floor.ceil.trunc|
00000280: 0a 72 6f 75 6e 64 08 66 6d 6f 64 12 72 65 6d 61 |.round.fmod.rema|
00000290: 69 6e 64 65 72 10 31 32 33 34 2e 31 32 35 0e 74 |inder.1234.125.t|
000002a0: 6f 46 69 78 65 64 0e 31 32 33 34 2e 31 33 08 64 |oFixed.1234.13.d|
000002b0: 6f 77 6e 0e 31 32 33 34 2e 31 32 1a 74 6f 45 78 |own.1234.12.toEx|
000002c0: 70 6f 6e 65 6e 74 69 61 6c 16 31 2e 32 33 34 31 |ponential.1.2341|
000002d0: 32 35 65 2b 33 14 31 2e 32 33 34 31 33 65 2b 33 |25e+3.1.23413e+3|
000002e0: 08 52 4e 44 5a 14 31 2e 32 33 34 31 32 65 2b 33 |.RNDZ.1.23412e+3|
000002f0: 16 74 6f 50 72 65 63 69 73 69 6f 6e 0e 31 32 33 |.toPrecision.123|
00000300: 2e 34 33 38 0e 33 32 33 2e 34 33 38 0e 37 32 33 |.438.323.438.723|
00000310: 2e 34 33 38 0e 66 32 33 2e 34 33 38 0a 52 4e 44 |.438.f23.438.RND|
00000320: 4e 41 0c 31 32 33 2e 34 34 0c 33 32 33 2e 34 34 |NA.123.44.323.44|
00000330: 0c 37 32 33 2e 34 34 0c 66 32 33 2e 34 34 10 30 |.723.44.f23.44.0|
00000340: 2e 30 30 30 30 34 34 18 31 32 33 30 30 30 30 30 |.000044.12300000|
00000350: 30 30 2e 30 0c 31 32 33 2e 34 33 08 52 4e 44 44 |00.0.123.43.RNDD|
00000360: 0e 2d 66 32 33 2e 34 34 12 31 2e 32 33 34 34 70 |.-f23.44.1.2344p|
00000370: 2b 38 02 6d 14 42 69 67 44 65 63 69 6d 61 6c 0c |+8.m.BigDecimal.|
00000380: 31 32 33 34 2e 31 14 20 20 20 20 31 32 33 34 2e |1234.1.    1234.|
00000390: 31 18 20 20 20 20 31 32 33 34 2e 31 20 20 18 72 |1.    1234.1  .r|
000003a0: 6f 75 6e 64 69 6e 67 4d 6f 64 65 30 6d 61 78 69 |oundingMode0maxi|
000003b0: 6d 75 6d 53 69 67 6e 69 66 69 63 61 6e 74 44 69 |mumSignificantDi|
000003c0: 67 69 74 73 2a 6d 61 78 69 6d 75 6d 46 72 61 63 |gits*maximumFrac|
000003d0: 74 69 6f 6e 44 69 67 69 74 73 06 73 75 62 06 6d |tionDigits.sub.m|
000003e0: 75 6c 06 6d 6f 64 10 2d 31 32 33 34 2e 31 33 0c |ul.mod.-1234.13.|
000003f0: 00 06 01 a4 01 00 02 00 03 00 0a d6 01 02 a6 01 |................|
00000400: 00 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 |........@....@@.|
00000410: 00 00 00 40 40 e7 00 00 00 40 40 e8 00 00 00 40 |...@@....@@....@|
00000420: 40 e9 00 00 00 40 40 ea 00 00 00 40 40 eb 00 00 |@....@@....@@...|
00000430: 00 40 40 ec 00 00 00 40 40 ed 00 00 00 40 40 ee |.@@....@@....@@.|
00000440: 00 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 e6 |...@..A.......A.|
00000450: 00 00 00 00 c2 02 41 e7 00 00 00 00 c2 03 41 e8 |......A.......A.|
00000460: 00 00 00 00 c2 04 41 e9 00 00 00 00 c2 05 41 ea |......A.......A.|
00000470: 00 00 00 00 c2 06 41 eb 00 00 00 00 c2 07 41 ec |......A.......A.|
00000480: 00 00 00 00 c2 08 41 ed 00 00 00 00 c2 09 41 ee |......A.......A.|
00000490: 00 00 00 00 04 ef 00 00 00 cb 06 cb 6f 13 00 00 |............o...|
000004a0: 00 39 f0 00 00 00 04 f1 00 00 00 f1 cb 0e ee 0b |.9..............|
000004b0: cc 6f 07 00 00 00 0e ee 02 30 39 e9 00 00 00 f0 |.o.......09.....|
000004c0: cb 39 f2 00 00 00 f0 cb 39 ec 00 00 00 f0 cb 39 |.9......9......9|
000004d0: ed 00 00 00 f0 cb 39 ee 00 00 00 f0 cf 28 e6 03 |......9......(..|
000004e0: 20 00 00 00 99 01 40 0c 34 18 00 0f 8a 04 23 1b | .....@.4.....#.|
000004f0: 18 0d 17 1b 18 0d 17 1b 1e 0d 1d 1b 1a 0d 19 1b |................|
00000500: 1e 00 0c 43 06 01 ca 03 03 01 03 04 00 00 6f 04 |...C..........o.|
00000510: e8 03 00 01 00 ea 03 00 01 00 68 00 01 00 9e 01 |..........h.....|
00000520: 00 01 00 0c 00 cb c7 eb b8 ab ec 03 0a d8 d3 d4 |................|
00000530: ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b |...).../...+...K|
00000540: 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 |.....!...K......|
00000550: d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 |.C9...$...C9...$|
00000560: 00 00 ad ec 02 29 39 9f 00 00 00 04 f6 00 00 00 |.....)9.........|
00000570: d4 9f 04 f7 00 00 00 9f d5 ec 10 04 f8 00 00 00 |................|
00000580: d5 9f 04 f9 00 00 00 9f ee 06 39 2f 00 00 00 9f |..........9/....|
00000590: f1 30 e6 03 4a 02 00 12 10 07 12 0c 10 12 21 0e |.0..J.........!.|
000005a0: 00 07 16 07 07 12 0d 09 00 07 0e 11 18 07 12 12 |................|
000005b0: 29 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 |)../,..0Y.......|
000005c0: 10 1b 12 11 29 12 23 09 04 34 4e 07 03 20 16 08 |....).#..4N.. ..|
000005d0: 51 2a 22 07 03 20 14 11 0a 1a 22 07 61 07 15 00 |Q*".. ....".a...|
000005e0: 0c 43 06 01 cc 03 02 02 02 04 00 00 31 04 f4 03 |.C..........1...|
000005f0: 00 01 00 f6 03 00 01 00 f8 03 00 00 00 c8 03 03 |................|
00000600: 00 03 09 cb 6f 0a 00 00 00 d4 f0 0e 0e ee 17 cc |....o...........|
00000610: 6f 13 00 00 00 0a cb 39 e5 00 00 00 c8 d3 a9 f1 |o......9........|
00000620: 0e 0e ee 02 30 39 e5 00 00 00 c7 0a 04 fd 00 00 |....09..........|
00000630: 00 f3 29 e6 03 1a 12 00 05 08 27 08 07 08 3b 07 |..).......'...;.|
00000640: 0d 00 1b 0e 07 1a 07 15 07 05 22 13 1b 0e 25 01 |.........."...%.|
00000650: 00 0c 43 06 01 ce 03 02 02 02 03 00 00 5c 04 fc |..C..........\..|
00000660: 03 00 01 00 fe 03 00 01 00 80 04 00 00 00 82 04 |................|
00000670: 00 01 00 b4 01 00 00 00 cb b4 00 00 00 00 cc c8 |................|
00000680: ec 05 d3 0e ee fa 39 e5 00 00 00 d3 39 02 01 00 |......9.....9...|
00000690: 00 a7 98 f1 0e 39 e5 00 00 00 39 02 01 00 00 d3 |.....9....9.....|
000006a0: a8 f1 0e 39 e5 00 00 00 d3 39 02 01 00 00 a8 98 |...9.....9......|
000006b0: f1 0e 39 e5 00 00 00 d3 39 02 01 00 00 ac f1 0e |..9.....9.......|
000006c0: 39 e5 00 00 00 d3 39 02 01 00 00 ab 98 f1 29 e6 |9.....9.......).|
000006d0: 03 3c 24 00 05 08 21 08 20 10 11 06 17 1d 1b 12 |.<$...!. .......|
000006e0: 07 08 1b 03 0c 09 0d 0b 1b 0e 1b 0a 07 05 07 05 |................|
000006f0: 0d 0b 1b 12 07 0a 1b 05 0c 09 0d 0b 1b 0e 07 0a |................|
00000700: 1b 05 07 05 0d 0b 1b 12 07 0a 1b 05 0c 09 00 0c |................|
00000710: 43 06 01 d0 03 02 00 02 03 00 00 48 02 fc 03 00 |C..........H....|
00000720: 01 00 84 04 00 01 00 39 e5 00 00 00 d3 d4 ab f1 |.......9........|
00000730: 0e 39 e5 00 00 00 d4 d3 ab f1 0e 39 e5 00 00 00 |.9.........9....|
00000740: d3 d4 ac 98 f1 0e 39 e5 00 00 00 d4 d3 ac 98 f1 |......9.........|
00000750: 0e 39 e5 00 00 00 d4 db f1 0e 39 e5 00 00 00 d4 |.9........9.....|
00000760: d3 a8 f1 0e 39 e5 00 00 00 d3 d4 a7 98 f1 29 e6 |....9.........).|
00000770: 03 44 31 00 04 08 1b 0e 07 0a 07 05 07 05 0d 0b |.D1.............|
00000780: 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 0a 07 05 |................|
00000790: 0c 09 0d 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 16 |................|
000007a0: 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 |................|
000007b0: 07 08 07 03 0c 09 00 0c 43 06 01 d2 03 00 02 00 |........C.......|
000007c0: 04 00 06 d7 01 02 fc 03 00 00 00 80 04 00 01 00 |................|
000007d0: 39 03 01 00 00 b4 02 00 00 00 b4 03 00 00 00 f2 |9...............|
000007e0: 0e 39 e8 00 00 00 b4 03 00 00 00 b4 03 00 00 00 |.9..............|
000007f0: f2 0e 39 03 01 00 00 b9 b4 03 00 00 00 f2 0e 39 |..9............9|
00000800: e8 00 00 00 ba b4 03 00 00 00 f2 0e 39 03 01 00 |............9...|
00000810: 00 c1 00 b4 03 00 00 00 f2 0e 39 e8 00 00 00 39 |..........9....9|
00000820: a5 00 00 00 43 04 01 00 00 bb 24 01 00 b4 02 00 |....C.....$.....|
00000830: 00 00 f2 0e 39 e7 00 00 00 b4 03 00 00 00 b4 64 |....9..........d|
00000840: 00 00 00 f2 cb 39 e5 00 00 00 c7 b4 01 00 00 00 |.....9..........|
00000850: a0 c7 ac f1 0e 39 e5 00 00 00 c7 c1 01 ab f1 0e |.....9..........|
00000860: 39 e5 00 00 00 c7 c1 02 ab f1 0e b4 01 00 00 00 |9...............|
00000870: cc 39 b9 00 00 00 04 05 01 00 00 f1 0e 39 e6 00 |.9...........9..|
00000880: 00 00 39 d2 00 00 00 c2 03 f2 0e 39 e6 00 00 00 |..9........9....|
00000890: 39 d2 00 00 00 c2 04 f2 0e 39 e6 00 00 00 39 d2 |9........9....9.|
000008a0: 00 00 00 c2 05 f2 29 e6 03 5a 3c 00 00 00 08 08 |......)..Z<.....|
000008b0: 4d 12 0d 11 4d 0e 0e 0d 39 12 0d 11 39 0e 0e 0d |M...M...9...9...|
000008c0: 3e 12 0d 11 1b 10 1b 08 20 0a 2a 13 0e 05 4d 14 |>....... .*...M.|
000008d0: 0d 1b 1b 10 20 04 07 12 07 05 07 13 0d 0b 1b 0e |.... ...........|
000008e0: 11 04 07 05 0d 0b 1b 0e 11 04 07 05 0e 0b 20 14 |.............. .|
000008f0: 34 0c 0d 1f 1b 1a 25 01 0d 17 1b 1a 25 01 0d 17 |4.....%.....%...|
00000900: 1b 1a 25 01 00 06 cd cc cc cc cc cc 00 40 0a 14 |..%..........@..|
00000910: d1 13 38 cf 55 7d 94 d6 75 f7 41 5b 56 68 37 67 |..8.U}..u.A[Vh7g|
00000920: ca 53 46 5a 0a 14 d1 13 38 cf 55 7d 94 d6 75 f7 |.SFZ....8.U}..u.|
00000930: 41 5b 56 68 37 67 ca 53 46 5a 0c 42 06 01 00 00 |A[Vh7g.SFZ.B....|
00000940: 00 00 02 00 00 0c 00 39 b9 00 00 00 04 06 01 00 |.......9........|
00000950: 00 f1 29 e6 03 06 4f 1e 02 10 34 0c 00 0c 42 06 |..)...O...4...B.|
00000960: 01 00 00 00 00 02 00 00 0c 00 39 b9 00 00 00 04 |..........9.....|
00000970: 07 01 00 00 f1 29 e6 03 06 50 1e 02 10 34 0c 00 |.....)...P...4..|
00000980: 0c 42 06 01 00 00 00 00 02 00 00 0c 00 39 b9 00 |.B...........9..|
00000990: 00 00 04 08 01 00 00 f1 29 e6 03 06 51 1e 02 10 |........)...Q...|
000009a0: 34 0c 00 0c 43 06 01 d4 03 04 03 04 05 00 00 44 |4...C..........D|
000009b0: 07 92 04 00 01 00 fc 03 00 01 00 84 04 00 01 00 |................|
000009c0: 94 04 00 01 00 96 04 00 00 00 98 04 00 01 00 9a |................|
000009d0: 04 00 02 00 39 b9 00 00 00 d3 48 cb 39 b9 00 00 |....9.....H.9...|
000009e0: 00 d3 04 0e 01 00 00 9f 48 cc 39 e5 00 00 00 c7 |........H.9.....|
000009f0: d4 d5 f2 d6 ab f1 0e c8 d4 d5 f2 cd 39 e5 00 00 |............9...|
00000a00: 00 c9 b7 48 d6 ab f1 0e 39 e5 00 00 00 d4 d5 d6 |...H....9.......|
00000a10: 9c c9 b8 48 9f ab f1 29 e6 03 48 54 00 05 14 1b |...H...)..HT....|
00000a20: 0e 07 01 0d 05 1b 0e 20 0a 07 0b 0d 1d 1b 0e 07 |....... ........|
00000a30: 08 07 06 07 07 07 14 07 05 07 15 0d 03 07 0e 07 |................|
00000a40: 06 07 07 0d 13 1b 0e 0c 02 07 0e 07 05 07 0b 0d |................|
00000a50: 0b 1b 0e 07 0a 07 08 07 03 07 0c 0c 02 07 05 07 |................|
00000a60: 11 07 05 00 0c 43 06 01 d6 03 04 00 04 06 00 00 |.....C..........|
00000a70: 40 04 96 04 00 01 00 fc 03 00 01 00 84 04 00 01 |@...............|
00000a80: 00 80 04 00 01 00 39 ea 00 00 00 d3 d4 d5 d6 b7 |......9.........|
00000a90: 48 22 04 00 0e 39 ea 00 00 00 d3 d4 8e d5 d6 b8 |H"...9..........|
00000aa0: 48 22 04 00 0e 39 ea 00 00 00 d3 d4 d5 8e d6 b9 |H"...9..........|
00000ab0: 48 22 04 00 0e 39 ea 00 00 00 d3 d4 8e d5 8e d6 |H"...9..........|
00000ac0: ba 48 22 04 00 29 e6 03 42 5f 00 04 08 1b 18 07 |.H"..)..B_......|
00000ad0: 0a 07 06 07 06 0c 02 07 19 17 15 1b 18 07 0c 07 |................|
00000ae0: 01 07 08 07 06 0c 02 07 1b 17 15 1b 18 07 0a 07 |................|
00000af0: 08 07 01 07 08 0c 02 07 1b 17 15 1b 18 07 0c 07 |................|
00000b00: 01 07 0a 07 01 07 08 0c 02 07 1d 00 0c 43 06 01 |.............C..|
00000b10: d8 03 00 01 00 08 00 05 c6 02 01 80 04 00 00 00 |................|
00000b20: 39 e5 00 00 00 39 b9 00 00 00 43 0f 01 00 00 b4 |9....9....C.....|
00000b30: 00 00 00 00 24 01 00 b4 01 00 00 00 8e ad f1 0e |....$...........|
00000b40: 39 e5 00 00 00 39 b9 00 00 00 43 0f 01 00 00 b4 |9....9....C.....|
00000b50: 07 00 00 00 24 01 00 b4 02 00 00 00 ad f1 0e 39 |....$..........9|
00000b60: e5 00 00 00 39 b9 00 00 00 43 04 01 00 00 c1 00 |....9....C......|
00000b70: 24 01 00 c1 01 ad f1 0e 39 b9 00 00 00 43 10 01 |$.......9....C..|
00000b80: 00 00 c1 02 24 01 00 cb 39 e5 00 00 00 c7 b7 48 |....$...9......H|
00000b90: c1 03 ad f1 0e 39 e5 00 00 00 c7 b8 48 c1 04 ad |.....9......H...|
00000ba0: f1 0e 39 eb 00 00 00 04 11 01 00 00 b4 03 00 00 |..9.............|
00000bb0: 00 b4 02 00 00 00 b4 01 00 00 00 b4 01 00 00 00 |................|
00000bc0: 8e b4 01 00 00 00 8e b4 01 00 00 00 26 04 00 22 |............&.."|
00000bd0: 04 00 0e 39 eb 00 00 00 04 12 01 00 00 b4 03 00 |...9............|
00000be0: 00 00 b4 02 00 00 00 b4 01 00 00 00 b4 02 00 00 |................|
00000bf0: 00 8e b4 02 00 00 00 8e b4 01 00 00 00 26 04 00 |.............&..|
00000c00: 22 04 00 0e 39 eb 00 00 00 04 13 01 00 00 b4 03 |"...9...........|
00000c10: 00 00 00 b4 02 00 00 00 b4 02 00 00 00 b4 01 00 |................|
00000c20: 00 00 8e b4 01 00 00 00 8e b4 02 00 00 00 26 04 |..............&.|
00000c30: 00 22 04 00 0e 39 eb 00 00 00 04 14 01 00 00 b4 |."...9..........|
00000c40: 03 00 00 00 b4 02 00 00 00 b4 01 00 00 00 b4 02 |................|
00000c50: 00 00 00 8e b4 01 00 00 00 8e b4 02 00 00 00 26 |...............&|
00000c60: 04 00 22 04 00 29 e6 03 62 68 00 05 08 1b 0e 1b |.."..)..bh......|
00000c70: 0c 34 14 2a 12 07 07 07 2b 0d 0b 1b 0e 1b 0c 34 |.4.*....+......4|
00000c80: 14 2a 0a 07 2b 0e 0b 1b 0e 1b 0c 25 0a 1b 38 07 |.*..+......%..8.|
00000c90: 4f 0d 03 1b 0c 25 10 17 23 1b 0e 0c 02 11 08 07 |O....%..#.......|
00000ca0: 0b 0d 0b 1b 0e 0c 02 11 08 07 0b 0e 0b 98 40 20 |..............@ |
00000cb0: 0a 2f 35 17 13 98 40 20 0a 2f 35 17 13 98 40 20 |./5...@ ./5...@ |
00000cc0: 0a 2f 35 17 13 98 40 20 0a 2f 35 00 0a 0c 00 00 |./5...@ ./5.....|
00000cd0: 00 00 00 00 00 c0 ff ff ff 00 0a 06 ff ff fd ff |................|
00000ce0: ff 0f 0a 0c 00 00 00 00 00 00 00 c0 ff ff ff 00 |................|
00000cf0: 0a 06 ff ff fd ff ff 0f 0a 06 ff ff fb ff fb 1f |................|
00000d00: 0c 43 06 01 da 03 00 04 00 07 00 31 f6 0f 04 c8 |.C.........1....|
00000d10: 03 00 00 00 fc 03 00 01 00 84 04 00 02 00 aa 04 |................|
00000d20: 00 03 00 39 e5 00 00 00 b4 01 00 00 00 99 04 8e |...9............|
00000d30: 00 00 00 ad f1 0e 39 e5 00 00 00 b8 99 39 16 01 |......9......9..|
00000d40: 00 00 04 17 01 00 00 ad f2 0e 39 e5 00 00 00 b8 |..........9.....|
00000d50: b8 ab 39 16 01 00 00 f2 0e 39 e5 00 00 00 b8 b8 |..9......9......|
00000d60: ae 39 16 01 00 00 f2 0e 39 03 01 00 00 b9 39 16 |.9......9.....9.|
00000d70: 01 00 00 ba 39 16 01 00 00 22 04 00 0e 39 e8 00 |....9...."...9..|
00000d80: 00 00 ba 39 16 01 00 00 ba 39 16 01 00 00 22 04 |...9.....9....".|
00000d90: 00 0e 39 03 01 00 00 b9 ba 39 16 01 00 00 f3 0e |..9......9......|
00000da0: 39 e8 00 00 00 ba ba 39 16 01 00 00 f3 0e 39 03 |9......9......9.|
00000db0: 01 00 00 c1 00 ba 39 16 01 00 00 f3 0e 39 e8 00 |......9......9..|
00000dc0: 00 00 39 a5 00 00 00 43 04 01 00 00 bf 09 24 01 |..9....C......$.|
00000dd0: 00 ba 39 16 01 00 00 f3 0e 39 03 01 00 00 b4 02 |..9......9......|
00000de0: 00 00 00 ba 39 16 01 00 00 f3 0e 39 e8 00 00 00 |....9......9....|
00000df0: b4 03 00 00 00 ba 39 16 01 00 00 f3 0e 39 18 01 |......9......9..|
00000e00: 00 00 11 c0 80 00 21 01 00 cb 39 e5 00 00 00 c7 |......!...9.....|
00000e10: 42 19 01 00 00 c0 80 00 ab f1 0e 39 1a 01 00 00 |B..........9....|
00000e20: 43 04 01 00 00 b9 39 16 01 00 00 c7 24 03 00 cc |C.....9.....$...|
00000e30: 39 e5 00 00 00 c8 39 1a 01 00 00 43 1b 01 00 00 |9.....9....C....|
00000e40: 04 1c 01 00 00 b7 c7 24 03 00 ad f1 0e 39 e5 00 |.......$.....9..|
00000e50: 00 00 c7 42 1d 01 00 00 0a ad f1 0e 39 e5 00 00 |...B........9...|
00000e60: 00 39 1a 01 00 00 43 1e 01 00 00 c8 24 01 00 b8 |.9....C.....$...|
00000e70: ab c1 01 39 1f 01 00 00 f3 0e 39 18 01 00 00 43 |...9......9....C|
00000e80: 20 01 00 00 39 1a 01 00 00 42 04 01 00 00 43 21 | ...9....B....C!|
00000e90: 01 00 00 07 b9 24 02 00 c0 80 00 24 02 00 cd 39 |.....$.....$...9|
00000ea0: e5 00 00 00 c8 c9 ad f1 0e 39 e5 00 00 00 39 1a |.........9....9.|
00000eb0: 01 00 00 43 22 01 00 00 39 1a 01 00 00 39 92 00 |...C"...9....9..|
00000ec0: 00 00 f1 24 01 00 f1 0e 39 e5 00 00 00 39 1a 01 |...$....9....9..|
00000ed0: 00 00 43 23 01 00 00 b8 39 16 01 00 00 24 02 00 |..C#....9....$..|
00000ee0: f1 0e 39 e5 00 00 00 39 1a 01 00 00 43 23 01 00 |..9....9....C#..|
00000ef0: 00 b8 39 16 01 00 00 b7 9d 39 16 01 00 00 24 03 |..9......9....$.|
00000f00: 00 98 f1 0e 39 e5 00 00 00 39 1a 01 00 00 43 24 |....9....9....C$|
00000f10: 01 00 00 bf fd 39 16 01 00 00 24 02 00 ba ad 39 |.....9....$....9|
00000f20: 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 |......9....9....|
00000f30: 43 25 01 00 00 bf fd 39 16 01 00 00 24 02 00 b6 |C%.....9....$...|
00000f40: ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 |.9......9....9..|
00000f50: 00 00 43 26 01 00 00 c1 02 39 16 01 00 00 24 02 |..C&.....9....$.|
00000f60: 00 c1 03 ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 |....9......9....|
00000f70: 39 1a 01 00 00 43 27 01 00 00 ba 39 16 01 00 00 |9....C'....9....|
00000f80: 24 02 00 c1 04 ad 39 16 01 00 00 f2 0e 39 e5 00 |$.....9......9..|
00000f90: 00 00 39 1a 01 00 00 43 28 01 00 00 c1 05 39 16 |..9....C(.....9.|
00000fa0: 01 00 00 c1 06 39 16 01 00 00 24 04 00 c1 07 ad |.....9....$.....|
00000fb0: 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 |9......9....9...|
00000fc0: 00 43 29 01 00 00 b6 39 16 01 00 00 24 02 00 c1 |.C)....9....$...|
00000fd0: 08 8e ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 |...9......9....9|
00000fe0: 1a 01 00 00 43 2a 01 00 00 b8 39 16 01 00 00 24 |....C*....9....$|
00000ff0: 02 00 c1 09 ad 39 16 01 00 00 f2 0e 39 e5 00 00 |.....9......9...|
00001000: 00 39 1a 01 00 00 43 2b 01 00 00 c1 0a 39 16 01 |.9....C+.....9..|
00001010: 00 00 24 02 00 c1 0b ad 39 16 01 00 00 f2 0e 39 |..$.....9......9|
00001020: e5 00 00 00 39 1a 01 00 00 43 2c 01 00 00 c1 0c |....9....C,.....|
00001030: 39 16 01 00 00 24 02 00 c1 0d ad 39 16 01 00 00 |9....$.....9....|
00001040: f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 2d 01 00 |..9....9....C-..|
00001050: 00 c1 0e 39 16 01 00 00 24 02 00 c1 0f ad 39 16 |...9....$.....9.|
00001060: 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 |.....9....9....C|
00001070: 2e 01 00 00 c1 10 39 16 01 00 00 24 02 00 c1 11 |......9....$....|
00001080: ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 |.9......9....9..|
00001090: 00 00 43 2f 01 00 00 c1 12 39 16 01 00 00 c1 13 |..C/.....9......|
000010a0: 8e 39 16 01 00 00 24 04 00 c1 14 ad 39 16 01 00 |.9....$.....9...|
000010b0: 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 30 01 |...9....9....C0.|
000010c0: 00 00 c1 15 39 16 01 00 00 24 02 00 b9 ad 39 16 |....9....$....9.|
000010d0: 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 |.....9....9....C|
000010e0: 31 01 00 00 c1 16 39 16 01 00 00 24 02 00 ba ad |1.....9....$....|
000010f0: 39 16 01 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 |9......9....9...|
00001100: 00 43 32 01 00 00 c1 17 8e 39 16 01 00 00 24 02 |.C2......9....$.|
00001110: 00 bf fe ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 |....9......9....|
00001120: 39 1a 01 00 00 43 33 01 00 00 c1 18 39 16 01 00 |9....C3.....9...|
00001130: 00 24 02 00 ba ad 39 16 01 00 00 f2 0e 39 e5 00 |.$....9......9..|
00001140: 00 00 39 1a 01 00 00 43 34 01 00 00 ba 39 16 01 |..9....C4....9..|
00001150: 00 00 b9 39 16 01 00 00 24 04 00 b8 ad 39 16 01 |...9....$....9..|
00001160: 00 00 f2 0e 39 e5 00 00 00 39 1a 01 00 00 43 35 |....9....9....C5|
00001170: 01 00 00 ba 39 16 01 00 00 b9 39 16 01 00 00 24 |....9.....9....$|
00001180: 04 00 b6 ad 39 16 01 00 00 f2 0e 39 e5 00 00 00 |....9......9....|
00001190: c1 19 39 16 01 00 00 f2 43 39 00 00 00 24 00 00 |..9.....C9...$..|
000011a0: 0e 04 36 01 00 00 0e 39 e5 00 00 00 c1 1a 39 16 |..6....9......9.|
000011b0: 01 00 00 f2 43 37 01 00 00 b9 24 01 00 0e 04 38 |....C7....$....8|
000011c0: 01 00 00 0e 39 e5 00 00 00 c1 1b 39 16 01 00 00 |....9......9....|
000011d0: f2 43 37 01 00 00 b9 04 39 01 00 00 24 02 00 0e |.C7.....9...$...|
000011e0: 04 3a 01 00 00 0e 39 e5 00 00 00 c1 1c 39 16 01 |.:....9......9..|
000011f0: 00 00 f2 43 3b 01 00 00 24 00 00 0e 04 3c 01 00 |...C;...$....<..|
00001200: 00 0e 39 e5 00 00 00 c1 1d 39 16 01 00 00 f2 43 |..9......9.....C|
00001210: 3b 01 00 00 bc 24 01 00 0e 04 3d 01 00 00 0e 39 |;....$....=....9|
00001220: e5 00 00 00 c1 1e 39 16 01 00 00 f2 43 3b 01 00 |......9.....C;..|
00001230: 00 bc 39 18 01 00 00 42 3e 01 00 00 24 02 00 0e |..9....B>...$...|
00001240: 04 3f 01 00 00 0e 39 e5 00 00 00 c1 1f 39 16 01 |.?....9......9..|
00001250: 00 00 f2 43 40 01 00 00 bd 24 01 00 0e 04 38 01 |...C@....$....8.|
00001260: 00 00 0e 39 e5 00 00 00 c1 20 39 16 01 00 00 f2 |...9..... 9.....|
00001270: 43 40 01 00 00 bd 39 18 01 00 00 42 3e 01 00 00 |C@....9....B>...|
00001280: 24 02 00 0e 04 3a 01 00 00 0e 39 e5 00 00 00 c0 |$....:....9.....|
00001290: 23 01 c1 21 39 16 01 00 00 f3 43 39 00 00 00 bf |#..!9.....C9....|
000012a0: 10 24 01 00 0e 04 41 01 00 00 0e 39 e5 00 00 00 |.$....A....9....|
000012b0: c0 23 03 c1 22 39 16 01 00 00 f3 43 39 00 00 00 |.#.."9.....C9...|
000012c0: bf 10 24 01 00 0e 04 42 01 00 00 0e 39 e5 00 00 |..$....B....9...|
000012d0: 00 c0 23 07 c1 23 39 16 01 00 00 f3 43 39 00 00 |..#..#9.....C9..|
000012e0: 00 bf 10 24 01 00 0e 04 43 01 00 00 0e 39 e5 00 |...$....C....9..|
000012f0: 00 00 c0 23 0f c1 24 39 16 01 00 00 f3 43 39 00 |...#..$9.....C9.|
00001300: 00 00 bf 10 24 01 00 0e 04 44 01 00 00 0e 39 e5 |....$....D....9.|
00001310: 00 00 00 c0 23 01 c1 25 39 16 01 00 00 f3 43 37 |....#..%9.....C7|
00001320: 01 00 00 b9 39 18 01 00 00 42 45 01 00 00 bf 10 |....9....BE.....|
00001330: 24 03 00 0e 04 46 01 00 00 0e 39 e5 00 00 00 c0 |$....F....9.....|
00001340: 23 03 c1 26 39 16 01 00 00 f3 43 37 01 00 00 b9 |#..&9.....C7....|
00001350: 39 18 01 00 00 42 45 01 00 00 bf 10 24 03 00 0e |9....BE.....$...|
00001360: 04 47 01 00 00 0e 39 e5 00 00 00 c0 23 07 c1 27 |.G....9.....#..'|
00001370: 39 16 01 00 00 f3 43 37 01 00 00 b9 39 18 01 00 |9.....C7....9...|
00001380: 00 42 45 01 00 00 bf 10 24 03 00 0e 04 48 01 00 |.BE.....$....H..|
00001390: 00 0e 39 e5 00 00 00 c0 23 0f c1 28 39 16 01 00 |..9.....#..(9...|
000013a0: 00 f3 43 37 01 00 00 b9 39 18 01 00 00 42 45 01 |..C7....9....BE.|
000013b0: 00 00 bf 10 24 03 00 0e 04 49 01 00 00 0e 39 e5 |....$....I....9.|
000013c0: 00 00 00 b7 c1 29 39 16 01 00 00 f3 43 37 01 00 |.....)9.....C7..|
000013d0: 00 bd 39 18 01 00 00 42 45 01 00 00 bf 10 24 03 |..9....BE.....$.|
000013e0: 00 0e 04 4a 01 00 00 0e 39 e5 00 00 00 c1 2a 39 |...J....9.....*9|
000013f0: 16 01 00 00 f2 43 37 01 00 00 b8 39 18 01 00 00 |.....C7....9....|
00001400: 42 45 01 00 00 bf 10 24 03 00 0e 04 4b 01 00 00 |BE.....$....K...|
00001410: 0e 39 e5 00 00 00 c0 23 01 c1 2b 39 16 01 00 00 |.9.....#..+9....|
00001420: f3 43 40 01 00 00 bc 39 18 01 00 00 42 45 01 00 |.C@....9....BE..|
00001430: 00 bf 10 24 03 00 0e 04 46 01 00 00 0e 39 e5 00 |...$....F....9..|
00001440: 00 00 c0 23 01 c1 2c 39 16 01 00 00 f3 43 40 01 |...#..,9.....C@.|
00001450: 00 00 bc 39 18 01 00 00 42 3e 01 00 00 bf 10 24 |...9....B>.....$|
00001460: 03 00 0e 04 4c 01 00 00 0e 39 e5 00 00 00 c0 23 |....L....9.....#|
00001470: 03 c1 2d 39 16 01 00 00 f3 43 40 01 00 00 bc 39 |..-9.....C@....9|
00001480: 18 01 00 00 42 45 01 00 00 bf 10 24 03 00 0e 04 |....BE.....$....|
00001490: 47 01 00 00 0e 39 e5 00 00 00 c0 23 07 c1 2e 39 |G....9.....#...9|
000014a0: 16 01 00 00 f3 43 40 01 00 00 bc 39 18 01 00 00 |.....C@....9....|
000014b0: 42 45 01 00 00 bf 10 24 03 00 0e 04 48 01 00 00 |BE.....$....H...|
000014c0: 0e 39 e5 00 00 00 c0 dd f0 c1 2f 39 16 01 00 00 |.9......../9....|
000014d0: f3 43 40 01 00 00 bc 39 18 01 00 00 42 4d 01 00 |.C@....9....BM..|
000014e0: 00 bf 10 24 03 00 0e 04 4e 01 00 00 0e 39 e5 00 |...$....N....9..|
000014f0: 00 00 c0 23 01 c1 30 39 16 01 00 00 f3 43 3b 01 |...#..09.....C;.|
00001500: 00 00 bb 39 18 01 00 00 42 45 01 00 00 bf 10 24 |...9....BE.....$|
00001510: 03 00 0e 04 4f 01 00 00 29 e6 03 c8 06 79 00 00 |....O...)....y..|
00001520: 00 08 08 34 22 25 15 0d 0b 25 1e 34 04 07 15 0d |...4"%...%.4....|
00001530: 0b 25 12 07 0c 1b 11 0d 0b 25 12 07 0e 1b 13 0e |.%.......%......|
00001540: 0b 20 16 20 08 1b 0b 17 11 20 12 20 08 1b 0b 18 |. . ..... . ....|
00001550: 0d 25 1c 1b 09 0d 11 25 18 1b 09 0e 0d 2a 20 1b |.%.....%.....* .|
00001560: 0d 0d 11 1b 10 1b 08 25 0a 16 0c 1b 1f 0e 0d 39 |.......%.......9|
00001570: 1e 1b 0b 0d 11 39 1a 1b 0b 0e 02 2f 16 17 25 1b |.....9...../..%.|
00001580: 0e 07 02 2a 0c 07 0f 0d 03 1b 10 20 0e 1b 06 07 |...*....... ....|
00001590: 09 17 21 1b 0e 07 0c 1b 10 39 6e 07 57 11 2d 07 |..!......9n.W.-.|
000015a0: 05 0d 0b 1b 0e 07 02 20 12 07 15 0d 0b 1b 0e 1b |....... ........|
000015b0: 10 1b 12 07 01 16 08 11 10 1b 39 0e 03 1b 16 1b |..........9.....|
000015c0: 12 1b 10 1b 0a 25 0a 20 25 17 2d 1b 0e 07 0c 07 |.....%. %.-.....|
000015d0: 07 07 05 0e 0b 1b 0e 1b 10 1b 0e 1b 12 1b 01 07 |................|
000015e0: 11 11 1d 0d 0b 1b 0e 1b 10 20 16 1b 03 11 23 0d |......... ....#.|
000015f0: 0b 1b 10 1b 10 20 16 20 02 07 04 1b 09 16 25 0e |..... . ......%.|
00001600: 0b 1b 0e 1b 10 1b 0a 0c 04 1b 05 16 0c 07 0a 1b |................|
00001610: 2f 0d 0b 1b 0e 1b 10 1b 0c 0c 04 1b 05 11 14 07 |/...............|
00001620: 07 07 0c 1b 33 0e 0b 1b 0e 1b 10 25 10 1b 07 1b |....3......%....|
00001630: 0e 07 50 1b 77 0d 0b 1b 0e 1b 10 20 0c 1b 03 1b |..P.w...... ....|
00001640: 0a 07 50 1b 73 0d 0b 1b 0e 1b 10 25 10 25 0c 1b |..P.s......%.%..|
00001650: 13 1b 1a 07 4e 1b 81 01 0e 0b 1b 0e 1b 10 1b 0a |....N...........|
00001660: 07 04 1b 05 1b 14 07 07 07 50 1b 75 0d 0b 1b 0e |.........P.u....|
00001670: 1b 10 20 0c 1b 03 1b 0a 07 50 1b 73 0d 0b 1b 0e |.. ......P.s....|
00001680: 1b 10 25 10 1b 07 1b 0e 07 52 1b 79 0e 0b 1b 0e |..%......R.y....|
00001690: 1b 10 25 12 1b 07 1b 0e 07 52 1b 7b 0d 0b 1b 0e |..%......R.{....|
000016a0: 1b 10 25 12 1b 07 1b 0e 07 50 1b 79 0d 0b 1b 0e |..%......P.y....|
000016b0: 1b 10 25 12 1b 07 1b 0e 07 4e 1b 77 0d 0b 1b 0e |..%......N.w....|
000016c0: 1b 10 25 14 25 06 07 08 1b 15 1b 1c 07 50 1b 89 |..%.%........P..|
000016d0: 01 0e 0b 1b 0e 1b 10 25 14 1b 07 16 0e 07 0a 1b |.......%........|
000016e0: 35 0d 0b 1b 0e 1b 10 25 12 1b 07 16 0e 07 0a 1b |5......%........|
000016f0: 33 0d 0b 1b 0e 1b 10 25 0e 07 08 1b 09 11 18 0c |3......%........|
00001700: 07 07 0c 1b 39 0d 0b 1b 0e 1b 10 25 14 1b 07 16 |....9......%....|
00001710: 0e 07 0a 1b 35 0e 0b 1b 0e 1b 10 20 0e 20 06 1b |....5...... . ..|
00001720: 09 16 10 07 0a 1b 35 0d 0b 1b 0e 1b 10 20 18 20 |......5...... . |
00001730: 06 1b 09 11 18 07 07 07 0c 1b 41 0f 0b 25 20 1b |..........A..% .|
00001740: 13 07 18 1b 12 35 35 25 20 1b 13 07 18 20 10 35 |.....55% .... .5|
00001750: 33 25 20 1b 13 07 18 39 10 35 33 25 20 1b 13 07 |3% ....9.53% ...|
00001760: 18 1b 1c 35 3f 25 20 1b 13 07 18 20 1c 35 3f 25 |...5?% .... .5?%|
00001770: 20 1b 13 07 18 20 24 1b 16 1b 1d 35 3f 25 20 1b | .... $....5?% .|
00001780: 13 07 18 20 18 35 3b 25 20 1b 13 07 18 20 20 1b |... .5;% ....  .|
00001790: 16 1b 1d 37 3b 34 22 1b 15 07 1a 25 12 35 37 34 |...7;4"....%.574|
000017a0: 22 1b 15 07 1a 25 12 35 37 34 22 1b 15 07 1a 25 |"....%.574"....%|
000017b0: 12 35 37 34 22 1b 15 07 1a 25 12 35 37 34 22 1b |.574"....%.574".|
000017c0: 15 07 1a 20 18 1b 16 25 1d 35 35 34 22 1b 15 07 |... ...%.554"...|
000017d0: 1a 20 18 1b 16 25 1d 35 35 34 22 1b 15 07 1a 20 |. ...%.554".... |
000017e0: 18 1b 16 25 1d 35 35 34 22 1b 15 07 1a 20 18 1b |...%.554".... ..|
000017f0: 16 25 1d 35 35 2a 26 1b 19 07 1e 20 18 1b 16 25 |.%.55*&.... ...%|
00001800: 1d 35 39 25 28 1b 1b 07 20 20 18 1b 16 25 1d 35 |.59%(...  ...%.5|
00001810: 3b 34 22 1b 15 07 1a 20 20 1b 16 25 1d 35 3d 34 |;4"....  ..%.5=4|
00001820: 22 1b 15 07 1a 20 20 1b 16 25 1d 35 3d 34 22 1b |"....  ..%.5=4".|
00001830: 15 07 1a 20 20 1b 16 25 1d 35 3d 34 22 1b 15 07 |...  ..%.5=4"...|
00001840: 1a 20 20 1b 16 25 1d 35 3d 1b 10 1b 14 1b 17 07 |.  ..%.5=.......|
00001850: 1c 20 20 1b 16 25 1d 35 3f 34 22 1b 15 07 1a 20 |.  ..%.5?4".... |
00001860: 24 1b 16 25 1d 00 06 cd cc cc cc cc cc 00 40 06 |$..%..........@.|
00001870: 33 33 33 33 33 33 e3 3f 06 9a 99 99 99 99 99 c9 |333333.?........|
00001880: 3f 06 8d ac 58 9e dd 8a f3 3f 06 0b 03 ad 7a ea |?...X....?....z.|
00001890: 93 f1 3f 06 cd cc cc cc cc cc 00 40 06 9a 99 99 |..?........@....|
000018a0: 99 99 99 f9 3f 06 a6 45 40 40 72 38 0a 40 06 ee |....?..E@@r8.@..|
000018b0: 0c 09 8f 54 ed ea 3f 06 8c 06 b5 0f 28 4a e1 3f |...T..?.....(J.?|
000018c0: 06 9a 99 99 99 99 99 b9 3f 06 80 0b 43 77 88 af |........?...Cw..|
000018d0: b9 3f 06 33 33 33 33 33 33 d3 3f 06 ff f6 14 9e |.?.333333.?.....|
000018e0: 15 80 d3 3f 06 9a 99 99 99 99 99 d9 3f 06 8b 5e |...?........?..^|
000018f0: 0a a4 68 8c f2 3f 06 66 66 66 66 66 66 e6 3f 06 |..h..?.ffffff.?.|
00001900: ad d4 7b 2d 11 8b e3 3f 06 66 66 66 66 66 66 1c |..{-...?.ffffff.|
00001910: 40 06 66 66 66 66 66 66 14 40 06 96 c7 22 68 b5 |@.ffffff.@..."h.|
00001920: 8c 01 40 06 00 00 00 00 00 00 04 40 06 00 00 00 |..@........@....|
00001930: 00 00 00 04 40 06 00 00 00 00 00 00 04 40 06 00 |....@........@..|
00001940: 00 00 00 00 00 04 40 06 00 00 00 00 80 48 93 40 |......@......H.@|
00001950: 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 |......H.@......H|
00001960: 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 |.@......H.@.....|
00001970: 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 |.H.@......H.@...|
00001980: 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 |...H.@......H.@.|
00001990: d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc |.x.&1..?..x.&1..|
000019a0: 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 |?..x.&1..?..x.&1|
000019b0: 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 |..?..x.&1..?..x.|
000019c0: 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 |&1..?..x.&1..?..|
000019d0: 78 e9 26 31 08 dc 3f 06 f3 69 5f 8a bc f6 06 3f |x.&1..?..i_....?|
000019e0: 06 00 00 00 00 00 30 32 42 06 d5 78 e9 26 31 08 |......02B..x.&1.|
000019f0: dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 |.?..x.&1..?..x.&|
00001a00: 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 |1..?..x.&1..?..x|
00001a10: e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 0c |.&1..?..x.&1..?.|
00001a20: 43 06 01 dc 03 00 00 00 09 00 2a bc 0b 00 39 e5 |C.........*...9.|
00001a30: 00 00 00 b8 39 50 01 00 00 b8 ad 39 50 01 00 00 |....9P.....9P...|
00001a40: f3 0e 39 e5 00 00 00 b8 39 50 01 00 00 b9 ae 39 |..9.....9P.....9|
00001a50: 50 01 00 00 f3 0e 39 03 01 00 00 b8 39 50 01 00 |P.....9.....9P..|
00001a60: 00 b9 39 50 01 00 00 22 04 00 0e 39 e8 00 00 00 |..9P..."...9....|
00001a70: b9 39 50 01 00 00 b9 39 50 01 00 00 22 04 00 0e |.9P....9P..."...|
00001a80: 39 03 01 00 00 b8 b9 39 50 01 00 00 f3 0e 39 e8 |9......9P.....9.|
00001a90: 00 00 00 b9 b9 39 50 01 00 00 f3 0e 39 03 01 00 |.....9P.....9...|
00001aa0: 00 c1 00 b9 39 50 01 00 00 f3 0e 39 e8 00 00 00 |....9P.....9....|
00001ab0: 39 a5 00 00 00 43 04 01 00 00 bb 24 01 00 b9 39 |9....C.....$...9|
00001ac0: 50 01 00 00 f3 0e 39 03 01 00 00 b4 02 00 00 00 |P.....9.........|
00001ad0: ba 39 50 01 00 00 f3 0e 39 e8 00 00 00 b4 03 00 |.9P.....9.......|
00001ae0: 00 00 ba 39 50 01 00 00 f3 0e 39 e5 00 00 00 39 |...9P.....9....9|
00001af0: 51 01 00 00 04 52 01 00 00 f1 c1 01 ad 39 50 01 |Q....R.......9P.|
00001b00: 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 04 53 |....9....9Q....S|
00001b10: 01 00 00 f1 c1 02 ad 39 50 01 00 00 f2 0e 39 e5 |.......9P.....9.|
00001b20: 00 00 00 39 51 01 00 00 04 54 01 00 00 f1 c1 03 |...9Q....T......|
00001b30: ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 01 |.9P.....9....9Q.|
00001b40: 00 00 c1 04 f1 c1 05 ad 39 50 01 00 00 f2 0e 39 |........9P.....9|
00001b50: e5 00 00 00 39 51 01 00 00 bf 7b f1 bf 7b ad 39 |....9Q....{..{.9|
00001b60: 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 |P.....9....9Q...|
00001b70: 0a f1 b8 ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 |....9P.....9....|
00001b80: bf 7b 39 50 01 00 00 b8 9f 39 50 01 00 00 bf 7c |.{9P.....9P....||
00001b90: ad 39 50 01 00 00 22 04 00 0e 39 e5 00 00 00 bf |.9P..."...9.....|
00001ba0: 7b 39 50 01 00 00 b8 a0 39 50 01 00 00 bf 7a ad |{9P.....9P....z.|
00001bb0: 39 50 01 00 00 22 04 00 0e 39 e5 00 00 00 c1 06 |9P..."...9......|
00001bc0: 39 50 01 00 00 ba 9c 39 50 01 00 00 c1 07 ad 39 |9P.....9P......9|
00001bd0: 50 01 00 00 22 04 00 0e 39 e5 00 00 00 bf 0a 39 |P..."...9......9|
00001be0: 50 01 00 00 b9 9d 39 50 01 00 00 bc ad 39 50 01 |P.....9P.....9P.|
00001bf0: 00 00 22 04 00 0e 39 e6 00 00 00 39 d0 00 00 00 |.."...9....9....|
00001c00: c2 08 f2 0e 39 e5 00 00 00 bf 0a 39 50 01 00 00 |....9......9P...|
00001c10: ba 9e 39 50 01 00 00 b8 ad 39 50 01 00 00 22 04 |..9P.....9P...".|
00001c20: 00 0e 39 e5 00 00 00 bf f6 39 50 01 00 00 ba 9e |..9......9P.....|
00001c30: 39 50 01 00 00 b6 ad 39 50 01 00 00 22 04 00 0e |9P.....9P..."...|
00001c40: 39 e5 00 00 00 c1 09 39 50 01 00 00 ba a1 39 50 |9......9P.....9P|
00001c50: 01 00 00 c1 0a ad 39 50 01 00 00 22 04 00 0e 39 |......9P..."...9|
00001c60: e6 00 00 00 39 d0 00 00 00 c2 0b f2 0e 39 e6 00 |....9........9..|
00001c70: 00 00 39 d0 00 00 00 c2 0c f2 0e 39 e5 00 00 00 |..9........9....|
00001c80: 39 51 01 00 00 43 04 01 00 00 b9 39 50 01 00 00 |9Q...C.....9P...|
00001c90: 0b 39 55 01 00 00 4e 55 01 00 00 39 56 01 00 00 |.9U...NU...9V...|
00001ca0: 4e 56 01 00 00 24 03 00 c1 0d ad 39 50 01 00 00 |NV...$.....9P...|
00001cb0: f2 0e 39 e5 00 00 00 39 51 01 00 00 43 04 01 00 |..9....9Q...C...|
00001cc0: 00 bf 65 39 50 01 00 00 0b 39 55 01 00 00 4e 55 |..e9P....9U...NU|
00001cd0: 01 00 00 39 57 01 00 00 4e 57 01 00 00 24 03 00 |...9W...NW...$..|
00001ce0: c1 0e ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 |...9P.....9....9|
00001cf0: 51 01 00 00 43 04 01 00 00 c1 0f 39 50 01 00 00 |Q...C......9P...|
00001d00: 0b 39 55 01 00 00 4e 55 01 00 00 39 57 01 00 00 |.9U...NU...9W...|
00001d10: 4e 57 01 00 00 24 03 00 c1 10 ad 39 50 01 00 00 |NW...$.....9P...|
00001d20: f2 0e 39 e5 00 00 00 39 51 01 00 00 43 33 01 00 |..9....9Q...C3..|
00001d30: 00 c1 11 39 50 01 00 00 0b 39 55 01 00 00 4e 55 |...9P....9U...NU|
00001d40: 01 00 00 39 57 01 00 00 4e 57 01 00 00 24 03 00 |...9W...NW...$..|
00001d50: c1 12 ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 |...9P.....9....9|
00001d60: 51 01 00 00 43 6a 00 00 00 c1 13 39 50 01 00 00 |Q...Cj.....9P...|
00001d70: c1 14 39 50 01 00 00 0b 39 55 01 00 00 4e 55 01 |..9P....9U...NU.|
00001d80: 00 00 39 57 01 00 00 4e 57 01 00 00 24 05 00 c1 |..9W...NW...$...|
00001d90: 15 ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 |..9P.....9....9Q|
00001da0: 01 00 00 43 58 01 00 00 c1 16 39 50 01 00 00 c1 |...CX.....9P....|
00001db0: 17 39 50 01 00 00 0b 39 55 01 00 00 4e 55 01 00 |.9P....9U...NU..|
00001dc0: 00 39 57 01 00 00 4e 57 01 00 00 24 05 00 c1 18 |.9W...NW...$....|
00001dd0: ad 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 01 |.9P.....9....9Q.|
00001de0: 00 00 43 59 01 00 00 c1 19 39 50 01 00 00 c1 1a |..CY.....9P.....|
00001df0: 39 50 01 00 00 0b 39 55 01 00 00 4e 55 01 00 00 |9P....9U...NU...|
00001e00: 39 57 01 00 00 4e 57 01 00 00 24 05 00 c1 1b ad |9W...NW...$.....|
00001e10: 39 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 |9P.....9....9Q..|
00001e20: 00 43 5a 01 00 00 c1 1c 39 50 01 00 00 c1 1d 39 |.CZ.....9P.....9|
00001e30: 50 01 00 00 0b 39 55 01 00 00 4e 55 01 00 00 39 |P....9U...NU...9|
00001e40: 57 01 00 00 4e 57 01 00 00 24 05 00 c1 1e ad 39 |W...NW...$.....9|
00001e50: 50 01 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 |P.....9....9Q...|
00001e60: 43 0b 01 00 00 bf 14 39 50 01 00 00 ba 39 50 01 |C......9P....9P.|
00001e70: 00 00 0b 39 55 01 00 00 4e 55 01 00 00 39 56 01 |...9U...NU...9V.|
00001e80: 00 00 4e 56 01 00 00 24 05 00 c1 1f ad 39 50 01 |..NV...$.....9P.|
00001e90: 00 00 f2 0e 39 e5 00 00 00 39 51 01 00 00 43 0b |....9....9Q...C.|
00001ea0: 01 00 00 bf 14 39 50 01 00 00 ba 39 50 01 00 00 |.....9P....9P...|
00001eb0: 0b 39 55 01 00 00 4e 55 01 00 00 39 57 01 00 00 |.9U...NU...9W...|
00001ec0: 4e 57 01 00 00 24 05 00 c1 20 ad 39 50 01 00 00 |NW...$... .9P...|
00001ed0: f2 0e 39 e5 00 00 00 c1 21 39 50 01 00 00 f2 43 |..9.....!9P....C|
00001ee0: 39 00 00 00 24 00 00 0e 04 36 01 00 00 0e 39 e5 |9...$....6....9.|
00001ef0: 00 00 00 c1 22 39 50 01 00 00 f2 43 37 01 00 00 |...."9P....C7...|
00001f00: b9 24 01 00 0e 04 38 01 00 00 0e 39 e5 00 00 00 |.$....8....9....|
00001f10: c1 23 39 50 01 00 00 f2 43 37 01 00 00 b9 04 39 |.#9P....C7.....9|
00001f20: 01 00 00 24 02 00 0e 04 3a 01 00 00 0e 39 e5 00 |...$....:....9..|
00001f30: 00 00 c1 24 39 50 01 00 00 f2 43 3b 01 00 00 24 |...$9P....C;...$|
00001f40: 00 00 0e 04 3c 01 00 00 0e 39 e5 00 00 00 c1 25 |....<....9.....%|
00001f50: 39 50 01 00 00 f2 43 3b 01 00 00 bc 24 01 00 0e |9P....C;....$...|
00001f60: 04 3d 01 00 00 0e 39 e5 00 00 00 c1 26 39 50 01 |.=....9.....&9P.|
00001f70: 00 00 f2 43 3b 01 00 00 bc 04 39 01 00 00 24 02 |...C;.....9...$.|
00001f80: 00 0e 04 3f 01 00 00 0e 39 e5 00 00 00 c1 27 39 |...?....9.....'9|
00001f90: 50 01 00 00 f2 43 40 01 00 00 bd 24 01 00 0e 04 |P....C@....$....|
00001fa0: 38 01 00 00 0e 39 e5 00 00 00 c1 28 39 50 01 00 |8....9.....(9P..|
00001fb0: 00 f2 43 40 01 00 00 bd 04 39 01 00 00 24 02 00 |..C@.....9...$..|
00001fc0: 0e 04 3a 01 00 00 0e 39 e5 00 00 00 c1 29 8e 39 |..:....9.....).9|
00001fd0: 50 01 00 00 f2 43 40 01 00 00 bd 04 30 01 00 00 |P....C@.....0...|
00001fe0: 24 02 00 0e 04 5b 01 00 00 29 e6 03 b3 04 d1 01 |$....[...)......|
00001ff0: 00 04 08 20 10 20 04 07 0a 1b 11 0d 0b 20 10 20 |... . ....... . |
00002000: 04 07 0a 1b 11 0d 0b 20 16 20 08 1b 0b 17 11 20 |....... . ..... |
00002010: 12 20 08 1b 0b 18 0d 25 1c 1b 09 0d 11 25 18 1b |. .....%.....%..|
00002020: 09 0e 0d 2a 20 1b 0d 0d 11 1b 10 1b 08 20 0a 16 |...* ........ ..|
00002030: 0c 1b 1f 0e 0d 39 1e 1b 0b 0d 11 39 1a 1b 0b 0e |.....9.....9....|
00002040: 0d 1b 0e 34 14 11 16 07 14 1b 3f 0d 0b 1b 0e 34 |...4......?....4|
00002050: 14 11 1e 07 14 1b 47 0d 0b 1b 0e 34 14 11 22 07 |......G....4..".|
00002060: 14 1b 4b 0e 0b 1b 0e 25 14 11 0c 07 0e 1b 2f 0d |..K....%....../.|
00002070: 0b 1b 0e 25 14 11 0c 07 0e 1b 2f 0d 0b 1b 0e 20 |...%....../.... |
00002080: 14 0c 0e 07 0a 1b 2d 0e 0b 25 14 20 04 07 06 25 |......-..%. ...%|
00002090: 04 07 0e 1b 23 17 0b 25 14 20 04 07 06 25 04 07 |....#..%. ...%..|
000020a0: 0e 1b 23 18 0b 25 14 20 04 07 06 25 04 07 0e 1b |..#..%. ...%....|
000020b0: 23 17 0b 25 12 20 04 07 06 20 04 07 0a 1b 1d 17 |#..%. ... ......|
000020c0: 0b 1b 1a 25 01 0e 17 25 12 20 04 07 06 20 04 07 |...%...%. ... ..|
000020d0: 0a 1b 1d 17 0b 1b 0e 0c 06 20 04 07 06 1b 0c 07 |......... ......|
000020e0: 07 07 0c 1b 21 18 0b 25 1a 20 04 07 08 25 04 07 |....!..%. ...%..|
000020f0: 24 1b 41 17 0b 1b 1a 25 01 0d 17 1b 1a 25 01 0e |$.A....%.....%..|
00002100: 17 1b 0e 1b 14 20 0e 84 03 1d 34 07 12 00 05 03 |..... ....4.....|
00002110: 65 0f 0b 1b 0e 1b 14 25 12 84 07 1d 2e 07 14 00 |e......%........|
00002120: 05 03 61 0f 0b 1b 0e 1b 14 25 16 84 0b 1d 2e 07 |..a......%......|
00002130: 12 00 05 03 5f 00 02 08 0b 1b 0e 1b 14 25 1c 84 |...._........%..|
00002140: 0f 1d 2c 07 12 00 05 03 5f 00 02 08 0b 1b 0e 1b |..,....._.......|
00002150: 14 25 18 25 14 84 23 1d 36 07 10 00 05 03 63 0f |.%.%..#.6.....c.|
00002160: 0b 1b 0e 1b 14 25 18 25 14 84 23 1d 36 07 10 00 |.....%.%..#.6...|
00002170: 05 03 63 0f 0b 1b 0e 1b 14 25 18 25 14 84 23 1d |..c......%.%..#.|
00002180: 36 07 12 00 05 03 65 0f 0b 1b 0e 1b 14 25 18 25 |6.....e......%.%|
00002190: 14 84 23 1d 36 07 14 00 05 03 67 0f 0b 1b 0e 1b |..#.6.....g.....|
000021a0: 14 25 0e 20 08 84 0d 1d 36 07 10 00 05 03 63 0f |.%. ....6.....c.|
000021b0: 0b 1b 0e 1b 14 25 0e 20 08 84 0d 1d 30 08 1c 00 |.....%. ....0...|
000021c0: 05 05 69 00 02 0c 0b 25 20 1b 13 07 18 1b 12 35 |..i....% ......5|
000021d0: 35 25 20 1b 13 07 18 20 10 35 33 25 20 1b 13 07 |5% .... .53% ...|
000021e0: 18 39 10 35 33 25 20 1b 13 07 18 1b 1c 35 3f 25 |.9.53% ......5?%|
000021f0: 20 1b 13 07 18 20 1c 35 3f 25 20 1b 13 07 18 39 | .... .5?% ....9|
00002200: 1c 35 3f 25 20 1b 13 07 18 20 18 35 3b 25 20 1b |.5?% .... .5;% .|
00002210: 13 07 18 39 18 35 3b 25 10 07 12 1b 15 07 1a 39 |...9.5;%.......9|
00002220: 18 00 06 9a 99 99 99 99 99 f1 3f 06 66 66 66 66 |..........?.ffff|
00002230: 66 48 93 40 06 66 66 66 66 66 48 93 40 06 66 66 |fH.@.fffffH.@.ff|
00002240: 66 66 66 48 93 40 06 9a 99 99 99 99 99 b9 3f 06 |fffH.@........?.|
00002250: 9a 99 99 99 99 99 b9 3f 06 9a 99 99 99 99 99 09 |.......?........|
00002260: 40 06 33 33 33 33 33 33 23 40 0c 42 06 01 00 00 |@.333333#@.B....|
00002270: 00 00 02 00 00 0e 00 39 50 01 00 00 ba 9d 0e 39 |.......9P......9|
00002280: 50 01 00 00 29 e6 03 09 ee 01 1d 02 14 20 04 0c |P...)........ ..|
00002290: 06 00 06 00 00 00 00 00 4a 93 40 06 00 00 e8 72 |........J.@....r|
000022a0: d7 08 dc 41 0c 42 06 01 00 00 00 00 02 00 01 0f |...A.B..........|
000022b0: 00 39 50 01 00 00 c1 00 a1 0e 39 50 01 00 00 29 |.9P.......9P...)|
000022c0: e6 03 09 f4 01 1d 02 12 25 04 0c 0c 00 06 cd cc |........%.......|
000022d0: cc cc cc cc 08 40 0c 42 06 01 00 00 00 00 02 00 |.....@.B........|
000022e0: 00 0f 00 39 50 01 00 00 bf fd a1 0e 39 50 01 00 |...9P.......9P..|
000022f0: 00 29 e6 03 0b f5 01 1d 02 12 1b 0a 0c 05 0c 0a |.)..............|
00002300: 00 06 39 b4 c8 76 be 9f f6 3f 06 9a 99 99 99 99 |..9..v...?......|
00002310: 19 24 40 06 fc a9 f1 d2 4d 62 60 3f 06 0a d7 a3 |.$@.....Mb`?....|
00002320: 70 3d 0a a7 3f 06 6e 86 1b f0 f9 21 09 40 06 89 |p=..?.n....!.@..|
00002330: 41 60 e5 d0 22 09 40 06 6e 86 1b f0 f9 21 09 40 |A`..".@.n....!.@|
00002340: 06 7d 5c 1b 2a c6 f9 d3 3f 06 9a 99 99 99 99 99 |.}\.*...?.......|
00002350: 0b 40 06 6e 86 1b f0 f9 21 09 40 06 7d 5c 1b 2a |.@.n....!.@.}\.*|
00002360: c6 f9 d3 3f 06 8f c2 f5 28 5c 8f 06 40 06 6e 86 |...?....(\..@.n.|
00002370: 1b f0 f9 21 09 40 06 7d 5c 1b 2a c6 f9 d3 3f 06 |...!.@.}\.*...?.|
00002380: 31 08 ac 1c 5a 64 ef 3f 06 6e 86 1b f0 f9 21 09 |1...Zd.?.n....!.|
00002390: 40 06 b6 4a b0 38 9c f9 d3 3f 06 cb a1 45 b6 f3 |@..J.8...?...E..|
000023a0: fd 94 3f 06 ae 47 e1 7a 14 ae 1a 40 06 ab aa aa |..?..G.z...@....|
000023b0: aa aa aa 1a 40 06 00 00 00 00 80 48 93 40 06 00 |....@......H.@..|
000023c0: 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 |....H.@......H.@|
000023d0: 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 |......H.@......H|
000023e0: 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 |.@......H.@.....|
000023f0: 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 |.H.@......H.@...|
00002400: 00 00 80 48 93 40                               |...H.@|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```