bytecode_version: 5
atoms (2):
  [0] @228 = "__tests__/compiler/fixtures/simple-var.js"
  [1] @229 = "x"

module "__tests__/compiler/fixtures/simple-var.js"

  function[0] _eval_ (module body) kind=JS_FUNC_ASYNC flags=[hasDebug]
    mode: strict
    stack_size: 1
    args: total=0, defined=0, vars=0, closures=1
    closure_vars (1):
      [0] x -> var#0 [local, const, lexical, NORMAL]

    debug:
      filename: __tests__/compiler/fixtures/simple-var.js
      pc2line_bytes: 2
      source_length: 0

    opcodes (7):
      0000: push_this
      0001: if_false8 +2 -> 4
      0003: return_undef
      0004: push_1
      0005: put_var_ref0
      0006: undefined
      0007: return_async