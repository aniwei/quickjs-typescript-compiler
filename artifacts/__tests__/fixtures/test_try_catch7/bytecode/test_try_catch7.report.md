# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_try_catch7.ts
**生成时间**: 2026-01-03T14:09:19.527Z

## 大小对比

- TypeScript编译器: 644 字节
- WASM编译器: 644 字节
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
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch7",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 27
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 40
    },
    {
      "index": 5,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_try_catch7.js",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 93
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 100
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 109
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 133
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 135
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 148
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 151
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 153
    },
    {
      "index": 14,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 155
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 157
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 159
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 161
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tfag",
      "offset": 163
    }
  ],
  "functionHeader": {
    "offset": 168,
    "tag": "0xc",
    "remaining": 476
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
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "test_try_catch7",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 27
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 40
    },
    {
      "index": 5,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_try_catch7.js",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 93
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 100
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 109
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 133
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 135
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 148
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 151
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 153
    },
    {
      "index": 14,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 155
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 157
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 159
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 161
    },
    {
      "index": 18,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "tfag",
      "offset": 163
    }
  ],
  "functionHeader": {
    "offset": 168,
    "tag": "0xc",
    "remaining": 476
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 13 02 65 0c 61 73 73 65 72 74 1e 74 65 73 74 |...e.assert.test|
00000010: 5f 74 72 79 5f 63 61 74 63 68 37 18 5f 5f 6c 6f |_try_catch7.__lo|
00000020: 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f 61 73 |adScript.test_as|
00000030: 73 65 72 74 2e 6a 73 4a 5f 5f 74 65 73 74 73 5f |sert.jsJ__tests_|
00000040: 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 73 74 5f |_/fixtures/test_|
00000050: 74 72 79 5f 63 61 74 63 68 37 2e 6a 73 0c 61 63 |try_catch7.js.ac|
00000060: 74 75 61 6c 10 65 78 70 65 63 74 65 64 2e 61 73 |tual.expected.as|
00000070: 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 |sertion failed: |
00000080: 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 |got |.|., expect|
00000090: 65 64 20 7c 04 20 28 02 29 02 73 02 74 02 61 02 |ed |. (.).s.t.a.|
000000a0: 66 02 67 08 74 66 61 67 0c 00 06 00 a4 01 00 02 |f.g.tfag........|
000000b0: 00 03 00 02 3e 02 a6 01 00 00 00 c8 03 03 00 03 |....>...........|
000000c0: 40 e5 00 00 00 40 40 e6 00 00 00 40 c2 00 41 e5 |@....@@....@..A.|
000000d0: 00 00 00 00 c2 01 41 e6 00 00 00 00 06 cb 6f 13 |......A.......o.|
000000e0: 00 00 00 39 e7 00 00 00 04 e8 00 00 00 f1 cb 0e |...9............|
000000f0: ee 0b cc 6f 07 00 00 00 0e ee 02 30 c7 28 d2 03 |...o.......0.(..|
00000100: 08 00 00 00 23 24 08 34 18 00 0c 43 06 00 ca 03 |....#$.4...C....|
00000110: 03 01 03 04 00 00 79 04 d4 03 00 01 00 d6 03 00 |......y.........|
00000120: 01 00 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb |..h.............|
00000130: b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed 2f |...........).../|
00000140: d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 |...+...K.....!..|
00000150: 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 00 |.K.......C9...$.|
00000160: 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 9f |..C9...$.....)9.|
00000170: 00 00 00 04 ec 00 00 00 d3 9f 04 ed 00 00 00 9f |................|
00000180: 04 ee 00 00 00 9f d4 9f 04 ed 00 00 00 9f d5 ec |................|
00000190: 10 04 ef 00 00 00 d5 9f 04 f0 00 00 00 9f ee 02 |................|
000001a0: c3 9f f1 30 d2 03 50 03 00 12 10 07 12 0c 10 12 |...0..P.........|
000001b0: 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 18 07 |!...............|
000001c0: 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 |..#../,..0Y.....|
000001d0: 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 20 |......).)..4D.. |
000001e0: 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 20 |. ..?.. ..1*".. |
000001f0: 14 15 0c 06 31 07 15 00 0c 43 06 00 cc 03 00 02 |....1....C......|
00000200: 00 04 00 00 5a 02 e2 03 00 00 00 c8 03 05 00 03 |....Z...........|
00000210: c3 cb 6f 24 00 00 00 6f 11 00 00 00 04 f2 00 00 |..o$...o........|
00000220: 00 96 00 04 f3 00 00 00 30 70 05 00 00 00 30 04 |........0p....0.|
00000230: f4 00 00 00 96 00 71 cc 6f 11 00 00 00 c8 96 00 |......q.o.......|
00000240: 0e 06 70 0d 00 00 00 0e ee 0f 70 05 00 00 00 30 |..p.......p....0|
00000250: 04 f5 00 00 00 96 00 71 39 e5 00 00 00 c7 04 f6 |.......q9.......|
00000260: 00 00 00 04 19 00 00 00 f3 29 d2 03 16 16 00 04 |.........)......|
00000270: 08 41 14 3f 03 28 04 00 0e 08 07 64 00 2c 0b 1b |.A.?.(.....d.,..|
00000280: 0e 39 01 00                                     |.9..|
```

### WASM
```
00000000: 05 13 02 65 0c 61 73 73 65 72 74 1e 74 65 73 74 |...e.assert.test|
00000010: 5f 74 72 79 5f 63 61 74 63 68 37 18 5f 5f 6c 6f |_try_catch7.__lo|
00000020: 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f 61 73 |adScript.test_as|
00000030: 73 65 72 74 2e 6a 73 4a 5f 5f 74 65 73 74 73 5f |sert.jsJ__tests_|
00000040: 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 73 74 5f |_/fixtures/test_|
00000050: 74 72 79 5f 63 61 74 63 68 37 2e 6a 73 0c 61 63 |try_catch7.js.ac|
00000060: 74 75 61 6c 10 65 78 70 65 63 74 65 64 2e 61 73 |tual.expected.as|
00000070: 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 |sertion failed: |
00000080: 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 |got |.|., expect|
00000090: 65 64 20 7c 04 20 28 02 29 02 73 02 74 02 61 02 |ed |. (.).s.t.a.|
000000a0: 66 02 67 08 74 66 61 67 0c 00 06 00 a4 01 00 02 |f.g.tfag........|
000000b0: 00 03 00 02 3e 02 a6 01 00 00 00 c8 03 03 00 03 |....>...........|
000000c0: 40 e5 00 00 00 40 40 e6 00 00 00 40 c2 00 41 e5 |@....@@....@..A.|
000000d0: 00 00 00 00 c2 01 41 e6 00 00 00 00 06 cb 6f 13 |......A.......o.|
000000e0: 00 00 00 39 e7 00 00 00 04 e8 00 00 00 f1 cb 0e |...9............|
000000f0: ee 0b cc 6f 07 00 00 00 0e ee 02 30 c7 28 d2 03 |...o.......0.(..|
00000100: 08 00 00 00 23 24 08 34 18 00 0c 43 06 00 ca 03 |....#$.4...C....|
00000110: 03 01 03 04 00 00 79 04 d4 03 00 01 00 d6 03 00 |......y.........|
00000120: 01 00 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb |..h.............|
00000130: b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed 2f |...........).../|
00000140: d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 |...+...K.....!..|
00000150: 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 00 |.K.......C9...$.|
00000160: 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 9f |..C9...$.....)9.|
00000170: 00 00 00 04 ec 00 00 00 d3 9f 04 ed 00 00 00 9f |................|
00000180: 04 ee 00 00 00 9f d4 9f 04 ed 00 00 00 9f d5 ec |................|
00000190: 10 04 ef 00 00 00 d5 9f 04 f0 00 00 00 9f ee 02 |................|
000001a0: c3 9f f1 30 d2 03 50 03 00 12 10 07 12 0c 10 12 |...0..P.........|
000001b0: 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 18 07 |!...............|
000001c0: 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 |..#../,..0Y.....|
000001d0: 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 20 |......).)..4D.. |
000001e0: 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 20 |. ..?.. ..1*".. |
000001f0: 14 15 0c 06 31 07 15 00 0c 43 06 00 cc 03 00 02 |....1....C......|
00000200: 00 04 00 00 5a 02 e2 03 00 00 00 c8 03 05 00 03 |....Z...........|
00000210: c3 cb 6f 24 00 00 00 6f 11 00 00 00 04 f2 00 00 |..o$...o........|
00000220: 00 96 00 04 f3 00 00 00 30 70 05 00 00 00 30 04 |........0p....0.|
00000230: f4 00 00 00 96 00 71 cc 6f 11 00 00 00 c8 96 00 |......q.o.......|
00000240: 0e 06 70 0d 00 00 00 0e ee 0f 70 05 00 00 00 30 |..p.......p....0|
00000250: 04 f5 00 00 00 96 00 71 39 e5 00 00 00 c7 04 f6 |.......q9.......|
00000260: 00 00 00 04 19 00 00 00 f3 29 d2 03 16 16 00 04 |.........)......|
00000270: 08 41 14 3f 03 28 04 00 0e 08 07 64 00 2c 0b 1b |.A.?.(.....d.,..|
00000280: 0e 39 01 00                                     |.9..|
```