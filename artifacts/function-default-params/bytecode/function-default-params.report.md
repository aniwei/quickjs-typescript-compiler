# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/function-default-params.ts
**生成时间**: 2025-12-16T14:11:02.524Z

## 大小对比

- TypeScript编译器: 255 字节
- WASM编译器: 229 字节
- 差异: 26 字节 (11.35%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "QuickJS",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-default-params.js",
      "offset": 16
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 68
    },
    {
      "index": 5,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 69
    }
  ],
  "functionHeader": {
    "offset": 70,
    "tag": "0xc",
    "remaining": 185
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "QuickJS",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/function-default-params.js",
      "offset": 16
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 68
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 76
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Hello",
      "offset": 80
    }
  ],
  "functionHeader": {
    "offset": 86,
    "tag": "0xc",
    "remaining": 143
  }
}
```

## 字节级差异

共发现 162 个字节差异:

- 偏移量 0x1: TS=0x06 vs WASM=0x07
- 偏移量 0x44: TS=0x00 vs WASM=0x0e
- 偏移量 0x45: TS=0x00 vs WASM=0x63
- 偏移量 0x46: TS=0x0c vs WASM=0x6f
- 偏移量 0x47: TS=0x00 vs WASM=0x6e
- 偏移量 0x48: TS=0x06 vs WASM=0x73
- 偏移量 0x49: TS=0x00 vs WASM=0x6f
- 偏移量 0x4a: TS=0xa4 vs WASM=0x6c
- 偏移量 0x4b: TS=0x01 vs WASM=0x65
- 偏移量 0x4c: TS=0x00 vs WASM=0x06
- 偏移量 0x4d: TS=0x01 vs WASM=0x6c
- 偏移量 0x4e: TS=0x00 vs WASM=0x6f
- 偏移量 0x4f: TS=0x02 vs WASM=0x67
- 偏移量 0x50: TS=0x00 vs WASM=0x0a
- 偏移量 0x51: TS=0x01 vs WASM=0x48
- 偏移量 0x52: TS=0x2a vs WASM=0x65
- 偏移量 0x53: TS=0x01 vs WASM=0x6c
- 偏移量 0x54: TS=0xa6 vs WASM=0x6c
- 偏移量 0x55: TS=0x01 vs WASM=0x6f
- 偏移量 0x56: TS=0x00 vs WASM=0x0c
- ... (显示前20个差异，总共162个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0a 67 72 65 65 74 0e 51 75 69 63 6b 4a 53 |...greet.QuickJS|
00000010: 5a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |Z__tests__/fixtu|
00000020: 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 64 65 66 |res/function-def|
00000030: 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 0a 77 |ault-params.js.w|
00000040: 6f 72 6c 64 00 00 0c 00 06 00 a4 01 00 01 00 02 |orld............|
00000050: 00 01 2a 01 a6 01 00 00 00 c2 00 41 e4 00 00 00 |..*........A....|
00000060: 00 c2 00 3b e4 00 00 00 c2 00 3b e4 00 00 00 39 |...;......;....9|
00000070: e4 00 00 00 f0 cb 39 e4 00 00 00 04 e5 00 00 00 |......9.........|
00000080: f1 cf 28 cc 03 0a 00 00 73 00 26 00 1b 0c 1b 0b |..(.....s.&.....|
00000090: 00 0c 41 06 00 c8 03 01 00 00 00 00 00 58 01 70 |..A..........X.p|
000000a0: 00 00 00 5d 00 00 11 06 ad 6c 00 00 00 00 0e c8 |...].....l......|
000000b0: 16 00 00 00 04 e7 00 00 00 11 5e 00 00 b8 00 00 |..........^.....|
000000c0: 00 00 b6 01 00 c8 25 00 00 00 c8 25 00 00 00 ba |......%....%....|
000000d0: e7 00 00 00 01 00 43 e8 00 00 00 c8 31 e8 00 00 |......C.....1...|
000000e0: 00 e9 00 00 00 c8 3a 00 00 00 ba 38 e9 00 00 00 |......:....8....|
000000f0: 00 c8 25 00 00 00 24 02 00 0e 29 cc 03 00 00    |..%...$...)....|
```

### WASM
```
00000000: 05 07 0a 67 72 65 65 74 0e 51 75 69 63 6b 4a 53 |...greet.QuickJS|
00000010: 5a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 |Z__tests__/fixtu|
00000020: 72 65 73 2f 66 75 6e 63 74 69 6f 6e 2d 64 65 66 |res/function-def|
00000030: 61 75 6c 74 2d 70 61 72 61 6d 73 2e 6a 73 0a 77 |ault-params.js.w|
00000040: 6f 72 6c 64 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 |orld.console.log|
00000050: 0a 48 65 6c 6c 6f 0c 00 06 00 a4 01 00 01 00 02 |.Hello..........|
00000060: 00 01 22 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 |.."......@....@.|
00000070: 00 41 e4 00 00 00 00 39 e4 00 00 00 f0 cb 39 e4 |.A.....9......9.|
00000080: 00 00 00 04 e5 00 00 00 f1 cf 28 cc 03 0a 00 00 |..........(.....|
00000090: 4b 00 1b 0a 0d 09 34 0a 00 0c 41 06 00 c8 03 01 |K.....4...A.....|
000000a0: 01 00 04 00 00 24 02 70 00 01 00 70 01 ff ff ff |.....$.p...p....|
000000b0: ff 0f 20 63 00 00 d3 11 f4 ec 08 0e 04 e7 00 00 |.. c............|
000000c0: 00 db cb 39 e8 00 00 00 43 e9 00 00 00 04 ea 00 |...9....C.......|
000000d0: 00 00 d3 24 02 00 29 cc 03 0a 00 00 53 08 1b 0e |...$..).....S...|
000000e0: 34 1c 07 13 00                                  |4....|
```