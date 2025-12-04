# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/string-methods.ts
**生成时间**: 2025-12-04T06:33:09.216Z

## 大小对比

- TypeScript编译器: 320 字节
- WASM编译器: 307 字节
- 差异: 13 字节 (4.23%)

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
    "remaining": 205
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

共发现 157 个字节差异:

- 偏移量 0x82: TS=0x01 vs WASM=0x00
- 偏移量 0x87: TS=0x78 vs WASM=0x70
- 偏移量 0x88: TS=0x01 vs WASM=0x00
- 偏移量 0x8b: TS=0x01 vs WASM=0x00
- 偏移量 0x8c: TS=0x00 vs WASM=0x01
- 偏移量 0x8d: TS=0x20 vs WASM=0x08
- 偏移量 0x8e: TS=0xca vs WASM=0xec
- 偏移量 0x8f: TS=0x03 vs WASM=0x02
- 偏移量 0x90: TS=0x00 vs WASM=0x29
- 偏移量 0x91: TS=0x01 vs WASM=0x04
- 偏移量 0x92: TS=0x08 vs WASM=0xe6
- 偏移量 0x93: TS=0xec vs WASM=0x00
- 偏移量 0x94: TS=0x02 vs WASM=0x00
- 偏移量 0x95: TS=0x29 vs WASM=0x00
- 偏移量 0x96: TS=0x04 vs WASM=0xe3
- 偏移量 0x97: TS=0xe6 vs WASM=0x39
- 偏移量 0x98: TS=0x00 vs WASM=0xe7
- 偏移量 0x9b: TS=0xe3 vs WASM=0x00
- 偏移量 0x9c: TS=0x39 vs WASM=0x43
- 偏移量 0x9d: TS=0xe7 vs WASM=0xe8
- ... (显示前20个差异，总共157个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 74 72 69 6e 67 2d 6d 65 74 68 6f 64 73 2e 6a 73 |tring-methods.js|
00000030: 06 73 74 72 16 48 65 6c 6c 6f 20 57 6f 72 6c 64 |.str.Hello World|
00000040: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 63 68 61 |.console.log.cha|
00000050: 72 41 74 0e 69 6e 64 65 78 4f 66 02 6f 12 73 75 |rAt.indexOf.o.su|
00000060: 62 73 74 72 69 6e 67 16 74 6f 4c 6f 77 65 72 43 |bstring.toLowerC|
00000070: 61 73 65 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |ase......... ...|
00000080: 01 00 01 00 06 01 00 78 01 ca 03 01 00 20 ca 03 |.......x..... ..|
00000090: 00 01 08 ec 02 29 04 e6 00 00 00 e3 39 e7 00 00 |.....)......9...|
000000a0: 00 43 e8 00 00 00 5a 00 00 43 e9 00 00 00 b7 24 |.C....Z..C.....$|
000000b0: 01 00 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 00 |..$...9....C....|
000000c0: 5a 00 00 43 ea 00 00 00 04 eb 00 00 00 24 01 00 |Z..C.........$..|
000000d0: 24 01 00 0e 39 e7 00 00 00 43 e8 00 00 00 5a 00 |$...9....C....Z.|
000000e0: 00 43 ec 00 00 00 b7 bc 24 02 00 24 01 00 0e 39 |.C......$..$...9|
000000f0: e7 00 00 00 43 e8 00 00 00 5a 00 00 43 ed 00 00 |....C....Z..C...|
00000100: 00 24 00 00 24 01 00 0e 06 2f c8 03 32 00 00 35 |.$..$..../..2..5|
00000110: 00 1b 0e 1b 0a 11 06 20 0e 11 15 17 15 1b 0e 1b |....... ........|
00000120: 0a 11 06 34 10 11 17 17 15 1b 0e 1b 0a 11 06 25 |...4...........%|
00000130: 14 11 1b 17 15 1b 0e 1b 0a 11 06 1b 18 11 1f 00 |................|
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