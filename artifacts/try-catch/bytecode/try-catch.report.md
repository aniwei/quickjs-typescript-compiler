# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/try-catch.ts
**生成时间**: 2025-12-07T15:31:53.946Z

## 大小对比

- TypeScript编译器: 232 字节
- WASM编译器: 216 字节
- 差异: 16 字节 (7.41%)

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
    "remaining": 169
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

共发现 88 个字节差异:

- 偏移量 0x50: TS=0x04 vs WASM=0x05
- 偏移量 0x53: TS=0x72 vs WASM=0x62
- 偏移量 0x57: TS=0x01 vs WASM=0x03
- 偏移量 0x59: TS=0x00 vs WASM=0x03
- 偏移量 0x5f: TS=0x28 vs WASM=0x1d
- 偏移量 0x7c: TS=0x0e vs WASM=0xcb
- 偏移量 0x7d: TS=0x70 vs WASM=0x6f
- 偏移量 0x7e: TS=0x00 vs WASM=0x22
- 偏移量 0x82: TS=0x6e vs WASM=0x39
- 偏移量 0x83: TS=0x47 vs WASM=0xe6
- 偏移量 0x87: TS=0x5b vs WASM=0x43
- 偏移量 0x88: TS=0x00 vs WASM=0xe7
- 偏移量 0x8a: TS=0x6f vs WASM=0x00
- 偏移量 0x8b: TS=0x25 vs WASM=0x00
- 偏移量 0x8c: TS=0x00 vs WASM=0x04
- 偏移量 0x8d: TS=0x00 vs WASM=0x19
- 偏移量 0x8f: TS=0x39 vs WASM=0x00
- 偏移量 0x90: TS=0xe6 vs WASM=0x00
- 偏移量 0x91: TS=0x00 vs WASM=0xc7
- 偏移量 0x92: TS=0x00 vs WASM=0x24
- ... (显示前20个差异，总共88个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2e 6a 73 02 65 0e 63 6f |ry-catch.js.e.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0a 65 72 72 6f 72 0d |nsole.log.error.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000050: 04 00 00 72 01 ca 03 01 00 00 08 ec 02 29 6f 28 |...r.........)o(|
00000060: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 04 18 00 |...9....C.......|
00000070: 00 00 24 01 00 0e 04 e8 00 00 00 30 0e 70 00 00 |..$........0.p..|
00000080: 00 00 6e 47 00 00 00 5b 00 00 6f 25 00 00 00 39 |..nG...[..o%...9|
00000090: e6 00 00 00 43 e7 00 00 00 04 19 00 00 00 64 00 |....C.........d.|
000000a0: 00 24 02 00 0e 0e 70 0f 00 00 00 6e 00 00 00 00 |.$....p....n....|
000000b0: 70 05 00 00 00 30 39 e6 00 00 00 43 e7 00 00 00 |p....09....C....|
000000c0: 04 1a 00 00 00 24 01 00 0e 71 06 2f c8 03 18 00 |.....$...q./....|
000000d0: 00 30 08 1b 0e 34 08 30 15 69 00 1b 0e 34 1c 11 |.0...4.0.i...4..|
000000e0: 13 6e 15 1b 0e 34 08 00                         |.n...4..|
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