# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-private-fields.ts
**生成时间**: 2025-12-09T14:28:02.636Z

## 大小对比

- TypeScript编译器: 401 字节
- WASM编译器: 436 字节
- 差异: -35 字节 (-8.03%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-private-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 308
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-private-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 343
  }
}
```

## 字节级差异

共发现 280 个字节差异:

- 偏移量 0x6e: TS=0x05 vs WASM=0x03
- 偏移量 0x71: TS=0x5f vs WASM=0x65
- 偏移量 0x78: TS=0xf0 vs WASM=0xcc
- 偏移量 0x79: TS=0x01 vs WASM=0x03
- 偏移量 0x7b: TS=0x02 vs WASM=0x01
- 偏移量 0x7c: TS=0x30 vs WASM=0x75
- 偏移量 0x7d: TS=0xcc vs WASM=0xf0
- 偏移量 0x7e: TS=0x03 vs WASM=0x01
- 偏移量 0x7f: TS=0x00 vs WASM=0x03
- 偏移量 0x80: TS=0x00 vs WASM=0x02
- 偏移量 0x82: TS=0xce vs WASM=0xca
- 偏移量 0x85: TS=0x0d vs WASM=0x09
- 偏移量 0x86: TS=0xca vs WASM=0xce
- 偏移量 0x89: TS=0x09 vs WASM=0x0d
- 偏移量 0x8f: TS=0x01 vs WASM=0x00
- 偏移量 0x95: TS=0xc1 vs WASM=0x63
- 偏移量 0x96: TS=0x00 vs WASM=0x01
- 偏移量 0x97: TS=0x58 vs WASM=0x00
- 偏移量 0x98: TS=0xe5 vs WASM=0xc1
- 偏移量 0x99: TS=0x00 vs WASM=0x02
- ... (显示前20个差异，总共280个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 70 72 69 76 61 74 65 2d 66 69 65 |lass-private-fie|
00000030: 6c 64 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 0c 23 |lds.js.Counter.#|
00000040: 63 6f 75 6e 74 02 63 12 69 6e 63 72 65 6d 65 6e |count.c.incremen|
00000050: 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |t.console.log...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 03 00 05 02 |...... .........|
00000070: 04 5f 03 ca 03 02 00 30 f0 01 03 02 30 cc 03 00 |._.....0....0...|
00000080: 00 70 ce 03 00 0d ca 03 01 09 08 ec 02 29 63 01 |.p...........)c.|
00000090: 00 06 63 02 00 c1 00 58 e5 00 00 00 00 05 e6 00 |..c....X........|
000000a0: 00 00 ce c2 01 56 e8 00 00 00 00 c2 02 56 42 00 |.....V.......VB.|
000000b0: 00 00 01 c2 03 52 cd 0e d0 6b 02 00 e4 68 01 00 |.....R...k...h..|
000000c0: 11 21 00 00 e3 68 00 00 43 e8 00 00 00 24 00 00 |.!...h..C....$..|
000000d0: 0e 39 e9 00 00 00 43 ea 00 00 00 68 00 00 42 42 |.9....C....h..BB|
000000e0: 00 00 00 24 01 00 0e 06 2f c8 03 0e 00 00 00 33 |...$..../......3|
000000f0: 12 1c 2b 1b 3f 00 34 18 11 02 00 0c 42 07 01 00 |..+.?.4.....B...|
00000100: 00 01 00 03 03 00 16 01 10 00 00 00 f0 01 02 0d |................|
00000110: ce 03 03 0d ce 03 01 0d 08 cb 2b 68 00 00 11 ec |..........+h....|
00000120: 06 c7 1b 24 00 00 0e c7 68 02 00 b7 47 29 c8 03 |...$....h...G)..|
00000130: 02 00 00 00 0c 00 00 00 d0 03 00 02 00 01 00 00 |................|
00000140: 07 02 10 00 00 10 ea 01 00 01 00 0c 04 cc 08 cb |................|
00000150: 0e 29 0c 00 00 00 84 01 00 02 00 01 00 00 0c 02 |.)..............|
00000160: 10 00 00 10 ea 01 00 01 00 0c 04 cc 08 cb 08 42 |...............B|
00000170: e6 00 00 00 28 0c 00 00 00 00 00 02 00 01 00 00 |....(...........|
00000180: 06 02 10 00 00 10 ea 01 00 01 00 0c 04 cc 08 cb |................|
00000190: 29                                              |)|
```

### WASM
```
00000000: 05 07 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 70 72 69 76 61 74 65 2d 66 69 65 |lass-private-fie|
00000030: 6c 64 73 2e 6a 73 0e 43 6f 75 6e 74 65 72 0c 23 |lds.js.Counter.#|
00000040: 63 6f 75 6e 74 02 63 12 69 6e 63 72 65 6d 65 6e |count.c.incremen|
00000050: 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |t.console.log...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 03 00 03 02 |...... .........|
00000070: 04 65 03 ca 03 02 00 30 cc 03 03 01 75 f0 01 03 |.e.....0....u...|
00000080: 02 70 ca 03 00 09 ce 03 01 0d 08 ec 02 29 63 00 |.p...........)c.|
00000090: 00 06 63 02 00 63 01 00 c1 02 58 e5 00 00 00 00 |..c..c....X.....|
000000a0: 05 e6 00 00 00 cc c2 00 56 e8 00 00 00 00 c2 01 |........V.......|
000000b0: 56 42 00 00 00 01 c2 03 52 cd 0e cf 6b 02 00 6b |VB......R...k..k|
000000c0: 01 00 e3 68 00 00 11 21 00 00 e4 68 01 00 43 e8 |...h...!...h..C.|
000000d0: 00 00 00 24 00 00 0e 39 e9 00 00 00 43 ea 00 00 |...$...9....C...|
000000e0: 00 68 01 00 42 42 00 00 00 24 01 00 0e 06 2f c8 |.h..BB...$..../.|
000000f0: 03 18 00 00 00 39 12 1c 16 0e 17 29 11 02 1b 14 |.....9.....)....|
00000100: 17 15 1b 0e 1b 0a 11 02 1b 03 00 0c 42 07 01 00 |............B...|
00000110: 00 01 00 04 01 00 0b 01 10 00 01 00 cc 03 01 0d |................|
00000120: 08 cb c7 11 df 45 93 18 df 46 29 c8 03 08 02 04 |.....E...F).....|
00000130: 0d 08 07 08 11 0e 00 0c 42 07 01 00 00 01 00 02 |........B.......|
00000140: 01 00 06 01 10 00 01 00 cc 03 01 0d 08 cb c7 df |................|
00000150: 45 28 c8 03 06 05 04 12 1e 0c 15 00 0c 40 05 01 |E(...........@..|
00000160: 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 01 02 |................|
00000170: 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 |...+h.......$..)|
00000180: c8 03 02 08 00 00 0c 48 05 01 00 00 02 00 03 01 |.......H........|
00000190: 00 0e 02 10 00 01 00 ea 01 00 01 00 cc 03 01 5d |...............]|
000001a0: 0c 04 cc 08 cb ee 01 c7 68 00 00 b7 47 29 c8 03 |........h...G)..|
000001b0: 02 00 00 00                                     |....|
```