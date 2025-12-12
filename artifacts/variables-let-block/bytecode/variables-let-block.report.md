# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/variables-let-block.ts
**生成时间**: 2025-12-12T09:59:18.599Z

## 大小对比

- TypeScript编译器: 157 字节
- WASM编译器: 160 字节
- 差异: -3 字节 (-1.88%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-let-block.js",
      "offset": 17
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 98
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
      "string": "__tests__/fixtures/variables-let-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
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
    "remaining": 100
  }
}
```

## 字节级差异

共发现 142 个字节差异:

- 偏移量 0x1: TS=0x04 vs WASM=0x05
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
- 偏移量 0xf: TS=0x02 vs WASM=0x78
- 偏移量 0x10: TS=0x62 vs WASM=0x74
- 偏移量 0x11: TS=0x52 vs WASM=0x75
- 偏移量 0x12: TS=0x5f vs WASM=0x72
- 偏移量 0x13: TS=0x5f vs WASM=0x65
- 偏移量 0x14: TS=0x74 vs WASM=0x73
- 偏移量 0x15: TS=0x65 vs WASM=0x2f
- ... (显示前20个差异，总共142个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 02 |...<eval>._ret_.|
00000010: 62 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |bR__tests__/fixt|
00000020: 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d 6c |ures/variables-l|
00000030: 65 74 2d 62 6c 6f 63 6b 2e 6a 73 0c 02 06 00 00 |et-block.js.....|
00000040: 00 00 00 00 02 00 03 00 00 2c 02 01 00 00 00 00 |.........,......|
00000050: 00 00 02 00 00 00 02 00 20 40 e6 00 00 00 00 b6 |........ @......|
00000060: 01 00 cb 3b e6 00 00 00 b6 02 00 cc df b7 02 00 |...;............|
00000070: 39 e8 00 00 00 43 e9 00 00 00 39 e6 00 00 00 24 |9....C....9....$|
00000080: 01 00 de da 28 03 00 00 00 12 00 00 11 10 07 07 |....(...........|
00000090: 26 07 12 18 07 07 37 0f 3e 18 25 17 00          |&.....7.>.%..|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..R__tests__/fix|
00000010: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000020: 6c 65 74 2d 62 6c 6f 63 6b 2e 6a 73 02 62 02 61 |let-block.js.b.a|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 00 |..... ..........|
00000050: 2f 01 ca 03 02 00 20 cc 03 00 09 08 ec 02 29 b8 |/..... .......).|
00000060: e3 63 00 00 b9 cb 39 e7 00 00 00 43 e8 00 00 00 |.c....9....C....|
00000070: 64 00 00 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 |d..$...9....C...|
00000080: 00 68 00 00 24 01 00 0e 06 2f c8 03 12 00 00 3c |.h..$..../.....<|
00000090: 08 1b 0e 1b 0a 11 01 18 1d 1b 0e 1b 0a 11 01 00 |................|
```