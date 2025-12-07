# Phase 6 Progress: Classes

## Status
- **Pending**: Not started.

## Features to Implement
1.  **Class Declaration**: `class Point { ... }`
    -   `OP_define_class`
2.  **Class Expression**: `const Point = class { ... }`
3.  **Constructor**: `constructor() { ... }`
    -   `OP_set_home_object`
    -   `OP_check_ctor`
    -   `OP_init_ctor` (if derived)
4.  **Instance Methods**: `method() { ... }`
    -   `OP_define_method`
5.  **Static Methods**: `static method() { ... }`
    -   `OP_define_method` (on constructor)
6.  **Super Call**: `super()`
    -   `OP_get_super`
    -   `OP_call_constructor`
7.  **Extends**: `class Point3D extends Point { ... }`
    -   `OP_set_proto`

## Verification Fixtures
- `classes-basic.ts`
- `classes-inheritance.ts`
- `classes-super.ts`
