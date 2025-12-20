# 字节码分析报告

**输入文件**: __tests__/fixtures/closure-vars.ts
**生成时间**: 2025-12-18T13:49:32.061Z

## 大小对比

- TypeScript编译器: 353 字节
- WASM编译器: 365 字节
- 差异: -12 字节 (-3.29%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "testClosure",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-vars.js",
      "offset": 14
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 57
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 278
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "testClosure",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-vars.js",
      "offset": 14
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 53
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 57
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 63
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 75,
    "tag": "0xc",
    "remaining": 290
  }
}
```

## 字节级差异

共发现 212 个字节差异:

- 偏移量 0x76: TS=0x06 vs WASM=0x08
- 偏移量 0x7a: TS=0x13 vs WASM=0x0e
- 偏移量 0x7d: TS=0x00 vs WASM=0x1b
- 偏移量 0x7e: TS=0x0c vs WASM=0x16
- 偏移量 0x7f: TS=0x43 vs WASM=0x00
- 偏移量 0x80: TS=0x06 vs WASM=0x0c
- 偏移量 0x81: TS=0x00 vs WASM=0x43
- 偏移量 0x82: TS=0xc8 vs WASM=0x06
- 偏移量 0x83: TS=0x03 vs WASM=0x00
- 偏移量 0x84: TS=0x00 vs WASM=0xc8
- 偏移量 0x85: TS=0x05 vs WASM=0x03
- 偏移量 0x87: TS=0x01 vs WASM=0x05
- 偏移量 0x8a: TS=0x19 vs WASM=0x00
- 偏移量 0x8b: TS=0x05 vs WASM=0x01
- 偏移量 0x8c: TS=0xcc vs WASM=0x19
- 偏移量 0x8d: TS=0x03 vs WASM=0x05
- 偏移量 0x8e: TS=0x01 vs WASM=0xcc
- 偏移量 0x8f: TS=0x00 vs WASM=0x03
- 偏移量 0x90: TS=0x60 vs WASM=0x01
- 偏移量 0x91: TS=0xce vs WASM=0x00
- ... (显示前20个差异，总共212个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 16 74 65 73 74 43 6c 6f 73 75 72 65 44 5f |...testClosureD_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 63 6c 6f 73 75 72 65 2d 76 61 72 73 2e 6a |s/closure-vars.j|
00000030: 73 02 61 02 62 02 63 02 64 0a 69 6e 6e 65 72 0e |s.a.b.c.d.inner.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 00 06 00 a4 |console.log.....|
00000050: 01 00 01 00 01 00 01 16 01 a6 01 00 00 00 40 e4 |..............@.|
00000060: 00 00 00 40 c2 00 41 e4 00 00 00 00 39 e4 00 00 |...@..A.....9...|
00000070: 00 f0 cf 28 ca 03 06 00 00 00 13 20 00 00 0c 43 |...(....... ...C|
00000080: 06 00 c8 03 00 05 00 01 00 01 19 05 cc 03 01 00 |................|
00000090: 60 ce 03 01 01 60 d0 03 01 02 70 d2 03 00 00 40 |`....`....p....@|
000000a0: d4 03 00 04 00 c2 00 c5 04 63 02 00 63 01 00 63 |.........c..c..c|
000000b0: 00 00 b8 cb b9 cc ba cd bb ce c4 04 f0 29 ca 03 |.............)..|
000000c0: 16 00 00 44 18 07 07 08 08 07 07 08 0c 07 07 08 |...D............|
000000d0: 04 07 07 00 01 14 07 00 0c 43 06 00 d4 03 00 00 |.........C......|
000000e0: 00 03 04 00 55 00 cc 03 00 09 ce 03 01 09 d0 03 |....U...........|
000000f0: 02 0d d2 03 03 01 39 eb 00 00 00 43 ec 00 00 00 |......9....C....|
00000100: 68 00 00 24 01 00 0e 39 eb 00 00 00 43 ec 00 00 |h..$...9....C...|
00000110: 00 68 01 00 24 01 00 0e 39 eb 00 00 00 43 ec 00 |.h..$...9....C..|
00000120: 00 00 68 02 00 24 01 00 0e 39 eb 00 00 00 43 ec |..h..$...9....C.|
00000130: 00 00 00 e2 24 01 00 0e 68 00 00 93 69 00 00 0e |....$...h...i...|
00000140: bf 0a 11 69 01 00 0e bf 14 e6 29 ca 03 12 05 04 |...i......).....|
00000150: 44 08 58 00 58 00 49 18 07 17 26 00 1c 08 26 00 |D.X.X.I...&...&.|
00000160: 00                                              |.|
```

### WASM
```
00000000: 05 09 16 74 65 73 74 43 6c 6f 73 75 72 65 44 5f |...testClosureD_|
00000010: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000020: 73 2f 63 6c 6f 73 75 72 65 2d 76 61 72 73 2e 6a |s/closure-vars.j|
00000030: 73 02 61 02 62 02 63 02 64 0a 69 6e 6e 65 72 0e |s.a.b.c.d.inner.|
00000040: 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c 00 06 00 a4 |console.log.....|
00000050: 01 00 01 00 01 00 01 16 01 a6 01 00 00 00 40 e4 |..............@.|
00000060: 00 00 00 40 c2 00 41 e4 00 00 00 00 39 e4 00 00 |...@..A.....9...|
00000070: 00 f0 cf 28 ca 03 08 00 00 00 0e 20 00 1b 16 00 |...(....... ....|
00000080: 0c 43 06 00 c8 03 00 05 00 01 00 01 19 05 cc 03 |.C..............|
00000090: 01 00 60 ce 03 01 01 60 d0 03 01 02 70 d2 03 00 |..`....`....p...|
000000a0: 00 40 d4 03 00 04 00 c2 00 c5 04 63 02 00 63 01 |.@.........c..c.|
000000b0: 00 63 00 00 b8 cb b9 cc ba cd bb ce c4 04 f0 29 |.c.............)|
000000c0: ca 03 08 00 00 00 15 1c 08 0c 0a 00 0c 43 06 00 |.............C..|
000000d0: d4 03 00 00 00 03 04 00 55 00 cc 03 00 09 ce 03 |........U.......|
000000e0: 01 09 d0 03 02 0d d2 03 03 01 39 eb 00 00 00 43 |..........9....C|
000000f0: ec 00 00 00 68 00 00 24 01 00 0e 39 eb 00 00 00 |....h..$...9....|
00000100: 43 ec 00 00 00 68 01 00 24 01 00 0e 39 eb 00 00 |C....h..$...9...|
00000110: 00 43 ec 00 00 00 68 02 00 24 01 00 0e 39 eb 00 |.C....h..$...9..|
00000120: 00 00 43 ec 00 00 00 e2 24 01 00 0e 68 00 00 93 |..C.....$...h...|
00000130: 69 00 00 0e bf 0a 11 69 01 00 0e bf 14 e6 29 ca |i......i......).|
00000140: 03 2a 05 04 03 08 1b 0e 1b 0a 11 01 17 15 1b 0e |.*..............|
00000150: 1b 0a 11 01 17 15 1b 0e 1b 0a 11 01 17 15 1b 0e |................|
00000160: 1b 0a 07 01 17 15 11 02 1c 01 26 00 00          |..........&..|
```