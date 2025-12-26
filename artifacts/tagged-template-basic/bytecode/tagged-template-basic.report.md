# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/tagged-template-basic.ts
**生成时间**: 2025-12-26T14:00:16.848Z

## 大小对比

- TypeScript编译器: 337 字节
- WASM编译器: 337 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 16
    },
    {
      "index": 6,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template-basic.js",
      "offset": 18
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xc",
    "remaining": 267
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 16
    },
    {
      "index": 6,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template-basic.js",
      "offset": 18
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xc",
    "remaining": 267
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 06 74 61 67 02 78 02 79 04 72 31 04 72 32 |...tag.x.y.r1.r2|
00000010: 02 7a 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.zV__tests__/fix|
00000020: 74 75 72 65 73 2f 74 61 67 67 65 64 2d 74 65 6d |tures/tagged-tem|
00000030: 70 6c 61 74 65 2d 62 61 73 69 63 2e 6a 73 0e 73 |plate-basic.js.s|
00000040: 74 72 69 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 |trings..........|
00000050: 00 03 83 01 01 a6 01 00 00 00 40 e4 00 00 00 40 |..........@....@|
00000060: 40 e5 00 00 00 80 40 e6 00 00 00 80 40 e7 00 00 |@.....@.....@...|
00000070: 00 80 40 e8 00 00 00 80 c2 00 41 e4 00 00 00 00 |..@.......A.....|
00000080: 3f e5 00 00 00 80 3f e6 00 00 00 80 3f e7 00 00 |?.....?.....?...|
00000090: 00 80 3f e8 00 00 00 80 b8 3b e5 00 00 00 04 e9 |..?......;......|
000000a0: 00 00 00 3b e6 00 00 00 39 e4 00 00 00 c1 01 39 |...;....9......9|
000000b0: e5 00 00 00 39 e6 00 00 00 f3 3b e7 00 00 00 39 |....9.....;....9|
000000c0: e4 00 00 00 c1 02 f1 3b e8 00 00 00 39 e7 00 00 |.......;....9...|
000000d0: 00 0e 06 cb 39 e8 00 00 00 0e 06 cf 28 d4 03 14 |....9.......(...|
000000e0: 00 00 00 4e 0a 16 25 10 1b 0a 1b 11 21 07 25 08 |...N..%.....!.%.|
000000f0: 21 13 2b 00 00 0c 41 06 00 c8 03 02 00 01 02 00 |!.+...A.........|
00000100: 00 0a 02 d6 03 00 01 00 da 01 00 01 00 0d 01 00 |................|
00000110: d8 d3 d4 26 02 00 28 d4 03 08 00 00 17 18 07 12 |...&..(.........|
00000120: 16 21 00 0b 03 07 02 61 07 02 62 07 02 63 0b 03 |.!.....a..b..c..|
00000130: 07 02 61 07 02 62 07 02 63 02 0b 01 07 0e 6e 6f |..a..b..c.....no|
00000140: 5f 73 75 62 73 0b 01 07 0e 6e 6f 5f 73 75 62 73 |_subs....no_subs|
00000150: 02                                              |.|
```

### WASM
```
00000000: 05 08 06 74 61 67 02 78 02 79 04 72 31 04 72 32 |...tag.x.y.r1.r2|
00000010: 02 7a 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.zV__tests__/fix|
00000020: 74 75 72 65 73 2f 74 61 67 67 65 64 2d 74 65 6d |tures/tagged-tem|
00000030: 70 6c 61 74 65 2d 62 61 73 69 63 2e 6a 73 0e 73 |plate-basic.js.s|
00000040: 74 72 69 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 |trings..........|
00000050: 00 03 83 01 01 a6 01 00 00 00 40 e4 00 00 00 40 |..........@....@|
00000060: 40 e5 00 00 00 80 40 e6 00 00 00 80 40 e7 00 00 |@.....@.....@...|
00000070: 00 80 40 e8 00 00 00 80 c2 00 41 e4 00 00 00 00 |..@.......A.....|
00000080: 3f e5 00 00 00 80 3f e6 00 00 00 80 3f e7 00 00 |?.....?.....?...|
00000090: 00 80 3f e8 00 00 00 80 b8 3b e5 00 00 00 04 e9 |..?......;......|
000000a0: 00 00 00 3b e6 00 00 00 39 e4 00 00 00 c1 01 39 |...;....9......9|
000000b0: e5 00 00 00 39 e6 00 00 00 f3 3b e7 00 00 00 39 |....9.....;....9|
000000c0: e4 00 00 00 c1 02 f1 3b e8 00 00 00 39 e7 00 00 |.......;....9...|
000000d0: 00 0e 06 cb 39 e8 00 00 00 0e 06 cf 28 d4 03 14 |....9.......(...|
000000e0: 00 00 00 4e 0a 16 25 10 1b 0a 1b 11 21 07 25 08 |...N..%.....!.%.|
000000f0: 21 13 2b 00 00 0c 41 06 00 c8 03 02 00 01 02 00 |!.+...A.........|
00000100: 00 0a 02 d6 03 00 01 00 da 01 00 01 00 0d 01 00 |................|
00000110: d8 d3 d4 26 02 00 28 d4 03 08 00 00 17 18 07 12 |...&..(.........|
00000120: 16 21 00 0b 03 07 02 61 07 02 62 07 02 63 0b 03 |.!.....a..b..c..|
00000130: 07 02 61 07 02 62 07 02 63 02 0b 01 07 0e 6e 6f |..a..b..c.....no|
00000140: 5f 73 75 62 73 0b 01 07 0e 6e 6f 5f 73 75 62 73 |_subs....no_subs|
00000150: 02                                              |.|
```