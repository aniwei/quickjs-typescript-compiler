# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-086.ts
**生成时间**: 2025-12-25T01:17:44.156Z

## 大小对比

- TypeScript编译器: 254 字节
- WASM编译器: 331 字节
- 差异: -77 字节 (-23.26%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "g86",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-086.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 188
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "g86",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-086.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 265
  }
}
```

## 字节级差异

共发现 99 个字节差异:

- 偏移量 0xd6: TS=0x03 vs WASM=0x06
- 偏移量 0xd9: TS=0x15 vs WASM=0x60
- 偏移量 0xe9: TS=0x8b vs WASM=0x7f
- 偏移量 0xeb: TS=0xbf vs WASM=0x06
- 偏移量 0xec: TS=0x56 vs WASM=0x06
- 偏移量 0xed: TS=0xb8 vs WASM=0x87
- 偏移量 0xee: TS=0x9f vs WASM=0x84
- 偏移量 0xef: TS=0x2f vs WASM=0x43
- 偏移量 0xf0: TS=0xd2 vs WASM=0x6b
- 偏移量 0xf1: TS=0x03 vs WASM=0x00
- 偏移量 0xf2: TS=0x0a vs WASM=0x00
- 偏移量 0xf3: TS=0x01 vs WASM=0x00
- 偏移量 0xf4: TS=0x00 vs WASM=0xed
- 偏移量 0xf5: TS=0x08 vs WASM=0x38
- 偏移量 0xf6: TS=0x08 vs WASM=0x8b
- 偏移量 0xf7: TS=0x26 vs WASM=0x11
- 偏移量 0xf8: TS=0x00 vs WASM=0xed
- 偏移量 0xf9: TS=0x3a vs WASM=0x04
- 偏移量 0xfa: TS=0x14 vs WASM=0x0e
- 偏移量 0xfb: TS=0x07 vs WASM=0xee
- ... (显示前20个差异，总共99个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 02 76 06 67 38 36 02 74 0e 63 6f 6e 73 6f |...v.g86.t.conso|
00000010: 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f |le.logV__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 |/fixtures_genera|
00000030: 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 38 36 2e |ted/complex-086.|
00000040: 6a 73 0c 00 06 00 a4 01 00 02 00 05 00 01 59 02 |js............Y.|
00000050: a6 01 00 00 00 c8 03 02 00 30 40 e5 00 00 00 40 |.........0@....@|
00000060: 40 e6 00 00 00 80 c2 00 41 e5 00 00 00 00 3f e6 |@.......A.....?.|
00000070: 00 00 00 82 b7 3b e6 00 00 00 06 cb 63 01 00 39 |.....;......c..9|
00000080: e5 00 00 00 f0 7f ee 12 cc 39 e6 00 00 00 64 01 |.........9....d.|
00000090: 00 9f 11 3a e6 00 00 00 cb 82 00 ec ec 0e 86 39 |...:...........9|
000000a0: e7 00 00 00 43 e8 00 00 00 39 e6 00 00 00 24 01 |....C....9....$.|
000000b0: 00 cf 28 d2 03 16 00 00 00 25 0e 20 1b 06 1c 1d |..(......%. ....|
000000c0: 1b 0a 11 05 49 0b 1b 0e 1b 0a 1b 01 00 0c 52 06 |....I.........R.|
000000d0: 00 ca 03 00 00 00 03 00 00 15 00 89 bf 56 8a ec |.............V..|
000000e0: 02 2f 0e b8 b9 ba 26 03 00 8b 0e bf 56 b8 9f 2f |./....&.....V../|
000000f0: d2 03 0a 01 00 08 08 26 00 3a 14 07 13 00       |.......&.:....|
```

### WASM
```
00000000: 05 06 02 76 06 67 38 36 02 74 0e 63 6f 6e 73 6f |...v.g86.t.conso|
00000010: 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f |le.logV__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 |/fixtures_genera|
00000030: 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 38 36 2e |ted/complex-086.|
00000040: 6a 73 0c 00 06 00 a4 01 00 02 00 05 00 01 59 02 |js............Y.|
00000050: a6 01 00 00 00 c8 03 02 00 30 40 e5 00 00 00 40 |.........0@....@|
00000060: 40 e6 00 00 00 80 c2 00 41 e5 00 00 00 00 3f e6 |@.......A.....?.|
00000070: 00 00 00 82 b7 3b e6 00 00 00 06 cb 63 01 00 39 |.....;......c..9|
00000080: e5 00 00 00 f0 7f ee 12 cc 39 e6 00 00 00 64 01 |.........9....d.|
00000090: 00 9f 11 3a e6 00 00 00 cb 82 00 ec ec 0e 86 39 |...:...........9|
000000a0: e7 00 00 00 43 e8 00 00 00 39 e6 00 00 00 24 01 |....C....9....$.|
000000b0: 00 cf 28 d2 03 16 00 00 00 25 0e 20 1b 06 1c 1d |..(......%. ....|
000000c0: 1b 0a 11 05 49 0b 1b 0e 1b 0a 1b 01 00 0c 52 06 |....I.........R.|
000000d0: 00 ca 03 00 00 00 06 00 00 60 00 89 bf 56 8a ec |.........`...V..|
000000e0: 02 2f 0e b8 b9 ba 26 03 00 7f 0e 06 06 87 84 43 |./....&........C|
000000f0: 6b 00 00 00 ed 38 8b 11 ed 04 0e ee f1 b9 ad ed |k....8..........|
00000100: 16 88 00 ed 0e 84 43 6b 00 00 00 ec ea 42 42 00 |......Ck.....BB.|
00000110: 00 00 0f 0f 0f 2f 88 01 ed 0b 84 43 6b 00 00 00 |...../.....Ck...|
00000120: ec d5 ee 0a 88 02 0e 31 00 00 00 00 04 42 42 00 |.......1.....BB.|
00000130: 00 00 0f 0f 0f 0e bf 56 b8 9f 2f d2 03 0c 01 00 |.......V../.....|
00000140: 08 08 26 00 00 56 02 14 07 13 00                |..&..V.....|
```