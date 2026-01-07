# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_regexp_skip.ts
**生成时间**: 2026-01-06T16:10:41.218Z

## 大小对比

- TypeScript编译器: 702 字节
- WASM编译器: 702 字节
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
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "test_regexp_skip",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_regexp_skip.js",
      "offset": 26
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 84
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 108
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 110
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 123
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 126
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 128
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 130
    }
  ],
  "functionHeader": {
    "offset": 132,
    "tag": "0xc",
    "remaining": 570
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
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "test_regexp_skip",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_regexp_skip.js",
      "offset": 26
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 84
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 108
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 110
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 123
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 126
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 128
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 130
    }
  ],
  "functionHeader": {
    "offset": 132,
    "tag": "0xc",
    "remaining": 570
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0d 0c 61 73 73 65 72 74 20 74 65 73 74 5f 72 |...assert test_r|
00000010: 65 67 65 78 70 5f 73 6b 69 70 4c 5f 5f 74 65 73 |egexp_skipL__tes|
00000020: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 |ts__/fixtures/te|
00000030: 73 74 5f 72 65 67 65 78 70 5f 73 6b 69 70 2e 6a |st_regexp_skip.j|
00000040: 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 |s.actual.expecte|
00000050: 64 04 69 73 2e 61 73 73 65 72 74 69 6f 6e 20 66 |d.is.assertion f|
00000060: 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c |ailed: got |.|.,|
00000070: 20 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 | expected |. (.)|
00000080: 02 61 02 62 0c 00 06 00 a4 01 00 01 00 01 00 02 |.a.b............|
00000090: 1e 01 a6 01 00 00 00 40 e4 00 00 00 40 40 e5 00 |.......@....@@..|
000000a0: 00 00 40 c2 00 41 e4 00 00 00 00 c2 01 41 e5 00 |..@..A.......A..|
000000b0: 00 00 00 c7 28 cc 03 02 00 00 00 0c 43 06 00 c8 |....(.......C...|
000000c0: 03 03 01 03 04 00 00 85 01 04 ce 03 00 01 00 d0 |................|
000000d0: 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 01 cb |....h...........|
000000e0: c7 eb b8 ab ec 03 0a d8 39 9d 00 00 00 43 e9 00 |........9....C..|
000000f0: 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 ed 2f d4 f5 |....$....).../..|
00000100: ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b |.+...K.....!...K|
00000110: 00 00 00 ab ec 17 d3 43 39 00 00 00 24 00 00 d4 |.......C9...$...|
00000120: 43 39 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 |C9...$.....)9...|
00000130: 00 04 ea 00 00 00 d3 9f 04 eb 00 00 00 9f 04 ec |................|
00000140: 00 00 00 9f d4 9f 04 eb 00 00 00 9f d5 ec 10 04 |................|
00000150: ed 00 00 00 d5 9f 04 ee 00 00 00 9f ee 02 c3 9f |................|
00000160: f1 30 cc 03 54 00 00 12 10 07 12 0c 10 12 21 0d |.0..T.........!.|
00000170: 00 1b 0c 1b 08 07 10 07 11 1c 11 08 00 07 0e 11 |................|
00000180: 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b |....#../,..0Y...|
00000190: 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 |........).)..4D.|
000001a0: 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 |. . ..?.. ..1*".|
000001b0: 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 ca 03 |. ....1....C....|
000001c0: 00 02 00 08 00 04 70 02 de 03 00 00 00 e0 03 00 |......p.........|
000001d0: 01 00 ee 26 11 7f 7a ef 00 00 00 00 00 82 02 0e |...&..z.........|
000001e0: 3e 7a f0 00 00 00 01 00 82 02 0e 11 f4 ec 07 0e |>z..............|
000001f0: c1 00 c1 01 34 3e 86 ee 07 b8 26 01 00 ee d6 0e |....4>....&.....|
00000200: 39 e4 00 00 00 c7 b8 ad f1 0e ee 26 11 7f 7a ef |9..........&..z.|
00000210: 00 00 00 00 00 82 02 0e 3e 7a f0 00 00 00 01 00 |........>z......|
00000220: 82 02 0e 11 f4 ec 07 0e c1 02 c1 03 34 3e 86 ee |............4>..|
00000230: 07 b9 26 01 00 ee d6 0e 39 e4 00 00 00 c7 b9 ad |..&.....9.......|
00000240: f1 29 cc 03 1e 0d 00 04 08 16 02 39 06 9e 07 1b |.).........9....|
00000250: 0e 0c 04 07 05 0d 0b 16 02 39 06 9e 07 1b 0e 0c |.........9......|
00000260: 04 07 05 00 07 0a 61 62 63 5c 28 07 48 00 00 01 |......abc\(.H...|
00000270: 00 1c 00 00 00 0c 06 00 00 00 06 0b f5 ff ff ff |................|
00000280: 0f 00 01 61 00 01 62 00 01 63 00 01 28 00 10 00 |...a..b..c..(...|
00000290: 0e 07 0a 61 62 63 5c 28 07 48 00 00 01 00 1c 00 |...abc\(.H......|
000002a0: 00 00 0c 06 00 00 00 06 0b f5 ff ff ff 0f 00 01 |................|
000002b0: 61 00 01 62 00 01 63 00 01 28 00 10 00 0e       |a..b..c..(....|
```

### WASM
```
00000000: 05 0d 0c 61 73 73 65 72 74 20 74 65 73 74 5f 72 |...assert test_r|
00000010: 65 67 65 78 70 5f 73 6b 69 70 4c 5f 5f 74 65 73 |egexp_skipL__tes|
00000020: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 |ts__/fixtures/te|
00000030: 73 74 5f 72 65 67 65 78 70 5f 73 6b 69 70 2e 6a |st_regexp_skip.j|
00000040: 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 |s.actual.expecte|
00000050: 64 04 69 73 2e 61 73 73 65 72 74 69 6f 6e 20 66 |d.is.assertion f|
00000060: 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c |ailed: got |.|.,|
00000070: 20 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 | expected |. (.)|
00000080: 02 61 02 62 0c 00 06 00 a4 01 00 01 00 01 00 02 |.a.b............|
00000090: 1e 01 a6 01 00 00 00 40 e4 00 00 00 40 40 e5 00 |.......@....@@..|
000000a0: 00 00 40 c2 00 41 e4 00 00 00 00 c2 01 41 e5 00 |..@..A.......A..|
000000b0: 00 00 00 c7 28 cc 03 02 00 00 00 0c 43 06 00 c8 |....(.......C...|
000000c0: 03 03 01 03 04 00 00 85 01 04 ce 03 00 01 00 d0 |................|
000000d0: 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c 01 cb |....h...........|
000000e0: c7 eb b8 ab ec 03 0a d8 39 9d 00 00 00 43 e9 00 |........9....C..|
000000f0: 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 ed 2f d4 f5 |....$....).../..|
00000100: ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b |.+...K.....!...K|
00000110: 00 00 00 ab ec 17 d3 43 39 00 00 00 24 00 00 d4 |.......C9...$...|
00000120: 43 39 00 00 00 24 00 00 ad ec 02 29 39 9f 00 00 |C9...$.....)9...|
00000130: 00 04 ea 00 00 00 d3 9f 04 eb 00 00 00 9f 04 ec |................|
00000140: 00 00 00 9f d4 9f 04 eb 00 00 00 9f d5 ec 10 04 |................|
00000150: ed 00 00 00 d5 9f 04 ee 00 00 00 9f ee 02 c3 9f |................|
00000160: f1 30 cc 03 54 00 00 12 10 07 12 0c 10 12 21 0d |.0..T.........!.|
00000170: 00 1b 0c 1b 08 07 10 07 11 1c 11 08 00 07 0e 11 |................|
00000180: 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b |....#../,..0Y...|
00000190: 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 |........).)..4D.|
000001a0: 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 |. . ..?.. ..1*".|
000001b0: 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 ca 03 |. ....1....C....|
000001c0: 00 02 00 08 00 04 70 02 de 03 00 00 00 e0 03 00 |......p.........|
000001d0: 01 00 ee 26 11 7f 7a ef 00 00 00 00 00 82 02 0e |...&..z.........|
000001e0: 3e 7a f0 00 00 00 01 00 82 02 0e 11 f4 ec 07 0e |>z..............|
000001f0: c1 00 c1 01 34 3e 86 ee 07 b8 26 01 00 ee d6 0e |....4>....&.....|
00000200: 39 e4 00 00 00 c7 b8 ad f1 0e ee 26 11 7f 7a ef |9..........&..z.|
00000210: 00 00 00 00 00 82 02 0e 3e 7a f0 00 00 00 01 00 |........>z......|
00000220: 82 02 0e 11 f4 ec 07 0e c1 02 c1 03 34 3e 86 ee |............4>..|
00000230: 07 b9 26 01 00 ee d6 0e 39 e4 00 00 00 c7 b9 ad |..&.....9.......|
00000240: f1 29 cc 03 1e 0d 00 04 08 16 02 39 06 9e 07 1b |.).........9....|
00000250: 0e 0c 04 07 05 0d 0b 16 02 39 06 9e 07 1b 0e 0c |.........9......|
00000260: 04 07 05 00 07 0a 61 62 63 5c 28 07 48 00 00 01 |......abc\(.H...|
00000270: 00 1c 00 00 00 0c 06 00 00 00 06 0b f5 ff ff ff |................|
00000280: 0f 00 01 61 00 01 62 00 01 63 00 01 28 00 10 00 |...a..b..c..(...|
00000290: 0e 07 0a 61 62 63 5c 28 07 48 00 00 01 00 1c 00 |...abc\(.H......|
000002a0: 00 00 0c 06 00 00 00 06 0b f5 ff ff ff 0f 00 01 |................|
000002b0: 61 00 01 62 00 01 63 00 01 28 00 10 00 0e       |a..b..c..(....|
```