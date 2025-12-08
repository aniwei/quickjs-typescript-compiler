# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/if-else.ts
**生成时间**: 2025-12-08T14:42:14.928Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 149 字节
- 差异: -4 字节 (-2.68%)

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
    "remaining": 90
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

共发现 49 个字节差异:

- 偏移量 0x4b: TS=0x2a vs WASM=0x2e
- 偏移量 0x5d: TS=0x07 vs WASM=0x09
- 偏移量 0x60: TS=0xe3 vs WASM=0x69
- 偏移量 0x61: TS=0x0e vs WASM=0x00
- 偏移量 0x62: TS=0xee vs WASM=0x00
- 偏移量 0x63: TS=0x05 vs WASM=0x0e
- 偏移量 0x64: TS=0xba vs WASM=0xee
- 偏移量 0x65: TS=0x11 vs WASM=0x07
- 偏移量 0x66: TS=0xe3 vs WASM=0xba
- 偏移量 0x67: TS=0x0e vs WASM=0x11
- 偏移量 0x68: TS=0x39 vs WASM=0x69
- 偏移量 0x69: TS=0xe6 vs WASM=0x00
- 偏移量 0x6b: TS=0x00 vs WASM=0x0e
- 偏移量 0x6c: TS=0x00 vs WASM=0x39
- 偏移量 0x6d: TS=0x43 vs WASM=0xe6
- 偏移量 0x6e: TS=0xe7 vs WASM=0x00
- 偏移量 0x71: TS=0x00 vs WASM=0x43
- 偏移量 0x72: TS=0x68 vs WASM=0xe7
- 偏移量 0x75: TS=0x24 vs WASM=0x00
- 偏移量 0x76: TS=0x01 vs WASM=0x68
- ... (显示前20个差异，总共49个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 66 2d 65 6c 73 65 2e 6a 73 02 61 0e 63 6f 6e 73 |f-else.js.a.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 03 01 00 2a 00 ca 03 00 | ..........*....|
00000050: 09 08 ec 02 29 b8 e3 68 00 00 b7 a7 ec 07 b9 11 |....)..h........|
00000060: e3 0e ee 05 ba 11 e3 0e 39 e6 00 00 00 43 e7 00 |........9....C..|
00000070: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 12 00 00 |..h..$..../.....|
00000080: 21 08 16 04 12 03 23 00 18 07 1b 0e 1b 0a 11 01 |!.....#.........|
00000090: 00                                              |.|
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