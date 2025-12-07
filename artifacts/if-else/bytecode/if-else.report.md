# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/if-else.ts
**生成时间**: 2025-12-07T12:00:30.338Z

## 大小对比

- TypeScript编译器: 147 字节
- WASM编译器: 149 字节
- 差异: -2 字节 (-1.34%)

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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/if-else.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 43
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 92
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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/if-else.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 43
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 94
  }
}
```

## 字节级差异

共发现 13 个字节差异:

- 偏移量 0x81: TS=0x10 vs WASM=0x12
- 偏移量 0x88: TS=0x00 vs WASM=0x12
- 偏移量 0x89: TS=0x11 vs WASM=0x03
- 偏移量 0x8a: TS=0x0c vs WASM=0x2d
- 偏移量 0x8b: TS=0x0b vs WASM=0x00
- 偏移量 0x8c: TS=0x1b vs WASM=0x22
- 偏移量 0x8d: TS=0x0e vs WASM=0x07
- 偏移量 0x8f: TS=0x0a vs WASM=0x0e
- 偏移量 0x90: TS=0x11 vs WASM=0x1b
- 偏移量 0x91: TS=0x01 vs WASM=0x0a
- 偏移量 0x92: TS=0x00 vs WASM=0x11
- 偏移量 0x93: TS=EOF vs WASM=0x01
- 偏移量 0x94: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 66 2d 65 6c 73 65 2e 6a 73 02 61 0e 63 6f 6e 73 |f-else.js.a.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 03 01 00 2e 00 ca 03 00 | ...............|
00000050: 09 08 ec 02 29 b8 e3 68 00 00 b7 a7 ec 09 b9 11 |....)..h........|
00000060: 69 00 00 0e ee 07 ba 11 69 00 00 0e 39 e6 00 00 |i.......i...9...|
00000070: 00 43 e7 00 00 00 68 00 00 24 01 00 0e 06 2f c8 |.C....h..$..../.|
00000080: 03 10 00 00 21 08 16 04 00 11 0c 0b 1b 0e 1b 0a |....!...........|
00000090: 11 01 00                                        |...|
```

### WASM
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 66 2d 65 6c 73 65 2e 6a 73 02 61 0e 63 6f 6e 73 |f-else.js.a.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 03 01 00 2e 00 ca 03 00 | ...............|
00000050: 09 08 ec 02 29 b8 e3 68 00 00 b7 a7 ec 09 b9 11 |....)..h........|
00000060: 69 00 00 0e ee 07 ba 11 69 00 00 0e 39 e6 00 00 |i.......i...9...|
00000070: 00 43 e7 00 00 00 68 00 00 24 01 00 0e 06 2f c8 |.C....h..$..../.|
00000080: 03 12 00 00 21 08 16 04 12 03 2d 00 22 07 1b 0e |....!.....-."...|
00000090: 1b 0a 11 01 00                                  |.....|
```