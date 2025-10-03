# 字节码分析报告

**输入文件**: tmp/object-literal-shorthand.ts
**生成时间**: 2025-10-03T07:04:15.827Z

## 大小对比

- TypeScript编译器: 137 字节
- WASM编译器: 137 字节
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
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "tmp/object-literal-shorthand.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "shorthandValue",
      "offset": 34
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shorthandInfo",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 63
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 65
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
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "tmp/object-literal-shorthand.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "shorthandValue",
      "offset": 34
    },
    {
      "index": 2,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "shorthandInfo",
      "offset": 49
    },
    {
      "index": 3,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "hi",
      "offset": 63
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "label",
      "offset": 66
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 65
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 05 3e 74 6d 70 2f 6f 62 6a 65 63 74 2d 6c 69 |..>tmp/object-li|
00000010: 74 65 72 61 6c 2d 73 68 6f 72 74 68 61 6e 64 2e |teral-shorthand.|
00000020: 6a 73 1c 73 68 6f 72 74 68 61 6e 64 56 61 6c 75 |js.shorthandValu|
00000030: 65 1a 73 68 6f 72 74 68 61 6e 64 49 6e 66 6f 04 |e.shorthandInfo.|
00000040: 68 69 0a 6c 61 62 65 6c 0d c8 03 00 00 00 00 00 |hi.label........|
00000050: 0c 20 06 01 a4 01 00 00 00 02 02 00 1d 00 ca 03 |. ..............|
00000060: 00 0d cc 03 01 0d 08 ec 02 29 bf 2a e3 0b 68 00 |.........).*..h.|
00000070: 00 4e e5 00 00 00 04 e7 00 00 00 4e e8 00 00 00 |.N.........N....|
00000080: e4 06 2f c8 03 02 00 00 00                      |../......|
```

### WASM
```
00000000: 05 05 3e 74 6d 70 2f 6f 62 6a 65 63 74 2d 6c 69 |..>tmp/object-li|
00000010: 74 65 72 61 6c 2d 73 68 6f 72 74 68 61 6e 64 2e |teral-shorthand.|
00000020: 6a 73 1c 73 68 6f 72 74 68 61 6e 64 56 61 6c 75 |js.shorthandValu|
00000030: 65 1a 73 68 6f 72 74 68 61 6e 64 49 6e 66 6f 04 |e.shorthandInfo.|
00000040: 68 69 0a 6c 61 62 65 6c 0d c8 03 00 00 00 00 00 |hi.label........|
00000050: 0c 20 06 01 a4 01 00 00 00 02 02 00 1d 00 ca 03 |. ..............|
00000060: 00 0d cc 03 01 0d 08 ec 02 29 bf 2a e3 0b 68 00 |.........).*..h.|
00000070: 00 4e e5 00 00 00 04 e7 00 00 00 4e e8 00 00 00 |.N.........N....|
00000080: e4 06 2f c8 03 02 00 00 00                      |../......|
```