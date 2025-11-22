# 字节码分析报告

**输入文件**: wasm-run.ts
**生成时间**: 2025-11-21T09:37:02.580Z

## 大小对比

- TypeScript编译器: 90 字节
- WASM编译器: 91 字节
- 差异: -1 字节 (-1.10%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "wasm-run.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 14
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 16
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 25,
    "tag": "0xd",
    "remaining": 65
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "wasm-run.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 14
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 16
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 18
    }
  ],
  "functionHeader": {
    "offset": 25,
    "tag": "0xd",
    "remaining": 66
  }
}
```

## 字节级差异

共发现 15 个字节差异:

- 偏移量 0x22: TS=0x00 vs WASM=0x20
- 偏移量 0x2d: TS=0x13 vs WASM=0x14
- 偏移量 0x4d: TS=0x29 vs WASM=0x06
- 偏移量 0x4e: TS=0xc8 vs WASM=0x2f
- 偏移量 0x4f: TS=0x03 vs WASM=0xc8
- 偏移量 0x50: TS=0x08 vs WASM=0x03
- 偏移量 0x51: TS=0x00 vs WASM=0x08
- 偏移量 0x53: TS=0x36 vs WASM=0x00
- 偏移量 0x54: TS=0x1e vs WASM=0x36
- 偏移量 0x55: TS=0x11 vs WASM=0x1e
- 偏移量 0x56: TS=0x08 vs WASM=0x11
- 偏移量 0x57: TS=0x11 vs WASM=0x08
- 偏移量 0x58: TS=0x03 vs WASM=0x11
- 偏移量 0x59: TS=0x00 vs WASM=0x03
- 偏移量 0x5a: TS=EOF vs WASM=0x00

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 16 77 61 73 6d 2d 72 75 6e 2e 6a 73 02 61 |...wasm-run.js.a|
00000010: 02 62 0c 72 65 73 75 6c 74 0d c8 03 00 00 00 00 |.b.result.......|
00000020: 00 0c 00 06 01 a4 01 00 00 00 02 03 00 13 00 ca |................|
00000030: 03 00 0d cc 03 01 0d ce 03 02 0d 08 ec 02 29 bf |..............).|
00000040: 14 e3 bf 16 e4 68 00 00 68 01 00 9f e5 29 c8 03 |.....h..h....)..|
00000050: 08 00 00 36 1e 11 08 11 03 00                   |...6......|
```

### WASM
```
00000000: 05 04 16 77 61 73 6d 2d 72 75 6e 2e 6a 73 02 61 |...wasm-run.js.a|
00000010: 02 62 0c 72 65 73 75 6c 74 0d c8 03 00 00 00 00 |.b.result.......|
00000020: 00 0c 20 06 01 a4 01 00 00 00 02 03 00 14 00 ca |.. .............|
00000030: 03 00 0d cc 03 01 0d ce 03 02 0d 08 ec 02 29 bf |..............).|
00000040: 14 e3 bf 16 e4 68 00 00 68 01 00 9f e5 06 2f c8 |.....h..h...../.|
00000050: 03 08 00 00 36 1e 11 08 11 03 00                |....6......|
```