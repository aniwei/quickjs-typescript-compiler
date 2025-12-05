# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/trace-smoke.ts
**生成时间**: 2025-12-05T12:54:24.377Z

## 大小对比

- TypeScript编译器: 275 字节
- WASM编译器: 192 字节
- 差异: 83 字节 (43.23%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/trace-smoke.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "trace-smoke",
      "offset": 120
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "trace guardrail failed",
      "offset": 132
    }
  ],
  "functionHeader": {
    "offset": 155,
    "tag": "0xd",
    "remaining": 120
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/trace-smoke.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "trace-smoke",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "trace guardrail failed",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 106
  }
}
```

## 字节级差异

共发现 263 个字节差异:

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
- ... (显示前20个差异，总共263个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 72 61 63 65 2d 73 6d 6f 6b 65 2e |res/trace-smoke.|
00000070: 6a 73 0a 67 72 65 65 74 16 74 72 61 63 65 2d 73 |js.greet.trace-s|
00000080: 6d 6f 6b 65 2c 74 72 61 63 65 20 67 75 61 72 64 |moke,trace guard|
00000090: 72 61 69 6c 20 66 61 69 6c 65 64 0d c8 03 00 00 |rail failed.....|
000000a0: 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 01 2e |.... ...........|
000000b0: 01 ca 03 00 00 00 ca 03 00 01 08 6c 26 00 00 00 |...........l&...|
000000c0: c2 00 e3 df 22 00 00 04 e6 00 00 00 ae 6c 13 00 |...."........l..|
000000d0: 00 00 39 9f 00 00 00 04 e7 00 00 00 21 01 00 30 |..9.........!..0|
000000e0: 6e 00 00 00 00 29 06 2f c8 03 01 09 00 09 02 00 |n....)./........|
000000f0: 00 02 00 0f 01 00 0c 00 04 00 ca 03 00 00 00 03 |................|
00000100: 00 00 07 00 04 e6 00 00 00 28 29 c8 03 01 03 00 |.........().....|
00000110: 00 01 00                                        |...|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 61 63 65 2d 73 6d 6f 6b 65 2e 6a 73 0a 67 72 |race-smoke.js.gr|
00000030: 65 65 74 16 74 72 61 63 65 2d 73 6d 6f 6b 65 2c |eet.trace-smoke,|
00000040: 74 72 61 63 65 20 67 75 61 72 64 72 61 69 6c 20 |trace guardrail |
00000050: 66 61 69 6c 65 64 0d c8 03 00 00 00 00 00 0c 20 |failed......... |
00000060: 06 01 a4 01 00 00 00 03 01 01 22 00 ca 03 00 01 |..........".....|
00000070: 08 ec 05 c2 00 e3 29 df f0 04 e6 00 00 00 ae ec |......).........|
00000080: 10 39 9f 00 00 00 11 04 e7 00 00 00 21 01 00 30 |.9..........!..0|
00000090: 06 2f c8 03 0e 00 00 28 08 07 0a 20 06 12 04 39 |./.....(... ...9|
000000a0: 0a 11 1d 00 0c 43 06 01 ca 03 00 00 00 01 00 00 |.....C..........|
000000b0: 06 00 04 e6 00 00 00 28 c8 03 04 00 00 1c 08 00 |.......(........|
```