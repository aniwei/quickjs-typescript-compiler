# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-default-first.ts
**生成时间**: 2025-12-22T18:56:13.808Z

## 大小对比

- TypeScript编译器: 165 字节
- WASM编译器: 165 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-default-first.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 106
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-default-first.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 106
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |T__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 64 65 66 61 75 |res/switch-defau|
00000030: 6c 74 2d 66 69 72 73 74 2e 6a 73 0c 00 06 00 a4 |lt-first.js.....|
00000040: 01 00 01 00 04 00 00 43 01 a6 01 00 00 00 40 e4 |.......C......@.|
00000050: 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 00 |....?......;....|
00000060: 06 cb 39 e4 00 00 00 ee 12 39 e5 00 00 00 43 e6 |..9......9....C.|
00000070: 00 00 00 b9 24 01 00 cb ee 06 11 b7 ad ec eb 39 |....$..........9|
00000080: e5 00 00 00 43 e6 00 00 00 b7 24 01 00 cb 0e c7 |....C.....$.....|
00000090: 28 ce 03 10 00 00 67 10 27 00 1b 0e 20 08 3b 15 |(.....g.'... .;.|
000000a0: 1b 0e 20 08 00                                  |.. ..|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |T__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 64 65 66 61 75 |res/switch-defau|
00000030: 6c 74 2d 66 69 72 73 74 2e 6a 73 0c 00 06 00 a4 |lt-first.js.....|
00000040: 01 00 01 00 04 00 00 43 01 a6 01 00 00 00 40 e4 |.......C......@.|
00000050: 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 00 |....?......;....|
00000060: 06 cb 39 e4 00 00 00 ee 12 39 e5 00 00 00 43 e6 |..9......9....C.|
00000070: 00 00 00 b9 24 01 00 cb ee 06 11 b7 ad ec eb 39 |....$..........9|
00000080: e5 00 00 00 43 e6 00 00 00 b7 24 01 00 cb 0e c7 |....C.....$.....|
00000090: 28 ce 03 10 00 00 67 10 27 00 1b 0e 20 08 3b 15 |(.....g.'... .;.|
000000a0: 1b 0e 20 08 00                                  |.. ..|
```