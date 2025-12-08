# Phase 6 Progress: Classes

## Status
- **In Progress**: Basic class support and inheritance implemented.
- **Validation**:
    - `class-basic.ts`: **Perfect Match**.
    - `class-inheritance.ts`: Logic matches, minor diff (-25 bytes) in debug info/atom order.
    - `class-fields.ts`: Logic matches.
    - `class-static.ts`: Logic matches.

## Features Implemented
1.  **Class Declaration**: `class Point { ... }`
    -   `OP_define_class`
    -   `OP_set_name`
2.  **Constructor**: `constructor() { ... }`
    -   `OP_set_home_object`
    -   `OP_check_ctor`
    -   `OP_init_ctor` (if derived)
3.  **Instance Methods**: `method() { ... }`
    -   `OP_define_method`
4.  **Static Methods**: `static method() { ... }`
    -   `OP_define_method` (on constructor)
5.  **Super Call**: `super()`
    -   `OP_get_super`
    -   `OP_call_constructor`
6.  **Extends**: `class Point3D extends Point { ... }`
    -   `OP_set_proto`
7.  **Class Fields**:
    -   Instance fields initialization via `<class_fields_init>` closure.
    -   Static fields initialization.

## Next Steps
- [x] Refactor `ClassVisitor` (Task 13.3.3).
- [ ] Fix remaining diffs in `class-inheritance.ts`.
- [ ] Implement `Facade` (Task 13.4).

