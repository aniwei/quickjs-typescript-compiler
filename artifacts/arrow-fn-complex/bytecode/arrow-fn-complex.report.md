# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/arrow-fn-complex.ts
**生成时间**: 2025-12-11T11:32:27.910Z

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

共发现 27 个字节差异:

- 偏移量 0x65: TS=0xff vs WASM=0xec
- 偏移量 0x68: TS=0xd5 vs WASM=0xc2
- 偏移量 0x6f: TS=0xf6 vs WASM=0xe3
- 偏移量 0x7a: TS=0x64 vs WASM=0x68
- 偏移量 0x7d: TS=0xcf vs WASM=0xbc
- 偏移量 0x7e: TS=0x04 vs WASM=0xf1
- 偏移量 0x8e: TS=0x25 vs WASM=0x1b
- 偏移量 0x92: TS=0x2a vs WASM=0x16
- 偏移量 0xb1: TS=0xd2 vs WASM=0xbf
- 偏移量 0xb3: TS=0xde vs WASM=0xcb
- 偏移量 0xb9: TS=0x6c vs WASM=0xec
- 偏移量 0xba: TS=0x14 vs WASM=0x07
- 偏移量 0xbb: TS=0x00 vs WASM=0xd3
- 偏移量 0xbc: TS=0x00 vs WASM=0x64
- 偏移量 0xbe: TS=0xd3 vs WASM=0x00
- 偏移量 0xbf: TS=0x64 vs WASM=0xa0
- 偏移量 0xc0: TS=0x00 vs WASM=0x28
- 偏移量 0xc1: TS=0x00 vs WASM=0x64
- 偏移量 0xc2: TS=0xa0 vs WASM=0x00
- 偏移量 0xc3: TS=0xff vs WASM=0x00
- ... (显示前20个差异，总共27个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 63 6f 6d 70 6c 65 78 2e |rrow-fn-complex.|
00000030: 6a 73 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |js.complex.conso|
00000040: 6c 65 06 6c 6f 67 02 78 02 79 0d c8 03 00 00 00 |le.log.x.y......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 01 01 21 00 |... ..........!.|
00000060: ca 03 00 0d 08 ff 02 29 d5 00 4f e5 00 00 00 f6 |.......)..O.....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 64 00 00 cf 04 24 |9....C....d....$|
00000080: 01 00 0e 06 2f c8 03 0e 00 00 00 0c 0e 00 25 0e |..../.........%.|
00000090: 1b 0a 2a 0e 07 0f 00 0c 02 06 01 00 01 01 01 02 |..*.............|
000000a0: 00 00 19 02 d0 03 00 01 00 d2 03 01 00 30 63 00 |.............0c.|
000000b0: 00 d2 0a de d3 64 00 00 a7 6c 14 00 00 00 d3 64 |.....d...l.....d|
000000c0: 00 00 a0 ff 00 a0 28 c8 03 18 00 10 22 0f 25 08 |......(.....".%.|
000000d0: 25 03 12 0a 25 08 25 03 07 11 09 06 25 08 25 03 |%...%.%.....%.%.|
000000e0: 07 11 00                                        |...|
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