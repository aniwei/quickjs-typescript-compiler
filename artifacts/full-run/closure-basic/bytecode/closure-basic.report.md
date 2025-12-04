# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-basic.ts
**生成时间**: 2025-12-04T06:33:07.402Z

## 大小对比

- TypeScript编译器: 264 字节
- WASM编译器: 5 字节
- 差异: 259 字节 (5180.00%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "add5",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 66
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 74
    }
  ],
  "functionHeader": {
    "offset": 78,
    "tag": "0xd",
    "remaining": 186
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

共发现 264 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x07 vs WASM=0x02
- 偏移量 0x2: TS=0x58 vs WASM=0x03
- 偏移量 0x3: TS=0x5f vs WASM=0x04
- 偏移量 0x4: TS=0x5f vs WASM=0x05
- 偏移量 0x5: TS=0x74 vs WASM=EOF
- 偏移量 0x6: TS=0x65 vs WASM=EOF
- 偏移量 0x7: TS=0x73 vs WASM=EOF
- 偏移量 0x8: TS=0x74 vs WASM=EOF
- 偏移量 0x9: TS=0x73 vs WASM=EOF
- 偏移量 0xa: TS=0x5f vs WASM=EOF
- 偏移量 0xb: TS=0x5f vs WASM=EOF
- 偏移量 0xc: TS=0x2f vs WASM=EOF
- 偏移量 0xd: TS=0x63 vs WASM=EOF
- 偏移量 0xe: TS=0x6f vs WASM=EOF
- 偏移量 0xf: TS=0x6d vs WASM=EOF
- 偏移量 0x10: TS=0x70 vs WASM=EOF
- 偏移量 0x11: TS=0x69 vs WASM=EOF
- 偏移量 0x12: TS=0x6c vs WASM=EOF
- 偏移量 0x13: TS=0x65 vs WASM=EOF
- ... (显示前20个差异，总共264个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 12 |losure-basic.js.|
00000030: 6d 61 6b 65 41 64 64 65 72 02 78 02 79 08 61 64 |makeAdder.x.y.ad|
00000040: 64 35 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |d5.console.log..|
00000050: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 04 |....... ........|
00000060: 02 01 22 02 ca 03 01 00 20 d0 03 01 01 20 ca 03 |.."..... .... ..|
00000070: 00 01 d0 03 01 01 08 ec 05 c2 00 e3 29 5a 00 00 |............)Z..|
00000080: bc f1 e4 39 e9 00 00 00 43 ea 00 00 00 5a 01 00 |...9....C....Z..|
00000090: b9 f1 24 01 00 0e 06 2f c8 03 12 00 00 00 07 0a |..$..../........|
000000a0: 16 16 12 0d 27 1b 0e 1b 0a 16 08 07 09 00 0c 43 |....'..........C|
000000b0: 06 01 ca 03 01 01 01 01 00 01 08 02 cc 03 00 01 |................|
000000c0: 40 e6 01 00 00 00 0c 03 5b 00 00 c2 00 28 c8 03 |@.......[....(..|
000000d0: 04 00 00 0d 04 00 0c 43 06 01 00 01 01 01 02 01 |.......C........|
000000e0: 00 09 02 ce 03 00 01 00 e6 01 00 00 00 cc 03 00 |................|
000000f0: 03 0c 03 5b 00 00 df d3 9f 28 c8 03 0a 01 09 03 |...[.....(......|
00000100: 04 07 08 07 03 07 11 00                         |........|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```