# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/labeled-statements.ts
**生成时间**: 2025-12-05T12:54:24.043Z

## 大小对比

- TypeScript编译器: 157 字节
- WASM编译器: 202 字节
- 差异: -45 字节 (-22.28%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 234,
      "actualLength": 117,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/labeled-statements.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 121,
    "tag": "0xd",
    "remaining": 36
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/labeled-statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "l_i",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "l_j",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 195 个字节差异:

- 偏移量 0x1: TS=0x01 vs WASM=0x05
- 偏移量 0x2: TS=0xea vs WASM=0x62
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
- ... (显示前20个差异，总共195个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 01 ea 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6c 61 62 65 6c 65 64 2d 73 74 61 74 |res/labeled-stat|
00000070: 65 6d 65 6e 74 73 2e 6a 73 0d c8 03 00 00 00 00 |ements.js.......|
00000080: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 09 00 08 |.. .............|
00000090: 6c 01 00 00 00 29 06 2f c8 03 01 00 00          |l....)./.....|
```

### WASM
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 61 62 65 6c 65 64 2d 73 74 61 74 65 6d 65 6e 74 |abeled-statement|
00000030: 73 2e 6a 73 06 6c 5f 69 06 6c 5f 6a 0e 63 6f 6e |s.js.l_i.l_j.con|
00000040: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000050: 0c 20 06 01 a4 01 00 00 00 04 02 00 38 00 ca 03 |. ..........8...|
00000060: 00 01 cc 03 01 01 08 ec 02 29 b7 e3 df ba a5 ec |.........)......|
00000070: 2c b7 e4 e0 ba a5 ec 20 df b8 ad ec 06 e0 b8 ad |,...... ........|
00000080: ed 16 39 e7 00 00 00 43 e8 00 00 00 df e0 24 02 |..9....C......$.|
00000090: 00 0e e0 91 e4 ee dd df 91 e3 ee d1 06 2f c8 03 |............./..|
000000a0: 28 00 00 21 24 0c 08 1d 03 0c 08 12 1f 0c 08 11 |(..!$...........|
000000b0: 12 0c 08 14 29 1b 0e 1b 0a 07 0a 07 0b 00 04 07 |....)...........|
000000c0: 1c 07 06 00 04 03 09 07 06 00                   |..........|
```