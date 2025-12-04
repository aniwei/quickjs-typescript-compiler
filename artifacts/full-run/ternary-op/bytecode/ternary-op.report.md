# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/ternary-op.ts
**生成时间**: 2025-12-04T06:33:09.402Z

## 大小对比

- TypeScript编译器: 175 字节
- WASM编译器: 160 字节
- 差异: 15 字节 (9.38%)

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
    "remaining": 104
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

共发现 74 个字节差异:

- 偏移量 0x56: TS=0x02 vs WASM=0x00
- 偏移量 0x5b: TS=0x2e vs WASM=0x29
- 偏移量 0x5c: TS=0x02 vs WASM=0x00
- 偏移量 0x5f: TS=0x01 vs WASM=0x00
- 偏移量 0x60: TS=0x00 vs WASM=0x01
- 偏移量 0x61: TS=0x20 vs WASM=0xcc
- 偏移量 0x62: TS=0xcc vs WASM=0x03
- 偏移量 0x63: TS=0x03 vs WASM=0x01
- 偏移量 0x65: TS=0x01 vs WASM=0x08
- 偏移量 0x66: TS=0x20 vs WASM=0xec
- 偏移量 0x67: TS=0xca vs WASM=0x02
- 偏移量 0x68: TS=0x03 vs WASM=0x29
- 偏移量 0x69: TS=0x00 vs WASM=0xbf
- 偏移量 0x6a: TS=0x01 vs WASM=0x0a
- 偏移量 0x6b: TS=0xcc vs WASM=0xe7
- 偏移量 0x6c: TS=0x03 vs WASM=0xbc
- 偏移量 0x6d: TS=0x01 vs WASM=0xa7
- 偏移量 0x6e: TS=0x01 vs WASM=0xec
- 偏移量 0x70: TS=0xec vs WASM=0x04
- 偏移量 0x71: TS=0x02 vs WASM=0xe7
- ... (显示前20个差异，总共74个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 72 6e 61 72 79 2d 6f 70 2e 6a 73 06 74 5f 61 |ernary-op.js.t_a|
00000030: 06 74 5f 62 06 79 65 73 04 6e 6f 0e 63 6f 6e 73 |.t_b.yes.no.cons|
00000040: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000050: 20 06 01 a4 01 00 02 00 03 02 00 2e 02 ca 03 01 | ...............|
00000060: 00 20 cc 03 01 01 20 ca 03 00 01 cc 03 01 01 08 |. .... .........|
00000070: ec 02 29 bf 0a e3 5a 00 00 bc a7 ec 08 04 e7 00 |..)...Z.........|
00000080: 00 00 ee 06 04 e8 00 00 00 e4 39 e9 00 00 00 43 |..........9....C|
00000090: ea 00 00 00 5a 01 00 24 01 00 0e 06 2f c8 03 0e |....Z..$..../...|
000000a0: 00 00 26 14 16 08 53 1b 1b 0e 1b 0a 11 01 00    |..&...S........|
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