# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-this.ts
**生成时间**: 2025-12-05T12:54:24.289Z

## 大小对比

- TypeScript编译器: 209 字节
- WASM编译器: 130 字节
- 差异: 79 字节 (60.77%)

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
      "rawLength": 220,
      "actualLength": 110,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 114
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 118
    }
  ],
  "functionHeader": {
    "offset": 120,
    "tag": "0xd",
    "remaining": 89
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 79
  }
}
```

## 字节级差异

共发现 203 个字节差异:

- 偏移量 0x2: TS=0xdc vs WASM=0x54
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
- ... (显示前20个差异，总共203个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 dc 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 73 69 6d 70 6c 65 2d 74 68 69 73 2e |res/simple-this.|
00000070: 6a 73 06 42 61 72 02 78 0d c8 03 00 00 00 00 00 |js.Bar.x........|
00000080: 0c 20 06 01 a4 01 00 01 00 03 01 01 0c 01 ca 03 |. ..............|
00000090: 00 00 00 ca 03 00 01 08 6c 04 00 00 00 c2 00 e3 |........l.......|
000000a0: 29 06 2f c8 03 01 00 00 0c 00 04 00 ca 03 00 01 |)./.............|
000000b0: 00 03 00 00 0c 01 10 00 00 00 08 cb b8 b8 c7 1b |................|
000000c0: 44 e6 00 00 00 29 c8 03 01 06 00 02 01 00 02 7f |D....)..........|
000000d0: 00                                              |.|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 74 68 69 73 2e 6a 73 06 42 61 |imple-this.js.Ba|
00000030: 72 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |r.x......... ...|
00000040: 01 00 00 00 01 01 01 09 00 ca 03 00 01 08 ec 05 |................|
00000050: c2 00 e3 29 06 2f c8 03 02 00 00 00 0c 43 06 01 |...)./.......C..|
00000060: ca 03 00 01 00 02 00 00 0a 01 10 00 01 00 08 cb |................|
00000070: c7 b8 44 e6 00 00 00 29 c8 03 06 00 00 0d 08 07 |..D....)........|
00000080: 08 00                                           |..|
```