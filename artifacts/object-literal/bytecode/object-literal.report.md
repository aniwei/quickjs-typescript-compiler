# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-literal.ts
**生成时间**: 2025-12-16T14:11:02.555Z

## 大小对比

- TypeScript编译器: 157 字节
- WASM编译器: 149 字节
- 差异: 8 字节 (5.37%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-literal.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 98
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 5,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-literal.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 90
  }
}
```

## 字节级差异

共发现 21 个字节差异:

- 偏移量 0x53: TS=0x01 vs WASM=0x80
- 偏移量 0x59: TS=0x10 vs WASM=0x80
- 偏移量 0x87: TS=0x14 vs WASM=0x0c
- 偏移量 0x8a: TS=0x3e vs WASM=0x99
- 偏移量 0x8b: TS=0x18 vs WASM=0x00
- 偏移量 0x8c: TS=0x07 vs WASM=0x1b
- 偏移量 0x8d: TS=0x0a vs WASM=0x0e
- 偏移量 0x8e: TS=0x07 vs WASM=0x1b
- 偏移量 0x8f: TS=0x05 vs WASM=0x0a
- 偏移量 0x91: TS=0x12 vs WASM=0x06
- 偏移量 0x92: TS=0x07 vs WASM=0x1b
- 偏移量 0x93: TS=0x05 vs WASM=0x07
- 偏移量 0x94: TS=0x1b vs WASM=0x00
- 偏移量 0x95: TS=0x1b vs WASM=EOF
- 偏移量 0x96: TS=0x1c vs WASM=EOF
- 偏移量 0x97: TS=0x0b vs WASM=EOF
- 偏移量 0x98: TS=0x34 vs WASM=EOF
- 偏移量 0x99: TS=0x18 vs WASM=EOF
- 偏移量 0x9a: TS=0x34 vs WASM=EOF
- 偏移量 0x9b: TS=0x17 vs WASM=EOF
- ... (显示前20个差异，总共21个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f |...obj.a.b.conso|
00000010: 6c 65 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f |le.logH__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 |/fixtures/object|
00000030: 2d 6c 69 74 65 72 61 6c 2e 6a 73 0c 00 06 00 a4 |-literal.js.....|
00000040: 01 00 01 00 03 00 00 37 01 a6 01 00 00 00 40 e4 |.......7......@.|
00000050: 00 00 00 01 3f e4 00 00 00 10 0b b8 4e e5 00 00 |....?.......N...|
00000060: 00 b9 4e e6 00 00 00 3b e4 00 00 00 39 e7 00 00 |..N....;....9...|
00000070: 00 43 e8 00 00 00 39 e4 00 00 00 42 e5 00 00 00 |.C....9....B....|
00000080: 24 01 00 cf 28 d2 03 14 00 00 3e 18 07 0a 07 05 |$...(.....>.....|
00000090: 1b 12 07 05 1b 1b 1c 0b 34 18 34 17 00          |........4.4..|
```

### WASM
```
00000000: 05 06 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f |...obj.a.b.conso|
00000010: 6c 65 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f |le.logH__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 |/fixtures/object|
00000030: 2d 6c 69 74 65 72 61 6c 2e 6a 73 0c 00 06 00 a4 |-literal.js.....|
00000040: 01 00 01 00 03 00 00 37 01 a6 01 00 00 00 40 e4 |.......7......@.|
00000050: 00 00 00 80 3f e4 00 00 00 80 0b b8 4e e5 00 00 |....?.......N...|
00000060: 00 b9 4e e6 00 00 00 3b e4 00 00 00 39 e7 00 00 |..N....;....9...|
00000070: 00 43 e8 00 00 00 39 e4 00 00 00 42 e5 00 00 00 |.C....9....B....|
00000080: 24 01 00 cf 28 d2 03 0c 00 00 99 00 1b 0e 1b 0a |$...(...........|
00000090: 1b 06 1b 07 00                                  |.....|
```