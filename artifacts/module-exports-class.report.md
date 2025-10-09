# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/module-exports-class.ts
**生成时间**: 2025-10-09T19:23:32.785Z

## 大小对比

- TypeScript编译器: 445 字节
- WASM编译器: 536 字节
- 差异: -91 字节 (-16.98%)

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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "CounterImpl",
      "offset": 90
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 102
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "initial",
      "offset": 112
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "step",
      "offset": 120
    },
    {
      "index": 8,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 125
    },
    {
      "index": 9,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 126
    }
  ],
  "functionHeader": {
    "offset": 134,
    "tag": "0xd",
    "remaining": 311
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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "CounterImpl",
      "offset": 90
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 102
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "initial",
      "offset": 112
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "step",
      "offset": 120
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 125
    }
  ],
  "functionHeader": {
    "offset": 133,
    "tag": "0xd",
    "remaining": 403
  }
}
```

## 字节级差异

共发现 353 个字节差异:

- 偏移量 0x1: TS=0x0a vs WASM=0x09
- 偏移量 0x7d: TS=0x00 vs WASM=0x0e
- 偏移量 0x7e: TS=0x0e vs WASM=0x63
- 偏移量 0x7f: TS=0x63 vs WASM=0x6f
- 偏移量 0x80: TS=0x6f vs WASM=0x75
- 偏移量 0x81: TS=0x75 vs WASM=0x6e
- 偏移量 0x82: TS=0x6e vs WASM=0x74
- 偏移量 0x83: TS=0x74 vs WASM=0x65
- 偏移量 0x84: TS=0x65 vs WASM=0x72
- 偏移量 0x85: TS=0x72 vs WASM=0x0d
- 偏移量 0x86: TS=0x0d vs WASM=0xc8
- 偏移量 0x87: TS=0xc8 vs WASM=0x03
- 偏移量 0x88: TS=0x03 vs WASM=0x00
- 偏移量 0x89: TS=0x00 vs WASM=0x04
- 偏移量 0x8a: TS=0x04 vs WASM=0x00
- 偏移量 0x8b: TS=0x00 vs WASM=0x01
- 偏移量 0x8c: TS=0x01 vs WASM=0xca
- 偏移量 0x8d: TS=0xca vs WASM=0x03
- 偏移量 0x8e: TS=0x03 vs WASM=0x00
- 偏移量 0x8f: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共353个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 63 6c |odule-exports-cl|
00000030: 61 73 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 1a 63 |ass.js.Counter.c|
00000040: 72 65 61 74 65 43 6f 75 6e 74 65 72 1a 73 68 61 |reateCounter.sha|
00000050: 72 65 64 43 6f 75 6e 74 65 72 16 43 6f 75 6e 74 |redCounter.Count|
00000060: 65 72 49 6d 70 6c 12 69 6e 63 72 65 6d 65 6e 74 |erImpl.increment|
00000070: 0e 69 6e 69 74 69 61 6c 08 73 74 65 70 00 0e 63 |.initial.step..c|
00000080: 6f 75 6e 74 65 72 0d c8 03 00 04 00 01 ca 03 00 |ounter..........|
00000090: 03 cc 03 00 02 ce 03 00 02 2c 00 00 00 0c 20 06 |.........,.... .|
000000a0: 01 a4 01 00 00 00 04 04 03 3f 00 d0 03 00 01 ca |.........?......|
000000b0: 03 01 0d ce 03 02 0d cc 03 03 01 08 ec 08 c2 00 |................|
000000c0: e3 c2 02 e6 29 df 42 3d 00 00 00 c2 01 11 1e 44 |....).B=.......D|
000000d0: e9 00 00 00 0e df e4 68 01 00 11 bf 0a 21 01 00 |.......h.....!..|
000000e0: e5 68 02 00 68 02 00 43 e9 00 00 00 b9 24 01 00 |.h..h..C.....$..|
000000f0: 11 1e 44 42 00 00 00 0e 06 2f c8 03 04 00 00 37 |..DB...../.....7|
00000100: 02 00 0c 41 06 01 d0 03 01 00 01 03 00 00 16 01 |...A............|
00000110: d4 03 00 01 00 d3 11 f4 ec 06 0e b7 d7 ee 02 0e |................|
00000120: 08 d3 11 1e 44 42 00 00 00 0e 29 c8 03 02 03 01 |....DB....).....|
00000130: 00 0c 41 06 01 d8 03 01 00 01 03 00 00 23 01 d6 |..A..........#..|
00000140: 03 00 01 00 d3 11 f4 ec 06 0e b8 d7 ee 02 0e 08 |................|
00000150: 11 42 42 00 00 00 d3 9f 11 1e 44 42 00 00 00 0e |.BB.......DB....|
00000160: 08 42 42 00 00 00 28 c8 03 02 03 01 00 0c 41 06 |.BB...(.......A.|
00000170: 01 cc 03 01 01 01 03 01 00 2e 02 d4 03 00 01 00 |................|
00000180: da 03 01 00 30 ca 03 01 0c 63 00 00 d3 11 f4 ec |....0....c......|
00000190: 06 0e b7 d7 ee 02 0e 68 00 00 11 d3 21 01 00 cb |.......h....!...|
000001a0: 64 00 00 11 42 42 00 00 00 b9 9c 11 1e 44 42 00 |d...BB.......DB.|
000001b0: 00 00 0e 64 00 00 28 c8 03 02 03 01 00          |...d..(......|
```

### WASM
```
00000000: 05 09 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 63 6c |odule-exports-cl|
00000030: 61 73 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 1a 63 |ass.js.Counter.c|
00000040: 72 65 61 74 65 43 6f 75 6e 74 65 72 1a 73 68 61 |reateCounter.sha|
00000050: 72 65 64 43 6f 75 6e 74 65 72 16 43 6f 75 6e 74 |redCounter.Count|
00000060: 65 72 49 6d 70 6c 12 69 6e 63 72 65 6d 65 6e 74 |erImpl.increment|
00000070: 0e 69 6e 69 74 69 61 6c 08 73 74 65 70 0e 63 6f |.initial.step.co|
00000080: 75 6e 74 65 72 0d c8 03 00 04 00 01 ca 03 00 03 |unter...........|
00000090: cc 03 00 02 ce 03 00 04 2c 00 00 00 0c 20 06 01 |........,.... ..|
000000a0: a4 01 00 00 00 04 05 03 3f 00 d0 03 00 01 ca 03 |........?.......|
000000b0: 01 0d ce 03 02 0d cc 03 03 01 fc 01 04 09 08 ec |................|
000000c0: 08 c2 00 e3 c2 02 e6 29 df 42 3d 00 00 00 c2 01 |.......).B=.....|
000000d0: 44 e9 00 00 00 df e4 68 01 00 11 bf 0a 21 01 00 |D......h.....!..|
000000e0: e5 68 02 00 68 02 00 43 e9 00 00 00 b9 24 01 00 |.h..h..C.....$..|
000000f0: 44 42 00 00 00 68 02 00 61 04 00 06 2f c8 03 1e |DB...h..a.../...|
00000100: 00 00 00 0a 08 00 07 16 1b 14 00 07 0a 04 0e 06 |................|
00000110: 20 0e 17 41 11 2c 11 1a 20 14 00 08 12 3b 00 0c | ..A.,.. ....;..|
00000120: 41 06 01 d0 03 01 02 00 02 00 00 16 03 d4 03 00 |A...............|
00000130: 01 00 d4 03 01 ff ff ff ff 0f 20 10 00 01 00 08 |.......... .....|
00000140: cc 63 00 00 d3 11 f4 ec 04 0e b7 db cb c8 d3 44 |.c.............D|
00000150: 42 00 00 00 29 c8 03 06 00 00 49 04 07 1a 00 0c |B...).....I.....|
00000160: 41 06 01 00 01 02 00 03 00 00 22 03 d6 03 00 01 |A.........".....|
00000170: 00 d6 03 01 ff ff ff ff 0f 20 10 00 01 00 08 cc |......... ......|
00000180: 63 00 00 d3 11 f4 ec 04 0e b8 db cb c8 43 42 00 |c............CB.|
00000190: 00 00 d3 9f 44 42 00 00 00 c8 42 42 00 00 00 28 |....DB....BB...(|
000001a0: c8 03 0e 04 22 49 3f 07 08 1b 14 07 05 26 00 1b |...."I?......&..|
000001b0: 15 00 0c 41 06 01 cc 03 01 02 00 03 01 00 2b 03 |...A..........+.|
000001c0: d4 03 00 01 00 d4 03 01 ff ff ff ff 0f 20 d8 03 |............. ..|
000001d0: 02 00 30 ca 03 01 0c 63 00 00 d3 11 f4 ec 04 0e |..0....c........|
000001e0: b7 db cb 63 01 00 68 00 00 11 d3 21 01 00 cc 64 |...c..h....!...d|
000001f0: 01 00 43 42 00 00 00 b9 9c 44 42 00 00 00 64 01 |..CB.....DB...d.|
00000200: 00 28 c8 03 12 0e 07 4e 1e 16 10 07 01 17 35 11 |.(.....N......5.|
00000210: 0e 20 0e 21 0d 11 0d 00                         |. .!....|
```