# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/tagged-template-element.ts
**生成时间**: 2026-01-03T04:41:28.856Z

## 大小对比

- TypeScript编译器: 258 字节
- WASM编译器: 258 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
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
      "string": "r",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template-element.js",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 190
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
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
      "string": "r",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tag",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template-element.js",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 190
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 06 6f 62 6a 02 78 02 72 06 74 61 67 5a 5f |...obj.x.r.tagZ_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 |s/tagged-templat|
00000030: 65 2d 65 6c 65 6d 65 6e 74 2e 6a 73 0e 73 74 72 |e-element.js.str|
00000040: 69 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 00 02 |ings............|
00000050: 5b 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 |[......@.....@..|
00000060: 00 00 80 40 e6 00 00 00 80 3f e4 00 00 00 80 3f |...@.....?.....?|
00000070: e5 00 00 00 80 3f e6 00 00 00 80 0b c2 00 56 e7 |.....?........V.|
00000080: 00 00 00 04 3b e4 00 00 00 b9 3b e5 00 00 00 39 |....;.....;....9|
00000090: e4 00 00 00 04 e7 00 00 00 49 c1 01 39 e5 00 00 |.........I..9...|
000000a0: 00 24 02 00 3b e6 00 00 00 39 e6 00 00 00 0e 06 |.$..;....9......|
000000b0: cf 28 d0 03 0e 00 00 00 38 0c 14 34 06 11 18 1b |.(......8..4....|
000000c0: 07 2b 1f 00 0c 40 07 00 00 02 00 01 02 00 00 0a |.+...@..........|
000000d0: 02 d2 03 00 01 00 da 01 00 01 00 0d 01 00 d8 d3 |................|
000000e0: d4 26 02 00 28 d0 03 08 01 04 17 18 07 12 16 21 |.&..(..........!|
000000f0: 00 0b 02 07 02 61 07 02 62 0b 02 07 02 61 07 02 |.....a..b....a..|
00000100: 62 02                                           |b.|
```

### WASM
```
00000000: 05 06 06 6f 62 6a 02 78 02 72 06 74 61 67 5a 5f |...obj.x.r.tagZ_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 |s/tagged-templat|
00000030: 65 2d 65 6c 65 6d 65 6e 74 2e 6a 73 0e 73 74 72 |e-element.js.str|
00000040: 69 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 00 02 |ings............|
00000050: 5b 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 |[......@.....@..|
00000060: 00 00 80 40 e6 00 00 00 80 3f e4 00 00 00 80 3f |...@.....?.....?|
00000070: e5 00 00 00 80 3f e6 00 00 00 80 0b c2 00 56 e7 |.....?........V.|
00000080: 00 00 00 04 3b e4 00 00 00 b9 3b e5 00 00 00 39 |....;.....;....9|
00000090: e4 00 00 00 04 e7 00 00 00 49 c1 01 39 e5 00 00 |.........I..9...|
000000a0: 00 24 02 00 3b e6 00 00 00 39 e6 00 00 00 0e 06 |.$..;....9......|
000000b0: cf 28 d0 03 0e 00 00 00 38 0c 14 34 06 11 18 1b |.(......8..4....|
000000c0: 07 2b 1f 00 0c 40 07 00 00 02 00 01 02 00 00 0a |.+...@..........|
000000d0: 02 d2 03 00 01 00 da 01 00 01 00 0d 01 00 d8 d3 |................|
000000e0: d4 26 02 00 28 d0 03 08 01 04 17 18 07 12 16 21 |.&..(..........!|
000000f0: 00 0b 02 07 02 61 07 02 62 0b 02 07 02 61 07 02 |.....a..b....a..|
00000100: 62 02                                           |b.|
```