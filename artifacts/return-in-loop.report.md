# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/return-in-loop.ts
**生成时间**: 2025-12-05T02:05:06.207Z

## 大小对比

- TypeScript编译器: 97 字节
- WASM编译器: 151 字节
- 差异: -54 字节 (-35.76%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/return-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 44
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/return-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 96
  }
}
```

## 字节级差异

共发现 88 个字节差异:

- 偏移量 0x1: TS=0x02 vs WASM=0x03
- 偏移量 0x35: TS=0x0d vs WASM=0x02
- 偏移量 0x36: TS=0xc8 vs WASM=0x78
- 偏移量 0x37: TS=0x03 vs WASM=0x0d
- 偏移量 0x38: TS=0x00 vs WASM=0xc8
- 偏移量 0x39: TS=0x00 vs WASM=0x03
- 偏移量 0x3d: TS=0x0c vs WASM=0x00
- 偏移量 0x3e: TS=0x20 vs WASM=0x00
- 偏移量 0x3f: TS=0x06 vs WASM=0x0c
- 偏移量 0x40: TS=0x01 vs WASM=0x20
- 偏移量 0x41: TS=0xa4 vs WASM=0x06
- 偏移量 0x43: TS=0x00 vs WASM=0xa4
- 偏移量 0x46: TS=0x03 vs WASM=0x00
- 偏移量 0x49: TS=0x0e vs WASM=0x01
- 偏移量 0x4b: TS=0xca vs WASM=0x09
- 偏移量 0x4c: TS=0x03 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=0xca
- 偏移量 0x4e: TS=0x00 vs WASM=0x03
- 偏移量 0x4f: TS=0x08 vs WASM=0x00
- 偏移量 0x50: TS=0xec vs WASM=0x01
- ... (显示前20个差异，总共88个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 74 75 72 6e 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 |eturn-in-loop.js|
00000030: 08 74 65 73 74 0d c8 03 00 00 00 00 00 0c 20 06 |.test......... .|
00000040: 01 a4 01 00 01 00 03 00 01 0e 01 ca 03 00 00 08 |................|
00000050: ec 02 29 03 00 00 00 00 5b 00 00 06 2f c8 03 00 |..).....[.../...|
00000060: 00                                              |.|
```

### WASM
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 74 75 72 6e 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 |eturn-in-loop.js|
00000030: 08 74 65 73 74 02 78 0d c8 03 00 00 00 00 00 0c |.test.x.........|
00000040: 20 06 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 | ...............|
00000050: 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 |.......)./......|
00000060: 0c 43 06 01 ca 03 00 01 00 05 00 00 1a 01 cc 03 |.C..............|
00000070: 02 00 30 63 00 00 b8 26 01 00 7f ee 0a cb 64 00 |..0c...&......d.|
00000080: 00 72 1e 06 86 28 82 00 ec f4 0e 86 29 c8 03 06 |.r...(......)...|
00000090: 00 00 3b 1e 11 0d 00                            |..;....|
```