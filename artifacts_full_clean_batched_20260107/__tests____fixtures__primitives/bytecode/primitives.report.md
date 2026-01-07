# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/primitives.ts
**生成时间**: 2026-01-07T03:18:59.449Z

## 大小对比

- TypeScript编译器: 214 字节
- WASM编译器: 214 字节
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
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/primitives.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 167
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
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/primitives.js",
      "offset": 14
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 167
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 40 5f |...console.log@_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 70 72 69 6d 69 74 69 76 65 73 2e 6a 73 0c |s/primitives.js.|
00000030: 00 06 00 a4 01 00 01 00 03 00 01 61 01 a6 01 00 |...........a....|
00000040: 00 00 39 e4 00 00 00 43 e5 00 00 00 07 24 01 00 |..9....C.....$..|
00000050: cb 39 e4 00 00 00 43 e5 00 00 00 39 47 00 00 00 |.9....C....9G...|
00000060: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 0a 24 |$...9....C.....$|
00000070: 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 09 24 01 |...9....C.....$.|
00000080: 00 cb 39 e4 00 00 00 43 e5 00 00 00 bf 7b 24 01 |..9....C.....{$.|
00000090: 00 cb 39 e4 00 00 00 43 e5 00 00 00 c1 00 24 01 |..9....C......$.|
000000a0: 00 cf 28 cc 03 26 00 00 1b 0e 20 08 17 15 1b 0e |..(..&.... .....|
000000b0: 1b 0a 1b 01 17 15 1b 0e 20 08 17 15 1b 0e 20 08 |........ ..... .|
000000c0: 17 15 1b 0e 25 08 17 15 1b 0e 25 08 00 06 00 00 |....%.....%.....|
000000d0: 00 00 00 00 f8 3f                               |.....?|
```

### WASM
```
00000000: 05 03 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 40 5f |...console.log@_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 70 72 69 6d 69 74 69 76 65 73 2e 6a 73 0c |s/primitives.js.|
00000030: 00 06 00 a4 01 00 01 00 03 00 01 61 01 a6 01 00 |...........a....|
00000040: 00 00 39 e4 00 00 00 43 e5 00 00 00 07 24 01 00 |..9....C.....$..|
00000050: cb 39 e4 00 00 00 43 e5 00 00 00 39 47 00 00 00 |.9....C....9G...|
00000060: 24 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 0a 24 |$...9....C.....$|
00000070: 01 00 cb 39 e4 00 00 00 43 e5 00 00 00 09 24 01 |...9....C.....$.|
00000080: 00 cb 39 e4 00 00 00 43 e5 00 00 00 bf 7b 24 01 |..9....C.....{$.|
00000090: 00 cb 39 e4 00 00 00 43 e5 00 00 00 c1 00 24 01 |..9....C......$.|
000000a0: 00 cf 28 cc 03 26 00 00 1b 0e 20 08 17 15 1b 0e |..(..&.... .....|
000000b0: 1b 0a 1b 01 17 15 1b 0e 20 08 17 15 1b 0e 20 08 |........ ..... .|
000000c0: 17 15 1b 0e 25 08 17 15 1b 0e 25 08 00 06 00 00 |....%.....%.....|
000000d0: 00 00 00 00 f8 3f                               |.....?|
```