# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/array-nested.ts
**生成时间**: 2025-12-12T09:59:18.348Z

## 大小对比

- TypeScript编译器: 216 字节
- WASM编译器: 185 字节
- 差异: 31 字节 (16.76%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "<eval>",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "_ret_",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-nested.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 50,
    "tag": "0xc",
    "remaining": 166
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/array-nested.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 37
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 41
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 43
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 130
  }
}
```

## 字节级差异

共发现 189 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x05
- 偏移量 0x2: TS=0x0c vs WASM=0x44
- 偏移量 0x3: TS=0x3c vs WASM=0x5f
- 偏移量 0x4: TS=0x65 vs WASM=0x5f
- 偏移量 0x5: TS=0x76 vs WASM=0x74
- 偏移量 0x6: TS=0x61 vs WASM=0x65
- 偏移量 0x7: TS=0x6c vs WASM=0x73
- 偏移量 0x8: TS=0x3e vs WASM=0x74
- 偏移量 0x9: TS=0x0a vs WASM=0x73
- 偏移量 0xb: TS=0x72 vs WASM=0x5f
- 偏移量 0xc: TS=0x65 vs WASM=0x2f
- 偏移量 0xd: TS=0x74 vs WASM=0x66
- 偏移量 0xe: TS=0x5f vs WASM=0x69
- 偏移量 0xf: TS=0x44 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x61
- 偏移量 0x17: TS=0x5f vs WASM=0x72
- ... (显示前20个差异，总共189个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 44 |...<eval>._ret_D|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 61 72 72 61 79 2d 6e 65 73 74 65 64 2e |es/array-nested.|
00000030: 6a 73 0c 02 06 00 00 00 00 00 00 01 00 04 00 00 |js..............|
00000040: 55 01 01 00 00 00 00 00 00 40 e6 00 00 00 01 b6 |U........@......|
00000050: 01 00 cb cc 26 02 00 cd ce 26 02 00 0b cf 4e e7 |....&....&....N.|
00000060: 00 00 00 26 03 00 3b e6 00 00 00 39 e8 00 00 00 |...&..;....9....|
00000070: 43 e9 00 00 00 39 e6 00 00 00 ca 48 cb 48 24 01 |C....9.....H.H$.|
00000080: 00 de 39 e8 00 00 00 43 e9 00 00 00 39 e6 00 00 |..9....C....9...|
00000090: 00 cc 48 42 e7 00 00 00 24 01 00 de da 28 02 00 |..HB....$....(..|
000000a0: 00 00 34 00 00 12 0a 07 06 07 07 12 02 07 06 07 |..4.............|
000000b0: 07 12 00 07 0a 07 05 00 05 05 0c 11 0b 00 07 0a |................|
000000c0: 0b 3e 18 25 08 07 07 07 0e 07 0d 07 17 3a 00 3e |.>.%.........:.>|
000000d0: 18 25 08 07 07 20 17 00                         |.%... ..|
```

### WASM
```
00000000: 05 05 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..D__tests__/fix|
00000010: 74 75 72 65 73 2f 61 72 72 61 79 2d 6e 65 73 74 |tures/array-nest|
00000020: 65 64 2e 6a 73 06 61 72 72 02 61 0e 63 6f 6e 73 |ed.js.arr.a.cons|
00000030: 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c |ole.log.........|
00000040: 20 06 01 a4 01 00 00 00 04 01 00 48 00 ca 03 00 | ..........H....|
00000050: 0d 08 ec 02 29 b8 b9 26 02 00 ba bb 26 02 00 0b |....)..&....&...|
00000060: bc 4e e6 00 00 00 26 03 00 e3 39 e7 00 00 00 43 |.N....&...9....C|
00000070: e8 00 00 00 68 00 00 b7 48 b8 48 24 01 00 0e 39 |....h...H.H$...9|
00000080: e7 00 00 00 43 e8 00 00 00 68 00 00 b9 48 42 e6 |....C....h...HB.|
00000090: 00 00 00 24 01 00 0e 06 2f c8 03 1c 00 00 00 19 |...$..../.......|
000000a0: 0a 00 1b 0e 1b 0a 16 06 0c 06 07 0d 17 15 1b 0e |................|
000000b0: 1b 0a 16 06 07 06 1b 0d 00                      |.........|
```