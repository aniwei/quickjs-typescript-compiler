# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_bignum.ts
**生成时间**: 2025-12-25T17:57:15.544Z

## 大小对比

- TypeScript编译器: 9749 字节
- WASM编译器: 9345 字节
- 差异: 404 字节 (4.32%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 126,
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
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 35
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_eq",
      "offset": 45
    },
    {
      "index": 6,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint1",
      "offset": 53
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint2",
      "offset": 66
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_divrem",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_idiv1",
      "offset": 91
    },
    {
      "index": 10,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_bigint_ext",
      "offset": 102
    },
    {
      "index": 11,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_bigfloat",
      "offset": 118
    },
    {
      "index": 12,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_bigdecimal",
      "offset": 132
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "use strict",
      "offset": 148
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 159
    },
    {
      "index": 15,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 172
    },
    {
      "index": 16,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_bignum.js",
      "offset": 187
    },
    {
      "index": 17,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 235
    },
    {
      "index": 18,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 242
    },
    {
      "index": 19,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 251
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 275
    },
    {
      "index": 21,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 277
    },
    {
      "index": 22,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 290
    },
    {
      "index": 23,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 293
    },
    {
      "index": 24,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 295
    },
    {
      "index": 25,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 299
    },
    {
      "index": 26,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 304
    },
    {
      "index": 27,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 307
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 326
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 328
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 330
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 332
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 334
    },
    {
      "index": 33,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 336
    },
    {
      "index": 34,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 31n === 2147483648n",
      "offset": 341
    },
    {
      "index": 35,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 32n === 4294967296n",
      "offset": 366
    },
    {
      "index": 36,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "  123",
      "offset": 391
    },
    {
      "index": 37,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123   ",
      "offset": 397
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 406
    },
    {
      "index": 39,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 408
    },
    {
      "index": 40,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 410
    },
    {
      "index": 41,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 413
    },
    {
      "index": 42,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "div1",
      "offset": 422
    },
    {
      "index": 43,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "q",
      "offset": 427
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 429
    },
    {
      "index": 45,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "divrem",
      "offset": 433
    },
    {
      "index": 46,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 440
    },
    {
      "index": 47,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rem",
      "offset": 442
    },
    {
      "index": 48,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "floorLog2",
      "offset": 446
    },
    {
      "index": 49,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sqrtrem",
      "offset": 456
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tdiv",
      "offset": 464
    },
    {
      "index": 51,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdiv",
      "offset": 469
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cdiv",
      "offset": 474
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ediv",
      "offset": 479
    },
    {
      "index": 54,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "sqrt2",
      "offset": 484
    },
    {
      "index": 55,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 490
    },
    {
      "index": 56,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "bigfloat",
      "offset": 492
    },
    {
      "index": 57,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "BigFloatEnv",
      "offset": 501
    },
    {
      "index": 58,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 513
    },
    {
      "index": 59,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "BigFloat",
      "offset": 518
    },
    {
      "index": 60,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 527
    },
    {
      "index": 61,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "0x1.6a09e667f3bcc908b2fb1366ea957d3e",
      "offset": 538
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "inexact",
      "offset": 575
    },
    {
      "index": 63,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "fpRound",
      "offset": 583
    },
    {
      "index": 64,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "a09e667f3bcc908b2fb1366ea95l",
      "offset": 591
    },
    {
      "index": 65,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "setPrec",
      "offset": 620
    },
    {
      "index": 66,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bind",
      "offset": 628
    },
    {
      "index": 67,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 633
    },
    {
      "index": 68,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 639
    },
    {
      "index": 69,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 648
    },
    {
      "index": 70,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sign",
      "offset": 652
    },
    {
      "index": 71,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "exp",
      "offset": 657
    },
    {
      "index": 72,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 661
    },
    {
      "index": 73,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 665
    },
    {
      "index": 74,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sin",
      "offset": 669
    },
    {
      "index": 75,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cos",
      "offset": 673
    },
    {
      "index": 76,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tan",
      "offset": 677
    },
    {
      "index": 77,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "asin",
      "offset": 681
    },
    {
      "index": 78,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "acos",
      "offset": 686
    },
    {
      "index": 79,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "atan",
      "offset": 691
    },
    {
      "index": 80,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "atan2",
      "offset": 696
    },
    {
      "index": 81,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 702
    },
    {
      "index": 82,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 708
    },
    {
      "index": 83,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "trunc",
      "offset": 713
    },
    {
      "index": 84,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 719
    },
    {
      "index": 85,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fmod",
      "offset": 725
    },
    {
      "index": 86,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "remainder",
      "offset": 730
    },
    {
      "index": 87,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "1234.125",
      "offset": 740
    },
    {
      "index": 88,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 749
    },
    {
      "index": 89,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.13",
      "offset": 757
    },
    {
      "index": 90,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "down",
      "offset": 765
    },
    {
      "index": 91,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "1234.12",
      "offset": 770
    },
    {
      "index": 92,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "toExponential",
      "offset": 778
    },
    {
      "index": 93,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "1.234125e+3",
      "offset": 792
    },
    {
      "index": 94,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23413e+3",
      "offset": 804
    },
    {
      "index": 95,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDZ",
      "offset": 815
    },
    {
      "index": 96,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "1.23412e+3",
      "offset": 820
    },
    {
      "index": 97,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 831
    },
    {
      "index": 98,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "123.438",
      "offset": 843
    },
    {
      "index": 99,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "323.438",
      "offset": 851
    },
    {
      "index": 100,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "723.438",
      "offset": 859
    },
    {
      "index": 101,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "f23.438",
      "offset": 867
    },
    {
      "index": 102,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "RNDNA",
      "offset": 875
    },
    {
      "index": 103,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.44",
      "offset": 881
    },
    {
      "index": 104,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "323.44",
      "offset": 888
    },
    {
      "index": 105,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "723.44",
      "offset": 895
    },
    {
      "index": 106,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "f23.44",
      "offset": 902
    },
    {
      "index": 107,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "0.000044",
      "offset": 909
    },
    {
      "index": 108,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "1230000000.0",
      "offset": 918
    },
    {
      "index": 109,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "123.43",
      "offset": 931
    },
    {
      "index": 110,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDD",
      "offset": 938
    },
    {
      "index": 111,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "-f23.44",
      "offset": 943
    },
    {
      "index": 112,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "1.2344p+8",
      "offset": 951
    },
    {
      "index": 113,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 961
    },
    {
      "index": 114,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BigDecimal",
      "offset": 963
    },
    {
      "index": 115,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "1234.1",
      "offset": 974
    },
    {
      "index": 116,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "    1234.1",
      "offset": 981
    },
    {
      "index": 117,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "    1234.1  ",
      "offset": 992
    },
    {
      "index": 118,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "half-even",
      "offset": 1005
    },
    {
      "index": 119,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "roundingMode",
      "offset": 1015
    },
    {
      "index": 120,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "maximumSignificantDigits",
      "offset": 1028
    },
    {
      "index": 121,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "maximumFractionDigits",
      "offset": 1053
    },
    {
      "index": 122,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 1075
    },
    {
      "index": 123,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mul",
      "offset": 1079
    },
    {
      "index": 124,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mod",
      "offset": 1083
    },
    {
      "index": 125,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "-1234.13",
      "offset": 1087
    }
  ],
  "functionHeader": {
    "offset": 1096,
    "tag": "0xc",
    "remaining": 8653
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 106,
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
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 35
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_eq",
      "offset": 45
    },
    {
      "index": 6,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint1",
      "offset": 53
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint2",
      "offset": 66
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_divrem",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "test_idiv1",
      "offset": 91
    },
    {
      "index": 10,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_bigint_ext",
      "offset": 102
    },
    {
      "index": 11,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "test_bigfloat",
      "offset": 118
    },
    {
      "index": 12,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_bigdecimal",
      "offset": 132
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "use strict",
      "offset": 148
    },
    {
      "index": 14,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 159
    },
    {
      "index": 15,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 172
    },
    {
      "index": 16,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_bignum.js",
      "offset": 187
    },
    {
      "index": 17,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 235
    },
    {
      "index": 18,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 242
    },
    {
      "index": 19,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 251
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 275
    },
    {
      "index": 21,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 277
    },
    {
      "index": 22,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 290
    },
    {
      "index": 23,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 293
    },
    {
      "index": 24,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 295
    },
    {
      "index": 25,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 299
    },
    {
      "index": 26,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 304
    },
    {
      "index": 27,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 307
    },
    {
      "index": 28,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 326
    },
    {
      "index": 29,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 328
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 330
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 332
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 334
    },
    {
      "index": 33,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 336
    },
    {
      "index": 34,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 31n === 2147483648n",
      "offset": 341
    },
    {
      "index": 35,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 32n === 4294967296n",
      "offset": 366
    },
    {
      "index": 36,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "  123",
      "offset": 391
    },
    {
      "index": 37,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123   ",
      "offset": 397
    },
    {
      "index": 38,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 406
    },
    {
      "index": 39,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 408
    },
    {
      "index": 40,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 410
    },
    {
      "index": 41,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 413
    },
    {
      "index": 42,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "div1",
      "offset": 422
    },
    {
      "index": 43,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "q",
      "offset": 427
    },
    {
      "index": 44,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "div",
      "offset": 429
    },
    {
      "index": 45,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "divrem",
      "offset": 433
    },
    {
      "index": 46,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 440
    },
    {
      "index": 47,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "rem",
      "offset": 442
    },
    {
      "index": 48,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "floorLog2",
      "offset": 446
    },
    {
      "index": 49,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sqrtrem",
      "offset": 456
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tdiv",
      "offset": 464
    },
    {
      "index": 51,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fdiv",
      "offset": 469
    },
    {
      "index": 52,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "cdiv",
      "offset": 474
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ediv",
      "offset": 479
    },
    {
      "index": 54,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "sqrt2",
      "offset": 484
    },
    {
      "index": 55,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 490
    },
    {
      "index": 56,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "bigfloat",
      "offset": 492
    },
    {
      "index": 57,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "BigFloatEnv",
      "offset": 501
    },
    {
      "index": 58,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 513
    },
    {
      "index": 59,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "BigFloat",
      "offset": 518
    },
    {
      "index": 60,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "parseFloat",
      "offset": 527
    },
    {
      "index": 61,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "0x1.6a09e667f3bcc908b2fb1366ea957d3e",
      "offset": 538
    },
    {
      "index": 62,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "inexact",
      "offset": 575
    },
    {
      "index": 63,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "fpRound",
      "offset": 583
    },
    {
      "index": 64,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "a09e667f3bcc908b2fb1366ea95l",
      "offset": 591
    },
    {
      "index": 65,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "setPrec",
      "offset": 620
    },
    {
      "index": 66,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bind",
      "offset": 628
    },
    {
      "index": 67,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isNaN",
      "offset": 633
    },
    {
      "index": 68,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "isFinite",
      "offset": 639
    },
    {
      "index": 69,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 648
    },
    {
      "index": 70,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sign",
      "offset": 652
    },
    {
      "index": 71,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "exp",
      "offset": 657
    },
    {
      "index": 72,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 661
    },
    {
      "index": 73,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 665
    },
    {
      "index": 74,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sin",
      "offset": 669
    },
    {
      "index": 75,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "cos",
      "offset": 673
    },
    {
      "index": 76,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tan",
      "offset": 677
    },
    {
      "index": 77,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "asin",
      "offset": 681
    },
    {
      "index": 78,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "acos",
      "offset": 686
    },
    {
      "index": 79,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "atan",
      "offset": 691
    },
    {
      "index": 80,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "atan2",
      "offset": 696
    },
    {
      "index": 81,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 702
    },
    {
      "index": 82,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 708
    },
    {
      "index": 83,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "trunc",
      "offset": 713
    },
    {
      "index": 84,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 719
    },
    {
      "index": 85,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "fmod",
      "offset": 725
    },
    {
      "index": 86,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "remainder",
      "offset": 730
    },
    {
      "index": 87,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "toFixed",
      "offset": 740
    },
    {
      "index": 88,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "down",
      "offset": 748
    },
    {
      "index": 89,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "toExponential",
      "offset": 753
    },
    {
      "index": 90,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDZ",
      "offset": 767
    },
    {
      "index": 91,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toPrecision",
      "offset": 772
    },
    {
      "index": 92,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "RNDNA",
      "offset": 784
    },
    {
      "index": 93,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "RNDD",
      "offset": 790
    },
    {
      "index": 94,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 795
    },
    {
      "index": 95,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BigDecimal",
      "offset": 797
    },
    {
      "index": 96,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "1234.1",
      "offset": 808
    },
    {
      "index": 97,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "    1234.1",
      "offset": 815
    },
    {
      "index": 98,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "    1234.1  ",
      "offset": 826
    },
    {
      "index": 99,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "half-even",
      "offset": 839
    },
    {
      "index": 100,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "roundingMode",
      "offset": 849
    },
    {
      "index": 101,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "maximumSignificantDigits",
      "offset": 862
    },
    {
      "index": 102,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "maximumFractionDigits",
      "offset": 887
    },
    {
      "index": 103,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 909
    },
    {
      "index": 104,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mul",
      "offset": 913
    },
    {
      "index": 105,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "mod",
      "offset": 917
    }
  ],
  "functionHeader": {
    "offset": 921,
    "tag": "0xc",
    "remaining": 8424
  }
}
```

## 字节级差异

共发现 8260 个字节差异:

- 偏移量 0x1: TS=0x7e vs WASM=0x6a
- 偏移量 0x2e4: TS=0x10 vs WASM=0x0e
- 偏移量 0x2e5: TS=0x31 vs WASM=0x74
- 偏移量 0x2e6: TS=0x32 vs WASM=0x6f
- 偏移量 0x2e7: TS=0x33 vs WASM=0x46
- 偏移量 0x2e8: TS=0x34 vs WASM=0x69
- 偏移量 0x2e9: TS=0x2e vs WASM=0x78
- 偏移量 0x2ea: TS=0x31 vs WASM=0x65
- 偏移量 0x2eb: TS=0x32 vs WASM=0x64
- 偏移量 0x2ec: TS=0x35 vs WASM=0x08
- 偏移量 0x2ed: TS=0x0e vs WASM=0x64
- 偏移量 0x2ee: TS=0x74 vs WASM=0x6f
- 偏移量 0x2ef: TS=0x6f vs WASM=0x77
- 偏移量 0x2f0: TS=0x46 vs WASM=0x6e
- 偏移量 0x2f1: TS=0x69 vs WASM=0x1a
- 偏移量 0x2f2: TS=0x78 vs WASM=0x74
- 偏移量 0x2f3: TS=0x65 vs WASM=0x6f
- 偏移量 0x2f4: TS=0x64 vs WASM=0x45
- 偏移量 0x2f5: TS=0x0e vs WASM=0x78
- 偏移量 0x2f6: TS=0x31 vs WASM=0x70
- ... (显示前20个差异，总共8260个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 7e 02 65 0c 61 73 73 65 72 74 18 61 73 73 65 |.~.e.assert.asse|
00000010: 72 74 54 68 72 6f 77 73 14 62 69 67 69 6e 74 5f |rtThrows.bigint_|
00000020: 70 6f 77 12 74 65 73 74 5f 6c 65 73 73 0e 74 65 |pow.test_less.te|
00000030: 73 74 5f 65 71 18 74 65 73 74 5f 62 69 67 69 6e |st_eq.test_bigin|
00000040: 74 31 18 74 65 73 74 5f 62 69 67 69 6e 74 32 16 |t1.test_bigint2.|
00000050: 74 65 73 74 5f 64 69 76 72 65 6d 14 74 65 73 74 |test_divrem.test|
00000060: 5f 69 64 69 76 31 1e 74 65 73 74 5f 62 69 67 69 |_idiv1.test_bigi|
00000070: 6e 74 5f 65 78 74 1a 74 65 73 74 5f 62 69 67 66 |nt_ext.test_bigf|
00000080: 6c 6f 61 74 1e 74 65 73 74 5f 62 69 67 64 65 63 |loat.test_bigdec|
00000090: 69 6d 61 6c 14 75 73 65 20 73 74 72 69 63 74 18 |imal.use strict.|
000000a0: 5f 5f 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 |__loadScript.tes|
000000b0: 74 5f 61 73 73 65 72 74 2e 6a 73 5e 5f 5f 74 65 |t_assert.js^__te|
000000c0: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 71 |sts__/fixtures/q|
000000d0: 75 69 63 6b 6a 73 2d 74 65 73 74 73 2f 74 65 73 |uickjs-tests/tes|
000000e0: 74 5f 62 69 67 6e 75 6d 2e 6a 73 0c 61 63 74 75 |t_bignum.js.actu|
000000f0: 61 6c 10 65 78 70 65 63 74 65 64 2e 61 73 73 65 |al.expected.asse|
00000100: 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f |rtion failed: go|
00000110: 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 |t |.|., expected|
00000120: 20 7c 04 20 28 02 29 06 65 72 72 08 66 75 6e 63 | |. (.).err.func|
00000130: 04 65 78 24 65 78 63 65 70 74 69 6f 6e 20 65 78 |.ex$exception ex|
00000140: 70 65 63 74 65 64 02 61 02 6e 02 72 02 69 02 62 |pected.a.n.r.i.b|
00000150: 08 73 71 72 74 30 31 20 3c 3c 20 33 31 6e 20 3d |.sqrt01 << 31n =|
00000160: 3d 3d 20 32 31 34 37 34 38 33 36 34 38 6e 30 31 |== 2147483648n01|
00000170: 20 3c 3c 20 33 32 6e 20 3d 3d 3d 20 34 32 39 34 | << 32n === 4294|
00000180: 39 36 37 32 39 36 6e 0a 20 20 31 32 33 10 20 20 |967296n.  123.  |
00000190: 31 32 33 20 20 20 02 2b 02 2d 04 00 61 10 20 20 |123   .+.-..a.  |
000001a0: 31 32 33 20 20 72 08 64 69 76 31 02 71 06 64 69 |123  r.div1.q.di|
000001b0: 76 0c 64 69 76 72 65 6d 02 74 06 72 65 6d 12 66 |v.divrem.t.rem.f|
000001c0: 6c 6f 6f 72 4c 6f 67 32 0e 73 71 72 74 72 65 6d |loorLog2.sqrtrem|
000001d0: 08 74 64 69 76 08 66 64 69 76 08 63 64 69 76 08 |.tdiv.fdiv.cdiv.|
000001e0: 65 64 69 76 0a 73 71 72 74 32 02 6c 10 62 69 67 |ediv.sqrt2.l.big|
000001f0: 66 6c 6f 61 74 16 42 69 67 46 6c 6f 61 74 45 6e |float.BigFloatEn|
00000200: 76 08 70 72 65 63 10 42 69 67 46 6c 6f 61 74 14 |v.prec.BigFloat.|
00000210: 70 61 72 73 65 46 6c 6f 61 74 48 30 78 31 2e 36 |parseFloatH0x1.6|
00000220: 61 30 39 65 36 36 37 66 33 62 63 63 39 30 38 62 |a09e667f3bcc908b|
00000230: 32 66 62 31 33 36 36 65 61 39 35 37 64 33 65 0e |2fb1366ea957d3e.|
00000240: 69 6e 65 78 61 63 74 0e 66 70 52 6f 75 6e 64 38 |inexact.fpRound8|
00000250: 61 30 39 65 36 36 37 66 33 62 63 63 39 30 38 62 |a09e667f3bcc908b|
00000260: 32 66 62 31 33 36 36 65 61 39 35 6c 0e 73 65 74 |2fb1366ea95l.set|
00000270: 50 72 65 63 08 62 69 6e 64 0a 69 73 4e 61 4e 10 |Prec.bind.isNaN.|
00000280: 69 73 46 69 6e 69 74 65 06 61 62 73 08 73 69 67 |isFinite.abs.sig|
00000290: 6e 06 65 78 70 06 6c 6f 67 06 70 6f 77 06 73 69 |n.exp.log.pow.si|
000002a0: 6e 06 63 6f 73 06 74 61 6e 08 61 73 69 6e 08 61 |n.cos.tan.asin.a|
000002b0: 63 6f 73 08 61 74 61 6e 0a 61 74 61 6e 32 0a 66 |cos.atan.atan2.f|
000002c0: 6c 6f 6f 72 08 63 65 69 6c 0a 74 72 75 6e 63 0a |loor.ceil.trunc.|
000002d0: 72 6f 75 6e 64 08 66 6d 6f 64 12 72 65 6d 61 69 |round.fmod.remai|
000002e0: 6e 64 65 72 10 31 32 33 34 2e 31 32 35 0e 74 6f |nder.1234.125.to|
000002f0: 46 69 78 65 64 0e 31 32 33 34 2e 31 33 08 64 6f |Fixed.1234.13.do|
00000300: 77 6e 0e 31 32 33 34 2e 31 32 1a 74 6f 45 78 70 |wn.1234.12.toExp|
00000310: 6f 6e 65 6e 74 69 61 6c 16 31 2e 32 33 34 31 32 |onential.1.23412|
00000320: 35 65 2b 33 14 31 2e 32 33 34 31 33 65 2b 33 08 |5e+3.1.23413e+3.|
00000330: 52 4e 44 5a 14 31 2e 32 33 34 31 32 65 2b 33 16 |RNDZ.1.23412e+3.|
00000340: 74 6f 50 72 65 63 69 73 69 6f 6e 0e 31 32 33 2e |toPrecision.123.|
00000350: 34 33 38 0e 33 32 33 2e 34 33 38 0e 37 32 33 2e |438.323.438.723.|
00000360: 34 33 38 0e 66 32 33 2e 34 33 38 0a 52 4e 44 4e |438.f23.438.RNDN|
00000370: 41 0c 31 32 33 2e 34 34 0c 33 32 33 2e 34 34 0c |A.123.44.323.44.|
00000380: 37 32 33 2e 34 34 0c 66 32 33 2e 34 34 10 30 2e |723.44.f23.44.0.|
00000390: 30 30 30 30 34 34 18 31 32 33 30 30 30 30 30 30 |000044.123000000|
000003a0: 30 2e 30 0c 31 32 33 2e 34 33 08 52 4e 44 44 0e |0.0.123.43.RNDD.|
000003b0: 2d 66 32 33 2e 34 34 12 31 2e 32 33 34 34 70 2b |-f23.44.1.2344p+|
000003c0: 38 02 6d 14 42 69 67 44 65 63 69 6d 61 6c 0c 31 |8.m.BigDecimal.1|
000003d0: 32 33 34 2e 31 14 20 20 20 20 31 32 33 34 2e 31 |234.1.    1234.1|
000003e0: 18 20 20 20 20 31 32 33 34 2e 31 20 20 12 68 61 |.    1234.1  .ha|
000003f0: 6c 66 2d 65 76 65 6e 18 72 6f 75 6e 64 69 6e 67 |lf-even.rounding|
00000400: 4d 6f 64 65 30 6d 61 78 69 6d 75 6d 53 69 67 6e |Mode0maximumSign|
00000410: 69 66 69 63 61 6e 74 44 69 67 69 74 73 2a 6d 61 |ificantDigits*ma|
00000420: 78 69 6d 75 6d 46 72 61 63 74 69 6f 6e 44 69 67 |ximumFractionDig|
00000430: 69 74 73 06 73 75 62 06 6d 75 6c 06 6d 6f 64 10 |its.sub.mul.mod.|
00000440: 2d 31 32 33 34 2e 31 33 0c 00 06 00 a4 01 00 02 |-1234.13........|
00000450: 00 03 00 0c f2 01 02 a6 01 00 00 00 c8 03 03 00 |................|
00000460: 03 40 e5 00 00 00 40 40 e6 00 00 00 40 40 e7 00 |.@....@@....@@..|
00000470: 00 00 40 40 e8 00 00 00 40 40 e9 00 00 00 40 40 |..@@....@@....@@|
00000480: ea 00 00 00 40 40 eb 00 00 00 40 40 ec 00 00 00 |....@@....@@....|
00000490: 40 40 ed 00 00 00 40 40 ee 00 00 00 40 40 ef 00 |@@....@@....@@..|
000004a0: 00 00 40 40 f0 00 00 00 40 c2 00 41 e5 00 00 00 |..@@....@..A....|
000004b0: 00 c2 01 41 e6 00 00 00 00 c2 02 41 e7 00 00 00 |...A.......A....|
000004c0: 00 c2 03 41 e8 00 00 00 00 c2 04 41 e9 00 00 00 |...A.......A....|
000004d0: 00 c2 05 41 ea 00 00 00 00 c2 06 41 eb 00 00 00 |...A.......A....|
000004e0: 00 c2 07 41 ec 00 00 00 00 c2 08 41 ed 00 00 00 |...A.......A....|
000004f0: 00 c2 09 41 ee 00 00 00 00 c2 0a 41 ef 00 00 00 |...A.......A....|
00000500: 00 c2 0b 41 f0 00 00 00 00 04 f1 00 00 00 cb 06 |...A............|
00000510: cb 6f 13 00 00 00 39 f2 00 00 00 04 f3 00 00 00 |.o....9.........|
00000520: f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 39 |......o.......09|
00000530: ea 00 00 00 f0 cb 39 eb 00 00 00 f0 cb 39 ee 00 |......9......9..|
00000540: 00 00 f0 cb 39 ef 00 00 00 f0 cb 39 f0 00 00 00 |....9......9....|
00000550: f0 cf 28 e8 03 24 00 00 00 a8 01 06 00 00 0d 38 |..(..$.........8|
00000560: 08 34 18 00 0f fc 03 1f 1b 18 0d 17 1b 18 0d 17 |.4..............|
00000570: 1b 1e 0d 1d 1b 1a 0d 19 1b 1e 00 0c 43 06 00 ca |............C...|
00000580: 03 03 01 03 04 00 00 83 01 04 ea 03 00 01 00 ec |................|
00000590: 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 01 cb |....h...........|
000005a0: c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 07 |.............)..|
000005b0: ae 11 ec 05 0e d4 07 ae 11 ec 0a 0e d3 99 04 4b |...............K|
000005c0: 00 00 00 ab 11 ec 0a 0e d4 99 04 4b 00 00 00 ab |...........K....|
000005d0: 11 ec 15 0e d3 43 39 00 00 00 24 00 00 d4 43 39 |.....C9...$...C9|
000005e0: 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 |...$.....)9.....|
000005f0: f7 00 00 00 d3 9f 04 f8 00 00 00 9f 04 f9 00 00 |................|
00000600: 00 9f d4 9f 04 f8 00 00 00 9f d5 ec 10 04 fa 00 |................|
00000610: 00 00 d5 9f 04 fb 00 00 00 9f ee 02 c3 9f f1 30 |...............0|
00000620: e8 03 50 04 00 12 10 07 12 0c 10 12 21 0d 00 07 |..P.........!...|
00000630: 16 07 07 12 0d 08 00 0c 0e 1b 18 0c 12 1c 23 07 |..............#.|
00000640: 0e 39 2c 07 12 3a 59 07 0c 1b 12 11 0e 07 10 1b |.9,..:Y.........|
00000650: 12 11 29 12 29 08 04 34 44 07 03 20 12 20 0c 08 |..).)..4D.. . ..|
00000660: 3f 07 03 20 16 08 31 2a 22 07 03 20 14 15 0c 06 |?.. ..1*".. ....|
00000670: 31 07 15 00 0c 43 06 00 cc 03 02 02 02 04 00 00 |1....C..........|
00000680: 31 04 f8 03 00 01 00 fa 03 00 01 00 fc 03 00 00 |1...............|
00000690: 00 c8 03 03 00 03 09 cb 6f 0a 00 00 00 d4 f0 0e |........o.......|
000006a0: 0e ee 17 cc 6f 13 00 00 00 0a cb 39 e5 00 00 00 |....o......9....|
000006b0: c8 d3 a9 f1 0e 0e ee 02 30 39 e5 00 00 00 c7 0a |........09......|
000006c0: 04 ff 00 00 00 f3 29 e8 03 1a 11 00 04 08 27 08 |......).......'.|
000006d0: 07 08 3c 07 0d 00 1b 0e 07 1a 07 15 07 05 22 13 |..<...........".|
000006e0: 1b 0e 25 01 00 0c 43 06 00 ce 03 02 02 02 02 00 |..%...C.........|
000006f0: 00 26 04 80 04 00 01 00 82 04 00 01 00 84 04 00 |.&..............|
00000700: 00 00 86 04 00 01 00 b4 01 00 00 00 cb b4 00 00 |................|
00000710: 00 00 cc c8 d4 a5 ec 14 39 02 01 00 00 d3 9c 11 |........9.......|
00000720: 3a 02 01 00 00 0e c8 91 cc ee e9 c7 28 e8 03 1a |:...........(...|
00000730: 23 00 04 08 21 0a 20 10 07 08 07 03 12 15 1b 0a |#...!. .........|
00000740: 07 05 29 1c 07 02 18 1b 07 0d 00 0c 43 06 00 d0 |..).........C...|
00000750: 03 02 00 02 03 00 00 69 02 80 04 00 01 00 88 04 |.......i........|
00000760: 00 01 00 39 e5 00 00 00 d3 d4 a5 f1 0e 39 e5 00 |...9.........9..|
00000770: 00 00 d4 d3 a5 98 f1 0e 39 e5 00 00 00 d3 d4 a6 |........9.......|
00000780: f1 0e 39 e5 00 00 00 d4 d3 a6 98 f1 0e 39 e5 00 |..9..........9..|
00000790: 00 00 d4 d3 a7 f1 0e 39 e5 00 00 00 d3 d4 a7 98 |.......9........|
000007a0: f1 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 |..9.........9...|
000007b0: 00 d3 d4 a8 98 f1 0e 39 e5 00 00 00 d3 d4 ac f1 |.......9........|
000007c0: 0e 39 e5 00 00 00 d3 d4 ab 98 f1 29 e8 03 66 2b |.9.........)..f+|
000007d0: 00 03 08 1b 0e 07 08 07 03 07 05 0d 0b 1b 12 07 |................|
000007e0: 08 07 03 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d |................|
000007f0: 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 0e 07 08 07 |................|
00000800: 03 07 05 0d 0b 1b 12 07 08 07 03 0c 09 0d 0b 1b |................|
00000810: 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 0a 07 05 0c |................|
00000820: 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 |................|
00000830: 0a 07 05 0c 09 00 0c 43 06 00 d2 03 02 00 02 03 |.......C........|
00000840: 00 00 68 02 80 04 00 01 00 88 04 00 01 00 39 e5 |..h...........9.|
00000850: 00 00 00 d3 d4 ab f1 0e 39 e5 00 00 00 d4 d3 ab |........9.......|
00000860: f1 0e 39 e5 00 00 00 d3 d4 ac 98 f1 0e 39 e5 00 |..9..........9..|
00000870: 00 00 d4 d3 ac 98 f1 0e 39 e5 00 00 00 d3 d4 a6 |........9.......|
00000880: f1 0e 39 e5 00 00 00 d4 d3 a6 f1 0e 39 e5 00 00 |..9.........9...|
00000890: 00 d3 d4 a5 98 f1 0e 39 e5 00 00 00 d3 d4 a8 f1 |.......9........|
000008a0: 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 00 |.9.........9....|
000008b0: d3 d4 a7 98 f1 29 e8 03 66 38 00 03 08 1b 0e 07 |.....)..f8......|
000008c0: 0a 07 05 07 05 0d 0b 1b 0e 07 0a 07 05 07 05 0d |................|
000008d0: 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 12 07 0a 07 |................|
000008e0: 05 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b |................|
000008f0: 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c |................|
00000900: 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 0e 07 |................|
00000910: 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c 09 00 |................|
00000920: 0c 43 06 00 d4 03 00 02 00 04 00 05 d1 01 02 80 |.C..............|
00000930: 04 00 00 00 84 04 00 01 00 39 e8 00 00 00 b4 02 |.........9......|
00000940: 00 00 00 b4 03 00 00 00 f2 0e 39 e9 00 00 00 b4 |..........9.....|
00000950: 03 00 00 00 b4 03 00 00 00 f2 0e 39 e8 00 00 00 |...........9....|
00000960: b9 b4 03 00 00 00 f2 0e 39 e9 00 00 00 ba b4 03 |........9.......|
00000970: 00 00 00 f2 0e 39 e8 00 00 00 c1 00 b4 03 00 00 |.....9..........|
00000980: 00 f2 0e 39 e9 00 00 00 39 a5 00 00 00 43 05 01 |...9....9....C..|
00000990: 00 00 bb 24 01 00 b4 02 00 00 00 f2 0e 39 e7 00 |...$.........9..|
000009a0: 00 00 b4 03 00 00 00 b4 64 00 00 00 f2 cb 39 e5 |........d.....9.|
000009b0: 00 00 00 c7 b4 01 00 00 00 a0 c7 ac f1 0e 39 e5 |..............9.|
000009c0: 00 00 00 c7 c1 01 ab f1 0e 39 e5 00 00 00 c7 c1 |.........9......|
000009d0: 02 ab f1 0e b4 01 00 00 00 b4 1f 00 00 00 a2 cc |................|
000009e0: 39 e5 00 00 00 c8 c1 03 04 06 01 00 00 f3 0e b4 |9...............|
000009f0: 01 00 00 00 b4 20 00 00 00 a2 cc 39 e5 00 00 00 |..... .....9....|
00000a00: c8 c1 04 04 07 01 00 00 f3 29 e8 03 54 44 00 04 |.........)..TD..|
00000a10: 08 4d 12 0d 11 4d 0e 0d 0d 39 12 0d 11 39 0e 0d |.M...M...9...9..|
00000a20: 0d 3e 12 0d 11 1b 10 1b 08 20 0a 2a 13 0d 05 4d |.>....... .*...M|
00000a30: 14 0d 1b 1b 10 20 04 07 12 07 05 07 13 0d 0b 1b |..... ..........|
00000a40: 0e 11 04 07 05 0d 0b 1b 0e 11 04 07 05 0d 0b 34 |...............4|
00000a50: 0e 0d 0d 1b 0e 2a 01 0d 0b 34 0e 0d 0d 1b 0e 2a |.....*...4.....*|
00000a60: 01 00 06 cd cc cc cc cc cc 00 40 0a 14 d1 13 38 |..........@....8|
00000a70: cf 55 7d 94 d6 75 f7 41 5b 56 68 37 67 ca 53 46 |.U}..u.A[Vh7g.SF|
00000a80: 5a 0a 14 d1 13 38 cf 55 7d 94 d6 75 f7 41 5b 56 |Z....8.U}..u.A[V|
00000a90: 68 37 67 ca 53 46 5a 0a 05 00 00 00 80 00 0a 05 |h7g.SFZ.........|
00000aa0: 00 00 00 00 01 0c 43 06 00 d6 03 00 00 00 03 00 |......C.........|
00000ab0: 04 79 00 39 e5 00 00 00 39 b9 00 00 00 c3 f1 b4 |.y.9....9.......|
00000ac0: 00 00 00 00 f2 0e 39 e5 00 00 00 39 b9 00 00 00 |......9....9....|
00000ad0: 04 08 01 00 00 f1 b4 7b 00 00 00 f2 0e 39 e5 00 |.......{.....9..|
00000ae0: 00 00 39 b9 00 00 00 04 09 01 00 00 f1 b4 7b 00 |..9...........{.|
00000af0: 00 00 f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 00 |....9....9......|
00000b00: f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 01 f2 0e |..9....9........|
00000b10: 39 e6 00 00 00 39 d2 00 00 00 c2 02 f2 0e 39 e6 |9....9........9.|
00000b20: 00 00 00 39 d2 00 00 00 c2 03 f2 29 e8 03 32 55 |...9.......)..2U|
00000b30: 00 03 08 1b 0e 20 0c 20 0d 0d 0b 1b 0e 34 0c 20 |..... . .....4. |
00000b40: 0d 0d 0b 1b 0e 34 0c 20 0d 0d 0b 1b 1a 25 01 0d |.....4. .....%..|
00000b50: 17 1b 1a 25 01 0d 17 1b 1a 25 01 0d 17 1b 1a 25 |...%.....%.....%|
00000b60: 01 00 0c 42 06 00 00 00 00 00 02 00 00 0c 00 39 |...B...........9|
00000b70: b9 00 00 00 04 0a 01 00 00 f1 29 e8 03 06 59 1e |..........)...Y.|
00000b80: 02 10 34 0c 00 0c 42 06 00 00 00 00 00 02 00 00 |..4...B.........|
00000b90: 0c 00 39 b9 00 00 00 04 0b 01 00 00 f1 29 e8 03 |..9..........)..|
00000ba0: 06 5a 1e 02 10 34 0c 00 0c 42 06 00 00 00 00 00 |.Z...4...B......|
00000bb0: 02 00 00 0c 00 39 b9 00 00 00 04 0c 01 00 00 f1 |.....9..........|
00000bc0: 29 e8 03 06 5b 1e 02 10 34 0c 00 0c 42 06 00 00 |)...[...4...B...|
00000bd0: 00 00 00 02 00 00 0c 00 39 b9 00 00 00 04 0d 01 |........9.......|
00000be0: 00 00 f1 29 e8 03 06 5c 1e 02 10 34 0c 00 0c 43 |...)...\...4...C|
00000bf0: 06 00 d8 03 04 03 04 05 00 00 44 07 9c 04 00 01 |..........D.....|
00000c00: 00 80 04 00 01 00 88 04 00 01 00 9e 04 00 01 00 |................|
00000c10: a0 04 00 00 00 a2 04 00 01 00 a4 04 00 02 00 39 |...............9|
00000c20: b9 00 00 00 d3 48 cb 39 b9 00 00 00 d3 04 13 01 |.....H.9........|
00000c30: 00 00 9f 48 cc 39 e5 00 00 00 c7 d4 d5 f2 d6 ab |...H.9..........|
00000c40: f1 0e c8 d4 d5 f2 cd 39 e5 00 00 00 c9 b7 48 d6 |.......9......H.|
00000c50: ab f1 0e 39 e5 00 00 00 d4 d5 d6 9c c9 b8 48 9f |...9..........H.|
00000c60: ab f1 29 e8 03 48 5e 00 04 14 1b 0e 07 01 0d 05 |..)..H^.........|
00000c70: 1b 0e 20 0a 07 0b 0d 1d 1b 0e 07 08 07 06 07 07 |.. .............|
00000c80: 07 14 07 05 07 15 0d 03 07 0e 07 06 07 07 0d 13 |................|
00000c90: 1b 0e 0c 02 07 0e 07 05 07 0b 0d 0b 1b 0e 07 0a |................|
00000ca0: 07 08 07 03 07 0c 0c 02 07 05 07 11 07 05 00 0c |................|
00000cb0: 43 06 00 da 03 04 00 04 06 00 00 40 04 a0 04 00 |C..........@....|
00000cc0: 01 00 80 04 00 01 00 88 04 00 01 00 84 04 00 01 |................|
00000cd0: 00 39 ec 00 00 00 d3 d4 d5 d6 b7 48 22 04 00 0e |.9.........H"...|
00000ce0: 39 ec 00 00 00 d3 d4 8e d5 d6 b8 48 22 04 00 0e |9..........H"...|
00000cf0: 39 ec 00 00 00 d3 d4 d5 8e d6 b9 48 22 04 00 0e |9..........H"...|
00000d00: 39 ec 00 00 00 d3 d4 8e d5 8e d6 ba 48 22 04 00 |9...........H"..|
00000d10: 29 e8 03 42 67 00 03 08 1b 18 07 0a 07 06 07 06 |)..Bg...........|
00000d20: 0c 02 07 19 17 15 1b 18 07 0c 07 01 07 08 07 06 |................|
00000d30: 0c 02 07 1b 17 15 1b 18 07 0a 07 08 07 01 07 08 |................|
00000d40: 0c 02 07 1b 17 15 1b 18 07 0c 07 01 07 0a 07 01 |................|
00000d50: 07 08 0c 02 07 1d 00 0c 43 06 00 dc 03 00 01 00 |........C.......|
00000d60: 08 00 05 c6 02 01 84 04 00 00 00 39 e5 00 00 00 |...........9....|
00000d70: 39 b9 00 00 00 43 14 01 00 00 b4 00 00 00 00 24 |9....C.........$|
00000d80: 01 00 b4 01 00 00 00 8e ad f1 0e 39 e5 00 00 00 |...........9....|
00000d90: 39 b9 00 00 00 43 14 01 00 00 b4 07 00 00 00 24 |9....C.........$|
00000da0: 01 00 b4 02 00 00 00 ad f1 0e 39 e5 00 00 00 39 |..........9....9|
00000db0: b9 00 00 00 43 05 01 00 00 c1 00 24 01 00 c1 01 |....C......$....|
00000dc0: ad f1 0e 39 b9 00 00 00 43 15 01 00 00 c1 02 24 |...9....C......$|
00000dd0: 01 00 cb 39 e5 00 00 00 c7 b7 48 c1 03 ad f1 0e |...9......H.....|
00000de0: 39 e5 00 00 00 c7 b8 48 c1 04 ad f1 0e 39 ed 00 |9......H.....9..|
00000df0: 00 00 04 16 01 00 00 b4 03 00 00 00 b4 02 00 00 |................|
00000e00: 00 b4 01 00 00 00 b4 01 00 00 00 8e b4 01 00 00 |................|
00000e10: 00 8e b4 01 00 00 00 26 04 00 22 04 00 0e 39 ed |.......&.."...9.|
00000e20: 00 00 00 04 17 01 00 00 b4 03 00 00 00 b4 02 00 |................|
00000e30: 00 00 b4 01 00 00 00 b4 02 00 00 00 8e b4 02 00 |................|
00000e40: 00 00 8e b4 01 00 00 00 26 04 00 22 04 00 0e 39 |........&.."...9|
00000e50: ed 00 00 00 04 18 01 00 00 b4 03 00 00 00 b4 02 |................|
00000e60: 00 00 00 b4 02 00 00 00 b4 01 00 00 00 8e b4 01 |................|
00000e70: 00 00 00 8e b4 02 00 00 00 26 04 00 22 04 00 0e |.........&.."...|
00000e80: 39 ed 00 00 00 04 19 01 00 00 b4 03 00 00 00 b4 |9...............|
00000e90: 02 00 00 00 b4 01 00 00 00 b4 02 00 00 00 8e b4 |................|
00000ea0: 01 00 00 00 8e b4 02 00 00 00 26 04 00 22 04 00 |..........&.."..|
00000eb0: 29 e8 03 62 6e 00 04 08 1b 0e 1b 0c 34 14 2a 12 |)..bn.......4.*.|
00000ec0: 07 07 07 2b 0d 0b 1b 0e 1b 0c 34 14 2a 0a 07 2b |...+......4.*..+|
00000ed0: 0d 0b 1b 0e 1b 0c 25 0a 1b 38 07 4f 0d 03 1b 0c |......%..8.O....|
00000ee0: 25 10 17 23 1b 0e 0c 02 11 08 07 0b 0d 0b 1b 0e |%..#............|
00000ef0: 0c 02 11 08 07 0b 0d 0b 98 40 20 0a 2f 35 17 13 |.........@ ./5..|
00000f00: 98 40 20 0a 2f 35 17 13 98 40 20 0a 2f 35 17 13 |.@ ./5...@ ./5..|
00000f10: 98 40 20 0a 2f 35 00 0a 0c 00 00 00 00 00 00 00 |.@ ./5..........|
00000f20: c0 ff ff ff 00 0a 06 ff ff fd ff ff 0f 0a 0c 00 |................|
00000f30: 00 00 00 00 00 00 c0 ff ff ff 00 0a 06 ff ff fd |................|
00000f40: ff ff 0f 0a 06 ff ff fb ff fb 1f 0c 43 06 00 de |............C...|
00000f50: 03 00 04 00 07 00 31 f6 0f 04 c8 03 00 00 00 80 |......1.........|
00000f60: 04 00 01 00 88 04 00 02 00 b4 04 00 03 00 39 e5 |..............9.|
00000f70: 00 00 00 b4 01 00 00 00 99 04 8e 00 00 00 ad f1 |................|
00000f80: 0e 39 e5 00 00 00 b8 99 39 1b 01 00 00 04 1c 01 |.9......9.......|
00000f90: 00 00 ad f2 0e 39 e5 00 00 00 b8 b8 ab 39 1b 01 |.....9.......9..|
00000fa0: 00 00 f2 0e 39 e5 00 00 00 b8 b8 ae 39 1b 01 00 |....9.......9...|
00000fb0: 00 f2 0e 39 e8 00 00 00 b9 39 1b 01 00 00 ba 39 |...9.....9.....9|
00000fc0: 1b 01 00 00 22 04 00 0e 39 e9 00 00 00 ba 39 1b |...."...9.....9.|
00000fd0: 01 00 00 ba 39 1b 01 00 00 22 04 00 0e 39 e8 00 |....9...."...9..|
00000fe0: 00 00 b9 ba 39 1b 01 00 00 f3 0e 39 e9 00 00 00 |....9......9....|
00000ff0: ba ba 39 1b 01 00 00 f3 0e 39 e8 00 00 00 c1 00 |..9......9......|
00001000: ba 39 1b 01 00 00 f3 0e 39 e9 00 00 00 39 a5 00 |.9......9....9..|
00001010: 00 00 43 05 01 00 00 bf 09 24 01 00 ba 39 1b 01 |..C......$...9..|
00001020: 00 00 f3 0e 39 e8 00 00 00 b4 02 00 00 00 ba 39 |....9..........9|
00001030: 1b 01 00 00 f3 0e 39 e9 00 00 00 b4 03 00 00 00 |......9.........|
00001040: ba 39 1b 01 00 00 f3 0e 39 1d 01 00 00 11 c0 80 |.9......9.......|
00001050: 00 21 01 00 cb 39 e5 00 00 00 c7 42 1e 01 00 00 |.!...9.....B....|
00001060: c0 80 00 ab f1 0e 39 1f 01 00 00 43 05 01 00 00 |......9....C....|
00001070: b9 39 1b 01 00 00 c7 24 03 00 cc 39 e5 00 00 00 |.9.....$...9....|
00001080: c8 39 1f 01 00 00 43 20 01 00 00 04 21 01 00 00 |.9....C ....!...|
00001090: b7 c7 24 03 00 ad f1 0e 39 e5 00 00 00 c7 42 22 |..$.....9.....B"|
000010a0: 01 00 00 0a ad f1 0e 39 e5 00 00 00 39 1f 01 00 |.......9....9...|
000010b0: 00 43 23 01 00 00 c8 24 01 00 b8 ab c1 01 39 24 |.C#....$......9$|
000010c0: 01 00 00 f3 0e 39 1d 01 00 00 43 25 01 00 00 39 |.....9....C%...9|
000010d0: 1f 01 00 00 42 05 01 00 00 43 26 01 00 00 07 b9 |....B....C&.....|
000010e0: 24 02 00 c0 80 00 24 02 00 cd 39 e5 00 00 00 c8 |$.....$...9.....|
000010f0: c9 ad f1 0e 39 e5 00 00 00 39 1f 01 00 00 43 27 |....9....9....C'|
00001100: 01 00 00 39 1f 01 00 00 39 92 00 00 00 f1 24 01 |...9....9.....$.|
00001110: 00 f1 0e 39 e5 00 00 00 39 1f 01 00 00 43 28 01 |...9....9....C(.|
00001120: 00 00 b8 39 1b 01 00 00 24 02 00 f1 0e 39 e5 00 |...9....$....9..|
00001130: 00 00 39 1f 01 00 00 43 28 01 00 00 b8 39 1b 01 |..9....C(....9..|
00001140: 00 00 b7 9d 39 1b 01 00 00 24 03 00 98 f1 0e 39 |....9....$.....9|
00001150: e5 00 00 00 39 1f 01 00 00 43 29 01 00 00 bf fd |....9....C).....|
00001160: 39 1b 01 00 00 24 02 00 ba ad 39 1b 01 00 00 f2 |9....$....9.....|
00001170: 0e 39 e5 00 00 00 39 1f 01 00 00 43 2a 01 00 00 |.9....9....C*...|
00001180: bf fd 39 1b 01 00 00 24 02 00 b6 ad 39 1b 01 00 |..9....$....9...|
00001190: 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 2b 01 |...9....9....C+.|
000011a0: 00 00 c1 02 39 1b 01 00 00 24 02 00 c1 03 ad 39 |....9....$.....9|
000011b0: 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 |......9....9....|
000011c0: 43 2c 01 00 00 ba 39 1b 01 00 00 24 02 00 c1 04 |C,....9....$....|
000011d0: ad 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 |.9......9....9..|
000011e0: 00 00 43 2d 01 00 00 c1 05 39 1b 01 00 00 c1 06 |..C-.....9......|
000011f0: 39 1b 01 00 00 24 04 00 c1 07 ad 39 1b 01 00 00 |9....$.....9....|
00001200: f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 2e 01 00 |..9....9....C...|
00001210: 00 b6 39 1b 01 00 00 24 02 00 c1 08 8e ad 39 1b |..9....$......9.|
00001220: 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 |.....9....9....C|
00001230: 2f 01 00 00 b8 39 1b 01 00 00 24 02 00 c1 09 ad |/....9....$.....|
00001240: 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 |9......9....9...|
00001250: 00 43 30 01 00 00 c1 0a 39 1b 01 00 00 24 02 00 |.C0.....9....$..|
00001260: c1 0b ad 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 |...9......9....9|
00001270: 1f 01 00 00 43 31 01 00 00 c1 0c 39 1b 01 00 00 |....C1.....9....|
00001280: 24 02 00 c1 0d ad 39 1b 01 00 00 f2 0e 39 e5 00 |$.....9......9..|
00001290: 00 00 39 1f 01 00 00 43 32 01 00 00 c1 0e 39 1b |..9....C2.....9.|
000012a0: 01 00 00 24 02 00 c1 0f ad 39 1b 01 00 00 f2 0e |...$.....9......|
000012b0: 39 e5 00 00 00 39 1f 01 00 00 43 33 01 00 00 c1 |9....9....C3....|
000012c0: 10 39 1b 01 00 00 24 02 00 c1 11 ad 39 1b 01 00 |.9....$.....9...|
000012d0: 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 34 01 |...9....9....C4.|
000012e0: 00 00 c1 12 39 1b 01 00 00 c1 13 8e 39 1b 01 00 |....9.......9...|
000012f0: 00 24 04 00 c1 14 ad 39 1b 01 00 00 f2 0e 39 e5 |.$.....9......9.|
00001300: 00 00 00 39 1f 01 00 00 43 35 01 00 00 c1 15 39 |...9....C5.....9|
00001310: 1b 01 00 00 24 02 00 b9 ad 39 1b 01 00 00 f2 0e |....$....9......|
00001320: 39 e5 00 00 00 39 1f 01 00 00 43 36 01 00 00 c1 |9....9....C6....|
00001330: 16 39 1b 01 00 00 24 02 00 ba ad 39 1b 01 00 00 |.9....$....9....|
00001340: f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 37 01 00 |..9....9....C7..|
00001350: 00 c1 17 8e 39 1b 01 00 00 24 02 00 bf fe ad 39 |....9....$.....9|
00001360: 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 |......9....9....|
00001370: 43 38 01 00 00 c1 18 39 1b 01 00 00 24 02 00 ba |C8.....9....$...|
00001380: ad 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 |.9......9....9..|
00001390: 00 00 43 39 01 00 00 ba 39 1b 01 00 00 b9 39 1b |..C9....9.....9.|
000013a0: 01 00 00 24 04 00 b8 ad 39 1b 01 00 00 f2 0e 39 |...$....9......9|
000013b0: e5 00 00 00 39 1f 01 00 00 43 3a 01 00 00 ba 39 |....9....C:....9|
000013c0: 1b 01 00 00 b9 39 1b 01 00 00 24 04 00 b6 ad 39 |.....9....$....9|
000013d0: 1b 01 00 00 f2 0e 39 e5 00 00 00 c1 19 39 1b 01 |......9......9..|
000013e0: 00 00 f2 43 39 00 00 00 24 00 00 0e 04 3b 01 00 |...C9...$....;..|
000013f0: 00 0e 39 e5 00 00 00 c1 1a 39 1b 01 00 00 f2 43 |..9......9.....C|
00001400: 3c 01 00 00 b9 24 01 00 0e 04 3d 01 00 00 0e 39 |<....$....=....9|
00001410: e5 00 00 00 c1 1b 39 1b 01 00 00 f2 43 3c 01 00 |......9.....C<..|
00001420: 00 b9 04 3e 01 00 00 24 02 00 0e 04 3f 01 00 00 |...>...$....?...|
00001430: 0e 39 e5 00 00 00 c1 1c 39 1b 01 00 00 f2 43 40 |.9......9.....C@|
00001440: 01 00 00 24 00 00 0e 04 41 01 00 00 0e 39 e5 00 |...$....A....9..|
00001450: 00 00 c1 1d 39 1b 01 00 00 f2 43 40 01 00 00 bc |....9.....C@....|
00001460: 24 01 00 0e 04 42 01 00 00 0e 39 e5 00 00 00 c1 |$....B....9.....|
00001470: 1e 39 1b 01 00 00 f2 43 40 01 00 00 bc 39 1d 01 |.9.....C@....9..|
00001480: 00 00 42 43 01 00 00 24 02 00 0e 04 44 01 00 00 |..BC...$....D...|
00001490: 0e 39 e5 00 00 00 c1 1f 39 1b 01 00 00 f2 43 45 |.9......9.....CE|
000014a0: 01 00 00 bd 24 01 00 0e 04 3d 01 00 00 0e 39 e5 |....$....=....9.|
000014b0: 00 00 00 c1 20 39 1b 01 00 00 f2 43 45 01 00 00 |.... 9.....CE...|
000014c0: bd 39 1d 01 00 00 42 43 01 00 00 24 02 00 0e 04 |.9....BC...$....|
000014d0: 3f 01 00 00 0e 39 e5 00 00 00 c0 23 01 c1 21 39 |?....9.....#..!9|
000014e0: 1b 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 0e |.....C9.....$...|
000014f0: 04 46 01 00 00 0e 39 e5 00 00 00 c0 23 03 c1 22 |.F....9.....#.."|
00001500: 39 1b 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 |9.....C9.....$..|
00001510: 0e 04 47 01 00 00 0e 39 e5 00 00 00 c0 23 07 c1 |..G....9.....#..|
00001520: 23 39 1b 01 00 00 f3 43 39 00 00 00 bf 10 24 01 |#9.....C9.....$.|
00001530: 00 0e 04 48 01 00 00 0e 39 e5 00 00 00 c0 23 0f |...H....9.....#.|
00001540: c1 24 39 1b 01 00 00 f3 43 39 00 00 00 bf 10 24 |.$9.....C9.....$|
00001550: 01 00 0e 04 49 01 00 00 0e 39 e5 00 00 00 c0 23 |....I....9.....#|
00001560: 01 c1 25 39 1b 01 00 00 f3 43 3c 01 00 00 b9 39 |..%9.....C<....9|
00001570: 1d 01 00 00 42 4a 01 00 00 bf 10 24 03 00 0e 04 |....BJ.....$....|
00001580: 4b 01 00 00 0e 39 e5 00 00 00 c0 23 03 c1 26 39 |K....9.....#..&9|
00001590: 1b 01 00 00 f3 43 3c 01 00 00 b9 39 1d 01 00 00 |.....C<....9....|
000015a0: 42 4a 01 00 00 bf 10 24 03 00 0e 04 4c 01 00 00 |BJ.....$....L...|
000015b0: 0e 39 e5 00 00 00 c0 23 07 c1 27 39 1b 01 00 00 |.9.....#..'9....|
000015c0: f3 43 3c 01 00 00 b9 39 1d 01 00 00 42 4a 01 00 |.C<....9....BJ..|
000015d0: 00 bf 10 24 03 00 0e 04 4d 01 00 00 0e 39 e5 00 |...$....M....9..|
000015e0: 00 00 c0 23 0f c1 28 39 1b 01 00 00 f3 43 3c 01 |...#..(9.....C<.|
000015f0: 00 00 b9 39 1d 01 00 00 42 4a 01 00 00 bf 10 24 |...9....BJ.....$|
00001600: 03 00 0e 04 4e 01 00 00 0e 39 e5 00 00 00 b7 c1 |....N....9......|
00001610: 29 39 1b 01 00 00 f3 43 3c 01 00 00 bd 39 1d 01 |)9.....C<....9..|
00001620: 00 00 42 4a 01 00 00 bf 10 24 03 00 0e 04 4f 01 |..BJ.....$....O.|
00001630: 00 00 0e 39 e5 00 00 00 c1 2a 39 1b 01 00 00 f2 |...9.....*9.....|
00001640: 43 3c 01 00 00 b8 39 1d 01 00 00 42 4a 01 00 00 |C<....9....BJ...|
00001650: bf 10 24 03 00 0e 04 50 01 00 00 0e 39 e5 00 00 |..$....P....9...|
00001660: 00 c0 23 01 c1 2b 39 1b 01 00 00 f3 43 45 01 00 |..#..+9.....CE..|
00001670: 00 bc 39 1d 01 00 00 42 4a 01 00 00 bf 10 24 03 |..9....BJ.....$.|
00001680: 00 0e 04 4b 01 00 00 0e 39 e5 00 00 00 c0 23 01 |...K....9.....#.|
00001690: c1 2c 39 1b 01 00 00 f3 43 45 01 00 00 bc 39 1d |.,9.....CE....9.|
000016a0: 01 00 00 42 43 01 00 00 bf 10 24 03 00 0e 04 51 |...BC.....$....Q|
000016b0: 01 00 00 0e 39 e5 00 00 00 c0 23 03 c1 2d 39 1b |....9.....#..-9.|
000016c0: 01 00 00 f3 43 45 01 00 00 bc 39 1d 01 00 00 42 |....CE....9....B|
000016d0: 4a 01 00 00 bf 10 24 03 00 0e 04 4c 01 00 00 0e |J.....$....L....|
000016e0: 39 e5 00 00 00 c0 23 07 c1 2e 39 1b 01 00 00 f3 |9.....#...9.....|
000016f0: 43 45 01 00 00 bc 39 1d 01 00 00 42 4a 01 00 00 |CE....9....BJ...|
00001700: bf 10 24 03 00 0e 04 4d 01 00 00 0e 39 e5 00 00 |..$....M....9...|
00001710: 00 c0 dd f0 c1 2f 39 1b 01 00 00 f3 43 45 01 00 |...../9.....CE..|
00001720: 00 bc 39 1d 01 00 00 42 52 01 00 00 bf 10 24 03 |..9....BR.....$.|
00001730: 00 0e 04 53 01 00 00 0e 39 e5 00 00 00 c0 23 01 |...S....9.....#.|
00001740: c1 30 39 1b 01 00 00 f3 43 40 01 00 00 bb 39 1d |.09.....C@....9.|
00001750: 01 00 00 42 4a 01 00 00 bf 10 24 03 00 0e 04 54 |...BJ.....$....T|
00001760: 01 00 00 29 e8 03 c9 06 7b 00 04 08 34 22 25 15 |...)....{...4"%.|
00001770: 0d 0b 25 22 34 04 07 19 0d 0b 25 12 07 10 1b 15 |..%"4.....%.....|
00001780: 0d 0b 25 12 07 12 1b 17 0d 0b 20 1a 20 0c 1b 13 |..%....... . ...|
00001790: 17 11 20 16 20 0c 1b 13 17 0d 25 20 1b 0d 0d 11 |.. . .....% ....|
000017a0: 25 1c 1b 0d 0d 0d 2a 24 1b 11 0d 11 1b 10 1b 08 |%.....*$........|
000017b0: 25 0a 16 10 1b 23 0d 0d 39 22 1b 0f 0d 11 39 1e |%....#..9"....9.|
000017c0: 1b 0f 0d 02 2f 16 17 25 1b 0e 07 02 2a 0c 07 0f |..../..%....*...|
000017d0: 0d 03 1b 10 20 12 1b 06 07 0d 17 21 1b 0e 07 0c |.... ......!....|
000017e0: 1b 10 39 6e 07 57 11 2d 07 05 0d 0b 1b 0e 07 02 |..9n.W.-........|
000017f0: 20 12 07 15 0d 0b 1b 0e 1b 10 1b 12 07 01 16 08 | ...............|
00001800: 11 18 1b 41 0d 03 1b 16 1b 12 1b 10 1b 0a 25 0a |...A..........%.|
00001810: 20 25 17 2d 1b 0e 07 0c 07 07 07 05 0d 0b 1b 0e | %.-............|
00001820: 1b 10 1b 0e 1b 12 1b 01 07 11 11 1d 0d 0b 1b 0e |................|
00001830: 1b 10 20 1a 1b 07 11 23 0d 0b 1b 10 1b 10 20 1a |.. ....#...... .|
00001840: 20 04 07 0a 1b 15 16 25 0d 0b 1b 0e 1b 10 1b 0a | ......%........|
00001850: 0c 08 1b 09 16 10 07 0e 1b 37 0d 0b 1b 0e 1b 10 |.........7......|
00001860: 1b 0c 0c 08 1b 09 11 18 07 07 07 10 1b 3b 0d 0b |.............;..|
00001870: 1b 0e 1b 10 25 14 1b 0b 1b 12 07 54 1b 7f 0d 0b |....%......T....|
00001880: 1b 0e 1b 10 20 10 1b 07 1b 0e 07 54 1b 7b 0d 0b |.... ......T.{..|
00001890: 1b 0e 1b 10 25 14 25 10 1b 1b 1b 22 07 52 1b 8d |....%.%....".R..|
000018a0: 01 0d 0b 1b 0e 1b 10 1b 0a 07 08 1b 09 1b 18 07 |................|
000018b0: 07 07 54 1b 7d 0d 0b 1b 0e 1b 10 20 10 1b 07 1b |..T.}...... ....|
000018c0: 0e 07 54 1b 7b 0d 0b 1b 0e 1b 10 25 14 1b 0b 1b |..T.{......%....|
000018d0: 12 07 56 1b 81 01 0d 0b 1b 0e 1b 10 25 16 1b 0b |..V.........%...|
000018e0: 1b 12 07 56 1b 83 01 0d 0b 1b 0e 1b 10 25 16 1b |...V.........%..|
000018f0: 0b 1b 12 07 54 1b 81 01 0d 0b 1b 0e 1b 10 25 16 |....T.........%.|
00001900: 1b 0b 1b 12 07 52 1b 7f 0d 0b 1b 0e 1b 10 25 18 |.....R........%.|
00001910: 25 06 07 0c 1b 1d 1b 24 07 54 1b 95 01 0d 0b 1b |%......$.T......|
00001920: 0e 1b 10 25 18 1b 0b 16 12 07 0e 1b 3d 0d 0b 1b |...%........=...|
00001930: 0e 1b 10 25 16 1b 0b 16 12 07 0e 1b 3b 0d 0b 1b |...%........;...|
00001940: 0e 1b 10 25 0e 07 0c 1b 0d 11 1c 0c 07 07 10 1b |...%............|
00001950: 41 0d 0b 1b 0e 1b 10 25 18 1b 0b 16 12 07 0e 1b |A......%........|
00001960: 3d 0d 0b 1b 0e 1b 10 20 12 20 0c 1b 13 16 1a 07 |=...... . ......|
00001970: 0e 1b 43 0d 0b 1b 0e 1b 10 20 1c 20 0c 1b 13 11 |..C...... . ....|
00001980: 22 07 07 07 10 1b 4f 0e 0b 25 26 1b 19 07 1e 1b |".....O..%&.....|
00001990: 12 36 3b 25 26 1b 19 07 1e 20 10 36 39 25 26 1b |.6;%&.... .69%&.|
000019a0: 19 07 1e 39 10 36 39 25 26 1b 19 07 1e 1b 1c 36 |...9.69%&......6|
000019b0: 45 25 26 1b 19 07 1e 20 1c 36 45 25 26 1b 19 07 |E%&.... .6E%&...|
000019c0: 1e 20 24 1b 16 1b 1d 36 45 25 26 1b 19 07 1e 20 |. $....6E%&.... |
000019d0: 18 36 41 25 26 1b 19 07 1e 20 20 1b 16 1b 1d 37 |.6A%&....  ....7|
000019e0: 41 34 2c 1b 1f 07 24 25 12 36 41 34 2c 1b 1f 07 |A4,...$%.6A4,...|
000019f0: 24 25 12 36 41 34 2c 1b 1f 07 24 25 12 36 41 34 |$%.6A4,...$%.6A4|
00001a00: 2c 1b 1f 07 24 25 12 36 41 34 2c 1b 1f 07 24 20 |,...$%.6A4,...$ |
00001a10: 18 1b 16 25 1d 36 3f 34 2c 1b 1f 07 24 20 18 1b |...%.6?4,...$ ..|
00001a20: 16 25 1d 36 3f 34 2c 1b 1f 07 24 20 18 1b 16 25 |.%.6?4,...$ ...%|
00001a30: 1d 36 3f 34 2c 1b 1f 07 24 20 18 1b 16 25 1d 36 |.6?4,...$ ...%.6|
00001a40: 3f 2a 30 1b 23 07 28 20 18 1b 16 25 1d 36 43 25 |?*0.#.( ...%.6C%|
00001a50: 2e 1b 21 07 26 20 18 1b 16 25 1d 36 41 34 2c 1b |..!.& ...%.6A4,.|
00001a60: 1f 07 24 20 20 1b 16 25 1d 36 47 34 2c 1b 1f 07 |..$  ..%.6G4,...|
00001a70: 24 20 20 1b 16 25 1d 36 47 34 2c 1b 1f 07 24 20 |$  ..%.6G4,...$ |
00001a80: 20 1b 16 25 1d 36 47 34 2c 1b 1f 07 24 20 20 1b | ..%.6G4,...$  .|
00001a90: 16 25 1d 36 47 1b 10 1b 1e 1b 21 07 26 20 20 1b |.%.6G.....!.&  .|
00001aa0: 16 25 1d 36 49 34 2c 1b 1f 07 24 20 24 1b 16 25 |.%.6I4,...$ $..%|
00001ab0: 1d 00 06 cd cc cc cc cc cc 00 40 06 33 33 33 33 |..........@.3333|
00001ac0: 33 33 e3 3f 06 9a 99 99 99 99 99 c9 3f 06 8d ac |33.?........?...|
00001ad0: 58 9e dd 8a f3 3f 06 0b 03 ad 7a ea 93 f1 3f 06 |X....?....z...?.|
00001ae0: cd cc cc cc cc cc 00 40 06 9a 99 99 99 99 99 f9 |.......@........|
00001af0: 3f 06 a6 45 40 40 72 38 0a 40 06 ee 0c 09 8f 54 |?..E@@r8.@.....T|
00001b00: ed ea 3f 06 8c 06 b5 0f 28 4a e1 3f 06 9a 99 99 |..?.....(J.?....|
00001b10: 99 99 99 b9 3f 06 80 0b 43 77 88 af b9 3f 06 33 |....?...Cw...?.3|
00001b20: 33 33 33 33 33 d3 3f 06 ff f6 14 9e 15 80 d3 3f |33333.?........?|
00001b30: 06 9a 99 99 99 99 99 d9 3f 06 8b 5e 0a a4 68 8c |........?..^..h.|
00001b40: f2 3f 06 66 66 66 66 66 66 e6 3f 06 ad d4 7b 2d |.?.ffffff.?...{-|
00001b50: 11 8b e3 3f 06 66 66 66 66 66 66 1c 40 06 66 66 |...?.ffffff.@.ff|
00001b60: 66 66 66 66 14 40 06 96 c7 22 68 b5 8c 01 40 06 |ffff.@..."h...@.|
00001b70: 00 00 00 00 00 00 04 40 06 00 00 00 00 00 00 04 |.......@........|
00001b80: 40 06 00 00 00 00 00 00 04 40 06 00 00 00 00 00 |@........@......|
00001b90: 00 04 40 06 00 00 00 00 80 48 93 40 06 00 00 00 |..@......H.@....|
00001ba0: 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 |..H.@......H.@..|
00001bb0: 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 |....H.@......H.@|
00001bc0: 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 |......H.@......H|
00001bd0: 93 40 06 00 00 00 00 80 48 93 40 06 d5 78 e9 26 |.@......H.@..x.&|
00001be0: 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 |1..?..x.&1..?..x|
00001bf0: e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 |.&1..?..x.&1..?.|
00001c00: d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc |.x.&1..?..x.&1..|
00001c10: 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 |?..x.&1..?..x.&1|
00001c20: 08 dc 3f 06 f3 69 5f 8a bc f6 06 3f 06 00 00 00 |..?..i_....?....|
00001c30: 00 00 30 32 42 06 d5 78 e9 26 31 08 dc 3f 06 d5 |..02B..x.&1..?..|
00001c40: 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f |x.&1..?..x.&1..?|
00001c50: 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 |..x.&1..?..x.&1.|
00001c60: dc 3f 06 d5 78 e9 26 31 08 dc 3f 0c 43 06 00 e0 |.?..x.&1..?.C...|
00001c70: 03 00 00 00 09 00 2a 95 0b 00 39 e5 00 00 00 b8 |......*...9.....|
00001c80: 39 55 01 00 00 b8 ad 39 55 01 00 00 f3 0e 39 e5 |9U.....9U.....9.|
00001c90: 00 00 00 b8 39 55 01 00 00 b9 ae 39 55 01 00 00 |....9U.....9U...|
00001ca0: f3 0e 39 e8 00 00 00 b8 39 55 01 00 00 b9 39 55 |..9.....9U....9U|
00001cb0: 01 00 00 22 04 00 0e 39 e9 00 00 00 b9 39 55 01 |..."...9.....9U.|
00001cc0: 00 00 b9 39 55 01 00 00 22 04 00 0e 39 e8 00 00 |...9U..."...9...|
00001cd0: 00 b8 b9 39 55 01 00 00 f3 0e 39 e9 00 00 00 b9 |...9U.....9.....|
00001ce0: b9 39 55 01 00 00 f3 0e 39 e8 00 00 00 c1 00 b9 |.9U.....9.......|
00001cf0: 39 55 01 00 00 f3 0e 39 e9 00 00 00 39 a5 00 00 |9U.....9....9...|
00001d00: 00 43 05 01 00 00 bb 24 01 00 b9 39 55 01 00 00 |.C.....$...9U...|
00001d10: f3 0e 39 e8 00 00 00 b4 02 00 00 00 ba 39 55 01 |..9..........9U.|
00001d20: 00 00 f3 0e 39 e9 00 00 00 b4 03 00 00 00 ba 39 |....9..........9|
00001d30: 55 01 00 00 f3 0e 39 e5 00 00 00 39 56 01 00 00 |U.....9....9V...|
00001d40: 04 57 01 00 00 f1 c1 01 ad 39 55 01 00 00 f2 0e |.W.......9U.....|
00001d50: 39 e5 00 00 00 39 56 01 00 00 04 58 01 00 00 f1 |9....9V....X....|
00001d60: c1 02 ad 39 55 01 00 00 f2 0e 39 e5 00 00 00 39 |...9U.....9....9|
00001d70: 56 01 00 00 04 59 01 00 00 f1 c1 03 ad 39 55 01 |V....Y.......9U.|
00001d80: 00 00 f2 0e 39 e5 00 00 00 39 56 01 00 00 c1 04 |....9....9V.....|
00001d90: f1 c1 05 ad 39 55 01 00 00 f2 0e 39 e5 00 00 00 |....9U.....9....|
00001da0: 39 56 01 00 00 bf 7b f1 bf 7b ad 39 55 01 00 00 |9V....{..{.9U...|
00001db0: f2 0e 39 e5 00 00 00 39 56 01 00 00 0a f1 b8 ad |..9....9V.......|
00001dc0: 39 55 01 00 00 f2 0e 39 e5 00 00 00 bf 7b 39 55 |9U.....9.....{9U|
00001dd0: 01 00 00 b8 9f 39 55 01 00 00 bf 7c ad 39 55 01 |.....9U....|.9U.|
00001de0: 00 00 22 04 00 0e 39 e5 00 00 00 bf 7b 39 55 01 |.."...9.....{9U.|
00001df0: 00 00 b8 a0 39 55 01 00 00 bf 7a ad 39 55 01 00 |....9U....z.9U..|
00001e00: 00 22 04 00 0e 39 e5 00 00 00 c1 06 39 55 01 00 |."...9......9U..|
00001e10: 00 ba 9c 39 55 01 00 00 c1 07 ad 39 55 01 00 00 |...9U......9U...|
00001e20: 22 04 00 0e 39 e5 00 00 00 bf 0a 39 55 01 00 00 |"...9......9U...|
00001e30: b9 9d 39 55 01 00 00 bc ad 39 55 01 00 00 22 04 |..9U.....9U...".|
00001e40: 00 0e 39 e6 00 00 00 39 d0 00 00 00 c2 08 f2 0e |..9....9........|
00001e50: 39 e5 00 00 00 bf 0a 39 55 01 00 00 ba 9e 39 55 |9......9U.....9U|
00001e60: 01 00 00 b8 ad 39 55 01 00 00 22 04 00 0e 39 e5 |.....9U..."...9.|
00001e70: 00 00 00 bf f6 39 55 01 00 00 ba 9e 39 55 01 00 |.....9U.....9U..|
00001e80: 00 b6 ad 39 55 01 00 00 22 04 00 0e 39 e5 00 00 |...9U..."...9...|
00001e90: 00 c1 09 39 55 01 00 00 ba a1 39 55 01 00 00 c1 |...9U.....9U....|
00001ea0: 0a ad 39 55 01 00 00 22 04 00 0e 39 e6 00 00 00 |..9U..."...9....|
00001eb0: 39 d0 00 00 00 c2 0b f2 0e 39 e6 00 00 00 39 d0 |9........9....9.|
00001ec0: 00 00 00 c2 0c f2 0e 39 e5 00 00 00 39 56 01 00 |.......9....9V..|
00001ed0: 00 43 05 01 00 00 b9 39 55 01 00 00 0b 04 5a 01 |.C.....9U.....Z.|
00001ee0: 00 00 4e 5b 01 00 00 bb 4e 5c 01 00 00 24 03 00 |..N[....N\...$..|
00001ef0: c1 0d ad 39 55 01 00 00 f2 0e 39 e5 00 00 00 39 |...9U.....9....9|
00001f00: 56 01 00 00 43 05 01 00 00 bf 65 39 55 01 00 00 |V...C.....e9U...|
00001f10: 0b 04 5a 01 00 00 4e 5b 01 00 00 ba 4e 5d 01 00 |..Z...N[....N]..|
00001f20: 00 24 03 00 c1 0e ad 39 55 01 00 00 f2 0e 39 e5 |.$.....9U.....9.|
00001f30: 00 00 00 39 56 01 00 00 43 05 01 00 00 c1 0f 39 |...9V...C......9|
00001f40: 55 01 00 00 0b 04 5a 01 00 00 4e 5b 01 00 00 ba |U.....Z...N[....|
00001f50: 4e 5d 01 00 00 24 03 00 c1 10 ad 39 55 01 00 00 |N]...$.....9U...|
00001f60: f2 0e 39 e5 00 00 00 39 56 01 00 00 43 38 01 00 |..9....9V...C8..|
00001f70: 00 c1 11 39 55 01 00 00 0b 04 5a 01 00 00 4e 5b |...9U.....Z...N[|
00001f80: 01 00 00 ba 4e 5d 01 00 00 24 03 00 c1 12 ad 39 |....N]...$.....9|
00001f90: 55 01 00 00 f2 0e 39 e5 00 00 00 39 56 01 00 00 |U.....9....9V...|
00001fa0: 43 6a 00 00 00 c1 13 39 55 01 00 00 c1 14 39 55 |Cj.....9U.....9U|
00001fb0: 01 00 00 0b 04 5a 01 00 00 4e 5b 01 00 00 b9 4e |.....Z...N[....N|
00001fc0: 5d 01 00 00 24 05 00 c1 15 ad 39 55 01 00 00 f2 |]...$.....9U....|
00001fd0: 0e 39 e5 00 00 00 39 56 01 00 00 43 5e 01 00 00 |.9....9V...C^...|
00001fe0: c1 16 39 55 01 00 00 c1 17 39 55 01 00 00 0b 04 |..9U.....9U.....|
00001ff0: 3e 01 00 00 4e 5b 01 00 00 b9 4e 5d 01 00 00 24 |>...N[....N]...$|
00002000: 05 00 c1 18 ad 39 55 01 00 00 f2 0e 39 e5 00 00 |.....9U.....9...|
00002010: 00 39 56 01 00 00 43 5f 01 00 00 c1 19 39 55 01 |.9V...C_.....9U.|
00002020: 00 00 c1 1a 39 55 01 00 00 0b 04 5a 01 00 00 4e |....9U.....Z...N|
00002030: 5b 01 00 00 ba 4e 5d 01 00 00 24 05 00 c1 1b ad |[....N]...$.....|
00002040: 39 55 01 00 00 f2 0e 39 e5 00 00 00 39 56 01 00 |9U.....9....9V..|
00002050: 00 43 60 01 00 00 c1 1c 39 55 01 00 00 c1 1d 39 |.C`.....9U.....9|
00002060: 55 01 00 00 0b 04 5a 01 00 00 4e 5b 01 00 00 bb |U.....Z...N[....|
00002070: 4e 5d 01 00 00 24 05 00 c1 1e ad 39 55 01 00 00 |N]...$.....9U...|
00002080: f2 0e 39 e5 00 00 00 39 56 01 00 00 43 10 01 00 |..9....9V...C...|
00002090: 00 bf 14 39 55 01 00 00 ba 39 55 01 00 00 0b 04 |...9U....9U.....|
000020a0: 5a 01 00 00 4e 5b 01 00 00 ba 4e 5c 01 00 00 24 |Z...N[....N\...$|
000020b0: 05 00 c1 1f ad 39 55 01 00 00 f2 0e 39 e5 00 00 |.....9U.....9...|
000020c0: 00 39 56 01 00 00 43 10 01 00 00 bf 14 39 55 01 |.9V...C......9U.|
000020d0: 00 00 ba 39 55 01 00 00 0b 04 5a 01 00 00 4e 5b |...9U.....Z...N[|
000020e0: 01 00 00 bf 32 4e 5d 01 00 00 24 05 00 c1 20 ad |....2N]...$... .|
000020f0: 39 55 01 00 00 f2 0e 39 e5 00 00 00 c1 21 39 55 |9U.....9.....!9U|
00002100: 01 00 00 f2 43 39 00 00 00 24 00 00 0e 04 3b 01 |....C9...$....;.|
00002110: 00 00 0e 39 e5 00 00 00 c1 22 39 55 01 00 00 f2 |...9....."9U....|
00002120: 43 3c 01 00 00 b9 24 01 00 0e 04 3d 01 00 00 0e |C<....$....=....|
00002130: 39 e5 00 00 00 c1 23 39 55 01 00 00 f2 43 3c 01 |9.....#9U....C<.|
00002140: 00 00 b9 04 3e 01 00 00 24 02 00 0e 04 3f 01 00 |....>...$....?..|
00002150: 00 0e 39 e5 00 00 00 c1 24 39 55 01 00 00 f2 43 |..9.....$9U....C|
00002160: 40 01 00 00 24 00 00 0e 04 41 01 00 00 0e 39 e5 |@...$....A....9.|
00002170: 00 00 00 c1 25 39 55 01 00 00 f2 43 40 01 00 00 |....%9U....C@...|
00002180: bc 24 01 00 0e 04 42 01 00 00 0e 39 e5 00 00 00 |.$....B....9....|
00002190: c1 26 39 55 01 00 00 f2 43 40 01 00 00 bc 04 3e |.&9U....C@.....>|
000021a0: 01 00 00 24 02 00 0e 04 44 01 00 00 0e 39 e5 00 |...$....D....9..|
000021b0: 00 00 c1 27 39 55 01 00 00 f2 43 45 01 00 00 bd |...'9U....CE....|
000021c0: 24 01 00 0e 04 3d 01 00 00 0e 39 e5 00 00 00 c1 |$....=....9.....|
000021d0: 28 39 55 01 00 00 f2 43 45 01 00 00 bd 04 3e 01 |(9U....CE.....>.|
000021e0: 00 00 24 02 00 0e 04 3f 01 00 00 0e 39 e5 00 00 |..$....?....9...|
000021f0: 00 c1 29 8e 39 55 01 00 00 f2 43 45 01 00 00 bd |..).9U....CE....|
00002200: 04 35 01 00 00 24 02 00 0e 04 61 01 00 00 29 e8 |.5...$....a...).|
00002210: 03 9d 04 d9 01 00 03 08 20 14 20 04 07 0e 1b 19 |........ . .....|
00002220: 0d 0b 20 14 20 04 07 0e 1b 19 0d 0b 20 1a 20 0c |.. . ....... . .|
00002230: 1b 13 17 11 20 16 20 0c 1b 13 17 0d 25 20 1b 0d |.... . .....% ..|
00002240: 0d 11 25 1c 1b 0d 0d 0d 2a 24 1b 11 0d 11 1b 10 |..%.....*$......|
00002250: 1b 08 20 0a 16 10 1b 23 0d 0d 39 22 1b 0f 0d 11 |.. ....#..9"....|
00002260: 39 1e 1b 0f 0d 0d 1b 0e 34 14 11 16 07 18 1b 43 |9.......4......C|
00002270: 0d 0b 1b 0e 34 14 11 1e 07 18 1b 4b 0d 0b 1b 0e |....4......K....|
00002280: 34 14 11 22 07 18 1b 4f 0d 0b 1b 0e 25 14 11 0c |4.."...O....%...|
00002290: 07 12 1b 33 0d 0b 1b 0e 25 14 11 0c 07 12 1b 33 |...3....%......3|
000022a0: 0d 0b 1b 0e 20 14 0c 0e 07 0e 1b 31 0d 0b 25 18 |.... ......1..%.|
000022b0: 20 04 07 0a 25 04 07 12 1b 2f 17 0b 25 18 20 04 | ...%..../..%. .|
000022c0: 07 0a 25 04 07 12 1b 2f 17 0b 25 18 20 04 07 0a |..%..../..%. ...|
000022d0: 25 04 07 12 1b 2f 17 0b 25 16 20 04 07 0a 20 04 |%..../..%. ... .|
000022e0: 07 0e 1b 29 17 0b 1b 1a 25 01 0d 17 25 16 20 04 |...)....%...%. .|
000022f0: 07 0a 20 04 07 0e 1b 29 17 0b 1b 0e 0c 0a 20 04 |.. ....)...... .|
00002300: 07 0a 1b 0c 07 07 07 10 1b 2d 17 0b 25 1e 20 04 |.........-..%. .|
00002310: 07 0c 25 04 07 28 1b 4d 17 0b 1b 1a 25 01 0d 17 |..%..(.M....%...|
00002320: 1b 1a 25 01 0d 17 1b 0e 1b 14 20 12 70 07 1c 1a |..%....... .p...|
00002330: 07 16 1a 4f 0e 0b 1b 0e 1b 14 25 16 70 0b 1c 14 |...O......%.p...|
00002340: 07 18 1a 4b 0e 0b 1b 0e 1b 14 25 1a 70 0f 1c 14 |...K......%.p...|
00002350: 07 16 1a 49 0e 0b 1b 0e 1b 14 25 20 70 13 1c 12 |...I......% p...|
00002360: 07 16 1a 49 0e 0b 1b 0e 1b 14 25 1c 25 18 70 2b |...I......%.%.p+|
00002370: 1c 16 07 14 1a 47 0e 0b 1b 0e 1b 14 25 1c 25 18 |.....G......%.%.|
00002380: 70 2b 1c 16 07 14 1a 47 0e 0b 1b 0e 1b 14 25 1c |p+.....G......%.|
00002390: 25 18 70 2b 1c 16 07 16 1a 49 0e 0b 1b 0e 1b 14 |%.p+.....I......|
000023a0: 25 1c 25 18 70 2b 1c 16 07 18 1a 4b 0e 0b 1b 0e |%.%.p+.....K....|
000023b0: 1b 14 25 12 20 0c 70 15 1c 1c 07 14 1a 4d 0e 0b |..%. .p......M..|
000023c0: 1b 0e 1b 14 25 12 20 0c 75 15 1c 18 08 32 00 05 |....%. .u....2..|
000023d0: 03 67 00 02 08 0b 25 26 1b 19 07 1e 1b 12 36 3b |.g....%&......6;|
000023e0: 25 26 1b 19 07 1e 20 10 36 39 25 26 1b 19 07 1e |%&.... .69%&....|
000023f0: 39 10 36 39 25 26 1b 19 07 1e 1b 1c 36 45 25 26 |9.69%&......6E%&|
00002400: 1b 19 07 1e 20 1c 36 45 25 26 1b 19 07 1e 39 1c |.... .6E%&....9.|
00002410: 36 45 25 26 1b 19 07 1e 20 18 36 41 25 26 1b 19 |6E%&.... .6A%&..|
00002420: 07 1e 39 18 36 41 25 10 07 18 1b 1b 07 20 39 18 |..9.6A%...... 9.|
00002430: 00 06 9a 99 99 99 99 99 f1 3f 06 66 66 66 66 66 |.........?.fffff|
00002440: 48 93 40 06 66 66 66 66 66 48 93 40 06 66 66 66 |H.@.fffffH.@.fff|
00002450: 66 66 48 93 40 06 9a 99 99 99 99 99 b9 3f 06 9a |ffH.@........?..|
00002460: 99 99 99 99 99 b9 3f 06 9a 99 99 99 99 99 09 40 |......?........@|
00002470: 06 33 33 33 33 33 33 23 40 0c 42 06 00 00 00 00 |.333333#@.B.....|
00002480: 00 02 00 00 0e 00 39 55 01 00 00 ba 9d 0e 39 55 |......9U......9U|
00002490: 01 00 00 29 e8 03 09 ee 01 1d 02 18 20 04 0c 0a |...)........ ...|
000024a0: 00 06 00 00 00 00 00 4a 93 40 06 00 00 e8 72 d7 |.......J.@....r.|
000024b0: 08 dc 41 0c 42 06 00 00 00 00 00 02 00 01 0f 00 |..A.B...........|
000024c0: 39 55 01 00 00 c1 00 a1 0e 39 55 01 00 00 29 e8 |9U.......9U...).|
000024d0: 03 09 f2 01 1d 02 16 25 04 0c 10 00 06 cd cc cc |.......%........|
000024e0: cc cc cc 08 40 0c 42 06 00 00 00 00 00 02 00 00 |....@.B.........|
000024f0: 0f 00 39 55 01 00 00 bf fd a1 0e 39 55 01 00 00 |..9U.......9U...|
00002500: 29 e8 03 0b f3 01 1d 02 16 1b 0a 0c 05 0c 0e 00 |)...............|
00002510: 06 39 b4 c8 76 be 9f f6 3f 06 9a 99 99 99 99 19 |.9..v...?.......|
00002520: 24 40 06 fc a9 f1 d2 4d 62 60 3f 06 0a d7 a3 70 |$@.....Mb`?....p|
00002530: 3d 0a a7 3f 06 6e 86 1b f0 f9 21 09 40 06 89 41 |=..?.n....!.@..A|
00002540: 60 e5 d0 22 09 40 06 6e 86 1b f0 f9 21 09 40 06 |`..".@.n....!.@.|
00002550: 7d 5c 1b 2a c6 f9 d3 3f 06 9a 99 99 99 99 99 0b |}\.*...?........|
00002560: 40 06 6e 86 1b f0 f9 21 09 40 06 7d 5c 1b 2a c6 |@.n....!.@.}\.*.|
00002570: f9 d3 3f 06 8f c2 f5 28 5c 8f 06 40 06 6e 86 1b |..?....(\..@.n..|
00002580: f0 f9 21 09 40 06 7d 5c 1b 2a c6 f9 d3 3f 06 31 |..!.@.}\.*...?.1|
00002590: 08 ac 1c 5a 64 ef 3f 06 6e 86 1b f0 f9 21 09 40 |...Zd.?.n....!.@|
000025a0: 06 b6 4a b0 38 9c f9 d3 3f 06 cb a1 45 b6 f3 fd |..J.8...?...E...|
000025b0: 94 3f 06 ae 47 e1 7a 14 ae 1a 40 06 ab aa aa aa |.?..G.z...@.....|
000025c0: aa aa 1a 40 06 00 00 00 00 80 48 93 40 06 00 00 |...@......H.@...|
000025d0: 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 |...H.@......H.@.|
000025e0: 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 |.....H.@......H.|
000025f0: 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 |@......H.@......|
00002600: 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 |H.@......H.@....|
00002610: 00 80 48 93 40                                  |..H.@|
```

### WASM
```
00000000: 05 6a 02 65 0c 61 73 73 65 72 74 18 61 73 73 65 |.j.e.assert.asse|
00000010: 72 74 54 68 72 6f 77 73 14 62 69 67 69 6e 74 5f |rtThrows.bigint_|
00000020: 70 6f 77 12 74 65 73 74 5f 6c 65 73 73 0e 74 65 |pow.test_less.te|
00000030: 73 74 5f 65 71 18 74 65 73 74 5f 62 69 67 69 6e |st_eq.test_bigin|
00000040: 74 31 18 74 65 73 74 5f 62 69 67 69 6e 74 32 16 |t1.test_bigint2.|
00000050: 74 65 73 74 5f 64 69 76 72 65 6d 14 74 65 73 74 |test_divrem.test|
00000060: 5f 69 64 69 76 31 1e 74 65 73 74 5f 62 69 67 69 |_idiv1.test_bigi|
00000070: 6e 74 5f 65 78 74 1a 74 65 73 74 5f 62 69 67 66 |nt_ext.test_bigf|
00000080: 6c 6f 61 74 1e 74 65 73 74 5f 62 69 67 64 65 63 |loat.test_bigdec|
00000090: 69 6d 61 6c 14 75 73 65 20 73 74 72 69 63 74 18 |imal.use strict.|
000000a0: 5f 5f 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 |__loadScript.tes|
000000b0: 74 5f 61 73 73 65 72 74 2e 6a 73 5e 5f 5f 74 65 |t_assert.js^__te|
000000c0: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 71 |sts__/fixtures/q|
000000d0: 75 69 63 6b 6a 73 2d 74 65 73 74 73 2f 74 65 73 |uickjs-tests/tes|
000000e0: 74 5f 62 69 67 6e 75 6d 2e 6a 73 0c 61 63 74 75 |t_bignum.js.actu|
000000f0: 61 6c 10 65 78 70 65 63 74 65 64 2e 61 73 73 65 |al.expected.asse|
00000100: 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f |rtion failed: go|
00000110: 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 |t |.|., expected|
00000120: 20 7c 04 20 28 02 29 06 65 72 72 08 66 75 6e 63 | |. (.).err.func|
00000130: 04 65 78 24 65 78 63 65 70 74 69 6f 6e 20 65 78 |.ex$exception ex|
00000140: 70 65 63 74 65 64 02 61 02 6e 02 72 02 69 02 62 |pected.a.n.r.i.b|
00000150: 08 73 71 72 74 30 31 20 3c 3c 20 33 31 6e 20 3d |.sqrt01 << 31n =|
00000160: 3d 3d 20 32 31 34 37 34 38 33 36 34 38 6e 30 31 |== 2147483648n01|
00000170: 20 3c 3c 20 33 32 6e 20 3d 3d 3d 20 34 32 39 34 | << 32n === 4294|
00000180: 39 36 37 32 39 36 6e 0a 20 20 31 32 33 10 20 20 |967296n.  123.  |
00000190: 31 32 33 20 20 20 02 2b 02 2d 04 00 61 10 20 20 |123   .+.-..a.  |
000001a0: 31 32 33 20 20 72 08 64 69 76 31 02 71 06 64 69 |123  r.div1.q.di|
000001b0: 76 0c 64 69 76 72 65 6d 02 74 06 72 65 6d 12 66 |v.divrem.t.rem.f|
000001c0: 6c 6f 6f 72 4c 6f 67 32 0e 73 71 72 74 72 65 6d |loorLog2.sqrtrem|
000001d0: 08 74 64 69 76 08 66 64 69 76 08 63 64 69 76 08 |.tdiv.fdiv.cdiv.|
000001e0: 65 64 69 76 0a 73 71 72 74 32 02 6c 10 62 69 67 |ediv.sqrt2.l.big|
000001f0: 66 6c 6f 61 74 16 42 69 67 46 6c 6f 61 74 45 6e |float.BigFloatEn|
00000200: 76 08 70 72 65 63 10 42 69 67 46 6c 6f 61 74 14 |v.prec.BigFloat.|
00000210: 70 61 72 73 65 46 6c 6f 61 74 48 30 78 31 2e 36 |parseFloatH0x1.6|
00000220: 61 30 39 65 36 36 37 66 33 62 63 63 39 30 38 62 |a09e667f3bcc908b|
00000230: 32 66 62 31 33 36 36 65 61 39 35 37 64 33 65 0e |2fb1366ea957d3e.|
00000240: 69 6e 65 78 61 63 74 0e 66 70 52 6f 75 6e 64 38 |inexact.fpRound8|
00000250: 61 30 39 65 36 36 37 66 33 62 63 63 39 30 38 62 |a09e667f3bcc908b|
00000260: 32 66 62 31 33 36 36 65 61 39 35 6c 0e 73 65 74 |2fb1366ea95l.set|
00000270: 50 72 65 63 08 62 69 6e 64 0a 69 73 4e 61 4e 10 |Prec.bind.isNaN.|
00000280: 69 73 46 69 6e 69 74 65 06 61 62 73 08 73 69 67 |isFinite.abs.sig|
00000290: 6e 06 65 78 70 06 6c 6f 67 06 70 6f 77 06 73 69 |n.exp.log.pow.si|
000002a0: 6e 06 63 6f 73 06 74 61 6e 08 61 73 69 6e 08 61 |n.cos.tan.asin.a|
000002b0: 63 6f 73 08 61 74 61 6e 0a 61 74 61 6e 32 0a 66 |cos.atan.atan2.f|
000002c0: 6c 6f 6f 72 08 63 65 69 6c 0a 74 72 75 6e 63 0a |loor.ceil.trunc.|
000002d0: 72 6f 75 6e 64 08 66 6d 6f 64 12 72 65 6d 61 69 |round.fmod.remai|
000002e0: 6e 64 65 72 0e 74 6f 46 69 78 65 64 08 64 6f 77 |nder.toFixed.dow|
000002f0: 6e 1a 74 6f 45 78 70 6f 6e 65 6e 74 69 61 6c 08 |n.toExponential.|
00000300: 52 4e 44 5a 16 74 6f 50 72 65 63 69 73 69 6f 6e |RNDZ.toPrecision|
00000310: 0a 52 4e 44 4e 41 08 52 4e 44 44 02 6d 14 42 69 |.RNDNA.RNDD.m.Bi|
00000320: 67 44 65 63 69 6d 61 6c 0c 31 32 33 34 2e 31 14 |gDecimal.1234.1.|
00000330: 20 20 20 20 31 32 33 34 2e 31 18 20 20 20 20 31 |    1234.1.    1|
00000340: 32 33 34 2e 31 20 20 12 68 61 6c 66 2d 65 76 65 |234.1  .half-eve|
00000350: 6e 18 72 6f 75 6e 64 69 6e 67 4d 6f 64 65 30 6d |n.roundingMode0m|
00000360: 61 78 69 6d 75 6d 53 69 67 6e 69 66 69 63 61 6e |aximumSignifican|
00000370: 74 44 69 67 69 74 73 2a 6d 61 78 69 6d 75 6d 46 |tDigits*maximumF|
00000380: 72 61 63 74 69 6f 6e 44 69 67 69 74 73 06 73 75 |ractionDigits.su|
00000390: 62 06 6d 75 6c 06 6d 6f 64 0c 00 06 01 a4 01 00 |b.mul.mod.......|
000003a0: 02 00 03 00 0c f2 01 02 a6 01 00 00 00 c8 03 03 |................|
000003b0: 00 03 40 e5 00 00 00 40 40 e6 00 00 00 40 40 e7 |..@....@@....@@.|
000003c0: 00 00 00 40 40 e8 00 00 00 40 40 e9 00 00 00 40 |...@@....@@....@|
000003d0: 40 ea 00 00 00 40 40 eb 00 00 00 40 40 ec 00 00 |@....@@....@@...|
000003e0: 00 40 40 ed 00 00 00 40 40 ee 00 00 00 40 40 ef |.@@....@@....@@.|
000003f0: 00 00 00 40 40 f0 00 00 00 40 c2 00 41 e5 00 00 |...@@....@..A...|
00000400: 00 00 c2 01 41 e6 00 00 00 00 c2 02 41 e7 00 00 |....A.......A...|
00000410: 00 00 c2 03 41 e8 00 00 00 00 c2 04 41 e9 00 00 |....A.......A...|
00000420: 00 00 c2 05 41 ea 00 00 00 00 c2 06 41 eb 00 00 |....A.......A...|
00000430: 00 00 c2 07 41 ec 00 00 00 00 c2 08 41 ed 00 00 |....A.......A...|
00000440: 00 00 c2 09 41 ee 00 00 00 00 c2 0a 41 ef 00 00 |....A.......A...|
00000450: 00 00 c2 0b 41 f0 00 00 00 00 04 f1 00 00 00 cb |....A...........|
00000460: 06 cb 6f 13 00 00 00 39 f2 00 00 00 04 f3 00 00 |..o....9........|
00000470: 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 |.......o.......0|
00000480: 39 ea 00 00 00 f0 cb 39 eb 00 00 00 f0 cb 39 ee |9......9......9.|
00000490: 00 00 00 f0 cb 39 ef 00 00 00 f0 cb 39 f0 00 00 |.....9......9...|
000004a0: 00 f0 cf 28 e8 03 24 00 00 00 a8 01 06 00 00 0d |...(..$.........|
000004b0: 38 08 34 18 00 0f fc 03 1f 1b 18 0d 17 1b 18 0d |8.4.............|
000004c0: 17 1b 1e 0d 1d 1b 1a 0d 19 1b 1e 00 0c 43 06 01 |.............C..|
000004d0: ca 03 03 01 03 04 00 00 79 04 ea 03 00 01 00 ec |........y.......|
000004e0: 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 00 cb |....h...........|
000004f0: c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 |.............)..|
00000500: ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 |./...+...K.....!|
00000510: d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 |...K.......C9...|
00000520: 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 |$...C9...$.....)|
00000530: 39 9f 00 00 00 04 f7 00 00 00 d3 9f 04 f8 00 00 |9...............|
00000540: 00 9f 04 f9 00 00 00 9f d4 9f 04 f8 00 00 00 9f |................|
00000550: d5 ec 10 04 fa 00 00 00 d5 9f 04 fb 00 00 00 9f |................|
00000560: ee 02 c3 9f f1 30 e8 03 50 04 00 12 10 07 12 0c |.....0..P.......|
00000570: 10 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 |..!.............|
00000580: 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b |....#../,..0Y...|
00000590: 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 |........).)..4D.|
000005a0: 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 |. . ..?.. ..1*".|
000005b0: 03 20 14 15 0c 06 31 07 15 00 0c 43 06 01 cc 03 |. ....1....C....|
000005c0: 02 02 02 04 00 00 31 04 f8 03 00 01 00 fa 03 00 |......1.........|
000005d0: 01 00 fc 03 00 00 00 c8 03 03 00 03 09 cb 6f 0a |..............o.|
000005e0: 00 00 00 d4 f0 0e 0e ee 17 cc 6f 13 00 00 00 0a |..........o.....|
000005f0: cb 39 e5 00 00 00 c8 d3 a9 f1 0e 0e ee 02 30 39 |.9............09|
00000600: e5 00 00 00 c7 0a 04 ff 00 00 00 f3 29 e8 03 1a |............)...|
00000610: 11 00 04 08 27 08 07 08 3c 07 0d 00 1b 0e 07 1a |....'...<.......|
00000620: 07 15 07 05 22 13 1b 0e 25 01 00 0c 43 06 01 ce |...."...%...C...|
00000630: 03 02 02 02 02 00 00 1b 04 80 04 00 01 00 82 04 |................|
00000640: 00 01 00 84 04 00 00 00 86 04 00 01 00 b4 01 00 |................|
00000650: 00 00 cb b4 00 00 00 00 cc c8 d4 a5 ec 09 c7 d3 |................|
00000660: 9c cb 95 01 ee f4 c7 28 e8 03 18 23 00 04 08 21 |.......(...#...!|
00000670: 0a 20 10 07 08 07 03 12 15 07 0a 07 05 0b 1e 18 |. ..............|
00000680: 1b 07 0d 00 0c 43 06 01 d0 03 02 00 02 03 00 00 |.....C..........|
00000690: 69 02 80 04 00 01 00 88 04 00 01 00 39 e5 00 00 |i...........9...|
000006a0: 00 d3 d4 a5 f1 0e 39 e5 00 00 00 d4 d3 a5 98 f1 |......9.........|
000006b0: 0e 39 e5 00 00 00 d3 d4 a6 f1 0e 39 e5 00 00 00 |.9.........9....|
000006c0: d4 d3 a6 98 f1 0e 39 e5 00 00 00 d4 d3 a7 f1 0e |......9.........|
000006d0: 39 e5 00 00 00 d3 d4 a7 98 f1 0e 39 e5 00 00 00 |9..........9....|
000006e0: d4 d3 a8 f1 0e 39 e5 00 00 00 d3 d4 a8 98 f1 0e |.....9..........|
000006f0: 39 e5 00 00 00 d3 d4 ac f1 0e 39 e5 00 00 00 d3 |9.........9.....|
00000700: d4 ab 98 f1 29 e8 03 66 2b 00 03 08 1b 0e 07 08 |....)..f+.......|
00000710: 07 03 07 05 0d 0b 1b 12 07 08 07 03 0c 09 0d 0b |................|
00000720: 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 0a 07 05 |................|
00000730: 0c 09 0d 0b 1b 0e 07 08 07 03 07 05 0d 0b 1b 12 |................|
00000740: 07 08 07 03 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 |................|
00000750: 0d 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 0e 07 0a |................|
00000760: 07 05 07 05 0d 0b 1b 12 07 0a 07 05 0c 09 00 0c |................|
00000770: 43 06 01 d2 03 02 00 02 03 00 00 68 02 80 04 00 |C..........h....|
00000780: 01 00 88 04 00 01 00 39 e5 00 00 00 d3 d4 ab f1 |.......9........|
00000790: 0e 39 e5 00 00 00 d4 d3 ab f1 0e 39 e5 00 00 00 |.9.........9....|
000007a0: d3 d4 ac 98 f1 0e 39 e5 00 00 00 d4 d3 ac 98 f1 |......9.........|
000007b0: 0e 39 e5 00 00 00 d3 d4 a6 f1 0e 39 e5 00 00 00 |.9.........9....|
000007c0: d4 d3 a6 f1 0e 39 e5 00 00 00 d3 d4 a5 98 f1 0e |.....9..........|
000007d0: 39 e5 00 00 00 d3 d4 a8 f1 0e 39 e5 00 00 00 d4 |9.........9.....|
000007e0: d3 a8 f1 0e 39 e5 00 00 00 d3 d4 a7 98 f1 29 e8 |....9.........).|
000007f0: 03 66 38 00 03 08 1b 0e 07 0a 07 05 07 05 0d 0b |.f8.............|
00000800: 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 0a 07 05 |................|
00000810: 0c 09 0d 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 0e |................|
00000820: 07 0a 07 05 07 05 0d 0b 1b 0e 07 0a 07 05 07 05 |................|
00000830: 0d 0b 1b 12 07 08 07 03 0c 09 0d 0b 1b 0e 07 0a |................|
00000840: 07 05 07 05 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b |................|
00000850: 1b 12 07 08 07 03 0c 09 00 0c 43 06 01 d4 03 00 |..........C.....|
00000860: 02 00 04 00 05 d1 01 02 80 04 00 00 00 84 04 00 |................|
00000870: 01 00 39 e8 00 00 00 b4 02 00 00 00 b4 03 00 00 |..9.............|
00000880: 00 f2 0e 39 e9 00 00 00 b4 03 00 00 00 b4 03 00 |...9............|
00000890: 00 00 f2 0e 39 e8 00 00 00 b9 b4 03 00 00 00 f2 |....9...........|
000008a0: 0e 39 e9 00 00 00 ba b4 03 00 00 00 f2 0e 39 e8 |.9............9.|
000008b0: 00 00 00 c1 00 b4 03 00 00 00 f2 0e 39 e9 00 00 |............9...|
000008c0: 00 39 a5 00 00 00 43 05 01 00 00 bb 24 01 00 b4 |.9....C.....$...|
000008d0: 02 00 00 00 f2 0e 39 e7 00 00 00 b4 03 00 00 00 |......9.........|
000008e0: b4 64 00 00 00 f2 cb 39 e5 00 00 00 c7 b4 01 00 |.d.....9........|
000008f0: 00 00 a0 c7 ac f1 0e 39 e5 00 00 00 c7 c1 01 ab |.......9........|
00000900: f1 0e 39 e5 00 00 00 c7 c1 02 ab f1 0e b4 01 00 |..9.............|
00000910: 00 00 b4 1f 00 00 00 a2 cc 39 e5 00 00 00 c8 c1 |.........9......|
00000920: 03 04 06 01 00 00 f3 0e b4 01 00 00 00 b4 20 00 |.............. .|
00000930: 00 00 a2 cc 39 e5 00 00 00 c8 c1 04 04 07 01 00 |....9...........|
00000940: 00 f3 29 e8 03 54 44 00 04 08 4d 12 0d 11 4d 0e |..)..TD...M...M.|
00000950: 0d 0d 39 12 0d 11 39 0e 0d 0d 3e 12 0d 11 1b 10 |..9...9...>.....|
00000960: 1b 08 20 0a 2a 13 0d 05 4d 14 0d 1b 1b 10 20 04 |.. .*...M..... .|
00000970: 07 12 07 05 07 13 0d 0b 1b 0e 11 04 07 05 0d 0b |................|
00000980: 1b 0e 11 04 07 05 0d 0b 34 0e 0d 0d 1b 0e 2a 01 |........4.....*.|
00000990: 0d 0b 34 0e 0d 0d 1b 0e 2a 01 00 06 cd cc cc cc |..4.....*.......|
000009a0: cc cc 00 40 0a 14 d1 13 38 cf 55 7d 94 d6 75 f7 |...@....8.U}..u.|
000009b0: 41 5b 56 68 37 67 ca 53 46 5a 0a 14 d1 13 38 cf |A[Vh7g.SFZ....8.|
000009c0: 55 7d 94 d6 75 f7 41 5b 56 68 37 67 ca 53 46 5a |U}..u.A[Vh7g.SFZ|
000009d0: 0a 05 00 00 00 80 00 0a 05 00 00 00 00 01 0c 43 |...............C|
000009e0: 06 01 d6 03 00 00 00 03 00 04 79 00 39 e5 00 00 |..........y.9...|
000009f0: 00 39 b9 00 00 00 c3 f1 b4 00 00 00 00 f2 0e 39 |.9.............9|
00000a00: e5 00 00 00 39 b9 00 00 00 04 08 01 00 00 f1 b4 |....9...........|
00000a10: 7b 00 00 00 f2 0e 39 e5 00 00 00 39 b9 00 00 00 |{.....9....9....|
00000a20: 04 09 01 00 00 f1 b4 7b 00 00 00 f2 0e 39 e6 00 |.......{.....9..|
00000a30: 00 00 39 d2 00 00 00 c2 00 f2 0e 39 e6 00 00 00 |..9........9....|
00000a40: 39 d2 00 00 00 c2 01 f2 0e 39 e6 00 00 00 39 d2 |9........9....9.|
00000a50: 00 00 00 c2 02 f2 0e 39 e6 00 00 00 39 d2 00 00 |.......9....9...|
00000a60: 00 c2 03 f2 29 e8 03 32 55 00 03 08 1b 0e 20 0c |....)..2U..... .|
00000a70: 20 0d 0d 0b 1b 0e 34 0c 20 0d 0d 0b 1b 0e 34 0c | .....4. .....4.|
00000a80: 20 0d 0d 0b 1b 1a 25 01 0d 17 1b 1a 25 01 0d 17 | .....%.....%...|
00000a90: 1b 1a 25 01 0d 17 1b 1a 25 01 00 0c 42 06 01 00 |..%.....%...B...|
00000aa0: 00 00 00 02 00 00 0c 00 39 b9 00 00 00 04 0a 01 |........9.......|
00000ab0: 00 00 f1 29 e8 03 06 59 1e 02 10 34 0c 00 0c 42 |...)...Y...4...B|
00000ac0: 06 01 00 00 00 00 02 00 00 0c 00 39 b9 00 00 00 |...........9....|
00000ad0: 04 0b 01 00 00 f1 29 e8 03 06 5a 1e 02 10 34 0c |......)...Z...4.|
00000ae0: 00 0c 42 06 01 00 00 00 00 02 00 00 0c 00 39 b9 |..B...........9.|
00000af0: 00 00 00 04 0c 01 00 00 f1 29 e8 03 06 5b 1e 02 |.........)...[..|
00000b00: 10 34 0c 00 0c 42 06 01 00 00 00 00 02 00 00 0c |.4...B..........|
00000b10: 00 39 b9 00 00 00 04 0d 01 00 00 f1 29 e8 03 06 |.9..........)...|
00000b20: 5c 1e 02 10 34 0c 00 0c 43 06 01 d8 03 04 03 04 |\...4...C.......|
00000b30: 05 00 00 44 07 9c 04 00 01 00 80 04 00 01 00 88 |...D............|
00000b40: 04 00 01 00 9e 04 00 01 00 a0 04 00 00 00 a2 04 |................|
00000b50: 00 01 00 a4 04 00 02 00 39 b9 00 00 00 d3 48 cb |........9.....H.|
00000b60: 39 b9 00 00 00 d3 04 13 01 00 00 9f 48 cc 39 e5 |9...........H.9.|
00000b70: 00 00 00 c7 d4 d5 f2 d6 ab f1 0e c8 d4 d5 f2 cd |................|
00000b80: 39 e5 00 00 00 c9 b7 48 d6 ab f1 0e 39 e5 00 00 |9......H....9...|
00000b90: 00 d4 d5 d6 9c c9 b8 48 9f ab f1 29 e8 03 48 5e |.......H...)..H^|
00000ba0: 00 04 14 1b 0e 07 01 0d 05 1b 0e 20 0a 07 0b 0d |........... ....|
00000bb0: 1d 1b 0e 07 08 07 06 07 07 07 14 07 05 07 15 0d |................|
00000bc0: 03 07 0e 07 06 07 07 0d 13 1b 0e 0c 02 07 0e 07 |................|
00000bd0: 05 07 0b 0d 0b 1b 0e 07 0a 07 08 07 03 07 0c 0c |................|
00000be0: 02 07 05 07 11 07 05 00 0c 43 06 01 da 03 04 00 |.........C......|
00000bf0: 04 06 00 00 40 04 a0 04 00 01 00 80 04 00 01 00 |....@...........|
00000c00: 88 04 00 01 00 84 04 00 01 00 39 ec 00 00 00 d3 |..........9.....|
00000c10: d4 d5 d6 b7 48 22 04 00 0e 39 ec 00 00 00 d3 d4 |....H"...9......|
00000c20: 8e d5 d6 b8 48 22 04 00 0e 39 ec 00 00 00 d3 d4 |....H"...9......|
00000c30: d5 8e d6 b9 48 22 04 00 0e 39 ec 00 00 00 d3 d4 |....H"...9......|
00000c40: 8e d5 8e d6 ba 48 22 04 00 29 e8 03 42 67 00 03 |.....H"..)..Bg..|
00000c50: 08 1b 18 07 0a 07 06 07 06 0c 02 07 19 17 15 1b |................|
00000c60: 18 07 0c 07 01 07 08 07 06 0c 02 07 1b 17 15 1b |................|
00000c70: 18 07 0a 07 08 07 01 07 08 0c 02 07 1b 17 15 1b |................|
00000c80: 18 07 0c 07 01 07 0a 07 01 07 08 0c 02 07 1d 00 |................|
00000c90: 0c 43 06 01 dc 03 00 01 00 08 00 05 bd 02 01 84 |.C..............|
00000ca0: 04 00 00 00 39 e5 00 00 00 39 b9 00 00 00 43 14 |....9....9....C.|
00000cb0: 01 00 00 b4 00 00 00 00 24 01 00 b4 ff ff ff ff |........$.......|
00000cc0: ad f1 0e 39 e5 00 00 00 39 b9 00 00 00 43 14 01 |...9....9....C..|
00000cd0: 00 00 b4 07 00 00 00 24 01 00 b4 02 00 00 00 ad |.......$........|
00000ce0: f1 0e 39 e5 00 00 00 39 b9 00 00 00 43 05 01 00 |..9....9....C...|
00000cf0: 00 c1 00 24 01 00 c1 01 ad f1 0e 39 b9 00 00 00 |...$.......9....|
00000d00: 43 15 01 00 00 c1 02 24 01 00 cb 39 e5 00 00 00 |C......$...9....|
00000d10: c7 b7 48 c1 03 ad f1 0e 39 e5 00 00 00 c7 b8 48 |..H.....9......H|
00000d20: c1 04 ad f1 0e 39 ed 00 00 00 04 16 01 00 00 b4 |.....9..........|
00000d30: 03 00 00 00 b4 02 00 00 00 b4 01 00 00 00 b4 ff |................|
00000d40: ff ff ff b4 ff ff ff ff b4 01 00 00 00 26 04 00 |.............&..|
00000d50: 22 04 00 0e 39 ed 00 00 00 04 17 01 00 00 b4 03 |"...9...........|
00000d60: 00 00 00 b4 02 00 00 00 b4 01 00 00 00 b4 fe ff |................|
00000d70: ff ff b4 fe ff ff ff b4 01 00 00 00 26 04 00 22 |............&.."|
00000d80: 04 00 0e 39 ed 00 00 00 04 18 01 00 00 b4 03 00 |...9............|
00000d90: 00 00 b4 02 00 00 00 b4 02 00 00 00 b4 ff ff ff |................|
00000da0: ff b4 ff ff ff ff b4 02 00 00 00 26 04 00 22 04 |...........&..".|
00000db0: 00 0e 39 ed 00 00 00 04 19 01 00 00 b4 03 00 00 |..9.............|
00000dc0: 00 b4 02 00 00 00 b4 01 00 00 00 b4 fe ff ff ff |................|
00000dd0: b4 ff ff ff ff b4 02 00 00 00 26 04 00 22 04 00 |..........&.."..|
00000de0: 29 e8 03 62 6e 00 04 08 1b 0e 1b 0c 34 14 11 12 |)..bn.......4...|
00000df0: 1b 07 07 2b 0d 0b 1b 0e 1b 0c 34 14 2a 0a 07 2b |...+......4.*..+|
00000e00: 0d 0b 1b 0e 1b 0c 25 0a 1b 38 07 4f 0d 03 1b 0c |......%..8.O....|
00000e10: 25 10 17 23 1b 0e 0c 02 11 08 07 0b 0d 0b 1b 0e |%..#............|
00000e20: 0c 02 11 08 07 0b 0d 0b 7f 40 1b 0a 43 35 17 13 |.........@..C5..|
00000e30: 7f 40 1b 0a 43 35 17 13 7f 40 1b 0a 43 35 17 13 |.@..C5...@..C5..|
00000e40: 7f 40 1b 0a 43 35 00 0a 0c 00 00 00 00 00 00 00 |.@..C5..........|
00000e50: c0 ff ff ff 00 0a 06 ff ff fd ff ff 0f 0a 0c 00 |................|
00000e60: 00 00 00 00 00 00 c0 ff ff ff 00 0a 06 ff ff fd |................|
00000e70: ff ff 0f 0a 06 ff ff fb ff fb 1f 0c 43 06 01 de |............C...|
00000e80: 03 00 04 00 07 00 31 e7 0e 04 c8 03 00 00 00 80 |......1.........|
00000e90: 04 00 01 00 88 04 00 02 00 b4 04 00 03 00 39 e5 |..............9.|
00000ea0: 00 00 00 b4 01 00 00 00 99 04 8e 00 00 00 ad f1 |................|
00000eb0: 0e 39 e5 00 00 00 b8 99 39 1b 01 00 00 04 1c 01 |.9......9.......|
00000ec0: 00 00 ad f2 0e 39 e5 00 00 00 b8 b8 ab 39 1b 01 |.....9.......9..|
00000ed0: 00 00 f2 0e 39 e5 00 00 00 b8 b8 ae 39 1b 01 00 |....9.......9...|
00000ee0: 00 f2 0e 39 e8 00 00 00 b9 39 1b 01 00 00 ba 39 |...9.....9.....9|
00000ef0: 1b 01 00 00 22 04 00 0e 39 e9 00 00 00 ba 39 1b |...."...9.....9.|
00000f00: 01 00 00 ba 39 1b 01 00 00 22 04 00 0e 39 e8 00 |....9...."...9..|
00000f10: 00 00 b9 ba 39 1b 01 00 00 f3 0e 39 e9 00 00 00 |....9......9....|
00000f20: ba ba 39 1b 01 00 00 f3 0e 39 e8 00 00 00 c1 00 |..9......9......|
00000f30: ba 39 1b 01 00 00 f3 0e 39 e9 00 00 00 39 a5 00 |.9......9....9..|
00000f40: 00 00 43 05 01 00 00 bf 09 24 01 00 ba 39 1b 01 |..C......$...9..|
00000f50: 00 00 f3 0e 39 e8 00 00 00 b4 02 00 00 00 ba 39 |....9..........9|
00000f60: 1b 01 00 00 f3 0e 39 e9 00 00 00 b4 03 00 00 00 |......9.........|
00000f70: ba 39 1b 01 00 00 f3 0e 39 1d 01 00 00 11 c0 80 |.9......9.......|
00000f80: 00 21 01 00 cb 39 e5 00 00 00 c7 42 1e 01 00 00 |.!...9.....B....|
00000f90: c0 80 00 ab f1 0e 39 1f 01 00 00 43 05 01 00 00 |......9....C....|
00000fa0: b9 39 1b 01 00 00 c7 24 03 00 cc 39 e5 00 00 00 |.9.....$...9....|
00000fb0: c8 39 1f 01 00 00 43 20 01 00 00 04 21 01 00 00 |.9....C ....!...|
00000fc0: b7 c7 24 03 00 ad f1 0e 39 e5 00 00 00 c7 42 22 |..$.....9.....B"|
00000fd0: 01 00 00 0a ad f1 0e 39 e5 00 00 00 39 1f 01 00 |.......9....9...|
00000fe0: 00 43 23 01 00 00 c8 24 01 00 b8 ab c1 01 39 24 |.C#....$......9$|
00000ff0: 01 00 00 f3 0e 39 1d 01 00 00 43 25 01 00 00 39 |.....9....C%...9|
00001000: 1f 01 00 00 42 05 01 00 00 43 26 01 00 00 07 b9 |....B....C&.....|
00001010: 24 02 00 c0 80 00 24 02 00 cd 39 e5 00 00 00 c8 |$.....$...9.....|
00001020: c9 ad f1 0e 39 e5 00 00 00 39 1f 01 00 00 43 27 |....9....9....C'|
00001030: 01 00 00 39 1f 01 00 00 39 92 00 00 00 f1 24 01 |...9....9.....$.|
00001040: 00 f1 0e 39 e5 00 00 00 39 1f 01 00 00 43 28 01 |...9....9....C(.|
00001050: 00 00 b8 39 1b 01 00 00 24 02 00 f1 0e 39 e5 00 |...9....$....9..|
00001060: 00 00 39 1f 01 00 00 43 28 01 00 00 b8 39 1b 01 |..9....C(....9..|
00001070: 00 00 b7 9d 39 1b 01 00 00 24 03 00 98 f1 0e 39 |....9....$.....9|
00001080: e5 00 00 00 39 1f 01 00 00 43 29 01 00 00 bf fd |....9....C).....|
00001090: 39 1b 01 00 00 24 02 00 ba ad 39 1b 01 00 00 f2 |9....$....9.....|
000010a0: 0e 39 e5 00 00 00 39 1f 01 00 00 43 2a 01 00 00 |.9....9....C*...|
000010b0: bf fd 39 1b 01 00 00 24 02 00 b6 ad 39 1b 01 00 |..9....$....9...|
000010c0: 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 2b 01 |...9....9....C+.|
000010d0: 00 00 c1 02 39 1b 01 00 00 24 02 00 c1 03 ad 39 |....9....$.....9|
000010e0: 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 |......9....9....|
000010f0: 43 2c 01 00 00 ba 39 1b 01 00 00 24 02 00 c1 04 |C,....9....$....|
00001100: ad 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 |.9......9....9..|
00001110: 00 00 43 2d 01 00 00 c1 05 39 1b 01 00 00 c1 06 |..C-.....9......|
00001120: 39 1b 01 00 00 24 04 00 c1 07 ad 39 1b 01 00 00 |9....$.....9....|
00001130: f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 2e 01 00 |..9....9....C...|
00001140: 00 b6 39 1b 01 00 00 24 02 00 c1 08 8e ad 39 1b |..9....$......9.|
00001150: 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 |.....9....9....C|
00001160: 2f 01 00 00 b8 39 1b 01 00 00 24 02 00 c1 09 ad |/....9....$.....|
00001170: 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 |9......9....9...|
00001180: 00 43 30 01 00 00 c1 0a 39 1b 01 00 00 24 02 00 |.C0.....9....$..|
00001190: c1 0b ad 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 |...9......9....9|
000011a0: 1f 01 00 00 43 31 01 00 00 c1 0c 39 1b 01 00 00 |....C1.....9....|
000011b0: 24 02 00 c1 0d ad 39 1b 01 00 00 f2 0e 39 e5 00 |$.....9......9..|
000011c0: 00 00 39 1f 01 00 00 43 32 01 00 00 c1 0e 39 1b |..9....C2.....9.|
000011d0: 01 00 00 24 02 00 c1 0f ad 39 1b 01 00 00 f2 0e |...$.....9......|
000011e0: 39 e5 00 00 00 39 1f 01 00 00 43 33 01 00 00 c1 |9....9....C3....|
000011f0: 10 39 1b 01 00 00 24 02 00 c1 11 ad 39 1b 01 00 |.9....$.....9...|
00001200: 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 34 01 |...9....9....C4.|
00001210: 00 00 c1 12 39 1b 01 00 00 c1 13 8e 39 1b 01 00 |....9.......9...|
00001220: 00 24 04 00 c1 14 ad 39 1b 01 00 00 f2 0e 39 e5 |.$.....9......9.|
00001230: 00 00 00 39 1f 01 00 00 43 35 01 00 00 c1 15 39 |...9....C5.....9|
00001240: 1b 01 00 00 24 02 00 b9 ad 39 1b 01 00 00 f2 0e |....$....9......|
00001250: 39 e5 00 00 00 39 1f 01 00 00 43 36 01 00 00 c1 |9....9....C6....|
00001260: 16 39 1b 01 00 00 24 02 00 ba ad 39 1b 01 00 00 |.9....$....9....|
00001270: f2 0e 39 e5 00 00 00 39 1f 01 00 00 43 37 01 00 |..9....9....C7..|
00001280: 00 c1 17 8e 39 1b 01 00 00 24 02 00 bf fe ad 39 |....9....$.....9|
00001290: 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 00 00 |......9....9....|
000012a0: 43 38 01 00 00 c1 18 39 1b 01 00 00 24 02 00 ba |C8.....9....$...|
000012b0: ad 39 1b 01 00 00 f2 0e 39 e5 00 00 00 39 1f 01 |.9......9....9..|
000012c0: 00 00 43 39 01 00 00 ba 39 1b 01 00 00 b9 39 1b |..C9....9.....9.|
000012d0: 01 00 00 24 04 00 b8 ad 39 1b 01 00 00 f2 0e 39 |...$....9......9|
000012e0: e5 00 00 00 39 1f 01 00 00 43 3a 01 00 00 ba 39 |....9....C:....9|
000012f0: 1b 01 00 00 b9 39 1b 01 00 00 24 04 00 b6 ad 39 |.....9....$....9|
00001300: 1b 01 00 00 f2 0e 39 e5 00 00 00 c1 19 39 1b 01 |......9......9..|
00001310: 00 00 f2 43 39 00 00 00 24 00 00 0e 39 e5 00 00 |...C9...$...9...|
00001320: 00 c1 1a 39 1b 01 00 00 f2 43 3b 01 00 00 b9 24 |...9.....C;....$|
00001330: 01 00 0e 39 e5 00 00 00 c1 1b 39 1b 01 00 00 f2 |...9......9.....|
00001340: 43 3b 01 00 00 b9 04 3c 01 00 00 24 02 00 0e 39 |C;.....<...$...9|
00001350: e5 00 00 00 c1 1c 39 1b 01 00 00 f2 43 3d 01 00 |......9.....C=..|
00001360: 00 24 00 00 0e 39 e5 00 00 00 c1 1d 39 1b 01 00 |.$...9......9...|
00001370: 00 f2 43 3d 01 00 00 bc 24 01 00 0e 39 e5 00 00 |..C=....$...9...|
00001380: 00 c1 1e 39 1b 01 00 00 f2 43 3d 01 00 00 bc 39 |...9.....C=....9|
00001390: 1d 01 00 00 42 3e 01 00 00 24 02 00 0e 39 e5 00 |....B>...$...9..|
000013a0: 00 00 c1 1f 39 1b 01 00 00 f2 43 3f 01 00 00 bd |....9.....C?....|
000013b0: 24 01 00 0e 39 e5 00 00 00 c1 20 39 1b 01 00 00 |$...9..... 9....|
000013c0: f2 43 3f 01 00 00 bd 39 1d 01 00 00 42 3e 01 00 |.C?....9....B>..|
000013d0: 00 24 02 00 0e 39 e5 00 00 00 c0 23 01 c1 21 39 |.$...9.....#..!9|
000013e0: 1b 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 0e |.....C9.....$...|
000013f0: 39 e5 00 00 00 c0 23 03 c1 22 39 1b 01 00 00 f3 |9.....#.."9.....|
00001400: 43 39 00 00 00 bf 10 24 01 00 0e 39 e5 00 00 00 |C9.....$...9....|
00001410: c0 23 07 c1 23 39 1b 01 00 00 f3 43 39 00 00 00 |.#..#9.....C9...|
00001420: bf 10 24 01 00 0e 39 e5 00 00 00 c0 23 0f c1 24 |..$...9.....#..$|
00001430: 39 1b 01 00 00 f3 43 39 00 00 00 bf 10 24 01 00 |9.....C9.....$..|
00001440: 0e 39 e5 00 00 00 c0 23 01 c1 25 39 1b 01 00 00 |.9.....#..%9....|
00001450: f3 43 3b 01 00 00 b9 39 1d 01 00 00 42 40 01 00 |.C;....9....B@..|
00001460: 00 bf 10 24 03 00 0e 39 e5 00 00 00 c0 23 03 c1 |...$...9.....#..|
00001470: 26 39 1b 01 00 00 f3 43 3b 01 00 00 b9 39 1d 01 |&9.....C;....9..|
00001480: 00 00 42 40 01 00 00 bf 10 24 03 00 0e 39 e5 00 |..B@.....$...9..|
00001490: 00 00 c0 23 07 c1 27 39 1b 01 00 00 f3 43 3b 01 |...#..'9.....C;.|
000014a0: 00 00 b9 39 1d 01 00 00 42 40 01 00 00 bf 10 24 |...9....B@.....$|
000014b0: 03 00 0e 39 e5 00 00 00 c0 23 0f c1 28 39 1b 01 |...9.....#..(9..|
000014c0: 00 00 f3 43 3b 01 00 00 b9 39 1d 01 00 00 42 40 |...C;....9....B@|
000014d0: 01 00 00 bf 10 24 03 00 0e 39 e5 00 00 00 b7 c1 |.....$...9......|
000014e0: 29 39 1b 01 00 00 f3 43 3b 01 00 00 bd 39 1d 01 |)9.....C;....9..|
000014f0: 00 00 42 40 01 00 00 bf 10 24 03 00 0e 39 e5 00 |..B@.....$...9..|
00001500: 00 00 c1 2a 39 1b 01 00 00 f2 43 3b 01 00 00 b8 |...*9.....C;....|
00001510: 39 1d 01 00 00 42 40 01 00 00 bf 10 24 03 00 0e |9....B@.....$...|
00001520: 39 e5 00 00 00 c0 23 01 c1 2b 39 1b 01 00 00 f3 |9.....#..+9.....|
00001530: 43 3f 01 00 00 bc 39 1d 01 00 00 42 40 01 00 00 |C?....9....B@...|
00001540: bf 10 24 03 00 0e 39 e5 00 00 00 c0 23 01 c1 2c |..$...9.....#..,|
00001550: 39 1b 01 00 00 f3 43 3f 01 00 00 bc 39 1d 01 00 |9.....C?....9...|
00001560: 00 42 3e 01 00 00 bf 10 24 03 00 0e 39 e5 00 00 |.B>.....$...9...|
00001570: 00 c0 23 03 c1 2d 39 1b 01 00 00 f3 43 3f 01 00 |..#..-9.....C?..|
00001580: 00 bc 39 1d 01 00 00 42 40 01 00 00 bf 10 24 03 |..9....B@.....$.|
00001590: 00 0e 39 e5 00 00 00 c0 23 07 c1 2e 39 1b 01 00 |..9.....#...9...|
000015a0: 00 f3 43 3f 01 00 00 bc 39 1d 01 00 00 42 40 01 |..C?....9....B@.|
000015b0: 00 00 bf 10 24 03 00 0e 39 e5 00 00 00 c0 dd f0 |....$...9.......|
000015c0: c1 2f 39 1b 01 00 00 f3 43 3f 01 00 00 bc 39 1d |./9.....C?....9.|
000015d0: 01 00 00 42 41 01 00 00 bf 10 24 03 00 0e 39 e5 |...BA.....$...9.|
000015e0: 00 00 00 c0 23 01 c1 30 39 1b 01 00 00 f3 43 3d |....#..09.....C=|
000015f0: 01 00 00 bb 39 1d 01 00 00 42 40 01 00 00 bf 10 |....9....B@.....|
00001600: 24 03 00 0e 29 e8 03 c9 06 7b 00 04 08 34 22 25 |$...)....{...4"%|
00001610: 15 0d 0b 25 22 34 04 07 19 0d 0b 25 12 07 10 1b |...%"4.....%....|
00001620: 15 0d 0b 25 12 07 12 1b 17 0d 0b 20 1a 20 0c 1b |...%....... . ..|
00001630: 13 17 11 20 16 20 0c 1b 13 17 0d 25 20 1b 0d 0d |... . .....% ...|
00001640: 11 25 1c 1b 0d 0d 0d 2a 24 1b 11 0d 11 1b 10 1b |.%.....*$.......|
00001650: 08 25 0a 16 10 1b 23 0d 0d 39 22 1b 0f 0d 11 39 |.%....#..9"....9|
00001660: 1e 1b 0f 0d 02 2f 16 17 25 1b 0e 07 02 2a 0c 07 |...../..%....*..|
00001670: 0f 0d 03 1b 10 20 12 1b 06 07 0d 17 21 1b 0e 07 |..... ......!...|
00001680: 0c 1b 10 39 6e 07 57 11 2d 07 05 0d 0b 1b 0e 07 |...9n.W.-.......|
00001690: 02 20 12 07 15 0d 0b 1b 0e 1b 10 1b 12 07 01 16 |. ..............|
000016a0: 08 11 18 1b 41 0d 03 1b 16 1b 12 1b 10 1b 0a 25 |....A..........%|
000016b0: 0a 20 25 17 2d 1b 0e 07 0c 07 07 07 05 0d 0b 1b |. %.-...........|
000016c0: 0e 1b 10 1b 0e 1b 12 1b 01 07 11 11 1d 0d 0b 1b |................|
000016d0: 0e 1b 10 20 1a 1b 07 11 23 0d 0b 1b 10 1b 10 20 |... ....#...... |
000016e0: 1a 20 04 07 0a 1b 15 16 25 0d 0b 1b 0e 1b 10 1b |. ......%.......|
000016f0: 0a 0c 08 1b 09 16 10 07 0e 1b 37 0d 0b 1b 0e 1b |..........7.....|
00001700: 10 1b 0c 0c 08 1b 09 11 18 07 07 07 10 1b 3b 0d |..............;.|
00001710: 0b 1b 0e 1b 10 25 14 1b 0b 1b 12 07 54 1b 7f 0d |.....%......T...|
00001720: 0b 1b 0e 1b 10 20 10 1b 07 1b 0e 07 54 1b 7b 0d |..... ......T.{.|
00001730: 0b 1b 0e 1b 10 25 14 25 10 1b 1b 1b 22 07 52 1b |.....%.%....".R.|
00001740: 8d 01 0d 0b 1b 0e 1b 10 1b 0a 07 08 1b 09 1b 18 |................|
00001750: 07 07 07 54 1b 7d 0d 0b 1b 0e 1b 10 20 10 1b 07 |...T.}...... ...|
00001760: 1b 0e 07 54 1b 7b 0d 0b 1b 0e 1b 10 25 14 1b 0b |...T.{......%...|
00001770: 1b 12 07 56 1b 81 01 0d 0b 1b 0e 1b 10 25 16 1b |...V.........%..|
00001780: 0b 1b 12 07 56 1b 83 01 0d 0b 1b 0e 1b 10 25 16 |....V.........%.|
00001790: 1b 0b 1b 12 07 54 1b 81 01 0d 0b 1b 0e 1b 10 25 |.....T.........%|
000017a0: 16 1b 0b 1b 12 07 52 1b 7f 0d 0b 1b 0e 1b 10 25 |......R........%|
000017b0: 18 25 06 07 0c 1b 1d 1b 24 07 54 1b 95 01 0d 0b |.%......$.T.....|
000017c0: 1b 0e 1b 10 25 18 1b 0b 16 12 07 0e 1b 3d 0d 0b |....%........=..|
000017d0: 1b 0e 1b 10 25 16 1b 0b 16 12 07 0e 1b 3b 0d 0b |....%........;..|
000017e0: 1b 0e 1b 10 25 0e 07 0c 1b 0d 11 1c 0c 07 07 10 |....%...........|
000017f0: 1b 41 0d 0b 1b 0e 1b 10 25 18 1b 0b 16 12 07 0e |.A......%.......|
00001800: 1b 3d 0d 0b 1b 0e 1b 10 20 12 20 0c 1b 13 16 1a |.=...... . .....|
00001810: 07 0e 1b 43 0d 0b 1b 0e 1b 10 20 1c 20 0c 1b 13 |...C...... . ...|
00001820: 11 22 07 07 07 10 1b 4f 0e 0b 25 26 1b 19 07 1e |.".....O..%&....|
00001830: 1b 12 18 3b 25 26 1b 19 07 1e 20 10 18 39 25 26 |...;%&.... ..9%&|
00001840: 1b 19 07 1e 39 10 18 39 25 26 1b 19 07 1e 1b 1c |....9..9%&......|
00001850: 18 45 25 26 1b 19 07 1e 20 1c 18 45 25 26 1b 19 |.E%&.... ..E%&..|
00001860: 07 1e 20 24 1b 16 1b 1d 18 45 25 26 1b 19 07 1e |.. $.....E%&....|
00001870: 20 18 18 41 25 26 1b 19 07 1e 20 20 1b 16 1b 1d | ..A%&....  ....|
00001880: 19 41 34 2c 1b 1f 07 24 25 12 18 41 34 2c 1b 1f |.A4,...$%..A4,..|
00001890: 07 24 25 12 18 41 34 2c 1b 1f 07 24 25 12 18 41 |.$%..A4,...$%..A|
000018a0: 34 2c 1b 1f 07 24 25 12 18 41 34 2c 1b 1f 07 24 |4,...$%..A4,...$|
000018b0: 20 18 1b 16 25 1d 18 3f 34 2c 1b 1f 07 24 20 18 | ...%..?4,...$ .|
000018c0: 1b 16 25 1d 18 3f 34 2c 1b 1f 07 24 20 18 1b 16 |..%..?4,...$ ...|
000018d0: 25 1d 18 3f 34 2c 1b 1f 07 24 20 18 1b 16 25 1d |%..?4,...$ ...%.|
000018e0: 18 3f 2a 30 1b 23 07 28 20 18 1b 16 25 1d 18 43 |.?*0.#.( ...%..C|
000018f0: 25 2e 1b 21 07 26 20 18 1b 16 25 1d 18 41 34 2c |%..!.& ...%..A4,|
00001900: 1b 1f 07 24 20 20 1b 16 25 1d 18 47 34 2c 1b 1f |...$  ..%..G4,..|
00001910: 07 24 20 20 1b 16 25 1d 18 47 34 2c 1b 1f 07 24 |.$  ..%..G4,...$|
00001920: 20 20 1b 16 25 1d 18 47 34 2c 1b 1f 07 24 20 20 |  ..%..G4,...$  |
00001930: 1b 16 25 1d 18 47 1b 10 1b 1e 1b 21 07 26 20 20 |..%..G.....!.&  |
00001940: 1b 16 25 1d 18 49 34 2c 1b 1f 07 24 20 24 1b 16 |..%..I4,...$ $..|
00001950: 25 1d 00 06 cd cc cc cc cc cc 00 40 06 33 33 33 |%..........@.333|
00001960: 33 33 33 e3 3f 06 9a 99 99 99 99 99 c9 3f 06 8d |333.?........?..|
00001970: ac 58 9e dd 8a f3 3f 06 0b 03 ad 7a ea 93 f1 3f |.X....?....z...?|
00001980: 06 cd cc cc cc cc cc 00 40 06 9a 99 99 99 99 99 |........@.......|
00001990: f9 3f 06 a6 45 40 40 72 38 0a 40 06 ee 0c 09 8f |.?..E@@r8.@.....|
000019a0: 54 ed ea 3f 06 8c 06 b5 0f 28 4a e1 3f 06 9a 99 |T..?.....(J.?...|
000019b0: 99 99 99 99 b9 3f 06 80 0b 43 77 88 af b9 3f 06 |.....?...Cw...?.|
000019c0: 33 33 33 33 33 33 d3 3f 06 ff f6 14 9e 15 80 d3 |333333.?........|
000019d0: 3f 06 9a 99 99 99 99 99 d9 3f 06 8b 5e 0a a4 68 |?........?..^..h|
000019e0: 8c f2 3f 06 66 66 66 66 66 66 e6 3f 06 ad d4 7b |..?.ffffff.?...{|
000019f0: 2d 11 8b e3 3f 06 66 66 66 66 66 66 1c 40 06 66 |-...?.ffffff.@.f|
00001a00: 66 66 66 66 66 14 40 06 96 c7 22 68 b5 8c 01 40 |fffff.@..."h...@|
00001a10: 06 00 00 00 00 00 00 04 40 06 00 00 00 00 00 00 |........@.......|
00001a20: 04 40 06 00 00 00 00 00 00 04 40 06 00 00 00 00 |.@........@.....|
00001a30: 00 00 04 40 06 00 00 00 00 80 48 93 40 06 00 00 |...@......H.@...|
00001a40: 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 |...H.@......H.@.|
00001a50: 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 |.....H.@......H.|
00001a60: 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 |@......H.@......|
00001a70: 48 93 40 06 00 00 00 00 80 48 93 40 06 d5 78 e9 |H.@......H.@..x.|
00001a80: 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 |&1..?..x.&1..?..|
00001a90: 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f |x.&1..?..x.&1..?|
00001aa0: 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 |..x.&1..?..x.&1.|
00001ab0: dc 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 |.?..x.&1..?..x.&|
00001ac0: 31 08 dc 3f 06 f3 69 5f 8a bc f6 06 3f 06 00 00 |1..?..i_....?...|
00001ad0: 00 00 00 30 32 42 06 d5 78 e9 26 31 08 dc 3f 06 |...02B..x.&1..?.|
00001ae0: d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 08 dc |.x.&1..?..x.&1..|
00001af0: 3f 06 d5 78 e9 26 31 08 dc 3f 06 d5 78 e9 26 31 |?..x.&1..?..x.&1|
00001b00: 08 dc 3f 06 d5 78 e9 26 31 08 dc 3f 0c 43 06 01 |..?..x.&1..?.C..|
00001b10: e0 03 00 00 00 09 00 2a e0 0a 00 39 e5 00 00 00 |.......*...9....|
00001b20: b8 39 42 01 00 00 b8 ad 39 42 01 00 00 f3 0e 39 |.9B.....9B.....9|
00001b30: e5 00 00 00 b8 39 42 01 00 00 b9 ae 39 42 01 00 |.....9B.....9B..|
00001b40: 00 f3 0e 39 e8 00 00 00 b8 39 42 01 00 00 b9 39 |...9.....9B....9|
00001b50: 42 01 00 00 22 04 00 0e 39 e9 00 00 00 b9 39 42 |B..."...9.....9B|
00001b60: 01 00 00 b9 39 42 01 00 00 22 04 00 0e 39 e8 00 |....9B..."...9..|
00001b70: 00 00 b8 b9 39 42 01 00 00 f3 0e 39 e9 00 00 00 |....9B.....9....|
00001b80: b9 b9 39 42 01 00 00 f3 0e 39 e8 00 00 00 c1 00 |..9B.....9......|
00001b90: b9 39 42 01 00 00 f3 0e 39 e9 00 00 00 39 a5 00 |.9B.....9....9..|
00001ba0: 00 00 43 05 01 00 00 bb 24 01 00 b9 39 42 01 00 |..C.....$...9B..|
00001bb0: 00 f3 0e 39 e8 00 00 00 b4 02 00 00 00 ba 39 42 |...9..........9B|
00001bc0: 01 00 00 f3 0e 39 e9 00 00 00 b4 03 00 00 00 ba |.....9..........|
00001bd0: 39 42 01 00 00 f3 0e 39 e5 00 00 00 39 43 01 00 |9B.....9....9C..|
00001be0: 00 04 44 01 00 00 f1 c1 01 ad 39 42 01 00 00 f2 |..D.......9B....|
00001bf0: 0e 39 e5 00 00 00 39 43 01 00 00 04 45 01 00 00 |.9....9C....E...|
00001c00: f1 c1 02 ad 39 42 01 00 00 f2 0e 39 e5 00 00 00 |....9B.....9....|
00001c10: 39 43 01 00 00 04 46 01 00 00 f1 c1 03 ad 39 42 |9C....F.......9B|
00001c20: 01 00 00 f2 0e 39 e5 00 00 00 39 43 01 00 00 c1 |.....9....9C....|
00001c30: 04 f1 c1 05 ad 39 42 01 00 00 f2 0e 39 e5 00 00 |.....9B.....9...|
00001c40: 00 39 43 01 00 00 bf 7b f1 bf 7b ad 39 42 01 00 |.9C....{..{.9B..|
00001c50: 00 f2 0e 39 e5 00 00 00 39 43 01 00 00 0a f1 b8 |...9....9C......|
00001c60: ad 39 42 01 00 00 f2 0e 39 e5 00 00 00 bf 7b 39 |.9B.....9.....{9|
00001c70: 42 01 00 00 b8 9f 39 42 01 00 00 bf 7c ad 39 42 |B.....9B....|.9B|
00001c80: 01 00 00 22 04 00 0e 39 e5 00 00 00 bf 7b 39 42 |..."...9.....{9B|
00001c90: 01 00 00 b8 a0 39 42 01 00 00 bf 7a ad 39 42 01 |.....9B....z.9B.|
00001ca0: 00 00 22 04 00 0e 39 e5 00 00 00 c1 06 39 42 01 |.."...9......9B.|
00001cb0: 00 00 ba 9c 39 42 01 00 00 c1 07 ad 39 42 01 00 |....9B......9B..|
00001cc0: 00 22 04 00 0e 39 e5 00 00 00 bf 0a 39 42 01 00 |."...9......9B..|
00001cd0: 00 b9 9d 39 42 01 00 00 bc ad 39 42 01 00 00 22 |...9B.....9B..."|
00001ce0: 04 00 0e 39 e6 00 00 00 39 d0 00 00 00 c2 08 f2 |...9....9.......|
00001cf0: 0e 39 e5 00 00 00 bf 0a 39 42 01 00 00 ba 9e 39 |.9......9B.....9|
00001d00: 42 01 00 00 b8 ad 39 42 01 00 00 22 04 00 0e 39 |B.....9B..."...9|
00001d10: e5 00 00 00 bf f6 39 42 01 00 00 ba 9e 39 42 01 |......9B.....9B.|
00001d20: 00 00 b6 ad 39 42 01 00 00 22 04 00 0e 39 e5 00 |....9B..."...9..|
00001d30: 00 00 c1 09 39 42 01 00 00 ba a1 39 42 01 00 00 |....9B.....9B...|
00001d40: c1 0a ad 39 42 01 00 00 22 04 00 0e 39 e6 00 00 |...9B..."...9...|
00001d50: 00 39 d0 00 00 00 c2 0b f2 0e 39 e6 00 00 00 39 |.9........9....9|
00001d60: d0 00 00 00 c2 0c f2 0e 39 e5 00 00 00 39 43 01 |........9....9C.|
00001d70: 00 00 43 05 01 00 00 b9 39 42 01 00 00 0b 04 47 |..C.....9B.....G|
00001d80: 01 00 00 4e 48 01 00 00 bb 4e 49 01 00 00 24 03 |...NH....NI...$.|
00001d90: 00 c1 0d ad 39 42 01 00 00 f2 0e 39 e5 00 00 00 |....9B.....9....|
00001da0: 39 43 01 00 00 43 05 01 00 00 bf 65 39 42 01 00 |9C...C.....e9B..|
00001db0: 00 0b 04 47 01 00 00 4e 48 01 00 00 ba 4e 4a 01 |...G...NH....NJ.|
00001dc0: 00 00 24 03 00 c1 0e ad 39 42 01 00 00 f2 0e 39 |..$.....9B.....9|
00001dd0: e5 00 00 00 39 43 01 00 00 43 05 01 00 00 c1 0f |....9C...C......|
00001de0: 39 42 01 00 00 0b 04 47 01 00 00 4e 48 01 00 00 |9B.....G...NH...|
00001df0: ba 4e 4a 01 00 00 24 03 00 c1 10 ad 39 42 01 00 |.NJ...$.....9B..|
00001e00: 00 f2 0e 39 e5 00 00 00 39 43 01 00 00 43 38 01 |...9....9C...C8.|
00001e10: 00 00 c1 11 39 42 01 00 00 0b 04 47 01 00 00 4e |....9B.....G...N|
00001e20: 48 01 00 00 ba 4e 4a 01 00 00 24 03 00 c1 12 ad |H....NJ...$.....|
00001e30: 39 42 01 00 00 f2 0e 39 e5 00 00 00 39 43 01 00 |9B.....9....9C..|
00001e40: 00 43 6a 00 00 00 c1 13 39 42 01 00 00 c1 14 39 |.Cj.....9B.....9|
00001e50: 42 01 00 00 0b 04 47 01 00 00 4e 48 01 00 00 b9 |B.....G...NH....|
00001e60: 4e 4a 01 00 00 24 05 00 c1 15 ad 39 42 01 00 00 |NJ...$.....9B...|
00001e70: f2 0e 39 e5 00 00 00 39 43 01 00 00 43 4b 01 00 |..9....9C...CK..|
00001e80: 00 c1 16 39 42 01 00 00 c1 17 39 42 01 00 00 0b |...9B.....9B....|
00001e90: 04 3c 01 00 00 4e 48 01 00 00 b9 4e 4a 01 00 00 |.<...NH....NJ...|
00001ea0: 24 05 00 c1 18 ad 39 42 01 00 00 f2 0e 39 e5 00 |$.....9B.....9..|
00001eb0: 00 00 39 43 01 00 00 43 4c 01 00 00 c1 19 39 42 |..9C...CL.....9B|
00001ec0: 01 00 00 c1 1a 39 42 01 00 00 0b 04 47 01 00 00 |.....9B.....G...|
00001ed0: 4e 48 01 00 00 ba 4e 4a 01 00 00 24 05 00 c1 1b |NH....NJ...$....|
00001ee0: ad 39 42 01 00 00 f2 0e 39 e5 00 00 00 39 43 01 |.9B.....9....9C.|
00001ef0: 00 00 43 4d 01 00 00 c1 1c 39 42 01 00 00 c1 1d |..CM.....9B.....|
00001f00: 39 42 01 00 00 0b 04 47 01 00 00 4e 48 01 00 00 |9B.....G...NH...|
00001f10: bb 4e 4a 01 00 00 24 05 00 c1 1e ad 39 42 01 00 |.NJ...$.....9B..|
00001f20: 00 f2 0e 39 e5 00 00 00 39 43 01 00 00 43 10 01 |...9....9C...C..|
00001f30: 00 00 bf 14 39 42 01 00 00 ba 39 42 01 00 00 0b |....9B....9B....|
00001f40: 04 47 01 00 00 4e 48 01 00 00 ba 4e 49 01 00 00 |.G...NH....NI...|
00001f50: 24 05 00 c1 1f ad 39 42 01 00 00 f2 0e 39 e5 00 |$.....9B.....9..|
00001f60: 00 00 39 43 01 00 00 43 10 01 00 00 bf 14 39 42 |..9C...C......9B|
00001f70: 01 00 00 ba 39 42 01 00 00 0b 04 47 01 00 00 4e |....9B.....G...N|
00001f80: 48 01 00 00 bf 32 4e 4a 01 00 00 24 05 00 c1 20 |H....2NJ...$... |
00001f90: ad 39 42 01 00 00 f2 0e 39 e5 00 00 00 c1 21 39 |.9B.....9.....!9|
00001fa0: 42 01 00 00 f2 43 39 00 00 00 24 00 00 0e 39 e5 |B....C9...$...9.|
00001fb0: 00 00 00 c1 22 39 42 01 00 00 f2 43 3b 01 00 00 |...."9B....C;...|
00001fc0: b9 24 01 00 0e 39 e5 00 00 00 c1 23 39 42 01 00 |.$...9.....#9B..|
00001fd0: 00 f2 43 3b 01 00 00 b9 04 3c 01 00 00 24 02 00 |..C;.....<...$..|
00001fe0: 0e 39 e5 00 00 00 c1 24 39 42 01 00 00 f2 43 3d |.9.....$9B....C=|
00001ff0: 01 00 00 24 00 00 0e 39 e5 00 00 00 c1 25 39 42 |...$...9.....%9B|
00002000: 01 00 00 f2 43 3d 01 00 00 bc 24 01 00 0e 39 e5 |....C=....$...9.|
00002010: 00 00 00 c1 26 39 42 01 00 00 f2 43 3d 01 00 00 |....&9B....C=...|
00002020: bc 04 3c 01 00 00 24 02 00 0e 39 e5 00 00 00 c1 |..<...$...9.....|
00002030: 27 39 42 01 00 00 f2 43 3f 01 00 00 bd 24 01 00 |'9B....C?....$..|
00002040: 0e 39 e5 00 00 00 c1 28 39 42 01 00 00 f2 43 3f |.9.....(9B....C?|
00002050: 01 00 00 bd 04 3c 01 00 00 24 02 00 0e 39 e5 00 |.....<...$...9..|
00002060: 00 00 c1 29 8e 39 42 01 00 00 f2 43 3f 01 00 00 |...).9B....C?...|
00002070: bd 04 35 01 00 00 24 02 00 0e 29 e8 03 9d 04 d9 |..5...$...).....|
00002080: 01 00 03 08 20 14 20 04 07 0e 1b 19 0d 0b 20 14 |.... . ....... .|
00002090: 20 04 07 0e 1b 19 0d 0b 20 1a 20 0c 1b 13 17 11 | ....... . .....|
000020a0: 20 16 20 0c 1b 13 17 0d 25 20 1b 0d 0d 11 25 1c | . .....% ....%.|
000020b0: 1b 0d 0d 0d 2a 24 1b 11 0d 11 1b 10 1b 08 20 0a |....*$........ .|
000020c0: 16 10 1b 23 0d 0d 39 22 1b 0f 0d 11 39 1e 1b 0f |...#..9"....9...|
000020d0: 0d 0d 1b 0e 34 14 11 16 07 18 1b 43 0d 0b 1b 0e |....4......C....|
000020e0: 34 14 11 1e 07 18 1b 4b 0d 0b 1b 0e 34 14 11 22 |4......K....4.."|
000020f0: 07 18 1b 4f 0d 0b 1b 0e 25 14 11 0c 07 12 1b 33 |...O....%......3|
00002100: 0d 0b 1b 0e 25 14 11 0c 07 12 1b 33 0d 0b 1b 0e |....%......3....|
00002110: 20 14 0c 0e 07 0e 1b 31 0d 0b 25 18 20 04 07 0a | ......1..%. ...|
00002120: 25 04 07 12 1b 2f 17 0b 25 18 20 04 07 0a 25 04 |%..../..%. ...%.|
00002130: 07 12 1b 2f 17 0b 25 18 20 04 07 0a 25 04 07 12 |.../..%. ...%...|
00002140: 1b 2f 17 0b 25 16 20 04 07 0a 20 04 07 0e 1b 29 |./..%. ... ....)|
00002150: 17 0b 1b 1a 25 01 0d 17 25 16 20 04 07 0a 20 04 |....%...%. ... .|
00002160: 07 0e 1b 29 17 0b 1b 0e 0c 0a 20 04 07 0a 1b 0c |...)...... .....|
00002170: 07 07 07 10 1b 2d 17 0b 25 1e 20 04 07 0c 25 04 |.....-..%. ...%.|
00002180: 07 28 1b 4d 17 0b 1b 1a 25 01 0d 17 1b 1a 25 01 |.(.M....%.....%.|
00002190: 0d 17 1b 0e 1b 14 20 12 70 07 1c 1a 07 16 1a 4f |...... .p......O|
000021a0: 0e 0b 1b 0e 1b 14 25 16 70 0b 1c 14 07 18 1a 4b |......%.p......K|
000021b0: 0e 0b 1b 0e 1b 14 25 1a 70 0f 1c 14 07 16 1a 49 |......%.p......I|
000021c0: 0e 0b 1b 0e 1b 14 25 20 70 13 1c 12 07 16 1a 49 |......% p......I|
000021d0: 0e 0b 1b 0e 1b 14 25 1c 25 18 70 2b 1c 16 07 14 |......%.%.p+....|
000021e0: 1a 47 0e 0b 1b 0e 1b 14 25 1c 25 18 70 2b 1c 16 |.G......%.%.p+..|
000021f0: 07 14 1a 47 0e 0b 1b 0e 1b 14 25 1c 25 18 70 2b |...G......%.%.p+|
00002200: 1c 16 07 16 1a 49 0e 0b 1b 0e 1b 14 25 1c 25 18 |.....I......%.%.|
00002210: 70 2b 1c 16 07 18 1a 4b 0e 0b 1b 0e 1b 14 25 12 |p+.....K......%.|
00002220: 20 0c 70 15 1c 1c 07 14 1a 4d 0e 0b 1b 0e 1b 14 | .p......M......|
00002230: 25 12 20 0c 75 15 1c 18 08 32 00 05 03 67 00 02 |%. .u....2...g..|
00002240: 08 0b 25 26 1b 19 07 1e 1b 12 18 3b 25 26 1b 19 |..%&.......;%&..|
00002250: 07 1e 20 10 18 39 25 26 1b 19 07 1e 39 10 18 39 |.. ..9%&....9..9|
00002260: 25 26 1b 19 07 1e 1b 1c 18 45 25 26 1b 19 07 1e |%&.......E%&....|
00002270: 20 1c 18 45 25 26 1b 19 07 1e 39 1c 18 45 25 26 | ..E%&....9..E%&|
00002280: 1b 19 07 1e 20 18 18 41 25 26 1b 19 07 1e 39 18 |.... ..A%&....9.|
00002290: 18 41 25 10 07 18 1b 1b 07 20 39 18 00 06 9a 99 |.A%...... 9.....|
000022a0: 99 99 99 99 f1 3f 06 66 66 66 66 66 48 93 40 06 |.....?.fffffH.@.|
000022b0: 66 66 66 66 66 48 93 40 06 66 66 66 66 66 48 93 |fffffH.@.fffffH.|
000022c0: 40 06 9a 99 99 99 99 99 b9 3f 06 9a 99 99 99 99 |@........?......|
000022d0: 99 b9 3f 06 9a 99 99 99 99 99 09 40 06 33 33 33 |..?........@.333|
000022e0: 33 33 33 23 40 0c 42 06 01 00 00 00 00 02 00 00 |333#@.B.........|
000022f0: 0e 00 39 42 01 00 00 ba 9d 0e 39 42 01 00 00 29 |..9B......9B...)|
00002300: e8 03 09 ee 01 1d 02 18 20 04 0c 0a 00 06 00 00 |........ .......|
00002310: 00 00 00 4a 93 40 06 00 00 e8 72 d7 08 dc 41 0c |...J.@....r...A.|
00002320: 42 06 01 00 00 00 00 02 00 01 0f 00 39 42 01 00 |B...........9B..|
00002330: 00 c1 00 a1 0e 39 42 01 00 00 29 e8 03 09 f2 01 |.....9B...).....|
00002340: 1d 02 16 25 04 0c 10 00 06 cd cc cc cc cc cc 08 |...%............|
00002350: 40 0c 42 06 01 00 00 00 00 02 00 00 0f 00 39 42 |@.B...........9B|
00002360: 01 00 00 bf fd a1 0e 39 42 01 00 00 29 e8 03 0b |.......9B...)...|
00002370: f3 01 1d 02 16 1b 0a 0c 05 0c 0e 00 06 39 b4 c8 |.............9..|
00002380: 76 be 9f f6 3f 06 9a 99 99 99 99 19 24 40 06 fc |v...?.......$@..|
00002390: a9 f1 d2 4d 62 60 3f 06 0a d7 a3 70 3d 0a a7 3f |...Mb`?....p=..?|
000023a0: 06 6e 86 1b f0 f9 21 09 40 06 89 41 60 e5 d0 22 |.n....!.@..A`.."|
000023b0: 09 40 06 6e 86 1b f0 f9 21 09 40 06 7d 5c 1b 2a |.@.n....!.@.}\.*|
000023c0: c6 f9 d3 3f 06 9a 99 99 99 99 99 0b 40 06 6e 86 |...?........@.n.|
000023d0: 1b f0 f9 21 09 40 06 7d 5c 1b 2a c6 f9 d3 3f 06 |...!.@.}\.*...?.|
000023e0: 8f c2 f5 28 5c 8f 06 40 06 6e 86 1b f0 f9 21 09 |...(\..@.n....!.|
000023f0: 40 06 7d 5c 1b 2a c6 f9 d3 3f 06 31 08 ac 1c 5a |@.}\.*...?.1...Z|
00002400: 64 ef 3f 06 6e 86 1b f0 f9 21 09 40 06 b6 4a b0 |d.?.n....!.@..J.|
00002410: 38 9c f9 d3 3f 06 cb a1 45 b6 f3 fd 94 3f 06 ae |8...?...E....?..|
00002420: 47 e1 7a 14 ae 1a 40 06 ab aa aa aa aa aa 1a 40 |G.z...@........@|
00002430: 06 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 |......H.@......H|
00002440: 93 40 06 00 00 00 00 80 48 93 40 06 00 00 00 00 |.@......H.@.....|
00002450: 80 48 93 40 06 00 00 00 00 80 48 93 40 06 00 00 |.H.@......H.@...|
00002460: 00 00 80 48 93 40 06 00 00 00 00 80 48 93 40 06 |...H.@......H.@.|
00002470: 00 00 00 00 80 48 93 40 06 00 00 00 00 80 48 93 |.....H.@......H.|
00002480: 40                                              |@|
```