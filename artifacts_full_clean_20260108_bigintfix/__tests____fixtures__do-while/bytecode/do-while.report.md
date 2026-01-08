# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/do-while.ts
**生成时间**: 2026-01-08T02:49:37.685Z

## 大小对比

- TypeScript编译器: 150 字节
- WASM编译器: 150 字节
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
      "string": "i",
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
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 103
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
      "string": "i",
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
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 103
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2e 6a 73 0c |res/do-while.js.|
00000030: 00 06 00 a4 01 00 01 00 03 00 00 3e 01 a6 01 00 |...........>....|
00000040: 00 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b7 3b |..@.....?......;|
00000050: e4 00 00 00 06 cb 39 e5 00 00 00 43 e6 00 00 00 |......9....C....|
00000060: 39 e4 00 00 00 24 01 00 cb 39 e4 00 00 00 93 3a |9....$...9.....:|
00000070: e4 00 00 00 cb 39 e4 00 00 00 ba a5 ed d7 c7 28 |.....9.........(|
00000080: ce 03 12 00 00 68 08 1b 0e 1b 0a 1b 01 17 15 1b |.....h..........|
00000090: 02 26 08 20 04 00                               |.&. ..|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2e 6a 73 0c |res/do-while.js.|
00000030: 00 06 00 a4 01 00 01 00 03 00 00 3e 01 a6 01 00 |...........>....|
00000040: 00 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b7 3b |..@.....?......;|
00000050: e4 00 00 00 06 cb 39 e5 00 00 00 43 e6 00 00 00 |......9....C....|
00000060: 39 e4 00 00 00 24 01 00 cb 39 e4 00 00 00 93 3a |9....$...9.....:|
00000070: e4 00 00 00 cb 39 e4 00 00 00 ba a5 ed d7 c7 28 |.....9.........(|
00000080: ce 03 12 00 00 68 08 1b 0e 1b 0a 1b 01 17 15 1b |.....h..........|
00000090: 02 26 08 20 04 00                               |.&. ..|
```