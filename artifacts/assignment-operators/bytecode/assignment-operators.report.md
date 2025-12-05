# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-operators.ts
**生成时间**: 2025-12-05T12:54:23.781Z

## 大小对比

- TypeScript编译器: 527 字节
- WASM编译器: 474 字节
- 差异: 53 字节 (11.18%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 238,
      "actualLength": 119,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "a_op",
      "offset": 123
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "b_op",
      "offset": 128
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "c_op",
      "offset": 133
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 138
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 146
    }
  ],
  "functionHeader": {
    "offset": 150,
    "tag": "0xd",
    "remaining": 377
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/assignment-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "a_op",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "b_op",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "c_op",
      "offset": 64
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 69
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 77
    }
  ],
  "functionHeader": {
    "offset": 81,
    "tag": "0xd",
    "remaining": 393
  }
}
```

## 字节级差异

共发现 481 个字节差异:

- 偏移量 0x2: TS=0xee vs WASM=0x66
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
- ... (显示前20个差异，总共481个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 ee 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 61 73 73 69 67 6e 6d 65 6e 74 2d 6f |res/assignment-o|
00000070: 70 65 72 61 74 6f 72 73 2e 6a 73 08 61 5f 6f 70 |perators.js.a_op|
00000080: 08 62 5f 6f 70 08 63 5f 6f 70 0e 63 6f 6e 73 6f |.b_op.c_op.conso|
00000090: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
000000a0: 06 01 a4 01 00 03 00 03 03 00 fa 01 03 ca 03 00 |................|
000000b0: 00 00 cc 03 00 00 00 ce 03 00 00 00 ca 03 00 01 |................|
000000c0: cc 03 01 01 ce 03 02 01 08 6c f2 00 00 00 01 0a |.........l......|
000000d0: 00 00 00 e3 df bc 9f 5b 00 00 39 e8 00 00 00 43 |.......[..9....C|
000000e0: e9 00 00 00 df 24 01 00 0e df ba a0 5b 00 00 39 |.....$......[..9|
000000f0: e8 00 00 00 43 e9 00 00 00 df 24 01 00 0e df b9 |....C.....$.....|
00000100: 9c 5b 00 00 39 e8 00 00 00 43 e9 00 00 00 df 24 |.[..9....C.....$|
00000110: 01 00 0e df bb 9d 5b 00 00 39 e8 00 00 00 43 e9 |......[..9....C.|
00000120: 00 00 00 df 24 01 00 0e df ba 9e 5b 00 00 39 e8 |....$......[..9.|
00000130: 00 00 00 43 e9 00 00 00 df 24 01 00 0e b8 e4 e0 |...C.....$......|
00000140: b8 a2 5b 01 00 39 e8 00 00 00 43 e9 00 00 00 e0 |..[..9....C.....|
00000150: 24 01 00 0e e0 b8 a3 5b 01 00 39 e8 00 00 00 43 |$......[..9....C|
00000160: e9 00 00 00 e0 24 01 00 0e e0 b8 a4 5b 01 00 39 |.....$......[..9|
00000170: e8 00 00 00 43 e9 00 00 00 e0 24 01 00 0e bc e5 |....C.....$.....|
00000180: e1 ba af 5b 02 00 39 e8 00 00 00 43 e9 00 00 00 |...[..9....C....|
00000190: e1 24 01 00 0e e1 b9 b1 5b 02 00 39 e8 00 00 00 |.$......[..9....|
000001a0: 43 e9 00 00 00 e1 24 01 00 0e e1 b8 b0 5b 02 00 |C.....$......[..|
000001b0: 39 e8 00 00 00 43 e9 00 00 00 e1 24 01 00 0e 29 |9....C.....$...)|
000001c0: 06 2f c8 03 01 48 00 0d 01 00 0f 01 00 06 01 00 |./...H..........|
000001d0: 0f 01 00 06 01 00 0f 01 00 06 01 00 0f 01 00 06 |................|
000001e0: 01 00 0f 01 00 05 02 00 03 01 00 0f 01 00 06 01 |................|
000001f0: 00 0f 01 00 06 01 00 0f 01 00 05 02 00 03 01 00 |................|
00000200: 0f 01 00 06 01 00 0f 01 00 06 01 00 0f 01 00    |...............|
```

### WASM
```
00000000: 05 06 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 73 69 67 6e 6d 65 6e 74 2d 6f 70 65 72 61 74 |ssignment-operat|
00000030: 6f 72 73 2e 6a 73 08 61 5f 6f 70 08 62 5f 6f 70 |ors.js.a_op.b_op|
00000040: 08 63 5f 6f 70 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.c_op.console.lo|
00000050: 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |g......... .....|
00000060: 00 00 03 03 00 db 01 00 ca 03 00 01 cc 03 01 01 |................|
00000070: ce 03 02 01 08 ec 02 29 bf 0a e7 bc 9f e3 39 e8 |.......)......9.|
00000080: 00 00 00 43 e9 00 00 00 df 24 01 00 0e df ba a0 |...C.....$......|
00000090: e3 39 e8 00 00 00 43 e9 00 00 00 df 24 01 00 0e |.9....C.....$...|
000000a0: df b9 9c e3 39 e8 00 00 00 43 e9 00 00 00 df 24 |....9....C.....$|
000000b0: 01 00 0e df bb 9d e3 39 e8 00 00 00 43 e9 00 00 |.......9....C...|
000000c0: 00 df 24 01 00 0e df ba 9e e3 39 e8 00 00 00 43 |..$.......9....C|
000000d0: e9 00 00 00 df 24 01 00 0e b8 e8 b8 a2 e4 39 e8 |.....$........9.|
000000e0: 00 00 00 43 e9 00 00 00 e0 24 01 00 0e e0 b8 a3 |...C.....$......|
000000f0: e4 39 e8 00 00 00 43 e9 00 00 00 e0 24 01 00 0e |.9....C.....$...|
00000100: e0 b8 a4 e4 39 e8 00 00 00 43 e9 00 00 00 e0 24 |....9....C.....$|
00000110: 01 00 0e bc e9 ba af e5 39 e8 00 00 00 43 e9 00 |........9....C..|
00000120: 00 00 e1 24 01 00 0e e1 b9 b1 e5 39 e8 00 00 00 |...$.......9....|
00000130: 43 e9 00 00 00 e1 24 01 00 0e e1 b8 b0 e5 39 e8 |C.....$.......9.|
00000140: 00 00 00 43 e9 00 00 00 e1 24 01 00 0e 06 2f c8 |...C.....$..../.|
00000150: 03 86 01 00 00 21 00 0c 0a 0d 09 1b 0e 1b 0a 07 |.....!..........|
00000160: 01 17 15 0c 0a 0d 09 1b 0e 1b 0a 07 01 17 15 0c |................|
00000170: 0a 0d 09 1b 0e 1b 0a 07 01 17 15 0c 0a 0d 09 1b |................|
00000180: 0e 1b 0a 07 01 17 15 0c 0a 0d 09 1b 0e 1b 0a 07 |................|
00000190: 01 1e 15 0c 0a 0d 09 1b 0e 1b 0a 07 01 17 15 0c |................|
000001a0: 0a 0d 09 1b 0e 1b 0a 07 01 17 15 0c 0a 0d 09 1b |................|
000001b0: 0e 1b 0a 07 01 1e 15 0c 0a 0d 09 1b 0e 1b 0a 07 |................|
000001c0: 01 17 15 0c 0a 0d 09 1b 0e 1b 0a 07 01 17 15 0c |................|
000001d0: 0a 0d 09 1b 0e 1b 0a 07 01 00                   |..........|
```