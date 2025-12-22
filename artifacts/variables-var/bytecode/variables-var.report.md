# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/variables-var.ts
**生成时间**: 2025-12-22T09:18:38.943Z

## 大小对比

- TypeScript编译器: 170 字节
- WASM编译器: 170 字节
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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-var.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 116
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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-var.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 116
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogF__tests__/fix|
00000020: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000030: 76 61 72 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 |var.js..........|
00000040: 00 00 4b 01 a6 01 00 00 00 40 e4 00 00 00 00 40 |..K......@.....@|
00000050: e5 00 00 00 00 3f e4 00 00 00 00 3f e5 00 00 00 |.....?.....?....|
00000060: 00 b8 3a e4 00 00 00 39 e6 00 00 00 43 e7 00 00 |..:....9....C...|
00000070: 00 39 e4 00 00 00 24 01 00 cb b9 3a e5 00 00 00 |.9....$....:....|
00000080: 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 00 24 |9....C....9....$|
00000090: 01 00 cf 28 d0 03 12 00 00 99 00 1b 0e 1b 0a 1b |...(............|
000000a0: 01 36 15 1b 0e 1b 0a 1b 01 00                   |.6........|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogF__tests__/fix|
00000020: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000030: 76 61 72 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 |var.js..........|
00000040: 00 00 4b 01 a6 01 00 00 00 40 e4 00 00 00 00 40 |..K......@.....@|
00000050: e5 00 00 00 00 3f e4 00 00 00 00 3f e5 00 00 00 |.....?.....?....|
00000060: 00 b8 3a e4 00 00 00 39 e6 00 00 00 43 e7 00 00 |..:....9....C...|
00000070: 00 39 e4 00 00 00 24 01 00 cb b9 3a e5 00 00 00 |.9....$....:....|
00000080: 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 00 24 |9....C....9....$|
00000090: 01 00 cf 28 d0 03 12 00 00 99 00 1b 0e 1b 0a 1b |...(............|
000000a0: 01 36 15 1b 0e 1b 0a 1b 01 00                   |.6........|
```