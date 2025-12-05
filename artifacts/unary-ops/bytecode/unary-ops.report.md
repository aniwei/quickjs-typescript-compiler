# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/unary-ops.ts
**生成时间**: 2025-12-05T12:54:24.400Z

## 大小对比

- TypeScript编译器: 303 字节
- WASM编译器: 208 字节
- 差异: 95 字节 (45.67%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 216,
      "actualLength": 108,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_a",
      "offset": 112
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_b",
      "offset": 116
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_c",
      "offset": 120
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_d",
      "offset": 124
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_e",
      "offset": 128
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_f",
      "offset": 132
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 136
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 144
    }
  ],
  "functionHeader": {
    "offset": 148,
    "tag": "0xd",
    "remaining": 155
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_a",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_b",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_c",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_d",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_e",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_f",
      "offset": 63
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 67
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 79,
    "tag": "0xd",
    "remaining": 129
  }
}
```

## 字节级差异

共发现 291 个字节差异:

- 偏移量 0x2: TS=0xd8 vs WASM=0x50
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
- ... (显示前20个差异，总共291个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 d8 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 75 6e 61 72 79 2d 6f 70 73 2e 6a 73 |res/unary-ops.js|
00000070: 06 75 5f 61 06 75 5f 62 06 75 5f 63 06 75 5f 64 |.u_a.u_b.u_c.u_d|
00000080: 06 75 5f 65 06 75 5f 66 0e 63 6f 6e 73 6f 6c 65 |.u_e.u_f.console|
00000090: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
000000a0: a4 01 00 06 00 03 06 00 38 06 ca 03 00 00 00 cc |........8.......|
000000b0: 03 00 00 00 ce 03 00 00 00 d0 03 00 00 00 d2 03 |................|
000000c0: 00 00 00 d4 03 00 00 00 ca 03 00 01 cc 03 01 01 |................|
000000d0: ce 03 02 01 d0 03 03 01 d2 03 04 01 d4 03 05 01 |................|
000000e0: 08 6c 30 00 00 00 01 0a 00 00 00 e3 df 8e e4 df |.l0.............|
000000f0: 98 e5 df 97 e6 06 61 04 00 df 99 61 05 00 39 eb |......a....a..9.|
00000100: 00 00 00 43 ec 00 00 00 e0 e1 e2 60 04 00 60 05 |...C.......`..`.|
00000110: 00 24 05 00 0e 29 06 2f c8 03 01 12 00 0c 01 00 |.$...)./........|
00000120: 03 01 00 03 01 00 03 01 00 04 01 00 0f 01 00    |...............|
```

### WASM
```
00000000: 05 09 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2e 6a 73 06 75 5f 61 06 |nary-ops.js.u_a.|
00000030: 75 5f 62 06 75 5f 63 06 75 5f 64 06 75 5f 65 06 |u_b.u_c.u_d.u_e.|
00000040: 75 5f 66 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |u_f.console.log.|
00000050: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000060: 07 06 00 31 00 ca 03 00 01 cc 03 01 01 ce 03 02 |...1............|
00000070: 01 d0 03 03 01 d2 03 04 01 d4 03 05 01 08 ec 02 |................|
00000080: 29 bf 0a e7 8e e4 df 98 e5 df 97 e6 06 61 04 00 |)............a..|
00000090: df 99 61 05 00 39 eb 00 00 00 43 ec 00 00 00 e0 |..a..9....C.....|
000000a0: e1 e2 60 04 00 60 05 00 24 05 00 0e 06 2f c8 03 |..`..`..$..../..|
000000b0: 1e 00 00 21 16 07 01 0d 02 12 00 07 01 22 0e 1c |...!........."..|
000000c0: 21 1b 0e 1b 0a 07 0a 07 0a 07 0a 11 0a 11 29 00 |!.............).|
```