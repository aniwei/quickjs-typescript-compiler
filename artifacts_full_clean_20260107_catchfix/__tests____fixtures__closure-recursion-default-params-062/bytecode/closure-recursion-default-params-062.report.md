# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-recursion-default-params-062.ts
**生成时间**: 2026-01-07T09:38:11.050Z

## 大小对比

- TypeScript编译器: 342 字节
- WASM编译器: 342 字节
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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "make62",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-recursion-default-params-062.js",
      "offset": 23
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 82
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 251
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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "make62",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-recursion-default-params-062.js",
      "offset": 23
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 82
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 251
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 0c 6d 61 6b 65 36 32 02 67 0e 63 6f 6e 73 |...make62.g.cons|
00000010: 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 73 74 73 5f |ole.logt__tests_|
00000020: 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 75 |_/fixtures/closu|
00000030: 72 65 2d 72 65 63 75 72 73 69 6f 6e 2d 64 65 66 |re-recursion-def|
00000040: 61 75 6c 74 2d 70 61 72 61 6d 73 2d 30 36 32 2e |ault-params-062.|
00000050: 6a 73 08 62 61 73 65 02 66 02 6b 0c 00 06 00 a4 |js.base.f.k.....|
00000060: 01 00 01 00 04 00 01 3b 01 a6 01 00 00 00 40 e4 |.......;......@.|
00000070: 00 00 00 40 40 e5 00 00 00 80 c2 00 41 e4 00 00 |...@@.......A...|
00000080: 00 00 3f e5 00 00 00 80 39 e4 00 00 00 f0 3b e5 |..?.....9.....;.|
00000090: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 |...9....C....9..|
000000a0: 00 00 ba f1 24 01 00 cf 28 d0 03 12 00 00 00 1a |....$...(.......|
000000b0: 12 14 1b 0c 21 1f 1b 0e 1b 0a 20 02 07 03 00 0c |....!..... .....|
000000c0: 41 06 00 c8 03 01 02 00 02 00 01 11 03 d2 03 00 |A...............|
000000d0: 01 40 d2 03 01 ff ff ff ff 0f 20 d4 03 00 00 40 |.@........ ....@|
000000e0: 63 00 00 d3 11 f4 ec 05 0e bf 3e db cb c2 00 d0 |c.........>.....|
000000f0: 28 d0 03 08 01 00 00 0f 0c 16 07 0d 00 0c 41 06 |(.............A.|
00000100: 00 d4 03 01 01 00 03 02 00 1b 02 d6 03 00 01 00 |................|
00000110: d6 03 01 ff ff ff ff 0f 20 d2 03 00 03 d4 03 01 |........ .......|
00000120: 01 63 00 00 d3 11 f4 ec 04 0e b9 db cb d3 b7 a6 |.c..............|
00000130: ec 03 df 28 e0 d3 b8 a0 f1 b8 9f 28 d0 03 16 02 |...(.......(....|
00000140: 04 3f 10 0c 04 12 0a 07 0d 08 06 07 04 0c 04 07 |.?..............|
00000150: 05 0c 10 07 1f 00                               |......|
```

### WASM
```
00000000: 05 08 0c 6d 61 6b 65 36 32 02 67 0e 63 6f 6e 73 |...make62.g.cons|
00000010: 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 73 74 73 5f |ole.logt__tests_|
00000020: 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 75 |_/fixtures/closu|
00000030: 72 65 2d 72 65 63 75 72 73 69 6f 6e 2d 64 65 66 |re-recursion-def|
00000040: 61 75 6c 74 2d 70 61 72 61 6d 73 2d 30 36 32 2e |ault-params-062.|
00000050: 6a 73 08 62 61 73 65 02 66 02 6b 0c 00 06 00 a4 |js.base.f.k.....|
00000060: 01 00 01 00 04 00 01 3b 01 a6 01 00 00 00 40 e4 |.......;......@.|
00000070: 00 00 00 40 40 e5 00 00 00 80 c2 00 41 e4 00 00 |...@@.......A...|
00000080: 00 00 3f e5 00 00 00 80 39 e4 00 00 00 f0 3b e5 |..?.....9.....;.|
00000090: 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 |...9....C....9..|
000000a0: 00 00 ba f1 24 01 00 cf 28 d0 03 12 00 00 00 1a |....$...(.......|
000000b0: 12 14 1b 0c 21 1f 1b 0e 1b 0a 20 02 07 03 00 0c |....!..... .....|
000000c0: 41 06 00 c8 03 01 02 00 02 00 01 11 03 d2 03 00 |A...............|
000000d0: 01 40 d2 03 01 ff ff ff ff 0f 20 d4 03 00 00 40 |.@........ ....@|
000000e0: 63 00 00 d3 11 f4 ec 05 0e bf 3e db cb c2 00 d0 |c.........>.....|
000000f0: 28 d0 03 08 01 00 00 0f 0c 16 07 0d 00 0c 41 06 |(.............A.|
00000100: 00 d4 03 01 01 00 03 02 00 1b 02 d6 03 00 01 00 |................|
00000110: d6 03 01 ff ff ff ff 0f 20 d2 03 00 03 d4 03 01 |........ .......|
00000120: 01 63 00 00 d3 11 f4 ec 04 0e b9 db cb d3 b7 a6 |.c..............|
00000130: ec 03 df 28 e0 d3 b8 a0 f1 b8 9f 28 d0 03 16 02 |...(.......(....|
00000140: 04 3f 10 0c 04 12 0a 07 0d 08 06 07 04 0c 04 07 |.?..............|
00000150: 05 0c 10 07 1f 00                               |......|
```