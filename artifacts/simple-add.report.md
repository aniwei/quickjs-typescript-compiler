# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/simple-add.ts
**生成时间**: 2025-10-02T17:33:07.079Z

## 大小对比

- TypeScript编译器: 84 字节
- WASM编译器: 84 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-add.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 44,
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
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-add.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xd",
    "remaining": 40
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 01 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 61 64 64 2e 6a 73 0d c8 03 00 |imple-add.js....|
00000030: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 00 00 |..... ..........|
00000040: 0a 00 08 ec 02 29 b8 b9 9f 0e 06 2f c8 03 04 00 |.....)...../....|
00000050: 00 20 04 00                                     |. ..|
```

### WASM
```
00000000: 05 01 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 61 64 64 2e 6a 73 0d c8 03 00 |imple-add.js....|
00000030: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 00 00 |..... ..........|
00000040: 0a 00 08 ec 02 29 b8 b9 9f 0e 06 2f c8 03 04 00 |.....)...../....|
00000050: 00 20 04 00                                     |. ..|
```