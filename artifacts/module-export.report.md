# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/module-export.ts
**生成时间**: 2025-12-05T08:47:04.641Z

## 大小对比

- TypeScript编译器: 281 字节
- WASM编译器: 255 字节
- 差异: 26 字节 (10.20%)

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
      "string": "__tests__/compiler/fixtures/module-export.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 222
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
      "string": "__tests__/compiler/fixtures/module-export.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 53
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xd",
    "remaining": 196
  }
}
```

## 字节级差异

共发现 185 个字节差异:

- 偏移量 0x42: TS=0x00 vs WASM=0xca
- 偏移量 0x43: TS=0xca vs WASM=0x03
- 偏移量 0x44: TS=0x03 vs WASM=0x00
- 偏移量 0x45: TS=0xca vs WASM=0x01
- 偏移量 0x46: TS=0x03 vs WASM=0xcc
- 偏移量 0x47: TS=0xcc vs WASM=0x03
- 偏移量 0x48: TS=0x03 vs WASM=0x00
- 偏移量 0x49: TS=0xcc vs WASM=0x02
- 偏移量 0x4a: TS=0x03 vs WASM=0xce
- 偏移量 0x4b: TS=0xce vs WASM=0x03
- 偏移量 0x4c: TS=0x03 vs WASM=0x00
- 偏移量 0x4d: TS=0xce vs WASM=0x03
- 偏移量 0x4e: TS=0x03 vs WASM=0x2c
- 偏移量 0x4f: TS=0xd0 vs WASM=0x00
- 偏移量 0x50: TS=0x03 vs WASM=0x00
- 偏移量 0x51: TS=0x2c vs WASM=0x00
- 偏移量 0x59: TS=0x05 vs WASM=0x02
- 偏移量 0x5c: TS=0x05 vs WASM=0x04
- 偏移量 0x5e: TS=0x24 vs WASM=0x25
- 偏移量 0x5f: TS=0x05 vs WASM=0x02
- ... (显示前20个差异，总共185个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 2e 6a 73 02 |odule-export.js.|
00000030: 61 06 66 6f 6f 02 43 06 62 61 72 0d c8 03 00 04 |a.foo.C.bar.....|
00000040: 00 00 00 ca 03 ca 03 cc 03 cc 03 ce 03 ce 03 d0 |................|
00000050: 03 2c 0c 20 06 01 a4 01 00 05 00 03 05 03 24 05 |.,. ..........$.|
00000060: ca 03 00 00 00 cc 03 00 00 00 ce 03 01 00 00 f0 |................|
00000070: 01 02 00 00 d0 03 00 00 00 ca 03 00 01 cc 03 01 |................|
00000080: 01 ce 03 02 01 f0 01 03 01 d0 03 04 01 08 ec 1f |................|
00000090: b8 e3 c2 00 e4 06 02 01 00 00 00 58 e7 00 00 00 |...........X....|
000000a0: 00 06 5b 03 00 0e 11 e5 51 c2 02 61 04 00 29 06 |..[.....Q..a..).|
000000b0: 2f c8 03 01 06 00 08 01 00 14 01 00 0c 00 04 00 |/...............|
000000c0: cc 03 00 00 00 03 00 00 03 00 b9 28 29 c8 03 01 |...........()...|
000000d0: 03 00 00 01 00 0c 00 04 00 ce 03 00 00 00 03 00 |................|
000000e0: 00 18 00 2b 39 78 00 00 00 11 6c 0a 00 00 00 39 |...+9x....l....9|
000000f0: 08 00 00 00 1b 24 00 00 0e 0e 29 c8 03 01 00 00 |.....$....).....|
00000100: 0c 00 04 00 d0 03 00 00 00 03 00 00 03 00 ba 28 |...............(|
00000110: 29 c8 03 01 03 00 00 03 00                      |)........|
```

### WASM
```
00000000: 05 05 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6d |piler/fixtures/m|
00000020: 6f 64 75 6c 65 2d 65 78 70 6f 72 74 2e 6a 73 02 |odule-export.js.|
00000030: 61 06 66 6f 6f 02 43 06 62 61 72 0d c8 03 00 04 |a.foo.C.bar.....|
00000040: 00 00 ca 03 00 01 cc 03 00 02 ce 03 00 03 2c 00 |..............,.|
00000050: 00 00 0c 20 06 01 a4 01 00 02 00 03 04 03 25 02 |... ..........%.|
00000060: ce 03 02 00 30 f0 01 03 01 70 ca 03 00 0d cc 03 |....0....p......|
00000070: 01 01 ce 03 02 09 d0 03 03 01 08 ec 08 c2 00 e4 |................|
00000080: c2 02 e6 29 b8 e3 63 00 00 06 63 01 00 c1 01 58 |...)..c...c....X|
00000090: e7 00 00 00 00 06 cc 0e cf 6b 01 00 e5 06 2f c8 |.........k..../.|
000000a0: 03 02 00 00 00 0c 43 06 01 cc 03 00 00 00 01 00 |......C.........|
000000b0: 00 02 00 b9 28 c8 03 04 01 07 07 22 00 0c 40 05 |....(......"..@.|
000000c0: 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 01 |................|
000000d0: 01 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
000000e0: 29 c8 03 02 03 00 00 0c 43 06 01 d0 03 00 00 00 |).......C.......|
000000f0: 01 00 00 02 00 ba 28 c8 03 04 04 0f 07 22 00    |......(......".|
```