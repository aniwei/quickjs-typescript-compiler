# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/comparison-operators.ts
**生成时间**: 2025-12-06T02:09:56.314Z

## 大小对比

- TypeScript编译器: 336 字节
- WASM编译器: 357 字节
- 差异: -21 字节 (-5.88%)

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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comparison-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "1",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 268
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/comparison-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 66,
    "tag": "0xd",
    "remaining": 291
  }
}
```

## 字节级差异

共发现 261 个字节差异:

- 偏移量 0x1: TS=0x04 vs WASM=0x03
- 偏移量 0x42: TS=0x02 vs WASM=0x0d
- 偏移量 0x43: TS=0x31 vs WASM=0xc8
- 偏移量 0x44: TS=0x0d vs WASM=0x03
- 偏移量 0x45: TS=0xc8 vs WASM=0x00
- 偏移量 0x46: TS=0x03 vs WASM=0x00
- 偏移量 0x4a: TS=0x00 vs WASM=0x0c
- 偏移量 0x4b: TS=0x00 vs WASM=0x20
- 偏移量 0x4c: TS=0x0c vs WASM=0x06
- 偏移量 0x4d: TS=0x20 vs WASM=0x01
- 偏移量 0x4e: TS=0x06 vs WASM=0xa4
- 偏移量 0x50: TS=0xa4 vs WASM=0x00
- 偏移量 0x51: TS=0x01 vs WASM=0x00
- 偏移量 0x53: TS=0x00 vs WASM=0x04
- 偏移量 0x55: TS=0x03 vs WASM=0x02
- 偏移量 0x56: TS=0x00 vs WASM=0xb2
- 偏移量 0x57: TS=0x00 vs WASM=0x01
- 偏移量 0x58: TS=0xb8 vs WASM=0x00
- 偏移量 0x59: TS=0x01 vs WASM=0x08
- 偏移量 0x5a: TS=0x00 vs WASM=0xec
- ... (显示前20个差异，总共261个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 65 72 61 74 |omparison-operat|
00000030: 6f 72 73 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c |ors.js.console.l|
00000040: 6f 67 02 31 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.1......... ..|
00000050: a4 01 00 00 00 03 00 00 b8 01 00 08 ec 02 29 39 |..............)9|
00000060: e5 00 00 00 43 e6 00 00 00 b8 b8 ab 24 01 00 0e |....C.......$...|
00000070: 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ac 24 01 00 |9....C.......$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b8 ad 24 01 |.9....C.......$.|
00000090: 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ae 24 |..9....C.......$|
000000a0: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a5 |...9....C.......|
000000b0: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 b8 |$...9....C......|
000000c0: a7 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 |.$...9....C.....|
000000d0: b8 a6 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000e0: b8 b8 a8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000f0: 00 04 e7 00 00 00 b8 ab 24 01 00 0e 39 e5 00 00 |........$...9...|
00000100: 00 43 e6 00 00 00 04 e7 00 00 00 b8 ad 24 01 00 |.C...........$..|
00000110: 0e 06 2f c8 03 00 38 48 0c 07 05 21 6f 34 0c 07 |../...8H...!o4..|
00000120: 05 21 6f 34 0c 07 06 21 6e 34 0c 07 06 21 6e 34 |.!o4...!n4...!n4|
00000130: 0c 07 04 21 70 34 0c 07 04 21 70 34 0c 07 05 21 |...!p4...!p4...!|
00000140: 6f 34 0c 07 05 22 6f 34 0c 1b 07 22 6d 34 0c 00 |o4..."o4..."m4..|
```

### WASM
```
00000000: 05 03 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 65 72 61 74 |omparison-operat|
00000030: 6f 72 73 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c |ors.js.console.l|
00000040: 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |og......... ....|
00000050: 00 00 00 04 00 02 b2 01 00 08 ec 02 29 39 e5 00 |............)9..|
00000060: 00 00 43 e6 00 00 00 b8 b8 ab 24 01 00 0e 39 e5 |..C.......$...9.|
00000070: 00 00 00 43 e6 00 00 00 b8 b9 ac 24 01 00 0e 39 |...C.......$...9|
00000080: e5 00 00 00 43 e6 00 00 00 b8 b8 ad 24 01 00 0e |....C.......$...|
00000090: 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ae 24 01 00 |9....C.......$..|
000000a0: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a5 24 01 |.9....C.......$.|
000000b0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 b9 b8 a7 24 |..9....C.......$|
000000c0: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b8 a6 |...9....C.......|
000000d0: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b8 |$...9....C......|
000000e0: a8 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 c1 |.$...9....C.....|
000000f0: 00 b8 ab 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000100: 00 c1 01 b8 ad 24 01 00 0e 06 2f c8 03 50 00 00 |.....$..../..P..|
00000110: 2f 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |/.%.......%.....|
00000120: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |..%.......%.....|
00000130: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 |..%.......%.....|
00000140: 1b 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 18 15 |..%.......%.....|
00000150: 1b 0e 2a 12 07 09 18 15 1b 0e 2a 12 07 09 00 07 |..*.......*.....|
00000160: 02 31 07 02 31                                  |.1..1|
```