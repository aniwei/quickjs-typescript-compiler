# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/debug-info-basic.ts
**生成时间**: 2025-12-16T14:11:02.483Z

## 大小对比

- TypeScript编译器: 140 字节
- WASM编译器: 140 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/debug-info-basic.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 87
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/fixtures/debug-info-basic.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 87
  }
}
```

## 字节级差异

共发现 14 个字节差异:

- 偏移量 0x7b: TS=0x34 vs WASM=0x1b
- 偏移量 0x7c: TS=0x18 vs WASM=0x0e
- 偏移量 0x7d: TS=0x07 vs WASM=0x20
- 偏移量 0x7e: TS=0x17 vs WASM=0x08
- 偏移量 0x80: TS=0x00 vs WASM=0x15
- 偏移量 0x81: TS=0x34 vs WASM=0x1b
- 偏移量 0x82: TS=0x18 vs WASM=0x0e
- 偏移量 0x83: TS=0x07 vs WASM=0x20
- 偏移量 0x84: TS=0x17 vs WASM=0x08
- 偏移量 0x86: TS=0x00 vs WASM=0x15
- 偏移量 0x87: TS=0x34 vs WASM=0x1b
- 偏移量 0x88: TS=0x18 vs WASM=0x0e
- 偏移量 0x89: TS=0x07 vs WASM=0x20
- 偏移量 0x8a: TS=0x17 vs WASM=0x08

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 4c 5f |...console.logL_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 64 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 |s/debug-info-bas|
00000030: 69 63 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 00 |ic.js...........|
00000040: 00 2e 01 a6 01 00 00 00 39 e4 00 00 00 43 e5 00 |........9....C..|
00000050: 00 00 b8 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 |...$...9....C...|
00000060: 00 b9 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000070: ba 24 01 00 cf 28 cc 03 12 00 00 34 18 07 17 17 |.$...(.....4....|
00000080: 00 34 18 07 17 17 00 34 18 07 17 00             |.4.....4....|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 4c 5f |...console.logL_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 64 65 62 75 67 2d 69 6e 66 6f 2d 62 61 73 |s/debug-info-bas|
00000030: 69 63 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 00 |ic.js...........|
00000040: 00 2e 01 a6 01 00 00 00 39 e4 00 00 00 43 e5 00 |........9....C..|
00000050: 00 00 b8 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 |...$...9....C...|
00000060: 00 b9 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000070: ba 24 01 00 cf 28 cc 03 12 00 00 1b 0e 20 08 17 |.$...(....... ..|
00000080: 15 1b 0e 20 08 17 15 1b 0e 20 08 00             |... ..... ..|
```