# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-inheritance.ts
**生成时间**: 2025-12-12T09:59:18.424Z

## 大小对比

- TypeScript编译器: 330 字节
- WASM编译器: 673 字节
- 差异: -343 字节 (-50.97%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Animal",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Dog",
      "offset": 42
    },
    {
      "index": 5,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-inheritance.js",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xc",
    "remaining": 244
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-inheritance.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Animal",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Dog",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "speak",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 61
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 65
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
    "tag": "0xd",
    "remaining": 550
  }
}
```

## 字节级差异

共发现 640 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x0c
- 偏移量 0x2: TS=0x0c vs WASM=0x4e
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
- 偏移量 0xf: TS=0x0c vs WASM=0x78
- 偏移量 0x10: TS=0x41 vs WASM=0x74
- 偏移量 0x11: TS=0x6e vs WASM=0x75
- 偏移量 0x12: TS=0x69 vs WASM=0x72
- 偏移量 0x13: TS=0x6d vs WASM=0x65
- 偏移量 0x14: TS=0x61 vs WASM=0x73
- 偏移量 0x15: TS=0x6c vs WASM=0x2f
- ... (显示前20个差异，总共640个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 0c |...<eval>._ret_.|
00000010: 41 6e 69 6d 61 6c 26 3c 63 6c 61 73 73 5f 66 69 |Animal&<class_fi|
00000020: 65 6c 64 73 5f 69 6e 69 74 3e 06 44 6f 67 4e 5f |elds_init>.DogN_|
00000030: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000040: 73 2f 63 6c 61 73 73 2d 69 6e 68 65 72 69 74 61 |s/class-inherita|
00000050: 6e 63 65 2e 6a 73 0c 02 06 00 00 00 00 00 00 05 |nce.js..........|
00000060: 00 04 00 06 92 01 05 01 00 00 00 00 00 00 02 00 |................|
00000070: 00 00 02 00 30 03 00 00 00 03 02 30 04 00 00 00 |....0......0....|
00000080: 04 00 30 03 00 00 00 05 04 30 40 e6 00 00 00 00 |..0......0@.....|
00000090: 40 e8 00 00 00 00 40 ea 00 00 00 01 b6 01 00 b6 |@.....@.........|
000000a0: 02 00 06 b6 03 00 d4 00 58 e6 00 00 00 00 d5 01 |........X.......|
000000b0: 52 56 e7 00 00 00 00 d5 02 e0 0e e3 b7 03 00 b7 |RV..............|
000000c0: 02 00 3b e6 00 00 00 b6 04 00 39 e6 00 00 00 b6 |..;.......9.....|
000000d0: 05 00 d4 03 58 e8 00 00 00 01 d5 04 52 56 e7 00 |....X.......RV..|
000000e0: 00 00 00 d5 05 d8 04 0e e5 b7 05 00 b7 04 00 3b |...............;|
000000f0: e8 00 00 00 39 e8 00 00 00 11 04 eb 00 00 00 04 |....9...........|
00000100: ec 00 00 00 21 02 00 3b ea 00 00 00 39 ea 00 00 |....!..;....9...|
00000110: 00 43 e7 00 00 00 24 00 00 de da 28 05 00 00 00 |.C....$....(....|
00000120: 22 00 00 00 15 0a 08 00 2e 08 07 11 24 4d 23 00 |"...........$M#.|
00000130: 06 0c 08 00 2e 0a 07 02 1c 2a 08 1b 0e 1b 1d 11 |.........*......|
00000140: 07 26 0b 00 01 01 01 01 01 01                   |.&........|
```

### WASM
```
00000000: 05 0c 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..N__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6c 61 73 73 2d 69 6e 68 65 |tures/class-inhe|
00000020: 72 69 74 61 6e 63 65 2e 6a 73 0c 41 6e 69 6d 61 |ritance.js.Anima|
00000030: 6c 06 44 6f 67 02 64 0a 73 70 65 61 6b 06 52 65 |l.Dog.d.speak.Re|
00000040: 78 1e 47 65 72 6d 61 6e 20 53 68 65 70 68 65 72 |x.German Shepher|
00000050: 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 1a 41 6e |d.console.log.An|
00000060: 69 6d 61 6c 20 73 70 65 61 6b 73 0a 62 72 65 65 |imal speaks.bree|
00000070: 64 12 44 6f 67 20 62 61 72 6b 73 0d c8 03 00 00 |d.Dog barks.....|
00000080: 00 00 00 0c 20 06 01 a4 01 00 04 00 04 03 06 68 |.... ..........h|
00000090: 04 ca 03 02 00 30 f0 01 03 01 70 cc 03 04 00 30 |.....0....p....0|
000000a0: f0 01 05 03 70 ca 03 00 09 cc 03 01 09 ce 03 02 |....p...........|
000000b0: 0d 08 ec 02 29 63 00 00 06 63 01 00 c1 00 58 e5 |....)c...c....X.|
000000c0: 00 00 00 00 c2 01 56 e8 00 00 00 00 c2 02 52 cc |......V.......R.|
000000d0: 0e cf 6b 01 00 e3 63 02 00 68 00 00 63 03 00 c1 |..k...c..h..c...|
000000e0: 03 58 e6 00 00 00 01 c2 04 56 e8 00 00 00 00 c2 |.X.......V......|
000000f0: 05 52 ce 0e d1 6b 03 00 e4 68 01 00 11 04 e9 00 |.R...k...h......|
00000100: 00 00 04 ea 00 00 00 21 02 00 e5 68 02 00 43 e8 |.......!...h..C.|
00000110: 00 00 00 24 00 00 0e 06 2f c8 03 12 00 00 00 28 |...$..../......(|
00000120: 12 24 00 20 16 07 48 06 17 21 11 02 1b 0c 00 0c |.$. ..H..!......|
00000130: 42 07 01 00 01 01 01 02 01 00 17 02 70 00 01 00 |B...........p...|
00000140: 10 00 01 00 f0 01 01 0d 08 cb 2b 68 00 00 11 ec |..........+h....|
00000150: 06 c7 1b 24 00 00 0e c7 d3 44 38 00 00 00 29 c8 |...$.....D8...).|
00000160: 03 06 02 04 4e 08 07 18 00 0c 42 07 01 00 00 00 |....N.....B.....|
00000170: 00 03 00 00 13 00 39 eb 00 00 00 43 ec 00 00 00 |......9....C....|
00000180: 04 ed 00 00 00 24 01 00 29 c8 03 08 05 04 03 08 |.....$..).......|
00000190: 1b 0e 34 08 00 0c 48 05 01 00 00 02 00 02 00 00 |..4...H.........|
000001a0: 0f 02 10 00 01 00 ea 01 00 01 00 0c 04 cc 08 cb |................|
000001b0: ee 01 c7 06 4e 38 00 00 00 29 c8 03 02 00 00 00 |....N8...)......|
000001c0: 0c c6 07 01 00 02 03 02 03 01 00 31 05 70 00 01 |...........1.p..|
000001d0: 00 dc 03 00 01 00 e8 01 00 01 00 e6 01 00 01 00 |................|
000001e0: 10 00 01 20 f0 01 03 0d 0c 02 cb 0c 03 cc 63 02 |... ..........c.|
000001f0: 00 2b c7 35 c8 d3 21 01 00 11 66 02 00 68 00 00 |.+.5..!...f..h..|
00000200: 11 ec 08 64 02 00 1b 24 00 00 0e 0e 64 02 00 d4 |...d...$....d...|
00000210: 44 ee 00 00 00 67 02 00 28 c8 03 0c 0b 04 35 08 |D....g..(.....5.|
00000220: 11 0c 07 01 71 09 11 1a 00 0c 4a 07 01 00 00 02 |....q.....J.....|
00000230: 00 03 00 00 25 02 10 00 01 00 ea 01 00 01 00 0c |....%...........|
00000240: 04 cc 08 cb c7 c8 35 04 e8 00 00 00 48 24 00 00 |......5.....H$..|
00000250: 0e 39 eb 00 00 00 43 ec 00 00 00 04 ef 00 00 00 |.9....C.........|
00000260: 24 01 00 29 c8 03 0e 0f 04 1c 08 11 0a 20 0c 17 |$..)......... ..|
00000270: 15 1b 0e 34 08 00 0c 48 05 01 00 00 02 00 02 00 |...4...H........|
00000280: 00 0f 02 10 00 01 00 ea 01 00 01 00 0c 04 cc 08 |................|
00000290: cb ee 01 c7 06 4e ee 00 00 00 29 c8 03 02 00 00 |.....N....).....|
000002a0: 00                                              |.|
```