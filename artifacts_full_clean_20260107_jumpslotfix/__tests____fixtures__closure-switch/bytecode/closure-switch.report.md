# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-switch.ts
**生成时间**: 2026-01-07T15:35:35.471Z

## 大小对比

- TypeScript编译器: 338 字节
- WASM编译器: 338 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 13,
  "atoms": [
    {
      "index": 0,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "handle_msg",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-switch.js",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 60
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 65
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "parent",
      "offset": 71
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 78
    },
    {
      "index": 9,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 90
    },
    {
      "index": 10,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 100
    },
    {
      "index": 11,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 104
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 108
    }
  ],
  "functionHeader": {
    "offset": 117,
    "tag": "0xc",
    "remaining": 221
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 13,
  "atoms": [
    {
      "index": 0,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "handle_msg",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-switch.js",
      "offset": 13
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 52
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 60
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 65
    },
    {
      "index": 7,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "parent",
      "offset": 71
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 78
    },
    {
      "index": 9,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 90
    },
    {
      "index": 10,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 100
    },
    {
      "index": 11,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 104
    },
    {
      "index": 12,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 108
    }
  ],
  "functionHeader": {
    "offset": 117,
    "tag": "0xc",
    "remaining": 221
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0d 14 68 61 6e 64 6c 65 5f 6d 73 67 48 5f 5f |...handle_msgH__|
00000010: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000020: 2f 63 6c 6f 73 75 72 65 2d 73 77 69 74 63 68 2e |/closure-switch.|
00000030: 6a 73 02 65 04 65 76 08 64 61 74 61 08 74 79 70 |js.e.ev.data.typ|
00000040: 65 0a 61 62 6f 72 74 0c 70 61 72 65 6e 74 16 70 |e.abort.parent.p|
00000050: 6f 73 74 4d 65 73 73 61 67 65 12 6f 6e 6d 65 73 |ostMessage.onmes|
00000060: 73 61 67 65 06 73 61 62 06 62 75 66 10 73 61 62 |sage.sab.buf.sab|
00000070: 5f 64 6f 6e 65 0c 00 06 00 a4 01 00 01 00 01 00 |_done...........|
00000080: 01 10 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 |........@....@..|
00000090: 41 e4 00 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 |A......(.......C|
000000a0: 06 00 c8 03 01 01 01 05 00 00 72 02 cc 03 00 01 |..........r.....|
000000b0: 00 ce 03 00 00 00 d3 42 e8 00 00 00 cf 42 e9 00 |.......B.....B..|
000000c0: 00 00 11 04 ea 00 00 00 ad ec 26 39 eb 00 00 00 |..........&9....|
000000d0: 43 ec 00 00 00 0b 04 6b 00 00 00 4e e9 00 00 00 |C......k...N....|
000000e0: 24 01 00 0e 39 eb 00 00 00 07 44 ed 00 00 00 29 |$...9.....D....)|
000000f0: 11 04 ee 00 00 00 ad ec 2f c7 42 ef 00 00 00 b9 |......../.B.....|
00000100: bf 0a 4b 39 eb 00 00 00 43 ec 00 00 00 0b 04 f0 |..K9....C.......|
00000110: 00 00 00 4e e9 00 00 00 c7 42 ef 00 00 00 4e ef |...N.....B....N.|
00000120: 00 00 00 24 01 00 0e 29 ca 03 26 00 00 03 1a 07 |...$...)..&.....|
00000130: 02 1d 03 07 04 4a 03 1b 0c 52 18 17 23 1b 0c 00 |.....J...R..#...|
00000140: 10 08 0b 07 04 20 08 12 0b 1b 0c 52 4c 07 04 34 |..... .....RL..4|
00000150: 37 00                                           |7.|
```

### WASM
```
00000000: 05 0d 14 68 61 6e 64 6c 65 5f 6d 73 67 48 5f 5f |...handle_msgH__|
00000010: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000020: 2f 63 6c 6f 73 75 72 65 2d 73 77 69 74 63 68 2e |/closure-switch.|
00000030: 6a 73 02 65 04 65 76 08 64 61 74 61 08 74 79 70 |js.e.ev.data.typ|
00000040: 65 0a 61 62 6f 72 74 0c 70 61 72 65 6e 74 16 70 |e.abort.parent.p|
00000050: 6f 73 74 4d 65 73 73 61 67 65 12 6f 6e 6d 65 73 |ostMessage.onmes|
00000060: 73 61 67 65 06 73 61 62 06 62 75 66 10 73 61 62 |sage.sab.buf.sab|
00000070: 5f 64 6f 6e 65 0c 00 06 00 a4 01 00 01 00 01 00 |_done...........|
00000080: 01 10 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 |........@....@..|
00000090: 41 e4 00 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 |A......(.......C|
000000a0: 06 00 c8 03 01 01 01 05 00 00 72 02 cc 03 00 01 |..........r.....|
000000b0: 00 ce 03 00 00 00 d3 42 e8 00 00 00 cf 42 e9 00 |.......B.....B..|
000000c0: 00 00 11 04 ea 00 00 00 ad ec 26 39 eb 00 00 00 |..........&9....|
000000d0: 43 ec 00 00 00 0b 04 6b 00 00 00 4e e9 00 00 00 |C......k...N....|
000000e0: 24 01 00 0e 39 eb 00 00 00 07 44 ed 00 00 00 29 |$...9.....D....)|
000000f0: 11 04 ee 00 00 00 ad ec 2f c7 42 ef 00 00 00 b9 |......../.B.....|
00000100: bf 0a 4b 39 eb 00 00 00 43 ec 00 00 00 0b 04 f0 |..K9....C.......|
00000110: 00 00 00 4e e9 00 00 00 c7 42 ef 00 00 00 4e ef |...N.....B....N.|
00000120: 00 00 00 24 01 00 0e 29 ca 03 26 00 00 03 1a 07 |...$...)..&.....|
00000130: 02 1d 03 07 04 4a 03 1b 0c 52 18 17 23 1b 0c 00 |.....J...R..#...|
00000140: 10 08 0b 07 04 20 08 12 0b 1b 0c 52 4c 07 04 34 |..... .....RL..4|
00000150: 37 00                                           |7.|
```