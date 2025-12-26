# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/compute.ts
**生成时间**: 2025-12-26T13:00:17.753Z

## 大小对比

- TypeScript编译器: 127 字节
- WASM编译器: 127 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compute.js",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 83
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compute.js",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 83
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0e 63 6f 6d 70 75 74 65 3a 5f 5f 74 65 73 |...compute:__tes|
00000010: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000020: 6d 70 75 74 65 2e 6a 73 02 61 02 62 0c 00 06 00 |mpute.js.a.b....|
00000030: a4 01 00 01 00 01 00 01 10 01 a6 01 00 00 00 40 |...............@|
00000040: e4 00 00 00 40 c2 00 41 e4 00 00 00 00 c7 28 ca |....@..A......(.|
00000050: 03 02 00 00 00 0c 43 06 00 c8 03 02 00 02 02 00 |......C.........|
00000060: 00 04 02 cc 03 00 01 00 ce 03 00 01 00 d3 d4 9f |................|
00000070: 28 ca 03 0a 00 00 03 12 07 08 07 03 07 11 00    |(..............|
```

### WASM
```
00000000: 05 04 0e 63 6f 6d 70 75 74 65 3a 5f 5f 74 65 73 |...compute:__tes|
00000010: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000020: 6d 70 75 74 65 2e 6a 73 02 61 02 62 0c 00 06 00 |mpute.js.a.b....|
00000030: a4 01 00 01 00 01 00 01 10 01 a6 01 00 00 00 40 |...............@|
00000040: e4 00 00 00 40 c2 00 41 e4 00 00 00 00 c7 28 ca |....@..A......(.|
00000050: 03 02 00 00 00 0c 43 06 00 c8 03 02 00 02 02 00 |......C.........|
00000060: 00 04 02 cc 03 00 01 00 ce 03 00 01 00 d3 d4 9f |................|
00000070: 28 ca 03 0a 00 00 03 12 07 08 07 03 07 11 00    |(..............|
```