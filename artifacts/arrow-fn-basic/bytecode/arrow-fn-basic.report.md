# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-08T15:56:10.027Z

## 大小对比

- TypeScript编译器: 181 字节
- WASM编译器: 181 字节
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 117
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 117
  }
}
```

## 字节级差异

共发现 8 个字节差异:

- 偏移量 0x84: TS=0x07 vs WASM=0x0e
- 偏移量 0x86: TS=0x05 vs WASM=0x0a
- 偏移量 0x88: TS=0x03 vs WASM=0x06
- 偏移量 0x8a: TS=0x7c vs WASM=0x07
- 偏移量 0xad: TS=0x7f vs WASM=0x01
- 偏移量 0xaf: TS=0x04 vs WASM=0x08
- 偏移量 0xb1: TS=0x7e vs WASM=0x03
- 偏移量 0xb3: TS=0x77 vs WASM=0x11

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 62 |.console.log.a.b|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 05 01 01 22 00 d4 01 00 0d 08 ec 02 29 c2 00 |...."........)..|
00000060: 4f 6a 00 00 00 e3 39 e5 00 00 00 43 e6 00 00 00 |Oj....9....C....|
00000070: 68 00 00 b8 b9 f2 24 01 00 0e 06 2f c8 03 0c 00 |h.....$..../....|
00000080: 00 41 00 1b 07 1b 05 1b 03 07 7c 00 0c 02 06 01 |.A........|.....|
00000090: 00 02 00 02 02 00 00 04 02 ce 03 00 01 00 d0 03 |................|
000000a0: 00 01 00 d3 d4 9f 28 c8 03 0a 00 0c 03 7f 07 04 |......(.........|
000000b0: 07 7e 07 77 00                                  |.~.w.|
```

### WASM
```
00000000: 05 05 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 62 |.console.log.a.b|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 05 01 01 22 00 d4 01 00 0d 08 ec 02 29 c2 00 |...."........)..|
00000060: 4f 6a 00 00 00 e3 39 e5 00 00 00 43 e6 00 00 00 |Oj....9....C....|
00000070: 68 00 00 b8 b9 f2 24 01 00 0e 06 2f c8 03 0c 00 |h.....$..../....|
00000080: 00 41 00 1b 0e 1b 0a 1b 06 07 07 00 0c 02 06 01 |.A..............|
00000090: 00 02 00 02 02 00 00 04 02 ce 03 00 01 00 d0 03 |................|
000000a0: 00 01 00 d3 d4 9f 28 c8 03 0a 00 0c 03 01 07 08 |......(.........|
000000b0: 07 03 07 11 00                                  |.....|
```