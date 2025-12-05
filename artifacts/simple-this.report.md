# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/simple-this.ts
**生成时间**: 2025-12-05T03:02:25.869Z

## 大小对比

- TypeScript编译器: 129 字节
- WASM编译器: 130 字节
- 差异: -1 字节 (-0.77%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 49,
    "tag": "0xd",
    "remaining": 80
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
      "string": "__tests__/compiler/fixtures/simple-this.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 51,
    "tag": "0xd",
    "remaining": 79
  }
}
```

## 字节级差异

共发现 68 个字节差异:

- 偏移量 0x1: TS=0x02 vs WASM=0x03
- 偏移量 0x31: TS=0x0d vs WASM=0x02
- 偏移量 0x32: TS=0xc8 vs WASM=0x78
- 偏移量 0x33: TS=0x03 vs WASM=0x0d
- 偏移量 0x34: TS=0x00 vs WASM=0xc8
- 偏移量 0x35: TS=0x00 vs WASM=0x03
- 偏移量 0x39: TS=0x0c vs WASM=0x00
- 偏移量 0x3a: TS=0x20 vs WASM=0x00
- 偏移量 0x3b: TS=0x06 vs WASM=0x0c
- 偏移量 0x3c: TS=0x01 vs WASM=0x20
- 偏移量 0x3d: TS=0xa4 vs WASM=0x06
- 偏移量 0x3f: TS=0x00 vs WASM=0xa4
- 偏移量 0x42: TS=0x03 vs WASM=0x00
- 偏移量 0x45: TS=0x0e vs WASM=0x01
- 偏移量 0x47: TS=0xca vs WASM=0x09
- 偏移量 0x48: TS=0x03 vs WASM=0x00
- 偏移量 0x49: TS=0x00 vs WASM=0xca
- 偏移量 0x4a: TS=0x00 vs WASM=0x03
- 偏移量 0x4b: TS=0x08 vs WASM=0x00
- 偏移量 0x4c: TS=0xec vs WASM=0x01
- ... (显示前20个差异，总共68个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 74 68 69 73 2e 6a 73 06 42 61 |imple-this.js.Ba|
00000030: 72 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 |r......... .....|
00000040: 01 00 03 00 01 0e 01 ca 03 00 00 08 ec 02 29 03 |..............).|
00000050: 00 00 00 00 5b 00 00 06 2f c8 03 00 00 0c 00 04 |....[.../.......|
00000060: 00 ca 03 00 00 00 03 00 00 09 00 b8 42 e6 00 00 |............B...|
00000070: 00 b8 0e 29 c8 03 09 00 00 01 00 01 7f 00 05 01 |...)............|
00000080: 00                                              |.|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 74 68 69 73 2e 6a 73 06 42 61 |imple-this.js.Ba|
00000030: 72 02 78 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 |r.x......... ...|
00000040: 01 00 00 00 01 01 01 09 00 ca 03 00 01 08 ec 05 |................|
00000050: c2 00 e3 29 06 2f c8 03 02 00 00 00 0c 43 06 01 |...)./.......C..|
00000060: ca 03 00 01 00 02 00 00 0a 01 10 00 01 00 08 cb |................|
00000070: c7 b8 44 e6 00 00 00 29 c8 03 06 00 00 0d 08 07 |..D....)........|
00000080: 08 00                                           |..|
```