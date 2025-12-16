# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-nested.ts
**生成时间**: 2025-12-16T14:11:02.362Z

## 大小对比

- TypeScript编译器: 203 字节
- WASM编译器: 193 字节
- 差异: 10 字节 (5.18%)

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
      "string": "arr",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-nested.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 148
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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-nested.js",
      "offset": 20
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xc",
    "remaining": 138
  }
}
```

## 字节级差异

共发现 39 个字节差异:

- 偏移量 0x4f: TS=0x01 vs WASM=0x80
- 偏移量 0x55: TS=0x10 vs WASM=0x80
- 偏移量 0xa3: TS=0x26 vs WASM=0x1c
- 偏移量 0xa6: TS=0x3f vs WASM=0x00
- 偏移量 0xa7: TS=0x0a vs WASM=0x25
- 偏移量 0xa8: TS=0x07 vs WASM=0x0a
- 偏移量 0xa9: TS=0x06 vs WASM=0x00
- 偏移量 0xaa: TS=0x07 vs WASM=0x1b
- 偏移量 0xab: TS=0x07 vs WASM=0x0e
- 偏移量 0xac: TS=0x12 vs WASM=0x1b
- 偏移量 0xad: TS=0x02 vs WASM=0x0a
- 偏移量 0xae: TS=0x07 vs WASM=0x20
- 偏移量 0xb0: TS=0x07 vs WASM=0x0c
- 偏移量 0xb1: TS=0x07 vs WASM=0x06
- 偏移量 0xb2: TS=0x12 vs WASM=0x07
- 偏移量 0xb3: TS=0x00 vs WASM=0x0d
- 偏移量 0xb4: TS=0x07 vs WASM=0x17
- 偏移量 0xb5: TS=0x0a vs WASM=0x15
- 偏移量 0xb6: TS=0x07 vs WASM=0x1b
- 偏移量 0xb7: TS=0x05 vs WASM=0x0e
- ... (显示前20个差异，总共39个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 06 61 72 72 02 61 0e 63 6f 6e 73 6f 6c 65 |...arr.a.console|
00000010: 06 6c 6f 67 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logD__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 61 72 72 61 79 2d 6e 65 |ixtures/array-ne|
00000030: 73 74 65 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |sted.js.........|
00000040: 04 00 00 57 01 a6 01 00 00 00 40 e4 00 00 00 01 |...W......@.....|
00000050: 3f e4 00 00 00 10 b8 b9 26 02 00 ba bb 26 02 00 |?.......&....&..|
00000060: 0b bc 4e e5 00 00 00 26 03 00 3b e4 00 00 00 39 |..N....&..;....9|
00000070: e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 b7 48 |....C....9.....H|
00000080: b8 48 24 01 00 cb 39 e6 00 00 00 43 e7 00 00 00 |.H$...9....C....|
00000090: 39 e4 00 00 00 b9 48 42 e5 00 00 00 24 01 00 cf |9.....HB....$...|
000000a0: 28 d0 03 26 00 00 3f 0a 07 06 07 07 12 02 07 06 |(..&..?.........|
000000b0: 07 07 12 00 07 0a 07 05 00 05 05 0c 11 0b 00 05 |................|
000000c0: 0a 0b 34 18 1b 08 07 07 07 0e 00                |..4........|
```

### WASM
```
00000000: 05 05 06 61 72 72 02 61 0e 63 6f 6e 73 6f 6c 65 |...arr.a.console|
00000010: 06 6c 6f 67 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logD__tests__/f|
00000020: 69 78 74 75 72 65 73 2f 61 72 72 61 79 2d 6e 65 |ixtures/array-ne|
00000030: 73 74 65 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 |sted.js.........|
00000040: 04 00 00 57 01 a6 01 00 00 00 40 e4 00 00 00 80 |...W......@.....|
00000050: 3f e4 00 00 00 80 b8 b9 26 02 00 ba bb 26 02 00 |?.......&....&..|
00000060: 0b bc 4e e5 00 00 00 26 03 00 3b e4 00 00 00 39 |..N....&..;....9|
00000070: e6 00 00 00 43 e7 00 00 00 39 e4 00 00 00 b7 48 |....C....9.....H|
00000080: b8 48 24 01 00 cb 39 e6 00 00 00 43 e7 00 00 00 |.H$...9....C....|
00000090: 39 e4 00 00 00 b9 48 42 e5 00 00 00 24 01 00 cf |9.....HB....$...|
000000a0: 28 d0 03 1c 00 00 00 25 0a 00 1b 0e 1b 0a 20 06 |(......%...... .|
000000b0: 0c 06 07 0d 17 15 1b 0e 1b 0a 20 06 07 06 1b 0d |.......... .....|
000000c0: 00                                              |.|
```