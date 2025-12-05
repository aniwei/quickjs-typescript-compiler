# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/module-import.ts
**生成时间**: 2025-12-05T08:48:10.329Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 148 字节
- 差异: -3 字节 (-2.03%)

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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "./module-export",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 68
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/module-import.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": "./module-export",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 63
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 65
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 73
    }
  ],
  "functionHeader": {
    "offset": 77,
    "tag": "0xd",
    "remaining": 71
  }
}
```

## 字节级差异

共发现 46 个字节差异:

- 偏移量 0x51: TS=0x00 vs WASM=0xca
- 偏移量 0x52: TS=0x00 vs WASM=0x03
- 偏移量 0x53: TS=0x01 vs WASM=0x02
- 偏移量 0x55: TS=0xca vs WASM=0x00
- 偏移量 0x56: TS=0x03 vs WASM=0x01
- 偏移量 0x57: TS=0xca vs WASM=0x00
- 偏移量 0x58: TS=0x03 vs WASM=0x00
- 偏移量 0x5b: TS=0xcc vs WASM=0x00
- 偏移量 0x5c: TS=0x03 vs WASM=0x00
- 偏移量 0x64: TS=0x01 vs WASM=0x00
- 偏移量 0x69: TS=0x15 vs WASM=0x17
- 偏移量 0x6a: TS=0x01 vs WASM=0x00
- 偏移量 0x6e: TS=0x00 vs WASM=0x0c
- 偏移量 0x6f: TS=0x00 vs WASM=0x08
- 偏移量 0x70: TS=0xcc vs WASM=0xec
- 偏移量 0x71: TS=0x03 vs WASM=0x02
- 偏移量 0x72: TS=0x00 vs WASM=0x29
- 偏移量 0x73: TS=0x01 vs WASM=0x39
- 偏移量 0x74: TS=0x08 vs WASM=0xe7
- 偏移量 0x75: TS=0xec vs WASM=0x00
- ... (显示前20个差异，总共46个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 69 6d 70 6f 72 74 2e 6a 73 1e |odule-import.js.|
00000030: 2e 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 74 02 |./module-export.|
00000040: 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |a.console.log...|
00000050: 01 00 00 01 00 ca 03 ca 03 cc 03 cc 03 0c 20 06 |.............. .|
00000060: 01 a4 01 00 01 00 03 01 00 15 01 cc 03 00 00 00 |................|
00000070: cc 03 00 01 08 ec 10 39 e7 00 00 00 43 e8 00 00 |.......9....C...|
00000080: 00 df 24 01 00 0e 29 06 2f c8 03 01 03 00 0d 01 |..$...)./.......|
00000090: 00                                              |.|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 69 6d 70 6f 72 74 2e 6a 73 1e |odule-import.js.|
00000030: 2e 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 74 02 |./module-export.|
00000040: 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |a.console.log...|
00000050: 01 ca 03 02 00 00 01 00 00 cc 03 00 00 0c 20 06 |.............. .|
00000060: 01 a4 01 00 00 00 03 01 00 17 00 cc 03 00 0c 08 |................|
00000070: ec 02 29 39 e7 00 00 00 43 e8 00 00 00 68 00 00 |..)9....C....h..|
00000080: 24 01 00 0e 06 2f c8 03 0a 00 00 17 00 1b 0e 1b |$..../..........|
00000090: 0a 11 01 00                                     |....|
```