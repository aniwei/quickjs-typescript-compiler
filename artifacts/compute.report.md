# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/compute.ts
**生成时间**: 2025-12-07T05:51:24.214Z

## 大小对比

- TypeScript编译器: 140 字节
- WASM编译器: 5 字节
- 差异: 135 字节 (2700.00%)

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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/compute.ts",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 87
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

共发现 140 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x04 vs WASM=0x02
- 偏移量 0x2: TS=0x4c vs WASM=0x03
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
- ... (显示前20个差异，总共140个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 74 73 0e 63 6f 6d 70 75 74 |ompute.ts.comput|
00000030: 65 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 06 |e.a.b......... .|
00000040: 01 a4 01 00 00 00 01 02 01 09 00 ca 03 00 01 ca |................|
00000050: 03 00 01 08 ec 06 c2 00 e3 29 06 2f c8 03 02 00 |.........)./....|
00000060: 00 00 0c 43 06 01 ca 03 02 00 02 02 00 00 04 02 |...C............|
00000070: cc 03 00 01 00 ce 03 00 01 00 d3 d4 9f 28 c8 03 |.............(..|
00000080: 0a 00 00 03 16 07 08 07 03 07 11 00             |............|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```