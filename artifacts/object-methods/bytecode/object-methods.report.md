# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-methods.ts
**生成时间**: 2025-12-07T03:50:04.880Z

## 大小对比

- TypeScript编译器: 199 字节
- WASM编译器: 209 字节
- 差异: -10 字节 (-4.78%)

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
      "string": "__tests__/compiler/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 131
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
      "string": "__tests__/compiler/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 141
  }
}
```

## 字节级差异

共发现 61 个字节差异:

- 偏移量 0x36: TS=0x02 vs WASM=0x0e
- 偏移量 0x37: TS=0x79 vs WASM=0x63
- 偏移量 0x38: TS=0x0e vs WASM=0x6f
- 偏移量 0x39: TS=0x63 vs WASM=0x6e
- 偏移量 0x3a: TS=0x6f vs WASM=0x73
- 偏移量 0x3b: TS=0x6e vs WASM=0x6f
- 偏移量 0x3c: TS=0x73 vs WASM=0x6c
- 偏移量 0x3d: TS=0x6f vs WASM=0x65
- 偏移量 0x3e: TS=0x6c vs WASM=0x06
- 偏移量 0x3f: TS=0x65 vs WASM=0x6c
- 偏移量 0x40: TS=0x06 vs WASM=0x6f
- 偏移量 0x41: TS=0x6c vs WASM=0x67
- 偏移量 0x42: TS=0x6f vs WASM=0x02
- 偏移量 0x43: TS=0x67 vs WASM=0x79
- 偏移量 0x6b: TS=0x52 vs WASM=0x56
- 偏移量 0x6c: TS=0x56 vs WASM=0x6a
- 偏移量 0x6d: TS=0x6a vs WASM=0x00
- 偏移量 0x70: TS=0x00 vs WASM=0x04
- 偏移量 0x73: TS=0xe8 vs WASM=0xe7
- 偏移量 0x78: TS=0xe9 vs WASM=0xe8
- ... (显示前20个差异，总共61个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6d 65 74 68 6f 64 73 2e 6a 73 |bject-methods.js|
00000030: 06 6f 62 6a 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 |.obj.x.y.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 05 01 01 30 00 ca 03 00 0d 08 ec |........0.......|
00000060: 02 29 0b b8 4e e6 00 00 00 c2 00 52 56 6a 00 00 |.)..N......RVj..|
00000070: 00 e3 39 e8 00 00 00 43 e9 00 00 00 68 00 00 43 |..9....C....h..C|
00000080: 6a 00 00 00 b9 24 01 00 24 01 00 0e 06 2f c8 03 |j....$..$..../..|
00000090: 10 00 00 00 14 0c 00 1b 0e 1b 0a 11 06 20 08 11 |............. ..|
000000a0: 0f 00 0c 00 04 01 d4 01 01 00 01 01 00 00 08 01 |................|
000000b0: ce 03 00 01 00 42 e6 00 00 00 d3 9f 28 c8 03 06 |.....B......(...|
000000c0: 00 00 05 1e 20 06 00                            |.... ..|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6d 65 74 68 6f 64 73 2e 6a 73 |bject-methods.js|
00000030: 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c |.obj.x.console.l|
00000040: 6f 67 02 79 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.y......... ..|
00000050: a4 01 00 00 00 05 01 01 30 00 ca 03 00 0d 08 ec |........0.......|
00000060: 02 29 0b b8 4e e6 00 00 00 c2 00 56 6a 00 00 00 |.)..N......Vj...|
00000070: 04 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 43 |..9....C....h..C|
00000080: 6a 00 00 00 b9 24 01 00 24 01 00 0e 06 2f c8 03 |j....$..$..../..|
00000090: 10 00 00 00 14 0c 00 1b 0e 1b 0a 11 06 20 08 11 |............. ..|
000000a0: 0f 00 0c 42 07 01 00 01 01 01 02 00 00 0b 02 d2 |...B............|
000000b0: 03 00 01 00 10 00 01 00 08 cb c7 42 e6 00 00 00 |...........B....|
000000c0: d3 9f 28 c8 03 0a 02 04 12 1e 1b 0a 07 03 07 1b |..(.............|
000000d0: 00                                              |.|
```