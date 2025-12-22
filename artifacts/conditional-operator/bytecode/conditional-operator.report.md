# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/conditional-operator.ts
**生成时间**: 2025-12-22T14:32:14.468Z

## 大小对比

- TypeScript编译器: 130 字节
- WASM编译器: 130 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/conditional-operator.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 69
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "now",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/conditional-operator.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 69
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 06 6e |...console.log.n|
00000010: 6f 77 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |owT__tests__/fix|
00000020: 74 75 72 65 73 2f 63 6f 6e 64 69 74 69 6f 6e 61 |tures/conditiona|
00000030: 6c 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 00 06 |l-operator.js...|
00000040: 00 a4 01 00 01 00 04 00 00 22 01 a6 01 00 00 00 |........."......|
00000050: 39 e4 00 00 00 43 e5 00 00 00 39 a7 00 00 00 43 |9....C....9....C|
00000060: e6 00 00 00 24 00 00 ec 04 b8 ee 02 b9 24 01 00 |....$........$..|
00000070: cf 28 ce 03 0c 00 00 1b 0e 1b 0a 1b 08 1b 08 2f |.(............./|
00000080: 11 00                                           |..|
```

### WASM
```
00000000: 05 04 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 06 6e |...console.log.n|
00000010: 6f 77 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |owT__tests__/fix|
00000020: 74 75 72 65 73 2f 63 6f 6e 64 69 74 69 6f 6e 61 |tures/conditiona|
00000030: 6c 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 00 06 |l-operator.js...|
00000040: 00 a4 01 00 01 00 04 00 00 22 01 a6 01 00 00 00 |........."......|
00000050: 39 e4 00 00 00 43 e5 00 00 00 39 a7 00 00 00 43 |9....C....9....C|
00000060: e6 00 00 00 24 00 00 ec 04 b8 ee 02 b9 24 01 00 |....$........$..|
00000070: cf 28 ce 03 0c 00 00 1b 0e 1b 0a 1b 08 1b 08 2f |.(............./|
00000080: 11 00                                           |..|
```