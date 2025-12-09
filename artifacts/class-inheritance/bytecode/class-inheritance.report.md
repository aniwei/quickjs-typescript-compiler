# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-inheritance.ts
**生成时间**: 2025-12-09T14:28:02.623Z

## 大小对比

- TypeScript编译器: 663 字节
- WASM编译器: 682 字节
- 差异: -19 字节 (-2.79%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-inheritance.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Animal",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Dog",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "speak",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 74
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 90
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 98
    },
    {
      "index": 9,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Animal speaks",
      "offset": 102
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "breed",
      "offset": 116
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Dog barks",
      "offset": 122
    }
  ],
  "functionHeader": {
    "offset": 132,
    "tag": "0xd",
    "remaining": 531
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-inheritance.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Animal",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Dog",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "speak",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 74
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 90
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 98
    },
    {
      "index": 9,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Animal speaks",
      "offset": 102
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "breed",
      "offset": 116
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Dog barks",
      "offset": 122
    }
  ],
  "functionHeader": {
    "offset": 132,
    "tag": "0xd",
    "remaining": 550
  }
}
```

## 字节级差异

共发现 425 个字节差异:

- 偏移量 0x95: TS=0x06 vs WASM=0x04
- 偏移量 0x98: TS=0x6b vs WASM=0x68
- 偏移量 0xa2: TS=0x02 vs WASM=0x01
- 偏移量 0xa3: TS=0x30 vs WASM=0x70
- 偏移量 0xa6: TS=0x02 vs WASM=0x04
- 偏移量 0xa7: TS=0x02 vs WASM=0x00
- 偏移量 0xab: TS=0x04 vs WASM=0x05
- 偏移量 0xac: TS=0x04 vs WASM=0x03
- 偏移量 0xad: TS=0x30 vs WASM=0x70
- 偏移量 0xae: TS=0xce vs WASM=0xca
- 偏移量 0xb1: TS=0x0d vs WASM=0x09
- 偏移量 0xb2: TS=0xca vs WASM=0xcc
- 偏移量 0xb6: TS=0xcc vs WASM=0xce
- 偏移量 0xb8: TS=0x03 vs WASM=0x02
- 偏移量 0xb9: TS=0x09 vs WASM=0x0d
- 偏移量 0xbf: TS=0x01 vs WASM=0x00
- 偏移量 0xc3: TS=0x02 vs WASM=0x01
- 偏移量 0xd8: TS=0xcd vs WASM=0xcc
- 偏移量 0xda: TS=0xd0 vs WASM=0xcf
- 偏移量 0xdc: TS=0x02 vs WASM=0x01
- ... (显示前20个差异，总共425个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 69 6e 68 65 72 69 74 61 6e 63 65 |lass-inheritance|
00000030: 2e 6a 73 0c 41 6e 69 6d 61 6c 06 44 6f 67 02 64 |.js.Animal.Dog.d|
00000040: 0a 73 70 65 61 6b 06 52 65 78 1e 47 65 72 6d 61 |.speak.Rex.Germa|
00000050: 6e 20 53 68 65 70 68 65 72 64 0e 63 6f 6e 73 6f |n Shepherd.conso|
00000060: 6c 65 06 6c 6f 67 1a 41 6e 69 6d 61 6c 20 73 70 |le.log.Animal sp|
00000070: 65 61 6b 73 0a 62 72 65 65 64 12 44 6f 67 20 62 |eaks.breed.Dog b|
00000080: 61 72 6b 73 0d c8 03 00 00 00 00 00 0c 20 06 01 |arks......... ..|
00000090: a4 01 00 04 00 06 03 06 6b 04 ca 03 02 00 30 f0 |........k.....0.|
000000a0: 01 03 02 30 cc 03 02 02 30 f0 01 04 04 30 ce 03 |...0....0....0..|
000000b0: 00 0d ca 03 01 09 cc 03 03 09 08 ec 02 29 63 01 |.............)c.|
000000c0: 00 06 63 02 00 c1 00 58 e5 00 00 00 00 c2 01 56 |..c....X.......V|
000000d0: e8 00 00 00 00 c2 02 52 cd 0e d0 6b 02 00 e4 63 |.......R...k...c|
000000e0: 03 00 06 63 04 00 68 01 00 c1 03 58 e6 00 00 00 |...c..h....X....|
000000f0: 01 c2 04 56 e8 00 00 00 00 c2 05 52 5b 04 00 0e |...V.......R[...|
00000100: d2 6b 04 00 e5 68 02 00 11 04 e9 00 00 00 04 ea |.k...h..........|
00000110: 00 00 00 21 02 00 e3 68 00 00 43 e8 00 00 00 24 |...!...h..C....$|
00000120: 00 00 0e 06 2f c8 03 0e 00 00 00 2c 12 24 11 23 |..../......,.$.#|
00000130: 00 1c 16 1c 5d 1b 00 0c 42 07 01 00 01 01 01 03 |....]...B.......|
00000140: 01 00 1d 02 70 00 01 00 10 00 01 00 f0 01 02 0d |....p...........|
00000150: 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 0e c7 |..+h.......$....|
00000160: 39 38 00 00 00 15 44 38 00 00 00 0e 29 c8 03 06 |98....D8....)...|
00000170: 02 04 4e 08 07 18 00 0c 00 00 00 d0 03 00 02 00 |..N.............|
00000180: 03 00 00 19 02 10 00 00 10 ea 01 00 01 00 0c 04 |................|
00000190: cc 08 cb 39 eb 00 00 00 43 ec 00 00 00 04 ed 00 |...9....C.......|
000001a0: 00 00 24 01 00 0e 29 0c 00 00 00 00 00 02 00 02 |..$...).........|
000001b0: 00 00 0d 02 10 00 00 10 ea 01 00 01 00 0c 04 cc |................|
000001c0: 08 cb c7 06 4e 38 00 00 00 29 0c c6 07 01 00 02 |....N8...)......|
000001d0: 03 02 04 01 00 37 05 70 00 01 00 d2 03 00 01 00 |.....7.p........|
000001e0: e8 01 00 01 00 e6 01 00 01 00 10 00 02 00 f0 01 |................|
000001f0: 04 0d 0c 02 cb 0c 03 cc 63 02 00 2b c7 35 64 01 |........c..+.5d.|
00000200: 00 39 38 00 00 00 21 01 00 11 66 02 00 68 00 00 |.98...!...f..h..|
00000210: 11 ec 09 64 02 00 1b 24 00 00 0e 0e 0e 5a 02 00 |...d...$.....Z..|
00000220: d4 15 44 e9 00 00 00 0e 29 c8 03 0a 0b 04 35 08 |..D.....).....5.|
00000230: 1b 0c 8f 0b 11 1a 00 0c 00 00 00 d0 03 00 02 00 |................|
00000240: 03 00 00 26 02 10 00 00 10 ea 01 00 01 00 0c 04 |...&............|
00000250: cc 08 cb c7 c8 35 04 e8 00 00 00 48 24 00 00 0e |.....5.....H$...|
00000260: 39 eb 00 00 00 43 ec 00 00 00 04 ef 00 00 00 24 |9....C.........$|
00000270: 01 00 0e 29 0c 00 00 00 00 00 02 00 02 00 00 0d |...)............|
00000280: 02 10 00 00 10 ea 01 00 01 00 0c 04 cc 08 cb c7 |................|
00000290: 06 4e ee 00 00 00 29                            |.N....)|
```

### WASM
```
00000000: 05 0c 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 69 6e 68 65 72 69 74 61 6e 63 65 |lass-inheritance|
00000030: 2e 6a 73 0c 41 6e 69 6d 61 6c 06 44 6f 67 02 64 |.js.Animal.Dog.d|
00000040: 0a 73 70 65 61 6b 06 52 65 78 1e 47 65 72 6d 61 |.speak.Rex.Germa|
00000050: 6e 20 53 68 65 70 68 65 72 64 0e 63 6f 6e 73 6f |n Shepherd.conso|
00000060: 6c 65 06 6c 6f 67 1a 41 6e 69 6d 61 6c 20 73 70 |le.log.Animal sp|
00000070: 65 61 6b 73 0a 62 72 65 65 64 12 44 6f 67 20 62 |eaks.breed.Dog b|
00000080: 61 72 6b 73 0d c8 03 00 00 00 00 00 0c 20 06 01 |arks......... ..|
00000090: a4 01 00 04 00 04 03 06 68 04 ca 03 02 00 30 f0 |........h.....0.|
000000a0: 01 03 01 70 cc 03 04 00 30 f0 01 05 03 70 ca 03 |...p....0....p..|
000000b0: 00 09 cc 03 01 09 ce 03 02 0d 08 ec 02 29 63 00 |.............)c.|
000000c0: 00 06 63 01 00 c1 00 58 e5 00 00 00 00 c2 01 56 |..c....X.......V|
000000d0: e8 00 00 00 00 c2 02 52 cc 0e cf 6b 01 00 e3 63 |.......R...k...c|
000000e0: 02 00 68 00 00 63 03 00 c1 03 58 e6 00 00 00 01 |..h..c....X.....|
000000f0: c2 04 56 e8 00 00 00 00 c2 05 52 ce 0e d1 6b 03 |..V.......R...k.|
00000100: 00 e4 68 01 00 11 04 e9 00 00 00 04 ea 00 00 00 |..h.............|
00000110: 21 02 00 e5 68 02 00 43 e8 00 00 00 24 00 00 0e |!...h..C....$...|
00000120: 06 2f c8 03 12 00 00 00 28 12 24 00 20 16 07 48 |./......(.$. ..H|
00000130: 06 17 21 11 02 1b 0c 00 0c 42 07 01 00 01 01 01 |..!......B......|
00000140: 02 01 00 17 02 70 00 01 00 10 00 01 00 f0 01 01 |.....p..........|
00000150: 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 0e |...+h.......$...|
00000160: c7 d3 44 38 00 00 00 29 c8 03 06 02 04 4e 08 07 |..D8...).....N..|
00000170: 18 00 0c 42 07 01 00 00 00 00 03 00 00 13 00 39 |...B...........9|
00000180: eb 00 00 00 43 ec 00 00 00 04 ed 00 00 00 24 01 |....C.........$.|
00000190: 00 29 c8 03 08 05 04 03 08 1b 0e 34 08 00 0c 48 |.).........4...H|
000001a0: 05 01 00 00 02 00 02 00 00 0f 02 10 00 01 00 ea |................|
000001b0: 01 00 01 00 0c 04 cc 08 cb ee 01 c7 06 4e 38 00 |.............N8.|
000001c0: 00 00 29 c8 03 02 00 00 00 0c c6 07 01 00 02 03 |..).............|
000001d0: 02 03 01 00 31 05 70 00 01 00 dc 03 00 01 00 e8 |....1.p.........|
000001e0: 01 00 01 00 e6 01 00 01 00 10 00 01 20 f0 01 03 |............ ...|
000001f0: 0d 0c 02 cb 0c 03 cc 63 02 00 2b c7 35 c8 d3 21 |.......c..+.5..!|
00000200: 01 00 11 66 02 00 68 00 00 11 ec 08 64 02 00 1b |...f..h.....d...|
00000210: 24 00 00 0e 0e 64 02 00 d4 44 ee 00 00 00 67 02 |$....d...D....g.|
00000220: 00 28 c8 03 0c 0b 04 35 08 11 0c 07 01 71 09 11 |.(.....5.....q..|
00000230: 1a 00 0c 4a 07 01 00 00 02 00 03 00 00 25 02 10 |...J.........%..|
00000240: 00 01 00 ea 01 00 01 00 0c 04 cc 08 cb c7 c8 35 |...............5|
00000250: 04 e8 00 00 00 48 24 00 00 0e 39 eb 00 00 00 43 |.....H$...9....C|
00000260: ec 00 00 00 04 ef 00 00 00 24 01 00 29 c8 03 0e |.........$..)...|
00000270: 0f 04 1c 08 11 0a 20 0c 17 15 1b 0e 34 08 00 0c |...... .....4...|
00000280: 48 05 01 00 00 02 00 02 00 00 0f 02 10 00 01 00 |H...............|
00000290: ea 01 00 01 00 0c 04 cc 08 cb ee 01 c7 06 4e ee |..............N.|
000002a0: 00 00 00 29 c8 03 02 00 00 00                   |...)......|
```