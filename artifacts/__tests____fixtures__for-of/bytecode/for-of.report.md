# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-of.ts
**生成时间**: 2026-01-08T03:25:31.855Z

## 大小对比

- TypeScript编译器: 151 字节
- WASM编译器: 151 字节
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 4
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-of.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xc",
    "remaining": 102
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 4
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
      "rawLength": 56,
      "actualLength": 28,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-of.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xc",
    "remaining": 102
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 78 06 61 72 72 0e 63 6f 6e 73 6f 6c 65 |...x.arr.console|
00000010: 06 6c 6f 67 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.log8__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 66 6f 72 2d 6f 66 2e 6a |ixtures/for-of.j|
00000030: 73 0c 00 06 00 a4 01 00 02 00 06 00 00 3e 02 a6 |s............>..|
00000040: 01 00 00 00 c8 03 02 00 30 40 e5 00 00 00 80 3f |........0@.....?|
00000050: e5 00 00 00 80 b8 b9 ba 26 03 00 3b e5 00 00 00 |........&..;....|
00000060: 06 cb 63 01 00 39 e5 00 00 00 7f ee 13 cc 39 e6 |..c..9........9.|
00000070: 00 00 00 43 e7 00 00 00 64 01 00 24 01 00 cb 82 |...C....d..$....|
00000080: 00 ec eb 0e 86 c7 28 d0 03 0c 00 00 8f 20 30 17 |......(...... 0.|
00000090: 1b 0e 1b 0a 11 01 00                            |.......|
```

### WASM
```
00000000: 05 05 02 78 06 61 72 72 0e 63 6f 6e 73 6f 6c 65 |...x.arr.console|
00000010: 06 6c 6f 67 38 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.log8__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 66 6f 72 2d 6f 66 2e 6a |ixtures/for-of.j|
00000030: 73 0c 00 06 00 a4 01 00 02 00 06 00 00 3e 02 a6 |s............>..|
00000040: 01 00 00 00 c8 03 02 00 30 40 e5 00 00 00 80 3f |........0@.....?|
00000050: e5 00 00 00 80 b8 b9 ba 26 03 00 3b e5 00 00 00 |........&..;....|
00000060: 06 cb 63 01 00 39 e5 00 00 00 7f ee 13 cc 39 e6 |..c..9........9.|
00000070: 00 00 00 43 e7 00 00 00 64 01 00 24 01 00 cb 82 |...C....d..$....|
00000080: 00 ec eb 0e 86 c7 28 d0 03 0c 00 00 8f 20 30 17 |......(...... 0.|
00000090: 1b 0e 1b 0a 11 01 00                            |.......|
```