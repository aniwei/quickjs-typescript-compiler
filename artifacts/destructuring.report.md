# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/destructuring.ts
**生成时间**: 2025-12-05T02:09:51.740Z

## 大小对比

- TypeScript编译器: 376 字节
- WASM编译器: 397 字节
- 差异: -21 字节 (-5.29%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 14,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/destructuring.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 61
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 63
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 70
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "arr2",
      "offset": 72
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 77
    },
    {
      "index": 11,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "def",
      "offset": 79
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "defArr",
      "offset": 83
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 92,
    "tag": "0xd",
    "remaining": 284
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 14,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/destructuring.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 61
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 63
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 70
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "arr2",
      "offset": 72
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 77
    },
    {
      "index": 11,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "def",
      "offset": 79
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "defArr",
      "offset": 83
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 92,
    "tag": "0xd",
    "remaining": 305
  }
}
```

## 字节级差异

共发现 224 个字节差异:

- 偏移量 0x6b: TS=0x0c vs WASM=0x00
- 偏移量 0x6d: TS=0x03 vs WASM=0x05
- 偏移量 0x6e: TS=0x00 vs WASM=0x0c
- 偏移量 0x70: TS=0xb6 vs WASM=0xdc
- 偏移量 0x72: TS=0x0c vs WASM=0x00
- 偏移量 0x76: TS=0x00 vs WASM=0x0d
- 偏移量 0x79: TS=0x00 vs WASM=0x01
- 偏移量 0x7a: TS=0x00 vs WASM=0x0d
- 偏移量 0x7d: TS=0x00 vs WASM=0x02
- 偏移量 0x7e: TS=0x00 vs WASM=0x0d
- 偏移量 0x81: TS=0x00 vs WASM=0x03
- 偏移量 0x82: TS=0x00 vs WASM=0x0d
- 偏移量 0x85: TS=0x00 vs WASM=0x04
- 偏移量 0x86: TS=0x00 vs WASM=0x0d
- 偏移量 0x89: TS=0x00 vs WASM=0x05
- 偏移量 0x8a: TS=0x00 vs WASM=0x0d
- 偏移量 0x8d: TS=0x00 vs WASM=0x06
- 偏移量 0x8e: TS=0x00 vs WASM=0x0d
- 偏移量 0x91: TS=0x00 vs WASM=0x07
- 偏移量 0x92: TS=0x00 vs WASM=0x0d
- ... (显示前20个差异，总共224个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0e 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 73 74 72 75 63 74 75 72 69 6e 67 2e 6a 73 06 |estructuring.js.|
00000030: 6f 62 6a 02 61 02 62 06 61 72 72 02 63 02 64 0c |obj.a.b.arr.c.d.|
00000040: 6e 65 73 74 65 64 02 79 08 61 72 72 32 02 7a 06 |nested.y.arr2.z.|
00000050: 64 65 66 0c 64 65 66 41 72 72 02 78 0d c8 03 00 |def.defArr.x....|
00000060: 00 00 00 00 0c 20 06 01 a4 01 00 0c 00 03 00 00 |..... ..........|
00000070: b6 01 0c ca 03 00 00 cc 03 00 00 ce 03 00 00 d0 |................|
00000080: 03 00 00 d2 03 00 00 d4 03 00 00 d6 03 00 00 d8 |................|
00000090: 03 00 00 da 03 00 00 dc 03 00 00 de 03 00 00 e0 |................|
000000a0: 03 00 00 08 ec 02 29 0b b8 4e e6 00 00 00 b9 4e |......)..N.....N|
000000b0: e7 00 00 00 5b 00 00 5a 00 00 73 43 e6 00 00 00 |....[..Z..sC....|
000000c0: 5b 01 00 43 e7 00 00 00 5b 02 00 0e ba bb 26 02 |[..C....[.....&.|
000000d0: 00 5b 03 00 5a 03 00 7f 82 00 0e 5b 04 00 82 00 |.[..Z......[....|
000000e0: 0e 5b 05 00 86 0b 0b b8 4e ec 00 00 00 4e f1 00 |.[......N....N..|
000000f0: 00 00 5b 06 00 5a 06 00 73 43 f1 00 00 00 73 43 |..[..Z..sC....sC|
00000100: ec 00 00 00 5b 07 00 0e 0e b8 b9 ba 26 03 00 5b |....[.......&..[|
00000110: 08 00 5a 08 00 7f 82 00 0e 0e 82 00 0e 0e 82 00 |..Z.............|
00000120: 0e 5b 09 00 86 0b 73 43 ef 00 00 00 11 06 ad 6c |.[....sC.......l|
00000130: 06 00 00 00 0e 01 0a 00 00 00 5b 0a 00 0e 26 00 |..........[...&.|
00000140: 00 7f 82 00 0e 11 06 ad 6c 06 00 00 00 0e 01 14 |........l.......|
00000150: 00 00 00 5b 0b 00 86 06 2f c8 03 1b 00 14 01 00 |...[..../.......|
00000160: 15 01 00 08 01 00 11 02 00 10 01 00 14 02 00 09 |................|
00000170: 01 00 13 02 00 19 01 00                         |........|
```

### WASM
```
00000000: 05 0e 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 73 74 72 75 63 74 75 72 69 6e 67 2e 6a 73 06 |estructuring.js.|
00000030: 6f 62 6a 02 61 02 62 06 61 72 72 02 63 02 64 0c |obj.a.b.arr.c.d.|
00000040: 6e 65 73 74 65 64 02 79 08 61 72 72 32 02 7a 06 |nested.y.arr2.z.|
00000050: 64 65 66 0c 64 65 66 41 72 72 02 78 0d c8 03 00 |def.defArr.x....|
00000060: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 05 0c 00 |..... ..........|
00000070: dc 01 00 ca 03 00 0d cc 03 01 0d ce 03 02 0d d0 |................|
00000080: 03 03 0d d2 03 04 0d d4 03 05 0d d6 03 06 0d d8 |................|
00000090: 03 07 0d da 03 08 0d dc 03 09 0d de 03 0a 0d e0 |................|
000000a0: 03 0b 0d 08 ec 02 29 0b b8 4e e6 00 00 00 b9 4e |......)..N.....N|
000000b0: e7 00 00 00 e3 06 11 f4 ed 11 73 43 e6 00 00 00 |..........sC....|
000000c0: e4 43 e7 00 00 00 e5 0e ee 07 0e 68 00 00 ee eb |.C.........h....|
000000d0: ba bb 26 02 00 e6 06 11 f4 ed 11 7f 82 00 0e 61 |..&............a|
000000e0: 04 00 82 00 0e 61 05 00 86 ee 07 0e 68 03 00 ee |.....a......h...|
000000f0: eb 0b 0b b8 4e ec 00 00 00 4e f1 00 00 00 61 06 |....N....N....a.|
00000100: 00 06 11 f4 ed 14 73 43 f1 00 00 00 73 43 ec 00 |......sC....sC..|
00000110: 00 00 61 07 00 0e 0e ee 07 0e 68 06 00 ee e8 b8 |..a.......h.....|
00000120: b9 ba 26 03 00 61 08 00 06 11 f4 ed 13 7f 82 00 |..&..a..........|
00000130: 0e 0e 82 00 0e 0e 82 00 0e 61 09 00 86 ee 07 0e |.........a......|
00000140: 68 08 00 ee e9 06 11 f4 ed 14 73 43 ef 00 00 00 |h.........sC....|
00000150: 11 f4 ec 04 0e bf 0a 61 0a 00 0e ee 05 0e 0b ee |.......a........|
00000160: ea 06 11 f4 ed 12 7f 82 00 0e 11 f4 ec 04 0e bf |................|
00000170: 14 61 0b 00 86 ee 07 0e 26 00 00 ee ea 06 2f c8 |.a......&...../.|
00000180: 03 0a 00 00 cb 22 a9 03 ea 0c c2 09 00          |.....".......|
```