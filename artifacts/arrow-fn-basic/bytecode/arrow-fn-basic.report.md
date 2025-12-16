# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-12-16T14:11:02.376Z

## 大小对比

- TypeScript编译器: 210 字节
- WASM编译器: 178 字节
- 差异: 32 字节 (17.98%)

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
      "string": "__tests__/fixtures/arrow-fn-basic.js",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 155
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
      "string": "__tests__/fixtures/arrow-fn-basic.js",
      "offset": 14
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 123
  }
}
```

## 字节级差异

共发现 82 个字节差异:

- 偏移量 0x4f: TS=0x01 vs WASM=0x80
- 偏移量 0x55: TS=0x10 vs WASM=0x80
- 偏移量 0x59: TS=0x00 vs WASM=0x6a
- 偏移量 0x7b: TS=0x12 vs WASM=0x0c
- 偏移量 0x7e: TS=0x3e vs WASM=0x7d
- 偏移量 0x7f: TS=0x18 vs WASM=0x00
- 偏移量 0x80: TS=0x25 vs WASM=0x1b
- 偏移量 0x81: TS=0x0b vs WASM=0x0e
- 偏移量 0x82: TS=0x1e vs WASM=0x1b
- 偏移量 0x83: TS=0x0b vs WASM=0x0a
- 偏移量 0x84: TS=0x34 vs WASM=0x25
- 偏移量 0x85: TS=0x18 vs WASM=0x06
- 偏移量 0x86: TS=0x1b vs WASM=0x07
- 偏移量 0x87: TS=0x08 vs WASM=0x07
- 偏移量 0x88: TS=0x07 vs WASM=0x00
- 偏移量 0x89: TS=0x06 vs WASM=0x0c
- 偏移量 0x8a: TS=0x07 vs WASM=0x02
- 偏移量 0x8b: TS=0x0d vs WASM=0x06
- 偏移量 0x8c: TS=0x07 vs WASM=0x00
- 偏移量 0x8d: TS=0x17 vs WASM=0x00
- ... (显示前20个差异，总共82个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 48 5f |...console.logH_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 |s/arrow-fn-basic|
00000030: 2e 6a 73 02 61 02 62 0c 00 06 00 a4 01 00 01 00 |.js.a.b.........|
00000040: 05 00 01 2f 01 a6 01 00 00 00 40 6a 00 00 00 01 |.../......@j....|
00000050: 3f 6a 00 00 00 10 c2 00 4f 00 00 00 00 3b 6a 00 |?j......O....;j.|
00000060: 00 00 39 e4 00 00 00 43 e5 00 00 00 39 6a 00 00 |..9....C....9j..|
00000070: 00 b8 b9 f2 24 01 00 cf 28 cc 03 12 00 00 3e 18 |....$...(.....>.|
00000080: 25 0b 1e 0b 34 18 1b 08 07 06 07 0d 07 17 00 0c |%...4...........|
00000090: 02 06 00 00 02 00 02 00 00 00 28 02 ce 03 00 00 |..........(.....|
000000a0: 00 d0 03 00 00 00 b6 01 00 c8 23 00 00 00 ba e5 |..........#.....|
000000b0: 00 00 00 01 00 c8 27 00 00 00 ba e6 00 00 00 01 |......'.........|
000000c0: 00 c8 25 00 00 00 9f c8 1c 00 00 00 28 29 cc 03 |..%.........()..|
000000d0: 00 00                                           |..|
```

### WASM
```
00000000: 05 05 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 48 5f |...console.logH_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 61 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 |s/arrow-fn-basic|
00000030: 2e 6a 73 02 61 02 62 0c 00 06 00 a4 01 00 01 00 |.js.a.b.........|
00000040: 05 00 01 2f 01 a6 01 00 00 00 40 6a 00 00 00 80 |.../......@j....|
00000050: 3f 6a 00 00 00 80 c2 00 4f 6a 00 00 00 3b 6a 00 |?j......Oj...;j.|
00000060: 00 00 39 e4 00 00 00 43 e5 00 00 00 39 6a 00 00 |..9....C....9j..|
00000070: 00 b8 b9 f2 24 01 00 cf 28 cc 03 0c 00 00 7d 00 |....$...(.....}.|
00000080: 1b 0e 1b 0a 25 06 07 07 00 0c 02 06 00 00 02 00 |....%...........|
00000090: 02 02 00 00 04 02 ce 03 00 01 00 d0 03 00 01 00 |................|
000000a0: d3 d4 9f 28 cc 03 0a 00 0c 03 01 07 08 07 03 07 |...(............|
000000b0: 11 00                                           |..|
```