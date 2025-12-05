# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/try-catch-finally.ts
**生成时间**: 2025-12-05T12:54:24.382Z

## 大小对比

- TypeScript编译器: 264 字节
- WASM编译器: 206 字节
- 差异: 58 字节 (28.16%)

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
      "rawLength": 232,
      "actualLength": 116,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/try-catch-finally.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 120
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "error",
      "offset": 122
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 128
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 136
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "caught",
      "offset": 140
    }
  ],
  "functionHeader": {
    "offset": 147,
    "tag": "0xd",
    "remaining": 117
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

共发现 247 个字节差异:

- 偏移量 0x2: TS=0xe8 vs WASM=0x60
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共247个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 e8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 72 79 2d 63 61 74 63 68 2d 66 69 |res/try-catch-fi|
00000070: 6e 61 6c 6c 79 2e 6a 73 02 65 0a 65 72 72 6f 72 |nally.js.e.error|
00000080: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 63 61 75 |.console.log.cau|
00000090: 67 68 74 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |ght......... ...|
000000a0: 01 00 01 00 03 01 00 42 01 ca 03 00 00 00 ca 03 |.......B........|
000000b0: 00 01 08 6c 3a 00 00 00 6f 0c 00 00 00 04 e6 00 |...l:...o.......|
000000c0: 00 00 30 0e 6e 15 00 00 00 e3 39 e7 00 00 00 43 |..0.n.....9....C|
000000d0: e8 00 00 00 04 e9 00 00 00 df 24 02 00 0e 39 e7 |..........$...9.|
000000e0: 00 00 00 43 e8 00 00 00 04 1a 00 00 00 24 01 00 |...C.........$..|
000000f0: 0e 29 06 2f c8 03 01 0f 00 0b 01 00 0d 01 00 0a |.)./............|
00000100: 01 00 0a 01 00 0a 01 00                         |........|
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