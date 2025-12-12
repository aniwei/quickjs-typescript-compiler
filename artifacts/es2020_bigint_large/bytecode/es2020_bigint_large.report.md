# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/es2020_bigint_large.ts
**生成时间**: 2025-12-12T09:59:18.515Z

## 大小对比

- TypeScript编译器: 180 字节
- WASM编译器: 175 字节
- 差异: 5 字节 (2.86%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint_large.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 123
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
      "string": "__tests__/fixtures/es2020_bigint_large.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 158 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x05
- 偏移量 0x2: TS=0x0c vs WASM=0x52
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
- 偏移量 0xf: TS=0x52 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x65
- 偏移量 0x17: TS=0x5f vs WASM=0x73
- ... (显示前20个差异，总共158个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 52 |...<eval>._ret_R|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 65 73 32 30 32 30 5f 62 69 67 69 6e 74 |es/es2020_bigint|
00000030: 5f 6c 61 72 67 65 2e 6a 73 0c 02 06 00 00 00 00 |_large.js.......|
00000040: 00 00 01 00 03 00 02 46 01 01 00 00 00 00 00 00 |.......F........|
00000050: 40 e6 00 00 00 01 40 e7 00 00 00 01 b6 01 00 d4 |@.....@.........|
00000060: 00 3b e6 00 00 00 d4 01 8e 3b e7 00 00 00 39 e8 |.;.......;....9.|
00000070: 00 00 00 43 e9 00 00 00 39 e6 00 00 00 24 01 00 |...C....9....$..|
00000080: de 39 e8 00 00 00 43 e9 00 00 00 39 e7 00 00 00 |.9....C....9....|
00000090: 24 01 00 de da 28 02 00 00 00 16 00 00 2a 0c 26 |$....(.......*.&|
000000a0: 0b 1b 14 07 07 26 0b 3e 18 25 17 3a 00 3e 18 25 |.....&.>.%.:.>.%|
000000b0: 17 00 01 01                                     |....|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..R__tests__/fix|
00000010: 74 75 72 65 73 2f 65 73 32 30 32 30 5f 62 69 67 |tures/es2020_big|
00000020: 69 6e 74 5f 6c 61 72 67 65 2e 6a 73 02 61 02 62 |int_large.js.a.b|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 02 |..... ..........|
00000050: 2f 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 c1 00 |/............)..|
00000060: e3 c1 01 8e e4 39 e7 00 00 00 43 e8 00 00 00 68 |.....9....C....h|
00000070: 00 00 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 00 |..$...9....C....|
00000080: 68 01 00 24 01 00 0e 06 2f c8 03 14 00 00 30 14 |h..$..../.....0.|
00000090: 0d 13 1b 0e 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 |................|
000000a0: 00 0a 05 00 00 00 80 00 0a 05 01 00 00 80 00    |...............|
```