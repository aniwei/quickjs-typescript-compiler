# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/delete-expression.ts
**生成时间**: 2025-11-22T14:52:37.820Z

## 大小对比

- TypeScript编译器: 322 字节
- WASM编译器: 302 字节
- 差异: 20 字节 (6.62%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 73
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 79,
    "tag": "0xd",
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-expression.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 55
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 71
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xd",
    "remaining": 227
  }
}
```

## 字节级差异

共发现 200 个字节差异:

- 偏移量 0x1: TS=0x09 vs WASM=0x08
- 偏移量 0x4b: TS=0x06 vs WASM=0x0d
- 偏移量 0x4c: TS=0x73 vs WASM=0xc8
- 偏移量 0x4d: TS=0x74 vs WASM=0x03
- 偏移量 0x4e: TS=0x72 vs WASM=0x00
- 偏移量 0x4f: TS=0x0d vs WASM=0x00
- 偏移量 0x50: TS=0xc8 vs WASM=0x00
- 偏移量 0x51: TS=0x03 vs WASM=0x00
- 偏移量 0x53: TS=0x00 vs WASM=0x0c
- 偏移量 0x54: TS=0x00 vs WASM=0x20
- 偏移量 0x55: TS=0x00 vs WASM=0x06
- 偏移量 0x56: TS=0x00 vs WASM=0x01
- 偏移量 0x57: TS=0x0c vs WASM=0xa4
- 偏移量 0x58: TS=0x20 vs WASM=0x01
- 偏移量 0x59: TS=0x06 vs WASM=0x00
- 偏移量 0x5a: TS=0x01 vs WASM=0x00
- 偏移量 0x5b: TS=0xa4 vs WASM=0x00
- 偏移量 0x5c: TS=0x01 vs WASM=0x04
- 偏移量 0x5d: TS=0x00 vs WASM=0x01
- 偏移量 0x5f: TS=0x00 vs WASM=0x8e
- ... (显示前20个差异，总共200个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 65 78 70 72 65 73 73 69 6f 6e |elete-expression|
00000030: 2e 6a 73 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 |.js.obj.a.b.cons|
00000040: 6f 6c 65 06 6c 6f 67 02 63 02 64 06 73 74 72 0d |ole.log.c.d.str.|
00000050: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000060: 04 01 00 96 01 00 ca 03 00 0d 08 ec 02 29 0b b8 |.............)..|
00000070: 4e e6 00 00 00 b9 4e e7 00 00 00 e3 39 e8 00 00 |N.....N.....9...|
00000080: 00 43 e9 00 00 00 68 00 00 04 e6 00 00 00 9a 24 |.C....h........$|
00000090: 01 00 0e 39 e8 00 00 00 43 e9 00 00 00 68 00 00 |...9....C....h..|
000000a0: 04 e7 00 00 00 9a 24 01 00 0e 39 e8 00 00 00 43 |......$...9....C|
000000b0: e9 00 00 00 68 00 00 04 ea 00 00 00 9a 24 01 00 |....h........$..|
000000c0: 0e 39 e8 00 00 00 43 e9 00 00 00 68 00 00 04 eb |.9....C....h....|
000000d0: 00 00 00 9a 24 01 00 0e 39 e8 00 00 00 43 e9 00 |....$...9....C..|
000000e0: 00 00 b8 0e 0a 24 01 00 0e 39 e8 00 00 00 43 e9 |.....$...9....C.|
000000f0: 00 00 00 04 ec 00 00 00 0e 0a 24 01 00 0e 06 2f |..........$..../|
00000100: c8 03 3e 00 00 5d 00 1b 0e 1b 18 11 0d 20 01 17 |..>..]....... ..|
00000110: 15 1b 0e 1b 18 11 08 1b 15 07 01 17 15 1b 0e 1b |................|
00000120: 18 11 0d 20 01 17 15 1b 0e 1b 1a 11 0f 20 01 18 |... ......... ..|
00000130: 15 1b 0e 20 0a 0c 01 17 15 1b 0e 1b 18 1b 0d 0c |... ............|
00000140: 01 00                                           |..|
```

### WASM
```
00000000: 05 08 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 65 78 70 72 65 73 73 69 6f 6e |elete-expression|
00000030: 2e 6a 73 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 |.js.obj.a.b.cons|
00000040: 6f 6c 65 06 6c 6f 67 02 63 02 64 0d c8 03 00 00 |ole.log.c.d.....|
00000050: 00 00 00 0c 20 06 01 a4 01 00 00 00 04 01 00 8e |.... ...........|
00000060: 01 00 ca 03 00 0d 08 ec 02 29 0b b8 4e e6 00 00 |.........)..N...|
00000070: 00 b9 4e e7 00 00 00 e3 39 e8 00 00 00 43 e9 00 |..N.....9....C..|
00000080: 00 00 68 00 00 04 e6 00 00 00 9a 24 01 00 0e 39 |..h........$...9|
00000090: e8 00 00 00 43 e9 00 00 00 68 00 00 04 e7 00 00 |....C....h......|
000000a0: 00 9a 24 01 00 0e 39 e8 00 00 00 43 e9 00 00 00 |..$...9....C....|
000000b0: 68 00 00 04 ea 00 00 00 9a 24 01 00 0e 39 e8 00 |h........$...9..|
000000c0: 00 00 43 e9 00 00 00 68 00 00 04 eb 00 00 00 9a |..C....h........|
000000d0: 24 01 00 0e 39 e8 00 00 00 43 e9 00 00 00 0a 24 |$...9....C.....$|
000000e0: 01 00 0e 39 e8 00 00 00 43 e9 00 00 00 0a 24 01 |...9....C.....$.|
000000f0: 00 0e 06 2f c8 03 36 00 00 5d 00 1b 0e 1b 18 11 |.../..6..]......|
00000100: 06 20 15 17 15 1b 0e 1b 18 2a 06 07 15 17 15 1b |. .......*......|
00000110: 0e 1b 18 11 06 20 15 17 15 1b 0e 1b 18 11 06 20 |..... ......... |
00000120: 15 18 15 1b 0e 20 08 17 15 1b 0e 20 08 00       |..... ..... ..|
```