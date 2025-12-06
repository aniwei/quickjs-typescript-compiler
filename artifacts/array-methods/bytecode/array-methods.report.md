# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/array-methods.ts
**生成时间**: 2025-12-06T02:09:56.206Z

## 大小对比

- TypeScript编译器: 256 字节
- WASM编译器: 276 字节
- 差异: -20 字节 (-7.25%)

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
    "remaining": 167
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

共发现 123 个字节差异:

- 偏移量 0x6a: TS=0x03 vs WASM=0x05
- 偏移量 0x6d: TS=0x68 vs WASM=0x67
- 偏移量 0x81: TS=0xe3 vs WASM=0xe7
- 偏移量 0x82: TS=0xdf vs WASM=0x43
- 偏移量 0x83: TS=0x43 vs WASM=0xe7
- 偏移量 0x84: TS=0xe7 vs WASM=0x00
- 偏移量 0x87: TS=0x00 vs WASM=0xbb
- 偏移量 0x88: TS=0xbb vs WASM=0x24
- 偏移量 0x89: TS=0x24 vs WASM=0x01
- 偏移量 0x8a: TS=0x01 vs WASM=0x00
- 偏移量 0x8b: TS=0x00 vs WASM=0x0e
- 偏移量 0x8c: TS=0x0e vs WASM=0x39
- 偏移量 0x8d: TS=0x39 vs WASM=0xe8
- 偏移量 0x8e: TS=0xe8 vs WASM=0x00
- 偏移量 0x91: TS=0x00 vs WASM=0x43
- 偏移量 0x92: TS=0x43 vs WASM=0xe9
- 偏移量 0x93: TS=0xe9 vs WASM=0x00
- 偏移量 0x96: TS=0x00 vs WASM=0xdf
- 偏移量 0x97: TS=0xdf vs WASM=0x43
- 偏移量 0x98: TS=0x43 vs WASM=0x5d
- ... (显示前20个差异，总共123个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6d 65 74 68 6f 64 73 2e 6a 73 06 |rray-methods.js.|
00000030: 61 72 72 0c 70 6f 70 70 65 64 08 70 75 73 68 0e |arr.popped.push.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 2d 06 70 6f |console.log.-.po|
00000050: 70 0e 72 65 76 65 72 73 65 0d c8 03 00 00 00 00 |p.reverse.......|
00000060: 00 0c 20 06 01 a4 01 00 00 00 03 02 00 68 00 ca |.. ..........h..|
00000070: 03 00 01 cc 03 01 01 08 ec 02 29 b8 b9 ba 26 03 |..........)...&.|
00000080: 00 e3 df 43 e7 00 00 00 bb 24 01 00 0e 39 e8 00 |...C.....$...9..|
00000090: 00 00 43 e9 00 00 00 df 43 5d 00 00 00 04 ea 00 |..C.....C]......|
000000a0: 00 00 24 01 00 24 01 00 0e df 43 eb 00 00 00 24 |..$..$....C....$|
000000b0: 00 00 e4 39 e8 00 00 00 43 e9 00 00 00 e0 24 01 |...9....C.....$.|
000000c0: 00 0e df 43 ec 00 00 00 24 00 00 0e 39 e8 00 00 |...C....$...9...|
000000d0: 00 43 e9 00 00 00 df b7 48 24 01 00 0e 06 2f c8 |.C......H$..../.|
000000e0: 03 00 1c 16 0b 07 03 07 03 1c 6f 20 09 1c 77 34 |..........o ..w4|
000000f0: 0c 20 09 3f 78 35 73 34 0c 1c 74 35 00 34 0c 00 |. .?x5s4..t5.4..|
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