# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-literal.ts
**生成时间**: 2025-12-25T08:56:15.826Z

## 大小对比

- TypeScript编译器: 134 字节
- WASM编译器: 134 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-literal.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 80
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-literal.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 80
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 06 61 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c |...arr.console.l|
00000010: 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogF__tests__/fix|
00000020: 74 75 72 65 73 2f 61 72 72 61 79 2d 6c 69 74 65 |tures/array-lite|
00000030: 72 61 6c 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 |ral.js..........|
00000040: 00 00 2d 01 a6 01 00 00 00 40 e4 00 00 00 80 3f |..-......@.....?|
00000050: e4 00 00 00 80 b8 b9 ba 26 03 00 3b e4 00 00 00 |........&..;....|
00000060: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 b8 |9....C....9.....|
00000070: 48 24 01 00 cf 28 ce 03 0c 00 00 76 00 1b 0e 1b |H$...(.....v....|
00000080: 0a 20 06 07 07 00                               |. ....|
```

### WASM
```
00000000: 05 04 06 61 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c |...arr.console.l|
00000010: 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogF__tests__/fix|
00000020: 74 75 72 65 73 2f 61 72 72 61 79 2d 6c 69 74 65 |tures/array-lite|
00000030: 72 61 6c 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 |ral.js..........|
00000040: 00 00 2d 01 a6 01 00 00 00 40 e4 00 00 00 80 3f |..-......@.....?|
00000050: e4 00 00 00 80 b8 b9 ba 26 03 00 3b e4 00 00 00 |........&..;....|
00000060: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 b8 |9....C....9.....|
00000070: 48 24 01 00 cf 28 ce 03 0c 00 00 76 00 1b 0e 1b |H$...(.....v....|
00000080: 0a 20 06 07 07 00                               |. ....|
```