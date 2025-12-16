# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/compute.ts
**生成时间**: 2025-12-16T14:11:02.470Z

## 大小对比

- TypeScript编译器: 161 字节
- WASM编译器: 127 字节
- 差异: 34 字节 (26.77%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compute.js",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 117
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compute.js",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 42
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xc",
    "remaining": 83
  }
}
```

## 字节级差异

共发现 88 个字节差异:

- 偏移量 0x38: TS=0x18 vs WASM=0x10
- 偏移量 0x3f: TS=0xc2 vs WASM=0x40
- 偏移量 0x40: TS=0x00 vs WASM=0xe4
- 偏移量 0x41: TS=0x41 vs WASM=0x00
- 偏移量 0x42: TS=0xe4 vs WASM=0x00
- 偏移量 0x44: TS=0x00 vs WASM=0x40
- 偏移量 0x45: TS=0x00 vs WASM=0xc2
- 偏移量 0x47: TS=0xc2 vs WASM=0x41
- 偏移量 0x48: TS=0x00 vs WASM=0xe4
- 偏移量 0x49: TS=0x3b vs WASM=0x00
- 偏移量 0x4a: TS=0xe4 vs WASM=0x00
- 偏移量 0x4d: TS=0x00 vs WASM=0xc7
- 偏移量 0x4e: TS=0xc2 vs WASM=0x28
- 偏移量 0x4f: TS=0x00 vs WASM=0xca
- 偏移量 0x50: TS=0x3b vs WASM=0x03
- 偏移量 0x51: TS=0xe4 vs WASM=0x02
- 偏移量 0x55: TS=0xc7 vs WASM=0x0c
- 偏移量 0x56: TS=0x28 vs WASM=0x43
- 偏移量 0x57: TS=0xca vs WASM=0x06
- 偏移量 0x58: TS=0x03 vs WASM=0x00
- ... (显示前20个差异，总共88个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 0e 63 6f 6d 70 75 74 65 3a 5f 5f 74 65 73 |...compute:__tes|
00000010: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000020: 6d 70 75 74 65 2e 6a 73 02 61 02 62 0c 00 06 00 |mpute.js.a.b....|
00000030: a4 01 00 01 00 01 00 01 18 01 a6 01 00 00 00 c2 |................|
00000040: 00 41 e4 00 00 00 00 c2 00 3b e4 00 00 00 c2 00 |.A.......;......|
00000050: 3b e4 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 06 |;.....(.......C.|
00000060: 00 c8 03 02 00 02 00 00 00 28 02 cc 03 00 00 00 |.........(......|
00000070: ce 03 00 00 00 b6 01 00 c8 22 00 00 00 ba e6 00 |........."......|
00000080: 00 00 01 00 c8 26 00 00 00 ba e7 00 00 00 01 00 |.....&..........|
00000090: c8 24 00 00 00 9f c8 1b 00 00 00 28 29 ca 03 00 |.$.........()...|
000000a0: 00                                              |.|
```

### WASM
```
00000000: 05 04 0e 63 6f 6d 70 75 74 65 3a 5f 5f 74 65 73 |...compute:__tes|
00000010: 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f |ts__/fixtures/co|
00000020: 6d 70 75 74 65 2e 6a 73 02 61 02 62 0c 00 06 00 |mpute.js.a.b....|
00000030: a4 01 00 01 00 01 00 01 10 01 a6 01 00 00 00 40 |...............@|
00000040: e4 00 00 00 40 c2 00 41 e4 00 00 00 00 c7 28 ca |....@..A......(.|
00000050: 03 02 00 00 00 0c 43 06 00 c8 03 02 00 02 02 00 |......C.........|
00000060: 00 04 02 cc 03 00 01 00 ce 03 00 01 00 d3 d4 9f |................|
00000070: 28 ca 03 0a 00 00 03 12 07 08 07 03 07 11 00    |(..............|
```