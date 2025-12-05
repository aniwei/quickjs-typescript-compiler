# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/default-params.ts
**生成时间**: 2025-12-05T12:54:23.946Z

## 大小对比

- TypeScript编译器: 374 字节
- WASM编译器: 322 字节
- 差异: 52 字节 (16.15%)

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
      "rawLength": 226,
      "actualLength": 113,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "defaultBasic",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "defaultExpr",
      "offset": 130
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "defaultRef",
      "offset": 142
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 153
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 155
    }
  ],
  "functionHeader": {
    "offset": 157,
    "tag": "0xd",
    "remaining": 217
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "defaultBasic",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "defaultExpr",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "defaultRef",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 84
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 86
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 234
  }
}
```

## 字节级差异

共发现 356 个字节差异:

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
- ... (显示前20个差异，总共356个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 64 65 66 61 75 6c 74 2d 70 61 72 61 |res/default-para|
00000070: 6d 73 2e 6a 73 18 64 65 66 61 75 6c 74 42 61 73 |ms.js.defaultBas|
00000080: 69 63 16 64 65 66 61 75 6c 74 45 78 70 72 14 64 |ic.defaultExpr.d|
00000090: 65 66 61 75 6c 74 52 65 66 02 61 02 62 0d c8 03 |efaultRef.a.b...|
000000a0: 00 00 00 00 00 0c 20 06 01 a4 01 00 03 00 03 03 |...... .........|
000000b0: 03 12 03 ca 03 00 00 00 cc 03 00 00 00 ce 03 00 |................|
000000c0: 00 00 ca 03 00 01 cc 03 01 01 ce 03 02 01 08 6c |...............l|
000000d0: 0a 00 00 00 c2 00 e3 c2 01 e4 c2 02 e5 29 06 2f |.............)./|
000000e0: c8 03 01 06 00 09 02 00 03 03 00 0c 00 04 00 ca |................|
000000f0: 03 01 00 01 03 00 00 0f 01 d0 03 00 00 00 d3 11 |................|
00000100: f4 6c 03 00 00 00 0e b8 db 0e d3 28 29 c8 03 01 |.l.........()...|
00000110: 03 00 0c 01 00 0c 00 04 00 cc 03 01 00 01 03 00 |................|
00000120: 00 11 01 d0 03 00 00 00 d3 11 f4 6c 05 00 00 00 |...........l....|
00000130: 0e b8 b9 9f db 0e d3 28 29 c8 03 01 06 00 09 03 |.......().......|
00000140: 00 05 01 00 0c 00 04 00 ce 03 02 00 02 03 00 00 |................|
00000150: 0f 02 d0 03 00 00 00 d2 03 00 00 00 d4 11 f4 6c |...............l|
00000160: 03 00 00 00 0e d3 dc 0e d4 28 29 c8 03 01 06 00 |.........().....|
00000170: 09 06 00 03 01 00                               |......|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 66 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 |efault-params.js|
00000030: 18 64 65 66 61 75 6c 74 42 61 73 69 63 16 64 65 |.defaultBasic.de|
00000040: 66 61 75 6c 74 45 78 70 72 14 64 65 66 61 75 6c |faultExpr.defaul|
00000050: 74 52 65 66 02 61 02 62 0d c8 03 00 00 00 00 00 |tRef.a.b........|
00000060: 0c 20 06 01 a4 01 00 00 00 01 03 03 0f 00 ca 03 |. ..............|
00000070: 00 01 cc 03 01 01 ce 03 02 01 08 ec 0b c2 00 e3 |................|
00000080: c2 01 e4 c2 02 e5 29 06 2f c8 03 02 00 00 00 0c |......)./.......|
00000090: 41 06 01 ca 03 01 01 00 02 00 00 0e 02 d0 03 00 |A...............|
000000a0: 01 00 d0 03 01 ff ff ff ff 0f 20 63 00 00 d3 11 |.......... c....|
000000b0: f4 ec 04 0e b8 db cb d3 28 c8 03 06 00 00 3f 16 |........(.....?.|
000000c0: 07 0d 00 0c 41 06 01 cc 03 01 01 00 02 00 00 10 |....A...........|
000000d0: 02 d0 03 00 01 00 d0 03 01 ff ff ff ff 0f 20 63 |.............. c|
000000e0: 00 00 d3 11 f4 ec 06 0e b8 b9 9f db cb d3 28 c8 |..............(.|
000000f0: 03 08 03 00 39 36 12 1f 07 0d 00 0c 41 06 01 ce |....96......A...|
00000100: 03 02 02 01 02 00 00 15 04 d0 03 00 01 00 d2 03 |................|
00000110: 00 01 00 d0 03 01 ff ff ff ff 0f 20 d2 03 01 01 |........... ....|
00000120: 20 63 01 00 63 00 00 d3 cb d4 11 f4 ec 06 0e 64 | c..c..........d|
00000130: 00 00 dc cc d4 28 c8 03 08 06 00 48 36 1c 1f 07 |.....(.....H6...|
00000140: 0d 00                                           |..|
```