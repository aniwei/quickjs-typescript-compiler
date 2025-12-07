# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-07T03:50:04.752Z

## 大小对比

- TypeScript编译器: 170 字节
- WASM编译器: 181 字节
- 差异: -11 字节 (-6.08%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 106
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

共发现 89 个字节差异:

- 偏移量 0x30: TS=0x02 vs WASM=0x0e
- 偏移量 0x31: TS=0x61 vs WASM=0x63
- 偏移量 0x32: TS=0x02 vs WASM=0x6f
- 偏移量 0x33: TS=0x62 vs WASM=0x6e
- 偏移量 0x34: TS=0x0e vs WASM=0x73
- 偏移量 0x35: TS=0x63 vs WASM=0x6f
- 偏移量 0x36: TS=0x6f vs WASM=0x6c
- 偏移量 0x37: TS=0x6e vs WASM=0x65
- 偏移量 0x38: TS=0x73 vs WASM=0x06
- 偏移量 0x39: TS=0x6f vs WASM=0x6c
- 偏移量 0x3a: TS=0x6c vs WASM=0x6f
- 偏移量 0x3b: TS=0x65 vs WASM=0x67
- 偏移量 0x3c: TS=0x06 vs WASM=0x02
- 偏移量 0x3d: TS=0x6c vs WASM=0x61
- 偏移量 0x3e: TS=0x6f vs WASM=0x02
- 偏移量 0x3f: TS=0x67 vs WASM=0x62
- 偏移量 0x54: TS=0x1d vs WASM=0x22
- 偏移量 0x60: TS=0xe3 vs WASM=0x4f
- 偏移量 0x61: TS=0x39 vs WASM=0x6a
- 偏移量 0x62: TS=0xe7 vs WASM=0x00
- ... (显示前20个差异，总共89个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |.a.b.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 05 01 01 1d 00 d4 01 00 0d 08 ec 02 29 c2 00 |.............)..|
00000060: e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 b8 b9 |.9....C....h....|
00000070: f2 24 01 00 0e 06 2f c8 03 0c 00 00 28 00 1b 0e |.$..../.....(...|
00000080: 1b 0a 1b 06 07 07 00 0c 02 04 01 02 02 00 02 02 |................|
00000090: 00 00 04 02 ca 03 00 01 00 cc 03 00 01 00 d3 d4 |................|
000000a0: 9f 28 c8 03 04 00 00 0d 1a 00                   |.(........|
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