# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/return-in-loop.ts
**生成时间**: 2025-12-05T12:54:24.250Z

## 大小对比

- TypeScript编译器: 239 字节
- WASM编译器: 151 字节
- 差异: 88 字节 (58.28%)

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
      "rawLength": 226,
      "actualLength": 113,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/return-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 122
    }
  ],
  "functionHeader": {
    "offset": 124,
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
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/return-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 96
  }
}
```

## 字节级差异

共发现 232 个字节差异:

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
- ... (显示前20个差异，总共232个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 72 65 74 75 72 6e 2d 69 6e 2d 6c 6f |res/return-in-lo|
00000070: 6f 70 2e 6a 73 08 74 65 73 74 02 78 0d c8 03 00 |op.js.test.x....|
00000080: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 01 |..... ..........|
00000090: 0c 01 ca 03 00 00 00 ca 03 00 01 08 6c 04 00 00 |............l...|
000000a0: 00 c2 00 e3 29 06 2f c8 03 01 00 00 0c 00 04 00 |....)./.........|
000000b0: ca 03 00 02 00 03 00 00 20 02 cc 03 00 00 00 a6 |........ .......|
000000c0: 01 01 00 00 b8 26 01 00 7f 6e 0c 00 00 00 5b 00 |.....&...n....[.|
000000d0: 00 c7 5b 01 00 86 5a 01 00 28 82 00 6c ed ff ff |..[...Z..(..l...|
000000e0: ff 0e 86 29 c8 03 01 06 00 00 01 00 0d 01 00    |...)...........|
```

### WASM
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 74 75 72 6e 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 |eturn-in-loop.js|
00000030: 08 74 65 73 74 02 78 0d c8 03 00 00 00 00 00 0c |.test.x.........|
00000040: 20 06 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 | ...............|
00000050: 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 |.......)./......|
00000060: 0c 43 06 01 ca 03 00 01 00 05 00 00 1a 01 cc 03 |.C..............|
00000070: 02 00 30 63 00 00 b8 26 01 00 7f ee 0a cb 64 00 |..0c...&......d.|
00000080: 00 72 1e 06 86 28 82 00 ec f4 0e 86 29 c8 03 06 |.r...(......)...|
00000090: 00 00 3b 1e 11 0d 00                            |..;....|
```