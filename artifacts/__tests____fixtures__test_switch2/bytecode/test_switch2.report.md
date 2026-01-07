# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_switch2.ts
**生成时间**: 2026-01-07T15:26:58.382Z

## 大小对比

- TypeScript编译器: 659 字节
- WASM编译器: 659 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_switch2",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 24
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 37
    },
    {
      "index": 5,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_switch2.js",
      "offset": 52
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 94
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 103
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 127
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 129
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 142
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 145
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 147
    },
    {
      "index": 14,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 149
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 151
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "?",
      "offset": 153
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 155
    },
    {
      "index": 18,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ab3",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 161,
    "tag": "0xc",
    "remaining": 498
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_switch2",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 24
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 37
    },
    {
      "index": 5,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_switch2.js",
      "offset": 52
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 94
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 103
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 127
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 129
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 142
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 145
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 147
    },
    {
      "index": 14,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 149
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 151
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "?",
      "offset": 153
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 155
    },
    {
      "index": 18,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ab3",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 161,
    "tag": "0xc",
    "remaining": 498
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 13 02 65 0c 61 73 73 65 72 74 18 74 65 73 74 |...e.assert.test|
00000010: 5f 73 77 69 74 63 68 32 18 5f 5f 6c 6f 61 64 53 |_switch2.__loadS|
00000020: 63 72 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 |cript.test_asser|
00000030: 74 2e 6a 73 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 |t.jsD__tests__/f|
00000040: 69 78 74 75 72 65 73 2f 74 65 73 74 5f 73 77 69 |ixtures/test_swi|
00000050: 74 63 68 32 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |tch2.js.actual.e|
00000060: 78 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f |xpected.assertio|
00000070: 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 |n failed: got |.|
00000080: 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 ||., expected |. |
00000090: 28 02 29 02 69 02 61 02 73 02 3f 02 62 06 61 62 |(.).i.a.s.?.b.ab|
000000a0: 33 0c 00 06 00 a4 01 00 02 00 03 00 02 3e 02 a6 |3............>..|
000000b0: 01 00 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 |.........@....@@|
000000c0: e6 00 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 |....@..A.......A|
000000d0: e6 00 00 00 00 06 cb 6f 13 00 00 00 39 e7 00 00 |.......o....9...|
000000e0: 00 04 e8 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 00 |............o...|
000000f0: 00 0e ee 02 30 c7 28 d2 03 08 00 00 00 23 24 08 |....0.(......#$.|
00000100: 34 18 00 0c 43 06 00 ca 03 03 01 03 04 00 00 79 |4...C..........y|
00000110: 04 d4 03 00 01 00 d6 03 00 01 00 68 00 01 00 9e |...........h....|
00000120: 01 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 d3 |................|
00000130: d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 |....).../...+...|
00000140: 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec |K.....!...K.....|
00000150: 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 |..C9...$...C9...|
00000160: 24 00 00 ad ec 02 29 39 9f 00 00 00 04 ec 00 00 |$.....)9........|
00000170: 00 d3 9f 04 ed 00 00 00 9f 04 ee 00 00 00 9f d4 |................|
00000180: 9f 04 ed 00 00 00 9f d5 ec 10 04 ef 00 00 00 d5 |................|
00000190: 9f 04 f0 00 00 00 9f ee 02 c3 9f f1 30 d2 03 50 |............0..P|
000001a0: 03 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 |.........!......|
000001b0: 12 0d 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c |...........#../,|
000001c0: 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..0Y...........)|
000001d0: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
000001e0: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
000001f0: 00 0c 43 06 00 cc 03 00 03 00 03 00 00 53 03 e2 |..C..........S..|
00000200: 03 00 00 00 e4 03 00 01 00 e6 03 00 02 00 c3 cd |................|
00000210: b7 cb c7 bb a5 ec 36 04 f4 00 00 00 cc c7 11 b7 |......6.........|
00000220: ad ec 09 04 f2 00 00 00 cc ee 1a 11 b8 ad ec 09 |................|
00000230: 04 f5 00 00 00 cc ee 0d 11 b9 ad ec 04 0e ee 09 |................|
00000240: c3 c7 9f cc 0e c8 96 02 95 00 ee c7 39 e5 00 00 |............9...|
00000250: 00 c9 04 f6 00 00 00 ad 11 ec 05 0e c7 bb ad f1 |................|
00000260: 29 d2 03 2e 16 00 04 08 0d 0a 0c 0e 0c 04 12 13 |)...............|
00000270: 21 10 22 00 46 00 00 10 0a 00 07 12 07 03 14 19 |!.".F...........|
00000280: 00 03 1d 1c 00 04 22 27 1b 0e 20 04 1b 1a 0c 04 |......"'.. .....|
00000290: 07 23 00                                        |.#.|
```

### WASM
```
00000000: 05 13 02 65 0c 61 73 73 65 72 74 18 74 65 73 74 |...e.assert.test|
00000010: 5f 73 77 69 74 63 68 32 18 5f 5f 6c 6f 61 64 53 |_switch2.__loadS|
00000020: 63 72 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 |cript.test_asser|
00000030: 74 2e 6a 73 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 |t.jsD__tests__/f|
00000040: 69 78 74 75 72 65 73 2f 74 65 73 74 5f 73 77 69 |ixtures/test_swi|
00000050: 74 63 68 32 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |tch2.js.actual.e|
00000060: 78 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f |xpected.assertio|
00000070: 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 |n failed: got |.|
00000080: 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 ||., expected |. |
00000090: 28 02 29 02 69 02 61 02 73 02 3f 02 62 06 61 62 |(.).i.a.s.?.b.ab|
000000a0: 33 0c 00 06 00 a4 01 00 02 00 03 00 02 3e 02 a6 |3............>..|
000000b0: 01 00 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 |.........@....@@|
000000c0: e6 00 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 |....@..A.......A|
000000d0: e6 00 00 00 00 06 cb 6f 13 00 00 00 39 e7 00 00 |.......o....9...|
000000e0: 00 04 e8 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 00 |............o...|
000000f0: 00 0e ee 02 30 c7 28 d2 03 08 00 00 00 23 24 08 |....0.(......#$.|
00000100: 34 18 00 0c 43 06 00 ca 03 03 01 03 04 00 00 79 |4...C..........y|
00000110: 04 d4 03 00 01 00 d6 03 00 01 00 68 00 01 00 9e |...........h....|
00000120: 01 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 d3 |................|
00000130: d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 |....).../...+...|
00000140: 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec |K.....!...K.....|
00000150: 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 |..C9...$...C9...|
00000160: 24 00 00 ad ec 02 29 39 9f 00 00 00 04 ec 00 00 |$.....)9........|
00000170: 00 d3 9f 04 ed 00 00 00 9f 04 ee 00 00 00 9f d4 |................|
00000180: 9f 04 ed 00 00 00 9f d5 ec 10 04 ef 00 00 00 d5 |................|
00000190: 9f 04 f0 00 00 00 9f ee 02 c3 9f f1 30 d2 03 50 |............0..P|
000001a0: 03 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 |.........!......|
000001b0: 12 0d 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c |...........#../,|
000001c0: 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..0Y...........)|
000001d0: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
000001e0: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
000001f0: 00 0c 43 06 00 cc 03 00 03 00 03 00 00 53 03 e2 |..C..........S..|
00000200: 03 00 00 00 e4 03 00 01 00 e6 03 00 02 00 c3 cd |................|
00000210: b7 cb c7 bb a5 ec 36 04 f4 00 00 00 cc c7 11 b7 |......6.........|
00000220: ad ec 09 04 f2 00 00 00 cc ee 1a 11 b8 ad ec 09 |................|
00000230: 04 f5 00 00 00 cc ee 0d 11 b9 ad ec 04 0e ee 09 |................|
00000240: c3 c7 9f cc 0e c8 96 02 95 00 ee c7 39 e5 00 00 |............9...|
00000250: 00 c9 04 f6 00 00 00 ad 11 ec 05 0e c7 bb ad f1 |................|
00000260: 29 d2 03 2e 16 00 04 08 0d 0a 0c 0e 0c 04 12 13 |)...............|
00000270: 21 10 22 00 46 00 00 10 0a 00 07 12 07 03 14 19 |!.".F...........|
00000280: 00 03 1d 1c 00 04 22 27 1b 0e 20 04 1b 1a 0c 04 |......"'.. .....|
00000290: 07 23 00                                        |.#.|
```