# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/arrow-fn-complex.ts
**生成时间**: 2025-12-12T09:59:18.375Z

## 大小对比

- TypeScript编译器: 146 字节
- WASM编译器: 218 字节
- 差异: -72 字节 (-33.03%)

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
      "string": "__tests__/fixtures/arrow-fn-complex.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 92
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 63
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xd",
    "remaining": 153
  }
}
```

## 字节级差异

共发现 193 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x06
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
- 偏移量 0x16: TS=0x73 vs WASM=0x61
- 偏移量 0x17: TS=0x5f vs WASM=0x72
- ... (显示前20个差异，总共193个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 4c |...<eval>._ret_L|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 61 72 72 6f 77 2d 66 6e 2d 63 6f 6d 70 |es/arrow-fn-comp|
00000030: 6c 65 78 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 |lex.js..........|
00000040: 00 06 00 01 2c 01 01 00 00 00 00 00 00 40 e6 00 |....,........@..|
00000050: 00 00 01 b6 01 00 d5 00 4f 00 00 00 00 3b e6 00 |........O....;..|
00000060: 00 00 39 e9 00 00 00 43 ea 00 00 00 39 e6 00 00 |..9....C....9...|
00000070: 00 cf 04 24 01 00 de da 28 02 00 00 00 12 00 00 |...$....(.......|
00000080: 11 20 34 13 00 07 0e 0b 3e 18 25 10 07 0f 2a 17 |. 4.....>.%...*.|
00000090: 00 01                                           |..|
```

### WASM
```
00000000: 05 06 4c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..L__tests__/fix|
00000010: 74 75 72 65 73 2f 61 72 72 6f 77 2d 66 6e 2d 63 |tures/arrow-fn-c|
00000020: 6f 6d 70 6c 65 78 2e 6a 73 0e 63 6f 6d 70 6c 65 |omplex.js.comple|
00000030: 78 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 02 |x.console.log.x.|
00000040: 79 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |y......... .....|
00000050: 00 00 04 01 01 21 00 ca 03 00 0d 08 ec 02 29 c2 |.....!........).|
00000060: 00 4f e5 00 00 00 e3 39 e6 00 00 00 43 e7 00 00 |.O.....9....C...|
00000070: 00 68 00 00 bc f1 24 01 00 0e 06 2f c8 03 0e 00 |.h....$..../....|
00000080: 00 00 0c 0e 00 1b 0e 1b 0a 16 0e 07 0f 00 0c 02 |................|
00000090: 06 01 00 01 01 01 02 00 00 19 02 d0 03 00 01 00 |................|
000000a0: d2 03 01 00 30 63 00 00 bf 0a cb d3 64 00 00 a7 |....0c......d...|
000000b0: ec 07 d3 64 00 00 a0 28 64 00 00 d3 a0 28 c8 03 |...d...(d....(..|
000000c0: 18 00 10 22 0f 07 08 11 03 12 0a 07 08 11 03 07 |..."............|
000000d0: 11 09 06 11 08 07 03 07 11 00                   |..........|
```