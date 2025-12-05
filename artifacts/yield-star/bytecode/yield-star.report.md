# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/yield-star.ts
**生成时间**: 2025-12-05T12:54:24.414Z

## 大小对比

- TypeScript编译器: 339 字节
- WASM编译器: 273 字节
- 差异: 66 字节 (24.18%)

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
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/yield-star.js",
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
    "remaining": 218
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
      "string": "__tests__/compiler/fixtures/yield-star.js",
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
    "remaining": 221
  }
}
```

## 字节级差异

共发现 314 个字节差异:

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
- ... (显示前20个差异，总共314个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 79 69 65 6c 64 2d 73 74 61 72 2e 6a |res/yield-star.j|
00000070: 73 06 67 65 6e 02 67 02 78 0d c8 03 00 00 00 00 |s.gen.g.x.......|
00000080: 00 0c 20 06 01 a4 01 00 02 00 03 02 01 26 02 ca |.. ..........&..|
00000090: 03 00 00 00 cc 03 00 00 00 ca 03 00 01 cc 03 01 |................|
000000a0: 01 08 6c 1e 00 00 00 c2 00 e3 df b9 22 01 00 e4 |..l........."...|
000000b0: e0 43 6c 00 00 00 24 00 00 0e e0 43 6c 00 00 00 |.Cl...$....Cl...|
000000c0: 24 00 00 0e 29 06 2f c8 03 01 09 00 09 03 00 00 |$...)./.........|
000000d0: 01 00 10 01 00 0c 10 04 00 ca 03 01 00 01 03 00 |................|
000000e0: 00 60 01 ce 03 00 00 00 89 d3 8a ec 01 2f 0e 39 |.`.........../.9|
000000f0: e5 00 00 00 d3 b8 a0 22 01 00 7f 0e 06 06 87 84 |......."........|
00000100: 43 6b 00 00 00 ed 37 8b 11 ed 03 0e ee f0 b9 ad |Ck....7.........|
00000110: ed 15 88 00 ed 0d 84 43 6b 00 00 00 ec e9 42 42 |.......Ck.....BB|
00000120: 00 00 00 0f 0f 0f 2f 88 01 ed 0a 84 43 6b 00 00 |....../.....Ck..|
00000130: 00 ec d4 ee 09 88 02 0e 31 00 00 00 00 04 42 42 |........1.....BB|
00000140: 00 00 00 0f 0f 0f 0e 29 c8 03 01 06 00 01 01 00 |.......)........|
00000150: 06 01 00                                        |...|
```

### WASM
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 79 |piler/fixtures/y|
00000020: 69 65 6c 64 2d 73 74 61 72 2e 6a 73 06 67 65 6e |ield-star.js.gen|
00000030: 02 67 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.g.x......... ..|
00000040: a4 01 00 00 00 02 02 01 25 00 ca 03 00 01 cc 03 |........%.......|
00000050: 01 0d 08 ec 05 c2 00 e3 29 df b9 f1 e4 68 01 00 |........)....h..|
00000060: 43 6c 00 00 00 24 00 00 0e 68 01 00 43 6c 00 00 |Cl...$...h..Cl..|
00000070: 00 24 00 00 0e 06 2f c8 03 14 00 00 00 07 08 14 |.$..../.........|
00000080: 0c 06 0d 19 11 02 1b 0a 17 0b 11 02 1b 0a 00 0c |................|
00000090: 52 06 01 ca 03 01 00 01 06 01 00 5b 01 ce 03 00 |R..........[....|
000000a0: 01 00 ca 03 00 00 89 d3 8a ec 02 2f 0e df d3 b8 |.........../....|
000000b0: a0 f1 7f 0e 06 06 87 84 43 6b 00 00 00 ed 38 8b |........Ck....8.|
000000c0: 11 ed 04 0e ee f1 b9 ad ed 16 88 00 ed 0e 84 43 |...............C|
000000d0: 6b 00 00 00 ec ea 42 42 00 00 00 0f 0f 0f 2f 88 |k.....BB....../.|
000000e0: 01 ed 0b 84 43 6b 00 00 00 ec d5 ee 0a 88 02 0e |....Ck..........|
000000f0: 31 00 00 00 00 04 42 42 00 00 00 0f 0f 0f 0e 06 |1.....BB........|
00000100: 2f c8 03 0c 00 00 08 14 21 02 07 08 0c 04 07 05 |/.......!.......|
00000110: 00                                              |.|
```