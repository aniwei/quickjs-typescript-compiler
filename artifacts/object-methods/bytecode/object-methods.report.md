# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-methods.ts
**生成时间**: 2026-01-03T04:40:38.717Z

## 大小对比

- TypeScript编译器: 206 字节
- WASM编译器: 206 字节
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-methods.js",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 147
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-methods.js",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 147
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 |...obj.x.console|
00000010: 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logH__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6d |ixtures/object-m|
00000030: 65 74 68 6f 64 73 2e 6a 73 02 79 0c 00 06 00 a4 |ethods.js.y.....|
00000040: 01 00 01 00 05 00 01 3d 01 a6 01 00 00 00 40 e4 |.......=......@.|
00000050: 00 00 00 80 3f e4 00 00 00 80 0b b8 4e e5 00 00 |....?.......N...|
00000060: 00 c2 00 56 6a 00 00 00 04 3b e4 00 00 00 39 e6 |...Vj....;....9.|
00000070: 00 00 00 43 e7 00 00 00 39 e4 00 00 00 43 6a 00 |...C....9....Cj.|
00000080: 00 00 b9 24 01 00 24 01 00 cf 28 d0 03 10 00 00 |...$..$...(.....|
00000090: 00 20 0c 00 1b 0e 1b 0a 1b 06 20 08 11 0f 00 0c |. ........ .....|
000000a0: 42 07 00 00 01 01 01 02 00 00 0b 02 d2 03 00 01 |B...............|
000000b0: 00 10 00 01 00 08 cb c7 42 e5 00 00 00 d3 9f 28 |........B......(|
000000c0: d0 03 0a 02 04 12 1e 1b 0a 07 03 07 1b 00       |..............|
```

### WASM
```
00000000: 05 06 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 |...obj.x.console|
00000010: 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logH__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6d |ixtures/object-m|
00000030: 65 74 68 6f 64 73 2e 6a 73 02 79 0c 00 06 00 a4 |ethods.js.y.....|
00000040: 01 00 01 00 05 00 01 3d 01 a6 01 00 00 00 40 e4 |.......=......@.|
00000050: 00 00 00 80 3f e4 00 00 00 80 0b b8 4e e5 00 00 |....?.......N...|
00000060: 00 c2 00 56 6a 00 00 00 04 3b e4 00 00 00 39 e6 |...Vj....;....9.|
00000070: 00 00 00 43 e7 00 00 00 39 e4 00 00 00 43 6a 00 |...C....9....Cj.|
00000080: 00 00 b9 24 01 00 24 01 00 cf 28 d0 03 10 00 00 |...$..$...(.....|
00000090: 00 20 0c 00 1b 0e 1b 0a 1b 06 20 08 11 0f 00 0c |. ........ .....|
000000a0: 42 07 00 00 01 01 01 02 00 00 0b 02 d2 03 00 01 |B...............|
000000b0: 00 10 00 01 00 08 cb c7 42 e5 00 00 00 d3 9f 28 |........B......(|
000000c0: d0 03 0a 02 04 12 1e 1b 0a 07 03 07 1b 00       |..............|
```