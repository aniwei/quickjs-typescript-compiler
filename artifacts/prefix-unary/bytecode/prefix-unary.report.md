# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/prefix-unary.ts
**生成时间**: 2025-12-09T04:25:00.346Z

## 大小对比

- TypeScript编译器: 189 字节
- WASM编译器: 189 字节
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/prefix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 129
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/prefix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 129
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 65 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 61 |refix-unary.js.a|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 |..... ..........|
00000050: 45 00 ca 03 00 09 08 ec 02 29 b8 e3 39 e6 00 00 |E........)..9...|
00000060: 00 43 e7 00 00 00 68 00 00 91 11 69 00 00 24 01 |.C....h....i..$.|
00000070: 00 0e 39 e6 00 00 00 43 e7 00 00 00 68 00 00 90 |..9....C....h...|
00000080: 11 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 |.i..$...9....C..|
00000090: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 1e 00 00 |..h..$..../.....|
000000a0: 21 00 1b 0e 1b 0e 11 03 1b 01 17 15 1b 0e 1b 0e |!...............|
000000b0: 11 03 1b 01 17 15 1b 0e 1b 0a 11 01 00          |.............|
```

### WASM
```
00000000: 05 04 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 65 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 61 |refix-unary.js.a|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 |..... ..........|
00000050: 45 00 ca 03 00 09 08 ec 02 29 b8 e3 39 e6 00 00 |E........)..9...|
00000060: 00 43 e7 00 00 00 68 00 00 91 11 69 00 00 24 01 |.C....h....i..$.|
00000070: 00 0e 39 e6 00 00 00 43 e7 00 00 00 68 00 00 90 |..9....C....h...|
00000080: 11 69 00 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 |.i..$...9....C..|
00000090: 00 00 68 00 00 24 01 00 0e 06 2f c8 03 1e 00 00 |..h..$..../.....|
000000a0: 21 00 1b 0e 1b 0e 11 03 1b 01 17 15 1b 0e 1b 0e |!...............|
000000b0: 11 03 1b 01 17 15 1b 0e 1b 0a 11 01 00          |.............|
```