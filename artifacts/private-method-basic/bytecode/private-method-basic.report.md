# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/private-method-basic.ts
**生成时间**: 2025-12-26T13:59:20.595Z

## 大小对比

- TypeScript编译器: 514 字节
- WASM编译器: 514 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 23
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 25
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 29
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 37
    },
    {
      "index": 7,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/private-method-basic.js",
      "offset": 41
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 424
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
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
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "#bump",
      "offset": 17
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 23
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 25
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 29
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 37
    },
    {
      "index": 7,
      "rawLength": 84,
      "actualLength": 42,
      "isWideChar": 0,
      "string": "__tests__/fixtures/private-method-basic.js",
      "offset": 41
    },
    {
      "index": 8,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "delta",
      "offset": 84
    }
  ],
  "functionHeader": {
    "offset": 90,
    "tag": "0xc",
    "remaining": 424
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 0a 23 62 75 6d 70 02 63 06 69 6e 63 0e 63 6f |t.#bump.c.inc.co|
00000020: 6e 73 6f 6c 65 06 6c 6f 67 54 5f 5f 74 65 73 74 |nsole.logT__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 70 72 69 |s__/fixtures/pri|
00000040: 76 61 74 65 2d 6d 65 74 68 6f 64 2d 62 61 73 69 |vate-method-basi|
00000050: 63 2e 6a 73 0a 64 65 6c 74 61 0c 00 06 00 a4 01 |c.js.delta......|
00000060: 00 05 00 04 00 04 9f 01 05 a6 01 00 00 00 c8 03 |................|
00000070: 02 00 30 ca 03 03 02 75 cc 03 03 03 36 f0 01 03 |..0....u....6...|
00000080: 04 70 40 e4 00 00 00 80 40 e7 00 00 00 80 3f e4 |.p@.....@.....?.|
00000090: 00 00 00 82 3f e7 00 00 00 80 63 01 00 06 63 04 |....?.....c...c.|
000000a0: 00 63 03 00 63 02 00 c1 02 58 e4 00 00 00 00 05 |.c..c....X......|
000000b0: e5 00 00 00 cd c2 00 52 4f e6 00 00 00 ce c2 01 |.......RO.......|
000000c0: 56 e8 00 00 00 00 11 07 1b 2e c2 03 52 c5 04 0e |V...........R...|
000000d0: d0 6b 04 00 6b 02 00 3b e4 00 00 00 39 e4 00 00 |.k..k..;....9...|
000000e0: 00 11 21 00 00 3b e7 00 00 00 39 e9 00 00 00 43 |..!..;....9....C|
000000f0: ea 00 00 00 39 e7 00 00 00 43 e8 00 00 00 24 00 |....9....C....$.|
00000100: 00 24 01 00 cb 39 e9 00 00 00 43 ea 00 00 00 39 |.$...9....C....9|
00000110: e7 00 00 00 43 e8 00 00 00 24 00 00 24 01 00 cf |....C....$..$...|
00000120: 28 d6 03 20 00 00 00 5a 16 1c 20 0e 2b 29 1b 0e |(.. ...Z.. .+)..|
00000130: 1b 0a 1b 02 1b 08 11 0b 17 15 1b 0e 1b 0a 1b 02 |................|
00000140: 1b 08 11 0b 00 0c 4a 07 01 00 01 01 01 04 01 00 |......J.........|
00000150: 10 02 d8 03 00 01 00 10 00 01 00 ca 03 02 0d 08 |................|
00000160: cb c7 11 df 45 d3 9f 15 df 46 0e c7 df 45 28 d6 |....E....F...E(.|
00000170: 03 0e 03 04 0d 08 07 08 11 16 07 05 21 01 0c 15 |............!...|
00000180: 00 0c 42 07 01 00 00 01 00 03 01 00 09 01 10 00 |..B.............|
00000190: 01 00 cc 03 03 0d 08 cb c7 df 2d b8 25 01 00 d6 |..........-.%...|
000001a0: 03 06 07 04 12 1e 11 15 00 0c 40 05 01 00 00 01 |..........@.....|
000001b0: 00 02 01 00 0f 01 10 00 01 00 f0 01 04 0d 08 cb |................|
000001c0: 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 d6 03 02 |+h.......$..)...|
000001d0: 0a 00 00 0c 48 05 01 00 00 02 00 03 01 00 0f 02 |....H...........|
000001e0: 10 00 01 00 ea 01 00 01 00 ca 03 02 5d 0c 04 cc |............]...|
000001f0: 08 cb c7 c8 2e c7 68 00 00 b7 47 29 d6 03 02 00 |......h...G)....|
00000200: 00 00                                           |..|
```

### WASM
```
00000000: 05 09 0e 43 6f 75 6e 74 65 72 0c 23 63 6f 75 6e |...Counter.#coun|
00000010: 74 0a 23 62 75 6d 70 02 63 06 69 6e 63 0e 63 6f |t.#bump.c.inc.co|
00000020: 6e 73 6f 6c 65 06 6c 6f 67 54 5f 5f 74 65 73 74 |nsole.logT__test|
00000030: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 70 72 69 |s__/fixtures/pri|
00000040: 76 61 74 65 2d 6d 65 74 68 6f 64 2d 62 61 73 69 |vate-method-basi|
00000050: 63 2e 6a 73 0a 64 65 6c 74 61 0c 00 06 00 a4 01 |c.js.delta......|
00000060: 00 05 00 04 00 04 9f 01 05 a6 01 00 00 00 c8 03 |................|
00000070: 02 00 30 ca 03 03 02 75 cc 03 03 03 36 f0 01 03 |..0....u....6...|
00000080: 04 70 40 e4 00 00 00 80 40 e7 00 00 00 80 3f e4 |.p@.....@.....?.|
00000090: 00 00 00 82 3f e7 00 00 00 80 63 01 00 06 63 04 |....?.....c...c.|
000000a0: 00 63 03 00 63 02 00 c1 02 58 e4 00 00 00 00 05 |.c..c....X......|
000000b0: e5 00 00 00 cd c2 00 52 4f e6 00 00 00 ce c2 01 |.......RO.......|
000000c0: 56 e8 00 00 00 00 11 07 1b 2e c2 03 52 c5 04 0e |V...........R...|
000000d0: d0 6b 04 00 6b 02 00 3b e4 00 00 00 39 e4 00 00 |.k..k..;....9...|
000000e0: 00 11 21 00 00 3b e7 00 00 00 39 e9 00 00 00 43 |..!..;....9....C|
000000f0: ea 00 00 00 39 e7 00 00 00 43 e8 00 00 00 24 00 |....9....C....$.|
00000100: 00 24 01 00 cb 39 e9 00 00 00 43 ea 00 00 00 39 |.$...9....C....9|
00000110: e7 00 00 00 43 e8 00 00 00 24 00 00 24 01 00 cf |....C....$..$...|
00000120: 28 d6 03 20 00 00 00 5a 16 1c 20 0e 2b 29 1b 0e |(.. ...Z.. .+)..|
00000130: 1b 0a 1b 02 1b 08 11 0b 17 15 1b 0e 1b 0a 1b 02 |................|
00000140: 1b 08 11 0b 00 0c 4a 07 01 00 01 01 01 04 01 00 |......J.........|
00000150: 10 02 d8 03 00 01 00 10 00 01 00 ca 03 02 0d 08 |................|
00000160: cb c7 11 df 45 d3 9f 15 df 46 0e c7 df 45 28 d6 |....E....F...E(.|
00000170: 03 0e 03 04 0d 08 07 08 11 16 07 05 21 01 0c 15 |............!...|
00000180: 00 0c 42 07 01 00 00 01 00 03 01 00 09 01 10 00 |..B.............|
00000190: 01 00 cc 03 03 0d 08 cb c7 df 2d b8 25 01 00 d6 |..........-.%...|
000001a0: 03 06 07 04 12 1e 11 15 00 0c 40 05 01 00 00 01 |..........@.....|
000001b0: 00 02 01 00 0f 01 10 00 01 00 f0 01 04 0d 08 cb |................|
000001c0: 2b 68 00 00 11 ec 06 c7 1b 24 00 00 29 d6 03 02 |+h.......$..)...|
000001d0: 0a 00 00 0c 48 05 01 00 00 02 00 03 01 00 0f 02 |....H...........|
000001e0: 10 00 01 00 ea 01 00 01 00 ca 03 02 5d 0c 04 cc |............]...|
000001f0: 08 cb c7 c8 2e c7 68 00 00 b7 47 29 d6 03 02 00 |......h...G)....|
00000200: 00 00                                           |..|
```