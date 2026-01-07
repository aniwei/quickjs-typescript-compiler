# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-await-of.ts
**生成时间**: 2026-01-07T07:07:35.941Z

## 大小对比

- TypeScript编译器: 301 字节
- WASM编译器: 301 字节
- 差异: 0 字节 (0.00%)

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

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
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