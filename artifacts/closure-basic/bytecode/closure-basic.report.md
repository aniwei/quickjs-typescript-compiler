# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-basic.ts
**生成时间**: 2025-12-05T12:54:23.885Z

## 大小对比

- TypeScript编译器: 307 字节
- WASM编译器: 5 字节
- 差异: 302 字节 (6040.00%)

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
      "rawLength": 224,
      "actualLength": 112,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 116
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "add5",
      "offset": 126
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 131
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 139
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 143
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 145
    }
  ],
  "functionHeader": {
    "offset": 147,
    "tag": "0xd",
    "remaining": 160
  }
}
```

### WASM编译器输出
```json
{
  "error": "Bytecode too short for analysis"
}
```

## 字节级差异

共发现 307 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x07 vs WASM=0x02
- 偏移量 0x2: TS=0xe0 vs WASM=0x03
- 偏移量 0x3: TS=0x01 vs WASM=0x04
- 偏移量 0x4: TS=0x2f vs WASM=0x05
- 偏移量 0x5: TS=0x55 vs WASM=EOF
- 偏移量 0x6: TS=0x73 vs WASM=EOF
- 偏移量 0x7: TS=0x65 vs WASM=EOF
- 偏移量 0x8: TS=0x72 vs WASM=EOF
- 偏移量 0x9: TS=0x73 vs WASM=EOF
- 偏移量 0xa: TS=0x2f vs WASM=EOF
- 偏移量 0xb: TS=0x61 vs WASM=EOF
- 偏移量 0xc: TS=0x6e vs WASM=EOF
- 偏移量 0xd: TS=0x69 vs WASM=EOF
- 偏移量 0xe: TS=0x77 vs WASM=EOF
- 偏移量 0xf: TS=0x65 vs WASM=EOF
- 偏移量 0x10: TS=0x69 vs WASM=EOF
- 偏移量 0x11: TS=0x2f vs WASM=EOF
- 偏移量 0x12: TS=0x44 vs WASM=EOF
- 偏移量 0x13: TS=0x65 vs WASM=EOF
- ... (显示前20个差异，总共307个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 e0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 63 6c 6f 73 75 72 65 2d 62 61 73 69 |res/closure-basi|
00000070: 63 2e 6a 73 12 6d 61 6b 65 41 64 64 65 72 08 61 |c.js.makeAdder.a|
00000080: 64 64 35 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 |dd5.console.log.|
00000090: 78 02 79 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |x.y......... ...|
000000a0: 01 00 02 00 03 02 01 25 02 ca 03 00 00 00 cc 03 |.......%........|
000000b0: 00 00 00 ca 03 00 01 cc 03 01 01 08 6c 1d 00 00 |............l...|
000000c0: 00 c2 00 e3 df bc 22 01 00 e4 39 e7 00 00 00 43 |......"...9....C|
000000d0: e8 00 00 00 e0 b9 22 01 00 24 01 00 0e 29 06 2f |......"..$...)./|
000000e0: c8 03 01 09 00 09 04 00 00 01 00 10 01 00 0c 00 |................|
000000f0: 04 00 ca 03 01 00 01 03 00 01 04 01 d2 03 00 00 |................|
00000100: 00 c2 00 28 29 c8 03 01 03 00 00 01 00 0c 00 04 |...()...........|
00000110: 00 00 01 00 01 03 01 00 05 01 d4 03 00 00 00 d2 |................|
00000120: 03 00 03 df d3 9f 28 29 c8 03 01 06 00 00 01 00 |......()........|
00000130: 00 01 00                                        |...|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```