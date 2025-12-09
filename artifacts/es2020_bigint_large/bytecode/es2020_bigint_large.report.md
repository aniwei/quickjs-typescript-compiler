# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/es2020_bigint_large.ts
**生成时间**: 2025-12-09T08:59:51.480Z

## 大小对比

- TypeScript编译器: 188 字节
- WASM编译器: 184 字节
- 差异: 4 字节 (2.17%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/es2020_bigint_large.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 119
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/es2020_bigint_large.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 68 个字节差异:

- 偏移量 0x58: TS=0x00 vs WASM=0x02
- 偏移量 0x65: TS=0x2b vs WASM=0x02
- 偏移量 0x66: TS=0xc1 vs WASM=0x29
- 偏移量 0x67: TS=0x00 vs WASM=0xc1
- 偏移量 0x68: TS=0xe3 vs WASM=0x00
- 偏移量 0x69: TS=0xc1 vs WASM=0xe3
- 偏移量 0x6a: TS=0x01 vs WASM=0xc1
- 偏移量 0x6b: TS=0x8e vs WASM=0x01
- 偏移量 0x6c: TS=0xe4 vs WASM=0x8e
- 偏移量 0x6d: TS=0x39 vs WASM=0xe4
- 偏移量 0x6e: TS=0xe7 vs WASM=0x39
- 偏移量 0x6f: TS=0x00 vs WASM=0xe7
- 偏移量 0x72: TS=0x43 vs WASM=0x00
- 偏移量 0x73: TS=0xe8 vs WASM=0x43
- 偏移量 0x74: TS=0x00 vs WASM=0xe8
- 偏移量 0x77: TS=0x68 vs WASM=0x00
- 偏移量 0x78: TS=0x00 vs WASM=0x68
- 偏移量 0x7a: TS=0x24 vs WASM=0x00
- 偏移量 0x7b: TS=0x01 vs WASM=0x24
- 偏移量 0x7c: TS=0x00 vs WASM=0x01
- ... (显示前20个差异，总共68个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 73 32 30 32 30 5f 62 69 67 69 6e 74 5f 6c 61 72 |s2020_bigint_lar|
00000030: 67 65 2e 6a 73 02 61 02 62 0e 63 6f 6e 73 6f 6c |ge.js.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 02 00 2f 00 ca 03 00 0d cc |........./......|
00000060: 03 01 0d 08 ec 2b c1 00 e3 c1 01 8e e4 39 e7 00 |.....+.......9..|
00000070: 00 00 43 e8 00 00 00 68 00 00 24 01 00 0e 39 e7 |..C....h..$...9.|
00000080: 00 00 00 43 e8 00 00 00 68 01 00 24 01 00 0e 29 |...C....h..$...)|
00000090: 06 2f c8 03 18 00 00 11 14 12 02 0c 01 0d 13 1b |./..............|
000000a0: 0e 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 00 0a 05 |................|
000000b0: 00 00 00 80 00 0a 05 01 00 00 80 00             |............|
```

### WASM
```
00000000: 05 05 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 73 32 30 32 30 5f 62 69 67 69 6e 74 5f 6c 61 72 |s2020_bigint_lar|
00000030: 67 65 2e 6a 73 02 61 02 62 0e 63 6f 6e 73 6f 6c |ge.js.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 02 02 2f 00 ca 03 00 0d cc |........./......|
00000060: 03 01 0d 08 ec 02 29 c1 00 e3 c1 01 8e e4 39 e7 |......).......9.|
00000070: 00 00 00 43 e8 00 00 00 68 00 00 24 01 00 0e 39 |...C....h..$...9|
00000080: e7 00 00 00 43 e8 00 00 00 68 01 00 24 01 00 0e |....C....h..$...|
00000090: 06 2f c8 03 14 00 00 30 14 0d 13 1b 0e 1b 0a 11 |./.....0........|
000000a0: 01 17 15 1b 0e 1b 0a 11 01 00 0a 05 00 00 00 80 |................|
000000b0: 00 0a 05 01 00 00 80 00                         |........|
```