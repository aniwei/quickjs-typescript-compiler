# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-operators.ts
**生成时间**: 2025-12-09T14:28:02.750Z

## 大小对比

- TypeScript编译器: 210 字节
- WASM编译器: 230 字节
- 差异: -20 字节 (-8.70%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 147
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 167
  }
}
```

## 字节级差异

共发现 30 个字节差异:

- 偏移量 0xc6: TS=0x0a vs WASM=0x1e
- 偏移量 0xc9: TS=0x7b vs WASM=0x2f
- 偏移量 0xca: TS=0x00 vs WASM=0x0e
- 偏移量 0xcb: TS=0x67 vs WASM=0x39
- 偏移量 0xcc: TS=0x00 vs WASM=0x08
- 偏移量 0xcd: TS=0x80 vs WASM=0x17
- 偏移量 0xce: TS=0x00 vs WASM=0x15
- 偏移量 0xcf: TS=0x67 vs WASM=0x1b
- 偏移量 0xd0: TS=0x00 vs WASM=0x0e
- 偏移量 0xd1: TS=0x00 vs WASM=0x39
- 偏移量 0xd2: TS=EOF vs WASM=0x08
- 偏移量 0xd3: TS=EOF vs WASM=0x17
- 偏移量 0xd4: TS=EOF vs WASM=0x15
- 偏移量 0xd5: TS=EOF vs WASM=0x1b
- 偏移量 0xd6: TS=EOF vs WASM=0x0e
- 偏移量 0xd7: TS=EOF vs WASM=0x52
- 偏移量 0xd8: TS=EOF vs WASM=0x08
- 偏移量 0xd9: TS=EOF vs WASM=0x17
- 偏移量 0xda: TS=EOF vs WASM=0x15
- 偏移量 0xdb: TS=EOF vs WASM=0x1b
- ... (显示前20个差异，总共30个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |.js.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 00 00 6f 00 08 ec 02 29 39 e5 00 00 00 43 e6 |...o....)9....C.|
00000060: 00 00 00 0a 11 ec 03 0e 09 24 01 00 0e 39 e5 00 |.........$...9..|
00000070: 00 00 43 e6 00 00 00 09 11 ed 03 0e 0a 24 01 00 |..C..........$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 07 11 b2 ec 07 |.9....C.........|
00000090: 0e 04 16 00 00 00 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
000000a0: e6 00 00 00 b8 11 ec 03 0e b9 24 01 00 0e 39 e5 |..........$...9.|
000000b0: 00 00 00 43 e6 00 00 00 b7 11 ed 03 0e ba 24 01 |...C..........$.|
000000c0: 00 0e 06 2f c8 03 0a 00 00 7b 00 67 00 80 00 67 |.../.....{.g...g|
000000d0: 00 00                                           |..|
```

### WASM
```
00000000: 05 03 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |.js.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 00 00 6f 00 08 ec 02 29 39 e5 00 00 00 43 e6 |...o....)9....C.|
00000060: 00 00 00 0a 11 ec 03 0e 09 24 01 00 0e 39 e5 00 |.........$...9..|
00000070: 00 00 43 e6 00 00 00 09 11 ed 03 0e 0a 24 01 00 |..C..........$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 07 11 b2 ec 07 |.9....C.........|
00000090: 0e 04 16 00 00 00 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
000000a0: e6 00 00 00 b8 11 ec 03 0e b9 24 01 00 0e 39 e5 |..........$...9.|
000000b0: 00 00 00 43 e6 00 00 00 b7 11 ed 03 0e ba 24 01 |...C..........$.|
000000c0: 00 0e 06 2f c8 03 1e 00 00 2f 0e 39 08 17 15 1b |.../...../.9....|
000000d0: 0e 39 08 17 15 1b 0e 52 08 17 15 1b 0e 39 08 17 |.9.....R.....9..|
000000e0: 15 1b 0e 39 08 00                               |...9..|
```