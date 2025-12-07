# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/compute.ts
**生成时间**: 2025-12-07T03:50:04.791Z

## 大小对比

- TypeScript编译器: 140 字节
- WASM编译器: 136 字节
- 差异: 4 字节 (2.94%)

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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/compute.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 87
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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/compute.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "compute",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xd",
    "remaining": 83
  }
}
```

## 字节级差异

共发现 58 个字节差异:

- 偏移量 0x47: TS=0x02 vs WASM=0x01
- 偏移量 0x4f: TS=0xca vs WASM=0x08
- 偏移量 0x50: TS=0x03 vs WASM=0xec
- 偏移量 0x51: TS=0x00 vs WASM=0x05
- 偏移量 0x52: TS=0x01 vs WASM=0xc2
- 偏移量 0x53: TS=0x08 vs WASM=0x00
- 偏移量 0x54: TS=0xec vs WASM=0xe3
- 偏移量 0x55: TS=0x06 vs WASM=0x29
- 偏移量 0x56: TS=0xc2 vs WASM=0x06
- 偏移量 0x57: TS=0x00 vs WASM=0x2f
- 偏移量 0x58: TS=0xe3 vs WASM=0xc8
- 偏移量 0x59: TS=0x29 vs WASM=0x03
- 偏移量 0x5a: TS=0x06 vs WASM=0x02
- 偏移量 0x5b: TS=0x2f vs WASM=0x00
- 偏移量 0x5c: TS=0xc8 vs WASM=0x00
- 偏移量 0x5d: TS=0x03 vs WASM=0x00
- 偏移量 0x5e: TS=0x02 vs WASM=0x0c
- 偏移量 0x5f: TS=0x00 vs WASM=0x43
- 偏移量 0x60: TS=0x00 vs WASM=0x06
- 偏移量 0x61: TS=0x00 vs WASM=0x01
- ... (显示前20个差异，总共58个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 0e 63 6f 6d 70 75 74 |ompute.js.comput|
00000030: 65 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 06 |e.a.b......... .|
00000040: 01 a4 01 00 00 00 01 02 01 09 00 ca 03 00 01 ca |................|
00000050: 03 00 01 08 ec 06 c2 00 e3 29 06 2f c8 03 02 00 |.........)./....|
00000060: 00 00 0c 43 06 01 ca 03 02 00 02 02 00 00 04 02 |...C............|
00000070: cc 03 00 01 00 ce 03 00 01 00 d3 d4 9f 28 c8 03 |.............(..|
00000080: 0a 00 00 03 16 07 08 07 03 07 11 00             |............|
```

### WASM
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 0e 63 6f 6d 70 75 74 |ompute.js.comput|
00000030: 65 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 06 |e.a.b......... .|
00000040: 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 01 08 |................|
00000050: ec 05 c2 00 e3 29 06 2f c8 03 02 00 00 00 0c 43 |.....)./.......C|
00000060: 06 01 ca 03 02 00 02 02 00 00 04 02 cc 03 00 01 |................|
00000070: 00 ce 03 00 01 00 d3 d4 9f 28 c8 03 0a 00 00 03 |.........(......|
00000080: 16 07 08 07 03 07 11 00                         |........|
```