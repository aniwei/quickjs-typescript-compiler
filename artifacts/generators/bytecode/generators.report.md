# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/generators.ts
**生成时间**: 2025-12-05T12:54:24.022Z

## 大小对比

- TypeScript编译器: 283 字节
- WASM编译器: 218 字节
- 差异: 65 字节 (29.82%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/generators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 113
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 117
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 119
    }
  ],
  "functionHeader": {
    "offset": 121,
    "tag": "0xd",
    "remaining": 162
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/generators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xd",
    "remaining": 166
  }
}
```

## 字节级差异

共发现 264 个字节差异:

- 偏移量 0x2: TS=0xda vs WASM=0x52
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
- ... (显示前20个差异，总共264个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 67 65 6e 65 72 61 74 6f 72 73 2e 6a |res/generators.j|
00000070: 73 06 67 65 6e 02 67 02 78 0d c8 03 00 00 00 00 |s.gen.g.x.......|
00000080: 00 0c 20 06 01 a4 01 00 02 00 03 02 01 34 02 ca |.. ..........4..|
00000090: 03 00 00 00 cc 03 00 00 00 ca 03 00 01 cc 03 01 |................|
000000a0: 01 08 6c 2c 00 00 00 c2 00 e3 df 01 0a 00 00 00 |..l,............|
000000b0: 22 01 00 e4 e0 43 6c 00 00 00 24 00 00 0e e0 43 |"....Cl...$....C|
000000c0: 6c 00 00 00 24 00 00 0e e0 43 6c 00 00 00 24 00 |l...$....Cl...$.|
000000d0: 00 0e 29 06 2f c8 03 01 0c 00 09 04 00 00 02 00 |..)./...........|
000000e0: 14 01 00 0a 01 00 0c 10 04 00 ca 03 01 00 01 03 |................|
000000f0: 00 00 14 01 ce 03 00 00 00 89 d3 8a ec 01 2f 0e |............../.|
00000100: d3 b8 9f 8a ec 01 2f 0e d3 b9 9f 2f 29 c8 03 01 |....../..../)...|
00000110: 09 00 01 01 00 06 01 00 08 01 00                |...........|
```

### WASM
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 67 |piler/fixtures/g|
00000020: 65 6e 65 72 61 74 6f 72 73 2e 6a 73 06 67 65 6e |enerators.js.gen|
00000030: 02 67 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.g.x......... ..|
00000040: a4 01 00 00 00 02 02 01 32 00 ca 03 00 01 cc 03 |........2.......|
00000050: 01 0d 08 ec 05 c2 00 e3 29 df bf 0a f1 e4 68 01 |........).....h.|
00000060: 00 43 6c 00 00 00 24 00 00 0e 68 01 00 43 6c 00 |.Cl...$...h..Cl.|
00000070: 00 00 24 00 00 0e 68 01 00 43 6c 00 00 00 24 00 |..$...h..Cl...$.|
00000080: 00 0e 06 2f c8 03 1a 00 00 00 07 0a 14 11 06 0d |.../............|
00000090: 19 11 02 1b 0a 17 0b 11 02 1b 0a 17 0b 11 02 1b |................|
000000a0: 0a 00 0c 52 06 01 ca 03 01 00 01 02 00 00 13 01 |...R............|
000000b0: ce 03 00 01 00 89 d3 8a ec 02 2f 0e d3 b8 9f 8a |........../.....|
000000c0: ec 02 2f 0e d3 b9 9f 2f c8 03 0e 00 00 08 14 21 |../..../.......!|
000000d0: 00 0c 04 21 01 0c 04 07 11 00                   |...!......|
```