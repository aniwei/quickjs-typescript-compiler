# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-fields.ts
**生成时间**: 2025-12-05T12:54:23.849Z

## 大小对比

- TypeScript编译器: 471 字节
- WASM编译器: 362 字节
- 差异: 109 字节 (30.11%)

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
      "rawLength": 222,
      "actualLength": 111,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 115
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 121
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 123
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 131
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 135
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 137
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "count",
      "offset": 139
    }
  ],
  "functionHeader": {
    "offset": 145,
    "tag": "0xd",
    "remaining": 326
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "count",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 72
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 286
  }
}
```

## 字节级差异

共发现 433 个字节差异:

- 偏移量 0x2: TS=0xde vs WASM=0x56
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
- ... (显示前20个差异，总共433个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 de 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6c 61 73 73 2d 66 69 65 6c 64 73 |res/class-fields|
00000070: 2e 6a 73 0a 50 6f 69 6e 74 02 70 0e 63 6f 6e 73 |.js.Point.p.cons|
00000080: 6f 6c 65 06 6c 6f 67 02 78 02 79 0a 63 6f 75 6e |ole.log.x.y.coun|
00000090: 74 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |t......... .....|
000000a0: 03 00 03 03 03 5c 03 ca 03 01 00 00 f0 01 02 00 |.....\..........|
000000b0: 00 cc 03 00 00 00 ca 03 00 01 f0 01 01 01 cc 03 |................|
000000c0: 02 01 08 6c 54 00 00 00 06 02 00 00 00 00 58 e5 |...lT.........X.|
000000d0: 00 00 00 00 03 01 00 00 00 52 5b 01 00 0e 11 03 |.........R[.....|
000000e0: 02 00 00 00 52 24 00 00 0e 11 e3 51 df 01 0a 00 |....R$.....Q....|
000000f0: 00 00 01 14 00 00 00 21 02 00 e5 39 e7 00 00 00 |.......!...9....|
00000100: 43 e8 00 00 00 e1 42 e9 00 00 00 e1 42 ea 00 00 |C.....B.....B...|
00000110: 00 df 42 eb 00 00 00 24 03 00 0e 29 06 2f c8 03 |..B....$...)./..|
00000120: 01 09 00 2a 0a 00 00 02 00 19 01 00 0c 00 04 00 |...*............|
00000130: ca 03 02 01 02 03 00 00 29 03 d2 03 00 00 00 d4 |........).......|
00000140: 03 00 00 00 10 00 00 00 08 cb 2b 39 78 00 00 00 |..........+9x...|
00000150: 11 6c 06 00 00 00 c7 1b 24 00 00 0e 0e d3 d3 c7 |.l......$.......|
00000160: 1b 44 e9 00 00 00 d4 d4 c7 1b 44 ea 00 00 00 0e |.D........D.....|
00000170: 29 c8 03 01 15 00 15 05 00 00 01 00 02 7f 00 07 |)...............|
00000180: 01 00 00 01 00 02 7f 00 07 01 00 0c 00 04 00 00 |................|
00000190: 00 01 00 03 00 00 0f 01 10 00 00 00 c7 b8 4e e9 |..............N.|
000001a0: 00 00 00 c7 b9 4e ea 00 00 00 29 c8 03 01 06 00 |.....N....).....|
000001b0: 01 01 00 07 01 00 0c 00 04 00 00 00 01 00 03 00 |................|
000001c0: 00 08 01 10 00 00 00 c7 b7 4e eb 00 00 00 29 c8 |.........N....).|
000001d0: 03 01 03 00 01 03 00                            |.......|
```

### WASM
```
00000000: 05 08 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 66 69 65 6c 64 73 2e 6a 73 0a 50 |lass-fields.js.P|
00000030: 6f 69 6e 74 02 70 0a 63 6f 75 6e 74 0e 63 6f 6e |oint.p.count.con|
00000040: 73 6f 6c 65 06 6c 6f 67 02 78 02 79 0d c8 03 00 |sole.log.x.y....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 02 00 05 02 01 |..... ..........|
00000060: 5b 02 ca 03 02 00 70 f0 01 03 01 70 ca 03 00 09 |[.....p....p....|
00000070: cc 03 01 0d 08 ec 02 29 63 00 00 06 63 01 00 c1 |.......)c...c...|
00000080: 00 58 e5 00 00 00 00 06 cc 0e cf 6b 01 00 6b 00 |.X.........k..k.|
00000090: 00 e3 68 00 00 b7 44 e7 00 00 00 68 00 00 11 bf |..h...D....h....|
000000a0: 0a bf 14 21 02 00 e4 39 e8 00 00 00 43 e9 00 00 |...!...9....C...|
000000b0: 00 68 01 00 42 ea 00 00 00 68 01 00 42 eb 00 00 |.h..B....h..B...|
000000c0: 00 68 00 00 42 e7 00 00 00 24 03 00 0e 06 2f c8 |.h..B....$..../.|
000000d0: 03 1e 00 00 00 1e 12 00 11 0a 21 12 2a 0a 17 25 |..........!.*..%|
000000e0: 1b 0e 1b 0a 11 02 1b 08 11 02 1b 08 11 0a 1b 1f |................|
000000f0: 00 0c 42 07 01 00 02 01 02 02 02 00 3a 03 d4 03 |..B.........:...|
00000100: 00 01 00 d6 03 00 01 00 10 00 01 00 f0 01 01 0d |................|
00000110: ca 03 00 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 |......+h.......$|
00000120: 00 00 0e c7 b8 44 ea 00 00 00 c7 b9 44 eb 00 00 |.....D......D...|
00000130: 00 c7 d3 44 ea 00 00 00 c7 d4 44 eb 00 00 00 68 |...D......D....h|
00000140: 01 00 43 e7 00 00 00 91 44 e7 00 00 00 29 c8 03 |..C.....D....)..|
00000150: 18 01 04 4e 08 07 08 21 07 07 08 21 07 07 12 21 |...N...!...!...!|
00000160: 11 07 12 21 11 11 0a 1b 0c 00                   |...!......|
```