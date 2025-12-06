# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/array-literal.ts
**生成时间**: 2025-12-06T02:09:56.198Z

## 大小对比

- TypeScript编译器: 97 字节
- WASM编译器: 94 字节
- 差异: 3 字节 (3.19%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 48
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 45
  }
}
```

## 字节级差异

共发现 7 个字节差异:

- 偏移量 0x5a: TS=0x00 vs WASM=0x02
- 偏移量 0x5b: TS=0x04 vs WASM=0x00
- 偏移量 0x5c: TS=0x16 vs WASM=0x00
- 偏移量 0x5d: TS=0x0b vs WASM=0x00
- 偏移量 0x5e: TS=0x07 vs WASM=EOF
- 偏移量 0x5f: TS=0x03 vs WASM=EOF
- 偏移量 0x60: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6c 69 74 65 72 61 6c 2e 6a 73 02 |rray-literal.js.|
00000030: 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |x......... .....|
00000040: 00 00 03 01 00 0d 00 ca 03 00 0d 08 ec 02 29 b8 |..............).|
00000050: b9 ba 26 03 00 e3 06 2f c8 03 00 04 16 0b 07 03 |..&..../........|
00000060: 00                                              |.|
```

### WASM
```
00000000: 05 02 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6c 69 74 65 72 61 6c 2e 6a 73 02 |rray-literal.js.|
00000030: 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |x......... .....|
00000040: 00 00 03 01 00 0d 00 ca 03 00 0d 08 ec 02 29 b8 |..............).|
00000050: b9 ba 26 03 00 e3 06 2f c8 03 02 00 00 00       |..&..../......|
```