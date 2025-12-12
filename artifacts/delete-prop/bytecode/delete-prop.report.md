# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/delete-prop.ts
**生成时间**: 2025-12-12T09:59:18.506Z

## 大小对比

- TypeScript编译器: 171 字节
- WASM编译器: 126 字节
- 差异: 45 字节 (35.71%)

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
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/delete-prop.js",
      "offset": 15
    }
  ],
  "functionHeader": {
    "offset": 49,
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
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "__tests__/fixtures/delete-prop.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 36
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 40
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 44
    }
  ],
  "functionHeader": {
    "offset": 46,
    "tag": "0xd",
    "remaining": 80
  }
}
```

## 字节级差异

共发现 154 个字节差异:

- 偏移量 0x1: TS=0x03 vs WASM=0x04
- 偏移量 0x2: TS=0x0c vs WASM=0x42
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
- 偏移量 0xf: TS=0x42 vs WASM=0x78
- 偏移量 0x10: TS=0x5f vs WASM=0x74
- 偏移量 0x11: TS=0x5f vs WASM=0x75
- 偏移量 0x12: TS=0x74 vs WASM=0x72
- 偏移量 0x15: TS=0x74 vs WASM=0x2f
- 偏移量 0x16: TS=0x73 vs WASM=0x64
- 偏移量 0x17: TS=0x5f vs WASM=0x65
- ... (显示前20个差异，总共154个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 42 |...<eval>._ret_B|
00000010: 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 |__tests__/fixtur|
00000020: 65 73 2f 64 65 6c 65 74 65 2d 70 72 6f 70 2e 6a |es/delete-prop.j|
00000030: 73 0c 02 06 00 00 00 00 00 00 01 00 02 00 00 3b |s..............;|
00000040: 01 01 00 00 00 00 00 00 40 e6 00 00 00 01 40 e8 |........@.....@.|
00000050: 00 00 00 01 b6 01 00 0b cb 4e e7 00 00 00 3b e6 |.........N....;.|
00000060: 00 00 00 39 e6 00 00 00 04 e7 00 00 00 9a de cb |...9............|
00000070: cc 26 02 00 3b e8 00 00 00 39 e8 00 00 00 ca 9a |.&..;....9......|
00000080: de da 28 02 00 00 00 22 00 00 11 18 07 0a 07 05 |..(...."........|
00000090: 1b 0f 26 0b 02 0e 3e 0d 17 00 02 1a 07 06 07 07 |..&...>.........|
000000a0: 11 0b 26 0b 02 0e 25 08 07 15 00                |..&...%....|
```

### WASM
```
00000000: 05 04 42 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..B__tests__/fix|
00000010: 74 75 72 65 73 2f 64 65 6c 65 74 65 2d 70 72 6f |tures/delete-pro|
00000020: 70 2e 6a 73 06 6f 62 6a 06 61 72 72 02 61 0d c8 |p.js.obj.arr.a..|
00000030: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 02 |....... ........|
00000040: 02 00 24 00 ca 03 00 0d cc 03 01 0d 08 ec 02 29 |..$............)|
00000050: 0b b8 4e e7 00 00 00 e3 68 00 00 04 e7 00 00 00 |..N.....h.......|
00000060: 9a 0e b8 b9 26 02 00 e4 68 01 00 b7 9a 0e 06 2f |....&...h....../|
00000070: c8 03 0a 00 00 3f 0e 11 06 45 05 16 06 00       |.....?...E....|
```