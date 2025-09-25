# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/compute.ts
**生成时间**: 2025-09-25T12:59:56.188Z

## 大小对比

- TypeScript编译器: 153 字节
- WASM编译器: 155 字节
- 差异: -2 字节 (-1.29%)

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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/compute.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 91
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
      "rawLength": 76,
      "actualLength": 38,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/compute.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 50
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 93
  }
}
```

## 字节级差异

共发现 37 个字节差异:

- 偏移量 0x52: TS=0x2a vs WASM=0x2e
- 偏移量 0x73: TS=0xce vs WASM=0xe7
- 偏移量 0x74: TS=0x03 vs WASM=0x00
- 偏移量 0x75: TS=0x43 vs WASM=0x00
- 偏移量 0x76: TS=0xd0 vs WASM=0x00
- 偏移量 0x77: TS=0x03 vs WASM=0x43
- 偏移量 0x78: TS=0x64 vs WASM=0xe8
- 偏移量 0x7b: TS=0x24 vs WASM=0x00
- 偏移量 0x7c: TS=0x01 vs WASM=0x64
- 偏移量 0x7e: TS=0x0e vs WASM=0x00
- 偏移量 0x7f: TS=0x82 vs WASM=0x24
- 偏移量 0x80: TS=0x00 vs WASM=0x01
- 偏移量 0x81: TS=0xec vs WASM=0x00
- 偏移量 0x82: TS=0xeb vs WASM=0x0e
- 偏移量 0x83: TS=0x0e vs WASM=0x82
- 偏移量 0x84: TS=0x86 vs WASM=0x00
- 偏移量 0x85: TS=0x06 vs WASM=0xec
- 偏移量 0x86: TS=0x2f vs WASM=0xeb
- 偏移量 0x87: TS=0xc8 vs WASM=0x0e
- 偏移量 0x88: TS=0x03 vs WASM=0x86
- ... (显示前20个差异，总共37个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 08 69 74 65 6d 06 61 |ompute.js.item.a|
00000030: 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |rr.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 06 |....... ........|
00000050: 01 00 2a 01 ca 03 02 00 30 cc 03 00 0d 08 ec 02 |..*.....0.......|
00000060: 29 b8 b9 ba 26 03 00 e3 63 00 00 68 00 00 7f ee |)...&...c..h....|
00000070: 13 cb 39 ce 03 43 d0 03 64 00 00 24 01 00 0e 82 |..9..C..d..$....|
00000080: 00 ec eb 0e 86 06 2f c8 03 0e 00 00 35 13 11 6d |....../.....5..m|
00000090: 17 02 1b 08 1b 04 11 74 00                      |.......t.|
```

### WASM
```
00000000: 05 05 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 08 69 74 65 6d 06 61 |ompute.js.item.a|
00000030: 72 72 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 |rr.console.log..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 06 |....... ........|
00000050: 01 00 2e 01 ca 03 02 00 30 cc 03 00 0d 08 ec 02 |........0.......|
00000060: 29 b8 b9 ba 26 03 00 e3 63 00 00 68 00 00 7f ee |)...&...c..h....|
00000070: 13 cb 39 e7 00 00 00 43 e8 00 00 00 64 00 00 24 |..9....C....d..$|
00000080: 01 00 0e 82 00 ec eb 0e 86 06 2f c8 03 0c 00 00 |........../.....|
00000090: 49 26 26 21 1b 0e 1b 0a 11 01 00                |I&&!.......|
```