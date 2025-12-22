# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-accessors.ts
**生成时间**: 2025-12-22T02:37:15.655Z

## 大小对比

- TypeScript编译器: 460 字节
- WASM编译器: 485 字节
- 差异: -25 字节 (-5.15%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-accessors.js",
      "offset": 20
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
    "tag": "0xc",
    "remaining": 365
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-accessors.js",
      "offset": 20
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
    "tag": "0xc",
    "remaining": 390
  }
}
```

## 字节级差异

共发现 282 个字节差异:

- 偏移量 0x6b: TS=0x78 vs WASM=0x7a
- 偏移量 0x7b: TS=0x30 vs WASM=0x70
- 偏移量 0xa5: TS=0x52 vs WASM=0x56
- 偏移量 0xa6: TS=0x56 vs WASM=0x42
- 偏移量 0xa7: TS=0x42 vs WASM=0x00
- 偏移量 0xaa: TS=0x00 vs WASM=0x01
- 偏移量 0xab: TS=0x01 vs WASM=0xc2
- 偏移量 0xac: TS=0xc2 vs WASM=0x01
- 偏移量 0xad: TS=0x01 vs WASM=0x56
- 偏移量 0xae: TS=0x52 vs WASM=0x42
- 偏移量 0xaf: TS=0x56 vs WASM=0x00
- 偏移量 0xb0: TS=0x42 vs WASM=0x00
- 偏移量 0xb2: TS=0x00 vs WASM=0x02
- 偏移量 0xb3: TS=0x00 vs WASM=0xc2
- 偏移量 0xb4: TS=0x02 vs WASM=0x03
- 偏移量 0xb5: TS=0xc2 vs WASM=0x52
- 偏移量 0xb6: TS=0x03 vs WASM=0xcd
- 偏移量 0xb7: TS=0xcd vs WASM=0x0e
- 偏移量 0xb8: TS=0x0e vs WASM=0xd0
- 偏移量 0xb9: TS=0xd0 vs WASM=0x6b
- ... (显示前20个差异，总共282个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 06 42 6f 78 02 62 0e 63 6f 6e 73 6f 6c 65 |...Box.b.console|
00000010: 06 6c 6f 67 4a 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logJ__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 63 6c 61 73 73 2d 61 63 |ixtures/class-ac|
00000030: 63 65 73 73 6f 72 73 2e 6a 73 1a 47 65 74 74 69 |cessors.js.Getti|
00000040: 6e 67 20 76 61 6c 75 65 0c 5f 76 61 6c 75 65 02 |ng value._value.|
00000050: 76 1a 53 65 74 74 69 6e 67 20 76 61 6c 75 65 0c |v.Setting value.|
00000060: 00 06 00 a4 01 00 03 00 03 00 04 78 03 a6 01 00 |...........x....|
00000070: 00 00 c8 03 02 00 30 f0 01 03 02 30 40 e4 00 00 |......0....0@...|
00000080: 00 80 40 e5 00 00 00 80 3f e4 00 00 00 82 3f e5 |..@.....?.....?.|
00000090: 00 00 00 80 63 01 00 06 63 02 00 c1 02 58 e4 00 |....c...c....X..|
000000a0: 00 00 00 c2 00 52 56 42 00 00 00 01 c2 01 52 56 |.....RVB......RV|
000000b0: 42 00 00 00 02 c2 03 cd 0e d0 3b e4 00 00 00 39 |B.........;....9|
000000c0: e4 00 00 00 11 21 00 00 3b e5 00 00 00 39 e5 00 |.....!..;....9..|
000000d0: 00 00 bf 0a 15 44 42 00 00 00 cb 39 e6 00 00 00 |.....DB....9....|
000000e0: 43 e7 00 00 00 39 e5 00 00 00 42 42 00 00 00 24 |C....9....BB...$|
000000f0: 01 00 cf 28 d0 03 10 00 00 00 51 18 00 49 00 1b |...(......Q..I..|
00000100: 0e 1b 0a 1b 02 1b 03 00 0c 4a 07 01 84 01 00 01 |.........J......|
00000110: 00 03 00 00 1c 01 10 00 00 00 08 cb 39 e6 00 00 |............9...|
00000120: 00 43 e7 00 00 00 04 e9 00 00 00 24 01 00 0e c7 |.C.........$....|
00000130: 42 ea 00 00 00 28 d0 03 0e 02 04 0d 08 1b 0e 34 |B....(.........4|
00000140: 08 17 07 07 08 1b 15 00 0c 4a 07 01 84 01 01 01 |.........J......|
00000150: 01 03 00 00 1e 02 d6 03 00 01 00 10 00 00 00 08 |................|
00000160: cb 39 e6 00 00 00 43 e7 00 00 00 04 ec 00 00 00 |.9....C.........|
00000170: 24 01 00 0e c7 d3 15 44 ea 00 00 00 29 d0 03 0c |$......D....)...|
00000180: 06 04 0d 08 1b 0e 34 08 17 15 07 1c 00 0c 42 07 |......4.......B.|
00000190: 01 7c 00 01 00 01 00 00 05 01 10 00 00 00 08 cb |.|..............|
000001a0: 2b c7 28 d0 03 02 00 00 00 0c 02 06 01 f0 01 00 |+.(.............|
000001b0: 01 00 03 00 00 0b 01 10 00 00 00 08 cb 09 c7 b7 |................|
000001c0: 4e ea 00 00 00 29 d0 03 02 00 00 00             |N....)......|
```

### WASM
```
00000000: 05 09 06 42 6f 78 02 62 0e 63 6f 6e 73 6f 6c 65 |...Box.b.console|
00000010: 06 6c 6f 67 4a 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logJ__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 63 6c 61 73 73 2d 61 63 |ixtures/class-ac|
00000030: 63 65 73 73 6f 72 73 2e 6a 73 1a 47 65 74 74 69 |cessors.js.Getti|
00000040: 6e 67 20 76 61 6c 75 65 0c 5f 76 61 6c 75 65 02 |ng value._value.|
00000050: 76 1a 53 65 74 74 69 6e 67 20 76 61 6c 75 65 0c |v.Setting value.|
00000060: 00 06 00 a4 01 00 03 00 03 00 04 7a 03 a6 01 00 |...........z....|
00000070: 00 00 c8 03 02 00 30 f0 01 03 02 70 40 e4 00 00 |......0....p@...|
00000080: 00 80 40 e5 00 00 00 80 3f e4 00 00 00 82 3f e5 |..@.....?.....?.|
00000090: 00 00 00 80 63 01 00 06 63 02 00 c1 02 58 e4 00 |....c...c....X..|
000000a0: 00 00 00 c2 00 56 42 00 00 00 01 c2 01 56 42 00 |.....VB......VB.|
000000b0: 00 00 02 c2 03 52 cd 0e d0 6b 02 00 3b e4 00 00 |.....R...k..;...|
000000c0: 00 39 e4 00 00 00 11 21 00 00 3b e5 00 00 00 39 |.9.....!..;....9|
000000d0: e5 00 00 00 bf 0a 15 44 42 00 00 00 cb 39 e6 00 |.......DB....9..|
000000e0: 00 00 43 e7 00 00 00 39 e5 00 00 00 42 42 00 00 |..C....9....BB..|
000000f0: 00 24 01 00 cf 28 d0 03 16 00 00 00 45 16 1c 20 |.$...(......E.. |
00000100: 06 2b 21 1b 02 30 01 1b 0e 1b 0a 1b 02 1b 03 00 |.+!..0..........|
00000110: 0c 42 07 01 00 00 01 00 03 00 00 1c 01 10 00 01 |.B..............|
00000120: 00 08 cb 39 e6 00 00 00 43 e7 00 00 00 04 e9 00 |...9....C.......|
00000130: 00 00 24 01 00 0e c7 42 ea 00 00 00 28 d0 03 0c |..$....B....(...|
00000140: 02 04 0d 08 1b 0e 34 08 1c 00 1b 15 00 0c 42 07 |......4.......B.|
00000150: 01 00 01 01 01 03 00 00 1d 02 d6 03 00 01 00 10 |................|
00000160: 00 01 00 08 cb 39 e6 00 00 00 43 e7 00 00 00 04 |.....9....C.....|
00000170: ec 00 00 00 24 01 00 0e c7 d3 44 ea 00 00 00 29 |....$.....D....)|
00000180: d0 03 0c 06 04 0d 08 1b 0e 34 08 17 15 07 1c 00 |.........4......|
00000190: 0c 40 05 01 00 00 01 00 02 01 00 0f 01 10 00 01 |.@..............|
000001a0: 00 f0 01 02 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b |.......+h.......|
000001b0: 24 00 00 29 d0 03 02 0a 00 00 0c 48 05 01 00 00 |$..).......H....|
000001c0: 02 00 02 00 00 0f 02 10 00 01 00 ea 01 00 01 00 |................|
000001d0: 0c 04 cc 08 cb ee 01 c7 b7 4e ea 00 00 00 29 d0 |.........N....).|
000001e0: 03 02 00 00 00                                  |.....|
```