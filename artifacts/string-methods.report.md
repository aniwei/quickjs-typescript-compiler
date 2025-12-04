# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/string-methods.ts
**生成时间**: 2025-12-02T17:07:51.320Z

## 大小对比

- TypeScript编译器: 307 字节
- WASM编译器: 307 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "charAt",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "indexOf",
      "offset": 71
    },
    {
      "index": 6,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "substring",
      "offset": 79
    },
    {
      "index": 7,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "toLowerCase",
      "offset": 89
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "Hello World",
      "offset": 101
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 113
    }
  ],
  "functionHeader": {
    "offset": 115,
    "tag": "0xd",
    "remaining": 192
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

共发现 74 个字节差异:

- 偏移量 0x34: TS=0x0e vs WASM=0x16
- 偏移量 0x35: TS=0x63 vs WASM=0x48
- 偏移量 0x36: TS=0x6f vs WASM=0x65
- 偏移量 0x37: TS=0x6e vs WASM=0x6c
- 偏移量 0x38: TS=0x73 vs WASM=0x6c
- 偏移量 0x3a: TS=0x6c vs WASM=0x20
- 偏移量 0x3b: TS=0x65 vs WASM=0x57
- 偏移量 0x3c: TS=0x06 vs WASM=0x6f
- 偏移量 0x3d: TS=0x6c vs WASM=0x72
- 偏移量 0x3e: TS=0x6f vs WASM=0x6c
- 偏移量 0x3f: TS=0x67 vs WASM=0x64
- 偏移量 0x40: TS=0x0c vs WASM=0x0e
- 偏移量 0x42: TS=0x68 vs WASM=0x6f
- 偏移量 0x43: TS=0x61 vs WASM=0x6e
- 偏移量 0x44: TS=0x72 vs WASM=0x73
- 偏移量 0x45: TS=0x41 vs WASM=0x6f
- 偏移量 0x46: TS=0x74 vs WASM=0x6c
- 偏移量 0x47: TS=0x0e vs WASM=0x65
- 偏移量 0x48: TS=0x69 vs WASM=0x06
- 偏移量 0x49: TS=0x6e vs WASM=0x6c
- ... (显示前20个差异，总共74个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 74 72 69 6e 67 2d 6d 65 74 68 6f 64 73 2e 6a 73 |tring-methods.js|
00000030: 06 73 74 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |.str.console.log|
00000040: 0c 63 68 61 72 41 74 0e 69 6e 64 65 78 4f 66 12 |.charAt.indexOf.|
00000050: 73 75 62 73 74 72 69 6e 67 16 74 6f 4c 6f 77 65 |substring.toLowe|
00000060: 72 43 61 73 65 16 48 65 6c 6c 6f 20 57 6f 72 6c |rCase.Hello Worl|
00000070: 64 02 6f 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |d.o......... ...|
00000080: 01 00 00 00 06 01 00 70 00 ca 03 00 01 08 ec 02 |.......p........|
00000090: 29 04 ec 00 00 00 e3 39 e6 00 00 00 43 e7 00 00 |)......9....C...|
000000a0: 00 df 43 e8 00 00 00 b7 24 01 00 24 01 00 0e 39 |..C.....$..$...9|
000000b0: e6 00 00 00 43 e7 00 00 00 df 43 e9 00 00 00 04 |....C.....C.....|
000000c0: ed 00 00 00 24 01 00 24 01 00 0e 39 e6 00 00 00 |....$..$...9....|
000000d0: 43 e7 00 00 00 df 43 ea 00 00 00 b7 bc 24 02 00 |C.....C......$..|
000000e0: 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 00 df 43 |$...9....C.....C|
000000f0: eb 00 00 00 24 00 00 24 01 00 0e 06 2f c8 03 32 |....$..$..../..2|
00000100: 00 00 35 00 1b 0e 1b 0a 07 06 20 0e 11 15 17 15 |..5....... .....|
00000110: 1b 0e 1b 0a 07 06 34 10 11 17 17 15 1b 0e 1b 0a |......4.........|
00000120: 07 06 25 14 11 1b 17 15 1b 0e 1b 0a 07 06 1b 18 |..%.............|
00000130: 11 1f 00                                        |...|
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