# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-add.ts
**生成时间**: 2025-12-05T12:54:24.259Z

## 大小对比

- TypeScript编译器: 153 字节
- WASM编译器: 84 字节
- 差异: 69 字节 (82.14%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-add.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 113,
    "tag": "0xd",
    "remaining": 40
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-add.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xd",
    "remaining": 40
  }
}
```

## 字节级差异

共发现 147 个字节差异:

- 偏移量 0x2: TS=0xda vs WASM=0x52
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共147个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 01 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 73 69 6d 70 6c 65 2d 61 64 64 2e 6a |res/simple-add.j|
00000070: 73 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |s......... .....|
00000080: 00 00 03 00 00 0d 00 08 6c 05 00 00 00 b8 b9 9f |........l.......|
00000090: 0e 29 06 2f c8 03 01 00 00                      |.)./.....|
```

### WASM
```
00000000: 05 01 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 61 64 64 2e 6a 73 0d c8 03 00 |imple-add.js....|
00000030: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 00 00 |..... ..........|
00000040: 0a 00 08 ec 02 29 b8 b9 9f 0e 06 2f c8 03 04 00 |.....)...../....|
00000050: 00 20 04 00                                     |. ..|
```