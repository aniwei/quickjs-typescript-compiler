# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/async-generator-basic.ts
**生成时间**: 2025-12-25T17:57:14.681Z

## 大小对比

- TypeScript编译器: 287 字节
- WASM编译器: 287 字节
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
      "string": "gen",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-generator-basic.js",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 219
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
      "string": "gen",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/fixtures/async-generator-basic.js",
      "offset": 6
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "sum",
      "offset": 50
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 54
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 56
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 64
    }
  ],
  "functionHeader": {
    "offset": 68,
    "tag": "0xc",
    "remaining": 219
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 06 06 67 65 6e 56 5f 5f 74 65 73 74 73 5f 5f |...genV__tests__|
00000010: 2f 66 69 78 74 75 72 65 73 2f 61 73 79 6e 63 2d |/fixtures/async-|
00000020: 67 65 6e 65 72 61 74 6f 72 2d 62 61 73 69 63 2e |generator-basic.|
00000030: 6a 73 06 73 75 6d 02 76 0e 63 6f 6e 73 6f 6c 65 |js.sum.v.console|
00000040: 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 01 00 02 |.log............|
00000050: 13 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000060: e4 00 00 00 00 c2 01 f0 cf 28 ca 03 0a 00 00 00 |.........(......|
00000070: 0e 0c 00 00 02 0a 04 00 0c 72 06 00 c8 03 00 00 |.........r......|
00000080: 00 03 00 00 24 00 89 b8 8d 8a ec 04 8d 8d 2f 0e |....$........./.|
00000090: 39 c7 00 00 00 43 82 00 00 00 b9 24 01 00 8d 8d |9....C.....$....|
000000a0: 8a ec 04 8d 8d 2f 0e 06 8d 2f ca 03 0a 01 00 08 |...../.../......|
000000b0: 08 30 18 1b 0e 20 10 00 0c 22 06 00 00 00 02 00 |.0... ..."......|
000000c0: 05 00 00 38 02 cc 03 01 00 20 ce 03 02 01 30 63 |...8..... ....0c|
000000d0: 00 00 b7 cb 63 01 00 39 e4 00 00 00 f0 80 ee 0e |....c..9........|
000000e0: cc 64 00 00 64 01 00 9f 11 65 00 00 0e 83 8d 85 |.d..d....e......|
000000f0: ec ef 0e 86 39 e8 00 00 00 43 e9 00 00 00 64 00 |....9....C....d.|
00000100: 00 24 01 00 0e 06 2f ca 03 14 06 01 2c 32 1b 06 |.$..../.....,2..|
00000110: 1c 29 11 0e 11 05 44 0f 1b 0e 1b 0a 11 01 00    |.)....D........|
```

### WASM
```
00000000: 05 06 06 67 65 6e 56 5f 5f 74 65 73 74 73 5f 5f |...genV__tests__|
00000010: 2f 66 69 78 74 75 72 65 73 2f 61 73 79 6e 63 2d |/fixtures/async-|
00000020: 67 65 6e 65 72 61 74 6f 72 2d 62 61 73 69 63 2e |generator-basic.|
00000030: 6a 73 06 73 75 6d 02 76 0e 63 6f 6e 73 6f 6c 65 |js.sum.v.console|
00000040: 06 6c 6f 67 0c 00 06 00 a4 01 00 01 00 01 00 02 |.log............|
00000050: 13 01 a6 01 00 00 00 40 e4 00 00 00 40 c2 00 41 |.......@....@..A|
00000060: e4 00 00 00 00 c2 01 f0 cf 28 ca 03 0a 00 00 00 |.........(......|
00000070: 0e 0c 00 00 02 0a 04 00 0c 72 06 00 c8 03 00 00 |.........r......|
00000080: 00 03 00 00 24 00 89 b8 8d 8a ec 04 8d 8d 2f 0e |....$........./.|
00000090: 39 c7 00 00 00 43 82 00 00 00 b9 24 01 00 8d 8d |9....C.....$....|
000000a0: 8a ec 04 8d 8d 2f 0e 06 8d 2f ca 03 0a 01 00 08 |...../.../......|
000000b0: 08 30 18 1b 0e 20 10 00 0c 22 06 00 00 00 02 00 |.0... ..."......|
000000c0: 05 00 00 38 02 cc 03 01 00 20 ce 03 02 01 30 63 |...8..... ....0c|
000000d0: 00 00 b7 cb 63 01 00 39 e4 00 00 00 f0 80 ee 0e |....c..9........|
000000e0: cc 64 00 00 64 01 00 9f 11 65 00 00 0e 83 8d 85 |.d..d....e......|
000000f0: ec ef 0e 86 39 e8 00 00 00 43 e9 00 00 00 64 00 |....9....C....d.|
00000100: 00 24 01 00 0e 06 2f ca 03 14 06 01 2c 32 1b 06 |.$..../.....,2..|
00000110: 1c 29 11 0e 11 05 44 0f 1b 0e 1b 0a 11 01 00    |.)....D........|
```