# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/class-static.ts
**生成时间**: 2025-12-05T07:44:48.021Z

## 大小对比

- TypeScript编译器: 447 字节
- WASM编译器: 458 字节
- 差异: -11 字节 (-2.40%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-static.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "MathUtil",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "square",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "area",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 75
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "PI",
      "offset": 79
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 82
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 361
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-static.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "MathUtil",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "square",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "area",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "PI",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 70
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 78
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 82
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xd",
    "remaining": 372
  }
}
```

## 字节级差异

共发现 317 个字节差异:

- 偏移量 0x43: TS=0x0e vs WASM=0x04
- 偏移量 0x44: TS=0x63 vs WASM=0x50
- 偏移量 0x45: TS=0x6f vs WASM=0x49
- 偏移量 0x46: TS=0x6e vs WASM=0x0e
- 偏移量 0x47: TS=0x73 vs WASM=0x63
- 偏移量 0x49: TS=0x6c vs WASM=0x6e
- 偏移量 0x4a: TS=0x65 vs WASM=0x73
- 偏移量 0x4b: TS=0x06 vs WASM=0x6f
- 偏移量 0x4d: TS=0x6f vs WASM=0x65
- 偏移量 0x4e: TS=0x67 vs WASM=0x06
- 偏移量 0x4f: TS=0x04 vs WASM=0x6c
- 偏移量 0x50: TS=0x50 vs WASM=0x6f
- 偏移量 0x51: TS=0x49 vs WASM=0x67
- 偏移量 0x67: TS=0x03 vs WASM=0x05
- 偏移量 0x68: TS=0x00 vs WASM=0x01
- 偏移量 0x6a: TS=0x7f vs WASM=0x88
- 偏移量 0x6b: TS=0x02 vs WASM=0x01
- 偏移量 0x6c: TS=0xca vs WASM=0x02
- 偏移量 0x6d: TS=0x03 vs WASM=0xca
- 偏移量 0x6e: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共317个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 73 74 61 74 69 63 2e 6a 73 10 4d |lass-static.js.M|
00000030: 61 74 68 55 74 69 6c 0c 73 71 75 61 72 65 08 61 |athUtil.square.a|
00000040: 72 65 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 04 |rea.console.log.|
00000050: 50 49 02 78 02 72 0d c8 03 00 00 00 00 00 0c 20 |PI.x.r......... |
00000060: 06 01 a4 01 00 02 00 03 00 04 7f 02 ca 03 00 00 |................|
00000070: 00 f0 01 00 00 00 08 ec 7a 06 02 02 00 00 00 58 |........z......X|
00000080: e5 00 00 00 00 c2 00 1b 56 e6 00 00 00 00 1b c2 |........V.......|
00000090: 01 1b 56 e7 00 00 00 00 1b 06 5b 01 00 0e 11 03 |..V.......[.....|
000000a0: 03 00 00 00 52 24 00 00 0e 11 5b 00 00 51 39 e8 |....R$....[..Q9.|
000000b0: 00 00 00 43 e9 00 00 00 c7 42 ea 00 00 00 24 01 |...C.....B....$.|
000000c0: 00 0e 39 e8 00 00 00 43 e9 00 00 00 c7 43 e6 00 |..9....C.....C..|
000000d0: 00 00 bc 24 01 00 24 01 00 0e 39 e8 00 00 00 43 |...$..$...9....C|
000000e0: e9 00 00 00 c7 43 e7 00 00 00 b9 24 01 00 24 01 |.....C.....$..$.|
000000f0: 00 0e 29 06 2f c8 03 01 0c 00 38 0a 00 0a 02 00 |..)./.....8.....|
00000100: 14 01 00 18 01 00 0c 00 04 00 cc 03 01 01 01 03 |................|
00000110: 00 00 05 02 d6 03 00 00 00 10 00 00 00 d3 d3 9c |................|
00000120: 28 29 c8 03 01 06 00 00 03 00 00 01 00 0c 00 04 |()..............|
00000130: 00 ce 03 01 01 01 03 01 00 13 02 d8 03 00 00 00 |................|
00000140: 10 00 00 00 ca 03 00 01 df 42 ea 00 00 00 df 43 |.........B.....C|
00000150: e6 00 00 00 d3 24 01 00 9c 28 29 c8 03 01 06 00 |.....$...().....|
00000160: 00 07 00 00 01 00 0c 00 04 00 ca 03 00 00 00 03 |................|
00000170: 00 00 18 00 2b 39 78 00 00 00 11 6c 0a 00 00 00 |....+9x....l....|
00000180: 39 08 00 00 00 1b 24 00 00 0e 0e 29 c8 03 01 00 |9.....$....)....|
00000190: 00 0c 00 04 00 00 00 01 00 03 00 01 0c 01 10 00 |................|
000001a0: 00 00 c7 02 00 00 00 00 4e ea 00 00 00 29 c8 03 |........N....)..|
000001b0: 01 03 00 01 01 00 06 6e 86 1b f0 f9 21 09 40    |.......n....!.@|
```

### WASM
```
00000000: 05 09 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 73 74 61 74 69 63 2e 6a 73 10 4d |lass-static.js.M|
00000030: 61 74 68 55 74 69 6c 0c 73 71 75 61 72 65 08 61 |athUtil.square.a|
00000040: 72 65 61 04 50 49 0e 63 6f 6e 73 6f 6c 65 06 6c |rea.PI.console.l|
00000050: 6f 67 02 78 02 72 0d c8 03 00 00 00 00 00 0c 20 |og.x.r......... |
00000060: 06 01 a4 01 00 02 00 05 01 04 88 01 02 ca 03 02 |................|
00000070: 00 70 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.p....p.......)c|
00000080: 00 00 06 63 01 00 c1 02 58 e5 00 00 00 00 1b c2 |...c....X.......|
00000090: 00 56 e6 00 00 00 00 1b 1b c2 01 56 e7 00 00 00 |.V.........V....|
000000a0: 00 1b 06 cc 0e cf 6b 01 00 6b 00 00 e3 68 00 00 |......k..k...h..|
000000b0: c1 03 44 e8 00 00 00 39 e9 00 00 00 43 ea 00 00 |..D....9....C...|
000000c0: 00 68 00 00 42 e8 00 00 00 24 01 00 0e 39 e9 00 |.h..B....$...9..|
000000d0: 00 00 43 ea 00 00 00 68 00 00 43 e6 00 00 00 bc |..C....h..C.....|
000000e0: 24 01 00 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 |$..$...9....C...|
000000f0: 00 68 00 00 43 e7 00 00 00 b9 24 01 00 24 01 00 |.h..C.....$..$..|
00000100: 0e 06 2f c8 03 2a 00 00 00 32 10 00 11 10 26 0f |../..*...2....&.|
00000110: 1b 0e 1b 0a 11 10 1b 11 17 15 1b 0e 1b 0a 11 10 |................|
00000120: 20 0e 11 1f 17 15 1b 0e 1b 0a 11 10 20 0a 11 1b | ........... ...|
00000130: 00 0c 42 07 01 00 01 00 01 02 00 00 04 01 d6 03 |..B.............|
00000140: 00 01 00 d3 d3 9c 28 c8 03 0a 01 0b 03 08 07 08 |......(.........|
00000150: 07 03 07 11 00 0c 42 07 01 00 01 00 01 04 01 00 |......B.........|
00000160: 16 01 d8 03 00 01 00 ca 03 00 0d 68 00 00 42 e8 |...........h..B.|
00000170: 00 00 00 68 00 00 43 e6 00 00 00 d3 24 01 00 9c |...h..C.....$...|
00000180: 28 c8 03 12 04 0b 03 08 11 10 1b 0c 11 10 1b 10 |(...............|
00000190: 07 01 11 21 07 25 00 0c 40 05 01 00 00 01 00 02 |...!.%..@.......|
000001a0: 01 00 0f 01 10 00 01 00 f0 01 01 0d 08 cb 2b 68 |..............+h|
000001b0: 00 00 11 ec 06 c7 1b 24 00 00 29 c8 03 02 07 00 |.......$..).....|
000001c0: 00 06 6e 86 1b f0 f9 21 09 40                   |..n....!.@|
```