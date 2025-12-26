# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/bigint-exponentiation.ts
**生成时间**: 2025-12-26T13:00:17.473Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 190 字节
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
      "string": "y",
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bigint-exponentiation.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 130
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
      "string": "y",
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bigint-exponentiation.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...y.console.log|
00000010: 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |V__tests__/fixtu|
00000020: 72 65 73 2f 62 69 67 69 6e 74 2d 65 78 70 6f 6e |res/bigint-expon|
00000030: 65 6e 74 69 61 74 69 6f 6e 2e 6a 73 0c 00 06 00 |entiation.js....|
00000040: a4 01 00 01 00 04 00 00 55 01 a6 01 00 00 00 40 |........U......@|
00000050: e4 00 00 00 80 3f e4 00 00 00 82 39 e5 00 00 00 |.....?.....9....|
00000060: 43 e6 00 00 00 b4 02 00 00 00 b4 03 00 00 00 a1 |C...............|
00000070: 24 01 00 cb b4 02 00 00 00 3b e4 00 00 00 39 e4 |$........;....9.|
00000080: 00 00 00 b4 05 00 00 00 a1 11 3a e4 00 00 00 cb |..........:.....|
00000090: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 |9....C....9....$|
000000a0: 01 00 cf 28 ce 03 16 00 00 3f 00 1b 0e 4d 10 07 |...(.....?...M..|
000000b0: 07 4a 15 34 04 2b 03 1b 0e 1b 0a 1b 01 00       |.J.4.+........|
```

### WASM
```
00000000: 05 04 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...y.console.log|
00000010: 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |V__tests__/fixtu|
00000020: 72 65 73 2f 62 69 67 69 6e 74 2d 65 78 70 6f 6e |res/bigint-expon|
00000030: 65 6e 74 69 61 74 69 6f 6e 2e 6a 73 0c 00 06 00 |entiation.js....|
00000040: a4 01 00 01 00 04 00 00 55 01 a6 01 00 00 00 40 |........U......@|
00000050: e4 00 00 00 80 3f e4 00 00 00 82 39 e5 00 00 00 |.....?.....9....|
00000060: 43 e6 00 00 00 b4 02 00 00 00 b4 03 00 00 00 a1 |C...............|
00000070: 24 01 00 cb b4 02 00 00 00 3b e4 00 00 00 39 e4 |$........;....9.|
00000080: 00 00 00 b4 05 00 00 00 a1 11 3a e4 00 00 00 cb |..........:.....|
00000090: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 |9....C....9....$|
000000a0: 01 00 cf 28 ce 03 16 00 00 3f 00 1b 0e 4d 10 07 |...(.....?...M..|
000000b0: 07 4a 15 34 04 2b 03 1b 0e 1b 0a 1b 01 00       |.J.4.+........|
```