# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-methods.ts
**生成时间**: 2025-12-12T09:59:18.444Z

## 大小对比

- TypeScript编译器: 201 字节
- WASM编译器: 365 字节
- 差异: -164 字节 (-44.93%)

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
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Calculator",
      "offset": 15
    },
    {
      "index": 3,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "<class_fields_init>",
      "offset": 26
    },
    {
      "index": 4,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-methods.js",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xc",
    "remaining": 119
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
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-methods.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Calculator",
      "offset": 38
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "val",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 60
    }
  ],
  "functionHeader": {
    "offset": 62,
    "tag": "0xd",
    "remaining": 303
  }
}
```

## 字节级差异

共发现 341 个字节差异:

- 偏移量 0x2: TS=0x0c vs WASM=0x46
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
- 偏移量 0xf: TS=0x14 vs WASM=0x78
- 偏移量 0x10: TS=0x43 vs WASM=0x74
- 偏移量 0x11: TS=0x61 vs WASM=0x75
- 偏移量 0x12: TS=0x6c vs WASM=0x72
- 偏移量 0x13: TS=0x63 vs WASM=0x65
- 偏移量 0x14: TS=0x75 vs WASM=0x73
- 偏移量 0x15: TS=0x6c vs WASM=0x2f
- 偏移量 0x16: TS=0x61 vs WASM=0x63
- ... (显示前20个差异，总共341个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0c 3c 65 76 61 6c 3e 0a 5f 72 65 74 5f 14 |...<eval>._ret_.|
00000010: 43 61 6c 63 75 6c 61 74 6f 72 26 3c 63 6c 61 73 |Calculator&<clas|
00000020: 73 5f 66 69 65 6c 64 73 5f 69 6e 69 74 3e 46 5f |s_fields_init>F_|
00000030: 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 |_tests__/fixture|
00000040: 73 2f 63 6c 61 73 73 2d 6d 65 74 68 6f 64 73 2e |s/class-methods.|
00000050: 6a 73 0c 02 06 00 00 00 00 00 00 03 00 03 00 04 |js..............|
00000060: 3e 03 01 00 00 00 00 00 00 02 00 00 00 02 00 30 |>..............0|
00000070: 03 00 00 00 03 02 30 40 e6 00 00 00 00 b6 01 00 |......0@........|
00000080: b6 02 00 06 b6 03 00 d4 00 58 e6 00 00 00 00 d5 |.........X......|
00000090: 01 52 56 6a 00 00 00 00 1b d5 02 52 56 e9 00 00 |.RVj.......RV...|
000000a0: 00 00 1b d5 03 e0 0e e3 b7 03 00 b7 02 00 3b e6 |..............;.|
000000b0: 00 00 00 da 28 04 00 00 00 0a 00 00 00 15 0a 08 |....(...........|
000000c0: 00 0d 08 00 00 01 01 01 01                      |.........|
```

### WASM
```
00000000: 05 05 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..F__tests__/fix|
00000010: 74 75 72 65 73 2f 63 6c 61 73 73 2d 6d 65 74 68 |tures/class-meth|
00000020: 6f 64 73 2e 6a 73 14 43 61 6c 63 75 6c 61 74 6f |ods.js.Calculato|
00000030: 72 0c 63 72 65 61 74 65 06 76 61 6c 02 6e 0d c8 |r.create.val.n..|
00000040: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 02 00 03 |....... ........|
00000050: 01 04 34 02 ca 03 02 00 70 f0 01 03 01 70 ca 03 |..4.....p....p..|
00000060: 00 09 08 ec 02 29 63 00 00 06 63 01 00 c1 00 58 |.....)c...c....X|
00000070: e5 00 00 00 00 c2 01 56 6a 00 00 00 00 1b c2 02 |.......Vj.......|
00000080: 56 e6 00 00 00 00 1b c2 03 52 cc 0e cf 6b 01 00 |V........R...k..|
00000090: 6b 00 00 e3 06 2f c8 03 02 00 00 00 0c 42 07 01 |k..../.......B..|
000000a0: 00 01 01 01 02 01 00 17 02 ce 03 00 01 00 10 00 |................|
000000b0: 01 00 f0 01 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 |........+h......|
000000c0: 1b 24 00 00 0e c7 d3 44 42 00 00 00 29 c8 03 06 |.$.....DB...)...|
000000d0: 02 04 4e 08 07 1a 00 0c 42 07 01 00 01 01 01 03 |..N.....B.......|
000000e0: 00 00 16 02 d0 03 00 01 00 10 00 01 00 08 cb c7 |................|
000000f0: 43 42 00 00 00 d3 9f 44 42 00 00 00 c7 42 42 00 |CB.....DB....BB.|
00000100: 00 00 28 c8 03 0e 05 04 0d 08 07 08 1b 14 07 05 |..(.............|
00000110: 26 00 1b 15 00 0c 42 07 01 00 01 00 01 03 01 00 |&.....B.........|
00000120: 09 01 ce 03 00 01 00 ca 03 00 0d 68 00 00 11 d3 |...........h....|
00000130: 21 01 00 28 c8 03 0a 09 0b 03 10 16 16 07 01 11 |!..(............|
00000140: 29 00 0c 48 05 01 00 00 02 00 02 00 00 0f 02 10 |)..H............|
00000150: 00 01 00 ea 01 00 01 00 0c 04 cc 08 cb ee 01 c7 |................|
00000160: 06 4e 42 00 00 00 29 c8 03 02 00 00 00          |.NB...)......|
```