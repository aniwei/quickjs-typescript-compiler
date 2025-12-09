# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/class-static-block.ts
**生成时间**: 2025-12-09T09:00:06.118Z

## 大小对比

- TypeScript编译器: 431 字节
- WASM编译器: 640 字节
- 差异: -209 字节 (-32.66%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-static-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 71
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 79
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 83
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 89
    }
  ],
  "functionHeader": {
    "offset": 95,
    "tag": "0xd",
    "remaining": 336
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/class-static-block.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 52
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 73
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 77
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 85
    },
    {
      "index": 7,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 89
    },
    {
      "index": 8,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 95
    },
    {
      "index": 9,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "booted",
      "offset": 103
    }
  ],
  "functionHeader": {
    "offset": 110,
    "tag": "0xd",
    "remaining": 530
  }
}
```

## 字节级差异

共发现 546 个字节差异:

- 偏移量 0x1: TS=0x08 vs WASM=0x0a
- 偏移量 0x43: TS=0x06 vs WASM=0x0a
- 偏移量 0x44: TS=0x69 vs WASM=0x23
- 偏移量 0x45: TS=0x6e vs WASM=0x62
- 偏移量 0x46: TS=0x63 vs WASM=0x75
- 偏移量 0x47: TS=0x0e vs WASM=0x6d
- 偏移量 0x48: TS=0x63 vs WASM=0x70
- 偏移量 0x49: TS=0x6f vs WASM=0x06
- 偏移量 0x4a: TS=0x6e vs WASM=0x69
- 偏移量 0x4b: TS=0x73 vs WASM=0x6e
- 偏移量 0x4c: TS=0x6f vs WASM=0x63
- 偏移量 0x4d: TS=0x6c vs WASM=0x0e
- 偏移量 0x4e: TS=0x65 vs WASM=0x63
- 偏移量 0x4f: TS=0x06 vs WASM=0x6f
- 偏移量 0x50: TS=0x6c vs WASM=0x6e
- 偏移量 0x51: TS=0x6f vs WASM=0x73
- 偏移量 0x52: TS=0x67 vs WASM=0x6f
- 偏移量 0x53: TS=0x0a vs WASM=0x6c
- 偏移量 0x54: TS=0x6c vs WASM=0x65
- 偏移量 0x55: TS=0x61 vs WASM=0x06
- ... (显示前20个差异，总共546个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 08 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 73 74 61 74 69 63 2d 62 6c 6f 63 |lass-static-bloc|
00000030: 6b 2e 6a 73 0e 43 6f 75 6e 74 65 72 0c 23 63 6f |k.js.Counter.#co|
00000040: 75 6e 74 06 69 6e 63 0e 63 6f 6e 73 6f 6c 65 06 |unt.inc.console.|
00000050: 6c 6f 67 0a 6c 61 62 65 6c 0a 23 62 75 6d 70 0d |log.label.#bump.|
00000060: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 03 00 |........ .......|
00000070: 04 01 03 7a 03 ca 03 02 00 30 f0 01 03 01 10 cc |...z.....0......|
00000080: 03 00 00 70 ca 03 00 09 08 ec 02 29 63 00 00 06 |...p.......)c...|
00000090: 63 01 00 c1 00 58 e5 00 00 00 00 05 e6 00 00 00 |c....X..........|
000000a0: cd 1b c2 01 56 e7 00 00 00 00 c2 02 56 42 00 00 |....V.......VB..|
000000b0: 00 01 1b 06 cc 0e cf 6b 01 00 e3 39 e8 00 00 00 |.......k...9....|
000000c0: 43 e9 00 00 00 68 00 00 42 ea 00 00 00 24 01 00 |C....h..B....$..|
000000d0: 0e 39 e8 00 00 00 43 e9 00 00 00 68 00 00 43 e7 |.9....C....h..C.|
000000e0: 00 00 00 24 00 00 24 01 00 0e 39 e8 00 00 00 43 |...$..$...9....C|
000000f0: e9 00 00 00 68 00 00 42 42 00 00 00 24 01 00 0e |....h..BB...$...|
00000100: 06 2f c8 03 24 00 00 00 33 24 00 1b 0e 1b 0a 11 |./..$...3$......|
00000110: 0e 1b 0f 17 15 1b 0e 1b 0a 11 0e 1b 08 11 17 17 |................|
00000120: 15 1b 0e 1b 0a 11 0e 1b 0f 00 0c 42 07 01 00 00 |...........B....|
00000130: 01 00 03 02 00 16 01 10 00 00 00 f0 01 01 0d cc |................|
00000140: 03 02 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 |.....+h.......$.|
00000150: 00 0e c7 68 00 00 b7 47 29 c8 03 02 00 00 00 0c |...h...G).......|
00000160: 00 00 00 ce 03 00 02 00 02 00 00 16 02 10 00 00 |................|
00000170: 10 ea 01 00 01 00 0c 04 cc 08 cb 08 43 eb 00 00 |............C...|
00000180: 00 24 00 00 0e 08 42 e6 00 00 00 28 0c 00 00 00 |.$....B....(....|
00000190: 84 01 00 02 00 01 00 00 0c 02 10 00 00 10 ea 01 |................|
000001a0: 00 01 00 0c 04 cc 08 cb 08 42 e6 00 00 00 28    |.........B....(|
```

### WASM
```
00000000: 05 0a 62 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..b__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 61 73 73 2d 73 74 61 74 69 63 2d 62 6c 6f 63 |lass-static-bloc|
00000030: 6b 2e 6a 73 0e 43 6f 75 6e 74 65 72 0c 23 63 6f |k.js.Counter.#co|
00000040: 75 6e 74 0a 23 62 75 6d 70 06 69 6e 63 0e 63 6f |unt.#bump.inc.co|
00000050: 6e 73 6f 6c 65 06 6c 6f 67 0a 6c 61 62 65 6c 0e |nsole.log.label.|
00000060: 63 6f 75 6e 74 65 72 0c 62 6f 6f 74 65 64 0d c8 |counter.booted..|
00000070: 03 00 00 00 00 00 0c 20 06 01 a4 01 00 04 00 04 |....... ........|
00000080: 01 05 9f 01 04 ca 03 02 00 30 cc 03 03 01 75 ce |.........0....u.|
00000090: 03 03 02 36 f0 01 03 03 70 ca 03 00 09 08 ec 02 |...6....p.......|
000000a0: 29 63 00 00 06 63 03 00 63 02 00 63 01 00 c1 03 |)c...c..c..c....|
000000b0: 58 e5 00 00 00 00 1b 05 e6 00 00 00 cc 1b 1b 1b |X...............|
000000c0: 1b c2 00 52 4f e7 00 00 00 cd 1b 1b c2 01 56 e8 |...RO.........V.|
000000d0: 00 00 00 00 1b 1b c2 02 56 42 00 00 00 01 1b 06 |........VB......|
000000e0: ce 0e 11 11 2e cf 11 c2 04 52 24 00 00 0e 6b 03 |.........R$...k.|
000000f0: 00 6b 01 00 e3 39 e9 00 00 00 43 ea 00 00 00 68 |.k...9....C....h|
00000100: 00 00 42 eb 00 00 00 24 01 00 0e 39 e9 00 00 00 |..B....$...9....|
00000110: 43 ea 00 00 00 68 00 00 43 e8 00 00 00 24 00 00 |C....h..C....$..|
00000120: 24 01 00 0e 39 e9 00 00 00 43 ea 00 00 00 68 00 |$...9....C....h.|
00000130: 00 42 42 00 00 00 24 01 00 0e 06 2f c8 03 24 00 |.BB...$..../..$.|
00000140: 00 00 58 24 00 1b 0e 1b 0a 11 0e 1b 0f 17 15 1b |..X$............|
00000150: 0e 1b 0a 11 0e 1b 08 11 17 17 15 1b 0e 1b 0a 11 |................|
00000160: 0e 1b 0f 00 0c 4a 07 01 00 00 01 00 04 01 00 0c |.....J..........|
00000170: 01 10 00 01 00 cc 03 01 0d 08 cb c7 11 df 45 b8 |..............E.|
00000180: 9f 15 df 46 29 c8 03 08 07 0b 0d 05 07 08 16 10 |...F)...........|
00000190: 00 0c 42 07 01 00 00 01 00 02 02 00 0d 01 10 00 |..B.............|
000001a0: 01 00 ce 03 02 0d cc 03 01 0d 08 cb c7 df 2d 24 |..............-$|
000001b0: 00 00 0e c7 e0 45 28 c8 03 0c 0a 0b 0d 05 07 08 |.....E(.........|
000001c0: 0c 0c 1c 02 0c 15 00 0c 42 07 01 00 00 01 00 02 |........B.......|
000001d0: 01 00 06 01 10 00 01 00 cc 03 01 0d 08 cb c7 df |................|
000001e0: 45 28 c8 03 06 0e 0b 12 10 0c 15 00 0c 40 05 01 |E(...........@..|
000001f0: 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 01 03 |................|
00000200: 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 |...+h.......$..)|
00000210: c8 03 02 11 00 00 0c 40 05 01 00 00 01 00 04 01 |.......@........|
00000220: 01 1b 01 10 00 01 40 cc 03 01 0d 08 cb c7 68 00 |......@.......h.|
00000230: 00 b7 47 c7 04 ec 00 00 00 4e eb 00 00 00 c2 00 |..G......N......|
00000240: c7 1b 24 00 00 29 c8 03 02 00 00 00 0c 42 05 01 |..$..).......B..|
00000250: 00 00 00 00 04 02 00 12 00 10 00 01 cc 03 00 0c |................|
00000260: df b8 15 e0 46 0e df 04 ed 00 00 00 44 eb 00 00 |....F.......D...|
00000270: 00 29 c8 03 0a 03 0b 03 05 07 08 1c 07 07 08 00 |.)..............|
```