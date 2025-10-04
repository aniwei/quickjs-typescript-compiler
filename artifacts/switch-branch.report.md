# 字节码分析报告

**输入文件**: __tests__/compiler/fixtures/switch-branch.ts
**生成时间**: 2025-10-04T12:42:04.589Z

## 大小对比

- TypeScript编译器: 173 字节
- WASM编译器: 173 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-branch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "categorize",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 115
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 2,
  "atoms": [
    {
      "index": 0,
      "rawLength": 88,
      "actualLength": 44,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/switch-branch.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "categorize",
      "offset": 47
    }
  ],
  "functionHeader": {
    "offset": 58,
    "tag": "0xd",
    "remaining": 115
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 02 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 62 72 61 6e 63 68 2e 6a 73 14 |witch-branch.js.|
00000030: 63 61 74 65 67 6f 72 69 7a 65 0d c8 03 00 00 00 |categorize......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0d 00 |... ............|
00000050: ca 03 00 01 08 ec 05 c2 00 e3 29 df b8 f1 0e 06 |..........).....|
00000060: 2f c8 03 08 00 00 00 07 16 00 0c 14 00 0c 43 06 |/.............C.|
00000070: 01 ca 03 01 00 01 03 00 00 15 01 84 01 00 01 00 |................|
00000080: d3 11 b7 ad ec 03 d3 28 11 b8 ad ec 05 d3 b8 9f |.......(........|
00000090: 28 d3 b8 a0 28 c8 03 14 00 00 03 14 22 06 07 0d |(...(......."...|
000000a0: 22 0e 0c 0c 07 19 09 0e 0c 0c 07 19 00          |"............|
```

### WASM
```
00000000: 05 02 58 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..X__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 73 |piler/fixtures/s|
00000020: 77 69 74 63 68 2d 62 72 61 6e 63 68 2e 6a 73 14 |witch-branch.js.|
00000030: 63 61 74 65 67 6f 72 69 7a 65 0d c8 03 00 00 00 |categorize......|
00000040: 00 00 0c 20 06 01 a4 01 00 00 00 02 01 01 0d 00 |... ............|
00000050: ca 03 00 01 08 ec 05 c2 00 e3 29 df b8 f1 0e 06 |..........).....|
00000060: 2f c8 03 08 00 00 00 07 16 00 0c 14 00 0c 43 06 |/.............C.|
00000070: 01 ca 03 01 00 01 03 00 00 15 01 84 01 00 01 00 |................|
00000080: d3 11 b7 ad ec 03 d3 28 11 b8 ad ec 05 d3 b8 9f |.......(........|
00000090: 28 d3 b8 a0 28 c8 03 14 00 00 03 14 22 06 07 0d |(...(......."...|
000000a0: 22 0e 0c 0c 07 19 09 0e 0c 0c 07 19 00          |"............|
```