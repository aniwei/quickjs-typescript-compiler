# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/bitwise-ops.ts
**生成时间**: 2026-01-07T15:35:35.302Z

## 大小对比

- TypeScript编译器: 222 字节
- WASM编译器: 222 字节
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bitwise-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 48,
    "tag": "0xc",
    "remaining": 174
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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/bitwise-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 48,
    "tag": "0xc",
    "remaining": 174
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 42 5f |...console.logB_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 62 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 |s/bitwise-ops.js|
00000030: 0c 00 06 00 a4 01 00 01 00 04 00 00 67 01 a6 01 |............g...|
00000040: 00 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 b9 af |...9....C.......|
00000050: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 b9 |$...9....C......|
00000060: b1 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 |.$...9....C.....|
00000070: b9 b0 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000080: b8 b9 a2 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 |...$...9....C...|
00000090: 00 b8 b9 a3 24 01 00 cb 39 e4 00 00 00 43 e5 00 |....$...9....C..|
000000a0: 00 00 b8 b9 a4 24 01 00 cf 28 cc 03 30 00 00 1b |.....$...(..0...|
000000b0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b |.%.......%......|
000000c0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b |.%.......%......|
000000d0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 00       |.%.......%....|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 42 5f |...console.logB_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 62 69 74 77 69 73 65 2d 6f 70 73 2e 6a 73 |s/bitwise-ops.js|
00000030: 0c 00 06 00 a4 01 00 01 00 04 00 00 67 01 a6 01 |............g...|
00000040: 00 00 00 39 e4 00 00 00 43 e5 00 00 00 b8 b9 af |...9....C.......|
00000050: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 b9 |$...9....C......|
00000060: b1 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 b8 |.$...9....C.....|
00000070: b9 b0 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 |..$...9....C....|
00000080: b8 b9 a2 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 |...$...9....C...|
00000090: 00 b8 b9 a3 24 01 00 cb 39 e4 00 00 00 43 e5 00 |....$...9....C..|
000000a0: 00 00 b8 b9 a4 24 01 00 cf 28 cc 03 30 00 00 1b |.....$...(..0...|
000000b0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b |.%.......%......|
000000c0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b |.%.......%......|
000000d0: 0e 25 0e 07 05 17 15 1b 0e 25 0e 07 05 00       |.%.......%....|
```