# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/default-params.ts
**生成时间**: 2025-12-05T02:58:47.651Z

## 大小对比

- TypeScript编译器: 290 字节
- WASM编译器: 322 字节
- 差异: -32 字节 (-9.94%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "defaultBasic",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "defaultExpr",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "defaultRef",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xd",
    "remaining": 206
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "defaultBasic",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "defaultExpr",
      "offset": 61
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "defaultRef",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 84
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 86
    }
  ],
  "functionHeader": {
    "offset": 88,
    "tag": "0xd",
    "remaining": 234
  }
}
```

## 字节级差异

共发现 214 个字节差异:

- 偏移量 0x1: TS=0x04 vs WASM=0x06
- 偏移量 0x54: TS=0x0d vs WASM=0x02
- 偏移量 0x55: TS=0xc8 vs WASM=0x61
- 偏移量 0x56: TS=0x03 vs WASM=0x02
- 偏移量 0x57: TS=0x00 vs WASM=0x62
- 偏移量 0x58: TS=0x00 vs WASM=0x0d
- 偏移量 0x59: TS=0x00 vs WASM=0xc8
- 偏移量 0x5a: TS=0x00 vs WASM=0x03
- 偏移量 0x5c: TS=0x0c vs WASM=0x00
- 偏移量 0x5d: TS=0x20 vs WASM=0x00
- 偏移量 0x5e: TS=0x06 vs WASM=0x00
- 偏移量 0x5f: TS=0x01 vs WASM=0x00
- 偏移量 0x60: TS=0xa4 vs WASM=0x0c
- 偏移量 0x61: TS=0x01 vs WASM=0x20
- 偏移量 0x62: TS=0x00 vs WASM=0x06
- 偏移量 0x63: TS=0x03 vs WASM=0x01
- 偏移量 0x64: TS=0x00 vs WASM=0xa4
- 偏移量 0x65: TS=0x03 vs WASM=0x01
- 偏移量 0x67: TS=0x03 vs WASM=0x00
- 偏移量 0x68: TS=0x1e vs WASM=0x00
- ... (显示前20个差异，总共214个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 66 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 |efault-params.js|
00000030: 18 64 65 66 61 75 6c 74 42 61 73 69 63 16 64 65 |.defaultBasic.de|
00000040: 66 61 75 6c 74 45 78 70 72 14 64 65 66 61 75 6c |faultExpr.defaul|
00000050: 74 52 65 66 0d c8 03 00 00 00 00 00 0c 20 06 01 |tRef......... ..|
00000060: a4 01 00 03 00 03 00 03 1e 03 ca 03 00 00 cc 03 |................|
00000070: 00 00 ce 03 00 00 08 ec 02 29 03 00 00 00 00 5b |.........).....[|
00000080: 00 00 03 01 00 00 00 5b 01 00 03 02 00 00 00 5b |.......[.......[|
00000090: 02 00 06 2f c8 03 06 00 0c 02 00 08 03 00 0c 00 |.../............|
000000a0: 04 00 ca 03 01 00 01 03 00 00 0f 01 d0 03 00 00 |................|
000000b0: d3 11 f4 6c 03 00 00 00 0e b8 db 0e d3 28 29 c8 |...l.........().|
000000c0: 03 03 00 0c 01 00 0c 00 04 00 cc 03 01 00 01 03 |................|
000000d0: 00 00 11 01 d0 03 00 00 d3 11 f4 6c 05 00 00 00 |...........l....|
000000e0: 0e b8 b9 9f db 0e d3 28 29 c8 03 06 00 09 03 00 |.......().......|
000000f0: 05 01 00 0c 00 04 00 ce 03 02 00 02 03 00 00 0f |................|
00000100: 02 d0 03 00 00 d2 03 00 00 d4 11 f4 6c 03 00 00 |............l...|
00000110: 00 0e d3 dc 0e d4 28 29 c8 03 06 00 09 06 00 03 |......()........|
00000120: 01 00                                           |..|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 66 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 |efault-params.js|
00000030: 18 64 65 66 61 75 6c 74 42 61 73 69 63 16 64 65 |.defaultBasic.de|
00000040: 66 61 75 6c 74 45 78 70 72 14 64 65 66 61 75 6c |faultExpr.defaul|
00000050: 74 52 65 66 02 61 02 62 0d c8 03 00 00 00 00 00 |tRef.a.b........|
00000060: 0c 20 06 01 a4 01 00 00 00 01 03 03 0f 00 ca 03 |. ..............|
00000070: 00 01 cc 03 01 01 ce 03 02 01 08 ec 0b c2 00 e3 |................|
00000080: c2 01 e4 c2 02 e5 29 06 2f c8 03 02 00 00 00 0c |......)./.......|
00000090: 41 06 01 ca 03 01 01 00 02 00 00 0e 02 d0 03 00 |A...............|
000000a0: 01 00 d0 03 01 ff ff ff ff 0f 20 63 00 00 d3 11 |.......... c....|
000000b0: f4 ec 04 0e b8 db cb d3 28 c8 03 06 00 00 3f 16 |........(.....?.|
000000c0: 07 0d 00 0c 41 06 01 cc 03 01 01 00 02 00 00 10 |....A...........|
000000d0: 02 d0 03 00 01 00 d0 03 01 ff ff ff ff 0f 20 63 |.............. c|
000000e0: 00 00 d3 11 f4 ec 06 0e b8 b9 9f db cb d3 28 c8 |..............(.|
000000f0: 03 08 03 00 39 36 12 1f 07 0d 00 0c 41 06 01 ce |....96......A...|
00000100: 03 02 02 01 02 00 00 15 04 d0 03 00 01 00 d2 03 |................|
00000110: 00 01 00 d0 03 01 ff ff ff ff 0f 20 d2 03 01 01 |........... ....|
00000120: 20 63 01 00 63 00 00 d3 cb d4 11 f4 ec 06 0e 64 | c..c..........d|
00000130: 00 00 dc cc d4 28 c8 03 08 06 00 48 36 1c 1f 07 |.....(.....H6...|
00000140: 0d 00                                           |..|
```