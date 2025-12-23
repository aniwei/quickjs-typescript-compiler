# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/destructuring-nested.ts
**生成时间**: 2025-12-23T10:34:39.804Z

## 大小对比

- TypeScript编译器: 281 字节
- WASM编译器: 281 字节
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 12
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 14
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 16
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 18
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 26
    },
    {
      "index": 9,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/destructuring-nested.js",
      "offset": 30
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xc",
    "remaining": 208
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 12
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 14
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 16
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 18
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 26
    },
    {
      "index": 9,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/destructuring-nested.js",
      "offset": 30
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xc",
    "remaining": 208
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 06 6f 62 6a 02 78 02 79 02 7a 02 61 02 62 |...obj.x.y.z.a.b|
00000010: 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 54 5f |.c.console.logT_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 64 65 73 74 72 75 63 74 75 72 69 6e 67 2d |s/destructuring-|
00000040: 6e 65 73 74 65 64 2e 6a 73 0c 00 06 00 a4 01 00 |nested.js.......|
00000050: 01 00 05 00 00 a2 01 01 a6 01 00 00 00 40 e4 00 |.............@..|
00000060: 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 80 40 |...@.....@.....@|
00000070: e7 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 |.....?.....?....|
00000080: 80 3f e6 00 00 00 80 3f e7 00 00 00 80 0b b8 4e |.?.....?.......N|
00000090: e8 00 00 00 b9 4e e9 00 00 00 39 47 00 00 00 4e |.....N....9G...N|
000000a0: ea 00 00 00 3b e4 00 00 00 06 11 f4 ed 2c 73 11 |....;........,s.|
000000b0: 42 e8 00 00 00 3b e5 00 00 00 11 42 e9 00 00 00 |B....;.....B....|
000000c0: 3b e6 00 00 00 11 42 ea 00 00 00 11 f4 ec 03 0e |;.....B.........|
000000d0: ba 3b e7 00 00 00 0e ee 09 0e 39 e4 00 00 00 ee |.;........9.....|
000000e0: ce 39 eb 00 00 00 43 ec 00 00 00 39 e5 00 00 00 |.9....C....9....|
000000f0: 39 e6 00 00 00 39 e7 00 00 00 24 03 00 cf 28 da |9....9....$...(.|
00000100: 03 16 00 00 00 3d 02 3a 00 40 02 08 26 41 1b 0e |.....=.:.@..&A..|
00000110: 1b 0a 1b 06 1b 06 1b 0d 00                      |.........|
```

### WASM
```
00000000: 05 0a 06 6f 62 6a 02 78 02 79 02 7a 02 61 02 62 |...obj.x.y.z.a.b|
00000010: 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 54 5f |.c.console.logT_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 64 65 73 74 72 75 63 74 75 72 69 6e 67 2d |s/destructuring-|
00000040: 6e 65 73 74 65 64 2e 6a 73 0c 00 06 00 a4 01 00 |nested.js.......|
00000050: 01 00 05 00 00 a2 01 01 a6 01 00 00 00 40 e4 00 |.............@..|
00000060: 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 80 40 |...@.....@.....@|
00000070: e7 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 |.....?.....?....|
00000080: 80 3f e6 00 00 00 80 3f e7 00 00 00 80 0b b8 4e |.?.....?.......N|
00000090: e8 00 00 00 b9 4e e9 00 00 00 39 47 00 00 00 4e |.....N....9G...N|
000000a0: ea 00 00 00 3b e4 00 00 00 06 11 f4 ed 2c 73 11 |....;........,s.|
000000b0: 42 e8 00 00 00 3b e5 00 00 00 11 42 e9 00 00 00 |B....;.....B....|
000000c0: 3b e6 00 00 00 11 42 ea 00 00 00 11 f4 ec 03 0e |;.....B.........|
000000d0: ba 3b e7 00 00 00 0e ee 09 0e 39 e4 00 00 00 ee |.;........9.....|
000000e0: ce 39 eb 00 00 00 43 ec 00 00 00 39 e5 00 00 00 |.9....C....9....|
000000f0: 39 e6 00 00 00 39 e7 00 00 00 24 03 00 cf 28 da |9....9....$...(.|
00000100: 03 16 00 00 00 3d 02 3a 00 40 02 08 26 41 1b 0e |.....=.:.@..&A..|
00000110: 1b 0a 1b 06 1b 06 1b 0d 00                      |.........|
```