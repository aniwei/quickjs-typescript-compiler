# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/class-methods.ts
**生成时间**: 2025-12-07T05:10:09.079Z

## 大小对比

- TypeScript编译器: 294 字节
- WASM编译器: 329 字节
- 差异: -35 字节 (-10.64%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Calculator",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 78
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 85
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xd",
    "remaining": 203
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Calculator",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 258
  }
}
```

## 字节级差异

共发现 253 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x05
- 偏移量 0x3a: TS=0x26 vs WASM=0x0c
- 偏移量 0x3b: TS=0x3c vs WASM=0x63
- 偏移量 0x3c: TS=0x63 vs WASM=0x72
- 偏移量 0x3d: TS=0x6c vs WASM=0x65
- 偏移量 0x3f: TS=0x73 vs WASM=0x74
- 偏移量 0x40: TS=0x73 vs WASM=0x65
- 偏移量 0x41: TS=0x5f vs WASM=0x06
- 偏移量 0x42: TS=0x66 vs WASM=0x76
- 偏移量 0x43: TS=0x69 vs WASM=0x61
- 偏移量 0x44: TS=0x65 vs WASM=0x6c
- 偏移量 0x45: TS=0x6c vs WASM=0x02
- 偏移量 0x46: TS=0x64 vs WASM=0x6e
- 偏移量 0x47: TS=0x73 vs WASM=0x0d
- 偏移量 0x48: TS=0x5f vs WASM=0xc8
- 偏移量 0x49: TS=0x69 vs WASM=0x03
- 偏移量 0x4a: TS=0x6e vs WASM=0x00
- 偏移量 0x4b: TS=0x69 vs WASM=0x00
- 偏移量 0x4c: TS=0x74 vs WASM=0x00
- 偏移量 0x4d: TS=0x3e vs WASM=0x00
- ... (显示前20个差异，总共253个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e 6a 73 14 |lass-methods.js.|
00000030: 43 61 6c 63 75 6c 61 74 6f 72 26 3c 63 6c 61 73 |Calculator&<clas|
00000040: 73 5f 66 69 65 6c 64 73 5f 69 6e 69 74 3e 0c 63 |s_fields_init>.c|
00000050: 72 65 61 74 65 06 76 61 6c 02 6e 0d c8 03 00 00 |reate.val.n.....|
00000060: 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 03 2d |.... ..........-|
00000070: 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 63 00 00 |............)c..|
00000080: 06 63 01 00 c2 00 58 e5 00 00 00 00 c2 01 56 6a |.c....X.......Vj|
00000090: 00 00 00 00 1b c2 02 56 e7 00 00 00 00 1b cc 6b |.......V.......k|
000000a0: 01 00 cf e3 06 2f c8 03 02 00 00 00 0c 03 04 01 |...../..........|
000000b0: ca 03 01 01 01 03 01 00 15 02 d0 03 00 01 00 10 |................|
000000c0: 00 00 10 cc 03 01 0c 08 cb 2b 68 00 00 c7 22 00 |.........+h...".|
000000d0: 00 0e d3 11 1b 44 42 00 00 00 0e 29 c8 03 02 00 |.....DB....)....|
000000e0: 00 00 0c 00 00 00 00 01 01 01 02 00 00 15 02 d2 |................|
000000f0: 03 00 01 00 10 00 00 10 08 cb 43 42 00 00 00 d3 |..........CB....|
00000100: 9f 44 42 00 00 00 0e 42 42 00 00 00 28 0c 00 00 |.DB....BB...(...|
00000110: 00 00 01 01 01 01 00 00 03 02 d0 03 00 01 00 10 |................|
00000120: 00 00 10 08 cb 28                               |.....(|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e 6a 73 14 |lass-methods.js.|
00000030: 43 61 6c 63 75 6c 61 74 6f 72 0c 63 72 65 61 74 |Calculator.creat|
00000040: 65 06 76 61 6c 02 6e 0d c8 03 00 00 00 00 00 0c |e.val.n.........|
00000050: 20 06 01 a4 01 00 02 00 03 01 03 32 02 ca 03 02 | ..........2....|
00000060: 00 70 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.p....p.......)c|
00000070: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 c2 01 |...c....X.......|
00000080: 56 6a 00 00 00 00 1b c2 02 56 e6 00 00 00 00 1b |Vj.......V......|
00000090: 06 cc 0e cf 6b 01 00 6b 00 00 e3 06 2f c8 03 02 |....k..k..../...|
000000a0: 00 00 00 0c 42 07 01 00 01 01 01 02 01 00 17 02 |....B...........|
000000b0: ce 03 00 01 00 10 00 01 00 f0 01 01 0d 08 cb 2b |...............+|
000000c0: 68 00 00 11 ec 06 c7 1b 24 00 00 0e c7 d3 44 42 |h.......$.....DB|
000000d0: 00 00 00 29 c8 03 06 01 04 4e 08 07 1a 00 0c 42 |...).....N.....B|
000000e0: 07 01 00 01 01 01 03 00 00 16 02 d0 03 00 01 00 |................|
000000f0: 10 00 01 00 08 cb c7 43 42 00 00 00 d3 9f 44 42 |.......CB.....DB|
00000100: 00 00 00 c7 42 42 00 00 00 28 c8 03 0e 04 04 0d |....BB...(......|
00000110: 08 07 08 1b 14 07 05 26 00 1b 15 00 0c 42 07 01 |.......&.....B..|
00000120: 00 01 00 01 03 01 00 09 01 ce 03 00 01 00 ca 03 |................|
00000130: 00 0d 68 00 00 11 d3 21 01 00 28 c8 03 0a 08 0b |..h....!..(.....|
00000140: 03 10 16 16 07 01 11 29 00                      |.......).|
```