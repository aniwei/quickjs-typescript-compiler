# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/number.ts
**生成时间**: 2025-12-12T09:59:18.538Z

## 大小对比

- TypeScript编译器: 83 字节
- WASM编译器: 65 字节
- 差异: 18 字节 (27.69%)

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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/number.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 39
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/number.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 31,
    "tag": "0xd",
    "remaining": 34
  }
}
```

## 字节级差异

共发现 72 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x01
- 偏移量 0x2: TS=0x0c vs WASM=0x38
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
- 偏移量 0xf: TS=0x38 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x6e
- 偏移量 0x17: TS=0x5f vs WASM=0x75
- ... (显示前20个差异，总共72个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 38 |...<eval>._ret_8|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 6e 75 6d 62 65 72 2e 6a 73 0c 02 06 00 |es/number.js....|
00000030: 00 00 00 00 00 01 00 01 00 00 08 01 01 00 00 00 |................|
00000040: 00 00 00 b6 01 00 d2 7b de da 28 02 00 00 00 02 |.......{..(.....|
00000050: 00 00 00                                        |...|
```

### WASM
```
00000000: 05 01 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..8__tests__/fix|
00000010: 74 75 72 65 73 2f 6e 75 6d 62 65 72 2e 6a 73 0d |tures/number.js.|
00000020: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000030: 01 00 00 06 00 08 ec 02 29 06 2f c8 03 02 00 00 |........)./.....|
00000040: 00                                              |.|
```