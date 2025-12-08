# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/try-catch.ts
**生成时间**: 2025-12-08T11:03:24.725Z

## 大小对比

- TypeScript编译器: 216 字节
- WASM编译器: 216 字节
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 153
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 153
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2e 6a 73 02 65 0e 63 6f |ry-catch.js.e.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0a 65 72 72 6f 72 0d |nsole.log.error.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000050: 05 00 00 62 01 ca 03 03 00 03 08 ec 02 29 6f 1d |...b.........)o.|
00000060: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 04 18 00 |...9....C.......|
00000070: 00 00 24 01 00 0e 04 e8 00 00 00 30 cb 6f 22 00 |..$........0.o".|
00000080: 00 00 39 e6 00 00 00 43 e7 00 00 00 04 19 00 00 |..9....C........|
00000090: 00 c7 24 02 00 0e 0e 06 70 0d 00 00 00 0e ee 1b |..$.....p.......|
000000a0: 70 05 00 00 00 30 39 e6 00 00 00 43 e7 00 00 00 |p....09....C....|
000000b0: 04 1a 00 00 00 24 01 00 0e 71 06 2f c8 03 18 00 |.....$...q./....|
000000c0: 00 30 08 1b 0e 34 08 30 15 28 00 1b 0e 34 1c 07 |.0...4.0.(...4..|
000000d0: 13 69 15 1b 0e 34 08 00                         |.i...4..|
```

### WASM
```
00000000: 05 05 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2e 6a 73 02 65 0e 63 6f |ry-catch.js.e.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0a 65 72 72 6f 72 0d |nsole.log.error.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000050: 05 00 00 62 01 ca 03 03 00 03 08 ec 02 29 6f 1d |...b.........)o.|
00000060: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 04 18 00 |...9....C.......|
00000070: 00 00 24 01 00 0e 04 e8 00 00 00 30 cb 6f 22 00 |..$........0.o".|
00000080: 00 00 39 e6 00 00 00 43 e7 00 00 00 04 19 00 00 |..9....C........|
00000090: 00 c7 24 02 00 0e 0e 06 70 0d 00 00 00 0e ee 1b |..$.....p.......|
000000a0: 70 05 00 00 00 30 39 e6 00 00 00 43 e7 00 00 00 |p....09....C....|
000000b0: 04 1a 00 00 00 24 01 00 0e 71 06 2f c8 03 18 00 |.....$...q./....|
000000c0: 00 30 08 1b 0e 34 08 30 15 28 00 1b 0e 34 1c 07 |.0...4.0.(...4..|
000000d0: 13 69 15 1b 0e 34 08 00                         |.i...4..|
```