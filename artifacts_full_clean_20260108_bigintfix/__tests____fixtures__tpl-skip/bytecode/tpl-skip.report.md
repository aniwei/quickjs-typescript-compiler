# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/tpl-skip.ts
**生成时间**: 2026-01-08T02:50:33.209Z

## 大小对比

- TypeScript编译器: 579 字节
- WASM编译器: 579 字节
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_template_skip",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tpl-skip.js",
      "offset": 28
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 75
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 78
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 102
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 104
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 117
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 120
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 122
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 124
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 126
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "baz",
      "offset": 130
    },
    {
      "index": 15,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BaraBarbaz",
      "offset": 134
    }
  ],
  "functionHeader": {
    "offset": 145,
    "tag": "0xc",
    "remaining": 434
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
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "test_template_skip",
      "offset": 9
    },
    {
      "index": 2,
      "rawLength": 60,
      "actualLength": 30,
      "isWideChar": 0,
      "string": "__tests__/fixtures/tpl-skip.js",
      "offset": 28
    },
    {
      "index": 3,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 59
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 66
    },
    {
      "index": 5,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "is",
      "offset": 75
    },
    {
      "index": 6,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 78
    },
    {
      "index": 7,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 102
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 104
    },
    {
      "index": 9,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 117
    },
    {
      "index": 10,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 120
    },
    {
      "index": 11,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 122
    },
    {
      "index": 12,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 124
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bar",
      "offset": 126
    },
    {
      "index": 14,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "baz",
      "offset": 130
    },
    {
      "index": 15,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "BaraBarbaz",
      "offset": 134
    }
  ],
  "functionHeader": {
    "offset": 145,
    "tag": "0xc",
    "remaining": 434
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 10 0c 61 73 73 65 72 74 24 74 65 73 74 5f 74 |...assert$test_t|
00000010: 65 6d 70 6c 61 74 65 5f 73 6b 69 70 3c 5f 5f 74 |emplate_skip<__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 70 6c 2d 73 6b 69 70 2e 6a 73 0c 61 63 74 75 |tpl-skip.js.actu|
00000040: 61 6c 10 65 78 70 65 63 74 65 64 04 69 73 2e 61 |al.expected.is.a|
00000050: 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a |ssertion failed:|
00000060: 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 | got |.|., expec|
00000070: 74 65 64 20 7c 04 20 28 02 29 02 61 02 62 06 42 |ted |. (.).a.b.B|
00000080: 61 72 06 62 61 7a 14 42 61 72 61 42 61 72 62 61 |ar.baz.BaraBarba|
00000090: 7a 0c 00 06 00 a4 01 00 01 00 01 00 02 1e 01 a6 |z...............|
000000a0: 01 00 00 00 40 e4 00 00 00 40 40 e5 00 00 00 40 |....@....@@....@|
000000b0: c2 00 41 e4 00 00 00 00 c2 01 41 e5 00 00 00 00 |..A.......A.....|
000000c0: c7 28 cc 03 02 00 00 00 0c 43 06 00 c8 03 03 01 |.(.......C......|
000000d0: 03 04 00 00 85 01 04 ce 03 00 01 00 d0 03 00 01 |................|
000000e0: 00 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 |.h..............|
000000f0: ab ec 03 0a d8 39 9d 00 00 00 43 e9 00 00 00 d3 |.....9....C.....|
00000100: d4 24 02 00 ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 |.$....).../...+.|
00000110: 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 |..K.....!...K...|
00000120: ab ec 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 |....C9...$...C9.|
00000130: 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 ea |..$.....)9......|
00000140: 00 00 00 d3 9f 04 eb 00 00 00 9f 04 ec 00 00 00 |................|
00000150: 9f d4 9f 04 eb 00 00 00 9f d5 ec 10 04 ed 00 00 |................|
00000160: 00 d5 9f 04 ee 00 00 00 9f ee 02 c3 9f f1 30 cc |..............0.|
00000170: 03 54 00 00 12 10 07 12 0c 10 12 21 0d 00 1b 0c |.T.........!....|
00000180: 1b 08 07 10 07 11 1c 11 08 00 07 0e 11 18 07 12 |................|
00000190: 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e |.#../,..0Y......|
000001a0: 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 20 12 |.....).)..4D.. .|
000001b0: 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 20 14 | ..?.. ..1*".. .|
000001c0: 15 0c 06 31 07 15 00 0c 43 06 00 ca 03 00 02 00 |...1....C.......|
000001d0: 09 00 00 52 02 de 03 00 00 00 e0 03 00 01 00 04 |...R............|
000001e0: f1 00 00 00 cb 06 11 f4 ed 37 73 11 7a f0 00 00 |.........7s.z...|
000001f0: 00 01 00 1d 42 f0 00 00 00 11 f4 ec 20 0e c3 43 |....B....... ..C|
00000200: 5e 00 00 00 c7 04 ef 00 00 00 43 5e 00 00 00 c7 |^.........C^....|
00000210: 24 01 00 9f 04 f2 00 00 00 24 02 00 3e 0e ee 05 |$........$..>...|
00000220: 0e 0b ee c7 39 e4 00 00 00 c8 04 f3 00 00 00 f2 |....9...........|
00000230: 29 cc 03 0e 0d 00 bd 22 39 10 16 0b 58 1d 1b 0e |)......"9...X...|
00000240: 20 01 00                                        | ..|
```

### WASM
```
00000000: 05 10 0c 61 73 73 65 72 74 24 74 65 73 74 5f 74 |...assert$test_t|
00000010: 65 6d 70 6c 61 74 65 5f 73 6b 69 70 3c 5f 5f 74 |emplate_skip<__t|
00000020: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 2f |ests__/fixtures/|
00000030: 74 70 6c 2d 73 6b 69 70 2e 6a 73 0c 61 63 74 75 |tpl-skip.js.actu|
00000040: 61 6c 10 65 78 70 65 63 74 65 64 04 69 73 2e 61 |al.expected.is.a|
00000050: 73 73 65 72 74 69 6f 6e 20 66 61 69 6c 65 64 3a |ssertion failed:|
00000060: 20 67 6f 74 20 7c 02 7c 18 2c 20 65 78 70 65 63 | got |.|., expec|
00000070: 74 65 64 20 7c 04 20 28 02 29 02 61 02 62 06 42 |ted |. (.).a.b.B|
00000080: 61 72 06 62 61 7a 14 42 61 72 61 42 61 72 62 61 |ar.baz.BaraBarba|
00000090: 7a 0c 00 06 00 a4 01 00 01 00 01 00 02 1e 01 a6 |z...............|
000000a0: 01 00 00 00 40 e4 00 00 00 40 40 e5 00 00 00 40 |....@....@@....@|
000000b0: c2 00 41 e4 00 00 00 00 c2 01 41 e5 00 00 00 00 |..A.......A.....|
000000c0: c7 28 cc 03 02 00 00 00 0c 43 06 00 c8 03 03 01 |.(.......C......|
000000d0: 03 04 00 00 85 01 04 ce 03 00 01 00 d0 03 00 01 |................|
000000e0: 00 68 00 01 00 9e 01 00 01 00 0c 01 cb c7 eb b8 |.h..............|
000000f0: ab ec 03 0a d8 39 9d 00 00 00 43 e9 00 00 00 d3 |.....9....C.....|
00000100: d4 24 02 00 ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 |.$....).../...+.|
00000110: 99 04 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 |..K.....!...K...|
00000120: ab ec 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 |....C9...$...C9.|
00000130: 00 00 24 00 00 ad ec 02 29 39 9f 00 00 00 04 ea |..$.....)9......|
00000140: 00 00 00 d3 9f 04 eb 00 00 00 9f 04 ec 00 00 00 |................|
00000150: 9f d4 9f 04 eb 00 00 00 9f d5 ec 10 04 ed 00 00 |................|
00000160: 00 d5 9f 04 ee 00 00 00 9f ee 02 c3 9f f1 30 cc |..............0.|
00000170: 03 54 00 00 12 10 07 12 0c 10 12 21 0d 00 1b 0c |.T.........!....|
00000180: 1b 08 07 10 07 11 1c 11 08 00 07 0e 11 18 07 12 |................|
00000190: 12 23 07 0e 2f 2c 07 12 30 59 07 0c 1b 12 11 0e |.#../,..0Y......|
000001a0: 07 10 1b 12 11 29 12 29 08 04 34 44 07 03 20 12 |.....).)..4D.. .|
000001b0: 20 0c 08 3f 07 03 20 16 08 31 2a 22 07 03 20 14 | ..?.. ..1*".. .|
000001c0: 15 0c 06 31 07 15 00 0c 43 06 00 ca 03 00 02 00 |...1....C.......|
000001d0: 09 00 00 52 02 de 03 00 00 00 e0 03 00 01 00 04 |...R............|
000001e0: f1 00 00 00 cb 06 11 f4 ed 37 73 11 7a f0 00 00 |.........7s.z...|
000001f0: 00 01 00 1d 42 f0 00 00 00 11 f4 ec 20 0e c3 43 |....B....... ..C|
00000200: 5e 00 00 00 c7 04 ef 00 00 00 43 5e 00 00 00 c7 |^.........C^....|
00000210: 24 01 00 9f 04 f2 00 00 00 24 02 00 3e 0e ee 05 |$........$..>...|
00000220: 0e 0b ee c7 39 e4 00 00 00 c8 04 f3 00 00 00 f2 |....9...........|
00000230: 29 cc 03 0e 0d 00 bd 22 39 10 16 0b 58 1d 1b 0e |)......"9...X...|
00000240: 20 01 00                                        | ..|
```