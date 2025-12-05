# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/template-literal.ts
**生成时间**: 2025-12-05T10:54:37.220Z

## 大小对比

- TypeScript编译器: 177 字节
- WASM编译器: 165 字节
- 差异: 12 字节 (7.27%)

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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val: ",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "start ",
      "offset": 62
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " end",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 103
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "val: ",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "start ",
      "offset": 62
    },
    {
      "index": 6,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " end",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 91
  }
}
```

## 字节级差异

共发现 77 个字节差异:

- 偏移量 0x59: TS=0x03 vs WASM=0x00
- 偏移量 0x5b: TS=0x03 vs WASM=0x04
- 偏移量 0x5e: TS=0x2b vs WASM=0x2f
- 偏移量 0x5f: TS=0x03 vs WASM=0x00
- 偏移量 0x63: TS=0x00 vs WASM=0x0d
- 偏移量 0x64: TS=0x00 vs WASM=0xcc
- 偏移量 0x65: TS=0xcc vs WASM=0x03
- 偏移量 0x66: TS=0x03 vs WASM=0x01
- 偏移量 0x67: TS=0x00 vs WASM=0x0d
- 偏移量 0x68: TS=0x00 vs WASM=0xce
- 偏移量 0x69: TS=0x00 vs WASM=0x03
- 偏移量 0x6a: TS=0xce vs WASM=0x02
- 偏移量 0x6b: TS=0x03 vs WASM=0x0d
- 偏移量 0x6c: TS=0x00 vs WASM=0x08
- 偏移量 0x6d: TS=0x00 vs WASM=0xec
- 偏移量 0x6e: TS=0x00 vs WASM=0x02
- 偏移量 0x6f: TS=0xca vs WASM=0x29
- 偏移量 0x70: TS=0x03 vs WASM=0xb8
- 偏移量 0x71: TS=0x00 vs WASM=0xe3
- 偏移量 0x72: TS=0x01 vs WASM=0x04
- ... (显示前20个差异，总共77个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2e |emplate-literal.|
00000030: 6a 73 02 61 02 62 02 63 0a 76 61 6c 3a 20 0c 73 |js.a.b.c.val: .s|
00000040: 74 61 72 74 20 08 20 65 6e 64 0d c8 03 00 00 00 |tart . end......|
00000050: 00 00 0c 20 06 01 a4 01 00 03 00 03 03 00 2b 03 |... ..........+.|
00000060: ca 03 00 00 00 cc 03 00 00 00 ce 03 00 00 00 ca |................|
00000070: 03 00 01 cc 03 01 01 ce 03 02 01 08 ec 26 b8 e3 |.............&..|
00000080: 04 e8 00 00 00 43 5e 00 00 00 df 24 01 00 e4 04 |.....C^....$....|
00000090: e9 00 00 00 43 5e 00 00 00 df 04 ea 00 00 00 24 |....C^.........$|
000000a0: 02 00 e5 29 06 2f c8 03 01 06 00 05 01 00 0f 01 |...)./..........|
000000b0: 00                                              |.|
```

### WASM
```
00000000: 05 07 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2e |emplate-literal.|
00000030: 6a 73 02 61 02 62 02 63 0a 76 61 6c 3a 20 0c 73 |js.a.b.c.val: .s|
00000040: 74 61 72 74 20 08 20 65 6e 64 0d c8 03 00 00 00 |tart . end......|
00000050: 00 00 0c 20 06 01 a4 01 00 00 00 04 03 00 2f 00 |... ........../.|
00000060: ca 03 00 0d cc 03 01 0d ce 03 02 0d 08 ec 02 29 |...............)|
00000070: b8 e3 04 e8 00 00 00 43 5e 00 00 00 68 00 00 24 |.......C^...h..$|
00000080: 01 00 e4 04 e9 00 00 00 43 5e 00 00 00 68 00 00 |........C^...h..|
00000090: 04 ea 00 00 00 24 02 00 e5 06 2f c8 03 06 00 00 |.....$..../.....|
000000a0: 53 24 58 02 00                                  |S$X..|
```