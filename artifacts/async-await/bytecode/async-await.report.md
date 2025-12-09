# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/async-await.ts
**生成时间**: 2025-12-09T14:28:02.588Z

## 大小对比

- TypeScript编译器: 281 字节
- WASM编译器: 301 字节
- 差异: -20 字节 (-6.64%)

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
    "remaining": 209
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

共发现 147 个字节差异:

- 偏移量 0x81: TS=0x06 vs WASM=0x0c
- 偏移量 0x88: TS=0x00 vs WASM=0x07
- 偏移量 0x89: TS=0x0c vs WASM=0x06
- 偏移量 0x8a: TS=0x43 vs WASM=0x07
- 偏移量 0x8b: TS=0x06 vs WASM=0x04
- 偏移量 0x8c: TS=0x01 vs WASM=0x25
- 偏移量 0x8d: TS=0xca vs WASM=0x0a
- 偏移量 0x8e: TS=0x03 vs WASM=0x00
- 偏移量 0x8f: TS=0x00 vs WASM=0x0c
- 偏移量 0x90: TS=0x00 vs WASM=0x62
- 偏移量 0x91: TS=0x00 vs WASM=0x06
- 偏移量 0x93: TS=0x00 vs WASM=0xca
- 偏移量 0x94: TS=0x00 vs WASM=0x03
- 偏移量 0x95: TS=0x03 vs WASM=0x00
- 偏移量 0x97: TS=0xbf vs WASM=0x00
- 偏移量 0x98: TS=0x2a vs WASM=0x01
- 偏移量 0x99: TS=0x28 vs WASM=0x00
- 偏移量 0x9a: TS=0xc8 vs WASM=0x00
- 偏移量 0x9c: TS=0x04 vs WASM=0x00
- 偏移量 0x9d: TS=0x00 vs WASM=0xbf
- ... (显示前20个差异，总共147个)

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
00000080: 03 06 00 00 00 0a 10 00 00 0c 43 06 01 ca 03 00 |..........C.....|
00000090: 00 00 01 00 00 03 00 bf 2a 28 c8 03 04 00 00 0d |........*(......|
000000a0: 08 00 0c 43 06 01 cc 03 00 01 00 03 00 00 20 01 |...C.......... .|
000000b0: 84 01 01 00 30 63 00 00 cb 39 e7 00 00 00 43 e8 |....0c...9....C.|
000000c0: 00 00 00 04 42 00 00 00 64 00 00 24 02 00 0e 64 |....B...d..$...d|
000000d0: 00 00 b8 9f 28 c8 03 0c 03 00 18 08 4d 2a 26 1b |....(.......M*&.|
000000e0: 16 0c 07 19 00 0c 02 06 01 00 01 00 01 04 00 00 |................|
000000f0: 18 01 d8 01 00 01 00 39 e7 00 00 00 43 e8 00 00 |.......9....C...|
00000100: 00 04 6c 00 00 00 39 6c 00 00 00 24 02 00 28 c8 |..l...9l...$..(.|
00000110: 03 06 08 0b 02 14 4d 28 00                      |......M(.|
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