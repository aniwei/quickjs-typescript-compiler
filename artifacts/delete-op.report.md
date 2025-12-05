# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/delete-op.ts
**生成时间**: 2025-12-05T01:04:01.323Z

## 大小对比

- TypeScript编译器: 121 字节
- WASM编译器: 123 字节
- 差异: -2 字节 (-1.63%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-op.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 72
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-op.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 74
  }
}
```

## 字节级差异

共发现 39 个字节差异:

- 偏移量 0x40: TS=0x01 vs WASM=0x00
- 偏移量 0x42: TS=0x03 vs WASM=0x02
- 偏移量 0x43: TS=0x00 vs WASM=0x01
- 偏移量 0x45: TS=0x24 vs WASM=0x22
- 偏移量 0x46: TS=0x01 vs WASM=0x00
- 偏移量 0x4a: TS=0x00 vs WASM=0x0d
- 偏移量 0x56: TS=0x5b vs WASM=0xe3
- 偏移量 0x57: TS=0x00 vs WASM=0x68
- 偏移量 0x59: TS=0x5a vs WASM=0x00
- 偏移量 0x5a: TS=0x00 vs WASM=0x04
- 偏移量 0x5b: TS=0x00 vs WASM=0xe6
- 偏移量 0x5c: TS=0x04 vs WASM=0x00
- 偏移量 0x5d: TS=0xe6 vs WASM=0x00
- 偏移量 0x5f: TS=0x00 vs WASM=0x9a
- 偏移量 0x60: TS=0x00 vs WASM=0x0e
- 偏移量 0x61: TS=0x9a vs WASM=0x68
- 偏移量 0x62: TS=0x0e vs WASM=0x00
- 偏移量 0x63: TS=0x5a vs WASM=0x00
- 偏移量 0x64: TS=0x00 vs WASM=0x04
- 偏移量 0x65: TS=0x00 vs WASM=0xe6
- ... (显示前20个差异，总共39个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 6f 70 2e 6a 73 06 6f 62 6a 02 |elete-op.js.obj.|
00000030: 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |a......... .....|
00000040: 01 00 03 00 00 24 01 ca 03 00 00 08 ec 02 29 0b |.....$........).|
00000050: b8 4e e6 00 00 00 5b 00 00 5a 00 00 04 e6 00 00 |.N....[..Z......|
00000060: 00 9a 0e 5a 00 00 04 e6 00 00 00 9a 0e 06 2f c8 |...Z........../.|
00000070: 03 06 00 0e 01 00 0a 01 00                      |.........|
```

### WASM
```
00000000: 05 03 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 6f 70 2e 6a 73 06 6f 62 6a 02 |elete-op.js.obj.|
00000030: 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |a......... .....|
00000040: 00 00 02 01 00 22 00 ca 03 00 0d 08 ec 02 29 0b |....."........).|
00000050: b8 4e e6 00 00 00 e3 68 00 00 04 e6 00 00 00 9a |.N.....h........|
00000060: 0e 68 00 00 04 e6 00 00 00 9a 0e 06 2f c8 03 0a |.h........../...|
00000070: 00 00 3f 0e 11 06 26 05 2a 06 00                |..?...&.*..|
```