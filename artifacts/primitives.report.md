# 字节码分析报告

**输入文件**: __tests__/fixtures/primitives.ts
**生成时间**: 2025-12-12T09:52:28.250Z

## 大小对比

- TypeScript编译器: 219 字节
- WASM编译器: 222 字节
- 差异: -3 字节 (-1.35%)

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
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/primitives.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 48,
    "tag": "0xc",
    "remaining": 171
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
      "rawLength": 64,
      "actualLength": 32,
      "isWideChar": 0,
      "string": "__tests__/fixtures/primitives.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 35
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 43
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xd",
    "remaining": 175
  }
}
```

## 字节级差异

共发现 191 个字节差异:

- 偏移量 0x2: TS=0x0c vs WASM=0x40
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
- 偏移量 0xf: TS=0x40 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x70
- 偏移量 0x17: TS=0x5f vs WASM=0x72
- 偏移量 0x18: TS=0x5f vs WASM=0x69
- ... (显示前20个差异，总共191个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 40 |...<eval>._ret_@|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 70 72 69 6d 69 74 69 76 65 73 2e 6a 73 |es/primitives.js|
00000030: 0c 02 06 00 00 00 00 00 00 01 00 03 00 01 61 01 |..............a.|
00000040: 01 00 00 00 00 00 00 b6 01 00 39 e6 00 00 00 43 |..........9....C|
00000050: e7 00 00 00 07 24 01 00 de 39 e6 00 00 00 43 e7 |.....$...9....C.|
00000060: 00 00 00 06 24 01 00 de 39 e6 00 00 00 43 e7 00 |....$...9....C..|
00000070: 00 00 0a 24 01 00 de 39 e6 00 00 00 43 e7 00 00 |...$...9....C...|
00000080: 00 09 24 01 00 de 39 e6 00 00 00 43 e7 00 00 00 |..$...9....C....|
00000090: d2 7b 24 01 00 de 39 e6 00 00 00 43 e7 00 00 00 |.{$...9....C....|
000000a0: d4 00 24 01 00 de da 28 02 00 00 00 24 00 00 4d |..$....(....$..M|
000000b0: 18 07 17 3a 00 3e 18 07 17 3a 00 3e 18 07 17 3a |...:.>...:.>...:|
000000c0: 00 3e 18 07 17 3a 00 3e 18 0c 17 3a 00 3e 18 1b |.>...:.>...:.>..|
000000d0: 17 00 06 00 00 00 00 00 00 f8 3f                |..........?|
```

### WASM
```
00000000: 05 03 40 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..@__tests__/fix|
00000010: 74 75 72 65 73 2f 70 72 69 6d 69 74 69 76 65 73 |tures/primitives|
00000020: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |.js.console.log.|
00000030: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000040: 03 00 01 66 00 08 ec 02 29 39 e5 00 00 00 43 e6 |...f....)9....C.|
00000050: 00 00 00 07 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000060: 00 00 39 47 00 00 00 24 01 00 0e 39 e5 00 00 00 |..9G...$...9....|
00000070: 43 e6 00 00 00 0a 24 01 00 0e 39 e5 00 00 00 43 |C.....$...9....C|
00000080: e6 00 00 00 09 24 01 00 0e 39 e5 00 00 00 43 e6 |.....$...9....C.|
00000090: 00 00 00 bf 7b 24 01 00 0e 39 e5 00 00 00 43 e6 |....{$...9....C.|
000000a0: 00 00 00 c1 00 24 01 00 0e 06 2f c8 03 26 00 00 |.....$..../..&..|
000000b0: 2f 0e 20 08 17 15 1b 0e 1b 0a 1b 01 17 15 1b 0e |/. .............|
000000c0: 20 08 17 15 1b 0e 20 08 17 15 1b 0e 25 08 17 15 | ..... .....%...|
000000d0: 1b 0e 25 08 00 06 00 00 00 00 00 00 f8 3f       |..%..........?|
```