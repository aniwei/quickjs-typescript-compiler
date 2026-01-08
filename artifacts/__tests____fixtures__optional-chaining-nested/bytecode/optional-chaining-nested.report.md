# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/optional-chaining-nested.ts
**生成时间**: 2026-01-08T03:25:32.123Z

## 大小对比

- TypeScript编译器: 273 字节
- WASM编译器: 273 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 22
    },
    {
      "index": 7,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining-nested.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xc",
    "remaining": 202
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 22
    },
    {
      "index": 7,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/fixtures/optional-chaining-nested.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xc",
    "remaining": 202
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 02 6f 02 63 02 62 02 61 0e 63 6f 6e 73 6f |...o.c.b.a.conso|
00000010: 6c 65 06 6c 6f 67 02 78 5c 5f 5f 74 65 73 74 73 |le.log.x\__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 6f 70 74 69 |__/fixtures/opti|
00000030: 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 2d 6e 65 |onal-chaining-ne|
00000040: 73 74 65 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |sted.js.........|
00000050: 04 00 00 98 01 01 a6 01 00 00 00 40 e4 00 00 00 |...........@....|
00000060: 80 3f e4 00 00 00 80 0b 0b 0b b8 4e e5 00 00 00 |.?.........N....|
00000070: 4e e6 00 00 00 4e e7 00 00 00 3b e4 00 00 00 39 |N....N....;....9|
00000080: e8 00 00 00 43 e9 00 00 00 39 e4 00 00 00 11 b2 |....C....9......|
00000090: ec 05 0e 06 ee 20 42 e7 00 00 00 11 b2 ec 05 0e |..... B.........|
000000a0: 06 ee 13 42 e6 00 00 00 11 b2 ec 05 0e 06 ee 06 |...B............|
000000b0: 42 e5 00 00 00 11 b2 ec 03 0e b7 24 01 00 cb 39 |B..........$...9|
000000c0: e8 00 00 00 43 e9 00 00 00 07 11 b2 ec 05 0e 06 |....C...........|
000000d0: ee 13 42 e7 00 00 00 11 b2 ec 05 0e 06 ee 06 42 |..B............B|
000000e0: e6 00 00 00 11 b2 ec 07 0e 04 ea 00 00 00 24 01 |..............$.|
000000f0: 00 cf 28 d6 03 1a 00 00 b8 00 1b 0e 1b 0a 1b 02 |..(.............|
00000100: 43 06 43 06 61 0f 17 15 1b 0e 20 12 43 06 75 0f |C.C.a..... .C.u.|
00000110: 00                                              |.|
```

### WASM
```
00000000: 05 08 02 6f 02 63 02 62 02 61 0e 63 6f 6e 73 6f |...o.c.b.a.conso|
00000010: 6c 65 06 6c 6f 67 02 78 5c 5f 5f 74 65 73 74 73 |le.log.x\__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 6f 70 74 69 |__/fixtures/opti|
00000030: 6f 6e 61 6c 2d 63 68 61 69 6e 69 6e 67 2d 6e 65 |onal-chaining-ne|
00000040: 73 74 65 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |sted.js.........|
00000050: 04 00 00 98 01 01 a6 01 00 00 00 40 e4 00 00 00 |...........@....|
00000060: 80 3f e4 00 00 00 80 0b 0b 0b b8 4e e5 00 00 00 |.?.........N....|
00000070: 4e e6 00 00 00 4e e7 00 00 00 3b e4 00 00 00 39 |N....N....;....9|
00000080: e8 00 00 00 43 e9 00 00 00 39 e4 00 00 00 11 b2 |....C....9......|
00000090: ec 05 0e 06 ee 20 42 e7 00 00 00 11 b2 ec 05 0e |..... B.........|
000000a0: 06 ee 13 42 e6 00 00 00 11 b2 ec 05 0e 06 ee 06 |...B............|
000000b0: 42 e5 00 00 00 11 b2 ec 03 0e b7 24 01 00 cb 39 |B..........$...9|
000000c0: e8 00 00 00 43 e9 00 00 00 07 11 b2 ec 05 0e 06 |....C...........|
000000d0: ee 13 42 e7 00 00 00 11 b2 ec 05 0e 06 ee 06 42 |..B............B|
000000e0: e6 00 00 00 11 b2 ec 07 0e 04 ea 00 00 00 24 01 |..............$.|
000000f0: 00 cf 28 d6 03 1a 00 00 b8 00 1b 0e 1b 0a 1b 02 |..(.............|
00000100: 43 06 43 06 61 0f 17 15 1b 0e 20 12 43 06 75 0f |C.C.a..... .C.u.|
00000110: 00                                              |.|
```