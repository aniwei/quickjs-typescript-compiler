# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/destructuring-defaults-rest-object-pattern-094.ts
**生成时间**: 2025-12-25T17:39:29.038Z

## 大小对比

- TypeScript编译器: 354 字节
- WASM编译器: 354 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "src",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "rest",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 17
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 19
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 27
    },
    {
      "index": 8,
      "rawLength": 136,
      "actualLength": 68,
      "isWideChar": 0,
      "string": "__tests__/fixtures/destructuring-defaults-rest-object-pattern-094.js",
      "offset": 31
    }
  ],
  "functionHeader": {
    "offset": 101,
    "tag": "0xc",
    "remaining": 253
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "src",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "rest",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 15
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 17
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 19
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 27
    },
    {
      "index": 8,
      "rawLength": 136,
      "actualLength": 68,
      "isWideChar": 0,
      "string": "__tests__/fixtures/destructuring-defaults-rest-object-pattern-094.js",
      "offset": 31
    }
  ],
  "functionHeader": {
    "offset": 101,
    "tag": "0xc",
    "remaining": 253
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 06 73 72 63 02 61 02 62 08 72 65 73 74 02 |...src.a.b.rest.|
00000010: 63 02 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 88 |c.d.console.log.|
00000020: 01 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |.__tests__/fixtu|
00000030: 72 65 73 2f 64 65 73 74 72 75 63 74 75 72 69 6e |res/destructurin|
00000040: 67 2d 64 65 66 61 75 6c 74 73 2d 72 65 73 74 2d |g-defaults-rest-|
00000050: 6f 62 6a 65 63 74 2d 70 61 74 74 65 72 6e 2d 30 |object-pattern-0|
00000060: 39 34 2e 6a 73 0c 00 06 00 a4 01 00 01 00 06 00 |94.js...........|
00000070: 00 c7 01 01 a6 01 00 00 00 40 e4 00 00 00 80 40 |.........@.....@|
00000080: e5 00 00 00 80 40 e6 00 00 00 80 40 e7 00 00 00 |.....@.....@....|
00000090: 80 3f e4 00 00 00 80 3f e5 00 00 00 80 3f e6 00 |.?.....?.....?..|
000000a0: 00 00 80 3f e7 00 00 00 80 0b bf 5e 4e e5 00 00 |...?.......^N...|
000000b0: 00 39 47 00 00 00 4e e6 00 00 00 ba 4e e8 00 00 |.9G...N.....N...|
000000c0: 00 bb 4e e9 00 00 00 3b e4 00 00 00 06 11 f4 ed |..N....;........|
000000d0: 3a 73 0b 1b 1b 07 4e e5 00 00 00 1b 43 e5 00 00 |:s....N.....C...|
000000e0: 00 3b e5 00 00 00 1b 07 4e e6 00 00 00 1b 43 e6 |.;......N.....C.|
000000f0: 00 00 00 11 f4 ec 03 0e b9 3b e6 00 00 00 0b 55 |.........;.....U|
00000100: 44 3b e7 00 00 00 0e 0e ee 09 0e 39 e4 00 00 00 |D;.........9....|
00000110: ee c0 39 ea 00 00 00 43 eb 00 00 00 39 e5 00 00 |..9....C....9...|
00000120: 00 39 e6 00 00 00 39 e7 00 00 00 42 e8 00 00 00 |.9....9....B....|
00000130: 39 e7 00 00 00 42 e9 00 00 00 9f 24 03 00 cf 28 |9....B.....$...(|
00000140: d8 03 1e 00 00 00 38 02 30 00 5a 02 0c 26 3b 1b |......8.0.Z..&;.|
00000150: 0e 1b 0a 1b 06 1b 06 1b 08 1b 0a 1b 08 1b 0b 07 |................|
00000160: 1b 00                                           |..|
```

### WASM
```
00000000: 05 09 06 73 72 63 02 61 02 62 08 72 65 73 74 02 |...src.a.b.rest.|
00000010: 63 02 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 88 |c.d.console.log.|
00000020: 01 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |.__tests__/fixtu|
00000030: 72 65 73 2f 64 65 73 74 72 75 63 74 75 72 69 6e |res/destructurin|
00000040: 67 2d 64 65 66 61 75 6c 74 73 2d 72 65 73 74 2d |g-defaults-rest-|
00000050: 6f 62 6a 65 63 74 2d 70 61 74 74 65 72 6e 2d 30 |object-pattern-0|
00000060: 39 34 2e 6a 73 0c 00 06 00 a4 01 00 01 00 06 00 |94.js...........|
00000070: 00 c7 01 01 a6 01 00 00 00 40 e4 00 00 00 80 40 |.........@.....@|
00000080: e5 00 00 00 80 40 e6 00 00 00 80 40 e7 00 00 00 |.....@.....@....|
00000090: 80 3f e4 00 00 00 80 3f e5 00 00 00 80 3f e6 00 |.?.....?.....?..|
000000a0: 00 00 80 3f e7 00 00 00 80 0b bf 5e 4e e5 00 00 |...?.......^N...|
000000b0: 00 39 47 00 00 00 4e e6 00 00 00 ba 4e e8 00 00 |.9G...N.....N...|
000000c0: 00 bb 4e e9 00 00 00 3b e4 00 00 00 06 11 f4 ed |..N....;........|
000000d0: 3a 73 0b 1b 1b 07 4e e5 00 00 00 1b 43 e5 00 00 |:s....N.....C...|
000000e0: 00 3b e5 00 00 00 1b 07 4e e6 00 00 00 1b 43 e6 |.;......N.....C.|
000000f0: 00 00 00 11 f4 ec 03 0e b9 3b e6 00 00 00 0b 55 |.........;.....U|
00000100: 44 3b e7 00 00 00 0e 0e ee 09 0e 39 e4 00 00 00 |D;.........9....|
00000110: ee c0 39 ea 00 00 00 43 eb 00 00 00 39 e5 00 00 |..9....C....9...|
00000120: 00 39 e6 00 00 00 39 e7 00 00 00 42 e8 00 00 00 |.9....9....B....|
00000130: 39 e7 00 00 00 42 e9 00 00 00 9f 24 03 00 cf 28 |9....B.....$...(|
00000140: d8 03 1e 00 00 00 38 02 30 00 5a 02 0c 26 3b 1b |......8.0.Z..&;.|
00000150: 0e 1b 0a 1b 06 1b 06 1b 08 1b 0a 1b 08 1b 0b 07 |................|
00000160: 1b 00                                           |..|
```