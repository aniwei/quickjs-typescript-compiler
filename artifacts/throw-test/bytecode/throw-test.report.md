# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/throw-test.ts
**生成时间**: 2025-12-05T12:54:24.366Z

## 大小对比

- TypeScript编译器: 312 字节
- WASM编译器: 239 字节
- 差异: 73 字节 (30.54%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/throw-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "testThrow",
      "offset": 113
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 123
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 125
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 133
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Caught:",
      "offset": 137
    },
    {
      "index": 6,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "Something went wrong",
      "offset": 145
    }
  ],
  "functionHeader": {
    "offset": 166,
    "tag": "0xd",
    "remaining": 146
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/throw-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "testThrow",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Caught:",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "Something went wrong",
      "offset": 76
    }
  ],
  "functionHeader": {
    "offset": 97,
    "tag": "0xd",
    "remaining": 142
  }
}
```

## 字节级差异

共发现 290 个字节差异:

- 偏移量 0x2: TS=0xda vs WASM=0x52
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
- ... (显示前20个差异，总共290个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 68 72 6f 77 2d 74 65 73 74 2e 6a |res/throw-test.j|
00000070: 73 12 74 65 73 74 54 68 72 6f 77 02 65 0e 63 6f |s.testThrow.e.co|
00000080: 6e 73 6f 6c 65 06 6c 6f 67 0e 43 61 75 67 68 74 |nsole.log.Caught|
00000090: 3a 28 53 6f 6d 65 74 68 69 6e 67 20 77 65 6e 74 |:(Something went|
000000a0: 20 77 72 6f 6e 67 0d c8 03 00 00 00 00 00 0c 20 | wrong......... |
000000b0: 06 01 a4 01 00 02 00 03 02 01 31 02 ca 03 00 00 |..........1.....|
000000c0: 00 cc 03 00 00 00 ca 03 00 01 cc 03 01 01 08 6c |...............l|
000000d0: 29 00 00 00 c2 00 e3 6f 0b 00 00 00 df 22 00 00 |)......o....."..|
000000e0: 0e 0e 6e 15 00 00 00 e4 39 e7 00 00 00 43 e8 00 |..n.....9....C..|
000000f0: 00 00 04 e9 00 00 00 e0 24 02 00 0e 29 06 2f c8 |........$...)./.|
00000100: 03 01 0c 00 09 03 00 05 02 00 0c 02 00 0a 01 00 |................|
00000110: 0c 00 04 00 ca 03 00 00 00 03 00 00 0f 00 39 9f |..............9.|
00000120: 00 00 00 04 ea 00 00 00 21 01 00 30 29 c8 03 01 |........!..0)...|
00000130: 06 00 00 01 00 00 01 00                         |........|
```

### WASM
```
00000000: 05 07 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 68 72 6f 77 2d 74 65 73 74 2e 6a 73 02 65 12 74 |hrow-test.js.e.t|
00000030: 65 73 74 54 68 72 6f 77 0e 63 6f 6e 73 6f 6c 65 |estThrow.console|
00000040: 06 6c 6f 67 0e 43 61 75 67 68 74 3a 28 53 6f 6d |.log.Caught:(Som|
00000050: 65 74 68 69 6e 67 20 77 65 6e 74 20 77 72 6f 6e |ething went wron|
00000060: 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |g......... .....|
00000070: 01 00 05 01 01 32 01 ca 03 03 00 03 cc 03 00 01 |.....2..........|
00000080: 08 ec 05 c2 00 e3 29 6f 0a 00 00 00 df f0 0e 0e |......)o........|
00000090: ee 1f cb 6f 1b 00 00 00 39 e7 00 00 00 43 e8 00 |...o....9....C..|
000000a0: 00 00 04 e9 00 00 00 c7 24 02 00 0e 0e ee 02 30 |........$......0|
000000b0: 06 2f c8 03 10 00 00 00 0c 0c 08 07 12 3b 11 1b |./...........;..|
000000c0: 0e 34 20 07 17 00 0c 43 06 01 cc 03 00 00 00 03 |.4 ....C........|
000000d0: 00 00 0f 00 39 9f 00 00 00 11 04 ea 00 00 00 21 |....9..........!|
000000e0: 01 00 30 c8 03 08 01 00 03 1c 39 0a 11 1d 00    |..0.......9....|
```