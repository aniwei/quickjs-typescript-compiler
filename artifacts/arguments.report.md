# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/arguments.ts
**生成时间**: 2025-12-05T06:32:04.254Z

## 大小对比

- TypeScript编译器: 205 字节
- WASM编译器: 207 字节
- 差异: -2 字节 (-0.97%)

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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arguments.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 49
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 51
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 150
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
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/arguments.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "bar",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 55,
    "tag": "0xd",
    "remaining": 152
  }
}
```

## 字节级差异

共发现 110 个字节差异:

- 偏移量 0x2f: TS=0x02 vs WASM=0x06
- 偏移量 0x30: TS=0x61 vs WASM=0x62
- 偏移量 0x31: TS=0x02 vs WASM=0x61
- 偏移量 0x32: TS=0x62 vs WASM=0x72
- 偏移量 0x33: TS=0x06 vs WASM=0x02
- 偏移量 0x34: TS=0x62 vs WASM=0x61
- 偏移量 0x35: TS=0x61 vs WASM=0x02
- 偏移量 0x36: TS=0x72 vs WASM=0x62
- 偏移量 0x4b: TS=0x19 vs WASM=0x15
- 偏移量 0x50: TS=0x00 vs WASM=0x01
- 偏移量 0x51: TS=0xd0 vs WASM=0xcc
- 偏移量 0x54: TS=0x00 vs WASM=0x01
- 偏移量 0x57: TS=0x14 vs WASM=0x08
- 偏移量 0x5e: TS=0xdf vs WASM=0x29
- 偏移量 0x5f: TS=0xb8 vs WASM=0xdf
- 偏移量 0x60: TS=0xb9 vs WASM=0xb8
- 偏移量 0x61: TS=0x22 vs WASM=0xb9
- 偏移量 0x62: TS=0x02 vs WASM=0xf2
- 偏移量 0x63: TS=0x00 vs WASM=0x0e
- 偏移量 0x64: TS=0x0e vs WASM=0xe0
- ... (显示前20个差异，总共110个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 67 75 6d 65 6e 74 73 2e 6a 73 06 66 6f 6f 02 |rguments.js.foo.|
00000030: 61 02 62 06 62 61 72 0d c8 03 00 00 00 00 00 0c |a.b.bar.........|
00000040: 20 06 01 a4 01 00 00 00 03 02 02 19 00 ca 03 00 | ...............|
00000050: 00 d0 03 01 00 08 ec 14 c2 00 e3 c2 01 e4 df b8 |................|
00000060: b9 22 02 00 0e e0 ba 22 01 00 0e 29 06 2f c8 03 |."....."...)./..|
00000070: 01 0c 00 06 02 00 03 04 00 01 02 00 07 01 00 0c |................|
00000080: 00 04 00 ca 03 02 00 02 03 00 00 0c 02 cc 03 00 |................|
00000090: 00 00 ce 03 00 00 00 39 4f 00 00 00 42 30 00 00 |.......9O...B0..|
000000a0: 00 28 29 c8 03 01 03 00 00 01 00 0c 00 04 00 d0 |.().............|
000000b0: 03 00 00 00 03 00 00 09 00 39 4f 00 00 00 b7 48 |.........9O....H|
000000c0: 28 29 c8 03 01 06 00 00 04 00 00 01 00          |()...........|
```

### WASM
```
00000000: 05 05 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 61 |piler/fixtures/a|
00000020: 72 67 75 6d 65 6e 74 73 2e 6a 73 06 66 6f 6f 06 |rguments.js.foo.|
00000030: 62 61 72 02 61 02 62 0d c8 03 00 00 00 00 00 0c |bar.a.b.........|
00000040: 20 06 01 a4 01 00 00 00 03 02 02 15 00 ca 03 00 | ...............|
00000050: 01 cc 03 01 01 08 ec 08 c2 00 e3 c2 01 e4 29 df |..............).|
00000060: b8 b9 f2 0e e0 ba f1 0e 06 2f c8 03 0c 00 00 00 |........./......|
00000070: 0a 0c 00 11 06 0d 05 0c 06 00 0c 43 06 01 ca 03 |...........C....|
00000080: 02 01 02 01 00 00 06 03 ce 03 00 01 00 d0 03 00 |................|
00000090: 01 00 9e 01 00 01 00 0c 00 cb c7 eb 28 c8 03 08 |............(...|
000000a0: 00 00 12 16 07 12 07 1f 00 0c 43 06 01 cc 03 00 |..........C.....|
000000b0: 01 00 02 00 00 07 01 9e 01 00 01 00 0c 00 cb c7 |................|
000000c0: b7 48 28 c8 03 08 03 00 12 16 0c 12 07 1f 00    |.H(............|
```