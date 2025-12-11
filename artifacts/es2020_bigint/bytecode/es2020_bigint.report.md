# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/es2020_bigint.ts
**生成时间**: 2025-12-11T11:32:28.055Z

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

共发现 57 个字节差异:

- 偏移量 0x70: TS=0xff vs WASM=0xec
- 偏移量 0x78: TS=0xf6 vs WASM=0xe3
- 偏移量 0x7e: TS=0xf7 vs WASM=0xe4
- 偏移量 0x7f: TS=0x64 vs WASM=0x68
- 偏移量 0x82: TS=0x64 vs WASM=0x68
- 偏移量 0x86: TS=0xf8 vs WASM=0xe5
- 偏移量 0x87: TS=0x64 vs WASM=0x68
- 偏移量 0x8a: TS=0x64 vs WASM=0x68
- 偏移量 0x8e: TS=0xf9 vs WASM=0xe6
- 偏移量 0x8f: TS=0x64 vs WASM=0x68
- 偏移量 0xa0: TS=0x64 vs WASM=0x68
- 偏移量 0xb1: TS=0x64 vs WASM=0x68
- 偏移量 0xc2: TS=0x64 vs WASM=0x68
- 偏移量 0xcd: TS=0x2e vs WASM=0x2a
- 偏移量 0xd0: TS=0x16 vs WASM=0x54
- 偏移量 0xd2: TS=0x21 vs WASM=0x11
- 偏移量 0xd3: TS=0x00 vs WASM=0x08
- 偏移量 0xd4: TS=0x21 vs WASM=0x11
- 偏移量 0xd5: TS=0x00 vs WASM=0x03
- 偏移量 0xd6: TS=0x25 vs WASM=0x0d
- ... (显示前20个差异，总共57个)

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
00000070: ff 02 29 b4 0a 00 00 00 f6 b4 14 00 00 00 f7 64 |..)............d|
00000080: 00 00 64 01 00 9f f8 64 00 00 64 01 00 9c f9 64 |..d....d..d....d|
00000090: 00 00 8e 61 04 00 39 ea 00 00 00 43 eb 00 00 00 |...a..9....C....|
000000a0: 64 02 00 24 01 00 0e 39 ea 00 00 00 43 eb 00 00 |d..$...9....C...|
000000b0: 00 64 03 00 24 01 00 0e 39 ea 00 00 00 43 eb 00 |.d..$...9....C..|
000000c0: 00 00 64 04 00 24 01 00 0e 06 2f c8 03 2e 00 00 |..d..$..../.....|
000000d0: 16 14 21 00 21 00 25 08 25 03 0d 03 25 08 25 03 |..!.!.%.%...%.%.|
000000e0: 0d 01 25 01 17 13 25 0e 1b 0a 25 01 17 15 25 0e |..%...%...%...%.|
000000f0: 1b 0a 25 01 17 15 25 0e 1b 0a 25 01 00          |..%...%...%..|
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