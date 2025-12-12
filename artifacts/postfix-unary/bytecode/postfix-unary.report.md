# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/postfix-unary.ts
**生成时间**: 2025-12-12T09:59:18.568Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 179 字节
- 差异: 11 字节 (6.15%)

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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/postfix-unary.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 139
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/postfix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xd",
    "remaining": 127
  }
}
```

## 字节级差异

共发现 146 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x04
- 偏移量 0x2: TS=0x0c vs WASM=0x46
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
- 偏移量 0xf: TS=0x46 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x70
- 偏移量 0x17: TS=0x5f vs WASM=0x6f
- ... (显示前20个差异，总共146个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 46 |...<eval>._ret_F|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 70 6f 73 74 66 69 78 2d 75 6e 61 72 79 |es/postfix-unary|
00000030: 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 04 00 |.js.............|
00000040: 00 56 01 01 00 00 00 00 00 00 40 e6 00 00 00 00 |.V........@.....|
00000050: b6 01 00 cb 3b e6 00 00 00 39 e7 00 00 00 43 e8 |....;....9....C.|
00000060: 00 00 00 39 e6 00 00 00 93 3a e6 00 00 00 24 01 |...9.....:....$.|
00000070: 00 de 39 e7 00 00 00 43 e8 00 00 00 39 e6 00 00 |..9....C....9...|
00000080: 00 92 3a e6 00 00 00 24 01 00 de 39 e7 00 00 00 |..:....$...9....|
00000090: 43 e8 00 00 00 39 e6 00 00 00 24 01 00 de da 28 |C....9....$....(|
000000a0: 02 00 00 00 18 00 00 11 10 07 07 26 07 3e 18 66 |...........&.>.f|
000000b0: 17 3a 00 3e 18 66 17 3a 00 3e 18 25 17 00       |.:.>.f.:.>.%..|
```

### WASM
```
00000000: 05 04 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..F__tests__/fix|
00000010: 74 75 72 65 73 2f 70 6f 73 74 66 69 78 2d 75 6e |tures/postfix-un|
00000020: 61 72 79 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c 65 |ary.js.a.console|
00000030: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000040: a4 01 00 00 00 04 01 00 43 00 ca 03 00 09 08 ec |........C.......|
00000050: 02 29 b8 e3 39 e6 00 00 00 43 e7 00 00 00 68 00 |.)..9....C....h.|
00000060: 00 93 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 |..i..$...9....C.|
00000070: 00 00 00 68 00 00 92 69 00 00 24 01 00 0e 39 e6 |...h...i..$...9.|
00000080: 00 00 00 43 e7 00 00 00 68 00 00 24 01 00 0e 06 |...C....h..$....|
00000090: 2f c8 03 1e 00 00 21 00 1b 0e 1b 0a 11 02 16 03 |/.....!.........|
000000a0: 17 15 1b 0e 1b 0a 11 02 16 03 17 15 1b 0e 1b 0a |................|
000000b0: 11 01 00                                        |...|
```