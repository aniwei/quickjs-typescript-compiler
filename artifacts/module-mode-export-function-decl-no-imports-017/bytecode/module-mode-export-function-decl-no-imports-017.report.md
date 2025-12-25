# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/module-mode-export-function-decl-no-imports-017.ts
**生成时间**: 2025-12-25T17:39:29.244Z

## 大小对比

- TypeScript编译器: 217 字节
- WASM编译器: 217 字节
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
      "rawLength": 138,
      "actualLength": 69,
      "isWideChar": 0,
      "string": "__tests__/fixtures/module-mode-export-function-decl-no-imports-017.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f17",
      "offset": 73
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "v17",
      "offset": 77
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 93
    }
  ],
  "functionHeader": {
    "offset": 95,
    "tag": "0xd",
    "remaining": 122
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
      "rawLength": 138,
      "actualLength": 69,
      "isWideChar": 0,
      "string": "__tests__/fixtures/module-mode-export-function-decl-no-imports-017.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "f17",
      "offset": 73
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "v17",
      "offset": 77
    },
    {
      "index": 3,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 81
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 89
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 93
    }
  ],
  "functionHeader": {
    "offset": 95,
    "tag": "0xd",
    "remaining": 122
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 8a 01 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |....__tests__/fi|
00000010: 78 74 75 72 65 73 2f 6d 6f 64 75 6c 65 2d 6d 6f |xtures/module-mo|
00000020: 64 65 2d 65 78 70 6f 72 74 2d 66 75 6e 63 74 69 |de-export-functi|
00000030: 6f 6e 2d 64 65 63 6c 2d 6e 6f 2d 69 6d 70 6f 72 |on-decl-no-impor|
00000040: 74 73 2d 30 31 37 2e 6a 73 06 66 31 37 06 76 31 |ts-017.js.f17.v1|
00000050: 37 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 0d |7.console.log.x.|
00000060: c8 03 00 02 00 00 ca 03 00 01 cc 03 00 00 00 0c |................|
00000070: 20 06 01 a4 01 00 00 00 03 02 01 1e 00 ca 03 00 | ...............|
00000080: 01 cc 03 01 0d 08 ec 05 c2 00 e3 29 df b8 f1 e4 |...........)....|
00000090: 39 e7 00 00 00 43 e8 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
000000a0: 0e 06 2f c8 03 0e 00 00 27 26 0c 06 0d 2b 1b 0e |../.....'&...+..|
000000b0: 1b 0a 11 01 00 0c 43 06 01 ca 03 01 00 01 02 00 |......C.........|
000000c0: 00 05 01 d2 03 00 01 00 d3 bf 11 9f 28 c8 03 08 |............(...|
000000d0: 01 07 02 32 11 04 07 11 00                      |...2.....|
```

### WASM
```
00000000: 05 06 8a 01 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |....__tests__/fi|
00000010: 78 74 75 72 65 73 2f 6d 6f 64 75 6c 65 2d 6d 6f |xtures/module-mo|
00000020: 64 65 2d 65 78 70 6f 72 74 2d 66 75 6e 63 74 69 |de-export-functi|
00000030: 6f 6e 2d 64 65 63 6c 2d 6e 6f 2d 69 6d 70 6f 72 |on-decl-no-impor|
00000040: 74 73 2d 30 31 37 2e 6a 73 06 66 31 37 06 76 31 |ts-017.js.f17.v1|
00000050: 37 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 02 78 0d |7.console.log.x.|
00000060: c8 03 00 02 00 00 ca 03 00 01 cc 03 00 00 00 0c |................|
00000070: 20 06 01 a4 01 00 00 00 03 02 01 1e 00 ca 03 00 | ...............|
00000080: 01 cc 03 01 0d 08 ec 05 c2 00 e3 29 df b8 f1 e4 |...........)....|
00000090: 39 e7 00 00 00 43 e8 00 00 00 68 01 00 24 01 00 |9....C....h..$..|
000000a0: 0e 06 2f c8 03 0e 00 00 27 26 0c 06 0d 2b 1b 0e |../.....'&...+..|
000000b0: 1b 0a 11 01 00 0c 43 06 01 ca 03 01 00 01 02 00 |......C.........|
000000c0: 00 05 01 d2 03 00 01 00 d3 bf 11 9f 28 c8 03 08 |............(...|
000000d0: 01 07 02 32 11 04 07 11 00                      |...2.....|
```