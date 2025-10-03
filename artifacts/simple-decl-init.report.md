# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/simple-decl-init.ts
**生成时间**: 2025-10-02T17:33:41.190Z

## 大小对比

- TypeScript编译器: 96 字节
- WASM编译器: 96 字节
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-decl-init.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 52,
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
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-decl-init.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xd",
    "remaining": 44
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 64 65 63 6c 2d 69 6e 69 74 2e |imple-decl-init.|
00000030: 6a 73 02 61 0d c8 03 00 00 00 00 00 0c 20 06 01 |js.a......... ..|
00000040: a4 01 00 00 00 02 01 00 0a 00 ca 03 00 0d 08 ec |................|
00000050: 02 29 b8 b9 9f e3 06 2f c8 03 04 00 00 20 18 00 |.)...../..... ..|
```

### WASM
```
00000000: 05 02 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 64 65 63 6c 2d 69 6e 69 74 2e |imple-decl-init.|
00000030: 6a 73 02 61 0d c8 03 00 00 00 00 00 0c 20 06 01 |js.a......... ..|
00000040: a4 01 00 00 00 02 01 00 0a 00 ca 03 00 0d 08 ec |................|
00000050: 02 29 b8 b9 9f e3 06 2f c8 03 04 00 00 20 18 00 |.)...../..... ..|
```