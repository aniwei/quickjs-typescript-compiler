# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/switch-fallthrough.ts
**生成时间**: 2026-01-03T15:15:48.304Z

## 大小对比

- TypeScript编译器: 189 字节
- WASM编译器: 189 字节
- 差异: 0 字节 (0.00%)

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
    "remaining": 132
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

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
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