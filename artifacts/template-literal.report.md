# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/template-literal.ts
**生成时间**: 2025-11-27T11:37:31.059Z

## 大小对比

- TypeScript编译器: 89 字节
- WASM编译器: 111 字节
- 差异: -22 字节 (-19.82%)

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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/template-literal.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xd",
    "remaining": 39
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

共发现 57 个字节差异:

- 偏移量 0x1: TS=0x01 vs WASM=0x02
- 偏移量 0x32: TS=0x0d vs WASM=0x20
- 偏移量 0x33: TS=0xc8 vs WASM=0x74
- 偏移量 0x34: TS=0x03 vs WASM=0x65
- 偏移量 0x35: TS=0x00 vs WASM=0x6d
- 偏移量 0x36: TS=0x00 vs WASM=0x70
- 偏移量 0x37: TS=0x00 vs WASM=0x6c
- 偏移量 0x38: TS=0x00 vs WASM=0x61
- 偏移量 0x39: TS=0x00 vs WASM=0x74
- 偏移量 0x3a: TS=0x0c vs WASM=0x65
- 偏移量 0x3c: TS=0x06 vs WASM=0x6c
- 偏移量 0x3d: TS=0x01 vs WASM=0x69
- 偏移量 0x3e: TS=0xa4 vs WASM=0x74
- 偏移量 0x3f: TS=0x01 vs WASM=0x65
- 偏移量 0x40: TS=0x00 vs WASM=0x72
- 偏移量 0x41: TS=0x00 vs WASM=0x61
- 偏移量 0x42: TS=0x00 vs WASM=0x6c
- 偏移量 0x43: TS=0x01 vs WASM=0x0d
- 偏移量 0x44: TS=0x01 vs WASM=0xc8
- 偏移量 0x45: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共57个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 01 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 74 |piler/fixtures/t|
00000020: 65 6d 70 6c 61 74 65 2d 6c 69 74 65 72 61 6c 2e |emplate-literal.|
00000030: 6a 73 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 |js......... ....|
00000040: 00 00 00 01 01 00 07 00 84 01 00 0d 08 ec 02 29 |...............)|
00000050: e3 06 2f c8 03 02 00 00 00                      |../......|
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