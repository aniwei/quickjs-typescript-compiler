# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/nullish-assignment.ts
**生成时间**: 2025-12-25T17:57:15.255Z

## 大小对比

- TypeScript编译器: 252 字节
- WASM编译器: 252 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 5,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/nullish-assignment.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 191
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
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 5,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/nullish-assignment.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 191
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 02 78 02 79 02 7a 0e 63 6f 6e 73 6f 6c 65 |...x.y.z.console|
00000010: 06 6c 6f 67 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logP__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 6e 75 6c 6c 69 73 68 2d |ixtures/nullish-|
00000030: 61 73 73 69 67 6e 6d 65 6e 74 2e 6a 73 0c 00 06 |assignment.js...|
00000040: 00 a4 01 00 01 00 05 00 00 91 01 01 a6 01 00 00 |................|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 |.@.....@.....@..|
00000060: 00 00 80 3f e4 00 00 00 82 3f e5 00 00 00 82 3f |...?.....?.....?|
00000070: e6 00 00 00 82 07 3b e4 00 00 00 7d e4 00 00 00 |......;....}....|
00000080: 3d 11 b2 ec 07 0e b8 16 3e ee 03 0f 0f cb b7 3b |=.......>......;|
00000090: e5 00 00 00 7d e5 00 00 00 3d 11 b2 ec 07 0e b9 |....}....=......|
000000a0: 16 3e ee 03 0f 0f cb 39 47 00 00 00 3b e6 00 00 |.>.....9G...;...|
000000b0: 00 7d e6 00 00 00 3d 11 b2 ec 07 0e ba 16 3e ee |.}....=.......>.|
000000c0: 03 0f 0f cb 39 e7 00 00 00 43 e8 00 00 00 39 e4 |....9....C....9.|
000000d0: 00 00 00 39 e5 00 00 00 39 e6 00 00 00 24 03 00 |...9....9....$..|
000000e0: cf 28 d2 03 16 00 00 d6 00 81 00 62 10 35 0f 62 |.(.........b.5.b|
000000f0: 00 1b 0e 1b 0a 1b 06 1b 06 1b 0d 00             |............|
```

### WASM
```
00000000: 05 06 02 78 02 79 02 7a 0e 63 6f 6e 73 6f 6c 65 |...x.y.z.console|
00000010: 06 6c 6f 67 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logP__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 6e 75 6c 6c 69 73 68 2d |ixtures/nullish-|
00000030: 61 73 73 69 67 6e 6d 65 6e 74 2e 6a 73 0c 00 06 |assignment.js...|
00000040: 00 a4 01 00 01 00 05 00 00 91 01 01 a6 01 00 00 |................|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 |.@.....@.....@..|
00000060: 00 00 80 3f e4 00 00 00 82 3f e5 00 00 00 82 3f |...?.....?.....?|
00000070: e6 00 00 00 82 07 3b e4 00 00 00 7d e4 00 00 00 |......;....}....|
00000080: 3d 11 b2 ec 07 0e b8 16 3e ee 03 0f 0f cb b7 3b |=.......>......;|
00000090: e5 00 00 00 7d e5 00 00 00 3d 11 b2 ec 07 0e b9 |....}....=......|
000000a0: 16 3e ee 03 0f 0f cb 39 47 00 00 00 3b e6 00 00 |.>.....9G...;...|
000000b0: 00 7d e6 00 00 00 3d 11 b2 ec 07 0e ba 16 3e ee |.}....=.......>.|
000000c0: 03 0f 0f cb 39 e7 00 00 00 43 e8 00 00 00 39 e4 |....9....C....9.|
000000d0: 00 00 00 39 e5 00 00 00 39 e6 00 00 00 24 03 00 |...9....9....$..|
000000e0: cf 28 d2 03 16 00 00 d6 00 81 00 62 10 35 0f 62 |.(.........b.5.b|
000000f0: 00 1b 0e 1b 0a 1b 06 1b 06 1b 0d 00             |............|
```