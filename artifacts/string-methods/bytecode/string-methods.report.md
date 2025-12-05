# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/string-methods.ts
**生成时间**: 2025-12-05T12:54:24.322Z

## 大小对比

- TypeScript编译器: 347 字节
- WASM编译器: 307 字节
- 差异: 40 字节 (13.03%)

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
      "rawLength": 226,
      "actualLength": 113,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/string-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 117
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 121
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 133
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 141
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "charAt",
      "offset": 145
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 152
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 160
    },
    {
      "index": 8,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "substring",
      "offset": 162
    },
    {
      "index": 9,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toLowerCase",
      "offset": 172
    }
  ],
  "functionHeader": {
    "offset": 184,
    "tag": "0xd",
    "remaining": 163
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/string-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 64
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "charAt",
      "offset": 76
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 83
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 91
    },
    {
      "index": 8,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "substring",
      "offset": 93
    },
    {
      "index": 9,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toLowerCase",
      "offset": 103
    }
  ],
  "functionHeader": {
    "offset": 115,
    "tag": "0xd",
    "remaining": 192
  }
}
```

## 字节级差异

共发现 315 个字节差异:

- 偏移量 0x2: TS=0xe2 vs WASM=0x5a
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
- ... (显示前20个差异，总共315个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a e2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 73 74 72 69 6e 67 2d 6d 65 74 68 6f |res/string-metho|
00000070: 64 73 2e 6a 73 06 73 74 72 16 48 65 6c 6c 6f 20 |ds.js.str.Hello |
00000080: 57 6f 72 6c 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |World.console.lo|
00000090: 67 0c 63 68 61 72 41 74 0e 69 6e 64 65 78 4f 66 |g.charAt.indexOf|
000000a0: 02 6f 12 73 75 62 73 74 72 69 6e 67 16 74 6f 4c |.o.substring.toL|
000000b0: 6f 77 65 72 43 61 73 65 0d c8 03 00 00 00 00 00 |owerCase........|
000000c0: 0c 20 06 01 a4 01 00 01 00 03 01 00 73 01 ca 03 |. ..........s...|
000000d0: 00 00 00 ca 03 00 01 08 6c 6b 00 00 00 04 e6 00 |........lk......|
000000e0: 00 00 e3 39 e7 00 00 00 43 e8 00 00 00 df 43 e9 |...9....C.....C.|
000000f0: 00 00 00 b7 24 01 00 24 01 00 0e 39 e7 00 00 00 |....$..$...9....|
00000100: 43 e8 00 00 00 df 43 ea 00 00 00 04 eb 00 00 00 |C.....C.........|
00000110: 24 01 00 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 |$..$...9....C...|
00000120: 00 df 43 ec 00 00 00 b7 bc 24 02 00 24 01 00 0e |..C......$..$...|
00000130: 39 e7 00 00 00 43 e8 00 00 00 df 43 ed 00 00 00 |9....C.....C....|
00000140: 24 00 00 24 01 00 0e 29 06 2f c8 03 01 0c 00 16 |$..$...)./......|
00000150: 01 00 18 01 00 1c 01 00 19 01 00                |...........|
```

### WASM
```
00000000: 05 0a 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 74 72 69 6e 67 2d 6d 65 74 68 6f 64 73 2e 6a 73 |tring-methods.js|
00000030: 06 73 74 72 16 48 65 6c 6c 6f 20 57 6f 72 6c 64 |.str.Hello World|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 63 68 61 |.console.log.cha|
00000050: 72 41 74 0e 69 6e 64 65 78 4f 66 02 6f 12 73 75 |rAt.indexOf.o.su|
00000060: 62 73 74 72 69 6e 67 16 74 6f 4c 6f 77 65 72 43 |bstring.toLowerC|
00000070: 61 73 65 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |ase......... ...|
00000080: 01 00 00 00 06 01 00 70 00 ca 03 00 01 08 ec 02 |.......p........|
00000090: 29 04 e6 00 00 00 e3 39 e7 00 00 00 43 e8 00 00 |)......9....C...|
000000a0: 00 df 43 e9 00 00 00 b7 24 01 00 24 01 00 0e 39 |..C.....$..$...9|
000000b0: e7 00 00 00 43 e8 00 00 00 df 43 ea 00 00 00 04 |....C.....C.....|
000000c0: eb 00 00 00 24 01 00 24 01 00 0e 39 e7 00 00 00 |....$..$...9....|
000000d0: 43 e8 00 00 00 df 43 ec 00 00 00 b7 bc 24 02 00 |C.....C......$..|
000000e0: 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 00 df 43 |$...9....C.....C|
000000f0: ed 00 00 00 24 00 00 24 01 00 0e 06 2f c8 03 32 |....$..$..../..2|
00000100: 00 00 35 00 1b 0e 1b 0a 07 06 20 0e 11 15 17 15 |..5....... .....|
00000110: 1b 0e 1b 0a 07 06 34 10 11 17 17 15 1b 0e 1b 0a |......4.........|
00000120: 07 06 25 14 11 1b 17 15 1b 0e 1b 0a 07 06 1b 18 |..%.............|
00000130: 11 1f 00                                        |...|
```