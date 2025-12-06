# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-in-loop.ts
**生成时间**: 2025-12-06T02:09:56.362Z

## 大小对比

- TypeScript编译器: 165 字节
- WASM编译器: 160 字节
- 差异: 5 字节 (3.13%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 6,
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
    "remaining": 96
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 6,
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
    "remaining": 91
  }
}
```

## 字节级差异

共发现 47 个字节差异:

- 偏移量 0x56: TS=0x03 vs WASM=0x04
- 偏移量 0x59: TS=0x33 vs WASM=0x2d
- 偏移量 0x77: TS=0x6e vs WASM=0xee
- 偏移量 0x78: TS=0x14 vs WASM=0x11
- 偏移量 0x79: TS=0x00 vs WASM=0xe4
- 偏移量 0x7a: TS=0x00 vs WASM=0x39
- 偏移量 0x7b: TS=0x00 vs WASM=0xe9
- 偏移量 0x7c: TS=0xe4 vs WASM=0x00
- 偏移量 0x7d: TS=0x39 vs WASM=0x00
- 偏移量 0x7e: TS=0xe9 vs WASM=0x00
- 偏移量 0x7f: TS=0x00 vs WASM=0x43
- 偏移量 0x80: TS=0x00 vs WASM=0xea
- 偏移量 0x82: TS=0x43 vs WASM=0x00
- 偏移量 0x83: TS=0xea vs WASM=0x00
- 偏移量 0x84: TS=0x00 vs WASM=0xe0
- 偏移量 0x85: TS=0x00 vs WASM=0x24
- 偏移量 0x86: TS=0x00 vs WASM=0x01
- 偏移量 0x87: TS=0xe0 vs WASM=0x00
- 偏移量 0x88: TS=0x24 vs WASM=0x0e
- 偏移量 0x89: TS=0x01 vs WASM=0x81
- ... (显示前20个差异，总共47个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 06 6f 62 |or-in-loop.js.ob|
00000030: 6a 06 6b 65 79 02 61 02 62 0e 63 6f 6e 73 6f 6c |j.key.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 02 00 33 00 ca 03 00 01 cc |.........3......|
00000060: 03 01 01 08 ec 02 29 0b b8 4e e7 00 00 00 b9 4e |......)..N.....N|
00000070: e8 00 00 00 e3 df 7e 6e 14 00 00 00 e4 39 e9 00 |......~n.....9..|
00000080: 00 00 43 ea 00 00 00 e0 24 01 00 0e 81 6c ee ff |..C.....$....l..|
00000090: ff ff 0e 0e 06 2f c8 03 00 0a 16 0a 07 05 20 06 |...../........ .|
000000a0: 26 7b 2b 72 00                                  |&{+r.|
```

### WASM
```
00000000: 05 07 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 06 6f 62 |or-in-loop.js.ob|
00000030: 6a 06 6b 65 79 02 61 02 62 0e 63 6f 6e 73 6f 6c |j.key.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 02 00 2d 00 ca 03 00 01 cc |.........-......|
00000060: 03 01 01 08 ec 02 29 0b b8 4e e7 00 00 00 b9 4e |......)..N.....N|
00000070: e8 00 00 00 e3 df 7e ee 11 e4 39 e9 00 00 00 43 |......~...9....C|
00000080: ea 00 00 00 e0 24 01 00 0e 81 ec ee 0e 0e 06 2f |.....$........./|
00000090: c8 03 0c 00 00 5d 20 1c 1b 1b 0e 1b 0a 07 01 00 |.....] .........|
```