# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/for-of-destructuring-rest-026.ts
**生成时间**: 2026-01-08T03:25:31.829Z

## 大小对比

- TypeScript编译器: 365 字节
- WASM编译器: 365 字节
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "rest",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 17
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "entries",
      "offset": 19
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 27
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 35
    },
    {
      "index": 9,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-of-destructuring-rest-026.js",
      "offset": 39
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 274
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 6
    },
    {
      "index": 3,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "rest",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "arr",
      "offset": 13
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 17
    },
    {
      "index": 6,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "entries",
      "offset": 19
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 27
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 35
    },
    {
      "index": 9,
      "rawLength": 102,
      "actualLength": 51,
      "isWideChar": 0,
      "string": "__tests__/fixtures/for-of-destructuring-rest-026.js",
      "offset": 39
    }
  ],
  "functionHeader": {
    "offset": 91,
    "tag": "0xc",
    "remaining": 274
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 02 69 02 76 02 61 08 72 65 73 74 06 61 72 |...i.v.a.rest.ar|
00000010: 72 02 73 0e 65 6e 74 72 69 65 73 0e 63 6f 6e 73 |r.s.entries.cons|
00000020: 6f 6c 65 06 6c 6f 67 66 5f 5f 74 65 73 74 73 5f |ole.logf__tests_|
00000030: 5f 2f 66 69 78 74 75 72 65 73 2f 66 6f 72 2d 6f |_/fixtures/for-o|
00000040: 66 2d 64 65 73 74 72 75 63 74 75 72 69 6e 67 2d |f-destructuring-|
00000050: 72 65 73 74 2d 30 32 36 2e 6a 73 0c 00 06 00 a4 |rest-026.js.....|
00000060: 01 00 05 00 0a 00 00 b8 01 05 a6 01 00 00 00 c8 |................|
00000070: 03 02 00 30 ca 03 02 02 30 cc 03 03 03 30 ce 03 |...0....0....0..|
00000080: 03 04 30 40 e8 00 00 00 80 40 e9 00 00 00 80 3f |..0@.....@.....?|
00000090: e8 00 00 00 80 3f e9 00 00 00 82 b8 b9 bf 1a bc |.....?..........|
000000a0: 9e bb 26 04 00 3b e8 00 00 00 b7 3b e9 00 00 00 |..&..;.....;....|
000000b0: 06 cb 63 02 00 63 01 00 39 e8 00 00 00 43 ea 00 |..c..c..9....C..|
000000c0: 00 00 24 00 00 7f ee 5a 7f 82 00 0e cc 82 00 0e |..$....Z........|
000000d0: cd 86 63 04 00 63 03 00 06 11 f4 ed 19 7f 82 00 |..c..c..........|
000000e0: 0e ce 26 00 00 b7 82 02 ed 05 53 91 ee f9 0e 0e |..&.......S.....|
000000f0: c5 04 86 ee 14 0e 64 02 00 64 02 00 b8 9f 64 02 |......d..d....d.|
00000100: 00 b9 9f 26 03 00 ee d6 39 e9 00 00 00 64 03 00 |...&....9....d..|
00000110: 64 04 00 eb 9f 64 01 00 9f 9f 11 3a e9 00 00 00 |d....d.....:....|
00000120: cb 82 00 ec a4 0e 86 39 eb 00 00 00 43 ec 00 00 |.......9....C...|
00000130: 00 39 e9 00 00 00 24 01 00 cf 28 da 03 2e 00 00 |.9....$...(.....|
00000140: 94 2c 7c 01 1b 06 1b 10 00 34 02 0b 11 06 16 04 |.,|......4......|
00000150: 07 0a 16 04 21 43 1b 0a 11 08 11 08 07 0b 07 20 |....!C......... |
00000160: 11 03 07 25 4a 0b 1b 0e 1b 0a 1b 01 00          |...%J........|
```

### WASM
```
00000000: 05 0a 02 69 02 76 02 61 08 72 65 73 74 06 61 72 |...i.v.a.rest.ar|
00000010: 72 02 73 0e 65 6e 74 72 69 65 73 0e 63 6f 6e 73 |r.s.entries.cons|
00000020: 6f 6c 65 06 6c 6f 67 66 5f 5f 74 65 73 74 73 5f |ole.logf__tests_|
00000030: 5f 2f 66 69 78 74 75 72 65 73 2f 66 6f 72 2d 6f |_/fixtures/for-o|
00000040: 66 2d 64 65 73 74 72 75 63 74 75 72 69 6e 67 2d |f-destructuring-|
00000050: 72 65 73 74 2d 30 32 36 2e 6a 73 0c 00 06 00 a4 |rest-026.js.....|
00000060: 01 00 05 00 0a 00 00 b8 01 05 a6 01 00 00 00 c8 |................|
00000070: 03 02 00 30 ca 03 02 02 30 cc 03 03 03 30 ce 03 |...0....0....0..|
00000080: 03 04 30 40 e8 00 00 00 80 40 e9 00 00 00 80 3f |..0@.....@.....?|
00000090: e8 00 00 00 80 3f e9 00 00 00 82 b8 b9 bf 1a bc |.....?..........|
000000a0: 9e bb 26 04 00 3b e8 00 00 00 b7 3b e9 00 00 00 |..&..;.....;....|
000000b0: 06 cb 63 02 00 63 01 00 39 e8 00 00 00 43 ea 00 |..c..c..9....C..|
000000c0: 00 00 24 00 00 7f ee 5a 7f 82 00 0e cc 82 00 0e |..$....Z........|
000000d0: cd 86 63 04 00 63 03 00 06 11 f4 ed 19 7f 82 00 |..c..c..........|
000000e0: 0e ce 26 00 00 b7 82 02 ed 05 53 91 ee f9 0e 0e |..&.......S.....|
000000f0: c5 04 86 ee 14 0e 64 02 00 64 02 00 b8 9f 64 02 |......d..d....d.|
00000100: 00 b9 9f 26 03 00 ee d6 39 e9 00 00 00 64 03 00 |...&....9....d..|
00000110: 64 04 00 eb 9f 64 01 00 9f 9f 11 3a e9 00 00 00 |d....d.....:....|
00000120: cb 82 00 ec a4 0e 86 39 eb 00 00 00 43 ec 00 00 |.......9....C...|
00000130: 00 39 e9 00 00 00 24 01 00 cf 28 da 03 2e 00 00 |.9....$...(.....|
00000140: 94 2c 7c 01 1b 06 1b 10 00 34 02 0b 11 06 16 04 |.,|......4......|
00000150: 07 0a 16 04 21 43 1b 0a 11 08 11 08 07 0b 07 20 |....!C......... |
00000160: 11 03 07 25 4a 0b 1b 0e 1b 0a 1b 01 00          |...%J........|
```