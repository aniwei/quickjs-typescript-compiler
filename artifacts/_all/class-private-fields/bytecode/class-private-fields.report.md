# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-private-fields.ts
**生成时间**: 2025-12-22T03:08:38.322Z

## 大小对比

- TypeScript编译器: 423 字节
- WASM编译器: 450 字节
- 差异: -27 字节 (-6.00%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 29
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 37
    },
    {
      "index": 6,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-fields.js",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xc",
    "remaining": 339
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "increment",
      "offset": 19
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 29
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 37
    },
    {
      "index": 6,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-fields.js",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xc",
    "remaining": 366
  }
}
```

## 字节级差异

共发现 250 个字节差异:

- 偏移量 0x60: TS=0x84 vs WASM=0x86
- 偏移量 0x71: TS=0x70 vs WASM=0x75
- 偏移量 0x76: TS=0x30 vs WASM=0x70
- 偏移量 0xa9: TS=0x52 vs WASM=0x56
- 偏移量 0xaa: TS=0x56 vs WASM=0xe7
- 偏移量 0xab: TS=0xe7 vs WASM=0x00
- 偏移量 0xaf: TS=0x00 vs WASM=0xc2
- 偏移量 0xb0: TS=0xc2 vs WASM=0x01
- 偏移量 0xb1: TS=0x01 vs WASM=0x56
- 偏移量 0xb2: TS=0x52 vs WASM=0x42
- 偏移量 0xb3: TS=0x56 vs WASM=0x00
- 偏移量 0xb4: TS=0x42 vs WASM=0x00
- 偏移量 0xb6: TS=0x00 vs WASM=0x01
- 偏移量 0xb7: TS=0x00 vs WASM=0xc2
- 偏移量 0xb8: TS=0x01 vs WASM=0x03
- 偏移量 0xb9: TS=0xc2 vs WASM=0x52
- 偏移量 0xba: TS=0x03 vs WASM=0xce
- 偏移量 0xbb: TS=0xce vs WASM=0x0e
- 偏移量 0xbc: TS=0x0e vs WASM=0xd0
- 偏移量 0xbd: TS=0xd0 vs WASM=0x6b
- ... (显示前20个差异，总共250个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 02 63 12 69 6e 63 72 65 6d 65 6e 74 0e 63 6f |t.c.increment.co|
00000020: 6e 73 6f 6c 65 06 6c 6f 67 54 5f 5f 74 65 73 74 |nsole.logT__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 |s__/fixtures/cla|
00000040: 73 73 2d 70 72 69 76 61 74 65 2d 66 69 65 6c 64 |ss-private-field|
00000050: 73 2e 6a 73 0c 00 06 00 a4 01 00 04 00 03 00 04 |s.js............|
00000060: 84 01 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 |............0...|
00000070: 02 70 f0 01 03 03 30 40 e4 00 00 00 80 40 e6 00 |.p....0@.....@..|
00000080: 00 00 80 3f e4 00 00 00 82 3f e6 00 00 00 80 63 |...?.....?.....c|
00000090: 01 00 06 63 03 00 63 02 00 c1 02 58 e4 00 00 00 |...c..c....X....|
000000a0: 00 05 e5 00 00 00 cd c2 00 52 56 e7 00 00 00 00 |.........RV.....|
000000b0: c2 01 52 56 42 00 00 00 01 c2 03 ce 0e d0 6b 02 |..RVB.........k.|
000000c0: 00 3b e4 00 00 00 39 e4 00 00 00 11 21 00 00 3b |.;....9.....!..;|
000000d0: e6 00 00 00 39 e6 00 00 00 43 e7 00 00 00 24 00 |....9....C....$.|
000000e0: 00 cb 39 e8 00 00 00 43 e9 00 00 00 39 e6 00 00 |..9....C....9...|
000000f0: 00 42 42 00 00 00 24 01 00 cf 28 d4 03 14 00 00 |.BB...$...(.....|
00000100: 00 5d 14 00 1b 02 1b 14 17 15 1b 0e 1b 0a 1b 02 |.]..............|
00000110: 1b 03 00 0c 4a 07 01 ce 03 00 01 00 02 00 00 0f |....J...........|
00000120: 01 10 00 00 00 08 cb c7 43 e5 00 00 00 91 44 e5 |........C.....D.|
00000130: 00 00 00 29 d4 03 06 02 04 0d 08 20 16 00 0c 4a |...)....... ...J|
00000140: 07 01 84 01 00 01 00 01 00 00 09 01 10 00 00 00 |................|
00000150: 08 cb c7 42 e5 00 00 00 28 d4 03 08 05 04 0d 16 |...B....(.......|
00000160: 07 08 1b 15 00 0c 42 07 01 7c 00 01 00 01 00 00 |......B..|......|
00000170: 05 01 10 00 00 00 08 cb 2b c7 28 d4 03 02 00 00 |........+.(.....|
00000180: 00 0c 02 06 01 f0 01 00 01 00 04 01 00 0a 01 10 |................|
00000190: 00 00 00 ca 03 02 0d 08 cb 09 c7 68 00 00 b7 47 |...........h...G|
000001a0: 29 d4 03 02 00 00 00                            |)......|
```

### WASM
```
00000000: 05 07 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 02 63 12 69 6e 63 72 65 6d 65 6e 74 0e 63 6f |t.c.increment.co|
00000020: 6e 73 6f 6c 65 06 6c 6f 67 54 5f 5f 74 65 73 74 |nsole.logT__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 61 |s__/fixtures/cla|
00000040: 73 73 2d 70 72 69 76 61 74 65 2d 66 69 65 6c 64 |ss-private-field|
00000050: 73 2e 6a 73 0c 00 06 00 a4 01 00 04 00 03 00 04 |s.js............|
00000060: 86 01 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 |............0...|
00000070: 02 75 f0 01 03 03 70 40 e4 00 00 00 80 40 e6 00 |.u....p@.....@..|
00000080: 00 00 80 3f e4 00 00 00 82 3f e6 00 00 00 80 63 |...?.....?.....c|
00000090: 01 00 06 63 03 00 63 02 00 c1 02 58 e4 00 00 00 |...c..c....X....|
000000a0: 00 05 e5 00 00 00 cd c2 00 56 e7 00 00 00 00 c2 |.........V......|
000000b0: 01 56 42 00 00 00 01 c2 03 52 ce 0e d0 6b 03 00 |.VB......R...k..|
000000c0: 6b 02 00 3b e4 00 00 00 39 e4 00 00 00 11 21 00 |k..;....9.....!.|
000000d0: 00 3b e6 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.;....9....C....|
000000e0: 24 00 00 cb 39 e8 00 00 00 43 e9 00 00 00 39 e6 |$...9....C....9.|
000000f0: 00 00 00 42 42 00 00 00 24 01 00 cf 28 d4 03 18 |...BB...$...(...|
00000100: 00 00 00 51 12 1c 20 0e 2b 29 1b 02 1b 14 17 15 |...Q.. .+)......|
00000110: 1b 0e 1b 0a 1b 02 1b 03 00 0c 42 07 01 00 00 01 |..........B.....|
00000120: 00 04 01 00 0b 01 10 00 01 00 ca 03 02 0d 08 cb |................|
00000130: c7 11 df 45 93 18 df 46 29 d4 03 08 02 04 0d 08 |...E...F).......|
00000140: 07 08 11 0e 00 0c 42 07 01 00 00 01 00 02 01 00 |......B.........|
00000150: 06 01 10 00 01 00 ca 03 02 0d 08 cb c7 df 45 28 |..............E(|
00000160: d4 03 06 05 04 12 1e 0c 15 00 0c 40 05 01 00 00 |...........@....|
00000170: 01 00 02 01 00 0f 01 10 00 01 00 f0 01 03 0d 08 |................|
00000180: cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 d4 03 |.+h.......$..)..|
00000190: 02 08 00 00 0c 48 05 01 00 00 02 00 03 01 00 0e |.....H..........|
000001a0: 02 10 00 01 00 ea 01 00 01 00 ca 03 02 5d 0c 04 |.............]..|
000001b0: cc 08 cb ee 01 c7 68 00 00 b7 47 29 d4 03 02 00 |......h...G)....|
000001c0: 00 00                                           |..|
```