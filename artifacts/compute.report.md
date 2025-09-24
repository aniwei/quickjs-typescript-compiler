# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/compute.ts
**生成时间**: 2025-09-24T19:34:03.572Z

## 大小对比

- TypeScript编译器: 145 字节
- WASM编译器: 155 字节
- 差异: -10 字节 (-6.45%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 83
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

共发现 60 个字节差异:

- 偏移量 0x29: TS=0x0e vs WASM=0x08
- 偏移量 0x2a: TS=0x63 vs WASM=0x69
- 偏移量 0x2b: TS=0x6f vs WASM=0x74
- 偏移量 0x2c: TS=0x6e vs WASM=0x65
- 偏移量 0x2d: TS=0x73 vs WASM=0x6d
- 偏移量 0x2e: TS=0x6f vs WASM=0x06
- 偏移量 0x2f: TS=0x6c vs WASM=0x61
- 偏移量 0x30: TS=0x65 vs WASM=0x72
- 偏移量 0x31: TS=0x06 vs WASM=0x72
- 偏移量 0x32: TS=0x6c vs WASM=0x0e
- 偏移量 0x33: TS=0x6f vs WASM=0x63
- 偏移量 0x34: TS=0x67 vs WASM=0x6f
- 偏移量 0x35: TS=0x08 vs WASM=0x6e
- 偏移量 0x36: TS=0x69 vs WASM=0x73
- 偏移量 0x37: TS=0x74 vs WASM=0x6f
- 偏移量 0x38: TS=0x65 vs WASM=0x6c
- 偏移量 0x39: TS=0x6d vs WASM=0x65
- 偏移量 0x3b: TS=0x61 vs WASM=0x6c
- 偏移量 0x3c: TS=0x72 vs WASM=0x6f
- 偏移量 0x3d: TS=0x72 vs WASM=0x67
- ... (显示前20个差异，总共60个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 0e 63 6f 6e 73 6f 6c |ompute.js.consol|
00000030: 65 06 6c 6f 67 08 69 74 65 6d 06 61 72 72 0d c8 |e.log.item.arr..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 01 00 08 |....... ........|
00000050: 01 00 2e 01 ce 03 02 00 30 d0 03 00 0d 08 ec 02 |........0.......|
00000060: 29 b8 b9 ba 26 03 00 00 00 e3 63 01 00 68 00 00 |)...&.....c..h..|
00000070: 7f ee 12 cc 39 ca 03 43 cc 03 64 01 00 24 01 00 |....9..C..d..$..|
00000080: 00 00 0e 82 00 ec ea 0e 86 06 2f c8 03 02 00 00 |........../.....|
00000090: 00                                              |.|
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