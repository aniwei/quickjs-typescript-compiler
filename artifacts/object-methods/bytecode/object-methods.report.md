# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/object-methods.ts
**生成时间**: 2025-12-11T11:32:28.121Z

## 大小对比

- TypeScript编译器: 201 字节
- WASM编译器: 209 字节
- 差异: -8 字节 (-3.83%)

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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 133
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
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 48
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 52
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xd",
    "remaining": 141
  }
}
```

## 字节级差异

共发现 39 个字节差异:

- 偏移量 0x5f: TS=0xff vs WASM=0xec
- 偏移量 0x63: TS=0xcb vs WASM=0xb8
- 偏移量 0x69: TS=0xd5 vs WASM=0xc2
- 偏移量 0x71: TS=0xf6 vs WASM=0xe3
- 偏移量 0x7c: TS=0x64 vs WASM=0x68
- 偏移量 0x84: TS=0xcc vs WASM=0xb9
- 偏移量 0x97: TS=0x25 vs WASM=0x1b
- 偏移量 0x9b: TS=0x25 vs WASM=0x11
- 偏移量 0xa8: TS=0x00 vs WASM=0x01
- 偏移量 0xad: TS=0x09 vs WASM=0x0b
- 偏移量 0xae: TS=0x01 vs WASM=0x02
- 偏移量 0xb4: TS=0x08 vs WASM=0x10
- 偏移量 0xb5: TS=0x42 vs WASM=0x00
- 偏移量 0xb6: TS=0xe6 vs WASM=0x01
- 偏移量 0xb8: TS=0x00 vs WASM=0x08
- 偏移量 0xb9: TS=0x00 vs WASM=0xcb
- 偏移量 0xba: TS=0xd3 vs WASM=0xc7
- 偏移量 0xbb: TS=0x9f vs WASM=0x42
- 偏移量 0xbc: TS=0x28 vs WASM=0xe6
- 偏移量 0xbd: TS=0xc8 vs WASM=0x00
- ... (显示前20个差异，总共39个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6d 65 74 68 6f 64 73 2e 6a 73 |bject-methods.js|
00000030: 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c |.obj.x.console.l|
00000040: 6f 67 02 79 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.y......... ..|
00000050: a4 01 00 00 00 05 01 01 30 00 ca 03 00 0d 08 ff |........0.......|
00000060: 02 29 0b cb 4e e6 00 00 00 d5 00 56 6a 00 00 00 |.)..N......Vj...|
00000070: 04 f6 39 e7 00 00 00 43 e8 00 00 00 64 00 00 43 |..9....C....d..C|
00000080: 6a 00 00 00 cc 24 01 00 24 01 00 0e 06 2f c8 03 |j....$..$..../..|
00000090: 10 00 00 00 14 0c 00 25 0e 1b 0a 25 06 20 08 11 |.......%...%. ..|
000000a0: 0f 00 0c 42 07 01 00 01 00 01 02 00 00 09 01 d2 |...B............|
000000b0: 03 00 01 00 08 42 e6 00 00 00 d3 9f 28 c8 03 08 |.....B......(...|
000000c0: 02 04 21 28 25 03 07 1b 00                      |..!(%....|
```

### WASM
```
00000000: 05 06 5a 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..Z__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6d 65 74 68 6f 64 73 2e 6a 73 |bject-methods.js|
00000030: 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 06 6c |.obj.x.console.l|
00000040: 6f 67 02 79 0d c8 03 00 00 00 00 00 0c 20 06 01 |og.y......... ..|
00000050: a4 01 00 00 00 05 01 01 30 00 ca 03 00 0d 08 ec |........0.......|
00000060: 02 29 0b b8 4e e6 00 00 00 c2 00 56 6a 00 00 00 |.)..N......Vj...|
00000070: 04 e3 39 e7 00 00 00 43 e8 00 00 00 68 00 00 43 |..9....C....h..C|
00000080: 6a 00 00 00 b9 24 01 00 24 01 00 0e 06 2f c8 03 |j....$..$..../..|
00000090: 10 00 00 00 14 0c 00 1b 0e 1b 0a 11 06 20 08 11 |............. ..|
000000a0: 0f 00 0c 42 07 01 00 01 01 01 02 00 00 0b 02 d2 |...B............|
000000b0: 03 00 01 00 10 00 01 00 08 cb c7 42 e6 00 00 00 |...........B....|
000000c0: d3 9f 28 c8 03 0a 02 04 12 1e 1b 0a 07 03 07 1b |..(.............|
000000d0: 00                                              |.|
```