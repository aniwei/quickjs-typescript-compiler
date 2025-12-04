# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/try-catch-finally.ts
**生成时间**: 2025-12-04T06:33:09.710Z

## 大小对比

- TypeScript编译器: 206 字节
- WASM编译器: 206 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch-finally.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "caught",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xd",
    "remaining": 128
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch-finally.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "caught",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xd",
    "remaining": 128
  }
}
```

## 字节级差异

共发现 59 个字节差异:

- 偏移量 0x33: TS=0x0a vs WASM=0x02
- 偏移量 0x35: TS=0x72 vs WASM=0x0a
- 偏移量 0x36: TS=0x72 vs WASM=0x65
- 偏移量 0x37: TS=0x6f vs WASM=0x72
- 偏移量 0x39: TS=0x02 vs WASM=0x6f
- 偏移量 0x3a: TS=0x65 vs WASM=0x72
- 偏移量 0x62: TS=0x51 vs WASM=0x4f
- 偏移量 0x64: TS=0xcc vs WASM=0xca
- 偏移量 0x68: TS=0x20 vs WASM=0x03
- 偏移量 0x73: TS=0xe5 vs WASM=0xe6
- 偏移量 0x7a: TS=0x24 vs WASM=0x22
- 偏移量 0x8d: TS=0x5a vs WASM=0xc7
- 偏移量 0x8e: TS=0x00 vs WASM=0x24
- 偏移量 0x8f: TS=0x00 vs WASM=0x02
- 偏移量 0x90: TS=0x24 vs WASM=0x00
- 偏移量 0x91: TS=0x02 vs WASM=0x0e
- 偏移量 0x92: TS=0x00 vs WASM=0x0e
- 偏移量 0x93: TS=0x0e vs WASM=0x06
- 偏移量 0x94: TS=0x0e vs WASM=0x70
- 偏移量 0x95: TS=0x06 vs WASM=0x0d
- ... (显示前20个差异，总共59个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2d 66 69 6e 61 6c 6c 79 |ry-catch-finally|
00000030: 2e 6a 73 0a 65 72 72 6f 72 02 65 0e 63 6f 6e 73 |.js.error.e.cons|
00000040: 6f 6c 65 06 6c 6f 67 0c 63 61 75 67 68 74 0d c8 |ole.log.caught..|
00000050: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 05 |....... ........|
00000060: 00 00 51 01 cc 03 03 00 20 08 ec 02 29 6f 0a 00 |..Q..... ...)o..|
00000070: 00 00 04 e5 00 00 00 30 cb 6f 24 00 00 00 39 e7 |.......0.o$...9.|
00000080: 00 00 00 43 e8 00 00 00 04 e9 00 00 00 5a 00 00 |...C.........Z..|
00000090: 24 02 00 0e 0e 06 70 0d 00 00 00 0e ee 1b 70 05 |$.....p.......p.|
000000a0: 00 00 00 30 39 e7 00 00 00 43 e8 00 00 00 04 1a |...09....C......|
000000b0: 00 00 00 24 01 00 0e 71 06 2f c8 03 10 00 00 6e |...$...q./.....n|
000000c0: 04 1b 0e 34 1e 11 15 68 15 1b 0e 34 08 00       |...4...h...4..|
```

### WASM
```
00000000: 05 06 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2d 66 69 6e 61 6c 6c 79 |ry-catch-finally|
00000030: 2e 6a 73 02 65 0a 65 72 72 6f 72 0e 63 6f 6e 73 |.js.e.error.cons|
00000040: 6f 6c 65 06 6c 6f 67 0c 63 61 75 67 68 74 0d c8 |ole.log.caught..|
00000050: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 05 |....... ........|
00000060: 00 00 4f 01 ca 03 03 00 03 08 ec 02 29 6f 0a 00 |..O.........)o..|
00000070: 00 00 04 e6 00 00 00 30 cb 6f 22 00 00 00 39 e7 |.......0.o"...9.|
00000080: 00 00 00 43 e8 00 00 00 04 e9 00 00 00 c7 24 02 |...C..........$.|
00000090: 00 0e 0e 06 70 0d 00 00 00 0e ee 1b 70 05 00 00 |....p.......p...|
000000a0: 00 30 39 e7 00 00 00 43 e8 00 00 00 04 1a 00 00 |.09....C........|
000000b0: 00 24 01 00 0e 71 06 2f c8 03 12 00 00 49 04 27 |.$...q./.....I.'|
000000c0: 00 1b 0e 34 1e 07 15 68 15 1b 0e 34 08 00       |...4...h...4..|
```