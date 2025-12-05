# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/conditional-return.ts
**生成时间**: 2025-12-05T12:54:23.929Z

## 大小对比

- TypeScript编译器: 246 字节
- WASM编译器: 164 字节
- 差异: 82 字节 (50.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 234,
      "actualLength": 117,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/conditional-return.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "adjust",
      "offset": 121
    }
  ],
  "functionHeader": {
    "offset": 128,
    "tag": "0xd",
    "remaining": 118
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-return.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "adjust",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 105
  }
}
```

## 字节级差异

共发现 240 个字节差异:

- 偏移量 0x2: TS=0xea vs WASM=0x62
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
- ... (显示前20个差异，总共240个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 ea 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6f 6e 64 69 74 69 6f 6e 61 6c 2d |res/conditional-|
00000070: 72 65 74 75 72 6e 2e 6a 73 0c 61 64 6a 75 73 74 |return.js.adjust|
00000080: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 |......... ......|
00000090: 00 03 01 01 12 01 ca 03 00 00 00 ca 03 00 01 08 |................|
000000a0: 6c 0a 00 00 00 c2 00 e3 df ba 22 01 00 0e 29 06 |l........."...).|
000000b0: 2f c8 03 01 06 00 09 05 00 01 02 00 0c 00 04 00 |/...............|
000000c0: ca 03 01 00 01 03 00 00 16 01 84 01 00 00 00 d3 |................|
000000d0: bc a6 6c 09 00 00 00 d3 b8 9f 28 6e 00 00 00 00 |..l.......(n....|
000000e0: d3 b8 a0 28 29 c8 03 01 0c 00 00 01 00 08 01 00 |...()...........|
000000f0: 09 01 00 00 01 00                               |......|
```

### WASM
```
00000000: 05 02 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 72 65 74 75 72 |onditional-retur|
00000030: 6e 2e 6a 73 0c 61 64 6a 75 73 74 0d c8 03 00 00 |n.js.adjust.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0d |.... ...........|
00000050: 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df ba f1 0e |...........)....|
00000060: 06 2f c8 03 08 00 00 00 07 0e 00 0c 0c 00 0c 43 |./.............C|
00000070: 06 01 ca 03 01 00 01 02 00 00 0d 01 84 01 00 01 |................|
00000080: 00 d3 bc a6 ec 05 d3 b8 9f 28 d3 b8 a0 28 c8 03 |.........(...(..|
00000090: 12 00 00 03 0c 0c 0c 12 01 0c 0c 07 19 09 0a 0c |................|
000000a0: 0c 07 19 00                                     |....|
```