# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-default-params.ts
**生成时间**: 2025-12-07T15:31:53.875Z

## 大小对比

- TypeScript编译器: 231 字节
- WASM编译器: 231 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 108,
      "actualLength": 54,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 57
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "QuickJS",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Hello",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 95,
    "tag": "0xd",
    "remaining": 136
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
      "rawLength": 108,
      "actualLength": 54,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/function-default-params.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "greet",
      "offset": 57
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "QuickJS",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "world",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 77
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 85
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Hello",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 95,
    "tag": "0xd",
    "remaining": 136
  }
}
```

## 字节级差异

共发现 37 个字节差异:

- 偏移量 0x9c: TS=0x43 vs WASM=0x41
- 偏移量 0xa3: TS=0x01 vs WASM=0x00
- 偏移量 0xa7: TS=0x28 vs WASM=0x24
- 偏移量 0xaf: TS=0x00 vs WASM=0xff
- 偏移量 0xb0: TS=0x00 vs WASM=0xff
- 偏移量 0xb1: TS=0x63 vs WASM=0xff
- 偏移量 0xb2: TS=0x00 vs WASM=0xff
- 偏移量 0xb3: TS=0x00 vs WASM=0x0f
- 偏移量 0xb4: TS=0xd3 vs WASM=0x20
- 偏移量 0xb5: TS=0x11 vs WASM=0x63
- 偏移量 0xb6: TS=0xf4 vs WASM=0x00
- 偏移量 0xb7: TS=0xec vs WASM=0x00
- 偏移量 0xb8: TS=0x07 vs WASM=0xd3
- 偏移量 0xb9: TS=0x0e vs WASM=0x11
- 偏移量 0xba: TS=0x04 vs WASM=0xf4
- 偏移量 0xbb: TS=0xe7 vs WASM=0xec
- 偏移量 0xbc: TS=0x00 vs WASM=0x08
- 偏移量 0xbd: TS=0x00 vs WASM=0x0e
- 偏移量 0xbe: TS=0x00 vs WASM=0x04
- 偏移量 0xbf: TS=0xdb vs WASM=0xe7
- ... (显示前20个差异，总共37个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 07 6c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..l__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 64 65 66 61 75 6c 74 2d |unction-default-|
00000030: 70 61 72 61 6d 73 2e 6a 73 0a 67 72 65 65 74 0e |params.js.greet.|
00000040: 51 75 69 63 6b 4a 53 0a 77 6f 72 6c 64 0e 63 6f |QuickJS.world.co|
00000050: 6e 73 6f 6c 65 06 6c 6f 67 0a 48 65 6c 6c 6f 0d |nsole.log.Hello.|
00000060: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000070: 02 01 01 14 00 ca 03 00 01 08 ec 05 c2 00 e3 29 |...............)|
00000080: df f0 0e df 04 e6 00 00 00 f1 0e 06 2f c8 03 0a |............/...|
00000090: 00 00 28 00 07 0a 0d 09 20 0a 00 0c 43 06 01 ca |..(..... ...C...|
000000a0: 03 01 01 01 04 00 00 28 02 70 00 01 00 70 01 00 |.......(.p...p..|
000000b0: 00 63 00 00 d3 11 f4 ec 07 0e 04 e7 00 00 00 db |.c..............|
000000c0: cb 39 e8 00 00 00 43 e9 00 00 00 04 ea 00 00 00 |.9....C.........|
000000d0: 39 38 00 00 00 24 02 00 0e c8 03 0a 00 00 53 08 |98...$........S.|
000000e0: 1b 0e 34 1c 1b 13 00                            |..4....|
```

### WASM
```
00000000: 05 07 6c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..l__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 66 |piler/fixtures/f|
00000020: 75 6e 63 74 69 6f 6e 2d 64 65 66 61 75 6c 74 2d |unction-default-|
00000030: 70 61 72 61 6d 73 2e 6a 73 0a 67 72 65 65 74 0e |params.js.greet.|
00000040: 51 75 69 63 6b 4a 53 0a 77 6f 72 6c 64 0e 63 6f |QuickJS.world.co|
00000050: 6e 73 6f 6c 65 06 6c 6f 67 0a 48 65 6c 6c 6f 0d |nsole.log.Hello.|
00000060: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000070: 02 01 01 14 00 ca 03 00 01 08 ec 05 c2 00 e3 29 |...............)|
00000080: df f0 0e df 04 e6 00 00 00 f1 0e 06 2f c8 03 0a |............/...|
00000090: 00 00 28 00 07 0a 0d 09 20 0a 00 0c 41 06 01 ca |..(..... ...A...|
000000a0: 03 01 01 00 04 00 00 24 02 70 00 01 00 70 01 ff |.......$.p...p..|
000000b0: ff ff ff 0f 20 63 00 00 d3 11 f4 ec 08 0e 04 e7 |.... c..........|
000000c0: 00 00 00 db cb 39 e8 00 00 00 43 e9 00 00 00 04 |.....9....C.....|
000000d0: ea 00 00 00 d3 24 02 00 29 c8 03 0a 00 00 53 08 |.....$..).....S.|
000000e0: 1b 0e 34 1c 07 13 00                            |..4....|
```