# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/array-methods.ts
**生成时间**: 2025-12-05T12:54:23.736Z

## 大小对比

- TypeScript编译器: 328 字节
- WASM编译器: 276 字节
- 差异: 52 字节 (18.84%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/array-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "popped",
      "offset": 120
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 127
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 132
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 140
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 144
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pop",
      "offset": 146
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "reverse",
      "offset": 150
    }
  ],
  "functionHeader": {
    "offset": 158,
    "tag": "0xd",
    "remaining": 170
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

共发现 313 个字节差异:

- 偏移量 0x2: TS=0xe0 vs WASM=0x58
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
- ... (显示前20个差异，总共313个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 61 72 72 61 79 2d 6d 65 74 68 6f 64 |res/array-method|
00000070: 73 2e 6a 73 06 61 72 72 0c 70 6f 70 70 65 64 08 |s.js.arr.popped.|
00000080: 70 75 73 68 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |push.console.log|
00000090: 02 2d 06 70 6f 70 0e 72 65 76 65 72 73 65 0d c8 |.-.pop.reverse..|
000000a0: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 |....... ........|
000000b0: 02 00 6b 02 ca 03 00 00 00 cc 03 00 00 00 ca 03 |..k.............|
000000c0: 00 01 cc 03 01 01 08 6c 63 00 00 00 b8 b9 ba 26 |.......lc......&|
000000d0: 03 00 e3 df 43 e7 00 00 00 bb 24 01 00 0e 39 e8 |....C.....$...9.|
000000e0: 00 00 00 43 e9 00 00 00 df 43 5d 00 00 00 04 ea |...C.....C].....|
000000f0: 00 00 00 24 01 00 24 01 00 0e df 43 eb 00 00 00 |...$..$....C....|
00000100: 24 00 00 e4 39 e8 00 00 00 43 e9 00 00 00 e0 24 |$...9....C.....$|
00000110: 01 00 0e df 43 ec 00 00 00 24 00 00 0e 39 e8 00 |....C....$...9..|
00000120: 00 00 43 e9 00 00 00 df b7 48 24 01 00 0e 29 06 |..C......H$...).|
00000130: 2f c8 03 01 12 00 13 01 00 0f 01 00 12 01 00 14 |/...............|
00000140: 01 00 0f 01 00 0a 01 00                         |........|
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