# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/nested-functions-arguments-new-target-indirect-057.ts
**生成时间**: 2025-12-26T13:00:18.134Z

## 大小对比

- TypeScript编译器: 260 字节
- WASM编译器: 260 字节
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "outer57",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 144,
      "actualLength": 72,
      "isWideChar": 0,
      "string": "__tests__/fixtures/nested-functions-arguments-new-target-indirect-057.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 102,
    "tag": "0xc",
    "remaining": 158
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "outer57",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 144,
      "actualLength": 72,
      "isWideChar": 0,
      "string": "__tests__/fixtures/nested-functions-arguments-new-target-indirect-057.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 102,
    "tag": "0xc",
    "remaining": 158
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0e 6f 75 74 65 72 35 37 0e 63 6f 6e 73 6f |...outer57.conso|
00000010: 6c 65 06 6c 6f 67 90 01 5f 5f 74 65 73 74 73 5f |le.log..__tests_|
00000020: 5f 2f 66 69 78 74 75 72 65 73 2f 6e 65 73 74 65 |_/fixtures/neste|
00000030: 64 2d 66 75 6e 63 74 69 6f 6e 73 2d 61 72 67 75 |d-functions-argu|
00000040: 6d 65 6e 74 73 2d 6e 65 77 2d 74 61 72 67 65 74 |ments-new-target|
00000050: 2d 69 6e 64 69 72 65 63 74 2d 30 35 37 2e 6a 73 |-indirect-057.js|
00000060: 0a 69 6e 6e 65 72 0c 00 06 00 a4 01 00 01 00 03 |.inner..........|
00000070: 00 01 23 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 |..#......@....@.|
00000080: 00 41 e4 00 00 00 00 39 e5 00 00 00 43 e6 00 00 |.A.....9....C...|
00000090: 00 39 e4 00 00 00 f0 24 01 00 cf 28 ce 03 0e 00 |.9.....$...(....|
000000a0: 00 00 0e 0e 00 1b 0e 1b 0a 1b 0e 07 0f 00 0c 43 |...............C|
000000b0: 06 00 c8 03 00 01 00 04 00 01 09 01 d0 03 00 00 |................|
000000c0: 00 c2 00 cf b8 b9 ba 23 03 00 ce 03 08 01 00 00 |.......#........|
000000d0: 02 08 16 16 0d 00 0c 43 06 00 d0 03 00 01 00 03 |.......C........|
000000e0: 00 00 0b 01 9e 01 00 01 00 0c 01 cb c7 eb bf 39 |...............9|
000000f0: ba 9e 9f 28 ce 03 0c 02 04 12 16 07 12 16 1c 07 |...(............|
00000100: 0b 07 2f 00                                     |../.|
```

### WASM
```
00000000: 05 05 0e 6f 75 74 65 72 35 37 0e 63 6f 6e 73 6f |...outer57.conso|
00000010: 6c 65 06 6c 6f 67 90 01 5f 5f 74 65 73 74 73 5f |le.log..__tests_|
00000020: 5f 2f 66 69 78 74 75 72 65 73 2f 6e 65 73 74 65 |_/fixtures/neste|
00000030: 64 2d 66 75 6e 63 74 69 6f 6e 73 2d 61 72 67 75 |d-functions-argu|
00000040: 6d 65 6e 74 73 2d 6e 65 77 2d 74 61 72 67 65 74 |ments-new-target|
00000050: 2d 69 6e 64 69 72 65 63 74 2d 30 35 37 2e 6a 73 |-indirect-057.js|
00000060: 0a 69 6e 6e 65 72 0c 00 06 00 a4 01 00 01 00 03 |.inner..........|
00000070: 00 01 23 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 |..#......@....@.|
00000080: 00 41 e4 00 00 00 00 39 e5 00 00 00 43 e6 00 00 |.A.....9....C...|
00000090: 00 39 e4 00 00 00 f0 24 01 00 cf 28 ce 03 0e 00 |.9.....$...(....|
000000a0: 00 00 0e 0e 00 1b 0e 1b 0a 1b 0e 07 0f 00 0c 43 |...............C|
000000b0: 06 00 c8 03 00 01 00 04 00 01 09 01 d0 03 00 00 |................|
000000c0: 00 c2 00 cf b8 b9 ba 23 03 00 ce 03 08 01 00 00 |.......#........|
000000d0: 02 08 16 16 0d 00 0c 43 06 00 d0 03 00 01 00 03 |.......C........|
000000e0: 00 00 0b 01 9e 01 00 01 00 0c 01 cb c7 eb bf 39 |...............9|
000000f0: ba 9e 9f 28 ce 03 0c 02 04 12 16 07 12 16 1c 07 |...(............|
00000100: 0b 07 2f 00                                     |../.|
```