bytecode_version: 5
atoms (3):
  [0] @228 = "__tests__/compiler/fixtures/function-add.js"
  [1] @229 = "a"
  [2] @230 = "b"

module "__tests__/compiler/fixtures/function-add.js"

  function[0] _eval_ (module body) kind=JS_FUNC_ASYNC flags=[hasDebug]
    mode: strict
    stack_size: 1
    args: total=0, defined=0, vars=0, closures=1
    closure_vars (1):
      [0] add -> var#0 [local, NORMAL]
    constant_pool (1):
      [0] function add

    debug:
      filename: __tests__/compiler/fixtures/function-add.js
      pc2line_bytes: 2
      source_length: 0

    opcodes (7):
      0000: push_this
      0001: if_false8 +5 -> 7
      0003: fclosure8 const[0] function add
      0005: put_var_ref0
      0006: return_undef
      0007: undefined
      0008: return_async

    function[1] add (const[0]) kind=JS_FUNC_NORMAL flags=[hasPrototype, hasSimpleParameters, newTarget, hasDebug]
      mode: strict
      stack_size: 2
      args: total=2, defined=2, vars=0, closures=0
      locals (2):
        [0] a kind=NORMAL level=0 next=0
        [1] b kind=NORMAL level=0 next=0

      debug:
        filename: __tests__/compiler/fixtures/function-add.js
        pc2line_bytes: 10
        source_length: 0

      opcodes (4):
        0000: get_arg0
        0001: get_arg1
        0002: add
        0003: return