# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/function-add.ts
**生成时间**: 2025-12-02T17:07:51.237Z

## 大小对比

- TypeScript编译器: 147 字节
- WASM编译器: 133 字节
- 差异: 14 字节 (10.53%)

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-add.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xd",
    "remaining": 97
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-add.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xd",
    "remaining": 83
  }
}
```

## 字节级差异

共发现 70 个字节差异:

- 偏移量 0x4a: TS=0xff vs WASM=0x00
- 偏移量 0x4b: TS=0xff vs WASM=0x01
- 偏移量 0x4c: TS=0xff vs WASM=0x08
- 偏移量 0x4d: TS=0xff vs WASM=0xec
- 偏移量 0x4e: TS=0x0f vs WASM=0x05
- 偏移量 0x4f: TS=0x00 vs WASM=0xc2
- 偏移量 0x50: TS=0x08 vs WASM=0x00
- 偏移量 0x51: TS=0xec vs WASM=0xe3
- 偏移量 0x52: TS=0x05 vs WASM=0x29
- 偏移量 0x53: TS=0xc2 vs WASM=0x06
- 偏移量 0x54: TS=0x00 vs WASM=0x2f
- 偏移量 0x55: TS=0xe3 vs WASM=0xc8
- 偏移量 0x56: TS=0x29 vs WASM=0x03
- 偏移量 0x57: TS=0x06 vs WASM=0x02
- 偏移量 0x58: TS=0x2f vs WASM=0x00
- 偏移量 0x59: TS=0xc8 vs WASM=0x00
- 偏移量 0x5a: TS=0x03 vs WASM=0x00
- 偏移量 0x5b: TS=0x02 vs WASM=0x0c
- 偏移量 0x5c: TS=0x00 vs WASM=0x43
- 偏移量 0x5d: TS=0x00 vs WASM=0x06
- ... (显示前20个差异，总共70个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 61 64 64 2e 6a 73 02 61 |unction-add.js.a|
00000030: 02 62 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.b......... ....|
00000040: 00 00 00 01 01 01 09 00 d4 01 ff ff ff ff 0f 00 |................|
00000050: 08 ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 0c |......)./.......|
00000060: 43 06 01 d4 01 02 01 02 02 00 00 09 03 ca 03 00 |C...............|
00000070: 01 00 cc 03 00 01 00 e6 01 00 00 00 0c 03 5b 00 |..............[.|
00000080: 00 d3 d4 9f 28 c8 03 0a 00 00 03 12 07 08 07 03 |....(...........|
00000090: 07 11 00                                        |...|
```

### WASM
```
00000000: 05 03 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 61 64 64 2e 6a 73 02 61 |unction-add.js.a|
00000030: 02 62 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.b......... ....|
00000040: 00 00 00 01 01 01 09 00 d4 01 00 01 08 ec 05 c2 |................|
00000050: 00 e3 29 06 2f c8 03 02 00 00 00 0c 43 06 01 d4 |..)./.......C...|
00000060: 01 02 00 02 02 00 00 04 02 ca 03 00 01 00 cc 03 |................|
00000070: 00 01 00 d3 d4 9f 28 c8 03 0a 00 00 03 12 07 08 |......(.........|
00000080: 07 03 07 11 00                                  |.....|
```