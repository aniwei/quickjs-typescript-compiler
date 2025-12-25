# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures/class-static-private-accessors.ts
**生成时间**: 2025-12-25T08:56:16.104Z

## 大小对比

- TypeScript编译器: 560 字节
- WASM编译器: 560 字节
- 差异: 0 字节 (0.00%)

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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#value",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "#value<set>",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bump",
      "offset": 32
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 37
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 45
    },
    {
      "index": 7,
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-private-accessors.js",
      "offset": 49
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 102
    }
  ],
  "functionHeader": {
    "offset": 104,
    "tag": "0xc",
    "remaining": 456
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
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Counter",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "#x",
      "offset": 10
    },
    {
      "index": 2,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "#value",
      "offset": 13
    },
    {
      "index": 3,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "#value<set>",
      "offset": 20
    },
    {
      "index": 4,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "bump",
      "offset": 32
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "console",
      "offset": 37
    },
    {
      "index": 6,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "log",
      "offset": 45
    },
    {
      "index": 7,
      "rawLength": 104,
      "actualLength": 52,
      "isWideChar": 0,
      "string": "__tests__/fixtures/class-static-private-accessors.js",
      "offset": 49
    },
    {
      "index": 8,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 102
    }
  ],
  "functionHeader": {
    "offset": 104,
    "tag": "0xc",
    "remaining": 456
  }
}
```

## 字节级差异

共发现 0 个字节差异:


## 十六进制转储对比

### TypeScript
```
00000000: 05 09 0e 43 6f 75 6e 74 65 72 04 23 78 0c 23 76 |...Counter.#x.#v|
00000010: 61 6c 75 65 16 23 76 61 6c 75 65 3c 73 65 74 3e |alue.#value<set>|
00000020: 08 62 75 6d 70 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.bump.console.lo|
00000030: 67 68 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |gh__tests__/fixt|
00000040: 75 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 69 |ures/class-stati|
00000050: 63 2d 70 72 69 76 61 74 65 2d 61 63 63 65 73 73 |c-private-access|
00000060: 6f 72 73 2e 6a 73 02 76 0c 00 06 00 a4 01 00 06 |ors.js.v........|
00000070: 00 04 00 05 95 01 06 a6 01 00 00 00 c8 03 02 00 |................|
00000080: 30 ca 03 03 02 75 cc 03 03 03 39 ce 03 03 04 38 |0....u....9....8|
00000090: f0 01 03 05 70 40 e4 00 00 00 80 3f e4 00 00 00 |....p@.....?....|
000000a0: 82 63 01 00 06 63 05 00 63 04 00 63 03 00 63 02 |.c...c..c..c..c.|
000000b0: 00 c1 03 58 e4 00 00 00 00 1b 05 e5 00 00 00 cd |...X............|
000000c0: 1b 1b c2 00 52 ce 1b 1b c2 01 52 c5 04 1b 1b c2 |....R.....R.....|
000000d0: 02 56 e8 00 00 00 00 1b 06 c5 05 0e 11 11 2e d0 |.V..............|
000000e0: 11 c2 04 52 24 00 00 0e 6b 05 00 6b 02 00 3b e4 |...R$...k..k..;.|
000000f0: 00 00 00 39 e9 00 00 00 43 ea 00 00 00 39 e4 00 |...9....C....9..|
00000100: 00 00 43 e8 00 00 00 24 00 00 24 01 00 cb 39 e9 |..C....$..$...9.|
00000110: 00 00 00 43 ea 00 00 00 39 e4 00 00 00 43 e8 00 |...C....9....C..|
00000120: 00 00 24 00 00 24 01 00 cf 28 d6 03 1c 00 00 00 |..$..$...(......|
00000130: 5e 1c 00 1b 0e 1b 0a 1b 0e 1b 0a 11 19 17 15 1b |^...............|
00000140: 0e 1b 0a 1b 0e 1b 0a 11 19 00 0c 4a 07 01 00 00 |...........J....|
00000150: 01 00 02 01 00 06 01 10 00 01 00 ca 03 02 0d 08 |................|
00000160: cb c7 df 45 28 d6 03 06 03 0b 12 10 0c 15 00 0c |...E(...........|
00000170: 4a 07 01 00 01 01 01 04 01 00 08 02 d8 03 00 01 |J...............|
00000180: 00 10 00 01 00 ca 03 02 0d 08 cb c7 d3 15 df 46 |...............F|
00000190: 29 d6 03 06 06 0b 0d 05 07 14 00 0c 42 07 01 00 |)...........B...|
000001a0: 00 01 00 04 02 00 1c 01 10 00 01 00 cc 03 03 0d |................|
000001b0: ce 03 04 0d 08 cb c7 c7 df 2d 24 00 00 b8 9f 15 |.........-$.....|
000001c0: e0 1b 1e 2d 1d 24 01 00 0e 0e c7 df 2d 25 00 00 |...-.$......-%..|
000001d0: d6 03 0e 09 0b 0d 05 07 08 07 1c 20 10 44 1d 0c |........... .D..|
000001e0: 15 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 10 |...@............|
000001f0: 00 01 00 f0 01 05 0d 08 cb 2b 68 00 00 11 ec 06 |.........+h.....|
00000200: c7 1b 24 00 00 29 d6 03 02 0d 00 00 0c 40 05 01 |..$..).......@..|
00000210: 00 00 01 00 03 01 00 09 01 10 00 01 00 ca 03 02 |................|
00000220: 5d 08 cb c7 68 00 00 b8 47 29 d6 03 02 00 00 00 |]...h...G)......|
```

### WASM
```
00000000: 05 09 0e 43 6f 75 6e 74 65 72 04 23 78 0c 23 76 |...Counter.#x.#v|
00000010: 61 6c 75 65 16 23 76 61 6c 75 65 3c 73 65 74 3e |alue.#value<set>|
00000020: 08 62 75 6d 70 0e 63 6f 6e 73 6f 6c 65 06 6c 6f |.bump.console.lo|
00000030: 67 68 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 78 74 |gh__tests__/fixt|
00000040: 75 72 65 73 2f 63 6c 61 73 73 2d 73 74 61 74 69 |ures/class-stati|
00000050: 63 2d 70 72 69 76 61 74 65 2d 61 63 63 65 73 73 |c-private-access|
00000060: 6f 72 73 2e 6a 73 02 76 0c 00 06 00 a4 01 00 06 |ors.js.v........|
00000070: 00 04 00 05 95 01 06 a6 01 00 00 00 c8 03 02 00 |................|
00000080: 30 ca 03 03 02 75 cc 03 03 03 39 ce 03 03 04 38 |0....u....9....8|
00000090: f0 01 03 05 70 40 e4 00 00 00 80 3f e4 00 00 00 |....p@.....?....|
000000a0: 82 63 01 00 06 63 05 00 63 04 00 63 03 00 63 02 |.c...c..c..c..c.|
000000b0: 00 c1 03 58 e4 00 00 00 00 1b 05 e5 00 00 00 cd |...X............|
000000c0: 1b 1b c2 00 52 ce 1b 1b c2 01 52 c5 04 1b 1b c2 |....R.....R.....|
000000d0: 02 56 e8 00 00 00 00 1b 06 c5 05 0e 11 11 2e d0 |.V..............|
000000e0: 11 c2 04 52 24 00 00 0e 6b 05 00 6b 02 00 3b e4 |...R$...k..k..;.|
000000f0: 00 00 00 39 e9 00 00 00 43 ea 00 00 00 39 e4 00 |...9....C....9..|
00000100: 00 00 43 e8 00 00 00 24 00 00 24 01 00 cb 39 e9 |..C....$..$...9.|
00000110: 00 00 00 43 ea 00 00 00 39 e4 00 00 00 43 e8 00 |...C....9....C..|
00000120: 00 00 24 00 00 24 01 00 cf 28 d6 03 1c 00 00 00 |..$..$...(......|
00000130: 5e 1c 00 1b 0e 1b 0a 1b 0e 1b 0a 11 19 17 15 1b |^...............|
00000140: 0e 1b 0a 1b 0e 1b 0a 11 19 00 0c 4a 07 01 00 00 |...........J....|
00000150: 01 00 02 01 00 06 01 10 00 01 00 ca 03 02 0d 08 |................|
00000160: cb c7 df 45 28 d6 03 06 03 0b 12 10 0c 15 00 0c |...E(...........|
00000170: 4a 07 01 00 01 01 01 04 01 00 08 02 d8 03 00 01 |J...............|
00000180: 00 10 00 01 00 ca 03 02 0d 08 cb c7 d3 15 df 46 |...............F|
00000190: 29 d6 03 06 06 0b 0d 05 07 14 00 0c 42 07 01 00 |)...........B...|
000001a0: 00 01 00 04 02 00 1c 01 10 00 01 00 cc 03 03 0d |................|
000001b0: ce 03 04 0d 08 cb c7 c7 df 2d 24 00 00 b8 9f 15 |.........-$.....|
000001c0: e0 1b 1e 2d 1d 24 01 00 0e 0e c7 df 2d 25 00 00 |...-.$......-%..|
000001d0: d6 03 0e 09 0b 0d 05 07 08 07 1c 20 10 44 1d 0c |........... .D..|
000001e0: 15 00 0c 40 05 01 00 00 01 00 02 01 00 0f 01 10 |...@............|
000001f0: 00 01 00 f0 01 05 0d 08 cb 2b 68 00 00 11 ec 06 |.........+h.....|
00000200: c7 1b 24 00 00 29 d6 03 02 0d 00 00 0c 40 05 01 |..$..).......@..|
00000210: 00 00 01 00 03 01 00 09 01 10 00 01 00 ca 03 02 |................|
00000220: 5d 08 cb c7 68 00 00 b8 47 29 d6 03 02 00 00 00 |]...h...G)......|
```