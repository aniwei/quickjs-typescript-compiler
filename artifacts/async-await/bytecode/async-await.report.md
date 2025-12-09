# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/async-await.ts
**生成时间**: 2025-12-09T09:46:45.220Z

## 大小对比

- TypeScript编译器: 290 字节
- WASM编译器: 301 字节
- 差异: -11 字节 (-3.65%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/async-await.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "fetchValue",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 218
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
      "string": "__tests__/compiler/fixtures/async-await.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "fetchValue",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 229
  }
}
```

## 字节级差异

共发现 111 个字节差异:

- 偏移量 0x90: TS=0x43 vs WASM=0x62
- 偏移量 0x9f: TS=0x28 vs WASM=0x2f
- 偏移量 0xa9: TS=0x43 vs WASM=0x62
- 偏移量 0xaf: TS=0x00 vs WASM=0x01
- 偏移量 0xb2: TS=0x00 vs WASM=0x01
- 偏移量 0xb4: TS=0x20 vs WASM=0x23
- 偏移量 0xb5: TS=0x00 vs WASM=0x01
- 偏移量 0xb6: TS=0x39 vs WASM=0x84
- 偏移量 0xb7: TS=0xe7 vs WASM=0x01
- 偏移量 0xb8: TS=0x00 vs WASM=0x01
- 偏移量 0xba: TS=0x00 vs WASM=0x30
- 偏移量 0xbb: TS=0x43 vs WASM=0xca
- 偏移量 0xbc: TS=0xe8 vs WASM=0x03
- 偏移量 0xbf: TS=0x00 vs WASM=0x63
- 偏移量 0xc0: TS=0x04 vs WASM=0x00
- 偏移量 0xc1: TS=0x42 vs WASM=0x00
- 偏移量 0xc2: TS=0x00 vs WASM=0xdf
- 偏移量 0xc3: TS=0x00 vs WASM=0xf0
- 偏移量 0xc4: TS=0x00 vs WASM=0x8d
- 偏移量 0xc5: TS=0x39 vs WASM=0xcb
- ... (显示前20个差异，总共111个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 79 6e 63 2d 61 77 61 69 74 2e 6a 73 14 66 65 |sync-await.js.fe|
00000030: 74 63 68 56 61 6c 75 65 06 72 75 6e 0e 63 6f 6e |tchValue.run.con|
00000040: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000050: 0c 20 06 01 a4 01 00 00 00 03 02 03 19 00 ca 03 |. ..............|
00000060: 00 01 cc 03 01 01 08 ec 08 c2 00 e3 c2 01 e4 29 |...............)|
00000070: e0 f0 43 81 00 00 00 c2 02 24 01 00 0e 06 2f c8 |..C......$..../.|
00000080: 03 0c 00 00 00 0a 10 00 07 06 07 04 25 0a 00 0c |............%...|
00000090: 43 06 01 ca 03 00 00 00 01 00 00 03 00 bf 2a 28 |C.............*(|
000000a0: c8 03 04 00 00 0d 08 00 0c 43 06 01 cc 03 00 00 |.........C......|
000000b0: 00 04 00 00 20 00 39 e7 00 00 00 43 e8 00 00 00 |.... .9....C....|
000000c0: 04 42 00 00 00 39 42 00 00 00 24 02 00 0e 39 42 |.B...9B...$...9B|
000000d0: 00 00 00 b8 9f 28 c8 03 10 03 00 04 08 1b 0e 34 |.....(.........4|
000000e0: 1c 1b 13 17 07 20 0c 07 19 00 0c 02 06 01 00 01 |..... ..........|
000000f0: 00 01 04 00 00 18 01 d8 01 00 01 00 39 e7 00 00 |............9...|
00000100: 00 43 e8 00 00 00 04 6c 00 00 00 39 6c 00 00 00 |.C.....l...9l...|
00000110: 24 02 00 28 c8 03 0a 08 0b 02 14 1b 0e 34 1a 1b |$..(.........4..|
00000120: 11 00                                           |..|
```

### WASM
```
00000000: 05 05 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 79 6e 63 2d 61 77 61 69 74 2e 6a 73 14 66 65 |sync-await.js.fe|
00000030: 74 63 68 56 61 6c 75 65 06 72 75 6e 0e 63 6f 6e |tchValue.run.con|
00000040: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000050: 0c 20 06 01 a4 01 00 00 00 03 02 03 19 00 ca 03 |. ..............|
00000060: 00 01 cc 03 01 01 08 ec 08 c2 00 e3 c2 01 e4 29 |...............)|
00000070: e0 f0 43 81 00 00 00 c2 02 24 01 00 0e 06 2f c8 |..C......$..../.|
00000080: 03 0c 00 00 00 0a 10 00 07 06 07 04 25 0a 00 0c |............%...|
00000090: 62 06 01 ca 03 00 00 00 01 00 00 03 00 bf 2a 2f |b.............*/|
000000a0: c8 03 04 00 00 0d 08 00 0c 62 06 01 cc 03 00 01 |.........b......|
000000b0: 00 04 01 00 23 01 84 01 01 00 30 ca 03 00 00 63 |....#.....0....c|
000000c0: 00 00 df f0 8d cb 39 e7 00 00 00 43 e8 00 00 00 |......9....C....|
000000d0: 04 42 00 00 00 64 00 00 24 02 00 0e 64 00 00 b8 |.B...d..$...d...|
000000e0: 9f 2f c8 03 14 03 00 12 30 07 14 12 3b 1b 0e 34 |./......0...;..4|
000000f0: 1c 11 13 17 07 16 0c 07 19 00 0c 02 06 01 00 01 |................|
00000100: 00 01 04 00 00 13 01 d8 01 00 01 00 39 e7 00 00 |............9...|
00000110: 00 43 e8 00 00 00 04 6c 00 00 00 d3 25 02 00 c8 |.C.....l....%...|
00000120: 03 0a 08 0b 02 14 1b 0e 34 1a 07 11 00          |........4....|
```