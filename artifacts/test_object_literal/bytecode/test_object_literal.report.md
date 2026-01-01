# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/test_object_literal.ts
**生成时间**: 2026-01-01T07:23:50.982Z

## 大小对比

- TypeScript编译器: 801 字节
- WASM编译器: 801 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 16,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "test_object_literal",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_object_literal.js",
      "offset": 29
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 78
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 87
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 90
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 114
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 116
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 129
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 132
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 134
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 136
    },
    {
      "index": 13,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "stringify",
      "offset": 138
    },
    {
      "index": 14,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "{\"get\":2,\"set\":3,\"async\":4,\"a\":2}",
      "offset": 148
    },
    {
      "index": 15,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "{\"x\":0,\"get\":1,\"set\":2,\"async\":3}",
      "offset": 182
    }
  ],
  "functionHeader": {
    "offset": 216,
    "tag": "0xc",
    "remaining": 585
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 16,
  "atoms": [
    {
      "index": 0,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 38,
      "actualLength": 19,
      "isWideChar": 0,
      "string": "test_object_literal",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures/test_object_literal.js",
      "offset": 29
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 71
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 78
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 87
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 90
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 114
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 116
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 129
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 132
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 134
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 136
    },
    {
      "index": 13,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "stringify",
      "offset": 138
    },
    {
      "index": 14,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "{\"get\":2,\"set\":3,\"async\":4,\"a\":2}",
      "offset": 148
    },
    {
      "index": 15,
      "rawLength": 66,
      "actualLength": 33,
      "isWideChar": 0,
      "string": "{\"x\":0,\"get\":1,\"set\":2,\"async\":3}",
      "offset": 182
    }
  ],
  "functionHeader": {
    "offset": 216,
    "tag": "0xc",
    "remaining": 585
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 10 0c 61 73 73 65 72 74 26 74 65 73 74 5f 6f |...assert&test_o|
00000010: 62 6a 65 63 74 5f 6c 69 74 65 72 61 6c 52 5f 5f |bject_literalR__|
00000020: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000030: 2f 74 65 73 74 5f 6f 62 6a 65 63 74 5f 6c 69 74 |/test_object_lit|
00000040: 65 72 61 6c 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |eral.js.actual.e|
00000050: 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 |xpected.is.asser|
00000060: 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 |tion failed: got|
00000070: 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 | |.|., expected |
00000080: 7c 04 20 28 02 29 02 78 02 61 12 73 74 72 69 6e ||. (.).x.a.strin|
00000090: 67 69 66 79 42 7b 22 67 65 74 22 3a 32 2c 22 73 |gifyB{"get":2,"s|
000000a0: 65 74 22 3a 33 2c 22 61 73 79 6e 63 22 3a 34 2c |et":3,"async":4,|
000000b0: 22 61 22 3a 32 7d 42 7b 22 78 22 3a 30 2c 22 67 |"a":2}B{"x":0,"g|
000000c0: 65 74 22 3a 31 2c 22 73 65 74 22 3a 32 2c 22 61 |et":1,"set":2,"a|
000000d0: 73 79 6e 63 22 3a 33 7d 0c 00 06 00 a4 01 00 01 |sync":3}........|
000000e0: 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 00 00 00 |...........@....|
000000f0: 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 00 c2 |@@....@..A......|
00000100: 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 00 00 0c |.A......(.......|
00000110: 43 06 00 c8 03 03 01 03 04 00 00 85 01 04 ce 03 |C...............|
00000120: 00 01 00 d0 03 00 01 00 68 00 01 00 9e 01 00 01 |........h.......|
00000130: 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 9d 00 00 |............9...|
00000140: 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 |.C......$....)..|
00000150: ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 |./...+...K.....!|
00000160: d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 |...K.......C9...|
00000170: 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 |$...C9...$.....)|
00000180: 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 eb 00 00 |9...............|
00000190: 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 00 00 9f |................|
000001a0: d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 00 00 9f |................|
000001b0: ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 07 12 0c |.....0..T.......|
000001c0: 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 1c 11 08 |..!.............|
000001d0: 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 |........#../,..0|
000001e0: 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 |Y...........).).|
000001f0: 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 |.4D.. . ..?.. ..|
00000200: 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 |1*".. ....1....C|
00000210: 06 00 ca 03 00 03 00 04 00 01 a3 01 03 de 03 00 |................|
00000220: 00 00 86 01 00 01 00 88 01 00 02 00 b7 cb b8 cc |................|
00000230: b9 cd ba 11 3a 87 00 00 00 0e 0b b9 4e 43 00 00 |....:.......NC..|
00000240: 00 ba 4e 44 00 00 00 bb 4e 87 00 00 00 c2 00 56 |..ND....N......V|
00000250: f0 00 00 00 05 11 3a f0 00 00 00 0e 39 e4 00 00 |......:.....9...|
00000260: 00 39 a6 00 00 00 43 f1 00 00 00 39 f0 00 00 00 |.9....C....9....|
00000270: 24 01 00 04 f2 00 00 00 f2 0e 39 e4 00 00 00 39 |$.........9....9|
00000280: f0 00 00 00 42 f0 00 00 00 b9 ad f1 0e 0b c7 4e |....B..........N|
00000290: ef 00 00 00 c8 4e 43 00 00 00 c9 4e 44 00 00 00 |.....NC....ND...|
000002a0: 39 87 00 00 00 4e 87 00 00 00 11 3a f0 00 00 00 |9....N.....:....|
000002b0: 0e 39 e4 00 00 00 39 a6 00 00 00 43 f1 00 00 00 |.9....9....C....|
000002c0: 39 f0 00 00 00 24 01 00 04 f3 00 00 00 f2 29 cc |9....$........).|
000002d0: 03 2a 0d 00 22 08 2b 00 ad 00 1b 0e 1b 08 1b 16 |.*..".+.........|
000002e0: 1b 01 2a 1d 0d 0b 1b 0e 1b 02 20 06 07 09 0d 0b |..*....... .....|
000002f0: b7 00 1b 0e 1b 08 1b 16 1b 01 2a 1d 00 0c 42 07 |..........*...B.|
00000300: 00 00 00 01 00 01 00 00 09 01 10 00 01 00 08 cb |................|
00000310: c7 42 43 00 00 00 28 cc 03 06 10 24 11 2a 1b 15 |.BC...(....$.*..|
00000320: 00                                              |.|
```

### WASM
```
00000000: 05 10 0c 61 73 73 65 72 74 26 74 65 73 74 5f 6f |...assert&test_o|
00000010: 62 6a 65 63 74 5f 6c 69 74 65 72 61 6c 52 5f 5f |bject_literalR__|
00000020: 74 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 |tests__/fixtures|
00000030: 2f 74 65 73 74 5f 6f 62 6a 65 63 74 5f 6c 69 74 |/test_object_lit|
00000040: 65 72 61 6c 2e 6a 73 0c 61 63 74 75 61 6c 10 65 |eral.js.actual.e|
00000050: 78 70 65 63 74 65 64 04 69 73 2e 61 73 73 65 72 |xpected.is.asser|
00000060: 74 69 6f 6e 20 66 61 69 6c 65 64 3a 20 67 6f 74 |tion failed: got|
00000070: 20 7c 02 7c 18 2c 20 65 78 70 65 63 74 65 64 20 | |.|., expected |
00000080: 7c 04 20 28 02 29 02 78 02 61 12 73 74 72 69 6e ||. (.).x.a.strin|
00000090: 67 69 66 79 42 7b 22 67 65 74 22 3a 32 2c 22 73 |gifyB{"get":2,"s|
000000a0: 65 74 22 3a 33 2c 22 61 73 79 6e 63 22 3a 34 2c |et":3,"async":4,|
000000b0: 22 61 22 3a 32 7d 42 7b 22 78 22 3a 30 2c 22 67 |"a":2}B{"x":0,"g|
000000c0: 65 74 22 3a 31 2c 22 73 65 74 22 3a 32 2c 22 61 |et":1,"set":2,"a|
000000d0: 73 79 6e 63 22 3a 33 7d 0c 00 06 00 a4 01 00 01 |sync":3}........|
000000e0: 00 01 00 02 1e 01 a6 01 00 00 00 40 e4 00 00 00 |...........@....|
000000f0: 40 40 e5 00 00 00 40 c2 00 41 e4 00 00 00 00 c2 |@@....@..A......|
00000100: 01 41 e5 00 00 00 00 c7 28 cc 03 02 00 00 00 0c |.A......(.......|
00000110: 43 06 00 c8 03 03 01 03 04 00 00 85 01 04 ce 03 |C...............|
00000120: 00 01 00 d0 03 00 01 00 68 00 01 00 9e 01 00 01 |........h.......|
00000130: 00 0c 01 cb c7 eb b8 ab ec 03 0a d8 39 9d 00 00 |............9...|
00000140: 00 43 e9 00 00 00 d3 d4 24 02 00 ec 02 29 d3 f5 |.C......$....)..|
00000150: ed 2f d4 f5 ed 2b d3 99 04 4b 00 00 00 ab ec 21 |./...+...K.....!|
00000160: d4 99 04 4b 00 00 00 ab ec 17 d3 43 39 00 00 00 |...K.......C9...|
00000170: 24 00 00 d4 43 39 00 00 00 24 00 00 ad ec 02 29 |$...C9...$.....)|
00000180: 39 9f 00 00 00 04 ea 00 00 00 d3 9f 04 eb 00 00 |9...............|
00000190: 00 9f 04 ec 00 00 00 9f d4 9f 04 eb 00 00 00 9f |................|
000001a0: d5 ec 10 04 ed 00 00 00 d5 9f 04 ee 00 00 00 9f |................|
000001b0: ee 02 c3 9f f1 30 cc 03 54 00 00 12 10 07 12 0c |.....0..T.......|
000001c0: 10 12 21 0d 00 1b 0c 1b 08 07 10 07 11 1c 11 08 |..!.............|
000001d0: 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c 07 12 30 |........#../,..0|
000001e0: 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 12 29 08 |Y...........).).|
000001f0: 04 34 44 07 03 20 12 20 0c 08 3f 07 03 20 16 08 |.4D.. . ..?.. ..|
00000200: 31 2a 22 07 03 20 14 15 0c 06 31 07 15 00 0c 43 |1*".. ....1....C|
00000210: 06 00 ca 03 00 03 00 04 00 01 a3 01 03 de 03 00 |................|
00000220: 00 00 86 01 00 01 00 88 01 00 02 00 b7 cb b8 cc |................|
00000230: b9 cd ba 11 3a 87 00 00 00 0e 0b b9 4e 43 00 00 |....:.......NC..|
00000240: 00 ba 4e 44 00 00 00 bb 4e 87 00 00 00 c2 00 56 |..ND....N......V|
00000250: f0 00 00 00 05 11 3a f0 00 00 00 0e 39 e4 00 00 |......:.....9...|
00000260: 00 39 a6 00 00 00 43 f1 00 00 00 39 f0 00 00 00 |.9....C....9....|
00000270: 24 01 00 04 f2 00 00 00 f2 0e 39 e4 00 00 00 39 |$.........9....9|
00000280: f0 00 00 00 42 f0 00 00 00 b9 ad f1 0e 0b c7 4e |....B..........N|
00000290: ef 00 00 00 c8 4e 43 00 00 00 c9 4e 44 00 00 00 |.....NC....ND...|
000002a0: 39 87 00 00 00 4e 87 00 00 00 11 3a f0 00 00 00 |9....N.....:....|
000002b0: 0e 39 e4 00 00 00 39 a6 00 00 00 43 f1 00 00 00 |.9....9....C....|
000002c0: 39 f0 00 00 00 24 01 00 04 f3 00 00 00 f2 29 cc |9....$........).|
000002d0: 03 2a 0d 00 22 08 2b 00 ad 00 1b 0e 1b 08 1b 16 |.*..".+.........|
000002e0: 1b 01 2a 1d 0d 0b 1b 0e 1b 02 20 06 07 09 0d 0b |..*....... .....|
000002f0: b7 00 1b 0e 1b 08 1b 16 1b 01 2a 1d 00 0c 42 07 |..........*...B.|
00000300: 00 00 00 01 00 01 00 00 09 01 10 00 01 00 08 cb |................|
00000310: c7 42 43 00 00 00 28 cc 03 06 10 24 11 2a 1b 15 |.BC...(....$.*..|
00000320: 00                                              |.|
```