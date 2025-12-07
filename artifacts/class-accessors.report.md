# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/class-accessors.ts
**生成时间**: 2025-12-07T05:50:50.669Z

## 大小对比

- TypeScript编译器: 442 字节
- WASM编译器: 437 字节
- 差异: 5 字节 (1.14%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 11,
  "atoms": [
    {
      "index": 0,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-accessors.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 73
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 75
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 83
    },
    {
      "index": 6,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "<home_object>",
      "offset": 87
    },
    {
      "index": 7,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Getting value",
      "offset": 101
    },
    {
      "index": 8,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "_value",
      "offset": 115
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 122
    },
    {
      "index": 10,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Setting value",
      "offset": 124
    }
  ],
  "functionHeader": {
    "offset": 138,
    "tag": "0xd",
    "remaining": 304
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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-accessors.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "_value",
      "offset": 67
    },
    {
      "index": 6,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Getting value",
      "offset": 74
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 88
    },
    {
      "index": 8,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "Setting value",
      "offset": 90
    }
  ],
  "functionHeader": {
    "offset": 104,
    "tag": "0xd",
    "remaining": 333
  }
}
```

## 字节级差异

共发现 352 个字节差异:

- 偏移量 0x1: TS=0x0b vs WASM=0x09
- 偏移量 0x35: TS=0x26 vs WASM=0x02
- 偏移量 0x36: TS=0x3c vs WASM=0x62
- 偏移量 0x37: TS=0x63 vs WASM=0x0e
- 偏移量 0x38: TS=0x6c vs WASM=0x63
- 偏移量 0x39: TS=0x61 vs WASM=0x6f
- 偏移量 0x3a: TS=0x73 vs WASM=0x6e
- 偏移量 0x3c: TS=0x5f vs WASM=0x6f
- 偏移量 0x3d: TS=0x66 vs WASM=0x6c
- 偏移量 0x3e: TS=0x69 vs WASM=0x65
- 偏移量 0x3f: TS=0x65 vs WASM=0x06
- 偏移量 0x41: TS=0x64 vs WASM=0x6f
- 偏移量 0x42: TS=0x73 vs WASM=0x67
- 偏移量 0x43: TS=0x5f vs WASM=0x0c
- 偏移量 0x44: TS=0x69 vs WASM=0x5f
- 偏移量 0x45: TS=0x6e vs WASM=0x76
- 偏移量 0x46: TS=0x69 vs WASM=0x61
- 偏移量 0x47: TS=0x74 vs WASM=0x6c
- 偏移量 0x48: TS=0x3e vs WASM=0x75
- 偏移量 0x49: TS=0x02 vs WASM=0x65
- ... (显示前20个差异，总共352个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0b 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 61 63 63 65 73 73 6f 72 73 2e 6a |lass-accessors.j|
00000030: 73 06 42 6f 78 26 3c 63 6c 61 73 73 5f 66 69 65 |s.Box&<class_fie|
00000040: 6c 64 73 5f 69 6e 69 74 3e 02 62 0e 63 6f 6e 73 |lds_init>.b.cons|
00000050: 6f 6c 65 06 6c 6f 67 1a 3c 68 6f 6d 65 5f 6f 62 |ole.log.<home_ob|
00000060: 6a 65 63 74 3e 1a 47 65 74 74 69 6e 67 20 76 61 |ject>.Getting va|
00000070: 6c 75 65 0c 5f 76 61 6c 75 65 02 76 1a 53 65 74 |lue._value.v.Set|
00000080: 74 69 6e 67 20 76 61 6c 75 65 0d c8 03 00 00 00 |ting value......|
00000090: 00 00 0c 20 06 01 a4 01 00 00 00 03 03 03 4f 00 |... ..........O.|
000000a0: ca 03 00 0d cc 03 01 0d ce 03 02 0d 08 ec 02 29 |...............)|
000000b0: 63 00 00 06 63 01 00 c2 00 58 e5 00 00 00 00 c2 |c...c....X......|
000000c0: 01 56 42 00 00 00 01 c2 02 56 42 00 00 00 02 cc |.VB......VB.....|
000000d0: 6b 01 00 cf e3 e5 bf 0a 11 68 02 00 1b 44 42 00 |k........h...DB.|
000000e0: 00 00 0e 39 e8 00 00 00 43 e9 00 00 00 68 02 00 |...9....C....h..|
000000f0: 42 42 00 00 00 24 01 00 0e 06 2f c8 03 0e 0e 06 |BB...$..../.....|
00000100: e4 0b 3a 00 1b 0e 16 0a 16 02 16 03 00 0c 03 04 |..:.............|
00000110: 01 ca 03 00 01 00 02 01 00 1e 01 10 00 00 10 cc |................|
00000120: 03 01 0c 08 cb 2b 68 00 00 11 ec 07 c7 1b 24 00 |.....+h.......$.|
00000130: 00 0e 0e 68 00 00 11 ec 07 c7 1b 24 00 00 0e 0e |...h.......$....|
00000140: 29 c8 03 02 00 00 00 0c 00 00 00 84 01 00 02 00 |)...............|
00000150: 03 00 00 1e 02 10 00 00 10 d4 03 00 00 00 0c 04 |................|
00000160: cc 08 cb 39 e8 00 00 00 43 e9 00 00 00 04 eb 00 |...9....C.......|
00000170: 00 00 24 01 00 0e 42 ec 00 00 00 28 0c 00 00 00 |..$...B....(....|
00000180: 84 01 01 02 01 03 00 00 22 03 da 03 00 01 00 10 |........".......|
00000190: 00 00 10 d4 03 00 00 00 0c 04 cc 08 cb 39 e8 00 |.............9..|
000001a0: 00 00 43 e9 00 00 00 04 ee 00 00 00 24 01 00 0e |..C.........$...|
000001b0: d3 11 1b 44 ec 00 00 00 0e 29                   |...D.....)|
```

### WASM
```
00000000: 05 09 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 61 63 63 65 73 73 6f 72 73 2e 6a |lass-accessors.j|
00000030: 73 06 42 6f 78 02 62 0e 63 6f 6e 73 6f 6c 65 06 |s.Box.b.console.|
00000040: 6c 6f 67 0c 5f 76 61 6c 75 65 1a 47 65 74 74 69 |log._value.Getti|
00000050: 6e 67 20 76 61 6c 75 65 02 76 1a 53 65 74 74 69 |ng value.v.Setti|
00000060: 6e 67 20 76 61 6c 75 65 0d c8 03 00 00 00 00 00 |ng value........|
00000070: 0c 20 06 01 a4 01 00 02 00 03 02 03 55 02 ca 03 |. ..........U...|
00000080: 02 00 30 f0 01 03 01 70 ca 03 00 09 cc 03 01 0d |..0....p........|
00000090: 08 ec 02 29 63 00 00 06 63 01 00 c1 00 58 e5 00 |...)c...c....X..|
000000a0: 00 00 00 c2 01 56 42 00 00 00 01 c2 02 56 42 00 |.....VB......VB.|
000000b0: 00 00 02 06 cc 0e cf 6b 01 00 e3 68 00 00 11 21 |.......k...h...!|
000000c0: 00 00 e4 68 01 00 bf 0a 44 42 00 00 00 39 e7 00 |...h....DB...9..|
000000d0: 00 00 43 e8 00 00 00 68 01 00 42 42 00 00 00 24 |..C....h..BB...$|
000000e0: 01 00 0e 06 2f c8 03 16 00 00 00 2b 1a 1c 16 06 |..../......+....|
000000f0: 17 21 11 02 26 01 1b 0e 1b 0a 11 02 1b 03 00 0c |.!..&...........|
00000100: 42 07 01 00 00 01 00 02 01 00 17 01 10 00 01 00 |B...............|
00000110: f0 01 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 |......+h.......$|
00000120: 00 00 0e c7 b7 44 e9 00 00 00 29 c8 03 06 01 04 |.....D....).....|
00000130: 4e 08 07 08 00 0c 42 07 01 00 00 01 00 03 00 00 |N.....B.........|
00000140: 1c 01 10 00 01 00 08 cb 39 e7 00 00 00 43 e8 00 |........9....C..|
00000150: 00 00 04 ea 00 00 00 24 01 00 0e c7 42 e9 00 00 |.......$....B...|
00000160: 00 28 c8 03 0c 04 04 0d 08 1b 0e 34 08 1c 00 1b |.(.........4....|
00000170: 15 00 0c 42 07 01 00 01 01 01 03 00 00 1d 02 d6 |...B............|
00000180: 03 00 01 00 10 00 01 00 08 cb 39 e7 00 00 00 43 |..........9....C|
00000190: e8 00 00 00 04 ec 00 00 00 24 01 00 0e c7 d3 44 |.........$.....D|
000001a0: e9 00 00 00 29 c8 03 0c 08 04 0d 08 1b 0e 34 08 |....).........4.|
000001b0: 17 15 07 1c 00                                  |.....|
```