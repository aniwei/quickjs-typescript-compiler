# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/module-exports.ts
**生成时间**: 2025-10-11T18:26:02.477Z

## 大小对比

- TypeScript编译器: 259 字节
- WASM编译器: 269 字节
- 差异: -10 字节 (-3.72%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alpha",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gamma",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "beta",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "helper",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "offset",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 174
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-exports.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "alpha",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gamma",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "beta",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "helper",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "offset",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 184
  }
}
```

## 字节级差异

共发现 49 个字节差异:

- 偏移量 0xd3: TS=0x00 vs WASM=0x01
- 偏移量 0xd4: TS=0x01 vs WASM=0x00
- 偏移量 0xd8: TS=0x10 vs WASM=0x11
- 偏移量 0xd9: TS=0x01 vs WASM=0x02
- 偏移量 0xdf: TS=0xd2 vs WASM=0xd4
- 偏移量 0xe1: TS=0x02 vs WASM=0x01
- 偏移量 0xe2: TS=0x00 vs WASM=0xff
- 偏移量 0xe3: TS=0xd3 vs WASM=0xff
- 偏移量 0xe4: TS=0x11 vs WASM=0xff
- 偏移量 0xe5: TS=0xf4 vs WASM=0xff
- 偏移量 0xe6: TS=0xec vs WASM=0x0f
- 偏移量 0xe7: TS=0x06 vs WASM=0x20
- 偏移量 0xe8: TS=0x0e vs WASM=0xd2
- 偏移量 0xe9: TS=0xb7 vs WASM=0x03
- 偏移量 0xea: TS=0xd7 vs WASM=0x02
- 偏移量 0xeb: TS=0xee vs WASM=0x00
- 偏移量 0xec: TS=0x02 vs WASM=0x63
- 偏移量 0xed: TS=0x0e vs WASM=0x00
- 偏移量 0xee: TS=0xdf vs WASM=0x00
- 偏移量 0xef: TS=0xf0 vs WASM=0xd3
- ... (显示前20个差异，总共49个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2e 6a 73 |odule-exports.js|
00000030: 0a 61 6c 70 68 61 0a 67 61 6d 6d 61 0a 64 65 6c |.alpha.gamma.del|
00000040: 74 61 08 62 65 74 61 0c 68 65 6c 70 65 72 0c 6f |ta.beta.helper.o|
00000050: 66 66 73 65 74 0d c8 03 00 04 00 00 ca 03 00 01 |ffset...........|
00000060: cc 03 00 03 2c 00 04 ce 03 00 00 00 0c 20 06 01 |....,........ ..|
00000070: a4 01 00 00 00 01 05 02 14 00 ca 03 00 0d d0 03 |................|
00000080: 01 0d d2 03 02 01 fc 01 03 09 ce 03 04 01 08 ec |................|
00000090: 0a c2 00 e5 c2 01 61 04 00 29 b8 e3 b9 e4 e1 e6 |......a..)......|
000000a0: 06 2f c8 03 06 00 00 00 10 10 1e 00 0c 43 06 01 |./...........C..|
000000b0: d2 03 00 00 00 01 01 00 04 00 d0 03 01 0c 68 00 |..............h.|
000000c0: 00 28 c8 03 06 03 00 03 12 11 0d 00 0c 41 06 01 |.(...........A..|
000000d0: ce 03 01 00 01 02 01 00 10 01 d4 03 00 01 00 d2 |................|
000000e0: 03 02 00 d3 11 f4 ec 06 0e b7 d7 ee 02 0e df f0 |................|
000000f0: d3 9f 28 c8 03 0c 0a 07 02 30 3a 2b 07 0c 07 0a |..(......0:+....|
00000100: 07 03 00                                        |...|
```

### WASM
```
00000000: 05 07 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 73 2e 6a 73 |odule-exports.js|
00000030: 0a 61 6c 70 68 61 0a 67 61 6d 6d 61 0a 64 65 6c |.alpha.gamma.del|
00000040: 74 61 08 62 65 74 61 0c 68 65 6c 70 65 72 0c 6f |ta.beta.helper.o|
00000050: 66 66 73 65 74 0d c8 03 00 04 00 00 ca 03 00 01 |ffset...........|
00000060: cc 03 00 03 2c 00 04 ce 03 00 00 00 0c 20 06 01 |....,........ ..|
00000070: a4 01 00 00 00 01 05 02 14 00 ca 03 00 0d d0 03 |................|
00000080: 01 0d d2 03 02 01 fc 01 03 09 ce 03 04 01 08 ec |................|
00000090: 0a c2 00 e5 c2 01 61 04 00 29 b8 e3 b9 e4 e1 e6 |......a..)......|
000000a0: 06 2f c8 03 06 00 00 00 10 10 1e 00 0c 43 06 01 |./...........C..|
000000b0: d2 03 00 00 00 01 01 00 04 00 d0 03 01 0c 68 00 |..............h.|
000000c0: 00 28 c8 03 06 03 00 03 12 11 0d 00 0c 41 06 01 |.(...........A..|
000000d0: ce 03 01 01 00 02 01 00 11 02 d4 03 00 01 00 d4 |................|
000000e0: 03 01 ff ff ff ff 0f 20 d2 03 02 00 63 00 00 d3 |....... ....c...|
000000f0: 11 f4 ec 04 0e b7 db cb df f0 d3 9f 28 c8 03 0c |............(...|
00000100: 0a 07 3f 04 07 0c 07 0a 07 03 07 1f 00          |..?..........|
```