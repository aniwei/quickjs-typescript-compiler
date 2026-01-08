# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/try-finally-basic.ts
**生成时间**: 2026-01-07T17:57:48.145Z

## 大小对比

- TypeScript编译器: 160 字节
- WASM编译器: 158 字节
- 差异: 2 字节 (1.27%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-finally-basic.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 106
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/try-finally-basic.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 54,
    "tag": "0xc",
    "remaining": 104
  }
}
```

## 字节级差异

共发现 9 个字节差异:

- 偏移量 0x8e: TS=0x10 vs WASM=0x0e
- 偏移量 0x97: TS=0x48 vs WASM=0x7d
- 偏移量 0x99: TS=0x37 vs WASM=0x1b
- 偏移量 0x9a: TS=0x00 vs WASM=0x0e
- 偏移量 0x9b: TS=0x1b vs WASM=0x20
- 偏移量 0x9c: TS=0x0e vs WASM=0x08
- 偏移量 0x9d: TS=0x20 vs WASM=0x00
- 偏移量 0x9e: TS=0x08 vs WASM=EOF
- 偏移量 0x9f: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 4e 5f |...console.logN_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 74 72 79 2d 66 69 6e 61 6c 6c 79 2d 62 61 |s/try-finally-ba|
00000030: 73 69 63 2e 6a 73 0c 00 06 00 a4 01 00 02 00 05 |sic.js..........|
00000040: 00 00 3e 02 a6 01 00 00 00 a6 01 00 01 00 06 cb |..>.............|
00000050: 6f 1d 00 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 |o....9....C.....|
00000060: 24 01 00 cb 0e 06 70 0d 00 00 00 0e ee 1d 70 05 |$.....p.......p.|
00000070: 00 00 00 30 c7 cc 06 cb 39 e4 00 00 00 43 e5 00 |...0....9....C..|
00000080: 00 00 b9 24 01 00 cb c8 cb 71 c7 28 cc 03 10 00 |...$.....q.(....|
00000090: 00 27 08 1b 0e 20 08 48 15 37 00 1b 0e 20 08 00 |.'... .H.7... ..|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 4e 5f |...console.logN_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 74 72 79 2d 66 69 6e 61 6c 6c 79 2d 62 61 |s/try-finally-ba|
00000030: 73 69 63 2e 6a 73 0c 00 06 00 a4 01 00 02 00 05 |sic.js..........|
00000040: 00 00 3e 02 a6 01 00 00 00 a6 01 00 01 00 06 cb |..>.............|
00000050: 6f 1d 00 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 |o....9....C.....|
00000060: 24 01 00 cb 0e 06 70 0d 00 00 00 0e ee 1d 70 05 |$.....p.......p.|
00000070: 00 00 00 30 c7 cc 06 cb 39 e4 00 00 00 43 e5 00 |...0....9....C..|
00000080: 00 00 b9 24 01 00 cb c8 cb 71 c7 28 cc 03 0e 00 |...$.....q.(....|
00000090: 00 27 08 1b 0e 20 08 7d 15 1b 0e 20 08 00       |.'... .}... ..|
```