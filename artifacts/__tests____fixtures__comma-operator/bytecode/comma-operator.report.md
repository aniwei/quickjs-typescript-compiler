# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/comma-operator.ts
**生成时间**: 2026-01-07T15:26:01.363Z

## 大小对比

- TypeScript编译器: 342 字节
- WASM编译器: 342 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/comma-operator.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 283
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 7,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
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
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 8
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 10
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 18
    },
    {
      "index": 6,
      "rawLength": 72,
      "actualLength": 36,
      "isWideChar": 0,
      "string": "__tests__/fixtures/comma-operator.js",
      "offset": 22
    }
  ],
  "functionHeader": {
    "offset": 59,
    "tag": "0xc",
    "remaining": 283
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 07 02 78 02 79 02 61 02 62 0e 63 6f 6e 73 6f |...x.y.a.b.conso|
00000010: 6c 65 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f |le.logH__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 63 6f 6d 6d 61 2d |/fixtures/comma-|
00000030: 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 00 06 00 a4 |operator.js.....|
00000040: 01 00 01 00 04 00 00 d1 01 01 a6 01 00 00 00 40 |...............@|
00000050: e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 |.....@.....@....|
00000060: 80 40 e7 00 00 00 80 3f e4 00 00 00 82 3f e5 00 |.@.....?.....?..|
00000070: 00 00 82 3f e6 00 00 00 82 3f e7 00 00 00 82 b7 |...?.....?......|
00000080: 3b e4 00 00 00 b7 3b e5 00 00 00 b8 11 3a e5 00 |;.....;......:..|
00000090: 00 00 0e 39 e5 00 00 00 b9 9f 0e 39 e5 00 00 00 |...9.......9....|
000000a0: ba 9c 11 3a e4 00 00 00 cb 39 e8 00 00 00 43 e9 |...:.....9....C.|
000000b0: 00 00 00 39 e4 00 00 00 39 e5 00 00 00 24 02 00 |...9....9....$..|
000000c0: cb b7 3b e6 00 00 00 bf 0a 3b e7 00 00 00 06 cb |..;......;......|
000000d0: b7 11 3a e6 00 00 00 0e bf 0a 11 3a e7 00 00 00 |..:........:....|
000000e0: 0e 39 e6 00 00 00 ba a5 ec 35 39 e8 00 00 00 43 |.9.......59....C|
000000f0: e9 00 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 |....9....9....$.|
00000100: 00 cb 39 e6 00 00 00 93 3a e6 00 00 00 0e 39 e7 |..9.....:.....9.|
00000110: 00 00 00 b9 9f 11 3a e7 00 00 00 0e ee c4 c7 28 |......:........(|
00000120: d4 03 32 00 00 00 3c 06 0a 2a 0e 20 04 0c 0a 20 |..2...<..*. ... |
00000130: 04 2b 29 1b 0e 1b 0a 1b 06 1b 07 64 0b 2a 0e 2f |.+)........d.*./|
00000140: 10 20 04 12 23 1b 0e 1b 0a 1b 06 1b 07 15 18 1b |. ..#...........|
00000150: 02 25 08 20 04 00                               |.%. ..|
```

### WASM
```
00000000: 05 07 02 78 02 79 02 61 02 62 0e 63 6f 6e 73 6f |...x.y.a.b.conso|
00000010: 6c 65 06 6c 6f 67 48 5f 5f 74 65 73 74 73 5f 5f |le.logH__tests__|
00000020: 2f 66 69 78 74 75 72 65 73 2f 63 6f 6d 6d 61 2d |/fixtures/comma-|
00000030: 6f 70 65 72 61 74 6f 72 2e 6a 73 0c 00 06 00 a4 |operator.js.....|
00000040: 01 00 01 00 04 00 00 d1 01 01 a6 01 00 00 00 40 |...............@|
00000050: e4 00 00 00 80 40 e5 00 00 00 80 40 e6 00 00 00 |.....@.....@....|
00000060: 80 40 e7 00 00 00 80 3f e4 00 00 00 82 3f e5 00 |.@.....?.....?..|
00000070: 00 00 82 3f e6 00 00 00 82 3f e7 00 00 00 82 b7 |...?.....?......|
00000080: 3b e4 00 00 00 b7 3b e5 00 00 00 b8 11 3a e5 00 |;.....;......:..|
00000090: 00 00 0e 39 e5 00 00 00 b9 9f 0e 39 e5 00 00 00 |...9.......9....|
000000a0: ba 9c 11 3a e4 00 00 00 cb 39 e8 00 00 00 43 e9 |...:.....9....C.|
000000b0: 00 00 00 39 e4 00 00 00 39 e5 00 00 00 24 02 00 |...9....9....$..|
000000c0: cb b7 3b e6 00 00 00 bf 0a 3b e7 00 00 00 06 cb |..;......;......|
000000d0: b7 11 3a e6 00 00 00 0e bf 0a 11 3a e7 00 00 00 |..:........:....|
000000e0: 0e 39 e6 00 00 00 ba a5 ec 35 39 e8 00 00 00 43 |.9.......59....C|
000000f0: e9 00 00 00 39 e6 00 00 00 39 e7 00 00 00 24 02 |....9....9....$.|
00000100: 00 cb 39 e6 00 00 00 93 3a e6 00 00 00 0e 39 e7 |..9.....:.....9.|
00000110: 00 00 00 b9 9f 11 3a e7 00 00 00 0e ee c4 c7 28 |......:........(|
00000120: d4 03 32 00 00 00 3c 06 0a 2a 0e 20 04 0c 0a 20 |..2...<..*. ... |
00000130: 04 2b 29 1b 0e 1b 0a 1b 06 1b 07 64 0b 2a 0e 2f |.+)........d.*./|
00000140: 10 20 04 12 23 1b 0e 1b 0a 1b 06 1b 07 15 18 1b |. ..#...........|
00000150: 02 25 08 20 04 00                               |.%. ..|
```