# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/complex-async-flow.ts
**生成时间**: 2026-01-07T07:07:35.726Z

## 大小对比

- TypeScript编译器: 320 字节
- WASM编译器: 320 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/complex-async-flow.js",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 263
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/complex-async-flow.js",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 263
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 06 67 65 6e 06 72 75 6e 50 5f 5f 74 65 73 |...gen.runP__tes|
00000010: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000020: 6d 70 6c 65 78 2d 61 73 79 6e 63 2d 66 6c 6f 77 |mplex-async-flow|
00000030: 2e 6a 73 06 73 75 6d 02 78 0c 00 06 00 a4 01 00 |.js.sum.x.......|
00000040: 01 00 01 00 02 24 01 a6 01 00 00 00 40 e4 00 00 |.....$......@...|
00000050: 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 00 |.@@....@..A.....|
00000060: c2 01 41 e5 00 00 00 00 39 e5 00 00 00 f0 cf 28 |..A.....9......(|
00000070: cc 03 08 00 00 00 1c 26 00 1b 06 00 0c 72 06 00 |.......&.....r..|
00000080: c8 03 00 00 00 02 00 00 16 00 89 b8 8d 8a ec 04 |................|
00000090: 8d 8d 2f 0e b9 8d 8a ec 04 8d 8d 2f 0e 06 8d 2f |../......../.../|
000000a0: cc 03 06 00 00 08 08 30 00 00 0c 62 06 00 ca 03 |.......0...b....|
000000b0: 00 02 00 06 00 00 5c 02 ce 03 01 00 20 d0 03 03 |......\..... ...|
000000c0: 01 30 63 00 00 b7 cb 6f 40 00 00 00 63 01 00 39 |.0c....o@...c..9|
000000d0: e4 00 00 00 f0 80 ee 20 cc 64 00 00 64 01 00 9f |....... .d..d...|
000000e0: 11 65 00 00 0e 64 01 00 b8 ad ed 0c 64 00 00 bf |.e...d......d...|
000000f0: 0a 9f 11 65 00 00 0e 83 8d 85 ec dd 0e 86 0e 06 |...e............|
00000100: 70 0d 00 00 00 0e ee 13 70 05 00 00 00 30 64 00 |p.......p....0d.|
00000110: 00 bf 64 9f 11 65 00 00 0e 71 64 00 00 2f cc 03 |..d..e...qd../..|
00000120: 1e 04 00 46 3c 1b 06 1c 29 11 0e 11 05 21 00 16 |...F<...)....!..|
00000130: 04 13 0b 1b 08 00 1d 08 0f 1b 08 27 01 11 0d 00 |...........'....|
```

### WASM
```
00000000: 05 05 06 67 65 6e 06 72 75 6e 50 5f 5f 74 65 73 |...gen.runP__tes|
00000010: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000020: 6d 70 6c 65 78 2d 61 73 79 6e 63 2d 66 6c 6f 77 |mplex-async-flow|
00000030: 2e 6a 73 06 73 75 6d 02 78 0c 00 06 00 a4 01 00 |.js.sum.x.......|
00000040: 01 00 01 00 02 24 01 a6 01 00 00 00 40 e4 00 00 |.....$......@...|
00000050: 00 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 00 |.@@....@..A.....|
00000060: c2 01 41 e5 00 00 00 00 39 e5 00 00 00 f0 cf 28 |..A.....9......(|
00000070: cc 03 08 00 00 00 1c 26 00 1b 06 00 0c 72 06 00 |.......&.....r..|
00000080: c8 03 00 00 00 02 00 00 16 00 89 b8 8d 8a ec 04 |................|
00000090: 8d 8d 2f 0e b9 8d 8a ec 04 8d 8d 2f 0e 06 8d 2f |../......../.../|
000000a0: cc 03 06 00 00 08 08 30 00 00 0c 62 06 00 ca 03 |.......0...b....|
000000b0: 00 02 00 06 00 00 5c 02 ce 03 01 00 20 d0 03 03 |......\..... ...|
000000c0: 01 30 63 00 00 b7 cb 6f 40 00 00 00 63 01 00 39 |.0c....o@...c..9|
000000d0: e4 00 00 00 f0 80 ee 20 cc 64 00 00 64 01 00 9f |....... .d..d...|
000000e0: 11 65 00 00 0e 64 01 00 b8 ad ed 0c 64 00 00 bf |.e...d......d...|
000000f0: 0a 9f 11 65 00 00 0e 83 8d 85 ec dd 0e 86 0e 06 |...e............|
00000100: 70 0d 00 00 00 0e ee 13 70 05 00 00 00 30 64 00 |p.......p....0d.|
00000110: 00 bf 64 9f 11 65 00 00 0e 71 64 00 00 2f cc 03 |..d..e...qd../..|
00000120: 1e 04 00 46 3c 1b 06 1c 29 11 0e 11 05 21 00 16 |...F<...)....!..|
00000130: 04 13 0b 1b 08 00 1d 08 0f 1b 08 27 01 11 0d 00 |...........'....|
```