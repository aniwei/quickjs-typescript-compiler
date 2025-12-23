# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/object-nested.ts
**生成时间**: 2025-12-23T10:34:39.920Z

## 大小对比

- TypeScript编译器: 279 字节
- WASM编译器: 279 字节
- 差异: 0 字节 (0.00%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "id",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Alice",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bob",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "users",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "page",
      "offset": 26
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 31
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 37
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 45
    },
    {
      "index": 9,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-nested.js",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xc",
    "remaining": 194
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 10,
  "atoms": [
    {
      "index": 0,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "data",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "id",
      "offset": 7
    },
    {
      "index": 2,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Alice",
      "offset": 10
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Bob",
      "offset": 16
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "users",
      "offset": 20
    },
    {
      "index": 5,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "page",
      "offset": 26
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "total",
      "offset": 31
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 37
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 45
    },
    {
      "index": 9,
      "rawLength": 70,
      "actualLength": 35,
      "isWideChar": 0,
      "string": "__tests__/fixtures/object-nested.js",
      "offset": 49
    }
  ],
  "functionHeader": {
    "offset": 85,
    "tag": "0xc",
    "remaining": 194
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 0a 08 64 61 74 61 04 69 64 0a 41 6c 69 63 65 |...data.id.Alice|
00000010: 06 42 6f 62 0a 75 73 65 72 73 08 70 61 67 65 0a |.Bob.users.page.|
00000020: 74 6f 74 61 6c 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |total.console.lo|
00000030: 67 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |gF__tests__/fixt|
00000040: 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6e 65 73 74 |ures/object-nest|
00000050: 65 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 |ed.js...........|
00000060: 00 8c 01 01 a6 01 00 00 00 40 e4 00 00 00 80 3f |.........@.....?|
00000070: e4 00 00 00 80 0b 0b b8 4e e5 00 00 00 04 e6 00 |........N.......|
00000080: 00 00 4e 38 00 00 00 0b b9 4e e5 00 00 00 04 e7 |..N8.....N......|
00000090: 00 00 00 4e 38 00 00 00 26 02 00 4e e8 00 00 00 |...N8...&..N....|
000000a0: 0b b8 4e e9 00 00 00 bf 64 4e ea 00 00 00 4e 7d |..N.....dN....N}|
000000b0: 00 00 00 3b e4 00 00 00 39 eb 00 00 00 43 ec 00 |...;....9....C..|
000000c0: 00 00 39 e4 00 00 00 42 e8 00 00 00 b7 48 42 38 |..9....B.....HB8|
000000d0: 00 00 00 24 01 00 cb 39 eb 00 00 00 43 ec 00 00 |...$...9....C...|
000000e0: 00 39 e4 00 00 00 42 7d 00 00 00 42 ea 00 00 00 |.9....B}...B....|
000000f0: 24 01 00 cf 28 da 03 1e 00 00 00 4f 14 00 1b 0e |$...(......O....|
00000100: 1b 0a 1b 08 20 0c 07 06 1b 1b 17 15 1b 0e 1b 0a |.... ...........|
00000110: 1b 08 1b 0a 1b 13 00                            |.......|
```

### WASM
```
00000000: 05 0a 08 64 61 74 61 04 69 64 0a 41 6c 69 63 65 |...data.id.Alice|
00000010: 06 42 6f 62 0a 75 73 65 72 73 08 70 61 67 65 0a |.Bob.users.page.|
00000020: 74 6f 74 61 6c 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |total.console.lo|
00000030: 67 46 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |gF__tests__/fixt|
00000040: 75 72 65 73 2f 6f 62 6a 65 63 74 2d 6e 65 73 74 |ures/object-nest|
00000050: 65 64 2e 6a 73 0c 00 06 00 a4 01 00 01 00 04 00 |ed.js...........|
00000060: 00 8c 01 01 a6 01 00 00 00 40 e4 00 00 00 80 3f |.........@.....?|
00000070: e4 00 00 00 80 0b 0b b8 4e e5 00 00 00 04 e6 00 |........N.......|
00000080: 00 00 4e 38 00 00 00 0b b9 4e e5 00 00 00 04 e7 |..N8.....N......|
00000090: 00 00 00 4e 38 00 00 00 26 02 00 4e e8 00 00 00 |...N8...&..N....|
000000a0: 0b b8 4e e9 00 00 00 bf 64 4e ea 00 00 00 4e 7d |..N.....dN....N}|
000000b0: 00 00 00 3b e4 00 00 00 39 eb 00 00 00 43 ec 00 |...;....9....C..|
000000c0: 00 00 39 e4 00 00 00 42 e8 00 00 00 b7 48 42 38 |..9....B.....HB8|
000000d0: 00 00 00 24 01 00 cb 39 eb 00 00 00 43 ec 00 00 |...$...9....C...|
000000e0: 00 39 e4 00 00 00 42 7d 00 00 00 42 ea 00 00 00 |.9....B}...B....|
000000f0: 24 01 00 cf 28 da 03 1e 00 00 00 4f 14 00 1b 0e |$...(......O....|
00000100: 1b 0a 1b 08 20 0c 07 06 1b 1b 17 15 1b 0e 1b 0a |.... ...........|
00000110: 1b 08 1b 0a 1b 13 00                            |.......|
```