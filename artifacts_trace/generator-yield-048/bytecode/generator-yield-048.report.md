# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/generator-yield-048.ts
**生成时间**: 2025-12-25T03:14:00.870Z

## 大小对比

- TypeScript编译器: 252 字节
- WASM编译器: 329 字节
- 差异: -77 字节 (-23.40%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "g48",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/generator-yield-048.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 188
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "g48",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/generator-yield-048.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 265
  }
}
```

## 字节级差异

共发现 99 个字节差异:

- 偏移量 0xd4: TS=0x03 vs WASM=0x06
- 偏移量 0xd7: TS=0x15 vs WASM=0x60
- 偏移量 0xe7: TS=0x8b vs WASM=0x7f
- 偏移量 0xe9: TS=0xbf vs WASM=0x06
- 偏移量 0xea: TS=0x30 vs WASM=0x06
- 偏移量 0xeb: TS=0xb8 vs WASM=0x87
- 偏移量 0xec: TS=0x9f vs WASM=0x84
- 偏移量 0xed: TS=0x2f vs WASM=0x43
- 偏移量 0xee: TS=0xd2 vs WASM=0x6b
- 偏移量 0xef: TS=0x03 vs WASM=0x00
- 偏移量 0xf0: TS=0x0a vs WASM=0x00
- 偏移量 0xf1: TS=0x01 vs WASM=0x00
- 偏移量 0xf2: TS=0x00 vs WASM=0xed
- 偏移量 0xf3: TS=0x08 vs WASM=0x38
- 偏移量 0xf4: TS=0x08 vs WASM=0x8b
- 偏移量 0xf5: TS=0x26 vs WASM=0x11
- 偏移量 0xf6: TS=0x00 vs WASM=0xed
- 偏移量 0xf7: TS=0x3a vs WASM=0x04
- 偏移量 0xf8: TS=0x14 vs WASM=0x0e
- 偏移量 0xf9: TS=0x07 vs WASM=0xee
- ... (显示前20个差异，总共99个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 02 76 06 67 34 38 02 74 0e 63 6f 6e 73 6f |...v.g48.t.conso|
00000010: 6c 65 06 6c 6f 67 52 5f 5f 74 65 73 74 73 5f 5f |le.logR__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 67 65 6e 65 72 61 |/fixtures/genera|
00000030: 74 6f 72 2d 79 69 65 6c 64 2d 30 34 38 2e 6a 73 |tor-yield-048.js|
00000040: 0c 00 06 00 a4 01 00 02 00 05 00 01 59 02 a6 01 |............Y...|
00000050: 00 00 00 c8 03 02 00 30 40 e5 00 00 00 40 40 e6 |.......0@....@@.|
00000060: 00 00 00 80 c2 00 41 e5 00 00 00 00 3f e6 00 00 |......A.....?...|
00000070: 00 82 b7 3b e6 00 00 00 06 cb 63 01 00 39 e5 00 |...;......c..9..|
00000080: 00 00 f0 7f ee 12 cc 39 e6 00 00 00 64 01 00 9f |.......9....d...|
00000090: 11 3a e6 00 00 00 cb 82 00 ec ec 0e 86 39 e7 00 |.:...........9..|
000000a0: 00 00 43 e8 00 00 00 39 e6 00 00 00 24 01 00 cf |..C....9....$...|
000000b0: 28 d2 03 16 00 00 00 25 0e 20 1b 06 1c 1d 1b 0a |(......%. ......|
000000c0: 11 05 49 0b 1b 0e 1b 0a 1b 01 00 0c 52 06 00 ca |..I.........R...|
000000d0: 03 00 00 00 03 00 00 15 00 89 bf 30 8a ec 02 2f |...........0.../|
000000e0: 0e b8 b9 ba 26 03 00 8b 0e bf 30 b8 9f 2f d2 03 |....&.....0../..|
000000f0: 0a 01 00 08 08 26 00 3a 14 07 13 00             |.....&.:....|
```

### WASM
```
00000000: 05 06 02 76 06 67 34 38 02 74 0e 63 6f 6e 73 6f |...v.g48.t.conso|
00000010: 6c 65 06 6c 6f 67 52 5f 5f 74 65 73 74 73 5f 5f |le.logR__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 67 65 6e 65 72 61 |/fixtures/genera|
00000030: 74 6f 72 2d 79 69 65 6c 64 2d 30 34 38 2e 6a 73 |tor-yield-048.js|
00000040: 0c 00 06 00 a4 01 00 02 00 05 00 01 59 02 a6 01 |............Y...|
00000050: 00 00 00 c8 03 02 00 30 40 e5 00 00 00 40 40 e6 |.......0@....@@.|
00000060: 00 00 00 80 c2 00 41 e5 00 00 00 00 3f e6 00 00 |......A.....?...|
00000070: 00 82 b7 3b e6 00 00 00 06 cb 63 01 00 39 e5 00 |...;......c..9..|
00000080: 00 00 f0 7f ee 12 cc 39 e6 00 00 00 64 01 00 9f |.......9....d...|
00000090: 11 3a e6 00 00 00 cb 82 00 ec ec 0e 86 39 e7 00 |.:...........9..|
000000a0: 00 00 43 e8 00 00 00 39 e6 00 00 00 24 01 00 cf |..C....9....$...|
000000b0: 28 d2 03 16 00 00 00 25 0e 20 1b 06 1c 1d 1b 0a |(......%. ......|
000000c0: 11 05 49 0b 1b 0e 1b 0a 1b 01 00 0c 52 06 00 ca |..I.........R...|
000000d0: 03 00 00 00 06 00 00 60 00 89 bf 30 8a ec 02 2f |.......`...0.../|
000000e0: 0e b8 b9 ba 26 03 00 7f 0e 06 06 87 84 43 6b 00 |....&........Ck.|
000000f0: 00 00 ed 38 8b 11 ed 04 0e ee f1 b9 ad ed 16 88 |...8............|
00000100: 00 ed 0e 84 43 6b 00 00 00 ec ea 42 42 00 00 00 |....Ck.....BB...|
00000110: 0f 0f 0f 2f 88 01 ed 0b 84 43 6b 00 00 00 ec d5 |.../.....Ck.....|
00000120: ee 0a 88 02 0e 31 00 00 00 00 04 42 42 00 00 00 |.....1.....BB...|
00000130: 0f 0f 0f 0e bf 30 b8 9f 2f d2 03 0c 01 00 08 08 |.....0../.......|
00000140: 26 00 00 56 02 14 07 13 00                      |&..V.....|
```