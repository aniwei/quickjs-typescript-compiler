# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/variable-hoisting.ts
**生成时间**: 2025-12-05T12:54:24.404Z

## 大小对比

- TypeScript编译器: 256 字节
- WASM编译器: 183 字节
- 差异: 73 字节 (39.89%)

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
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/variable-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hoistedVar",
      "offset": 120
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 131
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 139
    },
    {
      "index": 4,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "I am defined later",
      "offset": 143
    }
  ],
  "functionHeader": {
    "offset": 162,
    "tag": "0xd",
    "remaining": 94
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
      "string": "__tests__/compiler/fixtures/variable-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hoistedVar",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    },
    {
      "index": 4,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "I am defined later",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 90
  }
}
```

## 字节级差异

共发现 247 个字节差异:

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
- ... (显示前20个差异，总共247个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 e8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 76 61 72 69 61 62 6c 65 2d 68 6f 69 |res/variable-hoi|
00000070: 73 74 69 6e 67 2e 6a 73 14 68 6f 69 73 74 65 64 |sting.js.hoisted|
00000080: 56 61 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 24 |Var.console.log$|
00000090: 49 20 61 6d 20 64 65 66 69 6e 65 64 20 6c 61 74 |I am defined lat|
000000a0: 65 72 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |er......... ....|
000000b0: 00 01 00 03 01 00 31 01 ca 03 00 00 00 ca 03 00 |......1.........|
000000c0: 01 08 6c 29 00 00 00 39 e6 00 00 00 43 e7 00 00 |..l)...9....C...|
000000d0: 00 39 e5 00 00 00 24 01 00 0e 04 e8 00 00 00 e3 |.9....$.........|
000000e0: 39 e6 00 00 00 43 e7 00 00 00 df 24 01 00 0e 29 |9....C.....$...)|
000000f0: 06 2f c8 03 01 09 00 10 01 00 09 01 00 10 01 00 |./..............|
```

### WASM
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 2d 68 6f 69 73 74 69 6e 67 |ariable-hoisting|
00000030: 2e 6a 73 14 68 6f 69 73 74 65 64 56 61 72 0e 63 |.js.hoistedVar.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 24 49 20 61 6d 20 |onsole.log$I am |
00000050: 64 65 66 69 6e 65 64 20 6c 61 74 65 72 0d c8 03 |defined later...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 |...... .........|
00000070: 00 2a 00 ca 03 00 01 08 ec 02 29 39 e6 00 00 00 |.*........)9....|
00000080: 43 e7 00 00 00 df 24 01 00 0e 04 e8 00 00 00 e3 |C.....$.........|
00000090: 39 e6 00 00 00 43 e7 00 00 00 df 24 01 00 0e 06 |9....C.....$....|
000000a0: 2f c8 03 12 00 00 17 00 1b 0e 1b 0a 07 01 36 15 |/.............6.|
000000b0: 1b 0e 1b 0a 07 01 00                            |.......|
```