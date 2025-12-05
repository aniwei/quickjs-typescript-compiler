# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/regex-literal.ts
**生成时间**: 2025-12-05T12:54:24.236Z

## 大小对比

- TypeScript编译器: 219 字节
- WASM编译器: 216 字节
- 差异: 3 字节 (1.39%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/regex-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "re",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 119
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 127
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 131
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abbbc",
      "offset": 136
    }
  ],
  "functionHeader": {
    "offset": 142,
    "tag": "0xd",
    "remaining": 77
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/regex-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "re",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abbbc",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 143
  }
}
```

## 字节级差异

共发现 201 个字节差异:

- 偏移量 0x2: TS=0xe0 vs WASM=0x58
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
- ... (显示前20个差异，总共201个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 72 65 67 65 78 2d 6c 69 74 65 72 61 |res/regex-litera|
00000070: 6c 2e 6a 73 04 72 65 0e 63 6f 6e 73 6f 6c 65 06 |l.js.re.console.|
00000080: 6c 6f 67 08 74 65 73 74 0a 61 62 62 62 63 0d c8 |log.test.abbbc..|
00000090: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 |....... ........|
000000a0: 01 00 26 01 ca 03 00 00 00 ca 03 00 01 08 6c 1e |..&...........l.|
000000b0: 00 00 00 e3 39 e6 00 00 00 43 e7 00 00 00 df 43 |....9....C.....C|
000000c0: e8 00 00 00 04 e9 00 00 00 24 01 00 24 01 00 0e |.........$..$...|
000000d0: 29 06 2f c8 03 01 03 00 11 01 00                |)./........|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 67 65 78 2d 6c 69 74 65 72 61 6c 2e 6a 73 04 |egex-literal.js.|
00000030: 72 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 74 |re.console.log.t|
00000040: 65 73 74 0a 61 62 62 62 63 0d c8 03 00 00 00 00 |est.abbbc.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 05 01 02 28 00 ca |.. ..........(..|
00000060: 03 00 01 08 ec 02 29 c1 00 c1 01 34 e3 39 e6 00 |......)....4.9..|
00000070: 00 00 43 e7 00 00 00 df 43 e8 00 00 00 04 e9 00 |..C.....C.......|
00000080: 00 00 24 01 00 24 01 00 0e 06 2f c8 03 0e 00 00 |..$..$..../.....|
00000090: 35 00 1b 0e 1b 0a 07 04 34 0a 11 0f 00 07 08 61 |5.......4......a|
000000a0: 62 2b 63 07 66 00 00 01 00 2b 00 00 00 0c 06 00 |b+c.f....+......|
000000b0: 00 00 06 0b f5 ff ff ff 0f 00 01 61 00 26 04 00 |...........a.&..|
000000c0: 00 00 01 00 00 00 ff ff ff 7f 01 00 00 00 01 62 |...............b|
000000d0: 00 0e 01 63 00 10 00 0e                         |...c....|
```