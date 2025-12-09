# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-assignment.ts
**生成时间**: 2025-12-09T07:55:07.023Z

## 大小对比

- TypeScript编译器: 448 字节
- WASM编译器: 460 字节
- 差异: -12 字节 (-2.61%)

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
    "remaining": 352
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

共发现 274 个字节差异:

- 偏移量 0x74: TS=0xf9 vs WASM=0x85
- 偏移量 0x75: TS=0x01 vs WASM=0x02
- 偏移量 0x91: TS=0x04 vs WASM=0xc3
- 偏移量 0x92: TS=0x2f vs WASM=0xe4
- 偏移量 0x93: TS=0x00 vs WASM=0x07
- 偏移量 0x94: TS=0x00 vs WASM=0xe5
- 偏移量 0x95: TS=0x00 vs WASM=0x06
- 偏移量 0x96: TS=0xe4 vs WASM=0xe6
- 偏移量 0x97: TS=0x07 vs WASM=0x7c
- 偏移量 0x99: TS=0x68 vs WASM=0x00
- 偏移量 0x9c: TS=0x11 vs WASM=0x00
- 偏移量 0x9d: TS=0xed vs WASM=0x00
- 偏移量 0x9e: TS=0x09 vs WASM=0x3d
- 偏移量 0x9f: TS=0x0e vs WASM=0x11
- 偏移量 0xa0: TS=0xb8 vs WASM=0xed
- 偏移量 0xa1: TS=0x11 vs WASM=0x07
- 偏移量 0xa2: TS=0x69 vs WASM=0x0e
- 偏移量 0xa3: TS=0x00 vs WASM=0xb8
- 偏移量 0xa4: TS=0x00 vs WASM=0x16
- 偏移量 0xa5: TS=0xee vs WASM=0x3e
- ... (显示前20个差异，总共274个)

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
00000070: 00 06 05 00 f9 01 00 ca 03 00 09 cc 03 01 09 ce |................|
00000080: 03 02 09 d0 03 03 09 d2 03 04 0d 08 ec 02 29 b7 |..............).|
00000090: e3 04 2f 00 00 00 e4 07 e5 68 00 00 11 ed 09 0e |../......h......|
000000a0: b8 11 69 00 00 ee 01 0e 68 01 00 11 ec 0d 0e 04 |..i.....h.......|
000000b0: ea 00 00 00 11 69 01 00 ee 01 0e 68 02 00 11 b2 |.....i.....h....|
000000c0: ec 0d 0e 04 eb 00 00 00 11 69 02 00 ee 01 0e 68 |.........i.....h|
000000d0: 03 00 11 b2 ec 09 0e b9 11 69 03 00 ee 01 0e 39 |.........i.....9|
000000e0: ec 00 00 00 43 ed 00 00 00 68 00 00 68 01 00 68 |....C....h..h..h|
000000f0: 02 00 68 03 00 24 04 00 0e 0b b7 4e ee 00 00 00 |..h..$.....N....|
00000100: 07 4e ef 00 00 00 09 4e f0 00 00 00 61 04 00 68 |.N.....N....a..h|
00000110: 04 00 11 42 ee 00 00 00 11 ec 0c 0e bc 11 1e 44 |...B...........D|
00000120: ee 00 00 00 ee 02 0f 0e 68 04 00 11 42 ef 00 00 |........h...B...|
00000130: 00 11 b2 ec 0d 0e bf 0a 11 1e 44 ef 00 00 00 ee |..........D.....|
00000140: 02 0f 0e 68 04 00 11 42 f0 00 00 00 11 ed 0c 0e |...h...B........|
00000150: 0a 11 1e 44 f0 00 00 00 ee 02 0f 0e 39 ec 00 00 |...D........9...|
00000160: 00 43 ed 00 00 00 68 04 00 42 ee 00 00 00 68 04 |.C....h..B....h.|
00000170: 00 42 ef 00 00 00 68 04 00 42 f0 00 00 00 24 03 |.B....h..B....$.|
00000180: 00 0e 06 2f c8 03 38 00 00 00 0e 08 00 4e 00 62 |.../..8......N.b|
00000190: 00 67 00 53 00 1b 0e 1b 0a 11 06 11 06 11 06 11 |.g.S............|
000001a0: 13 86 15 16 06 6c 05 16 06 76 05 16 06 6c 05 1b |.....l...v...l..|
000001b0: 0e 1b 0a 11 06 1b 08 11 06 1b 08 11 06 1b 23 00 |..............#.|
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