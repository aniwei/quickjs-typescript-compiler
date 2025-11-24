# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/module-exports-class.ts
**生成时间**: 2025-11-22T18:12:33.587Z

## 大小对比

- TypeScript编译器: 636 字节
- WASM编译器: 653 字节
- 差异: -17 字节 (-2.60%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports-class.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "createCounter",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "sharedCounter",
      "offset": 76
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "DefaultCounter",
      "offset": 90
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 105
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "current",
      "offset": 115
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "initial",
      "offset": 123
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "<anonymous>",
      "offset": 131
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "step",
      "offset": 143
    }
  ],
  "functionHeader": {
    "offset": 148,
    "tag": "0xd",
    "remaining": 488
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports-class.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "createCounter",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "sharedCounter",
      "offset": 76
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "DefaultCounter",
      "offset": 90
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 105
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "current",
      "offset": 115
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "initial",
      "offset": 123
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "step",
      "offset": 131
    }
  ],
  "functionHeader": {
    "offset": 136,
    "tag": "0xd",
    "remaining": 517
  }
}
```

## 字节级差异

共发现 470 个字节差异:

- 偏移量 0x1: TS=0x0a vs WASM=0x09
- 偏移量 0x83: TS=0x16 vs WASM=0x08
- 偏移量 0x84: TS=0x3c vs WASM=0x73
- 偏移量 0x85: TS=0x61 vs WASM=0x74
- 偏移量 0x86: TS=0x6e vs WASM=0x65
- 偏移量 0x87: TS=0x6f vs WASM=0x70
- 偏移量 0x88: TS=0x6e vs WASM=0x0d
- 偏移量 0x89: TS=0x79 vs WASM=0xc8
- 偏移量 0x8a: TS=0x6d vs WASM=0x03
- 偏移量 0x8b: TS=0x6f vs WASM=0x00
- 偏移量 0x8c: TS=0x75 vs WASM=0x04
- 偏移量 0x8d: TS=0x73 vs WASM=0x00
- 偏移量 0x8e: TS=0x3e vs WASM=0x00
- 偏移量 0x8f: TS=0x08 vs WASM=0xca
- 偏移量 0x90: TS=0x73 vs WASM=0x03
- 偏移量 0x91: TS=0x74 vs WASM=0x00
- 偏移量 0x92: TS=0x65 vs WASM=0x01
- 偏移量 0x93: TS=0x70 vs WASM=0xcc
- 偏移量 0x94: TS=0x0d vs WASM=0x03
- 偏移量 0x95: TS=0xc8 vs WASM=0x00
- ... (显示前20个差异，总共470个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 63 6c |odule-exports-cl|
00000030: 61 73 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 1a 63 |ass.js.Counter.c|
00000040: 72 65 61 74 65 43 6f 75 6e 74 65 72 1a 73 68 61 |reateCounter.sha|
00000050: 72 65 64 43 6f 75 6e 74 65 72 1c 44 65 66 61 75 |redCounter.Defau|
00000060: 6c 74 43 6f 75 6e 74 65 72 12 69 6e 63 72 65 6d |ltCounter.increm|
00000070: 65 6e 74 0e 63 75 72 72 65 6e 74 0e 69 6e 69 74 |ent.current.init|
00000080: 69 61 6c 16 3c 61 6e 6f 6e 79 6d 6f 75 73 3e 08 |ial.<anonymous>.|
00000090: 73 74 65 70 0d c8 03 00 04 00 00 ca 03 00 02 cc |step............|
000000a0: 03 00 03 ce 03 00 04 2c 00 00 00 0c 20 06 01 a4 |.......,.... ...|
000000b0: 01 00 04 00 03 00 05 75 04 f0 01 00 01 00 cc 03 |.......u........|
000000c0: 00 02 00 ce 03 00 03 00 d0 03 00 04 00 08 ec 23 |...............#|
000000d0: 3f e5 00 00 00 01 c2 03 41 e6 00 00 00 01 c2 03 |?.......A.......|
000000e0: 3a e6 00 00 00 3f e7 00 00 00 01 3f e8 00 00 00 |:....?.....?....|
000000f0: 01 29 63 01 00 63 00 00 06 c1 00 58 e5 00 00 00 |.)c..c.....X....|
00000100: 00 c1 01 56 e9 00 00 00 00 c1 02 56 ea 00 00 00 |...V.......V....|
00000110: 01 06 cc 0e cb 6b 01 00 63 01 00 63 04 00 63 03 |.....k..c..c..c.|
00000120: 00 64 00 00 11 bf 2a 21 01 00 ce 39 e5 00 00 00 |.d....*!...9....|
00000130: c1 04 58 e8 00 00 00 01 06 cc 0e c5 04 6b 01 00 |..X..........k..|
00000140: 06 2f c8 03 18 00 00 e0 04 2d 00 00 08 08 00 00 |./.......-......|
00000150: 18 0e 3e 11 41 11 50 17 08 1c 53 0b 03 00 0c 40 |..>.A.P...S....@|
00000160: 07 01 d8 03 01 00 01 03 00 00 16 01 d6 03 00 01 |................|
00000170: 00 d3 11 f4 ec 06 0e b7 d7 ee 02 0e 08 d3 11 1e |................|
00000180: 44 42 00 00 00 0e 29 c8 03 0a 02 02 02 2c 3a 27 |DB....)......,:'|
00000190: 07 1a 11 11 00 0c 08 06 01 d2 03 01 00 01 03 00 |................|
000001a0: 00 23 01 da 03 00 01 00 d3 11 f4 ec 06 0e b8 d7 |.#..............|
000001b0: ee 02 0e 08 11 42 42 00 00 00 d3 9f 11 1e 44 42 |.....BB.......DB|
000001c0: 00 00 00 0e 08 42 42 00 00 00 28 c8 03 12 05 02 |.....BB...(.....|
000001d0: 02 22 3a 1d 0c 08 1b 14 07 05 30 07 07 08 1b 15 |.":.......0.....|
000001e0: 00 0c 0a 06 01 d4 03 00 00 00 01 00 00 07 00 08 |................|
000001f0: 42 42 00 00 00 28 c8 03 08 09 02 03 12 07 08 1b |BB...(..........|
00000200: 15 00 0c 41 06 01 cc 03 01 00 01 03 01 00 14 01 |...A............|
00000210: d6 03 00 01 00 ca 03 00 01 d3 11 f4 ec 06 0e b7 |................|
00000220: d7 ee 02 0e 68 00 00 11 d3 21 01 00 28 c8 03 0c |....h....!..(...|
00000230: 0d 00 02 50 3a 35 11 15 07 26 07 01 00 0c c6 07 |...P:5...&......|
00000240: 01 d8 03 00 03 00 03 00 00 19 03 10 00 00 00 e6 |................|
00000250: 01 00 00 00 e8 01 00 02 00 0c 02 cd 0c 03 cc 63 |...............c|
00000260: 00 00 2b c9 35 c8 b7 21 01 00 11 66 00 00 67 00 |..+.5..!...f..g.|
00000270: 00 28 c8 03 06 12 02 03 04 48 0a 00             |.(.......H..|
```

### WASM
```
00000000: 05 09 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 63 6c |odule-exports-cl|
00000030: 61 73 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 1a 63 |ass.js.Counter.c|
00000040: 72 65 61 74 65 43 6f 75 6e 74 65 72 1a 73 68 61 |reateCounter.sha|
00000050: 72 65 64 43 6f 75 6e 74 65 72 1c 44 65 66 61 75 |redCounter.Defau|
00000060: 6c 74 43 6f 75 6e 74 65 72 12 69 6e 63 72 65 6d |ltCounter.increm|
00000070: 65 6e 74 0e 63 75 72 72 65 6e 74 0e 69 6e 69 74 |ent.current.init|
00000080: 69 61 6c 08 73 74 65 70 0d c8 03 00 04 00 00 ca |ial.step........|
00000090: 03 00 01 cc 03 00 02 ce 03 00 03 2c 00 00 00 0c |...........,....|
000000a0: 20 06 01 a4 01 00 04 00 03 04 05 53 04 ca 03 02 | ..........S....|
000000b0: 00 30 f0 01 03 01 70 d0 03 04 00 30 f0 01 05 03 |.0....p....0....|
000000c0: 70 ca 03 00 09 cc 03 01 01 ce 03 02 0d d0 03 03 |p...............|
000000d0: 09 08 ec 05 c2 03 e4 29 63 00 00 06 63 01 00 c1 |.......)c...c...|
000000e0: 00 58 e5 00 00 00 00 c2 01 56 e9 00 00 00 00 c2 |.X.......V......|
000000f0: 02 56 ea 00 00 00 01 06 cc 0e cf 6b 01 00 e3 68 |.V.........k...h|
00000100: 00 00 11 bf 2a 21 01 00 e5 63 02 00 68 00 00 63 |....*!...c..h..c|
00000110: 03 00 c1 04 58 e8 00 00 00 01 06 ce 0e d1 6b 03 |....X.........k.|
00000120: 00 e6 06 2f c8 03 0a 00 00 00 2e 1e 42 20 0e 26 |.../........B .&|
00000130: 08 00 0c 40 07 01 00 01 02 00 02 01 00 23 03 d6 |...@.........#..|
00000140: 03 00 01 00 d6 03 01 ff ff ff ff 0f 20 10 00 01 |............ ...|
00000150: 00 f0 01 01 0d 08 cc 2b 68 00 00 11 ec 06 c8 1b |.......+h.......|
00000160: 24 00 00 0e 63 00 00 d3 11 f4 ec 04 0e b7 db cb |$...c...........|
00000170: c8 d3 44 42 00 00 00 29 c8 03 06 01 04 8a 08 07 |..DB...)........|
00000180: 1a 00 0c 40 07 01 00 01 02 00 03 00 00 22 03 d8 |...@........."..|
00000190: 03 00 01 00 d8 03 01 ff ff ff ff 0f 20 10 00 01 |............ ...|
000001a0: 00 08 cc 63 00 00 d3 11 f4 ec 04 0e b8 db cb c8 |...c............|
000001b0: 43 42 00 00 00 d3 9f 44 42 00 00 00 c8 42 42 00 |CB.....DB....BB.|
000001c0: 00 00 28 c8 03 0e 04 04 49 08 07 08 1b 14 07 05 |..(.....I.......|
000001d0: 26 00 1b 15 00 0c 42 07 01 00 00 01 00 01 00 00 |&.....B.........|
000001e0: 09 01 10 00 01 00 08 cb c7 42 42 00 00 00 28 c8 |.........BB...(.|
000001f0: 03 06 08 04 12 1e 1b 15 00 0c 41 06 01 cc 03 01 |..........A.....|
00000200: 01 00 03 01 00 15 02 d6 03 00 01 00 d6 03 01 ff |................|
00000210: ff ff ff 0f 20 ca 03 00 08 63 00 00 d3 11 f4 ec |.... ....c......|
00000220: 04 0e b7 db cb 68 00 00 11 d3 21 01 00 28 c8 03 |.....h....!..(..|
00000230: 0a 0c 07 3f 10 16 10 07 01 11 23 00 0c c6 07 01 |...?......#.....|
00000240: 00 00 03 00 03 01 00 28 03 e8 01 00 01 00 e6 01 |.......(........|
00000250: 00 01 00 10 00 01 20 f0 01 03 0d 0c 02 cb 0c 03 |...... .........|
00000260: cc 63 02 00 2b c7 35 c8 b7 21 01 00 11 66 02 00 |.c..+.5..!...f..|
00000270: 68 00 00 11 ec 08 64 02 00 1b 24 00 00 0e 0e 67 |h.....d...$....g|
00000280: 02 00 28 c8 03 06 11 04 35 08 16 0a 00          |..(.....5....|
```