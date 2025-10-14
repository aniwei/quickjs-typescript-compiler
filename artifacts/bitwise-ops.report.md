# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/bitwise-ops.ts
**生成时间**: 2025-10-14T16:27:43.710Z

## 大小对比

- TypeScript编译器: 543 字节
- WASM编译器: 545 字节
- 差异: -2 字节 (-0.37%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 16,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/bitwise-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseOps",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mask",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ctor",
      "offset": 65
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shiftLeft",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "shiftRight",
      "offset": 80
    },
    {
      "index": 7,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shiftUnsigned",
      "offset": 91
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "power",
      "offset": 105
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseAnd",
      "offset": 111
    },
    {
      "index": 10,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "bitwiseOr",
      "offset": 122
    },
    {
      "index": 11,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseXor",
      "offset": 132
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hasKey",
      "offset": 143
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "isInstance",
      "offset": 150
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 161
    },
    {
      "index": 15,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 166
    }
  ],
  "functionHeader": {
    "offset": 170,
    "tag": "0xd",
    "remaining": 373
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 16,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/bitwise-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseOps",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mask",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ctor",
      "offset": 65
    },
    {
      "index": 5,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shiftLeft",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "shiftRight",
      "offset": 80
    },
    {
      "index": 7,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shiftUnsigned",
      "offset": 91
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "power",
      "offset": 105
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseAnd",
      "offset": 111
    },
    {
      "index": 10,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "bitwiseOr",
      "offset": 122
    },
    {
      "index": 11,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseXor",
      "offset": 132
    },
    {
      "index": 12,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hasKey",
      "offset": 143
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "isInstance",
      "offset": 150
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 161
    },
    {
      "index": 15,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 166
    }
  ],
  "functionHeader": {
    "offset": 170,
    "tag": "0xd",
    "remaining": 375
  }
}
```

## 字节级差异

共发现 85 个字节差异:

- 偏移量 0x1bb: TS=0x62 vs WASM=0x64
- 偏移量 0x1bd: TS=0x00 vs WASM=0x07
- 偏移量 0x1bf: TS=0x28 vs WASM=0x1a
- 偏移量 0x1c2: TS=0x21 vs WASM=0x0d
- 偏移量 0x1c3: TS=0x03 vs WASM=0x09
- 偏移量 0x1c7: TS=0x1b vs WASM=0x05
- 偏移量 0x1cb: TS=0x01 vs WASM=0x1b
- 偏移量 0x1cc: TS=0x07 vs WASM=0x0c
- 偏移量 0x1cd: TS=0x10 vs WASM=0x0c
- 偏移量 0x1ce: TS=0x07 vs WASM=0x0d
- 偏移量 0x1cf: TS=0x03 vs WASM=0x01
- 偏移量 0x1d0: TS=0x12 vs WASM=0x07
- 偏移量 0x1d1: TS=0x0d vs WASM=0x10
- 偏移量 0x1d3: TS=0x10 vs WASM=0x03
- 偏移量 0x1d4: TS=0x07 vs WASM=0x12
- 偏移量 0x1d5: TS=0x03 vs WASM=0x0d
- 偏移量 0x1d6: TS=0x12 vs WASM=0x07
- 偏移量 0x1d7: TS=0x09 vs WASM=0x10
- 偏移量 0x1d9: TS=0x10 vs WASM=0x03
- 偏移量 0x1da: TS=0x07 vs WASM=0x12
- ... (显示前20个差异，总共85个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 10 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 14 62 69 |itwise-ops.js.bi|
00000030: 74 77 69 73 65 4f 70 73 08 6d 61 73 6b 06 6f 62 |twiseOps.mask.ob|
00000040: 6a 08 63 74 6f 72 12 73 68 69 66 74 4c 65 66 74 |j.ctor.shiftLeft|
00000050: 14 73 68 69 66 74 52 69 67 68 74 1a 73 68 69 66 |.shiftRight.shif|
00000060: 74 55 6e 73 69 67 6e 65 64 0a 70 6f 77 65 72 14 |tUnsigned.power.|
00000070: 62 69 74 77 69 73 65 41 6e 64 12 62 69 74 77 69 |bitwiseAnd.bitwi|
00000080: 73 65 4f 72 14 62 69 74 77 69 73 65 58 6f 72 0c |seOr.bitwiseXor.|
00000090: 68 61 73 4b 65 79 14 69 73 49 6e 73 74 61 6e 63 |hasKey.isInstanc|
000000a0: 65 08 62 61 73 65 06 6b 65 79 0d c8 03 00 01 00 |e.base.key......|
000000b0: 00 ca 03 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |....... ........|
000000c0: 01 01 09 00 ca 03 00 01 08 ec 05 c2 00 e3 29 06 |..............).|
000000d0: 2f c8 03 02 00 00 00 0c 43 06 01 ca 03 04 0a 04 |/.......C.......|
000000e0: 02 00 00 8d 01 0e 84 01 00 01 00 cc 03 00 01 00 |................|
000000f0: ce 03 00 01 00 d0 03 00 01 00 d2 03 01 00 30 d4 |..............0.|
00000100: 03 01 01 30 d6 03 01 02 30 d8 03 01 03 30 da 03 |...0....0....0..|
00000110: 01 04 30 dc 03 01 05 30 de 03 01 06 30 e0 03 01 |..0....0....0...|
00000120: 07 30 e2 03 01 08 30 e4 03 01 09 30 63 09 00 63 |.0....0....0c..c|
00000130: 08 00 63 07 00 63 06 00 63 05 00 63 04 00 63 03 |..c..c..c..c..c.|
00000140: 00 63 02 00 63 01 00 63 00 00 d3 b9 a2 cb d3 b8 |.c..c..c........|
00000150: a3 cc d3 b8 a4 cd d3 ba a1 ce d3 d4 af c5 04 d3 |................|
00000160: d4 b1 c5 05 d3 d4 b0 c5 06 04 f3 00 00 00 d5 aa |................|
00000170: c5 07 d5 d6 a9 c5 08 64 00 00 64 01 00 9f 64 02 |.......d..d...d.|
00000180: 00 9f 64 03 00 9f 64 04 00 9f 64 05 00 9f 64 06 |..d...d...d...d.|
00000190: 00 9f c5 09 64 07 00 ec 12 64 08 00 ec 07 64 09 |....d....d....d.|
000001a0: 00 b9 9f 28 64 09 00 b8 9f 28 64 08 00 ec 07 64 |...(d....(d....d|
000001b0: 09 00 b8 9f 28 64 09 00 28 c8 03 62 00 00 99 28 |....(d..(..b...(|
000001c0: 0c 0c 21 03 0c 0c 0d 1b 0c 0c 0d 01 07 10 07 03 |..!.............|
000001d0: 12 0d 07 10 07 03 12 09 07 10 07 03 12 13 1b 12 |................|
000001e0: 07 05 12 03 07 1e 07 15 14 29 12 00 10 14 09 13 |.........)......|
000001f0: 10 16 09 15 10 1c 09 1b 10 0c 09 0b 10 16 09 15 |................|
00000200: 10 14 14 0f 1c 00 1c 0e 16 0a 07 17 09 0a 16 0a |................|
00000210: 07 17 0a 04 1c 0a 16 0a 07 17 0a 0a 11 0d 00    |...............|
```

### WASM
```
00000000: 05 10 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 14 62 69 |itwise-ops.js.bi|
00000030: 74 77 69 73 65 4f 70 73 08 6d 61 73 6b 06 6f 62 |twiseOps.mask.ob|
00000040: 6a 08 63 74 6f 72 12 73 68 69 66 74 4c 65 66 74 |j.ctor.shiftLeft|
00000050: 14 73 68 69 66 74 52 69 67 68 74 1a 73 68 69 66 |.shiftRight.shif|
00000060: 74 55 6e 73 69 67 6e 65 64 0a 70 6f 77 65 72 14 |tUnsigned.power.|
00000070: 62 69 74 77 69 73 65 41 6e 64 12 62 69 74 77 69 |bitwiseAnd.bitwi|
00000080: 73 65 4f 72 14 62 69 74 77 69 73 65 58 6f 72 0c |seOr.bitwiseXor.|
00000090: 68 61 73 4b 65 79 14 69 73 49 6e 73 74 61 6e 63 |hasKey.isInstanc|
000000a0: 65 08 62 61 73 65 06 6b 65 79 0d c8 03 00 01 00 |e.base.key......|
000000b0: 00 ca 03 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |....... ........|
000000c0: 01 01 09 00 ca 03 00 01 08 ec 05 c2 00 e3 29 06 |..............).|
000000d0: 2f c8 03 02 00 00 00 0c 43 06 01 ca 03 04 0a 04 |/.......C.......|
000000e0: 02 00 00 8d 01 0e 84 01 00 01 00 cc 03 00 01 00 |................|
000000f0: ce 03 00 01 00 d0 03 00 01 00 d2 03 01 00 30 d4 |..............0.|
00000100: 03 01 01 30 d6 03 01 02 30 d8 03 01 03 30 da 03 |...0....0....0..|
00000110: 01 04 30 dc 03 01 05 30 de 03 01 06 30 e0 03 01 |..0....0....0...|
00000120: 07 30 e2 03 01 08 30 e4 03 01 09 30 63 09 00 63 |.0....0....0c..c|
00000130: 08 00 63 07 00 63 06 00 63 05 00 63 04 00 63 03 |..c..c..c..c..c.|
00000140: 00 63 02 00 63 01 00 63 00 00 d3 b9 a2 cb d3 b8 |.c..c..c........|
00000150: a3 cc d3 b8 a4 cd d3 ba a1 ce d3 d4 af c5 04 d3 |................|
00000160: d4 b1 c5 05 d3 d4 b0 c5 06 04 f3 00 00 00 d5 aa |................|
00000170: c5 07 d5 d6 a9 c5 08 64 00 00 64 01 00 9f 64 02 |.......d..d...d.|
00000180: 00 9f 64 03 00 9f 64 04 00 9f 64 05 00 9f 64 06 |..d...d...d...d.|
00000190: 00 9f c5 09 64 07 00 ec 12 64 08 00 ec 07 64 09 |....d....d....d.|
000001a0: 00 b9 9f 28 64 09 00 b8 9f 28 64 08 00 ec 07 64 |...(d....(d....d|
000001b0: 09 00 b8 9f 28 64 09 00 28 c8 03 64 00 07 99 1a |....(d..(..d....|
000001c0: 0c 0c 0d 09 0c 0c 0d 05 0c 0c 0d 1b 0c 0c 0d 01 |................|
000001d0: 07 10 07 03 12 0d 07 10 07 03 12 09 07 10 07 03 |................|
000001e0: 2b 01 07 05 12 03 07 1e 07 15 14 29 12 00 10 14 |+..........)....|
000001f0: 09 13 10 16 09 15 10 1c 09 1b 10 0c 09 0b 10 16 |................|
00000200: 09 15 10 14 14 0f 1c 04 1c 0a 16 0a 07 17 09 0a |................|
00000210: 16 0a 07 17 0a 04 1c 0a 16 0a 07 17 0a 0a 11 0d |................|
00000220: 00                                              |.|
```