# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-031.ts
**生成时间**: 2025-12-25T01:17:43.919Z

## 大小对比

- TypeScript编译器: 193 字节
- WASM编译器: 193 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-031.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 131
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-031.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 131
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c |...x.y.console.l|
00000010: 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogV__tests__/fix|
00000020: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000030: 63 6f 6d 70 6c 65 78 2d 30 33 31 2e 6a 73 0c 00 |complex-031.js..|
00000040: 06 00 a4 01 00 01 00 06 00 00 54 01 a6 01 00 00 |..........T.....|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000060: 00 00 80 3f e5 00 00 00 80 bf 1f ba b1 bc b0 3b |...?...........;|
00000070: e4 00 00 00 39 e4 00 00 00 97 3b e5 00 00 00 39 |....9.....;....9|
00000080: e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 39 e5 |....C....9....9.|
00000090: 00 00 00 38 e5 00 00 00 99 39 e5 00 00 00 98 98 |...8.....9......|
000000a0: 24 04 00 cf 28 d0 03 18 00 00 8a 1c 0c 0a 21 0f |$...(.........!.|
000000b0: 1b 01 21 13 1b 0e 1b 0a 1b 06 1b 14 20 0a 25 25 |..!......... .%%|
000000c0: 00                                              |.|
```

### WASM
```
00000000: 05 05 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c |...x.y.console.l|
00000010: 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogV__tests__/fix|
00000020: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000030: 63 6f 6d 70 6c 65 78 2d 30 33 31 2e 6a 73 0c 00 |complex-031.js..|
00000040: 06 00 a4 01 00 01 00 06 00 00 54 01 a6 01 00 00 |..........T.....|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000060: 00 00 80 3f e5 00 00 00 80 bf 1f ba b1 bc b0 3b |...?...........;|
00000070: e4 00 00 00 39 e4 00 00 00 97 3b e5 00 00 00 39 |....9.....;....9|
00000080: e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 39 e5 |....C....9....9.|
00000090: 00 00 00 38 e5 00 00 00 99 39 e5 00 00 00 98 98 |...8.....9......|
000000a0: 24 04 00 cf 28 d0 03 18 00 00 8a 1c 0c 0a 21 0f |$...(.........!.|
000000b0: 1b 01 21 13 1b 0e 1b 0a 1b 06 1b 14 20 0a 25 25 |..!......... .%%|
000000c0: 00                                              |.|
```