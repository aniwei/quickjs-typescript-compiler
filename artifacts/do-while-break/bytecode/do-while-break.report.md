# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/do-while-break.ts
**生成时间**: 2025-12-09T14:28:02.697Z

## 大小对比

- TypeScript编译器: 168 字节
- WASM编译器: 172 字节
- 差异: -4 字节 (-2.33%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/do-while-break.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 106
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/do-while-break.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 110
  }
}
```

## 字节级差异

共发现 14 个字节差异:

- 偏移量 0x90: TS=0x16 vs WASM=0x1a
- 偏移量 0x9d: TS=0x34 vs WASM=0x1b
- 偏移量 0x9e: TS=0x18 vs WASM=0x0e
- 偏移量 0x9f: TS=0x26 vs WASM=0x1b
- 偏移量 0xa0: TS=0x0f vs WASM=0x0a
- 偏移量 0xa1: TS=0x16 vs WASM=0x11
- 偏移量 0xa2: TS=0x04 vs WASM=0x01
- 偏移量 0xa3: TS=0x13 vs WASM=0x17
- 偏移量 0xa4: TS=0x01 vs WASM=0x0d
- 偏移量 0xa7: TS=0x00 vs WASM=0x13
- 偏移量 0xa8: TS=EOF vs WASM=0x01
- 偏移量 0xa9: TS=EOF vs WASM=0x16
- 偏移量 0xaa: TS=EOF vs WASM=0x04
- 偏移量 0xab: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 6f 2d 77 68 69 6c 65 2d 62 72 65 61 6b 2e 6a 73 |o-while-break.js|
00000030: 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.i.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 01 00 36 00 ca 03 00 09 08 ec 02 29 b7 e3 68 00 |..6........)..h.|
00000060: 00 93 69 00 00 0e 68 00 00 b8 ad ed 19 39 e6 00 |..i...h......9..|
00000070: 00 00 43 e7 00 00 00 68 00 00 24 01 00 0e 68 00 |..C....h..$...h.|
00000080: 00 ba ad ed 08 68 00 00 bc a5 ed d3 06 2f c8 03 |.....h......./..|
00000090: 16 00 00 22 08 11 02 1c 06 16 04 13 0b 34 18 26 |...".........4.&|
000000a0: 0f 16 04 13 01 16 04 00                         |........|
```

### WASM
```
00000000: 05 04 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 6f 2d 77 68 69 6c 65 2d 62 72 65 61 6b 2e 6a 73 |o-while-break.js|
00000030: 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.i.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 01 00 36 00 ca 03 00 09 08 ec 02 29 b7 e3 68 00 |..6........)..h.|
00000060: 00 93 69 00 00 0e 68 00 00 b8 ad ed 19 39 e6 00 |..i...h......9..|
00000070: 00 00 43 e7 00 00 00 68 00 00 24 01 00 0e 68 00 |..C....h..$...h.|
00000080: 00 ba ad ed 08 68 00 00 bc a5 ed d3 06 2f c8 03 |.....h......./..|
00000090: 1a 00 00 22 08 11 02 1c 06 16 04 13 0b 1b 0e 1b |..."............|
000000a0: 0a 11 01 17 0d 16 04 13 01 16 04 00             |............|
```