# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/for-loop.ts
**生成时间**: 2025-12-11T11:32:28.065Z

## 大小对比

- TypeScript编译器: 146 字节
- WASM编译器: 150 字节
- 差异: -4 字节 (-2.67%)

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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 94
  }
}
```

## 字节级差异

共发现 45 个字节差异:

- 偏移量 0x4c: TS=0x29 vs WASM=0x2d
- 偏移量 0x54: TS=0xff vs WASM=0xec
- 偏移量 0x5a: TS=0xca vs WASM=0xb7
- 偏移量 0x5b: TS=0xde vs WASM=0xcb
- 偏移量 0x5f: TS=0xcd vs WASM=0xba
- 偏移量 0x61: TS=0x6c vs WASM=0xec
- 偏移量 0x62: TS=0x24 vs WASM=0x1c
- 偏移量 0x63: TS=0x00 vs WASM=0x39
- 偏移量 0x64: TS=0x00 vs WASM=0xe6
- 偏移量 0x65: TS=0xff vs WASM=0x00
- 偏移量 0x66: TS=0x17 vs WASM=0x00
- 偏移量 0x74: TS=0xda vs WASM=0x64
- 偏移量 0x75: TS=0x93 vs WASM=0x00
- 偏移量 0x76: TS=0xde vs WASM=0x00
- 偏移量 0x77: TS=0x0e vs WASM=0x93
- 偏移量 0x78: TS=0x6e vs WASM=0x65
- 偏移量 0x79: TS=0xd6 vs WASM=0x00
- 偏移量 0x7a: TS=0xff vs WASM=0x00
- 偏移量 0x7b: TS=0xff vs WASM=0x0e
- 偏移量 0x7c: TS=0xc8 vs WASM=0xee
- ... (显示前20个差异，总共45个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 6f 6e |or-loop.js.i.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 01 00 03 00 00 29 01 ca 03 |. ..........)...|
00000050: 02 00 20 08 ff 02 29 63 00 00 ca de 64 00 00 cd |.. ...)c....d...|
00000060: a5 6c 24 00 00 ff 17 00 43 e7 00 00 00 64 00 00 |.l$.....C....d..|
00000070: 24 01 00 0e da 93 de 0e 6e d6 ff ff c8 03 12 00 |$.......n.......|
00000080: 00 2f 20 2a 04 12 1b 25 0e 1b 0a 25 01 15 10 07 |./ *...%...%....|
00000090: 02 00                                           |..|
```

### WASM
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 6f 6e |or-loop.js.i.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 01 00 03 00 00 2d 01 ca 03 |. ..........-...|
00000050: 02 00 20 08 ec 02 29 63 00 00 b7 cb 64 00 00 ba |.. ...)c....d...|
00000060: a5 ec 1c 39 e6 00 00 00 43 e7 00 00 00 64 00 00 |...9....C....d..|
00000070: 24 01 00 0e 64 00 00 93 65 00 00 0e ee df 06 2f |$...d...e....../|
00000080: c8 03 12 00 00 2f 20 16 04 12 1b 1b 0e 1b 0a 11 |...../ .........|
00000090: 01 15 10 11 02 00                               |......|
```