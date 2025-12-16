# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-default-middle.ts
**生成时间**: 2025-12-16T14:11:02.595Z

## 大小对比

- TypeScript编译器: 198 字节
- WASM编译器: 190 字节
- 差异: 8 字节 (4.21%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-default-middle.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 138
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-default-middle.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 34 个字节差异:

- 偏移量 0x54: TS=0x00 vs WASM=0x80
- 偏移量 0x5a: TS=0x12 vs WASM=0x82
- 偏移量 0x7b: TS=0x0e vs WASM=0xcb
- 偏移量 0x8a: TS=0x0e vs WASM=0xcb
- 偏移量 0xa0: TS=0x0e vs WASM=0xcb
- 偏移量 0xa6: TS=0x1e vs WASM=0x16
- 偏移量 0xa9: TS=0x3e vs WASM=0x67
- 偏移量 0xab: TS=0x07 vs WASM=0x36
- 偏移量 0xac: TS=0x07 vs WASM=0x00
- 偏移量 0xad: TS=0x26 vs WASM=0x1b
- 偏移量 0xae: TS=0x08 vs WASM=0x0e
- 偏移量 0xaf: TS=0x21 vs WASM=0x20
- 偏移量 0xb0: TS=0x02 vs WASM=0x08
- 偏移量 0xb1: TS=0x17 vs WASM=0x18
- 偏移量 0xb2: TS=0x01 vs WASM=0x15
- 偏移量 0xb3: TS=0x34 vs WASM=0x1b
- 偏移量 0xb4: TS=0x18 vs WASM=0x0e
- 偏移量 0xb5: TS=0x07 vs WASM=0x20
- 偏移量 0xb6: TS=0x17 vs WASM=0x08
- 偏移量 0xb7: TS=0x18 vs WASM=0x3b
- ... (显示前20个差异，总共34个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |V__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 64 65 66 61 75 |res/switch-defau|
00000030: 6c 74 2d 6d 69 64 64 6c 65 2e 6a 73 0c 00 06 00 |lt-middle.js....|
00000040: a4 01 00 01 00 04 00 00 55 01 a6 01 00 00 00 40 |........U......@|
00000050: e4 00 00 00 00 3f e4 00 00 00 12 b7 3b e4 00 00 |.....?......;...|
00000060: 00 06 cb 39 e4 00 00 00 11 b7 ad ec 21 39 e5 00 |...9........!9..|
00000070: 00 00 43 e6 00 00 00 b7 24 01 00 0e 39 e5 00 00 |..C.....$...9...|
00000080: 00 43 e6 00 00 00 b9 24 01 00 0e ee 06 11 b8 ad |.C.....$........|
00000090: ec eb 39 e5 00 00 00 43 e6 00 00 00 b8 24 01 00 |..9....C.....$..|
000000a0: 0e 0e c7 28 ce 03 1e 00 00 3e 10 07 07 26 08 21 |...(.....>...&.!|
000000b0: 02 17 01 34 18 07 17 18 00 34 18 07 17 26 02 17 |...4.....4...&..|
000000c0: 01 34 18 07 17 00                               |.4....|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |V__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 64 65 66 61 75 |res/switch-defau|
00000030: 6c 74 2d 6d 69 64 64 6c 65 2e 6a 73 0c 00 06 00 |lt-middle.js....|
00000040: a4 01 00 01 00 04 00 00 55 01 a6 01 00 00 00 40 |........U......@|
00000050: e4 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 |.....?......;...|
00000060: 00 06 cb 39 e4 00 00 00 11 b7 ad ec 21 39 e5 00 |...9........!9..|
00000070: 00 00 43 e6 00 00 00 b7 24 01 00 cb 39 e5 00 00 |..C.....$...9...|
00000080: 00 43 e6 00 00 00 b9 24 01 00 cb ee 06 11 b8 ad |.C.....$........|
00000090: ec eb 39 e5 00 00 00 43 e6 00 00 00 b8 24 01 00 |..9....C.....$..|
000000a0: cb 0e c7 28 ce 03 16 00 00 67 10 36 00 1b 0e 20 |...(.....g.6... |
000000b0: 08 18 15 1b 0e 20 08 3b 15 1b 0e 20 08 00       |..... .;... ..|
```