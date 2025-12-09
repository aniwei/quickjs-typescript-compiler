# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-expressions.ts
**生成时间**: 2025-12-09T04:25:00.302Z

## 大小对比

- TypeScript编译器: 266 字节
- WASM编译器: 281 字节
- 差异: -15 字节 (-5.34%)

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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "subName",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xd",
    "remaining": 184
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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "subName",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xd",
    "remaining": 199
  }
}
```

## 字节级差异

共发现 116 个字节差异:

- 偏移量 0x66: TS=0x3f vs WASM=0x3a
- 偏移量 0x92: TS=0x4f vs WASM=0xe4
- 偏移量 0x93: TS=0xe5 vs WASM=0x39
- 偏移量 0x94: TS=0x00 vs WASM=0xe6
- 偏移量 0x97: TS=0xe4 vs WASM=0x00
- 偏移量 0x98: TS=0x39 vs WASM=0x43
- 偏移量 0x99: TS=0xe6 vs WASM=0xe7
- 偏移量 0x9d: TS=0x43 vs WASM=0x68
- 偏移量 0x9e: TS=0xe7 vs WASM=0x01
- 偏移量 0xa0: TS=0x00 vs WASM=0xbf
- 偏移量 0xa1: TS=0x00 vs WASM=0x0a
- 偏移量 0xa2: TS=0x68 vs WASM=0xb9
- 偏移量 0xa3: TS=0x01 vs WASM=0xf2
- 偏移量 0xa4: TS=0x00 vs WASM=0x24
- 偏移量 0xa5: TS=0xbf vs WASM=0x01
- 偏移量 0xa6: TS=0x0a vs WASM=0x00
- 偏移量 0xa7: TS=0xb9 vs WASM=0x0e
- 偏移量 0xa8: TS=0xf2 vs WASM=0x06
- 偏移量 0xa9: TS=0x24 vs WASM=0x2f
- 偏移量 0xaa: TS=0x01 vs WASM=0xc8
- ... (显示前20个差异，总共116个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 73 2e 6a 73 06 73 75 62 0e 63 6f 6e 73 6f |ons.js.sub.conso|
00000040: 6c 65 06 6c 6f 67 02 61 02 62 0e 73 75 62 4e 61 |le.log.a.b.subNa|
00000050: 6d 65 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |me......... ....|
00000060: 00 00 00 05 02 02 3f 00 d4 01 00 0d ca 03 01 0d |......?.........|
00000070: 08 ec 02 29 c2 00 4f 6a 00 00 00 e3 39 e6 00 00 |...)..Oj....9...|
00000080: 00 43 e7 00 00 00 68 00 00 ba bb f2 24 01 00 0e |.C....h.....$...|
00000090: c2 01 4f e5 00 00 00 e4 39 e6 00 00 00 43 e7 00 |..O.....9....C..|
000000a0: 00 00 68 01 00 bf 0a b9 f2 24 01 00 0e 06 2f c8 |..h......$..../.|
000000b0: 03 18 00 00 41 00 1b 0e 1b 0a 1b 06 07 07 00 0c |....A...........|
000000c0: 08 15 1b 0e 1b 0a 20 06 07 07 00 0c 43 06 01 00 |...... .....C...|
000000d0: 02 00 02 02 00 00 04 02 d0 03 00 01 00 d2 03 00 |................|
000000e0: 01 00 d3 d4 9f 28 c8 03 00 00 0c 43 06 01 d4 03 |.....(.....C....|
000000f0: 02 00 02 02 00 00 04 02 d0 03 00 01 00 d2 03 00 |................|
00000100: 01 00 d3 d4 a0 28 c8 03 00 00                   |.....(....|
```

### WASM
```
00000000: 05 07 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 73 2e 6a 73 06 73 75 62 0e 63 6f 6e 73 6f |ons.js.sub.conso|
00000040: 6c 65 06 6c 6f 67 02 61 02 62 0e 73 75 62 4e 61 |le.log.a.b.subNa|
00000050: 6d 65 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |me......... ....|
00000060: 00 00 00 05 02 02 3a 00 d4 01 00 0d ca 03 01 0d |......:.........|
00000070: 08 ec 02 29 c2 00 4f 6a 00 00 00 e3 39 e6 00 00 |...)..Oj....9...|
00000080: 00 43 e7 00 00 00 68 00 00 ba bb f2 24 01 00 0e |.C....h.....$...|
00000090: c2 01 e4 39 e6 00 00 00 43 e7 00 00 00 68 01 00 |...9....C....h..|
000000a0: bf 0a b9 f2 24 01 00 0e 06 2f c8 03 18 00 00 41 |....$..../.....A|
000000b0: 00 1b 0e 1b 0a 1b 06 07 07 00 07 08 15 1b 0e 1b |................|
000000c0: 0a 20 06 07 07 00 0c 43 06 01 00 02 00 02 02 00 |. .....C........|
000000d0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000e0: 28 c8 03 0a 00 0c 03 01 07 08 07 03 07 11 00 0c |(...............|
000000f0: 43 06 01 d4 03 02 00 02 02 00 00 04 02 d0 03 00 |C...............|
00000100: 01 00 d2 03 00 01 00 d3 d4 a0 28 c8 03 0a 04 0c |..........(.....|
00000110: 03 01 07 08 07 03 07 11 00                      |.........|
```