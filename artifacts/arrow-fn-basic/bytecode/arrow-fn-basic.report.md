# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-12T09:59:18.366Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 172 字节
- 差异: -27 字节 (-15.70%)

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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-basic.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 93
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 117
  }
}
```

## 字节级差异

共发现 149 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x05
- 偏移量 0x2: TS=0x0c vs WASM=0x48
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
- 偏移量 0xf: TS=0x48 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x61
- 偏移量 0x17: TS=0x5f vs WASM=0x72
- ... (显示前20个差异，总共149个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 48 |...<eval>._ret_H|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 61 73 69 |es/arrow-fn-basi|
00000030: 63 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 07 |c.js............|
00000040: 00 01 2d 01 01 00 00 00 00 00 00 40 6a 00 00 00 |..-........@j...|
00000050: 01 b6 01 00 d5 00 4f 00 00 00 00 3b 6a 00 00 00 |......O....;j...|
00000060: 39 e8 00 00 00 43 e9 00 00 00 39 6a 00 00 00 cb |9....C....9j....|
00000070: cc 05 24 01 00 de da 28 02 00 00 00 12 00 00 11 |..$....(........|
00000080: 18 34 0b 28 0b 3e 18 25 08 07 06 07 0d 2a 17 00 |.4.(.>.%.....*..|
00000090: 01                                              |.|
```

### WASM
```
00000000: 05 05 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..H__tests__/fix|
00000010: 74 75 72 65 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 |tures/arrow-fn-b|
00000020: 61 73 69 63 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 |asic.js.console.|
00000030: 6c 6f 67 02 61 02 62 0d c8 03 00 00 00 00 00 0c |log.a.b.........|
00000040: 20 06 01 a4 01 00 00 00 05 01 01 22 00 d4 01 00 | .........."....|
00000050: 0d 08 ec 02 29 c2 00 4f 6a 00 00 00 e3 39 e5 00 |....)..Oj....9..|
00000060: 00 00 43 e6 00 00 00 68 00 00 b8 b9 f2 24 01 00 |..C....h.....$..|
00000070: 0e 06 2f c8 03 0c 00 00 41 00 1b 0e 1b 0a 1b 06 |../.....A.......|
00000080: 07 07 00 0c 02 06 01 00 02 00 02 02 00 00 04 02 |................|
00000090: ce 03 00 01 00 d0 03 00 01 00 d3 d4 9f 28 c8 03 |.............(..|
000000a0: 0a 00 0c 03 01 07 08 07 03 07 11 00             |............|
```