bytecode_version: 5
atoms (4):
  [0] @228 = "tmp-hoist.js"
  [1] @229 = "outer"
  [2] @230 = "foo"
  [3] @231 = "lexicalLet"

module "tmp-hoist.js"

  function[0] _eval_ (module body) kind=JS_FUNC_ASYNC flags=[hasDebug]
    mode: strict
    stack_size: 1
    args: total=0, defined=0, vars=0, closures=3
    closure_vars (3):
      [0] outer -> var#0 [local, NORMAL]
      [1] foo -> var#1 [local, NORMAL]
      [2] lexicalLet -> var#2 [local, lexical, NORMAL]
    constant_pool (1):
      [0] function foo

    debug:
      filename: tmp-hoist.js
      pc2line_bytes: 2
      source_length: 0

    opcodes (11):
      0000: push_this
      0001: if_false8 +5 -> 7
      0003: fclosure8 const[0] function foo
      0005: put_var_ref1
      0006: return_undef
      0007: push_1
      0008: put_var_ref0
      0009: undefined
      0010: put_var_ref2
      0011: undefined
      0012: return_async

    function[1] foo (const[0]) kind=JS_FUNC_NORMAL flags=[hasPrototype, hasSimpleParameters, newTarget, hasDebug]
      mode: strict
      stack_size: 0
      args: total=0, defined=0, vars=0, closures=0

      debug:
        filename: tmp-hoist.js
        pc2line_bytes: 2
        source_length: 0

      opcodes (1):
        0000: return_undef