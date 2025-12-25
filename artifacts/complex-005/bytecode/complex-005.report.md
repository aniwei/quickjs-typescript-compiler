# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-005.ts
**生成时间**: 2025-12-25T01:17:43.784Z

## 大小对比

- TypeScript编译器: 325 字节
- WASM编译器: 325 字节
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
      "string": "make5",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-005.js",
      "offset": 22
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 250
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
      "string": "make5",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-005.js",
      "offset": 22
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 250
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 0a 6d 61 6b 65 35 02 67 0e 63 6f 6e 73 6f |...make5.g.conso|
00000010: 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f |le.logV__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 |/fixtures_genera|
00000030: 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 30 35 2e |ted/complex-005.|
00000040: 6a 73 08 62 61 73 65 02 66 02 6b 0c 00 06 00 a4 |js.base.f.k.....|
00000050: 01 00 01 00 04 00 01 3b 01 a6 01 00 00 00 40 e4 |.......;......@.|
00000060: 00 00 00 40 40 e5 00 00 00 80 c2 00 41 e4 00 00 |...@@.......A...|
00000070: 00 00 3f e5 00 00 00 80 39 e4 00 00 00 f0 3b e5 |..?.....9.....;.|
00000080: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 |...9....C....9..|
00000090: 00 00 ba f1 24 01 00 cf 28 d0 03 12 00 00 00 1a |....$...(.......|
000000a0: 12 14 1b 0a 21 1d 1b 0e 1b 0a 20 02 07 03 00 0c |....!..... .....|
000000b0: 41 06 00 c8 03 01 02 00 02 00 01 10 03 d2 03 00 |A...............|
000000c0: 01 40 d2 03 01 ff ff ff ff 0f 20 d4 03 00 00 40 |.@........ ....@|
000000d0: 63 00 00 d3 11 f4 ec 04 0e bc db cb c2 00 d0 28 |c..............(|
000000e0: d0 03 08 01 00 00 0e 0c 16 07 0d 00 0c 41 06 00 |.............A..|
000000f0: d4 03 01 01 00 03 02 00 1b 02 d6 03 00 01 00 d6 |................|
00000100: 03 01 ff ff ff ff 0f 20 d2 03 00 03 d4 03 01 01 |....... ........|
00000110: 63 00 00 d3 11 f4 ec 04 0e b9 db cb d3 b7 a6 ec |c...............|
00000120: 03 df 28 e0 d3 b8 a0 f1 b8 9f 28 d0 03 16 02 04 |..(.......(.....|
00000130: 3f 10 0c 04 12 0a 07 0d 08 06 07 04 0c 04 07 05 |?...............|
00000140: 0c 10 07 1f 00                                  |.....|
```

### WASM
```
00000000: 05 08 0a 6d 61 6b 65 35 02 67 0e 63 6f 6e 73 6f |...make5.g.conso|
00000010: 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f |le.logV__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 |/fixtures_genera|
00000030: 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 30 35 2e |ted/complex-005.|
00000040: 6a 73 08 62 61 73 65 02 66 02 6b 0c 00 06 00 a4 |js.base.f.k.....|
00000050: 01 00 01 00 04 00 01 3b 01 a6 01 00 00 00 40 e4 |.......;......@.|
00000060: 00 00 00 40 40 e5 00 00 00 80 c2 00 41 e4 00 00 |...@@.......A...|
00000070: 00 00 3f e5 00 00 00 80 39 e4 00 00 00 f0 3b e5 |..?.....9.....;.|
00000080: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 |...9....C....9..|
00000090: 00 00 ba f1 24 01 00 cf 28 d0 03 12 00 00 00 1a |....$...(.......|
000000a0: 12 14 1b 0a 21 1d 1b 0e 1b 0a 20 02 07 03 00 0c |....!..... .....|
000000b0: 41 06 00 c8 03 01 02 00 02 00 01 10 03 d2 03 00 |A...............|
000000c0: 01 40 d2 03 01 ff ff ff ff 0f 20 d4 03 00 00 40 |.@........ ....@|
000000d0: 63 00 00 d3 11 f4 ec 04 0e bc db cb c2 00 d0 28 |c..............(|
000000e0: d0 03 08 01 00 00 0e 0c 16 07 0d 00 0c 41 06 00 |.............A..|
000000f0: d4 03 01 01 00 03 02 00 1b 02 d6 03 00 01 00 d6 |................|
00000100: 03 01 ff ff ff ff 0f 20 d2 03 00 03 d4 03 01 01 |....... ........|
00000110: 63 00 00 d3 11 f4 ec 04 0e b9 db cb d3 b7 a6 ec |c...............|
00000120: 03 df 28 e0 d3 b8 a0 f1 b8 9f 28 d0 03 16 02 04 |..(.......(.....|
00000130: 3f 10 0c 04 12 0a 07 0d 08 06 07 04 0c 04 07 05 |?...............|
00000140: 0c 10 07 1f 00                                  |.....|
```