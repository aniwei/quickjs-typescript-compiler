# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/binary-ops.ts
**生成时间**: 2025-12-12T09:59:18.384Z

## 大小对比

- TypeScript编译器: 217 字节
- WASM编译器: 204 字节
- 差异: 13 字节 (6.37%)

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
      "string": "__tests__/fixtures/binary-ops.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 48,
    "tag": "0xc",
    "remaining": 169
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
      "string": "__tests__/fixtures/binary-ops.js",
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
    "remaining": 157
  }
}
```

## 字节级差异

共发现 182 个字节差异:

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
- 偏移量 0x16: TS=0x73 vs WASM=0x62
- 偏移量 0x17: TS=0x5f vs WASM=0x69
- 偏移量 0x18: TS=0x5f vs WASM=0x6e
- ... (显示前20个差异，总共182个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 40 |...<eval>._ret_@|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 62 69 6e 61 72 79 2d 6f 70 73 2e 6a 73 |es/binary-ops.js|
00000030: 0c 02 06 00 00 00 00 00 00 01 00 04 00 00 5a 01 |..............Z.|
00000040: 01 00 00 00 00 00 00 b6 01 00 39 e6 00 00 00 43 |..........9....C|
00000050: e7 00 00 00 cb cc 9f 24 01 00 de 39 e6 00 00 00 |.......$...9....|
00000060: 43 e7 00 00 00 cb cc a0 24 01 00 de 39 e6 00 00 |C.......$...9...|
00000070: 00 43 e7 00 00 00 cc cd 9c 24 01 00 de 39 e6 00 |.C.......$...9..|
00000080: 00 00 43 e7 00 00 00 ce cc 9d 24 01 00 de 39 e6 |..C.......$...9.|
00000090: 00 00 00 43 e7 00 00 00 cf cc 9e 24 01 00 de da |...C.......$....|
000000a0: 28 02 00 00 00 32 00 00 4d 18 07 08 07 03 07 1b |(....2..M.......|
000000b0: 3a 00 3e 18 07 08 07 03 07 1b 3a 00 3e 18 07 08 |:.>.......:.>...|
000000c0: 07 03 07 1b 3a 00 3e 18 07 08 07 03 07 1b 3a 00 |....:.>.......:.|
000000d0: 3e 18 07 08 07 03 07 1b 00                      |>........|
```

### WASM
```
00000000: 05 03 40 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..@__tests__/fix|
00000010: 74 75 72 65 73 2f 62 69 6e 61 72 79 2d 6f 70 73 |tures/binary-ops|
00000020: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |.js.console.log.|
00000030: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000040: 04 00 00 5b 00 08 ec 02 29 39 e5 00 00 00 43 e6 |...[....)9....C.|
00000050: 00 00 00 b8 b9 9f 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
00000060: e6 00 00 00 b8 b9 a0 24 01 00 0e 39 e5 00 00 00 |.......$...9....|
00000070: 43 e6 00 00 00 b9 ba 9c 24 01 00 0e 39 e5 00 00 |C.......$...9...|
00000080: 00 43 e6 00 00 00 bb b9 9d 24 01 00 0e 39 e5 00 |.C.......$...9..|
00000090: 00 00 43 e6 00 00 00 bc b9 9e 24 01 00 0e 06 2f |..C.......$..../|
000000a0: c8 03 28 00 00 2f 0e 25 0e 07 05 17 15 1b 0e 25 |..(../.%.......%|
000000b0: 0e 07 05 17 15 1b 0e 25 0e 07 05 17 15 1b 0e 25 |.......%.......%|
000000c0: 0e 07 05 17 15 1b 0e 25 0e 07 05 00             |.......%....|
```