# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/try-catch-finally.ts
**生成时间**: 2025-12-25T17:57:15.940Z

## 大小对比

- TypeScript编译器: 183 字节
- WASM编译器: 183 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-catch-finally.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 125
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-catch-finally.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 125
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...e.console.log|
00000010: 02 66 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.fN__tests__/fix|
00000020: 74 75 72 65 73 2f 74 72 79 2d 63 61 74 63 68 2d |tures/try-catch-|
00000030: 66 69 6e 61 6c 6c 79 2e 6a 73 0c 00 06 00 a4 01 |finally.js......|
00000040: 00 03 00 05 00 00 4a 03 a6 01 00 00 00 c8 03 03 |......J.........|
00000050: 00 03 a6 01 00 01 00 06 cb 6f 06 00 00 00 b8 30 |.........o.....0|
00000060: cc 6f 1d 00 00 00 39 e5 00 00 00 43 e6 00 00 00 |.o....9....C....|
00000070: c8 24 01 00 cb 0e 06 70 0d 00 00 00 0e ee 21 70 |.$.....p......!p|
00000080: 05 00 00 00 30 c7 cd 06 cb 39 e5 00 00 00 43 e6 |....0....9....C.|
00000090: 00 00 00 04 e7 00 00 00 24 01 00 cb c9 cb 71 c7 |........$.....q.|
000000a0: 28 d0 03 12 00 00 2c 08 28 00 1b 0e 1b 0a 07 01 |(.....,.(.......|
000000b0: 7d 15 1b 0e 34 08 00                            |}...4..|
```

### WASM
```
00000000: 05 05 02 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...e.console.log|
00000010: 02 66 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.fN__tests__/fix|
00000020: 74 75 72 65 73 2f 74 72 79 2d 63 61 74 63 68 2d |tures/try-catch-|
00000030: 66 69 6e 61 6c 6c 79 2e 6a 73 0c 00 06 00 a4 01 |finally.js......|
00000040: 00 03 00 05 00 00 4a 03 a6 01 00 00 00 c8 03 03 |......J.........|
00000050: 00 03 a6 01 00 01 00 06 cb 6f 06 00 00 00 b8 30 |.........o.....0|
00000060: cc 6f 1d 00 00 00 39 e5 00 00 00 43 e6 00 00 00 |.o....9....C....|
00000070: c8 24 01 00 cb 0e 06 70 0d 00 00 00 0e ee 21 70 |.$.....p......!p|
00000080: 05 00 00 00 30 c7 cd 06 cb 39 e5 00 00 00 43 e6 |....0....9....C.|
00000090: 00 00 00 04 e7 00 00 00 24 01 00 cb c9 cb 71 c7 |........$.....q.|
000000a0: 28 d0 03 12 00 00 2c 08 28 00 1b 0e 1b 0a 07 01 |(.....,.(.......|
000000b0: 7d 15 1b 0e 34 08 00                            |}...4..|
```