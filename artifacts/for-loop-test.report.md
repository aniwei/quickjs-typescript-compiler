# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/for-loop-test.ts
**生成时间**: 2025-12-05T01:09:40.336Z

## 大小对比

- TypeScript编译器: 196 字节
- WASM编译器: 221 字节
- 差异: -25 字节 (-11.31%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "test2",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 136
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-loop-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "test",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "test2",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 60,
    "tag": "0xd",
    "remaining": 161
  }
}
```

## 字节级差异

共发现 133 个字节差异:

- 偏移量 0x4b: TS=0x03 vs WASM=0x01
- 偏移量 0x4d: TS=0x03 vs WASM=0x02
- 偏移量 0x4e: TS=0x00 vs WASM=0x02
- 偏移量 0x50: TS=0x50 vs WASM=0x30
- 偏移量 0x51: TS=0x03 vs WASM=0x01
- 偏移量 0x54: TS=0x00 vs WASM=0x02
- 偏移量 0x56: TS=0xcc vs WASM=0x20
- 偏移量 0x57: TS=0x03 vs WASM=0xcc
- 偏移量 0x58: TS=0x00 vs WASM=0x03
- 偏移量 0x5a: TS=0xce vs WASM=0x01
- 偏移量 0x5b: TS=0x03 vs WASM=0xce
- 偏移量 0x5c: TS=0x00 vs WASM=0x03
- 偏移量 0x5d: TS=0x00 vs WASM=0x01
- 偏移量 0x5e: TS=0x08 vs WASM=0x01
- 偏移量 0x5f: TS=0xec vs WASM=0x08
- 偏移量 0x60: TS=0x02 vs WASM=0xec
- 偏移量 0x61: TS=0x29 vs WASM=0x08
- 偏移量 0x62: TS=0xb7 vs WASM=0xc2
- 偏移量 0x63: TS=0x5b vs WASM=0x00
- 偏移量 0x64: TS=0x00 vs WASM=0xe3
- ... (显示前20个差异，总共133个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2d 74 65 73 74 2e 6a 73 02 |or-loop-test.js.|
00000030: 69 08 74 65 73 74 0a 74 65 73 74 32 0d c8 03 00 |i.test.test2....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 03 00 03 00 02 |..... ..........|
00000050: 50 03 ca 03 00 00 cc 03 00 00 ce 03 00 00 08 ec |P...............|
00000060: 02 29 b7 5b 00 00 5a 00 00 01 0a 00 00 00 a5 6c |.).[..Z........l|
00000070: 1a 00 00 00 5a 00 00 bc ab 6c 0a 00 00 00 6e 0b |....Z....l....n.|
00000080: 00 00 00 6e 00 00 00 00 0e 6e d8 ff ff ff 03 00 |...n.....n......|
00000090: 00 00 00 5b 01 00 5a 01 00 22 00 00 0e 03 01 00 |...[..Z.."......|
000000a0: 00 00 5b 02 00 5a 02 00 22 00 00 0e 06 2f c8 03 |..[..Z.."..../..|
000000b0: 12 00 16 01 00 14 7f 00 06 02 00 08 04 00 07 01 |................|
000000c0: 00 08 04 00                                     |....|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6c 6f 6f 70 2d 74 65 73 74 2e 6a 73 02 |or-loop-test.js.|
00000030: 69 08 74 65 73 74 0a 74 65 73 74 32 0d c8 03 00 |i.test.test2....|
00000040: 00 00 00 00 0c 20 06 01 a4 01 00 01 00 02 02 02 |..... ..........|
00000050: 30 01 ca 03 02 00 20 cc 03 00 01 ce 03 01 01 08 |0..... .........|
00000060: ec 08 c2 00 e3 c2 01 e4 29 63 00 00 b7 cb 64 00 |........)c....d.|
00000070: 00 bf 0a a5 ec 12 64 00 00 bc ab ed 0b 64 00 00 |......d......d..|
00000080: 93 65 00 00 0e ee e8 df f0 0e e0 f0 0e 06 2f c8 |.e............/.|
00000090: 03 1a 00 00 4d 20 1b 04 12 13 16 04 10 1c 11 02 |....M ..........|
000000a0: 00 07 0e 31 07 08 00 02 08 07 07 0a 00 0c 43 06 |...1..........C.|
000000b0: 01 cc 03 00 00 00 01 00 00 03 00 bf 7b 28 c8 03 |............{(..|
000000c0: 04 04 00 0d 08 00 0c 43 06 01 ce 03 00 00 00 00 |.......C........|
000000d0: 00 00 01 00 29 c8 03 04 08 00 03 08 00          |....)........|
```