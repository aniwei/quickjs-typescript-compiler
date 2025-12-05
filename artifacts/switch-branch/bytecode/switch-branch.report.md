# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-branch.ts
**生成时间**: 2025-12-05T12:54:24.329Z

## 大小对比

- TypeScript编译器: 295 字节
- WASM编译器: 173 字节
- 差异: 122 字节 (70.52%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-branch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "categorize",
      "offset": 116
    }
  ],
  "functionHeader": {
    "offset": 127,
    "tag": "0xd",
    "remaining": 168
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-branch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "categorize",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 288 个字节差异:

- 偏移量 0x2: TS=0xe0 vs WASM=0x58
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
- ... (显示前20个差异，总共288个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 73 77 69 74 63 68 2d 62 72 61 6e 63 |res/switch-branc|
00000070: 68 2e 6a 73 14 63 61 74 65 67 6f 72 69 7a 65 0d |h.js.categorize.|
00000080: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000090: 03 01 01 12 01 ca 03 00 00 00 ca 03 00 01 08 6c |...............l|
000000a0: 0a 00 00 00 c2 00 e3 df b8 22 01 00 0e 29 06 2f |........."...)./|
000000b0: c8 03 01 06 00 09 09 00 01 02 00 0c 00 04 00 ca |................|
000000c0: 03 01 01 01 03 00 00 34 02 84 01 00 00 00 a6 01 |.......4........|
000000d0: 00 00 00 d3 11 b7 ad 6d 0d 00 00 00 11 b8 ad 6d |.......m.......m|
000000e0: 0d 00 00 00 6e 12 00 00 00 d3 5b 00 00 5a 00 00 |....n.....[..Z..|
000000f0: 28 d3 b8 9f 5b 00 00 5a 00 00 28 d3 b8 a0 5b 00 |(...[..Z..(...[.|
00000100: 00 5a 00 00 28 0e 29 c8 03 01 1b 00 00 01 00 02 |.Z..(.).........|
00000110: 01 00 08 02 00 0c 7e 00 00 01 00 08 01 00 00 01 |......~.........|
00000120: 00 0a 01 00 00 01 00                            |.......|
```

### WASM
```
00000000: 05 02 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 62 72 61 6e 63 68 2e 6a 73 14 |witch-branch.js.|
00000030: 63 61 74 65 67 6f 72 69 7a 65 0d c8 03 00 00 00 |categorize......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0d 00 |... ............|
00000050: ca 03 00 01 08 ec 05 c2 00 e3 29 df b8 f1 0e 06 |..........).....|
00000060: 2f c8 03 08 00 00 00 07 16 00 0c 14 00 0c 43 06 |/.............C.|
00000070: 01 ca 03 01 00 01 03 00 00 15 01 84 01 00 01 00 |................|
00000080: d3 11 b7 ad ec 03 d3 28 11 b8 ad ec 05 d3 b8 9f |.......(........|
00000090: 28 d3 b8 a0 28 c8 03 14 00 00 03 14 22 06 07 0d |(...(......."...|
000000a0: 22 0e 0c 0c 07 19 09 0e 0c 0c 07 19 00          |"............|
```