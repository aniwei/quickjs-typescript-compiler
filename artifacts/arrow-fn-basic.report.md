# 字节码分析报告

**输入文件**: /Users/weiyanhai/Desktop/workspace/quickjs-typescript-compiler/__tests__/compiler/fixtures/arrow-fn-basic.ts
**生成时间**: 2025-10-11T10:43:16.258Z

## 大小对比

- TypeScript编译器: 322 字节
- WASM编译器: 322 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "double",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "arrArrow",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 64
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "map",
      "offset": 68
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fn",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 75
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 77
    },
    {
      "index": 8,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xd",
    "remaining": 240
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arrow-fn-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "double",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "arrArrow",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 64
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "map",
      "offset": 68
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "fn",
      "offset": 72
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 75
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 77
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 79
    }
  ],
  "functionHeader": {
    "offset": 81,
    "tag": "0xd",
    "remaining": 241
  }
}
```

## 字节级差异

共发现 198 个字节差异:

- 偏移量 0x1: TS=0x0a vs WASM=0x09
- 偏移量 0x4f: TS=0x00 vs WASM=0x02
- 偏移量 0x50: TS=0x02 vs WASM=0x78
- 偏移量 0x51: TS=0x78 vs WASM=0x0d
- 偏移量 0x52: TS=0x0d vs WASM=0xc8
- 偏移量 0x53: TS=0xc8 vs WASM=0x03
- 偏移量 0x54: TS=0x03 vs WASM=0x00
- 偏移量 0x59: TS=0x00 vs WASM=0x0c
- 偏移量 0x5a: TS=0x0c vs WASM=0x20
- 偏移量 0x5b: TS=0x20 vs WASM=0x06
- 偏移量 0x5c: TS=0x06 vs WASM=0x01
- 偏移量 0x5d: TS=0x01 vs WASM=0xa4
- 偏移量 0x5e: TS=0xa4 vs WASM=0x01
- 偏移量 0x5f: TS=0x01 vs WASM=0x00
- 偏移量 0x62: TS=0x00 vs WASM=0x03
- 偏移量 0x63: TS=0x03 vs WASM=0x04
- 偏移量 0x65: TS=0x04 vs WASM=0x35
- 偏移量 0x66: TS=0x26 vs WASM=0x00
- 偏移量 0x67: TS=0x00 vs WASM=0xd4
- 偏移量 0x68: TS=0xd4 vs WASM=0x01
- ... (显示前20个差异，总共198个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0c 64 6f 75 62 6c 65 10 61 72 72 41 72 72 6f 77 |.double.arrArrow|
00000040: 06 6f 62 6a 06 6d 61 70 04 66 6e 02 61 02 62 00 |.obj.map.fn.a.b.|
00000050: 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.x......... ....|
00000060: 00 00 00 03 04 04 26 00 d4 01 00 0d ca 03 01 0d |......&.........|
00000070: cc 03 02 0d ce 03 03 0d 08 ec 02 29 c2 00 e3 c2 |...........)....|
00000080: 01 e4 b8 b9 ba 26 03 00 43 e8 00 00 00 c2 02 24 |.....&..C......$|
00000090: 01 00 e5 0b c2 03 4e e9 00 00 00 e6 06 2f c8 03 |......N....../..|
000000a0: 12 00 00 16 18 12 06 32 12 1b 0a 0c 01 17 1f 07 |.......2........|
000000b0: 0c 0c 07 00 0c 02 06 01 d8 03 02 00 02 02 00 00 |................|
000000c0: 04 02 d4 03 00 01 00 d6 03 00 01 00 d3 d4 9f 28 |...............(|
000000d0: c8 03 08 00 0c 02 14 07 08 07 03 00 0c 02 06 01 |................|
000000e0: d8 03 01 00 01 02 00 00 04 01 da 03 00 01 00 d3 |................|
000000f0: b9 9c 28 c8 03 08 01 0f 03 0b 0c 04 07 11 00 0c |..(.............|
00000100: 02 06 01 d8 03 01 00 01 02 00 00 05 01 da 03 00 |................|
00000110: 01 00 d3 bf 0a 9c 28 c8 03 06 04 1d 02 0a 11 04 |......(.........|
00000120: 00 0c 02 06 01 d8 03 01 00 01 02 00 00 04 01 da |................|
00000130: 03 00 01 00 d3 b8 9f 28 c8 03 06 05 12 02 0e 0c |.......(........|
00000140: 04 00                                           |..|
```

### WASM
```
00000000: 05 09 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 6f 77 2d 66 6e 2d 62 61 73 69 63 2e 6a 73 |rrow-fn-basic.js|
00000030: 0c 64 6f 75 62 6c 65 10 61 72 72 41 72 72 6f 77 |.double.arrArrow|
00000040: 06 6f 62 6a 06 6d 61 70 04 66 6e 02 61 02 62 02 |.obj.map.fn.a.b.|
00000050: 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |x......... .....|
00000060: 00 00 03 04 04 35 00 d4 01 00 0d ca 03 01 0d cc |.....5..........|
00000070: 03 02 0d ce 03 03 0d 08 ec 02 29 c2 00 4f 6a 00 |..........)..Oj.|
00000080: 00 00 e3 c2 01 4f e5 00 00 00 e4 b8 b9 ba 26 03 |.....O........&.|
00000090: 00 43 e8 00 00 00 c2 02 24 01 00 e5 0b c2 03 4f |.C......$......O|
000000a0: e9 00 00 00 4e e9 00 00 00 e6 06 2f c8 03 08 00 |....N....../....|
000000b0: 00 00 1a 08 30 25 08 00 0c 02 06 01 00 02 00 02 |....0%..........|
000000c0: 02 00 00 04 02 d4 03 00 01 00 d6 03 00 01 00 d3 |................|
000000d0: d4 9f 28 c8 03 08 00 0c 02 14 07 08 07 03 00 0c |..(.............|
000000e0: 02 06 01 00 01 00 01 02 00 00 04 01 d8 03 00 01 |................|
000000f0: 00 d3 b9 9c 28 c8 03 08 01 0f 03 0b 0c 04 07 11 |....(...........|
00000100: 00 0c 02 06 01 00 01 00 01 02 00 00 05 01 d8 03 |................|
00000110: 00 01 00 d3 bf 0a 9c 28 c8 03 06 04 1d 02 0a 11 |.......(........|
00000120: 04 00 0c 02 06 01 00 01 00 01 02 00 00 04 01 d8 |................|
00000130: 03 00 01 00 d3 b8 9f 28 c8 03 06 05 12 02 0e 0c |.......(........|
00000140: 04 00                                           |..|
```