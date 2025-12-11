# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/function-call.ts
**生成时间**: 2025-12-11T11:32:28.074Z

## 大小对比

- TypeScript编译器: 180 字节
- WASM编译器: 191 字节
- 差异: -11 字节 (-5.76%)

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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 58,
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

共发现 127 个字节差异:

- 偏移量 0x1: TS=0x04 vs WASM=0x06
- 偏移量 0x36: TS=0x02 vs WASM=0x0e
- 偏移量 0x37: TS=0x61 vs WASM=0x63
- 偏移量 0x38: TS=0x02 vs WASM=0x6f
- 偏移量 0x39: TS=0x62 vs WASM=0x6e
- 偏移量 0x3a: TS=0x0d vs WASM=0x73
- 偏移量 0x3b: TS=0xc8 vs WASM=0x6f
- 偏移量 0x3c: TS=0x03 vs WASM=0x6c
- 偏移量 0x3d: TS=0x00 vs WASM=0x65
- 偏移量 0x3e: TS=0x00 vs WASM=0x06
- 偏移量 0x3f: TS=0x00 vs WASM=0x6c
- 偏移量 0x40: TS=0x00 vs WASM=0x6f
- 偏移量 0x41: TS=0x00 vs WASM=0x67
- 偏移量 0x42: TS=0x0c vs WASM=0x02
- 偏移量 0x43: TS=0x20 vs WASM=0x61
- 偏移量 0x44: TS=0x06 vs WASM=0x02
- 偏移量 0x45: TS=0x01 vs WASM=0x62
- 偏移量 0x46: TS=0xa4 vs WASM=0x0d
- 偏移量 0x47: TS=0x01 vs WASM=0xc8
- 偏移量 0x48: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共127个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 63 61 6c 6c 2e 6a 73 0c |unction-call.js.|
00000030: 72 65 73 75 6c 74 02 61 02 62 0d c8 03 00 00 00 |result.a.b......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 03 02 01 20 00 |... .......... .|
00000050: d4 01 00 01 ca 03 01 09 08 ff 02 29 5a 00 00 cb |...........)Z...|
00000060: cc 05 f7 ba e8 00 00 00 02 00 43 e9 00 00 00 64 |..........C....d|
00000070: 01 00 24 01 00 0e 06 2f c8 03 0e 00 00 19 1a 2f |..$..../......./|
00000080: 06 0d 1f 25 0e 1b 0a 25 01 00 0c 43 06 01 d4 01 |...%...%...C....|
00000090: 02 00 02 02 00 00 04 02 cc 03 00 01 00 ce 03 00 |................|
000000a0: 01 00 d3 d4 9f 28 c8 03 0a 00 00 03 16 25 08 25 |.....(.......%.%|
000000b0: 03 07 11 00                                     |....|
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