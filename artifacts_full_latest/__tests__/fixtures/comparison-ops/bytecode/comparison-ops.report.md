# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/comparison-ops.ts
**生成时间**: 2026-01-03T05:23:09.448Z

## 大小对比

- TypeScript编译器: 276 字节
- WASM编译器: 276 字节
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/comparison-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 225
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/comparison-ops.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 225
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 48 5f |...console.logH_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 63 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 73 |s/comparison-ops|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 89 |.js.............|
00000040: 01 01 a6 01 00 00 00 39 e4 00 00 00 43 e5 00 00 |.......9....C...|
00000050: 00 b8 b9 a5 24 01 00 cb 39 e4 00 00 00 43 e5 00 |....$...9....C..|
00000060: 00 00 b8 b9 a7 24 01 00 cb 39 e4 00 00 00 43 e5 |.....$...9....C.|
00000070: 00 00 00 b8 b9 a6 24 01 00 cb 39 e4 00 00 00 43 |......$...9....C|
00000080: e5 00 00 00 b8 b9 a8 24 01 00 cb 39 e4 00 00 00 |.......$...9....|
00000090: 43 e5 00 00 00 b8 b9 ab 24 01 00 cb 39 e4 00 00 |C.......$...9...|
000000a0: 00 43 e5 00 00 00 b8 b9 ac 24 01 00 cb 39 e4 00 |.C.......$...9..|
000000b0: 00 00 43 e5 00 00 00 b8 b9 ad 24 01 00 cb 39 e4 |..C.......$...9.|
000000c0: 00 00 00 43 e5 00 00 00 b8 b9 ae 24 01 00 cf 28 |...C.......$...(|
000000d0: cc 03 40 00 00 1b 0e 25 0e 07 05 17 15 1b 0e 25 |..@....%.......%|
000000e0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
000000f0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
00000100: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
00000110: 0e 07 05 00                                     |....|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 48 5f |...console.logH_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 63 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 73 |s/comparison-ops|
00000030: 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 89 |.js.............|
00000040: 01 01 a6 01 00 00 00 39 e4 00 00 00 43 e5 00 00 |.......9....C...|
00000050: 00 b8 b9 a5 24 01 00 cb 39 e4 00 00 00 43 e5 00 |....$...9....C..|
00000060: 00 00 b8 b9 a7 24 01 00 cb 39 e4 00 00 00 43 e5 |.....$...9....C.|
00000070: 00 00 00 b8 b9 a6 24 01 00 cb 39 e4 00 00 00 43 |......$...9....C|
00000080: e5 00 00 00 b8 b9 a8 24 01 00 cb 39 e4 00 00 00 |.......$...9....|
00000090: 43 e5 00 00 00 b8 b9 ab 24 01 00 cb 39 e4 00 00 |C.......$...9...|
000000a0: 00 43 e5 00 00 00 b8 b9 ac 24 01 00 cb 39 e4 00 |.C.......$...9..|
000000b0: 00 00 43 e5 00 00 00 b8 b9 ad 24 01 00 cb 39 e4 |..C.......$...9.|
000000c0: 00 00 00 43 e5 00 00 00 b8 b9 ae 24 01 00 cf 28 |...C.......$...(|
000000d0: cc 03 40 00 00 1b 0e 25 0e 07 05 17 15 1b 0e 25 |..@....%.......%|
000000e0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
000000f0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
00000100: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
00000110: 0e 07 05 00                                     |....|
```