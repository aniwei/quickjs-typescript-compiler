# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-in-basic.ts
**生成时间**: 2025-12-23T09:27:51.792Z

## 大小对比

- TypeScript编译器: 232 字节
- WASM编译器: 232 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 18
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 26
    },
    {
      "index": 8,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-in-basic.js",
      "offset": 30
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 167
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 18
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 26
    },
    {
      "index": 8,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-in-basic.js",
      "offset": 30
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 167
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 02 6b 06 6f 62 6a 06 73 75 6d 02 61 02 62 |...k.obj.sum.a.b|
00000010: 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 44 5f |.c.console.logD_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 66 6f 72 2d 69 6e 2d 62 61 73 69 63 2e 6a |s/for-in-basic.j|
00000040: 73 0c 00 06 00 a4 01 00 02 00 04 00 00 73 02 a6 |s............s..|
00000050: 01 00 00 00 c8 03 02 00 30 40 e5 00 00 00 80 40 |........0@.....@|
00000060: e6 00 00 00 80 3f e5 00 00 00 80 3f e6 00 00 00 |.....?.....?....|
00000070: 82 0b b8 4e e7 00 00 00 b9 4e e8 00 00 00 ba 4e |...N.....N.....N|
00000080: e9 00 00 00 3b e5 00 00 00 b7 3b e6 00 00 00 06 |....;.....;.....|
00000090: cb 63 01 00 39 e5 00 00 00 7e ee 18 cc 39 e6 00 |.c..9....~...9..|
000000a0: 00 00 39 e5 00 00 00 64 01 00 48 9f 11 3a e6 00 |..9....d..H..:..|
000000b0: 00 00 cb 81 ec e7 0e 0e 39 ea 00 00 00 43 eb 00 |........9....C..|
000000c0: 00 00 39 e6 00 00 00 24 01 00 cf 28 d8 03 18 00 |..9....$...(....|
000000d0: 00 00 3b 06 20 30 17 1b 0e 1b 08 11 01 07 0b 45 |..;. 0.........E|
000000e0: 0f 1b 0e 1b 0a 1b 01 00                         |........|
```

### WASM
```
00000000: 05 09 02 6b 06 6f 62 6a 06 73 75 6d 02 61 02 62 |...k.obj.sum.a.b|
00000010: 02 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 44 5f |.c.console.logD_|
00000020: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000030: 73 2f 66 6f 72 2d 69 6e 2d 62 61 73 69 63 2e 6a |s/for-in-basic.j|
00000040: 73 0c 00 06 00 a4 01 00 02 00 04 00 00 73 02 a6 |s............s..|
00000050: 01 00 00 00 c8 03 02 00 30 40 e5 00 00 00 80 40 |........0@.....@|
00000060: e6 00 00 00 80 3f e5 00 00 00 80 3f e6 00 00 00 |.....?.....?....|
00000070: 82 0b b8 4e e7 00 00 00 b9 4e e8 00 00 00 ba 4e |...N.....N.....N|
00000080: e9 00 00 00 3b e5 00 00 00 b7 3b e6 00 00 00 06 |....;.....;.....|
00000090: cb 63 01 00 39 e5 00 00 00 7e ee 18 cc 39 e6 00 |.c..9....~...9..|
000000a0: 00 00 39 e5 00 00 00 64 01 00 48 9f 11 3a e6 00 |..9....d..H..:..|
000000b0: 00 00 cb 81 ec e7 0e 0e 39 ea 00 00 00 43 eb 00 |........9....C..|
000000c0: 00 00 39 e6 00 00 00 24 01 00 cf 28 d8 03 18 00 |..9....$...(....|
000000d0: 00 00 3b 06 20 30 17 1b 0e 1b 08 11 01 07 0b 45 |..;. 0.........E|
000000e0: 0f 1b 0e 1b 0a 1b 01 00                         |........|
```