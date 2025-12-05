# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-05T12:54:23.746Z

## 大小对比

- TypeScript编译器: 391 字节
- WASM编译器: 316 字节
- 差异: 75 字节 (23.73%)

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
      "rawLength": 226,
      "actualLength": 113,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "doubled",
      "offset": 123
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "combined",
      "offset": 131
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 140
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 142
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "extra",
      "offset": 144
    }
  ],
  "functionHeader": {
    "offset": 150,
    "tag": "0xd",
    "remaining": 241
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "doubled",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "combined",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 73
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "extra",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 81,
    "tag": "0xd",
    "remaining": 235
  }
}
```

## 字节级差异

共发现 364 个字节差异:

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
- ... (显示前20个差异，总共364个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 61 73 |res/arrow-fn-bas|
00000070: 69 63 2e 6a 73 0a 74 6f 74 61 6c 0e 64 6f 75 62 |ic.js.total.doub|
00000080: 6c 65 64 10 63 6f 6d 62 69 6e 65 64 02 61 02 62 |led.combined.a.b|
00000090: 0a 65 78 74 72 61 0d c8 03 00 00 00 00 00 0c 20 |.extra......... |
000000a0: 06 01 a4 01 00 03 00 03 03 03 2b 03 ca 03 00 00 |..........+.....|
000000b0: 00 cc 03 00 00 00 ce 03 00 00 00 ca 03 00 01 cc |................|
000000c0: 03 01 01 ce 03 02 01 08 6c 23 00 00 00 c2 00 b8 |........l#......|
000000d0: b9 22 02 00 e3 c2 01 df 22 01 00 e4 c2 02 e0 22 |."......"......"|
000000e0: 01 00 e5 df 0e 06 0e e0 0e 06 0e e1 0e 06 0e 29 |...............)|
000000f0: 06 2f c8 03 01 0f 00 0e 01 00 07 01 00 07 01 00 |./..............|
00000100: 04 01 00 04 01 00 0c 00 04 00 00 02 00 02 03 00 |................|
00000110: 00 04 02 d0 03 00 00 00 d2 03 00 00 00 d3 d4 9f |................|
00000120: 28 c8 03 01 00 00 0c 00 04 00 00 01 00 01 03 00 |(...............|
00000130: 00 04 01 84 01 00 00 00 d3 b9 9c 28 c8 03 01 03 |...........(....|
00000140: 00 00 01 00 0c 00 04 00 00 01 00 01 03 00 01 07 |................|
00000150: 01 84 01 00 00 00 c2 00 bb 22 01 00 28 c8 03 01 |........."..(...|
00000160: 03 00 00 02 00 0c 00 04 00 00 01 00 01 03 01 00 |................|
00000170: 04 01 d4 03 00 00 00 84 01 00 03 df d3 9f 28 c8 |..............(.|
00000180: 03 01 03 00 00 02 00                            |.......|
```

### WASM
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0a 74 6f 74 61 6c 0e 64 6f 75 62 6c 65 64 10 63 |.total.doubled.c|
00000040: 6f 6d 62 69 6e 65 64 02 61 02 62 0a 65 78 74 72 |ombined.a.b.extr|
00000050: 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |a......... .....|
00000060: 00 00 03 03 03 26 00 ca 03 00 0d cc 03 01 0d ce |.....&..........|
00000070: 03 02 0d 08 ec 02 29 c2 00 b8 b9 f2 e3 c2 01 68 |......)........h|
00000080: 00 00 f1 e4 c2 02 68 01 00 f1 e5 68 00 00 0e 68 |......h....h...h|
00000090: 01 00 0e 68 02 00 0e 06 2f c8 03 12 00 00 2a 3e |...h..../.....*>|
000000a0: 17 10 11 01 17 2c 11 01 0d 6b 17 00 17 00 00 0c |.....,...k......|
000000b0: 02 06 01 00 02 00 02 02 00 00 04 02 d0 03 00 01 |................|
000000c0: 00 d2 03 00 01 00 d3 d4 9f 28 c8 03 08 00 0f 02 |.........(......|
000000d0: 14 07 08 07 03 00 0c 02 06 01 00 01 00 01 02 00 |................|
000000e0: 00 04 01 84 01 00 01 00 d3 b9 9c 28 c8 03 06 01 |...........(....|
000000f0: 11 02 16 0c 0c 00 0c 02 06 01 00 01 00 01 02 00 |................|
00000100: 01 06 01 84 01 00 01 40 c2 00 bb 23 01 00 c8 03 |.......@...#....|
00000110: 04 02 12 11 4a 00 0c 02 06 01 00 01 00 01 02 01 |....J...........|
00000120: 00 04 01 d4 03 00 01 00 84 01 00 03 df d3 9f 28 |...............(|
00000130: c8 03 08 02 1e 02 16 07 10 07 03 00             |............|
```