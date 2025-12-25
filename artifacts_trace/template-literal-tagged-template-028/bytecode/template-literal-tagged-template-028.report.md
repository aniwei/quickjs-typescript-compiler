# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/template-literal-tagged-template-028.ts
**生成时间**: 2025-12-25T03:14:01.209Z

## 大小对比

- TypeScript编译器: 360 字节
- WASM编译器: 352 字节
- 差异: 8 字节 (2.27%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "tag28",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 13
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 16
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 24
    },
    {
      "index": 6,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literal-tagged-template-028.js",
      "offset": 28
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 87
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 269
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "tag28",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 13
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 16
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 24
    },
    {
      "index": 6,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literal-tagged-template-028.js",
      "offset": 28
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 87
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 261
  }
}
```

## 字节级差异

共发现 61 个字节差异:

- 偏移量 0x10c: TS=0x14 vs WASM=0x0c
- 偏移量 0x11f: TS=0x42 vs WASM=0xeb
- 偏移量 0x120: TS=0x30 vs WASM=0xd4
- 偏移量 0x121: TS=0x00 vs WASM=0xeb
- 偏移量 0x122: TS=0x00 vs WASM=0x9f
- 偏移量 0x123: TS=0x00 vs WASM=0x28
- 偏移量 0x125: TS=0x42 vs WASM=0x03
- 偏移量 0x126: TS=0x30 vs WASM=0x10
- 偏移量 0x127: TS=0x00 vs WASM=0x01
- 偏移量 0x129: TS=0x00 vs WASM=0x16
- 偏移量 0x12a: TS=0x9f vs WASM=0x42
- 偏移量 0x12b: TS=0x28 vs WASM=0x0c
- 偏移量 0x12c: TS=0xd4 vs WASM=0x02
- 偏移量 0x12d: TS=0x03 vs WASM=0x07
- 偏移量 0x12e: TS=0x10 vs WASM=0x06
- 偏移量 0x12f: TS=0x01 vs WASM=0x07
- 偏移量 0x130: TS=0x00 vs WASM=0x14
- 偏移量 0x131: TS=0x16 vs WASM=0x07
- 偏移量 0x132: TS=0x42 vs WASM=0x02
- 偏移量 0x133: TS=0x0c vs WASM=0x07
- ... (显示前20个差异，总共61个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 0a 74 61 67 32 38 02 78 04 72 31 04 72 32 |...tag28.x.r1.r2|
00000010: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 |.console.logt__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c |template-literal|
00000040: 2d 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 |-tagged-template|
00000050: 2d 30 32 38 2e 6a 73 02 73 02 76 0c 00 06 00 a4 |-028.js.s.v.....|
00000060: 01 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 |.......t......@.|
00000070: 00 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 |...@@.....@.....|
00000080: 40 e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 |@.......A.....?.|
00000090: 00 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 |....?.....?.....|
000000a0: bf 1c bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 |.....;....9.....|
000000b0: 01 39 e5 00 00 00 f2 3b e6 00 00 00 39 e4 00 00 |.9.....;....9...|
000000c0: 00 c1 02 f1 3b e7 00 00 00 39 e8 00 00 00 43 e9 |....;....9....C.|
000000d0: 00 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 00 |...9....9....$..|
000000e0: cf 28 d4 03 1a 00 00 00 36 04 1a 21 03 25 14 1b |.(......6..!.%..|
000000f0: 07 21 0b 25 0c 21 21 1b 0e 1b 0a 1b 08 1b 09 00 |.!.%.!!.........|
00000100: 0c 41 06 00 c8 03 02 00 01 02 00 00 14 02 d6 03 |.A..............|
00000110: 00 01 00 d8 03 00 01 00 0d 01 00 d8 d3 b7 48 42 |..............HB|
00000120: 30 00 00 00 d4 42 30 00 00 00 9f 28 d4 03 10 01 |0....B0....(....|
00000130: 00 16 42 0c 02 07 06 1b 14 07 02 1b 05 07 25 00 |..B...........%.|
00000140: 0b 02 07 02 61 07 02 62 0b 02 07 02 61 07 02 62 |....a..b....a..b|
00000150: 02 0b 01 07 0e 6e 6f 5f 73 75 62 73 0b 01 07 0e |.....no_subs....|
00000160: 6e 6f 5f 73 75 62 73 02                         |no_subs.|
```

### WASM
```
00000000: 05 09 0a 74 61 67 32 38 02 78 04 72 31 04 72 32 |...tag28.x.r1.r2|
00000010: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 |.console.logt__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c |template-literal|
00000040: 2d 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 |-tagged-template|
00000050: 2d 30 32 38 2e 6a 73 02 73 02 76 0c 00 06 00 a4 |-028.js.s.v.....|
00000060: 01 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 |.......t......@.|
00000070: 00 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 |...@@.....@.....|
00000080: 40 e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 |@.......A.....?.|
00000090: 00 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 |....?.....?.....|
000000a0: bf 1c bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 |.....;....9.....|
000000b0: 01 39 e5 00 00 00 f2 3b e6 00 00 00 39 e4 00 00 |.9.....;....9...|
000000c0: 00 c1 02 f1 3b e7 00 00 00 39 e8 00 00 00 43 e9 |....;....9....C.|
000000d0: 00 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 00 |...9....9....$..|
000000e0: cf 28 d4 03 1a 00 00 00 36 04 1a 21 03 25 14 1b |.(......6..!.%..|
000000f0: 07 21 0b 25 0c 21 21 1b 0e 1b 0a 1b 08 1b 09 00 |.!.%.!!.........|
00000100: 0c 41 06 00 c8 03 02 00 01 02 00 00 0c 02 d6 03 |.A..............|
00000110: 00 01 00 d8 03 00 01 00 0d 01 00 d8 d3 b7 48 eb |..............H.|
00000120: d4 eb 9f 28 d4 03 10 01 00 16 42 0c 02 07 06 07 |...(......B.....|
00000130: 14 07 02 07 05 07 25 00 0b 02 07 02 61 07 02 62 |......%.....a..b|
00000140: 0b 02 07 02 61 07 02 62 02 0b 01 07 0e 6e 6f 5f |....a..b.....no_|
00000150: 73 75 62 73 0b 01 07 0e 6e 6f 5f 73 75 62 73 02 |subs....no_subs.|
```