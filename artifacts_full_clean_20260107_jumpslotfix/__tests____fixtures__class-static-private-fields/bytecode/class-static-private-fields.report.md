# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-static-private-fields.ts
**生成时间**: 2026-01-07T15:35:35.416Z

## 大小对比

- TypeScript编译器: 405 字节
- WASM编译器: 405 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 29
    },
    {
      "index": 5,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-private-fields.js",
      "offset": 33
    }
  ],
  "functionHeader": {
    "offset": 83,
    "tag": "0xc",
    "remaining": 322
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#count",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 21
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 29
    },
    {
      "index": 5,
      "rawLength": 98,
      "actualLength": 49,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-private-fields.js",
      "offset": 33
    }
  ],
  "functionHeader": {
    "offset": 83,
    "tag": "0xc",
    "remaining": 322
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 06 69 6e 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |t.inc.console.lo|
00000020: 67 62 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |gb__tests__/fixt|
00000030: 75 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 69 |ures/class-stati|
00000040: 63 2d 70 72 69 76 61 74 65 2d 66 69 65 6c 64 73 |c-private-fields|
00000050: 2e 6a 73 0c 00 06 00 a4 01 00 04 00 04 00 03 7e |.js............~|
00000060: 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 75 |..........0....u|
00000070: f0 01 03 03 70 40 e4 00 00 00 80 3f e4 00 00 00 |....p@.....?....|
00000080: 82 63 01 00 06 63 03 00 63 02 00 c1 01 58 e4 00 |.c...c..c....X..|
00000090: 00 00 00 1b 05 e5 00 00 00 cd 1b 1b c2 00 56 e6 |..............V.|
000000a0: 00 00 00 00 1b 06 ce 0e d0 11 c2 02 52 24 00 00 |............R$..|
000000b0: 0e 6b 03 00 6b 02 00 3b e4 00 00 00 39 e7 00 00 |.k..k..;....9...|
000000c0: 00 43 e8 00 00 00 39 e4 00 00 00 43 e6 00 00 00 |.C....9....C....|
000000d0: 24 00 00 24 01 00 cb 39 e7 00 00 00 43 e8 00 00 |$..$...9....C...|
000000e0: 00 39 e4 00 00 00 43 e6 00 00 00 24 00 00 24 01 |.9....C....$..$.|
000000f0: 00 cf 28 d2 03 1c 00 00 00 47 10 00 1b 0e 1b 0a |..(......G......|
00000100: 1b 0e 1b 08 11 17 17 15 1b 0e 1b 0a 1b 0e 1b 08 |................|
00000110: 11 17 00 0c 42 07 01 00 00 01 00 04 01 00 0f 01 |....B...........|
00000120: 10 00 01 00 ca 03 02 0d 08 cb c7 11 df 45 93 18 |.............E..|
00000130: df 46 0e c7 df 45 28 d2 03 0c 03 0b 0d 05 07 08 |.F...E(.........|
00000140: 11 0e 21 00 0c 15 00 0c 40 05 01 00 00 01 00 02 |..!.....@.......|
00000150: 01 00 0f 01 10 00 01 00 f0 01 03 0d 08 cb 2b 68 |..............+h|
00000160: 00 00 11 ec 06 c7 1b 24 00 00 29 d2 03 02 07 00 |.......$..).....|
00000170: 00 0c 40 05 01 00 00 01 00 03 01 00 09 01 10 00 |..@.............|
00000180: 01 00 ca 03 02 5d 08 cb c7 68 00 00 b7 47 29 d2 |.....]...h...G).|
00000190: 03 02 00 00 00                                  |.....|
```

### WASM
```
00000000: 05 06 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 06 69 6e 63 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |t.inc.console.lo|
00000020: 67 62 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |gb__tests__/fixt|
00000030: 75 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 69 |ures/class-stati|
00000040: 63 2d 70 72 69 76 61 74 65 2d 66 69 65 6c 64 73 |c-private-fields|
00000050: 2e 6a 73 0c 00 06 00 a4 01 00 04 00 04 00 03 7e |.js............~|
00000060: 04 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 75 |..........0....u|
00000070: f0 01 03 03 70 40 e4 00 00 00 80 3f e4 00 00 00 |....p@.....?....|
00000080: 82 63 01 00 06 63 03 00 63 02 00 c1 01 58 e4 00 |.c...c..c....X..|
00000090: 00 00 00 1b 05 e5 00 00 00 cd 1b 1b c2 00 56 e6 |..............V.|
000000a0: 00 00 00 00 1b 06 ce 0e d0 11 c2 02 52 24 00 00 |............R$..|
000000b0: 0e 6b 03 00 6b 02 00 3b e4 00 00 00 39 e7 00 00 |.k..k..;....9...|
000000c0: 00 43 e8 00 00 00 39 e4 00 00 00 43 e6 00 00 00 |.C....9....C....|
000000d0: 24 00 00 24 01 00 cb 39 e7 00 00 00 43 e8 00 00 |$..$...9....C...|
000000e0: 00 39 e4 00 00 00 43 e6 00 00 00 24 00 00 24 01 |.9....C....$..$.|
000000f0: 00 cf 28 d2 03 1c 00 00 00 47 10 00 1b 0e 1b 0a |..(......G......|
00000100: 1b 0e 1b 08 11 17 17 15 1b 0e 1b 0a 1b 0e 1b 08 |................|
00000110: 11 17 00 0c 42 07 01 00 00 01 00 04 01 00 0f 01 |....B...........|
00000120: 10 00 01 00 ca 03 02 0d 08 cb c7 11 df 45 93 18 |.............E..|
00000130: df 46 0e c7 df 45 28 d2 03 0c 03 0b 0d 05 07 08 |.F...E(.........|
00000140: 11 0e 21 00 0c 15 00 0c 40 05 01 00 00 01 00 02 |..!.....@.......|
00000150: 01 00 0f 01 10 00 01 00 f0 01 03 0d 08 cb 2b 68 |..............+h|
00000160: 00 00 11 ec 06 c7 1b 24 00 00 29 d2 03 02 07 00 |.......$..).....|
00000170: 00 0c 40 05 01 00 00 01 00 03 01 00 09 01 10 00 |..@.............|
00000180: 01 00 ca 03 02 5d 08 cb c7 68 00 00 b7 47 29 d2 |.....]...h...G).|
00000190: 03 02 00 00 00                                  |.....|
```