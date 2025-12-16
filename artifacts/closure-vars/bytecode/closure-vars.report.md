# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-vars.ts
**生成时间**: 2025-12-16T14:11:02.463Z

## 大小对比

- TypeScript编译器: 584 字节
- WASM编译器: 365 字节
- 差异: 219 字节 (60.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "testClosure",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-vars.js",
      "offset": 14
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 57
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xc",
    "remaining": 517
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "testClosure",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-vars.js",
      "offset": 14
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 57
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 290
  }
}
```

## 字节级差异

共发现 451 个字节差异:

- 偏移量 0x1: TS=0x08 vs WASM=0x09
- 偏移量 0x3f: TS=0x06 vs WASM=0x0e
- 偏移量 0x40: TS=0x6c vs WASM=0x63
- 偏移量 0x42: TS=0x67 vs WASM=0x6e
- 偏移量 0x43: TS=0x0c vs WASM=0x73
- 偏移量 0x44: TS=0x00 vs WASM=0x6f
- 偏移量 0x45: TS=0x06 vs WASM=0x6c
- 偏移量 0x46: TS=0x00 vs WASM=0x65
- 偏移量 0x47: TS=0xa4 vs WASM=0x06
- 偏移量 0x48: TS=0x01 vs WASM=0x6c
- 偏移量 0x49: TS=0x00 vs WASM=0x6f
- 偏移量 0x4a: TS=0x01 vs WASM=0x67
- 偏移量 0x4b: TS=0x00 vs WASM=0x0c
- 偏移量 0x4c: TS=0x01 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=0x06
- 偏移量 0x4e: TS=0x01 vs WASM=0x00
- 偏移量 0x4f: TS=0x1e vs WASM=0xa4
- 偏移量 0x51: TS=0xa6 vs WASM=0x00
- 偏移量 0x54: TS=0x00 vs WASM=0x01
- 偏移量 0x56: TS=0xc2 vs WASM=0x01
- ... (显示前20个差异，总共451个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 16 74 65 73 74 43 6c 6f 73 75 72 65 44 5f |...testClosureD_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 63 6c 6f 73 75 72 65 2d 76 61 72 73 2e 6a |s/closure-vars.j|
00000030: 73 02 61 02 62 02 63 02 64 0a 69 6e 6e 65 72 06 |s.a.b.c.d.inner.|
00000040: 6c 6f 67 0c 00 06 00 a4 01 00 01 00 01 00 01 1e |log.............|
00000050: 01 a6 01 00 00 00 c2 00 41 e4 00 00 00 00 c2 00 |........A.......|
00000060: 3b e4 00 00 00 c2 00 3b e4 00 00 00 39 e4 00 00 |;......;....9...|
00000070: 00 f0 cf 28 ca 03 06 00 00 00 16 20 00 00 0c 43 |...(....... ...C|
00000080: 06 00 c8 03 00 05 00 00 00 01 82 01 05 cc 03 01 |................|
00000090: 00 20 ce 03 01 01 20 d0 03 01 02 30 d2 03 00 00 |. .... ....0....|
000000a0: 00 d4 03 00 04 00 b6 01 00 c8 25 00 00 00 01 01 |..........%.....|
000000b0: 00 00 00 c8 21 00 00 00 bf e6 00 00 00 01 00 c8 |....!...........|
000000c0: 34 00 00 00 01 02 00 00 00 c8 30 00 00 00 bf e7 |4.........0.....|
000000d0: 00 00 00 01 00 c8 45 00 00 00 01 03 00 00 00 c8 |......E.........|
000000e0: 41 00 00 00 bf e8 00 00 00 01 00 c8 54 00 00 00 |A...........T...|
000000f0: 01 04 00 00 00 c8 50 00 00 00 bb e9 00 00 00 01 |......P.........|
00000100: 00 c8 5b 00 00 00 03 00 00 00 00 bf ea 00 00 00 |..[.............|
00000110: 01 00 c8 05 01 00 00 c8 05 01 00 00 ba ea 00 00 |................|
00000120: 00 01 00 22 00 00 0e 29 ca 03 00 00 0c 43 06 00 |..."...).....C..|
00000130: d4 03 00 00 00 00 00 00 89 02 00 b6 01 00 c8 76 |...............v|
00000140: 00 00 00 c8 76 00 00 00 ba eb 00 00 00 01 00 43 |....v..........C|
00000150: eb 00 00 00 c8 82 00 00 00 ba e6 00 00 00 01 00 |................|
00000160: c8 76 00 00 00 24 01 00 0e c8 8e 00 00 00 c8 8e |.v...$..........|
00000170: 00 00 00 ba eb 00 00 00 01 00 43 ec 00 00 00 c8 |..........C.....|
00000180: 9a 00 00 00 ba e7 00 00 00 01 00 c8 8e 00 00 00 |................|
00000190: 24 01 00 0e c8 a6 00 00 00 c8 a6 00 00 00 ba eb |$...............|
000001a0: 00 00 00 01 00 43 ec 00 00 00 c8 b2 00 00 00 ba |.....C..........|
000001b0: e8 00 00 00 01 00 c8 a6 00 00 00 24 01 00 0e c8 |...........$....|
000001c0: be 00 00 00 c8 be 00 00 00 ba eb 00 00 00 01 00 |................|
000001d0: 43 ec 00 00 00 c8 ca 00 00 00 ba e9 00 00 00 01 |C...............|
000001e0: 00 c8 be 00 00 00 24 01 00 0e c8 d6 00 00 00 c8 |......$.........|
000001f0: d6 00 00 00 bd e6 00 00 00 00 00 00 00 01 00 3d |...............=|
00000200: 93 b8 00 00 00 00 19 3e 0e c8 e3 00 00 00 c8 e3 |.......>........|
00000210: 00 00 00 c8 e7 00 00 00 01 0a 00 00 00 11 bb e7 |................|
00000220: 00 00 00 01 00 0e c8 f3 00 00 00 c8 f3 00 00 00 |................|
00000230: c8 f7 00 00 00 01 14 00 00 00 11 bb e9 00 00 00 |................|
00000240: 01 00 0e 29 ca 03 00 00                         |...)....|
```

### WASM
```
00000000: 05 09 16 74 65 73 74 43 6c 6f 73 75 72 65 44 5f |...testClosureD_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 63 6c 6f 73 75 72 65 2d 76 61 72 73 2e 6a |s/closure-vars.j|
00000030: 73 02 61 02 62 02 63 02 64 0a 69 6e 6e 65 72 0e |s.a.b.c.d.inner.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 00 06 00 a4 |console.log.....|
00000050: 01 00 01 00 01 00 01 16 01 a6 01 00 00 00 40 e4 |..............@.|
00000060: 00 00 00 40 c2 00 41 e4 00 00 00 00 39 e4 00 00 |...@..A.....9...|
00000070: 00 f0 cf 28 ca 03 08 00 00 00 0e 20 00 1b 16 00 |...(....... ....|
00000080: 0c 43 06 00 c8 03 00 05 00 01 00 01 19 05 cc 03 |.C..............|
00000090: 01 00 60 ce 03 01 01 60 d0 03 01 02 70 d2 03 00 |..`....`....p...|
000000a0: 00 40 d4 03 00 04 00 c2 00 c5 04 63 02 00 63 01 |.@.........c..c.|
000000b0: 00 63 00 00 b8 cb b9 cc ba cd bb ce c4 04 f0 29 |.c.............)|
000000c0: ca 03 08 00 00 00 15 1c 08 0c 0a 00 0c 43 06 00 |.............C..|
000000d0: d4 03 00 00 00 03 04 00 55 00 cc 03 00 09 ce 03 |........U.......|
000000e0: 01 09 d0 03 02 0d d2 03 03 01 39 eb 00 00 00 43 |..........9....C|
000000f0: ec 00 00 00 68 00 00 24 01 00 0e 39 eb 00 00 00 |....h..$...9....|
00000100: 43 ec 00 00 00 68 01 00 24 01 00 0e 39 eb 00 00 |C....h..$...9...|
00000110: 00 43 ec 00 00 00 68 02 00 24 01 00 0e 39 eb 00 |.C....h..$...9..|
00000120: 00 00 43 ec 00 00 00 e2 24 01 00 0e 68 00 00 93 |..C.....$...h...|
00000130: 69 00 00 0e bf 0a 11 69 01 00 0e bf 14 e6 29 ca |i......i......).|
00000140: 03 2a 05 04 03 08 1b 0e 1b 0a 11 01 17 15 1b 0e |.*..............|
00000150: 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 17 15 1b 0e |................|
00000160: 1b 0a 07 01 17 15 11 02 1c 01 26 00 00          |..........&..|
```