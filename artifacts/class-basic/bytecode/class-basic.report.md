# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-basic.ts
**生成时间**: 2025-12-05T12:54:23.839Z

## 大小对比

- TypeScript编译器: 528 字节
- WASM编译器: 402 字节
- 差异: 126 字节 (31.34%)

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
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 120
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "move",
      "offset": 122
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 127
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 135
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 139
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 141
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dx",
      "offset": 143
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dy",
      "offset": 146
    }
  ],
  "functionHeader": {
    "offset": 149,
    "tag": "0xd",
    "remaining": 379
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "move",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 70
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dx",
      "offset": 74
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dy",
      "offset": 77
    }
  ],
  "functionHeader": {
    "offset": 80,
    "tag": "0xd",
    "remaining": 322
  }
}
```

## 字节级差异

共发现 484 个字节差异:

- 偏移量 0x2: TS=0xdc vs WASM=0x54
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
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共484个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6c 61 73 73 2d 62 61 73 69 63 2e |res/class-basic.|
00000070: 6a 73 0a 50 6f 69 6e 74 02 70 08 6d 6f 76 65 0e |js.Point.p.move.|
00000080: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 02 79 04 |console.log.x.y.|
00000090: 64 78 04 64 79 0d c8 03 00 00 00 00 00 0c 20 06 |dx.dy......... .|
000000a0: 01 a4 01 00 03 00 03 03 03 57 03 ca 03 01 00 00 |.........W......|
000000b0: f0 01 02 00 00 cc 03 00 00 00 ca 03 00 01 f0 01 |................|
000000c0: 01 01 cc 03 02 01 08 6c 4f 00 00 00 06 02 01 00 |.......lO.......|
000000d0: 00 00 58 e5 00 00 00 00 c2 00 56 e7 00 00 00 00 |..X.......V.....|
000000e0: 03 02 00 00 00 52 5b 01 00 0e 11 e3 51 df b8 b9 |.....R[.....Q...|
000000f0: 21 02 00 e5 e1 43 e7 00 00 00 ba bb 24 02 00 0e |!....C......$...|
00000100: 39 e8 00 00 00 43 e9 00 00 00 e1 42 ea 00 00 00 |9....C.....B....|
00000110: e1 42 eb 00 00 00 24 02 00 0e 29 06 2f c8 03 01 |.B....$...)./...|
00000120: 0c 00 27 0b 00 00 02 00 0d 01 00 10 01 00 0c 00 |..'.............|
00000130: 04 00 ce 03 02 01 02 03 00 00 2f 03 d8 03 00 00 |........../.....|
00000140: 00 da 03 00 00 00 10 00 00 00 c7 42 ea 00 00 00 |...........B....|
00000150: d3 9f c7 42 ea 00 00 00 d3 9f c7 1b 44 ea 00 00 |...B........D...|
00000160: 00 c7 42 eb 00 00 00 d4 9f c7 42 eb 00 00 00 d4 |..B.......B.....|
00000170: 9f c7 1b 44 eb 00 00 00 29 c8 03 01 12 00 00 07 |...D....).......|
00000180: 00 00 01 00 10 7f 00 07 01 00 00 01 00 10 7f 00 |................|
00000190: 0c 00 04 00 ca 03 02 01 02 03 00 00 28 03 d4 03 |............(...|
000001a0: 00 00 00 d6 03 00 00 00 10 00 00 00 08 cb 2b 39 |..............+9|
000001b0: 78 00 00 00 11 6c 06 00 00 00 c7 1b 24 00 00 0e |x....l......$...|
000001c0: 0e d3 d3 c7 1b 44 ea 00 00 00 d4 d4 c7 1b 44 eb |.....D........D.|
000001d0: 00 00 00 29 c8 03 01 12 00 15 03 00 00 01 00 02 |...)............|
000001e0: 7f 00 07 01 00 00 01 00 02 7f 00 0c 00 04 00 00 |................|
000001f0: 00 01 00 03 00 00 0f 01 10 00 00 00 c7 06 4e ea |..............N.|
00000200: 00 00 00 c7 06 4e eb 00 00 00 29 c8 03 01 00 00 |.....N....).....|
```

### WASM
```
00000000: 05 0a 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 0a 50 6f |lass-basic.js.Po|
00000030: 69 6e 74 02 70 08 6d 6f 76 65 0e 63 6f 6e 73 6f |int.p.move.conso|
00000040: 6c 65 06 6c 6f 67 02 78 02 79 04 64 78 04 64 79 |le.log.x.y.dx.dy|
00000050: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 |......... ......|
00000060: 00 04 02 02 5b 02 ca 03 02 00 30 f0 01 03 01 70 |....[.....0....p|
00000070: ca 03 00 09 cc 03 01 0d 08 ec 02 29 63 00 00 06 |...........)c...|
00000080: 63 01 00 c1 00 58 e5 00 00 00 00 c2 01 56 e7 00 |c....X.......V..|
00000090: 00 00 00 06 cc 0e cf 6b 01 00 e3 68 00 00 11 b8 |.......k...h....|
000000a0: b9 21 02 00 e4 68 01 00 43 e7 00 00 00 ba bb 24 |.!...h..C......$|
000000b0: 02 00 0e 39 e8 00 00 00 43 e9 00 00 00 68 01 00 |...9....C....h..|
000000c0: 42 ea 00 00 00 68 01 00 42 eb 00 00 00 24 02 00 |B....h..B....$..|
000000d0: 0e 06 2f c8 03 1c 00 00 00 23 14 1c 20 0a 17 25 |../......#.. ..%|
000000e0: 11 02 25 0a 17 0b 1b 0e 1b 0a 11 02 1b 08 11 02 |..%.............|
000000f0: 1b 0d 00 0c 42 07 01 00 02 01 02 02 01 00 1e 03 |....B...........|
00000100: d4 03 00 01 00 d6 03 00 01 00 10 00 01 00 f0 01 |................|
00000110: 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
00000120: 0e c7 d3 44 ea 00 00 00 c7 d4 44 eb 00 00 00 29 |...D......D....)|
00000130: c8 03 0a 01 04 4e 08 07 12 21 11 07 12 00 0c 42 |.....N...!.....B|
00000140: 07 01 00 02 01 02 03 00 00 1f 03 d8 03 00 01 00 |................|
00000150: da 03 00 01 00 10 00 01 00 08 cb c7 c7 42 ea 00 |.............B..|
00000160: 00 00 d3 9f 44 ea 00 00 00 c7 c7 42 eb 00 00 00 |....D......B....|
00000170: d4 9f 44 eb 00 00 00 29 c8 03 16 05 04 0d 08 07 |..D....)........|
00000180: 08 07 12 1b 0a 07 03 21 1f 07 08 07 12 1b 0a 07 |.......!........|
00000190: 03 00                                           |..|
```