# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/do-while-loop.ts
**生成时间**: 2025-12-04T06:33:07.813Z

## 大小对比

- TypeScript编译器: 97 字节
- WASM编译器: 143 字节
- 差异: -46 字节 (-32.17%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/do-while-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "dw_i",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xd",
    "remaining": 45
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/do-while-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "dw_i",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 79
  }
}
```

## 字节级差异

共发现 89 个字节差异:

- 偏移量 0x1: TS=0x02 vs WASM=0x04
- 偏移量 0x34: TS=0x0d vs WASM=0x0e
- 偏移量 0x35: TS=0xc8 vs WASM=0x63
- 偏移量 0x36: TS=0x03 vs WASM=0x6f
- 偏移量 0x37: TS=0x00 vs WASM=0x6e
- 偏移量 0x38: TS=0x00 vs WASM=0x73
- 偏移量 0x39: TS=0x00 vs WASM=0x6f
- 偏移量 0x3a: TS=0x00 vs WASM=0x6c
- 偏移量 0x3b: TS=0x00 vs WASM=0x65
- 偏移量 0x3c: TS=0x0c vs WASM=0x06
- 偏移量 0x3d: TS=0x20 vs WASM=0x6c
- 偏移量 0x3e: TS=0x06 vs WASM=0x6f
- 偏移量 0x3f: TS=0x01 vs WASM=0x67
- 偏移量 0x40: TS=0xa4 vs WASM=0x0d
- 偏移量 0x41: TS=0x01 vs WASM=0xc8
- 偏移量 0x42: TS=0x00 vs WASM=0x03
- 偏移量 0x43: TS=0x01 vs WASM=0x00
- 偏移量 0x45: TS=0x01 vs WASM=0x00
- 偏移量 0x46: TS=0x01 vs WASM=0x00
- 偏移量 0x48: TS=0x08 vs WASM=0x0c
- ... (显示前20个差异，总共89个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 6f 2d 77 68 69 6c 65 2d 6c 6f 6f 70 2e 6a 73 08 |o-while-loop.js.|
00000030: 64 77 5f 69 0d c8 03 00 00 00 00 00 0c 20 06 01 |dw_i......... ..|
00000040: a4 01 00 01 00 01 01 00 08 01 ca 03 01 00 20 ca |.............. .|
00000050: 03 00 01 08 ec 02 29 b7 e3 06 2f c8 03 02 00 00 |......).../.....|
00000060: 00                                              |.|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 6f 2d 77 68 69 6c 65 2d 6c 6f 6f 70 2e 6a 73 08 |o-while-loop.js.|
00000030: 64 77 5f 69 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |dw_i.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 03 01 00 1f 00 ca 03 00 01 08 ec 02 29 b7 e3 |.............)..|
00000060: 39 e6 00 00 00 43 e7 00 00 00 df 24 01 00 0e df |9....C.....$....|
00000070: 91 e3 df bc a5 ed ea 06 2f c8 03 12 00 00 22 04 |......../.....".|
00000080: 1b 0e 1b 0a 07 01 17 15 07 08 0d 06 0c 0a 00    |...............|
```