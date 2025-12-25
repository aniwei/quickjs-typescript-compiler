# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-075.ts
**生成时间**: 2025-12-25T01:17:44.108Z

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-075.js",
      "offset": 31
    }
  ],
  "functionHeader": {
    "offset": 75,
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-075.js",
      "offset": 31
    }
  ],
  "functionHeader": {
    "offset": 75,
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
00000010: 63 02 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 56 |c.d.console.logV|
00000020: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000030: 65 73 5f 67 65 6e 65 72 61 74 65 64 2f 63 6f 6d |es_generated/com|
00000040: 70 6c 65 78 2d 30 37 35 2e 6a 73 0c 00 06 00 a4 |plex-075.js.....|
00000050: 01 00 01 00 06 00 00 c7 01 01 a6 01 00 00 00 40 |...............@|
00000060: e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 |.....@.....@....|
00000070: 80 40 e7 00 00 00 80 3f e4 00 00 00 80 3f e5 00 |.@.....?.....?..|
00000080: 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 0b |...?.....?......|
00000090: bf 4b 4e e5 00 00 00 39 47 00 00 00 4e e6 00 00 |.KN....9G...N...|
000000a0: 00 ba 4e e8 00 00 00 bb 4e e9 00 00 00 3b e4 00 |..N.....N....;..|
000000b0: 00 00 06 11 f4 ed 3a 73 0b 1b 1b 07 4e e5 00 00 |......:s....N...|
000000c0: 00 1b 43 e5 00 00 00 3b e5 00 00 00 1b 07 4e e6 |..C....;......N.|
000000d0: 00 00 00 1b 43 e6 00 00 00 11 f4 ec 03 0e b9 3b |....C..........;|
000000e0: e6 00 00 00 0b 55 44 3b e7 00 00 00 0e 0e ee 09 |.....UD;........|
000000f0: 0e 39 e4 00 00 00 ee c0 39 ea 00 00 00 43 eb 00 |.9......9....C..|
00000100: 00 00 39 e5 00 00 00 39 e6 00 00 00 39 e7 00 00 |..9....9....9...|
00000110: 00 42 e8 00 00 00 39 e7 00 00 00 42 e9 00 00 00 |.B....9....B....|
00000120: 9f 24 03 00 cf 28 d8 03 1e 00 00 00 38 02 30 00 |.$...(......8.0.|
00000130: 5a 02 0c 26 3b 1b 0e 1b 0a 1b 06 1b 06 1b 08 1b |Z..&;...........|
00000140: 0a 1b 08 1b 0b 07 1b 00                         |........|
```

### WASM
```
00000000: 05 09 06 73 72 63 02 61 02 62 08 72 65 73 74 02 |...src.a.b.rest.|
00000010: 63 02 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 56 |c.d.console.logV|
00000020: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000030: 65 73 5f 67 65 6e 65 72 61 74 65 64 2f 63 6f 6d |es_generated/com|
00000040: 70 6c 65 78 2d 30 37 35 2e 6a 73 0c 00 06 00 a4 |plex-075.js.....|
00000050: 01 00 01 00 06 00 00 c7 01 01 a6 01 00 00 00 40 |...............@|
00000060: e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 |.....@.....@....|
00000070: 80 40 e7 00 00 00 80 3f e4 00 00 00 80 3f e5 00 |.@.....?.....?..|
00000080: 00 00 80 3f e6 00 00 00 80 3f e7 00 00 00 80 0b |...?.....?......|
00000090: bf 4b 4e e5 00 00 00 39 47 00 00 00 4e e6 00 00 |.KN....9G...N...|
000000a0: 00 ba 4e e8 00 00 00 bb 4e e9 00 00 00 3b e4 00 |..N.....N....;..|
000000b0: 00 00 06 11 f4 ed 3a 73 0b 1b 1b 07 4e e5 00 00 |......:s....N...|
000000c0: 00 1b 43 e5 00 00 00 3b e5 00 00 00 1b 07 4e e6 |..C....;......N.|
000000d0: 00 00 00 1b 43 e6 00 00 00 11 f4 ec 03 0e b9 3b |....C..........;|
000000e0: e6 00 00 00 0b 55 44 3b e7 00 00 00 0e 0e ee 09 |.....UD;........|
000000f0: 0e 39 e4 00 00 00 ee c0 39 ea 00 00 00 43 eb 00 |.9......9....C..|
00000100: 00 00 39 e5 00 00 00 39 e6 00 00 00 39 e7 00 00 |..9....9....9...|
00000110: 00 42 e8 00 00 00 39 e7 00 00 00 42 e9 00 00 00 |.B....9....B....|
00000120: 9f 24 03 00 cf 28 d8 03 1e 00 00 00 38 02 30 00 |.$...(......8.0.|
00000130: 5a 02 0c 26 3b 1b 0e 1b 0a 1b 06 1b 06 1b 08 1b |Z..&;...........|
00000140: 0a 1b 08 1b 0b 07 1b 00                         |........|
```