# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-this.ts
**生成时间**: 2025-12-05T12:54:23.772Z

## 大小对比

- TypeScript编译器: 285 字节
- WASM编译器: 197 字节
- 差异: 88 字节 (44.67%)

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
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Foo",
      "offset": 113
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "arrow",
      "offset": 117
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 123
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 125
    }
  ],
  "functionHeader": {
    "offset": 127,
    "tag": "0xd",
    "remaining": 158
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Foo",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "arrow",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 139
  }
}
```

## 字节级差异

共发现 264 个字节差异:

- 偏移量 0x2: TS=0xda vs WASM=0x52
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
- ... (显示前20个差异，总共264个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 61 72 72 6f 77 2d 74 68 69 73 2e 6a |res/arrow-this.j|
00000070: 73 06 46 6f 6f 0a 61 72 72 6f 77 02 78 02 79 0d |s.Foo.arrow.x.y.|
00000080: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000090: 03 01 01 0c 01 ca 03 00 00 00 ca 03 00 01 08 6c |...............l|
000000a0: 04 00 00 00 c2 00 e3 29 06 2f c8 03 01 00 00 0c |.......)./......|
000000b0: 00 04 00 ca 03 00 02 00 03 00 01 1b 02 10 00 00 |................|
000000c0: 00 cc 03 00 00 00 08 cb b8 b8 c7 1b 44 e7 00 00 |............D...|
000000d0: 00 c2 00 4f e6 00 00 00 5b 01 00 c8 22 00 00 0e |...O....[..."...|
000000e0: 29 c8 03 01 0f 00 02 01 00 02 7f 00 07 01 00 00 |)...............|
000000f0: 01 00 0a 02 00 0c 00 04 00 00 00 00 00 03 01 00 |................|
00000100: 0a 00 10 00 01 b9 b9 df 1b 44 e8 00 00 00 29 c8 |.........D....).|
00000110: 03 01 09 00 00 02 00 00 01 00 02 7f 00          |.............|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 74 68 69 73 2e 6a 73 06 46 6f 6f |rrow-this.js.Foo|
00000030: 0a 61 72 72 6f 77 02 78 02 79 0d c8 03 00 00 00 |.arrow.x.y......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 09 00 |... ............|
00000050: ca 03 00 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 |..........)./...|
00000060: 00 00 00 0c 43 06 01 ca 03 00 02 00 02 00 01 19 |....C...........|
00000070: 02 cc 03 01 00 30 10 00 01 40 08 cc 63 00 00 c8 |.....0...@..c...|
00000080: b8 44 e7 00 00 00 c2 00 4f e6 00 00 00 cb 64 00 |.D......O.....d.|
00000090: 00 f0 29 c8 03 0c 00 00 1c 08 07 08 00 0e 08 07 |..).............|
000000a0: 11 0a 00 0c 42 06 01 00 00 00 00 02 01 00 08 00 |....B...........|
000000b0: 10 01 01 df b9 44 e8 00 00 00 29 c8 03 06 02 12 |.....D....).....|
000000c0: 03 13 07 08 00                                  |.....|
```