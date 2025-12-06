# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/variable-hoisting.ts
**生成时间**: 2025-12-06T02:09:56.559Z

## 大小对比

- TypeScript编译器: 178 字节
- WASM编译器: 183 字节
- 差异: -5 字节 (-2.73%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/variable-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hoistedVar",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    },
    {
      "index": 4,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "I am defined later",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 85
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/variable-hoisting.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hoistedVar",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    },
    {
      "index": 4,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "I am defined later",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 93,
    "tag": "0xd",
    "remaining": 90
  }
}
```

## 字节级差异

共发现 44 个字节差异:

- 偏移量 0x71: TS=0x2e vs WASM=0x2a
- 偏移量 0x85: TS=0x39 vs WASM=0xdf
- 偏移量 0x86: TS=0xe5 vs WASM=0x24
- 偏移量 0x87: TS=0x00 vs WASM=0x01
- 偏移量 0x89: TS=0x00 vs WASM=0x0e
- 偏移量 0x8a: TS=0x24 vs WASM=0x04
- 偏移量 0x8b: TS=0x01 vs WASM=0xe8
- 偏移量 0x8d: TS=0x0e vs WASM=0x00
- 偏移量 0x8e: TS=0x04 vs WASM=0x00
- 偏移量 0x8f: TS=0xe8 vs WASM=0xe3
- 偏移量 0x90: TS=0x00 vs WASM=0x39
- 偏移量 0x91: TS=0x00 vs WASM=0xe6
- 偏移量 0x93: TS=0xe3 vs WASM=0x00
- 偏移量 0x94: TS=0x39 vs WASM=0x00
- 偏移量 0x95: TS=0xe6 vs WASM=0x43
- 偏移量 0x96: TS=0x00 vs WASM=0xe7
- 偏移量 0x99: TS=0x43 vs WASM=0x00
- 偏移量 0x9a: TS=0xe7 vs WASM=0xdf
- 偏移量 0x9b: TS=0x00 vs WASM=0x24
- 偏移量 0x9c: TS=0x00 vs WASM=0x01
- ... (显示前20个差异，总共44个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 2d 68 6f 69 73 74 69 6e 67 |ariable-hoisting|
00000030: 2e 6a 73 14 68 6f 69 73 74 65 64 56 61 72 0e 63 |.js.hoistedVar.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 24 49 20 61 6d 20 |onsole.log$I am |
00000050: 64 65 66 69 6e 65 64 20 6c 61 74 65 72 0d c8 03 |defined later...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 |...... .........|
00000070: 00 2e 00 ca 03 00 01 08 ec 02 29 39 e6 00 00 00 |..........)9....|
00000080: 43 e7 00 00 00 39 e5 00 00 00 24 01 00 0e 04 e8 |C....9....$.....|
00000090: 00 00 00 e3 39 e6 00 00 00 43 e7 00 00 00 df 24 |....9....C.....$|
000000a0: 01 00 0e 06 2f c8 03 00 08 17 00 34 0c 30 05 21 |..../......4.0.!|
000000b0: 6f 00                                           |o.|
```

### WASM
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 2d 68 6f 69 73 74 69 6e 67 |ariable-hoisting|
00000030: 2e 6a 73 14 68 6f 69 73 74 65 64 56 61 72 0e 63 |.js.hoistedVar.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 24 49 20 61 6d 20 |onsole.log$I am |
00000050: 64 65 66 69 6e 65 64 20 6c 61 74 65 72 0d c8 03 |defined later...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 01 |...... .........|
00000070: 00 2a 00 ca 03 00 01 08 ec 02 29 39 e6 00 00 00 |.*........)9....|
00000080: 43 e7 00 00 00 df 24 01 00 0e 04 e8 00 00 00 e3 |C.....$.........|
00000090: 39 e6 00 00 00 43 e7 00 00 00 df 24 01 00 0e 06 |9....C.....$....|
000000a0: 2f c8 03 12 00 00 17 00 1b 0e 1b 0a 07 01 36 15 |/.............6.|
000000b0: 1b 0e 1b 0a 07 01 00                            |.......|
```