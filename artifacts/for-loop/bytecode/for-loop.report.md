# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-loop.ts
**生成时间**: 2025-12-05T12:54:23.989Z

## 大小对比

- TypeScript编译器: 209 字节
- WASM编译器: 139 字节
- 差异: 70 字节 (50.36%)

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
      "rawLength": 214,
      "actualLength": 107,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f_i",
      "offset": 111
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 115
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 123
    }
  ],
  "functionHeader": {
    "offset": 127,
    "tag": "0xd",
    "remaining": 82
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
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f_i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 81
  }
}
```

## 字节级差异

共发现 204 个字节差异:

- 偏移量 0x2: TS=0xd6 vs WASM=0x4e
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
- ... (显示前20个差异，总共204个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 d6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 66 6f 72 2d 6c 6f 6f 70 2e 6a 73 06 |res/for-loop.js.|
00000070: 66 5f 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |f_i.console.log.|
00000080: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000090: 03 01 00 28 01 ca 03 00 00 00 ca 03 00 01 08 6c |...(...........l|
000000a0: 20 00 00 00 b7 e3 df bc a5 6c 15 00 00 00 39 e6 | ........l....9.|
000000b0: 00 00 00 43 e7 00 00 00 df 24 01 00 0e 0e 6e e3 |...C.....$....n.|
000000c0: ff ff ff 29 06 2f c8 03 01 06 00 1a 01 00 05 7f |...)./..........|
000000d0: 00                                              |.|
```

### WASM
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 06 66 5f 69 0e 63 |or-loop.js.f_i.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 03 01 00 21 00 |... ..........!.|
00000050: ca 03 00 01 08 ec 02 29 b7 e3 df bc a5 ec 15 39 |.......).......9|
00000060: e6 00 00 00 43 e7 00 00 00 df 24 01 00 0e df 91 |....C.....$.....|
00000070: e3 ee e8 06 2f c8 03 12 00 00 20 24 0c 08 12 27 |..../..... $...'|
00000080: 1b 0e 1b 0a 07 01 15 1c 07 06 00                |...........|
```