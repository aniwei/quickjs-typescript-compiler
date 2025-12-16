# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-await-of.ts
**生成时间**: 2025-12-16T14:11:02.510Z

## 大小对比

- TypeScript编译器: 444 字节
- WASM编译器: 301 字节
- 差异: 143 字节 (47.51%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "numbers",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "main",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-await-of.js",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 51
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 387
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "numbers",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "main",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-await-of.js",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 54
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 233
  }
}
```

## 字节级差异

共发现 356 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x07
- 偏移量 0x32: TS=0x00 vs WASM=0x06
- 偏移量 0x33: TS=0x06 vs WASM=0x73
- 偏移量 0x34: TS=0x73 vs WASM=0x75
- 偏移量 0x35: TS=0x75 vs WASM=0x6d
- 偏移量 0x36: TS=0x6d vs WASM=0x02
- 偏移量 0x37: TS=0x02 vs WASM=0x6e
- 偏移量 0x38: TS=0x6e vs WASM=0x0e
- 偏移量 0x39: TS=0x0c vs WASM=0x63
- 偏移量 0x3a: TS=0x00 vs WASM=0x6f
- 偏移量 0x3b: TS=0x06 vs WASM=0x6e
- 偏移量 0x3c: TS=0x00 vs WASM=0x73
- 偏移量 0x3d: TS=0xa4 vs WASM=0x6f
- 偏移量 0x3e: TS=0x01 vs WASM=0x6c
- 偏移量 0x3f: TS=0x00 vs WASM=0x65
- 偏移量 0x40: TS=0x01 vs WASM=0x06
- 偏移量 0x41: TS=0x00 vs WASM=0x6c
- 偏移量 0x42: TS=0x01 vs WASM=0x6f
- 偏移量 0x43: TS=0x00 vs WASM=0x67
- 偏移量 0x44: TS=0x02 vs WASM=0x0c
- ... (显示前20个差异，总共356个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0e 6e 75 6d 62 65 72 73 08 6d 61 69 6e 44 |...numbers.mainD|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 66 6f 72 2d 61 77 61 69 74 2d 6f 66 2e |es/for-await-of.|
00000030: 6a 73 00 06 73 75 6d 02 6e 0c 00 06 00 a4 01 00 |js..sum.n.......|
00000040: 01 00 01 00 02 34 01 a6 01 00 00 00 c2 00 41 e4 |.....4........A.|
00000050: 00 00 00 00 c2 00 3b e4 00 00 00 c2 01 41 e5 00 |......;......A..|
00000060: 00 00 00 c2 01 3b e5 00 00 00 c2 00 3b e4 00 00 |.....;......;...|
00000070: 00 c2 01 3b e5 00 00 00 39 e5 00 00 00 f0 cf 28 |...;....9......(|
00000080: cc 03 0a 00 00 00 25 0a 00 00 07 0e 00 00 0c 72 |......%........r|
00000090: 06 00 c8 03 00 00 00 00 00 00 26 00 89 b6 01 00 |..........&.....|
000000a0: c8 20 00 00 00 c8 20 00 00 00 0e c8 2d 00 00 00 |. .... .....-...|
000000b0: c8 2d 00 00 00 0e c8 3a 00 00 00 c8 3a e7 00 00 |.-.....:....:...|
000000c0: 00 29 cc 03 00 00 0c 62 06 00 ca 03 00 02 00 00 |.).....b........|
000000d0: 00 00 d9 01 02 d0 03 01 00 20 d2 03 02 01 30 b6 |......... ....0.|
000000e0: 01 00 c8 6b 00 00 00 01 00 00 00 00 c8 65 00 00 |...k.........e..|
000000f0: 00 bf e7 00 00 00 01 00 b6 02 00 6e 04 00 00 00 |...........n....|
00000100: b8 03 00 00 00 bf e8 00 00 00 02 00 6e 01 00 00 |............n...|
00000110: 00 b8 04 00 00 00 c8 88 00 00 00 ba e5 00 00 00 |................|
00000120: 02 00 22 00 00 b7 02 00 7f 6e 00 00 00 00 b8 01 |.."......n......|
00000130: 00 00 00 b6 03 00 c8 9d 00 00 00 c8 9d 00 00 00 |................|
00000140: ba e7 00 00 00 03 00 c8 a4 00 00 00 ba e8 00 00 |................|
00000150: 00 03 00 c8 a1 00 00 00 9f b8 05 00 00 00 bb e7 |................|
00000160: 00 00 00 03 00 0e b7 03 00 b7 02 00 b8 00 00 00 |................|
00000170: 00 82 00 6c 03 00 00 00 0e b8 02 00 00 00 86 b7 |...l............|
00000180: 02 00 c8 b1 00 00 00 c8 b1 00 00 00 ba e9 00 00 |................|
00000190: 00 01 00 43 ea 00 00 00 c8 bd 00 00 00 04 e8 00 |...C............|
000001a0: 00 00 c8 c4 00 00 00 ba e7 00 00 00 01 00 c8 b1 |................|
000001b0: 00 00 00 24 02 00 0e 29 cc 03 00 00             |...$...)....|
```

### WASM
```
00000000: 05 07 0e 6e 75 6d 62 65 72 73 08 6d 61 69 6e 44 |...numbers.mainD|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 66 6f 72 2d 61 77 61 69 74 2d 6f 66 2e |es/for-await-of.|
00000030: 6a 73 06 73 75 6d 02 6e 0e 63 6f 6e 73 6f 6c 65 |js.sum.n.console|
00000040: 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 01 00 02 |.log............|
00000050: 24 01 a6 01 00 00 00 40 e4 00 00 00 40 40 e5 00 |$......@....@@..|
00000060: 00 00 40 c2 00 41 e4 00 00 00 00 c2 01 41 e5 00 |..@..A.......A..|
00000070: 00 00 00 39 e5 00 00 00 f0 cf 28 cc 03 08 00 00 |...9......(.....|
00000080: 00 1c 18 00 1b 08 00 0c 72 06 00 c8 03 00 00 00 |........r.......|
00000090: 02 00 00 1f 00 89 b8 8d 8a ec 04 8d 8d 2f 0e b9 |............./..|
000000a0: 8d 8a ec 04 8d 8d 2f 0e ba 8d 8a ec 04 8d 8d 2f |....../......../|
000000b0: 0e 06 8d 2f cc 03 08 00 00 08 08 30 00 30 00 00 |.../.......0.0..|
000000c0: 0c 62 06 00 ca 03 00 02 00 05 00 00 3d 02 ce 03 |.b..........=...|
000000d0: 01 00 20 d0 03 02 01 30 63 00 00 b7 cb 63 01 00 |.. ....0c....c..|
000000e0: 39 e4 00 00 00 f0 80 ee 0e cc 64 00 00 64 01 00 |9.........d..d..|
000000f0: 9f 11 65 00 00 0e 83 8d 85 ec ef 0e 86 39 e9 00 |..e..........9..|
00000100: 00 00 43 ea 00 00 00 04 e7 00 00 00 64 00 00 24 |..C.........d..$|
00000110: 02 00 0e 06 2f cc 03 14 05 00 2c 34 1b 0e 1c 31 |..../.....,4...1|
00000120: 11 0e 11 05 45 0f 1b 0e 34 18 11 0f 00          |....E...4....|
```