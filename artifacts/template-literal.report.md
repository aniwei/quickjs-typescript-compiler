# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/template-literal.ts
**生成时间**: 2025-10-03T03:51:33.935Z

## 大小对比

- TypeScript编译器: 111 字节
- WASM编译器: 111 字节
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
      "string": "__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "template literal",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 67,
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
      "string": "__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "template literal",
      "offset": 50
    }
  ],
  "functionHeader": {
    "offset": 67,
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
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2e |emplate-literal.|
00000030: 6a 73 20 74 65 6d 70 6c 61 74 65 20 6c 69 74 65 |js template lite|
00000040: 72 61 6c 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |ral......... ...|
00000050: 01 00 00 00 01 01 00 0c 00 84 01 00 0d 08 ec 02 |................|
00000060: 29 04 e5 00 00 00 e3 06 2f c8 03 02 00 00 00    |)......./......|
```

### WASM
```
00000000: 05 02 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2e |emplate-literal.|
00000030: 6a 73 20 74 65 6d 70 6c 61 74 65 20 6c 69 74 65 |js template lite|
00000040: 72 61 6c 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |ral......... ...|
00000050: 01 00 00 00 01 01 00 0c 00 84 01 00 0d 08 ec 02 |................|
00000060: 29 04 e5 00 00 00 e3 06 2f c8 03 02 00 00 00    |)......./......|
```