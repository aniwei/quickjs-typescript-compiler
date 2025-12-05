# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-static.ts
**生成时间**: 2025-12-05T12:54:23.877Z

## 大小对比

- TypeScript编译器: 526 字节
- WASM编译器: 458 字节
- 差异: 68 字节 (14.85%)

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
      "rawLength": 222,
      "actualLength": 111,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/class-static.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "MathUtil",
      "offset": 115
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "square",
      "offset": 124
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "area",
      "offset": 131
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 136
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 144
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "PI",
      "offset": 148
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 151
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 153
    }
  ],
  "functionHeader": {
    "offset": 155,
    "tag": "0xd",
    "remaining": 371
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

共发现 475 个字节差异:

- 偏移量 0x2: TS=0xde vs WASM=0x56
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共475个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 de 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 69 63 |res/class-static|
00000070: 2e 6a 73 10 4d 61 74 68 55 74 69 6c 0c 73 71 75 |.js.MathUtil.squ|
00000080: 61 72 65 08 61 72 65 61 0e 63 6f 6e 73 6f 6c 65 |are.area.console|
00000090: 06 6c 6f 67 04 50 49 02 78 02 72 0d c8 03 00 00 |.log.PI.x.r.....|
000000a0: 00 00 00 0c 20 06 01 a4 01 00 02 00 03 02 04 80 |.... ...........|
000000b0: 01 02 ca 03 01 00 00 f0 01 02 00 00 ca 03 00 01 |................|
000000c0: f0 01 01 01 08 6c 78 00 00 00 06 02 02 00 00 00 |.....lx.........|
000000d0: 58 e5 00 00 00 00 c2 00 1b 56 e6 00 00 00 00 1b |X........V......|
000000e0: c2 01 1b 56 e7 00 00 00 00 1b 06 5b 01 00 0e 11 |...V.......[....|
000000f0: 03 03 00 00 00 52 24 00 00 0e 11 e3 51 39 e8 00 |.....R$.....Q9..|
00000100: 00 00 43 e9 00 00 00 df 42 ea 00 00 00 24 01 00 |..C.....B....$..|
00000110: 0e 39 e8 00 00 00 43 e9 00 00 00 df 43 e6 00 00 |.9....C.....C...|
00000120: 00 bc 24 01 00 24 01 00 0e 39 e8 00 00 00 43 e9 |..$..$...9....C.|
00000130: 00 00 00 df 43 e7 00 00 00 b9 24 01 00 24 01 00 |....C.....$..$..|
00000140: 0e 29 06 2f c8 03 01 0c 00 39 0a 00 0a 02 00 14 |.)./.....9......|
00000150: 01 00 18 01 00 0c 00 04 00 cc 03 01 01 01 03 00 |................|
00000160: 00 05 02 d6 03 00 00 00 10 00 00 00 d3 d3 9c 28 |...............(|
00000170: 29 c8 03 01 06 00 00 03 00 00 01 00 0c 00 04 00 |)...............|
00000180: ce 03 01 01 01 03 01 00 13 02 d8 03 00 00 00 10 |................|
00000190: 00 00 00 ca 03 00 00 df 42 ea 00 00 00 df 43 e6 |........B.....C.|
000001a0: 00 00 00 d3 24 01 00 9c 28 29 c8 03 01 06 00 00 |....$...()......|
000001b0: 07 00 00 01 00 0c 00 04 00 ca 03 00 00 00 03 00 |................|
000001c0: 00 18 00 2b 39 78 00 00 00 11 6c 0a 00 00 00 39 |...+9x....l....9|
000001d0: 08 00 00 00 1b 24 00 00 0e 0e 29 c8 03 01 00 00 |.....$....).....|
000001e0: 0c 00 04 00 00 00 01 00 03 00 01 0c 01 10 00 00 |................|
000001f0: 00 c7 02 00 00 00 00 4e ea 00 00 00 29 c8 03 01 |.......N....)...|
00000200: 03 00 01 01 00 06 6e 86 1b f0 f9 21 09 40       |......n....!.@|
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