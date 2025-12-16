# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/do-while-break.ts
**生成时间**: 2025-12-16T14:11:02.490Z

## 大小对比

- TypeScript编译器: 196 字节
- WASM编译器: 186 字节
- 差异: 10 字节 (5.38%)

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
      "string": "i",
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while-break.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 143
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
      "string": "i",
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while-break.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 133
  }
}
```

## 字节级差异

共发现 91 个字节差异:

- 偏移量 0x3e: TS=0x04 vs WASM=0x03
- 偏移量 0x41: TS=0x58 vs WASM=0x54
- 偏移量 0x4d: TS=0x00 vs WASM=0x80
- 偏移量 0x53: TS=0x12 vs WASM=0x82
- 偏移量 0x5c: TS=0x7d vs WASM=0x39
- 偏移量 0x61: TS=0x3d vs WASM=0x93
- 偏移量 0x62: TS=0x93 vs WASM=0x3a
- 偏移量 0x63: TS=0x19 vs WASM=0xe4
- 偏移量 0x64: TS=0x3e vs WASM=0x00
- 偏移量 0x65: TS=0x0e vs WASM=0x00
- 偏移量 0x66: TS=0x06 vs WASM=0x00
- 偏移量 0x68: TS=0x39 vs WASM=0x06
- 偏移量 0x69: TS=0xe4 vs WASM=0xcb
- 偏移量 0x6a: TS=0x00 vs WASM=0x39
- 偏移量 0x6b: TS=0x00 vs WASM=0xe4
- 偏移量 0x6d: TS=0xb8 vs WASM=0x00
- 偏移量 0x6e: TS=0xad vs WASM=0x00
- 偏移量 0x6f: TS=0x6d vs WASM=0xb8
- 偏移量 0x70: TS=0x25 vs WASM=0xad
- 偏移量 0x71: TS=0x00 vs WASM=0xed
- ... (显示前20个差异，总共91个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |H__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2d 62 72 65 |res/do-while-bre|
00000030: 61 6b 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 |ak.js...........|
00000040: 00 58 01 a6 01 00 00 00 40 e4 00 00 00 00 3f e4 |.X......@.....?.|
00000050: 00 00 00 12 b7 3b e4 00 00 00 06 cb 7d e4 00 00 |.....;......}...|
00000060: 00 3d 93 19 3e 0e 06 cb 39 e4 00 00 00 b8 ad 6d |.=..>...9......m|
00000070: 25 00 00 00 39 e5 00 00 00 43 e6 00 00 00 39 e4 |%...9....C....9.|
00000080: 00 00 00 24 01 00 0e 06 cb 39 e4 00 00 00 ba ad |...$.....9......|
00000090: 6d 0d 00 00 00 39 e4 00 00 00 bc a5 ed bf c7 28 |m....9.........(|
000000a0: ce 03 20 00 00 3e 10 07 07 27 00 3f 08 1b 0c 07 |.. ..>...'.?....|
000000b0: 07 22 0b 34 18 1b 17 21 08 1b 0c 07 07 22 01 1b |.".4...!....."..|
000000c0: 08 07 03 00                                     |....|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |H__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2d 62 72 65 |res/do-while-bre|
00000030: 61 6b 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 00 |ak.js...........|
00000040: 00 54 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 |.T......@.....?.|
00000050: 00 00 00 82 b7 3b e4 00 00 00 06 cb 39 e4 00 00 |.....;......9...|
00000060: 00 93 3a e4 00 00 00 cb 06 cb 39 e4 00 00 00 b8 |..:.......9.....|
00000070: ad ed 1f 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 |...9....C....9..|
00000080: 00 00 24 01 00 cb 06 cb 39 e4 00 00 00 ba ad ed |..$.....9.......|
00000090: 0a 39 e4 00 00 00 bc a5 ed c1 c7 28 ce 03 1a 00 |.9.........(....|
000000a0: 00 68 08 1b 02 30 06 20 04 13 0b 1b 0e 1b 0a 1b |.h...0. ........|
000000b0: 01 21 0d 20 04 13 01 20 04 00                   |.!. ... ..|
```