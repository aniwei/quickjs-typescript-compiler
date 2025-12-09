# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/es2020_bigint_large.ts
**生成时间**: 2025-12-09T10:04:42.110Z

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

共发现 34 个字节差异:

- 偏移量 0x58: TS=0x00 vs WASM=0x02
- 偏移量 0x94: TS=0x18 vs WASM=0x14
- 偏移量 0x97: TS=0x16 vs WASM=0x30
- 偏移量 0x99: TS=0x12 vs WASM=0x0d
- 偏移量 0x9a: TS=0x02 vs WASM=0x13
- 偏移量 0x9b: TS=0x0c vs WASM=0x1b
- 偏移量 0x9c: TS=0x01 vs WASM=0x0e
- 偏移量 0x9d: TS=0x0d vs WASM=0x1b
- 偏移量 0x9e: TS=0x13 vs WASM=0x0a
- 偏移量 0x9f: TS=0x1b vs WASM=0x11
- 偏移量 0xa0: TS=0x0e vs WASM=0x01
- 偏移量 0xa1: TS=0x1b vs WASM=0x17
- 偏移量 0xa2: TS=0x0a vs WASM=0x15
- 偏移量 0xa3: TS=0x11 vs WASM=0x1b
- 偏移量 0xa4: TS=0x01 vs WASM=0x0e
- 偏移量 0xa5: TS=0x17 vs WASM=0x1b
- 偏移量 0xa6: TS=0x15 vs WASM=0x0a
- 偏移量 0xa7: TS=0x1b vs WASM=0x11
- 偏移量 0xa8: TS=0x0e vs WASM=0x01
- 偏移量 0xa9: TS=0x1b vs WASM=0x00
- ... (显示前20个差异，总共34个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 73 32 30 32 30 5f 62 69 67 69 6e 74 5f 6c 61 72 |s2020_bigint_lar|
00000030: 67 65 2e 6a 73 02 61 02 62 0e 63 6f 6e 73 6f 6c |ge.js.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 02 00 2f 00 ca 03 00 0d cc |........./......|
00000060: 03 01 0d 08 ec 02 29 c1 00 e3 c1 01 8e e4 39 e7 |......).......9.|
00000070: 00 00 00 43 e8 00 00 00 68 00 00 24 01 00 0e 39 |...C....h..$...9|
00000080: e7 00 00 00 43 e8 00 00 00 68 01 00 24 01 00 0e |....C....h..$...|
00000090: 06 2f c8 03 18 00 00 16 14 12 02 0c 01 0d 13 1b |./..............|
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