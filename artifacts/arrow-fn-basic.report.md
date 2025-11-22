# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-11-22T14:52:37.743Z

## 大小对比

- TypeScript编译器: 337 字节
- WASM编译器: 316 字节
- 差异: 21 字节 (6.65%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "doubled",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "combined",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 73
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "extra",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 81,
    "tag": "0xd",
    "remaining": 256
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "doubled",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "combined",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 73
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "extra",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 81,
    "tag": "0xd",
    "remaining": 235
  }
}
```

## 字节级差异

共发现 185 个字节差异:

- 偏移量 0x65: TS=0x2c vs WASM=0x26
- 偏移量 0x8f: TS=0x06 vs WASM=0x68
- 偏移量 0x90: TS=0x0e vs WASM=0x01
- 偏移量 0x91: TS=0x68 vs WASM=0x00
- 偏移量 0x92: TS=0x01 vs WASM=0x0e
- 偏移量 0x93: TS=0x00 vs WASM=0x68
- 偏移量 0x94: TS=0x0e vs WASM=0x02
- 偏移量 0x95: TS=0x06 vs WASM=0x00
- 偏移量 0x97: TS=0x68 vs WASM=0x06
- 偏移量 0x98: TS=0x02 vs WASM=0x2f
- 偏移量 0x99: TS=0x00 vs WASM=0xc8
- 偏移量 0x9a: TS=0x0e vs WASM=0x03
- 偏移量 0x9b: TS=0x06 vs WASM=0x12
- 偏移量 0x9c: TS=0x0e vs WASM=0x00
- 偏移量 0x9d: TS=0x06 vs WASM=0x00
- 偏移量 0x9e: TS=0x2f vs WASM=0x2a
- 偏移量 0x9f: TS=0xc8 vs WASM=0x3e
- 偏移量 0xa0: TS=0x03 vs WASM=0x18
- 偏移量 0xa1: TS=0x1e vs WASM=0x10
- 偏移量 0xa2: TS=0x00 vs WASM=0x11
- ... (显示前20个差异，总共185个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0a 74 6f 74 61 6c 0e 64 6f 75 62 6c 65 64 10 63 |.total.doubled.c|
00000040: 6f 6d 62 69 6e 65 64 02 61 02 62 0a 65 78 74 72 |ombined.a.b.extr|
00000050: 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |a......... .....|
00000060: 00 00 03 03 03 2c 00 ca 03 00 0d cc 03 01 0d ce |.....,..........|
00000070: 03 02 0d 08 ec 02 29 c2 00 b8 b9 f2 e3 c2 01 68 |......)........h|
00000080: 00 00 f1 e4 c2 02 68 01 00 f1 e5 68 00 00 0e 06 |......h....h....|
00000090: 0e 68 01 00 0e 06 0e 68 02 00 0e 06 0e 06 2f c8 |.h.....h....../.|
000000a0: 03 1e 00 00 16 1e 16 20 0e 1b 0c 2c 11 01 0e 27 |....... ...,...'|
000000b0: 0c 54 11 01 0e 75 02 0a 21 09 02 0a 21 09 02 0a |.T...u..!...!...|
000000c0: 00 0c 02 06 01 5e 02 00 02 02 00 00 04 02 d0 03 |.....^..........|
000000d0: 00 01 00 d2 03 00 01 00 d3 d4 9f 28 c8 03 08 00 |...........(....|
000000e0: 0f 02 14 07 08 07 03 00 0c 02 06 01 5e 01 00 01 |............^...|
000000f0: 02 00 00 04 01 84 01 00 01 00 d3 b9 9c 28 c8 03 |.............(..|
00000100: 06 02 11 02 16 0c 0c 00 0c 02 06 01 5e 01 00 01 |............^...|
00000110: 02 00 01 05 01 84 01 00 01 00 c2 00 bb f1 28 c8 |..............(.|
00000120: 03 08 04 12 02 18 11 32 07 33 00 0c 02 06 01 5e |.......2.3.....^|
00000130: 01 00 01 02 00 00 08 01 d4 03 00 01 00 39 42 00 |.............9B.|
00000140: 00 00 d3 9f 28 c8 03 08 04 1e 02 16 1b 10 07 03 |....(...........|
00000150: 00                                              |.|
```

### WASM
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0a 74 6f 74 61 6c 0e 64 6f 75 62 6c 65 64 10 63 |.total.doubled.c|
00000040: 6f 6d 62 69 6e 65 64 02 61 02 62 0a 65 78 74 72 |ombined.a.b.extr|
00000050: 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |a......... .....|
00000060: 00 00 03 03 03 26 00 ca 03 00 0d cc 03 01 0d ce |.....&..........|
00000070: 03 02 0d 08 ec 02 29 c2 00 b8 b9 f2 e3 c2 01 68 |......)........h|
00000080: 00 00 f1 e4 c2 02 68 01 00 f1 e5 68 00 00 0e 68 |......h....h...h|
00000090: 01 00 0e 68 02 00 0e 06 2f c8 03 12 00 00 2a 3e |...h..../.....*>|
000000a0: 18 10 11 01 18 2c 11 01 0e 6b 17 00 17 00 00 0c |.....,...k......|
000000b0: 02 06 01 00 02 00 02 02 00 00 04 02 d0 03 00 01 |................|
000000c0: 00 d2 03 00 01 00 d3 d4 9f 28 c8 03 08 00 0f 02 |.........(......|
000000d0: 14 07 08 07 03 00 0c 02 06 01 00 01 00 01 02 00 |................|
000000e0: 00 04 01 84 01 00 01 00 d3 b9 9c 28 c8 03 06 02 |...........(....|
000000f0: 11 02 16 0c 0c 00 0c 02 06 01 00 01 00 01 02 00 |................|
00000100: 01 06 01 84 01 00 01 40 c2 00 bb 23 01 00 c8 03 |.......@...#....|
00000110: 04 04 12 11 4a 00 0c 02 06 01 00 01 00 01 02 01 |....J...........|
00000120: 00 04 01 d4 03 00 01 00 84 01 00 03 df d3 9f 28 |...............(|
00000130: c8 03 08 04 1e 02 16 07 10 07 03 00             |............|
```