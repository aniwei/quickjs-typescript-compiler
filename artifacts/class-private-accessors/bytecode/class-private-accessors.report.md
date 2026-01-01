# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-private-accessors.ts
**生成时间**: 2026-01-01T10:01:38.593Z

## 大小对比

- TypeScript编译器: 582 字节
- WASM编译器: 582 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
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
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#value",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "#value<set>",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 32
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 34
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 38
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 46
    },
    {
      "index": 8,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-accessors.js",
      "offset": 50
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 98,
    "tag": "0xc",
    "remaining": 484
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#value",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "#value<set>",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 32
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "inc",
      "offset": 34
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 38
    },
    {
      "index": 7,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 46
    },
    {
      "index": 8,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-private-accessors.js",
      "offset": 50
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 96
    }
  ],
  "functionHeader": {
    "offset": 98,
    "tag": "0xc",
    "remaining": 484
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 0e 43 6f 75 6e 74 65 72 04 23 78 0c 23 76 |...Counter.#x.#v|
00000010: 61 6c 75 65 16 23 76 61 6c 75 65 3c 73 65 74 3e |alue.#value<set>|
00000020: 02 63 06 69 6e 63 0e 63 6f 6e 73 6f 6c 65 06 6c |.c.inc.console.l|
00000030: 6f 67 5a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogZ__tests__/fix|
00000040: 74 75 72 65 73 2f 63 6c 61 73 73 2d 70 72 69 76 |tures/class-priv|
00000050: 61 74 65 2d 61 63 63 65 73 73 6f 72 73 2e 6a 73 |ate-accessors.js|
00000060: 02 76 0c 00 06 00 a4 01 00 06 00 04 00 05 a2 01 |.v..............|
00000070: 06 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 75 |..........0....u|
00000080: cc 03 03 03 39 ce 03 03 04 38 f0 01 03 05 70 40 |....9....8....p@|
00000090: e4 00 00 00 80 40 e8 00 00 00 80 3f e4 00 00 00 |.....@.....?....|
000000a0: 82 3f e8 00 00 00 80 63 01 00 06 63 05 00 63 04 |.?.....c...c..c.|
000000b0: 00 63 03 00 63 02 00 c1 03 58 e4 00 00 00 00 05 |.c..c....X......|
000000c0: e5 00 00 00 cd c2 00 52 ce c2 01 52 c5 04 c2 02 |.......R...R....|
000000d0: 56 e9 00 00 00 00 11 07 1b 2e c2 04 52 c5 05 0e |V...........R...|
000000e0: d0 6b 05 00 6b 02 00 3b e4 00 00 00 39 e4 00 00 |.k..k..;....9...|
000000f0: 00 11 21 00 00 3b e8 00 00 00 39 ea 00 00 00 43 |..!..;....9....C|
00000100: eb 00 00 00 39 e8 00 00 00 43 e9 00 00 00 24 00 |....9....C....$.|
00000110: 00 24 01 00 cb 39 ea 00 00 00 43 eb 00 00 00 39 |.$...9....C....9|
00000120: e8 00 00 00 43 e9 00 00 00 24 00 00 24 01 00 cf |....C....$..$...|
00000130: 28 d8 03 20 00 00 00 5d 1c 1c 20 0e 2b 29 1b 0e |(.. ...].. .+)..|
00000140: 1b 0a 1b 02 1b 08 11 0b 17 15 1b 0e 1b 0a 1b 02 |................|
00000150: 1b 08 11 0b 00 0c 4a 07 01 00 00 01 00 02 01 00 |......J.........|
00000160: 06 01 10 00 01 00 ca 03 02 0d 08 cb c7 df 45 28 |..............E(|
00000170: d8 03 06 03 04 12 1e 0c 15 00 0c 4a 07 01 00 01 |...........J....|
00000180: 01 01 04 01 00 08 02 da 03 00 01 00 10 00 01 00 |................|
00000190: ca 03 02 0d 08 cb c7 d3 15 df 46 29 d8 03 06 06 |..........F)....|
000001a0: 04 0d 08 07 14 00 0c 42 07 01 00 00 01 00 04 02 |.......B........|
000001b0: 00 1c 01 10 00 01 00 cc 03 03 0d ce 03 04 0d 08 |................|
000001c0: cb c7 c7 df 2d 24 00 00 b8 9f 15 e0 1b 1e 2d 1d |....-$........-.|
000001d0: 24 01 00 0e 0e c7 df 2d 25 00 00 d8 03 0e 09 04 |$......-%.......|
000001e0: 0d 08 07 08 07 1c 20 10 44 1d 0c 15 00 0c 40 05 |...... .D.....@.|
000001f0: 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 01 |................|
00000200: 05 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
00000210: 29 d8 03 02 0d 00 00 0c 48 05 01 00 00 02 00 03 |).......H.......|
00000220: 01 00 0f 02 10 00 01 00 ea 01 00 01 00 ca 03 02 |................|
00000230: 5d 0c 04 cc 08 cb c7 c8 2e c7 68 00 00 b7 47 29 |].........h...G)|
00000240: d8 03 02 00 00 00                               |......|
```

### WASM
```
00000000: 05 0a 0e 43 6f 75 6e 74 65 72 04 23 78 0c 23 76 |...Counter.#x.#v|
00000010: 61 6c 75 65 16 23 76 61 6c 75 65 3c 73 65 74 3e |alue.#value<set>|
00000020: 02 63 06 69 6e 63 0e 63 6f 6e 73 6f 6c 65 06 6c |.c.inc.console.l|
00000030: 6f 67 5a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |ogZ__tests__/fix|
00000040: 74 75 72 65 73 2f 63 6c 61 73 73 2d 70 72 69 76 |tures/class-priv|
00000050: 61 74 65 2d 61 63 63 65 73 73 6f 72 73 2e 6a 73 |ate-accessors.js|
00000060: 02 76 0c 00 06 00 a4 01 00 06 00 04 00 05 a2 01 |.v..............|
00000070: 06 a6 01 00 00 00 c8 03 02 00 30 ca 03 03 02 75 |..........0....u|
00000080: cc 03 03 03 39 ce 03 03 04 38 f0 01 03 05 70 40 |....9....8....p@|
00000090: e4 00 00 00 80 40 e8 00 00 00 80 3f e4 00 00 00 |.....@.....?....|
000000a0: 82 3f e8 00 00 00 80 63 01 00 06 63 05 00 63 04 |.?.....c...c..c.|
000000b0: 00 63 03 00 63 02 00 c1 03 58 e4 00 00 00 00 05 |.c..c....X......|
000000c0: e5 00 00 00 cd c2 00 52 ce c2 01 52 c5 04 c2 02 |.......R...R....|
000000d0: 56 e9 00 00 00 00 11 07 1b 2e c2 04 52 c5 05 0e |V...........R...|
000000e0: d0 6b 05 00 6b 02 00 3b e4 00 00 00 39 e4 00 00 |.k..k..;....9...|
000000f0: 00 11 21 00 00 3b e8 00 00 00 39 ea 00 00 00 43 |..!..;....9....C|
00000100: eb 00 00 00 39 e8 00 00 00 43 e9 00 00 00 24 00 |....9....C....$.|
00000110: 00 24 01 00 cb 39 ea 00 00 00 43 eb 00 00 00 39 |.$...9....C....9|
00000120: e8 00 00 00 43 e9 00 00 00 24 00 00 24 01 00 cf |....C....$..$...|
00000130: 28 d8 03 20 00 00 00 5d 1c 1c 20 0e 2b 29 1b 0e |(.. ...].. .+)..|
00000140: 1b 0a 1b 02 1b 08 11 0b 17 15 1b 0e 1b 0a 1b 02 |................|
00000150: 1b 08 11 0b 00 0c 4a 07 01 00 00 01 00 02 01 00 |......J.........|
00000160: 06 01 10 00 01 00 ca 03 02 0d 08 cb c7 df 45 28 |..............E(|
00000170: d8 03 06 03 04 12 1e 0c 15 00 0c 4a 07 01 00 01 |...........J....|
00000180: 01 01 04 01 00 08 02 da 03 00 01 00 10 00 01 00 |................|
00000190: ca 03 02 0d 08 cb c7 d3 15 df 46 29 d8 03 06 06 |..........F)....|
000001a0: 04 0d 08 07 14 00 0c 42 07 01 00 00 01 00 04 02 |.......B........|
000001b0: 00 1c 01 10 00 01 00 cc 03 03 0d ce 03 04 0d 08 |................|
000001c0: cb c7 c7 df 2d 24 00 00 b8 9f 15 e0 1b 1e 2d 1d |....-$........-.|
000001d0: 24 01 00 0e 0e c7 df 2d 25 00 00 d8 03 0e 09 04 |$......-%.......|
000001e0: 0d 08 07 08 07 1c 20 10 44 1d 0c 15 00 0c 40 05 |...... .D.....@.|
000001f0: 01 00 00 01 00 02 01 00 0f 01 10 00 01 00 f0 01 |................|
00000200: 05 0d 08 cb 2b 68 00 00 11 ec 06 c7 1b 24 00 00 |....+h.......$..|
00000210: 29 d8 03 02 0d 00 00 0c 48 05 01 00 00 02 00 03 |).......H.......|
00000220: 01 00 0f 02 10 00 01 00 ea 01 00 01 00 ca 03 02 |................|
00000230: 5d 0c 04 cc 08 cb c7 c8 2e c7 68 00 00 b7 47 29 |].........h...G)|
00000240: d8 03 02 00 00 00                               |......|
```