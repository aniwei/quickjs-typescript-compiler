# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-exports-default.ts
**生成时间**: 2025-12-05T12:54:24.163Z

## 大小对比

- TypeScript编译器: 355 字节
- WASM编译器: 281 字节
- 差异: 74 字节 (26.33%)

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
      "rawLength": 242,
      "actualLength": 121,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-exports-default.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "namedDefault",
      "offset": 125
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 138
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "answer",
      "offset": 147
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "ultimateAnswer",
      "offset": 154
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "factor",
      "offset": 169
    }
  ],
  "functionHeader": {
    "offset": 176,
    "tag": "0xd",
    "remaining": 179
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
      "rawLength": 106,
      "actualLength": 53,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports-default.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 56
    },
    {
      "index": 2,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "ultimateAnswer",
      "offset": 65
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "namedDefault",
      "offset": 80
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "answer",
      "offset": 93
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "factor",
      "offset": 100
    }
  ],
  "functionHeader": {
    "offset": 107,
    "tag": "0xd",
    "remaining": 174
  }
}
```

## 字节级差异

共发现 342 个字节差异:

- 偏移量 0x2: TS=0xf2 vs WASM=0x6a
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
- ... (显示前20个差异，总共342个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 f2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 |res/module-expor|
00000070: 74 73 2d 64 65 66 61 75 6c 74 2e 6a 73 18 6e 61 |ts-default.js.na|
00000080: 6d 65 64 44 65 66 61 75 6c 74 10 6d 75 6c 74 69 |medDefault.multi|
00000090: 70 6c 79 0c 61 6e 73 77 65 72 1c 75 6c 74 69 6d |ply.answer.ultim|
000000a0: 61 74 65 41 6e 73 77 65 72 0c 66 61 63 74 6f 72 |ateAnswer.factor|
000000b0: 0d c8 03 00 03 00 00 00 ca 03 2c cc 03 cc 03 ce |..........,.....|
000000c0: 03 d0 03 0c 20 06 01 a4 01 00 03 00 03 03 02 15 |.... ...........|
000000d0: 03 ca 03 00 00 00 cc 03 00 00 00 ce 03 00 00 00 |................|
000000e0: ca 03 00 01 cc 03 01 01 ce 03 02 01 08 6c 0d 00 |.............l..|
000000f0: 00 00 c2 00 e3 c2 01 e4 01 2a 00 00 00 e5 29 06 |.........*....).|
00000100: 2f c8 03 01 09 00 09 02 00 03 04 00 00 02 00 0c |/...............|
00000110: 00 04 00 ca 03 01 00 01 03 00 00 05 01 84 01 00 |................|
00000120: 00 00 d3 b8 9f 28 29 c8 03 01 03 00 00 01 00 0c |.....().........|
00000130: 00 04 00 cc 03 02 00 02 03 00 00 11 02 84 01 00 |................|
00000140: 00 00 d2 03 00 00 00 d4 11 f4 6c 03 00 00 00 0e |..........l.....|
00000150: b9 dc 0e d3 d4 9c 28 29 c8 03 01 06 00 09 04 00 |......()........|
00000160: 03 01 00                                        |...|
```

### WASM
```
00000000: 05 06 6a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..j__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2d 64 65 |odule-exports-de|
00000030: 66 61 75 6c 74 2e 6a 73 10 6d 75 6c 74 69 70 6c |fault.js.multipl|
00000040: 79 1c 75 6c 74 69 6d 61 74 65 41 6e 73 77 65 72 |y.ultimateAnswer|
00000050: 18 6e 61 6d 65 64 44 65 66 61 75 6c 74 0c 61 6e |.namedDefault.an|
00000060: 73 77 65 72 0c 66 61 63 74 6f 72 0d c8 03 00 03 |swer.factor.....|
00000070: 00 00 2c 00 01 ca 03 00 02 cc 03 00 00 00 0c 20 |..,............ |
00000080: 06 01 a4 01 00 00 00 01 03 02 0f 00 ce 03 00 01 |................|
00000090: ca 03 01 01 d0 03 02 0d 08 ec 08 c2 00 e3 c2 01 |................|
000000a0: e4 29 bf 2a e5 06 2f c8 03 02 00 00 00 0c 43 06 |.).*../.......C.|
000000b0: 01 ce 03 01 00 01 02 00 00 04 01 84 01 00 01 00 |................|
000000c0: d3 b8 9f 28 c8 03 08 00 0f 03 0b 0c 0c 07 19 00 |...(............|
000000d0: 0c 41 06 01 ca 03 02 02 01 02 00 00 15 04 84 01 |.A..............|
000000e0: 00 01 00 d2 03 00 01 00 84 01 01 ff ff ff ff 0f |................|
000000f0: 20 d2 03 01 01 20 63 01 00 63 00 00 d3 cb d4 11 | .... c..c......|
00000100: f4 ec 04 0e b9 dc cc d3 d4 9c 28 c8 03 0a 04 07 |..........(.....|
00000110: 58 04 07 10 07 03 07 19 00                      |X........|
```