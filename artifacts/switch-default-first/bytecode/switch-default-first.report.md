# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-default-first.ts
**生成时间**: 2025-12-09T14:28:02.801Z

## 大小对比

- TypeScript编译器: 157 字节
- WASM编译器: 165 字节
- 差异: -8 字节 (-4.85%)

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
      "string": "__tests__/compiler/fixtures/switch-default-first.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-default-first.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 97
  }
}
```

## 字节级差异

共发现 12 个字节差异:

- 偏移量 0x93: TS=0x08 vs WASM=0x10
- 偏移量 0x9a: TS=0x72 vs WASM=0x1b
- 偏移量 0x9b: TS=0x00 vs WASM=0x0e
- 偏移量 0x9c: TS=0x00 vs WASM=0x20
- 偏移量 0x9d: TS=EOF vs WASM=0x08
- 偏移量 0x9e: TS=EOF vs WASM=0x3b
- 偏移量 0x9f: TS=EOF vs WASM=0x15
- 偏移量 0xa0: TS=EOF vs WASM=0x1b
- 偏移量 0xa1: TS=EOF vs WASM=0x0e
- 偏移量 0xa2: TS=EOF vs WASM=0x20
- 偏移量 0xa3: TS=EOF vs WASM=0x08
- 偏移量 0xa4: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 64 65 66 61 75 6c 74 2d 66 69 |witch-default-fi|
00000030: 72 73 74 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c 65 |rst.js.a.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 04 01 00 33 00 ca 03 00 09 08 ec |........3.......|
00000060: 02 29 b7 e3 68 00 00 ee 12 39 e6 00 00 00 43 e7 |.)..h....9....C.|
00000070: 00 00 00 b9 24 01 00 0e ee 06 11 b7 ad ec eb 39 |....$..........9|
00000080: e6 00 00 00 43 e7 00 00 00 b7 24 01 00 0e 0e 06 |....C.....$.....|
00000090: 2f c8 03 08 00 00 21 10 1d 00 72 00 00          |/.....!...r..|
```

### WASM
```
00000000: 05 04 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 64 65 66 61 75 6c 74 2d 66 69 |witch-default-fi|
00000030: 72 73 74 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c 65 |rst.js.a.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 04 01 00 33 00 ca 03 00 09 08 ec |........3.......|
00000060: 02 29 b7 e3 68 00 00 ee 12 39 e6 00 00 00 43 e7 |.)..h....9....C.|
00000070: 00 00 00 b9 24 01 00 0e ee 06 11 b7 ad ec eb 39 |....$..........9|
00000080: e6 00 00 00 43 e7 00 00 00 b7 24 01 00 0e 0e 06 |....C.....$.....|
00000090: 2f c8 03 10 00 00 21 10 1d 00 1b 0e 20 08 3b 15 |/.....!..... .;.|
000000a0: 1b 0e 20 08 00                                  |.. ..|
```