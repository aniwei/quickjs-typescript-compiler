# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-of.ts
**生成时间**: 2025-12-05T12:54:23.995Z

## 大小对比

- TypeScript编译器: 226 字节
- WASM编译器: 151 字节
- 差异: 75 字节 (49.67%)

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
      "rawLength": 210,
      "actualLength": 105,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/for-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 109
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 113
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 115
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 123
    }
  ],
  "functionHeader": {
    "offset": 127,
    "tag": "0xd",
    "remaining": 99
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
      "rawLength": 74,
      "actualLength": 37,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/for-of.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 40
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 42
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 54
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 222 个字节差异:

- 偏移量 0x2: TS=0xd2 vs WASM=0x4a
- 偏移量 0x3: TS=0x01 vs WASM=0x5f
- 偏移量 0x4: TS=0x2f vs WASM=0x5f
- 偏移量 0x5: TS=0x55 vs WASM=0x74
- 偏移量 0x6: TS=0x73 vs WASM=0x65
- 偏移量 0x7: TS=0x65 vs WASM=0x73
- 偏移量 0x8: TS=0x72 vs WASM=0x74
- 偏移量 0xa: TS=0x2f vs WASM=0x5f
- 偏移量 0xb: TS=0x61 vs WASM=0x5f
- 偏移量 0xc: TS=0x6e vs WASM=0x2f
- 偏移量 0xd: TS=0x69 vs WASM=0x63
- 偏移量 0xe: TS=0x77 vs WASM=0x6f
- 偏移量 0xf: TS=0x65 vs WASM=0x6d
- 偏移量 0x10: TS=0x69 vs WASM=0x70
- 偏移量 0x11: TS=0x2f vs WASM=0x69
- 偏移量 0x12: TS=0x44 vs WASM=0x6c
- 偏移量 0x14: TS=0x73 vs WASM=0x72
- 偏移量 0x15: TS=0x6b vs WASM=0x2f
- 偏移量 0x16: TS=0x74 vs WASM=0x66
- 偏移量 0x17: TS=0x6f vs WASM=0x69
- ... (显示前20个差异，总共222个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 d2 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 66 6f 72 2d 6f 66 2e 6a 73 06 61 72 |res/for-of.js.ar|
00000070: 72 02 76 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |r.v.console.log.|
00000080: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 |........ .......|
00000090: 03 02 00 30 02 ca 03 00 00 00 cc 03 00 00 00 ca |...0............|
000000a0: 03 00 01 cc 03 01 01 08 6c 28 00 00 00 b8 b9 ba |........l(......|
000000b0: 26 03 00 e3 df 7f 6e 10 00 00 00 e4 39 e7 00 00 |&.....n.....9...|
000000c0: 00 43 e8 00 00 00 e0 24 01 00 0e 82 00 6c e9 ff |.C.....$.....l..|
000000d0: ff ff 0e 86 29 06 2f c8 03 01 06 00 0d 01 00 12 |....)./.........|
000000e0: 01 00                                           |..|
```

### WASM
```
00000000: 05 05 4a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..J__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 6f 72 2d 6f 66 2e 6a 73 02 76 06 61 72 72 0e 63 |or-of.js.v.arr.c|
00000030: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000040: 00 00 0c 20 06 01 a4 01 00 01 00 06 01 00 2e 01 |... ............|
00000050: ca 03 02 00 30 cc 03 00 0d 08 ec 02 29 b8 b9 ba |....0.......)...|
00000060: 26 03 00 e3 63 00 00 68 00 00 7f ee 13 cb 39 e7 |&...c..h......9.|
00000070: 00 00 00 43 e8 00 00 00 64 00 00 24 01 00 0e 82 |...C....d..$....|
00000080: 00 ec eb 0e 86 06 2f c8 03 0c 00 00 49 20 26 17 |....../.....I &.|
00000090: 1b 0e 1b 0a 11 01 00                            |.......|
```