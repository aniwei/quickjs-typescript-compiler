# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/logical-assignment-nullish-assignment-049.ts
**生成时间**: 2026-01-03T04:40:38.643Z

## 大小对比

- TypeScript编译器: 251 字节
- WASM编译器: 251 字节
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
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
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
      "rawLength": 126,
      "actualLength": 63,
      "isWideChar": 0,
      "string": "__tests__/fixtures/logical-assignment-nullish-assignment-049.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xc",
    "remaining": 169
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
      "string": "a",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
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
      "rawLength": 126,
      "actualLength": 63,
      "isWideChar": 0,
      "string": "__tests__/fixtures/logical-assignment-nullish-assignment-049.js",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xc",
    "remaining": 169
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 7e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |og~__tests__/fix|
00000020: 74 75 72 65 73 2f 6c 6f 67 69 63 61 6c 2d 61 73 |tures/logical-as|
00000030: 73 69 67 6e 6d 65 6e 74 2d 6e 75 6c 6c 69 73 68 |signment-nullish|
00000040: 2d 61 73 73 69 67 6e 6d 65 6e 74 2d 30 34 39 2e |-assignment-049.|
00000050: 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 7e 01 |js............~.|
00000060: a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 |.....@.....@....|
00000070: 80 3f e4 00 00 00 82 3f e5 00 00 00 82 bf 31 b9 |.?.....?......1.|
00000080: 9e ec 04 b7 ee 02 b8 3b e4 00 00 00 07 3b e5 00 |.......;.....;..|
00000090: 00 00 7d e4 00 00 00 3d 11 ed 07 0e ba 16 3e ee |..}....=......>.|
000000a0: 03 0f 0f cb 7d e4 00 00 00 3d 11 ec 07 0e be 16 |....}....=......|
000000b0: 3e ee 03 0f 0f cb 7d e5 00 00 00 3d 11 b2 ec 08 |>.....}....=....|
000000c0: 0e bf 31 16 3e ee 03 0f 0f cb 39 e6 00 00 00 43 |..1.>.....9....C|
000000d0: e7 00 00 00 39 e4 00 00 00 39 e5 00 00 00 24 02 |....9....9....$.|
000000e0: 00 cf 28 d0 03 14 00 00 8a 16 5e 15 5d 00 5d 00 |..(.......^.].].|
000000f0: 67 00 1b 0e 1b 0a 1b 06 1b 07 00                |g..........|
```

### WASM
```
00000000: 05 05 02 61 02 62 0e 63 6f 6e 73 6f 6c 65 06 6c |...a.b.console.l|
00000010: 6f 67 7e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |og~__tests__/fix|
00000020: 74 75 72 65 73 2f 6c 6f 67 69 63 61 6c 2d 61 73 |tures/logical-as|
00000030: 73 69 67 6e 6d 65 6e 74 2d 6e 75 6c 6c 69 73 68 |signment-nullish|
00000040: 2d 61 73 73 69 67 6e 6d 65 6e 74 2d 30 34 39 2e |-assignment-049.|
00000050: 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 00 7e 01 |js............~.|
00000060: a6 01 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 |.....@.....@....|
00000070: 80 3f e4 00 00 00 82 3f e5 00 00 00 82 bf 31 b9 |.?.....?......1.|
00000080: 9e ec 04 b7 ee 02 b8 3b e4 00 00 00 07 3b e5 00 |.......;.....;..|
00000090: 00 00 7d e4 00 00 00 3d 11 ed 07 0e ba 16 3e ee |..}....=......>.|
000000a0: 03 0f 0f cb 7d e4 00 00 00 3d 11 ec 07 0e be 16 |....}....=......|
000000b0: 3e ee 03 0f 0f cb 7d e5 00 00 00 3d 11 b2 ec 08 |>.....}....=....|
000000c0: 0e bf 31 16 3e ee 03 0f 0f cb 39 e6 00 00 00 43 |..1.>.....9....C|
000000d0: e7 00 00 00 39 e4 00 00 00 39 e5 00 00 00 24 02 |....9....9....$.|
000000e0: 00 cf 28 d0 03 14 00 00 8a 16 5e 15 5d 00 5d 00 |..(.......^.].].|
000000f0: 67 00 1b 0e 1b 0a 1b 06 1b 07 00                |g..........|
```