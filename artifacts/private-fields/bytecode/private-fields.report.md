# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/private-fields.ts
**生成时间**: 2025-12-06T02:09:56.475Z

## 大小对比

- TypeScript编译器: 541 字节
- WASM编译器: 1631 字节
- 差异: -1090 字节 (-66.83%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 12,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/private-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "A",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#y",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "#privateMethod",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 73
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 75
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getX",
      "offset": 77
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "setX",
      "offset": 82
    },
    {
      "index": 10,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "callPrivate",
      "offset": 87
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 99
    }
  ],
  "functionHeader": {
    "offset": 101,
    "tag": "0xd",
    "remaining": 440
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 26,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/private-fields.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "A",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "__classPrivateFieldSet",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 44,
      "actualLength": 22,
      "isWideChar": 0,
      "string": "__classPrivateFieldGet",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "_A_instances",
      "offset": 96
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "_A_x",
      "offset": 109
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "_A_y",
      "offset": 114
    },
    {
      "index": 7,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "_A_privateMethod",
      "offset": 119
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 136
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 138
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "p",
      "offset": 140
    },
    {
      "index": 11,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "getX",
      "offset": 142
    },
    {
      "index": 12,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "setX",
      "offset": 147
    },
    {
      "index": 13,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "callPrivate",
      "offset": 152
    },
    {
      "index": 14,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "receiver",
      "offset": 164
    },
    {
      "index": 15,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "state",
      "offset": 173
    },
    {
      "index": 16,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "kind",
      "offset": 179
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 184
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 186
    },
    {
      "index": 19,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "Private method is not writable",
      "offset": 188
    },
    {
      "index": 20,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "Private accessor was defined without a setter",
      "offset": 219
    },
    {
      "index": 21,
      "rawLength": 142,
      "actualLength": 71,
      "isWideChar": 0,
      "string": "Cannot write private member to an object whose class did not declare it",
      "offset": 265
    },
    {
      "index": 22,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "call",
      "offset": 338
    },
    {
      "index": 23,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "Private accessor was defined without a getter",
      "offset": 343
    },
    {
      "index": 24,
      "rawLength": 144,
      "actualLength": 72,
      "isWideChar": 0,
      "string": "Cannot read private member from an object whose class did not declare it",
      "offset": 389
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 463
    }
  ],
  "functionHeader": {
    "offset": 465,
    "tag": "0xd",
    "remaining": 1166
  }
}
```

## 字节级差异

共发现 1565 个字节差异:

- 偏移量 0x1: TS=0x0c vs WASM=0x1a
- 偏移量 0x32: TS=0x04 vs WASM=0x2c
- 偏移量 0x33: TS=0x23 vs WASM=0x5f
- 偏移量 0x34: TS=0x78 vs WASM=0x5f
- 偏移量 0x35: TS=0x04 vs WASM=0x63
- 偏移量 0x36: TS=0x23 vs WASM=0x6c
- 偏移量 0x37: TS=0x79 vs WASM=0x61
- 偏移量 0x38: TS=0x1c vs WASM=0x73
- 偏移量 0x39: TS=0x23 vs WASM=0x73
- 偏移量 0x3a: TS=0x70 vs WASM=0x50
- 偏移量 0x41: TS=0x4d vs WASM=0x46
- 偏移量 0x42: TS=0x65 vs WASM=0x69
- 偏移量 0x43: TS=0x74 vs WASM=0x65
- 偏移量 0x44: TS=0x68 vs WASM=0x6c
- 偏移量 0x45: TS=0x6f vs WASM=0x64
- 偏移量 0x46: TS=0x64 vs WASM=0x53
- 偏移量 0x47: TS=0x02 vs WASM=0x65
- 偏移量 0x48: TS=0x61 vs WASM=0x74
- 偏移量 0x49: TS=0x02 vs WASM=0x2c
- 偏移量 0x4a: TS=0x78 vs WASM=0x5f
- ... (显示前20个差异，总共1565个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0c 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 69 76 61 74 65 2d 66 69 65 6c 64 73 2e 6a 73 |rivate-fields.js|
00000030: 02 41 04 23 78 04 23 79 1c 23 70 72 69 76 61 74 |.A.#x.#y.#privat|
00000040: 65 4d 65 74 68 6f 64 02 61 02 78 02 70 08 67 65 |eMethod.a.x.p.ge|
00000050: 74 58 08 73 65 74 58 16 63 61 6c 6c 50 72 69 76 |tX.setX.callPriv|
00000060: 61 74 65 02 76 0d c8 03 00 00 00 00 00 0c 20 06 |ate.v......... .|
00000070: 01 a4 01 00 00 00 03 03 05 83 01 00 d2 03 05 0d |................|
00000080: d4 03 06 0d d6 03 07 0d 08 ec 02 29 06 02 03 00 |...........)....|
00000090: 00 00 58 e5 00 00 00 00 05 e6 00 00 00 3b e6 00 |..X..........;..|
000000a0: 00 00 05 e7 00 00 00 3b e7 00 00 00 05 e8 00 00 |.......;........|
000000b0: 00 3b e8 00 00 00 c2 00 56 ec 00 00 00 00 c2 01 |.;......V.......|
000000c0: 56 ed 00 00 00 00 c2 02 56 ee 00 00 00 00 03 04 |V.......V.......|
000000d0: 00 00 00 52 5b 04 00 0e 11 e3 51 c7 21 00 00 e3 |...R[.....Q.!...|
000000e0: 68 00 00 43 ec 00 00 00 24 00 00 e4 68 00 00 43 |h..C....$...h..C|
000000f0: ed 00 00 00 01 0a 00 00 00 24 01 00 0e 68 00 00 |.........$...h..|
00000100: 43 ee 00 00 00 24 00 00 e5 06 2f c8 03 00 0a 00 |C....$..../.....|
00000110: 53 19 0e 1c 7c 3f 76 2a 07 00 0c 42 06 00 d8 03 |S...|?v*...B....|
00000120: 00 01 00 03 01 00 05 01 10 00 00 00 cc 03 01 01 |................|
00000130: c7 df 45 28 29 c8 03 06 02 05 0a 00 0c 42 06 00 |..E()........B..|
00000140: da 03 01 01 01 03 01 00 07 02 de 03 00 00 00 10 |................|
00000150: 00 00 00 cc 03 01 01 d3 d3 c7 1b df 46 29 c8 03 |............F)..|
00000160: 0a 04 05 0d 0c 76 00 0c 42 06 00 dc 03 00 01 00 |.....v..B.......|
00000170: 03 01 00 09 01 10 00 00 00 d0 03 03 01 c7 11 df |................|
00000180: 45 24 00 00 28 29 c8 03 12 02 05 0a 00 0c 42 06 |E$..()........B.|
00000190: 00 ca 03 00 01 00 03 01 00 1c 01 10 00 00 00 ce |................|
000001a0: 03 02 01 08 cb 2b 39 78 00 00 00 11 6c 0a 00 00 |.....+9x....l...|
000001b0: 00 c7 1b 24 00 00 0e 0e b9 b9 c7 1b df 46 29 c8 |...$.........F).|
000001c0: 03 02 04 6e 0b 0c 76 00 0c 00 04 00 00 00 01 00 |...n..v.........|
000001d0: 03 03 01 11 01 10 00 00 00 cc 03 01 01 ce 03 02 |................|
000001e0: 01 d0 03 03 01 c7 df b8 1b 47 c7 e0 06 1b 47 c2 |.........G....G.|
000001f0: 00 c7 1b e1 47 29 c8 03 00 02 0d 09 00 0c 42 06 |....G)........B.|
00000200: 00 d0 03 00 01 00 03 00 00 07 01 10 00 00 00 01 |................|
00000210: 2a 00 00 00 28 29 c8 03 0e 02 05 0a 00          |*...().......|
```

### WASM
```
00000000: 05 1a 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 69 76 61 74 65 2d 66 69 65 6c 64 73 2e 6a 73 |rivate-fields.js|
00000030: 02 41 2c 5f 5f 63 6c 61 73 73 50 72 69 76 61 74 |.A,__classPrivat|
00000040: 65 46 69 65 6c 64 53 65 74 2c 5f 5f 63 6c 61 73 |eFieldSet,__clas|
00000050: 73 50 72 69 76 61 74 65 46 69 65 6c 64 47 65 74 |sPrivateFieldGet|
00000060: 18 5f 41 5f 69 6e 73 74 61 6e 63 65 73 08 5f 41 |._A_instances._A|
00000070: 5f 78 08 5f 41 5f 79 20 5f 41 5f 70 72 69 76 61 |_x._A_y _A_priva|
00000080: 74 65 4d 65 74 68 6f 64 02 61 02 78 02 70 08 67 |teMethod.a.x.p.g|
00000090: 65 74 58 08 73 65 74 58 16 63 61 6c 6c 50 72 69 |etX.setX.callPri|
000000a0: 76 61 74 65 10 72 65 63 65 69 76 65 72 0a 73 74 |vate.receiver.st|
000000b0: 61 74 65 08 6b 69 6e 64 02 66 02 6d 3c 50 72 69 |ate.kind.f.m<Pri|
000000c0: 76 61 74 65 20 6d 65 74 68 6f 64 20 69 73 20 6e |vate method is n|
000000d0: 6f 74 20 77 72 69 74 61 62 6c 65 5a 50 72 69 76 |ot writableZPriv|
000000e0: 61 74 65 20 61 63 63 65 73 73 6f 72 20 77 61 73 |ate accessor was|
000000f0: 20 64 65 66 69 6e 65 64 20 77 69 74 68 6f 75 74 | defined without|
00000100: 20 61 20 73 65 74 74 65 72 8e 01 43 61 6e 6e 6f | a setter..Canno|
00000110: 74 20 77 72 69 74 65 20 70 72 69 76 61 74 65 20 |t write private |
00000120: 6d 65 6d 62 65 72 20 74 6f 20 61 6e 20 6f 62 6a |member to an obj|
00000130: 65 63 74 20 77 68 6f 73 65 20 63 6c 61 73 73 20 |ect whose class |
00000140: 64 69 64 20 6e 6f 74 20 64 65 63 6c 61 72 65 20 |did not declare |
00000150: 69 74 08 63 61 6c 6c 5a 50 72 69 76 61 74 65 20 |it.callZPrivate |
00000160: 61 63 63 65 73 73 6f 72 20 77 61 73 20 64 65 66 |accessor was def|
00000170: 69 6e 65 64 20 77 69 74 68 6f 75 74 20 61 20 67 |ined without a g|
00000180: 65 74 74 65 72 90 01 43 61 6e 6e 6f 74 20 72 65 |etter..Cannot re|
00000190: 61 64 20 70 72 69 76 61 74 65 20 6d 65 6d 62 65 |ad private membe|
000001a0: 72 20 66 72 6f 6d 20 61 6e 20 6f 62 6a 65 63 74 |r from an object|
000001b0: 20 77 68 6f 73 65 20 63 6c 61 73 73 20 64 69 64 | whose class did|
000001c0: 20 6e 6f 74 20 64 65 63 6c 61 72 65 20 69 74 02 | not declare it.|
000001d0: 76 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |v......... .....|
000001e0: 03 00 03 0a 07 b6 01 03 ca 03 02 00 30 f0 01 03 |............0...|
000001f0: 01 70 10 00 01 00 cc 03 00 01 ce 03 01 01 d0 03 |.p..............|
00000200: 02 01 d2 03 03 01 d4 03 04 01 d6 03 05 01 ca 03 |................|
00000210: 06 09 d8 03 07 0d da 03 08 0d dc 03 09 0d 08 cd |................|
00000220: 08 ec 02 29 c9 11 ec 08 0e c9 42 e6 00 00 00 11 |...)......B.....|
00000230: ed 04 0e c2 00 e3 c9 11 ec 08 0e c9 42 e7 00 00 |............B...|
00000240: 00 11 ed 04 0e c2 01 e4 63 00 00 06 63 01 00 c1 |........c...c...|
00000250: 02 58 e5 00 00 00 00 c2 03 56 ef 00 00 00 00 c2 |.X.......V......|
00000260: 04 56 f0 00 00 00 00 c2 05 56 f1 00 00 00 00 06 |.V.......V......|
00000270: cc 0e cf 6b 01 00 61 06 00 39 be 00 00 00 11 21 |...k..a..9.....!|
00000280: 00 00 e6 39 be 00 00 00 11 21 00 00 61 04 00 39 |...9.....!..a..9|
00000290: bf 00 00 00 11 21 00 00 e5 c2 06 61 05 00 68 06 |.....!.....a..h.|
000002a0: 00 11 21 00 00 61 07 00 68 07 00 43 ef 00 00 00 |..!..a..h..C....|
000002b0: 24 00 00 61 08 00 68 07 00 43 f0 00 00 00 bf 0a |$..a..h..C......|
000002c0: 24 01 00 0e 68 07 00 43 f1 00 00 00 24 00 00 61 |$...h..C....$..a|
000002d0: 09 00 06 2f c8 03 2e 00 00 3e 54 00 12 0c 00 00 |.../.....>T.....|
000002e0: 3d 2e 3d 20 0e 16 1e 20 0e 20 2e 20 0e 16 08 1e |=.= ... . . ....|
000002f0: 77 16 02 21 09 11 02 1b 0a 21 1f 11 02 25 0a 17 |w..!.....!...%..|
00000300: 08 11 02 1b 18 00 0c 43 06 01 00 05 00 05 04 00 |.......C........|
00000310: 00 9a 01 05 e4 03 00 01 00 e6 03 00 01 00 84 01 |................|
00000320: 00 01 00 e8 03 00 01 00 ea 03 00 01 00 d6 04 f6 |................|
00000330: 00 00 00 ad ec 10 39 d3 00 00 00 11 04 f7 00 00 |......9.........|
00000340: 00 21 01 00 30 d6 04 ec 00 00 00 ad ec 16 5d 04 |.!..0.........].|
00000350: 00 98 ec 10 39 d3 00 00 00 11 04 f8 00 00 00 21 |....9..........!|
00000360: 01 00 30 d4 f7 ec 0e d3 d4 ae 11 ed 13 0e 5d 04 |..0...........].|
00000370: 00 98 ee 0c d4 43 65 00 00 00 d3 24 01 00 98 ec |.....Ce....$....|
00000380: 10 39 d3 00 00 00 11 04 f9 00 00 00 21 01 00 30 |.9..........!..0|
00000390: d6 04 ec 00 00 00 ad ec 10 5d 04 00 43 fa 00 00 |.........]..C...|
000003a0: 00 d3 d5 24 02 00 ee 1d 5d 04 00 ec 0d 5d 04 00 |...$....]....]..|
000003b0: d5 15 44 42 00 00 00 ee 0c d4 43 44 00 00 00 d3 |..DB......CD....|
000003c0: d5 24 02 00 0e d5 28 c8 03 56 00 46 03 7b 20 0a |.$....(..V.F.{ .|
000003d0: 11 26 39 12 11 25 08 1b 20 0a 11 18 20 1a 39 12 |.&9..%.. ... .9.|
000003e0: 11 25 08 19 07 0c 11 22 07 1a 07 07 1b 1c 20 0a |.%....."...... .|
000003f0: 07 0a 1b 0a 07 01 20 2c 39 12 11 25 08 95 01 20 |...... ,9..%... |
00000400: 0a 11 14 11 02 1b 0c 07 14 07 15 1b 28 1b 08 11 |............(...|
00000410: 14 2f 10 07 0a 1b 0a 07 14 07 15 16 28 07 c7 01 |./..........(...|
00000420: 00 0c 43 06 01 00 04 00 04 03 00 00 7b 04 e4 03 |..C.........{...|
00000430: 00 01 00 e6 03 00 01 00 e8 03 00 01 00 ea 03 00 |................|
00000440: 01 00 d5 04 ec 00 00 00 ad ec 14 d6 98 ec 10 39 |...............9|
00000450: d3 00 00 00 11 04 fb 00 00 00 21 01 00 30 d4 f7 |..........!..0..|
00000460: ec 0c d3 d4 ae 11 ed 11 0e d6 98 ee 0c d4 43 65 |..............Ce|
00000470: 00 00 00 d3 24 01 00 98 ec 10 39 d3 00 00 00 11 |....$.....9.....|
00000480: 04 fc 00 00 00 21 01 00 30 d5 04 f6 00 00 00 ad |.....!..0.......|
00000490: ec 03 d6 28 d5 04 ec 00 00 00 ad ec 0c d6 43 fa |...(..........C.|
000004a0: 00 00 00 d3 24 01 00 28 d6 ec 08 d6 42 42 00 00 |....$..(....BB..|
000004b0: 00 28 d4 43 43 00 00 00 d3 24 01 00 28 c8 03 4c |.(.CC....$..(..L|
000004c0: 06 46 03 7b 20 0a 11 18 16 1a 39 12 11 25 08 19 |.F.{ .....9..%..|
000004d0: 07 0c 11 22 07 1a 07 07 1b 1c 16 0a 07 0a 1b 0a |..."............|
000004e0: 07 01 20 2c 39 12 11 25 08 97 01 20 0a 11 14 0c |.. ,9..%... ....|
000004f0: 08 20 0a 11 14 07 02 1b 0c 07 01 16 1a 11 08 07 |. ..............|
00000500: 02 20 12 07 0a 1b 0a 07 01 11 a5 01 00 0c 42 07 |. ............B.|
00000510: 01 00 00 01 00 05 05 00 41 01 10 00 01 00 f0 01 |........A.......|
00000520: 01 0d d0 03 02 00 d2 03 03 00 d4 03 04 00 cc 03 |................|
00000530: 00 00 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
00000540: 0e e0 43 6a 00 00 00 c7 24 01 00 0e e1 43 44 00 |..Cj....$....CD.|
00000550: 00 00 c7 b8 24 02 00 0e e2 43 44 00 00 00 c7 06 |....$....CD.....|
00000560: 24 02 00 0e 60 04 00 c7 e2 b9 04 f5 00 00 00 22 |$...`.........."|
00000570: 04 00 29 c8 03 1a 0d 04 4e 08 07 18 20 08 17 1f |..).....N... ...|
00000580: 07 08 25 08 17 0f 07 08 25 08 17 0f 16 3a 25 0d |..%.....%....:%.|
00000590: 00 0c 42 07 01 00 00 01 00 04 02 00 0d 01 10 00 |..B.............|
000005a0: 01 00 ce 03 01 00 d2 03 03 00 08 cb df c7 e0 04 |................|
000005b0: f5 00 00 00 23 03 00 c8 03 08 13 04 0d 16 0c 3a |....#..........:|
000005c0: 20 47 00 0c 42 07 01 00 01 01 01 05 02 00 0f 02 | G..B...........|
000005d0: fa 03 00 01 00 10 00 01 00 cc 03 00 00 d2 03 03 |................|
000005e0: 00 08 cb df c7 e0 d3 04 f5 00 00 00 22 04 00 29 |............"..)|
000005f0: c8 03 0a 16 04 0d 08 0c 3a 07 0c 20 19 00 0c 42 |........:.. ...B|
00000600: 07 01 00 00 01 00 05 03 00 17 01 10 00 01 00 ce |................|
00000610: 03 01 00 d0 03 02 00 d6 03 05 00 08 cb df c7 e0 |................|
00000620: 04 f6 00 00 00 e1 22 04 00 43 fa 00 00 00 c7 25 |......"..C.....%|
00000630: 01 00 c8 03 0f 19 04 0d 16 0c 3a 20 26 07 33 11 |..........: &.3.|
00000640: 56 20 8f 01 00 0c 43 06 01 d6 03 00 00 00 01 00 |V ....C.........|
00000650: 00 03 00 bf 2a 28 c8 03 05 1d 5d 0d b1 01 00    |....*(....]....|
```