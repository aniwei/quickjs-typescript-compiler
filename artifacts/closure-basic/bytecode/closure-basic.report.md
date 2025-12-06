# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-basic.ts
**生成时间**: 2025-12-06T02:09:56.303Z

## 大小对比

- TypeScript编译器: 219 字节
- WASM编译器: 230 字节
- 差异: -11 字节 (-4.78%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "add5",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 74
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 76
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xd",
    "remaining": 141
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "add5",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 74
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 76
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xd",
    "remaining": 152
  }
}
```

## 字节级差异

共发现 81 个字节差异:

- 偏移量 0x5f: TS=0x03 vs WASM=0x04
- 偏移量 0x8c: TS=0x00 vs WASM=0x12
- 偏移量 0x8d: TS=0x0a vs WASM=0x00
- 偏移量 0x8f: TS=0x07 vs WASM=0x00
- 偏移量 0x90: TS=0x05 vs WASM=0x07
- 偏移量 0x91: TS=0x0b vs WASM=0x0a
- 偏移量 0x92: TS=0x07 vs WASM=0x16
- 偏移量 0x93: TS=0x0a vs WASM=0x0c
- 偏移量 0x95: TS=0x6b vs WASM=0x0d
- 偏移量 0x96: TS=0x34 vs WASM=0x27
- 偏移量 0x97: TS=0x0c vs WASM=0x1b
- 偏移量 0x98: TS=0x00 vs WASM=0x0e
- 偏移量 0x99: TS=0x0c vs WASM=0x1b
- 偏移量 0x9a: TS=0x42 vs WASM=0x0a
- 偏移量 0x9b: TS=0x06 vs WASM=0x0c
- 偏移量 0x9c: TS=0x00 vs WASM=0x08
- 偏移量 0x9d: TS=0xca vs WASM=0x07
- 偏移量 0x9e: TS=0x03 vs WASM=0x09
- 偏移量 0x9f: TS=0x01 vs WASM=0x00
- 偏移量 0xa0: TS=0x00 vs WASM=0x0c
- ... (显示前20个差异，总共81个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 12 |losure-basic.js.|
00000030: 6d 61 6b 65 41 64 64 65 72 08 61 64 64 35 0e 63 |makeAdder.add5.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 02 79 0d c8 |onsole.log.x.y..|
00000050: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000060: 02 01 1e 00 ca 03 00 01 cc 03 01 01 08 ec 05 c2 |................|
00000070: 00 e3 29 df bc f1 e4 39 e7 00 00 00 43 e8 00 00 |..)....9....C...|
00000080: 00 e0 b9 f1 24 01 00 0e 06 2f c8 03 00 0a 00 07 |....$..../......|
00000090: 05 0b 07 0a 12 6b 34 0c 00 0c 42 06 00 ca 03 01 |.....k4...B.....|
000000a0: 00 01 03 00 01 04 01 d2 03 00 00 00 c2 00 28 29 |..............()|
000000b0: c8 03 00 02 03 09 00 0c 42 06 00 00 01 00 01 03 |........B.......|
000000c0: 01 00 05 01 d4 03 00 00 00 d2 03 00 03 df d3 9f |................|
000000d0: 28 29 c8 03 01 04 03 03 07 04 00                |().........|
```

### WASM
```
00000000: 05 07 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 12 |losure-basic.js.|
00000030: 6d 61 6b 65 41 64 64 65 72 08 61 64 64 35 0e 63 |makeAdder.add5.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 02 79 0d c8 |onsole.log.x.y..|
00000050: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 |....... ........|
00000060: 02 01 1e 00 ca 03 00 01 cc 03 01 01 08 ec 05 c2 |................|
00000070: 00 e3 29 df bc f1 e4 39 e7 00 00 00 43 e8 00 00 |..)....9....C...|
00000080: 00 e0 b9 f1 24 01 00 0e 06 2f c8 03 12 00 00 00 |....$..../......|
00000090: 07 0a 16 0c 12 0d 27 1b 0e 1b 0a 0c 08 07 09 00 |......'.........|
000000a0: 0c 43 06 01 ca 03 01 00 01 01 00 01 03 01 d2 03 |.C..............|
000000b0: 00 01 40 c2 00 28 c8 03 04 00 00 0d 04 00 0c 43 |..@..(.........C|
000000c0: 06 01 00 01 00 01 02 01 00 04 01 d4 03 00 01 00 |................|
000000d0: d2 03 00 03 df d3 9f 28 c8 03 0a 01 09 03 04 07 |.......(........|
000000e0: 08 07 03 07 11 00                               |......|
```