# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-basic.ts
**生成时间**: 2025-12-22T09:42:56.980Z

## 大小对比

- TypeScript编译器: 200 字节
- WASM编译器: 197 字节
- 差异: 3 字节 (1.52%)

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
    "remaining": 154
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

共发现 32 个字节差异:

- 偏移量 0x7e: TS=0x7c vs WASM=0x00
- 偏移量 0x82: TS=0x03 vs WASM=0x02
- 偏移量 0x85: TS=0x21 vs WASM=0x1e
- 偏移量 0x93: TS=0x00 vs WASM=0x01
- 偏移量 0xaa: TS=0x15 vs WASM=0x44
- 偏移量 0xab: TS=0x44 vs WASM=0xe6
- 偏移量 0xac: TS=0xe6 vs WASM=0x00
- 偏移量 0xaf: TS=0x00 vs WASM=0xc7
- 偏移量 0xb0: TS=0x0e vs WASM=0xd4
- 偏移量 0xb1: TS=0xc7 vs WASM=0x44
- 偏移量 0xb2: TS=0xd4 vs WASM=0xe7
- 偏移量 0xb3: TS=0x15 vs WASM=0x00
- 偏移量 0xb4: TS=0x44 vs WASM=0x00
- 偏移量 0xb5: TS=0xe7 vs WASM=0x00
- 偏移量 0xb6: TS=0x00 vs WASM=0x29
- 偏移量 0xb7: TS=0x00 vs WASM=0xca
- 偏移量 0xb8: TS=0x00 vs WASM=0x03
- 偏移量 0xb9: TS=0x29 vs WASM=0x0a
- 偏移量 0xba: TS=0xca vs WASM=0x01
- 偏移量 0xbb: TS=0x03 vs WASM=0x04
- ... (显示前20个差异，总共32个)

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
00000070: 00 00 c7 28 ca 03 02 00 00 00 0c 42 07 01 7c 02 |...(.......B..|.|
00000080: 01 02 03 01 00 21 03 cc 03 00 01 00 ce 03 00 01 |.....!..........|
00000090: 00 10 00 00 00 f0 01 02 0d 08 cb 2b 68 00 00 11 |...........+h...|
000000a0: ec 06 c7 1b 24 00 00 0e c7 d3 15 44 e6 00 00 00 |....$......D....|
000000b0: 0e c7 d4 15 44 e7 00 00 00 29 ca 03 0a 01 04 4e |....D....).....N|
000000c0: 08 07 12 2b 11 07 12 00                         |...+....|
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