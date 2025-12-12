# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-methods.ts
**生成时间**: 2025-12-12T09:59:18.551Z

## 大小对比

- TypeScript编译器: 154 字节
- WASM编译器: 200 字节
- 差异: -46 字节 (-23.00%)

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
      "string": "__tests__/fixtures/object-methods.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 102
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 39
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 43
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 141
  }
}
```

## 字节级差异

共发现 177 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x06
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
- 偏移量 0x16: TS=0x73 vs WASM=0x6f
- 偏移量 0x17: TS=0x5f vs WASM=0x62
- ... (显示前20个差异，总共177个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 48 |...<eval>._ret_H|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 6f 62 6a 65 63 74 2d 6d 65 74 68 6f 64 |es/object-method|
00000030: 73 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 05 |s.js............|
00000040: 00 00 33 01 01 00 00 00 00 00 00 40 e6 00 00 00 |..3........@....|
00000050: 01 b6 01 00 0b cb 4e e7 00 00 00 3b e6 00 00 00 |......N....;....|
00000060: 39 e8 00 00 00 43 e9 00 00 00 39 e6 00 00 00 43 |9....C....9....C|
00000070: 6a 00 00 00 cc 24 01 00 24 01 00 de da 28 02 00 |j....$..$....(..|
00000080: 00 00 16 00 00 11 18 08 09 07 05 1a 04 00 07 0c |................|
00000090: 0b 3e 18 3e 10 07 0f 2a 17 00                   |.>.>...*..|
```

### WASM
```
00000000: 05 06 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..H__tests__/fix|
00000010: 74 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6d 65 74 |tures/object-met|
00000020: 68 6f 64 73 2e 6a 73 06 6f 62 6a 02 78 0e 63 6f |hods.js.obj.x.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 02 79 0d c8 03 00 00 |nsole.log.y.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 05 01 01 30 |.... ..........0|
00000050: 00 ca 03 00 0d 08 ec 02 29 0b b8 4e e6 00 00 00 |........)..N....|
00000060: c2 00 56 6a 00 00 00 04 e3 39 e7 00 00 00 43 e8 |..Vj.....9....C.|
00000070: 00 00 00 68 00 00 43 6a 00 00 00 b9 24 01 00 24 |...h..Cj....$..$|
00000080: 01 00 0e 06 2f c8 03 10 00 00 00 14 0c 00 1b 0e |..../...........|
00000090: 1b 0a 11 06 20 08 11 0f 00 0c 42 07 01 00 01 01 |.... .....B.....|
000000a0: 01 02 00 00 0b 02 d2 03 00 01 00 10 00 01 00 08 |................|
000000b0: cb c7 42 e6 00 00 00 d3 9f 28 c8 03 0a 02 04 12 |..B......(......|
000000c0: 1e 1b 0a 07 03 07 1b 00                         |........|
```