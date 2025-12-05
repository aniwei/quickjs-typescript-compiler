# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/iife.ts
**生成时间**: 2025-12-05T12:54:24.034Z

## 大小对比

- TypeScript编译器: 348 字节
- WASM编译器: 270 字节
- 差异: 78 字节 (28.89%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 206,
      "actualLength": 103,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/iife.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "iife_result",
      "offset": 107
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "World",
      "offset": 119
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 125
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 133
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "iife_var",
      "offset": 137
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "I am in an IIFE",
      "offset": 146
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 162
    }
  ],
  "functionHeader": {
    "offset": 169,
    "tag": "0xd",
    "remaining": 179
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/iife.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "iife_result",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "World",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "iife_var",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "I am in an IIFE",
      "offset": 77
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 93
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xd",
    "remaining": 170
  }
}
```

## 字节级差异

共发现 333 个字节差异:

- 偏移量 0x2: TS=0xce vs WASM=0x46
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共333个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 ce 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 69 69 66 65 2e 6a 73 16 69 69 66 65 |res/iife.js.iife|
00000070: 5f 72 65 73 75 6c 74 0a 57 6f 72 6c 64 0e 63 6f |_result.World.co|
00000080: 6e 73 6f 6c 65 06 6c 6f 67 10 69 69 66 65 5f 76 |nsole.log.iife_v|
00000090: 61 72 1e 49 20 61 6d 20 69 6e 20 61 6e 20 49 49 |ar.I am in an II|
000000a0: 46 45 0c 48 65 6c 6c 6f 20 0d c8 03 00 00 00 00 |FE.Hello .......|
000000b0: 00 0c 20 06 01 a4 01 00 01 00 03 01 02 29 01 ca |.. ..........)..|
000000c0: 03 00 00 00 ca 03 00 01 08 6c 21 00 00 00 c2 00 |.........l!.....|
000000d0: 22 00 00 0e c2 01 04 e6 00 00 00 22 01 00 e3 39 |".........."...9|
000000e0: e7 00 00 00 43 e8 00 00 00 df 24 01 00 0e 29 06 |....C.....$...).|
000000f0: 2f c8 03 01 0c 00 0c 03 00 00 02 00 02 02 00 13 |/...............|
00000100: 01 00 0c 00 04 00 00 00 01 00 03 00 00 18 01 d2 |................|
00000110: 03 00 00 00 04 ea 00 00 00 5b 00 00 39 e7 00 00 |.........[..9...|
00000120: 00 43 e8 00 00 00 c7 24 01 00 0e 29 c8 03 01 06 |.C.....$...)....|
00000130: 00 00 01 00 12 01 00 0c 00 04 00 00 01 00 01 03 |................|
00000140: 00 00 09 01 70 00 00 00 04 eb 00 00 00 d3 9f 28 |....p..........(|
00000150: 29 c8 03 01 06 00 00 05 00 00 01 00             |)...........|
```

### WASM
```
00000000: 05 08 46 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..F__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 69 66 65 2e 6a 73 16 69 69 66 65 5f 72 65 73 75 |ife.js.iife_resu|
00000030: 6c 74 0a 57 6f 72 6c 64 0e 63 6f 6e 73 6f 6c 65 |lt.World.console|
00000040: 06 6c 6f 67 10 69 69 66 65 5f 76 61 72 1e 49 20 |.log.iife_var.I |
00000050: 61 6d 20 69 6e 20 61 6e 20 49 49 46 45 0c 48 65 |am in an IIFE.He|
00000060: 6c 6c 6f 20 0d c8 03 00 00 00 00 00 0c 20 06 01 |llo ......... ..|
00000070: a4 01 00 00 00 03 01 02 22 00 ca 03 00 01 08 ec |........".......|
00000080: 02 29 c2 00 f0 0e c2 01 04 e6 00 00 00 f1 e3 39 |.).............9|
00000090: e7 00 00 00 43 e8 00 00 00 df 24 01 00 0e 06 2f |....C.....$..../|
000000a0: c8 03 10 00 00 23 04 00 09 08 00 0d 03 1b 0e 1b |.....#..........|
000000b0: 0a 07 01 00 0c 43 06 01 00 00 01 00 03 00 00 15 |.....C..........|
000000c0: 01 d2 03 00 00 00 04 ea 00 00 00 cb 39 e7 00 00 |............9...|
000000d0: 00 43 e8 00 00 00 c7 24 01 00 29 c8 03 0a 00 01 |.C.....$..).....|
000000e0: 22 02 1b 0e 1b 0a 07 01 00 0c 43 06 01 00 01 00 |".........C.....|
000000f0: 01 02 00 00 08 01 70 00 01 00 04 eb 00 00 00 d3 |......p.........|
00000100: 9f 28 c8 03 08 05 13 1c 02 07 03 07 1f 00       |.(............|
```