# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/optional-chaining.ts
**生成时间**: 2025-12-12T09:59:18.564Z

## 大小对比

- TypeScript编译器: 424 字节
- WASM编译器: 593 字节
- 差异: -169 字节 (-28.50%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 369
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 16,
  "atoms": [
    {
      "index": 0,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "user",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "list",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alice",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "a@example.com",
      "offset": 58
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "email",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "contact",
      "offset": 78
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 86
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "profile",
      "offset": 92
    },
    {
      "index": 9,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 100
    },
    {
      "index": 10,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 108
    },
    {
      "index": 11,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "deep",
      "offset": 112
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "nested",
      "offset": 117
    },
    {
      "index": 13,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "missing",
      "offset": 124
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 132
    },
    {
      "index": 15,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 137
    }
  ],
  "functionHeader": {
    "offset": 140,
    "tag": "0xd",
    "remaining": 453
  }
}
```

## 字节级差异

共发现 546 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x10
- 偏移量 0x2: TS=0x0c vs WASM=0x4e
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x4e vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x6f
- 偏移量 0x17: TS=0x5f vs WASM=0x70
- ... (显示前20个差异，总共546个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 4e |...<eval>._ret_N|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 68 61 69 |es/optional-chai|
00000030: 6e 69 6e 67 2e 6a 73 0c 02 06 00 00 00 00 00 00 |ning.js.........|
00000040: 01 00 05 00 00 f7 01 01 01 00 00 00 00 00 00 40 |...............@|
00000050: e6 00 00 00 01 40 ef 00 00 00 01 b6 01 00 0b 0b |.....@..........|
00000060: 04 e7 00 00 00 4e 38 00 00 00 0b 04 e8 00 00 00 |.....N8.........|
00000070: 4e e9 00 00 00 4e ea 00 00 00 4e eb 00 00 00 3b |N....N....N....;|
00000080: e6 00 00 00 39 ec 00 00 00 43 ed 00 00 00 39 e6 |....9....C....9.|
00000090: 00 00 00 42 eb 00 00 00 42 38 00 00 00 24 01 00 |...B....B8...$..|
000000a0: de 39 ec 00 00 00 43 ed 00 00 00 39 e6 00 00 00 |.9....C....9....|
000000b0: 42 eb 00 00 00 43 ee 00 00 00 24 00 00 24 01 00 |B....C....$..$..|
000000c0: de 0b cb 4e 42 00 00 00 07 0b 0b cd 4e f0 00 00 |...NB.......N...|
000000d0: 00 4e f1 00 00 00 26 03 00 3b ef 00 00 00 39 ec |.N....&..;....9.|
000000e0: 00 00 00 43 ed 00 00 00 39 ef 00 00 00 cb 48 42 |...C....9.....HB|
000000f0: 42 00 00 00 11 b2 ff 07 0e 04 f2 00 00 00 24 01 |B.............$.|
00000100: 00 de 39 ec 00 00 00 43 ed 00 00 00 39 ef 00 00 |..9....C....9...|
00000110: 00 cc 48 42 f1 00 00 00 42 f0 00 00 00 11 b2 ff |..HB....B.......|
00000120: 03 0e ca 24 01 00 de 39 ec 00 00 00 43 ed 00 00 |...$...9....C...|
00000130: 00 39 e6 00 00 00 42 f2 00 00 00 42 f3 00 00 00 |.9....B....B....|
00000140: 24 01 00 de da 28 02 00 00 00 5c 00 00 11 1a 08 |$....(....\.....|
00000150: 00 08 02 1b 0b 1c 12 07 12 1b 0d 1b 15 00 05 03 |................|
00000160: 07 1a 04 00 07 12 0b 3e 18 57 17 3a 00 3e 18 7f |.......>.W.:.>..|
00000170: 17 3a 00 02 1c 07 12 07 0d 1b 18 07 0c 07 14 07 |.:..............|
00000180: 10 07 0b 1b 13 1b 2d 11 0d 26 0b 3e 18 25 0e 07 |......-..&.>.%..|
00000190: 0d 48 28 34 3f 3a 00 3e 18 25 0e 07 0d 61 36 20 |.H(4?:.>.%...a6 |
000001a0: 4d 3a 00 3e 18 57 17 00                         |M:.>.W..|
```

### WASM
```
00000000: 05 10 4e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..N__tests__/fix|
00000010: 74 75 72 65 73 2f 6f 70 74 69 6f 6e 61 6c 2d 63 |tures/optional-c|
00000020: 68 61 69 6e 69 6e 67 2e 6a 73 08 75 73 65 72 08 |haining.js.user.|
00000030: 6c 69 73 74 0a 61 6c 69 63 65 1a 61 40 65 78 61 |list.alice.a@exa|
00000040: 6d 70 6c 65 2e 63 6f 6d 0a 65 6d 61 69 6c 0e 63 |mple.com.email.c|
00000050: 6f 6e 74 61 63 74 0a 67 72 65 65 74 0e 70 72 6f |ontact.greet.pro|
00000060: 66 69 6c 65 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |file.console.log|
00000070: 08 64 65 65 70 0c 6e 65 73 74 65 64 0e 6d 69 73 |.deep.nested.mis|
00000080: 73 69 6e 67 08 70 72 6f 70 04 68 69 0d c8 03 00 |sing.prop.hi....|
00000090: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 05 02 01 |..... ..........|
000000a0: c3 02 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 0b |..............).|
000000b0: 0b 04 e7 00 00 00 4e 38 00 00 00 0b 04 e8 00 00 |......N8........|
000000c0: 00 4e e9 00 00 00 4e ea 00 00 00 c2 00 56 eb 00 |.N....N......V..|
000000d0: 00 00 04 4e ec 00 00 00 e3 39 ed 00 00 00 43 ee |...N.....9....C.|
000000e0: 00 00 00 68 00 00 11 b2 ec 05 0e 06 ee 13 42 ec |...h..........B.|
000000f0: 00 00 00 11 b2 ec 05 0e 06 ee 06 42 38 00 00 00 |...........B8...|
00000100: 24 01 00 0e 39 ed 00 00 00 43 ee 00 00 00 68 00 |$...9....C....h.|
00000110: 00 11 b2 ec 05 0e 06 ee 1f 42 ec 00 00 00 11 b2 |.........B......|
00000120: ec 05 0e 06 ee 12 43 eb 00 00 00 11 b2 ec 06 0e |......C.........|
00000130: 0e 06 ee 04 24 00 00 24 01 00 0e 0b b8 4e 42 00 |....$..$.....NB.|
00000140: 00 00 07 0b 0b ba 4e ef 00 00 00 4e f0 00 00 00 |......N....N....|
00000150: 26 03 00 e4 39 ed 00 00 00 43 ee 00 00 00 68 01 |&...9....C....h.|
00000160: 00 11 b2 ec 05 0e 06 ee 10 b8 48 11 b2 ec 05 0e |..........H.....|
00000170: 06 ee 06 42 42 00 00 00 11 b2 ec 07 0e 04 f1 00 |...BB...........|
00000180: 00 00 24 01 00 0e 39 ed 00 00 00 43 ee 00 00 00 |..$...9....C....|
00000190: 68 01 00 11 b2 ec 05 0e 06 ee 1d b9 48 11 b2 ec |h...........H...|
000001a0: 05 0e 06 ee 13 42 f0 00 00 00 11 b2 ec 05 0e 06 |.....B..........|
000001b0: ee 06 42 ef 00 00 00 11 b2 ec 03 0e b7 24 01 00 |..B..........$..|
000001c0: 0e 39 ed 00 00 00 43 ee 00 00 00 68 00 00 11 b2 |.9....C....h....|
000001d0: ec 05 0e 06 ee 13 42 f1 00 00 00 11 b2 ec 05 0e |......B.........|
000001e0: 06 ee 06 42 f2 00 00 00 24 01 00 0e 06 2f c8 03 |...B....$..../..|
000001f0: 44 00 00 00 2e 12 00 1b 0e 1b 0a 11 08 43 12 43 |D............C.C|
00000200: 1b 17 15 1b 0e 1b 0a 11 08 43 12 70 12 11 2d 95 |.........C.p..-.|
00000210: 15 1b 0e 1b 0a 3e 08 07 0a 75 13 17 15 1b 0e 1b |.....>...u......|
00000220: 0a 3e 08 07 0a 43 10 61 23 17 15 1b 0e 1b 0a 11 |.>...C.a#.......|
00000230: 08 43 12 43 1b 00 0c 42 07 01 00 00 00 00 01 00 |.C.C...B........|
00000240: 00 06 00 04 f3 00 00 00 28 c8 03 04 04 08 1c 08 |........(.......|
00000250: 00                                              |.|
```