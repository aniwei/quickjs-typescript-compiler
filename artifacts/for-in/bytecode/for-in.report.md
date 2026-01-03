# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-in.ts
**生成时间**: 2026-01-03T04:40:38.495Z

## 大小对比

- TypeScript编译器: 212 字节
- WASM编译器: 212 字节
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
      "string": "k",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
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
      "string": "a",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 16
    },
    {
      "index": 6,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-in.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 165
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
      "string": "k",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
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
      "string": "a",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 14
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 16
    },
    {
      "index": 6,
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-in.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 165
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 02 6b 06 6f 62 6a 06 73 75 6d 02 61 02 62 |...k.obj.sum.a.b|
00000010: 02 63 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.c8__tests__/fix|
00000020: 74 75 72 65 73 2f 66 6f 72 2d 69 6e 2e 6a 73 0c |tures/for-in.js.|
00000030: 00 06 00 a4 01 00 02 00 04 00 00 73 02 a6 01 00 |...........s....|
00000040: 00 00 c8 03 02 00 30 40 e5 00 00 00 80 40 e6 00 |......0@.....@..|
00000050: 00 00 80 3f e5 00 00 00 80 3f e6 00 00 00 82 0b |...?.....?......|
00000060: b8 4e e7 00 00 00 b9 4e e8 00 00 00 ba 4e e9 00 |.N.....N.....N..|
00000070: 00 00 3b e5 00 00 00 b7 3b e6 00 00 00 06 cb 63 |..;.....;......c|
00000080: 01 00 39 e5 00 00 00 7e ee 25 cc 06 cb 64 01 00 |..9....~.%...d..|
00000090: 04 e8 00 00 00 ad ed 17 39 e6 00 00 00 39 e5 00 |........9....9..|
000000a0: 00 00 64 01 00 48 9f 11 3a e6 00 00 00 cb 81 ec |..d..H..:.......|
000000b0: da 0e 0e 39 e6 00 00 00 cf 28 d4 03 16 00 00 00 |...9.....(......|
000000c0: 3b 04 20 3a 0f 2a 04 13 0b 1b 0e 1b 08 11 01 07 |;. :.*..........|
000000d0: 0b 45 0f 00                                     |.E..|
```

### WASM
```
00000000: 05 07 02 6b 06 6f 62 6a 06 73 75 6d 02 61 02 62 |...k.obj.sum.a.b|
00000010: 02 63 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |.c8__tests__/fix|
00000020: 74 75 72 65 73 2f 66 6f 72 2d 69 6e 2e 6a 73 0c |tures/for-in.js.|
00000030: 00 06 00 a4 01 00 02 00 04 00 00 73 02 a6 01 00 |...........s....|
00000040: 00 00 c8 03 02 00 30 40 e5 00 00 00 80 40 e6 00 |......0@.....@..|
00000050: 00 00 80 3f e5 00 00 00 80 3f e6 00 00 00 82 0b |...?.....?......|
00000060: b8 4e e7 00 00 00 b9 4e e8 00 00 00 ba 4e e9 00 |.N.....N.....N..|
00000070: 00 00 3b e5 00 00 00 b7 3b e6 00 00 00 06 cb 63 |..;.....;......c|
00000080: 01 00 39 e5 00 00 00 7e ee 25 cc 06 cb 64 01 00 |..9....~.%...d..|
00000090: 04 e8 00 00 00 ad ed 17 39 e6 00 00 00 39 e5 00 |........9....9..|
000000a0: 00 00 64 01 00 48 9f 11 3a e6 00 00 00 cb 81 ec |..d..H..:.......|
000000b0: da 0e 0e 39 e6 00 00 00 cf 28 d4 03 16 00 00 00 |...9.....(......|
000000c0: 3b 04 20 3a 0f 2a 04 13 0b 1b 0e 1b 08 11 01 07 |;. :.*..........|
000000d0: 0b 45 0f 00                                     |.E..|
```