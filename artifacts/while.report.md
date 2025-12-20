# 字节码分析报告

**输入文件**: __tests__/fixtures/while.ts
**生成时间**: 2025-12-19T04:33:02.236Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 149 字节
- 差异: -4 字节 (-2.68%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "__tests__/fixtures/while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 101
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 54,
      "actualLength": 27,
      "isWideChar": 0,
      "string": "__tests__/fixtures/while.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 105
  }
}
```

## 字节级差异

共发现 18 个字节差异:

- 偏移量 0x81: TS=0x0e vs WASM=0x12
- 偏移量 0x84: TS=0x3e vs WASM=0x67
- 偏移量 0x85: TS=0x10 vs WASM=0x0e
- 偏移量 0x86: TS=0x21 vs WASM=0x20
- 偏移量 0x87: TS=0x0f vs WASM=0x04
- 偏移量 0x88: TS=0x25 vs WASM=0x12
- 偏移量 0x89: TS=0x16 vs WASM=0x09
- 偏移量 0x8a: TS=0x0c vs WASM=0x1b
- 偏移量 0x8b: TS=0x03 vs WASM=0x0e
- 偏移量 0x8c: TS=0x58 vs WASM=0x1b
- 偏移量 0x8d: TS=0x09 vs WASM=0x0a
- 偏移量 0x8e: TS=0x30 vs WASM=0x1b
- 偏移量 0x8f: TS=0x00 vs WASM=0x01
- 偏移量 0x90: TS=0x00 vs WASM=0x17
- 偏移量 0x91: TS=EOF vs WASM=0x15
- 偏移量 0x92: TS=EOF vs WASM=0x1b
- 偏移量 0x93: TS=EOF vs WASM=0x02
- 偏移量 0x94: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 36 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |6__tests__/fixtu|
00000020: 72 65 73 2f 77 68 69 6c 65 2e 6a 73 0c 00 06 00 |res/while.js....|
00000030: a4 01 00 01 00 03 00 00 40 01 a6 01 00 00 00 40 |........@......@|
00000040: e4 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 |.....?......;...|
00000050: 00 06 cb 39 e4 00 00 00 ba a5 ec 22 39 e5 00 00 |...9......."9...|
00000060: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cb 39 |.C....9....$...9|
00000070: e4 00 00 00 93 3a e4 00 00 00 cb ee d7 c7 28 ce |.....:........(.|
00000080: 03 0e 00 00 3e 10 21 0f 25 16 0c 03 58 09 30 00 |....>.!.%...X.0.|
00000090: 00                                              |.|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 36 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |6__tests__/fixtu|
00000020: 72 65 73 2f 77 68 69 6c 65 2e 6a 73 0c 00 06 00 |res/while.js....|
00000030: a4 01 00 01 00 03 00 00 40 01 a6 01 00 00 00 40 |........@......@|
00000040: e4 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 |.....?......;...|
00000050: 00 06 cb 39 e4 00 00 00 ba a5 ec 22 39 e5 00 00 |...9......."9...|
00000060: 00 43 e6 00 00 00 39 e4 00 00 00 24 01 00 cb 39 |.C....9....$...9|
00000070: e4 00 00 00 93 3a e4 00 00 00 cb ee d7 c7 28 ce |.....:........(.|
00000080: 03 12 00 00 67 0e 20 04 12 09 1b 0e 1b 0a 1b 01 |....g. .........|
00000090: 17 15 1b 02 00                                  |.....|
```