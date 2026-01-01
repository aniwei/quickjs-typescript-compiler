# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-recursion-default-params-100.ts
**生成时间**: 2026-01-01T10:01:38.682Z

## 大小对比

- TypeScript编译器: 343 字节
- WASM编译器: 343 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "make100",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-recursion-default-params-100.js",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 83
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 88
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 92,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "make100",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 116,
      "actualLength": 58,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-recursion-default-params-100.js",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 83
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 88
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 92,
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
00000000: 05 08 0e 6d 61 6b 65 31 30 30 02 67 0e 63 6f 6e |...make100.g.con|
00000010: 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 73 74 73 |sole.logt__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000030: 75 72 65 2d 72 65 63 75 72 73 69 6f 6e 2d 64 65 |ure-recursion-de|
00000040: 66 61 75 6c 74 2d 70 61 72 61 6d 73 2d 31 30 30 |fault-params-100|
00000050: 2e 6a 73 08 62 61 73 65 02 66 02 6b 0c 00 06 00 |.js.base.f.k....|
00000060: a4 01 00 01 00 04 00 01 3b 01 a6 01 00 00 00 40 |........;......@|
00000070: e4 00 00 00 40 40 e5 00 00 00 80 c2 00 41 e4 00 |....@@.......A..|
00000080: 00 00 00 3f e5 00 00 00 80 39 e4 00 00 00 f0 3b |...?.....9.....;|
00000090: e5 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 |....9....C....9.|
000000a0: 00 00 00 ba f1 24 01 00 cf 28 d0 03 12 00 00 00 |.....$...(......|
000000b0: 1a 12 14 1b 0e 21 21 1b 0e 1b 0a 20 02 07 03 00 |.....!!.... ....|
000000c0: 0c 41 06 00 c8 03 01 02 00 02 00 01 11 03 d2 03 |.A..............|
000000d0: 00 01 40 d2 03 01 ff ff ff ff 0f 20 d4 03 00 00 |..@........ ....|
000000e0: 40 63 00 00 d3 11 f4 ec 05 0e bf 64 db cb c2 00 |@c.........d....|
000000f0: d0 28 d0 03 08 01 00 00 0f 0c 16 07 0d 00 0c 41 |.(.............A|
00000100: 06 00 d4 03 01 01 00 03 02 00 1b 02 d6 03 00 01 |................|
00000110: 00 d6 03 01 ff ff ff ff 0f 20 d2 03 00 03 d4 03 |......... ......|
00000120: 01 01 63 00 00 d3 11 f4 ec 04 0e b9 db cb d3 b7 |..c.............|
00000130: a6 ec 03 df 28 e0 d3 b8 a0 f1 b8 9f 28 d0 03 16 |....(.......(...|
00000140: 02 04 3f 10 0c 04 12 0a 07 0d 08 06 07 04 0c 04 |..?.............|
00000150: 07 05 0c 10 07 1f 00                            |.......|
```

### WASM
```
00000000: 05 08 0e 6d 61 6b 65 31 30 30 02 67 0e 63 6f 6e |...make100.g.con|
00000010: 73 6f 6c 65 06 6c 6f 67 74 5f 5f 74 65 73 74 73 |sole.logt__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000030: 75 72 65 2d 72 65 63 75 72 73 69 6f 6e 2d 64 65 |ure-recursion-de|
00000040: 66 61 75 6c 74 2d 70 61 72 61 6d 73 2d 31 30 30 |fault-params-100|
00000050: 2e 6a 73 08 62 61 73 65 02 66 02 6b 0c 00 06 00 |.js.base.f.k....|
00000060: a4 01 00 01 00 04 00 01 3b 01 a6 01 00 00 00 40 |........;......@|
00000070: e4 00 00 00 40 40 e5 00 00 00 80 c2 00 41 e4 00 |....@@.......A..|
00000080: 00 00 00 3f e5 00 00 00 80 39 e4 00 00 00 f0 3b |...?.....9.....;|
00000090: e5 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 |....9....C....9.|
000000a0: 00 00 00 ba f1 24 01 00 cf 28 d0 03 12 00 00 00 |.....$...(......|
000000b0: 1a 12 14 1b 0e 21 21 1b 0e 1b 0a 20 02 07 03 00 |.....!!.... ....|
000000c0: 0c 41 06 00 c8 03 01 02 00 02 00 01 11 03 d2 03 |.A..............|
000000d0: 00 01 40 d2 03 01 ff ff ff ff 0f 20 d4 03 00 00 |..@........ ....|
000000e0: 40 63 00 00 d3 11 f4 ec 05 0e bf 64 db cb c2 00 |@c.........d....|
000000f0: d0 28 d0 03 08 01 00 00 0f 0c 16 07 0d 00 0c 41 |.(.............A|
00000100: 06 00 d4 03 01 01 00 03 02 00 1b 02 d6 03 00 01 |................|
00000110: 00 d6 03 01 ff ff ff ff 0f 20 d2 03 00 03 d4 03 |......... ......|
00000120: 01 01 63 00 00 d3 11 f4 ec 04 0e b9 db cb d3 b7 |..c.............|
00000130: a6 ec 03 df 28 e0 d3 b8 a0 f1 b8 9f 28 d0 03 16 |....(.......(...|
00000140: 02 04 3f 10 0c 04 12 0a 07 0d 08 06 07 04 0c 04 |..?.............|
00000150: 07 05 0c 10 07 1f 00                            |.......|
```