# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/element-access.ts
**生成时间**: 2025-11-22T14:52:37.830Z

## 大小对比

- TypeScript编译器: 322 字节
- WASM编译器: 322 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/element-access.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "obj2",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 251
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/element-access.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "obj2",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 251
  }
}
```

## 字节级差异

共发现 154 个字节差异:

- 偏移量 0x58: TS=0x07 vs WASM=0x04
- 偏移量 0x5b: TS=0xa0 vs WASM=0x96
- 偏移量 0x89: TS=0x11 vs WASM=0x4b
- 偏移量 0x8a: TS=0x17 vs WASM=0x39
- 偏移量 0x8b: TS=0x4b vs WASM=0xe7
- 偏移量 0x8c: TS=0x0e vs WASM=0x00
- 偏移量 0x8d: TS=0x39 vs WASM=0x00
- 偏移量 0x8e: TS=0xe7 vs WASM=0x00
- 偏移量 0x8f: TS=0x00 vs WASM=0x43
- 偏移量 0x90: TS=0x00 vs WASM=0xe8
- 偏移量 0x92: TS=0x43 vs WASM=0x00
- 偏移量 0x93: TS=0xe8 vs WASM=0x00
- 偏移量 0x94: TS=0x00 vs WASM=0x68
- 偏移量 0x97: TS=0x68 vs WASM=0xb8
- 偏移量 0x98: TS=0x00 vs WASM=0x48
- 偏移量 0x99: TS=0x00 vs WASM=0x24
- 偏移量 0x9a: TS=0xb8 vs WASM=0x01
- 偏移量 0x9b: TS=0x48 vs WASM=0x00
- 偏移量 0x9c: TS=0x24 vs WASM=0x0e
- 偏移量 0x9d: TS=0x01 vs WASM=0x68
- ... (显示前20个差异，总共154个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6c 65 6d 65 6e 74 2d 61 63 63 65 73 73 2e 6a 73 |lement-access.js|
00000030: 06 61 72 72 08 6f 62 6a 32 0e 63 6f 6e 73 6f 6c |.arr.obj2.consol|
00000040: 65 06 6c 6f 67 02 61 0d c8 03 00 00 00 00 00 0c |e.log.a.........|
00000050: 20 06 01 a4 01 00 00 00 07 02 00 a0 01 00 ca 03 | ...............|
00000060: 00 0d cc 03 01 0d 08 ec 02 29 b8 b9 ba 26 03 00 |.........)...&..|
00000070: e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 b7 48 |.9....C....h...H|
00000080: 24 01 00 0e 68 00 00 b8 bb 11 17 4b 0e 39 e7 00 |$...h......K.9..|
00000090: 00 00 43 e8 00 00 00 68 00 00 b8 48 24 01 00 0e |..C....h...H$...|
000000a0: 68 00 00 b9 13 48 bc 9f 11 17 4b 0e 39 e7 00 00 |h....H....K.9...|
000000b0: 00 43 e8 00 00 00 68 00 00 b9 48 24 01 00 0e 0b |.C....h...H$....|
000000c0: bf 0a 4e e9 00 00 00 e4 39 e7 00 00 00 43 e8 00 |..N.....9....C..|
000000d0: 00 00 68 01 00 04 e9 00 00 00 48 24 01 00 0e 68 |..h.......H$...h|
000000e0: 01 00 04 e9 00 00 00 bf 14 11 17 4b 0e 39 e7 00 |...........K.9..|
000000f0: 00 00 43 e8 00 00 00 68 01 00 04 e9 00 00 00 48 |..C....h.......H|
00000100: 24 01 00 0e 06 2f c8 03 38 00 00 3a 00 1b 0e 1b |$..../..8..:....|
00000110: 0a 1b 01 17 15 30 00 1b 0e 1b 0a 1b 01 17 15 25 |.....0.........%|
00000120: 0e 1c 0d 1b 0e 1b 0a 1b 01 45 15 1b 0e 1b 0a 11 |.........E......|
00000130: 0a 20 0b 17 15 11 0a 3a 09 1b 0e 1b 0a 11 0a 20 |. .....:....... |
00000140: 0b 00                                           |..|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 6c 65 6d 65 6e 74 2d 61 63 63 65 73 73 2e 6a 73 |lement-access.js|
00000030: 06 61 72 72 08 6f 62 6a 32 0e 63 6f 6e 73 6f 6c |.arr.obj2.consol|
00000040: 65 06 6c 6f 67 02 61 0d c8 03 00 00 00 00 00 0c |e.log.a.........|
00000050: 20 06 01 a4 01 00 00 00 04 02 00 96 01 00 ca 03 | ...............|
00000060: 00 0d cc 03 01 0d 08 ec 02 29 b8 b9 ba 26 03 00 |.........)...&..|
00000070: e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 b7 48 |.9....C....h...H|
00000080: 24 01 00 0e 68 00 00 b8 bb 4b 39 e7 00 00 00 43 |$...h....K9....C|
00000090: e8 00 00 00 68 00 00 b8 48 24 01 00 0e 68 00 00 |....h...H$...h..|
000000a0: b9 4a bc 9f 4b 39 e7 00 00 00 43 e8 00 00 00 68 |.J..K9....C....h|
000000b0: 00 00 b9 48 24 01 00 0e 0b bf 0a 4e e9 00 00 00 |...H$......N....|
000000c0: e4 39 e7 00 00 00 43 e8 00 00 00 68 01 00 04 e9 |.9....C....h....|
000000d0: 00 00 00 48 24 01 00 0e 68 01 00 04 e9 00 00 00 |...H$...h.......|
000000e0: bf 14 4b 39 e7 00 00 00 43 e8 00 00 00 68 01 00 |..K9....C....h..|
000000f0: 04 e9 00 00 00 48 24 01 00 0e 06 2f c8 03 42 00 |.....H$..../..B.|
00000100: 00 3a 00 1b 0e 1b 0a 16 06 07 07 17 15 16 06 0d |.:..............|
00000110: 05 1b 0e 1b 0a 16 06 07 07 17 15 16 06 0c 08 0d |................|
00000120: 0d 1b 0e 1b 0a 16 06 07 07 45 15 1b 0e 1b 0a 2a |.........E.....*|
00000130: 08 07 09 17 15 2a 08 12 07 1b 0e 1b 0a 2a 08 07 |.....*.......*..|
00000140: 09 00                                           |..|
```