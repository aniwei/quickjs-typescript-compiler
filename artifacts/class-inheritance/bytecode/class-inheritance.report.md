# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-inheritance.ts
**生成时间**: 2025-12-22T14:32:14.407Z

## 大小对比

- TypeScript编译器: 665 字节
- WASM编译器: 709 字节
- 差异: -44 字节 (-6.21%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Animal",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Dog",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "speak",
      "offset": 15
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 21
    },
    {
      "index": 5,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 25
    },
    {
      "index": 6,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-inheritance.js",
      "offset": 41
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    },
    {
      "index": 9,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Animal speaks",
      "offset": 93
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "breed",
      "offset": 107
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Dog barks",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 123,
    "tag": "0xc",
    "remaining": 542
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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Animal",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Dog",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "speak",
      "offset": 15
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 21
    },
    {
      "index": 5,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 25
    },
    {
      "index": 6,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-inheritance.js",
      "offset": 41
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    },
    {
      "index": 9,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Animal speaks",
      "offset": 93
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "breed",
      "offset": 107
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Dog barks",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 123,
    "tag": "0xc",
    "remaining": 586
  }
}
```

## 字节级差异

共发现 408 个字节差异:

- 偏移量 0x87: TS=0x97 vs WASM=0x9a
- 偏移量 0xa2: TS=0x30 vs WASM=0x70
- 偏移量 0xd8: TS=0x52 vs WASM=0x56
- 偏移量 0xd9: TS=0x56 vs WASM=0xe7
- 偏移量 0xda: TS=0xe7 vs WASM=0x00
- 偏移量 0xde: TS=0x00 vs WASM=0xc2
- 偏移量 0xdf: TS=0xc2 vs WASM=0x02
- 偏移量 0xe0: TS=0x02 vs WASM=0x52
- 偏移量 0x101: TS=0x52 vs WASM=0x56
- 偏移量 0x102: TS=0x56 vs WASM=0xe7
- 偏移量 0x103: TS=0xe7 vs WASM=0x00
- 偏移量 0x107: TS=0x00 vs WASM=0xc2
- 偏移量 0x108: TS=0xc2 vs WASM=0x05
- 偏移量 0x109: TS=0x05 vs WASM=0x52
- 偏移量 0x10e: TS=0x3b vs WASM=0x6b
- 偏移量 0x10f: TS=0xe5 vs WASM=0x04
- 偏移量 0x111: TS=0x00 vs WASM=0x3b
- 偏移量 0x112: TS=0x00 vs WASM=0xe5
- 偏移量 0x113: TS=0x39 vs WASM=0x00
- 偏移量 0x114: TS=0xe5 vs WASM=0x00
- ... (显示前20个差异，总共408个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 0c 41 6e 69 6d 61 6c 06 44 6f 67 02 64 0a |...Animal.Dog.d.|
00000010: 73 70 65 61 6b 06 52 65 78 1e 47 65 72 6d 61 6e |speak.Rex.German|
00000020: 20 53 68 65 70 68 65 72 64 4e 5f 5f 74 65 73 74 | ShepherdN__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 |s__/fixtures/cla|
00000040: 73 73 2d 69 6e 68 65 72 69 74 61 6e 63 65 2e 6a |ss-inheritance.j|
00000050: 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 1a 41 6e |s.console.log.An|
00000060: 69 6d 61 6c 20 73 70 65 61 6b 73 0a 62 72 65 65 |imal speaks.bree|
00000070: 64 12 44 6f 67 20 62 61 72 6b 73 0c 00 06 00 a4 |d.Dog barks.....|
00000080: 01 00 05 00 04 00 06 97 01 05 a6 01 00 00 00 c8 |................|
00000090: 03 02 00 30 f0 01 03 02 70 ca 03 04 00 30 f0 01 |...0....p....0..|
000000a0: 05 04 30 40 e4 00 00 00 80 40 e5 00 00 00 80 40 |..0@.....@.....@|
000000b0: e6 00 00 00 80 3f e4 00 00 00 82 3f e5 00 00 00 |.....?.....?....|
000000c0: 82 3f e6 00 00 00 80 63 01 00 06 63 02 00 c1 00 |.?.....c...c....|
000000d0: 58 e4 00 00 00 00 c2 01 52 56 e7 00 00 00 00 c2 |X.......RV......|
000000e0: 02 cd 0e d0 6b 02 00 3b e4 00 00 00 63 03 00 39 |....k..;....c..9|
000000f0: e4 00 00 00 63 04 00 c1 03 58 e5 00 00 00 01 c2 |....c....X......|
00000100: 04 52 56 e7 00 00 00 00 c2 05 c5 04 0e d2 3b e5 |.RV...........;.|
00000110: 00 00 00 39 e5 00 00 00 11 04 e8 00 00 00 04 e9 |...9............|
00000120: 00 00 00 21 02 00 3b e6 00 00 00 39 e6 00 00 00 |...!..;....9....|
00000130: 43 e7 00 00 00 24 00 00 cf 28 d4 03 12 00 00 00 |C....$...(......|
00000140: 4c 12 24 00 24 16 07 52 06 2b 21 1b 02 1b 0c 00 |L.$.$..R.+!.....|
00000150: 0c 42 07 01 00 01 01 01 02 01 00 17 02 70 00 01 |.B...........p..|
00000160: 00 10 00 01 00 f0 01 02 0d 08 cb 2b 68 00 00 11 |...........+h...|
00000170: ec 06 c7 1b 24 00 00 0e c7 d3 44 38 00 00 00 29 |....$.....D8...)|
00000180: d4 03 06 02 04 4e 08 07 18 00 0c 4a 07 01 00 00 |.....N.....J....|
00000190: 00 00 03 00 00 13 00 39 eb 00 00 00 43 ec 00 00 |.......9....C...|
000001a0: 00 04 ed 00 00 00 24 01 00 29 d4 03 08 05 04 03 |......$..)......|
000001b0: 08 1b 0e 34 08 00 0c 02 06 01 00 00 01 00 03 00 |...4............|
000001c0: 00 0b 01 10 00 01 00 08 cb 09 c7 06 4e 38 00 00 |............N8..|
000001d0: 00 29 d4 03 02 00 00 00 0c c6 07 01 00 02 03 02 |.)..............|
000001e0: 03 00 00 1f 05 70 00 01 00 dc 03 00 01 00 e8 01 |.....p..........|
000001f0: 00 01 00 e6 01 00 01 00 10 00 01 20 0c 02 cb 0c |........... ....|
00000200: 03 cc 63 02 00 2b c7 35 c8 d3 21 01 00 0e 64 02 |..c..+.5..!...d.|
00000210: 00 d4 44 ee 00 00 00 67 02 00 28 d4 03 0c 0b 04 |..D....g..(.....|
00000220: 35 08 11 0c 07 01 17 09 11 1a 00 0c 4a 07 01 00 |5...........J...|
00000230: 00 02 00 04 00 00 24 02 10 00 01 00 ea 01 00 01 |......$.........|
00000240: 00 0c 04 cc 08 cb c7 c8 35 43 e7 00 00 00 24 00 |........5C....$.|
00000250: 00 0e 39 eb 00 00 00 43 ec 00 00 00 04 ef 00 00 |..9....C........|
00000260: 00 24 01 00 29 d4 03 0e 0f 04 1c 08 11 0a 1b 0c |.$..)...........|
00000270: 17 15 1b 0e 34 08 00 0c 02 06 01 00 00 01 00 03 |....4...........|
00000280: 00 00 0b 01 10 00 01 00 08 cb 09 c7 06 4e ee 00 |.............N..|
00000290: 00 00 29 d4 03 02 00 00 00                      |..)......|
```

### WASM
```
00000000: 05 0c 0c 41 6e 69 6d 61 6c 06 44 6f 67 02 64 0a |...Animal.Dog.d.|
00000010: 73 70 65 61 6b 06 52 65 78 1e 47 65 72 6d 61 6e |speak.Rex.German|
00000020: 20 53 68 65 70 68 65 72 64 4e 5f 5f 74 65 73 74 | ShepherdN__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 |s__/fixtures/cla|
00000040: 73 73 2d 69 6e 68 65 72 69 74 61 6e 63 65 2e 6a |ss-inheritance.j|
00000050: 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 1a 41 6e |s.console.log.An|
00000060: 69 6d 61 6c 20 73 70 65 61 6b 73 0a 62 72 65 65 |imal speaks.bree|
00000070: 64 12 44 6f 67 20 62 61 72 6b 73 0c 00 06 00 a4 |d.Dog barks.....|
00000080: 01 00 05 00 04 00 06 9a 01 05 a6 01 00 00 00 c8 |................|
00000090: 03 02 00 30 f0 01 03 02 70 ca 03 04 00 30 f0 01 |...0....p....0..|
000000a0: 05 04 70 40 e4 00 00 00 80 40 e5 00 00 00 80 40 |..p@.....@.....@|
000000b0: e6 00 00 00 80 3f e4 00 00 00 82 3f e5 00 00 00 |.....?.....?....|
000000c0: 82 3f e6 00 00 00 80 63 01 00 06 63 02 00 c1 00 |.?.....c...c....|
000000d0: 58 e4 00 00 00 00 c2 01 56 e7 00 00 00 00 c2 02 |X.......V.......|
000000e0: 52 cd 0e d0 6b 02 00 3b e4 00 00 00 63 03 00 39 |R...k..;....c..9|
000000f0: e4 00 00 00 63 04 00 c1 03 58 e5 00 00 00 01 c2 |....c....X......|
00000100: 04 56 e7 00 00 00 00 c2 05 52 c5 04 0e d2 6b 04 |.V.......R....k.|
00000110: 00 3b e5 00 00 00 39 e5 00 00 00 11 04 e8 00 00 |.;....9.........|
00000120: 00 04 e9 00 00 00 21 02 00 3b e6 00 00 00 39 e6 |......!..;....9.|
00000130: 00 00 00 43 e7 00 00 00 24 00 00 cf 28 d4 03 12 |...C....$...(...|
00000140: 00 00 00 4c 12 24 00 27 16 07 52 06 2b 21 1b 02 |...L.$.'..R.+!..|
00000150: 1b 0c 00 0c 42 07 01 00 01 01 01 02 01 00 17 02 |....B...........|
00000160: 70 00 01 00 10 00 01 00 f0 01 02 0d 08 cb 2b 68 |p.............+h|
00000170: 00 00 11 ec 06 c7 1b 24 00 00 0e c7 d3 44 38 00 |.......$.....D8.|
00000180: 00 00 29 d4 03 06 02 04 4e 08 07 18 00 0c 42 07 |..).....N.....B.|
00000190: 01 00 00 00 00 03 00 00 13 00 39 eb 00 00 00 43 |..........9....C|
000001a0: ec 00 00 00 04 ed 00 00 00 24 01 00 29 d4 03 08 |.........$..)...|
000001b0: 05 04 03 08 1b 0e 34 08 00 0c 48 05 01 00 00 02 |......4...H.....|
000001c0: 00 02 00 00 0f 02 10 00 01 00 ea 01 00 01 00 0c |................|
000001d0: 04 cc 08 cb ee 01 c7 06 4e 38 00 00 00 29 d4 03 |........N8...)..|
000001e0: 02 00 00 00 0c c6 07 01 00 02 03 02 03 01 00 31 |...............1|
000001f0: 05 70 00 01 00 dc 03 00 01 00 e8 01 00 01 00 e6 |.p..............|
00000200: 01 00 01 00 10 00 01 20 f0 01 04 0d 0c 02 cb 0c |....... ........|
00000210: 03 cc 63 02 00 2b c7 35 c8 d3 21 01 00 11 66 02 |..c..+.5..!...f.|
00000220: 00 68 00 00 11 ec 08 64 02 00 1b 24 00 00 0e 0e |.h.....d...$....|
00000230: 64 02 00 d4 44 ee 00 00 00 67 02 00 28 d4 03 0c |d...D....g..(...|
00000240: 0b 04 35 08 11 0c 07 01 71 09 11 1a 00 0c 4a 07 |..5.....q.....J.|
00000250: 01 00 00 02 00 03 00 00 25 02 10 00 01 00 ea 01 |........%.......|
00000260: 00 01 00 0c 04 cc 08 cb c7 c8 35 04 e7 00 00 00 |..........5.....|
00000270: 48 24 00 00 0e 39 eb 00 00 00 43 ec 00 00 00 04 |H$...9....C.....|
00000280: ef 00 00 00 24 01 00 29 d4 03 0e 0f 04 1c 08 11 |....$..)........|
00000290: 0a 20 0c 17 15 1b 0e 34 08 00 0c 48 05 01 00 00 |. .....4...H....|
000002a0: 02 00 02 00 00 0f 02 10 00 01 00 ea 01 00 01 00 |................|
000002b0: 0c 04 cc 08 cb ee 01 c7 06 4e ee 00 00 00 29 d4 |.........N....).|
000002c0: 03 02 00 00 00                                  |.....|
```