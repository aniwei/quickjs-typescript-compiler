# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler_second/__tests__/compiler/fixtures/unary-ops.ts
**生成时间**: 2025-12-04T06:33:09.828Z

## 大小对比

- TypeScript编译器: 251 字节
- WASM编译器: 208 字节
- 差异: 43 字节 (20.67%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_a",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_b",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_c",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_d",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_e",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_f",
      "offset": 63
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 67
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 79,
    "tag": "0xd",
    "remaining": 172
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 9,
  "atoms": [
    {
      "index": 0,
      "rawLength": 80,
      "actualLength": 40,
      "isWideChar": 0,
      "string": "__tests__/compiler/fixtures/unary-ops.js",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_a",
      "offset": 43
    },
    {
      "index": 2,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_b",
      "offset": 47
    },
    {
      "index": 3,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_c",
      "offset": 51
    },
    {
      "index": 4,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_d",
      "offset": 55
    },
    {
      "index": 5,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_e",
      "offset": 59
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "u_f",
      "offset": 63
    },
    {
      "index": 7,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 67
    },
    {
      "index": 8,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 75
    }
  ],
  "functionHeader": {
    "offset": 79,
    "tag": "0xd",
    "remaining": 129
  }
}
```

## 字节级差异

共发现 148 个字节差异:

- 偏移量 0x5e: TS=0x06 vs WASM=0x00
- 偏移量 0x63: TS=0x42 vs WASM=0x31
- 偏移量 0x64: TS=0x06 vs WASM=0x00
- 偏移量 0x67: TS=0x01 vs WASM=0x00
- 偏移量 0x68: TS=0x00 vs WASM=0x01
- 偏移量 0x69: TS=0x20 vs WASM=0xcc
- 偏移量 0x6a: TS=0xcc vs WASM=0x03
- 偏移量 0x6b: TS=0x03 vs WASM=0x01
- 偏移量 0x6d: TS=0x01 vs WASM=0xce
- 偏移量 0x6e: TS=0x20 vs WASM=0x03
- 偏移量 0x6f: TS=0xce vs WASM=0x02
- 偏移量 0x70: TS=0x03 vs WASM=0x01
- 偏移量 0x71: TS=0x01 vs WASM=0xd0
- 偏移量 0x72: TS=0x02 vs WASM=0x03
- 偏移量 0x73: TS=0x20 vs WASM=0x03
- 偏移量 0x74: TS=0xd0 vs WASM=0x01
- 偏移量 0x75: TS=0x03 vs WASM=0xd2
- 偏移量 0x76: TS=0x01 vs WASM=0x03
- 偏移量 0x77: TS=0x03 vs WASM=0x04
- 偏移量 0x78: TS=0x20 vs WASM=0x01
- ... (显示前20个差异，总共148个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 09 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2e 6a 73 06 75 5f 61 06 |nary-ops.js.u_a.|
00000030: 75 5f 62 06 75 5f 63 06 75 5f 64 06 75 5f 65 06 |u_b.u_c.u_d.u_e.|
00000040: 75 5f 66 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |u_f.console.log.|
00000050: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 06 00 |........ .......|
00000060: 07 06 00 42 06 ca 03 01 00 20 cc 03 01 01 20 ce |...B..... .... .|
00000070: 03 01 02 20 d0 03 01 03 20 d2 03 01 04 20 d4 03 |... .... .... ..|
00000080: 01 05 20 ca 03 00 01 cc 03 01 01 ce 03 02 01 d0 |.. .............|
00000090: 03 03 01 d2 03 04 01 d4 03 05 01 08 ec 02 29 bf |..............).|
000000a0: 0a e3 5a 00 00 8e e4 5a 00 00 98 e5 5a 00 00 97 |..Z....Z....Z...|
000000b0: e6 b7 0e 06 61 04 00 5a 00 00 99 61 05 00 39 eb |....a..Z...a..9.|
000000c0: 00 00 00 43 ec 00 00 00 5a 01 00 5a 02 00 5a 03 |...C....Z..Z..Z.|
000000d0: 00 5a 04 00 5a 05 00 24 05 00 0e 06 2f c8 03 1a |.Z..Z..$..../...|
000000e0: 00 00 26 16 1c 00 1c 00 3b 0c 26 21 1b 0e 1b 0a |..&.....;.&!....|
000000f0: 11 0a 11 0a 11 0a 11 0a 11 29 00                |.........).|
```

### WASM
```
00000000: 05 09 50 5f 5f 74 65 73 74 73 5f 5f 2f 63 6f 6d |..P__tests__/com|
00000010: 70 69 6c 65 72 2f 66 69 78 74 75 72 65 73 2f 75 |piler/fixtures/u|
00000020: 6e 61 72 79 2d 6f 70 73 2e 6a 73 06 75 5f 61 06 |nary-ops.js.u_a.|
00000030: 75 5f 62 06 75 5f 63 06 75 5f 64 06 75 5f 65 06 |u_b.u_c.u_d.u_e.|
00000040: 75 5f 66 0e 63 6f 6e 73 6f 6c 65 06 6c 6f 67 0d |u_f.console.log.|
00000050: c8 03 00 00 00 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000060: 07 06 00 31 00 ca 03 00 01 cc 03 01 01 ce 03 02 |...1............|
00000070: 01 d0 03 03 01 d2 03 04 01 d4 03 05 01 08 ec 02 |................|
00000080: 29 bf 0a e7 8e e4 df 98 e5 df 97 e6 06 61 04 00 |)............a..|
00000090: df 99 61 05 00 39 eb 00 00 00 43 ec 00 00 00 e0 |..a..9....C.....|
000000a0: e1 e2 60 04 00 60 05 00 24 05 00 0e 06 2f c8 03 |..`..`..$..../..|
000000b0: 1e 00 00 21 16 07 01 0d 02 12 00 07 01 22 0e 1c |...!........."..|
000000c0: 21 1b 0e 1b 0a 07 0a 07 0a 07 0a 11 0a 11 29 00 |!.............).|
```