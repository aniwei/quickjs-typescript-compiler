# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/async-await-promise-chain-no-top-level-await-006.ts
**生成时间**: 2025-12-26T13:59:18.658Z

## 大小对比

- TypeScript编译器: 326 字节
- WASM编译器: 326 字节
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "run6",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 140,
      "actualLength": 70,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-await-promise-chain-no-top-level-await-006.js",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 79
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 81
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 83
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 95
    }
  ],
  "functionHeader": {
    "offset": 99,
    "tag": "0xc",
    "remaining": 227
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
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "run6",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 140,
      "actualLength": 70,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-await-promise-chain-no-top-level-await-006.js",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 79
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 81
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 83
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 95
    }
  ],
  "functionHeader": {
    "offset": 99,
    "tag": "0xc",
    "remaining": 227
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 08 72 75 6e 36 8c 01 5f 5f 74 65 73 74 73 |...run6..__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 61 73 79 6e |__/fixtures/asyn|
00000020: 63 2d 61 77 61 69 74 2d 70 72 6f 6d 69 73 65 2d |c-await-promise-|
00000030: 63 68 61 69 6e 2d 6e 6f 2d 74 6f 70 2d 6c 65 76 |chain-no-top-lev|
00000040: 65 6c 2d 61 77 61 69 74 2d 30 30 36 2e 6a 73 02 |el-await-006.js.|
00000050: 70 02 61 02 62 02 76 0e 63 6f 6e 73 6f 6c 65 06 |p.a.b.v.console.|
00000060: 6c 6f 67 0c 00 06 00 a4 01 00 01 00 03 00 02 20 |log............ |
00000070: 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 |......@....@..A.|
00000080: 00 00 00 00 39 e4 00 00 00 f0 43 81 00 00 00 c2 |....9.....C.....|
00000090: 01 24 01 00 cf 28 ca 03 0c 00 00 00 0e 0e 00 1b |.$...(..........|
000000a0: 08 07 04 25 0a 00 0c 62 06 00 c8 03 00 03 00 04 |...%...b........|
000000b0: 00 00 37 03 cc 03 01 00 30 ce 03 01 01 30 d0 03 |..7.....0....0..|
000000c0: 01 02 30 63 02 00 63 01 00 63 00 00 39 c7 00 00 |..0c..c..c..9...|
000000d0: 00 43 82 00 00 00 bd 24 01 00 cb 64 00 00 8d cc |.C.....$...d....|
000000e0: 39 c7 00 00 00 43 82 00 00 00 64 01 00 b8 9f 24 |9....C....d....$|
000000f0: 01 00 8d cd 64 02 00 b9 9c 2f ca 03 1a 01 00 30 |....d..../.....0|
00000100: 1c 1b 0e 20 10 17 11 1c 00 1b 0e 1b 12 16 04 07 |... ............|
00000110: 05 1c 2f 16 04 07 11 00 0c 02 06 00 00 01 00 01 |../.............|
00000120: 03 00 00 0e 01 d2 03 00 01 00 39 ea 00 00 00 43 |..........9....C|
00000130: eb 00 00 00 d3 25 01 00 ca 03 0a 07 0c 02 0a 1b |.....%..........|
00000140: 0e 1b 0a 07 01 00                               |......|
```

### WASM
```
00000000: 05 08 08 72 75 6e 36 8c 01 5f 5f 74 65 73 74 73 |...run6..__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 61 73 79 6e |__/fixtures/asyn|
00000020: 63 2d 61 77 61 69 74 2d 70 72 6f 6d 69 73 65 2d |c-await-promise-|
00000030: 63 68 61 69 6e 2d 6e 6f 2d 74 6f 70 2d 6c 65 76 |chain-no-top-lev|
00000040: 65 6c 2d 61 77 61 69 74 2d 30 30 36 2e 6a 73 02 |el-await-006.js.|
00000050: 70 02 61 02 62 02 76 0e 63 6f 6e 73 6f 6c 65 06 |p.a.b.v.console.|
00000060: 6c 6f 67 0c 00 06 00 a4 01 00 01 00 03 00 02 20 |log............ |
00000070: 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 |......@....@..A.|
00000080: 00 00 00 00 39 e4 00 00 00 f0 43 81 00 00 00 c2 |....9.....C.....|
00000090: 01 24 01 00 cf 28 ca 03 0c 00 00 00 0e 0e 00 1b |.$...(..........|
000000a0: 08 07 04 25 0a 00 0c 62 06 00 c8 03 00 03 00 04 |...%...b........|
000000b0: 00 00 37 03 cc 03 01 00 30 ce 03 01 01 30 d0 03 |..7.....0....0..|
000000c0: 01 02 30 63 02 00 63 01 00 63 00 00 39 c7 00 00 |..0c..c..c..9...|
000000d0: 00 43 82 00 00 00 bd 24 01 00 cb 64 00 00 8d cc |.C.....$...d....|
000000e0: 39 c7 00 00 00 43 82 00 00 00 64 01 00 b8 9f 24 |9....C....d....$|
000000f0: 01 00 8d cd 64 02 00 b9 9c 2f ca 03 1a 01 00 30 |....d..../.....0|
00000100: 1c 1b 0e 20 10 17 11 1c 00 1b 0e 1b 12 16 04 07 |... ............|
00000110: 05 1c 2f 16 04 07 11 00 0c 02 06 00 00 01 00 01 |../.............|
00000120: 03 00 00 0e 01 d2 03 00 01 00 39 ea 00 00 00 43 |..........9....C|
00000130: eb 00 00 00 d3 25 01 00 ca 03 0a 07 0c 02 0a 1b |.....%..........|
00000140: 0e 1b 0a 07 01 00                               |......|
```