# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/labeled-statements.ts
**生成时间**: 2025-12-02T17:07:51.262Z

## 大小对比

- TypeScript编译器: 220 字节
- WASM编译器: 202 字节
- 差异: 18 字节 (8.91%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/labeled-statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "loop1",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "l_i",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "loop2",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "l_j",
      "offset": 68
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xd",
    "remaining": 136
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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/labeled-statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "l_i",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "l_j",
      "offset": 56
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 68
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 160 个字节差异:

- 偏移量 0x1: TS=0x07 vs WASM=0x05
- 偏移量 0x34: TS=0x0a vs WASM=0x06
- 偏移量 0x36: TS=0x6f vs WASM=0x5f
- 偏移量 0x37: TS=0x6f vs WASM=0x69
- 偏移量 0x38: TS=0x70 vs WASM=0x06
- 偏移量 0x39: TS=0x31 vs WASM=0x6c
- 偏移量 0x3a: TS=0x06 vs WASM=0x5f
- 偏移量 0x3b: TS=0x6c vs WASM=0x6a
- 偏移量 0x3c: TS=0x5f vs WASM=0x0e
- 偏移量 0x3d: TS=0x69 vs WASM=0x63
- 偏移量 0x3e: TS=0x0a vs WASM=0x6f
- 偏移量 0x3f: TS=0x6c vs WASM=0x6e
- 偏移量 0x40: TS=0x6f vs WASM=0x73
- 偏移量 0x42: TS=0x70 vs WASM=0x6c
- 偏移量 0x43: TS=0x32 vs WASM=0x65
- 偏移量 0x46: TS=0x5f vs WASM=0x6f
- 偏移量 0x47: TS=0x6a vs WASM=0x67
- 偏移量 0x48: TS=0x0e vs WASM=0x0d
- 偏移量 0x49: TS=0x63 vs WASM=0xc8
- 偏移量 0x4a: TS=0x6f vs WASM=0x03
- ... (显示前20个差异，总共160个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 61 62 65 6c 65 64 2d 73 74 61 74 65 6d 65 6e 74 |abeled-statement|
00000030: 73 2e 6a 73 0a 6c 6f 6f 70 31 06 6c 5f 69 0a 6c |s.js.loop1.l_i.l|
00000040: 6f 6f 70 32 06 6c 5f 6a 0e 63 6f 6e 73 6f 6c 65 |oop2.l_j.console|
00000050: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000060: a4 01 00 02 00 04 00 00 3c 02 cc 03 02 00 20 d0 |........<..... .|
00000070: 03 04 00 20 08 ec 02 29 b7 cb c7 ba a5 ec 30 b7 |... ...)......0.|
00000080: cc c8 ba a5 ec 24 c7 b8 ad 11 ec 05 0e c8 b8 ad |.....$..........|
00000090: ec 03 ee 16 39 e9 00 00 00 43 ea 00 00 00 c7 c8 |....9....C......|
000000a0: 24 02 00 0e c8 91 cc ee d9 c7 91 cb ee cd 06 2f |$............../|
000000b0: c8 03 28 00 00 21 24 0c 08 1d 03 0c 08 12 1f 0c |..(..!$.........|
000000c0: 08 1b 12 0c 08 1e 29 1b 0e 1b 0a 07 0a 07 0b 00 |......).........|
000000d0: 04 07 1c 07 06 00 04 03 09 07 06 00             |............|
```

### WASM
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 61 62 65 6c 65 64 2d 73 74 61 74 65 6d 65 6e 74 |abeled-statement|
00000030: 73 2e 6a 73 06 6c 5f 69 06 6c 5f 6a 0e 63 6f 6e |s.js.l_i.l_j.con|
00000040: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000050: 0c 20 06 01 a4 01 00 00 00 04 02 00 38 00 ca 03 |. ..........8...|
00000060: 00 01 cc 03 01 01 08 ec 02 29 b7 e3 df ba a5 ec |.........)......|
00000070: 2c b7 e4 e0 ba a5 ec 20 df b8 ad ec 06 e0 b8 ad |,...... ........|
00000080: ed 16 39 e7 00 00 00 43 e8 00 00 00 df e0 24 02 |..9....C......$.|
00000090: 00 0e e0 91 e4 ee dd df 91 e3 ee d1 06 2f c8 03 |............./..|
000000a0: 28 00 00 21 24 0c 08 1d 03 0c 08 12 1f 0c 08 11 |(..!$...........|
000000b0: 12 0c 08 14 29 1b 0e 1b 0a 07 0a 07 0b 00 04 07 |....)...........|
000000c0: 1c 07 06 00 04 03 09 07 06 00                   |..........|
```