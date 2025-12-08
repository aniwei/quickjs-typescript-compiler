# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/function-default-params.ts
**生成时间**: 2025-12-08T14:42:14.918Z

## 大小对比

- TypeScript编译器: 221 字节
- WASM编译器: 231 字节
- 差异: -10 字节 (-4.33%)

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
    "remaining": 126
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

共发现 11 个字节差异:

- 偏移量 0xdb: TS=0x00 vs WASM=0x0a
- 偏移量 0xdd: TS=EOF vs WASM=0x00
- 偏移量 0xde: TS=EOF vs WASM=0x53
- 偏移量 0xdf: TS=EOF vs WASM=0x08
- 偏移量 0xe0: TS=EOF vs WASM=0x1b
- 偏移量 0xe1: TS=EOF vs WASM=0x0e
- 偏移量 0xe2: TS=EOF vs WASM=0x34
- 偏移量 0xe3: TS=EOF vs WASM=0x1c
- 偏移量 0xe4: TS=EOF vs WASM=0x07
- 偏移量 0xe5: TS=EOF vs WASM=0x13
- 偏移量 0xe6: TS=EOF vs WASM=0x00

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
00000090: 00 00 28 00 07 0a 0d 09 20 0a 00 0c 41 06 01 ca |..(..... ...A...|
000000a0: 03 01 01 00 04 00 00 24 02 70 00 01 00 70 01 ff |.......$.p...p..|
000000b0: ff ff ff 0f 20 63 00 00 d3 11 f4 ec 08 0e 04 e7 |.... c..........|
000000c0: 00 00 00 db cb 39 e8 00 00 00 43 e9 00 00 00 04 |.....9....C.....|
000000d0: ea 00 00 00 d3 24 02 00 29 c8 03 00 00          |.....$..)....|
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