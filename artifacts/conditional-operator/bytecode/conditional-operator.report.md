# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/conditional-operator.ts
**生成时间**: 2025-12-09T10:04:42.084Z

## 大小对比

- TypeScript编译器: 147 字节
- WASM编译器: 147 字节
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 77
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 77
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 6f 70 65 72 61 |onditional-opera|
00000030: 74 6f 72 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c |tor.js.console.l|
00000040: 6f 67 06 6e 6f 77 0d c8 03 00 00 00 00 00 0c 20 |og.now......... |
00000050: 06 01 a4 01 00 00 00 04 00 00 27 00 08 ec 02 29 |..........'....)|
00000060: 39 e5 00 00 00 43 e6 00 00 00 39 a7 00 00 00 43 |9....C....9....C|
00000070: e7 00 00 00 24 00 00 ec 04 b8 ee 02 b9 24 01 00 |....$........$..|
00000080: 0e 06 2f c8 03 0c 00 00 2f 0e 1b 0a 1b 08 1b 08 |../...../.......|
00000090: 2f 11 00                                        |/..|
```

### WASM
```
00000000: 05 04 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 6f 70 65 72 61 |onditional-opera|
00000030: 74 6f 72 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c |tor.js.console.l|
00000040: 6f 67 06 6e 6f 77 0d c8 03 00 00 00 00 00 0c 20 |og.now......... |
00000050: 06 01 a4 01 00 00 00 04 00 00 27 00 08 ec 02 29 |..........'....)|
00000060: 39 e5 00 00 00 43 e6 00 00 00 39 a7 00 00 00 43 |9....C....9....C|
00000070: e7 00 00 00 24 00 00 ec 04 b8 ee 02 b9 24 01 00 |....$........$..|
00000080: 0e 06 2f c8 03 0c 00 00 2f 0e 1b 0a 1b 08 1b 08 |../...../.......|
00000090: 2f 11 00                                        |/..|
```