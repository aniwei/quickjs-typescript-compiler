# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/async-await.ts
**生成时间**: 2025-12-16T14:11:02.390Z

## 大小对比

- TypeScript编译器: 392 字节
- WASM编译器: 302 字节
- 差异: 90 字节 (29.80%)

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
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 339
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

共发现 287 个字节差异:

- 偏移量 0x33: TS=0x00 vs WASM=0x0e
- 偏移量 0x34: TS=0x00 vs WASM=0x63
- 偏移量 0x35: TS=0x0c vs WASM=0x6f
- 偏移量 0x36: TS=0x00 vs WASM=0x6e
- 偏移量 0x37: TS=0x06 vs WASM=0x73
- 偏移量 0x38: TS=0x00 vs WASM=0x6f
- 偏移量 0x39: TS=0xa4 vs WASM=0x6c
- 偏移量 0x3a: TS=0x01 vs WASM=0x65
- 偏移量 0x3b: TS=0x00 vs WASM=0x06
- 偏移量 0x3c: TS=0x01 vs WASM=0x6c
- 偏移量 0x3d: TS=0x00 vs WASM=0x6f
- 偏移量 0x3e: TS=0x03 vs WASM=0x67
- 偏移量 0x3f: TS=0x00 vs WASM=0x0c
- 偏移量 0x40: TS=0x03 vs WASM=0x00
- 偏移量 0x41: TS=0x43 vs WASM=0x06
- 偏移量 0x42: TS=0x01 vs WASM=0x00
- 偏移量 0x43: TS=0xa6 vs WASM=0xa4
- 偏移量 0x46: TS=0x00 vs WASM=0x01
- 偏移量 0x48: TS=0xc2 vs WASM=0x03
- 偏移量 0x4a: TS=0x41 vs WASM=0x03
- ... (显示前20个差异，总共287个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 14 66 65 74 63 68 56 61 6c 75 65 06 72 75 |...fetchValue.ru|
00000010: 6e 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |nB__tests__/fixt|
00000020: 75 72 65 73 2f 61 73 79 6e 63 2d 61 77 61 69 74 |ures/async-await|
00000030: 2e 6a 73 00 00 0c 00 06 00 a4 01 00 01 00 03 00 |.js.............|
00000040: 03 43 01 a6 01 00 00 00 c2 00 41 e4 00 00 00 00 |.C........A.....|
00000050: c2 00 3b e4 00 00 00 c2 01 41 e5 00 00 00 00 c2 |..;......A......|
00000060: 01 3b e5 00 00 00 c2 00 3b e4 00 00 00 c2 01 3b |.;......;......;|
00000070: e5 00 00 00 39 e5 00 00 00 f0 43 81 00 00 00 c2 |....9.....C.....|
00000080: 02 4f 00 00 00 00 24 01 00 cf 28 cc 03 0c 00 00 |.O....$...(.....|
00000090: be 00 00 07 0a 00 39 16 25 15 00 0c 62 06 00 c8 |......9.%...b...|
000000a0: 03 00 00 00 00 00 00 14 00 b6 01 00 c8 29 00 00 |.............)..|
000000b0: 00 01 2a 00 00 00 c8 22 00 00 00 28 29 cc 03 00 |..*...."...()...|
000000c0: 00 0c 62 06 00 ca 03 00 01 00 00 00 00 67 01 84 |..b..........g..|
000000d0: 01 01 00 30 b6 01 00 c8 50 00 00 00 bf 42 00 00 |...0....P....B..|
000000e0: 00 01 00 c8 70 00 00 00 c8 70 00 00 00 ba e7 00 |....p....p......|
000000f0: 00 00 01 00 43 e8 00 00 00 c8 7c e7 00 00 00 42 |....C.....|....B|
00000100: 00 00 00 c8 85 00 00 00 ba 42 e8 00 00 00 00 c8 |.........B......|
00000110: 70 00 00 00 24 02 00 0e c8 98 00 00 00 ba 42 e8 |p...$.........B.|
00000120: 00 00 00 00 c8 a0 00 00 00 01 01 00 00 00 c8 9e |................|
00000130: 00 00 00 9f c8 91 00 00 00 28 29 cc 03 00 00 0c |.........().....|
00000140: 02 06 00 00 01 00 01 00 00 00 33 01 d8 01 00 00 |..........3.....|
00000150: 00 b6 01 00 c8 ba 00 00 00 ba e7 00 00 00 01 00 |................|
00000160: 43 e8 00 00 00 c8 c6 00 00 00 04 6c 00 00 00 c8 |C..........l....|
00000170: ce 00 00 00 ba 6c 00 00 00 01 00 c8 ba 00 00 00 |.....l..........|
00000180: 24 02 00 28 cc 03 00 00                         |$..(....|
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