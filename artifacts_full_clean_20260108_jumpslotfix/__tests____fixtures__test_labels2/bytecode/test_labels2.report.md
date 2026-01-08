# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_labels2.ts
**生成时间**: 2026-01-07T17:57:47.307Z

## 大小对比

- TypeScript编译器: 547 字节
- WASM编译器: 547 字节
- 差异: 0 字节 (0.00%)

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
      "string": "assert",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_labels2",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_labels2.js",
      "offset": 22
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 73
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 76
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 100
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 102
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 115
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 118
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 120
    }
  ],
  "functionHeader": {
    "offset": 122,
    "tag": "0xc",
    "remaining": 425
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
      "string": "assert",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_labels2",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_labels2.js",
      "offset": 22
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 73
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 76
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 100
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 102
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 115
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 118
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 120
    }
  ],
  "functionHeader": {
    "offset": 122,
    "tag": "0xc",
    "remaining": 425
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 0c 61 73 73 65 72 74 18 74 65 73 74 5f 6c |...assert.test_l|
00000010: 61 62 65 6c 73 32 44 5f 5f 74 65 73 74 73 5f 5f |abels2D__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 74 65 73 74 5f 6c |/fixtures/test_l|
00000030: 61 62 65 6c 73 32 2e 6a 73 0c 61 63 74 75 61 6c |abels2.js.actual|
00000040: 10 65 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 |.expected.is.ass|
00000050: 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 |ertion failed: g|
00000060: 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 |ot |.|., expecte|
00000070: 64 20 7c 04 20 28 02 29 02 69 0c 00 06 00 a4 01 |d |. (.).i......|
00000080: 00 01 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 00 |.............@..|
00000090: 00 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 |..@@....@..A....|
000000a0: 00 c2 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 00 |...A......(.....|
000000b0: 00 0c 43 06 00 c8 03 03 01 03 04 00 00 85 01 04 |..C.............|
000000c0: ce 03 00 01 00 d0 03 00 01 00 68 00 01 00 9e 01 |..........h.....|
000000d0: 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 9d |..............9.|
000000e0: 00 00 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 29 |...C......$....)|
000000f0: d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab |.../...+...K....|
00000100: ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 |.!...K.......C9.|
00000110: 00 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec |..$...C9...$....|
00000120: 02 29 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 eb |.)9.............|
00000130: 00 00 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 00 |................|
00000140: 00 9f d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 00 |................|
00000150: 00 9f ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 07 |.......0..T.....|
00000160: 12 0c 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 1c |....!...........|
00000170: 11 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 |..........#../,.|
00000180: 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 |.0Y...........).|
00000190: 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 |)..4D.. . ..?.. |
000001a0: 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 |..1*".. ....1...|
000001b0: 0c 43 06 00 ca 03 00 01 00 03 00 00 32 01 de 03 |.C..........2...|
000001c0: 00 00 00 b7 cb c7 ba a5 ec 0a c7 b7 a7 ed 05 95 |................|
000001d0: 00 ee f3 39 e4 00 00 00 c7 b8 f2 0e b7 cb c7 ba |...9............|
000001e0: a5 ec 0a c7 b7 a7 ed 05 95 00 ee f3 39 e4 00 00 |............9...|
000001f0: 00 c7 b8 f2 29 cc 03 2a 0d 00 00 02 08 16 0c 04 |....)..*........|
00000200: 13 06 0c 04 13 09 18 11 1b 0e 0c 01 0f 01 0c 0e |................|
00000210: 0c 04 13 03 0c 04 00 03 03 0c 00 04 0a 27 1b 0e |.............'..|
00000220: 0c 01 00                                        |...|
```

### WASM
```
00000000: 05 0c 0c 61 73 73 65 72 74 18 74 65 73 74 5f 6c |...assert.test_l|
00000010: 61 62 65 6c 73 32 44 5f 5f 74 65 73 74 73 5f 5f |abels2D__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 74 65 73 74 5f 6c |/fixtures/test_l|
00000030: 61 62 65 6c 73 32 2e 6a 73 0c 61 63 74 75 61 6c |abels2.js.actual|
00000040: 10 65 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 |.expected.is.ass|
00000050: 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 |ertion failed: g|
00000060: 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 |ot |.|., expecte|
00000070: 64 20 7c 04 20 28 02 29 02 69 0c 00 06 00 a4 01 |d |. (.).i......|
00000080: 00 01 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 00 |.............@..|
00000090: 00 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 |..@@....@..A....|
000000a0: 00 c2 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 00 |...A......(.....|
000000b0: 00 0c 43 06 00 c8 03 03 01 03 04 00 00 85 01 04 |..C.............|
000000c0: ce 03 00 01 00 d0 03 00 01 00 68 00 01 00 9e 01 |..........h.....|
000000d0: 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 9d |..............9.|
000000e0: 00 00 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 29 |...C......$....)|
000000f0: d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab |.../...+...K....|
00000100: ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 |.!...K.......C9.|
00000110: 00 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec |..$...C9...$....|
00000120: 02 29 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 eb |.)9.............|
00000130: 00 00 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 00 |................|
00000140: 00 9f d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 00 |................|
00000150: 00 9f ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 07 |.......0..T.....|
00000160: 12 0c 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 1c |....!...........|
00000170: 11 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 |..........#../,.|
00000180: 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 |.0Y...........).|
00000190: 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 |)..4D.. . ..?.. |
000001a0: 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 |..1*".. ....1...|
000001b0: 0c 43 06 00 ca 03 00 01 00 03 00 00 32 01 de 03 |.C..........2...|
000001c0: 00 00 00 b7 cb c7 ba a5 ec 0a c7 b7 a7 ed 05 95 |................|
000001d0: 00 ee f3 39 e4 00 00 00 c7 b8 f2 0e b7 cb c7 ba |...9............|
000001e0: a5 ec 0a c7 b7 a7 ed 05 95 00 ee f3 39 e4 00 00 |............9...|
000001f0: 00 c7 b8 f2 29 cc 03 2a 0d 00 00 02 08 16 0c 04 |....)..*........|
00000200: 13 06 0c 04 13 09 18 11 1b 0e 0c 01 0f 01 0c 0e |................|
00000210: 0c 04 13 03 0c 04 00 03 03 0c 00 04 0a 27 1b 0e |.............'..|
00000220: 0c 01 00                                        |...|
```