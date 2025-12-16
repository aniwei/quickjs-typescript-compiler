# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-spread.ts
**生成时间**: 2025-12-16T14:11:02.565Z

## 大小对比

- TypeScript编译器: 192 字节
- WASM编译器: 178 字节
- 差异: 14 字节 (7.87%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-spread.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 134
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-spread.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 120
  }
}
```

## 字节级差异

共发现 35 个字节差异:

- 偏移量 0x52: TS=0x01 vs WASM=0x80
- 偏移量 0x58: TS=0x01 vs WASM=0x80
- 偏移量 0x5e: TS=0x10 vs WASM=0x80
- 偏移量 0x64: TS=0x10 vs WASM=0x80
- 偏移量 0x72: TS=0x07 vs WASM=0x39
- 偏移量 0x73: TS=0x39 vs WASM=0xe4
- 偏移量 0x74: TS=0xe4 vs WASM=0x00
- 偏移量 0x77: TS=0x00 vs WASM=0x07
- 偏移量 0xa2: TS=0x1c vs WASM=0x0e
- 偏移量 0xa5: TS=0x7a vs WASM=0xbc
- 偏移量 0xa6: TS=0x14 vs WASM=0x1e
- 偏移量 0xa7: TS=0x07 vs WASM=0x6c
- 偏移量 0xa8: TS=0x0a vs WASM=0x1d
- 偏移量 0xa9: TS=0x07 vs WASM=0x1b
- 偏移量 0xaa: TS=0x05 vs WASM=0x0e
- 偏移量 0xac: TS=0x0b vs WASM=0x0a
- 偏移量 0xad: TS=0x1c vs WASM=0x1b
- 偏移量 0xae: TS=0x08 vs WASM=0x02
- 偏移量 0xaf: TS=0x0c vs WASM=0x1b
- 偏移量 0xb0: TS=0x0a vs WASM=0x03
- ... (显示前20个差异，总共35个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 02 61 02 62 02 78 02 79 0e 63 6f 6e 73 6f |...a.b.x.y.conso|
00000010: 6c 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 5f 5f |le.logF__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 |/fixtures/object|
00000030: 2d 73 70 72 65 61 64 2e 6a 73 0c 00 06 00 a4 01 |-spread.js......|
00000040: 00 01 00 03 00 00 53 01 a6 01 00 00 00 40 e4 00 |......S......@..|
00000050: 00 00 01 40 e5 00 00 00 01 3f e4 00 00 00 10 3f |...@.....?.....?|
00000060: e5 00 00 00 10 0b b8 4e e6 00 00 00 3b e4 00 00 |.......N....;...|
00000070: 00 0b 07 39 e4 00 00 00 55 06 0e 0e b9 4e e7 00 |...9....U....N..|
00000080: 00 00 3b e5 00 00 00 39 e8 00 00 00 43 e9 00 00 |..;....9....C...|
00000090: 00 39 e5 00 00 00 42 e6 00 00 00 24 01 00 cf 28 |.9....B....$...(|
000000a0: d4 03 1c 00 00 7a 14 07 0a 07 05 1b 0b 1c 08 0c |.....z..........|
000000b0: 0a 1b 05 16 12 07 05 1b 17 1c 0b 34 18 34 17 00 |...........4.4..|
```

### WASM
```
00000000: 05 07 02 61 02 62 02 78 02 79 0e 63 6f 6e 73 6f |...a.b.x.y.conso|
00000010: 6c 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 5f 5f |le.logF__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 |/fixtures/object|
00000030: 2d 73 70 72 65 61 64 2e 6a 73 0c 00 06 00 a4 01 |-spread.js......|
00000040: 00 01 00 03 00 00 53 01 a6 01 00 00 00 40 e4 00 |......S......@..|
00000050: 00 00 80 40 e5 00 00 00 80 3f e4 00 00 00 80 3f |...@.....?.....?|
00000060: e5 00 00 00 80 0b b8 4e e6 00 00 00 3b e4 00 00 |.......N....;...|
00000070: 00 0b 39 e4 00 00 00 07 55 06 0e 0e b9 4e e7 00 |..9.....U....N..|
00000080: 00 00 3b e5 00 00 00 39 e8 00 00 00 43 e9 00 00 |..;....9....C...|
00000090: 00 39 e5 00 00 00 42 e6 00 00 00 24 01 00 cf 28 |.9....B....$...(|
000000a0: d4 03 0e 00 00 bc 1e 6c 1d 1b 0e 1b 0a 1b 02 1b |.......l........|
000000b0: 03 00                                           |..|
```