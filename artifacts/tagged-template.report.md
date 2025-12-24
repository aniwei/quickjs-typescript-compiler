# 字节码分析报告

**输入文件**: __tests__/fixtures/tagged-template.ts
**生成时间**: 2025-12-24T08:32:47.291Z

## 大小对比

- TypeScript编译器: 400 字节
- WASM编译器: 453 字节
- 差异: -53 字节 (-11.70%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r3",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template.js",
      "offset": 21
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xc",
    "remaining": 333
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r3",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template.js",
      "offset": 21
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xc",
    "remaining": 386
  }
}
```

## 字节级差异

共发现 244 个字节差异:

- 偏移量 0x4e: TS=0x04 vs WASM=0x05
- 偏移量 0x4f: TS=0xb4 vs WASM=0xbc
- 偏移量 0xa2: TS=0x3b vs WASM=0xc2
- 偏移量 0xa3: TS=0xe5 vs WASM=0x01
- 偏移量 0xa4: TS=0x00 vs WASM=0x56
- 偏移量 0xa5: TS=0x00 vs WASM=0xe4
- 偏移量 0xa7: TS=0xb8 vs WASM=0x00
- 偏移量 0xa8: TS=0x3b vs WASM=0x00
- 偏移量 0xa9: TS=0xe6 vs WASM=0x04
- 偏移量 0xaa: TS=0x00 vs WASM=0x3b
- 偏移量 0xab: TS=0x00 vs WASM=0xe5
- 偏移量 0xad: TS=0x39 vs WASM=0x00
- 偏移量 0xae: TS=0xe4 vs WASM=0x00
- 偏移量 0xaf: TS=0x00 vs WASM=0xb8
- 偏移量 0xb0: TS=0x00 vs WASM=0x3b
- 偏移量 0xb1: TS=0x00 vs WASM=0xe6
- 偏移量 0xb2: TS=0xc1 vs WASM=0x00
- 偏移量 0xb3: TS=0x01 vs WASM=0x00
- 偏移量 0xb4: TS=0x39 vs WASM=0x00
- 偏移量 0xb5: TS=0xe6 vs WASM=0x39
- ... (显示前20个差异，总共244个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 06 74 61 67 06 6f 62 6a 02 61 04 72 31 04 |...tag.obj.a.r1.|
00000010: 72 32 04 72 33 4a 5f 5f 74 65 73 74 73 5f 5f 2f |r2.r3J__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 74 61 67 67 65 64 2d |fixtures/tagged-|
00000030: 74 65 6d 70 6c 61 74 65 2e 6a 73 0e 73 74 72 69 |template.js.stri|
00000040: 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 00 04 b4 |ngs.............|
00000050: 01 01 a6 01 00 00 00 40 e4 00 00 00 40 40 e5 00 |.......@....@@..|
00000060: 00 00 80 40 e6 00 00 00 80 40 e7 00 00 00 80 40 |...@.....@.....@|
00000070: e8 00 00 00 80 40 e9 00 00 00 80 c2 00 41 e4 00 |.....@.......A..|
00000080: 00 00 00 3f e5 00 00 00 80 3f e6 00 00 00 80 3f |...?.....?.....?|
00000090: e7 00 00 00 80 3f e8 00 00 00 80 3f e9 00 00 00 |.....?.....?....|
000000a0: 80 0b 3b e5 00 00 00 b8 3b e6 00 00 00 39 e4 00 |..;.....;....9..|
000000b0: 00 00 c1 01 39 e6 00 00 00 f2 3b e7 00 00 00 39 |....9.....;....9|
000000c0: e5 00 00 00 43 e4 00 00 00 c1 02 39 e6 00 00 00 |....C......9....|
000000d0: 24 02 00 3b e8 00 00 00 39 e5 00 00 00 04 e4 00 |$..;....9.......|
000000e0: 00 00 49 c1 03 39 e6 00 00 00 24 02 00 3b e9 00 |..I..9....$..;..|
000000f0: 00 00 39 e7 00 00 00 0e 06 cb 39 e8 00 00 00 0e |..9.......9.....|
00000100: 06 cb 39 e9 00 00 00 0e 06 cf 28 d4 03 20 00 00 |..9.......(.. ..|
00000110: 00 56 14 16 25 10 1b 07 21 07 1b 06 25 12 1b 07 |.V..%...!...%...|
00000120: 2b 0f 34 06 11 18 1b 07 2b 21 2b 00 2b 00 00 0c |+.4.....+!+.+...|
00000130: 41 06 00 c8 03 02 00 01 02 00 00 0a 02 d6 03 00 |A...............|
00000140: 01 00 da 01 00 01 00 0d 01 00 d8 d3 d4 26 02 00 |.............&..|
00000150: 28 d4 03 08 01 00 17 18 07 12 16 21 00 0b 02 07 |(..........!....|
00000160: 02 78 07 02 79 0b 02 07 02 78 07 02 79 02 0b 02 |.x..y....x..y...|
00000170: 07 02 6d 07 02 6e 0b 02 07 02 6d 07 02 6e 02 0b |..m..n....m..n..|
00000180: 02 07 02 70 07 02 71 0b 02 07 02 70 07 02 71 02 |...p..q....p..q.|
```

### WASM
```
00000000: 05 08 06 74 61 67 06 6f 62 6a 02 61 04 72 31 04 |...tag.obj.a.r1.|
00000010: 72 32 04 72 33 4a 5f 5f 74 65 73 74 73 5f 5f 2f |r2.r3J__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 74 61 67 67 65 64 2d |fixtures/tagged-|
00000030: 74 65 6d 70 6c 61 74 65 2e 6a 73 0e 73 74 72 69 |template.js.stri|
00000040: 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 00 05 bc |ngs.............|
00000050: 01 01 a6 01 00 00 00 40 e4 00 00 00 40 40 e5 00 |.......@....@@..|
00000060: 00 00 80 40 e6 00 00 00 80 40 e7 00 00 00 80 40 |...@.....@.....@|
00000070: e8 00 00 00 80 40 e9 00 00 00 80 c2 00 41 e4 00 |.....@.......A..|
00000080: 00 00 00 3f e5 00 00 00 80 3f e6 00 00 00 80 3f |...?.....?.....?|
00000090: e7 00 00 00 80 3f e8 00 00 00 80 3f e9 00 00 00 |.....?.....?....|
000000a0: 80 0b c2 01 56 e4 00 00 00 04 3b e5 00 00 00 b8 |....V.....;.....|
000000b0: 3b e6 00 00 00 39 e4 00 00 00 c1 02 39 e6 00 00 |;....9......9...|
000000c0: 00 f2 3b e7 00 00 00 39 e5 00 00 00 43 e4 00 00 |..;....9....C...|
000000d0: 00 c1 03 39 e6 00 00 00 24 02 00 3b e8 00 00 00 |...9....$..;....|
000000e0: 39 e5 00 00 00 04 e4 00 00 00 49 c1 04 39 e6 00 |9.........I..9..|
000000f0: 00 00 24 02 00 3b e9 00 00 00 39 e7 00 00 00 0e |..$..;....9.....|
00000100: 06 cb 39 e8 00 00 00 0e 06 cb 39 e9 00 00 00 0e |..9.......9.....|
00000110: 06 cf 28 d4 03 20 00 00 00 5e 14 16 25 10 1b 07 |..(.. ...^..%...|
00000120: 21 07 1b 06 25 12 1b 07 2b 0f 34 06 11 18 1b 07 |!...%...+.4.....|
00000130: 2b 21 2b 00 2b 00 00 0c 41 06 00 c8 03 02 00 01 |+!+.+...A.......|
00000140: 02 00 00 0a 02 d6 03 00 01 00 da 01 00 01 00 0d |................|
00000150: 01 00 d8 d3 d4 26 02 00 28 d4 03 08 01 00 17 18 |.....&..(.......|
00000160: 07 12 16 21 00 0c 40 07 00 00 02 00 01 02 00 00 |...!..@.........|
00000170: 0a 02 d6 03 00 01 00 da 01 00 01 00 0d 01 00 d8 |................|
00000180: d3 d4 26 02 00 28 d4 03 08 05 04 17 18 07 12 16 |..&..(..........|
00000190: 21 00 0b 02 07 02 78 07 02 79 0b 02 07 02 78 07 |!.....x..y....x.|
000001a0: 02 79 02 0b 02 07 02 6d 07 02 6e 0b 02 07 02 6d |.y.....m..n....m|
000001b0: 07 02 6e 02 0b 02 07 02 70 07 02 71 0b 02 07 02 |..n.....p..q....|
000001c0: 70 07 02 71 02                                  |p..q.|
```