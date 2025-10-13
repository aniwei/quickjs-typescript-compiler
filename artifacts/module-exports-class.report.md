# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/module-exports-class.ts
**生成时间**: 2025-10-13T07:12:56.927Z

## 大小对比

- TypeScript编译器: 693 字节
- WASM编译器: 653 字节
- 差异: 40 字节 (6.13%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 12,
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
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "__DefaultCounter_base_1",
      "offset": 90
    },
    {
      "index": 5,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "DefaultCounter",
      "offset": 114
    },
    {
      "index": 6,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 129
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "current",
      "offset": 139
    },
    {
      "index": 8,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 147
    },
    {
      "index": 9,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "initial",
      "offset": 154
    },
    {
      "index": 10,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "step",
      "offset": 162
    },
    {
      "index": 11,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "call",
      "offset": 167
    }
  ],
  "functionHeader": {
    "offset": 172,
    "tag": "0xd",
    "remaining": 521
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

共发现 558 个字节差异:

- 偏移量 0x1: TS=0x0c vs WASM=0x09
- 偏移量 0x5a: TS=0x2e vs WASM=0x1c
- 偏移量 0x5b: TS=0x5f vs WASM=0x44
- 偏移量 0x5c: TS=0x5f vs WASM=0x65
- 偏移量 0x5d: TS=0x44 vs WASM=0x66
- 偏移量 0x5e: TS=0x65 vs WASM=0x61
- 偏移量 0x5f: TS=0x66 vs WASM=0x75
- 偏移量 0x60: TS=0x61 vs WASM=0x6c
- 偏移量 0x61: TS=0x75 vs WASM=0x74
- 偏移量 0x62: TS=0x6c vs WASM=0x43
- 偏移量 0x63: TS=0x74 vs WASM=0x6f
- 偏移量 0x64: TS=0x43 vs WASM=0x75
- 偏移量 0x65: TS=0x6f vs WASM=0x6e
- 偏移量 0x66: TS=0x75 vs WASM=0x74
- 偏移量 0x67: TS=0x6e vs WASM=0x65
- 偏移量 0x68: TS=0x74 vs WASM=0x72
- 偏移量 0x69: TS=0x65 vs WASM=0x12
- 偏移量 0x6a: TS=0x72 vs WASM=0x69
- 偏移量 0x6b: TS=0x5f vs WASM=0x6e
- 偏移量 0x6c: TS=0x62 vs WASM=0x63
- ... (显示前20个差异，总共558个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 63 6c |odule-exports-cl|
00000030: 61 73 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 1a 63 |ass.js.Counter.c|
00000040: 72 65 61 74 65 43 6f 75 6e 74 65 72 1a 73 68 61 |reateCounter.sha|
00000050: 72 65 64 43 6f 75 6e 74 65 72 2e 5f 5f 44 65 66 |redCounter.__Def|
00000060: 61 75 6c 74 43 6f 75 6e 74 65 72 5f 62 61 73 65 |aultCounter_base|
00000070: 5f 31 1c 44 65 66 61 75 6c 74 43 6f 75 6e 74 65 |_1.DefaultCounte|
00000080: 72 12 69 6e 63 72 65 6d 65 6e 74 0e 63 75 72 72 |r.increment.curr|
00000090: 65 6e 74 0c 63 72 65 61 74 65 0e 69 6e 69 74 69 |ent.create.initi|
000000a0: 61 6c 08 73 74 65 70 08 63 61 6c 6c 0d c8 03 00 |al.step.call....|
000000b0: 04 00 00 ca 03 00 01 cc 03 00 02 ce 03 00 03 2c |...............,|
000000c0: 00 00 00 0c 20 06 01 a4 01 00 01 00 06 04 05 a8 |.... ...........|
000000d0: 01 01 d0 03 01 04 30 ca 03 00 0d cc 03 01 01 ce |......0.........|
000000e0: 03 02 0d d2 03 03 0d 08 ec 05 c2 03 e4 29 c2 00 |.............)..|
000000f0: e3 68 00 00 42 3d 00 00 00 c2 01 11 1e 44 ea 00 |.h..B=.......D..|
00000100: 00 00 0e 39 9d 00 00 00 43 67 00 00 00 68 00 00 |...9....Cg...h..|
00000110: 42 3d 00 00 00 04 eb 00 00 00 0b c2 02 4e 43 00 |B=...........NC.|
00000120: 00 00 09 4e 41 00 00 00 0a 4e 3f 00 00 00 24 03 |...NA....N?...$.|
00000130: 00 0e 68 00 00 11 bf 2a 21 01 00 e5 63 00 00 68 |..h....*!...c..h|
00000140: 00 00 cb c2 04 e6 39 9d 00 00 00 43 62 00 00 00 |......9....Cb...|
00000150: 68 03 00 64 00 00 24 02 00 0e 68 03 00 39 9d 00 |h..d..$...h..9..|
00000160: 00 00 43 ec 00 00 00 64 00 00 42 3d 00 00 00 24 |..C....d..B=...$|
00000170: 01 00 11 1e 44 3d 00 00 00 0e 68 03 00 42 3d 00 |....D=....h..B=.|
00000180: 00 00 68 03 00 11 1e 44 3e 00 00 00 0e 06 2f c8 |..h....D>...../.|
00000190: 03 1c 00 00 27 04 14 00 00 0a 09 03 00 08 14 04 |....'...........|
000001a0: 00 2f 12 3e 11 41 11 50 27 08 17 53 10 03 00 0c |./.>.A.P'..S....|
000001b0: 41 06 01 ca 03 01 00 01 03 00 00 16 01 da 03 00 |A...............|
000001c0: 01 00 d3 11 f4 ec 06 0e b7 d7 ee 02 0e 08 d3 11 |................|
000001d0: 1e 44 42 00 00 00 0e 29 c8 03 0a 02 02 02 2c 3a |.DB....)......,:|
000001e0: 27 07 1a 11 11 00 0c 41 06 01 d4 03 01 00 01 03 |'......A........|
000001f0: 00 00 23 01 dc 03 00 01 00 d3 11 f4 ec 06 0e b8 |..#.............|
00000200: d7 ee 02 0e 08 11 42 42 00 00 00 d3 9f 11 1e 44 |......BB.......D|
00000210: 42 00 00 00 0e 08 42 42 00 00 00 28 c8 03 12 05 |B.....BB...(....|
00000220: 02 02 22 3a 1d 0c 08 1b 14 07 05 30 07 07 08 1b |..":.......0....|
00000230: 15 00 0c 43 06 01 d6 03 00 00 00 01 00 00 07 00 |...C............|
00000240: 08 42 42 00 00 00 28 c8 03 08 0a 02 03 12 07 08 |.BB...(.........|
00000250: 1b 15 00 0c 41 06 01 cc 03 01 00 01 03 01 00 14 |....A...........|
00000260: 01 da 03 00 01 00 ca 03 00 0c d3 11 f4 ec 06 0e |................|
00000270: b7 d7 ee 02 0e 68 00 00 11 d3 21 01 00 28 c8 03 |.....h....!..(..|
00000280: 0c 0f 00 02 50 3a 35 11 15 07 26 07 01 00 0c 43 |....P:5...&....C|
00000290: 06 01 d2 03 00 00 00 04 00 00 11 00 39 e8 00 00 |............9...|
000002a0: 00 43 ef 00 00 00 08 b7 24 02 00 0e 29 c8 03 04 |.C......$...)...|
000002b0: 16 02 03 04 00                                  |.....|
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