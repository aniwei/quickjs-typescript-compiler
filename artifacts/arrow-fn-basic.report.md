# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-07T04:37:36.345Z

## 大小对比

- TypeScript编译器: 181 字节
- WASM编译器: 181 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 117
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 117
  }
}
```

## 字节级差异

共发现 45 个字节差异:

- 偏移量 0x7e: TS=0x10 vs WASM=0x0c
- 偏移量 0x80: TS=0x41 vs WASM=0x00
- 偏移量 0x81: TS=0x1b vs WASM=0x41
- 偏移量 0x82: TS=0x69 vs WASM=0x00
- 偏移量 0x83: TS=0x0c vs WASM=0x1b
- 偏移量 0x84: TS=0x0b vs WASM=0x0e
- 偏移量 0x85: TS=0x23 vs WASM=0x1b
- 偏移量 0x86: TS=0x0b vs WASM=0x0a
- 偏移量 0x88: TS=0x0e vs WASM=0x06
- 偏移量 0x89: TS=0x16 vs WASM=0x07
- 偏移量 0x8a: TS=0x0a vs WASM=0x07
- 偏移量 0x8b: TS=0x1b vs WASM=0x00
- 偏移量 0x8c: TS=0x06 vs WASM=0x0c
- 偏移量 0x8d: TS=0x07 vs WASM=0x02
- 偏移量 0x8e: TS=0x07 vs WASM=0x06
- 偏移量 0x8f: TS=0x00 vs WASM=0x01
- 偏移量 0x90: TS=0x0c vs WASM=0x00
- 偏移量 0x92: TS=0x04 vs WASM=0x00
- 偏移量 0x93: TS=0x01 vs WASM=0x02
- 偏移量 0x95: TS=0x02 vs WASM=0x00
- ... (显示前20个差异，总共45个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 62 |.console.log.a.b|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 05 01 01 22 00 d4 01 00 0d 08 ec 02 29 c2 00 |...."........)..|
00000060: 4f 6a 00 00 00 e3 39 e5 00 00 00 43 e6 00 00 00 |Oj....9....C....|
00000070: 68 00 00 b8 b9 f2 24 01 00 0e 06 2f c8 03 10 00 |h.....$..../....|
00000080: 41 1b 69 0c 0b 23 0b 1b 0e 16 0a 1b 06 07 07 00 |A.i..#..........|
00000090: 0c 02 04 01 02 02 00 02 02 00 00 04 02 ce 03 00 |................|
000000a0: 01 00 d0 03 00 01 00 d3 d4 9f 28 c8 03 06 00 41 |..........(....A|
000000b0: 0d 67 07 11 00                                  |.g...|
```

### WASM
```
00000000: 05 05 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 62 |.console.log.a.b|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 05 01 01 22 00 d4 01 00 0d 08 ec 02 29 c2 00 |...."........)..|
00000060: 4f 6a 00 00 00 e3 39 e5 00 00 00 43 e6 00 00 00 |Oj....9....C....|
00000070: 68 00 00 b8 b9 f2 24 01 00 0e 06 2f c8 03 0c 00 |h.....$..../....|
00000080: 00 41 00 1b 0e 1b 0a 1b 06 07 07 00 0c 02 06 01 |.A..............|
00000090: 00 02 00 02 02 00 00 04 02 ce 03 00 01 00 d0 03 |................|
000000a0: 00 01 00 d3 d4 9f 28 c8 03 0a 00 0c 03 01 07 08 |......(.........|
000000b0: 07 03 07 11 00                                  |.....|
```