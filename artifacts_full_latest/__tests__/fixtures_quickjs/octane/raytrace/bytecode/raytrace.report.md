# 字节码分析报告

**输入文件**: /Users/aniwei/Desktop/workspaces/quickjs-typescript-compiler/__tests__/fixtures_quickjs/octane/raytrace.ts
**生成时间**: 2026-01-03T05:19:29.109Z

## 大小对比

- TypeScript编译器: 16102 字节
- WASM编译器: 16154 字节
- 差异: -52 字节 (-0.32%)

## 结构分析

### TypeScript编译器输出
```json
{
  "source": "TypeScript",
  "bcVersion": "0x5",
  "userAtomCount": 194,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/raytrace.js",
      "offset": 3
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "RayTrace",
      "offset": 84
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "checkNumber",
      "offset": 93
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Class",
      "offset": 105
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Flog",
      "offset": 111
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "renderScene",
      "offset": 116
    },
    {
      "index": 9,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 128
    },
    {
      "index": 10,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "extend",
      "offset": 135
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "RayTracer",
      "offset": 142
    },
    {
      "index": 12,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Color",
      "offset": 152
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "red",
      "offset": 158
    },
    {
      "index": 14,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "green",
      "offset": 162
    },
    {
      "index": 15,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "blue",
      "offset": 168
    },
    {
      "index": 16,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "initialize",
      "offset": 173
    },
    {
      "index": 17,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "addScalar",
      "offset": 184
    },
    {
      "index": 18,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "subtract",
      "offset": 194
    },
    {
      "index": 19,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 203
    },
    {
      "index": 20,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "multiplyScalar",
      "offset": 212
    },
    {
      "index": 21,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "divideFactor",
      "offset": 227
    },
    {
      "index": 22,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "limit",
      "offset": 240
    },
    {
      "index": 23,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "distance",
      "offset": 246
    },
    {
      "index": 24,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "blend",
      "offset": 255
    },
    {
      "index": 25,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "brightness",
      "offset": 261
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Light",
      "offset": 272
    },
    {
      "index": 27,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "position",
      "offset": 278
    },
    {
      "index": 28,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "color",
      "offset": 287
    },
    {
      "index": 29,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "intensity",
      "offset": 293
    },
    {
      "index": 30,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Vector",
      "offset": 303
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 310
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 312
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 314
    },
    {
      "index": 34,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "copy",
      "offset": 316
    },
    {
      "index": 35,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "normalize",
      "offset": 321
    },
    {
      "index": 36,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "magnitude",
      "offset": 331
    },
    {
      "index": 37,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "cross",
      "offset": 341
    },
    {
      "index": 38,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "dot",
      "offset": 347
    },
    {
      "index": 39,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "multiplyVector",
      "offset": 351
    },
    {
      "index": 40,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Ray",
      "offset": 366
    },
    {
      "index": 41,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "direction",
      "offset": 370
    },
    {
      "index": 42,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Scene",
      "offset": 380
    },
    {
      "index": 43,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "camera",
      "offset": 386
    },
    {
      "index": 44,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "shapes",
      "offset": 393
    },
    {
      "index": 45,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "lights",
      "offset": 400
    },
    {
      "index": 46,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "background",
      "offset": 407
    },
    {
      "index": 47,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "Material",
      "offset": 418
    },
    {
      "index": 48,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "BaseMaterial",
      "offset": 427
    },
    {
      "index": 49,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gloss",
      "offset": 440
    },
    {
      "index": 50,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "transparency",
      "offset": 446
    },
    {
      "index": 51,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "reflection",
      "offset": 459
    },
    {
      "index": 52,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "refraction",
      "offset": 470
    },
    {
      "index": 53,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hasTexture",
      "offset": 481
    },
    {
      "index": 54,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "getColor",
      "offset": 492
    },
    {
      "index": 55,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "wrapUp",
      "offset": 501
    },
    {
      "index": 56,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Solid",
      "offset": 508
    },
    {
      "index": 57,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Chessboard",
      "offset": 514
    },
    {
      "index": 58,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "colorEven",
      "offset": 525
    },
    {
      "index": 59,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "colorOdd",
      "offset": 535
    },
    {
      "index": 60,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "density",
      "offset": 544
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Shape",
      "offset": 552
    },
    {
      "index": 62,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Sphere",
      "offset": 558
    },
    {
      "index": 63,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "intersect",
      "offset": 565
    },
    {
      "index": 64,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Plane",
      "offset": 575
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 581
    },
    {
      "index": 66,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "IntersectionInfo",
      "offset": 583
    },
    {
      "index": 67,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isHit",
      "offset": 600
    },
    {
      "index": 68,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "hitCount",
      "offset": 606
    },
    {
      "index": 69,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "shape",
      "offset": 615
    },
    {
      "index": 70,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "normal",
      "offset": 621
    },
    {
      "index": 71,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Camera",
      "offset": 628
    },
    {
      "index": 72,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "lookAt",
      "offset": 635
    },
    {
      "index": 73,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "equator",
      "offset": 642
    },
    {
      "index": 74,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "up",
      "offset": 650
    },
    {
      "index": 75,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "screen",
      "offset": 653
    },
    {
      "index": 76,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "getRay",
      "offset": 660
    },
    {
      "index": 77,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Background",
      "offset": 667
    },
    {
      "index": 78,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ambience",
      "offset": 678
    },
    {
      "index": 79,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Engine",
      "offset": 687
    },
    {
      "index": 80,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "canvas",
      "offset": 694
    },
    {
      "index": 81,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "setPixel",
      "offset": 701
    },
    {
      "index": 82,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "getPixelColor",
      "offset": 710
    },
    {
      "index": 83,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "testIntersection",
      "offset": 724
    },
    {
      "index": 84,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "getReflectionRay",
      "offset": 741
    },
    {
      "index": 85,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "rayTrace",
      "offset": 758
    },
    {
      "index": 86,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "destination",
      "offset": 767
    },
    {
      "index": 87,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "property",
      "offset": 779
    },
    {
      "index": 88,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 788
    },
    {
      "index": 89,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 790
    },
    {
      "index": 90,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 792
    },
    {
      "index": 91,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c1",
      "offset": 794
    },
    {
      "index": 92,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c2",
      "offset": 797
    },
    {
      "index": 93,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 800
    },
    {
      "index": 94,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 807
    },
    {
      "index": 95,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 809
    },
    {
      "index": 96,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 811
    },
    {
      "index": 97,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "w",
      "offset": 815
    },
    {
      "index": 98,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 817
    },
    {
      "index": 99,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "rgb(",
      "offset": 823
    },
    {
      "index": 100,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 828
    },
    {
      "index": 101,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 830
    },
    {
      "index": 102,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pos",
      "offset": 832
    },
    {
      "index": 103,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Light [",
      "offset": 836
    },
    {
      "index": 104,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "]",
      "offset": 844
    },
    {
      "index": 105,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "vector",
      "offset": 846
    },
    {
      "index": 106,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 853
    },
    {
      "index": 107,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 855
    },
    {
      "index": 108,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 860
    },
    {
      "index": 109,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "Vectors must be defined [",
      "offset": 862
    },
    {
      "index": 110,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "Vector [",
      "offset": 888
    },
    {
      "index": 111,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "dir",
      "offset": 897
    },
    {
      "index": 112,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Ray [",
      "offset": 901
    },
    {
      "index": 113,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "u",
      "offset": 907
    },
    {
      "index": 114,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 909
    },
    {
      "index": 115,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "Material [gloss=",
      "offset": 911
    },
    {
      "index": 116,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": ", transparency=",
      "offset": 928
    },
    {
      "index": 117,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": ", hasTexture=",
      "offset": 944
    },
    {
      "index": 118,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "SolidMaterial [gloss=",
      "offset": 958
    },
    {
      "index": 119,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "ChessMaterial [gloss=",
      "offset": 980
    },
    {
      "index": 120,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "radius",
      "offset": 1002
    },
    {
      "index": 121,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "material",
      "offset": 1009
    },
    {
      "index": 122,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ray",
      "offset": 1018
    },
    {
      "index": 123,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "info",
      "offset": 1022
    },
    {
      "index": 124,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "dst",
      "offset": 1027
    },
    {
      "index": 125,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "B",
      "offset": 1031
    },
    {
      "index": 126,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 1033
    },
    {
      "index": 127,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "D",
      "offset": 1035
    },
    {
      "index": 128,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "Sphere [position=",
      "offset": 1037
    },
    {
      "index": 129,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": ", radius=",
      "offset": 1055
    },
    {
      "index": 130,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Vd",
      "offset": 1065
    },
    {
      "index": 131,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vU",
      "offset": 1068
    },
    {
      "index": 132,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vV",
      "offset": 1071
    },
    {
      "index": 133,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Plane [",
      "offset": 1074
    },
    {
      "index": 134,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": ", d=",
      "offset": 1082
    },
    {
      "index": 135,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "Intersection [",
      "offset": 1087
    },
    {
      "index": 136,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vx",
      "offset": 1102
    },
    {
      "index": 137,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vy",
      "offset": 1105
    },
    {
      "index": 138,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Ray []",
      "offset": 1108
    },
    {
      "index": 139,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "options",
      "offset": 1115
    },
    {
      "index": 140,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "canvasHeight",
      "offset": 1123
    },
    {
      "index": 141,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "canvasWidth",
      "offset": 1136
    },
    {
      "index": 142,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "pixelWidth",
      "offset": 1148
    },
    {
      "index": 143,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "pixelHeight",
      "offset": 1159
    },
    {
      "index": 144,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "renderDiffuse",
      "offset": 1171
    },
    {
      "index": 145,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "renderShadows",
      "offset": 1185
    },
    {
      "index": 146,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "renderHighlights",
      "offset": 1199
    },
    {
      "index": 147,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "renderReflections",
      "offset": 1216
    },
    {
      "index": 148,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "rayDepth",
      "offset": 1234
    },
    {
      "index": 149,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pxW",
      "offset": 1243
    },
    {
      "index": 150,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pxH",
      "offset": 1247
    },
    {
      "index": 151,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "fillStyle",
      "offset": 1251
    },
    {
      "index": 152,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fillRect",
      "offset": 1261
    },
    {
      "index": 153,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "scene",
      "offset": 1270
    },
    {
      "index": 154,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "yp",
      "offset": 1276
    },
    {
      "index": 155,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "xp",
      "offset": 1279
    },
    {
      "index": 156,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "getContext",
      "offset": 1282
    },
    {
      "index": 157,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "2d",
      "offset": 1293
    },
    {
      "index": 158,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "Scene rendered incorrectly",
      "offset": 1296
    },
    {
      "index": 159,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "exclude",
      "offset": 1323
    },
    {
      "index": 160,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "hits",
      "offset": 1331
    },
    {
      "index": 161,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "best",
      "offset": 1336
    },
    {
      "index": 162,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 1341
    },
    {
      "index": 163,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "P",
      "offset": 1343
    },
    {
      "index": 164,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "N",
      "offset": 1345
    },
    {
      "index": 165,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "V",
      "offset": 1347
    },
    {
      "index": 166,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "R1",
      "offset": 1349
    },
    {
      "index": 167,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "depth",
      "offset": 1352
    },
    {
      "index": 168,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "oldColor",
      "offset": 1358
    },
    {
      "index": 169,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shininess",
      "offset": 1367
    },
    {
      "index": 170,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "light",
      "offset": 1377
    },
    {
      "index": 171,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "L",
      "offset": 1383
    },
    {
      "index": 172,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "reflectionRay",
      "offset": 1385
    },
    {
      "index": 173,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "refl",
      "offset": 1399
    },
    {
      "index": 174,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "shadowInfo",
      "offset": 1404
    },
    {
      "index": 175,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shadowRay",
      "offset": 1415
    },
    {
      "index": 176,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vA",
      "offset": 1425
    },
    {
      "index": 177,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dB",
      "offset": 1428
    },
    {
      "index": 178,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Lv",
      "offset": 1431
    },
    {
      "index": 179,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "E",
      "offset": 1434
    },
    {
      "index": 180,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "H",
      "offset": 1436
    },
    {
      "index": 181,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "glossWeight",
      "offset": 1438
    },
    {
      "index": 182,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 1450
    },
    {
      "index": 183,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 1454
    },
    {
      "index": 184,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "sphere",
      "offset": 1458
    },
    {
      "index": 185,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sphere1",
      "offset": 1465
    },
    {
      "index": 186,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "plane",
      "offset": 1473
    },
    {
      "index": 187,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "light1",
      "offset": 1479
    },
    {
      "index": 188,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "imageWidth",
      "offset": 1486
    },
    {
      "index": 189,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "imageHeight",
      "offset": 1497
    },
    {
      "index": 190,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "pixelSize",
      "offset": 1509
    },
    {
      "index": 191,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "raytracer",
      "offset": 1519
    },
    {
      "index": 192,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 1529
    },
    {
      "index": 193,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "5,5",
      "offset": 1534
    }
  ],
  "functionHeader": {
    "offset": 1538,
    "tag": "0xd",
    "remaining": 14564
  }
}
```

### WASM编译器输出
```json
{
  "source": "WASM",
  "bcVersion": "0x5",
  "userAtomCount": 194,
  "atoms": [
    {
      "index": 0,
      "rawLength": 90,
      "actualLength": 45,
      "isWideChar": 0,
      "string": "__tests__/fixtures_quickjs/octane/raytrace.js",
      "offset": 3
    },
    {
      "index": 1,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "./base.js",
      "offset": 49
    },
    {
      "index": 2,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "Benchmark",
      "offset": 59
    },
    {
      "index": 3,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "BenchmarkSuite",
      "offset": 69
    },
    {
      "index": 4,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "RayTrace",
      "offset": 84
    },
    {
      "index": 5,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "checkNumber",
      "offset": 93
    },
    {
      "index": 6,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Class",
      "offset": 105
    },
    {
      "index": 7,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "Flog",
      "offset": 111
    },
    {
      "index": 8,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "renderScene",
      "offset": 116
    },
    {
      "index": 9,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "create",
      "offset": 128
    },
    {
      "index": 10,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "extend",
      "offset": 135
    },
    {
      "index": 11,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "RayTracer",
      "offset": 142
    },
    {
      "index": 12,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Color",
      "offset": 152
    },
    {
      "index": 13,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "red",
      "offset": 158
    },
    {
      "index": 14,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "green",
      "offset": 162
    },
    {
      "index": 15,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "blue",
      "offset": 168
    },
    {
      "index": 16,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "initialize",
      "offset": 173
    },
    {
      "index": 17,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "addScalar",
      "offset": 184
    },
    {
      "index": 18,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "subtract",
      "offset": 194
    },
    {
      "index": 19,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "multiply",
      "offset": 203
    },
    {
      "index": 20,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "multiplyScalar",
      "offset": 212
    },
    {
      "index": 21,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "divideFactor",
      "offset": 227
    },
    {
      "index": 22,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "limit",
      "offset": 240
    },
    {
      "index": 23,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "distance",
      "offset": 246
    },
    {
      "index": 24,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "blend",
      "offset": 255
    },
    {
      "index": 25,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "brightness",
      "offset": 261
    },
    {
      "index": 26,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Light",
      "offset": 272
    },
    {
      "index": 27,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "position",
      "offset": 278
    },
    {
      "index": 28,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "color",
      "offset": 287
    },
    {
      "index": 29,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "intensity",
      "offset": 293
    },
    {
      "index": 30,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Vector",
      "offset": 303
    },
    {
      "index": 31,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "x",
      "offset": 310
    },
    {
      "index": 32,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "y",
      "offset": 312
    },
    {
      "index": 33,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "z",
      "offset": 314
    },
    {
      "index": 34,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "copy",
      "offset": 316
    },
    {
      "index": 35,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "normalize",
      "offset": 321
    },
    {
      "index": 36,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "magnitude",
      "offset": 331
    },
    {
      "index": 37,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "cross",
      "offset": 341
    },
    {
      "index": 38,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "dot",
      "offset": 347
    },
    {
      "index": 39,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "multiplyVector",
      "offset": 351
    },
    {
      "index": 40,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "Ray",
      "offset": 366
    },
    {
      "index": 41,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "direction",
      "offset": 370
    },
    {
      "index": 42,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Scene",
      "offset": 380
    },
    {
      "index": 43,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "camera",
      "offset": 386
    },
    {
      "index": 44,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "shapes",
      "offset": 393
    },
    {
      "index": 45,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "lights",
      "offset": 400
    },
    {
      "index": 46,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "background",
      "offset": 407
    },
    {
      "index": 47,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "Material",
      "offset": 418
    },
    {
      "index": 48,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "BaseMaterial",
      "offset": 427
    },
    {
      "index": 49,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "gloss",
      "offset": 440
    },
    {
      "index": 50,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "transparency",
      "offset": 446
    },
    {
      "index": 51,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "reflection",
      "offset": 459
    },
    {
      "index": 52,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "refraction",
      "offset": 470
    },
    {
      "index": 53,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "hasTexture",
      "offset": 481
    },
    {
      "index": 54,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "getColor",
      "offset": 492
    },
    {
      "index": 55,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "wrapUp",
      "offset": 501
    },
    {
      "index": 56,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Solid",
      "offset": 508
    },
    {
      "index": 57,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Chessboard",
      "offset": 514
    },
    {
      "index": 58,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "colorEven",
      "offset": 525
    },
    {
      "index": 59,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "colorOdd",
      "offset": 535
    },
    {
      "index": 60,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "density",
      "offset": 544
    },
    {
      "index": 61,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Shape",
      "offset": 552
    },
    {
      "index": 62,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Sphere",
      "offset": 558
    },
    {
      "index": 63,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "intersect",
      "offset": 565
    },
    {
      "index": 64,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Plane",
      "offset": 575
    },
    {
      "index": 65,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "d",
      "offset": 581
    },
    {
      "index": 66,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "IntersectionInfo",
      "offset": 583
    },
    {
      "index": 67,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "isHit",
      "offset": 600
    },
    {
      "index": 68,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "hitCount",
      "offset": 606
    },
    {
      "index": 69,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "shape",
      "offset": 615
    },
    {
      "index": 70,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "normal",
      "offset": 621
    },
    {
      "index": 71,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Camera",
      "offset": 628
    },
    {
      "index": 72,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "lookAt",
      "offset": 635
    },
    {
      "index": 73,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "equator",
      "offset": 642
    },
    {
      "index": 74,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "up",
      "offset": 650
    },
    {
      "index": 75,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "screen",
      "offset": 653
    },
    {
      "index": 76,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "getRay",
      "offset": 660
    },
    {
      "index": 77,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "Background",
      "offset": 667
    },
    {
      "index": 78,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "ambience",
      "offset": 678
    },
    {
      "index": 79,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Engine",
      "offset": 687
    },
    {
      "index": 80,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "canvas",
      "offset": 694
    },
    {
      "index": 81,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "setPixel",
      "offset": 701
    },
    {
      "index": 82,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "getPixelColor",
      "offset": 710
    },
    {
      "index": 83,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "testIntersection",
      "offset": 724
    },
    {
      "index": 84,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "getReflectionRay",
      "offset": 741
    },
    {
      "index": 85,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "rayTrace",
      "offset": 758
    },
    {
      "index": 86,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "destination",
      "offset": 767
    },
    {
      "index": 87,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "property",
      "offset": 779
    },
    {
      "index": 88,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "r",
      "offset": 788
    },
    {
      "index": 89,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "g",
      "offset": 790
    },
    {
      "index": 90,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "b",
      "offset": 792
    },
    {
      "index": 91,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c1",
      "offset": 794
    },
    {
      "index": 92,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "c2",
      "offset": 797
    },
    {
      "index": 93,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "result",
      "offset": 800
    },
    {
      "index": 94,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "s",
      "offset": 807
    },
    {
      "index": 95,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "f",
      "offset": 809
    },
    {
      "index": 96,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "abs",
      "offset": 811
    },
    {
      "index": 97,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "w",
      "offset": 815
    },
    {
      "index": 98,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "floor",
      "offset": 817
    },
    {
      "index": 99,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "rgb(",
      "offset": 823
    },
    {
      "index": 100,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ",",
      "offset": 828
    },
    {
      "index": 101,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": ")",
      "offset": 830
    },
    {
      "index": 102,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pos",
      "offset": 832
    },
    {
      "index": 103,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Light [",
      "offset": 836
    },
    {
      "index": 104,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "]",
      "offset": 844
    },
    {
      "index": 105,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "vector",
      "offset": 846
    },
    {
      "index": 106,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "m",
      "offset": 853
    },
    {
      "index": 107,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "sqrt",
      "offset": 855
    },
    {
      "index": 108,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "v",
      "offset": 860
    },
    {
      "index": 109,
      "rawLength": 50,
      "actualLength": 25,
      "isWideChar": 0,
      "string": "Vectors must be defined [",
      "offset": 862
    },
    {
      "index": 110,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "Vector [",
      "offset": 888
    },
    {
      "index": 111,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "dir",
      "offset": 897
    },
    {
      "index": 112,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "Ray [",
      "offset": 901
    },
    {
      "index": 113,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "u",
      "offset": 907
    },
    {
      "index": 114,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "t",
      "offset": 909
    },
    {
      "index": 115,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "Material [gloss=",
      "offset": 911
    },
    {
      "index": 116,
      "rawLength": 30,
      "actualLength": 15,
      "isWideChar": 0,
      "string": ", transparency=",
      "offset": 928
    },
    {
      "index": 117,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": ", hasTexture=",
      "offset": 944
    },
    {
      "index": 118,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "SolidMaterial [gloss=",
      "offset": 958
    },
    {
      "index": 119,
      "rawLength": 42,
      "actualLength": 21,
      "isWideChar": 0,
      "string": "ChessMaterial [gloss=",
      "offset": 980
    },
    {
      "index": 120,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "radius",
      "offset": 1002
    },
    {
      "index": 121,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "material",
      "offset": 1009
    },
    {
      "index": 122,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "ray",
      "offset": 1018
    },
    {
      "index": 123,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "info",
      "offset": 1022
    },
    {
      "index": 124,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "dst",
      "offset": 1027
    },
    {
      "index": 125,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "B",
      "offset": 1031
    },
    {
      "index": 126,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "C",
      "offset": 1033
    },
    {
      "index": 127,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "D",
      "offset": 1035
    },
    {
      "index": 128,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "Sphere [position=",
      "offset": 1037
    },
    {
      "index": 129,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": ", radius=",
      "offset": 1055
    },
    {
      "index": 130,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Vd",
      "offset": 1065
    },
    {
      "index": 131,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vU",
      "offset": 1068
    },
    {
      "index": 132,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vV",
      "offset": 1071
    },
    {
      "index": 133,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "Plane [",
      "offset": 1074
    },
    {
      "index": 134,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": ", d=",
      "offset": 1082
    },
    {
      "index": 135,
      "rawLength": 28,
      "actualLength": 14,
      "isWideChar": 0,
      "string": "Intersection [",
      "offset": 1087
    },
    {
      "index": 136,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vx",
      "offset": 1102
    },
    {
      "index": 137,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vy",
      "offset": 1105
    },
    {
      "index": 138,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "Ray []",
      "offset": 1108
    },
    {
      "index": 139,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "options",
      "offset": 1115
    },
    {
      "index": 140,
      "rawLength": 24,
      "actualLength": 12,
      "isWideChar": 0,
      "string": "canvasHeight",
      "offset": 1123
    },
    {
      "index": 141,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "canvasWidth",
      "offset": 1136
    },
    {
      "index": 142,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "pixelWidth",
      "offset": 1148
    },
    {
      "index": 143,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "pixelHeight",
      "offset": 1159
    },
    {
      "index": 144,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "renderDiffuse",
      "offset": 1171
    },
    {
      "index": 145,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "renderShadows",
      "offset": 1185
    },
    {
      "index": 146,
      "rawLength": 32,
      "actualLength": 16,
      "isWideChar": 0,
      "string": "renderHighlights",
      "offset": 1199
    },
    {
      "index": 147,
      "rawLength": 34,
      "actualLength": 17,
      "isWideChar": 0,
      "string": "renderReflections",
      "offset": 1216
    },
    {
      "index": 148,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "rayDepth",
      "offset": 1234
    },
    {
      "index": 149,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pxW",
      "offset": 1243
    },
    {
      "index": 150,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pxH",
      "offset": 1247
    },
    {
      "index": 151,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "fillStyle",
      "offset": 1251
    },
    {
      "index": 152,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "fillRect",
      "offset": 1261
    },
    {
      "index": 153,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "scene",
      "offset": 1270
    },
    {
      "index": 154,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "yp",
      "offset": 1276
    },
    {
      "index": 155,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "xp",
      "offset": 1279
    },
    {
      "index": 156,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "getContext",
      "offset": 1282
    },
    {
      "index": 157,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "2d",
      "offset": 1293
    },
    {
      "index": 158,
      "rawLength": 52,
      "actualLength": 26,
      "isWideChar": 0,
      "string": "Scene rendered incorrectly",
      "offset": 1296
    },
    {
      "index": 159,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "exclude",
      "offset": 1323
    },
    {
      "index": 160,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "hits",
      "offset": 1331
    },
    {
      "index": 161,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "best",
      "offset": 1336
    },
    {
      "index": 162,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "i",
      "offset": 1341
    },
    {
      "index": 163,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "P",
      "offset": 1343
    },
    {
      "index": 164,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "N",
      "offset": 1345
    },
    {
      "index": 165,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "V",
      "offset": 1347
    },
    {
      "index": 166,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "R1",
      "offset": 1349
    },
    {
      "index": 167,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "depth",
      "offset": 1352
    },
    {
      "index": 168,
      "rawLength": 16,
      "actualLength": 8,
      "isWideChar": 0,
      "string": "oldColor",
      "offset": 1358
    },
    {
      "index": 169,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shininess",
      "offset": 1367
    },
    {
      "index": 170,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "light",
      "offset": 1377
    },
    {
      "index": 171,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "L",
      "offset": 1383
    },
    {
      "index": 172,
      "rawLength": 26,
      "actualLength": 13,
      "isWideChar": 0,
      "string": "reflectionRay",
      "offset": 1385
    },
    {
      "index": 173,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "refl",
      "offset": 1399
    },
    {
      "index": 174,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "shadowInfo",
      "offset": 1404
    },
    {
      "index": 175,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "shadowRay",
      "offset": 1415
    },
    {
      "index": 176,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "vA",
      "offset": 1425
    },
    {
      "index": 177,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "dB",
      "offset": 1428
    },
    {
      "index": 178,
      "rawLength": 4,
      "actualLength": 2,
      "isWideChar": 0,
      "string": "Lv",
      "offset": 1431
    },
    {
      "index": 179,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "E",
      "offset": 1434
    },
    {
      "index": 180,
      "rawLength": 2,
      "actualLength": 1,
      "isWideChar": 0,
      "string": "H",
      "offset": 1436
    },
    {
      "index": 181,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "glossWeight",
      "offset": 1438
    },
    {
      "index": 182,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "pow",
      "offset": 1450
    },
    {
      "index": 183,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "max",
      "offset": 1454
    },
    {
      "index": 184,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "sphere",
      "offset": 1458
    },
    {
      "index": 185,
      "rawLength": 14,
      "actualLength": 7,
      "isWideChar": 0,
      "string": "sphere1",
      "offset": 1465
    },
    {
      "index": 186,
      "rawLength": 10,
      "actualLength": 5,
      "isWideChar": 0,
      "string": "plane",
      "offset": 1473
    },
    {
      "index": 187,
      "rawLength": 12,
      "actualLength": 6,
      "isWideChar": 0,
      "string": "light1",
      "offset": 1479
    },
    {
      "index": 188,
      "rawLength": 20,
      "actualLength": 10,
      "isWideChar": 0,
      "string": "imageWidth",
      "offset": 1486
    },
    {
      "index": 189,
      "rawLength": 22,
      "actualLength": 11,
      "isWideChar": 0,
      "string": "imageHeight",
      "offset": 1497
    },
    {
      "index": 190,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "pixelSize",
      "offset": 1509
    },
    {
      "index": 191,
      "rawLength": 18,
      "actualLength": 9,
      "isWideChar": 0,
      "string": "raytracer",
      "offset": 1519
    },
    {
      "index": 192,
      "rawLength": 8,
      "actualLength": 4,
      "isWideChar": 0,
      "string": "push",
      "offset": 1529
    },
    {
      "index": 193,
      "rawLength": 6,
      "actualLength": 3,
      "isWideChar": 0,
      "string": "5,5",
      "offset": 1534
    }
  ],
  "functionHeader": {
    "offset": 1538,
    "tag": "0xd",
    "remaining": 14616
  }
}
```

## 字节级差异

共发现 12990 个字节差异:

- 偏移量 0x621: TS=0x07 vs WASM=0x14
- 偏移量 0x63e: TS=0xd8 vs WASM=0xd6
- 偏移量 0x640: TS=0x11 vs WASM=0x04
- 偏移量 0x642: TS=0x08 vs WASM=0xd6
- 偏移量 0x643: TS=0xec vs WASM=0x03
- 偏移量 0x644: TS=0x07 vs WASM=0x05
- 偏移量 0x645: TS=0xc2 vs WASM=0x01
- 偏移量 0x646: TS=0x3d vs WASM=0xd6
- 偏移量 0x647: TS=0x61 vs WASM=0x03
- 偏移量 0x649: TS=0x00 vs WASM=0x01
- 偏移量 0x64a: TS=0x29 vs WASM=0xd6
- 偏移量 0x64b: TS=0x68 vs WASM=0x03
- 偏移量 0x64c: TS=0x01 vs WASM=0x07
- 偏移量 0x64d: TS=0x00 vs WASM=0x01
- 偏移量 0x64e: TS=0x11 vs WASM=0xd6
- 偏移量 0x64f: TS=0x04 vs WASM=0x03
- 偏移量 0x650: TS=0xe8 vs WASM=0x08
- 偏移量 0x651: TS=0x00 vs WASM=0x01
- 偏移量 0x652: TS=0x00 vs WASM=0xd6
- 偏移量 0x653: TS=0x00 vs WASM=0x03
- ... (显示前20个差异，总共12990个)

## 十六进制转储对比

### TypeScript
```
00000000: 05 c2 01 5a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |...Z__tests__/fi|
00000010: 78 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f |xtures_quickjs/o|
00000020: 63 74 61 6e 65 2f 72 61 79 74 72 61 63 65 2e 6a |ctane/raytrace.j|
00000030: 73 12 2e 2f 62 61 73 65 2e 6a 73 12 42 65 6e 63 |s../base.js.Benc|
00000040: 68 6d 61 72 6b 1c 42 65 6e 63 68 6d 61 72 6b 53 |hmark.BenchmarkS|
00000050: 75 69 74 65 10 52 61 79 54 72 61 63 65 16 63 68 |uite.RayTrace.ch|
00000060: 65 63 6b 4e 75 6d 62 65 72 0a 43 6c 61 73 73 08 |eckNumber.Class.|
00000070: 46 6c 6f 67 16 72 65 6e 64 65 72 53 63 65 6e 65 |Flog.renderScene|
00000080: 0c 63 72 65 61 74 65 0c 65 78 74 65 6e 64 12 52 |.create.extend.R|
00000090: 61 79 54 72 61 63 65 72 0a 43 6f 6c 6f 72 06 72 |ayTracer.Color.r|
000000a0: 65 64 0a 67 72 65 65 6e 08 62 6c 75 65 14 69 6e |ed.green.blue.in|
000000b0: 69 74 69 61 6c 69 7a 65 12 61 64 64 53 63 61 6c |itialize.addScal|
000000c0: 61 72 10 73 75 62 74 72 61 63 74 10 6d 75 6c 74 |ar.subtract.mult|
000000d0: 69 70 6c 79 1c 6d 75 6c 74 69 70 6c 79 53 63 61 |iply.multiplySca|
000000e0: 6c 61 72 18 64 69 76 69 64 65 46 61 63 74 6f 72 |lar.divideFactor|
000000f0: 0a 6c 69 6d 69 74 10 64 69 73 74 61 6e 63 65 0a |.limit.distance.|
00000100: 62 6c 65 6e 64 14 62 72 69 67 68 74 6e 65 73 73 |blend.brightness|
00000110: 0a 4c 69 67 68 74 10 70 6f 73 69 74 69 6f 6e 0a |.Light.position.|
00000120: 63 6f 6c 6f 72 12 69 6e 74 65 6e 73 69 74 79 0c |color.intensity.|
00000130: 56 65 63 74 6f 72 02 78 02 79 02 7a 08 63 6f 70 |Vector.x.y.z.cop|
00000140: 79 12 6e 6f 72 6d 61 6c 69 7a 65 12 6d 61 67 6e |y.normalize.magn|
00000150: 69 74 75 64 65 0a 63 72 6f 73 73 06 64 6f 74 1c |itude.cross.dot.|
00000160: 6d 75 6c 74 69 70 6c 79 56 65 63 74 6f 72 06 52 |multiplyVector.R|
00000170: 61 79 12 64 69 72 65 63 74 69 6f 6e 0a 53 63 65 |ay.direction.Sce|
00000180: 6e 65 0c 63 61 6d 65 72 61 0c 73 68 61 70 65 73 |ne.camera.shapes|
00000190: 0c 6c 69 67 68 74 73 14 62 61 63 6b 67 72 6f 75 |.lights.backgrou|
000001a0: 6e 64 10 4d 61 74 65 72 69 61 6c 18 42 61 73 65 |nd.Material.Base|
000001b0: 4d 61 74 65 72 69 61 6c 0a 67 6c 6f 73 73 18 74 |Material.gloss.t|
000001c0: 72 61 6e 73 70 61 72 65 6e 63 79 14 72 65 66 6c |ransparency.refl|
000001d0: 65 63 74 69 6f 6e 14 72 65 66 72 61 63 74 69 6f |ection.refractio|
000001e0: 6e 14 68 61 73 54 65 78 74 75 72 65 10 67 65 74 |n.hasTexture.get|
000001f0: 43 6f 6c 6f 72 0c 77 72 61 70 55 70 0a 53 6f 6c |Color.wrapUp.Sol|
00000200: 69 64 14 43 68 65 73 73 62 6f 61 72 64 12 63 6f |id.Chessboard.co|
00000210: 6c 6f 72 45 76 65 6e 10 63 6f 6c 6f 72 4f 64 64 |lorEven.colorOdd|
00000220: 0e 64 65 6e 73 69 74 79 0a 53 68 61 70 65 0c 53 |.density.Shape.S|
00000230: 70 68 65 72 65 12 69 6e 74 65 72 73 65 63 74 0a |phere.intersect.|
00000240: 50 6c 61 6e 65 02 64 20 49 6e 74 65 72 73 65 63 |Plane.d Intersec|
00000250: 74 69 6f 6e 49 6e 66 6f 0a 69 73 48 69 74 10 68 |tionInfo.isHit.h|
00000260: 69 74 43 6f 75 6e 74 0a 73 68 61 70 65 0c 6e 6f |itCount.shape.no|
00000270: 72 6d 61 6c 0c 43 61 6d 65 72 61 0c 6c 6f 6f 6b |rmal.Camera.look|
00000280: 41 74 0e 65 71 75 61 74 6f 72 04 75 70 0c 73 63 |At.equator.up.sc|
00000290: 72 65 65 6e 0c 67 65 74 52 61 79 14 42 61 63 6b |reen.getRay.Back|
000002a0: 67 72 6f 75 6e 64 10 61 6d 62 69 65 6e 63 65 0c |ground.ambience.|
000002b0: 45 6e 67 69 6e 65 0c 63 61 6e 76 61 73 10 73 65 |Engine.canvas.se|
000002c0: 74 50 69 78 65 6c 1a 67 65 74 50 69 78 65 6c 43 |tPixel.getPixelC|
000002d0: 6f 6c 6f 72 20 74 65 73 74 49 6e 74 65 72 73 65 |olor testInterse|
000002e0: 63 74 69 6f 6e 20 67 65 74 52 65 66 6c 65 63 74 |ction getReflect|
000002f0: 69 6f 6e 52 61 79 10 72 61 79 54 72 61 63 65 16 |ionRay.rayTrace.|
00000300: 64 65 73 74 69 6e 61 74 69 6f 6e 10 70 72 6f 70 |destination.prop|
00000310: 65 72 74 79 02 72 02 67 02 62 04 63 31 04 63 32 |erty.r.g.b.c1.c2|
00000320: 0c 72 65 73 75 6c 74 02 73 02 66 06 61 62 73 02 |.result.s.f.abs.|
00000330: 77 0a 66 6c 6f 6f 72 08 72 67 62 28 02 2c 02 29 |w.floor.rgb(.,.)|
00000340: 06 70 6f 73 0e 4c 69 67 68 74 20 5b 02 5d 0c 76 |.pos.Light [.].v|
00000350: 65 63 74 6f 72 02 6d 08 73 71 72 74 02 76 32 56 |ector.m.sqrt.v2V|
00000360: 65 63 74 6f 72 73 20 6d 75 73 74 20 62 65 20 64 |ectors must be d|
00000370: 65 66 69 6e 65 64 20 5b 10 56 65 63 74 6f 72 20 |efined [.Vector |
00000380: 5b 06 64 69 72 0a 52 61 79 20 5b 02 75 02 74 20 |[.dir.Ray [.u.t |
00000390: 4d 61 74 65 72 69 61 6c 20 5b 67 6c 6f 73 73 3d |Material [gloss=|
000003a0: 1e 2c 20 74 72 61 6e 73 70 61 72 65 6e 63 79 3d |., transparency=|
000003b0: 1a 2c 20 68 61 73 54 65 78 74 75 72 65 3d 2a 53 |., hasTexture=*S|
000003c0: 6f 6c 69 64 4d 61 74 65 72 69 61 6c 20 5b 67 6c |olidMaterial [gl|
000003d0: 6f 73 73 3d 2a 43 68 65 73 73 4d 61 74 65 72 69 |oss=*ChessMateri|
000003e0: 61 6c 20 5b 67 6c 6f 73 73 3d 0c 72 61 64 69 75 |al [gloss=.radiu|
000003f0: 73 10 6d 61 74 65 72 69 61 6c 06 72 61 79 08 69 |s.material.ray.i|
00000400: 6e 66 6f 06 64 73 74 02 42 02 43 02 44 22 53 70 |nfo.dst.B.C.D"Sp|
00000410: 68 65 72 65 20 5b 70 6f 73 69 74 69 6f 6e 3d 12 |here [position=.|
00000420: 2c 20 72 61 64 69 75 73 3d 04 56 64 04 76 55 04 |, radius=.Vd.vU.|
00000430: 76 56 0e 50 6c 61 6e 65 20 5b 08 2c 20 64 3d 1c |vV.Plane [., d=.|
00000440: 49 6e 74 65 72 73 65 63 74 69 6f 6e 20 5b 04 76 |Intersection [.v|
00000450: 78 04 76 79 0c 52 61 79 20 5b 5d 0e 6f 70 74 69 |x.vy.Ray [].opti|
00000460: 6f 6e 73 18 63 61 6e 76 61 73 48 65 69 67 68 74 |ons.canvasHeight|
00000470: 16 63 61 6e 76 61 73 57 69 64 74 68 14 70 69 78 |.canvasWidth.pix|
00000480: 65 6c 57 69 64 74 68 16 70 69 78 65 6c 48 65 69 |elWidth.pixelHei|
00000490: 67 68 74 1a 72 65 6e 64 65 72 44 69 66 66 75 73 |ght.renderDiffus|
000004a0: 65 1a 72 65 6e 64 65 72 53 68 61 64 6f 77 73 20 |e.renderShadows |
000004b0: 72 65 6e 64 65 72 48 69 67 68 6c 69 67 68 74 73 |renderHighlights|
000004c0: 22 72 65 6e 64 65 72 52 65 66 6c 65 63 74 69 6f |"renderReflectio|
000004d0: 6e 73 10 72 61 79 44 65 70 74 68 06 70 78 57 06 |ns.rayDepth.pxW.|
000004e0: 70 78 48 12 66 69 6c 6c 53 74 79 6c 65 10 66 69 |pxH.fillStyle.fi|
000004f0: 6c 6c 52 65 63 74 0a 73 63 65 6e 65 04 79 70 04 |llRect.scene.yp.|
00000500: 78 70 14 67 65 74 43 6f 6e 74 65 78 74 04 32 64 |xp.getContext.2d|
00000510: 34 53 63 65 6e 65 20 72 65 6e 64 65 72 65 64 20 |4Scene rendered |
00000520: 69 6e 63 6f 72 72 65 63 74 6c 79 0e 65 78 63 6c |incorrectly.excl|
00000530: 75 64 65 08 68 69 74 73 08 62 65 73 74 02 69 02 |ude.hits.best.i.|
00000540: 50 02 4e 02 56 04 52 31 0a 64 65 70 74 68 10 6f |P.N.V.R1.depth.o|
00000550: 6c 64 43 6f 6c 6f 72 12 73 68 69 6e 69 6e 65 73 |ldColor.shinines|
00000560: 73 0a 6c 69 67 68 74 02 4c 1a 72 65 66 6c 65 63 |s.light.L.reflec|
00000570: 74 69 6f 6e 52 61 79 08 72 65 66 6c 14 73 68 61 |tionRay.refl.sha|
00000580: 64 6f 77 49 6e 66 6f 12 73 68 61 64 6f 77 52 61 |dowInfo.shadowRa|
00000590: 79 04 76 41 04 64 42 04 4c 76 02 45 02 48 16 67 |y.vA.dB.Lv.E.H.g|
000005a0: 6c 6f 73 73 57 65 69 67 68 74 06 70 6f 77 06 6d |lossWeight.pow.m|
000005b0: 61 78 0c 73 70 68 65 72 65 0e 73 70 68 65 72 65 |ax.sphere.sphere|
000005c0: 31 0a 70 6c 61 6e 65 0c 6c 69 67 68 74 31 14 69 |1.plane.light1.i|
000005d0: 6d 61 67 65 57 69 64 74 68 16 69 6d 61 67 65 48 |mageWidth.imageH|
000005e0: 65 69 67 68 74 12 70 69 78 65 6c 53 69 7a 65 12 |eight.pixelSize.|
000005f0: 72 61 79 74 72 61 63 65 72 08 70 75 73 68 06 35 |raytracer.push.5|
00000600: 2c 35 0d c8 03 01 ca 03 02 00 00 02 00 00 cc 03 |,5..............|
00000610: 00 01 00 ce 03 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000620: 0b 07 3e c0 11 00 cc 03 00 0c ce 03 01 0c d0 03 |..>.............|
00000630: 00 01 d2 03 01 01 d4 03 02 01 d6 03 03 01 d8 03 |................|
00000640: 11 01 08 ec 07 c2 3d 61 06 00 29 68 01 00 11 04 |......=a..)h....|
00000650: e8 00 00 00 01 95 4a 0b 00 26 01 00 68 00 00 11 |......J..&..h...|
00000660: 04 e8 00 00 00 0a 09 c0 58 02 60 06 00 21 05 00 |........X.`..!..|
00000670: 26 01 00 21 03 00 e5 0b c2 00 4f ed 00 00 00 4e |&..!......O....N|
00000680: ed 00 00 00 61 04 00 39 9d 00 00 00 c2 01 44 ee |....a..9......D.|
00000690: 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 |...`......a..`..|
000006a0: 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 |B.......`...D...|
000006b0: 00 60 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 |.`..B....`..C...|
000006c0: 00 24 00 00 44 f0 00 00 00 60 05 00 42 ef 00 00 |.$..D....`..B...|
000006d0: 00 42 f0 00 00 00 0b b7 4e f1 00 00 00 b7 4e f2 |.B......N.....N.|
000006e0: 00 00 00 b7 4e f3 00 00 00 c2 02 4f f4 00 00 00 |....N......O....|
000006f0: 4e f4 00 00 00 c2 03 4f 6a 00 00 00 4e 6a 00 00 |N......Oj...Nj..|
00000700: 00 c2 04 4f f5 00 00 00 4e f5 00 00 00 c2 05 4f |...O....N......O|
00000710: f6 00 00 00 4e f6 00 00 00 c2 06 4f f7 00 00 00 |....N......O....|
00000720: 4e f7 00 00 00 c2 07 4f f8 00 00 00 4e f8 00 00 |N......O....N...|
00000730: 00 c2 08 4f f9 00 00 00 4e f9 00 00 00 c2 09 4f |...O....N......O|
00000740: fa 00 00 00 4e fa 00 00 00 c2 0a 4f fb 00 00 00 |....N......O....|
00000750: 4e fb 00 00 00 c2 0b 4f fc 00 00 00 4e fc 00 00 |N......O....N...|
00000760: 00 c2 0c 4f fd 00 00 00 4e fd 00 00 00 c2 0d 4f |...O....N......O|
00000770: 39 00 00 00 4e 39 00 00 00 44 3d 00 00 00 60 05 |9...N9...D=...`.|
00000780: 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 00 |.....a..`..B....|
00000790: f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 42 |...`...D....`..B|
000007a0: ef 00 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 |....`..C....$..D|
000007b0: fe 00 00 00 60 05 00 42 ef 00 00 00 42 fe 00 00 |....`..B....B...|
000007c0: 00 0b 07 4e ff 00 00 00 07 4e 00 01 00 00 bf 0a |...N.....N......|
000007d0: 4e 01 01 00 00 c2 0e 4f f4 00 00 00 4e f4 00 00 |N......O....N...|
000007e0: 00 c2 0f 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 |...O9...N9...D=.|
000007f0: 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 |..`......a..`..B|
00000800: ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 |.......`...D....|
00000810: 60 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 |`..B....`..C....|
00000820: 24 00 00 44 02 01 00 00 60 05 00 42 ef 00 00 00 |$..D....`..B....|
00000830: 42 02 01 00 00 0b b7 4e 03 01 00 00 b7 4e 04 01 |B......N.....N..|
00000840: 00 00 b7 4e 05 01 00 00 c2 10 4f f4 00 00 00 4e |...N......O....N|
00000850: f4 00 00 00 c2 11 4f 06 01 00 00 4e 06 01 00 00 |......O....N....|
00000860: c2 12 4f 07 01 00 00 4e 07 01 00 00 c2 13 4f 08 |..O....N......O.|
00000870: 01 00 00 4e 08 01 00 00 c2 14 4f 09 01 00 00 4e |...N......O....N|
00000880: 09 01 00 00 c2 15 4f 0a 01 00 00 4e 0a 01 00 00 |......O....N....|
00000890: c2 16 4f 6a 00 00 00 4e 6a 00 00 00 c2 17 4f f6 |..Oj...Nj.....O.|
000008a0: 00 00 00 4e f6 00 00 00 c2 18 4f 0b 01 00 00 4e |...N......O....N|
000008b0: 0b 01 00 00 c2 19 4f f8 00 00 00 4e f8 00 00 00 |......O....N....|
000008c0: c2 1a 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 00 |..O9...N9...D=..|
000008d0: 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef |.`......a..`..B.|
000008e0: 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 |......`...D....`|
000008f0: 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 24 |..B....`..C....$|
00000900: 00 00 44 0c 01 00 00 60 05 00 42 ef 00 00 00 42 |..D....`..B....B|
00000910: 0c 01 00 00 0b 07 4e ff 00 00 00 07 4e 0d 01 00 |......N.....N...|
00000920: 00 c2 1b 4f f4 00 00 00 4e f4 00 00 00 c2 1c 4f |...O....N......O|
00000930: 39 00 00 00 4e 39 00 00 00 44 3d 00 00 00 60 05 |9...N9...D=...`.|
00000940: 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 00 |.....a..`..B....|
00000950: f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 42 |...`...D....`..B|
00000960: ef 00 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 |....`..C....$..D|
00000970: 0e 01 00 00 60 05 00 42 ef 00 00 00 42 0e 01 00 |....`..B....B...|
00000980: 00 0b 07 4e 0f 01 00 00 26 00 00 4e 10 01 00 00 |...N....&..N....|
00000990: 26 00 00 4e 11 01 00 00 07 4e 12 01 00 00 c2 1d |&..N.....N......|
000009a0: 4f f4 00 00 00 4e f4 00 00 00 44 3d 00 00 00 60 |O....N....D=...`|
000009b0: 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 |......a..`..B...|
000009c0: 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 |....`...D....`..|
000009d0: 42 ef 00 00 00 42 13 01 00 00 f6 ec 0f 60 05 00 |B....B.......`..|
000009e0: 42 ef 00 00 00 0b 44 13 01 00 00 60 05 00 42 ef |B.....D....`..B.|
000009f0: 00 00 00 42 13 01 00 00 60 04 00 43 ed 00 00 00 |...B....`..C....|
00000a00: 24 00 00 44 14 01 00 00 60 05 00 42 ef 00 00 00 |$..D....`..B....|
00000a10: 42 13 01 00 00 42 14 01 00 00 0b b9 4e 15 01 00 |B....B......N...|
00000a20: 00 b7 4e 16 01 00 00 b7 4e 17 01 00 00 c1 1e 4e |..N.....N......N|
00000a30: 18 01 00 00 09 4e 19 01 00 00 c2 1f 4f f4 00 00 |.....N......O...|
00000a40: 00 4e f4 00 00 00 c2 20 4f 1a 01 00 00 4e 1a 01 |.N..... O....N..|
00000a50: 00 00 c2 21 4f 1b 01 00 00 4e 1b 01 00 00 c2 22 |...!O....N....."|
00000a60: 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 00 00 60 |O9...N9...D=...`|
00000a70: 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 |......a..`..B...|
00000a80: 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 |....`...D....`..|
00000a90: 42 ef 00 00 00 42 13 01 00 00 60 04 00 43 ed 00 |B....B....`..C..|
00000aa0: 00 00 24 00 00 44 1c 01 00 00 60 05 00 42 ef 00 |..$..D....`..B..|
00000ab0: 00 00 42 13 01 00 00 42 1c 01 00 00 39 9d 00 00 |..B....B....9...|
00000ac0: 00 43 ee 00 00 00 60 05 00 42 ef 00 00 00 42 13 |.C....`..B....B.|
00000ad0: 01 00 00 42 14 01 00 00 11 21 00 00 0b c2 23 4f |...B.....!....#O|
00000ae0: f4 00 00 00 4e f4 00 00 00 c2 24 4f 1a 01 00 00 |....N.....$O....|
00000af0: 4e 1a 01 00 00 c2 25 4f 39 00 00 00 4e 39 00 00 |N.....%O9...N9..|
00000b00: 00 24 02 00 44 3d 00 00 00 60 05 00 f6 ec 05 0b |.$..D=...`......|
00000b10: 61 05 00 60 05 00 42 ef 00 00 00 f6 ec 0a 60 05 |a..`..B.......`.|
00000b20: 00 0b 44 ef 00 00 00 60 05 00 42 ef 00 00 00 42 |..D....`..B....B|
00000b30: 13 01 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 |....`..C....$..D|
00000b40: 1d 01 00 00 60 05 00 42 ef 00 00 00 42 13 01 00 |....`..B....B...|
00000b50: 00 42 1d 01 00 00 39 9d 00 00 00 43 ee 00 00 00 |.B....9....C....|
00000b60: 60 05 00 42 ef 00 00 00 42 13 01 00 00 42 14 01 |`..B....B....B..|
00000b70: 00 00 11 21 00 00 0b 07 4e 1e 01 00 00 07 4e 1f |...!....N.....N.|
00000b80: 01 00 00 c1 26 4e 20 01 00 00 c2 27 4f f4 00 00 |....&N ....'O...|
00000b90: 00 4e f4 00 00 00 c2 28 4f 1a 01 00 00 4e 1a 01 |.N.....(O....N..|
00000ba0: 00 00 c2 29 4f 39 00 00 00 4e 39 00 00 00 24 02 |...)O9...N9...$.|
00000bb0: 00 44 3d 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 |.D=...`......a..|
00000bc0: 60 05 00 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 |`..B.......`...D|
00000bd0: ef 00 00 00 60 05 00 42 ef 00 00 00 42 21 01 00 |....`..B....B!..|
00000be0: 00 f6 ec 0f 60 05 00 42 ef 00 00 00 0b 44 21 01 |....`..B.....D!.|
00000bf0: 00 00 60 05 00 42 ef 00 00 00 42 21 01 00 00 60 |..`..B....B!...`|
00000c00: 04 00 43 ed 00 00 00 24 00 00 44 22 01 00 00 60 |..C....$..D"...`|
00000c10: 05 00 42 ef 00 00 00 42 21 01 00 00 42 22 01 00 |..B....B!...B"..|
00000c20: 00 0b c2 2a 4f f4 00 00 00 4e f4 00 00 00 c2 2b |...*O....N.....+|
00000c30: 4f 23 01 00 00 4e 23 01 00 00 c2 2c 4f 39 00 00 |O#...N#....,O9..|
00000c40: 00 4e 39 00 00 00 44 3d 00 00 00 60 05 00 f6 ec |.N9...D=...`....|
00000c50: 05 0b 61 05 00 60 05 00 42 ef 00 00 00 f6 ec 0a |..a..`..B.......|
00000c60: 60 05 00 0b 44 ef 00 00 00 60 05 00 42 ef 00 00 |`...D....`..B...|
00000c70: 00 42 21 01 00 00 f6 ec 0f 60 05 00 42 ef 00 00 |.B!......`..B...|
00000c80: 00 0b 44 21 01 00 00 60 05 00 42 ef 00 00 00 42 |..D!...`..B....B|
00000c90: 21 01 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 |!...`..C....$..D|
00000ca0: 24 01 00 00 60 05 00 42 ef 00 00 00 42 21 01 00 |$...`..B....B!..|
00000cb0: 00 42 24 01 00 00 0b b7 4e 25 01 00 00 c2 2d 4f |.B$.....N%....-O|
00000cc0: f4 00 00 00 4e f4 00 00 00 c2 2e 4f 23 01 00 00 |....N......O#...|
00000cd0: 4e 23 01 00 00 c2 2f 4f 39 00 00 00 4e 39 00 00 |N#..../O9...N9..|
00000ce0: 00 44 3d 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 |.D=...`......a..|
00000cf0: 60 05 00 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 |`..B.......`...D|
00000d00: ef 00 00 00 60 05 00 42 ef 00 00 00 60 04 00 43 |....`..B....`..C|
00000d10: ed 00 00 00 24 00 00 44 26 01 00 00 60 05 00 42 |....$..D&...`..B|
00000d20: ef 00 00 00 42 26 01 00 00 0b 09 4e 27 01 00 00 |....B&.....N'...|
00000d30: b7 4e 28 01 00 00 07 4e 29 01 00 00 07 4e ff 00 |.N(....N)....N..|
00000d40: 00 00 07 4e 2a 01 00 00 07 4e 00 01 00 00 07 4e |...N*....N.....N|
00000d50: fb 00 00 00 c2 30 4f f4 00 00 00 4e f4 00 00 00 |.....0O....N....|
00000d60: c2 31 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 00 |.1O9...N9...D=..|
00000d70: 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef |.`......a..`..B.|
00000d80: 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 |......`...D....`|
00000d90: 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 24 |..B....`..C....$|
00000da0: 00 00 44 2b 01 00 00 60 05 00 42 ef 00 00 00 42 |..D+...`..B....B|
00000db0: 2b 01 00 00 0b 07 4e ff 00 00 00 07 4e 2c 01 00 |+.....N.....N,..|
00000dc0: 00 07 4e 2d 01 00 00 07 4e 2e 01 00 00 07 4e 2f |..N-....N.....N/|
00000dd0: 01 00 00 c2 32 4f f4 00 00 00 4e f4 00 00 00 c2 |....2O....N.....|
00000de0: 33 4f 30 01 00 00 4e 30 01 00 00 c2 34 4f 39 00 |3O0...N0....4O9.|
00000df0: 00 00 4e 39 00 00 00 44 3d 00 00 00 60 05 00 f6 |..N9...D=...`...|
00000e00: ec 05 0b 61 05 00 60 05 00 42 ef 00 00 00 f6 ec |...a..`..B......|
00000e10: 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 42 ef 00 |.`...D....`..B..|
00000e20: 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 31 01 |..`..C....$..D1.|
00000e30: 00 00 60 05 00 42 ef 00 00 00 42 31 01 00 00 0b |..`..B....B1....|
00000e40: 07 4e 00 01 00 00 b7 4e 32 01 00 00 c2 35 4f f4 |.N.....N2....5O.|
00000e50: 00 00 00 4e f4 00 00 00 44 3d 00 00 00 60 05 00 |...N....D=...`..|
00000e60: f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 00 f6 |....a..`..B.....|
00000e70: ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 42 ef |..`...D....`..B.|
00000e80: 00 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 33 |...`..C....$..D3|
00000e90: 01 00 00 60 05 00 42 ef 00 00 00 42 33 01 00 00 |...`..B....B3...|
00000ea0: 0b 07 4e 34 01 00 00 c2 36 4f f4 00 00 00 4e f4 |..N4....6O....N.|
00000eb0: 00 00 00 c2 37 4f 35 01 00 00 4e 35 01 00 00 c2 |....7O5...N5....|
00000ec0: 38 4f ec 00 00 00 4e ec 00 00 00 c2 39 4f 36 01 |8O....N.....9O6.|
00000ed0: 00 00 4e 36 01 00 00 c2 3a 4f 37 01 00 00 4e 37 |..N6....:O7...N7|
00000ee0: 01 00 00 c2 3b 4f 38 01 00 00 4e 38 01 00 00 c2 |....;O8...N8....|
00000ef0: 3c 4f 39 01 00 00 4e 39 01 00 00 44 3d 00 00 00 |<O9...N9...D=...|
00000f00: 06 2f c8 03 cf 04 00 00 00 09 14 26 58 15 48 50 |./.........&X.HP|
00000f10: 11 3d 1f 20 00 14 2a 41 1b 0c 00 07 36 0c 11 0c |.=. ..*A....6...|
00000f20: 27 0b 11 08 1b 18 12 2f 11 08 21 0f 11 08 1b 26 |'....../..!....&|
00000f30: 11 0a 1b 0e 2b 45 11 08 1b 14 1b 0c 00 a8 01 ac |....+E..........|
00000f40: 01 0f 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 0f |....'....../..!.|
00000f50: 11 08 1b 26 11 0a 1b 0e 2b 45 11 08 1b 14 1b 0c |...&....+E......|
00000f60: 00 31 1c 0f 11 0c 27 0b 11 08 1b 18 12 2f 11 08 |.1....'....../..|
00000f70: 21 0f 11 08 1b 28 11 0a 1b 0e 2b 47 11 08 1b 14 |!....(....+G....|
00000f80: 1b 0e 00 9c 01 5c 11 11 0c 27 0b 11 08 1b 18 12 |.....\...'......|
00000f90: 2f 11 08 21 0f 11 08 1b 22 11 0a 1b 0e 2b 41 11 |/..!...."....+A.|
00000fa0: 08 1b 14 1b 08 00 2a 18 0b 11 0c 27 0b 11 08 1b |......*....'....|
00000fb0: 18 12 2f 11 08 21 0f 11 08 1b 26 11 0a 1b 0e 2b |../..!....&....+|
00000fc0: 45 11 08 1b 14 1b 0c 00 2e 1a 0f 11 0c 27 0b 11 |E............'..|
00000fd0: 08 1b 18 12 2f 11 08 21 08 11 08 1b 14 1b 16 12 |..../..!........|
00000fe0: 41 11 08 1b 14 21 23 11 08 1b 14 1b 32 11 0a 1b |A....!#.....2...|
00000ff0: 0e 2b 65 11 08 1b 14 1b 12 1b 1a 00 55 2e 2f 11 |.+e.........U./.|
00001000: 0c 27 0b 11 08 1b 18 12 2f 11 08 21 0f 11 08 1b |.'....../..!....|
00001010: 14 1b 24 11 0a 1b 0e 2b 57 11 08 1b 14 1b 12 1b |..$....+W.......|
00001020: 26 1b 0c 1b 18 11 08 1b 14 1b 12 20 1a ca 51 00 |&.......... ..Q.|
00001030: 08 20 55 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 |. U..'....../..!|
00001040: 0f 11 08 1b 14 1b 2e 11 0a 1b 0e 2b 61 11 08 1b |...........+a...|
00001050: 14 1b 12 1b 30 1b 0c 1b 18 11 08 1b 14 1b 12 20 |....0.......... |
00001060: 1a 00 3b 00 51 00 08 32 5f 11 0c 27 0b 11 08 1b |..;.Q..2_..'....|
00001070: 18 12 2f 11 08 21 08 11 08 1b 14 1b 10 12 3b 11 |../..!........;.|
00001080: 08 1b 14 21 23 11 08 1b 14 1b 20 11 0a 1b 0e 2b |...!#..... ....+|
00001090: 53 11 08 1b 14 1b 0c 1b 0e 00 2a 3c 1d 11 0c 27 |S.........*<...'|
000010a0: 0b 11 08 1b 18 12 2f 11 08 21 08 11 08 1b 14 1b |....../..!......|
000010b0: 10 12 3b 11 08 1b 14 21 23 11 08 1b 14 1b 1e 11 |..;....!#.......|
000010c0: 0a 1b 0e 2b 51 11 08 1b 14 1b 0c 1b 0c 00 30 4a |...+Q.........0J|
000010d0: 1b 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 0f 11 |...'....../..!..|
000010e0: 08 1b 3c 11 0a 1b 0e 2b 5b 11 08 1b 14 1b 22 00 |..<....+[.....".|
000010f0: 48 20 25 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 |H %..'....../..!|
00001100: 0f 11 08 1b 28 11 0a 1b 0e 2b 47 11 08 1b 14 1b |....(....+G.....|
00001110: 0e 00 48 32 11 11 0c 27 0b 11 08 1b 18 12 2f 11 |..H2...'....../.|
00001120: 08 21 0f 11 08 1b 30 11 0a 1b 0e 2b 4f 11 08 1b |.!....0....+O...|
00001130: 14 1b 16 00 1e 12 19 11 0c 27 0b 11 08 1b 18 12 |.........'......|
00001140: 2f 11 08 21 0f 11 08 1b 28 11 0a 1b 0e 2b 47 11 |/..!....(....+G.|
00001150: 08 1b 14 1b 0e 00 0c 43 06 01 00 00 00 00 01 00 |.......C........|
00001160: 01 03 00 c2 00 28 c8 03 04 19 0c 0d 07 00 0c 43 |.....(.........C|
00001170: 06 01 00 00 02 00 04 00 00 16 02 10 00 01 00 9e |................|
00001180: 01 00 01 00 08 cb 0c 00 cc c7 42 f4 00 00 00 43 |..........B....C|
00001190: 5c 00 00 00 c7 c8 24 02 00 29 c8 03 0c 1a 0f 1c |\.....$..)......|
000011a0: 05 07 08 1b 16 20 1a 07 0d 00 0c 43 06 01 00 02 |..... .....C....|
000011b0: 01 02 05 00 00 12 03 f4 04 00 01 00 dc 01 00 01 |................|
000011c0: 00 f6 04 00 00 00 d4 7e ee 08 cb d3 c7 d4 c7 48 |.......~.......H|
000011d0: 4b 81 ec f7 0e 0e d3 28 c8 03 12 1f 10 03 12 1c |K......(........|
000011e0: 21 07 18 07 18 07 0e 07 01 27 35 07 0d 00 0c 43 |!........'5....C|
000011f0: 06 01 00 03 01 03 02 00 00 2a 04 f8 04 00 01 00 |.........*......|
00001200: fa 04 00 01 00 fc 04 00 01 00 10 00 01 00 08 cb |................|
00001210: d3 98 ec 03 b7 d7 d4 98 ec 03 b7 d8 d5 98 ec 03 |................|
00001220: b7 d9 c7 d3 44 f1 00 00 00 c7 d4 44 f2 00 00 00 |....D......D....|
00001230: c7 d5 44 f3 00 00 00 29 c8 03 1a 43 10 0d 05 17 |..D....)...C....|
00001240: 01 0d 02 17 01 0d 02 17 01 0d 07 07 16 21 15 07 |.............!..|
00001250: 1a 21 19 07 18 00 0c 43 06 01 00 02 01 02 05 01 |.!.....C........|
00001260: 00 4d 03 fe 04 00 01 00 80 05 00 01 00 82 05 00 |.M..............|
00001270: 00 00 d6 03 05 00 df 42 ef 00 00 00 42 f0 00 00 |.......B....B...|
00001280: 00 11 b7 b7 b7 21 03 00 cf d3 42 f1 00 00 00 d4 |.....!....B.....|
00001290: 42 f1 00 00 00 9f 44 f1 00 00 00 c7 d3 42 f2 00 |B.....D......B..|
000012a0: 00 00 d4 42 f2 00 00 00 9f 44 f2 00 00 00 c7 d3 |...B.....D......|
000012b0: 42 f3 00 00 00 d4 42 f3 00 00 00 9f 44 f3 00 00 |B.....B.....D...|
000012c0: 00 c7 28 c8 03 32 4e 09 03 20 07 08 1b 14 2f 0c |..(..2N.. ..../.|
000012d0: 12 49 07 1a 07 04 1b 0e 07 04 1b 07 21 27 07 1e |.I..........!'..|
000012e0: 07 04 1b 12 07 04 1b 07 21 2f 07 1c 07 04 1b 10 |........!/......|
000012f0: 07 04 1b 07 21 1d 07 0d 00 0c 43 06 01 00 02 01 |....!.....C.....|
00001300: 02 05 01 00 48 03 fe 04 00 01 00 84 05 00 01 00 |....H...........|
00001310: 82 05 00 00 00 d6 03 05 00 df 42 ef 00 00 00 42 |..........B....B|
00001320: f0 00 00 00 11 b7 b7 b7 21 03 00 cf d3 42 f1 00 |........!....B..|
00001330: 00 00 d4 9f 44 f1 00 00 00 c7 d3 42 f2 00 00 00 |....D......B....|
00001340: d4 9f 44 f2 00 00 00 c7 d3 42 f3 00 00 00 d4 9f |..D......B......|
00001350: 44 f3 00 00 00 c7 43 fa 00 00 00 24 00 00 0e c7 |D.....C....$....|
00001360: 28 c8 03 32 55 0f 03 14 07 08 1b 14 2f 0c 12 49 |(..2U......./..I|
00001370: 07 1a 07 04 1b 0e 07 03 21 27 07 1e 07 04 1b 12 |........!'......|
00001380: 07 03 21 2f 07 1c 07 04 1b 10 07 03 21 2b 07 0c |..!/........!+..|
00001390: 1b 0c 17 09 07 0d 00 0c 43 06 01 00 02 01 02 05 |........C.......|
000013a0: 01 00 4d 03 fe 04 00 01 00 80 05 00 01 00 82 05 |..M.............|
000013b0: 00 00 00 d6 03 05 00 df 42 ef 00 00 00 42 f0 00 |........B....B..|
000013c0: 00 00 11 b7 b7 b7 21 03 00 cf d3 42 f1 00 00 00 |......!....B....|
000013d0: d4 42 f1 00 00 00 a0 44 f1 00 00 00 c7 d3 42 f2 |.B.....D......B.|
000013e0: 00 00 00 d4 42 f2 00 00 00 a0 44 f2 00 00 00 c7 |....B.....D.....|
000013f0: d3 42 f3 00 00 00 d4 42 f3 00 00 00 a0 44 f3 00 |.B.....B.....D..|
00001400: 00 00 c7 28 c8 03 32 5d 0e 03 16 07 08 1b 14 2f |...(..2]......./|
00001410: 0c 12 49 07 1a 07 04 1b 0e 07 04 1b 07 21 27 07 |..I..........!'.|
00001420: 1e 07 04 1b 12 07 04 1b 07 21 2f 07 1c 07 04 1b |.........!/.....|
00001430: 10 07 04 1b 07 21 1d 07 0d 00 0c 43 06 01 00 02 |.....!.....C....|
00001440: 01 02 05 01 00 4d 03 fe 04 00 01 00 80 05 00 01 |.....M..........|
00001450: 00 82 05 00 00 00 d6 03 05 00 df 42 ef 00 00 00 |...........B....|
00001460: 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cf d3 42 f1 |B........!....B.|
00001470: 00 00 00 d4 42 f1 00 00 00 9c 44 f1 00 00 00 c7 |....B.....D.....|
00001480: d3 42 f2 00 00 00 d4 42 f2 00 00 00 9c 44 f2 00 |.B.....B.....D..|
00001490: 00 00 c7 d3 42 f3 00 00 00 d4 42 f3 00 00 00 9c |....B.....B.....|
000014a0: 44 f3 00 00 00 c7 28 c8 03 32 64 0e 03 16 07 08 |D.....(..2d.....|
000014b0: 1b 14 2f 0c 12 49 07 1a 07 04 1b 0e 07 04 1b 07 |../..I..........|
000014c0: 21 27 07 1e 07 04 1b 12 07 04 1b 07 21 2f 07 1c |!'..........!/..|
000014d0: 07 04 1b 10 07 04 1b 07 21 1d 07 0d 00 0c 43 06 |........!.....C.|
000014e0: 01 00 02 01 02 05 01 00 3e 03 fe 04 00 01 00 86 |........>.......|
000014f0: 05 00 01 00 82 05 00 00 00 d6 03 05 00 df 42 ef |..............B.|
00001500: 00 00 00 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cf |...B........!...|
00001510: d3 42 f1 00 00 00 d4 9c 44 f1 00 00 00 c7 d3 42 |.B......D......B|
00001520: f2 00 00 00 d4 9c 44 f2 00 00 00 c7 d3 42 f3 00 |......D......B..|
00001530: 00 00 d4 9c 44 f3 00 00 00 c7 28 c8 03 2c 6b 14 |....D.....(..,k.|
00001540: 03 0a 07 08 1b 14 2f 0c 12 49 07 1a 07 04 1b 0e |....../..I......|
00001550: 07 03 21 27 07 1e 07 04 1b 12 07 03 21 2f 07 1c |..!'........!/..|
00001560: 07 04 1b 10 07 03 21 1d 07 0d 00 0c 43 06 01 00 |......!.....C...|
00001570: 02 01 02 05 01 00 3e 03 fe 04 00 01 00 86 05 00 |......>.........|
00001580: 01 00 82 05 00 00 00 d6 03 05 00 df 42 ef 00 00 |............B...|
00001590: 00 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cf d3 42 |.B........!....B|
000015a0: f1 00 00 00 d4 9d 44 f1 00 00 00 c7 d3 42 f2 00 |......D......B..|
000015b0: 00 00 d4 9d 44 f2 00 00 00 c7 d3 42 f3 00 00 00 |....D......B....|
000015c0: d4 9d 44 f3 00 00 00 c7 28 c8 03 2c 72 12 03 0e |..D.....(..,r...|
000015d0: 07 08 1b 14 2f 0c 12 49 07 1a 07 04 1b 0e 07 03 |..../..I........|
000015e0: 21 27 07 1e 07 04 1b 12 07 03 21 2f 07 1c 07 04 |!'........!/....|
000015f0: 1b 10 07 03 21 1d 07 0d 00 0c 43 06 01 00 00 01 |....!.....C.....|
00001600: 00 03 00 00 75 01 10 00 01 00 08 cb c7 c7 42 f1 |....u.........B.|
00001610: 00 00 00 b7 a7 ec 16 c7 42 f1 00 00 00 b8 a7 ec |........B.......|
00001620: 04 b8 ee 0a c7 42 f1 00 00 00 ee 02 b7 44 f1 00 |.....B.......D..|
00001630: 00 00 c7 c7 42 f2 00 00 00 b7 a7 ec 16 c7 42 f2 |....B.........B.|
00001640: 00 00 00 b8 a7 ec 04 b8 ee 0a c7 42 f2 00 00 00 |...........B....|
00001650: ee 02 b7 44 f2 00 00 00 c7 c7 42 f3 00 00 00 b7 |...D......B.....|
00001660: a7 ec 16 c7 42 f3 00 00 00 b8 a7 ec 04 b8 ee 0a |....B...........|
00001670: c7 42 f3 00 00 00 ee 02 b7 44 f3 00 00 00 29 c8 |.B.......D....).|
00001680: 03 2d 79 0b 0d 05 07 08 07 18 20 0a 16 1e 20 0a |.-y....... ... .|
00001690: 25 26 44 77 07 08 07 1c 20 0e 16 1e 20 0e 25 26 |%&Dw.... ... .%&|
000016a0: 44 83 01 07 08 07 1a 20 0c 16 1e 20 0c 25 26 00 |D...... ... .%&.|
000016b0: 0c 43 06 01 00 01 02 01 05 00 00 54 03 80 04 00 |.C.........T....|
000016c0: 01 00 ca 04 00 00 00 10 00 01 00 08 cc 39 a5 00 |.............9..|
000016d0: 00 00 43 44 01 00 00 c8 42 f1 00 00 00 d3 42 f1 |..CD....B.....B.|
000016e0: 00 00 00 a0 24 01 00 39 a5 00 00 00 43 44 01 00 |....$..9....CD..|
000016f0: 00 c8 42 f2 00 00 00 d3 42 f2 00 00 00 a0 24 01 |..B.....B.....$.|
00001700: 00 9f 39 a5 00 00 00 43 44 01 00 00 c8 42 f3 00 |..9....CD....B..|
00001710: 00 00 d3 42 f3 00 00 00 a0 24 01 00 9f cf 28 c8 |...B.....$....(.|
00001720: 03 35 7e 0e 0d 04 1b 08 20 12 1b 0e 07 0a 1b 0d |.5~..... .......|
00001730: 07 13 11 32 1b 08 20 12 1b 12 07 0a 1b 0d 07 17 |...2.. .........|
00001740: 11 13 07 4e 1b 08 20 12 1b 10 07 0a 1b 0d 07 15 |...N.. .........|
00001750: 11 13 08 89 01 07 0d 00 0c 43 06 01 00 03 01 03 |.........C......|
00001760: 07 01 00 63 04 fe 04 00 01 00 80 05 00 01 00 8a |...c............|
00001770: 05 00 01 00 82 05 00 00 00 d6 03 05 00 df 42 ef |..............B.|
00001780: 00 00 00 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cb |...B........!...|
00001790: df 42 ef 00 00 00 42 f0 00 00 00 42 3d 00 00 00 |.B....B....B=...|
000017a0: 43 6a 00 00 00 df 42 ef 00 00 00 42 f0 00 00 00 |Cj....B....B....|
000017b0: 42 3d 00 00 00 43 f8 00 00 00 d3 b8 d5 a0 24 02 |B=...C........$.|
000017c0: 00 df 42 ef 00 00 00 42 f0 00 00 00 42 3d 00 00 |..B....B....B=..|
000017d0: 00 43 f8 00 00 00 d4 d5 24 02 00 24 02 00 cf 28 |.C......$..$...(|
000017e0: c8 03 3c 82 01 0b 03 1c 07 08 1b 14 2f 0c 17 37 |..<........./..7|
000017f0: 07 08 1b 14 1b 0c 1b 14 1b 0a 07 08 1b 14 1b 0c |................|
00001800: 1b 14 1b 20 0c 10 07 03 07 0d 11 1a 07 08 1b 14 |... ............|
00001810: 1b 0c 1b 14 1b 20 07 08 07 09 11 cf 01 17 55 00 |..... ........U.|
00001820: 0c 43 06 01 00 00 04 00 04 00 00 5d 04 f8 04 00 |.C.........]....|
00001830: 00 00 fa 04 00 01 00 fc 04 00 02 00 10 00 01 00 |................|
00001840: 08 ce 39 a5 00 00 00 43 46 01 00 00 ca 42 f1 00 |..9....CF....B..|
00001850: 00 00 c0 ff 00 9c 24 01 00 cb 39 a5 00 00 00 43 |......$...9....C|
00001860: 46 01 00 00 ca 42 f2 00 00 00 c0 ff 00 9c 24 01 |F....B........$.|
00001870: 00 cc 39 a5 00 00 00 43 46 01 00 00 ca 42 f3 00 |..9....CF....B..|
00001880: 00 00 c0 ff 00 9c 24 01 00 cd c7 bf 4d 9c c8 c0 |......$.....M...|
00001890: 96 00 9c 9f c9 bf 1d 9c 9f bf 08 a3 28 c8 03 35 |............(..5|
000018a0: 87 01 10 0d 00 1b 08 20 16 2a 0a 07 13 17 13 1b |....... .*......|
000018b0: 08 20 16 2a 0e 07 17 17 13 1b 08 20 16 2a 0c 07 |. .*....... .*..|
000018c0: 15 17 13 11 04 07 0e 16 04 07 07 07 18 11 04 07 |................|
000018d0: 07 11 14 07 45 00 0c 43 06 01 00 00 04 00 04 00 |....E..C........|
000018e0: 00 68 04 f8 04 00 00 00 fa 04 00 01 00 fc 04 00 |.h..............|
000018f0: 02 00 10 00 01 00 08 ce 39 a5 00 00 00 43 46 01 |........9....CF.|
00001900: 00 00 ca 42 f1 00 00 00 c0 ff 00 9c 24 01 00 cb |...B........$...|
00001910: 39 a5 00 00 00 43 46 01 00 00 ca 42 f2 00 00 00 |9....CF....B....|
00001920: c0 ff 00 9c 24 01 00 cc 39 a5 00 00 00 43 46 01 |....$...9....CF.|
00001930: 00 00 ca 42 f3 00 00 00 c0 ff 00 9c 24 01 00 cd |...B........$...|
00001940: 04 47 01 00 00 c7 9f 04 48 01 00 00 9f c8 9f 04 |.G......H.......|
00001950: 48 01 00 00 9f c9 9f 04 49 01 00 00 9f 28 c8 03 |H.......I....(..|
00001960: 35 8d 01 0e 0d 04 1b 08 20 16 2a 0a 07 13 17 13 |5....... .*.....|
00001970: 1b 08 20 16 2a 0e 07 17 17 13 1b 08 20 16 2a 0c |.. .*....... .*.|
00001980: 07 15 30 03 07 03 20 08 07 10 07 03 20 08 07 10 |..0... ..... ...|
00001990: 07 03 20 08 07 4b 00 0c 43 06 01 00 03 01 03 02 |.. ..K..C.......|
000019a0: 00 00 1f 04 94 05 00 01 00 80 04 00 01 00 82 04 |................|
000019b0: 00 01 00 10 00 01 00 08 cb c7 d3 44 ff 00 00 00 |...........D....|
000019c0: c7 d4 44 00 01 00 00 c7 d5 ec 04 d5 ee 03 bf 0a |..D.............|
000019d0: 44 01 01 00 00 29 c8 03 11 9e 01 10 0d 0f 07 20 |D....)......... |
000019e0: 21 1f 07 1a 21 19 07 24 11 18 00 0c 43 06 01 00 |!...!..$....C...|
000019f0: 00 01 00 02 00 00 3e 01 10 00 01 00 08 cb 04 4b |......>........K|
00001a00: 01 00 00 c7 42 ff 00 00 00 42 03 01 00 00 9f 04 |....B....B......|
00001a10: 48 01 00 00 9f c7 42 ff 00 00 00 42 04 01 00 00 |H.....B....B....|
00001a20: 9f 04 48 01 00 00 9f c7 42 ff 00 00 00 42 05 01 |..H.....B....B..|
00001a30: 00 00 9f 04 4c 01 00 00 9f 28 c8 03 1e a3 01 0e |....L....(......|
00001a40: 2b 22 1b 12 1b 1d 20 24 0c 18 1b 12 1b 1d 20 24 |+".... $...... $|
00001a50: 0c 18 1b 12 1b 1d 20 24 07 a5 01 00 0c 43 06 01 |...... $.....C..|
00001a60: 00 03 01 03 02 00 00 2a 04 86 04 00 01 00 88 04 |.......*........|
00001a70: 00 01 00 8a 04 00 01 00 10 00 01 00 08 cb c7 d3 |................|
00001a80: ec 04 d3 ee 02 b7 44 03 01 00 00 c7 d4 ec 04 d4 |......D.........|
00001a90: ee 02 b7 44 04 01 00 00 c7 d5 ec 04 d5 ee 02 b7 |...D............|
00001aa0: 44 05 01 00 00 29 c8 03 15 b1 01 10 0d 0f 07 14 |D....)..........|
00001ab0: 11 08 30 1b 07 14 11 08 30 1b 07 14 11 08 00 0c |..0.....0.......|
00001ac0: 43 06 01 00 01 01 01 02 00 00 27 02 9a 05 00 01 |C.........'.....|
00001ad0: 00 10 00 01 00 08 cb c7 d3 42 03 01 00 00 44 03 |.........B....D.|
00001ae0: 01 00 00 c7 d3 42 04 01 00 00 44 04 01 00 00 c7 |.....B....D.....|
00001af0: d3 42 05 01 00 00 44 05 01 00 00 29 c8 03 15 b6 |.B....D....)....|
00001b00: 01 0a 0d 03 07 12 07 0c 35 1d 07 12 07 0c 35 1d |........5.....5.|
00001b10: 07 12 07 0c 00 0c 43 06 01 00 00 02 00 06 01 00 |......C.........|
00001b20: 34 02 9c 05 00 00 00 10 00 01 00 d6 03 05 00 08 |4...............|
00001b30: cc c8 43 08 01 00 00 24 00 00 cb df 42 ef 00 00 |..C....$....B...|
00001b40: 00 42 02 01 00 00 11 c8 42 03 01 00 00 c7 9d c8 |.B......B.......|
00001b50: 42 04 01 00 00 c7 9d c8 42 05 01 00 00 c7 9d 21 |B.......B......!|
00001b60: 03 00 28 c8 03 23 bb 01 0f 12 0a 1b 14 17 15 07 |..(..#..........|
00001b70: 08 1b 14 25 18 1b 0a 07 03 0c 12 1b 0a 07 03 0c |...%............|
00001b80: 12 1b 0a 07 03 07 3f 11 3f 00 0c 43 06 01 00 00 |......?.?..C....|
00001b90: 01 00 05 00 00 38 01 10 00 01 00 08 cb 39 a5 00 |.....8.......9..|
00001ba0: 00 00 43 4f 01 00 00 c7 42 03 01 00 00 c7 42 03 |..CO....B.....B.|
00001bb0: 01 00 00 9c c7 42 04 01 00 00 c7 42 04 01 00 00 |.....B.....B....|
00001bc0: 9c 9f c7 42 05 01 00 00 c7 42 05 01 00 00 9c 9f |...B.....B......|
00001bd0: 25 01 00 c8 03 1f bf 01 0f 0d 00 1b 08 20 16 20 |%............ . |
00001be0: 12 1b 0b 0c 22 20 12 1b 0b 07 13 0c 36 20 12 1b |...." ......6 ..|
00001bf0: 0b 07 13 07 6d 00 0c 43 06 01 00 01 01 01 07 01 |....m..C........|
00001c00: 00 65 02 8a 05 00 01 00 10 00 01 00 d6 03 05 00 |.e..............|
00001c10: 08 cb df 42 ef 00 00 00 42 02 01 00 00 11 c7 42 |...B....B......B|
00001c20: 05 01 00 00 8e d3 42 04 01 00 00 9c c7 42 04 01 |......B......B..|
00001c30: 00 00 d3 42 05 01 00 00 9c 9f c7 42 05 01 00 00 |...B.......B....|
00001c40: d3 42 03 01 00 00 9c c7 42 03 01 00 00 d3 42 05 |.B......B.....B.|
00001c50: 01 00 00 9c a0 c7 42 04 01 00 00 8e d3 42 03 01 |......B......B..|
00001c60: 00 00 9c c7 42 03 01 00 00 d3 42 04 01 00 00 9c |....B.....B.....|
00001c70: 9f 21 03 00 28 c8 03 48 c2 01 0b 0d 10 07 08 1b |.!..(..H........|
00001c80: 14 25 1a 1b 09 07 14 07 02 1b 05 0c 18 1b 0a 07 |.%..............|
00001c90: 02 1b 05 07 11 0c 28 1b 0a 07 02 1b 05 0c 18 1b |......(.........|
00001ca0: 0a 07 02 1b 05 07 11 0c 2a 1b 09 07 14 07 02 1b |........*.......|
00001cb0: 05 0c 18 1b 0a 07 02 1b 05 07 11 07 93 01 11 3f |...............?|
00001cc0: 00 0c 43 06 01 00 01 01 01 03 00 00 2c 02 8a 05 |..C.........,...|
00001cd0: 00 01 00 10 00 01 00 08 cb c7 42 03 01 00 00 d3 |..........B.....|
00001ce0: 42 03 01 00 00 9c c7 42 04 01 00 00 d3 42 04 01 |B......B.....B..|
00001cf0: 00 00 9c 9f c7 42 05 01 00 00 d3 42 05 01 00 00 |.....B.....B....|
00001d00: 9c 9f 28 c8 03 21 c5 01 09 12 14 1b 0a 07 02 1b |..(..!..........|
00001d10: 05 0c 18 1b 0a 07 02 1b 05 07 11 0c 2a 1b 0a 07 |............*...|
00001d20: 02 1b 05 07 11 07 45 00 0c 43 06 01 00 02 00 02 |......E..C......|
00001d30: 06 01 00 37 02 a0 05 00 01 00 8a 05 00 01 00 d6 |...7............|
00001d40: 03 05 00 df 42 ef 00 00 00 42 02 01 00 00 11 d4 |....B....B......|
00001d50: 42 03 01 00 00 d3 42 03 01 00 00 9f d4 42 04 01 |B.....B......B..|
00001d60: 00 00 d3 42 04 01 00 00 9f d4 42 05 01 00 00 d3 |...B......B.....|
00001d70: 42 05 01 00 00 9f 21 03 00 28 c8 03 2b c8 01 09 |B.....!..(..+...|
00001d80: 03 14 07 08 1b 14 20 10 07 02 1b 0a 07 02 1b 05 |...... .........|
00001d90: 07 0e 07 02 1b 0a 07 02 1b 05 07 0e 07 02 1b 0a |................|
00001da0: 07 02 1b 05 07 35 11 3f 00 0c 43 06 01 00 02 00 |.....5.?..C.....|
00001db0: 02 06 01 00 57 02 a0 05 00 01 00 8a 05 00 01 00 |....W...........|
00001dc0: d6 03 05 00 d4 98 11 ed 04 0e d3 98 ec 17 04 51 |...............Q|
00001dd0: 01 00 00 d3 9f 04 48 01 00 00 9f d4 9f 04 4c 01 |......H.......L.|
00001de0: 00 00 9f 30 df 42 ef 00 00 00 42 02 01 00 00 11 |...0.B....B.....|
00001df0: d3 42 03 01 00 00 d4 42 03 01 00 00 a0 d3 42 04 |.B.....B......B.|
00001e00: 01 00 00 d4 42 04 01 00 00 a0 d3 42 05 01 00 00 |....B......B....|
00001e10: d4 42 05 01 00 00 a0 21 03 00 28 c8 03 3d cb 01 |.B.....!..(..=..|
00001e20: 0e 03 01 20 0c 30 3a 07 03 20 08 07 10 07 03 20 |... .0:.. ..... |
00001e30: 08 07 5f 08 0e 07 08 1b 14 20 10 07 02 1b 0a 07 |.._...... ......|
00001e40: 02 1b 05 07 0e 07 02 1b 0a 07 02 1b 05 07 0e 07 |................|
00001e50: 02 1b 0a 07 02 1b 05 07 35 11 3f 00 0c 43 06 01 |........5.?..C..|
00001e60: 00 02 00 02 06 01 00 37 02 a0 05 00 01 00 8a 05 |.......7........|
00001e70: 00 01 00 d6 03 05 00 df 42 ef 00 00 00 42 02 01 |........B....B..|
00001e80: 00 00 11 d3 42 03 01 00 00 d4 42 03 01 00 00 9c |....B.....B.....|
00001e90: d3 42 04 01 00 00 d4 42 04 01 00 00 9c d3 42 05 |.B.....B......B.|
00001ea0: 01 00 00 d4 42 05 01 00 00 9c 21 03 00 28 c8 03 |....B.....!..(..|
00001eb0: 2b d0 01 14 03 01 07 08 1b 14 20 10 07 02 1b 0a |+......... .....|
00001ec0: 07 02 1b 05 07 0e 07 02 1b 0a 07 02 1b 05 07 0e |................|
00001ed0: 07 02 1b 0a 07 02 1b 05 07 35 11 3f 00 0c 43 06 |.........5.?..C.|
00001ee0: 01 00 02 00 02 06 01 00 28 02 a0 05 00 01 00 8a |........(.......|
00001ef0: 05 00 01 00 d6 03 05 00 df 42 ef 00 00 00 42 02 |.........B....B.|
00001f00: 01 00 00 11 d3 42 03 01 00 00 d4 9c d3 42 04 01 |.....B.......B..|
00001f10: 00 00 d4 9c d3 42 05 01 00 00 d4 9c 21 03 00 28 |.....B......!..(|
00001f20: c8 03 25 d3 01 14 03 01 07 08 1b 14 20 10 07 02 |..%......... ...|
00001f30: 1b 0a 07 03 07 0a 07 02 1b 0a 07 03 07 0a 07 02 |................|
00001f40: 1b 0a 07 03 07 2d 11 3f 00 0c 43 06 01 00 00 01 |.....-.?..C.....|
00001f50: 00 02 00 00 2f 01 10 00 01 00 08 cb 04 52 01 00 |..../........R..|
00001f60: 00 c7 42 03 01 00 00 9f 04 48 01 00 00 9f c7 42 |..B......H.....B|
00001f70: 04 01 00 00 9f 04 48 01 00 00 9f c7 42 05 01 00 |......H.....B...|
00001f80: 00 9f 04 4c 01 00 00 9f 28 c8 03 17 d6 01 0e 2b |...L....(......+|
00001f90: 24 1b 0b 20 12 0c 18 1b 0b 20 12 0c 18 1b 0b 20 |$.. ..... ..... |
00001fa0: 12 07 71 00 0c 43 06 01 00 02 01 02 02 00 00 11 |..q..C..........|
00001fb0: 03 94 05 00 01 00 a6 05 00 01 00 10 00 01 00 08 |................|
00001fc0: cb c7 d3 44 ff 00 00 00 c7 d4 44 0d 01 00 00 29 |...D......D....)|
00001fd0: c8 03 0b e3 01 10 0d 0f 07 20 21 1f 07 22 00 0c |......... !.."..|
00001fe0: 43 06 01 00 00 01 00 02 00 00 22 01 10 00 01 00 |C.........".....|
00001ff0: 08 cb 04 54 01 00 00 c7 42 ff 00 00 00 9f 04 48 |...T....B......H|
00002000: 01 00 00 9f c7 42 0d 01 00 00 9f 04 4c 01 00 00 |.....B......L...|
00002010: 9f 28 c8 03 11 e7 01 0e 2b 1e 1b 0b 20 20 0c 18 |.(......+...  ..|
00002020: 1b 0b 20 22 07 6b 00 0c 43 06 01 00 00 01 00 0a |.. ".k..C.......|
00002030: 01 02 97 01 01 10 00 01 00 d6 03 05 00 08 cb c7 |................|
00002040: df 42 ef 00 00 00 42 2b 01 00 00 11 df 42 ef 00 |.B....B+.....B..|
00002050: 00 00 42 02 01 00 00 11 b7 b7 bf fb 21 03 00 df |..B.........!...|
00002060: 42 ef 00 00 00 42 02 01 00 00 11 b7 b7 b8 21 03 |B....B........!.|
00002070: 00 df 42 ef 00 00 00 42 02 01 00 00 11 b7 b8 b7 |..B....B........|
00002080: 21 03 00 21 03 00 44 0f 01 00 00 c7 39 9e 00 00 |!..!..D.....9...|
00002090: 00 11 21 00 00 44 10 01 00 00 c7 39 9e 00 00 00 |..!..D.....9....|
000020a0: 11 21 00 00 44 11 01 00 00 c7 df 42 ef 00 00 00 |.!..D......B....|
000020b0: 42 31 01 00 00 11 df 42 ef 00 00 00 42 f0 00 00 |B1.....B....B...|
000020c0: 00 11 b7 b7 c1 00 21 03 00 c1 01 21 02 00 44 12 |......!....!..D.|
000020d0: 01 00 00 29 c8 03 46 f6 01 10 0d 0f 07 24 07 08 |...)..F......$..|
000020e0: 1b 14 20 18 07 08 1b 14 2a 1c 0c 0d 11 20 07 08 |.. .....*.... ..|
000020f0: 1b 14 2f 0e 11 1e 07 08 1b 14 2f 0e 11 c5 01 2b |../......./....+|
00002100: 4d 07 24 20 0a 2b 2d 07 24 20 0a 2b 2d 07 2c 07 |M.$ .+-.$ .+-.,.|
00002110: 08 1b 14 20 20 07 08 1b 14 34 0c 1b 31 00 06 00 |...  ....4..1...|
00002120: 00 00 00 00 00 e0 3f 06 9a 99 99 99 99 99 c9 3f |......?........?|
00002130: 06 00 00 00 00 00 00 e0 3f 0c 43 06 01 00 00 00 |........?.C.....|
00002140: 00 00 00 00 01 00 29 c8 03 03 8b 02 10 00 0c 43 |......)........C|
00002150: 06 01 00 02 00 02 00 00 00 01 02 aa 05 00 01 00 |................|
00002160: a0 05 00 01 00 29 c8 03 03 8d 02 0e 00 0c 43 06 |.....)........C.|
00002170: 01 00 01 00 01 02 00 00 17 01 ac 05 00 01 00 d3 |................|
00002180: b9 9e db b6 a5 ec 05 d3 b9 9f d7 d3 b8 a8 ec 05 |................|
00002190: d3 b9 a0 d7 d3 28 c8 03 1b 8f 02 0c 03 00 0c 04 |.....(..........|
000021a0: 0d 04 07 03 12 03 0c 04 0d 03 0c 04 12 03 0c 04 |................|
000021b0: 0d 02 07 0d 00 0c 43 06 01 00 00 01 00 02 00 00 |......C.........|
000021c0: 2f 01 10 00 01 00 08 cb 04 57 01 00 00 c7 42 15 |/........W....B.|
000021d0: 01 00 00 9f 04 58 01 00 00 9f c7 42 16 01 00 00 |.....X.....B....|
000021e0: 9f 04 59 01 00 00 9f c7 42 19 01 00 00 9f 04 4c |..Y.....B......L|
000021f0: 01 00 00 9f 28 c8 03 18 97 02 0e 2b 34 1b 0b 20 |....(......+4.. |
00002200: 1a 0c 34 1b 0b 20 28 0c 30 1b 0b 20 24 07 e5 01 |..4.. (.0.. $...|
00002210: 00 0c 43 06 01 00 05 01 05 02 00 00 28 06 80 04 |..C.........(...|
00002220: 00 01 00 ae 04 00 01 00 b0 04 00 01 00 ac 04 00 |................|
00002230: 01 00 aa 04 00 01 00 10 00 01 00 08 cb c7 d3 44 |...............D|
00002240: 00 01 00 00 c7 d4 44 17 01 00 00 c7 d6 44 16 01 |......D......D..|
00002250: 00 00 c7 5d 04 00 44 15 01 00 00 c7 09 44 19 01 |...]..D......D..|
00002260: 00 00 29 c8 03 17 a2 02 10 0d 0f 07 1a 21 19 07 |..)..........!..|
00002270: 24 21 23 07 28 21 27 07 1a 2b 19 07 08 00 0c 43 |$!#.(!'..+.....C|
00002280: 06 01 00 02 01 02 01 00 00 09 03 aa 05 00 01 00 |................|
00002290: a0 05 00 01 00 10 00 01 00 08 cb c7 42 00 01 00 |............B...|
000022a0: 00 28 c8 03 07 a9 02 0e 12 0a 1b 15 00 0c 43 06 |.(............C.|
000022b0: 01 00 00 01 00 02 00 00 2f 01 10 00 01 00 08 cb |......../.......|
000022c0: 04 5a 01 00 00 c7 42 15 01 00 00 9f 04 58 01 00 |.Z....B......X..|
000022d0: 00 9f c7 42 16 01 00 00 9f 04 59 01 00 00 9f c7 |...B......Y.....|
000022e0: 42 19 01 00 00 9f 04 4c 01 00 00 9f 28 c8 03 18 |B......L....(...|
000022f0: ac 02 0e 2b 3e 1b 0b 20 1a 0c 34 1b 0b 20 28 0c |...+>.. ..4.. (.|
00002300: 30 1b 0b 20 24 07 ef 01 00 06 00 00 00 00 00 00 |0.. $...........|
00002310: e0 3f 0c 43 06 01 00 06 01 06 02 00 00 38 07 bc |.?.C.........8..|
00002320: 04 00 01 00 be 04 00 01 00 ae 04 00 01 00 ac 04 |................|
00002330: 00 01 00 aa 04 00 01 00 c0 04 00 01 00 10 00 01 |................|
00002340: 00 08 cb c7 d3 44 1e 01 00 00 c7 d4 44 1f 01 00 |.....D......D...|
00002350: 00 c7 d5 44 17 01 00 00 c7 d6 44 16 01 00 00 c7 |...D......D.....|
00002360: 5d 04 00 44 15 01 00 00 c7 5d 05 00 44 20 01 00 |]..D.....]..D ..|
00002370: 00 c7 0a 44 19 01 00 00 29 c8 03 1f ba 02 10 0d |...D....).......|
00002380: 0f 07 22 21 21 07 20 21 1f 07 24 21 23 07 28 21 |.."!!. !..$!#.(!|
00002390: 27 07 1a 2b 19 07 1e 2b 1d 07 08 00 0c 43 06 01 |'..+...+.....C..|
000023a0: 00 02 02 02 05 00 00 38 04 aa 05 00 01 00 a0 05 |.......8........|
000023b0: 00 01 00 ac 05 00 00 00 10 00 01 00 08 cc c8 43 |...............C|
000023c0: 1b 01 00 00 d3 c8 42 20 01 00 00 9c 24 01 00 c8 |......B ....$...|
000023d0: 43 1b 01 00 00 d4 c8 42 20 01 00 00 9c 24 01 00 |C......B ....$..|
000023e0: 9c cf b7 a5 ec 08 c8 42 1e 01 00 00 28 c8 42 1f |.......B....(.B.|
000023f0: 01 00 00 28 c8 03 25 c3 02 0e 12 0c 1b 10 0c 10 |...(..%.........|
00002400: 1b 0b 07 05 16 32 1b 10 0c 10 1b 0b 07 05 11 19 |.....2..........|
00002410: 08 43 0c 04 17 12 1b 15 0e 16 1b 15 00 0c 43 06 |.C............C.|
00002420: 01 00 00 01 00 02 00 00 2f 01 10 00 01 00 08 cb |......../.......|
00002430: 04 5b 01 00 00 c7 42 15 01 00 00 9f 04 58 01 00 |.[....B......X..|
00002440: 00 9f c7 42 16 01 00 00 9f 04 59 01 00 00 9f c7 |...B......Y.....|
00002450: 42 19 01 00 00 9f 04 4c 01 00 00 9f 28 c8 03 18 |B......L....(...|
00002460: ca 02 0e 2b 3e 1b 0b 20 1a 0c 34 1b 0b 20 28 0c |...+>.. ..4.. (.|
00002470: 30 1b 0b 20 24 07 ef 01 00 0c 43 06 01 00 03 01 |0.. $.....C.....|
00002480: 03 02 00 00 18 04 94 05 00 01 00 b8 05 00 01 00 |................|
00002490: ba 05 00 01 00 10 00 01 00 08 cb c7 d4 44 5c 01 |.............D\.|
000024a0: 00 00 c7 d3 44 ff 00 00 00 c7 d5 44 5d 01 00 00 |....D......D]...|
000024b0: 29 c8 03 0f d7 02 10 0d 0f 07 1c 21 1b 07 20 21 |)..........!.. !|
000024c0: 1f 07 20 00 0c 43 06 01 00 01 06 01 08 01 00 b4 |.. ..C..........|
000024d0: 02 07 bc 05 00 01 00 be 05 00 00 00 c0 05 00 01 |................|
000024e0: 00 c2 05 00 02 00 c4 05 00 03 00 c6 05 00 04 00 |................|
000024f0: 10 00 01 00 d6 03 05 00 08 c5 05 df 42 ef 00 00 |............B...|
00002500: 00 42 26 01 00 00 11 21 00 00 cf c4 05 44 29 01 |.B&....!.....D).|
00002510: 00 00 df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 |...B....B....B=.|
00002520: 00 00 43 f6 00 00 00 d3 42 ff 00 00 00 c4 05 42 |..C.....B......B|
00002530: ff 00 00 00 24 02 00 d0 43 0a 01 00 00 d3 42 0d |....$...C.....B.|
00002540: 01 00 00 24 01 00 cd c8 43 0a 01 00 00 c8 24 01 |...$....C.....$.|
00002550: 00 c4 05 42 5c 01 00 00 c4 05 42 5c 01 00 00 9c |...B\.....B\....|
00002560: a0 ce c9 c9 9c ca a0 c6 04 b7 a7 6c b7 00 00 00 |...........l....|
00002570: c7 0a 44 27 01 00 00 c7 c9 8e 39 a5 00 00 00 43 |..D'......9....C|
00002580: 4f 01 00 00 c4 04 24 01 00 a0 44 fb 00 00 00 c7 |O.....$...D.....|
00002590: df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 00 00 |.B....B....B=...|
000025a0: 43 6a 00 00 00 d3 42 ff 00 00 00 df 42 ef 00 00 |Cj....B.....B...|
000025b0: 00 42 02 01 00 00 42 3d 00 00 00 43 f8 00 00 00 |.B....B=...C....|
000025c0: d3 42 0d 01 00 00 c7 42 fb 00 00 00 24 02 00 24 |.B.....B....$..$|
000025d0: 02 00 44 ff 00 00 00 c7 df 42 ef 00 00 00 42 02 |..D......B....B.|
000025e0: 01 00 00 42 3d 00 00 00 43 f6 00 00 00 c7 42 ff |...B=...C.....B.|
000025f0: 00 00 00 c4 05 42 ff 00 00 00 24 02 00 43 07 01 |.....B....$..C..|
00002600: 00 00 24 00 00 44 2a 01 00 00 c7 c4 05 42 5d 01 |..$..D*......B].|
00002610: 00 00 43 1a 01 00 00 b7 b7 24 02 00 44 00 01 00 |..C......$..D...|
00002620: 00 ee 08 c7 09 44 27 01 00 00 c7 28 c8 03 ae 01 |.....D'....(....|
00002630: dc 02 0f 12 10 07 08 1b 14 20 22 12 5b 07 08 26 |......... ".[..&|
00002640: 0c 07 08 1b 14 1b 0e 1b 14 1b 14 07 06 25 1e 1b |.............%..|
00002650: 25 12 53 07 06 1b 0a 07 06 1b 07 17 0d 07 06 1b |%.S.............|
00002660: 0a 07 01 1b 1a 25 1c 1b 0b 07 1d 0d 17 07 08 07 |.....%..........|
00002670: 03 07 0e 07 03 08 17 11 04 21 03 07 08 21 07 07 |.........!...!..|
00002680: 24 07 01 07 0c 1b 08 1b 0c 0c 01 11 15 21 29 07 |$............!).|
00002690: 20 07 08 1b 14 1b 0e 1b 14 1b 0a 07 06 1b 16 07 | ...............|
000026a0: 08 1b 14 1b 0e 1b 14 1b 20 07 06 1b 18 07 08 1b |........ .......|
000026b0: 27 11 79 2b 65 07 1c 07 08 1b 14 1b 0e 1b 14 1b |'.y+e...........|
000026c0: 14 07 08 25 1e 1b 27 11 3c 1b 14 2b bb 01 07 08 |...%..'.<..+....|
000026d0: 0c 1a 1b 12 25 12 37 45 07 08 22 01 07 0d 00 0c |....%.7E..".....|
000026e0: 43 06 01 00 00 01 00 02 00 00 22 01 10 00 01 00 |C.........".....|
000026f0: 08 cb 04 64 01 00 00 c7 42 ff 00 00 00 9f 04 65 |...d....B......e|
00002700: 01 00 00 9f c7 42 5c 01 00 00 9f 04 4c 01 00 00 |.....B\.....L...|
00002710: 9f 28 c8 03 12 ef 02 0e 2b 36 1b 0b 20 20 0c 28 |.(......+6..  .(|
00002720: 1b 0b 20 1c 07 8d 01 00 0c 43 06 01 00 03 01 03 |.. ......C......|
00002730: 02 00 00 18 04 94 05 00 01 00 ca 04 00 01 00 ba |................|
00002740: 05 00 01 00 10 00 01 00 08 cb c7 d3 44 ff 00 00 |............D...|
00002750: 00 c7 d4 44 25 01 00 00 c7 d5 44 5d 01 00 00 29 |...D%.....D]...)|
00002760: c8 03 0f fd 02 10 0d 0f 07 20 21 1f 07 12 21 11 |......... !...!.|
00002770: 07 20 00 0c 43 06 01 00 01 08 01 08 01 00 ea 02 |. ..C...........|
00002780: 09 bc 05 00 01 00 be 05 00 00 00 cc 05 00 01 00 |................|
00002790: ac 05 00 02 00 ce 05 00 03 00 d0 05 00 04 00 aa |................|
000027a0: 05 00 05 00 a0 05 00 06 00 10 00 01 00 d6 03 05 |................|
000027b0: 00 08 c5 07 df 42 ef 00 00 00 42 26 01 00 00 11 |.....B....B&....|
000027c0: 21 00 00 cb c4 07 42 ff 00 00 00 43 0a 01 00 00 |!.....B....C....|
000027d0: d3 42 0d 01 00 00 24 01 00 d0 b7 ab ec 03 c7 28 |.B....$........(|
000027e0: c4 07 42 ff 00 00 00 43 0a 01 00 00 d3 42 ff 00 |..B....C.....B..|
000027f0: 00 00 24 01 00 c4 07 42 25 01 00 00 9f 8e c8 9d |..$....B%.......|
00002800: d1 b7 a6 ec 03 c7 28 c7 c4 07 44 29 01 00 00 c7 |......(...D)....|
00002810: 0a 44 27 01 00 00 c7 df 42 ef 00 00 00 42 02 01 |.D'.....B....B..|
00002820: 00 00 42 3d 00 00 00 43 6a 00 00 00 d3 42 ff 00 |..B=...Cj....B..|
00002830: 00 00 df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 |...B....B....B=.|
00002840: 00 00 43 f8 00 00 00 d3 42 0d 01 00 00 c9 24 02 |..C.....B.....$.|
00002850: 00 24 02 00 44 ff 00 00 00 c7 c4 07 42 ff 00 00 |.$..D.......B...|
00002860: 00 44 2a 01 00 00 c7 c9 44 fb 00 00 00 c4 07 42 |.D*.....D......B|
00002870: 5d 01 00 00 42 19 01 00 00 6c 88 00 00 00 df 42 |]...B....l.....B|
00002880: ef 00 00 00 42 02 01 00 00 11 c4 07 42 ff 00 00 |....B.......B...|
00002890: 00 42 04 01 00 00 c4 07 42 ff 00 00 00 42 05 01 |.B......B....B..|
000028a0: 00 00 c4 07 42 ff 00 00 00 42 03 01 00 00 8e 21 |....B....B.....!|
000028b0: 03 00 d2 43 09 01 00 00 c4 07 42 ff 00 00 00 24 |...C......B....$|
000028c0: 01 00 c5 04 c7 42 ff 00 00 00 43 0a 01 00 00 ca |.....B....C.....|
000028d0: 24 01 00 c5 05 c7 42 ff 00 00 00 43 0a 01 00 00 |$.....B....C....|
000028e0: c4 04 24 01 00 c5 06 c7 c4 07 42 5d 01 00 00 43 |..$.......B]...C|
000028f0: 1a 01 00 00 c4 05 c4 06 24 02 00 44 00 01 00 00 |........$..D....|
00002900: ee 18 c7 c4 07 42 5d 01 00 00 43 1a 01 00 00 b7 |.....B]...C.....|
00002910: b7 24 02 00 44 00 01 00 00 c7 28 c8 03 c1 01 82 |.$..D.....(.....|
00002920: 03 0f 12 10 07 08 1b 14 20 22 21 41 1b 12 1b 0a |........ "!A....|
00002930: 07 06 1b 07 12 2b 0c 06 12 08 07 0d 12 14 1b 12 |.....+..........|
00002940: 1b 0a 07 06 1b 07 1b 2a 1b 0b 07 43 07 5c 07 03 |.......*...C.\..|
00002950: 08 5f 0c 04 12 0a 07 0d 08 07 07 08 26 07 07 08 |._..........&...|
00002960: 21 07 07 20 07 08 1b 14 1b 0e 1b 14 1b 0a 07 06 |!.. ............|
00002970: 1b 16 07 08 1b 14 1b 0e 1b 14 1b 20 07 06 1b 18 |........... ....|
00002980: 07 1f 11 79 2b 65 07 08 0c 1c 35 23 07 20 2b 0f |...y+e....5#. +.|
00002990: 1b 12 35 00 07 08 1b 14 2a 18 1b 12 25 10 1b 12 |..5.....*...%...|
000029a0: 25 12 1b 12 1b 1b 07 45 12 31 07 04 25 16 1b 09 |%......E.1..%...|
000029b0: 1c 11 07 08 1b 12 1b 0a 07 01 1c 21 07 08 1b 12 |...........!....|
000029c0: 1b 0a 0c 01 1c 31 07 08 0c 1a 1b 12 1b 14 0c 06 |.....1..........|
000029d0: 0c 07 37 45 07 08 0c 1a 1b 12 25 12 2c 3f 07 0d |..7E......%.,?..|
000029e0: 00 0c 43 06 01 00 00 01 00 02 00 00 22 01 10 00 |..C........."...|
000029f0: 01 00 08 cb 04 69 01 00 00 c7 42 ff 00 00 00 9f |.....i....B.....|
00002a00: 04 6a 01 00 00 9f c7 42 25 01 00 00 9f 04 4c 01 |.j.....B%.....L.|
00002a10: 00 00 9f 28 c8 03 11 9b 03 0e 2b 22 1b 0b 20 20 |...(......+"..  |
00002a20: 0c 1e 1b 0b 20 12 07 65 00 0c 43 06 01 00 00 01 |.... ..e..C.....|
00002a30: 00 06 01 00 1b 01 10 00 01 00 d6 03 05 00 08 cb |................|
00002a40: c7 df 42 ef 00 00 00 42 f0 00 00 00 11 b7 b7 b7 |..B....B........|
00002a50: 21 03 00 44 00 01 00 00 29 c8 03 0d ad 03 10 0d |!..D....).......|
00002a60: 0f 07 22 07 08 1b 14 2f 0c 00 0c 43 06 01 00 00 |.."..../...C....|
00002a70: 01 00 02 00 00 15 01 10 00 01 00 08 cb 04 6b 01 |..............k.|
00002a80: 00 00 c7 42 ff 00 00 00 9f 04 4c 01 00 00 9f 28 |...B......L....(|
00002a90: c8 03 0b b0 03 0e 2b 30 1b 0b 20 20 07 4f 00 0c |......+0..  .O..|
00002aa0: 43 06 01 00 03 01 03 05 01 00 5f 04 94 05 00 01 |C........._.....|
00002ab0: 00 d8 04 00 01 00 dc 04 00 01 00 10 00 01 00 d6 |................|
00002ac0: 03 05 00 08 cb c7 d3 44 ff 00 00 00 c7 d4 44 2c |.......D......D,|
00002ad0: 01 00 00 c7 d5 44 2e 01 00 00 c7 d4 43 07 01 00 |.....D......C...|
00002ae0: 00 24 00 00 43 09 01 00 00 c7 42 2e 01 00 00 24 |.$..C.....B....$|
00002af0: 01 00 44 2d 01 00 00 c7 df 42 ef 00 00 00 42 02 |..D-.....B....B.|
00002b00: 01 00 00 42 3d 00 00 00 43 6a 00 00 00 c7 42 ff |...B=...Cj....B.|
00002b10: 00 00 00 c7 42 2c 01 00 00 24 02 00 44 2f 01 00 |....B,...$..D/..|
00002b20: 00 29 c8 03 2f c0 03 10 0d 0f 07 20 21 1f 07 1c |.)../...... !...|
00002b30: 21 1b 07 14 21 13 07 1e 07 0c 1b 14 11 04 20 16 |!...!......... .|
00002b40: 1b 09 2b 4d 07 1c 07 08 1b 14 1b 0e 1b 14 20 12 |..+M.......... .|
00002b50: 20 1e 1b 27 00 0c 43 06 01 00 02 04 02 0a 01 00 | ..'..C.........|
00002b60: bf 01 06 d8 05 00 01 00 da 05 00 01 00 94 05 00 |................|
00002b70: 00 00 a6 05 00 01 00 bc 05 00 02 00 10 00 01 00 |................|
00002b80: d6 03 05 00 08 ce df 42 ef 00 00 00 42 02 01 00 |.......B....B...|
00002b90: 00 42 3d 00 00 00 43 f6 00 00 00 ca 42 2f 01 00 |.B=...C.....B/..|
00002ba0: 00 df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 00 |..B....B....B=..|
00002bb0: 00 43 f6 00 00 00 df 42 ef 00 00 00 42 02 01 00 |.C.....B....B...|
00002bc0: 00 42 3d 00 00 00 43 f8 00 00 00 ca 42 2d 01 00 |.B=...C.....B-..|
00002bd0: 00 d3 24 02 00 df 42 ef 00 00 00 42 02 01 00 00 |..$...B....B....|
00002be0: 42 3d 00 00 00 43 f8 00 00 00 ca 42 2e 01 00 00 |B=...C.....B....|
00002bf0: d4 24 02 00 24 02 00 24 02 00 cf c7 42 04 01 00 |.$..$..$....B...|
00002c00: 00 b6 9c 44 04 01 00 00 df 42 ef 00 00 00 42 02 |...D.....B....B.|
00002c10: 01 00 00 42 3d 00 00 00 43 f6 00 00 00 c7 ca 42 |...B=...C......B|
00002c20: ff 00 00 00 24 02 00 cc df 42 ef 00 00 00 42 0c |....$....B....B.|
00002c30: 01 00 00 11 c7 c8 43 07 01 00 00 24 00 00 21 02 |......C....$..!.|
00002c40: 00 d1 28 c8 03 6c c7 03 0c 0d 0c 07 08 1b 14 1b |..(..l..........|
00002c50: 0e 1b 14 20 1c 1b 12 07 08 1b 14 1b 0e 1b 14 1b |... ............|
00002c60: 14 07 08 1b 14 1b 0e 1b 14 20 28 1b 14 07 1d 11 |......... (.....|
00002c70: 28 07 08 1b 14 1b 0e 1b 14 20 28 1b 0a 07 13 11 |(........ (.....|
00002c80: e1 01 11 6b 12 63 07 10 07 06 1b 0a 07 03 21 07 |...k.c........!.|
00002c90: 07 08 1b 14 1b 0e 1b 14 1b 14 0c 12 1b 13 17 47 |...............G|
00002ca0: 07 08 1b 14 20 0a 07 0a 07 06 1b 14 11 25 12 31 |.... ........%.1|
00002cb0: 07 0d 00 0c 43 06 01 00 00 00 00 01 00 00 06 00 |....C...........|
00002cc0: 04 6e 01 00 00 28 c8 03 05 ce 03 0e 1c 0b 00 0c |.n...(..........|
00002cd0: 43 06 01 00 02 01 02 02 00 00 11 03 80 04 00 01 |C...............|
00002ce0: 00 e4 04 00 01 00 10 00 01 00 08 cb c7 d3 44 00 |..............D.|
00002cf0: 01 00 00 c7 d4 44 32 01 00 00 29 c8 03 0b db 03 |.....D2...).....|
00002d00: 10 0d 0f 07 1a 21 19 07 20 00 0c 43 06 01 00 01 |.....!.. ..C....|
00002d10: 01 01 06 00 00 8d 01 02 de 05 00 01 00 10 00 01 |................|
00002d20: 00 08 cb c7 39 9d 00 00 00 43 ee 00 00 00 0b bf |....9....C......|
00002d30: 64 4e 70 01 00 00 bf 64 4e 71 01 00 00 b9 4e 72 |dNp....dNq....Nr|
00002d40: 01 00 00 b9 4e 73 01 00 00 09 4e 74 01 00 00 09 |....Ns....Nt....|
00002d50: 4e 75 01 00 00 09 4e 76 01 00 00 09 4e 77 01 00 |Nu....Nv....Nw..|
00002d60: 00 b9 4e 78 01 00 00 d3 11 ed 03 0e 0b 24 02 00 |..Nx.........$..|
00002d70: 44 6f 01 00 00 c7 42 6f 01 00 00 43 70 01 00 00 |Do....Bo...Cp...|
00002d80: c7 42 6f 01 00 00 42 73 01 00 00 9d 44 70 01 00 |.Bo...Bs....Dp..|
00002d90: 00 c7 42 6f 01 00 00 43 71 01 00 00 c7 42 6f 01 |..Bo...Cq....Bo.|
00002da0: 00 00 42 72 01 00 00 9d 44 71 01 00 00 29 c8 03 |..Br....Dq...)..|
00002db0: 2b e8 03 10 0d 0f 07 1e 1b 0c 00 3e 14 23 00 06 |+..........>.#..|
00002dc0: 13 32 00 08 16 37 07 08 1b 10 20 2a 1b 10 1b 1d |.2...7.... *....|
00002dd0: 21 33 07 08 1b 10 20 28 1b 10 1b 1d 00 0c 43 06 |!3.... (......C.|
00002de0: 01 00 03 03 03 06 01 00 60 06 86 04 00 01 00 88 |........`.......|
00002df0: 04 00 01 00 80 04 00 01 00 f2 05 00 00 00 f4 05 |................|
00002e00: 00 01 00 10 00 01 00 d2 03 03 00 08 cd c9 42 6f |..............Bo|
00002e10: 01 00 00 42 72 01 00 00 cb c9 42 6f 01 00 00 42 |...Br.....Bo...B|
00002e20: 73 01 00 00 cc c9 42 34 01 00 00 ec 2d c9 42 34 |s.....B4....-.B4|
00002e30: 01 00 00 d5 43 39 00 00 00 24 00 00 44 7b 01 00 |....C9...$..D{..|
00002e40: 00 c9 42 34 01 00 00 43 7c 01 00 00 d3 c7 9c d4 |..B4...C|.......|
00002e50: c8 9c c7 c8 24 04 00 0e 29 d3 d4 ad ec 0d df d5 |....$...).......|
00002e60: 43 fd 00 00 00 24 00 00 9f e3 29 c8 03 43 f8 03 |C....$....)..C..|
00002e70: 0e 0e 0b 07 14 1b 10 21 23 07 14 1b 10 26 13 26 |.......!#....&.&|
00002e80: 07 07 08 1b 28 07 0a 1b 12 2b 4b 07 08 1b 0e 1b |....(....+K.....|
00002e90: 14 07 08 07 03 07 0e 07 08 07 03 07 0e 07 0a 07 |................|
00002ea0: 2f 1e 1f 07 0c 07 07 12 03 07 1e 07 0a 1b 16 11 |/...............|
00002eb0: 25 00 0c 43 06 01 00 02 09 02 05 01 00 b6 01 0b |%..C............|
00002ec0: fa 05 00 01 00 e8 04 00 01 00 e0 05 00 00 00 e2 |................|
00002ed0: 05 00 01 00 88 04 00 02 00 86 04 00 03 00 fc 05 |................|
00002ee0: 00 04 00 fe 05 00 05 00 bc 05 00 06 00 80 04 00 |................|
00002ef0: 07 00 10 00 01 00 d2 03 03 00 08 c5 08 b7 e3 d4 |................|
00002f00: ec 18 c4 08 d4 43 80 01 00 00 04 81 01 00 00 24 |.....C.........$|
00002f10: 01 00 44 34 01 00 00 ee 09 c4 08 07 44 34 01 00 |..D4........D4..|
00002f20: 00 c4 08 42 6f 01 00 00 42 70 01 00 00 cb c4 08 |...Bo...Bp......|
00002f30: 42 6f 01 00 00 42 71 01 00 00 cc b7 cd c9 c7 a5 |Bo...Bq.........|
00002f40: ec 58 b7 ce ca c8 a5 ec 4d c9 b8 9c c7 9d b9 9c |.X......M.......|
00002f50: b8 a0 c5 04 ca b8 9c c8 9d b9 9c b8 a0 c5 05 d3 |................|
00002f60: 42 0f 01 00 00 43 30 01 00 00 c4 05 c4 04 24 02 |B....C0.......$.|
00002f70: 00 c5 06 c4 08 43 36 01 00 00 c4 06 d3 24 02 00 |.....C6......$..|
00002f80: c5 07 c4 08 43 35 01 00 00 ca c9 c4 07 24 03 00 |....C5.......$..|
00002f90: 0e 95 03 ee b0 95 02 ee a5 df c0 11 09 ae ec 10 |................|
00002fa0: 39 9f 00 00 00 11 04 82 01 00 00 21 01 00 30 29 |9..........!..0)|
00002fb0: c8 03 71 87 04 11 12 11 0e 08 12 00 0c 1c 07 0c |..q.............|
00002fc0: 34 16 37 3d 0c 08 2c 1e 1b 10 2b 11 1b 10 2b 1b |4.7=..,...+...+.|
00002fd0: 07 08 07 03 1c 04 07 08 07 03 12 09 0c 04 07 10 |................|
00002fe0: 07 03 0c 1e 0c 08 12 35 0c 04 07 10 07 03 0c 1c |.......5........|
00002ff0: 0c 08 12 31 07 0a 1b 0e 1b 10 0c 08 0c 09 26 19 |...1..........&.|
00003000: 1b 1e 0c 0a 07 0b 1c 3b 0c 08 1b 14 07 06 07 06 |.......;........|
00003010: 0c 0d 00 04 09 22 15 05 00 04 12 3d 16 18 12 03 |.....".....=....|
00003020: 39 0a 11 1d 00 0c 43 06 01 00 02 03 02 06 00 00 |9.....C.........|
00003030: 31 05 bc 05 00 01 00 fa 05 00 01 00 be 05 00 00 |1...............|
00003040: 00 80 04 00 01 00 10 00 01 00 08 cd c9 43 37 01 |.............C7.|
00003050: 00 00 d3 d4 07 24 03 00 cf 42 27 01 00 00 ec 10 |.....$...B'.....|
00003060: c9 43 39 01 00 00 c7 d3 d4 b7 24 04 00 d0 28 d4 |.C9.......$...(.|
00003070: 42 12 01 00 00 42 00 01 00 00 28 c8 03 25 9f 04 |B....B....(..%..|
00003080: 13 12 08 1b 24 07 0a 0c 0b 12 37 07 08 2b 18 1b |....$.....7..+..|
00003090: 14 07 0c 07 0a 0c 17 12 23 07 0d 09 06 07 0a 1b |........#.......|
000030a0: 16 1b 2d 00 0c 43 06 01 00 03 05 03 03 01 00 74 |..-..C.........t|
000030b0: 08 bc 05 00 01 00 fa 05 00 01 00 86 06 00 01 00 |................|
000030c0: 88 06 00 00 00 8a 06 00 01 00 8c 06 00 02 00 d2 |................|
000030d0: 04 00 03 00 be 05 00 04 00 d6 03 05 00 b7 cb df |................|
000030e0: 42 ef 00 00 00 42 26 01 00 00 11 21 00 00 d0 c0 |B....B&....!....|
000030f0: d0 07 44 fb 00 00 00 b7 cd c9 d4 42 10 01 00 00 |..D........B....|
00003100: eb a5 ec 45 d4 42 10 01 00 00 c9 48 d2 d5 ac ec |...E.B.....H....|
00003110: 34 ca 43 23 01 00 00 d3 24 01 00 c6 04 42 27 01 |4.C#....$....B'.|
00003120: 00 00 ec 21 c4 04 42 fb 00 00 00 b7 a8 ec 16 c4 |...!..B.........|
00003130: 04 42 fb 00 00 00 c8 42 fb 00 00 00 a5 ec 06 c4 |.B.....B........|
00003140: 04 cc 95 00 95 02 ee b2 c8 c7 44 28 01 00 00 c8 |..........D(....|
00003150: 28 c8 03 55 a7 04 16 0e 02 07 08 1b 14 20 22 12 |(..U......... ".|
00003160: 5b 07 08 35 18 07 08 07 0a 1b 0e 07 1b 12 03 07 |[..5............|
00003170: 0a 1b 10 07 01 08 27 07 12 07 05 12 0a 07 0a 1b |......'.........|
00003180: 16 07 01 12 2b 0c 08 25 14 0c 08 20 14 11 10 0c |....+..%... ....|
00003190: 08 1b 18 07 08 1b 0b 12 55 12 05 00 02 0b 34 00 |........U.....4.|
000031a0: 04 14 53 07 20 21 11 07 0d 00 0c 43 06 01 00 03 |..S. !.....C....|
000031b0: 02 03 07 01 00 54 05 8e 06 00 01 00 90 06 00 01 |.....T..........|
000031c0: 00 92 06 00 01 00 fe 04 00 00 00 94 06 00 01 00 |................|
000031d0: d6 03 05 00 d4 43 0a 01 00 00 d5 24 01 00 8e cb |.....C.....$....|
000031e0: df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 00 00 |.B....B....B=...|
000031f0: 43 6a 00 00 00 df 42 ef 00 00 00 42 02 01 00 00 |Cj....B....B....|
00003200: 42 3d 00 00 00 43 f8 00 00 00 d4 b9 c7 9c 24 02 |B=...C........$.|
00003210: 00 d5 24 02 00 cc df 42 ef 00 00 00 42 0c 01 00 |..$....B....B...|
00003220: 00 11 d3 c8 21 02 00 28 c8 03 3b b8 04 16 03 07 |....!..(..;.....|
00003230: 07 02 1b 0a 07 01 11 0b 0d 00 07 08 1b 14 1b 0e |................|
00003240: 1b 14 1b 0a 07 08 1b 14 1b 0e 1b 14 1b 20 0c 0e |............. ..|
00003250: 07 03 07 0b 11 1a 07 77 17 41 07 08 1b 14 20 0a |.......w.A.... .|
00003260: 07 06 07 07 11 39 00 0c 43 06 01 00 04 12 04 0a |.....9..C.......|
00003270: 01 03 fb 07 16 be 05 00 01 00 bc 05 00 01 00 fa |................|
00003280: 05 00 01 00 96 06 00 01 00 80 04 00 00 00 98 06 |................|
00003290: 00 01 00 9a 06 00 02 00 8c 06 00 03 00 9c 06 00 |................|
000032a0: 04 00 a0 05 00 05 00 9e 06 00 06 00 a0 06 00 07 |................|
000032b0: 00 a2 06 00 08 00 a4 06 00 09 00 a6 06 00 0a 00 |................|
000032c0: a8 06 00 0b 00 aa 06 00 0c 00 ac 06 00 0d 00 ae |................|
000032d0: 06 00 0e 00 b0 06 00 0f 00 b2 06 00 10 00 10 00 |................|
000032e0: 01 00 d6 03 05 00 08 c5 11 df 42 ef 00 00 00 42 |..........B....B|
000032f0: f0 00 00 00 42 3d 00 00 00 43 f8 00 00 00 d3 42 |....B=...C.....B|
00003300: 00 01 00 00 d5 42 12 01 00 00 42 32 01 00 00 24 |.....B....B2...$|
00003310: 02 00 cf cc 39 a5 00 00 00 43 9a 01 00 00 bf 0a |....9....C......|
00003320: d3 42 29 01 00 00 42 5d 01 00 00 42 15 01 00 00 |.B)...B]...B....|
00003330: b8 9f 24 02 00 cd b7 ce ca d5 42 11 01 00 00 eb |..$.......B.....|
00003340: a5 6c 93 03 00 00 d5 42 11 01 00 00 ca 48 c5 04 |.l.....B.....H..|
00003350: df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 00 00 |.B....B....B=...|
00003360: 43 f6 00 00 00 c4 04 42 ff 00 00 00 d3 42 ff 00 |C......B.....B..|
00003370: 00 00 24 02 00 43 07 01 00 00 24 00 00 c5 05 c4 |..$..C....$.....|
00003380: 11 42 6f 01 00 00 42 74 01 00 00 ec 70 c4 05 43 |.Bo...Bt....p..C|
00003390: 0a 01 00 00 d3 42 2a 01 00 00 24 01 00 c6 06 b7 |.....B*...$.....|
000033a0: a7 ec 5a df 42 ef 00 00 00 42 f0 00 00 00 42 3d |..Z.B....B....B=|
000033b0: 00 00 00 43 6a 00 00 00 c7 df 42 ef 00 00 00 42 |...Cj.....B....B|
000033c0: f0 00 00 00 42 3d 00 00 00 43 f7 00 00 00 d3 42 |....B=...C.....B|
000033d0: 00 01 00 00 df 42 ef 00 00 00 42 f0 00 00 00 42 |.....B....B....B|
000033e0: 3d 00 00 00 43 f8 00 00 00 c4 04 42 00 01 00 00 |=...C......B....|
000033f0: c4 06 24 02 00 24 02 00 24 02 00 cb d6 c4 11 42 |..$..$..$......B|
00003400: 6f 01 00 00 42 78 01 00 00 a6 6c cf 00 00 00 c4 |o...Bx....l.....|
00003410: 11 42 6f 01 00 00 42 77 01 00 00 6c be 00 00 00 |.Bo...Bw...l....|
00003420: d3 42 29 01 00 00 42 5d 01 00 00 42 17 01 00 00 |.B)...B]...B....|
00003430: b7 a7 6c a7 00 00 00 c4 11 43 38 01 00 00 d3 42 |..l......C8....B|
00003440: ff 00 00 00 d3 42 2a 01 00 00 d4 42 0d 01 00 00 |.....B*....B....|
00003450: 24 03 00 c5 07 c4 11 43 37 01 00 00 c4 07 d5 d3 |$......C7.......|
00003460: 42 29 01 00 00 24 03 00 c6 08 42 27 01 00 00 ec |B)...$....B'....|
00003470: 27 c4 08 42 fb 00 00 00 b7 a7 ec 1c c4 08 c4 11 |'..B............|
00003480: 43 39 01 00 00 c4 08 c4 07 d5 d6 b8 9f 24 04 00 |C9...........$..|
00003490: 44 00 01 00 00 ee 13 c4 08 d5 42 12 01 00 00 42 |D.........B....B|
000034a0: 00 01 00 00 44 00 01 00 00 df 42 ef 00 00 00 42 |....D.....B....B|
000034b0: f0 00 00 00 42 3d 00 00 00 43 fc 00 00 00 c7 c4 |....B=...C......|
000034c0: 08 42 00 01 00 00 d3 42 29 01 00 00 42 5d 01 00 |.B.....B)...B]..|
000034d0: 00 42 17 01 00 00 24 03 00 cb df 42 ef 00 00 00 |.B....$....B....|
000034e0: 42 26 01 00 00 11 21 00 00 c5 09 c4 11 42 6f 01 |B&....!......Bo.|
000034f0: 00 00 42 75 01 00 00 6c a8 00 00 00 df 42 ef 00 |..Bu...l.....B..|
00003500: 00 00 42 0c 01 00 00 11 d3 42 ff 00 00 00 c4 05 |..B......B......|
00003510: 21 02 00 c5 0a c4 11 43 37 01 00 00 c4 0a d5 d3 |!......C7.......|
00003520: 42 29 01 00 00 24 03 00 c6 09 42 27 01 00 00 ec |B)...$....B'....|
00003530: 70 c4 09 42 29 01 00 00 d3 42 29 01 00 00 ac ec |p..B)....B).....|
00003540: 60 df 42 ef 00 00 00 42 f0 00 00 00 42 3d 00 00 |`.B....B....B=..|
00003550: 00 43 f8 00 00 00 c7 c1 00 24 02 00 c5 0b c1 01 |.C.......$......|
00003560: 39 a5 00 00 00 43 9a 01 00 00 c4 09 42 29 01 00 |9....C......B)..|
00003570: 00 42 5d 01 00 00 42 16 01 00 00 c1 02 24 02 00 |.B]...B......$..|
00003580: 9c c5 0c df 42 ef 00 00 00 42 f0 00 00 00 42 3d |....B....B....B=|
00003590: 00 00 00 43 f5 00 00 00 c4 0b c4 0c 24 02 00 cb |...C........$...|
000035a0: c4 11 42 6f 01 00 00 42 76 01 00 00 6c 23 01 00 |..Bo...Bv...l#..|
000035b0: 00 c4 09 42 27 01 00 00 98 6c 16 01 00 00 d3 42 |...B'....l.....B|
000035c0: 29 01 00 00 42 5d 01 00 00 42 15 01 00 00 b7 a7 |)...B]...B......|
000035d0: 6c ff 00 00 00 df 42 ef 00 00 00 42 02 01 00 00 |l.....B....B....|
000035e0: 42 3d 00 00 00 43 f6 00 00 00 d3 42 29 01 00 00 |B=...C.....B)...|
000035f0: 42 ff 00 00 00 c4 04 42 ff 00 00 00 24 02 00 43 |B......B....$..C|
00003600: 07 01 00 00 24 00 00 c5 0d df 42 ef 00 00 00 42 |....$.....B....B|
00003610: 02 01 00 00 42 3d 00 00 00 43 f6 00 00 00 d5 42 |....B=...C.....B|
00003620: 0f 01 00 00 42 ff 00 00 00 d3 42 29 01 00 00 42 |....B.....B)...B|
00003630: ff 00 00 00 24 02 00 43 07 01 00 00 24 00 00 c5 |....$..C....$...|
00003640: 0e df 42 ef 00 00 00 42 02 01 00 00 42 3d 00 00 |..B....B....B=..|
00003650: 00 43 f6 00 00 00 c4 0e c4 0d 24 02 00 43 07 01 |.C........$..C..|
00003660: 00 00 24 00 00 c5 0f 39 a5 00 00 00 43 9a 01 00 |..$....9....C...|
00003670: 00 39 a5 00 00 00 43 9b 01 00 00 d3 42 2a 01 00 |.9....C.....B*..|
00003680: 00 43 0a 01 00 00 c4 0f 24 01 00 b7 24 02 00 c9 |.C......$...$...|
00003690: 24 02 00 c5 10 df 42 ef 00 00 00 42 f0 00 00 00 |$.....B....B....|
000036a0: 42 3d 00 00 00 43 6a 00 00 00 df 42 ef 00 00 00 |B=...Cj....B....|
000036b0: 42 f0 00 00 00 42 3d 00 00 00 43 f8 00 00 00 c4 |B....B=...C.....|
000036c0: 04 42 00 01 00 00 c4 10 24 02 00 c7 24 02 00 cb |.B......$...$...|
000036d0: 95 03 ef 65 fc c7 43 fa 00 00 00 24 00 00 0e c7 |...e..C....$....|
000036e0: 28 c8 03 98 04 bd 04 0e 13 0c 07 08 1b 14 1b 0c |(...............|
000036f0: 1b 14 1b 20 07 08 1b 10 07 0a 1b 16 1b 39 12 53 |... .........9.S|
00003700: 0d 02 1b 08 25 12 07 08 1b 0c 1b 12 20 0e 07 3d |....%....... ..=|
00003710: 21 0f 07 08 07 0a 1b 0e 07 1b 21 03 07 0a 1b 10 |!.........!.....|
00003720: 07 01 13 1f 07 08 1b 14 1b 0e 1b 14 1b 14 0c 0a |................|
00003730: 1b 16 07 08 1b 29 11 3e 1b 14 26 a1 01 1b 10 26 |.....).>..&....&|
00003740: 07 0c 02 1b 0a 07 08 1b 09 12 11 11 04 12 0c 07 |................|
00003750: 08 1b 14 1b 0c 1b 14 1b 0a 07 0e 07 08 1b 14 1b |................|
00003760: 0c 1b 14 1b 14 07 08 1b 10 07 08 1b 14 1b 0c 1b |................|
00003770: 14 1b 20 0c 0a 1b 10 0c 1b 11 73 11 5d 00 04 0a |.. .......s.]...|
00003780: 5b 11 1a 1b 10 1b 1d 2c 04 1b 10 34 2c 07 08 1b |[......,...4,...|
00003790: 0c 1b 12 20 18 2b 51 1b 24 07 08 1b 16 07 08 1b |... .+Q.$.......|
000037a0: 12 07 06 1b 3f 26 33 1b 24 0c 1e 07 0e 07 08 1b |....?&3.$.......|
000037b0: 35 12 37 0c 08 25 14 0c 08 20 14 12 37 0c 08 0c |5.7..%... ..7...|
000037c0: 1a 1b 14 0c 0c 0c 1e 07 0e 0c 0c 07 45 37 33 0c |............E73.|
000037d0: 1a 07 0a 1b 16 36 31 07 08 1b 14 1b 0c 1b 14 1b |.....61.........|
000037e0: 0e 07 0e 0c 08 1b 10 07 08 1b 0c 1b 12 1b 4d 00 |..............M.|
000037f0: 04 0c 3d 07 08 1b 14 20 22 26 57 1b 10 35 10 07 |..=.... "&W..5..|
00003800: 08 1b 14 20 0a 07 08 1b 16 0c 1f 1c 4b 0c 22 1b |... ........K.".|
00003810: 24 0c 16 07 0e 07 08 1b 2d 1c 27 25 14 0c 14 1b |$.......-.'%....|
00003820: 14 07 08 1b 0d 12 37 07 08 1b 14 1b 0c 1b 14 1b |......7.........|
00003830: 20 11 01 26 4b 1b 08 1b 0a 0c 14 1b 0c 1b 12 25 | ..&K..........%|
00003840: 33 11 13 12 0b 07 08 1b 14 1b 0c 1b 14 1b 16 0c |3...............|
00003850: 08 0c 09 00 06 08 5f 1b 10 34 2c 0c 14 39 14 07 |......_..4,..9..|
00003860: 08 1b 0c 1b 12 20 0e 21 8d 01 07 08 1b 14 1b 0e |..... .!........|
00003870: 1b 14 1b 14 07 08 1b 0c 1b 16 0c 0a 1b 35 11 4a |.............5.J|
00003880: 1b 14 1c af 01 07 08 1b 14 1b 0e 1b 14 1b 14 07 |................|
00003890: 0a 1b 0e 1b 16 07 08 1b 0c 1b 43 11 58 1b 14 1c |..........C.X...|
000038a0: bb 01 07 08 1b 14 1b 0e 1b 14 1b 14 0c 06 0c 07 |................|
000038b0: 11 0e 1b 14 1c 5d 1b 08 1b 0a 1b 08 1b 0a 07 08 |.....]..........|
000038c0: 1b 0e 1b 0a 0c 01 16 1f 11 32 07 43 1c 23 07 08 |.........2.C.#..|
000038d0: 1b 14 1b 0c 1b 14 1b 0a 07 08 1b 14 1b 0c 1b 14 |................|
000038e0: 1b 20 0c 0a 1b 10 0c 1b 11 38 07 93 01 00 04 59 |. .......8.....Y|
000038f0: 0f 00 05 60 53 07 0a 1b 0c 17 07 07 0d 00 06 00 |...`S...........|
00003900: 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 3f |......?........?|
00003910: 06 00 00 00 00 00 00 e0 3f 0c 43 06 01 d8 03 00 |........?.C.....|
00003920: 0f 00 0c 01 1e 81 06 0f fa 05 00 00 00 b8 06 00 |................|
00003930: 01 00 ba 06 00 02 00 bc 06 00 03 00 9c 06 00 04 |................|
00003940: 00 be 06 00 05 00 c0 06 00 06 00 c2 06 00 07 00 |................|
00003950: c4 06 00 08 00 e8 05 00 09 00 ea 05 00 0a 00 ec |................|
00003960: 05 00 0b 00 ee 05 00 0c 00 f0 05 00 0d 00 c6 06 |................|
00003970: 00 0e 00 d6 03 05 00 df 42 ef 00 00 00 42 0e 01 |........B....B..|
00003980: 00 00 11 21 00 00 cf df 42 ef 00 00 00 42 2b 01 |...!....B....B+.|
00003990: 00 00 11 df 42 ef 00 00 00 42 02 01 00 00 11 b7 |....B....B......|
000039a0: b7 bf f1 21 03 00 df 42 ef 00 00 00 42 02 01 00 |...!...B....B...|
000039b0: 00 11 c1 00 8e b7 bc 21 03 00 df 42 ef 00 00 00 |.......!...B....|
000039c0: 42 02 01 00 00 11 b7 b8 b7 21 03 00 21 03 00 44 |B........!..!..D|
000039d0: 0f 01 00 00 c7 df 42 ef 00 00 00 42 31 01 00 00 |......B....B1...|
000039e0: 11 df 42 ef 00 00 00 42 f0 00 00 00 11 c1 01 c1 |..B....B........|
000039f0: 02 c1 03 21 03 00 c1 04 21 02 00 44 12 01 00 00 |...!....!..D....|
00003a00: df 42 ef 00 00 00 42 21 01 00 00 42 22 01 00 00 |.B....B!...B"...|
00003a10: 11 df 42 ef 00 00 00 42 02 01 00 00 11 c1 05 8e |..B....B........|
00003a20: c1 06 b9 21 03 00 c1 07 df 42 ef 00 00 00 42 13 |...!.....B....B.|
00003a30: 01 00 00 42 1c 01 00 00 11 df 42 ef 00 00 00 42 |...B......B....B|
00003a40: f0 00 00 00 11 b7 c1 08 c1 09 21 03 00 c1 0a b7 |..........!.....|
00003a50: b7 b9 21 05 00 21 03 00 cc df 42 ef 00 00 00 42 |..!..!....B....B|
00003a60: 21 01 00 00 42 22 01 00 00 11 df 42 ef 00 00 00 |!...B".....B....|
00003a70: 42 02 01 00 00 11 b8 c1 0b b8 21 03 00 c1 0c df |B.........!.....|
00003a80: 42 ef 00 00 00 42 13 01 00 00 42 1c 01 00 00 11 |B....B....B.....|
00003a90: df 42 ef 00 00 00 42 f0 00 00 00 11 c1 0d c1 0e |.B....B.........|
00003aa0: c1 0f 21 03 00 c1 10 b7 b7 c1 11 21 05 00 21 03 |..!........!..!.|
00003ab0: 00 cd df 42 ef 00 00 00 42 21 01 00 00 42 24 01 |...B....B!...B$.|
00003ac0: 00 00 11 df 42 ef 00 00 00 42 02 01 00 00 11 c1 |....B....B......|
00003ad0: 12 c1 13 c1 14 8e 21 03 00 43 07 01 00 00 24 00 |......!..C....$.|
00003ae0: 00 c1 15 df 42 ef 00 00 00 42 13 01 00 00 42 1d |....B....B....B.|
00003af0: 01 00 00 11 df 42 ef 00 00 00 42 f0 00 00 00 11 |.....B....B.....|
00003b00: b8 b8 b8 21 03 00 df 42 ef 00 00 00 42 f0 00 00 |...!...B....B...|
00003b10: 00 11 b7 b7 b7 21 03 00 c1 16 b7 b8 c1 17 21 06 |.....!........!.|
00003b20: 00 21 03 00 ce c7 42 10 01 00 00 43 a4 01 00 00 |.!....B....C....|
00003b30: ca 24 01 00 0e c7 42 10 01 00 00 43 a4 01 00 00 |.$....B....C....|
00003b40: c8 24 01 00 0e c7 42 10 01 00 00 43 a4 01 00 00 |.$....B....C....|
00003b50: c9 24 01 00 0e df 42 ef 00 00 00 42 fe 00 00 00 |.$....B....B....|
00003b60: 11 df 42 ef 00 00 00 42 02 01 00 00 11 bc bf 0a |..B....B........|
00003b70: b6 21 03 00 df 42 ef 00 00 00 42 f0 00 00 00 11 |.!...B....B.....|
00003b80: c1 18 c1 19 c1 1a 21 03 00 21 02 00 c5 04 df 42 |......!..!.....B|
00003b90: ef 00 00 00 42 fe 00 00 00 11 df 42 ef 00 00 00 |....B......B....|
00003ba0: 42 02 01 00 00 11 bf fd bc bf f1 21 03 00 df 42 |B..........!...B|
00003bb0: ef 00 00 00 42 f0 00 00 00 11 c1 1b c1 1c c1 1d |....B...........|
00003bc0: 21 03 00 bf 64 21 03 00 c5 05 c7 42 11 01 00 00 |!...d!.....B....|
00003bd0: 43 a4 01 00 00 c4 04 24 01 00 0e c7 42 11 01 00 |C......$....B...|
00003be0: 00 43 a4 01 00 00 c4 05 24 01 00 0e bf 64 c5 06 |.C......$....d..|
00003bf0: bf 64 c5 07 04 a5 01 00 00 43 5f 00 00 00 04 48 |.d.......C_....H|
00003c00: 01 00 00 24 01 00 c5 08 0a c5 09 0a c5 0a 0a c5 |...$............|
00003c10: 0b 0a c5 0c b9 c5 0d df 42 ef 00 00 00 42 33 01 |........B....B3.|
00003c20: 00 00 11 0b c4 06 4e 71 01 00 00 c4 07 4e 70 01 |......Nq.....Np.|
00003c30: 00 00 c4 08 b7 48 4e 72 01 00 00 c4 08 b8 48 4e |.....HNr......HN|
00003c40: 73 01 00 00 c4 09 4e 74 01 00 00 c4 0b 4e 76 01 |s.....Nt.....Nv.|
00003c50: 00 00 c4 0a 4e 75 01 00 00 c4 0c 4e 77 01 00 00 |....Nu.....Nw...|
00003c60: c4 0d 4e 78 01 00 00 21 01 00 c6 0e 43 ec 00 00 |..Nx...!....C...|
00003c70: 00 c7 07 b7 24 03 00 29 c8 03 db 02 f6 04 00 03 |....$..)........|
00003c80: 28 07 08 1b 14 20 0c 12 47 07 26 07 08 1b 14 20 |(.... ..G.&.... |
00003c90: 18 07 08 1b 14 2a 1c 0c 0d 11 22 07 08 1b 14 2a |.....*...."....*|
00003ca0: 10 11 01 11 24 07 08 1b 14 2f 0e 11 cd 01 2b 4f |....$..../....+O|
00003cb0: 07 2e 07 08 1b 14 20 20 07 08 1b 14 3e 0c 1b 31 |......  ....>..1|
00003cc0: 2b 3d 07 08 1b 14 1b 0c 20 18 07 08 1b 14 2a 10 |+=...... .....*.|
00003cd0: 16 01 1b 32 07 08 1b 14 1b 12 20 16 07 08 1b 14 |...2...... .....|
00003ce0: 39 0c 2a 31 11 9f 01 17 33 07 08 1b 14 1b 0c 20 |9.*1....3...... |
00003cf0: 18 07 08 1b 14 34 0e 1b 2e 07 08 1b 14 1b 12 20 |.....4......... |
00003d00: 16 07 08 1b 14 3e 0c 2f 31 11 9b 01 17 39 07 08 |.....>./1....9..|
00003d10: 1b 14 1b 0c 20 16 07 08 1b 14 3e 24 07 15 11 20 |.... .....>$... |
00003d20: 1b 14 1b 1a 07 08 1b 14 1b 12 20 20 07 08 1b 14 |..........  ....|
00003d30: 2f 0c 11 1e 07 08 1b 14 2f 0c 2f 77 11 c5 01 17 |/......././w....|
00003d40: 53 07 0a 1b 0e 1b 0c 07 01 17 21 07 0a 1b 0e 1b |S.........!.....|
00003d50: 0c 07 01 17 21 07 0a 1b 0e 1b 0c 07 01 17 01 07 |....!...........|
00003d60: 08 1b 14 20 16 07 08 1b 14 2f 1e 07 0f 11 22 07 |... ...../....".|
00003d70: 08 1b 14 3e 0c 11 7d 1c 25 07 08 1b 14 20 16 07 |...>..}.%.... ..|
00003d80: 08 1b 14 20 10 11 0e 0c 0f 11 24 07 08 1b 14 3e |... ......$....>|
00003d90: 0c 1b 7f 1c 49 07 0a 1b 0e 1b 0c 0c 01 17 21 07 |....I.........!.|
00003da0: 0a 1b 0e 1b 0c 0c 01 5a 08 34 0c 00 14 0c 0d 07 |.......Z.4......|
00003db0: 08 1b 14 26 21 26 02 26 03 11 12 21 0f 11 12 21 |...&!&.&...!...!|
00003dc0: 09 26 06 26 05 26 08 26 11 00 07 11 32 00 03 16 |.&.&.&.&....2...|
00003dd0: 51 0c 12 1b 1a 11 01 00 06 9a 99 99 99 99 99 c9 |Q...............|
00003de0: 3f 06 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 |?........?......|
00003df0: 00 e0 3f 06 00 00 00 00 00 00 e0 3f 06 9a 99 99 |..?........?....|
00003e00: 99 99 99 d9 3f 06 00 00 00 00 00 00 f8 3f 06 00 |....?........?..|
00003e10: 00 00 00 00 00 f8 3f 06 00 00 00 00 00 00 f8 3f |......?........?|
00003e20: 06 00 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 |........?.......|
00003e30: e0 3f 06 33 33 33 33 33 33 d3 3f 06 00 00 00 00 |.?.333333.?.....|
00003e40: 00 00 d0 3f 06 00 00 00 00 00 00 e0 3f 06 cd cc |...?........?...|
00003e50: cc cc cc cc ec 3f 06 cd cc cc cc cc cc ec 3f 06 |.....?........?.|
00003e60: cd cc cc cc cc cc ec 3f 06 9a 99 99 99 99 99 b9 |.......?........|
00003e70: 3f 06 00 00 00 00 00 00 f8 3f 06 9a 99 99 99 99 |?........?......|
00003e80: 99 b9 3f 06 cd cc cc cc cc cc ec 3f 06 00 00 00 |..?........?....|
00003e90: 00 00 00 e0 3f 06 33 33 33 33 33 33 f3 3f 06 9a |....?.333333.?..|
00003ea0: 99 99 99 99 99 c9 3f 06 66 66 66 66 66 66 e6 3f |......?.ffffff.?|
00003eb0: 06 9a 99 99 99 99 99 e9 3f 06 9a 99 99 99 99 99 |........?.......|
00003ec0: e9 3f 06 9a 99 99 99 99 99 e9 3f 06 9a 99 99 99 |.?........?.....|
00003ed0: 99 99 e9 3f 06 9a 99 99 99 99 99 e9 3f 06 9a 99 |...?........?...|
00003ee0: 99 99 99 99 e9 3f                               |.....?|
```

### WASM
```
00000000: 05 c2 01 5a 5f 5f 74 65 73 74 73 5f 5f 2f 66 69 |...Z__tests__/fi|
00000010: 78 74 75 72 65 73 5f 71 75 69 63 6b 6a 73 2f 6f |xtures_quickjs/o|
00000020: 63 74 61 6e 65 2f 72 61 79 74 72 61 63 65 2e 6a |ctane/raytrace.j|
00000030: 73 12 2e 2f 62 61 73 65 2e 6a 73 12 42 65 6e 63 |s../base.js.Benc|
00000040: 68 6d 61 72 6b 1c 42 65 6e 63 68 6d 61 72 6b 53 |hmark.BenchmarkS|
00000050: 75 69 74 65 10 52 61 79 54 72 61 63 65 16 63 68 |uite.RayTrace.ch|
00000060: 65 63 6b 4e 75 6d 62 65 72 0a 43 6c 61 73 73 08 |eckNumber.Class.|
00000070: 46 6c 6f 67 16 72 65 6e 64 65 72 53 63 65 6e 65 |Flog.renderScene|
00000080: 0c 63 72 65 61 74 65 0c 65 78 74 65 6e 64 12 52 |.create.extend.R|
00000090: 61 79 54 72 61 63 65 72 0a 43 6f 6c 6f 72 06 72 |ayTracer.Color.r|
000000a0: 65 64 0a 67 72 65 65 6e 08 62 6c 75 65 14 69 6e |ed.green.blue.in|
000000b0: 69 74 69 61 6c 69 7a 65 12 61 64 64 53 63 61 6c |itialize.addScal|
000000c0: 61 72 10 73 75 62 74 72 61 63 74 10 6d 75 6c 74 |ar.subtract.mult|
000000d0: 69 70 6c 79 1c 6d 75 6c 74 69 70 6c 79 53 63 61 |iply.multiplySca|
000000e0: 6c 61 72 18 64 69 76 69 64 65 46 61 63 74 6f 72 |lar.divideFactor|
000000f0: 0a 6c 69 6d 69 74 10 64 69 73 74 61 6e 63 65 0a |.limit.distance.|
00000100: 62 6c 65 6e 64 14 62 72 69 67 68 74 6e 65 73 73 |blend.brightness|
00000110: 0a 4c 69 67 68 74 10 70 6f 73 69 74 69 6f 6e 0a |.Light.position.|
00000120: 63 6f 6c 6f 72 12 69 6e 74 65 6e 73 69 74 79 0c |color.intensity.|
00000130: 56 65 63 74 6f 72 02 78 02 79 02 7a 08 63 6f 70 |Vector.x.y.z.cop|
00000140: 79 12 6e 6f 72 6d 61 6c 69 7a 65 12 6d 61 67 6e |y.normalize.magn|
00000150: 69 74 75 64 65 0a 63 72 6f 73 73 06 64 6f 74 1c |itude.cross.dot.|
00000160: 6d 75 6c 74 69 70 6c 79 56 65 63 74 6f 72 06 52 |multiplyVector.R|
00000170: 61 79 12 64 69 72 65 63 74 69 6f 6e 0a 53 63 65 |ay.direction.Sce|
00000180: 6e 65 0c 63 61 6d 65 72 61 0c 73 68 61 70 65 73 |ne.camera.shapes|
00000190: 0c 6c 69 67 68 74 73 14 62 61 63 6b 67 72 6f 75 |.lights.backgrou|
000001a0: 6e 64 10 4d 61 74 65 72 69 61 6c 18 42 61 73 65 |nd.Material.Base|
000001b0: 4d 61 74 65 72 69 61 6c 0a 67 6c 6f 73 73 18 74 |Material.gloss.t|
000001c0: 72 61 6e 73 70 61 72 65 6e 63 79 14 72 65 66 6c |ransparency.refl|
000001d0: 65 63 74 69 6f 6e 14 72 65 66 72 61 63 74 69 6f |ection.refractio|
000001e0: 6e 14 68 61 73 54 65 78 74 75 72 65 10 67 65 74 |n.hasTexture.get|
000001f0: 43 6f 6c 6f 72 0c 77 72 61 70 55 70 0a 53 6f 6c |Color.wrapUp.Sol|
00000200: 69 64 14 43 68 65 73 73 62 6f 61 72 64 12 63 6f |id.Chessboard.co|
00000210: 6c 6f 72 45 76 65 6e 10 63 6f 6c 6f 72 4f 64 64 |lorEven.colorOdd|
00000220: 0e 64 65 6e 73 69 74 79 0a 53 68 61 70 65 0c 53 |.density.Shape.S|
00000230: 70 68 65 72 65 12 69 6e 74 65 72 73 65 63 74 0a |phere.intersect.|
00000240: 50 6c 61 6e 65 02 64 20 49 6e 74 65 72 73 65 63 |Plane.d Intersec|
00000250: 74 69 6f 6e 49 6e 66 6f 0a 69 73 48 69 74 10 68 |tionInfo.isHit.h|
00000260: 69 74 43 6f 75 6e 74 0a 73 68 61 70 65 0c 6e 6f |itCount.shape.no|
00000270: 72 6d 61 6c 0c 43 61 6d 65 72 61 0c 6c 6f 6f 6b |rmal.Camera.look|
00000280: 41 74 0e 65 71 75 61 74 6f 72 04 75 70 0c 73 63 |At.equator.up.sc|
00000290: 72 65 65 6e 0c 67 65 74 52 61 79 14 42 61 63 6b |reen.getRay.Back|
000002a0: 67 72 6f 75 6e 64 10 61 6d 62 69 65 6e 63 65 0c |ground.ambience.|
000002b0: 45 6e 67 69 6e 65 0c 63 61 6e 76 61 73 10 73 65 |Engine.canvas.se|
000002c0: 74 50 69 78 65 6c 1a 67 65 74 50 69 78 65 6c 43 |tPixel.getPixelC|
000002d0: 6f 6c 6f 72 20 74 65 73 74 49 6e 74 65 72 73 65 |olor testInterse|
000002e0: 63 74 69 6f 6e 20 67 65 74 52 65 66 6c 65 63 74 |ction getReflect|
000002f0: 69 6f 6e 52 61 79 10 72 61 79 54 72 61 63 65 16 |ionRay.rayTrace.|
00000300: 64 65 73 74 69 6e 61 74 69 6f 6e 10 70 72 6f 70 |destination.prop|
00000310: 65 72 74 79 02 72 02 67 02 62 04 63 31 04 63 32 |erty.r.g.b.c1.c2|
00000320: 0c 72 65 73 75 6c 74 02 73 02 66 06 61 62 73 02 |.result.s.f.abs.|
00000330: 77 0a 66 6c 6f 6f 72 08 72 67 62 28 02 2c 02 29 |w.floor.rgb(.,.)|
00000340: 06 70 6f 73 0e 4c 69 67 68 74 20 5b 02 5d 0c 76 |.pos.Light [.].v|
00000350: 65 63 74 6f 72 02 6d 08 73 71 72 74 02 76 32 56 |ector.m.sqrt.v2V|
00000360: 65 63 74 6f 72 73 20 6d 75 73 74 20 62 65 20 64 |ectors must be d|
00000370: 65 66 69 6e 65 64 20 5b 10 56 65 63 74 6f 72 20 |efined [.Vector |
00000380: 5b 06 64 69 72 0a 52 61 79 20 5b 02 75 02 74 20 |[.dir.Ray [.u.t |
00000390: 4d 61 74 65 72 69 61 6c 20 5b 67 6c 6f 73 73 3d |Material [gloss=|
000003a0: 1e 2c 20 74 72 61 6e 73 70 61 72 65 6e 63 79 3d |., transparency=|
000003b0: 1a 2c 20 68 61 73 54 65 78 74 75 72 65 3d 2a 53 |., hasTexture=*S|
000003c0: 6f 6c 69 64 4d 61 74 65 72 69 61 6c 20 5b 67 6c |olidMaterial [gl|
000003d0: 6f 73 73 3d 2a 43 68 65 73 73 4d 61 74 65 72 69 |oss=*ChessMateri|
000003e0: 61 6c 20 5b 67 6c 6f 73 73 3d 0c 72 61 64 69 75 |al [gloss=.radiu|
000003f0: 73 10 6d 61 74 65 72 69 61 6c 06 72 61 79 08 69 |s.material.ray.i|
00000400: 6e 66 6f 06 64 73 74 02 42 02 43 02 44 22 53 70 |nfo.dst.B.C.D"Sp|
00000410: 68 65 72 65 20 5b 70 6f 73 69 74 69 6f 6e 3d 12 |here [position=.|
00000420: 2c 20 72 61 64 69 75 73 3d 04 56 64 04 76 55 04 |, radius=.Vd.vU.|
00000430: 76 56 0e 50 6c 61 6e 65 20 5b 08 2c 20 64 3d 1c |vV.Plane [., d=.|
00000440: 49 6e 74 65 72 73 65 63 74 69 6f 6e 20 5b 04 76 |Intersection [.v|
00000450: 78 04 76 79 0c 52 61 79 20 5b 5d 0e 6f 70 74 69 |x.vy.Ray [].opti|
00000460: 6f 6e 73 18 63 61 6e 76 61 73 48 65 69 67 68 74 |ons.canvasHeight|
00000470: 16 63 61 6e 76 61 73 57 69 64 74 68 14 70 69 78 |.canvasWidth.pix|
00000480: 65 6c 57 69 64 74 68 16 70 69 78 65 6c 48 65 69 |elWidth.pixelHei|
00000490: 67 68 74 1a 72 65 6e 64 65 72 44 69 66 66 75 73 |ght.renderDiffus|
000004a0: 65 1a 72 65 6e 64 65 72 53 68 61 64 6f 77 73 20 |e.renderShadows |
000004b0: 72 65 6e 64 65 72 48 69 67 68 6c 69 67 68 74 73 |renderHighlights|
000004c0: 22 72 65 6e 64 65 72 52 65 66 6c 65 63 74 69 6f |"renderReflectio|
000004d0: 6e 73 10 72 61 79 44 65 70 74 68 06 70 78 57 06 |ns.rayDepth.pxW.|
000004e0: 70 78 48 12 66 69 6c 6c 53 74 79 6c 65 10 66 69 |pxH.fillStyle.fi|
000004f0: 6c 6c 52 65 63 74 0a 73 63 65 6e 65 04 79 70 04 |llRect.scene.yp.|
00000500: 78 70 14 67 65 74 43 6f 6e 74 65 78 74 04 32 64 |xp.getContext.2d|
00000510: 34 53 63 65 6e 65 20 72 65 6e 64 65 72 65 64 20 |4Scene rendered |
00000520: 69 6e 63 6f 72 72 65 63 74 6c 79 0e 65 78 63 6c |incorrectly.excl|
00000530: 75 64 65 08 68 69 74 73 08 62 65 73 74 02 69 02 |ude.hits.best.i.|
00000540: 50 02 4e 02 56 04 52 31 0a 64 65 70 74 68 10 6f |P.N.V.R1.depth.o|
00000550: 6c 64 43 6f 6c 6f 72 12 73 68 69 6e 69 6e 65 73 |ldColor.shinines|
00000560: 73 0a 6c 69 67 68 74 02 4c 1a 72 65 66 6c 65 63 |s.light.L.reflec|
00000570: 74 69 6f 6e 52 61 79 08 72 65 66 6c 14 73 68 61 |tionRay.refl.sha|
00000580: 64 6f 77 49 6e 66 6f 12 73 68 61 64 6f 77 52 61 |dowInfo.shadowRa|
00000590: 79 04 76 41 04 64 42 04 4c 76 02 45 02 48 16 67 |y.vA.dB.Lv.E.H.g|
000005a0: 6c 6f 73 73 57 65 69 67 68 74 06 70 6f 77 06 6d |lossWeight.pow.m|
000005b0: 61 78 0c 73 70 68 65 72 65 0e 73 70 68 65 72 65 |ax.sphere.sphere|
000005c0: 31 0a 70 6c 61 6e 65 0c 6c 69 67 68 74 31 14 69 |1.plane.light1.i|
000005d0: 6d 61 67 65 57 69 64 74 68 16 69 6d 61 67 65 48 |mageWidth.imageH|
000005e0: 65 69 67 68 74 12 70 69 78 65 6c 53 69 7a 65 12 |eight.pixelSize.|
000005f0: 72 61 79 74 72 61 63 65 72 08 70 75 73 68 06 35 |raytracer.push.5|
00000600: 2c 35 0d c8 03 01 ca 03 02 00 00 02 00 00 cc 03 |,5..............|
00000610: 00 01 00 ce 03 00 00 0c 20 06 01 a4 01 00 00 00 |........ .......|
00000620: 0b 14 3e c0 11 00 cc 03 00 0c ce 03 01 0c d0 03 |..>.............|
00000630: 00 01 d2 03 01 01 d4 03 02 01 d6 03 03 01 d6 03 |................|
00000640: 04 01 d6 03 05 01 d6 03 06 01 d6 03 07 01 d6 03 |................|
00000650: 08 01 d6 03 09 01 d6 03 0a 01 d6 03 0b 01 d6 03 |................|
00000660: 0c 01 d6 03 0d 01 d6 03 0e 01 d6 03 0f 01 d6 03 |................|
00000670: 10 01 d8 03 11 01 08 ec 07 c2 3d 61 13 00 29 68 |..........=a..)h|
00000680: 01 00 11 04 e8 00 00 00 01 95 4a 0b 00 26 01 00 |..........J..&..|
00000690: 68 00 00 11 04 e8 00 00 00 0a 09 c0 58 02 60 13 |h...........X.`.|
000006a0: 00 21 05 00 26 01 00 21 03 00 e5 0b c2 00 4f ed |.!..&..!......O.|
000006b0: 00 00 00 4e ed 00 00 00 61 04 00 39 9d 00 00 00 |...N....a..9....|
000006c0: c2 01 44 ee 00 00 00 60 05 00 f6 ec 05 0b 61 05 |..D....`......a.|
000006d0: 00 60 05 00 42 ef 00 00 00 f6 ec 0a 60 05 00 0b |.`..B.......`...|
000006e0: 44 ef 00 00 00 60 05 00 42 ef 00 00 00 60 04 00 |D....`..B....`..|
000006f0: 43 ed 00 00 00 24 00 00 44 f0 00 00 00 60 05 00 |C....$..D....`..|
00000700: 42 ef 00 00 00 42 f0 00 00 00 0b b7 4e f1 00 00 |B....B......N...|
00000710: 00 b7 4e f2 00 00 00 b7 4e f3 00 00 00 c2 02 4f |..N.....N......O|
00000720: f4 00 00 00 4e f4 00 00 00 c2 03 4f 6a 00 00 00 |....N......Oj...|
00000730: 4e 6a 00 00 00 c2 04 4f f5 00 00 00 4e f5 00 00 |Nj.....O....N...|
00000740: 00 c2 05 4f f6 00 00 00 4e f6 00 00 00 c2 06 4f |...O....N......O|
00000750: f7 00 00 00 4e f7 00 00 00 c2 07 4f f8 00 00 00 |....N......O....|
00000760: 4e f8 00 00 00 c2 08 4f f9 00 00 00 4e f9 00 00 |N......O....N...|
00000770: 00 c2 09 4f fa 00 00 00 4e fa 00 00 00 c2 0a 4f |...O....N......O|
00000780: fb 00 00 00 4e fb 00 00 00 c2 0b 4f fc 00 00 00 |....N......O....|
00000790: 4e fc 00 00 00 c2 0c 4f fd 00 00 00 4e fd 00 00 |N......O....N...|
000007a0: 00 c2 0d 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 |...O9...N9...D=.|
000007b0: 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 |..`......a..`..B|
000007c0: ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 |.......`...D....|
000007d0: 60 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 |`..B....`..C....|
000007e0: 24 00 00 44 fe 00 00 00 60 05 00 42 ef 00 00 00 |$..D....`..B....|
000007f0: 42 fe 00 00 00 0b 07 4e ff 00 00 00 07 4e 00 01 |B......N.....N..|
00000800: 00 00 bf 0a 4e 01 01 00 00 c2 0e 4f f4 00 00 00 |....N......O....|
00000810: 4e f4 00 00 00 c2 0f 4f 39 00 00 00 4e 39 00 00 |N......O9...N9..|
00000820: 00 44 3d 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 |.D=...`......a..|
00000830: 60 05 00 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 |`..B.......`...D|
00000840: ef 00 00 00 60 05 00 42 ef 00 00 00 60 04 00 43 |....`..B....`..C|
00000850: ed 00 00 00 24 00 00 44 02 01 00 00 60 05 00 42 |....$..D....`..B|
00000860: ef 00 00 00 42 02 01 00 00 0b b7 4e 03 01 00 00 |....B......N....|
00000870: b7 4e 04 01 00 00 b7 4e 05 01 00 00 c2 10 4f f4 |.N.....N......O.|
00000880: 00 00 00 4e f4 00 00 00 c2 11 4f 06 01 00 00 4e |...N......O....N|
00000890: 06 01 00 00 c2 12 4f 07 01 00 00 4e 07 01 00 00 |......O....N....|
000008a0: c2 13 4f 08 01 00 00 4e 08 01 00 00 c2 14 4f 09 |..O....N......O.|
000008b0: 01 00 00 4e 09 01 00 00 c2 15 4f 0a 01 00 00 4e |...N......O....N|
000008c0: 0a 01 00 00 c2 16 4f 6a 00 00 00 4e 6a 00 00 00 |......Oj...Nj...|
000008d0: c2 17 4f f6 00 00 00 4e f6 00 00 00 c2 18 4f 0b |..O....N......O.|
000008e0: 01 00 00 4e 0b 01 00 00 c2 19 4f f8 00 00 00 4e |...N......O....N|
000008f0: f8 00 00 00 c2 1a 4f 39 00 00 00 4e 39 00 00 00 |......O9...N9...|
00000900: 44 3d 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 |D=...`......a..`|
00000910: 05 00 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef |..B.......`...D.|
00000920: 00 00 00 60 05 00 42 ef 00 00 00 60 04 00 43 ed |...`..B....`..C.|
00000930: 00 00 00 24 00 00 44 0c 01 00 00 60 05 00 42 ef |...$..D....`..B.|
00000940: 00 00 00 42 0c 01 00 00 0b 07 4e ff 00 00 00 07 |...B......N.....|
00000950: 4e 0d 01 00 00 c2 1b 4f f4 00 00 00 4e f4 00 00 |N......O....N...|
00000960: 00 c2 1c 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 |...O9...N9...D=.|
00000970: 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 |..`......a..`..B|
00000980: ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 |.......`...D....|
00000990: 60 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 |`..B....`..C....|
000009a0: 24 00 00 44 0e 01 00 00 60 05 00 42 ef 00 00 00 |$..D....`..B....|
000009b0: 42 0e 01 00 00 0b 07 4e 0f 01 00 00 26 00 00 4e |B......N....&..N|
000009c0: 10 01 00 00 26 00 00 4e 11 01 00 00 07 4e 12 01 |....&..N.....N..|
000009d0: 00 00 c2 1d 4f f4 00 00 00 4e f4 00 00 00 44 3d |....O....N....D=|
000009e0: 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 |...`......a..`..|
000009f0: 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 |B.......`...D...|
00000a00: 00 60 05 00 42 ef 00 00 00 42 13 01 00 00 f6 ec |.`..B....B......|
00000a10: 0f 60 05 00 42 ef 00 00 00 0b 44 13 01 00 00 60 |.`..B.....D....`|
00000a20: 05 00 42 ef 00 00 00 42 13 01 00 00 60 04 00 43 |..B....B....`..C|
00000a30: ed 00 00 00 24 00 00 44 14 01 00 00 60 05 00 42 |....$..D....`..B|
00000a40: ef 00 00 00 42 13 01 00 00 42 14 01 00 00 0b b9 |....B....B......|
00000a50: 4e 15 01 00 00 b7 4e 16 01 00 00 b7 4e 17 01 00 |N.....N.....N...|
00000a60: 00 c1 1e 4e 18 01 00 00 09 4e 19 01 00 00 c2 1f |...N.....N......|
00000a70: 4f f4 00 00 00 4e f4 00 00 00 c2 20 4f 1a 01 00 |O....N..... O...|
00000a80: 00 4e 1a 01 00 00 c2 21 4f 1b 01 00 00 4e 1b 01 |.N.....!O....N..|
00000a90: 00 00 c2 22 4f 39 00 00 00 4e 39 00 00 00 44 3d |..."O9...N9...D=|
00000aa0: 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 |...`......a..`..|
00000ab0: 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 |B.......`...D...|
00000ac0: 00 60 05 00 42 ef 00 00 00 42 13 01 00 00 60 04 |.`..B....B....`.|
00000ad0: 00 43 ed 00 00 00 24 00 00 44 1c 01 00 00 60 05 |.C....$..D....`.|
00000ae0: 00 42 ef 00 00 00 42 13 01 00 00 42 1c 01 00 00 |.B....B....B....|
00000af0: 39 9d 00 00 00 43 ee 00 00 00 60 05 00 42 ef 00 |9....C....`..B..|
00000b00: 00 00 42 13 01 00 00 42 14 01 00 00 11 21 00 00 |..B....B.....!..|
00000b10: 0b c2 23 4f f4 00 00 00 4e f4 00 00 00 c2 24 4f |..#O....N.....$O|
00000b20: 1a 01 00 00 4e 1a 01 00 00 c2 25 4f 39 00 00 00 |....N.....%O9...|
00000b30: 4e 39 00 00 00 24 02 00 44 3d 00 00 00 60 05 00 |N9...$..D=...`..|
00000b40: f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 00 f6 |....a..`..B.....|
00000b50: ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 42 ef |..`...D....`..B.|
00000b60: 00 00 00 42 13 01 00 00 60 04 00 43 ed 00 00 00 |...B....`..C....|
00000b70: 24 00 00 44 1d 01 00 00 60 05 00 42 ef 00 00 00 |$..D....`..B....|
00000b80: 42 13 01 00 00 42 1d 01 00 00 39 9d 00 00 00 43 |B....B....9....C|
00000b90: ee 00 00 00 60 05 00 42 ef 00 00 00 42 13 01 00 |....`..B....B...|
00000ba0: 00 42 14 01 00 00 11 21 00 00 0b 07 4e 1e 01 00 |.B.....!....N...|
00000bb0: 00 07 4e 1f 01 00 00 c1 26 4e 20 01 00 00 c2 27 |..N.....&N ....'|
00000bc0: 4f f4 00 00 00 4e f4 00 00 00 c2 28 4f 1a 01 00 |O....N.....(O...|
00000bd0: 00 4e 1a 01 00 00 c2 29 4f 39 00 00 00 4e 39 00 |.N.....)O9...N9.|
00000be0: 00 00 24 02 00 44 3d 00 00 00 60 05 00 f6 ec 05 |..$..D=...`.....|
00000bf0: 0b 61 05 00 60 05 00 42 ef 00 00 00 f6 ec 0a 60 |.a..`..B.......`|
00000c00: 05 00 0b 44 ef 00 00 00 60 05 00 42 ef 00 00 00 |...D....`..B....|
00000c10: 42 21 01 00 00 f6 ec 0f 60 05 00 42 ef 00 00 00 |B!......`..B....|
00000c20: 0b 44 21 01 00 00 60 05 00 42 ef 00 00 00 42 21 |.D!...`..B....B!|
00000c30: 01 00 00 60 04 00 43 ed 00 00 00 24 00 00 44 22 |...`..C....$..D"|
00000c40: 01 00 00 60 05 00 42 ef 00 00 00 42 21 01 00 00 |...`..B....B!...|
00000c50: 42 22 01 00 00 0b c2 2a 4f f4 00 00 00 4e f4 00 |B".....*O....N..|
00000c60: 00 00 c2 2b 4f 23 01 00 00 4e 23 01 00 00 c2 2c |...+O#...N#....,|
00000c70: 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 00 00 60 |O9...N9...D=...`|
00000c80: 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 00 |......a..`..B...|
00000c90: 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 00 |....`...D....`..|
00000ca0: 42 ef 00 00 00 42 21 01 00 00 f6 ec 0f 60 05 00 |B....B!......`..|
00000cb0: 42 ef 00 00 00 0b 44 21 01 00 00 60 05 00 42 ef |B.....D!...`..B.|
00000cc0: 00 00 00 42 21 01 00 00 60 04 00 43 ed 00 00 00 |...B!...`..C....|
00000cd0: 24 00 00 44 24 01 00 00 60 05 00 42 ef 00 00 00 |$..D$...`..B....|
00000ce0: 42 21 01 00 00 42 24 01 00 00 0b b7 4e 25 01 00 |B!...B$.....N%..|
00000cf0: 00 c2 2d 4f f4 00 00 00 4e f4 00 00 00 c2 2e 4f |..-O....N......O|
00000d00: 23 01 00 00 4e 23 01 00 00 c2 2f 4f 39 00 00 00 |#...N#..../O9...|
00000d10: 4e 39 00 00 00 44 3d 00 00 00 60 05 00 f6 ec 05 |N9...D=...`.....|
00000d20: 0b 61 05 00 60 05 00 42 ef 00 00 00 f6 ec 0a 60 |.a..`..B.......`|
00000d30: 05 00 0b 44 ef 00 00 00 60 05 00 42 ef 00 00 00 |...D....`..B....|
00000d40: 60 04 00 43 ed 00 00 00 24 00 00 44 26 01 00 00 |`..C....$..D&...|
00000d50: 60 05 00 42 ef 00 00 00 42 26 01 00 00 0b 09 4e |`..B....B&.....N|
00000d60: 27 01 00 00 b7 4e 28 01 00 00 07 4e 29 01 00 00 |'....N(....N)...|
00000d70: 07 4e ff 00 00 00 07 4e 2a 01 00 00 07 4e 00 01 |.N.....N*....N..|
00000d80: 00 00 07 4e fb 00 00 00 c2 30 4f f4 00 00 00 4e |...N.....0O....N|
00000d90: f4 00 00 00 c2 31 4f 39 00 00 00 4e 39 00 00 00 |.....1O9...N9...|
00000da0: 44 3d 00 00 00 60 05 00 f6 ec 05 0b 61 05 00 60 |D=...`......a..`|
00000db0: 05 00 42 ef 00 00 00 f6 ec 0a 60 05 00 0b 44 ef |..B.......`...D.|
00000dc0: 00 00 00 60 05 00 42 ef 00 00 00 60 04 00 43 ed |...`..B....`..C.|
00000dd0: 00 00 00 24 00 00 44 2b 01 00 00 60 05 00 42 ef |...$..D+...`..B.|
00000de0: 00 00 00 42 2b 01 00 00 0b 07 4e ff 00 00 00 07 |...B+.....N.....|
00000df0: 4e 2c 01 00 00 07 4e 2d 01 00 00 07 4e 2e 01 00 |N,....N-....N...|
00000e00: 00 07 4e 2f 01 00 00 c2 32 4f f4 00 00 00 4e f4 |..N/....2O....N.|
00000e10: 00 00 00 c2 33 4f 30 01 00 00 4e 30 01 00 00 c2 |....3O0...N0....|
00000e20: 34 4f 39 00 00 00 4e 39 00 00 00 44 3d 00 00 00 |4O9...N9...D=...|
00000e30: 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef 00 |`......a..`..B..|
00000e40: 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 05 |.....`...D....`.|
00000e50: 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 24 00 |.B....`..C....$.|
00000e60: 00 44 31 01 00 00 60 05 00 42 ef 00 00 00 42 31 |.D1...`..B....B1|
00000e70: 01 00 00 0b 07 4e 00 01 00 00 b7 4e 32 01 00 00 |.....N.....N2...|
00000e80: c2 35 4f f4 00 00 00 4e f4 00 00 00 44 3d 00 00 |.5O....N....D=..|
00000e90: 00 60 05 00 f6 ec 05 0b 61 05 00 60 05 00 42 ef |.`......a..`..B.|
00000ea0: 00 00 00 f6 ec 0a 60 05 00 0b 44 ef 00 00 00 60 |......`...D....`|
00000eb0: 05 00 42 ef 00 00 00 60 04 00 43 ed 00 00 00 24 |..B....`..C....$|
00000ec0: 00 00 44 33 01 00 00 60 05 00 42 ef 00 00 00 42 |..D3...`..B....B|
00000ed0: 33 01 00 00 0b 07 4e 34 01 00 00 c2 36 4f f4 00 |3.....N4....6O..|
00000ee0: 00 00 4e f4 00 00 00 c2 37 4f 35 01 00 00 4e 35 |..N.....7O5...N5|
00000ef0: 01 00 00 c2 38 4f ec 00 00 00 4e ec 00 00 00 c2 |....8O....N.....|
00000f00: 39 4f 36 01 00 00 4e 36 01 00 00 c2 3a 4f 37 01 |9O6...N6....:O7.|
00000f10: 00 00 4e 37 01 00 00 c2 3b 4f 38 01 00 00 4e 38 |..N7....;O8...N8|
00000f20: 01 00 00 c2 3c 4f 39 01 00 00 4e 39 01 00 00 44 |....<O9...N9...D|
00000f30: 3d 00 00 00 06 2f c8 03 cf 04 00 00 00 09 14 26 |=..../.........&|
00000f40: 58 15 48 50 11 3d 1f 20 00 14 2a 41 1b 0c 00 07 |X.HP.=. ..*A....|
00000f50: 36 0c 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 0f |6...'....../..!.|
00000f60: 11 08 1b 26 11 0a 1b 0e 2b 45 11 08 1b 14 1b 0c |...&....+E......|
00000f70: 00 a8 01 ac 01 0f 11 0c 27 0b 11 08 1b 18 12 2f |........'....../|
00000f80: 11 08 21 0f 11 08 1b 26 11 0a 1b 0e 2b 45 11 08 |..!....&....+E..|
00000f90: 1b 14 1b 0c 00 31 1c 0f 11 0c 27 0b 11 08 1b 18 |.....1....'.....|
00000fa0: 12 2f 11 08 21 0f 11 08 1b 28 11 0a 1b 0e 2b 47 |./..!....(....+G|
00000fb0: 11 08 1b 14 1b 0e 00 9c 01 5c 11 11 0c 27 0b 11 |.........\...'..|
00000fc0: 08 1b 18 12 2f 11 08 21 0f 11 08 1b 22 11 0a 1b |..../..!...."...|
00000fd0: 0e 2b 41 11 08 1b 14 1b 08 00 2a 18 0b 11 0c 27 |.+A.......*....'|
00000fe0: 0b 11 08 1b 18 12 2f 11 08 21 0f 11 08 1b 26 11 |....../..!....&.|
00000ff0: 0a 1b 0e 2b 45 11 08 1b 14 1b 0c 00 2e 1a 0f 11 |...+E...........|
00001000: 0c 27 0b 11 08 1b 18 12 2f 11 08 21 08 11 08 1b |.'....../..!....|
00001010: 14 1b 16 12 41 11 08 1b 14 21 23 11 08 1b 14 1b |....A....!#.....|
00001020: 32 11 0a 1b 0e 2b 65 11 08 1b 14 1b 12 1b 1a 00 |2....+e.........|
00001030: 55 2e 2f 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 |U./..'....../..!|
00001040: 0f 11 08 1b 14 1b 24 11 0a 1b 0e 2b 57 11 08 1b |......$....+W...|
00001050: 14 1b 12 1b 26 1b 0c 1b 18 11 08 1b 14 1b 12 20 |....&.......... |
00001060: 1a ca 51 00 08 20 55 11 0c 27 0b 11 08 1b 18 12 |..Q.. U..'......|
00001070: 2f 11 08 21 0f 11 08 1b 14 1b 2e 11 0a 1b 0e 2b |/..!...........+|
00001080: 61 11 08 1b 14 1b 12 1b 30 1b 0c 1b 18 11 08 1b |a.......0.......|
00001090: 14 1b 12 20 1a 00 3b 00 51 00 08 32 5f 11 0c 27 |... ..;.Q..2_..'|
000010a0: 0b 11 08 1b 18 12 2f 11 08 21 08 11 08 1b 14 1b |....../..!......|
000010b0: 10 12 3b 11 08 1b 14 21 23 11 08 1b 14 1b 20 11 |..;....!#..... .|
000010c0: 0a 1b 0e 2b 53 11 08 1b 14 1b 0c 1b 0e 00 2a 3c |...+S.........*<|
000010d0: 1d 11 0c 27 0b 11 08 1b 18 12 2f 11 08 21 08 11 |...'....../..!..|
000010e0: 08 1b 14 1b 10 12 3b 11 08 1b 14 21 23 11 08 1b |......;....!#...|
000010f0: 14 1b 1e 11 0a 1b 0e 2b 51 11 08 1b 14 1b 0c 1b |.......+Q.......|
00001100: 0c 00 30 4a 1b 11 0c 27 0b 11 08 1b 18 12 2f 11 |..0J...'....../.|
00001110: 08 21 0f 11 08 1b 3c 11 0a 1b 0e 2b 5b 11 08 1b |.!....<....+[...|
00001120: 14 1b 22 00 48 20 25 11 0c 27 0b 11 08 1b 18 12 |..".H %..'......|
00001130: 2f 11 08 21 0f 11 08 1b 28 11 0a 1b 0e 2b 47 11 |/..!....(....+G.|
00001140: 08 1b 14 1b 0e 00 48 32 11 11 0c 27 0b 11 08 1b |......H2...'....|
00001150: 18 12 2f 11 08 21 0f 11 08 1b 30 11 0a 1b 0e 2b |../..!....0....+|
00001160: 4f 11 08 1b 14 1b 16 00 1e 12 19 11 0c 27 0b 11 |O............'..|
00001170: 08 1b 18 12 2f 11 08 21 0f 11 08 1b 28 11 0a 1b |..../..!....(...|
00001180: 0e 2b 47 11 08 1b 14 1b 0e 00 0c 43 06 01 00 00 |.+G........C....|
00001190: 00 00 01 00 01 03 00 c2 00 28 c8 03 04 19 0c 0d |.........(......|
000011a0: 07 00 0c 43 06 01 00 00 02 00 04 00 00 16 02 10 |...C............|
000011b0: 00 01 00 9e 01 00 01 00 08 cb 0c 00 cc c7 42 f4 |..............B.|
000011c0: 00 00 00 43 5c 00 00 00 c7 c8 24 02 00 29 c8 03 |...C\.....$..)..|
000011d0: 0c 1a 0f 1c 05 07 08 1b 16 20 1a 07 0d 00 0c 43 |......... .....C|
000011e0: 06 01 00 02 01 02 05 00 00 12 03 f4 04 00 01 00 |................|
000011f0: dc 01 00 01 00 f6 04 00 00 00 d4 7e ee 08 cb d3 |...........~....|
00001200: c7 d4 c7 48 4b 81 ec f7 0e 0e d3 28 c8 03 12 1f |...HK......(....|
00001210: 10 03 12 1c 21 07 18 07 18 07 0e 07 01 27 35 07 |....!........'5.|
00001220: 0d 00 0c 43 06 01 00 03 01 03 02 00 00 2a 04 f8 |...C.........*..|
00001230: 04 00 01 00 fa 04 00 01 00 fc 04 00 01 00 10 00 |................|
00001240: 01 00 08 cb d3 98 ec 03 b7 d7 d4 98 ec 03 b7 d8 |................|
00001250: d5 98 ec 03 b7 d9 c7 d3 44 f1 00 00 00 c7 d4 44 |........D......D|
00001260: f2 00 00 00 c7 d5 44 f3 00 00 00 29 c8 03 1a 43 |......D....)...C|
00001270: 10 0d 05 17 01 0d 02 17 01 0d 02 17 01 0d 07 07 |................|
00001280: 16 21 15 07 1a 21 19 07 18 00 0c 43 06 01 00 02 |.!...!.....C....|
00001290: 01 02 05 01 00 4d 03 fe 04 00 01 00 80 05 00 01 |.....M..........|
000012a0: 00 82 05 00 00 00 d6 03 05 00 df 42 ef 00 00 00 |...........B....|
000012b0: 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cf d3 42 f1 |B........!....B.|
000012c0: 00 00 00 d4 42 f1 00 00 00 9f 44 f1 00 00 00 c7 |....B.....D.....|
000012d0: d3 42 f2 00 00 00 d4 42 f2 00 00 00 9f 44 f2 00 |.B.....B.....D..|
000012e0: 00 00 c7 d3 42 f3 00 00 00 d4 42 f3 00 00 00 9f |....B.....B.....|
000012f0: 44 f3 00 00 00 c7 28 c8 03 32 4e 09 03 20 07 08 |D.....(..2N.. ..|
00001300: 1b 14 2f 0c 12 49 07 1a 07 04 1b 0e 07 04 1b 07 |../..I..........|
00001310: 21 27 07 1e 07 04 1b 12 07 04 1b 07 21 2f 07 1c |!'..........!/..|
00001320: 07 04 1b 10 07 04 1b 07 21 1d 07 0d 00 0c 43 06 |........!.....C.|
00001330: 01 00 02 01 02 05 01 00 48 03 fe 04 00 01 00 84 |........H.......|
00001340: 05 00 01 00 82 05 00 00 00 d6 03 05 00 df 42 ef |..............B.|
00001350: 00 00 00 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cf |...B........!...|
00001360: d3 42 f1 00 00 00 d4 9f 44 f1 00 00 00 c7 d3 42 |.B......D......B|
00001370: f2 00 00 00 d4 9f 44 f2 00 00 00 c7 d3 42 f3 00 |......D......B..|
00001380: 00 00 d4 9f 44 f3 00 00 00 c7 43 fa 00 00 00 24 |....D.....C....$|
00001390: 00 00 0e c7 28 c8 03 32 55 0f 03 14 07 08 1b 14 |....(..2U.......|
000013a0: 2f 0c 12 49 07 1a 07 04 1b 0e 07 03 21 27 07 1e |/..I........!'..|
000013b0: 07 04 1b 12 07 03 21 2f 07 1c 07 04 1b 10 07 03 |......!/........|
000013c0: 21 2b 07 0c 1b 0c 17 09 07 0d 00 0c 43 06 01 00 |!+..........C...|
000013d0: 02 01 02 05 01 00 4d 03 fe 04 00 01 00 80 05 00 |......M.........|
000013e0: 01 00 82 05 00 00 00 d6 03 05 00 df 42 ef 00 00 |............B...|
000013f0: 00 42 f0 00 00 00 11 b7 b7 b7 21 03 00 cf d3 42 |.B........!....B|
00001400: f1 00 00 00 d4 42 f1 00 00 00 a0 44 f1 00 00 00 |.....B.....D....|
00001410: c7 d3 42 f2 00 00 00 d4 42 f2 00 00 00 a0 44 f2 |..B.....B.....D.|
00001420: 00 00 00 c7 d3 42 f3 00 00 00 d4 42 f3 00 00 00 |.....B.....B....|
00001430: a0 44 f3 00 00 00 c7 28 c8 03 32 5d 0e 03 16 07 |.D.....(..2]....|
00001440: 08 1b 14 2f 0c 12 49 07 1a 07 04 1b 0e 07 04 1b |.../..I.........|
00001450: 07 21 27 07 1e 07 04 1b 12 07 04 1b 07 21 2f 07 |.!'..........!/.|
00001460: 1c 07 04 1b 10 07 04 1b 07 21 1d 07 0d 00 0c 43 |.........!.....C|
00001470: 06 01 00 02 01 02 05 01 00 4d 03 fe 04 00 01 00 |.........M......|
00001480: 80 05 00 01 00 82 05 00 00 00 d6 03 05 00 df 42 |...............B|
00001490: ef 00 00 00 42 f0 00 00 00 11 b7 b7 b7 21 03 00 |....B........!..|
000014a0: cf d3 42 f1 00 00 00 d4 42 f1 00 00 00 9c 44 f1 |..B.....B.....D.|
000014b0: 00 00 00 c7 d3 42 f2 00 00 00 d4 42 f2 00 00 00 |.....B.....B....|
000014c0: 9c 44 f2 00 00 00 c7 d3 42 f3 00 00 00 d4 42 f3 |.D......B.....B.|
000014d0: 00 00 00 9c 44 f3 00 00 00 c7 28 c8 03 32 64 0e |....D.....(..2d.|
000014e0: 03 16 07 08 1b 14 2f 0c 12 49 07 1a 07 04 1b 0e |....../..I......|
000014f0: 07 04 1b 07 21 27 07 1e 07 04 1b 12 07 04 1b 07 |....!'..........|
00001500: 21 2f 07 1c 07 04 1b 10 07 04 1b 07 21 1d 07 0d |!/..........!...|
00001510: 00 0c 43 06 01 00 02 01 02 05 01 00 3e 03 fe 04 |..C.........>...|
00001520: 00 01 00 86 05 00 01 00 82 05 00 00 00 d6 03 05 |................|
00001530: 00 df 42 ef 00 00 00 42 f0 00 00 00 11 b7 b7 b7 |..B....B........|
00001540: 21 03 00 cf d3 42 f1 00 00 00 d4 9c 44 f1 00 00 |!....B......D...|
00001550: 00 c7 d3 42 f2 00 00 00 d4 9c 44 f2 00 00 00 c7 |...B......D.....|
00001560: d3 42 f3 00 00 00 d4 9c 44 f3 00 00 00 c7 28 c8 |.B......D.....(.|
00001570: 03 2c 6b 14 03 0a 07 08 1b 14 2f 0c 12 49 07 1a |.,k......./..I..|
00001580: 07 04 1b 0e 07 03 21 27 07 1e 07 04 1b 12 07 03 |......!'........|
00001590: 21 2f 07 1c 07 04 1b 10 07 03 21 1d 07 0d 00 0c |!/........!.....|
000015a0: 43 06 01 00 02 01 02 05 01 00 3e 03 fe 04 00 01 |C.........>.....|
000015b0: 00 86 05 00 01 00 82 05 00 00 00 d6 03 05 00 df |................|
000015c0: 42 ef 00 00 00 42 f0 00 00 00 11 b7 b7 b7 21 03 |B....B........!.|
000015d0: 00 cf d3 42 f1 00 00 00 d4 9d 44 f1 00 00 00 c7 |...B......D.....|
000015e0: d3 42 f2 00 00 00 d4 9d 44 f2 00 00 00 c7 d3 42 |.B......D......B|
000015f0: f3 00 00 00 d4 9d 44 f3 00 00 00 c7 28 c8 03 2c |......D.....(..,|
00001600: 72 12 03 0e 07 08 1b 14 2f 0c 12 49 07 1a 07 04 |r......./..I....|
00001610: 1b 0e 07 03 21 27 07 1e 07 04 1b 12 07 03 21 2f |....!'........!/|
00001620: 07 1c 07 04 1b 10 07 03 21 1d 07 0d 00 0c 43 06 |........!.....C.|
00001630: 01 00 00 01 00 03 00 00 75 01 10 00 01 00 08 cb |........u.......|
00001640: c7 c7 42 f1 00 00 00 b7 a7 ec 16 c7 42 f1 00 00 |..B.........B...|
00001650: 00 b8 a7 ec 04 b8 ee 0a c7 42 f1 00 00 00 ee 02 |.........B......|
00001660: b7 44 f1 00 00 00 c7 c7 42 f2 00 00 00 b7 a7 ec |.D......B.......|
00001670: 16 c7 42 f2 00 00 00 b8 a7 ec 04 b8 ee 0a c7 42 |..B............B|
00001680: f2 00 00 00 ee 02 b7 44 f2 00 00 00 c7 c7 42 f3 |.......D......B.|
00001690: 00 00 00 b7 a7 ec 16 c7 42 f3 00 00 00 b8 a7 ec |........B.......|
000016a0: 04 b8 ee 0a c7 42 f3 00 00 00 ee 02 b7 44 f3 00 |.....B.......D..|
000016b0: 00 00 29 c8 03 2d 79 0b 0d 05 07 08 07 18 20 0a |..)..-y....... .|
000016c0: 16 1e 20 0a 25 26 44 77 07 08 07 1c 20 0e 16 1e |.. .%&Dw.... ...|
000016d0: 20 0e 25 26 44 83 01 07 08 07 1a 20 0c 16 1e 20 | .%&D...... ... |
000016e0: 0c 25 26 00 0c 43 06 01 00 01 02 01 05 00 00 54 |.%&..C.........T|
000016f0: 03 80 04 00 01 00 ca 04 00 00 00 10 00 01 00 08 |................|
00001700: cc 39 a5 00 00 00 43 44 01 00 00 c8 42 f1 00 00 |.9....CD....B...|
00001710: 00 d3 42 f1 00 00 00 a0 24 01 00 39 a5 00 00 00 |..B.....$..9....|
00001720: 43 44 01 00 00 c8 42 f2 00 00 00 d3 42 f2 00 00 |CD....B.....B...|
00001730: 00 a0 24 01 00 9f 39 a5 00 00 00 43 44 01 00 00 |..$...9....CD...|
00001740: c8 42 f3 00 00 00 d3 42 f3 00 00 00 a0 24 01 00 |.B.....B.....$..|
00001750: 9f cf 28 c8 03 35 7e 0e 0d 04 1b 08 20 12 1b 0e |..(..5~..... ...|
00001760: 07 0a 1b 0d 07 13 11 32 1b 08 20 12 1b 12 07 0a |.......2.. .....|
00001770: 1b 0d 07 17 11 13 07 4e 1b 08 20 12 1b 10 07 0a |.......N.. .....|
00001780: 1b 0d 07 15 11 13 08 89 01 07 0d 00 0c 43 06 01 |.............C..|
00001790: 00 03 01 03 07 01 00 63 04 fe 04 00 01 00 80 05 |.......c........|
000017a0: 00 01 00 8a 05 00 01 00 82 05 00 00 00 d6 03 05 |................|
000017b0: 00 df 42 ef 00 00 00 42 f0 00 00 00 11 b7 b7 b7 |..B....B........|
000017c0: 21 03 00 cb df 42 ef 00 00 00 42 f0 00 00 00 42 |!....B....B....B|
000017d0: 3d 00 00 00 43 6a 00 00 00 df 42 ef 00 00 00 42 |=...Cj....B....B|
000017e0: f0 00 00 00 42 3d 00 00 00 43 f8 00 00 00 d3 b8 |....B=...C......|
000017f0: d5 a0 24 02 00 df 42 ef 00 00 00 42 f0 00 00 00 |..$...B....B....|
00001800: 42 3d 00 00 00 43 f8 00 00 00 d4 d5 24 02 00 24 |B=...C......$..$|
00001810: 02 00 cf 28 c8 03 3c 82 01 0b 03 1c 07 08 1b 14 |...(..<.........|
00001820: 2f 0c 17 37 07 08 1b 14 1b 0c 1b 14 1b 0a 07 08 |/..7............|
00001830: 1b 14 1b 0c 1b 14 1b 20 0c 10 07 03 07 0d 11 1a |....... ........|
00001840: 07 08 1b 14 1b 0c 1b 14 1b 20 07 08 07 09 11 cf |......... ......|
00001850: 01 17 55 00 0c 43 06 01 00 00 04 00 04 00 00 5d |..U..C.........]|
00001860: 04 f8 04 00 00 00 fa 04 00 01 00 fc 04 00 02 00 |................|
00001870: 10 00 01 00 08 ce 39 a5 00 00 00 43 46 01 00 00 |......9....CF...|
00001880: ca 42 f1 00 00 00 c0 ff 00 9c 24 01 00 cb 39 a5 |.B........$...9.|
00001890: 00 00 00 43 46 01 00 00 ca 42 f2 00 00 00 c0 ff |...CF....B......|
000018a0: 00 9c 24 01 00 cc 39 a5 00 00 00 43 46 01 00 00 |..$...9....CF...|
000018b0: ca 42 f3 00 00 00 c0 ff 00 9c 24 01 00 cd c7 bf |.B........$.....|
000018c0: 4d 9c c8 c0 96 00 9c 9f c9 bf 1d 9c 9f bf 08 a3 |M...............|
000018d0: 28 c8 03 35 87 01 10 0d 00 1b 08 20 16 2a 0a 07 |(..5....... .*..|
000018e0: 13 17 13 1b 08 20 16 2a 0e 07 17 17 13 1b 08 20 |..... .*....... |
000018f0: 16 2a 0c 07 15 17 13 11 04 07 0e 16 04 07 07 07 |.*..............|
00001900: 18 11 04 07 07 11 14 07 45 00 0c 43 06 01 00 00 |........E..C....|
00001910: 04 00 04 00 00 68 04 f8 04 00 00 00 fa 04 00 01 |.....h..........|
00001920: 00 fc 04 00 02 00 10 00 01 00 08 ce 39 a5 00 00 |............9...|
00001930: 00 43 46 01 00 00 ca 42 f1 00 00 00 c0 ff 00 9c |.CF....B........|
00001940: 24 01 00 cb 39 a5 00 00 00 43 46 01 00 00 ca 42 |$...9....CF....B|
00001950: f2 00 00 00 c0 ff 00 9c 24 01 00 cc 39 a5 00 00 |........$...9...|
00001960: 00 43 46 01 00 00 ca 42 f3 00 00 00 c0 ff 00 9c |.CF....B........|
00001970: 24 01 00 cd 04 47 01 00 00 c7 9f 04 48 01 00 00 |$....G......H...|
00001980: 9f c8 9f 04 48 01 00 00 9f c9 9f 04 49 01 00 00 |....H.......I...|
00001990: 9f 28 c8 03 35 8d 01 0e 0d 04 1b 08 20 16 2a 0a |.(..5....... .*.|
000019a0: 07 13 17 13 1b 08 20 16 2a 0e 07 17 17 13 1b 08 |...... .*.......|
000019b0: 20 16 2a 0c 07 15 30 03 07 03 20 08 07 10 07 03 | .*...0... .....|
000019c0: 20 08 07 10 07 03 20 08 07 4b 00 0c 43 06 01 00 | ..... ..K..C...|
000019d0: 03 01 03 02 00 00 1f 04 94 05 00 01 00 80 04 00 |................|
000019e0: 01 00 82 04 00 01 00 10 00 01 00 08 cb c7 d3 44 |...............D|
000019f0: ff 00 00 00 c7 d4 44 00 01 00 00 c7 d5 ec 04 d5 |......D.........|
00001a00: ee 03 bf 0a 44 01 01 00 00 29 c8 03 11 9e 01 10 |....D....)......|
00001a10: 0d 0f 07 20 21 1f 07 1a 21 19 07 24 11 18 00 0c |... !...!..$....|
00001a20: 43 06 01 00 00 01 00 02 00 00 3e 01 10 00 01 00 |C.........>.....|
00001a30: 08 cb 04 4b 01 00 00 c7 42 ff 00 00 00 42 03 01 |...K....B....B..|
00001a40: 00 00 9f 04 48 01 00 00 9f c7 42 ff 00 00 00 42 |....H.....B....B|
00001a50: 04 01 00 00 9f 04 48 01 00 00 9f c7 42 ff 00 00 |......H.....B...|
00001a60: 00 42 05 01 00 00 9f 04 4c 01 00 00 9f 28 c8 03 |.B......L....(..|
00001a70: 1e a3 01 0e 2b 22 1b 12 1b 1d 20 24 0c 18 1b 12 |....+".... $....|
00001a80: 1b 1d 20 24 0c 18 1b 12 1b 1d 20 24 07 a5 01 00 |.. $...... $....|
00001a90: 0c 43 06 01 00 03 01 03 02 00 00 2a 04 86 04 00 |.C.........*....|
00001aa0: 01 00 88 04 00 01 00 8a 04 00 01 00 10 00 01 00 |................|
00001ab0: 08 cb c7 d3 ec 04 d3 ee 02 b7 44 03 01 00 00 c7 |..........D.....|
00001ac0: d4 ec 04 d4 ee 02 b7 44 04 01 00 00 c7 d5 ec 04 |.......D........|
00001ad0: d5 ee 02 b7 44 05 01 00 00 29 c8 03 15 b1 01 10 |....D....)......|
00001ae0: 0d 0f 07 14 11 08 30 1b 07 14 11 08 30 1b 07 14 |......0.....0...|
00001af0: 11 08 00 0c 43 06 01 00 01 01 01 02 00 00 27 02 |....C.........'.|
00001b00: 9a 05 00 01 00 10 00 01 00 08 cb c7 d3 42 03 01 |.............B..|
00001b10: 00 00 44 03 01 00 00 c7 d3 42 04 01 00 00 44 04 |..D......B....D.|
00001b20: 01 00 00 c7 d3 42 05 01 00 00 44 05 01 00 00 29 |.....B....D....)|
00001b30: c8 03 15 b6 01 0a 0d 03 07 12 07 0c 35 1d 07 12 |............5...|
00001b40: 07 0c 35 1d 07 12 07 0c 00 0c 43 06 01 00 00 02 |..5.......C.....|
00001b50: 00 06 01 00 34 02 9c 05 00 00 00 10 00 01 00 d6 |....4...........|
00001b60: 03 05 00 08 cc c8 43 08 01 00 00 24 00 00 cb df |......C....$....|
00001b70: 42 ef 00 00 00 42 02 01 00 00 11 c8 42 03 01 00 |B....B......B...|
00001b80: 00 c7 9d c8 42 04 01 00 00 c7 9d c8 42 05 01 00 |....B.......B...|
00001b90: 00 c7 9d 21 03 00 28 c8 03 23 bb 01 0f 12 0a 1b |...!..(..#......|
00001ba0: 14 17 15 07 08 1b 14 25 18 1b 0a 07 03 0c 12 1b |.......%........|
00001bb0: 0a 07 03 0c 12 1b 0a 07 03 07 3f 11 3f 00 0c 43 |..........?.?..C|
00001bc0: 06 01 00 00 01 00 05 00 00 38 01 10 00 01 00 08 |.........8......|
00001bd0: cb 39 a5 00 00 00 43 4f 01 00 00 c7 42 03 01 00 |.9....CO....B...|
00001be0: 00 c7 42 03 01 00 00 9c c7 42 04 01 00 00 c7 42 |..B......B.....B|
00001bf0: 04 01 00 00 9c 9f c7 42 05 01 00 00 c7 42 05 01 |.......B.....B..|
00001c00: 00 00 9c 9f 25 01 00 c8 03 1f bf 01 0f 0d 00 1b |....%...........|
00001c10: 08 20 16 20 12 1b 0b 0c 22 20 12 1b 0b 07 13 0c |. . ...." ......|
00001c20: 36 20 12 1b 0b 07 13 07 6d 00 0c 43 06 01 00 01 |6 ......m..C....|
00001c30: 01 01 07 01 00 65 02 8a 05 00 01 00 10 00 01 00 |.....e..........|
00001c40: d6 03 05 00 08 cb df 42 ef 00 00 00 42 02 01 00 |.......B....B...|
00001c50: 00 11 c7 42 05 01 00 00 8e d3 42 04 01 00 00 9c |...B......B.....|
00001c60: c7 42 04 01 00 00 d3 42 05 01 00 00 9c 9f c7 42 |.B.....B.......B|
00001c70: 05 01 00 00 d3 42 03 01 00 00 9c c7 42 03 01 00 |.....B......B...|
00001c80: 00 d3 42 05 01 00 00 9c a0 c7 42 04 01 00 00 8e |..B.......B.....|
00001c90: d3 42 03 01 00 00 9c c7 42 03 01 00 00 d3 42 04 |.B......B.....B.|
00001ca0: 01 00 00 9c 9f 21 03 00 28 c8 03 48 c2 01 0b 0d |.....!..(..H....|
00001cb0: 10 07 08 1b 14 25 1a 1b 09 07 14 07 02 1b 05 0c |.....%..........|
00001cc0: 18 1b 0a 07 02 1b 05 07 11 0c 28 1b 0a 07 02 1b |..........(.....|
00001cd0: 05 0c 18 1b 0a 07 02 1b 05 07 11 0c 2a 1b 09 07 |............*...|
00001ce0: 14 07 02 1b 05 0c 18 1b 0a 07 02 1b 05 07 11 07 |................|
00001cf0: 93 01 11 3f 00 0c 43 06 01 00 01 01 01 03 00 00 |...?..C.........|
00001d00: 2c 02 8a 05 00 01 00 10 00 01 00 08 cb c7 42 03 |,.............B.|
00001d10: 01 00 00 d3 42 03 01 00 00 9c c7 42 04 01 00 00 |....B......B....|
00001d20: d3 42 04 01 00 00 9c 9f c7 42 05 01 00 00 d3 42 |.B.......B.....B|
00001d30: 05 01 00 00 9c 9f 28 c8 03 21 c5 01 09 12 14 1b |......(..!......|
00001d40: 0a 07 02 1b 05 0c 18 1b 0a 07 02 1b 05 07 11 0c |................|
00001d50: 2a 1b 0a 07 02 1b 05 07 11 07 45 00 0c 43 06 01 |*.........E..C..|
00001d60: 00 02 00 02 06 01 00 37 02 a0 05 00 01 00 8a 05 |.......7........|
00001d70: 00 01 00 d6 03 05 00 df 42 ef 00 00 00 42 02 01 |........B....B..|
00001d80: 00 00 11 d4 42 03 01 00 00 d3 42 03 01 00 00 9f |....B.....B.....|
00001d90: d4 42 04 01 00 00 d3 42 04 01 00 00 9f d4 42 05 |.B.....B......B.|
00001da0: 01 00 00 d3 42 05 01 00 00 9f 21 03 00 28 c8 03 |....B.....!..(..|
00001db0: 2b c8 01 09 03 14 07 08 1b 14 20 10 07 02 1b 0a |+......... .....|
00001dc0: 07 02 1b 05 07 0e 07 02 1b 0a 07 02 1b 05 07 0e |................|
00001dd0: 07 02 1b 0a 07 02 1b 05 07 35 11 3f 00 0c 43 06 |.........5.?..C.|
00001de0: 01 00 02 00 02 06 01 00 57 02 a0 05 00 01 00 8a |........W.......|
00001df0: 05 00 01 00 d6 03 05 00 d4 98 11 ed 04 0e d3 98 |................|
00001e00: ec 17 04 51 01 00 00 d3 9f 04 48 01 00 00 9f d4 |...Q......H.....|
00001e10: 9f 04 4c 01 00 00 9f 30 df 42 ef 00 00 00 42 02 |..L....0.B....B.|
00001e20: 01 00 00 11 d3 42 03 01 00 00 d4 42 03 01 00 00 |.....B.....B....|
00001e30: a0 d3 42 04 01 00 00 d4 42 04 01 00 00 a0 d3 42 |..B.....B......B|
00001e40: 05 01 00 00 d4 42 05 01 00 00 a0 21 03 00 28 c8 |.....B.....!..(.|
00001e50: 03 3d cb 01 0e 03 01 20 0c 30 3a 07 03 20 08 07 |.=..... .0:.. ..|
00001e60: 10 07 03 20 08 07 5f 08 0e 07 08 1b 14 20 10 07 |... .._...... ..|
00001e70: 02 1b 0a 07 02 1b 05 07 0e 07 02 1b 0a 07 02 1b |................|
00001e80: 05 07 0e 07 02 1b 0a 07 02 1b 05 07 35 11 3f 00 |............5.?.|
00001e90: 0c 43 06 01 00 02 00 02 06 01 00 37 02 a0 05 00 |.C.........7....|
00001ea0: 01 00 8a 05 00 01 00 d6 03 05 00 df 42 ef 00 00 |............B...|
00001eb0: 00 42 02 01 00 00 11 d3 42 03 01 00 00 d4 42 03 |.B......B.....B.|
00001ec0: 01 00 00 9c d3 42 04 01 00 00 d4 42 04 01 00 00 |.....B.....B....|
00001ed0: 9c d3 42 05 01 00 00 d4 42 05 01 00 00 9c 21 03 |..B.....B.....!.|
00001ee0: 00 28 c8 03 2b d0 01 14 03 01 07 08 1b 14 20 10 |.(..+......... .|
00001ef0: 07 02 1b 0a 07 02 1b 05 07 0e 07 02 1b 0a 07 02 |................|
00001f00: 1b 05 07 0e 07 02 1b 0a 07 02 1b 05 07 35 11 3f |.............5.?|
00001f10: 00 0c 43 06 01 00 02 00 02 06 01 00 28 02 a0 05 |..C.........(...|
00001f20: 00 01 00 8a 05 00 01 00 d6 03 05 00 df 42 ef 00 |.............B..|
00001f30: 00 00 42 02 01 00 00 11 d3 42 03 01 00 00 d4 9c |..B......B......|
00001f40: d3 42 04 01 00 00 d4 9c d3 42 05 01 00 00 d4 9c |.B.......B......|
00001f50: 21 03 00 28 c8 03 25 d3 01 14 03 01 07 08 1b 14 |!..(..%.........|
00001f60: 20 10 07 02 1b 0a 07 03 07 0a 07 02 1b 0a 07 03 | ...............|
00001f70: 07 0a 07 02 1b 0a 07 03 07 2d 11 3f 00 0c 43 06 |.........-.?..C.|
00001f80: 01 00 00 01 00 02 00 00 2f 01 10 00 01 00 08 cb |......../.......|
00001f90: 04 52 01 00 00 c7 42 03 01 00 00 9f 04 48 01 00 |.R....B......H..|
00001fa0: 00 9f c7 42 04 01 00 00 9f 04 48 01 00 00 9f c7 |...B......H.....|
00001fb0: 42 05 01 00 00 9f 04 4c 01 00 00 9f 28 c8 03 17 |B......L....(...|
00001fc0: d6 01 0e 2b 24 1b 0b 20 12 0c 18 1b 0b 20 12 0c |...+$.. ..... ..|
00001fd0: 18 1b 0b 20 12 07 71 00 0c 43 06 01 00 02 01 02 |... ..q..C......|
00001fe0: 02 00 00 11 03 94 05 00 01 00 a6 05 00 01 00 10 |................|
00001ff0: 00 01 00 08 cb c7 d3 44 ff 00 00 00 c7 d4 44 0d |.......D......D.|
00002000: 01 00 00 29 c8 03 0b e3 01 10 0d 0f 07 20 21 1f |...)......... !.|
00002010: 07 22 00 0c 43 06 01 00 00 01 00 02 00 00 22 01 |."..C.........".|
00002020: 10 00 01 00 08 cb 04 54 01 00 00 c7 42 ff 00 00 |.......T....B...|
00002030: 00 9f 04 48 01 00 00 9f c7 42 0d 01 00 00 9f 04 |...H.....B......|
00002040: 4c 01 00 00 9f 28 c8 03 11 e7 01 0e 2b 1e 1b 0b |L....(......+...|
00002050: 20 20 0c 18 1b 0b 20 22 07 6b 00 0c 43 06 01 00 |  .... ".k..C...|
00002060: 00 01 00 0a 01 02 97 01 01 10 00 01 00 d6 03 05 |................|
00002070: 00 08 cb c7 df 42 ef 00 00 00 42 2b 01 00 00 11 |.....B....B+....|
00002080: df 42 ef 00 00 00 42 02 01 00 00 11 b7 b7 bf fb |.B....B.........|
00002090: 21 03 00 df 42 ef 00 00 00 42 02 01 00 00 11 b7 |!...B....B......|
000020a0: b7 b8 21 03 00 df 42 ef 00 00 00 42 02 01 00 00 |..!...B....B....|
000020b0: 11 b7 b8 b7 21 03 00 21 03 00 44 0f 01 00 00 c7 |....!..!..D.....|
000020c0: 39 9e 00 00 00 11 21 00 00 44 10 01 00 00 c7 39 |9.....!..D.....9|
000020d0: 9e 00 00 00 11 21 00 00 44 11 01 00 00 c7 df 42 |.....!..D......B|
000020e0: ef 00 00 00 42 31 01 00 00 11 df 42 ef 00 00 00 |....B1.....B....|
000020f0: 42 f0 00 00 00 11 b7 b7 c1 00 21 03 00 c1 01 21 |B.........!....!|
00002100: 02 00 44 12 01 00 00 29 c8 03 46 f6 01 10 0d 0f |..D....)..F.....|
00002110: 07 24 07 08 1b 14 20 18 07 08 1b 14 2a 1c 0c 0d |.$.... .....*...|
00002120: 11 20 07 08 1b 14 2f 0e 11 1e 07 08 1b 14 2f 0e |. ..../......./.|
00002130: 11 c5 01 2b 4d 07 24 20 0a 2b 2d 07 24 20 0a 2b |...+M.$ .+-.$ .+|
00002140: 2d 07 2c 07 08 1b 14 20 20 07 08 1b 14 34 0c 1b |-.,....  ....4..|
00002150: 31 00 06 00 00 00 00 00 00 e0 3f 06 9a 99 99 99 |1.........?.....|
00002160: 99 99 c9 3f 06 00 00 00 00 00 00 e0 3f 0c 43 06 |...?........?.C.|
00002170: 01 00 00 00 00 00 00 00 01 00 29 c8 03 03 8b 02 |..........).....|
00002180: 10 00 0c 43 06 01 00 02 00 02 00 00 00 01 02 aa |...C............|
00002190: 05 00 01 00 a0 05 00 01 00 29 c8 03 03 8d 02 0e |.........)......|
000021a0: 00 0c 43 06 01 00 01 00 01 02 00 00 17 01 ac 05 |..C.............|
000021b0: 00 01 00 d3 b9 9e db b6 a5 ec 05 d3 b9 9f d7 d3 |................|
000021c0: b8 a8 ec 05 d3 b9 a0 d7 d3 28 c8 03 1b 8f 02 0c |.........(......|
000021d0: 03 00 0c 04 0d 04 07 03 12 03 0c 04 0d 03 0c 04 |................|
000021e0: 12 03 0c 04 0d 02 07 0d 00 0c 43 06 01 00 00 01 |..........C.....|
000021f0: 00 02 00 00 2f 01 10 00 01 00 08 cb 04 57 01 00 |..../........W..|
00002200: 00 c7 42 15 01 00 00 9f 04 58 01 00 00 9f c7 42 |..B......X.....B|
00002210: 16 01 00 00 9f 04 59 01 00 00 9f c7 42 19 01 00 |......Y.....B...|
00002220: 00 9f 04 4c 01 00 00 9f 28 c8 03 18 97 02 0e 2b |...L....(......+|
00002230: 34 1b 0b 20 1a 0c 34 1b 0b 20 28 0c 30 1b 0b 20 |4.. ..4.. (.0.. |
00002240: 24 07 e5 01 00 0c 43 06 01 00 05 01 05 02 00 00 |$.....C.........|
00002250: 28 06 80 04 00 01 00 ae 04 00 01 00 b0 04 00 01 |(...............|
00002260: 00 ac 04 00 01 00 aa 04 00 01 00 10 00 01 00 08 |................|
00002270: cb c7 d3 44 00 01 00 00 c7 d4 44 17 01 00 00 c7 |...D......D.....|
00002280: d6 44 16 01 00 00 c7 5d 04 00 44 15 01 00 00 c7 |.D.....]..D.....|
00002290: 09 44 19 01 00 00 29 c8 03 17 a2 02 10 0d 0f 07 |.D....).........|
000022a0: 1a 21 19 07 24 21 23 07 28 21 27 07 1a 2b 19 07 |.!..$!#.(!'..+..|
000022b0: 08 00 0c 43 06 01 00 02 01 02 01 00 00 09 03 aa |...C............|
000022c0: 05 00 01 00 a0 05 00 01 00 10 00 01 00 08 cb c7 |................|
000022d0: 42 00 01 00 00 28 c8 03 07 a9 02 0e 12 0a 1b 15 |B....(..........|
000022e0: 00 0c 43 06 01 00 00 01 00 02 00 00 2f 01 10 00 |..C........./...|
000022f0: 01 00 08 cb 04 5a 01 00 00 c7 42 15 01 00 00 9f |.....Z....B.....|
00002300: 04 58 01 00 00 9f c7 42 16 01 00 00 9f 04 59 01 |.X.....B......Y.|
00002310: 00 00 9f c7 42 19 01 00 00 9f 04 4c 01 00 00 9f |....B......L....|
00002320: 28 c8 03 18 ac 02 0e 2b 3e 1b 0b 20 1a 0c 34 1b |(......+>.. ..4.|
00002330: 0b 20 28 0c 30 1b 0b 20 24 07 ef 01 00 06 00 00 |. (.0.. $.......|
00002340: 00 00 00 00 e0 3f 0c 43 06 01 00 06 01 06 02 00 |.....?.C........|
00002350: 00 38 07 bc 04 00 01 00 be 04 00 01 00 ae 04 00 |.8..............|
00002360: 01 00 ac 04 00 01 00 aa 04 00 01 00 c0 04 00 01 |................|
00002370: 00 10 00 01 00 08 cb c7 d3 44 1e 01 00 00 c7 d4 |.........D......|
00002380: 44 1f 01 00 00 c7 d5 44 17 01 00 00 c7 d6 44 16 |D......D......D.|
00002390: 01 00 00 c7 5d 04 00 44 15 01 00 00 c7 5d 05 00 |....]..D.....]..|
000023a0: 44 20 01 00 00 c7 0a 44 19 01 00 00 29 c8 03 1f |D .....D....)...|
000023b0: ba 02 10 0d 0f 07 22 21 21 07 20 21 1f 07 24 21 |......"!!. !..$!|
000023c0: 23 07 28 21 27 07 1a 2b 19 07 1e 2b 1d 07 08 00 |#.(!'..+...+....|
000023d0: 0c 43 06 01 00 02 02 02 05 00 00 38 04 aa 05 00 |.C.........8....|
000023e0: 01 00 a0 05 00 01 00 ac 05 00 00 00 10 00 01 00 |................|
000023f0: 08 cc c8 43 1b 01 00 00 d3 c8 42 20 01 00 00 9c |...C......B ....|
00002400: 24 01 00 c8 43 1b 01 00 00 d4 c8 42 20 01 00 00 |$...C......B ...|
00002410: 9c 24 01 00 9c cf b7 a5 ec 08 c8 42 1e 01 00 00 |.$.........B....|
00002420: 28 c8 42 1f 01 00 00 28 c8 03 25 c3 02 0e 12 0c |(.B....(..%.....|
00002430: 1b 10 0c 10 1b 0b 07 05 16 32 1b 10 0c 10 1b 0b |.........2......|
00002440: 07 05 11 19 08 43 0c 04 17 12 1b 15 0e 16 1b 15 |.....C..........|
00002450: 00 0c 43 06 01 00 00 01 00 02 00 00 2f 01 10 00 |..C........./...|
00002460: 01 00 08 cb 04 5b 01 00 00 c7 42 15 01 00 00 9f |.....[....B.....|
00002470: 04 58 01 00 00 9f c7 42 16 01 00 00 9f 04 59 01 |.X.....B......Y.|
00002480: 00 00 9f c7 42 19 01 00 00 9f 04 4c 01 00 00 9f |....B......L....|
00002490: 28 c8 03 18 ca 02 0e 2b 3e 1b 0b 20 1a 0c 34 1b |(......+>.. ..4.|
000024a0: 0b 20 28 0c 30 1b 0b 20 24 07 ef 01 00 0c 43 06 |. (.0.. $.....C.|
000024b0: 01 00 03 01 03 02 00 00 18 04 94 05 00 01 00 b8 |................|
000024c0: 05 00 01 00 ba 05 00 01 00 10 00 01 00 08 cb c7 |................|
000024d0: d4 44 5c 01 00 00 c7 d3 44 ff 00 00 00 c7 d5 44 |.D\.....D......D|
000024e0: 5d 01 00 00 29 c8 03 0f d7 02 10 0d 0f 07 1c 21 |]...)..........!|
000024f0: 1b 07 20 21 1f 07 20 00 0c 43 06 01 00 01 06 01 |.. !.. ..C......|
00002500: 08 01 00 b4 02 07 bc 05 00 01 00 be 05 00 00 00 |................|
00002510: c0 05 00 01 00 c2 05 00 02 00 c4 05 00 03 00 c6 |................|
00002520: 05 00 04 00 10 00 01 00 d6 03 05 00 08 c5 05 df |................|
00002530: 42 ef 00 00 00 42 26 01 00 00 11 21 00 00 cf c4 |B....B&....!....|
00002540: 05 44 29 01 00 00 df 42 ef 00 00 00 42 02 01 00 |.D)....B....B...|
00002550: 00 42 3d 00 00 00 43 f6 00 00 00 d3 42 ff 00 00 |.B=...C.....B...|
00002560: 00 c4 05 42 ff 00 00 00 24 02 00 d0 43 0a 01 00 |...B....$...C...|
00002570: 00 d3 42 0d 01 00 00 24 01 00 cd c8 43 0a 01 00 |..B....$....C...|
00002580: 00 c8 24 01 00 c4 05 42 5c 01 00 00 c4 05 42 5c |..$....B\.....B\|
00002590: 01 00 00 9c a0 ce c9 c9 9c ca a0 c6 04 b7 a7 6c |...............l|
000025a0: b7 00 00 00 c7 0a 44 27 01 00 00 c7 c9 8e 39 a5 |......D'......9.|
000025b0: 00 00 00 43 4f 01 00 00 c4 04 24 01 00 a0 44 fb |...CO.....$...D.|
000025c0: 00 00 00 c7 df 42 ef 00 00 00 42 02 01 00 00 42 |.....B....B....B|
000025d0: 3d 00 00 00 43 6a 00 00 00 d3 42 ff 00 00 00 df |=...Cj....B.....|
000025e0: 42 ef 00 00 00 42 02 01 00 00 42 3d 00 00 00 43 |B....B....B=...C|
000025f0: f8 00 00 00 d3 42 0d 01 00 00 c7 42 fb 00 00 00 |.....B.....B....|
00002600: 24 02 00 24 02 00 44 ff 00 00 00 c7 df 42 ef 00 |$..$..D......B..|
00002610: 00 00 42 02 01 00 00 42 3d 00 00 00 43 f6 00 00 |..B....B=...C...|
00002620: 00 c7 42 ff 00 00 00 c4 05 42 ff 00 00 00 24 02 |..B......B....$.|
00002630: 00 43 07 01 00 00 24 00 00 44 2a 01 00 00 c7 c4 |.C....$..D*.....|
00002640: 05 42 5d 01 00 00 43 1a 01 00 00 b7 b7 24 02 00 |.B]...C......$..|
00002650: 44 00 01 00 00 ee 08 c7 09 44 27 01 00 00 c7 28 |D........D'....(|
00002660: c8 03 ae 01 dc 02 0f 12 10 07 08 1b 14 20 22 12 |............. ".|
00002670: 5b 07 08 26 0c 07 08 1b 14 1b 0e 1b 14 1b 14 07 |[..&............|
00002680: 06 25 1e 1b 25 12 53 07 06 1b 0a 07 06 1b 07 17 |.%..%.S.........|
00002690: 0d 07 06 1b 0a 07 01 1b 1a 25 1c 1b 0b 07 1d 0d |.........%......|
000026a0: 17 07 08 07 03 07 0e 07 03 08 17 11 04 21 03 07 |.............!..|
000026b0: 08 21 07 07 24 07 01 07 0c 1b 08 1b 0c 0c 01 11 |.!..$...........|
000026c0: 15 21 29 07 20 07 08 1b 14 1b 0e 1b 14 1b 0a 07 |.!). ...........|
000026d0: 06 1b 16 07 08 1b 14 1b 0e 1b 14 1b 20 07 06 1b |............ ...|
000026e0: 18 07 08 1b 27 11 79 2b 65 07 1c 07 08 1b 14 1b |....'.y+e.......|
000026f0: 0e 1b 14 1b 14 07 08 25 1e 1b 27 11 3c 1b 14 2b |.......%..'.<..+|
00002700: bb 01 07 08 0c 1a 1b 12 25 12 37 45 07 08 22 01 |........%.7E..".|
00002710: 07 0d 00 0c 43 06 01 00 00 01 00 02 00 00 22 01 |....C.........".|
00002720: 10 00 01 00 08 cb 04 64 01 00 00 c7 42 ff 00 00 |.......d....B...|
00002730: 00 9f 04 65 01 00 00 9f c7 42 5c 01 00 00 9f 04 |...e.....B\.....|
00002740: 4c 01 00 00 9f 28 c8 03 12 ef 02 0e 2b 36 1b 0b |L....(......+6..|
00002750: 20 20 0c 28 1b 0b 20 1c 07 8d 01 00 0c 43 06 01 |  .(.. ......C..|
00002760: 00 03 01 03 02 00 00 18 04 94 05 00 01 00 ca 04 |................|
00002770: 00 01 00 ba 05 00 01 00 10 00 01 00 08 cb c7 d3 |................|
00002780: 44 ff 00 00 00 c7 d4 44 25 01 00 00 c7 d5 44 5d |D......D%.....D]|
00002790: 01 00 00 29 c8 03 0f fd 02 10 0d 0f 07 20 21 1f |...)......... !.|
000027a0: 07 12 21 11 07 20 00 0c 43 06 01 00 01 08 01 08 |..!.. ..C.......|
000027b0: 01 00 ea 02 09 bc 05 00 01 00 be 05 00 00 00 cc |................|
000027c0: 05 00 01 00 ac 05 00 02 00 ce 05 00 03 00 d0 05 |................|
000027d0: 00 04 00 aa 05 00 05 00 a0 05 00 06 00 10 00 01 |................|
000027e0: 00 d6 03 05 00 08 c5 07 df 42 ef 00 00 00 42 26 |.........B....B&|
000027f0: 01 00 00 11 21 00 00 cb c4 07 42 ff 00 00 00 43 |....!.....B....C|
00002800: 0a 01 00 00 d3 42 0d 01 00 00 24 01 00 d0 b7 ab |.....B....$.....|
00002810: ec 03 c7 28 c4 07 42 ff 00 00 00 43 0a 01 00 00 |...(..B....C....|
00002820: d3 42 ff 00 00 00 24 01 00 c4 07 42 25 01 00 00 |.B....$....B%...|
00002830: 9f 8e c8 9d d1 b7 a6 ec 03 c7 28 c7 c4 07 44 29 |..........(...D)|
00002840: 01 00 00 c7 0a 44 27 01 00 00 c7 df 42 ef 00 00 |.....D'.....B...|
00002850: 00 42 02 01 00 00 42 3d 00 00 00 43 6a 00 00 00 |.B....B=...Cj...|
00002860: d3 42 ff 00 00 00 df 42 ef 00 00 00 42 02 01 00 |.B.....B....B...|
00002870: 00 42 3d 00 00 00 43 f8 00 00 00 d3 42 0d 01 00 |.B=...C.....B...|
00002880: 00 c9 24 02 00 24 02 00 44 ff 00 00 00 c7 c4 07 |..$..$..D.......|
00002890: 42 ff 00 00 00 44 2a 01 00 00 c7 c9 44 fb 00 00 |B....D*.....D...|
000028a0: 00 c4 07 42 5d 01 00 00 42 19 01 00 00 6c 88 00 |...B]...B....l..|
000028b0: 00 00 df 42 ef 00 00 00 42 02 01 00 00 11 c4 07 |...B....B.......|
000028c0: 42 ff 00 00 00 42 04 01 00 00 c4 07 42 ff 00 00 |B....B......B...|
000028d0: 00 42 05 01 00 00 c4 07 42 ff 00 00 00 42 03 01 |.B......B....B..|
000028e0: 00 00 8e 21 03 00 d2 43 09 01 00 00 c4 07 42 ff |...!...C......B.|
000028f0: 00 00 00 24 01 00 c5 04 c7 42 ff 00 00 00 43 0a |...$.....B....C.|
00002900: 01 00 00 ca 24 01 00 c5 05 c7 42 ff 00 00 00 43 |....$.....B....C|
00002910: 0a 01 00 00 c4 04 24 01 00 c5 06 c7 c4 07 42 5d |......$.......B]|
00002920: 01 00 00 43 1a 01 00 00 c4 05 c4 06 24 02 00 44 |...C........$..D|
00002930: 00 01 00 00 ee 18 c7 c4 07 42 5d 01 00 00 43 1a |.........B]...C.|
00002940: 01 00 00 b7 b7 24 02 00 44 00 01 00 00 c7 28 c8 |.....$..D.....(.|
00002950: 03 c1 01 82 03 0f 12 10 07 08 1b 14 20 22 21 41 |............ "!A|
00002960: 1b 12 1b 0a 07 06 1b 07 12 2b 0c 06 12 08 07 0d |.........+......|
00002970: 12 14 1b 12 1b 0a 07 06 1b 07 1b 2a 1b 0b 07 43 |...........*...C|
00002980: 07 5c 07 03 08 5f 0c 04 12 0a 07 0d 08 07 07 08 |.\..._..........|
00002990: 26 07 07 08 21 07 07 20 07 08 1b 14 1b 0e 1b 14 |&...!.. ........|
000029a0: 1b 0a 07 06 1b 16 07 08 1b 14 1b 0e 1b 14 1b 20 |............... |
000029b0: 07 06 1b 18 07 1f 11 79 2b 65 07 08 0c 1c 35 23 |.......y+e....5#|
000029c0: 07 20 2b 0f 1b 12 35 00 07 08 1b 14 2a 18 1b 12 |. +...5.....*...|
000029d0: 25 10 1b 12 25 12 1b 12 1b 1b 07 45 12 31 07 04 |%...%......E.1..|
000029e0: 25 16 1b 09 1c 11 07 08 1b 12 1b 0a 07 01 1c 21 |%..............!|
000029f0: 07 08 1b 12 1b 0a 0c 01 1c 31 07 08 0c 1a 1b 12 |.........1......|
00002a00: 1b 14 0c 06 0c 07 37 45 07 08 0c 1a 1b 12 25 12 |......7E......%.|
00002a10: 2c 3f 07 0d 00 0c 43 06 01 00 00 01 00 02 00 00 |,?....C.........|
00002a20: 22 01 10 00 01 00 08 cb 04 69 01 00 00 c7 42 ff |"........i....B.|
00002a30: 00 00 00 9f 04 6a 01 00 00 9f c7 42 25 01 00 00 |.....j.....B%...|
00002a40: 9f 04 4c 01 00 00 9f 28 c8 03 11 9b 03 0e 2b 22 |..L....(......+"|
00002a50: 1b 0b 20 20 0c 1e 1b 0b 20 12 07 65 00 0c 43 06 |..  .... ..e..C.|
00002a60: 01 00 00 01 00 06 01 00 1b 01 10 00 01 00 d6 03 |................|
00002a70: 05 00 08 cb c7 df 42 ef 00 00 00 42 f0 00 00 00 |......B....B....|
00002a80: 11 b7 b7 b7 21 03 00 44 00 01 00 00 29 c8 03 0d |....!..D....)...|
00002a90: ad 03 10 0d 0f 07 22 07 08 1b 14 2f 0c 00 0c 43 |......"..../...C|
00002aa0: 06 01 00 00 01 00 02 00 00 15 01 10 00 01 00 08 |................|
00002ab0: cb 04 6b 01 00 00 c7 42 ff 00 00 00 9f 04 4c 01 |..k....B......L.|
00002ac0: 00 00 9f 28 c8 03 0b b0 03 0e 2b 30 1b 0b 20 20 |...(......+0..  |
00002ad0: 07 4f 00 0c 43 06 01 00 03 01 03 05 01 00 5f 04 |.O..C........._.|
00002ae0: 94 05 00 01 00 d8 04 00 01 00 dc 04 00 01 00 10 |................|
00002af0: 00 01 00 d6 03 05 00 08 cb c7 d3 44 ff 00 00 00 |...........D....|
00002b00: c7 d4 44 2c 01 00 00 c7 d5 44 2e 01 00 00 c7 d4 |..D,.....D......|
00002b10: 43 07 01 00 00 24 00 00 43 09 01 00 00 c7 42 2e |C....$..C.....B.|
00002b20: 01 00 00 24 01 00 44 2d 01 00 00 c7 df 42 ef 00 |...$..D-.....B..|
00002b30: 00 00 42 02 01 00 00 42 3d 00 00 00 43 6a 00 00 |..B....B=...Cj..|
00002b40: 00 c7 42 ff 00 00 00 c7 42 2c 01 00 00 24 02 00 |..B.....B,...$..|
00002b50: 44 2f 01 00 00 29 c8 03 2f c0 03 10 0d 0f 07 20 |D/...)../...... |
00002b60: 21 1f 07 1c 21 1b 07 14 21 13 07 1e 07 0c 1b 14 |!...!...!.......|
00002b70: 11 04 20 16 1b 09 2b 4d 07 1c 07 08 1b 14 1b 0e |.. ...+M........|
00002b80: 1b 14 20 12 20 1e 1b 27 00 0c 43 06 01 00 02 04 |.. . ..'..C.....|
00002b90: 02 0a 01 00 bf 01 06 d8 05 00 01 00 da 05 00 01 |................|
00002ba0: 00 94 05 00 00 00 a6 05 00 01 00 bc 05 00 02 00 |................|
00002bb0: 10 00 01 00 d6 03 05 00 08 ce df 42 ef 00 00 00 |...........B....|
00002bc0: 42 02 01 00 00 42 3d 00 00 00 43 f6 00 00 00 ca |B....B=...C.....|
00002bd0: 42 2f 01 00 00 df 42 ef 00 00 00 42 02 01 00 00 |B/....B....B....|
00002be0: 42 3d 00 00 00 43 f6 00 00 00 df 42 ef 00 00 00 |B=...C.....B....|
00002bf0: 42 02 01 00 00 42 3d 00 00 00 43 f8 00 00 00 ca |B....B=...C.....|
00002c00: 42 2d 01 00 00 d3 24 02 00 df 42 ef 00 00 00 42 |B-....$...B....B|
00002c10: 02 01 00 00 42 3d 00 00 00 43 f8 00 00 00 ca 42 |....B=...C.....B|
00002c20: 2e 01 00 00 d4 24 02 00 24 02 00 24 02 00 cf c7 |.....$..$..$....|
00002c30: 42 04 01 00 00 b6 9c 44 04 01 00 00 df 42 ef 00 |B......D.....B..|
00002c40: 00 00 42 02 01 00 00 42 3d 00 00 00 43 f6 00 00 |..B....B=...C...|
00002c50: 00 c7 ca 42 ff 00 00 00 24 02 00 cc df 42 ef 00 |...B....$....B..|
00002c60: 00 00 42 0c 01 00 00 11 c7 c8 43 07 01 00 00 24 |..B.......C....$|
00002c70: 00 00 21 02 00 d1 28 c8 03 6c c7 03 0c 0d 0c 07 |..!...(..l......|
00002c80: 08 1b 14 1b 0e 1b 14 20 1c 1b 12 07 08 1b 14 1b |....... ........|
00002c90: 0e 1b 14 1b 14 07 08 1b 14 1b 0e 1b 14 20 28 1b |............. (.|
00002ca0: 14 07 1d 11 28 07 08 1b 14 1b 0e 1b 14 20 28 1b |....(........ (.|
00002cb0: 0a 07 13 11 e1 01 11 6b 12 63 07 10 07 06 1b 0a |.......k.c......|
00002cc0: 07 03 21 07 07 08 1b 14 1b 0e 1b 14 1b 14 0c 12 |..!.............|
00002cd0: 1b 13 17 47 07 08 1b 14 20 0a 07 0a 07 06 1b 14 |...G.... .......|
00002ce0: 11 25 12 31 07 0d 00 0c 43 06 01 00 00 00 00 01 |.%.1....C.......|
00002cf0: 00 00 06 00 04 6e 01 00 00 28 c8 03 05 ce 03 0e |.....n...(......|
00002d00: 1c 0b 00 0c 43 06 01 00 02 01 02 02 00 00 11 03 |....C...........|
00002d10: 80 04 00 01 00 e4 04 00 01 00 10 00 01 00 08 cb |................|
00002d20: c7 d3 44 00 01 00 00 c7 d4 44 32 01 00 00 29 c8 |..D......D2...).|
00002d30: 03 0b db 03 10 0d 0f 07 1a 21 19 07 20 00 0c 43 |.........!.. ..C|
00002d40: 06 01 00 01 01 01 06 00 00 8d 01 02 de 05 00 01 |................|
00002d50: 00 10 00 01 00 08 cb c7 39 9d 00 00 00 43 ee 00 |........9....C..|
00002d60: 00 00 0b bf 64 4e 70 01 00 00 bf 64 4e 71 01 00 |....dNp....dNq..|
00002d70: 00 b9 4e 72 01 00 00 b9 4e 73 01 00 00 09 4e 74 |..Nr....Ns....Nt|
00002d80: 01 00 00 09 4e 75 01 00 00 09 4e 76 01 00 00 09 |....Nu....Nv....|
00002d90: 4e 77 01 00 00 b9 4e 78 01 00 00 d3 11 ed 03 0e |Nw....Nx........|
00002da0: 0b 24 02 00 44 6f 01 00 00 c7 42 6f 01 00 00 43 |.$..Do....Bo...C|
00002db0: 70 01 00 00 c7 42 6f 01 00 00 42 73 01 00 00 9d |p....Bo...Bs....|
00002dc0: 44 70 01 00 00 c7 42 6f 01 00 00 43 71 01 00 00 |Dp....Bo...Cq...|
00002dd0: c7 42 6f 01 00 00 42 72 01 00 00 9d 44 71 01 00 |.Bo...Br....Dq..|
00002de0: 00 29 c8 03 2b e8 03 10 0d 0f 07 1e 1b 0c 00 3e |.)..+..........>|
00002df0: 14 23 00 06 13 32 00 08 16 37 07 08 1b 10 20 2a |.#...2...7.... *|
00002e00: 1b 10 1b 1d 21 33 07 08 1b 10 20 28 1b 10 1b 1d |....!3.... (....|
00002e10: 00 0c 43 06 01 00 03 03 03 06 01 00 60 06 86 04 |..C.........`...|
00002e20: 00 01 00 88 04 00 01 00 80 04 00 01 00 f2 05 00 |................|
00002e30: 00 00 f4 05 00 01 00 10 00 01 00 d2 03 03 00 08 |................|
00002e40: cd c9 42 6f 01 00 00 42 72 01 00 00 cb c9 42 6f |..Bo...Br.....Bo|
00002e50: 01 00 00 42 73 01 00 00 cc c9 42 34 01 00 00 ec |...Bs.....B4....|
00002e60: 2d c9 42 34 01 00 00 d5 43 39 00 00 00 24 00 00 |-.B4....C9...$..|
00002e70: 44 7b 01 00 00 c9 42 34 01 00 00 43 7c 01 00 00 |D{....B4...C|...|
00002e80: d3 c7 9c d4 c8 9c c7 c8 24 04 00 0e 29 d3 d4 ad |........$...)...|
00002e90: ec 0d df d5 43 fd 00 00 00 24 00 00 9f e3 29 c8 |....C....$....).|
00002ea0: 03 43 f8 03 0e 0e 0b 07 14 1b 10 21 23 07 14 1b |.C.........!#...|
00002eb0: 10 26 13 26 07 07 08 1b 28 07 0a 1b 12 2b 4b 07 |.&.&....(....+K.|
00002ec0: 08 1b 0e 1b 14 07 08 07 03 07 0e 07 08 07 03 07 |................|
00002ed0: 0e 07 0a 07 2f 1e 1f 07 0c 07 07 12 03 07 1e 07 |..../...........|
00002ee0: 0a 1b 16 11 25 00 0c 43 06 01 00 02 09 02 05 01 |....%..C........|
00002ef0: 00 b6 01 0b fa 05 00 01 00 e8 04 00 01 00 e0 05 |................|
00002f00: 00 00 00 e2 05 00 01 00 88 04 00 02 00 86 04 00 |................|
00002f10: 03 00 fc 05 00 04 00 fe 05 00 05 00 bc 05 00 06 |................|
00002f20: 00 80 04 00 07 00 10 00 01 00 d2 03 03 00 08 c5 |................|
00002f30: 08 b7 e3 d4 ec 18 c4 08 d4 43 80 01 00 00 04 81 |.........C......|
00002f40: 01 00 00 24 01 00 44 34 01 00 00 ee 09 c4 08 07 |...$..D4........|
00002f50: 44 34 01 00 00 c4 08 42 6f 01 00 00 42 70 01 00 |D4.....Bo...Bp..|
00002f60: 00 cb c4 08 42 6f 01 00 00 42 71 01 00 00 cc b7 |....Bo...Bq.....|
00002f70: cd c9 c7 a5 ec 58 b7 ce ca c8 a5 ec 4d c9 b8 9c |.....X......M...|
00002f80: c7 9d b9 9c b8 a0 c5 04 ca b8 9c c8 9d b9 9c b8 |................|
00002f90: a0 c5 05 d3 42 0f 01 00 00 43 30 01 00 00 c4 05 |....B....C0.....|
00002fa0: c4 04 24 02 00 c5 06 c4 08 43 36 01 00 00 c4 06 |..$......C6.....|
00002fb0: d3 24 02 00 c5 07 c4 08 43 35 01 00 00 ca c9 c4 |.$......C5......|
00002fc0: 07 24 03 00 0e 95 03 ee b0 95 02 ee a5 df c0 11 |.$..............|
00002fd0: 09 ae ec 10 39 9f 00 00 00 11 04 82 01 00 00 21 |....9..........!|
00002fe0: 01 00 30 29 c8 03 71 87 04 11 12 11 0e 08 12 00 |..0)..q.........|
00002ff0: 0c 1c 07 0c 34 16 37 3d 0c 08 2c 1e 1b 10 2b 11 |....4.7=..,...+.|
00003000: 1b 10 2b 1b 07 08 07 03 1c 04 07 08 07 03 12 09 |..+.............|
00003010: 0c 04 07 10 07 03 0c 1e 0c 08 12 35 0c 04 07 10 |...........5....|
00003020: 07 03 0c 1c 0c 08 12 31 07 0a 1b 0e 1b 10 0c 08 |.......1........|
00003030: 0c 09 26 19 1b 1e 0c 0a 07 0b 1c 3b 0c 08 1b 14 |..&........;....|
00003040: 07 06 07 06 0c 0d 00 04 09 22 15 05 00 04 12 3d |.........".....=|
00003050: 16 18 12 03 39 0a 11 1d 00 0c 43 06 01 00 02 03 |....9.....C.....|
00003060: 02 06 00 00 31 05 bc 05 00 01 00 fa 05 00 01 00 |....1...........|
00003070: be 05 00 00 00 80 04 00 01 00 10 00 01 00 08 cd |................|
00003080: c9 43 37 01 00 00 d3 d4 07 24 03 00 cf 42 27 01 |.C7......$...B'.|
00003090: 00 00 ec 10 c9 43 39 01 00 00 c7 d3 d4 b7 24 04 |.....C9.......$.|
000030a0: 00 d0 28 d4 42 12 01 00 00 42 00 01 00 00 28 c8 |..(.B....B....(.|
000030b0: 03 25 9f 04 13 12 08 1b 24 07 0a 0c 0b 12 37 07 |.%......$.....7.|
000030c0: 08 2b 18 1b 14 07 0c 07 0a 0c 17 12 23 07 0d 09 |.+..........#...|
000030d0: 06 07 0a 1b 16 1b 2d 00 0c 43 06 01 00 03 05 03 |......-..C......|
000030e0: 03 01 00 74 08 bc 05 00 01 00 fa 05 00 01 00 86 |...t............|
000030f0: 06 00 01 00 88 06 00 00 00 8a 06 00 01 00 8c 06 |................|
00003100: 00 02 00 d2 04 00 03 00 be 05 00 04 00 d6 03 05 |................|
00003110: 00 b7 cb df 42 ef 00 00 00 42 26 01 00 00 11 21 |....B....B&....!|
00003120: 00 00 d0 c0 d0 07 44 fb 00 00 00 b7 cd c9 d4 42 |......D........B|
00003130: 10 01 00 00 eb a5 ec 45 d4 42 10 01 00 00 c9 48 |.......E.B.....H|
00003140: d2 d5 ac ec 34 ca 43 23 01 00 00 d3 24 01 00 c6 |....4.C#....$...|
00003150: 04 42 27 01 00 00 ec 21 c4 04 42 fb 00 00 00 b7 |.B'....!..B.....|
00003160: a8 ec 16 c4 04 42 fb 00 00 00 c8 42 fb 00 00 00 |.....B.....B....|
00003170: a5 ec 06 c4 04 cc 95 00 95 02 ee b2 c8 c7 44 28 |..............D(|
00003180: 01 00 00 c8 28 c8 03 55 a7 04 16 0e 02 07 08 1b |....(..U........|
00003190: 14 20 22 12 5b 07 08 35 18 07 08 07 0a 1b 0e 07 |. ".[..5........|
000031a0: 1b 12 03 07 0a 1b 10 07 01 08 27 07 12 07 05 12 |..........'.....|
000031b0: 0a 07 0a 1b 16 07 01 12 2b 0c 08 25 14 0c 08 20 |........+..%... |
000031c0: 14 11 10 0c 08 1b 18 07 08 1b 0b 12 55 12 05 00 |............U...|
000031d0: 02 0b 34 00 04 14 53 07 20 21 11 07 0d 00 0c 43 |..4...S. !.....C|
000031e0: 06 01 00 03 02 03 07 01 00 54 05 8e 06 00 01 00 |.........T......|
000031f0: 90 06 00 01 00 92 06 00 01 00 fe 04 00 00 00 94 |................|
00003200: 06 00 01 00 d6 03 05 00 d4 43 0a 01 00 00 d5 24 |.........C.....$|
00003210: 01 00 8e cb df 42 ef 00 00 00 42 02 01 00 00 42 |.....B....B....B|
00003220: 3d 00 00 00 43 6a 00 00 00 df 42 ef 00 00 00 42 |=...Cj....B....B|
00003230: 02 01 00 00 42 3d 00 00 00 43 f8 00 00 00 d4 b9 |....B=...C......|
00003240: c7 9c 24 02 00 d5 24 02 00 cc df 42 ef 00 00 00 |..$...$....B....|
00003250: 42 0c 01 00 00 11 d3 c8 21 02 00 28 c8 03 3b b8 |B.......!..(..;.|
00003260: 04 16 03 07 07 02 1b 0a 07 01 11 0b 0d 00 07 08 |................|
00003270: 1b 14 1b 0e 1b 14 1b 0a 07 08 1b 14 1b 0e 1b 14 |................|
00003280: 1b 20 0c 0e 07 03 07 0b 11 1a 07 77 17 41 07 08 |. .........w.A..|
00003290: 1b 14 20 0a 07 06 07 07 11 39 00 0c 43 06 01 00 |.. ......9..C...|
000032a0: 04 12 04 0a 01 03 fb 07 16 be 05 00 01 00 bc 05 |................|
000032b0: 00 01 00 fa 05 00 01 00 96 06 00 01 00 80 04 00 |................|
000032c0: 00 00 98 06 00 01 00 9a 06 00 02 00 8c 06 00 03 |................|
000032d0: 00 9c 06 00 04 00 a0 05 00 05 00 9e 06 00 06 00 |................|
000032e0: a0 06 00 07 00 a2 06 00 08 00 a4 06 00 09 00 a6 |................|
000032f0: 06 00 0a 00 a8 06 00 0b 00 aa 06 00 0c 00 ac 06 |................|
00003300: 00 0d 00 ae 06 00 0e 00 b0 06 00 0f 00 b2 06 00 |................|
00003310: 10 00 10 00 01 00 d6 03 05 00 08 c5 11 df 42 ef |..............B.|
00003320: 00 00 00 42 f0 00 00 00 42 3d 00 00 00 43 f8 00 |...B....B=...C..|
00003330: 00 00 d3 42 00 01 00 00 d5 42 12 01 00 00 42 32 |...B.....B....B2|
00003340: 01 00 00 24 02 00 cf cc 39 a5 00 00 00 43 9a 01 |...$....9....C..|
00003350: 00 00 bf 0a d3 42 29 01 00 00 42 5d 01 00 00 42 |.....B)...B]...B|
00003360: 15 01 00 00 b8 9f 24 02 00 cd b7 ce ca d5 42 11 |......$.......B.|
00003370: 01 00 00 eb a5 6c 93 03 00 00 d5 42 11 01 00 00 |.....l.....B....|
00003380: ca 48 c5 04 df 42 ef 00 00 00 42 02 01 00 00 42 |.H...B....B....B|
00003390: 3d 00 00 00 43 f6 00 00 00 c4 04 42 ff 00 00 00 |=...C......B....|
000033a0: d3 42 ff 00 00 00 24 02 00 43 07 01 00 00 24 00 |.B....$..C....$.|
000033b0: 00 c5 05 c4 11 42 6f 01 00 00 42 74 01 00 00 ec |.....Bo...Bt....|
000033c0: 70 c4 05 43 0a 01 00 00 d3 42 2a 01 00 00 24 01 |p..C.....B*...$.|
000033d0: 00 c6 06 b7 a7 ec 5a df 42 ef 00 00 00 42 f0 00 |......Z.B....B..|
000033e0: 00 00 42 3d 00 00 00 43 6a 00 00 00 c7 df 42 ef |..B=...Cj.....B.|
000033f0: 00 00 00 42 f0 00 00 00 42 3d 00 00 00 43 f7 00 |...B....B=...C..|
00003400: 00 00 d3 42 00 01 00 00 df 42 ef 00 00 00 42 f0 |...B.....B....B.|
00003410: 00 00 00 42 3d 00 00 00 43 f8 00 00 00 c4 04 42 |...B=...C......B|
00003420: 00 01 00 00 c4 06 24 02 00 24 02 00 24 02 00 cb |......$..$..$...|
00003430: d6 c4 11 42 6f 01 00 00 42 78 01 00 00 a6 6c cf |...Bo...Bx....l.|
00003440: 00 00 00 c4 11 42 6f 01 00 00 42 77 01 00 00 6c |.....Bo...Bw...l|
00003450: be 00 00 00 d3 42 29 01 00 00 42 5d 01 00 00 42 |.....B)...B]...B|
00003460: 17 01 00 00 b7 a7 6c a7 00 00 00 c4 11 43 38 01 |......l......C8.|
00003470: 00 00 d3 42 ff 00 00 00 d3 42 2a 01 00 00 d4 42 |...B.....B*....B|
00003480: 0d 01 00 00 24 03 00 c5 07 c4 11 43 37 01 00 00 |....$......C7...|
00003490: c4 07 d5 d3 42 29 01 00 00 24 03 00 c6 08 42 27 |....B)...$....B'|
000034a0: 01 00 00 ec 27 c4 08 42 fb 00 00 00 b7 a7 ec 1c |....'..B........|
000034b0: c4 08 c4 11 43 39 01 00 00 c4 08 c4 07 d5 d6 b8 |....C9..........|
000034c0: 9f 24 04 00 44 00 01 00 00 ee 13 c4 08 d5 42 12 |.$..D.........B.|
000034d0: 01 00 00 42 00 01 00 00 44 00 01 00 00 df 42 ef |...B....D.....B.|
000034e0: 00 00 00 42 f0 00 00 00 42 3d 00 00 00 43 fc 00 |...B....B=...C..|
000034f0: 00 00 c7 c4 08 42 00 01 00 00 d3 42 29 01 00 00 |.....B.....B)...|
00003500: 42 5d 01 00 00 42 17 01 00 00 24 03 00 cb df 42 |B]...B....$....B|
00003510: ef 00 00 00 42 26 01 00 00 11 21 00 00 c5 09 c4 |....B&....!.....|
00003520: 11 42 6f 01 00 00 42 75 01 00 00 6c a8 00 00 00 |.Bo...Bu...l....|
00003530: df 42 ef 00 00 00 42 0c 01 00 00 11 d3 42 ff 00 |.B....B......B..|
00003540: 00 00 c4 05 21 02 00 c5 0a c4 11 43 37 01 00 00 |....!......C7...|
00003550: c4 0a d5 d3 42 29 01 00 00 24 03 00 c6 09 42 27 |....B)...$....B'|
00003560: 01 00 00 ec 70 c4 09 42 29 01 00 00 d3 42 29 01 |....p..B)....B).|
00003570: 00 00 ac ec 60 df 42 ef 00 00 00 42 f0 00 00 00 |....`.B....B....|
00003580: 42 3d 00 00 00 43 f8 00 00 00 c7 c1 00 24 02 00 |B=...C.......$..|
00003590: c5 0b c1 01 39 a5 00 00 00 43 9a 01 00 00 c4 09 |....9....C......|
000035a0: 42 29 01 00 00 42 5d 01 00 00 42 16 01 00 00 c1 |B)...B]...B.....|
000035b0: 02 24 02 00 9c c5 0c df 42 ef 00 00 00 42 f0 00 |.$......B....B..|
000035c0: 00 00 42 3d 00 00 00 43 f5 00 00 00 c4 0b c4 0c |..B=...C........|
000035d0: 24 02 00 cb c4 11 42 6f 01 00 00 42 76 01 00 00 |$.....Bo...Bv...|
000035e0: 6c 23 01 00 00 c4 09 42 27 01 00 00 98 6c 16 01 |l#.....B'....l..|
000035f0: 00 00 d3 42 29 01 00 00 42 5d 01 00 00 42 15 01 |...B)...B]...B..|
00003600: 00 00 b7 a7 6c ff 00 00 00 df 42 ef 00 00 00 42 |....l.....B....B|
00003610: 02 01 00 00 42 3d 00 00 00 43 f6 00 00 00 d3 42 |....B=...C.....B|
00003620: 29 01 00 00 42 ff 00 00 00 c4 04 42 ff 00 00 00 |)...B......B....|
00003630: 24 02 00 43 07 01 00 00 24 00 00 c5 0d df 42 ef |$..C....$.....B.|
00003640: 00 00 00 42 02 01 00 00 42 3d 00 00 00 43 f6 00 |...B....B=...C..|
00003650: 00 00 d5 42 0f 01 00 00 42 ff 00 00 00 d3 42 29 |...B....B.....B)|
00003660: 01 00 00 42 ff 00 00 00 24 02 00 43 07 01 00 00 |...B....$..C....|
00003670: 24 00 00 c5 0e df 42 ef 00 00 00 42 02 01 00 00 |$.....B....B....|
00003680: 42 3d 00 00 00 43 f6 00 00 00 c4 0e c4 0d 24 02 |B=...C........$.|
00003690: 00 43 07 01 00 00 24 00 00 c5 0f 39 a5 00 00 00 |.C....$....9....|
000036a0: 43 9a 01 00 00 39 a5 00 00 00 43 9b 01 00 00 d3 |C....9....C.....|
000036b0: 42 2a 01 00 00 43 0a 01 00 00 c4 0f 24 01 00 b7 |B*...C......$...|
000036c0: 24 02 00 c9 24 02 00 c5 10 df 42 ef 00 00 00 42 |$...$.....B....B|
000036d0: f0 00 00 00 42 3d 00 00 00 43 6a 00 00 00 df 42 |....B=...Cj....B|
000036e0: ef 00 00 00 42 f0 00 00 00 42 3d 00 00 00 43 f8 |....B....B=...C.|
000036f0: 00 00 00 c4 04 42 00 01 00 00 c4 10 24 02 00 c7 |.....B......$...|
00003700: 24 02 00 cb 95 03 ef 65 fc c7 43 fa 00 00 00 24 |$......e..C....$|
00003710: 00 00 0e c7 28 c8 03 98 04 bd 04 0e 13 0c 07 08 |....(...........|
00003720: 1b 14 1b 0c 1b 14 1b 20 07 08 1b 10 07 0a 1b 16 |....... ........|
00003730: 1b 39 12 53 0d 02 1b 08 25 12 07 08 1b 0c 1b 12 |.9.S....%.......|
00003740: 20 0e 07 3d 21 0f 07 08 07 0a 1b 0e 07 1b 21 03 | ..=!.........!.|
00003750: 07 0a 1b 10 07 01 13 1f 07 08 1b 14 1b 0e 1b 14 |................|
00003760: 1b 14 0c 0a 1b 16 07 08 1b 29 11 3e 1b 14 26 a1 |.........).>..&.|
00003770: 01 1b 10 26 07 0c 02 1b 0a 07 08 1b 09 12 11 11 |...&............|
00003780: 04 12 0c 07 08 1b 14 1b 0c 1b 14 1b 0a 07 0e 07 |................|
00003790: 08 1b 14 1b 0c 1b 14 1b 14 07 08 1b 10 07 08 1b |................|
000037a0: 14 1b 0c 1b 14 1b 20 0c 0a 1b 10 0c 1b 11 73 11 |...... .......s.|
000037b0: 5d 00 04 0a 5b 11 1a 1b 10 1b 1d 2c 04 1b 10 34 |]...[......,...4|
000037c0: 2c 07 08 1b 0c 1b 12 20 18 2b 51 1b 24 07 08 1b |,...... .+Q.$...|
000037d0: 16 07 08 1b 12 07 06 1b 3f 26 33 1b 24 0c 1e 07 |........?&3.$...|
000037e0: 0e 07 08 1b 35 12 37 0c 08 25 14 0c 08 20 14 12 |....5.7..%... ..|
000037f0: 37 0c 08 0c 1a 1b 14 0c 0c 0c 1e 07 0e 0c 0c 07 |7...............|
00003800: 45 37 33 0c 1a 07 0a 1b 16 36 31 07 08 1b 14 1b |E73......61.....|
00003810: 0c 1b 14 1b 0e 07 0e 0c 08 1b 10 07 08 1b 0c 1b |................|
00003820: 12 1b 4d 00 04 0c 3d 07 08 1b 14 20 22 26 57 1b |..M...=.... "&W.|
00003830: 10 35 10 07 08 1b 14 20 0a 07 08 1b 16 0c 1f 1c |.5..... ........|
00003840: 4b 0c 22 1b 24 0c 16 07 0e 07 08 1b 2d 1c 27 25 |K.".$.......-.'%|
00003850: 14 0c 14 1b 14 07 08 1b 0d 12 37 07 08 1b 14 1b |..........7.....|
00003860: 0c 1b 14 1b 20 11 01 26 4b 1b 08 1b 0a 0c 14 1b |.... ..&K.......|
00003870: 0c 1b 12 25 33 11 13 12 0b 07 08 1b 14 1b 0c 1b |...%3...........|
00003880: 14 1b 16 0c 08 0c 09 00 06 08 5f 1b 10 34 2c 0c |.........._..4,.|
00003890: 14 39 14 07 08 1b 0c 1b 12 20 0e 21 8d 01 07 08 |.9....... .!....|
000038a0: 1b 14 1b 0e 1b 14 1b 14 07 08 1b 0c 1b 16 0c 0a |................|
000038b0: 1b 35 11 4a 1b 14 1c af 01 07 08 1b 14 1b 0e 1b |.5.J............|
000038c0: 14 1b 14 07 0a 1b 0e 1b 16 07 08 1b 0c 1b 43 11 |..............C.|
000038d0: 58 1b 14 1c bb 01 07 08 1b 14 1b 0e 1b 14 1b 14 |X...............|
000038e0: 0c 06 0c 07 11 0e 1b 14 1c 5d 1b 08 1b 0a 1b 08 |.........]......|
000038f0: 1b 0a 07 08 1b 0e 1b 0a 0c 01 16 1f 11 32 07 43 |.............2.C|
00003900: 1c 23 07 08 1b 14 1b 0c 1b 14 1b 0a 07 08 1b 14 |.#..............|
00003910: 1b 0c 1b 14 1b 20 0c 0a 1b 10 0c 1b 11 38 07 93 |..... .......8..|
00003920: 01 00 04 59 0f 00 05 60 53 07 0a 1b 0c 17 07 07 |...Y...`S.......|
00003930: 0d 00 06 00 00 00 00 00 00 e0 3f 06 00 00 00 00 |..........?.....|
00003940: 00 00 e0 3f 06 00 00 00 00 00 00 e0 3f 0c 43 06 |...?........?.C.|
00003950: 01 d8 03 00 0f 00 0c 01 1e 81 06 0f fa 05 00 00 |................|
00003960: 00 b8 06 00 01 00 ba 06 00 02 00 bc 06 00 03 00 |................|
00003970: 9c 06 00 04 00 be 06 00 05 00 c0 06 00 06 00 c2 |................|
00003980: 06 00 07 00 c4 06 00 08 00 e8 05 00 09 00 ea 05 |................|
00003990: 00 0a 00 ec 05 00 0b 00 ee 05 00 0c 00 f0 05 00 |................|
000039a0: 0d 00 c6 06 00 0e 00 d6 03 05 00 df 42 ef 00 00 |............B...|
000039b0: 00 42 0e 01 00 00 11 21 00 00 cf df 42 ef 00 00 |.B.....!....B...|
000039c0: 00 42 2b 01 00 00 11 df 42 ef 00 00 00 42 02 01 |.B+.....B....B..|
000039d0: 00 00 11 b7 b7 bf f1 21 03 00 df 42 ef 00 00 00 |.......!...B....|
000039e0: 42 02 01 00 00 11 c1 00 8e b7 bc 21 03 00 df 42 |B..........!...B|
000039f0: ef 00 00 00 42 02 01 00 00 11 b7 b8 b7 21 03 00 |....B........!..|
00003a00: 21 03 00 44 0f 01 00 00 c7 df 42 ef 00 00 00 42 |!..D......B....B|
00003a10: 31 01 00 00 11 df 42 ef 00 00 00 42 f0 00 00 00 |1.....B....B....|
00003a20: 11 c1 01 c1 02 c1 03 21 03 00 c1 04 21 02 00 44 |.......!....!..D|
00003a30: 12 01 00 00 df 42 ef 00 00 00 42 21 01 00 00 42 |.....B....B!...B|
00003a40: 22 01 00 00 11 df 42 ef 00 00 00 42 02 01 00 00 |".....B....B....|
00003a50: 11 c1 05 8e c1 06 b9 21 03 00 c1 07 df 42 ef 00 |.......!.....B..|
00003a60: 00 00 42 13 01 00 00 42 1c 01 00 00 11 df 42 ef |..B....B......B.|
00003a70: 00 00 00 42 f0 00 00 00 11 b7 c1 08 c1 09 21 03 |...B..........!.|
00003a80: 00 c1 0a b7 b7 b9 21 05 00 21 03 00 cc df 42 ef |......!..!....B.|
00003a90: 00 00 00 42 21 01 00 00 42 22 01 00 00 11 df 42 |...B!...B".....B|
00003aa0: ef 00 00 00 42 02 01 00 00 11 b8 c1 0b b8 21 03 |....B.........!.|
00003ab0: 00 c1 0c df 42 ef 00 00 00 42 13 01 00 00 42 1c |....B....B....B.|
00003ac0: 01 00 00 11 df 42 ef 00 00 00 42 f0 00 00 00 11 |.....B....B.....|
00003ad0: c1 0d c1 0e c1 0f 21 03 00 c1 10 b7 b7 c1 11 21 |......!........!|
00003ae0: 05 00 21 03 00 cd df 42 ef 00 00 00 42 21 01 00 |..!....B....B!..|
00003af0: 00 42 24 01 00 00 11 df 42 ef 00 00 00 42 02 01 |.B$.....B....B..|
00003b00: 00 00 11 c1 12 c1 13 c1 14 8e 21 03 00 43 07 01 |..........!..C..|
00003b10: 00 00 24 00 00 c1 15 df 42 ef 00 00 00 42 13 01 |..$.....B....B..|
00003b20: 00 00 42 1d 01 00 00 11 df 42 ef 00 00 00 42 f0 |..B......B....B.|
00003b30: 00 00 00 11 b8 b8 b8 21 03 00 df 42 ef 00 00 00 |.......!...B....|
00003b40: 42 f0 00 00 00 11 b7 b7 b7 21 03 00 c1 16 b7 b8 |B........!......|
00003b50: c1 17 21 06 00 21 03 00 ce c7 42 10 01 00 00 43 |..!..!....B....C|
00003b60: a4 01 00 00 ca 24 01 00 0e c7 42 10 01 00 00 43 |.....$....B....C|
00003b70: a4 01 00 00 c8 24 01 00 0e c7 42 10 01 00 00 43 |.....$....B....C|
00003b80: a4 01 00 00 c9 24 01 00 0e df 42 ef 00 00 00 42 |.....$....B....B|
00003b90: fe 00 00 00 11 df 42 ef 00 00 00 42 02 01 00 00 |......B....B....|
00003ba0: 11 bc bf 0a b6 21 03 00 df 42 ef 00 00 00 42 f0 |.....!...B....B.|
00003bb0: 00 00 00 11 c1 18 c1 19 c1 1a 21 03 00 21 02 00 |..........!..!..|
00003bc0: c5 04 df 42 ef 00 00 00 42 fe 00 00 00 11 df 42 |...B....B......B|
00003bd0: ef 00 00 00 42 02 01 00 00 11 bf fd bc bf f1 21 |....B..........!|
00003be0: 03 00 df 42 ef 00 00 00 42 f0 00 00 00 11 c1 1b |...B....B.......|
00003bf0: c1 1c c1 1d 21 03 00 bf 64 21 03 00 c5 05 c7 42 |....!...d!.....B|
00003c00: 11 01 00 00 43 a4 01 00 00 c4 04 24 01 00 0e c7 |....C......$....|
00003c10: 42 11 01 00 00 43 a4 01 00 00 c4 05 24 01 00 0e |B....C......$...|
00003c20: bf 64 c5 06 bf 64 c5 07 04 a5 01 00 00 43 5f 00 |.d...d.......C_.|
00003c30: 00 00 04 48 01 00 00 24 01 00 c5 08 0a c5 09 0a |...H...$........|
00003c40: c5 0a 0a c5 0b 0a c5 0c b9 c5 0d df 42 ef 00 00 |............B...|
00003c50: 00 42 33 01 00 00 11 0b c4 06 4e 71 01 00 00 c4 |.B3.......Nq....|
00003c60: 07 4e 70 01 00 00 c4 08 b7 48 4e 72 01 00 00 c4 |.Np......HNr....|
00003c70: 08 b8 48 4e 73 01 00 00 c4 09 4e 74 01 00 00 c4 |..HNs.....Nt....|
00003c80: 0b 4e 76 01 00 00 c4 0a 4e 75 01 00 00 c4 0c 4e |.Nv.....Nu.....N|
00003c90: 77 01 00 00 c4 0d 4e 78 01 00 00 21 01 00 c6 0e |w.....Nx...!....|
00003ca0: 43 ec 00 00 00 c7 07 b7 24 03 00 29 c8 03 db 02 |C.......$..)....|
00003cb0: f6 04 00 03 28 07 08 1b 14 20 0c 12 47 07 26 07 |....(.... ..G.&.|
00003cc0: 08 1b 14 20 18 07 08 1b 14 2a 1c 0c 0d 11 22 07 |... .....*....".|
00003cd0: 08 1b 14 2a 10 11 01 11 24 07 08 1b 14 2f 0e 11 |...*....$..../..|
00003ce0: cd 01 2b 4f 07 2e 07 08 1b 14 20 20 07 08 1b 14 |..+O......  ....|
00003cf0: 3e 0c 1b 31 2b 3d 07 08 1b 14 1b 0c 20 18 07 08 |>..1+=...... ...|
00003d00: 1b 14 2a 10 16 01 1b 32 07 08 1b 14 1b 12 20 16 |..*....2...... .|
00003d10: 07 08 1b 14 39 0c 2a 31 11 9f 01 17 33 07 08 1b |....9.*1....3...|
00003d20: 14 1b 0c 20 18 07 08 1b 14 34 0e 1b 2e 07 08 1b |... .....4......|
00003d30: 14 1b 12 20 16 07 08 1b 14 3e 0c 2f 31 11 9b 01 |... .....>./1...|
00003d40: 17 39 07 08 1b 14 1b 0c 20 16 07 08 1b 14 3e 24 |.9...... .....>$|
00003d50: 07 15 11 20 1b 14 1b 1a 07 08 1b 14 1b 12 20 20 |... ..........  |
00003d60: 07 08 1b 14 2f 0c 11 1e 07 08 1b 14 2f 0c 2f 77 |..../......././w|
00003d70: 11 c5 01 17 53 07 0a 1b 0e 1b 0c 07 01 17 21 07 |....S.........!.|
00003d80: 0a 1b 0e 1b 0c 07 01 17 21 07 0a 1b 0e 1b 0c 07 |........!.......|
00003d90: 01 17 01 07 08 1b 14 20 16 07 08 1b 14 2f 1e 07 |....... ...../..|
00003da0: 0f 11 22 07 08 1b 14 3e 0c 11 7d 1c 25 07 08 1b |.."....>..}.%...|
00003db0: 14 20 16 07 08 1b 14 20 10 11 0e 0c 0f 11 24 07 |. ..... ......$.|
00003dc0: 08 1b 14 3e 0c 1b 7f 1c 49 07 0a 1b 0e 1b 0c 0c |...>....I.......|
00003dd0: 01 17 21 07 0a 1b 0e 1b 0c 0c 01 5a 08 34 0c 00 |..!........Z.4..|
00003de0: 14 0c 0d 07 08 1b 14 26 21 26 02 26 03 11 12 21 |.......&!&.&...!|
00003df0: 0f 11 12 21 09 26 06 26 05 26 08 26 11 00 07 11 |...!.&.&.&.&....|
00003e00: 32 00 03 16 51 0c 12 1b 1a 11 01 00 06 9a 99 99 |2...Q...........|
00003e10: 99 99 99 c9 3f 06 00 00 00 00 00 00 e0 3f 06 00 |....?........?..|
00003e20: 00 00 00 00 00 e0 3f 06 00 00 00 00 00 00 e0 3f |......?........?|
00003e30: 06 9a 99 99 99 99 99 d9 3f 06 00 00 00 00 00 00 |........?.......|
00003e40: f8 3f 06 00 00 00 00 00 00 f8 3f 06 00 00 00 00 |.?........?.....|
00003e50: 00 00 f8 3f 06 00 00 00 00 00 00 e0 3f 06 00 00 |...?........?...|
00003e60: 00 00 00 00 e0 3f 06 33 33 33 33 33 33 d3 3f 06 |.....?.333333.?.|
00003e70: 00 00 00 00 00 00 d0 3f 06 00 00 00 00 00 00 e0 |.......?........|
00003e80: 3f 06 cd cc cc cc cc cc ec 3f 06 cd cc cc cc cc |?........?......|
00003e90: cc ec 3f 06 cd cc cc cc cc cc ec 3f 06 9a 99 99 |..?........?....|
00003ea0: 99 99 99 b9 3f 06 00 00 00 00 00 00 f8 3f 06 9a |....?........?..|
00003eb0: 99 99 99 99 99 b9 3f 06 cd cc cc cc cc cc ec 3f |......?........?|
00003ec0: 06 00 00 00 00 00 00 e0 3f 06 33 33 33 33 33 33 |........?.333333|
00003ed0: f3 3f 06 9a 99 99 99 99 99 c9 3f 06 66 66 66 66 |.?........?.ffff|
00003ee0: 66 66 e6 3f 06 9a 99 99 99 99 99 e9 3f 06 9a 99 |ff.?........?...|
00003ef0: 99 99 99 99 e9 3f 06 9a 99 99 99 99 99 e9 3f 06 |.....?........?.|
00003f00: 9a 99 99 99 99 99 e9 3f 06 9a 99 99 99 99 99 e9 |.......?........|
00003f10: 3f 06 9a 99 99 99 99 99 e9 3f                   |?........?|
```