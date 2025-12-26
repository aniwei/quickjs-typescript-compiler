# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/template-literal-tagged-template-009.ts
**生成时间**: 2025-12-25T17:51:01.071Z

## 大小对比

- TypeScript编译器: 351 字节
- WASM编译器: 351 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tag9",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 23
    },
    {
      "index": 6,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literal-tagged-template-009.js",
      "offset": 27
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 86
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 261
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tag9",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r1",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "r2",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 23
    },
    {
      "index": 6,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/template-literal-tagged-template-009.js",
      "offset": 27
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 86
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 261
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 08 74 61 67 39 02 78 04 72 31 04 72 32 0e |...tag9.x.r1.r2.|
00000010: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 |console.logt__te|
00000020: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 |sts__/fixtures/t|
00000030: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2d |emplate-literal-|
00000040: 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2d |tagged-template-|
00000050: 30 30 39 2e 6a 73 02 73 02 76 0c 00 06 00 a4 01 |009.js.s.v......|
00000060: 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 00 |......t......@..|
00000070: 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 40 |..@@.....@.....@|
00000080: e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 00 |.......A.....?..|
00000090: 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 bf |...?.....?......|
000000a0: 09 bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 01 |....;....9......|
000000b0: 39 e5 00 00 00 f2 3b e6 00 00 00 39 e4 00 00 00 |9.....;....9....|
000000c0: c1 02 f1 3b e7 00 00 00 39 e8 00 00 00 43 e9 00 |...;....9....C..|
000000d0: 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 00 cf |..9....9....$...|
000000e0: 28 d4 03 1a 00 00 00 36 04 18 21 01 25 12 1b 07 |(......6..!.%...|
000000f0: 21 09 25 0a 21 1f 1b 0e 1b 0a 1b 08 1b 09 00 0c |!.%.!...........|
00000100: 41 06 00 c8 03 02 00 01 02 00 00 0c 02 d6 03 00 |A...............|
00000110: 01 00 d8 03 00 01 00 0d 01 00 d8 d3 b7 48 eb d4 |.............H..|
00000120: eb 9f 28 d4 03 10 01 00 16 40 0c 02 07 06 07 14 |..(......@......|
00000130: 07 02 07 05 07 25 00 0b 02 07 02 61 07 02 62 0b |.....%.....a..b.|
00000140: 02 07 02 61 07 02 62 02 0b 01 07 0e 6e 6f 5f 73 |...a..b.....no_s|
00000150: 75 62 73 0b 01 07 0e 6e 6f 5f 73 75 62 73 02    |ubs....no_subs.|
```

### WASM
```
00000000: 05 09 08 74 61 67 39 02 78 04 72 31 04 72 32 0e |...tag9.x.r1.r2.|
00000010: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 |console.logt__te|
00000020: 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 |sts__/fixtures/t|
00000030: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2d |emplate-literal-|
00000040: 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 2d |tagged-template-|
00000050: 30 30 39 2e 6a 73 02 73 02 76 0c 00 06 00 a4 01 |009.js.s.v......|
00000060: 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 00 |......t......@..|
00000070: 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 40 |..@@.....@.....@|
00000080: e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 00 |.......A.....?..|
00000090: 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 bf |...?.....?......|
000000a0: 09 bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 01 |....;....9......|
000000b0: 39 e5 00 00 00 f2 3b e6 00 00 00 39 e4 00 00 00 |9.....;....9....|
000000c0: c1 02 f1 3b e7 00 00 00 39 e8 00 00 00 43 e9 00 |...;....9....C..|
000000d0: 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 00 cf |..9....9....$...|
000000e0: 28 d4 03 1a 00 00 00 36 04 18 21 01 25 12 1b 07 |(......6..!.%...|
000000f0: 21 09 25 0a 21 1f 1b 0e 1b 0a 1b 08 1b 09 00 0c |!.%.!...........|
00000100: 41 06 00 c8 03 02 00 01 02 00 00 0c 02 d6 03 00 |A...............|
00000110: 01 00 d8 03 00 01 00 0d 01 00 d8 d3 b7 48 eb d4 |.............H..|
00000120: eb 9f 28 d4 03 10 01 00 16 40 0c 02 07 06 07 14 |..(......@......|
00000130: 07 02 07 05 07 25 00 0b 02 07 02 61 07 02 62 0b |.....%.....a..b.|
00000140: 02 07 02 61 07 02 62 02 0b 01 07 0e 6e 6f 5f 73 |...a..b.....no_s|
00000150: 75 62 73 0b 01 07 0e 6e 6f 5f 73 75 62 73 02    |ubs....no_subs.|
```