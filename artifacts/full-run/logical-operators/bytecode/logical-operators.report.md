# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-operators.ts
**生成时间**: 2025-12-04T06:33:08.338Z

## 大小对比

- TypeScript编译器: 432 字节
- WASM编译器: 378 字节
- 差异: 54 字节 (14.29%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "obj_l",
      "offset": 67
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "res",
      "offset": 73
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 77
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val_l",
      "offset": 82
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "res2",
      "offset": 88
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 339
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

共发现 328 个字节差异:

- 偏移量 0x37: TS=0x0e vs WASM=0x0a
- 偏移量 0x38: TS=0x63 vs WASM=0x6f
- 偏移量 0x39: TS=0x6f vs WASM=0x62
- 偏移量 0x3a: TS=0x6e vs WASM=0x6a
- 偏移量 0x3b: TS=0x73 vs WASM=0x5f
- 偏移量 0x3c: TS=0x6f vs WASM=0x6c
- 偏移量 0x3d: TS=0x6c vs WASM=0x06
- 偏移量 0x3e: TS=0x65 vs WASM=0x72
- 偏移量 0x3f: TS=0x06 vs WASM=0x65
- 偏移量 0x40: TS=0x6c vs WASM=0x73
- 偏移量 0x41: TS=0x6f vs WASM=0x0a
- 偏移量 0x42: TS=0x67 vs WASM=0x76
- 偏移量 0x43: TS=0x0a vs WASM=0x61
- 偏移量 0x44: TS=0x6f vs WASM=0x6c
- 偏移量 0x45: TS=0x62 vs WASM=0x5f
- 偏移量 0x46: TS=0x6a vs WASM=0x6c
- 偏移量 0x47: TS=0x5f vs WASM=0x08
- 偏移量 0x48: TS=0x6c vs WASM=0x72
- 偏移量 0x49: TS=0x06 vs WASM=0x65
- 偏移量 0x4a: TS=0x72 vs WASM=0x73
- ... (显示前20个差异，总共328个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 02 74 02 66 0e 63 6f 6e 73 6f 6c 65 06 |.js.t.f.console.|
00000040: 6c 6f 67 0a 6f 62 6a 5f 6c 06 72 65 73 08 70 72 |log.obj_l.res.pr|
00000050: 6f 70 0a 76 61 6c 5f 6c 08 72 65 73 32 0d c8 03 |op.val_l.res2...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 06 00 06 06 |...... .........|
00000070: 00 bc 01 06 ca 03 01 00 20 cc 03 01 01 20 d2 03 |........ .... ..|
00000080: 01 02 20 d4 03 01 03 20 d8 03 01 04 20 da 03 01 |.. .... .... ...|
00000090: 05 20 ca 03 00 01 cc 03 01 01 d2 03 02 01 d4 03 |. ..............|
000000a0: 03 01 d8 03 04 01 da 03 05 01 08 ec 02 29 0a e3 |.............)..|
000000b0: 09 e4 39 e7 00 00 00 43 e8 00 00 00 5a 00 00 11 |..9....C....Z...|
000000c0: ec 05 0e 5a 01 00 24 01 00 0e 39 e7 00 00 00 43 |...Z..$...9....C|
000000d0: e8 00 00 00 5a 00 00 11 ed 05 0e 5a 01 00 24 01 |....Z......Z..$.|
000000e0: 00 0e 39 e7 00 00 00 43 e8 00 00 00 5a 00 00 98 |..9....C....Z...|
000000f0: 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 00 5a 00 |$...9....C....Z.|
00000100: 00 11 ec 03 0e 0a 24 01 00 0e 39 e7 00 00 00 43 |......$...9....C|
00000110: e8 00 00 00 5a 01 00 11 ed 03 0e 09 24 01 00 0e |....Z.......$...|
00000120: 07 e5 5a 02 00 11 ec 0a 0e 5a 02 00 42 eb 00 00 |..Z......Z..B...|
00000130: 00 e6 39 e7 00 00 00 43 e8 00 00 00 5a 03 00 24 |..9....C....Z..$|
00000140: 01 00 0e b7 61 04 00 5a 04 00 11 ed 04 0e bf 0a |....a..Z........|
00000150: 61 05 00 39 e7 00 00 00 43 e8 00 00 00 5a 05 00 |a..9....C....Z..|
00000160: 24 01 00 0e 06 2f c8 03 46 00 00 2c 00 1b 0e 1b |$..../..F..,....|
00000170: 0a 25 0a 11 0b 17 15 1b 0e 1b 0a 25 0a 11 0b 17 |.%.........%....|
00000180: 15 1b 0e 1b 0c 16 03 17 15 1b 0e 1b 0a 2a 01 17 |.............*..|
00000190: 15 1b 0e 1b 0a 2a 01 23 01 25 12 11 0a 21 2f 1b |.....*.#.%...!/.|
000001a0: 0e 1b 0a 11 01 2d 00 3f 15 1b 0e 1b 0a 11 01 00 |.....-.?........|
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