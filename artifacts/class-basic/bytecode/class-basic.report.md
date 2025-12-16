# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-basic.ts
**生成时间**: 2025-12-16T14:11:02.416Z

## 大小对比

- TypeScript编译器: 262 字节
- WASM编译器: 197 字节
- 差异: 65 字节 (32.99%)

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
    "remaining": 216
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

共发现 150 个字节差异:

- 偏移量 0x3a: TS=0x26 vs WASM=0x29
- 偏移量 0x4a: TS=0x30 vs WASM=0x70
- 偏移量 0x50: TS=0x00 vs WASM=0x80
- 偏移量 0x56: TS=0x12 vs WASM=0x82
- 偏移量 0x6a: TS=0x3b vs WASM=0x6b
- 偏移量 0x6b: TS=0xe4 vs WASM=0x02
- 偏移量 0x6d: TS=0x00 vs WASM=0x3b
- 偏移量 0x6e: TS=0x00 vs WASM=0xe4
- 偏移量 0x6f: TS=0xc7 vs WASM=0x00
- 偏移量 0x70: TS=0x28 vs WASM=0x00
- 偏移量 0x71: TS=0xca vs WASM=0x00
- 偏移量 0x72: TS=0x03 vs WASM=0xc7
- 偏移量 0x73: TS=0x02 vs WASM=0x28
- 偏移量 0x74: TS=0x00 vs WASM=0xca
- 偏移量 0x75: TS=0x00 vs WASM=0x03
- 偏移量 0x76: TS=0x00 vs WASM=0x02
- 偏移量 0x77: TS=0x0c vs WASM=0x00
- 偏移量 0x78: TS=0x42 vs WASM=0x00
- 偏移量 0x79: TS=0x07 vs WASM=0x00
- 偏移量 0x7a: TS=0x01 vs WASM=0x0c
- ... (显示前20个差异，总共150个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0a 50 6f 69 6e 74 42 5f 5f 74 65 73 74 73 |...PointB__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 73 |__/fixtures/clas|
00000020: 73 2d 62 61 73 69 63 2e 6a 73 02 78 02 79 0c 00 |s-basic.js.x.y..|
00000030: 06 00 a4 01 00 03 00 03 00 01 26 03 a6 01 00 00 |..........&.....|
00000040: 00 c8 03 02 00 30 f0 01 03 02 30 40 e4 00 00 00 |.....0....0@....|
00000050: 00 3f e4 00 00 00 12 63 01 00 06 63 02 00 c1 00 |.?.....c...c....|
00000060: 58 e4 00 00 00 00 06 cd 0e d0 3b e4 00 00 00 c7 |X.........;.....|
00000070: 28 ca 03 02 00 00 00 0c 42 07 01 7c 02 00 02 00 |(.......B..|....|
00000080: 00 00 74 02 cc 03 00 00 00 ce 03 00 00 00 2b ba |..t...........+.|
00000090: 78 00 00 00 00 00 11 06 ad 6d 00 00 00 00 ba 08 |x........m......|
000000a0: 00 00 00 00 00 1b 24 00 00 0e 6e 01 00 00 00 b8 |......$...n.....|
000000b0: 00 00 00 00 0e b8 01 00 00 00 b6 01 00 c8 2e 00 |................|
000000c0: 00 00 c8 2e 00 00 00 c8 37 00 00 00 ba e6 00 00 |........7.......|
000000d0: 00 01 00 15 c8 2e 00 00 00 44 e6 00 00 00 0e c8 |.........D......|
000000e0: 42 00 00 00 c8 42 00 00 00 c8 4b 00 00 00 ba e7 |B....B....K.....|
000000f0: 00 00 00 01 00 15 c8 42 00 00 00 44 e7 00 00 00 |.......B...D....|
00000100: 0e 29 ca 03 00 00                               |.)....|
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