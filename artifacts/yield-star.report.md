# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/yield-star.ts
**生成时间**: 2025-12-05T10:42:27.626Z

## 大小对比

- TypeScript编译器: 267 字节
- WASM编译器: 273 字节
- 差异: -6 字节 (-2.20%)

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
    "remaining": 215
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

共发现 123 个字节差异:

- 偏移量 0x43: TS=0x02 vs WASM=0x00
- 偏移量 0x45: TS=0x03 vs WASM=0x02
- 偏移量 0x48: TS=0x23 vs WASM=0x25
- 偏移量 0x49: TS=0x02 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=0x01
- 偏移量 0x4e: TS=0x00 vs WASM=0xcc
- 偏移量 0x4f: TS=0xcc vs WASM=0x03
- 偏移量 0x50: TS=0x03 vs WASM=0x01
- 偏移量 0x51: TS=0x00 vs WASM=0x0d
- 偏移量 0x52: TS=0x00 vs WASM=0x08
- 偏移量 0x53: TS=0x00 vs WASM=0xec
- 偏移量 0x54: TS=0xca vs WASM=0x05
- 偏移量 0x55: TS=0x03 vs WASM=0xc2
- 偏移量 0x57: TS=0x01 vs WASM=0xe3
- 偏移量 0x58: TS=0xcc vs WASM=0x29
- 偏移量 0x59: TS=0x03 vs WASM=0xdf
- 偏移量 0x5a: TS=0x01 vs WASM=0xb9
- 偏移量 0x5b: TS=0x01 vs WASM=0xf1
- 偏移量 0x5c: TS=0x08 vs WASM=0xe4
- 偏移量 0x5d: TS=0xec vs WASM=0x68
- ... (显示前20个差异，总共123个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 79 |piler/fixtures/y|
00000020: 69 65 6c 64 2d 73 74 61 72 2e 6a 73 06 67 65 6e |ield-star.js.gen|
00000030: 02 67 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.g.x......... ..|
00000040: a4 01 00 02 00 03 02 01 23 02 ca 03 00 00 00 cc |........#.......|
00000050: 03 00 00 00 ca 03 00 01 cc 03 01 01 08 ec 1e c2 |................|
00000060: 00 e3 df b9 22 01 00 e4 e0 43 6c 00 00 00 24 00 |...."....Cl...$.|
00000070: 00 0e e0 43 6c 00 00 00 24 00 00 0e 29 06 2f c8 |...Cl...$...)./.|
00000080: 03 01 09 00 06 03 00 00 01 00 10 01 00 0c 10 04 |................|
00000090: 00 ca 03 01 00 01 03 00 00 60 01 ce 03 00 00 00 |.........`......|
000000a0: 89 d3 8a ec 01 2f 0e 39 e5 00 00 00 d3 b8 a0 22 |...../.9......."|
000000b0: 01 00 7f 0e 06 06 87 84 43 6b 00 00 00 ed 37 8b |........Ck....7.|
000000c0: 11 ed 03 0e ee f0 b9 ad ed 15 88 00 ed 0d 84 43 |...............C|
000000d0: 6b 00 00 00 ec e9 42 42 00 00 00 0f 0f 0f 2f 88 |k.....BB....../.|
000000e0: 01 ed 0a 84 43 6b 00 00 00 ec d4 ee 09 88 02 0e |....Ck..........|
000000f0: 31 00 00 00 00 04 42 42 00 00 00 0f 0f 0f 0e 29 |1.....BB.......)|
00000100: c8 03 01 06 00 01 01 00 06 01 00                |...........|
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