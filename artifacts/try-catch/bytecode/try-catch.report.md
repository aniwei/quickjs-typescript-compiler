# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/try-catch.ts
**生成时间**: 2025-12-11T11:32:28.171Z

## 大小对比

- TypeScript编译器: 218 字节
- WASM编译器: 216 字节
- 差异: 2 字节 (0.93%)

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
    "remaining": 155
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

共发现 74 个字节差异:

- 偏移量 0x53: TS=0x64 vs WASM=0x62
- 偏移量 0x5b: TS=0xff vs WASM=0xec
- 偏移量 0x7c: TS=0xde vs WASM=0xcb
- 偏移量 0x7e: TS=0x2d vs WASM=0x22
- 偏移量 0x80: TS=0x25 vs WASM=0x00
- 偏移量 0x82: TS=0x00 vs WASM=0x39
- 偏移量 0x83: TS=0x00 vs WASM=0xe6
- 偏移量 0x91: TS=0x5a vs WASM=0xc7
- 偏移量 0x92: TS=0x00 vs WASM=0x24
- 偏移量 0x93: TS=0x00 vs WASM=0x02
- 偏移量 0x94: TS=0x24 vs WASM=0x00
- 偏移量 0x95: TS=0x02 vs WASM=0x0e
- 偏移量 0x96: TS=0x00 vs WASM=0x0e
- 偏移量 0x97: TS=0x0e vs WASM=0x06
- 偏移量 0x98: TS=0x0e vs WASM=0x70
- 偏移量 0x99: TS=0x06 vs WASM=0x0d
- 偏移量 0x9a: TS=0x70 vs WASM=0x00
- 偏移量 0x9b: TS=0x10 vs WASM=0x00
- 偏移量 0x9d: TS=0x00 vs WASM=0x0e
- 偏移量 0x9e: TS=0x00 vs WASM=0xee
- ... (显示前20个差异，总共74个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2e 6a 73 02 65 0e 63 6f |ry-catch.js.e.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0a 65 72 72 6f 72 0d |nsole.log.error.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000050: 05 00 00 64 01 ca 03 03 00 03 08 ff 02 29 6f 1d |...d.........)o.|
00000060: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 04 18 00 |...9....C.......|
00000070: 00 00 24 01 00 0e 04 e8 00 00 00 30 de 6f 2d 00 |..$........0.o-.|
00000080: 25 00 00 00 00 00 00 43 e7 00 00 00 04 19 00 00 |%......C........|
00000090: 00 5a 00 00 24 02 00 0e 0e 06 70 10 00 00 00 0e |.Z..$.....p.....|
000000a0: 6e 20 00 05 00 00 00 00 01 13 00 fd ff ff ff 00 |n ..............|
000000b0: 00 00 04 1a 00 00 00 24 01 00 0e 71 06 2f c8 03 |.......$...q./..|
000000c0: 18 00 00 30 08 25 0e 34 08 30 15 28 00 25 0e 34 |...0.%.4.0.(.%.4|
000000d0: 1c 25 13 69 15 25 0e 34 08 00                   |.%.i.%.4..|
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