# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/complex-expressions.ts
**生成时间**: 2025-12-06T02:09:56.321Z

## 大小对比

- TypeScript编译器: 229 字节
- WASM编译器: 234 字节
- 差异: -5 字节 (-2.14%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/complex-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 152
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 100,
      "actualLength": 50,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/complex-expressions.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 53
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 57
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 63
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 157
  }
}
```

## 字节级差异

共发现 35 个字节差异:

- 偏移量 0x5e: TS=0x03 vs WASM=0x04
- 偏移量 0xc8: TS=0x00 vs WASM=0x20
- 偏移量 0xc9: TS=0x1a vs WASM=0x00
- 偏移量 0xca: TS=0x16 vs WASM=0x00
- 偏移量 0xcb: TS=0x0d vs WASM=0x81
- 偏移量 0xcc: TS=0x07 vs WASM=0x00
- 偏移量 0xcd: TS=0x03 vs WASM=0x1b
- 偏移量 0xce: TS=0x07 vs WASM=0x0e
- 偏移量 0xcf: TS=0x03 vs WASM=0x1b
- 偏移量 0xd0: TS=0x1c vs WASM=0x0a
- 偏移量 0xd1: TS=0x79 vs WASM=0x16
- 偏移量 0xd2: TS=0x07 vs WASM=0x06
- 偏移量 0xd3: TS=0x05 vs WASM=0x07
- 偏移量 0xd4: TS=0x20 vs WASM=0x07
- 偏移量 0xd5: TS=0x06 vs WASM=0x17
- 偏移量 0xd6: TS=0x26 vs WASM=0x15
- 偏移量 0xd7: TS=0x69 vs WASM=0x1b
- 偏移量 0xd8: TS=0x34 vs WASM=0x0e
- 偏移量 0xd9: TS=0x0c vs WASM=0x1b
- 偏移量 0xda: TS=0x11 vs WASM=0x0a
- ... (显示前20个差异，总共35个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 6c 65 78 2d 65 78 70 72 65 73 73 69 6f |omplex-expressio|
00000030: 6e 73 2e 6a 73 06 61 72 72 06 6f 62 6a 02 61 02 |ns.js.arr.obj.a.|
00000040: 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |b.console.log...|
00000050: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 03 02 |...... .........|
00000060: 00 5b 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 b8 |.[............).|
00000070: b9 ba 26 03 00 e3 0b b8 4e e7 00 00 00 b9 4e e8 |..&.....N.....N.|
00000080: 00 00 00 e4 39 e9 00 00 00 43 ea 00 00 00 68 00 |....9....C....h.|
00000090: 00 b7 48 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 |..H$...9....C...|
000000a0: 00 68 01 00 42 e7 00 00 00 24 01 00 0e 39 e9 00 |.h..B....$...9..|
000000b0: 00 00 43 ea 00 00 00 68 01 00 04 e8 00 00 00 48 |..C....h.......H|
000000c0: 24 01 00 0e 06 2f c8 03 00 1a 16 0d 07 03 07 03 |$..../..........|
000000d0: 1c 79 07 05 20 06 26 69 34 0c 11 04 21 70 34 0c |.y.. .&i4...!p4.|
000000e0: 3f 74 34 0c 00                                  |?t4..|
```

### WASM
```
00000000: 05 07 64 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..d__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 6c 65 78 2d 65 78 70 72 65 73 73 69 6f |omplex-expressio|
00000030: 6e 73 2e 6a 73 06 61 72 72 06 6f 62 6a 02 61 02 |ns.js.arr.obj.a.|
00000040: 62 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |b.console.log...|
00000050: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 04 02 |...... .........|
00000060: 00 5b 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 b8 |.[............).|
00000070: b9 ba 26 03 00 e3 0b b8 4e e7 00 00 00 b9 4e e8 |..&.....N.....N.|
00000080: 00 00 00 e4 39 e9 00 00 00 43 ea 00 00 00 68 00 |....9....C....h.|
00000090: 00 b7 48 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 |..H$...9....C...|
000000a0: 00 68 01 00 42 e7 00 00 00 24 01 00 0e 39 e9 00 |.h..B....$...9..|
000000b0: 00 00 43 ea 00 00 00 68 01 00 04 e8 00 00 00 48 |..C....h.......H|
000000c0: 24 01 00 0e 06 2f c8 03 20 00 00 81 00 1b 0e 1b |$..../.. .......|
000000d0: 0a 16 06 07 07 17 15 1b 0e 1b 0a 11 06 1b 07 17 |................|
000000e0: 15 1b 0e 1b 0a 2a 06 07 07 00                   |.....*....|
```