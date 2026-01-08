# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/module-basic.ts
**生成时间**: 2026-01-08T03:25:32.024Z

## 大小对比

- TypeScript编译器: 155 字节
- WASM编译器: 155 字节
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/module-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 37
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 39
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xd",
    "remaining": 112
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
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "__tests__/fixtures/module-basic.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 37
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 39
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 41
    }
  ],
  "functionHeader": {
    "offset": 43,
    "tag": "0xd",
    "remaining": 112
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 04 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..D__tests__/fix|
00000010: 74 75 72 65 73 2f 6d 6f 64 75 6c 65 2d 62 61 73 |tures/module-bas|
00000020: 69 63 2e 6a 73 02 78 02 61 02 62 0d c8 03 00 03 |ic.js.x.a.b.....|
00000030: 00 00 ca 03 00 01 d4 01 00 02 2c 00 00 00 0c 20 |..........,.... |
00000040: 06 01 a4 01 00 00 00 01 03 01 0f 00 ca 03 00 0d |................|
00000050: d4 01 01 01 fc 01 02 09 08 ec 05 c2 00 e4 29 b8 |..............).|
00000060: e3 68 00 00 e5 06 2f c8 03 06 00 00 00 09 08 1e |.h..../.........|
00000070: 00 0c 43 06 01 d4 01 02 00 02 02 00 00 04 02 cc |..C.............|
00000080: 03 00 01 00 ce 03 00 01 00 d3 d4 9f 28 c8 03 0a |............(...|
00000090: 01 07 03 08 07 08 07 03 07 11 00                |...........|
```

### WASM
```
00000000: 05 04 44 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 |..D__tests__/fix|
00000010: 74 75 72 65 73 2f 6d 6f 64 75 6c 65 2d 62 61 73 |tures/module-bas|
00000020: 69 63 2e 6a 73 02 78 02 61 02 62 0d c8 03 00 03 |ic.js.x.a.b.....|
00000030: 00 00 ca 03 00 01 d4 01 00 02 2c 00 00 00 0c 20 |..........,.... |
00000040: 06 01 a4 01 00 00 00 01 03 01 0f 00 ca 03 00 0d |................|
00000050: d4 01 01 01 fc 01 02 09 08 ec 05 c2 00 e4 29 b8 |..............).|
00000060: e3 68 00 00 e5 06 2f c8 03 06 00 00 00 09 08 1e |.h..../.........|
00000070: 00 0c 43 06 01 d4 01 02 00 02 02 00 00 04 02 cc |..C.............|
00000080: 03 00 01 00 ce 03 00 01 00 d3 d4 9f 28 c8 03 0a |............(...|
00000090: 01 07 03 08 07 08 07 03 07 11 00                |...........|
```