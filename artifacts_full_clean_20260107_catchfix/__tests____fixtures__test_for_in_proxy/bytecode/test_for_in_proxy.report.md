# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_for_in_proxy.ts
**生成时间**: 2026-01-07T09:39:07.516Z

## 大小对比

- TypeScript编译器: 873 字节
- WASM编译器: 873 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 22,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "test_for_in_proxy",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 29
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 42
    },
    {
      "index": 5,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_for_in_proxy.js",
      "offset": 57
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 97
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 104
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 113
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 137
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 139
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 152
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 155
    },
    {
      "index": 13,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "removed_key",
      "offset": 157
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 169
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 173
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 175
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 177
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 179
    },
    {
      "index": 19,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " a c",
      "offset": 181
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 186
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 188
    }
  ],
  "functionHeader": {
    "offset": 192,
    "tag": "0xc",
    "remaining": 681
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 22,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "test_for_in_proxy",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 29
    },
    {
      "index": 4,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 42
    },
    {
      "index": 5,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_for_in_proxy.js",
      "offset": 57
    },
    {
      "index": 6,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 97
    },
    {
      "index": 7,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 104
    },
    {
      "index": 8,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 113
    },
    {
      "index": 9,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 137
    },
    {
      "index": 10,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 139
    },
    {
      "index": 11,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 152
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 155
    },
    {
      "index": 13,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "removed_key",
      "offset": 157
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "str",
      "offset": 169
    },
    {
      "index": 15,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "o",
      "offset": 173
    },
    {
      "index": 16,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": " ",
      "offset": 175
    },
    {
      "index": 17,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 177
    },
    {
      "index": 18,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 179
    },
    {
      "index": 19,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": " a c",
      "offset": 181
    },
    {
      "index": 20,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 186
    },
    {
      "index": 21,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 188
    }
  ],
  "functionHeader": {
    "offset": 192,
    "tag": "0xc",
    "remaining": 681
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 16 02 65 0c 61 73 73 65 72 74 22 74 65 73 74 |...e.assert"test|
00000010: 5f 66 6f 72 5f 69 6e 5f 70 72 6f 78 79 18 5f 5f |_for_in_proxy.__|
00000020: 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f |loadScript.test_|
00000030: 61 73 73 65 72 74 2e 6a 73 4e 5f 5f 74 65 73 74 |assert.jsN__test|
00000040: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 73 |s__/fixtures/tes|
00000050: 74 5f 66 6f 72 5f 69 6e 5f 70 72 6f 78 79 2e 6a |t_for_in_proxy.j|
00000060: 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 |s.actual.expecte|
00000070: 64 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c |d.assertion fail|
00000080: 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 |ed: got |.|., ex|
00000090: 70 65 63 74 65 64 20 7c 04 20 28 02 29 16 72 65 |pected |. (.).re|
000000a0: 6d 6f 76 65 64 5f 6b 65 79 06 73 74 72 02 6f 02 |moved_key.str.o.|
000000b0: 20 02 61 02 62 08 20 61 20 63 02 63 06 6b 65 79 | .a.b. a c.c.key|
000000c0: 0c 00 06 00 a4 01 00 02 00 03 00 02 3e 02 a6 01 |............>...|
000000d0: 00 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 |........@....@@.|
000000e0: 00 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 e6 |...@..A.......A.|
000000f0: 00 00 00 00 06 cb 6f 13 00 00 00 39 e7 00 00 00 |......o....9....|
00000100: 04 e8 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 |...........o....|
00000110: 0e ee 02 30 c7 28 d2 03 08 00 00 00 23 24 08 34 |...0.(......#$.4|
00000120: 18 00 0c 43 06 00 ca 03 03 01 03 04 00 00 79 04 |...C..........y.|
00000130: d4 03 00 01 00 d6 03 00 01 00 68 00 01 00 9e 01 |..........h.....|
00000140: 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 d3 d4 |................|
00000150: ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b |...).../...+...K|
00000160: 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 |.....!...K......|
00000170: d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 |.C9...$...C9...$|
00000180: 00 00 ad ec 02 29 39 9f 00 00 00 04 ec 00 00 00 |.....)9.........|
00000190: d3 9f 04 ed 00 00 00 9f 04 ee 00 00 00 9f d4 9f |................|
000001a0: 04 ed 00 00 00 9f d5 ec 10 04 ef 00 00 00 d5 9f |................|
000001b0: 04 f0 00 00 00 9f ee 02 c3 9f f1 30 d2 03 50 03 |...........0..P.|
000001c0: 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 12 |........!.......|
000001d0: 0d 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 |..........#../,.|
000001e0: 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 |.0Y...........).|
000001f0: 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 |)..4D.. . ..?.. |
00000200: 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 |..1*".. ....1...|
00000210: 0c 43 06 00 cc 03 00 05 00 05 00 02 7f 05 e2 03 |.C..............|
00000220: 01 00 60 b0 01 01 01 20 8a 02 01 02 20 e4 03 01 |..`.... .... ...|
00000230: 03 20 e6 03 02 04 20 63 03 00 63 02 00 63 01 00 |. .... c..c..c..|
00000240: 63 00 00 c3 cb 0b cc 39 c6 00 00 00 11 64 01 00 |c......9.....d..|
00000250: 0b c2 00 4f 69 00 00 00 4e 69 00 00 00 c2 01 4f |...Oi...Ni.....O|
00000260: 68 00 00 00 4e 68 00 00 00 21 02 00 cd c3 ce 63 |h...Nh...!.....c|
00000270: 04 00 64 02 00 7e ee 2a c5 04 64 03 00 04 f4 00 |..d..~.*..d.....|
00000280: 00 00 64 04 00 9f 9f 11 65 03 00 0e 64 04 00 04 |..d.....e...d...|
00000290: f5 00 00 00 ab ec 0b 04 f6 00 00 00 11 65 00 00 |.............e..|
000002a0: 0e 81 ec d5 0e 0e 39 e5 00 00 00 64 03 00 04 f7 |......9....d....|
000002b0: 00 00 00 ab f1 29 d2 03 22 15 00 55 28 20 0c 8e |.....).."..U( ..|
000002c0: 01 00 09 18 0d 2b 13 2a 1a 11 03 07 0d 21 00 2a |.....+.*.....!.*|
000002d0: 04 12 03 4f 0f 1b 0e 2a 08 07 09 00 0c 43 06 00 |...O...*.....C..|
000002e0: 00 00 00 00 03 00 00 13 00 04 f5 00 00 00 04 f6 |................|
000002f0: 00 00 00 04 f8 00 00 00 26 03 00 28 d2 03 04 19 |........&..(....|
00000300: 11 5d 09 00 0c 43 06 00 00 02 01 02 03 01 00 2c |.]...C.........,|
00000310: 03 b0 01 00 01 00 f2 03 00 01 00 10 00 01 00 e2 |................|
00000320: 03 00 09 08 cb 68 00 00 c3 ac ec 0e d4 68 00 00 |.....h.......h..|
00000330: ab ec 07 39 47 00 00 00 28 0b 0a 4e 41 00 00 00 |...9G...(..NA...|
00000340: 0a 4e 3f 00 00 00 c7 d4 48 4e 42 00 00 00 28 d2 |.N?.....HNB...(.|
00000350: 03 16 1c 22 0d 23 16 18 11 12 07 0e 11 05 12 23 |...".#.........#|
00000360: 1b 0d 4f 76 07 01 20 73 00                      |..Ov.. s.|
```

### WASM
```
00000000: 05 16 02 65 0c 61 73 73 65 72 74 22 74 65 73 74 |...e.assert"test|
00000010: 5f 66 6f 72 5f 69 6e 5f 70 72 6f 78 79 18 5f 5f |_for_in_proxy.__|
00000020: 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 73 74 5f |loadScript.test_|
00000030: 61 73 73 65 72 74 2e 6a 73 4e 5f 5f 74 65 73 74 |assert.jsN__test|
00000040: 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f 74 65 73 |s__/fixtures/tes|
00000050: 74 5f 66 6f 72 5f 69 6e 5f 70 72 6f 78 79 2e 6a |t_for_in_proxy.j|
00000060: 73 0c 61 63 74 75 61 6c 10 65 78 70 65 63 74 65 |s.actual.expecte|
00000070: 64 2e 61 73 73 65 72 74 69 6f 6e 20 66 61 69 6c |d.assertion fail|
00000080: 65 64 3a 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 |ed: got |.|., ex|
00000090: 70 65 63 74 65 64 20 7c 04 20 28 02 29 16 72 65 |pected |. (.).re|
000000a0: 6d 6f 76 65 64 5f 6b 65 79 06 73 74 72 02 6f 02 |moved_key.str.o.|
000000b0: 20 02 61 02 62 08 20 61 20 63 02 63 06 6b 65 79 | .a.b. a c.c.key|
000000c0: 0c 00 06 00 a4 01 00 02 00 03 00 02 3e 02 a6 01 |............>...|
000000d0: 00 00 00 c8 03 03 00 03 40 e5 00 00 00 40 40 e6 |........@....@@.|
000000e0: 00 00 00 40 c2 00 41 e5 00 00 00 00 c2 01 41 e6 |...@..A.......A.|
000000f0: 00 00 00 00 06 cb 6f 13 00 00 00 39 e7 00 00 00 |......o....9....|
00000100: 04 e8 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 00 00 |...........o....|
00000110: 0e ee 02 30 c7 28 d2 03 08 00 00 00 23 24 08 34 |...0.(......#$.4|
00000120: 18 00 0c 43 06 00 ca 03 03 01 03 04 00 00 79 04 |...C..........y.|
00000130: d4 03 00 01 00 d6 03 00 01 00 68 00 01 00 9e 01 |..........h.....|
00000140: 00 01 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 d3 d4 |................|
00000150: ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 4b |...).../...+...K|
00000160: 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec 17 |.....!...K......|
00000170: d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 24 |.C9...$...C9...$|
00000180: 00 00 ad ec 02 29 39 9f 00 00 00 04 ec 00 00 00 |.....)9.........|
00000190: d3 9f 04 ed 00 00 00 9f 04 ee 00 00 00 9f d4 9f |................|
000001a0: 04 ed 00 00 00 9f d5 ec 10 04 ef 00 00 00 d5 9f |................|
000001b0: 04 f0 00 00 00 9f ee 02 c3 9f f1 30 d2 03 50 03 |...........0..P.|
000001c0: 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 12 |........!.......|
000001d0: 0d 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 |..........#../,.|
000001e0: 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 |.0Y...........).|
000001f0: 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 |)..4D.. . ..?.. |
00000200: 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 |..1*".. ....1...|
00000210: 0c 43 06 00 cc 03 00 05 00 05 00 02 7f 05 e2 03 |.C..............|
00000220: 01 00 60 b0 01 01 01 20 8a 02 01 02 20 e4 03 01 |..`.... .... ...|
00000230: 03 20 e6 03 02 04 20 63 03 00 63 02 00 63 01 00 |. .... c..c..c..|
00000240: 63 00 00 c3 cb 0b cc 39 c6 00 00 00 11 64 01 00 |c......9.....d..|
00000250: 0b c2 00 4f 69 00 00 00 4e 69 00 00 00 c2 01 4f |...Oi...Ni.....O|
00000260: 68 00 00 00 4e 68 00 00 00 21 02 00 cd c3 ce 63 |h...Nh...!.....c|
00000270: 04 00 64 02 00 7e ee 2a c5 04 64 03 00 04 f4 00 |..d..~.*..d.....|
00000280: 00 00 64 04 00 9f 9f 11 65 03 00 0e 64 04 00 04 |..d.....e...d...|
00000290: f5 00 00 00 ab ec 0b 04 f6 00 00 00 11 65 00 00 |.............e..|
000002a0: 0e 81 ec d5 0e 0e 39 e5 00 00 00 64 03 00 04 f7 |......9....d....|
000002b0: 00 00 00 ab f1 29 d2 03 22 15 00 55 28 20 0c 8e |.....).."..U( ..|
000002c0: 01 00 09 18 0d 2b 13 2a 1a 11 03 07 0d 21 00 2a |.....+.*.....!.*|
000002d0: 04 12 03 4f 0f 1b 0e 2a 08 07 09 00 0c 43 06 00 |...O...*.....C..|
000002e0: 00 00 00 00 03 00 00 13 00 04 f5 00 00 00 04 f6 |................|
000002f0: 00 00 00 04 f8 00 00 00 26 03 00 28 d2 03 04 19 |........&..(....|
00000300: 11 5d 09 00 0c 43 06 00 00 02 01 02 03 01 00 2c |.]...C.........,|
00000310: 03 b0 01 00 01 00 f2 03 00 01 00 10 00 01 00 e2 |................|
00000320: 03 00 09 08 cb 68 00 00 c3 ac ec 0e d4 68 00 00 |.....h.......h..|
00000330: ab ec 07 39 47 00 00 00 28 0b 0a 4e 41 00 00 00 |...9G...(..NA...|
00000340: 0a 4e 3f 00 00 00 c7 d4 48 4e 42 00 00 00 28 d2 |.N?.....HNB...(.|
00000350: 03 16 1c 22 0d 23 16 18 11 12 07 0e 11 05 12 23 |...".#.........#|
00000360: 1b 0d 4f 76 07 01 20 73 00                      |..Ov.. s.|
```