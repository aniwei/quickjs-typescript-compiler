# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/variables-let-block.ts
**生成时间**: 2026-01-07T07:08:30.618Z

## 大小对比

- TypeScript编译器: 166 字节
- WASM编译器: 166 字节
- 差异: 0 字节 (0.00%)

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
      "string": "b",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-let-block.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 60,
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
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/variables-let-block.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xc",
    "remaining": 106
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 62 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |...b.a.console.l|
00000010: 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogR__tests__/fix|
00000020: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000030: 6c 65 74 2d 62 6c 6f 63 6b 2e 6a 73 0c 00 06 00 |let-block.js....|
00000040: a4 01 00 02 00 03 00 00 3c 02 a6 01 00 00 00 c8 |........<.......|
00000050: 03 02 00 20 40 e5 00 00 00 80 3f e5 00 00 00 82 |... @.....?.....|
00000060: b8 3b e5 00 00 00 63 01 00 b9 cc 39 e6 00 00 00 |.;....c....9....|
00000070: 43 e7 00 00 00 64 01 00 24 01 00 cb 39 e6 00 00 |C....d..$...9...|
00000080: 00 43 e7 00 00 00 39 e5 00 00 00 24 01 00 cf 28 |.C....9....$...(|
00000090: d0 03 12 00 00 78 08 1b 0e 1b 0a 11 01 18 1d 1b |.....x..........|
000000a0: 0e 1b 0a 1b 01 00                               |......|
```

### WASM
```
00000000: 05 05 02 62 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |...b.a.console.l|
00000010: 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogR__tests__/fix|
00000020: 74 75 72 65 73 2f 76 61 72 69 61 62 6c 65 73 2d |tures/variables-|
00000030: 6c 65 74 2d 62 6c 6f 63 6b 2e 6a 73 0c 00 06 00 |let-block.js....|
00000040: a4 01 00 02 00 03 00 00 3c 02 a6 01 00 00 00 c8 |........<.......|
00000050: 03 02 00 20 40 e5 00 00 00 80 3f e5 00 00 00 82 |... @.....?.....|
00000060: b8 3b e5 00 00 00 63 01 00 b9 cc 39 e6 00 00 00 |.;....c....9....|
00000070: 43 e7 00 00 00 64 01 00 24 01 00 cb 39 e6 00 00 |C....d..$...9...|
00000080: 00 43 e7 00 00 00 39 e5 00 00 00 24 01 00 cf 28 |.C....9....$...(|
00000090: d0 03 12 00 00 78 08 1b 0e 1b 0a 11 01 18 1d 1b |.....x..........|
000000a0: 0e 1b 0a 1b 01 00                               |......|
```