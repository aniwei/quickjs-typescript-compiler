# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/array-literal.ts
**生成时间**: 2025-12-07T14:47:47.975Z

## 大小对比

- TypeScript编译器: 137 字节
- WASM编译器: 137 字节
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 74
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 74
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6c 69 74 65 72 61 6c 2e 6a 73 06 |rray-literal.js.|
00000030: 61 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |arr.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 01 00 20 00 ca 03 00 0d 08 ec 02 29 b8 b9 ba |... ........)...|
00000060: 26 03 00 e3 39 e6 00 00 00 43 e7 00 00 00 68 00 |&...9....C....h.|
00000070: 00 b8 48 24 01 00 0e 06 2f c8 03 0c 00 00 3a 00 |..H$..../.....:.|
00000080: 1b 0e 1b 0a 16 06 07 07 00                      |.........|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6c 69 74 65 72 61 6c 2e 6a 73 06 |rray-literal.js.|
00000030: 61 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |arr.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 01 00 20 00 ca 03 00 0d 08 ec 02 29 b8 b9 ba |... ........)...|
00000060: 26 03 00 e3 39 e6 00 00 00 43 e7 00 00 00 68 00 |&...9....C....h.|
00000070: 00 b8 48 24 01 00 0e 06 2f c8 03 0c 00 00 3a 00 |..H$..../.....:.|
00000080: 1b 0e 1b 0a 16 06 07 07 00                      |.........|
```