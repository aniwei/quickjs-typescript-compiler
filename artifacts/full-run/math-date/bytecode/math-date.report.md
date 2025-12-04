# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/math-date.ts
**生成时间**: 2025-12-04T06:33:08.486Z

## 大小对比

- TypeScript编译器: 254 字节
- WASM编译器: 256 字节
- 差异: -2 字节 (-0.78%)

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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/math-date.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getTime",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 181
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/math-date.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "getTime",
      "offset": 57
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 65
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 73,
    "tag": "0xd",
    "remaining": 183
  }
}
```

## 字节级差异

共发现 139 个字节差异:

- 偏移量 0x58: TS=0x01 vs WASM=0x00
- 偏移量 0x5c: TS=0x00 vs WASM=0x01
- 偏移量 0x5d: TS=0x6a vs WASM=0x64
- 偏移量 0x5e: TS=0x01 vs WASM=0x00
- 偏移量 0x61: TS=0x01 vs WASM=0x00
- 偏移量 0x62: TS=0x00 vs WASM=0x01
- 偏移量 0x63: TS=0x20 vs WASM=0x08
- 偏移量 0x64: TS=0xca vs WASM=0xec
- 偏移量 0x65: TS=0x03 vs WASM=0x02
- 偏移量 0x66: TS=0x00 vs WASM=0x29
- 偏移量 0x67: TS=0x01 vs WASM=0x39
- 偏移量 0x68: TS=0x08 vs WASM=0xa7
- 偏移量 0x69: TS=0xec vs WASM=0x00
- 偏移量 0x6a: TS=0x02 vs WASM=0x00
- 偏移量 0x6b: TS=0x29 vs WASM=0x00
- 偏移量 0x6c: TS=0x39 vs WASM=0x11
- 偏移量 0x6d: TS=0xa7 vs WASM=0xc1
- 偏移量 0x6f: TS=0x00 vs WASM=0x21
- 偏移量 0x70: TS=0x00 vs WASM=0x01
- 偏移量 0x71: TS=0x11 vs WASM=0x00
- ... (显示前20个差异，总共139个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 61 74 68 2d 64 61 74 65 2e 6a 73 02 64 0e 63 6f |ath-date.js.d.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0e 67 65 74 54 69 6d |nsole.log.getTim|
00000040: 65 06 61 62 73 06 6d 61 78 0d c8 03 00 00 00 00 |e.abs.max.......|
00000050: 00 0c 20 06 01 a4 01 00 01 00 07 01 00 6a 01 ca |.. ..........j..|
00000060: 03 01 00 20 ca 03 00 01 08 ec 02 29 39 a7 00 00 |... .......)9...|
00000070: 00 11 01 00 80 6e 87 21 01 00 e3 39 e6 00 00 00 |.....n.!...9....|
00000080: 43 e7 00 00 00 5a 00 00 43 e8 00 00 00 24 00 00 |C....Z..C....$..|
00000090: 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 00 39 a5 |$...9....C....9.|
000000a0: 00 00 00 43 e9 00 00 00 bf 0a 8e 24 01 00 24 01 |...C.......$..$.|
000000b0: 00 0e 39 e6 00 00 00 43 e7 00 00 00 39 a5 00 00 |..9....C....9...|
000000c0: 00 43 ea 00 00 00 b8 b9 ba 24 03 00 24 01 00 0e |.C.......$..$...|
000000d0: 06 2f c8 03 28 00 00 16 18 4e 17 1b 0e 1b 0a 11 |./..(....N......|
000000e0: 02 1b 10 11 13 17 15 1b 0e 1b 0a 1b 08 2a 08 11 |.............*..|
000000f0: 11 17 15 1b 0e 1b 0a 1b 08 2a 08 11 11 00       |.........*....|
```

### WASM
```
00000000: 05 07 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 61 74 68 2d 64 61 74 65 2e 6a 73 02 64 0e 63 6f |ath-date.js.d.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0e 67 65 74 54 69 6d |nsole.log.getTim|
00000040: 65 06 61 62 73 06 6d 61 78 0d c8 03 00 00 00 00 |e.abs.max.......|
00000050: 00 0c 20 06 01 a4 01 00 00 00 07 01 01 64 00 ca |.. ..........d..|
00000060: 03 00 01 08 ec 02 29 39 a7 00 00 00 11 c1 00 21 |......)9.......!|
00000070: 01 00 e3 39 e6 00 00 00 43 e7 00 00 00 df 43 e8 |...9....C.....C.|
00000080: 00 00 00 24 00 00 24 01 00 0e 39 e6 00 00 00 43 |...$..$...9....C|
00000090: e7 00 00 00 39 a5 00 00 00 43 e9 00 00 00 bf f6 |....9....C......|
000000a0: 24 01 00 24 01 00 0e 39 e6 00 00 00 43 e7 00 00 |$..$...9....C...|
000000b0: 00 39 a5 00 00 00 43 ea 00 00 00 b8 b9 ba 24 03 |.9....C.......$.|
000000c0: 00 24 01 00 0e 06 2f c8 03 2c 00 00 16 18 2a 08 |.$..../..,....*.|
000000d0: 17 1f 1b 0e 1b 0a 07 02 1b 10 11 13 17 15 1b 0e |................|
000000e0: 1b 0a 1b 08 1b 0a 0c 01 11 11 17 15 1b 0e 1b 0a |................|
000000f0: 1b 08 2a 08 11 11 00 06 00 00 00 e8 76 48 77 42 |..*.........vHwB|
```