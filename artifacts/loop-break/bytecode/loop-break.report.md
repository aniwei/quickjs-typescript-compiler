# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-break.ts
**生成时间**: 2025-12-05T12:54:24.072Z

## 大小对比

- TypeScript编译器: 222 字节
- WASM编译器: 156 字节
- 差异: 66 字节 (42.31%)

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
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/loop-break.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "first",
      "offset": 113
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "second",
      "offset": 119
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 126
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 134
    }
  ],
  "functionHeader": {
    "offset": 138,
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
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "first",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "second",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
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
    "remaining": 87
  }
}
```

## 字节级差异

共发现 213 个字节差异:

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
- ... (显示前20个差异，总共213个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6c 6f 6f 70 2d 62 72 65 61 6b 2e 6a |res/loop-break.j|
00000070: 73 0a 66 69 72 73 74 0c 73 65 63 6f 6e 64 0e 63 |s.first.second.c|
00000080: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000090: 00 00 0c 20 06 01 a4 01 00 02 00 03 02 00 1e 02 |... ............|
000000a0: ca 03 01 00 00 cc 03 01 00 00 ca 03 00 01 cc 03 |................|
000000b0: 01 01 08 6c 16 00 00 00 b8 e3 b9 e4 39 e7 00 00 |...l........9...|
000000c0: 00 43 e8 00 00 00 df e0 9f 24 01 00 0e 29 06 2f |.C.......$...)./|
000000d0: c8 03 01 09 00 06 01 00 02 01 00 0c 01 00       |..............|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2e 6a 73 0a 66 69 72 |oop-break.js.fir|
00000030: 73 74 0c 73 65 63 6f 6e 64 0e 63 6f 6e 73 6f 6c |st.second.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 02 00 04 00 00 25 02 ca 03 02 00 30 |.........%.....0|
00000060: cc 03 02 01 30 08 ec 02 29 63 01 00 63 00 00 b8 |....0...)c..c...|
00000070: cb b9 cc 39 e7 00 00 00 43 e8 00 00 00 64 00 00 |...9....C....d..|
00000080: 64 01 00 9f 24 01 00 0e 06 2f c8 03 0e 00 00 4b |d...$..../.....K|
00000090: 04 1b 0e 1b 0a 11 10 11 03 07 0d 00             |............|
```