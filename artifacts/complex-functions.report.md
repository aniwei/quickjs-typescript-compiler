# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/complex-functions.ts
**生成时间**: 2025-11-26T06:37:08.303Z

## 大小对比

- TypeScript编译器: 257 字节
- WASM编译器: 251 字节
- 差异: 6 字节 (2.39%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/complex-functions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "factorial",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 74
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 83,
    "tag": "0xd",
    "remaining": 174
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/complex-functions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "factorial",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 74
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 83,
    "tag": "0xd",
    "remaining": 168
  }
}
```

## 字节级差异

共发现 107 个字节差异:

- 偏移量 0x7f: TS=0x06 vs WASM=0x02
- 偏移量 0x83: TS=0x06 vs WASM=0x0c
- 偏移量 0x84: TS=0x0a vs WASM=0x43
- 偏移量 0x85: TS=0x00 vs WASM=0x06
- 偏移量 0x86: TS=0x00 vs WASM=0x01
- 偏移量 0x87: TS=0x0c vs WASM=0xca
- 偏移量 0x88: TS=0x43 vs WASM=0x03
- 偏移量 0x89: TS=0x06 vs WASM=0x02
- 偏移量 0x8b: TS=0xca vs WASM=0x02
- 偏移量 0x8c: TS=0x03 vs WASM=0x02
- 偏移量 0x8d: TS=0x02 vs WASM=0x00
- 偏移量 0x8e: TS=0x01 vs WASM=0x00
- 偏移量 0x8f: TS=0x02 vs WASM=0x0b
- 偏移量 0x90: TS=0x02 vs WASM=0x03
- 偏移量 0x91: TS=0x00 vs WASM=0xce
- 偏移量 0x92: TS=0x00 vs WASM=0x03
- 偏移量 0x93: TS=0x0b vs WASM=0x00
- 偏移量 0x94: TS=0x03 vs WASM=0x01
- 偏移量 0x95: TS=0xce vs WASM=0x00
- 偏移量 0x96: TS=0x03 vs WASM=0xd0
- ... (显示前20个差异，总共107个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 6c 65 78 2d 66 75 6e 63 74 69 6f 6e 73 |omplex-functions|
00000030: 2e 6a 73 10 6d 75 6c 74 69 70 6c 79 12 66 61 63 |.js.multiply.fac|
00000040: 74 6f 72 69 61 6c 02 61 02 62 0c 72 65 73 75 6c |torial.a.b.resul|
00000050: 74 02 6e 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |t.n......... ...|
00000060: 01 00 00 00 01 02 02 0c 00 ca 03 00 01 cc 03 01 |................|
00000070: 01 08 ec 08 c2 00 e3 c2 01 e4 29 06 2f c8 03 06 |..........)./...|
00000080: 00 00 00 06 0a 00 00 0c 43 06 01 ca 03 02 01 02 |........C.......|
00000090: 02 00 00 0b 03 ce 03 00 01 00 d0 03 00 01 00 d2 |................|
000000a0: 03 00 00 30 63 00 00 d3 d4 9c cb 64 00 00 28 c8 |...0c......d..(.|
000000b0: 03 0c 00 00 12 22 07 08 07 03 0d 13 11 0d 00 0c |....."..........|
000000c0: 43 06 01 cc 03 01 00 01 04 00 00 13 01 d4 03 00 |C...............|
000000d0: 01 00 d3 b8 a6 ec 03 b8 28 d3 39 e6 00 00 00 d3 |........(.9.....|
000000e0: b8 a0 f1 9c 28 c8 03 18 00 00 00 00 0c 0c 0c 04 |....(...........|
000000f0: 17 07 09 0a 07 08 1b 14 0c 04 07 05 07 15 07 11 |................|
00000100: 00                                              |.|
```

### WASM
```
00000000: 05 07 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 6c 65 78 2d 66 75 6e 63 74 69 6f 6e 73 |omplex-functions|
00000030: 2e 6a 73 10 6d 75 6c 74 69 70 6c 79 12 66 61 63 |.js.multiply.fac|
00000040: 74 6f 72 69 61 6c 02 61 02 62 0c 72 65 73 75 6c |torial.a.b.resul|
00000050: 74 02 6e 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |t.n......... ...|
00000060: 01 00 00 00 01 02 02 0c 00 ca 03 00 01 cc 03 01 |................|
00000070: 01 08 ec 08 c2 00 e3 c2 01 e4 29 06 2f c8 03 02 |..........)./...|
00000080: 00 00 00 0c 43 06 01 ca 03 02 01 02 02 00 00 0b |....C...........|
00000090: 03 ce 03 00 01 00 d0 03 00 01 00 d2 03 01 00 30 |...............0|
000000a0: 63 00 00 d3 d4 9c cb 64 00 00 28 c8 03 0c 00 00 |c......d..(.....|
000000b0: 12 26 07 08 07 03 0d 13 11 0d 00 0c 43 06 01 cc |.&..........C...|
000000c0: 03 01 00 01 04 01 00 0f 01 d4 03 00 01 00 cc 03 |................|
000000d0: 01 00 d3 b8 a6 ec 03 b8 28 d3 df d3 b8 a0 f1 9c |........(.......|
000000e0: 28 c8 03 16 04 00 03 10 0c 04 17 03 09 06 07 08 |(...............|
000000f0: 07 14 0c 04 07 05 07 15 07 11 00                |...........|
```