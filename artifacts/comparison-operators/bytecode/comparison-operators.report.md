# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comparison-operators.ts
**生成时间**: 2025-12-05T12:54:23.902Z

## 大小对比

- TypeScript编译器: 379 字节
- WASM编译器: 357 字节
- 差异: 22 字节 (6.16%)

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
      "rawLength": 238,
      "actualLength": 119,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comparison-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 123
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 131
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "1",
      "offset": 135
    }
  ],
  "functionHeader": {
    "offset": 137,
    "tag": "0xd",
    "remaining": 242
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comparison-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 291
  }
}
```

## 字节级差异

共发现 343 个字节差异:

- 偏移量 0x1: TS=0x04 vs WASM=0x03
- 偏移量 0x2: TS=0xee vs WASM=0x66
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
- ... (显示前20个差异，总共343个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 ee 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6f 6d 70 61 72 69 73 6f 6e 2d 6f |res/comparison-o|
00000070: 70 65 72 61 74 6f 72 73 2e 6a 73 0e 63 6f 6e 73 |perators.js.cons|
00000080: 6f 6c 65 06 6c 6f 67 02 31 0d c8 03 00 00 00 00 |ole.log.1.......|
00000090: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 bb 01 00 |.. .............|
000000a0: 08 6c b3 00 00 00 39 e5 00 00 00 43 e6 00 00 00 |.l....9....C....|
000000b0: b8 b8 ab 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000c0: 00 b8 b9 ac 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
000000d0: 00 00 b8 b8 ad 24 01 00 0e 39 e5 00 00 00 43 e6 |.....$...9....C.|
000000e0: 00 00 00 b8 b9 ae 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
000000f0: e6 00 00 00 b8 b9 a5 24 01 00 0e 39 e5 00 00 00 |.......$...9....|
00000100: 43 e6 00 00 00 b9 b8 a7 24 01 00 0e 39 e5 00 00 |C.......$...9...|
00000110: 00 43 e6 00 00 00 b8 b8 a6 24 01 00 0e 39 e5 00 |.C.......$...9..|
00000120: 00 00 43 e6 00 00 00 b8 b8 a8 24 01 00 0e 39 e5 |..C.......$...9.|
00000130: 00 00 00 43 e6 00 00 00 04 e7 00 00 00 b8 ab 24 |...C...........$|
00000140: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 04 e7 00 |...9....C.......|
00000150: 00 00 b8 ad 24 01 00 0e 29 06 2f c8 03 01 1b 00 |....$...)./.....|
00000160: 21 01 00 11 01 00 11 01 00 11 01 00 11 01 00 11 |!...............|
00000170: 01 00 11 01 00 11 02 00 15 02 00                |...........|
```

### WASM
```
00000000: 05 03 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 65 72 61 74 |omparison-operat|
00000030: 6f 72 73 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c |ors.js.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 04 00 02 b2 01 00 08 ec 02 29 39 e5 00 |............)9..|
00000060: 00 00 43 e6 00 00 00 b8 b8 ab 24 01 00 0e 39 e5 |..C.......$...9.|
00000070: 00 00 00 43 e6 00 00 00 b8 b9 ac 24 01 00 0e 39 |...C.......$...9|
00000080: e5 00 00 00 43 e6 00 00 00 b8 b8 ad 24 01 00 0e |....C.......$...|
00000090: 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ae 24 01 00 |9....C.......$..|
000000a0: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a5 24 01 |.9....C.......$.|
000000b0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 b8 a7 24 |..9....C.......$|
000000c0: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b8 a6 |...9....C.......|
000000d0: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b8 |$...9....C......|
000000e0: a8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 c1 |.$...9....C.....|
000000f0: 00 b8 ab 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000100: 00 c1 01 b8 ad 24 01 00 0e 06 2f c8 03 50 00 00 |.....$..../..P..|
00000110: 2f 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |/.%.......%.....|
00000120: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |..%.......%.....|
00000130: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |..%.......%.....|
00000140: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 18 15 |..%.......%.....|
00000150: 1b 0e 2a 12 07 09 18 15 1b 0e 2a 12 07 09 00 07 |..*.......*.....|
00000160: 02 31 07 02 31                                  |.1..1|
```