# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/numeric-separators.ts
**生成时间**: 2025-12-12T09:59:18.542Z

## 大小对比

- TypeScript编译器: 297 字节
- WASM编译器: 257 字节
- 差异: 40 字节 (15.56%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/numeric-separators.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xc",
    "remaining": 241
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/numeric-separators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "decimal",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "binary",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "hex",
      "offset": 58
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "octal",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "big",
      "offset": 68
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "bigHex",
      "offset": 72
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 79
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 87
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xd",
    "remaining": 166
  }
}
```

## 字节级差异

共发现 266 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x09
- 偏移量 0x2: TS=0x0c vs WASM=0x50
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x50 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x6e
- 偏移量 0x17: TS=0x5f vs WASM=0x75
- ... (显示前20个差异，总共266个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 50 |...<eval>._ret_P|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 6e 75 6d 65 72 69 63 2d 73 65 70 61 72 |es/numeric-separ|
00000030: 61 74 6f 72 73 2e 6a 73 0c 02 06 00 00 00 00 00 |ators.js........|
00000040: 00 01 00 06 00 00 9b 01 01 01 00 00 00 00 00 00 |................|
00000050: 40 e6 00 00 00 01 40 e7 00 00 00 01 40 e8 00 00 |@.....@.....@...|
00000060: 00 01 40 e9 00 00 00 01 40 ea 00 00 00 01 40 eb |..@.....@.....@.|
00000070: 00 00 00 01 b6 01 00 01 40 42 0f 00 3b e6 00 00 |........@B..;...|
00000080: 00 d3 aa 00 3b e7 00 00 00 01 ff ff 00 00 3b e8 |....;.........;.|
00000090: 00 00 00 d3 ff 01 3b e9 00 00 00 b4 15 cd 5b 07 |......;.......[.|
000000a0: 3b ea 00 00 00 b4 ff 01 00 00 3b eb 00 00 00 39 |;.........;....9|
000000b0: ec 00 00 00 43 ed 00 00 00 39 e6 00 00 00 39 e7 |....C....9....9.|
000000c0: 00 00 00 39 e8 00 00 00 39 e9 00 00 00 24 04 00 |...9....9....$..|
000000d0: de 39 ec 00 00 00 43 ed 00 00 00 39 ea 00 00 00 |.9....C....9....|
000000e0: 39 eb 00 00 00 24 02 00 de da 28 02 00 00 00 38 |9....$....(....8|
000000f0: 00 00 11 20 1b 13 26 0b 02 1e 11 11 26 0b 02 18 |... ..&.....&...|
00000100: 1b 0b 26 0b 02 1c 11 0f 26 0b 02 18 1b 0b 26 0b |..&.....&.....&.|
00000110: 02 1e 1b 11 26 0b 3e 18 25 12 25 10 25 0a 25 43 |....&.>.%.%.%.%C|
00000120: 3a 00 3e 18 25 0a 25 21 00                      |:.>.%.%!.|
```

### WASM
```
00000000: 05 09 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..P__tests__/fix|
00000010: 74 75 72 65 73 2f 6e 75 6d 65 72 69 63 2d 73 65 |tures/numeric-se|
00000020: 70 61 72 61 74 6f 72 73 2e 6a 73 0e 64 65 63 69 |parators.js.deci|
00000030: 6d 61 6c 0c 62 69 6e 61 72 79 06 68 65 78 0a 6f |mal.binary.hex.o|
00000040: 63 74 61 6c 06 62 69 67 0c 62 69 67 48 65 78 0e |ctal.big.bigHex.|
00000050: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 |console.log.....|
00000060: 00 00 00 0c 20 06 01 a4 01 00 00 00 06 06 00 58 |.... ..........X|
00000070: 00 ca 03 00 0d cc 03 01 0d ce 03 02 0d d0 03 03 |................|
00000080: 0d d2 03 04 0d d4 03 05 0d 08 ec 02 29 01 40 42 |............).@B|
00000090: 0f 00 e3 c0 aa 00 e4 01 ff ff 00 00 e5 c0 ff 01 |................|
000000a0: e6 b4 15 cd 5b 07 61 04 00 b4 ff 01 00 00 61 05 |....[.a.......a.|
000000b0: 00 39 eb 00 00 00 43 ec 00 00 00 68 00 00 68 01 |.9....C....h..h.|
000000c0: 00 68 02 00 68 03 00 24 04 00 0e 39 eb 00 00 00 |.h..h..$...9....|
000000d0: 43 ec 00 00 00 68 04 00 68 05 00 24 02 00 0e 06 |C....h..h..$....|
000000e0: 2f c8 03 1c 00 00 00 28 0c 00 1b 0e 1b 0a 11 12 |/......(........|
000000f0: 11 10 11 0a 11 2d 17 15 1b 0e 1b 0a 11 0a 11 0b |.....-..........|
00000100: 00                                              |.|
```