# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-exports-class.ts
**生成时间**: 2025-12-05T12:54:24.154Z

## 大小对比

- TypeScript编译器: 694 字节
- WASM编译器: 653 字节
- 差异: 41 字节 (6.28%)

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
      "rawLength": 238,
      "actualLength": 119,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-exports-class.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 123
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "createCounter",
      "offset": 131
    },
    {
      "index": 3,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "sharedCounter",
      "offset": 145
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "DefaultCounter",
      "offset": 159
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 174
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "step",
      "offset": 184
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "initial",
      "offset": 189
    },
    {
      "index": 8,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "this.active_func",
      "offset": 197
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "new.target",
      "offset": 214
    }
  ],
  "functionHeader": {
    "offset": 225,
    "tag": "0xd",
    "remaining": 469
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

共发现 638 个字节差异:

- 偏移量 0x1: TS=0x0a vs WASM=0x09
- 偏移量 0x2: TS=0xee vs WASM=0x66
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
- ... (显示前20个差异，总共638个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a ee 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 |res/module-expor|
00000070: 74 73 2d 63 6c 61 73 73 2e 6a 73 0e 43 6f 75 6e |ts-class.js.Coun|
00000080: 74 65 72 1a 63 72 65 61 74 65 43 6f 75 6e 74 65 |ter.createCounte|
00000090: 72 1a 73 68 61 72 65 64 43 6f 75 6e 74 65 72 1c |r.sharedCounter.|
000000a0: 44 65 66 61 75 6c 74 43 6f 75 6e 74 65 72 12 69 |DefaultCounter.i|
000000b0: 6e 63 72 65 6d 65 6e 74 08 73 74 65 70 0e 69 6e |ncrement.step.in|
000000c0: 69 74 69 61 6c 20 74 68 69 73 2e 61 63 74 69 76 |itial this.activ|
000000d0: 65 5f 66 75 6e 63 14 6e 65 77 2e 74 61 72 67 65 |e_func.new.targe|
000000e0: 74 0d c8 03 00 04 00 00 00 ca 03 ca 03 cc 03 cc |t...............|
000000f0: 03 ce 03 ce 03 d0 03 2c 0c 20 06 01 a4 01 00 06 |.......,. ......|
00000100: 00 03 05 05 4d 06 ca 03 01 00 00 f0 01 02 00 00 |....M...........|
00000110: cc 03 00 00 00 ce 03 00 00 00 d0 03 01 00 00 f0 |................|
00000120: 01 02 00 00 ca 03 00 01 f0 01 01 01 cc 03 02 01 |................|
00000130: ce 03 03 01 d0 03 04 01 08 6c 45 00 00 00 06 02 |.........lE.....|
00000140: 01 00 00 00 58 e5 00 00 00 00 c2 00 56 e9 00 00 |....X.......V...|
00000150: 00 00 03 02 00 00 00 52 5b 01 00 0e 11 e3 51 c2 |.......R[.....Q.|
00000160: 03 e5 df 01 2a 00 00 00 21 01 00 e6 df 02 04 00 |....*...!.......|
00000170: 00 00 58 e8 00 00 00 01 06 5b 01 00 0e 11 61 04 |..X......[....a.|
00000180: 00 51 29 06 2f c8 03 01 0c 00 27 0f 00 03 04 00 |.Q)./.....'.....|
00000190: 00 02 00 0a 02 00 0c 00 04 00 d2 03 01 01 01 03 |................|
000001a0: 00 00 10 02 d4 03 00 00 00 10 00 00 00 c7 42 42 |..............BB|
000001b0: 00 00 00 d3 0e c7 42 42 00 00 00 28 29 c8 03 01 |......BB...()...|
000001c0: 09 00 00 07 00 06 01 00 02 01 00 0c 00 04 00 ca |................|
000001d0: 03 01 01 01 03 00 00 1f 02 d6 03 00 00 00 10 00 |................|
000001e0: 00 00 08 cb 2b 39 78 00 00 00 11 6c 06 00 00 00 |....+9x....l....|
000001f0: c7 1b 24 00 00 0e 0e d3 d3 c7 1b 44 42 00 00 00 |..$........DB...|
00000200: 29 c8 03 01 09 00 15 03 00 00 01 00 02 7f 00 0c |)...............|
00000210: 00 04 00 00 00 01 00 03 00 00 08 01 10 00 00 00 |................|
00000220: c7 06 4e 42 00 00 00 29 c8 03 01 00 00 0c 00 04 |..NB...)........|
00000230: 00 cc 03 01 00 01 03 01 00 13 01 d6 03 00 00 00 |................|
00000240: ca 03 00 00 d3 11 f4 6c 03 00 00 00 0e b7 db 0e |.......l........|
00000250: df d3 21 01 00 28 29 c8 03 01 06 00 09 11 00 03 |..!..().........|
00000260: 01 00 0c 04 04 00 d0 03 00 03 00 03 01 00 29 03 |..............).|
00000270: d8 03 00 00 00 da 03 00 00 00 10 00 00 00 f0 01 |................|
00000280: 01 00 0c 02 cb 0c 03 cc 63 02 00 2b c7 35 c8 b7 |........c..+.5..|
00000290: 21 01 00 11 66 02 00 df 11 6c 06 00 00 00 c9 1b |!...f....l......|
000002a0: 24 00 00 0e 0e 0e 0e 67 02 00 28 c8 03 01 06 00 |$......g..(.....|
000002b0: 0a 18 00 03 01 00                               |......|
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
00000120: 00 e6 06 2f c8 03 0a 00 00 00 2e 26 42 20 0e 27 |.../.......&B .'|
00000130: 08 00 0c 40 07 01 00 01 02 00 02 01 00 23 03 d6 |...@.........#..|
00000140: 03 00 01 00 d6 03 01 ff ff ff ff 0f 20 10 00 01 |............ ...|
00000150: 00 f0 01 01 0d 08 cc 2b 68 00 00 11 ec 06 c8 1b |.......+h.......|
00000160: 24 00 00 0e 63 00 00 d3 11 f4 ec 04 0e b7 db cb |$...c...........|
00000170: c8 d3 44 42 00 00 00 29 c8 03 06 01 02 8a 04 07 |..DB...)........|
00000180: 1a 00 0c 40 07 01 00 01 02 00 03 00 00 22 03 d8 |...@........."..|
00000190: 03 00 01 00 d8 03 01 ff ff ff ff 0f 20 10 00 01 |............ ...|
000001a0: 00 08 cc 63 00 00 d3 11 f4 ec 04 0e b8 db cb c8 |...c............|
000001b0: 43 42 00 00 00 d3 9f 44 42 00 00 00 c8 42 42 00 |CB.....DB....BB.|
000001c0: 00 00 28 c8 03 0e 05 02 49 04 07 08 1b 14 07 05 |..(.....I.......|
000001d0: 26 00 1b 15 00 0c 42 07 01 00 00 01 00 01 00 00 |&.....B.........|
000001e0: 09 01 10 00 01 00 08 cb c7 42 42 00 00 00 28 c8 |.........BB...(.|
000001f0: 03 06 0a 02 12 1a 1b 15 00 0c 41 06 01 cc 03 01 |..........A.....|
00000200: 01 00 03 01 00 15 02 d6 03 00 01 00 d6 03 01 ff |................|
00000210: ff ff ff 0f 20 ca 03 00 08 63 00 00 d3 11 f4 ec |.... ....c......|
00000220: 04 0e b7 db cb 68 00 00 11 d3 21 01 00 28 c8 03 |.....h....!..(..|
00000230: 0a 0f 07 3f 0c 16 10 07 01 11 23 00 0c c6 07 01 |...?......#.....|
00000240: 00 00 03 00 03 01 00 28 03 e8 01 00 01 00 e6 01 |.......(........|
00000250: 00 01 00 10 00 01 20 f0 01 03 0d 0c 02 cb 0c 03 |...... .........|
00000260: cc 63 02 00 2b c7 35 c8 b7 21 01 00 11 66 02 00 |.c..+.5..!...f..|
00000270: 68 00 00 11 ec 08 64 02 00 1b 24 00 00 0e 0e 67 |h.....d...$....g|
00000280: 02 00 28 c8 03 06 16 02 35 04 16 0a 00          |..(.....5....|
```