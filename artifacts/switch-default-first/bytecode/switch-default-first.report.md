# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-default-first.ts
**生成时间**: 2025-12-16T14:11:02.591Z

## 大小对比

- TypeScript编译器: 171 字节
- WASM编译器: 165 字节
- 差异: 6 字节 (3.64%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-default-first.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 112
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-default-first.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 106
  }
}
```

## 字节级差异

共发现 25 个字节差异:

- 偏移量 0x53: TS=0x00 vs WASM=0x80
- 偏移量 0x59: TS=0x12 vs WASM=0x82
- 偏移量 0x77: TS=0x0e vs WASM=0xcb
- 偏移量 0x8d: TS=0x0e vs WASM=0xcb
- 偏移量 0x93: TS=0x16 vs WASM=0x10
- 偏移量 0x96: TS=0x3e vs WASM=0x67
- 偏移量 0x98: TS=0x07 vs WASM=0x27
- 偏移量 0x99: TS=0x07 vs WASM=0x00
- 偏移量 0x9a: TS=0x26 vs WASM=0x1b
- 偏移量 0x9b: TS=0x08 vs WASM=0x0e
- 偏移量 0x9c: TS=0x27 vs WASM=0x20
- 偏移量 0x9d: TS=0x00 vs WASM=0x08
- 偏移量 0x9e: TS=0x34 vs WASM=0x3b
- 偏移量 0x9f: TS=0x18 vs WASM=0x15
- 偏移量 0xa0: TS=0x07 vs WASM=0x1b
- 偏移量 0xa1: TS=0x17 vs WASM=0x0e
- 偏移量 0xa2: TS=0x26 vs WASM=0x20
- 偏移量 0xa3: TS=0x02 vs WASM=0x08
- 偏移量 0xa4: TS=0x17 vs WASM=0x00
- 偏移量 0xa5: TS=0x01 vs WASM=EOF
- ... (显示前20个差异，总共25个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |T__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 64 65 66 61 75 |res/switch-defau|
00000030: 6c 74 2d 66 69 72 73 74 2e 6a 73 0c 00 06 00 a4 |lt-first.js.....|
00000040: 01 00 01 00 04 00 00 43 01 a6 01 00 00 00 40 e4 |.......C......@.|
00000050: 00 00 00 00 3f e4 00 00 00 12 b7 3b e4 00 00 00 |....?......;....|
00000060: 06 cb 39 e4 00 00 00 ee 12 39 e5 00 00 00 43 e6 |..9......9....C.|
00000070: 00 00 00 b9 24 01 00 0e ee 06 11 b7 ad ec eb 39 |....$..........9|
00000080: e5 00 00 00 43 e6 00 00 00 b7 24 01 00 0e 0e c7 |....C.....$.....|
00000090: 28 ce 03 16 00 00 3e 10 07 07 26 08 27 00 34 18 |(.....>...&.'.4.|
000000a0: 07 17 26 02 17 01 34 18 07 17 00                |..&...4....|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |T__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 64 65 66 61 75 |res/switch-defau|
00000030: 6c 74 2d 66 69 72 73 74 2e 6a 73 0c 00 06 00 a4 |lt-first.js.....|
00000040: 01 00 01 00 04 00 00 43 01 a6 01 00 00 00 40 e4 |.......C......@.|
00000050: 00 00 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 00 |....?......;....|
00000060: 06 cb 39 e4 00 00 00 ee 12 39 e5 00 00 00 43 e6 |..9......9....C.|
00000070: 00 00 00 b9 24 01 00 cb ee 06 11 b7 ad ec eb 39 |....$..........9|
00000080: e5 00 00 00 43 e6 00 00 00 b7 24 01 00 cb 0e c7 |....C.....$.....|
00000090: 28 ce 03 10 00 00 67 10 27 00 1b 0e 20 08 3b 15 |(.....g.'... .;.|
000000a0: 1b 0e 20 08 00                                  |.. ..|
```