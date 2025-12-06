# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/assignment-operators.ts
**生成时间**: 2025-12-06T02:09:56.238Z

## 大小对比

- TypeScript编译器: 460 字节
- WASM编译器: 474 字节
- 差异: -14 字节 (-2.95%)

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
    "remaining": 379
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

共发现 307 个字节差异:

- 偏移量 0x65: TS=0xf7 vs WASM=0xdb
- 偏移量 0x78: TS=0x01 vs WASM=0xbf
- 偏移量 0x7a: TS=0x00 vs WASM=0xe7
- 偏移量 0x7b: TS=0x00 vs WASM=0xbc
- 偏移量 0x7c: TS=0x00 vs WASM=0x9f
- 偏移量 0x7e: TS=0xdf vs WASM=0x39
- 偏移量 0x7f: TS=0xbc vs WASM=0xe8
- 偏移量 0x80: TS=0x9f vs WASM=0x00
- 偏移量 0x81: TS=0x5b vs WASM=0x00
- 偏移量 0x83: TS=0x00 vs WASM=0x43
- 偏移量 0x84: TS=0x39 vs WASM=0xe9
- 偏移量 0x85: TS=0xe8 vs WASM=0x00
- 偏移量 0x88: TS=0x00 vs WASM=0xdf
- 偏移量 0x89: TS=0x43 vs WASM=0x24
- 偏移量 0x8a: TS=0xe9 vs WASM=0x01
- 偏移量 0x8c: TS=0x00 vs WASM=0x0e
- 偏移量 0x8d: TS=0x00 vs WASM=0xdf
- 偏移量 0x8e: TS=0xdf vs WASM=0xba
- 偏移量 0x8f: TS=0x24 vs WASM=0xa0
- 偏移量 0x90: TS=0x01 vs WASM=0xe3
- ... (显示前20个差异，总共307个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 73 73 69 67 6e 6d 65 6e 74 2d 6f 70 65 72 61 74 |ssignment-operat|
00000030: 6f 72 73 2e 6a 73 08 61 5f 6f 70 08 62 5f 6f 70 |ors.js.a_op.b_op|
00000040: 08 63 5f 6f 70 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.c_op.console.lo|
00000050: 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |g......... .....|
00000060: 00 00 03 03 00 f7 01 00 ca 03 00 01 cc 03 01 01 |................|
00000070: ce 03 02 01 08 ec 02 29 01 0a 00 00 00 e3 df bc |.......)........|
00000080: 9f 5b 00 00 39 e8 00 00 00 43 e9 00 00 00 df 24 |.[..9....C.....$|
00000090: 01 00 0e df ba a0 5b 00 00 39 e8 00 00 00 43 e9 |......[..9....C.|
000000a0: 00 00 00 df 24 01 00 0e df b9 9c 5b 00 00 39 e8 |....$......[..9.|
000000b0: 00 00 00 43 e9 00 00 00 df 24 01 00 0e df bb 9d |...C.....$......|
000000c0: 5b 00 00 39 e8 00 00 00 43 e9 00 00 00 df 24 01 |[..9....C.....$.|
000000d0: 00 0e df ba 9e 5b 00 00 39 e8 00 00 00 43 e9 00 |.....[..9....C..|
000000e0: 00 00 df 24 01 00 0e b8 e4 e0 b8 a2 5b 01 00 39 |...$........[..9|
000000f0: e8 00 00 00 43 e9 00 00 00 e0 24 01 00 0e e0 b8 |....C.....$.....|
00000100: a3 5b 01 00 39 e8 00 00 00 43 e9 00 00 00 e0 24 |.[..9....C.....$|
00000110: 01 00 0e e0 b8 a4 5b 01 00 39 e8 00 00 00 43 e9 |......[..9....C.|
00000120: 00 00 00 e0 24 01 00 0e bc e5 e1 ba af 5b 02 00 |....$........[..|
00000130: 39 e8 00 00 00 43 e9 00 00 00 e1 24 01 00 0e e1 |9....C.....$....|
00000140: b9 b1 5b 02 00 39 e8 00 00 00 43 e9 00 00 00 e1 |..[..9....C.....|
00000150: 24 01 00 0e e1 b8 b0 5b 02 00 39 e8 00 00 00 43 |$......[..9....C|
00000160: e9 00 00 00 e1 24 01 00 0e 06 2f c8 03 00 5c 16 |.....$..../...\.|
00000170: 0b 21 75 07 08 1c 78 34 0c 1c 74 07 08 1c 78 34 |.!u...x4..t...x4|
00000180: 0c 1c 74 07 08 1c 78 34 0c 1c 74 07 08 1c 78 34 |..t...x4..t...x4|
00000190: 0c 1c 74 07 08 1c 78 34 0c 1d 7f 0d 75 07 09 1c |..t...x4....u...|
000001a0: 77 34 0c 1c 74 07 09 1c 77 34 0c 1c 74 07 0a 1c |w4..t...w4..t...|
000001b0: 76 34 0c 1d 7f 0d 75 07 08 1c 78 34 0c 1c 74 07 |v4....u...x4..t.|
000001c0: 08 1c 78 34 0c 1c 74 07 08 1c 78 00             |..x4..t...x.|
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