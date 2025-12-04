# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-operators.ts
**生成时间**: 2025-12-04T06:33:07.222Z

## 大小对比

- TypeScript编译器: 536 字节
- WASM编译器: 474 字节
- 差异: 62 字节 (13.08%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "b_op",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "c_op",
      "offset": 76
    }
  ],
  "functionHeader": {
    "offset": 81,
    "tag": "0xd",
    "remaining": 455
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

共发现 413 个字节差异:

- 偏移量 0x3b: TS=0x0e vs WASM=0x08
- 偏移量 0x3c: TS=0x63 vs WASM=0x62
- 偏移量 0x3d: TS=0x6f vs WASM=0x5f
- 偏移量 0x3e: TS=0x6e vs WASM=0x6f
- 偏移量 0x3f: TS=0x73 vs WASM=0x70
- 偏移量 0x40: TS=0x6f vs WASM=0x08
- 偏移量 0x41: TS=0x6c vs WASM=0x63
- 偏移量 0x42: TS=0x65 vs WASM=0x5f
- 偏移量 0x43: TS=0x06 vs WASM=0x6f
- 偏移量 0x44: TS=0x6c vs WASM=0x70
- 偏移量 0x45: TS=0x6f vs WASM=0x0e
- 偏移量 0x46: TS=0x67 vs WASM=0x63
- 偏移量 0x47: TS=0x08 vs WASM=0x6f
- 偏移量 0x48: TS=0x62 vs WASM=0x6e
- 偏移量 0x49: TS=0x5f vs WASM=0x73
- 偏移量 0x4b: TS=0x70 vs WASM=0x6c
- 偏移量 0x4c: TS=0x08 vs WASM=0x65
- 偏移量 0x4d: TS=0x63 vs WASM=0x06
- 偏移量 0x4e: TS=0x5f vs WASM=0x6c
- 偏移量 0x50: TS=0x70 vs WASM=0x67
- ... (显示前20个差异，总共413个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 73 69 67 6e 6d 65 6e 74 2d 6f 70 65 72 61 74 |ssignment-operat|
00000030: 6f 72 73 2e 6a 73 08 61 5f 6f 70 0e 63 6f 6e 73 |ors.js.a_op.cons|
00000040: 6f 6c 65 06 6c 6f 67 08 62 5f 6f 70 08 63 5f 6f |ole.log.b_op.c_o|
00000050: 70 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |p......... .....|
00000060: 03 00 03 03 00 8a 02 03 ca 03 01 00 20 d0 03 01 |............ ...|
00000070: 01 20 d2 03 01 02 20 ca 03 00 01 d0 03 01 01 d2 |. .... .........|
00000080: 03 02 01 08 ec 02 29 bf 0a e3 5a 00 00 bc 9f cb |......)...Z.....|
00000090: 39 e6 00 00 00 43 e7 00 00 00 5a 00 00 24 01 00 |9....C....Z..$..|
000000a0: 0e 5a 00 00 ba a0 cb 39 e6 00 00 00 43 e7 00 00 |.Z.....9....C...|
000000b0: 00 5a 00 00 24 01 00 0e 5a 00 00 b9 9c cb 39 e6 |.Z..$...Z.....9.|
000000c0: 00 00 00 43 e7 00 00 00 5a 00 00 24 01 00 0e 5a |...C....Z..$...Z|
000000d0: 00 00 bb 9d cb 39 e6 00 00 00 43 e7 00 00 00 5a |.....9....C....Z|
000000e0: 00 00 24 01 00 0e 5a 00 00 ba 9e cb 39 e6 00 00 |..$...Z.....9...|
000000f0: 00 43 e7 00 00 00 5a 00 00 24 01 00 0e b8 e4 5a |.C....Z..$.....Z|
00000100: 01 00 b8 a2 cc 39 e6 00 00 00 43 e7 00 00 00 5a |.....9....C....Z|
00000110: 01 00 24 01 00 0e 5a 01 00 b8 a3 cc 39 e6 00 00 |..$...Z.....9...|
00000120: 00 43 e7 00 00 00 5a 01 00 24 01 00 0e 5a 01 00 |.C....Z..$...Z..|
00000130: b8 a4 cc 39 e6 00 00 00 43 e7 00 00 00 5a 01 00 |...9....C....Z..|
00000140: 24 01 00 0e bc e5 5a 02 00 ba af cd 39 e6 00 00 |$.....Z.....9...|
00000150: 00 43 e7 00 00 00 5a 02 00 24 01 00 0e 5a 02 00 |.C....Z..$...Z..|
00000160: b9 b1 cd 39 e6 00 00 00 43 e7 00 00 00 5a 02 00 |...9....C....Z..|
00000170: 24 01 00 0e 5a 02 00 b8 b0 cd 39 e6 00 00 00 43 |$...Z.....9....C|
00000180: e7 00 00 00 5a 02 00 24 01 00 0e 06 2f c8 03 86 |....Z..$..../...|
00000190: 01 00 00 21 00 1b 0a 0d 09 1b 0e 1b 0a 11 01 17 |...!............|
000001a0: 15 16 0a 0d 09 1b 0e 1b 0a 11 01 17 15 16 0a 0d |................|
000001b0: 09 1b 0e 1b 0a 11 01 17 15 16 0a 0d 09 1b 0e 1b |................|
000001c0: 0a 11 01 17 15 16 0a 0d 09 1b 0e 1b 0a 11 01 1e |................|
000001d0: 15 1b 0a 0d 09 1b 0e 1b 0a 11 01 17 15 16 0a 0d |................|
000001e0: 09 1b 0e 1b 0a 11 01 17 15 16 0a 0d 09 1b 0e 1b |................|
000001f0: 0a 11 01 1e 15 1b 0a 0d 09 1b 0e 1b 0a 11 01 17 |................|
00000200: 15 16 0a 0d 09 1b 0e 1b 0a 11 01 17 15 16 0a 0d |................|
00000210: 09 1b 0e 1b 0a 11 01 00                         |........|
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