# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/inc.ts
**生成时间**: 2026-01-08T02:49:37.857Z

## 大小对比

- TypeScript编译器: 692 字节
- WASM编译器: 692 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 16,
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
      "string": "test_inc_dec",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "__tests__/fixtures/inc.js",
      "offset": 22
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 48
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 91
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 93
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 106
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 109
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 111
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 113
    },
    {
      "index": 13,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "++",
      "offset": 115
    },
    {
      "index": 14,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "--",
      "offset": 118
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 121
    }
  ],
  "functionHeader": {
    "offset": 123,
    "tag": "0xc",
    "remaining": 569
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 16,
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
      "string": "test_inc_dec",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "__tests__/fixtures/inc.js",
      "offset": 22
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 48
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 91
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 93
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 106
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 109
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 111
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 113
    },
    {
      "index": 13,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "++",
      "offset": 115
    },
    {
      "index": 14,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "--",
      "offset": 118
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 121
    }
  ],
  "functionHeader": {
    "offset": 123,
    "tag": "0xc",
    "remaining": 569
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 10 0c 61 73 73 65 72 74 18 74 65 73 74 5f 69 |...assert.test_i|
00000010: 6e 63 5f 64 65 63 32 5f 5f 74 65 73 74 73 5f 5f |nc_dec2__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 69 6e 63 2e 6a 73 |/fixtures/inc.js|
00000030: 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 64 |.actual.expected|
00000040: 04 69 73 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 |.is.assertion fa|
00000050: 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 |iled: got |.|., |
00000060: 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 02 |expected |. (.).|
00000070: 61 02 72 04 2b 2b 04 2d 2d 02 78 0c 00 06 00 a4 |a.r.++.--.x.....|
00000080: 01 00 01 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 |..............@.|
00000090: 00 00 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 |...@@....@..A...|
000000a0: 00 00 c2 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 |....A......(....|
000000b0: 00 00 0c 43 06 00 c8 03 03 01 03 04 00 00 85 01 |...C............|
000000c0: 04 ce 03 00 01 00 d0 03 00 01 00 68 00 01 00 9e |...........h....|
000000d0: 01 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 |...............9|
000000e0: 9d 00 00 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 |....C......$....|
000000f0: 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 |).../...+...K...|
00000100: ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 |..!...K.......C9|
00000110: 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad |...$...C9...$...|
00000120: ec 02 29 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 |..)9............|
00000130: eb 00 00 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 |................|
00000140: 00 00 9f d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 |................|
00000150: 00 00 9f ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 |........0..T....|
00000160: 07 12 0c 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 |.....!..........|
00000170: 1c 11 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c |...........#../,|
00000180: 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..0Y...........)|
00000190: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
000001a0: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
000001b0: 00 0c 43 06 00 ca 03 00 02 00 04 00 00 96 01 02 |..C.............|
000001c0: de 03 00 00 00 e0 03 00 01 00 b8 cf 93 cb cc 39 |...............9|
000001d0: e4 00 00 00 c8 b8 ad 11 ec 05 0e c7 b9 ad 0a 04 |................|
000001e0: f1 00 00 00 f3 0e b8 cf 91 cf cc 39 e4 00 00 00 |...........9....|
000001f0: c8 b9 ad 11 ec 05 0e c7 b9 ad 0a 04 f1 00 00 00 |................|
00000200: f3 0e b8 cf 92 cb cc 39 e4 00 00 00 c8 b8 ad 11 |.......9........|
00000210: ec 05 0e c7 b7 ad 0a 04 f2 00 00 00 f3 0e b8 cf |................|
00000220: 90 cf cc 39 e4 00 00 00 c8 b7 ad 11 ec 05 0e c7 |...9............|
00000230: b7 ad 0a 04 f2 00 00 00 f3 0e 0b 0a 4e f3 00 00 |............N...|
00000240: 00 cf 43 f3 00 00 00 91 44 f3 00 00 00 39 e4 00 |..C.....D....9..|
00000250: 00 00 c7 42 f3 00 00 00 b9 04 f1 00 00 00 f3 29 |...B...........)|
00000260: cc 03 50 0d 00 04 08 0d 0a 12 09 1b 0e 0c 04 1b |..P.............|
00000270: 12 0c 04 25 1b 0d 0b 0d 08 12 07 1b 0e 0c 04 1b |...%............|
00000280: 12 0c 04 25 1b 0d 0b 0d 0a 12 09 1b 0e 0c 04 1b |...%............|
00000290: 12 0c 04 25 1b 0d 0b 0d 08 12 07 1b 0e 0c 04 1b |...%............|
000002a0: 12 0c 04 25 1b 0d 0b 2b 02 1b 04 21 05 1b 0e 07 |...%...+...!....|
000002b0: 02 39 03 00                                     |.9..|
```

### WASM
```
00000000: 05 10 0c 61 73 73 65 72 74 18 74 65 73 74 5f 69 |...assert.test_i|
00000010: 6e 63 5f 64 65 63 32 5f 5f 74 65 73 74 73 5f 5f |nc_dec2__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 69 6e 63 2e 6a 73 |/fixtures/inc.js|
00000030: 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 64 |.actual.expected|
00000040: 04 69 73 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 |.is.assertion fa|
00000050: 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 |iled: got |.|., |
00000060: 65 78 70 65 63 74 65 64 20 7c 04 20 28 02 29 02 |expected |. (.).|
00000070: 61 02 72 04 2b 2b 04 2d 2d 02 78 0c 00 06 00 a4 |a.r.++.--.x.....|
00000080: 01 00 01 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 |..............@.|
00000090: 00 00 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 |...@@....@..A...|
000000a0: 00 00 c2 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 |....A......(....|
000000b0: 00 00 0c 43 06 00 c8 03 03 01 03 04 00 00 85 01 |...C............|
000000c0: 04 ce 03 00 01 00 d0 03 00 01 00 68 00 01 00 9e |...........h....|
000000d0: 01 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 |...............9|
000000e0: 9d 00 00 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 |....C......$....|
000000f0: 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 |).../...+...K...|
00000100: ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 |..!...K.......C9|
00000110: 00 00 00 24 00 00 d4 43 39 00 00 00 24 00 00 ad |...$...C9...$...|
00000120: ec 02 29 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 |..)9............|
00000130: eb 00 00 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 |................|
00000140: 00 00 9f d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 |................|
00000150: 00 00 9f ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 |........0..T....|
00000160: 07 12 0c 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 |.....!..........|
00000170: 1c 11 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c |...........#../,|
00000180: 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..0Y...........)|
00000190: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
000001a0: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
000001b0: 00 0c 43 06 00 ca 03 00 02 00 04 00 00 96 01 02 |..C.............|
000001c0: de 03 00 00 00 e0 03 00 01 00 b8 cf 93 cb cc 39 |...............9|
000001d0: e4 00 00 00 c8 b8 ad 11 ec 05 0e c7 b9 ad 0a 04 |................|
000001e0: f1 00 00 00 f3 0e b8 cf 91 cf cc 39 e4 00 00 00 |...........9....|
000001f0: c8 b9 ad 11 ec 05 0e c7 b9 ad 0a 04 f1 00 00 00 |................|
00000200: f3 0e b8 cf 92 cb cc 39 e4 00 00 00 c8 b8 ad 11 |.......9........|
00000210: ec 05 0e c7 b7 ad 0a 04 f2 00 00 00 f3 0e b8 cf |................|
00000220: 90 cf cc 39 e4 00 00 00 c8 b7 ad 11 ec 05 0e c7 |...9............|
00000230: b7 ad 0a 04 f2 00 00 00 f3 0e 0b 0a 4e f3 00 00 |............N...|
00000240: 00 cf 43 f3 00 00 00 91 44 f3 00 00 00 39 e4 00 |..C.....D....9..|
00000250: 00 00 c7 42 f3 00 00 00 b9 04 f1 00 00 00 f3 29 |...B...........)|
00000260: cc 03 50 0d 00 04 08 0d 0a 12 09 1b 0e 0c 04 1b |..P.............|
00000270: 12 0c 04 25 1b 0d 0b 0d 08 12 07 1b 0e 0c 04 1b |...%............|
00000280: 12 0c 04 25 1b 0d 0b 0d 0a 12 09 1b 0e 0c 04 1b |...%............|
00000290: 12 0c 04 25 1b 0d 0b 0d 08 12 07 1b 0e 0c 04 1b |...%............|
000002a0: 12 0c 04 25 1b 0d 0b 2b 02 1b 04 21 05 1b 0e 07 |...%...+...!....|
000002b0: 02 39 03 00                                     |.9..|
```