# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/tagged-template.ts
**生成时间**: 2025-12-05T12:54:24.340Z

## 大小对比

- TypeScript编译器: 458 字节
- WASM编译器: 5 字节
- 差异: 453 字节 (9060.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 228,
      "actualLength": 114,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/tagged-template.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "myTag",
      "offset": 118
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 124
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 128
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 135
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Hello ",
      "offset": 141
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": " world",
      "offset": 148
    },
    {
      "index": 7,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Line\nBreak",
      "offset": 155
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "strings",
      "offset": 166
    }
  ],
  "functionHeader": {
    "offset": 174,
    "tag": "0xd",
    "remaining": 284
  }
}
```

### WASM编译器输出
```json
{
  "error": "Bytecode too short for analysis"
}
```

## 字节级差异

共发现 458 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x09 vs WASM=0x02
- 偏移量 0x2: TS=0xe4 vs WASM=0x03
- 偏移量 0x3: TS=0x01 vs WASM=0x04
- 偏移量 0x4: TS=0x2f vs WASM=0x05
- 偏移量 0x5: TS=0x55 vs WASM=EOF
- 偏移量 0x6: TS=0x73 vs WASM=EOF
- 偏移量 0x7: TS=0x65 vs WASM=EOF
- 偏移量 0x8: TS=0x72 vs WASM=EOF
- 偏移量 0x9: TS=0x73 vs WASM=EOF
- 偏移量 0xa: TS=0x2f vs WASM=EOF
- 偏移量 0xb: TS=0x61 vs WASM=EOF
- 偏移量 0xc: TS=0x6e vs WASM=EOF
- 偏移量 0xd: TS=0x69 vs WASM=EOF
- 偏移量 0xe: TS=0x77 vs WASM=EOF
- 偏移量 0xf: TS=0x65 vs WASM=EOF
- 偏移量 0x10: TS=0x69 vs WASM=EOF
- 偏移量 0x11: TS=0x2f vs WASM=EOF
- 偏移量 0x12: TS=0x44 vs WASM=EOF
- 偏移量 0x13: TS=0x65 vs WASM=EOF
- ... (显示前20个差异，总共458个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 e4 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 61 67 67 65 64 2d 74 65 6d 70 6c |res/tagged-templ|
00000070: 61 74 65 2e 6a 73 0a 6d 79 54 61 67 06 76 61 6c |ate.js.myTag.val|
00000080: 0c 72 65 73 75 6c 74 0a 77 6f 72 6c 64 0c 48 65 |.result.world.He|
00000090: 6c 6c 6f 20 0c 20 77 6f 72 6c 64 14 4c 69 6e 65 |llo . world.Line|
000000a0: 0a 42 72 65 61 6b 0e 73 74 72 69 6e 67 73 0d c8 |.Break.strings..|
000000b0: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 06 00 03 |....... ........|
000000c0: 04 02 5a 06 ca 03 00 00 00 cc 03 00 00 00 ca 03 |..Z.............|
000000d0: 00 00 00 cc 03 00 00 00 ce 03 00 00 00 e4 01 00 |................|
000000e0: 00 00 ca 03 00 01 cc 03 01 01 ce 03 04 01 e4 01 |................|
000000f0: 05 01 08 6c 52 00 00 00 c2 00 e3 01 2a 00 00 00 |...lR.......*...|
00000100: e4 c2 01 e3 04 e8 00 00 00 e4 df 04 e9 00 00 00 |................|
00000110: 04 ea 00 00 00 26 02 00 04 e9 00 00 00 04 ea 00 |.....&..........|
00000120: 00 00 26 02 00 4e 72 00 00 00 e0 22 02 00 e5 df |..&..Nr...."....|
00000130: 04 eb 00 00 00 26 01 00 04 eb 00 00 00 26 01 00 |.....&.......&..|
00000140: 4e 72 00 00 00 22 01 00 e6 29 06 2f c8 03 01 12 |Nr..."...)./....|
00000150: 00 09 02 00 00 01 00 09 03 00 00 02 00 06 01 00 |................|
00000160: 25 01 00 0c 00 04 00 ca 03 02 00 02 03 00 00 12 |%...............|
00000170: 02 d8 03 00 00 00 da 01 00 00 00 0d 01 00 dc 0e |................|
00000180: d3 b7 48 d4 b7 48 9f d3 b8 48 9f 28 29 c8 03 01 |..H..H...H.()...|
00000190: 03 00 05 01 00 0c 00 04 00 ca 03 02 00 02 03 00 |................|
000001a0: 00 12 02 d8 03 00 00 00 da 01 00 00 00 0d 01 00 |................|
000001b0: dc 0e d3 b7 48 d4 b7 48 9f d3 b8 48 9f 28 29 c8 |....H..H...H.().|
000001c0: 03 01 06 00 05 04 00 00 01 00                   |..........|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```