# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/test_worker_module.ts
**生成时间**: 2026-01-07T17:56:53.493Z

## 大小对比

- TypeScript编译器: 522 字节
- WASM编译器: 522 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_worker_module.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "parent",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "handle_msg",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "worker_main",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Worker",
      "offset": 84
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 91
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 93
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 96
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 101
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 106
    },
    {
      "index": 11,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 112
    },
    {
      "index": 12,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 124
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 134
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 138
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 142
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 151
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "num",
      "offset": 153
    }
  ],
  "functionHeader": {
    "offset": 157,
    "tag": "0xd",
    "remaining": 365
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
      "rawLength": 96,
      "actualLength": 48,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_worker_module.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 51
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "parent",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "handle_msg",
      "offset": 61
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "worker_main",
      "offset": 72
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Worker",
      "offset": 84
    },
    {
      "index": 6,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 91
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 93
    },
    {
      "index": 8,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 96
    },
    {
      "index": 9,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 101
    },
    {
      "index": 10,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 106
    },
    {
      "index": 11,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 112
    },
    {
      "index": 12,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 124
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 134
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 138
    },
    {
      "index": 15,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 142
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 151
    },
    {
      "index": 17,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "num",
      "offset": 153
    }
  ],
  "functionHeader": {
    "offset": 157,
    "tag": "0xd",
    "remaining": 365
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 12 60 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..`__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 |tures_quickjs/te|
00000020: 73 74 5f 77 6f 72 6b 65 72 5f 6d 6f 64 75 6c 65 |st_worker_module|
00000030: 2e 6a 73 04 6f 73 0c 70 61 72 65 6e 74 14 68 61 |.js.os.parent.ha|
00000040: 6e 64 6c 65 5f 6d 73 67 16 77 6f 72 6b 65 72 5f |ndle_msg.worker_|
00000050: 6d 61 69 6e 0c 57 6f 72 6b 65 72 02 65 04 65 76 |main.Worker.e.ev|
00000060: 08 64 61 74 61 08 74 79 70 65 0a 61 62 6f 72 74 |.data.type.abort|
00000070: 16 70 6f 73 74 4d 65 73 73 61 67 65 12 6f 6e 6d |.postMessage.onm|
00000080: 65 73 73 61 67 65 06 73 61 62 06 62 75 66 10 73 |essage.sab.buf.s|
00000090: 61 62 5f 64 6f 6e 65 02 69 06 6e 75 6d 0d c8 03 |ab_done.i.num...|
000000a0: 01 ca 03 02 00 00 01 00 01 fe 01 00 00 0c 20 06 |.............. .|
000000b0: 01 a4 01 00 00 00 01 04 02 1d 00 ca 03 00 0d cc |................|
000000c0: 03 00 01 ce 03 01 01 d0 03 02 01 08 ec 08 c2 00 |................|
000000d0: e5 c2 01 e6 29 68 00 00 42 e9 00 00 00 42 e6 00 |....)h..B....B..|
000000e0: 00 00 e4 e2 f0 0e 06 2f c8 03 0e 00 00 35 1a 11 |......./.....5..|
000000f0: 04 1b 0e 00 06 2e 2b 07 16 00 0c 43 06 01 ce 03 |......+....C....|
00000100: 01 01 01 05 01 00 66 02 d4 03 00 01 00 d6 03 00 |......f.........|
00000110: 00 00 cc 03 01 00 d3 42 ec 00 00 00 cf 42 ed 00 |.......B.....B..|
00000120: 00 00 11 04 ee 00 00 00 ad ec 1e df 43 ef 00 00 |............C...|
00000130: 00 0b 04 6b 00 00 00 4e ed 00 00 00 24 01 00 0e |...k...N....$...|
00000140: df 07 44 f0 00 00 00 29 11 04 f1 00 00 00 ad ec |..D....)........|
00000150: 2b c7 42 f2 00 00 00 b9 bf 0a 4b df 43 ef 00 00 |+.B.......K.C...|
00000160: 00 0b 04 f3 00 00 00 4e ed 00 00 00 c7 42 f2 00 |.......N.....B..|
00000170: 00 00 4e f2 00 00 00 24 01 00 0e 29 c8 03 26 02 |..N....$...)..&.|
00000180: 00 03 1a 07 02 1d 03 07 04 4a 03 07 0c 52 18 17 |.........J...R..|
00000190: 23 07 0c 00 10 08 0b 07 04 20 08 12 0b 07 0c 52 |#........ .....R|
000001a0: 4c 07 04 34 37 00 0c 43 06 01 d0 03 00 01 00 04 |L..47..C........|
000001b0: 02 00 2f 01 e8 03 00 00 00 cc 03 01 00 ce 03 02 |../.............|
000001c0: 00 df e0 44 f0 00 00 00 b7 cb c7 bf 0a a5 ec 20 |...D........... |
000001d0: df 43 ef 00 00 00 0b 04 f5 00 00 00 4e ed 00 00 |.C..........N...|
000001e0: 00 c7 4e f5 00 00 00 24 01 00 0e 95 00 ee dc 29 |..N....$.......)|
000001f0: c8 03 16 11 00 04 08 07 26 21 1b 0c 0e 11 04 12 |........&!......|
00000200: 13 07 0c 52 42 20 29 15 01 00                   |...RB )...|
```

### WASM
```
00000000: 05 12 60 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..`__tests__/fix|
00000010: 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 74 65 |tures_quickjs/te|
00000020: 73 74 5f 77 6f 72 6b 65 72 5f 6d 6f 64 75 6c 65 |st_worker_module|
00000030: 2e 6a 73 04 6f 73 0c 70 61 72 65 6e 74 14 68 61 |.js.os.parent.ha|
00000040: 6e 64 6c 65 5f 6d 73 67 16 77 6f 72 6b 65 72 5f |ndle_msg.worker_|
00000050: 6d 61 69 6e 0c 57 6f 72 6b 65 72 02 65 04 65 76 |main.Worker.e.ev|
00000060: 08 64 61 74 61 08 74 79 70 65 0a 61 62 6f 72 74 |.data.type.abort|
00000070: 16 70 6f 73 74 4d 65 73 73 61 67 65 12 6f 6e 6d |.postMessage.onm|
00000080: 65 73 73 61 67 65 06 73 61 62 06 62 75 66 10 73 |essage.sab.buf.s|
00000090: 61 62 5f 64 6f 6e 65 02 69 06 6e 75 6d 0d c8 03 |ab_done.i.num...|
000000a0: 01 ca 03 02 00 00 01 00 01 fe 01 00 00 0c 20 06 |.............. .|
000000b0: 01 a4 01 00 00 00 01 04 02 1d 00 ca 03 00 0d cc |................|
000000c0: 03 00 01 ce 03 01 01 d0 03 02 01 08 ec 08 c2 00 |................|
000000d0: e5 c2 01 e6 29 68 00 00 42 e9 00 00 00 42 e6 00 |....)h..B....B..|
000000e0: 00 00 e4 e2 f0 0e 06 2f c8 03 0e 00 00 35 1a 11 |......./.....5..|
000000f0: 04 1b 0e 00 06 2e 2b 07 16 00 0c 43 06 01 ce 03 |......+....C....|
00000100: 01 01 01 05 01 00 66 02 d4 03 00 01 00 d6 03 00 |......f.........|
00000110: 00 00 cc 03 01 00 d3 42 ec 00 00 00 cf 42 ed 00 |.......B.....B..|
00000120: 00 00 11 04 ee 00 00 00 ad ec 1e df 43 ef 00 00 |............C...|
00000130: 00 0b 04 6b 00 00 00 4e ed 00 00 00 24 01 00 0e |...k...N....$...|
00000140: df 07 44 f0 00 00 00 29 11 04 f1 00 00 00 ad ec |..D....)........|
00000150: 2b c7 42 f2 00 00 00 b9 bf 0a 4b df 43 ef 00 00 |+.B.......K.C...|
00000160: 00 0b 04 f3 00 00 00 4e ed 00 00 00 c7 42 f2 00 |.......N.....B..|
00000170: 00 00 4e f2 00 00 00 24 01 00 0e 29 c8 03 26 02 |..N....$...)..&.|
00000180: 00 03 1a 07 02 1d 03 07 04 4a 03 07 0c 52 18 17 |.........J...R..|
00000190: 23 07 0c 00 10 08 0b 07 04 20 08 12 0b 07 0c 52 |#........ .....R|
000001a0: 4c 07 04 34 37 00 0c 43 06 01 d0 03 00 01 00 04 |L..47..C........|
000001b0: 02 00 2f 01 e8 03 00 00 00 cc 03 01 00 ce 03 02 |../.............|
000001c0: 00 df e0 44 f0 00 00 00 b7 cb c7 bf 0a a5 ec 20 |...D........... |
000001d0: df 43 ef 00 00 00 0b 04 f5 00 00 00 4e ed 00 00 |.C..........N...|
000001e0: 00 c7 4e f5 00 00 00 24 01 00 0e 95 00 ee dc 29 |..N....$.......)|
000001f0: c8 03 16 11 00 04 08 07 26 21 1b 0c 0e 11 04 12 |........&!......|
00000200: 13 07 0c 52 42 20 29 15 01 00                   |...RB )...|
```