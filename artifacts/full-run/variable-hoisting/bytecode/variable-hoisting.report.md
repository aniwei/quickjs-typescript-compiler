# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/variable-hoisting.ts
**生成时间**: 2025-12-04T06:33:09.871Z

## 大小对比

- TypeScript编译器: 194 字节
- WASM编译器: 183 字节
- 差异: 11 字节 (6.01%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hoistedVar",
      "offset": 63
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
    "remaining": 101
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

共发现 89 个字节差异:

- 偏移量 0x33: TS=0x0e vs WASM=0x14
- 偏移量 0x34: TS=0x63 vs WASM=0x68
- 偏移量 0x36: TS=0x6e vs WASM=0x69
- 偏移量 0x38: TS=0x6f vs WASM=0x74
- 偏移量 0x39: TS=0x6c vs WASM=0x65
- 偏移量 0x3a: TS=0x65 vs WASM=0x64
- 偏移量 0x3b: TS=0x06 vs WASM=0x56
- 偏移量 0x3c: TS=0x6c vs WASM=0x61
- 偏移量 0x3d: TS=0x6f vs WASM=0x72
- 偏移量 0x3e: TS=0x67 vs WASM=0x0e
- 偏移量 0x3f: TS=0x14 vs WASM=0x63
- 偏移量 0x40: TS=0x68 vs WASM=0x6f
- 偏移量 0x41: TS=0x6f vs WASM=0x6e
- 偏移量 0x42: TS=0x69 vs WASM=0x73
- 偏移量 0x43: TS=0x73 vs WASM=0x6f
- 偏移量 0x44: TS=0x74 vs WASM=0x6c
- 偏移量 0x46: TS=0x64 vs WASM=0x06
- 偏移量 0x47: TS=0x56 vs WASM=0x6c
- 偏移量 0x48: TS=0x61 vs WASM=0x6f
- 偏移量 0x49: TS=0x72 vs WASM=0x67
- ... (显示前20个差异，总共89个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 76 |piler/fixtures/v|
00000020: 61 72 69 61 62 6c 65 2d 68 6f 69 73 74 69 6e 67 |ariable-hoisting|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 14 |.js.console.log.|
00000040: 68 6f 69 73 74 65 64 56 61 72 24 49 20 61 6d 20 |hoistedVar$I am |
00000050: 64 65 66 69 6e 65 64 20 6c 61 74 65 72 0d c8 03 |defined later...|
00000060: 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 |...... .........|
00000070: 00 30 01 ce 03 01 00 20 ce 03 00 01 08 ec 02 29 |.0..... .......)|
00000080: 39 e5 00 00 00 43 e6 00 00 00 39 e7 00 00 00 24 |9....C....9....$|
00000090: 01 00 0e 04 e8 00 00 00 e3 39 e5 00 00 00 43 e6 |.........9....C.|
000000a0: 00 00 00 5a 00 00 24 01 00 0e 06 2f c8 03 12 00 |...Z..$..../....|
000000b0: 00 17 00 1b 0e 1b 0a 1b 01 36 15 1b 0e 1b 0a 11 |.........6......|
000000c0: 01 00                                           |..|
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