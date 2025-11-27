# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/loop-control.ts
**生成时间**: 2025-11-27T11:37:31.009Z

## 大小对比

- TypeScript编译器: 175 字节
- WASM编译器: 175 字节
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

共发现 3 个字节差异:

- 偏移量 0x9b: TS=0x05 vs WASM=0x01
- 偏移量 0xa3: TS=0x07 vs WASM=0x0b
- 偏移量 0xab: TS=0x11 vs WASM=0x0d

## 十六进制转储对比

### TypeScript
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
00000090: 2f c8 03 1a 00 00 21 0e 1b 04 12 05 16 04 21 03 |/.....!.......!.|
000000a0: 16 04 14 07 1b 0e 1b 0a 11 01 17 11 16 04 00    |...............|
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