# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/generator-basic.ts
**生成时间**: 2025-12-23T09:27:51.912Z

## 大小对比

- TypeScript编译器: 242 字节
- WASM编译器: 242 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/generator-basic.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 180
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "gen",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/generator-basic.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 180
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 02 76 06 67 65 6e 06 73 75 6d 0e 63 6f 6e |...v.gen.sum.con|
00000010: 73 6f 6c 65 06 6c 6f 67 4a 5f 5f 74 65 73 74 73 |sole.logJ__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 67 65 6e 65 |__/fixtures/gene|
00000030: 72 61 74 6f 72 2d 62 61 73 69 63 2e 6a 73 0c 00 |rator-basic.js..|
00000040: 06 00 a4 01 00 02 00 05 00 01 59 02 a6 01 00 00 |..........Y.....|
00000050: 00 c8 03 02 00 30 40 e5 00 00 00 40 40 e6 00 00 |.....0@....@@...|
00000060: 00 80 c2 00 41 e5 00 00 00 00 3f e6 00 00 00 82 |....A.....?.....|
00000070: b7 3b e6 00 00 00 06 cb 63 01 00 39 e5 00 00 00 |.;......c..9....|
00000080: f0 7f ee 12 cc 39 e6 00 00 00 64 01 00 9f 11 3a |.....9....d....:|
00000090: e6 00 00 00 cb 82 00 ec ec 0e 86 39 e7 00 00 00 |...........9....|
000000a0: 43 e8 00 00 00 39 e6 00 00 00 24 01 00 cf 28 d2 |C....9....$...(.|
000000b0: 03 16 00 00 00 25 0e 20 1b 06 1c 1d 1b 0e 11 05 |.....%. ........|
000000c0: 4a 0f 1b 0e 1b 0a 1b 01 00 0c 52 06 00 ca 03 00 |J.........R.....|
000000d0: 00 00 02 00 00 0f 00 89 b8 8a ec 02 2f 0e b9 8a |............/...|
000000e0: ec 02 2f 0e ba 2f d2 03 08 01 00 08 08 21 00 26 |../../.......!.&|
000000f0: 00 00                                           |..|
```

### WASM
```
00000000: 05 06 02 76 06 67 65 6e 06 73 75 6d 0e 63 6f 6e |...v.gen.sum.con|
00000010: 73 6f 6c 65 06 6c 6f 67 4a 5f 5f 74 65 73 74 73 |sole.logJ__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 67 65 6e 65 |__/fixtures/gene|
00000030: 72 61 74 6f 72 2d 62 61 73 69 63 2e 6a 73 0c 00 |rator-basic.js..|
00000040: 06 00 a4 01 00 02 00 05 00 01 59 02 a6 01 00 00 |..........Y.....|
00000050: 00 c8 03 02 00 30 40 e5 00 00 00 40 40 e6 00 00 |.....0@....@@...|
00000060: 00 80 c2 00 41 e5 00 00 00 00 3f e6 00 00 00 82 |....A.....?.....|
00000070: b7 3b e6 00 00 00 06 cb 63 01 00 39 e5 00 00 00 |.;......c..9....|
00000080: f0 7f ee 12 cc 39 e6 00 00 00 64 01 00 9f 11 3a |.....9....d....:|
00000090: e6 00 00 00 cb 82 00 ec ec 0e 86 39 e7 00 00 00 |...........9....|
000000a0: 43 e8 00 00 00 39 e6 00 00 00 24 01 00 cf 28 d2 |C....9....$...(.|
000000b0: 03 16 00 00 00 25 0e 20 1b 06 1c 1d 1b 0e 11 05 |.....%. ........|
000000c0: 4a 0f 1b 0e 1b 0a 1b 01 00 0c 52 06 00 ca 03 00 |J.........R.....|
000000d0: 00 00 02 00 00 0f 00 89 b8 8a ec 02 2f 0e b9 8a |............/...|
000000e0: ec 02 2f 0e ba 2f d2 03 08 01 00 08 08 21 00 26 |../../.......!.&|
000000f0: 00 00                                           |..|
```