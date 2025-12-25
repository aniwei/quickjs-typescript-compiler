# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/function-expressions.ts
**生成时间**: 2025-12-25T03:14:00.857Z

## 大小对比

- TypeScript编译器: 292 字节
- WASM编译器: 292 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-expressions.js",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 63
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "subName",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xc",
    "remaining": 219
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-expressions.js",
      "offset": 18
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 63
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "subName",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xc",
    "remaining": 219
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 06 73 75 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...sub.console.l|
00000010: 6f 67 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogT__tests__/fix|
00000020: 74 75 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 65 |tures/function-e|
00000030: 78 70 72 65 73 73 69 6f 6e 73 2e 6a 73 02 61 02 |xpressions.js.a.|
00000040: 62 0e 73 75 62 4e 61 6d 65 0c 00 06 00 a4 01 00 |b.subName.......|
00000050: 01 00 05 00 02 59 01 a6 01 00 00 00 40 6a 00 00 |.....Y......@j..|
00000060: 00 80 40 e4 00 00 00 80 3f 6a 00 00 00 80 3f e4 |..@.....?j....?.|
00000070: 00 00 00 80 c2 00 4f 6a 00 00 00 3b 6a 00 00 00 |......Oj...;j...|
00000080: 39 e5 00 00 00 43 e6 00 00 00 39 6a 00 00 00 ba |9....C....9j....|
00000090: bb f2 24 01 00 cb c2 01 3b e4 00 00 00 39 e5 00 |..$.....;....9..|
000000a0: 00 00 43 e6 00 00 00 39 e4 00 00 00 bf 0a b9 f2 |..C....9........|
000000b0: 24 01 00 cf 28 ce 03 18 00 00 b9 00 1b 0e 1b 0a |$...(...........|
000000c0: 25 06 07 07 00 0b 08 15 1b 0e 1b 0a 2a 06 07 07 |%...........*...|
000000d0: 00 0c 43 06 00 00 02 00 02 02 00 00 04 02 d0 03 |..C.............|
000000e0: 00 01 00 d2 03 00 01 00 d3 d4 9f 28 ce 03 0a 00 |...........(....|
000000f0: 0c 03 01 07 08 07 03 07 11 00 0c 43 06 00 d4 03 |...........C....|
00000100: 02 00 02 02 00 00 04 02 d0 03 00 01 00 d2 03 00 |................|
00000110: 01 00 d3 d4 a0 28 ce 03 0a 04 0c 03 01 07 08 07 |.....(..........|
00000120: 03 07 11 00                                     |....|
```

### WASM
```
00000000: 05 07 06 73 75 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...sub.console.l|
00000010: 6f 67 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogT__tests__/fix|
00000020: 74 75 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 65 |tures/function-e|
00000030: 78 70 72 65 73 73 69 6f 6e 73 2e 6a 73 02 61 02 |xpressions.js.a.|
00000040: 62 0e 73 75 62 4e 61 6d 65 0c 00 06 00 a4 01 00 |b.subName.......|
00000050: 01 00 05 00 02 59 01 a6 01 00 00 00 40 6a 00 00 |.....Y......@j..|
00000060: 00 80 40 e4 00 00 00 80 3f 6a 00 00 00 80 3f e4 |..@.....?j....?.|
00000070: 00 00 00 80 c2 00 4f 6a 00 00 00 3b 6a 00 00 00 |......Oj...;j...|
00000080: 39 e5 00 00 00 43 e6 00 00 00 39 6a 00 00 00 ba |9....C....9j....|
00000090: bb f2 24 01 00 cb c2 01 3b e4 00 00 00 39 e5 00 |..$.....;....9..|
000000a0: 00 00 43 e6 00 00 00 39 e4 00 00 00 bf 0a b9 f2 |..C....9........|
000000b0: 24 01 00 cf 28 ce 03 18 00 00 b9 00 1b 0e 1b 0a |$...(...........|
000000c0: 25 06 07 07 00 0b 08 15 1b 0e 1b 0a 2a 06 07 07 |%...........*...|
000000d0: 00 0c 43 06 00 00 02 00 02 02 00 00 04 02 d0 03 |..C.............|
000000e0: 00 01 00 d2 03 00 01 00 d3 d4 9f 28 ce 03 0a 00 |...........(....|
000000f0: 0c 03 01 07 08 07 03 07 11 00 0c 43 06 00 d4 03 |...........C....|
00000100: 02 00 02 02 00 00 04 02 d0 03 00 01 00 d2 03 00 |................|
00000110: 01 00 d3 d4 a0 28 ce 03 0a 04 0c 03 01 07 08 07 |.....(..........|
00000120: 03 07 11 00                                     |....|
```