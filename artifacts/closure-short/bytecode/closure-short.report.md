# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-short.ts
**生成时间**: 2025-12-16T14:11:02.452Z

## 大小对比

- TypeScript编译器: 505 字节
- WASM编译器: 273 字节
- 差异: 232 字节 (84.98%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "short",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-short.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 47
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 50
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 56
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 59
    },
    {
      "index": 8,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 65
    },
    {
      "index": 9,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 67,
    "tag": "0xc",
    "remaining": 438
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
      "string": "short",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-short.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 47
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 50
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 53
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 56
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 208
  }
}
```

## 字节级差异

共发现 411 个字节差异:

- 偏移量 0x1: TS=0x0a vs WASM=0x08
- 偏移量 0x41: TS=0x00 vs WASM=0x0c
- 偏移量 0x43: TS=0x0c vs WASM=0x06
- 偏移量 0x45: TS=0x06 vs WASM=0xa4
- 偏移量 0x46: TS=0x00 vs WASM=0x01
- 偏移量 0x47: TS=0xa4 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=0x16
- 偏移量 0x4f: TS=0x1e vs WASM=0xa6
- 偏移量 0x51: TS=0xa6 vs WASM=0x00
- 偏移量 0x52: TS=0x01 vs WASM=0x00
- 偏移量 0x54: TS=0x00 vs WASM=0x40
- 偏移量 0x55: TS=0x00 vs WASM=0xe4
- 偏移量 0x56: TS=0xc2 vs WASM=0x00
- 偏移量 0x58: TS=0x41 vs WASM=0x00
- 偏移量 0x59: TS=0xe4 vs WASM=0x40
- 偏移量 0x5a: TS=0x00 vs WASM=0xc2
- 偏移量 0x5c: TS=0x00 vs WASM=0x41
- 偏移量 0x5d: TS=0x00 vs WASM=0xe4
- 偏移量 0x5e: TS=0xc2 vs WASM=0x00
- 偏移量 0x60: TS=0x3b vs WASM=0x00
- ... (显示前20个差异，总共411个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 0a 73 68 6f 72 74 46 5f 5f 74 65 73 74 73 |...shortF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 73 68 6f 72 74 2e 6a 73 04 76 30 04 |ure-short.js.v0.|
00000030: 76 31 04 76 32 04 76 33 04 76 34 0a 69 6e 6e 65 |v1.v2.v3.v4.inne|
00000040: 72 00 00 0c 00 06 00 a4 01 00 01 00 01 00 01 1e |r...............|
00000050: 01 a6 01 00 00 00 c2 00 41 e4 00 00 00 00 c2 00 |........A.......|
00000060: 3b e4 00 00 00 c2 00 3b e4 00 00 00 39 e4 00 00 |;......;....9...|
00000070: 00 f0 cf 28 ca 03 06 00 00 00 16 1e 00 00 0c 43 |...(...........C|
00000080: 06 00 c8 03 00 06 00 00 00 01 98 01 06 cc 03 00 |................|
00000090: 00 00 ce 03 00 01 00 d0 03 00 02 00 d2 03 00 03 |................|
000000a0: 00 d4 03 00 04 00 d6 03 00 05 00 b6 01 00 c8 20 |............... |
000000b0: 00 00 00 01 00 00 00 00 c8 1b 00 00 00 bb e6 00 |................|
000000c0: 00 00 01 00 c8 30 00 00 00 01 01 00 00 00 c8 2b |.....0.........+|
000000d0: 00 00 00 bb e7 00 00 00 01 00 c8 40 00 00 00 01 |...........@....|
000000e0: 02 00 00 00 c8 3b 00 00 00 bb e8 00 00 00 01 00 |.....;..........|
000000f0: c8 50 00 00 00 01 03 00 00 00 c8 4b 00 00 00 bb |.P.........K....|
00000100: e9 00 00 00 01 00 c8 60 00 00 00 01 04 00 00 00 |.......`........|
00000110: c8 5b 00 00 00 bb ea 00 00 00 01 00 c8 67 00 00 |.[...........g..|
00000120: 00 03 00 00 00 00 bf eb 00 00 00 01 00 c8 ca 00 |................|
00000130: 00 00 c8 ca 00 00 00 ba eb 00 00 00 01 00 22 00 |..............".|
00000140: 00 0e 29 ca 03 00 00 0c 43 06 00 d6 03 00 00 00 |..).....C.......|
00000150: 00 00 00 9f 01 00 b6 01 00 c8 82 00 00 00 c8 82 |................|
00000160: 00 00 00 bd e6 00 00 00 00 00 00 00 01 00 3d 93 |..............=.|
00000170: b8 00 00 00 00 19 3e 0e c8 90 00 00 00 c8 90 00 |......>.........|
00000180: 00 00 bd e7 00 00 00 01 00 00 00 01 00 3d 93 b8 |.............=..|
00000190: 01 00 00 00 19 3e 0e c8 9e 00 00 00 c8 9e 00 00 |.....>..........|
000001a0: 00 bd e8 00 00 00 02 00 00 00 01 00 3d 93 b8 02 |............=...|
000001b0: 00 00 00 19 3e 0e c8 ac 00 00 00 c8 ac 00 00 00 |....>...........|
000001c0: bd e9 00 00 00 03 00 00 00 01 00 3d 93 b8 03 00 |...........=....|
000001d0: 00 00 19 3e 0e c8 ba 00 00 00 c8 ba 00 00 00 bd |...>............|
000001e0: ea 00 00 00 04 ec 00 00 00 00 3d 93 b8 04 ed 00 |..........=.....|
000001f0: 00 00 3e 0e 29 ca 03 00 00                      |..>.)....|
```

### WASM
```
00000000: 05 08 0a 73 68 6f 72 74 46 5f 5f 74 65 73 74 73 |...shortF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 73 68 6f 72 74 2e 6a 73 04 76 30 04 |ure-short.js.v0.|
00000030: 76 31 04 76 32 04 76 33 04 76 34 0a 69 6e 6e 65 |v1.v2.v3.v4.inne|
00000040: 72 0c 00 06 00 a4 01 00 01 00 01 00 01 16 01 a6 |r...............|
00000050: 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 00 00 |....@....@..A...|
00000060: 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 00 00 00 |..9......(......|
00000070: 0e 1e 00 1b 0a 00 0c 43 06 00 c8 03 00 06 00 01 |.......C........|
00000080: 00 01 13 06 cc 03 00 00 40 ce 03 00 01 40 d0 03 |........@....@..|
00000090: 00 02 40 d2 03 00 03 40 d4 03 00 04 40 d6 03 00 |..@....@....@...|
000000a0: 05 00 c2 00 c5 05 b7 cb b8 cc b9 cd ba ce bb c5 |................|
000000b0: 04 c4 05 f0 29 ca 03 08 00 00 00 0f 1a 08 0c 0a |....)...........|
000000c0: 00 0c 43 06 00 d6 03 00 00 00 01 05 00 14 00 cc |..C.............|
000000d0: 03 00 01 ce 03 01 01 d0 03 02 01 d2 03 03 01 d4 |................|
000000e0: 03 04 01 df 91 e3 e0 91 e4 e1 91 e5 e2 91 e6 60 |...............`|
000000f0: 04 00 91 61 04 00 29 ca 03 16 06 04 03 08 07 04 |...a..).........|
00000100: 0d 03 07 04 0d 03 07 04 0d 03 07 04 0d 03 11 04 |................|
00000110: 00                                              |.|
```