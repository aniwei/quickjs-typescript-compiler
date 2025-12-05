# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-exports.ts
**生成时间**: 2025-12-05T12:54:24.170Z

## 大小对比

- TypeScript编译器: 372 字节
- WASM编译器: 269 字节
- 差异: 103 字节 (38.29%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 226,
      "actualLength": 113,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-exports.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alpha",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "beta",
      "offset": 123
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gamma",
      "offset": 128
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "*default*",
      "offset": 134
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 144
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "helper",
      "offset": 150
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "offset",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 164,
    "tag": "0xd",
    "remaining": 208
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
      "string": "__tests__/compiler/fixtures/module-exports.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alpha",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gamma",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "beta",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "helper",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "offset",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 184
  }
}
```

## 字节级差异

共发现 360 个字节差异:

- 偏移量 0x1: TS=0x08 vs WASM=0x07
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
- ... (显示前20个差异，总共360个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 |res/module-expor|
00000070: 74 73 2e 6a 73 0a 61 6c 70 68 61 08 62 65 74 61 |ts.js.alpha.beta|
00000080: 0a 67 61 6d 6d 61 12 2a 64 65 66 61 75 6c 74 2a |.gamma.*default*|
00000090: 0a 64 65 6c 74 61 0c 68 65 6c 70 65 72 0c 6f 66 |.delta.helper.of|
000000a0: 66 73 65 74 0d c8 03 00 04 00 00 00 ca 03 ca 03 |fset............|
000000b0: cc 03 ce 03 d0 03 2c d2 03 d2 03 0c 20 06 01 a4 |......,..... ...|
000000c0: 01 00 05 00 03 05 02 17 05 ca 03 00 00 00 cc 03 |................|
000000d0: 00 00 00 d4 03 00 00 00 d0 03 00 00 00 d2 03 00 |................|
000000e0: 00 00 ca 03 00 01 cc 03 01 01 d4 03 02 01 d0 03 |................|
000000f0: 03 01 d2 03 04 01 08 6c 0f 00 00 00 b8 e3 b9 e4 |.......l........|
00000100: c2 00 e5 e1 e6 c2 01 61 04 00 29 06 2f c8 03 01 |.......a..)./...|
00000110: 0c 00 08 01 00 05 04 00 00 02 00 00 01 00 0c 00 |................|
00000120: 04 00 d4 03 00 00 00 03 01 00 03 00 cc 03 01 00 |................|
00000130: df 28 29 c8 03 01 06 00 00 03 00 00 01 00 0c 00 |.().............|
00000140: 04 00 d2 03 01 00 01 03 01 00 14 01 d6 03 00 00 |................|
00000150: 00 d4 03 02 00 d3 11 f4 6c 03 00 00 00 0e b7 db |........l.......|
00000160: 0e df 22 00 00 d3 9f 28 29 c8 03 01 06 00 09 0a |.."....().......|
00000170: 00 03 01 00                                     |....|
```

### WASM
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2e 6a 73 |odule-exports.js|
00000030: 0a 61 6c 70 68 61 0a 67 61 6d 6d 61 0a 64 65 6c |.alpha.gamma.del|
00000040: 74 61 08 62 65 74 61 0c 68 65 6c 70 65 72 0c 6f |ta.beta.helper.o|
00000050: 66 66 73 65 74 0d c8 03 00 04 00 00 ca 03 00 01 |ffset...........|
00000060: cc 03 00 03 2c 00 04 ce 03 00 00 00 0c 20 06 01 |....,........ ..|
00000070: a4 01 00 00 00 01 05 02 14 00 ca 03 00 0d d0 03 |................|
00000080: 01 0d d2 03 02 01 fc 01 03 09 ce 03 04 01 08 ec |................|
00000090: 0a c2 00 e5 c2 01 61 04 00 29 b8 e3 b9 e4 e1 e6 |......a..)......|
000000a0: 06 2f c8 03 06 00 00 00 10 10 1e 00 0c 43 06 01 |./...........C..|
000000b0: d2 03 00 00 00 01 01 00 04 00 d0 03 01 0c 68 00 |..............h.|
000000c0: 00 28 c8 03 06 03 00 03 12 11 0d 00 0c 41 06 01 |.(...........A..|
000000d0: ce 03 01 01 00 02 01 00 11 02 d4 03 00 01 00 d4 |................|
000000e0: 03 01 ff ff ff ff 0f 20 d2 03 02 00 63 00 00 d3 |....... ....c...|
000000f0: 11 f4 ec 04 0e b7 db cb df f0 d3 9f 28 c8 03 0c |............(...|
00000100: 0a 07 3f 04 07 0c 07 0a 07 03 07 1f 00          |..?..........|
```