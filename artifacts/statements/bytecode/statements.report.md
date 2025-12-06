# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/statements.ts
**生成时间**: 2025-12-06T02:09:56.508Z

## 大小对比

- TypeScript编译器: 106 字节
- WASM编译器: 111 字节
- 差异: -5 字节 (-4.50%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xd",
    "remaining": 56
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/statements.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 48
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xd",
    "remaining": 61
  }
}
```

## 字节级差异

共发现 42 个字节差异:

- 偏移量 0x41: TS=0x00 vs WASM=0x03
- 偏移量 0x43: TS=0x03 vs WASM=0x01
- 偏移量 0x46: TS=0x17 vs WASM=0x12
- 偏移量 0x47: TS=0x00 vs WASM=0x03
- 偏移量 0x48: TS=0x08 vs WASM=0xca
- 偏移量 0x49: TS=0xec vs WASM=0x03
- 偏移量 0x4b: TS=0x29 vs WASM=0x00
- 偏移量 0x4c: TS=0xb8 vs WASM=0x20
- 偏移量 0x4d: TS=0xcb vs WASM=0xcc
- 偏移量 0x4e: TS=0x0a vs WASM=0x03
- 偏移量 0x4f: TS=0x6c vs WASM=0x04
- 偏移量 0x50: TS=0x0b vs WASM=0x00
- 偏移量 0x51: TS=0x00 vs WASM=0x20
- 偏移量 0x52: TS=0x00 vs WASM=0xce
- 偏移量 0x53: TS=0x00 vs WASM=0x03
- 偏移量 0x54: TS=0xb9 vs WASM=0x05
- 偏移量 0x55: TS=0xcc vs WASM=0x00
- 偏移量 0x56: TS=0x6e vs WASM=0x20
- 偏移量 0x57: TS=0x06 vs WASM=0x08
- 偏移量 0x58: TS=0x00 vs WASM=0xec
- ... (显示前20个差异，总共42个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 74 61 74 65 6d 65 6e 74 73 2e 6a 73 02 78 02 79 |tatements.js.x.y|
00000030: 02 7a 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.z......... ....|
00000040: 00 00 00 03 00 00 17 00 08 ec 02 29 b8 cb 0a 6c |...........)...l|
00000050: 0b 00 00 00 b9 cc 6e 06 00 00 00 ba cd 06 2f c8 |......n......./.|
00000060: 03 00 06 17 0a 0e 7a 21 06 00                   |......z!..|
```

### WASM
```
00000000: 05 04 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 74 61 74 65 6d 65 6e 74 73 2e 6a 73 02 78 02 79 |tatements.js.x.y|
00000030: 02 7a 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |.z......... ....|
00000040: 00 03 00 01 00 00 12 03 ca 03 02 00 20 cc 03 04 |............ ...|
00000050: 00 20 ce 03 05 00 20 08 ec 02 29 63 00 00 b8 cb |. .... ...)c....|
00000060: 63 01 00 b9 cc ee 01 06 2f c8 03 02 00 00 00    |c......./......|
```