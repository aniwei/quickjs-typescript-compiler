# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/postfix-unary.ts
**生成时间**: 2025-11-22T14:52:37.883Z

## 大小对比

- TypeScript编译器: 404 字节
- WASM编译器: 422 字节
- 差异: -18 字节 (-4.27%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/postfix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 331
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/postfix-unary.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 67
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 71
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 349
  }
}
```

## 字节级差异

共发现 231 个字节差异:

- 偏移量 0x5a: TS=0x08 vs WASM=0x04
- 偏移量 0x7a: TS=0xe3 vs WASM=0x69
- 偏移量 0x7b: TS=0x0e vs WASM=0x00
- 偏移量 0x7c: TS=0x39 vs WASM=0x00
- 偏移量 0x7d: TS=0xe9 vs WASM=0x0e
- 偏移量 0x7e: TS=0x00 vs WASM=0x39
- 偏移量 0x7f: TS=0x00 vs WASM=0xe9
- 偏移量 0x81: TS=0x43 vs WASM=0x00
- 偏移量 0x82: TS=0xea vs WASM=0x00
- 偏移量 0x83: TS=0x00 vs WASM=0x43
- 偏移量 0x84: TS=0x00 vs WASM=0xea
- 偏移量 0x86: TS=0x68 vs WASM=0x00
- 偏移量 0x88: TS=0x00 vs WASM=0x68
- 偏移量 0x89: TS=0x24 vs WASM=0x00
- 偏移量 0x8a: TS=0x01 vs WASM=0x00
- 偏移量 0x8b: TS=0x00 vs WASM=0x24
- 偏移量 0x8c: TS=0x0e vs WASM=0x01
- 偏移量 0x8d: TS=0x68 vs WASM=0x00
- 偏移量 0x8e: TS=0x00 vs WASM=0x0e
- 偏移量 0x8f: TS=0x00 vs WASM=0x68
- ... (显示前20个差异，总共231个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 6f 73 74 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 |ostfix-unary.js.|
00000030: 61 02 62 06 6f 62 6a 06 61 72 72 0e 63 6f 6e 73 |a.b.obj.arr.cons|
00000040: 6f 6c 65 06 6c 6f 67 02 78 0d c8 03 00 00 00 00 |ole.log.x.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 08 04 00 d4 01 00 |.. .............|
00000060: ca 03 00 09 cc 03 01 09 ce 03 02 0d d0 03 03 0d |................|
00000070: 08 ec 02 29 b8 e3 68 00 00 93 e3 0e 39 e9 00 00 |...)..h.....9...|
00000080: 00 43 ea 00 00 00 68 00 00 24 01 00 0e 68 00 00 |.C....h..$...h..|
00000090: 92 e3 0e 39 e9 00 00 00 43 ea 00 00 00 68 00 00 |...9....C....h..|
000000a0: 24 01 00 0e bf 0a e4 39 e9 00 00 00 43 ea 00 00 |$......9....C...|
000000b0: 00 68 01 00 93 e4 24 01 00 0e 39 e9 00 00 00 43 |.h....$...9....C|
000000c0: ea 00 00 00 68 01 00 24 01 00 0e 39 e9 00 00 00 |....h..$...9....|
000000d0: 43 ea 00 00 00 68 01 00 92 e4 24 01 00 0e 39 e9 |C....h....$...9.|
000000e0: 00 00 00 43 ea 00 00 00 68 01 00 24 01 00 0e 0b |...C....h..$....|
000000f0: b8 4e eb 00 00 00 e5 68 02 00 11 42 eb 00 00 00 |.N.....h...B....|
00000100: 93 15 16 44 eb 00 00 00 0e 39 e9 00 00 00 43 ea |...D.....9....C.|
00000110: 00 00 00 68 02 00 42 eb 00 00 00 24 01 00 0e b8 |...h..B....$....|
00000120: 26 01 00 e6 68 03 00 b7 13 48 93 15 17 4b 0e 39 |&...h....H...K.9|
00000130: e9 00 00 00 43 ea 00 00 00 68 03 00 b7 48 24 01 |....C....h...H$.|
00000140: 00 0e 06 2f c8 03 4c 00 00 22 00 21 00 1b 0e 1b |.../..L..".!....|
00000150: 0a 11 01 17 15 21 00 1b 0e 1b 0a 11 01 27 15 1b |.....!.......'..|
00000160: 0e 1b 0a 1b 01 17 15 1b 0e 1b 0a 11 01 17 15 1b |................|
00000170: 0e 1b 0a 1b 01 17 15 1b 0e 1b 0a 11 01 40 15 5d |.............@.]|
00000180: 00 1b 0e 1b 0a 11 06 1b 07 31 15 3a 00 1b 0e 1b |.........1.:....|
00000190: 0a 1b 01 00                                     |....|
```

### WASM
```
00000000: 05 08 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 6f 73 74 66 69 78 2d 75 6e 61 72 79 2e 6a 73 02 |ostfix-unary.js.|
00000030: 61 02 62 06 6f 62 6a 06 61 72 72 0e 63 6f 6e 73 |a.b.obj.arr.cons|
00000040: 6f 6c 65 06 6c 6f 67 02 78 0d c8 03 00 00 00 00 |ole.log.x.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 04 04 00 d4 01 00 |.. .............|
00000060: ca 03 00 09 cc 03 01 09 ce 03 02 0d d0 03 03 0d |................|
00000070: 08 ec 02 29 b8 e3 68 00 00 93 69 00 00 0e 39 e9 |...)..h...i...9.|
00000080: 00 00 00 43 ea 00 00 00 68 00 00 24 01 00 0e 68 |...C....h..$...h|
00000090: 00 00 92 69 00 00 0e 39 e9 00 00 00 43 ea 00 00 |...i...9....C...|
000000a0: 00 68 00 00 24 01 00 0e bf 0a e4 39 e9 00 00 00 |.h..$......9....|
000000b0: 43 ea 00 00 00 68 01 00 93 69 01 00 24 01 00 0e |C....h...i..$...|
000000c0: 39 e9 00 00 00 43 ea 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
000000d0: 0e 39 e9 00 00 00 43 ea 00 00 00 68 01 00 92 69 |.9....C....h...i|
000000e0: 01 00 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 00 |..$...9....C....|
000000f0: 68 01 00 24 01 00 0e 0b b8 4e eb 00 00 00 e5 68 |h..$.....N.....h|
00000100: 02 00 43 eb 00 00 00 91 44 eb 00 00 00 39 e9 00 |..C.....D....9..|
00000110: 00 00 43 ea 00 00 00 68 02 00 42 eb 00 00 00 24 |..C....h..B....$|
00000120: 01 00 0e b8 26 01 00 e6 68 03 00 b7 4a 91 4b 39 |....&...h...J.K9|
00000130: e9 00 00 00 43 ea 00 00 00 68 03 00 b7 48 24 01 |....C....h...H$.|
00000140: 00 0e 06 2f c8 03 5e 00 00 21 00 11 02 1c 01 1b |.../..^..!......|
00000150: 0e 1b 0a 11 01 17 15 11 02 1c 01 1b 0e 1b 0a 11 |................|
00000160: 01 27 15 1b 0e 1b 0a 11 02 16 03 17 15 1b 0e 1b |.'..............|
00000170: 0a 11 01 17 15 1b 0e 1b 0a 11 02 16 03 17 15 1b |................|
00000180: 0e 1b 0a 11 01 40 15 11 06 1b 04 21 09 1b 0e 1b |.....@.....!....|
00000190: 0a 11 06 1b 07 31 15 16 06 07 06 0d 0b 1b 0e 1b |.....1..........|
000001a0: 0a 16 06 07 07 00                               |......|
```