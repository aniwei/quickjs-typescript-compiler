# 字节码分析报告

**输入文件**: test-for-of-var.ts
**生成时间**: 2025-11-26T03:14:14.730Z

## 大小对比

- TypeScript编译器: 95 字节
- WASM编译器: 89 字节
- 差异: 6 字节 (6.74%)

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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test-for-of-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 21
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 30,
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test-for-of-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 21
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 30,
    "tag": "0xd",
    "remaining": 59
  }
}
```

## 字节级差异

共发现 44 个字节差异:

- 偏移量 0x2d: TS=0x01 vs WASM=0x00
- 偏移量 0x2f: TS=0x04 vs WASM=0x05
- 偏移量 0x30: TS=0x01 vs WASM=0x02
- 偏移量 0x32: TS=0x1a vs WASM=0x15
- 偏移量 0x33: TS=0x01 vs WASM=0x00
- 偏移量 0x34: TS=0xcc vs WASM=0xca
- 偏移量 0x37: TS=0x00 vs WASM=0x01
- 偏移量 0x38: TS=0x00 vs WASM=0xcc
- 偏移量 0x39: TS=0xca vs WASM=0x03
- 偏移量 0x3a: TS=0x03 vs WASM=0x01
- 偏移量 0x3b: TS=0x00 vs WASM=0x01
- 偏移量 0x3c: TS=0x09 vs WASM=0x08
- 偏移量 0x3d: TS=0x08 vs WASM=0xec
- 偏移量 0x3e: TS=0xec vs WASM=0x02
- 偏移量 0x3f: TS=0x02 vs WASM=0x29
- 偏移量 0x40: TS=0x29 vs WASM=0x26
- 偏移量 0x41: TS=0x26 vs WASM=0x00
- 偏移量 0x43: TS=0x00 vs WASM=0xe3
- 偏移量 0x44: TS=0xe3 vs WASM=0xdf
- 偏移量 0x45: TS=0x63 vs WASM=0x7f
- ... (显示前20个差异，总共44个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 24 74 65 73 74 2d 66 6f 72 2d 6f 66 2d 76 |..$test-for-of-v|
00000010: 61 72 2e 6a 73 06 61 72 72 08 69 74 65 6d 0d c8 |ar.js.arr.item..|
00000020: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 04 |....... ........|
00000030: 01 00 1a 01 cc 03 00 00 00 ca 03 00 09 08 ec 02 |................|
00000040: 29 26 00 00 e3 63 00 00 68 00 00 7f ee 02 cb 82 |)&...c..h.......|
00000050: 00 ec fc 0e 86 06 2f c8 03 04 00 00 3a 22 00    |....../.....:".|
```

### WASM
```
00000000: 05 03 24 74 65 73 74 2d 66 6f 72 2d 6f 66 2d 76 |..$test-for-of-v|
00000010: 61 72 2e 6a 73 06 61 72 72 08 69 74 65 6d 0d c8 |ar.js.arr.item..|
00000020: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 05 |....... ........|
00000030: 02 00 15 00 ca 03 00 01 cc 03 01 01 08 ec 02 29 |...............)|
00000040: 26 00 00 e3 df 7f ee 02 e4 82 00 ec fc 0e 86 06 |&...............|
00000050: 2f c8 03 04 00 00 2b 22 00                      |/.....+".|
```