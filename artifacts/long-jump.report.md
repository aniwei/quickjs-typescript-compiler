# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/long-jump.ts
**生成时间**: 2025-11-27T11:37:31.000Z

## 大小对比

- TypeScript编译器: 77 字节
- WASM编译器: 77 字节
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/long-jump.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xd",
    "remaining": 34
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/long-jump.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xd",
    "remaining": 34
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 01 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6e 67 2d 6a 75 6d 70 2e 6a 73 0d c8 03 00 00 |ong-jump.js.....|
00000030: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 00 00 06 |.... ...........|
00000040: 00 08 ec 02 29 06 2f c8 03 02 00 00 00          |....)./......|
```

### WASM
```
00000000: 05 01 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6e 67 2d 6a 75 6d 70 2e 6a 73 0d c8 03 00 00 |ong-jump.js.....|
00000030: 00 00 00 0c 20 06 01 a4 01 00 00 00 01 00 00 06 |.... ...........|
00000040: 00 08 ec 02 29 06 2f c8 03 02 00 00 00          |....)./......|
```