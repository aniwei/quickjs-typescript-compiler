# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/arguments-object.ts
**生成时间**: 2025-12-02T17:07:51.131Z

## 大小对比

- TypeScript编译器: 224 字节
- WASM编译器: 205 字节
- 差异: 19 字节 (9.27%)

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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arguments-object.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "testArgs",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 153
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
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arguments-object.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "testArgs",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    }
  ],
  "functionHeader": {
    "offset": 71,
    "tag": "0xd",
    "remaining": 134
  }
}
```

## 字节级差异

共发现 112 个字节差异:

- 偏移量 0x5f: TS=0xff vs WASM=0x00
- 偏移量 0x60: TS=0xff vs WASM=0x01
- 偏移量 0x61: TS=0xff vs WASM=0x08
- 偏移量 0x62: TS=0xff vs WASM=0xec
- 偏移量 0x63: TS=0x0f vs WASM=0x05
- 偏移量 0x64: TS=0x00 vs WASM=0xc2
- 偏移量 0x65: TS=0x08 vs WASM=0x00
- 偏移量 0x66: TS=0xec vs WASM=0xe3
- 偏移量 0x67: TS=0x05 vs WASM=0x29
- 偏移量 0x68: TS=0xc2 vs WASM=0xdf
- 偏移量 0x69: TS=0x00 vs WASM=0xb8
- 偏移量 0x6a: TS=0xe3 vs WASM=0xb9
- 偏移量 0x6b: TS=0x29 vs WASM=0xba
- 偏移量 0x6c: TS=0xdf vs WASM=0xf3
- 偏移量 0x6d: TS=0xb8 vs WASM=0x0e
- 偏移量 0x6e: TS=0xb9 vs WASM=0x06
- 偏移量 0x6f: TS=0xba vs WASM=0x2f
- 偏移量 0x70: TS=0xf3 vs WASM=0xc8
- 偏移量 0x71: TS=0x0e vs WASM=0x03
- 偏移量 0x72: TS=0x06 vs WASM=0x08
- ... (显示前20个差异，总共112个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 04 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 67 75 6d 65 6e 74 73 2d 6f 62 6a 65 63 74 2e |rguments-object.|
00000030: 6a 73 10 74 65 73 74 41 72 67 73 0e 63 6f 6e 73 |js.testArgs.cons|
00000040: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000050: 20 06 01 a4 01 00 00 00 04 01 01 0f 00 ca 03 ff | ...............|
00000060: ff ff ff 0f 00 08 ec 05 c2 00 e3 29 df b8 b9 ba |...........)....|
00000070: f3 0e 06 2f c8 03 08 00 00 00 07 0e 00 16 10 00 |.../............|
00000080: 0c 43 06 01 ca 03 00 01 00 04 00 00 33 01 e6 01 |.C..........3...|
00000090: 00 00 00 0c 03 5b 00 00 39 e6 00 00 00 43 e7 00 |.....[..9....C..|
000000a0: 00 00 39 4f 00 00 00 42 30 00 00 00 24 01 00 0e |..9O...B0...$...|
000000b0: 39 e6 00 00 00 43 e7 00 00 00 39 4f 00 00 00 b7 |9....C....9O....|
000000c0: 48 24 01 00 0e 29 c8 03 16 00 00 04 04 1b 0e 1b |H$...)..........|
000000d0: 0a 1b 12 1b 13 18 15 1b 0e 1b 0a 20 12 07 13 00 |........... ....|
```

### WASM
```
00000000: 05 04 5e 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..^__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 67 75 6d 65 6e 74 73 2d 6f 62 6a 65 63 74 2e |rguments-object.|
00000030: 6a 73 10 74 65 73 74 41 72 67 73 0e 63 6f 6e 73 |js.testArgs.cons|
00000040: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000050: 20 06 01 a4 01 00 00 00 04 01 01 0f 00 ca 03 00 | ...............|
00000060: 01 08 ec 05 c2 00 e3 29 df b8 b9 ba f3 0e 06 2f |.......)......./|
00000070: c8 03 08 00 00 00 07 0e 00 16 10 00 0c 43 06 01 |.............C..|
00000080: ca 03 00 01 00 04 00 00 24 01 9e 01 00 01 00 0c |........$.......|
00000090: 00 cb 39 e6 00 00 00 43 e7 00 00 00 c7 eb 24 01 |..9....C......$.|
000000a0: 00 0e 39 e6 00 00 00 43 e7 00 00 00 c7 b7 48 24 |..9....C......H$|
000000b0: 01 00 29 c8 03 16 00 00 13 04 1b 0e 1b 0a 07 12 |..).............|
000000c0: 07 13 18 15 1b 0e 1b 0a 0c 12 07 13 00          |.............|
```