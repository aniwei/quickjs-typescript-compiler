# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/object-nested.ts
**生成时间**: 2025-12-11T11:32:28.126Z

## 大小对比

- TypeScript编译器: 269 字节
- WASM编译器: 279 字节
- 差异: -10 字节 (-3.58%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "id",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Alice",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bob",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "users",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "page",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 76
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 82
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 94,
    "tag": "0xd",
    "remaining": 175
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "id",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Alice",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bob",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "users",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "page",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 76
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 82
    },
    {
      "index": 9,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 94,
    "tag": "0xd",
    "remaining": 185
  }
}
```

## 字节级差异

共发现 31 个字节差异:

- 偏移量 0x79: TS=0xff vs WASM=0xec
- 偏移量 0x7e: TS=0xcb vs WASM=0xb8
- 偏移量 0x8f: TS=0xcc vs WASM=0xb9
- 偏移量 0xa8: TS=0xcb vs WASM=0xb8
- 偏移量 0xae: TS=0xd2 vs WASM=0xbf
- 偏移量 0xba: TS=0xf6 vs WASM=0xe3
- 偏移量 0xc5: TS=0x64 vs WASM=0x68
- 偏移量 0xcd: TS=0xca vs WASM=0xb7
- 偏移量 0xe2: TS=0x64 vs WASM=0x68
- 偏移量 0xf7: TS=0x14 vs WASM=0x1e
- 偏移量 0xfe: TS=0x25 vs WASM=0x1b
- 偏移量 0x102: TS=0x61 vs WASM=0x11
- 偏移量 0x103: TS=0x01 vs WASM=0x08
- 偏移量 0x104: TS=0x17 vs WASM=0x20
- 偏移量 0x105: TS=0x15 vs WASM=0x0c
- 偏移量 0x106: TS=0x25 vs WASM=0x07
- 偏移量 0x107: TS=0x0e vs WASM=0x06
- 偏移量 0x109: TS=0x0a vs WASM=0x1b
- 偏移量 0x10a: TS=0x57 vs WASM=0x17
- 偏移量 0x10b: TS=0x01 vs WASM=0x15
- ... (显示前20个差异，总共31个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6e 65 73 74 65 64 2e 6a 73 08 |bject-nested.js.|
00000030: 64 61 74 61 04 69 64 0a 41 6c 69 63 65 06 42 6f |data.id.Alice.Bo|
00000040: 62 0a 75 73 65 72 73 08 70 61 67 65 0a 74 6f 74 |b.users.page.tot|
00000050: 61 6c 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |al.console.log..|
00000060: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 |....... ........|
00000070: 01 00 7d 00 ca 03 00 0d 08 ff 02 29 0b 0b cb 4e |..}........)...N|
00000080: e6 00 00 00 04 e7 00 00 00 4e 38 00 00 00 0b cc |.........N8.....|
00000090: 4e e6 00 00 00 04 e8 00 00 00 4e 38 00 00 00 26 |N.........N8...&|
000000a0: 02 00 4e e9 00 00 00 0b cb 4e ea 00 00 00 d2 64 |..N......N.....d|
000000b0: 4e eb 00 00 00 4e 7d 00 00 00 f6 39 ec 00 00 00 |N....N}....9....|
000000c0: 43 ed 00 00 00 64 00 00 42 e9 00 00 00 ca 48 42 |C....d..B.....HB|
000000d0: 38 00 00 00 24 01 00 0e 39 ec 00 00 00 43 ed 00 |8...$...9....C..|
000000e0: 00 00 64 00 00 42 7d 00 00 00 42 eb 00 00 00 24 |..d..B}...B....$|
000000f0: 01 00 0e 06 2f c8 03 14 00 00 00 43 14 00 25 0e |..../......C..%.|
00000100: 1b 0a 61 01 17 15 25 0e 1b 0a 57 01 00          |..a...%...W..|
```

### WASM
```
00000000: 05 0a 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6e 65 73 74 65 64 2e 6a 73 08 |bject-nested.js.|
00000030: 64 61 74 61 04 69 64 0a 41 6c 69 63 65 06 42 6f |data.id.Alice.Bo|
00000040: 62 0a 75 73 65 72 73 08 70 61 67 65 0a 74 6f 74 |b.users.page.tot|
00000050: 61 6c 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |al.console.log..|
00000060: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 |....... ........|
00000070: 01 00 7d 00 ca 03 00 0d 08 ec 02 29 0b 0b b8 4e |..}........)...N|
00000080: e6 00 00 00 04 e7 00 00 00 4e 38 00 00 00 0b b9 |.........N8.....|
00000090: 4e e6 00 00 00 04 e8 00 00 00 4e 38 00 00 00 26 |N.........N8...&|
000000a0: 02 00 4e e9 00 00 00 0b b8 4e ea 00 00 00 bf 64 |..N......N.....d|
000000b0: 4e eb 00 00 00 4e 7d 00 00 00 e3 39 ec 00 00 00 |N....N}....9....|
000000c0: 43 ed 00 00 00 68 00 00 42 e9 00 00 00 b7 48 42 |C....h..B.....HB|
000000d0: 38 00 00 00 24 01 00 0e 39 ec 00 00 00 43 ed 00 |8...$...9....C..|
000000e0: 00 00 68 00 00 42 7d 00 00 00 42 eb 00 00 00 24 |..h..B}...B....$|
000000f0: 01 00 0e 06 2f c8 03 1e 00 00 00 43 14 00 1b 0e |..../......C....|
00000100: 1b 0a 11 08 20 0c 07 06 1b 1b 17 15 1b 0e 1b 0a |.... ...........|
00000110: 11 08 1b 0a 1b 13 00                            |.......|
```