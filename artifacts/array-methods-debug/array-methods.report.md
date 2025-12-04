# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/array-methods.ts
**生成时间**: 2025-12-03T09:25:42.249Z

## 大小对比

- TypeScript编译器: 274 字节
- WASM编译器: 276 字节
- 差异: -2 字节 (-0.72%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "popped",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pop",
      "offset": 75
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "reverse",
      "offset": 79
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 87
    }
  ],
  "functionHeader": {
    "offset": 89,
    "tag": "0xd",
    "remaining": 185
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "popped",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 75
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pop",
      "offset": 77
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "reverse",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 89,
    "tag": "0xd",
    "remaining": 187
  }
}
```

## 字节级差异

共发现 62 个字节差异:

- 偏移量 0x4b: TS=0x06 vs WASM=0x02
- 偏移量 0x4c: TS=0x70 vs WASM=0x2d
- 偏移量 0x4d: TS=0x6f vs WASM=0x06
- 偏移量 0x4f: TS=0x0e vs WASM=0x6f
- 偏移量 0x50: TS=0x72 vs WASM=0x70
- 偏移量 0x51: TS=0x65 vs WASM=0x0e
- 偏移量 0x52: TS=0x76 vs WASM=0x72
- 偏移量 0x54: TS=0x72 vs WASM=0x76
- 偏移量 0x55: TS=0x73 vs WASM=0x65
- 偏移量 0x56: TS=0x65 vs WASM=0x72
- 偏移量 0x57: TS=0x02 vs WASM=0x73
- 偏移量 0x58: TS=0x2d vs WASM=0x65
- 偏移量 0x9d: TS=0xec vs WASM=0xea
- 偏移量 0xaa: TS=0xea vs WASM=0xeb
- 偏移量 0xc3: TS=0xeb vs WASM=0xec
- 偏移量 0xe0: TS=0x30 vs WASM=0x32
- 偏移量 0xe3: TS=0x3a vs WASM=0x35
- 偏移量 0xe4: TS=0x06 vs WASM=0x00
- 偏移量 0xe5: TS=0x20 vs WASM=0x07
- 偏移量 0xe6: TS=0x0a vs WASM=0x06
- ... (显示前20个差异，总共62个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6d 65 74 68 6f 64 73 2e 6a 73 06 |rray-methods.js.|
00000030: 61 72 72 0c 70 6f 70 70 65 64 08 70 75 73 68 0e |arr.popped.push.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 06 70 6f 70 0e |console.log.pop.|
00000050: 72 65 76 65 72 73 65 02 2d 0d c8 03 00 00 00 00 |reverse.-.......|
00000060: 00 0c 20 06 01 a4 01 00 00 00 05 02 00 67 00 ca |.. ..........g..|
00000070: 03 00 01 cc 03 01 01 08 ec 02 29 b8 b9 ba 26 03 |..........)...&.|
00000080: 00 e7 43 e7 00 00 00 bb 24 01 00 0e 39 e8 00 00 |..C.....$...9...|
00000090: 00 43 e9 00 00 00 df 43 5d 00 00 00 04 ec 00 00 |.C.....C].......|
000000a0: 00 24 01 00 24 01 00 0e df 43 ea 00 00 00 24 00 |.$..$....C....$.|
000000b0: 00 e4 39 e8 00 00 00 43 e9 00 00 00 e0 24 01 00 |..9....C.....$..|
000000c0: 0e df 43 eb 00 00 00 24 00 00 0e 39 e8 00 00 00 |..C....$...9....|
000000d0: 43 e9 00 00 00 df b7 48 24 01 00 0e 06 2f c8 03 |C......H$..../..|
000000e0: 30 00 00 3a 06 20 0a 17 0f 1b 0e 1b 0a 07 06 34 |0..:. .........4|
000000f0: 0a 11 11 17 04 07 06 1b 08 17 27 1b 0e 1b 0a 07 |..........'.....|
00000100: 01 17 15 07 06 1b 10 17 15 1b 0e 1b 0a 0c 06 07 |................|
00000110: 07 00                                           |..|
```

### WASM
```
00000000: 05 09 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6d 65 74 68 6f 64 73 2e 6a 73 06 |rray-methods.js.|
00000030: 61 72 72 0c 70 6f 70 70 65 64 08 70 75 73 68 0e |arr.popped.push.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 2d 06 70 6f |console.log.-.po|
00000050: 70 0e 72 65 76 65 72 73 65 0d c8 03 00 00 00 00 |p.reverse.......|
00000060: 00 0c 20 06 01 a4 01 00 00 00 05 02 00 67 00 ca |.. ..........g..|
00000070: 03 00 01 cc 03 01 01 08 ec 02 29 b8 b9 ba 26 03 |..........)...&.|
00000080: 00 e7 43 e7 00 00 00 bb 24 01 00 0e 39 e8 00 00 |..C.....$...9...|
00000090: 00 43 e9 00 00 00 df 43 5d 00 00 00 04 ea 00 00 |.C.....C].......|
000000a0: 00 24 01 00 24 01 00 0e df 43 eb 00 00 00 24 00 |.$..$....C....$.|
000000b0: 00 e4 39 e8 00 00 00 43 e9 00 00 00 e0 24 01 00 |..9....C.....$..|
000000c0: 0e df 43 ec 00 00 00 24 00 00 0e 39 e8 00 00 00 |..C....$...9....|
000000d0: 43 e9 00 00 00 df b7 48 24 01 00 0e 06 2f c8 03 |C......H$..../..|
000000e0: 32 00 00 35 00 07 06 20 0a 17 0f 1b 0e 1b 0a 07 |2..5... ........|
000000f0: 06 34 0a 11 11 17 04 07 06 1b 08 17 27 1b 0e 1b |.4..........'...|
00000100: 0a 07 01 17 15 07 06 1b 10 17 15 1b 0e 1b 0a 0c |................|
00000110: 06 07 07 00                                     |....|
```