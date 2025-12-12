# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-nested.ts
**生成时间**: 2025-12-12T09:59:18.556Z

## 大小对比

- TypeScript编译器: 287 字节
- WASM编译器: 270 字节
- 差异: 17 字节 (6.30%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-nested.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 236
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "id",
      "offset": 43
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Alice",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bob",
      "offset": 52
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "users",
      "offset": 56
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "page",
      "offset": 62
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 67
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 73
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 185
  }
}
```

## 字节级差异

共发现 241 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x0a
- 偏移量 0x2: TS=0x0c vs WASM=0x46
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x46 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x6f
- 偏移量 0x17: TS=0x5f vs WASM=0x62
- ... (显示前20个差异，总共241个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 46 |...<eval>._ret_F|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 6f 62 6a 65 63 74 2d 6e 65 73 74 65 64 |es/object-nested|
00000030: 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 04 00 |.js.............|
00000040: 00 8a 01 01 01 00 00 00 00 00 00 40 e6 00 00 00 |...........@....|
00000050: 01 b6 01 00 0b 0b cb 4e e7 00 00 00 04 e8 00 00 |.......N........|
00000060: 00 4e 38 00 00 00 0b cc 4e e7 00 00 00 04 e9 00 |.N8.....N.......|
00000070: 00 00 4e 38 00 00 00 26 02 00 4e ea 00 00 00 0b |..N8...&..N.....|
00000080: cb 4e eb 00 00 00 d2 64 4e ec 00 00 00 4e 7d 00 |.N.....dN....N}.|
00000090: 00 00 3b e6 00 00 00 39 ed 00 00 00 43 ee 00 00 |..;....9....C...|
000000a0: 00 39 e6 00 00 00 42 ea 00 00 00 ca 48 42 38 00 |.9....B.....HB8.|
000000b0: 00 00 24 01 00 de 39 ed 00 00 00 43 ee 00 00 00 |..$...9....C....|
000000c0: 39 e6 00 00 00 42 7d 00 00 00 42 ec 00 00 00 24 |9....B}...B....$|
000000d0: 01 00 de da 28 02 00 00 00 44 00 00 11 1a 09 09 |....(....D......|
000000e0: 07 0c 07 07 1b 1a 1b 0b 1c 11 07 0c 07 07 1b 1a |................|
000000f0: 1b 0b 00 05 03 0b 11 0d 00 05 08 0c 08 08 07 0b |................|
00000100: 1c 0e 0c 0d 00 05 03 07 00 05 09 04 00 07 14 0b |................|
00000110: 3e 18 3e 16 07 15 20 17 3a 00 3e 18 57 17 00    |>.>... .:.>.W..|
```

### WASM
```
00000000: 05 0a 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..F__tests__/fix|
00000010: 74 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6e 65 73 |tures/object-nes|
00000020: 74 65 64 2e 6a 73 08 64 61 74 61 04 69 64 0a 41 |ted.js.data.id.A|
00000030: 6c 69 63 65 06 42 6f 62 0a 75 73 65 72 73 08 70 |lice.Bob.users.p|
00000040: 61 67 65 0a 74 6f 74 61 6c 0e 63 6f 6e 73 6f 6c |age.total.consol|
00000050: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000060: 01 a4 01 00 00 00 04 01 00 7d 00 ca 03 00 0d 08 |.........}......|
00000070: ec 02 29 0b 0b b8 4e e6 00 00 00 04 e7 00 00 00 |..)...N.........|
00000080: 4e 38 00 00 00 0b b9 4e e6 00 00 00 04 e8 00 00 |N8.....N........|
00000090: 00 4e 38 00 00 00 26 02 00 4e e9 00 00 00 0b b8 |.N8...&..N......|
000000a0: 4e ea 00 00 00 bf 64 4e eb 00 00 00 4e 7d 00 00 |N.....dN....N}..|
000000b0: 00 e3 39 ec 00 00 00 43 ed 00 00 00 68 00 00 42 |..9....C....h..B|
000000c0: e9 00 00 00 b7 48 42 38 00 00 00 24 01 00 0e 39 |.....HB8...$...9|
000000d0: ec 00 00 00 43 ed 00 00 00 68 00 00 42 7d 00 00 |....C....h..B}..|
000000e0: 00 42 eb 00 00 00 24 01 00 0e 06 2f c8 03 1e 00 |.B....$..../....|
000000f0: 00 00 43 14 00 1b 0e 1b 0a 11 08 20 0c 07 06 1b |..C........ ....|
00000100: 1b 17 15 1b 0e 1b 0a 11 08 1b 0a 1b 13 00       |..............|
```