# 字节码分析报告

**输入文件**: /tmp/test-logical.ts
**生成时间**: 2025-12-16T13:22:54.631Z

## 大小对比

- TypeScript编译器: 107 字节
- WASM编译器: 103 字节
- 差异: 4 字节 (3.88%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical.js",
      "offset": 4
    }
  ],
  "functionHeader": {
    "offset": 39,
    "tag": "0xc",
    "remaining": 68
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical.js",
      "offset": 4
    }
  ],
  "functionHeader": {
    "offset": 39,
    "tag": "0xc",
    "remaining": 64
  }
}
```

## 字节级差异

共发现 10 个字节差异:

- 偏移量 0x3f: TS=0x00 vs WASM=0x80
- 偏移量 0x45: TS=0x12 vs WASM=0x82
- 偏移量 0x61: TS=0x08 vs WASM=0x04
- 偏移量 0x64: TS=0x3e vs WASM=0x5d
- 偏移量 0x65: TS=0x10 vs WASM=0x00
- 偏移量 0x66: TS=0x07 vs WASM=0x00
- 偏移量 0x67: TS=0x07 vs WASM=EOF
- 偏移量 0x68: TS=0x4e vs WASM=EOF
- 偏移量 0x69: TS=0x04 vs WASM=EOF
- 偏移量 0x6a: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 02 61 44 2e 2e 2f 2e 2e 2f 2e 2e 2f 2e 2e |...aD../../../..|
00000010: 2f 2e 2e 2f 74 6d 70 2f 74 65 73 74 2d 6c 6f 67 |/../tmp/test-log|
00000020: 69 63 61 6c 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |ical.js.........|
00000030: 04 00 00 25 01 a6 01 00 00 00 40 e4 00 00 00 00 |...%......@.....|
00000040: 3f e4 00 00 00 12 b7 3b e4 00 00 00 7d e4 00 00 |?......;....}...|
00000050: 00 3d 11 ed 07 0e b8 16 3e ee 03 0f 0f cf 28 ca |.=......>.....(.|
00000060: 03 08 00 00 3e 10 07 07 4e 04 00                |....>...N..|
```

### WASM
```
00000000: 05 02 02 61 44 2e 2e 2f 2e 2e 2f 2e 2e 2f 2e 2e |...aD../../../..|
00000010: 2f 2e 2e 2f 74 6d 70 2f 74 65 73 74 2d 6c 6f 67 |/../tmp/test-log|
00000020: 69 63 61 6c 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |ical.js.........|
00000030: 04 00 00 25 01 a6 01 00 00 00 40 e4 00 00 00 80 |...%......@.....|
00000040: 3f e4 00 00 00 82 b7 3b e4 00 00 00 7d e4 00 00 |?......;....}...|
00000050: 00 3d 11 ed 07 0e b8 16 3e ee 03 0f 0f cf 28 ca |.=......>.....(.|
00000060: 03 04 00 00 5d 00 00                            |....]..|
```