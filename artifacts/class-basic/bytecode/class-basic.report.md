# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-basic.ts
**生成时间**: 2025-12-06T02:09:56.276Z

## 大小对比

- TypeScript编译器: 437 字节
- WASM编译器: 402 字节
- 差异: 35 字节 (8.71%)

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
    "remaining": 357
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

共发现 304 个字节差异:

- 偏移量 0x5f: TS=0x00 vs WASM=0x02
- 偏移量 0x61: TS=0x03 vs WASM=0x04
- 偏移量 0x62: TS=0x01 vs WASM=0x02
- 偏移量 0x63: TS=0x03 vs WASM=0x02
- 偏移量 0x64: TS=0x5a vs WASM=0x5b
- 偏移量 0x65: TS=0x00 vs WASM=0x02
- 偏移量 0x66: TS=0xcc vs WASM=0xca
- 偏移量 0x69: TS=0x0d vs WASM=0x00
- 偏移量 0x6a: TS=0x08 vs WASM=0x30
- 偏移量 0x6b: TS=0xec vs WASM=0xf0
- 偏移量 0x6c: TS=0x02 vs WASM=0x01
- 偏移量 0x6d: TS=0x29 vs WASM=0x03
- 偏移量 0x6e: TS=0x06 vs WASM=0x01
- 偏移量 0x6f: TS=0x02 vs WASM=0x70
- 偏移量 0x70: TS=0x01 vs WASM=0xca
- 偏移量 0x71: TS=0x00 vs WASM=0x03
- 偏移量 0x73: TS=0x00 vs WASM=0x09
- 偏移量 0x74: TS=0x58 vs WASM=0xcc
- 偏移量 0x75: TS=0xe5 vs WASM=0x03
- 偏移量 0x76: TS=0x00 vs WASM=0x01
- ... (显示前20个差异，总共304个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 62 61 73 69 63 2e 6a 73 0a 50 6f |lass-basic.js.Po|
00000030: 69 6e 74 02 70 08 6d 6f 76 65 0e 63 6f 6e 73 6f |int.p.move.conso|
00000040: 6c 65 06 6c 6f 67 02 78 02 79 04 64 78 04 64 79 |le.log.x.y.dx.dy|
00000050: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000060: 00 03 01 03 5a 00 cc 03 02 0d 08 ec 02 29 06 02 |....Z........)..|
00000070: 01 00 00 00 58 e5 00 00 00 00 c2 00 56 e7 00 00 |....X.......V...|
00000080: 00 00 03 02 00 00 00 52 5b 01 00 0e 11 e3 51 c7 |.......R[.....Q.|
00000090: b8 b9 21 02 00 e3 68 00 00 43 e7 00 00 00 ba bb |..!...h..C......|
000000a0: 24 02 00 0e 39 e8 00 00 00 43 e9 00 00 00 68 00 |$...9....C....h.|
000000b0: 00 42 ea 00 00 00 68 00 00 42 eb 00 00 00 24 02 |.B....h..B....$.|
000000c0: 00 0e 06 2f c8 03 00 12 00 25 0d 0e 07 06 07 03 |.../.....%......|
000000d0: 1c 69 2a 07 07 03 1c 76 34 0c 00 0c 42 06 00 ce |.i*....v4...B...|
000000e0: 03 02 01 02 03 00 00 2f 03 d8 03 00 00 00 da 03 |......./........|
000000f0: 00 00 00 10 00 00 00 c7 42 ea 00 00 00 d3 9f c7 |........B.......|
00000100: 42 ea 00 00 00 d3 9f c7 1b 44 ea 00 00 00 c7 42 |B........D.....B|
00000110: eb 00 00 00 d4 9f c7 42 eb 00 00 00 d4 9f c7 1b |.......B........|
00000120: 44 eb 00 00 00 29 c8 03 06 14 04 0c 20 09 0c 77 |D....)...... ..w|
00000130: 20 09 0c 6e 26 09 20 09 0c 77 20 09 0c 6e 00 0c | ..n&. ..w ..n..|
00000140: 42 06 00 ca 03 02 01 02 03 00 00 28 03 d4 03 00 |B..........(....|
00000150: 00 00 d6 03 00 00 00 10 00 00 00 08 cb 2b 39 78 |.............+9x|
00000160: 00 00 00 11 6c 0a 00 00 00 c7 1b 24 00 00 0e 0e |....l......$....|
00000170: d3 d3 c7 1b 44 ea 00 00 00 d4 d4 c7 1b 44 eb 00 |....D........D..|
00000180: 00 00 29 c8 03 02 08 6d 0b 0c 77 26 09 0c 77 00 |..)....m..w&..w.|
00000190: 0c 00 04 00 00 00 01 00 03 00 00 0f 01 10 00 00 |................|
000001a0: 00 c7 06 4e ea 00 00 00 c7 06 4e eb 00 00 00 29 |...N......N....)|
000001b0: c8 03 00 00 00                                  |.....|
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