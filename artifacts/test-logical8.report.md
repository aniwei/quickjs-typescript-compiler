# 字节码分析报告

**输入文件**: /tmp/test-logical8.ts
**生成时间**: 2025-12-16T14:01:28.102Z

## 大小对比

- TypeScript编译器: 98 字节
- WASM编译器: 94 字节
- 差异: 4 字节 (4.26%)

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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical8.js",
      "offset": 9
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xc",
    "remaining": 53
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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "../../../../../tmp/test-logical8.js",
      "offset": 9
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xc",
    "remaining": 49
  }
}
```

## 字节级差异

共发现 8 个字节差异:

- 偏移量 0x45: TS=0x00 vs WASM=0x80
- 偏移量 0x4b: TS=0x12 vs WASM=0x82
- 偏移量 0x5a: TS=0x06 vs WASM=0x02
- 偏移量 0x5d: TS=0x3e vs WASM=0x00
- 偏移量 0x5e: TS=0x10 vs WASM=EOF
- 偏移量 0x5f: TS=0x1b vs WASM=EOF
- 偏移量 0x60: TS=0x07 vs WASM=EOF
- 偏移量 0x61: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 02 62 08 74 65 73 74 46 2e 2e 2f 2e 2e 2f |...b.testF../../|
00000010: 2e 2e 2f 2e 2e 2f 2e 2e 2f 74 6d 70 2f 74 65 73 |../../../tmp/tes|
00000020: 74 2d 6c 6f 67 69 63 61 6c 38 2e 6a 73 0c 00 06 |t-logical8.js...|
00000030: 00 a4 01 00 01 00 01 00 00 18 01 a6 01 00 00 00 |................|
00000040: 40 e4 00 00 00 00 3f e4 00 00 00 12 04 e5 00 00 |@.....?.........|
00000050: 00 3b e4 00 00 00 c7 28 cc 03 06 00 00 3e 10 1b |.;.....(.....>..|
00000060: 07 00                                           |..|
```

### WASM
```
00000000: 05 03 02 62 08 74 65 73 74 46 2e 2e 2f 2e 2e 2f |...b.testF../../|
00000010: 2e 2e 2f 2e 2e 2f 2e 2e 2f 74 6d 70 2f 74 65 73 |../../../tmp/tes|
00000020: 74 2d 6c 6f 67 69 63 61 6c 38 2e 6a 73 0c 00 06 |t-logical8.js...|
00000030: 00 a4 01 00 01 00 01 00 00 18 01 a6 01 00 00 00 |................|
00000040: 40 e4 00 00 00 80 3f e4 00 00 00 82 04 e5 00 00 |@.....?.........|
00000050: 00 3b e4 00 00 00 c7 28 cc 03 02 00 00 00       |.;.....(......|
```