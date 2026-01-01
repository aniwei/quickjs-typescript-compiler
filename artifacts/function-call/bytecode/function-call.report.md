# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/function-call.ts
**生成时间**: 2026-01-01T10:01:38.913Z

## 大小对比

- TypeScript编译器: 199 字节
- WASM编译器: 199 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-call.js",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 138
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-call.js",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xc",
    "remaining": 138
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0c 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c |...result.consol|
00000010: 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f |e.logF__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 66 75 6e 63 74 69 6f |fixtures/functio|
00000030: 6e 2d 63 61 6c 6c 2e 6a 73 02 61 02 62 0c 00 06 |n-call.js.a.b...|
00000040: 00 a4 01 00 01 00 03 00 01 3b 01 a6 01 00 00 00 |.........;......|
00000050: 40 6a 00 00 00 40 40 e4 00 00 00 80 c2 00 41 6a |@j...@@.......Aj|
00000060: 00 00 00 00 3f e4 00 00 00 82 39 6a 00 00 00 b8 |....?.....9j....|
00000070: b9 f2 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 00 |..;....9....C...|
00000080: 00 39 e4 00 00 00 24 01 00 cf 28 ce 03 0e 00 00 |.9....$...(.....|
00000090: 87 1a 25 06 21 1f 1b 0e 1b 0a 1b 01 00 0c 43 06 |..%.!.........C.|
000000a0: 00 d4 01 02 00 02 02 00 00 04 02 d0 03 00 01 00 |................|
000000b0: d2 03 00 01 00 d3 d4 9f 28 ce 03 0a 00 00 03 16 |........(.......|
000000c0: 07 08 07 03 07 11 00                            |.......|
```

### WASM
```
00000000: 05 06 0c 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c |...result.consol|
00000010: 65 06 6c 6f 67 46 5f 5f 74 65 73 74 73 5f 5f 2f |e.logF__tests__/|
00000020: 66 69 78 74 75 72 65 73 2f 66 75 6e 63 74 69 6f |fixtures/functio|
00000030: 6e 2d 63 61 6c 6c 2e 6a 73 02 61 02 62 0c 00 06 |n-call.js.a.b...|
00000040: 00 a4 01 00 01 00 03 00 01 3b 01 a6 01 00 00 00 |.........;......|
00000050: 40 6a 00 00 00 40 40 e4 00 00 00 80 c2 00 41 6a |@j...@@.......Aj|
00000060: 00 00 00 00 3f e4 00 00 00 82 39 6a 00 00 00 b8 |....?.....9j....|
00000070: b9 f2 3b e4 00 00 00 39 e5 00 00 00 43 e6 00 00 |..;....9....C...|
00000080: 00 39 e4 00 00 00 24 01 00 cf 28 ce 03 0e 00 00 |.9....$...(.....|
00000090: 87 1a 25 06 21 1f 1b 0e 1b 0a 1b 01 00 0c 43 06 |..%.!.........C.|
000000a0: 00 d4 01 02 00 02 02 00 00 04 02 d0 03 00 01 00 |................|
000000b0: d2 03 00 01 00 d3 d4 9f 28 ce 03 0a 00 00 03 16 |........(.......|
000000c0: 07 08 07 03 07 11 00                            |.......|
```