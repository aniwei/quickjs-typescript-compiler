# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-accessors.ts
**生成时间**: 2025-12-12T09:59:18.401Z

## 大小对比

- TypeScript编译器: 272 字节
- WASM编译器: 461 字节
- 差异: -189 字节 (-41.00%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-accessors.js",
      "offset": 39
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xc",
    "remaining": 195
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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-accessors.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    },
    {
      "index": 5,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Getting value",
      "offset": 58
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "_value",
      "offset": 72
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 79
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Setting value",
      "offset": 81
    }
  ],
  "functionHeader": {
    "offset": 95,
    "tag": "0xd",
    "remaining": 366
  }
}
```

## 字节级差异

共发现 423 个字节差异:

- 偏移量 0x1: TS=0x05 vs WASM=0x09
- 偏移量 0x2: TS=0x0c vs WASM=0x4a
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x06 vs WASM=0x78
- 偏移量 0x10: TS=0x42 vs WASM=0x74
- 偏移量 0x11: TS=0x6f vs WASM=0x75
- 偏移量 0x12: TS=0x78 vs WASM=0x72
- 偏移量 0x13: TS=0x26 vs WASM=0x65
- 偏移量 0x14: TS=0x3c vs WASM=0x73
- 偏移量 0x15: TS=0x63 vs WASM=0x2f
- ... (显示前20个差异，总共423个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 06 |...<eval>._ret_.|
00000010: 42 6f 78 26 3c 63 6c 61 73 73 5f 66 69 65 6c 64 |Box&<class_field|
00000020: 73 5f 69 6e 69 74 3e 4a 5f 5f 74 65 73 74 73 5f |s_init>J__tests_|
00000030: 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 73 73 |_/fixtures/class|
00000040: 2d 61 63 63 65 73 73 6f 72 73 2e 6a 73 0c 02 06 |-accessors.js...|
00000050: 00 00 00 00 00 00 03 00 03 00 04 76 03 01 00 00 |...........v....|
00000060: 00 00 00 00 02 00 00 00 02 00 30 03 00 00 00 03 |..........0.....|
00000070: 02 30 40 e6 00 00 00 00 40 e9 00 00 00 01 b6 01 |.0@.....@.......|
00000080: 00 b6 02 00 06 b6 03 00 d4 02 58 e6 00 00 00 00 |..........X.....|
00000090: d5 00 52 56 42 00 00 00 01 d5 01 52 56 42 00 00 |..RVB......RVB..|
000000a0: 00 02 d5 03 e0 0e e3 b7 03 00 b7 02 00 3b e6 00 |.............;..|
000000b0: 00 00 39 e6 00 00 00 11 21 00 00 3b e9 00 00 00 |..9.....!..;....|
000000c0: 39 e9 00 00 00 d2 0a 15 44 42 00 00 00 de 39 ea |9.......DB....9.|
000000d0: 00 00 00 43 eb 00 00 00 39 e9 00 00 00 42 42 00 |...C....9....BB.|
000000e0: 00 00 24 01 00 de da 28 04 00 00 00 1e 00 00 6d |..$....(.......m|
000000f0: 08 00 0c 08 00 00 2e 0a 07 02 1c 2a 07 11 07 26 |...........*...&|
00000100: 0b 25 14 11 13 2b 00 3e 18 3e 17 00 01 01 01 01 |.%...+.>.>......|
```

### WASM
```
00000000: 05 09 4a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..J__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6c 61 73 73 2d 61 63 63 65 |tures/class-acce|
00000020: 73 73 6f 72 73 2e 6a 73 06 42 6f 78 02 62 0e 63 |ssors.js.Box.b.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 1a 47 65 74 74 69 |onsole.log.Getti|
00000040: 6e 67 20 76 61 6c 75 65 0c 5f 76 61 6c 75 65 02 |ng value._value.|
00000050: 76 1a 53 65 74 74 69 6e 67 20 76 61 6c 75 65 0d |v.Setting value.|
00000060: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 |........ .......|
00000070: 03 02 04 57 02 ca 03 02 00 30 f0 01 03 01 70 ca |...W.....0....p.|
00000080: 03 00 09 cc 03 01 0d 08 ec 02 29 63 00 00 06 63 |..........)c...c|
00000090: 01 00 c1 02 58 e5 00 00 00 00 c2 00 56 42 00 00 |....X.......VB..|
000000a0: 00 01 c2 01 56 42 00 00 00 02 c2 03 52 cc 0e cf |....VB......R...|
000000b0: 6b 01 00 e3 68 00 00 11 21 00 00 e4 68 01 00 bf |k...h...!...h...|
000000c0: 0a 44 42 00 00 00 39 e7 00 00 00 43 e8 00 00 00 |.DB...9....C....|
000000d0: 68 01 00 42 42 00 00 00 24 01 00 0e 06 2f c8 03 |h..BB...$..../..|
000000e0: 16 00 00 00 2d 16 1c 16 06 17 21 11 02 26 01 1b |....-.....!..&..|
000000f0: 0e 1b 0a 11 02 1b 03 00 0c 42 07 01 00 00 01 00 |.........B......|
00000100: 03 00 00 1c 01 10 00 01 00 08 cb 39 e7 00 00 00 |...........9....|
00000110: 43 e8 00 00 00 04 e9 00 00 00 24 01 00 0e c7 42 |C.........$....B|
00000120: ea 00 00 00 28 c8 03 0c 02 04 0d 08 1b 0e 34 08 |....(.........4.|
00000130: 1c 00 1b 15 00 0c 42 07 01 00 01 01 01 03 00 00 |......B.........|
00000140: 1d 02 d6 03 00 01 00 10 00 01 00 08 cb 39 e7 00 |.............9..|
00000150: 00 00 43 e8 00 00 00 04 ec 00 00 00 24 01 00 0e |..C.........$...|
00000160: c7 d3 44 ea 00 00 00 29 c8 03 0c 06 04 0d 08 1b |..D....)........|
00000170: 0e 34 08 17 15 07 1c 00 0c 40 05 01 00 00 01 00 |.4.......@......|
00000180: 02 01 00 0f 01 10 00 01 00 f0 01 01 0d 08 cb 2b |...............+|
00000190: 68 00 00 11 ec 06 c7 1b 24 00 00 29 c8 03 02 0a |h.......$..)....|
000001a0: 00 00 0c 48 05 01 00 00 02 00 02 00 00 0f 02 10 |...H............|
000001b0: 00 01 00 ea 01 00 01 00 0c 04 cc 08 cb ee 01 c7 |................|
000001c0: b7 4e ea 00 00 00 29 c8 03 02 00 00 00          |.N....)......|
```