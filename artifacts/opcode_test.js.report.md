# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/opcode_test.js
**生成时间**: 2025-12-04T17:28:23.166Z

## 大小对比

- TypeScript编译器: 115 字节
- WASM编译器: 120 字节
- 差异: -5 字节 (-4.17%)

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
      "string": "__tests__/compiler/fixtures/opcode_test.js",
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
    "remaining": 58
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/opcode_test.js",
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
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 57
  }
}
```

## 字节级差异

共发现 57 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x04
- 偏移量 0x39: TS=0x0d vs WASM=0x0a
- 偏移量 0x3a: TS=0xc8 vs WASM=0x68
- 偏移量 0x3b: TS=0x03 vs WASM=0x65
- 偏移量 0x3c: TS=0x00 vs WASM=0x6c
- 偏移量 0x3d: TS=0x00 vs WASM=0x6c
- 偏移量 0x3e: TS=0x00 vs WASM=0x6f
- 偏移量 0x3f: TS=0x00 vs WASM=0x0d
- 偏移量 0x40: TS=0x00 vs WASM=0xc8
- 偏移量 0x41: TS=0x0c vs WASM=0x03
- 偏移量 0x42: TS=0x20 vs WASM=0x00
- 偏移量 0x43: TS=0x06 vs WASM=0x00
- 偏移量 0x44: TS=0x01 vs WASM=0x00
- 偏移量 0x45: TS=0xa4 vs WASM=0x00
- 偏移量 0x46: TS=0x01 vs WASM=0x00
- 偏移量 0x47: TS=0x00 vs WASM=0x0c
- 偏移量 0x48: TS=0x00 vs WASM=0x20
- 偏移量 0x49: TS=0x00 vs WASM=0x06
- 偏移量 0x4a: TS=0x03 vs WASM=0x01
- 偏移量 0x4b: TS=0x00 vs WASM=0xa4
- ... (显示前20个差异，总共57个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 63 6f 64 65 5f 74 65 73 74 2e 6a 73 0e 63 6f |pcode_test.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 00 01 19 00 08 |.. .............|
00000050: ec 02 29 39 e5 00 00 00 43 e6 00 00 00 02 00 00 |..)9....C.......|
00000060: 00 00 24 01 00 0e 06 2f c8 03 00 00 07 0a 68 65 |..$..../......he|
00000070: 6c 6c 6f                                        |llo|
```

### WASM
```
00000000: 05 04 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 70 63 6f 64 65 5f 74 65 73 74 2e 6a 73 0e 63 6f |pcode_test.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0a 68 65 6c 6c 6f 0d |nsole.log.hello.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 03 00 00 19 00 08 ec 02 29 39 e5 00 00 00 43 e6 |........)9....C.|
00000060: 00 00 00 04 e7 00 00 00 24 01 00 0e 06 2f c8 03 |........$..../..|
00000070: 06 00 00 2f 0e 34 08 00                         |.../.4..|
```