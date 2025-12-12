# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/variables-var.ts
**生成时间**: 2025-12-12T09:59:18.603Z

## 大小对比

- TypeScript编译器: 159 字节
- WASM编译器: 146 字节
- 差异: 13 字节 (8.90%)

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
      "string": "__tests__/fixtures/variables-var.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 108
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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-var.js",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 42
    },
    {
      "index": 4,
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
    "remaining": 92
  }
}
```

## 字节级差异

共发现 137 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x05
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
- 偏移量 0x16: TS=0x73 vs WASM=0x76
- 偏移量 0x17: TS=0x5f vs WASM=0x61
- ... (显示前20个差异，总共137个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 46 |...<eval>._ret_F|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 76 61 72 69 61 62 6c 65 73 2d 76 61 72 |es/variables-var|
00000030: 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 03 00 |.js.............|
00000040: 00 37 01 01 00 00 00 00 00 00 b6 01 00 cb 3a e6 |.7............:.|
00000050: 00 00 00 39 e7 00 00 00 43 e8 00 00 00 39 e6 00 |...9....C....9..|
00000060: 00 00 24 01 00 de cc 3a e9 00 00 00 39 e7 00 00 |..$....:....9...|
00000070: 00 43 e8 00 00 00 39 e9 00 00 00 24 01 00 de da |.C....9....$....|
00000080: 28 02 00 00 00 18 00 00 11 10 07 07 26 07 3e 18 |(...........&.>.|
00000090: 25 17 3a 00 02 10 07 07 26 07 3e 18 25 17 00    |%.:.....&.>.%..|
```

### WASM
```
00000000: 05 05 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..F__tests__/fix|
00000010: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000020: 76 61 72 2e 6a 73 02 61 02 62 0e 63 6f 6e 73 6f |var.js.a.b.conso|
00000030: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000040: 06 01 a4 01 00 00 00 03 02 00 28 00 ca 03 00 01 |..........(.....|
00000050: cc 03 01 01 08 ec 02 29 b8 e3 39 e7 00 00 00 43 |.......)..9....C|
00000060: e8 00 00 00 df 24 01 00 0e b9 e4 39 e7 00 00 00 |.....$.....9....|
00000070: 43 e8 00 00 00 e0 24 01 00 0e 06 2f c8 03 12 00 |C.....$..../....|
00000080: 00 21 00 1b 0e 1b 0a 07 01 22 15 1b 0e 1b 0a 07 |.!......."......|
00000090: 01 00                                           |..|
```