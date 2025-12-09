# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/function-call.ts
**生成时间**: 2025-12-09T09:46:45.369Z

## 大小对比

- TypeScript编译器: 191 字节
- WASM编译器: 191 字节
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-call.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 121
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-call.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 0c |unction-call.js.|
00000030: 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c 65 06 6c |result.console.l|
00000040: 6f 67 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 |og.a.b......... |
00000050: 06 01 a4 01 00 00 00 03 02 01 1f 00 d4 01 00 01 |................|
00000060: ca 03 01 09 08 ec 05 c2 00 e3 29 df b8 b9 f2 e4 |..........).....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
00000080: 0e 06 2f c8 03 0e 00 00 28 1a 11 06 0d 1f 1b 0e |../.....(.......|
00000090: 1b 0a 11 01 00 0c 43 06 01 d4 01 02 00 02 02 00 |......C.........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 00 03 16 07 08 07 03 07 11 00    |(..............|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 0c |unction-call.js.|
00000030: 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c 65 06 6c |result.console.l|
00000040: 6f 67 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 |og.a.b......... |
00000050: 06 01 a4 01 00 00 00 03 02 01 1f 00 d4 01 00 01 |................|
00000060: ca 03 01 09 08 ec 05 c2 00 e3 29 df b8 b9 f2 e4 |..........).....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
00000080: 0e 06 2f c8 03 0e 00 00 28 1a 11 06 0d 1f 1b 0e |../.....(.......|
00000090: 1b 0a 11 01 00 0c 43 06 01 d4 01 02 00 02 02 00 |......C.........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 00 03 16 07 08 07 03 07 11 00    |(..............|
```