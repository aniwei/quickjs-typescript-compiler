# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-hoisting.ts
**生成时间**: 2025-12-05T12:54:24.016Z

## 大小对比

- TypeScript编译器: 259 字节
- WASM编译器: 181 字节
- 差异: 78 字节 (43.09%)

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
      "rawLength": 232,
      "actualLength": 116,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hoistedFunc",
      "offset": 120
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 132
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 140
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "I am hoisted",
      "offset": 144
    }
  ],
  "functionHeader": {
    "offset": 157,
    "tag": "0xd",
    "remaining": 102
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "hoistedFunc",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "I am hoisted",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 246 个字节差异:

- 偏移量 0x2: TS=0xe8 vs WASM=0x60
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
- ... (显示前20个差异，总共246个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 e8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 68 6f 69 |res/function-hoi|
00000070: 73 74 69 6e 67 2e 6a 73 16 68 6f 69 73 74 65 64 |sting.js.hoisted|
00000080: 46 75 6e 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |Func.console.log|
00000090: 18 49 20 61 6d 20 68 6f 69 73 74 65 64 0d c8 03 |.I am hoisted...|
000000a0: 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 |...... .........|
000000b0: 01 22 01 ca 03 00 00 00 ca 03 00 01 08 6c 1a 00 |."...........l..|
000000c0: 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 |..9....C....9...|
000000d0: 00 22 00 00 24 01 00 0e c2 00 e3 29 06 2f c8 03 |."..$......)./..|
000000e0: 01 00 00 0c 00 04 00 ca 03 00 00 00 03 00 00 07 |................|
000000f0: 00 04 e8 00 00 00 28 29 c8 03 01 06 00 00 01 00 |......()........|
00000100: 00 01 00                                        |...|
```

### WASM
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 68 6f 69 73 74 69 6e 67 |unction-hoisting|
00000030: 2e 6a 73 16 68 6f 69 73 74 65 64 46 75 6e 63 0e |.js.hoistedFunc.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 18 49 20 61 6d |console.log.I am|
00000050: 20 68 6f 69 73 74 65 64 0d c8 03 00 00 00 00 00 | hoisted........|
00000060: 0c 20 06 01 a4 01 00 00 00 03 01 01 19 00 ca 03 |. ..............|
00000070: 00 01 08 ec 05 c2 00 e3 29 39 e6 00 00 00 43 e7 |........)9....C.|
00000080: 00 00 00 df f0 24 01 00 0e 06 2f c8 03 0a 00 00 |.....$..../.....|
00000090: 3e 0e 1b 0a 07 16 07 17 00 0c 43 06 01 ca 03 00 |>.........C.....|
000000a0: 00 00 01 00 00 06 00 04 e8 00 00 00 28 c8 03 04 |............(...|
000000b0: 01 00 1c 04 00                                  |.....|
```