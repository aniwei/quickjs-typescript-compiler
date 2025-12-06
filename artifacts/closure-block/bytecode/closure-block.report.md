# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-block.ts
**生成时间**: 2025-12-06T02:09:56.307Z

## 大小对比

- TypeScript编译器: 209 字节
- WASM编译器: 238 字节
- 差异: -29 字节 (-12.18%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
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
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 170
  }
}
```

## 字节级差异

共发现 109 个字节差异:

- 偏移量 0x79: TS=0x00 vs WASM=0x0e
- 偏移量 0x7a: TS=0x04 vs WASM=0x00
- 偏移量 0x7c: TS=0x07 vs WASM=0x00
- 偏移量 0x7d: TS=0x08 vs WASM=0x07
- 偏移量 0x7e: TS=0x00 vs WASM=0x10
- 偏移量 0x80: TS=0x0c vs WASM=0x1b
- 偏移量 0x81: TS=0x42 vs WASM=0x0e
- 偏移量 0x82: TS=0x06 vs WASM=0x1b
- 偏移量 0x83: TS=0x00 vs WASM=0x0a
- 偏移量 0x84: TS=0xca vs WASM=0x07
- 偏移量 0x85: TS=0x03 vs WASM=0x08
- 偏移量 0x86: TS=0x00 vs WASM=0x07
- 偏移量 0x87: TS=0x02 vs WASM=0x09
- 偏移量 0x89: TS=0x03 vs WASM=0x0c
- 偏移量 0x8a: TS=0x00 vs WASM=0x43
- 偏移量 0x8b: TS=0x01 vs WASM=0x06
- 偏移量 0x8c: TS=0x0f vs WASM=0x01
- 偏移量 0x8d: TS=0x02 vs WASM=0xca
- 偏移量 0x8e: TS=0xd0 vs WASM=0x03
- 偏移量 0x8f: TS=0x03 vs WASM=0x00
- ... (显示前20个差异，总共109个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 6c 6f 63 6b 2e 6a 73 08 |losure-block.js.|
00000030: 74 65 73 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |test.console.log|
00000040: 02 66 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.f.x......... ..|
00000050: a4 01 00 00 00 03 01 01 19 00 ca 03 00 01 08 ec |................|
00000060: 05 c2 00 e3 29 39 e6 00 00 00 43 e7 00 00 00 df |....)9....C.....|
00000070: f0 24 01 00 0e 06 2f c8 03 00 04 00 07 08 00 00 |.$..../.........|
00000080: 0c 42 06 00 ca 03 00 02 00 03 00 01 0f 02 d0 03 |.B..............|
00000090: 01 00 20 d2 03 02 00 20 06 cb 01 0a 00 00 00 cc |.. .... ........|
000000a0: c2 00 cb c7 f0 28 29 c8 03 00 08 03 02 0e 0a 21 |.....()........!|
000000b0: 7c 13 01 00 0c 42 06 00 00 00 00 00 03 01 00 05 ||....B..........|
000000c0: 00 d2 03 01 09 68 00 00 28 29 c8 03 04 02 02 15 |.....h..()......|
000000d0: 00                                              |.|
```

### WASM
```
00000000: 05 06 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 6c 6f 63 6b 2e 6a 73 08 |losure-block.js.|
00000030: 74 65 73 74 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |test.console.log|
00000040: 02 66 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 |.f.x......... ..|
00000050: a4 01 00 00 00 03 01 01 19 00 ca 03 00 01 08 ec |................|
00000060: 05 c2 00 e3 29 39 e6 00 00 00 43 e7 00 00 00 df |....)9....C.....|
00000070: f0 24 01 00 0e 06 2f c8 03 0e 00 00 00 07 10 00 |.$..../.........|
00000080: 1b 0e 1b 0a 07 08 07 09 00 0c 43 06 01 ca 03 00 |..........C.....|
00000090: 02 00 02 00 01 20 02 d0 03 01 00 20 d2 03 02 01 |..... ..... ....|
000000a0: 60 63 00 00 06 cb 63 01 00 bf 0a cc c2 00 4f e8 |`c....c.......O.|
000000b0: 00 00 00 11 65 00 00 0e 6b 01 00 64 00 00 23 00 |....e...k..d..#.|
000000c0: 00 c8 03 0a 00 00 00 0b 08 08 4f 0a 11 0d 00 0c |..........O.....|
000000d0: 43 06 01 00 00 00 00 01 01 00 04 00 d2 03 01 09 |C...............|
000000e0: 68 00 00 28 c8 03 06 04 08 02 28 11 0d 00       |h..(......(...|
```