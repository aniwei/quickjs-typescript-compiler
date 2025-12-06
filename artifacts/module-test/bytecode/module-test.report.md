# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-test.ts
**生成时间**: 2025-12-06T02:09:56.444Z

## 大小对比

- TypeScript编译器: 120 字节
- WASM编译器: 124 字节
- 差异: -4 字节 (-3.23%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "./other",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 60
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "./other",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 64
  }
}
```

## 字节级差异

共发现 51 个字节差异:

- 偏移量 0x40: TS=0x01 vs WASM=0xca
- 偏移量 0x41: TS=0x00 vs WASM=0x03
- 偏移量 0x42: TS=0x01 vs WASM=0x02
- 偏移量 0x43: TS=0x00 vs WASM=0x01
- 偏移量 0x44: TS=0xca vs WASM=0x00
- 偏移量 0x45: TS=0x03 vs WASM=0x01
- 偏移量 0x46: TS=0x01 vs WASM=0xcc
- 偏移量 0x47: TS=0x01 vs WASM=0x03
- 偏移量 0x48: TS=0xcc vs WASM=0x00
- 偏移量 0x49: TS=0x03 vs WASM=0x01
- 偏移量 0x4f: TS=0x0c vs WASM=0x00
- 偏移量 0x50: TS=0x20 vs WASM=0x0c
- 偏移量 0x51: TS=0x06 vs WASM=0x20
- 偏移量 0x52: TS=0x01 vs WASM=0x06
- 偏移量 0x53: TS=0xa4 vs WASM=0x01
- 偏移量 0x54: TS=0x01 vs WASM=0xa4
- 偏移量 0x55: TS=0x00 vs WASM=0x01
- 偏移量 0x58: TS=0x03 vs WASM=0x00
- 偏移量 0x5a: TS=0x00 vs WASM=0x02
- 偏移量 0x5b: TS=0x0c vs WASM=0x00
- ... (显示前20个差异，总共51个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 74 65 73 74 2e 6a 73 0e 2e 2f |odule-test.js../|
00000030: 6f 74 68 65 72 0c 72 65 73 75 6c 74 0d c8 03 01 |other.result....|
00000040: 01 00 01 00 ca 03 01 01 cc 03 00 00 84 01 00 0c |................|
00000050: 20 06 01 a4 01 00 00 00 03 02 00 0c 00 84 01 00 | ...............|
00000060: 0d cc 03 01 0d 08 ec 02 29 68 00 00 b8 9f e4 06 |........)h......|
00000070: 2f c8 03 00 02 17 16 00                         |/.......|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 74 65 73 74 2e 6a 73 0e 2e 2f |odule-test.js../|
00000030: 6f 74 68 65 72 0c 72 65 73 75 6c 74 0d c8 03 01 |other.result....|
00000040: ca 03 02 01 00 01 cc 03 00 01 00 00 84 01 00 00 |................|
00000050: 0c 20 06 01 a4 01 00 00 00 02 02 00 0c 00 84 01 |. ..............|
00000060: 00 0c cc 03 00 0d 08 ec 02 29 68 00 00 b8 9f e4 |.........)h.....|
00000070: 06 2f c8 03 06 00 00 17 2c 16 0c 00             |./......,...|
```