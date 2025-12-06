# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/function-call.ts
**生成时间**: 2025-12-06T17:39:28.948Z

## 大小对比

- TypeScript编译器: 200 字节
- WASM编译器: 191 字节
- 差异: 9 字节 (4.71%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-call.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 58
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 130
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-call.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xd",
    "remaining": 121
  }
}
```

## 字节级差异

共发现 125 个字节差异:

- 偏移量 0x2f: TS=0x02 vs WASM=0x0c
- 偏移量 0x30: TS=0x61 vs WASM=0x72
- 偏移量 0x31: TS=0x02 vs WASM=0x65
- 偏移量 0x32: TS=0x62 vs WASM=0x73
- 偏移量 0x33: TS=0x0c vs WASM=0x75
- 偏移量 0x34: TS=0x72 vs WASM=0x6c
- 偏移量 0x35: TS=0x65 vs WASM=0x74
- 偏移量 0x36: TS=0x73 vs WASM=0x0e
- 偏移量 0x37: TS=0x75 vs WASM=0x63
- 偏移量 0x38: TS=0x6c vs WASM=0x6f
- 偏移量 0x39: TS=0x74 vs WASM=0x6e
- 偏移量 0x3a: TS=0x0e vs WASM=0x73
- 偏移量 0x3b: TS=0x63 vs WASM=0x6f
- 偏移量 0x3c: TS=0x6f vs WASM=0x6c
- 偏移量 0x3d: TS=0x6e vs WASM=0x65
- 偏移量 0x3e: TS=0x73 vs WASM=0x06
- 偏移量 0x3f: TS=0x6f vs WASM=0x6c
- 偏移量 0x40: TS=0x6c vs WASM=0x6f
- 偏移量 0x41: TS=0x65 vs WASM=0x67
- 偏移量 0x42: TS=0x06 vs WASM=0x02
- ... (显示前20个差异，总共125个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 02 |unction-call.js.|
00000030: 61 02 62 0c 72 65 73 75 6c 74 0e 63 6f 6e 73 6f |a.b.result.conso|
00000040: 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 |le.log......... |
00000050: 06 01 a4 01 00 01 00 03 03 01 1f 01 d4 01 01 00 |................|
00000060: 00 d4 01 00 01 d4 01 00 01 ce 03 00 09 08 ec 05 |................|
00000070: c2 00 e3 29 df b8 b9 f2 e5 39 e8 00 00 00 43 e9 |...).....9....C.|
00000080: 00 00 00 68 02 00 24 01 00 0e 06 2f c8 03 0e 00 |...h..$..../....|
00000090: 00 28 1a 11 06 0d 1f 1b 0e 1b 0a 11 01 00 0c 43 |.(.............C|
000000a0: 06 01 d4 01 02 00 02 02 00 00 04 02 ca 03 00 01 |................|
000000b0: 00 cc 03 00 01 00 d3 d4 9f 28 c8 03 0a 00 00 03 |.........(......|
000000c0: 16 07 08 07 03 07 11 00                         |........|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 0c |unction-call.js.|
00000030: 72 65 73 75 6c 74 0e 63 6f 6e 73 6f 6c 65 06 6c |result.console.l|
00000040: 6f 67 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 |og.a.b......... |
00000050: 06 01 a4 01 00 00 00 03 02 01 1f 00 d4 01 00 01 |................|
00000060: ca 03 01 09 08 ec 05 c2 00 e3 29 df b8 b9 f2 e4 |..........).....|
00000070: 39 e6 00 00 00 43 e7 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
00000080: 0e 06 2f c8 03 0e 00 00 28 1a 11 06 0d 1f 1b 0e |../.....(.......|
00000090: 1b 0a 11 01 00 0c 43 06 01 d4 01 02 00 02 02 00 |......C.........|
000000a0: 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 9f |................|
000000b0: 28 c8 03 0a 00 00 03 16 07 08 07 03 07 11 00    |(..............|
```