# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/new-operator.ts
**生成时间**: 2025-12-04T06:33:08.778Z

## 大小对比

- TypeScript编译器: 219 字节
- WASM编译器: 5 字节
- 差异: 214 字节 (4280.00%)

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
      "rawLength": 86,
      "actualLength": 43,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/new-operator.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "MyClass",
      "offset": 46
    },
    {
      "index": 2,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 54
    },
    {
      "index": 3,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "n_obj",
      "offset": 56
    },
    {
      "index": 4,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 62
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 70
    }
  ],
  "functionHeader": {
    "offset": 74,
    "tag": "0xd",
    "remaining": 145
  }
}
```

### WASM编译器输出
```json
{
  "error": "Bytecode too short for analysis"
}
```

## 字节级差异

共发现 219 个字节差异:

- 偏移量 0x0: TS=0x05 vs WASM=0x01
- 偏移量 0x1: TS=0x06 vs WASM=0x02
- 偏移量 0x2: TS=0x56 vs WASM=0x03
- 偏移量 0x3: TS=0x5f vs WASM=0x04
- 偏移量 0x4: TS=0x5f vs WASM=0x05
- 偏移量 0x5: TS=0x74 vs WASM=EOF
- 偏移量 0x6: TS=0x65 vs WASM=EOF
- 偏移量 0x7: TS=0x73 vs WASM=EOF
- 偏移量 0x8: TS=0x74 vs WASM=EOF
- 偏移量 0x9: TS=0x73 vs WASM=EOF
- 偏移量 0xa: TS=0x5f vs WASM=EOF
- 偏移量 0xb: TS=0x5f vs WASM=EOF
- 偏移量 0xc: TS=0x2f vs WASM=EOF
- 偏移量 0xd: TS=0x63 vs WASM=EOF
- 偏移量 0xe: TS=0x6f vs WASM=EOF
- 偏移量 0xf: TS=0x6d vs WASM=EOF
- 偏移量 0x10: TS=0x70 vs WASM=EOF
- 偏移量 0x11: TS=0x69 vs WASM=EOF
- 偏移量 0x12: TS=0x6c vs WASM=EOF
- 偏移量 0x13: TS=0x65 vs WASM=EOF
- ... (显示前20个差异，总共219个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 06 56 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..V__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 6e |piler/fixtures/n|
00000020: 65 77 2d 6f 70 65 72 61 74 6f 72 2e 6a 73 0e 4d |ew-operator.js.M|
00000030: 79 43 6c 61 73 73 02 78 0a 6e 5f 6f 62 6a 0e 63 |yClass.x.n_obj.c|
00000040: 6f 6e 73 6f 6c 65 06 6c 6f 67 0d c8 03 00 00 00 |onsole.log......|
00000050: 00 00 0c 20 06 01 a4 01 00 02 00 03 02 01 27 02 |... ..........'.|
00000060: ca 03 01 00 20 ce 03 01 01 20 ca 03 00 01 ce 03 |.... .... ......|
00000070: 01 01 08 ec 05 c2 00 e3 29 5a 00 00 11 21 00 00 |........)Z...!..|
00000080: e4 39 e8 00 00 00 43 e9 00 00 00 5a 01 00 42 e6 |.9....C....Z..B.|
00000090: 00 00 00 24 01 00 0e 06 2f c8 03 0e 00 00 28 22 |...$..../.....("|
000000a0: 2b 21 1b 0e 1b 0a 11 0a 1b 0b 00 0c 43 06 01 ca |+!..........C...|
000000b0: 03 01 01 01 03 00 00 11 02 10 00 01 00 e6 01 00 |................|
000000c0: 00 00 0c 03 5b 00 00 08 bf 0a 11 18 44 e6 00 00 |....[.......D...|
000000d0: 00 0e 29 c8 03 04 00 00 03 04 00                |..)........|
```

### WASM
```
00000000: 01 02 03 04 05                                  |.....|
```