# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-methods.ts
**生成时间**: 2025-12-08T11:04:54.706Z

## 大小对比

- TypeScript编译器: 319 字节
- WASM编译器: 374 字节
- 差异: -55 字节 (-14.71%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
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
    "remaining": 248
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
    "remaining": 303
  }
}
```

## 字节级差异

共发现 226 个字节差异:

- 偏移量 0x5a: TS=0x03 vs WASM=0x04
- 偏移量 0x5b: TS=0x2f vs WASM=0x34
- 偏移量 0x61: TS=0x30 vs WASM=0x70
- 偏移量 0x90: TS=0x06 vs WASM=0xc2
- 偏移量 0x91: TS=0xcc vs WASM=0x03
- 偏移量 0x92: TS=0x0e vs WASM=0x52
- 偏移量 0x93: TS=0xcf vs WASM=0xcc
- 偏移量 0x94: TS=0x6b vs WASM=0x0e
- 偏移量 0x95: TS=0x01 vs WASM=0xcf
- 偏移量 0x96: TS=0x00 vs WASM=0x6b
- 偏移量 0x97: TS=0xe3 vs WASM=0x01
- 偏移量 0x98: TS=0x06 vs WASM=0x00
- 偏移量 0x99: TS=0x2f vs WASM=0x6b
- 偏移量 0x9a: TS=0xc8 vs WASM=0x00
- 偏移量 0x9b: TS=0x03 vs WASM=0x00
- 偏移量 0x9c: TS=0x02 vs WASM=0xe3
- 偏移量 0x9d: TS=0x00 vs WASM=0x06
- 偏移量 0x9e: TS=0x00 vs WASM=0x2f
- 偏移量 0x9f: TS=0x00 vs WASM=0xc8
- 偏移量 0xa0: TS=0x0c vs WASM=0x03
- ... (显示前20个差异，总共226个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e 6a 73 14 |lass-methods.js.|
00000030: 43 61 6c 63 75 6c 61 74 6f 72 0c 63 72 65 61 74 |Calculator.creat|
00000040: 65 06 76 61 6c 02 6e 0d c8 03 00 00 00 00 00 0c |e.val.n.........|
00000050: 20 06 01 a4 01 00 02 00 03 01 03 2f 02 ca 03 02 | ........../....|
00000060: 00 30 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.0....p.......)c|
00000070: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 c2 01 |...c....X.......|
00000080: 56 6a 00 00 00 00 1b c2 02 56 e6 00 00 00 00 1b |Vj.......V......|
00000090: 06 cc 0e cf 6b 01 00 e3 06 2f c8 03 02 00 00 00 |....k..../......|
000000a0: 0c 42 07 01 00 01 01 01 02 01 00 17 02 cc 03 00 |.B..............|
000000b0: 01 00 10 00 01 00 f0 01 01 0d 08 cb 2b 68 00 00 |............+h..|
000000c0: 11 ec 06 c7 1b 24 00 00 0e c7 d3 44 42 00 00 00 |.....$.....DB...|
000000d0: 29 c8 03 06 02 04 4e 08 07 1a 00 0c 00 00 00 d4 |).....N.........|
000000e0: 01 01 02 01 03 00 00 1a 03 d0 03 00 01 00 10 00 |................|
000000f0: 00 10 ea 01 00 01 00 0c 04 cc 08 cb 08 43 42 00 |.............CB.|
00000100: 00 00 d3 9f 44 42 00 00 00 0e 08 42 42 00 00 00 |....DB.....BB...|
00000110: 28 0c 00 00 00 cc 03 01 02 01 03 01 00 0e 03 ce |(...............|
00000120: 03 00 01 00 10 00 00 10 ea 01 00 01 00 ca 03 00 |................|
00000130: 0c 0c 04 cc 08 cb 68 00 00 11 d3 21 01 00 28    |......h....!..(|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e 6a 73 14 |lass-methods.js.|
00000030: 43 61 6c 63 75 6c 61 74 6f 72 0c 63 72 65 61 74 |Calculator.creat|
00000040: 65 06 76 61 6c 02 6e 0d c8 03 00 00 00 00 00 0c |e.val.n.........|
00000050: 20 06 01 a4 01 00 02 00 03 01 04 34 02 ca 03 02 | ..........4....|
00000060: 00 70 f0 01 03 01 70 ca 03 00 09 08 ec 02 29 63 |.p....p.......)c|
00000070: 00 00 06 63 01 00 c1 00 58 e5 00 00 00 00 c2 01 |...c....X.......|
00000080: 56 6a 00 00 00 00 1b c2 02 56 e6 00 00 00 00 1b |Vj.......V......|
00000090: c2 03 52 cc 0e cf 6b 01 00 6b 00 00 e3 06 2f c8 |..R...k..k..../.|
000000a0: 03 02 00 00 00 0c 42 07 01 00 01 01 01 02 01 00 |......B.........|
000000b0: 17 02 ce 03 00 01 00 10 00 01 00 f0 01 01 0d 08 |................|
000000c0: cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 0e c7 d3 |.+h.......$.....|
000000d0: 44 42 00 00 00 29 c8 03 06 02 04 4e 08 07 1a 00 |DB...).....N....|
000000e0: 0c 42 07 01 00 01 01 01 03 00 00 16 02 d0 03 00 |.B..............|
000000f0: 01 00 10 00 01 00 08 cb c7 43 42 00 00 00 d3 9f |.........CB.....|
00000100: 44 42 00 00 00 c7 42 42 00 00 00 28 c8 03 0e 05 |DB....BB...(....|
00000110: 04 0d 08 07 08 1b 14 07 05 26 00 1b 15 00 0c 42 |.........&.....B|
00000120: 07 01 00 01 00 01 03 01 00 09 01 ce 03 00 01 00 |................|
00000130: ca 03 00 0d 68 00 00 11 d3 21 01 00 28 c8 03 0a |....h....!..(...|
00000140: 09 0b 03 10 16 16 07 01 11 29 00 0c 48 05 01 00 |.........)..H...|
00000150: 00 02 00 02 00 00 0f 02 10 00 01 00 ea 01 00 01 |................|
00000160: 00 0c 04 cc 08 cb ee 01 c7 06 4e 42 00 00 00 29 |..........NB...)|
00000170: c8 03 02 00 00 00                               |......|
```