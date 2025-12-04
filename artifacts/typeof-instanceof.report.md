# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/typeof-instanceof.ts
**生成时间**: 2025-12-02T17:07:51.349Z

## 大小对比

- TypeScript编译器: 165 字节
- WASM编译器: 165 字节
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/typeof-instanceof.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ti_a",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 97
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/typeof-instanceof.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ti_a",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 97
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 79 70 65 6f 66 2d 69 6e 73 74 61 6e 63 65 6f 66 |ypeof-instanceof|
00000030: 2e 6a 73 08 74 69 5f 61 0e 63 6f 6e 73 6f 6c 65 |.js.ti_a.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 04 01 00 2d 00 ca 03 00 01 08 ec |........-.......|
00000060: 02 29 0b e3 39 e6 00 00 00 43 e7 00 00 00 df 99 |.)..9....C......|
00000070: 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 00 df 39 |$...9....C.....9|
00000080: 9d 00 00 00 a9 24 01 00 0e 06 2f c8 03 16 00 00 |.....$..../.....|
00000090: 21 00 1b 0e 1b 18 0c 0f 17 15 1b 0e 1b 0a 07 20 |!.............. |
000000a0: 1b 15 07 0b 00                                  |.....|
```

### WASM
```
00000000: 05 04 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 79 70 65 6f 66 2d 69 6e 73 74 61 6e 63 65 6f 66 |ypeof-instanceof|
00000030: 2e 6a 73 08 74 69 5f 61 0e 63 6f 6e 73 6f 6c 65 |.js.ti_a.console|
00000040: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000050: a4 01 00 00 00 04 01 00 2d 00 ca 03 00 01 08 ec |........-.......|
00000060: 02 29 0b e3 39 e6 00 00 00 43 e7 00 00 00 df 99 |.)..9....C......|
00000070: 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 00 df 39 |$...9....C.....9|
00000080: 9d 00 00 00 a9 24 01 00 0e 06 2f c8 03 16 00 00 |.....$..../.....|
00000090: 21 00 1b 0e 1b 18 0c 0f 17 15 1b 0e 1b 0a 07 20 |!.............. |
000000a0: 1b 15 07 0b 00                                  |.....|
```