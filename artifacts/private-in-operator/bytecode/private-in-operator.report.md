# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/private-in-operator.ts
**生成时间**: 2025-12-23T17:47:17.491Z

## 大小对比

- TypeScript编译器: 427 字节
- WASM编译器: 427 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#value",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "hasValue",
      "offset": 15
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 32
    },
    {
      "index": 6,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/private-in-operator.js",
      "offset": 36
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xc",
    "remaining": 345
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 8,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Box",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#value",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "hasValue",
      "offset": 15
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 24
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 32
    },
    {
      "index": 6,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/private-in-operator.js",
      "offset": 36
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 78
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xc",
    "remaining": 345
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 08 06 42 6f 78 0c 23 76 61 6c 75 65 02 62 10 |...Box.#value.b.|
00000010: 68 61 73 56 61 6c 75 65 0e 63 6f 6e 73 6f 6c 65 |hasValue.console|
00000020: 06 6c 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logR__tests__/f|
00000030: 69 78 74 75 72 65 73 2f 70 72 69 76 61 74 65 2d |ixtures/private-|
00000040: 69 6e 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 06 6f |in-operator.js.o|
00000050: 62 6a 0c 00 06 00 a4 01 00 04 00 05 00 03 94 01 |bj..............|
00000060: 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 75 |..........0....u|
00000070: f0 01 03 03 70 40 e4 00 00 00 80 40 e6 00 00 00 |....p@.....@....|
00000080: 80 3f e4 00 00 00 82 3f e6 00 00 00 80 63 01 00 |.?.....?.....c..|
00000090: 06 63 03 00 63 02 00 c1 01 58 e4 00 00 00 00 05 |.c..c....X......|
000000a0: e5 00 00 00 cd c2 00 56 e7 00 00 00 00 c2 02 52 |.......V.......R|
000000b0: ce 0e d0 6b 03 00 6b 02 00 3b e4 00 00 00 39 e4 |...k..k..;....9.|
000000c0: 00 00 00 11 21 00 00 3b e6 00 00 00 39 e8 00 00 |....!..;....9...|
000000d0: 00 43 e9 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.C....9....C....|
000000e0: 39 e6 00 00 00 24 01 00 24 01 00 cb 39 e8 00 00 |9....$..$...9...|
000000f0: 00 43 e9 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.C....9....C....|
00000100: 0b 24 01 00 24 01 00 cf 28 d4 03 22 00 00 00 49 |.$..$...(.."...I|
00000110: 10 1c 20 06 2b 21 1b 0e 1b 0a 1b 02 1b 14 1b 01 |.. .+!..........|
00000120: 11 15 17 15 1b 0e 1b 0a 1b 02 20 12 11 15 00 0c |.......... .....|
00000130: 42 07 01 00 01 00 01 02 01 00 04 01 d6 03 00 01 |B...............|
00000140: 00 ca 03 02 0d d3 df b3 28 d4 03 06 04 04 03 2a |........(......*|
00000150: 11 21 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 |.!..@...........|
00000160: 10 00 01 00 f0 01 03 0d 08 cb 2b 68 00 00 11 ec |..........+h....|
00000170: 06 c7 1b 24 00 00 29 d4 03 02 07 00 00 0c 48 05 |...$..).......H.|
00000180: 01 00 00 02 00 03 01 00 0e 02 10 00 01 00 ea 01 |................|
00000190: 00 01 00 ca 03 02 5d 0c 04 cc 08 cb ee 01 c7 68 |......]........h|
000001a0: 00 00 b8 47 29 d4 03 02 00 00 00                |...G)......|
```

### WASM
```
00000000: 05 08 06 42 6f 78 0c 23 76 61 6c 75 65 02 62 10 |...Box.#value.b.|
00000010: 68 61 73 56 61 6c 75 65 0e 63 6f 6e 73 6f 6c 65 |hasValue.console|
00000020: 06 6c 6f 67 52 5f 5f 74 65 73 74 73 5f 5f 2f 66 |.logR__tests__/f|
00000030: 69 78 74 75 72 65 73 2f 70 72 69 76 61 74 65 2d |ixtures/private-|
00000040: 69 6e 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 06 6f |in-operator.js.o|
00000050: 62 6a 0c 00 06 00 a4 01 00 04 00 05 00 03 94 01 |bj..............|
00000060: 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 75 |..........0....u|
00000070: f0 01 03 03 70 40 e4 00 00 00 80 40 e6 00 00 00 |....p@.....@....|
00000080: 80 3f e4 00 00 00 82 3f e6 00 00 00 80 63 01 00 |.?.....?.....c..|
00000090: 06 63 03 00 63 02 00 c1 01 58 e4 00 00 00 00 05 |.c..c....X......|
000000a0: e5 00 00 00 cd c2 00 56 e7 00 00 00 00 c2 02 52 |.......V.......R|
000000b0: ce 0e d0 6b 03 00 6b 02 00 3b e4 00 00 00 39 e4 |...k..k..;....9.|
000000c0: 00 00 00 11 21 00 00 3b e6 00 00 00 39 e8 00 00 |....!..;....9...|
000000d0: 00 43 e9 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.C....9....C....|
000000e0: 39 e6 00 00 00 24 01 00 24 01 00 cb 39 e8 00 00 |9....$..$...9...|
000000f0: 00 43 e9 00 00 00 39 e6 00 00 00 43 e7 00 00 00 |.C....9....C....|
00000100: 0b 24 01 00 24 01 00 cf 28 d4 03 22 00 00 00 49 |.$..$...(.."...I|
00000110: 10 1c 20 06 2b 21 1b 0e 1b 0a 1b 02 1b 14 1b 01 |.. .+!..........|
00000120: 11 15 17 15 1b 0e 1b 0a 1b 02 20 12 11 15 00 0c |.......... .....|
00000130: 42 07 01 00 01 00 01 02 01 00 04 01 d6 03 00 01 |B...............|
00000140: 00 ca 03 02 0d d3 df b3 28 d4 03 06 04 04 03 2a |........(......*|
00000150: 11 21 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 |.!..@...........|
00000160: 10 00 01 00 f0 01 03 0d 08 cb 2b 68 00 00 11 ec |..........+h....|
00000170: 06 c7 1b 24 00 00 29 d4 03 02 07 00 00 0c 48 05 |...$..).......H.|
00000180: 01 00 00 02 00 03 01 00 0e 02 10 00 01 00 ea 01 |................|
00000190: 00 01 00 ca 03 02 5d 0c 04 cc 08 cb ee 01 c7 68 |......]........h|
000001a0: 00 00 b8 47 29 d4 03 02 00 00 00                |...G)......|
```