# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-of-destructuring.ts
**生成时间**: 2026-01-07T15:26:01.585Z

## 大小对比

- TypeScript编译器: 300 字节
- WASM编译器: 300 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 22
    },
    {
      "index": 6,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-of-destructuring.js",
      "offset": 26
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xc",
    "remaining": 231
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 22
    },
    {
      "index": 6,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-of-destructuring.js",
      "offset": 26
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xc",
    "remaining": 231
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 02 78 06 61 72 72 06 73 75 6d 02 79 0e 63 |...x.arr.sum.y.c|
00000010: 6f 6e 73 6f 6c 65 06 6c 6f 67 54 5f 5f 74 65 73 |onsole.logT__tes|
00000020: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 66 6f |ts__/fixtures/fo|
00000030: 72 2d 6f 66 2d 64 65 73 74 72 75 63 74 75 72 69 |r-of-destructuri|
00000040: 6e 67 2e 6a 73 0c 00 06 00 a4 01 00 02 00 05 00 |ng.js...........|
00000050: 00 a6 01 02 a6 01 00 00 00 c8 03 02 00 20 40 e5 |............. @.|
00000060: 00 00 00 80 40 e6 00 00 00 80 40 e7 00 00 00 80 |....@.....@.....|
00000070: 3f e5 00 00 00 80 3f e6 00 00 00 82 3f e7 00 00 |?.....?.....?...|
00000080: 00 82 b8 b9 ba 26 03 00 3b e5 00 00 00 b7 3b e6 |.....&..;.....;.|
00000090: 00 00 00 06 cb 63 01 00 39 e5 00 00 00 7f ee 12 |.....c..9.......|
000000a0: cc 39 e6 00 00 00 64 01 00 9f 11 3a e6 00 00 00 |.9....d....:....|
000000b0: cb 82 00 ec ec 0e 86 39 e8 00 00 00 43 e9 00 00 |.......9....C...|
000000c0: 00 39 e6 00 00 00 24 01 00 cb 06 3b e7 00 00 00 |.9....$....;....|
000000d0: 06 cb 39 e5 00 00 00 7f ee 11 3a e7 00 00 00 06 |..9.......:.....|
000000e0: cb 39 e7 00 00 00 b9 ad ed 06 82 00 ec ed 0e 86 |.9..............|
000000f0: 39 e8 00 00 00 43 e9 00 00 00 39 e7 00 00 00 24 |9....C....9....$|
00000100: 01 00 cf 28 d4 03 24 00 00 00 3a 06 1c 30 13 1b |...(..$...:..0..|
00000110: 0e 11 05 4a 0f 1b 0e 1b 0a 1b 01 40 01 2a 09 26 |...J.......@.*.&|
00000120: 06 20 04 32 13 1b 0e 1b 0a 1b 01 00             |. .2........|
```

### WASM
```
00000000: 05 07 02 78 06 61 72 72 06 73 75 6d 02 79 0e 63 |...x.arr.sum.y.c|
00000010: 6f 6e 73 6f 6c 65 06 6c 6f 67 54 5f 5f 74 65 73 |onsole.logT__tes|
00000020: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 66 6f |ts__/fixtures/fo|
00000030: 72 2d 6f 66 2d 64 65 73 74 72 75 63 74 75 72 69 |r-of-destructuri|
00000040: 6e 67 2e 6a 73 0c 00 06 00 a4 01 00 02 00 05 00 |ng.js...........|
00000050: 00 a6 01 02 a6 01 00 00 00 c8 03 02 00 20 40 e5 |............. @.|
00000060: 00 00 00 80 40 e6 00 00 00 80 40 e7 00 00 00 80 |....@.....@.....|
00000070: 3f e5 00 00 00 80 3f e6 00 00 00 82 3f e7 00 00 |?.....?.....?...|
00000080: 00 82 b8 b9 ba 26 03 00 3b e5 00 00 00 b7 3b e6 |.....&..;.....;.|
00000090: 00 00 00 06 cb 63 01 00 39 e5 00 00 00 7f ee 12 |.....c..9.......|
000000a0: cc 39 e6 00 00 00 64 01 00 9f 11 3a e6 00 00 00 |.9....d....:....|
000000b0: cb 82 00 ec ec 0e 86 39 e8 00 00 00 43 e9 00 00 |.......9....C...|
000000c0: 00 39 e6 00 00 00 24 01 00 cb 06 3b e7 00 00 00 |.9....$....;....|
000000d0: 06 cb 39 e5 00 00 00 7f ee 11 3a e7 00 00 00 06 |..9.......:.....|
000000e0: cb 39 e7 00 00 00 b9 ad ed 06 82 00 ec ed 0e 86 |.9..............|
000000f0: 39 e8 00 00 00 43 e9 00 00 00 39 e7 00 00 00 24 |9....C....9....$|
00000100: 01 00 cf 28 d4 03 24 00 00 00 3a 06 1c 30 13 1b |...(..$...:..0..|
00000110: 0e 11 05 4a 0f 1b 0e 1b 0a 1b 01 40 01 2a 09 26 |...J.......@.*.&|
00000120: 06 20 04 32 13 1b 0e 1b 0a 1b 01 00             |. .2........|
```