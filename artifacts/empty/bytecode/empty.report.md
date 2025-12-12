# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/empty.ts
**生成时间**: 2025-12-12T09:59:18.511Z

## 大小对比

- TypeScript编译器: 79 字节
- WASM编译器: 64 字节
- 差异: 15 字节 (23.44%)

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
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "__tests__/fixtures/empty.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xc",
    "remaining": 36
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
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "__tests__/fixtures/empty.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 30,
    "tag": "0xd",
    "remaining": 34
  }
}
```

## 字节级差异

共发现 68 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x01
- 偏移量 0x2: TS=0x0c vs WASM=0x36
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
- 偏移量 0xf: TS=0x36 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x65
- 偏移量 0x17: TS=0x5f vs WASM=0x6d
- ... (显示前20个差异，总共68个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 36 |...<eval>._ret_6|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 65 6d 70 74 79 2e 6a 73 0c 02 06 00 00 |es/empty.js.....|
00000030: 00 00 00 00 01 00 01 00 00 05 01 01 00 00 00 00 |................|
00000040: 00 00 b6 01 00 da 28 02 00 00 00 02 00 00 00    |......(........|
```

### WASM
```
00000000: 05 01 36 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..6__tests__/fix|
00000010: 74 75 72 65 73 2f 65 6d 70 74 79 2e 6a 73 0d c8 |tures/empty.js..|
00000020: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |....... ........|
00000030: 00 00 06 00 08 ec 02 29 06 2f c8 03 02 00 00 00 |.......)./......|
```