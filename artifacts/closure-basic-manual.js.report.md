# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/closure-basic-manual.js
**生成时间**: 2025-12-05T06:50:46.814Z

## 大小对比

- TypeScript编译器: 227 字节
- WASM编译器: 237 字节
- 差异: -10 字节 (-4.22%)

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
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic-manual.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 3,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 66
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 76
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 80,
    "tag": "0xd",
    "remaining": 147
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic-manual.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 54
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "add5",
      "offset": 64
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 81
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 83
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xd",
    "remaining": 152
  }
}
```

## 字节级差异

共发现 174 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x07
- 偏移量 0x36: TS=0x0e vs WASM=0x12
- 偏移量 0x37: TS=0x63 vs WASM=0x6d
- 偏移量 0x38: TS=0x6f vs WASM=0x61
- 偏移量 0x39: TS=0x6e vs WASM=0x6b
- 偏移量 0x3a: TS=0x73 vs WASM=0x65
- 偏移量 0x3b: TS=0x6f vs WASM=0x41
- 偏移量 0x3c: TS=0x6c vs WASM=0x64
- 偏移量 0x3d: TS=0x65 vs WASM=0x64
- 偏移量 0x3e: TS=0x06 vs WASM=0x65
- 偏移量 0x3f: TS=0x6c vs WASM=0x72
- 偏移量 0x40: TS=0x6f vs WASM=0x08
- 偏移量 0x41: TS=0x67 vs WASM=0x61
- 偏移量 0x42: TS=0x12 vs WASM=0x64
- 偏移量 0x43: TS=0x6d vs WASM=0x64
- 偏移量 0x44: TS=0x61 vs WASM=0x35
- 偏移量 0x45: TS=0x6b vs WASM=0x0e
- 偏移量 0x46: TS=0x65 vs WASM=0x63
- 偏移量 0x47: TS=0x41 vs WASM=0x6f
- 偏移量 0x48: TS=0x64 vs WASM=0x6e
- ... (显示前20个差异，总共174个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2d 6d 61 6e |losure-basic-man|
00000030: 75 61 6c 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c |ual.js.console.l|
00000040: 6f 67 12 6d 61 6b 65 41 64 64 65 72 02 78 02 79 |og.makeAdder.x.y|
00000050: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000060: 00 03 02 01 22 00 ce 03 00 00 d4 03 01 00 08 ec |...."...........|
00000070: 1d c2 00 e3 df bc 22 01 00 e4 39 e5 00 00 00 43 |......"...9....C|
00000080: e6 00 00 00 e0 b9 22 01 00 24 01 00 0e 29 06 2f |......"..$...)./|
00000090: c8 03 01 09 00 06 04 00 00 01 00 10 01 00 0c 00 |................|
000000a0: 04 00 ce 03 01 00 01 03 00 01 04 01 d0 03 00 00 |................|
000000b0: 00 c2 00 28 29 c8 03 01 03 00 00 01 00 0c 00 04 |...()...........|
000000c0: 00 00 01 00 01 03 01 00 05 01 d2 03 00 00 00 d0 |................|
000000d0: 03 00 03 df d3 9f 28 29 c8 03 01 06 00 00 01 00 |......()........|
000000e0: 00 01 00                                        |...|
```

### WASM
```
00000000: 05 07 66 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..f__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2d 6d 61 6e |losure-basic-man|
00000030: 75 61 6c 2e 6a 73 12 6d 61 6b 65 41 64 64 65 72 |ual.js.makeAdder|
00000040: 08 61 64 64 35 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.add5.console.lo|
00000050: 67 02 78 02 79 0d c8 03 00 00 00 00 00 0c 20 06 |g.x.y......... .|
00000060: 01 a4 01 00 00 00 04 02 01 1e 00 ca 03 00 01 cc |................|
00000070: 03 01 01 08 ec 05 c2 00 e3 29 df bc f1 e4 39 e7 |.........)....9.|
00000080: 00 00 00 43 e8 00 00 00 e0 b9 f1 24 01 00 0e 06 |...C.......$....|
00000090: 2f c8 03 12 00 00 00 07 0a 16 0c 12 0d 27 1b 0e |/............'..|
000000a0: 1b 0a 0c 08 07 09 00 0c 43 06 01 ca 03 01 00 01 |........C.......|
000000b0: 01 00 01 03 01 d2 03 00 01 40 c2 00 28 c8 03 04 |.........@..(...|
000000c0: 00 00 0d 04 00 0c 43 06 01 00 01 00 01 02 01 00 |......C.........|
000000d0: 04 01 d4 03 00 01 00 d2 03 00 03 df d3 9f 28 c8 |..............(.|
000000e0: 03 0a 01 09 03 04 07 08 07 03 07 11 00          |.............|
```