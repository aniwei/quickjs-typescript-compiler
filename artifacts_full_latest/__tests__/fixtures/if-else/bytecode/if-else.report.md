# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/if-else.ts
**生成时间**: 2026-01-03T05:23:09.655Z

## 大小对比

- TypeScript编译器: 154 字节
- WASM编译器: 154 字节
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
      "string": "a",
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
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/if-else.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 108
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
      "string": "a",
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
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/if-else.js",
      "offset": 16
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xc",
    "remaining": 108
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 3a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |:__tests__/fixtu|
00000020: 72 65 73 2f 69 66 2d 65 6c 73 65 2e 6a 73 0c 00 |res/if-else.js..|
00000030: 06 00 a4 01 00 01 00 03 00 00 43 01 a6 01 00 00 |..........C.....|
00000040: 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b8 3b e4 |.@.....?......;.|
00000050: 00 00 00 06 cb 39 e4 00 00 00 b7 a7 ec 0b b9 11 |.....9..........|
00000060: 3a e4 00 00 00 cb ee 09 ba 11 3a e4 00 00 00 cb |:.........:.....|
00000070: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 |9....C....9....$|
00000080: 01 00 cf 28 ce 03 12 00 00 67 08 20 04 12 03 37 |...(.....g. ...7|
00000090: 00 2c 07 1b 0e 1b 0a 1b 01 00                   |.,........|
```

### WASM
```
00000000: 05 04 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |...a.console.log|
00000010: 3a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |:__tests__/fixtu|
00000020: 72 65 73 2f 69 66 2d 65 6c 73 65 2e 6a 73 0c 00 |res/if-else.js..|
00000030: 06 00 a4 01 00 01 00 03 00 00 43 01 a6 01 00 00 |..........C.....|
00000040: 00 40 e4 00 00 00 80 3f e4 00 00 00 82 b8 3b e4 |.@.....?......;.|
00000050: 00 00 00 06 cb 39 e4 00 00 00 b7 a7 ec 0b b9 11 |.....9..........|
00000060: 3a e4 00 00 00 cb ee 09 ba 11 3a e4 00 00 00 cb |:.........:.....|
00000070: 39 e5 00 00 00 43 e6 00 00 00 39 e4 00 00 00 24 |9....C....9....$|
00000080: 01 00 cf 28 ce 03 12 00 00 67 08 20 04 12 03 37 |...(.....g. ...7|
00000090: 00 2c 07 1b 0e 1b 0a 1b 01 00                   |.,........|
```