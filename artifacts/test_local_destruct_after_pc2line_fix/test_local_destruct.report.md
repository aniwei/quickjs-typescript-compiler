# 字节码分析报告

**输入文件**: __tests__/fixtures/test_local_destruct.ts
**生成时间**: 2026-01-01T11:03:29.288Z

## 大小对比

- TypeScript编译器: 531 字节
- WASM编译器: 537 字节
- 差异: -6 字节 (-1.12%)

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
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "local_destruct",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_local_destruct.js",
      "offset": 17
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 69
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "array",
      "offset": 75
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 81
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 83
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 85
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 87
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 440
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
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "local_destruct",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_local_destruct.js",
      "offset": 17
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 69
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "array",
      "offset": 75
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 81
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 83
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 85
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 87
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 446
  }
}
```

## 字节级差异

共发现 24 个字节差异:

- 偏移量 0x1e1: TS=0x30 vs WASM=0x36
- 偏移量 0x202: TS=0x00 vs WASM=0x1b
- 偏移量 0x203: TS=0x43 vs WASM=0x0c
- 偏移量 0x204: TS=0x00 vs WASM=0x4d
- 偏移量 0x205: TS=0x3c vs WASM=0x0c
- 偏移量 0x206: TS=0x00 vs WASM=0x4d
- 偏移量 0x207: TS=0x05 vs WASM=0x0c
- 偏移量 0x208: TS=0x05 vs WASM=0x4d
- 偏移量 0x209: TS=0x1b vs WASM=0x0c
- 偏移量 0x20a: TS=0x00 vs WASM=0x57
- 偏移量 0x20b: TS=0x05 vs WASM=0x0c
- 偏移量 0x20c: TS=0x0a vs WASM=0x00
- 偏移量 0x20d: TS=0x19 vs WASM=0x05
- 偏移量 0x20e: TS=0x11 vs WASM=0x05
- 偏移量 0x20f: TS=0x04 vs WASM=0x1b
- 偏移量 0x210: TS=0x07 vs WASM=0x00
- 偏移量 0x211: TS=0x11 vs WASM=0x05
- 偏移量 0x212: TS=0x00 vs WASM=0x0a
- 偏移量 0x213: TS=EOF vs WASM=0x19
- 偏移量 0x214: TS=EOF vs WASM=0x11
- ... (显示前20个差异，总共24个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0e 1c 6c 6f 63 61 6c 5f 64 65 73 74 72 75 63 |...local_destruc|
00000010: 74 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |tR__tests__/fixt|
00000020: 75 72 65 73 2f 74 65 73 74 5f 6c 6f 63 61 6c 5f |ures/test_local_|
00000030: 64 65 73 74 72 75 63 74 2e 6a 73 02 6e 02 6a 04 |destruct.js.n.j.|
00000040: 76 31 04 76 32 04 76 33 04 76 34 0a 61 72 72 61 |v1.v2.v3.v4.arra|
00000050: 79 02 6f 02 61 02 62 02 63 02 64 0c 00 06 00 a4 |y.o.a.b.c.d.....|
00000060: 01 00 01 00 01 00 01 10 01 a6 01 00 00 00 40 e4 |..............@.|
00000070: 00 00 00 40 c2 00 41 e4 00 00 00 00 c7 28 ca 03 |...@..A......(..|
00000080: 02 00 00 00 0c 43 06 00 c8 03 01 0b 01 0a 00 00 |.....C..........|
00000090: 90 02 0c cc 03 00 01 00 ce 03 00 00 00 d0 03 00 |................|
000000a0: 01 00 d2 03 00 02 00 d4 03 00 03 00 d6 03 00 04 |................|
000000b0: 00 d8 03 00 05 00 da 03 00 06 00 dc 03 00 07 00 |................|
000000c0: de 03 00 08 00 e0 03 00 09 00 e2 03 00 0a 00 b8 |................|
000000d0: b9 ba bb bc 26 05 00 c5 05 0b b8 4e ee 00 00 00 |....&......N....|
000000e0: b9 4e ef 00 00 00 ba 4e f0 00 00 00 bb 4e f1 00 |.N.....N.....N..|
000000f0: 00 00 c5 06 b7 cb c7 d3 a5 6c e0 00 00 00 ee 41 |.........l.....A|
00000100: 11 7f 7a e8 00 00 00 01 00 82 02 0e 3e 7a e9 00 |..z.........>z..|
00000110: 00 00 02 00 82 02 0e 3e 82 00 0e 0e 7a ea 00 00 |.......>....z...|
00000120: 00 03 00 82 02 0e 3e 7a eb 00 00 00 04 00 26 00 |......>z......&.|
00000130: 00 b7 82 04 ed 05 53 91 ee f9 0e 0e 3e 86 ee 05 |......S.....>...|
00000140: c4 05 ee bd 0e ee 42 11 73 11 7a ee 00 00 00 07 |......B.s.z.....|
00000150: 00 1d 42 ee 00 00 00 3e 11 7a ef 00 00 00 08 00 |..B....>.z......|
00000160: 1d 42 ef 00 00 00 3e 11 7a f0 00 00 00 09 00 1d |.B....>.z.......|
00000170: 42 f0 00 00 00 3e 11 7a f1 00 00 00 0a 00 1d 42 |B....>.z.......B|
00000180: f1 00 00 00 3e 0e ee 05 c4 06 ee bc 0e ee 42 11 |....>.........B.|
00000190: 73 11 7a ee 00 00 00 07 00 1d 42 ee 00 00 00 3e |s.z.......B....>|
000001a0: 11 7a ef 00 00 00 08 00 1d 42 ef 00 00 00 3e 11 |.z.......B....>.|
000001b0: 7a f0 00 00 00 09 00 1d 42 f0 00 00 00 3e 11 7a |z.......B....>.z|
000001c0: f1 00 00 00 0a 00 1d 42 f1 00 00 00 3e 0e ee 05 |.......B....>...|
000001d0: c4 06 ee bc 0e 95 00 ef 1e ff d3 bf 0c 9c 28 ca |..............(.|
000001e0: 03 30 00 00 00 25 0a 12 0c 0e 07 08 07 03 21 13 |.0...%........!.|
000001f0: 16 02 39 08 4d 0c 39 0e 7f 0c 1c 2f 00 43 00 24 |..9.M.9..../.C.$|
00000200: 1c 23 00 43 00 3c 00 05 05 1b 00 05 0a 19 11 04 |.#.C.<..........|
00000210: 07 11 00                                        |...|
```

### WASM
```
00000000: 05 0e 1c 6c 6f 63 61 6c 5f 64 65 73 74 72 75 63 |...local_destruc|
00000010: 74 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |tR__tests__/fixt|
00000020: 75 72 65 73 2f 74 65 73 74 5f 6c 6f 63 61 6c 5f |ures/test_local_|
00000030: 64 65 73 74 72 75 63 74 2e 6a 73 02 6e 02 6a 04 |destruct.js.n.j.|
00000040: 76 31 04 76 32 04 76 33 04 76 34 0a 61 72 72 61 |v1.v2.v3.v4.arra|
00000050: 79 02 6f 02 61 02 62 02 63 02 64 0c 00 06 00 a4 |y.o.a.b.c.d.....|
00000060: 01 00 01 00 01 00 01 10 01 a6 01 00 00 00 40 e4 |..............@.|
00000070: 00 00 00 40 c2 00 41 e4 00 00 00 00 c7 28 ca 03 |...@..A......(..|
00000080: 02 00 00 00 0c 43 06 00 c8 03 01 0b 01 0a 00 00 |.....C..........|
00000090: 90 02 0c cc 03 00 01 00 ce 03 00 00 00 d0 03 00 |................|
000000a0: 01 00 d2 03 00 02 00 d4 03 00 03 00 d6 03 00 04 |................|
000000b0: 00 d8 03 00 05 00 da 03 00 06 00 dc 03 00 07 00 |................|
000000c0: de 03 00 08 00 e0 03 00 09 00 e2 03 00 0a 00 b8 |................|
000000d0: b9 ba bb bc 26 05 00 c5 05 0b b8 4e ee 00 00 00 |....&......N....|
000000e0: b9 4e ef 00 00 00 ba 4e f0 00 00 00 bb 4e f1 00 |.N.....N.....N..|
000000f0: 00 00 c5 06 b7 cb c7 d3 a5 6c e0 00 00 00 ee 41 |.........l.....A|
00000100: 11 7f 7a e8 00 00 00 01 00 82 02 0e 3e 7a e9 00 |..z.........>z..|
00000110: 00 00 02 00 82 02 0e 3e 82 00 0e 0e 7a ea 00 00 |.......>....z...|
00000120: 00 03 00 82 02 0e 3e 7a eb 00 00 00 04 00 26 00 |......>z......&.|
00000130: 00 b7 82 04 ed 05 53 91 ee f9 0e 0e 3e 86 ee 05 |......S.....>...|
00000140: c4 05 ee bd 0e ee 42 11 73 11 7a ee 00 00 00 07 |......B.s.z.....|
00000150: 00 1d 42 ee 00 00 00 3e 11 7a ef 00 00 00 08 00 |..B....>.z......|
00000160: 1d 42 ef 00 00 00 3e 11 7a f0 00 00 00 09 00 1d |.B....>.z.......|
00000170: 42 f0 00 00 00 3e 11 7a f1 00 00 00 0a 00 1d 42 |B....>.z.......B|
00000180: f1 00 00 00 3e 0e ee 05 c4 06 ee bc 0e ee 42 11 |....>.........B.|
00000190: 73 11 7a ee 00 00 00 07 00 1d 42 ee 00 00 00 3e |s.z.......B....>|
000001a0: 11 7a ef 00 00 00 08 00 1d 42 ef 00 00 00 3e 11 |.z.......B....>.|
000001b0: 7a f0 00 00 00 09 00 1d 42 f0 00 00 00 3e 11 7a |z.......B....>.z|
000001c0: f1 00 00 00 0a 00 1d 42 f1 00 00 00 3e 0e ee 05 |.......B....>...|
000001d0: c4 06 ee bc 0e 95 00 ef 1e ff d3 bf 0c 9c 28 ca |..............(.|
000001e0: 03 36 00 00 00 25 0a 12 0c 0e 07 08 07 03 21 13 |.6...%........!.|
000001f0: 16 02 39 08 4d 0c 39 0e 7f 0c 1c 2f 00 43 00 24 |..9.M.9..../.C.$|
00000200: 1c 23 1b 0c 4d 0c 4d 0c 4d 0c 57 0c 00 05 05 1b |.#..M.M.M.W.....|
00000210: 00 05 0a 19 11 04 07 11 00                      |.........|
```