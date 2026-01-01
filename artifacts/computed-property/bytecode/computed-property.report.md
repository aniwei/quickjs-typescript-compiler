# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/computed-property.ts
**生成时间**: 2026-01-01T07:22:59.240Z

## 大小对比

- TypeScript编译器: 178 字节
- WASM编译器: 178 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/computed-property.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 114
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 6,
  "atoms": [
    {
      "index": 0,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "key",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "obj",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 12
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 78,
      "actualLength": 39,
      "isWideChar": 0,
      "string": "__tests__/fixtures/computed-property.js",
      "offset": 24
    }
  ],
  "functionHeader": {
    "offset": 64,
    "tag": "0xc",
    "remaining": 114
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 06 6b 65 79 06 6f 62 6a 02 61 0e 63 6f 6e |...key.obj.a.con|
00000010: 73 6f 6c 65 06 6c 6f 67 4e 5f 5f 74 65 73 74 73 |sole.logN__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f 6d 70 |__/fixtures/comp|
00000030: 75 74 65 64 2d 70 72 6f 70 65 72 74 79 2e 6a 73 |uted-property.js|
00000040: 0c 00 06 00 a4 01 00 01 00 04 00 00 4b 01 a6 01 |............K...|
00000050: 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f |...@.....@.....?|
00000060: e4 00 00 00 80 3f e5 00 00 00 80 04 e6 00 00 00 |.....?..........|
00000070: 3b e4 00 00 00 0b 39 e4 00 00 00 74 b8 53 0e 3b |;.....9....t.S.;|
00000080: e5 00 00 00 39 e7 00 00 00 43 e8 00 00 00 39 e5 |....9....C....9.|
00000090: 00 00 00 39 e4 00 00 00 48 24 01 00 cf 28 d2 03 |...9....H$...(..|
000000a0: 10 00 00 b2 1e 49 1d 1b 0e 1b 0a 1b 08 1b 01 07 |.....I..........|
000000b0: 07 00                                           |..|
```

### WASM
```
00000000: 05 06 06 6b 65 79 06 6f 62 6a 02 61 0e 63 6f 6e |...key.obj.a.con|
00000010: 73 6f 6c 65 06 6c 6f 67 4e 5f 5f 74 65 73 74 73 |sole.logN__tests|
00000020: 5f 5f 2f 66 69 78 74 75 72 65 73 2f 63 6f 6d 70 |__/fixtures/comp|
00000030: 75 74 65 64 2d 70 72 6f 70 65 72 74 79 2e 6a 73 |uted-property.js|
00000040: 0c 00 06 00 a4 01 00 01 00 04 00 00 4b 01 a6 01 |............K...|
00000050: 00 00 00 40 e4 00 00 00 80 40 e5 00 00 00 80 3f |...@.....@.....?|
00000060: e4 00 00 00 80 3f e5 00 00 00 80 04 e6 00 00 00 |.....?..........|
00000070: 3b e4 00 00 00 0b 39 e4 00 00 00 74 b8 53 0e 3b |;.....9....t.S.;|
00000080: e5 00 00 00 39 e7 00 00 00 43 e8 00 00 00 39 e5 |....9....C....9.|
00000090: 00 00 00 39 e4 00 00 00 48 24 01 00 cf 28 d2 03 |...9....H$...(..|
000000a0: 10 00 00 b2 1e 49 1d 1b 0e 1b 0a 1b 08 1b 01 07 |.....I..........|
000000b0: 07 00                                           |..|
```