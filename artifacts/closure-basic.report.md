# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/closure-basic.ts
**生成时间**: 2025-12-05T06:50:10.673Z

## 大小对比

- TypeScript编译器: 220 字节
- WASM编译器: 5 字节
- 差异: 215 字节 (4300.00%)

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
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "makeAdder",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 69
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 147
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

共发现 220 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x06 vs WASM=0x02
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
- ... (显示前20个差异，总共220个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 0e |losure-basic.js.|
00000030: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 12 6d 61 6b 65 |console.log.make|
00000040: 41 64 64 65 72 02 78 02 79 0d c8 03 00 00 00 00 |Adder.x.y.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 03 02 01 22 00 ce |.. .........."..|
00000060: 03 00 00 d4 03 01 00 08 ec 1d c2 00 e3 df bc 22 |..............."|
00000070: 01 00 e4 39 e5 00 00 00 43 e6 00 00 00 e0 b9 22 |...9....C......"|
00000080: 01 00 24 01 00 0e 29 06 2f c8 03 01 09 00 06 04 |..$...)./.......|
00000090: 00 00 01 00 10 01 00 0c 00 04 00 ce 03 01 00 01 |................|
000000a0: 03 00 01 04 01 d0 03 00 00 00 c2 00 28 29 c8 03 |............()..|
000000b0: 01 03 00 00 01 00 0c 00 04 00 00 01 00 01 03 01 |................|
000000c0: 00 05 01 d2 03 00 00 00 d0 03 00 03 df d3 9f 28 |...............(|
000000d0: 29 c8 03 01 06 00 00 01 00 00 01 00             |)...........|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```