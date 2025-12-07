# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/closure-basic.ts
**生成时间**: 2025-12-07T19:06:52.596Z

## 大小对比

- TypeScript编译器: 192 字节
- WASM编译器: 192 字节
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xd",
    "remaining": 131
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
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/closure-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "outer",
      "offset": 47
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 53
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "inner",
      "offset": 55
    }
  ],
  "functionHeader": {
    "offset": 61,
    "tag": "0xd",
    "remaining": 131
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 0a |losure-basic.js.|
00000030: 6f 75 74 65 72 02 78 0a 69 6e 6e 65 72 0d c8 03 |outer.x.inner...|
00000040: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 |...... .........|
00000050: 01 0c 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 |.............)..|
00000060: 0e 06 2f c8 03 08 00 00 00 07 0e 00 07 0a 00 0c |../.............|
00000070: 43 06 01 ca 03 00 02 00 01 00 01 0d 02 cc 03 01 |C...............|
00000080: 00 60 ce 03 00 00 00 c2 00 cc 63 00 00 bf 0a cb |.`........c.....|
00000090: c8 23 00 00 c8 03 08 00 00 00 09 0a 16 07 0d 00 |.#..............|
000000a0: 0c 43 06 01 ce 03 00 00 00 01 01 00 04 00 cc 03 |.C..............|
000000b0: 00 09 68 00 00 28 c8 03 06 02 04 03 16 11 0d 00 |..h..(..........|
```

### WASM
```
00000000: 05 04 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 63 |piler/fixtures/c|
00000020: 6c 6f 73 75 72 65 2d 62 61 73 69 63 2e 6a 73 0a |losure-basic.js.|
00000030: 6f 75 74 65 72 02 78 0a 69 6e 6e 65 72 0d c8 03 |outer.x.inner...|
00000040: 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 01 01 |...... .........|
00000050: 01 0c 00 ca 03 00 01 08 ec 05 c2 00 e3 29 df f0 |.............)..|
00000060: 0e 06 2f c8 03 08 00 00 00 07 0e 00 07 0a 00 0c |../.............|
00000070: 43 06 01 ca 03 00 02 00 01 00 01 0d 02 cc 03 01 |C...............|
00000080: 00 60 ce 03 00 00 00 c2 00 cc 63 00 00 bf 0a cb |.`........c.....|
00000090: c8 23 00 00 c8 03 08 00 00 00 09 0a 16 07 0d 00 |.#..............|
000000a0: 0c 43 06 01 ce 03 00 00 00 01 01 00 04 00 cc 03 |.C..............|
000000b0: 00 09 68 00 00 28 c8 03 06 02 04 03 16 11 0d 00 |..h..(..........|
```