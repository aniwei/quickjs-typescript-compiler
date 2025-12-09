# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-vars.ts
**生成时间**: 2025-12-09T14:28:02.669Z

## 大小对比

- TypeScript编译器: 348 字节
- WASM编译器: 371 字节
- 差异: -23 字节 (-6.20%)

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-vars.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "testClosure",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 70
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xd",
    "remaining": 264
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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-vars.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "testClosure",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 58
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 64
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 66
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 72
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xd",
    "remaining": 287
  }
}
```

## 字节级差异

共发现 223 个字节差异:

- 偏移量 0x40: TS=0x0a vs WASM=0x02
- 偏移量 0x41: TS=0x69 vs WASM=0x64
- 偏移量 0x42: TS=0x6e vs WASM=0x0a
- 偏移量 0x43: TS=0x6e vs WASM=0x69
- 偏移量 0x44: TS=0x65 vs WASM=0x6e
- 偏移量 0x45: TS=0x72 vs WASM=0x6e
- 偏移量 0x46: TS=0x02 vs WASM=0x65
- 偏移量 0x47: TS=0x64 vs WASM=0x72
- 偏移量 0x65: TS=0x02 vs WASM=0x01
- 偏移量 0x7c: TS=0x06 vs WASM=0x08
- 偏移量 0x83: TS=0x00 vs WASM=0x07
- 偏移量 0x84: TS=0x0c vs WASM=0x16
- 偏移量 0x85: TS=0x43 vs WASM=0x00
- 偏移量 0x86: TS=0x06 vs WASM=0x0c
- 偏移量 0x87: TS=0x01 vs WASM=0x43
- 偏移量 0x88: TS=0xca vs WASM=0x06
- 偏移量 0x89: TS=0x03 vs WASM=0x01
- 偏移量 0x8a: TS=0x00 vs WASM=0xca
- 偏移量 0x8b: TS=0x04 vs WASM=0x03
- 偏移量 0x8d: TS=0x01 vs WASM=0x05
- ... (显示前20个差异，总共223个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 76 61 72 73 2e 6a 73 16 74 |losure-vars.js.t|
00000030: 65 73 74 43 6c 6f 73 75 72 65 02 61 02 62 02 63 |estClosure.a.b.c|
00000040: 0a 69 6e 6e 65 72 02 64 0e 63 6f 6e 73 6f 6c 65 |.inner.d.console|
00000050: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000060: a4 01 00 00 00 02 01 01 0c 00 ca 03 00 01 08 ec |................|
00000070: 05 c2 00 e3 29 df f0 0e 06 2f c8 03 06 00 00 00 |....)..../......|
00000080: 07 20 00 00 0c 43 06 01 ca 03 00 04 00 01 00 01 |. ...C..........|
00000090: 1a 04 cc 03 01 00 60 ce 03 01 01 60 d0 03 01 02 |......`....`....|
000000a0: 70 d2 03 00 04 00 c2 00 c5 04 63 00 00 63 01 00 |p.........c..c..|
000000b0: 63 02 00 b8 cb b9 cc ba cd bb ce 5a 04 00 f0 29 |c..........Z...)|
000000c0: c8 03 06 00 00 00 15 1c 08 00 0c 43 06 01 d2 03 |...........C....|
000000d0: 00 00 00 03 04 00 56 00 cc 03 00 09 ce 03 01 09 |......V.........|
000000e0: d0 03 02 0d d4 03 03 01 39 eb 00 00 00 43 ec 00 |........9....C..|
000000f0: 00 00 68 00 00 24 01 00 0e 39 eb 00 00 00 43 ec |..h..$...9....C.|
00000100: 00 00 00 68 01 00 24 01 00 0e 39 eb 00 00 00 43 |...h..$...9....C|
00000110: ec 00 00 00 68 02 00 24 01 00 0e 39 eb 00 00 00 |....h..$...9....|
00000120: 43 ec 00 00 00 e2 24 01 00 0e 68 00 00 93 69 00 |C.....$...h...i.|
00000130: 00 0e bf 0a 11 69 01 00 0e bf 14 11 e6 29 c8 03 |.....i.......)..|
00000140: 1a 05 04 03 08 34 18 26 17 34 18 26 17 34 18 26 |.....4.&.4.&.4.&|
00000150: 17 34 18 1c 17 11 02 1c 01 26 00 00             |.4.......&..|
```

### WASM
```
00000000: 05 09 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 76 61 72 73 2e 6a 73 16 74 |losure-vars.js.t|
00000030: 65 73 74 43 6c 6f 73 75 72 65 02 61 02 62 02 63 |estClosure.a.b.c|
00000040: 02 64 0a 69 6e 6e 65 72 0e 63 6f 6e 73 6f 6c 65 |.d.inner.console|
00000050: 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 01 |.log......... ..|
00000060: a4 01 00 00 00 01 01 01 0c 00 ca 03 00 01 08 ec |................|
00000070: 05 c2 00 e3 29 df f0 0e 06 2f c8 03 08 00 00 00 |....)..../......|
00000080: 07 20 00 07 16 00 0c 43 06 01 ca 03 00 05 00 01 |. .....C........|
00000090: 00 01 19 05 cc 03 01 00 60 ce 03 01 01 60 d0 03 |........`....`..|
000000a0: 01 02 70 d2 03 00 00 40 d4 03 00 04 00 c2 00 c5 |..p....@........|
000000b0: 04 63 02 00 63 01 00 63 00 00 b8 cb b9 cc ba cd |.c..c..c........|
000000c0: bb ce c4 04 f0 29 c8 03 08 00 00 00 15 1c 08 0c |.....)..........|
000000d0: 0a 00 0c 43 06 01 d4 03 00 00 00 03 04 00 55 00 |...C..........U.|
000000e0: cc 03 00 09 ce 03 01 09 d0 03 02 0d d2 03 03 01 |................|
000000f0: 39 eb 00 00 00 43 ec 00 00 00 68 00 00 24 01 00 |9....C....h..$..|
00000100: 0e 39 eb 00 00 00 43 ec 00 00 00 68 01 00 24 01 |.9....C....h..$.|
00000110: 00 0e 39 eb 00 00 00 43 ec 00 00 00 68 02 00 24 |..9....C....h..$|
00000120: 01 00 0e 39 eb 00 00 00 43 ec 00 00 00 e2 24 01 |...9....C.....$.|
00000130: 00 0e 68 00 00 93 69 00 00 0e bf 0a 11 69 01 00 |..h...i......i..|
00000140: 0e bf 14 e6 29 c8 03 2a 05 04 03 08 1b 0e 1b 0a |....)..*........|
00000150: 11 01 17 15 1b 0e 1b 0a 11 01 17 15 1b 0e 1b 0a |................|
00000160: 11 01 17 15 1b 0e 1b 0a 07 01 17 15 11 02 1c 01 |................|
00000170: 26 00 00                                        |&..|
```