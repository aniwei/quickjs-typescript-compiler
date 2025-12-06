# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/ternary-op.ts
**生成时间**: 2025-12-06T02:09:56.527Z

## 大小对比

- TypeScript编译器: 169 字节
- WASM编译器: 160 字节
- 差异: 9 字节 (5.63%)

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
    "remaining": 98
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

共发现 53 个字节差异:

- 偏移量 0x5b: TS=0x33 vs WASM=0x29
- 偏移量 0x69: TS=0x01 vs WASM=0xbf
- 偏移量 0x6b: TS=0x00 vs WASM=0xe7
- 偏移量 0x6c: TS=0x00 vs WASM=0xbc
- 偏移量 0x6d: TS=0x00 vs WASM=0xa7
- 偏移量 0x6e: TS=0xe3 vs WASM=0xec
- 偏移量 0x6f: TS=0xdf vs WASM=0x08
- 偏移量 0x70: TS=0xbc vs WASM=0x04
- 偏移量 0x71: TS=0xa7 vs WASM=0xe7
- 偏移量 0x72: TS=0x6c vs WASM=0x00
- 偏移量 0x73: TS=0x0e vs WASM=0x00
- 偏移量 0x75: TS=0x00 vs WASM=0xee
- 偏移量 0x76: TS=0x00 vs WASM=0x06
- 偏移量 0x78: TS=0xe7 vs WASM=0xe8
- 偏移量 0x7c: TS=0x6e vs WASM=0xe4
- 偏移量 0x7d: TS=0x09 vs WASM=0x39
- 偏移量 0x7e: TS=0x00 vs WASM=0xe9
- 偏移量 0x81: TS=0x04 vs WASM=0x00
- 偏移量 0x82: TS=0xe8 vs WASM=0x43
- 偏移量 0x83: TS=0x00 vs WASM=0xea
- ... (显示前20个差异，总共53个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 72 6e 61 72 79 2d 6f 70 2e 6a 73 06 74 5f 61 |ernary-op.js.t_a|
00000030: 06 74 5f 62 06 79 65 73 04 6e 6f 0e 63 6f 6e 73 |.t_b.yes.no.cons|
00000040: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000050: 20 06 01 a4 01 00 00 00 03 02 00 33 00 ca 03 00 | ..........3....|
00000060: 01 cc 03 01 01 08 ec 02 29 01 0a 00 00 00 e3 df |........).......|
00000070: bc a7 6c 0e 00 00 00 04 e7 00 00 00 6e 09 00 00 |..l.........n...|
00000080: 00 04 e8 00 00 00 e4 39 e9 00 00 00 43 ea 00 00 |.......9....C...|
00000090: 00 e0 24 01 00 0e 06 2f c8 03 00 0c 16 0a 21 00 |..$..../......!.|
000000a0: 07 06 25 04 34 08 21 64 00                      |..%.4.!d.|
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