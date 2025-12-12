# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/compute.ts
**生成时间**: 2025-12-12T09:59:18.486Z

## 大小对比

- TypeScript编译器: 89 字节
- WASM编译器: 127 字节
- 差异: -38 字节 (-29.92%)

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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compute.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 45,
    "tag": "0xc",
    "remaining": 44
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
      "rawLength": 58,
      "actualLength": 29,
      "isWideChar": 0,
      "string": "__tests__/fixtures/compute.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 32
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
    "tag": "0xd",
    "remaining": 83
  }
}
```

## 字节级差异

共发现 113 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x04
- 偏移量 0x2: TS=0x0c vs WASM=0x3a
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x3a vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x63
- 偏移量 0x17: TS=0x5f vs WASM=0x6f
- ... (显示前20个差异，总共113个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 3a |...<eval>._ret_:|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 63 6f 6d 70 75 74 65 2e 6a 73 0c 02 06 |es/compute.js...|
00000030: 00 00 00 00 00 00 01 00 01 00 01 0c 01 01 00 00 |................|
00000040: 00 00 00 00 b6 01 00 d5 00 3b e6 00 00 00 da 28 |.........;.....(|
00000050: 02 00 00 00 02 00 00 00 01                      |.........|
```

### WASM
```
00000000: 05 04 3a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..:__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6f 6d 70 75 74 65 2e 6a 73 |tures/compute.js|
00000020: 0e 63 6f 6d 70 75 74 65 02 61 02 62 0d c8 03 00 |.compute.a.b....|
00000030: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 01 |..... ..........|
00000040: 09 00 ca 03 00 01 08 ec 05 c2 00 e3 29 06 2f c8 |............)./.|
00000050: 03 02 00 00 00 0c 43 06 01 ca 03 02 00 02 02 00 |......C.........|
00000060: 00 04 02 cc 03 00 01 00 ce 03 00 01 00 d3 d4 9f |................|
00000070: 28 c8 03 0a 00 00 03 12 07 08 07 03 07 11 00    |(..............|
```