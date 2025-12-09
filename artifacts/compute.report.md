# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/compute.ts
**生成时间**: 2025-12-09T08:55:06.698Z

## 大小对比

- TypeScript编译器: 136 字节
- WASM编译器: 136 字节
- 差异: 0 字节 (0.00%)

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
    "remaining": 83
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

共发现 5 个字节差异:

- 偏移量 0x51: TS=0x02 vs WASM=0x05
- 偏移量 0x52: TS=0x29 vs WASM=0xc2
- 偏移量 0x53: TS=0xc2 vs WASM=0x00
- 偏移量 0x54: TS=0x00 vs WASM=0xe3
- 偏移量 0x55: TS=0xe3 vs WASM=0x29

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 0e 63 6f 6d 70 75 74 |ompute.js.comput|
00000030: 65 02 61 02 62 0d c8 03 00 00 00 00 00 0c 20 06 |e.a.b......... .|
00000040: 01 a4 01 00 00 00 01 01 01 09 00 ca 03 00 01 08 |................|
00000050: ec 02 29 c2 00 e3 06 2f c8 03 02 00 00 00 0c 43 |..)..../.......C|
00000060: 06 01 ca 03 02 00 02 02 00 00 04 02 cc 03 00 01 |................|
00000070: 00 ce 03 00 01 00 d3 d4 9f 28 c8 03 0a 00 00 03 |.........(......|
00000080: 16 07 08 07 03 07 11 00                         |........|
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