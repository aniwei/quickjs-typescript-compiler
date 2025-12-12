# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/function-expressions.ts
**生成时间**: 2025-12-12T09:59:18.529Z

## 大小对比

- TypeScript编译器: 206 字节
- WASM编译器: 272 字节
- 差异: -66 字节 (-24.26%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-expressions.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xc",
    "remaining": 148
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sub",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 61
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 63
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "subName",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 199
  }
}
```

## 字节级差异

共发现 245 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x07
- 偏移量 0x2: TS=0x0c vs WASM=0x54
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
- 偏移量 0xf: TS=0x54 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x66
- 偏移量 0x17: TS=0x5f vs WASM=0x75
- ... (显示前20个差异，总共245个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 54 |...<eval>._ret_T|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 65 78 70 72 |es/function-expr|
00000030: 65 73 73 69 6f 6e 73 2e 6a 73 0c 02 06 00 00 00 |essions.js......|
00000040: 00 00 00 01 00 0d 00 02 51 01 01 00 00 00 00 00 |........Q.......|
00000050: 00 40 6a 00 00 00 01 40 ea 00 00 00 01 b6 01 00 |.@j....@........|
00000060: d5 00 4f 00 00 00 00 3b 6a 00 00 00 39 e8 00 00 |..O....;j...9...|
00000070: 00 43 e9 00 00 00 39 6a 00 00 00 cd ce 05 24 01 |.C....9j......$.|
00000080: 00 de d5 01 3b ea 00 00 00 39 e8 00 00 00 43 e9 |....;....9....C.|
00000090: 00 00 00 39 ea 00 00 00 d2 0a cc 05 24 01 00 de |...9........$...|
000000a0: da 28 02 00 00 00 24 00 00 11 18 34 0b 28 0b 3e |.(....$....4.(.>|
000000b0: 18 25 08 07 06 07 0d 2a 17 3a 00 02 18 1b 0b 28 |.%.....*.:.....(|
000000c0: 0b 3e 18 25 08 0c 08 07 0f 2a 17 00 01 01       |.>.%.....*....|
```

### WASM
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..T__tests__/fix|
00000010: 74 75 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 65 |tures/function-e|
00000020: 78 70 72 65 73 73 69 6f 6e 73 2e 6a 73 06 73 75 |xpressions.js.su|
00000030: 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 61 02 |b.console.log.a.|
00000040: 62 0e 73 75 62 4e 61 6d 65 0d c8 03 00 00 00 00 |b.subName.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 05 02 02 3a 00 d4 |.. ..........:..|
00000060: 01 00 0d ca 03 01 0d 08 ec 02 29 c2 00 4f 6a 00 |..........)..Oj.|
00000070: 00 00 e3 39 e6 00 00 00 43 e7 00 00 00 68 00 00 |...9....C....h..|
00000080: ba bb f2 24 01 00 0e c2 01 e4 39 e6 00 00 00 43 |...$......9....C|
00000090: e7 00 00 00 68 01 00 bf 0a b9 f2 24 01 00 0e 06 |....h......$....|
000000a0: 2f c8 03 18 00 00 41 00 1b 0e 1b 0a 1b 06 07 07 |/.....A.........|
000000b0: 00 07 08 15 1b 0e 1b 0a 20 06 07 07 00 0c 43 06 |........ .....C.|
000000c0: 01 00 02 00 02 02 00 00 04 02 d0 03 00 01 00 d2 |................|
000000d0: 03 00 01 00 d3 d4 9f 28 c8 03 0a 00 0c 03 01 07 |.......(........|
000000e0: 08 07 03 07 11 00 0c 43 06 01 d4 03 02 00 02 02 |.......C........|
000000f0: 00 00 04 02 d0 03 00 01 00 d2 03 00 01 00 d3 d4 |................|
00000100: a0 28 c8 03 0a 04 0c 03 01 07 08 07 03 07 11 00 |.(..............|
```