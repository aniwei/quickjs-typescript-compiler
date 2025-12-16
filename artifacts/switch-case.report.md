# 字节码分析报告

**输入文件**: __tests__/fixtures/switch-case.ts
**生成时间**: 2025-12-12T10:10:51.574Z

## 大小对比

- TypeScript编译器: 135 字节
- WASM编译器: 173 字节
- 差异: -38 字节 (-21.97%)

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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-case.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xc",
    "remaining": 86
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-case.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 36
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 38
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xd",
    "remaining": 123
  }
}
```

## 字节级差异

共发现 147 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x04
- 偏移量 0x2: TS=0x0c vs WASM=0x42
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
- 偏移量 0xf: TS=0x42 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x17: TS=0x5f vs WASM=0x77
- 偏移量 0x18: TS=0x5f vs WASM=0x69
- ... (显示前20个差异，总共147个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 42 |...<eval>._ret_B|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 73 77 69 74 63 68 2d 63 61 73 65 2e 6a |es/switch-case.j|
00000030: 73 0c 02 06 00 00 00 00 00 00 01 00 03 00 00 2b |s..............+|
00000040: 01 01 00 00 00 00 00 00 40 e6 00 00 00 00 b6 01 |........@.......|
00000050: 00 cb 3b e6 00 00 00 06 de 39 e6 00 00 00 b6 02 |..;......9......|
00000060: 00 11 ca ad ff 03 01 06 11 cb ad ff 01 0e b7 02 |................|
00000070: 00 da 28 02 00 00 00 0e 00 00 11 10 07 07 26 07 |..(...........&.|
00000080: 16 10 3a 02 78 00 00                            |..:.x..|
```

### WASM
```
00000000: 05 04 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..B__tests__/fix|
00000010: 74 75 72 65 73 2f 73 77 69 74 63 68 2d 63 61 73 |tures/switch-cas|
00000020: 65 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |e.js.a.console.l|
00000030: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000040: 00 00 00 04 01 00 47 00 ca 03 00 09 08 ec 02 29 |......G........)|
00000050: b8 e3 68 00 00 11 b7 ad ec 12 39 e6 00 00 00 43 |..h.......9....C|
00000060: e7 00 00 00 b7 24 01 00 0e ee 26 11 b8 ad ec 12 |.....$....&.....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 0e ee |9....C.....$....|
00000080: 10 39 e6 00 00 00 43 e7 00 00 00 b9 24 01 00 0e |.9....C.....$...|
00000090: 0e 06 2f c8 03 16 00 00 21 10 2c 00 1b 0e 20 08 |../.....!.,... .|
000000a0: 3c 15 1b 0e 20 08 23 15 1b 0e 20 08 00          |<... .#... ..|
```