# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-static-block.ts
**生成时间**: 2025-12-22T18:56:13.612Z

## 大小对比

- TypeScript编译器: 630 字节
- WASM编译器: 642 字节
- 差异: -12 字节 (-1.87%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 23
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 27
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 35
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 39
    },
    {
      "index": 7,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-block.js",
      "offset": 45
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
    "tag": "0xc",
    "remaining": 529
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 23
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 27
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 35
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 39
    },
    {
      "index": 7,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-block.js",
      "offset": 45
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
    "tag": "0xc",
    "remaining": 541
  }
}
```

## 字节级差异

共发现 430 个字节差异:

- 偏移量 0x6c: TS=0x04 vs WASM=0x05
- 偏移量 0x73: TS=0x04 vs WASM=0x05
- 偏移量 0x82: TS=0x70 vs WASM=0x75
- 偏移量 0x83: TS=0xf0 vs WASM=0xcc
- 偏移量 0x84: TS=0x01 vs WASM=0x03
- 偏移量 0x87: TS=0x70 vs WASM=0x36
- 偏移量 0x88: TS=0x40 vs WASM=0xf0
- 偏移量 0x89: TS=0xe4 vs WASM=0x01
- 偏移量 0x8a: TS=0x00 vs WASM=0x03
- 偏移量 0x8b: TS=0x00 vs WASM=0x04
- 偏移量 0x8c: TS=0x00 vs WASM=0x70
- 偏移量 0x8d: TS=0x80 vs WASM=0x40
- 偏移量 0x8e: TS=0x3f vs WASM=0xe4
- 偏移量 0x8f: TS=0xe4 vs WASM=0x00
- 偏移量 0x92: TS=0x00 vs WASM=0x80
- 偏移量 0x93: TS=0x82 vs WASM=0x3f
- 偏移量 0x94: TS=0x63 vs WASM=0xe4
- 偏移量 0x95: TS=0x01 vs WASM=0x00
- 偏移量 0x97: TS=0x06 vs WASM=0x00
- 偏移量 0x98: TS=0x63 vs WASM=0x82
- ... (显示前20个差异，总共430个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 0a 23 62 75 6d 70 06 69 6e 63 0e 63 6f 6e 73 |t.#bump.inc.cons|
00000020: 6f 6c 65 06 6c 6f 67 0a 6c 61 62 65 6c 50 5f 5f |ole.log.labelP__|
00000030: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000040: 2f 63 6c 61 73 73 2d 73 74 61 74 69 63 2d 62 6c |/class-static-bl|
00000050: 6f 63 6b 2e 6a 73 0e 63 6f 75 6e 74 65 72 0c 62 |ock.js.counter.b|
00000060: 6f 6f 74 65 64 0c 00 06 00 a4 01 00 04 00 04 00 |ooted...........|
00000070: 05 b1 01 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 |.............0..|
00000080: 03 02 70 f0 01 03 03 70 40 e4 00 00 00 80 3f e4 |..p....p@.....?.|
00000090: 00 00 00 82 63 01 00 06 63 03 00 63 02 00 c1 03 |....c...c..c....|
000000a0: 58 e4 00 00 00 00 1b 05 e5 00 00 00 cd 1b 1b 1b |X...............|
000000b0: 1b c2 00 52 4f e6 00 00 00 3b e6 00 00 00 1b 1b |...RO....;......|
000000c0: c2 01 56 e7 00 00 00 00 1b 1b c2 02 56 42 00 00 |..V.........VB..|
000000d0: 00 01 1b 06 ce 0e 11 11 2e d0 11 c2 04 52 24 00 |.............R$.|
000000e0: 00 0e 6b 03 00 6b 02 00 3b e4 00 00 00 39 e8 00 |..k..k..;....9..|
000000f0: 00 00 43 e9 00 00 00 39 e4 00 00 00 42 ea 00 00 |..C....9....B...|
00000100: 00 24 01 00 cb 39 e8 00 00 00 43 e9 00 00 00 39 |.$...9....C....9|
00000110: e4 00 00 00 43 e7 00 00 00 24 00 00 24 01 00 cb |....C....$..$...|
00000120: 39 e8 00 00 00 43 e9 00 00 00 39 e4 00 00 00 42 |9....C....9....B|
00000130: 42 00 00 00 24 01 00 cf 28 d6 03 24 00 00 00 65 |B...$...(..$...e|
00000140: 24 00 1b 0e 1b 0a 1b 0e 1b 0f 17 15 1b 0e 1b 0a |$...............|
00000150: 1b 0e 1b 08 11 17 17 15 1b 0e 1b 0a 1b 0e 1b 0f |................|
00000160: 00 0c 4a 07 01 00 00 01 00 03 00 00 11 01 10 00 |..J.............|
00000170: 01 00 08 cb c7 43 e5 00 00 00 b8 9f 15 44 e5 00 |.....C.......D..|
00000180: 00 00 29 d6 03 06 07 04 0d 08 07 18 00 0c 42 07 |..)...........B.|
00000190: 01 00 00 01 00 02 00 00 13 01 10 00 01 00 08 cb |................|
000001a0: c7 43 e6 00 00 00 24 00 00 0e c7 42 e5 00 00 00 |.C....$....B....|
000001b0: 28 d6 03 0c 0a 04 0d 08 07 08 1b 0c 1c 02 1b 15 |(...............|
000001c0: 00 0c 42 07 01 00 00 01 00 01 00 00 09 01 10 00 |..B.............|
000001d0: 01 00 08 cb c7 42 e5 00 00 00 28 d6 03 06 0e 04 |.....B....(.....|
000001e0: 12 1e 1b 15 00 0c 40 05 01 00 00 01 00 02 01 00 |......@.........|
000001f0: 0f 01 10 00 01 00 f0 01 03 0d 08 cb 2b 68 00 00 |............+h..|
00000200: 11 ec 06 c7 1b 24 00 00 29 d6 03 02 11 00 00 0c |.....$..).......|
00000210: 40 05 01 00 00 01 00 05 01 01 1b 01 10 00 01 40 |@..............@|
00000220: ca 03 02 0d 08 cb 09 c7 68 00 00 b7 47 c7 04 ec |........h...G...|
00000230: 00 00 00 4e ea 00 00 00 c7 c2 00 24 00 00 29 d6 |...N.......$..).|
00000240: 03 02 00 00 00 0c 42 07 01 00 00 00 00 02 01 00 |......B.........|
00000250: 13 00 10 00 01 df b8 44 e5 00 00 00 df 04 ed 00 |.......D........|
00000260: 00 00 44 ea 00 00 00 29 d6 03 0a 03 04 03 08 07 |..D....)........|
00000270: 08 21 07 07 08 00                               |.!....|
```

### WASM
```
00000000: 05 0a 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 0a 23 62 75 6d 70 06 69 6e 63 0e 63 6f 6e 73 |t.#bump.inc.cons|
00000020: 6f 6c 65 06 6c 6f 67 0a 6c 61 62 65 6c 50 5f 5f |ole.log.labelP__|
00000030: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000040: 2f 63 6c 61 73 73 2d 73 74 61 74 69 63 2d 62 6c |/class-static-bl|
00000050: 6f 63 6b 2e 6a 73 0e 63 6f 75 6e 74 65 72 0c 62 |ock.js.counter.b|
00000060: 6f 6f 74 65 64 0c 00 06 00 a4 01 00 05 00 04 00 |ooted...........|
00000070: 05 b1 01 05 a6 01 00 00 00 c8 03 02 00 30 ca 03 |.............0..|
00000080: 03 02 75 cc 03 03 03 36 f0 01 03 04 70 40 e4 00 |..u....6....p@..|
00000090: 00 00 80 3f e4 00 00 00 82 63 01 00 06 63 04 00 |...?.....c...c..|
000000a0: 63 03 00 63 02 00 c1 03 58 e4 00 00 00 00 1b 05 |c..c....X.......|
000000b0: e5 00 00 00 cd 1b 1b 1b 1b c2 00 52 4f e6 00 00 |...........RO...|
000000c0: 00 ce 1b 1b c2 01 56 e7 00 00 00 00 1b 1b c2 02 |......V.........|
000000d0: 56 42 00 00 00 01 1b 06 c5 04 0e 11 11 2e d0 11 |VB..............|
000000e0: c2 04 52 24 00 00 0e 6b 04 00 6b 02 00 3b e4 00 |..R$...k..k..;..|
000000f0: 00 00 39 e8 00 00 00 43 e9 00 00 00 39 e4 00 00 |..9....C....9...|
00000100: 00 42 ea 00 00 00 24 01 00 cb 39 e8 00 00 00 43 |.B....$...9....C|
00000110: e9 00 00 00 39 e4 00 00 00 43 e7 00 00 00 24 00 |....9....C....$.|
00000120: 00 24 01 00 cb 39 e8 00 00 00 43 e9 00 00 00 39 |.$...9....C....9|
00000130: e4 00 00 00 42 42 00 00 00 24 01 00 cf 28 d6 03 |....BB...$...(..|
00000140: 24 00 00 00 65 24 00 1b 0e 1b 0a 1b 0e 1b 0f 17 |$...e$..........|
00000150: 15 1b 0e 1b 0a 1b 0e 1b 08 11 17 17 15 1b 0e 1b |................|
00000160: 0a 1b 0e 1b 0f 00 0c 4a 07 01 00 00 01 00 04 01 |.......J........|
00000170: 00 0c 01 10 00 01 00 ca 03 02 0d 08 cb c7 11 df |................|
00000180: 45 b8 9f 15 df 46 29 d6 03 08 07 0b 0d 05 07 08 |E....F).........|
00000190: 16 10 00 0c 42 07 01 00 00 01 00 02 02 00 0d 01 |....B...........|
000001a0: 10 00 01 00 cc 03 03 0d ca 03 02 0d 08 cb c7 df |................|
000001b0: 2d 24 00 00 0e c7 e0 45 28 d6 03 0c 0a 0b 0d 05 |-$.....E(.......|
000001c0: 07 08 0c 0c 1c 02 0c 15 00 0c 42 07 01 00 00 01 |..........B.....|
000001d0: 00 02 01 00 06 01 10 00 01 00 ca 03 02 0d 08 cb |................|
000001e0: c7 df 45 28 d6 03 06 0e 0b 12 10 0c 15 00 0c 40 |..E(...........@|
000001f0: 05 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 |................|
00000200: 01 04 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 |.....+h.......$.|
00000210: 00 29 d6 03 02 11 00 00 0c 40 05 01 00 00 01 00 |.).......@......|
00000220: 04 01 01 1b 01 10 00 01 40 ca 03 02 0d 08 cb c7 |........@.......|
00000230: 68 00 00 b7 47 c7 04 ec 00 00 00 4e ea 00 00 00 |h...G......N....|
00000240: c2 00 c7 1b 24 00 00 29 d6 03 02 00 00 00 0c 42 |....$..).......B|
00000250: 05 01 00 00 00 00 04 02 00 12 00 10 00 01 ca 03 |................|
00000260: 00 0c df b8 15 e0 46 0e df 04 ed 00 00 00 44 ea |......F.......D.|
00000270: 00 00 00 29 d6 03 0a 03 0b 03 05 07 08 1c 07 07 |...)............|
00000280: 08 00                                           |..|
```