# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/numeric-separators.ts
**生成时间**: 2025-12-09T14:18:29.622Z

## 大小对比

- TypeScript编译器: 304 字节
- WASM编译器: 266 字节
- 差异: 38 字节 (14.29%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/numeric-separators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "decimal",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "binary",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "hex",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "octal",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "big",
      "offset": 77
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "bigHex",
      "offset": 81
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 88
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xd",
    "remaining": 204
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/numeric-separators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "decimal",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "binary",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "hex",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "octal",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "big",
      "offset": 77
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "bigHex",
      "offset": 81
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 88
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 100,
    "tag": "0xd",
    "remaining": 166
  }
}
```

## 字节级差异

共发现 137 个字节差异:

- 偏移量 0x75: TS=0x07 vs WASM=0x06
- 偏移量 0x77: TS=0x04 vs WASM=0x00
- 偏移量 0x78: TS=0x50 vs WASM=0x58
- 偏移量 0x96: TS=0xc1 vs WASM=0x01
- 偏移量 0x97: TS=0x00 vs WASM=0x40
- 偏移量 0x98: TS=0xe3 vs WASM=0x42
- 偏移量 0x99: TS=0xc1 vs WASM=0x0f
- 偏移量 0x9a: TS=0x01 vs WASM=0x00
- 偏移量 0x9b: TS=0xe4 vs WASM=0xe3
- 偏移量 0x9c: TS=0xc1 vs WASM=0xc0
- 偏移量 0x9d: TS=0x02 vs WASM=0xaa
- 偏移量 0x9e: TS=0xe5 vs WASM=0x00
- 偏移量 0x9f: TS=0xc1 vs WASM=0xe4
- 偏移量 0xa0: TS=0x03 vs WASM=0x01
- 偏移量 0xa1: TS=0xe6 vs WASM=0xff
- 偏移量 0xa2: TS=0xb4 vs WASM=0xff
- 偏移量 0xa3: TS=0x15 vs WASM=0x00
- 偏移量 0xa4: TS=0xcd vs WASM=0x00
- 偏移量 0xa5: TS=0x5b vs WASM=0xe5
- 偏移量 0xa6: TS=0x07 vs WASM=0xc0
- ... (显示前20个差异，总共137个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 75 6d 65 72 69 63 2d 73 65 70 61 72 61 74 6f 72 |umeric-separator|
00000030: 73 2e 6a 73 0e 64 65 63 69 6d 61 6c 0c 62 69 6e |s.js.decimal.bin|
00000040: 61 72 79 06 68 65 78 0a 6f 63 74 61 6c 06 62 69 |ary.hex.octal.bi|
00000050: 67 0c 62 69 67 48 65 78 0e 63 6f 6e 73 6f 6c 65 |g.bigHex.console|
00000060: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000070: a4 01 00 00 00 07 06 04 50 00 ca 03 00 0d cc 03 |........P.......|
00000080: 01 0d ce 03 02 0d d0 03 03 0d d2 03 04 0d d4 03 |................|
00000090: 05 0d 08 ec 02 29 c1 00 e3 c1 01 e4 c1 02 e5 c1 |.....)..........|
000000a0: 03 e6 b4 15 cd 5b 07 61 04 00 b4 ff 01 00 00 61 |.....[.a.......a|
000000b0: 05 00 39 eb 00 00 00 43 ec 00 00 00 68 00 00 68 |..9....C....h..h|
000000c0: 01 00 68 02 00 68 03 00 24 04 00 0e 39 eb 00 00 |..h..h..$...9...|
000000d0: 00 43 ec 00 00 00 68 04 00 68 05 00 24 02 00 0e |.C....h..h..$...|
000000e0: 06 2f c8 03 26 00 00 16 20 12 01 12 05 12 04 12 |./..&... .......|
000000f0: 03 2b 06 2b 1d 1b 0e 1b 0a 11 12 11 10 11 0a 11 |.+.+............|
00000100: 2d 17 15 1b 0e 1b 0a 11 0a 11 0b 00 06 00 00 00 |-...............|
00000110: 00 80 84 2e 41 06 00 00 00 00 00 40 65 40 06 00 |....A......@e@..|
00000120: 00 00 00 e0 ff ef 40 06 00 00 00 00 00 f0 7f 40 |......@........@|
```

### WASM
```
00000000: 05 09 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 75 6d 65 72 69 63 2d 73 65 70 61 72 61 74 6f 72 |umeric-separator|
00000030: 73 2e 6a 73 0e 64 65 63 69 6d 61 6c 0c 62 69 6e |s.js.decimal.bin|
00000040: 61 72 79 06 68 65 78 0a 6f 63 74 61 6c 06 62 69 |ary.hex.octal.bi|
00000050: 67 0c 62 69 67 48 65 78 0e 63 6f 6e 73 6f 6c 65 |g.bigHex.console|
00000060: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000070: a4 01 00 00 00 06 06 00 58 00 ca 03 00 0d cc 03 |........X.......|
00000080: 01 0d ce 03 02 0d d0 03 03 0d d2 03 04 0d d4 03 |................|
00000090: 05 0d 08 ec 02 29 01 40 42 0f 00 e3 c0 aa 00 e4 |.....).@B.......|
000000a0: 01 ff ff 00 00 e5 c0 ff 01 e6 b4 15 cd 5b 07 61 |.............[.a|
000000b0: 04 00 b4 ff 01 00 00 61 05 00 39 eb 00 00 00 43 |.......a..9....C|
000000c0: ec 00 00 00 68 00 00 68 01 00 68 02 00 68 03 00 |....h..h..h..h..|
000000d0: 24 04 00 0e 39 eb 00 00 00 43 ec 00 00 00 68 04 |$...9....C....h.|
000000e0: 00 68 05 00 24 02 00 0e 06 2f c8 03 1c 00 00 00 |.h..$..../......|
000000f0: 28 0c 00 1b 0e 1b 0a 11 12 11 10 11 0a 11 2d 17 |(.............-.|
00000100: 15 1b 0e 1b 0a 11 0a 11 0b 00                   |..........|
```