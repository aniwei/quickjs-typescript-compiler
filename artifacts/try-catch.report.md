# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/try-catch.ts
**生成时间**: 2025-12-05T01:11:25.953Z

## 大小对比

- TypeScript编译器: 100 字节
- WASM编译器: 103 字节
- 差异: -3 字节 (-2.91%)

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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xd",
    "remaining": 55
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/try-catch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xd",
    "remaining": 58
  }
}
```

## 字节级差异

共发现 30 个字节差异:

- 偏移量 0x3e: TS=0x03 vs WASM=0x02
- 偏移量 0x41: TS=0x16 vs WASM=0x17
- 偏移量 0x45: TS=0x00 vs WASM=0x03
- 偏移量 0x47: TS=0x08 vs WASM=0x03
- 偏移量 0x48: TS=0xec vs WASM=0x08
- 偏移量 0x49: TS=0x02 vs WASM=0xec
- 偏移量 0x4a: TS=0x29 vs WASM=0x02
- 偏移量 0x4b: TS=0x6f vs WASM=0x29
- 偏移量 0x4c: TS=0x08 vs WASM=0x6f
- 偏移量 0x4d: TS=0x00 vs WASM=0x06
- 偏移量 0x50: TS=0xb8 vs WASM=0x00
- 偏移量 0x51: TS=0x30 vs WASM=0xb8
- 偏移量 0x52: TS=0x0e vs WASM=0x30
- 偏移量 0x53: TS=0x6e vs WASM=0xcb
- 偏移量 0x54: TS=0x03 vs WASM=0x6f
- 偏移量 0x55: TS=0x00 vs WASM=0x07
- 偏移量 0x58: TS=0x5b vs WASM=0x00
- 偏移量 0x59: TS=0x00 vs WASM=0x0e
- 偏移量 0x5a: TS=0x00 vs WASM=0xee
- 偏移量 0x5b: TS=0x06 vs WASM=0x02
- ... (显示前20个差异，总共30个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2e 6a 73 02 65 0d c8 03 |ry-catch.js.e...|
00000030: 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 00 |...... .........|
00000040: 00 16 01 ca 03 00 00 08 ec 02 29 6f 08 00 00 00 |..........)o....|
00000050: b8 30 0e 6e 03 00 00 00 5b 00 00 06 2f c8 03 03 |.0.n....[.../...|
00000060: 00 09 01 00                                     |....|
```

### WASM
```
00000000: 05 02 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 72 79 2d 63 61 74 63 68 2e 6a 73 02 65 0d c8 03 |ry-catch.js.e...|
00000030: 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 02 00 |...... .........|
00000040: 00 17 01 ca 03 03 00 03 08 ec 02 29 6f 06 00 00 |...........)o...|
00000050: 00 b8 30 cb 6f 07 00 00 00 0e ee 02 30 06 2f c8 |..0.o.......0./.|
00000060: 03 04 00 00 35 08 00                            |....5..|
```