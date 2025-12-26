# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_worker_module.ts
**生成时间**: 2025-12-26T14:00:16.579Z

## 大小对比

- TypeScript编译器: 529 字节
- WASM编译器: 528 字节
- 差异: 1 字节 (0.19%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 18,
  "atoms": [
    {
      "index": 0,
      "rawLength": 108,
      "actualLength": 54,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_worker_module.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 57
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "parent",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "handle_msg",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "worker_main",
      "offset": 78
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Worker",
      "offset": 90
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 97
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 99
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 102
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 107
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 112
    },
    {
      "index": 11,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 118
    },
    {
      "index": 12,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 130
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 140
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 144
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 148
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 157
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "num",
      "offset": 159
    }
  ],
  "functionHeader": {
    "offset": 163,
    "tag": "0xd",
    "remaining": 366
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 18,
  "atoms": [
    {
      "index": 0,
      "rawLength": 108,
      "actualLength": 54,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_worker_module.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 57
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "parent",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "handle_msg",
      "offset": 67
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "worker_main",
      "offset": 78
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Worker",
      "offset": 90
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 97
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 99
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 102
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 107
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 112
    },
    {
      "index": 11,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 118
    },
    {
      "index": 12,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 130
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 140
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 144
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 148
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 157
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "num",
      "offset": 159
    }
  ],
  "functionHeader": {
    "offset": 163,
    "tag": "0xd",
    "remaining": 365
  }
}
```

## 字节级差异

共发现 109 个字节差异:

- 偏移量 0xc4: TS=0x0c vs WASM=0x0d
- 偏移量 0x184: TS=0x24 vs WASM=0x26
- 偏移量 0x19f: TS=0x30 vs WASM=0x20
- 偏移量 0x1a0: TS=0x03 vs WASM=0x08
- 偏移量 0x1a1: TS=0x07 vs WASM=0x12
- 偏移量 0x1a2: TS=0x0c vs WASM=0x0b
- 偏移量 0x1a3: TS=0x52 vs WASM=0x07
- 偏移量 0x1a4: TS=0x4c vs WASM=0x0c
- 偏移量 0x1a5: TS=0x07 vs WASM=0x52
- 偏移量 0x1a6: TS=0x04 vs WASM=0x4c
- 偏移量 0x1a7: TS=0x34 vs WASM=0x07
- 偏移量 0x1a8: TS=0x37 vs WASM=0x04
- 偏移量 0x1a9: TS=0x00 vs WASM=0x34
- 偏移量 0x1aa: TS=0x0c vs WASM=0x37
- 偏移量 0x1ab: TS=0x43 vs WASM=0x00
- 偏移量 0x1ac: TS=0x06 vs WASM=0x0c
- 偏移量 0x1ad: TS=0x01 vs WASM=0x43
- 偏移量 0x1ae: TS=0xd0 vs WASM=0x06
- 偏移量 0x1af: TS=0x03 vs WASM=0x01
- 偏移量 0x1b0: TS=0x00 vs WASM=0xd0
- ... (显示前20个差异，总共109个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 12 6c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..l__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 74 65 73 74 5f 77 6f 72 6b 65 72 5f |sts/test_worker_|
00000030: 6d 6f 64 75 6c 65 2e 6a 73 04 6f 73 0c 70 61 72 |module.js.os.par|
00000040: 65 6e 74 14 68 61 6e 64 6c 65 5f 6d 73 67 16 77 |ent.handle_msg.w|
00000050: 6f 72 6b 65 72 5f 6d 61 69 6e 0c 57 6f 72 6b 65 |orker_main.Worke|
00000060: 72 02 65 04 65 76 08 64 61 74 61 08 74 79 70 65 |r.e.ev.data.type|
00000070: 0a 61 62 6f 72 74 16 70 6f 73 74 4d 65 73 73 61 |.abort.postMessa|
00000080: 67 65 12 6f 6e 6d 65 73 73 61 67 65 06 73 61 62 |ge.onmessage.sab|
00000090: 06 62 75 66 10 73 61 62 5f 64 6f 6e 65 02 69 06 |.buf.sab_done.i.|
000000a0: 6e 75 6d 0d c8 03 01 ca 03 02 00 00 01 00 01 fe |num.............|
000000b0: 01 00 00 0c 20 06 01 a4 01 00 00 00 01 04 02 1d |.... ...........|
000000c0: 00 ca 03 00 0c cc 03 00 01 ce 03 01 01 d0 03 02 |................|
000000d0: 01 08 ec 08 c2 00 e5 c2 01 e6 29 68 00 00 42 e9 |..........)h..B.|
000000e0: 00 00 00 42 e6 00 00 00 e4 e2 f0 0e 06 2f c8 03 |...B........./..|
000000f0: 0e 00 00 35 1a 11 04 1b 0e 00 06 2e 2b 07 16 00 |...5........+...|
00000100: 0c 43 06 01 ce 03 01 01 01 05 01 00 66 02 d4 03 |.C..........f...|
00000110: 00 01 00 d6 03 00 00 00 cc 03 01 00 d3 42 ec 00 |.............B..|
00000120: 00 00 cf 42 ed 00 00 00 11 04 ee 00 00 00 ad ec |...B............|
00000130: 1e df 43 ef 00 00 00 0b 04 6b 00 00 00 4e ed 00 |..C......k...N..|
00000140: 00 00 24 01 00 0e df 07 44 f0 00 00 00 29 11 04 |..$.....D....)..|
00000150: f1 00 00 00 ad ec 2b c7 42 f2 00 00 00 b9 bf 0a |......+.B.......|
00000160: 4b df 43 ef 00 00 00 0b 04 f3 00 00 00 4e ed 00 |K.C..........N..|
00000170: 00 00 c7 42 f2 00 00 00 4e f2 00 00 00 24 01 00 |...B....N....$..|
00000180: 0e 29 c8 03 24 02 00 03 1a 07 02 1d 03 07 04 4a |.)..$..........J|
00000190: 03 07 0c 52 18 17 23 07 0c 00 10 08 0b 07 04 30 |...R..#........0|
000001a0: 03 07 0c 52 4c 07 04 34 37 00 0c 43 06 01 d0 03 |...RL..47..C....|
000001b0: 00 01 00 04 02 00 30 01 e8 03 00 00 00 cc 03 01 |......0.........|
000001c0: 00 ce 03 02 00 df e0 44 f0 00 00 00 b7 cb c7 bf |.......D........|
000001d0: 0a a5 ec 21 df 43 ef 00 00 00 0b 04 f5 00 00 00 |...!.C..........|
000001e0: 4e ed 00 00 00 c7 4e f5 00 00 00 24 01 00 0e c7 |N.....N....$....|
000001f0: 91 cb ee db 29 c8 03 18 11 00 04 08 07 26 21 1b |....)........&!.|
00000200: 0c 0e 11 04 12 13 07 0c 52 42 20 29 15 03 07 02 |........RB )....|
00000210: 00                                              |.|
```

### WASM
```
00000000: 05 12 6c 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..l__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 74 65 73 74 5f 77 6f 72 6b 65 72 5f |sts/test_worker_|
00000030: 6d 6f 64 75 6c 65 2e 6a 73 04 6f 73 0c 70 61 72 |module.js.os.par|
00000040: 65 6e 74 14 68 61 6e 64 6c 65 5f 6d 73 67 16 77 |ent.handle_msg.w|
00000050: 6f 72 6b 65 72 5f 6d 61 69 6e 0c 57 6f 72 6b 65 |orker_main.Worke|
00000060: 72 02 65 04 65 76 08 64 61 74 61 08 74 79 70 65 |r.e.ev.data.type|
00000070: 0a 61 62 6f 72 74 16 70 6f 73 74 4d 65 73 73 61 |.abort.postMessa|
00000080: 67 65 12 6f 6e 6d 65 73 73 61 67 65 06 73 61 62 |ge.onmessage.sab|
00000090: 06 62 75 66 10 73 61 62 5f 64 6f 6e 65 02 69 06 |.buf.sab_done.i.|
000000a0: 6e 75 6d 0d c8 03 01 ca 03 02 00 00 01 00 01 fe |num.............|
000000b0: 01 00 00 0c 20 06 01 a4 01 00 00 00 01 04 02 1d |.... ...........|
000000c0: 00 ca 03 00 0d cc 03 00 01 ce 03 01 01 d0 03 02 |................|
000000d0: 01 08 ec 08 c2 00 e5 c2 01 e6 29 68 00 00 42 e9 |..........)h..B.|
000000e0: 00 00 00 42 e6 00 00 00 e4 e2 f0 0e 06 2f c8 03 |...B........./..|
000000f0: 0e 00 00 35 1a 11 04 1b 0e 00 06 2e 2b 07 16 00 |...5........+...|
00000100: 0c 43 06 01 ce 03 01 01 01 05 01 00 66 02 d4 03 |.C..........f...|
00000110: 00 01 00 d6 03 00 00 00 cc 03 01 00 d3 42 ec 00 |.............B..|
00000120: 00 00 cf 42 ed 00 00 00 11 04 ee 00 00 00 ad ec |...B............|
00000130: 1e df 43 ef 00 00 00 0b 04 6b 00 00 00 4e ed 00 |..C......k...N..|
00000140: 00 00 24 01 00 0e df 07 44 f0 00 00 00 29 11 04 |..$.....D....)..|
00000150: f1 00 00 00 ad ec 2b c7 42 f2 00 00 00 b9 bf 0a |......+.B.......|
00000160: 4b df 43 ef 00 00 00 0b 04 f3 00 00 00 4e ed 00 |K.C..........N..|
00000170: 00 00 c7 42 f2 00 00 00 4e f2 00 00 00 24 01 00 |...B....N....$..|
00000180: 0e 29 c8 03 26 02 00 03 1a 07 02 1d 03 07 04 4a |.)..&..........J|
00000190: 03 07 0c 52 18 17 23 07 0c 00 10 08 0b 07 04 20 |...R..#........ |
000001a0: 08 12 0b 07 0c 52 4c 07 04 34 37 00 0c 43 06 01 |.....RL..47..C..|
000001b0: d0 03 00 01 00 04 02 00 2f 01 e8 03 00 00 00 cc |......../.......|
000001c0: 03 01 00 ce 03 02 00 df e0 44 f0 00 00 00 b7 cb |.........D......|
000001d0: c7 bf 0a a5 ec 20 df 43 ef 00 00 00 0b 04 f5 00 |..... .C........|
000001e0: 00 00 4e ed 00 00 00 c7 4e f5 00 00 00 24 01 00 |..N.....N....$..|
000001f0: 0e 95 00 ee dc 29 c8 03 16 11 00 04 08 07 26 21 |.....)........&!|
00000200: 1b 0c 0e 11 04 12 13 07 0c 52 42 20 29 15 01 00 |.........RB )...|
```