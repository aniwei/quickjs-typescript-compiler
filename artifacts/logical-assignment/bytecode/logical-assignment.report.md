# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-assignment.ts
**生成时间**: 2025-12-09T14:28:02.746Z

## 大小对比

- TypeScript编译器: 452 字节
- WASM编译器: 460 字节
- 差异: -8 字节 (-1.74%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 13,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-assignment.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 58
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 60
    },
    {
      "index": 6,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fallback",
      "offset": 64
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "init",
      "offset": 73
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 78
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 86
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 90
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 92
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 94
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 356
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 13,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-assignment.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 58
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 60
    },
    {
      "index": 6,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fallback",
      "offset": 64
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "init",
      "offset": 73
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 78
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 86
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 90
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 92
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 94
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 364
  }
}
```

## 字节级差异

共发现 32 个字节差异:

- 偏移量 0x192: TS=0x30 vs WASM=0x38
- 偏移量 0x1a1: TS=0x34 vs WASM=0x1b
- 偏移量 0x1a2: TS=0x18 vs WASM=0x0e
- 偏移量 0x1a3: TS=0x11 vs WASM=0x1b
- 偏移量 0x1a4: TS=0x06 vs WASM=0x0a
- 偏移量 0x1a9: TS=0x95 vs WASM=0x11
- 偏移量 0x1aa: TS=0x29 vs WASM=0x06
- 偏移量 0x1ac: TS=0x06 vs WASM=0x13
- 偏移量 0x1ad: TS=0x67 vs WASM=0x86
- 偏移量 0x1ae: TS=0x05 vs WASM=0x15
- 偏移量 0x1b1: TS=0x71 vs WASM=0x67
- 偏移量 0x1b5: TS=0x67 vs WASM=0x71
- 偏移量 0x1b7: TS=0x34 vs WASM=0x11
- 偏移量 0x1b8: TS=0x18 vs WASM=0x06
- 偏移量 0x1b9: TS=0x11 vs WASM=0x67
- 偏移量 0x1ba: TS=0x06 vs WASM=0x05
- 偏移量 0x1bc: TS=0x08 vs WASM=0x0e
- 偏移量 0x1bd: TS=0x11 vs WASM=0x1b
- 偏移量 0x1be: TS=0x06 vs WASM=0x0a
- 偏移量 0x1bf: TS=0x1b vs WASM=0x11
- ... (显示前20个差异，总共32个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0d 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 61 73 73 69 67 6e 6d 65 6e |ogical-assignmen|
00000030: 74 2e 6a 73 02 61 02 62 02 63 02 64 06 6f 62 6a |t.js.a.b.c.d.obj|
00000040: 10 66 61 6c 6c 62 61 63 6b 08 69 6e 69 74 0e 63 |.fallback.init.c|
00000050: 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 02 79 02 7a |onsole.log.x.y.z|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 06 05 00 85 02 00 ca 03 00 09 cc 03 01 09 ce |................|
00000080: 03 02 09 d0 03 03 09 d2 03 04 0d 08 ec 02 29 b7 |..............).|
00000090: e3 c3 e4 07 e5 06 e6 7c e5 00 00 00 00 00 3d 11 |.......|......=.|
000000a0: ed 07 0e b8 16 3e ee 03 0f 0f 0e 7c e6 00 00 00 |.....>.....|....|
000000b0: 01 00 3d 11 ec 0b 0e 04 ea 00 00 00 16 3e ee 03 |..=..........>..|
000000c0: 0f 0f 0e 7c e7 00 00 00 02 00 3d 11 b2 ec 0b 0e |...|......=.....|
000000d0: 04 eb 00 00 00 16 3e ee 03 0f 0f 0e 7c e8 00 00 |......>.....|...|
000000e0: 00 03 00 3d 11 b2 ec 07 0e b9 16 3e ee 03 0f 0f |...=.......>....|
000000f0: 0e 39 ec 00 00 00 43 ed 00 00 00 68 00 00 68 01 |.9....C....h..h.|
00000100: 00 68 02 00 68 03 00 24 04 00 0e 0b b7 4e ee 00 |.h..h..$.....N..|
00000110: 00 00 07 4e ef 00 00 00 09 4e f0 00 00 00 61 04 |...N.....N....a.|
00000120: 00 68 04 00 43 ee 00 00 00 11 ec 0b 0e bc 15 44 |.h..C..........D|
00000130: ee 00 00 00 ee 02 0f 0e 68 04 00 43 ef 00 00 00 |........h..C....|
00000140: 11 b2 ec 0c 0e bf 0a 15 44 ef 00 00 00 ee 02 0f |........D.......|
00000150: 0e 68 04 00 43 f0 00 00 00 11 ed 0b 0e 0a 15 44 |.h..C..........D|
00000160: f0 00 00 00 ee 02 0f 0e 39 ec 00 00 00 43 ed 00 |........9....C..|
00000170: 00 00 68 04 00 42 ee 00 00 00 68 04 00 42 ef 00 |..h..B....h..B..|
00000180: 00 00 68 04 00 42 f0 00 00 00 24 03 00 0e 06 2f |..h..B....$..../|
00000190: c8 03 30 00 00 00 0c 08 00 67 00 7b 00 80 00 6c |..0......g.{...l|
000001a0: 00 34 18 11 06 11 06 11 06 95 29 11 06 67 05 11 |.4........)..g..|
000001b0: 06 71 05 11 06 67 05 34 18 11 06 1b 08 11 06 1b |.q...g.4........|
000001c0: 08 11 06 00                                     |....|
```

### WASM
```
00000000: 05 0d 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 61 73 73 69 67 6e 6d 65 6e |ogical-assignmen|
00000030: 74 2e 6a 73 02 61 02 62 02 63 02 64 06 6f 62 6a |t.js.a.b.c.d.obj|
00000040: 10 66 61 6c 6c 62 61 63 6b 08 69 6e 69 74 0e 63 |.fallback.init.c|
00000050: 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 02 79 02 7a |onsole.log.x.y.z|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 06 05 00 85 02 00 ca 03 00 09 cc 03 01 09 ce |................|
00000080: 03 02 09 d0 03 03 09 d2 03 04 0d 08 ec 02 29 b7 |..............).|
00000090: e3 c3 e4 07 e5 06 e6 7c e5 00 00 00 00 00 3d 11 |.......|......=.|
000000a0: ed 07 0e b8 16 3e ee 03 0f 0f 0e 7c e6 00 00 00 |.....>.....|....|
000000b0: 01 00 3d 11 ec 0b 0e 04 ea 00 00 00 16 3e ee 03 |..=..........>..|
000000c0: 0f 0f 0e 7c e7 00 00 00 02 00 3d 11 b2 ec 0b 0e |...|......=.....|
000000d0: 04 eb 00 00 00 16 3e ee 03 0f 0f 0e 7c e8 00 00 |......>.....|...|
000000e0: 00 03 00 3d 11 b2 ec 07 0e b9 16 3e ee 03 0f 0f |...=.......>....|
000000f0: 0e 39 ec 00 00 00 43 ed 00 00 00 68 00 00 68 01 |.9....C....h..h.|
00000100: 00 68 02 00 68 03 00 24 04 00 0e 0b b7 4e ee 00 |.h..h..$.....N..|
00000110: 00 00 07 4e ef 00 00 00 09 4e f0 00 00 00 61 04 |...N.....N....a.|
00000120: 00 68 04 00 43 ee 00 00 00 11 ec 0b 0e bc 15 44 |.h..C..........D|
00000130: ee 00 00 00 ee 02 0f 0e 68 04 00 43 ef 00 00 00 |........h..C....|
00000140: 11 b2 ec 0c 0e bf 0a 15 44 ef 00 00 00 ee 02 0f |........D.......|
00000150: 0e 68 04 00 43 f0 00 00 00 11 ed 0b 0e 0a 15 44 |.h..C..........D|
00000160: f0 00 00 00 ee 02 0f 0e 39 ec 00 00 00 43 ed 00 |........9....C..|
00000170: 00 00 68 04 00 42 ee 00 00 00 68 04 00 42 ef 00 |..h..B....h..B..|
00000180: 00 00 68 04 00 42 f0 00 00 00 24 03 00 0e 06 2f |..h..B....$..../|
00000190: c8 03 38 00 00 00 0c 08 00 67 00 7b 00 80 00 6c |..8......g.{...l|
000001a0: 00 1b 0e 1b 0a 11 06 11 06 11 06 11 13 86 15 11 |................|
000001b0: 06 67 05 11 06 71 05 11 06 67 05 1b 0e 1b 0a 11 |.g...q...g......|
000001c0: 06 1b 08 11 06 1b 08 11 06 1b 23 00             |..........#.|
```