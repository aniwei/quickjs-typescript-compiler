# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-091.ts
**生成时间**: 2025-12-25T01:17:44.177Z

## 大小对比

- TypeScript编译器: 239 字节
- WASM编译器: 239 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-091.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 177
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 14
    },
    {
      "index": 4,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-091.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xc",
    "remaining": 177
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 69 02 73 0e 63 6f 6e 73 6f 6c 65 06 6c |...i.s.console.l|
00000010: 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogV__tests__/fix|
00000020: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000030: 63 6f 6d 70 6c 65 78 2d 30 39 31 2e 6a 73 0c 00 |complex-091.js..|
00000040: 06 00 a4 01 00 01 00 03 00 00 78 01 a6 01 00 00 |..........x.....|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000060: 00 00 82 3f e5 00 00 00 82 b7 3b e4 00 00 00 b7 |...?......;.....|
00000070: 3b e5 00 00 00 06 cb 39 e4 00 00 00 93 3a e4 00 |;......9.....:..|
00000080: 00 00 cb 06 cb 39 e4 00 00 00 b9 ad ed 1e 39 e5 |.....9........9.|
00000090: 00 00 00 39 e4 00 00 00 9f 11 3a e5 00 00 00 cb |...9......:.....|
000000a0: 06 cb 39 e4 00 00 00 ba a7 ed 0b 39 e4 00 00 00 |..9........9....|
000000b0: bf 0a a5 ed c1 39 e6 00 00 00 43 e7 00 00 00 39 |.....9....C....9|
000000c0: e5 00 00 00 24 01 00 cf 28 d0 03 22 00 00 00 26 |....$...(.."...&|
000000d0: 08 08 1b 02 30 06 20 04 13 0b 1b 0a 1b 05 35 04 |....0. .......5.|
000000e0: 20 04 13 01 25 04 12 15 1b 0e 1b 0a 1b 01 00    | ...%..........|
```

### WASM
```
00000000: 05 05 02 69 02 73 0e 63 6f 6e 73 6f 6c 65 06 6c |...i.s.console.l|
00000010: 6f 67 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogV__tests__/fix|
00000020: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000030: 63 6f 6d 70 6c 65 78 2d 30 39 31 2e 6a 73 0c 00 |complex-091.js..|
00000040: 06 00 a4 01 00 01 00 03 00 00 78 01 a6 01 00 00 |..........x.....|
00000050: 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f e4 00 |.@.....@.....?..|
00000060: 00 00 82 3f e5 00 00 00 82 b7 3b e4 00 00 00 b7 |...?......;.....|
00000070: 3b e5 00 00 00 06 cb 39 e4 00 00 00 93 3a e4 00 |;......9.....:..|
00000080: 00 00 cb 06 cb 39 e4 00 00 00 b9 ad ed 1e 39 e5 |.....9........9.|
00000090: 00 00 00 39 e4 00 00 00 9f 11 3a e5 00 00 00 cb |...9......:.....|
000000a0: 06 cb 39 e4 00 00 00 ba a7 ed 0b 39 e4 00 00 00 |..9........9....|
000000b0: bf 0a a5 ed c1 39 e6 00 00 00 43 e7 00 00 00 39 |.....9....C....9|
000000c0: e5 00 00 00 24 01 00 cf 28 d0 03 22 00 00 00 26 |....$...(.."...&|
000000d0: 08 08 1b 02 30 06 20 04 13 0b 1b 0a 1b 05 35 04 |....0. .......5.|
000000e0: 20 04 13 01 25 04 12 15 1b 0e 1b 0a 1b 01 00    | ...%..........|
```