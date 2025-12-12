# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/debug-info-basic.ts
**生成时间**: 2025-12-12T09:59:18.501Z

## 大小对比

- TypeScript编译器: 151 字节
- WASM编译器: 148 字节
- 差异: 3 字节 (2.03%)

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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/debug-info-basic.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 97
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/debug-info-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 41
    },
    {
      "index": 2,
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
    "remaining": 95
  }
}
```

## 字节级差异

共发现 124 个字节差异:

- 偏移量 0x2: TS=0x0c vs WASM=0x4c
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
- 偏移量 0xf: TS=0x4c vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x64
- 偏移量 0x17: TS=0x5f vs WASM=0x65
- 偏移量 0x18: TS=0x5f vs WASM=0x62
- ... (显示前20个差异，总共124个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 4c |...<eval>._ret_L|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 64 65 62 75 67 2d 69 6e 66 6f 2d 62 61 |es/debug-info-ba|
00000030: 73 69 63 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 |sic.js..........|
00000040: 00 03 00 00 32 01 01 00 00 00 00 00 00 b6 01 00 |....2...........|
00000050: 39 e6 00 00 00 43 e7 00 00 00 cb 24 01 00 de 39 |9....C.....$...9|
00000060: e6 00 00 00 43 e7 00 00 00 cc 24 01 00 de 39 e6 |....C.....$...9.|
00000070: 00 00 00 43 e7 00 00 00 cd 24 01 00 de da 28 02 |...C.....$....(.|
00000080: 00 00 00 12 00 00 4d 18 07 17 3a 00 3e 18 07 17 |......M...:.>...|
00000090: 3a 00 3e 18 07 17 00                            |:.>....|
```

### WASM
```
00000000: 05 03 4c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..L__tests__/fix|
00000010: 74 75 72 65 73 2f 64 65 62 75 67 2d 69 6e 66 6f |tures/debug-info|
00000020: 2d 62 61 73 69 63 2e 6a 73 0e 63 6f 6e 73 6f 6c |-basic.js.consol|
00000030: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000040: 01 a4 01 00 00 00 03 00 00 33 00 08 ec 02 29 39 |.........3....)9|
00000050: e5 00 00 00 43 e6 00 00 00 b8 24 01 00 0e 39 e5 |....C.....$...9.|
00000060: 00 00 00 43 e6 00 00 00 b9 24 01 00 0e 39 e5 00 |...C.....$...9..|
00000070: 00 00 43 e6 00 00 00 ba 24 01 00 0e 06 2f c8 03 |..C.....$..../..|
00000080: 12 00 00 2f 0e 20 08 17 15 1b 0e 20 08 17 15 1b |.../. ..... ....|
00000090: 0e 20 08 00                                     |. ..|
```