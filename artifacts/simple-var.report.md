# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/simple-var.ts
**生成时间**: 2025-09-24T17:36:07.364Z

## 大小对比

- TypeScript编译器: 86 字节
- WASM编译器: 86 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-var.ts",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 40
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 40
  }
}
```

## 字节级差异

共发现 1 个字节差异:

- 偏移量 0x2a: TS=0x74 vs WASM=0x6a

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 76 61 72 2e 74 73 02 78 0d c8 |imple-var.ts.x..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |....... ........|
00000040: 01 00 08 00 ca 03 00 0d 08 ec 02 29 b8 e3 06 2f |...........).../|
00000050: c8 03 02 00 00 00                               |......|
```

### WASM
```
00000000: 05 02 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 76 61 72 2e 6a 73 02 78 0d c8 |imple-var.js.x..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 |....... ........|
00000040: 01 00 08 00 ca 03 00 0d 08 ec 02 29 b8 e3 06 2f |...........).../|
00000050: c8 03 02 00 00 00                               |......|
```