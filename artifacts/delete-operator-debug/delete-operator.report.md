# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/delete-operator.ts
**生成时间**: 2025-12-04T07:26:47.181Z

## 大小对比

- TypeScript编译器: 172 字节
- WASM编译器: 162 字节
- 差异: 10 字节 (6.17%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 103
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 92,
      "actualLength": 46,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/delete-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 55
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 72 个字节差异:

- 偏移量 0x54: TS=0x01 vs WASM=0x00
- 偏移量 0x58: TS=0x01 vs WASM=0x00
- 偏移量 0x59: TS=0x31 vs WASM=0x2f
- 偏移量 0x5a: TS=0x01 vs WASM=0x00
- 偏移量 0x5d: TS=0x01 vs WASM=0x00
- 偏移量 0x5e: TS=0x00 vs WASM=0x01
- 偏移量 0x5f: TS=0x20 vs WASM=0x08
- 偏移量 0x60: TS=0xca vs WASM=0xec
- 偏移量 0x61: TS=0x03 vs WASM=0x02
- 偏移量 0x62: TS=0x00 vs WASM=0x29
- 偏移量 0x63: TS=0x01 vs WASM=0x0b
- 偏移量 0x64: TS=0x08 vs WASM=0xb8
- 偏移量 0x65: TS=0xec vs WASM=0x4e
- 偏移量 0x66: TS=0x02 vs WASM=0xe6
- 偏移量 0x67: TS=0x29 vs WASM=0x00
- 偏移量 0x68: TS=0x0b vs WASM=0x00
- 偏移量 0x69: TS=0xb8 vs WASM=0x00
- 偏移量 0x6a: TS=0x4e vs WASM=0xb9
- 偏移量 0x6b: TS=0xe6 vs WASM=0x4e
- 偏移量 0x6c: TS=0x00 vs WASM=0xe7
- ... (显示前20个差异，总共72个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 6f 70 65 72 61 74 6f 72 2e 6a |elete-operator.j|
00000030: 73 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f 6c |s.obj.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 01 00 03 01 01 31 01 ca 03 01 00 20 |.........1..... |
00000060: ca 03 00 01 08 ec 02 29 0b b8 4e e6 00 00 00 b9 |.......)..N.....|
00000070: 4e e7 00 00 00 e3 5a 00 00 c1 00 9a 0e 39 e8 00 |N.....Z......9..|
00000080: 00 00 43 e9 00 00 00 5a 00 00 42 e6 00 00 00 24 |..C....Z..B....$|
00000090: 01 00 0e 06 2f c8 03 10 00 00 5e 0e 1b 0d 0d 00 |..../.....^.....|
000000a0: 1b 0e 1b 0a 11 06 1b 07 00 07 01 61             |...........a|
```

### WASM
```
00000000: 05 06 5c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..\__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 64 |piler/fixtures/d|
00000020: 65 6c 65 74 65 2d 6f 70 65 72 61 74 6f 72 2e 6a |elete-operator.j|
00000030: 73 06 6f 62 6a 02 61 02 62 0e 63 6f 6e 73 6f 6c |s.obj.a.b.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 03 01 00 2f 00 ca 03 00 01 08 |........./......|
00000060: ec 02 29 0b b8 4e e6 00 00 00 b9 4e e7 00 00 00 |..)..N.....N....|
00000070: e7 04 e6 00 00 00 9a 0e 39 e8 00 00 00 43 e9 00 |........9....C..|
00000080: 00 00 df 42 e6 00 00 00 24 01 00 0e 06 2f c8 03 |...B....$..../..|
00000090: 10 00 00 59 0e 07 06 26 13 1b 0e 1b 0a 07 06 1b |...Y...&........|
000000a0: 07 00                                           |..|
```