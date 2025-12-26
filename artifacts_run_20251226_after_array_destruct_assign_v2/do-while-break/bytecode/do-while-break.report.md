# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/do-while-break.ts
**生成时间**: 2025-12-25T17:57:15.014Z

## 大小对比

- TypeScript编译器: 186 字节
- WASM编译器: 186 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while-break.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 133
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 12
    },
    {
      "index": 3,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/do-while-break.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 133
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |H__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2d 62 72 65 |res/do-while-bre|
00000030: 61 6b 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 00 |ak.js...........|
00000040: 00 54 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 |.T......@.....?.|
00000050: 00 00 00 82 b7 3b e4 00 00 00 06 cb 39 e4 00 00 |.....;......9...|
00000060: 00 93 3a e4 00 00 00 cb 06 cb 39 e4 00 00 00 b8 |..:.......9.....|
00000070: ad ed 1f 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 |...9....C....9..|
00000080: 00 00 24 01 00 cb 06 cb 39 e4 00 00 00 ba ad ed |..$.....9.......|
00000090: 0a 39 e4 00 00 00 bc a5 ed c1 c7 28 ce 03 1a 00 |.9.........(....|
000000a0: 00 68 08 1b 02 30 06 20 04 13 0b 1b 0e 1b 0a 1b |.h...0. ........|
000000b0: 01 21 0d 20 04 13 01 20 04 00                   |.!. ... ..|
```

### WASM
```
00000000: 05 04 02 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...i.console.log|
00000010: 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |H__tests__/fixtu|
00000020: 72 65 73 2f 64 6f 2d 77 68 69 6c 65 2d 62 72 65 |res/do-while-bre|
00000030: 61 6b 2e 6a 73 0c 00 06 00 a4 01 00 01 00 03 00 |ak.js...........|
00000040: 00 54 01 a6 01 00 00 00 40 e4 00 00 00 80 3f e4 |.T......@.....?.|
00000050: 00 00 00 82 b7 3b e4 00 00 00 06 cb 39 e4 00 00 |.....;......9...|
00000060: 00 93 3a e4 00 00 00 cb 06 cb 39 e4 00 00 00 b8 |..:.......9.....|
00000070: ad ed 1f 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 |...9....C....9..|
00000080: 00 00 24 01 00 cb 06 cb 39 e4 00 00 00 ba ad ed |..$.....9.......|
00000090: 0a 39 e4 00 00 00 bc a5 ed c1 c7 28 ce 03 1a 00 |.9.........(....|
000000a0: 00 68 08 1b 02 30 06 20 04 13 0b 1b 0e 1b 0a 1b |.h...0. ........|
000000b0: 01 21 0d 20 04 13 01 20 04 00                   |.!. ... ..|
```