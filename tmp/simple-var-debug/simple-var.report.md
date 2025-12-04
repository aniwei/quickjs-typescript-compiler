# 字节码分析报告

**输入文件**: tmp/simple-var.ts
**生成时间**: 2025-12-03T04:26:24.892Z

## 大小对比

- TypeScript编译器: 71 字节
- WASM编译器: 70 字节
- 差异: 1 字节 (1.43%)

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
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "tmp/simple-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 22,
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
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "tmp/simple-var.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 22,
    "tag": "0xd",
    "remaining": 48
  }
}
```

## 字节级差异

共发现 17 个字节差异:

- 偏移量 0x2a: TS=0x0d vs WASM=0x0c
- 偏移量 0x36: TS=0xe3 vs WASM=0xe7
- 偏移量 0x37: TS=0xdf vs WASM=0xbc
- 偏移量 0x38: TS=0xbc vs WASM=0x9f
- 偏移量 0x39: TS=0x9f vs WASM=0xe3
- 偏移量 0x3a: TS=0xe3 vs WASM=0x06
- 偏移量 0x3b: TS=0x06 vs WASM=0x2f
- 偏移量 0x3c: TS=0x2f vs WASM=0xc8
- 偏移量 0x3d: TS=0xc8 vs WASM=0x03
- 偏移量 0x3e: TS=0x03 vs WASM=0x06
- 偏移量 0x3f: TS=0x06 vs WASM=0x00
- 偏移量 0x41: TS=0x00 vs WASM=0x21
- 偏移量 0x42: TS=0x26 vs WASM=0x00
- 偏移量 0x43: TS=0x00 vs WASM=0x0c
- 偏移量 0x44: TS=0x0c vs WASM=0x04
- 偏移量 0x45: TS=0x04 vs WASM=0x00
- 偏移量 0x46: TS=0x00 vs WASM=EOF

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 22 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |.."tmp/simple-va|
00000010: 72 2e 6a 73 02 61 0d c8 03 00 00 00 00 00 0c 20 |r.js.a......... |
00000020: 06 01 a4 01 00 00 00 02 01 00 0d 00 ca 03 00 01 |................|
00000030: 08 ec 02 29 bf 0a e3 df bc 9f e3 06 2f c8 03 06 |...)......../...|
00000040: 00 00 26 00 0c 04 00                            |..&....|
```

### WASM
```
00000000: 05 02 22 74 6d 70 2f 73 69 6d 70 6c 65 2d 76 61 |.."tmp/simple-va|
00000010: 72 2e 6a 73 02 61 0d c8 03 00 00 00 00 00 0c 20 |r.js.a......... |
00000020: 06 01 a4 01 00 00 00 02 01 00 0c 00 ca 03 00 01 |................|
00000030: 08 ec 02 29 bf 0a e7 bc 9f e3 06 2f c8 03 06 00 |...)......./....|
00000040: 00 21 00 0c 04 00                               |.!....|
```