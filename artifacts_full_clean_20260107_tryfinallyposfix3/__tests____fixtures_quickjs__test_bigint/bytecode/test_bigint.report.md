# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/test_bigint.ts
**生成时间**: 2026-01-07T15:08:34.717Z

## 大小对比

- TypeScript编译器: 7156 字节
- WASM编译器: 7151 字节
- 差异: 5 字节 (0.07%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 79,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "assertThrows",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bigint_pow",
      "offset": 24
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 35
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_eq",
      "offset": 45
    },
    {
      "index": 6,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint1",
      "offset": 53
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint2",
      "offset": 66
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint3",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "floor_log2",
      "offset": 92
    },
    {
      "index": 10,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "ceil_log2",
      "offset": 103
    },
    {
      "index": 11,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "int_sqrt",
      "offset": 113
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "calc_pi",
      "offset": 122
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "compute_pi",
      "offset": 130
    },
    {
      "index": 14,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_pi",
      "offset": 141
    },
    {
      "index": 15,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "use strict",
      "offset": 149
    },
    {
      "index": 16,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 160
    },
    {
      "index": 17,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 173
    },
    {
      "index": 18,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_bigint.js",
      "offset": 188
    },
    {
      "index": 19,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 230
    },
    {
      "index": 20,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 237
    },
    {
      "index": 21,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 246
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 270
    },
    {
      "index": 23,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 272
    },
    {
      "index": 24,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 285
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 288
    },
    {
      "index": 26,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 290
    },
    {
      "index": 27,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 294
    },
    {
      "index": 28,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 299
    },
    {
      "index": 29,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 302
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 321
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 323
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 325
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 327
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 329
    },
    {
      "index": 35,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 331
    },
    {
      "index": 36,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 31n === 2147483648n",
      "offset": 336
    },
    {
      "index": 37,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 32n === 4294967296n",
      "offset": 361
    },
    {
      "index": 38,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "  123",
      "offset": 386
    },
    {
      "index": 39,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123   ",
      "offset": 392
    },
    {
      "index": 40,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 401
    },
    {
      "index": 41,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 403
    },
    {
      "index": 42,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 405
    },
    {
      "index": 43,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 408
    },
    {
      "index": 44,
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "1267650600228229401496703205376",
      "offset": 417
    },
    {
      "index": 45,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "-3ewfdnca0n6ld1ggvfgg",
      "offset": 449
    },
    {
      "index": 46,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "2000000000000000000000000000000000",
      "offset": 471
    },
    {
      "index": 47,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "k_max",
      "offset": 506
    },
    {
      "index": 48,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "a1",
      "offset": 512
    },
    {
      "index": 49,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 515
    },
    {
      "index": 50,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 517
    },
    {
      "index": 51,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "u",
      "offset": 519
    },
    {
      "index": 52,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 521
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 523
    },
    {
      "index": 54,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "CHUD_A",
      "offset": 528
    },
    {
      "index": 55,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "CHUD_B",
      "offset": 535
    },
    {
      "index": 56,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "CHUD_C",
      "offset": 542
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "CHUD_C3",
      "offset": 549
    },
    {
      "index": 58,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "CHUD_BITS_PER_TERM",
      "offset": 557
    },
    {
      "index": 59,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "chud_bs",
      "offset": 576
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "P",
      "offset": 584
    },
    {
      "index": 61,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "Q",
      "offset": 586
    },
    {
      "index": 62,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "G",
      "offset": 588
    },
    {
      "index": 63,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 590
    },
    {
      "index": 64,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "need_G",
      "offset": 595
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 602
    },
    {
      "index": 66,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "P1",
      "offset": 604
    },
    {
      "index": 67,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Q1",
      "offset": 607
    },
    {
      "index": 68,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "G1",
      "offset": 610
    },
    {
      "index": 69,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "P2",
      "offset": 613
    },
    {
      "index": 70,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Q2",
      "offset": 616
    },
    {
      "index": 71,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "G2",
      "offset": 619
    },
    {
      "index": 72,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "n_digits",
      "offset": 622
    },
    {
      "index": 73,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "n_bits",
      "offset": 631
    },
    {
      "index": 74,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "out",
      "offset": 638
    },
    {
      "index": 75,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "log2",
      "offset": 642
    },
    {
      "index": 76,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ".",
      "offset": 647
    },
    {
      "index": 77,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "slice",
      "offset": 649
    },
    {
      "index": 78,
      "rawLength": 4004,
      "actualLength": 2002,
      "isWideChar": 0,
      "string": "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009",
      "offset": 655
    }
  ],
  "functionHeader": {
    "offset": 2659,
    "tag": "0xc",
    "remaining": 4497
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 79,
  "atoms": [
    {
      "index": 0,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "e",
      "offset": 2
    },
    {
      "index": 1,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "assert",
      "offset": 4
    },
    {
      "index": 2,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "assertThrows",
      "offset": 11
    },
    {
      "index": 3,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "bigint_pow",
      "offset": 24
    },
    {
      "index": 4,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "test_less",
      "offset": 35
    },
    {
      "index": 5,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_eq",
      "offset": 45
    },
    {
      "index": 6,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint1",
      "offset": 53
    },
    {
      "index": 7,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint2",
      "offset": 66
    },
    {
      "index": 8,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "test_bigint3",
      "offset": 79
    },
    {
      "index": 9,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "floor_log2",
      "offset": 92
    },
    {
      "index": 10,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "ceil_log2",
      "offset": 103
    },
    {
      "index": 11,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "int_sqrt",
      "offset": 113
    },
    {
      "index": 12,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "calc_pi",
      "offset": 122
    },
    {
      "index": 13,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "compute_pi",
      "offset": 130
    },
    {
      "index": 14,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "test_pi",
      "offset": 141
    },
    {
      "index": 15,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "use strict",
      "offset": 149
    },
    {
      "index": 16,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "__loadScript",
      "offset": 160
    },
    {
      "index": 17,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "test_assert.js",
      "offset": 173
    },
    {
      "index": 18,
      "rawLength": 82,
      "actualLength": 41,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/test_bigint.js",
      "offset": 188
    },
    {
      "index": 19,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "actual",
      "offset": 230
    },
    {
      "index": 20,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "expected",
      "offset": 237
    },
    {
      "index": 21,
      "rawLength": 46,
      "actualLength": 23,
      "isWideChar": 0,
      "string": "assertion failed: got |",
      "offset": 246
    },
    {
      "index": 22,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "|",
      "offset": 270
    },
    {
      "index": 23,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": ", expected |",
      "offset": 272
    },
    {
      "index": 24,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": " (",
      "offset": 285
    },
    {
      "index": 25,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 288
    },
    {
      "index": 26,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "err",
      "offset": 290
    },
    {
      "index": 27,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "func",
      "offset": 294
    },
    {
      "index": 28,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "ex",
      "offset": 299
    },
    {
      "index": 29,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "exception expected",
      "offset": 302
    },
    {
      "index": 30,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "a",
      "offset": 321
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "n",
      "offset": 323
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 325
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 327
    },
    {
      "index": 34,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 329
    },
    {
      "index": 35,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 331
    },
    {
      "index": 36,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 31n === 2147483648n",
      "offset": 336
    },
    {
      "index": 37,
      "rawLength": 48,
      "actualLength": 24,
      "isWideChar": 0,
      "string": "1 << 32n === 4294967296n",
      "offset": 361
    },
    {
      "index": 38,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "  123",
      "offset": 386
    },
    {
      "index": 39,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123   ",
      "offset": 392
    },
    {
      "index": 40,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "+",
      "offset": 401
    },
    {
      "index": 41,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "-",
      "offset": 403
    },
    {
      "index": 42,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "\u0000a",
      "offset": 405
    },
    {
      "index": 43,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "  123  r",
      "offset": 408
    },
    {
      "index": 44,
      "rawLength": 62,
      "actualLength": 31,
      "isWideChar": 0,
      "string": "1267650600228229401496703205376",
      "offset": 417
    },
    {
      "index": 45,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "-3ewfdnca0n6ld1ggvfgg",
      "offset": 449
    },
    {
      "index": 46,
      "rawLength": 68,
      "actualLength": 34,
      "isWideChar": 0,
      "string": "2000000000000000000000000000000000",
      "offset": 471
    },
    {
      "index": 47,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "k_max",
      "offset": 506
    },
    {
      "index": 48,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "a1",
      "offset": 512
    },
    {
      "index": 49,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "k",
      "offset": 515
    },
    {
      "index": 50,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "l",
      "offset": 517
    },
    {
      "index": 51,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "u",
      "offset": 519
    },
    {
      "index": 52,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 521
    },
    {
      "index": 53,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "prec",
      "offset": 523
    },
    {
      "index": 54,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "CHUD_A",
      "offset": 528
    },
    {
      "index": 55,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "CHUD_B",
      "offset": 535
    },
    {
      "index": 56,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "CHUD_C",
      "offset": 542
    },
    {
      "index": 57,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "CHUD_C3",
      "offset": 549
    },
    {
      "index": 58,
      "rawLength": 36,
      "actualLength": 18,
      "isWideChar": 0,
      "string": "CHUD_BITS_PER_TERM",
      "offset": 557
    },
    {
      "index": 59,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "chud_bs",
      "offset": 576
    },
    {
      "index": 60,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "P",
      "offset": 584
    },
    {
      "index": 61,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "Q",
      "offset": 586
    },
    {
      "index": 62,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "G",
      "offset": 588
    },
    {
      "index": 63,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "ceil",
      "offset": 590
    },
    {
      "index": 64,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "need_G",
      "offset": 595
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "c",
      "offset": 602
    },
    {
      "index": 66,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "P1",
      "offset": 604
    },
    {
      "index": 67,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Q1",
      "offset": 607
    },
    {
      "index": 68,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "G1",
      "offset": 610
    },
    {
      "index": 69,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "P2",
      "offset": 613
    },
    {
      "index": 70,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Q2",
      "offset": 616
    },
    {
      "index": 71,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "G2",
      "offset": 619
    },
    {
      "index": 72,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "n_digits",
      "offset": 622
    },
    {
      "index": 73,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "n_bits",
      "offset": 631
    },
    {
      "index": 74,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "out",
      "offset": 638
    },
    {
      "index": 75,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "log2",
      "offset": 642
    },
    {
      "index": 76,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ".",
      "offset": 647
    },
    {
      "index": 77,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "slice",
      "offset": 649
    },
    {
      "index": 78,
      "rawLength": 4004,
      "actualLength": 2002,
      "isWideChar": 0,
      "string": "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019893809525720106548586327886593615338182796823030195203530185296899577362259941389124972177528347913151557485724245415069595082953311686172785588907509838175463746493931925506040092770167113900984882401285836160356370766010471018194295559619894676783744944825537977472684710404753464620804668425906949129331367702898915210475216205696602405803815019351125338243003558764024749647326391419927260426992279678235478163600934172164121992458631503028618297455570674983850549458858692699569092721079750930295532116534498720275596023648066549911988183479775356636980742654252786255181841757467289097777279380008164706001614524919217321721477235014144197356854816136115735255213347574184946843852332390739414333454776241686251898356948556209921922218427255025425688767179049460165346680498862723279178608578438382796797668145410095388378636095068006422512520511739298489608412848862694560424196528502221066118630674427862203919494504712371378696095636437191728746776465757396241389086583264599581339047802759009",
      "offset": 655
    }
  ],
  "functionHeader": {
    "offset": 2659,
    "tag": "0xc",
    "remaining": 4492
  }
}
```

## 字节级差异

共发现 2135 个字节差异:

- 偏移量 0x120a: TS=0xd9 vs WASM=0xd4
- 偏移量 0x1272: TS=0x01 vs WASM=0xff
- 偏移量 0x1273: TS=0x00 vs WASM=0xff
- 偏移量 0x1274: TS=0x00 vs WASM=0xff
- 偏移量 0x1275: TS=0x00 vs WASM=0xff
- 偏移量 0x1276: TS=0x8e vs WASM=0xb4
- 偏移量 0x1277: TS=0xb4 vs WASM=0x64
- 偏移量 0x1278: TS=0x64 vs WASM=0x00
- 偏移量 0x127b: TS=0x00 vs WASM=0xa2
- 偏移量 0x127c: TS=0xa2 vs WASM=0x43
- 偏移量 0x127d: TS=0x43 vs WASM=0x39
- 偏移量 0x127e: TS=0x39 vs WASM=0x00
- 偏移量 0x1281: TS=0x00 vs WASM=0xbf
- 偏移量 0x1282: TS=0xbf vs WASM=0x24
- 偏移量 0x1284: TS=0x24 vs WASM=0x01
- 偏移量 0x1285: TS=0x01 vs WASM=0x00
- 偏移量 0x1286: TS=0x00 vs WASM=0x04
- 偏移量 0x1287: TS=0x04 vs WASM=0x11
- 偏移量 0x1288: TS=0x11 vs WASM=0x01
- 偏移量 0x1289: TS=0x01 vs WASM=0x00
- ... (显示前20个差异，总共2135个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 4f 02 65 0c 61 73 73 65 72 74 18 61 73 73 65 |.O.e.assert.asse|
00000010: 72 74 54 68 72 6f 77 73 14 62 69 67 69 6e 74 5f |rtThrows.bigint_|
00000020: 70 6f 77 12 74 65 73 74 5f 6c 65 73 73 0e 74 65 |pow.test_less.te|
00000030: 73 74 5f 65 71 18 74 65 73 74 5f 62 69 67 69 6e |st_eq.test_bigin|
00000040: 74 31 18 74 65 73 74 5f 62 69 67 69 6e 74 32 18 |t1.test_bigint2.|
00000050: 74 65 73 74 5f 62 69 67 69 6e 74 33 14 66 6c 6f |test_bigint3.flo|
00000060: 6f 72 5f 6c 6f 67 32 12 63 65 69 6c 5f 6c 6f 67 |or_log2.ceil_log|
00000070: 32 10 69 6e 74 5f 73 71 72 74 0e 63 61 6c 63 5f |2.int_sqrt.calc_|
00000080: 70 69 14 63 6f 6d 70 75 74 65 5f 70 69 0e 74 65 |pi.compute_pi.te|
00000090: 73 74 5f 70 69 14 75 73 65 20 73 74 72 69 63 74 |st_pi.use strict|
000000a0: 18 5f 5f 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 |.__loadScript.te|
000000b0: 73 74 5f 61 73 73 65 72 74 2e 6a 73 52 5f 5f 74 |st_assert.jsR__t|
000000c0: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 5f |ests__/fixtures_|
000000d0: 71 75 69 63 6b 6a 73 2f 74 65 73 74 5f 62 69 67 |quickjs/test_big|
000000e0: 69 6e 74 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 |int.js.actual.ex|
000000f0: 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f 6e |pected.assertion|
00000100: 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c | failed: got |.||
00000110: 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 28 |., expected |. (|
00000120: 02 29 06 65 72 72 08 66 75 6e 63 04 65 78 24 65 |.).err.func.ex$e|
00000130: 78 63 65 70 74 69 6f 6e 20 65 78 70 65 63 74 65 |xception expecte|
00000140: 64 02 61 02 6e 02 72 02 69 02 62 08 73 71 72 74 |d.a.n.r.i.b.sqrt|
00000150: 30 31 20 3c 3c 20 33 31 6e 20 3d 3d 3d 20 32 31 |01 << 31n === 21|
00000160: 34 37 34 38 33 36 34 38 6e 30 31 20 3c 3c 20 33 |47483648n01 << 3|
00000170: 32 6e 20 3d 3d 3d 20 34 32 39 34 39 36 37 32 39 |2n === 429496729|
00000180: 36 6e 0a 20 20 31 32 33 10 20 20 31 32 33 20 20 |6n.  123.  123  |
00000190: 20 02 2b 02 2d 04 00 61 10 20 20 31 32 33 20 20 | .+.-..a.  123  |
000001a0: 72 3e 31 32 36 37 36 35 30 36 30 30 32 32 38 32 |r>12676506002282|
000001b0: 32 39 34 30 31 34 39 36 37 30 33 32 30 35 33 37 |2940149670320537|
000001c0: 36 2a 2d 33 65 77 66 64 6e 63 61 30 6e 36 6c 64 |6*-3ewfdnca0n6ld|
000001d0: 31 67 67 76 66 67 67 44 32 30 30 30 30 30 30 30 |1ggvfggD20000000|
000001e0: 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 |0000000000000000|
000001f0: 30 30 30 30 30 30 30 30 30 30 0a 6b 5f 6d 61 78 |0000000000.k_max|
00000200: 04 61 31 02 6b 02 6c 02 75 02 73 08 70 72 65 63 |.a1.k.l.u.s.prec|
00000210: 0c 43 48 55 44 5f 41 0c 43 48 55 44 5f 42 0c 43 |.CHUD_A.CHUD_B.C|
00000220: 48 55 44 5f 43 0e 43 48 55 44 5f 43 33 24 43 48 |HUD_C.CHUD_C3$CH|
00000230: 55 44 5f 42 49 54 53 5f 50 45 52 5f 54 45 52 4d |UD_BITS_PER_TERM|
00000240: 0e 63 68 75 64 5f 62 73 02 50 02 51 02 47 08 63 |.chud_bs.P.Q.G.c|
00000250: 65 69 6c 0c 6e 65 65 64 5f 47 02 63 04 50 31 04 |eil.need_G.c.P1.|
00000260: 51 31 04 47 31 04 50 32 04 51 32 04 47 32 10 6e |Q1.G1.P2.Q2.G2.n|
00000270: 5f 64 69 67 69 74 73 0c 6e 5f 62 69 74 73 06 6f |_digits.n_bits.o|
00000280: 75 74 08 6c 6f 67 32 02 2e 0a 73 6c 69 63 65 a4 |ut.log2...slice.|
00000290: 1f 33 2e 31 34 31 35 39 32 36 35 33 35 38 39 37 |.3.1415926535897|
000002a0: 39 33 32 33 38 34 36 32 36 34 33 33 38 33 32 37 |9323846264338327|
000002b0: 39 35 30 32 38 38 34 31 39 37 31 36 39 33 39 39 |9502884197169399|
000002c0: 33 37 35 31 30 35 38 32 30 39 37 34 39 34 34 35 |3751058209749445|
000002d0: 39 32 33 30 37 38 31 36 34 30 36 32 38 36 32 30 |9230781640628620|
000002e0: 38 39 39 38 36 32 38 30 33 34 38 32 35 33 34 32 |8998628034825342|
000002f0: 31 31 37 30 36 37 39 38 32 31 34 38 30 38 36 35 |1170679821480865|
00000300: 31 33 32 38 32 33 30 36 36 34 37 30 39 33 38 34 |1328230664709384|
00000310: 34 36 30 39 35 35 30 35 38 32 32 33 31 37 32 35 |4609550582231725|
00000320: 33 35 39 34 30 38 31 32 38 34 38 31 31 31 37 34 |3594081284811174|
00000330: 35 30 32 38 34 31 30 32 37 30 31 39 33 38 35 32 |5028410270193852|
00000340: 31 31 30 35 35 35 39 36 34 34 36 32 32 39 34 38 |1105559644622948|
00000350: 39 35 34 39 33 30 33 38 31 39 36 34 34 32 38 38 |9549303819644288|
00000360: 31 30 39 37 35 36 36 35 39 33 33 34 34 36 31 32 |1097566593344612|
00000370: 38 34 37 35 36 34 38 32 33 33 37 38 36 37 38 33 |8475648233786783|
00000380: 31 36 35 32 37 31 32 30 31 39 30 39 31 34 35 36 |1652712019091456|
00000390: 34 38 35 36 36 39 32 33 34 36 30 33 34 38 36 31 |4856692346034861|
000003a0: 30 34 35 34 33 32 36 36 34 38 32 31 33 33 39 33 |0454326648213393|
000003b0: 36 30 37 32 36 30 32 34 39 31 34 31 32 37 33 37 |6072602491412737|
000003c0: 32 34 35 38 37 30 30 36 36 30 36 33 31 35 35 38 |2458700660631558|
000003d0: 38 31 37 34 38 38 31 35 32 30 39 32 30 39 36 32 |8174881520920962|
000003e0: 38 32 39 32 35 34 30 39 31 37 31 35 33 36 34 33 |8292540917153643|
000003f0: 36 37 38 39 32 35 39 30 33 36 30 30 31 31 33 33 |6789259036001133|
00000400: 30 35 33 30 35 34 38 38 32 30 34 36 36 35 32 31 |0530548820466521|
00000410: 33 38 34 31 34 36 39 35 31 39 34 31 35 31 31 36 |3841469519415116|
00000420: 30 39 34 33 33 30 35 37 32 37 30 33 36 35 37 35 |0943305727036575|
00000430: 39 35 39 31 39 35 33 30 39 32 31 38 36 31 31 37 |9591953092186117|
00000440: 33 38 31 39 33 32 36 31 31 37 39 33 31 30 35 31 |3819326117931051|
00000450: 31 38 35 34 38 30 37 34 34 36 32 33 37 39 39 36 |1854807446237996|
00000460: 32 37 34 39 35 36 37 33 35 31 38 38 35 37 35 32 |2749567351885752|
00000470: 37 32 34 38 39 31 32 32 37 39 33 38 31 38 33 30 |7248912279381830|
00000480: 31 31 39 34 39 31 32 39 38 33 33 36 37 33 33 36 |1194912983367336|
00000490: 32 34 34 30 36 35 36 36 34 33 30 38 36 30 32 31 |2440656643086021|
000004a0: 33 39 34 39 34 36 33 39 35 32 32 34 37 33 37 31 |3949463952247371|
000004b0: 39 30 37 30 32 31 37 39 38 36 30 39 34 33 37 30 |9070217986094370|
000004c0: 32 37 37 30 35 33 39 32 31 37 31 37 36 32 39 33 |2770539217176293|
000004d0: 31 37 36 37 35 32 33 38 34 36 37 34 38 31 38 34 |1767523846748184|
000004e0: 36 37 36 36 39 34 30 35 31 33 32 30 30 30 35 36 |6766940513200056|
000004f0: 38 31 32 37 31 34 35 32 36 33 35 36 30 38 32 37 |8127145263560827|
00000500: 37 38 35 37 37 31 33 34 32 37 35 37 37 38 39 36 |7857713427577896|
00000510: 30 39 31 37 33 36 33 37 31 37 38 37 32 31 34 36 |0917363717872146|
00000520: 38 34 34 30 39 30 31 32 32 34 39 35 33 34 33 30 |8440901224953430|
00000530: 31 34 36 35 34 39 35 38 35 33 37 31 30 35 30 37 |1465495853710507|
00000540: 39 32 32 37 39 36 38 39 32 35 38 39 32 33 35 34 |9227968925892354|
00000550: 32 30 31 39 39 35 36 31 31 32 31 32 39 30 32 31 |2019956112129021|
00000560: 39 36 30 38 36 34 30 33 34 34 31 38 31 35 39 38 |9608640344181598|
00000570: 31 33 36 32 39 37 37 34 37 37 31 33 30 39 39 36 |1362977477130996|
00000580: 30 35 31 38 37 30 37 32 31 31 33 34 39 39 39 39 |0518707211349999|
00000590: 39 39 38 33 37 32 39 37 38 30 34 39 39 35 31 30 |9983729780499510|
000005a0: 35 39 37 33 31 37 33 32 38 31 36 30 39 36 33 31 |5973173281609631|
000005b0: 38 35 39 35 30 32 34 34 35 39 34 35 35 33 34 36 |8595024459455346|
000005c0: 39 30 38 33 30 32 36 34 32 35 32 32 33 30 38 32 |9083026425223082|
000005d0: 35 33 33 34 34 36 38 35 30 33 35 32 36 31 39 33 |5334468503526193|
000005e0: 31 31 38 38 31 37 31 30 31 30 30 30 33 31 33 37 |1188171010003137|
000005f0: 38 33 38 37 35 32 38 38 36 35 38 37 35 33 33 32 |8387528865875332|
00000600: 30 38 33 38 31 34 32 30 36 31 37 31 37 37 36 36 |0838142061717766|
00000610: 39 31 34 37 33 30 33 35 39 38 32 35 33 34 39 30 |9147303598253490|
00000620: 34 32 38 37 35 35 34 36 38 37 33 31 31 35 39 35 |4287554687311595|
00000630: 36 32 38 36 33 38 38 32 33 35 33 37 38 37 35 39 |6286388235378759|
00000640: 33 37 35 31 39 35 37 37 38 31 38 35 37 37 38 30 |3751957781857780|
00000650: 35 33 32 31 37 31 32 32 36 38 30 36 36 31 33 30 |5321712268066130|
00000660: 30 31 39 32 37 38 37 36 36 31 31 31 39 35 39 30 |0192787661119590|
00000670: 39 32 31 36 34 32 30 31 39 38 39 33 38 30 39 35 |9216420198938095|
00000680: 32 35 37 32 30 31 30 36 35 34 38 35 38 36 33 32 |2572010654858632|
00000690: 37 38 38 36 35 39 33 36 31 35 33 33 38 31 38 32 |7886593615338182|
000006a0: 37 39 36 38 32 33 30 33 30 31 39 35 32 30 33 35 |7968230301952035|
000006b0: 33 30 31 38 35 32 39 36 38 39 39 35 37 37 33 36 |3018529689957736|
000006c0: 32 32 35 39 39 34 31 33 38 39 31 32 34 39 37 32 |2259941389124972|
000006d0: 31 37 37 35 32 38 33 34 37 39 31 33 31 35 31 35 |1775283479131515|
000006e0: 35 37 34 38 35 37 32 34 32 34 35 34 31 35 30 36 |5748572424541506|
000006f0: 39 35 39 35 30 38 32 39 35 33 33 31 31 36 38 36 |9595082953311686|
00000700: 31 37 32 37 38 35 35 38 38 39 30 37 35 30 39 38 |1727855889075098|
00000710: 33 38 31 37 35 34 36 33 37 34 36 34 39 33 39 33 |3817546374649393|
00000720: 31 39 32 35 35 30 36 30 34 30 30 39 32 37 37 30 |1925506040092770|
00000730: 31 36 37 31 31 33 39 30 30 39 38 34 38 38 32 34 |1671139009848824|
00000740: 30 31 32 38 35 38 33 36 31 36 30 33 35 36 33 37 |0128583616035637|
00000750: 30 37 36 36 30 31 30 34 37 31 30 31 38 31 39 34 |0766010471018194|
00000760: 32 39 35 35 35 39 36 31 39 38 39 34 36 37 36 37 |2955596198946767|
00000770: 38 33 37 34 34 39 34 34 38 32 35 35 33 37 39 37 |8374494482553797|
00000780: 37 34 37 32 36 38 34 37 31 30 34 30 34 37 35 33 |7472684710404753|
00000790: 34 36 34 36 32 30 38 30 34 36 36 38 34 32 35 39 |4646208046684259|
000007a0: 30 36 39 34 39 31 32 39 33 33 31 33 36 37 37 30 |0694912933136770|
000007b0: 32 38 39 38 39 31 35 32 31 30 34 37 35 32 31 36 |2898915210475216|
000007c0: 32 30 35 36 39 36 36 30 32 34 30 35 38 30 33 38 |2056966024058038|
000007d0: 31 35 30 31 39 33 35 31 31 32 35 33 33 38 32 34 |1501935112533824|
000007e0: 33 30 30 33 35 35 38 37 36 34 30 32 34 37 34 39 |3003558764024749|
000007f0: 36 34 37 33 32 36 33 39 31 34 31 39 39 32 37 32 |6473263914199272|
00000800: 36 30 34 32 36 39 39 32 32 37 39 36 37 38 32 33 |6042699227967823|
00000810: 35 34 37 38 31 36 33 36 30 30 39 33 34 31 37 32 |5478163600934172|
00000820: 31 36 34 31 32 31 39 39 32 34 35 38 36 33 31 35 |1641219924586315|
00000830: 30 33 30 32 38 36 31 38 32 39 37 34 35 35 35 37 |0302861829745557|
00000840: 30 36 37 34 39 38 33 38 35 30 35 34 39 34 35 38 |0674983850549458|
00000850: 38 35 38 36 39 32 36 39 39 35 36 39 30 39 32 37 |8586926995690927|
00000860: 32 31 30 37 39 37 35 30 39 33 30 32 39 35 35 33 |2107975093029553|
00000870: 32 31 31 36 35 33 34 34 39 38 37 32 30 32 37 35 |2116534498720275|
00000880: 35 39 36 30 32 33 36 34 38 30 36 36 35 34 39 39 |5960236480665499|
00000890: 31 31 39 38 38 31 38 33 34 37 39 37 37 35 33 35 |1198818347977535|
000008a0: 36 36 33 36 39 38 30 37 34 32 36 35 34 32 35 32 |6636980742654252|
000008b0: 37 38 36 32 35 35 31 38 31 38 34 31 37 35 37 34 |7862551818417574|
000008c0: 36 37 32 38 39 30 39 37 37 37 37 32 37 39 33 38 |6728909777727938|
000008d0: 30 30 30 38 31 36 34 37 30 36 30 30 31 36 31 34 |0008164706001614|
000008e0: 35 32 34 39 31 39 32 31 37 33 32 31 37 32 31 34 |5249192173217214|
000008f0: 37 37 32 33 35 30 31 34 31 34 34 31 39 37 33 35 |7723501414419735|
00000900: 36 38 35 34 38 31 36 31 33 36 31 31 35 37 33 35 |6854816136115735|
00000910: 32 35 35 32 31 33 33 34 37 35 37 34 31 38 34 39 |2552133475741849|
00000920: 34 36 38 34 33 38 35 32 33 33 32 33 39 30 37 33 |4684385233239073|
00000930: 39 34 31 34 33 33 33 34 35 34 37 37 36 32 34 31 |9414333454776241|
00000940: 36 38 36 32 35 31 38 39 38 33 35 36 39 34 38 35 |6862518983569485|
00000950: 35 36 32 30 39 39 32 31 39 32 32 32 31 38 34 32 |5620992192221842|
00000960: 37 32 35 35 30 32 35 34 32 35 36 38 38 37 36 37 |7255025425688767|
00000970: 31 37 39 30 34 39 34 36 30 31 36 35 33 34 36 36 |1790494601653466|
00000980: 38 30 34 39 38 38 36 32 37 32 33 32 37 39 31 37 |8049886272327917|
00000990: 38 36 30 38 35 37 38 34 33 38 33 38 32 37 39 36 |8608578438382796|
000009a0: 37 39 37 36 36 38 31 34 35 34 31 30 30 39 35 33 |7976681454100953|
000009b0: 38 38 33 37 38 36 33 36 30 39 35 30 36 38 30 30 |8837863609506800|
000009c0: 36 34 32 32 35 31 32 35 32 30 35 31 31 37 33 39 |6422512520511739|
000009d0: 32 39 38 34 38 39 36 30 38 34 31 32 38 34 38 38 |2984896084128488|
000009e0: 36 32 36 39 34 35 36 30 34 32 34 31 39 36 35 32 |6269456042419652|
000009f0: 38 35 30 32 32 32 31 30 36 36 31 31 38 36 33 30 |8502221066118630|
00000a00: 36 37 34 34 32 37 38 36 32 32 30 33 39 31 39 34 |6744278622039194|
00000a10: 39 34 35 30 34 37 31 32 33 37 31 33 37 38 36 39 |9450471237137869|
00000a20: 36 30 39 35 36 33 36 34 33 37 31 39 31 37 32 38 |6095636437191728|
00000a30: 37 34 36 37 37 36 34 36 35 37 35 37 33 39 36 32 |7467764657573962|
00000a40: 34 31 33 38 39 30 38 36 35 38 33 32 36 34 35 39 |4138908658326459|
00000a50: 39 35 38 31 33 33 39 30 34 37 38 30 32 37 35 39 |9581339047802759|
00000a60: 30 30 39 0c 00 06 01 a4 01 00 02 00 03 00 0e 87 |009.............|
00000a70: 02 02 a6 01 00 00 00 c8 03 03 00 03 40 e5 00 00 |............@...|
00000a80: 00 40 40 e6 00 00 00 40 40 e7 00 00 00 40 40 e8 |.@@....@@....@@.|
00000a90: 00 00 00 40 40 e9 00 00 00 40 40 ea 00 00 00 40 |...@@....@@....@|
00000aa0: 40 eb 00 00 00 40 40 ec 00 00 00 40 40 ed 00 00 |@....@@....@@...|
00000ab0: 00 40 40 ee 00 00 00 40 40 ef 00 00 00 40 40 f0 |.@@....@@....@@.|
00000ac0: 00 00 00 40 40 f1 00 00 00 40 40 f2 00 00 00 40 |...@@....@@....@|
00000ad0: c2 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 |..A.......A.....|
00000ae0: c2 02 41 e7 00 00 00 00 c2 03 41 e8 00 00 00 00 |..A.......A.....|
00000af0: c2 04 41 e9 00 00 00 00 c2 05 41 ea 00 00 00 00 |..A.......A.....|
00000b00: c2 06 41 eb 00 00 00 00 c2 07 41 ec 00 00 00 00 |..A.......A.....|
00000b10: c2 08 41 ed 00 00 00 00 c2 09 41 ee 00 00 00 00 |..A.......A.....|
00000b20: c2 0a 41 ef 00 00 00 00 c2 0b 41 f0 00 00 00 00 |..A.......A.....|
00000b30: c2 0c 41 f1 00 00 00 00 c2 0d 41 f2 00 00 00 00 |..A.......A.....|
00000b40: 04 f3 00 00 00 cb 06 cb 6f 13 00 00 00 39 f4 00 |........o....9..|
00000b50: 00 00 04 f5 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 |.............o..|
00000b60: 00 00 0e ee 02 30 39 ea 00 00 00 f0 cb 39 eb 00 |.....09......9..|
00000b70: 00 00 f0 cb 39 ec 00 00 00 f0 cb 39 f2 00 00 00 |....9......9....|
00000b80: f0 cf 28 ec 03 1c 00 00 00 d1 01 38 08 34 18 00 |..(........8.4..|
00000b90: 0f e4 02 1f 1b 18 0d 17 1b 18 0d 17 1b 18 0d 17 |................|
00000ba0: 1b 0e 00 0c 43 06 01 ca 03 03 01 03 04 00 00 79 |....C..........y|
00000bb0: 04 ee 03 00 01 00 f0 03 00 01 00 68 00 01 00 9e |...........h....|
00000bc0: 01 00 01 00 0c 00 cb c7 eb b8 ab ec 03 0a d8 d3 |................|
00000bd0: d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 |....).../...+...|
00000be0: 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec |K.....!...K.....|
00000bf0: 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 |..C9...$...C9...|
00000c00: 24 00 00 ad ec 02 29 39 9f 00 00 00 04 f9 00 00 |$.....)9........|
00000c10: 00 d3 9f 04 fa 00 00 00 9f 04 fb 00 00 00 9f d4 |................|
00000c20: 9f 04 fa 00 00 00 9f d5 ec 10 04 fc 00 00 00 d5 |................|
00000c30: 9f 04 fd 00 00 00 9f ee 02 c3 9f f1 30 ec 03 50 |............0..P|
00000c40: 01 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 |.........!......|
00000c50: 12 0d 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c |...........#../,|
00000c60: 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..0Y...........)|
00000c70: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
00000c80: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
00000c90: 00 0c 43 06 01 cc 03 02 02 02 04 00 00 31 04 fc |..C..........1..|
00000ca0: 03 00 01 00 fe 03 00 01 00 80 04 00 00 00 c8 03 |................|
00000cb0: 03 00 03 09 cb 6f 0a 00 00 00 d4 f0 0e 0e ee 17 |.....o..........|
00000cc0: cc 6f 13 00 00 00 0a cb 39 e5 00 00 00 c8 d3 a9 |.o......9.......|
00000cd0: f1 0e 0e ee 02 30 39 e5 00 00 00 c7 0a 04 01 01 |.....09.........|
00000ce0: 00 00 f3 29 ec 03 1a 0e 00 04 08 27 08 07 08 3c |...).......'...<|
00000cf0: 07 0d 00 1b 0e 07 1a 07 15 07 05 22 13 1b 0e 25 |..........."...%|
00000d00: 01 00 0c 43 06 01 ce 03 02 02 02 02 00 00 1b 04 |...C............|
00000d10: 84 04 00 01 00 86 04 00 01 00 88 04 00 00 00 8a |................|
00000d20: 04 00 01 00 b4 01 00 00 00 cb b4 00 00 00 00 cc |................|
00000d30: c8 d4 a5 ec 09 c7 d3 9c cb 95 01 ee f4 c7 28 ec |..............(.|
00000d40: 03 18 20 00 04 08 21 0a 20 10 07 08 07 03 12 15 |.. ...!. .......|
00000d50: 07 0a 07 05 0b 1e 18 1b 07 0d 00 0c 43 06 01 d0 |............C...|
00000d60: 03 02 00 02 03 00 00 69 02 84 04 00 01 00 8c 04 |.......i........|
00000d70: 00 01 00 39 e5 00 00 00 d3 d4 a5 f1 0e 39 e5 00 |...9.........9..|
00000d80: 00 00 d4 d3 a5 98 f1 0e 39 e5 00 00 00 d3 d4 a6 |........9.......|
00000d90: f1 0e 39 e5 00 00 00 d4 d3 a6 98 f1 0e 39 e5 00 |..9..........9..|
00000da0: 00 00 d4 d3 a7 f1 0e 39 e5 00 00 00 d3 d4 a7 98 |.......9........|
00000db0: f1 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 |..9.........9...|
00000dc0: 00 d3 d4 a8 98 f1 0e 39 e5 00 00 00 d3 d4 ac f1 |.......9........|
00000dd0: 0e 39 e5 00 00 00 d3 d4 ab 98 f1 29 ec 03 66 28 |.9.........)..f(|
00000de0: 00 03 08 1b 0e 07 08 07 03 07 05 0d 0b 1b 12 07 |................|
00000df0: 08 07 03 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d |................|
00000e00: 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 0e 07 08 07 |................|
00000e10: 03 07 05 0d 0b 1b 12 07 08 07 03 0c 09 0d 0b 1b |................|
00000e20: 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 0a 07 05 0c |................|
00000e30: 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 |................|
00000e40: 0a 07 05 0c 09 00 0c 43 06 01 d2 03 02 00 02 03 |.......C........|
00000e50: 00 00 68 02 84 04 00 01 00 8c 04 00 01 00 39 e5 |..h...........9.|
00000e60: 00 00 00 d3 d4 ab f1 0e 39 e5 00 00 00 d4 d3 ab |........9.......|
00000e70: f1 0e 39 e5 00 00 00 d3 d4 ac 98 f1 0e 39 e5 00 |..9..........9..|
00000e80: 00 00 d4 d3 ac 98 f1 0e 39 e5 00 00 00 d3 d4 a6 |........9.......|
00000e90: f1 0e 39 e5 00 00 00 d4 d3 a6 f1 0e 39 e5 00 00 |..9.........9...|
00000ea0: 00 d3 d4 a5 98 f1 0e 39 e5 00 00 00 d3 d4 a8 f1 |.......9........|
00000eb0: 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 00 |.9.........9....|
00000ec0: d3 d4 a7 98 f1 29 ec 03 66 35 00 03 08 1b 0e 07 |.....)..f5......|
00000ed0: 0a 07 05 07 05 0d 0b 1b 0e 07 0a 07 05 07 05 0d |................|
00000ee0: 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 12 07 0a 07 |................|
00000ef0: 05 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b |................|
00000f00: 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c |................|
00000f10: 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 0e 07 |................|
00000f20: 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c 09 00 |................|
00000f30: 0c 43 06 01 d4 03 00 02 00 04 00 05 d1 01 02 84 |.C..............|
00000f40: 04 00 00 00 88 04 00 01 00 39 e8 00 00 00 b4 02 |.........9......|
00000f50: 00 00 00 b4 03 00 00 00 f2 0e 39 e9 00 00 00 b4 |..........9.....|
00000f60: 03 00 00 00 b4 03 00 00 00 f2 0e 39 e8 00 00 00 |...........9....|
00000f70: b9 b4 03 00 00 00 f2 0e 39 e9 00 00 00 ba b4 03 |........9.......|
00000f80: 00 00 00 f2 0e 39 e8 00 00 00 c1 00 b4 03 00 00 |.....9..........|
00000f90: 00 f2 0e 39 e9 00 00 00 39 a5 00 00 00 43 07 01 |...9....9....C..|
00000fa0: 00 00 bb 24 01 00 b4 02 00 00 00 f2 0e 39 e7 00 |...$.........9..|
00000fb0: 00 00 b4 03 00 00 00 b4 64 00 00 00 f2 cb 39 e5 |........d.....9.|
00000fc0: 00 00 00 c7 b4 01 00 00 00 a0 c7 ac f1 0e 39 e5 |..............9.|
00000fd0: 00 00 00 c7 c1 01 ab f1 0e 39 e5 00 00 00 c7 c1 |.........9......|
00000fe0: 02 ab f1 0e b4 01 00 00 00 b4 1f 00 00 00 a2 cc |................|
00000ff0: 39 e5 00 00 00 c8 c1 03 04 08 01 00 00 f3 0e b4 |9...............|
00001000: 01 00 00 00 b4 20 00 00 00 a2 cc 39 e5 00 00 00 |..... .....9....|
00001010: c8 c1 04 04 09 01 00 00 f3 29 ec 03 54 41 00 04 |.........)..TA..|
00001020: 08 4d 12 0d 11 4d 0e 0d 0d 39 12 0d 11 39 0e 0d |.M...M...9...9..|
00001030: 0d 3e 12 0d 11 1b 10 1b 08 20 0a 2a 13 0d 05 4d |.>....... .*...M|
00001040: 14 0d 1b 1b 10 20 04 07 12 07 05 07 13 0d 0b 1b |..... ..........|
00001050: 0e 11 04 07 05 0d 0b 1b 0e 11 04 07 05 0d 0b 34 |...............4|
00001060: 0e 0d 0d 1b 0e 2a 01 0d 0b 34 0e 0d 0d 1b 0e 2a |.....*...4.....*|
00001070: 01 00 06 cd cc cc cc cc cc 00 40 0a 14 d1 13 38 |..........@....8|
00001080: cf 55 7d 94 d6 75 f7 41 5b 56 68 37 67 ca 53 46 |.U}..u.A[Vh7g.SF|
00001090: 5a 0a 14 d1 13 38 cf 55 7d 94 d6 75 f7 41 5b 56 |Z....8.U}..u.A[V|
000010a0: 68 37 67 ca 53 46 5a 0a 05 00 00 00 80 00 0a 05 |h7g.SFZ.........|
000010b0: 00 00 00 00 01 0c 43 06 01 d6 03 00 00 00 03 00 |......C.........|
000010c0: 04 79 00 39 e5 00 00 00 39 b9 00 00 00 c3 f1 b4 |.y.9....9.......|
000010d0: 00 00 00 00 f2 0e 39 e5 00 00 00 39 b9 00 00 00 |......9....9....|
000010e0: 04 0a 01 00 00 f1 b4 7b 00 00 00 f2 0e 39 e5 00 |.......{.....9..|
000010f0: 00 00 39 b9 00 00 00 04 0b 01 00 00 f1 b4 7b 00 |..9...........{.|
00001100: 00 00 f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 00 |....9....9......|
00001110: f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 01 f2 0e |..9....9........|
00001120: 39 e6 00 00 00 39 d2 00 00 00 c2 02 f2 0e 39 e6 |9....9........9.|
00001130: 00 00 00 39 d2 00 00 00 c2 03 f2 29 ec 03 32 52 |...9.......)..2R|
00001140: 00 03 08 1b 0e 20 0c 20 0d 0d 0b 1b 0e 34 0c 20 |..... . .....4. |
00001150: 0d 0d 0b 1b 0e 34 0c 20 0d 0d 0b 1b 1a 25 01 0d |.....4. .....%..|
00001160: 17 1b 1a 25 01 0d 17 1b 1a 25 01 0d 17 1b 1a 25 |...%.....%.....%|
00001170: 01 00 0c 42 06 01 00 00 00 00 02 00 00 0c 00 39 |...B...........9|
00001180: b9 00 00 00 04 0c 01 00 00 f1 29 ec 03 06 56 1e |..........)...V.|
00001190: 02 10 34 0c 00 0c 42 06 01 00 00 00 00 02 00 00 |..4...B.........|
000011a0: 0c 00 39 b9 00 00 00 04 0d 01 00 00 f1 29 ec 03 |..9..........)..|
000011b0: 06 57 1e 02 10 34 0c 00 0c 42 06 01 00 00 00 00 |.W...4...B......|
000011c0: 02 00 00 0c 00 39 b9 00 00 00 04 0e 01 00 00 f1 |.....9..........|
000011d0: 29 ec 03 06 58 1e 02 10 34 0c 00 0c 42 06 01 00 |)...X...4...B...|
000011e0: 00 00 00 02 00 00 0c 00 39 b9 00 00 00 04 0f 01 |........9.......|
000011f0: 00 00 f1 29 ec 03 06 59 1e 02 10 34 0c 00 0c 43 |...)...Y...4...C|
00001200: 06 01 d8 03 00 00 00 04 00 1e d9 03 00 39 e5 00 |.............9..|
00001210: 00 00 39 a0 00 00 00 c1 00 f1 c1 01 f2 0e 39 e5 |..9...........9.|
00001220: 00 00 00 39 a0 00 00 00 c1 02 8e f1 c1 03 8e f2 |...9............|
00001230: 0e 39 e5 00 00 00 c1 04 c1 05 ab 0a f2 0e 39 e5 |.9............9.|
00001240: 00 00 00 c1 06 c1 07 ab 09 f2 0e 39 e5 00 00 00 |...........9....|
00001250: b4 01 00 00 00 b4 64 00 00 00 a2 43 39 00 00 00 |......d....C9...|
00001260: bf 0a 24 01 00 04 10 01 00 00 f2 0e 39 e5 00 00 |..$.........9...|
00001270: 00 b4 01 00 00 00 8e b4 64 00 00 00 a2 43 39 00 |........d....C9.|
00001280: 00 00 bf 24 24 01 00 04 11 01 00 00 f2 0e 39 e5 |...$$.........9.|
00001290: 00 00 00 b4 01 00 00 00 b4 64 00 00 00 a2 43 39 |.........d....C9|
000012a0: 00 00 00 bf 08 24 01 00 04 12 01 00 00 f2 0e 39 |.....$.........9|
000012b0: e5 00 00 00 c1 08 b4 4e 00 00 00 a2 c1 09 f2 0e |.......N........|
000012c0: 39 e5 00 00 00 c1 0a 8e b4 4e 00 00 00 a2 c1 0b |9........N......|
000012d0: 8e f2 0e 39 e5 00 00 00 c1 0c b4 4e 00 00 00 a3 |...9.......N....|
000012e0: b4 19 69 01 00 f2 0e 39 e5 00 00 00 c1 0d 8e b4 |..i....9........|
000012f0: 4e 00 00 00 a3 b4 1a 69 01 00 8e f2 0e 39 e5 00 |N......i.....9..|
00001300: 00 00 b4 a6 3c 65 5a 97 b4 a7 3c 65 5a 8e f2 0e |....<eZ...<eZ...|
00001310: 39 e5 00 00 00 b4 a6 3c 46 5a b4 56 68 37 67 b1 |9......<FZ.Vh7g.|
00001320: b4 f6 7c 77 7f f2 0e 39 e5 00 00 00 b4 a6 3c 46 |..|w...9......<F|
00001330: 5a b4 56 68 37 67 af b4 06 28 06 42 f2 0e 39 e5 |Z.Vh7g...(.B..9.|
00001340: 00 00 00 b4 a6 3c 46 5a b4 56 68 37 67 b0 b4 f0 |.....<FZ.Vh7g...|
00001350: 54 71 3d f2 0e 39 e5 00 00 00 c1 0e c1 0f 9d c1 |Tq=..9..........|
00001360: 10 f2 0e 39 e5 00 00 00 c1 11 8e c1 12 9d c1 13 |...9............|
00001370: 8e f2 0e 39 e5 00 00 00 c1 14 8e c1 15 8e 9e c1 |...9............|
00001380: 16 8e f2 0e 39 e5 00 00 00 c1 17 c1 18 9e c1 19 |....9...........|
00001390: f2 0e 39 e5 00 00 00 b4 02 00 00 00 8e b4 7f 00 |..9.............|
000013a0: 00 00 a1 c1 1a 8e f2 0e 39 e5 00 00 00 b4 02 00 |........9.......|
000013b0: 00 00 b4 7f 00 00 00 a1 c1 1b f2 0e 39 e5 00 00 |............9...|
000013c0: 00 b4 00 01 00 00 8e b4 0b 00 00 00 a1 c1 1c 8e |................|
000013d0: f2 0e 39 e5 00 00 00 b4 07 00 00 00 b4 14 00 00 |..9.............|
000013e0: 00 a1 c1 1d f2 29 ec 03 be 01 5b 00 03 08 1b 0e |.....)....[.....|
000013f0: 25 0c 11 0d 0d 0b 1b 0e 25 0e 07 01 11 30 07 3d |%.......%....0.=|
00001400: 0d 0b 2f 3c 0c 2f 0d 0b 2f 3c 0c 2f 0d 0b 4d 16 |../<./../<./..M.|
00001410: 07 10 25 12 2a 2b 0d 0b 34 10 20 08 07 10 25 12 |..%.*+..4. ...%.|
00001420: 2a 2d 0d 0b 4d 16 07 10 25 12 2a 2b 0d 0b 3e 46 |*-..M...%.*+..>F|
00001430: 11 39 0d 0b 25 0e 20 3a 11 10 07 4b 0d 0b 3e 46 |.9..%. :...K..>F|
00001440: 20 39 0d 0b 25 0e 20 3a 20 10 07 4b 0d 0b 34 0e | 9..%. : ..K..4.|
00001450: 20 1c 07 1d 0d 0b 4d 26 20 19 0d 0b 4d 26 20 19 | .....M& ...M& .|
00001460: 0d 0b 4d 26 20 19 0d 0b 2f 44 11 37 0d 0b 25 0e |..M& .../D.7..%.|
00001470: 11 38 11 22 07 5b 0d 0b 25 0e 11 3c 07 03 11 24 |.8.".[..%..<...$|
00001480: 07 5d 0d 0b 2f 44 11 37 0d 0b 34 10 20 0a 11 12 |.]../D.7..4. ...|
00001490: 07 1f 0d 0b 4d 18 11 0b 0d 0b 34 10 20 0e 11 10 |....M.....4. ...|
000014a0: 07 21 0d 0b 4d 18 11 0b 00 0a 09 ff ff ff ff ff |.!..M...........|
000014b0: ff ff ff 00 06 00 00 00 00 00 00 f0 43 0a 09 ff |............C...|
000014c0: ff ff ff ff ff ff ff 00 06 00 00 00 00 00 00 f0 |................|
000014d0: 43 0a 09 00 00 10 63 2d 5e c7 6b 05 06 40 8c b5 |C.....c-^.k..@..|
000014e0: 78 1d af 15 44 0a 09 01 00 10 63 2d 5e c7 6b 05 |x...D.....c-^.k.|
000014f0: 06 40 8c b5 78 1d af 15 44 0a 0c 75 f7 41 5b 56 |.@..x...D..u.A[V|
00001500: 68 37 67 ca 53 46 5a 0a 16 00 00 00 00 00 00 00 |h7g.SFZ.........|
00001510: 00 00 40 dd 7d d0 96 15 da cd 99 f2 94 91 16 0a |..@.}...........|
00001520: 0c 75 f7 41 5b 56 68 37 67 ca 53 46 5a 0a 16 00 |.u.A[Vh7g.SFZ...|
00001530: 00 00 00 00 00 00 00 00 40 dd 7d d0 96 15 da cd |........@.}.....|
00001540: 99 f2 94 91 16 0a 0c 75 f7 41 5b 56 68 37 67 ca |.......u.A[Vh7g.|
00001550: 53 46 5a 0a 0c 75 f7 41 5b 56 68 37 67 ca 53 46 |SFZ..u.A[Vh7g.SF|
00001560: 5a 0a 0b 7b 98 63 1c 2f 7c 27 a3 6c a8 02 0a 05 |Z..{.c./|'.l....|
00001570: 0f 9c 42 bd 1c 0a 06 73 e2 cf fd ac 17 0a 0b 7b |..B....s.......{|
00001580: 98 63 1c 2f 7c 27 a3 6c a8 02 0a 05 0f 9c 42 bd |.c./|'.l......B.|
00001590: 1c 0a 06 73 e2 cf fd ac 17 0a 0b 7b 98 63 1c 2f |...s.......{.c./|
000015a0: 7c 27 a3 6c a8 02 0a 05 0f 9c 42 bd 1c 0a 05 be ||'.l......B.....|
000015b0: 3f 91 46 06 0a 0b 7b 98 63 1c 2f 7c 27 a3 6c a8 |?.F...{.c./|'.l.|
000015c0: 02 0a 05 0f 9c 42 bd 1c 0a 05 be 3f 91 46 06 0a |.....B.....?.F..|
000015d0: 11 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 |................|
000015e0: 80 00 0a 11 00 00 00 00 00 00 00 00 00 00 00 00 |................|
000015f0: 00 00 00 80 00 0a 0c 00 00 00 00 00 00 00 00 00 |................|
00001600: 00 00 01 0a 08 e1 16 7e b8 a4 7a 1b 01 0c 43 06 |.......~..z...C.|
00001610: 01 da 03 01 04 01 03 00 00 58 05 84 04 00 01 00 |.........X......|
00001620: a6 04 00 00 00 a8 04 00 01 00 aa 04 00 02 00 8a |................|
00001630: 04 00 03 00 b4 00 00 00 00 cb d3 b4 02 00 00 00 |................|
00001640: c7 a1 a3 b4 00 00 00 00 ac ec 05 95 00 ee ec b4 |................|
00001650: 00 00 00 00 cd d3 cc c7 b4 01 00 00 00 a0 ce ca |................|
00001660: b4 00 00 00 00 a8 ec 23 d3 b4 02 00 00 00 ca a1 |.......#........|
00001670: a3 d0 b4 00 00 00 00 ac ec 0d c8 d7 c9 b4 01 00 |................|
00001680: 00 00 ca a2 b1 cd 94 03 ee d6 c9 28 ec 03 3c 76 |...........(..<v|
00001690: 00 04 08 21 10 20 18 07 05 07 0d 20 24 12 25 18 |...!. ..... $.%.|
000016a0: 11 21 0a 0d 08 20 0c 0c 0c 20 04 12 1b 20 18 07 |.!... ... ... ..|
000016b0: 05 07 0d 0d 05 1b 06 12 02 0d 07 20 18 07 05 07 |........... ....|
000016c0: 0d 00 02 07 2a 00 04 0e 2f 07 0d 00 0c 43 06 01 |....*.../....C..|
000016d0: dc 03 01 00 01 03 00 00 14 01 84 04 00 01 00 39 |...............9|
000016e0: ed 00 00 00 d3 b4 01 00 00 00 a0 f1 b4 01 00 00 |................|
000016f0: 00 9f 28 ec 03 0f 88 01 00 03 16 1b 16 20 04 07 |..(.......... ..|
00001700: 05 20 12 07 33 00 0c 43 06 01 de 03 01 03 01 03 |. ..3..C........|
00001710: 00 00 3d 04 84 04 00 01 00 ac 04 00 00 00 ae 04 |..=.............|
00001720: 00 01 00 b0 04 00 02 00 d3 b4 00 00 00 00 ab ec |................|
00001730: 03 d3 28 39 ee 00 00 00 d3 f1 cb b4 01 00 00 00 |..(9............|
00001740: c7 b4 01 00 00 00 9f b4 02 00 00 00 9d a2 cc c8 |................|
00001750: cd d3 c9 9d c9 9f b4 02 00 00 00 9d d0 c9 a8 ed |................|
00001760: 03 ee ed c9 28 ec 03 31 8c 01 00 04 10 20 04 12 |....(..1..... ..|
00001770: 0a 07 0d 08 00 1b 14 07 01 0d 19 1b 18 20 04 20 |............. . |
00001780: 0c 07 19 0f 02 0d 04 07 08 07 03 07 0e 07 03 20 |............... |
00001790: 0a 0d 11 07 05 1e 05 07 0d 00 0c 43 06 01 e0 03 |...........C....|
000017a0: 01 0a 01 08 00 03 bd 01 0b b2 04 00 01 00 b4 04 |................|
000017b0: 01 00 70 b6 04 01 01 70 b8 04 01 02 30 ba 04 01 |..p....p....0...|
000017c0: 03 70 bc 04 01 04 30 be 04 00 00 40 86 04 00 06 |.p....0....@....|
000017d0: 00 c0 04 00 07 00 c2 04 00 08 00 c4 04 00 09 00 |................|
000017e0: c2 02 c5 05 63 04 00 63 03 00 63 02 00 63 01 00 |....c..c..c..c..|
000017f0: 63 00 00 b4 71 63 cf 00 cb b4 a6 2d 7e 20 cc b4 |c...qc.....-~ ..|
00001800: 40 c5 09 00 cd c1 00 ce c1 01 c5 04 39 b9 00 00 |@...........9...|
00001810: 00 39 a5 00 00 00 43 23 01 00 00 39 a0 00 00 00 |.9....C#...9....|
00001820: d3 f1 64 04 00 9d 24 01 00 f1 b4 0a 00 00 00 9f |..d...$.........|
00001830: c5 06 ee 27 11 7f 7a 20 01 00 00 07 00 82 02 0e |...'..z ........|
00001840: 3e 7a 21 01 00 00 08 00 82 02 0e 3e 7a 22 01 00 |>z!........>z"..|
00001850: 00 09 00 82 02 0e 3e 86 ee 0e c4 05 b4 00 00 00 |......>.........|
00001860: 00 c4 06 09 f3 ee ce 0e 64 02 00 b4 0c 00 00 00 |........d.......|
00001870: 9d c4 08 d3 a2 9c c4 07 c4 08 64 00 00 9c 9f 9d |..........d.....|
00001880: c5 08 39 ef 00 00 00 64 02 00 b4 02 00 00 00 d3 |..9....d........|
00001890: 9c a2 f1 c5 09 c4 08 c4 09 9c d3 a3 28 ec 03 59 |............(..Y|
000018a0: 9c 01 00 00 2c 3e 10 1b 0e 1b 08 1b 0c 1b 0e 07 |....,>..........|
000018b0: 01 07 12 11 03 07 1b 11 13 20 5e 12 71 16 02 39 |......... ^.q..9|
000018c0: 06 39 06 48 0a 25 18 11 09 17 1b 2a 0e 07 14 0c |.9.H.%.....*....|
000018d0: 0a 07 05 07 09 07 22 0c 08 0c 08 11 03 07 07 07 |......".........|
000018e0: 09 12 39 1b 12 2a 20 07 03 07 0d 07 0f 12 07 0c |..9..* .........|
000018f0: 08 0c 03 07 10 07 05 07 1d 00 0a 07 00 80 87 1d |................|
00001900: 04 dd 26 06 c7 d7 88 04 22 8e 47 40 0c 43 06 01 |..&.....".G@.C..|
00001910: be 04 03 0a 03 08 04 00 ed 01 0d 84 04 00 01 00 |................|
00001920: 8c 04 00 01 00 c8 04 00 01 00 ca 04 00 00 00 c0 |................|
00001930: 04 00 01 00 c2 04 00 02 00 c4 04 00 03 00 cc 04 |................|
00001940: 00 04 00 ce 04 00 05 00 d0 04 00 06 00 d2 04 00 |................|
00001950: 07 00 d4 04 00 08 00 d6 04 00 09 00 b6 04 01 0d |................|
00001960: b4 04 00 0d ba 04 03 0d be 04 05 01 d3 d4 b4 01 |................|
00001970: 00 00 00 a0 ab ec 4f b4 02 00 00 00 d4 9c b4 01 |......O.........|
00001980: 00 00 00 a0 b4 06 00 00 00 d4 9c b4 01 00 00 00 |................|
00001990: a0 9c b4 06 00 00 00 d4 9c b4 05 00 00 00 a0 9c |................|
000019a0: d2 68 00 00 d4 9c 68 01 00 9f 9c cc d4 b4 01 00 |.h....h.........|
000019b0: 00 00 af ec 04 c8 8e cc d4 d4 9c d4 9c 68 02 00 |.............h..|
000019c0: 9c cd ef 8f 00 d3 d4 9f b4 01 00 00 00 a3 cb ee |................|
000019d0: 27 11 7f 7a 26 01 00 00 04 00 82 02 0e 3e 7a 27 |'..z&........>z'|
000019e0: 01 00 00 05 00 82 02 0e 3e 7a 28 01 00 00 06 00 |........>z(.....|
000019f0: 82 02 0e 3e 86 ee 08 e2 d3 c7 0a f3 ee d4 0e ee |...>............|
00001a00: 27 11 7f 7a 29 01 00 00 07 00 82 02 0e 3e 7a 2a |'..z)........>z*|
00001a10: 01 00 00 08 00 82 02 0e 3e 7a 2b 01 00 00 09 00 |........>z+.....|
00001a20: 82 02 0e 3e 86 ee 08 e2 c7 d4 d5 f3 ee d4 0e c4 |...>............|
00001a30: 04 c4 08 9c c4 07 c4 06 9c 9f cc c4 05 c4 08 9c |................|
00001a40: cd d5 ec 09 c4 06 c4 09 9c ce ee 07 b4 00 00 00 |................|
00001a50: 00 ce c8 c9 ca 26 03 00 28 ec 03 95 01 a3 01 04 |.....&..(.......|
00001a60: 04 10 07 0c 20 04 07 0b 12 03 1b 14 07 03 20 08 |.... ......... .|
00001a70: 20 1c 07 03 20 08 07 13 20 30 07 03 20 08 07 13 | ... ... 0.. ...|
00001a80: 0d 31 11 12 07 03 07 0c 11 03 07 1b 0d 03 20 04 |.1............ .|
00001a90: 12 06 07 01 0d 07 07 08 07 03 07 0c 07 03 07 0c |................|
00001aa0: 11 03 1e 11 07 08 07 03 20 0a 0d 17 16 02 39 08 |........ .....9.|
00001ab0: 39 08 48 0c 07 10 07 06 0c 07 17 2b 16 02 39 08 |9.H........+..9.|
00001ac0: 39 08 48 0c 07 10 07 06 07 06 07 0d 17 23 0c 0a |9.H..........#..|
00001ad0: 0c 03 07 0e 0c 0a 0c 03 07 09 0d 0f 0c 0a 0c 03 |................|
00001ae0: 0d 05 12 08 0c 0a 0c 03 18 0d 22 00 07 06 07 06 |..........".....|
00001af0: 16 1b 00 0c 43 06 01 e2 03 01 03 01 07 00 00 62 |....C..........b|
00001b00: 04 d8 04 00 01 00 88 04 00 00 00 da 04 00 01 00 |................|
00001b10: dc 04 00 02 00 39 b9 00 00 00 39 a5 00 00 00 43 |.....9....9....C|
00001b20: 23 01 00 00 d3 39 a5 00 00 00 43 2f 01 00 00 bf |#....9....C/....|
00001b30: 0a 24 01 00 9c 24 01 00 f1 b4 20 00 00 00 9f cc |.$...$.... .....|
00001b40: 39 f0 00 00 00 c8 f1 cb b4 0a 00 00 00 39 b9 00 |9............9..|
00001b50: 00 00 d3 f1 a1 c7 9c c8 a3 cf 43 39 00 00 00 24 |..........C9...$|
00001b60: 00 00 d1 b7 48 04 30 01 00 00 9f c9 43 31 01 00 |....H.0.....C1..|
00001b70: 00 b8 24 01 00 9f 28 ec 03 47 c1 01 00 00 00 08 |..$...(..G......|
00001b80: 1a 1b 0e 1b 08 1b 0c 07 16 1b 08 25 0a 11 15 07 |...........%....|
00001b90: 13 11 13 20 4c 0d 61 1b 10 07 01 0d 15 1b 1a 1b |... L.a.........|
00001ba0: 0e 07 01 07 11 07 2e 07 03 07 10 07 05 0d 39 1b |..............9.|
00001bb0: 12 17 11 07 06 20 08 07 10 07 06 20 0c 11 15 07 |..... ..... ....|
00001bc0: 27 00 0c 43 06 01 e4 03 00 00 00 03 00 00 15 00 |'..C............|
00001bd0: 39 e5 00 00 00 39 f1 00 00 00 c0 d0 07 f1 04 32 |9....9.........2|
00001be0: 01 00 00 f2 29 ec 03 0b cb 01 00 03 08 1b 0e 2a |....)..........*|
00001bf0: 14 20 15 00                                     |. ..|
```

### WASM
```
00000000: 05 4f 02 65 0c 61 73 73 65 72 74 18 61 73 73 65 |.O.e.assert.asse|
00000010: 72 74 54 68 72 6f 77 73 14 62 69 67 69 6e 74 5f |rtThrows.bigint_|
00000020: 70 6f 77 12 74 65 73 74 5f 6c 65 73 73 0e 74 65 |pow.test_less.te|
00000030: 73 74 5f 65 71 18 74 65 73 74 5f 62 69 67 69 6e |st_eq.test_bigin|
00000040: 74 31 18 74 65 73 74 5f 62 69 67 69 6e 74 32 18 |t1.test_bigint2.|
00000050: 74 65 73 74 5f 62 69 67 69 6e 74 33 14 66 6c 6f |test_bigint3.flo|
00000060: 6f 72 5f 6c 6f 67 32 12 63 65 69 6c 5f 6c 6f 67 |or_log2.ceil_log|
00000070: 32 10 69 6e 74 5f 73 71 72 74 0e 63 61 6c 63 5f |2.int_sqrt.calc_|
00000080: 70 69 14 63 6f 6d 70 75 74 65 5f 70 69 0e 74 65 |pi.compute_pi.te|
00000090: 73 74 5f 70 69 14 75 73 65 20 73 74 72 69 63 74 |st_pi.use strict|
000000a0: 18 5f 5f 6c 6f 61 64 53 63 72 69 70 74 1c 74 65 |.__loadScript.te|
000000b0: 73 74 5f 61 73 73 65 72 74 2e 6a 73 52 5f 5f 74 |st_assert.jsR__t|
000000c0: 65 73 74 73 5f 5f 2f 66 69 78 74 75 72 65 73 5f |ests__/fixtures_|
000000d0: 71 75 69 63 6b 6a 73 2f 74 65 73 74 5f 62 69 67 |quickjs/test_big|
000000e0: 69 6e 74 2e 6a 73 0c 61 63 74 75 61 6c 10 65 78 |int.js.actual.ex|
000000f0: 70 65 63 74 65 64 2e 61 73 73 65 72 74 69 6f 6e |pected.assertion|
00000100: 20 66 61 69 6c 65 64 3a 20 67 6f 74 20 7c 02 7c | failed: got |.||
00000110: 18 2c 20 65 78 70 65 63 74 65 64 20 7c 04 20 28 |., expected |. (|
00000120: 02 29 06 65 72 72 08 66 75 6e 63 04 65 78 24 65 |.).err.func.ex$e|
00000130: 78 63 65 70 74 69 6f 6e 20 65 78 70 65 63 74 65 |xception expecte|
00000140: 64 02 61 02 6e 02 72 02 69 02 62 08 73 71 72 74 |d.a.n.r.i.b.sqrt|
00000150: 30 31 20 3c 3c 20 33 31 6e 20 3d 3d 3d 20 32 31 |01 << 31n === 21|
00000160: 34 37 34 38 33 36 34 38 6e 30 31 20 3c 3c 20 33 |47483648n01 << 3|
00000170: 32 6e 20 3d 3d 3d 20 34 32 39 34 39 36 37 32 39 |2n === 429496729|
00000180: 36 6e 0a 20 20 31 32 33 10 20 20 31 32 33 20 20 |6n.  123.  123  |
00000190: 20 02 2b 02 2d 04 00 61 10 20 20 31 32 33 20 20 | .+.-..a.  123  |
000001a0: 72 3e 31 32 36 37 36 35 30 36 30 30 32 32 38 32 |r>12676506002282|
000001b0: 32 39 34 30 31 34 39 36 37 30 33 32 30 35 33 37 |2940149670320537|
000001c0: 36 2a 2d 33 65 77 66 64 6e 63 61 30 6e 36 6c 64 |6*-3ewfdnca0n6ld|
000001d0: 31 67 67 76 66 67 67 44 32 30 30 30 30 30 30 30 |1ggvfggD20000000|
000001e0: 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 |0000000000000000|
000001f0: 30 30 30 30 30 30 30 30 30 30 0a 6b 5f 6d 61 78 |0000000000.k_max|
00000200: 04 61 31 02 6b 02 6c 02 75 02 73 08 70 72 65 63 |.a1.k.l.u.s.prec|
00000210: 0c 43 48 55 44 5f 41 0c 43 48 55 44 5f 42 0c 43 |.CHUD_A.CHUD_B.C|
00000220: 48 55 44 5f 43 0e 43 48 55 44 5f 43 33 24 43 48 |HUD_C.CHUD_C3$CH|
00000230: 55 44 5f 42 49 54 53 5f 50 45 52 5f 54 45 52 4d |UD_BITS_PER_TERM|
00000240: 0e 63 68 75 64 5f 62 73 02 50 02 51 02 47 08 63 |.chud_bs.P.Q.G.c|
00000250: 65 69 6c 0c 6e 65 65 64 5f 47 02 63 04 50 31 04 |eil.need_G.c.P1.|
00000260: 51 31 04 47 31 04 50 32 04 51 32 04 47 32 10 6e |Q1.G1.P2.Q2.G2.n|
00000270: 5f 64 69 67 69 74 73 0c 6e 5f 62 69 74 73 06 6f |_digits.n_bits.o|
00000280: 75 74 08 6c 6f 67 32 02 2e 0a 73 6c 69 63 65 a4 |ut.log2...slice.|
00000290: 1f 33 2e 31 34 31 35 39 32 36 35 33 35 38 39 37 |.3.1415926535897|
000002a0: 39 33 32 33 38 34 36 32 36 34 33 33 38 33 32 37 |9323846264338327|
000002b0: 39 35 30 32 38 38 34 31 39 37 31 36 39 33 39 39 |9502884197169399|
000002c0: 33 37 35 31 30 35 38 32 30 39 37 34 39 34 34 35 |3751058209749445|
000002d0: 39 32 33 30 37 38 31 36 34 30 36 32 38 36 32 30 |9230781640628620|
000002e0: 38 39 39 38 36 32 38 30 33 34 38 32 35 33 34 32 |8998628034825342|
000002f0: 31 31 37 30 36 37 39 38 32 31 34 38 30 38 36 35 |1170679821480865|
00000300: 31 33 32 38 32 33 30 36 36 34 37 30 39 33 38 34 |1328230664709384|
00000310: 34 36 30 39 35 35 30 35 38 32 32 33 31 37 32 35 |4609550582231725|
00000320: 33 35 39 34 30 38 31 32 38 34 38 31 31 31 37 34 |3594081284811174|
00000330: 35 30 32 38 34 31 30 32 37 30 31 39 33 38 35 32 |5028410270193852|
00000340: 31 31 30 35 35 35 39 36 34 34 36 32 32 39 34 38 |1105559644622948|
00000350: 39 35 34 39 33 30 33 38 31 39 36 34 34 32 38 38 |9549303819644288|
00000360: 31 30 39 37 35 36 36 35 39 33 33 34 34 36 31 32 |1097566593344612|
00000370: 38 34 37 35 36 34 38 32 33 33 37 38 36 37 38 33 |8475648233786783|
00000380: 31 36 35 32 37 31 32 30 31 39 30 39 31 34 35 36 |1652712019091456|
00000390: 34 38 35 36 36 39 32 33 34 36 30 33 34 38 36 31 |4856692346034861|
000003a0: 30 34 35 34 33 32 36 36 34 38 32 31 33 33 39 33 |0454326648213393|
000003b0: 36 30 37 32 36 30 32 34 39 31 34 31 32 37 33 37 |6072602491412737|
000003c0: 32 34 35 38 37 30 30 36 36 30 36 33 31 35 35 38 |2458700660631558|
000003d0: 38 31 37 34 38 38 31 35 32 30 39 32 30 39 36 32 |8174881520920962|
000003e0: 38 32 39 32 35 34 30 39 31 37 31 35 33 36 34 33 |8292540917153643|
000003f0: 36 37 38 39 32 35 39 30 33 36 30 30 31 31 33 33 |6789259036001133|
00000400: 30 35 33 30 35 34 38 38 32 30 34 36 36 35 32 31 |0530548820466521|
00000410: 33 38 34 31 34 36 39 35 31 39 34 31 35 31 31 36 |3841469519415116|
00000420: 30 39 34 33 33 30 35 37 32 37 30 33 36 35 37 35 |0943305727036575|
00000430: 39 35 39 31 39 35 33 30 39 32 31 38 36 31 31 37 |9591953092186117|
00000440: 33 38 31 39 33 32 36 31 31 37 39 33 31 30 35 31 |3819326117931051|
00000450: 31 38 35 34 38 30 37 34 34 36 32 33 37 39 39 36 |1854807446237996|
00000460: 32 37 34 39 35 36 37 33 35 31 38 38 35 37 35 32 |2749567351885752|
00000470: 37 32 34 38 39 31 32 32 37 39 33 38 31 38 33 30 |7248912279381830|
00000480: 31 31 39 34 39 31 32 39 38 33 33 36 37 33 33 36 |1194912983367336|
00000490: 32 34 34 30 36 35 36 36 34 33 30 38 36 30 32 31 |2440656643086021|
000004a0: 33 39 34 39 34 36 33 39 35 32 32 34 37 33 37 31 |3949463952247371|
000004b0: 39 30 37 30 32 31 37 39 38 36 30 39 34 33 37 30 |9070217986094370|
000004c0: 32 37 37 30 35 33 39 32 31 37 31 37 36 32 39 33 |2770539217176293|
000004d0: 31 37 36 37 35 32 33 38 34 36 37 34 38 31 38 34 |1767523846748184|
000004e0: 36 37 36 36 39 34 30 35 31 33 32 30 30 30 35 36 |6766940513200056|
000004f0: 38 31 32 37 31 34 35 32 36 33 35 36 30 38 32 37 |8127145263560827|
00000500: 37 38 35 37 37 31 33 34 32 37 35 37 37 38 39 36 |7857713427577896|
00000510: 30 39 31 37 33 36 33 37 31 37 38 37 32 31 34 36 |0917363717872146|
00000520: 38 34 34 30 39 30 31 32 32 34 39 35 33 34 33 30 |8440901224953430|
00000530: 31 34 36 35 34 39 35 38 35 33 37 31 30 35 30 37 |1465495853710507|
00000540: 39 32 32 37 39 36 38 39 32 35 38 39 32 33 35 34 |9227968925892354|
00000550: 32 30 31 39 39 35 36 31 31 32 31 32 39 30 32 31 |2019956112129021|
00000560: 39 36 30 38 36 34 30 33 34 34 31 38 31 35 39 38 |9608640344181598|
00000570: 31 33 36 32 39 37 37 34 37 37 31 33 30 39 39 36 |1362977477130996|
00000580: 30 35 31 38 37 30 37 32 31 31 33 34 39 39 39 39 |0518707211349999|
00000590: 39 39 38 33 37 32 39 37 38 30 34 39 39 35 31 30 |9983729780499510|
000005a0: 35 39 37 33 31 37 33 32 38 31 36 30 39 36 33 31 |5973173281609631|
000005b0: 38 35 39 35 30 32 34 34 35 39 34 35 35 33 34 36 |8595024459455346|
000005c0: 39 30 38 33 30 32 36 34 32 35 32 32 33 30 38 32 |9083026425223082|
000005d0: 35 33 33 34 34 36 38 35 30 33 35 32 36 31 39 33 |5334468503526193|
000005e0: 31 31 38 38 31 37 31 30 31 30 30 30 33 31 33 37 |1188171010003137|
000005f0: 38 33 38 37 35 32 38 38 36 35 38 37 35 33 33 32 |8387528865875332|
00000600: 30 38 33 38 31 34 32 30 36 31 37 31 37 37 36 36 |0838142061717766|
00000610: 39 31 34 37 33 30 33 35 39 38 32 35 33 34 39 30 |9147303598253490|
00000620: 34 32 38 37 35 35 34 36 38 37 33 31 31 35 39 35 |4287554687311595|
00000630: 36 32 38 36 33 38 38 32 33 35 33 37 38 37 35 39 |6286388235378759|
00000640: 33 37 35 31 39 35 37 37 38 31 38 35 37 37 38 30 |3751957781857780|
00000650: 35 33 32 31 37 31 32 32 36 38 30 36 36 31 33 30 |5321712268066130|
00000660: 30 31 39 32 37 38 37 36 36 31 31 31 39 35 39 30 |0192787661119590|
00000670: 39 32 31 36 34 32 30 31 39 38 39 33 38 30 39 35 |9216420198938095|
00000680: 32 35 37 32 30 31 30 36 35 34 38 35 38 36 33 32 |2572010654858632|
00000690: 37 38 38 36 35 39 33 36 31 35 33 33 38 31 38 32 |7886593615338182|
000006a0: 37 39 36 38 32 33 30 33 30 31 39 35 32 30 33 35 |7968230301952035|
000006b0: 33 30 31 38 35 32 39 36 38 39 39 35 37 37 33 36 |3018529689957736|
000006c0: 32 32 35 39 39 34 31 33 38 39 31 32 34 39 37 32 |2259941389124972|
000006d0: 31 37 37 35 32 38 33 34 37 39 31 33 31 35 31 35 |1775283479131515|
000006e0: 35 37 34 38 35 37 32 34 32 34 35 34 31 35 30 36 |5748572424541506|
000006f0: 39 35 39 35 30 38 32 39 35 33 33 31 31 36 38 36 |9595082953311686|
00000700: 31 37 32 37 38 35 35 38 38 39 30 37 35 30 39 38 |1727855889075098|
00000710: 33 38 31 37 35 34 36 33 37 34 36 34 39 33 39 33 |3817546374649393|
00000720: 31 39 32 35 35 30 36 30 34 30 30 39 32 37 37 30 |1925506040092770|
00000730: 31 36 37 31 31 33 39 30 30 39 38 34 38 38 32 34 |1671139009848824|
00000740: 30 31 32 38 35 38 33 36 31 36 30 33 35 36 33 37 |0128583616035637|
00000750: 30 37 36 36 30 31 30 34 37 31 30 31 38 31 39 34 |0766010471018194|
00000760: 32 39 35 35 35 39 36 31 39 38 39 34 36 37 36 37 |2955596198946767|
00000770: 38 33 37 34 34 39 34 34 38 32 35 35 33 37 39 37 |8374494482553797|
00000780: 37 34 37 32 36 38 34 37 31 30 34 30 34 37 35 33 |7472684710404753|
00000790: 34 36 34 36 32 30 38 30 34 36 36 38 34 32 35 39 |4646208046684259|
000007a0: 30 36 39 34 39 31 32 39 33 33 31 33 36 37 37 30 |0694912933136770|
000007b0: 32 38 39 38 39 31 35 32 31 30 34 37 35 32 31 36 |2898915210475216|
000007c0: 32 30 35 36 39 36 36 30 32 34 30 35 38 30 33 38 |2056966024058038|
000007d0: 31 35 30 31 39 33 35 31 31 32 35 33 33 38 32 34 |1501935112533824|
000007e0: 33 30 30 33 35 35 38 37 36 34 30 32 34 37 34 39 |3003558764024749|
000007f0: 36 34 37 33 32 36 33 39 31 34 31 39 39 32 37 32 |6473263914199272|
00000800: 36 30 34 32 36 39 39 32 32 37 39 36 37 38 32 33 |6042699227967823|
00000810: 35 34 37 38 31 36 33 36 30 30 39 33 34 31 37 32 |5478163600934172|
00000820: 31 36 34 31 32 31 39 39 32 34 35 38 36 33 31 35 |1641219924586315|
00000830: 30 33 30 32 38 36 31 38 32 39 37 34 35 35 35 37 |0302861829745557|
00000840: 30 36 37 34 39 38 33 38 35 30 35 34 39 34 35 38 |0674983850549458|
00000850: 38 35 38 36 39 32 36 39 39 35 36 39 30 39 32 37 |8586926995690927|
00000860: 32 31 30 37 39 37 35 30 39 33 30 32 39 35 35 33 |2107975093029553|
00000870: 32 31 31 36 35 33 34 34 39 38 37 32 30 32 37 35 |2116534498720275|
00000880: 35 39 36 30 32 33 36 34 38 30 36 36 35 34 39 39 |5960236480665499|
00000890: 31 31 39 38 38 31 38 33 34 37 39 37 37 35 33 35 |1198818347977535|
000008a0: 36 36 33 36 39 38 30 37 34 32 36 35 34 32 35 32 |6636980742654252|
000008b0: 37 38 36 32 35 35 31 38 31 38 34 31 37 35 37 34 |7862551818417574|
000008c0: 36 37 32 38 39 30 39 37 37 37 37 32 37 39 33 38 |6728909777727938|
000008d0: 30 30 30 38 31 36 34 37 30 36 30 30 31 36 31 34 |0008164706001614|
000008e0: 35 32 34 39 31 39 32 31 37 33 32 31 37 32 31 34 |5249192173217214|
000008f0: 37 37 32 33 35 30 31 34 31 34 34 31 39 37 33 35 |7723501414419735|
00000900: 36 38 35 34 38 31 36 31 33 36 31 31 35 37 33 35 |6854816136115735|
00000910: 32 35 35 32 31 33 33 34 37 35 37 34 31 38 34 39 |2552133475741849|
00000920: 34 36 38 34 33 38 35 32 33 33 32 33 39 30 37 33 |4684385233239073|
00000930: 39 34 31 34 33 33 33 34 35 34 37 37 36 32 34 31 |9414333454776241|
00000940: 36 38 36 32 35 31 38 39 38 33 35 36 39 34 38 35 |6862518983569485|
00000950: 35 36 32 30 39 39 32 31 39 32 32 32 31 38 34 32 |5620992192221842|
00000960: 37 32 35 35 30 32 35 34 32 35 36 38 38 37 36 37 |7255025425688767|
00000970: 31 37 39 30 34 39 34 36 30 31 36 35 33 34 36 36 |1790494601653466|
00000980: 38 30 34 39 38 38 36 32 37 32 33 32 37 39 31 37 |8049886272327917|
00000990: 38 36 30 38 35 37 38 34 33 38 33 38 32 37 39 36 |8608578438382796|
000009a0: 37 39 37 36 36 38 31 34 35 34 31 30 30 39 35 33 |7976681454100953|
000009b0: 38 38 33 37 38 36 33 36 30 39 35 30 36 38 30 30 |8837863609506800|
000009c0: 36 34 32 32 35 31 32 35 32 30 35 31 31 37 33 39 |6422512520511739|
000009d0: 32 39 38 34 38 39 36 30 38 34 31 32 38 34 38 38 |2984896084128488|
000009e0: 36 32 36 39 34 35 36 30 34 32 34 31 39 36 35 32 |6269456042419652|
000009f0: 38 35 30 32 32 32 31 30 36 36 31 31 38 36 33 30 |8502221066118630|
00000a00: 36 37 34 34 32 37 38 36 32 32 30 33 39 31 39 34 |6744278622039194|
00000a10: 39 34 35 30 34 37 31 32 33 37 31 33 37 38 36 39 |9450471237137869|
00000a20: 36 30 39 35 36 33 36 34 33 37 31 39 31 37 32 38 |6095636437191728|
00000a30: 37 34 36 37 37 36 34 36 35 37 35 37 33 39 36 32 |7467764657573962|
00000a40: 34 31 33 38 39 30 38 36 35 38 33 32 36 34 35 39 |4138908658326459|
00000a50: 39 35 38 31 33 33 39 30 34 37 38 30 32 37 35 39 |9581339047802759|
00000a60: 30 30 39 0c 00 06 01 a4 01 00 02 00 03 00 0e 87 |009.............|
00000a70: 02 02 a6 01 00 00 00 c8 03 03 00 03 40 e5 00 00 |............@...|
00000a80: 00 40 40 e6 00 00 00 40 40 e7 00 00 00 40 40 e8 |.@@....@@....@@.|
00000a90: 00 00 00 40 40 e9 00 00 00 40 40 ea 00 00 00 40 |...@@....@@....@|
00000aa0: 40 eb 00 00 00 40 40 ec 00 00 00 40 40 ed 00 00 |@....@@....@@...|
00000ab0: 00 40 40 ee 00 00 00 40 40 ef 00 00 00 40 40 f0 |.@@....@@....@@.|
00000ac0: 00 00 00 40 40 f1 00 00 00 40 40 f2 00 00 00 40 |...@@....@@....@|
00000ad0: c2 00 41 e5 00 00 00 00 c2 01 41 e6 00 00 00 00 |..A.......A.....|
00000ae0: c2 02 41 e7 00 00 00 00 c2 03 41 e8 00 00 00 00 |..A.......A.....|
00000af0: c2 04 41 e9 00 00 00 00 c2 05 41 ea 00 00 00 00 |..A.......A.....|
00000b00: c2 06 41 eb 00 00 00 00 c2 07 41 ec 00 00 00 00 |..A.......A.....|
00000b10: c2 08 41 ed 00 00 00 00 c2 09 41 ee 00 00 00 00 |..A.......A.....|
00000b20: c2 0a 41 ef 00 00 00 00 c2 0b 41 f0 00 00 00 00 |..A.......A.....|
00000b30: c2 0c 41 f1 00 00 00 00 c2 0d 41 f2 00 00 00 00 |..A.......A.....|
00000b40: 04 f3 00 00 00 cb 06 cb 6f 13 00 00 00 39 f4 00 |........o....9..|
00000b50: 00 00 04 f5 00 00 00 f1 cb 0e ee 0b cc 6f 07 00 |.............o..|
00000b60: 00 00 0e ee 02 30 39 ea 00 00 00 f0 cb 39 eb 00 |.....09......9..|
00000b70: 00 00 f0 cb 39 ec 00 00 00 f0 cb 39 f2 00 00 00 |....9......9....|
00000b80: f0 cf 28 ec 03 1c 00 00 00 d1 01 38 08 34 18 00 |..(........8.4..|
00000b90: 0f e4 02 1f 1b 18 0d 17 1b 18 0d 17 1b 18 0d 17 |................|
00000ba0: 1b 0e 00 0c 43 06 01 ca 03 03 01 03 04 00 00 79 |....C..........y|
00000bb0: 04 ee 03 00 01 00 f0 03 00 01 00 68 00 01 00 9e |...........h....|
00000bc0: 01 00 01 00 0c 00 cb c7 eb b8 ab ec 03 0a d8 d3 |................|
00000bd0: d4 ad ec 02 29 d3 f5 ed 2f d4 f5 ed 2b d3 99 04 |....).../...+...|
00000be0: 4b 00 00 00 ab ec 21 d4 99 04 4b 00 00 00 ab ec |K.....!...K.....|
00000bf0: 17 d3 43 39 00 00 00 24 00 00 d4 43 39 00 00 00 |..C9...$...C9...|
00000c00: 24 00 00 ad ec 02 29 39 9f 00 00 00 04 f9 00 00 |$.....)9........|
00000c10: 00 d3 9f 04 fa 00 00 00 9f 04 fb 00 00 00 9f d4 |................|
00000c20: 9f 04 fa 00 00 00 9f d5 ec 10 04 fc 00 00 00 d5 |................|
00000c30: 9f 04 fd 00 00 00 9f ee 02 c3 9f f1 30 ec 03 50 |............0..P|
00000c40: 01 00 12 10 07 12 0c 10 12 21 0d 00 07 16 07 07 |.........!......|
00000c50: 12 0d 08 00 07 0e 11 18 07 12 12 23 07 0e 2f 2c |...........#../,|
00000c60: 07 12 30 59 07 0c 1b 12 11 0e 07 10 1b 12 11 29 |..0Y...........)|
00000c70: 12 29 08 04 34 44 07 03 20 12 20 0c 08 3f 07 03 |.)..4D.. . ..?..|
00000c80: 20 16 08 31 2a 22 07 03 20 14 15 0c 06 31 07 15 | ..1*".. ....1..|
00000c90: 00 0c 43 06 01 cc 03 02 02 02 04 00 00 31 04 fc |..C..........1..|
00000ca0: 03 00 01 00 fe 03 00 01 00 80 04 00 00 00 c8 03 |................|
00000cb0: 03 00 03 09 cb 6f 0a 00 00 00 d4 f0 0e 0e ee 17 |.....o..........|
00000cc0: cc 6f 13 00 00 00 0a cb 39 e5 00 00 00 c8 d3 a9 |.o......9.......|
00000cd0: f1 0e 0e ee 02 30 39 e5 00 00 00 c7 0a 04 01 01 |.....09.........|
00000ce0: 00 00 f3 29 ec 03 1a 0e 00 04 08 27 08 07 08 3c |...).......'...<|
00000cf0: 07 0d 00 1b 0e 07 1a 07 15 07 05 22 13 1b 0e 25 |..........."...%|
00000d00: 01 00 0c 43 06 01 ce 03 02 02 02 02 00 00 1b 04 |...C............|
00000d10: 84 04 00 01 00 86 04 00 01 00 88 04 00 00 00 8a |................|
00000d20: 04 00 01 00 b4 01 00 00 00 cb b4 00 00 00 00 cc |................|
00000d30: c8 d4 a5 ec 09 c7 d3 9c cb 95 01 ee f4 c7 28 ec |..............(.|
00000d40: 03 18 20 00 04 08 21 0a 20 10 07 08 07 03 12 15 |.. ...!. .......|
00000d50: 07 0a 07 05 0b 1e 18 1b 07 0d 00 0c 43 06 01 d0 |............C...|
00000d60: 03 02 00 02 03 00 00 69 02 84 04 00 01 00 8c 04 |.......i........|
00000d70: 00 01 00 39 e5 00 00 00 d3 d4 a5 f1 0e 39 e5 00 |...9.........9..|
00000d80: 00 00 d4 d3 a5 98 f1 0e 39 e5 00 00 00 d3 d4 a6 |........9.......|
00000d90: f1 0e 39 e5 00 00 00 d4 d3 a6 98 f1 0e 39 e5 00 |..9..........9..|
00000da0: 00 00 d4 d3 a7 f1 0e 39 e5 00 00 00 d3 d4 a7 98 |.......9........|
00000db0: f1 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 |..9.........9...|
00000dc0: 00 d3 d4 a8 98 f1 0e 39 e5 00 00 00 d3 d4 ac f1 |.......9........|
00000dd0: 0e 39 e5 00 00 00 d3 d4 ab 98 f1 29 ec 03 66 28 |.9.........)..f(|
00000de0: 00 03 08 1b 0e 07 08 07 03 07 05 0d 0b 1b 12 07 |................|
00000df0: 08 07 03 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d |................|
00000e00: 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 0e 07 08 07 |................|
00000e10: 03 07 05 0d 0b 1b 12 07 08 07 03 0c 09 0d 0b 1b |................|
00000e20: 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 0a 07 05 0c |................|
00000e30: 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 |................|
00000e40: 0a 07 05 0c 09 00 0c 43 06 01 d2 03 02 00 02 03 |.......C........|
00000e50: 00 00 68 02 84 04 00 01 00 8c 04 00 01 00 39 e5 |..h...........9.|
00000e60: 00 00 00 d3 d4 ab f1 0e 39 e5 00 00 00 d4 d3 ab |........9.......|
00000e70: f1 0e 39 e5 00 00 00 d3 d4 ac 98 f1 0e 39 e5 00 |..9..........9..|
00000e80: 00 00 d4 d3 ac 98 f1 0e 39 e5 00 00 00 d3 d4 a6 |........9.......|
00000e90: f1 0e 39 e5 00 00 00 d4 d3 a6 f1 0e 39 e5 00 00 |..9.........9...|
00000ea0: 00 d3 d4 a5 98 f1 0e 39 e5 00 00 00 d3 d4 a8 f1 |.......9........|
00000eb0: 0e 39 e5 00 00 00 d4 d3 a8 f1 0e 39 e5 00 00 00 |.9.........9....|
00000ec0: d3 d4 a7 98 f1 29 ec 03 66 35 00 03 08 1b 0e 07 |.....)..f5......|
00000ed0: 0a 07 05 07 05 0d 0b 1b 0e 07 0a 07 05 07 05 0d |................|
00000ee0: 0b 1b 12 07 0a 07 05 0c 09 0d 0b 1b 12 07 0a 07 |................|
00000ef0: 05 0c 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b |................|
00000f00: 0e 07 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c |................|
00000f10: 09 0d 0b 1b 0e 07 0a 07 05 07 05 0d 0b 1b 0e 07 |................|
00000f20: 0a 07 05 07 05 0d 0b 1b 12 07 08 07 03 0c 09 00 |................|
00000f30: 0c 43 06 01 d4 03 00 02 00 04 00 05 d1 01 02 84 |.C..............|
00000f40: 04 00 00 00 88 04 00 01 00 39 e8 00 00 00 b4 02 |.........9......|
00000f50: 00 00 00 b4 03 00 00 00 f2 0e 39 e9 00 00 00 b4 |..........9.....|
00000f60: 03 00 00 00 b4 03 00 00 00 f2 0e 39 e8 00 00 00 |...........9....|
00000f70: b9 b4 03 00 00 00 f2 0e 39 e9 00 00 00 ba b4 03 |........9.......|
00000f80: 00 00 00 f2 0e 39 e8 00 00 00 c1 00 b4 03 00 00 |.....9..........|
00000f90: 00 f2 0e 39 e9 00 00 00 39 a5 00 00 00 43 07 01 |...9....9....C..|
00000fa0: 00 00 bb 24 01 00 b4 02 00 00 00 f2 0e 39 e7 00 |...$.........9..|
00000fb0: 00 00 b4 03 00 00 00 b4 64 00 00 00 f2 cb 39 e5 |........d.....9.|
00000fc0: 00 00 00 c7 b4 01 00 00 00 a0 c7 ac f1 0e 39 e5 |..............9.|
00000fd0: 00 00 00 c7 c1 01 ab f1 0e 39 e5 00 00 00 c7 c1 |.........9......|
00000fe0: 02 ab f1 0e b4 01 00 00 00 b4 1f 00 00 00 a2 cc |................|
00000ff0: 39 e5 00 00 00 c8 c1 03 04 08 01 00 00 f3 0e b4 |9...............|
00001000: 01 00 00 00 b4 20 00 00 00 a2 cc 39 e5 00 00 00 |..... .....9....|
00001010: c8 c1 04 04 09 01 00 00 f3 29 ec 03 54 41 00 04 |.........)..TA..|
00001020: 08 4d 12 0d 11 4d 0e 0d 0d 39 12 0d 11 39 0e 0d |.M...M...9...9..|
00001030: 0d 3e 12 0d 11 1b 10 1b 08 20 0a 2a 13 0d 05 4d |.>....... .*...M|
00001040: 14 0d 1b 1b 10 20 04 07 12 07 05 07 13 0d 0b 1b |..... ..........|
00001050: 0e 11 04 07 05 0d 0b 1b 0e 11 04 07 05 0d 0b 34 |...............4|
00001060: 0e 0d 0d 1b 0e 2a 01 0d 0b 34 0e 0d 0d 1b 0e 2a |.....*...4.....*|
00001070: 01 00 06 cd cc cc cc cc cc 00 40 0a 14 d1 13 38 |..........@....8|
00001080: cf 55 7d 94 d6 75 f7 41 5b 56 68 37 67 ca 53 46 |.U}..u.A[Vh7g.SF|
00001090: 5a 0a 14 d1 13 38 cf 55 7d 94 d6 75 f7 41 5b 56 |Z....8.U}..u.A[V|
000010a0: 68 37 67 ca 53 46 5a 0a 05 00 00 00 80 00 0a 05 |h7g.SFZ.........|
000010b0: 00 00 00 00 01 0c 43 06 01 d6 03 00 00 00 03 00 |......C.........|
000010c0: 04 79 00 39 e5 00 00 00 39 b9 00 00 00 c3 f1 b4 |.y.9....9.......|
000010d0: 00 00 00 00 f2 0e 39 e5 00 00 00 39 b9 00 00 00 |......9....9....|
000010e0: 04 0a 01 00 00 f1 b4 7b 00 00 00 f2 0e 39 e5 00 |.......{.....9..|
000010f0: 00 00 39 b9 00 00 00 04 0b 01 00 00 f1 b4 7b 00 |..9...........{.|
00001100: 00 00 f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 00 |....9....9......|
00001110: f2 0e 39 e6 00 00 00 39 d2 00 00 00 c2 01 f2 0e |..9....9........|
00001120: 39 e6 00 00 00 39 d2 00 00 00 c2 02 f2 0e 39 e6 |9....9........9.|
00001130: 00 00 00 39 d2 00 00 00 c2 03 f2 29 ec 03 32 52 |...9.......)..2R|
00001140: 00 03 08 1b 0e 20 0c 20 0d 0d 0b 1b 0e 34 0c 20 |..... . .....4. |
00001150: 0d 0d 0b 1b 0e 34 0c 20 0d 0d 0b 1b 1a 25 01 0d |.....4. .....%..|
00001160: 17 1b 1a 25 01 0d 17 1b 1a 25 01 0d 17 1b 1a 25 |...%.....%.....%|
00001170: 01 00 0c 42 06 01 00 00 00 00 02 00 00 0c 00 39 |...B...........9|
00001180: b9 00 00 00 04 0c 01 00 00 f1 29 ec 03 06 56 1e |..........)...V.|
00001190: 02 10 34 0c 00 0c 42 06 01 00 00 00 00 02 00 00 |..4...B.........|
000011a0: 0c 00 39 b9 00 00 00 04 0d 01 00 00 f1 29 ec 03 |..9..........)..|
000011b0: 06 57 1e 02 10 34 0c 00 0c 42 06 01 00 00 00 00 |.W...4...B......|
000011c0: 02 00 00 0c 00 39 b9 00 00 00 04 0e 01 00 00 f1 |.....9..........|
000011d0: 29 ec 03 06 58 1e 02 10 34 0c 00 0c 42 06 01 00 |)...X...4...B...|
000011e0: 00 00 00 02 00 00 0c 00 39 b9 00 00 00 04 0f 01 |........9.......|
000011f0: 00 00 f1 29 ec 03 06 59 1e 02 10 34 0c 00 0c 43 |...)...Y...4...C|
00001200: 06 01 d8 03 00 00 00 04 00 1e d4 03 00 39 e5 00 |.............9..|
00001210: 00 00 39 a0 00 00 00 c1 00 f1 c1 01 f2 0e 39 e5 |..9...........9.|
00001220: 00 00 00 39 a0 00 00 00 c1 02 8e f1 c1 03 8e f2 |...9............|
00001230: 0e 39 e5 00 00 00 c1 04 c1 05 ab 0a f2 0e 39 e5 |.9............9.|
00001240: 00 00 00 c1 06 c1 07 ab 09 f2 0e 39 e5 00 00 00 |...........9....|
00001250: b4 01 00 00 00 b4 64 00 00 00 a2 43 39 00 00 00 |......d....C9...|
00001260: bf 0a 24 01 00 04 10 01 00 00 f2 0e 39 e5 00 00 |..$.........9...|
00001270: 00 b4 ff ff ff ff b4 64 00 00 00 a2 43 39 00 00 |.......d....C9..|
00001280: 00 bf 24 24 01 00 04 11 01 00 00 f2 0e 39 e5 00 |..$$.........9..|
00001290: 00 00 b4 01 00 00 00 b4 64 00 00 00 a2 43 39 00 |........d....C9.|
000012a0: 00 00 bf 08 24 01 00 04 12 01 00 00 f2 0e 39 e5 |....$.........9.|
000012b0: 00 00 00 c1 08 b4 4e 00 00 00 a2 c1 09 f2 0e 39 |......N........9|
000012c0: e5 00 00 00 c1 0a 8e b4 4e 00 00 00 a2 c1 0b 8e |........N.......|
000012d0: f2 0e 39 e5 00 00 00 c1 0c b4 4e 00 00 00 a3 b4 |..9.......N.....|
000012e0: 19 69 01 00 f2 0e 39 e5 00 00 00 c1 0d 8e b4 4e |.i....9........N|
000012f0: 00 00 00 a3 b4 e6 96 fe ff f2 0e 39 e5 00 00 00 |...........9....|
00001300: b4 a6 3c 65 5a 97 b4 59 c3 9a a5 f2 0e 39 e5 00 |..<eZ..Y.....9..|
00001310: 00 00 b4 a6 3c 46 5a b4 56 68 37 67 b1 b4 f6 7c |....<FZ.Vh7g...||
00001320: 77 7f f2 0e 39 e5 00 00 00 b4 a6 3c 46 5a b4 56 |w...9......<FZ.V|
00001330: 68 37 67 af b4 06 28 06 42 f2 0e 39 e5 00 00 00 |h7g...(.B..9....|
00001340: b4 a6 3c 46 5a b4 56 68 37 67 b0 b4 f0 54 71 3d |..<FZ.Vh7g...Tq=|
00001350: f2 0e 39 e5 00 00 00 c1 0e c1 0f 9d c1 10 f2 0e |..9.............|
00001360: 39 e5 00 00 00 c1 11 8e c1 12 9d c1 13 8e f2 0e |9...............|
00001370: 39 e5 00 00 00 c1 14 8e c1 15 8e 9e c1 16 8e f2 |9...............|
00001380: 0e 39 e5 00 00 00 c1 17 c1 18 9e c1 19 f2 0e 39 |.9.............9|
00001390: e5 00 00 00 b4 fe ff ff ff b4 7f 00 00 00 a1 c1 |................|
000013a0: 1a 8e f2 0e 39 e5 00 00 00 b4 02 00 00 00 b4 7f |....9...........|
000013b0: 00 00 00 a1 c1 1b f2 0e 39 e5 00 00 00 b4 00 ff |........9.......|
000013c0: ff ff b4 0b 00 00 00 a1 c1 1c 8e f2 0e 39 e5 00 |.............9..|
000013d0: 00 00 b4 07 00 00 00 b4 14 00 00 00 a1 c1 1d f2 |................|
000013e0: 29 ec 03 be 01 5b 00 03 08 1b 0e 25 0c 11 0d 0d |)....[.....%....|
000013f0: 0b 1b 0e 25 0e 07 01 11 30 07 3d 0d 0b 2f 3c 0c |...%....0.=../<.|
00001400: 2f 0d 0b 2f 3c 0c 2f 0d 0b 4d 16 07 10 25 12 2a |/../<./..M...%.*|
00001410: 2b 0d 0b 1b 10 34 08 07 10 25 12 2a 2d 0d 0b 4d |+....4...%.*-..M|
00001420: 16 07 10 25 12 2a 2b 0d 0b 3e 46 11 39 0d 0b 25 |...%.*+..>F.9..%|
00001430: 0e 20 3a 11 10 07 4b 0d 0b 3e 46 20 39 0d 0b 25 |. :...K..>F 9..%|
00001440: 0e 20 3a 07 10 1b 4b 0d 0b 34 0e 07 1c 1b 1d 0d |. :...K..4......|
00001450: 0b 4d 26 20 19 0d 0b 4d 26 20 19 0d 0b 4d 26 20 |.M& ...M& ...M& |
00001460: 19 0d 0b 2f 44 11 37 0d 0b 25 0e 11 38 11 22 07 |.../D.7..%..8.".|
00001470: 5b 0d 0b 25 0e 11 3c 07 03 11 24 07 5d 0d 0b 2f |[..%..<...$.]../|
00001480: 44 11 37 0d 0b 1b 10 34 0a 11 12 07 1f 0d 0b 4d |D.7....4.......M|
00001490: 18 11 0b 0d 0b 1b 10 34 0e 11 10 07 21 0d 0b 4d |.......4....!..M|
000014a0: 18 11 0b 00 0a 09 ff ff ff ff ff ff ff ff 00 06 |................|
000014b0: 00 00 00 00 00 00 f0 43 0a 09 ff ff ff ff ff ff |.......C........|
000014c0: ff ff 00 06 00 00 00 00 00 00 f0 43 0a 09 00 00 |...........C....|
000014d0: 10 63 2d 5e c7 6b 05 06 40 8c b5 78 1d af 15 44 |.c-^.k..@..x...D|
000014e0: 0a 09 01 00 10 63 2d 5e c7 6b 05 06 40 8c b5 78 |.....c-^.k..@..x|
000014f0: 1d af 15 44 0a 0c 75 f7 41 5b 56 68 37 67 ca 53 |...D..u.A[Vh7g.S|
00001500: 46 5a 0a 16 00 00 00 00 00 00 00 00 00 40 dd 7d |FZ...........@.}|
00001510: d0 96 15 da cd 99 f2 94 91 16 0a 0c 75 f7 41 5b |............u.A[|
00001520: 56 68 37 67 ca 53 46 5a 0a 16 00 00 00 00 00 00 |Vh7g.SFZ........|
00001530: 00 00 00 40 dd 7d d0 96 15 da cd 99 f2 94 91 16 |...@.}..........|
00001540: 0a 0c 75 f7 41 5b 56 68 37 67 ca 53 46 5a 0a 0c |..u.A[Vh7g.SFZ..|
00001550: 75 f7 41 5b 56 68 37 67 ca 53 46 5a 0a 0b 7b 98 |u.A[Vh7g.SFZ..{.|
00001560: 63 1c 2f 7c 27 a3 6c a8 02 0a 05 0f 9c 42 bd 1c |c./|'.l......B..|
00001570: 0a 06 73 e2 cf fd ac 17 0a 0b 7b 98 63 1c 2f 7c |..s.......{.c./||
00001580: 27 a3 6c a8 02 0a 05 0f 9c 42 bd 1c 0a 06 73 e2 |'.l......B....s.|
00001590: cf fd ac 17 0a 0b 7b 98 63 1c 2f 7c 27 a3 6c a8 |......{.c./|'.l.|
000015a0: 02 0a 05 0f 9c 42 bd 1c 0a 05 be 3f 91 46 06 0a |.....B.....?.F..|
000015b0: 0b 7b 98 63 1c 2f 7c 27 a3 6c a8 02 0a 05 0f 9c |.{.c./|'.l......|
000015c0: 42 bd 1c 0a 05 be 3f 91 46 06 0a 11 00 00 00 00 |B.....?.F.......|
000015d0: 00 00 00 00 00 00 00 00 00 00 00 80 00 0a 11 00 |................|
000015e0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 80 00 |................|
000015f0: 0a 0c 00 00 00 00 00 00 00 00 00 00 00 01 0a 08 |................|
00001600: e1 16 7e b8 a4 7a 1b 01 0c 43 06 01 da 03 01 04 |..~..z...C......|
00001610: 01 03 00 00 58 05 84 04 00 01 00 a6 04 00 00 00 |....X...........|
00001620: a8 04 00 01 00 aa 04 00 02 00 8a 04 00 03 00 b4 |................|
00001630: 00 00 00 00 cb d3 b4 02 00 00 00 c7 a1 a3 b4 00 |................|
00001640: 00 00 00 ac ec 05 95 00 ee ec b4 00 00 00 00 cd |................|
00001650: d3 cc c7 b4 01 00 00 00 a0 ce ca b4 00 00 00 00 |................|
00001660: a8 ec 23 d3 b4 02 00 00 00 ca a1 a3 d0 b4 00 00 |..#.............|
00001670: 00 00 ac ec 0d c8 d7 c9 b4 01 00 00 00 ca a2 b1 |................|
00001680: cd 94 03 ee d6 c9 28 ec 03 3c 76 00 04 08 21 10 |......(..<v...!.|
00001690: 20 18 07 05 07 0d 20 24 12 25 18 11 21 0a 0d 08 | ..... $.%..!...|
000016a0: 20 0c 0c 0c 20 04 12 1b 20 18 07 05 07 0d 0d 05 | ... ... .......|
000016b0: 1b 06 12 02 0d 07 20 18 07 05 07 0d 00 02 07 2a |...... ........*|
000016c0: 00 04 0e 2f 07 0d 00 0c 43 06 01 dc 03 01 00 01 |.../....C.......|
000016d0: 03 00 00 14 01 84 04 00 01 00 39 ed 00 00 00 d3 |..........9.....|
000016e0: b4 01 00 00 00 a0 f1 b4 01 00 00 00 9f 28 ec 03 |.............(..|
000016f0: 0f 88 01 00 03 16 1b 16 20 04 07 05 20 12 07 33 |........ ... ..3|
00001700: 00 0c 43 06 01 de 03 01 03 01 03 00 00 3d 04 84 |..C..........=..|
00001710: 04 00 01 00 ac 04 00 00 00 ae 04 00 01 00 b0 04 |................|
00001720: 00 02 00 d3 b4 00 00 00 00 ab ec 03 d3 28 39 ee |.............(9.|
00001730: 00 00 00 d3 f1 cb b4 01 00 00 00 c7 b4 01 00 00 |................|
00001740: 00 9f b4 02 00 00 00 9d a2 cc c8 cd d3 c9 9d c9 |................|
00001750: 9f b4 02 00 00 00 9d d0 c9 a8 ed 03 ee ed c9 28 |...............(|
00001760: ec 03 31 8c 01 00 04 10 20 04 12 0a 07 0d 08 00 |..1..... .......|
00001770: 1b 14 07 01 0d 19 1b 18 20 04 20 0c 07 19 0f 02 |........ . .....|
00001780: 0d 04 07 08 07 03 07 0e 07 03 20 0a 0d 11 07 05 |.......... .....|
00001790: 1e 05 07 0d 00 0c 43 06 01 e0 03 01 0a 01 08 00 |......C.........|
000017a0: 03 bd 01 0b b2 04 00 01 00 b4 04 01 00 70 b6 04 |.............p..|
000017b0: 01 01 70 b8 04 01 02 30 ba 04 01 03 70 bc 04 01 |..p....0....p...|
000017c0: 04 30 be 04 00 00 40 86 04 00 06 00 c0 04 00 07 |.0....@.........|
000017d0: 00 c2 04 00 08 00 c4 04 00 09 00 c2 02 c5 05 63 |...............c|
000017e0: 04 00 63 03 00 63 02 00 63 01 00 63 00 00 b4 71 |..c..c..c..c...q|
000017f0: 63 cf 00 cb b4 a6 2d 7e 20 cc b4 40 c5 09 00 cd |c.....-~ ..@....|
00001800: c1 00 ce c1 01 c5 04 39 b9 00 00 00 39 a5 00 00 |.......9....9...|
00001810: 00 43 23 01 00 00 39 a0 00 00 00 d3 f1 64 04 00 |.C#...9......d..|
00001820: 9d 24 01 00 f1 b4 0a 00 00 00 9f c5 06 ee 27 11 |.$............'.|
00001830: 7f 7a 20 01 00 00 07 00 82 02 0e 3e 7a 21 01 00 |.z ........>z!..|
00001840: 00 08 00 82 02 0e 3e 7a 22 01 00 00 09 00 82 02 |......>z".......|
00001850: 0e 3e 86 ee 0e c4 05 b4 00 00 00 00 c4 06 09 f3 |.>..............|
00001860: ee ce 0e 64 02 00 b4 0c 00 00 00 9d c4 08 d3 a2 |...d............|
00001870: 9c c4 07 c4 08 64 00 00 9c 9f 9d c5 08 39 ef 00 |.....d.......9..|
00001880: 00 00 64 02 00 b4 02 00 00 00 d3 9c a2 f1 c5 09 |..d.............|
00001890: c4 08 c4 09 9c d3 a3 28 ec 03 59 9c 01 00 00 2c |.......(..Y....,|
000018a0: 3e 10 1b 0e 1b 08 1b 0c 1b 0e 07 01 07 12 11 03 |>...............|
000018b0: 07 1b 11 13 20 5e 12 71 16 02 39 06 39 06 48 0a |.... ^.q..9.9.H.|
000018c0: 25 18 11 09 17 1b 2a 0e 07 14 0c 0a 07 05 07 09 |%.....*.........|
000018d0: 07 22 0c 08 0c 08 11 03 07 07 07 09 12 39 1b 12 |."...........9..|
000018e0: 2a 20 07 03 07 0d 07 0f 12 07 0c 08 0c 03 07 10 |* ..............|
000018f0: 07 05 07 1d 00 0a 07 00 80 87 1d 04 dd 26 06 c7 |.............&..|
00001900: d7 88 04 22 8e 47 40 0c 43 06 01 be 04 03 0a 03 |...".G@.C.......|
00001910: 08 04 00 ed 01 0d 84 04 00 01 00 8c 04 00 01 00 |................|
00001920: c8 04 00 01 00 ca 04 00 00 00 c0 04 00 01 00 c2 |................|
00001930: 04 00 02 00 c4 04 00 03 00 cc 04 00 04 00 ce 04 |................|
00001940: 00 05 00 d0 04 00 06 00 d2 04 00 07 00 d4 04 00 |................|
00001950: 08 00 d6 04 00 09 00 b6 04 01 0d b4 04 00 0d ba |................|
00001960: 04 03 0d be 04 05 01 d3 d4 b4 01 00 00 00 a0 ab |................|
00001970: ec 4f b4 02 00 00 00 d4 9c b4 01 00 00 00 a0 b4 |.O..............|
00001980: 06 00 00 00 d4 9c b4 01 00 00 00 a0 9c b4 06 00 |................|
00001990: 00 00 d4 9c b4 05 00 00 00 a0 9c d2 68 00 00 d4 |............h...|
000019a0: 9c 68 01 00 9f 9c cc d4 b4 01 00 00 00 af ec 04 |.h..............|
000019b0: c8 8e cc d4 d4 9c d4 9c 68 02 00 9c cd ef 8f 00 |........h.......|
000019c0: d3 d4 9f b4 01 00 00 00 a3 cb ee 27 11 7f 7a 26 |...........'..z&|
000019d0: 01 00 00 04 00 82 02 0e 3e 7a 27 01 00 00 05 00 |........>z'.....|
000019e0: 82 02 0e 3e 7a 28 01 00 00 06 00 82 02 0e 3e 86 |...>z(........>.|
000019f0: ee 08 e2 d3 c7 0a f3 ee d4 0e ee 27 11 7f 7a 29 |...........'..z)|
00001a00: 01 00 00 07 00 82 02 0e 3e 7a 2a 01 00 00 08 00 |........>z*.....|
00001a10: 82 02 0e 3e 7a 2b 01 00 00 09 00 82 02 0e 3e 86 |...>z+........>.|
00001a20: ee 08 e2 c7 d4 d5 f3 ee d4 0e c4 04 c4 08 9c c4 |................|
00001a30: 07 c4 06 9c 9f cc c4 05 c4 08 9c cd d5 ec 09 c4 |................|
00001a40: 06 c4 09 9c ce ee 07 b4 00 00 00 00 ce c8 c9 ca |................|
00001a50: 26 03 00 28 ec 03 95 01 a3 01 04 04 10 07 0c 20 |&..(........... |
00001a60: 04 07 0b 12 03 1b 14 07 03 20 08 20 1c 07 03 20 |......... . ... |
00001a70: 08 07 13 20 30 07 03 20 08 07 13 0d 31 11 12 07 |... 0.. ....1...|
00001a80: 03 07 0c 11 03 07 1b 0d 03 20 04 12 06 07 01 0d |......... ......|
00001a90: 07 07 08 07 03 07 0c 07 03 07 0c 11 03 1e 11 07 |................|
00001aa0: 08 07 03 20 0a 0d 17 16 02 39 08 39 08 48 0c 07 |... .....9.9.H..|
00001ab0: 10 07 06 0c 07 17 2b 16 02 39 08 39 08 48 0c 07 |......+..9.9.H..|
00001ac0: 10 07 06 07 06 07 0d 17 23 0c 0a 0c 03 07 0e 0c |........#.......|
00001ad0: 0a 0c 03 07 09 0d 0f 0c 0a 0c 03 0d 05 12 08 0c |................|
00001ae0: 0a 0c 03 18 0d 22 00 07 06 07 06 16 1b 00 0c 43 |.....".........C|
00001af0: 06 01 e2 03 01 03 01 07 00 00 62 04 d8 04 00 01 |..........b.....|
00001b00: 00 88 04 00 00 00 da 04 00 01 00 dc 04 00 02 00 |................|
00001b10: 39 b9 00 00 00 39 a5 00 00 00 43 23 01 00 00 d3 |9....9....C#....|
00001b20: 39 a5 00 00 00 43 2f 01 00 00 bf 0a 24 01 00 9c |9....C/.....$...|
00001b30: 24 01 00 f1 b4 20 00 00 00 9f cc 39 f0 00 00 00 |$.... .....9....|
00001b40: c8 f1 cb b4 0a 00 00 00 39 b9 00 00 00 d3 f1 a1 |........9.......|
00001b50: c7 9c c8 a3 cf 43 39 00 00 00 24 00 00 d1 b7 48 |.....C9...$....H|
00001b60: 04 30 01 00 00 9f c9 43 31 01 00 00 b8 24 01 00 |.0.....C1....$..|
00001b70: 9f 28 ec 03 47 c1 01 00 00 00 08 1a 1b 0e 1b 08 |.(..G...........|
00001b80: 1b 0c 07 16 1b 08 25 0a 11 15 07 13 11 13 20 4c |......%....... L|
00001b90: 0d 61 1b 10 07 01 0d 15 1b 1a 1b 0e 07 01 07 11 |.a..............|
00001ba0: 07 2e 07 03 07 10 07 05 0d 39 1b 12 17 11 07 06 |.........9......|
00001bb0: 20 08 07 10 07 06 20 0c 11 15 07 27 00 0c 43 06 | ..... ....'..C.|
00001bc0: 01 e4 03 00 00 00 03 00 00 15 00 39 e5 00 00 00 |...........9....|
00001bd0: 39 f1 00 00 00 c0 d0 07 f1 04 32 01 00 00 f2 29 |9.........2....)|
00001be0: ec 03 0b cb 01 00 03 08 1b 0e 2a 14 20 15 00    |..........*. ..|
```