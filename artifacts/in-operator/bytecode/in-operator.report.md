# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/in-operator.ts
**生成时间**: 2025-12-05T12:54:24.038Z

## 大小对比

- TypeScript编译器: 238 字节
- WASM编译器: 176 字节
- 差异: 62 字节 (35.23%)

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
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/in-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "in_obj",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 121
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 123
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 131
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 135
    }
  ],
  "functionHeader": {
    "offset": 137,
    "tag": "0xd",
    "remaining": 101
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/in-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "in_obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 108
  }
}
```

## 字节级差异

共发现 230 个字节差异:

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
- ... (显示前20个差异，总共230个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 69 6e 2d 6f 70 65 72 61 74 6f 72 2e |res/in-operator.|
00000070: 6a 73 0c 69 6e 5f 6f 62 6a 02 61 0e 63 6f 6e 73 |js.in_obj.a.cons|
00000080: 6f 6c 65 06 6c 6f 67 02 62 0d c8 03 00 00 00 00 |ole.log.b.......|
00000090: 00 0c 20 06 01 a4 01 00 01 00 03 01 00 3b 01 ca |.. ..........;..|
000000a0: 03 00 00 00 ca 03 00 01 08 6c 33 00 00 00 0b b8 |.........l3.....|
000000b0: 4e e6 00 00 00 e3 39 e7 00 00 00 43 e8 00 00 00 |N.....9....C....|
000000c0: 04 e6 00 00 00 df aa 24 01 00 0e 39 e7 00 00 00 |.......$...9....|
000000d0: 43 e8 00 00 00 04 e9 00 00 00 df aa 24 01 00 0e |C...........$...|
000000e0: 29 06 2f c8 03 01 06 00 18 01 00 15 01 00       |)./...........|
```

### WASM
```
00000000: 05 06 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 6e 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 69 6e |n-operator.js.in|
00000030: 5f 6f 62 6a 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |_obj.a.console.l|
00000040: 6f 67 02 62 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.b......... ..|
00000050: a4 01 00 00 00 04 01 00 38 00 ca 03 00 01 08 ec |........8.......|
00000060: 02 29 0b b8 4e e6 00 00 00 e3 39 e7 00 00 00 43 |.)..N.....9....C|
00000070: e8 00 00 00 04 e6 00 00 00 df aa 24 01 00 0e 39 |...........$...9|
00000080: e7 00 00 00 43 e8 00 00 00 04 e9 00 00 00 df aa |....C...........|
00000090: 24 01 00 0e 06 2f c8 03 16 00 00 3f 00 1b 0e 34 |$..../.....?...4|
000000a0: 18 07 05 07 09 17 15 1b 0e 34 18 07 05 07 09 00 |.........4......|
```