# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-literal-shorthand.ts
**生成时间**: 2025-12-05T12:54:24.196Z

## 大小对比

- TypeScript编译器: 240 字节
- WASM编译器: 161 字节
- 差异: 79 字节 (49.07%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 246,
      "actualLength": 123,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-literal-shorthand.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "shorthandValue",
      "offset": 127
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shorthandInfo",
      "offset": 142
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 156
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 159
    }
  ],
  "functionHeader": {
    "offset": 165,
    "tag": "0xd",
    "remaining": 75
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 110,
      "actualLength": 55,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal-shorthand.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "shorthandValue",
      "offset": 58
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shorthandInfo",
      "offset": 73
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 87
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 65
  }
}
```

## 字节级差异

共发现 234 个字节差异:

- 偏移量 0x2: TS=0xf6 vs WASM=0x6e
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
- ... (显示前20个差异，总共234个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 f6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6f 62 6a 65 63 74 2d 6c 69 74 65 72 |res/object-liter|
00000070: 61 6c 2d 73 68 6f 72 74 68 61 6e 64 2e 6a 73 1c |al-shorthand.js.|
00000080: 73 68 6f 72 74 68 61 6e 64 56 61 6c 75 65 1a 73 |shorthandValue.s|
00000090: 68 6f 72 74 68 61 6e 64 49 6e 66 6f 04 68 69 0a |horthandInfo.hi.|
000000a0: 6c 61 62 65 6c 0d c8 03 00 00 00 00 00 0c 20 06 |label......... .|
000000b0: 01 a4 01 00 02 00 03 02 00 1b 02 ca 03 00 00 00 |................|
000000c0: cc 03 00 00 00 ca 03 00 01 cc 03 01 01 08 6c 13 |..............l.|
000000d0: 00 00 00 01 2a 00 00 00 e3 0b 04 e7 00 00 00 4e |....*..........N|
000000e0: e8 00 00 00 e4 29 06 2f c8 03 01 03 00 0c 01 00 |.....)./........|
```

### WASM
```
00000000: 05 05 6e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..n__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2d 73 68 |bject-literal-sh|
00000030: 6f 72 74 68 61 6e 64 2e 6a 73 1c 73 68 6f 72 74 |orthand.js.short|
00000040: 68 61 6e 64 56 61 6c 75 65 1a 73 68 6f 72 74 68 |handValue.shorth|
00000050: 61 6e 64 49 6e 66 6f 04 68 69 0a 6c 61 62 65 6c |andInfo.hi.label|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 02 02 00 1d 00 ca 03 00 0d cc 03 01 0d 08 ec |................|
00000080: 02 29 bf 2a e3 0b 68 00 00 4e e5 00 00 00 04 e7 |.).*..h..N......|
00000090: 00 00 00 4e e8 00 00 00 e4 06 2f c8 03 02 00 00 |...N....../.....|
000000a0: 00                                              |.|
```