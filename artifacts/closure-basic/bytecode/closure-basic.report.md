# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-basic.ts
**生成时间**: 2025-12-16T14:11:02.448Z

## 大小对比

- TypeScript编译器: 244 字节
- WASM编译器: 186 字节
- 差异: 58 字节 (31.18%)

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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-basic.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 46
    },
    {
      "index": 4,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 53,
    "tag": "0xc",
    "remaining": 191
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-basic.js",
      "offset": 8
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 44
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 46
    }
  ],
  "functionHeader": {
    "offset": 52,
    "tag": "0xc",
    "remaining": 134
  }
}
```

## 字节级差异

共发现 166 个字节差异:

- 偏移量 0x1: TS=0x05 vs WASM=0x04
- 偏移量 0x34: TS=0x00 vs WASM=0x0c
- 偏移量 0x35: TS=0x0c vs WASM=0x00
- 偏移量 0x36: TS=0x00 vs WASM=0x06
- 偏移量 0x37: TS=0x06 vs WASM=0x00
- 偏移量 0x38: TS=0x00 vs WASM=0xa4
- 偏移量 0x39: TS=0xa4 vs WASM=0x01
- 偏移量 0x3a: TS=0x01 vs WASM=0x00
- 偏移量 0x3b: TS=0x00 vs WASM=0x01
- 偏移量 0x3c: TS=0x01 vs WASM=0x00
- 偏移量 0x3d: TS=0x00 vs WASM=0x01
- 偏移量 0x3e: TS=0x01 vs WASM=0x00
- 偏移量 0x3f: TS=0x00 vs WASM=0x01
- 偏移量 0x40: TS=0x01 vs WASM=0x16
- 偏移量 0x41: TS=0x1e vs WASM=0x01
- 偏移量 0x42: TS=0x01 vs WASM=0xa6
- 偏移量 0x43: TS=0xa6 vs WASM=0x01
- 偏移量 0x44: TS=0x01 vs WASM=0x00
- 偏移量 0x47: TS=0x00 vs WASM=0x40
- 偏移量 0x48: TS=0xc2 vs WASM=0xe4
- ... (显示前20个差异，总共166个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 0a 6f 75 74 65 72 46 5f 5f 74 65 73 74 73 |...outerF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 62 61 73 69 63 2e 6a 73 02 78 0a 69 |ure-basic.js.x.i|
00000030: 6e 6e 65 72 00 0c 00 06 00 a4 01 00 01 00 01 00 |nner............|
00000040: 01 1e 01 a6 01 00 00 00 c2 00 41 e4 00 00 00 00 |..........A.....|
00000050: c2 00 3b e4 00 00 00 c2 00 3b e4 00 00 00 39 e4 |..;......;....9.|
00000060: 00 00 00 f0 cf 28 ca 03 06 00 00 00 16 0e 00 00 |.....(..........|
00000070: 0c 43 06 00 c8 03 00 02 00 00 00 01 40 02 cc 03 |.C..........@...|
00000080: 01 00 20 ce 03 00 00 00 b6 01 00 c8 1f 00 00 00 |.. .............|
00000090: 01 0a 00 00 00 c8 1b 00 00 00 bf e6 00 00 00 01 |................|
000000a0: 00 c8 27 00 00 00 03 00 00 00 00 bf e7 00 00 00 |..'.............|
000000b0: 01 00 c8 5d 00 00 00 ba e7 00 00 00 01 00 22 00 |...]..........".|
000000c0: 00 c8 56 e8 00 00 00 29 ca 03 00 00 0c 43 06 00 |..V....).....C..|
000000d0: ce 03 00 00 00 00 00 00 16 00 b6 01 00 c8 49 00 |..............I.|
000000e0: 00 00 ba e6 00 00 00 01 00 c8 42 00 00 00 28 29 |..........B...()|
000000f0: ca 03 00 00                                     |....|
```

### WASM
```
00000000: 05 04 0a 6f 75 74 65 72 46 5f 5f 74 65 73 74 73 |...outerF__tests|
00000010: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f 73 |__/fixtures/clos|
00000020: 75 72 65 2d 62 61 73 69 63 2e 6a 73 02 78 0a 69 |ure-basic.js.x.i|
00000030: 6e 6e 65 72 0c 00 06 00 a4 01 00 01 00 01 00 01 |nner............|
00000040: 16 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000050: e4 00 00 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 |.....9......(...|
00000060: 00 00 00 0e 0e 00 1b 0a 00 0c 43 06 00 c8 03 00 |..........C.....|
00000070: 02 00 01 00 01 0d 02 cc 03 01 00 60 ce 03 00 00 |...........`....|
00000080: 00 c2 00 cc 63 00 00 bf 0a cb c8 23 00 00 ca 03 |....c......#....|
00000090: 08 00 00 00 09 0a 16 07 0d 00 0c 43 06 00 ce 03 |...........C....|
000000a0: 00 00 00 01 01 00 04 00 cc 03 00 09 68 00 00 28 |............h..(|
000000b0: ca 03 06 02 04 03 16 11 0d 00                   |..........|
```