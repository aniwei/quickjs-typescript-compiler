# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/while.ts
**生成时间**: 2025-12-08T15:56:10.299Z

## 大小对比

- TypeScript编译器: 137 字节
- WASM编译器: 143 字节
- 差异: -6 字节 (-4.20%)

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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/while.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 41
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 84
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/while.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 41
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 90
  }
}
```

## 字节级差异

共发现 36 个字节差异:

- 偏移量 0x49: TS=0x26 vs WASM=0x2a
- 偏移量 0x5b: TS=0x18 vs WASM=0x1c
- 偏移量 0x6d: TS=0xdf vs WASM=0x68
- 偏移量 0x6e: TS=0x93 vs WASM=0x00
- 偏移量 0x6f: TS=0xe3 vs WASM=0x00
- 偏移量 0x70: TS=0x0e vs WASM=0x93
- 偏移量 0x71: TS=0xee vs WASM=0x69
- 偏移量 0x72: TS=0xe3 vs WASM=0x00
- 偏移量 0x73: TS=0x06 vs WASM=0x00
- 偏移量 0x74: TS=0x2f vs WASM=0x0e
- 偏移量 0x75: TS=0xc8 vs WASM=0xee
- 偏移量 0x76: TS=0x03 vs WASM=0xdf
- 偏移量 0x77: TS=0x10 vs WASM=0x06
- 偏移量 0x78: TS=0x00 vs WASM=0x2f
- 偏移量 0x79: TS=0x00 vs WASM=0xc8
- 偏移量 0x7a: TS=0x21 vs WASM=0x03
- 偏移量 0x7b: TS=0x07 vs WASM=0x12
- 偏移量 0x7c: TS=0x16 vs WASM=0x00
- 偏移量 0x7d: TS=0x02 vs WASM=0x00
- 偏移量 0x7e: TS=0x12 vs WASM=0x21
- ... (显示前20个差异，总共36个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 48 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..H__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 77 |piler/fixtures/w|
00000020: 68 69 6c 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c |hile.js.i.consol|
00000030: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000040: 01 a4 01 00 00 00 03 01 00 26 00 ca 03 00 09 08 |.........&......|
00000050: ec 02 29 b7 e3 68 00 00 ba a5 ec 18 39 e6 00 00 |..)..h......9...|
00000060: 00 43 e7 00 00 00 68 00 00 24 01 00 0e df 93 e3 |.C....h..$......|
00000070: 0e ee e3 06 2f c8 03 10 00 00 21 07 16 02 12 7b |..../.....!....{|
00000080: 1b 07 1b 05 11 7f 17 75 00                      |.......u.|
```

### WASM
```
00000000: 05 04 48 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..H__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 77 |piler/fixtures/w|
00000020: 68 69 6c 65 2e 6a 73 02 69 0e 63 6f 6e 73 6f 6c |hile.js.i.consol|
00000030: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000040: 01 a4 01 00 00 00 03 01 00 2a 00 ca 03 00 09 08 |.........*......|
00000050: ec 02 29 b7 e3 68 00 00 ba a5 ec 1c 39 e6 00 00 |..)..h......9...|
00000060: 00 43 e7 00 00 00 68 00 00 24 01 00 0e 68 00 00 |.C....h..$...h..|
00000070: 93 69 00 00 0e ee df 06 2f c8 03 12 00 00 21 0e |.i....../.....!.|
00000080: 16 04 12 09 1b 0e 1b 0a 11 01 17 15 11 02 00    |...............|
```