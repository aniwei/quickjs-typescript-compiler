# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-operators.ts
**生成时间**: 2025-12-05T12:54:24.058Z

## 大小对比

- TypeScript编译器: 472 字节
- WASM编译器: 378 字节
- 差异: 94 字节 (24.87%)

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
      "rawLength": 232,
      "actualLength": 116,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 120
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 122
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "obj_l",
      "offset": 124
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "res",
      "offset": 130
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val_l",
      "offset": 134
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "res2",
      "offset": 140
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 145
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 153
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prop",
      "offset": 157
    }
  ],
  "functionHeader": {
    "offset": 162,
    "tag": "0xd",
    "remaining": 310
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

共发现 441 个字节差异:

- 偏移量 0x2: TS=0xe8 vs WASM=0x60
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
- ... (显示前20个差异，总共441个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a e8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6c 6f 67 69 63 61 6c 2d 6f 70 65 72 |res/logical-oper|
00000070: 61 74 6f 72 73 2e 6a 73 02 74 02 66 0a 6f 62 6a |ators.js.t.f.obj|
00000080: 5f 6c 06 72 65 73 0a 76 61 6c 5f 6c 08 72 65 73 |_l.res.val_l.res|
00000090: 32 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 08 70 72 |2.console.log.pr|
000000a0: 6f 70 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |op......... ....|
000000b0: 00 06 00 03 06 00 c0 01 06 ca 03 00 00 00 cc 03 |................|
000000c0: 00 00 00 ce 03 00 00 00 d0 03 00 00 00 d2 03 00 |................|
000000d0: 00 00 d4 03 00 00 00 ca 03 00 01 cc 03 01 01 ce |................|
000000e0: 03 02 01 d0 03 03 01 d2 03 04 01 d4 03 05 01 08 |................|
000000f0: 6c b8 00 00 00 0a e3 09 e4 39 eb 00 00 00 43 ec |l........9....C.|
00000100: 00 00 00 df 11 6c 02 00 00 00 0e e0 24 01 00 0e |.....l......$...|
00000110: 39 eb 00 00 00 43 ec 00 00 00 df 11 6d 02 00 00 |9....C......m...|
00000120: 00 0e e0 24 01 00 0e 39 eb 00 00 00 43 ec 00 00 |...$...9....C...|
00000130: 00 df 98 24 01 00 0e 39 eb 00 00 00 43 ec 00 00 |...$...9....C...|
00000140: 00 df 11 6c 02 00 00 00 0e 0a 24 01 00 0e 39 eb |...l......$...9.|
00000150: 00 00 00 43 ec 00 00 00 e0 11 6d 02 00 00 00 0e |...C......m.....|
00000160: 09 24 01 00 0e 07 e5 e1 11 6c 07 00 00 00 0e e1 |.$.......l......|
00000170: 42 ed 00 00 00 e6 39 eb 00 00 00 43 ec 00 00 00 |B.....9....C....|
00000180: e2 24 01 00 0e b7 61 04 00 60 04 00 11 6d 06 00 |.$....a..`...m..|
00000190: 00 00 0e 01 0a 00 00 00 61 05 00 39 eb 00 00 00 |........a..9....|
000001a0: 43 ec 00 00 00 60 05 00 24 01 00 0e 29 06 2f c8 |C....`..$...)./.|
000001b0: 03 01 24 00 08 01 00 0c 01 00 17 01 00 17 01 00 |..$.............|
000001c0: 10 01 00 17 01 00 0d 02 00 02 01 00 19 01 00 05 |................|
000001d0: 02 00 04 01 00 1c 01 00                         |........|
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