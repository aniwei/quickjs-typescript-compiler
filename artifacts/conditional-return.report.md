# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/conditional-return.ts
**生成时间**: 2025-10-02T17:08:47.785Z

## 大小对比

- TypeScript编译器: 164 字节
- WASM编译器: 164 字节
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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-return.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "adjust",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 105
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
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/conditional-return.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "adjust",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 105
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 72 65 74 75 72 |onditional-retur|
00000030: 6e 2e 6a 73 0c 61 64 6a 75 73 74 0d c8 03 00 00 |n.js.adjust.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0d |.... ...........|
00000050: 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df ba f1 0e |...........)....|
00000060: 06 2f c8 03 08 00 00 00 07 0c 00 0c 0c 00 0c 43 |./.............C|
00000070: 06 01 ca 03 01 00 01 02 00 00 0d 01 84 01 00 01 |................|
00000080: 00 d3 bc a6 ec 05 d3 b8 9f 28 d3 b8 a0 28 c8 03 |.........(...(..|
00000090: 12 00 00 03 10 0c 0c 12 02 0c 0c 07 19 09 06 0c |................|
000000a0: 0c 07 19 00                                     |....|
```

### WASM
```
00000000: 05 02 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 64 69 74 69 6f 6e 61 6c 2d 72 65 74 75 72 |onditional-retur|
00000030: 6e 2e 6a 73 0c 61 64 6a 75 73 74 0d c8 03 00 00 |n.js.adjust.....|
00000040: 00 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0d |.... ...........|
00000050: 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df ba f1 0e |...........)....|
00000060: 06 2f c8 03 08 00 00 00 07 0c 00 0c 0c 00 0c 43 |./.............C|
00000070: 06 01 ca 03 01 00 01 02 00 00 0d 01 84 01 00 01 |................|
00000080: 00 d3 bc a6 ec 05 d3 b8 9f 28 d3 b8 a0 28 c8 03 |.........(...(..|
00000090: 12 00 00 03 10 0c 0c 12 02 0c 0c 07 19 09 06 0c |................|
000000a0: 0c 07 19 00                                     |....|
```