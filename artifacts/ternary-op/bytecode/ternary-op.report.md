# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/ternary-op.ts
**生成时间**: 2025-12-05T12:54:24.355Z

## 大小对比

- TypeScript编译器: 245 字节
- WASM编译器: 160 字节
- 差异: 85 字节 (53.13%)

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
      "rawLength": 218,
      "actualLength": 109,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/ternary-op.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "t_a",
      "offset": 113
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "t_b",
      "offset": 117
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "yes",
      "offset": 121
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "no",
      "offset": 125
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 128
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 136
    }
  ],
  "functionHeader": {
    "offset": 140,
    "tag": "0xd",
    "remaining": 105
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/ternary-op.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "t_a",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "t_b",
      "offset": 48
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "yes",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "no",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 89
  }
}
```

## 字节级差异

共发现 234 个字节差异:

- 偏移量 0x2: TS=0xda vs WASM=0x52
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共234个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 da 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 74 65 72 6e 61 72 79 2d 6f 70 2e 6a |res/ternary-op.j|
00000070: 73 06 74 5f 61 06 74 5f 62 06 79 65 73 04 6e 6f |s.t_a.t_b.yes.no|
00000080: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000090: 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 02 00 |..... ..........|
000000a0: 36 02 ca 03 00 00 00 cc 03 00 00 00 ca 03 00 01 |6...............|
000000b0: cc 03 01 01 08 6c 2e 00 00 00 01 0a 00 00 00 e3 |.....l..........|
000000c0: df bc a7 6c 0a 00 00 00 04 e7 00 00 00 6e 05 00 |...l.........n..|
000000d0: 00 00 04 e8 00 00 00 e4 39 e9 00 00 00 43 ea 00 |........9....C..|
000000e0: 00 00 e0 24 01 00 0e 29 06 2f c8 03 01 06 00 0c |...$...)./......|
000000f0: 01 00 22 01 00                                  |.."..|
```

### WASM
```
00000000: 05 07 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 72 6e 61 72 79 2d 6f 70 2e 6a 73 06 74 5f 61 |ernary-op.js.t_a|
00000030: 06 74 5f 62 06 79 65 73 04 6e 6f 0e 63 6f 6e 73 |.t_b.yes.no.cons|
00000040: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000050: 20 06 01 a4 01 00 00 00 03 02 00 29 00 ca 03 00 | ..........)....|
00000060: 01 cc 03 01 01 08 ec 02 29 bf 0a e7 bc a7 ec 08 |........).......|
00000070: 04 e7 00 00 00 ee 06 04 e8 00 00 00 e4 39 e9 00 |.............9..|
00000080: 00 00 43 ea 00 00 00 e0 24 01 00 0e 06 2f c8 03 |..C.....$..../..|
00000090: 0e 00 00 21 14 0c 08 53 1b 1b 0e 1b 0a 07 01 00 |...!...S........|
```