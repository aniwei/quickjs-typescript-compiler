# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/complex-expressions.ts
**生成时间**: 2025-12-05T12:54:23.913Z

## 大小对比

- TypeScript编译器: 291 字节
- WASM编译器: 234 字节
- 差异: 57 字节 (24.36%)

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
      "rawLength": 236,
      "actualLength": 118,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/complex-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 122
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 126
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 130
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 132
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 134
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 142
    }
  ],
  "functionHeader": {
    "offset": 146,
    "tag": "0xd",
    "remaining": 145
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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/complex-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 157
  }
}
```

## 字节级差异

共发现 273 个字节差异:

- 偏移量 0x2: TS=0xec vs WASM=0x64
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
- ... (显示前20个差异，总共273个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 ec 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6f 6d 70 6c 65 78 2d 65 78 70 72 |res/complex-expr|
00000070: 65 73 73 69 6f 6e 73 2e 6a 73 06 61 72 72 06 6f |essions.js.arr.o|
00000080: 62 6a 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |bj.a.b.console.l|
00000090: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
000000a0: 00 02 00 03 02 00 58 02 ca 03 00 00 00 cc 03 00 |......X.........|
000000b0: 00 00 ca 03 00 01 cc 03 01 01 08 6c 50 00 00 00 |...........lP...|
000000c0: b8 b9 ba 26 03 00 e3 0b b8 4e e7 00 00 00 b9 4e |...&.....N.....N|
000000d0: e8 00 00 00 e4 39 e9 00 00 00 43 ea 00 00 00 df |.....9....C.....|
000000e0: b7 48 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 00 |.H$...9....C....|
000000f0: e0 42 e7 00 00 00 24 01 00 0e 39 e9 00 00 00 43 |.B....$...9....C|
00000100: ea 00 00 00 e0 04 e8 00 00 00 48 24 01 00 0e 29 |..........H$...)|
00000110: 06 2f c8 03 01 0c 00 0d 01 00 18 01 00 11 01 00 |./..............|
00000120: 14 01 00                                        |...|
```

### WASM
```
00000000: 05 07 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 6c 65 78 2d 65 78 70 72 65 73 73 69 6f |omplex-expressio|
00000030: 6e 73 2e 6a 73 06 61 72 72 06 6f 62 6a 02 61 02 |ns.js.arr.obj.a.|
00000040: 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |b.console.log...|
00000050: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 02 |...... .........|
00000060: 00 5b 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 b8 |.[............).|
00000070: b9 ba 26 03 00 e3 0b b8 4e e7 00 00 00 b9 4e e8 |..&.....N.....N.|
00000080: 00 00 00 e4 39 e9 00 00 00 43 ea 00 00 00 68 00 |....9....C....h.|
00000090: 00 b7 48 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 |..H$...9....C...|
000000a0: 00 68 01 00 42 e7 00 00 00 24 01 00 0e 39 e9 00 |.h..B....$...9..|
000000b0: 00 00 43 ea 00 00 00 68 01 00 04 e8 00 00 00 48 |..C....h.......H|
000000c0: 24 01 00 0e 06 2f c8 03 20 00 00 81 00 1b 0e 1b |$..../.. .......|
000000d0: 0a 16 06 07 07 17 15 1b 0e 1b 0a 11 06 1b 07 17 |................|
000000e0: 15 1b 0e 1b 0a 2a 06 07 07 00                   |.....*....|
```