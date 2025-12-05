# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/class-basic.ts
**生成时间**: 2025-12-05T07:19:57.051Z

## 大小对比

- TypeScript编译器: 369 字节
- WASM编译器: 402 字节
- 差异: -33 字节 (-8.21%)

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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "move",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 70
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dx",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dy",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xd",
    "remaining": 291
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

共发现 316 个字节差异:

- 偏移量 0x1: TS=0x09 vs WASM=0x0a
- 偏移量 0x33: TS=0x08 vs WASM=0x02
- 偏移量 0x34: TS=0x6d vs WASM=0x70
- 偏移量 0x35: TS=0x6f vs WASM=0x08
- 偏移量 0x36: TS=0x76 vs WASM=0x6d
- 偏移量 0x37: TS=0x65 vs WASM=0x6f
- 偏移量 0x38: TS=0x0e vs WASM=0x76
- 偏移量 0x39: TS=0x63 vs WASM=0x65
- 偏移量 0x3a: TS=0x6f vs WASM=0x0e
- 偏移量 0x3b: TS=0x6e vs WASM=0x63
- 偏移量 0x3c: TS=0x73 vs WASM=0x6f
- 偏移量 0x3d: TS=0x6f vs WASM=0x6e
- 偏移量 0x3e: TS=0x6c vs WASM=0x73
- 偏移量 0x3f: TS=0x65 vs WASM=0x6f
- 偏移量 0x40: TS=0x06 vs WASM=0x6c
- 偏移量 0x41: TS=0x6c vs WASM=0x65
- 偏移量 0x42: TS=0x6f vs WASM=0x06
- 偏移量 0x43: TS=0x67 vs WASM=0x6c
- 偏移量 0x44: TS=0x02 vs WASM=0x6f
- 偏移量 0x45: TS=0x78 vs WASM=0x67
- ... (显示前20个差异，总共316个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 0a 50 6f |lass-basic.js.Po|
00000030: 69 6e 74 08 6d 6f 76 65 0e 63 6f 6e 73 6f 6c 65 |int.move.console|
00000040: 06 6c 6f 67 02 78 02 79 04 64 78 04 64 79 0d c8 |.log.x.y.dx.dy..|
00000050: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000060: 02 02 4c 00 ca 03 00 00 da 03 01 00 08 ec 47 06 |..L...........G.|
00000070: 02 01 00 00 00 58 e5 00 00 00 00 c2 00 56 e6 00 |.....X.......V..|
00000080: 00 00 00 11 5b 00 00 51 df b8 b9 21 02 00 e4 e0 |....[..Q...!....|
00000090: 43 e6 00 00 00 ba bb 24 02 00 0e 39 e7 00 00 00 |C......$...9....|
000000a0: 43 e8 00 00 00 e0 42 e9 00 00 00 e0 42 ea 00 00 |C.....B.....B...|
000000b0: 00 24 02 00 0e 29 06 2f c8 03 01 0c 00 1c 0b 00 |.$...)./........|
000000c0: 00 02 00 0d 01 00 10 01 00 0c 00 04 00 cc 03 02 |................|
000000d0: 01 02 03 00 00 2f 03 d6 03 00 00 00 d8 03 00 00 |...../..........|
000000e0: 00 10 00 00 00 c7 42 e9 00 00 00 d3 9f c7 42 e9 |......B.......B.|
000000f0: 00 00 00 d3 9f c7 1b 44 e9 00 00 00 c7 42 ea 00 |.......D.....B..|
00000100: 00 00 d4 9f c7 42 ea 00 00 00 d4 9f c7 1b 44 ea |.....B........D.|
00000110: 00 00 00 29 c8 03 01 12 00 00 07 00 00 01 00 10 |...)............|
00000120: 7f 00 07 01 00 00 01 00 10 7f 00 0c 00 04 00 ca |................|
00000130: 03 02 01 02 03 00 00 13 03 d2 03 00 00 00 d4 03 |................|
00000140: 00 00 00 10 00 00 00 d3 d3 c7 1b 44 e9 00 00 00 |...........D....|
00000150: d4 d4 c7 1b 44 ea 00 00 00 29 c8 03 01 12 00 00 |....D....)......|
00000160: 03 00 00 01 00 02 7f 00 07 01 00 00 01 00 02 7f |................|
00000170: 00                                              |.|
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