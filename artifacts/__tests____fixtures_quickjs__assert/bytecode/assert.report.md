# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/assert.ts
**生成时间**: 2026-01-07T14:02:03.563Z

## 大小对比

- TypeScript编译器: 840 字节
- WASM编译器: 840 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 22,
  "atoms": [
    {
      "index": 0,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/assert.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "assertThrows",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "assertArrayEquals",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 84
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 93
    },
    {
      "index": 7,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 96
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 120
    },
    {
      "index": 9,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 122
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 135
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 138
    },
    {
      "index": 12,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 140
    },
    {
      "index": 13,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 144
    },
    {
      "index": 14,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 149
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 152
    },
    {
      "index": 16,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 154
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 173
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 175
    },
    {
      "index": 19,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "isArray",
      "offset": 177
    },
    {
      "index": 20,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "forEach",
      "offset": 185
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "idx",
      "offset": 193
    }
  ],
  "functionHeader": {
    "offset": 197,
    "tag": "0xd",
    "remaining": 643
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 22,
  "atoms": [
    {
      "index": 0,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/assert.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "assertThrows",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "assertArrayEquals",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 84
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 93
    },
    {
      "index": 7,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 96
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 120
    },
    {
      "index": 9,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 122
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 135
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 138
    },
    {
      "index": 12,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 140
    },
    {
      "index": 13,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 144
    },
    {
      "index": 14,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 149
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 152
    },
    {
      "index": 16,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 154
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 173
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 175
    },
    {
      "index": 19,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "isArray",
      "offset": 177
    },
    {
      "index": 20,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "forEach",
      "offset": 185
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "idx",
      "offset": 193
    }
  ],
  "functionHeader": {
    "offset": 197,
    "tag": "0xd",
    "remaining": 643
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 16 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..H__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 61 73 |tures_quickjs/as|
00000020: 73 65 72 74 2e 6a 73 0c 61 73 73 65 72 74 18 61 |sert.js.assert.a|
00000030: 73 73 65 72 74 54 68 72 6f 77 73 22 61 73 73 65 |ssertThrows"asse|
00000040: 72 74 41 72 72 61 79 45 71 75 61 6c 73 0c 61 63 |rtArrayEquals.ac|
00000050: 74 75 61 6c 10 65 78 70 65 63 74 65 64 04 69 73 |tual.expected.is|
00000060: 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 |.assertion faile|
00000070: 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 |d: got |.|., exp|
00000080: 65 63 74 65 64 20 7c 04 20 28 02 29 06 65 72 72 |ected |. (.).err|
00000090: 08 66 75 6e 63 04 65 78 02 65 24 65 78 63 65 70 |.func.ex.e$excep|
000000a0: 74 69 6f 6e 20 65 78 70 65 63 74 65 64 02 61 02 |tion expected.a.|
000000b0: 62 0e 69 73 41 72 72 61 79 0e 66 6f 72 45 61 63 |b.isArray.forEac|
000000c0: 68 06 69 64 78 0d c8 03 00 03 00 00 ca 03 00 01 |h.idx...........|
000000d0: cc 03 00 02 ce 03 00 00 00 0c 20 06 01 a4 01 00 |.......... .....|
000000e0: 00 00 01 03 03 0f 00 ca 03 00 01 cc 03 01 01 ce |................|
000000f0: 03 02 01 08 ec 0b c2 00 e3 c2 01 e4 c2 02 e5 29 |...............)|
00000100: 06 2f c8 03 02 00 00 00 0c 43 06 01 ca 03 03 01 |./.......C......|
00000110: 03 04 00 00 91 01 04 d0 03 00 01 00 d2 03 00 01 |................|
00000120: 00 68 00 01 00 9e 01 00 01 00 0c 00 cb c7 eb b8 |.h..............|
00000130: ad ec 03 0a d8 d3 99 d4 99 ad ec 4a 39 9d 00 00 |...........J9...|
00000140: 00 43 ea 00 00 00 d3 d4 24 02 00 ec 02 29 d3 99 |.C......$....)..|
00000150: 04 4b 00 00 00 ad ec 2e d3 f5 ed 2a d4 f5 ed 26 |.K.........*...&|
00000160: d3 42 3e 00 00 00 d4 42 3e 00 00 00 ad ec 17 d3 |.B>....B>.......|
00000170: 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 |C9...$...C9...$.|
00000180: 00 ad ec 02 29 39 9f 00 00 00 04 eb 00 00 00 d3 |....)9..........|
00000190: 9f 04 ec 00 00 00 9f 04 ed 00 00 00 9f d4 9f 04 |................|
000001a0: ec 00 00 00 9f d5 ec 10 04 ee 00 00 00 d5 9f 04 |................|
000001b0: ef 00 00 00 9f ee 02 c3 9f f1 30 c8 03 60 00 07 |..........0..`..|
000001c0: 12 02 07 12 0c 10 12 21 0d 0e 0c 24 0c 15 12 13 |.......!...$....|
000001d0: 1b 0c 1b 08 07 10 07 11 1c 11 08 0e 07 0e 30 13 |..............0.|
000001e0: 07 0e 11 18 07 12 12 31 07 0c 1b 22 07 10 1b 17 |.......1..."....|
000001f0: 12 25 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 |.%...........).)|
00000200: 0a 0b 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 |..4D.. . ..?.. .|
00000210: 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c |.1*".. ....1....|
00000220: 43 06 01 cc 03 02 02 02 04 01 00 29 04 e0 03 00 |C..........)....|
00000230: 01 00 e2 03 00 01 00 e4 03 00 00 00 e6 03 03 00 |................|
00000240: 03 ca 03 00 00 09 cb 6f 0a 00 00 00 d4 f0 0e 0e |.......o........|
00000250: ee 13 cc 6f 0f 00 00 00 0a cb df c8 d3 a9 f1 0e |...o............|
00000260: 0e ee 02 30 df c7 0a 04 f4 00 00 00 f3 29 c8 03 |...0.........)..|
00000270: 1a 11 07 04 05 27 08 07 08 3c 07 0d 00 07 0e 07 |.....'...<......|
00000280: 1a 07 15 07 05 22 13 07 0e 25 01 00 0c 43 06 01 |....."...%...C..|
00000290: ce 03 02 00 02 03 01 01 3c 02 ea 03 00 01 00 ec |........<.......|
000002a0: 03 00 01 40 ca 03 00 00 39 9e 00 00 00 43 f7 00 |...@....9....C..|
000002b0: 00 00 d3 24 01 00 98 11 ed 11 0e 39 9e 00 00 00 |...$.......9....|
000002c0: 43 f7 00 00 00 d4 24 01 00 98 ec 06 df 09 23 01 |C.....$.......#.|
000002d0: 00 df d3 eb d4 eb f2 0e d3 43 f8 00 00 00 c2 00 |.........C......|
000002e0: 24 01 00 29 c8 03 28 1d 07 03 04 1b 0a 1b 12 07 |$..)..(.........|
000002f0: 01 2a 10 1b 0a 1b 12 07 01 21 37 0c 0d 12 07 07 |.*.......!7.....|
00000300: 0e 07 02 07 12 07 02 07 17 0d 0b 07 02 25 10 00 |.............%..|
00000310: 0c 42 06 01 00 02 00 02 03 02 00 07 02 84 01 00 |.B..............|
00000320: 01 00 f2 03 00 01 00 ca 03 00 00 ec 03 01 03 df |................|
00000330: e0 d4 48 d3 f2 29 c8 03 0e 21 0e 03 0b 07 0e 07 |..H..)...!......|
00000340: 04 07 01 07 0e 07 11 00                         |........|
```

### WASM
```
00000000: 05 16 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..H__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 61 73 |tures_quickjs/as|
00000020: 73 65 72 74 2e 6a 73 0c 61 73 73 65 72 74 18 61 |sert.js.assert.a|
00000030: 73 73 65 72 74 54 68 72 6f 77 73 22 61 73 73 65 |ssertThrows"asse|
00000040: 72 74 41 72 72 61 79 45 71 75 61 6c 73 0c 61 63 |rtArrayEquals.ac|
00000050: 74 75 61 6c 10 65 78 70 65 63 74 65 64 04 69 73 |tual.expected.is|
00000060: 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 |.assertion faile|
00000070: 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 |d: got |.|., exp|
00000080: 65 63 74 65 64 20 7c 04 20 28 02 29 06 65 72 72 |ected |. (.).err|
00000090: 08 66 75 6e 63 04 65 78 02 65 24 65 78 63 65 70 |.func.ex.e$excep|
000000a0: 74 69 6f 6e 20 65 78 70 65 63 74 65 64 02 61 02 |tion expected.a.|
000000b0: 62 0e 69 73 41 72 72 61 79 0e 66 6f 72 45 61 63 |b.isArray.forEac|
000000c0: 68 06 69 64 78 0d c8 03 00 03 00 00 ca 03 00 01 |h.idx...........|
000000d0: cc 03 00 02 ce 03 00 00 00 0c 20 06 01 a4 01 00 |.......... .....|
000000e0: 00 00 01 03 03 0f 00 ca 03 00 01 cc 03 01 01 ce |................|
000000f0: 03 02 01 08 ec 0b c2 00 e3 c2 01 e4 c2 02 e5 29 |...............)|
00000100: 06 2f c8 03 02 00 00 00 0c 43 06 01 ca 03 03 01 |./.......C......|
00000110: 03 04 00 00 91 01 04 d0 03 00 01 00 d2 03 00 01 |................|
00000120: 00 68 00 01 00 9e 01 00 01 00 0c 00 cb c7 eb b8 |.h..............|
00000130: ad ec 03 0a d8 d3 99 d4 99 ad ec 4a 39 9d 00 00 |...........J9...|
00000140: 00 43 ea 00 00 00 d3 d4 24 02 00 ec 02 29 d3 99 |.C......$....)..|
00000150: 04 4b 00 00 00 ad ec 2e d3 f5 ed 2a d4 f5 ed 26 |.K.........*...&|
00000160: d3 42 3e 00 00 00 d4 42 3e 00 00 00 ad ec 17 d3 |.B>....B>.......|
00000170: 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 |C9...$...C9...$.|
00000180: 00 ad ec 02 29 39 9f 00 00 00 04 eb 00 00 00 d3 |....)9..........|
00000190: 9f 04 ec 00 00 00 9f 04 ed 00 00 00 9f d4 9f 04 |................|
000001a0: ec 00 00 00 9f d5 ec 10 04 ee 00 00 00 d5 9f 04 |................|
000001b0: ef 00 00 00 9f ee 02 c3 9f f1 30 c8 03 60 00 07 |..........0..`..|
000001c0: 12 02 07 12 0c 10 12 21 0d 0e 0c 24 0c 15 12 13 |.......!...$....|
000001d0: 1b 0c 1b 08 07 10 07 11 1c 11 08 0e 07 0e 30 13 |..............0.|
000001e0: 07 0e 11 18 07 12 12 31 07 0c 1b 22 07 10 1b 17 |.......1..."....|
000001f0: 12 25 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 |.%...........).)|
00000200: 0a 0b 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 |..4D.. . ..?.. .|
00000210: 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c |.1*".. ....1....|
00000220: 43 06 01 cc 03 02 02 02 04 01 00 29 04 e0 03 00 |C..........)....|
00000230: 01 00 e2 03 00 01 00 e4 03 00 00 00 e6 03 03 00 |................|
00000240: 03 ca 03 00 00 09 cb 6f 0a 00 00 00 d4 f0 0e 0e |.......o........|
00000250: ee 13 cc 6f 0f 00 00 00 0a cb df c8 d3 a9 f1 0e |...o............|
00000260: 0e ee 02 30 df c7 0a 04 f4 00 00 00 f3 29 c8 03 |...0.........)..|
00000270: 1a 11 07 04 05 27 08 07 08 3c 07 0d 00 07 0e 07 |.....'...<......|
00000280: 1a 07 15 07 05 22 13 07 0e 25 01 00 0c 43 06 01 |....."...%...C..|
00000290: ce 03 02 00 02 03 01 01 3c 02 ea 03 00 01 00 ec |........<.......|
000002a0: 03 00 01 40 ca 03 00 00 39 9e 00 00 00 43 f7 00 |...@....9....C..|
000002b0: 00 00 d3 24 01 00 98 11 ed 11 0e 39 9e 00 00 00 |...$.......9....|
000002c0: 43 f7 00 00 00 d4 24 01 00 98 ec 06 df 09 23 01 |C.....$.......#.|
000002d0: 00 df d3 eb d4 eb f2 0e d3 43 f8 00 00 00 c2 00 |.........C......|
000002e0: 24 01 00 29 c8 03 28 1d 07 03 04 1b 0a 1b 12 07 |$..)..(.........|
000002f0: 01 2a 10 1b 0a 1b 12 07 01 21 37 0c 0d 12 07 07 |.*.......!7.....|
00000300: 0e 07 02 07 12 07 02 07 17 0d 0b 07 02 25 10 00 |.............%..|
00000310: 0c 42 06 01 00 02 00 02 03 02 00 07 02 84 01 00 |.B..............|
00000320: 01 00 f2 03 00 01 00 ca 03 00 00 ec 03 01 03 df |................|
00000330: e0 d4 48 d3 f2 29 c8 03 0e 21 0e 03 0b 07 0e 07 |..H..)...!......|
00000340: 04 07 01 07 0e 07 11 00                         |........|
```