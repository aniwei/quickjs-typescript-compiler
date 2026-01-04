# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_cyclic_labels.ts
**生成时间**: 2026-01-03T05:24:00.021Z

## 大小对比

- TypeScript编译器: 517 字节
- WASM编译器: 517 字节
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_cyclic_labels",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 30
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 43
    },
    {
      "index": 5,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_cyclic_labels.js",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 99
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 106
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 115
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 139
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 141
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 154
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 159,
    "tag": "0xc",
    "remaining": 358
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_cyclic_labels",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 30
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 43
    },
    {
      "index": 5,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_cyclic_labels.js",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 99
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 106
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 115
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 139
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 141
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 154
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 159,
    "tag": "0xc",
    "remaining": 358
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0d 02 65 0c 61 73 73 65 72 74 24 74 65 73 74 |...e.assert$test|
00000010: 5f 63 79 63 6c 69 63 5f 6c 61 62 65 6c 73 18 5f |_cyclic_labels._|
00000020: 5f 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 74 |_loadScript.test|
00000030: 5f 61 73 73 65 72 74 2e 6a 73 50 5f 5f 74 65 73 |_assert.jsP__tes|
00000040: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 |ts__/fixtures/te|
00000050: 73 74 5f 63 79 63 6c 69 63 5f 6c 61 62 65 6c 73 |st_cyclic_labels|
00000060: 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 |.js.actual.expec|
00000070: 74 65 64 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 |ted.assertion fa|
00000080: 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 |iled: got |.|., |
00000090: 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 0c |expected |. (.).|
000000a0: 00 06 00 a4 01 00 02 00 03 00 02 3e 02 a6 01 00 |...........>....|
000000b0: 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 00 |.......@....@@..|
000000c0: 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 e6 00 |..@..A.......A..|
000000d0: 00 00 00 06 cb 6f 13 00 00 00 39 e7 00 00 00 04 |.....o....9.....|
000000e0: e8 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 0e |..........o.....|
000000f0: ee 02 30 c7 28 d2 03 08 00 00 00 23 24 08 34 18 |..0.(......#$.4.|
00000100: 00 0c 43 06 00 ca 03 03 01 03 04 00 00 79 04 d4 |..C..........y..|
00000110: 03 00 01 00 d6 03 00 01 00 68 00 01 00 9e 01 00 |.........h......|
00000120: 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 d3 d4 ad |................|
00000130: ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 |..).../...+...K.|
00000140: 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 |....!...K.......|
00000150: 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 |C9...$...C9...$.|
00000160: 00 ad ec 02 29 39 9f 00 00 00 04 ec 00 00 00 d3 |....)9..........|
00000170: 9f 04 ed 00 00 00 9f 04 ee 00 00 00 9f d4 9f 04 |................|
00000180: ed 00 00 00 9f d5 ec 10 04 ef 00 00 00 d5 9f 04 |................|
00000190: f0 00 00 00 9f ee 02 c3 9f f1 30 d2 03 50 03 00 |..........0..P..|
000001a0: 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 12 0d |.......!........|
000001b0: 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 |.........#../,..|
000001c0: 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 |0Y...........).)|
000001d0: 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 |..4D.. . ..?.. .|
000001e0: 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c |.1*".. ....1....|
000001f0: 43 06 00 cc 03 00 00 00 00 00 00 02 00 ee ff d2 |C...............|
00000200: 03 02 16 00 00                                  |.....|
```

### WASM
```
00000000: 05 0d 02 65 0c 61 73 73 65 72 74 24 74 65 73 74 |...e.assert$test|
00000010: 5f 63 79 63 6c 69 63 5f 6c 61 62 65 6c 73 18 5f |_cyclic_labels._|
00000020: 5f 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 74 |_loadScript.test|
00000030: 5f 61 73 73 65 72 74 2e 6a 73 50 5f 5f 74 65 73 |_assert.jsP__tes|
00000040: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 |ts__/fixtures/te|
00000050: 73 74 5f 63 79 63 6c 69 63 5f 6c 61 62 65 6c 73 |st_cyclic_labels|
00000060: 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 |.js.actual.expec|
00000070: 74 65 64 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 |ted.assertion fa|
00000080: 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 |iled: got |.|., |
00000090: 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 0c |expected |. (.).|
000000a0: 00 06 00 a4 01 00 02 00 03 00 02 3e 02 a6 01 00 |...........>....|
000000b0: 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 00 |.......@....@@..|
000000c0: 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 e6 00 |..@..A.......A..|
000000d0: 00 00 00 06 cb 6f 13 00 00 00 39 e7 00 00 00 04 |.....o....9.....|
000000e0: e8 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 0e |..........o.....|
000000f0: ee 02 30 c7 28 d2 03 08 00 00 00 23 24 08 34 18 |..0.(......#$.4.|
00000100: 00 0c 43 06 00 ca 03 03 01 03 04 00 00 79 04 d4 |..C..........y..|
00000110: 03 00 01 00 d6 03 00 01 00 68 00 01 00 9e 01 00 |.........h......|
00000120: 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 d3 d4 ad |................|
00000130: ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 |..).../...+...K.|
00000140: 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 |....!...K.......|
00000150: 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 |C9...$...C9...$.|
00000160: 00 ad ec 02 29 39 9f 00 00 00 04 ec 00 00 00 d3 |....)9..........|
00000170: 9f 04 ed 00 00 00 9f 04 ee 00 00 00 9f d4 9f 04 |................|
00000180: ed 00 00 00 9f d5 ec 10 04 ef 00 00 00 d5 9f 04 |................|
00000190: f0 00 00 00 9f ee 02 c3 9f f1 30 d2 03 50 03 00 |..........0..P..|
000001a0: 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 12 0d |.......!........|
000001b0: 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 |.........#../,..|
000001c0: 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 |0Y...........).)|
000001d0: 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 |..4D.. . ..?.. .|
000001e0: 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c |.1*".. ....1....|
000001f0: 43 06 00 cc 03 00 00 00 00 00 00 02 00 ee ff d2 |C...............|
00000200: 03 02 16 00 00                                  |.....|
```