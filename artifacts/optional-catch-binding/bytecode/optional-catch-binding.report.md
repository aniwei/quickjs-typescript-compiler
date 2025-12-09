# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/optional-catch-binding.ts
**生成时间**: 2025-12-09T07:55:07.057Z

## 大小对比

- TypeScript编译器: 184 字节
- WASM编译器: 191 字节
- 差异: -7 字节 (-3.66%)

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
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/optional-catch-binding.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "boom",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "caught without binding",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 88
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
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/optional-catch-binding.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "boom",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "caught without binding",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 95
  }
}
```

## 字节级差异

共发现 39 个字节差异:

- 偏移量 0x74: TS=0x32 vs WASM=0x37
- 偏移量 0x8f: TS=0x39 vs WASM=0x6f
- 偏移量 0x90: TS=0xe6 vs WASM=0x1a
- 偏移量 0x94: TS=0x43 vs WASM=0x39
- 偏移量 0x95: TS=0xe7 vs WASM=0xe6
- 偏移量 0x99: TS=0x04 vs WASM=0x43
- 偏移量 0x9a: TS=0xe8 vs WASM=0xe7
- 偏移量 0x9e: TS=0x24 vs WASM=0x04
- 偏移量 0x9f: TS=0x01 vs WASM=0xe8
- 偏移量 0xa1: TS=0x0e vs WASM=0x00
- 偏移量 0xa2: TS=0x06 vs WASM=0x00
- 偏移量 0xa3: TS=0x0e vs WASM=0x24
- 偏移量 0xa4: TS=0xee vs WASM=0x01
- 偏移量 0xa5: TS=0x01 vs WASM=0x00
- 偏移量 0xa6: TS=0x06 vs WASM=0x0e
- 偏移量 0xa7: TS=0x2f vs WASM=0x0e
- 偏移量 0xa8: TS=0xc8 vs WASM=0xee
- 偏移量 0xa9: TS=0x03 vs WASM=0x02
- 偏移量 0xaa: TS=0x0c vs WASM=0x30
- 偏移量 0xab: TS=0x00 vs WASM=0x06
- ... (显示前20个差异，总共39个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 61 74 63 68 2d 62 69 |ptional-catch-bi|
00000030: 6e 64 69 6e 67 2e 6a 73 08 62 6f 6f 6d 0e 63 6f |nding.js.boom.co|
00000040: 6e 73 6f 6c 65 06 6c 6f 67 2c 63 61 75 67 68 74 |nsole.log,caught|
00000050: 20 77 69 74 68 6f 75 74 20 62 69 6e 64 69 6e 67 | without binding|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 04 00 00 32 00 08 ec 02 29 6f 13 00 00 00 39 |....2....)o....9|
00000080: 9f 00 00 00 11 04 e5 00 00 00 21 01 00 30 0e 39 |..........!..0.9|
00000090: e6 00 00 00 43 e7 00 00 00 04 e8 00 00 00 24 01 |....C.........$.|
000000a0: 00 0e 06 0e ee 01 06 2f c8 03 0c 00 00 30 1c 48 |......./.....0.H|
000000b0: 13 0f 00 1b 0e 34 08 00                         |.....4..|
```

### WASM
```
00000000: 05 05 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 74 69 6f 6e 61 6c 2d 63 61 74 63 68 2d 62 69 |ptional-catch-bi|
00000030: 6e 64 69 6e 67 2e 6a 73 08 62 6f 6f 6d 0e 63 6f |nding.js.boom.co|
00000040: 6e 73 6f 6c 65 06 6c 6f 67 2c 63 61 75 67 68 74 |nsole.log,caught|
00000050: 20 77 69 74 68 6f 75 74 20 62 69 6e 64 69 6e 67 | without binding|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 04 00 00 37 00 08 ec 02 29 6f 13 00 00 00 39 |....7....)o....9|
00000080: 9f 00 00 00 11 04 e5 00 00 00 21 01 00 30 0e 6f |..........!..0.o|
00000090: 1a 00 00 00 39 e6 00 00 00 43 e7 00 00 00 04 e8 |....9....C......|
000000a0: 00 00 00 24 01 00 0e 0e ee 02 30 06 2f c8 03 0e |...$......0./...|
000000b0: 00 00 30 1c 39 0a 11 1d 28 00 1b 0e 34 08 00    |..0.9...(...4..|
```