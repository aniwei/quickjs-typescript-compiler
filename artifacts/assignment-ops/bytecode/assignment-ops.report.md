# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-ops.ts
**生成时间**: 2025-12-05T12:54:23.791Z

## 大小对比

- TypeScript编译器: 309 字节
- WASM编译器: 304 字节
- 差异: 5 字节 (1.64%)

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
      "rawLength": 226,
      "actualLength": 113,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 119
    },
    {
      "index": 3,
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
    "remaining": 178
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
      "string": "__tests__/compiler/fixtures/assignment-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
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
    "remaining": 242
  }
}
```

## 字节级差异

共发现 289 个字节差异:

- 偏移量 0x2: TS=0xe2 vs WASM=0x5a
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
- ... (显示前20个差异，总共289个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 61 73 73 69 67 6e 6d 65 6e 74 2d 6f |res/assignment-o|
00000070: 70 73 2e 6a 73 02 78 0e 63 6f 6e 73 6f 6c 65 06 |ps.js.x.console.|
00000080: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000090: 01 00 01 00 03 01 00 64 01 ca 03 00 00 00 ca 03 |.......d........|
000000a0: 00 01 08 6c 5c 00 00 00 b8 e3 b9 cb df b8 9f 5b |...l\..........[|
000000b0: 00 00 df b8 a0 5b 00 00 df b9 9c 5b 00 00 df b9 |.....[.....[....|
000000c0: 9d 5b 00 00 df b9 9e 5b 00 00 df b9 a1 5b 00 00 |.[.....[.....[..|
000000d0: df b8 a2 5b 00 00 df b8 a3 5b 00 00 df b8 a4 5b |...[.....[.....[|
000000e0: 00 00 df b8 af 5b 00 00 df b8 b1 5b 00 00 df b8 |.....[.....[....|
000000f0: b0 5b 00 00 39 e6 00 00 00 43 e7 00 00 00 df 24 |.[..9....C.....$|
00000100: 01 00 0e 29 06 2f c8 03 01 2a 00 08 01 00 03 01 |...)./...*......|
00000110: 00 06 01 00 06 01 00 06 01 00 06 01 00 06 01 00 |................|
00000120: 06 01 00 06 01 00 06 01 00 06 01 00 06 01 00 06 |................|
00000130: 01 00 0f 01 00                                  |.....|
```

### WASM
```
00000000: 05 04 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 73 69 67 6e 6d 65 6e 74 2d 6f 70 73 2e 6a 73 |ssignment-ops.js|
00000030: 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |.x.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 01 00 97 01 00 ca 03 00 09 08 ec 02 29 b8 e3 b9 |............)...|
00000060: 11 69 00 00 0e 68 00 00 b8 9f 11 69 00 00 0e 68 |.i...h.....i...h|
00000070: 00 00 b8 a0 11 69 00 00 0e 68 00 00 b9 9c 11 69 |.....i...h.....i|
00000080: 00 00 0e 68 00 00 b9 9d 11 69 00 00 0e 68 00 00 |...h.....i...h..|
00000090: b9 9e 11 69 00 00 0e 68 00 00 b9 a1 11 69 00 00 |...i...h.....i..|
000000a0: 0e 68 00 00 b8 a2 11 69 00 00 0e 68 00 00 b8 a3 |.h.....i...h....|
000000b0: 11 69 00 00 0e 68 00 00 b8 a4 11 69 00 00 0e 68 |.i...h.....i...h|
000000c0: 00 00 b8 af 11 69 00 00 0e 68 00 00 b8 b1 11 69 |.....i...h.....i|
000000d0: 00 00 0e 68 00 00 b8 b0 11 69 00 00 0e 39 e6 00 |...h.....i...9..|
000000e0: 00 00 43 e7 00 00 00 68 00 00 24 01 00 0e 06 2f |..C....h..$..../|
000000f0: c8 03 3c 00 00 21 00 21 00 16 04 21 03 16 04 21 |..<..!.!...!...!|
00000100: 03 16 04 21 03 16 04 21 03 16 04 21 03 16 04 21 |...!...!...!...!|
00000110: 03 16 04 21 03 16 04 21 03 16 04 21 03 16 04 21 |...!...!...!...!|
00000120: 03 16 04 21 03 16 04 21 03 1b 0e 1b 0a 11 01 00 |...!...!........|
```