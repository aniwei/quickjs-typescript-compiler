# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/quickjs-tests/test_worker.ts
**生成时间**: 2026-01-01T10:02:31.167Z

## 大小对比

- TypeScript编译器: 927 字节
- WASM编译器: 927 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 26,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_worker.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "worker",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_worker",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 79
    },
    {
      "index": 6,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 86
    },
    {
      "index": 7,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 95
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 119
    },
    {
      "index": 9,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 121
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 134
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 137
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 139
    },
    {
      "index": 13,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Worker",
      "offset": 147
    },
    {
      "index": 14,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "./test_worker_module.js",
      "offset": 154
    },
    {
      "index": 15,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 178
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 188
    },
    {
      "index": 17,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 190
    },
    {
      "index": 18,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 193
    },
    {
      "index": 19,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 197
    },
    {
      "index": 20,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 201
    },
    {
      "index": 21,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 206
    },
    {
      "index": 22,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "num",
      "offset": 211
    },
    {
      "index": 23,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 215
    },
    {
      "index": 24,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 227
    },
    {
      "index": 25,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 236
    }
  ],
  "functionHeader": {
    "offset": 242,
    "tag": "0xd",
    "remaining": 685
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 26,
  "atoms": [
    {
      "index": 0,
      "rawLength": 94,
      "actualLength": 47,
      "isWideChar": 0,
      "string": "__tests__/fixtures/quickjs-tests/test_worker.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "os",
      "offset": 50
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "worker",
      "offset": 60
    },
    {
      "index": 4,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "test_worker",
      "offset": 67
    },
    {
      "index": 5,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 79
    },
    {
      "index": 6,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 86
    },
    {
      "index": 7,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 95
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 119
    },
    {
      "index": 9,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 121
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 134
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 137
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "counter",
      "offset": 139
    },
    {
      "index": 13,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Worker",
      "offset": 147
    },
    {
      "index": 14,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "./test_worker_module.js",
      "offset": 154
    },
    {
      "index": 15,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "onmessage",
      "offset": 178
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 188
    },
    {
      "index": 17,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ev",
      "offset": 190
    },
    {
      "index": 18,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sab",
      "offset": 193
    },
    {
      "index": 19,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "buf",
      "offset": 197
    },
    {
      "index": 20,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 201
    },
    {
      "index": 21,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "type",
      "offset": 206
    },
    {
      "index": 22,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "num",
      "offset": 211
    },
    {
      "index": 23,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "postMessage",
      "offset": 215
    },
    {
      "index": 24,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "sab_done",
      "offset": 227
    },
    {
      "index": 25,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "abort",
      "offset": 236
    }
  ],
  "functionHeader": {
    "offset": 242,
    "tag": "0xd",
    "remaining": 685
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 1a 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..^__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 74 65 73 74 5f 77 6f 72 6b 65 72 2e |sts/test_worker.|
00000030: 6a 73 04 6f 73 0c 61 73 73 65 72 74 0c 77 6f 72 |js.os.assert.wor|
00000040: 6b 65 72 16 74 65 73 74 5f 77 6f 72 6b 65 72 0c |ker.test_worker.|
00000050: 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 64 2e |actual.expected.|
00000060: 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 |assertion failed|
00000070: 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 |: got |.|., expe|
00000080: 63 74 65 64 20 7c 04 20 28 02 29 0e 63 6f 75 6e |cted |. (.).coun|
00000090: 74 65 72 0c 57 6f 72 6b 65 72 2e 2e 2f 74 65 73 |ter.Worker../tes|
000000a0: 74 5f 77 6f 72 6b 65 72 5f 6d 6f 64 75 6c 65 2e |t_worker_module.|
000000b0: 6a 73 12 6f 6e 6d 65 73 73 61 67 65 02 65 04 65 |js.onmessage.e.e|
000000c0: 76 06 73 61 62 06 62 75 66 08 64 61 74 61 08 74 |v.sab.buf.data.t|
000000d0: 79 70 65 06 6e 75 6d 16 70 6f 73 74 4d 65 73 73 |ype.num.postMess|
000000e0: 61 67 65 10 73 61 62 5f 64 6f 6e 65 0a 61 62 6f |age.sab_done.abo|
000000f0: 72 74 0d c8 03 01 ca 03 02 00 00 01 00 01 fe 01 |rt..............|
00000100: 00 00 0c 20 06 01 a4 01 00 00 00 01 04 02 0f 00 |... ............|
00000110: ca 03 00 0d cc 03 00 01 ce 03 01 01 d0 03 02 01 |................|
00000120: 08 ec 08 c2 00 e4 c2 01 e6 29 e2 f0 0e 06 2f c8 |.........)..../.|
00000130: 03 08 00 00 00 0a 60 00 07 16 00 0c 43 06 01 cc |......`.....C...|
00000140: 03 03 01 03 04 00 00 79 04 d2 03 00 01 00 d4 03 |.......y........|
00000150: 00 01 00 68 00 01 00 9e 01 00 01 00 0c 00 cb c7 |...h............|
00000160: eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed |............)...|
00000170: 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 |/...+...K.....!.|
00000180: 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 |..K.......C9...$|
00000190: 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 |...C9...$.....)9|
000001a0: 9f 00 00 00 04 eb 00 00 00 d3 9f 04 ec 00 00 00 |................|
000001b0: 9f 04 ed 00 00 00 9f d4 9f 04 ec 00 00 00 9f d5 |................|
000001c0: ec 10 04 ee 00 00 00 d5 9f 04 ef 00 00 00 9f ee |................|
000001d0: 02 c3 9f f1 30 c8 03 50 01 00 12 10 07 12 0c 10 |....0..P........|
000001e0: 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 18 |.!..............|
000001f0: 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 |...#../,..0Y....|
00000200: 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 |.......).)..4D..|
00000210: 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 | . ..?.. ..1*"..|
00000220: 20 14 15 0c 06 31 07 15 00 0c 43 06 01 d0 03 00 | ....1....C.....|
00000230: 01 00 03 03 01 1d 01 e0 03 00 00 40 cc 03 01 00 |...........@....|
00000240: ce 03 02 00 ca 03 00 0c 68 02 00 42 f1 00 00 00 |........h..B....|
00000250: 11 04 f2 00 00 00 21 01 00 e4 b7 cb e0 c2 00 44 |......!........D|
00000260: f3 00 00 00 29 c8 03 0e 0f 00 04 22 11 04 39 0e |....)......"..9.|
00000270: 17 2b 0d 00 07 0c 00 0c 43 06 01 00 01 04 01 05 |.+......C.......|
00000280: 03 00 ab 01 05 e8 03 00 01 00 ea 03 00 00 00 ec |................|
00000290: 03 04 00 20 ee 03 04 02 20 ee 03 05 00 20 cc 03 |... .... .... ..|
000002a0: 00 00 e0 03 00 01 ce 03 01 00 d3 42 f8 00 00 00 |...........B....|
000002b0: cf 42 f9 00 00 00 11 04 fa 00 00 00 ad ec 53 df |.B............S.|
000002c0: c7 42 fa 00 00 00 e0 f2 0e e0 91 e8 bf 0a ab 6c |.B.............l|
000002d0: 84 00 00 00 63 02 00 63 01 00 39 ad 00 00 00 11 |....c..c..9.....|
000002e0: bf 0a 21 01 00 cc 39 b0 00 00 00 11 64 01 00 21 |..!...9.....d..!|
000002f0: 01 00 cd e1 43 fb 00 00 00 0b 04 f6 00 00 00 4e |....C..........N|
00000300: f9 00 00 00 64 02 00 4e f7 00 00 00 24 01 00 0e |....d..N....$...|
00000310: 29 11 04 fc 00 00 00 ad ec 2b 63 03 00 c7 42 f7 |)........+c...B.|
00000320: 00 00 00 ce df 64 03 00 b9 48 bf 0a f2 0e e1 43 |.....d...H.....C|
00000330: fb 00 00 00 0b 04 fd 00 00 00 4e f9 00 00 00 24 |..........N....$|
00000340: 01 00 0e 29 11 04 6b 00 00 00 ad ec 08 e1 07 44 |...)..k........D|
00000350: f3 00 00 00 29 c8 03 46 13 17 03 0b 07 02 1d 03 |....)..F........|
00000360: 07 04 4a 03 07 0e 07 04 1b 0c 07 11 0d 0b 08 08 |..J.............|
00000370: 16 10 40 0c 2a 22 17 21 20 16 11 01 17 2f 07 0c |..@.*".! ..../..|
00000380: 52 42 2a 29 00 11 0a 0f 07 04 22 17 07 0e 16 06 |RB*)......".....|
00000390: 11 07 0d 0b 07 0c 52 18 00 0e 0a 2b 07 0c 00    |......R....+...|
```

### WASM
```
00000000: 05 1a 5e 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..^__tests__/fix|
00000010: 74 75 72 65 73 2f 71 75 69 63 6b 6a 73 2d 74 65 |tures/quickjs-te|
00000020: 73 74 73 2f 74 65 73 74 5f 77 6f 72 6b 65 72 2e |sts/test_worker.|
00000030: 6a 73 04 6f 73 0c 61 73 73 65 72 74 0c 77 6f 72 |js.os.assert.wor|
00000040: 6b 65 72 16 74 65 73 74 5f 77 6f 72 6b 65 72 0c |ker.test_worker.|
00000050: 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 64 2e |actual.expected.|
00000060: 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 |assertion failed|
00000070: 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 |: got |.|., expe|
00000080: 63 74 65 64 20 7c 04 20 28 02 29 0e 63 6f 75 6e |cted |. (.).coun|
00000090: 74 65 72 0c 57 6f 72 6b 65 72 2e 2e 2f 74 65 73 |ter.Worker../tes|
000000a0: 74 5f 77 6f 72 6b 65 72 5f 6d 6f 64 75 6c 65 2e |t_worker_module.|
000000b0: 6a 73 12 6f 6e 6d 65 73 73 61 67 65 02 65 04 65 |js.onmessage.e.e|
000000c0: 76 06 73 61 62 06 62 75 66 08 64 61 74 61 08 74 |v.sab.buf.data.t|
000000d0: 79 70 65 06 6e 75 6d 16 70 6f 73 74 4d 65 73 73 |ype.num.postMess|
000000e0: 61 67 65 10 73 61 62 5f 64 6f 6e 65 0a 61 62 6f |age.sab_done.abo|
000000f0: 72 74 0d c8 03 01 ca 03 02 00 00 01 00 01 fe 01 |rt..............|
00000100: 00 00 0c 20 06 01 a4 01 00 00 00 01 04 02 0f 00 |... ............|
00000110: ca 03 00 0d cc 03 00 01 ce 03 01 01 d0 03 02 01 |................|
00000120: 08 ec 08 c2 00 e4 c2 01 e6 29 e2 f0 0e 06 2f c8 |.........)..../.|
00000130: 03 08 00 00 00 0a 60 00 07 16 00 0c 43 06 01 cc |......`.....C...|
00000140: 03 03 01 03 04 00 00 79 04 d2 03 00 01 00 d4 03 |.......y........|
00000150: 00 01 00 68 00 01 00 9e 01 00 01 00 0c 00 cb c7 |...h............|
00000160: eb b8 ab ec 03 0a d8 d3 d4 ad ec 02 29 d3 f5 ed |............)...|
00000170: 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 d4 |/...+...K.....!.|
00000180: 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 24 |..K.......C9...$|
00000190: 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 39 |...C9...$.....)9|
000001a0: 9f 00 00 00 04 eb 00 00 00 d3 9f 04 ec 00 00 00 |................|
000001b0: 9f 04 ed 00 00 00 9f d4 9f 04 ec 00 00 00 9f d5 |................|
000001c0: ec 10 04 ee 00 00 00 d5 9f 04 ef 00 00 00 9f ee |................|
000001d0: 02 c3 9f f1 30 c8 03 50 01 00 12 10 07 12 0c 10 |....0..P........|
000001e0: 12 21 0d 00 07 16 07 07 12 0d 08 00 07 0e 11 18 |.!..............|
000001f0: 07 12 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 |...#../,..0Y....|
00000200: 11 0e 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 |.......).)..4D..|
00000210: 20 12 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 | . ..?.. ..1*"..|
00000220: 20 14 15 0c 06 31 07 15 00 0c 43 06 01 d0 03 00 | ....1....C.....|
00000230: 01 00 03 03 01 1d 01 e0 03 00 00 40 cc 03 01 00 |...........@....|
00000240: ce 03 02 00 ca 03 00 0c 68 02 00 42 f1 00 00 00 |........h..B....|
00000250: 11 04 f2 00 00 00 21 01 00 e4 b7 cb e0 c2 00 44 |......!........D|
00000260: f3 00 00 00 29 c8 03 0e 0f 00 04 22 11 04 39 0e |....)......"..9.|
00000270: 17 2b 0d 00 07 0c 00 0c 43 06 01 00 01 04 01 05 |.+......C.......|
00000280: 03 00 ab 01 05 e8 03 00 01 00 ea 03 00 00 00 ec |................|
00000290: 03 04 00 20 ee 03 04 02 20 ee 03 05 00 20 cc 03 |... .... .... ..|
000002a0: 00 00 e0 03 00 01 ce 03 01 00 d3 42 f8 00 00 00 |...........B....|
000002b0: cf 42 f9 00 00 00 11 04 fa 00 00 00 ad ec 53 df |.B............S.|
000002c0: c7 42 fa 00 00 00 e0 f2 0e e0 91 e8 bf 0a ab 6c |.B.............l|
000002d0: 84 00 00 00 63 02 00 63 01 00 39 ad 00 00 00 11 |....c..c..9.....|
000002e0: bf 0a 21 01 00 cc 39 b0 00 00 00 11 64 01 00 21 |..!...9.....d..!|
000002f0: 01 00 cd e1 43 fb 00 00 00 0b 04 f6 00 00 00 4e |....C..........N|
00000300: f9 00 00 00 64 02 00 4e f7 00 00 00 24 01 00 0e |....d..N....$...|
00000310: 29 11 04 fc 00 00 00 ad ec 2b 63 03 00 c7 42 f7 |)........+c...B.|
00000320: 00 00 00 ce df 64 03 00 b9 48 bf 0a f2 0e e1 43 |.....d...H.....C|
00000330: fb 00 00 00 0b 04 fd 00 00 00 4e f9 00 00 00 24 |..........N....$|
00000340: 01 00 0e 29 11 04 6b 00 00 00 ad ec 08 e1 07 44 |...)..k........D|
00000350: f3 00 00 00 29 c8 03 46 13 17 03 0b 07 02 1d 03 |....)..F........|
00000360: 07 04 4a 03 07 0e 07 04 1b 0c 07 11 0d 0b 08 08 |..J.............|
00000370: 16 10 40 0c 2a 22 17 21 20 16 11 01 17 2f 07 0c |..@.*".! ..../..|
00000380: 52 42 2a 29 00 11 0a 0f 07 04 22 17 07 0e 16 06 |RB*)......".....|
00000390: 11 07 0d 0b 07 0c 52 18 00 0e 0a 2b 07 0c 00    |......R....+...|
```