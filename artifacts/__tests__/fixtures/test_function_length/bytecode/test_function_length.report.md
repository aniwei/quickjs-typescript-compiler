# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_function_length.ts
**生成时间**: 2026-01-03T14:09:18.814Z

## 大小对比

- TypeScript编译器: 858 字节
- WASM编译器: 858 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 15,
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
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "test_function_length",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_function_length.js",
      "offset": 30
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 80
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 89
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 92
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 116
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 118
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 131
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 134
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 136
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 138
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 140
    },
    {
      "index": 14,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 142
    }
  ],
  "functionHeader": {
    "offset": 144,
    "tag": "0xc",
    "remaining": 714
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 15,
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
      "rawLength": 40,
      "actualLength": 20,
      "isWideChar": 0,
      "string": "test_function_length",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_function_length.js",
      "offset": 30
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 80
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 89
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 92
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 116
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 118
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 131
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 134
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 136
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 138
    },
    {
      "index": 13,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 140
    },
    {
      "index": 14,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 142
    }
  ],
  "functionHeader": {
    "offset": 144,
    "tag": "0xc",
    "remaining": 714
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0f 0c 61 73 73 65 72 74 28 74 65 73 74 5f 66 |...assert(test_f|
00000010: 75 6e 63 74 69 6f 6e 5f 6c 65 6e 67 74 68 54 5f |unction_lengthT_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 74 65 73 74 5f 66 75 6e 63 74 69 6f 6e 5f |s/test_function_|
00000040: 6c 65 6e 67 74 68 2e 6a 73 0c 61 63 74 75 61 6c |length.js.actual|
00000050: 10 65 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 |.expected.is.ass|
00000060: 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 |ertion failed: g|
00000070: 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 |ot |.|., expecte|
00000080: 64 20 7c 04 20 28 02 29 02 61 02 62 02 63 02 64 |d |. (.).a.b.c.d|
00000090: 0c 00 06 00 a4 01 00 01 00 01 00 02 1e 01 a6 01 |................|
000000a0: 00 00 00 40 e4 00 00 00 40 40 e5 00 00 00 40 c2 |...@....@@....@.|
000000b0: 00 41 e4 00 00 00 00 c2 01 41 e5 00 00 00 00 c7 |.A.......A......|
000000c0: 28 cc 03 02 00 00 00 0c 43 06 00 c8 03 03 01 03 |(.......C.......|
000000d0: 04 00 00 85 01 04 ce 03 00 01 00 d0 03 00 01 00 |................|
000000e0: 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 ab |h...............|
000000f0: ec 03 0a d8 39 9d 00 00 00 43 e9 00 00 00 d3 d4 |....9....C......|
00000100: 24 02 00 ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 |$....).../...+..|
00000110: 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab |.K.....!...K....|
00000120: ec 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 |...C9...$...C9..|
00000130: 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 ea 00 |.$.....)9.......|
00000140: 00 00 d3 9f 04 eb 00 00 00 9f 04 ec 00 00 00 9f |................|
00000150: d4 9f 04 eb 00 00 00 9f d5 ec 10 04 ed 00 00 00 |................|
00000160: d5 9f 04 ee 00 00 00 9f ee 02 c3 9f f1 30 cc 03 |.............0..|
00000170: 54 00 00 12 10 07 12 0c 10 12 21 0d 00 1b 0c 1b |T.........!.....|
00000180: 08 07 10 07 11 1c 11 08 00 07 0e 11 18 07 12 12 |................|
00000190: 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 |#../,..0Y.......|
000001a0: 10 1b 12 11 29 12 29 08 04 34 44 07 03 20 12 20 |....).)..4D.. . |
000001b0: 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 20 14 15 |..?.. ..1*".. ..|
000001c0: 0c 06 31 07 15 00 0c 43 06 00 ca 03 00 00 00 03 |..1....C........|
000001d0: 00 04 2c 00 39 e4 00 00 00 c2 00 eb b8 f2 0e 39 |..,.9..........9|
000001e0: e4 00 00 00 c2 01 eb b8 f2 0e 39 e4 00 00 00 c2 |..........9.....|
000001f0: 02 eb b8 f2 0e 39 e4 00 00 00 c2 03 eb b8 f2 29 |.....9.........)|
00000200: cc 03 1a 0d 00 03 08 25 3a 0c 2d 0d 0b 25 30 0c |.......%:.-..%0.|
00000210: 23 0d 0b 25 34 0c 27 0d 0b 25 44 0c 37 00 0c 40 |#..%4.'..%D.7..@|
00000220: 06 00 00 03 03 01 02 00 00 17 06 de 03 00 01 00 |................|
00000230: e0 03 00 01 00 e2 03 00 01 00 de 03 01 ff ff ff |................|
00000240: ff 0f 20 e0 03 01 01 20 e2 03 01 02 20 63 02 00 |.. .... .... c..|
00000250: 63 01 00 63 00 00 d3 cb d4 11 f4 ec 04 0e b8 dc |c..c............|
00000260: cc d5 cd 29 cc 03 02 0e 0c 00 0c 40 06 00 00 01 |...).......@....|
00000270: 02 01 07 00 00 1a 03 00 00 01 00 de 03 00 00 00 |................|
00000280: e0 03 00 01 00 d3 7f 7a ef 00 00 00 00 00 82 02 |.......z........|
00000290: 0e 3e 7a f0 00 00 00 01 00 82 02 0e 3e 86 29 cc |.>z.........>.).|
000002a0: 03 02 0f 0c 00 0c 40 06 00 00 01 02 01 04 00 00 |......@.........|
000002b0: 21 03 00 00 01 00 de 03 00 00 00 e0 03 00 01 00 |!...............|
000002c0: d3 73 11 7a ef 00 00 00 00 00 1d 42 ef 00 00 00 |.s.z.......B....|
000002d0: 3e 11 7a f0 00 00 00 01 00 1d 42 f0 00 00 00 3e |>.z.......B....>|
000002e0: 29 cc 03 02 10 0c 00 0c 40 06 00 00 03 06 01 05 |).......@.......|
000002f0: 00 00 30 09 e2 03 00 01 00 00 00 01 00 e4 03 00 |..0.............|
00000300: 01 00 e2 03 01 ff ff ff ff 0f 20 de 03 01 01 20 |.......... .... |
00000310: e0 03 01 02 20 e4 03 01 03 20 e0 03 00 00 00 de |.... .... ......|
00000320: 03 00 05 00 63 03 00 63 02 00 63 01 00 63 00 00 |....c..c..c..c..|
00000330: d3 cb d4 11 f4 ed 0d 7f 82 00 0e cc 82 00 0e cd |................|
00000340: 86 ee 05 0e b8 ee f1 d5 ce 64 02 00 c5 04 64 01 |.........d....d.|
00000350: 00 c5 05 29 cc 03 02 11 0c 00                   |...)......|
```

### WASM
```
00000000: 05 0f 0c 61 73 73 65 72 74 28 74 65 73 74 5f 66 |...assert(test_f|
00000010: 75 6e 63 74 69 6f 6e 5f 6c 65 6e 67 74 68 54 5f |unction_lengthT_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 74 65 73 74 5f 66 75 6e 63 74 69 6f 6e 5f |s/test_function_|
00000040: 6c 65 6e 67 74 68 2e 6a 73 0c 61 63 74 75 61 6c |length.js.actual|
00000050: 10 65 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 |.expected.is.ass|
00000060: 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 |ertion failed: g|
00000070: 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 |ot |.|., expecte|
00000080: 64 20 7c 04 20 28 02 29 02 61 02 62 02 63 02 64 |d |. (.).a.b.c.d|
00000090: 0c 00 06 00 a4 01 00 01 00 01 00 02 1e 01 a6 01 |................|
000000a0: 00 00 00 40 e4 00 00 00 40 40 e5 00 00 00 40 c2 |...@....@@....@.|
000000b0: 00 41 e4 00 00 00 00 c2 01 41 e5 00 00 00 00 c7 |.A.......A......|
000000c0: 28 cc 03 02 00 00 00 0c 43 06 00 c8 03 03 01 03 |(.......C.......|
000000d0: 04 00 00 85 01 04 ce 03 00 01 00 d0 03 00 01 00 |................|
000000e0: 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 ab |h...............|
000000f0: ec 03 0a d8 39 9d 00 00 00 43 e9 00 00 00 d3 d4 |....9....C......|
00000100: 24 02 00 ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 |$....).../...+..|
00000110: 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab |.K.....!...K....|
00000120: ec 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 |...C9...$...C9..|
00000130: 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 ea 00 |.$.....)9.......|
00000140: 00 00 d3 9f 04 eb 00 00 00 9f 04 ec 00 00 00 9f |................|
00000150: d4 9f 04 eb 00 00 00 9f d5 ec 10 04 ed 00 00 00 |................|
00000160: d5 9f 04 ee 00 00 00 9f ee 02 c3 9f f1 30 cc 03 |.............0..|
00000170: 54 00 00 12 10 07 12 0c 10 12 21 0d 00 1b 0c 1b |T.........!.....|
00000180: 08 07 10 07 11 1c 11 08 00 07 0e 11 18 07 12 12 |................|
00000190: 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e 07 |#../,..0Y.......|
000001a0: 10 1b 12 11 29 12 29 08 04 34 44 07 03 20 12 20 |....).)..4D.. . |
000001b0: 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 20 14 15 |..?.. ..1*".. ..|
000001c0: 0c 06 31 07 15 00 0c 43 06 00 ca 03 00 00 00 03 |..1....C........|
000001d0: 00 04 2c 00 39 e4 00 00 00 c2 00 eb b8 f2 0e 39 |..,.9..........9|
000001e0: e4 00 00 00 c2 01 eb b8 f2 0e 39 e4 00 00 00 c2 |..........9.....|
000001f0: 02 eb b8 f2 0e 39 e4 00 00 00 c2 03 eb b8 f2 29 |.....9.........)|
00000200: cc 03 1a 0d 00 03 08 25 3a 0c 2d 0d 0b 25 30 0c |.......%:.-..%0.|
00000210: 23 0d 0b 25 34 0c 27 0d 0b 25 44 0c 37 00 0c 40 |#..%4.'..%D.7..@|
00000220: 06 00 00 03 03 01 02 00 00 17 06 de 03 00 01 00 |................|
00000230: e0 03 00 01 00 e2 03 00 01 00 de 03 01 ff ff ff |................|
00000240: ff 0f 20 e0 03 01 01 20 e2 03 01 02 20 63 02 00 |.. .... .... c..|
00000250: 63 01 00 63 00 00 d3 cb d4 11 f4 ec 04 0e b8 dc |c..c............|
00000260: cc d5 cd 29 cc 03 02 0e 0c 00 0c 40 06 00 00 01 |...).......@....|
00000270: 02 01 07 00 00 1a 03 00 00 01 00 de 03 00 00 00 |................|
00000280: e0 03 00 01 00 d3 7f 7a ef 00 00 00 00 00 82 02 |.......z........|
00000290: 0e 3e 7a f0 00 00 00 01 00 82 02 0e 3e 86 29 cc |.>z.........>.).|
000002a0: 03 02 0f 0c 00 0c 40 06 00 00 01 02 01 04 00 00 |......@.........|
000002b0: 21 03 00 00 01 00 de 03 00 00 00 e0 03 00 01 00 |!...............|
000002c0: d3 73 11 7a ef 00 00 00 00 00 1d 42 ef 00 00 00 |.s.z.......B....|
000002d0: 3e 11 7a f0 00 00 00 01 00 1d 42 f0 00 00 00 3e |>.z.......B....>|
000002e0: 29 cc 03 02 10 0c 00 0c 40 06 00 00 03 06 01 05 |).......@.......|
000002f0: 00 00 30 09 e2 03 00 01 00 00 00 01 00 e4 03 00 |..0.............|
00000300: 01 00 e2 03 01 ff ff ff ff 0f 20 de 03 01 01 20 |.......... .... |
00000310: e0 03 01 02 20 e4 03 01 03 20 e0 03 00 00 00 de |.... .... ......|
00000320: 03 00 05 00 63 03 00 63 02 00 63 01 00 63 00 00 |....c..c..c..c..|
00000330: d3 cb d4 11 f4 ed 0d 7f 82 00 0e cc 82 00 0e cd |................|
00000340: 86 ee 05 0e b8 ee f1 d5 ce 64 02 00 c5 04 64 01 |.........d....d.|
00000350: 00 c5 05 29 cc 03 02 11 0c 00                   |...)......|
```