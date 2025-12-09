# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/es2020_bigint.ts
**生成时间**: 2025-12-09T08:59:51.483Z

## 大小对比

- TypeScript编译器: 253 字节
- WASM编译器: 249 字节
- 差异: 4 字节 (1.61%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/es2020_bigint.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 7,
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
    "remaining": 184
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/es2020_bigint.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 7,
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
    "remaining": 180
  }
}
```

## 字节级差异

共发现 111 个字节差异:

- 偏移量 0x71: TS=0x58 vs WASM=0x02
- 偏移量 0x72: TS=0xb4 vs WASM=0x29
- 偏移量 0x73: TS=0x0a vs WASM=0xb4
- 偏移量 0x74: TS=0x00 vs WASM=0x0a
- 偏移量 0x77: TS=0xe3 vs WASM=0x00
- 偏移量 0x78: TS=0xb4 vs WASM=0xe3
- 偏移量 0x79: TS=0x14 vs WASM=0xb4
- 偏移量 0x7a: TS=0x00 vs WASM=0x14
- 偏移量 0x7d: TS=0xe4 vs WASM=0x00
- 偏移量 0x7e: TS=0x68 vs WASM=0xe4
- 偏移量 0x7f: TS=0x00 vs WASM=0x68
- 偏移量 0x81: TS=0x68 vs WASM=0x00
- 偏移量 0x82: TS=0x01 vs WASM=0x68
- 偏移量 0x83: TS=0x00 vs WASM=0x01
- 偏移量 0x84: TS=0x9f vs WASM=0x00
- 偏移量 0x85: TS=0xe5 vs WASM=0x9f
- 偏移量 0x86: TS=0x68 vs WASM=0xe5
- 偏移量 0x87: TS=0x00 vs WASM=0x68
- 偏移量 0x89: TS=0x68 vs WASM=0x00
- 偏移量 0x8a: TS=0x01 vs WASM=0x68
- ... (显示前20个差异，总共111个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 73 32 30 32 30 5f 62 69 67 69 6e 74 2e 6a 73 02 |s2020_bigint.js.|
00000030: 61 02 62 02 63 02 64 02 65 0e 63 6f 6e 73 6f 6c |a.b.c.d.e.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 05 00 5c 00 ca 03 00 0d cc |.........\......|
00000060: 03 01 0d ce 03 02 0d d0 03 03 0d d2 03 04 0d 08 |................|
00000070: ec 58 b4 0a 00 00 00 e3 b4 14 00 00 00 e4 68 00 |.X............h.|
00000080: 00 68 01 00 9f e5 68 00 00 68 01 00 9c e6 68 00 |.h....h..h....h.|
00000090: 00 8e 61 04 00 39 ea 00 00 00 43 eb 00 00 00 68 |..a..9....C....h|
000000a0: 02 00 24 01 00 0e 39 ea 00 00 00 43 eb 00 00 00 |..$...9....C....|
000000b0: 68 03 00 24 01 00 0e 39 ea 00 00 00 43 eb 00 00 |h..$...9....C...|
000000c0: 00 68 04 00 24 01 00 0e 29 06 2f c8 03 2e 00 00 |.h..$...)./.....|
000000d0: 11 14 21 00 21 00 11 08 11 03 0d 03 11 08 11 03 |..!.!...........|
000000e0: 0d 01 11 01 17 13 1b 0e 1b 0a 11 01 17 15 1b 0e |................|
000000f0: 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 00          |.............|
```

### WASM
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 65 |piler/fixtures/e|
00000020: 73 32 30 32 30 5f 62 69 67 69 6e 74 2e 6a 73 02 |s2020_bigint.js.|
00000030: 61 02 62 02 63 02 64 02 65 0e 63 6f 6e 73 6f 6c |a.b.c.d.e.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 05 00 5c 00 ca 03 00 0d cc |.........\......|
00000060: 03 01 0d ce 03 02 0d d0 03 03 0d d2 03 04 0d 08 |................|
00000070: ec 02 29 b4 0a 00 00 00 e3 b4 14 00 00 00 e4 68 |..)............h|
00000080: 00 00 68 01 00 9f e5 68 00 00 68 01 00 9c e6 68 |..h....h..h....h|
00000090: 00 00 8e 61 04 00 39 ea 00 00 00 43 eb 00 00 00 |...a..9....C....|
000000a0: 68 02 00 24 01 00 0e 39 ea 00 00 00 43 eb 00 00 |h..$...9....C...|
000000b0: 00 68 03 00 24 01 00 0e 39 ea 00 00 00 43 eb 00 |.h..$...9....C..|
000000c0: 00 00 68 04 00 24 01 00 0e 06 2f c8 03 2a 00 00 |..h..$..../..*..|
000000d0: 54 14 11 08 11 03 0d 03 11 08 11 03 0d 01 11 01 |T...............|
000000e0: 17 13 1b 0e 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 |................|
000000f0: 17 15 1b 0e 1b 0a 11 01 00                      |.........|
```