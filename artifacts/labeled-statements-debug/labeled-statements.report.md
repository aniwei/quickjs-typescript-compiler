# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/labeled-statements.ts
**生成时间**: 2025-12-04T07:59:34.125Z

## 大小对比

- TypeScript编译器: 232 字节
- WASM编译器: 200 字节
- 差异: 32 字节 (16.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
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
    "remaining": 160
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
    "remaining": 128
  }
}
```

## 字节级差异

共发现 137 个字节差异:

- 偏移量 0x57: TS=0x02 vs WASM=0x00
- 偏移量 0x5c: TS=0x4c vs WASM=0x38
- 偏移量 0x5d: TS=0x02 vs WASM=0x00
- 偏移量 0x60: TS=0x02 vs WASM=0x00
- 偏移量 0x61: TS=0x00 vs WASM=0x01
- 偏移量 0x62: TS=0x20 vs WASM=0xcc
- 偏移量 0x63: TS=0xcc vs WASM=0x03
- 偏移量 0x64: TS=0x03 vs WASM=0x01
- 偏移量 0x65: TS=0x04 vs WASM=0x01
- 偏移量 0x66: TS=0x00 vs WASM=0x08
- 偏移量 0x67: TS=0x20 vs WASM=0xec
- 偏移量 0x68: TS=0xca vs WASM=0x02
- 偏移量 0x69: TS=0x03 vs WASM=0x29
- 偏移量 0x6a: TS=0x00 vs WASM=0xb7
- 偏移量 0x6b: TS=0x01 vs WASM=0xe3
- 偏移量 0x6c: TS=0xcc vs WASM=0xdf
- 偏移量 0x6d: TS=0x03 vs WASM=0xba
- 偏移量 0x6e: TS=0x01 vs WASM=0xa5
- 偏移量 0x6f: TS=0x01 vs WASM=0xec
- 偏移量 0x70: TS=0x08 vs WASM=0x2c
- ... (显示前20个差异，总共137个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 61 62 65 6c 65 64 2d 73 74 61 74 65 6d 65 6e 74 |abeled-statement|
00000030: 73 2e 6a 73 06 6c 5f 69 06 6c 5f 6a 0e 63 6f 6e |s.js.l_i.l_j.con|
00000040: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000050: 0c 20 06 01 a4 01 00 02 00 04 02 00 4c 02 ca 03 |. ..........L...|
00000060: 02 00 20 cc 03 04 00 20 ca 03 00 01 cc 03 01 01 |.. .... ........|
00000070: 08 ec 02 29 b7 e3 5a 00 00 ba a5 ec 3e b7 e4 5a |...)..Z.....>..Z|
00000080: 01 00 ba a5 ec 2e 5a 00 00 b8 ad 11 ec 07 0e 5a |......Z........Z|
00000090: 01 00 b8 ad ec 03 ee 1c 39 e7 00 00 00 43 e8 00 |........9....C..|
000000a0: 00 00 5a 00 00 5a 01 00 24 02 00 0e 5a 01 00 91 |..Z..Z..$...Z...|
000000b0: cc ee cd 5a 00 00 91 cb ee bd 06 2f c8 03 28 00 |...Z......./..(.|
000000c0: 00 21 24 16 08 1d 03 16 08 12 1f 16 08 1b 12 16 |.!$.............|
000000d0: 08 1e 29 1b 0e 1b 0a 11 0a 11 0b 00 04 07 1c 11 |..).............|
000000e0: 06 00 04 03 09 11 06 00                         |........|
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
000000a0: 26 00 00 20 32 0c 08 1c 00 0c 08 12 29 0c 08 11 |&.. 2.......)...|
000000b0: 12 0c 08 14 29 1b 0e 1b 0a 07 0a 07 0b 00 04 07 |....)...........|
000000c0: 26 07 06 15 0d 07 06 00                         |&.......|
```