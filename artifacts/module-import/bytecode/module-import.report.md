# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/module-import.ts
**生成时间**: 2025-12-06T02:09:56.441Z

## 大小对比

- TypeScript编译器: 140 字节
- WASM编译器: 148 字节
- 差异: -8 字节 (-5.41%)

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
    "remaining": 63
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

共发现 53 个字节差异:

- 偏移量 0x51: TS=0x00 vs WASM=0xca
- 偏移量 0x52: TS=0x00 vs WASM=0x03
- 偏移量 0x53: TS=0x01 vs WASM=0x02
- 偏移量 0x55: TS=0xca vs WASM=0x00
- 偏移量 0x56: TS=0x03 vs WASM=0x01
- 偏移量 0x5c: TS=0x0c vs WASM=0x00
- 偏移量 0x5d: TS=0x20 vs WASM=0x0c
- 偏移量 0x5e: TS=0x06 vs WASM=0x20
- 偏移量 0x5f: TS=0x01 vs WASM=0x06
- 偏移量 0x60: TS=0xa4 vs WASM=0x01
- 偏移量 0x61: TS=0x01 vs WASM=0xa4
- 偏移量 0x62: TS=0x00 vs WASM=0x01
- 偏移量 0x65: TS=0x03 vs WASM=0x00
- 偏移量 0x66: TS=0x01 vs WASM=0x03
- 偏移量 0x67: TS=0x00 vs WASM=0x01
- 偏移量 0x68: TS=0x17 vs WASM=0x00
- 偏移量 0x69: TS=0x00 vs WASM=0x17
- 偏移量 0x6a: TS=0xcc vs WASM=0x00
- 偏移量 0x6b: TS=0x03 vs WASM=0xcc
- 偏移量 0x6c: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共53个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 69 6d 70 6f 72 74 2e 6a 73 1e |odule-import.js.|
00000030: 2e 2f 6d 6f 64 75 6c 65 2d 65 78 70 6f 72 74 02 |./module-export.|
00000040: 61 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 |a.console.log...|
00000050: 01 00 00 01 00 ca 03 00 00 cc 03 00 0c 20 06 01 |............. ..|
00000060: a4 01 00 00 00 03 01 00 17 00 cc 03 00 0d 08 ec |................|
00000070: 02 29 39 e7 00 00 00 43 e8 00 00 00 68 00 00 24 |.)9....C....h..$|
00000080: 01 00 0e 06 2f c8 03 00 02 17 00 00             |..../.......|
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