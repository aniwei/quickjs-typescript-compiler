# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/try-catch.ts
**生成时间**: 2026-01-07T17:33:04.405Z

## 大小对比

- TypeScript编译器: 213 字节
- WASM编译器: 213 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-catch.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 159
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-catch.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 159
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...e.console.log|
00000010: 0a 65 72 72 6f 72 3e 5f 5f 74 65 73 74 73 5f 5f |.error>__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 74 72 79 2d 63 61 |/fixtures/try-ca|
00000030: 74 63 68 2e 6a 73 0c 00 06 00 a4 01 00 03 00 05 |tch.js..........|
00000040: 00 00 66 03 a6 01 00 00 00 c8 03 03 00 03 a6 01 |..f.............|
00000050: 00 01 00 06 cb 6f 1d 00 00 00 39 e5 00 00 00 43 |.....o....9....C|
00000060: e6 00 00 00 04 18 00 00 00 24 01 00 cb 04 e7 00 |.........$......|
00000070: 00 00 30 cc 6f 22 00 00 00 39 e5 00 00 00 43 e6 |..0.o"...9....C.|
00000080: 00 00 00 04 19 00 00 00 c8 24 02 00 cb 0e 06 70 |.........$.....p|
00000090: 0d 00 00 00 0e ee 21 70 05 00 00 00 30 c7 cd 06 |......!p....0...|
000000a0: cb 39 e5 00 00 00 43 e6 00 00 00 04 1a 00 00 00 |.9....C.........|
000000b0: 24 01 00 cb c9 cb 71 c7 28 d0 03 18 00 00 26 08 |$.....q.(.....&.|
000000c0: 1b 0e 34 08 30 15 28 00 1b 0e 34 1c 07 13 7d 15 |..4.0.(...4...}.|
000000d0: 1b 0e 34 08 00                                  |..4..|
```

### WASM
```
00000000: 05 05 02 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...e.console.log|
00000010: 0a 65 72 72 6f 72 3e 5f 5f 74 65 73 74 73 5f 5f |.error>__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 74 72 79 2d 63 61 |/fixtures/try-ca|
00000030: 74 63 68 2e 6a 73 0c 00 06 00 a4 01 00 03 00 05 |tch.js..........|
00000040: 00 00 66 03 a6 01 00 00 00 c8 03 03 00 03 a6 01 |..f.............|
00000050: 00 01 00 06 cb 6f 1d 00 00 00 39 e5 00 00 00 43 |.....o....9....C|
00000060: e6 00 00 00 04 18 00 00 00 24 01 00 cb 04 e7 00 |.........$......|
00000070: 00 00 30 cc 6f 22 00 00 00 39 e5 00 00 00 43 e6 |..0.o"...9....C.|
00000080: 00 00 00 04 19 00 00 00 c8 24 02 00 cb 0e 06 70 |.........$.....p|
00000090: 0d 00 00 00 0e ee 21 70 05 00 00 00 30 c7 cd 06 |......!p....0...|
000000a0: cb 39 e5 00 00 00 43 e6 00 00 00 04 1a 00 00 00 |.9....C.........|
000000b0: 24 01 00 cb c9 cb 71 c7 28 d0 03 18 00 00 26 08 |$.....q.(.....&.|
000000c0: 1b 0e 34 08 30 15 28 00 1b 0e 34 1c 07 13 7d 15 |..4.0.(...4...}.|
000000d0: 1b 0e 34 08 00                                  |..4..|
```