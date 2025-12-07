# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-private-fields.ts
**生成时间**: 2025-12-07T12:00:30.274Z

## 大小对比

- TypeScript编译器: 408 字节
- WASM编译器: 436 字节
- 差异: -28 字节 (-6.42%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
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
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 74
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 81
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 89
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 91
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 101
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 109
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "<home_object>",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 127,
    "tag": "0xd",
    "remaining": 281
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

共发现 341 个字节差异:

- 偏移量 0x1: TS=0x09 vs WASM=0x07
- 偏移量 0x36: TS=0x26 vs WASM=0x0e
- 偏移量 0x37: TS=0x3c vs WASM=0x43
- 偏移量 0x38: TS=0x63 vs WASM=0x6f
- 偏移量 0x39: TS=0x6c vs WASM=0x75
- 偏移量 0x3a: TS=0x61 vs WASM=0x6e
- 偏移量 0x3b: TS=0x73 vs WASM=0x74
- 偏移量 0x3c: TS=0x73 vs WASM=0x65
- 偏移量 0x3d: TS=0x5f vs WASM=0x72
- 偏移量 0x3e: TS=0x66 vs WASM=0x0c
- 偏移量 0x3f: TS=0x69 vs WASM=0x23
- 偏移量 0x40: TS=0x65 vs WASM=0x63
- 偏移量 0x41: TS=0x6c vs WASM=0x6f
- 偏移量 0x42: TS=0x64 vs WASM=0x75
- 偏移量 0x43: TS=0x73 vs WASM=0x6e
- 偏移量 0x44: TS=0x5f vs WASM=0x74
- 偏移量 0x45: TS=0x69 vs WASM=0x02
- 偏移量 0x46: TS=0x6e vs WASM=0x63
- 偏移量 0x47: TS=0x69 vs WASM=0x12
- 偏移量 0x48: TS=0x74 vs WASM=0x69
- ... (显示前20个差异，总共341个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 70 72 69 76 61 74 65 2d 66 69 65 |lass-private-fie|
00000030: 6c 64 73 2e 6a 73 26 3c 63 6c 61 73 73 5f 66 69 |lds.js&<class_fi|
00000040: 65 6c 64 73 5f 69 6e 69 74 3e 0c 23 63 6f 75 6e |elds_init>.#coun|
00000050: 74 0e 43 6f 75 6e 74 65 72 02 63 12 69 6e 63 72 |t.Counter.c.incr|
00000060: 65 6d 65 6e 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |ement.console.lo|
00000070: 67 1a 3c 68 6f 6d 65 5f 6f 62 6a 65 63 74 3e 0d |g.<home_object>.|
00000080: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000090: 03 03 03 56 01 cc 03 00 00 30 ce 03 00 0d ca 03 |...V.....0......|
000000a0: 00 0d d0 03 02 0d 08 ec 02 29 63 ff ff 06 63 00 |.........)c...c.|
000000b0: 00 c2 00 58 e7 00 00 00 00 05 e6 00 00 00 cc c2 |...X............|
000000c0: 01 56 e9 00 00 00 00 c2 02 56 42 00 00 00 01 cb |.V.......VB.....|
000000d0: 6b 00 00 5c ff ff e3 e5 68 02 00 43 e9 00 00 00 |k..\....h..C....|
000000e0: 24 00 00 0e 39 ea 00 00 00 43 eb 00 00 00 68 02 |$...9....C....h.|
000000f0: 00 42 42 00 00 00 24 01 00 0e 06 2f c8 03 14 00 |.BB...$..../....|
00000100: 00 00 32 14 00 11 02 1b 14 17 15 1b 0e 1b 0a 11 |..2.............|
00000110: 02 1b 03 00 0c 03 04 01 ce 03 00 01 00 03 02 00 |................|
00000120: 24 01 10 00 00 10 ca 03 01 0c cc 03 01 0d 08 cb |$...............|
00000130: 2b c7 68 01 00 b7 47 68 00 00 11 ec 07 c7 1b 24 |+.h...Gh.......$|
00000140: 00 00 0e 0e 68 00 00 11 ec 07 c7 1b 24 00 00 0e |....h.......$...|
00000150: 0e 29 c8 03 02 00 00 00 0c 00 00 00 d2 03 00 02 |.)..............|
00000160: 00 01 00 00 07 02 10 00 00 10 d8 03 00 00 00 0c |................|
00000170: 04 cc 08 cb 0e 29 0c 00 00 00 84 01 00 02 00 01 |.....)..........|
00000180: 00 00 0b 02 10 00 00 10 d8 03 00 00 00 0c 04 cc |................|
00000190: 08 cb 42 e6 00 00 00 28                         |..B....(|
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