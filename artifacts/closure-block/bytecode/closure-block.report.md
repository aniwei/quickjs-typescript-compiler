# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-block.ts
**生成时间**: 2025-12-05T12:54:23.890Z

## 大小对比

- TypeScript编译器: 305 字节
- WASM编译器: 238 字节
- 差异: 67 字节 (28.15%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 121
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 129
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 133
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 135
    }
  ],
  "functionHeader": {
    "offset": 137,
    "tag": "0xd",
    "remaining": 168
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 170
  }
}
```

## 字节级差异

共发现 283 个字节差异:

- 偏移量 0x2: TS=0xe0 vs WASM=0x58
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
- ... (显示前20个差异，总共283个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6c 6f 73 75 72 65 2d 62 6c 6f 63 |res/closure-bloc|
00000070: 6b 2e 6a 73 08 74 65 73 74 0e 63 6f 6e 73 6f 6c |k.js.test.consol|
00000080: 65 06 6c 6f 67 02 66 02 78 0d c8 03 00 00 00 00 |e.log.f.x.......|
00000090: 00 0c 20 06 01 a4 01 00 01 00 03 01 01 1e 01 ca |.. .............|
000000a0: 03 00 00 00 ca 03 00 01 08 6c 16 00 00 00 c2 00 |.........l......|
000000b0: e3 39 e6 00 00 00 43 e7 00 00 00 df 22 00 00 24 |.9....C....."..$|
000000c0: 01 00 0e 29 06 2f c8 03 01 06 00 09 07 00 0a 01 |...)./..........|
000000d0: 00 0c 00 04 00 ca 03 00 02 00 03 00 01 15 02 d0 |................|
000000e0: 03 00 00 00 d2 03 01 00 00 06 5b 00 00 01 0a 00 |..........[.....|
000000f0: 00 00 5b 01 00 c2 00 cb c7 22 00 00 28 29 c8 03 |..[......"..()..|
00000100: 01 12 00 04 01 00 00 01 00 00 01 00 08 01 00 03 |................|
00000110: 01 00 00 01 00 0c 00 04 00 00 00 00 00 03 01 00 |................|
00000120: 03 00 d2 03 01 01 df 28 29 c8 03 01 03 00 00 04 |.......().......|
00000130: 00                                              |.|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 6c 6f 63 6b 2e 6a 73 08 |losure-block.js.|
00000030: 74 65 73 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |test.console.log|
00000040: 02 66 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.f.x......... ..|
00000050: a4 01 00 00 00 03 01 01 19 00 ca 03 00 01 08 ec |................|
00000060: 05 c2 00 e3 29 39 e6 00 00 00 43 e7 00 00 00 df |....)9....C.....|
00000070: f0 24 01 00 0e 06 2f c8 03 0e 00 00 00 07 10 00 |.$..../.........|
00000080: 1b 0e 1b 0a 07 08 07 09 00 0c 43 06 01 ca 03 00 |..........C.....|
00000090: 02 00 02 00 01 20 02 d0 03 01 00 20 d2 03 02 01 |..... ..... ....|
000000a0: 60 63 00 00 06 cb 63 01 00 bf 0a cc c2 00 4f e8 |`c....c.......O.|
000000b0: 00 00 00 11 65 00 00 0e 6b 01 00 64 00 00 23 00 |....e...k..d..#.|
000000c0: 00 c8 03 0a 00 00 00 0b 08 08 4f 0a 11 0d 00 0c |..........O.....|
000000d0: 43 06 01 00 00 00 00 01 01 00 04 00 d2 03 01 09 |C...............|
000000e0: 68 00 00 28 c8 03 06 04 08 02 28 11 0d 00       |h..(......(...|
```