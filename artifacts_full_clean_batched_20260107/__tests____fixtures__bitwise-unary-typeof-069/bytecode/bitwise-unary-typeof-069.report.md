# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/bitwise-unary-typeof-069.ts
**生成时间**: 2026-01-07T03:18:58.711Z

## 大小对比

- TypeScript编译器: 196 字节
- WASM编译器: 196 字节
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
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bitwise-unary-typeof-069.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 131
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
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
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
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bitwise-unary-typeof-069.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 65,
    "tag": "0xc",
    "remaining": 131
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c |...x.y.console.l|
00000010: 6f 67 5c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |og\__tests__/fix|
00000020: 74 75 72 65 73 2f 62 69 74 77 69 73 65 2d 75 6e |tures/bitwise-un|
00000030: 61 72 79 2d 74 79 70 65 6f 66 2d 30 36 39 2e 6a |ary-typeof-069.j|
00000040: 73 0c 00 06 00 a4 01 00 01 00 06 00 00 54 01 a6 |s............T..|
00000050: 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 80 |....@.....@.....|
00000060: 3f e4 00 00 00 80 3f e5 00 00 00 80 bf 45 ba b1 |?.....?......E..|
00000070: bc b0 3b e4 00 00 00 39 e4 00 00 00 97 3b e5 00 |..;....9.....;..|
00000080: 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 00 |..9....C....9...|
00000090: 00 39 e5 00 00 00 38 e5 00 00 00 99 39 e5 00 00 |.9....8.....9...|
000000a0: 00 98 98 24 04 00 cf 28 d0 03 18 00 00 8a 1c 0c |...$...(........|
000000b0: 0a 21 0f 1b 01 21 13 1b 0e 1b 0a 1b 06 1b 14 20 |.!...!......... |
000000c0: 0a 25 25 00                                     |.%%.|
```

### WASM
```
00000000: 05 05 02 78 02 79 0e 63 6f 6e 73 6f 6c 65 06 6c |...x.y.console.l|
00000010: 6f 67 5c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |og\__tests__/fix|
00000020: 74 75 72 65 73 2f 62 69 74 77 69 73 65 2d 75 6e |tures/bitwise-un|
00000030: 61 72 79 2d 74 79 70 65 6f 66 2d 30 36 39 2e 6a |ary-typeof-069.j|
00000040: 73 0c 00 06 00 a4 01 00 01 00 06 00 00 54 01 a6 |s............T..|
00000050: 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 80 |....@.....@.....|
00000060: 3f e4 00 00 00 80 3f e5 00 00 00 80 bf 45 ba b1 |?.....?......E..|
00000070: bc b0 3b e4 00 00 00 39 e4 00 00 00 97 3b e5 00 |..;....9.....;..|
00000080: 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e4 00 00 |..9....C....9...|
00000090: 00 39 e5 00 00 00 38 e5 00 00 00 99 39 e5 00 00 |.9....8.....9...|
000000a0: 00 98 98 24 04 00 cf 28 d0 03 18 00 00 8a 1c 0c |...$...(........|
000000b0: 0a 21 0f 1b 01 21 13 1b 0e 1b 0a 1b 06 1b 14 20 |.!...!......... |
000000c0: 0a 25 25 00                                     |.%%.|
```