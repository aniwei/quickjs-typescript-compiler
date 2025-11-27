# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/loop-break.ts
**生成时间**: 2025-11-27T11:37:31.003Z

## 大小对比

- TypeScript编译器: 148 字节
- WASM编译器: 156 字节
- 差异: -8 字节 (-5.13%)

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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "first",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "second",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 79
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
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/loop-break.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "first",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "second",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 57
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 65
    }
  ],
  "functionHeader": {
    "offset": 69,
    "tag": "0xd",
    "remaining": 87
  }
}
```

## 字节级差异

共发现 60 个字节差异:

- 偏移量 0x54: TS=0x00 vs WASM=0x02
- 偏移量 0x57: TS=0x02 vs WASM=0x00
- 偏移量 0x59: TS=0x1f vs WASM=0x25
- 偏移量 0x5a: TS=0x00 vs WASM=0x02
- 偏移量 0x5d: TS=0x00 vs WASM=0x02
- 偏移量 0x5e: TS=0x0d vs WASM=0x00
- 偏移量 0x5f: TS=0xcc vs WASM=0x30
- 偏移量 0x60: TS=0x03 vs WASM=0xcc
- 偏移量 0x61: TS=0x01 vs WASM=0x03
- 偏移量 0x62: TS=0x0d vs WASM=0x02
- 偏移量 0x63: TS=0x08 vs WASM=0x01
- 偏移量 0x64: TS=0xec vs WASM=0x30
- 偏移量 0x65: TS=0x02 vs WASM=0x08
- 偏移量 0x66: TS=0x29 vs WASM=0xec
- 偏移量 0x67: TS=0xb8 vs WASM=0x02
- 偏移量 0x68: TS=0xe3 vs WASM=0x29
- 偏移量 0x69: TS=0xb9 vs WASM=0x63
- 偏移量 0x6a: TS=0xe4 vs WASM=0x01
- 偏移量 0x6b: TS=0x39 vs WASM=0x00
- 偏移量 0x6c: TS=0xe7 vs WASM=0x63
- ... (显示前20个差异，总共60个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2e 6a 73 0a 66 69 72 |oop-break.js.fir|
00000030: 73 74 0c 73 65 63 6f 6e 64 0e 63 6f 6e 73 6f 6c |st.second.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 00 00 04 02 00 1f 00 ca 03 00 0d cc |................|
00000060: 03 01 0d 08 ec 02 29 b8 e3 b9 e4 39 e7 00 00 00 |......)....9....|
00000070: 43 e8 00 00 00 68 00 00 68 01 00 9f 24 01 00 0e |C....h..h...$...|
00000080: 06 2f c8 03 0e 00 00 2d 08 1b 0e 1b 0a 11 10 11 |./.....-........|
00000090: 07 07 09 00                                     |....|
```

### WASM
```
00000000: 05 05 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 6f 70 2d 62 72 65 61 6b 2e 6a 73 0a 66 69 72 |oop-break.js.fir|
00000030: 73 74 0c 73 65 63 6f 6e 64 0e 63 6f 6e 73 6f 6c |st.second.consol|
00000040: 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 0c 20 06 |e.log......... .|
00000050: 01 a4 01 00 02 00 04 00 00 25 02 ca 03 02 00 30 |.........%.....0|
00000060: cc 03 02 01 30 08 ec 02 29 63 01 00 63 00 00 b8 |....0...)c..c...|
00000070: cb b9 cc 39 e7 00 00 00 43 e8 00 00 00 64 00 00 |...9....C....d..|
00000080: 64 01 00 9f 24 01 00 0e 06 2f c8 03 0e 00 00 4b |d...$..../.....K|
00000090: 04 1b 0e 1b 0a 11 10 11 03 07 0d 00             |............|
```