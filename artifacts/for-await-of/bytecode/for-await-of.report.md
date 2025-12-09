# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-await-of.ts
**生成时间**: 2025-12-09T08:59:51.488Z

## 大小对比

- TypeScript编译器: 267 字节
- WASM编译器: 300 字节
- 差异: -33 字节 (-11.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-await-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "numbers",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "main",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 190
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-await-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "numbers",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "main",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 223
  }
}
```

## 字节级差异

共发现 156 个字节差异:

- 偏移量 0x3b: TS=0x02 vs WASM=0x06
- 偏移量 0x3c: TS=0x6e vs WASM=0x73
- 偏移量 0x3d: TS=0x06 vs WASM=0x75
- 偏移量 0x3e: TS=0x73 vs WASM=0x6d
- 偏移量 0x3f: TS=0x75 vs WASM=0x02
- 偏移量 0x40: TS=0x6d vs WASM=0x6e
- 偏移量 0x6d: TS=0x0b vs WASM=0x08
- 偏移量 0x74: TS=0xe0 vs WASM=0x29
- 偏移量 0x75: TS=0xf0 vs WASM=0xe0
- 偏移量 0x76: TS=0x0e vs WASM=0xf0
- 偏移量 0x77: TS=0x29 vs WASM=0x0e
- 偏移量 0x80: TS=0x09 vs WASM=0x0a
- 偏移量 0x87: TS=0x43 vs WASM=0x72
- 偏移量 0x8f: TS=0x00 vs WASM=0x02
- 偏移量 0x92: TS=0x03 vs WASM=0x1f
- 偏移量 0x94: TS=0x0e vs WASM=0x89
- 偏移量 0x95: TS=0x0e vs WASM=0xb8
- 偏移量 0x96: TS=0x29 vs WASM=0x8d
- 偏移量 0x97: TS=0xc8 vs WASM=0x8a
- 偏移量 0x98: TS=0x03 vs WASM=0xec
- ... (显示前20个差异，总共156个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 61 77 61 69 74 2d 6f 66 2e 6a 73 0e 6e |or-await-of.js.n|
00000030: 75 6d 62 65 72 73 08 6d 61 69 6e 02 6e 06 73 75 |umbers.main.n.su|
00000040: 6d 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |m.console.log...|
00000050: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 02 |...... .........|
00000060: 02 0f 00 ca 03 00 01 cc 03 01 01 08 ec 0b c2 00 |................|
00000070: e3 c2 01 e4 e0 f0 0e 29 06 2f c8 03 08 00 00 00 |.......)./......|
00000080: 09 18 00 07 08 00 0c 43 06 01 ca 03 00 00 00 00 |.......C........|
00000090: 00 00 03 00 0e 0e 29 c8 03 08 00 00 03 08 08 00 |......).........|
000000a0: 08 00 00 0c 43 06 01 cc 03 00 01 00 05 01 00 37 |....C..........7|
000000b0: 01 ce 03 02 00 30 ca 03 00 00 63 00 00 df f0 7f |.....0....c.....|
000000c0: ee 12 cb 39 e8 00 00 00 64 00 00 9f 11 3a e8 00 |...9....d....:..|
000000d0: 00 00 0e 82 00 ec ec 0e 86 39 e9 00 00 00 43 ea |.........9....C.|
000000e0: 00 00 00 04 e8 00 00 00 39 e8 00 00 00 24 02 00 |........9....$..|
000000f0: 29 c8 03 16 05 00 13 34 07 0e 1c 31 1b 0e 11 05 |)......4...1....|
00000100: 0c 07 40 07 1b 0e 34 18 1b 0f 00                |..@...4....|
```

### WASM
```
00000000: 05 07 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 61 77 61 69 74 2d 6f 66 2e 6a 73 0e 6e |or-await-of.js.n|
00000030: 75 6d 62 65 72 73 08 6d 61 69 6e 06 73 75 6d 02 |umbers.main.sum.|
00000040: 6e 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |n.console.log...|
00000050: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 02 |...... .........|
00000060: 02 0f 00 ca 03 00 01 cc 03 01 01 08 ec 08 c2 00 |................|
00000070: e3 c2 01 e4 29 e0 f0 0e 06 2f c8 03 08 00 00 00 |....)..../......|
00000080: 0a 18 00 07 08 00 0c 72 06 01 ca 03 00 00 00 02 |.......r........|
00000090: 00 00 1f 00 89 b8 8d 8a ec 04 8d 8d 2f 0e b9 8d |............/...|
000000a0: 8a ec 04 8d 8d 2f 0e ba 8d 8a ec 04 8d 8d 2f 0e |...../......../.|
000000b0: 06 8d 2f c8 03 08 00 00 08 08 30 00 30 00 00 0c |../.......0.0...|
000000c0: 62 06 01 cc 03 00 02 00 05 01 00 39 02 ce 03 01 |b..........9....|
000000d0: 00 20 d0 03 02 01 30 ca 03 00 00 63 00 00 b7 cb |. ....0....c....|
000000e0: 63 01 00 df f0 80 ee 0e cc 64 00 00 64 01 00 9f |c........d..d...|
000000f0: 11 65 00 00 0e 83 8d 85 ec ef 0e 86 39 e9 00 00 |.e..........9...|
00000100: 00 43 ea 00 00 00 04 e7 00 00 00 64 00 00 24 02 |.C.........d..$.|
00000110: 00 0e 06 2f c8 03 14 05 00 2c 34 07 0e 1c 31 11 |.../.....,4...1.|
00000120: 0e 11 05 45 0f 1b 0e 34 18 11 0f 00             |...E...4....|
```