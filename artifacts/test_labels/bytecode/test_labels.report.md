# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_labels.ts
**生成时间**: 2026-01-01T07:23:50.964Z

## 大小对比

- TypeScript编译器: 462 字节
- WASM编译器: 462 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 11,
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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_labels",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_labels.js",
      "offset": 21
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 74
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 98
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 100
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 113
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 116
    }
  ],
  "functionHeader": {
    "offset": 118,
    "tag": "0xc",
    "remaining": 344
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 11,
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
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_labels",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_labels.js",
      "offset": 21
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 74
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 98
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 100
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 113
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 116
    }
  ],
  "functionHeader": {
    "offset": 118,
    "tag": "0xc",
    "remaining": 344
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0b 0c 61 73 73 65 72 74 16 74 65 73 74 5f 6c |...assert.test_l|
00000010: 61 62 65 6c 73 42 5f 5f 74 65 73 74 73 5f 5f 2f |abelsB__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 74 65 73 74 5f 6c 61 |fixtures/test_la|
00000030: 62 65 6c 73 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |bels.js.actual.e|
00000040: 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 |xpected.is.asser|
00000050: 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 |tion failed: got|
00000060: 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 | |.|., expected |
00000070: 7c 04 20 28 02 29 0c 00 06 00 a4 01 00 01 00 01 ||. (.)..........|
00000080: 00 02 1e 01 a6 01 00 00 00 40 e4 00 00 00 40 40 |.........@....@@|
00000090: e5 00 00 00 40 c2 00 41 e4 00 00 00 00 c2 01 41 |....@..A.......A|
000000a0: e5 00 00 00 00 c7 28 cc 03 02 00 00 00 0c 43 06 |......(.......C.|
000000b0: 00 c8 03 03 01 03 04 00 00 85 01 04 ce 03 00 01 |................|
000000c0: 00 d0 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c |......h.........|
000000d0: 01 cb c7 eb b8 ab ec 03 0a d8 39 9d 00 00 00 43 |..........9....C|
000000e0: e9 00 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 ed 2f |......$....).../|
000000f0: d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 |...+...K.....!..|
00000100: 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 00 |.K.......C9...$.|
00000110: 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 9f |..C9...$.....)9.|
00000120: 00 00 00 04 ea 00 00 00 d3 9f 04 eb 00 00 00 9f |................|
00000130: 04 ec 00 00 00 9f d4 9f 04 eb 00 00 00 9f d5 ec |................|
00000140: 10 04 ed 00 00 00 d5 9f 04 ee 00 00 00 9f ee 02 |................|
00000150: c3 9f f1 30 cc 03 54 00 00 12 10 07 12 0c 10 12 |...0..T.........|
00000160: 21 0d 00 1b 0c 1b 08 07 10 07 11 1c 11 08 00 07 |!...............|
00000170: 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 |......#../,..0Y.|
00000180: 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 |..........).)..4|
00000190: 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a |D.. . ..?.. ..1*|
000001a0: 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 |".. ....1....C..|
000001b0: ca 03 00 01 00 01 00 00 09 01 ac 01 06 00 00 ee |................|
000001c0: 01 0b 63 00 00 73 cb 29 cc 03 02 0d 00 00       |..c..s.)......|
```

### WASM
```
00000000: 05 0b 0c 61 73 73 65 72 74 16 74 65 73 74 5f 6c |...assert.test_l|
00000010: 61 62 65 6c 73 42 5f 5f 74 65 73 74 73 5f 5f 2f |abelsB__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 74 65 73 74 5f 6c 61 |fixtures/test_la|
00000030: 62 65 6c 73 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |bels.js.actual.e|
00000040: 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 |xpected.is.asser|
00000050: 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 |tion failed: got|
00000060: 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 | |.|., expected |
00000070: 7c 04 20 28 02 29 0c 00 06 00 a4 01 00 01 00 01 ||. (.)..........|
00000080: 00 02 1e 01 a6 01 00 00 00 40 e4 00 00 00 40 40 |.........@....@@|
00000090: e5 00 00 00 40 c2 00 41 e4 00 00 00 00 c2 01 41 |....@..A.......A|
000000a0: e5 00 00 00 00 c7 28 cc 03 02 00 00 00 0c 43 06 |......(.......C.|
000000b0: 00 c8 03 03 01 03 04 00 00 85 01 04 ce 03 00 01 |................|
000000c0: 00 d0 03 00 01 00 68 00 01 00 9e 01 00 01 00 0c |......h.........|
000000d0: 01 cb c7 eb b8 ab ec 03 0a d8 39 9d 00 00 00 43 |..........9....C|
000000e0: e9 00 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 ed 2f |......$....).../|
000000f0: d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 99 |...+...K.....!..|
00000100: 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 00 |.K.......C9...$.|
00000110: 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 9f |..C9...$.....)9.|
00000120: 00 00 00 04 ea 00 00 00 d3 9f 04 eb 00 00 00 9f |................|
00000130: 04 ec 00 00 00 9f d4 9f 04 eb 00 00 00 9f d5 ec |................|
00000140: 10 04 ed 00 00 00 d5 9f 04 ee 00 00 00 9f ee 02 |................|
00000150: c3 9f f1 30 cc 03 54 00 00 12 10 07 12 0c 10 12 |...0..T.........|
00000160: 21 0d 00 1b 0c 1b 08 07 10 07 11 1c 11 08 00 07 |!...............|
00000170: 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 |......#../,..0Y.|
00000180: 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 04 34 |..........).)..4|
00000190: 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 31 2a |D.. . ..?.. ..1*|
000001a0: 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 06 00 |".. ....1....C..|
000001b0: ca 03 00 01 00 01 00 00 09 01 ac 01 06 00 00 ee |................|
000001c0: 01 0b 63 00 00 73 cb 29 cc 03 02 0d 00 00       |..c..s.)......|
```