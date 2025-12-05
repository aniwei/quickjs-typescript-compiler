# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-in-loop.ts
**生成时间**: 2025-12-05T12:54:23.979Z

## 大小对比

- TypeScript编译器: 243 字节
- WASM编译器: 160 字节
- 差异: 83 字节 (51.88%)

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
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 118
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 122
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 124
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 126
    },
    {
      "index": 6,
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
    "remaining": 105
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 6,
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
    "remaining": 91
  }
}
```

## 字节级差异

共发现 238 个字节差异:

- 偏移量 0x2: TS=0xdc vs WASM=0x54
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
- ... (显示前20个差异，总共238个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 66 6f 72 2d 69 6e 2d 6c 6f 6f 70 2e |res/for-in-loop.|
00000070: 6a 73 06 6f 62 6a 06 6b 65 79 02 61 02 62 0e 63 |js.obj.key.a.b.c|
00000080: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000090: 00 00 0c 20 06 01 a4 01 00 02 00 03 02 00 36 02 |... ..........6.|
000000a0: ca 03 00 00 00 cc 03 00 00 00 ca 03 00 01 cc 03 |................|
000000b0: 01 01 08 6c 2e 00 00 00 0b b8 4e e7 00 00 00 b9 |...l......N.....|
000000c0: 4e e8 00 00 00 e3 df 7e 6e 10 00 00 00 e4 39 e9 |N......~n.....9.|
000000d0: 00 00 00 43 ea 00 00 00 e0 24 01 00 0e 81 6c ea |...C.....$....l.|
000000e0: ff ff ff 0e 0e 29 06 2f c8 03 01 06 00 14 01 00 |.....)./........|
000000f0: 12 01 00                                        |...|
```

### WASM
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 06 6f 62 |or-in-loop.js.ob|
00000030: 6a 06 6b 65 79 02 61 02 62 0e 63 6f 6e 73 6f 6c |j.key.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 02 00 2d 00 ca 03 00 01 cc |.........-......|
00000060: 03 01 01 08 ec 02 29 0b b8 4e e7 00 00 00 b9 4e |......)..N.....N|
00000070: e8 00 00 00 e3 df 7e ee 11 e4 39 e9 00 00 00 43 |......~...9....C|
00000080: ea 00 00 00 e0 24 01 00 0e 81 ec ee 0e 0e 06 2f |.....$........./|
00000090: c8 03 0c 00 00 5d 20 1c 1b 1b 0e 1b 0a 07 01 00 |.....] .........|
```