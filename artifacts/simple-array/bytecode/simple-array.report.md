# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/simple-array.ts
**生成时间**: 2025-12-06T02:09:56.495Z

## 大小对比

- TypeScript编译器: 90 字节
- WASM编译器: 87 字节
- 差异: 3 字节 (3.45%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-array.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 44
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-array.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 41
  }
}
```

## 字节级差异

共发现 7 个字节差异:

- 偏移量 0x53: TS=0x00 vs WASM=0x02
- 偏移量 0x54: TS=0x04 vs WASM=0x00
- 偏移量 0x55: TS=0x16 vs WASM=0x00
- 偏移量 0x56: TS=0x01 vs WASM=0x00
- 偏移量 0x57: TS=0x07 vs WASM=EOF
- 偏移量 0x58: TS=0x03 vs WASM=EOF
- 偏移量 0x59: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 01 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 61 72 72 61 79 2e 6a 73 0d c8 |imple-array.js..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000040: 00 00 0d 00 08 ec 02 29 b8 b9 ba 26 03 00 0e 06 |.......)...&....|
00000050: 2f c8 03 00 04 16 01 07 03 00                   |/.........|
```

### WASM
```
00000000: 05 01 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 61 72 72 61 79 2e 6a 73 0d c8 |imple-array.js..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 |....... ........|
00000040: 00 00 0d 00 08 ec 02 29 b8 b9 ba 26 03 00 0e 06 |.......)...&....|
00000050: 2f c8 03 02 00 00 00                            |/......|
```