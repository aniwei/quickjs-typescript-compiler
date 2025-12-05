# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/rest-params.ts
**生成时间**: 2025-12-05T12:54:24.244Z

## 大小对比

- TypeScript编译器: 282 字节
- WASM编译器: 193 字节
- 差异: 89 字节 (46.11%)

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
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/rest-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restBasic",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restMixed",
      "offset": 124
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "args",
      "offset": 134
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 139
    }
  ],
  "functionHeader": {
    "offset": 141,
    "tag": "0xd",
    "remaining": 141
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/rest-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restBasic",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "restMixed",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "args",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 267 个字节差异:

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
- ... (显示前20个差异，总共267个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 72 65 73 74 2d 70 61 72 61 6d 73 2e |res/rest-params.|
00000070: 6a 73 12 72 65 73 74 42 61 73 69 63 12 72 65 73 |js.restBasic.res|
00000080: 74 4d 69 78 65 64 08 61 72 67 73 02 61 0d c8 03 |tMixed.args.a...|
00000090: 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 02 |...... .........|
000000a0: 02 0f 02 ca 03 00 00 00 cc 03 00 00 00 ca 03 00 |................|
000000b0: 01 cc 03 01 01 08 6c 07 00 00 00 c2 00 e3 c2 01 |......l.........|
000000c0: e4 29 06 2f c8 03 01 03 00 09 02 00 0c 00 04 00 |.)./............|
000000d0: ca 03 01 00 01 03 00 00 08 01 ce 03 00 00 00 0d |................|
000000e0: 00 00 db 0e d3 28 29 c8 03 01 03 00 05 01 00 0c |.....().........|
000000f0: 00 04 00 cc 03 02 00 02 03 00 00 08 02 d0 03 00 |................|
00000100: 00 00 ce 03 00 00 00 0d 01 00 dc 0e d4 28 29 c8 |.............().|
00000110: 03 01 06 00 05 03 00 00 01 00                   |..........|
```

### WASM
```
00000000: 05 05 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 73 74 2d 70 61 72 61 6d 73 2e 6a 73 12 72 65 |est-params.js.re|
00000030: 73 74 42 61 73 69 63 12 72 65 73 74 4d 69 78 65 |stBasic.restMixe|
00000040: 64 08 61 72 67 73 02 61 0d c8 03 00 00 00 00 00 |d.args.a........|
00000050: 0c 20 06 01 a4 01 00 00 00 01 02 02 0c 00 ca 03 |. ..............|
00000060: 00 01 cc 03 01 01 08 ec 08 c2 00 e3 c2 01 e4 29 |...............)|
00000070: 06 2f c8 03 02 00 00 00 0c 41 06 01 ca 03 01 00 |./.......A......|
00000080: 00 01 00 00 05 01 ce 03 00 01 00 0d 00 00 db 28 |...............(|
00000090: c8 03 06 00 00 12 16 07 0d 00 0c 41 06 01 cc 03 |...........A....|
000000a0: 02 00 01 01 00 00 05 02 d0 03 00 01 00 ce 03 00 |................|
000000b0: 01 00 0d 01 00 dc 28 c8 03 06 03 00 12 16 07 0d |......(.........|
000000c0: 00                                              |.|
```