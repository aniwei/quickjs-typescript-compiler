# 字节码分析报告

**输入文件**: __tests__/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-22T07:09:51.438Z

## 大小对比

- TypeScript编译器: 178 字节
- WASM编译器: 178 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-basic.js",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 123
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/arrow-fn-basic.js",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 123
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 48 5f |...console.logH_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 |s/arrow-fn-basic|
00000030: 2e 6a 73 02 61 02 62 0c 00 06 00 a4 01 00 01 00 |.js.a.b.........|
00000040: 05 00 01 2f 01 a6 01 00 00 00 40 6a 00 00 00 80 |.../......@j....|
00000050: 3f 6a 00 00 00 80 c2 00 4f 6a 00 00 00 3b 6a 00 |?j......Oj...;j.|
00000060: 00 00 39 e4 00 00 00 43 e5 00 00 00 39 6a 00 00 |..9....C....9j..|
00000070: 00 b8 b9 f2 24 01 00 cf 28 cc 03 0c 00 00 7d 00 |....$...(.....}.|
00000080: 1b 0e 1b 0a 25 06 07 07 00 0c 02 06 00 00 02 00 |....%...........|
00000090: 02 02 00 00 04 02 ce 03 00 01 00 d0 03 00 01 00 |................|
000000a0: d3 d4 9f 28 cc 03 0a 00 0c 03 01 07 08 07 03 07 |...(............|
000000b0: 11 00                                           |..|
```

### WASM
```
00000000: 05 05 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 48 5f |...console.logH_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 |s/arrow-fn-basic|
00000030: 2e 6a 73 02 61 02 62 0c 00 06 00 a4 01 00 01 00 |.js.a.b.........|
00000040: 05 00 01 2f 01 a6 01 00 00 00 40 6a 00 00 00 80 |.../......@j....|
00000050: 3f 6a 00 00 00 80 c2 00 4f 6a 00 00 00 3b 6a 00 |?j......Oj...;j.|
00000060: 00 00 39 e4 00 00 00 43 e5 00 00 00 39 6a 00 00 |..9....C....9j..|
00000070: 00 b8 b9 f2 24 01 00 cf 28 cc 03 0c 00 00 7d 00 |....$...(.....}.|
00000080: 1b 0e 1b 0a 25 06 07 07 00 0c 02 06 00 00 02 00 |....%...........|
00000090: 02 02 00 00 04 02 ce 03 00 01 00 d0 03 00 01 00 |................|
000000a0: d3 d4 9f 28 cc 03 0a 00 0c 03 01 07 08 07 03 07 |...(............|
000000b0: 11 00                                           |..|
```