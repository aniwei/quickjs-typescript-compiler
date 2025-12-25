# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/async-await-promise-chain-no-top-level-await-044.ts
**生成时间**: 2025-12-25T08:56:15.924Z

## 大小对比

- TypeScript编译器: 328 字节
- WASM编译器: 328 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "run44",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 140,
      "actualLength": 70,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-await-promise-chain-no-top-level-await-044.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 80
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 82
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 84
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 86
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 88
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xc",
    "remaining": 228
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "run44",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 140,
      "actualLength": 70,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-await-promise-chain-no-top-level-await-044.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 80
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 82
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 84
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 86
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 88
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xc",
    "remaining": 228
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 0a 72 75 6e 34 34 8c 01 5f 5f 74 65 73 74 |...run44..__test|
00000010: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 61 73 79 |s__/fixtures/asy|
00000020: 6e 63 2d 61 77 61 69 74 2d 70 72 6f 6d 69 73 65 |nc-await-promise|
00000030: 2d 63 68 61 69 6e 2d 6e 6f 2d 74 6f 70 2d 6c 65 |-chain-no-top-le|
00000040: 76 65 6c 2d 61 77 61 69 74 2d 30 34 34 2e 6a 73 |vel-await-044.js|
00000050: 02 70 02 61 02 62 02 76 0e 63 6f 6e 73 6f 6c 65 |.p.a.b.v.console|
00000060: 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 03 00 02 |.log............|
00000070: 20 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 | ......@....@..A|
00000080: e4 00 00 00 00 39 e4 00 00 00 f0 43 81 00 00 00 |.....9.....C....|
00000090: c2 01 24 01 00 cf 28 ca 03 0c 00 00 00 0e 0e 00 |..$...(.........|
000000a0: 1b 0a 07 04 25 0a 00 0c 62 06 00 c8 03 00 03 00 |....%...b.......|
000000b0: 04 00 00 38 03 cc 03 01 00 30 ce 03 01 01 30 d0 |...8.....0....0.|
000000c0: 03 01 02 30 63 02 00 63 01 00 63 00 00 39 c7 00 |...0c..c..c..9..|
000000d0: 00 00 43 82 00 00 00 bf 2c 24 01 00 cb 64 00 00 |..C.....,$...d..|
000000e0: 8d cc 39 c7 00 00 00 43 82 00 00 00 64 01 00 b8 |..9....C....d...|
000000f0: 9f 24 01 00 8d cd 64 02 00 b9 9c 2f ca 03 1a 01 |.$....d..../....|
00000100: 00 30 1c 1b 0e 25 10 17 11 1c 00 1b 0e 1b 12 16 |.0...%..........|
00000110: 04 07 05 1c 2f 16 04 07 11 00 0c 02 06 00 00 01 |..../...........|
00000120: 00 01 03 00 00 0e 01 d2 03 00 01 00 39 ea 00 00 |............9...|
00000130: 00 43 eb 00 00 00 d3 25 01 00 ca 03 0a 07 0d 02 |.C.....%........|
00000140: 0a 1b 0e 1b 0a 07 01 00                         |........|
```

### WASM
```
00000000: 05 08 0a 72 75 6e 34 34 8c 01 5f 5f 74 65 73 74 |...run44..__test|
00000010: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 61 73 79 |s__/fixtures/asy|
00000020: 6e 63 2d 61 77 61 69 74 2d 70 72 6f 6d 69 73 65 |nc-await-promise|
00000030: 2d 63 68 61 69 6e 2d 6e 6f 2d 74 6f 70 2d 6c 65 |-chain-no-top-le|
00000040: 76 65 6c 2d 61 77 61 69 74 2d 30 34 34 2e 6a 73 |vel-await-044.js|
00000050: 02 70 02 61 02 62 02 76 0e 63 6f 6e 73 6f 6c 65 |.p.a.b.v.console|
00000060: 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 03 00 02 |.log............|
00000070: 20 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 | ......@....@..A|
00000080: e4 00 00 00 00 39 e4 00 00 00 f0 43 81 00 00 00 |.....9.....C....|
00000090: c2 01 24 01 00 cf 28 ca 03 0c 00 00 00 0e 0e 00 |..$...(.........|
000000a0: 1b 0a 07 04 25 0a 00 0c 62 06 00 c8 03 00 03 00 |....%...b.......|
000000b0: 04 00 00 38 03 cc 03 01 00 30 ce 03 01 01 30 d0 |...8.....0....0.|
000000c0: 03 01 02 30 63 02 00 63 01 00 63 00 00 39 c7 00 |...0c..c..c..9..|
000000d0: 00 00 43 82 00 00 00 bf 2c 24 01 00 cb 64 00 00 |..C.....,$...d..|
000000e0: 8d cc 39 c7 00 00 00 43 82 00 00 00 64 01 00 b8 |..9....C....d...|
000000f0: 9f 24 01 00 8d cd 64 02 00 b9 9c 2f ca 03 1a 01 |.$....d..../....|
00000100: 00 30 1c 1b 0e 25 10 17 11 1c 00 1b 0e 1b 12 16 |.0...%..........|
00000110: 04 07 05 1c 2f 16 04 07 11 00 0c 02 06 00 00 01 |..../...........|
00000120: 00 01 03 00 00 0e 01 d2 03 00 01 00 39 ea 00 00 |............9...|
00000130: 00 43 eb 00 00 00 d3 25 01 00 ca 03 0a 07 0d 02 |.C.....%........|
00000140: 0a 1b 0e 1b 0a 07 01 00                         |........|
```