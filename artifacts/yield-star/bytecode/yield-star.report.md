# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/yield-star.ts
**生成时间**: 2025-12-06T02:09:56.566Z

## 大小对比

- TypeScript编译器: 258 字节
- WASM编译器: 273 字节
- 差异: -15 字节 (-5.49%)

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
    "remaining": 206
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

共发现 144 个字节差异:

- 偏移量 0x45: TS=0x03 vs WASM=0x02
- 偏移量 0x79: TS=0x00 vs WASM=0x14
- 偏移量 0x7a: TS=0x08 vs WASM=0x00
- 偏移量 0x7c: TS=0x07 vs WASM=0x00
- 偏移量 0x7d: TS=0x04 vs WASM=0x07
- 偏移量 0x7e: TS=0x0a vs WASM=0x08
- 偏移量 0x7f: TS=0x07 vs WASM=0x14
- 偏移量 0x80: TS=0x04 vs WASM=0x0c
- 偏移量 0x81: TS=0x12 vs WASM=0x06
- 偏移量 0x82: TS=0x72 vs WASM=0x0d
- 偏移量 0x83: TS=0x00 vs WASM=0x19
- 偏移量 0x84: TS=0x0c vs WASM=0x11
- 偏移量 0x85: TS=0x52 vs WASM=0x02
- 偏移量 0x86: TS=0x06 vs WASM=0x1b
- 偏移量 0x87: TS=0x00 vs WASM=0x0a
- 偏移量 0x88: TS=0xca vs WASM=0x17
- 偏移量 0x89: TS=0x03 vs WASM=0x0b
- 偏移量 0x8a: TS=0x01 vs WASM=0x11
- 偏移量 0x8b: TS=0x00 vs WASM=0x02
- 偏移量 0x8c: TS=0x01 vs WASM=0x1b
- ... (显示前20个差异，总共144个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 79 |piler/fixtures/y|
00000020: 69 65 6c 64 2d 73 74 61 72 2e 6a 73 06 67 65 6e |ield-star.js.gen|
00000030: 02 67 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.g.x......... ..|
00000040: a4 01 00 00 00 03 02 01 25 00 ca 03 00 01 cc 03 |........%.......|
00000050: 01 0d 08 ec 05 c2 00 e3 29 df b9 f1 e4 68 01 00 |........)....h..|
00000060: 43 6c 00 00 00 24 00 00 0e 68 01 00 43 6c 00 00 |Cl...$...h..Cl..|
00000070: 00 24 00 00 0e 06 2f c8 03 00 08 00 07 04 0a 07 |.$..../.........|
00000080: 04 12 72 00 0c 52 06 00 ca 03 01 00 01 03 00 00 |..r..R..........|
00000090: 5e 01 ce 03 00 00 00 89 d3 8a ec 02 2f 0e 39 e5 |^.........../.9.|
000000a0: 00 00 00 d3 b8 a0 f1 7f 0e 06 06 87 84 43 6b 00 |.............Ck.|
000000b0: 00 00 ed 38 8b 11 ed 04 0e ee f1 b9 ad ed 16 88 |...8............|
000000c0: 00 ed 0e 84 43 6b 00 00 00 ec ea 42 42 00 00 00 |....Ck.....BB...|
000000d0: 0f 0f 0f 2f 88 01 ed 0b 84 43 6b 00 00 00 ec d5 |.../.....Ck.....|
000000e0: ee 0a 88 02 0e 31 00 00 00 00 04 42 42 00 00 00 |.....1.....BB...|
000000f0: 0f 0f 0f 0e 29 c8 03 00 08 08 0a 21 01 1b 04 07 |....)......!....|
00000100: 04 00                                           |..|
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