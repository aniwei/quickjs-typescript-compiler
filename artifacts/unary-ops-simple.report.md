# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/unary-ops-simple.ts
**生成时间**: 2025-12-04T18:06:48.138Z

## 大小对比

- TypeScript编译器: 203 字节
- WASM编译器: 230 字节
- 差异: -27 字节 (-11.74%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 141
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 168
  }
}
```

## 字节级差异

共发现 43 个字节差异:

- 偏移量 0xba: TS=0x0f vs WASM=0x2a
- 偏移量 0xbc: TS=0x1d vs WASM=0x00
- 偏移量 0xbd: TS=0x01 vs WASM=0x2f
- 偏移量 0xbe: TS=0x00 vs WASM=0x0e
- 偏移量 0xbf: TS=0x10 vs WASM=0x1b
- 偏移量 0xc0: TS=0x01 vs WASM=0x0a
- 偏移量 0xc1: TS=0x00 vs WASM=0x07
- 偏移量 0xc2: TS=0x10 vs WASM=0x01
- 偏移量 0xc3: TS=0x01 vs WASM=0x17
- 偏移量 0xc4: TS=0x00 vs WASM=0x15
- 偏移量 0xc5: TS=0x10 vs WASM=0x1b
- 偏移量 0xc6: TS=0x01 vs WASM=0x0e
- 偏移量 0xc7: TS=0x00 vs WASM=0x20
- 偏移量 0xc8: TS=0x10 vs WASM=0x0a
- 偏移量 0xc9: TS=0x01 vs WASM=0x07
- 偏移量 0xca: TS=0x00 vs WASM=0x01
- 偏移量 0xcb: TS=EOF vs WASM=0x17
- 偏移量 0xcc: TS=EOF vs WASM=0x15
- 偏移量 0xcd: TS=EOF vs WASM=0x1b
- 偏移量 0xce: TS=EOF vs WASM=0x0e
- ... (显示前20个差异，总共43个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2d 73 69 6d 70 6c 65 2e |nary-ops-simple.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 64 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..d....)9....C..|
00000060: 00 00 b6 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b8 8f 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000080: 00 0a 98 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000090: 00 b8 97 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000a0: 00 b8 99 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000b0: 00 06 24 01 00 0e 06 2f c8 03 0f 00 1d 01 00 10 |..$..../........|
000000c0: 01 00 10 01 00 10 01 00 10 01 00                |...........|
```

### WASM
```
00000000: 05 03 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2d 73 69 6d 70 6c 65 2e |nary-ops-simple.|
00000030: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000050: 00 00 64 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..d....)9....C..|
00000060: 00 00 b6 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000070: 00 b8 8f 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000080: 00 0a 98 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000090: 00 b8 97 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000a0: 00 b8 99 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000b0: 00 06 24 01 00 0e 06 2f c8 03 2a 00 00 2f 0e 1b |..$..../..*../..|
000000c0: 0a 07 01 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 25 |....... .......%|
000000d0: 08 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 25 08 17 |..... .......%..|
000000e0: 15 1b 0e 20 08 00                               |... ..|
```