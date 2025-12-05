# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comma-operator.ts
**生成时间**: 2025-12-05T12:54:23.896Z

## 大小对比

- TypeScript编译器: 252 字节
- WASM编译器: 169 字节
- 差异: 83 字节 (49.11%)

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
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comma-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 119
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 121
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 123
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 131
    }
  ],
  "functionHeader": {
    "offset": 135,
    "tag": "0xd",
    "remaining": 117
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
      "string": "__tests__/compiler/fixtures/comma-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 103
  }
}
```

## 字节级差异

共发现 246 个字节差异:

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
- ... (显示前20个差异，总共246个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6f 6d 6d 61 2d 6f 70 65 72 61 74 |res/comma-operat|
00000070: 6f 72 2e 6a 73 02 61 02 62 02 63 0e 63 6f 6e 73 |or.js.a.b.c.cons|
00000080: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000090: 20 06 01 a4 01 00 03 00 03 03 00 30 03 ca 03 00 | ..........0....|
000000a0: 00 00 cc 03 00 00 00 ce 03 00 00 00 ca 03 00 01 |................|
000000b0: cc 03 01 01 ce 03 02 01 08 6c 28 00 00 00 b8 0e |.........l(.....|
000000c0: b9 e3 39 e8 00 00 00 43 e9 00 00 00 df 24 01 00 |..9....C.....$..|
000000d0: 0e b7 e4 0e e0 e5 39 e8 00 00 00 43 e9 00 00 00 |......9....C....|
000000e0: e1 24 01 00 0e 29 06 2f c8 03 01 0f 00 06 01 00 |.$...)./........|
000000f0: 0e 01 00 05 01 00 02 02 00 0d 01 00             |............|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 6d 61 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 |omma-operator.js|
00000030: 02 61 02 62 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c |.a.b.c.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 03 03 00 2b 00 ca 03 00 01 cc 03 01 01 |......+.........|
00000060: ce 03 02 01 08 ec 02 29 b9 e3 39 e8 00 00 00 43 |.......)..9....C|
00000070: e9 00 00 00 df 24 01 00 0e b7 e8 91 e8 e5 39 e8 |.....$........9.|
00000080: 00 00 00 43 e9 00 00 00 e1 24 01 00 0e 06 2f c8 |...C.....$..../.|
00000090: 03 16 00 00 21 00 1b 0e 1b 0a 07 01 1d 03 07 0a |....!...........|
000000a0: 12 1b 1b 0e 1b 0a 07 01 00                      |.........|
```