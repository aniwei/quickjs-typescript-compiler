# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/array-nested.ts
**生成时间**: 2025-12-11T11:32:27.887Z

## 大小对比

- TypeScript编译器: 186 字节
- WASM编译器: 194 字节
- 差异: -8 字节 (-4.12%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 122
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/array-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xd",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 33 个字节差异:

- 偏移量 0x5b: TS=0xff vs WASM=0xec
- 偏移量 0x5e: TS=0xcb vs WASM=0xb8
- 偏移量 0x5f: TS=0xcc vs WASM=0xb9
- 偏移量 0x63: TS=0xcd vs WASM=0xba
- 偏移量 0x64: TS=0xce vs WASM=0xbb
- 偏移量 0x69: TS=0xcf vs WASM=0xbc
- 偏移量 0x72: TS=0xf6 vs WASM=0xe3
- 偏移量 0x7d: TS=0x64 vs WASM=0x68
- 偏移量 0x80: TS=0xca vs WASM=0xb7
- 偏移量 0x82: TS=0xcb vs WASM=0xb8
- 偏移量 0x92: TS=0x64 vs WASM=0x68
- 偏移量 0x95: TS=0xcc vs WASM=0xb9
- 偏移量 0xa4: TS=0x14 vs WASM=0x1c
- 偏移量 0xab: TS=0x25 vs WASM=0x1b
- 偏移量 0xaf: TS=0x39 vs WASM=0x16
- 偏移量 0xb0: TS=0x01 vs WASM=0x06
- 偏移量 0xb1: TS=0x17 vs WASM=0x0c
- 偏移量 0xb2: TS=0x15 vs WASM=0x06
- 偏移量 0xb3: TS=0x25 vs WASM=0x07
- 偏移量 0xb4: TS=0x0e vs WASM=0x0d
- ... (显示前20个差异，总共33个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6e 65 73 74 65 64 2e 6a 73 06 61 |rray-nested.js.a|
00000030: 72 72 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |rr.a.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 04 01 00 48 00 ca 03 00 0d 08 ff 02 29 cb cc |....H........)..|
00000060: 26 02 00 cd ce 26 02 00 0b cf 4e e6 00 00 00 26 |&....&....N....&|
00000070: 03 00 f6 39 e7 00 00 00 43 e8 00 00 00 64 00 00 |...9....C....d..|
00000080: ca 48 cb 48 24 01 00 0e 39 e7 00 00 00 43 e8 00 |.H.H$...9....C..|
00000090: 00 00 64 00 00 cc 48 42 e6 00 00 00 24 01 00 0e |..d...HB....$...|
000000a0: 06 2f c8 03 14 00 00 00 19 0a 00 25 0e 1b 0a 39 |./.........%...9|
000000b0: 01 17 15 25 0e 1b 0a 48 01 00                   |...%...H..|
```

### WASM
```
00000000: 05 05 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 72 61 79 2d 6e 65 73 74 65 64 2e 6a 73 06 61 |rray-nested.js.a|
00000030: 72 72 02 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |rr.a.console.log|
00000040: 0d c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 |......... ......|
00000050: 00 04 01 00 48 00 ca 03 00 0d 08 ec 02 29 b8 b9 |....H........)..|
00000060: 26 02 00 ba bb 26 02 00 0b bc 4e e6 00 00 00 26 |&....&....N....&|
00000070: 03 00 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 |...9....C....h..|
00000080: b7 48 b8 48 24 01 00 0e 39 e7 00 00 00 43 e8 00 |.H.H$...9....C..|
00000090: 00 00 68 00 00 b9 48 42 e6 00 00 00 24 01 00 0e |..h...HB....$...|
000000a0: 06 2f c8 03 1c 00 00 00 19 0a 00 1b 0e 1b 0a 16 |./..............|
000000b0: 06 0c 06 07 0d 17 15 1b 0e 1b 0a 16 06 07 06 1b |................|
000000c0: 0d 00                                           |..|
```