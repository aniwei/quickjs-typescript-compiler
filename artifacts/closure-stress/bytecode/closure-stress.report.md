# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-stress.ts
**生成时间**: 2025-12-09T14:28:02.664Z

## 大小对比

- TypeScript编译器: 434 字节
- WASM编译器: 452 字节
- 差异: -18 字节 (-3.98%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 13,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-stress.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "stress",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l0",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l1",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l2",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l3",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l4",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 70
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 76
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 79
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 82
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 85
    },
    {
      "index": 12,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xd",
    "remaining": 343
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 13,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-stress.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "stress",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l0",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l1",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l2",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l3",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l4",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 70
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 73
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 76
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 79
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 82
    },
    {
      "index": 12,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 85
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xd",
    "remaining": 361
  }
}
```

## 字节级差异

共发现 318 个字节差异:

- 偏移量 0x46: TS=0x0a vs WASM=0x04
- 偏移量 0x47: TS=0x69 vs WASM=0x76
- 偏移量 0x48: TS=0x6e vs WASM=0x30
- 偏移量 0x49: TS=0x6e vs WASM=0x04
- 偏移量 0x4a: TS=0x65 vs WASM=0x76
- 偏移量 0x4b: TS=0x72 vs WASM=0x31
- 偏移量 0x4e: TS=0x30 vs WASM=0x32
- 偏移量 0x51: TS=0x31 vs WASM=0x33
- 偏移量 0x54: TS=0x32 vs WASM=0x34
- 偏移量 0x55: TS=0x04 vs WASM=0x0a
- 偏移量 0x56: TS=0x76 vs WASM=0x69
- 偏移量 0x57: TS=0x33 vs WASM=0x6e
- 偏移量 0x58: TS=0x04 vs WASM=0x6e
- 偏移量 0x59: TS=0x76 vs WASM=0x65
- 偏移量 0x5a: TS=0x34 vs WASM=0x72
- 偏移量 0x6c: TS=0x02 vs WASM=0x01
- 偏移量 0x83: TS=0x06 vs WASM=0x08
- 偏移量 0x8a: TS=0x00 vs WASM=0x07
- 偏移量 0x8c: TS=0x43 vs WASM=0x00
- 偏移量 0x8d: TS=0x06 vs WASM=0x0c
- ... (显示前20个差异，总共318个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0d 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 73 74 72 65 73 73 2e 6a 73 |losure-stress.js|
00000030: 0c 73 74 72 65 73 73 04 6c 30 04 6c 31 04 6c 32 |.stress.l0.l1.l2|
00000040: 04 6c 33 04 6c 34 0a 69 6e 6e 65 72 04 76 30 04 |.l3.l4.inner.v0.|
00000050: 76 31 04 76 32 04 76 33 04 76 34 0d c8 03 00 00 |v1.v2.v3.v4.....|
00000060: 00 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0c |.... ...........|
00000070: 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 0e 06 |...........)....|
00000080: 2f c8 03 06 00 00 00 07 36 00 00 0c 43 06 01 ca |/.......6...C...|
00000090: 03 00 06 00 01 00 01 3d 06 cc 03 01 00 60 ce 03 |.......=.....`..|
000000a0: 01 01 60 d0 03 01 02 60 d2 03 01 03 60 d4 03 01 |..`....`....`...|
000000b0: 04 60 d6 03 00 0a 00 c2 00 c5 0a 63 00 00 63 01 |.`.........c..c.|
000000c0: 00 63 02 00 63 03 00 63 04 00 b7 cb b8 cc b9 cd |.c..c..c........|
000000d0: ba ce bb 5b 04 00 bf 0a 5b 05 00 bf 0b 5b 06 00 |...[....[....[..|
000000e0: bf 0c 5b 07 00 bf 0d 5b 08 00 bf 0e 5b 09 00 5a |..[....[....[..Z|
000000f0: 0a 00 f0 29 c8 03 06 00 00 00 38 32 08 00 0c 43 |...)......82...C|
00000100: 06 01 d6 03 00 00 00 02 0a 00 50 00 cc 03 00 09 |..........P.....|
00000110: ce 03 01 09 d0 03 02 09 d2 03 03 09 d4 03 04 09 |................|
00000120: d8 03 05 01 da 03 06 01 dc 03 07 01 de 03 08 01 |................|
00000130: e0 03 09 01 68 00 00 93 69 00 00 0e 68 01 00 93 |....h...i...h...|
00000140: 69 01 00 0e 68 02 00 93 69 02 00 0e 68 03 00 93 |i...h...i...h...|
00000150: 69 03 00 0e 68 04 00 93 69 04 00 0e 60 05 00 93 |i...h...i...`...|
00000160: 61 05 00 0e 60 06 00 93 61 06 00 0e 60 07 00 93 |a...`...a...`...|
00000170: 61 07 00 0e 60 08 00 93 61 08 00 0e 60 09 00 93 |a...`...a...`...|
00000180: 61 09 00 29 c8 03 2a 0b 04 04 08 11 04 1c 03 11 |a..)..*.........|
00000190: 04 1c 03 11 04 1c 03 11 04 1c 03 11 04 1d 03 11 |................|
000001a0: 04 1c 03 11 04 1c 03 11 04 1c 03 11 04 1c 03 11 |................|
000001b0: 04 00                                           |..|
```

### WASM
```
00000000: 05 0d 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 73 74 72 65 73 73 2e 6a 73 |losure-stress.js|
00000030: 0c 73 74 72 65 73 73 04 6c 30 04 6c 31 04 6c 32 |.stress.l0.l1.l2|
00000040: 04 6c 33 04 6c 34 04 76 30 04 76 31 04 76 32 04 |.l3.l4.v0.v1.v2.|
00000050: 76 33 04 76 34 0a 69 6e 6e 65 72 0d c8 03 00 00 |v3.v4.inner.....|
00000060: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 0c |.... ...........|
00000070: 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 0e 06 |...........)....|
00000080: 2f c8 03 08 00 00 00 07 36 00 07 0c 00 0c 43 06 |/.......6.....C.|
00000090: 01 ca 03 00 0b 00 01 00 01 36 0b cc 03 01 00 60 |.........6.....`|
000000a0: ce 03 01 01 60 d0 03 01 02 60 d2 03 01 03 60 d4 |....`....`....`.|
000000b0: 03 01 04 60 d6 03 00 00 40 d8 03 00 06 40 da 03 |...`....@....@..|
000000c0: 00 07 40 dc 03 00 08 40 de 03 00 09 40 e0 03 00 |..@....@....@...|
000000d0: 0a 00 c2 00 c5 0a 63 04 00 63 03 00 63 02 00 63 |......c..c..c..c|
000000e0: 01 00 63 00 00 b7 cb b8 cc b9 cd ba ce bb c5 04 |..c.............|
000000f0: bf 0a c5 05 bf 0b c5 06 bf 0c c5 07 bf 0d c5 08 |................|
00000100: bf 0e c5 09 c4 0a f0 29 c8 03 08 00 00 00 32 32 |.......)......22|
00000110: 08 0c 0a 00 0c 43 06 01 e0 03 00 00 00 02 0a 00 |.....C..........|
00000120: 4c 00 cc 03 00 09 ce 03 01 09 d0 03 02 09 d2 03 |L...............|
00000130: 03 09 d4 03 04 09 d6 03 05 01 d8 03 06 01 da 03 |................|
00000140: 07 01 dc 03 08 01 de 03 09 01 68 00 00 93 69 00 |..........h...i.|
00000150: 00 0e 68 01 00 93 69 01 00 0e 68 02 00 93 69 02 |..h...i...h...i.|
00000160: 00 0e 68 03 00 93 69 03 00 0e 68 04 00 93 69 04 |..h...i...h...i.|
00000170: 00 0e 60 05 00 91 61 05 00 60 06 00 91 61 06 00 |..`...a..`...a..|
00000180: 60 07 00 91 61 07 00 60 08 00 91 61 08 00 60 09 |`...a..`...a..`.|
00000190: 00 91 61 09 00 29 c8 03 2a 0b 04 04 08 11 04 1c |..a..)..*.......|
000001a0: 03 11 04 1c 03 11 04 1c 03 11 04 1c 03 11 04 1d |................|
000001b0: 03 11 04 17 03 11 04 17 03 11 04 17 03 11 04 17 |................|
000001c0: 03 11 04 00                                     |....|
```