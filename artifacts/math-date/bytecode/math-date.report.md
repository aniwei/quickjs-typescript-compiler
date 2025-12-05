# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/math-date.ts
**生成时间**: 2025-12-05T12:54:24.112Z

## 大小对比

- TypeScript编译器: 296 字节
- WASM编译器: 256 字节
- 差异: 40 字节 (15.63%)

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
      "rawLength": 216,
      "actualLength": 108,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/math-date.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 112
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 114
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 122
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getTime",
      "offset": 126
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 134
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 138
    }
  ],
  "functionHeader": {
    "offset": 142,
    "tag": "0xd",
    "remaining": 154
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/math-date.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getTime",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 183
  }
}
```

## 字节级差异

共发现 280 个字节差异:

- 偏移量 0x2: TS=0xd8 vs WASM=0x50
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
- ... (显示前20个差异，总共280个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 d8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 61 74 68 2d 64 61 74 65 2e 6a 73 |res/math-date.js|
00000070: 02 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0e 67 |.d.console.log.g|
00000080: 65 74 54 69 6d 65 06 61 62 73 06 6d 61 78 0d c8 |etTime.abs.max..|
00000090: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 |....... ........|
000000a0: 01 00 6d 01 ca 03 00 00 00 ca 03 00 01 08 6c 65 |..m...........le|
000000b0: 00 00 00 39 a7 00 00 00 01 00 80 6e 87 21 01 00 |...9.......n.!..|
000000c0: e3 39 e6 00 00 00 43 e7 00 00 00 df 43 e8 00 00 |.9....C.....C...|
000000d0: 00 24 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 |.$..$...9....C..|
000000e0: 00 00 39 a5 00 00 00 43 e9 00 00 00 01 0a 00 00 |..9....C........|
000000f0: 00 8e 24 01 00 24 01 00 0e 39 e6 00 00 00 43 e7 |..$..$...9....C.|
00000100: 00 00 00 39 a5 00 00 00 43 ea 00 00 00 b8 b9 ba |...9....C.......|
00000110: 24 03 00 24 01 00 0e 29 06 2f c8 03 01 09 00 1e |$..$...)./......|
00000120: 01 00 17 01 00 21 01 00                         |.....!..|
```

### WASM
```
00000000: 05 07 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 61 74 68 2d 64 61 74 65 2e 6a 73 02 64 0e 63 6f |ath-date.js.d.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0e 67 65 74 54 69 6d |nsole.log.getTim|
00000040: 65 06 61 62 73 06 6d 61 78 0d c8 03 00 00 00 00 |e.abs.max.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 07 01 01 64 00 ca |.. ..........d..|
00000060: 03 00 01 08 ec 02 29 39 a7 00 00 00 11 c1 00 21 |......)9.......!|
00000070: 01 00 e3 39 e6 00 00 00 43 e7 00 00 00 df 43 e8 |...9....C.....C.|
00000080: 00 00 00 24 00 00 24 01 00 0e 39 e6 00 00 00 43 |...$..$...9....C|
00000090: e7 00 00 00 39 a5 00 00 00 43 e9 00 00 00 bf f6 |....9....C......|
000000a0: 24 01 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 |$..$...9....C...|
000000b0: 00 39 a5 00 00 00 43 ea 00 00 00 b8 b9 ba 24 03 |.9....C.......$.|
000000c0: 00 24 01 00 0e 06 2f c8 03 2c 00 00 16 18 2a 08 |.$..../..,....*.|
000000d0: 17 1f 1b 0e 1b 0a 07 02 1b 10 11 13 17 15 1b 0e |................|
000000e0: 1b 0a 1b 08 1b 0a 0c 01 11 11 17 15 1b 0e 1b 0a |................|
000000f0: 1b 08 2a 08 11 11 00 06 00 00 00 e8 76 48 77 42 |..*.........vHwB|
```