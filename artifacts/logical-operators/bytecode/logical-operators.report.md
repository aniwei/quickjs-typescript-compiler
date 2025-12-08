# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-operators.ts
**生成时间**: 2025-12-08T14:42:14.939Z

## 大小对比

- TypeScript编译器: 245 字节
- WASM编译器: 230 字节
- 差异: 15 字节 (6.52%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 182
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-operators.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 59
    }
  ],
  "functionHeader": {
    "offset": 63,
    "tag": "0xd",
    "remaining": 167
  }
}
```

## 字节级差异

共发现 127 个字节差异:

- 偏移量 0x53: TS=0x7e vs WASM=0x6f
- 偏移量 0x65: TS=0x6c vs WASM=0xec
- 偏移量 0x66: TS=0x00 vs WASM=0x03
- 偏移量 0x67: TS=0x00 vs WASM=0x0e
- 偏移量 0x68: TS=0x00 vs WASM=0x09
- 偏移量 0x69: TS=0x02 vs WASM=0x24
- 偏移量 0x6a: TS=0x0e vs WASM=0x01
- 偏移量 0x6b: TS=0x09 vs WASM=0x00
- 偏移量 0x6c: TS=0x24 vs WASM=0x0e
- 偏移量 0x6d: TS=0x01 vs WASM=0x39
- 偏移量 0x6e: TS=0x00 vs WASM=0xe5
- 偏移量 0x6f: TS=0x0e vs WASM=0x00
- 偏移量 0x70: TS=0x39 vs WASM=0x00
- 偏移量 0x71: TS=0xe5 vs WASM=0x00
- 偏移量 0x72: TS=0x00 vs WASM=0x43
- 偏移量 0x73: TS=0x00 vs WASM=0xe6
- 偏移量 0x75: TS=0x43 vs WASM=0x00
- 偏移量 0x76: TS=0xe6 vs WASM=0x00
- 偏移量 0x77: TS=0x00 vs WASM=0x09
- 偏移量 0x78: TS=0x00 vs WASM=0x11
- ... (显示前20个差异，总共127个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |.js.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 00 00 7e 00 08 ec 02 29 39 e5 00 00 00 43 e6 |...~....)9....C.|
00000060: 00 00 00 0a 11 6c 00 00 00 02 0e 09 24 01 00 0e |.....l......$...|
00000070: 39 e5 00 00 00 43 e6 00 00 00 09 11 6d 00 00 00 |9....C......m...|
00000080: 02 0e 0a 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 |...$...9....C...|
00000090: 00 07 11 b2 6c 00 00 00 06 0e 04 16 00 00 00 24 |....l..........$|
000000a0: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 b8 11 6c |...9....C......l|
000000b0: 00 00 00 02 0e b9 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
000000c0: e6 00 00 00 b7 11 6d 00 00 00 02 0e ba 24 01 00 |......m......$..|
000000d0: 0e 06 2f c8 03 1e 00 00 2f 0e 48 08 17 15 1b 0e |../...../.H.....|
000000e0: 48 08 17 15 1b 0e 61 08 17 15 1b 0e 48 08 17 15 |H.....a.....H...|
000000f0: 1b 0e 48 08 00                                  |..H..|
```

### WASM
```
00000000: 05 03 60 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..`__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 65 72 61 74 6f 72 73 |ogical-operators|
00000030: 2e 6a 73 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |.js.console.log.|
00000040: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000050: 04 00 00 6f 00 08 ec 02 29 39 e5 00 00 00 43 e6 |...o....)9....C.|
00000060: 00 00 00 0a 11 ec 03 0e 09 24 01 00 0e 39 e5 00 |.........$...9..|
00000070: 00 00 43 e6 00 00 00 09 11 ed 03 0e 0a 24 01 00 |..C..........$..|
00000080: 0e 39 e5 00 00 00 43 e6 00 00 00 07 11 b2 ec 07 |.9....C.........|
00000090: 0e 04 16 00 00 00 24 01 00 0e 39 e5 00 00 00 43 |......$...9....C|
000000a0: e6 00 00 00 b8 11 ec 03 0e b9 24 01 00 0e 39 e5 |..........$...9.|
000000b0: 00 00 00 43 e6 00 00 00 b7 11 ed 03 0e ba 24 01 |...C..........$.|
000000c0: 00 0e 06 2f c8 03 1e 00 00 2f 0e 39 08 17 15 1b |.../...../.9....|
000000d0: 0e 39 08 17 15 1b 0e 52 08 17 15 1b 0e 39 08 17 |.9.....R.....9..|
000000e0: 15 1b 0e 39 08 00                               |...9..|
```