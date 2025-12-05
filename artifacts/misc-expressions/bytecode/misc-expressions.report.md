# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/misc-expressions.ts
**生成时间**: 2025-12-05T12:54:24.135Z

## 大小对比

- TypeScript编译器: 198 字节
- WASM编译器: 102 字节
- 差异: 96 字节 (94.12%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 230,
      "actualLength": 115,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/misc-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 119
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 121
    }
  ],
  "functionHeader": {
    "offset": 123,
    "tag": "0xd",
    "remaining": 75
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/misc-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xd",
    "remaining": 48
  }
}
```

## 字节级差异

共发现 193 个字节差异:

- 偏移量 0x2: TS=0xe6 vs WASM=0x5e
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
- ... (显示前20个差异，总共193个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 e6 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6d 69 73 63 2d 65 78 70 72 65 73 73 |res/misc-express|
00000070: 69 6f 6e 73 2e 6a 73 02 78 02 79 0d c8 03 00 00 |ions.js.x.y.....|
00000080: 00 00 00 0c 20 06 01 a4 01 00 02 00 03 02 00 1b |.... ...........|
00000090: 02 ca 03 00 00 00 cc 03 00 00 00 ca 03 00 01 cc |................|
000000a0: 03 01 01 08 6c 13 00 00 00 0a 6c 06 00 00 00 b8 |....l.....l.....|
000000b0: 6e 01 00 00 00 b9 e3 b8 0e b9 e4 29 06 2f c8 03 |n..........)./..|
000000c0: 01 03 00 14 01 00                               |......|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 69 73 63 2d 65 78 70 72 65 73 73 69 6f 6e 73 2e |isc-expressions.|
00000030: 6a 73 02 78 02 79 0d c8 03 00 00 00 00 00 0c 20 |js.x.y......... |
00000040: 06 01 a4 01 00 00 00 01 02 00 0c 00 ca 03 00 0d |................|
00000050: cc 03 01 0d 08 ec 02 29 b8 ee 01 e3 b9 e4 06 2f |.......)......./|
00000060: c8 03 02 00 00 00                               |......|
```