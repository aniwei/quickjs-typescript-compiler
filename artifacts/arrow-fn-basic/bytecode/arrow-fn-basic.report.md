# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-09T08:59:51.343Z

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

共发现 24 个字节差异:

- 偏移量 0x5c: TS=0x1e vs WASM=0x02
- 偏移量 0x5d: TS=0xc2 vs WASM=0x29
- 偏移量 0x5e: TS=0x00 vs WASM=0xc2
- 偏移量 0x5f: TS=0x4f vs WASM=0x00
- 偏移量 0x60: TS=0x6a vs WASM=0x4f
- 偏移量 0x61: TS=0x00 vs WASM=0x6a
- 偏移量 0x64: TS=0xe3 vs WASM=0x00
- 偏移量 0x65: TS=0x39 vs WASM=0xe3
- 偏移量 0x66: TS=0xe5 vs WASM=0x39
- 偏移量 0x67: TS=0x00 vs WASM=0xe5
- 偏移量 0x6a: TS=0x43 vs WASM=0x00
- 偏移量 0x6b: TS=0xe6 vs WASM=0x43
- 偏移量 0x6c: TS=0x00 vs WASM=0xe6
- 偏移量 0x6f: TS=0x68 vs WASM=0x00
- 偏移量 0x70: TS=0x00 vs WASM=0x68
- 偏移量 0x72: TS=0xb8 vs WASM=0x00
- 偏移量 0x73: TS=0xb9 vs WASM=0xb8
- 偏移量 0x74: TS=0xf2 vs WASM=0xb9
- 偏移量 0x75: TS=0x24 vs WASM=0xf2
- 偏移量 0x76: TS=0x01 vs WASM=0x24
- ... (显示前20个差异，总共24个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 62 |.console.log.a.b|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 05 01 01 22 00 d4 01 00 0d 08 ec 1e c2 00 4f |...."..........O|
00000060: 6a 00 00 00 e3 39 e5 00 00 00 43 e6 00 00 00 68 |j....9....C....h|
00000070: 00 00 b8 b9 f2 24 01 00 0e 29 06 2f c8 03 0c 00 |.....$...)./....|
00000080: 00 3c 00 1b 0e 1b 0a 1b 06 07 07 00 0c 02 06 01 |.<..............|
00000090: 00 02 00 02 02 00 00 04 02 ce 03 00 01 00 d0 03 |................|
000000a0: 00 01 00 d3 d4 9f 28 c8 03 0a 00 0c 03 01 07 08 |......(.........|
000000b0: 07 03 07 11 00                                  |.....|
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