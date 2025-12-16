# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/optional-catch-binding.ts
**生成时间**: 2025-12-16T14:11:02.569Z

## 大小对比

- TypeScript编译器: 192 字节
- WASM编译器: 177 字节
- 差异: 15 字节 (8.47%)

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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "boom",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "caught without binding",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-catch-binding.js",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 87,
    "tag": "0xc",
    "remaining": 105
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "boom",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "caught without binding",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-catch-binding.js",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 87,
    "tag": "0xc",
    "remaining": 90
  }
}
```

## 字节级差异

共发现 40 个字节差异:

- 偏移量 0x63: TS=0x42 vs WASM=0x35
- 偏移量 0x82: TS=0x21 vs WASM=0x1a
- 偏移量 0x98: TS=0x0e vs WASM=0xcb
- 偏移量 0x9a: TS=0x06 vs WASM=0xee
- 偏移量 0x9b: TS=0x70 vs WASM=0x02
- 偏移量 0x9c: TS=0x0d vs WASM=0x30
- 偏移量 0x9d: TS=0x00 vs WASM=0xc7
- 偏移量 0x9e: TS=0x00 vs WASM=0x28
- 偏移量 0x9f: TS=0x00 vs WASM=0xd0
- 偏移量 0xa0: TS=0x0e vs WASM=0x03
- 偏移量 0xa1: TS=0xee vs WASM=0x0e
- 偏移量 0xa2: TS=0x08 vs WASM=0x00
- 偏移量 0xa3: TS=0x70 vs WASM=0x00
- 偏移量 0xa4: TS=0x05 vs WASM=0x26
- 偏移量 0xa5: TS=0x00 vs WASM=0x1c
- 偏移量 0xa6: TS=0x00 vs WASM=0x39
- 偏移量 0xa7: TS=0x00 vs WASM=0x0a
- 偏移量 0xa8: TS=0x30 vs WASM=0x11
- 偏移量 0xa9: TS=0x71 vs WASM=0x1d
- 偏移量 0xaa: TS=0xc7 vs WASM=0x28
- ... (显示前20个差异，总共40个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 08 62 6f 6f 6d 0e 63 6f 6e 73 6f 6c 65 06 |...boom.console.|
00000010: 6c 6f 67 2c 63 61 75 67 68 74 20 77 69 74 68 6f |log,caught witho|
00000020: 75 74 20 62 69 6e 64 69 6e 67 58 5f 5f 74 65 73 |ut bindingX__tes|
00000030: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 6f 70 |ts__/fixtures/op|
00000040: 74 69 6f 6e 61 6c 2d 63 61 74 63 68 2d 62 69 6e |tional-catch-bin|
00000050: 64 69 6e 67 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |ding.js.........|
00000060: 04 00 00 42 01 a6 01 00 00 00 06 cb 6f 13 00 00 |...B........o...|
00000070: 00 39 9f 00 00 00 11 04 e4 00 00 00 21 01 00 30 |.9..........!..0|
00000080: 0e 6f 21 00 00 00 39 e5 00 00 00 43 e6 00 00 00 |.o!...9....C....|
00000090: 04 e7 00 00 00 24 01 00 0e 0e 06 70 0d 00 00 00 |.....$.....p....|
000000a0: 0e ee 08 70 05 00 00 00 30 71 c7 28 d0 03 10 00 |...p....0q.(....|
000000b0: 00 26 1c 20 0c 1b 13 11 0b 28 00 34 18 1b 17 00 |.&. .....(.4....|
```

### WASM
```
00000000: 05 05 08 62 6f 6f 6d 0e 63 6f 6e 73 6f 6c 65 06 |...boom.console.|
00000010: 6c 6f 67 2c 63 61 75 67 68 74 20 77 69 74 68 6f |log,caught witho|
00000020: 75 74 20 62 69 6e 64 69 6e 67 58 5f 5f 74 65 73 |ut bindingX__tes|
00000030: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 6f 70 |ts__/fixtures/op|
00000040: 74 69 6f 6e 61 6c 2d 63 61 74 63 68 2d 62 69 6e |tional-catch-bin|
00000050: 64 69 6e 67 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |ding.js.........|
00000060: 04 00 00 35 01 a6 01 00 00 00 06 cb 6f 13 00 00 |...5........o...|
00000070: 00 39 9f 00 00 00 11 04 e4 00 00 00 21 01 00 30 |.9..........!..0|
00000080: 0e 6f 1a 00 00 00 39 e5 00 00 00 43 e6 00 00 00 |.o....9....C....|
00000090: 04 e7 00 00 00 24 01 00 cb 0e ee 02 30 c7 28 d0 |.....$......0.(.|
000000a0: 03 0e 00 00 26 1c 39 0a 11 1d 28 00 1b 0e 34 08 |....&.9...(...4.|
000000b0: 00                                              |.|
```