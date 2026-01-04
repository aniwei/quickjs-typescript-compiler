# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/numeric-separators.ts
**生成时间**: 2026-01-03T14:08:26.445Z

## 大小对比

- TypeScript编译器: 331 字节
- WASM编译器: 331 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "decimal",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "binary",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "hex",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "octal",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "big",
      "offset": 27
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "bigHex",
      "offset": 31
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 38
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 46
    },
    {
      "index": 8,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/numeric-separators.js",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 240
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "decimal",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "binary",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "hex",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "octal",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "big",
      "offset": 27
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "bigHex",
      "offset": 31
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 38
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 46
    },
    {
      "index": 8,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/numeric-separators.js",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 240
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 0e 64 65 63 69 6d 61 6c 0c 62 69 6e 61 72 |...decimal.binar|
00000010: 79 06 68 65 78 0a 6f 63 74 61 6c 06 62 69 67 0c |y.hex.octal.big.|
00000020: 62 69 67 48 65 78 0e 63 6f 6e 73 6f 6c 65 06 6c |bigHex.console.l|
00000030: 6f 67 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogP__tests__/fix|
00000040: 74 75 72 65 73 2f 6e 75 6d 65 72 69 63 2d 73 65 |tures/numeric-se|
00000050: 70 61 72 61 74 6f 72 73 2e 6a 73 0c 00 06 00 a4 |parators.js.....|
00000060: 01 00 01 00 06 00 00 bb 01 01 a6 01 00 00 00 40 |...............@|
00000070: e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 |.....@.....@....|
00000080: 80 40 e7 00 00 00 80 40 e8 00 00 00 80 40 e9 00 |.@.....@.....@..|
00000090: 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 80 3f |...?.....?.....?|
000000a0: e6 00 00 00 80 3f e7 00 00 00 80 3f e8 00 00 00 |.....?.....?....|
000000b0: 80 3f e9 00 00 00 80 01 40 42 0f 00 3b e4 00 00 |.?......@B..;...|
000000c0: 00 c0 aa 00 3b e5 00 00 00 01 ff ff 00 00 3b e6 |....;.........;.|
000000d0: 00 00 00 c0 ff 01 3b e7 00 00 00 b4 15 cd 5b 07 |......;.......[.|
000000e0: 3b e8 00 00 00 b4 ff 01 00 00 3b e9 00 00 00 39 |;.........;....9|
000000f0: ea 00 00 00 43 eb 00 00 00 39 e4 00 00 00 39 e5 |....C....9....9.|
00000100: 00 00 00 39 e6 00 00 00 39 e7 00 00 00 24 04 00 |...9....9....$..|
00000110: cb 39 ea 00 00 00 43 eb 00 00 00 39 e8 00 00 00 |.9....C....9....|
00000120: 39 e9 00 00 00 24 02 00 cf 28 d8 03 1d 00 00 00 |9....$...(......|
00000130: 80 01 0c 00 1b 0e 1b 0a 1b 12 1b 10 1b 0a 1b 2d |...............-|
00000140: 17 15 1b 0e 1b 0a 1b 0a 1b 0b 00                |...........|
```

### WASM
```
00000000: 05 09 0e 64 65 63 69 6d 61 6c 0c 62 69 6e 61 72 |...decimal.binar|
00000010: 79 06 68 65 78 0a 6f 63 74 61 6c 06 62 69 67 0c |y.hex.octal.big.|
00000020: 62 69 67 48 65 78 0e 63 6f 6e 73 6f 6c 65 06 6c |bigHex.console.l|
00000030: 6f 67 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogP__tests__/fix|
00000040: 74 75 72 65 73 2f 6e 75 6d 65 72 69 63 2d 73 65 |tures/numeric-se|
00000050: 70 61 72 61 74 6f 72 73 2e 6a 73 0c 00 06 00 a4 |parators.js.....|
00000060: 01 00 01 00 06 00 00 bb 01 01 a6 01 00 00 00 40 |...............@|
00000070: e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 |.....@.....@....|
00000080: 80 40 e7 00 00 00 80 40 e8 00 00 00 80 40 e9 00 |.@.....@.....@..|
00000090: 00 00 80 3f e4 00 00 00 80 3f e5 00 00 00 80 3f |...?.....?.....?|
000000a0: e6 00 00 00 80 3f e7 00 00 00 80 3f e8 00 00 00 |.....?.....?....|
000000b0: 80 3f e9 00 00 00 80 01 40 42 0f 00 3b e4 00 00 |.?......@B..;...|
000000c0: 00 c0 aa 00 3b e5 00 00 00 01 ff ff 00 00 3b e6 |....;.........;.|
000000d0: 00 00 00 c0 ff 01 3b e7 00 00 00 b4 15 cd 5b 07 |......;.......[.|
000000e0: 3b e8 00 00 00 b4 ff 01 00 00 3b e9 00 00 00 39 |;.........;....9|
000000f0: ea 00 00 00 43 eb 00 00 00 39 e4 00 00 00 39 e5 |....C....9....9.|
00000100: 00 00 00 39 e6 00 00 00 39 e7 00 00 00 24 04 00 |...9....9....$..|
00000110: cb 39 ea 00 00 00 43 eb 00 00 00 39 e8 00 00 00 |.9....C....9....|
00000120: 39 e9 00 00 00 24 02 00 cf 28 d8 03 1d 00 00 00 |9....$...(......|
00000130: 80 01 0c 00 1b 0e 1b 0a 1b 12 1b 10 1b 0a 1b 2d |...............-|
00000140: 17 15 1b 0e 1b 0a 1b 0a 1b 0b 00                |...........|
```