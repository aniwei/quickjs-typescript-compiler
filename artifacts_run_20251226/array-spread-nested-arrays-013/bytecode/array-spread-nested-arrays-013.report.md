# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-spread-nested-arrays-013.ts
**生成时间**: 2025-12-25T17:50:59.742Z

## 大小对比

- TypeScript编译器: 216 字节
- WASM编译器: 216 字节
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-spread-nested-arrays-013.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xc",
    "remaining": 145
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-spread-nested-arrays-013.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xc",
    "remaining": 145
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 68 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogh__tests__/fix|
00000020: 74 75 72 65 73 2f 61 72 72 61 79 2d 73 70 72 65 |tures/array-spre|
00000030: 61 64 2d 6e 65 73 74 65 64 2d 61 72 72 61 79 73 |ad-nested-arrays|
00000040: 2d 30 31 33 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |-013.js.........|
00000050: 06 00 00 62 01 a6 01 00 00 00 40 e4 00 00 00 80 |...b......@.....|
00000060: 40 e5 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 |@.....?.....?...|
00000070: 00 80 b8 b9 26 02 00 3b e4 00 00 00 b7 26 01 00 |....&..;.....&..|
00000080: b8 39 e4 00 00 00 54 bf 0d be 9e 53 91 ba bb 26 |.9....T....S...&|
00000090: 02 00 54 0e 3b e5 00 00 00 39 e6 00 00 00 43 e7 |..T.;....9....C.|
000000a0: 00 00 00 39 e5 00 00 00 eb 39 e5 00 00 00 b9 48 |...9.....9.....H|
000000b0: 39 e5 00 00 00 ba 48 24 03 00 cf 28 d0 03 18 00 |9.....H$...(....|
000000c0: 00 c7 22 2f 0c 4e 2d 1b 0e 1b 0a 1b 02 07 12 20 |.."/.N-........ |
000000d0: 02 07 0a 20 02 07 23 00                         |... ..#.|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 68 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogh__tests__/fix|
00000020: 74 75 72 65 73 2f 61 72 72 61 79 2d 73 70 72 65 |tures/array-spre|
00000030: 61 64 2d 6e 65 73 74 65 64 2d 61 72 72 61 79 73 |ad-nested-arrays|
00000040: 2d 30 31 33 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |-013.js.........|
00000050: 06 00 00 62 01 a6 01 00 00 00 40 e4 00 00 00 80 |...b......@.....|
00000060: 40 e5 00 00 00 80 3f e4 00 00 00 80 3f e5 00 00 |@.....?.....?...|
00000070: 00 80 b8 b9 26 02 00 3b e4 00 00 00 b7 26 01 00 |....&..;.....&..|
00000080: b8 39 e4 00 00 00 54 bf 0d be 9e 53 91 ba bb 26 |.9....T....S...&|
00000090: 02 00 54 0e 3b e5 00 00 00 39 e6 00 00 00 43 e7 |..T.;....9....C.|
000000a0: 00 00 00 39 e5 00 00 00 eb 39 e5 00 00 00 b9 48 |...9.....9.....H|
000000b0: 39 e5 00 00 00 ba 48 24 03 00 cf 28 d0 03 18 00 |9.....H$...(....|
000000c0: 00 c7 22 2f 0c 4e 2d 1b 0e 1b 0a 1b 02 07 12 20 |.."/.N-........ |
000000d0: 02 07 0a 20 02 07 23 00                         |... ..#.|
```