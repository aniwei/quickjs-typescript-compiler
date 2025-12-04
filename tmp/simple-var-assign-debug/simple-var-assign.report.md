# 字节码分析报告

**输入文件**: tmp/simple-var-assign.ts
**生成时间**: 2025-12-03T04:28:58.839Z

## 大小对比

- TypeScript编译器: 78 字节
- WASM编译器: 77 字节
- 差异: 1 字节 (1.30%)

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
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "tmp/simple-var-assign.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 27
    }
  ],
  "functionHeader": {
    "offset": 29,
    "tag": "0xd",
    "remaining": 49
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
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "tmp/simple-var-assign.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 27
    }
  ],
  "functionHeader": {
    "offset": 29,
    "tag": "0xd",
    "remaining": 48
  }
}
```

## 字节级差异

共发现 17 个字节差异:

- 偏移量 0x31: TS=0x0d vs WASM=0x0c
- 偏移量 0x3d: TS=0xe3 vs WASM=0xe7
- 偏移量 0x3e: TS=0xdf vs WASM=0xb8
- 偏移量 0x3f: TS=0xb8 vs WASM=0x9f
- 偏移量 0x40: TS=0x9f vs WASM=0xe3
- 偏移量 0x41: TS=0xe3 vs WASM=0x06
- 偏移量 0x42: TS=0x06 vs WASM=0x2f
- 偏移量 0x43: TS=0x2f vs WASM=0xc8
- 偏移量 0x44: TS=0xc8 vs WASM=0x03
- 偏移量 0x45: TS=0x03 vs WASM=0x06
- 偏移量 0x46: TS=0x06 vs WASM=0x00
- 偏移量 0x48: TS=0x00 vs WASM=0x21
- 偏移量 0x49: TS=0x26 vs WASM=0x08
- 偏移量 0x4a: TS=0x08 vs WASM=0x0c
- 偏移量 0x4b: TS=0x0c vs WASM=0x04
- 偏移量 0x4c: TS=0x04 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 30 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..0tmp/simple-va|
00000010: 72 2d 61 73 73 69 67 6e 2e 6a 73 02 61 0d c8 03 |r-assign.js.a...|
00000020: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 01 |...... .........|
00000030: 00 0d 00 ca 03 00 01 08 ec 02 29 bf 0a e3 df b8 |..........).....|
00000040: 9f e3 06 2f c8 03 06 00 00 26 08 0c 04 00       |.../.....&....|
```

### WASM
```
00000000: 05 02 30 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |..0tmp/simple-va|
00000010: 72 2d 61 73 73 69 67 6e 2e 6a 73 02 61 0d c8 03 |r-assign.js.a...|
00000020: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 01 |...... .........|
00000030: 00 0c 00 ca 03 00 01 08 ec 02 29 bf 0a e7 b8 9f |..........).....|
00000040: e3 06 2f c8 03 06 00 00 21 08 0c 04 00          |../.....!....|
```