# 字节码分析报告

**输入文件**: /tmp/test-logical3.ts
**生成时间**: 2025-12-16T13:34:51.210Z

## 大小对比

- TypeScript编译器: 131 字节
- WASM编译器: 123 字节
- 差异: 8 字节 (6.50%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical3.js",
      "offset": 8
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 87
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical3.js",
      "offset": 8
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 79
  }
}
```

## 字节级差异

共发现 16 个字节差异:

- 偏移量 0x44: TS=0x01 vs WASM=0x80
- 偏移量 0x4a: TS=0x10 vs WASM=0x80
- 偏移量 0x73: TS=0x0e vs WASM=0x06
- 偏移量 0x76: TS=0x3e vs WASM=0x7b
- 偏移量 0x77: TS=0x18 vs WASM=0x00
- 偏移量 0x78: TS=0x07 vs WASM=0x1b
- 偏移量 0x79: TS=0x0a vs WASM=0x06
- 偏移量 0x7a: TS=0x07 vs WASM=0x00
- 偏移量 0x7b: TS=0x05 vs WASM=EOF
- 偏移量 0x7c: TS=0x1b vs WASM=EOF
- 偏移量 0x7d: TS=0x0f vs WASM=EOF
- 偏移量 0x7e: TS=0x1c vs WASM=EOF
- 偏移量 0x7f: TS=0x0b vs WASM=EOF
- 偏移量 0x80: TS=0x48 vs WASM=EOF
- 偏移量 0x81: TS=0x14 vs WASM=EOF
- 偏移量 0x82: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 06 6f 62 6a 02 78 46 2e 2e 2f 2e 2e 2f 2e |...obj.xF../../.|
00000010: 2e 2f 2e 2e 2f 2e 2e 2f 74 6d 70 2f 74 65 73 74 |./../../tmp/test|
00000020: 2d 6c 6f 67 69 63 61 6c 33 2e 6a 73 0c 00 06 00 |-logical3.js....|
00000030: a4 01 00 01 00 03 00 00 32 01 a6 01 00 00 00 40 |........2......@|
00000040: e4 00 00 00 01 3f e4 00 00 00 10 0b b7 4e e5 00 |.....?.......N..|
00000050: 00 00 3b e4 00 00 00 39 e4 00 00 00 43 e5 00 00 |..;....9....C...|
00000060: 00 11 ec 0b 0e bc 15 44 e5 00 00 00 ee 02 0f cf |.......D........|
00000070: 28 cc 03 0e 00 00 3e 18 07 0a 07 05 1b 0f 1c 0b |(.....>.........|
00000080: 48 14 00                                        |H..|
```

### WASM
```
00000000: 05 03 06 6f 62 6a 02 78 46 2e 2e 2f 2e 2e 2f 2e |...obj.xF../../.|
00000010: 2e 2f 2e 2e 2f 2e 2e 2f 74 6d 70 2f 74 65 73 74 |./../../tmp/test|
00000020: 2d 6c 6f 67 69 63 61 6c 33 2e 6a 73 0c 00 06 00 |-logical3.js....|
00000030: a4 01 00 01 00 03 00 00 32 01 a6 01 00 00 00 40 |........2......@|
00000040: e4 00 00 00 80 3f e4 00 00 00 80 0b b7 4e e5 00 |.....?.......N..|
00000050: 00 00 3b e4 00 00 00 39 e4 00 00 00 43 e5 00 00 |..;....9....C...|
00000060: 00 11 ec 0b 0e bc 15 44 e5 00 00 00 ee 02 0f cf |.......D........|
00000070: 28 cc 03 06 00 00 7b 00 1b 06 00                |(.....{....|
```