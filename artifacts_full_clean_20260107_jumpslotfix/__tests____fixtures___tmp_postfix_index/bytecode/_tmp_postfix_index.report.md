# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/_tmp_postfix_index.ts
**生成时间**: 2026-01-07T15:35:35.205Z

## 大小对比

- TypeScript编译器: 256 字节
- WASM编译器: 256 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/_tmp_postfix_index.js",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "__values__",
      "offset": 47
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "__index__",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 188
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 5,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/fixtures/_tmp_postfix_index.js",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 45
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "__values__",
      "offset": 47
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "__index__",
      "offset": 58
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 188
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 02 66 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 |...fP__tests__/f|
00000010: 69 78 74 75 72 65 73 2f 5f 74 6d 70 5f 70 6f 73 |ixtures/_tmp_pos|
00000020: 74 66 69 78 5f 69 6e 64 65 78 2e 6a 73 02 74 14 |tfix_index.js.t.|
00000030: 5f 5f 76 61 6c 75 65 73 5f 5f 12 5f 5f 69 6e 64 |__values__.__ind|
00000040: 65 78 5f 5f 0c 00 06 00 a4 01 00 01 00 01 00 01 |ex__............|
00000050: 10 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000060: e4 00 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 06 |......(.......C.|
00000070: 00 c8 03 00 02 00 05 00 00 56 02 cc 03 01 00 30 |.........V.....0|
00000080: 10 00 01 00 08 cc 63 00 00 c8 b8 b9 ba 26 03 00 |......c......&..|
00000090: 44 e7 00 00 00 c8 b7 44 e8 00 00 00 c8 42 e8 00 |D......D.....B..|
000000a0: 00 00 c8 42 e7 00 00 00 eb a8 cb 0b 64 00 00 4e |...B........d..N|
000000b0: 6b 00 00 00 64 00 00 ec 08 39 47 00 00 00 ee 15 |k...d....9G.....|
000000c0: c8 42 e7 00 00 00 c8 43 e8 00 00 00 93 18 44 e8 |.B.....C......D.|
000000d0: 00 00 00 48 4e 42 00 00 00 28 ca 03 22 01 00 1c |...HNB...(.."...|
000000e0: 08 07 08 3a 07 07 08 26 14 20 24 1b 16 07 23 12 |...:...&. $...#.|
000000f0: 13 2a 14 1b 08 2a 20 20 20 1b 14 25 1d 20 6f 00 |.*...*   ..%. o.|
```

### WASM
```
00000000: 05 05 02 66 50 5f 5f 74 65 73 74 73 5f 5f 2f 66 |...fP__tests__/f|
00000010: 69 78 74 75 72 65 73 2f 5f 74 6d 70 5f 70 6f 73 |ixtures/_tmp_pos|
00000020: 74 66 69 78 5f 69 6e 64 65 78 2e 6a 73 02 74 14 |tfix_index.js.t.|
00000030: 5f 5f 76 61 6c 75 65 73 5f 5f 12 5f 5f 69 6e 64 |__values__.__ind|
00000040: 65 78 5f 5f 0c 00 06 00 a4 01 00 01 00 01 00 01 |ex__............|
00000050: 10 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000060: e4 00 00 00 00 c7 28 ca 03 02 00 00 00 0c 43 06 |......(.......C.|
00000070: 00 c8 03 00 02 00 05 00 00 56 02 cc 03 01 00 30 |.........V.....0|
00000080: 10 00 01 00 08 cc 63 00 00 c8 b8 b9 ba 26 03 00 |......c......&..|
00000090: 44 e7 00 00 00 c8 b7 44 e8 00 00 00 c8 42 e8 00 |D......D.....B..|
000000a0: 00 00 c8 42 e7 00 00 00 eb a8 cb 0b 64 00 00 4e |...B........d..N|
000000b0: 6b 00 00 00 64 00 00 ec 08 39 47 00 00 00 ee 15 |k...d....9G.....|
000000c0: c8 42 e7 00 00 00 c8 43 e8 00 00 00 93 18 44 e8 |.B.....C......D.|
000000d0: 00 00 00 48 4e 42 00 00 00 28 ca 03 22 01 00 1c |...HNB...(.."...|
000000e0: 08 07 08 3a 07 07 08 26 14 20 24 1b 16 07 23 12 |...:...&. $...#.|
000000f0: 13 2a 14 1b 08 2a 20 20 20 1b 14 25 1d 20 6f 00 |.*...*   ..%. o.|
```