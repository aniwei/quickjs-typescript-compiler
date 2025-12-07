# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-methods.ts
**生成时间**: 2025-12-07T12:00:30.267Z

## 大小对比

- TypeScript编译器: 335 字节
- WASM编译器: 374 字节
- 差异: -39 字节 (-10.43%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Calculator",
      "offset": 67
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 78
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 85
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 89
    },
    {
      "index": 6,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "<home_object>",
      "offset": 91
    }
  ],
  "functionHeader": {
    "offset": 105,
    "tag": "0xd",
    "remaining": 230
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Calculator",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 303
  }
}
```

## 字节级差异

共发现 307 个字节差异:

- 偏移量 0x1: TS=0x07 vs WASM=0x05
- 偏移量 0x2f: TS=0x26 vs WASM=0x14
- 偏移量 0x30: TS=0x3c vs WASM=0x43
- 偏移量 0x31: TS=0x63 vs WASM=0x61
- 偏移量 0x33: TS=0x61 vs WASM=0x63
- 偏移量 0x34: TS=0x73 vs WASM=0x75
- 偏移量 0x35: TS=0x73 vs WASM=0x6c
- 偏移量 0x36: TS=0x5f vs WASM=0x61
- 偏移量 0x37: TS=0x66 vs WASM=0x74
- 偏移量 0x38: TS=0x69 vs WASM=0x6f
- 偏移量 0x39: TS=0x65 vs WASM=0x72
- 偏移量 0x3a: TS=0x6c vs WASM=0x0c
- 偏移量 0x3b: TS=0x64 vs WASM=0x63
- 偏移量 0x3c: TS=0x73 vs WASM=0x72
- 偏移量 0x3d: TS=0x5f vs WASM=0x65
- 偏移量 0x3e: TS=0x69 vs WASM=0x61
- 偏移量 0x3f: TS=0x6e vs WASM=0x74
- 偏移量 0x40: TS=0x69 vs WASM=0x65
- 偏移量 0x41: TS=0x74 vs WASM=0x06
- 偏移量 0x42: TS=0x3e vs WASM=0x76
- ... (显示前20个差异，总共307个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e 6a 73 26 |lass-methods.js&|
00000030: 3c 63 6c 61 73 73 5f 66 69 65 6c 64 73 5f 69 6e |<class_fields_in|
00000040: 69 74 3e 14 43 61 6c 63 75 6c 61 74 6f 72 0c 63 |it>.Calculator.c|
00000050: 72 65 61 74 65 06 76 61 6c 02 6e 1a 3c 68 6f 6d |reate.val.n.<hom|
00000060: 65 5f 6f 62 6a 65 63 74 3e 0d c8 03 00 00 00 00 |e_object>.......|
00000070: 00 0c 20 06 01 a4 01 00 00 00 03 02 03 2f 00 cc |.. ........../..|
00000080: 03 00 0d ca 03 00 0d 08 ec 02 29 63 ff ff 06 63 |..........)c...c|
00000090: 00 00 c2 00 58 e6 00 00 00 00 c2 01 56 6a 00 00 |....X.......Vj..|
000000a0: 00 00 1b c2 02 56 e7 00 00 00 00 1b cb 6b 00 00 |.....V.......k..|
000000b0: 5c ff ff e3 06 2f c8 03 02 00 00 00 0c 03 04 01 |\..../..........|
000000c0: cc 03 01 01 01 02 01 00 1a 02 d0 03 00 01 00 10 |................|
000000d0: 00 00 10 ca 03 01 0c 08 cb 2b 68 00 00 11 ec 07 |.........+h.....|
000000e0: c7 1b 24 00 00 0e 0e d3 11 1b 44 42 00 00 00 0e |..$.......DB....|
000000f0: 29 c8 03 04 00 00 55 2a 00 0c 00 00 00 d4 01 01 |).....U*........|
00000100: 02 01 02 00 00 18 03 d2 03 00 01 00 10 00 00 10 |................|
00000110: d4 03 00 00 00 0c 04 cc 08 cb 43 42 00 00 00 d3 |..........CB....|
00000120: 9f 44 42 00 00 00 0e 42 42 00 00 00 28 0c 00 00 |.DB....BB...(...|
00000130: 00 ce 03 01 02 01 01 00 00 06 03 d0 03 00 01 00 |................|
00000140: 10 00 00 10 d4 03 00 00 00 0c 04 cc 08 cb 28    |..............(|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e 6a 73 14 |lass-methods.js.|
00000030: 43 61 6c 63 75 6c 61 74 6f 72 0c 63 72 65 61 74 |Calculator.creat|
00000040: 65 06 76 61 6c 02 6e 0d c8 03 00 00 00 00 00 0c |e.val.n.........|
00000050: 20 06 01 a4 01 00 02 00 03 01 04 34 02 ca 03 02 | ..........4....|
00000060: 00 70 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.p....p.......)c|
00000070: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 c2 01 |...c....X.......|
00000080: 56 6a 00 00 00 00 1b c2 02 56 e6 00 00 00 00 1b |Vj.......V......|
00000090: c2 03 52 cc 0e cf 6b 01 00 6b 00 00 e3 06 2f c8 |..R...k..k..../.|
000000a0: 03 02 00 00 00 0c 42 07 01 00 01 01 01 02 01 00 |......B.........|
000000b0: 17 02 ce 03 00 01 00 10 00 01 00 f0 01 01 0d 08 |................|
000000c0: cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 0e c7 d3 |.+h.......$.....|
000000d0: 44 42 00 00 00 29 c8 03 06 02 04 4e 08 07 1a 00 |DB...).....N....|
000000e0: 0c 42 07 01 00 01 01 01 03 00 00 16 02 d0 03 00 |.B..............|
000000f0: 01 00 10 00 01 00 08 cb c7 43 42 00 00 00 d3 9f |.........CB.....|
00000100: 44 42 00 00 00 c7 42 42 00 00 00 28 c8 03 0e 05 |DB....BB...(....|
00000110: 04 0d 08 07 08 1b 14 07 05 26 00 1b 15 00 0c 42 |.........&.....B|
00000120: 07 01 00 01 00 01 03 01 00 09 01 ce 03 00 01 00 |................|
00000130: ca 03 00 0d 68 00 00 11 d3 21 01 00 28 c8 03 0a |....h....!..(...|
00000140: 09 0b 03 10 16 16 07 01 11 29 00 0c 48 05 01 00 |.........)..H...|
00000150: 00 02 00 02 00 00 0f 02 10 00 01 00 ea 01 00 01 |................|
00000160: 00 0c 04 cc 08 cb ee 01 c7 06 4e 42 00 00 00 29 |..........NB...)|
00000170: c8 03 02 00 00 00                               |......|
```