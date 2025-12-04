# 字节码分析报告

**输入文件**: tmp/simple-var-assign-chain.ts
**生成时间**: 2025-12-03T04:31:25.685Z

## 大小对比

- TypeScript编译器: 92 字节
- WASM编译器: 90 字节
- 差异: 2 字节 (2.22%)

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
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "tmp/simple-var-assign-chain.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 33
    }
  ],
  "functionHeader": {
    "offset": 35,
    "tag": "0xd",
    "remaining": 57
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
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "tmp/simple-var-assign-chain.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 33
    }
  ],
  "functionHeader": {
    "offset": 35,
    "tag": "0xd",
    "remaining": 55
  }
}
```

## 字节级差异

共发现 26 个字节差异:

- 偏移量 0x37: TS=0x11 vs WASM=0x0f
- 偏移量 0x43: TS=0xe3 vs WASM=0xe7
- 偏移量 0x44: TS=0xdf vs WASM=0xb8
- 偏移量 0x45: TS=0xb8 vs WASM=0x9f
- 偏移量 0x46: TS=0x9f vs WASM=0xe7
- 偏移量 0x47: TS=0xe3 vs WASM=0xb9
- 偏移量 0x48: TS=0xdf vs WASM=0x9f
- 偏移量 0x49: TS=0xb9 vs WASM=0xe3
- 偏移量 0x4a: TS=0x9f vs WASM=0x06
- 偏移量 0x4b: TS=0xe3 vs WASM=0x2f
- 偏移量 0x4c: TS=0x06 vs WASM=0xc8
- 偏移量 0x4d: TS=0x2f vs WASM=0x03
- 偏移量 0x4e: TS=0xc8 vs WASM=0x0a
- 偏移量 0x4f: TS=0x03 vs WASM=0x00
- 偏移量 0x50: TS=0x0a vs WASM=0x00
- 偏移量 0x51: TS=0x00 vs WASM=0x21
- 偏移量 0x52: TS=0x00 vs WASM=0x08
- 偏移量 0x53: TS=0x26 vs WASM=0x0c
- 偏移量 0x54: TS=0x08 vs WASM=0x04
- 偏移量 0x55: TS=0x0c vs WASM=0x0d
- ... (显示前20个差异，总共26个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 3c 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..<tmp/simple-va|
00000010: 72 2d 61 73 73 69 67 6e 2d 63 68 61 69 6e 2e 6a |r-assign-chain.j|
00000020: 73 02 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |s.a......... ...|
00000030: 01 00 00 00 02 01 00 11 00 ca 03 00 01 08 ec 02 |................|
00000040: 29 bf 0a e3 df b8 9f e3 df b9 9f e3 06 2f c8 03 |)............/..|
00000050: 0a 00 00 26 08 0c 04 0d 03 0c 04 00             |...&........|
```

### WASM
```
00000000: 05 02 3c 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..<tmp/simple-va|
00000010: 72 2d 61 73 73 69 67 6e 2d 63 68 61 69 6e 2e 6a |r-assign-chain.j|
00000020: 73 02 61 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |s.a......... ...|
00000030: 01 00 00 00 02 01 00 0f 00 ca 03 00 01 08 ec 02 |................|
00000040: 29 bf 0a e7 b8 9f e7 b9 9f e3 06 2f c8 03 0a 00 |)........../....|
00000050: 00 21 08 0c 04 0d 03 07 04 00                   |.!........|
```