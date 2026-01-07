# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/tagged-template-method.ts
**生成时间**: 2026-01-07T15:26:57.449Z

## 大小对比

- TypeScript编译器: 256 字节
- WASM编译器: 256 字节
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template-method.js",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xc",
    "remaining": 189
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tagged-template-method.js",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xc",
    "remaining": 189
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 06 6f 62 6a 02 78 02 72 06 74 61 67 58 5f |...obj.x.r.tagX_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 |s/tagged-templat|
00000030: 65 2d 6d 65 74 68 6f 64 2e 6a 73 0e 73 74 72 69 |e-method.js.stri|
00000040: 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 00 02 5a |ngs............Z|
00000050: 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 |......@.....@...|
00000060: 00 80 40 e6 00 00 00 80 3f e4 00 00 00 80 3f e5 |..@.....?.....?.|
00000070: 00 00 00 80 3f e6 00 00 00 80 0b c2 00 56 e7 00 |....?........V..|
00000080: 00 00 04 3b e4 00 00 00 b8 3b e5 00 00 00 39 e4 |...;.....;....9.|
00000090: 00 00 00 43 e7 00 00 00 c1 01 39 e5 00 00 00 24 |...C......9....$|
000000a0: 02 00 3b e6 00 00 00 39 e6 00 00 00 0e 06 cf 28 |..;....9.......(|
000000b0: d0 03 0e 00 00 00 38 0c 14 1b 06 25 12 1b 07 2b |......8....%...+|
000000c0: 19 00 0c 40 07 00 00 02 00 01 02 00 00 0a 02 d2 |...@............|
000000d0: 03 00 01 00 da 01 00 01 00 0d 01 00 d8 d3 d4 26 |...............&|
000000e0: 02 00 28 d0 03 08 01 04 17 18 07 12 16 21 00 0b |..(..........!..|
000000f0: 02 07 02 61 07 02 62 0b 02 07 02 61 07 02 62 02 |...a..b....a..b.|
```

### WASM
```
00000000: 05 06 06 6f 62 6a 02 78 02 72 06 74 61 67 58 5f |...obj.x.r.tagX_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 |s/tagged-templat|
00000030: 65 2d 6d 65 74 68 6f 64 2e 6a 73 0e 73 74 72 69 |e-method.js.stri|
00000040: 6e 67 73 0c 00 06 00 a4 01 00 01 00 04 00 02 5a |ngs............Z|
00000050: 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 |......@.....@...|
00000060: 00 80 40 e6 00 00 00 80 3f e4 00 00 00 80 3f e5 |..@.....?.....?.|
00000070: 00 00 00 80 3f e6 00 00 00 80 0b c2 00 56 e7 00 |....?........V..|
00000080: 00 00 04 3b e4 00 00 00 b8 3b e5 00 00 00 39 e4 |...;.....;....9.|
00000090: 00 00 00 43 e7 00 00 00 c1 01 39 e5 00 00 00 24 |...C......9....$|
000000a0: 02 00 3b e6 00 00 00 39 e6 00 00 00 0e 06 cf 28 |..;....9.......(|
000000b0: d0 03 0e 00 00 00 38 0c 14 1b 06 25 12 1b 07 2b |......8....%...+|
000000c0: 19 00 0c 40 07 00 00 02 00 01 02 00 00 0a 02 d2 |...@............|
000000d0: 03 00 01 00 da 01 00 01 00 0d 01 00 d8 d3 d4 26 |...............&|
000000e0: 02 00 28 d0 03 08 01 04 17 18 07 12 16 21 00 0b |..(..........!..|
000000f0: 02 07 02 61 07 02 62 0b 02 07 02 61 07 02 62 02 |...a..b....a..b.|
```