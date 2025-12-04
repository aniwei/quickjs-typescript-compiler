# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/module-exports-class.ts
**生成时间**: 2025-12-04T09:25:35.755Z

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
    "remaining": 557
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

共发现 467 个字节差异:

- 偏移量 0xa6: TS=0x06 vs WASM=0x04
- 偏移量 0xa8: TS=0x04 vs WASM=0x03
- 偏移量 0xab: TS=0x4b vs WASM=0x53
- 偏移量 0xac: TS=0x06 vs WASM=0x04
- 偏移量 0xaf: TS=0x01 vs WASM=0x02
- 偏移量 0xb1: TS=0x70 vs WASM=0x30
- 偏移量 0xb2: TS=0xcc vs WASM=0xf0
- 偏移量 0xb3: TS=0x03 vs WASM=0x01
- 偏移量 0xb4: TS=0x01 vs WASM=0x03
- 偏移量 0xb6: TS=0x20 vs WASM=0x70
- 偏移量 0xb7: TS=0xce vs WASM=0xd0
- 偏移量 0xb9: TS=0x01 vs WASM=0x04
- 偏移量 0xba: TS=0x02 vs WASM=0x00
- 偏移量 0xbc: TS=0xd0 vs WASM=0xf0
- 偏移量 0xbd: TS=0x03 vs WASM=0x01
- 偏移量 0xbe: TS=0x01 vs WASM=0x05
- 偏移量 0xc0: TS=0x30 vs WASM=0x70
- 偏移量 0xc1: TS=0xf0 vs WASM=0xca
- 偏移量 0xc2: TS=0x01 vs WASM=0x03
- 偏移量 0xc3: TS=0x03 vs WASM=0x00
- ... (显示前20个差异，总共467个)

## 十六进制转储对比

### TypeScript
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
000000a0: 20 06 01 a4 01 00 06 00 04 04 05 4b 06 ca 03 01 | ..........K....|
000000b0: 00 70 cc 03 01 01 20 ce 03 01 02 30 d0 03 01 03 |.p.... ....0....|
000000c0: 30 f0 01 03 00 70 f0 01 05 00 30 ca 03 00 0d cc |0....p....0.....|
000000d0: 03 01 01 ce 03 02 0d d0 03 03 0d 08 ec 05 c2 00 |................|
000000e0: e4 29 63 04 00 06 c2 01 58 e5 00 00 00 00 c2 02 |.)c.....X.......|
000000f0: 56 e9 00 00 00 00 c2 03 56 ea 00 00 00 01 06 5b |V.......V......[|
00000100: 04 00 0e cf e3 68 00 00 11 bf 2a 21 01 00 e5 63 |.....h....*!...c|
00000110: 05 00 68 00 00 c2 04 58 e8 00 00 00 01 06 5b 05 |..h....X......[.|
00000120: 00 0e d2 e6 06 2f c8 03 08 00 00 00 2e 2a 42 45 |...../.......*BE|
00000130: 16 00 0c 43 06 01 cc 03 01 01 01 03 01 00 0e 02 |...C............|
00000140: d6 03 00 01 00 e6 01 00 00 00 ca 03 00 0d 0c 03 |................|
00000150: 5b 00 00 68 00 00 11 d3 21 01 00 28 c8 03 08 11 |[..h....!..(....|
00000160: 00 03 1a 16 10 16 25 00 0c 4a 06 01 ca 03 01 04 |......%..J......|
00000170: 01 03 01 00 2c 05 d6 03 00 01 00 ea 01 00 00 00 |....,...........|
00000180: e8 01 00 00 00 e6 01 00 00 00 10 00 00 00 f0 01 |................|
00000190: 04 0d 0c 04 5b 00 00 0c 02 5b 01 00 0c 03 5b 02 |....[....[....[.|
000001a0: 00 08 5b 03 00 2b 68 00 00 11 ec 0c ca 1b 24 00 |..[..+h.......$.|
000001b0: 00 0e 08 d3 11 18 44 42 00 00 00 0e 06 28 c8 03 |......DB.....(..|
000001c0: 06 03 02 62 04 07 1a 00 0c 0a 07 01 d2 03 01 03 |...b............|
000001d0: 01 03 00 00 23 04 d8 03 00 01 00 ea 01 00 00 00 |....#...........|
000001e0: e8 01 00 00 00 10 00 00 00 0c 04 5b 00 00 0c 02 |...........[....|
000001f0: 5b 01 00 08 5b 02 00 08 11 42 42 00 00 00 d3 9f |[...[....BB.....|
00000200: 44 42 00 00 00 08 42 42 00 00 00 28 c8 03 0e 07 |DB....BB...(....|
00000210: 02 03 04 0c 08 1b 14 07 05 26 00 1b 15 00 0c 0a |.........&......|
00000220: 07 01 d4 03 00 03 00 01 00 00 15 03 ea 01 00 00 |................|
00000230: 00 e8 01 00 00 00 10 00 00 00 0c 04 5b 00 00 0c |............[...|
00000240: 02 5b 01 00 08 5b 02 00 08 42 42 00 00 00 28 c8 |.[...[...BB...(.|
00000250: 03 06 0c 02 08 1a 1b 15 00 0c ce 06 01 d0 03 00 |................|
00000260: 04 00 03 01 00 2f 04 ea 01 00 00 00 e8 01 00 00 |...../..........|
00000270: 00 e6 01 00 00 00 10 00 00 20 f0 01 04 0d 0c 04 |......... ......|
00000280: 5b 00 00 0c 02 5b 01 00 0c 03 5b 02 00 63 03 00 |[....[....[..c..|
00000290: 2c 68 00 00 11 ec 0c 64 03 00 1b 24 00 00 0e c8 |,h.....d...$....|
000002a0: 35 c9 b7 21 01 00 11 66 03 00 0e 06 28 c8 03 04 |5..!...f....(...|
000002b0: 18 02 62 04 00                                  |..b..|
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