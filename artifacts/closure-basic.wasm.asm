__tests__/compiler/fixtures/closure-basic.js:1:0: function: <eval>
  mode: strict
  closure vars:
    0: makeAdder local loc0 var
    1: add5 local loc1 var
  stack_size: 4
  opcodes (30 bytes):
   0 push_this
   1 if_false8  offset=5
   3 fclosure8
   5 put_var_ref0
   6 return_undef
   7 get_var_ref0
   8 push_5
   9 call1
  10 put_var_ref1
  11 get_var  atom=474 (console)
  16 get_field2  atom=475 (log)
  21 get_var_ref1
  22 push_2
  23 call1
  24 call_method
  27 drop
  28 undefined
  29 return_async
