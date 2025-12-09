# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/compiler/fixtures/primitives.ts
**生成时间**: 2025-12-09T09:00:06.281Z

## 大小对比

- TypeScript编译器: 231 字节
- WASM编译器: 231 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/primitives.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 175
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 3,
  "atoms": [
    {
      "index": 0,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/primitives.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 44
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 52
    }
  ],
  "functionHeader": {
    "offset": 56,
    "tag": "0xd",
    "remaining": 175
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 03 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 69 6d 69 74 69 76 65 73 2e 6a 73 0e 63 6f 6e |rimitives.js.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 03 00 01 66 00 08 ec |. ..........f...|
00000050: 02 29 39 e5 00 00 00 43 e6 00 00 00 07 24 01 00 |.)9....C.....$..|
00000060: 0e 39 e5 00 00 00 43 e6 00 00 00 39 47 00 00 00 |.9....C....9G...|
00000070: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 0a 24 |$...9....C.....$|
00000080: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 09 24 01 |...9....C.....$.|
00000090: 00 0e 39 e5 00 00 00 43 e6 00 00 00 bf 7b 24 01 |..9....C.....{$.|
000000a0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 c1 00 24 01 |..9....C......$.|
000000b0: 00 0e 06 2f c8 03 26 00 00 2f 0e 20 08 17 15 1b |.../..&../. ....|
000000c0: 0e 1b 0a 1b 01 17 15 1b 0e 20 08 17 15 1b 0e 20 |......... ..... |
000000d0: 08 17 15 1b 0e 25 08 17 15 1b 0e 25 08 00 06 00 |.....%.....%....|
000000e0: 00 00 00 00 00 f8 3f                            |......?|
```

### WASM
```
00000000: 05 03 52 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..R__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 70 |piler/fixtures/p|
00000020: 72 69 6d 69 74 69 76 65 73 2e 6a 73 0e 63 6f 6e |rimitives.js.con|
00000030: 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 00 00 |sole.log........|
00000040: 0c 20 06 01 a4 01 00 00 00 03 00 01 66 00 08 ec |. ..........f...|
00000050: 02 29 39 e5 00 00 00 43 e6 00 00 00 07 24 01 00 |.)9....C.....$..|
00000060: 0e 39 e5 00 00 00 43 e6 00 00 00 39 47 00 00 00 |.9....C....9G...|
00000070: 24 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 0a 24 |$...9....C.....$|
00000080: 01 00 0e 39 e5 00 00 00 43 e6 00 00 00 09 24 01 |...9....C.....$.|
00000090: 00 0e 39 e5 00 00 00 43 e6 00 00 00 bf 7b 24 01 |..9....C.....{$.|
000000a0: 00 0e 39 e5 00 00 00 43 e6 00 00 00 c1 00 24 01 |..9....C......$.|
000000b0: 00 0e 06 2f c8 03 26 00 00 2f 0e 20 08 17 15 1b |.../..&../. ....|
000000c0: 0e 1b 0a 1b 01 17 15 1b 0e 20 08 17 15 1b 0e 20 |......... ..... |
000000d0: 08 17 15 1b 0e 25 08 17 15 1b 0e 25 08 00 06 00 |.....%.....%....|
000000e0: 00 00 00 00 00 f8 3f                            |......?|
```