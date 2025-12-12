# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-private-fields.ts
**生成时间**: 2025-12-12T09:59:18.459Z

## 大小对比

- TypeScript编译器: 295 字节
- WASM编译器: 427 字节
- 差异: -132 字节 (-30.91%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 23
    },
    {
      "index": 4,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 30
    },
    {
      "index": 5,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-fields.js",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xc",
    "remaining": 202
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xd",
    "remaining": 343
  }
}
```

## 字节级差异

共发现 393 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x07
- 偏移量 0x2: TS=0x0c vs WASM=0x54
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
- 偏移量 0xf: TS=0x0e vs WASM=0x78
- 偏移量 0x10: TS=0x43 vs WASM=0x74
- 偏移量 0x11: TS=0x6f vs WASM=0x75
- 偏移量 0x12: TS=0x75 vs WASM=0x72
- 偏移量 0x13: TS=0x6e vs WASM=0x65
- 偏移量 0x14: TS=0x74 vs WASM=0x73
- 偏移量 0x15: TS=0x65 vs WASM=0x2f
- ... (显示前20个差异，总共393个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 0e |...<eval>._ret_.|
00000010: 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e 74 26 3c |Counter.#count&<|
00000020: 63 6c 61 73 73 5f 66 69 65 6c 64 73 5f 69 6e 69 |class_fields_ini|
00000030: 74 3e 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |t>T__tests__/fix|
00000040: 74 75 72 65 73 2f 63 6c 61 73 73 2d 70 72 69 76 |tures/class-priv|
00000050: 61 74 65 2d 66 69 65 6c 64 73 2e 6a 73 0c 02 06 |ate-fields.js...|
00000060: 00 00 00 00 00 00 04 00 03 00 04 7c 04 01 00 00 |...........|....|
00000070: 00 00 00 00 02 00 00 00 02 00 30 03 00 00 00 03 |..........0.....|
00000080: 02 30 04 00 00 00 03 03 30 40 e6 00 00 00 00 40 |.0......0@.....@|
00000090: e9 00 00 00 01 b6 01 00 b6 02 00 06 b6 03 00 d4 |................|
000000a0: 02 58 e6 00 00 00 00 05 e7 00 00 00 e0 d5 00 52 |.X.............R|
000000b0: 56 e8 00 00 00 00 d5 01 52 56 42 00 00 00 01 d5 |V.......RVB.....|
000000c0: 03 e1 0e e3 b7 03 00 b7 02 00 3b e6 00 00 00 39 |..........;....9|
000000d0: e6 00 00 00 11 21 00 00 3b e9 00 00 00 39 e9 00 |.....!..;....9..|
000000e0: 00 00 43 e8 00 00 00 24 00 00 de 39 ea 00 00 00 |..C....$...9....|
000000f0: 43 eb 00 00 00 39 e9 00 00 00 42 42 00 00 00 24 |C....9....BB...$|
00000100: 01 00 de da 28 05 00 00 00 18 00 00 a9 08 41 00 |....(.........A.|
00000110: 00 2e 08 07 02 1c 2a 07 11 07 26 0b 76 00 3e 18 |......*...&.v.>.|
00000120: 3e 17 00 01 01 01 01                            |>......|
```

### WASM
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..T__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6c 61 73 73 2d 70 72 69 76 |tures/class-priv|
00000020: 61 74 65 2d 66 69 65 6c 64 73 2e 6a 73 0e 43 6f |ate-fields.js.Co|
00000030: 75 6e 74 65 72 0c 23 63 6f 75 6e 74 02 63 12 69 |unter.#count.c.i|
00000040: 6e 63 72 65 6d 65 6e 74 0e 63 6f 6e 73 6f 6c 65 |ncrement.console|
00000050: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000060: a4 01 00 03 00 03 02 04 65 03 ca 03 02 00 30 cc |........e.....0.|
00000070: 03 03 01 75 f0 01 03 02 70 ca 03 00 09 ce 03 01 |...u....p.......|
00000080: 0d 08 ec 02 29 63 00 00 06 63 02 00 63 01 00 c1 |....)c...c..c...|
00000090: 02 58 e5 00 00 00 00 05 e6 00 00 00 cc c2 00 56 |.X.............V|
000000a0: e8 00 00 00 00 c2 01 56 42 00 00 00 01 c2 03 52 |.......VB......R|
000000b0: cd 0e cf 6b 02 00 6b 01 00 e3 68 00 00 11 21 00 |...k..k...h...!.|
000000c0: 00 e4 68 01 00 43 e8 00 00 00 24 00 00 0e 39 e9 |..h..C....$...9.|
000000d0: 00 00 00 43 ea 00 00 00 68 01 00 42 42 00 00 00 |...C....h..BB...|
000000e0: 24 01 00 0e 06 2f c8 03 18 00 00 00 39 12 1c 16 |$..../......9...|
000000f0: 0e 17 29 11 02 1b 14 17 15 1b 0e 1b 0a 11 02 1b |..).............|
00000100: 03 00 0c 42 07 01 00 00 01 00 04 01 00 0b 01 10 |...B............|
00000110: 00 01 00 cc 03 01 0d 08 cb c7 11 df 45 93 18 df |............E...|
00000120: 46 29 c8 03 08 02 04 0d 08 07 08 11 0e 00 0c 42 |F).............B|
00000130: 07 01 00 00 01 00 02 01 00 06 01 10 00 01 00 cc |................|
00000140: 03 01 0d 08 cb c7 df 45 28 c8 03 06 05 04 12 1e |.......E(.......|
00000150: 0c 15 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 |....@...........|
00000160: 10 00 01 00 f0 01 02 0d 08 cb 2b 68 00 00 11 ec |..........+h....|
00000170: 06 c7 1b 24 00 00 29 c8 03 02 08 00 00 0c 48 05 |...$..).......H.|
00000180: 01 00 00 02 00 03 01 00 0e 02 10 00 01 00 ea 01 |................|
00000190: 00 01 00 cc 03 01 5d 0c 04 cc 08 cb ee 01 c7 68 |......]........h|
000001a0: 00 00 b7 47 29 c8 03 02 00 00 00                |...G)......|
```