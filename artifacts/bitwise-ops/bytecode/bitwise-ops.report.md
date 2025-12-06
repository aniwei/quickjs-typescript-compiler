# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/bitwise-ops.ts
**生成时间**: 2025-12-06T02:09:56.267Z

## 大小对比

- TypeScript编译器: 508 字节
- WASM编译器: 545 字节
- 差异: -37 字节 (-6.79%)

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
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shiftLeft",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "shiftRight",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shiftUnsigned",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "power",
      "offset": 91
    },
    {
      "index": 6,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseAnd",
      "offset": 97
    },
    {
      "index": 7,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "bitwiseOr",
      "offset": 108
    },
    {
      "index": 8,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bitwiseXor",
      "offset": 118
    },
    {
      "index": 9,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "hasKey",
      "offset": 129
    },
    {
      "index": 10,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "isInstance",
      "offset": 136
    },
    {
      "index": 11,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "base",
      "offset": 147
    },
    {
      "index": 12,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "mask",
      "offset": 152
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 157
    },
    {
      "index": 14,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ctor",
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
    "remaining": 338
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

共发现 424 个字节差异:

- 偏移量 0x38: TS=0x12 vs WASM=0x08
- 偏移量 0x39: TS=0x73 vs WASM=0x6d
- 偏移量 0x3a: TS=0x68 vs WASM=0x61
- 偏移量 0x3b: TS=0x69 vs WASM=0x73
- 偏移量 0x3c: TS=0x66 vs WASM=0x6b
- 偏移量 0x3d: TS=0x74 vs WASM=0x06
- 偏移量 0x3e: TS=0x4c vs WASM=0x6f
- 偏移量 0x3f: TS=0x65 vs WASM=0x62
- 偏移量 0x40: TS=0x66 vs WASM=0x6a
- 偏移量 0x41: TS=0x74 vs WASM=0x08
- 偏移量 0x42: TS=0x14 vs WASM=0x63
- 偏移量 0x43: TS=0x73 vs WASM=0x74
- 偏移量 0x44: TS=0x68 vs WASM=0x6f
- 偏移量 0x45: TS=0x69 vs WASM=0x72
- 偏移量 0x46: TS=0x66 vs WASM=0x12
- 偏移量 0x47: TS=0x74 vs WASM=0x73
- 偏移量 0x48: TS=0x52 vs WASM=0x68
- 偏移量 0x4a: TS=0x67 vs WASM=0x66
- 偏移量 0x4b: TS=0x68 vs WASM=0x74
- 偏移量 0x4c: TS=0x74 vs WASM=0x4c
- ... (显示前20个差异，总共424个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 10 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 62 |piler/fixtures/b|
00000020: 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 14 62 69 |itwise-ops.js.bi|
00000030: 74 77 69 73 65 4f 70 73 12 73 68 69 66 74 4c 65 |twiseOps.shiftLe|
00000040: 66 74 14 73 68 69 66 74 52 69 67 68 74 1a 73 68 |ft.shiftRight.sh|
00000050: 69 66 74 55 6e 73 69 67 6e 65 64 0a 70 6f 77 65 |iftUnsigned.powe|
00000060: 72 14 62 69 74 77 69 73 65 41 6e 64 12 62 69 74 |r.bitwiseAnd.bit|
00000070: 77 69 73 65 4f 72 14 62 69 74 77 69 73 65 58 6f |wiseOr.bitwiseXo|
00000080: 72 0c 68 61 73 4b 65 79 14 69 73 49 6e 73 74 61 |r.hasKey.isInsta|
00000090: 6e 63 65 08 62 61 73 65 08 6d 61 73 6b 06 6f 62 |nce.base.mask.ob|
000000a0: 6a 08 63 74 6f 72 06 6b 65 79 0d c8 03 00 01 00 |j.ctor.key......|
000000b0: 00 00 01 00 ca 03 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
000000c0: 01 01 09 00 ca 03 00 01 08 ec 05 c2 00 e3 29 06 |..............).|
000000d0: 2f c8 03 00 00 00 0c 42 06 00 ca 03 04 0a 04 03 |/......B........|
000000e0: 00 00 86 01 0e 84 01 00 00 00 e0 03 00 00 00 e2 |................|
000000f0: 03 00 00 00 e4 03 00 00 00 cc 03 01 00 30 ce 03 |.............0..|
00000100: 01 00 30 d0 03 01 01 30 d2 03 01 02 30 d4 03 01 |..0....0....0...|
00000110: 03 30 d6 03 01 04 30 d8 03 01 05 30 da 03 01 06 |.0....0....0....|
00000120: 30 dc 03 01 07 30 de 03 01 08 30 d3 b9 a2 cb d3 |0....0....0.....|
00000130: b8 a3 cc d3 b8 a4 cd d3 ba a1 ce d3 d4 af 5b 04 |..............[.|
00000140: 00 d3 d4 b1 5b 05 00 d3 d4 b0 5b 06 00 04 f3 00 |....[.....[.....|
00000150: 00 00 d5 aa 5b 07 00 d5 d6 a9 5b 08 00 c7 c8 9f |....[.....[.....|
00000160: c9 9f ca 9f 5a 04 00 9f 5a 05 00 9f 5a 06 00 9f |....Z...Z...Z...|
00000170: 5b 09 00 5a 07 00 6c 22 00 00 00 5a 08 00 6c 0f |[..Z..l"...Z..l.|
00000180: 00 00 00 5a 09 00 b9 9f 28 6e 04 00 00 00 5a 09 |...Z....(n....Z.|
00000190: 00 b8 9f 28 6e 04 00 00 00 5a 08 00 6c 0f 00 00 |...(n....Z..l...|
000001a0: 00 5a 09 00 b8 9f 28 6e 04 00 00 00 5a 09 00 28 |.Z....(n....Z..(|
000001b0: 29 c8 03 00 46 03 14 07 09 12 78 07 09 12 7a 07 |)...F.....x...z.|
000001c0: 0a 12 6e 07 09 12 7c 07 08 1c 77 07 08 1c 79 07 |..n...|...w...y.|
000001d0: 08 1c 74 1b 09 1c 7b 07 0f 1e 60 08 00 0d 00 0d |..t...{...`.....|
000001e0: 00 0d 00 17 00 17 00 27 02 2b 02 2b 05 11 07 2c |.......'.+.+...,|
000001f0: 77 11 07 2d 74 2b 05 11 07 2d 77 00             |w..-t+...-w.|
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