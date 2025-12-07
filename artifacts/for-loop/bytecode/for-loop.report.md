# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-loop.ts
**生成时间**: 2025-12-07T12:00:30.330Z

## 大小对比

- TypeScript编译器: 150 字节
- WASM编译器: 150 字节
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 94
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
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 42
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 94
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 6f 6e |or-loop.js.i.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 01 00 03 00 00 2d 01 ca 03 |. ..........-...|
00000050: 02 00 20 08 ec 02 29 63 00 00 b7 cb 64 00 00 ba |.. ...)c....d...|
00000060: a5 ec 1c 39 e6 00 00 00 43 e7 00 00 00 64 00 00 |...9....C....d..|
00000070: 24 01 00 0e 64 00 00 93 65 00 00 0e ee df 06 2f |$...d...e....../|
00000080: c8 03 12 00 00 2f 20 16 04 12 1b 1b 0e 1b 0a 11 |...../ .........|
00000090: 01 15 10 11 02 00                               |......|
```

### WASM
```
00000000: 05 04 4e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..N__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2e 6a 73 02 69 0e 63 6f 6e |or-loop.js.i.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 01 00 03 00 00 2d 01 ca 03 |. ..........-...|
00000050: 02 00 20 08 ec 02 29 63 00 00 b7 cb 64 00 00 ba |.. ...)c....d...|
00000060: a5 ec 1c 39 e6 00 00 00 43 e7 00 00 00 64 00 00 |...9....C....d..|
00000070: 24 01 00 0e 64 00 00 93 65 00 00 0e ee df 06 2f |$...d...e....../|
00000080: c8 03 12 00 00 2f 20 16 04 12 1b 1b 0e 1b 0a 11 |...../ .........|
00000090: 01 15 10 11 02 00                               |......|
```