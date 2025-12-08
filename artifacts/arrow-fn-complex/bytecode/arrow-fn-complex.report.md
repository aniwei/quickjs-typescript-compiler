# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-complex.ts
**生成时间**: 2025-12-08T15:56:10.034Z

## 大小对比

- TypeScript编译器: 227 字节
- WASM编译器: 227 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 72
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 153
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 72
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 153
  }
}
```

## 字节级差异

共发现 16 个字节差异:

- 偏移量 0x8c: TS=0x07 vs WASM=0x0e
- 偏移量 0x8f: TS=0x07 vs WASM=0x0e
- 偏移量 0x91: TS=0x05 vs WASM=0x0a
- 偏移量 0x93: TS=0x07 vs WASM=0x0e
- 偏移量 0x95: TS=0x78 vs WASM=0x0f
- 偏移量 0xcd: TS=0x78 vs WASM=0x0f
- 偏移量 0xcf: TS=0x04 vs WASM=0x08
- 偏移量 0xd1: TS=0x7e vs WASM=0x03
- 偏移量 0xd3: TS=0x05 vs WASM=0x0a
- 偏移量 0xd5: TS=0x04 vs WASM=0x08
- 偏移量 0xd7: TS=0x7e vs WASM=0x03
- 偏移量 0xd9: TS=0x77 vs WASM=0x11
- 偏移量 0xdb: TS=0x03 vs WASM=0x06
- 偏移量 0xdd: TS=0x04 vs WASM=0x08
- 偏移量 0xdf: TS=0x7e vs WASM=0x03
- 偏移量 0xe1: TS=0x77 vs WASM=0x11

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 63 6f 6d 70 6c 65 78 2e |rrow-fn-complex.|
00000030: 6a 73 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |js.complex.conso|
00000040: 6c 65 06 6c 6f 67 02 78 02 79 0d c8 03 00 00 00 |le.log.x.y......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 01 01 21 00 |... ..........!.|
00000060: ca 03 00 0d 08 ec 02 29 c2 00 4f e5 00 00 00 e3 |.......)..O.....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 00 00 bc f1 24 |9....C....h....$|
00000080: 01 00 0e 06 2f c8 03 0e 00 00 00 0c 07 00 1b 07 |..../...........|
00000090: 1b 05 16 07 07 78 00 0c 02 06 01 00 01 01 01 02 |.....x..........|
000000a0: 00 00 19 02 d0 03 00 01 00 d2 03 01 00 30 63 00 |.............0c.|
000000b0: 00 bf 0a cb d3 64 00 00 a7 ec 07 d3 64 00 00 a0 |.....d......d...|
000000c0: 28 64 00 00 d3 a0 28 c8 03 18 00 10 22 78 07 04 |(d....(....."x..|
000000d0: 11 7e 12 05 07 04 11 7e 07 77 09 03 11 04 07 7e |.~.....~.w.....~|
000000e0: 07 77 00                                        |.w.|
```

### WASM
```
00000000: 05 06 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 63 6f 6d 70 6c 65 78 2e |rrow-fn-complex.|
00000030: 6a 73 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |js.complex.conso|
00000040: 6c 65 06 6c 6f 67 02 78 02 79 0d c8 03 00 00 00 |le.log.x.y......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 01 01 21 00 |... ..........!.|
00000060: ca 03 00 0d 08 ec 02 29 c2 00 4f e5 00 00 00 e3 |.......)..O.....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 00 00 bc f1 24 |9....C....h....$|
00000080: 01 00 0e 06 2f c8 03 0e 00 00 00 0c 0e 00 1b 0e |..../...........|
00000090: 1b 0a 16 0e 07 0f 00 0c 02 06 01 00 01 01 01 02 |................|
000000a0: 00 00 19 02 d0 03 00 01 00 d2 03 01 00 30 63 00 |.............0c.|
000000b0: 00 bf 0a cb d3 64 00 00 a7 ec 07 d3 64 00 00 a0 |.....d......d...|
000000c0: 28 64 00 00 d3 a0 28 c8 03 18 00 10 22 0f 07 08 |(d....(....."...|
000000d0: 11 03 12 0a 07 08 11 03 07 11 09 06 11 08 07 03 |................|
000000e0: 07 11 00                                        |...|
```