# 字节码分析报告

**输入文件**: tmp-hoist.ts
**生成时间**: 2025-09-29T02:26:12.679Z

## 大小对比

- TypeScript编译器: 110 字节
- WASM编译器: 110 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "tmp-hoist.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 15
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 21
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "lexicalLet",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 36,
    "tag": "0xd",
    "remaining": 74
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 4,
  "atoms": [
    {
      "index": 0,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "tmp-hoist.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 15
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "foo",
      "offset": 21
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "lexicalLet",
      "offset": 25
    }
  ],
  "functionHeader": {
    "offset": 36,
    "tag": "0xd",
    "remaining": 74
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 18 74 6d 70 2d 68 6f 69 73 74 2e 6a 73 0a |...tmp-hoist.js.|
00000010: 6f 75 74 65 72 06 66 6f 6f 14 6c 65 78 69 63 61 |outer.foo.lexica|
00000020: 6c 4c 65 74 0d c8 03 00 00 00 00 00 0c 20 06 01 |lLet......... ..|
00000030: a4 01 00 00 00 01 03 01 0d 00 ca 03 00 01 cc 03 |................|
00000040: 01 01 ce 03 02 09 08 ec 05 c2 00 e4 29 b8 e3 06 |............)...|
00000050: e5 06 2f c8 03 02 00 00 00 0c 43 06 01 cc 03 00 |../.......C.....|
00000060: 00 00 00 00 00 01 00 29 c8 03 02 01 00 00       |.......)......|
```

### WASM
```
00000000: 05 04 18 74 6d 70 2d 68 6f 69 73 74 2e 6a 73 0a |...tmp-hoist.js.|
00000010: 6f 75 74 65 72 06 66 6f 6f 14 6c 65 78 69 63 61 |outer.foo.lexica|
00000020: 6c 4c 65 74 0d c8 03 00 00 00 00 00 0c 20 06 01 |lLet......... ..|
00000030: a4 01 00 00 00 01 03 01 0d 00 ca 03 00 01 cc 03 |................|
00000040: 01 01 ce 03 02 09 08 ec 05 c2 00 e4 29 b8 e3 06 |............)...|
00000050: e5 06 2f c8 03 02 00 00 00 0c 43 06 01 cc 03 00 |../.......C.....|
00000060: 00 00 00 00 00 01 00 29 c8 03 02 01 00 00       |.......)......|
```