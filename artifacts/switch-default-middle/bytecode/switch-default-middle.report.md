# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-default-middle.ts
**生成时间**: 2025-12-09T08:59:51.581Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 190 字节
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 121
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 52 个字节差异:

- 偏移量 0x61: TS=0x41 vs WASM=0x02
- 偏移量 0x62: TS=0xb7 vs WASM=0x29
- 偏移量 0x63: TS=0xe3 vs WASM=0xb7
- 偏移量 0x64: TS=0x68 vs WASM=0xe3
- 偏移量 0x65: TS=0x00 vs WASM=0x68
- 偏移量 0x67: TS=0x11 vs WASM=0x00
- 偏移量 0x68: TS=0xb7 vs WASM=0x11
- 偏移量 0x69: TS=0xad vs WASM=0xb7
- 偏移量 0x6a: TS=0xec vs WASM=0xad
- 偏移量 0x6b: TS=0x21 vs WASM=0xec
- 偏移量 0x6c: TS=0x39 vs WASM=0x21
- 偏移量 0x6d: TS=0xe6 vs WASM=0x39
- 偏移量 0x6e: TS=0x00 vs WASM=0xe6
- 偏移量 0x71: TS=0x43 vs WASM=0x00
- 偏移量 0x72: TS=0xe7 vs WASM=0x43
- 偏移量 0x73: TS=0x00 vs WASM=0xe7
- 偏移量 0x76: TS=0xb7 vs WASM=0x00
- 偏移量 0x77: TS=0x24 vs WASM=0xb7
- 偏移量 0x78: TS=0x01 vs WASM=0x24
- 偏移量 0x79: TS=0x00 vs WASM=0x01
- ... (显示前20个差异，总共52个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 64 65 66 61 75 6c 74 2d 6d 69 |witch-default-mi|
00000030: 64 64 6c 65 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c |ddle.js.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 01 00 45 00 ca 03 00 09 08 |.........E......|
00000060: ec 41 b7 e3 68 00 00 11 b7 ad ec 21 39 e6 00 00 |.A..h......!9...|
00000070: 00 43 e7 00 00 00 b7 24 01 00 0e 39 e6 00 00 00 |.C.....$...9....|
00000080: 43 e7 00 00 00 b9 24 01 00 0e ee 06 11 b8 ad ec |C.....$.........|
00000090: eb 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 0e |.9....C.....$...|
000000a0: 0e 29 06 2f c8 03 16 00 00 1c 10 2c 00 1b 0e 20 |.)./.......,... |
000000b0: 08 18 15 1b 0e 20 08 3b 15 1b 0e 20 08 00       |..... .;... ..|
```

### WASM
```
00000000: 05 04 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 64 65 66 61 75 6c 74 2d 6d 69 |witch-default-mi|
00000030: 64 64 6c 65 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c |ddle.js.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 01 00 45 00 ca 03 00 09 08 |.........E......|
00000060: ec 02 29 b7 e3 68 00 00 11 b7 ad ec 21 39 e6 00 |..)..h......!9..|
00000070: 00 00 43 e7 00 00 00 b7 24 01 00 0e 39 e6 00 00 |..C.....$...9...|
00000080: 00 43 e7 00 00 00 b9 24 01 00 0e ee 06 11 b8 ad |.C.....$........|
00000090: ec eb 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 |..9....C.....$..|
000000a0: 0e 0e 06 2f c8 03 16 00 00 21 10 2c 00 1b 0e 20 |.../.....!.,... |
000000b0: 08 18 15 1b 0e 20 08 3b 15 1b 0e 20 08 00       |..... .;... ..|
```