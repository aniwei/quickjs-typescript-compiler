# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_bignum.ts
**生成时间**: 2026-01-07T03:18:59.645Z

## 大小对比

- TypeScript编译器: 9211 字节
- WASM编译器: 5 字节
- 差异: 9206 字节 (184120.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 119,
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
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 125
    },
    {
      "index": 12,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 138
    },
    {
      "index": 13,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint2",
      "offset": 153
    },
    {
      "index": 14,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_bignum.js",
      "offset": 166
    },
    {
      "index": 15,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 214
    },
    {
      "index": 16,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 221
    },
    {
      "index": 17,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "assertion failed, expected |",
      "offset": 230
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 259
    },
    {
      "index": 19,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 261
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 264
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 266
    },
    {
      "index": 22,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 270
    },
    {
      "index": 23,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 275
    },
    {
      "index": 24,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 278
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 297
    },
    {
      "index": 26,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 299
    },
    {
      "index": 27,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 301
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 303
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 305
    },
    {
      "index": 30,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 307
    },
    {
      "index": 31,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 317
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 322
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 324
    },
    {
      "index": 34,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 326
    },
    {
      "index": 35,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 329
    },
    {
      "index": 36,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "div1",
      "offset": 338
    },
    {
      "index": 37,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "q",
      "offset": 343
    },
    {
      "index": 38,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 345
    },
    {
      "index": 39,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "divrem",
      "offset": 349
    },
    {
      "index": 40,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 356
    },
    {
      "index": 41,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rem",
      "offset": 358
    },
    {
      "index": 42,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "floorLog2",
      "offset": 362
    },
    {
      "index": 43,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sqrtrem",
      "offset": 372
    },
    {
      "index": 44,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tdiv",
      "offset": 380
    },
    {
      "index": 45,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdiv",
      "offset": 385
    },
    {
      "index": 46,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cdiv",
      "offset": 390
    },
    {
      "index": 47,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ediv",
      "offset": 395
    },
    {
      "index": 48,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "sqrt2",
      "offset": 400
    },
    {
      "index": 49,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 406
    },
    {
      "index": 50,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "bigfloat",
      "offset": 408
    },
    {
      "index": 51,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "BigFloatEnv",
      "offset": 417
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 429
    },
    {
      "index": 53,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "BigFloat",
      "offset": 434
    },
    {
      "index": 54,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 443
    },
    {
      "index": 55,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "0x1.6a09e667f3bcc908b2fb1366ea957d3e",
      "offset": 454
    },
    {
      "index": 56,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "inexact",
      "offset": 491
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "fpRound",
      "offset": 499
    },
    {
      "index": 58,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "a09e667f3bcc908b2fb1366ea95l",
      "offset": 507
    },
    {
      "index": 59,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "setPrec",
      "offset": 536
    },
    {
      "index": 60,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bind",
      "offset": 544
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 549
    },
    {
      "index": 62,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 555
    },
    {
      "index": 63,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 564
    },
    {
      "index": 64,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sign",
      "offset": 568
    },
    {
      "index": 65,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "exp",
      "offset": 573
    },
    {
      "index": 66,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 577
    },
    {
      "index": 67,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 581
    },
    {
      "index": 68,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sin",
      "offset": 585
    },
    {
      "index": 69,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cos",
      "offset": 589
    },
    {
      "index": 70,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tan",
      "offset": 593
    },
    {
      "index": 71,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "asin",
      "offset": 597
    },
    {
      "index": 72,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "acos",
      "offset": 602
    },
    {
      "index": 73,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "atan",
      "offset": 607
    },
    {
      "index": 74,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "atan2",
      "offset": 612
    },
    {
      "index": 75,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 618
    },
    {
      "index": 76,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 624
    },
    {
      "index": 77,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "trunc",
      "offset": 629
    },
    {
      "index": 78,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 635
    },
    {
      "index": 79,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fmod",
      "offset": 641
    },
    {
      "index": 80,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "remainder",
      "offset": 646
    },
    {
      "index": 81,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "1234.125",
      "offset": 656
    },
    {
      "index": 82,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 665
    },
    {
      "index": 83,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.13",
      "offset": 673
    },
    {
      "index": 84,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "down",
      "offset": 681
    },
    {
      "index": 85,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.12",
      "offset": 686
    },
    {
      "index": 86,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "toExponential",
      "offset": 694
    },
    {
      "index": 87,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "1.234125e+3",
      "offset": 708
    },
    {
      "index": 88,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23413e+3",
      "offset": 720
    },
    {
      "index": 89,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDZ",
      "offset": 731
    },
    {
      "index": 90,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23412e+3",
      "offset": 736
    },
    {
      "index": 91,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 747
    },
    {
      "index": 92,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "123.438",
      "offset": 759
    },
    {
      "index": 93,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "323.438",
      "offset": 767
    },
    {
      "index": 94,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "723.438",
      "offset": 775
    },
    {
      "index": 95,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "f23.438",
      "offset": 783
    },
    {
      "index": 96,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "RNDNA",
      "offset": 791
    },
    {
      "index": 97,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.44",
      "offset": 797
    },
    {
      "index": 98,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "323.44",
      "offset": 804
    },
    {
      "index": 99,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "723.44",
      "offset": 811
    },
    {
      "index": 100,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "f23.44",
      "offset": 818
    },
    {
      "index": 101,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "0.000044",
      "offset": 825
    },
    {
      "index": 102,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "1230000000.0",
      "offset": 834
    },
    {
      "index": 103,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.43",
      "offset": 847
    },
    {
      "index": 104,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDD",
      "offset": 854
    },
    {
      "index": 105,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "-f23.44",
      "offset": 859
    },
    {
      "index": 106,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "1.2344p+8",
      "offset": 867
    },
    {
      "index": 107,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 877
    },
    {
      "index": 108,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BigDecimal",
      "offset": 879
    },
    {
      "index": 109,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "1234.1",
      "offset": 890
    },
    {
      "index": 110,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "    1234.1",
      "offset": 897
    },
    {
      "index": 111,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "    1234.1  ",
      "offset": 908
    },
    {
      "index": 112,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "roundingMode",
      "offset": 921
    },
    {
      "index": 113,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "maximumSignificantDigits",
      "offset": 934
    },
    {
      "index": 114,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "maximumFractionDigits",
      "offset": 959
    },
    {
      "index": 115,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 981
    },
    {
      "index": 116,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mul",
      "offset": 985
    },
    {
      "index": 117,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mod",
      "offset": 989
    },
    {
      "index": 118,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "-1234.13",
      "offset": 993
    }
  ],
  "functionHeader": {
    "offset": 1002,
    "tag": "0xc",
    "remaining": 8209
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

共发现 9211 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x77 vs WASM=0x02
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
- ... (显示前20个差异，总共9211个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 77 02 65 0c 61 73 73 65 72 74 18 61 73 73 65 |.w.e.assert.asse|
00000010: 72 74 54 68 72 6f 77 73 14 62 69 67 69 6e 74 5f |rtThrows.bigint_|
00000020: 70 6f 77 0e 74 65 73 74 5f 65 71 18 74 65 73 74 |pow.test_eq.test|
00000030: 5f 62 69 67 69 6e 74 31 16 74 65 73 74 5f 64 69 |_bigint1.test_di|
00000040: 76 72 65 6d 14 74 65 73 74 5f 69 64 69 76 31 1e |vrem.test_idiv1.|
00000050: 74 65 73 74 5f 62 69 67 69 6e 74 5f 65 78 74 1a |test_bigint_ext.|
00000060: 74 65 73 74 5f 62 69 67 66 6c 6f 61 74 1e 74 65 |test_bigfloat.te|
00000070: 73 74 5f 62 69 67 64 65 63 69 6d 61 6c 18 5f 5f |st_bigdecimal.__|
00000080: 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f |loadScript.test_|
00000090: 61 73 73 65 72 74 2e 6a 73 18 74 65 73 74 5f 62 |assert.js.test_b|
000000a0: 69 67 69 6e 74 32 5e 5f 5f 74 65 73 74 73 5f 5f |igint2^__tests__|
000000b0: 2f 66 69 78 74 75 72 65 73 2f 71 75 69 63 6b 6a |/fixtures/quickj|
000000c0: 73 2d 74 65 73 74 73 2f 74 65 73 74 5f 62 69 67 |s-tests/test_big|
000000d0: 6e 75 6d 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 |num.js.actual.ex|
000000e0: 70 65 63 74 65 64 38 61 73 73 65 72 74 69 6f 6e |pected8assertion|
000000f0: 20 66 61 69 6c 65 64 2c 20 65 78 70 65 63 74 65 | failed, expecte|
00000100: 64 20 7c 02 7c 04 20 28 02 29 06 65 72 72 08 66 |d |.|. (.).err.f|
00000110: 75 6e 63 04 65 78 24 65 78 63 65 70 74 69 6f 6e |unc.ex$exception|
00000120: 20 65 78 70 65 63 74 65 64 02 61 02 6e 02 72 02 | expected.a.n.r.|
00000130: 69 02 62 12 74 65 73 74 5f 6c 65 73 73 08 73 71 |i.b.test_less.sq|
00000140: 72 74 02 2b 02 2d 04 00 61 10 20 20 31 32 33 20 |rt.+.-..a.  123 |
00000150: 20 72 08 64 69 76 31 02 71 06 64 69 76 0c 64 69 | r.div1.q.div.di|
00000160: 76 72 65 6d 02 74 06 72 65 6d 12 66 6c 6f 6f 72 |vrem.t.rem.floor|
00000170: 4c 6f 67 32 0e 73 71 72 74 72 65 6d 08 74 64 69 |Log2.sqrtrem.tdi|
00000180: 76 08 66 64 69 76 08 63 64 69 76 08 65 64 69 76 |v.fdiv.cdiv.ediv|
00000190: 0a 73 71 72 74 32 02 6c 10 62 69 67 66 6c 6f 61 |.sqrt2.l.bigfloa|
000001a0: 74 16 42 69 67 46 6c 6f 61 74 45 6e 76 08 70 72 |t.BigFloatEnv.pr|
000001b0: 65 63 10 42 69 67 46 6c 6f 61 74 14 70 61 72 73 |ec.BigFloat.pars|
000001c0: 65 46 6c 6f 61 74 48 30 78 31 2e 36 61 30 39 65 |eFloatH0x1.6a09e|
000001d0: 36 36 37 66 33 62 63 63 39 30 38 62 32 66 62 31 |667f3bcc908b2fb1|
000001e0: 33 36 36 65 61 39 35 37 64 33 65 0e 69 6e 65 78 |366ea957d3e.inex|
000001f0: 61 63 74 0e 66 70 52 6f 75 6e 64 38 61 30 39 65 |act.fpRound8a09e|
00000200: 36 36 37 66 33 62 63 63 39 30 38 62 32 66 62 31 |667f3bcc908b2fb1|
00000210: 33 36 36 65 61 39 35 6c 0e 73 65 74 50 72 65 63 |366ea95l.setPrec|
00000220: 08 62 69 6e 64 0a 69 73 4e 61 4e 10 69 73 46 69 |.bind.isNaN.isFi|
00000230: 6e 69 74 65 06 61 62 73 08 73 69 67 6e 06 65 78 |nite.abs.sign.ex|
00000240: 70 06 6c 6f 67 06 70 6f 77 06 73 69 6e 06 63 6f |p.log.pow.sin.co|
00000250: 73 06 74 61 6e 08 61 73 69 6e 08 61 63 6f 73 08 |s.tan.asin.acos.|
00000260: 61 74 61 6e 0a 61 74 61 6e 32 0a 66 6c 6f 6f 72 |atan.atan2.floor|
00000270: 08 63 65 69 6c 0a 74 72 75 6e 63 0a 72 6f 75 6e |.ceil.trunc.roun|
00000280: 64 08 66 6d 6f 64 12 72 65 6d 61 69 6e 64 65 72 |d.fmod.remainder|
00000290: 10 31 32 33 34 2e 31 32 35 0e 74 6f 46 69 78 65 |.1234.125.toFixe|
000002a0: 64 0e 31 32 33 34 2e 31 33 08 64 6f 77 6e 0e 31 |d.1234.13.down.1|
000002b0: 32 33 34 2e 31 32 1a 74 6f 45 78 70 6f 6e 65 6e |234.12.toExponen|
000002c0: 74 69 61 6c 16 31 2e 32 33 34 31 32 35 65 2b 33 |tial.1.234125e+3|
000002d0: 14 31 2e 32 33 34 31 33 65 2b 33 08 52 4e 44 5a |.1.23413e+3.RNDZ|
000002e0: 14 31 2e 32 33 34 31 32 65 2b 33 16 74 6f 50 72 |.1.23412e+3.toPr|
000002f0: 65 63 69 73 69 6f 6e 0e 31 32 33 2e 34 33 38 0e |ecision.123.438.|
00000300: 33 32 33 2e 34 33 38 0e 37 32 33 2e 34 33 38 0e |323.438.723.438.|
00000310: 66 32 33 2e 34 33 38 0a 52 4e 44 4e 41 0c 31 32 |f23.438.RNDNA.12|
00000320: 33 2e 34 34 0c 33 32 33 2e 34 34 0c 37 32 33 2e |3.44.323.44.723.|
00000330: 34 34 0c 66 32 33 2e 34 34 10 30 2e 30 30 30 30 |44.f23.44.0.0000|
00000340: 34 34 18 31 32 33 30 30 30 30 30 30 30 2e 30 0c |44.1230000000.0.|
00000350: 31 32 33 2e 34 33 08 52 4e 44 44 0e 2d 66 32 33 |123.43.RNDD.-f23|
00000360: 2e 34 34 12 31 2e 32 33 34 34 70 2b 38 02 6d 14 |.44.1.2344p+8.m.|
00000370: 42 69 67 44 65 63 69 6d 61 6c 0c 31 32 33 34 2e |BigDecimal.1234.|
00000380: 31 14 20 20 20 20 31 32 33 34 2e 31 18 20 20 20 |1.    1234.1.   |
00000390: 20 31 32 33 34 2e 31 20 20 18 72 6f 75 6e 64 69 | 1234.1  .roundi|
000003a0: 6e 67 4d 6f 64 65 30 6d 61 78 69 6d 75 6d 53 69 |ngMode0maximumSi|
000003b0: 67 6e 69 66 69 63 61 6e 74 44 69 67 69 74 73 2a |gnificantDigits*|
000003c0: 6d 61 78 69 6d 75 6d 46 72 61 63 74 69 6f 6e 44 |maximumFractionD|
000003d0: 69 67 69 74 73 06 73 75 62 06 6d 75 6c 06 6d 6f |igits.sub.mul.mo|
000003e0: 64 10 2d 31 32 33 34 2e 31 33 0c 00 06 00 a4 01 |d.-1234.13......|
000003f0: 00 02 00 03 00 0a d0 01 02 a6 01 00 00 00 c8 03 |................|
00000400: 03 00 03 40 e5 00 00 00 40 40 e6 00 00 00 40 40 |...@....@@....@@|
00000410: e7 00 00 00 40 40 e8 00 00 00 40 40 e9 00 00 00 |....@@....@@....|
00000420: 40 40 ea 00 00 00 40 40 eb 00 00 00 40 40 ec 00 |@@....@@....@@..|
00000430: 00 00 40 40 ed 00 00 00 40 40 ee 00 00 00 40 c2 |..@@....@@....@.|
00000440: 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 c2 |.A.......A......|
00000450: 02 41 e7 00 00 00 00 c2 03 41 e8 00 00 00 00 c2 |.A.......A......|
00000460: 04 41 e9 00 00 00 00 c2 05 41 ea 00 00 00 00 c2 |.A.......A......|
00000470: 06 41 eb 00 00 00 00 c2 07 41 ec 00 00 00 00 c2 |.A.......A......|
00000480: 08 41 ed 00 00 00 00 c2 09 41 ee 00 00 00 00 06 |.A.......A......|
00000490: cb 6f 13 00 00 00 39 ef 00 00 00 04 f0 00 00 00 |.o....9.........|
000004a0: f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 39 |......o.......09|
000004b0: e9 00 00 00 f0 cb 39 f1 00 00 00 f0 cb 39 ec 00 |......9......9..|
000004c0: 00 00 f0 cb 39 ed 00 00 00 f0 cb 39 ee 00 00 00 |....9......9....|
000004d0: f0 cf 28 e4 03 20 00 00 00 93 01 44 0c 34 18 00 |..(.. .....D.4..|
000004e0: 0f 8a 04 23 1b 18 0d 17 1b 18 0d 17 1b 1e 0d 1d |...#............|
000004f0: 1b 1a 0d 19 1b 1e 00 0c 43 06 00 ca 03 03 01 03 |........C.......|
00000500: 04 00 00 6f 04 e6 03 00 01 00 e8 03 00 01 00 68 |...o...........h|
00000510: 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 ab ec |................|
00000520: 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed |........).../...|
00000530: 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 |+...K.....!...K.|
00000540: 00 00 ab ec 17 d3 43 39 00 00 00 24 00 00 d4 43 |......C9...$...C|
00000550: 39 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 |9...$.....)9....|
00000560: 04 f5 00 00 00 d4 9f 04 f6 00 00 00 9f d5 ec 10 |................|
00000570: 04 f7 00 00 00 d5 9f 04 f8 00 00 00 9f ee 06 39 |...............9|
00000580: 2f 00 00 00 9f f1 30 e4 03 4a 04 00 12 10 07 12 |/.....0..J......|
00000590: 0c 10 12 21 0e 00 07 16 07 07 12 0d 09 00 07 0e |...!............|
000005a0: 11 18 07 12 12 29 07 0e 2f 2c 07 12 30 59 07 0c |.....)../,..0Y..|
000005b0: 1b 12 11 0e 07 10 1b 12 11 29 12 23 09 04 34 4e |.........).#..4N|
000005c0: 07 03 20 16 08 51 2a 22 07 03 20 14 11 0a 1a 22 |.. ..Q*".. ...."|
000005d0: 07 61 07 15 00 0c 43 06 00 cc 03 02 02 02 04 00 |.a....C.........|
000005e0: 00 31 04 f2 03 00 01 00 f4 03 00 01 00 f6 03 00 |.1..............|
000005f0: 00 00 c8 03 03 00 03 09 cb 6f 0a 00 00 00 d4 f0 |.........o......|
00000600: 0e 0e ee 17 cc 6f 13 00 00 00 0a cb 39 e5 00 00 |.....o......9...|
00000610: 00 c8 d3 a9 f1 0e 0e ee 02 30 39 e5 00 00 00 c7 |.........09.....|
00000620: 0a 04 fc 00 00 00 f3 29 e4 03 1a 14 00 05 08 27 |.......).......'|
00000630: 08 07 08 3b 07 0d 00 1b 0e 07 1a 07 15 07 05 22 |...;..........."|
00000640: 13 1b 0e 25 01 00 0c 43 06 00 ce 03 02 02 02 03 |...%...C........|
00000650: 00 00 5c 04 fa 03 00 01 00 fc 03 00 01 00 fe 03 |..\.............|
00000660: 00 00 00 80 04 00 01 00 b4 01 00 00 00 cb b4 00 |................|
00000670: 00 00 00 cc c8 ec 05 d3 0e ee fa 39 e5 00 00 00 |...........9....|
00000680: d3 39 01 01 00 00 a7 98 f1 0e 39 e5 00 00 00 39 |.9........9....9|
00000690: 01 01 00 00 d3 a8 f1 0e 39 e5 00 00 00 d3 39 01 |........9.....9.|
000006a0: 01 00 00 a8 98 f1 0e 39 e5 00 00 00 d3 39 01 01 |.......9.....9..|
000006b0: 00 00 ac f1 0e 39 e5 00 00 00 d3 39 01 01 00 00 |.....9.....9....|
000006c0: ab 98 f1 29 e4 03 3c 26 00 05 08 21 08 20 10 11 |...)..<&...!. ..|
000006d0: 06 17 1d 1b 12 07 08 1b 03 0c 09 0d 0b 1b 0e 1b |................|
000006e0: 0a 07 05 07 05 0d 0b 1b 12 07 0a 1b 05 0c 09 0d |................|
000006f0: 0b 1b 0e 07 0a 1b 05 07 05 0d 0b 1b 12 07 0a 1b |................|
00000700: 05 0c 09 00 0c 43 06 00 d0 03 02 00 02 03 00 00 |.....C..........|
00000710: 48 02 fa 03 00 01 00 82 04 00 01 00 39 e5 00 00 |H...........9...|
00000720: 00 d3 d4 ab f1 0e 39 e5 00 00 00 d4 d3 ab f1 0e |......9.........|
00000730: 39 e5 00 00 00 d3 d4 ac 98 f1 0e 39 e5 00 00 00 |9..........9....|
00000740: d4 d3 ac 98 f1 0e 39 e5 00 00 00 d4 db f1 0e 39 |......9........9|
00000750: e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 00 d3 d4 |.........9......|
00000760: a7 98 f1 29 e4 03 44 33 00 04 08 1b 0e 07 0a 07 |...)..D3........|
00000770: 05 07 05 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b |................|
00000780: 12 07 0a 07 05 0c 09 0d 0b 1b 12 07 0a 07 05 0c |................|
00000790: 09 0d 0b 1b 16 0c 09 0d 0b 1b 0e 07 0a 07 05 07 |................|
000007a0: 05 0d 0b 1b 12 07 08 07 03 0c 09 00 0c 43 06 00 |.............C..|
000007b0: d2 03 00 02 00 04 00 06 d7 01 02 fa 03 00 00 00 |................|
000007c0: fe 03 00 01 00 39 02 01 00 00 b4 02 00 00 00 b4 |.....9..........|
000007d0: 03 00 00 00 f2 0e 39 e8 00 00 00 b4 03 00 00 00 |......9.........|
000007e0: b4 03 00 00 00 f2 0e 39 02 01 00 00 b9 b4 03 00 |.......9........|
000007f0: 00 00 f2 0e 39 e8 00 00 00 ba b4 03 00 00 00 f2 |....9...........|
00000800: 0e 39 02 01 00 00 c1 00 b4 03 00 00 00 f2 0e 39 |.9.............9|
00000810: e8 00 00 00 39 a5 00 00 00 43 03 01 00 00 bb 24 |....9....C.....$|
00000820: 01 00 b4 02 00 00 00 f2 0e 39 e7 00 00 00 b4 03 |.........9......|
00000830: 00 00 00 b4 64 00 00 00 f2 cb 39 e5 00 00 00 c7 |....d.....9.....|
00000840: b4 01 00 00 00 a0 c7 ac f1 0e 39 e5 00 00 00 c7 |..........9.....|
00000850: c1 01 ab f1 0e 39 e5 00 00 00 c7 c1 02 ab f1 0e |.....9..........|
00000860: b4 01 00 00 00 cc 39 b9 00 00 00 04 04 01 00 00 |......9.........|
00000870: f1 0e 39 e6 00 00 00 39 d2 00 00 00 c2 03 f2 0e |..9....9........|
00000880: 39 e6 00 00 00 39 d2 00 00 00 c2 04 f2 0e 39 e6 |9....9........9.|
00000890: 00 00 00 39 d2 00 00 00 c2 05 f2 29 e4 03 5a 3e |...9.......)..Z>|
000008a0: 00 00 00 08 08 4d 12 0d 11 4d 0e 0e 0d 39 12 0d |.....M...M...9..|
000008b0: 11 39 0e 0e 0d 3e 12 0d 11 1b 10 1b 08 20 0a 2a |.9...>....... .*|
000008c0: 13 0e 05 4d 14 0d 1b 1b 10 20 04 07 12 07 05 07 |...M..... ......|
000008d0: 13 0d 0b 1b 0e 11 04 07 05 0d 0b 1b 0e 11 04 07 |................|
000008e0: 05 0e 0b 20 14 34 0c 0d 1f 1b 1a 25 01 0d 17 1b |... .4.....%....|
000008f0: 1a 25 01 0d 17 1b 1a 25 01 00 06 cd cc cc cc cc |.%.....%........|
00000900: cc 00 40 0a 14 d1 13 38 cf 55 7d 94 d6 75 f7 41 |..@....8.U}..u.A|
00000910: 5b 56 68 37 67 ca 53 46 5a 0a 14 d1 13 38 cf 55 |[Vh7g.SFZ....8.U|
00000920: 7d 94 d6 75 f7 41 5b 56 68 37 67 ca 53 46 5a 0c |}..u.A[Vh7g.SFZ.|
00000930: 42 06 00 00 00 00 00 02 00 00 0c 00 39 b9 00 00 |B...........9...|
00000940: 00 04 05 01 00 00 f1 29 e4 03 06 51 1e 02 10 34 |.......)...Q...4|
00000950: 0c 00 0c 42 06 00 00 00 00 00 02 00 00 0c 00 39 |...B...........9|
00000960: b9 00 00 00 04 06 01 00 00 f1 29 e4 03 06 52 1e |..........)...R.|
00000970: 02 10 34 0c 00 0c 42 06 00 00 00 00 00 02 00 00 |..4...B.........|
00000980: 0c 00 39 b9 00 00 00 04 07 01 00 00 f1 29 e4 03 |..9..........)..|
00000990: 06 53 1e 02 10 34 0c 00 0c 43 06 00 d4 03 04 03 |.S...4...C......|
000009a0: 04 05 00 00 44 07 90 04 00 01 00 fa 03 00 01 00 |....D...........|
000009b0: 82 04 00 01 00 92 04 00 01 00 94 04 00 00 00 96 |................|
000009c0: 04 00 01 00 98 04 00 02 00 39 b9 00 00 00 d3 48 |.........9.....H|
000009d0: cb 39 b9 00 00 00 d3 04 0d 01 00 00 9f 48 cc 39 |.9...........H.9|
000009e0: e5 00 00 00 c7 d4 d5 f2 d6 ab f1 0e c8 d4 d5 f2 |................|
000009f0: cd 39 e5 00 00 00 c9 b7 48 d6 ab f1 0e 39 e5 00 |.9......H....9..|
00000a00: 00 00 d4 d5 d6 9c c9 b8 48 9f ab f1 29 e4 03 48 |........H...)..H|
00000a10: 56 00 05 14 1b 0e 07 01 0d 05 1b 0e 20 0a 07 0b |V........... ...|
00000a20: 0d 1d 1b 0e 07 08 07 06 07 07 07 14 07 05 07 15 |................|
00000a30: 0d 03 07 0e 07 06 07 07 0d 13 1b 0e 0c 02 07 0e |................|
00000a40: 07 05 07 0b 0d 0b 1b 0e 07 0a 07 08 07 03 07 0c |................|
00000a50: 0c 02 07 05 07 11 07 05 00 0c 43 06 00 d6 03 04 |..........C.....|
00000a60: 00 04 06 00 00 40 04 94 04 00 01 00 fa 03 00 01 |.....@..........|
00000a70: 00 82 04 00 01 00 fe 03 00 01 00 39 ea 00 00 00 |...........9....|
00000a80: d3 d4 d5 d6 b7 48 22 04 00 0e 39 ea 00 00 00 d3 |.....H"...9.....|
00000a90: d4 8e d5 d6 b8 48 22 04 00 0e 39 ea 00 00 00 d3 |.....H"...9.....|
00000aa0: d4 d5 8e d6 b9 48 22 04 00 0e 39 ea 00 00 00 d3 |.....H"...9.....|
00000ab0: d4 8e d5 8e d6 ba 48 22 04 00 29 e4 03 42 61 00 |......H"..)..Ba.|
00000ac0: 04 08 1b 18 07 0a 07 06 07 06 0c 02 07 19 17 15 |................|
00000ad0: 1b 18 07 0c 07 01 07 08 07 06 0c 02 07 1b 17 15 |................|
00000ae0: 1b 18 07 0a 07 08 07 01 07 08 0c 02 07 1b 17 15 |................|
00000af0: 1b 18 07 0c 07 01 07 0a 07 01 07 08 0c 02 07 1d |................|
00000b00: 00 0c 43 06 00 d8 03 00 01 00 08 00 05 c6 02 01 |..C.............|
00000b10: fe 03 00 00 00 39 e5 00 00 00 39 b9 00 00 00 43 |.....9....9....C|
00000b20: 0e 01 00 00 b4 00 00 00 00 24 01 00 b4 01 00 00 |.........$......|
00000b30: 00 8e ad f1 0e 39 e5 00 00 00 39 b9 00 00 00 43 |.....9....9....C|
00000b40: 0e 01 00 00 b4 07 00 00 00 24 01 00 b4 02 00 00 |.........$......|
00000b50: 00 ad f1 0e 39 e5 00 00 00 39 b9 00 00 00 43 03 |....9....9....C.|
00000b60: 01 00 00 c1 00 24 01 00 c1 01 ad f1 0e 39 b9 00 |.....$.......9..|
00000b70: 00 00 43 0f 01 00 00 c1 02 24 01 00 cb 39 e5 00 |..C......$...9..|
00000b80: 00 00 c7 b7 48 c1 03 ad f1 0e 39 e5 00 00 00 c7 |....H.....9.....|
00000b90: b8 48 c1 04 ad f1 0e 39 eb 00 00 00 04 10 01 00 |.H.....9........|
00000ba0: 00 b4 03 00 00 00 b4 02 00 00 00 b4 01 00 00 00 |................|
00000bb0: b4 01 00 00 00 8e b4 01 00 00 00 8e b4 01 00 00 |................|
00000bc0: 00 26 04 00 22 04 00 0e 39 eb 00 00 00 04 11 01 |.&.."...9.......|
00000bd0: 00 00 b4 03 00 00 00 b4 02 00 00 00 b4 01 00 00 |................|
00000be0: 00 b4 02 00 00 00 8e b4 02 00 00 00 8e b4 01 00 |................|
00000bf0: 00 00 26 04 00 22 04 00 0e 39 eb 00 00 00 04 12 |..&.."...9......|
00000c00: 01 00 00 b4 03 00 00 00 b4 02 00 00 00 b4 02 00 |................|
00000c10: 00 00 b4 01 00 00 00 8e b4 01 00 00 00 8e b4 02 |................|
00000c20: 00 00 00 26 04 00 22 04 00 0e 39 eb 00 00 00 04 |...&.."...9.....|
00000c30: 13 01 00 00 b4 03 00 00 00 b4 02 00 00 00 b4 01 |................|
00000c40: 00 00 00 b4 02 00 00 00 8e b4 01 00 00 00 8e b4 |................|
00000c50: 02 00 00 00 26 04 00 22 04 00 29 e4 03 62 6a 00 |....&.."..)..bj.|
00000c60: 05 08 1b 0e 1b 0c 34 14 2a 12 07 07 07 2b 0d 0b |......4.*....+..|
00000c70: 1b 0e 1b 0c 34 14 2a 0a 07 2b 0e 0b 1b 0e 1b 0c |....4.*..+......|
00000c80: 25 0a 1b 38 07 4f 0d 03 1b 0c 25 10 17 23 1b 0e |%..8.O....%..#..|
00000c90: 0c 02 11 08 07 0b 0d 0b 1b 0e 0c 02 11 08 07 0b |................|
00000ca0: 0e 0b 98 40 20 0a 2f 35 17 13 98 40 20 0a 2f 35 |...@ ./5...@ ./5|
00000cb0: 17 13 98 40 20 0a 2f 35 17 13 98 40 20 0a 2f 35 |...@ ./5...@ ./5|
00000cc0: 00 0a 0c 00 00 00 00 00 00 00 c0 ff ff ff 00 0a |................|
00000cd0: 06 ff ff fd ff ff 0f 0a 0c 00 00 00 00 00 00 00 |................|
00000ce0: c0 ff ff ff 00 0a 06 ff ff fd ff ff 0f 0a 06 ff |................|
00000cf0: ff fb ff fb 1f 0c 43 06 00 da 03 00 04 00 07 00 |......C.........|
00000d00: 31 f6 0f 04 c8 03 00 00 00 fa 03 00 01 00 82 04 |1...............|
00000d10: 00 02 00 a8 04 00 03 00 39 e5 00 00 00 b4 01 00 |........9.......|
00000d20: 00 00 99 04 8e 00 00 00 ad f1 0e 39 e5 00 00 00 |...........9....|
00000d30: b8 99 39 15 01 00 00 04 16 01 00 00 ad f2 0e 39 |..9............9|
00000d40: e5 00 00 00 b8 b8 ab 39 15 01 00 00 f2 0e 39 e5 |.......9......9.|
00000d50: 00 00 00 b8 b8 ae 39 15 01 00 00 f2 0e 39 02 01 |......9......9..|
00000d60: 00 00 b9 39 15 01 00 00 ba 39 15 01 00 00 22 04 |...9.....9....".|
00000d70: 00 0e 39 e8 00 00 00 ba 39 15 01 00 00 ba 39 15 |..9.....9.....9.|
00000d80: 01 00 00 22 04 00 0e 39 02 01 00 00 b9 ba 39 15 |..."...9......9.|
00000d90: 01 00 00 f3 0e 39 e8 00 00 00 ba ba 39 15 01 00 |.....9......9...|
00000da0: 00 f3 0e 39 02 01 00 00 c1 00 ba 39 15 01 00 00 |...9.......9....|
00000db0: f3 0e 39 e8 00 00 00 39 a5 00 00 00 43 03 01 00 |..9....9....C...|
00000dc0: 00 bf 09 24 01 00 ba 39 15 01 00 00 f3 0e 39 02 |...$...9......9.|
00000dd0: 01 00 00 b4 02 00 00 00 ba 39 15 01 00 00 f3 0e |.........9......|
00000de0: 39 e8 00 00 00 b4 03 00 00 00 ba 39 15 01 00 00 |9..........9....|
00000df0: f3 0e 39 17 01 00 00 11 c0 80 00 21 01 00 cb 39 |..9........!...9|
00000e00: e5 00 00 00 c7 42 18 01 00 00 c0 80 00 ab f1 0e |.....B..........|
00000e10: 39 19 01 00 00 43 03 01 00 00 b9 39 15 01 00 00 |9....C.....9....|
00000e20: c7 24 03 00 cc 39 e5 00 00 00 c8 39 19 01 00 00 |.$...9.....9....|
00000e30: 43 1a 01 00 00 04 1b 01 00 00 b7 c7 24 03 00 ad |C...........$...|
00000e40: f1 0e 39 e5 00 00 00 c7 42 1c 01 00 00 0a ad f1 |..9.....B.......|
00000e50: 0e 39 e5 00 00 00 39 19 01 00 00 43 1d 01 00 00 |.9....9....C....|
00000e60: c8 24 01 00 b8 ab c1 01 39 1e 01 00 00 f3 0e 39 |.$......9......9|
00000e70: 17 01 00 00 43 1f 01 00 00 39 19 01 00 00 42 03 |....C....9....B.|
00000e80: 01 00 00 43 20 01 00 00 07 b9 24 02 00 c0 80 00 |...C .....$.....|
00000e90: 24 02 00 cd 39 e5 00 00 00 c8 c9 ad f1 0e 39 e5 |$...9.........9.|
00000ea0: 00 00 00 39 19 01 00 00 43 21 01 00 00 39 19 01 |...9....C!...9..|
00000eb0: 00 00 39 92 00 00 00 f1 24 01 00 f1 0e 39 e5 00 |..9.....$....9..|
00000ec0: 00 00 39 19 01 00 00 43 22 01 00 00 b8 39 15 01 |..9....C"....9..|
00000ed0: 00 00 24 02 00 f1 0e 39 e5 00 00 00 39 19 01 00 |..$....9....9...|
00000ee0: 00 43 22 01 00 00 b8 39 15 01 00 00 b7 9d 39 15 |.C"....9......9.|
00000ef0: 01 00 00 24 03 00 98 f1 0e 39 e5 00 00 00 39 19 |...$.....9....9.|
00000f00: 01 00 00 43 23 01 00 00 bf fd 39 15 01 00 00 24 |...C#.....9....$|
00000f10: 02 00 ba ad 39 15 01 00 00 f2 0e 39 e5 00 00 00 |....9......9....|
00000f20: 39 19 01 00 00 43 24 01 00 00 bf fd 39 15 01 00 |9....C$.....9...|
00000f30: 00 24 02 00 b6 ad 39 15 01 00 00 f2 0e 39 e5 00 |.$....9......9..|
00000f40: 00 00 39 19 01 00 00 43 25 01 00 00 c1 02 39 15 |..9....C%.....9.|
00000f50: 01 00 00 24 02 00 c1 03 ad 39 15 01 00 00 f2 0e |...$.....9......|
00000f60: 39 e5 00 00 00 39 19 01 00 00 43 26 01 00 00 ba |9....9....C&....|
00000f70: 39 15 01 00 00 24 02 00 c1 04 ad 39 15 01 00 00 |9....$.....9....|
00000f80: f2 0e 39 e5 00 00 00 39 19 01 00 00 43 27 01 00 |..9....9....C'..|
00000f90: 00 c1 05 39 15 01 00 00 c1 06 39 15 01 00 00 24 |...9......9....$|
00000fa0: 04 00 c1 07 ad 39 15 01 00 00 f2 0e 39 e5 00 00 |.....9......9...|
00000fb0: 00 39 19 01 00 00 43 28 01 00 00 b6 39 15 01 00 |.9....C(....9...|
00000fc0: 00 24 02 00 c1 08 8e ad 39 15 01 00 00 f2 0e 39 |.$......9......9|
00000fd0: e5 00 00 00 39 19 01 00 00 43 29 01 00 00 b8 39 |....9....C)....9|
00000fe0: 15 01 00 00 24 02 00 c1 09 ad 39 15 01 00 00 f2 |....$.....9.....|
00000ff0: 0e 39 e5 00 00 00 39 19 01 00 00 43 2a 01 00 00 |.9....9....C*...|
00001000: c1 0a 39 15 01 00 00 24 02 00 c1 0b ad 39 15 01 |..9....$.....9..|
00001010: 00 00 f2 0e 39 e5 00 00 00 39 19 01 00 00 43 2b |....9....9....C+|
00001020: 01 00 00 c1 0c 39 15 01 00 00 24 02 00 c1 0d ad |.....9....$.....|
00001030: 39 15 01 00 00 f2 0e 39 e5 00 00 00 39 19 01 00 |9......9....9...|
00001040: 00 43 2c 01 00 00 c1 0e 39 15 01 00 00 24 02 00 |.C,.....9....$..|
00001050: c1 0f ad 39 15 01 00 00 f2 0e 39 e5 00 00 00 39 |...9......9....9|
00001060: 19 01 00 00 43 2d 01 00 00 c1 10 39 15 01 00 00 |....C-.....9....|
00001070: 24 02 00 c1 11 ad 39 15 01 00 00 f2 0e 39 e5 00 |$.....9......9..|
00001080: 00 00 39 19 01 00 00 43 2e 01 00 00 c1 12 39 15 |..9....C......9.|
00001090: 01 00 00 c1 13 8e 39 15 01 00 00 24 04 00 c1 14 |......9....$....|
000010a0: ad 39 15 01 00 00 f2 0e 39 e5 00 00 00 39 19 01 |.9......9....9..|
000010b0: 00 00 43 2f 01 00 00 c1 15 39 15 01 00 00 24 02 |..C/.....9....$.|
000010c0: 00 b9 ad 39 15 01 00 00 f2 0e 39 e5 00 00 00 39 |...9......9....9|
000010d0: 19 01 00 00 43 30 01 00 00 c1 16 39 15 01 00 00 |....C0.....9....|
000010e0: 24 02 00 ba ad 39 15 01 00 00 f2 0e 39 e5 00 00 |$....9......9...|
000010f0: 00 39 19 01 00 00 43 31 01 00 00 c1 17 8e 39 15 |.9....C1......9.|
00001100: 01 00 00 24 02 00 bf fe ad 39 15 01 00 00 f2 0e |...$.....9......|
00001110: 39 e5 00 00 00 39 19 01 00 00 43 32 01 00 00 c1 |9....9....C2....|
00001120: 18 39 15 01 00 00 24 02 00 ba ad 39 15 01 00 00 |.9....$....9....|
00001130: f2 0e 39 e5 00 00 00 39 19 01 00 00 43 33 01 00 |..9....9....C3..|
00001140: 00 ba 39 15 01 00 00 b9 39 15 01 00 00 24 04 00 |..9.....9....$..|
00001150: b8 ad 39 15 01 00 00 f2 0e 39 e5 00 00 00 39 19 |..9......9....9.|
00001160: 01 00 00 43 34 01 00 00 ba 39 15 01 00 00 b9 39 |...C4....9.....9|
00001170: 15 01 00 00 24 04 00 b6 ad 39 15 01 00 00 f2 0e |....$....9......|
00001180: 39 e5 00 00 00 c1 19 39 15 01 00 00 f2 43 39 00 |9......9.....C9.|
00001190: 00 00 24 00 00 0e 04 35 01 00 00 0e 39 e5 00 00 |..$....5....9...|
000011a0: 00 c1 1a 39 15 01 00 00 f2 43 36 01 00 00 b9 24 |...9.....C6....$|
000011b0: 01 00 0e 04 37 01 00 00 0e 39 e5 00 00 00 c1 1b |....7....9......|
000011c0: 39 15 01 00 00 f2 43 36 01 00 00 b9 04 38 01 00 |9.....C6.....8..|
000011d0: 00 24 02 00 0e 04 39 01 00 00 0e 39 e5 00 00 00 |.$....9....9....|
000011e0: c1 1c 39 15 01 00 00 f2 43 3a 01 00 00 24 00 00 |..9.....C:...$..|
000011f0: 0e 04 3b 01 00 00 0e 39 e5 00 00 00 c1 1d 39 15 |..;....9......9.|
00001200: 01 00 00 f2 43 3a 01 00 00 bc 24 01 00 0e 04 3c |....C:....$....<|
00001210: 01 00 00 0e 39 e5 00 00 00 c1 1e 39 15 01 00 00 |....9......9....|
00001220: f2 43 3a 01 00 00 bc 39 17 01 00 00 42 3d 01 00 |.C:....9....B=..|
00001230: 00 24 02 00 0e 04 3e 01 00 00 0e 39 e5 00 00 00 |.$....>....9....|
00001240: c1 1f 39 15 01 00 00 f2 43 3f 01 00 00 bd 24 01 |..9.....C?....$.|
00001250: 00 0e 04 37 01 00 00 0e 39 e5 00 00 00 c1 20 39 |...7....9..... 9|
00001260: 15 01 00 00 f2 43 3f 01 00 00 bd 39 17 01 00 00 |.....C?....9....|
00001270: 42 3d 01 00 00 24 02 00 0e 04 39 01 00 00 0e 39 |B=...$....9....9|
00001280: e5 00 00 00 c0 23 01 c1 21 39 15 01 00 00 f3 43 |.....#..!9.....C|
00001290: 39 00 00 00 bf 10 24 01 00 0e 04 40 01 00 00 0e |9.....$....@....|
000012a0: 39 e5 00 00 00 c0 23 03 c1 22 39 15 01 00 00 f3 |9.....#.."9.....|
000012b0: 43 39 00 00 00 bf 10 24 01 00 0e 04 41 01 00 00 |C9.....$....A...|
000012c0: 0e 39 e5 00 00 00 c0 23 07 c1 23 39 15 01 00 00 |.9.....#..#9....|
000012d0: f3 43 39 00 00 00 bf 10 24 01 00 0e 04 42 01 00 |.C9.....$....B..|
000012e0: 00 0e 39 e5 00 00 00 c0 23 0f c1 24 39 15 01 00 |..9.....#..$9...|
000012f0: 00 f3 43 39 00 00 00 bf 10 24 01 00 0e 04 43 01 |..C9.....$....C.|
00001300: 00 00 0e 39 e5 00 00 00 c0 23 01 c1 25 39 15 01 |...9.....#..%9..|
00001310: 00 00 f3 43 36 01 00 00 b9 39 17 01 00 00 42 44 |...C6....9....BD|
00001320: 01 00 00 bf 10 24 03 00 0e 04 45 01 00 00 0e 39 |.....$....E....9|
00001330: e5 00 00 00 c0 23 03 c1 26 39 15 01 00 00 f3 43 |.....#..&9.....C|
00001340: 36 01 00 00 b9 39 17 01 00 00 42 44 01 00 00 bf |6....9....BD....|
00001350: 10 24 03 00 0e 04 46 01 00 00 0e 39 e5 00 00 00 |.$....F....9....|
00001360: c0 23 07 c1 27 39 15 01 00 00 f3 43 36 01 00 00 |.#..'9.....C6...|
00001370: b9 39 17 01 00 00 42 44 01 00 00 bf 10 24 03 00 |.9....BD.....$..|
00001380: 0e 04 47 01 00 00 0e 39 e5 00 00 00 c0 23 0f c1 |..G....9.....#..|
00001390: 28 39 15 01 00 00 f3 43 36 01 00 00 b9 39 17 01 |(9.....C6....9..|
000013a0: 00 00 42 44 01 00 00 bf 10 24 03 00 0e 04 48 01 |..BD.....$....H.|
000013b0: 00 00 0e 39 e5 00 00 00 b7 c1 29 39 15 01 00 00 |...9......)9....|
000013c0: f3 43 36 01 00 00 bd 39 17 01 00 00 42 44 01 00 |.C6....9....BD..|
000013d0: 00 bf 10 24 03 00 0e 04 49 01 00 00 0e 39 e5 00 |...$....I....9..|
000013e0: 00 00 c1 2a 39 15 01 00 00 f2 43 36 01 00 00 b8 |...*9.....C6....|
000013f0: 39 17 01 00 00 42 44 01 00 00 bf 10 24 03 00 0e |9....BD.....$...|
00001400: 04 4a 01 00 00 0e 39 e5 00 00 00 c0 23 01 c1 2b |.J....9.....#..+|
00001410: 39 15 01 00 00 f3 43 3f 01 00 00 bc 39 17 01 00 |9.....C?....9...|
00001420: 00 42 44 01 00 00 bf 10 24 03 00 0e 04 45 01 00 |.BD.....$....E..|
00001430: 00 0e 39 e5 00 00 00 c0 23 01 c1 2c 39 15 01 00 |..9.....#..,9...|
00001440: 00 f3 43 3f 01 00 00 bc 39 17 01 00 00 42 3d 01 |..C?....9....B=.|
00001450: 00 00 bf 10 24 03 00 0e 04 4b 01 00 00 0e 39 e5 |....$....K....9.|
00001460: 00 00 00 c0 23 03 c1 2d 39 15 01 00 00 f3 43 3f |....#..-9.....C?|
00001470: 01 00 00 bc 39 17 01 00 00 42 44 01 00 00 bf 10 |....9....BD.....|
00001480: 24 03 00 0e 04 46 01 00 00 0e 39 e5 00 00 00 c0 |$....F....9.....|
00001490: 23 07 c1 2e 39 15 01 00 00 f3 43 3f 01 00 00 bc |#...9.....C?....|
000014a0: 39 17 01 00 00 42 44 01 00 00 bf 10 24 03 00 0e |9....BD.....$...|
000014b0: 04 47 01 00 00 0e 39 e5 00 00 00 c0 dd f0 c1 2f |.G....9......../|
000014c0: 39 15 01 00 00 f3 43 3f 01 00 00 bc 39 17 01 00 |9.....C?....9...|
000014d0: 00 42 4c 01 00 00 bf 10 24 03 00 0e 04 4d 01 00 |.BL.....$....M..|
000014e0: 00 0e 39 e5 00 00 00 c0 23 01 c1 30 39 15 01 00 |..9.....#..09...|
000014f0: 00 f3 43 3a 01 00 00 bb 39 17 01 00 00 42 44 01 |..C:....9....BD.|
00001500: 00 00 bf 10 24 03 00 0e 04 4e 01 00 00 29 e4 03 |....$....N...)..|
00001510: c8 06 7b 00 00 00 08 08 34 22 25 15 0d 0b 25 1e |..{.....4"%...%.|
00001520: 34 04 07 15 0d 0b 25 12 07 0c 1b 11 0d 0b 25 12 |4.....%.......%.|
00001530: 07 0e 1b 13 0e 0b 20 16 20 08 1b 0b 17 11 20 12 |...... . ..... .|
00001540: 20 08 1b 0b 18 0d 25 1c 1b 09 0d 11 25 18 1b 09 | .....%.....%...|
00001550: 0e 0d 2a 20 1b 0d 0d 11 1b 10 1b 08 25 0a 16 0c |..* ........%...|
00001560: 1b 1f 0e 0d 39 1e 1b 0b 0d 11 39 1a 1b 0b 0e 02 |....9.....9.....|
00001570: 2f 16 17 25 1b 0e 07 02 2a 0c 07 0f 0d 03 1b 10 |/..%....*.......|
00001580: 20 0e 1b 06 07 09 17 21 1b 0e 07 0c 1b 10 39 6e | ......!......9n|
00001590: 07 57 11 2d 07 05 0d 0b 1b 0e 07 02 20 12 07 15 |.W.-........ ...|
000015a0: 0d 0b 1b 0e 1b 10 1b 12 07 01 16 08 11 10 1b 39 |...............9|
000015b0: 0e 03 1b 16 1b 12 1b 10 1b 0a 25 0a 20 25 17 2d |..........%. %.-|
000015c0: 1b 0e 07 0c 07 07 07 05 0e 0b 1b 0e 1b 10 1b 0e |................|
000015d0: 1b 12 1b 01 07 11 11 1d 0d 0b 1b 0e 1b 10 20 16 |.............. .|
000015e0: 1b 03 11 23 0d 0b 1b 10 1b 10 20 16 20 02 07 04 |...#...... . ...|
000015f0: 1b 09 16 25 0e 0b 1b 0e 1b 10 1b 0a 0c 04 1b 05 |...%............|
00001600: 16 0c 07 0a 1b 2f 0d 0b 1b 0e 1b 10 1b 0c 0c 04 |...../..........|
00001610: 1b 05 11 14 07 07 07 0c 1b 33 0e 0b 1b 0e 1b 10 |.........3......|
00001620: 25 10 1b 07 1b 0e 07 50 1b 77 0d 0b 1b 0e 1b 10 |%......P.w......|
00001630: 20 0c 1b 03 1b 0a 07 50 1b 73 0d 0b 1b 0e 1b 10 | ......P.s......|
00001640: 25 10 25 0c 1b 13 1b 1a 07 4e 1b 81 01 0e 0b 1b |%.%......N......|
00001650: 0e 1b 10 1b 0a 07 04 1b 05 1b 14 07 07 07 50 1b |..............P.|
00001660: 75 0d 0b 1b 0e 1b 10 20 0c 1b 03 1b 0a 07 50 1b |u...... ......P.|
00001670: 73 0d 0b 1b 0e 1b 10 25 10 1b 07 1b 0e 07 52 1b |s......%......R.|
00001680: 79 0e 0b 1b 0e 1b 10 25 12 1b 07 1b 0e 07 52 1b |y......%......R.|
00001690: 7b 0d 0b 1b 0e 1b 10 25 12 1b 07 1b 0e 07 50 1b |{......%......P.|
000016a0: 79 0d 0b 1b 0e 1b 10 25 12 1b 07 1b 0e 07 4e 1b |y......%......N.|
000016b0: 77 0d 0b 1b 0e 1b 10 25 14 25 06 07 08 1b 15 1b |w......%.%......|
000016c0: 1c 07 50 1b 89 01 0e 0b 1b 0e 1b 10 25 14 1b 07 |..P.........%...|
000016d0: 16 0e 07 0a 1b 35 0d 0b 1b 0e 1b 10 25 12 1b 07 |.....5......%...|
000016e0: 16 0e 07 0a 1b 33 0d 0b 1b 0e 1b 10 25 0e 07 08 |.....3......%...|
000016f0: 1b 09 11 18 0c 07 07 0c 1b 39 0d 0b 1b 0e 1b 10 |.........9......|
00001700: 25 14 1b 07 16 0e 07 0a 1b 35 0e 0b 1b 0e 1b 10 |%........5......|
00001710: 20 0e 20 06 1b 09 16 10 07 0a 1b 35 0d 0b 1b 0e | . ........5....|
00001720: 1b 10 20 18 20 06 1b 09 11 18 07 07 07 0c 1b 41 |.. . ..........A|
00001730: 0f 0b 25 20 1b 13 07 18 1b 12 35 35 25 20 1b 13 |..% ......55% ..|
00001740: 07 18 20 10 35 33 25 20 1b 13 07 18 39 10 35 33 |.. .53% ....9.53|
00001750: 25 20 1b 13 07 18 1b 1c 35 3f 25 20 1b 13 07 18 |% ......5?% ....|
00001760: 20 1c 35 3f 25 20 1b 13 07 18 20 24 1b 16 1b 1d | .5?% .... $....|
00001770: 35 3f 25 20 1b 13 07 18 20 18 35 3b 25 20 1b 13 |5?% .... .5;% ..|
00001780: 07 18 20 20 1b 16 1b 1d 37 3b 34 22 1b 15 07 1a |..  ....7;4"....|
00001790: 25 12 35 37 34 22 1b 15 07 1a 25 12 35 37 34 22 |%.574"....%.574"|
000017a0: 1b 15 07 1a 25 12 35 37 34 22 1b 15 07 1a 25 12 |....%.574"....%.|
000017b0: 35 37 34 22 1b 15 07 1a 20 18 1b 16 25 1d 35 35 |574".... ...%.55|
000017c0: 34 22 1b 15 07 1a 20 18 1b 16 25 1d 35 35 34 22 |4".... ...%.554"|
000017d0: 1b 15 07 1a 20 18 1b 16 25 1d 35 35 34 22 1b 15 |.... ...%.554"..|
000017e0: 07 1a 20 18 1b 16 25 1d 35 35 2a 26 1b 19 07 1e |.. ...%.55*&....|
000017f0: 20 18 1b 16 25 1d 35 39 25 28 1b 1b 07 20 20 18 | ...%.59%(...  .|
00001800: 1b 16 25 1d 35 3b 34 22 1b 15 07 1a 20 20 1b 16 |..%.5;4"....  ..|
00001810: 25 1d 35 3d 34 22 1b 15 07 1a 20 20 1b 16 25 1d |%.5=4"....  ..%.|
00001820: 35 3d 34 22 1b 15 07 1a 20 20 1b 16 25 1d 35 3d |5=4"....  ..%.5=|
00001830: 34 22 1b 15 07 1a 20 20 1b 16 25 1d 35 3d 1b 10 |4"....  ..%.5=..|
00001840: 1b 14 1b 17 07 1c 20 20 1b 16 25 1d 35 3f 34 22 |......  ..%.5?4"|
00001850: 1b 15 07 1a 20 24 1b 16 25 1d 00 06 cd cc cc cc |.... $..%.......|
00001860: cc cc 00 40 06 33 33 33 33 33 33 e3 3f 06 9a 99 |...@.333333.?...|
00001870: 99 99 99 99 c9 3f 06 8d ac 58 9e dd 8a f3 3f 06 |.....?...X....?.|
00001880: 0b 03 ad 7a ea 93 f1 3f 06 cd cc cc cc cc cc 00 |...z...?........|
00001890: 40 06 9a 99 99 99 99 99 f9 3f 06 a6 45 40 40 72 |@........?..E@@r|
000018a0: 38 0a 40 06 ee 0c 09 8f 54 ed ea 3f 06 8c 06 b5 |8.@.....T..?....|
000018b0: 0f 28 4a e1 3f 06 9a 99 99 99 99 99 b9 3f 06 80 |.(J.?........?..|
000018c0: 0b 43 77 88 af b9 3f 06 33 33 33 33 33 33 d3 3f |.Cw...?.333333.?|
000018d0: 06 ff f6 14 9e 15 80 d3 3f 06 9a 99 99 99 99 99 |........?.......|
000018e0: d9 3f 06 8b 5e 0a a4 68 8c f2 3f 06 66 66 66 66 |.?..^..h..?.ffff|
000018f0: 66 66 e6 3f 06 ad d4 7b 2d 11 8b e3 3f 06 66 66 |ff.?...{-...?.ff|
00001900: 66 66 66 66 1c 40 06 66 66 66 66 66 66 14 40 06 |ffff.@.ffffff.@.|
00001910: 96 c7 22 68 b5 8c 01 40 06 00 00 00 00 00 00 04 |.."h...@........|
00001920: 40 06 00 00 00 00 00 00 04 40 06 00 00 00 00 00 |@........@......|
00001930: 00 04 40 06 00 00 00 00 00 00 04 40 06 00 00 00 |..@........@....|
00001940: 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 |..H.@......H.@..|
00001950: 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 |....H.@......H.@|
00001960: 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 |......H.@......H|
00001970: 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 |.@......H.@.....|
00001980: 80 48 93 40 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 |.H.@..x.&1..?..x|
00001990: e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 |.&1..?..x.&1..?.|
000019a0: d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc |.x.&1..?..x.&1..|
000019b0: 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 |?..x.&1..?..x.&1|
000019c0: 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 f3 69 5f |..?..x.&1..?..i_|
000019d0: 8a bc f6 06 3f 06 00 00 00 00 00 30 32 42 06 d5 |....?......02B..|
000019e0: 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f |x.&1..?..x.&1..?|
000019f0: 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 |..x.&1..?..x.&1.|
00001a00: dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 |.?..x.&1..?..x.&|
00001a10: 31 08 dc 3f 0c 43 06 00 dc 03 00 00 00 09 00 2a |1..?.C.........*|
00001a20: bc 0b 00 39 e5 00 00 00 b8 39 4f 01 00 00 b8 ad |...9.....9O.....|
00001a30: 39 4f 01 00 00 f3 0e 39 e5 00 00 00 b8 39 4f 01 |9O.....9.....9O.|
00001a40: 00 00 b9 ae 39 4f 01 00 00 f3 0e 39 02 01 00 00 |....9O.....9....|
00001a50: b8 39 4f 01 00 00 b9 39 4f 01 00 00 22 04 00 0e |.9O....9O..."...|
00001a60: 39 e8 00 00 00 b9 39 4f 01 00 00 b9 39 4f 01 00 |9.....9O....9O..|
00001a70: 00 22 04 00 0e 39 02 01 00 00 b8 b9 39 4f 01 00 |."...9......9O..|
00001a80: 00 f3 0e 39 e8 00 00 00 b9 b9 39 4f 01 00 00 f3 |...9......9O....|
00001a90: 0e 39 02 01 00 00 c1 00 b9 39 4f 01 00 00 f3 0e |.9.......9O.....|
00001aa0: 39 e8 00 00 00 39 a5 00 00 00 43 03 01 00 00 bb |9....9....C.....|
00001ab0: 24 01 00 b9 39 4f 01 00 00 f3 0e 39 02 01 00 00 |$...9O.....9....|
00001ac0: b4 02 00 00 00 ba 39 4f 01 00 00 f3 0e 39 e8 00 |......9O.....9..|
00001ad0: 00 00 b4 03 00 00 00 ba 39 4f 01 00 00 f3 0e 39 |........9O.....9|
00001ae0: e5 00 00 00 39 50 01 00 00 04 51 01 00 00 f1 c1 |....9P....Q.....|
00001af0: 01 ad 39 4f 01 00 00 f2 0e 39 e5 00 00 00 39 50 |..9O.....9....9P|
00001b00: 01 00 00 04 52 01 00 00 f1 c1 02 ad 39 4f 01 00 |....R.......9O..|
00001b10: 00 f2 0e 39 e5 00 00 00 39 50 01 00 00 04 53 01 |...9....9P....S.|
00001b20: 00 00 f1 c1 03 ad 39 4f 01 00 00 f2 0e 39 e5 00 |......9O.....9..|
00001b30: 00 00 39 50 01 00 00 c1 04 f1 c1 05 ad 39 4f 01 |..9P.........9O.|
00001b40: 00 00 f2 0e 39 e5 00 00 00 39 50 01 00 00 bf 7b |....9....9P....{|
00001b50: f1 bf 7b ad 39 4f 01 00 00 f2 0e 39 e5 00 00 00 |..{.9O.....9....|
00001b60: 39 50 01 00 00 0a f1 b8 ad 39 4f 01 00 00 f2 0e |9P.......9O.....|
00001b70: 39 e5 00 00 00 bf 7b 39 4f 01 00 00 b8 9f 39 4f |9.....{9O.....9O|
00001b80: 01 00 00 bf 7c ad 39 4f 01 00 00 22 04 00 0e 39 |....|.9O..."...9|
00001b90: e5 00 00 00 bf 7b 39 4f 01 00 00 b8 a0 39 4f 01 |.....{9O.....9O.|
00001ba0: 00 00 bf 7a ad 39 4f 01 00 00 22 04 00 0e 39 e5 |...z.9O..."...9.|
00001bb0: 00 00 00 c1 06 39 4f 01 00 00 ba 9c 39 4f 01 00 |.....9O.....9O..|
00001bc0: 00 c1 07 ad 39 4f 01 00 00 22 04 00 0e 39 e5 00 |....9O..."...9..|
00001bd0: 00 00 bf 0a 39 4f 01 00 00 b9 9d 39 4f 01 00 00 |....9O.....9O...|
00001be0: bc ad 39 4f 01 00 00 22 04 00 0e 39 e6 00 00 00 |..9O..."...9....|
00001bf0: 39 d0 00 00 00 c2 08 f2 0e 39 e5 00 00 00 bf 0a |9........9......|
00001c00: 39 4f 01 00 00 ba 9e 39 4f 01 00 00 b8 ad 39 4f |9O.....9O.....9O|
00001c10: 01 00 00 22 04 00 0e 39 e5 00 00 00 bf f6 39 4f |..."...9......9O|
00001c20: 01 00 00 ba 9e 39 4f 01 00 00 b6 ad 39 4f 01 00 |.....9O.....9O..|
00001c30: 00 22 04 00 0e 39 e5 00 00 00 c1 09 39 4f 01 00 |."...9......9O..|
00001c40: 00 ba a1 39 4f 01 00 00 c1 0a ad 39 4f 01 00 00 |...9O......9O...|
00001c50: 22 04 00 0e 39 e6 00 00 00 39 d0 00 00 00 c2 0b |"...9....9......|
00001c60: f2 0e 39 e6 00 00 00 39 d0 00 00 00 c2 0c f2 0e |..9....9........|
00001c70: 39 e5 00 00 00 39 50 01 00 00 43 03 01 00 00 b9 |9....9P...C.....|
00001c80: 39 4f 01 00 00 0b 39 54 01 00 00 4e 54 01 00 00 |9O....9T...NT...|
00001c90: 39 55 01 00 00 4e 55 01 00 00 24 03 00 c1 0d ad |9U...NU...$.....|
00001ca0: 39 4f 01 00 00 f2 0e 39 e5 00 00 00 39 50 01 00 |9O.....9....9P..|
00001cb0: 00 43 03 01 00 00 bf 65 39 4f 01 00 00 0b 39 54 |.C.....e9O....9T|
00001cc0: 01 00 00 4e 54 01 00 00 39 56 01 00 00 4e 56 01 |...NT...9V...NV.|
00001cd0: 00 00 24 03 00 c1 0e ad 39 4f 01 00 00 f2 0e 39 |..$.....9O.....9|
00001ce0: e5 00 00 00 39 50 01 00 00 43 03 01 00 00 c1 0f |....9P...C......|
00001cf0: 39 4f 01 00 00 0b 39 54 01 00 00 4e 54 01 00 00 |9O....9T...NT...|
00001d00: 39 56 01 00 00 4e 56 01 00 00 24 03 00 c1 10 ad |9V...NV...$.....|
00001d10: 39 4f 01 00 00 f2 0e 39 e5 00 00 00 39 50 01 00 |9O.....9....9P..|
00001d20: 00 43 32 01 00 00 c1 11 39 4f 01 00 00 0b 39 54 |.C2.....9O....9T|
00001d30: 01 00 00 4e 54 01 00 00 39 56 01 00 00 4e 56 01 |...NT...9V...NV.|
00001d40: 00 00 24 03 00 c1 12 ad 39 4f 01 00 00 f2 0e 39 |..$.....9O.....9|
00001d50: e5 00 00 00 39 50 01 00 00 43 6a 00 00 00 c1 13 |....9P...Cj.....|
00001d60: 39 4f 01 00 00 c1 14 39 4f 01 00 00 0b 39 54 01 |9O.....9O....9T.|
00001d70: 00 00 4e 54 01 00 00 39 56 01 00 00 4e 56 01 00 |..NT...9V...NV..|
00001d80: 00 24 05 00 c1 15 ad 39 4f 01 00 00 f2 0e 39 e5 |.$.....9O.....9.|
00001d90: 00 00 00 39 50 01 00 00 43 57 01 00 00 c1 16 39 |...9P...CW.....9|
00001da0: 4f 01 00 00 c1 17 39 4f 01 00 00 0b 39 54 01 00 |O.....9O....9T..|
00001db0: 00 4e 54 01 00 00 39 56 01 00 00 4e 56 01 00 00 |.NT...9V...NV...|
00001dc0: 24 05 00 c1 18 ad 39 4f 01 00 00 f2 0e 39 e5 00 |$.....9O.....9..|
00001dd0: 00 00 39 50 01 00 00 43 58 01 00 00 c1 19 39 4f |..9P...CX.....9O|
00001de0: 01 00 00 c1 1a 39 4f 01 00 00 0b 39 54 01 00 00 |.....9O....9T...|
00001df0: 4e 54 01 00 00 39 56 01 00 00 4e 56 01 00 00 24 |NT...9V...NV...$|
00001e00: 05 00 c1 1b ad 39 4f 01 00 00 f2 0e 39 e5 00 00 |.....9O.....9...|
00001e10: 00 39 50 01 00 00 43 59 01 00 00 c1 1c 39 4f 01 |.9P...CY.....9O.|
00001e20: 00 00 c1 1d 39 4f 01 00 00 0b 39 54 01 00 00 4e |....9O....9T...N|
00001e30: 54 01 00 00 39 56 01 00 00 4e 56 01 00 00 24 05 |T...9V...NV...$.|
00001e40: 00 c1 1e ad 39 4f 01 00 00 f2 0e 39 e5 00 00 00 |....9O.....9....|
00001e50: 39 50 01 00 00 43 0a 01 00 00 bf 14 39 4f 01 00 |9P...C......9O..|
00001e60: 00 ba 39 4f 01 00 00 0b 39 54 01 00 00 4e 54 01 |..9O....9T...NT.|
00001e70: 00 00 39 55 01 00 00 4e 55 01 00 00 24 05 00 c1 |..9U...NU...$...|
00001e80: 1f ad 39 4f 01 00 00 f2 0e 39 e5 00 00 00 39 50 |..9O.....9....9P|
00001e90: 01 00 00 43 0a 01 00 00 bf 14 39 4f 01 00 00 ba |...C......9O....|
00001ea0: 39 4f 01 00 00 0b 39 54 01 00 00 4e 54 01 00 00 |9O....9T...NT...|
00001eb0: 39 56 01 00 00 4e 56 01 00 00 24 05 00 c1 20 ad |9V...NV...$... .|
00001ec0: 39 4f 01 00 00 f2 0e 39 e5 00 00 00 c1 21 39 4f |9O.....9.....!9O|
00001ed0: 01 00 00 f2 43 39 00 00 00 24 00 00 0e 04 35 01 |....C9...$....5.|
00001ee0: 00 00 0e 39 e5 00 00 00 c1 22 39 4f 01 00 00 f2 |...9....."9O....|
00001ef0: 43 36 01 00 00 b9 24 01 00 0e 04 37 01 00 00 0e |C6....$....7....|
00001f00: 39 e5 00 00 00 c1 23 39 4f 01 00 00 f2 43 36 01 |9.....#9O....C6.|
00001f10: 00 00 b9 04 38 01 00 00 24 02 00 0e 04 39 01 00 |....8...$....9..|
00001f20: 00 0e 39 e5 00 00 00 c1 24 39 4f 01 00 00 f2 43 |..9.....$9O....C|
00001f30: 3a 01 00 00 24 00 00 0e 04 3b 01 00 00 0e 39 e5 |:...$....;....9.|
00001f40: 00 00 00 c1 25 39 4f 01 00 00 f2 43 3a 01 00 00 |....%9O....C:...|
00001f50: bc 24 01 00 0e 04 3c 01 00 00 0e 39 e5 00 00 00 |.$....<....9....|
00001f60: c1 26 39 4f 01 00 00 f2 43 3a 01 00 00 bc 04 38 |.&9O....C:.....8|
00001f70: 01 00 00 24 02 00 0e 04 3e 01 00 00 0e 39 e5 00 |...$....>....9..|
00001f80: 00 00 c1 27 39 4f 01 00 00 f2 43 3f 01 00 00 bd |...'9O....C?....|
00001f90: 24 01 00 0e 04 37 01 00 00 0e 39 e5 00 00 00 c1 |$....7....9.....|
00001fa0: 28 39 4f 01 00 00 f2 43 3f 01 00 00 bd 04 38 01 |(9O....C?.....8.|
00001fb0: 00 00 24 02 00 0e 04 39 01 00 00 0e 39 e5 00 00 |..$....9....9...|
00001fc0: 00 c1 29 8e 39 4f 01 00 00 f2 43 3f 01 00 00 bd |..).9O....C?....|
00001fd0: 04 2f 01 00 00 24 02 00 0e 04 5a 01 00 00 29 e4 |./...$....Z...).|
00001fe0: 03 b3 04 d3 01 00 04 08 20 10 20 04 07 0a 1b 11 |........ . .....|
00001ff0: 0d 0b 20 10 20 04 07 0a 1b 11 0d 0b 20 16 20 08 |.. . ....... . .|
00002000: 1b 0b 17 11 20 12 20 08 1b 0b 18 0d 25 1c 1b 09 |.... . .....%...|
00002010: 0d 11 25 18 1b 09 0e 0d 2a 20 1b 0d 0d 11 1b 10 |..%.....* ......|
00002020: 1b 08 20 0a 16 0c 1b 1f 0e 0d 39 1e 1b 0b 0d 11 |.. .......9.....|
00002030: 39 1a 1b 0b 0e 0d 1b 0e 34 14 11 16 07 14 1b 3f |9.......4......?|
00002040: 0d 0b 1b 0e 34 14 11 1e 07 14 1b 47 0d 0b 1b 0e |....4......G....|
00002050: 34 14 11 22 07 14 1b 4b 0e 0b 1b 0e 25 14 11 0c |4.."...K....%...|
00002060: 07 0e 1b 2f 0d 0b 1b 0e 25 14 11 0c 07 0e 1b 2f |.../....%....../|
00002070: 0d 0b 1b 0e 20 14 0c 0e 07 0a 1b 2d 0e 0b 25 14 |.... ......-..%.|
00002080: 20 04 07 06 25 04 07 0e 1b 23 17 0b 25 14 20 04 | ...%....#..%. .|
00002090: 07 06 25 04 07 0e 1b 23 18 0b 25 14 20 04 07 06 |..%....#..%. ...|
000020a0: 25 04 07 0e 1b 23 17 0b 25 12 20 04 07 06 20 04 |%....#..%. ... .|
000020b0: 07 0a 1b 1d 17 0b 1b 1a 25 01 0e 17 25 12 20 04 |........%...%. .|
000020c0: 07 06 20 04 07 0a 1b 1d 17 0b 1b 0e 0c 06 20 04 |.. ........... .|
000020d0: 07 06 1b 0c 07 07 07 0c 1b 21 18 0b 25 1a 20 04 |.........!..%. .|
000020e0: 07 08 25 04 07 24 1b 41 17 0b 1b 1a 25 01 0d 17 |..%..$.A....%...|
000020f0: 1b 1a 25 01 0e 17 1b 0e 1b 14 20 0e 84 03 1d 34 |..%....... ....4|
00002100: 07 12 00 05 03 65 0f 0b 1b 0e 1b 14 25 12 84 07 |.....e......%...|
00002110: 1d 2e 07 14 00 05 03 61 0f 0b 1b 0e 1b 14 25 16 |.......a......%.|
00002120: 84 0b 1d 2e 07 12 00 05 03 5f 00 02 08 0b 1b 0e |........._......|
00002130: 1b 14 25 1c 84 0f 1d 2c 07 12 00 05 03 5f 00 02 |..%....,....._..|
00002140: 08 0b 1b 0e 1b 14 25 18 25 14 84 23 1d 36 07 10 |......%.%..#.6..|
00002150: 00 05 03 63 0f 0b 1b 0e 1b 14 25 18 25 14 84 23 |...c......%.%..#|
00002160: 1d 36 07 10 00 05 03 63 0f 0b 1b 0e 1b 14 25 18 |.6.....c......%.|
00002170: 25 14 84 23 1d 36 07 12 00 05 03 65 0f 0b 1b 0e |%..#.6.....e....|
00002180: 1b 14 25 18 25 14 84 23 1d 36 07 14 00 05 03 67 |..%.%..#.6.....g|
00002190: 0f 0b 1b 0e 1b 14 25 0e 20 08 84 0d 1d 36 07 10 |......%. ....6..|
000021a0: 00 05 03 63 0f 0b 1b 0e 1b 14 25 0e 20 08 84 0d |...c......%. ...|
000021b0: 1d 30 08 1c 00 05 05 69 00 02 0c 0b 25 20 1b 13 |.0.....i....% ..|
000021c0: 07 18 1b 12 35 35 25 20 1b 13 07 18 20 10 35 33 |....55% .... .53|
000021d0: 25 20 1b 13 07 18 39 10 35 33 25 20 1b 13 07 18 |% ....9.53% ....|
000021e0: 1b 1c 35 3f 25 20 1b 13 07 18 20 1c 35 3f 25 20 |..5?% .... .5?% |
000021f0: 1b 13 07 18 39 1c 35 3f 25 20 1b 13 07 18 20 18 |....9.5?% .... .|
00002200: 35 3b 25 20 1b 13 07 18 39 18 35 3b 25 10 07 12 |5;% ....9.5;%...|
00002210: 1b 15 07 1a 39 18 00 06 9a 99 99 99 99 99 f1 3f |....9..........?|
00002220: 06 66 66 66 66 66 48 93 40 06 66 66 66 66 66 48 |.fffffH.@.fffffH|
00002230: 93 40 06 66 66 66 66 66 48 93 40 06 9a 99 99 99 |.@.fffffH.@.....|
00002240: 99 99 b9 3f 06 9a 99 99 99 99 99 b9 3f 06 9a 99 |...?........?...|
00002250: 99 99 99 99 09 40 06 33 33 33 33 33 33 23 40 0c |.....@.333333#@.|
00002260: 42 06 00 00 00 00 00 02 00 00 0e 00 39 4f 01 00 |B...........9O..|
00002270: 00 ba 9d 0e 39 4f 01 00 00 29 e4 03 09 f0 01 1d |....9O...)......|
00002280: 02 14 20 04 0c 06 00 06 00 00 00 00 00 4a 93 40 |.. ..........J.@|
00002290: 06 00 00 e8 72 d7 08 dc 41 0c 42 06 00 00 00 00 |....r...A.B.....|
000022a0: 00 02 00 01 0f 00 39 4f 01 00 00 c1 00 a1 0e 39 |......9O.......9|
000022b0: 4f 01 00 00 29 e4 03 09 f6 01 1d 02 12 25 04 0c |O...)........%..|
000022c0: 0c 00 06 cd cc cc cc cc cc 08 40 0c 42 06 00 00 |..........@.B...|
000022d0: 00 00 00 02 00 00 0f 00 39 4f 01 00 00 bf fd a1 |........9O......|
000022e0: 0e 39 4f 01 00 00 29 e4 03 0b f7 01 1d 02 12 1b |.9O...).........|
000022f0: 0a 0c 05 0c 0a 00 06 39 b4 c8 76 be 9f f6 3f 06 |.......9..v...?.|
00002300: 9a 99 99 99 99 19 24 40 06 fc a9 f1 d2 4d 62 60 |......$@.....Mb`|
00002310: 3f 06 0a d7 a3 70 3d 0a a7 3f 06 6e 86 1b f0 f9 |?....p=..?.n....|
00002320: 21 09 40 06 89 41 60 e5 d0 22 09 40 06 6e 86 1b |!.@..A`..".@.n..|
00002330: f0 f9 21 09 40 06 7d 5c 1b 2a c6 f9 d3 3f 06 9a |..!.@.}\.*...?..|
00002340: 99 99 99 99 99 0b 40 06 6e 86 1b f0 f9 21 09 40 |......@.n....!.@|
00002350: 06 7d 5c 1b 2a c6 f9 d3 3f 06 8f c2 f5 28 5c 8f |.}\.*...?....(\.|
00002360: 06 40 06 6e 86 1b f0 f9 21 09 40 06 7d 5c 1b 2a |.@.n....!.@.}\.*|
00002370: c6 f9 d3 3f 06 31 08 ac 1c 5a 64 ef 3f 06 6e 86 |...?.1...Zd.?.n.|
00002380: 1b f0 f9 21 09 40 06 b6 4a b0 38 9c f9 d3 3f 06 |...!.@..J.8...?.|
00002390: cb a1 45 b6 f3 fd 94 3f 06 ae 47 e1 7a 14 ae 1a |..E....?..G.z...|
000023a0: 40 06 ab aa aa aa aa aa 1a 40 06 00 00 00 00 80 |@........@......|
000023b0: 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 |H.@......H.@....|
000023c0: 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 |..H.@......H.@..|
000023d0: 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 |....H.@......H.@|
000023e0: 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 |......H.@......H|
000023f0: 93 40 06 00 00 00 00 80 48 93 40                |.@......H.@|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```