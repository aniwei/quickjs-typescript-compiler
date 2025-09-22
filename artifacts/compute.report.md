# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/compute.ts
**生成时间**: 2025-09-22T13:05:21.638Z

## 大小对比

- TypeScript编译器: 176 字节
- WASM编译器: 155 字节
- 差异: 21 字节 (13.55%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 41
    },
    {
      "index": 2,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "item",
      "offset": 57
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 114
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

共发现 118 个字节差异:

- 偏移量 0x29: TS=0x06 vs WASM=0x08
- 偏移量 0x2a: TS=0x61 vs WASM=0x69
- 偏移量 0x2b: TS=0x72 vs WASM=0x74
- 偏移量 0x2c: TS=0x72 vs WASM=0x65
- 偏移量 0x2d: TS=0x0e vs WASM=0x6d
- 偏移量 0x2e: TS=0x63 vs WASM=0x06
- 偏移量 0x2f: TS=0x6f vs WASM=0x61
- 偏移量 0x30: TS=0x6e vs WASM=0x72
- 偏移量 0x31: TS=0x73 vs WASM=0x72
- 偏移量 0x32: TS=0x6f vs WASM=0x0e
- 偏移量 0x33: TS=0x6c vs WASM=0x63
- 偏移量 0x34: TS=0x65 vs WASM=0x6f
- 偏移量 0x35: TS=0x06 vs WASM=0x6e
- 偏移量 0x36: TS=0x6c vs WASM=0x73
- 偏移量 0x38: TS=0x67 vs WASM=0x6c
- 偏移量 0x39: TS=0x08 vs WASM=0x65
- 偏移量 0x3a: TS=0x69 vs WASM=0x06
- 偏移量 0x3b: TS=0x74 vs WASM=0x6c
- 偏移量 0x3c: TS=0x65 vs WASM=0x6f
- 偏移量 0x3d: TS=0x6d vs WASM=0x67
- ... (显示前20个差异，总共118个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 4c 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..L__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6f 6d 70 75 74 65 2e 6a 73 06 61 72 72 0e 63 6f |ompute.js.arr.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 08 69 74 65 6d 0d e0 |nsole.log.item..|
00000040: 01 00 00 00 00 00 0c 02 00 00 01 00 01 00 07 01 |................|
00000050: 00 54 01 e8 01 00 00 30 e2 01 00 0d 0b 11 01 00 |.T.....0........|
00000060: 00 00 00 01 01 00 00 00 38 11 01 01 00 00 00 01 |........8.......|
00000070: 02 00 00 00 38 11 01 02 00 00 00 01 03 00 00 00 |....8...........|
00000080: 38 2c 71 00 00 00 2a 71 00 00 00 5a 5c 00 12 3d |8,q...*q...Z\..=|
00000090: 00 00 00 00 2f 01 00 2a 72 00 00 00 35 73 00 00 |..../..*r...5s..|
000000a0: 00 2e 01 00 24 01 00 0e 3e 30 00 00 00 0e 0e 29 |....$...>0.....)|
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