# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_date_parse.ts
**生成时间**: 2026-01-07T15:10:24.996Z

## 大小对比

- TypeScript编译器: 774 字节
- WASM编译器: 774 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 19,
  "atoms": [
    {
      "index": 0,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "date_parse",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_date_parse.js",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x0",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dx",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x1",
      "offset": 61
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x2",
      "offset": 64
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x3",
      "offset": 67
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d0",
      "offset": 70
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d1",
      "offset": 73
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d2",
      "offset": 76
    },
    {
      "index": 12,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d3",
      "offset": 79
    },
    {
      "index": 13,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "parse",
      "offset": 82
    },
    {
      "index": 14,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toISOString",
      "offset": 88
    },
    {
      "index": 15,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toGMTString",
      "offset": 100
    },
    {
      "index": 16,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 112
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 120
    },
    {
      "index": 18,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "Date.parse error for ",
      "offset": 124
    }
  ],
  "functionHeader": {
    "offset": 146,
    "tag": "0xc",
    "remaining": 628
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 19,
  "atoms": [
    {
      "index": 0,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "date_parse",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_date_parse.js",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x0",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dx",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x1",
      "offset": 61
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x2",
      "offset": 64
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "x3",
      "offset": 67
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d0",
      "offset": 70
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d1",
      "offset": 73
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d2",
      "offset": 76
    },
    {
      "index": 12,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "d3",
      "offset": 79
    },
    {
      "index": 13,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "parse",
      "offset": 82
    },
    {
      "index": 14,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toISOString",
      "offset": 88
    },
    {
      "index": 15,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toGMTString",
      "offset": 100
    },
    {
      "index": 16,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 112
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 120
    },
    {
      "index": 18,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "Date.parse error for ",
      "offset": 124
    }
  ],
  "functionHeader": {
    "offset": 146,
    "tag": "0xc",
    "remaining": 628
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 13 14 64 61 74 65 5f 70 61 72 73 65 4a 5f 5f |...date_parseJ__|
00000010: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000020: 2f 74 65 73 74 5f 64 61 74 65 5f 70 61 72 73 65 |/test_date_parse|
00000030: 2e 6a 73 02 6e 04 78 30 04 64 78 02 6a 04 78 31 |.js.n.x0.dx.j.x1|
00000040: 04 78 32 04 78 33 04 64 30 04 64 31 04 64 32 04 |.x2.x3.d0.d1.d2.|
00000050: 64 33 0a 70 61 72 73 65 16 74 6f 49 53 4f 53 74 |d3.parse.toISOSt|
00000060: 72 69 6e 67 16 74 6f 47 4d 54 53 74 72 69 6e 67 |ring.toGMTString|
00000070: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 2a 44 61 74 |.console.log*Dat|
00000080: 65 2e 70 61 72 73 65 20 65 72 72 6f 72 20 66 6f |e.parse error fo|
00000090: 72 20 0c 00 06 00 a4 01 00 01 00 01 00 01 10 01 |r ..............|
000000a0: a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 00 |.....@....@..A..|
000000b0: 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 06 00 c8 |....(.......C...|
000000c0: 03 01 0a 01 04 00 02 b2 02 0b cc 03 00 01 00 ce |................|
000000d0: 03 00 00 00 d0 03 00 01 00 d2 03 00 02 00 d4 03 |................|
000000e0: 00 03 00 d6 03 00 04 00 d8 03 00 05 00 da 03 00 |................|
000000f0: 06 00 dc 03 00 07 00 de 03 00 08 00 e0 03 00 09 |................|
00000100: 00 b7 cb b7 cc b7 cd c9 d3 a5 6c 24 01 00 00 c7 |..........l$....|
00000110: c7 c0 e8 03 9e a0 ce c7 8e c5 04 ca 8e c5 05 39 |...............9|
00000120: a7 00 00 00 11 c7 21 01 00 c5 06 39 a7 00 00 00 |......!....9....|
00000130: 11 ca 21 01 00 c5 07 39 a7 00 00 00 11 c4 04 21 |..!....9.......!|
00000140: 01 00 c5 08 39 a7 00 00 00 11 c4 05 21 01 00 c5 |....9.......!...|
00000150: 09 39 a7 00 00 00 43 f1 00 00 00 c4 06 43 f2 00 |.9....C......C..|
00000160: 00 00 24 00 00 24 01 00 c7 ac 11 6d 95 00 00 00 |..$..$.....m....|
00000170: 0e 39 a7 00 00 00 43 f1 00 00 00 c4 07 43 f3 00 |.9....C......C..|
00000180: 00 00 24 00 00 24 01 00 ca ac 11 ed 75 0e 39 a7 |..$..$......u.9.|
00000190: 00 00 00 43 f1 00 00 00 c4 07 43 39 00 00 00 24 |...C......C9...$|
000001a0: 00 00 24 01 00 ca ac 11 ed 58 0e 39 a7 00 00 00 |..$......X.9....|
000001b0: 43 f1 00 00 00 c4 08 43 f2 00 00 00 24 00 00 24 |C......C....$..$|
000001c0: 01 00 c4 04 ac 11 ed 3a 0e 39 a7 00 00 00 43 f1 |.......:.9....C.|
000001d0: 00 00 00 c4 09 43 f3 00 00 00 24 00 00 24 01 00 |.....C....$..$..|
000001e0: c4 05 ac 11 ed 1c 0e 39 a7 00 00 00 43 f1 00 00 |.......9....C...|
000001f0: 00 c4 09 43 39 00 00 00 24 00 00 24 01 00 c4 05 |...C9...$..$....|
00000200: ac ec 18 39 f4 00 00 00 43 f5 00 00 00 04 f6 00 |...9....C.......|
00000210: 00 00 c7 9f 24 01 00 0e b6 28 c8 c1 00 9c b8 9f |....$....(......|
00000220: b7 a3 cc c7 c8 9f c1 01 9e cb 95 02 ef da fe d3 |................|
00000230: bd 9c 28 ca 03 bc 01 1b 00 19 12 0c 0e 07 08 07 |..(.............|
00000240: 03 21 01 07 0a 16 06 07 09 0d 03 07 01 12 02 07 |.!..............|
00000250: 01 12 08 20 0a 07 01 1c 07 20 0a 07 01 1c 07 20 |... ..... ..... |
00000260: 0a 0c 01 1c 07 20 0a 0c 01 1c 19 1b 08 1b 0e 0c |..... ..........|
00000270: 04 1b 18 11 1d 11 2c 07 05 2b 33 1b 08 1b 0e 0c |......,..+3.....|
00000280: 04 1b 18 11 1d 11 2c 07 05 1c 39 1b 08 1b 0e 0c |......,...9.....|
00000290: 04 1b 12 11 17 11 26 07 05 1c 33 1b 08 1b 0e 0c |......&...3.....|
000002a0: 04 1b 18 11 1d 11 2c 0c 05 1c 39 1b 08 1b 0e 0c |......,...9.....|
000002b0: 04 1b 18 11 1d 11 2c 0c 05 1c 39 1b 08 1b 0e 0c |......,...9.....|
000002c0: 04 1b 12 11 17 11 26 0c 05 12 39 1b 0e 34 3e 07 |......&...9..4>.|
000002d0: 03 07 31 17 07 07 0d 09 04 11 06 0c 0c 0c 0a 0d |..1.............|
000002e0: 1b 07 0a 07 03 11 0c 00 02 23 02 00 05 28 19 0c |.........#...(..|
000002f0: 04 07 11 00 06 9a 99 99 99 99 99 f1 3f 06 00 00 |............?...|
00000300: dc c2 08 b2 3e 43                               |....>C|
```

### WASM
```
00000000: 05 13 14 64 61 74 65 5f 70 61 72 73 65 4a 5f 5f |...date_parseJ__|
00000010: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000020: 2f 74 65 73 74 5f 64 61 74 65 5f 70 61 72 73 65 |/test_date_parse|
00000030: 2e 6a 73 02 6e 04 78 30 04 64 78 02 6a 04 78 31 |.js.n.x0.dx.j.x1|
00000040: 04 78 32 04 78 33 04 64 30 04 64 31 04 64 32 04 |.x2.x3.d0.d1.d2.|
00000050: 64 33 0a 70 61 72 73 65 16 74 6f 49 53 4f 53 74 |d3.parse.toISOSt|
00000060: 72 69 6e 67 16 74 6f 47 4d 54 53 74 72 69 6e 67 |ring.toGMTString|
00000070: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 2a 44 61 74 |.console.log*Dat|
00000080: 65 2e 70 61 72 73 65 20 65 72 72 6f 72 20 66 6f |e.parse error fo|
00000090: 72 20 0c 00 06 00 a4 01 00 01 00 01 00 01 10 01 |r ..............|
000000a0: a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 00 |.....@....@..A..|
000000b0: 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 06 00 c8 |....(.......C...|
000000c0: 03 01 0a 01 04 00 02 b2 02 0b cc 03 00 01 00 ce |................|
000000d0: 03 00 00 00 d0 03 00 01 00 d2 03 00 02 00 d4 03 |................|
000000e0: 00 03 00 d6 03 00 04 00 d8 03 00 05 00 da 03 00 |................|
000000f0: 06 00 dc 03 00 07 00 de 03 00 08 00 e0 03 00 09 |................|
00000100: 00 b7 cb b7 cc b7 cd c9 d3 a5 6c 24 01 00 00 c7 |..........l$....|
00000110: c7 c0 e8 03 9e a0 ce c7 8e c5 04 ca 8e c5 05 39 |...............9|
00000120: a7 00 00 00 11 c7 21 01 00 c5 06 39 a7 00 00 00 |......!....9....|
00000130: 11 ca 21 01 00 c5 07 39 a7 00 00 00 11 c4 04 21 |..!....9.......!|
00000140: 01 00 c5 08 39 a7 00 00 00 11 c4 05 21 01 00 c5 |....9.......!...|
00000150: 09 39 a7 00 00 00 43 f1 00 00 00 c4 06 43 f2 00 |.9....C......C..|
00000160: 00 00 24 00 00 24 01 00 c7 ac 11 6d 95 00 00 00 |..$..$.....m....|
00000170: 0e 39 a7 00 00 00 43 f1 00 00 00 c4 07 43 f3 00 |.9....C......C..|
00000180: 00 00 24 00 00 24 01 00 ca ac 11 ed 75 0e 39 a7 |..$..$......u.9.|
00000190: 00 00 00 43 f1 00 00 00 c4 07 43 39 00 00 00 24 |...C......C9...$|
000001a0: 00 00 24 01 00 ca ac 11 ed 58 0e 39 a7 00 00 00 |..$......X.9....|
000001b0: 43 f1 00 00 00 c4 08 43 f2 00 00 00 24 00 00 24 |C......C....$..$|
000001c0: 01 00 c4 04 ac 11 ed 3a 0e 39 a7 00 00 00 43 f1 |.......:.9....C.|
000001d0: 00 00 00 c4 09 43 f3 00 00 00 24 00 00 24 01 00 |.....C....$..$..|
000001e0: c4 05 ac 11 ed 1c 0e 39 a7 00 00 00 43 f1 00 00 |.......9....C...|
000001f0: 00 c4 09 43 39 00 00 00 24 00 00 24 01 00 c4 05 |...C9...$..$....|
00000200: ac ec 18 39 f4 00 00 00 43 f5 00 00 00 04 f6 00 |...9....C.......|
00000210: 00 00 c7 9f 24 01 00 0e b6 28 c8 c1 00 9c b8 9f |....$....(......|
00000220: b7 a3 cc c7 c8 9f c1 01 9e cb 95 02 ef da fe d3 |................|
00000230: bd 9c 28 ca 03 bc 01 1b 00 19 12 0c 0e 07 08 07 |..(.............|
00000240: 03 21 01 07 0a 16 06 07 09 0d 03 07 01 12 02 07 |.!..............|
00000250: 01 12 08 20 0a 07 01 1c 07 20 0a 07 01 1c 07 20 |... ..... ..... |
00000260: 0a 0c 01 1c 07 20 0a 0c 01 1c 19 1b 08 1b 0e 0c |..... ..........|
00000270: 04 1b 18 11 1d 11 2c 07 05 2b 33 1b 08 1b 0e 0c |......,..+3.....|
00000280: 04 1b 18 11 1d 11 2c 07 05 1c 39 1b 08 1b 0e 0c |......,...9.....|
00000290: 04 1b 12 11 17 11 26 07 05 1c 33 1b 08 1b 0e 0c |......&...3.....|
000002a0: 04 1b 18 11 1d 11 2c 0c 05 1c 39 1b 08 1b 0e 0c |......,...9.....|
000002b0: 04 1b 18 11 1d 11 2c 0c 05 1c 39 1b 08 1b 0e 0c |......,...9.....|
000002c0: 04 1b 12 11 17 11 26 0c 05 12 39 1b 0e 34 3e 07 |......&...9..4>.|
000002d0: 03 07 31 17 07 07 0d 09 04 11 06 0c 0c 0c 0a 0d |..1.............|
000002e0: 1b 07 0a 07 03 11 0c 00 02 23 02 00 05 28 19 0c |.........#...(..|
000002f0: 04 07 11 00 06 9a 99 99 99 99 99 f1 3f 06 00 00 |............?...|
00000300: dc c2 08 b2 3e 43                               |....>C|
```