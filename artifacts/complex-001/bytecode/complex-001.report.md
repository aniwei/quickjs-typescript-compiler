# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-001.ts
**生成时间**: 2025-12-25T01:17:43.743Z

## 大小对比

- TypeScript编译器: 657 字节
- WASM编译器: 656 字节
- 差异: 1 字节 (0.15%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Acc1",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getX",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 23
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 31
    },
    {
      "index": 8,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-001.js",
      "offset": 35
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 79
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 81
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 83
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xc",
    "remaining": 572
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Acc1",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getX",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 23
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 31
    },
    {
      "index": 8,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-001.js",
      "offset": 35
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 79
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 81
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 83
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xc",
    "remaining": 571
  }
}
```

## 字节级差异

共发现 311 个字节差异:

- 偏移量 0x61: TS=0x80 vs WASM=0xff
- 偏移量 0x62: TS=0x02 vs WASM=0x01
- 偏移量 0x134: TS=0x10 vs WASM=0x0f
- 偏移量 0x136: TS=0x11 vs WASM=0x43
- 偏移量 0x137: TS=0x42 vs WASM=0x6a
- 偏移量 0x138: TS=0x6a vs WASM=0x00
- 偏移量 0x13b: TS=0x00 vs WASM=0x3b
- 偏移量 0x13c: TS=0x3b vs WASM=0x6a
- 偏移量 0x13d: TS=0x6a vs WASM=0x00
- 偏移量 0x140: TS=0x00 vs WASM=0x0e
- 偏移量 0x141: TS=0x0e vs WASM=0xee
- 偏移量 0x142: TS=0xee vs WASM=0x11
- 偏移量 0x143: TS=0x11 vs WASM=0x0e
- 偏移量 0x144: TS=0x0e vs WASM=0x0b
- 偏移量 0x145: TS=0x0b vs WASM=0xc2
- 偏移量 0x146: TS=0xc2 vs WASM=0x04
- 偏移量 0x147: TS=0x04 vs WASM=0x4f
- 偏移量 0x148: TS=0x4f vs WASM=0x6a
- 偏移量 0x149: TS=0x6a vs WASM=0x00
- 偏移量 0x14c: TS=0x00 vs WASM=0x4e
- ... (显示前20个差异，总共311个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 08 41 63 63 31 04 23 78 02 69 02 61 06 73 |...Acc1.#x.i.a.s|
00000010: 75 6d 08 67 65 74 58 0e 63 6f 6e 73 6f 6c 65 06 |um.getX.console.|
00000020: 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |logV__tests__/fi|
00000030: 78 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 |xtures_generated|
00000040: 2f 63 6f 6d 70 6c 65 78 2d 30 30 31 2e 6a 73 02 |/complex-001.js.|
00000050: 76 02 78 02 79 0c 00 06 00 a4 01 00 05 00 07 00 |v.x.y...........|
00000060: 05 80 02 05 a6 01 00 00 00 c8 03 02 00 30 ca 03 |.............0..|
00000070: 03 02 75 f0 01 03 03 70 cc 03 04 00 20 40 e4 00 |..u....p.... @..|
00000080: 00 00 80 40 e7 00 00 00 80 40 e8 00 00 00 80 40 |...@.....@.....@|
00000090: 6a 00 00 00 80 3f e4 00 00 00 82 3f e7 00 00 00 |j....?.....?....|
000000a0: 80 3f e8 00 00 00 82 3f 6a 00 00 00 80 63 01 00 |.?.....?j....c..|
000000b0: 06 63 03 00 63 02 00 c1 02 58 e4 00 00 00 00 05 |.c..c....X......|
000000c0: e5 00 00 00 cd c2 00 56 6a 00 00 00 00 c2 01 56 |.......Vj......V|
000000d0: e9 00 00 00 00 c2 03 52 ce 0e d0 6b 03 00 6b 02 |.......R...k..k.|
000000e0: 00 3b e4 00 00 00 39 e4 00 00 00 11 21 00 00 3b |.;....9.....!..;|
000000f0: e7 00 00 00 b7 3b e8 00 00 00 06 cb 63 04 00 b7 |.....;......c...|
00000100: c5 04 64 04 00 ba a5 ec 28 39 e8 00 00 00 39 e7 |..d.....(9....9.|
00000110: 00 00 00 43 6a 00 00 00 64 04 00 24 01 00 9f 11 |...Cj...d..$....|
00000120: 3a e8 00 00 00 cb 64 04 00 93 65 04 00 0e ee d3 |:.....d...e.....|
00000130: 06 11 f4 ed 10 73 11 42 6a 00 00 00 3b 6a 00 00 |.....s.Bj...;j..|
00000140: 00 0e ee 11 0e 0b c2 04 4f 6a 00 00 00 4e 6a 00 |........Oj...Nj.|
00000150: 00 00 ee e2 39 ea 00 00 00 43 eb 00 00 00 39 e7 |....9....C....9.|
00000160: 00 00 00 43 e9 00 00 00 24 00 00 39 e8 00 00 00 |...C....$..9....|
00000170: 39 6a 00 00 00 b8 b9 f2 24 03 00 cf 28 d8 03 30 |9j......$...(..0|
00000180: 00 00 00 69 0c 1c 20 08 72 03 16 04 12 1b 1b 0e |...i.. .r.......|
00000190: 1b 02 1b 0a 11 01 11 0f 29 1e 11 02 00 2b 08 2f |........)....+./|
000001a0: 1b 0e 1b 0a 1b 02 1b 0a 11 08 1b 0a 25 06 07 25 |............%..%|
000001b0: 00 0c 42 07 01 00 01 01 01 04 01 00 10 02 da 03 |..B.............|
000001c0: 00 01 00 10 00 01 00 ca 03 02 0d 08 cb c7 11 df |................|
000001d0: 45 d3 9f 15 df 46 0e c7 df 45 28 d8 03 0e 03 04 |E....F...E(.....|
000001e0: 0c 12 07 08 11 0e 07 05 20 22 0c 15 00 0c 42 07 |........ "....B.|
000001f0: 01 00 00 01 00 02 01 00 06 01 10 00 01 00 ca 03 |................|
00000200: 02 0d 08 cb c7 df 45 28 d8 03 06 04 04 11 28 0c |......E(......(.|
00000210: 15 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 10 |...@............|
00000220: 00 01 00 f0 01 03 0d 08 cb 2b 68 00 00 11 ec 06 |.........+h.....|
00000230: c7 1b 24 00 00 29 d8 03 02 05 00 00 0c 48 05 01 |..$..).......H..|
00000240: 00 00 02 00 03 01 00 0e 02 10 00 01 00 ea 01 00 |................|
00000250: 01 00 ca 03 02 5d 0c 04 cc 08 cb ee 01 c7 68 00 |.....]........h.|
00000260: 00 b8 47 29 d8 03 02 00 00 00 0c 02 06 00 00 02 |..G)............|
00000270: 00 02 02 00 00 04 02 dc 03 00 01 00 de 03 00 01 |................|
00000280: 00 d3 d4 9f 28 d8 03 08 0b 17 02 14 07 08 07 03 |....(...........|
00000290: 00                                              |.|
```

### WASM
```
00000000: 05 0c 08 41 63 63 31 04 23 78 02 69 02 61 06 73 |...Acc1.#x.i.a.s|
00000010: 75 6d 08 67 65 74 58 0e 63 6f 6e 73 6f 6c 65 06 |um.getX.console.|
00000020: 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |logV__tests__/fi|
00000030: 78 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 |xtures_generated|
00000040: 2f 63 6f 6d 70 6c 65 78 2d 30 30 31 2e 6a 73 02 |/complex-001.js.|
00000050: 76 02 78 02 79 0c 00 06 00 a4 01 00 05 00 07 00 |v.x.y...........|
00000060: 05 ff 01 05 a6 01 00 00 00 c8 03 02 00 30 ca 03 |.............0..|
00000070: 03 02 75 f0 01 03 03 70 cc 03 04 00 20 40 e4 00 |..u....p.... @..|
00000080: 00 00 80 40 e7 00 00 00 80 40 e8 00 00 00 80 40 |...@.....@.....@|
00000090: 6a 00 00 00 80 3f e4 00 00 00 82 3f e7 00 00 00 |j....?.....?....|
000000a0: 80 3f e8 00 00 00 82 3f 6a 00 00 00 80 63 01 00 |.?.....?j....c..|
000000b0: 06 63 03 00 63 02 00 c1 02 58 e4 00 00 00 00 05 |.c..c....X......|
000000c0: e5 00 00 00 cd c2 00 56 6a 00 00 00 00 c2 01 56 |.......Vj......V|
000000d0: e9 00 00 00 00 c2 03 52 ce 0e d0 6b 03 00 6b 02 |.......R...k..k.|
000000e0: 00 3b e4 00 00 00 39 e4 00 00 00 11 21 00 00 3b |.;....9.....!..;|
000000f0: e7 00 00 00 b7 3b e8 00 00 00 06 cb 63 04 00 b7 |.....;......c...|
00000100: c5 04 64 04 00 ba a5 ec 28 39 e8 00 00 00 39 e7 |..d.....(9....9.|
00000110: 00 00 00 43 6a 00 00 00 64 04 00 24 01 00 9f 11 |...Cj...d..$....|
00000120: 3a e8 00 00 00 cb 64 04 00 93 65 04 00 0e ee d3 |:.....d...e.....|
00000130: 06 11 f4 ed 0f 73 43 6a 00 00 00 3b 6a 00 00 00 |.....sCj...;j...|
00000140: 0e ee 11 0e 0b c2 04 4f 6a 00 00 00 4e 6a 00 00 |.......Oj...Nj..|
00000150: 00 ee e3 39 ea 00 00 00 43 eb 00 00 00 39 e7 00 |...9....C....9..|
00000160: 00 00 43 e9 00 00 00 24 00 00 39 e8 00 00 00 39 |..C....$..9....9|
00000170: 6a 00 00 00 b8 b9 f2 24 03 00 cf 28 d8 03 30 00 |j......$...(..0.|
00000180: 00 00 69 0c 1c 20 08 72 03 16 04 12 1b 1b 0e 1b |..i.. .r........|
00000190: 02 1b 0a 11 01 11 0f 29 1e 11 02 00 2a 08 2f 1b |.......)....*./.|
000001a0: 0e 1b 0a 1b 02 1b 0a 11 08 1b 0a 25 06 07 25 00 |...........%..%.|
000001b0: 0c 42 07 01 00 01 01 01 04 01 00 10 02 da 03 00 |.B..............|
000001c0: 01 00 10 00 01 00 ca 03 02 0d 08 cb c7 11 df 45 |...............E|
000001d0: d3 9f 15 df 46 0e c7 df 45 28 d8 03 0e 03 04 0c |....F...E(......|
000001e0: 12 07 08 11 0e 07 05 20 22 0c 15 00 0c 42 07 01 |....... "....B..|
000001f0: 00 00 01 00 02 01 00 06 01 10 00 01 00 ca 03 02 |................|
00000200: 0d 08 cb c7 df 45 28 d8 03 06 04 04 11 28 0c 15 |.....E(......(..|
00000210: 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 10 00 |..@.............|
00000220: 01 00 f0 01 03 0d 08 cb 2b 68 00 00 11 ec 06 c7 |........+h......|
00000230: 1b 24 00 00 29 d8 03 02 05 00 00 0c 48 05 01 00 |.$..).......H...|
00000240: 00 02 00 03 01 00 0e 02 10 00 01 00 ea 01 00 01 |................|
00000250: 00 ca 03 02 5d 0c 04 cc 08 cb ee 01 c7 68 00 00 |....]........h..|
00000260: b8 47 29 d8 03 02 00 00 00 0c 02 06 00 00 02 00 |.G).............|
00000270: 02 02 00 00 04 02 dc 03 00 01 00 de 03 00 01 00 |................|
00000280: d3 d4 9f 28 d8 03 08 0b 17 02 14 07 08 07 03 00 |...(............|
```