# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/return-in-loop.ts
**生成时间**: 2025-12-06T02:09:56.490Z

## 大小对比

- TypeScript编译器: 150 字节
- WASM编译器: 151 字节
- 差异: -1 字节 (-0.66%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/return-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 95
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/return-in-loop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 96
  }
}
```

## 字节级差异

共发现 51 个字节差异:

- 偏移量 0x48: TS=0x03 vs WASM=0x01
- 偏移量 0x5c: TS=0x00 vs WASM=0x02
- 偏移量 0x5f: TS=0x0c vs WASM=0x00
- 偏移量 0x60: TS=0x42 vs WASM=0x0c
- 偏移量 0x61: TS=0x06 vs WASM=0x43
- 偏移量 0x62: TS=0x00 vs WASM=0x06
- 偏移量 0x63: TS=0xca vs WASM=0x01
- 偏移量 0x64: TS=0x03 vs WASM=0xca
- 偏移量 0x65: TS=0x00 vs WASM=0x03
- 偏移量 0x66: TS=0x01 vs WASM=0x00
- 偏移量 0x67: TS=0x00 vs WASM=0x01
- 偏移量 0x68: TS=0x03 vs WASM=0x00
- 偏移量 0x69: TS=0x00 vs WASM=0x05
- 偏移量 0x6b: TS=0x1b vs WASM=0x00
- 偏移量 0x6c: TS=0x01 vs WASM=0x1a
- 偏移量 0x6d: TS=0xcc vs WASM=0x01
- 偏移量 0x6e: TS=0x03 vs WASM=0xcc
- 偏移量 0x6f: TS=0x02 vs WASM=0x03
- 偏移量 0x70: TS=0x00 vs WASM=0x02
- 偏移量 0x71: TS=0x30 vs WASM=0x00
- ... (显示前20个差异，总共51个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 74 75 72 6e 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 |eturn-in-loop.js|
00000030: 08 74 65 73 74 02 78 0d c8 03 00 00 00 00 00 0c |.test.x.........|
00000040: 20 06 01 a4 01 00 00 00 03 01 01 09 00 ca 03 00 | ...............|
00000050: 01 08 ec 05 c2 00 e3 29 06 2f c8 03 00 00 00 0c |.......)./......|
00000060: 42 06 00 ca 03 00 01 00 03 00 00 1b 01 cc 03 02 |B...............|
00000070: 00 30 b8 26 01 00 63 00 00 7f 6e 08 00 00 00 cb |.0.&..c...n.....|
00000080: c7 86 28 82 00 6c f9 ff ff ff 0e 86 29 c8 03 00 |..(..l......)...|
00000090: 04 03 13 49 78 00                               |...Ix.|
```

### WASM
```
00000000: 05 03 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 72 |piler/fixtures/r|
00000020: 65 74 75 72 6e 2d 69 6e 2d 6c 6f 6f 70 2e 6a 73 |eturn-in-loop.js|
00000030: 08 74 65 73 74 02 78 0d c8 03 00 00 00 00 00 0c |.test.x.........|
00000040: 20 06 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 | ...............|
00000050: 01 08 ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 |.......)./......|
00000060: 0c 43 06 01 ca 03 00 01 00 05 00 00 1a 01 cc 03 |.C..............|
00000070: 02 00 30 63 00 00 b8 26 01 00 7f ee 0a cb 64 00 |..0c...&......d.|
00000080: 00 72 1e 06 86 28 82 00 ec f4 0e 86 29 c8 03 06 |.r...(......)...|
00000090: 00 00 3b 1e 11 0d 00                            |..;....|
```