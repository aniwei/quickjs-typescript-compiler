# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/if-else.ts
**生成时间**: 2025-12-16T14:11:02.532Z

## 大小对比

- TypeScript编译器: 158 字节
- WASM编译器: 154 字节
- 差异: 4 字节 (2.60%)

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
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/if-else.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 46,
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
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/if-else.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 108
  }
}
```

## 字节级差异

共发现 26 个字节差异:

- 偏移量 0x46: TS=0x00 vs WASM=0x80
- 偏移量 0x4c: TS=0x12 vs WASM=0x82
- 偏移量 0x65: TS=0x0e vs WASM=0xcb
- 偏移量 0x6f: TS=0x0e vs WASM=0xcb
- 偏移量 0x86: TS=0x16 vs WASM=0x12
- 偏移量 0x89: TS=0x3e vs WASM=0x67
- 偏移量 0x8a: TS=0x10 vs WASM=0x08
- 偏移量 0x8b: TS=0x07 vs WASM=0x20
- 偏移量 0x8c: TS=0x07 vs WASM=0x04
- 偏移量 0x8d: TS=0x26 vs WASM=0x12
- 偏移量 0x8e: TS=0x00 vs WASM=0x03
- 偏移量 0x8f: TS=0x1b vs WASM=0x37
- 偏移量 0x90: TS=0x08 vs WASM=0x00
- 偏移量 0x91: TS=0x07 vs WASM=0x2c
- 偏移量 0x92: TS=0x03 vs WASM=0x07
- 偏移量 0x93: TS=0x12 vs WASM=0x1b
- 偏移量 0x94: TS=0x04 vs WASM=0x0e
- 偏移量 0x95: TS=0x37 vs WASM=0x1b
- 偏移量 0x96: TS=0x00 vs WASM=0x0a
- 偏移量 0x97: TS=0x2c vs WASM=0x1b
- ... (显示前20个差异，总共26个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 3a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |:__tests__/fixtu|
00000020: 72 65 73 2f 69 66 2d 65 6c 73 65 2e 6a 73 0c 00 |res/if-else.js..|
00000030: 06 00 a4 01 00 01 00 03 00 00 43 01 a6 01 00 00 |..........C.....|
00000040: 00 40 e4 00 00 00 00 3f e4 00 00 00 12 b8 3b e4 |.@.....?......;.|
00000050: 00 00 00 06 cb 39 e4 00 00 00 b7 a7 ec 0b b9 11 |.....9..........|
00000060: 3a e4 00 00 00 0e ee 09 ba 11 3a e4 00 00 00 0e |:.........:.....|
00000070: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 |9....C....9....$|
00000080: 01 00 cf 28 ce 03 16 00 00 3e 10 07 07 26 00 1b |...(.....>...&..|
00000090: 08 07 03 12 04 37 00 2c 0f 34 18 1b 17 00       |.....7.,.4....|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 3a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |:__tests__/fixtu|
00000020: 72 65 73 2f 69 66 2d 65 6c 73 65 2e 6a 73 0c 00 |res/if-else.js..|
00000030: 06 00 a4 01 00 01 00 03 00 00 43 01 a6 01 00 00 |..........C.....|
00000040: 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b8 3b e4 |.@.....?......;.|
00000050: 00 00 00 06 cb 39 e4 00 00 00 b7 a7 ec 0b b9 11 |.....9..........|
00000060: 3a e4 00 00 00 cb ee 09 ba 11 3a e4 00 00 00 cb |:.........:.....|
00000070: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 |9....C....9....$|
00000080: 01 00 cf 28 ce 03 12 00 00 67 08 20 04 12 03 37 |...(.....g. ...7|
00000090: 00 2c 07 1b 0e 1b 0a 1b 01 00                   |.,........|
```