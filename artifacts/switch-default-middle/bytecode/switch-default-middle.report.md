# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/switch-default-middle.ts
**生成时间**: 2025-12-07T19:06:52.725Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 190 字节
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 121
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-default-middle.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 64 65 66 61 75 6c 74 2d 6d 69 |witch-default-mi|
00000030: 64 64 6c 65 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c |ddle.js.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 01 00 45 00 ca 03 00 09 08 |.........E......|
00000060: ec 02 29 b7 e3 68 00 00 11 b7 ad ec 21 39 e6 00 |..)..h......!9..|
00000070: 00 00 43 e7 00 00 00 b7 24 01 00 0e 39 e6 00 00 |..C.....$...9...|
00000080: 00 43 e7 00 00 00 b9 24 01 00 0e ee 06 11 b8 ad |.C.....$........|
00000090: ec eb 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 |..9....C.....$..|
000000a0: 0e 0e 06 2f c8 03 16 00 00 21 10 2c 00 1b 0e 20 |.../.....!.,... |
000000b0: 08 18 15 1b 0e 20 08 3b 15 1b 0e 20 08 00       |..... .;... ..|
```

### WASM
```
00000000: 05 04 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 64 65 66 61 75 6c 74 2d 6d 69 |witch-default-mi|
00000030: 64 64 6c 65 2e 6a 73 02 61 0e 63 6f 6e 73 6f 6c |ddle.js.a.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 01 00 45 00 ca 03 00 09 08 |.........E......|
00000060: ec 02 29 b7 e3 68 00 00 11 b7 ad ec 21 39 e6 00 |..)..h......!9..|
00000070: 00 00 43 e7 00 00 00 b7 24 01 00 0e 39 e6 00 00 |..C.....$...9...|
00000080: 00 43 e7 00 00 00 b9 24 01 00 0e ee 06 11 b8 ad |.C.....$........|
00000090: ec eb 39 e6 00 00 00 43 e7 00 00 00 b8 24 01 00 |..9....C.....$..|
000000a0: 0e 0e 06 2f c8 03 16 00 00 21 10 2c 00 1b 0e 20 |.../.....!.,... |
000000b0: 08 18 15 1b 0e 20 08 3b 15 1b 0e 20 08 00       |..... .;... ..|
```