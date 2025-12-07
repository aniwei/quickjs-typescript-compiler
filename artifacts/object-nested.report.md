# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/object-nested.ts
**生成时间**: 2025-12-07T15:09:16.078Z

## 大小对比

- TypeScript编译器: 279 字节
- WASM编译器: 279 字节
- 差异: 0 字节 (0.00%)

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
    "remaining": 185
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

共发现 0 个字节差异:


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