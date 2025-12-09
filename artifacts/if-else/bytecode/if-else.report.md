# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/if-else.ts
**生成时间**: 2025-12-09T08:59:51.511Z

## 大小对比

- TypeScript编译器: 149 字节
- WASM编译器: 149 字节
- 差异: 0 字节 (0.00%)

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
    "remaining": 94
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

共发现 35 个字节差异:

- 偏移量 0x53: TS=0x2a vs WASM=0x02
- 偏移量 0x54: TS=0xb8 vs WASM=0x29
- 偏移量 0x55: TS=0xe3 vs WASM=0xb8
- 偏移量 0x56: TS=0x68 vs WASM=0xe3
- 偏移量 0x57: TS=0x00 vs WASM=0x68
- 偏移量 0x59: TS=0xb7 vs WASM=0x00
- 偏移量 0x5a: TS=0xa7 vs WASM=0xb7
- 偏移量 0x5b: TS=0xec vs WASM=0xa7
- 偏移量 0x5c: TS=0x09 vs WASM=0xec
- 偏移量 0x5d: TS=0xb9 vs WASM=0x09
- 偏移量 0x5e: TS=0x11 vs WASM=0xb9
- 偏移量 0x5f: TS=0x69 vs WASM=0x11
- 偏移量 0x60: TS=0x00 vs WASM=0x69
- 偏移量 0x62: TS=0x0e vs WASM=0x00
- 偏移量 0x63: TS=0xee vs WASM=0x0e
- 偏移量 0x64: TS=0x07 vs WASM=0xee
- 偏移量 0x65: TS=0xba vs WASM=0x07
- 偏移量 0x66: TS=0x11 vs WASM=0xba
- 偏移量 0x67: TS=0x69 vs WASM=0x11
- 偏移量 0x68: TS=0x00 vs WASM=0x69
- ... (显示前20个差异，总共35个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 66 2d 65 6c 73 65 2e 6a 73 02 61 0e 63 6f 6e 73 |f-else.js.a.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 03 01 00 2e 00 ca 03 00 | ...............|
00000050: 09 08 ec 2a b8 e3 68 00 00 b7 a7 ec 09 b9 11 69 |...*..h........i|
00000060: 00 00 0e ee 07 ba 11 69 00 00 0e 39 e6 00 00 00 |.......i...9....|
00000070: 43 e7 00 00 00 68 00 00 24 01 00 0e 29 06 2f c8 |C....h..$...)./.|
00000080: 03 12 00 00 1c 08 16 04 12 03 2d 00 22 07 1b 0e |..........-."...|
00000090: 1b 0a 11 01 00                                  |.....|
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