# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/template-literal.ts
**生成时间**: 2025-12-05T12:54:24.347Z

## 大小对比

- TypeScript编译器: 249 字节
- WASM编译器: 165 字节
- 差异: 84 字节 (50.91%)

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
      "rawLength": 230,
      "actualLength": 115,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 119
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 121
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 123
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val: ",
      "offset": 125
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "start ",
      "offset": 131
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " end",
      "offset": 138
    }
  ],
  "functionHeader": {
    "offset": 143,
    "tag": "0xd",
    "remaining": 106
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val: ",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "start ",
      "offset": 62
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " end",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 91
  }
}
```

## 字节级差异

共发现 239 个字节差异:

- 偏移量 0x2: TS=0xe6 vs WASM=0x5e
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
- ... (显示前20个差异，总共239个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 e6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 65 6d 70 6c 61 74 65 2d 6c 69 74 |res/template-lit|
00000070: 65 72 61 6c 2e 6a 73 02 61 02 62 02 63 0a 76 61 |eral.js.a.b.c.va|
00000080: 6c 3a 20 0c 73 74 61 72 74 20 08 20 65 6e 64 0d |l: .start . end.|
00000090: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 03 00 |........ .......|
000000a0: 03 03 00 2e 03 ca 03 00 00 00 cc 03 00 00 00 ce |................|
000000b0: 03 00 00 00 ca 03 00 01 cc 03 01 01 ce 03 02 01 |................|
000000c0: 08 6c 26 00 00 00 b8 e3 04 e8 00 00 00 43 5e 00 |.l&..........C^.|
000000d0: 00 00 df 24 01 00 e4 04 e9 00 00 00 43 5e 00 00 |...$........C^..|
000000e0: 00 df 04 ea 00 00 00 24 02 00 e5 29 06 2f c8 03 |.......$...)./..|
000000f0: 01 06 00 08 01 00 0f 01 00                      |.........|
```

### WASM
```
00000000: 05 07 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2e |emplate-literal.|
00000030: 6a 73 02 61 02 62 02 63 0a 76 61 6c 3a 20 0c 73 |js.a.b.c.val: .s|
00000040: 74 61 72 74 20 08 20 65 6e 64 0d c8 03 00 00 00 |tart . end......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 03 00 2f 00 |... ........../.|
00000060: ca 03 00 0d cc 03 01 0d ce 03 02 0d 08 ec 02 29 |...............)|
00000070: b8 e3 04 e8 00 00 00 43 5e 00 00 00 68 00 00 24 |.......C^...h..$|
00000080: 01 00 e4 04 e9 00 00 00 43 5e 00 00 00 68 00 00 |........C^...h..|
00000090: 04 ea 00 00 00 24 02 00 e5 06 2f c8 03 06 00 00 |.....$..../.....|
000000a0: 53 24 58 02 00                                  |S$X..|
```