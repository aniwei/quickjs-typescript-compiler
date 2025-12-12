# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-literal.ts
**生成时间**: 2025-12-12T09:59:18.337Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 128 字节
- 差异: 17 字节 (13.28%)

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
      "string": "__tests__/fixtures/array-literal.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 94
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
      "string": "__tests__/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xd",
    "remaining": 74
  }
}
```

## 字节级差异

共发现 124 个字节差异:

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
- 偏移量 0x16: TS=0x73 vs WASM=0x61
- 偏移量 0x17: TS=0x5f vs WASM=0x72
- ... (显示前20个差异，总共124个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 46 |...<eval>._ret_F|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 61 72 72 61 79 2d 6c 69 74 65 72 61 6c |es/array-literal|
00000030: 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 04 00 |.js.............|
00000040: 00 2b 01 01 00 00 00 00 00 00 40 e6 00 00 00 01 |.+........@.....|
00000050: b6 01 00 cb cc cd 26 03 00 3b e6 00 00 00 39 e7 |......&..;....9.|
00000060: 00 00 00 43 e8 00 00 00 39 e6 00 00 00 cb 48 24 |...C....9.....H$|
00000070: 01 00 de da 28 02 00 00 00 16 00 00 11 1a 07 06 |....(...........|
00000080: 07 06 07 0d 11 0b 26 0b 3e 18 25 08 07 07 07 17 |......&.>.%.....|
00000090: 00                                              |.|
```

### WASM
```
00000000: 05 04 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..F__tests__/fix|
00000010: 74 75 72 65 73 2f 61 72 72 61 79 2d 6c 69 74 65 |tures/array-lite|
00000020: 72 61 6c 2e 6a 73 06 61 72 72 0e 63 6f 6e 73 6f |ral.js.arr.conso|
00000030: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000040: 06 01 a4 01 00 00 00 04 01 00 20 00 ca 03 00 0d |.......... .....|
00000050: 08 ec 02 29 b8 b9 ba 26 03 00 e3 39 e6 00 00 00 |...)...&...9....|
00000060: 43 e7 00 00 00 68 00 00 b8 48 24 01 00 0e 06 2f |C....h...H$..../|
00000070: c8 03 0c 00 00 3a 00 1b 0e 1b 0a 16 06 07 07 00 |.....:..........|
```