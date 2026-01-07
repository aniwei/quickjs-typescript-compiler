# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/exponentiation-assignment.ts
**生成时间**: 2026-01-07T07:07:35.932Z

## 大小对比

- TypeScript编译器: 153 字节
- WASM编译器: 153 字节
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
      "string": "x",
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/exponentiation-assignment.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 89
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
      "string": "x",
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/exponentiation-assignment.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 89
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...x.console.log|
00000010: 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |^__tests__/fixtu|
00000020: 72 65 73 2f 65 78 70 6f 6e 65 6e 74 69 61 74 69 |res/exponentiati|
00000030: 6f 6e 2d 61 73 73 69 67 6e 6d 65 6e 74 2e 6a 73 |on-assignment.js|
00000040: 0c 00 06 00 a4 01 00 01 00 03 00 00 34 01 a6 01 |............4...|
00000050: 00 00 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b9 |...@.....?......|
00000060: 3b e4 00 00 00 39 e4 00 00 00 ba a1 11 3a e4 00 |;....9.......:..|
00000070: 00 00 cb 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 |...9....C....9..|
00000080: 00 00 24 01 00 cf 28 ce 03 0e 00 00 5e 00 20 04 |..$...(.....^. .|
00000090: 2b 03 1b 0e 1b 0a 1b 01 00                      |+........|
```

### WASM
```
00000000: 05 04 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...x.console.log|
00000010: 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |^__tests__/fixtu|
00000020: 72 65 73 2f 65 78 70 6f 6e 65 6e 74 69 61 74 69 |res/exponentiati|
00000030: 6f 6e 2d 61 73 73 69 67 6e 6d 65 6e 74 2e 6a 73 |on-assignment.js|
00000040: 0c 00 06 00 a4 01 00 01 00 03 00 00 34 01 a6 01 |............4...|
00000050: 00 00 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b9 |...@.....?......|
00000060: 3b e4 00 00 00 39 e4 00 00 00 ba a1 11 3a e4 00 |;....9.......:..|
00000070: 00 00 cb 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 |...9....C....9..|
00000080: 00 00 24 01 00 cf 28 ce 03 0e 00 00 5e 00 20 04 |..$...(.....^. .|
00000090: 2b 03 1b 0e 1b 0a 1b 01 00                      |+........|
```