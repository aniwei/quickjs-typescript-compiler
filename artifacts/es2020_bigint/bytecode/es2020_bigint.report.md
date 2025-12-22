# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/es2020_bigint.ts
**生成时间**: 2025-12-22T02:37:15.764Z

## 大小对比

- TypeScript编译器: 293 字节
- WASM编译器: 309 字节
- 差异: -16 字节 (-5.18%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 7,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 233
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 7,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 249
  }
}
```

## 字节级差异

共发现 32 个字节差异:

- 偏移量 0x107: TS=0x1c vs WASM=0x2c
- 偏移量 0x10b: TS=0x7b vs WASM=0x50
- 偏移量 0x10c: TS=0x0a vs WASM=0x04
- 偏移量 0x10d: TS=0x00 vs WASM=0x14
- 偏移量 0x10f: TS=0x0e vs WASM=0x08
- 偏移量 0x111: TS=0x0a vs WASM=0x03
- 偏移量 0x112: TS=0x1b vs WASM=0x21
- 偏移量 0x113: TS=0x01 vs WASM=0x03
- 偏移量 0x114: TS=0x17 vs WASM=0x1b
- 偏移量 0x115: TS=0x15 vs WASM=0x08
- 偏移量 0x117: TS=0x0e vs WASM=0x03
- 偏移量 0x118: TS=0x1b vs WASM=0x21
- 偏移量 0x119: TS=0x0a vs WASM=0x01
- 偏移量 0x11c: TS=0x17 vs WASM=0x21
- 偏移量 0x11d: TS=0x15 vs WASM=0x13
- 偏移量 0x124: TS=0x00 vs WASM=0x17
- 偏移量 0x125: TS=EOF vs WASM=0x15
- 偏移量 0x126: TS=EOF vs WASM=0x1b
- 偏移量 0x127: TS=EOF vs WASM=0x0e
- 偏移量 0x128: TS=EOF vs WASM=0x1b
- ... (显示前20个差异，总共32个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 02 61 02 62 02 63 02 64 02 65 0e 63 6f 6e |...a.b.c.d.e.con|
00000010: 73 6f 6c 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 |sole.logF__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 65 73 32 30 |__/fixtures/es20|
00000030: 32 30 5f 62 69 67 69 6e 74 2e 6a 73 0c 00 06 00 |20_bigint.js....|
00000040: a4 01 00 01 00 03 00 00 b5 01 01 a6 01 00 00 00 |................|
00000050: 40 e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 |@.....@.....@...|
00000060: 00 80 40 e7 00 00 00 80 40 e8 00 00 00 80 3f e4 |..@.....@.....?.|
00000070: 00 00 00 80 3f e5 00 00 00 80 3f e6 00 00 00 80 |....?.....?.....|
00000080: 3f e7 00 00 00 80 3f e8 00 00 00 80 b4 0a 00 00 |?.....?.........|
00000090: 00 3b e4 00 00 00 b4 14 00 00 00 3b e5 00 00 00 |.;.........;....|
000000a0: 39 e4 00 00 00 39 e5 00 00 00 9f 3b e6 00 00 00 |9....9.....;....|
000000b0: 39 e4 00 00 00 39 e5 00 00 00 9c 3b e7 00 00 00 |9....9.....;....|
000000c0: 39 e4 00 00 00 8e 3b e8 00 00 00 39 e9 00 00 00 |9.....;....9....|
000000d0: 43 ea 00 00 00 39 e6 00 00 00 24 01 00 cb 39 e9 |C....9....$...9.|
000000e0: 00 00 00 43 ea 00 00 00 39 e7 00 00 00 24 01 00 |...C....9....$..|
000000f0: cb 39 e9 00 00 00 43 ea 00 00 00 39 e8 00 00 00 |.9....C....9....|
00000100: 24 01 00 cf 28 d6 03 1c 00 00 00 7b 0a 00 1b 0e |$...(......{....|
00000110: 1b 0a 1b 01 17 15 1b 0e 1b 0a 1b 01 17 15 1b 0e |................|
00000120: 1b 0a 1b 01 00                                  |.....|
```

### WASM
```
00000000: 05 08 02 61 02 62 02 63 02 64 02 65 0e 63 6f 6e |...a.b.c.d.e.con|
00000010: 73 6f 6c 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 |sole.logF__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 65 73 32 30 |__/fixtures/es20|
00000030: 32 30 5f 62 69 67 69 6e 74 2e 6a 73 0c 00 06 00 |20_bigint.js....|
00000040: a4 01 00 01 00 03 00 00 b5 01 01 a6 01 00 00 00 |................|
00000050: 40 e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 |@.....@.....@...|
00000060: 00 80 40 e7 00 00 00 80 40 e8 00 00 00 80 3f e4 |..@.....@.....?.|
00000070: 00 00 00 80 3f e5 00 00 00 80 3f e6 00 00 00 80 |....?.....?.....|
00000080: 3f e7 00 00 00 80 3f e8 00 00 00 80 b4 0a 00 00 |?.....?.........|
00000090: 00 3b e4 00 00 00 b4 14 00 00 00 3b e5 00 00 00 |.;.........;....|
000000a0: 39 e4 00 00 00 39 e5 00 00 00 9f 3b e6 00 00 00 |9....9.....;....|
000000b0: 39 e4 00 00 00 39 e5 00 00 00 9c 3b e7 00 00 00 |9....9.....;....|
000000c0: 39 e4 00 00 00 8e 3b e8 00 00 00 39 e9 00 00 00 |9.....;....9....|
000000d0: 43 ea 00 00 00 39 e6 00 00 00 24 01 00 cb 39 e9 |C....9....$...9.|
000000e0: 00 00 00 43 ea 00 00 00 39 e7 00 00 00 24 01 00 |...C....9....$..|
000000f0: cb 39 e9 00 00 00 43 ea 00 00 00 39 e8 00 00 00 |.9....C....9....|
00000100: 24 01 00 cf 28 d6 03 2c 00 00 00 50 04 14 1b 08 |$...(..,...P....|
00000110: 1b 03 21 03 1b 08 1b 03 21 01 1b 01 21 13 1b 0e |..!.....!...!...|
00000120: 1b 0a 1b 01 17 15 1b 0e 1b 0a 1b 01 17 15 1b 0e |................|
00000130: 1b 0a 1b 01 00                                  |.....|
```