# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-call.ts
**生成时间**: 2025-12-09T14:28:02.725Z

## 大小对比

- TypeScript编译器: 185 字节
- WASM编译器: 191 字节
- 差异: -6 字节 (-3.14%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-call.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 70,
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
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-call.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 63 个字节差异:

- 偏移量 0x5c: TS=0xca vs WASM=0xd4
- 偏移量 0x5d: TS=0x03 vs WASM=0x01
- 偏移量 0x5f: TS=0x09 vs WASM=0x01
- 偏移量 0x60: TS=0xd4 vs WASM=0xca
- 偏移量 0x61: TS=0x01 vs WASM=0x03
- 偏移量 0x63: TS=0x01 vs WASM=0x09
- 偏移量 0x69: TS=0xe4 vs WASM=0xe3
- 偏移量 0x6b: TS=0xe0 vs WASM=0xdf
- 偏移量 0x6f: TS=0xe3 vs WASM=0xe4
- 偏移量 0x7b: TS=0x00 vs WASM=0x01
- 偏移量 0x85: TS=0x08 vs WASM=0x0e
- 偏移量 0x8a: TS=0x1c vs WASM=0x11
- 偏移量 0x8b: TS=0x19 vs WASM=0x06
- 偏移量 0x8c: TS=0x34 vs WASM=0x0d
- 偏移量 0x8d: TS=0x18 vs WASM=0x1f
- 偏移量 0x8e: TS=0x00 vs WASM=0x1b
- 偏移量 0x8f: TS=0x0c vs WASM=0x0e
- 偏移量 0x90: TS=0x43 vs WASM=0x1b
- 偏移量 0x91: TS=0x06 vs WASM=0x0a
- 偏移量 0x92: TS=0x01 vs WASM=0x11
- ... (显示前20个差异，总共63个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 0c |unction-call.js.|
00000030: 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c 65 06 6c |result.console.l|
00000040: 6f 67 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 |og.a.b......... |
00000050: 06 01 a4 01 00 00 00 03 02 01 1f 00 ca 03 00 09 |................|
00000060: d4 01 01 01 08 ec 05 c2 00 e4 29 e0 b8 b9 f2 e3 |..........).....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 00 00 24 01 00 |9....C....h..$..|
00000080: 0e 06 2f c8 03 08 00 00 28 1a 1c 19 34 18 00 0c |../.....(...4...|
00000090: 43 06 01 d4 01 02 00 02 02 00 00 04 02 d0 03 00 |C...............|
000000a0: 01 00 d2 03 00 01 00 d3 d4 9f 28 c8 03 0a 00 00 |..........(.....|
000000b0: 03 16 07 08 07 03 07 11 00                      |.........|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 0c |unction-call.js.|
00000030: 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c 65 06 6c |result.console.l|
00000040: 6f 67 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 |og.a.b......... |
00000050: 06 01 a4 01 00 00 00 03 02 01 1f 00 d4 01 00 01 |................|
00000060: ca 03 01 09 08 ec 05 c2 00 e3 29 df b8 b9 f2 e4 |..........).....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
00000080: 0e 06 2f c8 03 0e 00 00 28 1a 11 06 0d 1f 1b 0e |../.....(.......|
00000090: 1b 0a 11 01 00 0c 43 06 01 d4 01 02 00 02 02 00 |......C.........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 00 03 16 07 08 07 03 07 11 00    |(..............|
```