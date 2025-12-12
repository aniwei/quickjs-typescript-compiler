# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/unary-ops.ts
**生成时间**: 2025-12-12T09:59:18.595Z

## 大小对比

- TypeScript编译器: 224 字节
- WASM编译器: 214 字节
- 差异: 10 字节 (4.67%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "__tests__/fixtures/unary-ops.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xc",
    "remaining": 177
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
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "__tests__/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 34
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 168
  }
}
```

## 字节级差异

共发现 187 个字节差异:

- 偏移量 0x2: TS=0x0c vs WASM=0x3e
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x3e vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x75
- 偏移量 0x17: TS=0x5f vs WASM=0x6e
- 偏移量 0x18: TS=0x5f vs WASM=0x61
- ... (显示前20个差异，总共187个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 3e |...<eval>._ret_>|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 75 6e 61 72 79 2d 6f 70 73 2e 6a 73 0c |es/unary-ops.js.|
00000030: 02 06 00 00 00 00 00 00 01 00 03 00 00 66 01 01 |.............f..|
00000040: 00 00 00 00 00 00 b6 01 00 39 e6 00 00 00 43 e7 |.........9....C.|
00000050: 00 00 00 0a 98 24 01 00 de 39 e6 00 00 00 43 e7 |.....$...9....C.|
00000060: 00 00 00 cb 97 24 01 00 de 39 e6 00 00 00 43 e7 |.....$...9....C.|
00000070: 00 00 00 cb 8f 24 01 00 de 39 e6 00 00 00 43 e7 |.....$...9....C.|
00000080: 00 00 00 cb 8e 24 01 00 de 39 e6 00 00 00 43 e7 |.....$...9....C.|
00000090: 00 00 00 cb 99 24 01 00 de 39 e6 00 00 00 43 e7 |.....$...9....C.|
000000a0: 00 00 00 ca 0e 06 24 01 00 de da 28 02 00 00 00 |......$....(....|
000000b0: 2e 00 00 4d 1a 07 01 07 17 3a 00 3e 1a 07 01 07 |...M.....:.>....|
000000c0: 17 3a 00 3e 1a 07 01 07 17 3a 00 3e 1a 07 01 07 |.:.>.....:.>....|
000000d0: 17 3a 00 3e 26 07 0d 07 17 3a 00 3e 22 11 21 00 |.:.>&....:.>".!.|
```

### WASM
```
00000000: 05 03 3e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..>__tests__/fix|
00000010: 74 75 72 65 73 2f 75 6e 61 72 79 2d 6f 70 73 2e |tures/unary-ops.|
00000020: 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |js.console.log..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000040: 00 00 64 00 08 ec 02 29 39 e5 00 00 00 43 e6 00 |..d....)9....C..|
00000050: 00 00 0a 98 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000060: 00 00 b8 97 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000070: 00 00 b8 8f 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000080: 00 00 b6 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000090: 00 b8 99 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
000000a0: 00 06 24 01 00 0e 06 2f c8 03 2a 00 00 2f 0e 25 |..$..../..*../.%|
000000b0: 08 17 15 1b 0e 20 0a 07 01 17 15 1b 0e 20 0a 07 |..... ....... ..|
000000c0: 01 17 15 1b 0e 1b 0a 07 01 17 15 1b 0e 25 08 17 |.............%..|
000000d0: 15 1b 0e 20 08 00                               |... ..|
```