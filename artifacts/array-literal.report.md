# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/array-literal.ts
**生成时间**: 2025-12-09T14:24:09.608Z

## 大小对比

- TypeScript编译器: 133 字节
- WASM编译器: 137 字节
- 差异: -4 字节 (-2.92%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 3,
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
    "remaining": 70
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 3,
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
    "remaining": 74
  }
}
```

## 字节级差异

共发现 12 个字节差异:

- 偏移量 0x7b: TS=0x08 vs WASM=0x0c
- 偏移量 0x7e: TS=0x25 vs WASM=0x3a
- 偏移量 0x7f: TS=0x18 vs WASM=0x00
- 偏移量 0x80: TS=0x17 vs WASM=0x1b
- 偏移量 0x81: TS=0x17 vs WASM=0x0e
- 偏移量 0x82: TS=0x34 vs WASM=0x1b
- 偏移量 0x83: TS=0x18 vs WASM=0x0a
- 偏移量 0x84: TS=0x00 vs WASM=0x16
- 偏移量 0x85: TS=EOF vs WASM=0x06
- 偏移量 0x86: TS=EOF vs WASM=0x07
- 偏移量 0x87: TS=EOF vs WASM=0x07
- 偏移量 0x88: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6c 69 74 65 72 61 6c 2e 6a 73 06 |rray-literal.js.|
00000030: 61 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |arr.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 01 00 20 00 ca 03 00 0d 08 ec 02 29 b8 b9 ba |... ........)...|
00000060: 26 03 00 e3 39 e6 00 00 00 43 e7 00 00 00 68 00 |&...9....C....h.|
00000070: 00 b8 48 24 01 00 0e 06 2f c8 03 08 00 00 25 18 |..H$..../.....%.|
00000080: 17 17 34 18 00                                  |..4..|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6c 69 74 65 72 61 6c 2e 6a 73 06 |rray-literal.js.|
00000030: 61 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |arr.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 01 00 20 00 ca 03 00 0d 08 ec 02 29 b8 b9 ba |... ........)...|
00000060: 26 03 00 e3 39 e6 00 00 00 43 e7 00 00 00 68 00 |&...9....C....h.|
00000070: 00 b8 48 24 01 00 0e 06 2f c8 03 0c 00 00 3a 00 |..H$..../.....:.|
00000080: 1b 0e 1b 0a 16 06 07 07 00                      |.........|
```