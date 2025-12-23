# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/console-log.ts
**生成时间**: 2025-12-23T03:24:22.134Z

## 大小对比

- TypeScript编译器: 109 字节
- WASM编译器: 109 字节
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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/console-log.js",
      "offset": 26
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 49
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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/console-log.js",
      "offset": 26
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 49
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 16 48 |...console.log.H|
00000010: 65 6c 6c 6f 20 57 6f 72 6c 64 42 5f 5f 74 65 73 |ello WorldB__tes|
00000020: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000030: 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0c 00 06 00 |nsole-log.js....|
00000040: a4 01 00 01 00 03 00 00 14 01 a6 01 00 00 00 39 |...............9|
00000050: e4 00 00 00 43 e5 00 00 00 04 e6 00 00 00 24 01 |....C.........$.|
00000060: 00 cf 28 ce 03 06 00 00 1b 0e 34 08 00          |..(.......4..|
```

### WASM
```
00000000: 05 04 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 16 48 |...console.log.H|
00000010: 65 6c 6c 6f 20 57 6f 72 6c 64 42 5f 5f 74 65 73 |ello WorldB__tes|
00000020: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000030: 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0c 00 06 00 |nsole-log.js....|
00000040: a4 01 00 01 00 03 00 00 14 01 a6 01 00 00 00 39 |...............9|
00000050: e4 00 00 00 43 e5 00 00 00 04 e6 00 00 00 24 01 |....C.........$.|
00000060: 00 cf 28 ce 03 06 00 00 1b 0e 34 08 00          |..(.......4..|
```