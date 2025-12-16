# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-spread.ts
**生成时间**: 2025-12-16T14:11:02.369Z

## 大小对比

- TypeScript编译器: 179 字节
- WASM编译器: 165 字节
- 差异: 14 字节 (8.48%)

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
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-spread.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 126
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
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-spread.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 112
  }
}
```

## 字节级差异

共发现 32 个字节差异:

- 偏移量 0x4d: TS=0x01 vs WASM=0x80
- 偏移量 0x53: TS=0x01 vs WASM=0x80
- 偏移量 0x59: TS=0x10 vs WASM=0x80
- 偏移量 0x5f: TS=0x10 vs WASM=0x80
- 偏移量 0x95: TS=0x1c vs WASM=0x0e
- 偏移量 0x98: TS=0x7a vs WASM=0xc1
- 偏移量 0x99: TS=0x16 vs WASM=0x1c
- 偏移量 0x9a: TS=0x07 vs WASM=0x4e
- 偏移量 0x9b: TS=0x06 vs WASM=0x1b
- 偏移量 0x9c: TS=0x07 vs WASM=0x1b
- 偏移量 0x9d: TS=0x07 vs WASM=0x0e
- 偏移量 0x9e: TS=0x11 vs WASM=0x1b
- 偏移量 0x9f: TS=0x07 vs WASM=0x0a
- 偏移量 0xa0: TS=0x1c vs WASM=0x20
- 偏移量 0xa1: TS=0x08 vs WASM=0x02
- 偏移量 0xa2: TS=0x16 vs WASM=0x07
- 偏移量 0xa3: TS=0x08 vs WASM=0x03
- 偏移量 0xa4: TS=0x20 vs WASM=0x00
- 偏移量 0xa5: TS=0x06 vs WASM=EOF
- 偏移量 0xa6: TS=0x16 vs WASM=EOF
- ... (显示前20个差异，总共32个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogD__tests__/fix|
00000020: 74 75 72 65 73 2f 61 72 72 61 79 2d 73 70 72 65 |tures/array-spre|
00000030: 61 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 |ad.js...........|
00000040: 00 4b 01 a6 01 00 00 00 40 e4 00 00 00 01 40 e5 |.K......@.....@.|
00000050: 00 00 00 01 3f e4 00 00 00 10 3f e5 00 00 00 10 |....?.....?.....|
00000060: b8 b9 26 02 00 3b e4 00 00 00 26 00 00 b7 39 e4 |..&..;....&...9.|
00000070: 00 00 00 54 ba 53 91 0e 3b e5 00 00 00 39 e6 00 |...T.S..;....9..|
00000080: 00 00 43 e7 00 00 00 39 e5 00 00 00 b9 48 24 01 |..C....9.....H$.|
00000090: 00 cf 28 d0 03 1c 00 00 7a 16 07 06 07 07 11 07 |..(.....z.......|
000000a0: 1c 08 16 08 20 06 16 15 1c 0b 34 18 1b 04 07 03 |.... .....4.....|
000000b0: 07 17 00                                        |...|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogD__tests__/fix|
00000020: 74 75 72 65 73 2f 61 72 72 61 79 2d 73 70 72 65 |tures/array-spre|
00000030: 61 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 |ad.js...........|
00000040: 00 4b 01 a6 01 00 00 00 40 e4 00 00 00 80 40 e5 |.K......@.....@.|
00000050: 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 80 |....?.....?.....|
00000060: b8 b9 26 02 00 3b e4 00 00 00 26 00 00 b7 39 e4 |..&..;....&...9.|
00000070: 00 00 00 54 ba 53 91 0e 3b e5 00 00 00 39 e6 00 |...T.S..;....9..|
00000080: 00 00 43 e7 00 00 00 39 e5 00 00 00 b9 48 24 01 |..C....9.....H$.|
00000090: 00 cf 28 d0 03 0e 00 00 c1 1c 4e 1b 1b 0e 1b 0a |..(.......N.....|
000000a0: 20 02 07 03 00                                  | ....|
```