# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/exponentiation-ops.ts
**生成时间**: 2026-01-08T03:25:31.800Z

## 大小对比

- TypeScript编译器: 164 字节
- WASM编译器: 164 字节
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/exponentiation-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 109
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/exponentiation-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 109
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 50 5f |...console.logP_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 65 78 70 6f 6e 65 6e 74 69 61 74 69 6f 6e |s/exponentiation|
00000030: 2d 6f 70 73 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |-ops.js.........|
00000040: 05 00 00 38 01 a6 01 00 00 00 39 e4 00 00 00 43 |...8......9....C|
00000050: e5 00 00 00 b9 ba a1 24 01 00 cb 39 e4 00 00 00 |.......$...9....|
00000060: 43 e5 00 00 00 b9 ba b9 a1 a1 24 01 00 cb 39 e4 |C.........$...9.|
00000070: 00 00 00 43 e5 00 00 00 b9 ba a1 b9 a1 24 01 00 |...C.........$..|
00000080: cf 28 cc 03 1e 00 00 03 00 1b 0e 25 0e 07 05 17 |.(.........%....|
00000090: 15 1b 0e 2a 1a 07 0b 07 05 17 15 1b 0e 25 10 0c |...*.........%..|
000000a0: 0c 07 13 00                                     |....|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 50 5f |...console.logP_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 65 78 70 6f 6e 65 6e 74 69 61 74 69 6f 6e |s/exponentiation|
00000030: 2d 6f 70 73 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |-ops.js.........|
00000040: 05 00 00 38 01 a6 01 00 00 00 39 e4 00 00 00 43 |...8......9....C|
00000050: e5 00 00 00 b9 ba a1 24 01 00 cb 39 e4 00 00 00 |.......$...9....|
00000060: 43 e5 00 00 00 b9 ba b9 a1 a1 24 01 00 cb 39 e4 |C.........$...9.|
00000070: 00 00 00 43 e5 00 00 00 b9 ba a1 b9 a1 24 01 00 |...C.........$..|
00000080: cf 28 cc 03 1e 00 00 03 00 1b 0e 25 0e 07 05 17 |.(.........%....|
00000090: 15 1b 0e 2a 1a 07 0b 07 05 17 15 1b 0e 25 10 0c |...*.........%..|
000000a0: 0c 07 13 00                                     |....|
```