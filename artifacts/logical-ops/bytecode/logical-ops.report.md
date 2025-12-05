# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-ops.ts
**生成时间**: 2025-12-05T12:54:24.064Z

## 大小对比

- TypeScript编译器: 330 字节
- WASM编译器: 260 字节
- 差异: 70 字节 (26.92%)

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
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 122
    }
  ],
  "functionHeader": {
    "offset": 126,
    "tag": "0xd",
    "remaining": 204
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 203
  }
}
```

## 字节级差异

共发现 293 个字节差异:

- 偏移量 0x2: TS=0xdc vs WASM=0x54
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
- ... (显示前20个差异，总共293个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6c 6f 67 69 63 61 6c 2d 6f 70 73 2e |res/logical-ops.|
00000070: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000080: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000090: 00 00 a1 01 00 08 6c 99 00 00 00 39 e5 00 00 00 |......l....9....|
000000a0: 43 e6 00 00 00 0a 11 6c 02 00 00 00 0e 09 24 01 |C......l......$.|
000000b0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 0a 11 6d 02 |..9....C......m.|
000000c0: 00 00 00 0e 09 24 01 00 0e 39 e5 00 00 00 43 e6 |.....$...9....C.|
000000d0: 00 00 00 07 11 b2 6c 06 00 00 00 0e 04 16 00 00 |......l.........|
000000e0: 00 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 04 |.$...9....C.....|
000000f0: 42 00 00 00 11 b2 6c 06 00 00 00 0e 04 16 00 00 |B.....l.........|
00000100: 00 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 09 |.$...9....C.....|
00000110: 11 6c 02 00 00 00 0e 0a 24 01 00 0e 39 e5 00 00 |.l......$...9...|
00000120: 00 43 e6 00 00 00 09 11 6d 02 00 00 00 0e 0a 24 |.C......m......$|
00000130: 01 00 0e 29 06 2f c8 03 01 0f 00 27 01 00 17 01 |...)./.....'....|
00000140: 00 1c 01 00 20 01 00 17 01 00                   |.... .....|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 73 2e 6a 73 0e 63 6f |ogical-ops.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 04 00 00 8c 01 00 |.. .............|
00000050: 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 00 0a 11 |...)9....C......|
00000060: ec 03 0e 09 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000070: 00 00 0a 11 ed 03 0e 09 24 01 00 0e 39 e5 00 00 |........$...9...|
00000080: 00 43 e6 00 00 00 07 11 b2 ec 07 0e 04 16 00 00 |.C..............|
00000090: 00 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 04 |.$...9....C.....|
000000a0: 42 00 00 00 11 b2 ec 07 0e 04 16 00 00 00 24 01 |B.............$.|
000000b0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 09 11 ec 03 |..9....C........|
000000c0: 0e 0a 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000d0: 09 11 ed 03 0e 0a 24 01 00 0e 06 2f c8 03 24 00 |......$..../..$.|
000000e0: 00 2f 0e 39 08 17 15 1b 0e 39 08 17 15 1b 0e 52 |./.9.....9.....R|
000000f0: 08 17 15 1b 0e 66 08 17 15 1b 0e 39 08 17 15 1b |.....f.....9....|
00000100: 0e 39 08 00                                     |.9..|
```