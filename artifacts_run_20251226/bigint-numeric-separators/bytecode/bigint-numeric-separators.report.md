# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/bigint-numeric-separators.ts
**生成时间**: 2025-12-25T17:50:59.844Z

## 大小对比

- TypeScript编译器: 205 字节
- WASM编译器: 205 字节
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
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bigint-numeric-separators.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 139
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
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bigint-numeric-separators.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 139
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |og^__tests__/fix|
00000020: 74 75 72 65 73 2f 62 69 67 69 6e 74 2d 6e 75 6d |tures/bigint-num|
00000030: 65 72 69 63 2d 73 65 70 61 72 61 74 6f 72 73 2e |eric-separators.|
00000040: 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 01 56 01 |js............V.|
00000050: a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 |.....@.....@....|
00000060: 80 3f e4 00 00 00 80 3f e5 00 00 00 80 b4 e8 03 |.?.....?........|
00000070: 00 00 3b e4 00 00 00 b4 02 00 00 00 3b e5 00 00 |..;.........;...|
00000080: 00 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 |.9....C....9....|
00000090: 39 e5 00 00 00 9f 24 01 00 cb 39 e6 00 00 00 43 |9.....$...9....C|
000000a0: e7 00 00 00 c1 00 24 01 00 cf 28 d0 03 14 00 00 |......$...(.....|
000000b0: e1 00 1b 0e 1b 0a 1b 08 1b 03 07 05 17 15 1b 0e |................|
000000c0: 25 08 00 0a 08 15 81 e9 7d f4 10 22 11          |%.......}..".|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |og^__tests__/fix|
00000020: 74 75 72 65 73 2f 62 69 67 69 6e 74 2d 6e 75 6d |tures/bigint-num|
00000030: 65 72 69 63 2d 73 65 70 61 72 61 74 6f 72 73 2e |eric-separators.|
00000040: 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 01 56 01 |js............V.|
00000050: a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 |.....@.....@....|
00000060: 80 3f e4 00 00 00 80 3f e5 00 00 00 80 b4 e8 03 |.?.....?........|
00000070: 00 00 3b e4 00 00 00 b4 02 00 00 00 3b e5 00 00 |..;.........;...|
00000080: 00 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 |.9....C....9....|
00000090: 39 e5 00 00 00 9f 24 01 00 cb 39 e6 00 00 00 43 |9.....$...9....C|
000000a0: e7 00 00 00 c1 00 24 01 00 cf 28 d0 03 14 00 00 |......$...(.....|
000000b0: e1 00 1b 0e 1b 0a 1b 08 1b 03 07 05 17 15 1b 0e |................|
000000c0: 25 08 00 0a 08 15 81 e9 7d f4 10 22 11          |%.......}..".|
```