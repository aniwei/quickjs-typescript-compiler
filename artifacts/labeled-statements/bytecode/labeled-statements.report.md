# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/labeled-statements.ts
**生成时间**: 2025-12-09T14:28:02.741Z

## 大小对比

- TypeScript编译器: 240 字节
- WASM编译器: 252 字节
- 差异: -12 字节 (-4.76%)

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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/labeled-statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 172
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/labeled-statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "j",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 184
  }
}
```

## 字节级差异

共发现 74 个字节差异:

- 偏移量 0x58: TS=0x5a vs WASM=0x62
- 偏移量 0x62: TS=0x00 vs WASM=0x01
- 偏移量 0x73: TS=0x49 vs WASM=0x51
- 偏移量 0x7f: TS=0x37 vs WASM=0x3b
- 偏移量 0x8d: TS=0x29 vs WASM=0x2d
- 偏移量 0x9b: TS=0x1b vs WASM=0x1f
- 偏移量 0xb0: TS=0xc8 vs WASM=0x64
- 偏移量 0xb1: TS=0x93 vs WASM=0x01
- 偏移量 0xb2: TS=0xcc vs WASM=0x00
- 偏移量 0xb3: TS=0x0e vs WASM=0x93
- 偏移量 0xb4: TS=0xee vs WASM=0x65
- 偏移量 0xb5: TS=0xc4 vs WASM=0x01
- 偏移量 0xb6: TS=0xc7 vs WASM=0x00
- 偏移量 0xb7: TS=0x93 vs WASM=0x0e
- 偏移量 0xb8: TS=0xcb vs WASM=0xee
- 偏移量 0xb9: TS=0x0e vs WASM=0xc0
- 偏移量 0xba: TS=0xee vs WASM=0x64
- 偏移量 0xbb: TS=0xb2 vs WASM=0x00
- 偏移量 0xbc: TS=0x06 vs WASM=0x00
- 偏移量 0xbd: TS=0x2f vs WASM=0x93
- ... (显示前20个差异，总共74个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 61 62 65 6c 65 64 2d 73 74 61 74 65 6d 65 6e 74 |abeled-statement|
00000030: 73 2e 6a 73 02 69 02 6a 0e 63 6f 6e 73 6f 6c 65 |s.js.i.j.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 02 00 04 00 00 5a 02 ca 03 02 00 20 cc |........Z..... .|
00000060: 03 04 00 20 08 ec 02 29 63 00 00 b7 cb 64 00 00 |... ...)c....d..|
00000070: ba a5 ec 49 63 01 00 b7 cc 64 01 00 ba a5 ec 37 |...Ic....d.....7|
00000080: 64 00 00 b8 ad ec 08 64 01 00 b8 ad ed 29 64 00 |d......d.....)d.|
00000090: 00 b9 ad ec 08 64 01 00 b9 ad ed 1b 39 e7 00 00 |.....d......9...|
000000a0: 00 43 e8 00 00 00 64 00 00 64 01 00 24 02 00 0e |.C....d..d..$...|
000000b0: c8 93 cc 0e ee c4 c7 93 cb 0e ee b2 06 2f c8 03 |............./..|
000000c0: 2e 00 00 2f 2e 16 04 2b 04 16 04 12 21 16 04 12 |.../...+....!...|
000000d0: 04 16 04 00 03 08 0b 16 04 12 04 16 04 00 03 08 |................|
000000e0: 13 34 18 11 06 00 07 15 16 07 02 1a 09 07 02 00 |.4..............|
```

### WASM
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 61 62 65 6c 65 64 2d 73 74 61 74 65 6d 65 6e 74 |abeled-statement|
00000030: 73 2e 6a 73 02 69 02 6a 0e 63 6f 6e 73 6f 6c 65 |s.js.i.j.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 02 00 04 00 00 62 02 ca 03 02 00 20 cc |........b..... .|
00000060: 03 04 01 20 08 ec 02 29 63 00 00 b7 cb 64 00 00 |... ...)c....d..|
00000070: ba a5 ec 51 63 01 00 b7 cc 64 01 00 ba a5 ec 3b |...Qc....d.....;|
00000080: 64 00 00 b8 ad ec 08 64 01 00 b8 ad ed 2d 64 00 |d......d.....-d.|
00000090: 00 b9 ad ec 08 64 01 00 b9 ad ed 1f 39 e7 00 00 |.....d......9...|
000000a0: 00 43 e8 00 00 00 64 00 00 64 01 00 24 02 00 0e |.C....d..d..$...|
000000b0: 64 01 00 93 65 01 00 0e ee c0 64 00 00 93 65 00 |d...e.....d...e.|
000000c0: 00 0e ee aa 06 2f c8 03 32 00 00 2f 2e 16 04 2b |...../..2../...+|
000000d0: 04 16 04 12 21 16 04 12 04 16 04 00 03 08 0b 16 |....!...........|
000000e0: 04 12 04 16 04 00 03 08 13 1b 0e 1b 0a 11 06 11 |................|
000000f0: 07 00 04 15 1e 11 02 24 09 11 02 00             |.......$....|
```