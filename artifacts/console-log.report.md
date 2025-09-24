# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/console-log.ts
**生成时间**: 2025-09-24T20:30:48.583Z

## 大小对比

- TypeScript编译器: 104 字节
- WASM编译器: 84 字节
- 差异: 20 字节 (23.81%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/console-log.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 47
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 1,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/simple-add.js",
      "offset": 2
    }
  ],
  "functionHeader": {
    "offset": 44,
    "tag": "0xd",
    "remaining": 40
  }
}
```

## 字节级差异

共发现 72 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x01
- 偏移量 0x2: TS=0x54 vs WASM=0x52
- 偏移量 0x1f: TS=0x63 vs WASM=0x73
- 偏移量 0x20: TS=0x6f vs WASM=0x69
- 偏移量 0x21: TS=0x6e vs WASM=0x6d
- 偏移量 0x22: TS=0x73 vs WASM=0x70
- 偏移量 0x23: TS=0x6f vs WASM=0x6c
- 偏移量 0x24: TS=0x6c vs WASM=0x65
- 偏移量 0x25: TS=0x65 vs WASM=0x2d
- 偏移量 0x26: TS=0x2d vs WASM=0x61
- 偏移量 0x27: TS=0x6c vs WASM=0x64
- 偏移量 0x28: TS=0x6f vs WASM=0x64
- 偏移量 0x29: TS=0x67 vs WASM=0x2e
- 偏移量 0x2a: TS=0x2e vs WASM=0x6a
- 偏移量 0x2b: TS=0x6a vs WASM=0x73
- 偏移量 0x2c: TS=0x73 vs WASM=0x0d
- 偏移量 0x2d: TS=0x0e vs WASM=0xc8
- 偏移量 0x2e: TS=0x63 vs WASM=0x03
- 偏移量 0x2f: TS=0x6f vs WASM=0x00
- 偏移量 0x30: TS=0x6e vs WASM=0x00
- ... (显示前20个差异，总共72个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6e 73 6f 6c 65 2d 6c 6f 67 2e 6a 73 0e 63 6f |onsole-log.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 13 00 08 |.. .............|
00000050: ec 02 29 39 ca 03 43 cc 03 b8 24 01 00 00 00 0e |..)9..C...$.....|
00000060: 06 2f c8 03 02 00 00 00                         |./......|
```

### WASM
```
00000000: 05 01 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 69 6d 70 6c 65 2d 61 64 64 2e 6a 73 0d c8 03 00 |imple-add.js....|
00000030: 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 00 00 |..... ..........|
00000040: 0a 00 08 ec 02 29 b8 b9 9f 0e 06 2f c8 03 04 00 |.....)...../....|
00000050: 00 20 04 00                                     |. ..|
```