# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/switch-test.ts
**生成时间**: 2025-12-05T01:10:24.596Z

## 大小对比

- TypeScript编译器: 162 字节
- WASM编译器: 129 字节
- 差异: 33 字节 (25.58%)

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
      "string": "__tests__/compiler/fixtures/switch-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xd",
    "remaining": 115
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-test.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 45
    }
  ],
  "functionHeader": {
    "offset": 47,
    "tag": "0xd",
    "remaining": 82
  }
}
```

## 字节级差异

共发现 80 个字节差异:

- 偏移量 0x3e: TS=0x01 vs WASM=0x00
- 偏移量 0x41: TS=0x00 vs WASM=0x01
- 偏移量 0x43: TS=0x3a vs WASM=0x2a
- 偏移量 0x44: TS=0x01 vs WASM=0x00
- 偏移量 0x48: TS=0x00 vs WASM=0x09
- 偏移量 0x4e: TS=0x5b vs WASM=0xe3
- 偏移量 0x4f: TS=0x00 vs WASM=0x68
- 偏移量 0x51: TS=0x5a vs WASM=0x00
- 偏移量 0x52: TS=0x00 vs WASM=0x11
- 偏移量 0x53: TS=0x00 vs WASM=0xb8
- 偏移量 0x54: TS=0x11 vs WASM=0xad
- 偏移量 0x55: TS=0xb8 vs WASM=0xec
- 偏移量 0x56: TS=0xad vs WASM=0x09
- 偏移量 0x57: TS=0x6d vs WASM=0xb9
- 偏移量 0x58: TS=0x0d vs WASM=0x11
- 偏移量 0x59: TS=0x00 vs WASM=0x69
- 偏移量 0x5c: TS=0x11 vs WASM=0x0e
- 偏移量 0x5d: TS=0xb9 vs WASM=0xee
- 偏移量 0x5e: TS=0xad vs WASM=0x12
- 偏移量 0x5f: TS=0x6d vs WASM=0x11
- ... (显示前20个差异，总共80个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 02 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 74 65 73 74 2e 6a 73 02 61 0d |witch-test.js.a.|
00000030: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 |........ .......|
00000040: 03 00 00 3a 01 ca 03 00 00 08 ec 02 29 b8 5b 00 |...:........).[.|
00000050: 00 5a 00 00 11 b8 ad 6d 0d 00 00 00 11 b9 ad 6d |.Z.....m.......m|
00000060: 10 00 00 00 6e 11 00 00 00 b9 11 5b 00 00 0e 6e |....n......[...n|
00000070: 0c 00 00 00 ba 11 5b 00 00 0e bb 11 5b 00 00 0e |......[.....[...|
00000080: 0e 06 2f c8 03 1b 00 08 01 00 04 01 00 08 03 00 |../.............|
00000090: 0c 7d 00 00 01 00 0b 02 00 00 01 00 06 01 00 00 |.}..............|
000000a0: 01 00                                           |..|
```

### WASM
```
00000000: 05 02 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 74 65 73 74 2e 6a 73 02 61 0d |witch-test.js.a.|
00000030: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000040: 03 01 00 2a 00 ca 03 00 09 08 ec 02 29 b8 e3 68 |...*........)..h|
00000050: 00 00 11 b8 ad ec 09 b9 11 69 00 00 0e ee 12 11 |.........i......|
00000060: b9 ad ec 07 ba 11 69 00 00 0e bb 11 69 00 00 0e |......i.....i...|
00000070: 0e 06 2f c8 03 0a 00 00 21 10 2c 00 46 00 22 00 |../.....!.,.F.".|
00000080: 00                                              |.|
```