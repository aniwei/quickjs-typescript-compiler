# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/closure-stress.ts
**生成时间**: 2025-12-16T14:11:02.458Z

## 大小对比

- TypeScript编译器: 812 字节
- WASM编译器: 446 字节
- 差异: 366 字节 (82.06%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 15,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "stress",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-stress.js",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l0",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l1",
      "offset": 49
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l2",
      "offset": 52
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l3",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l4",
      "offset": 58
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 61
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 64
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 67
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 70
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 73
    },
    {
      "index": 12,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 76
    },
    {
      "index": 13,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 82
    },
    {
      "index": 14,
      "rawLength": 0,
      "actualLength": 0,
      "isWideChar": 0,
      "string": "",
      "offset": 83
    }
  ],
  "functionHeader": {
    "offset": 84,
    "tag": "0xc",
    "remaining": 728
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
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "stress",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/closure-stress.js",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l0",
      "offset": 46
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l1",
      "offset": 49
    },
    {
      "index": 4,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l2",
      "offset": 52
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l3",
      "offset": 55
    },
    {
      "index": 6,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "l4",
      "offset": 58
    },
    {
      "index": 7,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v0",
      "offset": 61
    },
    {
      "index": 8,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v1",
      "offset": 64
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v2",
      "offset": 67
    },
    {
      "index": 10,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v3",
      "offset": 70
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "v4",
      "offset": 73
    },
    {
      "index": 12,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 76
    }
  ],
  "functionHeader": {
    "offset": 82,
    "tag": "0xc",
    "remaining": 364
  }
}
```

## 字节级差异

共发现 682 个字节差异:

- 偏移量 0x1: TS=0x0f vs WASM=0x0d
- 偏移量 0x52: TS=0x00 vs WASM=0x0c
- 偏移量 0x54: TS=0x0c vs WASM=0x06
- 偏移量 0x56: TS=0x06 vs WASM=0xa4
- 偏移量 0x57: TS=0x00 vs WASM=0x01
- 偏移量 0x58: TS=0xa4 vs WASM=0x00
- 偏移量 0x5e: TS=0x00 vs WASM=0x16
- 偏移量 0x60: TS=0x1e vs WASM=0xa6
- 偏移量 0x62: TS=0xa6 vs WASM=0x00
- 偏移量 0x63: TS=0x01 vs WASM=0x00
- 偏移量 0x65: TS=0x00 vs WASM=0x40
- 偏移量 0x66: TS=0x00 vs WASM=0xe4
- 偏移量 0x67: TS=0xc2 vs WASM=0x00
- 偏移量 0x69: TS=0x41 vs WASM=0x00
- 偏移量 0x6a: TS=0xe4 vs WASM=0x40
- 偏移量 0x6b: TS=0x00 vs WASM=0xc2
- 偏移量 0x6d: TS=0x00 vs WASM=0x41
- 偏移量 0x6e: TS=0x00 vs WASM=0xe4
- 偏移量 0x6f: TS=0xc2 vs WASM=0x00
- 偏移量 0x71: TS=0x3b vs WASM=0x00
- ... (显示前20个差异，总共682个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 0f 0c 73 74 72 65 73 73 48 5f 5f 74 65 73 74 |...stressH__test|
00000010: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f |s__/fixtures/clo|
00000020: 73 75 72 65 2d 73 74 72 65 73 73 2e 6a 73 04 6c |sure-stress.js.l|
00000030: 30 04 6c 31 04 6c 32 04 6c 33 04 6c 34 04 76 30 |0.l1.l2.l3.l4.v0|
00000040: 04 76 31 04 76 32 04 76 33 04 76 34 0a 69 6e 6e |.v1.v2.v3.v4.inn|
00000050: 65 72 00 00 0c 00 06 00 a4 01 00 01 00 01 00 01 |er..............|
00000060: 1e 01 a6 01 00 00 00 c2 00 41 e4 00 00 00 00 c2 |.........A......|
00000070: 00 3b e4 00 00 00 c2 00 3b e4 00 00 00 39 e4 00 |.;......;....9..|
00000080: 00 00 f0 cf 28 ca 03 06 00 00 00 16 36 00 00 0c |....(.......6...|
00000090: 43 06 00 c8 03 00 0b 00 00 00 01 86 02 0b cc 03 |C...............|
000000a0: 01 00 20 ce 03 01 01 20 d0 03 01 02 20 d2 03 01 |.. .... .... ...|
000000b0: 03 20 d4 03 01 04 20 d6 03 00 00 00 d8 03 00 06 |. .... .........|
000000c0: 00 da 03 00 07 00 dc 03 00 08 00 de 03 00 09 00 |................|
000000d0: e0 03 00 0a 00 b6 01 00 c8 21 00 00 00 01 00 00 |.........!......|
000000e0: 00 00 c8 1c 00 00 00 bf e6 00 00 00 01 00 c8 31 |...............1|
000000f0: 00 00 00 01 01 00 00 00 c8 2c 00 00 00 bf e7 00 |.........,......|
00000100: 00 00 01 00 c8 41 00 00 00 01 02 00 00 00 c8 3c |.....A.........<|
00000110: 00 00 00 bf e8 00 00 00 01 00 c8 51 00 00 00 01 |...........Q....|
00000120: 03 00 00 00 c8 4c 00 00 00 bf e9 00 00 00 01 00 |.....L..........|
00000130: c8 61 00 00 00 01 04 00 00 00 c8 5c 00 00 00 bf |.a.........\....|
00000140: ea 00 00 00 01 00 c8 71 00 00 00 01 0a 00 00 00 |.......q........|
00000150: c8 6c 00 00 00 bb eb 00 00 00 01 00 c8 82 00 00 |.l..............|
00000160: 00 01 0b 00 00 00 c8 7d 00 00 00 bb ec 00 00 00 |.......}........|
00000170: 01 00 c8 93 00 00 00 01 0c 00 00 00 c8 8e 00 00 |................|
00000180: 00 bb ed 00 00 00 01 00 c8 a4 00 00 00 01 0d 00 |................|
00000190: 00 00 c8 9f 00 00 00 bb ee 00 00 00 01 00 c8 b5 |................|
000001a0: 00 00 00 01 0e 00 00 00 c8 b0 00 00 00 bb ef 00 |................|
000001b0: 00 00 01 00 c8 bd 00 00 00 03 00 00 00 00 bf f0 |................|
000001c0: 00 00 00 01 00 c8 16 02 00 00 c8 16 02 00 00 ba |................|
000001d0: f0 00 00 00 01 00 22 00 00 0e 29 ca 03 00 00 0c |......"...).....|
000001e0: 43 06 00 e0 03 00 00 00 00 00 00 ba 02 00 b6 01 |C...............|
000001f0: 00 c8 1e 01 00 00 c8 1e 01 00 00 bd e6 00 00 00 |................|
00000200: 00 00 00 00 01 00 3d 93 b8 00 00 00 00 19 3e 0e |......=.......>.|
00000210: c8 2c 01 00 00 c8 2c 01 00 00 bd e7 00 00 00 01 |.,....,.........|
00000220: 00 00 00 01 00 3d 93 b8 01 00 00 00 19 3e 0e c8 |.....=.......>..|
00000230: 3a 01 00 00 c8 3a 01 00 00 bd e8 00 00 00 02 00 |:....:..........|
00000240: 00 00 01 00 3d 93 b8 02 00 00 00 19 3e 0e c8 48 |....=.......>..H|
00000250: 01 00 00 c8 48 01 00 00 bd e9 00 00 00 03 00 00 |....H...........|
00000260: 00 01 00 3d 93 b8 03 00 00 00 19 3e 0e c8 56 01 |...=.......>..V.|
00000270: 00 00 c8 56 01 00 00 bd ea 00 00 00 04 f1 00 00 |...V............|
00000280: 00 00 3d 93 b8 04 f2 00 00 00 3e 0e c8 ce 01 00 |..=.......>.....|
00000290: 00 c8 ce 01 00 00 bd eb 00 00 00 05 f1 00 00 00 |................|
000002a0: 00 3d 93 b8 05 f2 00 00 00 3e 0e c8 dc 01 00 00 |.=.......>......|
000002b0: c8 dc 01 00 00 bd ec 00 00 00 06 00 00 00 01 00 |................|
000002c0: 3d 93 b8 06 00 00 00 19 3e 0e c8 ea 01 00 00 c8 |=.......>.......|
000002d0: ea 01 00 00 bd ed 00 00 00 07 00 00 00 01 00 3d |...............=|
000002e0: 93 b8 07 00 00 00 19 3e 0e c8 f8 01 00 00 c8 f8 |.......>........|
000002f0: 01 00 00 bd ee 00 00 00 08 00 00 00 01 00 3d 93 |..............=.|
00000300: b8 08 00 00 00 19 3e 0e c8 06 02 00 00 c8 06 02 |......>.........|
00000310: 00 00 bd ef 00 00 00 09 00 00 00 01 00 3d 93 b8 |.............=..|
00000320: 09 00 00 00 19 3e 0e 29 ca 03 00 00             |.....>.)....|
```

### WASM
```
00000000: 05 0d 0c 73 74 72 65 73 73 48 5f 5f 74 65 73 74 |...stressH__test|
00000010: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6c 6f |s__/fixtures/clo|
00000020: 73 75 72 65 2d 73 74 72 65 73 73 2e 6a 73 04 6c |sure-stress.js.l|
00000030: 30 04 6c 31 04 6c 32 04 6c 33 04 6c 34 04 76 30 |0.l1.l2.l3.l4.v0|
00000040: 04 76 31 04 76 32 04 76 33 04 76 34 0a 69 6e 6e |.v1.v2.v3.v4.inn|
00000050: 65 72 0c 00 06 00 a4 01 00 01 00 01 00 01 16 01 |er..............|
00000060: a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 e4 00 |.....@....@..A..|
00000070: 00 00 00 39 e4 00 00 00 f0 cf 28 ca 03 08 00 00 |...9......(.....|
00000080: 00 0e 36 00 1b 0c 00 0c 43 06 00 c8 03 00 0b 00 |..6.....C.......|
00000090: 01 00 01 36 0b cc 03 01 00 60 ce 03 01 01 60 d0 |...6.....`....`.|
000000a0: 03 01 02 60 d2 03 01 03 60 d4 03 01 04 60 d6 03 |...`....`....`..|
000000b0: 00 00 40 d8 03 00 06 40 da 03 00 07 40 dc 03 00 |..@....@....@...|
000000c0: 08 40 de 03 00 09 40 e0 03 00 0a 00 c2 00 c5 0a |.@....@.........|
000000d0: 63 04 00 63 03 00 63 02 00 63 01 00 63 00 00 b7 |c..c..c..c..c...|
000000e0: cb b8 cc b9 cd ba ce bb c5 04 bf 0a c5 05 bf 0b |................|
000000f0: c5 06 bf 0c c5 07 bf 0d c5 08 bf 0e c5 09 c4 0a |................|
00000100: f0 29 ca 03 08 00 00 00 32 32 08 0c 0a 00 0c 43 |.)......22.....C|
00000110: 06 00 e0 03 00 00 00 02 0a 00 4c 00 cc 03 00 09 |..........L.....|
00000120: ce 03 01 09 d0 03 02 09 d2 03 03 09 d4 03 04 09 |................|
00000130: d6 03 05 01 d8 03 06 01 da 03 07 01 dc 03 08 01 |................|
00000140: de 03 09 01 68 00 00 93 69 00 00 0e 68 01 00 93 |....h...i...h...|
00000150: 69 01 00 0e 68 02 00 93 69 02 00 0e 68 03 00 93 |i...h...i...h...|
00000160: 69 03 00 0e 68 04 00 93 69 04 00 0e 60 05 00 91 |i...h...i...`...|
00000170: 61 05 00 60 06 00 91 61 06 00 60 07 00 91 61 07 |a..`...a..`...a.|
00000180: 00 60 08 00 91 61 08 00 60 09 00 91 61 09 00 29 |.`...a..`...a..)|
00000190: ca 03 2a 0b 04 04 08 11 04 1c 03 11 04 1c 03 11 |..*.............|
000001a0: 04 1c 03 11 04 1c 03 11 04 1d 03 11 04 17 03 11 |................|
000001b0: 04 17 03 11 04 17 03 11 04 17 03 11 04 00       |..............|
```