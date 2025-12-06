# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-literal-shorthand.ts
**生成时间**: 2025-12-06T02:09:56.459Z

## 大小对比

- TypeScript编译器: 159 字节
- WASM编译器: 161 字节
- 差异: -2 字节 (-1.24%)

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
      "rawLength": 110,
      "actualLength": 55,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal-shorthand.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "shorthandValue",
      "offset": 58
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shorthandInfo",
      "offset": 73
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 87
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 63
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
      "rawLength": 110,
      "actualLength": 55,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal-shorthand.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "shorthandValue",
      "offset": 58
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shorthandInfo",
      "offset": 73
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 87
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 96,
    "tag": "0xd",
    "remaining": 65
  }
}
```

## 字节级差异

共发现 25 个字节差异:

- 偏移量 0x71: TS=0x03 vs WASM=0x02
- 偏移量 0x74: TS=0x18 vs WASM=0x1d
- 偏移量 0x82: TS=0x01 vs WASM=0xbf
- 偏移量 0x84: TS=0x00 vs WASM=0xe3
- 偏移量 0x85: TS=0x00 vs WASM=0x0b
- 偏移量 0x86: TS=0x00 vs WASM=0x68
- 偏移量 0x87: TS=0xe3 vs WASM=0x00
- 偏移量 0x88: TS=0x0b vs WASM=0x00
- 偏移量 0x89: TS=0x04 vs WASM=0x4e
- 偏移量 0x8a: TS=0xe7 vs WASM=0xe5
- 偏移量 0x8e: TS=0x4e vs WASM=0x04
- 偏移量 0x8f: TS=0xe8 vs WASM=0xe7
- 偏移量 0x93: TS=0xe4 vs WASM=0x4e
- 偏移量 0x94: TS=0x06 vs WASM=0xe8
- 偏移量 0x95: TS=0x2f vs WASM=0x00
- 偏移量 0x96: TS=0xc8 vs WASM=0x00
- 偏移量 0x97: TS=0x03 vs WASM=0x00
- 偏移量 0x98: TS=0x00 vs WASM=0xe4
- 偏移量 0x99: TS=0x04 vs WASM=0x06
- 偏移量 0x9a: TS=0x16 vs WASM=0x2f
- ... (显示前20个差异，总共25个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 6e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..n__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2d 73 68 |bject-literal-sh|
00000030: 6f 72 74 68 61 6e 64 2e 6a 73 1c 73 68 6f 72 74 |orthand.js.short|
00000040: 68 61 6e 64 56 61 6c 75 65 1a 73 68 6f 72 74 68 |handValue.shorth|
00000050: 61 6e 64 49 6e 66 6f 04 68 69 0a 6c 61 62 65 6c |andInfo.hi.label|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 03 02 00 18 00 ca 03 00 0d cc 03 01 0d 08 ec |................|
00000080: 02 29 01 2a 00 00 00 e3 0b 04 e7 00 00 00 4e e8 |.).*..........N.|
00000090: 00 00 00 e4 06 2f c8 03 00 04 16 17 21 7f 00    |...../......!..|
```

### WASM
```
00000000: 05 05 6e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..n__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2d 73 68 |bject-literal-sh|
00000030: 6f 72 74 68 61 6e 64 2e 6a 73 1c 73 68 6f 72 74 |orthand.js.short|
00000040: 68 61 6e 64 56 61 6c 75 65 1a 73 68 6f 72 74 68 |handValue.shorth|
00000050: 61 6e 64 49 6e 66 6f 04 68 69 0a 6c 61 62 65 6c |andInfo.hi.label|
00000060: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000070: 00 02 02 00 1d 00 ca 03 00 0d cc 03 01 0d 08 ec |................|
00000080: 02 29 bf 2a e3 0b 68 00 00 4e e5 00 00 00 04 e7 |.).*..h..N......|
00000090: 00 00 00 4e e8 00 00 00 e4 06 2f c8 03 02 00 00 |...N....../.....|
000000a0: 00                                              |.|
```