# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-basic.ts
**生成时间**: 2025-12-12T09:59:18.409Z

## 大小对比

- TypeScript编译器: 162 字节
- WASM编译器: 192 字节
- 差异: -30 字节 (-15.63%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-basic.js",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 87
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Point",
      "offset": 36
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
    "tag": "0xd",
    "remaining": 146
  }
}
```

## 字节级差异

共发现 172 个字节差异:

- 偏移量 0x1: TS=0x05 vs WASM=0x04
- 偏移量 0x2: TS=0x0c vs WASM=0x42
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x0a vs WASM=0x78
- 偏移量 0x10: TS=0x50 vs WASM=0x74
- 偏移量 0x11: TS=0x6f vs WASM=0x75
- 偏移量 0x12: TS=0x69 vs WASM=0x72
- 偏移量 0x13: TS=0x6e vs WASM=0x65
- 偏移量 0x14: TS=0x74 vs WASM=0x73
- 偏移量 0x15: TS=0x26 vs WASM=0x2f
- ... (显示前20个差异，总共172个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 0a |...<eval>._ret_.|
00000010: 50 6f 69 6e 74 26 3c 63 6c 61 73 73 5f 66 69 65 |Point&<class_fie|
00000020: 6c 64 73 5f 69 6e 69 74 3e 42 5f 5f 74 65 73 74 |lds_init>B__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 |s__/fixtures/cla|
00000040: 73 73 2d 62 61 73 69 63 2e 6a 73 0c 02 06 00 00 |ss-basic.js.....|
00000050: 00 00 00 00 03 00 03 00 01 29 03 01 00 00 00 00 |.........)......|
00000060: 00 00 02 00 00 00 02 00 30 03 00 00 00 03 02 30 |........0......0|
00000070: 40 e6 00 00 00 00 b6 01 00 b6 02 00 06 b6 03 00 |@...............|
00000080: d4 00 58 e6 00 00 00 00 06 e0 0e e3 b7 03 00 b7 |..X.............|
00000090: 02 00 3b e6 00 00 00 da 28 04 00 00 00 02 00 00 |..;.....(.......|
000000a0: 00 01                                           |..|
```

### WASM
```
00000000: 05 04 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..B__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6c 61 73 73 2d 62 61 73 69 |tures/class-basi|
00000020: 63 2e 6a 73 0a 50 6f 69 6e 74 02 78 02 79 0d c8 |c.js.Point.x.y..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 |....... ........|
00000040: 01 01 1d 02 ca 03 02 00 30 f0 01 03 01 70 ca 03 |........0....p..|
00000050: 00 09 08 ec 02 29 63 00 00 06 63 01 00 c1 00 58 |.....)c...c....X|
00000060: e5 00 00 00 00 06 cc 0e cf 6b 01 00 e3 06 2f c8 |.........k..../.|
00000070: 03 02 00 00 00 0c 42 07 01 00 02 01 02 02 01 00 |......B.........|
00000080: 1e 03 cc 03 00 01 00 ce 03 00 01 00 10 00 01 00 |................|
00000090: f0 01 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 |......+h.......$|
000000a0: 00 00 0e c7 d3 44 e6 00 00 00 c7 d4 44 e7 00 00 |.....D......D...|
000000b0: 00 29 c8 03 0a 01 04 4e 08 07 12 21 11 07 12 00 |.).....N...!....|
```