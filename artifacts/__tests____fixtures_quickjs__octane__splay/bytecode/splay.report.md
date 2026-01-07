# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/octane/splay.ts
**生成时间**: 2026-01-07T14:09:59.802Z

## 大小对比

- TypeScript编译器: 4161 字节
- WASM编译器: 4161 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 64,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/splay.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "performance",
      "offset": 80
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Splay",
      "offset": 92
    },
    {
      "index": 6,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "kSplayTreeSize",
      "offset": 98
    },
    {
      "index": 7,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "kSplayTreeModifications",
      "offset": 113
    },
    {
      "index": 8,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "kSplayTreePayloadDepth",
      "offset": 137
    },
    {
      "index": 9,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "splayTree",
      "offset": 160
    },
    {
      "index": 10,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "splaySampleTimeStart",
      "offset": 170
    },
    {
      "index": 11,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "GeneratePayloadTree",
      "offset": 191
    },
    {
      "index": 12,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "GenerateKey",
      "offset": 211
    },
    {
      "index": 13,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "splaySamples",
      "offset": 223
    },
    {
      "index": 14,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "splaySumOfSquaredPauses",
      "offset": 236
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SplayRMS",
      "offset": 260
    },
    {
      "index": 16,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "SplayUpdateStats",
      "offset": 269
    },
    {
      "index": 17,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "InsertNewNode",
      "offset": 286
    },
    {
      "index": 18,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "SplaySetup",
      "offset": 300
    },
    {
      "index": 19,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "SplayTearDown",
      "offset": 311
    },
    {
      "index": 20,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SplayRun",
      "offset": 325
    },
    {
      "index": 21,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "SplayTree",
      "offset": 334
    },
    {
      "index": 22,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "root_",
      "offset": 344
    },
    {
      "index": 23,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "isEmpty",
      "offset": 350
    },
    {
      "index": 24,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "insert",
      "offset": 358
    },
    {
      "index": 25,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "remove",
      "offset": 365
    },
    {
      "index": 26,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "find",
      "offset": 372
    },
    {
      "index": 27,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "findMax",
      "offset": 377
    },
    {
      "index": 28,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "findGreatestLessThan",
      "offset": 385
    },
    {
      "index": 29,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "exportKeys",
      "offset": 406
    },
    {
      "index": 30,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "splay_",
      "offset": 417
    },
    {
      "index": 31,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Node",
      "offset": 424
    },
    {
      "index": 32,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "left",
      "offset": 429
    },
    {
      "index": 33,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "right",
      "offset": 434
    },
    {
      "index": 34,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "traverse_",
      "offset": 440
    },
    {
      "index": 35,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "depth",
      "offset": 450
    },
    {
      "index": 36,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 456
    },
    {
      "index": 37,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "array",
      "offset": 460
    },
    {
      "index": 38,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "String for key ",
      "offset": 466
    },
    {
      "index": 39,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": " in leaf node",
      "offset": 482
    },
    {
      "index": 40,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "random",
      "offset": 496
    },
    {
      "index": 41,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 503
    },
    {
      "index": 42,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 509
    },
    {
      "index": 43,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "time",
      "offset": 514
    },
    {
      "index": 44,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "pause",
      "offset": 519
    },
    {
      "index": 45,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 525
    },
    {
      "index": 46,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "payload",
      "offset": 529
    },
    {
      "index": 47,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 537
    },
    {
      "index": 48,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 539
    },
    {
      "index": 49,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "PerformanceNowUnsupported",
      "offset": 543
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "keys",
      "offset": 569
    },
    {
      "index": 51,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "Splay tree has wrong size",
      "offset": 574
    },
    {
      "index": 52,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "Splay tree not sorted",
      "offset": 600
    },
    {
      "index": 53,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "greatest",
      "offset": 622
    },
    {
      "index": 54,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "node",
      "offset": 631
    },
    {
      "index": 55,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "removed",
      "offset": 636
    },
    {
      "index": 56,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "Key not found: ",
      "offset": 644
    },
    {
      "index": 57,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "opt_startNode",
      "offset": 660
    },
    {
      "index": 58,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "current",
      "offset": 674
    },
    {
      "index": 59,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 682
    },
    {
      "index": 60,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 689
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "dummy",
      "offset": 694
    },
    {
      "index": 62,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tmp",
      "offset": 700
    },
    {
      "index": 63,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 704
    }
  ],
  "functionHeader": {
    "offset": 706,
    "tag": "0xd",
    "remaining": 3455
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 64,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/splay.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "performance",
      "offset": 80
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Splay",
      "offset": 92
    },
    {
      "index": 6,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "kSplayTreeSize",
      "offset": 98
    },
    {
      "index": 7,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "kSplayTreeModifications",
      "offset": 113
    },
    {
      "index": 8,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "kSplayTreePayloadDepth",
      "offset": 137
    },
    {
      "index": 9,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "splayTree",
      "offset": 160
    },
    {
      "index": 10,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "splaySampleTimeStart",
      "offset": 170
    },
    {
      "index": 11,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "GeneratePayloadTree",
      "offset": 191
    },
    {
      "index": 12,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "GenerateKey",
      "offset": 211
    },
    {
      "index": 13,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "splaySamples",
      "offset": 223
    },
    {
      "index": 14,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "splaySumOfSquaredPauses",
      "offset": 236
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SplayRMS",
      "offset": 260
    },
    {
      "index": 16,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "SplayUpdateStats",
      "offset": 269
    },
    {
      "index": 17,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "InsertNewNode",
      "offset": 286
    },
    {
      "index": 18,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "SplaySetup",
      "offset": 300
    },
    {
      "index": 19,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "SplayTearDown",
      "offset": 311
    },
    {
      "index": 20,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "SplayRun",
      "offset": 325
    },
    {
      "index": 21,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "SplayTree",
      "offset": 334
    },
    {
      "index": 22,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "root_",
      "offset": 344
    },
    {
      "index": 23,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "isEmpty",
      "offset": 350
    },
    {
      "index": 24,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "insert",
      "offset": 358
    },
    {
      "index": 25,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "remove",
      "offset": 365
    },
    {
      "index": 26,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "find",
      "offset": 372
    },
    {
      "index": 27,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "findMax",
      "offset": 377
    },
    {
      "index": 28,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "findGreatestLessThan",
      "offset": 385
    },
    {
      "index": 29,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "exportKeys",
      "offset": 406
    },
    {
      "index": 30,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "splay_",
      "offset": 417
    },
    {
      "index": 31,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Node",
      "offset": 424
    },
    {
      "index": 32,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "left",
      "offset": 429
    },
    {
      "index": 33,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "right",
      "offset": 434
    },
    {
      "index": 34,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "traverse_",
      "offset": 440
    },
    {
      "index": 35,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "depth",
      "offset": 450
    },
    {
      "index": 36,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 456
    },
    {
      "index": 37,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "array",
      "offset": 460
    },
    {
      "index": 38,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "String for key ",
      "offset": 466
    },
    {
      "index": 39,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": " in leaf node",
      "offset": 482
    },
    {
      "index": 40,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "random",
      "offset": 496
    },
    {
      "index": 41,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "round",
      "offset": 503
    },
    {
      "index": 42,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 509
    },
    {
      "index": 43,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "time",
      "offset": 514
    },
    {
      "index": 44,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "pause",
      "offset": 519
    },
    {
      "index": 45,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 525
    },
    {
      "index": 46,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "payload",
      "offset": 529
    },
    {
      "index": 47,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 537
    },
    {
      "index": 48,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 539
    },
    {
      "index": 49,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "PerformanceNowUnsupported",
      "offset": 543
    },
    {
      "index": 50,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "keys",
      "offset": 569
    },
    {
      "index": 51,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "Splay tree has wrong size",
      "offset": 574
    },
    {
      "index": 52,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "Splay tree not sorted",
      "offset": 600
    },
    {
      "index": 53,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "greatest",
      "offset": 622
    },
    {
      "index": 54,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "node",
      "offset": 631
    },
    {
      "index": 55,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "removed",
      "offset": 636
    },
    {
      "index": 56,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "Key not found: ",
      "offset": 644
    },
    {
      "index": 57,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "opt_startNode",
      "offset": 660
    },
    {
      "index": 58,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "current",
      "offset": 674
    },
    {
      "index": 59,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 682
    },
    {
      "index": 60,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 689
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "dummy",
      "offset": 694
    },
    {
      "index": 62,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tmp",
      "offset": 700
    },
    {
      "index": 63,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 704
    }
  ],
  "functionHeader": {
    "offset": 706,
    "tag": "0xd",
    "remaining": 3455
  }
}
```

## 字节级差异

共发现 6 个字节差异:

- 偏移量 0x70a: TS=0xf2 vs WASM=0xda
- 偏移量 0x70c: TS=0x13 vs WASM=0x07
- 偏移量 0x70e: TS=0xda vs WASM=0xf2
- 偏移量 0x710: TS=0x07 vs WASM=0x13
- 偏移量 0x733: TS=0xe0 vs WASM=0xe1
- 偏移量 0x738: TS=0xe5 vs WASM=0xe4

## 十六进制转储对比

### TypeScript
```
00000000: 05 40 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.@T__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 73 70 6c 61 79 2e 6a 73 12 2e 2f |tane/splay.js../|
00000030: 62 61 73 65 2e 6a 73 12 42 65 6e 63 68 6d 61 72 |base.js.Benchmar|
00000040: 6b 1c 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 65 |k.BenchmarkSuite|
00000050: 16 70 65 72 66 6f 72 6d 61 6e 63 65 0a 53 70 6c |.performance.Spl|
00000060: 61 79 1c 6b 53 70 6c 61 79 54 72 65 65 53 69 7a |ay.kSplayTreeSiz|
00000070: 65 2e 6b 53 70 6c 61 79 54 72 65 65 4d 6f 64 69 |e.kSplayTreeModi|
00000080: 66 69 63 61 74 69 6f 6e 73 2c 6b 53 70 6c 61 79 |fications,kSplay|
00000090: 54 72 65 65 50 61 79 6c 6f 61 64 44 65 70 74 68 |TreePayloadDepth|
000000a0: 12 73 70 6c 61 79 54 72 65 65 28 73 70 6c 61 79 |.splayTree(splay|
000000b0: 53 61 6d 70 6c 65 54 69 6d 65 53 74 61 72 74 26 |SampleTimeStart&|
000000c0: 47 65 6e 65 72 61 74 65 50 61 79 6c 6f 61 64 54 |GeneratePayloadT|
000000d0: 72 65 65 16 47 65 6e 65 72 61 74 65 4b 65 79 18 |ree.GenerateKey.|
000000e0: 73 70 6c 61 79 53 61 6d 70 6c 65 73 2e 73 70 6c |splaySamples.spl|
000000f0: 61 79 53 75 6d 4f 66 53 71 75 61 72 65 64 50 61 |aySumOfSquaredPa|
00000100: 75 73 65 73 10 53 70 6c 61 79 52 4d 53 20 53 70 |uses.SplayRMS Sp|
00000110: 6c 61 79 55 70 64 61 74 65 53 74 61 74 73 1a 49 |layUpdateStats.I|
00000120: 6e 73 65 72 74 4e 65 77 4e 6f 64 65 14 53 70 6c |nsertNewNode.Spl|
00000130: 61 79 53 65 74 75 70 1a 53 70 6c 61 79 54 65 61 |aySetup.SplayTea|
00000140: 72 44 6f 77 6e 10 53 70 6c 61 79 52 75 6e 12 53 |rDown.SplayRun.S|
00000150: 70 6c 61 79 54 72 65 65 0a 72 6f 6f 74 5f 0e 69 |playTree.root_.i|
00000160: 73 45 6d 70 74 79 0c 69 6e 73 65 72 74 0c 72 65 |sEmpty.insert.re|
00000170: 6d 6f 76 65 08 66 69 6e 64 0e 66 69 6e 64 4d 61 |move.find.findMa|
00000180: 78 28 66 69 6e 64 47 72 65 61 74 65 73 74 4c 65 |x(findGreatestLe|
00000190: 73 73 54 68 61 6e 14 65 78 70 6f 72 74 4b 65 79 |ssThan.exportKey|
000001a0: 73 0c 73 70 6c 61 79 5f 08 4e 6f 64 65 08 6c 65 |s.splay_.Node.le|
000001b0: 66 74 0a 72 69 67 68 74 12 74 72 61 76 65 72 73 |ft.right.travers|
000001c0: 65 5f 0a 64 65 70 74 68 06 74 61 67 0a 61 72 72 |e_.depth.tag.arr|
000001d0: 61 79 1e 53 74 72 69 6e 67 20 66 6f 72 20 6b 65 |ay.String for ke|
000001e0: 79 20 1a 20 69 6e 20 6c 65 61 66 20 6e 6f 64 65 |y . in leaf node|
000001f0: 0c 72 61 6e 64 6f 6d 0a 72 6f 75 6e 64 08 73 71 |.random.round.sq|
00000200: 72 74 08 74 69 6d 65 0a 70 61 75 73 65 06 6b 65 |rt.time.pause.ke|
00000210: 79 0e 70 61 79 6c 6f 61 64 02 69 06 6e 6f 77 32 |y.payload.i.now2|
00000220: 50 65 72 66 6f 72 6d 61 6e 63 65 4e 6f 77 55 6e |PerformanceNowUn|
00000230: 73 75 70 70 6f 72 74 65 64 08 6b 65 79 73 32 53 |supported.keys2S|
00000240: 70 6c 61 79 20 74 72 65 65 20 68 61 73 20 77 72 |play tree has wr|
00000250: 6f 6e 67 20 73 69 7a 65 2a 53 70 6c 61 79 20 74 |ong size*Splay t|
00000260: 72 65 65 20 6e 6f 74 20 73 6f 72 74 65 64 10 67 |ree not sorted.g|
00000270: 72 65 61 74 65 73 74 08 6e 6f 64 65 0e 72 65 6d |reatest.node.rem|
00000280: 6f 76 65 64 1e 4b 65 79 20 6e 6f 74 20 66 6f 75 |oved.Key not fou|
00000290: 6e 64 3a 20 1a 6f 70 74 5f 73 74 61 72 74 4e 6f |nd: .opt_startNo|
000002a0: 64 65 0e 63 75 72 72 65 6e 74 0c 72 65 73 75 6c |de.current.resul|
000002b0: 74 08 70 75 73 68 0a 64 75 6d 6d 79 06 74 6d 70 |t.push.dummy.tmp|
000002c0: 02 66 0d c8 03 01 ca 03 02 00 00 03 00 00 cc 03 |.f..............|
000002d0: 00 01 00 ce 03 00 02 00 d0 03 00 00 0c 20 06 01 |............. ..|
000002e0: a4 01 00 00 00 0e 14 13 d6 02 00 cc 03 00 0c ce |................|
000002f0: 03 01 0c d0 03 02 0c d2 03 00 01 d4 03 01 01 d6 |................|
00000300: 03 02 01 d8 03 03 01 da 03 04 01 dc 03 05 01 de |................|
00000310: 03 06 01 e0 03 07 01 e2 03 08 01 e4 03 09 01 e6 |................|
00000320: 03 0a 01 e8 03 0b 01 ea 03 0c 01 ec 03 0d 01 ee |................|
00000330: 03 0e 01 f0 03 0f 01 f2 03 10 01 08 ec 2f c2 00 |............./..|
00000340: 61 09 00 c2 01 61 0a 00 c2 02 61 0d 00 c2 03 61 |a....a....a....a|
00000350: 0e 00 c2 04 61 0f 00 c2 05 61 10 00 c2 06 61 11 |....a....a....a.|
00000360: 00 c2 07 61 12 00 c2 08 61 13 00 29 68 01 00 11 |...a....a..)h...|
00000370: 04 e9 00 00 00 01 53 3e 01 00 01 3a cd 29 00 26 |......S>...:.).&|
00000380: 02 00 68 00 00 11 04 e9 00 00 00 0a 09 c0 78 05 |..h...........x.|
00000390: 60 12 00 60 10 00 60 11 00 60 0d 00 21 08 00 26 |`..`..`..`..!..&|
000003a0: 01 00 21 03 00 e6 c0 40 1f 61 04 00 bf 50 61 05 |..!....@.a...Pa.|
000003b0: 00 bc 61 06 00 07 61 07 00 b7 61 08 00 b7 61 0b |..a...a...a...a.|
000003c0: 00 b7 61 0c 00 60 13 00 42 3d 00 00 00 07 44 fa |..a..`..B=....D.|
000003d0: 00 00 00 60 13 00 42 3d 00 00 00 c2 09 44 fb 00 |...`..B=.....D..|
000003e0: 00 00 60 13 00 42 3d 00 00 00 c2 0a 44 fc 00 00 |..`..B=.....D...|
000003f0: 00 60 13 00 42 3d 00 00 00 c2 0b 44 fd 00 00 00 |.`..B=.....D....|
00000400: 60 13 00 42 3d 00 00 00 c2 0c 44 fe 00 00 00 60 |`..B=.....D....`|
00000410: 13 00 42 3d 00 00 00 c2 0d 44 ff 00 00 00 60 13 |..B=.....D....`.|
00000420: 00 42 3d 00 00 00 c2 0e 44 00 01 00 00 60 13 00 |.B=.....D....`..|
00000430: 42 3d 00 00 00 c2 0f 44 01 01 00 00 60 13 00 42 |B=.....D....`..B|
00000440: 3d 00 00 00 c2 10 44 02 01 00 00 60 13 00 c2 11 |=.....D....`....|
00000450: 44 03 01 00 00 60 13 00 42 03 01 00 00 42 3d 00 |D....`..B....B=.|
00000460: 00 00 07 44 04 01 00 00 60 13 00 42 03 01 00 00 |...D....`..B....|
00000470: 42 3d 00 00 00 07 44 05 01 00 00 60 13 00 42 03 |B=....D....`..B.|
00000480: 01 00 00 42 3d 00 00 00 c2 12 44 06 01 00 00 06 |...B=.....D.....|
00000490: 2f c8 03 83 01 00 00 00 31 44 20 71 0f 48 4c 11 |/.......1D q.HL.|
000004a0: 14 11 18 11 1e 11 83 01 1f 1a 00 23 e2 01 3b 11 |...........#..;.|
000004b0: 12 1b 14 00 06 08 25 11 12 1b 14 00 07 16 25 11 |......%.......%.|
000004c0: 12 1b 14 00 07 40 25 11 12 1b 14 00 07 3c 25 11 |.....@%......<%.|
000004d0: 12 1b 14 00 07 14 25 11 12 1b 14 00 07 1c 25 11 |......%.......%.|
000004e0: 12 1b 14 00 07 2c 25 11 12 1b 14 00 07 22 25 11 |.....,%......"%.|
000004f0: 12 1b 14 00 07 88 01 25 11 12 00 07 0e 11 11 12 |.......%........|
00000500: 1b 0a 1b 14 00 06 08 2f 11 12 1b 0a 1b 14 00 06 |......./........|
00000510: 10 2f 11 12 1b 0a 1b 14 00 0c 43 06 01 de 03 02 |./........C.....|
00000520: 00 02 0b 01 00 45 02 8e 04 00 01 00 90 04 00 01 |.....E..........|
00000530: 00 de 03 09 00 d3 b7 ab ec 29 0b b7 b8 b9 ba bb |.........)......|
00000540: bc bd be bf 08 bf 09 26 0a 00 4e 09 01 00 00 04 |.......&..N.....|
00000550: 0a 01 00 00 d4 9f 04 0b 01 00 00 9f 4e 4a 00 00 |............NJ..|
00000560: 00 28 0b df d3 b8 a0 d4 f2 4e 04 01 00 00 df d3 |.(.......N......|
00000570: b8 a0 d4 f2 4e 05 01 00 00 28 c8 03 2a 2b 00 03 |....N....(..*+..|
00000580: 10 0c 0c 96 34 07 03 20 0c 00 06 03 47 00 02 0e |....4.. ....G...|
00000590: 14 07 28 0c 0c 07 0a 07 17 21 23 07 28 0c 0c 07 |..(......!#.(...|
000005a0: 0a 07 17 00 06 03 3b 00 0c 43 06 01 e0 03 00 00 |......;..C......|
000005b0: 00 02 00 00 0d 00 39 a5 00 00 00 43 0c 01 00 00 |......9....C....|
000005c0: 25 00 00 c8 03 08 39 00 05 16 1b 08 1b 15 00 0c |%.....9.........|
000005d0: 43 06 01 e6 03 00 00 00 06 02 00 21 00 e4 03 0c |C..........!....|
000005e0: 00 e2 03 0b 00 39 a5 00 00 00 43 0d 01 00 00 39 |.....9....C....9|
000005f0: a5 00 00 00 43 0e 01 00 00 df e0 9d 24 01 00 c0 |....C.......$...|
00000600: 10 27 9c 25 01 00 c8 03 17 40 00 03 16 1b 08 1b |.'.%.....@......|
00000610: 0e 1b 08 1b 0c 07 34 07 03 07 31 20 52 07 87 01 |......4...1 R...|
00000620: 00 0c 43 06 01 e8 03 01 01 01 03 03 00 10 02 9e |..C.............|
00000630: 04 00 01 00 a0 04 00 00 00 dc 03 08 00 e2 03 0b |................|
00000640: 00 e4 03 0c 00 d3 df a0 cb d3 e3 e0 91 e4 e1 c7 |................|
00000650: c7 9c 9f e5 29 c8 03 18 43 00 03 20 07 0e 07 03 |....)...C.. ....|
00000660: 0d 0c 0d 2d 07 18 0d 17 07 36 07 10 07 03 07 11 |...-.....6......|
00000670: 00 0c 43 06 01 ea 03 00 02 00 04 04 00 2a 02 a2 |..C..........*..|
00000680: 04 00 00 00 a4 04 00 01 00 e0 03 0a 00 da 03 07 |................|
00000690: 00 de 03 09 00 d8 03 06 00 df f0 cb e0 43 fe 00 |.............C..|
000006a0: 00 00 c7 24 01 00 07 ac ed f0 e1 e2 39 a1 00 00 |...$........9...|
000006b0: 00 c7 f1 f2 cc e0 43 fc 00 00 00 c7 c8 24 02 00 |......C......$..|
000006c0: 0e c7 28 c8 03 2c 49 00 00 00 08 1c 07 16 0d 17 |..(..,I.........|
000006d0: 07 12 1b 0c 07 01 16 0c 12 1d 07 28 07 30 1b 0e |...........(.0..|
000006e0: 07 01 07 3d 0d 41 07 12 1b 10 07 0a 07 0b 17 11 |...=.A..........|
000006f0: 07 0d 00 0c 43 06 01 ec 03 00 01 00 03 07 00 51 |....C..........Q|
00000700: 01 a6 04 00 00 00 d0 03 02 0c f2 03 13 00 da 03 |................|
00000710: 07 00 dc 03 08 00 d4 03 04 00 ea 03 0f 00 e8 03 |................|
00000720: 0e 00 68 00 00 42 14 01 00 00 98 ec 07 04 15 01 |..h..B..........|
00000730: 00 00 30 e0 11 21 00 00 e5 68 00 00 43 14 01 00 |..0..!...h..C...|
00000740: 00 24 00 00 e6 b7 cb c7 60 04 00 a5 ec 25 60 05 |.$......`....%`.|
00000750: 00 f0 0e c7 b8 9f bf 14 9e bf 13 ab ec 11 60 06 |..............`.|
00000760: 00 68 00 00 43 14 01 00 00 24 00 00 f1 0e 95 00 |.h..C....$......|
00000770: ee d6 29 c8 03 32 53 00 05 12 11 16 44 17 09 18 |..)..2S.....D...|
00000780: 0c 12 17 03 11 16 1b 08 21 2b 07 08 11 03 12 1b |........!+......|
00000790: 11 1a 0d 0f 0c 04 11 0a 11 0a 12 19 11 22 11 16 |............."..|
000007a0: 1b 08 11 1f 00 02 05 1a 00 0c 43 06 01 ee 03 00 |..........C.....|
000007b0: 03 00 04 04 00 4e 03 ac 04 00 00 00 60 00 01 00 |.....N......`...|
000007c0: a6 04 00 02 00 da 03 07 00 e2 03 0b 00 e4 03 0c |................|
000007d0: 00 d4 03 04 00 df 43 01 01 00 00 24 00 00 cb 07 |......C....$....|
000007e0: e3 b7 e4 b7 e5 c7 eb d0 e2 ac ec 10 39 9f 00 00 |............9...|
000007f0: 00 11 04 17 01 00 00 21 01 00 30 b7 cd c9 c8 b8 |.......!..0.....|
00000800: a0 a5 ec 1f c7 c9 48 c7 c9 b8 9f 48 a8 ec 10 39 |......H....H...9|
00000810: 9f 00 00 00 11 04 18 01 00 00 21 01 00 30 95 02 |..........!..0..|
00000820: ee dc 29 c8 03 42 62 00 00 00 08 1e 07 12 1b 16 |..)..Bb.........|
00000830: 17 3d 0d 00 0d 00 0e 1a 07 08 08 19 07 14 07 05 |.=..............|
00000840: 12 06 39 0a 11 1d 14 18 07 08 0c 0e 07 11 12 13 |..9.............|
00000850: 07 0a 07 01 07 0e 07 0a 0c 04 07 05 07 0d 12 04 |................|
00000860: 39 0a 11 1d 00 01 03 32 00 0c 43 06 01 f0 03 00 |9......2..C.....|
00000870: 03 00 03 05 00 48 03 a6 04 00 00 00 a2 04 00 01 |.....H..........|
00000880: 00 b2 04 00 02 00 d6 03 05 00 ea 03 0f 00 da 03 |................|
00000890: 07 00 e8 03 0e 00 d0 03 02 0c b7 cb c7 df a5 ec |................|
000008a0: 34 e0 f0 cc e1 43 00 01 00 00 c8 24 01 00 d1 07 |4....C.....$....|
000008b0: ab ec 0e e1 43 fd 00 00 00 c8 24 01 00 0e ee 11 |....C.....$.....|
000008c0: e1 43 fd 00 00 00 c9 42 11 01 00 00 24 01 00 0e |.C.....B....$...|
000008d0: 95 00 ee c9 e2 68 04 00 43 14 01 00 00 24 00 00 |.....h..C....$..|
000008e0: f1 29 c8 03 3a 76 00 0e 28 07 08 07 03 12 07 07 |.)..:v..(.......|
000008f0: 1a 0d 0f 07 12 1b 2c 07 01 12 51 0c 12 12 11 07 |......,...Q.....|
00000900: 12 1b 10 07 01 22 1f 07 12 1b 10 07 10 1b 11 00 |....."..........|
00000910: 04 0b 2c 00 04 10 5b 07 22 11 16 1b 08 11 1f 00 |..,...[.".......|
00000920: 0c 43 06 01 f2 03 00 00 00 00 00 00 01 00 29 c8 |.C............).|
00000930: 03 03 8a 01 00 00 0c 43 06 01 00 00 01 00 01 00 |.......C........|
00000940: 00 0a 01 10 00 01 00 08 cb c7 42 fa 00 00 00 98 |..........B.....|
00000950: 28 c8 03 07 97 01 1e 12 1b 20 17 00 0c 43 06 01 |(........ ...C..|
00000960: 00 02 02 02 05 01 00 b3 01 04 a2 04 00 01 00 84 |................|
00000970: 01 00 01 00 b4 04 00 00 00 10 00 01 00 f2 03 13 |................|
00000980: 00 08 cc c8 43 fb 00 00 00 24 00 00 ec 14 c8 df |....C....$......|
00000990: 42 03 01 00 00 11 d3 d4 21 02 00 44 fa 00 00 00 |B.......!..D....|
000009a0: 29 c8 43 02 01 00 00 d3 24 01 00 0e c8 42 fa 00 |).C.....$....B..|
000009b0: 00 00 42 11 01 00 00 d3 ab ec 02 29 df 42 03 01 |..B........).B..|
000009c0: 00 00 11 d3 d4 21 02 00 cb d3 c8 42 fa 00 00 00 |.....!.....B....|
000009d0: 42 11 01 00 00 a7 ec 2c c7 c8 42 fa 00 00 00 44 |B......,..B....D|
000009e0: 04 01 00 00 c7 c8 42 fa 00 00 00 42 05 01 00 00 |......B....B....|
000009f0: 44 05 01 00 00 c8 42 fa 00 00 00 07 44 05 01 00 |D.....B.....D...|
00000a00: 00 ee 2a c7 c8 42 fa 00 00 00 44 05 01 00 00 c7 |..*..B....D.....|
00000a10: c8 42 fa 00 00 00 42 04 01 00 00 44 04 01 00 00 |.B....B....D....|
00000a20: c8 42 fa 00 00 00 07 44 04 01 00 00 c8 c7 44 fa |.B.....D......D.|
00000a30: 00 00 00 29 c8 03 67 a2 01 1d 12 21 1b 10 1c 17 |...)..g....!....|
00000a40: 07 22 07 12 20 0c 07 0a 07 0b 2b 3d 00 01 08 07 |.".. .....+=....|
00000a50: 07 08 1b 10 07 01 1c 05 1b 0c 1b 10 07 05 12 1d |................|
00000a60: 09 16 07 12 20 0c 07 0a 07 0b 17 31 0c 14 1b 0c |.... ......1....|
00000a70: 1b 17 12 07 07 08 07 18 35 1f 07 08 07 1a 1b 0c |........5.......|
00000a80: 35 2d 07 08 1b 0c 2d 13 07 08 07 1a 35 21 07 08 |5-....-.....5!..|
00000a90: 07 18 1b 0c 35 2b 07 08 1b 0c 22 1b 07 1a 00 0c |....5+....".....|
00000aa0: 43 06 01 00 01 03 01 03 00 00 a1 01 04 a2 04 00 |C...............|
00000ab0: 01 00 b6 04 00 00 00 8a 04 00 01 00 10 00 01 00 |................|
00000ac0: 08 cd c9 43 fb 00 00 00 24 00 00 ec 0f 39 9f 00 |...C....$....9..|
00000ad0: 00 00 04 1c 01 00 00 d3 9f f1 30 c9 43 02 01 00 |..........0.C...|
00000ae0: 00 d3 24 01 00 0e c9 42 fa 00 00 00 42 11 01 00 |..$....B....B...|
00000af0: 00 d3 ac ec 0f 39 9f 00 00 00 04 1c 01 00 00 d3 |.....9..........|
00000b00: 9f f1 30 c9 42 fa 00 00 00 cb c9 42 fa 00 00 00 |..0.B......B....|
00000b10: 42 04 01 00 00 98 ec 14 c9 c9 42 fa 00 00 00 42 |B.........B....B|
00000b20: 05 01 00 00 44 fa 00 00 00 ee 35 c9 42 fa 00 00 |....D.....5.B...|
00000b30: 00 42 05 01 00 00 cc c9 c9 42 fa 00 00 00 42 04 |.B.......B....B.|
00000b40: 01 00 00 44 fa 00 00 00 c9 43 02 01 00 00 d3 24 |...D.....C.....$|
00000b50: 01 00 0e c9 42 fa 00 00 00 c8 44 05 01 00 00 c7 |....B.....D.....|
00000b60: 28 c8 03 57 c2 01 1d 12 21 1b 10 1c 0b 34 34 07 |(..W....!....44.|
00000b70: 03 07 25 07 15 09 07 07 08 1b 10 07 01 1c 05 1b |..%.............|
00000b80: 0c 1b 10 07 05 12 11 34 34 07 03 07 25 07 15 0e |.......44...%...|
00000b90: 1c 26 11 1b 0c 2b 15 07 08 07 1a 1b 0c 46 0d 1b |.&...+.......F..|
00000ba0: 0c 21 2b 07 08 07 1a 1b 0c 36 2d 07 08 1b 10 07 |.!+......6-.....|
00000bb0: 01 19 15 07 08 1b 1e 22 1f 07 0d 00 0c 43 06 01 |.......".....C..|
00000bc0: 00 01 01 01 03 00 00 32 02 a2 04 00 01 00 10 00 |.......2........|
00000bd0: 01 00 08 cb c7 43 fb 00 00 00 24 00 00 ec 03 07 |.....C....$.....|
00000be0: 28 c7 43 02 01 00 00 d3 24 01 00 0e c7 42 fa 00 |(.C.....$....B..|
00000bf0: 00 00 42 11 01 00 00 d3 ab ec 08 c7 42 fa 00 00 |..B.........B...|
00000c00: 00 28 07 28 c8 03 1d e0 01 1b 12 1d 1b 10 21 17 |.(.(..........!.|
00000c10: 09 07 07 08 1b 10 07 01 1c 00 1b 0c 1b 10 07 05 |................|
00000c20: 16 1a 25 45 00 0c 43 06 01 00 01 02 01 02 00 00 |..%E..C.........|
00000c30: 2e 03 ba 04 00 01 00 bc 04 00 00 00 10 00 01 00 |................|
00000c40: 08 cc c8 43 fb 00 00 00 24 00 00 ec 03 07 28 d3 |...C....$.....(.|
00000c50: 11 ed 08 0e c8 42 fa 00 00 00 cb c7 42 05 01 00 |.....B......B...|
00000c60: 00 ec 0a c7 42 05 01 00 00 cb ee f0 c7 28 c8 03 |....B........(..|
00000c70: 19 ea 01 1e 12 23 1b 10 21 17 09 14 20 2a 21 37 |.....#..!... *!7|
00000c80: 07 0e 26 00 07 0e 2c 1b 07 0d 00 0c 43 06 01 00 |..&...,.....C...|
00000c90: 01 01 01 03 00 00 53 02 a2 04 00 01 00 10 00 01 |......S.........|
00000ca0: 00 08 cb c7 43 fb 00 00 00 24 00 00 ec 03 07 28 |....C....$.....(|
00000cb0: c7 43 02 01 00 00 d3 24 01 00 0e c7 42 fa 00 00 |.C.....$....B...|
00000cc0: 00 42 11 01 00 00 d3 a5 ec 08 c7 42 fa 00 00 00 |.B.........B....|
00000cd0: 28 c7 42 fa 00 00 00 42 04 01 00 00 ec 15 c7 43 |(.B....B.......C|
00000ce0: ff 00 00 00 c7 42 fa 00 00 00 42 04 01 00 00 25 |.....B....B....%|
00000cf0: 01 00 07 28 c8 03 2d f8 01 2b 12 3d 1b 10 21 17 |...(..-..+.=..!.|
00000d00: 00 01 08 07 07 08 1b 10 07 01 1e 05 1b 0c 1b 0e |................|
00000d10: 07 03 17 07 1b 15 0e 12 1b 0c 2b 07 20 1a 1b 0c |..........+. ...|
00000d20: 1b 3b 19 00 00 0c 43 06 01 00 00 02 00 03 00 01 |.;....C.........|
00000d30: 25 02 be 04 00 00 40 10 00 01 00 08 cc 26 00 00 |%.....@......&..|
00000d40: cb c8 43 fb 00 00 00 24 00 00 98 ec 12 c8 42 fa |..C....$......B.|
00000d50: 00 00 00 43 06 01 00 00 c2 00 24 01 00 0e c7 28 |...C......$....(|
00000d60: c8 03 13 8e 02 21 27 27 1b 10 21 19 07 08 1b 0c |.....!''..!.....|
00000d70: 25 14 18 21 07 0d 00 0c 43 06 01 00 01 00 01 03 |%..!....C.......|
00000d80: 01 00 10 01 b4 04 00 01 00 be 04 00 01 df 43 20 |..............C |
00000d90: 01 00 00 d3 42 11 01 00 00 24 01 00 29 c8 03 0d |....B....$..)...|
00000da0: 91 02 1d 02 24 07 0c 1b 0c 07 08 1b 09 00 0c 43 |....$..........C|
00000db0: 06 01 00 01 06 01 04 01 00 9c 02 07 a2 04 00 01 |................|
00000dc0: 00 c2 04 00 00 00 88 04 00 01 00 8a 04 00 02 00 |................|
00000dd0: bc 04 00 03 00 c4 04 00 04 00 10 00 01 00 f2 03 |................|
00000de0: 13 00 08 c5 05 c4 05 43 fb 00 00 00 24 00 00 ec |.......C....$...|
00000df0: 02 29 df 42 03 01 00 00 11 07 07 21 02 00 d1 d0 |.).B.......!....|
00000e00: cb c4 05 42 fa 00 00 00 ce d3 ca 42 11 01 00 00 |...B.......B....|
00000e10: a5 ec 56 ca 42 04 01 00 00 98 6d aa 00 00 00 d3 |..V.B.....m.....|
00000e20: ca 42 04 01 00 00 42 11 01 00 00 a5 ec 29 ca 42 |.B....B......).B|
00000e30: 04 01 00 00 c5 04 ca c4 04 42 05 01 00 00 44 04 |.........B....D.|
00000e40: 01 00 00 c4 04 ca 44 05 01 00 00 c4 04 d2 42 04 |......D.......B.|
00000e50: 01 00 00 98 ed 70 c9 ca 44 04 01 00 00 ca cd ca |.....p..D.......|
00000e60: 42 04 01 00 00 ce ee a2 d3 ca 42 11 01 00 00 a7 |B.........B.....|
00000e70: ec 54 ca 42 05 01 00 00 98 ed 4b d3 ca 42 05 01 |.T.B......K..B..|
00000e80: 00 00 42 11 01 00 00 a7 ec 29 ca 42 05 01 00 00 |..B......).B....|
00000e90: c5 04 ca c4 04 42 04 01 00 00 44 05 01 00 00 c4 |.....B....D.....|
00000ea0: 04 ca 44 04 01 00 00 c4 04 d2 42 05 01 00 00 98 |..D.......B.....|
00000eb0: ed 14 c8 ca 44 05 01 00 00 ca cc ca 42 05 01 00 |....D.......B...|
00000ec0: 00 ce ef 46 ff c8 ca 42 04 01 00 00 44 05 01 00 |...F...B....D...|
00000ed0: 00 c9 ca 42 05 01 00 00 44 04 01 00 00 ca c7 42 |...B....D......B|
00000ee0: 05 01 00 00 44 04 01 00 00 ca c7 42 04 01 00 00 |....D......B....|
00000ef0: 44 05 01 00 00 c4 05 ca 44 fa 00 00 00 29 c8 03 |D.......D....)..|
00000f00: 99 01 9f 02 1d 1c 21 1b 10 1c 17 00 01 10 2e 07 |......!.........|
00000f10: 12 2a 0a 2b 2d 22 13 07 0c 07 0e 1b 11 12 02 07 |.*.+-"..........|
00000f20: 0e 3c 0f 07 0c 07 0e 1b 0a 1b 1b 13 0c 07 0e 26 |.<.............&|
00000f30: 21 07 1e 0c 06 35 23 0c 18 21 03 12 04 00 08 0a |!....5#..!......|
00000f40: 1f 07 1a 21 09 0d 04 07 0e 2c 17 07 0c 07 0e 1b |...!.....,......|
00000f50: 11 12 07 07 0e 2d 0f 07 0c 07 0e 1b 0c 1b 1d 13 |.....-..........|
00000f60: 0c 07 0e 26 21 07 20 0c 06 35 25 0c 16 21 01 12 |...&!. ..5%..!..|
00000f70: 04 00 08 0a 1f 07 1a 21 0b 0d 06 07 0e 00 09 0e |.......!........|
00000f80: 31 07 1a 07 0e 35 27 07 1a 07 0e 35 27 07 1e 07 |1....5'....5'...|
00000f90: 0a 35 27 07 20 07 0a 35 29 0c 1a 00 0c 43 06 01 |.5'. ..5)....C..|
00000fa0: 00 02 01 02 02 00 00 11 03 a2 04 00 01 00 84 01 |................|
00000fb0: 00 01 00 10 00 01 00 08 cb c7 d3 44 11 01 00 00 |...........D....|
00000fc0: c7 d4 44 42 00 00 00 29 c8 03 0b e3 02 11 0d 19 |..DB...)........|
00000fd0: 07 16 21 15 07 1a 00 0c 43 06 01 00 01 03 01 03 |..!.....C.......|
00000fe0: 00 00 29 04 c6 04 00 01 00 bc 04 00 00 00 88 04 |..).............|
00000ff0: 00 01 00 10 00 01 00 08 cd c9 cb c7 ec 22 c7 42 |.............".B|
00001000: 04 01 00 00 d0 ec 0c c8 43 06 01 00 00 d3 24 01 |........C.....$.|
00001010: 00 0e d3 c7 f1 0e c7 42 05 01 00 00 cb ee dd 29 |.......B.......)|
00001020: c8 03 1d f6 02 25 18 33 12 10 07 0e 1c 1b 12 00 |.....%.3........|
00001030: 07 08 1b 16 07 01 17 23 07 04 07 01 0d 12 07 0e |.......#........|
00001040: 00                                              |.|
```

### WASM
```
00000000: 05 40 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.@T__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 73 70 6c 61 79 2e 6a 73 12 2e 2f |tane/splay.js../|
00000030: 62 61 73 65 2e 6a 73 12 42 65 6e 63 68 6d 61 72 |base.js.Benchmar|
00000040: 6b 1c 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 65 |k.BenchmarkSuite|
00000050: 16 70 65 72 66 6f 72 6d 61 6e 63 65 0a 53 70 6c |.performance.Spl|
00000060: 61 79 1c 6b 53 70 6c 61 79 54 72 65 65 53 69 7a |ay.kSplayTreeSiz|
00000070: 65 2e 6b 53 70 6c 61 79 54 72 65 65 4d 6f 64 69 |e.kSplayTreeModi|
00000080: 66 69 63 61 74 69 6f 6e 73 2c 6b 53 70 6c 61 79 |fications,kSplay|
00000090: 54 72 65 65 50 61 79 6c 6f 61 64 44 65 70 74 68 |TreePayloadDepth|
000000a0: 12 73 70 6c 61 79 54 72 65 65 28 73 70 6c 61 79 |.splayTree(splay|
000000b0: 53 61 6d 70 6c 65 54 69 6d 65 53 74 61 72 74 26 |SampleTimeStart&|
000000c0: 47 65 6e 65 72 61 74 65 50 61 79 6c 6f 61 64 54 |GeneratePayloadT|
000000d0: 72 65 65 16 47 65 6e 65 72 61 74 65 4b 65 79 18 |ree.GenerateKey.|
000000e0: 73 70 6c 61 79 53 61 6d 70 6c 65 73 2e 73 70 6c |splaySamples.spl|
000000f0: 61 79 53 75 6d 4f 66 53 71 75 61 72 65 64 50 61 |aySumOfSquaredPa|
00000100: 75 73 65 73 10 53 70 6c 61 79 52 4d 53 20 53 70 |uses.SplayRMS Sp|
00000110: 6c 61 79 55 70 64 61 74 65 53 74 61 74 73 1a 49 |layUpdateStats.I|
00000120: 6e 73 65 72 74 4e 65 77 4e 6f 64 65 14 53 70 6c |nsertNewNode.Spl|
00000130: 61 79 53 65 74 75 70 1a 53 70 6c 61 79 54 65 61 |aySetup.SplayTea|
00000140: 72 44 6f 77 6e 10 53 70 6c 61 79 52 75 6e 12 53 |rDown.SplayRun.S|
00000150: 70 6c 61 79 54 72 65 65 0a 72 6f 6f 74 5f 0e 69 |playTree.root_.i|
00000160: 73 45 6d 70 74 79 0c 69 6e 73 65 72 74 0c 72 65 |sEmpty.insert.re|
00000170: 6d 6f 76 65 08 66 69 6e 64 0e 66 69 6e 64 4d 61 |move.find.findMa|
00000180: 78 28 66 69 6e 64 47 72 65 61 74 65 73 74 4c 65 |x(findGreatestLe|
00000190: 73 73 54 68 61 6e 14 65 78 70 6f 72 74 4b 65 79 |ssThan.exportKey|
000001a0: 73 0c 73 70 6c 61 79 5f 08 4e 6f 64 65 08 6c 65 |s.splay_.Node.le|
000001b0: 66 74 0a 72 69 67 68 74 12 74 72 61 76 65 72 73 |ft.right.travers|
000001c0: 65 5f 0a 64 65 70 74 68 06 74 61 67 0a 61 72 72 |e_.depth.tag.arr|
000001d0: 61 79 1e 53 74 72 69 6e 67 20 66 6f 72 20 6b 65 |ay.String for ke|
000001e0: 79 20 1a 20 69 6e 20 6c 65 61 66 20 6e 6f 64 65 |y . in leaf node|
000001f0: 0c 72 61 6e 64 6f 6d 0a 72 6f 75 6e 64 08 73 71 |.random.round.sq|
00000200: 72 74 08 74 69 6d 65 0a 70 61 75 73 65 06 6b 65 |rt.time.pause.ke|
00000210: 79 0e 70 61 79 6c 6f 61 64 02 69 06 6e 6f 77 32 |y.payload.i.now2|
00000220: 50 65 72 66 6f 72 6d 61 6e 63 65 4e 6f 77 55 6e |PerformanceNowUn|
00000230: 73 75 70 70 6f 72 74 65 64 08 6b 65 79 73 32 53 |supported.keys2S|
00000240: 70 6c 61 79 20 74 72 65 65 20 68 61 73 20 77 72 |play tree has wr|
00000250: 6f 6e 67 20 73 69 7a 65 2a 53 70 6c 61 79 20 74 |ong size*Splay t|
00000260: 72 65 65 20 6e 6f 74 20 73 6f 72 74 65 64 10 67 |ree not sorted.g|
00000270: 72 65 61 74 65 73 74 08 6e 6f 64 65 0e 72 65 6d |reatest.node.rem|
00000280: 6f 76 65 64 1e 4b 65 79 20 6e 6f 74 20 66 6f 75 |oved.Key not fou|
00000290: 6e 64 3a 20 1a 6f 70 74 5f 73 74 61 72 74 4e 6f |nd: .opt_startNo|
000002a0: 64 65 0e 63 75 72 72 65 6e 74 0c 72 65 73 75 6c |de.current.resul|
000002b0: 74 08 70 75 73 68 0a 64 75 6d 6d 79 06 74 6d 70 |t.push.dummy.tmp|
000002c0: 02 66 0d c8 03 01 ca 03 02 00 00 03 00 00 cc 03 |.f..............|
000002d0: 00 01 00 ce 03 00 02 00 d0 03 00 00 0c 20 06 01 |............. ..|
000002e0: a4 01 00 00 00 0e 14 13 d6 02 00 cc 03 00 0c ce |................|
000002f0: 03 01 0c d0 03 02 0c d2 03 00 01 d4 03 01 01 d6 |................|
00000300: 03 02 01 d8 03 03 01 da 03 04 01 dc 03 05 01 de |................|
00000310: 03 06 01 e0 03 07 01 e2 03 08 01 e4 03 09 01 e6 |................|
00000320: 03 0a 01 e8 03 0b 01 ea 03 0c 01 ec 03 0d 01 ee |................|
00000330: 03 0e 01 f0 03 0f 01 f2 03 10 01 08 ec 2f c2 00 |............./..|
00000340: 61 09 00 c2 01 61 0a 00 c2 02 61 0d 00 c2 03 61 |a....a....a....a|
00000350: 0e 00 c2 04 61 0f 00 c2 05 61 10 00 c2 06 61 11 |....a....a....a.|
00000360: 00 c2 07 61 12 00 c2 08 61 13 00 29 68 01 00 11 |...a....a..)h...|
00000370: 04 e9 00 00 00 01 53 3e 01 00 01 3a cd 29 00 26 |......S>...:.).&|
00000380: 02 00 68 00 00 11 04 e9 00 00 00 0a 09 c0 78 05 |..h...........x.|
00000390: 60 12 00 60 10 00 60 11 00 60 0d 00 21 08 00 26 |`..`..`..`..!..&|
000003a0: 01 00 21 03 00 e6 c0 40 1f 61 04 00 bf 50 61 05 |..!....@.a...Pa.|
000003b0: 00 bc 61 06 00 07 61 07 00 b7 61 08 00 b7 61 0b |..a...a...a...a.|
000003c0: 00 b7 61 0c 00 60 13 00 42 3d 00 00 00 07 44 fa |..a..`..B=....D.|
000003d0: 00 00 00 60 13 00 42 3d 00 00 00 c2 09 44 fb 00 |...`..B=.....D..|
000003e0: 00 00 60 13 00 42 3d 00 00 00 c2 0a 44 fc 00 00 |..`..B=.....D...|
000003f0: 00 60 13 00 42 3d 00 00 00 c2 0b 44 fd 00 00 00 |.`..B=.....D....|
00000400: 60 13 00 42 3d 00 00 00 c2 0c 44 fe 00 00 00 60 |`..B=.....D....`|
00000410: 13 00 42 3d 00 00 00 c2 0d 44 ff 00 00 00 60 13 |..B=.....D....`.|
00000420: 00 42 3d 00 00 00 c2 0e 44 00 01 00 00 60 13 00 |.B=.....D....`..|
00000430: 42 3d 00 00 00 c2 0f 44 01 01 00 00 60 13 00 42 |B=.....D....`..B|
00000440: 3d 00 00 00 c2 10 44 02 01 00 00 60 13 00 c2 11 |=.....D....`....|
00000450: 44 03 01 00 00 60 13 00 42 03 01 00 00 42 3d 00 |D....`..B....B=.|
00000460: 00 00 07 44 04 01 00 00 60 13 00 42 03 01 00 00 |...D....`..B....|
00000470: 42 3d 00 00 00 07 44 05 01 00 00 60 13 00 42 03 |B=....D....`..B.|
00000480: 01 00 00 42 3d 00 00 00 c2 12 44 06 01 00 00 06 |...B=.....D.....|
00000490: 2f c8 03 83 01 00 00 00 31 44 20 71 0f 48 4c 11 |/.......1D q.HL.|
000004a0: 14 11 18 11 1e 11 83 01 1f 1a 00 23 e2 01 3b 11 |...........#..;.|
000004b0: 12 1b 14 00 06 08 25 11 12 1b 14 00 07 16 25 11 |......%.......%.|
000004c0: 12 1b 14 00 07 40 25 11 12 1b 14 00 07 3c 25 11 |.....@%......<%.|
000004d0: 12 1b 14 00 07 14 25 11 12 1b 14 00 07 1c 25 11 |......%.......%.|
000004e0: 12 1b 14 00 07 2c 25 11 12 1b 14 00 07 22 25 11 |.....,%......"%.|
000004f0: 12 1b 14 00 07 88 01 25 11 12 00 07 0e 11 11 12 |.......%........|
00000500: 1b 0a 1b 14 00 06 08 2f 11 12 1b 0a 1b 14 00 06 |......./........|
00000510: 10 2f 11 12 1b 0a 1b 14 00 0c 43 06 01 de 03 02 |./........C.....|
00000520: 00 02 0b 01 00 45 02 8e 04 00 01 00 90 04 00 01 |.....E..........|
00000530: 00 de 03 09 00 d3 b7 ab ec 29 0b b7 b8 b9 ba bb |.........)......|
00000540: bc bd be bf 08 bf 09 26 0a 00 4e 09 01 00 00 04 |.......&..N.....|
00000550: 0a 01 00 00 d4 9f 04 0b 01 00 00 9f 4e 4a 00 00 |............NJ..|
00000560: 00 28 0b df d3 b8 a0 d4 f2 4e 04 01 00 00 df d3 |.(.......N......|
00000570: b8 a0 d4 f2 4e 05 01 00 00 28 c8 03 2a 2b 00 03 |....N....(..*+..|
00000580: 10 0c 0c 96 34 07 03 20 0c 00 06 03 47 00 02 0e |....4.. ....G...|
00000590: 14 07 28 0c 0c 07 0a 07 17 21 23 07 28 0c 0c 07 |..(......!#.(...|
000005a0: 0a 07 17 00 06 03 3b 00 0c 43 06 01 e0 03 00 00 |......;..C......|
000005b0: 00 02 00 00 0d 00 39 a5 00 00 00 43 0c 01 00 00 |......9....C....|
000005c0: 25 00 00 c8 03 08 39 00 05 16 1b 08 1b 15 00 0c |%.....9.........|
000005d0: 43 06 01 e6 03 00 00 00 06 02 00 21 00 e4 03 0c |C..........!....|
000005e0: 00 e2 03 0b 00 39 a5 00 00 00 43 0d 01 00 00 39 |.....9....C....9|
000005f0: a5 00 00 00 43 0e 01 00 00 df e0 9d 24 01 00 c0 |....C.......$...|
00000600: 10 27 9c 25 01 00 c8 03 17 40 00 03 16 1b 08 1b |.'.%.....@......|
00000610: 0e 1b 08 1b 0c 07 34 07 03 07 31 20 52 07 87 01 |......4...1 R...|
00000620: 00 0c 43 06 01 e8 03 01 01 01 03 03 00 10 02 9e |..C.............|
00000630: 04 00 01 00 a0 04 00 00 00 dc 03 08 00 e2 03 0b |................|
00000640: 00 e4 03 0c 00 d3 df a0 cb d3 e3 e0 91 e4 e1 c7 |................|
00000650: c7 9c 9f e5 29 c8 03 18 43 00 03 20 07 0e 07 03 |....)...C.. ....|
00000660: 0d 0c 0d 2d 07 18 0d 17 07 36 07 10 07 03 07 11 |...-.....6......|
00000670: 00 0c 43 06 01 ea 03 00 02 00 04 04 00 2a 02 a2 |..C..........*..|
00000680: 04 00 00 00 a4 04 00 01 00 e0 03 0a 00 da 03 07 |................|
00000690: 00 de 03 09 00 d8 03 06 00 df f0 cb e0 43 fe 00 |.............C..|
000006a0: 00 00 c7 24 01 00 07 ac ed f0 e1 e2 39 a1 00 00 |...$........9...|
000006b0: 00 c7 f1 f2 cc e0 43 fc 00 00 00 c7 c8 24 02 00 |......C......$..|
000006c0: 0e c7 28 c8 03 2c 49 00 00 00 08 1c 07 16 0d 17 |..(..,I.........|
000006d0: 07 12 1b 0c 07 01 16 0c 12 1d 07 28 07 30 1b 0e |...........(.0..|
000006e0: 07 01 07 3d 0d 41 07 12 1b 10 07 0a 07 0b 17 11 |...=.A..........|
000006f0: 07 0d 00 0c 43 06 01 ec 03 00 01 00 03 07 00 51 |....C..........Q|
00000700: 01 a6 04 00 00 00 d0 03 02 0c da 03 07 00 f2 03 |................|
00000710: 13 00 dc 03 08 00 d4 03 04 00 ea 03 0f 00 e8 03 |................|
00000720: 0e 00 68 00 00 42 14 01 00 00 98 ec 07 04 15 01 |..h..B..........|
00000730: 00 00 30 e1 11 21 00 00 e4 68 00 00 43 14 01 00 |..0..!...h..C...|
00000740: 00 24 00 00 e6 b7 cb c7 60 04 00 a5 ec 25 60 05 |.$......`....%`.|
00000750: 00 f0 0e c7 b8 9f bf 14 9e bf 13 ab ec 11 60 06 |..............`.|
00000760: 00 68 00 00 43 14 01 00 00 24 00 00 f1 0e 95 00 |.h..C....$......|
00000770: ee d6 29 c8 03 32 53 00 05 12 11 16 44 17 09 18 |..)..2S.....D...|
00000780: 0c 12 17 03 11 16 1b 08 21 2b 07 08 11 03 12 1b |........!+......|
00000790: 11 1a 0d 0f 0c 04 11 0a 11 0a 12 19 11 22 11 16 |............."..|
000007a0: 1b 08 11 1f 00 02 05 1a 00 0c 43 06 01 ee 03 00 |..........C.....|
000007b0: 03 00 04 04 00 4e 03 ac 04 00 00 00 60 00 01 00 |.....N......`...|
000007c0: a6 04 00 02 00 da 03 07 00 e2 03 0b 00 e4 03 0c |................|
000007d0: 00 d4 03 04 00 df 43 01 01 00 00 24 00 00 cb 07 |......C....$....|
000007e0: e3 b7 e4 b7 e5 c7 eb d0 e2 ac ec 10 39 9f 00 00 |............9...|
000007f0: 00 11 04 17 01 00 00 21 01 00 30 b7 cd c9 c8 b8 |.......!..0.....|
00000800: a0 a5 ec 1f c7 c9 48 c7 c9 b8 9f 48 a8 ec 10 39 |......H....H...9|
00000810: 9f 00 00 00 11 04 18 01 00 00 21 01 00 30 95 02 |..........!..0..|
00000820: ee dc 29 c8 03 42 62 00 00 00 08 1e 07 12 1b 16 |..)..Bb.........|
00000830: 17 3d 0d 00 0d 00 0e 1a 07 08 08 19 07 14 07 05 |.=..............|
00000840: 12 06 39 0a 11 1d 14 18 07 08 0c 0e 07 11 12 13 |..9.............|
00000850: 07 0a 07 01 07 0e 07 0a 0c 04 07 05 07 0d 12 04 |................|
00000860: 39 0a 11 1d 00 01 03 32 00 0c 43 06 01 f0 03 00 |9......2..C.....|
00000870: 03 00 03 05 00 48 03 a6 04 00 00 00 a2 04 00 01 |.....H..........|
00000880: 00 b2 04 00 02 00 d6 03 05 00 ea 03 0f 00 da 03 |................|
00000890: 07 00 e8 03 0e 00 d0 03 02 0c b7 cb c7 df a5 ec |................|
000008a0: 34 e0 f0 cc e1 43 00 01 00 00 c8 24 01 00 d1 07 |4....C.....$....|
000008b0: ab ec 0e e1 43 fd 00 00 00 c8 24 01 00 0e ee 11 |....C.....$.....|
000008c0: e1 43 fd 00 00 00 c9 42 11 01 00 00 24 01 00 0e |.C.....B....$...|
000008d0: 95 00 ee c9 e2 68 04 00 43 14 01 00 00 24 00 00 |.....h..C....$..|
000008e0: f1 29 c8 03 3a 76 00 0e 28 07 08 07 03 12 07 07 |.)..:v..(.......|
000008f0: 1a 0d 0f 07 12 1b 2c 07 01 12 51 0c 12 12 11 07 |......,...Q.....|
00000900: 12 1b 10 07 01 22 1f 07 12 1b 10 07 10 1b 11 00 |....."..........|
00000910: 04 0b 2c 00 04 10 5b 07 22 11 16 1b 08 11 1f 00 |..,...[.".......|
00000920: 0c 43 06 01 f2 03 00 00 00 00 00 00 01 00 29 c8 |.C............).|
00000930: 03 03 8a 01 00 00 0c 43 06 01 00 00 01 00 01 00 |.......C........|
00000940: 00 0a 01 10 00 01 00 08 cb c7 42 fa 00 00 00 98 |..........B.....|
00000950: 28 c8 03 07 97 01 1e 12 1b 20 17 00 0c 43 06 01 |(........ ...C..|
00000960: 00 02 02 02 05 01 00 b3 01 04 a2 04 00 01 00 84 |................|
00000970: 01 00 01 00 b4 04 00 00 00 10 00 01 00 f2 03 13 |................|
00000980: 00 08 cc c8 43 fb 00 00 00 24 00 00 ec 14 c8 df |....C....$......|
00000990: 42 03 01 00 00 11 d3 d4 21 02 00 44 fa 00 00 00 |B.......!..D....|
000009a0: 29 c8 43 02 01 00 00 d3 24 01 00 0e c8 42 fa 00 |).C.....$....B..|
000009b0: 00 00 42 11 01 00 00 d3 ab ec 02 29 df 42 03 01 |..B........).B..|
000009c0: 00 00 11 d3 d4 21 02 00 cb d3 c8 42 fa 00 00 00 |.....!.....B....|
000009d0: 42 11 01 00 00 a7 ec 2c c7 c8 42 fa 00 00 00 44 |B......,..B....D|
000009e0: 04 01 00 00 c7 c8 42 fa 00 00 00 42 05 01 00 00 |......B....B....|
000009f0: 44 05 01 00 00 c8 42 fa 00 00 00 07 44 05 01 00 |D.....B.....D...|
00000a00: 00 ee 2a c7 c8 42 fa 00 00 00 44 05 01 00 00 c7 |..*..B....D.....|
00000a10: c8 42 fa 00 00 00 42 04 01 00 00 44 04 01 00 00 |.B....B....D....|
00000a20: c8 42 fa 00 00 00 07 44 04 01 00 00 c8 c7 44 fa |.B.....D......D.|
00000a30: 00 00 00 29 c8 03 67 a2 01 1d 12 21 1b 10 1c 17 |...)..g....!....|
00000a40: 07 22 07 12 20 0c 07 0a 07 0b 2b 3d 00 01 08 07 |.".. .....+=....|
00000a50: 07 08 1b 10 07 01 1c 05 1b 0c 1b 10 07 05 12 1d |................|
00000a60: 09 16 07 12 20 0c 07 0a 07 0b 17 31 0c 14 1b 0c |.... ......1....|
00000a70: 1b 17 12 07 07 08 07 18 35 1f 07 08 07 1a 1b 0c |........5.......|
00000a80: 35 2d 07 08 1b 0c 2d 13 07 08 07 1a 35 21 07 08 |5-....-.....5!..|
00000a90: 07 18 1b 0c 35 2b 07 08 1b 0c 22 1b 07 1a 00 0c |....5+....".....|
00000aa0: 43 06 01 00 01 03 01 03 00 00 a1 01 04 a2 04 00 |C...............|
00000ab0: 01 00 b6 04 00 00 00 8a 04 00 01 00 10 00 01 00 |................|
00000ac0: 08 cd c9 43 fb 00 00 00 24 00 00 ec 0f 39 9f 00 |...C....$....9..|
00000ad0: 00 00 04 1c 01 00 00 d3 9f f1 30 c9 43 02 01 00 |..........0.C...|
00000ae0: 00 d3 24 01 00 0e c9 42 fa 00 00 00 42 11 01 00 |..$....B....B...|
00000af0: 00 d3 ac ec 0f 39 9f 00 00 00 04 1c 01 00 00 d3 |.....9..........|
00000b00: 9f f1 30 c9 42 fa 00 00 00 cb c9 42 fa 00 00 00 |..0.B......B....|
00000b10: 42 04 01 00 00 98 ec 14 c9 c9 42 fa 00 00 00 42 |B.........B....B|
00000b20: 05 01 00 00 44 fa 00 00 00 ee 35 c9 42 fa 00 00 |....D.....5.B...|
00000b30: 00 42 05 01 00 00 cc c9 c9 42 fa 00 00 00 42 04 |.B.......B....B.|
00000b40: 01 00 00 44 fa 00 00 00 c9 43 02 01 00 00 d3 24 |...D.....C.....$|
00000b50: 01 00 0e c9 42 fa 00 00 00 c8 44 05 01 00 00 c7 |....B.....D.....|
00000b60: 28 c8 03 57 c2 01 1d 12 21 1b 10 1c 0b 34 34 07 |(..W....!....44.|
00000b70: 03 07 25 07 15 09 07 07 08 1b 10 07 01 1c 05 1b |..%.............|
00000b80: 0c 1b 10 07 05 12 11 34 34 07 03 07 25 07 15 0e |.......44...%...|
00000b90: 1c 26 11 1b 0c 2b 15 07 08 07 1a 1b 0c 46 0d 1b |.&...+.......F..|
00000ba0: 0c 21 2b 07 08 07 1a 1b 0c 36 2d 07 08 1b 10 07 |.!+......6-.....|
00000bb0: 01 19 15 07 08 1b 1e 22 1f 07 0d 00 0c 43 06 01 |.......".....C..|
00000bc0: 00 01 01 01 03 00 00 32 02 a2 04 00 01 00 10 00 |.......2........|
00000bd0: 01 00 08 cb c7 43 fb 00 00 00 24 00 00 ec 03 07 |.....C....$.....|
00000be0: 28 c7 43 02 01 00 00 d3 24 01 00 0e c7 42 fa 00 |(.C.....$....B..|
00000bf0: 00 00 42 11 01 00 00 d3 ab ec 08 c7 42 fa 00 00 |..B.........B...|
00000c00: 00 28 07 28 c8 03 1d e0 01 1b 12 1d 1b 10 21 17 |.(.(..........!.|
00000c10: 09 07 07 08 1b 10 07 01 1c 00 1b 0c 1b 10 07 05 |................|
00000c20: 16 1a 25 45 00 0c 43 06 01 00 01 02 01 02 00 00 |..%E..C.........|
00000c30: 2e 03 ba 04 00 01 00 bc 04 00 00 00 10 00 01 00 |................|
00000c40: 08 cc c8 43 fb 00 00 00 24 00 00 ec 03 07 28 d3 |...C....$.....(.|
00000c50: 11 ed 08 0e c8 42 fa 00 00 00 cb c7 42 05 01 00 |.....B......B...|
00000c60: 00 ec 0a c7 42 05 01 00 00 cb ee f0 c7 28 c8 03 |....B........(..|
00000c70: 19 ea 01 1e 12 23 1b 10 21 17 09 14 20 2a 21 37 |.....#..!... *!7|
00000c80: 07 0e 26 00 07 0e 2c 1b 07 0d 00 0c 43 06 01 00 |..&...,.....C...|
00000c90: 01 01 01 03 00 00 53 02 a2 04 00 01 00 10 00 01 |......S.........|
00000ca0: 00 08 cb c7 43 fb 00 00 00 24 00 00 ec 03 07 28 |....C....$.....(|
00000cb0: c7 43 02 01 00 00 d3 24 01 00 0e c7 42 fa 00 00 |.C.....$....B...|
00000cc0: 00 42 11 01 00 00 d3 a5 ec 08 c7 42 fa 00 00 00 |.B.........B....|
00000cd0: 28 c7 42 fa 00 00 00 42 04 01 00 00 ec 15 c7 43 |(.B....B.......C|
00000ce0: ff 00 00 00 c7 42 fa 00 00 00 42 04 01 00 00 25 |.....B....B....%|
00000cf0: 01 00 07 28 c8 03 2d f8 01 2b 12 3d 1b 10 21 17 |...(..-..+.=..!.|
00000d00: 00 01 08 07 07 08 1b 10 07 01 1e 05 1b 0c 1b 0e |................|
00000d10: 07 03 17 07 1b 15 0e 12 1b 0c 2b 07 20 1a 1b 0c |..........+. ...|
00000d20: 1b 3b 19 00 00 0c 43 06 01 00 00 02 00 03 00 01 |.;....C.........|
00000d30: 25 02 be 04 00 00 40 10 00 01 00 08 cc 26 00 00 |%.....@......&..|
00000d40: cb c8 43 fb 00 00 00 24 00 00 98 ec 12 c8 42 fa |..C....$......B.|
00000d50: 00 00 00 43 06 01 00 00 c2 00 24 01 00 0e c7 28 |...C......$....(|
00000d60: c8 03 13 8e 02 21 27 27 1b 10 21 19 07 08 1b 0c |.....!''..!.....|
00000d70: 25 14 18 21 07 0d 00 0c 43 06 01 00 01 00 01 03 |%..!....C.......|
00000d80: 01 00 10 01 b4 04 00 01 00 be 04 00 01 df 43 20 |..............C |
00000d90: 01 00 00 d3 42 11 01 00 00 24 01 00 29 c8 03 0d |....B....$..)...|
00000da0: 91 02 1d 02 24 07 0c 1b 0c 07 08 1b 09 00 0c 43 |....$..........C|
00000db0: 06 01 00 01 06 01 04 01 00 9c 02 07 a2 04 00 01 |................|
00000dc0: 00 c2 04 00 00 00 88 04 00 01 00 8a 04 00 02 00 |................|
00000dd0: bc 04 00 03 00 c4 04 00 04 00 10 00 01 00 f2 03 |................|
00000de0: 13 00 08 c5 05 c4 05 43 fb 00 00 00 24 00 00 ec |.......C....$...|
00000df0: 02 29 df 42 03 01 00 00 11 07 07 21 02 00 d1 d0 |.).B.......!....|
00000e00: cb c4 05 42 fa 00 00 00 ce d3 ca 42 11 01 00 00 |...B.......B....|
00000e10: a5 ec 56 ca 42 04 01 00 00 98 6d aa 00 00 00 d3 |..V.B.....m.....|
00000e20: ca 42 04 01 00 00 42 11 01 00 00 a5 ec 29 ca 42 |.B....B......).B|
00000e30: 04 01 00 00 c5 04 ca c4 04 42 05 01 00 00 44 04 |.........B....D.|
00000e40: 01 00 00 c4 04 ca 44 05 01 00 00 c4 04 d2 42 04 |......D.......B.|
00000e50: 01 00 00 98 ed 70 c9 ca 44 04 01 00 00 ca cd ca |.....p..D.......|
00000e60: 42 04 01 00 00 ce ee a2 d3 ca 42 11 01 00 00 a7 |B.........B.....|
00000e70: ec 54 ca 42 05 01 00 00 98 ed 4b d3 ca 42 05 01 |.T.B......K..B..|
00000e80: 00 00 42 11 01 00 00 a7 ec 29 ca 42 05 01 00 00 |..B......).B....|
00000e90: c5 04 ca c4 04 42 04 01 00 00 44 05 01 00 00 c4 |.....B....D.....|
00000ea0: 04 ca 44 04 01 00 00 c4 04 d2 42 05 01 00 00 98 |..D.......B.....|
00000eb0: ed 14 c8 ca 44 05 01 00 00 ca cc ca 42 05 01 00 |....D.......B...|
00000ec0: 00 ce ef 46 ff c8 ca 42 04 01 00 00 44 05 01 00 |...F...B....D...|
00000ed0: 00 c9 ca 42 05 01 00 00 44 04 01 00 00 ca c7 42 |...B....D......B|
00000ee0: 05 01 00 00 44 04 01 00 00 ca c7 42 04 01 00 00 |....D......B....|
00000ef0: 44 05 01 00 00 c4 05 ca 44 fa 00 00 00 29 c8 03 |D.......D....)..|
00000f00: 99 01 9f 02 1d 1c 21 1b 10 1c 17 00 01 10 2e 07 |......!.........|
00000f10: 12 2a 0a 2b 2d 22 13 07 0c 07 0e 1b 11 12 02 07 |.*.+-"..........|
00000f20: 0e 3c 0f 07 0c 07 0e 1b 0a 1b 1b 13 0c 07 0e 26 |.<.............&|
00000f30: 21 07 1e 0c 06 35 23 0c 18 21 03 12 04 00 08 0a |!....5#..!......|
00000f40: 1f 07 1a 21 09 0d 04 07 0e 2c 17 07 0c 07 0e 1b |...!.....,......|
00000f50: 11 12 07 07 0e 2d 0f 07 0c 07 0e 1b 0c 1b 1d 13 |.....-..........|
00000f60: 0c 07 0e 26 21 07 20 0c 06 35 25 0c 16 21 01 12 |...&!. ..5%..!..|
00000f70: 04 00 08 0a 1f 07 1a 21 0b 0d 06 07 0e 00 09 0e |.......!........|
00000f80: 31 07 1a 07 0e 35 27 07 1a 07 0e 35 27 07 1e 07 |1....5'....5'...|
00000f90: 0a 35 27 07 20 07 0a 35 29 0c 1a 00 0c 43 06 01 |.5'. ..5)....C..|
00000fa0: 00 02 01 02 02 00 00 11 03 a2 04 00 01 00 84 01 |................|
00000fb0: 00 01 00 10 00 01 00 08 cb c7 d3 44 11 01 00 00 |...........D....|
00000fc0: c7 d4 44 42 00 00 00 29 c8 03 0b e3 02 11 0d 19 |..DB...)........|
00000fd0: 07 16 21 15 07 1a 00 0c 43 06 01 00 01 03 01 03 |..!.....C.......|
00000fe0: 00 00 29 04 c6 04 00 01 00 bc 04 00 00 00 88 04 |..).............|
00000ff0: 00 01 00 10 00 01 00 08 cd c9 cb c7 ec 22 c7 42 |.............".B|
00001000: 04 01 00 00 d0 ec 0c c8 43 06 01 00 00 d3 24 01 |........C.....$.|
00001010: 00 0e d3 c7 f1 0e c7 42 05 01 00 00 cb ee dd 29 |.......B.......)|
00001020: c8 03 1d f6 02 25 18 33 12 10 07 0e 1c 1b 12 00 |.....%.3........|
00001030: 07 08 1b 16 07 01 17 23 07 04 07 01 0d 12 07 0e |.......#........|
00001040: 00                                              |.|
```