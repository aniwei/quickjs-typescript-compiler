# 字节码分析报告

**输入文件**: /tmp/test-logical9.ts
**生成时间**: 2025-12-16T14:05:23.435Z

## 大小对比

- TypeScript编译器: 127 字节
- WASM编译器: 123 字节
- 差异: 4 字节 (3.25%)

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
      "string": "b",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "other",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical9.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 76
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
      "string": "b",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "other",
      "offset": 9
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical9.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 72
  }
}
```

## 字节级差异

共发现 10 个字节差异:

- 偏移量 0x4b: TS=0x00 vs WASM=0x80
- 偏移量 0x51: TS=0x12 vs WASM=0x82
- 偏移量 0x75: TS=0x08 vs WASM=0x04
- 偏移量 0x78: TS=0x3e vs WASM=0x71
- 偏移量 0x79: TS=0x10 vs WASM=0x00
- 偏移量 0x7a: TS=0x1b vs WASM=0x00
- 偏移量 0x7b: TS=0x07 vs WASM=EOF
- 偏移量 0x7c: TS=0x4e vs WASM=EOF
- 偏移量 0x7d: TS=0x04 vs WASM=EOF
- 偏移量 0x7e: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 62 08 74 65 73 74 0a 6f 74 68 65 72 46 |...b.test.otherF|
00000010: 2e 2e 2f 2e 2e 2f 2e 2e 2f 2e 2e 2f 2e 2e 2f 74 |../../../../../t|
00000020: 6d 70 2f 74 65 73 74 2d 6c 6f 67 69 63 61 6c 39 |mp/test-logical9|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 2d |.js............-|
00000040: 01 a6 01 00 00 00 40 e4 00 00 00 00 3f e4 00 00 |......@.....?...|
00000050: 00 12 04 e5 00 00 00 3b e4 00 00 00 7d e4 00 00 |.......;....}...|
00000060: 00 3d 11 ec 0b 0e 04 e6 00 00 00 16 3e ee 03 0f |.=..........>...|
00000070: 0f cf 28 ce 03 08 00 00 3e 10 1b 07 4e 04 00    |..(.....>...N..|
```

### WASM
```
00000000: 05 04 02 62 08 74 65 73 74 0a 6f 74 68 65 72 46 |...b.test.otherF|
00000010: 2e 2e 2f 2e 2e 2f 2e 2e 2f 2e 2e 2f 2e 2e 2f 74 |../../../../../t|
00000020: 6d 70 2f 74 65 73 74 2d 6c 6f 67 69 63 61 6c 39 |mp/test-logical9|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 2d |.js............-|
00000040: 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 00 00 |......@.....?...|
00000050: 00 82 04 e5 00 00 00 3b e4 00 00 00 7d e4 00 00 |.......;....}...|
00000060: 00 3d 11 ec 0b 0e 04 e6 00 00 00 16 3e ee 03 0f |.=..........>...|
00000070: 0f cf 28 ce 03 04 00 00 71 00 00                |..(.....q..|
```