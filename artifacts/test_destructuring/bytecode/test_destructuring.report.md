# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_destructuring.ts
**生成时间**: 2026-01-06T16:10:40.468Z

## 大小对比

- TypeScript编译器: 548 字节
- WASM编译器: 548 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_destructuring",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_destructuring.js",
      "offset": 28
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 76
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 88
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 112
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 114
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 127
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 130
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 132
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 134
    }
  ],
  "functionHeader": {
    "offset": 136,
    "tag": "0xc",
    "remaining": 412
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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_destructuring",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_destructuring.js",
      "offset": 28
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 76
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 88
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 112
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 114
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 127
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 130
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 132
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 134
    }
  ],
  "functionHeader": {
    "offset": 136,
    "tag": "0xc",
    "remaining": 412
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0d 0c 61 73 73 65 72 74 24 74 65 73 74 5f 64 |...assert$test_d|
00000010: 65 73 74 72 75 63 74 75 72 69 6e 67 50 5f 5f 74 |estructuringP__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 65 73 74 5f 64 65 73 74 72 75 63 74 75 72 69 |test_destructuri|
00000040: 6e 67 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 70 |ng.js.actual.exp|
00000050: 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 74 69 |ected.is.asserti|
00000060: 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c |on failed: got ||
00000070: 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 |.|., expected |.|
00000080: 20 28 02 29 02 67 02 78 0c 00 06 00 a4 01 00 01 | (.).g.x........|
00000090: 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 00 00 00 |...........@....|
000000a0: 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 00 c2 |@@....@..A......|
000000b0: 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 00 00 0c |.A......(.......|
000000c0: 43 06 00 c8 03 03 01 03 04 00 00 85 01 04 ce 03 |C...............|
000000d0: 00 01 00 d0 03 00 01 00 68 00 01 00 9e 01 00 01 |........h.......|
000000e0: 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 9d 00 00 |............9...|
000000f0: 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 |.C......$....)..|
00000100: ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 |./...+...K.....!|
00000110: d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 |...K.......C9...|
00000120: 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 |$...C9...$.....)|
00000130: 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 eb 00 00 |9...............|
00000140: 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 00 00 9f |................|
00000150: d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 00 00 9f |................|
00000160: ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 07 12 0c |.....0..T.......|
00000170: 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 1c 11 08 |..!.............|
00000180: 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 |........#../,..0|
00000190: 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 |Y...........).).|
000001a0: 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 |.4D.. . ..?.. ..|
000001b0: 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 |1*".. ....1....C|
000001c0: 06 00 ca 03 00 02 00 07 00 01 25 02 de 03 00 00 |..........%.....|
000001d0: 00 e0 03 00 01 00 c2 00 cb 06 11 f4 ed 10 7f 7a |...............z|
000001e0: f0 00 00 00 01 00 82 02 0e 3e 86 ee 06 0e c7 f0 |.........>......|
000001f0: ee ed 39 e4 00 00 00 c8 06 f2 29 cc 03 0c 0d 00 |..9.......).....|
00000200: 7d 1c 07 02 12 15 1b 0e 0c 01 00 0c 52 06 00 de |}...........R...|
00000210: 03 00 00 00 01 00 00 03 00 89 b7 2f cc 03 04 0e |.........../....|
00000220: 04 0c 20 00                                     |.. .|
```

### WASM
```
00000000: 05 0d 0c 61 73 73 65 72 74 24 74 65 73 74 5f 64 |...assert$test_d|
00000010: 65 73 74 72 75 63 74 75 72 69 6e 67 50 5f 5f 74 |estructuringP__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 65 73 74 5f 64 65 73 74 72 75 63 74 75 72 69 |test_destructuri|
00000040: 6e 67 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 70 |ng.js.actual.exp|
00000050: 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 74 69 |ected.is.asserti|
00000060: 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c |on failed: got ||
00000070: 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 |.|., expected |.|
00000080: 20 28 02 29 02 67 02 78 0c 00 06 00 a4 01 00 01 | (.).g.x........|
00000090: 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 00 00 00 |...........@....|
000000a0: 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 00 c2 |@@....@..A......|
000000b0: 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 00 00 0c |.A......(.......|
000000c0: 43 06 00 c8 03 03 01 03 04 00 00 85 01 04 ce 03 |C...............|
000000d0: 00 01 00 d0 03 00 01 00 68 00 01 00 9e 01 00 01 |........h.......|
000000e0: 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 9d 00 00 |............9...|
000000f0: 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 |.C......$....)..|
00000100: ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 |./...+...K.....!|
00000110: d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 |...K.......C9...|
00000120: 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 |$...C9...$.....)|
00000130: 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 eb 00 00 |9...............|
00000140: 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 00 00 9f |................|
00000150: d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 00 00 9f |................|
00000160: ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 07 12 0c |.....0..T.......|
00000170: 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 1c 11 08 |..!.............|
00000180: 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 |........#../,..0|
00000190: 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 |Y...........).).|
000001a0: 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 |.4D.. . ..?.. ..|
000001b0: 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 |1*".. ....1....C|
000001c0: 06 00 ca 03 00 02 00 07 00 01 25 02 de 03 00 00 |..........%.....|
000001d0: 00 e0 03 00 01 00 c2 00 cb 06 11 f4 ed 10 7f 7a |...............z|
000001e0: f0 00 00 00 01 00 82 02 0e 3e 86 ee 06 0e c7 f0 |.........>......|
000001f0: ee ed 39 e4 00 00 00 c8 06 f2 29 cc 03 0c 0d 00 |..9.......).....|
00000200: 7d 1c 07 02 12 15 1b 0e 0c 01 00 0c 52 06 00 de |}...........R...|
00000210: 03 00 00 00 01 00 00 03 00 89 b7 2f cc 03 04 0e |.........../....|
00000220: 04 0c 20 00                                     |.. .|
```