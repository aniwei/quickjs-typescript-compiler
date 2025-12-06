# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-expression.ts
**生成时间**: 2025-12-06T02:09:56.378Z

## 大小对比

- TypeScript编译器: 184 字节
- WASM编译器: 191 字节
- 差异: -7 字节 (-3.66%)

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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fe_add",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 108
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
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "fe_add",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 76,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 54 个字节差异:

- 偏移量 0x5d: TS=0x03 vs WASM=0x05
- 偏移量 0x88: TS=0x00 vs WASM=0x0c
- 偏移量 0x89: TS=0x08 vs WASM=0x00
- 偏移量 0x8a: TS=0x16 vs WASM=0x00
- 偏移量 0x8b: TS=0x0d vs WASM=0x41
- 偏移量 0x8c: TS=0x2d vs WASM=0x00
- 偏移量 0x8d: TS=0x73 vs WASM=0x1b
- 偏移量 0x8e: TS=0x34 vs WASM=0x0e
- 偏移量 0x8f: TS=0x0c vs WASM=0x1b
- 偏移量 0x90: TS=0x07 vs WASM=0x0a
- 偏移量 0x91: TS=0x07 vs WASM=0x11
- 偏移量 0x92: TS=0x00 vs WASM=0x0c
- 偏移量 0x93: TS=0x0c vs WASM=0x07
- 偏移量 0x94: TS=0x42 vs WASM=0x0d
- 偏移量 0x95: TS=0x06 vs WASM=0x00
- 偏移量 0x96: TS=0x00 vs WASM=0x0c
- 偏移量 0x97: TS=0x00 vs WASM=0x43
- 偏移量 0x98: TS=0x02 vs WASM=0x06
- 偏移量 0x99: TS=0x00 vs WASM=0x01
- 偏移量 0x9a: TS=0x02 vs WASM=0x00
- ... (显示前20个差异，总共54个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 2e 6a 73 0c 66 65 5f 61 64 64 0e 63 6f 6e |on.js.fe_add.con|
00000040: 73 6f 6c 65 06 6c 6f 67 02 61 02 62 0d c8 03 00 |sole.log.a.b....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 01 |..... ..........|
00000060: 20 00 ca 03 00 01 08 ec 02 29 c2 00 4f e5 00 00 | ........)..O...|
00000070: 00 e3 39 e6 00 00 00 43 e7 00 00 00 df b8 b9 f2 |..9....C........|
00000080: 24 01 00 0e 06 2f c8 03 00 08 16 0d 2d 73 34 0c |$..../......-s4.|
00000090: 07 07 00 0c 42 06 00 00 02 00 02 03 00 00 05 02 |....B...........|
000000a0: d0 03 00 00 00 d2 03 00 00 00 d3 d4 9f 28 29 c8 |.............().|
000000b0: 03 00 04 03 7d 07 04 00                         |....}...|
```

### WASM
```
00000000: 05 06 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 65 78 70 72 65 73 73 69 |unction-expressi|
00000030: 6f 6e 2e 6a 73 0c 66 65 5f 61 64 64 0e 63 6f 6e |on.js.fe_add.con|
00000040: 73 6f 6c 65 06 6c 6f 67 02 61 02 62 0d c8 03 00 |sole.log.a.b....|
00000050: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 05 01 01 |..... ..........|
00000060: 20 00 ca 03 00 01 08 ec 02 29 c2 00 4f e5 00 00 | ........)..O...|
00000070: 00 e3 39 e6 00 00 00 43 e7 00 00 00 df b8 b9 f2 |..9....C........|
00000080: 24 01 00 0e 06 2f c8 03 0c 00 00 41 00 1b 0e 1b |$..../.....A....|
00000090: 0a 11 0c 07 0d 00 0c 43 06 01 00 02 00 02 02 00 |.......C........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 0d 03 07 07 08 07 03 07 11 00    |(..............|
```