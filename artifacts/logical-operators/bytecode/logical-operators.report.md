# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-operators.ts
**生成时间**: 2025-12-06T02:09:56.403Z

## 大小对比

- TypeScript编译器: 384 字节
- WASM编译器: 378 字节
- 差异: 6 字节 (1.59%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "obj_l",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "res",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val_l",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "res2",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 76
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 84
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 291
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "obj_l",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "res",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val_l",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "res2",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 76
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 84
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 285
  }
}
```

## 字节级差异

共发现 206 个字节差异:

- 偏移量 0x6e: TS=0x03 vs WASM=0x04
- 偏移量 0x71: TS=0xbd vs WASM=0xa4
- 偏移量 0xa0: TS=0x6c vs WASM=0xec
- 偏移量 0xa1: TS=0x06 vs WASM=0x03
- 偏移量 0xa2: TS=0x00 vs WASM=0x0e
- 偏移量 0xa3: TS=0x00 vs WASM=0xe0
- 偏移量 0xa4: TS=0x00 vs WASM=0x24
- 偏移量 0xa5: TS=0x0e vs WASM=0x01
- 偏移量 0xa6: TS=0xe0 vs WASM=0x00
- 偏移量 0xa7: TS=0x24 vs WASM=0x0e
- 偏移量 0xa8: TS=0x01 vs WASM=0x39
- 偏移量 0xa9: TS=0x00 vs WASM=0xeb
- 偏移量 0xaa: TS=0x0e vs WASM=0x00
- 偏移量 0xab: TS=0x39 vs WASM=0x00
- 偏移量 0xac: TS=0xeb vs WASM=0x00
- 偏移量 0xad: TS=0x00 vs WASM=0x43
- 偏移量 0xae: TS=0x00 vs WASM=0xec
- 偏移量 0xb0: TS=0x43 vs WASM=0x00
- 偏移量 0xb1: TS=0xec vs WASM=0x00
- 偏移量 0xb2: TS=0x00 vs WASM=0xdf
- ... (显示前20个差异，总共206个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 02 74 02 66 0a 6f 62 6a 5f 6c 06 72 65 |.js.t.f.obj_l.re|
00000040: 73 0a 76 61 6c 5f 6c 08 72 65 73 32 0e 63 6f 6e |s.val_l.res2.con|
00000050: 73 6f 6c 65 06 6c 6f 67 08 70 72 6f 70 0d c8 03 |sole.log.prop...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 06 |...... .........|
00000070: 00 bd 01 00 ca 03 00 01 cc 03 01 01 ce 03 02 01 |................|
00000080: d0 03 03 01 d2 03 04 01 d4 03 05 01 08 ec 02 29 |...............)|
00000090: 0a e3 09 e4 39 eb 00 00 00 43 ec 00 00 00 df 11 |....9....C......|
000000a0: 6c 06 00 00 00 0e e0 24 01 00 0e 39 eb 00 00 00 |l......$...9....|
000000b0: 43 ec 00 00 00 df 11 6d 06 00 00 00 0e e0 24 01 |C......m......$.|
000000c0: 00 0e 39 eb 00 00 00 43 ec 00 00 00 df 98 24 01 |..9....C......$.|
000000d0: 00 0e 39 eb 00 00 00 43 ec 00 00 00 df 11 6c 06 |..9....C......l.|
000000e0: 00 00 00 0e 0a 24 01 00 0e 39 eb 00 00 00 43 ec |.....$...9....C.|
000000f0: 00 00 00 e0 11 6d 06 00 00 00 0e 09 24 01 00 0e |.....m......$...|
00000100: 07 e5 e1 11 6c 0b 00 00 00 0e e1 42 ed 00 00 00 |....l......B....|
00000110: e6 39 eb 00 00 00 43 ec 00 00 00 e2 24 01 00 0e |.9....C.....$...|
00000120: b7 61 04 00 60 04 00 11 6d 0a 00 00 00 0e 01 0a |.a..`...m.......|
00000130: 00 00 00 61 05 00 39 eb 00 00 00 43 ec 00 00 00 |...a..9....C....|
00000140: 60 05 00 24 01 00 0e 06 2f c8 03 00 32 16 08 0d |`..$..../...2...|
00000150: 00 0d 78 34 0c 2a 05 1c 6f 34 0c 2a 05 1c 6f 34 |..x4.*..o4.*..o4|
00000160: 0d 21 73 34 0c 2a 05 1c 6f 34 0c 2a 05 1d 7b 0d |.!s4.*..o4.*..{.|
00000170: 7e 2a 09 26 6d 34 0c 1d 00 17 7f 34 09 2b 6c 00 |~*.&m4.....4.+l.|
```

### WASM
```
00000000: 05 0a 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 02 74 02 66 0a 6f 62 6a 5f 6c 06 72 65 |.js.t.f.obj_l.re|
00000040: 73 0a 76 61 6c 5f 6c 08 72 65 73 32 0e 63 6f 6e |s.val_l.res2.con|
00000050: 73 6f 6c 65 06 6c 6f 67 08 70 72 6f 70 0d c8 03 |sole.log.prop...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 06 |...... .........|
00000070: 00 a4 01 00 ca 03 00 01 cc 03 01 01 ce 03 02 01 |................|
00000080: d0 03 03 01 d2 03 04 01 d4 03 05 01 08 ec 02 29 |...............)|
00000090: 0a e3 09 e4 39 eb 00 00 00 43 ec 00 00 00 df 11 |....9....C......|
000000a0: ec 03 0e e0 24 01 00 0e 39 eb 00 00 00 43 ec 00 |....$...9....C..|
000000b0: 00 00 df 11 ed 03 0e e0 24 01 00 0e 39 eb 00 00 |........$...9...|
000000c0: 00 43 ec 00 00 00 df 98 24 01 00 0e 39 eb 00 00 |.C......$...9...|
000000d0: 00 43 ec 00 00 00 df 11 ec 03 0e 0a 24 01 00 0e |.C..........$...|
000000e0: 39 eb 00 00 00 43 ec 00 00 00 e0 11 ed 03 0e 09 |9....C..........|
000000f0: 24 01 00 0e 07 e9 11 ec 08 0e e1 42 ed 00 00 00 |$..........B....|
00000100: e6 39 eb 00 00 00 43 ec 00 00 00 e2 24 01 00 0e |.9....C.....$...|
00000110: b7 62 04 00 11 ed 04 0e bf 0a 61 05 00 39 eb 00 |.b........a..9..|
00000120: 00 00 43 ec 00 00 00 60 05 00 24 01 00 0e 06 2f |..C....`..$..../|
00000130: c8 03 46 00 00 2c 00 1b 0e 1b 0a 1b 0a 07 0b 17 |..F..,..........|
00000140: 15 1b 0e 1b 0a 1b 0a 07 0b 17 15 1b 0e 1b 0c 0c |................|
00000150: 03 17 15 1b 0e 1b 0a 20 01 17 15 1b 0e 1b 0a 20 |....... ....... |
00000160: 01 1e 01 1b 12 07 0a 21 2f 1b 0e 1b 0a 07 01 1e |.......!/.......|
00000170: 00 3f 15 1b 0e 1b 0a 11 01 00                   |.?........|
```