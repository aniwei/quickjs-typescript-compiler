# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/comparison-ops.ts
**生成时间**: 2025-12-12T09:59:18.482Z

## 大小对比

- TypeScript编译器: 303 字节
- WASM编译器: 284 字节
- 差异: 19 字节 (6.69%)

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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/comparison-ops.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 251
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
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/comparison-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 233
  }
}
```

## 字节级差异

共发现 255 个字节差异:

- 偏移量 0x2: TS=0x0c vs WASM=0x48
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
- 偏移量 0xf: TS=0x48 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x63
- 偏移量 0x17: TS=0x5f vs WASM=0x6f
- 偏移量 0x18: TS=0x5f vs WASM=0x6d
- ... (显示前20个差异，总共255个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 48 |...<eval>._ret_H|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 63 6f 6d 70 61 72 69 73 6f 6e 2d 6f 70 |es/comparison-op|
00000030: 73 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 04 |s.js............|
00000040: 00 00 8d 01 01 01 00 00 00 00 00 00 b6 01 00 39 |...............9|
00000050: e6 00 00 00 43 e7 00 00 00 cb cc a5 24 01 00 de |....C.......$...|
00000060: 39 e6 00 00 00 43 e7 00 00 00 cb cc a7 24 01 00 |9....C.......$..|
00000070: de 39 e6 00 00 00 43 e7 00 00 00 cb cc a6 24 01 |.9....C.......$.|
00000080: 00 de 39 e6 00 00 00 43 e7 00 00 00 cb cc a8 24 |..9....C.......$|
00000090: 01 00 de 39 e6 00 00 00 43 e7 00 00 00 cb cc ab |...9....C.......|
000000a0: 24 01 00 de 39 e6 00 00 00 43 e7 00 00 00 cb cc |$...9....C......|
000000b0: ac 24 01 00 de 39 e6 00 00 00 43 e7 00 00 00 cb |.$...9....C.....|
000000c0: cc ad 24 01 00 de 39 e6 00 00 00 43 e7 00 00 00 |..$...9....C....|
000000d0: cb cc ae 24 01 00 de da 28 02 00 00 00 50 00 00 |...$....(....P..|
000000e0: 4d 18 07 08 07 03 07 1b 3a 00 3e 18 07 08 07 03 |M.......:.>.....|
000000f0: 07 1b 3a 00 3e 18 07 0a 07 05 07 1b 3a 00 3e 18 |..:.>.......:.>.|
00000100: 07 0a 07 05 07 1b 3a 00 3e 18 07 0a 07 05 07 1b |......:.>.......|
00000110: 3a 00 3e 18 07 0a 07 05 07 1b 3a 00 3e 18 07 0c |:.>.......:.>...|
00000120: 07 07 07 1b 3a 00 3e 18 07 0c 07 07 07 1b 00    |....:.>........|
```

### WASM
```
00000000: 05 03 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..H__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6f 6d 70 61 72 69 73 6f 6e |tures/comparison|
00000020: 2d 6f 70 73 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 |-ops.js.console.|
00000030: 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |log......... ...|
00000040: 01 00 00 00 04 00 00 8e 01 00 08 ec 02 29 39 e5 |.............)9.|
00000050: 00 00 00 43 e6 00 00 00 b8 b9 a5 24 01 00 0e 39 |...C.......$...9|
00000060: e5 00 00 00 43 e6 00 00 00 b8 b9 a7 24 01 00 0e |....C.......$...|
00000070: 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a6 24 01 00 |9....C.......$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 a8 24 01 |.9....C.......$.|
00000090: 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ab 24 |..9....C.......$|
000000a0: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 ac |...9....C.......|
000000b0: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 b9 |$...9....C......|
000000c0: ad 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 |.$...9....C.....|
000000d0: b9 ae 24 01 00 0e 06 2f c8 03 40 00 00 2f 0e 25 |..$..../..@../.%|
000000e0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
000000f0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
00000100: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
00000110: 0e 07 05 17 15 1b 0e 25 0e 07 05 00             |.......%....|
```