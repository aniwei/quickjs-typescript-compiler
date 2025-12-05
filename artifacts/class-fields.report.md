# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/class-fields.ts
**生成时间**: 2025-12-05T07:34:26.548Z

## 大小对比

- TypeScript编译器: 382 字节
- WASM编译器: 362 字节
- 差异: 20 字节 (5.52%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "count",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 308
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

共发现 290 个字节差异:

- 偏移量 0x1: TS=0x07 vs WASM=0x08
- 偏移量 0x34: TS=0x0e vs WASM=0x02
- 偏移量 0x35: TS=0x63 vs WASM=0x70
- 偏移量 0x36: TS=0x6f vs WASM=0x0a
- 偏移量 0x37: TS=0x6e vs WASM=0x63
- 偏移量 0x38: TS=0x73 vs WASM=0x6f
- 偏移量 0x39: TS=0x6f vs WASM=0x75
- 偏移量 0x3a: TS=0x6c vs WASM=0x6e
- 偏移量 0x3b: TS=0x65 vs WASM=0x74
- 偏移量 0x3c: TS=0x06 vs WASM=0x0e
- 偏移量 0x3d: TS=0x6c vs WASM=0x63
- 偏移量 0x3f: TS=0x67 vs WASM=0x6e
- 偏移量 0x40: TS=0x02 vs WASM=0x73
- 偏移量 0x41: TS=0x78 vs WASM=0x6f
- 偏移量 0x42: TS=0x02 vs WASM=0x6c
- 偏移量 0x43: TS=0x79 vs WASM=0x65
- 偏移量 0x44: TS=0x0a vs WASM=0x06
- 偏移量 0x45: TS=0x63 vs WASM=0x6c
- 偏移量 0x47: TS=0x75 vs WASM=0x67
- 偏移量 0x48: TS=0x6e vs WASM=0x02
- ... (显示前20个差异，总共290个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 66 69 65 6c 64 73 2e 6a 73 0a 50 |lass-fields.js.P|
00000030: 6f 69 6e 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |oint.console.log|
00000040: 02 78 02 79 0a 63 6f 75 6e 74 0d c8 03 00 00 00 |.x.y.count......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 03 03 03 5b 00 |... ..........[.|
00000060: ca 03 00 00 f0 01 01 00 d6 03 02 00 08 ec 56 06 |..............V.|
00000070: 02 00 00 00 00 58 e5 00 00 00 00 03 01 00 00 00 |.....X..........|
00000080: 52 5b 01 00 0e 11 03 02 00 00 00 52 24 00 00 0e |R[.........R$...|
00000090: 11 5b 00 00 51 df 01 0a 00 00 00 01 14 00 00 00 |.[..Q...........|
000000a0: 21 02 00 e5 39 e6 00 00 00 43 e7 00 00 00 e1 42 |!...9....C.....B|
000000b0: e8 00 00 00 e1 42 e9 00 00 00 df 42 ea 00 00 00 |.....B.....B....|
000000c0: 24 03 00 0e 29 06 2f c8 03 01 09 00 29 0a 00 00 |$...)./.....)...|
000000d0: 02 00 19 01 00 0c 00 04 00 ca 03 02 01 02 03 00 |................|
000000e0: 00 27 03 d0 03 00 00 00 d2 03 00 00 00 10 00 00 |.'..............|
000000f0: 00 2b 39 78 00 00 00 11 6c 06 00 00 00 c7 1b 24 |.+9x....l......$|
00000100: 00 00 0e 0e d3 d3 c7 1b 44 e8 00 00 00 d4 d4 c7 |........D.......|
00000110: 1b 44 e9 00 00 00 0e 29 c8 03 01 15 00 13 05 00 |.D.....)........|
00000120: 00 01 00 02 7f 00 07 01 00 00 01 00 02 7f 00 07 |................|
00000130: 01 00 0c 00 04 00 00 00 01 00 03 00 00 0f 01 10 |................|
00000140: 00 00 00 c7 b8 4e e8 00 00 00 c7 b9 4e e9 00 00 |.....N......N...|
00000150: 00 29 c8 03 01 06 00 01 01 00 07 01 00 0c 00 04 |.)..............|
00000160: 00 00 00 01 00 03 00 00 08 01 10 00 00 00 c7 b7 |................|
00000170: 4e ea 00 00 00 29 c8 03 01 03 00 01 03 00       |N....)........|
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