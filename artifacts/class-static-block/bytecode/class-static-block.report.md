# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-static-block.ts
**生成时间**: 2025-12-12T09:59:18.470Z

## 大小对比

- TypeScript编译器: 352 字节
- WASM编译器: 631 字节
- 差异: -279 字节 (-44.22%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 23
    },
    {
      "index": 4,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 30
    },
    {
      "index": 5,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-block.js",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 261
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 76
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 80
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 86
    },
    {
      "index": 9,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "booted",
      "offset": 94
    }
  ],
  "functionHeader": {
    "offset": 101,
    "tag": "0xd",
    "remaining": 530
  }
}
```

## 字节级差异

共发现 578 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x0a
- 偏移量 0x2: TS=0x0c vs WASM=0x50
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x0e vs WASM=0x78
- 偏移量 0x10: TS=0x43 vs WASM=0x74
- 偏移量 0x11: TS=0x6f vs WASM=0x75
- 偏移量 0x12: TS=0x75 vs WASM=0x72
- 偏移量 0x13: TS=0x6e vs WASM=0x65
- 偏移量 0x14: TS=0x74 vs WASM=0x73
- 偏移量 0x15: TS=0x65 vs WASM=0x2f
- ... (显示前20个差异，总共578个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 0e |...<eval>._ret_.|
00000010: 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e 74 26 3c |Counter.#count&<|
00000020: 63 6c 61 73 73 5f 66 69 65 6c 64 73 5f 69 6e 69 |class_fields_ini|
00000030: 74 3e 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |t>P__tests__/fix|
00000040: 74 75 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 |tures/class-stat|
00000050: 69 63 2d 62 6c 6f 63 6b 2e 6a 73 0c 02 06 00 00 |ic-block.js.....|
00000060: 00 00 00 00 04 00 04 00 05 ad 01 04 01 00 00 00 |................|
00000070: 00 00 00 02 00 00 00 02 00 30 03 00 00 00 03 02 |.........0......|
00000080: 30 04 00 00 00 03 03 30 40 e6 00 00 00 00 b6 01 |0......0@.......|
00000090: 00 b6 02 00 06 b6 03 00 d4 03 58 e6 00 00 00 00 |..........X.....|
000000a0: 1b 05 e7 00 00 00 e0 1b 1b 1b 1b d5 00 52 4f ea |.............RO.|
000000b0: 00 00 00 3b ea 00 00 00 1b 1b d5 01 52 56 eb 00 |...;........RV..|
000000c0: 00 00 00 1b 1b d5 02 52 56 42 00 00 00 01 1b 06 |.......RVB......|
000000d0: e1 0e 11 11 2e e3 11 d5 04 24 00 00 0e b7 03 00 |.........$......|
000000e0: b7 02 00 3b e6 00 00 00 39 ec 00 00 00 43 ed 00 |...;....9....C..|
000000f0: 00 00 39 e6 00 00 00 42 e8 00 00 00 24 01 00 de |..9....B....$...|
00000100: 39 ec 00 00 00 43 ed 00 00 00 39 e6 00 00 00 43 |9....C....9....C|
00000110: eb 00 00 00 24 00 00 24 01 00 de 39 ec 00 00 00 |....$..$...9....|
00000120: 43 ed 00 00 00 39 e6 00 00 00 42 42 00 00 00 24 |C....9....BB...$|
00000130: 01 00 de da 28 05 00 00 00 20 00 00 00 26 0e 08 |....(.... ...&..|
00000140: 69 00 00 0e 08 00 00 38 08 07 3e 18 3e 17 3a 00 |i......8..>.>.:.|
00000150: 3e 18 66 17 3a 00 3e 18 3e 17 00 01 01 01 01 01 |>.f.:.>.>.......|
```

### WASM
```
00000000: 05 0a 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..P__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 |tures/class-stat|
00000020: 69 63 2d 62 6c 6f 63 6b 2e 6a 73 0e 43 6f 75 6e |ic-block.js.Coun|
00000030: 74 65 72 0c 23 63 6f 75 6e 74 0a 23 62 75 6d 70 |ter.#count.#bump|
00000040: 06 69 6e 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |.inc.console.log|
00000050: 0a 6c 61 62 65 6c 0e 63 6f 75 6e 74 65 72 0c 62 |.label.counter.b|
00000060: 6f 6f 74 65 64 0d c8 03 00 00 00 00 00 0c 20 06 |ooted......... .|
00000070: 01 a4 01 00 04 00 04 01 05 9f 01 04 ca 03 02 00 |................|
00000080: 30 cc 03 03 01 75 ce 03 03 02 36 f0 01 03 03 70 |0....u....6....p|
00000090: ca 03 00 09 08 ec 02 29 63 00 00 06 63 03 00 63 |.......)c...c..c|
000000a0: 02 00 63 01 00 c1 03 58 e5 00 00 00 00 1b 05 e6 |..c....X........|
000000b0: 00 00 00 cc 1b 1b 1b 1b c2 00 52 4f e7 00 00 00 |..........RO....|
000000c0: cd 1b 1b c2 01 56 e8 00 00 00 00 1b 1b c2 02 56 |.....V.........V|
000000d0: 42 00 00 00 01 1b 06 ce 0e 11 11 2e cf 11 c2 04 |B...............|
000000e0: 52 24 00 00 0e 6b 03 00 6b 01 00 e3 39 e9 00 00 |R$...k..k...9...|
000000f0: 00 43 ea 00 00 00 68 00 00 42 eb 00 00 00 24 01 |.C....h..B....$.|
00000100: 00 0e 39 e9 00 00 00 43 ea 00 00 00 68 00 00 43 |..9....C....h..C|
00000110: e8 00 00 00 24 00 00 24 01 00 0e 39 e9 00 00 00 |....$..$...9....|
00000120: 43 ea 00 00 00 68 00 00 42 42 00 00 00 24 01 00 |C....h..BB...$..|
00000130: 0e 06 2f c8 03 24 00 00 00 58 24 00 1b 0e 1b 0a |../..$...X$.....|
00000140: 11 0e 1b 0f 17 15 1b 0e 1b 0a 11 0e 1b 08 11 17 |................|
00000150: 17 15 1b 0e 1b 0a 11 0e 1b 0f 00 0c 4a 07 01 00 |............J...|
00000160: 00 01 00 04 01 00 0c 01 10 00 01 00 cc 03 01 0d |................|
00000170: 08 cb c7 11 df 45 b8 9f 15 df 46 29 c8 03 08 07 |.....E....F)....|
00000180: 0b 0d 05 07 08 16 10 00 0c 42 07 01 00 00 01 00 |.........B......|
00000190: 02 02 00 0d 01 10 00 01 00 ce 03 02 0d cc 03 01 |................|
000001a0: 0d 08 cb c7 df 2d 24 00 00 0e c7 e0 45 28 c8 03 |.....-$.....E(..|
000001b0: 0c 0a 0b 0d 05 07 08 0c 0c 1c 02 0c 15 00 0c 42 |...............B|
000001c0: 07 01 00 00 01 00 02 01 00 06 01 10 00 01 00 cc |................|
000001d0: 03 01 0d 08 cb c7 df 45 28 c8 03 06 0e 0b 12 10 |.......E(.......|
000001e0: 0c 15 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 |....@...........|
000001f0: 10 00 01 00 f0 01 03 0d 08 cb 2b 68 00 00 11 ec |..........+h....|
00000200: 06 c7 1b 24 00 00 29 c8 03 02 11 00 00 0c 40 05 |...$..).......@.|
00000210: 01 00 00 01 00 04 01 01 1b 01 10 00 01 40 cc 03 |.............@..|
00000220: 01 0d 08 cb c7 68 00 00 b7 47 c7 04 ec 00 00 00 |.....h...G......|
00000230: 4e eb 00 00 00 c2 00 c7 1b 24 00 00 29 c8 03 02 |N........$..)...|
00000240: 00 00 00 0c 42 05 01 00 00 00 00 04 02 00 12 00 |....B...........|
00000250: 10 00 01 cc 03 00 0c df b8 15 e0 46 0e df 04 ed |...........F....|
00000260: 00 00 00 44 eb 00 00 00 29 c8 03 0a 03 0b 03 05 |...D....).......|
00000270: 07 08 1c 07 07 08 00                            |.......|
```