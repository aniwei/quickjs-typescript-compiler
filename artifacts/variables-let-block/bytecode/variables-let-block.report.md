# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/variables-let-block.ts
**生成时间**: 2025-12-20T21:36:57.210Z

## 大小对比

- TypeScript编译器: 168 字节
- WASM编译器: 166 字节
- 差异: 2 字节 (1.20%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-let-block.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 108
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-let-block.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 106
  }
}
```

## 字节级差异

共发现 17 个字节差异:

- 偏移量 0x92: TS=0x14 vs WASM=0x12
- 偏移量 0x95: TS=0x5d vs WASM=0x78
- 偏移量 0x96: TS=0x00 vs WASM=0x08
- 偏移量 0x97: TS=0x1d vs WASM=0x1b
- 偏移量 0x98: TS=0x08 vs WASM=0x0e
- 偏移量 0x9a: TS=0x0e vs WASM=0x0a
- 偏移量 0x9b: TS=0x1b vs WASM=0x11
- 偏移量 0x9c: TS=0x0a vs WASM=0x01
- 偏移量 0x9d: TS=0x11 vs WASM=0x18
- 偏移量 0x9e: TS=0x01 vs WASM=0x1d
- 偏移量 0x9f: TS=0x18 vs WASM=0x1b
- 偏移量 0xa0: TS=0x1d vs WASM=0x0e
- 偏移量 0xa2: TS=0x0e vs WASM=0x0a
- 偏移量 0xa4: TS=0x0a vs WASM=0x01
- 偏移量 0xa5: TS=0x1b vs WASM=0x00
- 偏移量 0xa6: TS=0x01 vs WASM=EOF
- 偏移量 0xa7: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 62 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |...b.a.console.l|
00000010: 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogR__tests__/fix|
00000020: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000030: 6c 65 74 2d 62 6c 6f 63 6b 2e 6a 73 0c 00 06 00 |let-block.js....|
00000040: a4 01 00 02 00 03 00 00 3c 02 a6 01 00 00 00 c8 |........<.......|
00000050: 03 02 00 20 40 e5 00 00 00 80 3f e5 00 00 00 82 |... @.....?.....|
00000060: b8 3b e5 00 00 00 63 01 00 b9 cc 39 e6 00 00 00 |.;....c....9....|
00000070: 43 e7 00 00 00 64 01 00 24 01 00 cb 39 e6 00 00 |C....d..$...9...|
00000080: 00 43 e7 00 00 00 39 e5 00 00 00 24 01 00 cf 28 |.C....9....$...(|
00000090: d0 03 14 00 00 5d 00 1d 08 1b 0e 1b 0a 11 01 18 |.....]..........|
000000a0: 1d 1b 0e 1b 0a 1b 01 00                         |........|
```

### WASM
```
00000000: 05 05 02 62 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |...b.a.console.l|
00000010: 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogR__tests__/fix|
00000020: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000030: 6c 65 74 2d 62 6c 6f 63 6b 2e 6a 73 0c 00 06 00 |let-block.js....|
00000040: a4 01 00 02 00 03 00 00 3c 02 a6 01 00 00 00 c8 |........<.......|
00000050: 03 02 00 20 40 e5 00 00 00 80 3f e5 00 00 00 82 |... @.....?.....|
00000060: b8 3b e5 00 00 00 63 01 00 b9 cc 39 e6 00 00 00 |.;....c....9....|
00000070: 43 e7 00 00 00 64 01 00 24 01 00 cb 39 e6 00 00 |C....d..$...9...|
00000080: 00 43 e7 00 00 00 39 e5 00 00 00 24 01 00 cf 28 |.C....9....$...(|
00000090: d0 03 12 00 00 78 08 1b 0e 1b 0a 11 01 18 1d 1b |.....x..........|
000000a0: 0e 1b 0a 1b 01 00                               |......|
```