# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-inheritance.ts
**生成时间**: 2025-12-06T02:09:56.291Z

## 大小对比

- TypeScript编译器: 634 字节
- WASM编译器: 591 字节
- 差异: 43 字节 (7.28%)

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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bark",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 75
    },
    {
      "index": 7,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 79
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 95
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 103
    },
    {
      "index": 10,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Woof! ",
      "offset": 107
    },
    {
      "index": 11,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "breed",
      "offset": 114
    },
    {
      "index": 12,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "this.active_func",
      "offset": 120
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "new.target",
      "offset": 137
    }
  ],
  "functionHeader": {
    "offset": 148,
    "tag": "0xd",
    "remaining": 486
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bark",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Rex",
      "offset": 75
    },
    {
      "index": 7,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "German Shepherd",
      "offset": 79
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 95
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 103
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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Woof! ",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 120,
    "tag": "0xd",
    "remaining": 471
  }
}
```

## 字节级差异

共发现 477 个字节差异:

- 偏移量 0x1: TS=0x0e vs WASM=0x0c
- 偏移量 0x6b: TS=0x0c vs WASM=0x0a
- 偏移量 0x6c: TS=0x57 vs WASM=0x62
- 偏移量 0x6d: TS=0x6f vs WASM=0x72
- 偏移量 0x6e: TS=0x6f vs WASM=0x65
- 偏移量 0x6f: TS=0x66 vs WASM=0x65
- 偏移量 0x70: TS=0x21 vs WASM=0x64
- 偏移量 0x71: TS=0x20 vs WASM=0x0c
- 偏移量 0x72: TS=0x0a vs WASM=0x57
- 偏移量 0x73: TS=0x62 vs WASM=0x6f
- 偏移量 0x74: TS=0x72 vs WASM=0x6f
- 偏移量 0x75: TS=0x65 vs WASM=0x66
- 偏移量 0x76: TS=0x65 vs WASM=0x21
- 偏移量 0x77: TS=0x64 vs WASM=0x20
- 偏移量 0x78: TS=0x20 vs WASM=0x0d
- 偏移量 0x79: TS=0x74 vs WASM=0xc8
- 偏移量 0x7a: TS=0x68 vs WASM=0x03
- 偏移量 0x7b: TS=0x69 vs WASM=0x00
- 偏移量 0x7c: TS=0x73 vs WASM=0x00
- 偏移量 0x7d: TS=0x2e vs WASM=0x00
- ... (显示前20个差异，总共477个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0e 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 69 6e 68 65 72 69 74 61 6e 63 65 |lass-inheritance|
00000030: 2e 6a 73 0c 41 6e 69 6d 61 6c 06 44 6f 67 02 64 |.js.Animal.Dog.d|
00000040: 0a 73 70 65 61 6b 08 62 61 72 6b 06 52 65 78 1e |.speak.bark.Rex.|
00000050: 47 65 72 6d 61 6e 20 53 68 65 70 68 65 72 64 0e |German Shepherd.|
00000060: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 57 6f 6f 66 |console.log.Woof|
00000070: 21 20 0a 62 72 65 65 64 20 74 68 69 73 2e 61 63 |! .breed this.ac|
00000080: 74 69 76 65 5f 66 75 6e 63 14 6e 65 77 2e 74 61 |tive_func.new.ta|
00000090: 72 67 65 74 0d c8 03 00 00 00 00 00 0c 20 06 01 |rget......... ..|
000000a0: a4 01 00 00 00 03 01 06 6f 00 ce 03 04 0d 08 ec |........o.......|
000000b0: 02 29 06 02 01 00 00 00 58 e5 00 00 00 00 c2 00 |.)......X.......|
000000c0: 56 e8 00 00 00 00 03 02 00 00 00 52 5b 01 00 0e |V..........R[...|
000000d0: 11 e3 51 c7 02 04 00 00 00 58 e6 00 00 00 01 c2 |..Q......X......|
000000e0: 03 56 e9 00 00 00 00 03 05 00 00 00 52 5b 03 00 |.V..........R[..|
000000f0: 0e 11 e5 51 c9 04 ea 00 00 00 04 eb 00 00 00 21 |...Q...........!|
00000100: 02 00 e3 68 00 00 43 e8 00 00 00 24 00 00 0e 68 |...h..C....$...h|
00000110: 00 00 43 e9 00 00 00 24 00 00 0e 06 2f c8 03 00 |..C....$..../...|
00000120: 0e 00 25 0a 12 00 21 0b 7c 07 04 1b 07 30 67 00 |..%...!.|....0g.|
00000130: 0c 42 06 00 d0 03 00 01 00 03 00 00 15 01 10 00 |.B..............|
00000140: 00 00 39 ec 00 00 00 43 ed 00 00 00 c7 42 38 00 |..9....C.....B8.|
00000150: 00 00 24 01 00 0e 29 c8 03 04 04 04 03 34 0c 00 |..$...)......4..|
00000160: 0c 42 06 00 ca 03 01 01 01 03 00 00 1f 02 70 00 |.B............p.|
00000170: 00 00 10 00 00 00 08 cb 2b 39 78 00 00 00 11 6c |........+9x....l|
00000180: 0a 00 00 00 c7 1b 24 00 00 0e 0e d3 d3 c7 1b 44 |......$........D|
00000190: 38 00 00 00 29 c8 03 01 04 6d 03 0c 74 00 0c 00 |8...)....m..t...|
000001a0: 04 00 00 00 01 00 03 00 00 08 01 10 00 00 00 c7 |................|
000001b0: 06 4e 38 00 00 00 29 c8 03 00 00 00 0c 42 06 00 |.N8...)......B..|
000001c0: d2 03 00 01 00 03 00 00 1b 01 10 00 00 00 39 ec |..............9.|
000001d0: 00 00 00 43 ed 00 00 00 04 ee 00 00 00 c7 42 ef |...C..........B.|
000001e0: 00 00 00 9f 24 01 00 0e 29 c8 03 0f 06 04 03 34 |....$...)......4|
000001f0: 0c 1b 0b 00 0c 46 06 00 cc 03 02 03 02 03 01 00 |.....F..........|
00000200: 32 05 70 00 00 00 de 03 00 00 00 e0 03 00 00 00 |2.p.............|
00000210: e2 03 00 00 00 10 00 00 00 f0 01 01 01 0c 02 cb |................|
00000220: 0c 03 cc 63 02 00 2b c7 35 c8 d3 21 01 00 11 66 |...c..+.5..!...f|
00000230: 02 00 df 11 6c 0a 00 00 00 c9 1b 24 00 00 0e 0e |....l......$....|
00000240: 0e 0e d4 d4 c9 1b 44 ef 00 00 00 67 02 00 28 c8 |......D....g..(.|
00000250: 03 0b 08 36 76 11 06 7b 07 0c 73 00 0c 00 04 00 |...6v..{..s.....|
00000260: 00 00 01 00 03 00 00 08 01 10 00 00 00 c7 06 4e |...............N|
00000270: ef 00 00 00 29 c8 03 00 00 00                   |....).....|
```

### WASM
```
00000000: 05 0c 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 69 6e 68 65 72 69 74 61 6e 63 65 |lass-inheritance|
00000030: 2e 6a 73 0c 41 6e 69 6d 61 6c 06 44 6f 67 02 64 |.js.Animal.Dog.d|
00000040: 0a 73 70 65 61 6b 08 62 61 72 6b 06 52 65 78 1e |.speak.bark.Rex.|
00000050: 47 65 72 6d 61 6e 20 53 68 65 70 68 65 72 64 0e |German Shepherd.|
00000060: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0a 62 72 65 65 |console.log.bree|
00000070: 64 0c 57 6f 6f 66 21 20 0d c8 03 00 00 00 00 00 |d.Woof! ........|
00000080: 0c 20 06 01 a4 01 00 04 00 04 03 04 70 04 ca 03 |. ..........p...|
00000090: 02 00 30 f0 01 03 01 70 cc 03 04 00 30 f0 01 05 |..0....p....0...|
000000a0: 03 70 ca 03 00 09 cc 03 01 09 ce 03 02 0d 08 ec |.p..............|
000000b0: 02 29 63 00 00 06 63 01 00 c1 00 58 e5 00 00 00 |.)c...c....X....|
000000c0: 00 c2 01 56 e8 00 00 00 00 06 cc 0e cf 6b 01 00 |...V.........k..|
000000d0: e3 63 02 00 68 00 00 63 03 00 c1 02 58 e6 00 00 |.c..h..c....X...|
000000e0: 00 01 c2 03 56 e9 00 00 00 00 06 ce 0e d1 6b 03 |....V.........k.|
000000f0: 00 e4 68 01 00 11 04 ea 00 00 00 04 eb 00 00 00 |..h.............|
00000100: 21 02 00 e5 68 02 00 43 e8 00 00 00 24 00 00 0e |!...h..C....$...|
00000110: 68 02 00 43 e9 00 00 00 24 00 00 0e 06 2f c8 03 |h..C....$..../..|
00000120: 18 00 00 00 26 10 24 00 1e 12 07 48 06 17 21 11 |....&.$....H..!.|
00000130: 02 1b 0c 17 0d 11 02 1b 0a 00 0c 42 07 01 00 01 |...........B....|
00000140: 01 01 02 01 00 17 02 70 00 01 00 10 00 01 00 f0 |.......p........|
00000150: 01 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 |.....+h.......$.|
00000160: 00 0e c7 d3 44 38 00 00 00 29 c8 03 06 01 04 4e |....D8...).....N|
00000170: 08 07 18 00 0c 42 07 01 00 00 01 00 03 00 00 16 |.....B..........|
00000180: 01 10 00 01 00 08 cb 39 ec 00 00 00 43 ed 00 00 |.......9....C...|
00000190: 00 c7 42 38 00 00 00 24 01 00 29 c8 03 0a 04 04 |..B8...$..).....|
000001a0: 0d 08 1b 0e 20 12 1b 09 00 0c c6 07 01 00 02 03 |.... ...........|
000001b0: 02 03 01 00 31 05 70 00 01 00 dc 03 00 01 00 e8 |....1.p.........|
000001c0: 01 00 01 00 e6 01 00 01 00 10 00 01 20 f0 01 03 |............ ...|
000001d0: 0d 0c 02 cb 0c 03 cc 63 02 00 2b c7 35 c8 d3 21 |.......c..+.5..!|
000001e0: 01 00 11 66 02 00 68 00 00 11 ec 08 64 02 00 1b |...f..h.....d...|
000001f0: 24 00 00 0e 0e 64 02 00 d4 44 ee 00 00 00 67 02 |$....d...D....g.|
00000200: 00 28 c8 03 0c 09 04 35 08 11 0c 07 01 71 09 11 |.(.....5.....q..|
00000210: 1a 00 0c 42 07 01 00 00 01 00 04 00 00 1c 01 10 |...B............|
00000220: 00 01 00 08 cb 39 ec 00 00 00 43 ed 00 00 00 04 |.....9....C.....|
00000230: ef 00 00 00 c7 42 ee 00 00 00 9f 24 01 00 29 c8 |.....B.....$..).|
00000240: 03 0c 0d 04 0d 08 1b 0e 39 28 1b 0b 07 13 00    |........9(.....|
```