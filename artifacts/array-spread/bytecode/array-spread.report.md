# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-spread.ts
**生成时间**: 2025-12-12T09:59:18.356Z

## 大小对比

- TypeScript编译器: 176 字节
- WASM编译器: 145 字节
- 差异: 31 字节 (21.38%)

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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-spread.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xc",
    "remaining": 126
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-spread.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 37
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 39
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 41
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 92
  }
}
```

## 字节级差异

共发现 155 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x05
- 偏移量 0x2: TS=0x0c vs WASM=0x44
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
- 偏移量 0xf: TS=0x44 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x61
- 偏移量 0x17: TS=0x5f vs WASM=0x72
- ... (显示前20个差异，总共155个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 44 |...<eval>._ret_D|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 61 72 72 61 79 2d 73 70 72 65 61 64 2e |es/array-spread.|
00000030: 6a 73 0c 02 06 00 00 00 00 00 00 01 00 04 00 00 |js..............|
00000040: 43 01 01 00 00 00 00 00 00 40 e6 00 00 00 01 40 |C........@.....@|
00000050: e7 00 00 00 01 b6 01 00 cb cc 26 02 00 3b e6 00 |..........&..;..|
00000060: 00 00 26 00 00 ca 39 e6 00 00 00 54 cd 53 91 0e |..&...9....T.S..|
00000070: 3b e7 00 00 00 39 e8 00 00 00 43 e9 00 00 00 39 |;....9....C....9|
00000080: e7 00 00 00 cc 48 24 01 00 de da 28 02 00 00 00 |.....H$....(....|
00000090: 1e 00 00 11 16 07 06 07 07 11 07 26 0b 02 14 2a |...........&...*|
000000a0: 08 2a 06 16 15 26 0b 3e 18 25 04 07 03 07 17 00 |.*...&.>.%......|
```

### WASM
```
00000000: 05 05 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..D__tests__/fix|
00000010: 74 75 72 65 73 2f 61 72 72 61 79 2d 73 70 72 65 |tures/array-spre|
00000020: 61 64 2e 6a 73 02 61 02 62 0e 63 6f 6e 73 6f 6c |ad.js.a.b.consol|
00000030: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000040: 01 a4 01 00 00 00 04 02 00 2c 00 ca 03 00 0d cc |.........,......|
00000050: 03 01 0d 08 ec 02 29 b8 b9 26 02 00 e3 26 00 00 |......)..&...&..|
00000060: b7 68 00 00 54 ba 53 91 0e e4 39 e7 00 00 00 43 |.h..T.S...9....C|
00000070: e8 00 00 00 68 01 00 b9 48 24 01 00 0e 06 2f c8 |....h...H$..../.|
00000080: 03 0e 00 00 49 1c 30 1b 1b 0e 1b 0a 16 02 07 03 |....I.0.........|
00000090: 00                                              |.|
```