# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/function-default-params.ts
**生成时间**: 2025-12-20T21:36:57.061Z

## 大小对比

- TypeScript编译器: 208 字节
- WASM编译器: 229 字节
- 差异: -21 字节 (-9.17%)

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
    "remaining": 122
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

共发现 55 个字节差异:

- 偏移量 0xa0: TS=0x00 vs WASM=0x01
- 偏移量 0xa2: TS=0x05 vs WASM=0x04
- 偏移量 0xa5: TS=0x21 vs WASM=0x24
- 偏移量 0xa6: TS=0x01 vs WASM=0x02
- 偏移量 0xa9: TS=0x00 vs WASM=0x01
- 偏移量 0xab: TS=0xd3 vs WASM=0x70
- 偏移量 0xac: TS=0x11 vs WASM=0x01
- 偏移量 0xad: TS=0x06 vs WASM=0xff
- 偏移量 0xae: TS=0xad vs WASM=0xff
- 偏移量 0xaf: TS=0xec vs WASM=0xff
- 偏移量 0xb0: TS=0x08 vs WASM=0xff
- 偏移量 0xb1: TS=0x0e vs WASM=0x0f
- 偏移量 0xb2: TS=0x04 vs WASM=0x20
- 偏移量 0xb3: TS=0xe7 vs WASM=0x63
- 偏移量 0xb6: TS=0x00 vs WASM=0xd3
- 偏移量 0xb7: TS=0xdb vs WASM=0x11
- 偏移量 0xb8: TS=0x39 vs WASM=0xf4
- 偏移量 0xb9: TS=0xe8 vs WASM=0xec
- 偏移量 0xba: TS=0x00 vs WASM=0x08
- 偏移量 0xbb: TS=0x00 vs WASM=0x0e
- ... (显示前20个差异，总共55个)

## 十六进制转储对比

### TypeScript
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
000000a0: 00 00 05 00 00 21 01 70 00 00 00 d3 11 06 ad ec |.....!.p........|
000000b0: 08 0e 04 e7 00 00 00 db 39 e8 00 00 00 43 e9 00 |........9....C..|
000000c0: 00 00 04 ea 00 00 00 d3 24 02 00 29 cc 03 00 00 |........$..)....|
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