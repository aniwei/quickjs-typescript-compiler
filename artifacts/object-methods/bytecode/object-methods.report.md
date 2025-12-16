# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-methods.ts
**生成时间**: 2025-12-16T14:11:02.558Z

## 大小对比

- TypeScript编译器: 155 字节
- WASM编译器: 206 字节
- 差异: -51 字节 (-24.76%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-methods.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xc",
    "remaining": 98
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 8
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-methods.js",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 147
  }
}
```

## 字节级差异

共发现 123 个字节差异:

- 偏移量 0x1: TS=0x05 vs WASM=0x06
- 偏移量 0x39: TS=0x0c vs WASM=0x02
- 偏移量 0x3a: TS=0x00 vs WASM=0x79
- 偏移量 0x3b: TS=0x06 vs WASM=0x0c
- 偏移量 0x3d: TS=0xa4 vs WASM=0x06
- 偏移量 0x3e: TS=0x01 vs WASM=0x00
- 偏移量 0x3f: TS=0x00 vs WASM=0xa4
- 偏移量 0x42: TS=0x05 vs WASM=0x01
- 偏移量 0x44: TS=0x00 vs WASM=0x05
- 偏移量 0x45: TS=0x35 vs WASM=0x00
- 偏移量 0x47: TS=0xa6 vs WASM=0x3d
- 偏移量 0x49: TS=0x00 vs WASM=0xa6
- 偏移量 0x4a: TS=0x00 vs WASM=0x01
- 偏移量 0x4c: TS=0x40 vs WASM=0x00
- 偏移量 0x4d: TS=0xe4 vs WASM=0x00
- 偏移量 0x4e: TS=0x00 vs WASM=0x40
- 偏移量 0x4f: TS=0x00 vs WASM=0xe4
- 偏移量 0x51: TS=0x01 vs WASM=0x00
- 偏移量 0x52: TS=0x3f vs WASM=0x00
- 偏移量 0x53: TS=0xe4 vs WASM=0x80
- ... (显示前20个差异，总共123个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 |...obj.x.console|
00000010: 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logH__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6d |ixtures/object-m|
00000030: 65 74 68 6f 64 73 2e 6a 73 0c 00 06 00 a4 01 00 |ethods.js.......|
00000040: 01 00 05 00 00 35 01 a6 01 00 00 00 40 e4 00 00 |.....5......@...|
00000050: 00 01 3f e4 00 00 00 10 0b b8 4e e5 00 00 00 3b |..?.......N....;|
00000060: e4 00 00 00 39 e6 00 00 00 43 e7 00 00 00 39 e4 |....9....C....9.|
00000070: 00 00 00 43 6a 00 00 00 b9 24 01 00 24 01 00 cf |...Cj....$..$...|
00000080: 28 d0 03 16 00 00 3e 18 08 09 07 05 1a 04 00 05 |(.....>.........|
00000090: 0c 0b 34 18 34 10 07 0f 11 17 00                |..4.4......|
```

### WASM
```
00000000: 05 06 06 6f 62 6a 02 78 0e 63 6f 6e 73 6f 6c 65 |...obj.x.console|
00000010: 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logH__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6d |ixtures/object-m|
00000030: 65 74 68 6f 64 73 2e 6a 73 02 79 0c 00 06 00 a4 |ethods.js.y.....|
00000040: 01 00 01 00 05 00 01 3d 01 a6 01 00 00 00 40 e4 |.......=......@.|
00000050: 00 00 00 80 3f e4 00 00 00 80 0b b8 4e e5 00 00 |....?.......N...|
00000060: 00 c2 00 56 6a 00 00 00 04 3b e4 00 00 00 39 e6 |...Vj....;....9.|
00000070: 00 00 00 43 e7 00 00 00 39 e4 00 00 00 43 6a 00 |...C....9....Cj.|
00000080: 00 00 b9 24 01 00 24 01 00 cf 28 d0 03 10 00 00 |...$..$...(.....|
00000090: 00 20 0c 00 1b 0e 1b 0a 1b 06 20 08 11 0f 00 0c |. ........ .....|
000000a0: 42 07 00 00 01 01 01 02 00 00 0b 02 d2 03 00 01 |B...............|
000000b0: 00 10 00 01 00 08 cb c7 42 e5 00 00 00 d3 9f 28 |........B......(|
000000c0: d0 03 0a 02 04 12 1e 1b 0a 07 03 07 1b 00       |..............|
```