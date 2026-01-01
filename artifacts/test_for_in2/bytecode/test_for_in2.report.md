# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_for_in2.ts
**生成时间**: 2026-01-01T10:02:31.330Z

## 大小对比

- TypeScript编译器: 737 字节
- WASM编译器: 743 字节
- 差异: -6 字节 (-0.81%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 21,
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
      "string": "test_for_in2",
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
      "string": "__tests__/fixtures/test_for_in2.js",
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 149
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 153
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 155
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 157
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 159
    },
    {
      "index": 19,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,z",
      "offset": 164
    },
    {
      "index": 20,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,y",
      "offset": 168
    }
  ],
  "functionHeader": {
    "offset": 172,
    "tag": "0xc",
    "remaining": 565
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 21,
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
      "string": "test_for_in2",
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
      "string": "__tests__/fixtures/test_for_in2.js",
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "tab",
      "offset": 149
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 153
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 155
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 157
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 159
    },
    {
      "index": 19,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,z",
      "offset": 164
    },
    {
      "index": 20,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "x,y",
      "offset": 168
    }
  ],
  "functionHeader": {
    "offset": 172,
    "tag": "0xc",
    "remaining": 571
  }
}
```

## 字节级差异

共发现 154 个字节差异:

- 偏移量 0x208: TS=0x92 vs WASM=0x94
- 偏移量 0x22e: TS=0x15 vs WASM=0x16
- 偏移量 0x22f: TS=0xcf vs WASM=0xcb
- 偏移量 0x230: TS=0x04 vs WASM=0xc7
- 偏移量 0x231: TS=0xf4 vs WASM=0x04
- 偏移量 0x232: TS=0x00 vs WASM=0xf4
- 偏移量 0x235: TS=0xad vs WASM=0x00
- 偏移量 0x236: TS=0xed vs WASM=0xad
- 偏移量 0x237: TS=0x0c vs WASM=0xed
- 偏移量 0x238: TS=0xc8 vs WASM=0x0c
- 偏移量 0x239: TS=0x43 vs WASM=0xc8
- 偏移量 0x23a: TS=0xf6 vs WASM=0x43
- 偏移量 0x23b: TS=0x00 vs WASM=0xf6
- 偏移量 0x23e: TS=0xc7 vs WASM=0x00
- 偏移量 0x23f: TS=0x24 vs WASM=0xc7
- 偏移量 0x240: TS=0x01 vs WASM=0x24
- 偏移量 0x241: TS=0x00 vs WASM=0x01
- 偏移量 0x242: TS=0x0e vs WASM=0x00
- 偏移量 0x243: TS=0x81 vs WASM=0x0e
- 偏移量 0x244: TS=0xec vs WASM=0x81
- ... (显示前20个差异，总共154个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 15 02 65 0c 61 73 73 65 72 74 18 74 65 73 74 |...e.assert.test|
00000010: 5f 66 6f 72 5f 69 6e 32 18 5f 5f 6c 6f 61 64 53 |_for_in2.__loadS|
00000020: 63 72 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 |cript.test_asser|
00000030: 74 2e 6a 73 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 |t.jsD__tests__/f|
00000040: 69 78 74 75 72 65 73 2f 74 65 73 74 5f 66 6f 72 |ixtures/test_for|
00000050: 5f 69 6e 32 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |_in2.js.actual.e|
00000060: 78 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f |xpected.assertio|
00000070: 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 |n failed: got |.|
00000080: 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 ||., expected |. |
00000090: 28 02 29 02 69 06 74 61 62 02 78 02 79 02 7a 08 |(.).i.tab.x.y.z.|
000000a0: 70 75 73 68 06 78 2c 7a 06 78 2c 79 0c 00 06 00 |push.x,z.x,y....|
000000b0: a4 01 00 02 00 03 00 02 3e 02 a6 01 00 00 00 c8 |........>.......|
000000c0: 03 03 00 03 40 e5 00 00 00 40 40 e6 00 00 00 40 |....@....@@....@|
000000d0: c2 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 |..A.......A.....|
000000e0: 06 cb 6f 13 00 00 00 39 e7 00 00 00 04 e8 00 00 |..o....9........|
000000f0: 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 |.......o.......0|
00000100: c7 28 d2 03 08 00 00 00 23 24 08 34 18 00 0c 43 |.(......#$.4...C|
00000110: 06 00 ca 03 03 01 03 04 00 00 79 04 d4 03 00 01 |..........y.....|
00000120: 00 d6 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c |......h.........|
00000130: 01 cb c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 |...............)|
00000140: d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab |.../...+...K....|
00000150: ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 |.!...K.......C9.|
00000160: 00 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec |..$...C9...$....|
00000170: 02 29 39 9f 00 00 00 04 ec 00 00 00 d3 9f 04 ed |.)9.............|
00000180: 00 00 00 9f 04 ee 00 00 00 9f d4 9f 04 ed 00 00 |................|
00000190: 00 9f d5 ec 10 04 ef 00 00 00 d5 9f 04 f0 00 00 |................|
000001a0: 00 9f ee 02 c3 9f f1 30 d2 03 50 03 00 12 10 07 |.......0..P.....|
000001b0: 12 0c 10 12 21 0d 00 07 16 07 07 12 0d 08 00 07 |....!...........|
000001c0: 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 |......#../,..0Y.|
000001d0: 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 |..........).)..4|
000001e0: 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a |D.. . ..?.. ..1*|
000001f0: 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 |".. ....1....C..|
00000200: cc 03 00 02 00 04 00 00 92 01 02 e2 03 00 00 00 |................|
00000210: e4 03 00 01 00 26 00 00 cc 0b b8 4e f3 00 00 00 |.....&.....N....|
00000220: b9 4e f4 00 00 00 ba 4e f5 00 00 00 7e ee 15 cf |.N.....N....~...|
00000230: 04 f4 00 00 00 ad ed 0c c8 43 f6 00 00 00 c7 24 |.........C.....$|
00000240: 01 00 0e 81 ec ea 0e 0e 39 e5 00 00 00 c8 43 39 |........9.....C9|
00000250: 00 00 00 24 00 00 04 f7 00 00 00 ab f1 0e 26 00 |...$..........&.|
00000260: 00 cc 0b b8 4e f3 00 00 00 b9 4e f4 00 00 00 ba |....N.....N.....|
00000270: 4e f5 00 00 00 7e ee 15 cf 04 f5 00 00 00 ad ed |N....~..........|
00000280: 10 c8 43 f6 00 00 00 c7 24 01 00 0e 81 ec ea 0e |..C.....$.......|
00000290: 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 00 04 |.9.....C9...$...|
000002a0: f8 00 00 00 ab f1 29 d2 03 36 15 00 04 08 86 10 |......)..6......|
000002b0: 20 04 13 0b 07 06 1b 0c 07 01 31 17 1b 0e 07 06 | .........1.....|
000002c0: 1b 12 2a 06 07 1f 0d 0b 86 10 20 04 13 0b 07 06 |..*....... .....|
000002d0: 1b 0c 07 01 31 17 1b 0e 07 06 1b 12 2a 06 07 1f |....1.......*...|
000002e0: 00                                              |.|
```

### WASM
```
00000000: 05 15 02 65 0c 61 73 73 65 72 74 18 74 65 73 74 |...e.assert.test|
00000010: 5f 66 6f 72 5f 69 6e 32 18 5f 5f 6c 6f 61 64 53 |_for_in2.__loadS|
00000020: 63 72 69 70 74 1c 74 65 73 74 5f 61 73 73 65 72 |cript.test_asser|
00000030: 74 2e 6a 73 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 |t.jsD__tests__/f|
00000040: 69 78 74 75 72 65 73 2f 74 65 73 74 5f 66 6f 72 |ixtures/test_for|
00000050: 5f 69 6e 32 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |_in2.js.actual.e|
00000060: 78 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f |xpected.assertio|
00000070: 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 |n failed: got |.|
00000080: 7c 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 ||., expected |. |
00000090: 28 02 29 02 69 06 74 61 62 02 78 02 79 02 7a 08 |(.).i.tab.x.y.z.|
000000a0: 70 75 73 68 06 78 2c 7a 06 78 2c 79 0c 00 06 00 |push.x,z.x,y....|
000000b0: a4 01 00 02 00 03 00 02 3e 02 a6 01 00 00 00 c8 |........>.......|
000000c0: 03 03 00 03 40 e5 00 00 00 40 40 e6 00 00 00 40 |....@....@@....@|
000000d0: c2 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 |..A.......A.....|
000000e0: 06 cb 6f 13 00 00 00 39 e7 00 00 00 04 e8 00 00 |..o....9........|
000000f0: 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 0e ee 02 30 |.......o.......0|
00000100: c7 28 d2 03 08 00 00 00 23 24 08 34 18 00 0c 43 |.(......#$.4...C|
00000110: 06 00 ca 03 03 01 03 04 00 00 79 04 d4 03 00 01 |..........y.....|
00000120: 00 d6 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c |......h.........|
00000130: 01 cb c7 eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 |...............)|
00000140: d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab |.../...+...K....|
00000150: ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 |.!...K.......C9.|
00000160: 00 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec |..$...C9...$....|
00000170: 02 29 39 9f 00 00 00 04 ec 00 00 00 d3 9f 04 ed |.)9.............|
00000180: 00 00 00 9f 04 ee 00 00 00 9f d4 9f 04 ed 00 00 |................|
00000190: 00 9f d5 ec 10 04 ef 00 00 00 d5 9f 04 f0 00 00 |................|
000001a0: 00 9f ee 02 c3 9f f1 30 d2 03 50 03 00 12 10 07 |.......0..P.....|
000001b0: 12 0c 10 12 21 0d 00 07 16 07 07 12 0d 08 00 07 |....!...........|
000001c0: 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 |......#../,..0Y.|
000001d0: 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 |..........).)..4|
000001e0: 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a |D.. . ..?.. ..1*|
000001f0: 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 |".. ....1....C..|
00000200: cc 03 00 02 00 04 00 00 94 01 02 e2 03 00 00 00 |................|
00000210: e4 03 00 01 00 26 00 00 cc 0b b8 4e f3 00 00 00 |.....&.....N....|
00000220: b9 4e f4 00 00 00 ba 4e f5 00 00 00 7e ee 16 cb |.N.....N....~...|
00000230: c7 04 f4 00 00 00 ad ed 0c c8 43 f6 00 00 00 c7 |..........C.....|
00000240: 24 01 00 0e 81 ec e9 0e 0e 39 e5 00 00 00 c8 43 |$........9.....C|
00000250: 39 00 00 00 24 00 00 04 f7 00 00 00 ab f1 0e 26 |9...$..........&|
00000260: 00 00 cc 0b b8 4e f3 00 00 00 b9 4e f4 00 00 00 |.....N.....N....|
00000270: ba 4e f5 00 00 00 7e ee 16 cb c7 04 f5 00 00 00 |.N....~.........|
00000280: ad ed 10 c8 43 f6 00 00 00 c7 24 01 00 0e 81 ec |....C.....$.....|
00000290: e9 0e 0e 39 e5 00 00 00 c8 43 39 00 00 00 24 00 |...9.....C9...$.|
000002a0: 00 04 f8 00 00 00 ab f1 29 d2 03 3a 15 00 04 08 |........)..:....|
000002b0: 85 0a 08 06 20 04 13 0b 07 06 1b 0c 07 01 31 17 |.... .........1.|
000002c0: 1b 0e 07 06 1b 12 2a 06 07 1f 0d 0b 85 0a 08 06 |......*.........|
000002d0: 20 04 13 0b 07 06 1b 0c 07 01 31 17 1b 0e 07 06 | .........1.....|
000002e0: 1b 12 2a 06 07 1f 00                            |..*....|
```