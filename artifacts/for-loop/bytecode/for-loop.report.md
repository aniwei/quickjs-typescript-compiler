# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-loop.ts
**生成时间**: 2025-12-26T13:59:19.585Z

## 大小对比

- TypeScript编译器: 136 字节
- WASM编译器: 136 字节
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
      "string": "__tests__/fixtures/for-loop.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 89
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
      "string": "__tests__/fixtures/for-loop.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 89
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
00000020: 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2e 6a 73 0c |res/for-loop.js.|
00000030: 00 06 00 a4 01 00 02 00 03 00 00 2b 02 a6 01 00 |...........+....|
00000040: 00 00 c8 03 02 00 20 06 cb 63 01 00 b7 cc 64 01 |...... ..c....d.|
00000050: 00 ba a5 ec 1c 39 e5 00 00 00 43 e6 00 00 00 64 |.....9....C....d|
00000060: 01 00 24 01 00 cb 64 01 00 93 65 01 00 0e ee df |..$...d...e.....|
00000070: c7 28 ce 03 12 00 00 25 20 16 04 12 1b 1b 0e 1b |.(.....% .......|
00000080: 0a 11 01 15 10 11 02 00                         |........|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 3c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |<__tests__/fixtu|
00000020: 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2e 6a 73 0c |res/for-loop.js.|
00000030: 00 06 00 a4 01 00 02 00 03 00 00 2b 02 a6 01 00 |...........+....|
00000040: 00 00 c8 03 02 00 20 06 cb 63 01 00 b7 cc 64 01 |...... ..c....d.|
00000050: 00 ba a5 ec 1c 39 e5 00 00 00 43 e6 00 00 00 64 |.....9....C....d|
00000060: 01 00 24 01 00 cb 64 01 00 93 65 01 00 0e ee df |..$...d...e.....|
00000070: c7 28 ce 03 12 00 00 25 20 16 04 12 1b 1b 0e 1b |.(.....% .......|
00000080: 0a 11 01 15 10 11 02 00                         |........|
```