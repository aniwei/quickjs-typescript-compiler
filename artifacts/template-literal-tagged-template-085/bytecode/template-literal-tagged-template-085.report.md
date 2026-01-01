# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/template-literal-tagged-template-085.ts
**生成时间**: 2026-01-01T10:02:31.241Z

## 大小对比

- TypeScript编译器: 352 字节
- WASM编译器: 352 字节
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "tag85",
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
      "string": "__tests__/fixtures/template-literal-tagged-template-085.js",
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
      "string": "tag85",
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
      "string": "__tests__/fixtures/template-literal-tagged-template-085.js",
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

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 0a 74 61 67 38 35 02 78 04 72 31 04 72 32 |...tag85.x.r1.r2|
00000010: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 |.console.logt__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c |template-literal|
00000040: 2d 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 |-tagged-template|
00000050: 2d 30 38 35 2e 6a 73 02 73 02 76 0c 00 06 00 a4 |-085.js.s.v.....|
00000060: 01 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 |.......t......@.|
00000070: 00 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 |...@@.....@.....|
00000080: 40 e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 |@.......A.....?.|
00000090: 00 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 |....?.....?.....|
000000a0: bf 55 bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 |.U...;....9.....|
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

### WASM
```
00000000: 05 09 0a 74 61 67 38 35 02 78 04 72 31 04 72 32 |...tag85.x.r1.r2|
00000010: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 |.console.logt__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c |template-literal|
00000040: 2d 74 61 67 67 65 64 2d 74 65 6d 70 6c 61 74 65 |-tagged-template|
00000050: 2d 30 38 35 2e 6a 73 02 73 02 76 0c 00 06 00 a4 |-085.js.s.v.....|
00000060: 01 00 01 00 04 00 03 74 01 a6 01 00 00 00 40 e4 |.......t......@.|
00000070: 00 00 00 40 40 e5 00 00 00 80 40 e6 00 00 00 80 |...@@.....@.....|
00000080: 40 e7 00 00 00 80 c2 00 41 e4 00 00 00 00 3f e5 |@.......A.....?.|
00000090: 00 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 |....?.....?.....|
000000a0: bf 55 bf 0a 9e 3b e5 00 00 00 39 e4 00 00 00 c1 |.U...;....9.....|
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