# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/es2020_bigint.ts
**生成时间**: 2025-12-12T09:59:18.520Z

## 大小对比

- TypeScript编译器: 294 字节
- WASM编译器: 240 字节
- 差异: 54 字节 (22.50%)

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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xc",
    "remaining": 243
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/es2020_bigint.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 42
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 44
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 46
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 48
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 56
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 180
  }
}
```

## 字节级差异

共发现 263 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x08
- 偏移量 0x2: TS=0x0c vs WASM=0x46
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
- 偏移量 0xf: TS=0x46 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x65
- 偏移量 0x17: TS=0x5f vs WASM=0x73
- ... (显示前20个差异，总共263个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 46 |...<eval>._ret_F|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 65 73 32 30 32 30 5f 62 69 67 69 6e 74 |es/es2020_bigint|
00000030: 2e 6a 73 0c 02 06 00 00 00 00 00 00 01 00 03 00 |.js.............|
00000040: 00 9b 01 01 01 00 00 00 00 00 00 40 e6 00 00 00 |...........@....|
00000050: 01 40 e7 00 00 00 01 40 e8 00 00 00 01 40 e9 00 |.@.....@.....@..|
00000060: 00 00 01 40 ea 00 00 00 01 b6 01 00 b4 0a 00 00 |...@............|
00000070: 00 3b e6 00 00 00 b4 14 00 00 00 3b e7 00 00 00 |.;.........;....|
00000080: 39 e6 00 00 00 39 e7 00 00 00 9f 3b e8 00 00 00 |9....9.....;....|
00000090: 39 e6 00 00 00 39 e7 00 00 00 9c 3b e9 00 00 00 |9....9.....;....|
000000a0: 39 e6 00 00 00 8e 3b ea 00 00 00 39 eb 00 00 00 |9.....;....9....|
000000b0: 43 ec 00 00 00 39 e8 00 00 00 24 01 00 de 39 eb |C....9....$...9.|
000000c0: 00 00 00 43 ec 00 00 00 39 e9 00 00 00 24 01 00 |...C....9....$..|
000000d0: de 39 eb 00 00 00 43 ec 00 00 00 39 ea 00 00 00 |.9....C....9....|
000000e0: 24 01 00 de da 28 02 00 00 00 3a 00 00 11 14 1b |$....(....:.....|
000000f0: 07 26 0b 02 14 1b 07 26 0b 02 14 25 08 25 03 07 |.&.....&...%.%..|
00000100: 0b 26 0b 02 14 25 08 25 03 07 0b 26 0b 02 16 25 |.&...%.%...&...%|
00000110: 01 07 07 26 0b 3e 18 25 17 3a 00 3e 18 25 17 3a |...&.>.%.:.>.%.:|
00000120: 00 3e 18 25 17 00                               |.>.%..|
```

### WASM
```
00000000: 05 08 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..F__tests__/fix|
00000010: 74 75 72 65 73 2f 65 73 32 30 32 30 5f 62 69 67 |tures/es2020_big|
00000020: 69 6e 74 2e 6a 73 02 61 02 62 02 63 02 64 02 65 |int.js.a.b.c.d.e|
00000030: 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 |.console.log....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 05 00 |..... ..........|
00000050: 5c 00 ca 03 00 0d cc 03 01 0d ce 03 02 0d d0 03 |\...............|
00000060: 03 0d d2 03 04 0d 08 ec 02 29 b4 0a 00 00 00 e3 |.........)......|
00000070: b4 14 00 00 00 e4 68 00 00 68 01 00 9f e5 68 00 |......h..h....h.|
00000080: 00 68 01 00 9c e6 68 00 00 8e 61 04 00 39 ea 00 |.h....h...a..9..|
00000090: 00 00 43 eb 00 00 00 68 02 00 24 01 00 0e 39 ea |..C....h..$...9.|
000000a0: 00 00 00 43 eb 00 00 00 68 03 00 24 01 00 0e 39 |...C....h..$...9|
000000b0: ea 00 00 00 43 eb 00 00 00 68 04 00 24 01 00 0e |....C....h..$...|
000000c0: 06 2f c8 03 2a 00 00 54 14 11 08 11 03 0d 03 11 |./..*..T........|
000000d0: 08 11 03 0d 01 11 01 17 13 1b 0e 1b 0a 11 01 17 |................|
000000e0: 15 1b 0e 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 00 |................|
```