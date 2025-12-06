# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/logical-ops.ts
**生成时间**: 2025-12-06T02:09:56.406Z

## 大小对比

- TypeScript编译器: 275 字节
- WASM编译器: 260 字节
- 差异: 15 字节 (5.77%)

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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 218
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
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/logical-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 45
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 53
    }
  ],
  "functionHeader": {
    "offset": 57,
    "tag": "0xd",
    "remaining": 203
  }
}
```

## 字节级差异

共发现 161 个字节差异:

- 偏移量 0x4a: TS=0x03 vs WASM=0x04
- 偏移量 0x4d: TS=0x9e vs WASM=0x8c
- 偏移量 0x60: TS=0x6c vs WASM=0xec
- 偏移量 0x61: TS=0x06 vs WASM=0x03
- 偏移量 0x62: TS=0x00 vs WASM=0x0e
- 偏移量 0x63: TS=0x00 vs WASM=0x09
- 偏移量 0x64: TS=0x00 vs WASM=0x24
- 偏移量 0x65: TS=0x0e vs WASM=0x01
- 偏移量 0x66: TS=0x09 vs WASM=0x00
- 偏移量 0x67: TS=0x24 vs WASM=0x0e
- 偏移量 0x68: TS=0x01 vs WASM=0x39
- 偏移量 0x69: TS=0x00 vs WASM=0xe5
- 偏移量 0x6a: TS=0x0e vs WASM=0x00
- 偏移量 0x6b: TS=0x39 vs WASM=0x00
- 偏移量 0x6c: TS=0xe5 vs WASM=0x00
- 偏移量 0x6d: TS=0x00 vs WASM=0x43
- 偏移量 0x6e: TS=0x00 vs WASM=0xe6
- 偏移量 0x70: TS=0x43 vs WASM=0x00
- 偏移量 0x71: TS=0xe6 vs WASM=0x00
- 偏移量 0x72: TS=0x00 vs WASM=0x0a
- ... (显示前20个差异，总共161个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 73 2e 6a 73 0e 63 6f |ogical-ops.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 03 00 00 9e 01 00 |.. .............|
00000050: 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 00 0a 11 |...)9....C......|
00000060: 6c 06 00 00 00 0e 09 24 01 00 0e 39 e5 00 00 00 |l......$...9....|
00000070: 43 e6 00 00 00 0a 11 6d 06 00 00 00 0e 09 24 01 |C......m......$.|
00000080: 00 0e 39 e5 00 00 00 43 e6 00 00 00 07 11 b2 6c |..9....C.......l|
00000090: 0a 00 00 00 0e 04 16 00 00 00 24 01 00 0e 39 e5 |..........$...9.|
000000a0: 00 00 00 43 e6 00 00 00 04 42 00 00 00 11 b2 6c |...C.....B.....l|
000000b0: 0a 00 00 00 0e 04 16 00 00 00 24 01 00 0e 39 e5 |..........$...9.|
000000c0: 00 00 00 43 e6 00 00 00 09 11 6c 06 00 00 00 0e |...C......l.....|
000000d0: 0a 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 09 |.$...9....C.....|
000000e0: 11 6d 06 00 00 00 0e 0a 24 01 00 0e 06 2f c8 03 |.m......$..../..|
000000f0: 00 20 48 0c 2a 08 1c 6c 34 0c 2a 08 1c 6c 34 0c |. H.*..l4.*..l4.|
00000100: 2f 08 30 6c 34 0c 43 0b 30 69 34 0c 2a 09 1c 6b |/.0l4.C.0i4.*..k|
00000110: 34 0c 00                                        |4..|
```

### WASM
```
00000000: 05 03 54 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..T__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6c |piler/fixtures/l|
00000020: 6f 67 69 63 61 6c 2d 6f 70 73 2e 6a 73 0e 63 6f |ogical-ops.js.co|
00000030: 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 |nsole.log.......|
00000040: 00 0c 20 06 01 a4 01 00 00 00 04 00 00 8c 01 00 |.. .............|
00000050: 08 ec 02 29 39 e5 00 00 00 43 e6 00 00 00 0a 11 |...)9....C......|
00000060: ec 03 0e 09 24 01 00 0e 39 e5 00 00 00 43 e6 00 |....$...9....C..|
00000070: 00 00 0a 11 ed 03 0e 09 24 01 00 0e 39 e5 00 00 |........$...9...|
00000080: 00 43 e6 00 00 00 07 11 b2 ec 07 0e 04 16 00 00 |.C..............|
00000090: 00 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 04 |.$...9....C.....|
000000a0: 42 00 00 00 11 b2 ec 07 0e 04 16 00 00 00 24 01 |B.............$.|
000000b0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 09 11 ec 03 |..9....C........|
000000c0: 0e 0a 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 |..$...9....C....|
000000d0: 09 11 ed 03 0e 0a 24 01 00 0e 06 2f c8 03 24 00 |......$..../..$.|
000000e0: 00 2f 0e 39 08 17 15 1b 0e 39 08 17 15 1b 0e 52 |./.9.....9.....R|
000000f0: 08 17 15 1b 0e 66 08 17 15 1b 0e 39 08 17 15 1b |.....f.....9....|
00000100: 0e 39 08 00                                     |.9..|
```