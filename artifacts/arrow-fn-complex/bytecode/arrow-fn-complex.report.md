# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-complex.ts
**生成时间**: 2025-12-07T03:50:04.759Z

## 大小对比

- TypeScript编译器: 211 字节
- WASM编译器: 227 字节
- 差异: -16 字节 (-7.05%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 137
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-complex.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "complex",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 72
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 153
  }
}
```

## 字节级差异

共发现 120 个字节差异:

- 偏移量 0x3a: TS=0x02 vs WASM=0x0e
- 偏移量 0x3b: TS=0x78 vs WASM=0x63
- 偏移量 0x3c: TS=0x02 vs WASM=0x6f
- 偏移量 0x3d: TS=0x79 vs WASM=0x6e
- 偏移量 0x3e: TS=0x0e vs WASM=0x73
- 偏移量 0x3f: TS=0x63 vs WASM=0x6f
- 偏移量 0x40: TS=0x6f vs WASM=0x6c
- 偏移量 0x41: TS=0x6e vs WASM=0x65
- 偏移量 0x42: TS=0x73 vs WASM=0x06
- 偏移量 0x43: TS=0x6f vs WASM=0x6c
- 偏移量 0x44: TS=0x6c vs WASM=0x6f
- 偏移量 0x45: TS=0x65 vs WASM=0x67
- 偏移量 0x46: TS=0x06 vs WASM=0x02
- 偏移量 0x47: TS=0x6c vs WASM=0x78
- 偏移量 0x48: TS=0x6f vs WASM=0x02
- 偏移量 0x49: TS=0x67 vs WASM=0x79
- 偏移量 0x5e: TS=0x1c vs WASM=0x21
- 偏移量 0x6a: TS=0xe3 vs WASM=0x4f
- 偏移量 0x6b: TS=0x39 vs WASM=0xe5
- 偏移量 0x6c: TS=0xe8 vs WASM=0x00
- ... (显示前20个差异，总共120个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 63 6f 6d 70 6c 65 78 2e |rrow-fn-complex.|
00000030: 6a 73 0e 63 6f 6d 70 6c 65 78 02 78 02 79 0e 63 |js.complex.x.y.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 01 01 1c 00 |... ............|
00000060: ca 03 00 0d 08 ec 02 29 c2 00 e3 39 e8 00 00 00 |.......)...9....|
00000070: 43 e9 00 00 00 68 00 00 bc f1 24 01 00 0e 06 2f |C....h....$..../|
00000080: c8 03 0e 00 00 00 07 0e 00 1b 0e 1b 0a 16 0e 07 |................|
00000090: 0f 00 0c 02 04 01 02 01 01 01 02 00 00 18 02 cc |................|
000000a0: 03 00 01 00 ce 03 02 00 30 63 00 bf 0a cb d3 64 |........0c.....d|
000000b0: 00 00 a7 ec 07 d3 64 00 00 a0 28 64 00 00 d3 a0 |......d...(d....|
000000c0: 28 c8 03 0e 00 00 22 14 11 03 17 0e 11 03 0e 07 |(.....".........|
000000d0: 16 04 00                                        |...|
```

### WASM
```
00000000: 05 06 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 63 6f 6d 70 6c 65 78 2e |rrow-fn-complex.|
00000030: 6a 73 0e 63 6f 6d 70 6c 65 78 0e 63 6f 6e 73 6f |js.complex.conso|
00000040: 6c 65 06 6c 6f 67 02 78 02 79 0d c8 03 00 00 00 |le.log.x.y......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 01 01 21 00 |... ..........!.|
00000060: ca 03 00 0d 08 ec 02 29 c2 00 4f e5 00 00 00 e3 |.......)..O.....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 00 00 bc f1 24 |9....C....h....$|
00000080: 01 00 0e 06 2f c8 03 0e 00 00 00 0c 0e 00 1b 0e |..../...........|
00000090: 1b 0a 16 0e 07 0f 00 0c 02 06 01 00 01 01 01 02 |................|
000000a0: 00 00 19 02 d0 03 00 01 00 d2 03 01 00 30 63 00 |.............0c.|
000000b0: 00 bf 0a cb d3 64 00 00 a7 ec 07 d3 64 00 00 a0 |.....d......d...|
000000c0: 28 64 00 00 d3 a0 28 c8 03 18 00 10 22 0f 07 08 |(d....(....."...|
000000d0: 11 03 12 0a 07 08 11 03 07 11 09 06 11 08 07 03 |................|
000000e0: 07 11 00                                        |...|
```