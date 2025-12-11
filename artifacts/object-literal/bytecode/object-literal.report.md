# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/object-literal.ts
**生成时间**: 2025-12-11T11:32:28.117Z

## 大小对比

- TypeScript编译器: 150 字节
- WASM编译器: 152 字节
- 差异: -2 字节 (-1.32%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 5,
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
    "remaining": 82
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 5,
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
    "remaining": 84
  }
}
```

## 字节级差异

共发现 12 个字节差异:

- 偏移量 0x5f: TS=0xff vs WASM=0xec
- 偏移量 0x63: TS=0xcb vs WASM=0xb8
- 偏移量 0x69: TS=0xcc vs WASM=0xb9
- 偏移量 0x6f: TS=0xf6 vs WASM=0xe3
- 偏移量 0x7a: TS=0x64 vs WASM=0x68
- 偏移量 0x8a: TS=0x0a vs WASM=0x0c
- 偏移量 0x8f: TS=0x25 vs WASM=0x1b
- 偏移量 0x93: TS=0x3e vs WASM=0x11
- 偏移量 0x94: TS=0x01 vs WASM=0x06
- 偏移量 0x95: TS=0x00 vs WASM=0x1b
- 偏移量 0x96: TS=EOF vs WASM=0x07
- 偏移量 0x97: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2e 6a 73 |bject-literal.js|
00000030: 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 |.obj.a.b.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 03 01 00 2a 00 ca 03 00 0d 08 ff |........*.......|
00000060: 02 29 0b cb 4e e6 00 00 00 cc 4e e7 00 00 00 f6 |.)..N.....N.....|
00000070: 39 e8 00 00 00 43 e9 00 00 00 64 00 00 42 e6 00 |9....C....d..B..|
00000080: 00 00 24 01 00 0e 06 2f c8 03 0a 00 00 5d 00 25 |..$..../.....].%|
00000090: 0e 1b 0a 3e 01 00                               |...>..|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2e 6a 73 |bject-literal.js|
00000030: 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 |.obj.a.b.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 03 01 00 2a 00 ca 03 00 0d 08 ec |........*.......|
00000060: 02 29 0b b8 4e e6 00 00 00 b9 4e e7 00 00 00 e3 |.)..N.....N.....|
00000070: 39 e8 00 00 00 43 e9 00 00 00 68 00 00 42 e6 00 |9....C....h..B..|
00000080: 00 00 24 01 00 0e 06 2f c8 03 0c 00 00 5d 00 1b |..$..../.....]..|
00000090: 0e 1b 0a 11 06 1b 07 00                         |........|
```