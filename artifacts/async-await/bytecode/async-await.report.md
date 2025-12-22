# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/async-await.ts
**生成时间**: 2025-12-22T11:00:40.263Z

## 大小对比

- TypeScript编译器: 307 字节
- WASM编译器: 302 字节
- 差异: 5 字节 (1.66%)

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
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "fetchValue",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-await.js",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xc",
    "remaining": 244
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
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "fetchValue",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "run",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-await.js",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xc",
    "remaining": 239
  }
}
```

## 字节级差异

共发现 156 个字节差异:

- 偏移量 0x4b: TS=0x33 vs WASM=0x2e
- 偏移量 0x7b: TS=0x4f vs WASM=0x24
- 偏移量 0x7c: TS=0x00 vs WASM=0x01
- 偏移量 0x7e: TS=0x00 vs WASM=0xcf
- 偏移量 0x7f: TS=0x00 vs WASM=0x28
- 偏移量 0x80: TS=0x24 vs WASM=0xcc
- 偏移量 0x81: TS=0x01 vs WASM=0x03
- 偏移量 0x82: TS=0x00 vs WASM=0x0c
- 偏移量 0x83: TS=0xcf vs WASM=0x00
- 偏移量 0x84: TS=0x28 vs WASM=0x00
- 偏移量 0x85: TS=0xcc vs WASM=0x00
- 偏移量 0x86: TS=0x03 vs WASM=0x1c
- 偏移量 0x87: TS=0x0c vs WASM=0x10
- 偏移量 0x89: TS=0x00 vs WASM=0x1b
- 偏移量 0x8a: TS=0x00 vs WASM=0x06
- 偏移量 0x8b: TS=0x1c vs WASM=0x07
- 偏移量 0x8c: TS=0x10 vs WASM=0x04
- 偏移量 0x8d: TS=0x00 vs WASM=0x25
- 偏移量 0x8e: TS=0x1b vs WASM=0x0a
- 偏移量 0x8f: TS=0x06 vs WASM=0x00
- ... (显示前20个差异，总共156个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 14 66 65 74 63 68 56 61 6c 75 65 06 72 75 |...fetchValue.ru|
00000010: 6e 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |nB__tests__/fixt|
00000020: 75 72 65 73 2f 61 73 79 6e 63 2d 61 77 61 69 74 |ures/async-await|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c |.js.console.log.|
00000040: 00 06 00 a4 01 00 01 00 03 00 03 33 01 a6 01 00 |...........3....|
00000050: 00 00 40 e4 00 00 00 40 40 e5 00 00 00 40 c2 00 |..@....@@....@..|
00000060: 41 e4 00 00 00 00 c2 01 41 e5 00 00 00 00 39 e5 |A.......A.....9.|
00000070: 00 00 00 f0 43 81 00 00 00 c2 02 4f 00 00 00 00 |....C......O....|
00000080: 24 01 00 cf 28 cc 03 0c 00 00 00 1c 10 00 1b 06 |$...(...........|
00000090: 07 04 3e 0a 00 0c 62 06 00 c8 03 00 00 00 01 00 |..>...b.........|
000000a0: 00 03 00 bf 2a 2f cc 03 04 00 00 0d 08 00 0c 62 |....*/.........b|
000000b0: 06 00 ca 03 00 01 00 04 00 00 27 01 84 01 01 00 |..........'.....|
000000c0: 30 63 00 00 39 e4 00 00 00 f0 8d cb 39 e7 00 00 |0c..9.......9...|
000000d0: 00 43 e8 00 00 00 04 42 00 00 00 64 00 00 24 02 |.C.....B...d..$.|
000000e0: 00 0e 64 00 00 b8 9f 2f cc 03 14 03 00 12 30 1b |..d..../......0.|
000000f0: 14 12 3b 1b 0e 34 1c 11 13 17 07 16 0c 07 19 00 |..;..4..........|
00000100: 0c 02 06 00 00 01 00 01 04 00 00 13 01 d8 01 00 |................|
00000110: 01 00 39 e7 00 00 00 43 e8 00 00 00 04 6c 00 00 |..9....C.....l..|
00000120: 00 d3 25 02 00 cc 03 0a 08 0b 02 14 1b 0e 34 1a |..%...........4.|
00000130: 07 11 00                                        |...|
```

### WASM
```
00000000: 05 05 14 66 65 74 63 68 56 61 6c 75 65 06 72 75 |...fetchValue.ru|
00000010: 6e 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |nB__tests__/fixt|
00000020: 75 72 65 73 2f 61 73 79 6e 63 2d 61 77 61 69 74 |ures/async-await|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0c |.js.console.log.|
00000040: 00 06 00 a4 01 00 01 00 03 00 03 2e 01 a6 01 00 |................|
00000050: 00 00 40 e4 00 00 00 40 40 e5 00 00 00 40 c2 00 |..@....@@....@..|
00000060: 41 e4 00 00 00 00 c2 01 41 e5 00 00 00 00 39 e5 |A.......A.....9.|
00000070: 00 00 00 f0 43 81 00 00 00 c2 02 24 01 00 cf 28 |....C......$...(|
00000080: cc 03 0c 00 00 00 1c 10 00 1b 06 07 04 25 0a 00 |.............%..|
00000090: 0c 62 06 00 c8 03 00 00 00 01 00 00 03 00 bf 2a |.b.............*|
000000a0: 2f cc 03 04 00 00 0d 08 00 0c 62 06 00 ca 03 00 |/.........b.....|
000000b0: 01 00 04 00 00 27 01 84 01 01 00 30 63 00 00 39 |.....'.....0c..9|
000000c0: e4 00 00 00 f0 8d cb 39 e7 00 00 00 43 e8 00 00 |.......9....C...|
000000d0: 00 04 42 00 00 00 64 00 00 24 02 00 0e 64 00 00 |..B...d..$...d..|
000000e0: b8 9f 2f cc 03 14 03 00 12 30 1b 14 12 3b 1b 0e |../......0...;..|
000000f0: 34 1c 11 13 17 07 16 0c 07 19 00 0c 02 06 00 00 |4...............|
00000100: 01 00 01 04 00 00 13 01 d8 01 00 01 00 39 e7 00 |.............9..|
00000110: 00 00 43 e8 00 00 00 04 6c 00 00 00 d3 25 02 00 |..C.....l....%..|
00000120: cc 03 0a 08 0b 02 14 1b 0e 34 1a 07 11 00       |.........4....|
```