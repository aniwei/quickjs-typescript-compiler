# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-089.ts
**生成时间**: 2025-12-25T01:17:44.168Z

## 大小对比

- TypeScript编译器: 213 字节
- WASM编译器: 207 字节
- 差异: 6 字节 (2.90%)

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-089.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 151
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-089.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 145
  }
}
```

## 字节级差异

共发现 88 个字节差异:

- 偏移量 0x4a: TS=0x68 vs WASM=0x62
- 偏移量 0x73: TS=0x26 vs WASM=0xb7
- 偏移量 0x74: TS=0x00 vs WASM=0x26
- 偏移量 0x75: TS=0x00 vs WASM=0x01
- 偏移量 0x76: TS=0xb7 vs WASM=0x00
- 偏移量 0x77: TS=0xb7 vs WASM=0xb8
- 偏移量 0x78: TS=0x53 vs WASM=0x39
- 偏移量 0x79: TS=0x91 vs WASM=0xe4
- 偏移量 0x7a: TS=0x39 vs WASM=0x00
- 偏移量 0x7b: TS=0xe4 vs WASM=0x00
- 偏移量 0x7d: TS=0x00 vs WASM=0x54
- 偏移量 0x7e: TS=0x00 vs WASM=0xbf
- 偏移量 0x7f: TS=0x54 vs WASM=0x59
- 偏移量 0x80: TS=0xbf vs WASM=0xbe
- 偏移量 0x81: TS=0x59 vs WASM=0x9e
- 偏移量 0x82: TS=0xbe vs WASM=0x53
- 偏移量 0x83: TS=0x9e vs WASM=0x91
- 偏移量 0x84: TS=0x53 vs WASM=0xba
- 偏移量 0x85: TS=0x91 vs WASM=0xbb
- 偏移量 0x86: TS=0xba vs WASM=0x26
- ... (显示前20个差异，总共88个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogV__tests__/fix|
00000020: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000030: 63 6f 6d 70 6c 65 78 2d 30 38 39 2e 6a 73 0c 00 |complex-089.js..|
00000040: 06 00 a4 01 00 01 00 06 00 00 68 01 a6 01 00 00 |..........h.....|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000060: 00 00 80 3f e5 00 00 00 80 b8 b9 26 02 00 3b e4 |...?.......&..;.|
00000070: 00 00 00 26 00 00 b7 b7 53 91 39 e4 00 00 00 54 |...&....S.9....T|
00000080: bf 59 be 9e 53 91 ba bb 26 02 00 54 0e 3b e5 00 |.Y..S...&..T.;..|
00000090: 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 |..9....C....9...|
000000a0: 00 42 30 00 00 00 39 e5 00 00 00 b9 48 39 e5 00 |.B0...9.....H9..|
000000b0: 00 00 ba 48 24 03 00 cf 28 d0 03 18 00 00 d1 22 |...H$...(......"|
000000c0: 2f 0c 4e 2d 1b 0e 1b 0a 1b 02 1b 12 20 02 07 0a |/.N-........ ...|
000000d0: 20 02 07 23 00                                  | ..#.|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogV__tests__/fix|
00000020: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000030: 63 6f 6d 70 6c 65 78 2d 30 38 39 2e 6a 73 0c 00 |complex-089.js..|
00000040: 06 00 a4 01 00 01 00 06 00 00 62 01 a6 01 00 00 |..........b.....|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000060: 00 00 80 3f e5 00 00 00 80 b8 b9 26 02 00 3b e4 |...?.......&..;.|
00000070: 00 00 00 b7 26 01 00 b8 39 e4 00 00 00 54 bf 59 |....&...9....T.Y|
00000080: be 9e 53 91 ba bb 26 02 00 54 0e 3b e5 00 00 00 |..S...&..T.;....|
00000090: 39 e6 00 00 00 43 e7 00 00 00 39 e5 00 00 00 eb |9....C....9.....|
000000a0: 39 e5 00 00 00 b9 48 39 e5 00 00 00 ba 48 24 03 |9.....H9.....H$.|
000000b0: 00 cf 28 d0 03 18 00 00 c7 22 2f 0c 4e 2d 1b 0e |..(......"/.N-..|
000000c0: 1b 0a 1b 02 07 12 20 02 07 0a 20 02 07 23 00    |...... ... ..#.|
```