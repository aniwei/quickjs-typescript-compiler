# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/object-literal-simple.ts
**生成时间**: 2025-12-04T06:33:08.899Z

## 大小对比

- TypeScript编译器: 149 字节
- WASM编译器: 144 字节
- 差异: 5 字节 (3.47%)

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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "info",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 77
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
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/object-literal-simple.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "info",
      "offset": 55
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 60
    },
    {
      "index": 3,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 62
    },
    {
      "index": 4,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "hello",
      "offset": 64
    },
    {
      "index": 5,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 72,
    "tag": "0xd",
    "remaining": 72
  }
}
```

## 字节级差异

共发现 43 个字节差异:

- 偏移量 0x57: TS=0x01 vs WASM=0x00
- 偏移量 0x5d: TS=0x01 vs WASM=0x00
- 偏移量 0x60: TS=0x01 vs WASM=0x00
- 偏移量 0x61: TS=0x00 vs WASM=0x0d
- 偏移量 0x62: TS=0x30 vs WASM=0x08
- 偏移量 0x63: TS=0xca vs WASM=0xec
- 偏移量 0x64: TS=0x03 vs WASM=0x02
- 偏移量 0x65: TS=0x00 vs WASM=0x29
- 偏移量 0x66: TS=0x0d vs WASM=0x0b
- 偏移量 0x67: TS=0x08 vs WASM=0xb8
- 偏移量 0x68: TS=0xec vs WASM=0x4e
- 偏移量 0x69: TS=0x02 vs WASM=0xe6
- 偏移量 0x6a: TS=0x29 vs WASM=0x00
- 偏移量 0x6b: TS=0x0b vs WASM=0x00
- 偏移量 0x6c: TS=0xb8 vs WASM=0x00
- 偏移量 0x6d: TS=0x4e vs WASM=0xc1
- 偏移量 0x6e: TS=0xe6 vs WASM=0x00
- 偏移量 0x6f: TS=0x00 vs WASM=0x4e
- 偏移量 0x70: TS=0x00 vs WASM=0xe7
- 偏移量 0x72: TS=0xc1 vs WASM=0x00
- ... (显示前20个差异，总共43个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2d 73 69 |bject-literal-si|
00000030: 6d 70 6c 65 2e 6a 73 08 69 6e 66 6f 02 61 02 62 |mple.js.info.a.b|
00000040: 0a 68 65 6c 6c 6f 02 63 0d c8 03 00 00 00 00 00 |.hello.c........|
00000050: 0c 20 06 01 a4 01 00 01 00 02 01 01 1f 01 ca 03 |. ..............|
00000060: 01 00 30 ca 03 00 0d 08 ec 02 29 0b b8 4e e6 00 |..0.......)..N..|
00000070: 00 00 c1 00 4e e7 00 00 00 04 e8 00 00 00 4e e9 |....N.........N.|
00000080: 00 00 00 e3 06 2f c8 03 02 00 00 00 06 00 00 00 |...../..........|
00000090: 00 00 00 0c 40                                  |....@|
```

### WASM
```
00000000: 05 06 68 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..h__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6f |piler/fixtures/o|
00000020: 62 6a 65 63 74 2d 6c 69 74 65 72 61 6c 2d 73 69 |bject-literal-si|
00000030: 6d 70 6c 65 2e 6a 73 08 69 6e 66 6f 02 61 02 62 |mple.js.info.a.b|
00000040: 0a 68 65 6c 6c 6f 02 63 0d c8 03 00 00 00 00 00 |.hello.c........|
00000050: 0c 20 06 01 a4 01 00 00 00 02 01 01 1f 00 ca 03 |. ..............|
00000060: 00 0d 08 ec 02 29 0b b8 4e e6 00 00 00 c1 00 4e |.....)..N......N|
00000070: e7 00 00 00 04 e8 00 00 00 4e e9 00 00 00 e3 06 |.........N......|
00000080: 2f c8 03 02 00 00 00 06 00 00 00 00 00 00 0c 40 |/..............@|
```