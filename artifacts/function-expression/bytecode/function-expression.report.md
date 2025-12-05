# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-expression.ts
**生成时间**: 2025-12-05T12:54:24.003Z

## 大小对比

- TypeScript编译器: 260 字节
- WASM编译器: 191 字节
- 差异: 69 字节 (36.13%)

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
      "rawLength": 236,
      "actualLength": 118,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fe_add",
      "offset": 122
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 129
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 137
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 141
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 143
    }
  ],
  "functionHeader": {
    "offset": 145,
    "tag": "0xd",
    "remaining": 115
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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fe_add",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 251 个字节差异:

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
- ... (显示前20个差异，总共251个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 ec 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 65 78 70 |res/function-exp|
00000070: 72 65 73 73 69 6f 6e 2e 6a 73 0c 66 65 5f 61 64 |ression.js.fe_ad|
00000080: 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 |d.console.log.a.|
00000090: 62 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |b......... .....|
000000a0: 01 00 03 01 01 25 01 ca 03 00 00 00 ca 03 00 01 |.....%..........|
000000b0: 08 6c 1d 00 00 00 c2 00 4f e5 00 00 00 e3 39 e6 |.l......O.....9.|
000000c0: 00 00 00 43 e7 00 00 00 df b8 b9 22 02 00 24 01 |...C......."..$.|
000000d0: 00 0e 29 06 2f c8 03 01 06 00 0e 02 00 0a 01 00 |..)./...........|
000000e0: 0c 00 04 00 00 02 00 02 03 00 00 05 02 d0 03 00 |................|
000000f0: 00 00 d2 03 00 00 00 d3 d4 9f 28 29 c8 03 01 03 |..........()....|
00000100: 00 00 01 00                                     |....|
```

### WASM
```
00000000: 05 06 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 2e 6a 73 0c 66 65 5f 61 64 64 0e 63 6f 6e |on.js.fe_add.con|
00000040: 73 6f 6c 65 06 6c 6f 67 02 61 02 62 0d c8 03 00 |sole.log.a.b....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 05 01 01 |..... ..........|
00000060: 20 00 ca 03 00 01 08 ec 02 29 c2 00 4f e5 00 00 | ........)..O...|
00000070: 00 e3 39 e6 00 00 00 43 e7 00 00 00 df b8 b9 f2 |..9....C........|
00000080: 24 01 00 0e 06 2f c8 03 0c 00 00 41 00 1b 0e 1b |$..../.....A....|
00000090: 0a 11 0c 07 0d 00 0c 43 06 01 00 02 00 02 02 00 |.......C........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 0d 03 07 07 08 07 03 07 11 00    |(..............|
```