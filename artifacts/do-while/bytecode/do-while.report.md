# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/do-while.ts
**生成时间**: 2025-12-09T14:28:02.700Z

## 大小对比

- TypeScript编译器: 140 字节
- WASM编译器: 144 字节
- 差异: -4 字节 (-2.78%)

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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/do-while.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 84
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/do-while.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 88
  }
}
```

## 字节级差异

共发现 15 个字节差异:

- 偏移量 0x7c: TS=0x0e vs WASM=0x12
- 偏移量 0x81: TS=0x34 vs WASM=0x1b
- 偏移量 0x82: TS=0x18 vs WASM=0x0e
- 偏移量 0x83: TS=0x26 vs WASM=0x1b
- 偏移量 0x84: TS=0x17 vs WASM=0x0a
- 偏移量 0x86: TS=0x02 vs WASM=0x01
- 偏移量 0x87: TS=0x1c vs WASM=0x17
- 偏移量 0x88: TS=0x08 vs WASM=0x15
- 偏移量 0x89: TS=0x16 vs WASM=0x11
- 偏移量 0x8a: TS=0x04 vs WASM=0x02
- 偏移量 0x8b: TS=0x00 vs WASM=0x1c
- 偏移量 0x8c: TS=EOF vs WASM=0x08
- 偏移量 0x8d: TS=EOF vs WASM=0x16
- 偏移量 0x8e: TS=EOF vs WASM=0x04
- 偏移量 0x8f: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 6f 2d 77 68 69 6c 65 2e 6a 73 02 69 0e 63 6f 6e |o-while.js.i.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 03 01 00 28 00 ca 03 |. ..........(...|
00000050: 00 09 08 ec 02 29 b7 e3 39 e6 00 00 00 43 e7 00 |.....)..9....C..|
00000060: 00 00 68 00 00 24 01 00 0e 68 00 00 93 69 00 00 |..h..$...h...i..|
00000070: 0e 68 00 00 ba a5 ed e1 06 2f c8 03 0e 00 00 22 |.h......./....."|
00000080: 08 34 18 26 17 11 02 1c 08 16 04 00             |.4.&........|
```

### WASM
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 6f 2d 77 68 69 6c 65 2e 6a 73 02 69 0e 63 6f 6e |o-while.js.i.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 03 01 00 28 00 ca 03 |. ..........(...|
00000050: 00 09 08 ec 02 29 b7 e3 39 e6 00 00 00 43 e7 00 |.....)..9....C..|
00000060: 00 00 68 00 00 24 01 00 0e 68 00 00 93 69 00 00 |..h..$...h...i..|
00000070: 0e 68 00 00 ba a5 ed e1 06 2f c8 03 12 00 00 22 |.h......./....."|
00000080: 08 1b 0e 1b 0a 11 01 17 15 11 02 1c 08 16 04 00 |................|
```