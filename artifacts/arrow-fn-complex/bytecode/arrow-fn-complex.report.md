# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/arrow-fn-complex.ts
**生成时间**: 2025-12-16T14:11:02.383Z

## 大小对比

- TypeScript编译器: 331 字节
- WASM编译器: 224 字节
- 差异: 107 字节 (47.77%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-complex.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 63
    },
    {
      "index": 6,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xc",
    "remaining": 265
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-complex.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 159
  }
}
```

## 字节级差异

共发现 240 个字节差异:

- 偏移量 0x1: TS=0x07 vs WASM=0x06
- 偏移量 0x41: TS=0x00 vs WASM=0x0c
- 偏移量 0x42: TS=0x0c vs WASM=0x00
- 偏移量 0x43: TS=0x00 vs WASM=0x06
- 偏移量 0x44: TS=0x06 vs WASM=0x00
- 偏移量 0x45: TS=0x00 vs WASM=0xa4
- 偏移量 0x46: TS=0xa4 vs WASM=0x01
- 偏移量 0x47: TS=0x01 vs WASM=0x00
- 偏移量 0x48: TS=0x00 vs WASM=0x01
- 偏移量 0x49: TS=0x01 vs WASM=0x00
- 偏移量 0x4a: TS=0x00 vs WASM=0x04
- 偏移量 0x4b: TS=0x04 vs WASM=0x00
- 偏移量 0x4c: TS=0x00 vs WASM=0x01
- 偏移量 0x4d: TS=0x01 vs WASM=0x2e
- 偏移量 0x4e: TS=0x2e vs WASM=0x01
- 偏移量 0x4f: TS=0x01 vs WASM=0xa6
- 偏移量 0x50: TS=0xa6 vs WASM=0x01
- 偏移量 0x51: TS=0x01 vs WASM=0x00
- 偏移量 0x54: TS=0x00 vs WASM=0x40
- 偏移量 0x55: TS=0x40 vs WASM=0xe4
- ... (显示前20个差异，总共240个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |...complex.conso|
00000010: 6c 65 06 6c 6f 67 4c 5f 5f 74 65 73 74 73 5f 5f |le.logL__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 61 72 72 6f 77 2d |/fixtures/arrow-|
00000030: 66 6e 2d 63 6f 6d 70 6c 65 78 2e 6a 73 02 78 02 |fn-complex.js.x.|
00000040: 79 00 0c 00 06 00 a4 01 00 01 00 04 00 01 2e 01 |y...............|
00000050: a6 01 00 00 00 40 e4 00 00 00 01 3f e4 00 00 00 |.....@.....?....|
00000060: 10 c2 00 4f 00 00 00 00 3b e4 00 00 00 39 e5 00 |...O....;....9..|
00000070: 00 00 43 e6 00 00 00 39 e4 00 00 00 bc f1 24 01 |..C....9......$.|
00000080: 00 cf 28 ce 03 12 00 00 3e 20 25 13 00 05 0e 0b |..(.....> %.....|
00000090: 34 18 1b 10 07 0f 07 17 00 0c 02 06 00 00 01 01 |4...............|
000000a0: 01 00 00 00 96 01 02 d0 03 00 00 00 d2 03 01 00 |................|
000000b0: 30 b6 01 00 c8 27 00 00 00 01 0a 00 00 00 c8 23 |0....'.........#|
000000c0: 00 00 00 bf e7 00 00 00 01 00 b6 02 00 c8 33 00 |..............3.|
000000d0: 00 00 ba e6 00 00 00 02 00 c8 37 00 00 00 ba e7 |..........7.....|
000000e0: 00 00 00 02 00 c8 35 00 00 00 a7 6c 00 00 00 00 |......5....l....|
000000f0: b6 03 00 c8 4b 00 00 00 ba e6 00 00 00 03 00 c8 |....K...........|
00000100: 4f 00 00 00 ba e7 00 00 00 03 00 c8 4d 00 00 00 |O...........M...|
00000110: a0 c8 44 ea 00 00 00 b7 03 00 b8 00 00 00 00 b7 |..D.............|
00000120: 02 00 c8 63 00 00 00 ba e7 00 00 00 01 00 c8 67 |...c...........g|
00000130: 00 00 00 ba e6 00 00 00 01 00 c8 65 00 00 00 a0 |...........e....|
00000140: c8 5c 00 00 00 28 29 ce 03 00 00                |.\...()....|
```

### WASM
```
00000000: 05 06 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |...complex.conso|
00000010: 6c 65 06 6c 6f 67 4c 5f 5f 74 65 73 74 73 5f 5f |le.logL__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 61 72 72 6f 77 2d |/fixtures/arrow-|
00000030: 66 6e 2d 63 6f 6d 70 6c 65 78 2e 6a 73 02 78 02 |fn-complex.js.x.|
00000040: 79 0c 00 06 00 a4 01 00 01 00 04 00 01 2e 01 a6 |y...............|
00000050: 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 00 80 |....@.....?.....|
00000060: c2 00 4f e4 00 00 00 3b e4 00 00 00 39 e5 00 00 |..O....;....9...|
00000070: 00 43 e6 00 00 00 39 e4 00 00 00 bc f1 24 01 00 |.C....9......$..|
00000080: cf 28 ce 03 0e 00 00 00 18 0e 00 1b 0e 1b 0a 20 |.(............. |
00000090: 0e 07 0f 00 0c 02 06 00 00 01 01 01 02 00 00 19 |................|
000000a0: 02 d0 03 00 01 00 d2 03 01 00 30 63 00 00 bf 0a |..........0c....|
000000b0: cb d3 64 00 00 a7 ec 07 d3 64 00 00 a0 28 64 00 |..d......d...(d.|
000000c0: 00 d3 a0 28 ce 03 18 00 10 22 0f 07 08 11 03 12 |...(....."......|
000000d0: 0a 07 08 11 03 07 11 09 06 11 08 07 03 07 11 00 |................|
```