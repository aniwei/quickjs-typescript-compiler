bytecode_version: 5
atoms (7):
  [0] @228 = "__tests__/compiler/fixtures/closure-basic.js"
  [1] @229 = "makeAdder"
  [2] @230 = "add5"
  [3] @231 = "console"
  [4] @232 = "log"
  [5] @233 = "x"
  [6] @234 = "y"

module "__tests__/compiler/fixtures/closure-basic.js"

  function[0] _eval_ (module body) kind=kind#2 flags=[hasDebug]
    mode: sloppy
    stack_size: 3
    args: total=0, defined=0, vars=0, closures=2
    closure_vars (2):
      [0] makeAdder -> var#0 [local, kind#0]
      [1] add5 -> var#1 [local, kind#0]
    constant_pool (1):
      [0] function makeAdder

    debug:
      filename: __tests__/compiler/fixtures/closure-basic.js
      pc2line_bytes: 10
      source_length: 0

    opcodes (18):
      0000: push_this
      0001: if_false8 +4 -> 7
      0003: fclosure8 const[0] function makeAdder
      0005: put_var_ref0
      0006: return_undef
      0007: get_var_ref0
      0008: push_5
      0009: call1
      0010: put_var_ref1
      0011: get_var atom#231
      0016: get_field2 atom#232
      0021: get_var_ref1
      0022: push_2
      0023: call1
      0024: call_method 1
      0027: drop
      0028: undefined
      0029: return_async

    function[1] makeAdder (const[0]) kind=kind#0 flags=[hasSimpleParameters, newTarget, hasDebug]
      mode: sloppy
      stack_size: 3
      args: total=1, defined=1, vars=0, closures=0
      locals (1):
        [0] x kind=kind#0 level=0 next=0
      constant_pool (1):
        [0] function <builtin:0>

      debug:
        filename: __tests__/compiler/fixtures/closure-basic.js
        pc2line_bytes: 2
        source_length: 0

      opcodes (3):
        0000: fclosure8 const[0] function <builtin:0>
        0002: return
        0003: return_undef

      function[2] <builtin:0> (const[0]) kind=kind#0 flags=[hasSimpleParameters, newTarget, hasDebug]
        mode: sloppy
        stack_size: 3
        args: total=1, defined=1, vars=0, closures=1
        locals (1):
          [0] y kind=kind#0 level=0 next=0
        closure_vars (1):
          [0] x -> var#0 [local, arg, kind#0]

        debug:
          filename: __tests__/compiler/fixtures/closure-basic.js
          pc2line_bytes: 4
          source_length: 0

        opcodes (5):
          0000: get_var_ref0
          0001: get_arg0
          0002: add
          0003: return
          0004: return_undef