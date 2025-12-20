# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-vars.ts
**生成时间**: 2025-12-20T21:36:56.994Z

## 大小对比

- TypeScript编译器: 315 字节
- WASM编译器: 365 字节
- 差异: -50 字节 (-13.70%)

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
    "remaining": 240
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

共发现 148 个字节差异:

- 偏移量 0xc2: TS=0x00 vs WASM=0x08
- 偏移量 0xc4: TS=0x0c vs WASM=0x00
- 偏移量 0xc5: TS=0x43 vs WASM=0x00
- 偏移量 0xc6: TS=0x06 vs WASM=0x15
- 偏移量 0xc7: TS=0x00 vs WASM=0x1c
- 偏移量 0xc8: TS=0xd4 vs WASM=0x08
- 偏移量 0xc9: TS=0x03 vs WASM=0x0c
- 偏移量 0xca: TS=0x00 vs WASM=0x0a
- 偏移量 0xcc: TS=0x00 vs WASM=0x0c
- 偏移量 0xcd: TS=0x03 vs WASM=0x43
- 偏移量 0xce: TS=0x04 vs WASM=0x06
- 偏移量 0xd0: TS=0x55 vs WASM=0xd4
- 偏移量 0xd1: TS=0x00 vs WASM=0x03
- 偏移量 0xd2: TS=0xcc vs WASM=0x00
- 偏移量 0xd3: TS=0x03 vs WASM=0x00
- 偏移量 0xd5: TS=0x09 vs WASM=0x03
- 偏移量 0xd6: TS=0xce vs WASM=0x04
- 偏移量 0xd7: TS=0x03 vs WASM=0x00
- 偏移量 0xd8: TS=0x01 vs WASM=0x55
- 偏移量 0xd9: TS=0x09 vs WASM=0x00
- ... (显示前20个差异，总共148个)

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
00000070: 00 f0 cf 28 ca 03 08 00 00 00 0e 20 00 1b 16 00 |...(....... ....|
00000080: 0c 43 06 00 c8 03 00 05 00 01 00 01 19 05 cc 03 |.C..............|
00000090: 01 00 60 ce 03 01 01 60 d0 03 01 02 70 d2 03 00 |..`....`....p...|
000000a0: 00 40 d4 03 00 04 00 c2 00 c5 04 63 02 00 63 01 |.@.........c..c.|
000000b0: 00 63 00 00 b8 cb b9 cc ba cd bb ce c4 04 f0 29 |.c.............)|
000000c0: ca 03 00 00 0c 43 06 00 d4 03 00 00 00 03 04 00 |.....C..........|
000000d0: 55 00 cc 03 00 09 ce 03 01 09 d0 03 02 0d d2 03 |U...............|
000000e0: 03 01 39 eb 00 00 00 43 ec 00 00 00 68 00 00 24 |..9....C....h..$|
000000f0: 01 00 0e 39 eb 00 00 00 43 ec 00 00 00 68 01 00 |...9....C....h..|
00000100: 24 01 00 0e 39 eb 00 00 00 43 ec 00 00 00 68 02 |$...9....C....h.|
00000110: 00 24 01 00 0e 39 eb 00 00 00 43 ec 00 00 00 e2 |.$...9....C.....|
00000120: 24 01 00 0e 68 00 00 93 69 00 00 0e bf 0a 11 69 |$...h...i......i|
00000130: 01 00 0e bf 14 e6 29 ca 03 00 00                |......)....|
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