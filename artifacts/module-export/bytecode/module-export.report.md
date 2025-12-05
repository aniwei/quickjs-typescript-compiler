# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-export.ts
**生成时间**: 2025-12-05T12:54:24.146Z

## 大小对比

- TypeScript编译器: 353 字节
- WASM编译器: 255 字节
- 差异: 98 字节 (38.43%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-export.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 118
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 122
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 124
    }
  ],
  "functionHeader": {
    "offset": 128,
    "tag": "0xd",
    "remaining": 225
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-export.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 196
  }
}
```

## 字节级差异

共发现 334 个字节差异:

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
- ... (显示前20个差异，总共334个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 |res/module-expor|
00000070: 74 2e 6a 73 02 61 06 66 6f 6f 02 43 06 62 61 72 |t.js.a.foo.C.bar|
00000080: 0d c8 03 00 04 00 00 00 ca 03 ca 03 cc 03 cc 03 |................|
00000090: ce 03 ce 03 d0 03 2c 0c 20 06 01 a4 01 00 05 00 |......,. .......|
000000a0: 03 05 03 27 05 ca 03 00 00 00 cc 03 00 00 00 ce |...'............|
000000b0: 03 01 00 00 f0 01 02 00 00 d0 03 00 00 00 ca 03 |................|
000000c0: 00 01 cc 03 01 01 ce 03 02 01 f0 01 03 01 d0 03 |................|
000000d0: 04 01 08 6c 1f 00 00 00 b8 e3 c2 00 e4 06 02 01 |...l............|
000000e0: 00 00 00 58 e7 00 00 00 00 06 5b 03 00 0e 11 e5 |...X......[.....|
000000f0: 51 c2 02 61 04 00 29 06 2f c8 03 01 06 00 0b 01 |Q..a..)./.......|
00000100: 00 14 01 00 0c 00 04 00 cc 03 00 00 00 03 00 00 |................|
00000110: 03 00 b9 28 29 c8 03 01 03 00 00 01 00 0c 00 04 |...()...........|
00000120: 00 ce 03 00 00 00 03 00 00 18 00 2b 39 78 00 00 |...........+9x..|
00000130: 00 11 6c 0a 00 00 00 39 08 00 00 00 1b 24 00 00 |..l....9.....$..|
00000140: 0e 0e 29 c8 03 01 00 00 0c 00 04 00 d0 03 00 00 |..).............|
00000150: 00 03 00 00 03 00 ba 28 29 c8 03 01 03 00 00 03 |.......().......|
00000160: 00                                              |.|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 2e 6a 73 02 |odule-export.js.|
00000030: 61 06 66 6f 6f 02 43 06 62 61 72 0d c8 03 00 04 |a.foo.C.bar.....|
00000040: 00 00 ca 03 00 01 cc 03 00 02 ce 03 00 03 2c 00 |..............,.|
00000050: 00 00 0c 20 06 01 a4 01 00 02 00 03 04 03 25 02 |... ..........%.|
00000060: ce 03 02 00 30 f0 01 03 01 70 ca 03 00 0d cc 03 |....0....p......|
00000070: 01 01 ce 03 02 09 d0 03 03 01 08 ec 08 c2 00 e4 |................|
00000080: c2 02 e6 29 b8 e3 63 00 00 06 63 01 00 c1 01 58 |...)..c...c....X|
00000090: e7 00 00 00 00 06 cc 0e cf 6b 01 00 e5 06 2f c8 |.........k..../.|
000000a0: 03 02 00 00 00 0c 43 06 01 cc 03 00 00 00 01 00 |......C.........|
000000b0: 00 02 00 b9 28 c8 03 04 01 07 07 22 00 0c 40 05 |....(......"..@.|
000000c0: 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 01 |................|
000000d0: 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
000000e0: 29 c8 03 02 03 00 00 0c 43 06 01 d0 03 00 00 00 |).......C.......|
000000f0: 01 00 00 02 00 ba 28 c8 03 04 04 0f 07 22 00    |......(......".|
```