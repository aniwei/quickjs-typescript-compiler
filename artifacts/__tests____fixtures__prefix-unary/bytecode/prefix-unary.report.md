# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/prefix-unary.ts
**生成时间**: 2026-01-08T03:25:32.191Z

## 大小对比

- TypeScript编译器: 194 字节
- WASM编译器: 194 字节
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/prefix-unary.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 143
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/prefix-unary.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 143
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |D__tests__/fixtu|
00000020: 72 65 73 2f 70 72 65 66 69 78 2d 75 6e 61 72 79 |res/prefix-unary|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 5a |.js............Z|
00000040: 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 |......@.....?...|
00000050: 00 82 b8 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 |...;....9....C..|
00000060: 00 00 39 e4 00 00 00 91 11 3a e4 00 00 00 24 01 |..9......:....$.|
00000070: 00 cb 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 |..9....C....9...|
00000080: 00 90 11 3a e4 00 00 00 24 01 00 cb 39 e5 00 00 |...:....$...9...|
00000090: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cf 28 |.C....9....$...(|
000000a0: ce 03 1e 00 00 5d 00 1b 0e 1b 0e 1b 03 25 01 17 |.....].......%..|
000000b0: 15 1b 0e 1b 0e 1b 03 25 01 17 15 1b 0e 1b 0a 1b |.......%........|
000000c0: 01 00                                           |..|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |D__tests__/fixtu|
00000020: 72 65 73 2f 70 72 65 66 69 78 2d 75 6e 61 72 79 |res/prefix-unary|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 5a |.js............Z|
00000040: 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 |......@.....?...|
00000050: 00 82 b8 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 |...;....9....C..|
00000060: 00 00 39 e4 00 00 00 91 11 3a e4 00 00 00 24 01 |..9......:....$.|
00000070: 00 cb 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 |..9....C....9...|
00000080: 00 90 11 3a e4 00 00 00 24 01 00 cb 39 e5 00 00 |...:....$...9...|
00000090: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cf 28 |.C....9....$...(|
000000a0: ce 03 1e 00 00 5d 00 1b 0e 1b 0e 1b 03 25 01 17 |.....].......%..|
000000b0: 15 1b 0e 1b 0e 1b 03 25 01 17 15 1b 0e 1b 0a 1b |.......%........|
000000c0: 01 00                                           |..|
```