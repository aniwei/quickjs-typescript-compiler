# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_generated/complex-076.ts
**生成时间**: 2025-12-25T01:17:44.113Z

## 大小对比

- TypeScript编译器: 234 字节
- WASM编译器: 230 字节
- 差异: 4 字节 (1.74%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "outer76",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-076.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xc",
    "remaining": 162
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "outer76",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 3,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures_generated/complex-076.js",
      "offset": 22
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xc",
    "remaining": 158
  }
}
```

## 字节级差异

共发现 27 个字节差异:

- 偏移量 0xc4: TS=0x0f vs WASM=0x0b
- 偏移量 0xcf: TS=0x42 vs WASM=0xeb
- 偏移量 0xd0: TS=0x30 vs WASM=0xbf
- 偏移量 0xd1: TS=0x00 vs WASM=0x4c
- 偏移量 0xd2: TS=0x00 vs WASM=0xba
- 偏移量 0xd3: TS=0x00 vs WASM=0x9e
- 偏移量 0xd4: TS=0xbf vs WASM=0x9f
- 偏移量 0xd5: TS=0x4c vs WASM=0x28
- 偏移量 0xd6: TS=0xba vs WASM=0xce
- 偏移量 0xd7: TS=0x9e vs WASM=0x03
- 偏移量 0xd8: TS=0x9f vs WASM=0x0c
- 偏移量 0xd9: TS=0x28 vs WASM=0x02
- 偏移量 0xda: TS=0xce vs WASM=0x04
- 偏移量 0xdb: TS=0x03 vs WASM=0x12
- 偏移量 0xdc: TS=0x0c vs WASM=0x16
- 偏移量 0xdd: TS=0x02 vs WASM=0x07
- 偏移量 0xde: TS=0x04 vs WASM=0x12
- 偏移量 0xdf: TS=0x12 vs WASM=0x16
- 偏移量 0xe0: TS=0x16 vs WASM=0x1c
- 偏移量 0xe2: TS=0x12 vs WASM=0x0b
- ... (显示前20个差异，总共27个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0e 6f 75 74 65 72 37 36 0e 63 6f 6e 73 6f |...outer76.conso|
00000010: 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f |le.logV__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 |/fixtures_genera|
00000030: 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 37 36 2e |ted/complex-076.|
00000040: 6a 73 0a 69 6e 6e 65 72 0c 00 06 00 a4 01 00 01 |js.inner........|
00000050: 00 03 00 01 23 01 a6 01 00 00 00 40 e4 00 00 00 |....#......@....|
00000060: 40 c2 00 41 e4 00 00 00 00 39 e5 00 00 00 43 e6 |@..A.....9....C.|
00000070: 00 00 00 39 e4 00 00 00 f0 24 01 00 cf 28 ce 03 |...9.....$...(..|
00000080: 0e 00 00 00 0e 0e 00 1b 0e 1b 0a 1b 0e 07 0f 00 |................|
00000090: 0c 43 06 00 c8 03 00 01 00 04 00 01 09 01 d0 03 |.C..............|
000000a0: 00 00 00 c2 00 cf b8 b9 ba 23 03 00 ce 03 08 01 |.........#......|
000000b0: 00 00 02 08 16 16 0d 00 0c 43 06 00 d0 03 00 01 |.........C......|
000000c0: 00 03 00 00 0f 01 9e 01 00 01 00 0c 01 cb c7 42 |...............B|
000000d0: 30 00 00 00 bf 4c ba 9e 9f 28 ce 03 0c 02 04 12 |0....L...(......|
000000e0: 16 07 12 2a 1c 07 0b 07 2f 00                   |...*..../.|
```

### WASM
```
00000000: 05 05 0e 6f 75 74 65 72 37 36 0e 63 6f 6e 73 6f |...outer76.conso|
00000010: 6c 65 06 6c 6f 67 56 5f 5f 74 65 73 74 73 5f 5f |le.logV__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 5f 67 65 6e 65 72 61 |/fixtures_genera|
00000030: 74 65 64 2f 63 6f 6d 70 6c 65 78 2d 30 37 36 2e |ted/complex-076.|
00000040: 6a 73 0a 69 6e 6e 65 72 0c 00 06 00 a4 01 00 01 |js.inner........|
00000050: 00 03 00 01 23 01 a6 01 00 00 00 40 e4 00 00 00 |....#......@....|
00000060: 40 c2 00 41 e4 00 00 00 00 39 e5 00 00 00 43 e6 |@..A.....9....C.|
00000070: 00 00 00 39 e4 00 00 00 f0 24 01 00 cf 28 ce 03 |...9.....$...(..|
00000080: 0e 00 00 00 0e 0e 00 1b 0e 1b 0a 1b 0e 07 0f 00 |................|
00000090: 0c 43 06 00 c8 03 00 01 00 04 00 01 09 01 d0 03 |.C..............|
000000a0: 00 00 00 c2 00 cf b8 b9 ba 23 03 00 ce 03 08 01 |.........#......|
000000b0: 00 00 02 08 16 16 0d 00 0c 43 06 00 d0 03 00 01 |.........C......|
000000c0: 00 03 00 00 0b 01 9e 01 00 01 00 0c 01 cb c7 eb |................|
000000d0: bf 4c ba 9e 9f 28 ce 03 0c 02 04 12 16 07 12 16 |.L...(..........|
000000e0: 1c 07 0b 07 2f 00                               |..../.|
```