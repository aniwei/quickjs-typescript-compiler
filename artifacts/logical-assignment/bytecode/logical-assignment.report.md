# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/logical-assignment.ts
**生成时间**: 2025-12-11T11:32:28.097Z

## 大小对比

- TypeScript编译器: 436 字节
- WASM编译器: 460 字节
- 差异: -24 字节 (-5.22%)

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
    "remaining": 340
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

共发现 278 个字节差异:

- 偏移量 0x74: TS=0xf3 vs WASM=0x85
- 偏移量 0x75: TS=0x01 vs WASM=0x02
- 偏移量 0x8c: TS=0xff vs WASM=0xec
- 偏移量 0x8f: TS=0xca vs WASM=0xb7
- 偏移量 0x90: TS=0xf6 vs WASM=0xe3
- 偏移量 0x91: TS=0x04 vs WASM=0xc3
- 偏移量 0x92: TS=0x2f vs WASM=0xe4
- 偏移量 0x93: TS=0x00 vs WASM=0x07
- 偏移量 0x94: TS=0x00 vs WASM=0xe5
- 偏移量 0x95: TS=0x00 vs WASM=0x06
- 偏移量 0x96: TS=0xf7 vs WASM=0xe6
- 偏移量 0x97: TS=0x07 vs WASM=0x7c
- 偏移量 0x98: TS=0xf8 vs WASM=0xe5
- 偏移量 0x99: TS=0x68 vs WASM=0x00
- 偏移量 0x9c: TS=0x11 vs WASM=0x00
- 偏移量 0x9e: TS=0x0c vs WASM=0x3d
- 偏移量 0x9f: TS=0x0e vs WASM=0x11
- 偏移量 0xa0: TS=0xcb vs WASM=0xed
- 偏移量 0xa1: TS=0x11 vs WASM=0x07
- 偏移量 0xa2: TS=0x65 vs WASM=0x0e
- ... (显示前20个差异，总共278个)

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
00000070: 00 06 05 00 f3 01 00 ca 03 00 09 cc 03 01 09 ce |................|
00000080: 03 02 09 d0 03 03 09 d2 03 04 0d 08 ff 02 29 ca |..............).|
00000090: f6 04 2f 00 00 00 f7 07 f8 68 00 00 11 00 0c 0e |../......h......|
000000a0: cb 11 65 00 00 6e 04 00 00 01 00 11 6c 17 00 00 |..e..n......l...|
000000b0: ff 0c 00 00 11 65 01 00 6e 04 00 00 00 0e 68 02 |.....e..n.....h.|
000000c0: 01 fc 00 00 00 0e 04 eb ff 08 02 00 6e 04 00 00 |............n...|
000000d0: 00 0e 68 03 00 11 b2 6c 01 f8 cc 11 65 03 00 6e |..h....l....e..n|
000000e0: ff 00 39 ec 00 00 00 43 ed 00 00 00 01 f4 00 64 |..9....C.......d|
000000f0: 02 00 64 03 00 24 04 00 0e 0b ca 4e ee 00 00 00 |..d..$.....N....|
00000100: 07 4e ef 00 00 00 09 4e f0 00 00 00 61 04 00 64 |.N.....N....a..d|
00000110: 04 00 43 ee 00 00 00 11 6c 11 00 00 00 0e cf 15 |..C.....l.......|
00000120: 44 ee 00 00 00 6e 05 00 00 00 0f 0e 64 04 00 43 |D....n......d..C|
00000130: ef 00 00 00 11 b2 6c 12 00 00 00 0e d2 0a ff eb |......l.........|
00000140: 00 6e 05 00 00 00 0f 0e 01 e2 00 00 00 11 6d 11 |.n............m.|
00000150: 00 00 00 0e 0a 15 44 f0 00 00 ff eb 00 0f 0e 39 |......D........9|
00000160: ec 00 00 00 43 01 e1 04 00 42 ee 00 00 00 64 04 |....C....B....d.|
00000170: 00 42 ef 00 00 00 00 e6 00 00 00 24 03 00 c8 03 |.B.........$....|
00000180: 32 00 00 00 0e 08 00 62 00 76 00 7b 00 67 00 25 |2......b.v.{.g.%|
00000190: 0e 1b 0a 25 06 25 06 25 06 25 13 86 15 25 06 67 |...%.%.%.%...%.g|
000001a0: 05 25 06 71 05 25 06 67 05 25 0e 1b 0a 3e 0e 3e |.%.q.%.g.%...>.>|
000001b0: 0e 3e 1d 00                                     |.>..|
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