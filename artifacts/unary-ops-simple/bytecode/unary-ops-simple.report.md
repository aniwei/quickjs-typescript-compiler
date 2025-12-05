# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/unary-ops-simple.ts
**生成时间**: 2025-12-05T12:54:24.395Z

## 大小对比

- TypeScript编译器: 276 字节
- WASM编译器: 230 字节
- 差异: 46 字节 (20.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 230,
      "actualLength": 115,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/unary-ops-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 119
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 127
    }
  ],
  "functionHeader": {
    "offset": 131,
    "tag": "0xd",
    "remaining": 145
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
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
    "remaining": 168
  }
}
```

## 字节级差异

共发现 263 个字节差异:

- 偏移量 0x2: TS=0xe6 vs WASM=0x5e
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
- ... (显示前20个差异，总共263个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 e6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 75 6e 61 72 79 2d 6f 70 73 2d 73 69 |res/unary-ops-si|
00000070: 6d 70 6c 65 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 |mple.js.console.|
00000080: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000090: 01 00 00 00 03 00 00 67 00 08 6c 5f 00 00 00 39 |.......g..l_...9|
000000a0: e5 00 00 00 43 e6 00 00 00 b6 24 01 00 0e 39 e5 |....C.....$...9.|
000000b0: 00 00 00 43 e6 00 00 00 b8 8f 24 01 00 0e 39 e5 |...C......$...9.|
000000c0: 00 00 00 43 e6 00 00 00 0a 98 24 01 00 0e 39 e5 |...C......$...9.|
000000d0: 00 00 00 43 e6 00 00 00 b8 97 24 01 00 0e 39 e5 |...C......$...9.|
000000e0: 00 00 00 43 e6 00 00 00 b8 99 24 01 00 0e 39 e5 |...C......$...9.|
000000f0: 00 00 00 43 e6 00 00 00 06 24 01 00 0e 29 06 2f |...C.....$...)./|
00000100: c8 03 01 0f 00 1f 01 00 10 01 00 10 01 00 10 01 |................|
00000110: 00 10 01 00                                     |....|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2d 73 69 6d 70 6c 65 2e |nary-ops-simple.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 64 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..d....)9....C..|
00000060: 00 00 b6 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b8 8f 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000080: 00 0a 98 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000090: 00 b8 97 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000a0: 00 b8 99 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000b0: 00 06 24 01 00 0e 06 2f c8 03 2a 00 00 2f 0e 1b |..$..../..*../..|
000000c0: 0a 07 01 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 25 |....... .......%|
000000d0: 08 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 25 08 17 |..... .......%..|
000000e0: 15 1b 0e 20 08 00                               |... ..|
```