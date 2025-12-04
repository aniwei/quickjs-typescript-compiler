# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-control.ts
**生成时间**: 2025-12-04T06:33:08.406Z

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

共发现 59 个字节差异:

- 偏移量 0x4b: TS=0x01 vs WASM=0x00
- 偏移量 0x50: TS=0x38 vs WASM=0x3b
- 偏移量 0x51: TS=0x01 vs WASM=0x00
- 偏移量 0x54: TS=0x01 vs WASM=0x00
- 偏移量 0x55: TS=0x00 vs WASM=0x09
- 偏移量 0x56: TS=0x20 vs WASM=0x08
- 偏移量 0x57: TS=0xca vs WASM=0xec
- 偏移量 0x58: TS=0x03 vs WASM=0x02
- 偏移量 0x59: TS=0x00 vs WASM=0x29
- 偏移量 0x5a: TS=0x09 vs WASM=0xb7
- 偏移量 0x5b: TS=0x08 vs WASM=0xe3
- 偏移量 0x5c: TS=0xec vs WASM=0x68
- 偏移量 0x5d: TS=0x02 vs WASM=0x00
- 偏移量 0x5e: TS=0x29 vs WASM=0x00
- 偏移量 0x5f: TS=0xb7 vs WASM=0xbf
- 偏移量 0x60: TS=0xe3 vs WASM=0x0a
- 偏移量 0x61: TS=0x5a vs WASM=0xa5
- 偏移量 0x62: TS=0x00 vs WASM=0xec
- 偏移量 0x63: TS=0x00 vs WASM=0x2c
- 偏移量 0x64: TS=0xbf vs WASM=0x68
- ... (显示前20个差异，总共59个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 63 6f 6e 74 72 6f 6c 2e 6a 73 02 69 |oop-control.js.i|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 00 |..... ..........|
00000050: 38 01 ca 03 01 00 20 ca 03 00 09 08 ec 02 29 b7 |8..... .......).|
00000060: e3 5a 00 00 bf 0a a5 ec 29 5a 00 00 b8 9f cf bc |.Z......)Z......|
00000070: a5 ec 03 ee ed 39 e6 00 00 00 43 e7 00 00 00 5a |.....9....C....Z|
00000080: 00 00 24 01 00 0e 5a 00 00 be a7 ec 03 ee 03 ee |..$...Z.........|
00000090: d1 06 2f c8 03 18 00 00 21 0e 1b 04 12 01 16 04 |../.....!.......|
000000a0: 12 00 1e 0b 1b 0e 1b 0a 11 01 17 0d 16 04 00    |...............|
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