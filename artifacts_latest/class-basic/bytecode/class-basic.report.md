# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-basic.ts
**生成时间**: 2025-12-26T13:00:17.530Z

## 大小对比

- TypeScript编译器: 197 字节
- WASM编译器: 197 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-basic.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 151
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-basic.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 151
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0a 50 6f 69 6e 74 42 5f 5f 74 65 73 74 73 |...PointB__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 73 |__/fixtures/clas|
00000020: 73 2d 62 61 73 69 63 2e 6a 73 02 78 02 79 0c 00 |s-basic.js.x.y..|
00000030: 06 00 a4 01 00 03 00 03 00 01 29 03 a6 01 00 00 |..........).....|
00000040: 00 c8 03 02 00 30 f0 01 03 02 70 40 e4 00 00 00 |.....0....p@....|
00000050: 80 3f e4 00 00 00 82 63 01 00 06 63 02 00 c1 00 |.?.....c...c....|
00000060: 58 e4 00 00 00 00 06 cd 0e d0 6b 02 00 3b e4 00 |X.........k..;..|
00000070: 00 00 c7 28 ca 03 02 00 00 00 0c 42 07 01 00 02 |...(.......B....|
00000080: 01 02 02 01 00 1e 03 cc 03 00 01 00 ce 03 00 01 |................|
00000090: 00 10 00 01 00 f0 01 02 0d 08 cb 2b 68 00 00 11 |...........+h...|
000000a0: ec 06 c7 1b 24 00 00 0e c7 d3 44 e6 00 00 00 c7 |....$.....D.....|
000000b0: d4 44 e7 00 00 00 29 ca 03 0a 01 04 4e 08 07 12 |.D....).....N...|
000000c0: 21 11 07 12 00                                  |!....|
```

### WASM
```
00000000: 05 04 0a 50 6f 69 6e 74 42 5f 5f 74 65 73 74 73 |...PointB__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 73 |__/fixtures/clas|
00000020: 73 2d 62 61 73 69 63 2e 6a 73 02 78 02 79 0c 00 |s-basic.js.x.y..|
00000030: 06 00 a4 01 00 03 00 03 00 01 29 03 a6 01 00 00 |..........).....|
00000040: 00 c8 03 02 00 30 f0 01 03 02 70 40 e4 00 00 00 |.....0....p@....|
00000050: 80 3f e4 00 00 00 82 63 01 00 06 63 02 00 c1 00 |.?.....c...c....|
00000060: 58 e4 00 00 00 00 06 cd 0e d0 6b 02 00 3b e4 00 |X.........k..;..|
00000070: 00 00 c7 28 ca 03 02 00 00 00 0c 42 07 01 00 02 |...(.......B....|
00000080: 01 02 02 01 00 1e 03 cc 03 00 01 00 ce 03 00 01 |................|
00000090: 00 10 00 01 00 f0 01 02 0d 08 cb 2b 68 00 00 11 |...........+h...|
000000a0: ec 06 c7 1b 24 00 00 0e c7 d3 44 e6 00 00 00 c7 |....$.....D.....|
000000b0: d4 44 e7 00 00 00 29 ca 03 0a 01 04 4e 08 07 12 |.D....).....N...|
000000c0: 21 11 07 12 00                                  |!....|
```