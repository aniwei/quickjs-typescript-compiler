# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-fallthrough.ts
**生成时间**: 2025-12-16T14:11:02.599Z

## 大小对比

- TypeScript编译器: 198 字节
- WASM编译器: 189 字节
- 差异: 9 字节 (4.76%)

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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-fallthrough.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 141
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/switch-fallthrough.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 132
  }
}
```

## 字节级差异

共发现 55 个字节差异:

- 偏移量 0x45: TS=0x58 vs WASM=0x57
- 偏移量 0x51: TS=0x00 vs WASM=0x80
- 偏移量 0x57: TS=0x12 vs WASM=0x82
- 偏移量 0x78: TS=0x0e vs WASM=0xcb
- 偏移量 0x7f: TS=0x13 vs WASM=0x12
- 偏移量 0x8e: TS=0x0e vs WASM=0xcb
- 偏移量 0x8f: TS=0xef vs WASM=0xee
- 偏移量 0x90: TS=0x11 vs WASM=0x10
- 偏移量 0x91: TS=0x00 vs WASM=0x39
- 偏移量 0x92: TS=0x39 vs WASM=0xe5
- 偏移量 0x93: TS=0xe5 vs WASM=0x00
- 偏移量 0x96: TS=0x00 vs WASM=0x43
- 偏移量 0x97: TS=0x43 vs WASM=0xe6
- 偏移量 0x98: TS=0xe6 vs WASM=0x00
- 偏移量 0x9b: TS=0x00 vs WASM=0xb9
- 偏移量 0x9c: TS=0xb9 vs WASM=0x24
- 偏移量 0x9d: TS=0x24 vs WASM=0x01
- 偏移量 0x9e: TS=0x01 vs WASM=0x00
- 偏移量 0x9f: TS=0x00 vs WASM=0xcb
- 偏移量 0xa1: TS=0x0e vs WASM=0xc7
- ... (显示前20个差异，总共55个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |P__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 66 61 6c 6c 74 |res/switch-fallt|
00000030: 68 72 6f 75 67 68 2e 6a 73 0c 00 06 00 a4 01 00 |hrough.js.......|
00000040: 01 00 04 00 00 58 01 a6 01 00 00 00 40 e4 00 00 |.....X......@...|
00000050: 00 00 3f e4 00 00 00 12 b7 3b e4 00 00 00 06 cb |..?......;......|
00000060: 39 e4 00 00 00 11 b7 ad ec 12 39 e5 00 00 00 43 |9.........9....C|
00000070: e6 00 00 00 b7 24 01 00 0e ee 06 11 b8 ad ec 13 |.....$..........|
00000080: 39 e5 00 00 00 43 e6 00 00 00 b8 24 01 00 0e ef |9....C.....$....|
00000090: 11 00 39 e5 00 00 00 43 e6 00 00 00 b9 24 01 00 |..9....C.....$..|
000000a0: 0e 0e c7 28 ce 03 1e 00 00 3e 10 07 07 26 08 21 |...(.....>...&.!|
000000b0: 02 17 01 34 18 07 17 26 02 17 01 34 18 07 17 28 |...4...&...4...(|
000000c0: 00 34 18 07 17 00                               |.4....|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |P__tests__/fixtu|
00000020: 72 65 73 2f 73 77 69 74 63 68 2d 66 61 6c 6c 74 |res/switch-fallt|
00000030: 68 72 6f 75 67 68 2e 6a 73 0c 00 06 00 a4 01 00 |hrough.js.......|
00000040: 01 00 04 00 00 57 01 a6 01 00 00 00 40 e4 00 00 |.....W......@...|
00000050: 00 80 3f e4 00 00 00 82 b7 3b e4 00 00 00 06 cb |..?......;......|
00000060: 39 e4 00 00 00 11 b7 ad ec 12 39 e5 00 00 00 43 |9.........9....C|
00000070: e6 00 00 00 b7 24 01 00 cb ee 06 11 b8 ad ec 12 |.....$..........|
00000080: 39 e5 00 00 00 43 e6 00 00 00 b8 24 01 00 cb ee |9....C.....$....|
00000090: 10 39 e5 00 00 00 43 e6 00 00 00 b9 24 01 00 cb |.9....C.....$...|
000000a0: 0e c7 28 ce 03 16 00 00 67 10 36 00 1b 0e 20 08 |..(.....g.6... .|
000000b0: 3b 15 1b 0e 20 08 23 15 1b 0e 20 08 00          |;... .#... ..|
```