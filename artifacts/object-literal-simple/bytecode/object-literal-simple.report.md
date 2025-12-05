# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-literal-simple.ts
**生成时间**: 2025-12-05T12:54:24.200Z

## 大小对比

- TypeScript编译器: 223 字节
- WASM编译器: 144 字节
- 差异: 79 字节 (54.86%)

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
      "rawLength": 240,
      "actualLength": 120,
      "isWideChar": 0,
      "string": "/Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-literal-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "info",
      "offset": 124
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 129
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 131
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 133
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 139
    }
  ],
  "functionHeader": {
    "offset": 141,
    "tag": "0xd",
    "remaining": 82
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "info",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 72
  }
}
```

## 字节级差异

共发现 215 个字节差异:

- 偏移量 0x2: TS=0xf0 vs WASM=0x68
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
- ... (显示前20个差异，总共215个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 f0 01 2f 55 73 65 72 73 2f 61 6e 69 77 65 |..../Users/aniwe|
00000010: 69 2f 44 65 73 6b 74 6f 70 2f 77 6f 72 6b 73 70 |i/Desktop/worksp|
00000020: 61 63 65 73 2f 71 75 69 63 6b 6a 73 2d 74 79 70 |aces/quickjs-typ|
00000030: 65 73 63 72 69 70 74 2d 63 6f 6d 70 69 6c 65 72 |escript-compiler|
00000040: 5f 73 65 63 6f 6e 64 2f 5f 5f 74 65 73 74 73 5f |_second/__tests_|
00000050: 5f 2f 63 6f 6d 70 69 6c 65 72 2f 66 69 78 74 75 |_/compiler/fixtu|
00000060: 72 65 73 2f 6f 62 6a 65 63 74 2d 6c 69 74 65 72 |res/object-liter|
00000070: 61 6c 2d 73 69 6d 70 6c 65 2e 6a 73 08 69 6e 66 |al-simple.js.inf|
00000080: 6f 02 61 02 62 0a 68 65 6c 6c 6f 02 63 0d c8 03 |o.a.b.hello.c...|
00000090: 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 03 01 |...... .........|
000000a0: 01 25 01 ca 03 00 00 00 ca 03 00 01 08 6c 1d 00 |.%...........l..|
000000b0: 00 00 0b b8 4e e6 00 00 00 02 00 00 00 00 4e e7 |....N.........N.|
000000c0: 00 00 00 04 e8 00 00 00 4e e9 00 00 00 e3 29 06 |........N.....).|
000000d0: 2f c8 03 01 00 00 06 00 00 00 00 00 00 0c 40    |/.............@|
```

### WASM
```
00000000: 05 06 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2d 73 69 |bject-literal-si|
00000030: 6d 70 6c 65 2e 6a 73 08 69 6e 66 6f 02 61 02 62 |mple.js.info.a.b|
00000040: 0a 68 65 6c 6c 6f 02 63 0d c8 03 00 00 00 00 00 |.hello.c........|
00000050: 0c 20 06 01 a4 01 00 00 00 02 01 01 1f 00 ca 03 |. ..............|
00000060: 00 0d 08 ec 02 29 0b b8 4e e6 00 00 00 c1 00 4e |.....)..N......N|
00000070: e7 00 00 00 04 e8 00 00 00 4e e9 00 00 00 e3 06 |.........N......|
00000080: 2f c8 03 02 00 00 00 06 00 00 00 00 00 00 0c 40 |/..............@|
```