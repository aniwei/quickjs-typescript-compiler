# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/in-operator.ts
**生成时间**: 2025-12-06T02:09:56.394Z

## 大小对比

- TypeScript编译器: 169 字节
- WASM编译器: 176 字节
- 差异: -7 字节 (-3.98%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/in-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "in_obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 101
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/in-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "in_obj",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 108
  }
}
```

## 字节级差异

共发现 24 个字节差异:

- 偏移量 0x55: TS=0x03 vs WASM=0x04
- 偏移量 0x98: TS=0x00 vs WASM=0x16
- 偏移量 0x99: TS=0x0e vs WASM=0x00
- 偏移量 0x9a: TS=0x16 vs WASM=0x00
- 偏移量 0x9b: TS=0x0d vs WASM=0x3f
- 偏移量 0x9c: TS=0x07 vs WASM=0x00
- 偏移量 0x9d: TS=0x05 vs WASM=0x1b
- 偏移量 0x9e: TS=0x26 vs WASM=0x0e
- 偏移量 0x9f: TS=0x6e vs WASM=0x34
- 偏移量 0xa0: TS=0x34 vs WASM=0x18
- 偏移量 0xa1: TS=0x0c vs WASM=0x07
- 偏移量 0xa2: TS=0x1b vs WASM=0x05
- 偏移量 0xa4: TS=0x21 vs WASM=0x09
- 偏移量 0xa5: TS=0x6d vs WASM=0x17
- 偏移量 0xa6: TS=0x34 vs WASM=0x15
- 偏移量 0xa7: TS=0x0c vs WASM=0x1b
- 偏移量 0xa8: TS=0x00 vs WASM=0x0e
- 偏移量 0xa9: TS=EOF vs WASM=0x34
- 偏移量 0xaa: TS=EOF vs WASM=0x18
- 偏移量 0xab: TS=EOF vs WASM=0x07
- ... (显示前20个差异，总共24个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 6e 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 69 6e |n-operator.js.in|
00000030: 5f 6f 62 6a 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |_obj.a.console.l|
00000040: 6f 67 02 62 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.b......... ..|
00000050: a4 01 00 00 00 03 01 00 38 00 ca 03 00 01 08 ec |........8.......|
00000060: 02 29 0b b8 4e e6 00 00 00 e3 39 e7 00 00 00 43 |.)..N.....9....C|
00000070: e8 00 00 00 04 e6 00 00 00 df aa 24 01 00 0e 39 |...........$...9|
00000080: e7 00 00 00 43 e8 00 00 00 04 e9 00 00 00 df aa |....C...........|
00000090: 24 01 00 0e 06 2f c8 03 00 0e 16 0d 07 05 26 6e |$..../........&n|
000000a0: 34 0c 1b 07 21 6d 34 0c 00                      |4...!m4..|
```

### WASM
```
00000000: 05 06 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 69 |piler/fixtures/i|
00000020: 6e 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 69 6e |n-operator.js.in|
00000030: 5f 6f 62 6a 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c |_obj.a.console.l|
00000040: 6f 67 02 62 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.b......... ..|
00000050: a4 01 00 00 00 04 01 00 38 00 ca 03 00 01 08 ec |........8.......|
00000060: 02 29 0b b8 4e e6 00 00 00 e3 39 e7 00 00 00 43 |.)..N.....9....C|
00000070: e8 00 00 00 04 e6 00 00 00 df aa 24 01 00 0e 39 |...........$...9|
00000080: e7 00 00 00 43 e8 00 00 00 04 e9 00 00 00 df aa |....C...........|
00000090: 24 01 00 0e 06 2f c8 03 16 00 00 3f 00 1b 0e 34 |$..../.....?...4|
000000a0: 18 07 05 07 09 17 15 1b 0e 34 18 07 05 07 09 00 |.........4......|
```