# 字节码分析报告

**输入文件**: test-for-of.ts
**生成时间**: 2025-11-26T03:14:01.118Z

## 大小对比

- TypeScript编译器: 91 字节
- WASM编译器: 91 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test-for-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 17
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 21
    }
  ],
  "functionHeader": {
    "offset": 26,
    "tag": "0xd",
    "remaining": 65
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
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test-for-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 17
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 26,
    "tag": "0xd",
    "remaining": 65
  }
}
```

## 字节级差异

共发现 14 个字节差异:

- 偏移量 0x11: TS=0x06 vs WASM=0x08
- 偏移量 0x12: TS=0x61 vs WASM=0x69
- 偏移量 0x13: TS=0x72 vs WASM=0x74
- 偏移量 0x14: TS=0x72 vs WASM=0x65
- 偏移量 0x15: TS=0x08 vs WASM=0x6d
- 偏移量 0x16: TS=0x69 vs WASM=0x06
- 偏移量 0x17: TS=0x74 vs WASM=0x61
- 偏移量 0x18: TS=0x65 vs WASM=0x72
- 偏移量 0x19: TS=0x6d vs WASM=0x72
- 偏移量 0x2b: TS=0x04 vs WASM=0x05
- 偏移量 0x30: TS=0xcc vs WASM=0xca
- 偏移量 0x32: TS=0x00 vs WASM=0x02
- 偏移量 0x34: TS=0x00 vs WASM=0x30
- 偏移量 0x35: TS=0xca vs WASM=0xcc

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 1c 74 65 73 74 2d 66 6f 72 2d 6f 66 2e 6a |...test-for-of.j|
00000010: 73 06 61 72 72 08 69 74 65 6d 0d c8 03 00 00 00 |s.arr.item......|
00000020: 00 00 0c 20 06 01 a4 01 00 01 00 04 01 00 1a 01 |... ............|
00000030: cc 03 00 00 00 ca 03 00 0d 08 ec 02 29 26 00 00 |............)&..|
00000040: e3 63 00 00 68 00 00 7f ee 02 cb 82 00 ec fc 0e |.c..h...........|
00000050: 86 06 2f c8 03 04 00 00 3a 26 00                |../.....:&.|
```

### WASM
```
00000000: 05 03 1c 74 65 73 74 2d 66 6f 72 2d 6f 66 2e 6a |...test-for-of.j|
00000010: 73 08 69 74 65 6d 06 61 72 72 0d c8 03 00 00 00 |s.item.arr......|
00000020: 00 00 0c 20 06 01 a4 01 00 01 00 05 01 00 1a 01 |... ............|
00000030: ca 03 02 00 30 cc 03 00 0d 08 ec 02 29 26 00 00 |....0.......)&..|
00000040: e3 63 00 00 68 00 00 7f ee 02 cb 82 00 ec fc 0e |.c..h...........|
00000050: 86 06 2f c8 03 04 00 00 3a 26 00                |../.....:&.|
```