# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-036.ts
**生成时间**: 2025-12-25T01:17:43.943Z

## 大小对比

- TypeScript编译器: 190 字节
- WASM编译器: 190 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-036.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f36",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "v36",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 122
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-036.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f36",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "v36",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 122
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..V__tests__/fix|
00000010: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000020: 63 6f 6d 70 6c 65 78 2d 30 33 36 2e 6a 73 06 66 |complex-036.js.f|
00000030: 33 36 06 76 33 36 0e 63 6f 6e 73 6f 6c 65 06 6c |36.v36.console.l|
00000040: 6f 67 02 78 0d c8 03 00 02 00 00 ca 03 00 01 cc |og.x............|
00000050: 03 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 01 |..... ..........|
00000060: 1e 00 ca 03 00 01 cc 03 01 0d 08 ec 05 c2 00 e3 |................|
00000070: 29 df b8 f1 e4 39 e7 00 00 00 43 e8 00 00 00 68 |)....9....C....h|
00000080: 01 00 24 01 00 0e 06 2f c8 03 0e 00 00 27 26 0c |..$..../.....'&.|
00000090: 06 0d 2b 1b 0e 1b 0a 11 01 00 0c 43 06 01 ca 03 |..+........C....|
000000a0: 01 00 01 02 00 00 05 01 d2 03 00 01 00 d3 bf 24 |...............$|
000000b0: 9f 28 c8 03 08 01 07 02 32 11 04 07 11 00       |.(......2.....|
```

### WASM
```
00000000: 05 06 56 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..V__tests__/fix|
00000010: 74 75 72 65 73 5f 67 65 6e 65 72 61 74 65 64 2f |tures_generated/|
00000020: 63 6f 6d 70 6c 65 78 2d 30 33 36 2e 6a 73 06 66 |complex-036.js.f|
00000030: 33 36 06 76 33 36 0e 63 6f 6e 73 6f 6c 65 06 6c |36.v36.console.l|
00000040: 6f 67 02 78 0d c8 03 00 02 00 00 ca 03 00 01 cc |og.x............|
00000050: 03 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 01 |..... ..........|
00000060: 1e 00 ca 03 00 01 cc 03 01 0d 08 ec 05 c2 00 e3 |................|
00000070: 29 df b8 f1 e4 39 e7 00 00 00 43 e8 00 00 00 68 |)....9....C....h|
00000080: 01 00 24 01 00 0e 06 2f c8 03 0e 00 00 27 26 0c |..$..../.....'&.|
00000090: 06 0d 2b 1b 0e 1b 0a 11 01 00 0c 43 06 01 ca 03 |..+........C....|
000000a0: 01 00 01 02 00 00 05 01 d2 03 00 01 00 d3 bf 24 |...............$|
000000b0: 9f 28 c8 03 08 01 07 02 32 11 04 07 11 00       |.(......2.....|
```