# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/closure-basic.ts
**生成时间**: 2025-12-11T11:32:27.988Z

## 大小对比

- TypeScript编译器: 178 字节
- WASM编译器: 192 字节
- 差异: -14 字节 (-7.29%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xd",
    "remaining": 117
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xd",
    "remaining": 131
  }
}
```

## 字节级差异

共发现 80 个字节差异:

- 偏移量 0x35: TS=0x0a vs WASM=0x02
- 偏移量 0x36: TS=0x69 vs WASM=0x78
- 偏移量 0x37: TS=0x6e vs WASM=0x0a
- 偏移量 0x38: TS=0x6e vs WASM=0x69
- 偏移量 0x39: TS=0x65 vs WASM=0x6e
- 偏移量 0x3a: TS=0x72 vs WASM=0x6e
- 偏移量 0x3b: TS=0x02 vs WASM=0x65
- 偏移量 0x3c: TS=0x78 vs WASM=0x72
- 偏移量 0x58: TS=0xff vs WASM=0xec
- 偏移量 0x59: TS=0x02 vs WASM=0x05
- 偏移量 0x5a: TS=0x29 vs WASM=0xc2
- 偏移量 0x5b: TS=0x5a vs WASM=0x00
- 偏移量 0x5c: TS=0x00 vs WASM=0xe3
- 偏移量 0x5d: TS=0x00 vs WASM=0x29
- 偏移量 0x5e: TS=0x03 vs WASM=0xdf
- 偏移量 0x5f: TS=0x0e vs WASM=0xf0
- 偏移量 0x60: TS=0x06 vs WASM=0x0e
- 偏移量 0x61: TS=0x2f vs WASM=0x06
- 偏移量 0x62: TS=0x00 vs WASM=0x2f
- 偏移量 0x69: TS=0x04 vs WASM=0x07
- ... (显示前20个差异，总共80个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 0a |losure-basic.js.|
00000030: 6f 75 74 65 72 0a 69 6e 6e 65 72 02 78 0d c8 03 |outer.inner.x...|
00000040: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 |...... .........|
00000050: 01 0c 00 ca 03 00 01 08 ff 02 29 5a 00 00 03 0e |..........)Z....|
00000060: 06 2f 00 c8 03 08 00 00 00 04 0e 00 25 0a 00 0c |./..........%...|
00000070: 43 06 01 ca 03 00 01 00 01 00 01 06 01 cc 03 00 |C...............|
00000080: 00 00 5a 00 00 23 00 00 c8 03 08 00 00 00 00 0a |..Z..#..........|
00000090: 16 25 0d 00 0c 43 06 01 cc 03 00 00 00 01 00 00 |.%...C..........|
000000a0: 06 00 39 e7 00 00 00 28 c8 03 06 02 04 03 16 25 |..9....(.......%|
000000b0: 0d 00                                           |..|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 0a |losure-basic.js.|
00000030: 6f 75 74 65 72 02 78 0a 69 6e 6e 65 72 0d c8 03 |outer.x.inner...|
00000040: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 |...... .........|
00000050: 01 0c 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 |.............)..|
00000060: 0e 06 2f c8 03 08 00 00 00 07 0e 00 07 0a 00 0c |../.............|
00000070: 43 06 01 ca 03 00 02 00 01 00 01 0d 02 cc 03 01 |C...............|
00000080: 00 60 ce 03 00 00 00 c2 00 cc 63 00 00 bf 0a cb |.`........c.....|
00000090: c8 23 00 00 c8 03 08 00 00 00 09 0a 16 07 0d 00 |.#..............|
000000a0: 0c 43 06 01 ce 03 00 00 00 01 01 00 04 00 cc 03 |.C..............|
000000b0: 00 09 68 00 00 28 c8 03 06 02 04 03 16 11 0d 00 |..h..(..........|
```