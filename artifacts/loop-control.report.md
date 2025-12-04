# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/loop-control.ts
**生成时间**: 2025-12-02T17:07:51.270Z

## 大小对比

- TypeScript编译器: 179 字节
- WASM编译器: 175 字节
- 差异: 4 字节 (2.29%)

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-control.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 119
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-control.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 59 个字节差异:

- 偏移量 0x50: TS=0x3f vs WASM=0x3b
- 偏移量 0x63: TS=0x30 vs WASM=0x2c
- 偏移量 0x73: TS=0xec vs WASM=0xed
- 偏移量 0x74: TS=0x03 vs WASM=0xe8
- 偏移量 0x75: TS=0xee vs WASM=0x39
- 偏移量 0x77: TS=0x39 vs WASM=0x00
- 偏移量 0x78: TS=0xe6 vs WASM=0x00
- 偏移量 0x7a: TS=0x00 vs WASM=0x43
- 偏移量 0x7b: TS=0x00 vs WASM=0xe7
- 偏移量 0x7c: TS=0x43 vs WASM=0x00
- 偏移量 0x7d: TS=0xe7 vs WASM=0x00
- 偏移量 0x7f: TS=0x00 vs WASM=0x68
- 偏移量 0x81: TS=0x68 vs WASM=0x00
- 偏移量 0x82: TS=0x00 vs WASM=0x24
- 偏移量 0x83: TS=0x00 vs WASM=0x01
- 偏移量 0x84: TS=0x24 vs WASM=0x00
- 偏移量 0x85: TS=0x01 vs WASM=0x0e
- 偏移量 0x86: TS=0x00 vs WASM=0x68
- 偏移量 0x87: TS=0x0e vs WASM=0x00
- 偏移量 0x88: TS=0x68 vs WASM=0x00
- ... (显示前20个差异，总共59个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 63 6f 6e 74 72 6f 6c 2e 6a 73 02 69 |oop-control.js.i|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 |..... ..........|
00000050: 3f 00 ca 03 00 09 08 ec 02 29 b7 e3 68 00 00 bf |?........)..h...|
00000060: 0a a5 ec 30 68 00 00 b8 9f 11 69 00 00 0e 68 00 |...0h.....i...h.|
00000070: 00 bc a5 ec 03 ee e6 39 e6 00 00 00 43 e7 00 00 |.......9....C...|
00000080: 00 68 00 00 24 01 00 0e 68 00 00 be a7 ec 03 ee |.h..$...h.......|
00000090: 03 ee ca 06 2f c8 03 1a 00 00 21 0e 1b 04 12 01 |..../.....!.....|
000000a0: 16 04 21 03 16 04 1e 0b 1b 0e 1b 0a 11 01 17 0d |..!.............|
000000b0: 16 04 00                                        |...|
```

### WASM
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 63 6f 6e 74 72 6f 6c 2e 6a 73 02 69 |oop-control.js.i|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 |..... ..........|
00000050: 3b 00 ca 03 00 09 08 ec 02 29 b7 e3 68 00 00 bf |;........)..h...|
00000060: 0a a5 ec 2c 68 00 00 b8 9f 11 69 00 00 0e 68 00 |...,h.....i...h.|
00000070: 00 bc a5 ed e8 39 e6 00 00 00 43 e7 00 00 00 68 |.....9....C....h|
00000080: 00 00 24 01 00 0e 68 00 00 be a7 ed 03 ee ce 06 |..$...h.........|
00000090: 2f c8 03 1a 00 00 21 0e 1b 04 12 01 16 04 21 03 |/.....!.......!.|
000000a0: 16 04 14 0b 1b 0e 1b 0a 11 01 17 0d 16 04 00    |...............|
```