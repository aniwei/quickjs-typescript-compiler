# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/delete-operator.ts
**生成时间**: 2025-12-05T12:54:23.952Z

## 大小对比

- TypeScript编译器: 231 字节
- WASM编译器: 162 字节
- 差异: 69 字节 (42.59%)

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
      "rawLength": 228,
      "actualLength": 114,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/delete-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 118
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 122
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 124
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 126
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 134
    }
  ],
  "functionHeader": {
    "offset": 138,
    "tag": "0xd",
    "remaining": 93
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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 225 个字节差异:

- 偏移量 0x2: TS=0xe4 vs WASM=0x5c
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
- ... (显示前20个差异，总共225个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 e4 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 64 65 6c 65 74 65 2d 6f 70 65 72 61 |res/delete-opera|
00000070: 74 6f 72 2e 6a 73 06 6f 62 6a 02 61 02 62 0e 63 |tor.js.obj.a.b.c|
00000080: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000090: 00 00 0c 20 06 01 a4 01 00 01 00 03 01 00 33 01 |... ..........3.|
000000a0: ca 03 00 00 00 ca 03 00 01 08 6c 2b 00 00 00 0b |..........l+....|
000000b0: b8 4e e6 00 00 00 b9 4e e7 00 00 00 e3 df 04 e6 |.N.....N........|
000000c0: 00 00 00 9a 0e 39 e8 00 00 00 43 e9 00 00 00 df |.....9....C.....|
000000d0: 42 e6 00 00 00 24 01 00 0e 29 06 2f c8 03 01 06 |B....$...)./....|
000000e0: 00 14 02 00 12 01 00                            |.......|
```

### WASM
```
00000000: 05 06 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 6f 70 65 72 61 74 6f 72 2e 6a |elete-operator.j|
00000030: 73 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f 6c |s.obj.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 01 00 2f 00 ca 03 00 01 08 |........./......|
00000060: ec 02 29 0b b8 4e e6 00 00 00 b9 4e e7 00 00 00 |..)..N.....N....|
00000070: e7 04 e6 00 00 00 9a 0e 39 e8 00 00 00 43 e9 00 |........9....C..|
00000080: 00 00 df 42 e6 00 00 00 24 01 00 0e 06 2f c8 03 |...B....$..../..|
00000090: 10 00 00 59 0e 07 06 26 13 1b 0e 1b 0a 07 06 1b |...Y...&........|
000000a0: 07 00                                           |..|
```