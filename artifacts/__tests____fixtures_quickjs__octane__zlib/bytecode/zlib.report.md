# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/octane/zlib.ts
**生成时间**: 2026-01-06T17:02:13.997Z

## 大小对比

- TypeScript编译器: 382 字节
- WASM编译器: 382 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/zlib.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "./zlib-data.js",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 79
    },
    {
      "index": 5,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "InitializeZlibBenchmark",
      "offset": 94
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "runZlib",
      "offset": 118
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "tearDownZlib",
      "offset": 126
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "zlib",
      "offset": 139
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Ya",
      "offset": 144
    }
  ],
  "functionHeader": {
    "offset": 147,
    "tag": "0xd",
    "remaining": 235
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/zlib.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "./zlib-data.js",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 79
    },
    {
      "index": 5,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "InitializeZlibBenchmark",
      "offset": 94
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "runZlib",
      "offset": 118
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "tearDownZlib",
      "offset": 126
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "zlib",
      "offset": 139
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Ya",
      "offset": 144
    }
  ],
  "functionHeader": {
    "offset": 147,
    "tag": "0xd",
    "remaining": 235
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..R__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 7a 6c 69 62 2e 6a 73 12 2e 2f 62 |tane/zlib.js../b|
00000030: 61 73 65 2e 6a 73 1c 2e 2f 7a 6c 69 62 2d 64 61 |ase.js../zlib-da|
00000040: 74 61 2e 6a 73 12 42 65 6e 63 68 6d 61 72 6b 1c |ta.js.Benchmark.|
00000050: 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 65 2e 49 |BenchmarkSuite.I|
00000060: 6e 69 74 69 61 6c 69 7a 65 5a 6c 69 62 42 65 6e |nitializeZlibBen|
00000070: 63 68 6d 61 72 6b 0e 72 75 6e 5a 6c 69 62 18 74 |chmark.runZlib.t|
00000080: 65 61 72 44 6f 77 6e 5a 6c 69 62 08 7a 6c 69 62 |earDownZlib.zlib|
00000090: 04 59 61 0d c8 03 02 ca 03 02 cc 03 02 00 00 03 |.Ya.............|
000000a0: 00 00 ce 03 00 01 00 d0 03 00 02 00 d2 03 01 00 |................|
000000b0: 0c 20 06 01 a4 01 00 00 00 0f 05 02 41 00 ce 03 |. ..........A...|
000000c0: 00 0c d0 03 01 0c d2 03 02 0c d4 03 00 01 d6 03 |................|
000000d0: 01 01 08 ec 0a c2 00 e6 c2 01 61 04 00 29 68 01 |..........a..)h.|
000000e0: 00 11 04 ec 00 00 00 01 2c c6 1b 09 26 01 00 68 |........,...&..h|
000000f0: 00 00 11 04 ec 00 00 00 09 0a bf 0a e2 39 47 00 |.............9G.|
00000100: 00 00 60 04 00 07 ba 21 09 00 26 01 00 21 03 00 |..`....!..&..!..|
00000110: 0e 06 2f c8 03 12 00 00 00 0c 38 08 58 08 43 46 |../.......8.X.CF|
00000120: 07 12 1b 16 1b 5b 1f 02 00 0c 43 06 01 d4 03 00 |.....[....C.....|
00000130: 00 00 02 01 01 19 00 d2 03 02 0c 38 ed 00 00 00 |...........8....|
00000140: f7 ed 06 68 00 00 f0 0e 39 ed 00 00 00 c1 00 26 |...h....9......&|
00000150: 01 00 f1 29 c8 03 0e 21 00 03 1e 1b 06 12 13 11 |...)...!........|
00000160: 2e 0e 35 34 04 00 07 02 31 0c 43 06 01 d6 03 00 |..54....1.C.....|
00000170: 00 00 00 00 00 01 00 29 c8 03 02 27 00 00       |.......)...'..|
```

### WASM
```
00000000: 05 0a 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..R__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f 63 |tures_quickjs/oc|
00000020: 74 61 6e 65 2f 7a 6c 69 62 2e 6a 73 12 2e 2f 62 |tane/zlib.js../b|
00000030: 61 73 65 2e 6a 73 1c 2e 2f 7a 6c 69 62 2d 64 61 |ase.js../zlib-da|
00000040: 74 61 2e 6a 73 12 42 65 6e 63 68 6d 61 72 6b 1c |ta.js.Benchmark.|
00000050: 42 65 6e 63 68 6d 61 72 6b 53 75 69 74 65 2e 49 |BenchmarkSuite.I|
00000060: 6e 69 74 69 61 6c 69 7a 65 5a 6c 69 62 42 65 6e |nitializeZlibBen|
00000070: 63 68 6d 61 72 6b 0e 72 75 6e 5a 6c 69 62 18 74 |chmark.runZlib.t|
00000080: 65 61 72 44 6f 77 6e 5a 6c 69 62 08 7a 6c 69 62 |earDownZlib.zlib|
00000090: 04 59 61 0d c8 03 02 ca 03 02 cc 03 02 00 00 03 |.Ya.............|
000000a0: 00 00 ce 03 00 01 00 d0 03 00 02 00 d2 03 01 00 |................|
000000b0: 0c 20 06 01 a4 01 00 00 00 0f 05 02 41 00 ce 03 |. ..........A...|
000000c0: 00 0c d0 03 01 0c d2 03 02 0c d4 03 00 01 d6 03 |................|
000000d0: 01 01 08 ec 0a c2 00 e6 c2 01 61 04 00 29 68 01 |..........a..)h.|
000000e0: 00 11 04 ec 00 00 00 01 2c c6 1b 09 26 01 00 68 |........,...&..h|
000000f0: 00 00 11 04 ec 00 00 00 09 0a bf 0a e2 39 47 00 |.............9G.|
00000100: 00 00 60 04 00 07 ba 21 09 00 26 01 00 21 03 00 |..`....!..&..!..|
00000110: 0e 06 2f c8 03 12 00 00 00 0c 38 08 58 08 43 46 |../.......8.X.CF|
00000120: 07 12 1b 16 1b 5b 1f 02 00 0c 43 06 01 d4 03 00 |.....[....C.....|
00000130: 00 00 02 01 01 19 00 d2 03 02 0c 38 ed 00 00 00 |...........8....|
00000140: f7 ed 06 68 00 00 f0 0e 39 ed 00 00 00 c1 00 26 |...h....9......&|
00000150: 01 00 f1 29 c8 03 0e 21 00 03 1e 1b 06 12 13 11 |...)...!........|
00000160: 2e 0e 35 34 04 00 07 02 31 0c 43 06 01 d6 03 00 |..54....1.C.....|
00000170: 00 00 00 00 00 01 00 29 c8 03 02 27 00 00       |.......)...'..|
```